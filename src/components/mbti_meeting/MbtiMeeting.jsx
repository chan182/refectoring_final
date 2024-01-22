import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import check from '../../assets/mbtiMeet/check.png';
import produce from '../../assets/mbtiMeet/produce.png';
import search from '../../assets/mbtiMeet/search.png';
import { db } from '../../firebase/firebase.config';

const MbtiMeeting = () => {
    // const user = useRecoilState(userAtom);
    // const userinformation = user[0];
    // console.log(userinformation);
    // console.log(userinformation.email);
    const nav = useNavigate();

    const [isChecked, setChecked] = useState(false);
    const [isChecke, setChecke] = useState(false);
    const [isVisible, setIsvisible] = useState(false);
    const [meet, setMeet] = useState([]);
    const [searchKeyWord, setSearchKeyWord] = useState('');

    //데이터 읽기
    useEffect(() => {
        const fetchData = async () => {
            const q = query(collection(db, 'meet'));
            const querySnapshot = await getDocs(q);

            const initialMeet = [];

            querySnapshot.forEach((doc) => {
                const data = {
                    id: doc.id,
                    ...doc.data()
                };
                initialMeet.push(data);
            });
            setMeet(initialMeet);
        };
        fetchData();
    }, []);

    //데이터 검색
    const searchData = async () => {
        const q = query(
            collection(db, 'meet'),
            where('title', '>=', searchKeyWord),
            where('title', '<=', searchKeyWord + '\uf8ff')
        );
        const querySnapshot = await getDocs(q);

        const initialMeet = [];

        querySnapshot.forEach((doc) => {
            const data = {
                id: doc.id,
                ...doc.data()
            };
            initialMeet.push(data);
        });
        setMeet(initialMeet);
    };

    // 위로 올라가기 버튼
    useEffect(() => {
        const scroll = () => {
            const scrollY = window.scrollY || document.documentElement.scrollTop;
            const threshold = 800; //800px

            if (scrollY > threshold) {
                setIsvisible(true);
            } else {
                setIsvisible(false);
            }
        };
        window.addEventListener('scroll', scroll);
        return () => {
            window.removeEventListener('scroll', scroll);
        };
    }, []);

    const handleToggle = () => {
        setChecked(!isChecked);
        setChecke(false);
    };

    const handleToggl = () => {
        setChecke(!isChecke);
        setChecked(false);
    };

    const upButtonHandler = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            searchData();
        }
    };
    return (
        <>
            <StSearchMeet>
                <StSearchImgWrap>
                    <StSearchImg src={search} alt="search image" />
                    <StSearch
                        placeholder="검색어를 입력해주세요."
                        value={searchKeyWord}
                        name="searchKeyWord"
                        onChange={(e) => setSearchKeyWord(e.target.value)}
                        autoFocus
                        onKeyUp={handleKeyDown}
                    ></StSearch>
                </StSearchImgWrap>
                <StText>자유롭게 모임을 만들고 가입해 활동해보세요!</StText>
                <StCreateWrap
                    onClick={() => {
                        nav('/mbti/meeting/create');
                    }}
                >
                    <StCreateImg src={produce} alt="" />
                    <StCreateMeet>모임 생성하기</StCreateMeet>
                </StCreateWrap>
            </StSearchMeet>
            <StSelectMeetSearchContainer>
                <StSelectMeetSearchText>원하는 조건으로 모임 찾기</StSelectMeetSearchText>
                <StSelectContainer>
                    <StSelectImgWrap>
                        <StSelect>지역</StSelect>
                        <StSelectImg src={check} />
                    </StSelectImgWrap>
                    <StSelectImgWrap onClick={handleToggle}>
                        <StSelect>성별</StSelect>
                        <StSelectImg src={check} />
                    </StSelectImgWrap>
                    <StSelectImgWrap onClick={handleToggl}>
                        <StSelect>나이</StSelect>
                        <StSelectImg src={check} />
                    </StSelectImgWrap>
                    <StSelectMbtiImgWrap>
                        <StSelect>MBTI</StSelect>
                        <StSelectMbtiImg src={check} />
                    </StSelectMbtiImgWrap>
                </StSelectContainer>
            </StSelectMeetSearchContainer>
            <StCheckboxContainer>
                {isChecked && (
                    <StCheckboxWrap>
                        <StCheckbox type="checkbox" id="all" />
                        <label for="all">모두</label>
                    </StCheckboxWrap>
                )}
                {isChecked && (
                    <StCheckboxWrap>
                        <StCheckbox type="checkbox" id="male" />
                        <label for="male">남성</label>
                    </StCheckboxWrap>
                )}
                {isChecked && (
                    <StCheckboxWrap>
                        <StCheckbox type="checkbox" id="female" />
                        <label for="female">여성</label>
                    </StCheckboxWrap>
                )}
                {isChecke && (
                    <>
                        <input type="checkbox" />
                        <span>10</span>
                    </>
                )}
            </StCheckboxContainer>
            <StMeetingContainer>
                {meet.map((meet) => {
                    return (
                        <StMeetingWrap>
                            <StImg src={meet.imageurl}></StImg>
                            <StContainer>
                                <StTitle>
                                    {meet.title}/{meet.mbti}
                                </StTitle>
                                <div>
                                    <StContents>{meet.position}</StContents>
                                    <StContents>일정 : {meet.date}</StContents>
                                    <StContents>인원 : {meet.person}</StContents>
                                </div>
                                <div>
                                    <StContents>성별 / {meet.gender}</StContents>
                                    <StContents>나이 / {meet.age}</StContents>
                                </div>
                            </StContainer>
                        </StMeetingWrap>
                    );
                })}
            </StMeetingContainer>
            <div>{isVisible && <StUpbutton onClick={upButtonHandler}>△</StUpbutton>}</div>
        </>
    );
};

