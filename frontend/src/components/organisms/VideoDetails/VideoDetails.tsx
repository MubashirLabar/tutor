import React, { useState } from "react";
import { CartIcon, PlayIcon, TimeIcon } from "../../../assets/svgIcons";
import { createModuleStyleExtractor } from "../../../utils/css";
import styles from "./videoDetails.module.scss";
const cx = createModuleStyleExtractor(styles);
import { Link } from "react-router-dom";

export function VideoDetails() {
  const [plans, setPlans] = useState([
    {
      title: "Basic Plan",
      points: [
        { label: "View all PPT" },
        { label: "Assign with VA" },
        { label: "Unlimited Question" },
      ],
    },
    {
      title: "Gold plan",
      points: [
        { label: "View all PPT" },
        { label: "Assign with Tutor 24/7" },
        { label: "Unlimited Question" },
      ],
    },
  ]);

  return (
    <div className={cx("video-details-page")}>
      <div className={cx("page-hdr")}>
        <div className={cx(["wrap", "main-app-width"])}>
          <div
            className={cx("txt")}
          >{`Humanities > ACT English > Creative Watercolor Sketching for Beginners`}</div>
        </div>
      </div>
      <div className={cx(["wrapper", "main-app-width"])}>
        <div className={cx("content")}>
          <div className={cx("left-side")}>
            <div className={cx("title")}>
              Creative Watercolor Sketching for Beginners
            </div>
            <div className={cx("author")}>by Grace Jumbor</div>
            <div className={cx("meta-section")}>
              <div className={cx("block")}>
                <div className={cx("icon")}>
                  <TimeIcon />
                </div>
                <div className={cx("lbl")}>Estimated 50 Min</div>
              </div>
              <div className={cx("block")}>
                <div className={cx("icon")}>
                  <CartIcon />
                </div>
                <div className={cx("lbl")}>1209 Student Purchased</div>
              </div>
            </div>
            <div className={cx("plan-section")}>
              {plans.map((plan, index) => (
                <div key={index} className={cx("plan-blk")}>
                  <div className={cx("tit")}>{plan.title}</div>
                  <div className={cx("list")}>
                    {plan.points.map((point, idx) => (
                      <div key={idx} className={cx("itm")}>
                        <div className={cx("icon")}>
                          <i className="icon-check" />
                        </div>
                        <div className={cx("lbl")}>{point.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className={cx("right-side")}>
            <div className={cx("video-blk")}>
              <video
                muted
                title="Video Preview"
                src=""
                poster={require("../../../assets/images/video-class-poster.png")}
                className={cx("video")}
              />
              <div className={cx("overlay")}>
                <button className={cx("play-btn")}>
                  <PlayIcon />
                </button>
              </div>
            </div>
            <div className={cx("prices")}>
              <div className={cx("price")}>$20</div>
              <div className={cx("origin")}>$199</div>
            </div>
            <div className={cx("actions")}>
              <button className={cx("action-btn")}>Order Now</button>
              <Link to="/cart" className={cx(["action-btn", "transparent"])}>
                Go to Cart
              </Link>
            </div>
            <div className={cx("support-blk")}>
              <div className={cx("label")}>Don’t find any videos? </div>
              <div className={cx("txt")}>
                We are here for you to choose your videos
              </div>
              <button className={cx("support-btn")}>Try Support</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
