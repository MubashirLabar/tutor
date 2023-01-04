import axiosHttp from "../services/axios.service";
import { IGeneralRequestResponse } from "../types/context/auth";
import { ICategory, ISchool, ITest } from "../types/layout";

export const fetchSchools = async () => {
  try {
    const response = await axiosHttp.get<IGeneralRequestResponse>(
      `/v1/api/schools`
    );
    return response.data;
  } catch (error) {
    console.log(`error ${JSON.stringify(error)}`);
  }
};

export const fetchCategories = async () => {
  try {
    const response = await axiosHttp.get<IGeneralRequestResponse>(
      `/v1/api/categories`
    );
    return response.data;
  } catch (error) {
    console.log(`error ${JSON.stringify(error)}`);
  }
};

export const fetchTests = async () => {
  try {
    const response = await axiosHttp.get<IGeneralRequestResponse>(
      `/v1/api/tests`
    );
    return response.data;
  } catch (error) {
    console.log(`error ${JSON.stringify(error)}`);
  }
};
