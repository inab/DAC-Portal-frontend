import React, { useEffect, useState } from 'react';
import { getUserRequests } from '../Services/ManageRequestsRevision';
import useRequest from '../hooks/ManageRequestsRevision';
import {
  Card,
  Container,
  Col,
  Row,
  Table
} from "react-bootstrap";

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

const TableRowData = (props) => {
  let { row: { _id, ...rest} } = props;
  return Object.values(rest).map((value) => <td> {value} </td>)
}

const RequestsStatus = () => {

  const [request, dispatch] = useRequest();
  const [items, setItems] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        setItems(await getUserRequests(request))
      }
      catch (err) {
        console.log("error ", err.message)
        alert("An error ocurred: Users requests could not be loaded")
      }
    })();
  }, [request]);

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
