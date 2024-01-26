import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import modal_logo from '../../assets/home/mbti_community.png';
import { auth } from '../../firebase/firebase.config';
import { isEditingAtom, userAtom } from '../../recoil/Atom';
import profileImage from '../../assets/profile/profileImg.png';

const MainProfile = ({ toggleDropdown }) => {
    const [user] = useRecoilState(userAtom);
    const [isEditing, setIsEditing] = useRecoilState(isEditingAtom);

    const navigate = useNavigate();

    return (
        <StProfileBox>
            <StProfileImg>
                <img src={user.imageUrl || profileImage} />
            </StProfileImg>
            <StUserInfo>
                <StProfileName>{user.name}</StProfileName>
                <StProfileMbti>{user.mbti}</StProfileMbti>
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
                        toggleDropdown();
                        setIsEditing(false);
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
    height: 288px;
    position: absolute;
    transform: translateY(100%);
    right: 0;
    bottom: 0;
    background-color: white;
    border-radius: 0 0 5px 5px;
    border: none;
    /* border: 1px solid var(--button-border-color); */
`;

const StProfileImg = styled.div`
    width: 100%;
    height: 127px;
    display: flex;
    align-items: center;
    justify-content: center;

    & img {
        width: 82px;
        height: 82px;
        overflow: hidden;
        border-radius: 50%;
        border: 0px solid var(--content-border-color);
    }
`;

const StUserInfo = styled.div`
    width: 100%;
    height: 21px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    margin-bottom: 6px;
`;

const StProfileName = styled.p`
    font-size: 18px;
`;

const StProfileMbti = styled.p`
    font-size: 14px;
    color: var(--bold-gray);
`;

const StPostsBox = styled.div`
    width: 100%;
    height: 17px;
    margin-bottom: 40px;
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
    font-size: 14px;
`;

const StPostsH2 = styled.h2`
    font-size: 14px;
    color: var(--bold-gray);
`;

const StBtns = styled.div`
    width: 100%;
    height: 63px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const StMypageBtn = styled.button`
    width: 302px;
    height: 40px;
    margin-bottom: 6px;
    background-color: var(--main-button-color);
    color: white;
    border: none;
    border-radius: 6px;
    font-size: 15px;
    cursor: pointer;

    &:hover {
        transform: scale(1.015);
    }
`;

const StLogoutBtn = styled.button`
    width: 90%;
    height: 17px;
    color: var(--bold-gray);
    border: none;
    font-size: 14px;
    cursor: pointer;
    text-decoration: underline;
`;
