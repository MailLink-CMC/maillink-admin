## 메일링크 어드민 페이지

### 파일구조

index.js : 최상위
App.js : 앱의 최상위. 테마 지정, 스크롤 지정
    - routes.js : 네비게이션 구조를 정의함
        - layouts : 크개 두 갈래로 나눠지는 레이아웃을 지정. 대시보드 and 로고만 있는 페이지
        - pages : layout의 child로 들어감. component와 section의 조합으로 이루어짐
            - section : 여러 컴포넌트로 이루어진 컴포넌트.
            - component : 기초적인 컴포넌트에서 스타일을 커스텀한 정도. 
