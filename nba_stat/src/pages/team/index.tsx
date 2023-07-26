import { Box } from "@mui/material";
import playerPerTeam from "@/data/playerPerTeam.json";
import TeamRank from "@/components/team/TeamRank";
import TeamStats from "@/components/team/TeamStats";
import TeamSchedule from "@/components/team/TeamSchedule";
import TeamPlayer from "@/components/team/TeamPlayer";

const TeamStatistics = () => {
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
    </Box>
  );
};

export default TeamStatistics;
