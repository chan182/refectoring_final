import React, { useState } from 'react';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import { addComment, deleteComment, getCommentsByCreatedAt, modifyCommnetHandler } from '../../api/comment';
import upVector from '../../assets/community/Vector-up.svg';
import blackVector from '../../assets/community/blackVector.svg';
import dropdown from '../../assets/community/dropdown.png';
import { userAtom } from '../../recoil/Atom';

const CommentList = () => {
    const user = useRecoilValue(userAtom);
    const [showButtons, setShowButtons] = useState(false);
    const [content, setContent] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [userCommentId, setUserCommentId] = useState('');
    const [updateComment, setUpdateComment] = useState('');
    const [CommentCount, setCommentCount] = useState(0);
    const params = useParams();
    const queryClient = useQueryClient();
    const [selectedOption, setSelectedOption] = useState('latest');
    const navigate = useNavigate();
    const now = dayjs();
    const [isOpen, setIsOpen] = useState(true);
    const [selectedCommentId, setSelectedCommentId] = useState();

    //fetching
    const { data } = useQuery({
        queryKey: ['comments'],
        queryFn: () => getCommentsByCreatedAt(params.id)
    });

    // 추가
    const mutation = useMutation({
        mutationFn: (newComment) => addComment(newComment, params.id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['comments'] });
        }
    });

    // 수정
    const updateMutation = useMutation({
        mutationFn: () => modifyCommnetHandler(userCommentId, params.id, updateComment),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['comments'] });
            setEditMode(!editMode);
        },
        onError: () => {
            console.log('실패');
        }
    });

    // 삭제
    const deleteMutation = useMutation({
        mutationFn: (id) => deleteComment(id, params.id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['comments'] });
        }
    });

    // const getCommentsQueryFn = () => {
    //     // console.log(selectedOption);
    //     if (selectedOption === 'latest') {
    //         return getCommentsByCreatedAt(params.id);
    //     } else if (selectedOption === 'best') {
    //         // 좋아요가 많은 순으로 가져오는 함수를 사용하도록 변경
    //         return getCommentsByLikeCount(params.id);
    //     }
    // };

    const handleToggleDropdown = (id) => {
        setIsOpen(!isOpen);
        setSelectedCommentId(id);
    };

    // 좋아요 기능 !! ! !!

    // const mutation = useMutation(
    //     async (postId) => {
    //         console.log(postId);
    //         console.log(params.id);
    //         const postRef = doc(db, 'communities', params.id, 'comments', postId);
    //         // console.log(postRef);
    //         const postDoc = await getDoc(postRef);
    //         const postData = postDoc.data();
    //         // console.log(postData.likes);
    //         // console.log(user.uid);
    //         if (user?.uid && postData.likes?.includes(user.uid)) {
    //             return updateDoc(postRef, {
    //                 likes: arrayRemove(user.uid),
    //                 likecount: postData.likecount ? postData.likecount - 1 : 0
    //             });
    //         } else {
    //             return updateDoc(postRef, {
    //                 likes: arrayUnion(user.uid),
    //                 likecount: postData.likecount ? postData.likecount + 1 : 1
    //             });
    //         }
    //     },
    //     {
    //         onSuccess: () => {
    //             queryClient.invalidateQueries(['comments']);
    //         }
    //     }
    // );

    // const handleLke = (postId) => {
    //     // console.log(postId);
    //     // console.log(params.id);
    //     mutation.mutate(postId);
    // };

    return (
        <Stwrapper>
            <StCommentTitleWrapper>
                <StTitle>댓글 {CommentCount} 개 </StTitle>
                <StSortOptions
                    value={selectedOption}
                    onChange={(e) => {
                        setSelectedOption(e.target.value);
                    }}
                >
                    <option value="latest">최신순</option>
                    <option value="best">인기순</option>
                </StSortOptions>
            </StCommentTitleWrapper>
            <StInputWrapper>
                <StImageIntutWrapper>
                    <StProfileImoge src={user?.imageUrl} alt="" />
                    <StInput
                        value={content}
                        onChange={(e) => {
                            setContent(e.target.value);
                        }}
                        onClick={() => setShowButtons(true)}
                    />
                </StImageIntutWrapper>
                {showButtons === true ? (
                    <StButtonWrapper>
                        <StButton
                            onClick={() => {
                                setShowButtons(false);
                            }}
                        >
                            취소
                        </StButton>
                        <StButton
                            onClick={() => {
                                if (!user) {
                                    Swal.fire({
                                        title: '로그인한 유저만 댓글작성이 가능합니다.'
                                    });
                                    return navigate('/login');
                                }
                                const newComment = {
                                    ImageUrl: user.imageUrl,
                                    content,
                                    createdAt: now.format('YY-MM-DD HH:mm:ss'),
                                    nickname: user.nickname,
                                    id: user.uid,
                                    likes: '',
                                    likecount: 0
                                };
                                setContent('');
                                mutation.mutate(newComment);
                            }}
                        >
                            댓글
                        </StButton>
                    </StButtonWrapper>
                ) : (
                    <></>
                )}
            </StInputWrapper>
            {data?.map(({ id, data }) => {
                // console.log(id);
                return (
                    <StCommentCardList key={id}>
                        <StProfileImoge src={data?.ImageUrl} alt="" />
                        <StCommentWrapper>
                            <StCommentUserInfo>
                                <StFlex>
                                    <div>{data?.nickname}</div>
                                    <div>{data?.createdAt}</div>
                                </StFlex>
                                <StCommentDropdown>
                                    <DropdownButton onClick={() => handleToggleDropdown(id)}>
                                        <img
                                            src={dropdown}
                                            alt="수정/삭제 버튼"
                                            style={{
                                                width: '24px',
                                                height: '30px',
                                                marginTop: '-20px',
                                                border: 'none',
                                                cursor: 'pointer'
                                            }}
                                        />
                                    </DropdownButton>
                                    {/* {isOpen == true && user?.uid === data?.id && selectedCommentId === id ? ( */}
                                    {isOpen === true && selectedCommentId === id ? (
                                        <MenuBox>
                                            <StEditButton
                                                onClick={() => {
                                                    console.log(id);
                                                    setEditMode(!editMode);
                                                    setUserCommentId(id);
                                                    setUpdateComment(data?.content);
                                                }}
                                            >
                                                댓글 수정
                                            </StEditButton>
                                            <StDeleteButton
                                                onClick={() => {
                                                    setUserCommentId(id);
                                                    deleteMutation.mutate(id);
                                                }}
                                            >
                                                댓글 삭제
                                            </StDeleteButton>
                                        </MenuBox>
                                    ) : (
                                        <></>
                                    )}
                                </StCommentDropdown>
                            </StCommentUserInfo>

                            <Stcomment>
                                {editMode && userCommentId === id ? (
                                    <form
                                        onSubmit={(e) => {
                                            console.log(id, updateComment);
                                            e.preventDefault();
                                            updateMutation.mutate(id, updateComment);
                                        }}
                                    >
                                        <Stcomment>
                                            <StInput
                                                value={updateComment}
                                                onChange={(e) => setUpdateComment(e.target.value)}
                                            />
                                        </Stcomment>
                                        <button type="submit">입력</button>
                                        <button>취소</button>
                                    </form>
                                ) : (
                                    <Stcomment>{data?.content}</Stcomment>
                                )}
                            </Stcomment>

                            <StUpDown>
                                <StUp>
                                    <button
                                        onClick={() => {
                                            // handleLke(id);
                                        }}
                                    >
                                        {user?.uid && data?.likes?.includes(user?.uid) ? (
                                            <img src={blackVector} alt="좋아요눌린버튼" />
                                        ) : (
                                            <img src={upVector} alt="좋아요안눌린버튼" />
                                        )}
                                    </button>
                                    <div>{data?.likecount}</div>
                                </StUp>
                                {/* <StDown>
                                    <img src={downVector} alt="" />
                                </StDown> */}
                            </StUpDown>
                        </StCommentWrapper>
                    </StCommentCardList>
                );
            })}
        </Stwrapper>
    );
};

