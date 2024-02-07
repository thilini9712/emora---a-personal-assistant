import {createEntityAdapter, createSlice} from "@reduxjs/toolkit";

const scheduleState = createEntityAdapter({selectId : (scheduler) => scheduler.id})
const initialState = scheduleState.getInitialState();

const schedulerSlice = createSlice(
    {
        name: 'scheduler',
        initialState,
        reducers: {
            addOneScheduler: scheduleState.addOne,
            addManyScheduler: scheduleState.addMany,
            updateOneScheduler: scheduleState.updateOne,
            deleteOneScheduler: scheduleState.removeOne,
        },
    }
)

export const {addOneScheduler, addManyScheduler, updateOneScheduler, deleteOneScheduler} = schedulerSlice.actions
export const {
    selectById: selectByIdScheduler,
    selectAll: selectAllScheduler,
} = scheduleState.getSelectors((store) => store.schedule);
export default schedulerSlice.reducer
