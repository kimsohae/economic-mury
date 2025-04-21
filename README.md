## 프로젝트 개요

간단한 경제 퀴즈와 결과를 제공하는 웹애플리케이션입니다. React, Next.js를 기반으로 개발하였으며 UI는 tailwindCSS와 shadcn을 사용하였습니다.

[main] branch: 서버, DB 활용

- https://economic-mury.site/

[without-server] branch: Static

- https://d2bbkrh89cys8o.cloudfront.net

## 기능 소개

`main` 브랜치 기준 기능 소개입니다.

- 간단한 경제 퀴즈 10문제
- 결과 페이지
  - 카카오톡 공유
- 결과 분석
  - 전체 등수, AI기반 총평, 오답노트

결과 분석에 필요한 API는 따로 백엔드 서버를 구축하지 않고 Next.js의 Route Handler(`app/api`)를 사용하여 구현하였습니다.

## 결과 페이지 조회 방식

`test/page.tsx` 에서 테스트 오나료 시:

- `userId`는 `cookie`에 저장
- API 응답 결과는 `localStorage`에 저장

이후 결과 페이지는 `result/[userId]/page.tsx`에서 다음 두 케이스로 구분됩니다.

1. 본인 결과 조회

- `cookie`의 `userId`가 패스 파라미터 `userId`와 일치함
- `localStroage`에 저장된 데이터를 바로 렌더링

2. 타인 결과 조회

- `cookie`에 `userId`가 없거나 패스 파라미터 `userId`와 일치하지 않음
- 서버에서 데이터를 fetch하여 렌더링

이를 통해 불필요한 데이터 페칭을 방지하고, 본인 결과는 빠르게 렌더링하도록 최적화하였습니다.
