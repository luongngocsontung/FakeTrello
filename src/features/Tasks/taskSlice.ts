import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface TaskState {
    id: string;
    title: string;
}

const initialState: TaskState[] = JSON.parse(
    localStorage.getItem("trelloTasks") || "[]"
);

export const TasksSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        addTask: (
            state,
            params: PayloadAction<{ listId: string; id: string; title: string }>
        ) => {
            state.push({
                id: params.payload.id,
                title: params.payload.title,
            });
        },

        changeTaskTitle: (
            state,
            params: PayloadAction<{ id: string; newTitle: string }>
        ) => {
            const task = state.find((task) => task.id === params.payload.id);
            if (!task) return;

            task.title = params.payload.newTitle;
        },
    },
});

export const trelloTask = (state: RootState, taskId: string) =>
    state.tasks.find((task) => task.id === taskId);

export const { addTask, changeTaskTitle } = TasksSlice.actions;

export default TasksSlice.reducer;
