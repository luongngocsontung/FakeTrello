import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { reOrderTask, removeList } from "../Lists/listsSlice";

export interface TaskState {
    listId: string;
    id: string;
    title: string;
    description: string;
}

export interface TaskSliceState {
    tasks: TaskState[];
}

const initialState: TaskSliceState = {
    tasks: JSON.parse(localStorage.getItem("trelloTasks") || "{}")?.tasks || [
        {
            listId: "initial-list-id",
            id: "initial-task-id",
            title: "This is an example task (Click me)",
            description:
                "Hello,\n I only use pure Javascript (mouseDown, mouseMove, mouseUp) for the Drag And Drop Algorithm",
        },
        {
            listId: "initial-list-id",
            id: "lkebhk3zamowllypud",
            title: "Click this icon   ----------------->         To change task's title",
            description: "",
        },
    ],
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
                listId: params.payload.listId,
                id: params.payload.id,
                title: params.payload.title,
                description: "",
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

        changeTaskDescription: (
            state,
            params: PayloadAction<{ taskId: string; description: string }>
        ) => {
            const task = state.tasks.find(
                (task) => task.id === params.payload.taskId
            );
            if (!task) return;

            task.description = params.payload.description;
        },

        deleteTask: (
            state,
            params: PayloadAction<{ taskId: string; listId: string }>
        ) => {
            const { taskId } = params.payload;
            state.tasks = state.tasks.filter((task) => task.id !== taskId);
        },
    },
    extraReducers(builder) {
        // Update listId if Task was dragged to another List
        builder.addCase(reOrderTask, (state, actions) => {
            const { taskDropListId, draggingId } = actions.payload;
            const task = state.tasks.find((task) => task.id === draggingId);
            if (!task) return;

            task.listId = taskDropListId;
        });

        // Delete Task inside deleted List
        builder.addCase(removeList, (state, actions) => {
            const listId = actions.payload;
            state.tasks = state.tasks.filter((task) => task.listId !== listId);
        });
    },
});

export const trelloTask = (state: RootState, taskId: string | null) =>
    state.trelloTasks.tasks.find((task) => task.id === taskId);

export const trelloTaskTitle = (state: RootState, taskId: string) =>
    state.trelloTasks.tasks.find((task) => task.id === taskId)?.title;

export const { addTask, changeTaskTitle, deleteTask, changeTaskDescription } =
    TasksSlice.actions;

export default TasksSlice.reducer;
