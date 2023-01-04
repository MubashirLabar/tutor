import { Link } from "react-router-dom";

import { createModuleStyleExtractor } from "../../../../utils/css";
import styles from "./footer.module.scss";
const cx = createModuleStyleExtractor(styles);

function Footer() {
  const links = [
    {
      title: "Free Ebooks",
      to: "/",
    },
    {
      title: "24/7 Homework Help",
      to: "/",
    },
    {
      title: "24/7  Free college conseling service",
      to: "/",
    },
    {
      title: "About Us",
      to: "/",
    },
  ];

  return (
    <div className={cx("app-footer")}>
      <div className={cx(["wrapper", "main-app-width"])}>
        <div className={cx(["ftr-row"])}>
          <Link to="/" className={cx("logo")}>
            Read.
          </Link>
          <div className={cx("links")}>
            {links.map((item, index) => (
              <Link key={index} to={item.to} className={cx("link")}>
                {item.title}
              </Link>
            ))}
          </div>
        </div>
        <div className={cx("copy-right")}>
          <div className={cx("copyright-txt")}>
            © 2020 Copyright, All Right Reserved
          </div>
          <div className={cx("socials")}>
            <Link to="/" target="_blank" className={cx("media")}>
              <img
                src="assets/images/twitter.svg"
                className={cx("icon")}
                alt=""
              />
            </Link>
            <Link to="/" target="_blank" className={cx("media")}>
              <img
                src="assets/images/facebook.svg"
                className={cx("icon")}
                alt=""
              />
            </Link>
            <Link to="/" target="_blank" className={cx("media")}>
              <img
                src="assets/images/instagram.svg"
                className={cx("icon")}
                alt=""
              />
            </Link>
            <Link to="/" target="_blank" className={cx("media")}>
              <img
                src="assets/images/linkedin.svg"
                className={cx("icon")}
                alt=""
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
