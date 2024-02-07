import Repository from "../utils/repository";

const getScheduledTasks = (id) => {
    return Repository.get('/scheduler/tasks/web/' + id)
}

const deleteScheduledTasks = (childId, reminderId) => {
    return Repository.delete('/scheduler/onetime/' + childId + '/' + reminderId)
}

const updateSchedulerTask = (childId, schedulerDetails) => {
    return Repository.put('/scheduler/onetime/' + childId, schedulerDetails)
}

const addSchedulerTask = (childId, schedulerDetails) => {
    return Repository.post('/scheduler/onetime/' + childId, schedulerDetails)
}

const getUpcomingTask = (childId) => {
    return Repository.get('/scheduler/upcoming/'+ childId)
}

export {
    getScheduledTasks,
    deleteScheduledTasks,
    updateSchedulerTask,
    addSchedulerTask,
    getUpcomingTask
}