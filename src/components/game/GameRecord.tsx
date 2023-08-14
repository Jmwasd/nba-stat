import { Box, CircularProgress, List, Paper, Typography } from "@mui/material";
import Title from "../Title";
import Image from "next/image";
import { setGameStats } from "@/hooks/stats";
import { useRouter } from "next/router";
import { GamePageType } from "@/types/rotuerQuery";

const GameRecord = () => {
  const { query } = useRouter();
  const queryUnit = query as GamePageType;

  const { data: gameStats, isLoading } = setGameStats(queryUnit.id);

  if (isLoading) {
    return (
      <Box className="flex justify-center items-center h-[550px] pb-7">
        <CircularProgress />
      </Box>
    );
  }

  if (!gameStats) {
    return <Box>go to 404 page</Box>;
  }

  const gameRecordBar = [
    {
      title: "점수",
      home: gameStats[0].statistics[0].points,
      visitor: gameStats[1].statistics[0].points,
    },
    {
      title: "필드골 비율(%)",
      home: gameStats[0].statistics[0].fgp,
      visitor: gameStats[1].statistics[0].fgp,
    },
    {
      title: "자유튜 확률(%)",
      home: gameStats[0].statistics[0].ftp,
      visitor: gameStats[1].statistics[0].ftp,
    },
    {
      title: "3점슛 확률(%)",
      home: gameStats[0].statistics[0].tpp,
      visitor: gameStats[1].statistics[0].tpp,
    },
    {
      title: "어시스트",
      home: gameStats[0].statistics[0].assists,
      visitor: gameStats[1].statistics[0].assists,
    },
    {
      title: "파울",
      home: gameStats[0].statistics[0].pFouls,
      visitor: gameStats[1].statistics[0].pFouls,
    },
    {
      title: "스틸",
      home: gameStats[0].statistics[0].steals,
      visitor: gameStats[1].statistics[0].steals,
    },
    {
      title: "턴오버",
      home: gameStats[0].statistics[0].turnovers,
      visitor: gameStats[1].statistics[0].turnovers,
    },
    {
      title: "블락",
      home: gameStats[0].statistics[0].blocks,
      visitor: gameStats[1].statistics[0].blocks,
    },
  ];

  return (
    <Box className="pt-3">
      <Title text="경기 통계" />
      <Paper className="p-5">
        <Box className="flex justify-between">
          <Box className="flex items-center">
            <Image
              src={gameStats[0].team.logo}
              width={30}
              height={30}
              alt="team-logo"
            />
            <Typography variant="h5" className="pl-3 font-bold">
              {queryUnit.homeTeamName}
            </Typography>
          </Box>
          <Box className="flex items-center">
            <Typography variant="h5" className="pr-3 font-bold">
              {queryUnit.visitorTeamName}
            </Typography>
            <Image
              src={gameStats[1].team.logo}
              width={30}
              height={30}
              alt="team-logo"
            />
          </Box>
        </Box>
        <Box className="pt-3">
          <List>
            {gameRecordBar.map((el) => (
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
