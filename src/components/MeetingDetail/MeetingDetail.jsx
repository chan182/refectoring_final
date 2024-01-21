// import { addDoc, collection, getDocs } from 'firebase/firestore';
// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { useRecoilValue } from 'recoil';
// import { db } from '../../firebase/firebase.config';
// import { eventsState, userAtom } from '../../recoil/Atom';
// import * as T from './meetingDetailStyle';

// const MeetingDetail = () => {
//     const { id } = useParams();
//     const events = useRecoilValue(eventsState);
//     const user = useRecoilValue(userAtom);
//     const event = events[id];

//     const [comments, setComments] = useState([]);
//     const [newComment, setNewComment] = useState('');
//     const [newReply, setNewReply] = useState('');
//     const [replyingCommentId, setReplyingCommentId] = useState(null);
//     const [visibleReplies, setVisibleReplies] = useState({});

//     const commentCount = comments.length;

//     const userImageUrl = user && user.imageUrl ? user.imageUrl : 'defaultImageUrl';

//     const fetchData = async () => {
//         try {
//             const commentsQuerySnapshot = await getDocs(collection(db, `comments/${id}/comment`));
//             const commentsData = [];

//             const fetchReplies = async (commentId) => {
//                 const repliesQuerySnapshot = await getDocs(
//                     collection(db, `comments/${id}/comment/${commentId}/replies`)
//                 );
//                 return repliesQuerySnapshot.docs.map((replyDoc) => ({ id: replyDoc.id, ...replyDoc.data() }));
//             };

//             for (const doc of commentsQuerySnapshot.docs) {
//                 const comment = { id: doc.id, ...doc.data(), replies: [] };

//                 if (doc.data().replies) {
//                     const replies = await fetchReplies(doc.id);
//                     comment.replies = replies;
//                 }

//                 commentsData.push(comment);
//             }

//             const allComments = commentsData.reduce((acc, comment) => {
//                 acc.push(comment);
//                 acc.push(...comment.replies.map((reply) => ({ ...reply, isReply: true, parentId: comment.id })));
//                 return acc;
//             }, []);

//             allComments.sort((a, b) => {
//                 const timeA = new Date(a.createdAt).getTime();
//                 const timeB = new Date(b.createdAt).getTime();
//                 return timeB - timeA; // 최신순으로 정렬
//             });

//             setComments(allComments);
//         } catch (error) {
//             console.log('fetching error data ====>', error);
//         }
//     };

//     useEffect(() => {
//         fetchData();
//     }, [id]);

//     const handleAddComment = async () => {
//         if (newComment.trim() !== '') {
//             const commentData = {
//                 comment: newComment,
//                 userImageUrl,
//                 createdAt: new Date().toLocaleDateString('ko', {
//                     year: '2-digit',
//                     month: '2-digit',
//                     day: '2-digit',
//                     hour: '2-digit',
//                     minute: '2-digit',
//                     second: '2-digit'
//                 }),
//                 nickname: user.nickname
//             };

//             try {
//                 // Firestore에 댓글 추가
//                 const docRef = await addDoc(collection(db, `comments/${id}/comment`), commentData);

//                 console.log('Comment added successfully. Document ID:', docRef.id);
//                 // 댓글 목록 업데이트
//                 setComments([{ id: docRef.id, ...commentData }, ...comments]);
//                 setNewComment('');
//             } catch (error) {
//                 console.error('Error adding comment: ', error);
//             }
//         } else {
//             alert('댓글을 입력해 주세요!!!');
//         }
//     };

//     const handleAddReply = async (commentId) => {
//         if (newReply.trim() !== '') {
//             const replyData = {
//                 comment: newReply,
//                 userImageUrl,
//                 createdAt: new Date().toLocaleDateString('ko', {
//                     year: '2-digit',
//                     month: '2-digit',
//                     day: '2-digit',
//                     hour: '2-digit',
//                     minute: '2-digit',
//                     second: '2-digit'
//                 }),
//                 nickname: user.nickname
//             };

//             try {
//                 // Firestore에 대댓글 추가
//                 const docRef = await addDoc(collection(db, `comments/${id}/comment/${commentId}/replies`), replyData);

//                 console.log('Reply added successfully. Document ID:', docRef.id);
//                 // 대댓글 목록 업데이트
//                 setComments((prevComments) => {
//                     return prevComments.map((comment) => {
//                         if (comment.id === commentId) {
//                             return {
//                                 ...comment,
//                                 replies: [{ id: docRef.id, ...replyData }, ...(comment.replies || [])]
//                             };
//                         }
//                         return comment;
//                     });
//                 });
//                 setNewReply('');
//             } catch (error) {
//                 console.error('Error adding reply: ', error);
//             }
//         } else {
//             alert('대댓글을 입력해 주세요!!!');
//         }
//     };

//     const toggleRepliesVisibility = (commentId) => {
//         setVisibleReplies((prevVisibleReplies) => ({
//             ...prevVisibleReplies,
//             [commentId]: !prevVisibleReplies[commentId]
//         }));
//     };

