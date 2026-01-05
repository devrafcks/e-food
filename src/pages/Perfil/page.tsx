import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../../components/Header';
import Modal from '../../components/Modal';
import Footer from '../../components/Footer';
import { mockRestaurantes } from '../../mocks/restaurantes';
import { type Restaurante, type CardapioItem } from '../../types';

const colors = {
  primary: '#E66767',
  secondary: '#FFEBD9',
  background: '#FFF8F2'
};

const Banner = styled.div<{ img: string }>`
  height: 280px;
  width: 100%;
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url(${(props) => props.img});
  background-size: cover;
  background-position: center;
  position: relative;
  display: flex;
  color: #fff;

  .container {
    max-width: 1024px;
    margin: 0 auto;
    width: 100%;
    padding: 32px 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between; 
  }

  .tipo {
    font-size: 32px; 
    font-weight: 100;
    opacity: 0.8;
    text-transform: capitalize;
  }

  .nome {
    font-size: 32px;
    font-weight: 900;
  }
`;

const MenuGrid = styled.div`
  max-width: 1024px;
  margin: 56px auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
  padding: 0 20px;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const CardPrato = styled.div`
  background: ${colors.primary};
  padding: 8px;
  cursor: pointer;
  color: ${colors.secondary};

  img {
    width: 100%;
    height: 167px;
    object-fit: cover;
  }
  h3 {
    margin: 8px 0;
    font-size: 16px;
    font-weight: 900;
  }
  p {
    font-size: 14px;
    line-height: 22px;
    margin-bottom: 8px;
  }
  button {
    width: 100%;
    background: ${colors.secondary};
    color: ${colors.primary};
    border: none;
    padding: 4px;
    font-weight: bold;
    cursor: pointer;
  }
`;

export default function Perfil() {
  const { id } = useParams<{ id: string }>();
  const [restaurante, setRestaurante] = useState<Restaurante | null>(null);
  const [selectedItem, setSelectedItem] = useState<CardapioItem | null>(null);

  useEffect(() => {
    const found = mockRestaurantes.find((r) => r.id === Number(id));
    if (found) setRestaurante(found);
  }, [id]);

  if (!restaurante)
    return (
      <div
        style={{
          background: colors.background,
          height: '100vh',
          color: colors.primary
        }}
      >
        Carregando...
      </div>
    );

  return (
    <div style={{ backgroundColor: colors.background, minHeight: '100vh' }}>
      <Header />
      <Banner img={restaurante.capa}>
        <div className="container">
          <p className="tipo">{restaurante.tipo}</p>
          <h1 className="nome">{restaurante.titulo}</h1>
        </div>
      </Banner>

      <MenuGrid>
        {restaurante.cardapio.map((prato) => (
          <CardPrato key={prato.id} onClick={() => setSelectedItem(prato)}>
            <img src={prato.foto} alt={prato.nome} />
            <h3>{prato.nome}</h3>
            <p>{prato.descricao.substring(0, 110)}...</p>
            <button>Adicionar ao carrinho</button>
          </CardPrato>
        ))}
      </MenuGrid>

      <Modal item={selectedItem} onClose={() => setSelectedItem(null)} />
      <Footer />
    </div>
  );
}