import React from 'react';
import { createMeetingState } from '../../recoil/recoilAtoms';
import { useRecoilState } from 'recoil';

function Tags() {
    const [newMeeting, setNewMeeting] = useRecoilState(createMeetingState);
    const location = [
        '전지역',
        '서울',
        '인천',
        '대전',
        '광주',
        '대구',
        '부산',
        '울산',
        '경기',
        '강원',
        '충북',
        '충남',
        '전북',
        '전남',
        '경북',
        '경남',
        '제주'
    ];
    const gender = ['남자', '여자', '남/여'];
    const age = ['10대', '20대', '30대', '40대', '50대 이상'];
    const mbti = ['E', 'I', 'N', 'S', 'F', 'T', 'P', 'J'];

    return (
        <div>
            <div style={{ display: 'flex', columnGap: '1rem' }}>
                <h3>지역</h3>
                {location.map((data) => {
                    return (
                        <div key={data}>
                            <label>{data}</label>
                            <input
                                type="checkbox"
                                onChange={(e) =>
                                    setNewMeeting((prevNewMeeting) => ({
                                        ...prevNewMeeting,
                                        locations: e.target.checked
                                            ? [...(prevNewMeeting.locations || []), data]
                                            : (prevNewMeeting.locations || []).filter((location) => location !== data)
                                    }))
                                }
                            />
                        </div>
                    );
                })}
            </div>

            <div style={{ display: 'flex', columnGap: '1rem' }}>
                <h3>성별</h3>
                {gender.map((data) => {
                    return (
                        <div key={data}>
                            <label>{data}</label>
                            <input
                                type="checkbox"
                                onChange={(e) =>
                                    setNewMeeting((prevNewMeeting) => ({
                                        ...prevNewMeeting,
                                        genders: e.target.checked
                                            ? [...(prevNewMeeting.genders || []), data]
                                            : (prevNewMeeting.genders || []).filter((gender) => gender !== data)
                                    }))
                                }
                            />
                        </div>
                    );
                })}
            </div>
            <div style={{ display: 'flex', columnGap: '1rem' }}>
                <h3>나이</h3>
                {age.map((data) => {
                    return (
                        <div key={data}>
                            <label>{data}</label>
                            <input
                                type="checkbox"
                                onChange={(e) =>
                                    setNewMeeting((prevNewMeeting) => ({
                                        ...prevNewMeeting,
                                        ages: e.target.checked
                                            ? [...(prevNewMeeting.ages || []), data]
                                            : (prevNewMeeting.ages || []).filter((age) => age !== data)
                                    }))
                                }
                            />
                        </div>
                    );
                })}
            </div>
            <div style={{ display: 'flex', columnGap: '1rem' }}>
                <h3>MBTI</h3>
                {mbti.map((data) => {
                    return (
                        <div key={data}>
                            <label>{data}</label>
                            <input
                                type="checkbox"
                                onChange={(e) =>
                                    setNewMeeting((prevNewMeeting) => ({
                                        ...prevNewMeeting,
                                        mbtis: e.target.checked
                                            ? [...(prevNewMeeting.mbtis || []), data]
                                            : (prevNewMeeting.mbtis || []).filter((mbti) => mbti !== data)
                                    }))
                                }
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Tags;
