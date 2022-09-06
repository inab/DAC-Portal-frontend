import React, { useState } from 'react';
import { Container, Row, Col, Form, Card, Button } from "react-bootstrap";
import { DACInfo } from '../Models/CreateDACReducer';
import useItems from '../Hooks/Effects/setDACFormItems';

function CreateDAC() {
  const [items, { updateDAC, changeInput }] = useItems();
  const [formIdx, setFormIdx] = useState<number | null>(null);

  const selectDAC = (e: any) => {
    e.preventDefault();
    setFormIdx(e.target.value)
  }

  const submitHandler = (e: any, idx: number) => {
    e.preventDefault();
    updateDAC(items[idx]); 
  }

  return (
    <Container fluid>
      {items.length >= 1 ? (
        <Row>
          <Col md="12">
            <h4> Please select a DAC from the list: </h4>
            <Form.Group>
              <Form.Control as="select" onChange={selectDAC}>
                <option> Available DACs </option>
                {items.map((d: DACInfo, idx: number) => {
                  return <option value={idx}> {d.dacId} </option>
                })}
              </Form.Control>
            </Form.Group>
          </Col>
          <Col md="12">
            {formIdx !== null ? (
              <Card>
                <Card.Body>
                  <form onSubmit={(e) => submitHandler(e, formIdx)}>
                    <Row>
                      <Col className="pr-1" md="4">
                        <Form.Group>
                          <label> DAC ID</label>
                          <Form.Control
                            placeholder={items[formIdx].dacId}
                            type="text"
                            disabled
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                      <Col className="px-1" md="8">
                        <Form.Group>
                          <label> DAC Name </label>
                          <Form.Control
                            placeholder={items[formIdx] ? items[formIdx].dacName
                              : "Select a name for your DAC"}
                            type="text"
                            name="dacName"
                            onChange={(e) => changeInput(e, formIdx)}
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="px-1" md="8">
                        <label> DAC study </label>
                        <Form.Control
                          placeholder={items[formIdx] ? items[formIdx].dacStudy
                            : "Add your study name here"}
                          type="text"
                          name="dacStudy"
                          onChange={(e) => changeInput(e, formIdx)}
                        ></Form.Control>
                      </Col>
                      <Col className="px-1" md="4">
                        <label> Datasets description </label>
                        <Form.Control
                          placeholder={items[formIdx] ? items[formIdx].datasets
                            : "Add your description here"}
                          type="text"
                          name="datasets"
                          onChange={(e) => changeInput(e, formIdx)}
                        ></Form.Control>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="px-1" md="4">
                        <label> First Name </label>
                        <Form.Control
                          placeholder={items[formIdx] ? items[formIdx].adminName
                            : "Add your first name here"}
                          type="text"
                          name="adminName"
                          onChange={(e) => changeInput(e, formIdx)}
                        ></Form.Control>
                      </Col>
                      <Col className="px-1" md="4">
                        <label> Last Name </label>
                        <Form.Control
                          placeholder={items[formIdx] ? items[formIdx].adminSurname
                            : "Add your surname here"}
                          type="text"
                          name="adminSurname"
                          onChange={(e) => changeInput(e, formIdx)}
                        ></Form.Control>
                      </Col>
                      <Col className="pl-1" md="4">
                        <Form.Group>
                          <label htmlFor="exampleInputEmail1">
                            Email address
                          </label>
                          <Form.Control
                            placeholder={items[formIdx] ? items[formIdx].emailAddress
                              : "Add your contact email here"}
                            type="email"
                            name="emailAddress"
                            onChange={(e) => changeInput(e, formIdx)}
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
                            placeholder={items[formIdx] ? items[formIdx].studyDescription
                              : "Add the description of the study here"}
                            type="text"
                            name="studyDescription"
                            onChange={(e) => changeInput(e, formIdx)}
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
