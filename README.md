## 내배캠 React 3기 서비스런칭 B6조 최종 프로젝트

**2024.01.04 ~ 2024.02.08**
* * *
- 프로젝트명: **MCOI(MBTI Community)**
  
- 주제: 각기 다른 MBTI를 가진 사람들이 자유롭게 소통하고, 모임을 통해 인연을 쌓아갈 수 있는 커뮤니티 웹사이트
  
- 내용: MBTI를 검사할 수 있는 서비스, MBTI 궁합을 알아볼 수 있는 서비스, 모임을 만들고 친목을 도모할 수 있는 서비스, 자유롭게 게시글을 작성하고 댓글을 남기며 소통할 수 있는 커뮤니티 서비스를 지원하는 웹사이트

</br>

* * *

![image](https://github.com/chan182/refectoring_final/assets/139675355/b388be91-684a-44be-b49d-9fc0bf4c08b3)

</br>

* * *
1. 유저가 회원가입을 한 후 입력한 정보는 recoil을 사용하여 전역적으로 관리하게 됩니다.
   
</br>

</br>

 ![image](https://github.com/chan182/refectoring_final/assets/139675355/079b1599-6988-4872-a73d-30c0dc8d36b8)
 
* * *

※ router.jsx 에서 useEffect를 사용하여 렌더링 시 해당 유저의 db에 정보가 있는지 확인합니다.

![image](https://github.com/chan182/refectoring_final/assets/139675355/89d6fb00-22d8-4bd0-bf9d-0882ffc624b3)




### 👥 팀 소개

- 팀명: 6사시미
- 팀원: 최수인, 김희찬, 진영호, 박길훈, 차상현

### 👀 구현 기능
- 사용자 및 게시글 관리 (Firebase)
- 슬라이드 기능 구현 (React-Slick)
- 전역 상태 관리 (Recoil)
- 서버 상태 관리 (React-query)

### 📝 역할 분담
- 최수인 (리더)
  - 메인 페이지
  - MBTI 모임 생성 페이지
- 김희찬 (부리더)
  - 마이 페이지
  - 커뮤니티 메인 페이지
  - 커뮤니티 상세 페이지
- 진영호 (팀원)
  - 로그인/회원가입 페이지
  - MBTI 모임 메인 페이지
- 박길훈 (팀원)
  - MBTI 검사 페이지
  - MBTI 궁합 페이지
  - MBTI 모임 상세 페이지
- 차상현 (디자이너)
  - 전반적인 UI/UX 디자인

#### 💻 개발 환경
- IDE: Visual Studio Code
- OS: windows, Mac
- Package Manager: Yarn Classic (v1.22.19)
- React boilerplate: create-react-app

#### 📌 사용 기술
- 빠르고 편리한 UI/UX 구현 (React)
- 사용자 및 게시글 관리 (firebase)
- 슬라이드 기능 구현 (React-Slick)
- 전역 상태 관리 (Recoil)
- 서버 상태 관리 (React-query)
- 동적 스타일링 (styled-components)
- alert 구현 (sweetalert2)
- modal 구현 (React-modal, Custom Modal)
