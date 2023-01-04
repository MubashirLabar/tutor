import { ICategory, ISchool, ISubjects, ITest } from "../../types/layout";
import { actionTypes, Actions } from "./actions";

export interface ILayoutStore {
  sidebarOpen: boolean;
  schools: ISchool[];
  subjects: ISubjects;
  categories: ICategory[];
  tests: ITest[];
}

export const initialState: ILayoutStore = {
  sidebarOpen: false,
  categories: [],
  subjects: {},
  schools: [],
  tests: [],
};

export const reducer = (
  state: ILayoutStore = initialState,
  action: Actions
) => {
  switch (action.type) {
    case actionTypes.TOGGLE_SIDEBAR_CLOSE:
    case actionTypes.TOGGLE_SIDEBAR_OPEN: {
      return { ...state, sidebarOpen: action.flag };
    }
    case actionTypes.FETCH_TESTS:
    case actionTypes.FETCH_CATEGORIES:
    case actionTypes.FETCH_SUBJECTS:
    case actionTypes.FETCH_SCHOOLS:
      return {
        ...state,
      };
    case actionTypes.FETCH_SCHOOLS_SUCCESS:
      return {
        ...state,
        schools: action.response,
      };
    case actionTypes.FETCH_TESTS_SUCCESS:
      return {
        ...state,
        tests: action.response,
      };
    case actionTypes.FETCH_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: action.categories,
      };
    case actionTypes.FETCH_SUBJECTS_SUCCESS:
      return {
        ...state,
        subjects: {
          ...state.subjects,
          [action.category]: action.subjects,
        },
      };

    default:
      return state;
  }
};
