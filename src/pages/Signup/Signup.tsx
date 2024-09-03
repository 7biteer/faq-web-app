import { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  Link,
  Typography,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { TextFieldForm } from "@/components/Form/TextFieldForm";
import { SignupUser } from "@/interfaces/User";
import { useAuthStore } from "@/stores/auth-store/auth-store-provider";
import { useNavigate } from "react-router-dom";

const schema = yup.object().shape({
  username: yup.string().max(255).required("Username is required"),
  email: yup
    .string()
    .email("Must be a valid email")
    .max(255)
    .required("Email is required"),
  password: yup
    .string()
    .required("Please enter a password")
    .min(8, "Password too short")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character",
    ),
});

function Signup() {
  const navigate = useNavigate();
  const { onSignup } = useAuthStore((state) => state);

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const { control, handleSubmit, reset } = useForm<SignupUser>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<SignupUser> = (data) => {
    onSignup(data);
    reset();
    navigate("/login");
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
      <Card sx={{ maxWidth: "660px", p: 2, marginTop: 10 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <PersonIcon />
          </Avatar>

          <Typography component="h1" variant="h5">
            Create Account
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextFieldForm
              name="username"
              control={control}
              label="Username"
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
              type={showPassword ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      size="large"
                      color="secondary"
                    >
                      {showPassword ? (
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit(onSubmit)}
            >
              Sign Up
            </Button>

            <Grid container>
              <Grid item xs></Grid>
              <Grid item>
                <Link href="/login" variant="body2">
                  {"Already have an account? Login"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Card>
    </Container>
  );
}

export default Signup;
