import React, { useState, useEffect } from "react";
import i18n from "../../../i18n";
import { Link } from "react-router-dom";

import { createModuleStyleExtractor } from "../../../utils/css";
import styles from "./LanguageBar.module.scss";
const cx = createModuleStyleExtractor(styles);

const LanguageBar = () => {
  const languages = [
    { id: 1, label: "English", text: "EN", value: "en" },
    {
      id: 2,
      label: "Chineese",
      text: "中文",
      value: "zh",
    },
  ];
  const changeLocale = (e: any) => {
    console.log("changing", e.target.id);
    //   const lang = localStorage.getItem('i18nextLng');
    //  (lang == 'en' || lang == 'en-GB') ? i18n.changeLanguage('zh') : i18n.changeLanguage('en');
    i18n.changeLanguage(e.target.id);
  };
  return (
    <>
      <div className={cx("language-bar")}>
        {languages.map((lang) => {
          if (lang.label === "Chineese") {
            return (
              <Link key={lang.text} to={"/new-landing-page"} id={lang.value}>
                <div className={cx("langs")}>{lang.text}</div>
              </Link>
            );
          } else {
            return (
              <div
                className={cx("langs")}
                id={lang.value}
                key={lang.text}
                onClick={changeLocale}
              >
                {lang.text}
              </div>
            );
          }
        })}
      </div>
    </>
  );
};
export default LanguageBar;
