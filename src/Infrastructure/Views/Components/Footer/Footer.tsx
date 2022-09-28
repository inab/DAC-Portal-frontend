import React from 'react';
import { Container } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="footer px-0 px-lg-3">
      <Container fluid>
        <nav>
          <ul className="footer-menu">
            <li>
              <a href="https://ipc-project.eu">
                Project page
              </a>
            </li>
            <li>
              <a href="https://catalogue.ipc-project.bsc.es">
                Catalogue portal
              </a>
            </li>
            <li> 
              <a href="https://vre.ipc-project.bsc.es">
                Virtual Research Environment
              </a>
            </li>
          </ul>
          <p className="copyright text-center">
            iPC project {new Date().getFullYear()}
          </p>
        </nav>
      </Container>
    </footer>
  );
}

export default Footer;
