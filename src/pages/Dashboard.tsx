import React from 'react';
import { Card, Container, Row, Col } from "react-bootstrap";

const Dashboard = () => {
  return (
    <>
      <Container fluid>
      <h2> Welcome to the iPC DAC Portal </h2>
        <Row>
          <Col lg="4" sm="4">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="fa fa-address-card" style={{ color: "purple" }}></i>
                    </div>
                  </Col> 
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Registered DACs</p>
                      <Card.Title as="h4">15</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
          <Col lg="4" sm="4">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="fa fa-copy" style={{ color: "orange" }}></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Registered Datasets</p>
                      <Card.Title as="h4"> 992 </Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
          <Col lg="4" sm="4">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="fa fa-users" style={{ color: "blue" }}></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Total users</p>
                      <Card.Title as="h4">23</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Dashboard;
