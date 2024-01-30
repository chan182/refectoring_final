import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase/firebase.config';

// 게시글 가져오기
const getData = async (params) => {
    const q = query(collection(db, 'meet'));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }));
};

export { getData };
