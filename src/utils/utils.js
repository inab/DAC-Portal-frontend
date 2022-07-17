import axios from 'axios';

const { REACT_APP_PERMISSIONS_URL } = process.env

// TODO: REFACTORING
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
    let assertions2 = assertions.map(el => JSON.parse(el)).filter(el2 => uniqueFiles.includes(el2.ga4gh_visa_v1.value))
    return assertions.map(el => JSON.parse(el))
      .filter(el2 => uniqueFiles.includes(el2.ga4gh_visa_v1.value))
  })
  return response
}

export { usersPermissions };
