import Repository from '../utils/repository'

const getTimetableRecordsForDay = (day, id) => {
    return Repository.get("/timetable/" + day +"/"+ id)
}

const deleteTimeTableRecordForDay = (id) => {
    return Repository.delete("/timetable/" + id)
}

const addTimeTableRecordForDay = (taskDetails) => {
    return Repository.post("/timetable/" ,taskDetails)
}

const updateTimeTableRecordForDay = (updateDetails) => {
    return Repository.put("/timetable/", updateDetails)
}

export  {
    getTimetableRecordsForDay,
    deleteTimeTableRecordForDay,
    addTimeTableRecordForDay,
    updateTimeTableRecordForDay
}