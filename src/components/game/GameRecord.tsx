import { Box, CircularProgress, List, Paper, Typography } from '@mui/material';
import { useGameStats } from '@/hooks/stats';
import { useRouter } from 'next/router';
import { GamePageQueryType } from '@/types/rotuerQuery';
import { GameStatsType } from '@/types/stats';
import { GAMES_RECORD } from '@/consts/table';
import TeamLogo from '../TeamLogo';
import Error from '../Error';
import Title from '../Title';

const GameRecord = () => {
  const { query } = useRouter();
  const gamePageQuery = query as GamePageQueryType;

  const { data: gameStats, isLoading } = useGameStats(gamePageQuery.id);

  const getGameRecordBarInfo = (stats: GameStatsType[]) => {
    const recordKey = Object.keys(GAMES_RECORD) as Array<keyof typeof GAMES_RECORD>;

    return recordKey.map((el) => ({
      title: GAMES_RECORD[el],
      home: stats[0].statistics[0][el],
      visitor: stats[1].statistics[0][el],
    }));
  };

  const getStatisticsRatio = (home: number, visitor: number) => {
    const sum = home + visitor;
    const homeRatio = Math.round((home / sum) * 100);
    const visitorRatio = Math.round((visitor / sum) * 100);
    return {
      home: `${homeRatio}%`,
      visitor: `${visitorRatio}%`,
    };
  };

  if (isLoading) {
    return (
      <Box className="flex justify-center items-center h-[550px] pb-7">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box className="mt-3">
      <Title text="경기 통계" />
      {!gameStats ? (
        <Error text="Error" height="h-30" />
      ) : (
        <Paper className="p-5">
          <Box className="flex justify-between">
            <Box className="flex items-center">
              <TeamLogo code={gameStats[0].team.code} alt="team-logo" width={30} height={30} />
              <Typography variant="h5" className="pl-3 font-bold">
                {gameStats[0].team.name}
              </Typography>
            </Box>
            <Box className="flex items-center">
              <Typography variant="h5" className="pr-3 font-bold">
                {gameStats[1].team.name}
              </Typography>
              <TeamLogo code={gameStats[1].team.code} width={30} height={30} alt="team-logo" />
            </Box>
          </Box>
          <Box className="pt-3">
            <List>
              {getGameRecordBarInfo(gameStats).map((el) => (
                <Box className="mb-3" key={el.title}>
                  <Box className="flex justify-center">
                    <Typography component="span" align="center" className="font-bold">
                      {el.home}
                    </Typography>
                    <Typography component="span" align="center" className="font-bold w-2/4">
                      {el.title}
                    </Typography>
                    <Typography component="span" align="center" className="font-bold">
                      {el.visitor}
                    </Typography>
                  </Box>
                  <Box className="py-1">
                    <Box className="w-2/4 bg-slate-300 h-3 rounded-l-lg inline-block">
                      <Box
                        sx={{
                          width: getStatisticsRatio(Number(el.home), Number(el.visitor)).home,
                        }}
                        className="bg-red-400 relative h-3 ml-auto rounded-l-lg"
                      />
                    </Box>
                    <Box className="w-2/4 bg-slate-300 h-3 rounded-r-lg inline-block">
                      <Box
                        sx={{
                          width: getStatisticsRatio(Number(el.home), Number(el.visitor)).visitor,
                        }}
                        className="bg-cyan-400 relative rounded-r-lg h-3 mr-auto"
                      />
                    </Box>
                  </Box>
                </Box>
              ))}
            </List>
          </Box>
        </Paper>
      )}
    </Box>
  );
};

export default GameRecord;
