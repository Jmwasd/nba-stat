/* eslint-disable function-paren-newline */
import { rest } from 'msw';
import APIv2 from '@/consts/api';
import res from './res';

import recentMatchData from './data/game.json';
import westConferenceData from './data/westConference.json';
import eastConferenceData from './data/eastConference.json';
import gameStatisticsData from './data/gameStatistics.json';
import playerStatisticsData from './data/playerStatistics.json';
import teamRankData from './data/teamRank.json';
import teamPlayerData from './data/teamPlayer.json';
import teamScheduleData from './data/teamSchedule.json';
import teamStatisticsData from './data/teamStatistics.json';

const URL = 'https://api-nba-v1.p.rapidapi.com';

const handlers = [
  rest.get(`${URL}${APIv2.game}`, (req, _, ctx) => {
    const isTeamSchedule = req.url.searchParams.get('team');

    if (isTeamSchedule) {
      return res(ctx.json(teamScheduleData));
    }

    return res(ctx.json(recentMatchData));
  }),

  rest.get(`${URL}${APIv2.standing}`, (req, _, ctx) => {
    const conference = req.url.searchParams.get('conference');
    const isTeamRank = req.url.searchParams.get('team');

    if (isTeamRank) {
      return res(ctx.json(teamRankData));
    }

    if (conference === 'west') {
      return res(ctx.json(westConferenceData));
    }

    return res(ctx.json(eastConferenceData));
  }),

  rest.get(`${URL}${APIv2.gameStats}`, (req, _, ctx) => res(ctx.json(gameStatisticsData))),

  rest.get(`${URL}${APIv2.playerStats}`, (req, _, ctx) => {
    if (req.url.searchParams.get('game')) {
      return res(ctx.json(playerStatisticsData));
    }

    return res(ctx.json(playerStatisticsData));
  }),

  rest.get(`${URL}${APIv2.player}`, (req, _, ctx) => res(ctx.json(teamPlayerData))),

  rest.get(`${URL}${APIv2.teamsStats}`, (req, _, ctx) => res(ctx.json(teamStatisticsData))),
];

export default handlers;
