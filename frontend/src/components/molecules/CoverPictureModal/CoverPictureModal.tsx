import React, { FC, useEffect, useRef, useState } from "react";
import { useUser } from "../../../hooks/useUser";
import { doCreateAlert } from "../../../stores/alert";
import { currentAlertState } from "../../../stores/alert/selectors";
import { useDispatch, useSelector } from "../../../stores/rootReducer";
import {
  doUpdateProfileImage,
  selectImageUploading,
} from "../../../stores/users";
import { createModuleStyleExtractor } from "../../../utils/css";
import { Modal } from "../../atoms/Modal";
import { Loading } from "../Loading/Loading";
import styles from "./CoverPictureModal.module.scss";
const cx = createModuleStyleExtractor(styles);

interface ICoverPictureModal {
  toggle: boolean;
  onCloseModal: () => void;
}
export const CoverPictureModal: FC<ICoverPictureModal> = ({
  toggle,
  onCloseModal,
}) => {
  const user = useUser();
  const alert = useSelector(currentAlertState);
  const [backgroundImage, setBackgroundImage] = useState<string>(
    user?.cover_picture_path || "/assets/images/agent-cover-profile.png"
  );
  const [isEditProfilePhoto, setIsEditProfilePhoto] = useState(toggle);
  const dispatch = useDispatch();
  const [profile, setProfile] = useState({
    preview: "",
    data: "",
  });
  const inputFile = useRef<HTMLInputElement>(null);
  const imageUploading = useSelector(selectImageUploading);
  const handleEditProfilePhotClose = () => {
    setIsEditProfilePhoto(false);
    onCloseModal();

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
  const dispatchAlert = (message: string) => {
    dispatch(doCreateAlert({ active: true, message, type: "DANGER" }));
  };
  const onImageChange = (e: any) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    };

    const fileSize = e.target.files[0].size / 1024 / 1024; // in MiB
    if (fileSize > 2) {
      dispatchAlert("File Size can not exceed 2 MB");
      return;
    }

    setProfile({ ...profile, ...img });
  };

  const handleImageUpload = async (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    is_cover: boolean = true
  ) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("image", profile.data);
    formData.append("props", JSON.stringify({ is_cover }));
    if (profile.data) {
      dispatch(doUpdateProfileImage(formData));
      return;
    }
    dispatch(
      doCreateAlert({
        active: true,
        message: "Image can not be empty",
        type: "DANGER",
      })
    );
  };

  useEffect(() => {
    setIsEditProfilePhoto(toggle);
  }, [toggle]);

  useEffect(() => {
    if (user) {
      if (user.cover_picture_path && user.cover_picture_path != "") {
        setBackgroundImage(user.cover_picture_path);
      }
    }
  }, [user]);

  useEffect(() => {
    if (alert.type === "SUCCESS") {
      setIsEditProfilePhoto(false);
      onCloseModal();
    }
  }, [alert]);

  return (
    <>
      <Modal open={isEditProfilePhoto} onClose={handleEditProfilePhotClose}>
        {imageUploading && isEditProfilePhoto && <Loading />}
        <div className={cx("edit-cover-modal")}>
          <div className={cx("modal-hdr")}>
            <div className={cx("modal-title")}>Edit Banner Image</div>
            <div
              className={cx("modal-cross-btn")}
              onClick={handleEditProfilePhotClose}
            >
              &times;
            </div>
          </div>
          <div className={cx("modal-content")}>
            <div
              className={cx("cover-img")}
              style={{
                backgroundImage: `url(${
                  isEditProfilePhoto && profile.preview !== ""
                    ? profile.preview
                    : backgroundImage
                })`,
              }}
            />
            <button
              className={cx("upload-btn")}
              onClick={onImageChooseButtonClick}
            >
              Upload Photo
            </button>
            <input
              id="_upload-file_"
              type="file"
              ref={inputFile}
              accept="image/*"
              onChange={onImageChange}
              className={cx("hidden-input")}
            />
            <div className={cx("actions")}>
              <div
                className={cx(["action-btn", "transparent"])}
                onClick={handleEditProfilePhotClose}
              >
                Cancel
              </div>
              <div
                className={cx("action-btn")}
                onClick={(event) => handleImageUpload(event, true)}
              >
                Update
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};
