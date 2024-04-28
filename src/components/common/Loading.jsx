import React from 'react';
import { BeatLoader } from 'react-spinners';
import styled from 'styled-components';
const Loading = () => {
    return (
        <StLoadingWrapper>
            <BeatLoader color="#8d78ee" />
        </StLoadingWrapper>
    );
};

export default Loading;

const StLoadingWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    size: 500px;
`;
