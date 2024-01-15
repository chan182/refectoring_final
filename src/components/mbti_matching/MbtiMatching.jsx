import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import mcoiLogo from '../../assets/mbtiTest/mcoiLogo.svg';
import * as T from '../mbti_test/mbtiTestStyle';
import { mbtiInfo } from './mbtiInfo';

const MbtiMatching = () => {
    const [mbti1Type, setMbti1Type] = useState('');
    const [mbti2Type, setMbti2Type] = useState('');
    const [matchingResult, setMatchingResult] = useState('');
    const [matchingResultColor, setMatchingResultColor] = useState('var(--light-purple)');

    const navigate = useNavigate();

    const handleMbti1TypeChange = (e) => {
        setMbti1Type(e.target.value.toUpperCase());
    };

    const handleMbti2TypeChange = (e) => {
        setMbti2Type(e.target.value.toUpperCase());
    };

    const handleGenerateMatch = () => {
        if (mbti1Type && mbti2Type) {
            const result = calculateMatching(mbti1Type, mbti2Type);
            setMatchingResult(result.text);
            setMatchingResultColor(result.color);
        } else {
            alert('MBTI를 입력해주세요!');
        }
    };

    const calculateMatching = (type1, type2) => {
        if (mbtiInfo[type1] && mbtiInfo[type1].천생연분 && mbtiInfo[type1].천생연분.includes(type2)) {
            return { text: '최고 궁합, 지구뿌셔!!!', color: 'blue' };
        } else if (mbtiInfo[type1] && mbtiInfo[type1].좋은궁합 && mbtiInfo[type1].좋은궁합.includes(type2)) {
            return { text: '좋은 궁합, 잘 맞아요!', color: 'green' };
        } else if (mbtiInfo[type1] && mbtiInfo[type1].보통궁합 && mbtiInfo[type1].보통궁합.includes(type2)) {
            return { text: '그럭저럭, 노력하자!', color: 'orange' };
        } else if (mbtiInfo[type1] && mbtiInfo[type1].안맞는궁합 && mbtiInfo[type1].안맞는궁합.includes(type2)) {
            return { text: '최악의 궁합, 지구멸망 ㅠㅠ', color: 'red' };
        } else {
            return { text: '유효하지 않은 MBTI 유형입니다.', color: 'var(--light-purple)' };
        }
    };

    return (
        <>
            {matchingResult ? (
                <T.StScreenBox2>
                    <T.StTestContainer>
                        <StMatchingComment>두 분의 MBTI 궁합 결과는</StMatchingComment>
                        <StMatchingResultMent color={matchingResultColor}>"{matchingResult}"</StMatchingResultMent>
                        <StMatchingResultInput>
                            <StMatchingResultText>{mbti1Type}</StMatchingResultText>
                            <StMatchingInputspan>+</StMatchingInputspan>{' '}
                            <StMatchingResultText>{mbti2Type}</StMatchingResultText>
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
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-top: 4.5%;
    margin-bottom: 7.4%;
    gap: 2%;
`;

const StMatchingInputBox = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-top: 4.5%;
    margin-bottom: 7.4%;
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
    border: none;
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

const StMatchingResultText = styled.p`
    width: 18%;
    height: 15%;
    border-radius: 5px;
    background: var(--light-gray);
    font-size: 22px;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--light-purple);
`;

const StMatchingResultMent = styled.h1`
    font-size: 54px;
    width: 914px;
    height: 100px;
    margin-left: 130px;
    padding: 0px 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    color: ${(props) => props.color || 'var(--light-purple)'};
`;

const StMatchingComment = styled.h1`
    font-size: 54px;
    width: 914px;
    height: 100px;
    margin-top: 1.6%;
    margin-left: 130px;
    padding: 0px 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
`;
