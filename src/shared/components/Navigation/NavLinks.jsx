import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";
import "./NavLinks.css";

function NavLinks() {
  const auth = useContext(AuthContext);
  return (
    <ul className="nav-links">
      <li>
        <NavLink exact to="/">
          ALL USERS
        </NavLink>
      </li>
      {auth.isLoggedIn && (
        <React.Fragment>
          <li>
            <NavLink exact to={`${auth.userId}/places`}>
              MY PLACES
            </NavLink>
          </li>
          <li>
            <NavLink exact to="/places/new">
              ADD PLACE
            </NavLink>
          </li>
        </React.Fragment>
      )}
      {!auth.isLoggedIn ? (
        <li>
          <NavLink exact to="/auth">
            LOGIN/SIGNUP
          </NavLink>
        </li>
      ) : (
        <li onClick={() => auth.logout()}>
          <NavLink exact to="/">
            LOGOUT
          </NavLink>
        </li>
      )}
    </ul>
  );
}

export default NavLinks;
