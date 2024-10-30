// src/styles/GlobalStyles.ts
import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    font-family: Arial, sans-serif;
    background-color: #f4f4f9;
    color: #333;
    width: 100%;
  }

  h3 {
    font-size: 1.1rem;
    color: #555;
    margin-bottom: 10px;
    text-align: left;
  }

  .chart-container {
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 8px;
    margin: 20px;
  }
`;

export default GlobalStyles;
