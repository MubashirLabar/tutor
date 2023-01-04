import React, { useEffect, useRef, useState } from "react";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { EditIcon, VerifyIcon } from "../../../assets/svgIcons";
import { createModuleStyleExtractor } from "../../../utils/css";
import styles from "./agentProfile.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { useAgent } from "../../../hooks/useAgent";
import { useDispatch, useSelector } from "../../../stores/rootReducer";
import { selectAgentFetching } from "../../../stores/agents/selectors";
import { Loading } from "../../molecules/Loading/Loading";
import { createPascelCaseName } from "../../../utils/common";
import SingleChatModal from "../Messenger/single-chat-modal";
import { ClickableIcon } from "../../molecules/ClickableIcon/ClickableIcon";
import { useUser } from "../../../hooks/useUser";
import { mockJobs } from ".";

import RichTextEditor from "react-rte";
import type { EditorValue } from "react-rte";
import { noop } from "../../../utils/noop";
import {
  authRequestInProcessing,
  doUpdateContactInfo,
  selectImageUploading,
} from "../../../stores/users";
import { IUpdateContactInfo } from "../../../types/context/auth";
import { doCreateAlert } from "../../../stores/alert";

import { Modal } from "../../atoms/Modal";
import { currentAlertState } from "../../../stores/alert/selectors";
import Alert from "../../atoms/Alert/Alert";
import { ProfilePictureModal } from "../../molecules/ProfilePictureModal/ProfilePictureModal";
import { CoverPictureModal } from "../../molecules/CoverPictureModal/CoverPictureModal";
import CopyToClipboard from "react-copy-to-clipboard";
import LinkIcon2 from "../../../assets/svgIcons/LinkIcon2";
import { useTranslation } from "react-i18next";

const cx = createModuleStyleExtractor(styles);

