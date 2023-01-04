import React, { useCallback, useState, useRef } from "react";
import { useDropzone } from "react-dropzone";
import { DeleteIcon, LinkIcon } from "../../../../assets/svgIcons";
import { createModuleStyleExtractor } from "../../../../utils/css";
import Dragger from "../../../atoms/Dragger";
import styles from "./MaterialUpload.module.scss";
const cx = createModuleStyleExtractor(styles);

export function MaterialUpload({
  files,
  setFiles,
}: {
  files: Array<any>;
  setFiles: React.Dispatch<React.SetStateAction<any>>;
}) {
  const inputFile = useRef<HTMLInputElement>(null);

  const [uploadedFiles, setUploadedFiles] = useState([]);

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

  return (
    <div className={cx("upload-material-form")}>
      <div className={cx(["wrapper", "main-app-width"])}>
        <div className={cx("content")}>
          <div className={cx("title")}>Upload Material</div>
          <div className={cx("material-blk")}>
            <Dragger handleDrop={handleDrop}>
              <>
                <textarea
                  placeholder="Type details about what sort of help they need help with"
                  className={cx("description")}
                />
                <div className={cx("upload-area")}>
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
                </div>
              </>
            </Dragger>
          </div>
          <div className={cx("uploaded-files")}>
            <div className={cx("file")}>
              <div className={cx("meta")}>
                <div className={cx("icon")}>
                  <LinkIcon />
                </div>
                <div className={cx("txt")}>
                  e6206ee1e46c267f9e5bcda760ca236e.webp
                </div>
                &nbsp;
                <div className={cx("txt")}>(365.9 KB)</div>
                <button className={cx("delete-btn")}>
                  <DeleteIcon />
                </button>
              </div>
              <div className={cx("progress-bar")}>
                <div className={cx("bar-fill")} style={{ width: "78%" }} />
              </div>
            </div>
            <div className={cx("file")}>
              <div className={cx("meta")}>
                <div className={cx("icon")}>
                  <LinkIcon />
                </div>
                <div className={cx("txt")}>icon.png</div>
                &nbsp;
                <div className={cx("txt")}>(365.9 KB)</div>
                <button className={cx("delete-btn")}>
                  <DeleteIcon />
                </button>
              </div>
              <div className={cx("progress-bar")}>
                <div className={cx("bar-fill")} style={{ width: "38%" }} />
              </div>
            </div>
          </div>
          {/* <div className={cx("note")}>No files uploaded yet</div> */}
        </div>
      </div>
    </div>
  );
}
