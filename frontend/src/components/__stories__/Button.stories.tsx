import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../Button';

const meta: Meta<typeof Button> = {
  title: 'Componentes/Button',
  component: Button,
  args: {
    children: 'Clique aqui'
  }
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primario: Story = {
  args: { variant: 'primary' }
};

export const Secundario: Story = {
  args: { variant: 'secondary' }
};

export const Ghost: Story = {
  args: { variant: 'ghost' }
};

export const Cheio: Story = {
  args: { fullWidth: true }
};
