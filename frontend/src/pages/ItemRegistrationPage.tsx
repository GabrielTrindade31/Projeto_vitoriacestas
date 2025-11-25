import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { Button, Card, Input, Modal, Table } from '../components';
import { createItem, fetchItems, ItemPayload, ItemResponse, updateItem } from '../services/api';

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

type ItemFormState = {
  nome: string;
  codigo: string;
  custo: string;
  preco: string;
  estoque: string;
};

export const ItemRegistrationPage: React.FC = () => {
  const [items, setItems] = useState<ItemResponse[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState<ItemFormState>({ nome: '', codigo: '', custo: '', preco: '', estoque: '' });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [editing, setEditing] = useState<ItemResponse | null>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetchItems();
        setItems(response);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Não foi possível carregar os itens.';
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(null);

    const payload: ItemPayload = {
      nome: form.nome.trim(),
      codigo: form.codigo.trim(),
      custo: Number(form.custo),
      preco: Number(form.preco),
      estoque: Number(form.estoque)
    };

    try {
      const response = editing
        ? await updateItem(editing.id, payload)
        : await createItem(payload);

      setItems((prev) => {
        if (editing) {
          return prev.map((item) => (item.id === editing.id ? response : item));
        }
        return [response, ...prev];
      });

      setSuccess(editing ? 'Item atualizado com sucesso.' : 'Item cadastrado com sucesso.');
      setModalOpen(false);
      setEditing(null);
      setForm({ nome: '', codigo: '', custo: '', preco: '', estoque: '' });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Não foi possível salvar o item.';
      setError(message);
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = useCallback((item: ItemResponse) => {
    setEditing(item);
    setForm({
      nome: item.nome,
      codigo: item.codigo,
      custo: item.custo.toString(),
      preco: item.preco.toString(),
      estoque: item.estoque.toString()
    });
    setModalOpen(true);
  }, []);

  const columns = useMemo(() => [
    { key: 'nome', header: 'Nome' },
    { key: 'codigo', header: 'Código' },
    { key: 'custo', header: 'Custo' },
    { key: 'preco', header: 'Preço' },
    { key: 'estoque', header: 'Estoque' },
    {
      key: 'actions',
      header: 'Ações',
      render: (_value: ItemResponse[keyof ItemResponse] | undefined, row: ItemResponse) => (
        <Button variant="ghost" size="sm" onClick={() => handleEdit(row)}>
          Editar
        </Button>
      )
    }
  ], [handleEdit]);

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
        {error && <p style={{ color: '#b91c1c' }}>{error}</p>}
        {success && <p style={{ color: '#15803d' }}>{success}</p>}
        <Table<ItemResponse>
          columns={columns}
          data={items}
          emptyMessage={loading ? 'Carregando itens...' : 'Nenhum item cadastrado'}
        />
      </Card>

      <Modal
        open={modalOpen}
        title={editing ? 'Editar item' : 'Novo item'}
        onClose={() => {
          setModalOpen(false);
          setEditing(null);
          setForm({ nome: '', codigo: '', custo: '', preco: '', estoque: '' });
        }}
      >
        <Form onSubmit={handleSubmit}>
          <Input name="nome" label="Nome" value={form.nome} onChange={handleChange} required disabled={saving} />
          <Input
            name="codigo"
            label="Código"
            value={form.codigo}
            onChange={handleChange}
            required
            disabled={saving || Boolean(editing)}
          />
          <Input
            name="custo"
            label="Custo"
            type="number"
            value={form.custo}
            onChange={handleChange}
            required
            disabled={saving}
          />
          <Input
            name="preco"
            label="Preço"
            type="number"
            value={form.preco}
            onChange={handleChange}
            required
            disabled={saving}
          />
          <Input
            name="estoque"
            label="Estoque"
            type="number"
            value={form.estoque}
            onChange={handleChange}
            required
            disabled={saving}
          />
          <Button type="submit" disabled={saving}>
            {saving ? 'Salvando...' : 'Salvar'}
          </Button>
        </Form>
      </Modal>
    </Layout>
  );
};

export default ItemRegistrationPage;
