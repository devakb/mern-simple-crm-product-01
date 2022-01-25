import React, { Fragment, useEffect } from "react";
import { Helmet } from "react-helmet";
import { NavLink } from "react-router-dom";
import { APP_NAME } from "../../config";
import LoadingBar from "react-top-loading-bar";
import { useSelector } from "react-redux";

import { frontend_routes } from "../../routeNames";
import Cookies from "universal-cookie";
import useRouter from "../../functions/useRouter";
import { toast } from "react-toastify";

const Template = ({ title, children }) => {
  const redux_selector = useSelector((state) => state);
  let [pageLoadingPercent, setPageLoadingPercent] = React.useState(0);

  useEffect(() => {
    if (redux_selector.pageLoadingStatus) {
      setPageLoadingPercent(50);
    } else {
      setPageLoadingPercent(100);
    }
  }, [redux_selector.pageLoadingStatus]);

  const nav_link_active_class = "active";
  const check_nav_link_active = (props) => {
    return props.isActive ? nav_link_active_class : "";
  };

  const cookies = new Cookies();
  const { visit } = useRouter();
  const logout = () => {
    cookies.remove("_token", { path: "/" });
    visit(frontend_routes("auth", "login"));
    toast.info("Successfully logged out");
  };

  return (
    <Fragment>
      <Helmet>
        <title>
          {APP_NAME} | {title ?? ""}
        </title>
      </Helmet>

      <LoadingBar
        color="#28acff"
        shadow={false}
        waitingTime={0}
        progress={pageLoadingPercent}
        onLoaderFinished={() => setPageLoadingPercent(0)}
      />

      <header id="AdminMainHeader">
        <div className="container">
          <div className="header-wrapper">
            <div className="campany-name">CRM</div>
            <div className="header-items">
              <ul>
                <li>Amit Kumar Biswas</li>
                <li onClick={() => logout()}>Logout</li>
              </ul>
            </div>
          </div>
        </div>
      </header>

      <nav id="AdminMainNavBar">
        <div className="nav-wrapper container">
          <div className="nav-items">
            <ul>
              <li>
                <NavLink
                  end
                  to={frontend_routes("admin", "dashboard")}
                  className={(props) => check_nav_link_active(props)}
                >
                  Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink
                  end
                  to={frontend_routes("leads", "index")}
                  className={(props) => check_nav_link_active(props)}
                >
                  Leads
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <main>
        <div className="container py-5">{children}</div>
      </main>

      <footer></footer>
    </Fragment>
  );
};

export default Template;
