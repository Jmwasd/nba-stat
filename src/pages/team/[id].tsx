import { Box } from "@mui/material";
import TeamRank from "@/components/team/TeamRank";
import TeamStats from "@/components/team/TeamStats";
import TeamSchedule from "@/components/team/TeamSchedule";
import TeamPlayer from "@/components/team/TeamPlayer";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { instance } from "@/config/api";
import ApiResponseType from "@/types/api";
import { ConferenceStandingResponseType } from "@/types/teams";
import { TeamScheduleResponseType, TeamScheduleType } from "@/types/games";
import { PlayerPerTeamResponseType, PlayerPerTeamType } from "@/types/players";
import { TeamStatsResponseType, TeamStatsType } from "@/types/statistics";
import { Suspense } from "react";

const TeamStatistics = ({
  conferenceStanding,
  teamSchedule,
  playerPerTeam,
  teamStats,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <Box>
      <Suspense fallback={<div>loading...</div>}>
        <TeamRank conferenceStanding={conferenceStanding} />
        <Box className="flex pt-3">
          <TeamSchedule teamSchedule={teamSchedule} />
          <Box className="w-[80%]">
            <TeamStats teamStats={teamStats} />
            <TeamPlayer playerPerTeam={playerPerTeam} />
          </Box>
        </Box>
      </Suspense>
    </Box>
  );
};

export default TeamStatistics;

interface StatisticsProps {
  conferenceStanding: ConferenceStandingResponseType;
  teamSchedule: TeamScheduleResponseType;
  playerPerTeam: PlayerPerTeamResponseType;
  teamStats: TeamStatsResponseType;
}

export const getServerSideProps: GetServerSideProps<StatisticsProps> = async ({
  query,
}) => {
  const conferenceStandingResponse = await instance.get<
    ApiResponseType<ConferenceStandingResponseType[]>
  >(
    `/standings?season=2022&conference=${query.conferenceName}&league=standard&team=${query.id}`
  );
  const gamePerTeamResponse = await instance.get<TeamScheduleType>(
    `/games?league=standard&season=2022&team=${query.id}`
  );
  const playerPerTeamResponse = await instance.get<PlayerPerTeamType>(
    `/players?team=${query.id}&season=2022`
  );
  const teamStatsResponse = await instance.get<TeamStatsType>(
    `/teams/statistics?id=${query.id}&season=2022`
  );
  return {
    props: {
      conferenceStanding: conferenceStandingResponse.data.response[0],
      teamSchedule: gamePerTeamResponse.data.response,
      playerPerTeam: playerPerTeamResponse.data.response,
      teamStats: teamStatsResponse.data.response,
    },
  };
};
