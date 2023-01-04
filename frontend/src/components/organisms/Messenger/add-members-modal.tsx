import React, { FC, forwardRef, useRef, useState } from "react";
import { useDispatch, useSelector } from "../../../stores/rootReducer";
import CreatableSelect from "react-select/creatable";
import { messageTypes, NewChat, optionInterface } from ".";
import { Modal } from "../../atoms/Modal";
import styles from "./Messenger.module.scss";
import { createModuleStyleExtractor } from "../../../utils/css";
import {
  addMembersToActiveChat,
  getAvailableChatContacts,
  getTwilioStore,
  updateAddMembersModalState,
} from "../../../stores/twilio";
import { ITwilioStore } from "../../../types/twilio";
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

const AddMembersModal: FC<ISingleChatModal> = forwardRef(({ isVisible }) => {
  const dispatch = useDispatch();
  const [newChat, setNewChat] = useState<NewChat>(defaultNewChat);
  const twilioStore: ITwilioStore = useSelector(getTwilioStore);


  const hideStartNewChatModal = (): void => {
    setNewChat(defaultNewChat);
    dispatch(updateAddMembersModalState(false));
  };

  const addMembers = () => {
    if (newChat.selectedUsers.length) {
      dispatch(addMembersToActiveChat({...newChat}));
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
  }, [isVisible, twilioStore]);


  // eslint-disable-next-line no-constant-condition
  return (
    <Modal open={isVisible} onClose={hideStartNewChatModal}>
      <div className={cx("add-members-modal")}>
        <div className={cx("modal-hdr")}>
          <div className={cx("modal-title")}>Add Members</div>
          <div
            className={cx("modal-cross-btn")}
            onClick={hideStartNewChatModal}
          >
            &times;
          </div>
        </div>
        <div className={cx("modal-content")}>
          <div className={cx("field")}>
            <div className={cx("lbl")}>Recipient</div>
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
              Cancel
            </div>
            <div className={cx("action-btn")} onClick={addMembers}>
              Add
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
});

AddMembersModal.displayName = "AddMembersModal";

export default AddMembersModal;
