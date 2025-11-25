import type { Meta, StoryObj } from '@storybook/react';
import { Card } from '../Card';
import { Button } from '../Button';

const meta: Meta<typeof Card> = {
  title: 'Componentes/Card',
  component: Card,
  args: {
    title: 'Card de exemplo',
    subtitle: 'Subtítulo opcional'
  }
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Padrao: Story = {
  args: {
    children: 'Conteúdo do card'
  }
};

export const ComAcoes: Story = {
  args: {
    actions: <Button size="sm">Ação</Button>,
    children: 'Card com botão de ação'
  }
};
