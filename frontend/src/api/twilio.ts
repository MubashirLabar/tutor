import { IGeneralRequestResponse } from "../types/context/auth";
import { Client as ConversationsClient, SendMediaOptions } from "@twilio/conversations";
import axiosHttp from "../services/axios.service";
import { sagaMiddleware } from "../stores";
import { ReferralRespose } from "../types/agents";

import {
  ITwilioConversation,
  ITwilioMessage,
  ITwilioStore,
} from "../types/twilio";
import {workLoadRefreshData, workLoadRefreshToken } from "../sagas/twilio";
import { NewChat } from "../components/organisms/Messenger";
import { IUser } from "../types/users";
import { put } from "redux-saga/effects";
import { ReplyTo } from "../components/organisms/Messenger/Messenger";

const SingletonFactory = (function () {
  function SingletonClass(token: string) {
    //do stuff
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    // const { Client } = require("@twilio/conversations");
    const client = new ConversationsClient(token);
    return client;
  }
  let instance: any = null;
  return {
    getInstance: function (token: string) {
      if (instance == null) {
        instance = SingletonClass(token);
        // Hide the constructor so the returned object can't be new'd...
        instance.constructor = null;
      }
      return instance;
    },
    setNull: function () {
      instance = null;
    },
  };
})();

export const sendMobileAuthenticationCode = async (phone: string) => {
  try {
    const response = await axiosHttp.post<IGeneralRequestResponse>(
      "/v1/api/users/phone/otp",
      { phone }
    );
    return response.data;
  } catch (error) {
    console.log(`error : ${JSON.stringify(error)}`);
  }
};
export const verifyMobileAuthenticationCode = async (
  phone: string,
  code: string,
  authenticated: boolean = true
) => {
  try {
    const body = authenticated
      ? { phone, verification_code: code }
      : { phone, code };
    const uri = authenticated
      ? "/v1/api/users/phone/verify"
      : "/v1/api/users/verify-otp-no-auth";
    const response = await axiosHttp.post<IGeneralRequestResponse>(uri, body);
    return response.data;
  } catch (error) {
    console.log(`error : ${JSON.stringify(error)}`);
  }
};

export const initializeTwilio = async () => {
  const response = await axiosHttp.get<ReferralRespose>(`/v1/api/twilio/auth`);
  console.log("initializeTwilio", response);
  return response.data.data;
};

export const getTwilioClient = (token: string) => {
  return SingletonFactory.getInstance(token);
};

export const setTwilioClientNull = () => {
  SingletonFactory.setNull();
  return true;
};

export const registerEventsOnClient = (client: any) => {
  client.on("stateChanged", (state: string) => {
    console.log("Events -- stateChanged", state);
    if (state === "initialized") {
      sagaMiddleware.run(workLoadRefreshData);
    }
  
  });
  client.on("tokenExpired", () => {
    console.log("Events -- tokenExpired");
    sagaMiddleware.run(workLoadRefreshToken);
  });
  client.on("tokenAboutToExpire", () => {
    console.log("Events -- tokenAboutToExpire");
    sagaMiddleware.run(workLoadRefreshToken);
  });
  client.on("messageAdded", () => {
    sagaMiddleware.run(workLoadRefreshData);
  });
  client.on("participantLeft",()=>{
    sagaMiddleware.run(workLoadRefreshData);
  })
};


export const sendTwilioMessage = async (
  conversation: any,
  message: string | SendMediaOptions,
  attributes = {}
) => {
  return await conversation.sendMessage(message, attributes);
};

// export const sendMediaMessageToActiveConversation = async(
//   twilioStore: ITwilioStore,
//   message: SendMediaOptions,
//   replyTo: ReplyTo
// ) => {
//   const client = getTwilioClient(twilioStore.token);
//   const activeConv = await client.getConversationBySid(
//     twilioStore.activeConversation?.sid || ""
//   );
//   let attributes = {};
//   if (replyTo.isVisible && replyTo.message) {
//     attributes = {
//       replyTo: {
//         sid: replyTo.message.sid,
//         body: replyTo.message.body,
//       },
//     };
//   }
//   return await sendTwilioMessage(activeConv, message, attributes);
// }

export const sendToActiveConversation = async (
  twilioStore: ITwilioStore,
  message: string | SendMediaOptions,
  replyTo: ReplyTo
) => {
  const client = getTwilioClient(twilioStore.token);
  const activeConv = await client.getConversationBySid(
    twilioStore.activeConversation?.sid || ""
  );
  let attributes = {};
  if (replyTo.isVisible && replyTo.message) {
    attributes = {
      replyTo: {
        sid: replyTo.message.sid,
        body: replyTo.message.body,
      },
    };
  }
  return await sendTwilioMessage(activeConv, message, attributes);
};

