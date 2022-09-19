import { DataRequest } from '../../Domain/Entities/Entities';
import { RequestParams } from '../../Domain/Ports/Requests';
import { requestsController } from '../Controllers/Requests';
import { http } from '../../Infrastructure/Adapters/Http';

const getPendingUserRequests = async (request: RequestParams) => {
    return await requestsController(http).getUsersRequest(request)
}

const updateUsersRequests = async (request: RequestParams, items: Array<DataRequest>) => {
    return await requestsController(http).acceptUsersRequests(request, items)
}

export { getPendingUserRequests, updateUsersRequests }