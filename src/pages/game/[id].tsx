import { Box } from '@mui/material';

import ScoreBoard from '@/components/game/ScoreBoard';
import PlayerStat from '@/components/game/PlayerStat';
import GameRecord from '@/components/game/GameRecord';
import usePlayerInfo from '@/store/playerDetailStats';
import PlayerDetailStats from '@/components/PlayerDetailStats';
import UseMediaQuery from '@/hooks/useMediaQuery';
import MoScoreBoard from '@/components/game/mobile/MoScoreBoard';

const MD = 970;

const GameStatistics = () => {
  const open = usePlayerInfo((state) => state.open);
  const mediaQuery = UseMediaQuery({ callback: null });
  return (
    <Box>
      {mediaQuery.width > MD ? <ScoreBoard /> : <MoScoreBoard />}
      <GameRecord />
      <PlayerStat />
      {open && <PlayerDetailStats />}
    </Box>
  );
};

export default GameStatistics;
