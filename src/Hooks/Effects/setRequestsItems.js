import { useEffect, useState } from 'react';
import { getPendingUserRequests, updateUsersRequests } from '../../Services/ManageRequests';
import useRequest from '../Reducers/ManageRequestsReducer';

export default () => {
    const [request, handlers] = useRequest();
    const [items, setItems] = useState([]);
    
    useEffect(() => {
      (async () => {
        try {
          request.type === "get" ? setItems(await getPendingUserRequests(request)) :
                                   setItems(await updateUsersRequests(request, items))
        } catch (err) {
          console.log("error ", err.message)
          alert("An error ocurred: Users requests assigned to your DACs could not be loaded")
        }
      })();
    }, [request]);

    return [items, handlers]
}