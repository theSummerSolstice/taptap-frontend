# taptap

<!-- taptap gif image -->

### Table of contents
1. [taptap](#taptap)
2. [Feature](#feature)
3. [Simulation](#simulation)
4. [How to use](#how-to-use)
5. [How to run](#how-to-run)
6. [Schedule](#schedule)
7. [Work flow](#work-flow)
8. [Tech stack](#tech-stack)
9. [Tast tools](#tast-tools)
10. [Deploy](#deploy)
11. [Daily retrospective](#daily-retrospective)
12. [Things to do](#things-to-do)

### taptap
포스트잇, 브레인스토밍, 협업, 카테고라이징

### Feature
- 생각나는대로 적고 카테고리에 넣으며 생각을 정리해보세요.
- 혼자서도 할 수 있고, 최대 4명이 동시에 참여할 수 있습니다. (WebSocket)
- Snapshot을 남겨서 Version을 관리하고 언제든지 돌아갈 수 있습니다.

### Simulation
[Youtube URL](http://www.google.com)
<!-- gif image -->

### How to use
- 사용 방법
1. Board 만들기
2. 친구 초대하기
3. 포스트잇 붙이기
4. 카테고리로 나누기
5. 기타 기능

### How to run
- Installation
Local 환경에서 실행하기 위해서는 아래 내용을 먼저 확인해주세요.
<!-- env file sample -->
[1. Google Firebase Auth](https://firebase.google.com/)
[2. MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
[3. NodeMailer](https://nodemailer.com/about/)

- 각 Github Repository에서 코드를 Clone 후, .env.sample 파일의 형식에 맞게 환경 변수를 입력하세요.
> - Frontend github URL: [Frontend](https://github.com/theSummerSolstice/taptap-frontend)
> - Backend github URL: [Backend](https://github.com/theSummerSolstice/taptap-backend)

```
// Frontend
git clone https://github.com/theSummerSolstice/taptap-frontend.git

// Backend
git clone https://github.com/theSummerSolstice/taptap-backend.

npm install
cd ./frontend && npm run dev
cd ./backend && npm run dev
```
1. 각 Repository를 하나의 폴더에 Clone 합니다.
2. 환경 변수를 .env.sample에 맞게 입력합니다.
3. npm install을 통해 패키지를 설치합니다.
4. 터미널에서 Frontend, Backend 각각 npm run dev로 실행하면 Youout을 확인할 수 있습니다. (Default Server: [http://localhost:3000](http://localhost:3000))

### Schedule
### Work flow
### Tech stack
- Frontend
  - React
  - Redux (Redux-saga, @reduxjs/toolkit)

- Backend
  - MongoDB Atlas (mongoose(ODM))
  - Express
  - NodeJS

- Third party stack
  - Git
  - JSON Web Token
  - Socket.io
  - Jest, React-testing-library, Mocha, Chai, Sinon
  - ESLint
  - SCSS tools

### Tast tools
- Figma
  - Mockup 디자인 툴
  - [Figma Link](https://www.figma.com/file/9pRdnseACnUCasda0rxzRu/taptap?node-id=0%3A1)
- Lucid Chart
  - Database Schema 제작 툴
  - [Lucid Chart Link](https://lucid.app/lucidchart/invitations/accept/78fea081-4fc4-4af0-bdca-8d287d57bcb0)
- Notion
  - 프로젝트 Task 및 이슈 관리
  - [Notion Link](https://www.notion.so/1ff95b7e4400490e96ada7813ea2366a?v=6e4840fa58d141e590a08349836987cc)

### Deploy
- Client
  - Netlify를 이용한 Client 배포
  - [https://www.tap-tap.site](https://www.tap-tap.site)
- Server
  - AWS Elastic Beanstalk를 이용한 Server 배포
  - AWS Code Pipeline을 통한 Server 배포 자동화

### Daily retrospective
<!-- TIL image -->

### Things to do
1. 포스트잇 외 브레인스토밍 툴 추가
2. 공유 기능 확장 (외부인도 접근 가능한 광장 같은 느낌)
3. 반응형 Web 구현
