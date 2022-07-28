import axios from 'axios';

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

const usersPermissions = async (users, files) => {
    let allUsersPermissions = (await Promise.all([...new Set(users)]
        .map(async (user) => (await fetchPermissionsByUserId(user)))))
        .flatMap(({ data }) => data)

    let acceptedUserPermissions = allUsersPermissions
        .filter(item => [...new Set(files)]
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
    return await usersPermissions(
        data.flatMap(item => item.user),
        data.flatMap(item => item.resource))
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