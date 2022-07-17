const TransformPipeline = (data) => {

    let that = {}

    that.requestObjects, that.resources, that.users, that.status = [];
    that.setRequestObjects = () => that.requestObjects = data.flatMap(item => item.requests)
    that.pipe = () => (...fns) => fns.reduce((a, b) => (x) => b(a(x)));

    return that;
};

const TransformPipelineToAccepted = (data) => {

    let that = TransformPipeline(data)

    that.setStatus = () => that.status = that.requestObjects.flatMap(item => item.status === "Accepted" ? true : false)
    that.setUserIds = () => that.users = data.map(item => item.user)
    that.setResourcesIds = () => that.resources = that.requestObjects.flatMap(item => item.resource)

    that.pipe(
        that.setRequestObjects(),
        that.setUserIds(),
        that.setResourcesIds(),
        that.setStatus())

    const getAcceptedUsers = () => [...new Set(that.users.filter((user, i) => that.status[i]))]
    const getAcceptedResources = () => [...new Set(that.resources.filter((resource, i) => that.status[i]))]

    return { getAcceptedUsers, getAcceptedResources }
}

const TransformPipelineToPending = (data) => {

    let that = TransformPipeline(data)

    that.setStatus = () => that.status = that.requestObjects.flatMap(item => item.status === "Pending" ? true : false)
    that.setUserObjects = () => that.users = data.map((el) => Object.assign({}, { ['user']: el.user }))
    that.setPendingUsers = () => that.users = [...that.users.filter((user, i) => that.status[i])]
    that.setPendingRequests = () => that.requests = [...that.requestObjects.filter((req, i) => that.status[i])]

    that.pipe(
        that.setRequestObjects(),
        that.setUserObjects(),
        that.setStatus(),
        that.setPendingUsers(),
        that.setPendingRequests())

    const getUsersAndRequests = () => that.users.map((user, index) => Object.assign(user, that.requests[index]))

    return { getUsersAndRequests }
}

const Monad = (value) => {
    // MONAD => FUNCTOR (MAP) + FLAT (FLATMAP)
    const map = (fn) => Monad(fn(value));
    const flatMap = (fn) => fn(value);
    const current = () => value;

    return { map, flatMap, current }
}

export { TransformPipelineToAccepted, TransformPipelineToPending }