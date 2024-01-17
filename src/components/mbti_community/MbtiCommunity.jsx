import React from 'react';
import { useNavigate } from 'react-router';

const MbtiCommunity = () => {
    const nav = useNavigate();

    return (
        <div>
            MBTI 커뮤니티 페이지
            <button onClick={() => nav('/mbti/community/write')}>작성하기</button>
        </div>
    );
};

export default MbtiCommunity;
