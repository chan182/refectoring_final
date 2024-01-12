import React, { useState } from 'react';
import * as T from '../mbti_test/mbtiTestStyle';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import mcoiLogo from '../../assets/mbtiTest/mcoiLogo.svg';

const mbtiInfo = {
    ISTJ: ['ESTP', 'ESFP'],
    ISFJ: ['ESTP', 'ESTJ'],
    INFJ: ['ENFP', 'ENTP'],
    INTJ: ['ENFP', 'ENTP'],
    ISTP: ['ESFJ', 'ESTJ'],
    ISFP: ['ESFJ', 'ESTJ'],
    INFP: ['ENFJ', 'ENTJ'],
    INTP: ['ENFJ', 'ENTJ'],
    ESTP: ['ISTJ', 'ISFJ'],
    ESFP: ['ISTJ', 'ISFJ'],
    ENFP: ['INFJ', 'INTJ'],
    ENTP: ['INFJ', 'INTJ'],
    ESTJ: ['ISFP', 'ISTP'],
    ESFJ: ['ISFP', 'ISTP'],
    ENFJ: ['INFP', 'INTP'],
    ENTJ: ['INFP', 'INTP']
};

const MbtiMatching = () => {
    const [mbti1Type, setMbti1Type] = useState('');
    const [mbti2Type, setMbti2Type] = useState('');
    const [matchingResult, setMatchingResult] = useState('');

    const navigate = useNavigate();

    const handleMbti1TypeChange = (e) => {
        setMbti1Type(e.target.value.toUpperCase());
    };

    const handleMbti2TypeChange = (e) => {
        setMbti2Type(e.target.value.toUpperCase());
    };

    const handleGenerateMatch = () => {
        const result = calculateMatching(mbti1Type, mbti2Type);
        setMatchingResult(result);
    };

    const calculateMatching = (type1, type2) => {
        const compatibleTypes = mbtiInfo[type1];
        return compatibleTypes && compatibleTypes.includes(type2) ? 'Perfect Match!' : 'Not a Perfect Match!';
    };

    return (
        <>
            {matchingResult ? (
                <T.StScreenBox2>
                    <T.StTestContainer>
                        <T.StTestStartComment>두분의 MBTI 궁합 결과는 {matchingResult}입니다.</T.StTestStartComment>
                        <StMatchingResultInput>
                            <p>mbti 1 Type: {mbti1Type}</p>
                            <p>mbti 2 Type: {mbti2Type}</p>
                        </StMatchingResultInput>
                        <T.StButtonContainer>
                            <T.StTestStartButton onClick={() => navigate('/')}>홈으로 돌아가기</T.StTestStartButton>
                            <T.StTestStartButton onClick={() => window.location.reload()}>다시하기</T.StTestStartButton>
                        </T.StButtonContainer>
                        <T.StLogoImageBox>
                            <T.StLogoImage>
                                <img src={mcoiLogo} alt="로고이미지" />
                            </T.StLogoImage>
                        </T.StLogoImageBox>
                    </T.StTestContainer>
                </T.StScreenBox2>
            ) : (
                <T.StScreenBox2>
                    <T.StTestContainer>
                        <StTestStartComment>상대방과 나의 MBTI가 잘 맞는지 궁금하신가요?</StTestStartComment>
                        <StMatchingInputBox>
                            <StMatchingInput
                                type="text"
                                value={mbti1Type}
                                onChange={handleMbti1TypeChange}
                                maxLength={4}
                                placeholder="내 MBTI"
                            />
                            <StMatchingInputspan>+</StMatchingInputspan>
                            <StMatchingInput
                                type="text"
                                value={mbti2Type}
                                onChange={handleMbti2TypeChange}
                                maxLength={4}
                                placeholder="상대 MBTI"
                            />
                        </StMatchingInputBox>
                        <T.StButtonContainer>
                            <T.StTestStartButton onClick={() => navigate('/')}>홈으로 돌아가기</T.StTestStartButton>
                            <T.StTestStartButton onClick={handleGenerateMatch}>결과 보기</T.StTestStartButton>
                        </T.StButtonContainer>

                        <T.StLogoImageBox>
                            <T.StLogoImage>
                                <img src={mcoiLogo} alt="로고이미지" />
                            </T.StLogoImage>
                        </T.StLogoImageBox>
                    </T.StTestContainer>
                </T.StScreenBox2>
            )}
        </>
    );
};

export default MbtiMatching;

const StMatchingResultInput = styled.div`
    border: 1px solid red;
`;

const StMatchingInputBox = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-top: 6%;
    margin-bottom: 8%;
    gap: 2%;
`;

const StMatchingInput = styled.input`
    width: 18%;
    height: 15%;
    border-radius: 5px;
    background: var(--light-gray);
    font-size: 22px;
    padding: 10px;
    display: flex;
    align-items: center;
`;

const StMatchingInputspan = styled.span`
    font-size: 45px;
`;

const StTestStartComment = styled.h1`
    font-size: 54px;
    width: 914px;
    height: 136px;
    margin-top: 82px;
    margin-left: 130px;
    padding: 0px 90px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
`;
