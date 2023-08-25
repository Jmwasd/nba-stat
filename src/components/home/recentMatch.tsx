import {
  Box,
  Card,
  CardActionArea,
  CircularProgress,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import Image from "next/image";
import { useState } from "react";
import Title from "../Title";
import Link from "next/link";
import { useRecentMatch } from "@/hooks/game";

const today = new Date();

const RecentMatch = () => {
  const [datePickerValue, setDatePickerValue] = useState(dayjs(today));

  const parsingDate = () => {
    const year = datePickerValue.year();
    let month = "" + (datePickerValue.month() + 1);
    let day = "" + datePickerValue.date();
    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return year + "-" + month + "-" + day;
  };

  const {
    data: recentMatchResponse,
    isLoading,
    mutate,
  } = useRecentMatch(parsingDate());

  const changeDate = (value: dayjs.Dayjs | null) => {
    if (value) setDatePickerValue(value);
    mutate();
  };

  if (isLoading) {
    return (
      <Box className="flex justify-center items-center h-[150px] pb-7">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box className="pb-7">
      <Box className="flex pb-3">
        <Title
          text="경기결과"
          className="flex items-center relative left-[47.5%] pb-0"
        />
        <DatePicker
          value={datePickerValue}
          onChange={(value) => changeDate(value)}
        />
      </Box>
      {!recentMatchResponse ? (
        <Paper className="p-3 flex h-20 items-center justify-center">
          <Typography>
            일치하는 데이터가 없습니다. 다른 날짜를 선택해주세요.
          </Typography>
        </Paper>
      ) : (
        <Grid container spacing={2}>
          {recentMatchResponse.map((item, idx) => (
            <Grid item xs={3} key={item.id + idx}>
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
                  <CardActionArea className="flex p-5">
                    <Box className="flex min-w-full">
                      <Box className="w-1/4">
                        <Box className="relative w-[70px] h-[70px] my-0 mx-auto">
                          <Image
                            src={item.teams.home.logo}
                            alt="team-logo"
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
                          <Image
                            src={item.teams.visitors.logo}
                            alt="team-logo"
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
