import { useEffect, useState } from 'react';
import { getUsersPermissions, deleteUserPermissions } from '../../../../Application/UseCases/ManagePermissions';
import { useRequest } from '../Dispatchers/ManagePermissions';
import { Assertion } from '../../../../Domain/Entities/Entities';

export default () => {
  const [request, handlers] = useRequest();
  const [items, setItems] = useState<Array<Assertion>>([]);

  useEffect(() => {
    (async () => {
      try {
        request.type === "get" ? setItems(await getUsersPermissions(request)) :
                                 setItems(await deleteUserPermissions(request, items))
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