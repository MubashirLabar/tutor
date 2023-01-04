import React, { FC, useEffect } from "react";
import { ToastContainer, toast, ToastOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export interface IAlertProps {
  type: string;
  message: string;
}

const Alert: FC<IAlertProps> = ({ type, message }) => {
  const settings: ToastOptions = {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };
  const createNotification = (alertType: string) => {
    switch (alertType) {
      case "INFO":
        toast.info(`${message}`, settings);
        break;
      case "SUCCESS":
        toast.success(`${message}`, settings);
        break;
      case "WARNING":
        toast.warn(`${message}`, settings);
        break;
      case "DANGER":
        toast.error(`${message}`, settings);
        break;
      case "DARK":
        toast.dark(`${message}`, settings);
        break;
      default:
        toast(`${message}`, settings);
    }
  };
  useEffect(() => {
    createNotification(type);
  }, []);
  return (
    <ToastContainer
      closeOnClick
      pauseOnFocusLoss
      draggable
      pauseOnHover
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      rtl={false}
    />
  );
};
export default Alert;
