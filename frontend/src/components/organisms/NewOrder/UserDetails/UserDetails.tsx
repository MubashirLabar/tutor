import React, { useEffect, useState } from "react";
import { IUserDetails } from "..";
import { DropDownIcon } from "../../../../assets/svgIcons";
import { createModuleStyleExtractor } from "../../../../utils/css";
import styles from "./UserDetails.module.scss";
const cx = createModuleStyleExtractor(styles);

export function UserDetails({
  details,
  setDetails,
}: {
  details: IUserDetails;
  setDetails: React.Dispatch<React.SetStateAction<IUserDetails>>;
}) {
  const [dropGrade, setDropGrade] = useState(false);
  const [gradeLevel, setGradeLevel] = useState("High School");
  const grades = [
    { label: "High School" },
    { label: "Medium School" },
    { label: "Primary School" },
  ];

  useEffect(() => {
    document.body.addEventListener("click", () => {
      setDropGrade(false);
    });
  });

  return (
    <div className={cx("user-detail-form")}>
      <div className={cx(["wrapper", "main-app-width"])}>
        <div className={cx("content")}>
          <div className={cx("title")}>Additional Information</div>
          <div className={cx("form")}>
            <div className={cx("field")}>
              <div className={cx("lbl")}>Grade Level</div>
              <button
                className={cx("custom-selector")}
                onClick={(e) => {
                  e.stopPropagation();
                  setDropGrade(!dropGrade);
                }}
              >
                {grades.map(
                  (item, index) =>
                    gradeLevel == item.label && (
                      <div
                        className={cx("selector-input")}
                        key={index.toString()}
                      >
                        <div className={cx("selected-text")}>{item.label}</div>
                        <div className={cx("arrow-icon")}>
                          <DropDownIcon />
                        </div>
                      </div>
                    )
                )}
                {dropGrade && (
                  <div className={cx("selector-options")}>
                    {grades.map((item, index) => (
                      <button
                        key={index}
                        className={cx("selector-option-item")}
                        onClick={() => {
                          setGradeLevel(item.label);
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
              <div className={cx("lbl")}>Course Full Name</div>
              <input
                type="text"
                className={cx("iput")}
                placeholder="Course Full Name"
              />
            </div>
            <div className={cx("field")}>
              <div className={cx("lbl")}>School Name</div>
              <input
                type="text"
                className={cx("iput")}
                placeholder="School Name"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
