import React from "react";
import { useSelector } from "react-redux";
import jwt from "jwt-decode";

export function useAdd() {
  const { user } = useSelector((state) => state.user);
  const decodedToken = jwt(user);
  const { authRole } = useSelector((state) => state.authRole);

  const authorizedByAdd = authRole
    .filter((role) => role.admin_authNumberRole == decodedToken?.role)
    .some((checkRole) => checkRole.admin_add === 1);
  return authorizedByAdd;
}

export function useEdit() {
  const { user } = useSelector((state) => state.user);
  const decodedToken = jwt(user);
  const { authRole } = useSelector((state) => state.authRole);

  const authorizedByEdit = authRole
    .filter((role) => role.admin_authNumberRole == decodedToken?.role)
    .some((checkRole) => checkRole.admin_edit === 1);
  return authorizedByEdit;
}

export function usePrint() {
  const { user } = useSelector((state) => state.user);
  const decodedToken = jwt(user);
  const { authRole } = useSelector((state) => state.authRole);

  const authorizedByPrint = authRole
    .filter((role) => role.admin_authNumberRole == decodedToken?.role)
    .some((checkRole) => checkRole.admin_edit === 1);
  return authorizedByPrint;
}

export function useVoid() {
  const { user } = useSelector((state) => state.user);
  const decodedToken = jwt(user);
  const { authRole } = useSelector((state) => state.authRole);

  const authorizedByVoid = authRole
    .filter((role) => role.admin_authNumberRole == decodedToken?.role)
    .some((checkRole) => checkRole.admin_void === 1);
  return authorizedByVoid;
}

export function useDelete() {
  const { user } = useSelector((state) => state.user);
  const decodedToken = jwt(user);
  const { authRole } = useSelector((state) => state.authRole);

  const authorizedByDelete = authRole
    .filter((role) => role.admin_authNumberRole == decodedToken?.role)
    .some((checkRole) => checkRole.admin_delete === 1);
  return authorizedByDelete;
}
