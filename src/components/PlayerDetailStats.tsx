import Modal from "@mui/material/Modal";
import {
  Box,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { usePlayerDetailStats } from "@/hooks/stats";
import usePlayerInfo from "@/store/playerDetailStats";
import { PLAYER_DETAIL_STATS } from "@/consts/table";
import { PlayerStatsType } from "@/types/stats";
import { StatsKeyType } from "@/types/common";
import { useSearchPlayer } from "@/hooks/search";

const PlayerDetailStats = () => {
  const open = usePlayerInfo((state) => state.open);
  const [setPlayerModal, playerInfo] = usePlayerInfo((state) => [
    state.openModal,
    state.playerInfo,
  ]);

  const { data: playerDetailStats, isLoading: isLoadingPlayerDetailStats } =
    usePlayerDetailStats(playerInfo.id);

  const { data: playerPhysical, isLoading: isLoadingPlayerPhysical } =
    useSearchPlayer(playerInfo.id);

  const getFullName = (firstname: string, lastname: string) =>
    firstname + lastname;

  const filterStats = (stats: PlayerStatsType[]) => {
    const removedSemi = stats.map((el) => {
      if (typeof el.min === "string") {
        el.min = String(el.min).replace(/\:.*$/, "");
        return el;
      } else {
        return el;
      }
    });

    const filteredZeroTime = removedSemi.filter((el) =>
      el.min === "0:00" ? false : true
    );

    return filteredZeroTime;
  };

  const getAvgStats = (statsType: StatsKeyType, stats: PlayerStatsType[]) => {
    const filteredStats = filterStats(stats);
    const avg = (
      filteredStats.reduce((acc, cur) => acc + Number(cur[statsType]), 0) /
      filteredStats.length
    ).toFixed(1);

    return avg;
  };

  const getTableInfo = () => {
    const statsKey = Object.keys(PLAYER_DETAIL_STATS) as Array<
      keyof typeof PLAYER_DETAIL_STATS
    >;

    const tableHead = statsKey.map((el) => {
      return PLAYER_DETAIL_STATS[el];
    });
    const tableBody = statsKey;
    return {
      tableHead,
      tableBody,
    };
  };

  if (isLoadingPlayerDetailStats || isLoadingPlayerPhysical) {
    return (
      <Box className="fixed translate-y-[-50%] translate-x-[-50%] top-1/2 left-1/2 w-full h-full flex items-center justify-center">
        <CircularProgress />
      </Box>
    );
  }

  if (!playerDetailStats || !playerPhysical) {
    return null;
  }

  return (
    <Modal open={open} onClose={setPlayerModal}>
      <Box className="fixed translate-y-[-50%] translate-x-[-50%] top-1/2 left-1/2 bg-white p-3 border-solid border-2 border-indigo-600 rounded-lg outline-0 w-[1000px]">
        <Box className="flex items-center">
          <Typography variant="h6" component="h2">
            {getFullName(
              playerDetailStats[0].player.firstname,
              playerDetailStats[0].player.lastname
            )}
          </Typography>
          <Box className="w-[4px] h-[4px] bg-black mx-[5px] rounded-md" />
          <SubTitle text={playerDetailStats[1].pos} />
          <SubTitle text={playerPhysical[0].weight.kilograms + "kg"} />
          <SubTitle text={playerPhysical[0].height.meters + "m"} lastIdx />
        </Box>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">경기</TableCell>
                {getTableInfo().tableHead.map((el) => (
                  <TableCell align="center" key={el}>
                    {el}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell align="center">
                  {filterStats(playerDetailStats).length}
                </TableCell>
                {getTableInfo().tableBody.map((el) => (
                  <TableCell align="center" key={el}>
                    {getAvgStats(el, playerDetailStats)}
                  </TableCell>
                ))}
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Modal>
  );
};

export default PlayerDetailStats;

const SubTitle = ({
  text,
  lastIdx,
}: {
  text: string | number;
  lastIdx?: boolean;
}) => (
  <Box className="flex items-center">
    <Typography className="text-gray-600">{text}</Typography>
    {lastIdx ? null : (
      <Box className="h-[11px] w-[2px] bg-gray-400 mx-[5px] mb-[1px]" />
    )}
  </Box>
);
