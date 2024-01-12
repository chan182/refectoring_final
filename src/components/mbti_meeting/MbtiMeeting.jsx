import React from 'react';
import { useRecoilState } from 'recoil';
import { userAtom } from '../../recoil/Atom';

const MbtiMeeting = () => {
    const user = useRecoilState(userAtom);
    const userinformation = user[0];
    console.log(userinformation);
    console.log(userinformation.email);
    return <div>{userinformation.email}</div>;
};

export default MbtiMeeting;
