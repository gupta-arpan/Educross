// src/components/AppHeader.tsx
import React from 'react';
import { Appbar } from 'react-native-paper';

interface Props {
  title: string;
}

export default function AppHeader({ title }: Props) {
  return (
    <Appbar.Header
      mode="center-aligned"
      elevated={true} 
    >
      <Appbar.Content title={title} titleStyle={{ fontWeight: 'bold' }} />
    </Appbar.Header>
  );
}