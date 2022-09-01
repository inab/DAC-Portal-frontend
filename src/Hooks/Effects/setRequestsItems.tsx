import { useEffect, useState } from 'react';
import { getPendingUserRequests, updateUsersRequests } from '../../Services/ManageRequests';
import { useRequest } from '../Reducers/ManageRequestsReducer';
import { UserRequest } from '../../Models/ManageRequests';

export default () => {
  const [request, handlers] = useRequest();
  const [items, setItems] = useState<Array<UserRequest>>([]);

  useEffect(() => {
    (async () => {
      try {
        request.type === "get" ? setItems(await getPendingUserRequests(request)) :
                                 setItems(await updateUsersRequests(request, items))
      } catch (err) {
        if (err instanceof Error) {
          console.log(`Error: ${err.message}`)
          alert("An error ocurred: Users permissions assigned by your DACs could not be loaded")
        }
      }
    })();
  }, [request]);

  return [items, handlers]
}