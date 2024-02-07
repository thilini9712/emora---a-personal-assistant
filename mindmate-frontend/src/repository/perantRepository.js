import Repository from "../utils/repository";

const getParentDetails = (id) => {
    return Repository.get('/parent/'+id)
}

const updateParentDetails = (Details) => {
    return Repository.put("/parent",Details)
}

const updateParentPassword = (password) => {
    return Repository.put("/parent/password/change",password)
}

export {
    getParentDetails,
    updateParentDetails,
    updateParentPassword,
}