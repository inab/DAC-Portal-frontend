import { useEffect, useState } from 'react';
import { getPolicies, updatePolicies } from '../../Services/ManagePolicies';
import useRequest from '../Reducers/ManagePoliciesReducer';

export default () => {
    const [request, handlers] = useRequest();
    const [items, setItems] = useState([]);
    
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

    return [items, handlers]
}