import { PAGE_LOADING_END, PAGE_LOADING_START } from "../constants";

export const startPageLoading = () => ({
  type: PAGE_LOADING_START,
});

export const endPageLoading = () => ({
  type: PAGE_LOADING_END,
});
