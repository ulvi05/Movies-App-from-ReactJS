import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Box, Typography } from "@mui/material";

function NotFound() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        textAlign: "center",
        backgroundColor: "inherit",
        padding: 3,
      }}
    >
      <Typography variant="h1" component="h1" color="error" gutterBottom>
        404
      </Typography>
      <Typography variant="h2" component="h2" color="white" gutterBottom>
        Oops! The page you are looking for does not exist.
      </Typography>
      <Typography variant="h5" color="white" paragraph>
        It looks like you've followed a broken link or entered a URL that doesn't exist on this site.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate('/')}
      >
        Go to Homepage
      </Button>
    </Box>
  );
}

export default NotFound;
