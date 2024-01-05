import React, { useState } from "react";
import "../App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import "@fontsource/inter";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import micBg from "../images/mic_bg.jpg";
import { useAuth } from "../contexts/AuthContext";
import Login from "../components/Login";
import Register from "../components/Register";
// import Login from "../components/SignIn"

// Creates a default material-ui theme.
const defaultTheme = createTheme();

function LandingPage() {
  const [isRegister, setIsRegister] = useState(false);
  const { currentUser } = useAuth();
  console.log(currentUser ?? "No User");

  // const podcastName = useRecoilValue(userPodcastNameSelector);

  // Function to toggle isRegister
  const toggleIsRegister = () => {
    setIsRegister((prevIsRegister) => !prevIsRegister);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${micBg})`,
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={6}
          square
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh", // Set a minimum height to occupy the full viewport height
            overflow: "auto", // Enable vertical scrolling if needed
          }}
        >
          {/* Conditionally render either Login or Register based on isRegister */}
          {isRegister ? (
            <Register toggleIsRegister={toggleIsRegister} />
          ) : (
            <Login toggleIsRegister={toggleIsRegister} />
          )}
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default LandingPage;
