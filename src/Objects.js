import Matter from 'matter-js';
import {ST_WIDTH, ST_HEIGHT, DEVICE_WIDTH, DEVICE_HEIGHT} from './Constants';


export const student = Matter.Bodies.rectangle(
  0,
  DEVICE_HEIGHT - 30,
  ST_WIDTH,
  ST_HEIGHT,
  {
    isStatic: true,
    label: 'student',
  },
);

export const floor = Matter.Bodies.rectangle(
  DEVICE_WIDTH / 2,
  DEVICE_HEIGHT,
  DEVICE_WIDTH,
  10,
  {
    isStatic: true,
    isSensor: true,
    label: 'floor',
  },
);

export const space = Matter.Bodies.rectangle(DEVICE_WIDTH / 2, 100, 20, 100, {
  isStatic: true,
  isSensor: false,
  label: 'space',
});
