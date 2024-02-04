import React, { useState, useEffect } from 'react';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebase.config';
import styled from 'styled-components';
import thumbsUp from '../../assets/MeetingDetail/Vector.png';
import thumbsDown from '../../assets/MeetingDetail/Vector (2).png';

const LikeDislikeButton = ({ meetingId, commentId, user }) => {
    const [likeCount, setLikeCount] = useState(0);
    const [dislikeCount, setDislikeCount] = useState(0);
    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);

    useEffect(() => {
        // user 객체가 존재하는 경우에만 Firestore에서 좋아요 및 싫어요 정보 가져오기
        const fetchLikeDislikeCounts = async () => {
            try {
                const commentDocRef = doc(db, 'meet', meetingId, 'comments', commentId);
                const commentDocSnap = await getDoc(commentDocRef);

                if (commentDocSnap.exists()) {
                    const data = commentDocSnap.data();
                    setLikeCount(data.likeCount || 0);
                    setDislikeCount(data.dislikeCount || 0);

                    // user가 로그인 상태일 때만 좋아요 및 싫어요 상태를 설정
                    if (user) {
                        setLiked(data.likes && data.likes[user.uid] ? true : false);
                        setDisliked(data.dislikes && data.dislikes[user.uid] ? true : false);
                    }
                }
            } catch (error) {
                console.error('좋아요 및 싫어요 정보를 가져오는 중 에러 발생:', error);
            }
        };

        fetchLikeDislikeCounts();
    }, [meetingId, commentId, user]);

    const handleLike = async () => {
        if (!user) return;

        try {
            const commentDocRef = doc(db, 'meet', meetingId, 'comments', commentId);
            if (liked) {
                // 이미 좋아요한 상태에서 누르면 취소
                await updateDoc(commentDocRef, {
                    likeCount: likeCount - 1,
                    [`likes.${user.uid}`]: false
                });

                setLikeCount(likeCount - 1);
                setLiked(false);
            } else {
                // 좋아요한 상태에서 누르면 취소
                await updateDoc(commentDocRef, {
                    likeCount: likeCount + 1,
                    [`likes.${user.uid}`]: true,
                    dislikeCount: disliked ? dislikeCount - 1 : dislikeCount,
                    [`dislikes.${user.uid}`]: false
                });

                setLikeCount(likeCount + 1);
                setLiked(true);
                setDislikeCount(disliked ? dislikeCount - 1 : dislikeCount);
                setDisliked(false);
            }
        } catch (error) {
            console.error('좋아요 처리 중 에러 발생:', error);
        }
    };

    const handleDislike = async () => {
        if (!user) return;

        try {
            const commentDocRef = doc(db, 'meet', meetingId, 'comments', commentId);
            if (disliked) {
                // 이미 싫어요한 상태에서 누르면 취소
                await updateDoc(commentDocRef, {
                    dislikeCount: dislikeCount - 1,
                    [`dislikes.${user.uid}`]: false
                });

                setDislikeCount(dislikeCount - 1);
                setDisliked(false);
            } else {
                // 싫어요한 상태에서 누르면 취소
                await updateDoc(commentDocRef, {
                    dislikeCount: dislikeCount + 1,
                    [`dislikes.${user.uid}`]: true,
                    likeCount: liked ? likeCount - 1 : likeCount,
                    [`likes.${user.uid}`]: false
                });

                setDislikeCount(dislikeCount + 1);
                setDisliked(true);
                setLikeCount(liked ? likeCount - 1 : likeCount);
                setLiked(false);
            }
        } catch (error) {
            console.error('싫어요 처리 중 에러 발생:', error);
        }
    };

    return (
        <StButtonBox>
            <button onClick={user ? handleLike : null} style={{ color: liked ? 'blue' : 'black' }}>
                <img
                    src={thumbsUp}
                    style={{
                        width: '18px',
                        height: '18px',
                        border: 'none',
                        borderRadius: '5px'
                    }}
                />
                {likeCount}
            </button>
            <button
                onClick={user ? handleDislike : null}
                style={{ color: disliked ? 'red' : 'black', marginLeft: '8px' }}
            >
                <img src={thumbsDown} style={{ width: '18px', height: '18px', border: 'none', borderRadius: '5px' }} />
                {dislikeCount}
            </button>
        </StButtonBox>
    );
};

export default LikeDislikeButton;

const StButtonBox = styled.div`
    margin-top: -8.5%;
`;
