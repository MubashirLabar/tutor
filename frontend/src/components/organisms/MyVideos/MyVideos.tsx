import React, { useState } from "react";
import { Link } from "react-router-dom";
import { PlayIcon } from "../../../assets/svgIcons";
import { Modal } from "../../atoms/Modal";

import { createModuleStyleExtractor } from "../../../utils/css";
import styles from "./myVideos.module.scss";
const cx = createModuleStyleExtractor(styles);

export function MyVideos() {
  const [selectedVideo, setSelectedVideo] = useState<string>("");
  const [videoPlayerModal, setVideoPlayerModal] = useState<boolean>(false);

  const VideosList = () => {
    return (
      <div className={cx("video-block")}>
        <div className={cx("lit")}>
          <div className={cx("title")}>
            Creative Watercolor Sketching for Beginners
          </div>
          <div className={cx("txt")}>by Grace Jumbor</div>
          <Link to="" className={cx("btn")}>
            View Details
          </Link>
        </div>
        <div className={cx("rit")}>
          <div className={cx("video-blk")}>
            <video
              title="Video Preview"
              src=""
              muted
              poster={require("../../../assets/images/video-poster.png")}
              className={cx("video")}
            />
            <div className={cx("overlay")}>
              <button
                className={cx("play-btn")}
                onClick={() => setVideoPlayerModal(true)}
              >
                <PlayIcon />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const handleCloseVideoModal = () => {
    setVideoPlayerModal(false);
  };

  return (
    <>
      <div className={cx("my-videos-page")}>
        <div className={cx(["wrapper", "app-padding"])}>
          <div className={cx("page-hdr")}>
            <div className={cx("txt")}>2 Videos Purchased</div>
          </div>
          <div className={cx("videos-list")}>
            {[{}, {}, {}, {}].map((el, idx) => (
              <VideosList key={idx} />
            ))}
          </div>
        </div>
      </div>

      {/* Vidoe Play Modal */}
      <Modal open={videoPlayerModal} onClose={handleCloseVideoModal}>
        <div className={cx("video-player-modal")}>
          <div className={cx("hdr")}>
            <button className={cx("cross-btn")} onClick={handleCloseVideoModal}>
              &times;
            </button>
          </div>
          <div className={cx("video-play")}>
            <video
              title="Video Preview"
              src="https://firebasestorage.googleapis.com/v0/b/leasemagnets---dummy-db.appspot.com/o/community%2F8%2Fmagnet%2F0baf7485-4dde-4772-a14e-1d0fe0108561%2Fintro_Intro_video_4%2Frealestate2_TYG_mov.mov?alt=media&token=d83f7cba-1a0b-4a42-9df9-0cf6cee551ba?&coconut_id=szkHPkUWhhA00O"
              muted
              poster={require("../../../assets/images/video-poster.png")}
              className={cx("video")}
              controls
              autoPlay={true}
            />
          </div>
        </div>
      </Modal>
    </>
  );
}
