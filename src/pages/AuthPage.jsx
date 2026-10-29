// Login and Sign up page. One form that switches between the two modes.
import { useState } from "react";
import "./auth.css"; // styles that only this page uses
import {signUp} from "../api.js";
import {login} from "../api.js";


export default function AuthPage() {
  const [mode, setMode] = useState("login"); // "login" or "signup"
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const isSignup = mode === "signup";

  // Switch between Log in and Sign up, and clear the form.
  function switchMode(newMode) {
    setMode(newMode);
    setPassword("");
    setConfirm("");
    setErrors({});
  }

  // Check the inputs. Returns an object of error messages (empty = no problems).
  function validate() {
    const found = {};

    // Validation for email
    if(!email.includes("@")) {
      found.email= "Please a valid email address.";
    }

    if (isSignup && username.trim() === "") {
      found.username = "Please enter a username.";
    } else if (isSignup && !/^[a-zA-Z0-9_]{3,20}$/.test(username)) {
      found.username = "Use 3–20 letters, numbers, or underscores.";
    }

    if (password === "") {
      found.password = "Please enter a password.";
    } else if (isSignup && password.length < 8) {
      found.password = "Password must be at least 8 characters.";
    }

    if (isSignup && confirm !== password) {
      found.confirm = "Passwords don't match.";
    }

    return found;
  }

  async function handleSubmit(event) {
    event.preventDefault(); // stop the browser from reloading the page

    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) return; // stop if there are errors

    if(isSignup){
      const isError= await signUp(email.trim(), password, username.trim());
      if(isError){
        setErrors({form: isError});
        return;
      }
    }
    else{
      const isError= await login(email.trim(), password);
      if(isError){
        setErrors({form: isError});
        return;
      }
    }
  }

  return (
    <div className="auth-screen">
      <div className="auth-card">
        <div className="auth-brand">TimeQuest</div>
        <h1>{isSignup ? "Create your account" : "Welcome back"}</h1>
        <p className="subtitle">
          {isSignup ? "Start earning points for finishing work on time." : "Log in to see your assignments and creature."}
        </p>

        {/* Log in / Sign up switcher */}
        <div className="auth-tabs" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={!isSignup}
            className={!isSignup ? "auth-tab active" : "auth-tab"}
            onClick={() => switchMode("login")}
          >
            Log in
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={isSignup}
            className={isSignup ? "auth-tab active" : "auth-tab"}
            onClick={() => switchMode("signup")}
          >
            Sign up
          </button>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          {/* Email */}
           <div className="field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={errors.email ? "input has-error" : "input"}
            />
            {errors.email && <p className="field-error">{errors.email}</p>}
          </div>
          
          {/* Username */}
          {isSignup && (
          <div className="field">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={errors.username ? "input has-error" : "input"}
            />
            {errors.username && <p className="field-error">{errors.username}</p>}
          </div>
          )}
        

          {/* Password */}
          <div className="field">
            <label htmlFor="password">Password</label>
            <div className="password-wrap">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete={isSignup ? "new-password" : "current-password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={errors.password ? "input has-error" : "input"}
              />
              <button type="button" className="show-btn" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            {errors.password && <p className="field-error">{errors.password}</p>}
            {isSignup && !errors.password && <p className="field-hint">At least 8 characters.</p>}
          </div>

          {/* Confirm password (Sign up only) */}
          {isSignup && (
            <div className="field">
              <label htmlFor="confirm">Confirm password</label>
              <input
                id="confirm"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className={errors.confirm ? "input has-error" : "input"}
              />
              {errors.confirm && <p className="field-error">{errors.confirm}</p>}
            </div>
          )}
          {errors.form && <p className="field-error">{errors.form}</p>}
          <button type="submit" className="btn auth-submit">
            {isSignup ? "Create account" : "Log in"}
          </button>
        </form>

        <p className="auth-switch">
          {isSignup ? "Already have an account? " : "Don't have an account? "}
          <button type="button" className="btn-link" onClick={() => switchMode(isSignup ? "login" : "signup")}>
            {isSignup ? "Log in" : "Sign up"}
          </button>
        </p>
      </div>
    </div>
  );
}
