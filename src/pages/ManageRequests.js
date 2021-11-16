import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Card,
  Container,
  Row,
  Col,
  Table,
  Button
} from "react-bootstrap";

const { REACT_APP_HOST } = process.env

const RequestsStatus = () => {

  const [request, setRequest] = useState({ type: 'get',
                                           url: `http://${REACT_APP_HOST}:9090/dac/read`, 
                                           token: localStorage.getItem("react-token"),
                                           params: {
                                            'format' : null,
                                            'account-id': null
                                           },
                                           data: null });
                
  const [response, setResponse] = useState([]);

  const [mainTitles, setMainTitles] = useState({ title: "Manage requests", 
                                                 subtitle: "Here you can grant/deny incoming Data Access Requests"})
  const [cardTitles, setCardTitles] = useState(["User", "File ID", "Comments", "Status"])

  useEffect(() => {
    const apiRequest = async () => {
      const query = await axios({ 
        method: request.type, 
        url: request.url, 
        headers: {
          Authorization: "Bearer " + request.token
        },
        params: request.params,
        data: request.data
      }).then(res => {
          if(request.type === "get") {
            res = res.data[0]["requests"]

            let destructured = []

            res.map(userReq => {
                let { user, requests } = userReq;
                requests.map(requestItems => {
                    let { fileId, comment, status } = requestItems
                    destructured.push({
                        user, fileId, comment, status
                    })
                })
            })
            return destructured
          } else {
            alert("Granted! You won't see any change on the DAC-Portal UI (Not implemented yet). Hovewer, the POST request to the Permissions-API has been succesful! Please, login as dac-admin in order to see the changes (Manage permissions section)")
            return response
          }
      }).catch(error => {
      });
      setResponse(query);
    };
    apiRequest();
  }, [request]);

  const handlePermissions = async (e, d) => {
    e.preventDefault();

    let assertions = [{
        type : "ControlledAccessGrants",
        asserted: 1564814387,
        value: `${d.fileId}`,
        source: "https://test-url/source_dac",
        by: "dac"
    }]   

    setRequest({ type: 'post', 
                 url: `http://${REACT_APP_HOST}:8081/permissions`, 
                 token: localStorage.getItem("react-token"),
                 data: assertions,
                 params: {
                     'format' : "PLAIN",
                     'account-id' : `${d.user}`
                 }
    })
  }

  const ShowResponse = () => {
    return response.map((d, idx) => {
        return ( 
          <tr>
            <td> {d.user} </td>
            <td> {d.fileId} </td>
            <td> {d.comment} </td>
            {d.status === "Pending" ?
              <td className="text-center">
                <Button variant="success" className="btn-block btn-fill" onClick={(e) => handlePermissions(e, d)}>Grant</Button>
                <Button variant="danger" className="btn-block btn-fill disabled" onClick={(e) => e.preventDefault()}>Deny</Button>
              </td>
            : <td className="text-center"> {d.status}</td>}
          </tr>
        )
    })
  }

  return (
    <>
    <Container fluid>
      {response.length >= 1 ? (
        <Row>
            <Col md="12">
                <h4> {mainTitles.title} </h4>
                <p> {mainTitles.subtitle} </p>
                <Card className="strpied-tabled-with-hover">
                    <Card.Body className="table-full-width table-responsive px-0">
                        <Table className="table-hover table-striped">
                            <thead>
                                <tr>
                                    <th className="border-0">{cardTitles[0]}</th>
                                    <th className="border-0">{cardTitles[1]}</th>
                                    <th className="border-0">{cardTitles[2]}</th>
                                    <th className="border-0">{cardTitles[3]}</th>
                                </tr>
                            </thead>
                            <tbody>
                              <ShowResponse/>
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
            </Col>
      </Row> ) : <p> No requests have been made to your DAC </p> }
    </Container>
  </>
  )
}

export default RequestsStatus;