import React, { useEffect, useRef, useState } from 'react';
import * as T from './meetingDetailStyle';
import { getComments, getCommentsByLikeCount, getReplies } from './getComment';
import styled from 'styled-components';
import checkImg from '../../assets/mbtiMeeting/check.png';

const CommentSorting = ({ handleSort, id, setComments }) => {
    const [selectedOption, setSelectedOption] = useState('latest');
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const handleSortLocal = async (sortType) => {
        try {
            let commentsData;

            if (sortType === 'latest') {
                commentsData = await getComments(id);
            } else if (sortType === 'likes') {
                const likedComments = await getCommentsByLikeCount(id);
                const latestComments = await getComments(id);

                // 좋아요가 눌린 댓글과 최신순 댓글을 결합
                commentsData = mergeComments(likedComments, latestComments);
            }

            // commentsData가 정의되지 않은 경우 빈 배열로 초기화
            commentsData = commentsData || [];

            // 각 댓글에 대댓글 가져오기
            const commentsWithReplies = await Promise.all(
                commentsData.map(async (comment) => {
                    const replies = await getReplies(id, comment.id);
                    return {
                        ...comment,
                        replies
                    };
                })
            );

            // 좋아요 순 버튼을 눌렀을 때
            if (sortType === 'likes') {
                // 좋아요 수와 날짜를 기준으로 정렬
                commentsWithReplies.sort((a, b) => {
                    const aLikes = a.likes ? Object.values(a.likes).filter(Boolean).length : 0;
                    const bLikes = b.likes ? Object.values(b.likes).filter(Boolean).length : 0;

                    if (aLikes === bLikes) {
                        // createdAt 문자열을 이용하여 댓글이 달린 날짜와 시간 비교
                        return b.createdAt.localeCompare(a.createdAt);
                    }

                    return bLikes - aLikes;
                });
            } else {
                // 최신순일 때는 날짜순으로만 정렬
                commentsWithReplies.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
            }

            setComments(commentsWithReplies);
            setSelectedOption(sortType);
            setIsOpen(false);
        } catch (error) {
            console.error('댓글 정렬 중 에러:', error);
        }
    };

    // 두 댓글 배열을 결합하는 함수
    const mergeComments = (arr1, arr2) => {
        const merged = [...arr1];

        arr2.forEach((item) => {
            if (!merged.some((el) => el.id === item.id)) {
                merged.push(item);
            }
        });

        return merged;
    };

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <>
            <T.StCommentFilter ref={dropdownRef}>
                <StTogglebutton onClick={toggleDropdown}>
                    {selectedOption === 'latest' ? '최신순' : '인기순'}
                    <img src={checkImg} alt="화살표 이미지" style={{ width: '24px', height: '24px' }} />
                </StTogglebutton>
                {isOpen && (
                    <Stdropdown>
                        <Stbutton onClick={() => handleSortLocal('latest')}>최신순</Stbutton>
                        <Stbutton onClick={() => handleSortLocal('likes')}>인기순</Stbutton>
                    </Stdropdown>
                )}
            </T.StCommentFilter>
        </>
    );
};

export default CommentSorting;

const StTogglebutton = styled.button`
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 16px;
    margin-top: -5px;
`;

const Stbutton = styled.button`
    width: 62px;
    height: 27px;
    border: none;
    outline: none;
    background-color: #ffffff;
    cursor: pointer;
    white-space: nowrap;

    &:hover {
        background-color: var(--button-border-color);
        color: white;
    }
`;

const Stdropdown = styled.div`
    position: absolute;
    gap: 5px;
    width: 70px;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background-color: #ffffff;
    border: 1px solid var(--content-border-color);
    border-radius: 0.5rem;
`;

const Stoption = styled.option`
    background-color: #ffffff;

    &:focus {
        background-color: var(--main-button-color);
        color: #fff;
    }
    &:hover {
        background-color: var(--main-button-color);
        color: #fff;
    }
`;
