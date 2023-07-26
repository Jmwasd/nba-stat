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

import playerPerTeamData from "@/data/playerPerTeam.json";

const TABLE_HEAD = ["이름", "출생", "시작연도", "등번호"];

const TeamPlayer = () => {
  const filterPlayerData = (data: typeof playerPerTeamData.response) => {
    return data.filter((el) => {
      if (!el.birth.date || !el.nba.start || !el.leagues.standard.jersey) {
        return false;
      }
      return true;
    });
  };

  return (
    <Box className="pt-3">
      <Title text="선수" />
      <Paper className="p-5">
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {TABLE_HEAD.map((el) => (
                  <TableCell align="center" key={el}>
                    {el}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filterPlayerData(playerPerTeamData.response).map((el) => {
                return (
                  <TableRow key={el.id}>
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
