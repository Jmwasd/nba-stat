import { Box, CircularProgress, List, Paper, Typography } from "@mui/material";
import Title from "../Title";
import { useGameStats } from "@/hooks/stats";
import { useRouter } from "next/router";
import { GamePageQueryType } from "@/types/rotuerQuery";
import TeamLogo from "../TeamLogo";
import Error from "../Error";
import { GameStatsType } from "@/types/stats";

const GameRecord = () => {
  const { query } = useRouter();
  const queryUnit = query as GamePageQueryType;

  const { data: gameStats, isLoading } = useGameStats(queryUnit.id);

  const getGameRecordBarInfo = (stats: GameStatsType[]) => {
    return [
      {
        title: "점수",
        home: stats[0].statistics[0].points,
        visitor: stats[1].statistics[0].points,
      },
      {
        title: "필드골 비율(%)",
        home: stats[0].statistics[0].fgp,
        visitor: stats[1].statistics[0].fgp,
      },
      {
        title: "자유튜 확률(%)",
        home: stats[0].statistics[0].ftp,
        visitor: stats[1].statistics[0].ftp,
      },
      {
        title: "3점슛 확률(%)",
        home: stats[0].statistics[0].tpp,
        visitor: stats[1].statistics[0].tpp,
      },
      {
        title: "어시스트",
        home: stats[0].statistics[0].assists,
        visitor: stats[1].statistics[0].assists,
      },
      {
        title: "파울",
        home: stats[0].statistics[0].pFouls,
        visitor: stats[1].statistics[0].pFouls,
      },
      {
        title: "스틸",
        home: stats[0].statistics[0].steals,
        visitor: stats[1].statistics[0].steals,
      },
      {
        title: "턴오버",
        home: stats[0].statistics[0].turnovers,
        visitor: stats[1].statistics[0].turnovers,
      },
      {
        title: "블락",
        home: stats[0].statistics[0].blocks,
        visitor: stats[1].statistics[0].blocks,
      },
    ];
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
              <TeamLogo
                code={gameStats[0].team.code}
                alt="team-logo"
                width={30}
                height={30}
              />
              <Typography variant="h5" className="pl-3 font-bold">
                {queryUnit.homeTeamName}
              </Typography>
            </Box>
            <Box className="flex items-center">
              <Typography variant="h5" className="pr-3 font-bold">
                {queryUnit.visitorTeamName}
              </Typography>
              <TeamLogo
                code={gameStats[1].team.code}
                width={30}
                height={30}
                alt="team-logo"
              />
            </Box>
          </Box>
          <Box className="pt-3">
            <List>
              {getGameRecordBarInfo(gameStats).map((el) => (
                <Box className="mb-3" key={el.title}>
                  <Box className="flex justify-center">
                    <Typography
                      component="span"
                      align="center"
                      className="font-bold"
                    >
                      {el.home}
                    </Typography>
                    <Typography
                      component="span"
                      align="center"
                      className="font-bold w-2/4"
                    >
                      {el.title}
                    </Typography>
                    <Typography
                      component="span"
                      align="center"
                      className="font-bold"
                    >
                      {el.visitor}
                    </Typography>
                  </Box>
                  <Box className="py-1">
                    <Box className="w-2/4 bg-slate-300 h-3 rounded-l-lg inline-block">
                      <Box
                        sx={{
                          width: getStatisticsRatio(
                            Number(el.home),
                            Number(el.visitor)
                          ).home,
                        }}
                        className="bg-red-400 relative h-3 ml-auto rounded-l-lg"
                      />
                    </Box>
                    <Box className="w-2/4 bg-slate-300 h-3 rounded-r-lg inline-block">
                      <Box
                        sx={{
                          width: getStatisticsRatio(
                            Number(el.home),
                            Number(el.visitor)
                          ).visitor,
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

const getStatisticsRatio = (home: number, visitor: number) => {
  const sum = home + visitor;
  const homeRatio = Math.round((home / sum) * 100);
  const visitorRatio = Math.round((visitor / sum) * 100);
  return {
    home: `${homeRatio}%`,
    visitor: `${visitorRatio}%`,
  };
};
