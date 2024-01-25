import React, { useRef } from "react";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import {
  createMeetingState,
  meetingRepreImgState,
  meetingNameState,
  meetingManagerNameState,
  meetingLimitPeopleState,
  meetingScheduleState,
  meetingKakaoUrlState,
  meetingOneLineIntroState,
} from "../../recoil/recoilAtoms";

const MbtiMeetingCreate = () => {
  const [meetingRepreImg, setMeetingRepreImg] =
    useRecoilState(meetingRepreImgState);
  const [meetingName, setMeetingName] = useRecoilState(meetingNameState);
  const [meetingManagerName, setMeetingManagerName] = useRecoilState(
    meetingManagerNameState
  );
  const [meetingLimitPeople, setMeetingLimitPeople] = useRecoilState(
    meetingLimitPeopleState
  );
  const [meetingSchedule, setMeetingSchedule] =
    useRecoilState(meetingScheduleState);
  const [meetingKakaoUrl, setmeetingKakaoUrl] =
    useRecoilState(meetingKakaoUrlState);
  const [meetingOneLineIntro, setmeetingOneLineIntro] = useRecoilState(
    meetingOneLineIntroState
  );

  const [newMeeting, setNewMeeting] = useRecoilState(createMeetingState);

  console.log("newMeeting", newMeeting);

  const imageInputRef = useRef(null);
  const handleImageChange = (event) => {
    const selectedImage = event.target.files[0];
    if (selectedImage) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageDataURL = e.target.result;
        setMeetingRepreImg(imageDataURL);

      };
      reader.readAsDataURL(selectedImage);
    }
  };

  return (
    <StTopContainerBox>
      <StTitle>모임 생성 </StTitle>
      <StTopContainer>
        <StImgBox>
          <StImg>
            {meetingRepreImg ? (
              <img src={meetingRepreImg} alt="선택된 이미지" />
            ) : (
              <StUnselectedImg />
            )}
            <StImageContainer
              type="file"
              ref={imageInputRef}
              onChange={handleImageChange}
            ></StImageContainer>
          </StImg>
          <StUploadImgBtn onClick={() => imageInputRef.current.click()}>
            모임 대표사진 업로드
          </StUploadImgBtn>
        </StImgBox>
        <StContentBox>
          <StTextContainer>
            <StTextContainerBox>
              <StDetailTextBox>
                모임 이름
                <StDetailText
                  placeholder="모임의 이름을 입력해주세요."
                  value={newMeeting.name}
                  onChange={(e) =>
                    setNewMeeting((prevNewMeeting) => ({
                      ...prevNewMeeting,
                      name: e.target.value,
                    }))
                  }
                ></StDetailText>
              </StDetailTextBox>
              <StDetailTextBox>
                모집 관리자
                <StDetailText
                  placeholder="모임의 관리자 이름을 입력해주세요."
                  value={newMeeting.managerName}
                  onChange={(e) =>
                    setNewMeeting((prevNewMeeting) => ({
                      ...prevNewMeeting,
                      managerName: e.target.value,
                    }))
                  }
                ></StDetailText>
              </StDetailTextBox>
            </StTextContainerBox>
            <StTextContainerBox>
              <StDetailTextBox>
                모임 정원
                <StDetailText
                  placeholder="모임의 정원을 입력해주세요. (ex. 10명)"
                  value={newMeeting.limitPeople}
                  onChange={(e) =>
                    setNewMeeting((prevNewMeeting) => ({
                      ...prevNewMeeting,
                      limitPeople: e.target.value,
                    }))
                  }
                ></StDetailText>
              </StDetailTextBox>
              <StDetailTextBox>
                모임 일정
                <StDetailText
                  placeholder="모임의 일정을 입력해주세요. (ex. 주 5회)"
                  value={newMeeting.schedule}
                  onChange={(e) =>
                    setNewMeeting((prevNewMeeting) => ({
                      ...prevNewMeeting,
                      schedule: e.target.value,
                    }))
                  }
                ></StDetailText>
              </StDetailTextBox>
            </StTextContainerBox>
            <StDetailTextBox3>1:1 오픈 채팅방 만드는 방법</StDetailTextBox3>
            <StDetailText3
              placeholder="카카오톡 오픈채팅방의 URL을 입력해주세요."
              value={newMeeting.kakaoUrl}
              onChange={(e) =>
                setNewMeeting((prevNewMeeting) => ({
                  ...prevNewMeeting,
                  kakaoUrl: e.target.value,
                }))
              }
            ></StDetailText3>
            <StDetailTextBox2>
              모임 한줄 소개
              <StDetailText2
                placeholder="모임에 대해 간단하게 소개해주세요."
                value={newMeeting.oneLineIntro}
                onChange={(e) =>
                  setNewMeeting((prevNewMeeting) => ({
                    ...prevNewMeeting,
                    oneLineIntro: e.target.value,
                  }))
                }
              ></StDetailText2>
            </StDetailTextBox2>
          </StTextContainer>
        </StContentBox>
      </StTopContainer>
    </StTopContainerBox>
  );
};

