import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  html, body {
    padding: 0;
    margin: 0;
    min-height: 100vh;
    overflow: hidden;
    font-family:'work sans';
  }

  #root {
    display: flex;
    flex-flow: column;
    min-height: 100vh;
  }

  body {
    background: #00b140;
  }

  /*@keyframes rainbow {
    0%   {border-color: #FF0000;color: #FF0000;}
    14.25%  {border-color: #4B0082;color: #4B0082;}
    28.5%  {border-color: #0000FF;color: #0000FF;}
    42.75% {border-color: #00FF00;color: #00FF00;}
    57% {border-color: #FFFF00;color: #FFFF00;}
    85.5% {border-color:#FF7F00;color:#FF7F00;}
    100% {border-color: #FF0000;color: #FF0000;}
  }

  @keyframes rainbowbg {
    0%   {background-color: #FF0000;color: #FF0000;}
    14.25%  {background-color: #4B0082;color: #4B0082;}
    28.5%  {background-color: #0000FF;color: #0000FF;}
    42.75% {background-color: #00FF00;color: #00FF00;}
    57% {background-color: #FFFF00;color: #FFFF00;}
    85.5% {background-color:#FF7F00;color:#FF7F00;}
    100% {background-color: #FF0000;color: #FF0000;}
  }*/


  
`;
