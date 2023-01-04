import React, { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import styles from "./Modal.module.scss";
import { createModuleStyleExtractor } from "../../../utils/css";

const cx = createModuleStyleExtractor(styles);

interface IModalProps {
  onClose: () => void;
}

export const Modal: FC<IModalProps> = ({ children, onClose }) => {
  return (
    <div className={cx("m-modal")}>
      <div className={cx("m-modal__content")}>
        {children}
        <FontAwesomeIcon
          icon={faTimes}
          className={cx("m-modal__close")}
          color="black"
          onClick={onClose}
        />
      </div>
    </div>
  );
};
