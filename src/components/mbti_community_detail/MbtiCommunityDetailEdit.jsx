import { useMutation, useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import { v4 as uuidv4 } from 'uuid';
import { communityDetailGetDate, updateBoard } from '../../api/boardDetail';
import backImage from '../../assets/community/backOImage.png';
import modal_logo from '../../assets/home/mbti_community.png';
import { storage } from '../../firebase/firebase.config';
import { userAtom } from '../../recoil/Atom';

const MbtiCommunityDetailEdit = () => {
    const params = useParams();
    const [imageFile, setImageFile] = useState();
    const user = useRecoilValue(userAtom);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const navigate = useNavigate();

    //수정하기
    const mutation = useMutation({
        mutationFn: (updateCommunity) => updateBoard(params.id, updateCommunity)
    });

    // 가져오기
    const { data } = useQuery({
        queryKey: ['community'],
        queryFn: () => communityDetailGetDate(params.id)
    });

    useEffect(() => {
        if (user) {
            setTitle(data?.title);
            setContent(data?.content);
            setImageFile(data?.communityImage);
        }
    }, []);

    const handleFileUpload = (event) => {
        const file = event.target.files[0] || data.communityImage;
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

    const handleUpdateCommuntiy = async () => {
        console.log(1111);
        if (!title || !content) {
            Swal.fire({
                text: '모든 공간을 채워주세요 ^^ 활동에 많은 도움이 됩니다.',
                imageUrl: modal_logo
            });
            return;
        }

        const key = `${user?.uid}/${uuidv4()}`;
        const storageRef = ref(storage, key);
        let newImageUrl = '';

        try {
            const data = await uploadString(storageRef, imageFile, 'data_url');
            newImageUrl = await getDownloadURL(data?.ref);
            console.log(data);
            const now = dayjs();
            const updateCommunity = {
                title,
                content,
                createdAt: now.format('YY-MM-DD HH:mm:ss'),
                communityImage: newImageUrl || data.communityImage
            };

            mutation.mutate(updateCommunity);
            Swal.fire({
                text: '',
                imageUrl: modal_logo
            });
            navigate('/mbti/community');
        } catch (error) {
            console.log('실패하였습니다.', error);
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
                    <StEditBtn onClick={handleUpdateCommuntiy}>수정하기</StEditBtn>
                    <StCancelBtn onClick={() => navigate('/mbti/community')}>글 작성 취소하기</StCancelBtn>
                </StBtns>
            </StDiv>
        </StBox>
    );
};

export default MbtiCommunityDetailEdit;

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
    height: 400px;
    border: none;
    height: px;
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
