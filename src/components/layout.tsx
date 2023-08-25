import { Typography } from "@mui/material";
import { useRouter } from "next/router";

const Layout = () => {
  const router = useRouter();
  return (
    <div className="pb-5">
      <Typography
        variant="h4"
        component="span"
        className="font-bold cursor-pointer"
        onClick={() => router.push("/")}
      >
        NBA STAT
      </Typography>
    </div>
  );
};

export default Layout;