//     const handleRequest = () => {
//         alert(`${event.kakaoOpenChatUrl}`);
//     };

//     return (
//         <T.StWholeContainer>
//             <T.StTopContainerBox>
//                 {` ${event.eventName}`}
//                 <T.StTopContainer>
//                     <T.StImageContainer>
//                         <img
//                             src={event.imageUrl}
//                             alt={`이벤트 이미지`}
//                             style={{ maxWidth: '100%', maxHeight: '100%', borderRadius: '50%' }}
//                         />
//                     </T.StImageContainer>
//                     <T.StContentBox>
//                         <T.StTextContainer>
//                             <T.StTextContainerBox>
//                                 <T.StDetailTextBox>
//                                     모임 관리자
//                                     <T.StDetailText> {user.name}</T.StDetailText>
//                                 </T.StDetailTextBox>
//                                 <T.StDetailTextBox>
//                                     모임 생성일
//                                     <T.StDetailText> {event.date}</T.StDetailText>
//                                 </T.StDetailTextBox>
//                             </T.StTextContainerBox>
//                             <T.StTextContainerBox>
//                                 <T.StDetailTextBox>
//                                     모집 인원
//                                     <T.StDetailText></T.StDetailText>
//                                 </T.StDetailTextBox>
//                                 <T.StDetailTextBox>
//                                     MBTI
//                                     <T.StDetailText> {user.mbti}</T.StDetailText>
//                                 </T.StDetailTextBox>
//                             </T.StTextContainerBox>
//                             <T.StDetailTextBox2>
//                                 모임 소개
//                                 <T.StDetailText2> </T.StDetailText2>
//                             </T.StDetailTextBox2>
//                         </T.StTextContainer>
//                         <T.StRequestButton onClick={handleRequest}>가입문의</T.StRequestButton>
//                         <T.StBookmarkButton>모임 저장</T.StBookmarkButton>
//                     </T.StContentBox>
//                 </T.StTopContainer>
//             </T.StTopContainerBox>
//             <T.StTagBox>
//                 <T.StTagName>모임 태그</T.StTagName>
//                 <T.StTagContent></T.StTagContent>
//             </T.StTagBox>
//             <T.StDivisionLine />
//             <T.StContentContainerBox>
//                 {` 모임 설명`}
//                 <T.StBottomContainer>
//                     <T.StContentContainer>{event.eventDescription}</T.StContentContainer>
//                 </T.StBottomContainer>
//             </T.StContentContainerBox>
//             <T.StDivisionLine />
//             <T.StCommentContainerBox>
//                 댓글
//                 <T.StCommentContainer>
//                     <T.StCommentBox1>
//                         <T.StCommentCount>모임 후기{` ${commentCount}개`}</T.StCommentCount>
//                         <T.StCommentFilter>정렬기준</T.StCommentFilter>
//                     </T.StCommentBox1>
//                     <T.StCommentBox2>
//                         <T.StCommentImage>
//                             <img
//                                 src={user.imageUrl}
//                                 alt={`이벤트 이미지`}
//                                 style={{ maxWidth: '100%', maxHeight: '100%', borderRadius: '50%' }}
//                             />
//                         </T.StCommentImage>
//                         <T.StCommentInput
//                             placeholder="댓글 추가..."
//                             value={newComment}
//                             onChange={(e) => setNewComment(e.target.value)}
//                         />
//                         <T.StCommentButton onClick={handleAddComment}>댓글 추가</T.StCommentButton>
//                     </T.StCommentBox2>
//                     <T.StComments>
//                         {comments.map((commentObj, index) => (
//                             <div key={index}>
//                                 <img src={commentObj.userImageUrl} alt="User" />
//                                 <div className="userDetailsBox">
//                                     <div className="userDetails">
//                                         <p className="nickname">{commentObj.nickname}</p>
//                                         <p className="createdAt">{commentObj.createdAt}</p>
//                                     </div>
//                                     <p className="comment">{commentObj.comment}</p>
//                                     <T.StReplyButton onClick={() => setReplyingCommentId(commentObj.id)}>
//                                         답글 달기
//                                     </T.StReplyButton>
//                                     <T.StViewRepliesButton onClick={() => toggleRepliesVisibility(commentObj.id)}>
//                                         답글 보기
//                                     </T.StViewRepliesButton>

