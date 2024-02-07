import {createEntityAdapter, createSlice} from "@reduxjs/toolkit";

const parentState = createEntityAdapter({selectId: (parent) => parent.id})

const initialState = parentState.getInitialState()

const parentSlice = createSlice({
    name: 'parent',
    initialState,
    reducers: {
        addOneParent: parentState.addOne,
        updateParent: parentState.updateOne
    },

})

export const {addOneParent, updateParent} = parentSlice.actions
export const {selectById: selectByIdParent} = parentState.getSelectors(store => store.parent)
export default parentSlice.reducer