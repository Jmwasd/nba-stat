import { Box, Card, Typography } from "@mui/material";
import Image from "next/image";

import Title from "../Title";

import teamScheduleData from "@/data/teamSchedule.json";
const TEAM_NAME = "Atlanta Hawks";

const TeamSchedule = () => {
  const getCardInfo = (stats: (typeof teamScheduleData.response)[0]) => {
    const selectedTeam: "visitors" | "home" =
      stats.teams.home.name === TEAM_NAME ? "home" : "visitors";
    const opponentTeam: "visitors" | "home" =
      stats.teams.home.name !== TEAM_NAME ? "home" : "visitors";
    const winOrLose =
      stats.scores[selectedTeam].points > stats.scores[opponentTeam].points
        ? "W"
        : "L";

    const point =
      stats.scores[selectedTeam].points +
      "-" +
      stats.scores[opponentTeam].points;

    return {
      opponentTeamName: stats.teams[opponentTeam].name,
      opponentTeamLogo: stats.teams[opponentTeam].logo,
      point,
      winOrLose,
    };
  };

  const getDateKr = (date: string) => {
    const dates = new Date(date);
    const year = dates.getFullYear();
    const month = dates.getMonth() + 1;
    const day = dates.getDay();

    return year + "년 " + month + "월 " + day + "일";
  };

  return (
    <Box className="mr-7">
      <Title text="팀 일정" />
      {teamScheduleData.response.reverse().map((el) => {
        return (
          <Card className="p-4 mb-3" key={el.id}>
            <Typography className="text-sm mb-2">
              {getDateKr(el.date.start)}
            </Typography>
            <Box className="flex">
              <Box className="flex items-center mr-4">
                <Typography className="mr-4">vs</Typography>
                <Box className="relative w-[25px] h-[25px] mr-2">
                  <Image
                    src={getCardInfo(el).opponentTeamLogo}
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
                    getCardInfo(el).winOrLose === "W"
                      ? getWinOrLoseColor.win
                      : getWinOrLoseColor.lose
                  }
                >
                  {getCardInfo(el).winOrLose}
                </Typography>
                <Typography>{getCardInfo(el).point}</Typography>
              </Box>
            </Box>
          </Card>
        );
      })}
    </Box>
  );
};

export default TeamSchedule;

const getWinOrLoseColor = {
  win: "text-teal-500 inline mr-2",
  lose: "text-pink-500 inline mr-2",
};
