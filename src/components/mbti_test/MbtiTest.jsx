import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { questions } from './questions';
import { typeDescriptions } from './typeDescriptions';

const ResultPage = ({ counts }) => {
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

    return (
        <StTestResultContainer>
            <StQuestionContainer>
                <StResultText>{dominantType}</StResultText>
                <StTypeDescription>{dominantTypeDescription}</StTypeDescription>
            </StQuestionContainer>
        </StTestResultContainer>
    );
};

const MbtiTest = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [counts, setCounts] = useState({ I: 0, E: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 });
    const totalQuestions = questions.length;

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
            // 컴포넌트가 언마운트될 때, 이벤트 리스너 제거
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

    useEffect(() => {
        if (currentQuestion === -1) {
            // 결과 페이지
            // 여기에서 결과를 활용하여 추가적인 작업 수행 가능

            // 페이지를 떠날 때 이벤트 리스너 제거
            window.removeEventListener('beforeunload', handleBeforeUnload);
        }
    }, [currentQuestion, counts]);

    return (
        <StScreenBox>
            <StTestContainer>
                {currentQuestion !== -1 ? (
                    <div>
                        <StQuestionContainer>
                            <StQuestionFont>{`Q${currentQuestion + 1}.`}</StQuestionFont>
                            <StQuestionText>{questions[currentQuestion].question}</StQuestionText>
                            <StOptionsContainer>
                                <StOptionButton onClick={() => handleOptionClick(questions[currentQuestion].option1)}>
                                    {questions[currentQuestion].option1}
                                </StOptionButton>
                                <StOptionButton onClick={() => handleOptionClick(questions[currentQuestion].option2)}>
                                    {questions[currentQuestion].option2}
                                </StOptionButton>
                            </StOptionsContainer>
                        </StQuestionContainer>
                        {/* {currentQuestion === questions.length - 1 ? (
                            <StCompleteButton onClick={handleNextClick} disabled={currentQuestion === -1}>
                                완료
                            </StCompleteButton>
                        ) : (
                            <StOptionButton onClick={handleNextClick} disabled={currentQuestion === -1}>
                                다음
                            </StOptionButton>
                        )} */}

                        <StProgressContainer>
                            <StProgressBarBox>
                                <StProgressBar style={{ width: `${progress * 100}%` }} />
                            </StProgressBarBox>
                            <StProgressText>{`${currentQuestion + 1}/${totalQuestions}`}</StProgressText>
                        </StProgressContainer>
                    </div>
                ) : (
                    <ResultPage counts={counts} />
                )}
            </StTestContainer>
        </StScreenBox>
    );
};

export default MbtiTest;

const StScreenBox = styled.div`
    height: 90vh;
    display: flex;
    align-items: center;
`;

const StTestResultContainer = styled.div`
    width: 600px;
    height: 500px;
    margin: 0 auto;
    padding: 20px;
    background-color: #ffe5e5;
    border-radius: 2rem;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
`;

const StTestContainer = styled.div`
    width: 600px;
    height: 500px;
    margin: 0 auto;
    padding: 20px;
    background-color: #ffe5e5;
    border-radius: 2rem;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
`;

const StQuestionContainer = styled.div`
    margin-bottom: 20px;
    text-align: center;
`;

const StQuestionFont = styled.h1`
    font-size: 2.1875rem;
    font-weight: 500;
    color: #d1453d;
`;

const StQuestionText = styled.h2`
    font-size: 18px;
    margin-top: 40px;
    margin-bottom: 60px;
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

const StResultText = styled.h1`
    font-size: 35px;
    font-weight: 800;
    margin-top: 20px;
    margin-bottom: 100px;
    padding: 10px;
    width: 100%;
    color: #756ab6;
`;

const StOptionsContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 180px;
`;

const StOptionButton = styled.button`
    margin-bottom: 20px;
    padding: 10px 40px;
    font-size: 16px;
    background-color: #fff;
    color: #000000;
    border: none;
    border-radius: 2rem;
    cursor: pointer;
    width: 80%;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);

    &:hover {
        transition: ease-in-out 0.2s;
        background-color: #ac87c5;
        color: #fff;
        box-shadow: 0px 4px 8px rgba(79, 5, 122, 0.575);
    }

    /* &:disabled {
        background-color: #bdc3c7;
        cursor: not-allowed;
    } */
`;

const StCompleteButton = styled.button`
    padding: 10px;
    font-size: 16px;
    background-color: #27ae60;
    color: #fff;
    border: none;
    cursor: pointer;

    &:hover {
        background-color: #21905a;
    }

    &:disabled {
        background-color: #bdc3c7;
        cursor: not-allowed;
    }
`;
const StTypeDescription = styled.p`
    font-size: 16px;
    margin-top: 10px;
    padding: 0px 25px;
    color: #333;
    background-color: #fff;
    border-radius: 2rem;
    height: 200px;
    display: flex;
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
