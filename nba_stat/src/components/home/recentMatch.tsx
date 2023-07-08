import recentMatchData from "@/data/recentMatch.json";
import { Box, Card, Grid, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import Image from "next/image";
import { useState } from "react";
import Title from "../Title";

const today = new Date();

const RecentMatch = () => {
  const [datePickerValue, setDatePickerValue] = useState(dayjs(today));

  return (
    <Box className="pb-7">
      <Box className="flex pb-3">
        <Title
          text="경기결과"
          className="flex items-center relative left-[47.5%] pb-0"
        />
        <DatePicker
          value={datePickerValue}
          onChange={(value) => setDatePickerValue(dayjs(value))}
        />
      </Box>
      <Grid container spacing={2}>
        {recentMatchData.response.map((item, idx) => (
          <Grid item xs={3} key={item.id + idx}>
            <Card className="p-5" onClick={() => console.log(idx)}>
              <Box className="flex">
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
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default RecentMatch;
