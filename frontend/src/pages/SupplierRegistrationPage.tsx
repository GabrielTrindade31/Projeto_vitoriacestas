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

export type Supplier = {
  nome: string;
  cnpj: string;
  email: string;
  telefone: string;
  endereco: string;
};

export const SupplierRegistrationPage: React.FC = () => {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState<Supplier>({ nome: '', cnpj: '', email: '', telefone: '', endereco: '' });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSuppliers((prev) => [...prev, form]);
    setForm({ nome: '', cnpj: '', email: '', telefone: '', endereco: '' });
    setModalOpen(false);
  };

  return (
    <Layout>
      <Card
        title="Registro de Fornecedor"
        subtitle="Cadastre fornecedores do catálogo"
        actions={
          <Button onClick={() => setModalOpen(true)} size="sm">
            Novo fornecedor
          </Button>
        }
      >
        <Table<Supplier>
          columns={[
            { key: 'nome', header: 'Nome' },
            { key: 'cnpj', header: 'CNPJ' },
            { key: 'email', header: 'Email' },
            { key: 'telefone', header: 'Telefone' },
            { key: 'endereco', header: 'Endereço' }
          ]}
          data={suppliers}
          emptyMessage="Nenhum fornecedor cadastrado"
        />
      </Card>

      <Modal open={modalOpen} title="Novo fornecedor" onClose={() => setModalOpen(false)}>
        <Form onSubmit={handleSubmit}>
          <Input name="nome" label="Nome" value={form.nome} onChange={handleChange} required />
          <Input name="cnpj" label="CNPJ" value={form.cnpj} onChange={handleChange} required />
          <Input name="email" label="Email" type="email" value={form.email} onChange={handleChange} required />
          <Input name="telefone" label="Telefone" value={form.telefone} onChange={handleChange} required />
          <Input name="endereco" label="Endereço" value={form.endereco} onChange={handleChange} required />
          <Button type="submit">Salvar</Button>
        </Form>
      </Modal>
    </Layout>
  );
};

export default SupplierRegistrationPage;
