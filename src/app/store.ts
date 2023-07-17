import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import trelloReducer from "../features/FakeTrello/trelloSlice";
import listsReducer from "../features/Lists/listsSlice";
import taskReducer from "../features/Tasks/taskSlice";
import taskTitleModalReducer from "../features/TrelloTaskTitleModal/TaskTitleModalSlice";

export const store = configureStore({
    reducer: {
        trello: trelloReducer,
        lists: listsReducer,
        tasks: taskReducer,
        taskTitleModal: taskTitleModalReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
