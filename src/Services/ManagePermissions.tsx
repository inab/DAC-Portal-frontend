import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { UserRequest, UserRequestParams, Visa, Assertion } from '../Models/ManagePermissions';

const fetchPermissionsByUserId = async (userId: string) => {
    const { REACT_APP_PERMISSIONS_URL } = process.env

    const config: AxiosRequestConfig = {
        method: 'get',
        url: `${REACT_APP_PERMISSIONS_URL}/permissions`,
        headers: {
            Authorization: "Bearer " + localStorage.getItem("react-token")
        },
        params: {
            'format': "PLAIN",
            'account-id': userId
        }
    }   

    const response : AxiosResponse<any> = await axios(config)

    return response
}

const usersPermissions = async (users: Array<string>, files: Array<string> ) => {
    let allUsersPermissions = (await Promise.all(Array.from(new Set(users))
        .map(async (user) => (await fetchPermissionsByUserId(user)))))
        .flatMap(({ data }) => data)

    let acceptedUserPermissions = allUsersPermissions
        .filter(item => Array.from(new Set(files))
        .includes(item.ga4gh_visa_v1.value))

    return acceptedUserPermissions
}

const getUsersRequests = async (request: UserRequestParams) => {
    const config: AxiosRequestConfig = {
        method: request.type,
        url: request.url,
        headers: {
            Authorization: "Bearer " + request.token
        },
        params: request.params
    }

    const response: AxiosResponse<Array<UserRequest>> = await axios(config)

    return response
}

const parseUserPermissions = (permissions: Array<Visa>) => {
    let parsed = permissions.map((item: Visa) => {
        const { sub, ga4gh_visa_v1 } = item
        return Object.assign({}, { sub: sub, ...ga4gh_visa_v1 })
    })

    return parsed
}

const getUsersPermissions = async (request: UserRequestParams) => {
    const { data } : AxiosResponse<Array<UserRequest>> = await getUsersRequests(request);

    const userPermissions = await usersPermissions(
        data.flatMap(item => item.user),
        data.flatMap(item => item.resource))

    return userPermissions.length > 0 ? parseUserPermissions(userPermissions) : []
}

const deleteUserPermissions = async (request: UserRequestParams, items: Array<Assertion>) => {
    const config: AxiosRequestConfig = {
        method: request.type,
        url: request.url,
        headers: {
            Authorization: "Bearer " + request.token
        },
        params: request.params
    }  
    await axios(config)

    const response: Array<Assertion> | [] = items.filter((element, index) => index !== request.index);
    
    return response
}

export { getUsersPermissions, deleteUserPermissions }