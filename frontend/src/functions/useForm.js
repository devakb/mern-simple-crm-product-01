import axios from "axios";
import React from "react";

const useForm = (preLoadData = {}) => {
  const preLoadedData = preLoadData;

  const [data, setValues] = React.useState(preLoadedData ?? {});
  const [errors, setErrors] = React.useState({});
  const [errorMessage, setErrorMessage] = React.useState(null);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [processing, setProcessing] = React.useState(false);

  const setData = (key, value) => {
    if (key instanceof Object) {
      setValues({ ...data, ...key });
    } else {
      setValues({ ...data, [key]: value });
    }
  };

  const addErrors = (key, value) => {
    if (key instanceof Object) {
      setErrors({ ...data, ...key });
    } else {
      setErrors({ ...data, [key]: value });
    }
  };

  const reset = () => {
    setValues(preLoadedData);
  };

  const headers = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };

  const callApiRequest = (method, url, dataReset = true, callback = null) => {
    setProcessing(true);
    setErrors({});
    setErrorMessage(null);
    setIsSuccess(false);

    axios({
      method: method,
      url: url,
      data: data,
      headers: headers,
    })
      .then((response) => {
        setProcessing(false);
        setIsSuccess(true);

        dataReset == true && reset();

        if (callback != null) {
          callback();
        }
      })
      .catch((error) => {
        setProcessing(false);
        var errorsBag = error.response ? error.response.data.errors : {};
        setErrors(errorsBag ?? {});
        setErrorMessage(
          error.response ? error.response.data.message : error.message
        );
      });
  };

  const request = (object, dataReset, callback) => {
    callApiRequest(object.method, object.url, dataReset, callback);
  };

  const post = (url) => callApiRequest("POST", url);

  const put = (url, dataReset) => callApiRequest("PUT", url, dataReset);

  const destroy = async (url, callback = null) => {
    callApiRequest("DELETE", url, false, callback);
  };

  return {
    data,
    errors,
    addErrors,
    resetErrorBag: () => {
      setErrors({});
      setErrorMessage(null);
    },
    errorMessage,
    isSuccess,
    processing,
    reset,
    setData,
    request,
    post,
    put,
    destroy,
  };
};

export default useForm;
