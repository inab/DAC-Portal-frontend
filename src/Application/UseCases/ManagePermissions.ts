import { DataRequest, Visa, Assertion } from '../../Domain/Entities/Entities';
import { RequestParams } from '../../Domain/Ports/Requests';
import { requestsController } from '../Controllers/Requests';
import { http } from '../../Infrastructure/Adapters/Http';

const fetchPermissionsByUserId = async (userId: string) => {
    const { REACT_APP_PERMISSIONS_URL } = process.env

    const response = await requestsController(http).getUsersRequest({ 
        url: `${REACT_APP_PERMISSIONS_URL}/permissions`, 
        params: { 'format': "PLAIN", 'account-id': userId }
    })

    return response
}

const usersPermissions = async (users: Array<string>, files: Array<string> ) => {
    const allUsersPermissions = (await Promise.all(Array.from(new Set(users))
        .map(async (user) => (await fetchPermissionsByUserId(user)))))
        .flatMap(item => item)

    const acceptedUserPermissions = allUsersPermissions
        .filter(item => Array.from(new Set(files))
        .includes(item.ga4gh_visa_v1.value))

    return acceptedUserPermissions
}

const parseUserPermissions = (permissions: Array<Visa>) => {
    const parsed = permissions.map((item: Visa) => {
        const { sub, ga4gh_visa_v1 } = item
        return Object.assign({}, { sub: sub, ...ga4gh_visa_v1 })
    })

    return parsed
}

const getUsersPermissions = async (request: RequestParams) => {
    const data = await requestsController(http).getUsersRequest(request)

    const userPermissions = await usersPermissions(
        data.flatMap((item: DataRequest) => item.user),
        data.flatMap((item: DataRequest) => item.resource))

    return userPermissions.length > 0 ? parseUserPermissions(userPermissions) : []
}

const deleteUserPermissions = async (request: RequestParams, items: Array<Assertion>) => {
    return await requestsController(http).deleteUsersPermissions(request, items)
}

export { getUsersPermissions, deleteUserPermissions }