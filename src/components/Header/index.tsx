import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { type RootState } from '../../store';
import { toggleCart } from '../../store/cartSlice';
import { Link } from 'react-router-dom';

const colors = {
  background: '#ffebd9', 
  primary: '#E66767'     
};

const HeaderContainer = styled.header`
  background-color: ${colors.background};
  padding: 40px 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NavContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 1024px;
  padding: 0 20px;
`;

const StyledLink = styled(Link)`
  color: ${colors.primary};
  text-decoration: none;
  font-weight: 900;
  font-size: 18px;
`;

const Logo = styled.img`
  height: 58px; // Tamanho aproximado do logo da imagem
`;

const CartInfo = styled.button`
  background: none;
  border: none;
  color: ${colors.primary};
  font-size: 18px;
  font-weight: 900;
  cursor: pointer;
  padding: 0;
  font-family: inherit;

  span {
    display: inline;
  }
`;

export default function Header() {
  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state.cart.items);

  return (
    <HeaderContainer>
      <NavContent>
        <StyledLink to="/">Restaurantes</StyledLink>

        <Link to="/">
          <Logo src="/logo.png" alt="efood" />
        </Link>
        <CartInfo onClick={() => dispatch(toggleCart())}>
          {items.length} produto(s) <span>no carrinho</span>
        </CartInfo>
      </NavContent>
    </HeaderContainer>
  );
}