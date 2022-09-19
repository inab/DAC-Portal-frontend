import { DACInfo } from '../../Domain/Entities/Entities';
import { DACRequestParams } from '../../Domain/Ports/Requests';
import { requestsController } from '../Controllers/Requests';
import { http } from '../../Infrastructure/Adapters/Http';

const getUserDACs = async (request : DACRequestParams) => {
    const data = await requestsController(http).getUserDACs(request)
    return data.length > 0 ? parseUserDacs(data) : []
}

const updateDACInfo = async (request : DACRequestParams) => {
    const data = await requestsController(http).updateDACInfo(request)
    return data.length > 0 ? parseUserDacs(data) : []
}

const parseUserDacs = (dacs: Array<DACInfo>) => {
    const parsed = dacs.map((item: any) => {
        const { dacId, info } = item
        return Object.assign({}, { dacId: dacId, ...info })
    })
    return parsed
}

export { getUserDACs, updateDACInfo }
