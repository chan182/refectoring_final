import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';

import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

export default function UpdateTest() {
    // Toast-UI Editor DOM
    const editorRef = useRef();

    // 공지사항과 같은 고정적인 내용을 표시
    useEffect(() => {
        // 1. DB에서 가져온 HTML이라고 가정
        const htmlString = '<h1>h1 태그로 작성한 제목입니다.</h1> <p> p 태그로 작성한 내용입니다.</p>';

        // 2. Editor DOM 내용에 HTML 주입
        editorRef.current?.getInstance().setHTML(htmlString);
    }, []);

    return (
        // <StBox>
        //     <StDiv>
        <>
            <h1>게시글 작성하기</h1>
            <Editor
                ref={editorRef} // useRef로 DOM 연결
                previewStyle="vertical"
                height="500px"
                initialEditType="wysiwyg"
                toolbarItems={[
                    ['heading', 'bold', 'italic', 'strike'],
                    ['hr', 'quote'],
                    ['ul', 'ol', 'task', 'indent', 'outdent'],
                    ['table', 'image', 'link'],
                    ['code', 'codeblock']
                ]}
            ></Editor>
            <button>저장하기</button>
            <button>글 작성 취소하기</button>
        </>
        //     </StDiv>
        // </StBox>
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
    height: 80%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: aliceblue;
`;
