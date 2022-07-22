import axios from 'axios';
import { getRequests } from './ManageTransforms';

const getUserRequests = async (request) => {
    const { data } = await axios({
        method: request.type,
        url: request.url,
        headers: {
            Authorization: "Bearer " + request.token
        }
    })

    return getRequests(data)

}

export { getUserRequests }