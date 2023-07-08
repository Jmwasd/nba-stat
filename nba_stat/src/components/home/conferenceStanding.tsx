import Image from "next/image";
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
import { ConferenceStandingResponseType } from "@/types/teams";
import Title from "../Title";
import ApiResponseType from "@/types/api";

const ConferenceStanding = ({
  data,
  title,
}: {
  data: ApiResponseType<ConferenceStandingResponseType[]>;
  title: string;
}) => {
  const getRankSorted = () => {
    return data.response.sort((a, b) => {
      return a.conference.rank - b.conference.rank;
    });
  };

  return (
    <Box className="w-[49.5%]">
      <Title text={title} align="center" />
      <TableContainer component={Paper}>
        <Table className="w-full">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>팀</TableCell>
              <TableCell>승</TableCell>
              <TableCell>패</TableCell>
              <TableCell>승률</TableCell>
              <TableCell>홈</TableCell>
              <TableCell>원정</TableCell>
              <TableCell>최근 10경기</TableCell>
              <TableCell>연속</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {getRankSorted().map((el, idx) => {
              return (
                <TableRow key={el.team.id}>
                  <TableCell>{idx + 1}</TableCell>
                  <TableCell>
                    <Box className="flex items-center">
                      <Box className="relative w-[17px] h-[17px]">
                        <Image
                          src={el.team.logo}
                          fill
                          alt="team-logo"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </Box>
                      <span style={{ marginLeft: "5px" }}>{el.team.name}</span>
                    </Box>
                  </TableCell>
                  <TableCell>{el.conference.win}</TableCell>
                  <TableCell>{el.conference.loss}</TableCell>
                  <TableCell>{el.win.percentage}</TableCell>
                  <TableCell>
                    {el.win.home}-{el.loss.home}
                  </TableCell>
                  <TableCell>
                    {el.win.away}-{el.loss.away}
                  </TableCell>
                  <TableCell>
                    {el.streak} {el.winStreak ? "W" : "L"}
                  </TableCell>
                  <TableCell>
                    {el.win.lastTen}-{el.loss.lastTen}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ConferenceStanding;
