import React, { useState } from 'react';
import * as T from './mbtiTestStyle';
import MbtiTestStart from './MbtiTestStart';
import Modal from 'react-modal';
import mcoiLogo from '../../assets/mbtiTest/mcoiLogo.svg';
import { useNavigate } from 'react-router';

const MbtiTest = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    const startTest = () => {
        setIsModalOpen(true);
    };

    return (
        <T.StScreenBox>
            <T.StTestContainer>
                <T.StTestStartComment>
                    MBTI 검사하고 저희 서비스를 더 재미있고 적극적으로 이용해보세요!
                </T.StTestStartComment>
                <T.StTestStartText>
                    성격 테스트를 통해 자신의 성향과 행동에 대한 정확한 분석 결과를 확인해 보세요.
                </T.StTestStartText>
                <T.StButtonContainer>
                    <T.StTestStartButton onClick={() => navigate('/')}>홈으로 돌아가기</T.StTestStartButton>
                    <T.StTestStartButton onClick={startTest}>검사 시작하기</T.StTestStartButton>
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
                    <T.StLogoImage>
                        <img src={mcoiLogo} alt="로고이미지" />
                    </T.StLogoImage>
                </T.StLogoImageBox>
            </T.StTestContainer>
        </T.StScreenBox>
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
