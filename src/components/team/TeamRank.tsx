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
  conferenceStanding: ConferenceStandingResponseType;
}

const TeamRank = ({ conferenceStanding }: PropsType) => {
  const getTableInfo = () => {
    return [
      { head: "랭킹", info: conferenceStanding?.conference.rank },
      {
        head: "승",
        info: conferenceStanding?.conference.win,
      },
      { head: "패", info: conferenceStanding?.conference.loss },
      { head: "승률", info: conferenceStanding?.win.percentage },
      {
        head: "홈",
        info: conferenceStanding?.win.home + "-" + conferenceStanding?.win.home,
      },
      {
        head: "원정",
        info: conferenceStanding?.win.away + "-" + conferenceStanding?.win.away,
      },
      {
        head: "최근 10경기",
        info:
          conferenceStanding?.streak +
          (conferenceStanding?.winStreak ? "W" : "L"),
      },
      {
        head: "연속",
        info:
          conferenceStanding?.win.lastTen +
          "-" +
          conferenceStanding?.loss.lastTen,
      },
    ];
  };

  return (
    <Paper className="p-5 flex items-center">
      <Image
        className="mr-5"
        src={conferenceStanding.team.logo}
        width={70}
        height={70}
        alt="tema-logo"
      />
      <Typography variant="h4">{conferenceStanding.team.name}</Typography>
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
