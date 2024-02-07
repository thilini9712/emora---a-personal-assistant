import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";

const parentState = createEntityAdapter({ selectId: (parent) => parent.id });

const initialState = parentState.getInitialState();

export const parentSlice = createSlice({
  name: "parent",
  initialState,
  reducers: {
    addParent: parentState.addOne,
    updateParent: parentState.updateOne,
  },
});

// Action creators are generated for each case reducer function
export const { addParent, updateParent } = parentSlice.actions;
export const { selectById: selectParentById } = parentState.getSelectors(
  (store) => store.parent
);
export default parentSlice.reducer;
