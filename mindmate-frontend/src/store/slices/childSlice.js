import {createEntityAdapter, createSlice} from "@reduxjs/toolkit";

const childState = createEntityAdapter({selectId: (child)=>child.id})
const initialState = childState.getInitialState()

const childSlice = createSlice(
    {
        name: 'child',
        initialState,
        reducers:{
            addOneChild: childState.addOne,
            updateChild: childState.updateOne
        },

    })

export const {addOneChild, updateChild} = childSlice.actions
export const {selectById:selectByIdChild} = childState.getSelectors(store => store.child)
export default childSlice.reducer