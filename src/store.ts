import { composeWithDevTools } from "@redux-devtools/extension";
import { applyMiddleware, combineReducers, createStore } from "redux";
import showsReducer from "./Reducers/Shows";
import showDetailReducer from "./Reducers/ShowsDetail";
import { rootSaga, sagaMiddleware } from "./sagas";

const reducer = combineReducers({
    Shows: showsReducer,
    ShowsDetail: showDetailReducer
})

export type State = ReturnType<typeof reducer>

const store = createStore(reducer, composeWithDevTools(applyMiddleware(sagaMiddleware)))

sagaMiddleware.run(rootSaga)

export default store;