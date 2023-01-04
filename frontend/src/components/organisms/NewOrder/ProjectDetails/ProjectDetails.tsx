import React from "react";
import { createModuleStyleExtractor } from "../../../../utils/css";
import styles from "./ProjectDetails.module.scss";
const cx = createModuleStyleExtractor(styles);

export function ProjectDetails ({projectDetails, setProjectDetails}:
  {
    projectDetails: string,
    setProjectDetails: React.Dispatch<React.SetStateAction<string>>
  }) {
  return (
    <div className={cx("Project__details--form")}>
      <div className={cx("form__title")}>Tell us more about the Project</div>
      <div className={cx("project__details--wrapper")}>
        <textarea value={projectDetails} placeholder="Type the details about what sort of help you need..." onChange={(e) => setProjectDetails(e.target.value)}></textarea>
      </div>
    </div>
  )
}