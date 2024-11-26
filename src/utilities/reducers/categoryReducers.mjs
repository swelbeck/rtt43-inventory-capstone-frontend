import ACTIONS from "./inventoryReducerActions.mjs";

export default function categoriesReducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_CATEGORIES:
      return action.payload;

    case ACTIONS.ADD_CATEGORY:
      return [...state, action.payload];

    case ACTIONS.UPDATE_CATEGORY:
      return state.map((item) =>
        item.category._id === action.payload._id
          ? {
              ...item,
              category: { ...item.category, name: action.payload.name },
            }
          : item
      );

    case ACTIONS.DELETE_CATEGORY:
      return state.filter((category) => category._id !== action.payload);

    default:
      return state;
  }
}
