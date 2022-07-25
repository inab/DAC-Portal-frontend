import { useEffect, useState } from 'react';
import { getUserRequests } from '../../Services/ManageRequestsRevision';
import useRequest from '../Reducers/ManageRequestsRevision';

export default () => {
    const [request] = useRequest();
    const [items, setItems] = useState([]);

    useEffect(() => {
        (async () => {
          try {
            setItems(await getUserRequests(request))
          }
          catch (err) {
            console.log("error ", err.message)
            alert("An error ocurred: Users requests could not be loaded")
          }
        })();
      }, [request]);

    return [items]
}