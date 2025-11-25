import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Modal } from '../Modal';
import { Button } from '../Button';

const meta: Meta<typeof Modal> = {
  title: 'Componentes/Modal',
  component: Modal,
  render: (args) => {
    const [open, setOpen] = useState(true);
    return (
      <div>
        <Button onClick={() => setOpen(true)}>Abrir modal</Button>
        <Modal {...args} open={open} onClose={() => setOpen(false)} />
      </div>
    );
  }
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const Padrao: Story = {
  args: {
    title: 'Confirmação',
    children: 'Conteúdo do modal'
  }
};
