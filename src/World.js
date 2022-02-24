import React, {Component} from 'react';
import {StyleSheet, Image, Text, View, Alert, Dimensions} from 'react-native';
import { Accelerometer } from 'expo-sensors';
import Matter from 'matter-js';
import {GameEngine} from 'react-native-game-engine';

import randomInt from 'random-int';
import sampleSize from 'lodash.samplesize';

import Student from './components/Student';
import Box from './components/Box';
import Space from './components/Space';

import overlay from '../assets/images/overlay-back.png'
import getRandomDecimal from './helpers/getRandomDecimal';

const { windowWidth, windowHeight} = Dimensions.get('window');

Accelerometer.setUpdateInterval(15);

import {
  ST_WIDTH,
  ST_HEIGHT,
  MID_POINT,
  DEVICE_HEIGHT,
  DEVICE_WIDTH,
} from './Constants';

import {OPPOSING_STUDENT_IMAGES} from './Images';

import {student, floor, space} from './Objects';
// import { stubArray } from 'lodash';

export default class World extends Component {
  state = {
    x: 0,
    y: DEVICE_HEIGHT - 200,
    isGameSetup: false,
    isGamePaused: false,
    score: 0,
  };

  constructor(props) {
    super(props);

    this.opposing_students = [];

    const {engine, world} = this.addObjectsToWorld(student);
    this.entities = this.getEntities(engine, world, student, space);

    this.physics = (entities, {time}) => {
      let engine = entities['physics'].engine;

      engine.world.gravity.y = 0.75; // .0625, .125, .25, .5, .75, 1
      Matter.Engine.update(engine, time.delta);
      return entities;
    };

    this.roadTranslation = (entities, {time}) => {
      if (!this.state.isGamePaused) {
        Matter.Body.setPosition(space, {
          x: space.position.x,
          y: space.position.y + 1,
        });

        if (space.position.y >= DEVICE_HEIGHT / 5) {
          Matter.Body.setPosition(space, {
            x: space.position.x,
            y: 0,
          });
        }
      }
      return entities;
    };

    this.setupCollisionHandler(engine);
  }

  componentDidMount() {
    Matter.Body.setPosition(student, {
      x: DEVICE_WIDTH / 2,
      y: DEVICE_HEIGHT - 200,
    });

    this.Accelerometer = Accelerometer.addListener(({x}) => {
      if (!this.state.isGamePaused) {
        Matter.Body.setPosition(student, {
          x: this.state.x + x,
          y: DEVICE_HEIGHT - 200,
        });

        this.setState(
          state => ({
            x: state.x + x*10,
          }),
          () => {
            if (this.state.x < 0 || this.state.x > DEVICE_WIDTH) {
              Matter.Body.setPosition(student, {
                x: MID_POINT,
                y: DEVICE_HEIGHT - 30,
              });

              this.setState({
                x: MID_POINT,
              });

              this.gameOver('You hit the side of the road!');
            }
          },
        );
      }
    });

    this.setState({
      isGameSetup: true,
    });
  }

  componentWillUnmount() {
    if (this.Accelerometer) {
      this.Accelerometer.remove();
    }
  }

  addObjectsToWorld = student => {
    const engine = Matter.Engine.create({enableSleeping: false});
    const world = engine.world;

    let objects = [space, student, floor];

    for (let x = 0; x <= 4; x++) {
      const opposing_students = Matter.Bodies.rectangle(
        randomInt(1, DEVICE_WIDTH - 10),
        0,
        ST_WIDTH,
        ST_HEIGHT,
        {
          frictionAir: getRandomDecimal(0.05, 0.25),
          label: 'opposing_students',
        },
      );

      this.opposing_students.push(opposing_students);
    }

    objects = objects.concat(this.opposing_students);

    Matter.World.add(world, objects);

    return {
      engine,
      world,
    };
  };

  setupCollisionHandler = engine => {
    Matter.Events.on(engine, 'collisionStart', event => {
      var pairs = event.pairs;

      var objA = pairs[0].bodyA.label;
      var objB = pairs[0].bodyB.label;

      console.log(objA + ' -> ' + objB);

      if (objA === 'floor' && objB === 'opposing_students') {
        Matter.Body.setPosition(pairs[0].bodyB, {
          // set new initial position for the block
          x: randomInt(20, DEVICE_WIDTH - 20),
          y: 0,
        });

        this.setState(state => ({
          score: state.score + 1,
        }));
      }

      if (objA === 'student' && objB === 'opposing_students') {
        this.gameOver('You bumped to another car!');
      }
    });
  };

  gameOver = msg => {
    this.opposing_students.forEach(item => {
      Matter.Body.set(item, {
        isStatic: true,
      });
    });

    this.setState({
      isGamePaused: true,
    });

    Alert.alert(`Game Over, ${msg}`, 'Want to play again?', [
      {
        text: 'Cancel',
        onPress: () => {
          this.Accelerometer.remove();
          Alert.alert(
            'Bye!',
            'Just relaunch the app if you want to play again.',
          );
        },
      },
      {
        text: 'OK',
        onPress: () => {
          this.resetGame();
        },
      },
    ]);
  };

  resetGame = () => {
    this.setState({
      isGamePaused: false,
    });

    this.opposing_students.forEach(item => {
      // loop through all the blocks
      Matter.Body.set(item, {
        isStatic: false, // make the block susceptible to gravity again
      });
      Matter.Body.setPosition(item, {
        // set new position for the block
        x: randomInt(20, DEVICE_WIDTH - 20),
        y: 0,
      });
    });

    this.setState({
      score: 0, // reset the player score
    });
  };

  getEntities = (engine, world, student, space) => {
    const entities = {
      physics: {
        engine,
        world,
      },

      spaceWorld: {
        body: space,
        size: [20, 100],
        renderer: Space,
      },

      player: {
        body: student,
        size: [ST_WIDTH, ST_WIDTH],
        image: require('../assets/images/2.png'),
        renderer: Student,
      },

      gameFloor: {
        body: floor,
        size: [DEVICE_WIDTH, 10],
        color: '#414448',
        renderer: Box,
      },
    };

    // get unique items from array
    const selected_car_images = sampleSize(OPPOSING_STUDENT_IMAGES, 5);

    for (let x = 0; x <= 4; x++) {
      Object.assign(entities, {
        ['opposing_students' + x]: {
          body: this.opposing_students[x],
          size: [ST_WIDTH, ST_HEIGHT],
          image: selected_car_images[x],
          renderer: Student,
        },
      });
    }

    return entities;
  };

  render() {
    const {isGameSetup, score} = this.state;

    if (isGameSetup) {
      return (
        <View style={styles.container}>
        <Image source={overlay} style={styles.backgroundImage}/>
        <GameEngine
          systems={[this.physics, this.roadTranslation]}
          entities={this.entities}
        >
          <View style={styles.infoWrapper}>
            <View style={styles.scoreContainer}>
              <Text style={styles.scoreText}>Score: {score}</Text>
            </View>
          </View>
        </GameEngine>
        </View>
      );
    }

    return (
      <View style={styles.centered}>
        <Text style={styles.text}>Something isn't right..</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'gray',
  },
  centered: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
  },

  infoWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  scoreContainer: {
    position: 'absolute',
    top: 50,
    right: 50,
  },
  scoreText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#fff',
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left:0,
    bottom: 0,
    right: 0,
    width: windowWidth,
    height: windowHeight,
  }
});
