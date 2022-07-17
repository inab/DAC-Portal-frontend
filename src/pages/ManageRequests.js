import React, { useEffect, useState } from 'react';
import { Card, Container, Row, Col, Table, Button } from "react-bootstrap";
import { getPendingUserRequests, updateUsersRequests } from '../Services/ManageRequests';
import useRequest from '../hooks/ManageRequestsReducer';

const PAGE_LABELS = {
  title: "Manage requests",
  subtitle: "Here you can grant/deny incoming Data Access Requests",
  empty: "No requests have been made to your DAC"
};

const TABLE_LABELS = {
  user: "User",
  fileId: "File ID",
  resource: "Resource",
  comments: "Comments",
  access: "Access"
}

const RequestsStatus = () => {
  const [request, dispatch] = useRequest();
  const [items, setItems] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        request.type === "get" ? setItems(await getPendingUserRequests(request)) :
                                 setItems(await updateUsersRequests(request, items))
      } catch (err) {
        console.log("error ", err.message)
        alert("An error ocurred: Users requests assigned to your DACs could not be loaded")
      }
    })();
  }, [request]);

  const acceptRequest = async (e, object, index) => {
    dispatch({ type: "put", payload: { object: object, index: index } })
  }

  const TableRowData = (props) => {
    let { row: { _id, status, ...rest} } = props;
    return Object.values(rest).map((value) => <td> {value} </td>)
  }

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
                            <td className="text-center">
                              <Button variant="success" className="btn-block btn-fill" onClick={(e) => acceptRequest(e, object, index)}>Grant</Button>
                              <Button variant="danger" className="btn-block btn-fill disabled" onClick={(e) => e.preventDefault()}>Deny</Button>
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
    </>
  )
}

export default RequestsStatus;
