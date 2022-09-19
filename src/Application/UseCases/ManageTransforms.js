const Monad = (value) => {
    // MONAD => FUNCTOR (MAP) + FLAT (FLATMAP)
    const map = (fn) => Monad(fn(value));
    const flatMap = (fn) => fn(value);
    const current = () => value;

    return { map, flatMap, current }
}

const setObjects = (data) => data
    .flatMap(item => item.requests
    .map(request => Object.assign({}, { ['user']: item.user, ...request })))

const selectRequests = (data) => data.flatMap(item => item.requests)

const filterPending = (data) => data.filter(item => item.status === "Pending")

const filterAccepted = (data) => data.filter(item => item.status === "Accepted") 

const getRequests = (data) => Monad(data).map(selectRequests).flatMap(selectRequests)

const getPendingRequests = (data) => Monad(data).map(setObjects).flatMap(filterPending)

const getAcceptedRequests = (data) => Monad(data).map(setObjects).flatMap(filterAccepted)

export { getRequests, getPendingRequests, getAcceptedRequests }