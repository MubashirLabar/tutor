import React, { FC, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";

import { useDispatch, useSelector } from "../../../stores/rootReducer";
import {
  doChangePassowrd,
  FetchResetPasswordResponse,
} from "../../../stores/users";
import { IAlert } from "../../../types/alert";
import { createModuleStyleExtractor } from "../../../utils/css";
import { Input } from "../../atoms/Input";

import styles from "./ResetPassword.module.scss";
const cx = createModuleStyleExtractor(styles);
interface IResetPassword {
  onNotification: (alert: IAlert) => void;
  enableNotification?: boolean;
}
const ResetPasword: FC<IResetPassword> = ({
  onNotification,
  enableNotification = true,
}) => {
  const navigate = useNavigate();
  const { token } = useAuth();
  const redirectTo = (href: string) => navigate(href, { replace: true });
  const [params] = useSearchParams();
  const resetPasswordResponse = useSelector(FetchResetPasswordResponse);

  const [password, setPassword] = useState({
    password: "",
    cpassword: "",
  });

  const dispatch = useDispatch();

  const updateState = (key: string, value: string) => {
    setPassword({
      ...password,
      [key]: value,
    });
  };

  const onSubmit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    if (
      !password.cpassword ||
      !password.password ||
      password.password.trim() === "" ||
      password.cpassword.trim() === ""
    ) {
      return onNotification({
        message: "Password fields are required",
        type: "DANGER",
        active: true,
      });
    }

    if (password.password !== password.cpassword) {
      return onNotification({
        message: "Passwords not matched",
        type: "DANGER",
        active: true,
      });
    }

    if (params) {
      const token = params.get("token");
      const id = params.get("id");
      const source = params.get("source");
      console.log(source);
      console.log(token);
      console.log(id);

      if (token && id && source) {
        dispatch(
          doChangePassowrd({
            token,
            id,
            password: password.password,
            ...(source && { source }),
          })
        );

        return;
      }
      return onNotification({
        message: "Token is Missing, Please Try again",
        type: "DANGER",
        active: true,
      });
    }
    return onNotification({
      message: "Token is Missing, Please Try again",
      type: "DANGER",
      active: true,
    });
  };

  useEffect(() => {
    if (resetPasswordResponse && resetPasswordResponse.status === "SUCCESS") {
      setPassword({ password: "", cpassword: "" });
      redirectTo("/auth?action=login");
    }
  }, [resetPasswordResponse]);

  if (token) {
    navigate("/dashboard", { replace: true });
  }
  return (
    <>
      <div className={cx("auth-container")}>
        <h2 className={cx("auth-container-heading")}>
          {"Change Your Password"}
        </h2>

        <form>
          <div className={cx(["auth-container__row"])}>
            <label className={cx("auth-input-label")} htmlFor="password">
              Password
              <span className={cx("required-label")}>*</span>
            </label>

            <Input
              type="password"
              id="password"
              name="password"
              className={"a-auth-input"}
              value={password.password}
              onChange={(value: string, name: string) =>
                updateState(name, value)
              }
              placeholder="Password"
            />
          </div>

          <div className={cx(["auth-container__row"])}>
            <label className={cx("auth-input-label")} htmlFor="password">
              Confirm Password
              <span className={cx("required-label")}>*</span>
            </label>

            <Input
              type="password"
              id="cpassword"
              name="cpassword"
              value={password.cpassword}
              className={"a-auth-input"}
              onChange={(value: string, name: string) =>
                updateState(name, value)
              }
              placeholder="Confirm Password"
            />
          </div>

          <br />
          <div className={cx(["auth-container__row"])}>
            <button type="submit" className={cx("signup")} onClick={onSubmit}>
              {"Reset Password"}
            </button>
          </div>
        </form>

        <p className={cx(["content-center", "action-already"])}>
          {"Already have an account ? "}
          <button
            type="button"
            className={cx("login")}
            onClick={() => redirectTo("/auth")}
          >
            {"Login"}
          </button>
        </p>
        <div className={cx("divider")}>
          <span className={cx("divider-line")}></span>
          <span className={cx("divider-or")}>Or</span>
          <span className={cx("divider-line")}></span>
        </div>

        {/* facebook login */}

        {/* <button className={cx("button-signup-facebook")}>
          <img src="/assets/images/facebook.svg" />
          Sign up with Facebook
        </button>
        {/* facebook login end */}

        <button
          className={cx("button-signup-google")}
          onClick={() => redirectTo("/auth")}
        >
          {" "}
          Sign up{" "}
        </button>
      </div>
    </>
  );
};

export default ResetPasword;
