import React from 'react';
import { useLocation } from "react-router-dom";
import { Navbar, Container, Nav } from "react-bootstrap";
import { routes } from "../../routes";

function Header() {
  const location = useLocation();
  const logout = process.env.REACT_APP_AUTH_URL + "/realms/IPC/protocol/openid-connect/logout?redirect_uri=" + process.env.REACT_APP_LOGOUT_URL;
  const getBrandText = () => {
    for (let i = 0; i < routes.length; i++) {
      if (location.pathname.indexOf(routes[i].layout + routes[i].path) !== -1) {
        return routes[i].name;
      }
    }
    return "Dashboard";
  };
  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <div className="d-flex justify-content-center align-items-center ml-2 ml-lg-0">
          <Navbar.Brand
            href="#home"
            onClick={(e) => e.preventDefault()}
            className="mr-2"
          >
            {getBrandText()}
          </Navbar.Brand>
        </div>
        <Nav className="ml-auto" navbar>
          <Nav.Item>
            <Nav.Link
              className="m-0"
              href={logout}
            >
              <span className="no-icon">Logout</span>
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Header;
