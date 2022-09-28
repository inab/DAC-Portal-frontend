import React from 'react';
import { Button, Card, Table, Container, Row, Col } from "react-bootstrap";

const MyDACs = () => {
  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <h4> DAC Memberships </h4>
            <p> Here is the list of the DAC that you are currently a member: </p>
            <Card className="strpied-tabled-with-hover">
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      <th className="border-0">ID</th>
                      <th className="border-0">Name</th>
                      <th className="border-0">Study</th>
                      <th className="border-0">Total datasets</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>CHOP</td>
                      <td>Children Hospital of Philadelphia</td>
                      <td>Open Paediatric Brain Tumor Atlas</td>
                      <td>970</td>
                    </tr>
                    <tr>
                      <td>R2</td>
                      <td>R2 platform</td>
                      <td>Tumor types</td>
                      <td>22</td>
                    </tr>
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
          <Col md="12">
            <Card className="card-plain table-plain-bg">
              <Card.Header>
                <Card.Title as="h4"> Apply for a DAC membership </Card.Title>
                <p className="card-category">
                  Here you can apply for becoming a member of a particular DAC.
                </p>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover">
                  <thead>
                    <tr>
                      <th className="border-0">ID</th>
                      <th className="border-0">Name</th>
                      <th className="border-0">Study</th>
                      <th className="border-0">Current members</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>CHOP</td>
                      <td>Children Hospital of Philadelphia</td>
                      <td>Open Paediatric Brain Tumor Atlas</td>
                      <td> John Smith, Jane Ford</td>
                      <td className="text-center">
                        <Button variant="danger" className="btn-fill disabled">Apply</Button>
                      </td>
                    </tr>
                    <tr>
                      <td>R2</td>
                      <td>R2 platform</td>
                      <td>Tumor Types studies</td>
                      <td>Samuel Grey, Aurora Beckett, Laura Heart</td>
                      <td className="text-center">
                        <Button variant="danger" className="btn-fill disabled">Apply</Button>
                      </td>
                    </tr>
                    <tr>
                      <td>IGTP</td>
                      <td>Institut Germans Trias i Pujol</td>
                      <td>Hepatoblastoma study</td>
                      <td>Lorena Díaz, Fernando Esper</td>
                      <td className="text-center">
                        <Button variant="success" className="btn-fill disabled">Apply</Button>
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

export default MyDACs;
