import React from 'react';
import { createMeetingState } from '../../recoil/recoilAtoms';
import { useRecoilState } from 'recoil';

function Tags() {
    const [newMeeting, setNewMeeting] = useRecoilState(createMeetingState);

    return (
        <div>
            <div style={{ display: 'flex', columnGap: '1rem' }}>
                <h3>지역</h3>
                <div>
                    <input type="checkbox" />
                </div>
            </div>
            <div style={{ display: 'flex', columnGap: '1rem' }}>
                <h3>성별</h3>
                <div>
                    <label>남자</label>
                    <input
                        type="checkbox"
                        onChange={(e) =>
                            setNewMeeting((prevNewMeeting) => ({
                                ...prevNewMeeting,
                                genders: e.target.checked
                                    ? [...(prevNewMeeting.genders || []), '남자']
                                    : (prevNewMeeting.genders || []).filter((gender) => gender !== '남자')
                            }))
                        }
                    />
                    <label>여자</label>
                    <input
                        type="checkbox"
                        onChange={(e) =>
                            setNewMeeting((prevNewMeeting) => ({
                                ...prevNewMeeting,
                                genders: e.target.checked
                                    ? [...(prevNewMeeting.genders || []), '여자']
                                    : (prevNewMeeting.genders || []).filter((gender) => gender !== '여자')
                            }))
                        }
                    />
                    <label>남/여</label>
                    <input
                        type="checkbox"
                        onChange={(e) =>
                            setNewMeeting((prevNewMeeting) => ({
                                ...prevNewMeeting,
                                genders: e.target.checked
                                    ? [...(prevNewMeeting.genders || []), '남/여']
                                    : (prevNewMeeting.genders || []).filter((gender) => gender !== '남/여')
                            }))
                        }
                    />
                </div>
            </div>
            <div style={{ display: 'flex', columnGap: '1rem' }}>
                <h3>나이</h3>
                <div>
                    <input type="checkbox" />
                </div>
            </div>
            <div style={{ display: 'flex', columnGap: '1rem' }}>
                <h3>MBTI</h3>
                <div>
                    <input type="checkbox" />
                </div>
            </div>
        </div>
    );
}

export default Tags;
