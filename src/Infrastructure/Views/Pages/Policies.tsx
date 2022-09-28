import React from 'react';
import useItems from '../../../Infrastructure/Adapters/Store/Effects/setPoliciesItems';
import { Card, Container, Row, Col } from "react-bootstrap";
import Table from '../Components/Table/TableContainer';

const PAGE_LABELS = {
  title: "Manage policies",
  subtitle: "Here you can add new policies for the different resources of your DACs.",
  empty: "There are no resources available in your DACs."
};

const TABLE_LABELS = {
  dacId: "DAC ID",
  fileId: "File ID",
  policy: "Policy"
}

const Policies = () => {
  const [items, { savePolicy, changePolicy }] = useItems();

  return (
    <>
      <Container fluid>
        {items.length >= 1 ? (
          <Row>
            <Col md="12">
              <h4> {PAGE_LABELS.title} </h4>
              <p> {PAGE_LABELS.subtitle} </p>
              <br />
              <Card>
                <Card.Body className="table-full-width table-responsive px-0">
                <Table
                    allRows={items}
                    labels={TABLE_LABELS}
                    exclude={["_id", "acl"]}
                    changeItem={changePolicy}
                    saveItem={savePolicy} />
                </Card.Body>
              </Card>
            </Col>
          </Row>) : <p> {PAGE_LABELS.empty} </p>}
      </Container>
    </>
  );
}

export default Policies;
