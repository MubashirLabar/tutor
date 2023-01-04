import { createModuleStyleExtractor } from "../../../utils/css";
import styles from "./moment.module.scss";
const cx = createModuleStyleExtractor(styles);

function Moment() {
  const momentSteps = [
    {
      title: "Title 1",
      btn: "Learn More",
      link: "/",
      image: "/assets/images/home-moment-1.svg",
    },
    {
      title: "Title 2",
      btn: "Learn More",
      link: "/",
      image: "/assets/images/home-moment-2.svg",
    },
    {
      title: "Title 3",
      btn: "Learn More",
      link: "/",
      image: "/assets/images/home-moment-3.svg",
    },
    {
      title: "Title 4",
      btn: "Learn More",
      link: "/",
      image: "/assets/images/home-moment-4.svg",
    },
  ];

  return (
    <div className={cx("moment-section")}>
      <div className={cx(["wrapper", "main-app-width"])}>
        <div className={cx("content")}>
          <div className={cx("hdr")}>
            <div className={cx("title")}>Here For Every Moment</div>
            <div className={cx("text")}>
              Explore some of our best tools & get 24/7 support for your
              asssignments
            </div>
          </div>
          <div className={cx("moment-steps")}>
            {momentSteps.map((item, index) => (
              <div key={index} className={cx("block")}>
                <img src={item.image} className={cx("image")} />
                <div className={cx("meta")}>
                  <div className={cx("label")}>{item.title}</div>
                  <div className={cx("btn")}>{item.btn}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Moment;
