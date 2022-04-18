import { useState } from "react";

export default function PublicHeader() {
    //this will add zero pixel maximum height.
  const [height, setHeight] = useState("0px");
  /*this function will check if the maximum height is zero,
    then it will set height to 130px, otherwise maximum height is zero.  
    */
  function toggleMenu() {
    if (height === "0px") setHeight("130px");
    else setHeight("0px");
  }
  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

    return (
        <div className="navbar-container">
        <div className="navbar">
          <img
            className="logo"
            onClick={handleLogout}
            src={require("../media/icons/icons8-infinity-90.png")}
          />
          <p>InfinityTracker™</p>
          <nav>
            <ul id="menuList" style={{ maxHeight: height }}>
              <li>
                <a href="/">InfinityTracker™</a>
              </li>
              <li>
                <a href="./internal-access">
                  SIGN UP | LOGIN
                  <img
                    src={require("../media/icons/icons8-enter-96.png")}
                    width="15px"
                    height="13px"
                  />
                </a>
              </li>
            </ul>
          </nav>
          <img
            className="menu-icon"
            src={require("../media/icons/icons8-menu-squared-50.png")}
            onClick={toggleMenu}
          />
        </div>
      </div>
    )
}