import React, { useState } from "react";
import { MinusIcon, PlusIcon } from "../../../assets/svgIcons";
import { createModuleStyleExtractor } from "../../../utils/css";
import VideoClassCard from "../../molecules/VideoClassCard/VideoClassCard";
import styles from "./selfLearning.module.scss";
const cx = createModuleStyleExtractor(styles);

export function SelfLearning() {
  const [selectedCategory, setSelectedCategory] = useState(
    "Humanities and Social Science"
  );
  const categories = [
    { label: "All Subjects" },
    {
      label: "Science",
      subCategories: [
        { label: "All" },
        { label: "ACT English" },
        { label: "History" },
        { label: "Literature" },
        { label: "Philosophy" },
        { label: "Proofreading" },
        { label: "Sociology" },
      ],
    },
    {
      label: "Math",
      subCategories: [
        { label: "All" },
        { label: "ACT English" },
        { label: "History" },
        { label: "Literature" },
        { label: "Philosophy" },
        { label: "Proofreading" },
        { label: "Sociology" },
      ],
    },
    {
      label: "Business",
      subCategories: [
        { label: "All" },
        { label: "ACT English" },
        { label: "History" },
        { label: "Literature" },
        { label: "Philosophy" },
        { label: "Proofreading" },
        { label: "Sociology" },
      ],
    },
    {
      label: "Humanities and Social Science",
      subCategories: [
        { label: "All" },
        { label: "ACT English" },
        { label: "History" },
        { label: "Literature" },
        { label: "Philosophy" },
        { label: "Proofreading" },
        { label: "Sociology" },
      ],
    },
    {
      label: "Computer Science",
      subCategories: [
        { label: "All" },
        { label: "ACT English" },
        { label: "History" },
        { label: "Literature" },
        { label: "Philosophy" },
        { label: "Proofreading" },
        { label: "Sociology" },
      ],
    },
    {
      label: "Writing",
      subCategories: [
        { label: "All" },
        { label: "ACT English" },
        { label: "History" },
        { label: "Literature" },
        { label: "Philosophy" },
        { label: "Proofreading" },
        { label: "Sociology" },
      ],
    },
    {
      label: "Engineering",
      subCategories: [
        { label: "All" },
        { label: "ACT English" },
        { label: "History" },
        { label: "Literature" },
        { label: "Philosophy" },
        { label: "Proofreading" },
        { label: "Sociology" },
      ],
    },
    {
      label: "Others",
      subCategories: [
        { label: "All" },
        { label: "ACT English" },
        { label: "History" },
        { label: "Literature" },
        { label: "Philosophy" },
        { label: "Proofreading" },
        { label: "Sociology" },
      ],
    },
  ];

  const [videosList, setVideosList] = useState([
    {
      label: "Creative Watercolor Sketching for Beginners",
      video: "",
      poster: require("../../../assets/images/video-class-poster.png"),
      author: "by Grace Jumbor",
      price: "$16.00",
    },
    {
      label: "Creative Watercolor Sketching for Beginners",
      video: "",
      poster: require("../../../assets/images/video-class-poster.png"),
      author: "by Grace Jumbor",
      price: "$16.00",
    },
    {
      label:
        "Creative Watercolor Sketching for Beginners. Creative Watercolor Sketching for Beginners",
      video: "",
      poster: require("../../../assets/images/video-class-poster.png"),
      author: "by Grace Jumbor",
      price: "$16.00",
    },
    {
      label: "Creative Watercolor Sketching for Beginners",
      video: "",
      poster: require("../../../assets/images/video-class-poster.png"),
      author: "by Grace Jumbor",
      price: "$16.00",
    },
    {
      label: "Creative Watercolor Sketching for Beginners",
      video: "",
      poster: require("../../../assets/images/video-class-poster.png"),
      author: "by Grace Jumbor",
      price: "$16.00",
    },
    {
      label: "Creative Watercolor Sketching for Beginners",
      video: "",
      poster: require("../../../assets/images/video-class-poster.png"),
      author: "by Grace Jumbor",
      price: "$16.00",
    },
    {
      label: "Creative Watercolor Sketching for Beginners",
      video: "",
      poster: require("../../../assets/images/video-class-poster.png"),
      author: "by Grace Jumbor",
      price: "$16.00",
    },
    {
      label: "Creative Watercolor Sketching for Beginners",
      video: "",
      poster: require("../../../assets/images/video-class-poster.png"),
      author: "by Grace Jumbor",
      price: "$16.00",
    },
    {
      label: "Creative Watercolor Sketching for Beginners",
      video: "",
      poster: require("../../../assets/images/video-class-poster.png"),
      author: "by Grace Jumbor",
      price: "$16.00",
    },
  ]);

  const Category = ({ data }: { data: any }) => {
    const [expendSubCategory, setExpendSubCategory] = useState<boolean>();
    return (
      <div className={cx("category")}>
        <div className={cx(["category-hdr", "item"])}>
          <div className={cx("label")}>{data.label}</div>
          {data.subCategories && (
            <button
              className={cx("plus-btn")}
              onClick={() => setExpendSubCategory(!expendSubCategory)}
            >
              {expendSubCategory ? <MinusIcon /> : <PlusIcon />}
            </button>
          )}
        </div>
        {expendSubCategory && (
          <div className={cx("sub-categories")}>
            {data.subCategories.map((sub?: any, idx?: number) => (
              <div
                key={idx}
                className={cx("item")}
                onClick={() => setSelectedCategory(sub.label)}
              >
                <div
                  className={cx([
                    "label",
                    selectedCategory === sub.label ? "active" : "",
                  ])}
                >
                  {sub.label}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={cx("self-learning-page")}>
      <div className={cx(["wrapper", "main-app-width"])}>
        <div className={cx("content")}>
          {/* Sidebar Filters */}
          <div className={cx("page-sidebar")}>
            <div className={cx("title")}>Categories</div>
            <div className={cx("categories")}>
              {categories.map((item, index) => (
                <Category key={index} data={item} />
              ))}
            </div>
          </div>

          {/* Videos Container */}
          <div className={cx("videos-container")}>
            <div className={cx("title")}>
              {selectedCategory ? selectedCategory : "Video Classes for All"}
            </div>
            <div className={cx("videos-list")}>
              {videosList.map((item, index) => (
                <VideoClassCard key={index} data={item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
