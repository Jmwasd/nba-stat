import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

import { useTeamRank } from '@/queries/standing';
import { useRouter } from 'next/router';
import { TeamPageQueryType } from '@/types/rotuerQuery';
import { ConferenceStandingResponseType } from '@/types/teams';
import getWinPercentage from '@/utils/getPercentage';
import Loading from '../Loading';
import TeamLogo from '../TeamLogo';
import Error from '../Error';

const TeamRank = () => {
  const { query } = useRouter();
  const teamPageQuery = query as TeamPageQueryType;

  const { data: conferenceStanding, isLoading } = useTeamRank(teamPageQuery.id);

  const getTableInfo = (data: ConferenceStandingResponseType) => {
    const win = data.win.home + data.win.away;
    const loss = data.loss.home + data.loss.away;
    const winPercentage = getWinPercentage(win, loss);

    return [
      { head: '랭킹', body: data.conference.rank },
      {
        head: '승',
        body: win,
      },
      { head: '패', body: loss },
      { head: '승률', body: winPercentage },
      {
        head: '홈',
        body: `${data.win.home}-${data.win.home}`,
      },
      {
        head: '원정',
        body: `${data.win.away}-${data.win.away}`,
      },
      {
        head: '최근 10경기',
        body: data.streak + (data.winStreak ? 'W' : 'L'),
      },
      {
        head: '연속',
        body: `${data.win.lastTen}-${data.loss.lastTen}`,
      },
    ];
  };

  if (isLoading) {
    return <Loading height="h-[200px]" />;
  }

  return !conferenceStanding ? (
    <Error text="Error" height="h-40" />
  ) : (
    <Paper className="p-5 flex items-center">
      <TeamLogo
        className="mr-5"
        code={conferenceStanding[0].team.code}
        width={70}
        height={70}
        alt="tema-logo"
      />
      <Typography variant="h4">{conferenceStanding[0].team.name}</Typography>
      <Box className="w-[70%] my-0 mx-auto">
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {getTableInfo(conferenceStanding[0]).map((el) => (
                  <TableCell key={el.head} align="center">
                    {el.head}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                {getTableInfo(conferenceStanding[0]).map((el) => (
                  <TableCell key={el.head + el.body} align="center">
                    {el.body}
                  </TableCell>
                ))}
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Paper>
  );
};

export default TeamRank;
