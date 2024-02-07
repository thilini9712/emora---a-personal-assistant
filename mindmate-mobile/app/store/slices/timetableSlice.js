import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";

const timetableState = createEntityAdapter({
  selectId: (timetable) => timetable.id,
});

const initialState = timetableState.getInitialState();

export const timetableSlice = createSlice({
  name: "timetable",
  initialState,
  reducers: {
    addTimetableRecords: timetableState.addMany,
  },
});

// Action creators are generated for each case reducer function
export const { addTimetableRecords } = parentSlice.actions;
export const { selectById: selectParentById } = parentState.getSelectors(
  (store) => store.parent
);
export default timetableSlice.reducer;
