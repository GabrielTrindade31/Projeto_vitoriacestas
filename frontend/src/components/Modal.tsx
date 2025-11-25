import React from 'react';
import styled from 'styled-components';
import { Button } from './Button';

export type ModalProps = {
  open: boolean;
  title?: string;
  onClose: () => void;
  children: React.ReactNode;
};

const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing(2)};
  z-index: 1000;
`;

const Dialog = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.lg};
  padding: ${({ theme }) => theme.spacing(3)};
  min-width: 320px;
  max-width: 640px;
  width: 100%;
  box-shadow: ${({ theme }) => theme.shadow.md};
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing(2)};
`;

const Title = styled.h3`
  font-size: 1.25rem;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(1.5)};
`;

export const Modal: React.FC<ModalProps> = ({ open, title, onClose, children }) => {
  if (!open) return null;

  return (
    <Backdrop role="presentation" onClick={onClose}>
      <Dialog role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
        <Header>
          {title && <Title>{title}</Title>}
          <Button aria-label="Fechar" variant="ghost" onClick={onClose}>
            Fechar
          </Button>
        </Header>
        <Content>{children}</Content>
      </Dialog>
    </Backdrop>
  );
};

export default Modal;
