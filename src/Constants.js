import {Dimensions} from 'react-native';

const {height, width} = Dimensions.get('window');

export const DEVICE_HEIGHT = height;
export const DEVICE_WIDTH = width;

export const ST_WIDTH = 30;
export const ST_HEIGHT = 30;

export const MID_POINT = width / 2 - ST_WIDTH / 2;
