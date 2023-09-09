/* eslint-disable react/require-default-props */
import { Box, CircularProgress } from '@mui/material';

const Loading = ({ height, width }: { height: string; width?: string }) => (
  <Box className={`flex justify-center items-center ${height} pb-7 ${width}`}>
    <CircularProgress />
  </Box>
);

export default Loading;
