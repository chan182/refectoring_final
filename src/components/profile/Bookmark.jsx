import { arrayRemove, arrayUnion, doc, getDoc, updateDoc } from 'firebase/firestore';
import React from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { getData } from '../../api/meeting';
import ageImg from '../../assets/mbtiMeeting/ageimg.png';
import bookmark from '../../assets/mbtiMeeting/bookmark.png';
import bookmarking from '../../assets/mbtiMeeting/bookmark1.png';
import dateImg from '../../assets/mbtiMeeting/dateimg.png';
import positionImg from '../../assets/mbtiMeeting/positionimg.png';
import userImg from '../../assets/mbtiMeeting/userimg.png';
import usersImg from '../../assets/mbtiMeeting/usersimg.png';
import { db } from '../../firebase/firebase.config';
import { userAtom } from '../../recoil/Atom';

const Bookmark = () => {
    const user = useRecoilState(userAtom);
    const queryClient = useQueryClient();
    const { data } = useQuery('meet', getData);
    const FilterData = Array.isArray(data)
        ? data.filter((item) => item.data.bookmark.find((element) => element === user[0].uid) === user[0].uid)
        : [];

    // 북마크
    const mutation = useMutation(
        async (id) => {
            const postRef = doc(db, 'meet', id);
            const postDoc = await getDoc(postRef);
            const postData = postDoc.data();
            if (user[0].uid && postData.bookmark.includes(user[0].uid)) {
                return updateDoc(postRef, {
                    bookmark: arrayRemove(user[0].uid)
                });
            } else {
                return updateDoc(postRef, {
                    bookmark: arrayUnion(user[0].uid)
                });
            }
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries('meet');
            }
        }
    );

    const bookmarked = async (postId) => {
        mutation.mutate(postId);
    };

    return (
        <StMeetingContainer>
            {FilterData?.map(({ id, data }) => (
                <StMeetingWrap>
                    <StMeetingLink to={`/mbti/meeting/detail/${id}`} key={id}>
                        <StImg src={data.repreImg}></StImg>
                    </StMeetingLink>
                    <StContainer>
                        <StTitle>
                            <div>
                                {data.name}/{(data.mbtis + '').split()}
                            </div>
                            {user[0] ? (
                                <StBookMark
                                    onClick={() => {
                                        bookmarked(id);
                                    }}
                                >
                                    {user && data?.bookmark?.includes(user[0].uid) ? (
                                        <img src={bookmarking} alt="북마크 O"></img>
                                    ) : (
                                        <img src={bookmark} alt="북마크 X"></img>
                                    )}
                                </StBookMark>
                            ) : (
                                <div />
                            )}
                        </StTitle>
                        <StPositionDateUserContainer>
                            <StContentsImgWrap>
                                <StContentsPositionImg src={positionImg}></StContentsPositionImg>&nbsp;
                                <StContents>{(data.locations + '').split()}</StContents>
                            </StContentsImgWrap>
                            <StContentsImgWrap>
                                <StContentsDateImg src={dateImg}></StContentsDateImg>&nbsp;
                                <StContents>일정 : {data.schedule}</StContents>
                            </StContentsImgWrap>
                            <StContentsImgWrap>
                                <StContentsUserImg src={userImg} alt="" />
                                &nbsp;
                                <StContents>정원 : {data.limitPeople}</StContents>
                            </StContentsImgWrap>
                        </StPositionDateUserContainer>
                        <StPositionDateUserContainer>
                            <StContentsImgWrap>
                                <StContentsUsersImg src={usersImg} alt="" />
                                &nbsp;
                                <StContents>{(data.genders + '').split()}</StContents>
                            </StContentsImgWrap>
                            <StContentsImgWrap>
                                <StContentsAgeImg src={ageImg} alt="" />
                                &nbsp;
                                <StContents>{(data.ages + '').split()}</StContents>
                            </StContentsImgWrap>
                            <StContentsImgWrap>
                                <StContentsAgeImg></StContentsAgeImg>
                                <StContents></StContents>
                            </StContentsImgWrap>
                        </StPositionDateUserContainer>
                    </StContainer>
                </StMeetingWrap>
            ))}
        </StMeetingContainer>
    );
};

export default Bookmark;

const StMeetingContainer = styled.div`
    display: flex;
    justify-content: space-around;
    width: 100%;
    height: 100%;
    margin: 40px auto 0px;
`;

const StMeetingWrap = styled.div`
    width: 25%;
    aspect-ratio: 1/0.78;
    // margin: 0px 3% 60px 3%;
    display: inline-block;
    border-radius: 16px;
    border: 1px solid #e7e7e7;
`;

const StImg = styled.img`
    width: 100%;
    aspect-ratio: 1/0.5;
    border-top-left-radius: 16px;
    border-top-right-radius: 16px;
    border-bottom: 1px solid #e7e7e7;
`;

const StContainer = styled.div`
    margin: 4%;
`;

const StTitle = styled.div`
    margin: 0px 0px 5%;
    font-size: 18px;
    display: flex;
    justify-content: space-between;
`;

const StBookMark = styled.button`
    position: relative;
    top: -4px;
`;

const StPositionDateUserContainer = styled.div`
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
`;

const StContentsImgWrap = styled.span`
    width: 40%;
    height: 33px;
`;

const StContentsPositionImg = styled.img`
    position: relative;
    top: 3px;
    width: 13px;
`;

const StContentsDateImg = styled.img`
    position: relative;
    top: 3px;
    width: 13px;
`;

const StContentsUserImg = styled.img`
    position: relative;
    top: 3px;
    width: 13px;
`;

const StContentsUsersImg = styled.img`
    position: relative;
    top: 3px;
    width: 13px;
`;

const StContentsAgeImg = styled.img`
    position: relative;
    top: 3px;
    width: 13px;
`;

const StContents = styled.span`
    font-size: 14px;
`;

const StMeetingLink = styled(Link)`
    text-decoration: none;
    color: inherit;
`;
