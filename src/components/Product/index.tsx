import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Card = styled.div`
  background-color: #fff;
  border: 1px solid #E66767;
  position: relative;
  color: #E66767;
  img { width: 100%; height: 217px; object-fit: cover; }
`;

const Tag = styled.div`
  position: absolute; top: 16px; right: 16px;
  background-color: #E66767; color: #FFEBD9;
  padding: 6px 10px; font-size: 12px; font-weight: bold;
`;

const Info = styled.div`
  padding: 8px;
  .header { 
    display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; 
    h3 { font-size: 18px; font-weight: bold; }
    span { font-weight: bold; display: flex; align-items: center; gap: 4px; }
  }
  p { font-size: 14px; line-height: 22px; margin-bottom: 16px; color: #E66767; }
`;

const SaibaMais = styled(Link)`
  background: #E66767; color: #FFEBD9; 
  text-decoration: none; padding: 6px 12px; font-weight: bold;
  display: inline-block;
`;

export default function Product(props: any) {
  return (
    <Card>
      <img src={props.capa} alt={props.titulo} />
      <Tag>{props.tipo}</Tag>
      <Info>
        <div className="header">
          <h3>{props.titulo}</h3>
          <span>{props.avaliacao} ★</span>
        </div>
        <p>{props.descricao.substring(0, 120)}...</p>
        <SaibaMais to={`/perfil/${props.id}`}>Saiba mais</SaibaMais>
      </Info>
    </Card>
  );
}