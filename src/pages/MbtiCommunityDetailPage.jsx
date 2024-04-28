import React from 'react';
import styled from 'styled-components';
import CommentList from '../components/mbti_community_detail/CommentList';
import MbtiComunityDetail from '../components/mbti_community_detail/MbtiComunityDetail';

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
