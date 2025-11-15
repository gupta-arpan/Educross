// src/types/theme.d.ts
// This file "augments" the MD3 theme to include our custom colors
declare global {
  namespace ReactNativePaper {
    interface MD3Colors { // [CHANGED] This is the correct interface
      success: string;
      warning: string;
    }
  }
}