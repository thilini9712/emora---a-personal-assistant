import {createEntityAdapter, createSlice} from "@reduxjs/toolkit";

const dailyTimeTableState = createEntityAdapter({selectId: (timetable) => timetable.id})
const initialState = dailyTimeTableState.getInitialState();

const dailyTimeTableSlice = createSlice({
    name: 'dailyTimeTable',
    initialState,
    reducers: {
        addOneDailyTimeTable:dailyTimeTableState.addOne,
        addManyDailyTimeTable: dailyTimeTableState.addMany,
        updateOneDailyTimeTable: dailyTimeTableState.updateOne,
        removeOneDailyTimeTable: dailyTimeTableState.removeOne,
    }

})

export const {addOneDailyTimeTable,addManyDailyTimeTable, updateOneDailyTimeTable, removeOneDailyTimeTable} = dailyTimeTableSlice.actions
export const {
    selectByIdAndDay: selectByIdDailyTimeTable,
    selectAll: selectAllDailyTimeTables,
} = dailyTimeTableState.getSelectors((store) => store.dailyTimeTable);
export default dailyTimeTableSlice.reducer
