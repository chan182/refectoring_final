import React from 'react';
import CommentList from '../components/mbti_community_detail/CommentList';
import MbtiComunityDetail from '../components/mbti_community_detail/MbtiComunityDetail';
import styled from 'styled-components';

const MbtiCommunityDetailPage = () => {
    return (
        <StContainer>
            <MbtiComunityDetail />
            <CommentList />
        </StContainer>
    );
};

export default MbtiCommunityDetailPage;

const StContainer = styled.div`
    background-color: var(--background-color);
    display: flex;
    flex-direction: column;
    align-items: center;
`;
