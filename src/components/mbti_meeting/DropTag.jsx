import React from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { selectedTagsState, tagCategoryState } from '../../recoil/recoilAtoms';
import AgeCheckedDropTag from './AgeCheckedDropTag';
import GenderCheckedDropTag from './GenderCheckedDropTag';
import MbtiCheckedDropTag from './MbtiCheckedDropTag';
import NoCheckedDropTag from './NoCheckedDropTag';
import ZoneCheckedDropTag from './ZoneCheckedDropTag';

const DropTag = () => {
    // 현재 선택된 카테고리를 담는 변수
    const [tagCategory, setTagCategory] = useRecoilState(tagCategoryState);

    // 선택한 태그들을 담는 배열
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

    const mbtiSelectHandler = () => {
        if (tagCategory === 'MBTI') setTagCategory('');
        else setTagCategory('MBTI');
    };

    const addSelectedTagsHandler = (tag) => {
        setSelectedTags((prevSelectedTags) => {
            const newSelectedTags = [...prevSelectedTags, tag];

            return newSelectedTags;
        });
    };
    console.log(selectedTags);
    const removeSelectedTagsHandler = (tag) => {
        setSelectedTags((prevSelectedTags) => {
            const newSelectedTags = prevSelectedTags.filter((selectedTag) => selectedTag !== tag);

            return newSelectedTags;
        });
    };

    return (
        <>
            <StTitle>모임 태그 </StTitle>

            {tagCategory === '' && (
                <NoCheckedDropTag
                    tagCategory={tagCategory}
                    zoneSelectHandler={zoneSelectHandler}
                    genderSelectHandler={genderSelectHandler}
                    ageSelectHandler={ageSelectHandler}
                    mbtiSelectHandler={mbtiSelectHandler}
                />
            )}

            {tagCategory === '지역' && (
                <ZoneCheckedDropTag
                    tagCategory={tagCategory}
                    zoneSelectHandler={zoneSelectHandler}
                    genderSelectHandler={genderSelectHandler}
                    ageSelectHandler={ageSelectHandler}
                    mbtiSelectHandler={mbtiSelectHandler}
                    selectedTags={selectedTags}
                    addSelectedTagsHandler={addSelectedTagsHandler}
                    removeSelectedTagsHandler={removeSelectedTagsHandler}
                />
            )}

            {tagCategory === '성별' && (
                <GenderCheckedDropTag
                    tagCategory={tagCategory}
                    zoneSelectHandler={zoneSelectHandler}
                    genderSelectHandler={genderSelectHandler}
                    ageSelectHandler={ageSelectHandler}
                    mbtiSelectHandler={mbtiSelectHandler}
                    selectedTags={selectedTags}
                    addSelectedTagsHandler={addSelectedTagsHandler}
                    removeSelectedTagsHandler={removeSelectedTagsHandler}
                />
            )}

            {tagCategory === '나이' && (
                <AgeCheckedDropTag
                    tagCategory={tagCategory}
                    zoneSelectHandler={zoneSelectHandler}
                    genderSelectHandler={genderSelectHandler}
                    ageSelectHandler={ageSelectHandler}
                    mbtiSelectHandler={mbtiSelectHandler}
                    selectedTags={selectedTags}
                    addSelectedTagsHandler={addSelectedTagsHandler}
                    removeSelectedTagsHandler={removeSelectedTagsHandler}
                />
            )}

            {tagCategory === 'MBTI' && (
                <MbtiCheckedDropTag
                    tagCategory={tagCategory}
                    zoneSelectHandler={zoneSelectHandler}
                    genderSelectHandler={genderSelectHandler}
                    ageSelectHandler={ageSelectHandler}
                    mbtiSelectHandler={mbtiSelectHandler}
                    selectedTags={selectedTags}
                    addSelectedTagsHandler={addSelectedTagsHandler}
                    removeSelectedTagsHandler={removeSelectedTagsHandler}
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
