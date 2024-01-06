import React, { useState } from 'react';
import styled from 'styled-components';

const questions = [
    // I/E 질문
    {
        question: '새로운 사람들과의 소규모 모임에서 당신은 어떤가요?',
        option1: '한 두 명의 친구와 조용한 대화를 즐깁니다. (I)',
        option2: '많은 사람들과 함께 어울리며 활기찬 분위기를 선호합니다. (E)'
    },
    {
        question: '힘든 상황에서 당신은 어떻게 에너지를 얻나요?',
        option1: '혼자서 조용한 공간에서 생각에 잠깁니다. (I)',
        option2: '다른 사람들과 소통하며 그들로부터 지지를 얻습니다. (E)'
    },
    {
        question: '새로운 경험이나 활동을 시도할 때 당신은 어떤가요?',
        option1: '신중하게 준비하고 혼자서 천천히 즐깁니다. (I)',
        option2: '빠르게 도전하며 다른 사람들과 함께 하고 싶어합니다. (E)'
    },
    // N/S 질문
    {
        question: '새로운 아이디어를 받아들이는 방식에 대해 어떻게 생각하나요?',
        option1: '구체적이고 현실적인 측면을 중시하며 경험을 바탕으로 합니다. (S)',
        option2: '미래의 가능성과 추상적인 아이디어에 더 관심이 있습니다. (N)'
    },
    {
        question: '문제 해결 시 당신의 접근 방식은 무엇인가요?',
        option1: '사실과 경험을 기반으로 해결책을 찾으며 실제 상황을 고려합니다. (S)',
        option2: '창의적인 아이디어를 활용하며 문제의 본질을 파악하려고 합니다. (N)'
    },
    {
        question: '계획을 세울 때, 당신의 주요 고려 사항은 무엇인가요?',
        option1: '실제적이고 구체적인 세부 계획을 세우며 세부 사항을 중시합니다. (S)',
        option2: '큰 그림을 바라보며 미래의 가능성과 흐름을 고려합니다. (N)'
    },
    // F/T 질문
    {
        question: '갈등 상황에서, 당신의 결정은 어떻게 이루어지나요?',
        option1: '감정적인 측면을 중시하며 모든 사람의 감정을 고려합니다. (F)',
        option2: '논리적이고 객관적인 판단을 토대로 결정을 내리려고 합니다. (T)'
    },
    {
        question: '문제 해결 시 당신이 주로 가치를 두는 것은 무엇인가요?',
        option1: '타인의 감정과 가치에 대한 이해를 바탕으로 해결책을 찾습니다. (F)',
        option2: '논리적인 분석과 객관적인 판단을 중시하여 문제를 해결합니다. (T)'
    },
    {
        question: '목표 달성을 위해 당신이 선호하는 방식은 무엇인가요?',
        option1: '팀원과의 협업, 감정적인 지지를 받으며 목표를 달성하려고 합니다. (F)',
        option2: '목표를 분석하고 논리적인 계획에 따라 끈질기게 추진하려고 합니다. (T)'
    },
    // J/P 질문
    {
        question: '계획을 세울 때, 어떤 방식으로 계획을 세우나요?',
        option1: '유연하게 계획을 세우며 일상적인 일을 순간적으로 처리합니다. (P)',
        option2: '체계적으로 계획을 세우며 일정과 목표를 명확히 설정합니다. (J)'
    },
    {
        question: '일을 처리하는 방식에 대해 어떻게 생각하나요?',
        option1: '일을 주로 그때그때 처리하며 더 유연한 접근을 선호합니다. (P)',
        option2: '미리 계획을 세우고 일을 체계적으로 처리하는 것이 좋다고 생각합니다. (J)'
    },
    {
        question: '남들과의 약속에 대해 어떤 태도를 가지고 있나요?',
        option1: '약속 시간을 더 유연하게 다루며 상황에 따라 조절합니다. (P)',
        option2: '정해진 약속 시간을 지키고 일을 체계적으로 조직합니다. (J)'
    }
];

