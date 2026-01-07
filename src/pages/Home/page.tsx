import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Product from '../../components/Product';
import Cart from '../../components/Cart';
import Footer from '../../components/Footer';
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
  padding: 40px 0;
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

const LoadingText = styled.h2`
  text-align: center;
  color: ${colors.primary};
  margin-top: 40px;
`;

export default function Home() {
  const [restaurantes, setRestaurantes] = useState<Restaurante[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('https://api-ebac.vercel.app/api/efood/restaurantes')
      .then((res) => res.json())
      .then((data) => {
        setRestaurantes(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Erro ao carregar restaurantes:", err);
        setIsLoading(false);
      });
  }, []);

  return (
    <PageWrapper>
      <HeroContainer>
        <Logo src="/logo.png" alt="efood" />
        <HeroTitle>
          Viva experiências gastronômicas no conforto da sua casa
        </HeroTitle>
      </HeroContainer>

      {isLoading ? (
        <LoadingText>Carregando restaurantes...</LoadingText>
      ) : (
        <ListContainer>
          {restaurantes.map((res) => (
            <Product key={res.id} {...res} />
          ))}
        </ListContainer>
      )}
      
      <Cart />
      <Footer />
    </PageWrapper>
  );
}