import { useEffect, useState } from 'react';
import { getPolicies, updatePolicies } from '../../Services/ManagePolicies';
import { useRequest, useInput } from '../Reducers/ManagePoliciesReducer';

export default () => {
    const [request, requestHandlers] = useRequest();
    const [input, inputHandlers] = useInput();
    const [items, setItems] = useState([]);

    useEffect(() => {
      (async () => {
        let { index, value } = input;
        if(index) {
          let updatedItems = [...items];
          updatedItems[index]['policy'] = value;
          setItems(updatedItems);
        }
      })();
    }, [input]);

    useEffect(() => {
      (async () => {
        try {
          request.type === "get" ? setItems(await getPolicies(request)) :
                                   setItems(await updatePolicies(request))
        } catch (err) {
          console.log("error ", err.message)
          alert("An error ocurred: Policies could not be loaded/updated")
        }
      })();
    }, [request]);

    return [items, {...requestHandlers, ...inputHandlers}]
}