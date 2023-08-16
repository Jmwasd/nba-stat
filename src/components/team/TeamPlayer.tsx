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
import { setTeamPlayer } from "@/hooks/teams";
import { useRouter } from "next/router";
import { TeamPageQueryType } from "@/types/rotuerQuery";
import Loading from "../Loading";

const TeamPlayer = () => {
  const { query } = useRouter();
  const queryUnit = query as TeamPageQueryType;

  const { data: playerPerTeam, isLoading } = setTeamPlayer(queryUnit.id);

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
