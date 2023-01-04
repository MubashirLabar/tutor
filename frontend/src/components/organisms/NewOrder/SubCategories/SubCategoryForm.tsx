import React from "react";
import { createModuleStyleExtractor } from "../../../../utils/css";
import { subjects } from "..";
import { ICategory } from "../NewOrder";
import styles from "./SubCategoryForm.module.scss";
import { SearchIcon } from "../../../../assets/svgIcons";
const cx = createModuleStyleExtractor(styles);

export function SubCategoryForm({
  category,
  subject,
  setSubject,
  pagesCount,
  setPagesCount,
}: {
  category: ICategory;
  subject: number;
  pagesCount: string;
  setPagesCount: React.Dispatch<React.SetStateAction<string>>;
  setSubject: React.Dispatch<React.SetStateAction<number>>;
}) {
  return (
    <div className={cx("sub-category-form")}>
      <div className={cx(["wrapper", "main-app-width"])}>
        <div className={cx("content")}>
          <div className={cx("sub-cata-hdr")}>
            <div className={cx("title")}>Choose a Subject</div>
            <div className={cx("srch-filed")}>
              <div className={cx("icon")}>
                <SearchIcon />
              </div>
              <input type="text" placeholder="Search" className={cx("iput")} />
            </div>
          </div>

          <div className={cx("sub-categories-container")}>
            {Object.keys(subjects).map((s) => {
              if (
                (category.value === "All Subjects" || category.value === s) &&
                subjects[s].length
              )
                return (
                  <>
                    <div className={cx("list-title")}>{category.title}</div>
                    <div className={cx("list")}>
                      {subjects[s].map((c) => (
                        <div
                          key={c.id}
                          className={cx([
                            "item",
                            subject === c.id ? "active" : "",
                          ])}
                          onClick={() => {
                            setSubject(c.id);
                          }}
                        >
                          <div className={cx("radio-btn")} />
                          <div className={cx("lbl")}>{c.name}</div>
                        </div>
                      ))}
                    </div>
                  </>
                );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
