import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import mcoiLogo from '../../assets/mbtiTest/mcoiLogo.svg';
import { questions } from './questions';
import { typeDescriptions } from './typeDescriptions';

const MbtiResult = ({ counts }) => {
    const navigate = useNavigate();

    const getDominantTraits = () => {
        const sortedCounts = Object.entries(counts).sort(([, a], [, b]) => b - a);
        const dominantTraits = sortedCounts.slice(0, 4).map(([trait]) => trait);

        // 원하는 순서에 따라 우선순위 정하기
        const orderedTraits = ['I', 'E', 'S', 'N', 'F', 'T', 'J', 'P'].map((trait) =>
            dominantTraits.find((t) => t.includes(trait))
        );

        return orderedTraits.join('');
    };

    const dominantType = getDominantTraits();
    const dominantTypeDescription = typeDescriptions[dominantType];

    const handleReloadClick = () => {
        window.location.reload();
    };

    const handleReturnHomeClick = () => {
        navigate('/');
    };

    return (
        <StTestResultContainer>
            <StQuestionContainer>
                <StResultMent>고생하셨습니다!</StResultMent>
                <StResultText>{dominantType}</StResultText>
                <StTypeDescription>{dominantTypeDescription}</StTypeDescription>
            </StQuestionContainer>
            <StButtonContainer>
                <StCompleteButton onClick={handleReloadClick} disabled={false}>
                    다시 시도
                </StCompleteButton>
                <StCompleteButton onClick={handleReturnHomeClick} disabled={false}>
                    홈으로
                </StCompleteButton>
            </StButtonContainer>
            <StLogoImageBox>
                <StLogoImage>
                    <img src={mcoiLogo} alt="로고이미지" />
                </StLogoImage>
            </StLogoImageBox>
        </StTestResultContainer>
    );
};

const MbtiTest = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [counts, setCounts] = useState({ I: 0, E: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 });
    const totalQuestions = questions.length;
    const [testStart, setTestStart] = useState(true);
    const navigate = useNavigate();

    const handleOptionClick = (option) => {
        const currentQuestionData = questions[currentQuestion];

        // 현재 질문의 인덱스를 기준으로 카운트
        if (currentQuestion >= 0 && currentQuestion <= 4) {
            setCounts({
                ...counts,
                I: counts.I + (option.indexOf('1.') !== -1 ? 1 : 0),
                E: counts.E + (option.indexOf('2.') !== -1 ? 1 : 0)
            });
        } else if (currentQuestion >= 5 && currentQuestion <= 9) {
            setCounts({
                ...counts,
                S: counts.S + (option.indexOf('1.') !== -1 ? 1 : 0),
                N: counts.N + (option.indexOf('2.') !== -1 ? 1 : 0)
            });
        } else if (currentQuestion >= 10 && currentQuestion <= 14) {
            setCounts({
                ...counts,
                F: counts.F + (option.indexOf('1.') !== -1 ? 1 : 0),
                T: counts.T + (option.indexOf('2.') !== -1 ? 1 : 0)
            });
        } else if (currentQuestion >= 15 && currentQuestion <= 19) {
            setCounts({
                ...counts,
                P: counts.P + (option.indexOf('1.') !== -1 ? 1 : 0),
                J: counts.J + (option.indexOf('2.') !== -1 ? 1 : 0)
            });
        }

        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            setCurrentQuestion(-1); // -1로 설정하여 결과 페이지 표시
        }
    };

    const goHomeButton = () => {
        navigate('/');
    };

    // const handleNextClick = () => {
    //     if (currentQuestion < questions.length - 1) {
    //         setCurrentQuestion(currentQuestion + 1);
    //     } else {
    //         setCurrentQuestion(-1); // -1로 설정하여 결과 페이지 표시
    //     }
    // };

    const progress = (currentQuestion + 1) / totalQuestions;

    const handleBeforeUnload = (event) => {
        // 사용자가 페이지를 떠날 때 발생하는 이벤트
        event.preventDefault();
        event.returnValue = '';
    };

    useEffect(() => {
        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

    useEffect(() => {
        if (currentQuestion === -1) {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        }
    }, [currentQuestion, counts]);

    return (
        <StScreenBox>
            {testStart ? (
                <StTestContainer>
                    <StTestStartComment>
                        MBTI 검사하고 저희 서비스를 더 재미있고 적극적으로 이용해보세요!
                    </StTestStartComment>
                    <StTestStartText>
                        성격 테스트를 통해 자신의 성향과 행동에 대한 정확한 분석 결과를 확인해 보세요.
                    </StTestStartText>
                    <StButtonContainer>
                        <StTestStartButton onClick={goHomeButton}>홈 으로 돌아가기</StTestStartButton>
                        <StTestStartButton onClick={() => setTestStart(!testStart)}>검사 시작하기</StTestStartButton>
                    </StButtonContainer>
                    <StLogoImageBox>
                        <StLogoImage>
                            <img src={mcoiLogo} alt="로고이미지" />
                        </StLogoImage>
                    </StLogoImageBox>
                </StTestContainer>
            ) : (
                <StTestContainer>
                    {currentQuestion !== -1 ? (
                        <div>
                            <StQuestionContainer>
                                <StQuestionFont>{`Q. ${currentQuestion + 1}/${totalQuestions}`}</StQuestionFont>
                                <StQuestionText>{questions[currentQuestion].question}</StQuestionText>
                                <StOptionsContainer>
                                    <StOptionButton
                                        onClick={() => handleOptionClick(questions[currentQuestion].option1)}
                                    >
                                        {questions[currentQuestion].option1}
                                    </StOptionButton>
                                    <StOptionButton
                                        onClick={() => handleOptionClick(questions[currentQuestion].option2)}
                                    >
                                        {questions[currentQuestion].option2}
                                    </StOptionButton>
                                </StOptionsContainer>
                            </StQuestionContainer>
                            <StButtonContainer>
                                <StCompleteButton onClick={goHomeButton}>검사 종료하기</StCompleteButton>
                            </StButtonContainer>
                            <StLogoImageBox>
                                <StLogoImage>
                                    <img src={mcoiLogo} alt="로고이미지" />
                                </StLogoImage>
                            </StLogoImageBox>

                            {/* <StProgressContainer>
                            <StProgressBarBox>
                                <StProgressBar style={{ width: `${progress * 100}%` }} />
                            </StProgressBarBox>
                            <StProgressText>{`${currentQuestion + 1}/${totalQuestions}`}</StProgressText>
                        </StProgressContainer> */}
                        </div>
                    ) : (
                        <MbtiResult counts={counts} />
                    )}
                </StTestContainer>
            )}
        </StScreenBox>
    );
};

export default MbtiTest;

const StScreenBox = styled.div`
    height: 70vh;
    display: flex;
    align-items: center;
`;

// const StScreenBox = styled.div`
//     position: fixed;
//     top: 0;
//     left: 0;
//     width: 100%;
//     height: 100%;
//     display: ${({ isModalOpen }) => (isModalOpen ? 'flex' : 'none')};
//     align-items: center;
//     justify-content: center;
//     background-color: rgba(0, 0, 0, 0.5); /* 배경 어둡게 하기 */
// `;

const StTestResultContainer = styled.div`
    width: 1200px;
    height: 640px;
    margin: 0 auto;
    padding: 20px;
    background-color: #fff;
    border-radius: 0.5rem;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
    position: absolute;
    top: 43.3%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
`;

const StTestContainer = styled.div`
    width: 1200px;
    height: 640px;
    margin: 0 auto;
    padding: 20px;
    background-color: #fff;
    border-radius: 0.5rem;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
`;

const StQuestionContainer = styled.div`
    margin-bottom: 20px;
    text-align: center;
`;

const StQuestionFont = styled.h1`
    font-size: 2.1875rem;
    font-weight: 500;
    margin-top: 40px;
    color: black;
`;

const StQuestionText = styled.h2`
    font-size: 32px;
    margin-top: 11px;
    margin-bottom: 40px;
    padding: 10px;
    width: 100%;
    height: 80px;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 2rem;
    background-color: #fff;
`;

const StResultMent = styled.h1`
    font-size: 32px;
    margin-top: 113px;
`;

const StResultText = styled.h1`
    font-size: 35px;
    font-weight: 800;
    margin-top: 80px;
    width: 100%;
    color: #756ab6;
`;

const StOptionsContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 21px;
    height: 180px;
    padding: 0 200px;
`;

const StOptionButton = styled.button`
    margin-bottom: 20px;
    padding: 10px 40px;
    font-size: 24px;
    background-color: #f8f8f8;
    color: #000000;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
    width: 680px;
    height: 86px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);

    &:hover {
        transition: ease-in-out 0.2s;
        background-color: #abaad8;
        color: #ffffff;
        /* box-shadow: 0px 4px 8px rgba(79, 5, 122, 0.575); */
    }
