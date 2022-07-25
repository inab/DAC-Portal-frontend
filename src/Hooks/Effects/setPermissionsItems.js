import { useEffect, useState } from 'react';
import { getUsersPermissions, deleteUserPermissions } from '../../Services/ManagePermissions';

export default (request) => {
    const [items, setItems] = useState([]);
    
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

    return items
}