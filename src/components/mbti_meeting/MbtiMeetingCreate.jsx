import React from 'react';
import styled from 'styled-components';

const MbtiMeetingCreate = () => {
    return (
        <>
            <StTopContainerBox>
                <StTitle>모임 생성 </StTitle>
                <StTopContainer>
                    <StImagBox>
                        <StImageContainer></StImageContainer>
                        <StUploadImgBtn>모임 대표사진 업로드</StUploadImgBtn>
                    </StImagBox>
                    <StContentBox>
                        <StTextContainer>
                            <StTextContainerBox>
                                <StDetailTextBox>
                                    모임 이름
                                    <StDetailText placeholder="모임 이름을 입력해주세요."></StDetailText>
                                </StDetailTextBox>
                                <StDetailTextBox>
                                    모집 인원
                                    <StDetailText placeholder="모집 인원을 입력해주세요."></StDetailText>
                                </StDetailTextBox>
                            </StTextContainerBox>
                            <StTextContainerBox>
                                <StDetailTextBox3>
                                    1:1 오픈 채팅방 만드는 방법
                                    <StDetailText3 placeholder="카카오톡 오픈채팅 URL을 입력해주세요."></StDetailText3>
                                </StDetailTextBox3>
                            </StTextContainerBox>
                            <StDetailTextBox2>
                                모임 소개
                                <StDetailText2 placeholder="모임에 대해 간단하게 소개해주세요."></StDetailText2>
                            </StDetailTextBox2>
                        </StTextContainer>
                    </StContentBox>
                </StTopContainer>
            </StTopContainerBox>
        </>
    );
};

export default MbtiMeetingCreate;

const StTopContainerBox = styled.div`
    margin-top: 68px;
    font-size: 26px;
`;

const StTopContainer = styled.div`
    height: 540px;
    width: 1200px;
    font-size: 18px;
    margin-top: 5px;
    background-color: #ffffff;
    border: 1px solid var(--content-border-color);
    display: flex;
    justify-content: center;
    border-radius: 1rem;
`;

const StImagBox = styled.div`
    height: 500px;
    width: 360px;
    display: flex;
    align-items: center;
    flex-direction: column;
`;

const StImageContainer = styled.div`
    height: 346px;
    width: 346px;
    border-radius: 50%;
    margin-top: 54px;
    margin-left: 30px;
    background-color: var(--light-gray);
`;

const StUploadImgBtn = styled.button`
    border: 1px solid var(--button-border-color);
    font-size: 20px;
    width: 196px;
    height: 48px;
    background-color: white;
    color: #6a6a6a;
    border-radius: 0.5rem;
    cursor: pointer;
    margin: 37px 0px 0px 30px;

    &:hover {
        transition: ease-in-out 0.2s;
        background-color: var(--main-button-color);
        color: #fff;
    }
`;

const StContentBox = styled.div`
    margin-left: 10px;
`;

const StTextContainer = styled.div`
    height: 346px;
    width: 680px;
    margin: 54px;
    background-color: #ffffff;
`;

const StTextContainerBox = styled.div`
    display: flex;
    flex-direction: row;
    gap: 65px;
`;

const StDetailTextBox = styled.div`
    font-size: 14px;
    margin-bottom: 24px;
    color: #888888;
`;

const StDetailText = styled.input`
    height: 47px;
    width: 296px;
    background: var(--light-gray);
    font-size: 16px;
    margin-top: 5px;
    padding: 15px;
    display: flex;
    color: #4e4e4e;
    border: none;
    border-radius: 0.5rem;
`;
