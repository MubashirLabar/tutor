import React from "react";
import { useLocation } from "react-router-dom";

export const ChatContainer = () => {
  const [open, setOpen] = React.useState(false);
  const [activeBox, setActiveBox] = React.useState(false);

  const handleDrawerOpen = React.useCallback(() => {
    setOpen(!open);
  }, [open]);

  const setBox = React.useCallback(() => {
    setActiveBox(true);
  }, []);

  const unsetBox = React.useCallback(() => {
    setActiveBox(false);
  }, []);

  const msgSubmit = React.useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  }, []);

  const location = useLocation();
  console.log(location.pathname);
  return (
    <React.Fragment>
      {location.pathname !== "/messenger" && (
        <div className="messager_div">
          {activeBox && (
            <div className="msg_box">
              <div className="msg_head">
                <div className="title_div">
                  shubham_m
                  <div
                    onClick={unsetBox}
                    className="chat_close"
                    data-chat_partner_id="57087"
                  >
                    x
                  </div>
                </div>
                <div className="local_time">
                  {" "}
                  <span>Last seen Jan 24, 02:43 PM</span>{" "}
                </div>
              </div>
              <div className="msg_wrap">
                <div className="msg_body">
                  <div className="msg_push">
                    <div id="user_chat_list_57087">
                      <div className="incoming_msg" id="chat_1443025">
                        <div className="incoming_msg_img">
                          <img
                            src="https://www.studygate.com/app/WS/image_resize/?pic=aHR0cHM6Ly93d3cuc3R1ZHlnYXRlLmNvbS9hcHAvcHVibGljL3VwbG9hZC9wcm9maWxlX2ltYWdlcy8xNjQxNzQ1NDg3LTI0QTc2M0FCLTgzMUEtNERGMC04QjA0LTdGNTY2MUMxRDg0Qi5qcGVn&amp;height=200&amp;width=200&amp;color=ffffff&amp;imnm=1641745487-24A763AB-831A-4DF0-8B04-7F5661C1D84B.jpeg"
                            alt="User Avatar"
                            width="30"
                          />
                        </div>
                        <div className="received_msg">
                          <span
                            className="msg"
                            data-toggle="tooltip"
                            title="2022 Jan 24, 2:42 PM"
                          >
                            I will submit answer within an hour.{" "}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="clearfix"></div>
                    <div className="user_send_msg_div">
                      <form
                        onSubmit={msgSubmit}
                        action=""
                        className="chat_box_form"
                      >
                        <div className="msg-box-part">
                          <textarea
                            className="msg-box-part-input"
                            id="message_57087"
                            name="message"
                            autoComplete="false"
                            placeholder="Type your message here..."
                          ></textarea>
                          <span className="file-input-outer">
                            <button className="btn-success btn-sm">
                              <i className="fa fa-paperclip "></i>
                            </button>
                            <input
                              id="attachment_file_name_57087"
                              type="file"
                              name="file_name[]"
                              className="file-attach-input"
                              multiple={true}
                              data-partner_id="57087"
                            />
                          </span>
                          <span className="message_add_emoji">
                            <svg
                              width="20"
                              version="1.1"
                              id="Capa_1"
                              x="0px"
                              y="0px"
                              viewBox="0 0 512 512"
                            >
                              {" "}
                              <g>
                                {" "}
                                <g>
                                  <path d="M437.02,74.98C388.667,26.629,324.38,0,256,0S123.333,26.629,74.98,74.98C26.629,123.333,0,187.62,0,256 s26.629,132.668,74.98,181.02C123.333,485.371,187.62,512,256,512s132.667-26.629,181.02-74.98 C485.371,388.668,512,324.38,512,256S485.371,123.333,437.02,74.98z M256,472c-119.103,0-216-96.897-216-216S136.897,40,256,40 s216,96.897,216,216S375.103,472,256,472z"></path>{" "}
                                </g>{" "}
                              </g>{" "}
                              <g>
                                {" "}
                                <g>
                                  {" "}
                                  <path d="M368.993,285.776c-0.072,0.214-7.298,21.626-25.02,42.393C321.419,354.599,292.628,368,258.4,368 c-34.475,0-64.195-13.561-88.333-40.303c-18.92-20.962-27.272-42.54-27.33-42.691l-37.475,13.99 c0.42,1.122,10.533,27.792,34.013,54.273C171.022,389.074,212.215,408,258.4,408c46.412,0,86.904-19.076,117.099-55.166 c22.318-26.675,31.165-53.55,31.531-54.681L368.993,285.776z"></path>{" "}
                                </g>{" "}
                              </g>{" "}
                              <g>
                                {" "}
                                <g>
                                  {" "}
                                  <circle
                                    cx="168"
                                    cy="180.12"
                                    r="32"
                                  ></circle>{" "}
                                </g>{" "}
                              </g>{" "}
                              <g>
                                {" "}
                                <g>
                                  {" "}
                                  <circle
                                    cx="344"
                                    cy="180.12"
                                    r="32"
                                  ></circle>{" "}
                                </g>{" "}
                              </g>{" "}
                              <g> </g> <g> </g> <g> </g>
                            </svg>
                          </span>
                        </div>
                        <button
                          className="btn btn-common send"
                          id="send_57087"
                          type="submit"
                          data-partner_id="57087"
                        ></button>
                      </form>
                    </div>
                    <div className="clearfix"></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className={`chat-msg-container ${open ? "open" : ""}`}>
            <div className="msg-column">
              <div className="scrollbox">
                <div className="search-box">
                  <input type="text" id="search_keyword" placeholder="Search" />
                </div>
                <div className="list-box">
                  <ul>
                    <li
                      inbox-id="1443025"
                      id="user_57087"
                      className="user "
                      data-id="57087"
                      data-name="shubham_m"
                      data-tipe="users"
                      title=""
                      onClick={setBox}
                    >
                      <div className="online-user">
                        <img
                          src="https://www.studygate.com/app/WS/image_resize/?pic=aHR0cHM6Ly93d3cuc3R1ZHlnYXRlLmNvbS9hcHAvcHVibGljL3VwbG9hZC9wcm9maWxlX2ltYWdlcy8xNjQxNzQ1NDg3LTI0QTc2M0FCLTgzMUEtNERGMC04QjA0LTdGNTY2MUMxRDg0Qi5qcGVn&amp;height=200&amp;width=200&amp;color=ffffff&amp;imnm=1641745487-24A763AB-831A-4DF0-8B04-7F5661C1D84B.jpeg"
                          alt="shubham_m"
                          width="30"
                        />
                        <div className="user-n-m">
                          <div className="user-n">
                            <h3>shubham_m</h3>
                          </div>
                        </div>{" "}
                      </div>
                    </li>
                    <li
                      inbox-id="1443019"
                      id="user_40767"
                      className="user "
                      data-id="40767"
                      data-name="Dharitri"
                      data-tipe="users"
                      title=""
                      onClick={setBox}
                    >
                      <div className="online-user">
                        <img
                          src="https://www.studygate.com/app/WS/image_resize/?pic=aHR0cHM6Ly93d3cuc3R1ZHlnYXRlLmNvbS9hcHAvcHVibGljL3VwbG9hZC9wcm9maWxlX2ltYWdlcy8xNjIxNjMyMzM0LTIwMTcwNDEwXzIwNTk1OC5qcGc%3D&amp;height=200&amp;width=200&amp;color=ffffff&amp;imnm=1621632334-20170410_205958.jpg"
                          alt="Dharitri"
                          width="30"
                        />
                        <div className="user-n-m">
                          {" "}
                          <div className="user-n">
                            <h3>Dharitri</h3>{" "}
                          </div>{" "}
                        </div>{" "}
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <a
            href="javascript:;"
            onClick={handleDrawerOpen}
            className={`message_lunch_btn ${open ? "open" : "closed"}`}
            id="message_lunch_btn"
          ></a>
        </div>
      )}
    </React.Fragment>
  );
};
