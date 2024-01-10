import { collection, query, where, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { db, storage } from '../../firebase/firebase.config';
import Avatar from '../common/avatar';
import profileImage from '../../assets/profile/image.png';
import { UserMbtiAtom, UserNameAtom, loginIdAtom } from '../../recoil/Atom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { UserImageAtom } from '../../recoil/Atom';

const Profile = () => {
    const userProfileSmallImage = useSetRecoilState(UserImageAtom);
    const userNameRecoil = useSetRecoilState(UserNameAtom);
    const userMbtiRecoil = useSetRecoilState(UserMbtiAtom);
    const [user, setUser] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [previewURL, setPreviewURL] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [userName, setUserName] = useState('');
    const [userNickname, setUsernickname] = useState('');
    const [userBirth, setUserBirth] = useState('');
    const [userMbti, setUserMbti] = useState('');
    const [userBlood, setUserBlood] = useState('');
    const [userLocation, setUserLocation] = useState('');
    const [userIntro, setUserIntro] = useState('');
    const userUuId = useRecoilValue(loginIdAtom);
    useEffect(() => {
        if (user) {
            setUserName(user.name);
            setUsernickname(user.nickname);
            setUserBirth(user.birth);
            setUserMbti(user.mbti);
            setUserBlood(user.blood);
            setUserLocation(user.location);
            setUserIntro(user.introduce);
        }
    }, [user]);
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
            setUser({
                id: doc.id,
                ...doc.data()
            });
        });
    };

    // 해당 uid값만 가져온다
    useEffect(() => {
        console.log(userUuId);
        const fetchData = onSnapshot(query(collection(db, 'users'), where('uid', '==', userUuId)), handleSnapshot);
        return fetchData; // cleanup 함수
    }, []);

    // 버튼 클릭시 boolean 값 바꾸기

    const toggleInput = () => {
        setIsEditing((prevState) => !prevState);
    };

    // 프로필 수정 버튼 입력 후 입력한 값이 수정(추가)이 된다.
    const updateUserinfo = async () => {
        const userRef = doc(db, 'users', user.id);
        const storageRef = ref(storage, 'user_images/' + user.id);

        try {
            const imageFile = selectedFile;

            if (imageFile) {
                // 이미지 파일이 선택되었을 때만 업로드
                await uploadBytes(storageRef, imageFile);

                // 업로드된 이미지의 다운로드 URL 가져오기
                const imageUrl = await getDownloadURL(storageRef);

                // 사용자 정보 업데이트
                await updateDoc(userRef, {
                    nickname: userNickname,
                    name: userName,
                    birth: userBirth,
                    mbti: userMbti,
                    blood: userBlood,
                    location: userLocation,
                    introduce: userIntro,
                    imageUrl: imageUrl
                });
                userProfileSmallImage(imageUrl);
                userNameRecoil(userName);
                userMbtiRecoil(userMbti);
            } else {
                await updateDoc(userRef, {
                    nickname: userNickname,
                    name: userName,
                    birth: userBirth,
                    mbti: userMbti,
                    blood: userBlood,
                    location: userLocation,
                    introduce: userIntro
                });
                userNameRecoil(userName);
                userMbtiRecoil(userMbti);
            }
            console.log('update successful');
        } catch (error) {
            console.error('업로드 실패', error);
        }
    };
    return (
        <>
            <StWrapper>
                <StprofileTitle>마이페이지</StprofileTitle>
                <StUserwrapper>
                    <div>
                        <StProfileImage>
                            {isEditing ? (
                                <label htmlFor="inputFile">
                                    <ProfilePointerAvatar
                                        src={previewURL || user.imageUrl}
                                        for="inputFile"
                                        size="large"
                                    />
                                    <Stinput type="file" id="inputFile" accept="image/*" onChange={fileSelectHandler} />
                                </label>
                            ) : (
                                <Avatar src={user.imageUrl || profileImage} size="large" />
                            )}
                        </StProfileImage>
                        {/* <StProfileImageButton
                            onClick={() => {
                                setIsImageEditing(!isImageEditing);
                            }}
                        >
                            프로필 사진 업로드
                        </StProfileImageButton> */}
                    </div>
                    <div>
                        <StUserInfo>
                            {isEditing ? (
                                <>
                                    <StlistWrapper>
                                        <Stlist>
                                            <StminiTitle>이름</StminiTitle>
                                            <StminiContent3>
                                                <input
                                                    placeholder="홍길동"
                                                    value={userName}
                                                    defaultValue={user.name}
                                                    onChange={(e) => {
                                                        setUserName(e.target.value);
                                                    }}
                                                />
                                            </StminiContent3>
                                        </Stlist>
                                        <Stlist>
                                            <StminiTitle>닉네임</StminiTitle>
                                            <StminiContent3>
                                                <input
                                                    placeholder="5자 이내로 작성해주세요"
                                                    value={userNickname}
                                                    onChange={(e) => {
                                                        setUsernickname(e.target.value);
                                                    }}
                                                />
                                            </StminiContent3>
                                        </Stlist>
                                    </StlistWrapper>
                                    <StlistWrapper>
                                        <Stlist>
                                            <StminiTitle>생년월일</StminiTitle>
                                            <StminiContent3>
                                                <input
                                                    value={userBirth}
                                                    onChange={(e) => {
                                                        setUserBirth(e.target.value);
                                                    }}
                                                />
                                            </StminiContent3>
                                        </Stlist>
                                        <Stlist>
                                            <StminiTitle>거주지</StminiTitle>
                                            <StminiContent3>
                                                <input
                                                    placeholder="OOO시 OOO구"
                                                    value={userLocation}
                                                    onChange={(e) => {
                                                        setUserLocation(e.target.value);
                                                    }}
                                                />
                                            </StminiContent3>
                                        </Stlist>
                                    </StlistWrapper>
                                    <StlistWrapper>
                                        <Stlist>
                                            <StminiTitle>MBTI</StminiTitle>
                                            <StminiContent3>
                                                <input
                                                    value={userMbti}
                                                    onChange={(e) => {
                                                        setUserMbti(e.target.value);
                                                    }}
                                                />
                                            </StminiContent3>
                                        </Stlist>
                                        <Stlist>
                                            <StminiTitle>혈액형</StminiTitle>
                                            <StminiContent3>
                                                <input
                                                    value={userBlood}
                                                    onChange={(e) => {
                                                        setUserBlood(e.target.value);
                                                    }}
                                                />
                                            </StminiContent3>
                                        </Stlist>
                                    </StlistWrapper>
                                    <StlistWrapper>
                                        <Stlist>
                                            <StminiTitle>한 줄 소개</StminiTitle>
                                            <StminiContent2>
                                                <input
                                                    value={userIntro}
                                                    onChange={(e) => {
                                                        setUserIntro(e.target.value);
                                                    }}
                                                    autoFocus
                                                />
                                            </StminiContent2>
                                        </Stlist>
                                    </StlistWrapper>
                                </>
                            ) : (
                                <>
                                    <StlistWrapper>
                                        <Stlist>
                                            <StminiTitle>이름</StminiTitle>
                                            <StminiContent>{user.name}</StminiContent>
                                        </Stlist>

                                        <Stlist>
                                            <StminiTitle>닉네임</StminiTitle>
                                            <StminiContent>{user.nickname}</StminiContent>
                                        </Stlist>
                                    </StlistWrapper>
                                    <StlistWrapper>
                                        <Stlist>
                                            <StminiTitle>생년월일</StminiTitle>
                                            <StminiContent>{user.birth}</StminiContent>
                                        </Stlist>
                                        <Stlist>
                                            <StminiTitle>거주지</StminiTitle>
                                            <StminiContent>{user.location}</StminiContent>
                                        </Stlist>
                                    </StlistWrapper>
                                    <StlistWrapper>
                                        <Stlist>
                                            <StminiTitle>MBTI</StminiTitle>
                                            <StminiContent>{user.mbti}</StminiContent>
                                        </Stlist>
                                        <Stlist>
                                            <StminiTitle>혈액형</StminiTitle>
                                            <StminiContent>{user.blood}</StminiContent>
                                        </Stlist>
                                    </StlistWrapper>
                                    <StlistWrapper>
                                        <Stlist>
                                            <StminiTitle>한줄소개</StminiTitle>
                                            <StminiContent2>{user.introduce}</StminiContent2>
                                        </Stlist>
                                    </StlistWrapper>
                                </>
                            )}
                        </StUserInfo>
                        <button onClick={() => toggleInput()}>
                            {isEditing ? (
                                <ButtonWrapper>
                                    <Stbutton2
                                        onClick={() => {
                                            updateUserinfo();
                                        }}
                                    >
                                        프로필 수정 완료
                                    </Stbutton2>
                                    <Stbutton2
                                        onClick={() => {
                                            setIsEditing(true);
                                        }}
                                    >
                                        프로필 수정 취소
                                    </Stbutton2>
                                </ButtonWrapper>
                            ) : (
                                <Stbutton2>프로필수정</Stbutton2>
                            )}
                        </button>
                    </div>
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
    flex-direction: column; // 이거는 다시 한 번 확인해볼 것
    margin: 10px auto; // 이거는 다시 한 번 확인해볼 것
    border: 3px solid var(--light-pink);
    width: 1200px;
    height: 540px;
`;

const StprofileTitle = styled.div`
    color: #121212;
    font-family: Pretendard;
    font-size: 26px;
    font-style: normal;
    font-weight: 300;
    line-height: 120%;
`;

const StProfileImage = styled.div`
    /* background-color: var(--light-beige); */
    border-radius: 10px;
    padding: 10px;
`;
const StUserInfo = styled.div`
    display: flex;
    flex-direction: column;

    input {
        width: 70px;
        margin: -10px 10px -10px 10px;
        background-color: transparent;
    }
`;

const StUserwrapper = styled.div`
    display: flex;
    margin-bottom: 20px;
    margin-top: 20px;
    height: 583px;
    border-radius: 26px;
    background: #fff;
`;

const StProfileImageButton = styled.button`
    display: inline-flex;
    height: 48px;
    padding: 10px 14px;
    justify-content: center;
    align-items: center;
    gap: 4px;
    border-radius: 6px;
    border: 1px solid #756ab6;
    color: #6a6a6a;
    font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: 0.4px;
    margin-left: 80px;
    cursor: pointer;
`;

const Stbutton2 = styled.button`
    display: flex;
    padding: 10px;
    justify-content: center;
    align-items: center;
    gap: 5px;
    border-radius: 6px;
    background-color: var(--light-purple);
    color: white;
    font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: 0.4px;
`;

const ProfilePointerAvatar = styled(Avatar)`
    cursor: pointer;
`;

const Stinput = styled.input`
    display: none;
`;

const StlistWrapper = styled.div`
    display: flex;
    flex-direction: row;
    width: 296px;
    height: 66px;
`;

const Stlist = styled.div`
    display: flex;
    flex-direction: column;
`;

const StminiTitle = styled.div`
    border: 3px solid var(--light-pink);
    width: 296px;
    font-family: Pretendard;
    font-size: 13px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: 0.28px;
    padding-bottom: 5px;
    padding-left: 10px;
`;

const StminiContent = styled.div`
    border: 3px solid black;
    display: flex;
    width: 296px;
    padding: 13px 14px;
    align-items: center;
    gap: 10px;
    border-radius: 6px;
    background: #f8f8f8;
    margin-right: 50px;
    height: 70px;
`;

const StminiContent2 = styled.div`
    display: flex;
    width: 639px;
    padding: 13px 14px;
    align-items: center;
    gap: 10px;
    border-radius: 6px;
    background: #f8f8f8;
    height: 66px;
    input {
        width: 630px;
        border: none;
        padding: 10px;
    }
`;

const StminiContent3 = styled.div`
    display: flex;
    width: 296px;
    padding: 13px 14px;
    align-items: center;
    gap: 10px;
    border-radius: 6px;
    background: #f8f8f8;
    margin-right: 50px;
    height: 70px;
    input {
        width: 280px;
        border: none;
        padding: 10px;
    }
`;

const ButtonWrapper = styled.div`
    gap: 50px;
    display: flex;
`;
