import { CircularProgress } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import { PAGE_CONTECT_LOAD_SIZE } from "../config";
import Cookies from "universal-cookie";
import axios from "axios";
import { backend_routes_url } from "../routeNames";
import Unauthorized from "../errors/Unauthorized";

const ProtectedAuthRoutesOutlet = () => {
  let [isAuthenticated, setIsAuthenticated] = React.useState(false);
  let [isAuthenticating, setIsAuthenticating] = React.useState(true);
  const cookies = new Cookies();

  const authenticate = async () => {
    let token = cookies.get("_token");

    if (token) {
      axios
        .post(backend_routes_url("auth", "me"))
        .then((res) => {
          setIsAuthenticated(true);
          setIsAuthenticating(false);
        })
        .catch((err) => {
          setIsAuthenticating(false);
        });
    } else {
      setIsAuthenticating(false);
    }
  };

  React.useEffect(() => authenticate(), []);

  return (
    <>
      {isAuthenticating ? (
        <>
          <div className="d-flex justify-content-center my-5">
            <CircularProgress color="inherit" size={PAGE_CONTECT_LOAD_SIZE} />
          </div>
        </>
      ) : (
        <>
          {isAuthenticated ? (
            <Outlet />
          ) : (
            <>
              <Unauthorized />
            </>
          )}
        </>
      )}
    </>
  );
};

export default ProtectedAuthRoutesOutlet;
