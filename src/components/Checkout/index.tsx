import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { type RootState } from '../../store';
import { remove, toggleCart, clear } from '../../store/cartSlice';

const colors = {
  primary: '#E66767',
  secondary: '#FFEBD9',
};

const Overlay = styled.div`
  position: fixed;
  top: 0; left: 0; width: 100%; height: 100%;
  background: rgba(0, 0, 0, 0.7); z-index: 2000;
`;

const Sidebar = styled.aside`
  background-color: ${colors.primary};
  position: fixed; top: 0; right: 0;
  max-width: 360px; width: 100%; height: 100%;
  padding: 32px 16px; z-index: 2001;
  display: flex; flex-direction: column;
  color: ${colors.secondary};

  h3 { font-size: 16px; margin-bottom: 16px; font-weight: bold; }
  p { font-size: 14px; line-height: 1.6; margin-bottom: 16px; }
`;

const FormGroup = styled.div`
  margin-bottom: 8px;
  label { display: block; font-size: 14px; margin-bottom: 4px; font-weight: bold; }
  input { 
    width: 100%; padding: 8px; background: ${colors.secondary}; border: none; 
    color: #4b4b4b; font-weight: bold;
  }
`;

const Row = styled.div`
  display: grid; grid-template-columns: 1fr 1fr; gap: 8px;
`;

const ActionButton = styled.button`
  background-color: ${colors.secondary}; color: ${colors.primary}; border: none;
  padding: 12px; width: 100%; font-weight: bold; cursor: pointer;
  margin-top: 16px;
  &:hover { opacity: 0.9; }
`;

const BackButton = styled(ActionButton)`
  background-color: transparent; color: ${colors.secondary}; margin-top: 8px;
`;

const CartItem = styled.li`
  display: flex; background: ${colors.secondary}; padding: 8px; margin-bottom: 16px;
  position: relative; color: ${colors.primary};
  img { width: 80px; height: 80px; object-fit: cover; margin-right: 8px; }
  div { h4 { font-size: 16px; font-weight: 900; } span { display: block; margin-top: 8px; font-weight: bold; } }
  .remove { position: absolute; top: 8px; right: 8px; cursor: pointer; }
`;

export default function Checkout() {
  const dispatch = useDispatch();
  const { items, isOpen } = useSelector((state: RootState) => state.cart);
  const [step, setStep] = useState<'cart' | 'delivery' | 'payment' | 'success'>('cart');

  if (!isOpen) return null;
  const total = items.reduce((acc, item) => acc + item.preco, 0);

  const handleFinish = () => {
    dispatch(clear());
    setStep('success');
  };

  return (
    <>
      <Overlay onClick={() => dispatch(toggleCart())} />
      <Sidebar>
        {step === 'cart' && (
          <>
            <h3>Carrinho</h3>
            <ul style={{ flex: 1, overflowY: 'auto', listStyle: 'none' }}>
              {items.map(item => (
                <CartItem key={item.id}>
                  <img src={item.foto} alt={item.nome} />
                  <div>
                    <h4>{item.nome}</h4>
                    <span>R$ {item.preco.toFixed(2)}</span>
                  </div>
                  <span className="remove" onClick={() => dispatch(remove(item.id))}>🗑️</span>
                </CartItem>
              ))}
            </ul>
            <div style={{ marginTop: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                <span>Valor total</span>
                <span>R$ {total.toFixed(2)}</span>
              </div>
              <ActionButton onClick={() => setStep('delivery')}>Continuar com a entrega</ActionButton>
            </div>
          </>
        )}
        {/* Passos de entrega e pagamento seguem a mesma lógica visual */}
        {step === 'delivery' && (
          <>
            <h3>Entrega</h3>
            <FormGroup><label>Quem irá receber</label><input type="text" /></FormGroup>
            <FormGroup><label>Endereço</label><input type="text" /></FormGroup>
            <FormGroup><label>Cidade</label><input type="text" /></FormGroup>
            <Row>
              <FormGroup><label>CEP</label><input type="text" /></FormGroup>
              <FormGroup><label>Número</label><input type="text" /></FormGroup>
            </Row>
            <FormGroup><label>Complemento (opcional)</label><input type="text" /></FormGroup>
            <ActionButton onClick={() => setStep('payment')}>Continuar com o pagamento</ActionButton>
            <BackButton onClick={() => setStep('cart')}>Voltar para o carrinho</BackButton>
          </>
        )}
        {step === 'payment' && (
          <>
            <h3>Pagamento - Valor a pagar R$ {total.toFixed(2)}</h3>
            <FormGroup><label>Nome no cartão</label><input type="text" /></FormGroup>
            <Row style={{ gridTemplateColumns: '3fr 1fr' }}>
              <FormGroup><label>Número do cartão</label><input type="text" /></FormGroup>
              <FormGroup><label>CVV</label><input type="text" /></FormGroup>
            </Row>
            <Row>
              <FormGroup><label>Mês de vencimento</label><input type="text" /></FormGroup>
              <FormGroup><label>Ano de vencimento</label><input type="text" /></FormGroup>
            </Row>
            <ActionButton onClick={handleFinish}>Finalizar pagamento</ActionButton>
            <BackButton onClick={() => setStep('delivery')}>Voltar para o endereço</BackButton>
          </>
        )}
        {step === 'success' && (
          <>
            <h3>Pedido realizado - #001</h3>
            <p>Estamos felizes em informar que seu pedido já está em processo de preparação.</p>
            <p>Esperamos que desfrute de uma agradável experiência gastronômica.</p>
            <ActionButton onClick={() => { setStep('cart'); dispatch(toggleCart()); }}>Concluir</ActionButton>
          </>
        )}
      </Sidebar>
    </>
  );
}