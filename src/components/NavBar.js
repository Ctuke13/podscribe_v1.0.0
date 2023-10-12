import React from "react";
import "../App.css";

function NavBar() {
  return (
    <div className="nav-bar">
      <button className="upload-btn">Upload</button>
      <a href="/library" className="nav-link">
        Library
      </a>
      <a href="/share" className="nav-link">
        Share
      </a>
      <p className="storage-text">Storage</p>
      <div className="storage-indicator">
        {/* This div will represent the filled portion of the storage bar */}
        <div className="filled-storage"></div>
      </div>
    </div>
  );
}

export default NavBar;
