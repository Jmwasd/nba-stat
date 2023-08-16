import { Box } from "@mui/material";
import TeamRank from "@/components/team/TeamRank";
import TeamStats from "@/components/team/TeamStats";
import TeamSchedule from "@/components/team/TeamSchedule";
import TeamPlayer from "@/components/team/TeamPlayer";

const TeamStatistics = () => {
  return (
    <Box>
      <TeamRank />
      <Box className="flex pt-3">
        <TeamSchedule />
        <Box className="w-[80%]">
          <TeamStats />
          <TeamPlayer />
        </Box>
      </Box>
    </Box>
  );
};

export default TeamStatistics;

// interface StatisticsProps {
//   conferenceStanding: ConferenceStandingResponseType;
// }

// export const getServerSideProps: GetServerSideProps<StatisticsProps> = async ({
//   query,
// }) => {
//   const conferenceStandingResponse = await instance.get<
//     ApiResponseType<ConferenceStandingResponseType>
//   >(`${APIv2.standing}&conference=${query.conferenceName}&team=${query.id}`);

//   return {
//     props: {
//       conferenceStanding: conferenceStandingResponse.data.response[0],
//     },
//   };
// };
