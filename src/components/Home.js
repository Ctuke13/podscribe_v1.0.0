import React from "react";
import "../App.css";
import SearchBar from "./SearchBar";
import NavBar from "./NavBar";
import Dashboard from "./Dashboard";
import "@fontsource/inter";

function Home() {
  return (
    <div className="home-container">
      <div className="header-container">
        <SearchBar />
      </div>
      <div className="content-section">
        <div className="nav-container">
          <NavBar />
        </div>
        <Dashboard />
      </div>
    </div>
  );
}

export default Home;
