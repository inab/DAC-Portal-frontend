import axios from 'axios';
import { Monad } from './ManageTransforms';

const getUserRequests = async (request) => {
    const { data } = await axios({
        method: request.type,
        url: request.url,
        headers: {
            Authorization: "Bearer " + request.token
        }
    })

    const levelDown = (data) => data.flatMap((item) => item.requests)  

    return Monad(data).map(levelDown).flatMap(levelDown)

}

export { getUserRequests }