import React, { useState } from "react";
import { Banner } from "../../layouts/Banner/Banner";
import { CategoryForm } from "./Categories/CategoryForm";
import { createModuleStyleExtractor } from "../../../utils/css";
import { SubCategoryForm } from "./SubCategories/SubCategoryForm";
import { ServiceType } from "./ServiceType/ServiceType";
import { MaterialUpload } from "./MaterialUpload/MaterialUpload";
import { UserDetails } from "./UserDetails/UserDetails";
import styles from "./NewOrder.module.scss";
import { Deadline } from "./Deadline/Deadline";
import { Budget } from "./Budget/Budget";
import { ProjectDetails } from "./ProjectDetails/ProjectDetails";
import { SignupModal } from "./SignupModal/SignupModal";
import { IBudgetDeadline, IUserDetails } from ".";
import { categories } from ".";
import { EscrowSection } from "./EscrowSection/EscrowSection";
import { WritingForm } from "./WritingForm/WritingForm";
const cx = createModuleStyleExtractor(styles);

export interface ICategory {
  title: string;
  value: string;
  image: string;
}

export function NewOrder() {
  const [category, setCategory] = useState<ICategory>({
    title: "Humanities and Social Science",
    value: "humanities_and_social_science",
    image: "/assets/images/home-moment-4.svg",
  });
  const [subject, setSubject] = useState(0);
  const [details, setDetails] = useState<IUserDetails>({});
  const [budgetDeadline, setBudgetDeadline] = useState<IBudgetDeadline>({});
  const [endDate, setEndDate] = useState<IBudgetDeadline>({});
  const [files, setFiles] = useState([]);
  const [serviceType, setServiceType] = useState("homework-help");
  const [projectDetails, setProjectDetails] = useState("");
  const [pagesCount, setPagesCount] = useState("1 Page(s) / 275 Words");
  const [openSignUpModal, setOpenSignupModal] = useState<boolean>(false);
  const [sampleWork, setSampleWork] = useState("yes");

  return (
    <div className={cx("new-order-page")}>
      <Banner />
      <CategoryForm category={category} setCategory={setCategory} />
      <SubCategoryForm
        pagesCount={pagesCount}
        setPagesCount={setPagesCount}
        category={category}
        subject={subject}
        setSubject={setSubject}
      />
      {category.value === "writing" ? (
        <div className={cx(["writing-area", "main-app-width"])}>
          <WritingForm />
          <div className={cx("sample-work-blk")}>
            <div className={cx("msg")}>
              Do you want a sample work before hiring him?
            </div>
            <div className={cx("options")}>
              <div
                className={cx(["item", sampleWork === "yes" ? "active" : ""])}
                onClick={() => {
                  setSampleWork("yes");
                }}
              >
                <div className={cx("radio-btn")} />
                <div className={cx("lbl")}>Yes</div>
              </div>
              <div
                className={cx(["item", sampleWork == "no" ? "active" : ""])}
                onClick={() => {
                  setSampleWork("no");
                }}
              >
                <div className={cx("radio-btn")} />
                <div className={cx("lbl")}>No</div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className={cx(["skip-block", "main-app-width"])}>
            <div className={cx("msg")}>
              Not Sure? Don’t worry, you can{" "}
              <button className={cx("skip-btn")}>skip this step</button>
            </div>
          </div>
          <ServiceType
            serviceType={serviceType}
            setServiceType={setServiceType}
          />
        </>
      )}

      <MaterialUpload files={files} setFiles={setFiles} />
      <UserDetails details={details} setDetails={setDetails} />
      <Deadline
        budgetDeadline={budgetDeadline}
        setBudgetDeadline={setBudgetDeadline}
        endDate={endDate}
        setEndDate={setEndDate}
        serviceType={serviceType}
        setServiceType={setServiceType}
      />
      <Budget />
      {serviceType === "tutor-full-online-course" && <EscrowSection />}
      <SignupModal
        openSignUpModal={openSignUpModal}
        setOpenSignupModal={setOpenSignupModal}
      />
      <div className={cx(["order-ftr", "main-app-width"])}>
        <div className={cx("ftr-content")}>
          <button
            className={cx("submit-button")}
            onClick={() => setOpenSignupModal(true)}
          >
            Submit
          </button>
        </div>
      </div>
      {/* <div className={cx("NewOrder__root")}>
        <div className={cx("NewOrder__container")}>
          {serviceType !== 1 && <ProjectDetails projectDetails={projectDetails} setProjectDetails={setProjectDetails} />}
        </div>
      </div> */}
    </div>
  );
}