export const startNewChat = async (
  twilioStore: ITwilioStore,
  data: NewChat,
  members: Array<IUser>
) => {
  const client = getTwilioClient(twilioStore.token);
  const conversation = await client.createConversation({
    friendlyName: data.groupName,
  });
  for (let i = 0; i < members.length; i++) {
    await conversation.add(members[i]._id);
  }
  if (data.message) {
    await sendTwilioMessage(conversation, data.message);
  }
  return;
};

export const addMembersToConversation = async (
  twilioStore: ITwilioStore,
  data: Array<IUser>
) => {
  try {
    const client = getTwilioClient(twilioStore.token);
    const activeConv = await client.getConversationBySid(
      twilioStore.activeConversation?.sid || ""
    );
    const promises = [];
    for (let i = 0; i < data.length; i++) {
      promises.push(activeConv.add(data[i]._id));
    }
    return Promise.all(promises);
  } catch (error) {
    sagaMiddleware.run(workLoadRefreshData);

    console.log(`error : ${JSON.stringify(error)}`);
    return Promise;
  }
};

export const getTwilioMessages = async (twilioStore: ITwilioStore) => {
  const client = getTwilioClient(twilioStore.token);
  const activeConv = await client.getConversationBySid(
    twilioStore?.activeConversation?.sid || ""
  );
  const messages = await activeConv.getMessages();

  const results: any[] = [];
  for (let i = 0; i < messages.items.length; i++) {
  
    const active = await processTwilioMessage(messages.items[i]);
    if (active) {
      results.push(active);
    }
    
  }
  return results;
};

const processTwilioMessage = async (data: any) => {
 
  try {
    const participant = await data.getParticipant();
    let attachedMedia = undefined;
    if( data.type == "media" ){
      console.log("here",data.attachedMedia );
      attachedMedia =await  processAttachedmediaMessages(data.attachedMedia[0])
    }
    return {
      sid: data.sid,
      type: data.type,
      body: data.body,
      author: data.author,
      dateCreated: data.dateCreated,
      dateUpdated: data.dateUpdated,
      attributes: data.attributes,
      attachedMedia: attachedMedia,
      participant: await processTwilioParticipant(participant),
    };
  } catch (error) {
      console.log(error)
  }
};

const processAttachedmediaMessages = async (data:any) => {
  return{
    filename: data.filename,
    contentType: data.contentType,
    sid: data.sid,
    url : await data.getContentTemporaryUrl() 
  }
}

const processTwilioConversationParticipants = async (data: any) => {
  try {
    const results: any[] = [];
    const participants = await data.getParticipants();
    
    for (let i = 0; i < participants.length; i++) {
        const active = await processTwilioParticipant(participants[i]);
        results.push(active);
    }
    return results;
  } catch (error) {
    console.log(error)
  }
};


const processTwilioParticipant = async (data: any) => {

  try {
    const user = await data.getUser();
    return {
      attributes_partner: data.attributes,
      identity_partner: data.identity,
      sid_partner: data.sid,
      friendlyName: user.friendlyName,
      attributes: user.attributes,
      identity: user.identity,
    };
  } catch (error) {
    console.log(error)
  }
};


const processTwilioConversation = async (data: any, user_id: string) => {
  const messages: never[] = [];
  const participants: never[] = [];

  return {
    sid: data.sid,
    uniqueName: data.uniqueName,
    friendlyName: data.friendlyName,
    dateCreated: data.dateCreated,
    dateUpdated: data.dateUpdated,
    lastMessage: data.lastMessage,
    createdBy: data.createdBy,
    participants,
    messages,
    isOwner: data.createdBy == user_id,
  };
};

const processTwilioConversationFull = async (data: any) => {
  let messages = [];
  const dataToReturn: ITwilioConversation = {
    sid: data.sid,
    uniqueName: data.uniqueName,
    friendlyName: data.friendlyName,
    dateCreated: data.dateCreated,
    dateUpdated: data.dateUpdated,
    lastMessage: data?.lastMessage,
    createdBy: data.createdBy,
    messages: [],
    unread: 0,
  };
  try {
    if (data.lastMessage) {
      const messagesT = await data.getMessages();
      messages = await processTwilioConversationMessages(messagesT);
      dataToReturn.messages = messages;
      const unread = await data.getUnreadMessagesCount();
      if(unread){
        dataToReturn.unread = unread
      }
    }
    const participants = await processTwilioConversationParticipants(data);
    dataToReturn.participants = participants;
    return dataToReturn;
  } catch (error) {
    console.log("Error occured here", error);
    return dataToReturn;
  }
};

