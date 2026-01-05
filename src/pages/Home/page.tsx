import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Product from '../../components/Product';
import Cart from '../../components/Cart';
import Footer from '../../components/Footer';
import { mockRestaurantes } from '../../mocks/restaurantes';
import type { Restaurante } from '../../types';

const colors = {
  primary: '#E66767',
  background: '#FFF8F2'
};

const PageWrapper = styled.div`
  background-color: ${colors.background};
  min-height: 100vh;
  width: 100%;
`;

const HeroContainer = styled.header`
  width: 100%;
  height: 384px;
  background-image: url('/Hero.png'); 
  background-size: cover;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px 0 24px 0;
  box-sizing: border-box;
`;

const Logo = styled.img`
  width: 125px;
  height: auto;
  margin-bottom: 138px; 
`;

const HeroTitle = styled.h1`
  font-family: 'Roboto', sans-serif; 
  font-weight: 900;
  font-size: 36px;
  line-height: 100%;
  text-align: center;
  color: ${colors.primary};
  max-width: 539px;
  margin: 0;
`;

const ListContainer = styled.main`
  max-width: 1024px;
  margin: 80px auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px 80px;
  padding: 0 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export default function Home() {
  const [restaurantes, setRestaurantes] = useState<Restaurante[]>([]);

  useEffect(() => {
    setRestaurantes(mockRestaurantes);
  }, []);

  return (
    <PageWrapper>
      <HeroContainer>
        <Logo src="/logo.png" alt="efood" />
        <HeroTitle>
          Viva experiências gastronômicas no conforto da sua casa
        </HeroTitle>
      </HeroContainer>

      <ListContainer>
        {restaurantes.map((res) => (
          <Product key={res.id} {...res} />
        ))}
      </ListContainer>
      <Cart />
      <Footer />
    </PageWrapper>
  );
}