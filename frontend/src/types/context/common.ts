import { IGeneralRequestResponse } from "./auth";

export type QueryParmType = { [key: string]: string };
export interface IPagination {
  total: number;
  count: number;
  current_page: number;
  next_page: number | null;
  links: {
    self: string;
    next: string | null;
    prev: string | null;
  };
}

export interface IResponseWithPagination extends IGeneralRequestResponse {
  pagination: IPagination;
}
