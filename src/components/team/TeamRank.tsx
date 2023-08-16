import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import Image from "next/image";
import { setConferenceStanding } from "@/hooks/standing";
import { useRouter } from "next/router";
import { TeamPageQueryType } from "@/types/rotuerQuery";
import Loading from "../Loading";
import { ConferenceStandingResponseType } from "@/types/teams";

const TeamRank = () => {
  const { query } = useRouter();
  const queryUnit = query as TeamPageQueryType;

  const { data: conferenceStanding, isLoading } = setConferenceStanding(
    queryUnit.conferenceName,
    queryUnit.id
  );

  const getTableInfo = (data: ConferenceStandingResponseType) => {
    return [
      { head: "랭킹", info: data.conference.rank },
      {
        head: "승",
        info: data.conference.win,
      },
      { head: "패", info: data.conference.loss },
      { head: "승률", info: data.win.percentage },
      {
        head: "홈",
        info: data.win.home + "-" + data.win.home,
      },
      {
        head: "원정",
        info: data.win.away + "-" + data.win.away,
      },
      {
        head: "최근 10경기",
        info: data.streak + (data.winStreak ? "W" : "L"),
      },
      {
        head: "연속",
        info: data.win.lastTen + "-" + data.loss.lastTen,
      },
    ];
  };

  if (isLoading) {
    return <Loading height="h-[200px]" />;
  }

  if (!conferenceStanding) {
    return <Box>go to 404 page</Box>;
  }

  return (
    <Paper className="p-5 flex items-center">
      <Image
        className="mr-5"
        src={conferenceStanding[0].team.logo}
        width={70}
        height={70}
        alt="tema-logo"
      />
      <Typography variant="h4">{conferenceStanding[0].team.name}</Typography>
      <Box className="w-[70%] my-0 mx-auto">
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {getTableInfo(conferenceStanding[0]).map((el) => {
                  return (
                    <TableCell key={el.head} align="center">
                      {el.head}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                {getTableInfo(conferenceStanding[0]).map((el, idx) => {
                  return (
                    <TableCell key={el.head + el.info} align="center">
                      {el.info}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Paper>
  );
};

export default TeamRank;
