import { ICategory, ISchool, ISubject, ITest } from "../../types/layout";

export const actionTypes = {
  TOGGLE_SIDEBAR_OPEN: "@LAYOUT/TOGGLE_SIDEBAR_OPEN",
  TOGGLE_SIDEBAR_CLOSE: "@LAYOUT/TOGGLE_SIDEBAR_CLOSE",
  FETCH_SCHOOLS: "@@LAYOUT/FETCH_SCHOOLS",
  FETCH_SCHOOLS_SUCCESS: "@@LAYOUT/FETCH_SCHOOLS_SUCCESS",
  FETCH_SUBJECTS: "@@LAYOUT/FETCH_SUBJECTS",
  FETCH_SUBJECTS_SUCCESS: "@@LAYOUT/FETCH_SUBJECTS_SUCCESS",
  FETCH_CATEGORIES: "@@LAYOUT/FETCH_CATEGORIES",
  FETCH_CATEGORIES_SUCCESS: "@@LAYOUT/FETCH_CATEGORIES_SUCCESS",

  FETCH_TESTS: "@@LAYOUT/FETCH_TESTS",
  FETCH_TESTS_SUCCESS: "@@LAYOUT/FETCH_TESTS_SUCCESS",
} as const;

export const sidebarOpen = () => ({
  type: actionTypes.TOGGLE_SIDEBAR_OPEN,
  flag: true,
});

export const sidebarCLose = () => ({
  type: actionTypes.TOGGLE_SIDEBAR_CLOSE,
  flag: false,
});

export const doFetchSchools = () => ({
  type: actionTypes.FETCH_SCHOOLS,
});
export const doFetchSchoolsSuccess = (response: ISchool[]) => ({
  type: actionTypes.FETCH_SCHOOLS_SUCCESS,
  response,
});

export const doFetchTests = () => ({
  type: actionTypes.FETCH_TESTS,
});
export const doFetchTestsSuccess = (response: ITest[]) => ({
  type: actionTypes.FETCH_TESTS_SUCCESS,
  response,
});
export const doFetchCategories = () => ({
  type: actionTypes.FETCH_CATEGORIES,
});
export const doFetchCategoriesSuccess = (categories: ICategory[]) => ({
  type: actionTypes.FETCH_CATEGORIES_SUCCESS,
  categories,
});

export const doFetchSubjects = (category: string) => ({
  type: actionTypes.FETCH_SUBJECTS,
  category,
});

export const doFetchSubjectsSuccess = (
  subjects: ISubject[],
  category: string
) => ({
  type: actionTypes.FETCH_SUBJECTS_SUCCESS,
  subjects,
  category,
});

export type Actions =
  | ReturnType<typeof sidebarOpen>
  | ReturnType<typeof sidebarCLose>
  | ReturnType<typeof doFetchSchools>
  | ReturnType<typeof doFetchSchoolsSuccess>
  | ReturnType<typeof doFetchTests>
  | ReturnType<typeof doFetchTestsSuccess>
  | ReturnType<typeof doFetchCategories>
  | ReturnType<typeof doFetchCategoriesSuccess>
  | ReturnType<typeof doFetchSubjects>
  | ReturnType<typeof doFetchSubjectsSuccess>;
