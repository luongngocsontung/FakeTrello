import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface TaskState {
    id: string;
    title: string;
}

export interface TaskSliceState {
    tasks: TaskState[];
}

const initialState: TaskSliceState = {
    tasks: JSON.parse(localStorage.getItem("trelloTasks") || "[]")?.tasks,
};

export const TasksSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        addTask: (
            state,
            params: PayloadAction<{ listId: string; id: string; title: string }>
        ) => {
            state.tasks.push({
                id: params.payload.id,
                title: params.payload.title,
            });
        },

        changeTaskTitle: (
            state,
            params: PayloadAction<{ id: string; newTitle: string }>
        ) => {
            const task = state.tasks.find(
                (task) => task.id === params.payload.id
            );
            if (!task) return;

            task.title = params.payload.newTitle;
        },

        deleteTask: (
            state,
            params: PayloadAction<{ taskId: string; listId: string }>
        ) => {
            const { taskId } = params.payload;
            state.tasks = state.tasks.filter((task) => task.id !== taskId);
        },
    },
});

export const trelloTaskTitle = (state: RootState, taskId: string) =>
    state.trelloTasks.tasks.find((task) => task.id === taskId)?.title;

export const { addTask, changeTaskTitle, deleteTask } = TasksSlice.actions;

export default TasksSlice.reducer;
