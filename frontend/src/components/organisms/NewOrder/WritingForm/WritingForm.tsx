import { useState, useEffect } from "react";
import { DropDownIcon } from "../../../../assets/svgIcons";
import QuestionFillIcon from "../../../../assets/svgIcons/QuestionFillIcon";
import { createModuleStyleExtractor } from "../../../../utils/css";
import styles from "./WritingForm.module.scss";
const cx = createModuleStyleExtractor(styles);

export function WritingForm() {
  const [dropProficiency, setDropProficiency] = useState(false);
  const [selectedProficiency, setSelectedProficiency] = useState("Basic");
  const proficiencies = [
    { label: "Basic" },
    { label: "Medium" },
    { label: "Heigh" },
  ];

  const [dropPages, setDropPages] = useState(false);
  const [selectedPage, setSelectedPage] = useState("1 Page(s) / 275 Words");
  const pages = [
    { label: "1 Page(s) / 275 Words" },
    { label: "2 Page(s) / 300 Words" },
    { label: "3 Page(s) / 500 Words" },
  ];

  const [dropFormatting, setDropFormatting] = useState(false);
  const [selectedFormate, setSelectedFormate] = useState("Select");
  const formates = [
    { label: "Select" },
    { label: "Medium" },
    { label: "Standard" },
  ];

  useEffect(() => {
    document.body.addEventListener("click", () => {
      setDropProficiency(false);
      setDropFormatting(false);
      setDropPages(false);
    });
  });

  return (
    <div className={cx("writing-form")}>
      <div className={cx("field")}>
        <div className={cx("lbl")}>
          Proficiency <QuestionFillIcon />
        </div>
        <button
          className={cx("custom-selector")}
          onClick={(e) => {
            e.stopPropagation();
            setDropProficiency(!dropProficiency);
            setDropFormatting(false);
            setDropPages(false);
          }}
        >
          {proficiencies.map(
            (item, index) =>
              selectedProficiency == item.label && (
                <div className={cx("selector-input")} key={index.toString()}>
                  <div className={cx("selected-text")}>{item.label}</div>
                  <div className={cx("arrow-icon")}>
                    <DropDownIcon />
                  </div>
                </div>
              )
          )}
          {dropProficiency && (
            <div className={cx("selector-options")}>
              {proficiencies.map((item, index) => (
                <button
                  key={index}
                  className={cx("selector-option-item")}
                  onClick={() => {
                    setSelectedProficiency(item.label);
                  }}
                >
                  <div className={cx("option-item-txt")}>{item.label}</div>
                </button>
              ))}
            </div>
          )}
        </button>
      </div>
      <div className={cx("field")}>
        <div className={cx("lbl")}>Number of Pages</div>
        <button
          className={cx("custom-selector")}
          onClick={(e) => {
            e.stopPropagation();
            setDropPages(!dropPages);
            setDropProficiency(false);
            setDropFormatting(false);
          }}
        >
          {pages.map(
            (item, index) =>
              selectedPage == item.label && (
                <div className={cx("selector-input")} key={index.toString()}>
                  <div className={cx("selected-text")}>{item.label}</div>
                  <div className={cx("arrow-icon")}>
                    <DropDownIcon />
                  </div>
                </div>
              )
          )}
          {dropPages && (
            <div className={cx("selector-options")}>
              {pages.map((item, index) => (
                <button
                  key={index}
                  className={cx("selector-option-item")}
                  onClick={() => {
                    setSelectedPage(item.label);
                  }}
                >
                  <div className={cx("option-item-txt")}>{item.label}</div>
                </button>
              ))}
            </div>
          )}
        </button>
      </div>
      <div className={cx("field")}>
        <div className={cx("lbl")}>Number of References</div>
        <input
          type="number"
          className={cx("iput")}
          placeholder="Enter number"
        />
      </div>
      <div className={cx("field")}>
        <div className={cx("lbl")}>Formatting</div>
        <button
          className={cx("custom-selector")}
          onClick={(e) => {
            e.stopPropagation();
            setDropFormatting(!dropFormatting);
            setDropProficiency(false);
            setDropPages(false);
          }}
        >
          {formates.map(
            (item, index) =>
              selectedFormate == item.label && (
                <div className={cx("selector-input")} key={index.toString()}>
                  <div className={cx("selected-text")}>{item.label}</div>
                  <div className={cx("arrow-icon")}>
                    <DropDownIcon />
                  </div>
                </div>
              )
          )}
          {dropFormatting && (
            <div className={cx("selector-options")}>
              {formates.map((item, index) => (
                <button
                  key={index}
                  className={cx("selector-option-item")}
                  onClick={() => {
                    setSelectedFormate(item.label);
                  }}
                >
                  <div className={cx("option-item-txt")}>{item.label}</div>
                </button>
              ))}
            </div>
          )}
        </button>
      </div>
    </div>
  );
}
