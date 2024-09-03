import {
  Avatar,
  Box,
  Button,
  Card,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { useAuthStore } from "@/stores/auth-store/auth-store-provider";
import { TextFieldForm } from "@/components/Form/TextFieldForm";
import { Profile as IProfile } from "@/interfaces/User";

function Profile() {
  const navigate = useNavigate();

  const { isLoggedIn, profile, updateProfile } = useAuthStore((state) => state);

  if (!isLoggedIn && !profile) {
    navigate("/login");
  }

  const { control, handleSubmit } = useForm<IProfile>({});

  const onSubmit: SubmitHandler<IProfile> = (data) => {
    updateProfile(profile!.id, data);
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
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar
              alt={profile?.username}
              src={profile?.avatarUrl}
              sx={{ width: 56, height: 56 }}
            />

            <Typography component="h1" variant="h2">
              Profile
            </Typography>
          </Stack>

          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextFieldForm
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              defaultValue={profile?.email}
              control={control}
            />

            <TextFieldForm
              fullWidth
              name="username"
              label="Username"
              type="text"
              id="username"
              defaultValue={profile?.username}
              control={control}
            />

            <TextFieldForm
              fullWidth
              name="avatarUrl"
              label="Avatar URL"
              type="text"
              id="avatarUrl"
              defaultValue={profile?.avatarUrl}
              control={control}
              multiline
              rows={5}
            />

            <Box width="100%" display="flex" justifyContent="flex-end">
              <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleSubmit(onSubmit)}
              >
                Save
              </Button>
            </Box>
          </Box>
        </Box>
      </Card>
    </Container>
  );
}

export default Profile;
