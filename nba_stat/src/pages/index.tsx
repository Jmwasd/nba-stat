import ConferenceStanding from "@/components/home/conferenceStanding";
import Layout from "@/components/layout";
import RecentMatch from "../components/home/recentMatch";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Box, Container } from "@mui/material";

export default function Home() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Container maxWidth={false} sx={{ bgcolor: "#edecec" }} className="py-5">
        <Layout />
        <RecentMatch></RecentMatch>
        <Box className="flex">
          <ConferenceStanding></ConferenceStanding>
          <ConferenceStanding></ConferenceStanding>
        </Box>
      </Container>
    </LocalizationProvider>
  );
}
