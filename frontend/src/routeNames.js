/*******************
 * FRONTEND ROUTES *
 *******************/

export const FRONTEND_ROUTES = {
  auth: {
    login: "/login",
  },

  admin: {
    dashboard: "/admin",
  },

  leads: {
    index: "/admin/leads",
    create: "/admin/leads/create",
    edit: "/admin/leads/edit/:lead_id",
  },
};

export const frontend_routes = (
  group_name,
  key,
  params = null,
  query = null
) => {
  let url = FRONTEND_ROUTES[group_name][key] ?? "";

  if (params instanceof Object) {
    Object.keys(params).map((key) => {
      let vir_key = ":" + key;
      let vir_value = params[key];

      url = url.replace(vir_key, vir_value);
    });
  }

  if (query instanceof Object) {
    url += "?" + new URLSearchParams(query).toString();
  }

  return url;
};

/**********************
 * BACKEND API ROUTES *
 **********************/

const BACKEND_API_ROUTE = "/api/v1/";

export const BACKEND_ROUTES = {
  auth: {
    me: { url: "me" },
    login: { method: "POST", url: "login" },
  },

  leads: {
    index: { method: "GET", url: "leads" },
    create: { method: "POST", url: "leads" },
    show: { method: "GET", url: "leads/:lead_id" },
    edit: { method: "PUT", url: "leads/:lead_id" },
    delete: { method: "DELETE", url: "leads/:lead_id" },
  },
};

export const backend_routes = (
  group_name,
  key,
  params = null,
  query = null
) => {
  let url = BACKEND_API_ROUTE;

  url += BACKEND_ROUTES[group_name][key].url;

  if (params instanceof Object) {
    Object.keys(params).map((key) => {
      let vir_key = ":" + key;
      let vir_value = params[key];

      url = url.replace(vir_key, vir_value);
    });
  }

  if (query instanceof Object) {
    url += "?" + new URLSearchParams(query).toString();
  }

  return {
    method: BACKEND_ROUTES[group_name][key].method,
    url,
  };
};

export const backend_routes_url = (
  group_name,
  key,
  params = null,
  query = null
) => {
  return backend_routes(group_name, key, params, query).url;
};

export const backend_routes_method = (
  group_name,
  key,
  params = null,
  query = null
) => {
  return backend_routes(group_name, key, params, query).method;
};
