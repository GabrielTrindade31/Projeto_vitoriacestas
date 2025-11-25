import { render, screen } from '@testing-library/react';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { Input } from '../Input';
import { theme } from '../../styles/theme';

describe('Input', () => {
  it('renders label and placeholder', () => {
    render(
      <ThemeProvider theme={theme}>
        <Input label="Email" placeholder="digite aqui" />
      </ThemeProvider>
    );

    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('digite aqui')).toBeInTheDocument();
  });
});
