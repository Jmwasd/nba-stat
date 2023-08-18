import Image from "next/image";
import {
  Box,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Title from "../Title";
import { CONFERENCE_STANDING } from "@/consts/table";
import { useRouter } from "next/router";
import { MouseEvent } from "react";
import { useConferenceStanding } from "@/hooks/standing";

import TestImg from "@/assets/teamLogo/Rockets.webp";
import { getWinPercentage } from "@/utils/getPercentage";

interface Props {
  conferenceName: "west" | "east";
  title: string;
}

const ConferenceStanding = ({ conferenceName, title }: Props) => {
  const { data: conferenceStanding, isLoading } =
    useConferenceStanding(conferenceName);

  const router = useRouter();

  const handleTableRowClick = (
    e: MouseEvent<HTMLElement>,
    teamId: number,
    conferenceName: string
  ) => {
    e.preventDefault();
    router.push({
      pathname: `/team/${teamId}`,
      query: { conferenceName },
    });
  };

  if (isLoading)
    return (
      <Box className="flex justify-center w-[49.5%] items-center h-[70vh]">
        <CircularProgress />
      </Box>
    );

  if (!conferenceStanding) return <Box>데이터가 없습니다.</Box>;

  return (
    <Box className="w-[49.5%]">
      <Title text={title} align="center" />
      <TableContainer component={Paper}>
        <Table className="w-full">
          <TableHead>
            <TableRow>
              <TableCell />
              {CONFERENCE_STANDING.map((el) => (
                <TableCell key={el}>{el}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {conferenceStanding.map((el, idx) => {
              return (
                <TableRow
                  hover
                  className="cursor-pointer"
                  onClick={(e) =>
                    handleTableRowClick(e, el.team.id, el.conference.name)
                  }
                  key={el.team.id}
                >
                  <TableCell>{idx + 1}</TableCell>
                  <TableCell>
                    <Box className="flex items-center">
                      <Box className="relative w-[17px] h-[10px]">
                        <Image
                          src={TestImg}
                          fill
                          alt="team-logo"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </Box>
                      <span style={{ marginLeft: "5px" }}>{el.team.name}</span>
                    </Box>
                  </TableCell>
                  <TableCell>{el.win.away + el.win.home}</TableCell>
                  <TableCell>{el.loss.away + el.loss.home}</TableCell>
                  <TableCell>
                    0.
                    {getWinPercentage(
                      el.win.away + el.win.home,
                      el.loss.away + el.loss.home
                    )}
                  </TableCell>
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
