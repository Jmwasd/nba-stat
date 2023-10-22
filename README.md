![nba-symbol](./public/icon.png)

## NBA-STATS

NBA-STATS은 실시간 NBA 기록 정보를 제공합니다. 날짜 검색을 통해 경기 결과를 확인할 수 있으며 상세 데이터를 제공합니다. 또한 팀 순위, 팀 기록, 선수 개인 기록을 확인할 수 있습니다.

[NBA-STATS 링크](https://nbastatsgames.com)

## 사용기술

- NextJS
- TailwindCSS
- SWR
- Material UI
- MSW
- Zustand

## 프로젝트 화면 및 소개
```
최근 경기 결과와 원하는 날짜를 선택하여 경기 일정을 확인할 수 있습니다.
```
![ezgif com-video-to-gif](https://github.com/Jmwasd/nba-stat/assets/66477332/dff3f859-5e90-46e0-92b2-666f15d0ac4e)

```
경기 결과를 반영한 라인 스코어, 경기 기록, 선발 및 벤치 라인업 정보를 확인할 수 있습니다.
```
![ezgif com-video-to-gif (1)](https://github.com/Jmwasd/nba-stat/assets/66477332/bfd5157e-6c03-43c4-9197-efd503a3a7aa)

## 프로젝트 설치 및 실행 방법

### Manual

1. Clone this repository: `git clone https://github.com/Jmwasd/nba-stat.git`
2. Copy .example.env.development to .env.development fill it properly
3. Install dependencies: `npm install`.
4. Run for development: `npm run dev`.
5. Run for production: `npm run build then npm start`.

### .env

#### develop

- NEXT_PUBLIC_API_MOCKING=enabled

#### production

- NEXT_PUBLIC_ENV_API_KEY=[API_KEY](https://rapidapi.com/api-sports/api/api-nba/pricing)
- NEXT_PUBLIC_ENV_API_URL=https://api-nba-v1.p.rapidapi.com
- NEXT_PUBLIC_API_MOCKING=disabled

### Docker

1. npm run docker:build
2. npm run docker:run

## API

https://rapidapi.com/api-sports/api/api-nba

