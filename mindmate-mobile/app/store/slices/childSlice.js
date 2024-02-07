import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";

const childState = createEntityAdapter({ selectId: (child) => child.id });

const initialState = childState.getInitialState();

export const childSlice = createSlice({
  name: "child",
  initialState,
  reducers: {
    addChild: childState.addOne,
    updateChild: childState.updateOne,
  },
});

// Action creators are generated for each case reducer function
export const { addChild, updateChild } = childSlice.actions;
export const { selectById: selectChildById } = childState.getSelectors(
  (store) => store.child
);
export default childSlice.reducer;
