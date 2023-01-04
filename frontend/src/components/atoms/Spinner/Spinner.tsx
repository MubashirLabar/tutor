// import { createModuleStyleExtractor } from "../../../utils/css";
// import styles from "./spinner.module.scss";
// const cx = createModuleStyleExtractor(styles);
import "./spinner.scss";

const Spinner = () => {
  return (
    <div className="spinner-loader spinner">
      <div className="spinner-icon"></div>
    </div>
  );
};

export default Spinner;
