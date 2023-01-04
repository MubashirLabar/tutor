import React, { FC, useEffect, useState } from "react";

import { IAlert } from "../../../types/alert";

import { ILoginRequest, IRegistration } from "../../../types/context/auth";
import { createModuleStyleExtractor } from "../../../utils/css";
import { Input } from "../../atoms/Input";
import { Loading } from "../../molecules/Loading/Loading";
import styles from "./ForgotPassword.module.scss";

const cx = createModuleStyleExtractor(styles);
interface IForgotPassword {
  onNotification: (alert: IAlert) => void;
  enableNotification?: boolean;
}
const ForgotPassword: FC<IForgotPassword> = ({
  onNotification,
  enableNotification = true,
}) => {
  return (
    <>
      <div className={cx("auth-container")}>
        <h2 className={cx("auth-container-heading")}>{"Reset Password"}</h2>

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
              onChange={(value: string, name: string) =>
                console.log(name, value)
              }
              placeholder="Password"
            />
          </div>

          <div className={cx(["auth-container__row"])}>
            <button type="submit" className={cx("signup")}>
              {"Send Verification"}
            </button>
          </div>
        </form>

        <p className={cx(["content-center", "action-already"])}>
          {"Dont have account ? "}
          <button type="button" className={cx("login")}>
            {"Register"}
          </button>
        </p>

        {/* facebook login */}
      </div>
    </>
  );
};
export default ForgotPassword;
