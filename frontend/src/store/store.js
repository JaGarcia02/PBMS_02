import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import usersReducer from "../features/users/usersSlice";
import userReducer from "../features/user/userSlice";
import brandingReducer from "../features/branding/brandingSlice";
import sectionReducer from "../features/sections/sectionSlice";
import authRoleReducer from "../features/authorizationRole/authRoleSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    user: userReducer,
    branding: brandingReducer,
    sections: sectionReducer,
    authRole: authRoleReducer,
  },
});
