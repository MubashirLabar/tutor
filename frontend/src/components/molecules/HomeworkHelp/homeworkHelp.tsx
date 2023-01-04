import { createModuleStyleExtractor } from "../../../utils/css";
import styles from "./homeworkHelp.module.scss";
const cx = createModuleStyleExtractor(styles);

function homeworkHelp() {
  const workSteps = [
    {
      title: "Expert Tutor",
      text: "Get personalized help from subject matter experts",
      image: "/assets/images/home-work-1.svg",
    },
    {
      title: "Step by Step Explanations",
      text: "We break it down for you",
      image: "/assets/images/home-work-2.svg",
    },
    {
      title: "Fast Answers",
      text: "We’ll get you unstuck in as few as 10 minutes",
      image: "/assets/images/home-work-3.svg",
    },
  ];

  return (
    <div className={cx("homework-help-section")}>
      <div className={cx(["wrapper", "main-app-width"])}>
        <div className={cx("content")}>
          <div className={cx("hdr")}>
            <div className={cx("title")}>24/7 Homework Help</div>
            <div className={cx("text")}>
              Explore some of our best tools & get 24/7 support for your
              asssignments
            </div>
          </div>
          <div className={cx("work-steps")}>
            {workSteps.map((item, index) => (
              <div key={index} className={cx("block")}>
                <img src={item.image} className={cx("image")} />
                <div className={cx("meta")}>
                  <div className={cx("label")}>{item.title}</div>
                  <div className={cx("txt")}>{item.text}</div>
                </div>
              </div>
            ))}
          </div>
          <div className={cx("ftr")}>
            <button className={cx("button")}>Get Homework Help</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default homeworkHelp;
