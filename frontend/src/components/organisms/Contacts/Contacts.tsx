import React, { FC, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "../../../stores/rootReducer";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { fetchReferrals, getReferralsStore } from "../../../stores/referrals";
import { createModuleStyleExtractor } from "../../../utils/css";
import { createPascelCaseName } from "../../../utils/common";
import SingleChatModal from "../Messenger/single-chat-modal";
import styles from "./Contacts.module.scss";
import { ChatIcon, DeleteUserIcon, MoreIcon } from "../../../assets/svgIcons";
const cx = createModuleStyleExtractor(styles);
interface IContactList {
  item: any;
  index: number;
}
export function Contacts() {
  const [activeAction, setActiveAction] = useState("");
  const contactList = [
    {
      id: 1,
      name: "Jaxson Dorwart",
      email: "jay19928@gmail.com",
      role: "Admin",
      image: require("../../../assets/images/avatar.png"),
    },
    {
      id: 2,
      name: "Jaxson Dorwart",
      email: "jay19928@gmail.com",
      role: "Admin",
      image: require("../../../assets/images/avatar.png"),
    },
    {
      id: 3,
      name: "Jaxson Dorwart",
      email: "jay19928@gmail.com",
      role: "Admin",
      image: require("../../../assets/images/avatar.png"),
    },
    {
      id: 4,
      name: "Jaxson Dorwart",
      email: "jay19928@gmail.com",
      role: "Admin",
      image: require("../../../assets/images/avatar.png"),
    },
    {
      id: 5,
      name: "Jaxson Dorwart",
      email: "jay19928@gmail.com",
      role: "Admin",
      image: require("../../../assets/images/avatar.png"),
    },
    {
      id: 6,
      name: "Jaxson Dorwart",
      email: "jay19928@gmail.com",
      role: "Admin",
      image: require("../../../assets/images/avatar.png"),
    },
    {
      name: "Jaxson Dorwart",
      email: "jay19928@gmail.com",
      role: "Admin",
      image: require("../../../assets/images/avatar.png"),
    },
  ];

  useEffect(() => {
    document.body.addEventListener("click", () => {
      setActiveAction("");
    });
  }, []);

  const ContactList: FC<IContactList> = ({ item, index }) => {
    return (
      <div className={cx("row")}>
        <div className={cx("col")}>
          <div className={cx("user")}>
            <div
              className={cx("image")}
              style={{
                backgroundImage: `url(${item.image}`,
              }}
            />
            <div className={cx(["text", "name"])}>{item.name}</div>
          </div>
        </div>
        <div className={cx("col")}>
          <div className={cx("text")}>{item.email}</div>
        </div>
        <div className={cx("col")}>
          <div className={cx("text")}>{item.role}</div>
        </div>
        <div className={cx("col")}>
          <div className={cx("actions")}>
            <div
              className={cx([
                "actions-wrap",
                activeAction === item.id ? "active" : "",
              ])}
            >
              <button className={cx("action-btn")}>
                <ChatIcon />
                <div className={cx("btn-lbl")}>Chat now</div>
              </button>
              <button className={cx(["action-btn", "delete-btn"])}>
                <DeleteUserIcon />
                <div className={cx("btn-lbl")}>Delete user</div>
              </button>
            </div>
            <button
              className={cx("action-menu-btn")}
              onClick={(e) => {
                e.stopPropagation();
                if (activeAction === item.id) {
                  setActiveAction("");
                } else {
                  setActiveAction(item.id);
                }
              }}
            >
              <i className="icon-more-vertical" />
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={cx("contact-page")}>
      <div className={cx(["wrapper", "app-padding"])}>
        {/* Details Table */}
        <div className={cx("details-table")}>
          <div className={cx(["table-hdr", "row"])}>
            <div className={cx("col")}>
              <div className={cx("text")}>Name</div>
            </div>
            <div className={cx("col")}>
              <div className={cx("text")}>Email</div>
            </div>
            <div className={cx("col")}>
              <div className={cx("text")}>Role</div>
            </div>
            <div className={cx("col")}>
              <div className={cx(["text", "action-txt"])}>Action</div>
            </div>
          </div>
          <div className={cx("list")}>
            {contactList.map((item, index) => (
              <ContactList item={item} key={index} index={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
