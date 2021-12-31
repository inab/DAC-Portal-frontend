import React, { useEffect, useState } from 'react';
import { itemsSelection, permissionsRequests } from '../utils/utils';
import axios from 'axios';
import {
  Card,
  Container,
  Row,
  Col,
  Table,
  Button
} from "react-bootstrap";

const { REACT_APP_DAC_PORTAL_API_URL, REACT_APP_PERMISSIONS_URL } = process.env
 
const RequestsStatus = () => {

  const [request, setRequest] = useState({ type: 'get',
                                           url: `${REACT_APP_DAC_PORTAL_API_URL}/dac/requests`, 
                                           token: localStorage.getItem("react-token"),
                                           params: {
                                               'format' : null,
                                               'account-id': null
                                           } });
                
  const [response, setResponse] = useState([]);

  const [mainTitles, setMainTitles] = useState({ title: "Manage permissions", 
                                                 subtitle: "Here you can revoke permissions which are related with your DACs"})
  const [cardTitles, setCardTitles] = useState(["User", "Type", "Timestamp", "FileId", "DAC", "BY", "Revoke"])
  
  useEffect(() => {
    (async () => {
      try {
        let getUsersRequests = await axios({
          method: request.type,
          url: request.url, headers: {
            Authorization: "Bearer " + request.token
          },
          params: request.params
        })

        if(request.type === "get") {
          const requests = [].concat(...getUsersRequests.data.map(item => item.requests)); 
          const uniqueItems = itemsSelection(requests);
          const response = await permissionsRequests(uniqueItems[0], uniqueItems[1]);
          setResponse(response)
        } else {
          const removeItem = response.filter(el => !el.ga4gh_visa_v1.value.includes(request.params['values']));
          setResponse(removeItem)
        }
      } catch (err) {
        console.log("error ", err.message) 
      }
    })();
  }, [request]);

  const handlePermissions = async (e, d) => {
    e.preventDefault();
    setRequest({  type: 'delete', 
                  url: `${REACT_APP_PERMISSIONS_URL}/permissions`, 
                  token: localStorage.getItem("react-token"),
                  params: {
                    'values' : `${d.ga4gh_visa_v1.value}`,
                    'account-id': `${d.sub}` } });
    }
 
  const ShowResponse = () => {
    return response.map((d, idx) => {
        return ( 
            <tr>
                <td> {d.sub} </td>
                <td> {d.ga4gh_visa_v1.type} </td>
                <td> {d.ga4gh_visa_v1.asserted} </td>
                <td> {d.ga4gh_visa_v1.value} </td>
                <td> {d.ga4gh_visa_v1.source} </td>
                <td> {d.ga4gh_visa_v1.by} </td>
                <td className="text-center">
                    <Button variant="success" className="btn-block btn-fill" onClick={(e) => handlePermissions(e, d)}>Revoke</Button>
                </td>       
            </tr>
        )
    })}

  return (
    <Container fluid>
      <h2> {mainTitles.title} </h2>
      <h4> {mainTitles.subtitle} </h4>
      {response.length >= 1 ? (
      <Row>
        <Col md="12">
            <Card className="strpied-tabled-with-hover">
                <Card.Body className="table-full-width table-responsive px-0">
                    <Table className="table-hover table-striped">
                        <thead>
                            <tr>
                                <th className="border-0">{cardTitles[0]}</th>
                                <th className="border-0">{cardTitles[1]}</th>
                                <th className="border-0">{cardTitles[2]}</th>
                                <th className="border-0">{cardTitles[3]}</th>
                                <th className="border-0">{cardTitles[4]}</th>
                                <th className="border-0">{cardTitles[5]}</th>
                                <th className="border-0">{cardTitles[6]}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <ShowResponse/>
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>          
        </Col>
      </Row> ) : <p> No permissions have been assigned on datasets controlled by your DAC </p> }
    </Container>
  )
}

export default RequestsStatus;
