import React from 'react';
import styled from 'styled-components';
import dropArrow from '../../assets/home/dropArrow.png';
import foldArrow from '../../assets/home/foldArrow.png';
import ZoneCheckedDropTag from './ZoneCheckedDropTag';
import { useRecoilState } from 'recoil';
import { dropState, tagCategoryState, selectedTagsState } from '../../recoil/recoilAtoms';

const DropTag = () => {
    // Recoil 상태 사용
    const [drop, setDrop] = useRecoilState(dropState);
    const [tagCategory, setTagCategory] = useRecoilState(tagCategoryState);
    const [selectedTags, setSelectedTags] = useRecoilState(selectedTagsState);

    const zoneSelectHandler = () => {
        setDrop(!drop);
        setTagCategory('지역');
        console.log(drop);
    };

    return (
        <>
            <StTitle>모임 태그 </StTitle>
            {tagCategory === '' && (
                <StContainer>
                    <StContent>원하는 조건으로 모임 찾기</StContent>
                    <StButtonBox>
                        <StButton onClick={() => zoneSelectHandler()}>
                            지역
                            {drop ? <img src={foldArrow} /> : <img src={dropArrow} />}
                        </StButton>
                        <StButton>
                            성별
                            <img src={dropArrow} />
                        </StButton>
                        <StButton>
                            나이
                            <img src={dropArrow} />
                        </StButton>
                        <StButton>
                            MBTI
                            <img src={dropArrow} />
                        </StButton>
                    </StButtonBox>
                </StContainer>
            )}
            {tagCategory === '지역' && (
                <ZoneCheckedDropTag
                    drop={drop}
                    setDrop={setDrop}
                    tagCategory={tagCategory}
                    setTagCategory={setTagCategory}
                    selectedTags={selectedTags}
                    setSelectedTags={setSelectedTags}
                    zoneSelectHandler={zoneSelectHandler}
                />
            )}
        </>
    );
};

export default DropTag;

const StTitle = styled.p`
    font-size: 26px;
    margin: 0px 0px 10px 20px;
`;

const StContainer = styled.div`
    height: 162px;
    width: 1200px;
    font-size: 18px;
    padding: 40px;
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
    height: 100px;
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
