import React from "react";
import { Grid, Typography } from "@mui/material";

const Header = () => {
  return (
    <Grid container className="header" alignItems="center">
      <Grid item>
        <img src="/logo.png" alt="AI Among Us" style={{ marginRight: "10px", width: "50", height: "50px" }} />
      </Grid>
      <Grid item>
        <Typography variant="h5">Can you find the AI among us?</Typography>
      </Grid>
    </Grid>
  );
};

export default Header;
