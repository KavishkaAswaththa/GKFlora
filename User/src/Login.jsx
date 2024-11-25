import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function login(event) {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/v1/details/login", {
        email: email,
        password: password,
      });

      if (response.data === "Login successful!") {
        navigate("/userdetails"); 
      } else {
        alert(response.data);
      }
    } catch (err) {
      alert("Login failed.");
    }
  }

  return (
    <div>
      <h1>Login</h1>
      <div className="container mt-4">
      <form>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            class="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            class="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

        </div>

        <button className="btn btn-primary" onClick={login}>Login</button>
        <p>Don't have an account? <a href="/signup">Sign up here!</a></p>
      </form>
    </div>
</div>
  );
}

export default Login;
