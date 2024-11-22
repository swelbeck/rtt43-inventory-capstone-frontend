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
        item.id === action.payload.id
          ? { ...item, name: action.payload.name }
          : item
      );
    case ACTIONS.UPDATE_ITEM:
      return state.map((item) =>
        item.id === action.payload.id
          ? action.payload
          : item
      );
    default:
      return state;
  }
}
