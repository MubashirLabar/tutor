import React from "react";
import { createModuleStyleExtractor } from "../../../utils/css";

import styles from "./SpinnerVolume.module.scss";
const cx = createModuleStyleExtractor(styles);

export const SpinnerVolume = () => {
  return (
    <div className={cx("spinner-volume")}>
      <div className={cx("sp-volume")}></div>
    </div>
  );
};
