import React from 'react';
import { Container } from 'react-bootstrap';
import Form from '../Components/Form/Form';
import useItems from '../../../Infrastructure/Adapters/Store/Effects/setDACFormItems';

const CreateDAC = () => {
  const [items, { updateDAC, changeInput }] = useItems();

  return (
    <Container fluid>
      {items.length >= 1 
        ? <Form data={items} update={updateDAC} change={changeInput} /> 
        : <p> You don't have permissions to access this page </p> }
    </Container>
  );
}

export default CreateDAC;
