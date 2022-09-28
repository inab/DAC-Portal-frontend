import React from 'react';
import { Card, Container, Row, Col } from "react-bootstrap";
import useItems from '../../../Infrastructure/Adapters/Store/Effects/setPermissionsItems';
import Table from '../Components/Table/TableContainer';

const PAGE_LABELS = {
  title: "Manage permissions",
  subtitle: "Here you can revoke permissions which are related with your DACs",
  empty: "No permissions have been assigned on datasets controlled by your DAC"
};

const TABLE_LABELS = {
  sub: "User",
  type: "Type",
  value: "Value (resource)",
  source: "DAC",
  by: "BY",
  asserted: "Timestamp",
  revoke: "Revoke"
}

const ManagePermissions = () => {
  const [items, { deleteItem }] = useItems();

  return (
    <Container fluid>
      <h2> {PAGE_LABELS.title} </h2>
      <h4> {PAGE_LABELS.subtitle} </h4>

      {items.length >= 1 ? (
        <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Body className="table-full-width table-responsive px-0">
                <Table
                  allRows={items}
                  labels={TABLE_LABELS}
                  exclude={[""]}
                  deleteItem={deleteItem} />
              </Card.Body>
            </Card>
          </Col>
        </Row>) : <p> {PAGE_LABELS.empty} </p>}
    </Container>
  )
}

export default ManagePermissions;
