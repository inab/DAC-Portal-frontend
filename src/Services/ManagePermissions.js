import axios from 'axios';
import { TransformPipelineToAccepted } from './ManageTransforms';

const fetchPermissionsByUserId = async (userId) => {
    const { REACT_APP_PERMISSIONS_URL } = process.env
    return await axios({
        method: 'get',
        url: `${REACT_APP_PERMISSIONS_URL}/permissions`,
        headers: {
            Authorization: "Bearer " + localStorage.getItem("react-token")
        },
        params: {
            'format': "PLAIN",
            'account-id': userId
        }
    })
}

const usersPermissions = async (uniqueUsers, uniqueFiles) => {
    let allUsersPermissions = (await Promise.all(uniqueUsers
        .map(async (user) => (await fetchPermissionsByUserId(user)))))
        .flatMap(({ data }) => data)
    let acceptedUserPermissions = allUsersPermissions
        .filter(item => uniqueFiles
        .includes(item.ga4gh_visa_v1.value))

    return acceptedUserPermissions
}

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

    const permissions = await usersPermissions(acceptedRequests.getAcceptedUsers(), acceptedRequests.getAcceptedResources())

    return permissions
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