export default MbtiMeeting;

const StSearchMeet = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
`;

const StSearchImgWrap = styled.div`
    width: 75%;
`;

const StSearchImg = styled.img`
    width: 35px;
    height: 35px;
    position: relative;
    top: 60px;
    user-select: none;
`;

const StSearch = styled.input`
    width: 100%;
    height: 40px;
    margin: 20px auto;
    padding-left: 40px;
    border: 0px;
    font-size: 20px;
    &:focus {
        outline-color: var(--button-border-color);
    }
`;

const StText = styled.h1`
    font-size: 25px;
    margin: 40px 0px 88px;
`;

const StCreateWrap = styled.div`
    width: 110px;
    height: 45px;
    margin-bottom: 60px;
    position: fixed;
    right: 47%;
    bottom: 15%;
`;

const StCreateImg = styled.img`
    position: relative;
    width: 17px;
    height: 17px;
    left: 5px;
    top: 35px;
`;

const StCreateMeet = styled.button`
    width: 110px;
    height: 45px;
    border-radius: 30px;
    background-color: var(--button-border-color);
    color: white;
    font-size: 14px;
    padding-left: 25px;
    &:hover {
        background-color: var(--main-button-color);
        color: white;
    }
`;

const StSelectMeetSearchContainer = styled.div`
    width: 65%;
    margin: 0px auto;
`;

const StSelectMeetSearchText = styled.div`
    font-size: 20px;
    margin-bottom: 30px;
`;

const StSelectContainer = styled.ul`
    display: flex;
    gap: 28px;
`;

const StSelectImgWrap = styled.div`
    width: 70px;
    height: 30px;
    padding-top: 8px;
    padding-left: 8px;
    border-radius: 5px;
    border: 1px solid var(--button-border-color);
    cursor: pointer;
`;

const StSelectImg = styled.img`
    position: relative;
    bottom: 27px;
    left: 30px;
`;

const StSelect = styled.li`
    width: 60px;
    height: 20px;
`;

const StSelectMbtiImgWrap = styled.div`
    min-width: 80px;
    height: 30px;
    padding-top: 8px;
    padding-left: 8px;
    border-radius: 5px;
    border: 1px solid var(--button-border-color);
    cursor: pointer;
`;

const StSelectMbtiImg = styled.img`
    position: relative;
    bottom: 27px;
    left: 40px;
`;

const StCheckboxContainer = styled.div`
    margin: 30px auto;
    width: 65%;
`;

const StCheckboxWrap = styled.div`
    width: 97px;
    height: 30px;
    display: inline-block;
`;

const StCheckbox = styled.input`
    accent-color: var(--main-button-color);
`;

const StUpbutton = styled.button`
    position: fixed;
    width: 50px;
    height: 50px;
    background-color: var(--main-button-color);
    color: white;
    font-size: larger;
    font-weight: light;
    border-radius: 30px;
    bottom: 20%;
    right: 8%;
`;

const StMeetingContainer = styled.div`
    min-width: 822px;
    width: 70%;
    height: 5000px;
    margin: 40px auto;
`;

const StMeetingWrap = styled.div`
    width: 27%;
    aspect-ratio: 1/0.78;
    margin: 0px 52px 60px 0px;
    display: inline-block;
    border-radius: 10px;
    border: 1px solid var(--button-border-color);
`;

const StImg = styled.img`
    width: 100%;
    aspect-ratio: 1/0.5;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    border-bottom: 1px solid var(--button-border-color);
`;

const StContainer = styled.div`
    margin: 4%;
`;

const StTitle = styled.div`
    margin: 0px 0px 5%;
    font-size: 18px;
`;

const StContents = styled.span`
    margin-right: 5%;
    font-size: 14px;
`;