const typeDescriptions = {
    ISTJ: '근면하고 성실한 사람으로, 현실적이고 조직적인 성향으로, 집중력이 강하고 책임감이 높습니다.',
    ISFJ: '용감하고 배려심 많은 사람으로, 현실적이면서도 다른 사람을 배려하는 성향으로 조용하고 신중한 편입니다.',
    INFJ: '열정적이고 선의의 사람으로, 인간관계에 민감하고 상상력이 풍부하며, 자기 주장을 가질 수 있는 유형입니다.',
    INTJ: '독립적이고 논리적인 사람으로, 분석적이고 논리적인 성향으로 비전을 가지고 목표를 추구하는 경향이 있습니다.',
    ISTP: '냉철하고 탐구적인 사람으로, 문제 해결 능력이 뛰어나고 실제적인 능력을 가지며 독립심이 강합니다.',
    ISFP: '예술적이고 감정 기반의 사람으로, 예술적이며 공감능력이 뛰어나며, 조용하고 적응력이 좋습니다.',
    INFP: '열정적이고 이상주의적인 사람으로, 상상력이 풍부하고 내적 가치를 중요시하는 성향으로 타인을 이해하고 돕는 데 관심이 있습니다.',
    INTP: '논리적이고 분석적인 사람으로, 분석적이며 창의적인 성향으로 지적 호기심이 강하고 독립적입니다.',
    ESTP: '활동적이고 실용적인 사람으로, 적응력이 뛰어나며 활동적인 성향으로 문제를 해결하는 데 능숙합니다.',
    ESFP: '재미있고 활기찬 사람으로, 사교적이며 재치가 있으며, 주변 사람들과 함께하는 것을 즐깁니다.',
    ENFP: '열정적이고 사교적인 사람으로, 사교적이며 상상력이 풍부하며, 새로운 아이디어와 경험을 즐깁니다.',
    ENTP: '재치있고 논쟁적인 사람으로, 독창적이며 적극적으로 새로운 아이디어를 찾아내며, 논쟁을 좋아합니다.',
    ESTJ: '활동적이고 현실적인 사람으로, 실제적이며 조직적인 성향으로, 책임감이 높고 현실적인 문제 해결에 능숙합니다.',
    ESFJ: '친절하고 협조적인 사람으로, 다른 사람들을 배려하고 돕는 데 열정적이며, 사교성이 높습니다.',
    ENFJ: '열정적이고 사회적인 사람으로, 사회적이며 다른 사람들을 이끌어나가는 역할을 잘 하는 유형입니다.',
    ENTJ: '지도력 있는 사람으로, 지도력과 리더십을 가지며 목표 달성을 위해 계획적으로 움직입니다.'
};

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
        <StTestContainer>
            <StQuestionContainer>
                <StQuestionText>결과: {dominantType}</StQuestionText>
                <StTypeDescription>{dominantTypeDescription}</StTypeDescription>
                <StOptionsContainer>
                    <p>I: {counts.I}</p>
                    <p>E: {counts.E}</p>
                    <p>S: {counts.S}</p>
                    <p>N: {counts.N}</p>
                    <p>T: {counts.T}</p>
                    <p>F: {counts.F}</p>
                    <p>J: {counts.J}</p>
                    <p>P: {counts.P}</p>
                </StOptionsContainer>
            </StQuestionContainer>
        </StTestContainer>
    );
};

const MbtiTest = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [counts, setCounts] = useState({ I: 0, E: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 });
    const totalQuestions = questions.length;

    const handleOptionClick = (option) => {
        const currentQuestionData = questions[currentQuestion];

        if (option.includes('I')) {
            setCounts({ ...counts, I: counts.I + 1 });
        } else if (option.includes('E')) {
            setCounts({ ...counts, E: counts.E + 1 });
        } else if (option.includes('S')) {
            setCounts({ ...counts, S: counts.S + 1 });
        } else if (option.includes('N')) {
            setCounts({ ...counts, N: counts.N + 1 });
        } else if (option.includes('T')) {
            setCounts({ ...counts, T: counts.T + 1 });
        } else if (option.includes('F')) {
            setCounts({ ...counts, F: counts.F + 1 });
        } else if (option.includes('J')) {
            setCounts({ ...counts, J: counts.J + 1 });
        } else if (option.includes('P')) {
            setCounts({ ...counts, P: counts.P + 1 });
        }

        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            setCurrentQuestion(-1); // -1로 설정하여 결과 페이지 표시
        }
    };

    const handleNextClick = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            setCurrentQuestion(-1); // -1로 설정하여 결과 페이지 표시
        }
    };

    const progress = (currentQuestion + 1) / totalQuestions;

    // useEffect(() => {
    //     if (currentQuestion === -1) {
    //         // 결과 페이지
    //         // 여기에서 결과를 활용하여 추가적인 작업 수행 가능
    //     }
    // }, [currentQuestion, counts]);

    return (
        <StScreenBox>
            <StTestContainer>
                {currentQuestion !== -1 ? (
                    <div>
                        <StQuestionContainer>
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
                            <StProgressBar style={{ width: `${progress * 100}%` }} />
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

const StTestContainer = styled.div`
    max-width: 600px;
    height: 500px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f8f8f8;
`;

const StQuestionContainer = styled.div`
    margin-bottom: 20px;
    text-align: center;
`;

const StQuestionText = styled.h2`
    font-size: 18px;
    margin-bottom: 10px;
    padding: 10px;
    width: 100%;
    border: 1px solid grey;
`;

const StOptionsContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const StOptionButton = styled.button`
    margin-bottom: 10px;
    padding: 10px;
    font-size: 16px;
    background-color: #756ab6;
    color: #fff;
    border: none;
    cursor: pointer;
    width: 100%; /* 가로 길이를 부모 요소에 맞춤 */

    &:hover {
        background-color: #6456b4;
    }

    &:disabled {
        background-color: #bdc3c7;
        cursor: not-allowed;
    }
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
    color: #333;
`;

const StProgressContainer = styled.div`
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const StProgressBar = styled.div`
    height: 20px;
    background-color: #e0aed0;
    transition: width 0.3s;
`;

const StProgressText = styled.p`
    margin-top: 10px;
    font-size: 14px;
    color: #333;
`;
