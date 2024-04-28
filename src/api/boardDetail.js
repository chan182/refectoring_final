import { deleteDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase.config';

// 가져오기

const communityDetailGetDate = async (paramsId) => {
    const docRef = doc(db, 'communities', paramsId);
    const docSnapshot = await getDoc(docRef);
    return { id: docSnapshot.id, ...docSnapshot.data() };
};

// 삭제하기

const deleteBoard = async (paramId) => {
    await deleteDoc(doc(db, 'communities', paramId));
};

// 수정하기

const updateBoard = async (paramId, updateCommunity) => {
    const communityRef = doc(db, 'communities', paramId);
    await updateDoc(communityRef, updateCommunity);
};

export { communityDetailGetDate, deleteBoard, updateBoard };
