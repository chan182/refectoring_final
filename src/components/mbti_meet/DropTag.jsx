import React from 'react';
import styled from 'styled-components';
import ZoneCheckedDropTag from './ZoneCheckedDropTag';
import { useRecoilState } from 'recoil';
import { tagCategoryState, selectedTagsState } from '../../recoil/recoilAtoms';
import NoCheckedDropTag from './NoCheckedDropTag';
import GenderCheckedDropTag from './GenderCheckedDropTag';
import AgeCheckedDropTag from './AgeCheckedDropTag';
import MbtiCheckedDropTag from './MbtiCheckedDropTag';

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
            console.log(newSelectedTags);
            return newSelectedTags;
        });
    };

    const removeSelectedTagsHandler = (tag) => {
        setSelectedTags((prevSelectedTags) => {
            const newSelectedTags = prevSelectedTags.filter((selectedTag) => selectedTag !== tag);
            console.log(newSelectedTags);
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
