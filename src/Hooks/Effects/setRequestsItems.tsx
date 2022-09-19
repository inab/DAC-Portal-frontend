import { useEffect, useState } from 'react';
import { getPendingUserRequests, updateUsersRequests } from '../../Application/UseCases/ManageRequests';
import { useRequest } from '../Reducers/ManageRequestsReducer';
import { DataRequest } from '../../Domain/Entities/Entities';

export default () => {
  const [request, handlers] = useRequest();
  const [items, setItems] = useState<Array<DataRequest>>([]);

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