import styled from 'styled-components';

export const StScreenBox = styled.div`
    /* height: 80vh;
    background-color: #f5f5f5; */
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
    height: 640px;
    margin: 0 auto;
    padding: 20px;
    background-color: #fff;
    border-radius: 0.5rem;
    /* box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2); */
`;

export const StQuestionContainer = styled.div`
    margin-bottom: 20px;
    text-align: center;
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
    font-size: 18px;
    width: 50%;
    margin-left: 26%;
    white-space: pre-line;
    line-height: 1.5;
    max-height: calc(18px * 11);
    overflow: auto;
    text-align: left;
`;

export const StResultText = styled.h1`
    font-size: 35px;
    font-weight: 800;
    margin-top: 30px;
    width: 100%;
    color: #756ab6;
`;

export const StOptionsContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 21px;
    height: 180px;
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
    height: 86px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);

    &:hover {
        transition: ease-in-out 0.2s;
        background-color: #abaad8;
        color: #ffffff;
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
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);

    &:hover {
        transition: ease-in-out 0.2s;
        background-color: #756ab6;
        color: #fff;
        box-shadow: 0px 4px 8px rgba(79, 5, 122, 0.575);
    }
`;
export const StTypeDescription = styled.p`
    font-size: 16px;
    padding: 0px 295px 50px;
    color: #333;
    background-color: #fff;
    height: 125px;
    display: flex;
    justify-content: center;
    align-items: center;
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
    height: 48px;
    margin-top: 50px;
`;

export const StLogoImageBox = styled.div`
    width: 1150px;
    display: flex;
    justify-content: center;
`;

export const StTestStartComment = styled.h1`
    font-size: 54px;
    width: 914px;
    height: 136px;
    margin-top: 82px;
    margin-left: 130px;
    padding: 0px 25px;
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
    background-color: #f8f8f8;
    color: #000000;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
    width: 20%;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);

    &:hover {
        transition: ease-in-out 0.2s;
        background-color: #756ab6;
        color: #fff;
        box-shadow: 0px 4px 8px rgba(79, 5, 122, 0.575);
    }
`;
