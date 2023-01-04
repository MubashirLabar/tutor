import React, { useState } from "react";
import { CalenderIcon, PriceTagIcon } from "../../../assets/svgIcons";
import { createModuleStyleExtractor } from "../../../utils/css";
import styles from "./ContractTermsBuyer.module.scss";

const cx = createModuleStyleExtractor(styles);

export function ContractTermsBuyer() {
  return (
    <div className={cx("terms-section")}>
      {/* Contact Info */}
      <div className={cx("block")}>
        <div className={cx("title")}>Contact Info</div>
        <div className={cx("row")}>
          <div className={cx("lbl")}>Start Date</div>
          <div className={cx("value")}>January 23, 2022</div>
        </div>
        <div className={cx("row")}>
          <div className={cx("lbl")}>Verified Name</div>
          <div className={cx("value")}>Brenden Kam</div>
        </div>
        <div className={cx("row")}>
          <div className={cx("lbl")}>Contract ID</div>
          <div className={cx("value")}>19280039</div>
        </div>
      </div>

      {/* Description of Work */}
      <div className={cx("block")}>
        <div className={cx(["title", "description"])}>Description of Work</div>
        <div className={cx("blk")}>
          <div className={cx("text")}>
            🏆 Upwork Certified User Experience Designer 🏆
          </div>
        </div>
        <div className={cx("blk")}>
          <div className={cx("text")}>
            I am an aesthetic professional User Experience and User Interface
            designer with 5+ years of experience in the relevant field. I use
            all my expert skills to create unique products that connect brands
            and companies with their customers. I can help you with your
            website, web/desktop apps and mobile apps design.
          </div>
        </div>
        <div className={cx("blk")}>
          <div className={cx("text")}>My Area of expertise are:</div>
          <div className={cx("points")}>
            <div className={cx("text")}>• iOS and Android App Design</div>
            <div className={cx("text")}>• Product Design</div>
            <div className={cx("text")}>• Webapp and SaaS Design</div>
            <div className={cx("text")}>• Website Design</div>
            <div className={cx("text")}>• Landing Pages Design</div>
          </div>
        </div>
        <div className={cx("blk")}>
          <div className={cx("text")}>
            I got expert-level abilities in design thinking, wireframing, UX
            interactive prototyping, and final UI graphics production. Highly
            skilled in using software like Figma, Sketch, Adobe XD etc.
          </div>
        </div>
      </div>

      {/* Description of Work */}
      <div className={cx("block")}>
        <div className={cx("price-blk")}>
          <div className={cx("item")}>
            <div className={cx("icon")}>
              <PriceTagIcon />
            </div>
            <div className={cx("meta")}>
              <div className={cx("lbl")}>$1,000</div>
              <div className={cx("txt")}>Fixed Price</div>
            </div>
          </div>
          <div className={cx("item")}>
            <div className={cx("icon")}>
              <CalenderIcon />
            </div>
            <div className={cx("meta")}>
              <div className={cx("lbl")}>More than 6 months</div>
              <div className={cx("txt")}>Project Length</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
