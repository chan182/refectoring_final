import React from 'react';
import styled from 'styled-components';

const Header = () => {
    return (
        <div>
            header
            <StBtn></StBtn>
        </div>
    );
};

export default Header;

const StBtn = styled.button`
    width: 100px;
    height: 50px;
    background-color: var(--light-purple);
`;

const StDiv = styled.div`
    width: 100vh;
`;
