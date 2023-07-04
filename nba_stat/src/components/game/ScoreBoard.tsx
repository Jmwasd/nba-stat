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
import gameStatistics from "@/data/gameStatistics.json";
import Image from "next/image";

const HOME_LINE_SCORE = [
  gameStatistics.response[0].team.logo,
  "27",
  "28",
  "24",
  "20",
];
const VISITOR_LINE_SCORE = [
  gameStatistics.response[1].team.logo,
  "27",
  "28",
  "24",
  "20",
];
const QUATER = ["팀", "1Q", "2Q", "3Q", "4Q"];

const ScoreBoard = () => {
  return (
    <Paper className="flex items-center justify-center">
      <Box className="flex p-5">
        <Box className="flex items-center w-2/5">
          <Box className="flex justify-center pr-2">
            <Image
              src={gameStatistics.response[0].team.logo}
              width={70}
              height={70}
              alt="home-team-logo"
            />
          </Box>
          <Typography variant="h4">
            {gameStatistics.response[0].team.name}
          </Typography>
        </Box>
        <Box className="flex items-center px-10 py-3">
          <Typography variant="h3">
            {gameStatistics.response[0].statistics[0].points}
          </Typography>
          <TableContainer className="px-10">
            <Table>
              <TableHead>
                <TableRow>
                  {QUATER.map((el, idx) => (
                    <TD value={el} key={idx} />
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  {HOME_LINE_SCORE.map((el, idx) => (
                    <TD value={el} key={idx} />
                  ))}
                </TableRow>
                <TableRow>
                  {VISITOR_LINE_SCORE.map((el, idx) => (
                    <TD value={el} key={idx} />
                  ))}
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <Typography variant="h3">
            {gameStatistics.response[1].statistics[0].points}
          </Typography>
        </Box>
        <Box className="flex items-center justify-end w-2/5">
          <Typography variant="h4" align="right">
            {gameStatistics.response[1].team.name}
          </Typography>
          <Box className="flex justify-center">
            <Image
              src={gameStatistics.response[1].team.logo}
              width={70}
              height={70}
              alt="home-team-logo"
            />
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};

export default ScoreBoard;

interface TableCellType {
  value: string;
  key: number;
}

const VERIFY_TD = /http(s)/;

const TD = ({ value, key }: TableCellType) => (
  <TableCell key={key} align="center" size="small" className="p-3">
    {VERIFY_TD.test(value) ? (
      <Box className="w-[17px] h-[17px]">
        <Image
          src={value}
          width="0"
          height="0"
          alt="team-logo"
          sizes="100vw"
          className="w-full h-auto"
        />
      </Box>
    ) : (
      value
    )}
  </TableCell>
);
