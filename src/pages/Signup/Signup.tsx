import React from "react";
import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useAuthStore } from "@/stores/auth-store/auth-store-provider";
import { SubmitHandler, useForm } from "react-hook-form";
import { SignupUser } from "@/interfaces/User";
import { TextFieldForm } from "@/components/Form/TextFieldForm";

function Signup() {
  const { onSignup } = useAuthStore((state) => state);

  const { control, handleSubmit, reset } = useForm<SignupUser>({});

  const onSubmit: SubmitHandler<SignupUser> = (data) => {
    onSignup(data);
    reset();
  };

  return (
    <Container maxWidth="xl">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Create Account
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <TextFieldForm
            name="username"
            control={control}
            autoComplete="username"
            autoFocus
          />

          <TextFieldForm
            name="email"
            control={control}
            autoComplete="email"
            autoFocus
            label="Email Address"
          />

          <TextFieldForm
            name="password"
            control={control}
            autoComplete="current-password"
            autoFocus
            label="Password"
            type="password"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleSubmit(onSubmit)}
          >
            Sign In
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
    </Container>
  );
}

export default Signup;
