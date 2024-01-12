import React from 'react';
import { useRecoilState } from 'recoil';
import MbtiMeeting from '../components/mbti_meeting/MbtiMeeting';
import { userAtom } from '../recoil/Atom';

const MbtiMeetingPage = () => {
    const user = useRecoilState(userAtom);
    return (
        <div>
            <MbtiMeeting />
        </div>
    );
};

export default MbtiMeetingPage;
