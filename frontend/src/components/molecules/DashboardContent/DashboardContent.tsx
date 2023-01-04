import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "../../../stores/rootReducer";
import { currentUserInfo, doFetchUser } from "../../../stores/users";
import { createModuleStyleExtractor } from "../../../utils/css";

import online_tutor from "./../../../assets/images/online_tutor.png";
import quick_answer from "./../../../assets/images/quick_answer.png";
import { Modal } from "./../../atoms/Modal";

import styles from "./DashboardContent.module.scss";
const cx = createModuleStyleExtractor(styles);

export const DashboardContent = () => {
  const dispatch = useDispatch();
  const user = useSelector((store) => currentUserInfo(store));
  useEffect(() => {
    if (user) return;
    dispatch(doFetchUser());
  }, []);
  const [modalOpen, setModalOpen] = React.useState(false);

  const onModalClose = React.useCallback(() => {
    setModalOpen(false);
  }, []);

  return (
    <div className={cx("Dashbord--Root")}>
      <div className={cx("welcome__block", {}, ["radius-sm"])}>
        <h2 className={cx("welcome__text")}>
          Welcome, {user && `${user.first_name}`}
        </h2>
      </div>
      <div className="cmt-8">
        <h2 className={cx("block__title")}>To get you started, you have</h2>
        <div className={cx("task__container", {}, ["cmt-6"])}>
          <div className={cx("task__box", {}, ["radius-sm"])}>
            <span className={cx("task__counter", {}, [])}>4</span>
            <span className={cx("task__counter__desc", {}, [])}>
              Open Tasks
            </span>
          </div>
          <div className={cx("task__box", {}, ["radius-sm"])}>
            <span className={cx("task__counter", {}, [])}>2</span>
            <span className={cx("task__counter__desc", {}, [])}>
              In Progress
            </span>
          </div>
          <div className={cx("task__box", {}, ["radius-sm"])}>
            <span className={cx("task__counter", {}, [])}>2</span>
            <span className={cx("task__counter__desc", {}, [])}>
              Completed Tasks
            </span>
          </div>
          <div className={cx("task__box", {}, ["radius-sm"])}>
            <span className={cx("task__counter", {}, [])}>0</span>
            <span className={cx("task__counter__desc", {}, [])}>
              Tutoring Session
            </span>
          </div>
        </div>
      </div>
      <div className="cmt-9">
        <h2 className={cx("block__title")}>How would you like to learn?</h2>
        <div className={cx("help__card__container", {}, ["cmt-6"])}>
          <div className={cx("card", {}, ["radius-sm"])}>
            <div>
              <h2 className={cx("title")}>Get Quick Answers</h2>
              <p className={cx("desc", {}, ["cmt-1"])}>
                Post a question and receive bids within minutes, Choose your bid
                and get the answers you need. Rest easy with our risk free
                guarantee
              </p>
              <Link
                onClick={() => setModalOpen(true)}
                to="#"
                className={cx("link", {}, ["cmt-6"])}
              >
                Ask Question
              </Link>
            </div>
            <div>
              <img
                className={cx("img-1")}
                src={quick_answer}
                alt="Ask Question"
              />
            </div>
          </div>
          <div className={cx("card", {}, ["radius-sm"])}>
            <div>
              <h2 className={cx("title")}>Request Online Tutoring</h2>
              <p className={cx("desc", {}, ["cmt-1"])}>
                Post a question and receive bids within minutes, Choose your bid
                and get the answers you need. Rest easy with our risk free
                guarantee
              </p>
              <Link
                onClick={() => setModalOpen(true)}
                to="#"
                className={cx("link", {}, ["cmt-6"])}
              >
                Request a Tutor
              </Link>
            </div>
            <div>
              <img
                className={cx("img-2")}
                src={online_tutor}
                alt="Ask Question"
              />
            </div>
          </div>
        </div>
      </div>
      <Modal open={modalOpen} onClose={onModalClose}>
        <div className={cx("modal__body")}>
          <h2 className={cx("header")}>
            Our Support Rep has indicated that your ticket has been Resolved.
          </h2>
          <p className={cx("para")}>
            If you believe that the ticket has not been resolved, please reply
            to this to automatically reopen the ticket. If there is no response
            from you, we will assume that the ticket has been resolved and the
            ticket and chatbox will be automatically closed after 48 hours.
          </p>
        </div>
      </Modal>
    </div>
  );
};
