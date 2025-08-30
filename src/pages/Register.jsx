import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/Api.js";

export default function Register({ onClose }) {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
  e.preventDefault();

  if (!name || !email || !password) {
    setError("Please fill in all fields");
    return;
  }

  try {
    const res = await registerUser({ name, email, password });
    const buyerId = res.data?.userId; // capture the returned user ID

    if (!buyerId) {
      throw new Error("User ID not returned from server");
    }

    alert(`Registration successful! Your buyer ID is ${buyerId}. Please login.`);
    
    // Optionally store buyerId in localStorage for immediate use
    localStorage.setItem("buyerId", buyerId);

    onClose();
    navigate("/login");
  } catch (err) {
    console.error(err);
    setError("User already exists or server error");
  }
};


  return (
    <div style={styles.overlay}>
      <div style={styles.registerBox}>
        <button style={styles.closeBtn} onClick={onClose}>×</button>

        <h2 style={styles.title}>Register</h2>
        {error && <p style={styles.error}>{error}</p>}
        <form onSubmit={handleRegister}>
          <input
            style={styles.input}
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            style={styles.input}
            type="email"
            placeholder="Email Address"
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
          <button style={styles.button} type="submit">Register</button>
        </form>

        <p style={styles.switchText}>
          Already have an account?{" "}
          <span
            style={styles.link}
            onClick={() => {
              onClose();
              navigate("/login");
            }}
          >
            Login here
          </span>
        </p>
      </div>
    </div>
  );
}

const styles = {
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
  registerBox: {
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
  switchText: {
    marginTop: "1rem",
    fontSize: "0.9rem",
    color: "#000",
  },
  link: {
    color: "#007BFF",
    cursor: "pointer",
    fontWeight: "bold",
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

