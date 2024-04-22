import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import modal_logo from '../../assets/home/mbti_matching.webp';
import mcoiLogo from '../../assets/mbtiMatching/Group 10.png';
import * as T from '../mbti_test/mbtiTestStyle';
import { mbtiInfo } from './mbtiInfo';
import { MBTIimage } from './textImage';
// import { mbtiInfo } from './MBTIinformation/ENFJ';

const MbtiMatching = () => {
    const [mbti1Type, setMbti1Type] = useState('');
    const [mbti2Type, setMbti2Type] = useState('');
    const [matchingResult, setMatchingResult] = useState('');
    const [matchingResultColor, setMatchingResultColor] = useState('var(--light-purple)');

    const navigate = useNavigate();

    const handleMbti1TypeChange = (e) => {
        const inputValue = e.target.value;
        const englishOnly = inputValue.replace(/[^a-zA-Z]/g, ''); // 영어만 허용

        if (inputValue !== englishOnly) {
            // 한글이 입력된 경우
            Swal.fire({
                text: `영문으만 입력해주세요!`,
                imageUrl: modal_logo
            });
        }

        setMbti1Type(englishOnly.toUpperCase());
    };

    const handleMbti2TypeChange = (e) => {
        const inputValue = e.target.value;
        const englishOnly = inputValue.replace(/[^a-zA-Z]/g, ''); // 영어만 허용

        if (inputValue !== englishOnly) {
            // 한글이 입력된 경우
            Swal.fire({
                text: `영문으만 입력해주세요!`,
                imageUrl: modal_logo
            });
        }

        setMbti2Type(englishOnly.toUpperCase());
    };

    const handleGenerateMatch = () => {
        if (mbti1Type && mbti2Type) {
            const result = calculateMatching(mbti1Type, mbti2Type);
            setMatchingResult(result.text);
            setMatchingResultColor(result.color);
        } else {
            Swal.fire({
                text: `MBTI를 입력해주세요!`,
                imageUrl: modal_logo
            });
        }
    };

    const calculateMatching = (type1, type2) => {
        if (mbtiInfo[type1] && mbtiInfo[type1].천생연분 && mbtiInfo[type1].천생연분.includes(type2)) {
            return { text: '최고 궁합, 지구뿌셔!!!', color: 'black' };
        } else if (mbtiInfo[type1] && mbtiInfo[type1].좋은궁합 && mbtiInfo[type1].좋은궁합.includes(type2)) {
            return { text: '좋은 궁합, 잘 맞아요!', color: 'black' };
        } else if (mbtiInfo[type1] && mbtiInfo[type1].보통궁합 && mbtiInfo[type1].보통궁합.includes(type2)) {
            return { text: '그럭저럭, 노력하자!', color: 'black' };
        } else if (mbtiInfo[type1] && mbtiInfo[type1].안맞는궁합 && mbtiInfo[type1].안맞는궁합.includes(type2)) {
            return { text: '최악의 궁합, 지구멸망 ㅠㅠ', color: 'black' };
        } else {
            return { text: '유효하지 않은 MBTI 유형입니다.', color: 'var(--light-purple)' };
        }
    };

    return (
        <>
            {matchingResult ? (
                <StScreenBox2>
                    <StTestContainer>
                        <StMatchingComment>
                            {' '}
                            {mbtiInfo[mbti1Type] && mbtiInfo[mbti2Type]
                                ? '궁합이 나왔어요!'
                                : '유효하지 않은 MBTI 유형입니다!'}
                        </StMatchingComment>
                        <StMatchingResultInput>
                            <StMatchingResultImage src={MBTIimage[mbti1Type] || MBTIimage.DEFAULT} alt={mbti1Type} />
                            <StMatchingInputspan2>+</StMatchingInputspan2>
                            <StMatchingResultImage src={MBTIimage[mbti2Type] || MBTIimage.DEFAULT} alt={mbti2Type} />
                        </StMatchingResultInput>
                        <StMatchingResultMent color={matchingResultColor}>"{matchingResult}"</StMatchingResultMent>
                        <StMatchingResultMent2>
                            {calculateMatching(mbti1Type, mbti2Type).introductionComment}
                        </StMatchingResultMent2>
                        <StMatchingComment2>
                            {calculateMatching(mbti1Type, mbti2Type).inputValueComment}
                        </StMatchingComment2>

                        <StButtonContainer>
                            {/* <T.StTestStartButton onClick={() => navigate('/')}>홈으로 돌아가기</T.StTestStartButton> */}
                            <T.StTestStartButton onClick={() => window.location.reload()}>다시하기</T.StTestStartButton>
                        </StButtonContainer>
                        {/* <T.StLogoImageBox>
                            <T.StLogoImage>
                                <img src={mcoiLogo} alt="로고이미지" />
                            </T.StLogoImage>
                        </T.StLogoImageBox> */}
                    </StTestContainer>
                </StScreenBox2>
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
                                placeholder="MBTI를 입력하세요!"
                            />
                            <StMatchingInputspan>+</StMatchingInputspan>
                            <StMatchingInput
                                type="text"
                                value={mbti2Type}
                                onChange={handleMbti2TypeChange}
                                maxLength={4}
                                placeholder="MBTI를 입력하세요!"
                            />
                        </StMatchingInputBox>
                        <T.StButtonContainer>
                            {/* <T.StTestStartButton onClick={() => navigate('/')}>홈으로 돌아가기</T.StTestStartButton> */}
                            <T.StTestStartButton onClick={handleGenerateMatch} disabled={!mbti1Type || !mbti2Type}>
                                결과 보기
                            </T.StTestStartButton>
                        </T.StButtonContainer>

                        <StLogoImageBox>
                            <T.StLogoImage>
                                <img src={mcoiLogo} alt="로고이미지" />
                            </T.StLogoImage>
                        </StLogoImageBox>
                    </T.StTestContainer>
                </T.StScreenBox2>
            )}
        </>
    );
};

export default MbtiMatching;

const StScreenBox2 = styled.div`
    height: 90vh;
    background-color: #fcfcfc;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const StTestContainer = styled.div`
    width: 1200px;
    height: 840px;
    margin: 0 auto;
    background-color: #fff;
    border-radius: 0.5rem;
`;

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
    border-radius: 0.3rem;
    border: 1px solid var(--button-border-color);
    font-size: 22px;
    padding: 10px;
    display: flex;
    align-items: center;
`;

const StMatchingInputspan = styled.span`
    font-size: 45px;
    color: #4e4e4e;
`;

const StMatchingInputspan2 = styled.span`
    font-size: 82px;
    color: #4e4e4e;
    width: 82px;
    height: 82px;
    font-weight: 100;
    margin-top: 8%;
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
    font-size: 46px;
    font-weight: bold;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--light-purple);
`;

const StMatchingResultImage = styled.img`
    width: 360px;
    height: 270px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const StMatchingResultMent = styled.h1`
    font-size: 52px;
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

const StMatchingResultMent2 = styled.h1`
    font-size: 38px;
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
    font-size: 34px;
    width: 914px;
    margin-top: 8.4%;
    margin-left: 130px;
    padding: 0px 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
`;

const StMatchingComment2 = styled.h1`
    font-size: 32px;
    width: 914px;
    margin-top: 8.4%;
    margin-left: 130px;
    padding: 0px 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
`;

const StLogoImageBox = styled.div`
    width: 100%;
    height: 20%;
    display: flex;
    align-items: center;
    margin-top: 10%;
`;

const StButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 60px;
    margin-top: -10%;
    margin-left: -3%;
`;
