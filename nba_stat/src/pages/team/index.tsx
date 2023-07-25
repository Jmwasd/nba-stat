import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import teamStatistics from "@/data/teamStatistics.json";
import playerPerTeam from "@/data/playerPerTeam.json";
import HawksLogo from "../../assets/teamLogo/Hawks.png";
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
        <Box>
          <TeamStats />
          <TeamPlayer />
        </Box>
      </Box>
    </Box>
  );
};

export default TeamStatistics;
