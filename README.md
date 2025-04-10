# 와인 시커 프론트엔드
와인 추천 서비스인 와인 시커의 프론트엔드 입니다. 와인 시커는 사용자의 취향을 설문한 다음 와인을 추천하는 서비스 입니다.

## 사용 기술
 * Next.js 14 (app router)
 * tailwindCSS
 * Flowbite React

## 구동 방법
우선 이 프로젝트는 백엔드와 동시에 실행해야 정상 동작합니다. **이 프로젝트를 구동하기에 앞서 [백엔드](https://github.com/wineseeker/backend)를 먼저 실행하여야 하며, 백엔드와 프론트엔드 프로젝트가 동시에 실행되어야만 정상 작동합니다.**
### 프로덕션용으로 구동 시
```bash
pnpm run build && pnpm run start
```
### 개발 서버 구동
```bash
pnpm run dev
```