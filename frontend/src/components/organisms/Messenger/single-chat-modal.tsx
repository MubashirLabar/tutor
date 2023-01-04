import React, { FC, forwardRef, useRef, useState } from "react";
import { useDispatch, useSelector } from "../../../stores/rootReducer";
import Select from "react-select";
import { messageTypes, NewChat, optionInterface } from ".";
import { Input } from "../../atoms/Input";
import { Modal } from "../../atoms/Modal";
import styles from "./Messenger.module.scss";
import { createModuleStyleExtractor } from "../../../utils/css";
import { useNavigate } from "react-router-dom";
import { startConversationWithAgent } from "../../../stores/twilio";
const cx = createModuleStyleExtractor(styles);
interface ISingleChatModal {
  visible: boolean;
  hideSingleChatModal: any;
  recepient: optionInterface;
}
const defaultNewChat = {
  message: "",
  users: [],
  selectedUsers: [],
  groupName: "",
};
const SingleChatModal: FC<ISingleChatModal> = forwardRef(
  ({ visible, hideSingleChatModal, recepient }) => {
    const dispatch = useDispatch();
    const [newChat, setNewChat] = useState<NewChat>(defaultNewChat);
    const navigate = useNavigate();

    const startNewChat = () => {
      if (newChat.groupName && newChat.message) {
        dispatch(startConversationWithAgent({ ...newChat }));
        setNewChat(defaultNewChat);
        hideSingleChatModal();
        navigate("/dashboard/messenger");
      }
    };

    const updateState = (key: string, value: any) => {
      setNewChat({
        ...newChat,
        [key]: value,
      });
    };

    React.useEffect(() => {
      updateState("users", [recepient]);
      updateState("selectedUsers", [recepient]);
    }, [recepient]);

    return visible ? (
      <Modal
        open={visible}
        onClose={() => {
          setNewChat(defaultNewChat);
          hideSingleChatModal();
        }}
      >
        <div className={cx("new-chat-modal")}>
          <div className={cx("modal-hdr")}>
            <div className={cx("modal-title")}>Start New Chat</div>
            <div
              className={cx("modal-cross-btn")}
              onClick={() => {
                setNewChat(defaultNewChat);
                hideSingleChatModal();
              }}
            >
              &times;
            </div>
          </div>
          <div className={cx("modal-content")}>
            <div className={cx("field")}>
              <div className={cx("lbl")}>Group Name</div>
              <input
                type="text"
                id="groupName"
                name="groupName"
                placeholder="Group Name"
                value={newChat.groupName}
                onChange={(event) => {
                  updateState(event.target.name, event.target.value);
                }}
                className={cx("iput")}
              />
            </div>
            <div className={cx("field")}>
              <div className={cx("lbl")}>Recipient</div>
              <div className={cx("recipients-container")}>
                <Select
                  isDisabled={true}
                  options={newChat.users}
                  value={newChat.selectedUsers}
                  // onChange={(newValue) => {
                  //   updateState("selectedUser", newValue);
                  // }}
                />
              </div>
            </div>
            <div className={cx("field")}>
              <div className={cx("lbl")}>Message</div>
              <textarea
                // id="groupName"
                name="message"
                // onChange={(value: string, name: string) =>
                //   updateState(name, value)
                // }
                onChange={(e) => {
                  updateState(e.target.name, e.target.value);
                }}
                value={newChat.message}
                className={cx(["iput", "area"])}
                placeholder="Message"
              />
            </div>
            <div className={cx("actions")}>
              <div
                className={cx(["action-btn", "transparent"])}
                onClick={() => {
                  setNewChat(defaultNewChat);
                  hideSingleChatModal();
                }}
              >
                Cancel
              </div>
              <div className={cx("action-btn")} onClick={startNewChat}>
                Save
              </div>
            </div>
          </div>
        </div>
      </Modal>
    ) : (
      <></>
    );
  }
);

SingleChatModal.displayName = "SingleChatModal";

export default SingleChatModal;
