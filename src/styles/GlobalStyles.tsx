import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Inter', sans-serif;
  }

  body {
    background-color: #0a0a0a;
    color: #f5f5f5;
  }

  button {
    cursor: pointer;
    transition: all 0.3s ease;
  }
`;