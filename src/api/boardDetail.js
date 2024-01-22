import { collection, deleteDoc, doc, getDoc, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase/firebase.config';

// 가져오기

const communityDetailGetDate = async (paramsId) => {
    const docRef = doc(db, 'communities', paramsId);
    const docSnapshot = await getDoc(docRef);
    if (docSnapshot.exists()) {
        return { id: docSnapshot.id, ...docSnapshot.data() };
    }
};

// 삭제하기

const deleteBoard = async (paramId) => {
    await deleteDoc(doc(db, 'communities', paramId));
};

export { communityDetailGetDate, deleteBoard };
