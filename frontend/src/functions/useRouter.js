import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { endPageLoading, startPageLoading } from "../actions/PageLoadingAction";

const useRouter = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const visit = (url) => {
    dispatch(startPageLoading());

    navigate(url);

    setTimeout(() => {
      dispatch(endPageLoading());
    }, 250);
  };

  return {
    visit,
  };
};

export default useRouter;
