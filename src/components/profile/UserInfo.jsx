import { doc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import modal_logo from '../../assets/home/mbti_community.png';
import profileImage from '../../assets/profile/profileImg.png';
import { db, storage } from '../../firebase/firebase.config';
import { isEditingAtom, userAtom } from '../../recoil/Atom';
// import Avatar from '../common/avatar';

const UserInfo = () => {
    const [user, setUser] = useRecoilState(userAtom);
    const [isEditing, setIsEditing] = useRecoilState(isEditingAtom);
    const [previewURL, setPreviewURL] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [name, setName] = useState('');
    const [nickname, setNickname] = useState('');
    const [birth, setBirth] = useState('');
    const [mbti, setMbti] = useState('');
    const [blood, setBlood] = useState('');
    const [location, setLocation] = useState('');
    const [introduce, setIntroduce] = useState('');

    useEffect(() => {
        if (user) {
            setName(user.name);
            setNickname(user.nickname);
            setBirth(user.birth);
            setMbti(user.mbti);
            setBlood(user.blood);
            setLocation(user.location);
            setIntroduce(user.introduce);
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

    // 프로필 수정 버튼 입력 후 입력한 값이 수정(추가)이 된다.
    const updateUserinfo = async () => {
        const userRef = doc(db, 'users', user.uid);
        const storageRef = ref(storage, 'user_images/' + user.uid);
        try {
            const imageFile = selectedFile;
            const data = {
                nickname,
                name,
                birth,
                mbti,
                blood,
                location,
                introduce
            };
            const isEmptyField = Object.values(data).some((value) => value === '');

            if (isEmptyField) {
                Swal.fire({
                    text: '모든 공간을 채워주세요 모임 활동에 많은 도움이 됩니다 ^^',
                    imageUrl: modal_logo
                });
                return;
            }
            if (imageFile) {
                // 이미지 파일이 선택되었을 때만 업로드
                await uploadBytes(storageRef, imageFile);
                // 업로드된 이미지의 다운로드 URL 가져오기
                const imageUrl = await getDownloadURL(storageRef);
                data['imageUrl'] = imageUrl;
            } else {
            }
            await updateDoc(userRef, data);
            setUser((prevUser) => ({ ...prevUser, ...data }));
            setIsEditing(false);
            alert('프로필 업로드 성공');
        } catch (error) {
            console.error('업로드 실패', error);
        }
    };

    return (
        <>
            {/* <div className="text-black">마이페이지</div> */}
            <StCardWrapper>
                <>
                    <div className="flex">
                        {isEditing === true ? (
                            <StLabel htmlFor="inputFile">
                                <img
                                    width={300}
                                    className="rounded-full w-[200px] h- "
                                    alt="profile"
                                    src={previewURL || (user && user.imageUrl) || profileImage}
                                    for="inputFile"
                                    size="large"
                                />
                                <input type="file" id="inputFile" accept="image/*" onChange={fileSelectHandler} />
                            </StLabel>
                        ) : (
                            <img
                                width={300}
                                className="rounded-full w-[250px]"
                                alt="profile"
                                src={(user && user.imageUrl) || profileImage}
                            />
                        )}
                    </div>
                </>
                <StContentWrapper>
                    <div>
                        {isEditing === false ? (
                            <>
                                <StlistWrapper>
                                    <Stlist>
                                        <StminiTitle>이름</StminiTitle>
                                        <StminiContent>{user?.name || ''}</StminiContent>
                                    </Stlist>
                                    <Stlist>
                                        <StminiTitle>닉네임</StminiTitle>
                                        <StminiContent>{user?.nickname || ''}</StminiContent>
                                    </Stlist>
                                </StlistWrapper>
                                <StlistWrapper>
                                    <Stlist>
                                        <StminiTitle>생년월일</StminiTitle>
                                        <StminiContent>{user?.birth || ''}</StminiContent>
                                    </Stlist>
                                    <Stlist>
                                        <StminiTitle>거주지</StminiTitle>
                                        <StminiContent>{user?.location || ''}</StminiContent>
                                    </Stlist>
                                </StlistWrapper>
                                <StlistWrapper>
                                    <Stlist>
                                        <StminiTitle>MBTI</StminiTitle>
                                        <StminiContent>{user?.mbti || ''}</StminiContent>
                                    </Stlist>
                                    <Stlist>
                                        <StminiTitle>혈액형</StminiTitle>
                                        <StminiContent>{user?.blood || ''}</StminiContent>
                                    </Stlist>
                                </StlistWrapper>
                            </>
                        ) : (
                            <>
                                <StlistWrapper>
                                    <Stlist>
                                        <StminiTitle>이름</StminiTitle>
                                        <StminiContent>
                                            <input
                                                placeholder="홍길동"
                                                value={name}
                                                onChange={(e) => {
                                                    setName(e.target.value);
                                                }}
                                            />
                                        </StminiContent>
                                    </Stlist>
                                    <Stlist>
                                        <StminiTitle>닉네임</StminiTitle>
                                        <StminiContent>
                                            <input
                                                placeholder="20자 이내(띄어쓰기 포함)로 작성해주세요."
                                                value={nickname}
                                                onChange={(e) => {
                                                    setNickname(e.target.value);
                                                }}
                                            />
                                        </StminiContent>
                                    </Stlist>
                                </StlistWrapper>
                                <StlistWrapper>
                                    <Stlist>
                                        <StminiTitle>생년월일</StminiTitle>
                                        <StminiContent>
                                            <input
                                                placeholder="0000.00.00"
                                                value={birth}
                                                onChange={(e) => {
                                                    setBirth(e.target.value);
                                                }}
                                            />
                                        </StminiContent>
                                    </Stlist>
                                    <Stlist>
                                        <StminiTitle>거주지</StminiTitle>
                                        <StminiContent>
                                            <input
                                                placeholder="OO시 OO구"
                                                value={location}
                                                onChange={(e) => {
                                                    setLocation(e.target.value);
                                                }}
                                            />
                                        </StminiContent>
                                    </Stlist>
                                </StlistWrapper>
                                <StlistWrapper>
                                    <Stlist>
                                        <StminiTitle>MBTI</StminiTitle>
                                        <StminiContent>
                                            <input
                                                placeholder="자신의 MBTI를 입력하세요."
                                                value={mbti}
                                                onChange={(e) => {
                                                    setMbti(e.target.value);
                                                }}
                                            />
                                        </StminiContent>
                                    </Stlist>
                                    <Stlist>
                                        <StminiTitle>혈액형</StminiTitle>
                                        <StminiContent>
                                            <input
                                                placeholder="자신의 혈액형을 입력하세요."
                                                value={blood}
                                                onChange={(e) => {
                                                    setBlood(e.target.value);
                                                }}
                                            />
                                        </StminiContent>
                                    </Stlist>
                                </StlistWrapper>
                                <StlistWrapper></StlistWrapper>
                            </>
                        )}
                    </div>
                    {isEditing ? (
                        // isEditing이 true일 때 나온다.
                        <ButtonWrapper>
                            <StEditBtn onClick={updateUserinfo}>프로필 수정 완료</StEditBtn>
                            <StCancelBtn
                                onClick={() => {
                                    setIsEditing(false);
                                }}
                            >
                                프로필 수정 취소
                            </StCancelBtn>
                        </ButtonWrapper>
                    ) : (
                        // isEditing이 false일 때 나온다.
                        <StEditBtn
                            onClick={() => {
                                setIsEditing(true);
                            }}
                        >
                            프로필 수정
                        </StEditBtn>
                    )}
                </StContentWrapper>
            </StCardWrapper>
        </>
    );
};
export default UserInfo;
// const StWrapper = styled.div`
//     background-color: white;
//     border: 1px solid var(--content-border-color);
//     border-radius: 10px;
//     display: flex;
//     margin: 10px auto;
//     width: 60%;
//     height: 400px;
// `;
// const StProfileTitle = styled.div`
//     font-size: 24px;
//     color: var(--bold-gray);
//     width: 60%;
//     padding: 0px 0px 0px 10px;
// `;

const StLabel = styled.label`
    display: flex;
    flex-direction: column;
`;

const StCardWrapper = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
`;
const StProfileImage = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-left: 50px;
    margin-right: 50px;
    width: 40%;
    & button {
        width: 180px;
        height: 40px;
        font-size: 18px;
        color: var(--bold-gray);
        border: 1px solid var(--button-border-color);
        border-radius: 5px;
        margin-top: 23px;
        &:hover {
            background-color: var(--main-button-color);
            color: white;
        }
    }
`;
const StContentWrapper = styled.div`
    width: 50%;
    padding-left: 3rem;
`;

// const StClearImageButton = styled.button`
//     width: 180px;
//     height: 40px;
//     font-size: 18px;
//     color: white;
//     border: none;
//     border-radius: 5px;
//     cursor: pointer;
// `;

const StUserInfo = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 90%;
    input {
        width: 70px;
        margin: -10px 10px -10px 10px;
        background-color: transparent;
    }
`;
const StUserwrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    padding: 20px;
    border-radius: 10px;
    background: white;
`;
const StProfileImageButton = styled.button`
    display: inline-flex;
    height: 48px;
    padding: 10px 14px;
    justify-content: center;
    align-items: center;
    border-radius: 6px;
    border: 1px solid var(--border-color);
    color: var(--bold-gray);
    font-size: 18px;
    letter-spacing: 0.4px;
    margin-left: 80px;
    cursor: pointer;
`;
const StBtnDiv = styled.div`
    position: absolute;
    bottom: 10;
    left: 0;
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
    border-radius: 5px;
    font-size: 18px;
    background-color: var(--light-gray);
    color: var(--bold-gray);
    &:hover {
        background-color: var(--main-button-color);
        color: white;
    }
`;
// const ProfilePointerAvatar = styled(Avatar)`
//     cursor: pointer;
// `;
const Stinput = styled.input`
    display: none;
`;
const StlistWrapper = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 66px;
`;
const Stlist = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;
const StminiTitle = styled.div`
    width: 50%;
    font-size: 14px;
    letter-spacing: 1px;
    padding-bottom: 5px;
    padding-left: 10px;
`;
const StminiContent = styled.div`
    width: 90%;
    border-radius: 5px;
    background: var(--light-gray);
    margin: 0px 50px 10px 0px;
    height: 70px;
    padding: 10px;
    display: flex;
    align-items: center;
    input {
        width: 100%;
        border: none;
        padding: 10px;
        &:focus {
            border: 1px solid #abaad8;
            border-radius: 5px;
            width: 100%;
            outline: none;
        }
    }
`;
const StminiContent2 = styled.div`
    width: 95%;
    border-radius: 5px;
    background: var(--light-gray);
    margin: 0px 50px 10px 0px;
    height: 70px;
    padding: 10px;
    display: flex;
    align-items: center;
    input {
        width: 100%;
        border: none;
        padding: 10px;
        &:focus {
            border: 1px solid #abaad8;
            border-radius: 5px;
            width: 100%;
            outline: none;
        }
    }
`;
const StInputBox = styled.div`
    position: relative;
    width: 100%;
    height: 85%;
    padding: 0;
    margin: 0;
`;
const ButtonWrapper = styled.div`
    gap: 10px;
    display: flex;
`;
const StHr = styled.hr`
    color: var(--light-gray);
    margin: 80px;
    width: 50%;
`;
