import styled from 'styled-components';

export const StWholeContainer = styled.div`
    height: 100%;
    width: 100%;
    display: grid;
    justify-content: center;
    background-color: var(--background-color);
`;

export const StTopContainerBox = styled.div`
    margin-top: 68px;
    font-size: 26px;
`;

export const StTopContainer = styled.div`
    height: 540px;
    width: 1200px;
    font-size: 18px;
    margin-top: 5px;
    background-color: #ffffff;
    display: flex;
    justify-content: center;
    border-radius: 1rem;
`;

export const StImageContainer = styled.div`
    height: 346px;
    width: 346px;
    border-radius: 50%;
    margin-top: 54px;
    margin-left: 30px;
    background-color: var(--light-gray);
`;

export const StContentBox = styled.div`
    margin-left: 10px;
`;

export const StTextContainer = styled.div`
    height: 346px;
    width: 680px;
    margin: 54px;
    background-color: #ffffff;
`;

export const StTextContainerBox = styled.div`
    display: flex;
    flex-direction: row;
    gap: 65px;
`;

export const StDetailTextBox = styled.div`
    font-size: 14px;
    margin-bottom: 24px;
    color: #888888;
`;

export const StDetailText = styled.p`
    height: 47px;
    width: 296px;
    background: var(--light-gray);
    font-size: 16px;
    margin-top: 5px;
    padding: 15px;
    display: flex;
    color: #4e4e4e;
    border-radius: 0.5rem;
`;

export const StDetailTextBox2 = styled.div`
    font-size: 14px;
    color: #888888;
    height: 51%;
`;

export const StDetailText2 = styled.p`
    height: 91%;
    width: 97.3%;
    border-radius: 5px;
    background: var(--light-gray);
    font-size: 16px;
    margin-top: 5px;
    padding: 10px;
    display: flex;
    color: #4e4e4e;
    border-radius: 0.5rem;
`;

export const StTagBox = styled.div`
    height: 162px;
    width: 1200px;
    margin-top: 20px;
    font-size: 18px;
    gap: 10px;
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    border-radius: 1rem;
`;

export const StTagName = styled.div`
    font-size: 26px;
    margin-top: 28px;
    margin-left: 40px;
`;

export const StTagContent = styled.div`
    margin-top: 15px;
    margin-left: 40px;
    height: 70px;
    display: flex;
    .tagBox {
        font-size: 24px;
        margin-right: 10px;
        padding: 10px;
        height: 45px;
        background-color: var(--main-button-color);
        color: #ffffff;
        border-radius: 5px;
        display: flex;
        align-items: center;
    }
`;

export const StContentContainerBox = styled.div`
    font-size: 26px;
`;

export const StBottomContainer = styled.div`
    height: 540px;
    width: 1200px;
    font-size: 18px;
    margin-top: 5px;
    background-color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 1rem;
`;

export const StContentContainer = styled.div`
    background-color: var(--light-gray);
    border-radius: 0.5rem;
    height: 95%;
    width: 98%;
    padding: 15px;
`;

export const StDivisionLine = styled.div`
    border: 1px solid var(--hr-border-color);
    border-width: 1px 0 0 0;
    margin: 84px;
    width: 80%;
`;

export const StCommentContainerBox = styled.div`
    font-size: 24px;
`;

export const StCommentContainer = styled.div`
    height: 540px;
    width: 1200px;
    font-size: 18px;
    gap: 10px;
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    border-radius: 1rem;
    margin-top: 10px;
    margin-bottom: 100px;
`;

export const StCommentBox1 = styled.div`
    margin-top: 13px;
    margin-bottom: 10px;
    margin-left: 24px;
    display: flex;
    flex-direction: row;
`;

export const StCommentCount = styled.div`
    font-size: 22px;
    margin-right: 30px;
`;

export const StCommentFilter = styled.div`
    font-size: 16px;
    margin-top: 3px;
`;

export const StCommentBox2 = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-left: 1%;
    height: 50px;
`;

export const StCommentImage = styled.image`
    height: 38px;
    width: 38px;
    margin-right: 5px;
    border-radius: 50%;
    border: 1px solid #8d8d8d;
    overflow: hidden;
