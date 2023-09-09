import { Box, Card, CardActionArea, Typography } from '@mui/material';

import { TeamScheduleType } from '@/types/games';
import { MouseEvent, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { TeamPageQueryType } from '@/types/rotuerQuery';
import { useTeamSchedule } from '@/hooks/teams';
import { getDateKr } from '@/utils/formatter';
import Loading from '../Loading';
import Title from '../Title';
import TeamLogo from '../TeamLogo';
import Error from '../Error';

const SLICE_COUNT = 10;

const WIN_OR_LOSE_COLOR = {
  win: 'text-teal-500 inline',
  lose: 'text-pink-500 inline',
};

const TeamSchedule = () => {
  const router = useRouter();
  const teamPageQuery = router.query as TeamPageQueryType;

  const { data, isLoading } = useTeamSchedule(teamPageQuery.id);

  const [cardCount, setCardCount] = useState<number>(SLICE_COUNT);

  const teamSchedule = useMemo(() => data?.reverse(), [data]);

  const getCardInfo = (stats: TeamScheduleType) => {
    const selectedTeam: 'visitors' | 'home' =
      stats.teams.home.id === Number(teamPageQuery.id) ? 'home' : 'visitors';
    const opponentTeam: 'visitors' | 'home' =
      stats.teams.home.id !== Number(teamPageQuery.id) ? 'home' : 'visitors';
    const winOrLose =
      stats.scores[selectedTeam].points > stats.scores[opponentTeam].points ? 'W' : 'L';

    const point = `${stats.scores[selectedTeam].points}-${stats.scores[opponentTeam].points}`;

    return {
      opponentTeamName: stats.teams[opponentTeam].nickname,
      opponentTeamLogo: stats.teams[opponentTeam].code,
      point,
      winOrLose,
    };
  };

  const clickCard = (e: MouseEvent<HTMLElement>, stats: TeamScheduleType) => {
    e.preventDefault();
    router.push({
      pathname: `/game/${stats.id}`,
      query: {
        homeLineScore: stats.scores.home.linescore,
        visitorLineScore: stats.scores.visitors.linescore,
        homeTeamName: stats.teams.home.name,
        visitorTeamName: stats.teams.visitors.name,
      },
    });
  };

  const LoadMore = () => {
    setCardCount((prev) => prev + 10);
  };

  if (isLoading) {
    return <Loading height="h-[220px]" width="w-[250px]" />;
  }

  return (
    <Box className="mr-7">
      <Title text="팀 일정" />
      {!teamSchedule ? (
        <Error text="Error" height="h-20" width="w-[250px]" />
      ) : (
        <>
          {teamSchedule.slice(0, cardCount).map((el) => (
            <Card key={el.id} className="mb-3">
              <CardActionArea className="p-4 cursor-pointer" onClick={(e) => clickCard(e, el)}>
                <Typography className="text-sm mb-2">{getDateKr(el.date.start)}</Typography>
                <Box className="flex justify-between min-w-[250px]">
                  <Box className="flex items-center mr-4">
                    <Typography className="mr-4">vs</Typography>
                    <Box className="relative w-[25px] h-[25px] mr-2">
                      <TeamLogo
                        code={getCardInfo(el).opponentTeamLogo}
                        alt="team-logo"
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </Box>
                    <Typography align="center" className="inline">
                      {getCardInfo(el).opponentTeamName}
                    </Typography>
                  </Box>
                  <Box className="flex items-center">
                    <Typography
                      variant="h6"
                      className={
                        getCardInfo(el).winOrLose === 'W'
                          ? WIN_OR_LOSE_COLOR.win
                          : WIN_OR_LOSE_COLOR.lose
                      }
                    >
                      {getCardInfo(el).winOrLose}
                    </Typography>
                    <Typography align="center" className="ml-2 w-[60px]">
                      {getCardInfo(el).point}
                    </Typography>
                  </Box>
                </Box>
              </CardActionArea>
            </Card>
          ))}
          {teamSchedule.length > cardCount && (
            <Card className="mb-3 min-w-[250px]">
              <CardActionArea className="p-4" onClick={() => LoadMore()}>
                <Typography align="center" className="text-sky-600">
                  더보기
                </Typography>
              </CardActionArea>
            </Card>
          )}
        </>
      )}
    </Box>
  );
};

export default TeamSchedule;
