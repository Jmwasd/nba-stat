import {
  Box,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { QUATER } from '@/consts/table';
import { useRouter } from 'next/router';
import { MouseEvent, useMemo } from 'react';
import { useGameStats } from '@/hooks/stats';
import { GamePageQueryType } from '@/types/rotuerQuery';
import TeamLogo from '../TeamLogo';
import Error from '../Error';
import ScoreBoardTableCell from '../ScoreBoardTableCell';

const ScoreBoard = () => {
  const router = useRouter();
  const gamePageQuery = router.query as GamePageQueryType;

  const { data: gameStats, isLoading } = useGameStats(gamePageQuery.id);

  const gameStatsResponse = useMemo(() => {
    if (!gameStats) return null;
    return {
      home: gameStats[0],
      visitor: gameStats[1],
    };
  }, [gameStats]);

  const getLineScore = () => {
    if (gameStatsResponse) {
      const homeLineScore = gamePageQuery.homeLineScore
        .concat(gameStatsResponse.home.team.code)
        .reverse();
      const visitorLineScore = gamePageQuery.visitorLineScore
        .concat(gameStatsResponse.visitor.team.code)
        .reverse();

      return {
        home: homeLineScore,
        visitor: visitorLineScore,
      };
    }
    return null;
  };

  const clickTableRow = (e: MouseEvent<HTMLElement>, teamId: number) => {
    e.preventDefault();
    router.push({
      pathname: `/team/${teamId}`,
    });
  };

  if (isLoading) {
    return (
      <Box className="flex justify-center items-center h-[150px] pb-7">
        <CircularProgress />
      </Box>
    );
  }

  return !gameStatsResponse ? (
    <Error text="Error" height="h-40" />
  ) : (
    <Paper className="flex items-center justify-center">
      <Box className="flex p-5">
        <Box className="flex items-center w-2/5">
          <Box className="flex justify-center pr-2">
            <TeamLogo
              code={gameStatsResponse.home.team.code}
              width={70}
              height={70}
              alt="home-team-logo"
            />
          </Box>
          <Typography
            variant="h4"
            className="hover:text-sky-800 cursor-pointer"
            onClick={(e) => clickTableRow(e, gameStatsResponse.home.team.id)}
          >
            {gameStatsResponse?.home.team.name}
          </Typography>
        </Box>
        <Box className="flex items-center px-10 py-3">
          <Typography variant="h3">{gameStatsResponse?.home.statistics[0].points}</Typography>
          <TableContainer className="px-10">
            <Table>
              <TableHead>
                <TableRow>
                  {QUATER.map((el) => (
                    <ScoreBoardTableCell value={el} key={`head ${el}`} id={`head ${el}`} />
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  {getLineScore()?.home.map((el, idx) => (
                    <ScoreBoardTableCell
                      value={el}
                      key={`home ${QUATER[idx]}`}
                      id={`home ${QUATER[idx]}`}
                    />
                  ))}
                </TableRow>
                <TableRow>
                  {getLineScore()?.visitor.map((el, idx) => (
                    <ScoreBoardTableCell
                      value={el}
                      key={`visitor ${QUATER[idx]}`}
                      id={`visitor ${QUATER[idx]}`}
                    />
                  ))}
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <Typography variant="h3">{gameStatsResponse.visitor.statistics[0].points}</Typography>
        </Box>
        <Box className="flex items-center justify-end w-2/5">
          <Typography
            variant="h4"
            align="right"
            className="hover:text-sky-800 cursor-pointer"
            onClick={(e) => clickTableRow(e, gameStatsResponse.visitor.team.id)}
          >
            {gameStatsResponse.visitor.team.name}
          </Typography>
          <Box className="flex justify-center">
            <TeamLogo
              code={gameStatsResponse.visitor.team.code}
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
