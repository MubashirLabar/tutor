import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../../hooks/useAuth";
import { useInitApp } from "../../../../hooks/useInitApp";
import { useUser } from "../../../../hooks/useUser";
import {
  selectGraduateSchools,
  selectJuniorSchools,
  selectUndergraduateSchools,
} from "../../../../stores/layouts/selectors";
import { useSelector } from "../../../../stores/rootReducer";
import { currentUserInfo } from "../../../../stores/users";
import { createPascelCaseName } from "../../../../utils/common";
import { SearchIcon, DropDownIcon } from "../../../../assets/svgIcons";
import { Searchbar } from "../Searchbar/Searchbar";
import LanguageBar from "../../../helpers/LanguageBar/languageBar";

import { createModuleStyleExtractor } from "../../../../utils/css";

import headerImage from "../../../../assets/images/header-image.png"
import styles from "./header.module.scss";
const cx = createModuleStyleExtractor(styles);

export const NewHeader = () => {
  const { token } = useAuth();
  const user = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const { tests } = useInitApp();
  const [openSearchFilter, setOpenSearchFilter] = useState(false);
  const [openSubLink, setOpenSubLink] = useState("");
  const [openSearchbar, setOpenSearchbar] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);

  // const graduate_schools = useSelector((store) => selectGraduateSchools(store));
  const bottomOptions: string[] = [
    '研究生申请', '本科大一申请', '大三转学申请', '标准化考试', '自学专区', '留学最新资讯', '留学论坛', '常见问题'
  ] 
  const undergraduate_schools = useSelector((store) =>
    selectUndergraduateSchools(store)
  );
  const junior_schools = useSelector((store) => selectJuniorSchools(store));
  useEffect(() => {
    console.log({userChanged: user})
  }, [user])

  useEffect(() => {
    console.log({tokenChanged: token})
  }, [token])

  const toplinks = [
    {
      title: "",
      to: "",
    },

    {
      title: "免费电子书",
      to: "",
    },

    {
      title: "24/7在綫解题",
      to: "",
    },
    {
      title: "24/7学习谘询服务",
      to: "",
    },
    {
      title: "关于我们",
      to: "",
    },

    {
      title: "加入我们",
      to: "",
    },
  ];

  const bottomlinks = [
    {
      title: "Self Learning",
      to: "self-learning",
    },
    {
      title: "Education News",
      to: "",
    },
    {
      title: "Student’s Social Forum",
      to: "",
    },
    {
      title: "FAQ",
      to: "",
    },
  ];

  useEffect(() => {
    document.body.addEventListener("click", () => {
      setOpenSearchFilter(false);
      setOpenSubLink("");
      setOpenSidebar(false);
    });
  }, []);

  console.log({user})
  return (
    <>
      <div className={cx(["sidebar-overlay", openSidebar ? "show" : "hide"])} />
      <div className={cx(["public-header", openSidebar ? "open-sidebar" : ""])}>
        <div className={cx(["header-wrapper"])}>
          <div className={cx("header-main-row")} style={{backgroundColor: '#F88E55'}}>
            {/*<Link to="/" className={cx(["main-row-wrap", "main-app-width", "logo"])}>
              <img
                style={{display: 'block'}}
                src={headerImage}
                alt=""
              />
            </Link>*/}
            <div className={cx(["main-row-wrap", "main-app-width"])} style={{width: '95%'}}>
              <div className={cx("nav")} style={{paddingTop: '10px', paddingBottom: '14px'}}>
                {toplinks.map((link, index) => {
                  if (index === 0) {
                    return (
                      <Link key={index} to="/" className={cx("link")}>
                        <img
                          style={{height: '58px'}}
                          src={headerImage}
                          alt=""
                        />
                      </Link>
                    )
                  } else {
                    return (
                      <Link key={index} to={link.to} className={cx("link")} style={{color: 'white'}}>
                        {link.title}
                      </Link>
                    )}                    
                  }
                )}
              </div>

              <div>
                <div>
                  <Link to={'../auth?action=register'} className={cx("link")} style={{color: 'white'}}>
                    登录
                  </Link>
                  <button style={{backgroundColor: 'white', borderRadius: 35, paddingLeft: '44.95px', paddingRight: '44.95px', color: '#F3864B', fontWeight: 600, fontSize: '25px', paddingTop: 5, paddingBottom: 5, marginLeft: 28.11,}}>
                    注册
                  </button>
                </div>
              </div>
            </div>
            {/*{!token ? (
              <>
                <Link to="/new-auth" >
                    <span className={cx("sign-btn")}>
                    Sign In
                    </span>
                  </Link>

              </>
            ) : (
              <>
                <Link to="/dashboard" className={cx("sign-btn")}>
                  {user && user.full_name
                    ? (user.full_name.charAt(0).toUpperCase() +
                    user.full_name.substring(1))
                    : "Dashboard"}
                </Link>
              </>
            )}*/}
            {/*<div className={cx("languageBar")}><LanguageBar /></div>*/}
          </div>
          <div className={cx(["header-sub-row", "main-app-width"])}>
            <div className={cx("bottom-nav")}>
              {/* Graduation Schools */}
              
              {bottomOptions?.map((item, index) => (
                <Link
                  to=""
                  key={index}
                  className={cx("link")}
                  style={{color: '#F88E55'}}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (openSubLink !== "Graduation Schools") {
                      setOpenSubLink("Graduation Schools");
                    } else {
                      setOpenSubLink("");
                    }
                  }}
                >
                  {item}
                </Link>
                /*<Link key={index} to="" className={cx("item")} style={{color: '#F88E55'}}>
                  {item}
                </Link>*/

              ))}


              
            </div>
          </div>
        </div>
      </div>

      {/* Small Screen Header */}
      <div className={cx("small-header")}>
        <div className={cx(["wrap", "main-app-width"])}>
          <div className={cx(["left", openSearchbar ? "hide" : "show"])}>
            <div
              className={cx("hamburger-lines")}
              onClick={(e) => {
                e.stopPropagation();
                setOpenSidebar(true);
              }}
            >
              <span className={cx(["line", "line1"])}></span>
              <span className={cx(["line", "line2"])}></span>
              <span className={cx(["line", "line3"])}></span>
            </div>
          </div>
          <div className={cx("right")}>
            {/*<div
              className={cx(["search", openSearchbar ? "open" : "hide-search"])}
            >
              <Searchbar />
            </div>*/}
            {/*<button
              className={cx("search-btn")}
              onClick={() => setOpenSearchbar(!openSearchbar)}
            >
              {!openSearchbar ? (
                <SearchIcon />
              ) : (
                <div className={cx("search-close-btn")}>&times;</div>
              )}
            </button>*/}
          </div>
        </div>
      </div>
    </>
  );
};