const processTwilioConversationMessages = async (data: any) => {
  const results: any[] = [];
  for (let i = 0; i < data.items.length; i++) {
    const active = await processTwilioMessage(data.items[i]);
    if (active) {
      results.push(active);
    }
  }
  results.sort(function (a, b) {
    const aDate = a.dateCreated;
    const bDate = b.dateCreated;
    return aDate.getTime() - bDate.getTime();
  });

  return results;
};

export const getTwilioActiveChatData = async (twilioStore: ITwilioStore) => {
  const client = getTwilioClient(twilioStore.token);
  const activeConv = await client.getConversationBySid(
    twilioStore.activeConversation?.sid
  );

  const activeConv2 = await processTwilioConversationFull(activeConv);
  return activeConv2;
};


export const updateTwilioConversationFriendlyName = async (
  twilioStore: ITwilioStore,
  data: string
) => {
  const client = getTwilioClient(twilioStore.token);
  const activeConv = await client.getConversationBySid(
    twilioStore.activeConversation?.sid
  );
  return await activeConv.updateFriendlyName(data);
};

export const deleteMessage = async (
  twilioStore: ITwilioStore,
  message: ITwilioMessage
) => {
  try {
    const client = getTwilioClient(twilioStore.token);
    const activeConv = await client.getConversationBySid(
      twilioStore.activeConversation?.sid
    );
    let targetMessage = null;
    const messages = await activeConv.getMessages();
    for (let i = 0; i < messages.items.length; i++) {
      console.log(
        "comparing",
        message.sid,
        messages.items[i].sid,
        message.sid == messages.items[i].sid
      );
      if (message.sid == messages.items[i].sid) {
        targetMessage = messages.items[i];
      }
    }
    return await targetMessage.updateAttributes({ delete: true });
  } catch (error) {
    console.log("deleteMessage", error);
  }
};


export const deleteActiveConversation = async (twilioStore: ITwilioStore) => {
  try {
    console.log("deleteActiveConversation -- triggered");
    const client = getTwilioClient(twilioStore.token);
    const activeConv = await client.getConversationBySid(
      twilioStore.activeConversation?.sid
    );
    return await activeConv.delete();
  } catch (error) {
    console.log("deleteMessage", error);
  }
};

export const leaveActiveConversation = async (twilioStore: ITwilioStore) => {
  try {  
    const client = getTwilioClient(twilioStore.token);
    const activeConv = await client.getConversationBySid(
      twilioStore.activeConversation?.sid
    );
    await activeConv.removeParticipant(twilioStore.myUser[0].sid_partner);
    
  } catch (error) {
    console.log("leaveActiveConversation", error);
  }
};

export const getTwilioConversations = async (
  twilioStore: ITwilioStore,
  user: IUser
) => {
  const client = getTwilioClient(twilioStore.token);
  const conversations = await client.getSubscribedConversations();
  const results: any[] = [];
  console.log("getTwilioConversations", conversations);

  for (let i = 0; i < conversations.items.length; i++) {
    const activeConv: ITwilioConversation = await processTwilioConversation(
      conversations.items[i],
      user._id
    );
    if (activeConv) {
      results.push(activeConv);
    }
  }
  console.log("getTwilioConversations -- END", results);
  results.sort(function (a, b) {
    const aDate = a.lastMessage?.dateCreated || a.dateCreated;
    const bDate = b.lastMessage?.dateCreated || b.dateCreated;
    return bDate.getTime() - aDate.getTime();
  });

  return results;
};

export const getTwilioConversationsFull = async (
  twilioStore: ITwilioStore,
  user: IUser
) => {
  const client = getTwilioClient(twilioStore.token);
  const conversations = await client.getSubscribedConversations();
  const results: any[] = [];
  for (let i = 0; i < conversations.items.length; i++) {
    const activeConv: ITwilioConversation = await processTwilioConversationFull(
      conversations.items[i]
    );
    if (activeConv.createdBy == user._id) {
      activeConv.isOwner = true;
    } else {
      activeConv.isOwner = false;
    }
    if (activeConv) {
      results.push(activeConv);
    }
  }
  results.sort(function (a, b) {
    const aDate = a.lastMessage?.dateCreated || a.dateCreated;
    const bDate = b.lastMessage?.dateCreated || b.dateCreated;
    return bDate.getTime() - aDate.getTime();
  });

  return results;
};

