import { RequestParams } from '../../Domain/Ports/Requests';
import { requestsController } from '../Controllers/Requests';
import { http } from '../../Infrastructure/Adapters/Http'

const getPolicies = async (request : RequestParams) => {
    return await requestsController(http).getDACPolicies(request)
}

const updatePolicies = async (request : RequestParams) => {
    return await requestsController(http).updateDACPolicies(request)
}

export { getPolicies, updatePolicies }