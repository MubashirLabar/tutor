import React, { useState } from "react";
import { DeleteIcon } from "../../../assets/svgIcons";
import { createModuleStyleExtractor } from "../../../utils/css";
import styles from "./cart.module.scss";
const cx = createModuleStyleExtractor(styles);
import VideoClassCard from "../../molecules/VideoClassCard/VideoClassCard";
import { Link } from "react-router-dom";

export function Cart() {
  const [videosList, setVideosList] = useState([
    {
      label: "Creative Watercolor Sketching for Beginners",
      video: "",
      poster: require("../../../assets/images/video-class-poster.png"),
      author: "by Grace Jumbor",
      price: "$16.00",
    },
    {
      label: "Creative Watercolor Sketching for Beginners",
      video: "",
      poster: require("../../../assets/images/video-class-poster.png"),
      author: "by Grace Jumbor",
      price: "$16.00",
    },
    {
      label:
        "Creative Watercolor Sketching for Beginners. Creative Watercolor Sketching for Beginners",
      video: "",
      poster: require("../../../assets/images/video-class-poster.png"),
      author: "by Grace Jumbor",
      price: "$16.00",
    },
    {
      label: "Creative Watercolor Sketching for Beginners",
      video: "",
      poster: require("../../../assets/images/video-class-poster.png"),
      author: "by Grace Jumbor",
      price: "$16.00",
    },
  ]);

  return (
    <div className={cx("cart-page")}>
      <div className={cx(["wrapper", "main-app-width"])}>
        <div className={cx("content")}>
          <div className={cx("page-hdr")}>
            <div className={cx("page-title")}>Your Cart</div>
            <div className={cx("total-videos")}>1 Video in cart</div>
          </div>
          <div className={cx("cart-items")}>
            {[{}, {}].map((item, index) => (
              <div key={index} className={cx("cart-item")}>
                <div
                  className={cx("poster")}
                  style={{
                    backgroundImage: `url(${require("../../../assets/images/video-class-poster.png")})`,
                  }}
                />
                <div className={cx("cart-item-content")}>
                  <div className={cx("row")}>
                    <div className={cx("lit")}>
                      <div className={cx("meta")}>
                        <div className={cx("label")}>
                          Creative Watercolor Sketching for Beginners
                        </div>
                        <div className={cx("author")}>by Spaicey</div>
                      </div>
                    </div>
                    <div className={cx("rit")}>
                      <div className={cx("price")}>12,10 €</div>
                    </div>
                  </div>
                  <div className={cx(["row", "actions"])}>
                    <div className={cx("lit")}>
                      <div className={cx("del-btn")}>
                        <div className={cx("icon")}>
                          <DeleteIcon />
                        </div>
                        <div className={cx("lbl")}>Remove</div>
                      </div>
                    </div>
                    <div className={cx("rit")}>
                      <Link to="/checkout" className={cx("checkout-btn")}>
                        Checkout
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* More Videos section */}
          <div className={cx("more-videos-section")}>
            <div className={cx("title")}>More Videos for you</div>
            <div className={cx("videos-list")}>
              {videosList.map((item, index) => (
                <VideoClassCard key={index} data={item} page="cart" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
