import React from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "./../../../stores/rootReducer";
import { agentsList } from "./../../../stores/agents/selectors";
import { fetchAgents } from "./../../../stores/agents";

import {
  createImageFromInitials,
  getRandomColor,
} from "./../../../utils/common";
import styles from "./Agents.module.scss";
import { createModuleStyleExtractor } from "../../../utils/css";
import { Input } from "../../atoms/Input";
const cx = createModuleStyleExtractor(styles);
export const Agents = () => {
  const agents = useSelector(agentsList);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [search, setSearch] = React.useState<string>("");
  const interval = React.useRef<NodeJS.Timeout>();

  React.useEffect(() => {
    if (interval.current) clearInterval(interval.current);

    interval.current = setTimeout(() => {
      if (search.length) {
        dispatch(fetchAgents({ search }));
      } else {
        dispatch(fetchAgents({}));
      }
    }, 1000);
  }, [search]);

  return (
    <div className="w-100">
      <br />
      <div className={cx("agents-container")}>
        <Input
          type="text"
          className="a-auth-input"
          id="a-auth-input"
          placeholder="Search agents"
          value={search}
          onChange={(value: string, name: string) => setSearch(value)}
        />
        <br />
        <br />
        <table className={cx("agents-table")}>
          <thead>
            <tr>
              <th scope="col">Image</th>
              <th scope="col">First name</th>
              <th scope="col">Last name</th>
              <th scope="col">Company name</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody className="larg-rows">
            {agents.map((agent, index) => {
              return (
                <tr key={index}>
                  <th scope="row">
                    <div>
                      <img
                        id="preview"
                        className="rounded-circle"
                        data-holder-rendered="true"
                        src={createImageFromInitials(
                          50,
                          `${agent.first_name} ${agent.last_name}`,
                          getRandomColor()
                        )}
                        alt="profile-pic"
                      />
                    </div>
                  </th>
                  <td>{agent.first_name}</td>
                  <td>{agent.last_name}</td>
                  <td>{agent.company_name}</td>
                  <td>
                    <button
                      onClick={() => navigate(`/agent/${agent.user}`)}
                      className="btn btn-sm btn-info"
                    >
                      <i className="fa far fa-address-card"></i>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
