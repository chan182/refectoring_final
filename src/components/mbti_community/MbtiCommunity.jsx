import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import chevronLeft from '../../assets/community/chevron-left.svg';
import chevronRight from '../../assets/community/chevron-right.svg';
import editImoge from '../../assets/community/edit.svg';
import fullheart from '../../assets/community/fullheart.svg';
import heart from '../../assets/community/heart.svg';
import blackheart from '../../assets/community/blackheart.svg';
import readingGlasses from '../../assets/community/search.svg';
import { userAtom } from '../../recoil/Atom';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { getData } from '../../api/board';
import { useInfiniteQuery } from 'react-query';
import { arrayRemove, arrayUnion, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebase.config';

const MbtiCommunity = () => {
    const user = useRecoilState(userAtom);
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const [searchKeyWord, setSearchKeyWord] = useState('');

    ///////// 데이터 가져오기 및 filter 검색

    const { data } = useQuery({
        queryKey: ['communities', searchKeyWord],
        queryFn: getData
    });

    const filteredData = data?.filter(({ data }) => data.title.includes(searchKeyWord));

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };
    const handleSearch = () => {
        queryClient.invalidateQueries(['communities', searchKeyWord]);
    };
    ////////////// usePaginatedQuery를 사용하여 페이지별로 데이터 가져오기

    // const { resolvedData, latestData, status, isFetching, fetchNextPage, hasNextPage } = useInfiniteQuery(
    //     ['communities', searchKeyWord],
    //     getData,
    //     {
    //         getNextPageParam: (lastPage) => {
    //             return lastPage.page + 1;
    //         }
    //     }
    // );

    // const handlePageChange = (newPage) => {
    //     // 페이지 변경 함수
    //     navigate(`/mbti/community?page=${newPage}`);
    // };

    //////////////// 좋아요 기능

    const mutation = useMutation(
        async (id) => {
            // 해당 문서 값 가져오기

            const postRef = doc(db, 'communities', id);
            const postDoc = await getDoc(postRef);
            const postData = postDoc.data();
            console.log(postDoc.data());
            console.log(user[0].uid);

            // 좋아요 기능 구현

            if (user[0].uid && postData.likes.includes(user[0].uid)) {
                return updateDoc(postRef, {
                    likes: arrayRemove(user[0].uid),
                    likecount: postData.likecount ? postData.likecount - 1 : 0
                });
            } else {
                return updateDoc(postRef, {
                    likes: arrayUnion(user[0].uid),
                    likecount: postData.likecount ? postData.likecount + 1 : 1
                });
            }
        },
        {
            onSuccess: () => {
                // 무효화 시키기
                queryClient.invalidateQueries(['communities', searchKeyWord]);
            }
        }
    );

    const handleLike = async (postId) => {
        console.log(postId);
        // postId를 인자로 받기
        mutation.mutate(postId);
    };

    return (
        <StBackGround>
            <StsearchInputWrapper>
                <img src={readingGlasses} alt="검색창" />
                <StsearchInput
                    placeholder="검색어를 입력하세요 (제목)"
                    value={searchKeyWord}
                    name="searchKeyWord"
                    onChange={(e) => setSearchKeyWord(e.target.value)}
                    onKeyPress={handleKeyPress} // Add event listener for Enter key
                    autoFocus
                />
            </StsearchInputWrapper>
            <StBoardTitle>자유롭게 의견을 나누고 일상을 공유해보세요</StBoardTitle>
            <StWriteButton
                onClick={() => {
                    navigate('/mbti/community/write');
                }}
            >
                <img src={editImoge} alt="글 작성 버튼" />
                <StWriteButtonName>게시글 작성</StWriteButtonName>
            </StWriteButton>
            <StfilteredButton>
                <button>전체</button>
                <button>조회 수 많은 순 </button>
                <button>좋아요 많은 순</button>
                <button>댓글 많은 순 </button>
            </StfilteredButton>
            {filteredData?.map(({ id, data }) => {
                return (
                    <StCardList key={id}>
                        <StCommunityCardImg
                            key={data.communityImage}
                            onClick={() => {
                                navigate(`/mbti/community/${id}`);
                            }}
                            src={data.communityImage}
                        />
                        <StTitleWrapper>
                            <StCommunityTitle>{data.title} </StCommunityTitle>
                            <StButton
                                onClick={() => {
                                    handleLike(id);
                                }}
                            >
                                {user && data?.likes?.includes(user[0].uid) ? (
                                    <img src={fullheart} alt="눌렀을 때" />
                                ) : (
                                    <img src={heart} alt="누르지 않았을 때" />
                                )}
                            </StButton>
                        </StTitleWrapper>
                        <StCommunityContent>{data.content}</StCommunityContent>
                        <StuserInfoWrapper>
                            <StUserInformation>
                                <StprofileImg src={data.ImageUrl} alt="" />
                                <StlikeNumber>
                                    {data.nickname} / {data.mbti}
                                </StlikeNumber>
                            </StUserInformation>
                            <StlikeInformation>
                                <img src={blackheart} alt="좋아요 눌린 이미지" />
                                {data?.likecount || 0}
                            </StlikeInformation>
                            {/* <StMessageInformation>
                                <img src={messageImoge} alt="" />
                                <div>0</div>
                            </StMessageInformation>
                            <StViewInformation>
                                <img src={eyeImoge} alt="" />
                                <div>0</div>
                            </StViewInformation> */}
                        </StuserInfoWrapper>
                    </StCardList>
                );
            })}
            {/* <StPagination>
                <button onClick={() => handlePageChange(resolvedData?.page - 1)} disabled={resolvedData?.page === 1}>
                    이전
                </button>
                <span>현재 페이지: {resolvedData?.page}</span>
                <button onClick={() => handlePageChange(resolvedData?.page + 1)} disabled={!hasNextPage || isFetching}>
                    다음
                </button>
            </StPagination> */}
        </StBackGround>
    );
};

