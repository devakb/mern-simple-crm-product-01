import { Alert, Typography } from "@mui/material";
import React from "react";
import SubmitButton from "../../components/Buttons/SubmitButton";
import SimpleInputBox from "../../components/TextFields/SimpleInputBox";
import useForm from "../../functions/useForm";
import useRouter from "../../functions/useRouter";
import { backend_routes, frontend_routes } from "../../routeNames";
import validator from "validator";
import { toast } from "react-toastify";

const Login = () => {
  const {
    data,
    setData,
    request,
    errors,
    addErrors,
    resetErrorBag,
    processing,
    isSuccess,
    errorMessage,
  } = useForm({
    email: "",
    password: "",
  });

  const { visit } = useRouter();

  const LoginHandler = async (e) => {
    e.preventDefault();
    validateInputs(() =>
      request(backend_routes("auth", "login"), false, () => redirectIfSuccess())
    );
  };

  const validateInputs = (callback) => {
    let internalErrors = {};

    if (data.email == "") {
      internalErrors = {
        ...internalErrors,
        ["email"]: "The email field is required.",
      };
    } else {
      if (validator.isEmail(data.email)) {
        delete internalErrors["email"];
      } else {
        internalErrors = {
          ...internalErrors,
          ["email"]: "The entered email is invalid.",
        };
      }
    }

    if (data.password == "") {
      internalErrors = {
        ...internalErrors,
        ["password"]: "The password field is required.",
      };
    } else {
      delete internalErrors["password"];
    }

    if (Object.keys(internalErrors).length > 0) {
      addErrors(internalErrors);
    } else {
      resetErrorBag();
      callback();
    }
  };

  const redirectIfSuccess = () => {
    toast.success("You are now logged in.");
    return visit(frontend_routes("admin", "dashboard"));
  };

  return (
    <div className="w-100 h-screen d-flex justify-content-center align-items-center">
      <div className="card w-100" style={{ maxWidth: "400px" }}>
        <div className="card-body">
          <div className="card-title text-center">
            <Typography variant="h5" component="h5">
              Login
            </Typography>
          </div>
          <br />
          {Object.keys(errors).length === 0 && (
            <>
              {errorMessage != null && (
                <Alert severity="error" className="mb-4">
                  {errorMessage}
                </Alert>
              )}
            </>
          )}
          <form onSubmit={LoginHandler}>
            <SimpleInputBox
              label="Email"
              name="email"
              type=""
              required={false}
              autoComplete="email"
              errorMessage={errors.email ?? ""}
              value={data.email ?? ""}
              onChange={(e) => setData(e.target.name, e.target.value)}
            />

            <SimpleInputBox
              label="Password"
              name="password"
              type="password"
              required={false}
              errorMessage={errors.password ?? ""}
              value={data.password ?? ""}
              onChange={(e) => setData(e.target.name, e.target.value)}
            />

            <br />

            <SubmitButton
              type="submit"
              processing={processing}
              processingText="Validating ..."
              children={"Login"}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
