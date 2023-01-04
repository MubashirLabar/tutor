import React, { useState, useRef } from "react";
import {
  CalenderIcon,
  CoursesIcon,
  FolderIcon,
  PlayIcon,
} from "../../../assets/svgIcons";

import Dragger from "../../atoms/Dragger";
import { Modal } from "../../atoms/Modal";
import { createModuleStyleExtractor } from "../../../utils/css";
import styles from "./myCourses.module.scss";
import { Link } from "react-router-dom";

const cx = createModuleStyleExtractor(styles);

export function MyCourses() {
  const tabs = [{ label: "Course Detail" }, { label: "Chat" }];
  const [activeTab, setActiveTab] = useState("Course Detail");
  const [uploadAssignmentModal, setUploadAssignmentModal] = useState(false);

  const inputFile = useRef<HTMLInputElement>(null);

  const coursesList = [
    { label: "AD JUS 001 - English", slug: "" },
    { label: "AD JUS 001 - English", slug: "" },
    { label: "AD JUS 001 - English", slug: "" },
    { label: "AD JUS 001 - English", slug: "" },
    { label: "AD JUS 001 - English", slug: "" },
    { label: "AD JUS 001 - English", slug: "" },
    { label: "AD JUS 001 - English", slug: "" },
    { label: "AD JUS 001 - English", slug: "" },
    { label: "AD JUS 001 - English", slug: "" },
    { label: "AD JUS 001 - English", slug: "" },
    { label: "AD JUS 001 - English", slug: "" },
    { label: "AD JUS 001 - English", slug: "" },
    { label: "AD JUS 001 - English", slug: "" },
    { label: "AD JUS 001 - English", slug: "" },
    { label: "AD JUS 001 - English", slug: "" },
    { label: "AD JUS 001 - English", slug: "" },
    { label: "AD JUS 001 - English", slug: "" },
    { label: "AD JUS 001 - English", slug: "" },
    { label: "AD JUS 001 - English", slug: "" },
    { label: "AD JUS 001 - English", slug: "" },
    { label: "AD JUS 001 - English", slug: "" },
    { label: "AD JUS 001 - English", slug: "" },
    { label: "AD JUS 001 - English", slug: "" },
    { label: "AD JUS 001 - English", slug: "" },
  ];

  const handleCloseAssignmentModal = () => {
    setUploadAssignmentModal(false);
  };

  const onImageChooseButtonClick = () => {
    if (inputFile) {
      inputFile.current?.click();
    }
  };

  const onImageChange = (e: any) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    };
  };

  async function handleDrop(_files: any) {
    console.log("files....", _files);
  }

  const CourseDetails = () => {
    return (
      <div className={cx("course-details")}>
        <div className={cx("details-hdr")}>
          <div className={cx("left")}>
            <img
              className={cx("vector")}
              src={require("../../../assets/images/assignment.png")}
            />
            <div className={cx("meta")}>
              <div className={cx("title")}>You have something to review ?</div>
              <div className={cx("txt")}>
                Submit your assignment for tutor to review{" "}
              </div>
            </div>
          </div>
          <div className={cx("right")}>
            <button
              className={cx("submit-btn")}
              onClick={() => setUploadAssignmentModal(true)}
            >
              Submit Assignment
            </button>
          </div>
        </div>
        <div className={cx("content")}>
          <div className={cx("course-content")}>
            <div className={cx("title")}>Course content</div>
            <div className={cx("courses-list")}>
              {coursesList.map((course, index) => (
                <Link key={index} to={course.slug} className={cx("course")}>
                  <div className={cx("icon")}>
                    <FolderIcon />
                  </div>
                  <div className={cx("lbl")}>{course.label}</div>
                </Link>
              ))}
            </div>
          </div>
          <div className={cx("instructors")}>
            <div className={cx("title")}>Instructors</div>
            <div className={cx("instructor-list")}>
              <div className={cx("instructor")}>
                <div
                  className={cx("image")}
                  style={{
                    backgroundImage: `url(${require("../../../assets/images/avatar.png")})`,
                  }}
                />
                <div className={cx("meta")}>
                  <div className={cx("nam")}>Lincoln Ekstrom</div>
                  <div className={cx("txt")}>
                    Top-Rated Instructor, 2 Million+ Students
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const Chat = () => {
    return (
      <div className={cx("chat-container")}>
        <div style={{ padding: "30px" }}>
          Here is Messenger Component will be render
        </div>
      </div>
    );
  };

  return (
    <>
      <div className={cx("my-courses-page")}>
        <div className={cx(["wrapper", "app-padding"])}>
          <div className={cx("page-hdr")}>
            <button className={cx("back-btn")}>
              <div className={cx("icon")}>
                <i className="icon-chevron-left" />
              </div>
              <div className={cx("lbl")}>Back</div>
            </button>
          </div>
          {/* First Section */}
          <div className={cx("first-section")}>
            <div className={cx("left")}>
              <div className={cx("meta")}>
                <div className={cx("tag")}>HarvardX CS50W</div>
                <div className={cx("slogn")}>
                  {`CS50's Web Programming with Python and JavaScript`}
                </div>
                <div className={cx("txt")}>Created by James Jonson</div>
              </div>
              <div className={cx("stamp")}>
                <CalenderIcon />
                <div className={cx("lbl")}>Last updated 2/2022</div>
              </div>
            </div>
            <div className={cx("right")}>
              <div className={cx("video-blk")}>
                <video
                  title="Video Preview"
                  poster={require("../../../assets/images/video-poster.png")}
                  src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                  className={cx("video")}
                />
                <div className={cx("overlay")}>
                  <div className={cx("play-btn")}>
                    <PlayIcon />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Second Section */}
          <div className={cx("second-section")}>
            <div className={cx("second-section-hdr")}>
              <div className={cx("nav")}>
                {tabs.map((item, index) => (
                  <div
                    key={index}
                    className={cx([
                      "item",
                      activeTab === item.label ? "active" : "",
                    ])}
                    onClick={() => setActiveTab(item.label)}
                  >
                    {item.label}
                  </div>
                ))}
              </div>
            </div>
            <div className={cx("section-content")}>
              {activeTab === "Course Detail" ? (
                <CourseDetails />
              ) : activeTab === "Chat" ? (
                <Chat />
              ) : null}
            </div>
          </div>
        </div>
      </div>

      {/* Upload Assignment Modal */}
      <Modal open={uploadAssignmentModal} onClose={handleCloseAssignmentModal}>
        <div className={cx("upload-assignment-modal")}>
          <div className={cx("modal-hdr")}>
            <div className={cx("title")}>Upload Assignment</div>
            <div
              className={cx("close-btn")}
              onClick={handleCloseAssignmentModal}
            >
              &times;
            </div>
          </div>

          <div className={cx("content")}>
            <div className={cx("upload-area")}>
              <Dragger handleDrop={handleDrop}>
                <>
                  <div className={cx("text")}>
                    Drop your logo here or{" "}
                    <button
                      className={cx("upload-btn")}
                      onClick={onImageChooseButtonClick}
                    >
                      Browse
                    </button>
                    . Total Size up to 50 MB
                  </div>
                  <input
                    id="_upload-file_"
                    type="file"
                    ref={inputFile}
                    onChange={onImageChange}
                    accept="image/*"
                    className={cx("hidden-input")}
                  />
                </>
              </Dragger>
            </div>
            <div className={cx("uploaded-files")}>
              <>
                {/* <div className={cx("note")}>No files uploaded yet</div> */}
              </>
              <>
                <div className={cx("file")}>
                  <div className={cx("lbl")}>jefry.pdf</div>
                  <div className={cx("cancel-btn")}>&times;</div>
                </div>
                <div className={cx("file")}>
                  <div className={cx("lbl")}>English-book.pdf</div>
                  <div className={cx("cancel-btn")}>&times;</div>
                </div>
                <div className={cx("file")}>
                  <div className={cx("lbl")}>science-book.pdf</div>
                  <div className={cx("cancel-btn")}>&times;</div>
                </div>
              </>
            </div>
            <div className={cx("modal-ftr")}>
              <div className={cx("actions")}>
                <button className={cx("action-btn")}>Submit Now</button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
