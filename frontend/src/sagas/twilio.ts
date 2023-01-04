import { put, takeEvery } from "@redux-saga/core/effects";
import { call, select } from "redux-saga/effects";
// import { useSelector } from "react-redux";
import {
  addMembersToConversation,
  deleteActiveConversation,
  deleteMessage,
  getTwilioActiveChatData,
  getTwilioClient,
  getTwilioConversations,
  getTwilioConversationsFull,
  
  // getTwilioMessages,
  initializeTwilio,
  registerEventsOnClient,
  sendToActiveConversation,
  setTwilioClientNull,
  startNewChat,
  updateTwilioConversationFriendlyName,
  leaveActiveConversation,
} from "../api/twilio";
import {
  actionTypes,
  activeConversationSuccess,
  addMembersToActiveChat,
  deleteConversationMessage,
  fetchConversationsLoading,
  fetchConversationsSuccess,
  fetchFullConversationsSuccess,
  fetchMessagesLoading,
  // fetchMessagesSuccess,
  getAvailableChatContactsSuccess,
  getTwilioStore,
  intializeTwilioSuccess,
  sendMessageToActiveConversation,
  sendMMSToActiveConversation,
  signoutTwilio,
  startConversationWithAgent,
  updateActiveConversationSuccess,
  updateConversationFriendlyName,
} from "../stores/twilio";
import {
  ITwilioConversation,
  ITwilioMessage,
  ITwilioStore,
} from "../types/twilio";
import {
  actionTypes as userActionTypes,
  currentUserInfo,
} from "../stores/users";
import { ILoginResponsInfo } from "../types/context/auth";
import { InferAsyncResponse } from "../types/asyncResponse";
import { getAvailableChatUsers, getUsersByQuery } from "../api/users";
import { IUser } from "../types/users";
import { noop } from "../utils/noop";
// import { consoleSandbox } from "@sentry/utils";


export function* workLoadRefreshData() {
  try {
    console.log("Damn you call please");
    yield workLoadFetchAllConversations();
  } catch (error) {
    () => console.log(error);
  }
}

export function* workLoadRefreshToken() {
  try {
    yield workLoadSignOutUser();
    yield workLoadIntializeTwilio();
  } catch (error) {
    () => console.log(error);
  }
}

export function* workLoadFetchAllConversations() {
  try {
    const twilioStore: ITwilioStore = yield select(getTwilioStore);
    const user: IUser = yield select(currentUserInfo);
    if (twilioStore.token) {
      // console.log("workLoadFetchAllConversations == before");
      let conversations: Array<ITwilioConversation> = yield call(
        getTwilioConversations,
        twilioStore,
        user
      );
  
      yield put(fetchConversationsSuccess(conversations));

      if ( conversations.length ){
        if( twilioStore?.activeConversation?.sid ) {
          const activeConv = conversations.find(obj => {
            return obj.sid === twilioStore?.activeConversation?.sid
          })
          if(activeConv?.sid){
            yield put(activeConversationSuccess(twilioStore.activeConversation));
          }else{
            yield put(activeConversationSuccess(conversations[0]));
          }
        }else{
          yield put(activeConversationSuccess(conversations[0]));
        }
      }else{
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        yield put(updateActiveConversationSuccess(undefined!));
      }
      conversations = yield call(
        getTwilioConversationsFull,
        twilioStore,
        user
      );
      yield put(fetchFullConversationsSuccess(conversations));

    }
  } catch (error) {
    () => console.log(error);
  }
}

function* workLoadIntializeTwilio() {
  try {
    let twilioStore: ITwilioStore = yield select(getTwilioStore);
    if (!twilioStore.token) {
      const token: string = yield call(initializeTwilio);
      if (token) {
        yield put(intializeTwilioSuccess(token));
      }
    }
    twilioStore = yield select(getTwilioStore);

    const client = getTwilioClient(twilioStore.token);
    
    yield call(registerEventsOnClient, client);
  } catch (error) {
    () => console.log(error);
  }
}

export function* workLoadDeleteMessage(
  data: ReturnType<typeof deleteConversationMessage>
){
  try {
    // delete message loacally here, 
    yield console.log("workLoadDeleteMessage", data);
    const twilioStore: ITwilioStore = yield select(getTwilioStore);

    yield call(deleteMessage, twilioStore, data.message);
    yield workLoadRefreshData()

  }catch(error){
    () => console.log(error);
  }
}

export function* workLoadDeleteActiveConversation(){
  try {
    const twilioStore: ITwilioStore = yield select(getTwilioStore);
    // delete conversation locally
    let {conversations, activeConversation} = twilioStore;
    conversations = conversations.filter(function( obj ) {
      return obj.sid !== twilioStore?.activeConversation?.sid;
    });
    if(conversations.length){
      activeConversation = conversations[0]
    }else{
      activeConversation= {
        friendlyName: "start new Chat",
        sid: "temp",
        messages: []
      }
    }
    yield put(fetchConversationsSuccess(conversations))
    yield put(activeConversationSuccess(activeConversation))
    yield call(deleteActiveConversation, twilioStore);
    yield workLoadRefreshData()

  }catch(error){
    () => console.log(error);
  }
}


