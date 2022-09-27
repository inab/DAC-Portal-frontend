import { useEffect, useState } from 'react';
import { getPendingUserRequests, acceptUserRequest, denyUserRequest } from '../../../../Application/UseCases/ManageRequests';
import { useRequest } from '../Dispatchers/ManageRequests';
import { DataRequest } from '../../../../Domain/Entities/Entities';

export default () => {
  const [request, handlers] = useRequest();
  const [items, setItems] = useState<Array<DataRequest>>([]);

  useEffect(() => {
    (async () => {
      try {
        request.type === "get" 
          ? setItems(await getPendingUserRequests(request)) 
          : request.type === "put" && !request["object-id"] 
            ? setItems(await acceptUserRequest(request, items)) 
            : setItems(await denyUserRequest(request, items))                          
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