import React from 'react';
import { useRecoilState } from 'recoil';
import { userAtom } from '../recoil/Atom';
import MbtiMeeting from '../components/mbti_meeting/MbtiMeeting';

const MbtiMeetingPage = () => {
    const user = useRecoilState(userAtom);
    return (
        <>
            <MbtiMeeting />
        </>
    );
};

export default MbtiMeetingPage;
