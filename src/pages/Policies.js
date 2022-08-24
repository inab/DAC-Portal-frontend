import useItems from '../Hooks/Effects/setPoliciesItems';
import {
  Button,
  Card,
  Table,
  Container,
  Row,
  Col,
} from "react-bootstrap"; 

function Policies() {
  const [items, { putItem, changeItem }] = useItems();     

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <h4> Create policies </h4>
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
                    {items.map((d, idx) => (
                      <tr>
                        <td> {d.dacId} </td>
                        <td> {d.fileId} </td>
                        <td className="text-center">
                          <input data-id={idx} type="text" value={d.policy} onChange={(evt) => changeItem(evt)}/>
                        </td>
                        <td className="text-center">
                          <Button variant="success" className="btn-block btn-fill" onClick={()=> putItem(d)}>Update</Button>
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
