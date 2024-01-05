import React from 'react';
import styled from 'styled-components';

const Footer = () => {
    return (
        <StBox>
            <StDiv>footer</StDiv>
        </StBox>
    );
};

export default Footer;

const StBox = styled.div`
    width: 100%;
    height: 150px;
    display: flex;
    position: fixed;
    justify-content: space-between;
    position: absolute;
    bottom: 0;
    background-color: var(--light-gray);
`;

const StDiv = styled.div``;
