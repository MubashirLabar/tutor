import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { verifyEmail } from "../../../api/users";
import { useAuth } from "../../../hooks/useAuth";
import { doCreateAlert } from "../../../stores/alert";
import { currentAlertState } from "../../../stores/alert/selectors";
import { useDispatch, useSelector } from "../../../stores/rootReducer";
import Alert from "../../atoms/Alert/Alert";

export const VerifyEmail = () => {
  const { id } = useParams();
  const { token } = useAuth();
  const [emailVerificationStatus, setEmailVerificationStatus] =
    useState<string>("");
  const { active, message, type } = useSelector((store) =>
    currentAlertState(store)
  );
  const [verified, setVerified] = useState<boolean>(false);
  const [processing, setIsProcessing] = useState<boolean>(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const verifyIdentity = async () => {
    if (id) {
      const response = await verifyEmail(id);
      const { message, status } = response;
      dispatch(
        doCreateAlert({
          active: true,
          message,
          type: status !== "FAILURE" ? "SUCCESS" : "DANGER",
        })
      );
      if (status === "FAILURE") {
        setVerified(false);
        setIsProcessing(false);
        setEmailVerificationStatus(status);
        return;
      }

      setTimeout(() => {
        if (token) {
          navigate("/dashboard", { replace: true });
        } else {
          navigate("/auth?action=login", { replace: true });
        }
      }, 2000);
    }
  };

  useEffect(() => {
    verifyIdentity();
  }, []);
  return (
    <>
      {active && emailVerificationStatus === "FAILURE" && (
        <Alert type={type} message={message} />
      )}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {!verified && processing ? (
          <img src="/assets/images/spinner.gif" alt="Loading...." />
        ) : (
          <h3>
            {verified
              ? "Email Verified Successfully"
              : "Oops! Something went wrong"}
          </h3>
        )}
      </div>
    </>
  );
};
