import React, { FC, Fragment } from "react";
import Footer from "../Guest/Footer/footer";
import { Header } from "../Guest/Header/header";
import { NewHeader } from "../Guest/Header/newHeader";

// import { Header } from "../Header/Header";

interface IDefaultLayoutProps {
  theme?: boolean;
}
export const NewLayout: FC<IDefaultLayoutProps> = ({ children }) => {
  return (
    <Fragment>
      <NewHeader />
      <Fragment>{children}</Fragment>
      {/*<Footer />*/}
    </Fragment>
  );
};
