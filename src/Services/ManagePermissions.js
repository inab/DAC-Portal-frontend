import axios from 'axios';
import { TransformPipelineToAccepted } from './ManageTransforms';
import { usersPermissions } from '../utils/utils';

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
    const { data } = await getUsersRequests(request);
    const acceptedRequests = TransformPipelineToAccepted(data);
    return await usersPermissions(acceptedRequests.getAcceptedUsers(), acceptedRequests.getAcceptedResources());
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