import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, Card, Input, Modal, Table } from '../components';

const Layout = styled.div`
  min-height: 100vh;
  padding: ${({ theme }) => theme.spacing(4)};
  display: grid;
  gap: ${({ theme }) => theme.spacing(2)};
`;

const Form = styled.form`
  display: grid;
  gap: ${({ theme }) => theme.spacing(1.5)};
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
`;

export type Item = {
  nome: string;
  codigo: string;
  custo: string;
  preco: string;
  estoque: string;
};

export const ItemRegistrationPage: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState<Item>({ nome: '', codigo: '', custo: '', preco: '', estoque: '' });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setItems((prev) => [...prev, form]);
    setForm({ nome: '', codigo: '', custo: '', preco: '', estoque: '' });
    setModalOpen(false);
  };

  return (
    <Layout>
      <Card
        title="Registro de Item"
        subtitle="Cadastre itens do estoque"
        actions={
          <Button onClick={() => setModalOpen(true)} size="sm">
            Novo item
          </Button>
        }
      >
        <Table<Item>
          columns={[
            { key: 'nome', header: 'Nome' },
            { key: 'codigo', header: 'Código' },
            { key: 'custo', header: 'Custo' },
            { key: 'preco', header: 'Preço' },
            { key: 'estoque', header: 'Estoque' }
          ]}
          data={items}
          emptyMessage="Nenhum item cadastrado"
        />
      </Card>

      <Modal open={modalOpen} title="Novo item" onClose={() => setModalOpen(false)}>
        <Form onSubmit={handleSubmit}>
          <Input name="nome" label="Nome" value={form.nome} onChange={handleChange} required />
          <Input name="codigo" label="Código" value={form.codigo} onChange={handleChange} required />
          <Input name="custo" label="Custo" value={form.custo} onChange={handleChange} required />
          <Input name="preco" label="Preço" value={form.preco} onChange={handleChange} required />
          <Input name="estoque" label="Estoque" value={form.estoque} onChange={handleChange} required />
          <Button type="submit">Salvar</Button>
        </Form>
      </Modal>
    </Layout>
  );
};

export default ItemRegistrationPage;
