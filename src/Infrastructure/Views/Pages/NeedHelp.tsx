import React from 'react';
import { Container } from "react-bootstrap";

const NeedHelp = () => {
  return (
    <>
      <Container fluid>
        <h3> Need assistance? </h3>
        <p> Please, send us an email to 
          <a href = "mailto: ipc-support@bsc.es"> ipc-support@bsc.es  
          </a> and we will contact you as soon as possible. 
        </p>
      </Container>
    </>
  );
}

export default NeedHelp;

