import React from 'react';
import styled from 'styled-components';
import logo from '../../assets/home/footerLogo.png';

const Footer = () => {
    return (
        <StBox>
            <StPostingBox>
                <StLogo>
                    <img src={logo} />
                </StLogo>
                <StDiv>
                    <StLeftDiv>
                        <StTitle>“MBTI 커뮤니티 플랫폼”</StTitle>
                        <StContent>
                            사람마다 각기 다른 MBTI를 주제로 다양한 의견들을 나누며 소통하고 모임을 만드는 커뮤니티
                            플랫폼을 소개합니다!
                        </StContent>
                    </StLeftDiv>
                    <StRightDiv>
                        <StContent>
                            리더 : 최수인 I 부리더 : 김희찬 I 디자이너 : 차상현 I 팀원 : 박길훈, 진영호
                        </StContent>
                        <StContent>내일배움캠프 I 서비스 런칭 프로젝트 B6 I REACT 3기</StContent>
                    </StRightDiv>
                </StDiv>
            </StPostingBox>
        </StBox>
    );
};

export default Footer;

const StBox = styled.div`
    width: 100%;
    height: 140px;
    position: relative;
`;

const StPostingBox = styled.div`
    width: 100%;
    height: 140px;
    position: fixed;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    bottom: 0;
    border: 1px solid var(--box-border-color);
    border-width: 1px 0 0 0;
    background-color: var(--light-gray);
`;

const StLogo = styled.div`
    width: 75%;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: start;

    & img {
        width: 300px;
    }
`;

const StDiv = styled.div`
    width: 75%;
    height: 70px;
    display: flex;
    justify-content: space-between;
`;

const StLeftDiv = styled.div`
    width: 60%;
    height: 100%;
`;

const StRightDiv = styled.div`
    width: 40%;
    height: 100%;
`;

const StTitle = styled.p`
    font-size: 17px;
    padding: 10px 0px 0px 10px;
`;

const StContent = styled.p`
    font-size: 11px;
    padding: 10px 0px 0px 10px;
    color: var(--bold-gray);
`;
