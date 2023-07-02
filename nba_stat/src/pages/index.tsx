import ConferenceStanding from "@/components/home/conferenceStanding";
import Layout from "@/components/layout";
import RecentMatch from "../components/home/recentMatch";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Box, Container } from "@mui/material";
import WEST_CONFERENCE from "../data/westConference.json";
import EAST_CONFERENCE from "../data/eastConference.json";

export default function Home() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Container maxWidth={false} sx={{ bgcolor: "#edecec" }} className="py-5">
        <Layout />
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
      </Container>
    </LocalizationProvider>
  );
}
