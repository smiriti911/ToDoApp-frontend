import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ToDo from "./components/ToDo";
import Login from "./components/Login";

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <div className="bg-neutral-800 min-h-screen flex items-center justify-center">
      <Router>
        <Routes>
          {/* Redirect to /todo if logged in, otherwise show login */}
          <Route path="/" element={isAuthenticated ? <Navigate to="/todo" /> : <Login />} />
          
          {/* Protected To-Do Page */}
          <Route path="/todo" element={isAuthenticated ? <ToDo /> : <Navigate to="/" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
