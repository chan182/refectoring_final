import { collection, getDocs, limit, query, startAfter } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import blackheart from '../../assets/community/blackheart.svg';
import chevronLeft from '../../assets/community/chevron-left.svg';
import chevronRight from '../../assets/community/chevron-right.svg';
import editImoge from '../../assets/community/edit.svg';
import eyeImoge from '../../assets/community/eyeImoge.svg';
import heartImoge from '../../assets/community/heart.svg';
import messageImoge from '../../assets/community/messageImoge.svg';
import readingGlasses from '../../assets/community/search.svg';
import { db } from '../../firebase/firebase.config';

const MbtiCommunity = () => {
    const [community, setCommunity] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20;
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const q = query(collection(db, 'communities'), limit(itemsPerPage));
                const querySnapshot = await getDocs(q);
                const communityData = querySnapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }));
                setCommunity(communityData);
            } catch (error) {
                console.log('fetching error data ====>', error);
            }
        };
        fetchData();
    }, []);
    console.log(community);

    const handlePageChange = async (newPage) => {
        try {
            const q = query(collection(db, 'communities'), startAfter(currentPage * itemsPerPage), limit(itemsPerPage));
            const querySnapshot = await getDocs(q);
            const communityData = querySnapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }));
            setCommunity(community.concat(communityData));
            setCurrentPage(newPage);
        } catch (error) {
            console.log('fetching error data ====>', error);
        }
    };

    console.log(community);
    return (
        <StBackGround>
            <StsearchInputWrapper>
                <img src={readingGlasses} alt="검색창" />
                <StsearchInput placeholder="검색어를 입력하세요" />
            </StsearchInputWrapper>
            <StBoardTitle>자유롭게 의견을 나누고 일상을 공유해보세요</StBoardTitle>
            <StWriteButton>
                <img src={editImoge} alt="글 작성 버튼" />
                <StWriteButtonName>게시글 작성</StWriteButtonName>
            </StWriteButton>
            <StfilteredButton>
                <button>전체</button>
                <button>조회 수 많은 순 </button>
                <button>좋아요 많은 순</button>
                <button>댓글 많은 순 </button>
            </StfilteredButton>
            {community?.map(({ id, data }) => {
                return (
                    <StCardList
                        key={data.id}
                        onClick={() => {
                            navigate(`/mbti/community/${id}`);
                        }}
                    >
                        <StCommunityCardImg src={data.communityImage} />
                        <StTitleWrapper>
                            <StCommunityTitle>{data.title} </StCommunityTitle>
                            <img src={heartImoge} alt="좋아요 버튼" />
                        </StTitleWrapper>
                        <StCommunityContent>{data.content}</StCommunityContent>
                        <StuserInfoWrapper>
                            <StUserInformation>
                                <StprofileImg src={data.ImageUrl} alt="" />
                                <div>
                                    {data.nickname} / {data.blood}
                                </div>
                            </StUserInformation>
                            <StlikeInformation>
                                <img src={blackheart} alt="좋아요 이미지" />
                                <div>999M</div>
                            </StlikeInformation>
                            <StMessageInformation>
                                <img src={messageImoge} alt="" />
                                <div>999K</div>
                            </StMessageInformation>
                            <StViewInformation>
                                <img src={eyeImoge} alt="" />
                                <div>999M</div>
                            </StViewInformation>
                        </StuserInfoWrapper>
                    </StCardList>
                );
            })}
            <StPagination>
                <img src={chevronLeft} alt="" onClick={() => handlePageChange(currentPage - 1)} />
                {[...Array(currentPage)].map((_, index) => (
                    <button key={index} onClick={() => handlePageChange(index + 1)}>
                        {index + 1}
                    </button>
                ))}
                <img src={chevronRight} alt="" onClick={() => handlePageChange(currentPage + 1)} />
            </StPagination>
        </StBackGround>
    );
};

export default MbtiCommunity;

const StBackGround = styled.div`
    width: 1920px;
    background: #fcfcfc;
`;

const StsearchInputWrapper = styled.div`
    background-color: var(--light-gray);
    border-radius: 100px;
    display: flex;
    width: 1440px;
    padding: 15px 21px;
    gap: 12px;
    margin: 42px 240px;
`;

const StsearchInput = styled.input`
    width: 1398px;
    color: black;
    background-color: transparent;
    border: none;

    font-size: 22px;
    font-style: normal;
    font-weight: 300;
    line-height: normal;
    letter-spacing: 0.44px;
`;

const StBoardTitle = styled.div`
    color: #000;

    font-size: 42px;
    font-style: normal;
    font-weight: 300;
    line-height: 120%; /* 50.4px */
    margin: 80px 590px 14px 590px;
    width: 1920px;
`;

const StWriteButton = styled.button`
    display: flex;
    width: 200px;
    padding: 26px 22px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border-radius: 74px;
    background: #abaad8;
    margin: 0px 869px;
`;

const StWriteButtonName = styled.div`
    color: #fff;

    font-size: 22px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: 0.44px;
    width: 150px;
`;

const StfilteredButton = styled.div`
    display: inline-flex;
    align-items: flex-start;
    gap: 24px;
    margin: 60px 850px 0px 482px;
    width: 100%;

    button {
        color: #fff;

        font-size: 22px;
        font-style: normal;
        font-weight: 300;
        line-height: normal;
        letter-spacing: 0.44px;
        border-radius: 74px;
        background: #756ab6;
        padding: 12px 14px;
        justify-content: center;
        align-items: center;
    }
`;

const StCardList = styled.div`
    width: 956px;
    height: 520px;
    border-radius: 26px;
    border: 1px solid #ededed;
    background: #fff;
    margin: 40px 482px 0px 482px;
`;

const StCommunityCardImg = styled.img`
    display: flex;
    width: 924px;
    height: 330px;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    border-radius: 16px;
    background: #efefef;
    margin: 16px;
    object-fit: cover;
`;

const StTitleWrapper = styled.div`
    display: inline-flex;
    align-items: center;
    gap: 12px;
    margin: 0px auto 4px 18px;
`;

const StCommunityTitle = styled.div`
    color: #000;

    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: 120%;
`;

const StCommunityContent = styled.div`
    width: 924px;
    height: 49px;
    overflow: hidden;
    color: #121212;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 148%; /* 23.68px */
    letter-spacing: -0.08px;
    margin: 0px 14px 20px 18px;
`;

const StuserInfoWrapper = styled.div`
    display: inline-flex;
    align-items: center;
    gap: 48px;
    margin: 0px 473px 25px 16px;
    width: 100%;
`;

const StUserInformation = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
`;

const StprofileImg = styled.img`
    width: 38px;
    height: 38px;
    fill: #efefef;
    stroke-width: 1px;
    stroke: #8d8d8d;
    border-radius: 50%;
`;

const StlikeInformation = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 4px;
`;

const StMessageInformation = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 4px;
`;

const StViewInformation = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 4px;
`;

const StPagination = styled.div`
    display: inline-flex;
    align-items: center;
    gap: 26px;
    margin: 60px 600px 96px 600px;

    div {
        color: #4e4e4e;
        font-size: 22px;
        font-style: normal;
        font-weight: 400;
        line-height: 120%; /* 26.4px */
    }
`;
