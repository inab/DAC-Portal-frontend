import React from 'react';
import { useLocation, NavLink } from "react-router-dom";
import { Nav } from "react-bootstrap";
import logo from "../../assets/img/ipc-logo.png";

function Sidebar({ color, image, routes }) {
  const location = useLocation();
  const role = localStorage.getItem("role");
  const activeRoute = (routeName) => {
    return location.pathname.indexOf(routeName) > -1 ? "active" : "";
  };
  return (
    <div className="sidebar" data-image={image} data-color={color}>
      <div
        className="sidebar-background"
        style={{
          backgroundImage: "url(" + image + ")"
        }}
      />
      <div className="sidebar-wrapper">
        <a href="/">
          <div className="logo d-flex align-items-center justify-content-start">
            <div className="logo-img">    
              <img src={logo} />
            </div>
            <p className="simple-text"> DAC PORTAL </p>
          </div>
        </a>
        <Nav>
          {routes.map((prop, key) => {
            if (!prop.redirect && prop.role === role)
              return (
                <li
                  className={activeRoute(prop.layout + prop.path)}
                  key={key}
                >
                  <NavLink
                    to={prop.layout + prop.path}
                    className="nav-link"
                    activeClassName="active"
                  >
                    <i className={prop.icon} />
                    <p>{prop.name}</p>
                  </NavLink>
                </li>
              );
            return null;
          })}
        </Nav>
      </div>
    </div>
  );
}

export default Sidebar;
