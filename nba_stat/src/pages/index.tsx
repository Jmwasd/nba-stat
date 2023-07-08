import ConferenceStanding from "@/components/home/ConferenceStanding";
import RecentMatch from "../components/home/recentMatch";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Box } from "@mui/material";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { ConferenceStandingResponseType } from "@/types/teams";
import { instance } from "@/config/api";
import ApiResponseType from "@/types/api";

export default function Home({
  west,
  east,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <RecentMatch></RecentMatch>
      <Box className="flex justify-between">
        <ConferenceStanding
          title="서부 컨퍼런스 랭킹"
          data={west}
        ></ConferenceStanding>
        <ConferenceStanding
          title="동부 컨퍼런스 랭킹"
          data={east}
        ></ConferenceStanding>
      </Box>
    </LocalizationProvider>
  );
}

interface StaticProps {
  west: ApiResponseType<ConferenceStandingResponseType[]>;
  east: ApiResponseType<ConferenceStandingResponseType[]>;
}
export const getStaticProps: GetStaticProps<StaticProps> = async () => {
  const westConferenceResponse = await instance.get<
    ApiResponseType<ConferenceStandingResponseType[]>
  >("/standings?season=2022&conference=west&league=standard");
  const eastConferenceResponse = await instance.get<
    ApiResponseType<ConferenceStandingResponseType[]>
  >("/standings?season=2022&conference=east&league=standard");
  const westConference = westConferenceResponse.data;
  const eastConference = eastConferenceResponse.data;
  return { props: { west: westConference, east: eastConference } };
};
