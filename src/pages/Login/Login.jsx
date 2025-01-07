import React, { useEffect, useState } from "react";
import "./Login.css";
import Logo from "../../assets/logo.png";
import { login, signup } from "../../firebase";
import { Await } from "react-router-dom";
import { toast } from "react-toastify";
import netflix_spinner from "../../assets/loader.gif"

const Login = () => {
  const [signState, setSignState] = useState("Sign In");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading,setLoading] = useState(false)

  const user_auth = async (event) => {
    event.preventDefault();
    setLoading(true)
    if (signState == "Sign In") {
      const status = await login(email, password);
      if (status) {
        toast.success("Logged In Successfully");
      } else {
        toast.error("invalid credential");
      }
    } else {
      await signup(name, email, password);
    }
    setLoading(false)
  };

  return (
    
    <div className="login">
      <img className="login-logo" src={Logo} alt="" />
      <div className="login-form">
        <h1>{signState}</h1>
        <form action="">
          {signState == "Sign Up" ? (
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          ) : (
            <></>
          )}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          {loading?<div className="loading">
            <button onClick={user_auth} type="submit">
            <img src={netflix_spinner} alt="" />
          </button>
    </div>:
          <button onClick={user_auth} type="submit">
            {signState}
          </button>}
          <div className="form-help">
            <div className="remember">
              <input type="checkbox" />
              <label htmlFor="">Remember Me</label>
            </div>
            <p>Need Help?</p>
          </div>
        </form>
        <div className="form-switch">
          {signState == "Sign In" ? (
            <p>
              New to Netflix?{" "}
              <span
                onClick={() => {
                  setSignState("Sign Up");
                }}
              >
                Sign Up Now
              </span>
            </p>
          ) : (
            <p>
              Already have account?{" "}
              <span
                onClick={() => {
                  setSignState("Sign In");
                }}
              >
                Sign In Now
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
