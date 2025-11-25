import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { vi } from 'vitest';
import { Button } from '../Button';
import { theme } from '../../styles/theme';

describe('Button', () => {
  it('renders label and handles click', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(
      <ThemeProvider theme={theme}>
        <Button onClick={handleClick}>Enviar</Button>
      </ThemeProvider>
    );

    await user.click(screen.getByRole('button', { name: 'Enviar' }));
    expect(handleClick).toHaveBeenCalled();
  });
});
