import React, { memo, useRef, useCallback, useEffect, useState } from "react";
import { createModuleStyleExtractor } from "../../../utils/css";
import { DropDownIcon, EditIcon } from "../../../assets/svgIcons";
import styles from "./SettingContactInfo.module.scss";
import { useDispatch, useSelector } from "../../../stores/rootReducer";
import {
  authRequestInProcessing,
  currentUserInfo,
  doFetchUser,
  doUpdateContactInfo,
  doUpdateProfileImage,
  selectImageUploading,
} from "../../../stores/users";
import { IUpdateContactInfo } from "../../../types/context/auth";
import axiosHttp from "../../../services/axios.service";
import { createPascelCaseName } from "../../../utils/common";
import { Loading } from "../Loading/Loading";
import { useAgent } from "../../../hooks/useAgent";
import { useParams } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";

import { Modal } from "../../atoms/Modal";
import { currentAlertState } from "../../../stores/alert/selectors";
import Alert from "../../atoms/Alert/Alert";
import { doCreateAlert } from "../../../stores/alert";
import { ClickableIcon } from "../../molecules/ClickableIcon/ClickableIcon";
import { noop } from "../../../utils/noop";
import { ProfilePictureModal } from "../ProfilePictureModal/ProfilePictureModal";
import { CoverPictureModal } from "../CoverPictureModal/CoverPictureModal";

const cx = createModuleStyleExtractor(styles);

