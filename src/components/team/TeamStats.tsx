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

import teamStatsData from "@/data/teamStatistics.json";
import { getStatsChangedKr } from "@/utils/formatter";

type teamStatsDataType = (typeof teamStatsData.response)[0];

interface TableTypes extends teamStatsDataType {
  [key: string]: string | number;
}

const TeamStats = () => {
  const getTableUnit = () => {
    const data: TableTypes = teamStatsData.response[0];
    return Object.keys(data)
      .filter((el) => getStatsChangedKr(el) !== "error")
      .map((el) => {
        return {
          tableHead: getStatsChangedKr(el),
          tableBody: data[el],
        };
      });
  };
  return (
    <Box className="w-[100%]">
      <Title text="팀 통계" />
      <Paper className="p-5">
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {getTableUnit().map((el) => {
                  return (
                    <TableCell align="center" key={el.tableBody}>
                      {el.tableHead}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                {getTableUnit().map((el) => {
                  return (
                    <TableCell align="center" key={el.tableBody}>
                      {el.tableBody}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default TeamStats;
