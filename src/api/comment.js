import { addDoc, collection, deleteDoc, doc, getDocs, orderBy, query, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase.config';

// 댓글 가져오기
const getComments = async (paramsId) => {
    const q = query(collection(db, 'communities', paramsId, 'comments'), orderBy('createdAt', 'desc'));
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

const switchComment = async (id, paramsId, updateComment) => {
    const commentDocRef = doc(db, 'communities', paramsId, 'comments', id);
    await updateDoc(commentDocRef, { content: updateComment });
};

export { getComments, addComment, deleteComment, switchComment };
