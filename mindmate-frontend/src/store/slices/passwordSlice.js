const {createSlice, createEntityAdapter} = require("@reduxjs/toolkit");

const passwordState = createEntityAdapter({selectId: (password) => password.id})

const initialState = passwordState.getInitialState();

const passwordSlice = createSlice({
    name: 'password',
    initialState,
    reducer: {
        updatePassword: passwordState.updateOne
    },
})

export const {updatePassword} = passwordSlice.actions
export const {selectById: selectByIdPassword} = passwordState.getSelectors(store => store.password)
export default passwordSlice.reducer