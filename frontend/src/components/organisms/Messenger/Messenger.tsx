import React, { useState, useRef } from "react";
import SideNav from "./side-nav";
import MessageArea from "./message-area";
import Participants from "./paticipants";
import SubHeader from "./sub-header";
import InputArea from "./input-area";
import { useDispatch, useSelector } from "../../../stores/rootReducer";
import NewChatModal from "./new-chat-modal";
import styles from "./Messenger.module.scss";
import { createModuleStyleExtractor } from "../../../utils/css";
import { getTwilioStore } from "../../../stores/twilio";
import {
  ITwilioConversation,
  ITwilioMessage,
  ITwilioStore,
} from "../../../types/twilio";
import AddMembersModal from "./add-members-modal";
const cx = createModuleStyleExtractor(styles);

export interface IChat {
  id: number;
  user_name: string;
  user_type: string;
  message: string;
  unread: number;
  stamp: string;
  profile_image: string;
}

export interface ReplyTo {
  isVisible: boolean;
  message?: ITwilioMessage;
}

export function Messenger() {
  const twilioStore: ITwilioStore = useSelector(getTwilioStore);
  const [openAddPeople, setOpenAddPeople] = useState<boolean>(true);

  const [replyToMessage, setReplyToMessage] = useState<ReplyTo>({
    isVisible: false,
    message: undefined,
  });

  const scrollDown = useRef();

  return (
    <div className={cx("inbox-page")}>
      <div className={cx(["wrapper", "app-padding"])}>
        <NewChatModal isVisible={twilioStore.startChatModal} />
        <AddMembersModal
          isVisible={!twilioStore.isMessagesLoading && twilioStore.membersModal}
        />
        {/* Sidebar */}
        <SideNav twilioStore={twilioStore} />

        {/* Chat Container */}
        <div className={cx("chat-container")}>
          <div className={cx("chat-container-content")}>
            {!twilioStore.activeConversation && (
              <div className={cx("empty-message-area")}>
                <div className={cx("empty-title")}>
                  No Conversations Available
                </div>
                {/* <div className={cx("empty-txt")}>
                &apos;Say Hi&apos; to start the conversation
              </div> */}
              </div>
            )}
            {/* sub - header */}
            {!twilioStore.isMessagesLoading &&
              twilioStore.activeConversation && (
                <SubHeader
                  twilioStore={twilioStore}
                  setOpenAddPeople={setOpenAddPeople}
                />
              )}
            {/* Message Area */}
            {twilioStore.activeConversation && (
              <MessageArea
                replyToMessage={replyToMessage}
                setReplyToMessage={setReplyToMessage}
                twilioStore={twilioStore}
                scrollDown={scrollDown}
              />
            )}
            {/* Input section */}
            {!twilioStore.isMessagesLoading &&
              twilioStore.activeConversation && (
                <InputArea
                  replyToMessage={replyToMessage}
                  setReplyToMessage={setReplyToMessage}
                  twilioStore={twilioStore}
                  scrollDown={scrollDown}
                />
              )}
          </div>

          {/* Participants */}
          {!twilioStore.isConversationLoading &&
            twilioStore.activeConversation &&
            !twilioStore.isMessagesLoading && (
              <Participants
                twilioStore={twilioStore}
                openAddPeople={openAddPeople}
                setOpenAddPeople={setOpenAddPeople}
              />
            )}
        </div>
      </div>
    </div>
  );
}
