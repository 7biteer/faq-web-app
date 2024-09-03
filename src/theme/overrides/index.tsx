import { Theme } from "@mui/material";
import { merge } from "lodash";
import Link from "./Link";
import Input from "./Input";
import InputLabel from "./InputLabel";

// =================|| OVERRIDES - MAIN ||================= //

export default function componentsOverrides(theme: Theme) {
  return merge(Input(theme), InputLabel(theme), Link());
}
