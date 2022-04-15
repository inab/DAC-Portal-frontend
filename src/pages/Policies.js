import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Button,
  Card,
  Table,
  Container,
  Row,
  Col,
} from "react-bootstrap";

const { REACT_APP_DAC_PORTAL_API_URL } = process.env

function Policies() {
  const [request, setRequest] = useState({ type: 'get',
                                           url: `${REACT_APP_DAC_PORTAL_API_URL}/dac/data`, 
                                           token: localStorage.getItem("react-token") });
                
  const [response, setResponse] = useState([]);

  useEffect(() => {
    const apiRequest = async () => {
      const query = await axios({ 
        method: request.type, 
        url: request.url, 
        headers: {
          Authorization: "Bearer " + request.token
        },
        params: request.params,
      }).then(res => {
        res = res.data;

        let destructured = [];

        res.map(dacData => {
            let { dacId } = dacData;
            dacData.files.map(fileObj => {
                let { fileId, policy, acl } = fileObj;
                destructured.push({
                    dacId, fileId, policy, acl
                })
            })
        })
        return destructured
      }).catch(error => {
      });
      setResponse(query);
    };
    apiRequest();
  }, [request]);

  const updatePolicies = async (e, d, idx) => {
    e.preventDefault();
    setRequest({ type: 'put', 
                 url: `${REACT_APP_DAC_PORTAL_API_URL}/dac/policies`, 
                 token: localStorage.getItem("react-token"),
                 params: {
                    'dac-id' : `${d.dacId}`,
                    'ds-id' : `${d.fileId}`,
                    'acl' : `${d.acl}`,
                    'policy': `${d.policy}` } });
  }

  const changePolicy = (e) => {
    e.preventDefault();
    let updatedData = [...response];
    let idx = e.target.getAttribute('data-id');
    let value = e.target.value;
    updatedData[idx]['policy'] = value;
    setResponse(updatedData)
  }

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <h4> Create policies</h4>
            <p> Here you can add new policies for the different datasets of your DACs. </p>
            <br/>
            <Card>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover">
                  <thead>
                    <tr>
                      <th className="border-0"> DAC ID </th>
                      <th className="border-0"> Dataset </th>
                      <th className="border-0"> Policy </th>
                    </tr>
                  </thead>
                  <tbody>
                    {response.map((d, idx) => (
                      <tr>
                        <td> {d.dacId} </td>
                        <td> {d.fileId} </td>
                        <td className="text-center">
                          <input data-id={idx} type="text" value={d.policy} onChange={changePolicy}/>
                        </td>
                        <td className="text-center">
                          <Button variant="success" className="btn-block btn-fill" onClick={(e) => updatePolicies(e,d, idx)}>Update</Button>
                        </td>       
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Policies;
