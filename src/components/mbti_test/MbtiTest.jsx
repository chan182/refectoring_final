import React, { useState } from 'react';
import * as T from './mbtiTestStyle';
import MbtiTestStart from './MbtiTestStart';
import Modal from 'react-modal';
import mcoiLogo from '../../assets/mbtiTest/mcoiLogo.svg';
import { useNavigate } from 'react-router';
import testStart from '../../assets/mbtiTest/testStart.png';
import styled from 'styled-components';

const MbtiTest = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    const startTest = () => {
        setIsModalOpen(true);
    };

    return (
        <T.StScreenBox2>
            <T.StTestContainer>
                <T.StTestStartComment>MBTI를 알면 엠코이를 보다 더 재미있게 이용할 수 있어요!</T.StTestStartComment>

                <StStartimg src={testStart} alt="시작페이지 이미지" />
                <T.StButtonContainer>
                    <T.StTestStartButton onClick={() => navigate('/')}>홈으로 돌아가기</T.StTestStartButton>
                    <T.StTestStartButton2 onClick={startTest}>검사 시작하기</T.StTestStartButton2>
                </T.StButtonContainer>
                {/* MBTI 검사 모달 */}
                <Modal
                    isOpen={isModalOpen}
                    onRequestClose={() => setIsModalOpen(false)}
                    style={customModalStyles}
                    shouldCloseOnOverlayClick={false}
                    contentLabel="MBTI Test Modal"
                >
                    <MbtiTestStart isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
                </Modal>
                <T.StLogoImageBox>
                    <T.StTestStartText>
                        성격 테스트를 통해 자신의 성향과 행동에 대한 정확한 분석 결과를 확인해 보세요.
                    </T.StTestStartText>
                    {/* <T.StLogoImage>
                        <img src={mcoiLogo} alt="로고이미지" />
                    </T.StLogoImage> */}
                </T.StLogoImageBox>
            </T.StTestContainer>
        </T.StScreenBox2>
    );
};

export default MbtiTest;

const customModalStyles = {
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },

    content: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '65%',
        height: '71.5%',
        // maxWidth: '90vw',
        // maxHeight: '90vh',
        padding: '20px',
        borderRadius: '10px',
        backgroundColor: '#fff',
        overflow: 'auto'
    }
};

const StStartimg = styled.img`
    width: 80%;
    height: 60%;
    margin-top: -2%;
    margin-bottom: 1%;
    margin-left: 10%;
`;
