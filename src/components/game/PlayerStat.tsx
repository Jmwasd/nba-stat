import {
  Box,
  Paper,
  Tab,
  Tabs,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  CircularProgress,
} from '@mui/material';
import { useState } from 'react';
import { PLAYER_STATS } from '@/consts/table';
import { useRouter } from 'next/router';
import { usePlayerStats } from '@/queries/stats';
import { GamePageQueryType } from '@/types/rotuerQuery';
import { PlayerStatsType } from '@/types/stats';
import usePlayerInfo from '@/store/playerDetailStats';
import Title from '../Title';
import Error from '../Error';

const TABLE_CELL: ('start' | 'bench')[] = ['start', 'bench'];

type TabType = 'home' | 'visitor';

const PlayerStat = () => {
  const { query } = useRouter();
  const { homeTeamName, visitorTeamName, id } = query as GamePageQueryType;

  const [tabValue, setTabValue] = useState<TabType>('home');

  const { data: playerStats, isLoading } = usePlayerStats(id);
  const [setPlayerModal, setPlayerInfo] = usePlayerInfo((state) => [
    state.openModal,
    state.setPlayerInfo,
  ]);

  const handlePlayerModal = (player: PlayerStatsType) => {
    const playerInfo = {
      id: player.player.id,
      pos: player.pos as string,
    };

    setPlayerModal();
    setPlayerInfo(playerInfo);
  };

  const handleTab = (e: React.SyntheticEvent, newValue: TabType) => {
    setTabValue(newValue);
  };

  const changeKr = (lang: 'start' | 'bench') => (lang === 'start' ? '선발 라인업' : '벤치 라인업');

  const getDividedLineUp = (
    player: PlayerStatsType[],
    type: (typeof TABLE_CELL)[0] | (typeof TABLE_CELL)[1],
  ) => {
    let team: string;
    if (tabValue === 'home') {
      team = homeTeamName;
    } else {
      team = visitorTeamName;
    }

    const isPlayerInTeam = player.filter((el) => el.team.name === team);
    const startLineUp = isPlayerInTeam.slice(0, 5);
    const bench = isPlayerInTeam.slice(5, isPlayerInTeam.length);
    if (type === 'start') {
      return startLineUp;
    }
    return bench;
  };

  if (isLoading) {
    return (
      <Box className="flex justify-center items-center h-[150px] pb-7">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box className="pt-3">
      <Title text="선수 통계" />
      {!playerStats ? (
        <Error text="Error" height="h-40" />
      ) : (
        <Paper className="p-5">
          <Tabs value={tabValue} onChange={handleTab}>
            <Tab label={homeTeamName} value="home" />
            <Tab label={visitorTeamName} value="visitor" />
          </Tabs>
          <TableContainer className="p-4">
            {TABLE_CELL.map((lineUp) => (
              <Table key={lineUp} sx={{ minWidth: 1000 }}>
                <TableHead className="bg-table-head">
                  <TableRow>
                    <TableCell className="min-w-[220px]">{changeKr(lineUp)}</TableCell>
                    {PLAYER_STATS.map((el) => (
                      <TableCell key={el} align="center">
                        {el}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {getDividedLineUp(playerStats, lineUp).map((el) => (
                    <TableRow
                      hover
                      key={el.player.id}
                      className="cursor-pointer"
                      onClick={() => handlePlayerModal(el)}
                    >
                      <TableCell className="flex">
                        {el.player.firstname + el.player.lastname}
                        &nbsp;
                        <Typography variant="caption" align="center">
                          {el.pos}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">{el.points}</TableCell>
                      <TableCell align="center">{`${el.min}분`}</TableCell>
                      <TableCell align="center">{el.fgp}</TableCell>
                      <TableCell align="center">{el.ftp}</TableCell>
                      <TableCell align="center">{el.totReb}</TableCell>
                      <TableCell align="center">{el.assists}</TableCell>
                      <TableCell align="center">{el.pFouls}</TableCell>
                      <TableCell align="center">{el.steals}</TableCell>
                      <TableCell align="center">{el.turnovers}</TableCell>
                      <TableCell align="center">{el.blocks}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ))}
          </TableContainer>
        </Paper>
      )}
    </Box>
  );
};

export default PlayerStat;
