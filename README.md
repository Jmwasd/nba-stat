![nba-symbol](./public/icon.png)

## NBA-STATS

NBA-STATS은 실시간 NBA 기록 정보를 제공합니다. 날짜 검색을 통해 경기 결과를 확인할 수 있으며 상세 데이터를 제공합니다. 또한 팀 순위, 팀 기록, 선수 개인 기록을 확인할 수 있습니다.

[NBA-STATS](https://nbastatsgames.com)

## 사옹기술

- NextJS
- Tailwind
- SWR
- Material UI
- MSW
- Zustand

## 기능

- 최근 NBA 경기 결과
- NBA Conference 랭킹
- 선수 통산 개인 기록 정보
- 팀 일정 및 기록

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
=======

NEXT_PUBLIC_ENV_API_KEY: Rapid API에서 제공하는 [API_KEY](https://rapidapi.com/api-sports/api/api-nba/pricing)


### Docker

1. npm run docker:build <br/>
2. npm run docker:run


## API

https://rapidapi.com/api-sports/api/api-nba
