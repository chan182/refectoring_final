import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useNavigate } from 'react-router';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { eventsState, userAtom } from '../../recoil/Atom';

const MbtiMeetingCreate = () => {
    const [events, setEvents] = useRecoilState(eventsState);
    const [eventName, setEventName] = useState('');
    const [kakaoOpenChatUrl, setKakaoOpenChatUrl] = useState('');
    const [eventDescription, setEventDescription] = useState('');
    const [eventImage, setEventImage] = useState(null);

    const navigate = useNavigate();

    const userId = useRecoilState(userAtom);

    const handleEventNameChange = (e) => {
        setEventName(e.target.value);
    };

    const handleKakaoOpenChatUrlChange = (e) => {
        setKakaoOpenChatUrl(e.target.value);
    };

    const handleEventDescriptionChange = (e) => {
        setEventDescription(e.target.value);
    };

    const handleImageDrop = (acceptedFiles) => {
        const image = acceptedFiles[0];
        setEventImage(image);
    };

    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/*',
        onDrop: handleImageDrop
    });

    const handleCreateEvent = () => {
        const newEvent = { eventName, kakaoOpenChatUrl, eventDescription, eventImage, userId };
        setEvents([...events, newEvent]);
        console.log('생성된 이벤트:', newEvent);
        navigate('/mbti/meeting');
    };

    return (
        <OuterContainer>
            <Container>
                <h2>MBTI Meeting 생성 페이지</h2>
                <form>
                    <ImageUpload
                        {...getRootProps()}
                        style={{ ...dropzoneStyle, display: 'inline-block', padding: '10px', cursor: 'pointer' }}
                    >
                        <input {...getInputProps()} />
                        업로드할 이미지를 선택하세요
                    </ImageUpload>
                    {eventImage && (
                        <div>
                            <p>업로드된 이미지:</p>
                            <img
                                src={URL.createObjectURL(eventImage)}
                                alt="이벤트 이미지"
                                style={imageStyle}
                                onLoad={() => console.log('업로드된 이미지가 로드되었습니다.')}
                                onError={(e) => console.error('이미지 로드 중 에러 발생:', e)}
                            />
                        </div>
                    )}
                    <br />
                    <label>
                        모임 이름:
                        <input type="text" value={eventName} onChange={handleEventNameChange} />
                    </label>
                    <br />
                    <label>
                        카카오톡 오픈채팅 URL:
                        <input type="text" value={kakaoOpenChatUrl} onChange={handleKakaoOpenChatUrlChange} />
                    </label>
                    <br />
                    <label>
                        모임 내용:
                        <textarea value={eventDescription} onChange={handleEventDescriptionChange} />
                    </label>

                    <br />
                    <button type="button" onClick={handleCreateEvent}>
                        모임 생성
                    </button>
                </form>
            </Container>
        </OuterContainer>
    );
};

export default MbtiMeetingCreate;

const OuterContainer = styled.div`
    display: flex;
    justify-content: center;
    height: 100vh;
`;

const Container = styled.div`
    border: 1px solid red;
    width: 65%;
    height: 70%;
`;

const dropzoneStyle = {
    border: '2px dashed #cccccc',
    borderRadius: '4px',
    padding: '20px',
    textAlign: 'center',
    cursor: 'pointer',
    marginTop: '10px'
};

const imageStyle = {
    maxWidth: '100%',
    maxHeight: '200px',
    marginTop: '10px'
};

const ImageUpload = styled.div`
    border: none;
`;
