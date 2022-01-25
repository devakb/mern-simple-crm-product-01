import React from "react";

const SimpleInputBox = ({
  label = "",
  errorMessage = "",
  className = "",
  ...props
}) => {
  return (
    <div className="simple-input-box">
      {label != "" && <label className="simple-input-box-label">{label}</label>}

      <input
        className={`${
          errorMessage != "" && "error"
        } simple-input-box-input ${className}`}
        {...props}
      />

      {errorMessage != "" && (
        <label className="simple-input-box-error">
          <svg
            aria-hidden="true"
            className="SVGInline-svg SVGInline--cleaned-svg SVG-svg Icon-svg Icon--warning-svg Icon-color-svg Icon-color--red-svg"
            height="12"
            width="12"
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.115 1.308l5.635 11.269A2.365 2.365 0 0 1 13.634 16H2.365A2.365 2.365 0 0 1 .25 12.577L5.884 1.308a2.365 2.365 0 0 1 4.231 0zM8 10.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM8 9c.552 0 1-.32 1-.714V4.714C9 4.32 8.552 4 8 4s-1 .32-1 .714v3.572C7 8.68 7.448 9 8 9z"
              fill-rule="evenodd"
            ></path>
          </svg>
          {errorMessage}
        </label>
      )}
    </div>
  );
};

export default SimpleInputBox;
