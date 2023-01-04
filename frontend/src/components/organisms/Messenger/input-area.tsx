import React, { SetStateAction, useCallback, useEffect, useRef, useState } from "react";
import {
  ITwilioConversation,
  ITwilioMessage,
  ITwilioParticipant,
  ITwilioStore,
} from "../../../types/twilio";
import { useDispatch, useSelector } from "react-redux";
import { currentUserInfo, fetchCurrentUserId } from "../../../stores/users";
import { IFetchUser, ILoginResponsInfo } from "../../../types/context/auth";
import { sendMessageToActiveConversation, sendMMSToActiveConversation } from "../../../stores/twilio";
import { ReplyTo } from "./Messenger";
import styles from "./Messenger.module.scss";
import { createModuleStyleExtractor } from "../../../utils/css";
import EmojiPicker, { IEmojiData } from "emoji-picker-react";
import { QuoteIcon } from "../../../assets/svgIcons";
import { Mention, MentionsInput } from "react-mentions";
import Avatar from '../../../assets/images/avatar.png';

const cx = createModuleStyleExtractor(styles);

export default function InputArea({
  twilioStore,
  replyToMessage,
  setReplyToMessage,
  scrollDown,
}: // userId
  {
    twilioStore: ITwilioStore;
    replyToMessage: ReplyTo;
    setReplyToMessage: React.Dispatch<React.SetStateAction<ReplyTo>>;
    scrollDown: any;
    // userId: string;
  }) {
  const dispatch = useDispatch();

  const [input, setInput] = useState("");
  const user: IFetchUser | null | ILoginResponsInfo =
    useSelector(currentUserInfo);

  const [openVoiceRecorder, setOpenVoiceRecorder] = useState(false);
  const [pauseAudio, setPauseAudio] = useState(false);
  const [audioUrl, setAudioUrl] = useState("");
  const [attachmentUrl, setAttachmentUrl] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
  const [showMentions, setShowMentions] = useState<boolean>(false);

  const emojiPickerRef = useRef(null);

  const soundWaves: Array<object> = [];
  for (let i = 0; i < 80; i++) {
    const left = i * 2 + 1;
    const anim = Math.floor(Math.random() * 75 + 400);
    const height = Math.floor(Math.random() * 25 + 3);
    soundWaves.push(
      <div
        className={cx("bar")}
        style={{
          left: `${left}px`,
          animationDuration: `${anim}ms`,
          height: `${height}px`,
        }}
      ></div>
    );
  }

  const hideOpenReplay = () => {
    setReplyToMessage({ isVisible: false, message: undefined });
  };

  const handleSendMessage = () => {
    // setIsSending(true);
    if (input) {
      dispatch(sendMessageToActiveConversation(input, { ...replyToMessage }));
      hideOpenReplay();
      setInput("");
      scrollDown.current.scrollIntoView({
        behavior: "smooth",
        // block: "center",
        // inline: "nearest",
        // alignToTop: false,
      });
    }
  };

  const handleSendVoiceNote = async () => {
    if (audioUrl) {
      const blob = await fetch(audioUrl).then(r => r.blob());


      dispatch(sendMMSToActiveConversation({
        filename: "test",
        contentType: "audio/wav",
        media: blob,
        url: audioUrl,
      },
        { ...replyToMessage }
      ));
      removeVoiceRecorder()
    }
  }


  const onAttachmetChange = async (event: any) => {
    if (event.target.files && event.target.files[0]) {
      const img = event.target.files[0];
      setAttachmentUrl(URL.createObjectURL(img))
      event.target.value = ""

      const blob = await fetch(URL.createObjectURL(img)).then(r => r.blob());
      dispatch(sendMMSToActiveConversation({
        filename: img.name,
        contentType: img.type,
        media: blob,
        url: URL.createObjectURL(img),
      },
        { ...replyToMessage }
      ));

    }
  };

  const removeAttachment = () => {
    setAttachmentUrl("")
  }


  const removeVoiceRecorder = () => {
    setAudioUrl("")
    setOpenVoiceRecorder(false)
  }

  const handleStartVoiceRecording = () => {
    setOpenVoiceRecorder(true);

    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        const mediaRecorder = new MediaRecorder(stream);
        let audioChunks: BlobPart[] = [];

        mediaRecorder.addEventListener("dataavailable", event => {
          audioChunks.push(event.data);
        });

        mediaRecorder.addEventListener("stop", () => {
          console.log("onPause", audioChunks)
          const audioBlob = new Blob(audioChunks);
          setAudioUrl(URL.createObjectURL(audioBlob))
          audioChunks = [];
        });

        mediaRecorder?.start();
        const playPauseBtn = document.getElementById('play-pause-btn')
        playPauseBtn?.addEventListener("click", () => {
          const target = playPauseBtn.getAttribute("data-target")
          if (target == "play") {
            console.log("Resume")

            mediaRecorder?.start()
            console.log("Resume2")
          } else {
            mediaRecorder?.stop()
          }
        });

      });

  };

  const onMentionSelected = useCallback((display: string) => {
    setInput((input) => input + display + ' ');
    setShowMentions(false);
  }, []);

  const handlePlayPause = () => {
    // console.log("this is doing nothing");
    setPauseAudio(!pauseAudio)
  };

  const addEmoji = useCallback((_, data: IEmojiData) => {
    setInput((value) => value + data.emoji);
  }, []);

  return (
    <div className={cx("inbox-content-ftr")}>
      <div className={cx("ftr-row")}>
        <div className={cx("field")}>
          {showEmojiPicker && (
            <EmojiPicker pickerStyle={{
              position: 'absolute',
              bottom: '75px',
              left: '0',
              cursor: 'pointer',
            }} onEmojiClick={addEmoji} />
          )}

          <div className={cx("input-wrapper")}>
            <span className="message_add_emoji" onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
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

            <MentionsInput
              className={cx("iput")}
              placeholder="Write message"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  handleSendMessage();
                } else if (event.key === "@") {
                  setShowMentions(true);
                }
              }}
              allowSuggestionsAboveCursor={true}
            >
              <Mention
                trigger="@"
                style={{
                  backgroundColor: "#FFA50044"
                }}
                data={twilioStore.activeConversation?.participants?.map((participant) => ({ display: participant.friendlyName, id: participant.identity })) ?? []}
                renderSuggestion={(participant) => {
                  const imagePath = twilioStore.activeConversation?.participants?.find((item) => item.identity === participant.id)?.attributes?.image_path;
                  return (
                    <div key={participant.id} onClick={() => onMentionSelected(participant.display as string)} className={cx("item")}>
                      <div className={cx("ico")}>
                        <img src={imagePath || Avatar} />
                      </div>
                      <div className={cx("lbl")}>{participant.display}</div>
                    </div>
                  );
                }}
              />
            </MentionsInput>
          </div>
        </div>
        <input id="_upload-file_" type="file" onChange={(e) => onAttachmetChange(e)} className={cx("hidden-input")} />
        <div className={cx("actions")}>
          <button
            className={cx(["btn"])}
            onClick={() => document.getElementById("_upload-file_")?.click()}
          >
            <i className="icon-paperclip" />
          </button>
          <button className={cx(["btn"])} onClick={handleStartVoiceRecording}>
            <i className="icon-mic" />
          </button>
          <button
            className={cx(["btn", "send-btn"])}
            onClick={handleSendMessage}
          >
            <i className="icon-send" />
          </button>
        </div>
      </div>

      {/* Message Replay */}
      {replyToMessage.isVisible && (
        <div className={cx("reply-row")}>
          <div className={cx("reply-content")}>
            <div className={cx("to-user-dp")}>
              <div
                className={cx("user-img")}
                style={{
                  backgroundImage: `url("${replyToMessage.message?.participant?.attributes
                    ?.image_path ||
                    require("../../../assets/images/avatar.png")
                    }")`,
                }}
              />
              <div className={cx("online-status")} />
            </div>
            <div className={cx("wrap")}>
              <div className={cx("stamps")}>
                <div className={cx("nam")}>
                  {replyToMessage.message?.participant?.attributes?.name ||
                    "no-name"}
                </div>
                {/* <div className={cx("time")}>Sunday 1:17 PM</div> */}
              </div>
              <div className={cx("reply-txt-msg")}>
                {replyToMessage.message?.body || "(empty)"}
              </div>
            </div>
          </div>
          <div className={cx("cross-btn")} onClick={hideOpenReplay}>
            &times;
          </div>
        </div>
      )}

      {/* Image Replay */}
      {/* { attachmentUrl && 
        <div className={cx("image-reply-row")}>
          <div className={cx("image-blk")}>
            <div
              className={cx("image")}
              style={{
                backgroundImage: `url(${attachmentUrl})`,
              }}
            />
            <button onClick={() => removeAttachment()} className={cx("cross-btn")}>&times;</button>
          </div>
        </div> 
      } */}



      {/* Voice Message Recorder */}
      <div
        className={cx([
          "voice-recorder-row",
          openVoiceRecorder ? "show" : "hide",
        ])}
      >
        <div className={cx("item")}>
          <button
            className={cx("del-btn")}
            onClick={() => removeVoiceRecorder()}
          >
            <i className="icon-trash" />
          </button>
        </div>
        {/* <div className={cx("item")}>
          <div className={cx("timer")}>0:04</div>
        </div> */}
        <div className={cx("item")}>
          {pauseAudio ? (
            <audio id="player" src={audioUrl} controls></audio>
          ) : (
            <div className={cx("bars")}>{soundWaves}</div>
          )}
        </div>
        <div className={cx("item")}>
          <button
            id="play-pause-btn"
            data-target={pauseAudio ? "play" : "pause"}
            className={cx(["btn", "play-pause-btn"])}
            onClick={handlePlayPause}
          >
            <i className={pauseAudio ? "icon-play" : "icon-pause"} />
          </button>
        </div>



        <div className={cx("item")}>
          <button
            disabled={!pauseAudio}
            className={cx(["btn", "send-btn"])}
            onClick={handleSendVoiceNote}
          >
            <i className="icon-send" />
          </button>
        </div>
      </div>
    </div>
  );
}
