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
    const [commentCount, setCommentCount] = useState(0);

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
                    setCommentCount(commentsData.length);
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
                setCommentCount(updatedComments.length);

                // 댓글 입력을 초기화합니다.
                setNewComment('');
            } catch (error) {
                console.error('댓글 추가 중 에러 발생: ', error);
            }
        } else {
            alert('댓글을 입력해 주세요!!!');
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
                                    <T.StDetailText>{meeting.name}</T.StDetailText>
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
                    </T.StCommentBox2>
                    <T.StCommentButtonBox>
                        <T.StCommentButton1 onClick={handleCancelComment}>취소</T.StCommentButton1>
                        <T.StCommentButton2 onClick={handleAddComment}>댓글</T.StCommentButton2>
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
