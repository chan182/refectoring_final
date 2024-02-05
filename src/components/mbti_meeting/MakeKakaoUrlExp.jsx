import React from 'react';
import styled from 'styled-components';
import kakaoImg from '../../assets/mbtiMeeting/openKakaoExpModal.png';
import { useRecoilState } from 'recoil';
import { userAtom } from '../../recoil/Atom';

const MakeKakaoUrlExp = ({ setIsOpen }) => {
    const [user] = useRecoilState(userAtom);

    return (
        <StContainer>
            <StBox></StBox>
            <StModal>
                <StBox1>
                    <StNum1>1</StNum1>
                    <StNum1>2</StNum1>
                    <StNum1>3</StNum1>
                    <StNum1>4</StNum1>
                    <StNum2>5</StNum2>
                    <StNum3>6</StNum3>
                    <StNum4>7</StNum4>
                </StBox1>
                <StBox2>
                    <img src={kakaoImg} />
                </StBox2>
                <StBox3>
                    <StH1>{user.name}님 안녕하세요  !</StH1>
                    <StP1>
                        모임 가입 문의를 받을 수 있는 1:1 오픈채팅방과, 모임을 운영하기 위한 단체채팅방을 개설해주세요.
                    </StP1>
                    <StP2>
                        아래 순서대로 진행 후 ＞ 확인 ＞ url 복사 ＞ 모임 링크 입력칸에 채팅방 url을 입력하세요.
                    </StP2>
                    <StTitle>＜ 1:1 가입문의 오픈채팅방 작성 예시 ＞</StTitle>
                    <StContent>1. 1:1 채팅방 선택</StContent>
                    <StContent>2. 오픈채팅방 이름 형식 : [ 모임 이름 ] 1:1 문의</StContent>
                    <StContent>3. 해시태그 : 모임과 관련된 태그 입력 (사이트 모임 태그와 동일하게 입력)</StContent>
                    <StContent>4. 커버 이미지 : 모임 대표사진 업로드 (사이트 대표 이미지와 동일하게 업로드)</StContent>
                    <StContent>5. 검색 허용 : 선택사항 (카카오톡 내 채팅방 검색 가능 여부 설정)</StContent>
                    <StContent>6. 참여 설정 : 선택사항 (익명은 지양해주세요 !)</StContent>
                    <StContent>7. 확인 클릭 [ 생성된 링크 복사 ＞ 붙여넣기 ]</StContent>
                    <StFooter>
                        <StP3>
                            1:1 가입 문의 오픈채팅방을 통해 모임 가입을 희망하는 사용자와 소통하고, 모임에 가입시키려는
                            사용자에게 단체 오픈채팅방의 url을 공유해주세요 !
                        </StP3>
                        <button onClick={() => setIsOpen(false)}>닫기</button>
                    </StFooter>
                </StBox3>
            </StModal>
        </StContainer>
    );
};

export default MakeKakaoUrlExp;

const StContainer = styled.div`
    width: 100%;
    height: 100vh;
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    left: 0;
`;

const StBox = styled.div`
    width: 100%;
    height: 100%;
    background-color: black;
    opacity: 0.5;
`;

const StModal = styled.div`
    width: 1200px;
    height: 763px;
    display: flex;
    position: fixed;
    margin-top: 50px;
    border-radius: 26px;
    padding: 42px 30px;
    background-color: white;
`;

const StBox1 = styled.div`
    width: 24px;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 41px;
    margin-right: 10px;
    font-size: 25px;
    font-weight: bold;
    color: #ac87c5;
`;

const StNum1 = styled.p`
    margin-top: 23px;
`;

const StNum2 = styled.p`
    margin-top: 113px;
`;

const StNum3 = styled.p`
    margin-top: 66px;
`;

const StNum4 = styled.p`
    margin-top: 164px;
`;

const StBox2 = styled.div`
    width: 436px;
    height: 100%;
`;

const StBox3 = styled.div`
    width: 660px;
    height: 100%;
    padding: 23px 26px;
    display: flex;
    flex-direction: column;

    button {
        background-color: #756ab6;
        border-radius: 6px;
        color: white;
        width: 200px;
        height: 50px;
        font-size: 20px;
    }
`;

const StH1 = styled.h1`
    color: #756ab6;
    font-size: 36px;
    font-weight: bold;
    margin-bottom: 48px;
`;

const StP1 = styled.p`
    color: #7d7d7d;
    font-size: 14px;
    margin-bottom: 8px;
`;

const StP2 = styled.p`
    color: #121212;
    font-size: 16px;
    margin-bottom: 91px;
`;

const StTitle = styled.p`
    color: #454545;
    font-size: 24px;
    margin-bottom: 16px;
`;

const StContent = styled.p`
    color: #000000;
    font-size: 16px;
    padding: 10px;
`;

const StFooter = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 100px;
`;

const StP3 = styled.p`
    color: #8d8d8d;
    font-size: 12px;
    width: 345px;
`;
