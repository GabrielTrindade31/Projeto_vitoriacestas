import React from 'react';
import styled from 'styled-components';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
  helperText?: string;
};

const Wrapper = styled.label`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(0.5)};
  width: 100%;
`;

const StyledInput = styled.input`
  padding: ${({ theme }) => theme.spacing(1)};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.surface};
  font-size: 1rem;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
  }
`;

const Label = styled.span`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

const Helper = styled.span<{ $error?: boolean }>`
  color: ${({ theme, $error }) => ($error ? '#b91c1c' : theme.colors.muted)};
  font-size: 0.875rem;
`;

export const Input: React.FC<InputProps> = ({ label, error, helperText, ...rest }) => (
  <Wrapper>
    {label && <Label>{label}</Label>}
    <StyledInput aria-invalid={!!error} {...rest} />
    {(error || helperText) && <Helper $error={!!error}>{error ?? helperText}</Helper>}
  </Wrapper>
);

export default Input;
