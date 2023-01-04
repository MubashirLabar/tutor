import React, { useState, useEffect, forwardRef } from "react";
import FlipMove from "react-flip-move";
import {
  CircleTickIcon,
  DeleteIcon,
  EditIcon,
  LinkIcon,
  MoreIcon,
  QuoteIcon,
  SearchIcon,
  SendIcon,
  SettingIcon,
} from "../../../assets/svgIcons";
import { PlusIcon } from "../../../assets/svgIcons";
import Spinner from "../../atoms/Spinner/Spinner";
import "./inbox.scss";

export interface IChat {
  id: number;
  user_name: string;
  user_type: string;
  message: string;
  unread: number;
  stamp: string;
  profile_image: string;
}

export const InboxScreen = () => {
  const [friendsMessages, setFriendsMessages] = useState([
    {
      id: 1,
      user_name: "Zephyrus",
      user_type: "Business Consultant",
      message: "Current message a chatbot is a soft",
      unread: 0,
      stamp: "9:21",
      profile_image: "/images/user-1.png",
    },
    {
      id: 2,
      user_name: "Chatbiz",
      user_type: "Teacher Consultant",
      message: "Previous message a chatbot is",
      unread: 2,
      stamp: "8:54",
      profile_image: "/images/user-2.png",
    },
    {
      id: 3,
      user_name: "Legacy Bot",
      user_type: "Student Consultant",
      message: "You: Previous message a chatbot...",
      unread: 0,
      stamp: "Yesterday",
      profile_image: "/images/user-3.png",
    },
    {
      id: 4,
      user_name: "Intercom",
      user_type: "Business Consultant",
      message: "Previous message a chatbot is...",
      unread: 1,
      stamp: "Yesterday",
      profile_image: "/images/user-4.png",
    },
    {
      id: 5,
      user_name: "Konversation",
      user_type: "Business Consultant",
      message: "You: Previous message a chatbot...",
      unread: 0,
      stamp: "Feb 24",
      profile_image: "/images/user-5.png",
    },
    {
      id: 6,
      user_name: "Wefolio Chat",
      user_type: "Student Consultant",
      message: "You: Previous message a chatbot...",
      unread: 0,
      stamp: "Jan 16",
      profile_image: "/images/user-6.png",
    },
    {
      id: 7,
      user_name: "Intercom",
      user_type: "Business Consultant",
      message: "Previous message a chatbot is...",
      unread: 0,
      stamp: "Jan 16",
      profile_image: "/images/user-4.png",
    },
    {
      id: 8,
      user_name: "Konversation",
      user_type: "Student Consultant",
      message: "You: Previous message a chatbot...",
      unread: 0,
      stamp: "Jan 14",
      profile_image: "/images/user-5.png",
    },
    {
      id: 9,
      user_name: "Wefolio Chat",
      user_type: "Teacher Consultant",
      message: "You: Previous message a chatbot...",
      unread: 0,
      stamp: "Jan 08",
      profile_image: "/images/user-6.png",
    },
    {
      id: 10,
      user_name: "Intercom",
      user_type: "Teacher Consultant",
      message: "Previous message a chatbot is...",
      unread: 0,
      stamp: "Jan 08",
      profile_image: "/images/user-4.png",
    },
    {
      id: 11,
      user_name: "Konversation",
      user_type: "Business Consultant",
      message: "You: Previous message a chatbot...",
      unread: 0,
      stamp: "Jan 07",
      profile_image: "/images/user-5.png",
    },
    {
      id: 12,
      user_name: "Wefolio Chat",
      user_type: "Business Consultant",
      message: "You: Previous message a chatbot...",
      unread: 0,
      stamp: "Jan 07",
      profile_image: "/images/user-6.png",
    },
    {
      id: 13,
      user_name: "Intercom",
      user_type: "Business Consultant",
      message: "Previous message a chatbot is...",
      unread: 0,
      stamp: "Jan 07",
      profile_image: "/images/user-4.png",
    },
    {
      id: 14,
      user_name: "Konversation",
      user_type: "Business Consultant",
      message: "You: Previous message a chatbot...",
      unread: 0,
      stamp: "Jan 07",
      profile_image: "/images/user-5.png",
    },
    {
      id: 15,
      user_name: "Wefolio Chat",
      user_type: "Business Consultant",
      message: "You: Previous message a chatbot...",
      unread: 0,
      stamp: "Jan 05",
      profile_image: "/images/user-6.png",
    },
    {
      id: 16,
      user_name: "Intercom",
      user_type: "Business Consultant",
      message: "Previous message a chatbot is...",
      unread: 0,
      stamp: "Jan 05",
      profile_image: "/images/user-4.png",
    },
    {
      id: 17,
      user_name: "Konversation",
      user_type: "Business Consultant",
      message: "You: Previous message a chatbot...",
      unread: 0,
      stamp: "Jan 05",
      profile_image: "/images/user-5.png",
    },
    {
      id: 18,
      user_name: "Wefolio Chat",
      user_type: "Business Consultant",
      message: "You: Previous message a chatbot...",
      unread: 0,
      stamp: "Jan 05",
      profile_image: "/images/user-6.png",
    },
  ]);

  const [selectedChat, setSelectedChat] = useState<IChat>({
    id: 1,
    user_name: "Zephyrus",
    user_type: "Business Consultant",
    message: "Current message a chatbot is a soft",
    unread: 0,
    stamp: "9:21",
    profile_image: "/images/user-1.png",
  });

  return (
    <div className="inbox-page rel">
      <div className="wrapper app-padding flex">
        {/* Inbox Sidebar */}
        <div className="inbox-sidebar rel">
          <div className="hdr flex aic sticky">
            <div className="search-field flex aic">
              <div className="icon">
                <SearchIcon />
              </div>
              <input
                type="text"
                placeholder="Search"
                className="iput cleanbtn font s14 c000 anim"
              />
            </div>
          </div>
          <div className="friends-list flex flex-col">
            {friendsMessages.length === 0 ? (
              <>
                {[{}, {}, {}, {}, {}, {}, {}, {}, {}].map((el, idx) => (
                  <div key={idx} className="friend loading flex aic">
                    <div className="image holder" />
                    <div className="meta flex flex-col">
                      <div className="name holder" />
                      <div className="txt holder" />
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <>
                {friendsMessages.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      setSelectedChat(item);
                    }}
                    className={`friend flex aic ${
                      selectedChat.id === item.id ? "active" : ""
                    }`}
                  >
                    <div
                      className="image"
                      style={{
                        backgroundImage: `url(${item.profile_image})`,
                      }}
                    />
                    <div className="meta flex flex-col">
                      <div className="row flex aic">
                        <div className="name font">{item.user_name}</div>
                        <div className="stamp font">{item.stamp}</div>
                      </div>
                      <div className="row flex aic">
                        <div className="msg font wordwrap">{item.message}</div>
                        {item.unread > 0 && (
                          <div className="unread font">{item.unread}</div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>

        {/* Chat Container */}
        <ChatContainer selectedChat={selectedChat} />
      </div>
    </div>
  );
};

// Chat Container
const ChatContainer = ({ selectedChat }: { selectedChat: IChat }) => {
  const [username, setUsername] = useState("Mubashir");
  const [user, setUser] = useState(true);
  const [input, setInput] = useState("");
  const [editGroupName, setEditGroupName] = useState(false);
  const [openGroupSetting, setOpenGroupSetting] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [openReply, setOpenReplay] = useState(true);
  const [openAddPeople, setOpenAddPeople] = useState(false);
  const [messages, setMessages] = useState([
    {
      username: "Zephyrus",
      text: "Hello there! 👋",
      stamp: "9:20",
    },
    {
      username: "Zephyrus",
      text: "Welcome to our help center. ‍💻",
      stamp: "9:21",
    },
  ]);
  const handleSendMessage = () => {
    setIsSending(true);
    setTimeout(() => {
      if (input) {
        setMessages([
          ...messages,
          {
            username: username,
            text: input,
            stamp: "9:20",
          },
        ]);
        setInput("");
        setIsSending(false);
      }
    }, 500);
  };

  useEffect(() => {
    document.body.addEventListener("click", () => {
      setOpenGroupSetting(false);
    });
  });

  return (
    <div className="chat-container flex">
      <div className="chat-container-content">
        <div className="inbox-content-hdr flex aic">
          {editGroupName ? (
            <div className="group-name-field">
              <input type="text" className="iput" placeholder="Group Name" />
              <div className="save-btn" onClick={() => setEditGroupName(false)}>
                Save
              </div>
            </div>
          ) : (
            <>
              <div className="lit flex aic">
                <div className="user flex aic">
                  <div
                    className="img"
                    style={{
                      backgroundImage: `url(${selectedChat.profile_image})`,
                    }}
                  />
                  <div className="meta flex flex-col">
                    <div className="name-blk">
                      <div className="nam font s14">
                        {selectedChat.user_name}
                      </div>
                      <div
                        className="edit-btn"
                        onClick={() => setEditGroupName(true)}
                      >
                        <EditIcon />
                      </div>
                    </div>

                    <div className="txt font s12">{selectedChat.user_type}</div>
                  </div>
                </div>
              </div>
              <div className="rit flex aic">
                <div className="btn cleanbtn flex aic">
                  <CircleTickIcon />
                </div>
                <div
                  className="btn cleanbtn flex aic"
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenGroupSetting(true);
                  }}
                >
                  <MoreIcon />
                  <div
                    className={`group-setting flex flex-col anim ${
                      openGroupSetting ? "show" : "hide"
                    }`}
                  >
                    <div
                      className="item flex aic"
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenAddPeople(true);
                        setOpenGroupSetting(false);
                      }}
                    >
                      <div className="ico">
                        <PlusIcon />
                      </div>
                      <div className="lbl font s14">Add People</div>
                    </div>
                    <div className="item flex aic">
                      <div className="ico">
                        <DeleteIcon />
                      </div>
                      <div className="lbl font s14">Delete</div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
        <div className="messages-section">
          {messages.length === 0 ? (
            <div className="message-user-block">
              {[{}, {}, {}, {}, {}, {}].map((el, idx) => (
                <div key={idx} className="message-row">
                  <div className="msg-content flex aic">
                    <div className="lit msgs-loading">
                      <div className="dp holder" />
                      <div className="meta">
                        <div className="nam holder" />
                        <div className="txt holder" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
              {user ? (
                <div className="message-user-block">
                  <FlipMove>
                    {messages.map((msg, index) => (
                      <Message
                        key={index}
                        message={msg}
                        username={username}
                        selectedChat={selectedChat}
                        isSending={isSending}
                        id={index}
                      />
                    ))}
                  </FlipMove>
                </div>
              ) : (
                <div className="message-friend-block">
                  <FlipMove>
                    {messages.map((msg, index) => (
                      <Message
                        key={index}
                        message={msg}
                        username={username}
                        selectedChat={selectedChat}
                        isSending={isSending}
                        id={index}
                      />
                    ))}
                  </FlipMove>
                </div>
              )}
            </>
          )}
        </div>
        <div className="inbox-content-ftr">
          <div className="ftr-row">
            <div className="field flex aic">
              <input
                type="text"
                className="iput cleanbtn font s14 anim"
                placeholder="Write message"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(event) => {
                  if (event.key === "Enter") {
                    handleSendMessage();
                  }
                }}
              />
            </div>
            <div className="actions flex aic">
              <button
                className="cleanbtn upload-btn"
                onClick={() =>
                  document.getElementById("_upload-file_")?.click()
                }
              >
                <LinkIcon />
              </button>
              <input id="_upload-file_" type="file" className="hidden-input" />
              <button
                className="send-btn flex aic anim"
                onClick={handleSendMessage}
              >
                <SendIcon />
              </button>
            </div>
          </div>
          {openReply && (
            <div className="reply-row">
              <div className="reply-content">
                <div className="to-user-dp">
                  <div
                    className="user-img"
                    style={{ backgroundImage: "url(/images/user-1.png)" }}
                  />
                  <div className="online-status" />
                </div>
                <div className="wrap">
                  <div className="stamps">
                    <div className="nam">Chatbiz</div>
                    <div className="time">Sunday 1:17 PM</div>
                  </div>
                  <div className="reply-txt-msg">
                    We are in the education technology space building out a
                    tutoring
                  </div>
                </div>
              </div>
              <div
                className="cross-btn font"
                onClick={() => setOpenReplay(false)}
              >
                &times;
              </div>
            </div>
          )}
        </div>
      </div>
      <div
        className={`chat-container-asides ${openAddPeople ? "show" : "hide"}`}
      >
        <div className="asides-hdr">
          <div className="left">
            <div className="title">People</div>
          </div>
          <div className="right">
            <div className="cross-btn" onClick={() => setOpenAddPeople(false)}>
              &times;
            </div>
          </div>
        </div>
        <div className="people-list">
          <div className="people">
            <div className="meta">
              <div className="people-dp">
                <div
                  className="image"
                  style={{ backgroundImage: "url(/images/user-1.png)" }}
                />
                <div className="online-status" />
              </div>
              <div className="people-name wordwrap">Mubashir</div>
            </div>
            <div className="desti">Member</div>
          </div>
          <div className="people">
            <div className="meta">
              <div className="people-dp">
                <div
                  className="image"
                  style={{ backgroundImage: "url(/images/user-1.png)" }}
                />
                <div className="online-status" />
              </div>
              <div className="people-name wordwrap">Farjad Ahmad</div>
            </div>
            <div className="desti">Owner</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Message Block
const Message = forwardRef(
  (
    {
      message,
      id,
      username,
      selectedChat,
      isSending,
    }: {
      message: {
        username: string;
        text: string;
        stamp: string;
      };
      id: number;
      username: string;
      selectedChat: IChat;
      isSending: boolean;
    },
    ref
  ) => {
    const isUser = username === message.username;
    const [openMessageSetting, setOpenMessageSetting] = useState(false);

    useEffect(() => {
      document.body.addEventListener("click", () => {
        setOpenMessageSetting(false);
      });
    });

    return (
      <div
        className={`message-row ${isUser ? "user-message" : "friend-message"}`}
      >
        <div className={`msg-content flex aic ${isSending ? "sending" : ""}`}>
          <div className="lit">
            <div className={`text-msg font`}>{message.text}</div>
            {isSending && (
              <div className="send-loading">
                <Spinner />
              </div>
            )}
          </div>
          <div className="rit">
            <div className="msg-actions flex aic rel">
              {isUser && (
                <button
                  className="setting-btn cleanbtn"
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenMessageSetting(!openMessageSetting);
                  }}
                >
                  <SettingIcon />
                </button>
              )}
              <div
                className={`message-setting flex flex-col anim ${
                  openMessageSetting ? "show" : "hide"
                }`}
              >
                <div className="item flex aic">
                  <div className="ico">
                    <EditIcon />
                  </div>
                  <div className="lbl font s14">Edit</div>
                </div>
                <div className="item flex aic">
                  <div className="ico">
                    <QuoteIcon />
                  </div>
                  <div className="lbl font s14">Quote</div>
                </div>
                <div className="item flex aic">
                  <div className="ico">
                    <DeleteIcon />
                  </div>
                  <div className="lbl font s14">Delete</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="meta">
          <div className="flex">
            <div
              className="user-profile"
              style={{
                backgroundImage: `url(${selectedChat.profile_image})`,
              }}
            />
            <div className="stamp font">
              {username},&nbsp;{message.stamp}
            </div>
          </div>
        </div>
      </div>
    );
  }
);
Message.displayName = "Message";
