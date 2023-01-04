/* eslint-disable react/react-in-jsx-scope */
import { createRef, forwardRef, MutableRefObject, useCallback, useEffect, useRef, useState } from "react";
import { IChat, ReplyTo } from "./Messenger";
import Spinner from "../../atoms/Spinner/Spinner";
import {
  CircleTickIcon,
  DeleteIcon,
  EditIcon,
  LinkIcon,
  MoreIcon,
  QuoteIcon,
  SearchIcon,
  SendIcon,
  SettingIcon,
} from "../../../assets/svgIcons";
import { ITwilioMessage } from "../../../types/twilio";
import { useFetchUser } from "../../../hooks/useFetchUser";
import { IFetchUser, ILoginResponsInfo } from "../../../types/context/auth";
import { useSelector } from "react-redux";
import {
  deleteConversationMessage,
  getTwilioStore,
} from "../../../stores/twilio";
import { fetchCurrentUserId } from "../../../stores/users";
import { defaultProfilePic } from ".";

import styles from "./Messenger.module.scss";
import { createModuleStyleExtractor } from "../../../utils/css";
import { useDispatch } from "../../../stores/rootReducer";
import { TextSpan } from "typescript";
import reactStringReplace from "react-string-replace";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudDownloadAlt } from "@fortawesome/free-solid-svg-icons";
import { saveAs } from "file-saver";

const cx = createModuleStyleExtractor(styles);