export default CommentList;

const Stwrapper = styled.div`
    width: 1200px;
    border-radius: 26px;
    border: 1px solid #ededed;
    background: #fff;
    margin: 0 auto 100px;
`;

const StCommentTitleWrapper = styled.div`
    margin: 26px auto 22px 24px;
    display: flex;
    align-items: flex-start;
    gap: 37px;
`;

const StTitle = styled.div`
    color: #000;
    font-size: 22px;
    font-style: normal;
    font-weight: 400;
    line-height: 120%; /* 26.4px */
`;

const StSortOptions = styled.select`
    display: flex;
    flex-direction: column;
    padding: 7px;
    font-size: 16px;
    border: none;
    option {
        padding: 10px;
        text-align: left;
        border: none;
        background: none;
        cursor: pointer;
        font-size: 18px;

        &:hover {
            background-color: #f2f2f2;
        }
    }
`;
const StProfileImoge = styled.img`
    width: 38px;
    height: 38px;
    fill: #efefef;
    stroke-width: 1px;
    stroke: #8d8d8d;
    border-radius: 50%;
`;

const StInputWrapper = styled.div`
    display: inline-flex;

    gap: 4px;
    margin: 0px 24px 68px 24px;
    flex-direction: column;
`;

const StImageIntutWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 4px;
`;

const StInput = styled.input`
    display: flex;
    width: 1110px;
    padding: 10px;
    align-items: flex-start;
    border-width: 0 0 1px;
    gap: 10px;
    color: #4e4e4e;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 148%; /* 23.68px */
    letter-spacing: -0.08px;
