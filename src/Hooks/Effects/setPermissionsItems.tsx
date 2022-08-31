import { useEffect, useState } from 'react';
import { getUsersPermissions, deleteUserPermissions } from '../../Services/ManagePermissions';
import { useRequest } from '../Reducers/ManagePermissionsReducer';

export default () => {
    const [request, handlers] = useRequest();
    const [items, setItems] = useState([]);

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