export default MbtiMeetingCreate;

const StTopContainerBox = styled.div`
  margin-top: 68px;
  font-size: 26px;
`;

const StTopContainer = styled.div`
  height: 540px;
  width: 1200px;
  font-size: 18px;
  margin-top: 5px;
  background-color: #ffffff;
  border: 1px solid var(--content-border-color);
  display: flex;
  justify-content: center;
  border-radius: 1rem;
`;

const StImgBox = styled.div`
  height: 540px;
  width: 489px;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const StImg = styled.div`
  height: 346px;
  width: 346px;
  border-radius: 50%;
  margin: 54px 0px 0px 64px;
  overflow: hidden;
  display: flex;
  align-items: center;
  flex-direction: column;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const StUnselectedImg = styled.div`
  height: 346px;
  width: 346px;
  border-radius: 50%;
  background-color: var(--light-gray);
`;

const StImageContainer = styled.input`
  display: none;
`;

const StUploadImgBtn = styled.button`
  border: 1px solid var(--button-border-color);
  font-size: 20px;
  width: 196px;
  height: 48px;
  background-color: white;
  color: #6a6a6a;
  border-radius: 6px;
  cursor: pointer;
  margin: 37px 0px 0px 74px;

  &:hover {
    transition: ease-in-out 0.2s;
    background-color: var(--main-button-color);
    color: #fff;
  }
`;

const StContentBox = styled.div`
  margin-left: 10px;
`;

const StTextContainer = styled.div`
  height: 346px;
  width: 680px;
  margin: 54px;
  background-color: #ffffff;
`;

const StTextContainerBox = styled.div`
  display: flex;
  flex-direction: row;
  gap: 65px;
`;

const StDetailTextBox = styled.div`
  font-size: 14px;
  margin-bottom: 24px;
  color: #888888;
`;

const StDetailText = styled.input`
  height: 47px;
  width: 296px;
  background: var(--light-gray);
  font-size: 16px;
  margin-top: 5px;
  padding: 15px;
  display: flex;
  color: #4e4e4e;
  border: none;
  border-radius: 0.5rem;
`;

const StDetailTextBox2 = styled.div`
  font-size: 14px;
  color: #888888;
  height: 51%;
`;

const StDetailText2 = styled.input`
  height: 47px;
  width: 97.3%;
  border-radius: 5px;
  background: var(--light-gray);
  font-size: 16px;
  margin-top: 5px;
  padding: 10px;
  display: flex;
  color: #4e4e4e;
  border: none;
  border-radius: 0.5rem;
`;

const StDetailTextBox3 = styled.div`
  font-size: 14px;
  color: #888888;
  text-decoration: underline;
`;

const StDetailText3 = styled.input`
  height: 47px;
  width: 660px;
  background: var(--light-gray);
  font-size: 16px;
  margin-top: 5px;
  margin-bottom: 24px;
  padding: 15px;
  display: flex;
  color: #4e4e4e;
  border: none;
  border-radius: 0.5rem;
`;

const StTitle = styled.p`
  font-size: 26px;
  margin: 0px 0px 10px 20px;
`;
