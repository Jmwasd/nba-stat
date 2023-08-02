import { Box } from "@mui/material";
import TeamRank from "@/components/team/TeamRank";
import TeamStats from "@/components/team/TeamStats";
import TeamSchedule from "@/components/team/TeamSchedule";
import TeamPlayer from "@/components/team/TeamPlayer";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { instance } from "@/config/api";
import ApiResponseType from "@/types/api";
import { ConferenceStandingResponseType } from "@/types/teams";
import { TeamScheduleType } from "@/types/games";

const TeamStatistics = ({
  teamStats,
  teamSchedule,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <Box>
      <TeamRank teamStats={teamStats} />
      <Box className="flex pt-3">
        <TeamSchedule teamSchedule={teamSchedule} />
        <Box className="w-[80%]">
          <TeamStats />
          <TeamPlayer />
        </Box>
      </Box>
    </Box>
  );
};

export default TeamStatistics;

interface StatisticsProps {
  teamStats: ConferenceStandingResponseType;
  teamSchedule: TeamScheduleType;
}

export const getServerSideProps: GetServerSideProps<StatisticsProps> = async ({
  query,
}) => {
  const gameStatisticsResponse = await instance.get<
    ApiResponseType<ConferenceStandingResponseType[]>
  >(
    `/standings?season=2022&conference=${query.conferenceName}&league=standard&team=${query.id}`
  );
  const gamePerTeamResponse = await instance.get<TeamScheduleType>(
    `/games?league=standard&season=2022&team=${query.id}`
  );
  return {
    props: {
      teamStats: gameStatisticsResponse.data.response[0],
      teamSchedule: gamePerTeamResponse.data,
    },
  };
};
