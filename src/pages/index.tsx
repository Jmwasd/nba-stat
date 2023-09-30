import ConferenceStanding from '@/components/home/ConferenceStanding';
import RecentMatch from '@/components/home/recentMatch';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Box } from '@mui/material';

const Home = () => (
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <RecentMatch />
    <Box>
      <ConferenceStanding title="서부 컨퍼런스 랭킹" conferenceName="west" />
      <ConferenceStanding title="동부 컨퍼런스 랭킹" conferenceName="east" />
    </Box>
  </LocalizationProvider>
);

export default Home;
