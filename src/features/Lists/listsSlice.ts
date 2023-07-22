import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { addTask, deleteTask } from "../Tasks/taskSlice";
import {
    addTaskToAnotherList,
    reOrderInSameDroppableEl,
} from "../../utils/functions";

export interface ListState {
    id: string;
    title: string;
    tasksId: string[];
}

export interface ListSliceState {
    lists: ListState[];
}

const initialState: ListSliceState = {
    lists: JSON.parse(localStorage.getItem("trelloLists") || "{}")?.lists || [
        {
            id: "initial-list-id",
            title: "To Do",
            tasksId: ["initial-task-id", "lkebhk3zamowllypud"],
        },
    ],
};

export const ListsSlice = createSlice({
    name: "lists",
    initialState,
    reducers: {
        addList: (
            state,
            list: PayloadAction<{ id: string; title: string }>
        ) => {
            state.lists.push({
                id: list.payload.id,
                title: list.payload.title,
                tasksId: [],
            });
        },

        changeListTitle: (
            state,
            changes: PayloadAction<{ listId: string; newTitle: string }>
        ) => {
            const trelloList = state.lists.find(
                (list) => list.id === changes.payload.listId
            );
            if (!trelloList) return;

            trelloList.title = changes.payload.newTitle;
        },

        removeList: (state, listId: PayloadAction<string>) => {
            state.lists = state.lists.filter(
                (list) => list.id !== listId.payload
            );
        },

        reOrderTask: (
            state,
            changes: PayloadAction<{
                draggingId: string;
                touchedId: string | null;
                dropPosition: string;
                taskDraggingListId: string;
                taskDropListId: string;
            }>
        ) => {
            const {
                draggingId,
                touchedId,
                dropPosition,
                taskDraggingListId,
                taskDropListId,
            } = changes.payload;

            const taskDraggingList = state.lists.find(
                (list) => list.id === taskDraggingListId
            )!;
            const indexDragging = taskDraggingList.tasksId.indexOf(draggingId);
            const taskDropList = state.lists.find(
                (list) => list.id === taskDropListId
            )!;
            const indexSwap = taskDropList.tasksId.indexOf(touchedId || "");

            if (taskDraggingListId === taskDropListId) {
                const indexSwap = taskDraggingList.tasksId.indexOf(
                    touchedId || ""
                );
                reOrderInSameDroppableEl(
                    taskDraggingList.tasksId,
                    indexDragging,
                    indexSwap,
                    dropPosition
                );
            } else {
                addTaskToAnotherList(
                    taskDraggingList,
                    taskDropList,
                    indexDragging,
                    indexSwap,
                    dropPosition
                );
            }
        },
    },
    extraReducers(builder) {
        // Add new Task Id to a list
        builder.addCase(addTask, (state, action) => {
            const list = state.lists.find(
                (list) => list.id === action.payload.listId
            );
            if (!list) return;

            list.tasksId.push(action.payload.id);
        });

        // Remove Task Id from its list
        builder.addCase(deleteTask, (state, action) => {
            const { listId, taskId } = action.payload;
            const list = state.lists.find((list) => list.id === listId);
            if (!list) return;

            list.tasksId = list?.tasksId.filter((id) => id !== taskId);
        });
    },
});

export const trelloListTasksId = (state: RootState, listId: string) =>
    state.trelloLists.lists.find((list) => list.id === listId)?.tasksId;

export const trelloListTitle = (state: RootState, listId: string | undefined) =>
    state.trelloLists.lists.find((list) => list.id === listId)?.title;

export const { addList, changeListTitle, removeList, reOrderTask } =
    ListsSlice.actions;

export default ListsSlice.reducer;
