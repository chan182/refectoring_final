import React from 'react';
import styled from 'styled-components';
import downVector from '../../assets/community/Vector-down.svg';
import upVector from '../../assets/community/Vector-up.svg';
import filteredImoge from '../../assets/community/align-left.svg';
import examImoge from '../../assets/community/suin.jpg';

const CommentList = () => {
    return (
        <Stwrapper>
            <StCommentTitleWrapper>
                <StTitle>댓글 0000개 </StTitle>
                <StFilteredbutton>
                    <img src={filteredImoge} alt="" />
                    <div>정렬기준</div>
                </StFilteredbutton>
            </StCommentTitleWrapper>
            <StInputWrapper>
                <StProfileImoge src={examImoge} alt="" />
                <StInput type="text" />
            </StInputWrapper>
            <StCommentCardList>
                <StProfileImoge src={examImoge} alt="" />
                <StCommentWrapper>
                    <StCommentUserInfo>
                        <div>유저 1234</div>
                        <div>1시간 전 </div>
                    </StCommentUserInfo>
                    <Stcomment>
                        댓글입니다댓글입니다댓글입니다댓글입니다댓글입니다댓글입니다댓글입니다댓글입니다댓글입니다.
                    </Stcomment>
                    <StUpDown>
                        <StUp>
                            <img src={upVector} alt="" />
                            <div>999m</div>
                        </StUp>
                        <StDown>
                            <img src={downVector} alt="" />
                            <div>999m</div>
                        </StDown>
                    </StUpDown>
                </StCommentWrapper>
            </StCommentCardList>
        </Stwrapper>
    );
};

export default CommentList;

const Stwrapper = styled.div`
    width: 1200px;
    border-radius: 26px;
    border: 1px solid #ededed;
    background: #fff;
`;

const StCommentTitleWrapper = styled.div`
    margin: 26px auto 22px 24px;
    display: flex;
    align-items: flex-start;
    gap: 37px;
`;

const StTitle = styled.div`
    color: #000;
    font-size: 22px;
    font-style: normal;
    font-weight: 400;
    line-height: 120%; /* 26.4px */
`;

const StFilteredbutton = styled.div`
    display: flex;
    align-items: center;
    gap: 4px;
`;

const StProfileImoge = styled.img`
    width: 38px;
    height: 38px;
    fill: #efefef;
    stroke-width: 1px;
    stroke: #8d8d8d;
    border-radius: 50%;
`;

const StInputWrapper = styled.div`
    display: inline-flex;
    align-items: center;
    gap: 4px;
    margin: 0px 24px 68px 24px;
`;

const StInput = styled.input`
    display: flex;
    width: 1110px;
    padding: 10px;
    align-items: flex-start;
    border-width: 0 0 1px;
    gap: 10px;
    color: #4e4e4e;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 148%; /* 23.68px */
    letter-spacing: -0.08px;
`;

const StCommentCardList = styled.div`
    display: inline-flex;
    align-items: flex-start;
    gap: 14px;
    margin: 0px 56px 36px 24px;
`;

const StCommentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
`;

const StCommentUserInfo = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 13px;
`;

const Stcomment = styled.div`
    width: 1044px;

    overflow: hidden;
    color: #121212;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-family: Pretendard;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: 148%; /* 26.64px */
    letter-spacing: -0.09px;
`;

const StUpDown = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 12px;
`;

const StUp = styled.div`
    display: flex;
    align-items: center;
    gap: 13px;
`;

const StDown = styled.div`
    display: flex;
    align-items: center;
    gap: 13px;
`;
