import { Box } from '@mui/material';

import ScoreBoard from '@/components/game/ScoreBoard';
import PlayerStat from '@/components/game/PlayerStat';
import GameRecord from '@/components/game/GameRecord';
import usePlayerInfo from '@/store/playerDetailStats';
import PlayerDetailStats from '@/components/PlayerDetailStats';

const GameStatistics = () => {
  const open = usePlayerInfo((state) => state.open);
  return (
    <Box>
      <ScoreBoard />
      <GameRecord />
      <PlayerStat />
      {open && <PlayerDetailStats />}
    </Box>
  );
};

export default GameStatistics;
