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
    &.error { border: 2px solid #fff; outline: 2px solid red; }
  }
  small { color: #fff; font-size: 12px; font-style: italic; }
`;

const Row = styled.div`
  display: grid; grid-template-columns: 1fr 1fr; gap: 8px;
`;

const ActionButton = styled.button`
  background-color: ${colors.secondary}; color: ${colors.primary}; border: none;
  padding: 12px; width: 100%; font-weight: bold; cursor: pointer;
  margin-top: 16px;
  &:hover { opacity: 0.9; }
  &:disabled { opacity: 0.5; cursor: not-allowed; }
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
  const [orderId, setOrderId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form, setForm] = useState({
    receiver: '', address: '', city: '', zipCode: '', number: '', complement: '',
    cardName: '', cardNumber: '', cardCode: '', expiresMonth: '', expiresYear: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!isOpen) return null;
  const total = items.reduce((acc, item) => acc + item.preco, 0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' });
  };

  const validateDelivery = () => {
    const newErrors: Record<string, string> = {};
    if (!form.receiver) newErrors.receiver = 'Campo obrigatório';
    if (!form.address) newErrors.address = 'Campo obrigatório';
    if (!form.city) newErrors.city = 'Campo obrigatório';
    if (!form.zipCode || form.zipCode.length < 8) newErrors.zipCode = 'CEP inválido';
    if (!form.number) newErrors.number = 'Campo obrigatório';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePayment = () => {
    const newErrors: Record<string, string> = {};
    if (!form.cardName) newErrors.cardName = 'Campo obrigatório';
    if (!form.cardNumber) newErrors.cardNumber = 'Campo obrigatório';
    if (!form.cardCode) newErrors.cardCode = 'CVV inválido';
    if (!form.expiresMonth) newErrors.expiresMonth = 'Obrigatório';
    if (!form.expiresYear) newErrors.expiresYear = 'Obrigatório';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFinishOrder = async () => {
    if (!validatePayment()) return;
    setIsSubmitting(true);

    const payload = {
      products: items.map(item => ({ id: item.id, price: item.preco })),
      delivery: {
        receiver: form.receiver,
        address: {
          description: form.address,
          city: form.city,
          zipCode: form.zipCode,
          number: Number(form.number), // Conversão para número
          complement: form.complement
        }
      },
      payment: {
        card: {
          name: form.cardName,
          number: form.cardNumber,
          code: Number(form.cardCode), 
          expires: {
            month: Number(form.expiresMonth), 
            year: Number(form.expiresYear)   
          }
        }
      }
    };

    try {
      const response = await fetch('https://api-ebac.vercel.app/api/efood/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (response.ok) {
        setOrderId(data.orderId);
        dispatch(clear());
        setStep('success');
      } else {
        alert(`Erro na API: ${data.message || 'Verifique os dados digitados (apenas números em CEP, CVV e Datas)'}`);
      }
    } catch (error) {
      alert("Ocorreu um erro na conexão. Verifique se os campos de número contêm apenas algarismos.");
    } finally {
      setIsSubmitting(false);
    }
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
                  <div><h4>{item.nome}</h4><span>R$ {item.preco.toFixed(2)}</span></div>
                  <span className="remove" onClick={() => dispatch(remove(item.id))}>🗑️</span>
                </CartItem>
              ))}
            </ul>
            <div style={{ marginTop: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                <span>Valor total</span><span>R$ {total.toFixed(2)}</span>
              </div>
              <ActionButton onClick={() => setStep('delivery')} disabled={items.length === 0}>Continuar com a entrega</ActionButton>
            </div>
          </>
        )}

        {step === 'delivery' && (
          <>
            <h3>Entrega</h3>
            <FormGroup><label>Quem irá receber</label><input name="receiver" value={form.receiver} onChange={handleInputChange} className={errors.receiver ? 'error' : ''} /></FormGroup>
            <FormGroup><label>Endereço</label><input name="address" value={form.address} onChange={handleInputChange} className={errors.address ? 'error' : ''} /></FormGroup>
            <FormGroup><label>Cidade</label><input name="city" value={form.city} onChange={handleInputChange} className={errors.city ? 'error' : ''} /></FormGroup>
            <Row>
              <FormGroup><label>CEP</label><input name="zipCode" value={form.zipCode} onChange={handleInputChange} className={errors.zipCode ? 'error' : ''} /></FormGroup>
              <FormGroup><label>Número</label><input type="number" name="number" value={form.number} onChange={handleInputChange} className={errors.number ? 'error' : ''} /></FormGroup>
            </Row>
            <FormGroup><label>Complemento (opcional)</label><input name="complement" value={form.complement} onChange={handleInputChange} /></FormGroup>
            <ActionButton onClick={() => validateDelivery() && setStep('payment')}>Continuar com o pagamento</ActionButton>
            <BackButton onClick={() => setStep('cart')}>Voltar para o carrinho</BackButton>
          </>
        )}

        {step === 'payment' && (
          <>
            <h3>Pagamento - Valor a pagar R$ {total.toFixed(2)}</h3>
            <FormGroup><label>Nome no cartão</label><input name="cardName" value={form.cardName} onChange={handleInputChange} className={errors.cardName ? 'error' : ''} /></FormGroup>
            <Row style={{ gridTemplateColumns: '3fr 1fr' }}>
              <FormGroup><label>Número do cartão</label><input name="cardNumber" value={form.cardNumber} onChange={handleInputChange} className={errors.cardNumber ? 'error' : ''} /></FormGroup>
              <FormGroup><label>CVV</label><input type="number" name="cardCode" value={form.cardCode} onChange={handleInputChange} className={errors.cardCode ? 'error' : ''} /></FormGroup>
            </Row>
            <Row>
              <FormGroup><label>Mês de vencimento</label><input type="number" name="expiresMonth" value={form.expiresMonth} onChange={handleInputChange} className={errors.expiresMonth ? 'error' : ''} /></FormGroup>
              <FormGroup><label>Ano de vencimento</label><input type="number" name="expiresYear" value={form.expiresYear} onChange={handleInputChange} className={errors.expiresYear ? 'error' : ''} /></FormGroup>
            </Row>
            <ActionButton onClick={handleFinishOrder} disabled={isSubmitting}>{isSubmitting ? 'Enviando...' : 'Finalizar pagamento'}</ActionButton>
            <BackButton onClick={() => setStep('delivery')}>Voltar para o endereço</BackButton>
          </>
        )}

        {step === 'success' && (
          <>
            <h3>Pedido realizado - {orderId}</h3>
            <p>Estamos felizes em informar que seu pedido já está em processo de preparação.</p>
            <p>Esperamos que desfrute de uma agradável experiência gastronômica.</p>
            <ActionButton onClick={() => { setStep('cart'); dispatch(toggleCart()); }}>Concluir</ActionButton>
          </>
        )}
      </Sidebar>
    </>
  );
}