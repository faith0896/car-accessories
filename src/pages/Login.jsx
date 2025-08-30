import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/Api.js";

export default function Login({ onLogin, onClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }

    try {
      const response = await loginUser({ email, password });
  const userData = response.data; // backend should return { id, name, email, role }
  onLogin(userData);
  onClose();
  navigate("/");
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.loginBox}>
        <button style={styles.closeBtn} onClick={onClose}>×</button>
        
        <h2 style={styles.title}>Login</h2>
        {error && <p style={styles.error}>{error}</p>}

        <form onSubmit={handleSubmit}>
          <input
            style={styles.input}
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            style={styles.input}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button style={styles.button} type="submit">Login</button>
        </form>

        <p style={styles.switchText}>
          Don't have an account?{" "}
          <span
            style={styles.registerLink}
            onClick={() => {
              onClose();
              window.dispatchEvent(new Event("open-register"));
            }}
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
}

const styles = {
  /* Overlay behind popup */
  overlay: {
    position: "fixed",
    top: 0, left: 0,
    width: "100%", height: "100%",
    background: "rgba(0,0,0,0.7)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2000,
  },

  /* Login box */
  loginBox: {
    position: "relative",
    background: "#fff",
    padding: "30px",
    borderRadius: "12px",
    width: "350px",
    textAlign: "center",
    boxShadow: "0 6px 20px rgba(0,0,0,0.4)",
    borderTop: "6px solid #ffcc00",
  },

  title: {
    marginBottom: "20px",
    color: "#000",
  },

  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "15px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    fontSize: "1rem",
  },

  button: {
    width: "100%",
    padding: "12px",
    background: "#ffcc00",
    border: "none",
    borderRadius: "8px",
    fontWeight: "bold",
    fontSize: "1rem",
    cursor: "pointer",
    transition: "0.3s",
  },

  buttonHover: {
    background: "#000",
    color: "#fff",
  },

  registerLink: {
    marginTop: "1rem",
    display: "block",
    fontSize: "0.9rem",
    color: "#007BFF",
    cursor: "pointer",
  },

  error: {
    color: "red",
    fontSize: "0.85rem",
    marginBottom: "1rem",
  },

  closeBtn: {
    position: "absolute",
    top: "10px",
    right: "12px",
    fontSize: "1.5rem",
    background: "none",
    border: "none",
    cursor: "pointer",
    color: "#000",
  },
};

