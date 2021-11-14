import React from "react";

// react-bootstrap components

import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Table,
  Container,
  Row,
  Col,
} from "react-bootstrap";

function Policies() {
  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <h4> Create policies</h4>
            <p> Here you can add new policies for the different datasets of your DACs. </p>
            <br/>
            <h5> CHOP </h5>
            <Card>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover">
                  <thead>
                    <tr>
                      <th className="border-0"> DAC ID </th>
                      <th className="border-0"> Dataset </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>CHOP</td>
                      <td>CHOP_000</td>
                      <td class="text-right">
                        <Button variant="success" className="btn-fill disabled">Update</Button>
                      </td>
                    </tr>
                    <tr>
                      <td>CHOP</td>
                      <td>CHOP_001</td>
                      <td class="text-right">
                        <Button variant="success" className="btn-fill disabled">Update</Button>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
            <br/>
            <h5> R2 </h5>
            <Card>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover">
                  <thead>
                    <tr>
                      <th className="border-0"> DAC ID </th>
                      <th className="border-0"> Dataset </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>R2</td>
                      <td>R2_000</td>
                      <td class="text-right">
                        <Button variant="success" className="btn-fill info disabled">Update</Button>
                      </td>
                    </tr>
                    <tr>
                      <td>R2</td>
                      <td>R2_001</td>
                      <td class="text-right">
                        <Button variant="success" className="btn-fill info disabled">Update</Button>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Policies;
