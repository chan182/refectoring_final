import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import modal_logo from '../../assets/home/mbti_community.png';
import { auth } from '../../firebase/firebase.config';
import { UserImageAtom, UserMbtiAtom, UserNameAtom, loginIdAtom } from '../../recoil/Atom';

const MainProfile = ({ setCurrentUser, toggleDropdown }) => {
    const clearUserAtom = useResetRecoilState(loginIdAtom);
    const profileminiImage = useRecoilValue(UserImageAtom);
    const userName = useRecoilValue(UserNameAtom);
    const userMbti = useRecoilValue(UserMbtiAtom);

    const navigate = useNavigate();
    return (
        <StProfileBox>
            <StProfileImg>
                <img src={profileminiImage} />
            </StProfileImg>
            <StUserInfo>
                <StProfileName>{userName}</StProfileName>
                <StProfileMbti>{userMbti}</StProfileMbti>
            </StUserInfo>
            <StPostsBox>
                <StPostsInfo>
                    <StPostsH1>팔로워</StPostsH1>
                    <StPostsH2>000명</StPostsH2>
                </StPostsInfo>
                <StPostsInfo>
                    <StPostsH1>모임</StPostsH1>
                    <StPostsH2>000명</StPostsH2>
                </StPostsInfo>
                <StPostsInfo>
                    <StPostsH1>게시물</StPostsH1>
                    <StPostsH2>000명</StPostsH2>
                </StPostsInfo>
            </StPostsBox>
            <StBtns>
                <StMypageBtn
                    onClick={() => {
                        navigate('/profile');
                        toggleDropdown();
                    }}
                >
                    마이페이지
                </StMypageBtn>
                <StLogoutBtn
                    onClick={async () => {
                        await signOut(auth);
                        setCurrentUser(null);
                        clearUserAtom(loginIdAtom);
                        toggleDropdown();
                        navigate('/');
                        Swal.fire({
                            title: '로그아웃 성공!',
                            text: '저희 MBTI Community에 자주 방문해주세요 ! ♥',
                            imageUrl: modal_logo,
                            imageWidth: 300,
                            imageAlt: 'Custom image',
                            confirmButtonText: '♥ 네 ♥',
                            confirmButtonColor: '#756ab6'
                        });
                    }}
                >
                    로그아웃
                </StLogoutBtn>
            </StBtns>
        </StProfileBox>
    );
};

export default MainProfile;

const StProfileBox = styled.div`
    width: 350px;
    height: 280px;
    position: absolute;
    transform: translateY(100%);
    right: 0;
    bottom: 0;
    background-color: white;
    border-radius: 5px;
    border: 1px solid var(--button-border-color);
`;

const StProfileImg = styled.div`
    width: 100%;
    height: 120px;
    display: flex;
    align-items: center;
    justify-content: center;

    & img {
        width: 100px;
        height: 100px;
        overflow: hidden;
        border-radius: 50%;
        border: 1px solid var(--content-border-color);
    }
`;

const StUserInfo = styled.div`
    width: 100%;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
`;

const StProfileName = styled.p`
    font-size: 20px;
`;

const StProfileMbti = styled.p`
    font-size: 15px;
    color: var(--bold-gray);
`;

const StPostsBox = styled.div`
    width: 100%;
    height: 30px;
    margin-top: 10px;
    padding: 10px;
    display: flex;
    justify-content: space-around;
    align-items: center;
`;

const StPostsInfo = styled.div`
    width: 33%;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
`;

const StPostsH1 = styled.h1`
    font-size: 12px;
`;

const StPostsH2 = styled.h2`
    font-size: 12px;
    color: var(--bold-gray);
`;

const StBtns = styled.div`
    width: 100%;
    height: 80px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const StMypageBtn = styled.button`
    width: 90%;
    height: 30px;
    margin-bottom: 5px;
    background-color: var(--main-button-color);
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 15px;
    cursor: pointer;

    &:hover {
        transform: scale(1.015);
    }
`;

const StLogoutBtn = styled.button`
    width: 90%;
    height: 30px;
    background-color: var(--light-gray);
    color: var(--bold-gray);
    border: none;
    border-radius: 5px;
    font-size: 15px;
    font-weight: 500;
    cursor: pointer;

    &:hover {
        /* transform: scale(1.015); */
        background-color: var(--main-button-color);
        color: white;
    }
`;
