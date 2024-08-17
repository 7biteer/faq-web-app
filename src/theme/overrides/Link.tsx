import { forwardRef } from "react";
import { LinkProps, ListItemButtonProps } from "@mui/material";
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from "react-router-dom";

const LinkBehavior = forwardRef<
  HTMLAnchorElement,
  Omit<RouterLinkProps, "to"> & { href: RouterLinkProps["to"] }
>((props, ref) => {
  const { href, ...other } = props;
  // Map href (Material UI) -> to (react-router)
  return <RouterLink ref={ref} to={href} {...other} />;
});

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
LinkBehavior.displayName = "LinkBehavior";

export default function Link() {
  return {
    MuiLink: {
      defaultProps: {
        underline: "hover",
        component: LinkBehavior,
      } as LinkProps,
    },
    MuiButtonBase: {
      defaultProps: {
        LinkComponent: LinkBehavior,
      },
    },
    MuiListItemButton: {
      defaultProps: {
        component: LinkBehavior,
      } as ListItemButtonProps,
    },
  };
}
