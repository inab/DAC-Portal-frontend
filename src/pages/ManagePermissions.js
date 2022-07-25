import React from 'react';
import { Card, Container, Row, Col, Table, Button } from "react-bootstrap";
import useItems from '../Hooks/Effects/setPermissionsItems';

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

  const TableRowData = (props) => {
    const { row } = props;
    return Object.values(row).map((value) => <td> {value} </td>)
  }

  return (
    <Container fluid>
      <h2> {PAGE_LABELS.title} </h2>
      <h4> {PAGE_LABELS.subtitle} </h4>

      {items.length >= 1 ? (
        <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      {Object.values(TABLE_LABELS).map(element => <th className="border-0"> {element} </th>)}
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((object, index) => {
                      const { sub, ga4gh_visa_v1 } = object;
                      return (
                        <tr>
                          <TableRowData row={Object.assign({}, { 'sub': sub }, { ...ga4gh_visa_v1 })} />
                          <td className="text-center">
                            <Button variant="success" className="btn-block btn-fill"
                              onClick={(e) => deleteItem(object, index)}> Revoke
                            </Button>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>) : <p> {PAGE_LABELS.empty} </p>}
    </Container>
  )
}

export default ManagePermissions;
