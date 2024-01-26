import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { collection, doc, getDoc, getDocs, addDoc, orderBy, query, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebase.config';
import * as T from './meetingDetailStyle';
import { useRecoilValue } from 'recoil';
import { userAtom } from '../../recoil/Atom';
import profileImage from '../../assets/profile/profileImg.png';
import { getComments, getReplies } from './getComment';
import CommentDropdown from './CommentDropDown';
import { createMeetingState, selectedTagsState } from '../../recoil/recoilAtoms';

const MeetingDetail = () => {
    const { id } = useParams();
    const [meeting, setMeeting] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [newReply, setNewReply] = useState({});
    const user = useRecoilValue(userAtom);
    const selectedTags = useRecoilValue(selectedTagsState);
    const createMeeting = useRecoilValue(createMeetingState);
    const [commentCount, setCommentCount] = useState(0);

    useEffect(() => {
        const fetchMeetingData = async () => {
            try {
                const meetingDocRef = doc(db, 'meet', id);
                const meetingDocSnap = await getDoc(meetingDocRef);

                if (meetingDocSnap.exists()) {
                    const meetingData = { id: meetingDocSnap.id, ...meetingDocSnap.data() };
                    setMeeting(meetingData);

                    // 댓글 가져오기
                    const commentsData = await getComments(id);

                    // 각 댓글에 대댓글 가져오기
                    const commentsWithReplies = await Promise.all(
                        commentsData.map(async (comment) => {
                            const replies = await getReplies(id, comment.id);
                            return {
                                ...comment,
                                replies
                            };
                        })
                    );
                    setComments(commentsWithReplies);
                    setCommentCount(commentsWithReplies.length);
                } else {
                    console.log('모임을 찾을 수 없습니다!');
                }
            } catch (error) {
                console.log('모임 데이터를 불러오는 중 에러 발생:', error);
            }
        };

        fetchMeetingData();
    }, [id]);

    const handleCancelComment = () => {
        setNewComment('');
    };

    const handleAddComment = async () => {
        // 로그인 여부 확인
        if (!user) {
            alert('댓글을 작성하려면 먼저 로그인하세요.');
            setNewComment('');
            return;
        }
        if (newComment.trim() !== '') {
            try {
                const commentData = {
                    content: newComment,
                    email: user.email,
                    userImageUrl: user.imageUrl,
                    nickname: user.nickname,
                    createdAt: new Date().toLocaleDateString('ko', {
                        year: '2-digit',
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit'
                    }),
                    replies: []
                };

                await addDoc(collection(db, `meet/${id}/comments`), commentData);

                const commentsQuerySnapshot = await getDocs(
                    query(collection(db, `meet/${id}/comments`), orderBy('createdAt', 'desc'))
                );
                const updatedComments = commentsQuerySnapshot.docs.map((doc) => {
                    const comment = {
                        id: doc.id,
                        ...doc.data()
                    };
                    comment.replies = comment.replies || [];
                    comment.showReplyInput = false;
                    return comment;
                });

                setComments(updatedComments);
                setCommentCount(updatedComments.length);

                setNewComment('');
            } catch (error) {
                console.error('댓글 추가 중 에러 발생: ', error);
            }
        } else {
            alert('댓글을 입력해 주세요!!!');
        }
    };

    const handleAddReply = async (commentId) => {
        try {
            const replyData = {
                content: newReply[commentId],
                email: user.email,
                userImageUrl: user.imageUrl,
                nickname: user.nickname,
                createdAt: new Date().toLocaleDateString('ko', {
                    year: '2-digit',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit'
                })
            };

            await addDoc(collection(db, `meet/${id}/comments/${commentId}/replies`), replyData);

            const updatedCommentsQuerySnapshot = await getDocs(
                query(collection(db, `meet/${id}/comments/${commentId}/replies`), orderBy('createdAt', 'desc'))
            );
            const updatedCommentsWithReplies = updatedCommentsQuerySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));

            setComments((prevComments) =>
                prevComments.map((comment) =>
                    comment.id === commentId
                        ? {
                              ...comment,
                              replies: updatedCommentsWithReplies
                          }
                        : comment
                )
            );
            setNewReply((prev) => ({ ...prev, [commentId]: '' }));

            const replies = updatedCommentsWithReplies.find((reply) => reply.id === commentId);
            console.log('Added Reply:', updatedCommentsWithReplies);
        } catch (error) {
            console.error('대댓글 추가 중 에러 발생: ', error);
        }
    };

    const handleNewReplyChange = (commentId, value) => {
        setNewReply((prev) => ({ ...prev, [commentId]: value }));
    };

    const handleCancelReply = (commentId) => {
        // 로그인 여부 확인
        if (!user) {
            alert('댓글을 작성하려면 먼저 로그인하세요.');
            return;
        }
        setComments((prevComments) =>
            prevComments.map((comment) => {
                if (comment.id === commentId) {
                    return { ...comment, showReplyInput: !comment.showReplyInput };
                }
                return comment;
            })
        );
        setNewReply('');
    };

    const handleEditComment = async (commentId) => {
        const updatedCommentContent = prompt(
            '댓글을 수정하세요:',
            comments.find((comment) => comment.id === commentId)?.content
        );

        if (updatedCommentContent !== null) {
            try {
                const commentDocRef = doc(db, `meet/${id}/comments`, commentId);
                await updateDoc(commentDocRef, { content: updatedCommentContent });

                // 댓글 수정 후, 화면을 갱신합니다.
                const updatedCommentsQuerySnapshot = await getDocs(
                    query(collection(db, `meet/${id}/comments`), orderBy('createdAt', 'desc'))
                );
                const updatedComments = updatedCommentsQuerySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }));

                setComments(updatedComments);
            } catch (error) {
                console.error('댓글 수정 중 에러 발생: ', error);
            }
        }
    };

    const handleDeleteComment = async (commentId) => {
        const shouldDelete = window.confirm('정말로 댓글을 삭제하시겠습니까?');

        if (shouldDelete) {
            try {
                const commentDocRef = doc(db, `meet/${id}/comments`, commentId);
                await deleteDoc(commentDocRef);

                // 댓글 삭제 후, 화면을 갱신합니다.
                const updatedCommentsQuerySnapshot = await getDocs(
                    query(collection(db, `meet/${id}/comments`), orderBy('createdAt', 'desc'))
                );
                const updatedComments = updatedCommentsQuerySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }));

                setComments(updatedComments);
            } catch (error) {
                console.error('댓글 삭제 중 에러 발생: ', error);
            }
        }
    };

    const handleRequest = () => {
        alert(`${meeting.kakaoOpenChatUrl}`);
    };

    if (!meeting) {
        return <p>Loading...</p>;
    }

    return (
        <T.StWholeContainer>
            <T.StTopContainerBox>
                {meeting.title}
                <T.StTopContainer>
                    <T.StImageContainer>
                        <img
                            src={meeting?.imageurl}
                            alt={`Meeting Image`}
                            style={{ width: '346px', height: '346px', borderRadius: '50%' }}
                        />
                    </T.StImageContainer>
                    <T.StContentBox>
                        <T.StTextContainer>
                            <T.StTextContainerBox>
                                <T.StDetailTextBox>
                                    모임 관리자
                                    <T.StDetailText>{meeting.managerName}</T.StDetailText>
                                </T.StDetailTextBox>
                                <T.StDetailTextBox>
                                    모임 생성일
                                    <T.StDetailText>{meeting.date}</T.StDetailText>
                                </T.StDetailTextBox>
                            </T.StTextContainerBox>
                            <T.StTextContainerBox>
                                <T.StDetailTextBox>
                                    모임 인원
                                    <T.StDetailText>{meeting.recruitment}</T.StDetailText>
                                </T.StDetailTextBox>
                                <T.StDetailTextBox>
                                    MBTI
                                    <T.StDetailText>{meeting.mbti}</T.StDetailText>
                                </T.StDetailTextBox>
                            </T.StTextContainerBox>
                            <T.StDetailTextBox2>
                                모임 소개
                                <T.StDetailText2></T.StDetailText2>
                            </T.StDetailTextBox2>
                        </T.StTextContainer>

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
                    <T.StContentContainer>{meeting.eventDescription}</T.StContentContainer>
                </T.StBottomContainer>
                <T.StRequestButton onClick={handleRequest}>가입문의</T.StRequestButton>
            </T.StContentContainerBox>
            <T.StDivisionLine />
            <T.StCommentContainerBox>
                댓글
                <T.StCommentContainer>
                    <T.StCommentBox1>
                        <T.StCommentCount>모임 후기{`  ${commentCount}개`}</T.StCommentCount>
                        <T.StCommentFilter>정렬기준</T.StCommentFilter>
                    </T.StCommentBox1>
                    <T.StCommentBox2>
                        <T.StCommentImage>
                            <img
                                src={user ? user.imageUrl : profileImage}
                                alt={`이벤트 이미지`}
                                style={{ maxWidth: '100%', maxHeight: '100%', borderRadius: '50%' }}
                            />
                        </T.StCommentImage>
                        <T.StCommentInput
                            placeholder="댓글 추가..."
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                        />
                    </T.StCommentBox2>
                    <T.StCommentButtonBox>
                        <T.StCommentButton2 onClick={handleAddComment}>댓글</T.StCommentButton2>
                        <T.StCommentButton1 onClick={handleCancelComment}>취소</T.StCommentButton1>
                    </T.StCommentButtonBox>
                    <T.StComments>
                        {comments.map((comment) => (
                            <div key={comment.id}>
                                <img src={comment.userImageUrl} alt="User" />
                                <div className="userDetailsBox">
                                    <div className="userDetails">
                                        <p className="nickname">{comment.nickname}</p>
                                        <p className="createdAt">{comment.createdAt}</p>
                                    </div>
                                    <div className="contentBox">
                                        <p className="comment">{comment.content}</p>
                                        <div className="dropDown">
                                            {/* 댓글 수정 및 삭제를 위한 드롭다운 메뉴 */}
                                            {user && user.email === comment.email && (
                                                <CommentDropdown
                                                    onEdit={() => handleEditComment(comment.id)}
                                                    onDelete={() => handleDeleteComment(comment.id)}
                                                />
                                            )}
                                        </div>
                                    </div>
                                    <T.StReplyButton onClick={() => handleCancelReply(comment.id)}>
                                        {comment.showReplyInput ? '' : '답글 달기'}
                                    </T.StReplyButton>

                                    {/* 대댓글 입력 부분 */}
                                    {comment.showReplyInput && (
                                        <T.StCommentInputBox1>
                                            <T.StCommentInputBox2>
                                                <img src={user.imageUrl} alt="User" />
                                                <T.StReplyInput
                                                    placeholder="답글 추가..."
                                                    value={newReply[comment.id] || ''}
                                                    onChange={(e) => handleNewReplyChange(comment.id, e.target.value)}
                                                />
                                            </T.StCommentInputBox2>
                                            <T.StReplyButtonBox>
                                                <T.StCommentButton2 onClick={() => handleAddReply(comment.id)}>
                                                    답글
                                                </T.StCommentButton2>
                                                <T.StCancelReplyButton onClick={() => handleCancelReply(comment.id)}>
                                                    취소
                                                </T.StCancelReplyButton>
                                            </T.StReplyButtonBox>
                                        </T.StCommentInputBox1>
                                    )}

                                    {comment.showReplyInput && (
                                        <div>
                                            {comment.replies && comment.replies.length > 0 && (
                                                <T.StReplyCommentBox>
                                                    {comment.replies.map((reply) => (
                                                        <div key={reply.id}>
                                                            <T.StReplySection>
                                                                <T.StReplyCommentStatus>
                                                                    <img src={reply.userImageUrl} alt="User" />
                                                                    <T.StReplyNameTime>
                                                                        <p className="nickname">{reply.nickname}</p>
                                                                        <p className="createdAt">{reply.createdAt}</p>
                                                                    </T.StReplyNameTime>
                                                                </T.StReplyCommentStatus>
                                                                <T.StReplyComment>
                                                                    <p className="comment">{reply.content}</p>
                                                                </T.StReplyComment>
                                                            </T.StReplySection>
                                                        </div>
                                                    ))}
                                                </T.StReplyCommentBox>
                                            )}
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