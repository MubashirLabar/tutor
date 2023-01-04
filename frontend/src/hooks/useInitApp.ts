import { useEffect } from "react";
import { fetchAgents } from "../stores/agents";
import {
  doFetchCategories,
  doFetchSchools,
  doFetchTests,
} from "../stores/layouts";
import {
  selectCategories,
  selectSchools,
  selectTests,
} from "../stores/layouts/selectors";
import { useDispatch, useSelector } from "../stores/rootReducer";
import { doFetchUser } from "../stores/users";
import { useAuth } from "./useAuth";

export const useInitApp = () => {
  const { token } = useAuth();
  const dispatch = useDispatch();
  const schools = useSelector((store) => selectSchools(store));
  const tests = useSelector((store) => selectTests(store));
  const categories = useSelector((store) => selectCategories(store));
  //   const agents = useSelector((store) => fetchAgents({}));
  useEffect(() => {
    console.log(`hook activated `);
    dispatch(fetchAgents({}));
    dispatch(doFetchSchools());
    dispatch(doFetchCategories());
    dispatch(doFetchTests());
    if (token) {
      // we need to fetch all necessary data for the first time
      dispatch(doFetchUser());
    }
  }, [token]);
  return {
    schools,
    tests,
    categories,
  };
};
