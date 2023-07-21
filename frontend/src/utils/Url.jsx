export const API_URL_ADMIN =
  import.meta.env.VITE_BUILD === "DEV"
    ? "/server" + "/api/admin/"
    : "/api/admin/";

export const API_URL_USER =
  import.meta.env.VITE_BUILD === "DEV"
    ? "/server" + "/api/users/"
    : "/api/users/";

export const API_URL_HR =
  import.meta.env.VITE_BUILD === "DEV" ? "/server" + "/api/hr/" : "/api/hr/";

export const API_URL_SYSTEM =
  import.meta.env.VITE_BUILD === "DEV"
    ? "/server" + "/api/system/"
    : "/api/system/";

export const API_URL_FORMS =
  import.meta.env.VITE_BUILD === "DEV"
    ? "/server" + "/api/form/"
    : "/api/form/";

export const API_URL = import.meta.env.VITE_BUILD === "DEV" ? "/server" : "";
