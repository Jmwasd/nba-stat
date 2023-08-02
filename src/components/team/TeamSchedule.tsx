import { Box, Card, CardActionArea, Typography } from "@mui/material";
import Image from "next/image";

import Title from "../Title";

import teamScheduleData from "@/data/teamSchedule.json";
import { TeamScheduleType } from "@/types/games";
import { useState } from "react";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";

interface PropsType {
  teamSchedule: TeamScheduleType;
}

type teamScheduleType = (typeof teamScheduleData.response)[0];

interface CardCountType {
  current: number;
  max: number;
}

interface TeamQueryType extends ParsedUrlQuery {
  conferenceName: string;
  id: string;
}

const SLICE_COUNT = 12;

const TeamSchedule = ({ teamSchedule }: PropsType) => {
  const { query } = useRouter();
  const queryUnit = query as TeamQueryType;

  const [teamScheduleState, setTeamScheduleState] = useState<
    Array<teamScheduleType>
  >(teamSchedule.response.reverse().slice(0, SLICE_COUNT));

  const [cardCount, setCardCount] = useState<CardCountType>({
    current: SLICE_COUNT,
    max: teamSchedule.response.length,
  });

  const getCardInfo = (stats: teamScheduleType) => {
    const selectedTeam: "visitors" | "home" =
      stats.teams.home.id === Number(queryUnit.id) ? "home" : "visitors";
    const opponentTeam: "visitors" | "home" =
      stats.teams.home.id !== Number(queryUnit.id) ? "home" : "visitors";
    const winOrLose =
      stats.scores[selectedTeam].points > stats.scores[opponentTeam].points
        ? "W"
        : "L";

    const point =
      stats.scores[selectedTeam].points +
      "-" +
      stats.scores[opponentTeam].points;

    return {
      opponentTeamName: stats.teams[opponentTeam].nickname,
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

  const LoadMore = () => {
    const sliceCount = cardCount.current + 5;
    setCardCount((prev) => ({
      ...prev,
      current: (prev.current += 5),
    }));
    const moreData = teamSchedule.response.slice(0, sliceCount);
    setTeamScheduleState(moreData);
  };

  const hideMoreBtn = () => {
    if (cardCount.current >= cardCount.max) {
      return true;
    }
    return false;
  };

  return (
    <Box className="mr-7">
      <Title text="팀 일정" />
      {teamScheduleState.map((el) => {
        return (
          <Card className="p-4 mb-3" key={el.id}>
            <Typography className="text-sm mb-2">
              {getDateKr(el.date.start)}
            </Typography>
            <Box className="flex justify-between min-w-[250px]">
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
                <Typography align="center" className="ml-2 w-[60px]">
                  {getCardInfo(el).point}
                </Typography>
              </Box>
            </Box>
          </Card>
        );
      })}
      {!hideMoreBtn() && (
        <Card className="mb-3 min-w-[250px]">
          <CardActionArea className="p-4" onClick={() => LoadMore()}>
            <Typography align="center" className="text-sky-600">
              더보기
            </Typography>
          </CardActionArea>
        </Card>
      )}
    </Box>
  );
};

export default TeamSchedule;

const getWinOrLoseColor = {
  win: "text-teal-500 inline",
  lose: "text-pink-500 inline",
};
