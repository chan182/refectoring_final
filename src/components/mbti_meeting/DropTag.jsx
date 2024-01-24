import React from 'react';
import styled from 'styled-components';
import dropArrow from '../../assets/home/dropArrow.png';
import foldArrow from '../../assets/home/foldArrow.png';
import ZoneCheckedDropTag from './ZoneCheckedDropTag';
import { useRecoilState } from 'recoil';
import { tagCategoryState, selectedTagsState } from '../../recoil/recoilAtoms';
import NoCheckedDropTag from './NoCheckedDropTag';
import GenderCheckedDropTag from './GenderCheckedDropTag';
import AgeCheckedDropTag from './AgeCheckedDropTag';
import MbtiCheckedDropTag from './MbtiCheckedDropTag';

const DropTag = () => {
    // Recoil 상태 사용
    const [tagCategory, setTagCategory] = useRecoilState(tagCategoryState);
    const [selectedTags, setSelectedTags] = useRecoilState(selectedTagsState);

    const zoneSelectHandler = () => {
        if (tagCategory === '지역') setTagCategory('');
        else setTagCategory('지역');
    };

    const genderSelectHandler = () => {
        if (tagCategory === '성별') setTagCategory('');
        else setTagCategory('성별');
    };

    const ageSelectHandler = () => {
        if (tagCategory === '나이') setTagCategory('');
        else setTagCategory('나이');
    };

    const MbtiSelectHandler = () => {
        if (tagCategory === 'MBTI') setTagCategory('');
        else setTagCategory('MBTI');
    };

    return (
        <>
            <StTitle>모임 태그 </StTitle>
            {tagCategory === '' && (
                <NoCheckedDropTag
                    tagCategory={tagCategory}
                    selectedTags={selectedTags}
                    setSelectedTags={setSelectedTags}
                    zoneSelectHandler={zoneSelectHandler}
                    genderSelectHandler={genderSelectHandler}
                    ageSelectHandler={ageSelectHandler}
                    MbtiSelectHandler={MbtiSelectHandler}
                />
            )}
            {tagCategory === '지역' && (
                <ZoneCheckedDropTag
                    tagCategory={tagCategory}
                    selectedTags={selectedTags}
                    setSelectedTags={setSelectedTags}
                    zoneSelectHandler={zoneSelectHandler}
                    genderSelectHandler={genderSelectHandler}
                    ageSelectHandler={ageSelectHandler}
                    MbtiSelectHandler={MbtiSelectHandler}
                />
            )}
            {tagCategory === '성별' && (
                <GenderCheckedDropTag
                    tagCategory={tagCategory}
                    selectedTags={selectedTags}
                    setSelectedTags={setSelectedTags}
                    zoneSelectHandler={zoneSelectHandler}
                    genderSelectHandler={genderSelectHandler}
                    ageSelectHandler={ageSelectHandler}
                    MbtiSelectHandler={MbtiSelectHandler}
                />
            )}
            {tagCategory === '나이' && (
                <AgeCheckedDropTag
                    tagCategory={tagCategory}
                    selectedTags={selectedTags}
                    setSelectedTags={setSelectedTags}
                    zoneSelectHandler={zoneSelectHandler}
                    genderSelectHandler={genderSelectHandler}
                    ageSelectHandler={ageSelectHandler}
                    MbtiSelectHandler={MbtiSelectHandler}
                />
            )}
            {tagCategory === 'MBTI' && (
                <MbtiCheckedDropTag
                    tagCategory={tagCategory}
                    selectedTags={selectedTags}
                    setSelectedTags={setSelectedTags}
                    zoneSelectHandler={zoneSelectHandler}
                    genderSelectHandler={genderSelectHandler}
                    ageSelectHandler={ageSelectHandler}
                    MbtiSelectHandler={MbtiSelectHandler}
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
