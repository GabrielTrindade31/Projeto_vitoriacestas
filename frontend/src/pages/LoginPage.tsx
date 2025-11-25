import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, Card, Input } from '../components';
import { login, LoginResponse } from '../services/api';

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

const Feedback = styled.p<{ $variant: 'error' | 'success' }>`
  color: ${({ $variant }) => ($variant === 'error' ? '#b91c1c' : '#15803d')};
  margin: 0;
`;

export type LoginPageProps = {
  onSuccess?: () => void;
};

export const LoginPage: React.FC<LoginPageProps> = ({ onSuccess }) => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tokens, setTokens] = useState<LoginResponse | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await login({ email: form.email, password: form.password });
      setTokens(response);
      localStorage.setItem('accessToken', response.access);
      localStorage.setItem('refreshToken', response.refresh);
      onSuccess?.();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Não foi possível realizar o login.';
      setError(message);
    } finally {
      setLoading(false);
    }
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
            disabled={loading}
          />
          <Input
            name="password"
            label="Senha"
            type="password"
            placeholder="Sua senha"
            value={form.password}
            onChange={handleChange}
            required
            disabled={loading}
          />
          {error && <Feedback $variant="error">{error}</Feedback>}
          {tokens && !error && <Feedback $variant="success">Login realizado com sucesso!</Feedback>}
          <Button type="submit" fullWidth disabled={loading}>
            {loading ? 'Entrando...' : 'Entrar'}
          </Button>
        </Form>
      </Card>
    </Layout>
  );
};

export default LoginPage;
