import { useEffect, useState } from 'react';
import { getUserRequests } from '../../Services/ManageRequestsRevision';
import { useRequest } from '../Reducers/RequestsRevisionReducer';
import { UserRequest } from '../../Models/RequestsRevision';

export default () => {
    const [request, dispatch] = useRequest();
    const [items, setItems] = useState<Array<UserRequest>>([]);

    useEffect(() => { dispatch({ type: "get" }) }, [])

    useEffect(() => {
        (async () => {
          try {
            setItems(await getUserRequests(request))
          }
          catch (err) {
            if (err instanceof Error) {
              console.log(`Error: ${err.message}`)
              alert("An error ocurred: Users permissions assigned by your DACs could not be loaded")
            }
          }
        })();
      }, [request]);

    return [items]
}