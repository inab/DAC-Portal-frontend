import { useEffect, useState } from 'react';
import { getUserRequests } from '../../../../Application/UseCases/ManageRequestsRevision';
import { useRequest } from '../Dispatchers/RequestsRevision';
import { DataRequest } from '../../../../Domain/Entities/Entities';

export default () => {
  const [request, dispatch] = useRequest();
  const [items, setItems] = useState<Array<DataRequest>>([]);

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