import React from 'react';

const MbtiCreate = () => {
    return (
        <div>
            <StTopContainerBox>
                {` ${event.eventName}`}
                <StTopContainer>
                    <StImageContainer>
                        <img
                            src={event.imageUrl}
                            alt={`이벤트 이미지`}
                            style={{ maxWidth: '100%', maxHeight: '100%', borderRadius: '50%' }}
                        />
                    </StImageContainer>
                    <StContentBox>
                        <StTextContainer>
                            <StTextContainerBox>
                                <StDetailTextBox>
                                    모임 관리자
                                    <StDetailText> {user.name}</StDetailText>
                                </StDetailTextBox>
                                <StDetailTextBox>
                                    모임 생성일
                                    <StDetailText> {event.date}</StDetailText>
                                </StDetailTextBox>
                            </StTextContainerBox>
                            <StTextContainerBox>
                                <StDetailTextBox>
                                    모집 인원
                                    <StDetailText></StDetailText>
                                </StDetailTextBox>
                                <StDetailTextBox>
                                    MBTI
                                    <StDetailText> {user.mbti}</StDetailText>
                                </StDetailTextBox>
                            </StTextContainerBox>
                            <StDetailTextBox2>
                                모임 소개
                                <StDetailText2> </StDetailText2>
                            </StDetailTextBox2>
                        </StTextContainer>
                        <StRequestButton>가입문의</StRequestButton>
                        <StBookmarkButton>모임 저장</StBookmarkButton>
                    </StContentBox>
                </StTopContainer>
            </StTopContainerBox>
        </div>
    );
};

export default MbtiCreate;

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
    display: flex;
    justify-content: center;
    border-radius: 1rem;
`;

const StImageContainer = styled.div`
    height: 346px;
    width: 346px;
    border-radius: 50%;
    margin-top: 54px;
    margin-left: 30px;
    background-color: var(--light-gray);
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

const StDetailText = styled.p`
    height: 47px;
    width: 296px;
    background: var(--light-gray);
    font-size: 16px;
    margin-top: 5px;
    padding: 15px;
    display: flex;
    color: #4e4e4e;
    border-radius: 0.5rem;
`;

const StDetailTextBox2 = styled.div`
    font-size: 14px;
    color: #888888;
    height: 51%;
`;

const StDetailText2 = styled.p`
    height: 91%;
    width: 97.3%;
    border-radius: 5px;
    background: var(--light-gray);
    font-size: 16px;
    margin-top: 5px;
    padding: 10px;
    display: flex;
    color: #4e4e4e;
    border-radius: 0.5rem;
`;
