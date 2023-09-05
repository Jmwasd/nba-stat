import { Box, TableCell } from '@mui/material';
import Image from 'next/image';

interface TableCellType {
  value: string;
  id: string;
}

const VERIFY_TD = /http(s)/;

const ScoreBoardTableCell = ({ id, value }: TableCellType) => (
  <TableCell key={id} align="center" size="small" className="p-3">
    {VERIFY_TD.test(value) ? (
      <Box className="w-[17px] h-[17px]">
        <Image
          src={value}
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

export default ScoreBoardTableCell;
