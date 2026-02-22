import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ToDo from "./components/ToDo";
import Login from "./components/Login";

function App() {
  
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  console.log("Authentication status:", isAuthenticated);
  return (
    <div className="bg-neutral-800 min-h-screen flex items-center justify-center p-4">
      <Router>
        <Routes>
          <Route path="/" element={isAuthenticated ? <Navigate to="/todo" /> : <Login />} />
          <Route path="/todo" element={isAuthenticated ? <ToDo /> : <Navigate to="/" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
