import { createModuleStyleExtractor } from "../../../utils/css";
import styles from "./media.module.scss";
const cx = createModuleStyleExtractor(styles);

function Media() {
  const mediaList = [
    { media: "assets/images/Media1.svg" },
    { media: "assets/images/Media2.svg" },
    { media: "assets/images/Media3.svg" },
    { media: "assets/images/Media4.svg" },
    { media: "assets/images/Media5.svg" },
    { media: "assets/images/Media6.svg" },
  ];

  return (
    <div className={cx("media-section")}>
      <div className={cx(["wrapper", "main-app-width"])}>
        <div className={cx("content")}>
          <div className={cx("title")}>Media</div>
          <div className={cx("media-list")}>
            {mediaList.map((item, index) => (
              <img
                key={index}
                src={item.media}
                className={cx("media")}
                alt=""
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Media;
