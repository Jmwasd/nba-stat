import ConferenceStanding from "@/components/home/ConferenceStanding";
import RecentMatch from "../components/home/recentMatch";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Box } from "@mui/material";

export default function Home() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <RecentMatch></RecentMatch>
      <Box className="flex justify-between">
        <ConferenceStanding
          title="서부 컨퍼런스 랭킹"
          conferenceName="west"
        ></ConferenceStanding>
        <ConferenceStanding
          title="동부 컨퍼런스 랭킹"
          conferenceName="east"
        ></ConferenceStanding>
      </Box>
    </LocalizationProvider>
  );
}
