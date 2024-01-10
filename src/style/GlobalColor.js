import { createGlobalStyle } from 'styled-components';

const GlobalColor = createGlobalStyle`
    :root {
        --main-button-color: #756ab6;
        --content-border-color: #ededed;
        --button-border-color: #abaad8;
        --hr-border-color: #ececec;
        --footer-border-color: #d3d3d3;
        --background-color: #fcfcfc;
        --light-purple: #ac87c5;
        --light-pink: #e0aed0;
        --light-beige: #ffe5e5;
        --bold-gray: #73777B;
        --light-gray: #f8f8f8;        
    }
`;

export default GlobalColor;
