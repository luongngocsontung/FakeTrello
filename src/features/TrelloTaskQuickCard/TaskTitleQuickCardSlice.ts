import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

interface TaskTitleQuickCardState {
    isOpen: boolean;
    taskId: string;
    listId: string;
    top: string;
    left: string;
    width: string;
}

const initialState: TaskTitleQuickCardState = {
    isOpen: false,
    taskId: "",
    listId: "",
    top: "",
    left: "",
    width: "",
};

export const TaskTitleQuickCardSlice = createSlice({
    name: "Task Title Quick Card",
    initialState,
    reducers: {
        openTaskTitleQuickCard: (
            state,
            params: PayloadAction<TaskTitleQuickCardState>
        ) => {
            const { listId, taskId, top, left, width, isOpen } = params.payload;
            state.listId = listId;
            state.taskId = taskId;
            state.top = top;
            state.left = left;
            state.width = width;
            state.isOpen = isOpen;
        },

        closeTaskTitleQuickCard: (state) => {
            state.isOpen = false;
        },
    },
});

export const TaskTitleQuickCard = (state: RootState) =>
    state.taskTitleQuickCard;

export const { openTaskTitleQuickCard, closeTaskTitleQuickCard } =
    TaskTitleQuickCardSlice.actions;

export default TaskTitleQuickCardSlice.reducer;