`;

// 추후 수정 필요

const StButtonWrapper = styled.div`
    display: flex;
    gap: 4px;
    margin: 0px auto 0px 85%;
`;

const StButton = styled.button`
    display: flex;
    width: 76px;
    height: 34px;
    padding: 10px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border-radius: 6px;
    background: #f8f8f8;
    color: #888;
    font-size: 15px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    letter-spacing: 0.3px;
`;

const StCommentCardList = styled.div`
    display: inline-flex;
    align-items: flex-start;
    gap: 14px;
    margin: 0px 56px 36px 24px;
`;

const StCommentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10x;
`;

const StCommentUserInfo = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 13px;
    width: 100%;
`;

const StFlex = styled.div`
    display: flex;
    gap: 10px;
    height: 23px;
`;

const DropdownButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
`;

const MenuBox = styled.div`
    position: absolute;
    top: 65%;
    left: -150%;
    width: 75px;
    height: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #ffffff;
    border: 1px solid #ededed;
`;

const StCommentDropdown = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
`;

const StEditButton = styled.button`
    width: 75px;
    height: 27px;
    margin-left: -10px;
    white-space: nowrap;
    &:hover {
        background-color: var(--button-border-color);
        color: white;
    }
`;

const StDeleteButton = styled.button`
    width: 75px;
    height: 27px;
    margin-left: -10px;
    white-space: nowrap;
    &:hover {
        background-color: var(--button-border-color);
        color: white;
    }
`;

const Stcomment = styled.div`
    width: 1044px;
    margin-bottom: 10px;
    overflow: hidden;
    color: #121212;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: 148%; /* 26.64px */
    letter-spacing: -0.09px;
`;

const StUpDown = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 12px;
`;

const StUp = styled.div`
    display: flex;
    align-items: center;
`;

const StDown = styled.div`
    display: flex;
    align-items: center;
    gap: 13px;
`;
