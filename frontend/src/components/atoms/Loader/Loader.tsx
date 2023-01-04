import { createModuleStyleExtractor } from "../../../utils/css";
import { SpinnerVolume } from "../SpinnerVolume/SpinnerVolume";
import styles from "./Loader.module.scss";
const cx = createModuleStyleExtractor(styles);
export const Loader = () => {
  return (
    <div className={cx("loading-container")}>
      <SpinnerVolume />
    </div>
  );
};
