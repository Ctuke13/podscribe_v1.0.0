import React from "react";
import "../App.css";
import logoPath from "../images/logo.png";

function SearchBar() {
  return (
    <div className="search-bar">
      <img src={logoPath} alt="Logo" className="logo" />
      <input type="text" placeholder="Search..." className="search-input" />
      <a href="/account" className="account-link">
        My Account
      </a>
    </div>
  );
}

export default SearchBar;
