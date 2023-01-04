import React from "react";
import { Link } from "react-router-dom";
import { createModuleStyleExtractor } from "../../../utils/css";
import styles from "./OrderPlacedSuccessfully.module.scss";
const cx = createModuleStyleExtractor(styles);

export function OrderPlacedSuccessfully() {
  return (
    <div className={cx("successfully-page")}>
      <div className={cx(["wrapper", "main-app-width"])}>
        <div className={cx("slogn")}>Your question has been successfully</div>
        <div className={cx("text")}>
          Go to this link, you tutor and agent will chat soon with you
        </div>
        <Link
          to="https://www.readmore.group2"
          target="_blank"
          className={cx("chat-link")}
        >
          https://www.readmore.group2
        </Link>
      </div>
      <div className={cx(["left-circle", "circle"])} />
      <div className={cx(["right-circle", "circle"])} />
    </div>
  );
}
