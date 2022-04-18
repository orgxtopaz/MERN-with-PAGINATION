import React, { useState } from "react";
import Login from "../../component/login-form";
import Signup from "../../component/sign-up-form";

export default function InternalAccess() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="authContainer">
      <div className="wrapper">
        <div className="title-text">
          {isLogin ? (
            <div className="title login">
              <img
                src={require("../../media/icons/icons8-infinity-90-BW.png")}
                width="40px"
              />
            </div>
          ) : (
            <div className="title signup">
              Create an InfinityTracker™ account
            </div>
          )}
        </div>
        <div className="auth-form-container">
          <div className="slide-controls">
            <input type="radio" name="slide" id="login" checked={isLogin} />
            <input type="radio" name="slide" id="signup" checked={!isLogin} />
            <label
              htmlFor="login"
              className="slide login"
              onClick={() => setIsLogin(true)}
            >
              Login
            </label>{" "}
            <label
              htmlFor="signup"
              className="slide signup"
              onClick={() => setIsLogin(false)}
            >
              Sign Up
            </label>
            <div className="slider-tab"></div>
          </div>
          <div className="form-inner">
            {isLogin ? (
              <Login setIsLogin={setIsLogin}></Login>
            ) : (
              <Signup></Signup>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
