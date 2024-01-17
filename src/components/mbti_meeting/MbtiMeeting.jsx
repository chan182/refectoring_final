import React from 'react';
import { Link } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { eventsState, userAtom } from '../../recoil/Atom';

const MbtiMeeting = () => {
    const user = useRecoilState(userAtom);
    const userinformation = user[0];
    console.log(userinformation);
    console.log(userinformation.email);

    const events = useRecoilValue(eventsState);

    return (
        <>
            <div>{userinformation.email}</div>
            <div>
                {events.length > 0 && (
                    <div>
                        <h2>생성된 MBTI 모임</h2>
                        {events.map((event, index) => (
                            <div key={index}>
                                {event.imageUrl && (
                                    <div>
                                        <p>업로드된 이미지:</p>
                                        <img
                                            src={event.imageUrl}
                                            alt={`이벤트 이미지 ${index}`}
                                            style={{ maxWidth: '100%', maxHeight: '100%' }}
                                            onLoad={() => console.log(`이미지 ${index} 로드됨`)}
                                            onError={(error) => console.error(`이미지 ${index} 로드 에러:`, error)}
                                        />
                                    </div>
                                )}
                                <p>이벤트 이름: {event.eventName}</p>
                                <p>카카오톡 오픈채팅 URL: {event.kakaoOpenChatUrl}</p>
                                <p>이벤트 설명: {event.eventDescription}</p>
                                <Link to={`/mbti/meeting/detail/${index}`}>게시물 보기</Link>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};

export default MbtiMeeting;
