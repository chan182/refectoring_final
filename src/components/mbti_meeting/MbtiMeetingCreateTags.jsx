import React from 'react';
import { createMeetingState } from '../../recoil/recoilAtoms';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

function MbtiMeetingCreateTags() {
    const [newMeeting, setNewMeeting] = useRecoilState(createMeetingState);
    const location01 = ['전지역', '서울', '인천', '대전', '광주', '대구', '부산', '울산'];
    const location02 = ['경기', '강원', '충북', '충남', '전북', '전남', '경북', '경남', '제주'];
    const gender = ['남/여', '남자', '여자'];
    const age = ['전연령', '10대', '20대', '30대', '40대', '50대 이상'];
    const mbti = ['모든 유형', 'E', 'I', 'N', 'S', 'F', 'T', 'P', 'J'];

    return (
        <StTopContainerBox>
            <StTitle>모임 태그 </StTitle>
            <StTopContainer>
                <StP1>
                    모임에 맞는 태그 생성하기 <span>* 필수 선택사항 / 중복 선택 가능</span>
                </StP1>

                <StP2>
                    지역 <span>* 최대 2개</span>
                </StP2>
                <StBox>
                    {location01.map((data) => {
                        return (
                            <StDiv key={data}>
                                <StLabel>
                                    <StInput
                                        type="checkbox"
                                        onChange={(e) =>
                                            setNewMeeting((prevNewMeeting) => ({
                                                ...prevNewMeeting,
                                                locations: e.target.checked
                                                    ? [...(prevNewMeeting.locations || []), data]
                                                    : (prevNewMeeting.locations || []).filter(
                                                          (location) => location !== data
                                                      )
                                            }))
                                        }
                                    />
                                    {data}
                                </StLabel>
                            </StDiv>
                        );
                    })}
                </StBox>
                <StBox>
                    {location02.map((data) => {
                        return (
                            <StDiv key={data}>
                                <StLabel>
                                    <StInput
                                        type="checkbox"
                                        onChange={(e) =>
                                            setNewMeeting((prevNewMeeting) => ({
                                                ...prevNewMeeting,
                                                locations: e.target.checked
                                                    ? [...(prevNewMeeting.locations || []), data]
                                                    : (prevNewMeeting.locations || []).filter(
                                                          (location) => location !== data
                                                      )
                                            }))
                                        }
                                    />
                                    {data}
                                </StLabel>
                            </StDiv>
                        );
                    })}
                </StBox>

                <StHr />

                <StP2>
                    성별 <span>* 최대 1개</span>
                </StP2>
                <StBox>
                    {gender.map((data) => {
                        return (
                            <StDiv key={data}>
                                <StLabel>
                                    <StInput
                                        type="checkbox"
                                        onChange={(e) =>
                                            setNewMeeting((prevNewMeeting) => ({
                                                ...prevNewMeeting,
                                                genders: e.target.checked
                                                    ? [...(prevNewMeeting.genders || []), data]
                                                    : (prevNewMeeting.genders || []).filter((gender) => gender !== data)
                                            }))
                                        }
                                    />
                                    {data}
                                </StLabel>
                            </StDiv>
                        );
                    })}
                </StBox>

                <StHr />

                <StP2>
                    나이 <span>* 최대 2개</span>
                </StP2>
                <StBox>
                    {age.map((data) => {
                        return (
                            <StDiv key={data}>
                                <StLabel>
                                    <StInput
                                        type="checkbox"
                                        onChange={(e) =>
                                            setNewMeeting((prevNewMeeting) => ({
                                                ...prevNewMeeting,
                                                ages: e.target.checked
                                                    ? [...(prevNewMeeting.ages || []), data]
                                                    : (prevNewMeeting.ages || []).filter((age) => age !== data)
                                            }))
                                        }
                                    />
                                    {data}
                                </StLabel>
                            </StDiv>
                        );
                    })}
                </StBox>

                <StHr />

                <StP2>MBTI</StP2>
                <StBox>
                    {mbti.map((data) => {
                        return (
                            <StDiv key={data}>
                                <StLabel>
                                    <StInput
                                        type="checkbox"
                                        onChange={(e) =>
                                            setNewMeeting((prevNewMeeting) => ({
                                                ...prevNewMeeting,
                                                mbtis: e.target.checked
                                                    ? [...(prevNewMeeting.mbtis || []), data]
                                                    : (prevNewMeeting.mbtis || []).filter((mbti) => mbti !== data)
                                            }))
                                        }
                                    />
                                    {data}
                                </StLabel>
                            </StDiv>
                        );
                    })}
                </StBox>
            </StTopContainer>
        </StTopContainerBox>
    );
}

export default MbtiMeetingCreateTags;

const StTopContainerBox = styled.div`
    font-size: 26px;
`;

const StTopContainer = styled.div`
    height: 700px;
    width: 1200px;
    font-size: 18px;
    margin-top: 5px;
    background-color: #ffffff;
    border: 1px solid var(--content-border-color);
    display: flex;
    justify-content: center;
    flex-direction: column;
    border-radius: 1rem;
    padding: 28px 40px;
`;

const StTitle = styled.p`
    font-size: 26px;
    margin: 0px 0px 10px 20px;
`;

const StP1 = styled.p`
    font-size: 26px;
    color: #121212;
    margin-top: 28px;
    margin-bottom: 64px;

    span {
        margin-left: 16px;
        font-size: 15px;
        opacity: 0.7;
    }
`;

const StP2 = styled.p`
    font-size: 28px;
    color: #121212;
    margin-bottom: 18px;
    display: flex;
    align-items: center;

    span {
        margin-left: 16px;
        font-size: 15px;
        opacity: 0.7;
    }
`;

const StBox = styled.div`
    display: flex;
`;

const StDiv = styled.div`
    margin-bottom: 24px;
`;

const StLabel = styled.label`
    font-size: 22px;
    color: #121212;
    margin-right: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const StInput = styled.input`
    width: 26px;
    height: 26px;
    margin-right: 6px;
    accent-color: var(--main-button-color);
`;

const StHr = styled.hr`
    border: 1px solid var(--hr-border-color);
    border-width: 1px 0 0 0;
    width: 1120px;
    margin-bottom: 24px;
`;
