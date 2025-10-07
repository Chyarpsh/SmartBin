// src/AuthForm.js
import React, { useState } from "react";
import { auth } from "./firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import "./styles/AuthForm.css";

const AuthForm = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      if (isSignup) {
        await createUserWithEmailAndPassword(auth, email, password);
        setMessage("✅ Account created! You can now log in.");
        setIsSignup(false);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        onLogin();
      }
    } catch (error) {
      setMessage("❌ " + error.message);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      return setMessage("❗ Please enter your email first.");
    }
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("📩 Password reset email sent!");
    } catch (error) {
      setMessage("❌ " + error.message);
    }
  };

  return (
    <div className="auth-container">
      <h2>{isSignup ? "Sign Up" : "Login"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {!isSignup && (
          <button type="button" className="forgot-password" onClick={handleForgotPassword}>
            Forgot Password?
          </button>
        )}

        <button type="submit">{isSignup ? "Create Account" : "Login"}</button>
      </form>

      {message && <p className="auth-message">{message}</p>}

      <p onClick={() => setIsSignup(!isSignup)} className="toggle-link">
        {isSignup ? "Already have an account? Login" : "Don't have an account? Sign up"}
      </p>
    </div>
  );
};

export default AuthForm;
