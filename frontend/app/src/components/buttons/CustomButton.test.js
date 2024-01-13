import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CustomButton from './CustomButton'; 

describe('CustomButton', () => {
  it('Renders correctly', () => {
    const { getByText } = render(<CustomButton>Click me</CustomButton>);
    const buttonElement = getByText('Click me');
    expect(buttonElement).toBeDefined();
  });
});
