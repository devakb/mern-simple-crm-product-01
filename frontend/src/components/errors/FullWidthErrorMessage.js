import React from "react";

const FullWidthErrorMessage = ({
  message = "Internal Server Error",
  callbackMessage = "Click Here",
  callback = null,
}) => {
  return (
    <div className="d-flex flex-column align-items-center py-5">
      <svg
        aria-hidden="true"
        className="SVGInline-svg SVGInline--cleaned-svg SVG-svg Icon-svg Icon--warning-svg Icon-color-svg Icon-color--gray-svg"
        height="32"
        width="32"
        style={{ fill: "#87919F" }}
        viewBox="0 0 16 16"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10.115 1.308l5.635 11.269A2.365 2.365 0 0 1 13.634 16H2.365A2.365 2.365 0 0 1 .25 12.577L5.884 1.308a2.365 2.365 0 0 1 4.231 0zM8 10.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM8 9c.552 0 1-.32 1-.714V4.714C9 4.32 8.552 4 8 4s-1 .32-1 .714v3.572C7 8.68 7.448 9 8 9z"
          fill-rule="evenodd"
        ></path>
      </svg>

      <div style={{ color: "#87919F" }} className="mt-3">
        {message}
      </div>

      {callback && (
        <button onClick={callback} className="simple-white-btn my-3">
          {callbackMessage}
        </button>
      )}
    </div>
  );
};

export default FullWidthErrorMessage;
