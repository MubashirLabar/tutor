import React, { FC, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useAgent } from "../../../hooks/useAgent";
import { useUser } from "../../../hooks/useUser";
import { useDispatch, useSelector } from "../../../stores/rootReducer";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { fetchReferrals, getReferralsStore } from "../../../stores/referrals";
import { createModuleStyleExtractor } from "../../../utils/css";
import styles from "./Referrals.module.scss";
import { fetchAgentByUserId } from "../../../stores/agents";
import { ReferralResposeData, ReferredUserInfo } from "../../../types/agents";
import { createPascelCaseName } from "../../../utils/common";
import { currentAlertState } from "../../../stores/alert/selectors";
import { doCreateAlert } from "../../../stores/alert";
import Alert from "../../atoms/Alert/Alert";
import CopyIcon from "../../../assets/svgIcons/CopyIcon";
import SingleChatModal from "../Messenger/single-chat-modal";
import { useTranslation } from "react-i18next";

const cx = createModuleStyleExtractor(styles);
interface IReferralsList {
  item: ReferralResposeData;
  index: number;
}
export function Referrals() {
  const user = useUser();
  const dispatch = useDispatch();
  const [agentId, setAgentId] = useState<string>("");
  //@ts-ignore
  const { agent } = useAgent(agentId);
  const alert = useSelector(currentAlertState);

  const [currentReferral, setCurrentReferral] = useState("");

  const [copied, setCopied] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const referrals = useSelector(getReferralsStore);
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(fetchReferrals());
  }, []);

  useEffect(() => {
    if (copied) setTimeout(() => setCopied(false), 3000);
  }, [copied]);

  useLayoutEffect(() => {
    setIsReady(false);
    setTimeout(() => setIsReady(true), 10);
  }, [currentReferral]);

  const [referralLink, setReferralLink] = useState<string>("");

  useEffect(() => {
    if (agentId && agentId !== "") {
      dispatch(fetchAgentByUserId(agentId));
    }
  }, [agentId]);

  useEffect(() => {
    if (agent) {
      try {
        setReferralLink(
          `${`${window.location.origin.toString()}/auth?agent_id=${agent?._id
          }&referral_code=${
          //@ts-ignore
          agent.referral_code
          }&redirect_uri=${`/dashboard/agents/${agent?._id}`}`}`
        );
      } catch (error) {
        console.log(`erro ${JSON.stringify(error)}`);
      }
    }
  }, [agent]);

  useEffect(() => {
    if (user) {
      user.agentProfile && setAgentId(user.agentProfile._id);
    }
  }, [user]);

  const ReferralsList: FC<IReferralsList> = ({ item, index }) => {
    const [chatPopup, setChatPopup] = useState(false);

    console.log(item);
    useEffect(() => {
      document.body.addEventListener("click", () => {
        setChatPopup(false);
      });
    }, []);
    const [singleChatModal, toggleSingleChatModal] = useState<boolean>(false);

    return (

      <div className={cx("row")}>
        <SingleChatModal
          recepient={{
            label: createPascelCaseName(
              `${item.referred_user.first_name + " " + item.referred_user.last_name}`
            ),
            value: item.referred_user._id,
          }}
          visible={singleChatModal}
          hideSingleChatModal={() => toggleSingleChatModal(false)}
        />
        <div className={cx("col")}>
          <div className={cx("text")}>{index + 1}</div>
        </div>
        <div className={cx("col")}>
          <div className={cx("user")}>
            <div
              className={cx("image")}
              style={{
                backgroundImage: `url(${item.referred_user.image_path != ""
                  ? item.referred_user.image_path
                  : require("../../../assets/images/avatar.png")
                  }`,
              }}
            />
            <div
              className={cx(["text", "name"])}
              onClick={(e) => {
                e.stopPropagation();
                setChatPopup(true);
              }}
            >
              {createPascelCaseName(
                item.referred_user?.first_name +
                " " +
                item.referred_user?.last_name
              )}
            </div>
            {/* user chat popup */}
            <div className={cx(["chat-popup", chatPopup ? "show" : "hide"])}>
              <button
                className={cx("cross-btn")}
                onClick={() => setChatPopup(false)}
              >
                &times;
              </button>
              <div className={cx("meta")}>
                <div
                  className={cx("img")}
                  style={{
                    backgroundImage: `url(${item.referred_user.image_path != ""
                      ? item.referred_user.image_path
                      : require("../../../assets/images/avatar.png")
                      }`,
                  }}
                />
                <div className={cx("nam")}>
                  {createPascelCaseName(
                    `${item.referred_user.first_name +
                    " " +
                    item.referred_user.last_name
                    }`
                  )}
                </div>

                <button onClick={() => toggleSingleChatModal(true)} className={cx("chat-btn")}>Chat</button>
              </div>
            </div>
          </div>
        </div>
        <div className={cx("col")}>
          <div className={cx("text")}>
            {item.created_at ? new Date(item.created_at).toDateString() : "N/A"}
          </div>
        </div>
      </div>
    );
  };

  const dispatchAlert = (message: string) => {
    dispatch(doCreateAlert({ active: true, message, type: "INFO" }));
  };
  // console.log(referrals);
  return (
    <div className={cx("referral-page")}>
      {alert.active && <Alert type={alert.type} message={alert.message} />}
      <div className={cx(["wrapper", "app-padding"])}>
        {/* Page header */}

        <div
          className={cx("referral-hdr")}
          style={{
            backgroundImage: `url(${require("../../../assets/images/Group_80.png")})`,
          }}
        >
          <div className={cx("left")}>
            <div className={cx("title")}>{t('Referrals.inviteText')}</div>
            <div className={cx("referral-field")}>
              <div className={cx("lit")}>
                <div className={cx("lbl")}>{t('Referrals.rLink')}</div>
              </div>
              <div className={cx("rit")}>
                <div className={cx(["link", "referral-link"])}>
                  {referralLink}
                </div>
                <CopyToClipboard
                  text={referralLink}
                  onCopy={() => dispatchAlert("Referral Link Copied")}
                >
                  <button className={cx("copy-btn")}>
                    <CopyIcon />
                  </button>
                </CopyToClipboard>
              </div>
            </div>
          </div>
          <div className={cx("right")}>
            <div className={cx("total-signup")}>
              <span className={cx("num")}>{referrals.data.length}</span>
              <span className={cx("txt")}>{t('Referrals.totalSignUp')}</span>
            </div>
          </div>
        </div>

        {/* Details Table */}
        <div className={cx("details-table")}>
          <div className={cx(["table-hdr", "row"])}>
            <div className={cx("col")}>
              <div className={cx("text")}>Serial #</div>
            </div>
            <div className={cx("col")}>
              <div className={cx("text")}>Name</div>
            </div>
            <div className={cx("col")}>
              <div className={cx("text")}>Date</div>
            </div>
          </div>
          <div className={cx("list")}>
            {referrals.data.map((item, index) => (
              <ReferralsList item={item} key={index} index={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
