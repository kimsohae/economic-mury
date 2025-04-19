## 프로젝트 개요

간단한 경제 퀴즈와 결과를 제공하는 웹애플리케이션입니다. React, Next.js를 기반으로 개발하였으며 UI는 tailwindCSS와 shadcn을 사용하였습니다.

[main] branch: 서버, DB 활용

- https://economic-mury.site/

[without-server] branch: Static

- https://d2bbkrh89cys8o.cloudfront.net

## 기능 소개

main 브랜치 기준 기능 소개입니다.

- 간단한 경제 퀴즈 10문제
- 결과 페이지
  - 카카오톡 공유
- 결과 분석
  - 등수, AI 총평, 오답노트

결과 분석에 필요한 API는 따로 백엔드 서버를 구축하지 않고 Next.js의 Route Handler(`app/api`)를 사용하여 구현하였습니다.
