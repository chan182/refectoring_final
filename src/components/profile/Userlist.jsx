import React from 'react';
import styled from 'styled-components';

const Userlist = () => {
    return (
        <StmainWrapper>
            <StTitle>활동내역</StTitle>
            <Stbolder>
                <StFilterLIst>
                    <div>내가쓴글</div>
                    <div>북마크</div>
                </StFilterLIst>
                <Stcontents>
                    <div>
                        <div>내가 작성한 글 제목</div>
                        <div>
                            <svg
                                width="18"
                                height="18"
                                viewBox="0 0 18 18"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <g id="heart">
                                    <path
                                        id="Vector"
                                        d="M15.6301 3.45753C15.247 3.07428 14.7922 2.77026 14.2916 2.56284C13.791 2.35542 13.2545 2.24866 12.7126 2.24866C12.1707 2.24866 11.6342 2.35542 11.1336 2.56284C10.633 2.77026 10.1782 3.07428 9.79509 3.45753L9.00009 4.25253L8.20509 3.45753C7.43132 2.68376 6.38186 2.24906 5.28759 2.24906C4.19331 2.24906 3.14386 2.68376 2.37009 3.45753C1.59632 4.2313 1.16162 5.28075 1.16162 6.37503C1.16162 7.4693 1.59632 8.51876 2.37009 9.29253L3.16509 10.0875L9.00009 15.9225L14.8351 10.0875L15.6301 9.29253C16.0133 8.90946 16.3174 8.45464 16.5248 7.95404C16.7322 7.45345 16.839 6.91689 16.839 6.37503C16.839 5.83316 16.7322 5.2966 16.5248 4.79601C16.3174 4.29542 16.0133 3.84059 15.6301 3.45753Z"
                                        fill="#4E4E4E"
                                        stroke="#4E4E4E"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </g>
                            </svg>
                            <div>999m</div>
                            <svg
                                width="18"
                                height="19"
                                viewBox="0 0 18 19"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <g id="message-square">
                                    <path
                                        id="Vector"
                                        d="M15.75 11.75C15.75 12.1478 15.592 12.5294 15.3107 12.8107C15.0294 13.092 14.6478 13.25 14.25 13.25H5.25L2.25 16.25V4.25C2.25 3.85218 2.40804 3.47064 2.68934 3.18934C2.97064 2.90804 3.35218 2.75 3.75 2.75H14.25C14.6478 2.75 15.0294 2.90804 15.3107 3.18934C15.592 3.47064 15.75 3.85218 15.75 4.25V11.75Z"
                                        stroke="#4E4E4E"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </g>
                            </svg>
                            <div>999K</div>
                            <svg
                                width="18"
                                height="18"
                                viewBox="0 0 18 18"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <g id="eye" clipPath="url(#clip0_221_419)">
                                    <path
                                        id="Vector"
                                        d="M0.75 9C0.75 9 3.75 3 9 3C14.25 3 17.25 9 17.25 9C17.25 9 14.25 15 9 15C3.75 15 0.75 9 0.75 9Z"
                                        stroke="#4E4E4E"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        id="Vector_2"
                                        d="M9 11.25C10.2426 11.25 11.25 10.2426 11.25 9C11.25 7.75736 10.2426 6.75 9 6.75C7.75736 6.75 6.75 7.75736 6.75 9C6.75 10.2426 7.75736 11.25 9 11.25Z"
                                        stroke="#4E4E4E"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </g>
                                <defs>
                                    <clipPath id="clip0_221_419">
                                        <rect width="18" height="18" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>
                            <div>999m</div>
                        </div>
                    </div>
                    <div>
                        <div>내가 작성한 글 제목</div>
                        <div>
                            <svg
                                width="18"
                                height="18"
                                viewBox="0 0 18 18"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <g id="heart">
                                    <path
                                        id="Vector"
                                        d="M15.6301 3.45753C15.247 3.07428 14.7922 2.77026 14.2916 2.56284C13.791 2.35542 13.2545 2.24866 12.7126 2.24866C12.1707 2.24866 11.6342 2.35542 11.1336 2.56284C10.633 2.77026 10.1782 3.07428 9.79509 3.45753L9.00009 4.25253L8.20509 3.45753C7.43132 2.68376 6.38186 2.24906 5.28759 2.24906C4.19331 2.24906 3.14386 2.68376 2.37009 3.45753C1.59632 4.2313 1.16162 5.28075 1.16162 6.37503C1.16162 7.4693 1.59632 8.51876 2.37009 9.29253L3.16509 10.0875L9.00009 15.9225L14.8351 10.0875L15.6301 9.29253C16.0133 8.90946 16.3174 8.45464 16.5248 7.95404C16.7322 7.45345 16.839 6.91689 16.839 6.37503C16.839 5.83316 16.7322 5.2966 16.5248 4.79601C16.3174 4.29542 16.0133 3.84059 15.6301 3.45753Z"
                                        fill="#4E4E4E"
                                        stroke="#4E4E4E"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </g>
                            </svg>
                            <div>999m</div>
                            <svg
                                width="18"
                                height="19"
                                viewBox="0 0 18 19"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <g id="message-square">
                                    <path
                                        id="Vector"
                                        d="M15.75 11.75C15.75 12.1478 15.592 12.5294 15.3107 12.8107C15.0294 13.092 14.6478 13.25 14.25 13.25H5.25L2.25 16.25V4.25C2.25 3.85218 2.40804 3.47064 2.68934 3.18934C2.97064 2.90804 3.35218 2.75 3.75 2.75H14.25C14.6478 2.75 15.0294 2.90804 15.3107 3.18934C15.592 3.47064 15.75 3.85218 15.75 4.25V11.75Z"
                                        stroke="#4E4E4E"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </g>
                            </svg>
                            <div>999K</div>
                            <svg
                                width="18"
                                height="18"
                                viewBox="0 0 18 18"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <g id="eye" clipPath="url(#clip0_221_419)">
                                    <path
                                        id="Vector"
                                        d="M0.75 9C0.75 9 3.75 3 9 3C14.25 3 17.25 9 17.25 9C17.25 9 14.25 15 9 15C3.75 15 0.75 9 0.75 9Z"
                                        stroke="#4E4E4E"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        id="Vector_2"
                                        d="M9 11.25C10.2426 11.25 11.25 10.2426 11.25 9C11.25 7.75736 10.2426 6.75 9 6.75C7.75736 6.75 6.75 7.75736 6.75 9C6.75 10.2426 7.75736 11.25 9 11.25Z"
                                        stroke="#4E4E4E"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </g>
                                <defs>
                                    <clipPath id="clip0_221_419">
                                        <rect width="18" height="18" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>
                            <div>999m</div>
                        </div>
                    </div>
                    <div>
                        <div>내가 작성한 글 제목</div>
                        <div>
                            <svg
                                width="18"
                                height="18"
                                viewBox="0 0 18 18"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <g id="heart">
                                    <path
                                        id="Vector"
                                        d="M15.6301 3.45753C15.247 3.07428 14.7922 2.77026 14.2916 2.56284C13.791 2.35542 13.2545 2.24866 12.7126 2.24866C12.1707 2.24866 11.6342 2.35542 11.1336 2.56284C10.633 2.77026 10.1782 3.07428 9.79509 3.45753L9.00009 4.25253L8.20509 3.45753C7.43132 2.68376 6.38186 2.24906 5.28759 2.24906C4.19331 2.24906 3.14386 2.68376 2.37009 3.45753C1.59632 4.2313 1.16162 5.28075 1.16162 6.37503C1.16162 7.4693 1.59632 8.51876 2.37009 9.29253L3.16509 10.0875L9.00009 15.9225L14.8351 10.0875L15.6301 9.29253C16.0133 8.90946 16.3174 8.45464 16.5248 7.95404C16.7322 7.45345 16.839 6.91689 16.839 6.37503C16.839 5.83316 16.7322 5.2966 16.5248 4.79601C16.3174 4.29542 16.0133 3.84059 15.6301 3.45753Z"
                                        fill="#4E4E4E"
                                        stroke="#4E4E4E"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </g>
                            </svg>
                            <div>999m</div>
                            <svg
                                width="18"
                                height="19"
                                viewBox="0 0 18 19"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <g id="message-square">
                                    <path
                                        id="Vector"
                                        d="M15.75 11.75C15.75 12.1478 15.592 12.5294 15.3107 12.8107C15.0294 13.092 14.6478 13.25 14.25 13.25H5.25L2.25 16.25V4.25C2.25 3.85218 2.40804 3.47064 2.68934 3.18934C2.97064 2.90804 3.35218 2.75 3.75 2.75H14.25C14.6478 2.75 15.0294 2.90804 15.3107 3.18934C15.592 3.47064 15.75 3.85218 15.75 4.25V11.75Z"
                                        stroke="#4E4E4E"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </g>
                            </svg>
                            <div>999K</div>
                            <svg
                                width="18"
                                height="18"
                                viewBox="0 0 18 18"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <g id="eye" clipPath="url(#clip0_221_419)">
                                    <path
                                        id="Vector"
                                        d="M0.75 9C0.75 9 3.75 3 9 3C14.25 3 17.25 9 17.25 9C17.25 9 14.25 15 9 15C3.75 15 0.75 9 0.75 9Z"
                                        stroke="#4E4E4E"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        id="Vector_2"
                                        d="M9 11.25C10.2426 11.25 11.25 10.2426 11.25 9C11.25 7.75736 10.2426 6.75 9 6.75C7.75736 6.75 6.75 7.75736 6.75 9C6.75 10.2426 7.75736 11.25 9 11.25Z"
                                        stroke="#4E4E4E"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </g>
                                <defs>
                                    <clipPath id="clip0_221_419">
                                        <rect width="18" height="18" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>
                            <div>999m</div>
                        </div>
                    </div>
                </Stcontents>
            </Stbolder>
        </StmainWrapper>
    );
};

export default Userlist;

const StmainWrapper = styled.div`
    width: 1200px;
    height: 625px;
    margin: 10px auto;
    flex-shrink: 0;
    border-radius: 26px;
    border: 1px solid #f6f6f6;
    background: #fff;
`;

const Stbolder = styled.div`
    border: 3px solid var(--light-beige);
    padding: 10px;
    border-radius: 10px;
`;

const StFilterLIst = styled.div`
    background-color: var(--light-gray);
    display: flex;
    flex-direction: row;
    margin-bottom: 20px;
    div {
        display: flex;
        padding: 12px 14px;
        justify-content: center;
        align-items: center;
        gap: 7px;
        border-radius: 74px;
        background: #756ab6;
        box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
        color: #fff;
        font-family: Pretendard;
        font-size: 22px;
        font-style: normal;
        font-weight: 300;
        line-height: normal;
        letter-spacing: 0.44px;
    }
`;

const StTitle = styled.div`
    color: #121212;

    font-family: Pretendard;
    font-size: 26px;
    font-style: normal;
    font-weight: 300;
    line-height: 120%; /* 31.2px */
    margin-bottom: 10px;
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
