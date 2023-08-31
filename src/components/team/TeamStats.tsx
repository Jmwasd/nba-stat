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

import { getStatsChangedKr } from "@/utils/formatter";
import { useRouter } from "next/router";
import { TeamPageQueryType } from "@/types/rotuerQuery";
import { useTeamStats } from "@/hooks/teams";
import { StatsKeyType } from "@/types/common";
import { TeamStatsType } from "@/types/stats";
import Loading from "../Loading";
import Error from "../Error";

interface TableType extends TeamStatsType {
  [key: string]: string | number;
}

const TeamStats = () => {
  const { query } = useRouter();
  const teamPageQuery = query as TeamPageQueryType;

  const { data: teamStats, isLoading } = useTeamStats(teamPageQuery.id);

  const getTableHeadAndBody = (stats: TeamStatsType[]) => {
    const data: TableType = stats[0];
    return Object.keys(data)
      .filter((el) => (getStatsChangedKr(el as StatsKeyType) ? true : false))
      .map((el) => {
        return {
          tableHead: getStatsChangedKr(el as StatsKeyType),
          tableBody: data[el],
        };
      });
  };

  if (isLoading) {
    return <Loading height="h-[220px]" />;
  }

  return (
    <Box className="w-[100%]">
      <Title text="팀 통계" />
      {!teamStats ? (
        <Error text="Error" height="h-20" />
      ) : (
        <Paper className="p-5">
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  {getTableHeadAndBody(teamStats).map((el) => {
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
                  {getTableHeadAndBody(teamStats).map((el) => {
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
      )}
    </Box>
  );
};

export default TeamStats;
