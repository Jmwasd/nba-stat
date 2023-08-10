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
import { PlayerPerTeamResponseType } from "@/types/players";

interface Props {
  playerPerTeam: PlayerPerTeamResponseType;
}

const TeamPlayer = ({ playerPerTeam }: Props) => {
  const filterPlayerData = (data: typeof playerPerTeam) =>
    data.filter((el) => {
      if (!el.birth.date || !el.nba.start || !el.leagues.standard.jersey) {
        return false;
      }
      return true;
    });

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
              {filterPlayerData(playerPerTeam).map((el) => {
                return (
                  <TableRow hover key={el.id} className="cursor-pointer">
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