export const SettingContactInfo = () => {
  const { id } = useParams();
  const { token } = useAuth();
  const [editAccountSetting, setEditAccountSetting] = useState(false);
  const [editLocationSetting, setEditLocationSetting] = useState(false);
  const [editProfilePicture, setEditProfilePicture] = useState(false);
  const processing = useSelector(authRequestInProcessing);

  const [isEditCoverPhoto, setIsEditCoverPhoto] = useState(false);
  const [isEditProfilePhoto, setIsEditProfilePhoto] = useState(false);
  const imageUploading = useSelector(selectImageUploading);
  const [timeZone, setTimeZone] = useState("UTC+06:00 Almaty, United States");
  const [dropTimeZoneSelctor, setDropTimeZoneSelector] = useState(false);
  const timeZoneList = [
    { label: "UTC+06:00 Almaty, United States" },
    { label: "UTC+09:00 Almaty, States" },
    { label: "UTC+10:00 Almaty, United States" },
    { label: "UTC+11:00 Almaty, United States" },
    { label: "UTC+12:00 Almaty, United" },
  ];

  useEffect(() => {
    document.body.addEventListener("click", () => {
      setDropTimeZoneSelector(false);
    });
  }, []);

  const dispatch = useDispatch();
  const alert = useSelector(currentAlertState);
  const user = useSelector((store) => currentUserInfo(store));

  const [info, setInfo] = useState({
    first_name: user?.first_name,
    last_name: user?.last_name,
  });

  const [location, setLocation] = useState({ ...user?.location });

  useEffect(() => {
    if (!user) dispatch(doFetchUser());
    if (user) {
      setInfo({
        first_name: user.first_name,
        last_name: user.last_name,
      });

      setLocation({
        ...location,
        ...user.location,
      });
    }
  }, [user, dispatch]);

  const { type } = useSelector(currentAlertState) || {};
  const [image, setImage] = useState({ preview: "", data: "" });
  const [cover, setCover] = useState({ preview: "", data: "" });
  const [profile, setProfile] = useState({
    preview: "",
    data: "",
  });

  const { agent } = useAgent(`${id}`);

  const [backgroundImage, setBackgroundImage] = useState<string>(
    user?.image_path || "/assets/images/profile.png"
  );

  const [backgroundCoverImage, setBackgroundCoverImage] = useState<string>(
    user?.cover_picture_path || "/assets/images/agent-cover-profile.png"
  );

  const inputFile = useRef<HTMLInputElement>(null);

  const onChangeContactInfo = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInfo({
      ...info,
      [event.target.name]: event.target.value,
    });
  };

  const onChangeLocationInfo = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocation({
      ...location,
      [event.target.name]: event.target.value,
    });
  };

  const onContactInfoSubmit = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
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

  const onLocationInfoSubmit = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (user) {
      //console.log(location);
      dispatch(
        doUpdateContactInfo(
          { location } as IUpdateContactInfo,
          user._id,
          user.user_type
        )
      );
    }
  };

  const onImageChange = (e: any, is_cover: boolean = false) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    };

    !is_cover ? setImage(img) : setCover(img);
  };

  const handleEditCoverPhotoClose = () => {
    setIsEditCoverPhoto(false);
    setCover({
      preview: "",
      data: "",
    });
  };

  const handleEditProfilePhotClose = () => {
    setIsEditProfilePhoto(false);
    setProfile({
      preview: "",
      data: "",
    });
  };

  const onImageChooseButtonClick = () => {
    if (inputFile) {
      inputFile.current?.click();
    }
  };

  useEffect(() => {
    if (type === "SUCCESS") {
      if (editAccountSetting) {
        setEditAccountSetting(false);
      }
      if (editLocationSetting) {
        setEditLocationSetting(false);
      }

      if (cover.data) {
        setImage({ data: "", preview: "" });
      }
      if (image.data) {
        setCover({ data: "", preview: "" });
      }
    }
  }, [type]);

  useEffect(() => {
    if (user) {
      if (user.cover_picture_path && user.cover_picture_path !== "") {
        setBackgroundCoverImage(user.cover_picture_path);
      }
      if (user.image_path && user.image_path !== "") {
        setBackgroundImage(user.image_path);
      }
    }
  }, [user]);

  return (
    <>
      <div className={cx("setting-contact-info")}>
        {/* Account Info Block */}
        <div className={cx("info-block")}>
          <div className={cx("block-hdr")}>
            <div className={cx("hdr-title")}>Account</div>
            {!editAccountSetting && (
              <button
                className={cx("edit-btn")}
                onClick={() => setEditAccountSetting(true)}
              >
                <EditIcon />
              </button>
            )}
          </div>

          {user ? (
            <div className={cx("info-wrapper")}>
              {editAccountSetting ? (
                <div className={cx("setting-form")}>
                  <div className={cx("field")}>
                    <div className={cx("lbl")}>First Name</div>

                    <input
                      type="text"
                      className={cx("iput")}
                      name="first_name"
                      placeholder="First Name"
                      value={info.first_name ?? ""}
                      onChange={onChangeContactInfo}
                    />
                  </div>
                  <div className={cx("field")}>
                    <div className={cx("lbl")}>Last Name</div>
                    <input
                      type="text"
                      className={cx("iput")}
                      name="last_name"
                      placeholder="Last Name"
                      value={info.last_name ?? ""}
                      onChange={onChangeContactInfo}
                    />
                  </div>
                  <div className={cx("field")}>
                    <div className={cx("lbl")}>Email</div>
                    <input
                      type="text"
                      className={cx("iput")}
                      placeholder="Email Name"
                      value={user.email ?? ""}
                      readOnly
                    />
                  </div>
                  <div className={cx("actions")}>
                    <div
                      className={cx("action-btn")}
                      onClick={onContactInfoSubmit}
                    >
                      Update
                    </div>
                    <div
                      className={cx(["action-btn", "transparent"])}
                      onClick={() => setEditAccountSetting(false)}
                    >
                      Cancel
                    </div>
                  </div>
                </div>
              ) : (
                <div className={cx("info-row")}>
                  <div className={cx("info-row-col")}>
                    <div className={cx("item")}>
                      <div className={cx("lbl")}>User ID</div>
                      <div className={cx("txt")}>
                        {user && user._id.substring(0, 5) + "_user"}
                      </div>
                    </div>
                  </div>
                  <div className={cx("info-row-col")}>
                    <div className={cx("item")}>
                      <div className={cx("lbl")}>Name</div>
                      <div className={cx("txt")}>
                        {user
                          ? createPascelCaseName(
                              `${user.first_name + " " + user.last_name}`
                            )
                          : ""}
                      </div>
                    </div>
                  </div>
                  <div className={cx("info-row-col")}>
                    <div className={cx("item")}>
                      <div className={cx("lbl")}>Email</div>
                      <div className={cx("txt")}>{user && user.email} </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Loading />
          )}
        </div>

        {user && (
          <div className={cx("info-block")}>
            <div className={cx("block-hdr")}>
              <div className={cx("hdr-title")}>Location</div>
              {!editLocationSetting && (
                <button
                  className={cx("edit-btn")}
                  onClick={() => setEditLocationSetting(true)}
                >
                  <EditIcon />
                </button>
              )}
            </div>
            <div className={cx("info-wrapper")}>
              {editLocationSetting ? (
                <div className={cx("setting-form")}>
                  <div className={cx("field")}>
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
                                setLocation({
                                  ...location,
                                  time_zone: item.label,
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
                  </div>
                  <div className={cx("field")}>
                    <div className={cx("lbl")}>Country</div>
                    <input
                      type="text"
                      className={cx("iput")}
                      placeholder="Country"
                      value={location.country || ""}
                      name="country"
                      onChange={onChangeLocationInfo}
                    />
                  </div>
                  <div className={cx("field")}>
                    <div className={cx("lbl")}>Street Address</div>
                    <input
                      type="text"
                      className={cx("iput")}
                      placeholder="Street Address"
                      name="address"
                      onChange={onChangeLocationInfo}
                      value={location.address || ""}
                    />
                  </div>
                  <div className={cx("field")}>
                    <div className={cx("lbl")}>City</div>
                    <input
                      type="text"
                      className={cx("iput")}
                      placeholder="City"
                      name="city"
                      value={location.city || ""}
                      onChange={onChangeLocationInfo}
                    />
                  </div>
                  <div className={cx("field")}>
                    <div className={cx("lbl")}>Zip/Postal Code</div>
                    <input
                      type="text"
                      className={cx("iput")}
                      placeholder="Zip/Postal Code"
                      name="postal_code"
                      value={location.postal_code || ""}
                      onChange={onChangeLocationInfo}
                    />
                  </div>
                  {/* <div className={cx("field")}>
                  <div className={cx("lbl")}>Phone</div>
                  <div className={cx("field-row")}>
                    <input
                      type="text"
                      className={cx("iput")}
                      placeholder="United States"
                    />
                    <input
                      type="text"
                      className={cx("iput")}
                      placeholder="+110 281 29991 229"
                    />
                  </div>
                </div> */}
                  <div className={cx("actions")}>
                    <div
                      className={cx("action-btn")}
                      onClick={onLocationInfoSubmit}
                    >
                      Update
                    </div>
                    <div
                      className={cx(["action-btn", "transparent"])}
                      onClick={() => setEditLocationSetting(false)}
                    >
                      Cancel
                    </div>
                  </div>
                </div>
              ) : (
                <div className={cx("info-row")}>
                  <div className={cx("info-row-col")}>
                    <div className={cx("item")}>
                      <div className={cx("lbl")}>Time Zone</div>
                      <div className={cx("txt")}>UTC+06:00 Almaty, Dhaka</div>
                    </div>
                  </div>
                  <div className={cx("info-row-col")}>
                    <div className={cx("item")}>
                      <div className={cx("lbl")}>Address</div>
                      <div className={cx("txt")}>
                        {user.location?.address ?? "N/A"}
                      </div>
                    </div>
                  </div>
                  <div className={cx("info-row-col")}>
                    <div className={cx("item")}>
                      <div className={cx("lbl")}>City/Country</div>
                      <div className={cx("txt")}>
                        {user.location?.city ?? ""}{" "}
                        {user.location?.country ?? "N/A"}
                      </div>
                    </div>
                  </div>
                  <div className={cx("info-row-col")}>
                    <div className={cx("item")}>
                      <div className={cx("lbl")}>Zip/Postal Code</div>
                      <div className={cx("txt")}>
                        {user.location?.postal_code ?? "N/A"}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
        {processing && <Loading />}
        {user && (
          <div className={cx("info-block")}>
            <div className={cx("block-hdr")}>
              <div className={cx("hdr-title")}>Profile Picture</div>
            </div>
            <div className={cx("profile-pictures")}>
              <div
                className={cx("banner-section")}
                style={{
                  backgroundImage: `url(${backgroundCoverImage})`,
                  backgroundSize: "contain",
                }}
              />
              <button
                className={cx("edit-btn")}
                onClick={() => setIsEditCoverPhoto(true)}
              >
                <EditIcon />
              </button>
              <div className={cx("user-info")}>
                <div className={cx("user_dp-blk")}>
                  <div
                    className={cx("user-dp")}
                    style={{
                      backgroundImage: `url(${backgroundImage})`,
                    }}
                  />
                  <button
                    className={cx(["edit-btn", "dp"])}
                    onClick={() => setIsEditProfilePhoto(true)}
                  >
                    <ClickableIcon
                      icon={<EditIcon />}
                      onIconClick={() => noop}
                    />
                  </button>

                  <div className={cx("online-dot")} />
                </div>
              </div>
            </div>
          </div>
        )}

        <div></div>
      </div>

      {user && (
        <>
          <CoverPictureModal
            toggle={isEditCoverPhoto}
            onCloseModal={handleEditCoverPhotoClose}
          />
          <ProfilePictureModal
            toggle={isEditProfilePhoto}
            onCloseModal={handleEditProfilePhotClose}
          />
        </>
      )}
    </>
  );
};
export default SettingContactInfo;
