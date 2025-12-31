import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Header from '../../components/Header';
import Product from '../../components/Product';
import Cart from '../../components/Cart';
import { mockRestaurantes } from '../../mocks/restaurantes';
import type { Restaurante } from '../../types';
import Footer from '../../components/Footer';

const colors = {
  primary: '#E66767',
  background: '#FFF8F2' // Bege claro efood
};

const Hero = styled.div`
  background-image: url('/Hero.png');
  background-size: cover;
  background-position: center;
  padding: 64px 0;
  text-align: center;
  height: 500px;
`;

const ListContainer = styled.div`
  max-width: 1024px;
  margin: 80px auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px 80px;
  padding: 0 20px;
  @media (max-width: 768px) { grid-template-columns: 1fr; }
`;

export default function Home() {
  const [restaurantes, setRestaurantes] = useState<Restaurante[]>([]);

  useEffect(() => {
    setRestaurantes(mockRestaurantes);
  }, []);

  return (
    <div style={{ backgroundColor: colors.background, minHeight: '100vh' }}>
      <Hero>
      </Hero>
      <ListContainer>
        {restaurantes.map((res) => (
          <Product key={res.id} {...res} />
        ))}
      </ListContainer>
      <Cart />
      <Footer />
    </div>
  );
}