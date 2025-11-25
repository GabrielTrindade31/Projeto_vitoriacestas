import { render, screen } from '@testing-library/react';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { Modal } from '../Modal';
import { theme } from '../../styles/theme';

describe('Modal', () => {
  it('shows content when open', () => {
    render(
      <ThemeProvider theme={theme}>
        <Modal open title="Teste" onClose={() => {}}>
          Conteúdo
        </Modal>
      </ThemeProvider>
    );

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Conteúdo')).toBeInTheDocument();
  });
});
