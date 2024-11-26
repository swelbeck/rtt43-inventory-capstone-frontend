import ACTIONS from "./inventoryReducerActions.mjs";

export default function inventoryReducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_INVENTORY:
      return action.payload;
    case ACTIONS.ADD_ITEM:
      return [...state, action.payload];
    case ACTIONS.DELETE_ITEM:
      return state.filter((item) => item._id !== action.payload);
    case ACTIONS.EDIT_ITEM:
      return state.map((item) =>
        item._id === action.payload._id ? { ...item, ...action.payload } : item
      );
    case ACTIONS.TOGGLE_SHOPPING_STATUS:
      return state.map((item) =>
        item._id === action.payload._id
          ? { ...item, shoppingStatus: action.payload.shoppingStatus }
          : item
      );

    case ACTIONS.ADD_ITEM_TO_SHOPPING_LIST:
      return state.map((item) =>
        item._id === action.payload._id
          ? { ...item, addedToShoppingList: true }
          : item
      );

    case ACTIONS.DELETE_ITEM_FROM_SHOPPING_LIST:
      return state.map((item) =>
        item._id === action.payload
          ? { ...item, addedToShoppingList: false, shoppingStatus: "None" }
          : item
      );

    case ACTIONS.UPDATE_CATEGORY:
      return state.map((item) =>
        item.category._id === action.payload._id
          ? {
              ...item,
              category: { ...item.category, name: action.payload.name },
            }
          : item
      );

    case ACTIONS.SET_CATEGORIES:
      return {
        ...state,
        categories: action.payload, // Update categories in the global state
      };

    default:
      return state;
  }
}
