import { RequestParams } from '../../Domain/Ports/Requests';
import { requestsController } from '../Controllers/Requests';
import { http } from '../../Infrastructure/Adapters/Http';

const getUserRequests = async (request: RequestParams) => {
    return await requestsController(http).getUsersRequest(request)
}

export { getUserRequests } 