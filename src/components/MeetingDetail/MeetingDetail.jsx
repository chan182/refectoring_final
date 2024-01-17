import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { eventsState, userAtom } from '../../recoil/Atom';

const MeetingDetail = () => {
    const { id } = useParams();
    const events = useRecoilValue(eventsState);
    const user = useRecoilValue(userAtom);
    const event = events[id];

    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');

    const commentCount = comments.length;

    if (!event) {
        return <div>이벤트가 존재하지 않습니다.</div>;
    }

    const userImageUrl = user.imageUrl;

    // const requestButton = ()=>{
    //     alert ({event.kakaoOpenChatUrl})
    // }

    const handleAddComment = () => {
        if (newComment.trim() !== '') {
            setComments([...comments, { comment: newComment, userImageUrl }]);
            setNewComment('');
        } else {
            alert('댓글을 입력해 주세요!!!');
        }
    };

    return (
        <StWholeContainer>
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
            <StTagBox>
                <StTagName>모임 태그</StTagName>
                <StTagContent></StTagContent>
            </StTagBox>
            <StDivisionLine />
            <StContentContainerBox>
                {` 모임 설명`}
                <StBottomContainer>
                    <StContentContainer>{event.eventDescription}</StContentContainer>
                </StBottomContainer>
            </StContentContainerBox>
            <StDivisionLine />
            <StCommentContainerBox>
                댓글
                <StCommentContainer>
                    <StCommentBox1>
                        <StCommentCount>모임 후기{` ${commentCount}개`}</StCommentCount>
                        <StCommentFilter>정렬기준</StCommentFilter>
                    </StCommentBox1>
                    <StCommentBox2>
                        <StCommentImage>
                            <img
                                src={user.imageUrl}
                                alt={`이벤트 이미지`}
                                style={{ maxWidth: '100%', maxHeight: '100%', borderRadius: '50%' }}
                            />
                        </StCommentImage>
                        <StCommentInput
                            placeholder="댓글 추가..."
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                        />
                        <StCommentButton onClick={handleAddComment}>댓글 추가</StCommentButton>
                    </StCommentBox2>
                    <StComments>
                        {comments.map((commentObj, index) => (
                            <div key={index}>
                                <img src={commentObj.userImageUrl} alt="User" />
                                <p>{commentObj.comment}</p>
                            </div>
                        ))}
                    </StComments>
                </StCommentContainer>
            </StCommentContainerBox>
        </StWholeContainer>
    );
};

export default MeetingDetail;

const StWholeContainer = styled.div`
    height: 100%;
    width: 100%;
    display: grid;
    justify-content: center;
    background-color: var(--background-color);
`;

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

const StTagBox = styled.div`
    height: 162px;
    width: 1200px;
    margin-top: 20px;
    font-size: 18px;
    gap: 10px;
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    border-radius: 1rem;
`;

const StTagName = styled.div`
    font-size: 26px;
    margin-top: 28px;
    margin-left: 40px;
`;

const StTagContent = styled.div`
    margin-top: 15px;
    margin-left: 40px;
    height: 70px;
`;

const StContentContainerBox = styled.div`
    font-size: 26px;
`;

const StBottomContainer = styled.div`
    height: 540px;
    width: 1200px;
    font-size: 18px;
    margin-top: 5px;
    background-color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 1rem;
`;

const StContentContainer = styled.div`
    background-color: var(--light-gray);
    border-radius: 0.5rem;
    height: 95%;
    width: 98%;
    padding: 15px;
`;

const StDivisionLine = styled.div`
    border: 1px solid var(--hr-border-color);
    border-width: 1px 0 0 0;
    margin: 84px;
    width: 80%;
`;

const StCommentContainerBox = styled.div`
    font-size: 24px;
`;

const StCommentContainer = styled.div`
    height: 540px;
    width: 1200px;
    font-size: 18px;
    gap: 10px;
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    border-radius: 1rem;
    margin-top: 10px;
    margin-bottom: 100px;
`;

const StCommentBox1 = styled.div`
    margin-top: 13px;
    margin-bottom: 10px;
    margin-left: 24px;
    display: flex;
    flex-direction: row;
`;

const StCommentCount = styled.div`
    font-size: 22px;
    margin-right: 30px;
`;

const StCommentFilter = styled.div`
    font-size: 16px;
    margin-top: 3px;
`;

const StCommentBox2 = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;

const StCommentImage = styled.image`
    height: 38px;
    width: 38px;
    margin-right: 5px;
    margin-bottom: 40px;
    border-radius: 50%;
    border: 1px solid #8d8d8d;
`;

const StComments = styled.div`
    margin-bottom: 16px;
    overflow-y: auto;

    div {
        padding: 10px;
        margin-bottom: 8px;
        border-radius: 0.5rem;
        display: flex;
        align-items: flex-start;
        word-wrap: break-word;

        img {
            width: 38px;
            height: 38px;
            border-radius: 50%;
            margin-right: 10px;
            border: 1px solid #8d8d8d;
        }
        p {
            padding: 10px;
            margin-bottom: 8px;
            border-radius: 0.5rem;
            flex: 1;
        }
    }
`;

const StCommentInput = styled.input`
    width: 88%;
    padding: 10px;
    margin-bottom: 40px;
    border: none;
    border-bottom: 1px solid #ccc;
    outline: none;
`;

const StCommentButton = styled.button`
    font-size: 12px;
    padding: 8px 16px;
    margin-bottom: 40px;
    background-color: #ffffff;
    color: var(--light-purple);
    border: 1px solid var(--light-purple);
    border-radius: 0.5rem;
    cursor: pointer;

    &:hover {
        background-color: var(--light-purple);
        color: #ffffff;
        border: none;
    }
`;

const StRequestButton = styled.button`
    font-size: 20px;
    width: 196px;
    height: 48px;
    margin-left: 53px;
    margin-top: -50px;
    background-color: #f8f8f8;
    color: #888888;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;

    &:hover {
        transition: ease-in-out 0.2s;
        background-color: var(--main-button-color);
        color: #fff;
    }
`;

const StBookmarkButton = styled.div`
    border: 1px solid #969696;
    font-size: 15px;
    width: 76px;
    height: 34px;
    margin-left: 635px;
    margin-top: -35px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #ffffff;
    color: #969696;
    border-radius: 0.5rem;
    cursor: pointer;

    &:hover {
        transition: ease-in-out 0.2s;
        background-color: var(--main-button-color);
        color: #fff;
        border: none;
    }
`;
