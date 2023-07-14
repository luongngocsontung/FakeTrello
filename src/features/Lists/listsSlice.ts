import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { addTask } from "../Tasks/taskSlice";

export interface ListState {
    id: string;
    title: string;
    tasksId: string[];
}

const initialState: ListState[] = JSON.parse(
    localStorage.getItem("trelloLists") || "[]"
);

export const ListsSlice = createSlice({
    name: "lists",
    initialState,
    reducers: {
        addList: (
            state,
            list: PayloadAction<{ id: string; title: string }>
        ) => {
            state.push({
                id: list.payload.id,
                title: list.payload.title,
                tasksId: [],
            });
        },

        changeListTitle: (
            state,
            changes: PayloadAction<{ listId: string; newTitle: string }>
        ) => {
            const trelloList = state.find(
                (list) => list.id === changes.payload.listId
            );
            if (!trelloList) return;

            trelloList.title = changes.payload.newTitle;
        },
    },
    extraReducers(builder) {
        // Add new Task Id to a list
        builder.addCase(addTask, (state, action) => {
            const list = state.find(
                (list) => list.id === action.payload.listId
            );
            if (!list) return;

            list.tasksId.push(action.payload.id);
        });
    },
});

export const trelloListTasksId = (state: RootState, listId: string) =>
    state.lists.find((list) => list.id === listId)?.tasksId;

export const trelloListTitle = (state: RootState, listId: string) =>
    state.lists.find((list) => list.id === listId)?.title;

export const { addList, changeListTitle } = ListsSlice.actions;

export default ListsSlice.reducer;