export const AgentProfile = () => {
  type GroupName =
    | "INLINE_STYLE_BUTTONS"
    | "BLOCK_TYPE_BUTTONS"
    | "LINK_BUTTONS"
    | "BLOCK_TYPE_DROPDOWN"
    | "HISTORY_BUTTONS"
    | "IMAGE_BUTTON";

  const display: GroupName[] = [
    "INLINE_STYLE_BUTTONS",
    "BLOCK_TYPE_BUTTONS",
    "LINK_BUTTONS",
    "BLOCK_TYPE_DROPDOWN",
    "HISTORY_BUTTONS",
  ];
  const toolbarConfig = {
    // Optionally specify the groups to display (displayed in the order listed).
    display: display,
    INLINE_STYLE_BUTTONS: [
      { label: "Bold", style: "BOLD", className: cx("custom-css-class") },
      { label: "Italic", style: "ITALIC" },
      { label: "Underline", style: "UNDERLINE" },
    ],
    BLOCK_TYPE_DROPDOWN: [
      { label: "Normal", style: "unstyled" },
      { label: "Heading Large", style: "header-one" },
      { label: "Heading Medium", style: "header-two" },
      { label: "Heading Small", style: "header-three" },
    ],
    BLOCK_TYPE_BUTTONS: [
      { label: "UL", style: "unordered-list-item" },
      { label: "OL", style: "ordered-list-item" },
    ],
  };
  const [activeWorkTab, setActiveWorkTab] = useState("completed-jobs");

  const [workList, setWorkList] = useState(mockJobs);
  const dispatch = useDispatch();
  const alert = useSelector(currentAlertState);
  const imageUploading = useSelector(selectImageUploading);
  const { t } = useTranslation();
  const [isEditCoverPhoto, setIsEditCoverPhoto] = useState(false);
  const [isEditProfilePhoto, setIsEditProfilePhoto] = useState(false);
  const [isEditProfileDetial, setIsEditProfileDetial] = useState(false);
  const [isEditServiceDetail, setIsEditServiceDetail] = useState(false);

  const user = useUser();
  const { id } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();
  const { agent } = useAgent(`${id}`);
  const [singleChatModal, toggleSingleChatModal] = useState<boolean>(false);
  const agentFetching = useSelector(selectAgentFetching);
  const processing = useSelector(authRequestInProcessing);

  const inputFile = useRef<HTMLInputElement>(null);
  const [info, setInfo] = useState({
    first_name: user?.first_name,
    last_name: user?.last_name,
    company_name: agent ? agent.company_name : "",
    company_description: agent ? agent.company_description : "",
  });

  const [serviceInfo, setServiceinfo] = useState({
    title: agent ? agent.service?.title : "",
    description: agent ? agent.service?.description : "",
  });

  const dispatchAlert = (message: string, type: string = "DANGER") => {
    dispatch(doCreateAlert({ active: true, message, type }));
  };

  const onContactInfoSubmit = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (!info?.first_name || !info.last_name) {
      dispatchAlert("All fields are required :");
    }
    if (user) {
      dispatch(
        doUpdateContactInfo(
          info as IUpdateContactInfo,
          user._id,
          user.user_type
        )
      );
    }
  };

  const onChangeContactInfo = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInfo({
      ...info,
      [event.target.name]: event.target.value,
    });
  };

  const [backgroundImage, setBackgroundImage] = useState<string>(
    agent?.image_path || "/assets/images/profile.png"
  );

  const [backgroundCoverImage, setBackgroundCoverImage] = useState<string>(
    agent?.cover_picture_path || "/assets/images/agent-cover-profile.png"
  );

  const redirectForChat = () => {
    token
      ? toggleSingleChatModal(!singleChatModal)
      : navigate(
        `/auth?agent_id=${agent._id}&referral_code=${agent.referral_code
        }&redirect_uri=${`/dashboard/agents/${agent._id}`}`
      );
  };

  const handleEditProfileDetailClose = () => {
    setIsEditProfileDetial(false);
  };

  const handleEditServiceDetailClose = () => {
    setIsEditServiceDetail(false);
  };

  useEffect(() => {
    if (alert.type === "SUCCESS") {
      setIsEditProfileDetial(false);
      setIsEditProfilePhoto(false);
      setIsEditCoverPhoto(false);

      setIsEditServiceDetail(false);
    }
  }, [alert]);

  const onImageChooseButtonClick = () => {
    if (inputFile) {
      inputFile.current?.click();
    }
  };

  const reflectImages = () => {
    if (agent) {
      if (agent?.image_path && agent.image_path !== "") {
        setBackgroundImage(agent.image_path);
      }
      if (agent.cover_picture_path && agent.cover_picture_path !== "") {
        setBackgroundCoverImage(agent.cover_picture_path);
      }
    }
  };
  useEffect(() => {
    if (!agent) return;

    if (user) {
      setInfo({
        ...info,
        first_name: user.first_name,
        last_name: user.last_name,
      });
    }

    if (token) {
      if (user) {
        /** update the persoanl information */

        if (user._id === agent.user_id) {
          //if logged in user is browsing his own profile
          if (user?.image_path && user.image_path !== "") {
            setBackgroundImage(user.image_path);
          }

          if (user.cover_picture_path && user.cover_picture_path !== "") {
            setBackgroundCoverImage(user.cover_picture_path);
          }
        } else {
          reflectImages();
        }
      }
    } else {
      reflectImages();
    }
  }, [user, agent]);

  const initialState = RichTextEditor.createEmptyValue();
  const [richText, setRichText] = useState<{
    value: EditorValue;
    format: string;
    readOnly: boolean;
  }>({
    value: initialState,
    format: "html",
    readOnly: false,
  });

  const pascalCaseString = (input: string) => {
    if (input && input.length > 0) {
      return input.charAt(0).toUpperCase() + input.substring(1);
    }
    return input;
  };

  const onSubmitServiceInfo = (event: any) => {
    user &&
      dispatch(
        doUpdateContactInfo(
          {
            service: {
              ...serviceInfo,
              description: richText.value.toString("html"),
            },
          },
          user?._id,
          user.user_type
        )
      );
  };

  useEffect(() => {
    if (agent) {
      setInfo({
        ...info,
        company_name: agent.company_name,
        company_description: agent.company_description,
      });

      setServiceinfo({
        title: agent.service ? agent.service.title : "",
        description: agent.service ? agent.service.description : "",
      });
      setRichText({
        ...richText,
        value: agent.service
          ? initialState.setContentFromString(agent.service.description, "html")
          : initialState,
      });
    }
  }, [agent]);
  const createContent = (html: string) => {
    return { __html: html };
  };
  const { value, format } = richText;
  return (
    <>
      {agent && (
        <div className={cx("agent-profile-page")}>
          {token && (
            <SingleChatModal
              recepient={{
                label: createPascelCaseName(
                  `${agent.first_name + " " + agent.last_name}`
                ),
                value: agent.user_id,
              }}
              visible={singleChatModal}
              hideSingleChatModal={() => toggleSingleChatModal(false)}
            />
          )}
          <div className={cx("agent-profile-wrapper")}>
            { }

            {/* Header section */}
            <div className={cx("profile-header-section")}>
              <div
                className={cx("banner-section")}
                style={{
                  backgroundImage: `url(${backgroundCoverImage})`,
                  backgroundSize: "contain",
                }}
              />
              {processing && <Loading />}
              {alert.active && (
                <Alert type={alert.type} message={alert.message} />
              )}
              {token && agent.user_id === user?._id && (
                <button
                  className={cx("edit-btn")}
                  onClick={() => setIsEditCoverPhoto(true)}
                >
                  <EditIcon />
                </button>
              )}

              <div className={cx("user-info")}>
                <div className={cx("user_dp-blk")}>
                  <div
                    className={cx("user-dp")}
                    style={{
                      backgroundImage: `url(${backgroundImage})`,
                    }}
                  />
                  {token && agent.user_id === user?._id && (
                    <button
                      className={cx(["edit-btn", "dp"])}
                      onClick={() => setIsEditProfilePhoto(true)}
                    >
                      <ClickableIcon
                        icon={<EditIcon />}
                        onIconClick={() => noop}
                      />
                    </button>
                  )}
                  <div className={cx("online-dot")} />
                </div>
                <div className={cx("user-row")}>
                  <div className={cx("meta")}>
                    <div className={cx("info")}>
                      <div className={cx("name")}>
                        {token && agent.user_id === user?._id
                          ? createPascelCaseName(
                            user.first_name + " " + user.last_name
                          )
                          : createPascelCaseName(
                            agent.first_name + " " + agent.last_name
                          )}
                      </div>
                      {token && agent.user_id === user?._id && (
                        <button
                          className={cx("edit-info")}
                          onClick={() => setIsEditProfileDetial(true)}
                        >
                          <EditIcon />
                        </button>
                      )}
                    </div>
                    <div className={cx("text")}>
                      {token && agent.user_id === user?._id
                        ? user.location?.city
                          ? pascalCaseString(user.location.city) + ", "
                          : ""
                        : pascalCaseString(
                          agent.location?.city
                            ? agent.location?.city.toLowerCase() + ", "
                            : ""
                        )}
                      {token && agent.user_id === user?._id
                        ? pascalCaseString(
                          user.location?.country ? user.location?.country : ""
                        )
                        : pascalCaseString(
                          agent.location?.country
                            ? agent.location?.country
                            : ""
                        )}{" "}
                      {new Date().toLocaleString().split(" ")[1]} {t('Profile.Agent.localTimeText')}
                    </div>
                  </div>
                  <div className={cx("actions")}>
                    {token && user && agent && user._id === agent.user_id && (
                      <CopyToClipboard
                        text={`${window.location.origin.toString()}/agents/${user.agentProfile?._id
                          }`}
                        onCopy={() => dispatchAlert("Link Copied", "INFO")}
                      >
                        <button className={cx("copy-link")}>
                          <LinkIcon2 />
                          <div className={cx("copied")}>Copy to Clipboard</div>
                        </button>
                      </CopyToClipboard>
                    )}
                    {/* <>
                      <button
                        className={cx("action-btn")}
                        onClick={redirectForChat}
                      >
                        Chat
                      </button>
                      <button className={cx(["action-btn", "bg-transparent"])}>
                        Hire
                      </button>
                    </> */}

                    {!token ? (
                      <button
                        className={cx("action-btn")}
                        onClick={redirectForChat}
                      >
                        Chat
                      </button>
                    ) : (
                      <>
                        {user && agent && user._id !== agent.user_id && (
                          <button
                            className={cx("action-btn")}
                            onClick={redirectForChat}
                          >
                            Chat
                          </button>
                        )}
                      </>
                    )}
                    {/* <button className={cx(["action-btn", "bg-transparent"])}>
                      Hire
                    </button> */}
                  </div>
                </div>
              </div>
            </div>

            {/* Agent Content */}
            <div className={cx("agent-content")}>
              {/* Content Sidebar */}
              <div className={cx("content-sidebar")}>
                <div className={cx("block")}>
                  <div className={cx("item")}>
                    <div className={cx("lbl")}>$10k+</div>
                    <div className={cx("txt")}>{t('Profile.Agent.totalEarnings')}</div>
                  </div>
                  <div className={cx("item")}>
                    <div className={cx("lbl")}>15</div>
                    <div className={cx("txt")}>{t('Profile.Agent.totalJobs')}</div>
                  </div>
                </div>

                <div className={cx("block")}>
                  <div className={cx(["item", "verify"])}>
                    <div className={cx("lbl")}>{t('Profile.Agent.verifications')}</div>
                    <div className={cx("id")}>
                      <div className={cx("txt")}>{t('Profile.Agent.id')}</div>
                      <div className={cx("badge")}>
                        <VerifyIcon />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content Wrap */}
              <div className={cx("content-wrap")}>
                <div className={cx("service-block")}>
                  <div className={cx(["blk", "hdr"])}>
                    <div className={cx("title")}>
                      {serviceInfo.title && serviceInfo.title !== ""
                        ? serviceInfo.title
                        : t('Profile.Agent.serviceTitle')}
                    </div>
                    {token && agent.user_id === user?._id && (
                      <button
                        className={cx("edit-service")}
                        onClick={() => setIsEditServiceDetail(true)}
                      >
                        <EditIcon />
                      </button>
                    )}
                  </div>

                  {/* <div className={cx("blk")}>
                    <div className={cx("text")}>
                      {serviceInfo.description &&
                        serviceInfo.description !== "" &&
                        richText.value.toString("markup")}
                    </div>
                  </div> */}

                  {serviceInfo.description && serviceInfo.description !== "" ? (
                    <div className={cx("blk")}>
                      <div
                        dangerouslySetInnerHTML={createContent(
                          serviceInfo.description
                        )}
                        className={cx(["text", "rich-text-container"])}
                        style={{
                          alignContent: "baseline",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "flex-start",
                        }}
                      ></div>
                    </div>
                  ) : (
                    <>
                      <div className={cx("blk")}>
                        <div className={cx("text")}>
                          I am an aesthetic professional User Experience and
                          User Interface designer with 5+ years of experience in
                          the relevant field. I use all my expert skills to
                          create unique products that connect brands and
                          companies with their customers. I can help you with
                          your website, web/desktop apps and mobile apps design.
                        </div>
                      </div>

                      <div className={cx("blk")}>
                        <div className={cx("text")}>
                          My Area of expertise are:
                        </div>
                        <div className={cx("text")}>
                          <span className={cx("dot")} />
                          &nbsp;iOS and Android App Design
                        </div>
                        <div className={cx("text")}>
                          <span className={cx("dot")} />
                          &nbsp;Product Design
                        </div>
                        <div className={cx("text")}>
                          <span className={cx("dot")} />
                          &nbsp;Webapp and SaaS Design
                        </div>
                        <div className={cx("text")}>
                          <span className={cx("dot")} />
                          &nbsp;Website Design
                        </div>
                        <div className={cx("text")}>
                          <span className={cx("dot")} />
                          &nbsp;Landing Pages Design
                        </div>
                      </div>

                      <div className={cx("blk")}>
                        <div className={cx("text")}>
                          I got expert-level abilities in design thinking,
                          wireframing, UX interactive prototyping, and final UI
                          graphics production. Highly skilled in using software
                          like Figma, Sketch, Adobe XD etc.
                        </div>
                      </div>
                    </>
                  )}
                </div>

                <div className={cx("work-block")}>
                  <div className={cx("blk")}>
                    <div className={cx("title")}>{t('Profile.Agent.workhistory')}</div>
                    <div className={cx("tabs")}>
                      <div
                        className={cx([
                          "tab",
                          activeWorkTab === "completed-jobs" ? "active" : "",
                        ])}
                        onClick={() => setActiveWorkTab("completed-jobs")}
                      >
                        {t('Profile.Agent.completedJobs')} (4)
                      </div>
                      <div
                        className={cx([
                          "tab",
                          activeWorkTab === "in-progress" ? "active" : "",
                        ])}
                        onClick={() => setActiveWorkTab("in-progress")}
                      >
                        {t('Profile.Agent.inProgress')} (2)
                      </div>
                    </div>
                  </div>
                </div>

                {/* Jobs  Completed || In Process */}
                <div className={cx("work-list-block")}>
                  {activeWorkTab === "completed-jobs" ? (
                    <>
                      {workList.map((item, index) => (
                        <div key={index} className={cx("completed-job-card")}>
                          <div className={cx("card-hdr")}>
                            <div className={cx("card-title")}>
                              Graduate School{" "}
                            </div>
                            <div className={cx("stamps")}>
                              <div className={cx("stars")}>
                                {[1, 2, 3, 4, 5].map((item, index) => (
                                  <li
                                    key={index.toString()}
                                    className={cx("star")}
                                  >
                                    <FontAwesomeIcon icon={faStar} />
                                  </li>
                                ))}
                              </div>
                              <div className={cx("rating")}>5.00</div>
                              <div className={cx("date")}>Feb 02,2022</div>
                            </div>
                          </div>
                          <div className={cx("description")}>
                            This is my second time working with him and once
                            again he delivered what I asked in a timely manor. I
                            am once again happy with the product he delivered
                            and would definitely be working with him again in
                            the future and would recommend him.
                          </div>
                          <div className={cx("card-ftr")}>
                            <div className={cx("price")}>$300</div>
                            <div className={cx("dot")} />
                            <div className={cx("price-lbl")}>{t('Profile.Agent.fixedPrice')}</div>
                          </div>
                        </div>
                      ))}
                    </>
                  ) : (
                    <>
                      {workList.map((item, index) => (
                        <div key={index} className={cx("progress-job-card")}>
                          <div className={cx("card-hdr")}>
                            <div className={cx("card-title")}>{item.title}</div>
                            <div className={cx("stamps")}>
                              <div className={cx("date")}>
                                Feb 02,2022 - Present
                              </div>
                            </div>
                          </div>
                          <div className={cx("card-ftr")}>
                            <div className={cx("job-status")}>
                              Job in progress
                            </div>
                            <div className={cx("price-lbl")}>
                              {item.pay_type}
                            </div>
                          </div>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {agentFetching && <Loading />}
      {!agentFetching && !agent && (
        <div className={cx("agent-not-found")}>
          <h3> No Agent Found </h3>
        </div>
      )}

      {agent && (
        <>
          <CoverPictureModal
            toggle={isEditCoverPhoto}
            onCloseModal={() => setIsEditCoverPhoto(false)}
          />
          <ProfilePictureModal
            toggle={isEditProfilePhoto}
            onCloseModal={() => setIsEditProfilePhoto(false)}
          />

          {/* Edit Profile Details Modal*/}
          <Modal
            open={isEditProfileDetial}
            onClose={handleEditProfileDetailClose}
          >
            <div className={cx("edit-profile-details-modal")}>
              <div className={cx("modal-hdr")}>
                <div className={cx("modal-title")}>Edit Profile Details</div>
                <div
                  className={cx("modal-cross-btn")}
                  onClick={handleEditProfileDetailClose}
                >
                  &times;
                </div>
              </div>
              <div className={cx("modal-content")}>
                {processing && isEditProfileDetial && <Loading />}
                <div className={cx("form")}>
                  <div className={cx("field")}>
                    <div className={cx("lbl")}>First Name</div>
                    <input
                      type="text"
                      placeholder="First Name"
                      className={cx("iput")}
                      name="first_name"
                      onChange={onChangeContactInfo}
                      value={info.first_name || ""}
                    />
                  </div>
                  <div className={cx("field")}>
                    <div className={cx("lbl")}>Last Name</div>
                    <input
                      type="text"
                      placeholder="Last Name"
                      className={cx("iput")}
                      name="last_name"
                      onChange={onChangeContactInfo}
                      value={info.last_name || ""}
                    />
                  </div>
                  <div className={cx("field")}>
                    <div className={cx("lbl")}>Company Title</div>
                    <input
                      type="text"
                      placeholder="Company Name"
                      className={cx("iput")}
                      name="company_name"
                      onChange={onChangeContactInfo}
                      value={info.company_name || ""}
                    />
                  </div>
                  <div className={cx("field")}>
                    <div className={cx("lbl")}>Company Description</div>
                    <textarea
                      placeholder="Company Description"
                      className={cx("iput")}
                      name="company_description"
                      onChange={(event) =>
                        setInfo({
                          ...info,
                          company_description: event.target.value,
                        })
                      }
                      value={info.company_description || ""}
                    ></textarea>
                  </div>
                  {/* <div className={cx("field")}>
                    <div className={cx("lbl")}>Time Zone</div>
                    <button
                      className={cx("custom-selector")}
                      onClick={(e) => {
                        e.stopPropagation();
                        setDropTimeZoneSelector(!dropTimeZoneSelctor);
                      }}
                    >
                      {timeZoneList.map(
                        (item, index) =>
                          timeZone == item.label && (
                            <div
                              className={cx("selector-input")}
                              key={index.toString()}
                            >
                              <div className={cx("selected-text")}>
                                {item.label}
                              </div>
                              <div className={cx("arrow-icon")}>
                                <DropDownIcon />
                              </div>
                            </div>
                          )
                      )}
                      {dropTimeZoneSelctor && (
                        <div className={cx("selector-options")}>
                          {timeZoneList.map((item, index) => (
                            <button
                              key={index}
                              className={cx("selector-option-item")}
                              onClick={() => {
                                setTimeZone(item.label);
                                setInfo({
                                  ...info,
                                  location: {
                                    ...info.location,
                                    time_zone: item.label,
                                  },
                                });
                              }}
                            >
                              <div className={cx("option-item-txt")}>
                                {item.label}
                              </div>
                            </button>
                          ))}
                        </div>
                      )}
                    </button>
                  </div> */}
                  {/* <div className={cx("field")}>
                    <div className={cx("lbl")}>Country</div>
                    <input
                      type="text"
                      placeholder="Country"
                      className={cx("iput")}
                      name="country"
                      value={info.location.country || ""}
                      onChange={onChangeLocationInfo}
                    />
                  </div>
                  <div className={cx("field")}>
                    <div className={cx("lbl")}>Street Address</div>
                    <input
                      type="text"
                      placeholder="Street Address"
                      className={cx("iput")}
                      name="address"
                      value={info.location.address || ""}
                      onChange={onChangeLocationInfo}
                    />
                  </div>
                  <div className={cx("field")}>
                    <div className={cx("lbl")}>City</div>
                    <input
                      type="text"
                      value={info.location.city || ""}
                      onChange={onChangeLocationInfo}
                      name="city"
                      placeholder="City"
                      className={cx("iput")}
                    />
                  </div> */}
                </div>
                <div className={cx("actions")}>
                  <div
                    className={cx(["action-btn", "transparent"])}
                    onClick={handleEditProfileDetailClose}
                  >
                    Cancel
                  </div>
                  <div
                    className={cx("action-btn")}
                    onClick={onContactInfoSubmit}
                  >
                    Update
                  </div>
                </div>
              </div>
            </div>
          </Modal>

          {/* Edit Service Details Modal*/}
          <Modal
            open={isEditServiceDetail}
            onClose={handleEditServiceDetailClose}
          >
            <div className={cx("edit-service-details-modal")}>
              <div className={cx("modal-hdr")}>
                <div className={cx("modal-title")}>Edit Service Details</div>
                <div
                  className={cx("modal-cross-btn")}
                  onClick={handleEditServiceDetailClose}
                >
                  &times;
                </div>
              </div>
              <div className={cx("modal-content")}>
                <div className={cx("form")}>
                  <div className={cx("field")}>
                    <div className={cx("lbl")}>Service Title</div>
                    <input
                      type="text"
                      placeholder="Service Title"
                      className={cx("iput")}
                      name="service_title"
                      onChange={(event) =>
                        setServiceinfo({
                          ...serviceInfo,
                          title: event?.target.value,
                        })
                      }
                      value={serviceInfo.title || ""}
                    />
                  </div>
                  <div className={cx("")}>
                    <div className={cx("")}>Service Details</div>
                    <RichTextEditor
                      value={value}
                      className={cx("react-rte-demo")}
                      editorClassName={cx("service-demo-editor")}
                      placeholder="Write about your Services"
                      onChange={(value) =>
                        setRichText({
                          ...richText,
                          value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className={cx("actions")}>
                  <div
                    className={cx(["action-btn", "transparent"])}
                    onClick={handleEditServiceDetailClose}
                  >
                    Cancel
                  </div>
                  <div
                    className={cx("action-btn")}
                    onClick={onSubmitServiceInfo}
                  >
                    Update
                  </div>
                </div>
              </div>
            </div>
          </Modal>
        </>
      )}
    </>
  );
};
