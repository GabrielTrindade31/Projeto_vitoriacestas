import React from 'react';
import styled from 'styled-components';

type Column<T> = {
  key: keyof T;
  header: string;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
};

type TableProps<T> = {
  columns: Column<T>[];
  data: T[];
  emptyMessage?: string;
};

const TableWrapper = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  overflow: hidden;
  background: ${({ theme }) => theme.colors.surface};
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.95rem;
`;

const Th = styled.th`
  text-align: left;
  padding: ${({ theme }) => theme.spacing(1)};
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.muted};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const Td = styled.td`
  padding: ${({ theme }) => theme.spacing(1)};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const EmptyState = styled.div`
  padding: ${({ theme }) => theme.spacing(2)};
  color: ${({ theme }) => theme.colors.muted};
`;

export const Table = <T extends Record<string, unknown>>({ columns, data, emptyMessage = 'Sem registros' }: TableProps<T>) => (
  <TableWrapper>
    <StyledTable>
      <thead>
        <tr>
          {columns.map((column) => (
            <Th key={String(column.key)}>{column.header}</Th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.length === 0 ? (
          <tr>
            <Td colSpan={columns.length}>
              <EmptyState>{emptyMessage}</EmptyState>
            </Td>
          </tr>
        ) : (
          data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column) => (
                <Td key={String(column.key)}>
                  {column.render ? column.render(row[column.key], row) : String(row[column.key])}
                </Td>
              ))}
            </tr>
          ))
        )}
      </tbody>
    </StyledTable>
  </TableWrapper>
);

export default Table;
