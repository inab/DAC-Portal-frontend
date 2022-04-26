import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Button,
  Card,
  Form,
  Container,
  Row,
  Col
} from "react-bootstrap";

function CreateDAC() {

  const { REACT_APP_DAC_PORTAL_API_URL } = process.env

  const [request, setRequest] = useState({
    type: 'get',
    url: `${REACT_APP_DAC_PORTAL_API_URL}/dac/data`,
    token: localStorage.getItem("react-token"),
    params: { 'dacId' : null,
              'dacName': null,
              'dacStudy': null,
              'datasets': null,
              'adminName': null,
              'adminSurname': null,
              'emailAddress': null,
              'studyDescription': null }
  });

  const [response, setResponse] = useState([]);

  const [formIdx, setFormIdx] = useState(null)

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
        let destructured = [];
        res = res.data;
        res.map(dacData => {
          let { dacId, info } = dacData;
          destructured.push({
            dacId, info
          })
        })
        return destructured
      }).catch(error => {
      });
      setResponse(query);
    };
    apiRequest();
  }, [request]);

  const submitHandler = (e) => {
    e.preventDefault();

    setRequest({
      type: 'put',
      url: `${REACT_APP_DAC_PORTAL_API_URL}/dac/info`,
      token: localStorage.getItem("react-token"),
      params: { 'dacId' : `${response[formIdx].dacId}`,
                'dacName': `${response[formIdx].info.dacName}`,
                'dacStudy': `${response[formIdx].info.dacStudy}`,
                'datasets': `${response[formIdx].info.datasets}`,
                'adminName': `${response[formIdx].info.adminName}`,
                'adminSurname': `${response[formIdx].info.adminSurname}`,
                'emailAddress': `${response[formIdx].info.emailAddress}`,
                'studyDescription': `${response[formIdx].info.studyDescription}` }
    });
  }
  const changeInput = (e) => {
    e.preventDefault();
    let dacData = [...response];
    let updatedInfo = { ...dacData[formIdx].info, [e.target.getAttribute('name')]: e.target.value }
    dacData[formIdx].info = updatedInfo;
    setResponse(dacData)
  }

  const selectDAC = (e) => {
    e.preventDefault();
    setFormIdx(e.target.value)
  }

  return (
    <Container fluid>
      {response.length >= 1 ? (
        <Row>
          <Col md="12">
            <h4> Please select a DAC from the list: </h4>
            <Form.Group>
              <Form.Control as="select" onChange={selectDAC}>
                <option> Available DACs </option>
                {response.map((d, idx) => {
                  return <option value={idx}> {d.dacId} </option>
                })}
              </Form.Control>
            </Form.Group>
          </Col>
          <Col md="12">
            {formIdx !== null ? (
              <Card>
                <Card.Body>
                  <form onSubmit={submitHandler}>
                    <Row>
                      <Col className="pr-1" md="4">
                        <Form.Group>
                          <label> DAC ID</label>
                          <Form.Control
                            placeholder={response[formIdx].dacId}
                            type="text"
                            disabled
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                      <Col className="px-1" md="8">
                        <Form.Group>
                          <label> DAC Name </label>
                          <Form.Control
                            placeholder={response[formIdx].info ? response[formIdx].info.dacName
                              : "Select a name for your DAC"}
                            type="text"
                            name="dacName"
                            onChange={changeInput}
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="px-1" md="8">
                        <label> DAC study </label>
                        <Form.Control
                          placeholder={response[formIdx].info ? response[formIdx].info.dacStudy
                            : "Add your study name here"}
                          type="text"
                          name="dacStudy"
                          onChange={changeInput}
                        ></Form.Control>
                      </Col>
                      <Col className="px-1" md="4">
                        <label> Datasets description </label>
                        <Form.Control
                          placeholder={response[formIdx].info ? response[formIdx].info.datasets
                            : "Add your description here"}
                          type="text"
                          name="datasets"
                          onChange={changeInput}
                        ></Form.Control>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="px-1" md="4">
                        <label> First Name </label>
                        <Form.Control
                          placeholder={response[formIdx].info ? response[formIdx].info.adminName
                            : "Add your first name here"}
                          type="text"
                          name="adminName"
                          onChange={changeInput}
                        ></Form.Control>
                      </Col>
                      <Col className="px-1" md="4">
                        <label> Last Name </label>
                        <Form.Control
                          placeholder={response[formIdx].info ? response[formIdx].info.adminSurname
                            : "Add your surname here"}
                          type="text"
                          name="adminSurname"
                          onChange={changeInput}
                        ></Form.Control>
                      </Col>
                      <Col className="pl-1" md="4">
                        <Form.Group>
                          <label htmlFor="exampleInputEmail1">
                            Email address
                          </label>
                          <Form.Control
                            placeholder={response[formIdx].info ? response[formIdx].info.emailAddress
                              : "Add your contact email here"}
                            type="email"
                            name="emailAddress"
                            onChange={changeInput}
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-1" md="12">
                        <Form.Group>
                          <label>Study description</label>
                          <Form.Control
                            cols="80"
                            rows="4"
                            placeholder={response[formIdx].info ? response[formIdx].info.studyDescription
                              : "Add the description of the study here"}
                            type="text"
                            name="studyDescription"
                            onChange={changeInput}
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Button
                      className="btn-fill pull-right"
                      type="submit"
                      variant="info"
                    >
                      Create DAC
                    </Button>
                    <div className="clearfix"></div>
                  </form>
                </Card.Body>
              </Card>
            ) : <p> </p>}
          </Col>
        </Row>
      ) : <p> You do not have permissions to access this page </p>}
    </Container>
  );
}

export default CreateDAC;
