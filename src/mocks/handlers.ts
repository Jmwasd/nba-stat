import { rest } from 'msw';
import recentMatchData from './data/game.json';
import westConferenceData from './data/westConference.json';
import eastConferenceData from './data/eastConference.json';

const URL = 'https://api-nba-v1.p.rapidapi.com';

const handlers = [
  rest.get(`${URL}/games`, (req, res, ctx) => res(ctx.status(200), ctx.json(recentMatchData))),
  rest.get(`${URL}/standings`, (req, res, ctx) => {
    const conference = req.url.searchParams.get('conference');
    if (conference === 'west') {
      res(ctx.status(200), ctx.json(westConferenceData));
    }
    return res(ctx.status(200), ctx.json(eastConferenceData));
  }),
];

export default handlers;
