import { createGlobalStyle } from 'styled-components';

export const theme = {
  colors: {
    primary: '#1d4ed8',
    primaryHover: '#1e40af',
    secondary: '#f59e0b',
    background: '#f8fafc',
    surface: '#ffffff',
    text: '#0f172a',
    muted: '#64748b',
    border: '#e2e8f0'
  },
  spacing: (factor: number) => `${factor * 8}px`,
  radius: {
    sm: '6px',
    md: '10px',
    lg: '16px'
  },
  shadow: {
    sm: '0 1px 2px rgba(15, 23, 42, 0.06)',
    md: '0 4px 10px rgba(15, 23, 42, 0.08)'
  },
  typography: {
    fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
    heading: '600',
    body: '400'
  }
};

const GlobalStyle = createGlobalStyle`
  :root {
    color-scheme: light;
  }
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  body {
    font-family: ${() => theme.typography.fontFamily};
    background: ${() => theme.colors.background};
    color: ${() => theme.colors.text};
    line-height: 1.6;
  }
  a {
    text-decoration: none;
    color: inherit;
  }
`;

export default GlobalStyle;
export type AppTheme = typeof theme;