export function* workLoadLeaveConversation(){
  try {
    const twilioStore: ITwilioStore = yield select(getTwilioStore);

    yield call(leaveActiveConversation, twilioStore);
  }catch(error){
    () => console.log(error);
  }
}

export function* workLoadWriteMMS(
  data: ReturnType<typeof sendMMSToActiveConversation>
) {
  try { 
    yield console.log("workLoadWriteMMS", data)
    const user: ILoginResponsInfo = yield select(currentUserInfo);
    const twilioStore: ITwilioStore = yield select(getTwilioStore);
    const {activeConversation} = twilioStore
    const messageData:ITwilioMessage = {
      body: "",
      author: user?._id,
      dateCreated: new Date(),
      dateUpdated: new Date(),
      type: "media",
      isLoading: true,
      attachedMedia: {
        sid : "random",
        contentType: data.message.contentType,
        filename: data.message.filename,
        url: data.message.url,
      },
      attributes: { },
      participant: {
        friendlyName: `${user?.first_name} ${user?.last_name}`,
        identity: user?._id || "",
        attributes: {
          name: `${user?.first_name} ${user?.last_name}`,
          first_name: `${user?.first_name}`,
          last_name: `${user?.last_name}`,
          image_path: `${user?.image_path}`,
        }
      } 
    } 

    if( data.replyTo.isVisible && data.replyTo.message ){
      messageData.attributes.replyTo = {
        sid: data.replyTo.message.sid || "",
        body: data.replyTo.message.body || "",
      }
    }

    activeConversation?.messages.push(messageData)
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    yield put(updateActiveConversationSuccess(activeConversation!))



    yield call(sendToActiveConversation, twilioStore, data.message, data.replyTo);
    console.log("send message success");

   } catch (error) {
    () => console.log(error);
  }
}

export function* workLoadWriteMessage(
  data: ReturnType<typeof sendMessageToActiveConversation>
) {
  try {
    const user: ILoginResponsInfo = yield select(currentUserInfo);
    const twilioStore: ITwilioStore = yield select(getTwilioStore);
    const {activeConversation} = twilioStore
    
    const messageData:ITwilioMessage = {
      body: data.message,
      author: user?._id,
      dateCreated: new Date(),
      dateUpdated: new Date(),
      type: "text",
      isLoading: true,
      attributes: { },
      participant: {
        friendlyName: `${user?.first_name} ${user?.last_name}`,
        identity: user?._id || "",
        attributes: {
          name: `${user?.first_name} ${user?.last_name}`,
          first_name: `${user?.first_name}`,
          last_name: `${user?.last_name}`,
          image_path: `${user?.image_path}`,
        }
      } 
    } 
    if( data.replyTo.isVisible && data.replyTo.message ){
      messageData.attributes.replyTo = {
        sid: data.replyTo.message.sid || "",
        body: data.replyTo.message.body || "",
      }
    }

    activeConversation?.messages.push(messageData)
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    yield put(updateActiveConversationSuccess(activeConversation!))


    // const message = data.message;
    yield call(sendToActiveConversation, twilioStore, data.message, data.replyTo);


  } catch (error) {
    () => console.log(error);
  }
}

export function* workLoadAddMembersToActiveChat(
  data: ReturnType<typeof addMembersToActiveChat>
) {
  try {
    const newChat = data.data;
    const twilioStore: ITwilioStore = yield select(getTwilioStore);
    const {activeConversation} = twilioStore
    const oldParticipantsIdentities = activeConversation?.participants?.map(a => a.identity);
    newChat.selectedUsers.forEach(element => {
      return activeConversation?.participants?.push({
        friendlyName: element.label,
        attributes:{
          name: element.label,
        },
        identity: element.value,
        isLoading: true,
      });
    });

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    yield put(updateActiveConversationSuccess(activeConversation!))
    const queryData = newChat.selectedUsers.map(a => a.value);
    const query = encodeURIComponent(queryData.join())
    // fetch users from db 
    const response: InferAsyncResponse< ReturnType<typeof getUsersByQuery>> = yield call(getUsersByQuery,query);

    const extractedIdentities = response?.data?.filter(function(obj) {
      if( obj.value && obj?.value?.twilio_sid && !oldParticipantsIdentities?.includes(obj.value._id) ){
        return obj.value;
      }
    }) || [];
    const extractedIdentityUsers = extractedIdentities.map(a => a.value);
    yield addMembersToConversation(twilioStore,extractedIdentityUsers);
    // just call the refresh active conversation here
    yield workLoadRefreshData()
  
  } catch (error) {
    console.log(error);
  }

}



