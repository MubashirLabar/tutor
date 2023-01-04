import React, { FC, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  DropDownIcon,
  MoreIcon,
  MoreIcon2,
  SearchIcon,
} from "../../../assets/svgIcons";

import { createModuleStyleExtractor } from "../../../utils/css";
import styles from "./ContractSeller.module.scss";

const cx = createModuleStyleExtractor(styles);

interface IReferralsList {
  item?: any;
}

export function ContractSeller() {
  const [openMore, setOpenMore] = useState("");
  const [openEarningLinks, setOpenEarningLinks] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const tabs = [
    { label: "All", value: "all" },
    { label: "Active Milestones", value: "active-milestone", qty: 2 },
    { label: "Awaiting Milestone", value: "awaiting-milestone", qty: 2 },
    { label: "Payment Requests", value: "feedback", qty: 1 },
  ];

  const [startDate, setStartDate] = useState("-1");
  const [dropStartDate, setDropStartDate] = useState(false);
  const startDateList = [
    { label: "Start date", value: "-1" },
    { label: "Mar 19, 1:08 AM", value: "Mar 19, 1:08 AM" },
    { label: "Mar 18, 1:08 AM", value: "Mar 18, 1:08 AM" },
    { label: "Mar 17, 1:08 AMs", value: "Mar 17, 1:08 AM" },
    { label: "Mar 16, 1:08 AM", value: "Mar 16, 1:08 AM" },
    { label: "Mar 15, 1:08 AM", value: "Mar 15, 1:08 AM" },
  ];

  const [descending, setDescending] = useState("-1");
  const [dropDescending, setDropDescending] = useState(false);
  const descendingList = [
    { label: "Descending", value: "-1" },
    { label: "Mar 19, 1:08 AM", value: "Mar 19, 1:08 AM" },
    { label: "Mar 18, 1:08 AM", value: "Mar 18, 1:08 AM" },
    { label: "Mar 17, 1:08 AMs", value: "Mar 17, 1:08 AM" },
    { label: "Mar 16, 1:08 AM", value: "Mar 16, 1:08 AM" },
    { label: "Mar 15, 1:08 AM", value: "Mar 15, 1:08 AM" },
  ];

  const contractList = [
    {
      title: "Need Tik Tok Conversation API set up",
      user: {
        image: "/assets/images/profile.png",
        name: "Adham Mansour",
      },
      stamp: "1:08 AM local time",
      status: "active",
      description: "Need Tik Tok Conversion API set up",
      budget: "80.00",
      escrow: "80.00",
      start_date: "Mar 15",
      end_date: "Present",
      slug: "/contracts/seller/12/12",
    },
    {
      title: "Single page web app with NextJS and Sanity CMS.",
      user: {
        image: "/assets/images/profile.png",
        name: "Adham Mansour",
      },
      stamp: "1:08 AM local time",
      status: "payment-request",
      description:
        "Single Page Web Application With Category Slide and Middle Alignment",
      budget: "800.00",
      escrow: "500.00",
      start_date: "Mar 18",
      end_date: "Present",
      slug: "/contracts/seller/12/13",
    },
    {
      title:
        "Need React / Node developers to build out web app on USA time zone.",
      user: {
        image: "/assets/images/profile.png",
        name: "Adham Mansour",
      },
      stamp: "1:08 AM local time",
      status: "active",
      description: "",
      budget: "800.00",
      escrow: "500.00",
      start_date: "Mar 15",
      end_date: "Present",
      slug: "/contracts/seller/12/14",
    },
  ];

  const earingLink = [
    { title: "Get paid", slug: "" },
    { title: "View pending earnings", slug: "" },
    { title: "Go ot reports", slug: "" },
    { title: "Learn about payments", slug: "" },
  ];

  useEffect(() => {
    document.body.addEventListener("click", () => {
      setDropDescending(false);
      setDropStartDate(false);
      setOpenEarningLinks(false);
      setOpenMore("");
    });
  }, []);

  const ContractList: FC<IReferralsList> = ({ item }) => {
    const moreLinks = [
      { title: "View milestones & payments", slug: "" },
      { title: "Send a message", slug: "" },
      { title: "View terms & settings", slug: "" },
      { title: "Give bonus", slug: "" },
      { title: "Give feedback", slug: "" },
      { title: "End contract", slug: "" },
    ];

    return (
      <div className={cx("contract-card")}>
        <div className={cx("card-left-side")}>
          <div className={cx("left")}>
            <Link to={item.slug} className={cx("title-blk")}>
              <div className={cx("title")}>{item.title}</div>
            </Link>
            <div className={cx("card-content")}>
              <div className={cx("block")}>
                <div className={cx("user")}>
                  <div
                    className={cx("img")}
                    style={{
                      backgroundImage: `url(${item.user.image})`,
                    }}
                  />
                  <div className={cx("meta")}>
                    <div className={cx("name")}>{item.user.name}</div>
                    <div className={cx("stamp")}>{item.stamp}</div>
                  </div>
                </div>
              </div>
              <div className={cx("block")}>
                <div className={cx("contex")}>
                  {item.status === "active" && (
                    <div className={cx("active")}>{`Active: Milestone 1`}</div>
                  )}
                  {item.status === "payment-request" && (
                    <div
                      className={cx(["active", "red"])}
                    >{`Active: ${item.user.name} requested a payment on Mar 11`}</div>
                  )}
                  {item.description && (
                    <div className={cx("text")}>{item.description}</div>
                  )}
                  <div className={cx("budget")}>{`$${item.budget} Budget`}</div>
                  <div
                    className={cx("budget")}
                  >{`$${item.escrow} in Escrow`}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={cx("card-right-side")}>
          <div className={cx("actions")}>
            <button className={cx("action-btn")}>
              Submit work for payment
            </button>
            <div className={cx("more-btn-blk")}>
              <button
                className={cx("more-btn")}
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenMore(item.title);
                }}
              >
                <i className="icon-ellipsis" />
                <div
                  className={cx([
                    "more-links",
                    openMore === item.title ? "show" : "hide",
                  ])}
                >
                  {moreLinks.map((link, index) => (
                    <div key={index} className={cx("link")}>
                      {link.title}
                    </div>
                  ))}
                </div>
              </button>
            </div>
          </div>
          <div
            className={cx("duration")}
          >{`${item.start_date} -  ${item.end_date}`}</div>
        </div>
      </div>
    );
  };

  return (
    <div className={cx("contracts-buyer-page")}>
      <div className={cx(["wrapper", "main-app-width"])}>
        <div className={cx("page-hdr")}>
          <div className={cx("lit")}>
            <div className={cx("page-title")}>My Jobs</div>
          </div>
          <div className={cx("rit")}>
            <div className={cx("earning")}>
              Earnings available now:&nbsp;
              <span className={cx("amount")}>$0.00</span>
            </div>
            <button
              className={cx("more-btn")}
              onClick={(e) => {
                e.stopPropagation();
                setOpenEarningLinks(true);
              }}
            >
              <i className="icon-ellipsis" />
              <div
                className={cx([
                  "more-links",
                  openEarningLinks ? "show" : "hide",
                ])}
              >
                {earingLink.map((link, index) => (
                  <div key={index} className={cx("link")}>
                    {link.title}
                  </div>
                ))}
              </div>
            </button>
          </div>
        </div>
        <div className={cx("page-content")}>
          {/* Search Block */}
          <div className={cx("filter-blk")}>
            <div className={cx("lit")}>
              <div className={cx("title")}>All Contracts</div>
            </div>
            <div className={cx("rit")}>
              <div className={cx("search-field")}>
                <input
                  type="text"
                  className={cx("iput")}
                  placeholder="Search by contract, freelancer, or agency name"
                />
                <button className={cx("search-btn")}>
                  <SearchIcon />
                </button>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className={cx("tab-bar")}>
            <div className={cx("nav")}>
              {tabs.map((item, index) => (
                <div
                  key={index}
                  className={cx([
                    "item",
                    activeTab === item.value ? "active" : "",
                  ])}
                  onClick={() => setActiveTab(item.value)}
                >
                  {item.label}&nbsp;{item.qty && <span>{`(${item.qty})`}</span>}
                </div>
              ))}
              <div className={cx("menu-btn")}>
                <MoreIcon2 />
              </div>
            </div>
          </div>

          {/* Contracts List */}
          <div className={cx("contracts-list")}>
            {contractList.map((item, index) => (
              <ContractList key={index} item={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
