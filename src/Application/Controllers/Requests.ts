import { Http } from '../../Domain/Ports/Http';
import { DataRequest, Assertion, Policy, DACInfo } from '../../Domain/Entities/Entities';

const setConfig = () => {
    return {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("react-token")
        }
    }
}

export const requestsController = (client: Http)  => ({
    getUsersRequest: async (request: any) => {
        const response = await client.get<DataRequest[]>(request.url, request.params, setConfig());
        return response.map((req: DataRequest) => req);
    },
    acceptUsersRequests: async (request: any, items: Array<DataRequest>) => {
        await client.put<DataRequest[]>(request.url, request.params, setConfig() );
        return items.filter(( element: DataRequest, index: number) => index !== request.index);
    },
    denyUsersRequests: async (request: any, items: Array<DataRequest>) => {
        await client.put<DataRequest[]>(request.url, request.params, setConfig() );
        return items.filter(( element: DataRequest, index: number) => index !== request.index);
    },
    deleteUsersPermissions: async (request: any, items: Array<Assertion>) => {
        await client.delete<Assertion[]>(request.url, request.params, setConfig() );
        return items.filter(( element: Assertion, index: number) => index !== request.index);
    },
    getDACPolicies: async (request: any) => {
        const response = await client.get<Policy[]>(request.url, request.params, setConfig());
        return response.map((req: Policy) => req);
    },
    updateDACPolicies: async (request: any) => {
        const response = await client.put<Policy[]>(request.url, request.params, setConfig());
        return response.map((req: Policy) => req);
    },
    getUserDACs: async (request: any) => {
        const response = await client.get<DACInfo>(request.url, request.params, setConfig());
        return response.map((req: DACInfo) => req);
    },
    updateDACInfo: async (request: any) => {
        console.log("request.params")
        console.log(request.params)
        const response = await client.put<DACInfo>(request.url, request.params, setConfig());

        return response.map((req: DACInfo) => req);
    }
})