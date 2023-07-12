import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import trelloReducer from "../features/FakeTrello/trelloSlice";
import listsReducer from "../features/Lists/listsSlice";
import taskReducer from "../features/Tasks/taskSlice";

export const store = configureStore({
    reducer: {
        trello: trelloReducer,
        lists: listsReducer,
        tasks: taskReducer,
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
