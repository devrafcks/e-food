import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { add } from '../../store/cartSlice';
import { type CardapioItem } from '../../types';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0; left: 0; width: 100%; height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex; align-items: center; justify-content: center;
  z-index: 3000;
`;

const ModalContent = styled.div`
  background: #E66767;
  padding: 32px;
  max-width: 1024px;
  width: 90%;
  display: flex;
  gap: 24px;
  position: relative;
  color: #FFEBD9;

  @media (max-width: 768px) { flex-direction: column; padding: 16px; }
`;

const CloseButton = styled.button`
  position: absolute; top: 16px; right: 16px;
  background: none; border: none; color: #fff; cursor: pointer;
  font-size: 24px;
`;

const AddButton = styled.button`
  background: #FFEBD9;
  border: none;
  color: #E66767;
  padding: 12px 24px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 16px;
`;

interface ModalProps {
  item: CardapioItem | null;
  onClose: () => void;
}

export default function Modal({ item, onClose }: ModalProps) {
  const dispatch = useDispatch();
  if (!item) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <img src={item.foto} alt={item.nome} style={{ width: '280px', height: '280px', objectFit: 'cover' }} />
        <div>
          <h3 style={{ fontSize: '24px', marginBottom: '16px', fontWeight: '900' }}>{item.nome}</h3>
          <p style={{ lineHeight: '1.6', marginBottom: '16px' }}>{item.descricao}</p>
          <p style={{ marginBottom: '24px' }}>Serve: {item.porcao}</p>
          <AddButton onClick={() => { dispatch(add(item)); onClose(); }}>
            Adicionar ao carrinho - R$ {item.preco.toFixed(2)}
          </AddButton>
        </div>
      </ModalContent>
    </ModalOverlay>
  );
}