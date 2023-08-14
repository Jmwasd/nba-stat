import { Box } from "@mui/material";

import ScoreBoard from "@/components/game/ScoreBoard";
import PlayerStat from "@/components/game/PlayerStat";
import GameRecord from "@/components/game/GameRecord";

const GameStatistics = () => {
  return (
    <Box>
      <ScoreBoard />
      <GameRecord />
      <PlayerStat />
    </Box>
  );
};

export default GameStatistics;
