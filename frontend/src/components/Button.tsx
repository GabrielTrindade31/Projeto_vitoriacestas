import React from 'react';
import styled, { css } from 'styled-components';

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
};

const variantStyles: Record<Variant, ReturnType<typeof css>> = {
  primary: css`
    background: ${({ theme }) => theme.colors.primary};
    color: #fff;
    &:hover {
      background: ${({ theme }) => theme.colors.primaryHover};
    }
  `,
  secondary: css`
    background: ${({ theme }) => theme.colors.secondary};
    color: #0f172a;
    &:hover {
      filter: brightness(0.95);
    }
  `,
  ghost: css`
    background: transparent;
    color: ${({ theme }) => theme.colors.primary};
    border: 1px solid ${({ theme }) => theme.colors.border};
    &:hover {
      background: ${({ theme }) => theme.colors.background};
    }
  `
};

const sizes: Record<Size, ReturnType<typeof css>> = {
  sm: css`
    padding: ${({ theme }) => `${theme.spacing(0.75)} ${theme.spacing(1.5)}`};
    font-size: 0.875rem;
  `,
  md: css`
    padding: ${({ theme }) => `${theme.spacing(1)} ${theme.spacing(2)}`};
    font-size: 1rem;
  `,
  lg: css`
    padding: ${({ theme }) => `${theme.spacing(1.25)} ${theme.spacing(2.5)}`};
    font-size: 1.05rem;
  `
};

const StyledButton = styled.button<{ $variant: Variant; $size: Size; $fullWidth: boolean }>`
  border: none;
  border-radius: ${({ theme }) => theme.radius.md};
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing(0.5)};
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: ${({ theme }) => theme.shadow.sm};
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};
  ${({ $variant }) => variantStyles[$variant]};
  ${({ $size }) => sizes[$size]};
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  ...rest
}) => (
  <StyledButton $variant={variant} $size={size} $fullWidth={fullWidth} {...rest}>
    {children}
  </StyledButton>
);

export default Button;
