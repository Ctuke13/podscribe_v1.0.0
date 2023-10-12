import React from "react";
import "../App.css";

function SignUpModal({ onClose }) {
  return (
    <div className="signup-modal-overlay">
      <div className="signup-modal">
        <button onClick={onClose} className="close-btn">
          X
        </button>
        <h2>Sign Up</h2>
        <form onSubmit={null}>
          <input type="text" placeholder="First Name" />
          <input type="text" placeholder="Last Name" />
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <input type="password" placeholder="Confirm Password" />
          <input type="text" placeholder="Podcast Name" />
          <select>
            <option value="">Select Genre</option>
            <option value="tech">Tech</option>
            <option value="tech">Music</option>
            <option value="tech">Sports</option>
            <option value="tech">Politics</option>
            {/* Add other genres as needed */}
          </select>
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
}

export default SignUpModal;
