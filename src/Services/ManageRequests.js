import axios from 'axios';
import { TransformPipelineToPending } from './ManageTransforms';

const getUserRequests = async (request) => {
    return await axios({
        method: request.type,
        url: request.url,
        headers: {
            Authorization: "Bearer " + request.token
        },
        params: request.params
    })
}   

const getPendingUserRequests = async (request) => {
    const { data } = await getUserRequests(request)
    return TransformPipelineToPending(data).getUsersAndRequests()
}

const updateUsersRequests = async (request, items) => {
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

export { getPendingUserRequests, updateUsersRequests }