import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface UtilsState {
    isOpenAddTask: { [key: string]: boolean };
}

const initialState: UtilsState = {
    isOpenAddTask: {},
};

const utilsSlice = createSlice({
    name: "Common Global State",
    initialState,
    reducers: {
        openAddTask: (state, listId: PayloadAction<string>) => {
            state.isOpenAddTask[listId.payload] = true;
        },
        closeAddTask: (state, listId: PayloadAction<string>) => {
            state.isOpenAddTask[listId.payload] = false;
        },
    },
});

export const isOpenAddTask = (state: RootState, listId: string) =>
    state.utils.isOpenAddTask[listId];

export const { openAddTask, closeAddTask } = utilsSlice.actions;

export default utilsSlice.reducer;
