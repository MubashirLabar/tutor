import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import DatePicker from "react-modern-calendar-datepicker";
import {
  ArrowBackIcon,
  DropDownIcon,
  PriceTagIcon,
  CalenderIcon,
  LinkIcon,
  DeleteIcon,
} from "../../../assets/svgIcons";
import { createModuleStyleExtractor } from "../../../utils/css";
import styles from "./StartContract.module.scss";
const cx = createModuleStyleExtractor(styles);

export function StartContract() {
  const [paymentMethod, setPaymentMethod] = useState("fixed-price");
  const [acceptTerms, setAcceptTerms] = useState(false);

  const [paymentOption, setPaymentOption] = useState("milestone-payment");
  const paymentOptionList = [
    { id: 1, label: "Deposit for the whole project", value: "single-payment" },
    {
      id: 2,
      label: "Deposit for milestone",
      value: "milestone-payment",
    },
  ];

  const [milestoneStates, setMilestoneStates] = useState([
    {
      description: "",
      release_date: "",
      deposit_amount: "",
    },
  ]);

  const inputFile = useRef<HTMLInputElement>(null);

  const onImageChooseButtonClick = () => {
    if (inputFile) {
      inputFile.current?.click();
    }
  };

  return (
    <div className={cx("start-contract-page")}>
      <div className={cx(["wrapper", "app-padding"])}>
        <div className={cx("page-hdr")}>
          <Link to="/dashboard/messenger" className={cx("back-btn")}>
            <div className={cx("icon")}>
              <ArrowBackIcon />
            </div>
            back
          </Link>
        </div>
        <div className={cx("content")}>
          {/* Contract Details */}
          <div className={cx("contract-details")}>
            <div className={cx("blk-title")}>Contract Details</div>
            <div className={cx("form")}>
              <div className={cx("field")}>
                <div className={cx("lbl")}>Student Name</div>
                <input
                  type="text"
                  className={cx("iput")}
                  placeholder="Enter Student Name"
                  value="John Cena"
                />
              </div>
              <div className={cx("field")}>
                <div className={cx("lbl")}>Contract Title</div>
                <input
                  type="text"
                  className={cx("iput")}
                  placeholder="Enter Contract Title"
                />
              </div>
            </div>
          </div>

          {/* Terms */}
          <div className={cx("terms-section")}>
            <div className={cx("blk-title")}>Terms</div>
            <div className={cx("text")}>
              You’re protected by{" "}
              <span className={cx("color")}>Readme Payment Protection.</span>
              Only pay for the work you authorize
            </div>
            {/* <div className={cx("payment-options")}>
              <div className={cx("tit")}>Payment Options</div>
              <div className={cx("options")}>
                <div
                  className={cx([
                    "option",
                    paymentMethod === "fixed-price" ? "active" : "",
                  ])}
                  onClick={() => {
                    setPaymentMethod("fixed-price");
                  }}
                >
                  <div className={cx("radio-btn")} />
                  <div className={cx("icon")}>
                    <PriceTagIcon />
                  </div>
                  <div className={cx("lbl")}>Pay a fixed price</div>
                  <div className={cx("txt")}>
                    Pay as project milestone are completed
                  </div>
                </div>
              </div>
            </div> */}
            <div className={cx("payment-field")}>
              <div className={cx("lbl")}>Price for your project</div>
              <div className={cx("field")}>
                <div className={cx("sign")}>$</div>
                <input
                  type="number"
                  className={cx("iput")}
                  placeholder="0.00"
                />
              </div>
            </div>

            <div className={cx("escrow-blk")}>
              <div className={cx("meta")}>
                <div className={cx("title")}>Deposit funds into Escrow</div>
                <div className={cx("txt")}>
                  Escrow is a neutral holding place that protects your deposit
                  until work is approved
                </div>
              </div>

              <div className={cx("payment-option")}>
                {paymentOptionList.map((item, index) => (
                  <div
                    key={index}
                    className={cx([
                      "item",
                      paymentOption === item.value ? "active" : "",
                    ])}
                    onClick={() => {
                      setPaymentOption(item.value);
                    }}
                  >
                    <div className={cx("radio-btn")} />
                    <div className={cx("lbl")}>{item.label}</div>
                  </div>
                ))}
              </div>

              {paymentOption === "milestone-payment" && (
                <>
                  <div className={cx(["meta"])}>
                    <div className={cx("title")}>Project Milestones</div>
                    <div className={cx("txt")}>
                      Add project milestone and pay in intallments as each
                      milestone is completed to your satisfaction.
                    </div>
                  </div>

                  {/* Milestone row */}
                  <div className={cx("milestone-list")}>
                    <div className={cx("form")}>
                      {milestoneStates.map((item, index) => (
                        <div key={index} className={cx("form-row")}>
                          <div className={cx("row-number")}>{index + 1}</div>
                          <div className={cx("fields-row")}>
                            <div className={cx("field")}>
                              <div className={cx("lbl")}>
                                Milestone Description *
                              </div>
                              <input
                                type="text"
                                className={cx("iput")}
                                placeholder="Enter Milestone Description"
                              />
                            </div>
                            <div className={cx("field")}>
                              <div className={cx("lbl")}>Release Date</div>
                              <div className={cx(["iput", "date-picker"])}>
                                <DatePicker
                                  inputPlaceholder="Select Release Date"
                                  shouldHighlightWeekends
                                />
                                <div className={cx("icon")}>
                                  <CalenderIcon />
                                </div>
                              </div>
                            </div>
                            <div className={cx("field")}>
                              <div className={cx("lbl")}>Deposit Amount *</div>
                              <input
                                type="text"
                                className={cx("iput")}
                                placeholder="Ex $200"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <button
                      className={cx("add-milestone")}
                      onClick={() =>
                        setMilestoneStates([
                          ...milestoneStates,
                          {
                            description: "",
                            release_date: "",
                            deposit_amount: "",
                          },
                        ])
                      }
                    >
                      + Add Milestone
                    </button>
                  </div>
                </>
              )}
            </div>

            <div className={cx("due-date-field")}>
              <div className={cx("lbl")}>Due Date</div>
              <div className={cx(["iput", "date-picker"])}>
                <DatePicker
                  inputPlaceholder="Select Date"
                  shouldHighlightWeekends
                />
                <div className={cx("icon")}>
                  <CalenderIcon />
                </div>
              </div>
            </div>
          </div>

          {/* Contract Detail Section */}
          <div className={cx("contract-detail-section")}>
            <div className={cx("blk-title")}>Contract Details</div>
            <div className={cx("detail-filed")}>
              <textarea
                className={cx(["iput", "area"])}
                placeholder="Write details"
              />
            </div>

            <div className={cx("attach-file-section")}>
              <div
                className={cx("attach-btn")}
                onClick={onImageChooseButtonClick}
              >
                <div className={cx("icon")}>
                  <LinkIcon />
                </div>
                <div className={cx("lbl")}>Attach File</div>
              </div>
              <div className={cx("msg")}>up to 25 MB</div>
              <input
                id="_upload-file_"
                type="file"
                ref={inputFile}
                accept="image/*"
                className={cx("hidden-input")}
              />
            </div>

            {/* Uploaded Files display here */}
            {/*<div className={cx("uploaded-files")}>
              <div className={cx("file")}>
                <div className={cx("meta")}>
                  <div className={cx("icon")}>
                    <LinkIcon />
                  </div>
                  <div className={cx("txt")}>
                    e6206ee1e46c267f9e5bcda760ca236e.webp
                  </div>
                  &nbsp;
                  <div className={cx("txt")}>(365.9 KB)</div>
                  <button className={cx("delete-btn")}>
                    <DeleteIcon />
                  </button>
                </div>
                <div className={cx("progress-bar")}>
                  <div className={cx("bar-fill")} style={{ width: "78%" }} />
                </div>
              </div>
              <div className={cx("file")}>
                <div className={cx("meta")}>
                  <div className={cx("icon")}>
                    <LinkIcon />
                  </div>
                  <div className={cx("txt")}>icon.png</div>
                  &nbsp;
                  <div className={cx("txt")}>(365.9 KB)</div>
                  <button className={cx("delete-btn")}>
                    <DeleteIcon />
                  </button>
                </div>
                <div className={cx("progress-bar")}>
                  <div className={cx("bar-fill")} style={{ width: "38%" }} />
                </div>
              </div>
            </div>*/}

            <label className={cx("policy-blk")}>
              <div
                className={cx(["checkbox", acceptTerms ? "active" : ""])}
                onClick={() => setAcceptTerms(!acceptTerms)}
              >
                <i className="icon-check" />
              </div>
              <div className={cx("txt")}>
                Yes, I understand & agree to the{" "}
                <span>Readme Tearms of Service</span>, including the the{" "}
                <span>User Agreement</span> and <span>Privacy Policy</span>
              </div>
            </label>

            <div className={cx("actions")}>
              <button className={cx(["action-btn", "transparent"])}>
                Cancel
              </button>
              <button className={cx("action-btn")}>Continue</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
