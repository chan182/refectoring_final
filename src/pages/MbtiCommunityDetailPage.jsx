import React from 'react';
import CommentList from '../components/mbti_community_detail/CommentList';
import MbtiComunityDetail from '../components/mbti_community_detail/MbtiComunityDetail';

const MbtiCommunityDetailPage = () => {
    return (
        <div>
            <MbtiComunityDetail />
            <CommentList />
        </div>
    );
};

export default MbtiCommunityDetailPage;
