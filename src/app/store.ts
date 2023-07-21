import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import trelloReducer from "../features/FakeTrello/trelloSlice";
import listsReducer from "../features/Lists/listsSlice";
import taskReducer from "../features/Tasks/taskSlice";
import taskTitleQuickCardReducer from "../features/TrelloTaskQuickCard/TaskTitleQuickCardSlice";
import taskModalReducer from "../features/TrelloTaskModal/taskModalSlice";
import utilsReducer from "../features/Utils/utilsSlice";

export const store = configureStore({
    reducer: {
        trello: trelloReducer,
        trelloLists: listsReducer,
        trelloTasks: taskReducer,
        taskTitleQuickCard: taskTitleQuickCardReducer,
        taskModal: taskModalReducer,
        utils: utilsReducer,
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
