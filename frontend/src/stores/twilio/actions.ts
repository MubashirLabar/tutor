import { NewChat } from "../../components/organisms/Messenger";
import { ReplyTo } from "../../components/organisms/Messenger/Messenger";
import { ITwilioConversation, ITwilioMessage, ITwilioParticipant, SendMediaOptions } from "../../types/twilio";
import { IUser } from "../../types/users";



export const actionTypes = {

  INTIALIZE_TWILIO: "@@MESSENGER/INTIALIZE_TWILIO",  
  INTIALIZE_TWILIO_SUCCESS: "@@MESSENGER/INTIALIZE_TWILIO_SUCCESS",  

  CONVERSATIONS_LOADING: "@@MESSENGER/CONVERSATIONS_LOADING",
  CONVERSATIONS_SUCCESS: "@@MESSENGER/CONVERSATIONS_SUCCESS",
  CONVERSATIONS_ERROR: "@@MESSENGER/CONVERSATIONS_ERROR",
  CONVERSATIONS_PARTICIPANTS_ADD: "@@MESSENGER/CONVERSATIONS_PARTICIPANTS_ADD",
  SEND_MESSAGE_TO_ACTIVE_CONVERSATION: "@@MESSENGER/SEND_MESSAGE_TO_ACTIVE_CONVERSATION",
  START_CONVERSATION_WITH_AGENT: "@@MESSENGER/START_CONVERSATION_WITH_AGENT",
  UPDATE_CONVERSATION_FRIENDLY_NAME: "@@MESSENGER/UPDATE_CONVERSATION_FRIENDLY_NAME",
  GET_AVALABLE_CHAT_CONTACTS: "@@MESSENGER/GET_AVALABLE_CHAT_CONTACTS",
  GET_AVALABLE_CHAT_CONTACTS_SUCCESS: "@@MESSENGER/GET_AVALABLE_CHAT_CONTACTS_SUCCESS",
  DELETE_MESSAGE: "@@MESSENGER/DELETE_MESSAGE",
  DELETE_ACTIVE_CONVERSATION: "@@MESSENGER/DELETE_ACTIVE_CONVERSATION",
  LEAVE_CHAT: "@@MESSENGER/LEAVE_CHAT",
  SEND_MMS_TO_ACTIVE_CONVERSATION: "@@MESSENGER/SEND_MMS_TO_ACTIVE_CONVERSATION",

  FETCH_CONVERSATIONS: "@@MESSENGER/FETCH_CONVERSATIONS",
  FULL_CONVERSATIONS_SUCCESS: "@@MESSENGER/FULL_CONVERSATIONS_SUCCESS",
  MESSAGES_LOADING: "@@MESSENGER/MESSAGES_LOADING",
  MESSAGES_SUCCESS: "@@MESSENGER/MESSAGES_SUCCESS",
  ACTIVE_CONVERSATION: "@@MESSENGER/ACTIVE_CONVERSATION", 
  UPDATE_ACTIVE_CONVERSATION: "@@MESSENGER/UPDATE_ACTIVE_CONVERSATION", 
  ADD_MEMBERS_TO_ACTIVE_CHAT: "@@MESSENGER/ADD_MEMBERS_TO_ACTIVE_CHAT", 
  UPDATE_START_CHAT_MODAL_STATE: "@@MESSENGER/UPDATE_START_CHAT_MODAL_STATE", 
  UPDATE_ADD_MEMBERS_MODAL_STATE: "@@MESSENGER/UPDATE_ADD_MEMBERS_MODAL_STATE", 
  SIGNOUT_TWILIO: "@@MESSENGER/SIGNOUT_TWILIO",  
  SAVE_DATA: "@@MESSENGER/SAVE_DATA",

} as const;

export const getAvailableChatContacts = () => ({
  type: actionTypes.GET_AVALABLE_CHAT_CONTACTS
});

export const getAvailableChatContactsSuccess = (data:Array<IUser>) => ({
  type: actionTypes.GET_AVALABLE_CHAT_CONTACTS_SUCCESS,
  data
});

export const intializeTwilioStore = () => ({
  type: actionTypes.INTIALIZE_TWILIO,
});

export const intializeTwilioSuccess = ( token: string) => ({
  type: actionTypes.INTIALIZE_TWILIO_SUCCESS,
  token
});

export const signoutTwilio = () => ({
  type: actionTypes.SIGNOUT_TWILIO,
})

