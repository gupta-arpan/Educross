import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { PaperProvider } from 'react-native-paper';
import FilterChip from './FilterChip';

const renderWithTheme = (component: React.ReactElement) => {
  return render(<PaperProvider>{component}</PaperProvider>);
};

describe('FilterChip', () => {

  it('renders the correct label', () => {
    renderWithTheme(
      <FilterChip 
        label="AI" 
        onPress={() => {}} 
        selected={false} 
      />
    );

    const chipLabel = screen.getByText('AI');
    expect(chipLabel).toBeOnTheScreen();
  });

  it('shows as selected when selected=true', () => {
    renderWithTheme(
      <FilterChip 
        label="AI" 
        onPress={() => {}} 
        selected={true} 
      />
    );

    const chip = screen.getByRole('button', { selected: true });
    expect(chip).toBeOnTheScreen();
  });

  it('does not show as selected when selected=false', () => {
    renderWithTheme(
      <FilterChip 
        label="AI" 
        onPress={() => {}} 
        selected={false} 
      />
    );

    const chip = screen.getByRole('button', { selected: false });
    expect(chip).toBeOnTheScreen();
  });
});