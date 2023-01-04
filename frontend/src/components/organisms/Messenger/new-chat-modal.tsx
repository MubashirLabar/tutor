import React, { FC, forwardRef, useRef, useState } from "react";
import { useDispatch, useSelector } from "../../../stores/rootReducer";
import Select from "react-select";
import { messageTypes, NewChat, optionInterface } from ".";
import { fetchReferrals, getReferralsStore } from "../../../stores/referrals";
import { Input } from "../../atoms/Input";
// import { Modal } from "../../molecules/Modal";
import { Modal } from "../../atoms/Modal";
import styles from "./Messenger.module.scss";
import { createModuleStyleExtractor } from "../../../utils/css";
import {
  getAvailableChatContacts,
  getTwilioStore,
  startConversationWithAgent,
  updateStartChatModalState,
} from "../../../stores/twilio";
import { ITwilioStore } from "../../../types/twilio";
import CreatableSelect from "react-select/creatable";
import { useTranslation } from "react-i18next";

const cx = createModuleStyleExtractor(styles);
interface ISingleChatModal {
  isVisible: boolean;
}
const defaultNewChat = {
  message: "",
  users: [],
  selectedUsers: [],
  groupName: "",
};
const NewChatModal: FC<ISingleChatModal> = forwardRef(({ isVisible }) => {
  const dispatch = useDispatch();
  const twilioStore: ITwilioStore = useSelector(getTwilioStore);
  const [newChat, setNewChat] = useState<NewChat>(defaultNewChat);
  const { t } = useTranslation();
  const hideStartNewChatModal = (): void => {
    setNewChat(defaultNewChat);
    dispatch(updateStartChatModalState(false));
  };

  const startNewChat = () => {
    if (newChat.groupName) {
      dispatch(startConversationWithAgent({ ...newChat }));
      hideStartNewChatModal();
    }
  };

  const updateState = (key: string, value: any) => {
    setNewChat({
      ...newChat,
      [key]: value,
    });
  };
  React.useEffect(() => {
    dispatch(getAvailableChatContacts());
  }, []);

  React.useEffect(() => {
    const result = twilioStore.contacts.map(function (a) {
      return {
        value: a._id,
        label: `${a.first_name} ${a.last_name}`,
      };
    });
    updateState("users", result);
  }, [isVisible]);

  return (
    <Modal open={isVisible} onClose={hideStartNewChatModal}>
      <div className={cx("new-chat-modal")}>
        <div className={cx("modal-hdr")}>
          <div className={cx("modal-title")}>{t("Inbox.createGroup")}</div>
          <div
            className={cx("modal-cross-btn")}
            onClick={hideStartNewChatModal}
          >
            &times;
          </div>
        </div>
        <div className={cx("modal-content")}>
          <div className={cx("field")}>
            <div className={cx("lbl")}>{t("Inbox.groupName")}</div>
            <input
              type="text"
              id="groupName"
              name="groupName"
              placeholder={t("Inbox.groupName")}
              value={newChat.groupName}
              // onChange={(value: string, name: string) =>
              //   updateState(name, value)
              // }
              onChange={(event) => {
                updateState(event.target.name, event.target.value);
              }}
              className={cx("iput")}
            />
          </div>
          <div className={cx("field")}>
            <div className={cx("lbl")}>{t("Inbox.recepient")}</div>
            <div className={cx("recipients-container")}>
              <CreatableSelect
                isClearable
                // onInputChange={this.handleInputChange}
                options={newChat.users}
                isMulti
                value={newChat.selectedUsers}
                formatCreateLabel={(userInput) => `Add  ${userInput}`}
                onChange={(newValue) => {
                  updateState("selectedUsers", newValue);
                }}
              />
            </div>
          </div>
          <div className={cx("actions")}>
            <div
              className={cx(["action-btn", "transparent"])}
              onClick={hideStartNewChatModal}
            >
              {t("Inbox.cancel")}
            </div>
            <div className={cx("action-btn")} onClick={startNewChat}>
              {t("Inbox.save")}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
});

NewChatModal.displayName = "NewChatModal";

export default NewChatModal;
