import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import {type  RootState } from '../../store';
import { remove, toggleCart, clear } from '../../store/cartSlice';

const colors = { primary: '#E66767', secondary: '#FFEBD9' };

const Overlay = styled.div`
  position: fixed; top: 0; left: 0; width: 100%; height: 100%;
  background: rgba(0, 0, 0, 0.7); z-index: 2000;
`;

const Sidebar = styled.aside`
  background-color: ${colors.primary};
  position: fixed; top: 0; right: 0;
  max-width: 360px; width: 100%; height: 100%;
  padding: 32px 16px; z-index: 2001;
  display: flex; flex-direction: column; color: ${colors.secondary};
  overflow-y: auto;
`;

const FormGroup = styled.div`
  margin-bottom: 8px;
  label { display: block; font-size: 14px; margin-bottom: 4px; font-weight: bold; }
  input { width: 100%; padding: 8px; background: ${colors.secondary}; border: none; font-weight: bold; color: #4b4b4b; }
`;

const ActionButton = styled.button`
  background-color: ${colors.secondary}; color: ${colors.primary}; border: none;
  padding: 12px; width: 100%; font-weight: bold; cursor: pointer; margin-top: 16px;
  &:disabled { opacity: 0.5; }
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
  const [orderId, setOrderId] = useState('');
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    receiver: '', address: '', city: '', zipCode: '', number: '',
    cardName: '', cardNumber: '', cardCode: '', expiresMonth: '', expiresYear: ''
  });

  if (!isOpen) return null;
  const total = items.reduce((acc, item) => acc + item.preco, 0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFinishOrder = async () => {
    setLoading(true);
    const payload = {
      products: items.map(i => ({ id: i.id, price: i.preco })),
      delivery: {
        receiver: form.receiver,
        address: { description: form.address, city: form.city, zipCode: form.zipCode, number: Number(form.number) }
      },
      payment: {
        card: { name: form.cardName, number: form.cardNumber, code: Number(form.cardCode), expires: { month: Number(form.expiresMonth), year: Number(form.expiresYear) } }
      }
    };

    try {
      const response = await fetch('https://api-ebac.vercel.app/api/efood/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await response.json();
      setOrderId(data.orderId); 
      dispatch(clear()); 
      setStep('success'); 
    } catch (error) {
      alert("Erro ao realizar pedido.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Overlay onClick={() => dispatch(toggleCart())} />
      <Sidebar>
        
        {step === 'cart' && (
          <>
            <h3>Carrinho</h3>
            <ul style={{ listStyle: 'none', flex: 1 }}>
              {items.map(item => (
                <CartItem key={item.id}>
                  <img src={item.foto} alt={item.nome} />
                  <div><h4>{item.nome}</h4><span>R$ {item.preco.toFixed(2)}</span></div>
                  <span className="remove" onClick={() => dispatch(remove(item.id))}>🗑️</span>
                </CartItem>
              ))}
            </ul>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
              <span>Total</span><span>R$ {total.toFixed(2)}</span>
            </div>
            <ActionButton onClick={() => setStep('delivery')}>Continuar com a entrega</ActionButton>
          </>
        )}

        {step === 'delivery' && (
          <>
            <h3>Entrega</h3>
            <FormGroup><label>Quem recebe</label><input name="receiver" onChange={handleInputChange} /></FormGroup>
            <FormGroup><label>Endereço</label><input name="address" onChange={handleInputChange} /></FormGroup>
            <FormGroup><label>Cidade</label><input name="city" onChange={handleInputChange} /></FormGroup>
            <div style={{ display: 'flex', gap: '8px' }}>
                <FormGroup><label>CEP</label><input name="zipCode" onChange={handleInputChange} /></FormGroup>
                <FormGroup><label>Número</label><input name="number" onChange={handleInputChange} /></FormGroup>
            </div>
            <ActionButton onClick={() => setStep('payment')}>Ir para pagamento</ActionButton>
          </>
        )}

        {step === 'payment' && (
          <>
            <h3>Pagamento - R$ {total.toFixed(2)}</h3>
            <FormGroup><label>Nome no Cartão</label><input name="cardName" onChange={handleInputChange} /></FormGroup>
            <FormGroup><label>Número do Cartão</label><input name="cardNumber" onChange={handleInputChange} /></FormGroup>
            <FormGroup><label>CVV</label><input name="cardCode" onChange={handleInputChange} /></FormGroup>
            <div style={{ display: 'flex', gap: '8px' }}>
                <FormGroup><label>Mês</label><input name="expiresMonth" onChange={handleInputChange} /></FormGroup>
                <FormGroup><label>Ano</label><input name="expiresYear" onChange={handleInputChange} /></FormGroup>
            </div>
            <ActionButton disabled={loading} onClick={handleFinishOrder}>
              {loading ? 'Finalizando...' : 'Finalizar Pedido'}
            </ActionButton>
          </>
        )}

        {step === 'success' && (
          <>
            <h3>Pedido realizado - {orderId}</h3>
            <p>Seu pedido já está em preparação!</p>
            <p>Obrigado por escolher o efood.</p>
            <ActionButton onClick={() => { setStep('cart'); dispatch(toggleCart()); }}>Concluir</ActionButton>
          </>
        )}
      </Sidebar>
    </>
  );
}