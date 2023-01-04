import { createModuleStyleExtractor } from "../../../utils/css";
import styles from "./team.module.scss";
const cx = createModuleStyleExtractor(styles);

function Team() {
  const teamSteps = [
    {
      label: "Free Ebooks",
      image: "/assets/images/home-team-1.svg",
    },
    {
      label: "24/7 Home work Help",
      image: "/assets/images/home-team-2.svg",
    },
    {
      label: "24/7 Free College conseling",
      image: "/assets/images/home-team-3.svg",
    },
  ];

  return (
    <div className={cx("team-section")}>
      <div className={cx(["wrapper", "main-app-width"])}>
        <div className={cx("slogn")}>Get Things Done by Awesome Team</div>
        <div className={cx("team-steps")}>
          {teamSteps.map((item, index) => (
            <div key={index} className={cx("block")}>
              <div className={cx("label")}>{item.label}</div>
              <img src={item.image} className={cx("image")} />
            </div>
          ))}
        </div>
      </div>
      <div className={cx(["left-circle", "circle"])} />
      <div className={cx(["right-circle", "circle"])} />
    </div>
  );
}

export default Team;
