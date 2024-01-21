import dayjs from 'dayjs';
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, orderBy, query, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import downVector from '../../assets/community/Vector-down.svg';
import upVector from '../../assets/community/Vector-up.svg';
import filteredImoge from '../../assets/community/align-left.svg';
import { db } from '../../firebase/firebase.config';
import { userAtom } from '../../recoil/Atom';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { deleteComment, getComments } from '../../api/comment';
import fullheart from '../../assets/community/fullheart.svg';
const CommentList = () => {
    const user = useRecoilValue(userAtom);
    const [showButtons, setShowButtons] = useState(false);
    const [comments, setComments] = useState([]);
    const [content, setContent] = useState('');
    const [editMode, setEditMode] = useState(false);

    const params = useParams();
    const queryClient = useQueryClient();

    // 댓글 수정하기

    // 댓글 업로드 하기

    const addComment = async (newComment) => {
        await addDoc(collection(db, 'communities', params.id, 'comments'), newComment);
    };

    const mutationAdd = useMutation(addComment, {
        onSuccess: (data) => {
            queryClient.invalidateQueries('comments');
            console.log('성공 !!');
        }
        // onError: (error) => {
        //     console.error('Error adding comment:', error);
        // }
    });

    const handleAddComment = async (paramsId) => {
        const now = dayjs();

        const newComment = {
            ImageUrl: user.imageUrl,
            content,
            createdAt: now.format('YY-MM-DD HH:mm:ss'),
            nickname: user.nickname,
            id: user.uid,
            likes: '',
            likecount: ''
        };
        // console.log(newComment);
        // console.log(paramsId);
        // setContent('');
        mutationAdd.mutate(newComment, paramsId);
    };

    // 댓글 삭제하기

    const deleteComment = async (id) => {
        await deleteDoc(doc(db, 'communities', params.id, 'comments', id));
    };

    const DeleteMutation = useMutation(deleteComment, {
        onSuccess: (data) => {
            // console.log(data);
            queryClient.invalidateQueries('comments');
        }
        // onError: (error) => {
        //     console.error('Error adding comment:', error);
        // }
    });

    const handleDeleteComment = async (id) => {
        console.log(id);
        DeleteMutation.mutate(id);
    };

    // 댓글들 가져오기

    const { data } = useQuery({ queryKey: ['comments'], queryFn: () => getComments(params.id) });
    // console.log(data);
    return (
        <Stwrapper>
            <StCommentTitleWrapper>
                <StTitle>댓글 0000개 </StTitle>
                <StFilteredbutton>
                    <img src={filteredImoge} alt="" />
                    <div>정렬기준</div>
                </StFilteredbutton>
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
                                handleAddComment(params.id);
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
                return (
                    <StCommentCardList key={id}>
                        <StProfileImoge src={data?.ImageUrl} alt="" />
                        <StCommentWrapper>
                            <StCommentUserInfo>
                                <div>{data?.nickname}</div>

                                <div>{data?.createdAt}</div>
                            </StCommentUserInfo>

                            <Stcomment>
                                {editMode && user?.uid === data.id ? (
                                    <Stcomment>
                                        <input
                                            type="text"
                                            value={content}
                                            onChange={(e) => setContent(e.target.value)}
                                        />
                                    </Stcomment>
                                ) : (
                                    <Stcomment>{data?.content}</Stcomment>
                                )}
                            </Stcomment>
                            <StUpDown>
                                <StUp>
                                    <button>
                                        {user?.uid && data?.likes?.includes(user?.uid) ? (
                                            <img src={fullheart} alt="좋아요버튼" />
                                        ) : (
                                            <img src={upVector} alt="좋아요버튼" />
                                        )}
                                    </button>
                                    <div>0</div>
                                </StUp>
                                <StDown>
                                    <img src={downVector} alt="" />
                                </StDown>
                            </StUpDown>
                            {user?.uid === data?.id ? (
                                <div>
                                    <button
                                        onClick={() => {
                                            setEditMode(!editMode);
                                            console.log(editMode);
                                        }}
                                    >
                                        수정
                                    </button>
                                    <button
                                        onClick={() => {
                                            handleDeleteComment(id);
                                        }}
                                    >
                                        삭제
                                    </button>
                                </div>
                            ) : (
                                <></>
                            )}
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
    margin: 0 auto;
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

const StFilteredbutton = styled.div`
    display: flex;
    align-items: center;
    gap: 4px;
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
    gap: 16px;
`;

const StCommentUserInfo = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 13px;
`;

const Stcomment = styled.div`
    width: 1044px;

    overflow: hidden;
    color: #121212;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-family: Pretendard;
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
    gap: 13px;
`;

const StDown = styled.div`
    display: flex;
    align-items: center;
    gap: 13px;
`;
