import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ItemRegistrationPage from './pages/ItemRegistrationPage';
import SupplierRegistrationPage from './pages/SupplierRegistrationPage';
import { Button } from './components';

const Shell = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: radial-gradient(circle at 10% 20%, rgba(16, 185, 129, 0.08), transparent 25%),
    radial-gradient(circle at 90% 10%, rgba(52, 211, 153, 0.08), transparent 20%),
    linear-gradient(180deg, #f0fdf4 0%, #ffffff 35%, #f0fdf4 100%);
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

const PageContainer = styled.div`
  width: min(1200px, 100%);
  margin: 0 auto;
  padding: ${({ theme }) => `${theme.spacing(2)} ${theme.spacing(2)}`};
  display: grid;
  gap: ${({ theme }) => theme.spacing(2)};
`;

const views = {
  home: 'Início',
  login: 'Login',
  items: 'Itens',
  suppliers: 'Fornecedores'
} as const;

export type View = keyof typeof views;

const renderView = (view: View, onLoginSuccess: () => void, onGoToLogin: () => void) => {
  switch (view) {
    case 'home':
      return <HomePage onStartLogin={onGoToLogin} onExplore={onGoToLogin} />;
    case 'login':
      return <LoginPage onSuccess={onLoginSuccess} />;
    case 'items':
      return <ItemRegistrationPage />;
    case 'suppliers':
      return <SupplierRegistrationPage />;
    default:
      return null;
  }
};

export const App: React.FC = () => {
  const [current, setCurrent] = useState<View>('home');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setCurrent('items');
  };

  const handleNavigate = (view: View) => {
    if ((view === 'items' || view === 'suppliers') && !isAuthenticated) {
      setCurrent('login');
      return;
    }
    setCurrent(view);
  };

  const navItems = useMemo(
    () =>
      Object.entries(views).map(([key, label]) => ({
        key: key as View,
        label,
        disabled: (key === 'items' || key === 'suppliers') && !isAuthenticated
      })),
    [isAuthenticated]
  );

  return (
    <Shell>
      <Navbar>
        {navItems.map(({ key, label, disabled }) => (
          <Button
            key={key}
            variant={current === key ? 'primary' : 'ghost'}
            onClick={() => handleNavigate(key)}
            size="sm"
            disabled={disabled}
          >
            {label}
          </Button>
        ))}
      </Navbar>
      <Content>
        <PageContainer>{renderView(current, handleLoginSuccess, () => setCurrent('login'))}</PageContainer>
      </Content>
    </Shell>
  );
};

export default App;
