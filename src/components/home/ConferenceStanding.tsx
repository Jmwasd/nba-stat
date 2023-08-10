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
import { CONFERENCE_STANDING } from "@/consts/table";
import { useRouter } from "next/router";
import { MouseEvent } from "react";

const ConferenceStanding = ({
  data,
  title,
}: {
  data: ApiResponseType<ConferenceStandingResponseType[]>;
  title: string;
}) => {
  const router = useRouter();
  const getRankSorted = () => {
    return data.response.sort((a, b) => {
      return a.conference.rank - b.conference.rank;
    });
  };

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
            {getRankSorted().map((el, idx) => {
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
