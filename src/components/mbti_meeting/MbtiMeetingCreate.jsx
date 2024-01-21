// import React from 'react';
// import styled from 'styled-components';

// const MbtiMeetingCreate = () => {
//     return (
//         <>
//             <StTopContainerBox>
//                 <StTitle>모임 생성 </StTitle>
//                 <StTopContainer>
//                     <StImagBox>
//                         <StImageContainer></StImageContainer>
//                         <StUploadImgBtn>모임 대표사진 업로드</StUploadImgBtn>
//                     </StImagBox>
//                     <StContentBox>
//                         <StTextContainer>
//                             <StTextContainerBox>
//                                 <StDetailTextBox>
//                                     모임 이름
//                                     <StDetailText placeholder="모임 이름을 입력해주세요."></StDetailText>
//                                 </StDetailTextBox>
//                                 <StDetailTextBox>
//                                     모집 인원
//                                     <StDetailText placeholder="모집 인원을 입력해주세요."></StDetailText>
//                                 </StDetailTextBox>
//                             </StTextContainerBox>
//                             <StTextContainerBox>
//                                 <StDetailTextBox3>
//                                     1:1 오픈 채팅방 만드는 방법
//                                     <StDetailText3 placeholder="카카오톡 오픈채팅 URL을 입력해주세요."></StDetailText3>
//                                 </StDetailTextBox3>
//                             </StTextContainerBox>
//                             <StDetailTextBox2>
//                                 모임 소개
//                                 <StDetailText2 placeholder="모임에 대해 간단하게 소개해주세요."></StDetailText2>
//                             </StDetailTextBox2>
//                         </StTextContainer>
//                         <StCreateButton>모임 생성하기</StCreateButton>
//                         <StCancelButton>모임 생성취소</StCancelButton>
//                     </StContentBox>
//                 </StTopContainer>
//             </StTopContainerBox>
//         </>
//     );
// };

// export default MbtiMeetingCreate;

// const StTopContainerBox = styled.div`
//     margin-top: 68px;
//     font-size: 26px;
// `;

// const StTopContainer = styled.div`
//     height: 540px;
//     width: 1200px;
//     font-size: 18px;
//     margin-top: 5px;
//     background-color: #ffffff;
//     border: 1px solid var(--content-border-color);
//     display: flex;
//     justify-content: center;
//     border-radius: 1rem;
// `;

// const StImagBox = styled.div`
//     height: 500px;
//     width: 360px;
//     display: flex;
//     align-items: center;
//     flex-direction: column;
// `;

// const StImageContainer = styled.div`
//     height: 346px;
//     width: 346px;
//     border-radius: 50%;
//     margin-top: 54px;
//     margin-left: 30px;
//     background-color: var(--light-gray);
// `;

// const StUploadImgBtn = styled.button`
//     border: 1px solid var(--button-border-color);
//     font-size: 20px;
//     width: 196px;
//     height: 48px;
//     background-color: white;
//     color: #6a6a6a;
//     border-radius: 0.5rem;
//     cursor: pointer;
//     margin: 37px 0px 0px 30px;

//     &:hover {
//         transition: ease-in-out 0.2s;
//         background-color: var(--main-button-color);
//         color: #fff;
//     }
// `;

// const StContentBox = styled.div`
//     margin-left: 10px;
// `;

// const StTextContainer = styled.div`
//     height: 346px;
//     width: 680px;
//     margin: 54px;
//     background-color: #ffffff;
// `;

// const StTextContainerBox = styled.div`
//     display: flex;
//     flex-direction: row;
//     gap: 65px;
// `;

// const StDetailTextBox = styled.div`
//     font-size: 14px;
//     margin-bottom: 24px;
//     color: #888888;
// `;

// const StDetailText = styled.input`
//     height: 47px;
//     width: 296px;
//     background: var(--light-gray);
//     font-size: 16px;
//     margin-top: 5px;
//     padding: 15px;
//     display: flex;
//     color: #4e4e4e;
//     border: none;
//     border-radius: 0.5rem;
// `;

// const StDetailTextBox3 = styled.div`
//     font-size: 14px;
//     margin-bottom: 24px;
//     color: #888888;
//     text-decoration: underline;
// `;

// const StDetailText3 = styled.input`
//     height: 47px;
//     width: 660px;
//     background: var(--light-gray);
//     font-size: 16px;
//     margin-top: 5px;
//     padding: 15px;
//     display: flex;
//     color: #4e4e4e;
//     border: none;
//     border-radius: 0.5rem;
// `;

// const StDetailTextBox2 = styled.div`
//     font-size: 14px;
//     color: #888888;
//     height: 51%;
// `;

// const StDetailText2 = styled.input`
//     height: 91%;
//     width: 97.3%;
//     border-radius: 5px;
//     background: var(--light-gray);
//     font-size: 16px;
//     margin-top: 5px;
//     padding: 10px;
//     display: flex;
//     color: #4e4e4e;
//     border: none;
//     border-radius: 0.5rem;
// `;

// const StCreateButton = styled.button`
//     font-size: 20px;
//     width: 196px;
//     height: 48px;
//     margin-left: 53px;
//     margin-top: -50px;
//     background-color: var(--main-button-color);
//     color: white;
//     border: none;
//     border-radius: 0.5rem;
//     cursor: pointer;
// `;

// const StCancelButton = styled.button`
//     font-size: 20px;
//     width: 196px;
//     height: 48px;
//     margin-left: 10px;
//     margin-top: -50px;
//     background-color: #f8f8f8;
//     color: #888888;
//     border: none;
//     border-radius: 0.5rem;
//     cursor: pointer;

//     &:hover {
//         transition: ease-in-out 0.2s;
//         background-color: var(--main-button-color);
//         color: #fff;
//     }
// `;

// const StTitle = styled.p`
//     font-size: 26px;
//     margin: 0px 0px 10px 20px;
// `;
import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useNavigate } from 'react-router';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { eventsState, userAtom } from '../../recoil/Atom';
import { db } from '../../firebase/firebase.config';
import { addDoc, collection } from '@firebase/firestore';

const MbtiCreate = () => {
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

    const handleCreateEvent = async () => {
        // 함수를 제외한 데이터로 새로운 객체 생성
        const cleanEvent = {
            eventName,
            kakaoOpenChatUrl,
            eventDescription,
            eventImage,
            userId
        };

        // Firestore 데이터베이스 업데이트
        const eventsCollection = collection(db, 'meet');
        const docRef = await addDoc(eventsCollection, cleanEvent);

        // 문서 참조를 확인하기 위해 로그 남기기
        console.log('Document written with ID: ', docRef.id);

        // 로컬 상태 업데이트 또는 필요한 다른 작업 수행

        // 모임 페이지로 이동
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

export default MbtiCreate;

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
