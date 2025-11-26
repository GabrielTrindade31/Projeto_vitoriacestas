import React from 'react';
import styled from 'styled-components';
import { Button, Card } from '../components';

const Hero = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: ${({ theme }) => theme.spacing(2)};
  padding: ${({ theme }) => theme.spacing(3)};
  align-items: center;
  background: radial-gradient(circle at 20% 20%, rgba(16, 185, 129, 0.15), transparent 35%),
    radial-gradient(circle at 80% 0%, rgba(34, 197, 94, 0.18), transparent 30%),
    linear-gradient(135deg, #0ea466, #0b8a57);
  color: #f8fafc;
  border-radius: ${({ theme }) => theme.radius.lg};
  box-shadow: ${({ theme }) => theme.shadow.md};
`;

const HeroContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(1.5)};
`;

const Eyebrow = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(0.75)};
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #e8fff2;
  padding: ${({ theme }) => `${theme.spacing(0.5)} ${theme.spacing(1)}`};
  border-radius: ${({ theme }) => theme.radius.md};
  width: fit-content;
  font-weight: 600;
  letter-spacing: 0.01em;
`;

const Title = styled.h1`
  font-size: clamp(2rem, 3vw, 2.6rem);
  line-height: 1.15;
  font-weight: 700;
`;

const Subtitle = styled.p`
  font-size: 1.05rem;
  color: rgba(241, 245, 249, 0.9);
  max-width: 720px;
`;

const HeroActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing(1)};
  align-items: center;
`;

const SecondaryAction = styled.button`
  border: none;
  background: transparent;
  color: #e8fff2;
  font-weight: 600;
  text-decoration: underline;
  cursor: pointer;
  padding: ${({ theme }) => `${theme.spacing(0.75)} ${theme.spacing(1)}`};
  border-radius: ${({ theme }) => theme.radius.md};
  transition: background 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: ${({ theme }) => theme.spacing(1.5)};
`;

const StatValue = styled.span`
  display: block;
  font-size: 1.6rem;
  font-weight: 700;
  margin-bottom: ${({ theme }) => theme.spacing(0.5)};
`;

const Section = styled.section`
  display: grid;
  gap: ${({ theme }) => theme.spacing(1.5)};
  padding: ${({ theme }) => theme.spacing(3)};
`;

type HomePageProps = {
  onStartLogin: () => void;
  onExplore?: () => void;
};

const highlights = [
  {
    title: 'Visão em tempo real',
    description: 'Monitore o estoque, receba alertas de baixa e registre saídas rapidamente.'
  },
  {
    title: 'Cadastre fornecedores',
    description: 'Mantenha contatos, condições comerciais e histórico de compras organizados.'
  },
  {
    title: 'Equipe conectada',
    description: 'Fluxo simples para que a equipe atualize itens, valide entradas e evite rupturas.'
  }
];

const stats = [
  { label: 'Tempo médio de registro', value: '~2 min' },
  { label: 'Equipe usando agora', value: '3 setores' },
  { label: 'Precisão de estoque', value: '99,2%' }
];

export const HomePage: React.FC<HomePageProps> = ({ onStartLogin, onExplore }) => {
  return (
    <Section>
      <Hero>
        <HeroContent>
          <Eyebrow>Estoque eficiente, visual moderno</Eyebrow>
          <Title>Controle o estoque em uma tela verde, acolhedora e intuitiva.</Title>
          <Subtitle>
            Comece pela página principal, entenda rapidamente como o sistema funciona e siga para o login
            para liberar as demais telas de cadastro e acompanhamento.
          </Subtitle>
          <HeroActions>
            <Button size="lg" onClick={onStartLogin}>
              Ir para login
            </Button>
            <SecondaryAction type="button" onClick={onExplore}>
              Ver como o controle funciona
            </SecondaryAction>
          </HeroActions>
        </HeroContent>
      </Hero>

      <Grid>
        {highlights.map((item) => (
          <Card key={item.title}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </Card>
        ))}
      </Grid>

      <Grid>
        {stats.map((stat) => (
          <Card key={stat.label}>
            <StatValue>{stat.value}</StatValue>
            <p>{stat.label}</p>
          </Card>
        ))}
      </Grid>
    </Section>
  );
};

export default HomePage;
