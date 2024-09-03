import { Link, Typography } from "@mui/material";
import img from "../../../public/favicon-32x32.png";

function Logo() {
  return (
    <Link href="/" display="flex" alignItems="center" gap={1}>
      <img src={img} />

      <Typography variant="h4">FAQ</Typography>
    </Link>
  );
}

export default Logo;
