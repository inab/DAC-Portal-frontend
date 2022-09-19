import { DataRequest } from '../../Domain/Entities/Entities';
import { RequestParams } from '../../Domain/Ports/Requests';
import { requestsController } from '../Controllers/Requests';
import { http } from '../../Infrastructure/Adapters/Http';

const getPendingUserRequests = async (request: RequestParams) => {
    return await requestsController(http).getUsersRequest(request)
}

const acceptUserRequest = async (request: RequestParams, items: Array<DataRequest>) => {
    return await requestsController(http).acceptUsersRequests(request, items)
}

const denyUserRequest = async (request: RequestParams, items: Array<DataRequest>) => {
    return await requestsController(http).denyUsersRequests(request, items)
}

export { getPendingUserRequests, acceptUserRequest, denyUserRequest }