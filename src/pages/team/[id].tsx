import { Box } from '@mui/material';
import TeamRank from '@/components/team/TeamRank';
import TeamStats from '@/components/team/TeamStats';
import TeamSchedule from '@/components/team/TeamSchedule';
import TeamPlayer from '@/components/team/TeamPlayer';
import PlayerDetailStats from '@/components/PlayerDetailStats';
import usePlayerInfo from '@/store/playerDetailStats';

const TeamStatistics = () => {
  const open = usePlayerInfo((state) => state.open);
  return (
    <Box>
      <TeamRank />
      <Box className="flex pt-3">
        <TeamSchedule />
        <Box className="w-[80%]">
          <TeamStats />
          <TeamPlayer />
        </Box>
      </Box>
      {open && <PlayerDetailStats />}
    </Box>
  );
};

export default TeamStatistics;
