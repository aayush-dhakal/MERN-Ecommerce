import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/cartConstants";

export const cartReducer = (state = { cartItems: [] }, action) => {
    switch (action.type) {
        case CART_ADD_ITEM:
            const item = action.payload; // gets the selected/added cart item

            // we have to check if the selected/added item is already in the cart or not
            const existItem = state.cartItems.find(
                (x) => x.product === item.product
            );

            if (existItem) {
                return {
                    ...state,
                    cartItems: state.cartItems.map((x) =>
                        x.product === existItem.product ? item : x
                    ),
                }; // we will return a modified item obtained from payload
            } else {
                return {
                    ...state, // first copies the state ie the action will be preserved
                    cartItems: [...state.cartItems, item], // to update the cartItems first copy the previous state's cartItems (ie incase some items are already added or present in the state) then after that add the new item
                };
            }

        case CART_REMOVE_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter(
                    (x) => x.product !== action.payload
                ),
            };

        default:
            return state;
    }
};
