import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Card,
  Container,
  Row,
  Col,
} from "react-bootstrap";

const { REACT_APP_PERMISSIONS_URL } = process.env

const History = () => {

  const [request, setRequest] = useState({ type: 'get', 
                                           url: `${REACT_APP_PERMISSIONS_URL}/request`, 
                                           token: localStorage.getItem("react-token") });
  const [response, setResponse] = useState([]);
  const [mainTitles, setMainTitles] = useState({ title: "History", 
                                                 subtitle: "Here you can check your previous Data Access Requests"})
  const [cardTitles, setCardTitles] = useState(["File ID", "Comment"])

  useEffect(() => {
    const apiRequest = async () => {
      const query = await axios({ 
        method: request.type, 
        url: request.url, 
        headers: {
          Authorization: "Bearer " + request.token
        }
      }).then(response => {
        let history = response.data[0]["comments"]
        return history
      }).catch(error => {
      });
      setResponse(query);
    };

    apiRequest();
  }, []);
 
  const ShowResponse = () => {
    return response.map((d, idx) => {
      return (
        <Card>
          <Card.Body>
            <p> {cardTitles[0]}: {d.fileId} </p>
            <p> {cardTitles[1]}: {d.comment}</p>
          </Card.Body>
        </Card>
      );
    });
  };

  return (
    <Container fluid>
      <h2> {mainTitles.title} </h2>
      <h4> {mainTitles.subtitle} </h4>
      <Row>
        <Col md="12">
          <ShowResponse/>
        </Col>
      </Row>
    </Container>
  )
}

export default History;
