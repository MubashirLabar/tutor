import React, { useState, FC, useEffect } from "react";
// import { useDispatch } from "react-redux";

import { createModuleStyleExtractor } from "../../../utils/css";
import styles from "./StarRating.module.scss";
const cx = createModuleStyleExtractor(styles);

const StarRating = () => {
  return <div className={cx("star-rating")}>Rating...</div>;
};

export default StarRating;
