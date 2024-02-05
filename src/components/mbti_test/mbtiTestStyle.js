import styled from 'styled-components';

export const StScreenBox = styled.div`
    /* height: 80vh;
    background-color: #f5f5f5; */
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const StScreenBox2 = styled.div`
    height: 90vh;
    background-color: #fcfcfc;
    display: flex;
    justify-content: center;
    align-items: center;
`;

// export const StScreenBox = styled.div`
//     position: fixed;
//     top: 0;
//     left: 0;
//     width: 100%;
//     height: 100%;
//     display: ${({ isModalOpen }) => (isModalOpen ? 'flex' : 'none')};
//     align-items: center;
//     justify-content: center;
//     background-color: rgba(0, 0, 0, 0.5); /* 배경 어둡게 하기 */
// `;

export const StTestResultContainer = styled.div`
    width: 1200px;
    height: 640px;
    margin: 0 auto;
    padding: 20px;
    background-color: #fff;
    border-radius: 0.5rem;
    /* box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2); */
    position: absolute;
    top: 49.5%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
`;

export const StTestContainer = styled.div`
    width: 1200px;
    height: 765px;
    margin: 0 auto;
    margin-top: -3%;
    /* padding: 20px; */
    background-color: #fff;
    border-radius: 0.5rem;

    /* box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2); */
`;

export const StQuestionContainer = styled.div`
    margin-bottom: 20px;
    margin-top: 5%;
    text-align: center;
`;

export const StTestResultbox = styled.div`
    height: 420px;
    margin-top: 2%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 7%;
`;

export const StTestResultImg = styled.img`
    width: 400px;
    height: 450px;
    margin-top: 2%;
    margin-left: 7%;
`;

export const StTestResultContentBox = styled.div`
    margin-top: 8%;
`;

export const StQuestionFont = styled.h1`
    font-size: 2.1875rem;
    font-weight: 500;
    margin-top: 40px;
    color: black;
`;

export const StQuestionText = styled.h2`
    font-size: 32px;
    margin-top: 11px;
    margin-bottom: 40px;
    padding: 10px;
    width: 100%;
    height: 80px;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 2rem;
    background-color: #fff;
`;

export const StResultMent = styled.h1`
    font-size: 20px;
    height: 468px;
    width: 583px;
    white-space: pre-line;
    line-height: 1.5;
    max-height: calc(18px * 20);
    overflow: auto;
    text-align: left;
`;

export const StResultText = styled.h1`
    font-size: 48px;
    margin-top: -10%;
    width: 100%;
`;

export const StOptionsContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 21px;
    margin-bottom: 15%;
    height: 250px;
    padding: 0 200px;
`;

export const StOptionButton = styled.button`
    margin-bottom: 20px;
    padding: 10px 40px;
    font-size: 24px;
    background-color: #f8f8f8;
    color: #000000;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
    width: 680px;
    height: 134px;
    /* box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2); */

    &:hover {
        transition: ease-in-out 0.2s;
        background-color: #abaad8;
        color: #ffffff;
        font-weight: bold;
        /* box-shadow: 0px 4px 8px rgba(79, 5, 122, 0.575); */
    }
`;

export const StButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 60px;
    gap: 15px;
    margin-top: 3%;
`;

export const StButtonContainer2 = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 60px;
    gap: 15px;
    margin-top: 12%;
`;

export const StCompleteButton = styled.button`
    padding: 10px;
    font-size: 16px;
    margin-top: 10px;
    margin-bottom: 20px;
    background-color: #f8f8f8;
    color: #000000;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
    width: 20%;
    /* box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2); */

    &:hover {
        transition: ease-in-out 0.2s;
        background-color: #756ab6;
        color: #fff;
        /* box-shadow: 0px 4px 8px rgba(79, 5, 122, 0.575); */
    }
`;

export const StCompleteButton2 = styled.button`
    padding: 10px;
    font-size: 16px;
    margin-top: 10px;
    margin-bottom: 20px;
    background-color: var(--main-button-color);
    color: #fff;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
    width: 20%;
    /* box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2); */

    /* &:hover {
        transition: ease-in-out 0.2s;
        background-color: var(--main-button-color);
        color: #fff;
        /* box-shadow: 0px 4px 8px rgba(79, 5, 122, 0.575);} */
`;

export const StTypeDescription = styled.p`
    font-size: 20px;
    color: #333;
    background-color: #fff;
    height: 102px;
    width: 583px;
    display: flex;
    text-align: left;
`;

export const StProgressContainer = styled.div`
    margin-top: 20px;
    display: flex;
    flex-direction: column;
`;

export const StProgressBar = styled.div`
    height: 20px;
    background-color: #e0aed0;
    transition: width 0.7s;
    position: relative;
    border-radius: 2rem;
`;

export const StProgressText = styled.p`
    margin-top: 10px;
    font-size: 14px;
    color: #333;
    text-align: center;
`;

export const StProgressBarBox = styled.div`
    border: none;
    background-color: #fff;
    border-radius: 2rem;
`;

export const StResultLogoContainer = styled.div`
    margin-left: 5px;
`;

export const StLogoImage = styled.div`
    width: 87px;
    height: 128px;
`;

export const StLogoImageBox = styled.div`
    width: 100%;
    height: 20%;
    display: flex;
    align-items: center;
    margin-top: 10%;
`;

export const StTestStartComment = styled.h1`
    font-size: 48px;
    width: 820px;
    height: 136px;
    margin-top: 10px;
    margin-left: 15%;
    padding: 0px 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
`;

export const StTestStartText = styled.p`
    font-size: 22px;
    margin-top: 23px;
    margin-bottom: 143px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
`;

export const StTestStartButton = styled.button`
    padding: 10px;
    font-size: 16px;
    margin-bottom: 20px;
    background-color: #ecebf5;
    color: #b2afcf;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
    width: 17%;
    height: 80%;
    /* box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2); */

    &:hover {
        transition: ease-in-out 0.2s;
        background-color: var(--main-button-color);
        color: #fff;
        /* box-shadow: 0px 4px 8px rgba(79, 5, 122, 0.575); */
    }
`;

export const StTestStartButton2 = styled.button`
    padding: 10px;
    font-size: 16px;
    margin-bottom: 20px;
    background-color: var(--main-button-color);
    color: #fff;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
    width: 17%;
    height: 80%;
    /* box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2); */

    /* &:hover {
        transition: ease-in-out 0.2s;
        background-color: var(--main-button-color);
        color: #fff;
        /* box-shadow: 0px 4px 8px rgba(79, 5, 122, 0.575); */
    /* } */
`;
