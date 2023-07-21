import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

interface TaskModalState {
    taskId: string | null;
}

const initialState: TaskModalState = {
    taskId: null,
};

const TaskModalSlice = createSlice({
    name: "Task Modal Slice",
    initialState,
    reducers: {
        setTaskModalId: (state, taskId: PayloadAction<string | null>) => {
            state.taskId = taskId.payload;
        },
    },
});

export const TaskModalId = (state: RootState) => state.taskModal.taskId;

export const { setTaskModalId } = TaskModalSlice.actions;

export default TaskModalSlice.reducer;
