import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import httpHome from "../Api/httpHome";
import CustomAlerts from "../utills/customAlert/CustomAlerts";
import { observer } from "@legendapp/state/react";
import { error$ } from "../store/customErrors";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const api = httpHome();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    api
      .login({
        email: username,
        password: password,
      })
      .then((res) => {
        if (res.status === 1) {
          localStorage.setItem("trideFairToken", res?.token);
          localStorage.setItem("trideFairUserId", res?.data?.id);
          localStorage.setItem("trideFairUser", JSON.stringify(res?.data));

          navigate("/");
        } else {
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Welcome Back!</h2>
        <p style={styles.subtitle}>Please log in to your account</p>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label htmlFor="username" style={styles.label}>
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={styles.input}
              placeholder="Enter your username"
            />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="password" style={styles.label}>
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              placeholder="Enter your password"
            />
          </div>
          <button type="submit" style={styles.button}>
            Log In
          </button>
          <div className="text-left text-red-700">
            <CustomAlerts message={error$?.message?.get()} />
          </div>
        </form>

        <p style={styles.footerText}>
          Don't have an account?{" "}
          <Link to="/Register" style={styles.link}>
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#f0f2f5",
    fontFamily: "Arial, sans-serif",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    padding: "40px",
    width: "100%",
    maxWidth: "400px",
    textAlign: "center",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#333333",
    marginBottom: "10px",
  },
  subtitle: {
    fontSize: "14px",
    color: "#666666",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  formGroup: {
    marginBottom: "20px",
    textAlign: "left",
  },
  label: {
    fontSize: "14px",
    color: "#333333",
    marginBottom: "8px",
    display: "block",
  },
  input: {
    width: "100%",
    padding: "12px",
    border: "1px solid #dddddd",
    borderRadius: "6px",
    fontSize: "14px",
    outline: "none",
    transition: "border-color 0.3s ease",
  },
  inputFocus: {
    borderColor: "#007bff",
  },
  button: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#007bff",
    color: "#ffffff",
    border: "none",
    borderRadius: "6px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  buttonHover: {
    backgroundColor: "#0056b3",
  },
  footerText: {
    fontSize: "14px",
    color: "#666666",
    marginTop: "20px",
  },
  link: {
    color: "#007bff",
    textDecoration: "none",
    fontWeight: "bold",
  },
};

export default observer(Login);
