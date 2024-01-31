import dayjs from 'dayjs';
import {
    addDoc,
    arrayRemove,
    arrayUnion,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    orderBy,
    query,
    updateDoc
} from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import downVector from '../../assets/community/Vector-down.svg';
import upVector from '../../assets/community/Vector-up.svg';
import filteredImoge from '../../assets/community/align-left.svg';
import { db } from '../../firebase/firebase.config';
import { userAtom } from '../../recoil/Atom';
import { addComment, deleteComment, getComments, switchComment } from '../../api/comment';
import fullheart from '../../assets/community/fullheart.svg';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import dropdown from '../../assets/community/dropdown.png';
import Swal from 'sweetalert2';
import modal_logo from '../../assets/home/mbti_community.png';
import blackVector from '../../assets/community/blackVector.svg';
const CommentList = () => {
    const user = useRecoilValue(userAtom);
    const [showButtons, setShowButtons] = useState(false);
    const [comments, setComments] = useState([]);
    const [content, setContent] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [userCommentId, setUserCommentId] = useState('');
    const [updateComment, setUpdateComment] = useState('');
    const [sortOption, setSortOption] = useState('latest');
    const [CommentCount, setCommentCount] = useState(0);
    const params = useParams();
    const queryClient = useQueryClient();
    const [selectedCommentId, setSelectedCommentId] = useState(null);
    const [showDropdown, setShowDropdown] = useState(false);
    // 댓글 추가하기

    const mutationAdd = useMutation((newComment) => addComment(newComment, params.id), {
        onSuccess: (data) => {
            queryClient.invalidateQueries('comments');
            console.log('성공 !!');
        }
    });
    const navigate = useNavigate();

    const handleAddComment = async (paramsId) => {
        if (!user) {
            Swal.fire({
                imageUrl: modal_logo,
                title: '로그인한 유저만 댓글작성이 가능합니다.'
            });
            return navigate('/login');
        }
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
        setContent('');

        mutationAdd.mutate(newComment, paramsId);
    };

    // 댓글 삭제하기

    const DeleteMutation = useMutation((id) => deleteComment(id, params.id), {
        onSuccess: (data) => {
            queryClient.invalidateQueries('comments');
        }
    });

    const handleDeleteComment = async (id) => {
        DeleteMutation.mutate(id);
    };

    // 댓글 수정하기

    const UpdateMutation = useMutation((id) => switchComment(id, params.id, updateComment), {
        onSuccess: (data) => {
            queryClient.invalidateQueries('comments');
        }
    });

    const handlerUpdateComment = async (id) => {
        UpdateMutation.mutate(id);
    };

    // 댓글들 가져오기

    const { data } = useQuery({ queryKey: ['comments'], queryFn: () => getComments(params.id) });

    useEffect(() => {
        const fetchCommentCount = async () => {
            try {
                const communityRef = doc(db, 'communities', params.id);
                const commentsQuery = query(collection(communityRef, 'comments'));
                const commentsSnapshot = await getDocs(commentsQuery);
                const totalComments = commentsSnapshot.size;
                setCommentCount(totalComments);

                // 여기에서 totalComments를 원하는 대로 활용할 수 있습니다.
            } catch (error) {
                console.error('댓글 갯수를 가져오는 중 에러 발생:', error);
            }
        };
        fetchCommentCount();
    }, [params.id]);

    const toggledown = (id) => {
        setSelectedCommentId(selectedCommentId === id ? null : id);
    };
    // 좋아요 기능 !! ! !!
    const mutation = useMutation(
        async (postId) => {
            console.log(postId);
            console.log(params.id);
            const postRef = doc(db, 'communities', params.id, 'comments', postId);
            // console.log(postRef);
            const postDoc = await getDoc(postRef);
            const postData = postDoc.data();
            console.log(postData.likes);
            console.log(user.uid);
            if (user?.uid && postData.likes?.includes(user.uid)) {
                return updateDoc(postRef, {
                    likes: arrayRemove(user.uid),
                    likecount: postData.likecount ? postData.likecount - 1 : 0
                });
            } else {
                return updateDoc(postRef, {
                    likes: arrayUnion(user.uid),
                    likecount: postData.likecount ? postData.likecount + 1 : 1
                });
            }
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(['comments']);
            }
        }
    );

    const handleLke = (postId) => {
        // console.log(postId);
        // console.log(params.id);
        mutation.mutate(postId);
    };

    return (
        <Stwrapper>
            <StCommentTitleWrapper>
                <StTitle>{CommentCount} 개 </StTitle>
                <StFilteredbutton>
                    <img src={filteredImoge} alt="" />
                    <div>
                        정렬기준
                        <StSortOptions>
                            <button>최신순</button>
                            <button>인기순</button>
                        </StSortOptions>
                    </div>
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
                                <StFlex>
                                    <div>{data?.nickname}</div>
                                    <div>{data?.createdAt}</div>
                                </StFlex>
                                <StFlex>
                                    <button onClick={() => toggledown(id)}>
                                        <StDropDownImage src={dropdown} alt="" />
                                    </button>
                                    {user?.uid === data?.id && selectedCommentId === id ? (
                                        <StButtons>
                                            <button
                                                onClick={() => {
                                                    console.log(id);
                                                    setEditMode(!editMode);
                                                    setUserCommentId(id);
                                                    setUpdateComment(data?.content);
                                                    handlerUpdateComment(id);
                                                }}
                                            >
                                                댓글 수정
                                            </button>
                                            <button
                                                onClick={() => {
                                                    handleDeleteComment(id);
                                                }}
                                            >
                                                댓글 삭제
                                            </button>
                                        </StButtons>
                                    ) : (
                                        <></>
                                    )}
                                </StFlex>
                            </StCommentUserInfo>

                            <Stcomment>
                                {editMode && userCommentId === id ? (
                                    <Stcomment>
                                        <StInput
                                            value={updateComment}
                                            onChange={(e) => setUpdateComment(e.target.value)}
                                        />
                                    </Stcomment>
                                ) : (
                                    <Stcomment>{data?.content}</Stcomment>
                                )}
                            </Stcomment>

                            <StUpDown>
                                <StUp>
                                    <button
                                        onClick={() => {
                                            handleLke(id);
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
                                <StDown>
                                    <img src={downVector} alt="" />
                                </StDown>
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

const StFilteredbutton = styled.div`
    display: flex;
    align-items: center;
    gap: 4px;
`;

const StSortOptions = styled.div`
    display: flex;
    flex-direction: column;

    button {
        padding: 8px;
        text-align: left;
        border: none;
        background: none;
        cursor: pointer;
        font-size: 14px;

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
    gap: 16px;
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
`;

const StButtons = styled.button`
    display: flex;
    flex-direction: column;
    right: 10%;
    gap: 10px;
    color: #fff;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 120%;
    width: 84px;
    padding: 4px;
    border: 1px;
`;

const Stcomment = styled.div`
    width: 1044px;

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

const StDropDownImage = styled.img`
    width: 24px;
    height: 30px;
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
