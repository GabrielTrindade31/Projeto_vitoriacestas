import type { Meta, StoryObj } from '@storybook/react';
import { Table } from '../Table';

type Pessoa = {
  nome: string;
  email: string;
  cargo: string;
};

const meta: Meta<typeof Table<any>> = {
  title: 'Componentes/Table',
  component: Table
};

export default meta;
type Story = StoryObj<typeof Table<Pessoa>>;

const data: Pessoa[] = [
  { nome: 'Ana Lima', email: 'ana@empresa.com', cargo: 'Gestora' },
  { nome: 'Carlos Souza', email: 'carlos@empresa.com', cargo: 'Operador' }
];

export const Populada: Story = {
  args: {
    columns: [
      { key: 'nome', header: 'Nome' },
      { key: 'email', header: 'Email' },
      { key: 'cargo', header: 'Cargo' }
    ],
    data
  }
};

export const Vazia: Story = {
  args: {
    columns: [
      { key: 'nome', header: 'Nome' },
      { key: 'email', header: 'Email' },
      { key: 'cargo', header: 'Cargo' }
    ],
    data: [],
    emptyMessage: 'Sem pessoas'
  }
};
