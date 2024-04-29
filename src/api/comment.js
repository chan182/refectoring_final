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
import { db } from '../firebase/firebase.config';

// 최신 순 댓글 가져오기
const getCommentsByCreatedAt = async (paramsId) => {
    const q = query(collection(db, 'communities', paramsId, 'comments'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }));
};

// 좋아요가 많은 순으로 댓글 가져오기

const getCommentsByLikeCount = async (paramsId) => {
    const q = query(collection(db, 'communities', paramsId, 'comments'), orderBy('likecount', 'desc'));

    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }));
};

// 댓글 추가하기

const addComment = async (newComment, paramId) => {
    await addDoc(collection(db, 'communities', paramId, 'comments'), newComment);
};

// 댓글 삭제하기

const deleteComment = async (id, paramId) => {
    await deleteDoc(doc(db, 'communities', paramId, 'comments', id));
};

// 댓글 수정하기

const modifyCommnetHandler = async (id, paramsId, updateComment) => {
    const commentDocRef = doc(db, 'communities', paramsId, 'comments', id);
    await updateDoc(commentDocRef, { content: updateComment });
};

// 좋아요

const likeCommentHandler = async (userUid, paramId, postId) => {
    console.log(userUid, paramId, postId);
    const postRef = doc(db, 'communities', paramId, 'comments', postId);
    const postDoc = await getDoc(postRef);
    const postData = postDoc.data();
    if (postData.likes?.includes(userUid)) {
        return updateDoc(postRef, {
            likes: arrayRemove(userUid),
            likecount: postData.likecount ? postData.likecount - 1 : 0
        });
    } else {
        return updateDoc(postRef, {
            likes: arrayUnion(userUid),
            likecount: postData.likecount ? postData.likecount + 1 : 1
        });
    }
};

export {
    addComment,
    deleteComment,
    getCommentsByCreatedAt,
    getCommentsByLikeCount,
    likeCommentHandler,
    modifyCommnetHandler
};
