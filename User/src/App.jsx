import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './Login';        // Login page
import Signup from './Signup';      // Signup page
import UserDetails from './UserDetails';  // Account details page

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/userdetails" element={<UserDetails />} />
          <Route path="/" element={<Login />} /> {/* Default route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
