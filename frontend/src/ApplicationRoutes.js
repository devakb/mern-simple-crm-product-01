import React from "react";
import { Route, Routes } from "react-router-dom";

// *************************        Components        *************************

import { Index as LeadIndex } from "./pages/Admin/Leads/Index";
import { Create as LeadCreate } from "./pages/Admin/Leads/Create";
import { Edit as LeadEdit } from "./pages/Admin/Leads/Edit";

import { FRONTEND_ROUTES, frontend_routes } from "./routeNames";
import ProtectedAuthRoutesOutlet from "./outlets/ProtectedAuthRoutesOutlet";
import Login from "./pages/Public/Login";
import { Index as DashboardIndex } from "./pages/Admin/Dashboard/Index";
import PageNotFound from "./errors/PageNotFound";

const GenerateRouteKey = () => {
  return "Router-" + Math.random().toString(36).substr(2, 9);
};

const ApplicationRoutes = () => {
  return (
    <Routes>
      <Route path={FRONTEND_ROUTES.auth.login} element={<Login />} />

      <Route
        path={FRONTEND_ROUTES.admin.dashboard}
        element={<ProtectedAuthRoutesOutlet />}
      >
        <Route
          path={FRONTEND_ROUTES.admin.dashboard}
          element={<DashboardIndex />}
        />

        <Route path={FRONTEND_ROUTES.leads.index} element={<LeadIndex />} />
        <Route path={FRONTEND_ROUTES.leads.create} element={<LeadCreate />} />
        <Route path={FRONTEND_ROUTES.leads.edit} element={<LeadEdit />} />
      </Route>

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default ApplicationRoutes;
