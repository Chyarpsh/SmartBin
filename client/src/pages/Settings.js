import React, { useState } from "react";
import { auth } from "../firebase";
import { deleteUser } from "firebase/auth";
import "../styles/Settings.css";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

function Settings() {
  const [fontSize, setFontSize] = useState("normal");
  const [highContrast, setHighContrast] = useState(false);
  const [inputPreference, setInputPreference] = useState("text");
  const [feedback, setFeedback] = useState("");
  const [feedbackMsg, setFeedbackMsg] = useState("");
  const [feedbackMessage, setFeedbackMessage] = useState("");

  const handleDeleteAccount = async () => {
    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      try {
        await deleteUser(auth.currentUser);
        alert("Account deleted.");
      } catch (error) {
        alert("Failed to delete account. Please re-login and try again.");
      }
    }
  };

  const handleSubmitFeedback = () => {
    // Here you could send feedback to a backend/Firebase
    setFeedbackMsg("Thank you for your feedback!");
    setFeedback("");
  };

  
const handleFeedbackSubmit = async () => {
  try {
    await addDoc(collection(db, "feedback"), {
      uid: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      message: feedback,
      timestamp: serverTimestamp(),
    });
    setFeedbackMessage("Feedback submitted. Thank you!");
    setFeedback("");
  } catch (err) {
    setFeedbackMessage("Failed to submit feedback.");
    console.error(err);
  }
};

  return (
    <div className={`settings-page ${highContrast ? "high-contrast" : ""} ${fontSize}`}>
      <h2>Settings</h2>

      <div className="settings-section">
        <h3>Accessibility</h3>
        <button onClick={() => setFontSize(fontSize === "normal" ? "large" : "normal")}>
          Toggle Font Size ({fontSize === "normal" ? "Normal" : "Large"})
        </button>
        <button onClick={() => setHighContrast(!highContrast)}>
          {highContrast ? "Disable" : "Enable"} High Contrast Mode
        </button>
      </div>

      <div className="settings-section">
        <h3>Default Input Preference</h3>
        <select value={inputPreference} onChange={(e) => setInputPreference(e.target.value)}>
          <option value="text">Text</option>
          <option value="voice">Voice</option>
          <option value="camera">Camera</option>
        </select>
        <p>Default: {inputPreference}</p>
      </div>

      <div className="settings-section">
        <h3>Submit Feedback</h3>
        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Give us a feedback!"
        />
        <button onClick={handleSubmitFeedback}>Send Feedback</button>
        {feedbackMsg && <p>{feedbackMsg}</p>}
      </div>
      
      <div className="settings-section">
        <h3>Account Management</h3>
        <button onClick={handleDeleteAccount} className="delete-btn">
            Delete Account
        </button>
      </div>
    </div>
  );
}

export default Settings;
