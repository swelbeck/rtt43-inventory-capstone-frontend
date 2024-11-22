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
    case ACTIONS.UPDATE_CATEGORY:
      return state.map((item) => {
        // Check if item belongs to the category being updated
        if (item.category._id === action.payload._id) {
          return {
            ...item,
            category: {
              ...item.category,
              name: action.payload.name,
            },
          };
        }
        return item;
      });
    default:
      return state;
  }
}
