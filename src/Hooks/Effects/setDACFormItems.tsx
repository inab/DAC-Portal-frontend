import { useEffect, useState } from 'react';
import { getUserDACs, updateDACInfo } from '../../Services/CreateDAC';
import { useRequest, useInput } from '../Reducers/CreateDACReducer';

export default () => {
    const [request, requestHandlers] = useRequest();
    const [input, inputHandlers] = useInput();
    const [items, setItems] = useState<Array<any>>([]);

    useEffect(() => {
        (async () => {
            let { index, name, value } = input;
            if (index) {
                let updatedItems = [...items];
                updatedItems[index][name] = value;
                setItems(updatedItems);
            }
        })();
    }, [input]);

    useEffect(() => {
        (async () => {
            try {
                request.type === "get" ? setItems(await getUserDACs(request)) :
                                         setItems(await updateDACInfo(request))
            } catch (err) {
                if (err instanceof Error) {
                    console.log(`Error: ${err.message}`)
                    alert("An error ocurred: Users permissions assigned by your DACs could not be loaded")
                }
            }
        })();
    }, [request]);

    return [items, { ...requestHandlers, ...inputHandlers }]
}