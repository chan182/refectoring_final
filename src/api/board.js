// import { collection, deleteDoc, doc, getDocs, limit, orderBy, query } from 'firebase/firestore';
// import { db } from '../firebase/firebase.config';

import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase/firebase.config';

// 게시글 가져오기
export const getData = async (params) => {
    const q = query(collection(db, 'communities'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }));
};
