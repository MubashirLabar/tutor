import React, { useEffect, useState, useRef, } from "react";
import styles from "./newAgentProfile.module.scss";
import { createModuleStyleExtractor } from "../../../utils/css";
import { EditIcon, VerifyIcon } from "../../../assets/svgIcons";
import StarIcon from "../../../assets/svgIcons/StarIcon";
import shieldImage from "../../../assets/images/shield.png"

import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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

export const NewAgentProfile = () => {
  const [activeWorkTab, setActiveWorkTab] = useState("completed-jobs");
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

  const [ activeTab, setActiveTab ] = useState('About Us')

  const tabs: string[] = [
    'About Us',
    'Services We Offer',
    'Work History',
  ]
  
  const renderTab = () => {
    if (activeTab === 'About Us'){
      return (
        <AboutUs
          setIsEditServiceDetail={setIsEditServiceDetail}
          createContent={createContent}
          serviceInfo={serviceInfo}
          t={t}
        />
      )
    } else if (activeTab === 'Services We Offer'){
      return (
        <ServicesWeOffer
          topHeading={'Service Title'}
          bullets={['iOS and Android App Design', 'Product Design', 'Webapp and SaaS Design', 'Website Design', 'Landing Pages Design',]}
          botttomLine={'I got expert-level abilities in design thinking, wireframing, UX interactive prototyping, and final UI graphics production. Highly skilled in using software like Figma, Sketch, Adobe XD etc.'}
        />
      )
    } else if (activeTab === 'Work History') {
      return (
        <WorkHistory
          pastJobDetails={[{name:'Graduate School ', rating: 5.00, ratingDate:'Feb 02,2022', feedback:'This is my second time working with him and once again he delivered what I asked in a timely manor. I am once again happy with the product he delivered and would definitely be working with him again in the future and would recommend him.', earning:'Private Earnings'}, {name:'Graduate School ', rating:5.00, ratingDate:'Feb 02,2022', feedback:'This is my second time working with him and once again he delivered what I asked in a timely manor. I am once again happy with the product he delivered and would definitely be working with him again in the future and would recommend him.', earning:'Private Earnings'},]}
        />
      )
    }
  }

  const getStyle = (): string => {
    if (activeTab === 'About Us'){
      return 'tabs-container-medium'
    } else if (activeTab === 'Services We Offer'){
      return 'tabs-container-small'
    } else if (activeTab === 'Work History'){
      return 'tabs-container-large'
    } else {
      return 'tabs-container-small'
    }
  }

  const showFullName = (): string | undefined => {
    if (user && token && agent.user_id === user?._id){
      if (user.first_name){
        return createPascelCaseName(user.first_name + " " + user.last_name)
      } else if (user.full_name) {
        return createPascelCaseName(user.full_name)
      }
    } else if (agent && token && agent.user_id === user?._id){
      if (agent.first_name){
        return createPascelCaseName(agent.first_name + " " + agent.last_name)
      } else if (agent.company_name){
        return createPascelCaseName(agent.company_name)
      }
    } else {
      return 'Brandon Lipshutz'
    }
  }

  return (
    <>
      {agent && (
        <div className={cx("Dashbord--Root")}>
          <div>
            <img
              src={backgroundCoverImage}
              alt=""
              className={cx("banner-image")}
            />
            <button className={cx("edit-circle-cover")} onClick={() => setIsEditCoverPhoto(true)}>
              <div style={{height:28, width: 28, padding: '5px', borderRadius: '50%', border: '1px solid #828282', background: '#FFFFFF', margin: 'auto',}}>
                <EditIcon/>
              </div>
            </button>
          </div>
          {processing && <Loading />}
          {alert.active && (
            <Alert type={alert.type} message={alert.message} />
          )}


          <div className={cx("content-container")}>
            <div className={cx("image-container")}>
              <img
                src={backgroundImage}
                className={cx("roundImage")}
                alt=""
              />
              <div className={cx("filled-circle")}></div>

              <button className={cx("edit-circle")} onClick={() => setIsEditProfilePhoto(true)}>
                <div style={{height:12, width: 12, margin: 'auto'}}>
                  <EditIcon/>
                </div>
              </button>
                            
            </div>

            <div className={cx("heading-icon")}>
              <p className={cx("heading")}>
                {showFullName()}
              </p>
              <div className={cx("icon-wrapper")}>
                <button className={cx("icon")} onClick={() => setIsEditProfileDetial(true)}>
                  <EditIcon/>
                </button>            
              </div>
            </div>

            <p className={cx("below-heading")}>
              Texas, Austin USA  -  10:00 am local time
            </p>

            <div className={cx(getStyle())}>
              <div className={cx("tabs-topbar")}>
                {tabs.map((tabName) => (
                  <button key={tabName} className={cx((activeTab === tabName) ? "tab-active" : "tab")} onClick={() => setActiveTab(tabName)}>
                    {tabName}
                  </button>
                ))}
              </div>

              <div className={cx("tabs-content-container")}>
                {renderTab()}

                <div className={cx("tab-summary-container")}>
                  <div className={cx("summary-container")}>
                    <p className={cx("heading")}>
                      EduX Activity
                    </p>

                    <div className={cx("summary-details")}>
                      <p className={cx("heading-with-info")}>
                        $10k+ <br/> <span className={cx("info")}>Total Earnings</span>
                      </p>
                      <p className={cx("heading-with-info")}>
                        15 <br/> <span className={cx("info")}>Total Jobs</span>
                      </p>
                      <p className={cx("heading-with-info")}>
                        8278 <br/> <span className={cx("info")}>Total Hours</span>
                      </p>
                      <p className={cx("heading-with-info")}>
                        Jan 03,2019 <br/> <span className={cx("info")}>Member Since</span>
                      </p>
                    </div>

                    <p className={cx("heading-bottom")}>
                      Verifications
                    </p>
                    <div className={cx("text-icon")}>
                      <p className={cx("text")}>
                        ID: Verified
                      </p>
                      <img
                        src={shieldImage}
                        className={cx("icon-shield")}
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>


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
        </div>
      )}
    </>
  )
}


