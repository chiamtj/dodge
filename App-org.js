import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, {useEffect, useState} from 'react';
import { GameEngine } from 'react-native-game-engine';
import {Physics} from './physics';


export default function App() {
  return (
    <View style={styles.container}>
      {/* <Image source={zoom} style={styles.backgroundImage} resizeMode="cover"/> */}
      <GameEngine
        systems={[Physics]}
        entities = {{
          1: {position: [40,200], renderer: <Finger/>},
          2: {position: [100,200], renderer: <Finger/>},
        }}
        running = {true}>
          
        <StatusBar style="auto" hidden={true}/>
      </GameEngine>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
