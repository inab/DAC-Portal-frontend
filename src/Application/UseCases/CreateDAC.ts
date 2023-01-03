import { DACInfo } from '../../Domain/Entities/Entities';
import { DACRequestParams } from '../../Domain/Ports/Requests';
import { requestsController } from '../Controllers/Requests';
import { http } from '../../Infrastructure/Adapters/Http';

const getUserDACs = async (request : DACRequestParams) : Promise<Array<DACInfo>> => {
    const data = await requestsController(http).getUserDACs(request)
    return data.length > 0 ? data : []
}

const updateDACInfo = async (request : DACRequestParams) => {
    const data = await requestsController(http).updateDACInfo(request)
    return [data]
}

export { getUserDACs, updateDACInfo }
