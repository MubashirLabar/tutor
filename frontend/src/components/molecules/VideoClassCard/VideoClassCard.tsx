import { PlayIcon } from "../../../assets/svgIcons";
import { Link } from "react-router-dom";

import { createModuleStyleExtractor } from "../../../utils/css";
import styles from "./videoClassCard.module.scss";
const cx = createModuleStyleExtractor(styles);

function VideoClassCard({ data, page }: { data?: any; page?: string }) {
  return (
    <div className={cx(["video-class-card", page === "cart" ? "cart" : ""])}>
      <div className={cx("video-blk")}>
        <video
          muted
          title="Video Preview"
          src={data.video}
          poster={data.poster}
          className={cx("video")}
        />
        <div className={cx("overlay")}>
          <button className={cx("play-btn")}>
            <PlayIcon />
          </button>
        </div>
      </div>
      <div className={cx("meta")}>
        <div className={cx("label")}>{data.label}</div>
        <div className={cx("by")}>{data.author}</div>
        <div className={cx("price")}>{data.price}</div>
      </div>
      <Link to="/video-details" className={cx("ftr")}>
        <button className={cx("add-btn")}>Add To Cart</button>
      </Link>
    </div>
  );
}

export default VideoClassCard;
