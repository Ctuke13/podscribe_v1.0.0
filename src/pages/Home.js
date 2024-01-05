import React from "react";
import "../App.css";

import "@fontsource/inter";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Dashboard from "../components/Dashboard";

import { useAuth } from "../contexts/AuthContext"

function Home() {
  const { currentUser } = useAuth();
  return (
    <Box>
      <Stack direction="row" spacing={2} justifyContent="space-between">
        <Dashboard currentUser = { currentUser } />
      </Stack>
    </Box>
  );
}

export default Home;
