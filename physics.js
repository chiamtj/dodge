import Matter from "matter-js";

// import { Dimensions } from 'react-native'

// const windowHeight = Dimensions.get('window').height
// const windowWidth = Dimensions.get('window').width

const Physics = (entities, {touches, time, dispatch}) => {

    // let engine = entities.physics.engine
    
    // engine.world.gravity.y = 0.5;

    // Matter.Engine.update(engine, time.delta)

    touches.filter(t => t.type === 'move')
    .forEach( t => {
        let finger = entities[t.id];
        if (finger && finger.position) {
            finger.position = [
                finger.position[0] + t.delta.pageX,
                finger.position[1] + t.delta.pageY
            ];
        }
    } );
    
    return entities;
}

export default Physics;