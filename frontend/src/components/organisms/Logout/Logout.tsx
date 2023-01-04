import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { removeLocalStorageToken } from "../../../services/token.service";
import { useDispatch } from "../../../stores/rootReducer";
import { doLogoutUser } from "../../../stores/users";
const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(doLogoutUser());
    removeLocalStorageToken();
    navigate("/", { replace: true });
  });
  return <></>;
};

export default Logout;
