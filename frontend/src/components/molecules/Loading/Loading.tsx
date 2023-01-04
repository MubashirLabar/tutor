import React from "react";
import { createModuleStyleExtractor } from "../../../utils/css";
import styles from "./Loading.module.scss";
const cx = createModuleStyleExtractor(styles);
export const Loading = () => {
  return (
    <div
      className={cx("loading-container")}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img src="/assets/images/spinner.gif" alt="Loading...." />
    </div>
  );
};
