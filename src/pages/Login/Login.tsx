import React from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  Container,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { SubmitHandler, useForm } from "react-hook-form";

import { useAuthStore } from "@/stores/auth-store/auth-store-provider";
import { TextFieldForm } from "@/components/Form/TextFieldForm";
import { LoginUser } from "@/interfaces/User";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const { onLogin } = useAuthStore((state) => state);

  const { control, handleSubmit, reset } = useForm<LoginUser>({});

  const onSubmit: SubmitHandler<LoginUser> = (data) => {
    onLogin(data);
    reset();
    navigate("/");
  };

  return (
    <Container
      maxWidth="xl"
      sx={{
        height: "100%",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
      }}
    >
      <Card sx={{ p: 2, marginTop: 10 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextFieldForm
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              control={control}
            />
            <TextFieldForm
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              control={control}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit(onSubmit)}
            >
              Login
            </Button>

            <Grid container>
              <Grid item xs></Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Card>
    </Container>
  );
}

export default Login;
