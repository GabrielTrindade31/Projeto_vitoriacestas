import type { Meta, StoryObj } from '@storybook/react';
import { Input } from '../Input';

const meta: Meta<typeof Input> = {
  title: 'Componentes/Input',
  component: Input,
  args: {
    label: 'Email',
    placeholder: 'nome@empresa.com'
  }
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Padrao: Story = {};

export const ComErro: Story = {
  args: {
    error: 'Campo obrigatório'
  }
};

export const ComAjuda: Story = {
  args: {
    helperText: 'Nós nunca compartilharemos seu email'
  }
};
