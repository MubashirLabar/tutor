import { createModuleStyleExtractor } from "../../../utils/css";
import styles from "./studyTime.module.scss";
const cx = createModuleStyleExtractor(styles);

function StudyTime() {
  const studySteps = [
    {
      title: "Free Ebooks for all classes",
      btn: "Learn More",
      link: "/",
      image: "/assets/images/studytime.png",
    },
    {
      title: "24/7 Counceling Service",
      btn: "Learn More",
      link: "/",
      image: "/assets/images/studytime1.png",
    },
    {
      title: "Escrow Service Secure your Payment",
      btn: "Learn More",
      link: "/",
      image: "/assets/images/studytime2.png",
    },
  ];

  return (
    <div className={cx("study-time-section")}>
      <div className={cx(["wrapper", "main-app-width"])}>
        <div className={cx("content")}>
          <div className={cx("hdr")}>
            <div className={cx("title")}>Study time, Crunch time, Anytime</div>
            <div className={cx("text")}>
              Explore some of our best tools & get 24/7 support for your
              asssignments
            </div>
          </div>
          <div className={cx("study-steps")}>
            {studySteps.map((item, index) => (
              <div key={index} className={cx("block")}>
                <div
                  className={cx("image")}
                  style={{ backgroundImage: `url(${item.image})` }}
                />
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

export default StudyTime;
