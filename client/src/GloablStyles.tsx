import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
      :root {
        --border-color: #D9D9D9; 
        --background-color: #fcfcfc;
        --background-dark-color: #f5f4f4;
        --main-font-color: #000000;
        --hover-font-gray-color:#5C5C5C;
        --sub-font-color: #94969b;
        --point-blue-color: #0069CA;
        --hover-point-blue-color :#0275e1;
        --point-font-color: #fff;
        --hover-button-color:#f9f6f6;
        --error-red-color: #CA0000;
        --sub-font-size: 12px;
      }

    *{
        box-sizing : border-box ;
        padding: 0;
        margin: 0;
        border:0;
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
    color:var(--main-font-color)
    }
    button{
      background-color: #fff;
      cursor: pointer;
    }
    img{
      border: 0;
    }

    header {
      position: fixed;
      width: 100vw;
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
