import { Actions } from "./actions";
import { actionTypes } from ".";



/* create default state */
const defaultState = {
  token : "",
  user_id : "",
  conversations: [],
  isConversationLoading: false,
  activeConversation: {
    friendlyName: "Start New Chat",
    sid: "random",
    messages: [],
  },
  isMessagesLoading: false,
  messages: [],
  startChatModal: false,
  participants: [],
  membersModal: false,
  contacts: [],
  full_conversations: [],
  myUser:[]
};

/* set the initial state */
export const initialState = defaultState;


export const reducer = (state = initialState, action: Actions) => {
  switch (action.type) {
    case actionTypes.GET_AVALABLE_CHAT_CONTACTS_SUCCESS:
      return {
        ...state,
        contacts: action.data
      };
    case actionTypes.INTIALIZE_TWILIO:
      return {
        ...state,
      };
    case actionTypes.INTIALIZE_TWILIO_SUCCESS:
      return {
        ...state,
        token: action.token
      };
    case actionTypes.CONVERSATIONS_LOADING:
      return{
        ...state,
        isConversationLoading: true
      }
      case actionTypes.MESSAGES_LOADING:
        return{
          ...state,
          isMessagesLoading: true
        }
    case actionTypes.FULL_CONVERSATIONS_SUCCESS:
      return{
        ...state,
        full_conversations: action.conversations
      }
    case actionTypes.CONVERSATIONS_SUCCESS:
      return{
        ...state,
        conversations: action.conversations,
        isConversationLoading: false,
      }
    case actionTypes.UPDATE_ACTIVE_CONVERSATION:
      return{
        ...state,
        activeConversation: action.activeConversation,
        isMessagesLoading: false
      }
    case actionTypes.ACTIVE_CONVERSATION:
      return{
        ...state,
        activeConversation: action.activeConversation
      }
      case actionTypes.MESSAGES_SUCCESS:
        return{
          ...state,
          messages: action.messages
        }
    case actionTypes.CONVERSATIONS_PARTICIPANTS_ADD:
      return{
        ...state,
        participants: [state.participants, action.participant]
      }
    case actionTypes.UPDATE_START_CHAT_MODAL_STATE:
      return {
        ...state,
        startChatModal: action.startChatModal
      };
    case actionTypes.UPDATE_ADD_MEMBERS_MODAL_STATE:
        return {
          ...state,
          membersModal: action.membersModal
        };
    case actionTypes.SIGNOUT_TWILIO:
      return {
        ...defaultState
      };
    case actionTypes.LEAVE_CHAT:
      return {
        ...state,
      };
    case actionTypes.SAVE_DATA:
      return {
        ...state,
        myUser:action.obj
      };
    default:
      return state;
  }
};