const AboutUs = ({
  setIsEditServiceDetail,
  createContent,
  serviceInfo,
  t,
} : {
  setIsEditServiceDetail: (value: boolean) => void;
  createContent: (html: string) => {__html: string }
  serviceInfo: {title: string | undefined, description: string | undefined};
  t: (text: string) => string;
}) => {
  

  return (
    <div className={cx("content-container-tabs")}>
      <div className={cx("content")}>

        <div className={cx("content-block")} style={{display: 'flex', flexDirection: 'row',}}>
          <div style={{flex: 8}}>
            
            {serviceInfo.title && serviceInfo.title !== ""
              ? serviceInfo.title
              : "🏆 Upwork Certified User Experience Designer 🏆" } {/*t('Profile.Agent.serviceTitle')*/}            
          </div>
          <button className={cx("edit-circle")} style={{flex: 1,}} onClick={() => setIsEditServiceDetail(true)}>
            <div style={{height:22, width: 22, padding: '5px', borderRadius: '50%', border: '1px solid #828282', background: '#FFFFFF', float: 'right'}}>
              <EditIcon/>
            </div>
          </button>
        </div>
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
            <div className={cx("content-block")}>
              <div className={cx("text")}>
                I am an aesthetic professional User Experience and
                User Interface designer with 5+ years of experience in
                the relevant field. I use all my expert skills to
                create unique products that connect brands and
                companies with their customers. I can help you with
                your website, web/desktop apps and mobile apps design.
              </div>
            </div>

            <div className={cx("content-block")}>
              <div className={cx("text")}>
                My Area of expertise are:
              </div>
              <div className={cx("text")}>
                <span className={cx("dot")} />
                • iOS and Android App Design
              </div>
              <div className={cx("text")}>
                <span className={cx("dot")} />
                • Product Design
              </div>
              <div className={cx("text")}>
                <span className={cx("dot")} />
                • Webapp and SaaS Design
              </div>
              <div className={cx("text")}>
                <span className={cx("dot")} />
                • Website Design
              </div>
              <div className={cx("text")}>
                <span className={cx("dot")} />
                • Landing Pages Design
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
    </div>
  )
}

const ServicesWeOffer = ({
  topHeading,
  bullets,
  botttomLine,
} : {
  topHeading: string;
  bullets: string[];
  botttomLine: string;
}) => {
  return (
    <div className={cx("content-container-tabs")}>
      <div className={cx("content")}>
        <p className={cx("content-heading")}>
          {topHeading}
        </p>
        <p className={cx("content-block")}>
          My Area of expertise are:
          {bullets.map((bullet, index) => (
            <p key={String(index)} className={cx("content-bullet")}>
              • {bullet}
            </p>
          ))}
        </p>        
        <p className={cx("content-block")}>
          {botttomLine}
        </p>
      </div>
    </div>
  )
}


const WorkHistory = ({
  pastJobDetails
} : {
  pastJobDetails: {name: string; rating: number; ratingDate: string; feedback: string; earning: string;}[];
}) => {

  const getStars = (rating: number) => {
    const stars: number[] = Array.from(Array(Math.floor(rating)))
    return stars.map((x, index) => {
      return(
        <div key={String(index)} className={cx("star")}>
          <StarIcon/>
        </div>
      )
  })}

  return (
    <div className={cx("past-jobs-tab")}>
      {pastJobDetails.map((jobDetail, index) => (
        <div className={cx("past-job-wrapper")} key={String(index)}>
          <div className={cx("past-job")}>
            <p className={cx("content-heading")}>
              {jobDetail.name}
            </p>

            <div className={cx("ratings-container")}>
              <div className={cx("stars-container")}>
                {getStars(Number(jobDetail.rating))}
              </div>
              <p className={cx("rating")}>
                {(Math.round(jobDetail.rating * 100) / 100).toFixed(2)}
              </p>
              <p className={cx("rating-date")}>
                {jobDetail.ratingDate}
              </p>
            </div>

            <p className={cx("content-block")}>
              {jobDetail.feedback}
            </p>

            <p className={cx("earning")}>
              {jobDetail.earning}
            </p>

          </div>            
        </div>
      ))}
    </div>
  )
}
