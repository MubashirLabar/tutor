import React, { useEffect, useState } from "react";
import { FaCheckCircle, FaEllipsisV } from "react-icons/fa";
import logo from "./../../../assets/images/logo.png";
import { ITwilioConversation, ITwilioStore } from "../../../types/twilio";
import {
  PlusIcon,
  CircleTickIcon,
  DeleteIcon,
  EditIcon,
  MoreIcon,
  GroupUsersIcon,
  PhoneIcon,
  VideoIcon,
  MicIcon,
  VideoMuteIcon,
  CallEndIcon,
  MicMutedIcon,
  OrderIcon,
} from "../../../assets/svgIcons";
import { Modal } from "../../atoms/Modal";
import { defaultProfilePic } from ".";
import styles from "./Messenger.module.scss";
import { createModuleStyleExtractor } from "../../../utils/css";
import {
  deleteActiveConversation,
  updateConversationFriendlyName,
} from "../../../stores/twilio";
import { useDispatch, useSelector } from "../../../stores/rootReducer";
import { fetchCurrentUserId } from "../../../stores/users";
const cx = createModuleStyleExtractor(styles);
import { Link } from "react-router-dom";

export default function SubHeader({
  twilioStore,
  setOpenAddPeople,
}: {
  twilioStore: ITwilioStore;
  setOpenAddPeople: (flag: boolean) => void;
}) {
  const dispatch = useDispatch();
  const [editGroupName, setEditGroupName] = useState(false);
  const [openGroupSetting, setOpenGroupSetting] = useState(false);
  const [groupName, setGroupName] = useState(
    twilioStore.activeConversation?.friendlyName
  );

  const [openVidoeCallModal, setOpenVideoCallModal] = useState(false);
  const [openAudioCallModal, setOpenAudioCallModal] = useState(false);
  const [openCamera, setOpenCamera] = useState(false);
  const [openMic, setOpenMic] = useState(false);

  const userId: string | undefined = useSelector(fetchCurrentUserId);
  const isOwner = userId === twilioStore?.activeConversation?.createdBy;

  useEffect(() => {
    document.body.addEventListener("click", () => {
      setOpenGroupSetting(false);
    });
  });

  React.useEffect(() => {
    setGroupName(twilioStore.activeConversation?.friendlyName);
  }, [twilioStore.activeConversation]);

  const handleSaveEditGroup = () => {
    dispatch(updateConversationFriendlyName(groupName || ""));
    setEditGroupName(false);
    setOpenGroupSetting(false);
  };

  const handleCloseEditGroup = () => {
    setEditGroupName(false);
    setOpenGroupSetting(false);
  };

  const deleteConversation = () => {
    dispatch(deleteActiveConversation());
  };

  const handleCloseVideoCall = () => {
    setOpenVideoCallModal(false);
  };

  const handleCloseAudioCall = () => {
    setOpenAudioCallModal(false);
  };

  return (
    <>
      <div className={cx("inbox-content-hdr")}>
        <div className={cx("lit")}>
          <div className={cx("user")}>
            <div className={cx("img")}>
              <GroupUsersIcon />
            </div>
            <div className={cx("meta")}>
              <div className={cx("name-blk")}>
                <div className={cx("nam")}>
                  {twilioStore.activeConversation?.friendlyName || `(empty)`}
                </div>
              </div>

              {/* <div className="txt font s12">{selectedChat.user_type}</div> */}
            </div>
          </div>
        </div>
        <div className={cx("rit")}>
          <button
            className={cx("btn")}
            onClick={() => setOpenAudioCallModal(true)}
          >
            <PhoneIcon />
          </button>
          <button
            className={cx("btn")}
            onClick={() => setOpenVideoCallModal(true)}
          >
            <VideoIcon />
          </button>
          <button className={cx("btn")}>
            <CircleTickIcon />
          </button>
          <div
            className={cx("btn")}
            onClick={(e) => {
              e.stopPropagation();
              setOpenGroupSetting(true);
            }}
          >
            <MoreIcon />
            {openGroupSetting && (
              <div className={cx(["group-setting"])}>
                {isOwner && (
                  <div
                    className={cx("item")}
                    onClick={() => setEditGroupName(true)}
                  >
                    <div className={cx("ico")}>
                      <EditIcon />
                    </div>
                    <div className={cx("lbl")}>Edit Group</div>
                  </div>
                )}

                <div
                  className={cx("item")}
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenAddPeople(true);
                    setOpenGroupSetting(false);
                  }}
                >
                  <div className={cx("ico")}>
                    <PlusIcon />
                  </div>
                  <div className={cx("lbl")}>Participants</div>
                </div>
                {isOwner && (
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteConversation();
                      setOpenGroupSetting(false);
                    }}
                    className={cx("item")}
                  >
                    <div className={cx("ico")}>
                      <DeleteIcon />
                    </div>
                    <div className={cx("lbl")}>Delete</div>
                  </div>
                )}
                <Link to="/dashboard/start-contract" className={cx("item")}>
                  <div className={cx("ico")}>
                    <OrderIcon />
                  </div>
                  <div className={cx("lbl")}>Start a Contract</div>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Edit Group name */}
      <Modal open={editGroupName} onClose={handleCloseEditGroup}>
        <div className={cx("new-chat-modal")}>
          <div className={cx("modal-hdr")}>
            <div className={cx("modal-title")}>Edit Group Name</div>
            <div
              className={cx("modal-cross-btn")}
              onClick={handleCloseEditGroup}
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
                value={groupName}
                onChange={(e) => {
                  setGroupName(e.target.value);
                }}
                placeholder="Group Name"
                className={cx("iput")}
              />
            </div>
            <div className={cx("actions")}>
              <div
                className={cx(["action-btn", "transparent"])}
                onClick={handleCloseEditGroup}
              >
                Cancel
              </div>
              <div className={cx("action-btn")} onClick={handleSaveEditGroup}>
                Save
              </div>
            </div>
          </div>
        </div>
      </Modal>

      {/* Open Video Call Modal */}
      <Modal open={openVidoeCallModal} onClose={handleCloseVideoCall}>
        <div className={cx("video-call-modal")}>
          <div className={cx("connected-users")}>
            <div className={cx("user")}>
              <div
                className={cx("user-screen")}
                style={{
                  backgroundImage: `url(https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80)`,
                }}
              />
              <div className={cx("user-name")}>Me</div>
            </div>
            <div className={cx("user")}>
              <div
                className={cx("user-screen")}
                style={{
                  backgroundImage: `url(https://images.unsplash.com/photo-1543269664-7eef42226a21?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80)`,
                }}
              />
              <div className={cx("user-name")}>Jon Abraham</div>
            </div>
          </div>
          <div className={cx("actions-blk")}>
            <button
              className={cx(["circle-btn", "voice-call"])}
              onClick={() => setOpenMic(!openMic)}
            >
              {openMic ? <MicIcon /> : <MicMutedIcon />}
            </button>
            <button
              className={cx(["circle-btn", "video-call"])}
              onClick={() => setOpenCamera(!openCamera)}
            >
              {openCamera ? <VideoIcon /> : <VideoMuteIcon />}
            </button>
            <button className={cx(["circle-btn", "end-call"])}>
              <CallEndIcon />
            </button>
          </div>
        </div>
      </Modal>

      {/* Open Audio Call Modal */}
      <Modal open={openAudioCallModal} onClose={handleCloseAudioCall}>
        <div className={cx(["video-call-modal", "audio-call-modal"])}>
          <div className={cx("connected-users")}>
            <div className={cx("user")}>
              <div
                className={cx("user-screen")}
                style={{
                  backgroundImage: `url(https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80)`,
                }}
              />
              <div className={cx("user-name")}>Me</div>
            </div>
            <div className={cx("user")}>
              <div
                className={cx("user-screen")}
                style={{
                  backgroundImage: `url(https://images.unsplash.com/photo-1543269664-7eef42226a21?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80)`,
                }}
              />
              <div className={cx("user-name")}>Jon Abraham</div>
            </div>
          </div>
          <div className={cx("actions-blk")}>
            <button
              className={cx(["circle-btn", "voice-call"])}
              onClick={() => setOpenMic(!openMic)}
            >
              {openMic ? <MicIcon /> : <MicMutedIcon />}
            </button>
            <button
              className={cx(["circle-btn", "video-call"])}
              onClick={() => setOpenCamera(!openCamera)}
            >
              {openCamera ? <VideoIcon /> : <VideoMuteIcon />}
            </button>
            <button className={cx(["circle-btn", "end-call"])}>
              <CallEndIcon />
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
