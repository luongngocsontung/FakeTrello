import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { addList } from "../Lists/listsSlice";

export interface TrelloState {
    listsId: string[];
}

const initialState: TrelloState = {
    listsId: JSON.parse(localStorage.getItem("trello") || "[]"),
};

const handleAddListId = (state: TrelloState, listId: string) => {
    state.listsId.push(listId);
};

export const trelloSlice = createSlice({
    name: "trello",
    initialState,
    reducers: {
        addListId: (state, listId: PayloadAction<string>) => {
            handleAddListId(state, listId.payload);
        },
        removeListId: (state, listId: PayloadAction<string>) => {
            const listIndex = state.listsId.indexOf(listId.payload);
            state.listsId.splice(listIndex, 1);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(addList, (state, action) => {
            handleAddListId(state, action.payload.id);
        });
    },
});

export const trelloListsId = (state: RootState) => state.trello.listsId;

export const { addListId, removeListId } = trelloSlice.actions;

export default trelloSlice.reducer;
