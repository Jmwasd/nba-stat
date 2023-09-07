import TEAM_CODE from '@/consts/teamCode';
import { TeamCodeType } from '@/types/common';
import { Box, TableCell } from '@mui/material';
import Image from 'next/image';

interface TableCellType {
  value: string;
  id: string;
}

const ScoreBoardTableCell = ({ id, value }: TableCellType) => {
  const imageSource = Object.keys(TEAM_CODE).filter((el) => el === value) as TeamCodeType[];
  return (
    <TableCell key={id} align="center" size="small" className="p-3">
      {imageSource.length ? (
        <Box className="w-[17px] h-[17px]">
          <Image
            src={TEAM_CODE[imageSource[0]]}
            width="0"
            height="0"
            alt="team-logo"
            sizes="100vw"
            className="w-full h-auto"
          />
        </Box>
      ) : (
        value
      )}
    </TableCell>
  );
};

export default ScoreBoardTableCell;
