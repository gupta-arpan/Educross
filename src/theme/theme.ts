import {
  MD3LightTheme,
  MD3DarkTheme,
} from 'react-native-paper';

const customColors = {
  success: '#4CAF50',
  warning: '#FFC107',
};

export const LightTheme = {
  ...MD3LightTheme, 
  colors: {
    ...MD3LightTheme.colors, 
    ...customColors, 
    primary: '#6200ee',
    background: '#fef7ff',
  },
};

export const DarkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    ...customColors,
    primary: '#bb86fc',
  },
};