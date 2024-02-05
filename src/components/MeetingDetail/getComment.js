import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../../firebase/firebase.config';

// 모임의 댓글을 가져오는 함수
export const getComments = async (meetingId) => {
    try {
        const q = query(collection(db, `meet/${meetingId}/comments`), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);

        return querySnapshot.docs.map((doc) => {
            return {
                id: doc.id,
                ...doc.data()
            };
        });
    } catch (error) {
        console.error('댓글 가져오기 중 에러:', error);
        throw error;
    }
};

// 댓글의 대댓글을 가져오는 함수
export const getReplies = async (meetingId, commentId) => {
    try {
        const q = query(
            collection(db, `meet/${meetingId}/comments/${commentId}/replies`),
            orderBy('createdAt', 'desc')
        );
        const querySnapshot = await getDocs(q);

        return querySnapshot.docs.map((doc) => {
            return {
                id: doc.id,
                ...doc.data()
            };
        });
    } catch (error) {
        console.error('대댓글 가져오기 중 에러:', error);
        throw error;
    }
};

// 모임의 댓글을 좋아요 순으로 가져오는 함수
export const getCommentsByLikeCount = async (meetingId) => {
    try {
        const q = query(collection(db, `meet/${meetingId}/comments`), orderBy('likeCount', 'desc'));
        const querySnapshot = await getDocs(q);

        return querySnapshot.docs.map((doc) => {
            return {
                id: doc.id,
                ...doc.data()
            };
        });
    } catch (error) {
        console.error('댓글 가져오기 중 에러:', error);
        throw error;
    }
};

// 모임의 댓글을 날짜순으로 가져오는 함수
export const getCommentsByCreatedAt = async (meetingId) => {
    try {
        const q = query(collection(db, `meet/${meetingId}/comments`), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);

        return querySnapshot.docs.map((doc) => {
            return {
                id: doc.id,
                ...doc.data()
            };
        });
    } catch (error) {
        console.error('댓글 가져오기 중 에러:', error);
        throw error;
    }
};
