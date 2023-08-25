import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Title from "../Title";

import { TEAM_PLAYER } from "@/consts/table";
import { useTeamPlayer } from "@/hooks/teams";
import { useRouter } from "next/router";
import { TeamPageQueryType } from "@/types/rotuerQuery";
import Loading from "../Loading";
import usePlayerInfo from "@/store/playerDetailStats";
import { PlayerPerTeamType } from "@/types/players";

const TeamPlayer = () => {
  const { query } = useRouter();
  const queryUnit = query as TeamPageQueryType;

  const { data: playerPerTeam, isLoading } = useTeamPlayer(queryUnit.id);
  const [setPlayerModal, setPlayerInfo] = usePlayerInfo((state) => [
    state.openModal,
    state.setPlayerInfo,
  ]);

  const handlePlayerModal = (player: PlayerPerTeamType) => {
    const playerInfo = {
      id: player.id,
      pos: player.leagues.standard.pos,
    };

    setPlayerModal();
    setPlayerInfo(playerInfo);
  };

  if (isLoading) {
    return <Loading height="h-[500px]" />;
  }

  if (!playerPerTeam) {
    return <Box>go to 404 page</Box>;
  }

  return (
    <Box className="pt-3">
      <Title text="선수" />
      <Paper className="p-5">
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {TEAM_PLAYER.map((el) => (
                  <TableCell align="center" key={el}>
                    {el}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {playerPerTeam.map((el) => {
                return (
                  <TableRow
                    hover
                    key={el.id}
                    className="cursor-pointer"
                    onClick={() => handlePlayerModal(el)}
                  >
                    <TableCell align="center">
                      {el.firstname + el.lastname}
                    </TableCell>
                    <TableCell align="center">{el.birth.date}</TableCell>
                    <TableCell align="center">{el.nba.start}</TableCell>
                    <TableCell align="center">
                      {el.leagues.standard.jersey}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default TeamPlayer;