`;

export const StComments = styled.div`
    margin-bottom: 16px;
    overflow-y: auto;
    overflow-x: hidden;

    div {
        padding: 10px;
        margin-bottom: 8px;
        border-radius: 0.5rem;
        display: flex;
        align-items: flex-start;
        word-wrap: break-word;

        img {
            width: 38px;
            height: 38px;
            border-radius: 50%;
            margin-right: 10px;
            margin-top: 5px;
            border: 1px solid #8d8d8d;
        }
        div.userDetailsBox {
            display: flex;
            flex-direction: column;
            margin-top: -7px;
        }
        div.userDetails {
            display: flex;
            align-items: flex-start;
            gap: 13px;
            margin-top: -10px;
            margin-left: -10px;
        }
        div.contentBox {
            min-height: 50px;
        }
        div.dropDown {
            width: 20px;
            height: 20px;
            display: flex;
            justify-content: center;
        }
        p.nickname {
            color: #333;
            font-size: 16px;
        }

        p.createdAt {
            color: #888;
            font-size: 16px;
        }

        p.comment {
            width: 1044px;
            font-size: 18px;
            flex: 1;
        }
    }
`;

export const StReplyCommentBox = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: -3.5%;
    max-width: 97%;
    max-height: 15em;
    overflow-y: auto;
    overflow-x: hidden;
    overflow-wrap: break-word;
`;

export const StReplySection = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: -2.5%;
    max-width: 95%;
`;

export const StReplyCommentStatus = styled.div``;

export const StReplyNameTime = styled.div`
    display: flex;
    flex-direction: row;
    gap: 10px;
`;

export const StReplyComment = styled.div`
    width: 90%;
    margin-left: 6%;
    margin-top: -3%;
`;

export const StCommentInput = styled.input`
    width: 95%;
    padding: 10px;
    border: none;
    border-bottom: 1px solid #ccc;
    outline: none;
`;

export const StReplyInput = styled.input`
    width: 100%;
    padding: 10px;
    border: none;
    border-bottom: 1px solid #ccc;
    outline: none;
`;

export const StCommentInputBox1 = styled.div`
    width: 95%;
    display: flex;
    flex-direction: column;
`;

export const StCommentInputBox2 = styled.div`
    width: 100%;
`;

export const StReplyButtonBox = styled.div`
    height: 3rem;
    width: 16%;
    margin-top: -2%;
    margin-left: 85%;
`;

export const StCommentButtonBox = styled.div`
    width: 14%;
    height: 7%;
    margin-left: 85.5%;
`;

export const StCommentButton1 = styled.button`
    font-size: 12px;
    height: 34px;
    width: 76px;
    padding: 8px 16px;
    margin-right: 4px;
    margin-bottom: 40px;
    background-color: #ecebf5;
    color: #b2afcf;
    border-radius: 0.5rem;
    cursor: pointer;

    /* &:hover {
        background-color: var(--light-purple);
        color: #ffffff;
        border: none;
    } */
`;

export const StCommentButton2 = styled.button`
    font-size: 12px;
    height: 34px;
    width: 76px;
    padding: 8px 16px;
    margin-right: 4px;
    margin-bottom: 40px;
    background-color: var(--main-button-color);
    color: #ffffff;
    border-radius: 0.5rem;
    cursor: pointer;

    /* &:hover {
        background-color: var(--light-purple);
        color: #ffffff;
        border: none;
    } */
`;

export const StRequestButton = styled.button`
    font-size: 20px;
    width: 196px;
    height: 48px;
    margin-left: 82.7%;
    margin-top: 1%;
    background-color: var(--main-button-color);
    color: #fff;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;

    /* &:hover {
        transition: ease-in-out 0.2s;
        background-color: var(--main-button-color);
        color: #fff;
    } */
`;

export const StBookmarkButton = styled.div`
    border: 1px solid #969696;
    font-size: 15px;
    width: 76px;
    height: 34px;
    margin-left: 635px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #ffffff;
    color: #969696;
    border-radius: 0.5rem;
    cursor: pointer;

    &:hover {
        transition: ease-in-out 0.2s;
        background-color: var(--main-button-color);
        color: #fff;
        border: none;
    }
`;

export const StReplyButton = styled.button``;

export const StCancelReplyButton = styled.button`
    font-size: 12px;
    height: 34px;
    width: 76px;
    padding: 8px 16px;
    margin-right: 4px;
    margin-bottom: 40px;
    background-color: #ecebf5;
    color: #b2afcf;
    border-radius: 0.5rem;
    cursor: pointer;
`;

export const StViewRepliesButton = styled.button``;

export const StEditButton = styled.button`
    cursor: pointer;
    margin-right: 10px;
    padding: 5px 10px;
    font-size: 14px;
    color: #fff;
    background-color: #3498db;
    border: none;
    border-radius: 5px;
    transition: background-color 0.3s;
`;

export const StDeleteButton = styled.button`
    cursor: pointer;
    margin-right: 10px;
    padding: 5px 10px;
    font-size: 14px;
    color: #fff;
    background-color: #3498db;
    border: none;
    border-radius: 5px;
    transition: background-color 0.3s;
`;
