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
import { StatsKeyType } from "@/types/stats";
import { TeamStatsResponseType } from "@/types/statistics";

type teamStatsType = (typeof teamStatsData.response)[0];

interface TableType extends teamStatsType {
  [key: string]: string | number;
}

interface Props {
  teamStats: TeamStatsResponseType;
}

const TeamStats = ({ teamStats }: Props) => {
  const getTableHeadAndBody = () => {
    const data: TableType = teamStats[0];
    return Object.keys(data)
      .filter((el) => (getStatsChangedKr(el as StatsKeyType) ? true : false))
      .map((el) => {
        return {
          tableHead: getStatsChangedKr(el as StatsKeyType),
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
                {getTableHeadAndBody().map((el) => {
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
                {getTableHeadAndBody().map((el) => {
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
