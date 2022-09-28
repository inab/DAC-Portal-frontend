import React from 'react';
import { Card, Container, Row, Col } from "react-bootstrap";
import useItems from '../../../Infrastructure/Adapters/Store/Effects/setRevisionItems';
import Table from '../Components/Table/TableContainer';

const PAGE_LABELS = {
  title: "My requests status",
  subtitle: "Here you can inspect the status of your Data Access Requests",
  empty: "No requests have been made"
};

const TABLE_LABELS = {
  fileId: "File ID",
  resource: "Resource",
  comment: "Comment",
  status: "Status"
} 

const RequestsStatus = () => {
  const [items] = useItems();
  return (
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
                  exclude={["_id"]} />
              </Card.Body>
            </Card>
          </Col>
        </Row>) : <p> {PAGE_LABELS.empty} </p>}
    </Container>
  )
}

export default RequestsStatus;
