import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
    productListReducer,
    productDetailsReducer,
} from "./reducers/productReducers";
import { cartReducer } from "./reducers/cartReducers";

// include all the created reducers here
// these will represent the states
const reducer = combineReducers({
    productList: productListReducer, // productList will be shown as a state name
    productDetails: productDetailsReducer,
    cart: cartReducer,
});

const cartItemsFromStorage = localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [];

const initialState = {
    cart: { cartItems: cartItemsFromStorage },
};

const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware)) // we need this so that the browser redux devtool can work
);

export default store;
