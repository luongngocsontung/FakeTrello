import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { addList } from "../Lists/listsSlice";
import { swap } from "../../utils/functions";

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
        reOrderList: (
            state,
            params: PayloadAction<{
                draggingId: string;
                insertId: string;
                dropPosition: string;
            }>
        ) => {
            const { draggingId, insertId, dropPosition } = params.payload;

            const indexDragging = state.listsId.indexOf(draggingId);
            const indexSwap = state.listsId.indexOf(insertId);

            if (indexDragging < indexSwap) {
                for (let i = indexDragging; i < indexSwap; i++) {
                    if (i == indexSwap - 1 && dropPosition === "before") break;
                    swap(state.listsId, i, i + 1);
                }
            } else if (indexDragging > indexSwap) {
                for (let i = indexDragging; i > indexSwap; i--) {
                    if (i === indexSwap + 1 && dropPosition === "after") break;
                    swap(state.listsId, i, i - 1);
                }
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(addList, (state, action) => {
            handleAddListId(state, action.payload.id);
        });
    },
});

export const trelloListsId = (state: RootState) => state.trello.listsId;

export const { addListId, removeListId, reOrderList } = trelloSlice.actions;

export default trelloSlice.reducer;
