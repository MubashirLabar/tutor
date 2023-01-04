import React from "react";
import ReactModal from "react-modal";

import { noop } from "./../../../utils/noop";

ReactModal.setAppElement("#root");

export interface IModal {
  open: boolean;
  children: React.ReactNode;
  onClose: () => void;
  afterModalOpen?: () => void;
  afterModalClose?: () => void;
  shouldCloseOnEsc?: boolean;
  shouldFocusAfterRender?: boolean;
  shouldCloseOnOverlayClick?: boolean;
  shouldReturnFocusAfterClose?: boolean;
}

export const Modal: React.FC<IModal> = (props) => {
  const {
    open,
    children,
    onClose,
    afterModalOpen = noop,
    afterModalClose = noop,
    shouldCloseOnEsc = true,
    shouldFocusAfterRender = true,
    shouldCloseOnOverlayClick = true,
    shouldReturnFocusAfterClose = true,
  } = props;

  return (
    <ReactModal
      isOpen={open}
      onRequestClose={onClose}
      onAfterOpen={afterModalOpen}
      className="ReactModal__Content"
      overlayClassName="ReactModal__Overlay"
      onAfterClose={afterModalClose}
      shouldCloseOnEsc={shouldCloseOnEsc}
      shouldFocusAfterRender={shouldFocusAfterRender}
      shouldCloseOnOverlayClick={shouldCloseOnOverlayClick}
      shouldReturnFocusAfterClose={shouldReturnFocusAfterClose}
    >
      {children}
    </ReactModal>
  );
};
