import React, { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { useUser } from "../../../hooks/useUser";
import { IAgent } from "../../../types/agents";
import { createPascelCaseName } from "../../../utils/common";
import { createModuleStyleExtractor } from "../../../utils/css";
import styles from "./PublicAgentProfilesItem.module.scss";
const cx = createModuleStyleExtractor(styles);
interface IPublicAgentProfileItem {
  agent: IAgent;
}
const PublicAgentProfileItem: FC<IPublicAgentProfileItem> = ({ agent }) => {
  const { token } = useAuth();
  const user = useUser();

  const [backgroundImage, setBackgroundImage] = useState(
    agent.image_path !== "" ? agent.image_path : "/assets/images/avatar.png"
  );

  useEffect(() => {
    if (user) {
      agent.user_id === user?._id &&
        user.image_path !== "" &&
        setBackgroundImage(user.image_path ?? "/assets/images/profile.png");
    }
  }, [user]);

  return (
    <Link
      to={!token ? `/agents/${agent._id}` : `${agent._id}`}
      className={cx("profile-card")}
    >
      <div className={cx("card-wrap")}>
        <div className={cx("card-hdr")}>
          <div className={cx("left")}>
            <div className={cx("agent-image")}>
              <div
                className={cx("image")}
                style={{ backgroundImage: `url(${backgroundImage})` }}
              />
              <div className={cx("online-dot")} />
            </div>
            <div className={cx("meta")}>
              <div className={cx("name")}>
                {agent.first_name + " " + agent.last_name}
              </div>
              <div className={cx("work-type")}>Writer</div>
              <div className={cx("from")}>
                Texas,{" "}
                {agent.location &&
                  agent.location.country &&
                  createPascelCaseName(agent.location.country)}{" "}
                USA{" "}
              </div>
            </div>
          </div>
          <div className={cx("right")}>
            <div className={cx("stamp")}>
              $40.00/<span>hr</span>
            </div>
            <div className={cx("stamp")}>
              $12,900 <span>earned</span>
            </div>
          </div>
        </div>
        <div className={cx("description")}>
          I am an aesthetic professional User Experience and User Interface
          designer with 5+ years of experience in the relevant field. I use all
          my expert skills to create unique products that connect brands and
          companies with their customers. I can help you with your website,
          web/desktop apps and mobile apps design.
        </div>
      </div>
    </Link>
  );
};
export const PublicAgentProfileItemMemo = React.memo(PublicAgentProfileItem);
