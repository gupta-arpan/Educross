// src/theme/theme.ts
import {
  MD3LightTheme, // [CHANGED] Use MD3 Light
  MD3DarkTheme,
} from 'react-native-paper';

// Define custom colors
const customColors = {
  success: '#4CAF50', // Green
  warning: '#FFC107', // Yellow
};

// Create the Light Theme
export const LightTheme = {
  ...MD3LightTheme, // [CHANGED] Use MD3
  colors: {
    ...MD3LightTheme.colors, // [CHANGED] Use MD3
    ...customColors, // Add our custom colors
    primary: '#6200ee', // Our purple
    background: '#fef7ff', // A nicer MD3 light background
  },
};

// Create the Dark Theme
export const DarkTheme = {
  ...MD3DarkTheme, // This was already correct
  colors: {
    ...MD3DarkTheme.colors, // This was already correct
    ...customColors, // Add our custom colors
    primary: '#bb86fc', // A lighter purple for dark mode
  },
};