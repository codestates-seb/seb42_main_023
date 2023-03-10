import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
    *{
        box-sizing : border-box ;
        padding: 0;
        margin: 0;
        border: 0;
        font-weight: 400;
        font-size: 16px;
        font-family: -apple-system, "system-ui", "Segoe UI Adjusted", "Segoe UI", "Liberations Sans", sans-serif;
    }
    
    ol, ul {
    list-style: none;
      }
    
    a {
    text-decoration: none;
    }

    header {
      width: 100vw;
      height: 80px;
      border: 1px solid black;
      margin: auto; 
    }
    
    main {
    width: 1100px;
    height: calc(100vh - 80px - 154px);
    border: 1px solid black;
    margin: auto;    
    }   

    footer {
    width: 100vw;
    height: 154px;
    border: 1px solid black;
    margin: auto;    
    }   

`;

export default GlobalStyles;
