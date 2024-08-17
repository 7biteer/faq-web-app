import { Theme } from "@mui/material";
import { merge } from "lodash";
import Link from "./Link";

// =================|| OVERRIDES - MAIN ||================= //

export default function componentsOverrides(theme: Theme) {
  return merge(Link());
}
