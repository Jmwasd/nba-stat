import { Box } from "@mui/material";
import recentMatchData from "@/data/recentMatch.json";

import ScoreBoard from "@/components/game/ScoreBoard";
import GameRecord from "@/components/game/GameRecord";
import PlayerStat from "@/components/game/PlayerStat";

const GameStatistics = () => {
  const gamePoint = {
    home: recentMatchData.response[0].scores.home.points,
    visitor: recentMatchData.response[0].scores.visitors.points,
  };
  return (
    <Box>
      <ScoreBoard />
      <GameRecord point={gamePoint} />
      <PlayerStat />
    </Box>
  );
};

export default GameStatistics;
