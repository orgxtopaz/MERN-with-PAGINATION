import React, { useState } from "react";

export default function Header() {
  //this will add zero pixel maximum height.
  const [height, setHeight] = useState("0px");
  /*this function will check if the maximum height is zero,
    then it will set height to 130px, otherwise maximum height is zero.  
    */
  function toggleMenu() {
    if (height == "0px") setHeight("130px");
    else setHeight("0px");
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div className="navbar-container">
      <div className="navbar">
        <img
          onClick={() => (window.location.href = "./create-activities")}
          src={require("../media/icons/icons8-infinity-90.png")}
          className="logo"
        />
        <p>InfinityTracker™</p>
        <nav>
          <ul id="menuList" style={{ maxHeight: height }}>
            <li>
              <a href="./create-activities">CREATE ACTIVITY</a>
            </li>
            <li>
              <a href="./dashboard">DASHBOARD</a>
            </li>
            <li>
              <a href="./profile">PROFILE</a>
            </li>
            <li>
              <a href="#" onClick={handleLogout}>
               
                LOG OUT
                <img
                  width="15px"
                  height="12px"
                  src={require("../media/icons/icons8-log-out-64.png")}
                />
              </a>
            </li>
          </ul>
        </nav>
        <img
          src={require("../media/icons/icons8-menu-squared-50.png")}
          className="menu-icon"
          onClick={toggleMenu}
        />
      </div>
    </div>
  );
}
