import Repository from '../utils/repository'

const getEmotionList = () => {
    return Repository.get('/emotion/')
}

const postResponse = (response) => {
    return Repository.post('/respond', response)
}

export {
    getEmotionList,
    postResponse
}