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

import Image from "next/image";
import { ConferenceStandingResponseType } from "@/types/teams";

interface PropsType {
  teamStats: ConferenceStandingResponseType;
}

const TeamRank = ({ teamStats }: PropsType) => {
  const getTableInfo = () => {
    return [
      { head: "랭킹", info: teamStats?.conference.rank },
      {
        head: "승",
        info: teamStats?.conference.win,
      },
      { head: "패", info: teamStats?.conference.loss },
      { head: "승률", info: teamStats?.win.percentage },
      { head: "홈", info: teamStats?.win.home + "-" + teamStats?.win.home },
      { head: "원정", info: teamStats?.win.away + "-" + teamStats?.win.away },
      {
        head: "최근 10경기",
        info: teamStats?.streak + (teamStats?.winStreak ? "W" : "L"),
      },
      {
        head: "연속",
        info: teamStats?.win.lastTen + "-" + teamStats?.loss.lastTen,
      },
    ];
  };

  return (
    <Paper className="p-5 flex items-center">
      <Image
        className="mr-5"
        src={teamStats.team.logo}
        width={70}
        height={70}
        alt="tema-logo"
      />
      <Typography variant="h4">{teamStats.team.name}</Typography>
      <Box className="w-[70%] my-0 mx-auto">
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {getTableInfo().map((el) => {
                  return (
                    <TableCell key={el.head} align="center">
                      {el.head}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                {getTableInfo().map((el, idx) => {
                  return (
                    <TableCell key={el.head + el.info} align="center">
                      {el.info}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Paper>
  );
};

export default TeamRank;
