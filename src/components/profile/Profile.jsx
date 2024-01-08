import { collection, query, where, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { db, storage } from '../../firebase/firebase.config';
import Avatar from '../common/avatar';
import profileImage from './image.png';

const Profile = () => {
    const [users, setUsers] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [previewURL, setPreviewURL] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [username, setUsername] = useState('');
    const [usernickname, setUsernickname] = useState('');
    const [userBirth, setUserBirth] = useState('');
    const [userMbti, setUserMbti] = useState('');
    const [userBlood, setUserBlood] = useState('');
    const [userLocation, setUserLocation] = useState('');

    //  이미지 미리보기 및 선택한 파일 업로드를 처리한다

    const fileSelectHandler = (event) => {
        const file = event.target.files[0];

        // 선택한 파일의 미리보기를 생성
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setPreviewURL(e.target.result);
            };
            reader.readAsDataURL(file);
        }

        setSelectedFile(file);
    };

    //  이펙트 내에서의 onSnapshot 콜백 함수
    const handleSnapshot = (querySnapshot) => {
        querySnapshot.forEach((doc) => {
            setUsers({
                id: doc.id,
                ...doc.data()
            });
        });
    };

    // 해당 uid값만 가져온다
    useEffect(() => {
        const fetchData = onSnapshot(
            query(collection(db, 'users'), where('uid', '==', 'H660fLLUtYQdFX6k0h30k3XH2222')),
            handleSnapshot
        );

        return fetchData; // cleanup 함수
    }, []);

    // 버튼 클릭시 boolean 값 바꾸기

    const toggleInput = () => {
        setIsEditing((prevState) => !prevState);
    };

    // 프로필 수정 버튼 입력 후 입력한 값이 수정(추가)이 된다.
    const updateUserinfo = async () => {
        const userRef = doc(db, 'users', 'ccMqQTcWUzMrpB4LlFqR');
        const storageRef = ref(storage, 'user_images/' + 'ccMqQTcWUzMrpB4LlFqR');

        try {
            const imageFile = selectedFile;

            if (imageFile) {
                // 이미지 파일이 선택되었을 때만 업로드
                await uploadBytes(storageRef, imageFile);

                // 업로드된 이미지의 다운로드 URL 가져오기
                const imageUrl = await getDownloadURL(storageRef);

                // 사용자 정보 업데이트
                await updateDoc(userRef, {
                    nickname: usernickname,
                    name: username,
                    birth: userBirth,
                    mbti: userMbti,
                    blood: userBlood,
                    location: userLocation,
                    imageUrl: imageUrl
                });
                console.log('Update successful');
            }
        } catch (error) {
            console.error('업로드 실패', error);
        }
    };
    return (
        <>
            <StWrapper>
                <Stbutton onClick={() => toggleInput()}>
                    {isEditing ? (
                        <button
                            onClick={() => {
                                updateUserinfo();
                            }}
                        >
                            등록하기
                        </button>
                    ) : (
                        <button>프로필수정</button>
                    )}
                </Stbutton>
                <StUserwrapper>
                    <StProfileImage>
                        {isEditing ? (
                            <label>
                                <ProfilePointerAvatar src={previewURL || users.imageUrl} for="inputFile" size="large" />
                                <Stinput type="file" id="inputFile" accept="image/*" onChange={fileSelectHandler} />
                            </label>
                        ) : (
                            <Avatar src={users.imageUrl || profileImage} size="large" />
                        )}
                    </StProfileImage>
                    <StUserInfo>
                        {isEditing ? (
                            <>
                                <div>
                                    이름 :
                                    <input
                                        value={username}
                                        onChange={(e) => {
                                            setUsername(e.target.value);
                                        }}
                                        autoFocus
                                    />
                                </div>
                                <div>
                                    닉네임 :
                                    <input
                                        defaultValue={users.nickname}
                                        value={usernickname}
                                        onChange={(e) => {
                                            setUsernickname(e.target.value);
                                        }}
                                    />
                                </div>
                                <div>
                                    생년월일 :
                                    <input
                                        value={userBirth}
                                        onChange={(e) => {
                                            setUserBirth(e.target.value);
                                        }}
                                    />
                                </div>
                                <div>
                                    MBTI :
                                    <input
                                        value={userMbti}
                                        onChange={(e) => {
                                            setUserMbti(e.target.value);
                                        }}
                                    />
                                </div>
                                <div>
                                    혈액형 :
                                    <input
                                        value={userBlood}
                                        onChange={(e) => {
                                            setUserBlood(e.target.value);
                                        }}
                                    />
                                </div>
                                <div>
                                    거주지 :
                                    <input
                                        value={userLocation}
                                        onChange={(e) => {
                                            setUserLocation(e.target.value);
                                        }}
                                    />
                                </div>
                            </>
                        ) : (
                            <>
                                <div>이름 : {users.name}</div>
                                <div>닉네임 : {users.nickname}</div>
                                <div>생년월일 : {users.birth}</div>
                                <div>MBTI : {users.mbti}</div>
                                <div>혈액형 : {users.blood}</div>
                                <div>거주지 : {users.location}</div>
                            </>
                        )}
                    </StUserInfo>
                </StUserwrapper>
            </StWrapper>
        </>
    );
};

export default Profile;

const StWrapper = styled.div`
    background-color: white;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    width: 700px; // 이거는 다시 한 번 확인해볼 것
    margin: 10px auto; // 이거는 다시 한 번 확인해볼 것
    border: 3px solid var(--light-pink);
`;

const StProfileImage = styled.div`
    /* background-color: var(--light-beige); */
    border-radius: 10px;
    padding: 10px;
    border: 5px solid var(--light-beige);
`;
const StUserInfo = styled.div`
    background-color: var(--light-gray);
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    div {
        margin: 10px;
    }
    input {
        width: 70px;
        margin: -10px 10px -10px 10px;
        background-color: transparent;
    }
`;

const StUserwrapper = styled.div`
    display: flex;
    justify-content: space-around;
    margin-bottom: 20px;
`;

const Stbutton = styled.div`
    margin: 10px 5px 10px 0px;
    width: 100px;
    margin-left: 75%;
    margin-bottom: 20px;
`;

const ProfilePointerAvatar = styled(Avatar)`
    cursor: pointer;
`;

const Stinput = styled.input`
    display: none;
`;
