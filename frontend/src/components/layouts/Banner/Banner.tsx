import React from "react";
import { createModuleStyleExtractor } from "../../../utils/css";
import styles from "./Banner.module.scss";
const cx = createModuleStyleExtractor(styles);

export function Banner() {
  return (
    <div className={cx("banner-section")}>
      <div className={cx(["wrapper", "main-app-width"])}>
        <div className={cx("slogn")}>You have Projects, We Deliver Answers</div>
        <div className={cx("text")}>
          Post them now, meet your deadline, get 80%+ or refund
        </div>
      </div>
      <div className={cx(["left-circle", "circle"])} />
      <div className={cx(["right-circle", "circle"])} />
    </div>
  );
}
