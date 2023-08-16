import {
  Box,
  CircularProgress,
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
import { QUATER } from "@/consts/table";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { setGameStats } from "@/hooks/stats";
import { GamePageQueryType } from "@/types/rotuerQuery";

const ScoreBoard = () => {
  const { query } = useRouter();
  const queryUnit = query as GamePageQueryType;

  const { data: gameStats, isLoading } = setGameStats(queryUnit.id);

  const getLineScore = () => {
    if (gameStats) {
      const homeLineScore = queryUnit.homeLineScore
        .concat(gameStats[0].team.logo)
        .reverse();
      const visitorLineScore = queryUnit.visitorLineScore
        .concat(gameStats[1].team.logo)
        .reverse();

      return {
        home: homeLineScore,
        visitor: visitorLineScore,
      };
    }
  };

  const gameStatsResponse = useMemo(() => {
    if (!gameStats) return null;
    return {
      home: gameStats[0],
      visitor: gameStats[1],
    };
  }, [gameStats]);

  if (isLoading) {
    return (
      <Box className="flex justify-center items-center h-[150px] pb-7">
        <CircularProgress />
      </Box>
    );
  }

  if (!gameStatsResponse) {
    return <Box>데이터가 없습니다.</Box>;
  }
  return (
    <Paper className="flex items-center justify-center">
      <Box className="flex p-5">
        <Box className="flex items-center w-2/5">
          <Box className="flex justify-center pr-2">
            <Image
              src={gameStatsResponse?.home.team.logo}
              width={70}
              height={70}
              alt="home-team-logo"
            />
          </Box>
          <Typography variant="h4">
            {gameStatsResponse?.home.team.name}
          </Typography>
        </Box>
        <Box className="flex items-center px-10 py-3">
          <Typography variant="h3">
            {gameStatsResponse?.home.statistics[0].points}
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
                  {getLineScore()?.home.map((el, idx) => (
                    <TD
                      value={el}
                      key={`home ${QUATER[idx]}`}
                      id={`home ${QUATER[idx]}`}
                    />
                  ))}
                </TableRow>
                <TableRow>
                  {getLineScore()?.visitor.map((el, idx) => (
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
            {gameStatsResponse.visitor.statistics[0].points}
          </Typography>
        </Box>
        <Box className="flex items-center justify-end w-2/5">
          <Typography variant="h4" align="right">
            {gameStatsResponse.visitor.team.name}
          </Typography>
          <Box className="flex justify-center">
            <Image
              src={gameStatsResponse.visitor.team.logo}
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
