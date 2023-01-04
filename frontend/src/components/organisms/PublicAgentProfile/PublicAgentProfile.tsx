import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAgent } from "../../../hooks/useAgent";
import { useAuth } from "../../../hooks/useAuth";

import { createPascelCaseName } from "../../../utils/common";
import { createModuleStyleExtractor } from "../../../utils/css";
import SingleChatModal from "../../organisms/Messenger/single-chat-modal";
import styles from "./PublicAgentProfile.module.scss";
const cx = createModuleStyleExtractor(styles);
export const PublicAgentProfile = () => {
  const { id } = useParams();
  const { token } = useAuth();
  const { agent } = useAgent(`${id}`);
  const [active, setIsActive] = useState(true);
  const [singleChatModal, toggleSingleChatModal] = useState<boolean>(false);
  const navigate = useNavigate();

  const redirectForChat = () => {
    token
      ? toggleSingleChatModal(!singleChatModal)
      : navigate(
          `/auth?agent_id=${agent._id}&referral_code=${
            agent.referral_code
          }&redirect_uri=${`/dashboard/agents/${agent._id}`}`
        );
  };
  return (
    <div>
      {agent ? (
        id && (
          <div className={cx("agent-profile")}>
            {token ? (
              <>
                <SingleChatModal
                  recepient={{
                    label: createPascelCaseName(
                      `${agent.first_name + " " + agent.last_name}`
                    ),
                    value: agent.user_id,
                  }}
                  visible={singleChatModal}
                  hideSingleChatModal={() => toggleSingleChatModal(false)}
                />
                {/* <button
                  onClick={() => {
                    toggleSingleChatModal(!singleChatModal);
                  }}
                  className={cx("agent-invite-button")}
                >
                  Chat
                </button> */}
              </>
            ) : (
              <a
                href={`/auth?refer_type=${"agents"}&refer_id=${id}&agent_id=${id}&referral_code=${
                  agent.referral_code
                }`}
              >
                <button className={cx("profile-btn__chat")}>Login</button>
              </a>
            )}
            <div className={cx("agent-profile-container")}>
              <div className={cx("agent-profile-wrapper")}>
                <div className={cx("profile-detail")}>
                  <div className={cx("profile-detail__content")}>
                    <div className={cx("profile-detail__img")}>
                      <img src={"/assets/images/profile.jpg"} alt="" />
                      <img
                        className={cx("ative-profile")}
                        src={"/assets/images/active.svg"}
                        alt=""
                      />
                    </div>
                    <div className={cx("profile-detail__disc")}>
                      <h5>
                        {" "}
                        {createPascelCaseName(
                          agent.first_name + " " + agent.last_name
                        )}
                      </h5>
                      <p>Texas, Austin USA - 10:00 am local time</p>
                    </div>
                  </div>
                  <div className={cx([`profile-btn`, `${"active"}`])}>
                    <button
                      className={cx("profile-btn__chat")}
                      onClick={redirectForChat}
                    >
                      Chat
                    </button>
                    <button className={cx("profile-btn__hire")}>Hire</button>
                  </div>
                </div>
                <div className={cx("work-history-sec")}>
                  <h3 className={cx("work-history-title")}>Work History</h3>
                  <ul className={cx("work-history-tabs")}>
                    <li
                      className={cx(active ? "active" : "")}
                      onClick={() => setIsActive(true)}
                    >
                      Completed Jobs (4)
                    </li>
                    <li
                      className={cx(!active ? "active" : "")}
                      onClick={() => setIsActive(false)}
                    >
                      In progress (2)
                    </li>
                  </ul>
                  {active && (
                    <div
                      className={cx([
                        `completed-jobs-tabs`,
                        `${active ? "active" : ""}`,
                      ])}
                    >
                      <div className={cx("Jobs-details")}>
                        <h3 className={cx("Jobs-details__title")}>
                          Graduate School
                        </h3>
                        <div className={cx("Jobs-details__review")}>
                          <ul>
                            {[1, 2, 3, 4, 5].map((item, index) => (
                              <li key={index.toString()}>
                                <FontAwesomeIcon
                                  icon={faStar}
                                  color="#eb595b"
                                />
                              </li>
                            ))}
                          </ul>
                          <span>5.00</span>
                          <p>Feb 02,2022</p>
                        </div>
                        <p className="Jobs-details__info">
                          This is my second time working with him and once again
                          he delivered what I asked in a timely manor. I am once
                          again happy with the product he delivered and would
                          definitely be working with him again in the future and
                          would recommend him.
                        </p>
                        <div className="Jobs-details__earnings">
                          Private Earnings
                        </div>
                      </div>
                    </div>
                  )}

                  {!active && (
                    <div
                      className={cx(
                        `progress-jobs-tabs ${!active ? "active" : ""}`
                      )}
                    >
                      <div className={cx("Jobs-details")}>
                        <h3 className={cx("Jobs-details__title")}>
                          Graduate School
                        </h3>
                        <div className={cx("Jobs-details__review")}>
                          <ul>
                            {[1, 2, 3, 4, 5].map((item, index) => (
                              <li key={index.toString()}>
                                <FontAwesomeIcon
                                  icon={faStar}
                                  color="#eb595b"
                                />
                              </li>
                            ))}
                          </ul>
                          <span>5.00</span>
                          <p>Feb 02,2022</p>
                        </div>
                        <p className="Jobs-details__info">
                          This is my second time working with him and once again
                          he delivered what I asked in a timely manor. I am once
                          again happy with the product he delivered and would
                          definitely be working with him again in the future and
                          would recommend him.
                        </p>
                        <div className="Jobs-details__earnings">
                          Private Earnings
                        </div>
                      </div>
                      <div className={cx("Jobs-details")}>
                        <h3 className={cx("Jobs-details__title")}>
                          Graduate School
                        </h3>
                        <div className={cx("Jobs-details__review")}>
                          <ul>
                            {[1, 2, 3, 4, 5].map((item, index) => (
                              <li key={index.toString()}>
                                <FontAwesomeIcon
                                  icon={faStar}
                                  color="#eb595b"
                                />
                              </li>
                            ))}
                          </ul>
                          <span>5.00</span>
                          <p>Feb 02,2022</p>
                        </div>
                        <p className="Jobs-details__info">
                          This is my second time working with him and once again
                          he delivered what I asked in a timely manor. I am once
                          again happy with the product he delivered and would
                          definitely be working with him again in the future and
                          would recommend him.
                        </p>
                        <div className="Jobs-details__earnings">
                          Private Earnings
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )
      ) : (
        <div className={cx("agent-not-found")}>
          <p>Oops! No Agent Found</p>
          <Link className={cx("agent-not-found-link")} to={"/agents"}>
            {" "}
            <i className="fa fa-angle-left"></i>{" "}
            <span className={cx("agent-not-found-link__title")}>
              Check other profiles
            </span>
          </Link>
        </div>
      )}
    </div>
  );
};