export function* workLoadStartConversationWithAgent(
  data: ReturnType<typeof startConversationWithAgent>
) {
  try {
    const newChat = data.data;

    const user: ILoginResponsInfo = yield select(currentUserInfo);
    const twilioStore: ITwilioStore = yield select(getTwilioStore);
    const conversations = twilioStore.conversations
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const uuid = require("uuid");
    const sid = uuid.v4();
    const tempConversation: ITwilioConversation = {
      friendlyName: `${newChat.groupName}`,
      sid,
      messages: [],
      participants: [],
      dateCreated: new Date(),
      dateUpdated: new Date(),
    }

    conversations.unshift(tempConversation)
    
    if(newChat.message){
      yield put(fetchConversationsLoading())
    }

    yield put(fetchConversationsSuccess(conversations))
    yield put(updateActiveConversationSuccess(tempConversation))
    yield put(fetchMessagesLoading())

    newChat.selectedUsers.push({
      label: `${user.first_name} ${user.last_name}`,
      value: `${user._id}`,
    });

    const queryData = newChat.selectedUsers.map(a => a.value);
    const query = encodeURIComponent(queryData.join())
    // fetch users from db 
    const response: InferAsyncResponse< ReturnType<typeof getUsersByQuery>> = yield call(getUsersByQuery,query);
    const extractedIdentities = response?.data?.filter(function(obj) {
      if( obj.value && obj?.value?.twilio_sid ){
        return obj.value;
      }
    }) || [];
    const extractedIdentityUsers = extractedIdentities.map(a =>  a.value);


    yield call(startNewChat, twilioStore, newChat, extractedIdentityUsers);
    yield workLoadRefreshData()

  } catch (error) {
    () => console.log(error);
  }
}

function* workLoadSignOutUser() {
  yield call(setTwilioClientNull);
  yield put(signoutTwilio());
}

function* workLoadGetAvailableContacts() {
  try {
    const response: InferAsyncResponse< ReturnType<typeof getAvailableChatUsers>> = yield call(getAvailableChatUsers);
    yield put(getAvailableChatContactsSuccess(response.data));
  } catch (error) {
    // yield put(fetchReferralsError());
    () => noop;
  }
}

function* workLoadGetActiveChatData(){
  try{
    // yield put(fetchMessagesLoading())
    const twilioStore: ITwilioStore = yield select(getTwilioStore);
    const activeChat:ITwilioConversation = yield call(getTwilioActiveChatData,twilioStore )
    yield put(updateActiveConversationSuccess(activeChat))
  } catch (error) {
    // yield put(fetchReferralsError());
    () => noop;
  }
} 

function* workLoadUpdateGroupName( data: ReturnType<typeof updateConversationFriendlyName> ) {
  try {
    yield console.log("workLoadUpdateGroupName", data);
    const twilioStore: ITwilioStore = yield select(getTwilioStore);
    yield call(updateTwilioConversationFriendlyName,twilioStore, data.data)
    yield workLoadRefreshData()
  } catch (error) {
    () => noop;
  }
}

export function* watchTwilioSagas() {
  yield takeEvery(actionTypes.INTIALIZE_TWILIO, workLoadIntializeTwilio);
  yield takeEvery(
    actionTypes.SEND_MESSAGE_TO_ACTIVE_CONVERSATION,
    workLoadWriteMessage
  );
  yield takeEvery(
    actionTypes.SEND_MMS_TO_ACTIVE_CONVERSATION,
    workLoadWriteMMS
  );
  yield takeEvery(
    actionTypes.START_CONVERSATION_WITH_AGENT,
    workLoadStartConversationWithAgent
  );
  yield takeEvery(
    actionTypes.ADD_MEMBERS_TO_ACTIVE_CHAT,
    workLoadAddMembersToActiveChat
  );
  yield takeEvery(
    actionTypes.ACTIVE_CONVERSATION,
    workLoadGetActiveChatData
  );
  yield takeEvery(
    actionTypes.GET_AVALABLE_CHAT_CONTACTS,
    workLoadGetAvailableContacts
  );
  yield takeEvery(
    actionTypes.UPDATE_CONVERSATION_FRIENDLY_NAME,
    workLoadUpdateGroupName
  );
  yield takeEvery(
    actionTypes.DELETE_MESSAGE,
    workLoadDeleteMessage
  );
  yield takeEvery(
    actionTypes.DELETE_ACTIVE_CONVERSATION,
    workLoadDeleteActiveConversation
  );
  yield takeEvery(
    actionTypes.LEAVE_CHAT,
    workLoadLeaveConversation
  );
  
  yield takeEvery(userActionTypes.LOGOUT_USER, workLoadSignOutUser);
}

