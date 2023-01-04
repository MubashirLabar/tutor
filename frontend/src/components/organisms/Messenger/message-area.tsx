import React, { useCallback, useEffect, useState } from "react";
import { MdDelete, MdEdit, MdFormatQuote, MdSettings } from "react-icons/md";
import { ITwilioMessage, ITwilioStore } from "../../../types/twilio";
import { useDispatch, useSelector } from "../../../stores/rootReducer";
import { currentUserInfo, doFetchUser } from "../../../stores/users";
import { useAuth } from "../../../hooks/useAuth";
import { IChat, ReplyTo } from "./Messenger";
import FlipMove from "react-flip-move";
import Message from "./message";

import styles from "./Messenger.module.scss";
import { createModuleStyleExtractor } from "../../../utils/css";
import { useDropzone } from "react-dropzone";
import { sendMMSToActiveConversation } from "../../../stores/twilio";
const cx = createModuleStyleExtractor(styles);

export default function MessageArea({
  twilioStore,
  replyToMessage,
  setReplyToMessage,
  scrollDown,
}: {
  twilioStore: ITwilioStore;
  setReplyToMessage: React.Dispatch<React.SetStateAction<ReplyTo>>;
  scrollDown: any;
  replyToMessage: ReplyTo;
}) {
  const { activeConversation, isMessagesLoading } = twilioStore;
  const [openMessageSetting, setOpenMessageSetting] = useState<string>("");
  const [fileUrl, setFileUrl] = useState("");

  const dispatch = useDispatch();

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: async (files, _, __) => {
      if (files[0]) {
        const img = files[0];
        setFileUrl(URL.createObjectURL(img))

        const blob = await fetch(URL.createObjectURL(img)).then(r => r.blob());
        dispatch(sendMMSToActiveConversation({
          filename: img.name,
          contentType: img.type,
          media: blob,
          url: URL.createObjectURL(img),
        },
          { ...replyToMessage }
        ));

      }
    }, multiple: false
  });


  return (
    <div className={cx("messages-area")}>
      {isMessagesLoading ? (
        <>
          {[{}, {}, {}, {}, {}, {}, {}].map((el, idx) => (
            <div key={idx} className={cx(["message-row"])}>
              <div className={cx("msg-content")}>
                <div className={cx(["lit", "msgs-loading"])}>
                  <div className={cx(["dp", "holder"])} />
                  <div className={cx("meta")}>
                    <div className={cx(["nam", "holder"])} />
                    <div className={cx(["txt", "holder"])} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </>
      ) : (
        <div {...getRootProps()} style={{ cursor: 'default' }}>
          <input {...getInputProps()} onClick={(e) => e.preventDefault()} />

          {activeConversation?.messages.length ? (
            <div>
              {/* <FlipMove> */}
              {activeConversation?.messages.map((msg, index) => {
                return (
                  <Message
                    key={index}
                    message={msg}
                    setReplyToMessage={setReplyToMessage}
                    openMessageSetting={openMessageSetting}
                    setOpenMessageSetting={setOpenMessageSetting}
                  />
                );
              })}
              {/* </FlipMove> */}
              <div ref={scrollDown}></div>
            </div>
          ) : (
            <div className={cx("empty-message-area")}>
              <div className={cx("empty-title")}>No Message Available</div>
              <div className={cx("empty-txt")}>
                &apos;Say Hi&apos; to start the conversation
              </div>
            </div>
          )}

          {isDragActive && (
            <div className={cx("drag-area")}>
              Drop the file to send
            </div>
          )}
        </div>
      )}
    </div>
  );
}
