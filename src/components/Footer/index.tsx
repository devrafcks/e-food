import styled from 'styled-components';
import { FaInstagram, FaFacebook, FaTwitter } from 'react-icons/fa';

const FooterContainer = styled.footer`
  background-color: #ffebd9;
  padding: 64px 0 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 80px;
`;

const Logo = styled.img`
  width: 140px;
  margin-bottom: 32px;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 80px;

  a {
    background-color: #E66767;
    color: #ffebd9;
    width: 32px; height: 32px;
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    text-decoration: none; font-size: 18px;
    transition: transform 0.3s ease;
    &:hover { transform: scale(1.1); }
  }
`;

const Disclaimer = styled.p`
  max-width: 520px;
  text-align: center;
  font-size: 11px;
  line-height: 1.6;
  color: #E66767;
  font-weight: bold;
  padding: 0 20px;
`;

const Copyright = styled.div`
  margin-top: 40px;
  font-size: 10px;
  color: #E66767;
  text-transform: uppercase;
`;

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <FooterContainer>
      <Logo src="/logo.png" alt="efood" />
      <SocialLinks>
        <a href="https://instagram.com" target="_blank" rel="noreferrer"><FaInstagram /></a>
        <a href="https://facebook.com" target="_blank" rel="noreferrer"><FaFacebook /></a>
        <a href="https://twitter.com" target="_blank" rel="noreferrer"><FaTwitter /></a>
      </SocialLinks>
      <Disclaimer>
        A efood é uma plataforma para divulgação de estabelecimentos. A responsabilidade pela entrega e qualidade dos produtos é integralmente do estabelecimento contratado.
      </Disclaimer>
      <Copyright>
        © {currentYear} efood - Todos os direitos reservados.
      </Copyright>
    </FooterContainer>
  );
}