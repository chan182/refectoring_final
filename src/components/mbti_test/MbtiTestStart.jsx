import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import mcoiLogo from '../../assets/mbtiTest/mcoiLogo.svg';
import * as T from './mbtiTestStyle';
import { questions } from './questions';
import { typeDescriptions, typeDescriptionsDetails } from './typeDescriptions';

const MbtiResult = ({ setCounts, counts, setCurrentQuestion, setIsModalOpen }) => {
    const navigate = useNavigate();

    useEffect(() => {
        console.log('Counts:', counts);
    }, [counts]);

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
    const dominantTypeDescriptionDetail = typeDescriptionsDetails[dominantType];

    const handleReloadClick = () => {
        setIsModalOpen(false);
        setTimeout(() => {
            navigate('/');
        }, 0);
    };

    const handleReturnHomeClick = () => {
        setCounts({ I: 0, E: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 });
        setCurrentQuestion(0);
    };

    return (
        <T.StTestResultContainer>
            <T.StQuestionContainer>
                <T.StResultText>{dominantType}</T.StResultText>
                <T.StTypeDescription>{dominantTypeDescription}</T.StTypeDescription>
                <T.StResultMent>{dominantTypeDescriptionDetail}</T.StResultMent>
            </T.StQuestionContainer>
            <T.StButtonContainer>
                <T.StCompleteButton onClick={handleReloadClick} disabled={false}>
                    홈으로 돌아가기
                </T.StCompleteButton>
                <T.StCompleteButton onClick={handleReturnHomeClick} disabled={false}>
                    검사 다시하기
                </T.StCompleteButton>
            </T.StButtonContainer>
            <T.StResultLogoContainer>
                <T.StLogoImageBox>
                    <T.StLogoImage>
                        <img src={mcoiLogo} alt="로고이미지" />
                    </T.StLogoImage>
                </T.StLogoImageBox>
            </T.StResultLogoContainer>
        </T.StTestResultContainer>
    );
};

const MbtiTestStart = ({ setIsModalOpen }) => {
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
        setIsModalOpen(false);
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
        <T.StScreenBox>
            <T.StTestContainer>
                {currentQuestion !== -1 ? (
                    <div>
                        <T.StQuestionContainer>
                            <T.StQuestionFont>{`Q. ${currentQuestion + 1}/${totalQuestions}`}</T.StQuestionFont>
                            <T.StQuestionText>{questions[currentQuestion].question}</T.StQuestionText>
                            <T.StOptionsContainer>
                                <T.StOptionButton onClick={() => handleOptionClick(questions[currentQuestion].option1)}>
                                    {questions[currentQuestion].option1}
                                </T.StOptionButton>
                                <T.StOptionButton onClick={() => handleOptionClick(questions[currentQuestion].option2)}>
                                    {questions[currentQuestion].option2}
                                </T.StOptionButton>
                            </T.StOptionsContainer>
                        </T.StQuestionContainer>
                        <T.StButtonContainer>
                            <T.StCompleteButton onClick={goHomeButton}>검사 종료하기</T.StCompleteButton>
                        </T.StButtonContainer>
                        <T.StLogoImageBox>
                            <T.StLogoImage>
                                <img src={mcoiLogo} alt="로고이미지" />
                            </T.StLogoImage>
                        </T.StLogoImageBox>

                        {/* <StProgressContainer>
                            <StProgressBarBox>
                                <StProgressBar style={{ width: `${progress * 100}%` }} />
                            </StProgressBarBox>
                            <StProgressText>{`${currentQuestion + 1}/${totalQuestions}`}</StProgressText>
                        </StProgressContainer> */}
                    </div>
                ) : (
                    <MbtiResult
                        counts={counts}
                        setCounts={setCounts}
                        setIsModalOpen={setIsModalOpen}
                        setCurrentQuestion={setCurrentQuestion}
                    />
                )}
            </T.StTestContainer>
        </T.StScreenBox>
    );
};

export default MbtiTestStart;