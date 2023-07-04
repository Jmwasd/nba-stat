import ConferenceStanding from "@/components/home/conferenceStanding";
import RecentMatch from "../components/home/recentMatch";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Box } from "@mui/material";
import WEST_CONFERENCE from "../data/westConference.json";
import EAST_CONFERENCE from "../data/eastConference.json";

export default function Home() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <RecentMatch></RecentMatch>
      <Box className="flex justify-between">
        <ConferenceStanding
          conferenceData={WEST_CONFERENCE}
          title="서부 컨퍼런스 랭킹"
        ></ConferenceStanding>
        <ConferenceStanding
          conferenceData={EAST_CONFERENCE}
          title="동부 컨퍼런스 랭킹"
        ></ConferenceStanding>
      </Box>
    </LocalizationProvider>
  );
}
