import React from 'react';
import styled from 'styled-components';
import x from '../../assets/mbtiMeeting/x-square.png';
import img from '../../assets/mbtiMeeting/image.png';
import { useRecoilState } from 'recoil';
import { createMeetingState } from '../../recoil/recoilAtoms';

const MbtiMeetingExplainMeeting = () => {
    const [newMeeting, setNewMeeting] = useRecoilState(createMeetingState);

    return (
        <>
            <StTitle>모임 설명</StTitle>
            <StBox>
                <StPeedTitle
                    placeholder="제목을 입력해주세요.(15글자)"
                    maxLength={15}
                    value={newMeeting.title || ''}
                    onChange={(e) =>
                        setNewMeeting((prevNewMeeting) => ({
                            ...prevNewMeeting,
                            title: e.target.value
                        }))
                    }
                ></StPeedTitle>
                <StPeedContent
                    placeholder="내용을 입력해주세요."
                    value={newMeeting.content || ''}
                    onChange={(e) =>
                        setNewMeeting((prevNewMeeting) => ({
                            ...prevNewMeeting,
                            content: e.target.value
                        }))
                    }
                ></StPeedContent>
                {/* <StPeedImgBox>
                    <StImg>
                        <img src={x} />
                    </StImg>
                    <StImg>
                        <img src={x} />
                    </StImg>
                    <StImg>
                        <img src={x} />
                    </StImg>
                    <StImg>
                        <img src={x} />
                    </StImg>
                    <StImg>
                        <img src={x} />
                    </StImg>
                    <StImg>
                        <img src={x} />
                    </StImg>
                </StPeedImgBox> */}
            </StBox>
        </>
    );
};

export default MbtiMeetingExplainMeeting;

const StBox = styled.div`
    /* height: 860px; */
    width: 1200px;
    padding: 20px;
    background-color: #ffffff;
    border: 1px solid var(--content-border-color);
    border-radius: 26px;
    margin-bottom: 15px;
`;

const StTitle = styled.p`
    font-size: 26px;
    margin: 0px 0px 10px 20px;
`;

const StPeedTitle = styled.input`
    width: 100%;
    height: 47px;
    margin-bottom: 14px;
    font-size: 18px;
    padding: 13px;
    background-color: var(--light-gray);
    border: none;
    border-radius: 16px;

    &:focus {
        outline-color: var(--button-border-color);
    }
`;

const StPeedContent = styled.input`
    width: 100%;
    height: 483px;
    margin-bottom: 14px;
    font-size: 18px;
    padding: 13px;
    background-color: var(--light-gray);
    border: none;
    border-radius: 16px;

    &:focus {
        outline-color: var(--button-border-color);
    }
`;

const StPeedImgBox = styled.div`
    width: 100%;
    height: 200px;
    padding: 14px;
    border: none;
    border-radius: 16px;
    display: flex;
    flex-direction: row;
    background-color: var(--light-gray);
`;

const StImg = styled.div`
    width: 160px;
    height: 160px;
    margin-right: 14px;
    border-radius: 6px;
    background-color: #e3e3e3;
    background-image: url(${img});
    background-repeat: no-repeat;
    background-position: center;
    background-size: 54px 54px;
    text-align: right;

    img {
        width: 24px;
        height: 24px;
        margin: 8px;
    }
`;