export const fetchConversationsLoading = () => ({
  type: actionTypes.CONVERSATIONS_LOADING
});

export const fetchConversationsSuccess = (conversations: Array<ITwilioConversation>) => ({
  type: actionTypes.CONVERSATIONS_SUCCESS,
  conversations
});

export const fetchFullConversationsSuccess = (conversations: Array<ITwilioConversation>) => ({
  type: actionTypes.FULL_CONVERSATIONS_SUCCESS,
  conversations
});

export const fetchMessagesLoading = () => ({
  type: actionTypes.MESSAGES_LOADING
});

export const activeConversationSuccess = (activeConversation:ITwilioConversation) => ({
  type: actionTypes.ACTIVE_CONVERSATION,
  activeConversation
});

export const updateActiveConversationSuccess = (activeConversation:ITwilioConversation) => ({
  type: actionTypes.UPDATE_ACTIVE_CONVERSATION,
  activeConversation
});

export const addTwilioParticipant = (participant: ITwilioParticipant) => ({
  type: actionTypes.CONVERSATIONS_PARTICIPANTS_ADD,
  participant
});


export const updateConversationFriendlyName = ( data: string ) => ({
  type: actionTypes.UPDATE_CONVERSATION_FRIENDLY_NAME,
  data
});

export const fetchMessagesSuccess = (messages:Array<ITwilioMessage>) => ({
  type: actionTypes.MESSAGES_SUCCESS,
  messages
});

export const sendMessageToActiveConversation = (message: string, replyTo: ReplyTo) => ({
  type: actionTypes.SEND_MESSAGE_TO_ACTIVE_CONVERSATION,
  message,
  replyTo
})

export const sendMMSToActiveConversation = ( message :SendMediaOptions, replyTo: ReplyTo) => ({
  type: actionTypes.SEND_MMS_TO_ACTIVE_CONVERSATION,
  message,
  replyTo
})

export const deleteConversationMessage = (message: ITwilioMessage) => ({
  type: actionTypes.DELETE_MESSAGE,
  message
})

export const deleteActiveConversation = () => ({
  type: actionTypes.DELETE_ACTIVE_CONVERSATION,
})
export const leaveActiveConversation = () => ({
  type: actionTypes.LEAVE_CHAT,
})
export const saveDataToKick = (obj:any) => ({
  type: actionTypes.SAVE_DATA,
  obj
})

export const startConversationWithAgent = (data: NewChat) => ({
  type: actionTypes.START_CONVERSATION_WITH_AGENT,
  data
})

export const addMembersToActiveChat = ( data: NewChat ) => ({
  type: actionTypes.ADD_MEMBERS_TO_ACTIVE_CHAT,
  data
})

export const updateStartChatModalState = ( startChatModal: boolean ) => ({
  type: actionTypes.UPDATE_START_CHAT_MODAL_STATE,
  startChatModal
})

export const updateAddMembersModalState = ( membersModal: boolean ) => ({
  type: actionTypes.UPDATE_ADD_MEMBERS_MODAL_STATE,
  membersModal
})

export type Actions =
  | ReturnType<typeof fetchConversationsSuccess>
  | ReturnType<typeof intializeTwilioStore>
  | ReturnType<typeof intializeTwilioSuccess>
  | ReturnType<typeof signoutTwilio>
  | ReturnType<typeof activeConversationSuccess>
  | ReturnType<typeof fetchMessagesSuccess>
  | ReturnType<typeof sendMessageToActiveConversation>
  | ReturnType<typeof startConversationWithAgent>
  | ReturnType<typeof updateStartChatModalState>
  | ReturnType<typeof fetchConversationsLoading>
  | ReturnType<typeof fetchMessagesLoading>
  | ReturnType<typeof addTwilioParticipant>
  | ReturnType<typeof updateAddMembersModalState>
  | ReturnType<typeof addMembersToActiveChat>
  | ReturnType<typeof getAvailableChatContacts>
  | ReturnType<typeof getAvailableChatContactsSuccess>
  | ReturnType<typeof updateConversationFriendlyName>
  | ReturnType<typeof updateActiveConversationSuccess>
  | ReturnType<typeof fetchFullConversationsSuccess>
  | ReturnType<typeof deleteConversationMessage>
  | ReturnType<typeof deleteActiveConversation>
  | ReturnType<typeof leaveActiveConversation>
  | ReturnType<typeof sendMMSToActiveConversation>
  | ReturnType<typeof saveDataToKick>
  
  
  
  