const Message = forwardRef(
  (
    {
      message,
      setReplyToMessage,
      openMessageSetting,
      setOpenMessageSetting,
    }: {
      message: ITwilioMessage;
      setReplyToMessage: React.Dispatch<React.SetStateAction<ReplyTo>>;
      openMessageSetting: string;
      setOpenMessageSetting: React.Dispatch<React.SetStateAction<string>>;
    },
    ref
  ) => {
    const [showProgress, setShoProgress] = useState<boolean>(false);

    const dispatch = useDispatch();
    const userId: string | undefined = useSelector(fetchCurrentUserId);

    const isOwner = userId === message.author;

    useEffect(() => {
      document.body.addEventListener("click", () => {
        setOpenMessageSetting("");
      });
    });

    const replyToMessage = () => {
      setReplyToMessage({
        isVisible: true,
        message: message,
      });
    };
    const deleteMessage = () => {
      dispatch(deleteConversationMessage(message));
    };

    const dummyImages = [{}, {}, {}];

    const renderContent = useCallback(() => {
      if (!message.attachedMedia) {
        return <p>No attached media!</p>;
      }

      const contentType = message.attachedMedia.contentType;
      const openFile = () => {
        if (message?.attachedMedia?.url) {
          saveAs(message.attachedMedia.url, message?.attachedMedia?.filename || 'file')
          // window.open(message.attachedMedia.url);
        }
      };

      if (contentType === "audio/wav") {
        return (
          <div className={cx("voice-msg")}>
            <audio
              id="player"
              src={message.attachedMedia?.url}
              controls
            ></audio>
          </div>
        );
      } else if (contentType.includes("image")) {
        return (
          <div className={cx("images-msg")}>
            <div
              // key={index}
              className={cx("img")}
              style={{
                backgroundImage: `url(${message.attachedMedia?.url})`,
                cursor: "pointer",
              }}
              onClick={openFile}
            />
          </div>
        );
      } else if (contentType.includes("video/mp4")) {
        return (
          <div className={cx("video-msg")}>
            <video
              src={message.attachedMedia.url}
              controls={true}
              className={cx("video")}
            />

            <div className={cx("video-download")} onClick={openFile}>
              <FontAwesomeIcon
                icon={faCloudDownloadAlt}
                className={cx("download")}
              />
            </div>
          </div>
        );
      } else {
        return (
          <div className={cx("file-msg")} onClick={openFile}>
            <FontAwesomeIcon
              icon={faCloudDownloadAlt}
              className={cx("download")}
            />
            <p className={cx("fileName")}>{message.attachedMedia.filename}</p>
          </div>
        );
      }
    }, []);

    const renderMessageBody = useCallback(() => {
      const mentionRegex = /@\[[^\]]*\]\([^)]*\)/g;
      const nameRegex = /\[[^\]]*\]/;

      let messageBody: any = message.body;
      // Find all of the mentions based on the regex pattern
      messageBody?.match(mentionRegex)?.forEach((item: any) => {
        // Replace the matches with just the names
        const name = item.split(']')[0].split('[')[1];
        messageBody = reactStringReplace(messageBody, item, (match, index) => (
          <strong key={match} className={cx("mention")}>@{name}</strong>
        ));
      });

      return messageBody;
    }, []);

    return (
      <div
        className={cx([
          "message-row",
          isOwner ? "user-message" : "friend-message",
        ])}
      >
        <div className={cx("msg-content")}>
          <div className={cx("lit")}>
            {/* Only Text Message */}
            <div className={cx("text-msg")}>
              {message?.attributes?.replyTo?.body && (
                <div className={cx("reply-msg")}>
                  <div className={cx("quote-icon")}>
                    <QuoteIcon />
                  </div>
                  <div className={cx("reply-txt")}>
                    {message?.attributes?.replyTo?.body}
                  </div>
                  {/* <div className={cx("reply-stamp")}>
                    Mubashir 13/02/2022, 19:36:54
                  </div> */}
                </div>
              )}

              <span>
                {message.attributes.delete
                  ?
                  "This message has been deleted"
                  :
                  message.type == "text" ?
                    renderMessageBody()
                    :
                    <div>
                      {renderContent()}
                      {message.isLoading && (
                        <div className={cx("progress")}>
                          <Spinner />
                        </div>
                      )}
                    </div>
                }
              </span>

              {isOwner && (
                <>
                  {message.isLoading ? (
                    <div className={cx("icon")}>
                      <i className="icon-access_time" />
                    </div>
                  ) : (
                    <div className={cx("icon")}>
                      <i className="icon-check" />
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Only Images Message */}
            {/* <div className={cx("images-msg")}>
              {dummyImages.length && dummyImages.length <= 3 ? (
                <>
                  {dummyImages.map((image, index) => (
                    <div
                      key={index}
                      className={cx("img")}
                      style={{
                        backgroundImage: `url(https://ca.slack-edge.com/T02UVSA8C72-U031T2JDU9G-2100f0cbd017-512)`,
                      }}
                    />
                  ))}
                </>
              ) : (
                <div className={cx("multi-image")}>
                  {dummyImages.map((image, index) => (
                    <div
                      key={index}
                      className={cx("img")}
                      style={{
                        backgroundImage: `url(https://ca.slack-edge.com/T02UVSA8C72-U031T2JDU9G-2100f0cbd017-512)`,
                      }}
                    ></div>
                  ))}
                </div>
              )}
            </div> */}
          </div>

          <div className={cx("rit")}>
            <div className={cx("msg-actions")}>
              {!message.attributes.delete && (
                <button
                  className={cx("setting-btn")}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (message.sid && message.sid !== openMessageSetting) {
                      setOpenMessageSetting(message.sid);
                    } else {
                      setOpenMessageSetting("");
                    }
                  }}
                >
                  <SettingIcon />
                </button>
              )}
              <div
                className={cx([
                  "message-setting",
                  openMessageSetting === message.sid ? "show" : "hide",
                ])}
              >
                {/* <div className={cx("item")}>
                  <div className={cx("ico")}>
                    <EditIcon />
                  </div>
                  <div className={cx("lbl")}>Edit</div>
                </div> */}
                {message.type == "text" && (
                  <div onClick={replyToMessage} className={cx("item")}>
                    <div className={cx("ico")}>
                      <QuoteIcon />
                    </div>
                    <div className={cx("lbl")}>Reply</div>
                  </div>
                )}
                {isOwner && (
                  <div
                    onClick={deleteMessage} // can only delete his own message
                    className={cx("item")}
                  >
                    <div className={cx("ico")}>
                      <DeleteIcon />
                    </div>
                    <div className={cx("lbl")}>Delete</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className={cx("meta")}>
          <div
            className={cx("user-profile")}
            style={{
              backgroundImage: `url("${
                message?.participant?.attributes?.image_path ||
                defaultProfilePic
              }")`,
            }}
          />
          <div className={cx("stamp")}>
            {message?.participant?.attributes?.name || "(no-name)"},&nbsp;
            {message?.dateCreated?.toLocaleString()}
          </div>
        </div>
      </div>
    );
  }
);
Message.displayName = "Message";
export default Message;
