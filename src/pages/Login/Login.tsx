import React, { useState } from "react";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  Container,
  Grid,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { SubmitHandler, useForm } from "react-hook-form";
import InfoIcon from "@mui/icons-material/Info";
import { useNavigate } from "react-router-dom";

import { useAuthStore } from "@/stores/auth-store/auth-store-provider";
import { TextFieldForm } from "@/components/Form/TextFieldForm";
import { LoginUser } from "@/interfaces/User";

function Login() {
  const navigate = useNavigate();
  const { onLogin } = useAuthStore((state) => state);

  const [isError, setIsError] = useState(false);

  const { control, handleSubmit, reset } = useForm<LoginUser>({});

  const onSubmit: SubmitHandler<LoginUser> = (data) => {
    if (onLogin(data)) {
      setIsError(false);
      reset();
      navigate("/");
    } else {
      setIsError(true);
    }
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

          <Stack mt={5} mb={2} spacing={2}>
            <Alert icon={<InfoIcon fontSize="inherit" />} severity="info">
              <span>
                Use <strong>test@email.com</strong>
              </span>{" "}
              <span>
                with password <strong>asdASD123!</strong>
              </span>
            </Alert>

            {isError && (
              <Alert severity="error">Incorrect email or password</Alert>
            )}
          </Stack>

          <Box component="form" noValidate>
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
