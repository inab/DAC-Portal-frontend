import React from 'react';
import { Card, Container, Row, Col } from "react-bootstrap";
import useItems from '../../../Infrastructure/Adapters/Store/Effects/setRequestsItems';
import Table from '../Components/Table/TableContainer';

const PAGE_LABELS = {
  title: "Manage requests",
  subtitle: "Here you can grant/deny incoming Data Access Requests",
  empty: "No requests have been made to your DAC"
};

const TABLE_LABELS = {
  user: "User",
  fileId: "File ID",
  resource: "Resource",
  comment: "Comments",
  access: "Access"
}

const RequestsStatus = () => {
  const [items, { acceptRequest, deleteRequest }] = useItems();

  return (
    <>
      <Container fluid>
        {items.length >= 1 ? (
          <Row>
            <Col md="12">
              <h2> {PAGE_LABELS.title} </h2>
              <h4> {PAGE_LABELS.subtitle} </h4>
              <Card className="strpied-tabled-with-hover">
                <Card.Body className="table-full-width table-responsive px-0">
                  <Table
                    allRows={items}
                    labels={TABLE_LABELS}
                    exclude={["_id", "status"]}
                    putItem={acceptRequest}
                    deleteItem={deleteRequest} />
                </Card.Body>
              </Card>
            </Col>
          </Row>) : <p> {PAGE_LABELS.empty} </p>}
      </Container>
    </>
  )
}

export default RequestsStatus;
