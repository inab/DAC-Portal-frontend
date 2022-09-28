import React, { useState } from 'react';
import { Button, Card, Form, Row, Col } from "react-bootstrap";
import { IForm } from './types/Form';
import { DACInfo } from '../../../../Domain/Entities/Entities';

const PageForm: React.FC<IForm> = ({ data, update, change }) => {

    const [formIdx, setFormIdx] = useState<number | null>(null);

    const selectDAC = (e: any) => {
      e.preventDefault();
      setFormIdx(e.target.value)
    }
  
    const submitHandler = (e: any, idx: number) => {
      e.preventDefault();
      update(data[idx]); 
    }

    return (
        <>
            <Row>
                <Col md="12">
                    <h4> Please select a DAC from the list: </h4>
                    <Form.Group>
                        <Form.Control as="select" onChange={selectDAC}>
                            <option> Available DACs </option>
                            {data.map((d: DACInfo, idx: number) => {
                                return <option key={idx} value={idx}> {d.dacId} </option>
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
                                                    placeholder={data[formIdx].dacId}
                                                    type="text"
                                                    disabled
                                                ></Form.Control>
                                            </Form.Group>
                                        </Col>
                                        <Col className="px-1" md="8">
                                            <Form.Group>
                                                <label> DAC Name </label>
                                                <Form.Control
                                                    placeholder={data[formIdx] ? data[formIdx].dacName
                                                        : "Select a name for your DAC"}
                                                    type="text"
                                                    name="dacName"
                                                    onChange={(e: any) => change(e, formIdx)}
                                                ></Form.Control>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="px-1" md="8">
                                            <label> DAC study </label>
                                            <Form.Control
                                                placeholder={data[formIdx] ? data[formIdx].dacStudy
                                                    : "Add your study name here"}
                                                type="text"
                                                name="dacStudy"
                                                onChange={(e: any) => change(e, formIdx)}
                                            ></Form.Control>
                                        </Col>
                                        <Col className="px-1" md="4">
                                            <label> Datasets description </label>
                                            <Form.Control
                                                placeholder={data[formIdx] ? data[formIdx].datasets
                                                    : "Add your description here"}
                                                type="text"
                                                name="datasets"
                                                onChange={(e: any) => change(e, formIdx)}
                                            ></Form.Control>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="px-1" md="4">
                                            <label> First Name </label>
                                            <Form.Control
                                                placeholder={data[formIdx] ? data[formIdx].adminName
                                                    : "Add your first name here"}
                                                type="text"
                                                name="adminName"
                                                onChange={(e: any) => change(e, formIdx)}
                                            ></Form.Control>
                                        </Col>
                                        <Col className="px-1" md="4">
                                            <label> Last Name </label>
                                            <Form.Control
                                                placeholder={data[formIdx] ? data[formIdx].adminSurname
                                                    : "Add your surname here"}
                                                type="text"
                                                name="adminSurname"
                                                onChange={(e: any) => change(e, formIdx)}
                                            ></Form.Control>
                                        </Col>
                                        <Col className="pl-1" md="4">
                                            <Form.Group>
                                                <label htmlFor="exampleInputEmail1">
                                                    Email address
                                                </label>
                                                <Form.Control
                                                    placeholder={data[formIdx] ? data[formIdx].emailAddress
                                                        : "Add your contact email here"}
                                                    type="email"
                                                    name="emailAddress"
                                                    onChange={(e: any) => change(e, formIdx)}
                                                ></Form.Control>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="pr-1" md="12">
                                            <Form.Group>
                                                <label>Study description</label>
                                                <Form.Control 
                                                    placeholder={data[formIdx] ? data[formIdx].studyDescription
                                                        : "Add the description of the study here"}
                                                    type="text"
                                                    name="studyDescription"
                                                    onChange={(e: any) => change(e, formIdx)}
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
        </>
    )
}

export default PageForm;

