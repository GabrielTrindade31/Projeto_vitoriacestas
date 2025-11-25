import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, Card, Input } from '../components';

const Layout = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing(4)};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(1.5)};
  min-width: min(440px, 100%);
`;

export const LoginPage: React.FC = () => {
  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // TODO: call backend login endpoint
  };

  return (
    <Layout>
      <Card title="Acesso" subtitle="Entre com suas credenciais para continuar">
        <Form onSubmit={handleSubmit}>
          <Input
            name="email"
            label="Email"
            type="email"
            placeholder="nome@empresa.com"
            value={form.email}
            onChange={handleChange}
            required
          />
          <Input
            name="password"
            label="Senha"
            type="password"
            placeholder="Sua senha"
            value={form.password}
            onChange={handleChange}
            required
          />
          <Button type="submit" fullWidth>
            Entrar
          </Button>
        </Form>
      </Card>
    </Layout>
  );
};

export default LoginPage;
