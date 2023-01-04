import React, { FC } from "react";
import { createModuleStyleExtractor } from "../../../utils/css";
import { noop } from "../../../utils/noop";
import styles from "./ClickableIcon.module.scss";
const cx = createModuleStyleExtractor(styles);
interface IClickableIcon {
  icon: JSX.Element;
  onIconClick: () => void;
  className?: string;
}

export const ClickableIcon: FC<IClickableIcon> = ({
  icon,
  onIconClick = noop,
  className,
}) => {
  return (
    <span
      className={cx(["icon-clickable", className ?? ""])}
      onClick={onIconClick}
    >
      {icon}
    </span>
  );
};
