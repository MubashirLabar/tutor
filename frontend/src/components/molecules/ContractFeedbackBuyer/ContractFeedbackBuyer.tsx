import React, { useState } from "react";

import { createModuleStyleExtractor } from "../../../utils/css";
import styles from "./ContractFeedbackBuyer.module.scss";
import { Modal } from "../../atoms/Modal";
import { StarIcon } from "../../../assets/svgIcons";

const cx = createModuleStyleExtractor(styles);

export function ContractFeedbackBuyer() {
  const [feedbackStatus, setFeedbackStatus] = useState("pending");
  const [provideFeedbackModal, setProvideFeedbackModal] = useState(false);

  const closeProvidedFeedbackModal = () => {
    setProvideFeedbackModal(false);
  };

  return (
    <div className={cx("feedback-section")}>
      {/* Contract not Eligible for Feedback */}
      {feedbackStatus === "not-eligible" && (
        <div className={cx("not-eligible-blk")}>
          <div className={cx("title")}>
            This contract is not yet eligible for feedback
          </div>
          <div className={cx("text")}>
            You can request feedback on active contracts with payments beginning
            30 days after the contract started. The feedback will appear on your
            profile
          </div>
        </div>
      )}

      {/* Feedback Pending */}
      {feedbackStatus === "pending" && (
        <div className={cx("feedback-pending")}>
          <div className={cx("block")}>
            <div className={cx("left")}>
              <div className={cx("title")}>Client’s Feedback to You</div>
              <div className={cx("stars")}>
                {[1, 2, 3, 4, 5].map((item, index) => (
                  <div key={index.toString()} className={cx("star")}>
                    <StarIcon />
                  </div>
                ))}
              </div>
            </div>
            <div className={cx("right")}>
              <div className={cx("title")}>Your Feedback to Client</div>
              <button
                className={cx("place-feedback-btn")}
                onClick={() => setProvideFeedbackModal(true)}
              >
                Give Feedback to Client
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Provide Feedback */}
      <Modal open={provideFeedbackModal} onClose={closeProvidedFeedbackModal}>
        <div className={cx("provide-feedback-modal")}>
          <div className={cx("modal-hdr")}>
            <div className={cx("modal-title")}>Provide Feedback</div>
            <div
              className={cx("modal-cross-btn")}
              onClick={closeProvidedFeedbackModal}
            >
              &times;
            </div>
          </div>
          <div className={cx("modal-content")}>
            <div className={cx("title")}>Feedback to Client</div>
            <div className={cx("feedbacks")}>
              <div className={cx("item")}>
                <div className={cx("stars")}>
                  {[1, 2, 3, 4, 5].map((item, index) => (
                    <div key={index.toString()} className={cx("star")}>
                      <StarIcon />
                    </div>
                  ))}
                </div>
                <div className={cx("label")}>Skills</div>
              </div>
              <div className={cx("item")}>
                <div className={cx("stars")}>
                  {[1, 2, 3, 4, 5].map((item, index) => (
                    <div key={index.toString()} className={cx("star")}>
                      <StarIcon />
                    </div>
                  ))}
                </div>
                <div className={cx("label")}>Quality of Work</div>
              </div>
              <div className={cx("item")}>
                <div className={cx("stars")}>
                  {[1, 2, 3, 4, 5].map((item, index) => (
                    <div key={index.toString()} className={cx("star")}>
                      <StarIcon />
                    </div>
                  ))}
                </div>
                <div className={cx("label")}>Availability</div>
              </div>
              <div className={cx("item")}>
                <div className={cx("stars")}>
                  {[1, 2, 3, 4, 5].map((item, index) => (
                    <div key={index.toString()} className={cx("star")}>
                      <StarIcon />
                    </div>
                  ))}
                </div>
                <div className={cx("label")}>Adherence to Schedule</div>
              </div>
              <div className={cx("item")}>
                <div className={cx("stars")}>
                  {[1, 2, 3, 4, 5].map((item, index) => (
                    <div key={index.toString()} className={cx("star")}>
                      <StarIcon />
                    </div>
                  ))}
                </div>
                <div className={cx("label")}>Communication</div>
              </div>
              <div className={cx("item")}>
                <div className={cx("stars")}>
                  {[1, 2, 3, 4, 5].map((item, index) => (
                    <div key={index.toString()} className={cx("star")}>
                      <StarIcon />
                    </div>
                  ))}
                </div>
                <div className={cx("label")}>Cooperation</div>
              </div>
            </div>
            <div className={cx("total-score")}>
              Total Score: <span>0.00</span>
            </div>
            <div className={cx("field")}>
              <div className={cx("lbl")}>
                Share your experience with this client to Readme community
              </div>
              <textarea className={cx(["iput", "area"])} />
            </div>
            <div className={cx("actions")}>
              <button className={cx("action")}>Submit Feedback</button>
              <button
                className={cx(["action", "transparent"])}
                onClick={closeProvidedFeedbackModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </Modal>

      {/* Feedback List */}
      {feedbackStatus === "feedbacks-list" && (
        <div className={cx("feedbacks-list")}>
          <div className={cx("block")}>
            <div className={cx("left")}>
              <div className={cx("title")}>Client’s Feedback to You</div>
              <div className={cx("stars")}>
                {[1, 2, 3, 4, 5].map((item, index) => (
                  <div key={index.toString()} className={cx("star")}>
                    <StarIcon />
                  </div>
                ))}
              </div>
            </div>
            <div className={cx("right")}>
              <div className={cx("title")}>Your Feedback to Client</div>
              <div className={cx("stars")}>
                {[1, 2, 3, 4, 5].map((item, index) => (
                  <div key={index.toString()} className={cx("star")}>
                    <StarIcon />
                  </div>
                ))}
              </div>
              <div className={cx("me-res")}>
                <div className={cx("text")}>
                  Really Excited experince with him
                </div>
              </div>

              <div className={cx("client-res")}>
                <div className={cx("text")}>
                  <span className={cx(["text", "bold"])}>Client Response:</span>
                  &nbsp;Of course, you must provide your feedback as quickly as
                  possible. However, do not contact your client on the spur of
                  the moment. Take a moment to think about what you are going to
                  communicate to your client, and also to consider how you are
                  going to express yourself
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
