import {configureStore} from "@reduxjs/toolkit";
import parentSlice from "./slices/parentSlice";
import childSlice from "./slices/childSlice";
import passwordSlice from "./slices/passwordSlice";
import dailyTimeTableSlice from "./slices/dailyTimeTableSlice";
import schedulerSlice from "./slices/schedulerSlice";

const store = configureStore({
    reducer: {
        parent: parentSlice,
        child: childSlice,
        password: passwordSlice,
        dailyTimeTable: dailyTimeTableSlice,
        schedule: schedulerSlice,
    }
})

export default store