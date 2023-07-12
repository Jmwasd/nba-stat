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
} from "@mui/material";
import Title from "../Title";

import playerStat from "@/data/playerStatistics.json";

import { useState } from "react";

const HOME_TEAM = "Denver Nuggets";
const VISITOR_TEAM = "Miami Heat";
const TABLE_CELL: ("start" | "bench")[] = ["start", "bench"];

type TabType = "home" | "visitor";

const PlayerStat = () => {
  const [tabValue, setTabValue] = useState<TabType>("home");

  const handleTab = (e: React.SyntheticEvent, newValue: TabType) => {
    setTabValue(newValue);
  };

  const getPlayers = (
    type: (typeof TABLE_CELL)[0] | (typeof TABLE_CELL)[1]
  ) => {
    let team: string;
    if (tabValue === "home") {
      team = HOME_TEAM;
    } else {
      team = VISITOR_TEAM;
    }
    const player = playerStat.response.filter((el) => el.team.name === team);
    const startLineUp = player.slice(0, 5);
    const bench = player.slice(5, player.length);
    if (type === "start") {
      return startLineUp;
    } else {
      return bench;
    }
  };

  return (
    <Box className="pt-3">
      <Title text="선수 통계" />
      <Paper className="p-5">
        <Tabs value={tabValue} onChange={handleTab}>
          <Tab label={HOME_TEAM} value="home" />
          <Tab label={VISITOR_TEAM} value="visitor" />
        </Tabs>
        <TableContainer className="p-4">
          {TABLE_CELL.map((el) => {
            return (
              <Table key={el} sx={{ minWidth: 1000 }}>
                <TableHead className="bg-slate-200">
                  <TableRow>
                    <TableCell className="min-w-[220px]">
                      {changeKr(el)}
                    </TableCell>
                    <TableCell align="center">점수</TableCell>
                    <TableCell align="center">경기시간</TableCell>
                    <TableCell align="center">필드골 비율(%)</TableCell>
                    <TableCell align="center">자유투 확률(%)</TableCell>
                    <TableCell align="center">리바운드</TableCell>
                    <TableCell align="center">어시스트</TableCell>
                    <TableCell align="center">파울</TableCell>
                    <TableCell align="center">스틸</TableCell>
                    <TableCell align="center">턴오버</TableCell>
                    <TableCell align="center">블락</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {getPlayers(el).map((el) => {
                    return (
                      <TableRow hover key={el.player.id}>
                        <TableCell className="flex">
                          {el.player.firstname + el.player.lastname} &nbsp;
                          <Typography variant="caption" align="center">
                            {el.pos}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">{el.points}</TableCell>
                        <TableCell align="center">{el.min + "분"}</TableCell>
                        <TableCell align="center">{el.fgp}</TableCell>
                        <TableCell align="center">{el.ftp}</TableCell>
                        <TableCell align="center">{el.totReb}</TableCell>
                        <TableCell align="center">{el.assists}</TableCell>
                        <TableCell align="center">{el.pFouls}</TableCell>
                        <TableCell align="center">{el.steals}</TableCell>
                        <TableCell align="center">{el.turnovers}</TableCell>
                        <TableCell align="center">{el.blocks}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            );
          })}
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default PlayerStat;

export const changeKr = (lang: "start" | "bench") =>
  lang === "start" ? "선발 라인업" : "벤치 라인업";
