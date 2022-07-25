import { useEffect, useState } from 'react';
import { getUsersPermissions, deleteUserPermissions } from '../../Services/ManagePermissions';
import useRequest from '../Reducers/ManagePermissionsReducer';

export default () => {
    const [request, handlers] = useRequest();
    const [items, setItems] = useState([]);
    console.log("request")
    console.log(request)
    useEffect(() => {
        (async () => {
          try {
            request.type === "get" ? setItems(await getUsersPermissions(request)) :
                                     setItems(await deleteUserPermissions(request, items))
          } catch (err) {
            console.log("error ", err.message)
            alert("An error ocurred: Users permissions assigned by your DACs could not be loaded")
          }
        })();
      }, [request]);

    return [items, handlers]
}