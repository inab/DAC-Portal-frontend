import axios from 'axios';
import { getUniqueRequests, usersPermissions } from '../utils/utils';

const getUsersRequests = async (request) => {
    return await axios({
        method: request.type,
        url: request.url,
        headers: {
            Authorization: "Bearer " + request.token
        },
        params: request.params
    })
}

const getUsersPermissions = async (request) => {
    const userRequests = await getUsersRequests(request)
    const uniqueRequests = getUniqueRequests([].concat(...userRequests.data.map(item => item.requests)));
    return await usersPermissions(uniqueRequests[0], uniqueRequests[1]);
}

const deleteUserPermissions = async (request, items) => {
    await axios({
        method: request.type,
        url: request.url,
        headers: {
            Authorization: "Bearer " + request.token
        },
        params: request.params
    })
    return items.filter((el, idx) => idx !== request.index);
}

export { getUsersPermissions, deleteUserPermissions }