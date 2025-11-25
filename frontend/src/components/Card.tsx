import React from 'react';
import styled from 'styled-components';

export type CardProps = {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
};

const Wrapper = styled.section`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  box-shadow: ${({ theme }) => theme.shadow.sm};
  padding: ${({ theme }) => theme.spacing(2)};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(1.5)};
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(1)};
`;

const TitleGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(0.5)};
`;

const Title = styled.h3`
  font-weight: 700;
  font-size: 1.1rem;
`;

const Subtitle = styled.span`
  color: ${({ theme }) => theme.colors.muted};
  font-size: 0.95rem;
`;

export const Card: React.FC<CardProps> = ({ title, subtitle, children, actions }) => (
  <Wrapper>
    {(title || subtitle || actions) && (
      <Header>
        <TitleGroup>
          {title && <Title>{title}</Title>}
          {subtitle && <Subtitle>{subtitle}</Subtitle>}
        </TitleGroup>
        {actions}
      </Header>
    )}
    {children}
  </Wrapper>
);

export default Card;
