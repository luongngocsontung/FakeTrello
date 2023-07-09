import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import counterReducer from "../features/counter/counterSlice"
import trelloReducer from "../features/FakeTrello/trelloSlice"
import listsReducer from "../features/Lists/listsSlice"

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    trello: trelloReducer,
    lists: listsReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
