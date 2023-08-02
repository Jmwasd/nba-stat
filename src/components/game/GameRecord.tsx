import { Box, List, Paper, Typography } from "@mui/material";
import gameStatistics from "@/data/gameStatistics.json";
import Title from "../Title";
import Image from "next/image";

interface Props {
  home: (typeof gameStatistics.response)[0];
  visitor: (typeof gameStatistics.response)[1];
}

const GameRecord = ({ home, visitor }: Props) => {
  const gameRecordBar = [
    {
      title: "점수",
      home: home.statistics[0].points,
      visitor: visitor.statistics[0].points,
    },
    {
      title: "필드골 비율(%)",
      home: home.statistics[0].fgp,
      visitor: visitor.statistics[0].fgp,
    },
    {
      title: "자유튜 확률(%)",
      home: home.statistics[0].ftp,
      visitor: visitor.statistics[0].ftp,
    },
    {
      title: "3점슛 확률(%)",
      home: home.statistics[0].tpp,
      visitor: visitor.statistics[0].tpp,
    },
    {
      title: "어시스트",
      home: home.statistics[0].assists,
      visitor: visitor.statistics[0].assists,
    },
    {
      title: "파울",
      home: home.statistics[0].pFouls,
      visitor: visitor.statistics[0].pFouls,
    },
    {
      title: "스틸",
      home: home.statistics[0].steals,
      visitor: visitor.statistics[0].steals,
    },
    {
      title: "턴오버",
      home: home.statistics[0].turnovers,
      visitor: visitor.statistics[0].turnovers,
    },
    {
      title: "블락",
      home: home.statistics[0].blocks,
      visitor: visitor.statistics[0].blocks,
    },
  ];

  return (
    <Box className="pt-3">
      <Title text="경기 통계" />
      <Paper className="p-5">
        <Box className="flex justify-between">
          <Box className="flex items-center">
            <Image
              src={home.team.logo}
              width={30}
              height={30}
              alt="team-logo"
            />
            <Typography variant="h5" className="pl-3 font-bold">
              {home.team.name}
            </Typography>
          </Box>
          <Box className="flex items-center">
            <Typography variant="h5" className="pr-3 font-bold">
              {visitor.team.name}
            </Typography>
            <Image
              src={visitor.team.logo}
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
