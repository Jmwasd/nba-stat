/* eslint-disable react/require-default-props */
import MoodBadIcon from '@mui/icons-material/MoodBad';
import { Paper, Typography } from '@mui/material';

interface Props {
  text: string;
  height: string;
  width?: string;
}

const Error = ({ text, height, width }: Props) => (
  <Paper className={`p-3 flex h-20 items-center justify-center ${height} ${width}`}>
    <MoodBadIcon className="mr-2" />
    <Typography>{text}</Typography>
  </Paper>
);

export default Error;
