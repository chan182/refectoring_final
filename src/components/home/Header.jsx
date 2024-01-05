import React from 'react';
import styled from 'styled-components';

const Header = () => {
    return (
        <div>
            <StBtn>header</StBtn>
        </div>
    );
};

export default Header;

const StBtn = styled.button`
    width: 100px;
    height: 50px;
    background-color: var(--light-purple);
`;
