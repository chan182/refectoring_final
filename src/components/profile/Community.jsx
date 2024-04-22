import React from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { getBoardData } from '../../api/board';
import eyeImoge from '../../assets/profile/eye.svg';
import heartImoge from '../../assets/profile/heart.svg';
import messageSquare from '../../assets/profile/message-square.svg';
import { userAtom } from '../../recoil/Atom';

const Community = () => {
    const [user, setUser] = useRecoilState(userAtom);

    const navigate = useNavigate();
    const { data } = useQuery({
        queryKey: ['communities'],
        queryFn: getBoardData
    });

    const filteredData = Array.isArray(data) ? data.filter((item) => item.data.id === user?.uid) : [];

    return (
        <>
            <Stbolder>
                <Stcontents>
                    {filteredData.map((item) => {
                        return (
                            <StCardWrapper
                                onClick={() => {
                                    navigate('/mbti/community/');
                                }}
                            >
                                <StfilteredTitle>{item?.data.title}</StfilteredTitle>
                                <StImoges>
                                    <img src={heartImoge} alt="" />
                                    <StLikeCount>{item?.data.likecount || 0}</StLikeCount>
                                    <img src={messageSquare} alt="" />
                                    <StCommentCount>0</StCommentCount>
                                    <img src={eyeImoge} alt="" />
                                    <StViewCount>0</StViewCount>
                                </StImoges>
                            </StCardWrapper>
                        );
                    })}
                </Stcontents>
            </Stbolder>
        </>
    );
};

export default Community;

const StmainWrapper = styled.div`
    width: 60%;
    height: 500px;
    margin: 10px auto;
    border-radius: 10px;
    background: white;
    border: 1px solid var(--content-border-color);
`;

const Stbolder = styled.div`
    padding: 10px;
    border-radius: 10px;
`;

const StTitle = styled.div`
    font-size: 24px;
    color: var(--bold-gray);
    width: 60%;
    padding: 0px 0px 0px 10px;
`;

const Stcontents = styled.div`
    div {
        display: flex;
        flex-direction: row;
        margin: 10px;
        justify-content: space-between;
        align-items: center;
        border-radius: 6px;
        background: #f9f9ff;
    }
`;

const StCardWrapper = styled.div`
    cursor: pointer;
`;

const StfilteredTitle = styled.div``;

const StImoges = styled.div``;

const StLikeCount = styled.div``;

const StCommentCount = styled.div``;

const StViewCount = styled.div``;
