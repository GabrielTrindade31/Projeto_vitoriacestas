import { render, screen } from '@testing-library/react';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { Table } from '../Table';
import { theme } from '../../styles/theme';

type Row = { nome: string; cargo: string };

describe('Table', () => {
  it('renders empty message', () => {
    render(
      <ThemeProvider theme={theme}>
        <Table<Row>
          columns={[{ key: 'nome', header: 'Nome' }, { key: 'cargo', header: 'Cargo' }]}
          data={[]}
          emptyMessage="Sem dados"
        />
      </ThemeProvider>
    );

    expect(screen.getByText('Sem dados')).toBeInTheDocument();
  });
});
