import axios from 'axios';
import { itemsDestructuring } from '../utils/utils';

const getUsersRequests = async (request) => {
    const response = await axios({
        method: request.type,
        url: request.url,
        headers: {
            Authorization: "Bearer " + request.token
        },
        params: request.params
    })

    return itemsDestructuring([].concat(...response.data.map(item => item.requests)))
}

const postUserPermissions = async (request, items) => {
    await axios({
        method: request.type,
        url: request.url,
        headers: {
            Authorization: "Bearer " + request.token
        },
        params: request.params,
        data: request.data
    })

    return items.filter((el, idx) => idx !== request.index);
}

export { getUsersRequests, postUserPermissions }