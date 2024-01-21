import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import React, { useEffect, useRef } from 'react';

const PeedEditor = () => {
    // Toast-UI Editor DOM
    const editorRef = useRef();

    useEffect(() => {
        // 1. DB에서 가져온 HTML이라고 가정
        const htmlString = '';

        // 2. Editor DOM 내용에 HTML 주입
        editorRef.current?.getInstance().setHTML(htmlString);
    }, []);

    return (
        <>
            {' '}
            <Editor
                placeholder="내용을 입력하세요."
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
            <button>저장하기 </button>
        </>
    );
};

export default PeedEditor;
