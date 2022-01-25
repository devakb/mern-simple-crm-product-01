import { PAGE_LOADING_END, PAGE_LOADING_START } from "../constants";

export const pageLoadingReducer = (state = false, action) => {
  switch (action.type) {
    case PAGE_LOADING_START:
      return true;
    case PAGE_LOADING_END:
      return false;
    default:
      return state;
  }
};
