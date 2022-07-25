import React from 'react';
import { Card, Container, Row, Col, Table } from "react-bootstrap";
import useItems from '../Hooks/Effects/setRevisionItems';

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

  const TableRowData = (props) => {
    let { row: { _id, ...rest} } = props;
    return Object.values(rest).map((value) => <td> {value} </td>)
  }

  return (
    <Container fluid>
        {items.length >= 1 ? (
          <Row>
            <Col md="12">
              <h2> {PAGE_LABELS.title} </h2>
              <h4> {PAGE_LABELS.subtitle} </h4>
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
                        return (
                          <tr>
                            <TableRowData row={object} />
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

export default RequestsStatus;
