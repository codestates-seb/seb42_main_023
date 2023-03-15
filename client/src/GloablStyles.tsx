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
        -ms-overflow-style: none;
        ::-webkit-scrollbar {
          display: none;
         }
 }    
    ol, ul {
    list-style: none;
      }
    
    a {
    text-decoration: none;
    }

    header {
      position: fixed;
      width: 100vw;
      height: 60px;
      margin: auto; 
    }
    
    main {
    max-width: 1100px;
    min-height: calc(100vh - 60px - 154px);
    height: 100%;
    border: 1px solid black;
    margin:0 auto;  
    padding-top: 120px;
    }   

    footer {
    width: 100vw;
    height: 154px;
    margin: auto;    
    }   

    

`;

export default GlobalStyles;
