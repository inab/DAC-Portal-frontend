import axios from 'axios';

const getUserRequests = async (request) => {
    const { data } = await axios({
        method: request.type,
        url: request.url,
        headers: {
            Authorization: "Bearer " + request.token
        }
    })
 
    return data
 
}

export { getUserRequests } 