import { collection, getDocs, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { db } from '../../firebase/firebase.config';

const Profile = () => {
    const [users, setUsers] = useState();
    useEffect(() => {
        const fetchData = async () => {
            const q = query(collection(db, 'users'));
            const querySnapshot = await getDocs(q);
            const initialUser = [];
            console.log(querySnapshot.forEach);
            querySnapshot.forEach((doc) => {
                const data = {
                    id: doc.id, //
                    ...doc.data()
                };
                initialUser.push(data);
            });
            setUsers(initialUser);
        };
        fetchData();
    }, []);
    // console.log(users);
    const [isEditing, setIsEditing] = useState(false);

    const toggleInput = () => {
        setIsEditing((prevState) => !prevState);
    };
    return (
        <>
            <StWrapper>
                <Stbutton onClick={() => toggleInput()}>{isEditing ? '등록하기' : '프로필수정'} </Stbutton>
                <StUserwrapper>
                    <StProfileImage>
                        <div> 이미지</div>
                        <input type="file" />
                    </StProfileImage>
                    <StUserInfo>
                        {isEditing ? (
                            <>
                                <div>
                                    이름 : <input type="text" autoFocus />
                                </div>
                                <div>
                                    닉네임 : <input type="text" />
                                </div>
                                <div>
                                    생년월일 : <input type="text" />
                                </div>
                                <div>
                                    MBTI : <input type="text" />
                                </div>
                                <div>
                                    혈액형 : <input type="text" />
                                </div>
                                <div>
                                    거주지 : <input type="text" />
                                </div>
                            </>
                        ) : (
                            <>
                                <div>이름 : 홍길동</div>
                                <div>닉네임 : 길동홍</div>
                                <div>생년월일 : 001111</div>
                                <div>MBTI : ENFP</div>
                                <div>혈액형 : O형</div>
                                <div>거주지 : 조선시대</div>
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
    background-color: var(--light-pink);
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    width: 700px; // 이거는 다시 한 번 확인해볼 것
    margin: 10px auto; // 이거는 다시 한 번 확인해볼 것
`;

const StProfileImage = styled.div`
    background-color: var(--light-beige);
    border-radius: 10px;
    padding: 10px;
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

const Stbutton = styled.button`
    margin: 10px 5px 10px 0px;
    width: 100px;
    margin-left: 75%;
    margin-bottom: 20px;
`;
