import { addDoc, collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import downVector from '../../assets/community/Vector-down.svg';
import upVector from '../../assets/community/Vector-up.svg';
import filteredImoge from '../../assets/community/align-left.svg';
import { db } from '../../firebase/firebase.config';
import { userAtom } from '../../recoil/Atom';

const CommentList = () => {
    const [user, setUser] = useRecoilState(userAtom);
    const [showButtons, setShowButtons] = useState(false);
    const [comments, setComments] = useState([]);
    const [content, setContent] = useState('');
    const params = useParams();
    // console.log(params?.id);

    // params.id로 댓글 목록을 가져온다.
    const fetchData = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, 'communities', params.id, 'comments'));
            const communityData = querySnapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }));
            setComments(communityData);
        } catch (error) {
            console.log('fetching error data ====>', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [params.id]); // params.id가 변경될 때마다 fetchData 호출

    // console.log(comments);

    // 버튼 클릭시 comments 업로드
    const handleClickAddCommentButton = async () => {
        try {
            const newComment = {
                ImageUrl: user.imageUrl,
                content,
                createdAt: new Date().toLocaleDateString('ko', {
                    year: '2-digit',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit'
                }),
                nickname: user.nickname
            };
            const docRef = await addDoc(collection(db, 'communities', params.id, 'comments'), newComment);
            fetchData();
            console.log('업로드성공');
            setComments([]);
        } catch (error) {
            console.error('댓글 추가시 오류 발생함 ==>', error);
        }
    };

    return (
        <Stwrapper>
            <StCommentTitleWrapper>
                <StTitle>댓글 0000개 </StTitle>
                <StFilteredbutton>
                    <img src={filteredImoge} alt="" />
                    <div>정렬기준</div>
                </StFilteredbutton>
            </StCommentTitleWrapper>
            <StInputWrapper>
                <StImageIntutWrapper>
                    <StProfileImoge src={user?.imageUrl} alt="" />
                    <StInput
                        value={content}
                        onChange={(e) => {
                            setContent(e.target.value);
                        }}
                        onClick={() => setShowButtons(true)}
                        // onBlur={() => setShowButtons(false)}
                    />
                </StImageIntutWrapper>
                {showButtons === true ? (
                    <StButtonWrapper>
                        <StButton
                            onClick={() => {
                                setShowButtons(false);
                            }}
                        >
                            취소
                        </StButton>
                        <StButton
                            onClick={() => {
                                handleClickAddCommentButton();
                            }}
                        >
                            댓글
                        </StButton>
                    </StButtonWrapper>
                ) : (
                    <></>
                )}
            </StInputWrapper>
            {comments?.map(({ id, data }) => {
                return (
                    <StCommentCardList key={id}>
                        <StProfileImoge src={data?.ImageUrl} alt="" />
                        <StCommentWrapper>
                            <StCommentUserInfo>
                                <div>{data?.nickname}</div>
                                <div>{data?.createdAt}</div>
                            </StCommentUserInfo>
                            <Stcomment>{data?.content}.</Stcomment>
                            <StUpDown>
                                <StUp>
                                    <img src={upVector} alt="" />
                                    <div>999m</div>
                                </StUp>
                                <StDown>
                                    <img src={downVector} alt="" />
                                    <div>999m</div>
                                </StDown>
                            </StUpDown>
                        </StCommentWrapper>
                    </StCommentCardList>
                );
            })}
        </Stwrapper>
    );
};

export default CommentList;

const Stwrapper = styled.div`
    width: 1200px;
    border-radius: 26px;
    border: 1px solid #ededed;
    background: #fff;
`;

const StCommentTitleWrapper = styled.div`
    margin: 26px auto 22px 24px;
    display: flex;
    align-items: flex-start;
    gap: 37px;
`;

const StTitle = styled.div`
    color: #000;
    font-size: 22px;
    font-style: normal;
    font-weight: 400;
    line-height: 120%; /* 26.4px */
`;

const StFilteredbutton = styled.div`
    display: flex;
    align-items: center;
    gap: 4px;
`;

const StProfileImoge = styled.img`
    width: 38px;
    height: 38px;
    fill: #efefef;
    stroke-width: 1px;
    stroke: #8d8d8d;
    border-radius: 50%;
`;

const StInputWrapper = styled.div`
    display: inline-flex;

    gap: 4px;
    margin: 0px 24px 68px 24px;
    flex-direction: column;
`;

const StImageIntutWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 4px;
`;

const StInput = styled.input`
    display: flex;
    width: 1110px;
    padding: 10px;
    align-items: flex-start;
    border-width: 0 0 1px;
    gap: 10px;
    color: #4e4e4e;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 148%; /* 23.68px */
    letter-spacing: -0.08px;
`;

// 추후 수정 필요

const StButtonWrapper = styled.div`
    display: flex;
    gap: 4px;
    margin: 0px auto 0px 85%;
`;

const StButton = styled.button`
    display: flex;
    width: 76px;
    height: 34px;
    padding: 10px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border-radius: 6px;
    background: #f8f8f8;
    color: #888;
    font-size: 15px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    letter-spacing: 0.3px;
`;

const StCommentCardList = styled.div`
    display: inline-flex;
    align-items: flex-start;
    gap: 14px;
    margin: 0px 56px 36px 24px;
`;

const StCommentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
`;

const StCommentUserInfo = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 13px;
`;

const Stcomment = styled.div`
    width: 1044px;

    overflow: hidden;
    color: #121212;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-family: Pretendard;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: 148%; /* 26.64px */
    letter-spacing: -0.09px;
`;

const StUpDown = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 12px;
`;

const StUp = styled.div`
    display: flex;
    align-items: center;
    gap: 13px;
`;

const StDown = styled.div`
    display: flex;
    align-items: center;
    gap: 13px;
`;
