import { Box } from "@mui/material";
import recentMatchData from "@/data/recentMatch.json";

import ScoreBoard from "@/components/game/ScoreBoard";
import GameRecord from "@/components/game/GameRecord";
import PlayerStat from "@/components/game/PlayerStat";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { instance } from "@/config/api";

import gameStatistics from "@/data/gameStatistics.json";
import playerStatisctics from "@/data/playerStatistics.json";

interface GameQueryType extends ParsedUrlQuery {
  homeLineScore: string[];
  visitorLineScore: string[];
  id: string;
}

const GameStatistics = ({
  game,
  player,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { query } = useRouter();
  const queryUnit = query as GameQueryType;

  return (
    <Box>
      <ScoreBoard
        home={{
          lineScore: queryUnit.homeLineScore,
          response: game.response[0],
        }}
        visitor={{
          lineScore: queryUnit.visitorLineScore,
          response: game.response[1],
        }}
      />
      <GameRecord home={game.response[0]} visitor={game.response[1]} />
      <PlayerStat
        player={player.response}
        teamName={{
          home: game.response[0].team.name,
          visitor: game.response[1].team.name,
        }}
      />
    </Box>
  );
};

export default GameStatistics;

interface StatisticsProps {
  game: typeof gameStatistics;
  player: typeof playerStatisctics;
}

export const getServerSideProps: GetServerSideProps<StatisticsProps> = async ({
  query,
}) => {
  const gameStatisticsResponse = await instance.get<typeof gameStatistics>(
    `/games/statistics?id=${query.id}`
  );
  const playerStatisticsReponse = await instance.get<typeof playerStatisctics>(
    `/players/statistics?game=${query.id}`
  );
  return {
    props: {
      game: gameStatisticsResponse.data,
      player: playerStatisticsReponse.data,
    },
  };
};
