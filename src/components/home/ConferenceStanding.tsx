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
} from '@mui/material';
import { CONFERENCE_STANDING } from '@/consts/table';
import { useRouter } from 'next/router';
import { MouseEvent } from 'react';
import { useConferenceStanding } from '@/hooks/standing';

import getWinPercentage from '@/utils/getPercentage';
import { ConferenceType } from '@/types/common';
import TeamLogo from '../TeamLogo';
import Error from '../Error';
import Title from '../Title';

interface Props {
  conferenceName: ConferenceType;
  title: string;
}

const ConferenceStanding = ({ conferenceName, title }: Props) => {
  const { data: conferenceStanding, isLoading } = useConferenceStanding(conferenceName);

  const router = useRouter();

  const clickTableRow = (e: MouseEvent<HTMLElement>, teamId: number) => {
    e.preventDefault();
    router.push({
      pathname: `/team/${teamId}`,
    });
  };

  if (isLoading) {
    return (
      <Box className="flex justify-center w-[49.5%] items-center h-[70vh]">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box className="w-[49.5%]">
      <Title text={title} align="center" />
      {!conferenceStanding ? (
        <Error text="Error" height="h-[80vh]" />
      ) : (
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
              {conferenceStanding.map((el, idx) => (
                <TableRow
                  hover
                  className="cursor-pointer"
                  onClick={(e) => clickTableRow(e, el.team.id)}
                  key={el.team.id}
                >
                  <TableCell>{idx + 1}</TableCell>
                  <TableCell>
                    <Box className="flex items-center">
                      <TeamLogo code={el.team.code} alt="team-logo" width={20} height={20} />
                      <span
                        style={{
                          marginLeft: '5px',
                        }}
                      >
                        {el.team.name}
                      </span>
                    </Box>
                  </TableCell>
                  <TableCell>{el.win.away + el.win.home}</TableCell>
                  <TableCell>{el.loss.away + el.loss.home}</TableCell>
                  <TableCell>
                    0.
                    {getWinPercentage(el.win.away + el.win.home, el.loss.away + el.loss.home)}
                  </TableCell>
                  <TableCell>
                    {el.win.home}-{el.loss.home}
                  </TableCell>
                  <TableCell>
                    {el.win.away}-{el.loss.away}
                  </TableCell>
                  <TableCell>
                    {el.streak} {el.winStreak ? 'W' : 'L'}
                  </TableCell>
                  <TableCell>
                    {el.win.lastTen}-{el.loss.lastTen}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default ConferenceStanding;
