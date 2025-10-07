// src/App.js
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase";
import AuthForm from "./AuthForm";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Settings from "./pages/Settings";
import Activity from "./pages/Activity";
import Navbar from "./components/Navbar"; 
import "./App.css";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
  };

  if (!user) {
    return <AuthForm onLogin={() => {}} />;
  }

  return (
    <Router>
      <div className="App">
        {/*New Navbar with dropdown menu */}
        <Navbar onLogout={handleLogout} />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/activity" element={<Activity />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
