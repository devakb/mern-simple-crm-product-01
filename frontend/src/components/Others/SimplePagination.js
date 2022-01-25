import { useDispatch } from "react-redux";
import {
  endPageLoading,
  startPageLoading,
} from "../../actions/PageLoadingAction";

const SimplePagination = ({
  forceDisable = false,
  page = 1,
  totalPages = 1,
  callback,
}) => {
  const dispatch = useDispatch();

  return (
    <nav>
      <button
        className="simple-white-btn"
        disabled={forceDisable || page === 1}
        onClick={() => {
          // dispatch(startPageLoading());

          callback(page - 1);

          // setTimeout(() => {
          //   dispatch(endPageLoading());
          // }, 500);
        }}
      >
        Previous
      </button>
      <button
        className="simple-white-btn"
        disabled={forceDisable || page >= totalPages}
        onClick={() => {
          // dispatch(startPageLoading());

          callback(page + 1);

          // setTimeout(() => {
          //   dispatch(endPageLoading());
          // }, 250);
        }}
      >
        Next
      </button>
    </nav>
  );
};

export default SimplePagination;
