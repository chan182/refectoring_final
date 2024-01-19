import { addDoc, collection, deleteDoc, doc, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase/firebase.config';

// 댓글 가져오기
const getComments = async (paramsId) => {
    const q = query(collection(db, 'communities', paramsId, 'comments'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }));
};

export { getComments };
