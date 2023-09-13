## NBA-STATS

NBA-STATS는 NBA 통계 자료를 제공합니다. 날짜 검색을 통해 경기 결과를 확인할 수 있으며 상세 데이터를 제공합니다. 또한 팀 랭킹, 팀 통계, 선수 기록에 관한 정보를 확인할 수 있습니다.

## 프로젝트 설치 및 실행

### Manual
1. Clone this repository: `git clone https://github.com/Jmwasd/nba-stat.git`
2. Copy .example.env.local to .env.local fill it properly
3. Install dependencies: `npm install`.
4. Run for development: `npm run dev`.
5. Run for production: `npm run build then npm start`.

### .env

NEXT_PUBLIC_ENV_API_KEY: Rapid API에서 제공하는 [API_KEY](https://rapidapi.com/api-sports/api/api-nba/pricing)


### Docker

1. npm run docker:build <br/>
2. npm run docker:run


## API

https://rapidapi.com/api-sports/api/api-nba

## Stack

- Next (server-side rendered React)
- Tailwind CSS (CSS styling solution library)
- SWR (library for data fetching)
- Material UI
- Zustant
- AWS(EC2, ECR, Route 53)
- Github Actions

