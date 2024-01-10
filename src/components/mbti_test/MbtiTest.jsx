import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import mcoiLogo from '../../assets/mbtiTest/mcoiLogo.svg';
import * as T from './mbtiTestStyle';
import { questions } from './questions';
import { typeDescriptions } from './typeDescriptions';

const MbtiResult = ({ counts, setCurrentQuestion }) => {
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

    const handleReloadClick = () => {
        window.location.reload();
    };

    const handleReturnHomeClick = () => {
        setCurrentQuestion(0);
        navigate('/');
    };

    return (
        <T.StTestResultContainer>
            <T.StQuestionContainer>
                <T.StResultMent>고생하셨습니다!</T.StResultMent>
                <T.StResultText>{dominantType}</T.StResultText>
                <T.StTypeDescription>{dominantTypeDescription}</T.StTypeDescription>
            </T.StQuestionContainer>
            <T.StButtonContainer>
                <T.StCompleteButton onClick={handleReloadClick} disabled={false}>
                    궁합 보러가기
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

const MbtiTest = ({ setIsModalOpen }) => {
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
        <T.StScreenBox>
            {testStart ? (
                <T.StTestContainer>
                    <T.StTestStartComment>
                        MBTI 검사하고 저희 서비스를 더 재미있고 적극적으로 이용해보세요!
                    </T.StTestStartComment>
                    <T.StTestStartText>
                        성격 테스트를 통해 자신의 성향과 행동에 대한 정확한 분석 결과를 확인해 보세요.
                    </T.StTestStartText>
                    <T.StButtonContainer>
                        <T.StTestStartButton onClick={goHomeButton}>홈 으로 돌아가기</T.StTestStartButton>
                        <T.StTestStartButton onClick={() => setTestStart(!testStart)}>
                            검사 시작하기
                        </T.StTestStartButton>
                    </T.StButtonContainer>
                    <T.StLogoImageBox>
                        <T.StLogoImage>
                            <img src={mcoiLogo} alt="로고이미지" />
                        </T.StLogoImage>
                    </T.StLogoImageBox>
                </T.StTestContainer>
            ) : (
                <T.StTestContainer>
                    {currentQuestion !== -1 ? (
                        <div>
                            <T.StQuestionContainer>
                                <T.StQuestionFont>{`Q. ${currentQuestion + 1}/${totalQuestions}`}</T.StQuestionFont>
                                <T.StQuestionText>{questions[currentQuestion].question}</T.StQuestionText>
                                <T.StOptionsContainer>
                                    <T.StOptionButton
                                        onClick={() => handleOptionClick(questions[currentQuestion].option1)}
                                    >
                                        {questions[currentQuestion].option1}
                                    </T.StOptionButton>
                                    <T.StOptionButton
                                        onClick={() => handleOptionClick(questions[currentQuestion].option2)}
                                    >
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
                        <MbtiResult counts={counts} setCurrentQuestion={setCurrentQuestion} />
                    )}
                </T.StTestContainer>
            )}
        </T.StScreenBox>
    );
};

export default MbtiTest;
