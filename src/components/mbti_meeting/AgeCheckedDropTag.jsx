import React, { useState } from 'react';
import styled from 'styled-components';
import dropArrow from '../../assets/home/dropArrow.png';
import foldArrow from '../../assets/home/foldArrow.png';
import x from '../../assets/mbtiMeeting/x.png';

const AgeCheckedDropTag = ({
    tagCategory,
    zoneSelectHandler,
    genderSelectHandler,
    ageSelectHandler,
    mbtiSelectHandler,
    selectedTags,
    addSelectedTagsHandler,
    removeSelectedTagsHandler
}) => {
    const [checkboxTags, setCheckboxTags] = useState(['전연령', '10대', '20대', '30대', '40대', '50대 이상']);

    return (
        <>
            <StContainer>
                <StContent>원하는 조건으로 모임 찾기</StContent>
                <StButtonBox>
                    <StButton onClick={() => zoneSelectHandler()}>
                        지역
                        {tagCategory === '지역' ? <img src={foldArrow} /> : <img src={dropArrow} />}
                    </StButton>
                    <StButton onClick={() => genderSelectHandler()}>
                        성별
                        {tagCategory === '성별' ? <img src={foldArrow} /> : <img src={dropArrow} />}
                    </StButton>
                    <StButton onClick={() => ageSelectHandler()}>
                        나이
                        {tagCategory === '나이' ? <img src={foldArrow} /> : <img src={dropArrow} />}
                    </StButton>
                    <StButton onClick={() => mbtiSelectHandler()}>
                        MBTI
                        {tagCategory === 'MBTI' ? <img src={foldArrow} /> : <img src={dropArrow} />}
                    </StButton>
                </StButtonBox>

                {selectedTags.length !== 0 && (
                    <StSelectedTagsBox>
                        {selectedTags.map((tag, index) => (
                            <StSelectedTags onClick={() => removeSelectedTagsHandler(tag)} key={index}>
                                <p>{tag}</p>
                                <img src={x} />
                            </StSelectedTags>
                        ))}
                    </StSelectedTagsBox>
                )}

                <StHr />

                <StCheckbox>
                    {checkboxTags.map((tag, index) => (
                        <React.Fragment key={index}>
                            <input
                                type="checkbox"
                                checked={selectedTags.includes(tag)}
                                onClick={() => {
                                    if (!selectedTags.includes(tag)) {
                                        addSelectedTagsHandler(tag);
                                    } else removeSelectedTagsHandler(tag);
                                }}
                            />
                            <StP>{tag}</StP>
                        </React.Fragment>
                    ))}
                </StCheckbox>
            </StContainer>
        </>
    );
};

export default AgeCheckedDropTag;

const StContainer = styled.div`
    width: 1200px;
    font-size: 18px;
    padding: 28px 0px 0px 40px;
    padding-bottom: 10px;
    border: 1px solid var(--content-border-color);
    border-radius: 26px;
    background-color: #ffffff;
`;

const StContent = styled.p`
    font-size: 22px;
    color: #121212;
`;

const StButtonBox = styled.div`
    width: 100%;
    height: 45px;
    margin-top: 16px;
`;

const StButton = styled.button`
    min-width: 80px;
    max-width: 100px;
    height: 44px;
    border-radius: 8px;
    border: 1px solid var(--button-border-color);
    font-size: 22px;
    margin-right: 28px;
    padding-left: 10px;
    padding-right: 10px;

    img {
        width: 15px;
        margin: 3px 0px 0px 7px;
    }
`;

const StCheckbox = styled.label`
    font-size: 22px;
    display: flex;
    align-items: center;
    margin-bottom: 28px;

    & input {
        width: 1.5rem;
        height: 1.5rem;
        margin-right: 4px;

        :checked {
            width: 1.5rem;
            height: 1.5rem;
            margin-right: 4px;
            border: none;
            color: white;
            background-color: var(--main-button-color);
        }
    }
`;

const StP = styled.p`
    margin-right: 24px;
`;

const StHr = styled.hr`
    border: 1px solid var(--hr-border-color);
    border-width: 1px 0 0 0;
    margin-top: 42px;
    margin-bottom: 42px;
    margin-right: 40px;
`;

const StSelectedTagsBox = styled.div`
    display: flex;
    align-items: flex-start;
`;

const StSelectedTags = styled.div`
    padding: 8px 10px;
    background-color: var(--main-button-color);
    color: white;
    display: flex;
    align-items: center;
    margin: 38px 28px 0px 0px;
    padding: 8px;
    border-radius: 6px;
    border: none;

    p {
        font-size: 24px;
    }

    img {
        width: 28px;
        height: 28px;
        margin: 0px 0px 0px 4px;
        padding: 0;
    }
`;
