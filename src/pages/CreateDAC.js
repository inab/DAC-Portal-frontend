import React from "react";
import {
  Button,
  Card,
  Form,
  Container,
  Row,
  Col,
} from "react-bootstrap";

function CreateDAC() {
  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
          <h4> Create DAC group </h4>
            <Card>
              <Card.Body>
                <Form>
                  <Row>
                    <Col className="pr-1" md="4">
                      <Form.Group>
                        <label> DAC ID</label>
                        <Form.Control
                          placeholder="DAC_ID"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="px-1" md="8">
                      <Form.Group>
                        <label> DAC Name </label>
                        <Form.Control
                          placeholder="My wonderful DAC name"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="px-1" md="8">
                      <label> DAC study </label>  
                      <Form.Control
                          placeholder="Particular study under control"
                          type="text"
                        ></Form.Control>                
                    </Col>
                    <Col className="px-1" md="4">
                      <label> Total Datasets </label>  
                      <Form.Control
                          placeholder="Number of datasets in this study"
                          type="text"
                        ></Form.Control>                
                    </Col>
                  </Row>
                  <Row>
                    <Col className="px-1" md="4">
                      <label> First Name </label>  
                      <Form.Control
                          disabled
                          placeholder="Your name..."
                          type="text"
                        ></Form.Control>                
                    </Col>
                    <Col className="px-1" md="4">
                      <label> Last Name </label>  
                      <Form.Control
                          disabled
                          placeholder="Your surname..."
                          type="text"
                        ></Form.Control>                
                    </Col>
                    <Col className="pl-1" md="4">
                      <Form.Group>
                        <label htmlFor="exampleInputEmail1">
                          Email address
                        </label>
                        <Form.Control
                          disabled
                          placeholder="Contact email"
                          type="email"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="12">
                      <Form.Group>
                        <label>Study description</label>
                        <Form.Control
                          cols="80"
                          rows="4"
                          placeholder="Company"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Button
                    className="btn-fill pull-right disabled"
                    type="submit"
                    variant="info"
                  >
                    Create DAC
                  </Button>
                  <div className="clearfix"></div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default CreateDAC;
