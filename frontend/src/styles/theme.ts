import { createGlobalStyle } from 'styled-components';

export const theme = {
  colors: {
    primary: '#0ea466',
    primaryHover: '#0b8a57',
    secondary: '#bbf7d0',
    background: '#f6fdf8',
    surface: '#ffffff',
    text: '#0f172a',
    muted: '#4b5563',
    border: '#d1e7d9'
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
