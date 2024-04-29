import { useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import { getBoardData } from '../../api/board';
import blackheart from '../../assets/community/blackheart.svg';
import fullheart from '../../assets/community/fullheart.svg';
import heart from '../../assets/community/heart.svg';
import { userAtom } from '../../recoil/Atom';
import Loading from '../common/Loading';

const MbtiCommunity = () => {
    const user = useRecoilState(userAtom);
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const [searchKeyWord, setSearchKeyWord] = useState('');

    // const handleSearchText = useCallback(
    //     _.debounce((text) => {
    //         setSearchKeyWord(text);
    //     }, 2000),
    //     []
    // );

    // const handleChange = (e) => {
    //     handleSearchText(e.target.value);
    // };

    // 데이터 패칭
    const { data, isLoading, isError } = useQuery({
        queryKey: ['communities'],
        queryFn: getBoardData
    });
    if (isLoading) {
        return <Loading />;
    }

    // const filteredData = data?.filter(({ data }) => data.title.includes(searchKeyWord));

    // // 좋아요 기능
    // const mutation = useMutation(
    //     async (id) => {
    //         // 해당 문서 값 가져오기
    //         const postRef = doc(db, 'communities', id);
    //         const postDoc = await getDoc(postRef);
    //         const postData = postDoc.data();
    //         console.log(postDoc.data());
    //         console.log(user[0].uid);

    //         // 좋아요 기능 구현
    //         if (user[0]?.uid && postData.likes?.includes(user[0]?.uid)) {
    //             return updateDoc(postRef, {
    //                 likes: arrayRemove(user[0].uid),
    //                 likecount: postData.likecount ? postData.likecount - 1 : 0
    //             });
    //         } else {
    //             return updateDoc(postRef, {
    //                 likes: arrayUnion(user[0].uid),
    //                 likecount: postData.likecount ? postData.likecount + 1 : 1
    //             });
    //         }
    //     },
    //     {
    //         onSuccess: () => {
    //             // 무효화 시키기
    //             queryClient.invalidateQueries('communities');
    //         }
    //     }
    // );

    const handleLike = async (postId) => {
        console.log(postId);
        // postId를 인자로 받기
    };

    return (
        <StBackGround>
            <StBoardTitle>자유롭게 의견을 나누고 일상을 공유해보세요</StBoardTitle>
            {/* <StsearchInputWrapper>
                <StsearchImg src={readingGlasses} alt="검색창" />
                <StsearchInput placeholder="검색어를 입력해주세요. " onChange={handleChange} autoFocus />
            </StsearchInputWrapper> */}

            <StfilteredButton>
                <div>
                    <button>전체</button>
                    {/* <button>조회 수 많은 순 </button>
                    <button>좋아요 많은 순</button>
                    <button>댓글 많은 순 </button> */}
                </div>
                <SteditButton
                    onClick={() => {
                        console.log(user);
                        if (!user[0]) {
                            Swal.fire({
                                text: '로그인 후에 이용이 가능합니다..'
                            });

                            return navigate('/login');
                        }
                        navigate('/mbti/community/write');
                    }}
                >
                    게시글 작성
                </SteditButton>
            </StfilteredButton>
            {data?.map(({ id, data }) => {
                return (
                    <StCardList key={id}>
                        <StCommunityCardImg
                            onClick={() => {
                                navigate(`/mbti/community/${id}`);
                            }}
                            src={data?.communityImage}
                        />
                        <StTitleWrapper>
                            <StButton
                                onClick={() => {
                                    handleLike(id);
                                }}
                            >
                                {user && data?.likes?.includes(user[0]?.uid) ? (
                                    <img src={fullheart} alt="눌렀을 때" />
                                ) : (
                                    <img src={heart} alt="누르지 않았을 때" />
                                )}
                            </StButton>
                        </StTitleWrapper>
                        <StCommunityContent>{data?.content}</StCommunityContent>
                        <StuserInfoWrapper>
                            <StUserInformation>
                                <StprofileImg src={data?.ImageUrl} alt="" />
                                <StlikeNumber>
                                    {data?.nickname} / {data?.mbti}
                                </StlikeNumber>
                            </StUserInformation>
                            <StlikeInformation>
                                <img src={blackheart} alt="좋아요 눌린 이미지" />
                                {data?.likecount || 0}
                            </StlikeInformation>
                        </StuserInfoWrapper>
                    </StCardList>
                );
            })}
        </StBackGround>
    );
};

export default MbtiCommunity;

const StBackGround = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
`;

const StsearchInputWrapper = styled.div`
    width: 954px;
`;

const StsearchImg = styled.img`
    width: 48px;
    height: 48px;
    position: absolute;
    margin: 16px 0px 0px 20px;
`;
const StsearchInput = styled.input`
    width: 954px;
    height: 78px;
    padding-left: 81px;
    border: 0px;
    font-size: 22px;
    border-radius: 50px;
    background-color: var(--search-background-color);

    &:focus {
        outline-color: var(--button-border-color);
    }
`;

const StBoardTitle = styled.div`
    font-size: 42px;
    margin: 68px 0px 80px 0px;
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
    display: flex;
    justify-content: space-between;
    margin: 152px auto 40px auto;
    width: 955px;

    button {
        color: white;
        background-color: #abaad8;
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
const SteditButton = styled.div`
    background: #756ab6;
    border-radius: 74px;
    cursor: pointer;
    width: 140px;
    color: #fff;
    font-size: 22px;
    font-style: normal;
    font-weight: 300;
    line-height: normal;
    letter-spacing: 0.44px;
    padding: 14px 14px;
    justify-content: center;
    align-items: center;
`;

const StCardList = styled.div`
    background: #fff;
    margin: 0 auto;
    margin-bottom: 30px;
    /* background-color: pink; */
    width: 500px;
`;

const StCommunityCardImg = styled.img`
    display: flex;
    width: 468px;
    height: 468px;
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
    margin: 0px auto 4px 18px;
`;

const StCommunityTitle = styled.div`
    color: #000;
    font-size: 2rem;
    font-style: normal;
    font-weight: 500;
    line-height: 120%;
    /* background-color: red; */
`;

const StButton = styled.button`
    cursor: pointer;
    gap: 10px;
    /* background-color: yellow; */
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
