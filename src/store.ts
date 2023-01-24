import { configureStore } from "@reduxjs/toolkit";

import { rootSaga, sagaMiddleware } from "./sagas";
import showDetailReducer from "./Slices/showDetail";
import showsReducer from "./Slices/shows";

const store = configureStore({
  reducer: {
     Shows: showsReducer,
    ShowsDetail: showDetailReducer
  },
  middleware: [sagaMiddleware]
})
export type State = ReturnType<typeof store.getState>

sagaMiddleware.run(rootSaga)

export default store;

