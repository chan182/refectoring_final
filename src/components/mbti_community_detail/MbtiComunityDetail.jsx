import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import heart from '../../assets/community/blackheart.svg';
import dummyImage from '../../assets/community/dummyImg.jpg';
import eyeImoge from '../../assets/community/eyeImoge.svg';
import redheart from '../../assets/community/heart.svg';
import messageImoge from '../../assets/community/messageImoge.svg';

const MbtiComunityDetail = () => {
    const paramId = useParams().id;
    console.log(paramId);
    return (
        <StCardWrapper>
            <StCardImage src={dummyImage} alt="컨텐츠의 사진" />
            <StTitleWrapper>
                <StCardTitle>내가 작성한 글 제목</StCardTitle>
                <img src={redheart} alt="" />
            </StTitleWrapper>
            <StuserInfoWrapper>
                <StUserInformation>
                    <StprofileImg src={dummyImage} alt="" />
                    <div>손흥민 / ESTJ</div>
                </StUserInformation>
                <StlikeInformation>
                    <img src={heart} alt="좋아요 이미지" />
                    <div>999M</div>
                </StlikeInformation>
                <StMessageInformation>
                    <img src={messageImoge} alt="" />
                    <div>999K</div>
                </StMessageInformation>
                <StViewInformation>
                    <img src={eyeImoge} alt="" />
                    <div>999M</div>
                </StViewInformation>
            </StuserInfoWrapper>
            <StHr />
            <StContent>
                1절 동해 물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세 무궁화 삼천리 화려 강산 대한 사람
                대한으로 길이 보전하세1절 동해 물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세 무궁화 삼천리
                화려 강산 대한 사람 대한으로 길이 보전하세1절 동해 물과 백두산이 마르고 닳도록 하느님이 보우하사
                우리나라 만세 무궁화 삼천리 화려 강산 대한 사람 대한으로 길이 보전하세
            </StContent>
        </StCardWrapper>
    );
};

export default MbtiComunityDetail;

const StCardWrapper = styled.div`
    width: 1200px;
    border-radius: 26px;
    border: 1px solid #ededed;
    background: #fff;
`;

const StCardImage = styled.img`
    width: 1160px;
    height: 540px;
    border-radius: 16px;
    margin: 20px 20px 16px 20px;
`;

const StTitleWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    margin: 0px auto 14px 32px;
`;

const StCardTitle = styled.div`
    color: #000;
    font-size: 24px;
    font-style: normal;
    font-weight: 500;
    line-height: 120%;
`;

const StuserInfoWrapper = styled.div`
    display: inline-flex;
    align-items: center;
    gap: 48px;
    margin: 0px auto 0px 32px;
    width: 100%;
`;

const StUserInformation = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
`;

const StprofileImg = styled.img`
    width: 38px;
    height: 38px;
    fill: #efefef;
    stroke-width: 1px;
    stroke: #8d8d8d;
    border-radius: 50%;
`;
const StlikeInformation = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 4px;
`;

const StMessageInformation = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 4px;
`;

const StViewInformation = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 4px;
`;

const StHr = styled.div`
    width: 1104.002px;
    height: 1px;
    background: #ececec;
    margin: 26px 48px 44px 48px;
`;

const StContent = styled.div`
    width: 1136px;
    color: #121212;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 148%; /* 23.68px */
    letter-spacing: -0.08px;
    margin: 0px 32px 68px 32px;
`;
