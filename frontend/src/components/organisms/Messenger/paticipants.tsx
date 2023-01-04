import React, { forwardRef, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "../../../stores/rootReducer";
import Spinner from "../../atoms/Spinner/Spinner";
import {
  ITwilioConversation,
  ITwilioMessage,
  ITwilioStore,
} from "../../../types/twilio";
import {
  updateAddMembersModalState,
  updateStartChatModalState,
} from "../../../stores/twilio";
import { defaultProfilePic } from ".";
import styles from "./Messenger.module.scss";
import { createModuleStyleExtractor } from "../../../utils/css";
import { PlusIcon,LogoutIcon } from "../../../assets/svgIcons";
import { fetchCurrentUserId } from "../../../stores/users";
import { leaveActiveConversation,saveDataToKick } from "../../../stores/twilio";
const cx = createModuleStyleExtractor(styles);

const Participants = ({
  twilioStore,
  openAddPeople,
  setOpenAddPeople,
}: {
  twilioStore: ITwilioStore;
  openAddPeople: boolean;
  setOpenAddPeople: (flag: boolean) => void;
}) => {
  const { isConversationLoading, conversations, activeConversation } =
    twilioStore;
  const dispatch = useDispatch();
  const userId: string | undefined = useSelector(fetchCurrentUserId);
  const isOwner = userId === twilioStore?.activeConversation?.createdBy;
  
  const showAddMembersModal = () => {
    dispatch(updateAddMembersModalState(true));
  };

  const disableConversation = () => {
    dispatch(leaveActiveConversation());
  }
  const mysaveDataToKick = (obj:any)=>{
    dispatch(saveDataToKick(obj));
  }

  return (
    <div className={cx(["participants-area", openAddPeople ? "show" : "hide"])}>
      <div className={cx("asides-hdr")}>
        <div className={cx("left")}>
          <div className={cx("title")}>People</div>
        </div>
        <div className={cx("right")}>
          {isOwner && 
            <div
              className={cx("action-btn")}
              onClick={() => showAddMembersModal()}
            >
              <PlusIcon />
            </div>
          }
          <div
            className={cx(["action-btn", "cross-btn"])}
            onClick={() => setOpenAddPeople(false)}
          >
            &times;
          </div>
        </div>
      </div>
      {isOwner ? 
        (<div className={cx("people-list")}>
          {activeConversation?.participants?.map((item, index) => (
            <>
              {!item.isLoading ? (
                <div key={index} className={cx("people")}>
                  <div className={cx("meta")}>
                    <div className={cx("people-dp")}>
                      <div
                        className={cx("image")}
                        style={{
                          backgroundImage: `url("${
                            item?.attributes?.image_path ||
                            require("../../../assets/images/avatar.png")
                          }")`,
                        }}
                      />
                      <div className={cx("online-status")} />
                    </div>
                    <div className={cx("people-name")}>
                      {item?.attributes?.name || "(no-name)"}
                    </div>
                  </div>
                  {item.identity == activeConversation.createdBy && <div className={cx("desti")}>Owner</div>} 
                  {item.identity !== activeConversation.createdBy && <button onClick={(e)=>{
                      const participant = activeConversation.participants?.filter((obj) =>{
                      return obj.identity === item.identity;
                    })
                    mysaveDataToKick(participant)
                    disableConversation();
                  }}><LogoutIcon/></button>} 
                  
                </div>
              ) : (
                <div key={index} className={cx("people")}>
                  <div className={cx("meta")}>
                    <div className={cx(["people-dp", "holder"])} />
                    <div className={cx(["people-name", "holder"])} />
                  </div>
                </div>
              )}
            </>
          ))}
        </div>):(<div className={cx("people-list")}>
          {activeConversation?.participants?.map((item2, index2) => (
            <>
              {!item2.isLoading ? (
                <div key={index2} className={cx("people")}>
                  <div className={cx("meta")}>
                    <div className={cx("people-dp")}>
                      <div
                        className={cx("image")}
                        style={{
                          backgroundImage: `url("${
                            item2?.attributes?.image_path ||
                            require("../../../assets/images/avatar.png")
                          }")`,
                        }}
                      />
                      <div className={cx("online-status")} />
                    </div>
                    <div className={cx("people-name")}>
                      {item2?.attributes?.name || "(no-name)"}
                    </div>
                  </div>
                  
                  {item2.identity == activeConversation.createdBy && <div className={cx("desti")}>Owner</div>} 
                  
                </div>
              ) : (
                <div key={index2} className={cx("people")}>
                  <div className={cx("meta")}>
                    <div className={cx(["people-dp", "holder"])} />
                    <div className={cx(["people-name", "holder"])} />
                  </div>
                </div>
              )}
            </>
          ))}
        </div>)
      }
    </div>
  );
};

export default Participants;
