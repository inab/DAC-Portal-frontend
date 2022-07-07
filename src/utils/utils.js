import axios from 'axios';

const { REACT_APP_PERMISSIONS_URL } = process.env

const usersPermissions = async (uniqueUsers, uniqueFiles) => {
    let reqList = [];
    for (var i = 0; i < uniqueUsers.length; i++) {
      let axiosReq = await axios({
        method: 'get',
        url: `${REACT_APP_PERMISSIONS_URL}/permissions`,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("react-token")
        },
        params: {
          'format': "PLAIN",
          'account-id': uniqueUsers[i]
        },
      })
      reqList.push(axiosReq)
    }
    const response = await Promise.all(reqList).then(res => {
      let data = res.map(el => el.data)
      let assertions = Array.prototype.concat.apply([], data);
      return assertions.map(el => JSON.parse(el))
                       .filter(el2 => uniqueFiles.includes(el2.ga4gh_visa_v1.value))
    })
    return response
}

const itemsDestructuring = (obj) => { 
  let destructured = [];

  obj.map(userReq => {
    let { user, requests } = userReq;
    requests.map(requestItems => {
      let { fileId, resource, comment } = requestItems
      destructured.push({
        user, fileId, resource, comment
      })
    }
    )
  })
  
  return destructured
}

const getUniqueRequests = (obj) => { 
    let destructured = itemsDestructuring(obj);
    const uniqueReqStr = new Set(destructured.map(JSON.stringify))
    const uniqueReqObj = Array.from(uniqueReqStr).map(el => { return JSON.parse(el) })
    const uniqueUsers = [...new Set(uniqueReqObj.map(item => item.user))];
    const uniqueFiles = [...new Set(uniqueReqObj.map(item => item.resource))];
    
    return [uniqueUsers, uniqueFiles]
}

export { itemsDestructuring, getUniqueRequests, usersPermissions };
