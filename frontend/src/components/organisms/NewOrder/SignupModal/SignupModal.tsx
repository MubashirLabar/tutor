import React, { useState } from "react";
import { createModuleStyleExtractor } from "../../../../utils/css";
import { Modal } from "../../../atoms/Modal";
import { AuthLogin } from "../../../molecules/AuthLogin/AuthLogin";
import { AuthSignUp } from "../../../molecules/AuthSignUp/AuthSignUp";
import styles from "./SignupModal.module.scss";
const cx = createModuleStyleExtractor(styles);

export function SignupModal({
  openSignUpModal,
  setOpenSignupModal,
}: {
  openSignUpModal: boolean;
  setOpenSignupModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [authStatus, setAuthStatus] = useState<string>("signup");
  const [useType, setUserType] = useState<string>("");

  return (
    <Modal open={openSignUpModal} onClose={() => setOpenSignupModal(false)}>
      <div className={cx("signup-modal")}>
        <button
          className={cx("cross-btn")}
          onClick={() => setOpenSignupModal(false)}
        >
          &times;
        </button>
        <div className={cx("auth-container")}>
          {/* {authStatus === "login" ? (
            <AuthLogin useType={useType} setAuthStatus={setAuthStatus} />
          ) : authStatus === "signup" ? (
            <AuthSignUp useType={useType} setAuthStatus={setAuthStatus} />
          ) : null} */}
        </div>
      </div>
    </Modal>
  );
}
