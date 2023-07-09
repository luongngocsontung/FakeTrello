import { store } from "./../../app/store";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { addListId } from "../FakeTrello/trelloSlice";
import { RootState } from "../../app/store";

export interface ListState {
    id: number;
    title: string;
    tasksId: number[];
}

const initialState: ListState[] = [
    {
        id: 0,
        title: "To Do",
        tasksId: [],
    },
];

export const ListsSlice = createSlice({
    name: "lists",
    initialState,
    reducers: {
        addList: (
            state,
            list: PayloadAction<{ id: number; title: string }>
        ) => {
            state.push({
                id: list.payload.id,
                title: list.payload.title,
                tasksId: [],
            });
        },

        changeListTitle: (
            state,
            changes: PayloadAction<{ listId: number; newTitle: string }>
        ) => {
            const trelloList = state.find(
                (list) => list.id === changes.payload.listId
            );
            if (!trelloList) return;

            trelloList.title = changes.payload.newTitle;
        },
    },
});

export const trelloList = (state: RootState, listId: number) =>
    state.lists.find((list) => list.id === listId);

export const { addList, changeListTitle } = ListsSlice.actions;

export default ListsSlice.reducer;
