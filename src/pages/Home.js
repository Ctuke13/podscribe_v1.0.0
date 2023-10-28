import React from "react";
import "../App.css";
import SearchBar from "../components/SearchBar";
import NavBar from "../components/NavBar";
import "@fontsource/inter";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Dashboard from "../components/Dashboard";

function Home() {
  return (
    <Box>
      {/* <SearchBar /> */}
      <Stack direction="row" spacing={2} justifyContent="space-between">
        <Dashboard />
      </Stack>
    </Box>
    //   // <div className="home-container">
    //     {/* <div className="header-container">
    //       <SearchBar />
    //     </div> */}
    //     // <div className="content-section">
    //       {/* <div className="nav-container"> */}

    //       <NavBar />
    //       {/* </div> */}
    //       {/* <Dashboard /> */}
    //     {/* </div> */}
    //   // </div>
    // //
  );
}

export default Home;
