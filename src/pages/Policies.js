import useItems from '../Hooks/Effects/setPoliciesItems';
import {
  Button,
  Card,
  Table,
  Container,
  Row,
  Col,
} from "react-bootstrap";

const PAGE_LABELS = {
  title: "Manage policies",
  subtitle: "Here you can add new policies for the different resources of your DACs.",
  empty: "There are no resources available in your DACs."
};

const TABLE_LABELS = {
  dacId: "DAC ID",
  fileId: "File ID",
  policy: "Policy"
}

function Policies() {
  const [items, { putItem, changeItem }] = useItems();

  return (
    <>
      <Container fluid>
        {items.length >= 1 ? (
          <Row>
            <Col md="12">
              <h4> {PAGE_LABELS.title} </h4>
              <p> {PAGE_LABELS.subtitle} </p>
              <br />
              <Card>
                <Card.Body className="table-full-width table-responsive px-0">
                  <Table className="table-hover">
                    <thead>
                      <tr>
                        <th className="border-0"> {TABLE_LABELS.dacId} </th>
                        <th className="border-0"> {TABLE_LABELS.fileId} </th>
                        <th className="border-0"> {TABLE_LABELS.policy} </th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((d, idx) => (
                        <tr>
                          <td> {d.dacId} </td>
                          <td> {d.fileId} </td>
                          <td className="text-center">
                            <input data-id={idx} type="text" value={d.policy} onChange={(evt) => changeItem(evt)} />
                          </td>
                          <td className="text-center">
                            <Button variant="success" className="btn-block btn-fill" onClick={() => putItem(d)}>Update</Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </Col>
          </Row>) : <p> {PAGE_LABELS.empty} </p>}
      </Container>
    </>
  );
}

export default Policies;