//                                     {visibleReplies[commentObj.id] && (
//                                         <div>
//                                             {commentObj.replies &&
//                                                 commentObj.replies.length > 0 &&
//                                                 commentObj.replies.map((reply, replyIndex) => (
//                                                     <div key={replyIndex}>
//                                                         <p>{reply.nickname}</p>
//                                                         <p>{reply.comment}</p>
//                                                     </div>
//                                                 ))}
//                                         </div>
//                                     )}
//                                     {/* 대댓글 입력 부분 */}
//                                     {replyingCommentId === commentObj.id && (
//                                         <div>
//                                             <T.StCommentInput
//                                                 placeholder="대댓글 추가..."
//                                                 value={newReply}
//                                                 onChange={(e) => setNewReply(e.target.value)}
//                                             />
//                                             <T.StCommentButton onClick={() => handleAddReply(commentObj.id)}>
//                                                 대댓글 추가
//                                             </T.StCommentButton>
//                                             <T.StCancelReplyButton onClick={() => setReplyingCommentId(null)}>
//                                                 취소
//                                             </T.StCancelReplyButton>
//                                         </div>
//                                     )}
//                                 </div>
//                             </div>
//                         ))}
//                     </T.StComments>
//                 </T.StCommentContainer>
//             </T.StCommentContainerBox>
//         </T.StWholeContainer>
//     );
// };

// export default MeetingDetail;

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { collection, doc, getDoc, getDocs, addDoc, orderBy, query } from 'firebase/firestore';
import { db } from '../../firebase/firebase.config';
import * as T from './meetingDetailStyle';
import { useRecoilValue } from 'recoil';
import { userAtom } from '../../recoil/Atom';

const MeetingDetail = () => {
    const { id } = useParams();
    const [meeting, setMeeting] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const user = useRecoilValue(userAtom);

    useEffect(() => {
        const fetchMeetingData = async () => {
            try {
                const meetingDocRef = doc(db, 'meet', id);
                const meetingDocSnap = await getDoc(meetingDocRef);

                if (meetingDocSnap.exists()) {
                    const meetingData = { id: meetingDocSnap.id, ...meetingDocSnap.data() };
                    setMeeting(meetingData);

                    // 'comments' 하위 컬렉션에서 댓글을 가져옵니다.
                    const commentsQuerySnapshot = await getDocs(collection(db, `meet/${id}/comments`));
                    const commentsData = commentsQuerySnapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data()
                    }));
                    setComments(commentsData);
                } else {
                    console.log('모임을 찾을 수 없습니다!');
                }
            } catch (error) {
                console.log('모임 데이터를 불러오는 중 에러 발생:', error);
            }
        };

        fetchMeetingData();
    }, [id]);

    const handleAddComment = async () => {
        if (newComment.trim() !== '') {
            try {
                const commentData = {
                    content: newComment,
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

                // 새로운 댓글을 'comments' 하위 컬렉션에 추가합니다.
                await addDoc(collection(db, `meet/${id}/comments`), commentData);

                // 업데이트된 댓글을 가져옵니다. 정렬된 순서로 가져오기 위해 orderBy 사용
                const commentsQuerySnapshot = await getDocs(
                    query(collection(db, `meet/${id}/comments`), orderBy('createdAt', 'desc'))
                );
                const updatedComments = commentsQuerySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setComments(updatedComments);

                // 댓글 입력을 초기화합니다.
                setNewComment('');
            } catch (error) {
                console.error('댓글 추가 중 에러 발생: ', error);
            }
        } else {
            alert('댓글을 입력해 주세요!!!');
        }
    };

    if (!meeting) {
        return <p>Loading...</p>;
    }

    return (
        <T.StWholeContainer>
            <T.StTopContainerBox>
                <T.StTopContainer>
                    <T.StImageContainer>
                        <img
                            src={meeting.imageUrl}
                            alt={`Meeting Image`}
                            style={{ maxWidth: '100%', maxHeight: '100%', borderRadius: '50%' }}
                        />
                    </T.StImageContainer>
                    <T.StContentBox>
                        <T.StTextContainer>
                            <T.StDetailTextBox>
                                모임 제목
                                <T.StDetailText>{meeting.title}</T.StDetailText>
                            </T.StDetailTextBox>
                            <T.StDetailTextBox>
                                모임 일자
                                <T.StDetailText>{meeting.date}</T.StDetailText>
                            </T.StDetailTextBox>
                            <T.StDetailTextBox>
                                모임 관리자
                                <T.StDetailText>{meeting.manager}</T.StDetailText>
                            </T.StDetailTextBox>
                            <T.StDetailTextBox>
                                모집 인원
                                <T.StDetailText>{meeting.recruitment}</T.StDetailText>
                            </T.StDetailTextBox>
                            <T.StDetailTextBox>
                                MBTI
                                <T.StDetailText>{meeting.mbti}</T.StDetailText>
                            </T.StDetailTextBox>
                        </T.StTextContainer>
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
            </T.StContentContainerBox>
            <T.StDivisionLine />
            <T.StCommentContainerBox>
                댓글
                <T.StCommentContainer>
                    <T.StCommentBox1>
                        <T.StCommentCount>모임 후기{` 개`}</T.StCommentCount>
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
                        {comments.map((comment) => (
                            <div key={comment.id}>
                                <img src={comment.userImageUrl} alt="User" />
                                <div className="userDetailsBox">
                                    <div className="userDetails">
                                        <p className="nickname">{comment.nickname}</p>
                                        <p className="createdAt">{comment.createdAt}</p>
                                    </div>
                                    <p className="comment">{comment.content}</p>
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
