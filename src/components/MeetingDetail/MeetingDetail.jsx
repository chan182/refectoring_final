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
import Swal from 'sweetalert2';
import modal_logo from '../../assets/home/mbti_community.png';
import LikeDislikeButton from './LikeDislikeButton';
import CommentSorting from './CommentSorting';

const MeetingDetail = () => {
    const { id } = useParams();
    const [meeting, setMeeting] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [newReply, setNewReply] = useState({});
    const user = useRecoilValue(userAtom);
    const [commentCount, setCommentCount] = useState(0);
    const [editCommentId, setEditCommentId] = useState(null);
    const [editCommentContent, setEditCommentContent] = useState('');
    const [editReplyId, setEditReplyId] = useState(null);
    const [editReplyContent, setEditReplyContent] = useState('');

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
            Swal.fire({
                text: `댓글을 작성하려면 먼저 로그인하세요.`,
                imageUrl: modal_logo
            });
            setNewComment('');
            return;
        }
        if (newComment.trim() !== '') {
            try {
                const commentData = {
                    content: newComment,
                    email: user.email,
                    userImageUrl: user.imageUrl || profileImage,
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
            Swal.fire({
                text: `댓글을 입력해 주세요!!!`,
                imageUrl: modal_logo
            });
        }
    };

    const handleAddReply = async (commentId) => {
        try {
            const replyData = {
                content: newReply[commentId],
                email: user.email,
                userImageUrl: user.imageUrl || profileImage,
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
            Swal.fire({
                text: `댓글을 작성하려면 먼저 로그인하세요.`,
                imageUrl: modal_logo
            });
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
        // 수정 중인 댓글인 경우에는 댓글 수정 처리를 진행하지 않음
        if (editCommentId === commentId) {
            setEditCommentId(null);
            setEditCommentContent('');
            return;
        }

        // 댓글 수정 중이 아닌 경우, 해당 댓글의 내용을 가져와 상태에 저장
        const commentContentToEdit = comments.find((comment) => comment.id === commentId)?.content;
        setEditCommentId(commentId);
        setEditCommentContent(commentContentToEdit || '');
    };

    const handleSaveEditComment = async (commentId) => {
        // 수정 중인 댓글의 내용을 저장하고 서버에 업데이트
        try {
            const commentDocRef = doc(db, `meet/${id}/comments`, commentId);
            await updateDoc(commentDocRef, { content: editCommentContent });

            // 댓글 수정 후, 화면을 갱신합니다.
            const updatedCommentsQuerySnapshot = await getDocs(
                query(collection(db, `meet/${id}/comments`), orderBy('createdAt', 'desc'))
            );
            const updatedComments = updatedCommentsQuerySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));

            setComments(updatedComments);

            // 수정이 완료되었으므로 상태 초기화
            setEditCommentId(null);
            setEditCommentContent('');
        } catch (error) {
            console.error('댓글 수정 중 에러 발생: ', error);
        }
    };

    const handleDeleteComment = async (commentId) => {
        const { value: shouldDelete } = await Swal.fire({
            title: '정말로 댓글을 삭제하시겠습니까?',
            imageUrl: modal_logo,
            showCancelButton: true,
            confirmButtonText: '예',
            cancelButtonText: '아니오'
        });

        if (shouldDelete) {
            try {
                // 해당 댓글의 대댓글 가져오기
                const repliesQuerySnapshot = await getDocs(
                    query(collection(db, `meet/${id}/comments/${commentId}/replies`), orderBy('createdAt', 'desc'))
                );

                // 대댓글 삭제
                await Promise.all(
                    repliesQuerySnapshot.docs.map(async (replyDoc) => {
                        const replyId = replyDoc.id;
                        await deleteDoc(doc(db, `meet/${id}/comments/${commentId}/replies`, replyId));
                    })
                );

                // 댓글 삭제
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

    const handleEditReply = (commentId, replyId) => {
        // 이미 수정 중이라면 수정 취소
        if (editReplyId === replyId) {
            setEditReplyId(null);
            setEditReplyContent('');
        } else {
            // 대댓글 수정 시작
            setEditReplyId(replyId);
            setEditReplyContent(
                comments.find((comment) => comment.id === commentId)?.replies.find((reply) => reply.id === replyId)
                    ?.content || ''
            );
        }
    };

    const handleSaveEditReply = async (commentId, replyId) => {
        try {
            const replyDocRef = doc(db, `meet/${id}/comments/${commentId}/replies`, replyId);
            await updateDoc(replyDocRef, { content: editReplyContent });

            // 상태 업데이트 및 수정 모드 초기화
            const updatedRepliesQuerySnapshot = await getDocs(
                query(collection(db, `meet/${id}/comments/${commentId}/replies`), orderBy('createdAt', 'desc'))
            );
            const updatedReplies = updatedRepliesQuerySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));

            setComments((prevComments) =>
                prevComments.map((comment) =>
                    comment.id === commentId
                        ? {
                              ...comment,
                              replies: updatedReplies
                          }
                        : comment
                )
            );

            // 수정 완료
            setEditReplyId(null);
            setEditReplyContent('');
        } catch (error) {
            console.error('답글 수정 중 에러 발생: ', error);
        }
    };

    const handleDeleteReply = async (commentId, replyId) => {
        const { value: shouldDelete } = await Swal.fire({
            title: '정말로 답글을 삭제하시겠습니까?',
            imageUrl: modal_logo,
            showCancelButton: true,
            confirmButtonText: '예',
            cancelButtonText: '아니오'
        });

        if (shouldDelete) {
            try {
                const replyDocRef = doc(db, `meet/${id}/comments/${commentId}/replies`, replyId);
                await deleteDoc(replyDocRef);

                // 상태 업데이트
                const updatedRepliesQuerySnapshot = await getDocs(
                    query(collection(db, `meet/${id}/comments/${commentId}/replies`), orderBy('createdAt', 'desc'))
                );
                const updatedReplies = updatedRepliesQuerySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }));

                setComments((prevComments) =>
                    prevComments.map((comment) =>
                        comment.id === commentId
                            ? {
                                  ...comment,
                                  replies: updatedReplies
                              }
                            : comment
                    )
                );
            } catch (error) {
                console.error('답글 삭제 중 에러 발생: ', error);
            }
        }
    };

    const handleDeleteMeeting = async () => {
        const { value: shouldDelete } = await Swal.fire({
            title: '정말로 모임을 삭제하시겠습니까?',
            imageUrl: modal_logo,
            showCancelButton: true,
            confirmButtonText: '예',
            cancelButtonText: '아니오'
        });

        if (shouldDelete) {
            try {
                await deleteDoc(doc(db, 'meet', id));
            } catch (error) {
                console.error('모임 삭제 중 에러 발생: ', error);
            }
        }
    };

    const handleRequest = () => {
        Swal.fire({
            text: `${meeting.kakaoUrl} 로 연락주세요!`,
            imageUrl: modal_logo
        });
    };

    if (!meeting) {
        return <p>Loading...</p>;
    }

    return (
        <T.StWholeContainer>
            <T.StTopContainerBox>
                {meeting.name}
                <T.StTopContainer>
                    <T.StImageContainer>
                        <img
                            src={meeting?.repreImg}
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
                                    <T.StDetailText>{meeting.limitPeople}</T.StDetailText>
                                </T.StDetailTextBox>
                                <T.StDetailTextBox>
                                    모임 일정
                                    <T.StDetailText>{meeting.schedule}</T.StDetailText>
                                </T.StDetailTextBox>
                            </T.StTextContainerBox>
                            <T.StDetailTextBox2>
                                모임 소개
                                <T.StDetailText2>{meeting.oneLineIntro}</T.StDetailText2>
                            </T.StDetailTextBox2>
                        </T.StTextContainer>

                        {/* <T.StBookmarkButton>모임 저장</T.StBookmarkButton> */}
                    </T.StContentBox>
                </T.StTopContainer>
            </T.StTopContainerBox>
            <T.StTagBox>
                <T.StTagName>모임 태그</T.StTagName>
                <T.StTagContent>
                    {meeting.locations.map((location, index) => (
                        <div key={index} className="tagBox">
                            {location}
                        </div>
                    ))}
                    {meeting.genders.map((gender, index) => (
                        <div key={index} className="tagBox">
                            {gender}
                        </div>
                    ))}
                    {meeting.ages.map((age, index) => (
                        <div key={index} className="tagBox">
                            {age}
                        </div>
                    ))}
                    {meeting.mbtis.map((mbti, index) => (
                        <div key={index} className="tagBox">
                            {mbti}
                        </div>
                    ))}
                </T.StTagContent>
            </T.StTagBox>
            <T.StDivisionLine />
            <T.StContentContainerBox>
                {` 모임 설명`}
                <T.StBottomContainer>
                    <T.StContentContainer>{meeting.content}</T.StContentContainer>
                </T.StBottomContainer>
                {user && meeting && user.email === meeting.userId && (
                    <T.StRequestButton2 onClick={handleDeleteMeeting}>모임 삭제</T.StRequestButton2>
                )}
                {!user || !meeting || user.email !== meeting.userId ? (
                    <T.StRequestButton onClick={handleRequest}>가입문의</T.StRequestButton>
                ) : null}
            </T.StContentContainerBox>
            <T.StDivisionLine />
            <T.StCommentContainerBox>
                댓글
                <T.StCommentContainer>
                    <T.StCommentBox1>
                        <T.StCommentCount>모임 후기{`  ${commentCount}개`}</T.StCommentCount>
                        <CommentSorting id={id} setComments={setComments} />
                    </T.StCommentBox1>
                    <T.StCommentBox2>
                        <T.StCommentImage>
                            <img
                                src={user && user.imageUrl ? user.imageUrl : profileImage}
                                alt={`이벤트 이미지`}
                                style={{
                                    width: '38px',
                                    height: '38px',
                                    borderRadius: '50%',
                                    objectFit: 'contain',
                                    objectPosition: 'center'
                                }}
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
                                        <p className="comment">
                                            {comment.id === editCommentId ? (
                                                <>
                                                    <T.StCommentEditTextarea
                                                        value={editCommentContent}
                                                        onChange={(e) => setEditCommentContent(e.target.value)}
                                                    />
                                                    <T.StEditCompleteButton1
                                                        onClick={() => handleSaveEditComment(comment.id)}
                                                    >
                                                        수정 완료
                                                    </T.StEditCompleteButton1>
                                                </>
                                            ) : (
                                                comment.content
                                            )}
                                        </p>
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
                                    {/* 좋아요와 싫어요 버튼 */}
                                    <T.StAddReplyNbutton>
                                        <LikeDislikeButton meetingId={id} commentId={comment.id} user={user} />
                                        <T.StReplyButton onClick={() => handleCancelReply(comment.id)}>
                                            {comment.showReplyInput ? '' : '답글 달기'}
                                        </T.StReplyButton>
                                    </T.StAddReplyNbutton>

                                    {/* 대댓글 입력 부분 */}
                                    {comment.showReplyInput && (
                                        <T.StCommentInputBox1>
                                            <T.StCommentInputBox2>
                                                <img
                                                    src={user && user.imageUrl ? user.imageUrl : profileImage}
                                                    alt="User"
                                                />
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
                                                                    <p className="comment">
                                                                        {editReplyId === reply.id ? (
                                                                            <>
                                                                                <T.StReplyEditTextarea
                                                                                    value={editReplyContent}
                                                                                    onChange={(e) =>
                                                                                        setEditReplyContent(
                                                                                            e.target.value
                                                                                        )
                                                                                    }
                                                                                />
                                                                                <T.StEditCompleteButton2
                                                                                    onClick={() =>
                                                                                        handleSaveEditReply(
                                                                                            comment.id,
                                                                                            reply.id
                                                                                        )
                                                                                    }
                                                                                >
                                                                                    수정 완료
                                                                                </T.StEditCompleteButton2>
                                                                            </>
                                                                        ) : (
                                                                            reply.content
                                                                        )}
                                                                    </p>
                                                                </T.StReplyComment>
                                                                <T.StReplyEditDeleteBox>
                                                                    {user && user.email === reply.email && (
                                                                        <CommentDropdown
                                                                            onEdit={() =>
                                                                                handleEditReply(comment.id, reply.id)
                                                                            }
                                                                            onDelete={() =>
                                                                                handleDeleteReply(comment.id, reply.id)
                                                                            }
                                                                        />
                                                                    )}
                                                                </T.StReplyEditDeleteBox>
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
