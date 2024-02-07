import Repository from "./Repository";

const getTimetableRecordForDay = (day, id) => {
  return Repository.get("/timetable/" + day + "/" + id);
};

const addTimetableRecord = (timetableRecord) => {
  return Repository.post("/timetable", timetableRecord);
};

const updateTimetableRecord = (timetableRecord) => {
  return Repository.put("/timetable", timetableRecord);
};

const deleteTimetableRecord = (id) => {
  return Repository.delete("/timetable/" + id);
};

export {
  getTimetableRecordForDay,
  addTimetableRecord,
  updateTimetableRecord,
  deleteTimetableRecord,
};
