import React from "react";
import "./Login.css";

const Login = () => {
  return (
    <div className="form-container">
      {/* Page Title */}
      <h1 className="form-title">Welcome Back</h1>
      {/* Login Form */}
      <form action="">
        {/* Email Address Field */}
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email address"
          />
        </div>
        {/* Password Field */}
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
          />
        </div>
        {/* Submit Button */}
        <button type="submit" className="btn-primary">
          Login
        </button>
        {/* Link to Register Page */}
      </form>
    </div>
  );
};

export default Login;
