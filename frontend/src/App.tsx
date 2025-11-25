import React, { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import GlobalStyle, { theme } from './styles/theme';
import LoginPage from './pages/LoginPage';
import ItemRegistrationPage from './pages/ItemRegistrationPage';
import SupplierRegistrationPage from './pages/SupplierRegistrationPage';
import { Button } from './components';

const Shell = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Navbar = styled.nav`
  display: flex;
  gap: ${({ theme }) => theme.spacing(1)};
  padding: ${({ theme }) => theme.spacing(1.5)};
  background: ${({ theme }) => theme.colors.surface};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  position: sticky;
  top: 0;
  z-index: 10;
  flex-wrap: wrap;
`;

const Content = styled.main`
  flex: 1;
`;

const views = {
  login: 'Login',
  items: 'Itens',
  suppliers: 'Fornecedores'
} as const;

export type View = keyof typeof views;

const renderView = (view: View) => {
  switch (view) {
    case 'login':
      return <LoginPage />;
    case 'items':
      return <ItemRegistrationPage />;
    case 'suppliers':
      return <SupplierRegistrationPage />;
    default:
      return null;
  }
};

export const App: React.FC = () => {
  const [current, setCurrent] = useState<View>('login');

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Shell>
        <Navbar>
          {Object.entries(views).map(([key, label]) => (
            <Button
              key={key}
              variant={current === key ? 'primary' : 'ghost'}
              onClick={() => setCurrent(key as View)}
              size="sm"
            >
              {label}
            </Button>
          ))}
        </Navbar>
        <Content>{renderView(current)}</Content>
      </Shell>
    </ThemeProvider>
  );
};

export default App;
