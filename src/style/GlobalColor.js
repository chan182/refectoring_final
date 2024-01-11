import { createGlobalStyle } from 'styled-components';

const GlobalColor = createGlobalStyle`
    :root {
        --main-button-color: #756AB6;
        --content-border-color: #EDEDED;
        --button-border-color: #ABAAD8;
        --hr-border-color: #ECECEC;
        --box-border-color: #D3D3D3;
        --background-color: #FCFCFC;
        --light-purple: #AC87C5;
        --light-pink: #E0AED0;
        --light-beige: #FFE5E5;
        --bold-gray: #73777B;
        --light-gray: #F8F8F8;
    }
`;

export default GlobalColor;
