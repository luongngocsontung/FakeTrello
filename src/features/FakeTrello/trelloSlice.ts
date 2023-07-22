import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { addList, removeList } from "../Lists/listsSlice";
import { reOrderInSameDroppableEl, swap } from "../../utils/functions";

export interface TrelloState {
    listsId: string[];
}

const initialState: TrelloState = {
    listsId: JSON.parse(localStorage.getItem("trello") || "{}")?.listsId || [
        "initial-list-id",
    ],
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
        reOrderList: (
            state,
            params: PayloadAction<{
                draggingId: string;
                touchedId: string;
                dropPosition: string;
            }>
        ) => {
            const { draggingId, touchedId, dropPosition } = params.payload;

            const indexDragging = state.listsId.indexOf(draggingId);
            const indexSwap = state.listsId.indexOf(touchedId);

            reOrderInSameDroppableEl(
                state.listsId,
                indexDragging,
                indexSwap,
                dropPosition
            );
        },
    },
    extraReducers: (builder) => {
        // Add List Id if a list was added
        builder.addCase(addList, (state, action) => {
            handleAddListId(state, action.payload.id);
        });

        // Remove List Id if a list was removed
        builder.addCase(removeList, (state, action) => {
            state.listsId = state.listsId.filter(
                (listId) => listId !== action.payload
            );
        });
    },
});

export const trelloListsId = (state: RootState) => state.trello.listsId;

export const { addListId, removeListId, reOrderList } = trelloSlice.actions;

export default trelloSlice.reducer;
