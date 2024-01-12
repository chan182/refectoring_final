import React from 'react';
import styled from 'styled-components';
import heartImoge from '../../assets/profile/heart.svg';
import eyeImoge from '../../assets/profile/eye.svg';
import messageSquare from '../../assets/profile/message-square.svg';

const UserWritelist = () => {
    return (
        <>
            <StTitle>활동내역</StTitle>
            <StmainWrapper>
                <Stbolder>
                    <StFilterLIst>
                        <StMyPeedListFilterBtn>내가 쓴 게시글</StMyPeedListFilterBtn>
                        <StMyBookmarkListFilterBtn>내가 북마크한 게시글</StMyBookmarkListFilterBtn>
                    </StFilterLIst>
                    <Stcontents>
                        <div>
                            <StfilteredTitle>내가 작성한 글 제목</StfilteredTitle>
                            <StImoges>
                                <img src={heartImoge} alt="" />
                                <StLikeCount>999m</StLikeCount>
                                <img src={messageSquare} alt="" />
                                <StCommentCount>999K</StCommentCount>
                                <img src={eyeImoge} alt="" />
                                <StViewCount>999m</StViewCount>
                            </StImoges>
                        </div>
                    </Stcontents>
                </Stbolder>
            </StmainWrapper>
        </>
    );
};

export default UserWritelist;

const StmainWrapper = styled.div`
    width: 60%;
    height: 500px;
    margin: 10px auto;
    border-radius: 10px;
    background: white;
    border: 1px solid var(--content-border-color);
`;

const Stbolder = styled.div`
    padding: 10px;
    border-radius: 10px;
`;

const StFilterLIst = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 15px 0px 25px 0px;
    height: 50px;
`;

const StMyPeedListFilterBtn = styled.div`
    display: flex;
    padding: 20px;
    margin-left: 20px;
    height: 40px;
    justify-content: center;
    align-items: center;
    border-radius: 50px;
    background: var(--main-button-color);
    box-shadow: 2px 3px 4px 0px rgba(0, 0, 0, 0.25);
    color: white;
    font-size: 18px;
    letter-spacing: 0.44px;
`;

const StMyBookmarkListFilterBtn = styled.div`
    display: flex;
    padding: 20px;
    margin-left: 20px;
    height: 40px;
    justify-content: center;
    align-items: center;
    border-radius: 50px;
    background: var(--light-gray);
    box-shadow: 2px 3px 4px 0px rgba(0, 0, 0, 0.25);
    color: var(--bold-gray);
    font-size: 18px;
    letter-spacing: 0.44px;
`;

const StTitle = styled.div`
    font-size: 24px;
    color: var(--bold-gray);
    width: 60%;
    padding: 0px 0px 0px 10px;
`;

const Stcontents = styled.div`
    div {
        display: flex;
        flex-direction: row;
        margin: 10px;
        justify-content: space-between;
        align-items: center;
        border-radius: 6px;
        background: #f9f9ff;
    }
`;

const StfilteredTitle = styled.div``;

const StImoges = styled.div``;

const StLikeCount = styled.div``;

const StCommentCount = styled.div``;

const StViewCount = styled.div``;
