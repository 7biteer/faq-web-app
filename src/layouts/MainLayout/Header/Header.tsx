import React, { useState } from "react";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { Logo } from "@/components/Logo";
import { useAuthStore } from "@/stores/auth-store/auth-store-provider";

function Header() {
  const { isLoggedIn, profile, onLogout } = useAuthStore((state) => state);

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="sticky" sx={{ background: "#222327" }}>
      <Container maxWidth="xl">
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>
            <Logo />
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            {!isLoggedIn && !profile ? (
              <Button href="/login" variant="contained">
                Login
              </Button>
            ) : (
              <>
                <Button onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt={profile?.username} />

                  <Typography>{profile?.username}</Typography>
                </Button>

                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem onClick={onLogout}>
                    <Typography textAlign="center">Logout</Typography>
                  </MenuItem>
                </Menu>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
