import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./Signup.css"

function Signup() {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  async function signup(event) {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    try {
      const response = await axios.post("http://localhost:8080/api/v1/details/signup", {
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password,
        confirmPassword:confirmPassword,
      });

      if (response.data === "Signup successful!") {
        alert("Signup successful!");
        navigate("/login"); // Redirect to login page after successful signup
      } else {
        alert(response.data); // Show error message from the backend
      }
    } catch (err) {
      alert("Signup failed.");
    }
  }

  return (
    <div className="container">
      <h1>Sign Up</h1>
      <div class="container mt-4" >
      <form>
        <div className="form-group">
          <label>First Name</label>
          <input
            type="text"
            class="form-control"
            id="firstname"
            value={firstname}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>


        <div className="form-group">
          <label>Last Name</label>
          <input
            type="text"
            class="form-control"
            id="lastname"
            value={lastname}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>



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


        <div className="form-group">
          <label>Confirm Password</label>
          <input
            type="password"
            class="form-control"
            id="confirmpassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>


        <button className="btn btn-primary" onClick={signup}>Sign Up</button>
        <p>Already have an account? <a href="/login">Login here!</a></p>
      </form>
      </div>
    </div>
  );
}

export default Signup;
