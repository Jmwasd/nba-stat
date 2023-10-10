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
  Typography,
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
      <Box className="flex justify-center w-[100%] items-center h-[70vh]">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box className="mt-5">
      <Title text={title} align="center" />
      {!conferenceStanding ? (
        <Error text="Error" height="h-[80vh]" />
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead className="bg-table-head whitespace-nowrap">
              <TableRow>
                {CONFERENCE_STANDING.map((el, idx) => (
                  <TableCell className="font-bold" key={el} align={!idx ? 'left' : 'center'}>
                    {el}
                  </TableCell>
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
                  <TableCell align="center">
                    <Box className="flex items-center">
                      <Typography className="mr-3">{idx + 1}</Typography>
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
                  <TableCell align="center">{el.win.away + el.win.home}</TableCell>
                  <TableCell align="center">{el.loss.away + el.loss.home}</TableCell>
                  <TableCell align="center">
                    0.
                    {getWinPercentage(el.win.away + el.win.home, el.loss.away + el.loss.home)}
                  </TableCell>
                  <TableCell align="center">
                    {el.win.home}-{el.loss.home}
                  </TableCell>
                  <TableCell align="center">
                    {el.win.away}-{el.loss.away}
                  </TableCell>
                  <TableCell align="center">
                    {el.streak} {el.winStreak ? 'W' : 'L'}
                  </TableCell>
                  <TableCell align="center">
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
