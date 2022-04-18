import React from "react";
import { useNavigate } from "react-router-dom";
//adding pages
import Home from "./pages/public/home";
import InternalAccess from "./pages/public/access-form";
// import Signup from "./component/sign-up-form";
// import Login from "./component/login-form";
import Activity from "./pages/private/activities-form";
import Dashboard from "./pages/private/dashboard";
import Profile from "./pages/private/profile";

//adding css respective to the pages
import "./css/home.css";
import "./css/main.css";
import "./css/internal-access.css";
import "./css/activities-form.css";
import "./css/dashboard.css";
import "./css/profile.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        //adding routes to pages here...
        <Route path="/" exact element={<Home />} />
        <Route path="/internal-access" exact element={<InternalAccess />} />
        <Route path="/create-activities" exact element={<Activity />} />
        <Route path="/dashboard" exact element={<Dashboard />} />
        <Route path="/profile" exact element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}
