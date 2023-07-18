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

const QUATER = ["팀", "1Q", "2Q", "3Q", "4Q"];

interface Props {
  home: {
    lineScore: string[];
    response: (typeof gameStatistics.response)[0];
  };
  visitor: {
    lineScore: string[];
    response: (typeof gameStatistics.response)[1];
  };
}

const ScoreBoard = ({ home, visitor }: Props) => {
  const homeTableRow = home.lineScore.concat(home.response.team.logo).reverse();
  const visitorTableRow = visitor.lineScore
    .concat(visitor.response.team.logo)
    .reverse();
  return (
    <Paper className="flex items-center justify-center">
      <Box className="flex p-5">
        <Box className="flex items-center w-2/5">
          <Box className="flex justify-center pr-2">
            <Image
              src={home.response.team.logo}
              width={70}
              height={70}
              alt="home-team-logo"
            />
          </Box>
          <Typography variant="h4">{home.response.team.name}</Typography>
        </Box>
        <Box className="flex items-center px-10 py-3">
          <Typography variant="h3">
            {home.response.statistics[0].points}
          </Typography>
          <TableContainer className="px-10">
            <Table>
              <TableHead>
                <TableRow>
                  {QUATER.map((el) => (
                    <TD value={el} key={`head ${el}`} id={`head ${el}`} />
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  {homeTableRow.map((el, idx) => (
                    <TD
                      value={el}
                      key={`home ${QUATER[idx]}`}
                      id={`home ${QUATER[idx]}`}
                    />
                  ))}
                </TableRow>
                <TableRow>
                  {visitorTableRow.map((el, idx) => (
                    <TD
                      value={el}
                      key={`visitor ${QUATER[idx]}`}
                      id={`visitor ${QUATER[idx]}`}
                    />
                  ))}
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <Typography variant="h3">
            {visitor.response.statistics[0].points}
          </Typography>
        </Box>
        <Box className="flex items-center justify-end w-2/5">
          <Typography variant="h4" align="right">
            {visitor.response.team.name}
          </Typography>
          <Box className="flex justify-center">
            <Image
              src={visitor.response.team.logo}
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
  id: string;
}

const VERIFY_TD = /http(s)/;

const TD = ({ id, value }: TableCellType) => (
  <TableCell key={id} align="center" size="small" className="p-3">
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
