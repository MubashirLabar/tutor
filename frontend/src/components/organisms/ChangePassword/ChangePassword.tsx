import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { doCreateAlert } from "../../../stores/alert";
import { currentAlertState } from "../../../stores/alert/selectors";
import { useDispatch, useSelector } from "../../../stores/rootReducer";
import { doChangePassowrd } from "../../../stores/users";
import { IUserPassword } from "../../../types/context/auth";
import { validateChangePasswordForm } from "../../../utils/validation/validations";
import Alert from "../../atoms/Alert/Alert";

export const ChangePassword = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [user, updateUser] = useState<IUserPassword>({
    password: "",
    cpassword: "",
  });
  const alert = useSelector((store) => currentAlertState(store));
  const { active, message, type } = alert;
  const { password, cpassword } = user;

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { error, message } = validateChangePasswordForm(user);
    error && dispatch(doCreateAlert({ active: true, message, type: "DANGER" }));
    // !error &&
    //   id &&
    //   dispatch(
    //     doChangePassowrd({
    //       verification_link: id,
    //       password: password,
    //     })
    //   );
  };

  return (
    <>
      {active && <Alert type={type} message={message} />}
      <div className="header">
        <div className="container">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item active">
                {/* <Link to="/">Home</Link> */}
                <a href="#">Change Password</a>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Change Password
              </li>
            </ol>
          </nav>
          <h2 className="text-center mt-5">Change Password</h2>
        </div>
      </div>
      <div className="container my-5">
        <div className="row">
          <div className="col-md-12">
            <div className={`${"col-12 p-5 card"}`}>
              <h2 className="mb-4">Change Password</h2>

              <form onSubmit={onFormSubmit}>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control password"
                    id="password"
                    value={password}
                    onChange={(event) =>
                      updateUser({
                        ...user,
                        password: event.target.value,
                      })
                    }
                    placeholder="Password"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Confirm Password</label>
                  <input
                    type="password"
                    className="form-control password"
                    id="password"
                    value={cpassword}
                    onChange={(event) =>
                      updateUser({
                        ...user,
                        cpassword: event.target.value,
                      })
                    }
                    placeholder="Confirm Password"
                  />
                </div>
                <button type="submit" className="btn">
                  Submit
                </button>
              </form>
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </>
  );
};