export default MbtiCommunity;

const StBackGround = styled.div``;

const StsearchInputWrapper = styled.div`
    background-color: var(--light-gray);
    border-radius: 100px;
    display: flex;
    max-width: 1440px;
    padding: 15px 21px;
    gap: 12px;
    margin: 60px auto;
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
    margin: 0 auto;
    max-width: 740px;
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
    margin: 14px auto 60px;

    &:hover {
        background-color: var(--main-button-color);
        color: white;
    }
`;

const StWriteButtonName = styled.div`
    color: #fff;
    font-size: 22px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: 0.44px;
    width: 150px;
    margin: 0 auto;
`;

const StfilteredButton = styled.div`
    margin: 0 auto 40px auto;
    width: 700px;

    button {
        color: black;
        background-color: #f8f8f8;
        font-size: 22px;
        font-style: normal;
        font-weight: 300;
        line-height: normal;
        letter-spacing: 0.44px;
        border-radius: 74px;

        padding: 12px 14px;
        justify-content: center;
        align-items: center;
        margin-right: 24px;
        padding: 15px 20px;
    }
`;

const StCardList = styled.div`
    max-width: 956px;

    border-radius: 26px;
    border: 1px solid #ededed;
    background: #fff;
    margin: 0 auto;
    margin-bottom: 30px;
`;

const StCommunityCardImg = styled.img`
    display: flex;
    width: 924px;
    height: 350px;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    border-radius: 16px;
    background: #efefef;
    margin: 16px;
    object-fit: cover;
    cursor: pointer;
`;

const StTitleWrapper = styled.div`
    display: inline-flex;
    align-items: center;
    gap: 12px;
    margin: 0px auto 4px 18px;
`;

const StCommunityTitle = styled.div`
    color: #000;
    font-size: 25px;
    font-style: normal;
    font-weight: 500;
    line-height: 120%;
`;

const StButton = styled.button`
    display: flex;
    gap: 10px;
`;

const StCommunityContent = styled.div`
    max-width: 956px;
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
    gap: 24px;
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

const StlikeNumber = styled.div`
    color: #4e4e4e;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 120%;
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
