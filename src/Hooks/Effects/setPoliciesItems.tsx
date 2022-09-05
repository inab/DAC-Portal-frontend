import { useEffect, useState } from 'react';
import { getPolicies, updatePolicies } from '../../Services/ManagePolicies';
import { useRequest, useInput } from '../Reducers/ManagePoliciesReducer';
import { Policy } from '../../Models/ManagePolicies';

export default () => {
    const [request, requestHandlers] = useRequest();
    const [input, inputHandlers] = useInput();
    const [items, setItems] = useState<Array<Policy>>([]);

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
          if (err instanceof Error) {
            console.log(`Error: ${err.message}`)
            alert("An error ocurred: Users permissions assigned by your DACs could not be loaded")
          }
        }
      })();
    }, [request]);

    return [items, {...requestHandlers, ...inputHandlers}]
}