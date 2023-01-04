import React from "react";
import { createModuleStyleExtractor } from "../../../../utils/css";
import styles from "./ServiceType.module.scss";
const cx = createModuleStyleExtractor(styles);

export function ServiceType({
  serviceType,
  setServiceType,
}: {
  serviceType: string;
  setServiceType: React.Dispatch<React.SetStateAction<string>>;
}) {
  const serviceList = [
    { id: 1, label: "24/7 homework help", value: "homework-help" },
    {
      id: 2,
      label: "Need tutor for a full online course",
      value: "tutor-full-online-course",
    },
    {
      id: 3,
      label: "Schedule with tutor TEST during specific date and time",
      value: "schedule-with-tutor",
    },
  ];

  return (
    <div className={cx("service-types-form")}>
      <div className={cx(["wrapper", "main-app-width"])}>
        <div className={cx("content")}>
          <div className={cx("title")}>Choose Service</div>
          <div className={cx("service-types-container")}>
            <div className={cx("list")}>
              {serviceList.map((item, index) => (
                <div
                  key={index}
                  className={cx([
                    "item",
                    serviceType === item.value ? "active" : "",
                  ])}
                  onClick={() => {
                    setServiceType(item.value);
                  }}
                >
                  <div className={cx("radio-btn")} />
                  <div className={cx("lbl")}>{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
