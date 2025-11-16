import React from 'react';
import { Chip } from 'react-native-paper';

interface Props {
  label: string;
  onPress: () => void;
  selected: boolean;
}

export default function FilterChip({ label, onPress, selected }: Props) {
  return (
    <Chip
      mode={selected ? 'flat' : 'outlined'}
      selected={selected}
      onPress={onPress}
      style={{ marginRight: 8 }}
    >
      {label}
    </Chip>
  );
}