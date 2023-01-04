import {
  FetchAgentsSuccessResponse,
  FetchAgentByUserIdSuccessResponse,
} from "./../types/agents";
import {
  IResponseWithPagination,
  QueryParmType,
} from "./../types/context/common";
import axiosHttp from "../services/axios.service";
import axios from "axios";
import { AGENTS_PER_PAGE } from "../config/config";
import { IGeneralRequestResponse } from "../types/context/auth";

export const getAgents = async (qs: QueryParmType) => {
  const response = await axiosHttp.get<FetchAgentsSuccessResponse>(
    `/v1/api/agents`,
    { params: qs }
  );

  return response.data;
};

export const getAgentByUserId = async (userId: string) => {
  const response = await axiosHttp.get<FetchAgentByUserIdSuccessResponse>(
    `/v1/api/agents/${userId}`
  );

  return response.data;
};

export const loadAgents = async (link: string, search?: string) => {
  const url = !search
    ? `${link}&per_page=${AGENTS_PER_PAGE}`
    : `${link}&per_page=${AGENTS_PER_PAGE}&search=${search}`;
  const response = await axios.get<IResponseWithPagination>(url);
  return response.data;
};
export const loadFilterAgents = async (link: string, search: string) => {
  const response = await axios.get<IResponseWithPagination>(
    `${link}&per_page=${AGENTS_PER_PAGE}&search=${search}`
  );
  return response.data;
};
// export const getAllReferrals = async (agentId: string) => {
//   const response = await axiosHttp.get<FetchAgentByUserIdSuccessResponse>(
//     `/v1/api/get/${userId}`
//   );

//   return response.data;
// };
