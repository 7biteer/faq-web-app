import React from "react";
import { Box, Button, Grid, Typography } from "@mui/material";

function Home() {
  const authCtx = useContext(AuthContext);
  const navigation = useNavigate();

  const askQuestionHandler = () => {
    if (authCtx.isLoggedIn) {
      navigation("/item/_new");
    } else {
      navigation("/login");
    }
  };
  return (
    <Box>
      <Grid container>
        <Grid item>
          <Typography>All Questions</Typography>
        </Grid>

        <Grid item>
          <Button variant="contained">Ask</Button>
        </Grid>
      </Grid>

      <div className="home-container">
        <ul className="tag-list">
          {categoryCtx.items.map((item) => (
            <ViewCategoryComponent
              key={item.id}
              id={item.id}
              title={item.title}
              bg="light"
            />
          ))}
        </ul>

        <ListQuestionComponent />
      </div>
    </Box>
  );
}

export default Home;
