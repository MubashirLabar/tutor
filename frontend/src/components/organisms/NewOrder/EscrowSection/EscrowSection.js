import { useEffect, useState } from "react";
import { createModuleStyleExtractor } from "../../../../utils/css";
import styles from "./EscrowSection.module.scss";
import DatePicker from "react-modern-calendar-datepicker";
import { CalenderIcon } from "../../../../assets/svgIcons";
const cx = createModuleStyleExtractor(styles);

export function EscrowSection() {
  const [paymentOption, setPaymentOption] = useState("milestone-payment");
  const paymentOptionList = [
    { id: 1, label: "Deposit for the whole project", value: "single-payment" },
    {
      id: 2,
      label: "Deposit lesser amount to cover the first milestone",
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

  return (
    <div className={cx("escrow-section")}>
      <div className={cx(["wrapper", "main-app-width"])}>
        <div className={cx("content")}>
          <div className={cx("meta")}>
            <div className={cx("title")}>Deposit funds into Escrow</div>
            <div className={cx("text")}>
              Escrow is a neutral holding place that protects your deposit until
              work is approved
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
              <div className={cx(["meta", "milestone-meta"])}>
                <div className={cx("title")}>Project Milestones</div>
                <div className={cx("text")}>
                  Add project milestone and pay in intallments as each milestone
                  is completed to your satisfaction.
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
      </div>
    </div>
  );
}
