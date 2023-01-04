import React, { forwardRef, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "../../../stores/rootReducer";
import {
  ITwilioConversation,
  ITwilioMessage,
  ITwilioStore,
} from "../../../types/twilio";
import {
  activeConversationSuccess,
  fetchMessagesLoading,
  updateStartChatModalState,
} from "../../../stores/twilio";
import { SearchIcon, PlusIcon, GroupUsersIcon } from "../../../assets/svgIcons";
import { IChat } from "./Messenger";
import { defaultProfilePic } from ".";
import styles from "./Messenger.module.scss";
import { createModuleStyleExtractor } from "../../../utils/css";
const cx = createModuleStyleExtractor(styles);

const SideNav = ({ twilioStore }: { twilioStore: ITwilioStore }) => {
  const [filtered, setFiltered] = useState(twilioStore.conversations);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const { isConversationLoading, conversations, activeConversation } =
    twilioStore;
  const handleChatHeadClick = (chat: ITwilioConversation) => {
    dispatch(fetchMessagesLoading());
    dispatch(activeConversationSuccess({ ...chat }));
  };
  const setFilteredConversations = () => {
    if (search) {
      setFiltered(
        twilioStore.conversations.filter((ch) =>
          ch.friendlyName?.toLowerCase().includes(search.toLowerCase())
        )
      );
    } else {
      setFiltered(twilioStore.conversations);
    }
    // }
  };

  React.useEffect(() => {
    setFilteredConversations();
  }, [twilioStore, search]);

  return (
    <div className={cx("inbox-sidebar")}>
      <div className={cx("inbox-sidebar-hdr")}>
        <div className={cx("search-field")}>
          <div className={cx("icon")}>
            <SearchIcon />
          </div>
          <input
            type="text"
            placeholder="Search"
            className={cx("iput")}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>
        <div
          className={cx("new-chat-btn")}
          onClick={() => {
            dispatch(updateStartChatModalState(true));
          }}
        >
          <PlusIcon />
        </div>
      </div>
      <div className={cx("friends-list")}>
        {isConversationLoading ? (
          <>
            {[{}, {}, {}, {}, {}, {}, {}, {}, {}].map((el, idx) => (
              <div key={idx} className={cx(["friend", "loading"])}>
                <div className={cx(["image", "holder"])} />
                <div className={cx("meta")}>
                  <div className={cx(["name", "holder"])} />
                  <div className={cx(["txt", "holder"])} />
                </div>
              </div>
            ))}
          </>
        ) : (
          <>
            {filtered.map((item, index) => {
              const fullmessage = twilioStore.full_conversations.find(
                (o) => o.sid === item.sid
              );
              let conText = undefined;
              if (fullmessage && fullmessage?.messages.length) {
                const test =
                  fullmessage?.messages[
                  fullmessage && fullmessage?.messages.length - 1
                  ];
                conText =
                  fullmessage?.messages[
                    fullmessage && fullmessage?.messages.length - 1
                  ].body;
                if (test.attributes.delete) {
                  conText = "This message has been deleted";
                }
              }
              return (
                <div
                  key={item.sid || index}
                  onClick={() => {
                    handleChatHeadClick(item);
                  }}
                  className={cx([
                    "friend",
                    activeConversation?.sid === item.sid ? "active" : "",
                  ])}
                >
                  <div className={cx("image")}>
                    <GroupUsersIcon />
                  </div>
                  <div className={cx("meta")}>
                    <div className={cx("row")}>
                      <div className={cx("name")}>
                        {item.friendlyName || `(empty)`}
                      </div>
                      <div className={cx("stamp")}>
                        {item?.lastMessage?.dateCreated?.toLocaleDateString() ||
                          ""}
                      </div>
                    </div>
                    <div className={cx("row")}>
                      <div className={cx(["msg", "wordwrap"])}>{conText}</div>
                      {item.lastMessage && false && (
                        <div className={cx("unread")}>{index}</div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
};

export default SideNav;
