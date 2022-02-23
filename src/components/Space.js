import React from 'react';
import { View } from 'react-native';


const Space = ({body, size}) => {
  const width = size[0];
  const height = size[1];

  const x = body.position.x;
  const y = body.position.y;

  return (
    <View
      style={{
        position: 'absolute',
        left: x,
        top: y,
      }}>
    </View>
  );
};


export default Space;
