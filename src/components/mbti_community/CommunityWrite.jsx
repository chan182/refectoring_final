import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';

import dayjs from 'dayjs';
import { useRecoilValue } from 'recoil';
import { useMutation, useQueryClient } from 'react-query';
import { userAtom } from '../../recoil/Atom';
import { addCommunity } from '../../api/board';

import { v4 as uuidv4 } from 'uuid';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { storage } from '../../firebase/firebase.config';

export default function UpdateTest() {
    const [imageFile, setImageFile] = useState();
    const user = useRecoilValue(userAtom);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const queryClient = useQueryClient();
    const nav = useNavigate();

    // 게시글 추가하기
    const mutationAdd = useMutation((newCommunity) => addCommunity(newCommunity), {
        onSuccess: (data) => {
            queryClient.invalidateQueries('communties');
            console.log('성공 !!');
        }
    });
    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        console.log(file);
        const fileReader = new FileReader();
        fileReader?.readAsDataURL(file);
        fileReader.onloadend = (e) => {
            const { result } = e?.currentTarget;
            setImageFile(result);
        };
    };
    const handleDeleteImage = () => {
        setImageFile(null);
    };

    const handleAddCommunity = async () => {
        const key = `${user?.uid}/${uuidv4()}`;
        const storageRef = ref(storage, key);

        let userimageUrl = '';
        try {
            if (imageFile) {
                const data = await uploadString(storageRef, imageFile, 'data_url');
                userimageUrl = await getDownloadURL(data?.ref);
            }
            const now = dayjs();

            const newCommunity = {
                title,
                content,
                createdAt: now.format('YY-MM-DD HH:mm:ss'),
                nickname: user.nickname,
                id: user.uid,
                likes: '',
                likecount: '',
                ImageUrl: user.imageUrl,
                mbti: user.mbti,
                communityImage: userimageUrl
            };

            mutationAdd.mutate(newCommunity);
            alert('성공했습니다.');
            nav('/mbti/community');
        } catch {
            console.log('실패하였습니다.');
        }
    };

    return (
        <StBox>
            <StDiv>
                <StH1>게시글 작성하기!</StH1>
                <StPeed>
                    <StTitleInput
                        value={title}
                        onChange={(e) => {
                            setTitle(e.target.value);
                        }}
                        placeholder="제목을 입력해주세요."
                    ></StTitleInput>
                    <StcontentInput
                        value={content}
                        onChange={(e) => {
                            setContent(e.target.value);
                        }}
                    ></StcontentInput>
                    <label htmlFor="inputFile">
                        {!imageFile && (
                            <StImageInput type="file" id="inputFile" accept="image/*" onChange={handleFileUpload} />
                        )}
                        <img src="backImage" alt="" />
                        {imageFile && (
                            <div>
                                <StImage src={imageFile} />
                                <button onClick={handleDeleteImage}>clear</button>
                            </div>
                        )}
                    </label>
                </StPeed>
                <StBtns>
                    <StEditBtn onClick={handleAddCommunity}>저장하기</StEditBtn>
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

const StTitleInput = styled.input`
    width: 100%;
    height: 47px;
    border: none;
    border-radius: 10px;
    margin-bottom: 12px;
    padding: 10px 0px 10px 27px;
    background-color: var(--light-gray);
`;

const StcontentInput = styled.textarea`
    padding: 10px;
    height: 500px;
    border: none;
    height: px;
    border-radius: 16px;
    background: #f8f8f8;
`;

const StImage = styled.img`
    width: 100px;
    height: 100px;
    margin: 50px;
`;

const StImageInput = styled.input`
    margin: 50px;
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
