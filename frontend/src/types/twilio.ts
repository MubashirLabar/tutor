import { ReplyTo } from "../components/organisms/Messenger/Messenger";
import { IUser } from "./users";

export interface ITwilioStore {
  token: string;
  user_id: string;
  conversations: Array<ITwilioConversation>;
  full_conversations: Array<ITwilioConversation>;
  isConversationLoading: boolean;
  activeConversation?: ITwilioConversation;
  isMessagesLoading: boolean;
  messages:  Array<ITwilioMessage>;
  startChatModal : boolean;
  participants:  Array<ITwilioParticipant>;
  membersModal: boolean;
  contacts: Array<IUser>;
  myUser: Array<ITwilioParticipant>;
}

export interface ITwilioConversation {
  unread?: number;
  friendlyName?: string;
  uniqueName?: string;
  lastMessage?: ITwilioMessage;
  sid: string;
  dateCreated?: Date;
  dateUpdated?: Date;
  isLoading?: boolean;
  messages:  Array<ITwilioMessage>;
  participants?:  Array<ITwilioParticipant>;
  createdBy ?: string;
  isOwner?: boolean;
}

export interface ITwilioMessage{
  body ?: string;
  sid ?: string;
  type : "text" | "media";
  attachedMedia ?: ITwilioMedia;
  author ?: string;
  dateCreated?: Date;
  dateUpdated?: Date;
  isLoading?: boolean;
  participant?: ITwilioParticipant;
  attributes: ITwilioMessageAttributes;
}

export interface ITwilioParticipant{
  attributes_partner?: object,
  identity_partner?: string,
  sid_partner?: string,
  friendlyName: string,
  attributes?: ITwilioParticipantAttributes,
  identity: string,
  isLoading?: boolean;
}

export interface ITwilioParticipantAttributes{
  name : string;
  first_name?: string;
  last_name?: string;
  user_type?: string;
  email ?: string;
  phone?: string;
  image_path?: string;
}

export interface ContactsRespose {
  status: string;
  message: string;
  data: Array<IUser>;
}

export interface ITwilioMessageAttributes{
  replyTo ?: ITwilioReplyTo;
  delete ?: boolean;
}

export interface ITwilioReplyTo{
  sid: string;
  body: string;
}

export interface SendMediaOptions{
  contentType: string;
  filename: string;
  media: string | Blob | Buffer;
  url?: string;
}

export interface ITwilioMedia {
  filename: string;
  contentType: string;
  sid: string;
  url ?: string; 
}