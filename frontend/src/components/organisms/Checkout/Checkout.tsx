import React, { useState } from "react";
import {
  ApplePayIcon,
  GooglePlayIcon,
  PaymentCardIcon,
  PaypalIcon,
} from "../../../assets/svgIcons";
import { createModuleStyleExtractor } from "../../../utils/css";
import styles from "./checkout.module.scss";
const cx = createModuleStyleExtractor(styles);

export function Checkout() {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [rememberPaymentMethod, setRememberPaymentMethod] = useState(false);

  return (
    <div className={cx("checkout-page")}>
      <div className={cx(["wrapper", "main-app-width"])}>
        <div className={cx("content")}>
          <div className={cx("left-side")}>
            <div className={cx("meta")}>
              <div className={cx("title")}>Confirm your purchase</div>
              <div className={cx("text")}>You can now make your purchase</div>
            </div>
            <div className={cx("payment-methods")}>
              <div className={cx("payment-card")}>
                <div
                  className={cx("card-hdr")}
                  onClick={() => {
                    if (selectedPaymentMethod !== "payment-by-card") {
                      setSelectedPaymentMethod("payment-by-card");
                    } else {
                      setSelectedPaymentMethod("");
                    }
                  }}
                >
                  <div className={cx("lit")}>
                    <div
                      className={cx([
                        "checkbox",
                        selectedPaymentMethod === "payment-by-card"
                          ? "active"
                          : "",
                      ])}
                    />
                    <div className={cx("icon-blk")}>
                      <div className={cx("icon")}>
                        <PaymentCardIcon />
                      </div>
                    </div>
                    <div className={cx("lbl")}>Payment by Card</div>
                  </div>
                  <div className={cx("rit")}>
                    <img
                      src={require("../../../assets/images/visa-card.png")}
                      className={cx("card")}
                    />
                    <img
                      src={require("../../../assets/images/discover-card.png")}
                      className={cx("card")}
                    />
                    <img
                      src={require("../../../assets/images/master-card.png")}
                      className={cx("card")}
                    />
                    <img
                      src={require("../../../assets/images/amex-card.png")}
                      className={cx("card")}
                    />
                  </div>
                </div>
                {selectedPaymentMethod === "payment-by-card" && (
                  <div className={cx("card-content")}>
                    <div className={cx("field")}>
                      <input
                        type="text"
                        placeholder="Name on card"
                        className={cx("iput")}
                      />
                    </div>
                    <div className={cx("field")}>
                      <input
                        type="text"
                        placeholder="Card Number"
                        className={cx("iput")}
                      />
                    </div>
                    <div className={cx("row")}>
                      <div className={cx("field")}>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          className={cx("iput")}
                        />
                      </div>
                      <div className={cx("field")}>
                        <input
                          type="text"
                          placeholder="CVV"
                          className={cx("iput")}
                        />
                      </div>
                    </div>
                    <div className={cx("field")}>
                      <div
                        className={cx("remember-blk")}
                        onClick={() =>
                          setRememberPaymentMethod(!rememberPaymentMethod)
                        }
                      >
                        <div
                          className={cx([
                            "checkbox",
                            rememberPaymentMethod ? "active" : "",
                          ])}
                        >
                          <i className="icon-check" />
                        </div>
                        <div className={cx("remember-lbl")}>
                          Remember the card for future payment
                        </div>
                      </div>
                    </div>
                    <div className={cx("field")}>
                      <button className={cx("purchase-btn")}>
                        Complete Purchase
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <div className={cx("payment-card")}>
                <div
                  className={cx("card-hdr")}
                  onClick={() => {
                    if (selectedPaymentMethod !== "apple-pay") {
                      setSelectedPaymentMethod("apple-pay");
                    } else {
                      setSelectedPaymentMethod("");
                    }
                  }}
                >
                  <div className={cx("lit")}>
                    <div
                      className={cx([
                        "checkbox",
                        selectedPaymentMethod === "apple-pay" ? "active" : "",
                      ])}
                    />
                    <div className={cx("icon-blk")}>
                      <div className={cx("icon")}>
                        <ApplePayIcon />
                      </div>
                    </div>

                    <div className={cx("lbl")}>Apple Pay</div>
                  </div>
                </div>
              </div>
              <div className={cx("payment-card")}>
                <div
                  className={cx("card-hdr")}
                  onClick={() => {
                    if (selectedPaymentMethod !== "google-pay") {
                      setSelectedPaymentMethod("google-pay");
                    } else {
                      setSelectedPaymentMethod("");
                    }
                  }}
                >
                  <div className={cx("lit")}>
                    <div
                      className={cx([
                        "checkbox",
                        selectedPaymentMethod === "google-pay" ? "active" : "",
                      ])}
                    />
                    <div className={cx("icon-blk")}>
                      <div className={cx("icon")}>
                        <GooglePlayIcon />
                      </div>
                    </div>

                    <div className={cx("lbl")}>Google Pay</div>
                  </div>
                </div>
              </div>
              <div className={cx("payment-card")}>
                <div
                  className={cx("card-hdr")}
                  onClick={() => {
                    if (selectedPaymentMethod !== "paypal") {
                      setSelectedPaymentMethod("paypal");
                    } else {
                      setSelectedPaymentMethod("");
                    }
                  }}
                >
                  <div className={cx("lit")}>
                    <div
                      className={cx([
                        "checkbox",
                        selectedPaymentMethod === "paypal" ? "active" : "",
                      ])}
                    />
                    <div className={cx("icon-blk")}>
                      <div className={cx(["icon", "paypal"])}>
                        <PaypalIcon />
                      </div>
                    </div>

                    <div className={cx("lbl")}>Paypal</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={cx("right-side")}>
            <div className={cx("meta")}>
              <div className={cx("title")}>Cart</div>
              <div className={cx("text")}>2 Videos</div>
            </div>
            <div className={cx("purchased-list")}>
              <>
                {[{}, {}].map((item, index) => (
                  <div key={index} className={cx("purchased-card")}>
                    <div
                      className={cx("poster")}
                      style={{
                        backgroundImage: `url(${require("../../../assets/images/video-class-poster.png")})`,
                      }}
                    />
                    <div className={cx("card-content")}>
                      <div className={cx("title")}>
                        Creative Watercolor Sketching for Beginners
                      </div>
                      <div className={cx("author")}>by Spaicey</div>
                      <div className={cx("row")}>
                        <div className={cx("price")}>$18.00</div>
                        <button className={cx("edit-button")}>Edit</button>
                      </div>
                    </div>
                  </div>
                ))}
              </>
              <div className={cx("ftr")}>
                <div className={cx("total-btn")}>
                  <div className={cx("lbl")}>Total</div>
                  <div className={cx("value")}>$38.00</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
