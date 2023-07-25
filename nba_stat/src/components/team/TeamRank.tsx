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
import HawksLogo from "../../assets/teamLogo/Hawks.png";

const TAEM_STATS = ["8", "41", "41", "0.500", "24-17", "17-24", "2L", "5-5"];
const TABLE_HEAD = [
  "랭킹",
  "승",
  "패",
  "승률",
  "홈",
  "원정",
  "최근 10경기",
  "연속",
];
const TEAM_NAME = "Atlanta Hwaks";

const TeamRank = () => {
  return (
    <Paper className="p-5 flex items-center">
      <Image
        className="mr-5"
        src={HawksLogo}
        width={70}
        height={70}
        alt="tema-logo"
      />
      <Typography variant="h4">{TEAM_NAME}</Typography>
      <Box className="w-[70%] my-0 mx-auto">
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {TABLE_HEAD.map((el) => {
                  return (
                    <TableCell key={el} align="center">
                      {el}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                {TAEM_STATS.map((el, idx) => {
                  return (
                    <TableCell key={TABLE_HEAD[idx] + el} align="center">
                      {el}
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
