// import { collection, deleteDoc, doc, getDocs, limit, orderBy, query } from 'firebase/firestore';
// import { db } from '../firebase/firebase.config';

import { addDoc, collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase/firebase.config';

// 게시글 가져오기
const getData = async (paramsId) => {
    const q = query(collection(db, 'communities'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }));
};

// 게시글 추가하기

const addCommunity = async (newCommunity) => {
    await addDoc(collection(db, 'communities'), newCommunity);
};

export { getData, addCommunity };
