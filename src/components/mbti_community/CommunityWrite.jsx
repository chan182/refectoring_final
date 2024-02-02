import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import dayjs from 'dayjs';
import { useRecoilValue } from 'recoil';
import { useMutation, useQueryClient } from 'react-query';
import { userAtom } from '../../recoil/Atom';
import { addCommunity } from '../../api/board';
import modal_logo from '../../assets/home/mbti_community.png';
import { v4 as uuidv4 } from 'uuid';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { storage } from '../../firebase/firebase.config';
import Swal from 'sweetalert2';
import backImage from '../../assets/community/backOImage.png';
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
            // console.log('성공 !!');
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

    // 글쓰기

    const handleAddCommunity = async () => {
        if (!title || !content || !imageFile) {
            Swal.fire({
                text: '모든 공간을 채워주세요 ^^ 활동에 많은 도움이 됩니다.',
                imageUrl: modal_logo
            });
            return;
        }
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
            Swal.fire({
                text: '업로드에 성공',
                imageUrl: modal_logo
            });
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
                        placeholder="내용을 입력해주세요."
                        onChange={(e) => {
                            setContent(e.target.value);
                        }}
                    ></StcontentInput>
                    {imageFile ? (
                        <div>
                            <StBackImage>
                                <StImage src={imageFile} alt="Selected Image" />
                                <button onClick={handleDeleteImage}>clear</button>
                            </StBackImage>
                        </div>
                    ) : (
                        <StBackImage>
                            <StImage src={backImage} alt="Empty Image" />
                            <StImageInput type="file" accept="image/*" onChange={handleFileUpload} />
                        </StBackImage>
                    )}
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
    padding: 20px;
    height: 300px;
    border: none;
    border-radius: 16px;
    background: #f8f8f8;
`;

const StBackImage = styled.label`
    position: relative;
    display: inline-block;
    margin-top: 28px;
    width: 160px;
    height: 160px;
    border-radius: 6px;
    overflow: hidden;
    cursor: pointer;
`;

const StImage = styled.img`
    width: 160px;
    height: 160px;
`;

const StImageInput = styled.input`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
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
