import React, { FC, Fragment } from "react";
import Footer from "../Guest/Footer/footer";
import { Header } from "../Guest/Header/header";

// import { Header } from "../Header/Header";

interface IDefaultLayoutProps {
  theme?: boolean;
}
export const DefaultLayout: FC<IDefaultLayoutProps> = ({ children }) => {
  return (
    <Fragment>
      <Header />
      <Fragment>{children}</Fragment>
      <Footer />
    </Fragment>
  );
};
