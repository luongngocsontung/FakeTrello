import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { ListsSlice } from "../Lists/listsSlice";

export interface TrelloState {
    listsId: number[];
}

const initialState: TrelloState = {
    listsId: [0],
};

const handleAddListId = (state: TrelloState, listId: number) => {
    state.listsId.push(listId);
};

export const trelloSlice = createSlice({
    name: "trello",
    initialState,
    reducers: {
        addListId: (state, listId: PayloadAction<number>) => {
            handleAddListId(state, listId.payload);
        },
        removeListId: (state, listId: PayloadAction<number>) => {
            const listIndex = state.listsId.indexOf(listId.payload);
            state.listsId.splice(listIndex, 1);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(ListsSlice.actions.addList, (state, action) => {
            handleAddListId(state, action.payload.id);
        });
    },
});

export const trelloListsId = (state: RootState) => state.trello.listsId;

export const { addListId, removeListId } = trelloSlice.actions;

export default trelloSlice.reducer;
