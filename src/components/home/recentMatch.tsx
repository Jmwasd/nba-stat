import { Box, Card, CardActionArea, Grid, Typography } from '@mui/material';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { useState } from 'react';
import Link from 'next/link';
import useRecentMatch from '@/hooks/game';
import { getDateKr } from '@/utils/formatter';
import Loading from '../Loading';
import Title from '../Title';
import TeamLogo from '../TeamLogo';
import Error from '../Error';

const RecentMatch = () => {
  const [datePickerValue, setDatePickerValue] = useState<dayjs.Dayjs | null>(null);

  const parsingDate = () => {
    if (!datePickerValue) return null;
    const year = datePickerValue.year();
    let month = `${datePickerValue.month() + 1}`;
    let day = `${datePickerValue.date()}`;
    if (month.length < 2) month = `0${month}`;
    if (day.length < 2) day = `0${day}`;

    return `${year}-${month}-${day}`;
  };

  const { data: recentMatchResponse, isLoading, mutate } = useRecentMatch(parsingDate());

  const changeDate = (value: dayjs.Dayjs | null) => {
    if (value) setDatePickerValue(value);
    mutate();
  };

  const refreshRecentMatch = () => {
    setDatePickerValue(null);
    mutate();
  };

  if (isLoading) {
    return <Loading height="h-[150px]" />;
  }

  console.log(process.env.NEXT_PUBLIC_ENV_API_KEY)

  return (
    <Box className="pb-7">
      <Box className="flex pb-3">
        <Title text="경기" className="flex items-center relative left-[47.5%] pb-0" />
        <Box className="flex items-center relative bottom-2 ">
          {datePickerValue && (
            <AutorenewIcon
              fontSize="large"
              color="inherit"
              className="mr-2 transition hover:rotate-180 cursor-pointer"
              onClick={() => refreshRecentMatch()}
            />
          )}
          <DatePicker value={datePickerValue} onChange={(value) => changeDate(value)} />
        </Box>
      </Box>
      {!recentMatchResponse ? (
        <Error text="일치하는 데이터가 없습니다. 다른 날짜를 선택해주세요" height="h-20" />
      ) : (
        <Grid container spacing={2}>
          {recentMatchResponse.map((item) => (
            <Grid item xs={3} key={item.id}>
              <Link
                href={{
                  pathname: `/game/${item.id}`,
                  query: {
                    homeLineScore: item.scores.home.linescore,
                    visitorLineScore: item.scores.visitors.linescore,
                    homeTeamName: item.teams.home.name,
                    visitorTeamName: item.teams.visitors.name,
                  },
                }}
              >
                <Card>
                  <CardActionArea className="flex p-5 flex-col">
                    <Typography>{getDateKr(item.date.start)}</Typography>
                    <Box className="flex min-w-full">
                      <Box className="w-1/4">
                        <Box className="relative my-0 mx-auto">
                          <TeamLogo
                            code={item.teams.home.code}
                            alt="team-logo"
                            width={70}
                            height={70}
                          />
                        </Box>
                        <Typography className="text-xl text-center">
                          {item.teams.home.nickname}
                        </Typography>
                      </Box>
                      <Box className="w-2/4">
                        <Typography className="text-2xl min-w-1/2 inline-block text-center relative top-1/3">
                          {item.scores.home.points}
                        </Typography>
                        <Typography className="text-2xl min-w-1/2 inline-block text-center relative top-1/3">
                          {item.scores.visitors.points}
                        </Typography>
                      </Box>
                      <Box className="w-1/4">
                        <Box className="relative w-[70px] h-[70px] my-0 mx-auto">
                          <TeamLogo
                            code={item.teams.visitors.code}
                            alt="qwef"
                            width={70}
                            height={70}
                          />
                        </Box>
                        <Typography className="text-xl text-center">
                          {item.teams.visitors.nickname}
                        </Typography>
                      </Box>
                    </Box>
                  </CardActionArea>
                </Card>
              </Link>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default RecentMatch;
