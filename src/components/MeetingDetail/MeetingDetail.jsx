import { addDoc, collection, getDocs, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { db } from '../../firebase/firebase.config';
import { eventsState, userAtom } from '../../recoil/Atom';
import * as T from './meetingDetailStyle';

const MeetingDetail = () => {
    const { id } = useParams();
    const events = useRecoilValue(eventsState);
    const user = useRecoilValue(userAtom);
    const event = events[id];

    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [newReply, setNewReply] = useState('');
    const [replyingCommentId, setReplyingCommentId] = useState(null);
    const [visibleReplies, setVisibleReplies] = useState({});

    const commentCount = comments.length;

    const userImageUrl = user && user.imageUrl ? user.imageUrl : 'defaultImageUrl';

    const fetchData = () => {
        try {
            const commentsCollectionRef = collection(db, `comments/${id}/comment`);

            // 댓글에 대한 실시간 업데이트를 듣기
            const unsubscribeComments = onSnapshot(commentsCollectionRef, (snapshot) => {
                const commentsData = [];

                snapshot.forEach((doc) => {
                    const comment = { id: doc.id, ...doc.data(), replies: [] };
                    commentsData.push(comment);
                });

                const fetchReplies = async (commentId) => {
                    const repliesCollectionRef = collection(db, `comments/${id}/comment/${commentId}/replies`);
                    const repliesQuerySnapshot = await getDocs(repliesCollectionRef);
                    return repliesQuerySnapshot.docs.map((replyDoc) => ({ id: replyDoc.id, ...replyDoc.data() }));
                };

                // 각 댓글에 대한 대댓글을 가져와 업데이트
                const updateReplies = async () => {
                    const promises = commentsData.map(async (comment) => {
                        if (comment.replies) {
                            const replies = await fetchReplies(comment.id);
                            comment.replies = replies;
                        }
                        return comment;
                    });

                    const updatedComments = await Promise.all(promises);

                    const allComments = updatedComments.reduce((acc, comment) => {
                        acc.push(comment);
                        acc.push(
                            ...comment.replies.map((reply) => ({ ...reply, isReply: true, parentId: comment.id }))
                        );
                        return acc;
                    }, []);

                    allComments.sort((a, b) => {
                        const timeA = new Date(a.createdAt).getTime();
                        const timeB = new Date(b.createdAt).getTime();
                        return timeB - timeA; // 최신순으로 정렬
                    });

                    setComments(allComments);
                };

                updateReplies();
            });

            // 컴포넌트가 언마운트될 때 리스너 정리
            return () => unsubscribeComments();
        } catch (error) {
            console.error('데이터 가져오기 오류 ====>', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [id]);

    const handleAddComment = async () => {
        if (newComment.trim() !== '') {
            const commentData = {
                comment: newComment,
                userImageUrl,
                createdAt: new Date().toLocaleDateString('ko', {
                    year: '2-digit',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit'
                }),
                nickname: user.nickname
            };

            try {
                // Firestore에 댓글 추가
                const docRef = await addDoc(collection(db, `comments/${id}/comment`), commentData);

                console.log('Comment added successfully. Document ID:', docRef.id);
                // 댓글 목록 업데이트
                setComments([{ id: docRef.id, ...commentData }, ...comments]);
                setNewComment('');
            } catch (error) {
                console.error('Error adding comment: ', error);
            }
        } else {
            alert('댓글을 입력해 주세요!!!');
        }
    };

    const handleAddReply = async (commentId) => {
        if (newReply.trim() !== '') {
            const replyData = {
                comment: newReply,
                userImageUrl,
                createdAt: new Date().toLocaleDateString('ko', {
                    year: '2-digit',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit'
                }),
                nickname: user.nickname
            };

            try {
                // Firestore에 대댓글 추가
                const docRef = await addDoc(collection(db, `comments/${id}/comment/${commentId}/replies`), replyData);

                console.log('Reply added successfully. Document ID:', docRef.id);

                // 대댓글 목록 업데이트
                const updatedComments = comments.map((comment) => {
                    if (comment.id === commentId) {
                        return {
                            ...comment,
                            replies: [{ id: docRef.id, ...replyData }, ...(comment.replies || [])]
                        };
                    }
                    return comment;
                });

                setComments(updatedComments);
                setNewReply('');
            } catch (error) {
                console.error('Error adding reply: ', error);
            }
        }
    };

    const toggleRepliesVisibility = (commentId) => {
        setVisibleReplies((prevVisibleReplies) => ({
            ...prevVisibleReplies,
            [commentId]: !prevVisibleReplies[commentId]
        }));
    };

    const handleRequest = () => {
        alert(`${event.kakaoOpenChatUrl}`);
    };

    return (
        <T.StWholeContainer>
            <T.StTopContainerBox>
                {` ${event.eventName}`}
                <T.StTopContainer>
                    <T.StImageContainer>
                        <img
                            src={event.imageUrl}
                            alt={`이벤트 이미지`}
                            style={{ maxWidth: '100%', maxHeight: '100%', borderRadius: '50%' }}
                        />
                    </T.StImageContainer>
                    <T.StContentBox>
                        <T.StTextContainer>
                            <T.StTextContainerBox>
                                <T.StDetailTextBox>
                                    모임 관리자
                                    <T.StDetailText> {user.name}</T.StDetailText>
                                </T.StDetailTextBox>
                                <T.StDetailTextBox>
                                    모임 생성일
                                    <T.StDetailText> {event.date}</T.StDetailText>
                                </T.StDetailTextBox>
                            </T.StTextContainerBox>
                            <T.StTextContainerBox>
                                <T.StDetailTextBox>
                                    모집 인원
                                    <T.StDetailText></T.StDetailText>
                                </T.StDetailTextBox>
                                <T.StDetailTextBox>
                                    MBTI
                                    <T.StDetailText> {user.mbti}</T.StDetailText>
                                </T.StDetailTextBox>
                            </T.StTextContainerBox>
                            <T.StDetailTextBox2>
                                모임 소개
                                <T.StDetailText2> </T.StDetailText2>
                            </T.StDetailTextBox2>
                        </T.StTextContainer>
                        <T.StRequestButton onClick={handleRequest}>가입문의</T.StRequestButton>
                        <T.StBookmarkButton>모임 저장</T.StBookmarkButton>
                    </T.StContentBox>
                </T.StTopContainer>
            </T.StTopContainerBox>
            <T.StTagBox>
                <T.StTagName>모임 태그</T.StTagName>
                <T.StTagContent></T.StTagContent>
            </T.StTagBox>
            <T.StDivisionLine />
            <T.StContentContainerBox>
                {` 모임 설명`}
                <T.StBottomContainer>
                    <T.StContentContainer>{event.eventDescription}</T.StContentContainer>
                </T.StBottomContainer>
            </T.StContentContainerBox>
            <T.StDivisionLine />
            <T.StCommentContainerBox>
                댓글
                <T.StCommentContainer>
                    <T.StCommentBox1>
                        <T.StCommentCount>모임 후기{` ${commentCount}개`}</T.StCommentCount>
                        <T.StCommentFilter>정렬기준</T.StCommentFilter>
                    </T.StCommentBox1>
                    <T.StCommentBox2>
                        <T.StCommentImage>
                            <img
                                src={user.imageUrl}
                                alt={`이벤트 이미지`}
                                style={{ maxWidth: '100%', maxHeight: '100%', borderRadius: '50%' }}
                            />
                        </T.StCommentImage>
                        <T.StCommentInput
                            placeholder="댓글 추가..."
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                        />
                        <T.StCommentButton onClick={handleAddComment}>댓글 추가</T.StCommentButton>
                    </T.StCommentBox2>
                    <T.StComments>
                        {comments.map((commentObj, index) => (
                            <div key={index}>
                                <img src={commentObj.userImageUrl} alt="User" />
                                <div className="userDetailsBox">
                                    <div className="userDetails">
                                        <p className="nickname">{commentObj.nickname}</p>
                                        <p className="createdAt">{commentObj.createdAt}</p>
                                    </div>
                                    <p className="comment">{commentObj.comment}</p>
                                    <T.StReplyButton onClick={() => setReplyingCommentId(commentObj.id)}>
                                        답글 달기
                                    </T.StReplyButton>
                                    <T.StViewRepliesButton onClick={() => toggleRepliesVisibility(commentObj.id)}>
                                        답글 보기
                                    </T.StViewRepliesButton>

                                    {visibleReplies[commentObj.id] && (
                                        <div>
                                            {commentObj.replies &&
                                                commentObj.replies.length > 0 &&
                                                commentObj.replies.map((reply, replyIndex) => (
                                                    <div key={replyIndex}>
                                                        <p>{reply.nickname}</p>
                                                        <p>{reply.comment}</p>
                                                    </div>
                                                ))}
                                        </div>
                                    )}
                                    {/* 대댓글 입력 부분 */}
                                    {replyingCommentId === commentObj.id && (
                                        <div>
                                            <T.StCommentInput
                                                placeholder="대댓글 추가..."
                                                value={newReply}
                                                onChange={(e) => setNewReply(e.target.value)}
                                            />
                                            <T.StCommentButton onClick={() => handleAddReply(commentObj.id)}>
                                                대댓글 추가
                                            </T.StCommentButton>
                                            <T.StCancelReplyButton onClick={() => setReplyingCommentId(null)}>
                                                취소
                                            </T.StCancelReplyButton>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </T.StComments>
                </T.StCommentContainer>
            </T.StCommentContainerBox>
        </T.StWholeContainer>
    );
};

export default MeetingDetail;
