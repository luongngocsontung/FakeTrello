import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

interface TaskTitleModalState {
    isOpen: boolean;
    taskId: string;
    listId: string;
    top: string;
    left: string;
    width: string;
}

const initialState: TaskTitleModalState = {
    isOpen: false,
    taskId: "",
    listId: "",
    top: "",
    left: "",
    width: "",
};

export const TaskTitleModalSlice = createSlice({
    name: "Task Title Modal",
    initialState,
    reducers: {
        openTaskTitleModal: (
            state,
            params: PayloadAction<TaskTitleModalState>
        ) => {
            const { listId, taskId, top, left, width, isOpen } = params.payload;
            state.listId = listId;
            state.taskId = taskId;
            state.top = top;
            state.left = left;
            state.width = width;
            state.isOpen = isOpen;
        },

        closeTaskTitleModal: (state) => {
            state.isOpen = false;
        },
    },
});

export const TaskTitleModal = (state: RootState) => state.taskTitleModal;

export const { openTaskTitleModal, closeTaskTitleModal } =
    TaskTitleModalSlice.actions;

export default TaskTitleModalSlice.reducer;
