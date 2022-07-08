import React, { useEffect, useState } from 'react';
import { Card, Container, Row, Col, Table, Button } from "react-bootstrap";
import { getUsersPermissions, deleteUserPermissions } from '../Services/ManagePermissions';

const { REACT_APP_DAC_PORTAL_API_URL, REACT_APP_PERMISSIONS_URL } = process.env

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

  const [request, setRequest] = useState({
    type: 'get',
    url: `${REACT_APP_DAC_PORTAL_API_URL}/dac/requests`,
    token: localStorage.getItem("react-token"),
    params: {
      'format': null,
      'account-id': null
    }
  });

  const [items, setItems] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        request.type === "get" ? setItems(await getUsersPermissions(request)) :
                                 setItems(await deleteUserPermissions(request, items))
      } catch (err) {
        console.log("error ", err.message)
        alert("An error ocurred: Users permissions assigned by your DACs could not be loaded")
      }
    })();
  }, [request]);

  const handlePermissions = async (e, object, idx) => {
    e.preventDefault();
    setRequest({
      type: 'delete',
      url: `${REACT_APP_PERMISSIONS_URL}/permissions`,
      token: localStorage.getItem("react-token"),
      params: {
        'values': `${object.ga4gh_visa_v1.value}`,
        'account-id': `${object.sub}`
      },
      index: idx
    });
  }

  const TableRowData = (props) => {
    const { row } = props;
    return Object.values(row).map((value) => <td> {value} </td> )
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
                    {items.map((object, idx) => {
                      const { sub, ga4gh_visa_v1 } = object;
                      return (
                        <tr> 
                          <TableRowData row={Object.assign({}, { 'sub': sub }, { ...ga4gh_visa_v1 })} />   
                          <td className="text-center">
                            <Button variant="success" className="btn-block btn-fill" 
                                    onClick={(e) => handlePermissions(e, object, idx)}> Revoke 
                            </Button>
                          </td>   
                        </tr>
                    )})}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row> ) : <p> {PAGE_LABELS.empty} </p> }
    </Container>
  )
}

export default ManagePermissions;