`;

const StButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 60px;
    gap: 15px;
`;

const StCompleteButton = styled.button`
    padding: 10px;
    font-size: 16px;
    margin-bottom: 20px;
    background-color: #f8f8f8;
    color: #000000;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
    width: 20%;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);

    &:hover {
        transition: ease-in-out 0.2s;
        background-color: #ac87c5;
        color: #fff;
        box-shadow: 0px 4px 8px rgba(79, 5, 122, 0.575);
    }
`;
const StTypeDescription = styled.p`
    font-size: 16px;
    padding: 0px 295px 40px;
    color: #333;
    background-color: #fff;
    height: 125px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const StProgressContainer = styled.div`
    margin-top: 20px;
    display: flex;
    flex-direction: column;
`;

const StProgressBar = styled.div`
    height: 20px;
    background-color: #e0aed0;
    transition: width 0.7s;
    position: relative;
    border-radius: 2rem;
`;

const StProgressText = styled.p`
    margin-top: 10px;
    font-size: 14px;
    color: #333;
    text-align: center;
`;

const StProgressBarBox = styled.div`
    border: none;
    background-color: #fff;
    border-radius: 2rem;
`;

const StLogoImage = styled.div`
    width: 87px;
    height: 48px;
    margin-top: 50px;
`;

const StLogoImageBox = styled.div`
    width: 1150px;
    display: flex;
    justify-content: center;
`;

const StTestStartComment = styled.h1`
    font-size: 54px;
    width: 914px;
    height: 136px;
    margin-top: 82px;
    margin-left: 130px;
    padding: 0px 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
`;

const StTestStartText = styled.p`
    font-size: 22px;
    margin-top: 23px;
    margin-bottom: 143px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
`;

const StTestStartButton = styled.button`
    padding: 10px;
    font-size: 16px;
    margin-bottom: 20px;
    background-color: #f8f8f8;
    color: #000000;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
    width: 20%;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);

    &:hover {
        transition: ease-in-out 0.2s;
        background-color: #ac87c5;
        color: #fff;
        box-shadow: 0px 4px 8px rgba(79, 5, 122, 0.575);
    }
`;
