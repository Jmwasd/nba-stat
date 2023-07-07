import { Typography } from "@mui/material";

interface Props {
  text: string;
  className?: string;
  align?: "right" | "left" | "center" | "inherit" | "justify";
}

const Title = ({ text, className, align }: Props) => (
  <Typography
    variant="h5"
    align={align}
    className={"pb-3 font-bold w-full " + className}
  >
    {text}
  </Typography>
);
export default Title;
