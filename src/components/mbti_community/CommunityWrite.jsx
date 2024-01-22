import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import PeedEditor from './PeedEditor';

export default function UpdateTest() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const nav = useNavigate();

    return (
        <StBox>
            <StDiv>
                <StH1>게시글 작성하기!</StH1>
                <StPeed>
                    <StInput
                        value={title}
                        onChange={(e) => {
                            setTitle(e.target.value);
                        }}
                        placeholder="제목을 입력해주세요."
                    ></StInput>
                    <PeedEditor />
                </StPeed>
                <StBtns>
                    <StEditBtn>저장하기</StEditBtn>
                    <StCancelBtn onClick={() => nav('/mbti/community')}>글 작성 취소하기</StCancelBtn>
                </StBtns>
            </StDiv>
        </StBox>
    );
}

const StBox = styled.div`
    width: 100%;
    height: 75vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--background-color);
`;

const StDiv = styled.div`
    width: 60%;
    height: 90%;
    display: flex;
    position: relative;
    flex-direction: column;
`;

const StPeed = styled.div`
    width: 98%;
    height: 85%;
    display: flex;
    flex-direction: column;
    padding: 20px;
    margin-left: 1%;
    border-radius: 10px;
    background-color: white;
    border: 1px solid var(--content-border-color);
`;

const StH1 = styled.h1`
    font-size: 26px;
    padding: 10px 0px 10px 20px;
`;

const StInput = styled.input`
    width: 100%;
    height: 47px;
    border: none;
    border-radius: 10px;
    margin-bottom: 12px;
    padding: 10px 0px 10px 27px;
    background-color: var(--light-gray);
`;

const StBtns = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 99%;
    height: 100px;
    margin-top: 10px;
`;

const StEditBtn = styled.button`
    width: 180px;
    height: 40px;
    border-radius: 5px;
    font-size: 18px;
    background-color: var(--main-button-color);
    color: white;
`;
const StCancelBtn = styled.button`
    width: 180px;
    height: 40px;
    margin-left: 10px;
    border-radius: 5px;
    font-size: 18px;
    background-color: var(--light-gray);
    color: var(--bold-gray);

    &:hover {
        background-color: var(--main-button-color);
        color: white;
    }
`;
