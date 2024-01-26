import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import check from '../../assets/mbtiMeeting/check.png';
import produce from '../../assets/mbtiMeeting/produce.png';
import search from '../../assets/mbtiMeeting/search.png';
import { db } from '../../firebase/firebase.config';
import { Link } from 'react-router-dom';
import positionImg from '../../assets/mbtiMeeting/positionimg.png';
import dateImg from '../../assets/mbtiMeeting/dateimg.png';
import userImg from '../../assets/mbtiMeeting/userimg.png';
import usersImg from '../../assets/mbtiMeeting/usersimg.png';
import ageImg from '../../assets/mbtiMeeting/ageimg.png';
import DropTag from './DropTag';
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
        <StMeeting>
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
            </StSearchMeet>
            {/* <StSelectMeetSearchContainer>
                <DropTag />
            </StSelectMeetSearchContainer> */}
            <StCreateWrap
                onClick={() => {
                    nav('/mbti/meeting/create');
                }}
            >
                <StCreateImg src={produce} alt="" />
                <StCreateMeet>모임 생성하기</StCreateMeet>
            </StCreateWrap>
            <StMeetingContainer>
                {meet.map((meet) => (
                    <StMeetingLink to={`/mbti/meeting/detail/${meet.id}`} key={meet.id}>
                        <StMeetingWrap>
                            <StImg src={meet.repreImg}></StImg>
                            <StContainer>
                                <StTitle>
                                    {meet.title}/{(meet.mbtis + '').split()}
                                </StTitle>
                                <StPositionDateUserContainer>
                                    <StContentsImgWrap>
                                        <StContentsPositionImg src={positionImg}></StContentsPositionImg>
                                        <StContents>{(meet.locations + '').split()}</StContents>
                                    </StContentsImgWrap>
                                    <StContentsImgWrap>
                                        <StContentsDateImg src={dateImg}></StContentsDateImg>
                                        <StContents>일정 : {meet.schedule}</StContents>
                                    </StContentsImgWrap>
                                    <StContentsImgWrap>
                                        <StContentsUserImg src={userImg} alt="" />
                                        <StContents>인원 :0 / {meet.limitPeople}</StContents>
                                    </StContentsImgWrap>
                                </StPositionDateUserContainer>
                                <StPositionDateUserContainer>
                                    <StContentsImgWrap>
                                        <StContentsUsersImg src={usersImg} alt="" />
                                        <StContents>성별 / {(meet.genders + '').split()}</StContents>
                                    </StContentsImgWrap>
                                    <StContentsImgWrap>
                                        <StContentsAgeImg src={ageImg} alt="" />
                                        <StContents>나이 / {(meet.ages + '').split()}</StContents>
                                    </StContentsImgWrap>
                                    <StContentsImgWrap>
                                        <StContentsAgeImg></StContentsAgeImg>
                                        <StContents></StContents>
                                    </StContentsImgWrap>
                                </StPositionDateUserContainer>
                            </StContainer>
                        </StMeetingWrap>
                    </StMeetingLink>
                ))}
                <div>{isVisible && <StUpbutton onClick={upButtonHandler}>↑</StUpbutton>}</div>
            </StMeetingContainer>
        </StMeeting>
    );
};
export default MbtiMeeting;

const StMeeting = styled.div`
    background-color: var(--background-color);
`;

const StSearchMeet = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
`;

const StSearchImgWrap = styled.div`
    width: 75%;
`;

const StSearchImg = styled.img`
    width: 48px;
    height: 48px;
    position: relative;
    top: 88px;
    left: 20px;
`;

const StSearch = styled.input`
    width: 100%;
    height: 78px;
    margin: 20px auto;
    padding-left: 70px;
    border: 0px;
    border-radius: 50px;
    font-size: 22px;
    background-color: var(--search-background-color);
    &:focus {
        outline-color: var(--button-border-color);
    }
`;

const StText = styled.h1`
    font-size: 42px;
    margin: 60px 0px 90px;
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

const StUpbutton = styled.button`
    position: fixed;
    width: 50px;
    height: 50px;
    background-color: var(--main-button-color);
    color: white;
    font-size: 30px;
    font-weight: light;
    border-radius: 30px;
    bottom: 20%;
    right: 8%;
`;

const StMeetingContainer = styled.div`
    min-width: 1400px;
    width: 70%;
    height: 5000px;
    margin: 40px auto;
`;

const StMeetingWrap = styled.div`
    width: 27%;
    aspect-ratio: 1/0.78;
    margin: 0px 3% 60px 3%;
    display: inline-block;
    border-radius: 16px;
    border: 1px solid var(--button-border-color);
`;

const StImg = styled.img`
    width: 100%;
    aspect-ratio: 1/0.5;
    border-top-left-radius: 16px;
    border-top-right-radius: 16px;
    border-bottom: 1px solid var(--button-border-color);
`;

const StContainer = styled.div`
    margin: 4%;
`;

const StTitle = styled.div`
    margin: 0px 0px 5%;
    font-size: 18px;
`;

const StPositionDateUserContainer = styled.div`
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
`;

const StContentsImgWrap = styled.span`
    width: 40%;
`;

const StContentsPositionImg = styled.img`
    width: 13px;
`;

const StContentsDateImg = styled.img`
    width: 13px;
`;

const StContentsUserImg = styled.img`
    width: 13px;
`;

const StContentsUsersImg = styled.img`
    width: 13px;
`;

const StContentsAgeImg = styled.img`
    width: 13px;
`;

const StContents = styled.span`
    font-size: 14px;
`;

const StMeetingLink = styled(Link)`
    text-decoration: none;
    color: inherit;
`;