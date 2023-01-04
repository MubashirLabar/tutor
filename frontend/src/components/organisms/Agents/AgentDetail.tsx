import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "./../../../stores/rootReducer";
import { agentsListByUserId } from "./../../../stores/agents/selectors";
import { fetchAgentByUserId } from "./../../../stores/agents";
import styles from "./Agents.module.scss";
const cx = createModuleStyleExtractor(styles);
import {
  createImageFromInitials,
  getRandomColor,
} from "./../../../utils/common";
import { createModuleStyleExtractor } from "../../../utils/css";
import { useAgent } from "../../../hooks/useAgent";

export const AgentDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const agentsByUserId = useSelector(agentsListByUserId);
  const { agent } = useAgent(`${params.id}`);

  return (
    <div className={cx("agents-container")}>
      {agent && (
        <div className="agents-container-card">
          <div className="col-md-3 col-sm-12">
            <div className="card">
              <div className="card-body">
                <div className="col-sm-12 text-center  ">
                  <img
                    id="preview"
                    className={cx("agents-container-card__profile")}
                    data-holder-rendered="true"
                    src={createImageFromInitials(
                      120,
                      `${agent.first_name} ${agent.last_name}`,
                      getRandomColor()
                    )}
                    alt="profile-pic"
                  />
                </div>
                <div className="col-sm-12 py-3 text-center">
                  <h1 className={cx("agents-container-card__title")}>
                    {agent.first_name} {agent.last_name}
                  </h1>
                </div>
                <div className={cx("agents-container-card__item")}>
                  <h2 className="">
                    {`Total earned till date : $${agent.total_earned}`}
                  </h2>
                </div>
                <div className={cx("agents-container-card__item")}>
                  <h2 className="">
                    {`Jobs in progress : ${agent.total_jobs_in_progress}`}
                  </h2>
                </div>
                <div className={cx("agents-container-card__item")}>
                  <h2 className="">
                    {`Total jobs completed : ${agent.total_jobs_completed}`}
                  </h2>
                </div>
              </div>
            </div>
          </div>
          <div className={cx("agents-container-card__details")}>
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col-sm-6">
                    <h2 style={{ fontSize: "22px", fontWeight: 500 }}>
                      Details
                    </h2>
                  </div>
                  <div className="col-sm-6">
                    <button
                      onClick={() => navigate("/agents")}
                      className="btn btn-danger pull-right"
                    >
                      <i className="fa fas fa-long-arrow-alt-left"></i>
                      Back to agents list
                    </button>
                    <br />
                  </div>
                </div>
                <br />
                <table className={cx("agents-table")}>
                  <tbody className={cx("agents-table-details")}>
                    <tr>
                      <td>Company name</td>
                      <td>{agent.company_name}</td>
                    </tr>
                    <tr>
                      <td>Company description</td>
                      <td>{agent.company_description}</td>
                    </tr>
                    <tr>
                      <td>Services</td>
                      <td>
                        {agent.services?.length
                          ? agent.services?.join(", ")
                          : "N/A"}
                      </td>
                    </tr>
                    <tr>
                      <td>Languages</td>
                      <td>
                        {agent.languages?.length
                          ? agent.languages?.join(", ")
                          : "N/A"}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
