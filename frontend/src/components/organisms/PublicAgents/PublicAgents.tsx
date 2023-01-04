import { AGENTS_PER_PAGE, HOST_URL } from "../../../config/config";
import React, { useState, useEffect } from "react";
import { useFetchAgents } from "../../../hooks/useFetchAgents";
import {
  doClearAgents,
  doFetchAgentsWithPagination,
  doFetchAgentsWithPaginationSuccess,
  doFilterAgents,
  doReverseAgentsPagination,
} from "../../../stores/agents";
import {
  selectAgentsLoading,
  selectAgentsPagination,
  selectAgentsPaginationCache,
  selectSearchString,
} from "../../../stores/agents/selectors";
import { useDispatch, useSelector } from "../../../stores/rootReducer";
import { IAgent } from "../../../types/agents";
import { createModuleStyleExtractor } from "../../../utils/css";
import { Loading } from "../../molecules/Loading/Loading";
import { PublicAgentProfileItemMemo } from "../../molecules/PublicAgentProfilesItem/PublicAgentProfilesItem";
import styles from "./PublicAgents.module.scss";
import { SearchIcon, DropDownIcon } from "../../../assets/svgIcons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowAltCircleLeft,
  faArrowAltCircleRight,
} from "@fortawesome/free-solid-svg-icons";

const cx = createModuleStyleExtractor(styles);
const PublicAgentProfiles = () => {
  const url = `${HOST_URL}/v1/api/agents?`; //to hold on the normal pagination
  const url_filter = `${HOST_URL}/v1/api/agents/filter?`; //to hold on the filtered pagination
  const dispatch = useDispatch();
  const pagination = useSelector(selectAgentsPagination); //get the current pagination state
  const [paginationLink, setPaginationLink] = useState<string>(
    pagination.links.self
  );
  const searched = useSelector(selectSearchString);
  const [isSearchUsed, setIsSearchUsed] = useState<boolean>(
    searched ? true : false
  );

  const [search, SetSearch] = useState<string>(searched || "");

  const agents = useFetchAgents(paginationLink);
  const processing = useSelector(selectAgentsLoading);
  const caching = useSelector(selectAgentsPaginationCache);
  const bullets =
    pagination.total > 0
      ? Array.from(
          Array(
            Math.ceil(pagination.total / AGENTS_PER_PAGE) > 4
              ? 3
              : Math.ceil(pagination.total / AGENTS_PER_PAGE)
          ).keys()
        )
      : []; // 51 / 10
  useEffect(() => {
    //check if pagination self link is empty then pass the first page request
    if (paginationLink === "") {
      setPaginationLink(`${url}page=0`);
    }
  });

  const { current_page } = pagination;

  /**
   * We avoid doing pagination request each time for similar pages that are paginated before
   * @param page
   * @returns
   */
  const doPaginationWithCaching = (page: number) => {
    if (caching) {
      //if pagination exists in cache
      if (caching[page]) {
        // if it is going to back
        if (page < current_page) {
          const keys = Object.keys(caching).filter((key) => +key <= page);
          const agents: IAgent[] = [];
          keys.forEach((key) => {
            agents.push(...caching[+key].agents);
          });
          dispatch(doReverseAgentsPagination(caching[page].pagination, agents));
          return true;
        }
        dispatch(
          doFetchAgentsWithPaginationSuccess({
            status: "SUCCESS",
            pagination: caching[page].pagination,
            data: { agents: caching[page].agents },
            message: "Agents Listing Updated ",
          })
        );
        return true;
      }
      return false;
    }
    return false;
  };
  const doPaginateItems = (page: number) => {
    if (pagination.current_page === page) return;
    const { next_page, current_page } = pagination;
    const cached = doPaginationWithCaching(page);
    if (cached) return;
    if (page === next_page) {
      moveBackForth(true);
      return;
    }
    if (page === current_page - 1) {
      moveBackForth(false);
      return;
    }

    if (search) {
      setPaginationLink(`${url_filter}page=${page}&search=${search}`);
      return;
    }
    setPaginationLink(`${url}page=${page}`);
  };

  const moveBackForth = (next: boolean) => {
    if (next) {
      if (!pagination.next_page || !pagination.links.next) return;
      const isCached = doPaginationWithCaching(pagination.next_page);
      if (isCached) return;
      setPaginationLink(pagination.links.next);
      return;
    }
    if (!pagination.links.prev || pagination.current_page == 0) return;
    const cached = doPaginationWithCaching(pagination.current_page - 1);
    if (cached) return;
    setPaginationLink(pagination.links.prev);
  };

  const [openSearchFilter, setOpenSearchFilter] = useState(false);

  useEffect(() => {
    document.body.addEventListener("click", () => {
      setOpenSearchFilter(false);
    });
  }, []);

  const defaultPaginationState = (filter?: string) => {
    dispatch(doClearAgents());
    if (filter) {
      dispatch(doFilterAgents(`${url_filter}page=0`, filter));
      return;
    }
    dispatch(doFetchAgentsWithPagination(`${url}page=0`));
  };
  const onChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    SetSearch(value);
    if (!value) {
      console.log("dispatching without filter");
      defaultPaginationState();

      return;
    }
    value && SetSearch(value);
  };

  const submitPaginationRequest = () => {
    if (searched === search) return;
    if (!search || search.length < 0) {
      setIsSearchUsed(false);
      return;
    }
    setIsSearchUsed(true);
    defaultPaginationState(search);
  };

  const clearSearch = () => {
    if (!isSearchUsed) {
      SetSearch("");
      return;
    }
    setIsSearchUsed(false);
    SetSearch("");
    defaultPaginationState();
  };

  const onKeyPressed = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.code === "Enter") {
      console.log("Enter pressed");
      submitPaginationRequest();
    }
  };

  return (
    <div className={cx("agent-profiles")}>
      <div className={cx("wrapper")}>
        {processing && <Loading />}
        <div className={cx("filter-section")}>
          <div className={cx("searchbar")}>
            <div className={cx("actions")}>
              <button className={cx("icon_button")}>
                <SearchIcon />
              </button>
              <button
                className={cx(["icon_button", "drop-down"])}
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenSearchFilter(!openSearchFilter);
                }}
              >
                <DropDownIcon />
              </button>
              <input
                type="text"
                placeholder="Search Agents"
                className={cx("iput")}
                value={search}
                onChange={onChangeSearch}
                onKeyPress={onKeyPressed}
              />
              {search && (
                <button className={cx("cross-btn")} onClick={clearSearch}>
                  &times;
                </button>
              )}
              {/* Search Filter */}
              <div
                className={cx([
                  "search-filter",
                  openSearchFilter ? "open" : "",
                ])}
              >
                <div className={cx("item")}>Top Rating</div>
                <div className={cx("item")}>Popular</div>
                <div className={cx("item")}>New Agents</div>
              </div>
            </div>
          </div>
          <div className={cx("meta")}>
            <div className={cx("search-button-wrapper")}>
              <button
                className={cx("sign-btn")}
                onClick={() => submitPaginationRequest()}
              >
                Search
              </button>
            </div>
            {isSearchUsed && searched && (
              <div
                className={cx("text")}
                style={{ textAlign: "right", display: "block", width: "100%" }}
              >
                Search result for <span className={cx("tag")}> {searched}</span>
              </div>
            )}
          </div>
        </div>
        <div className={cx("profiles-list")}>
          {agents &&
            agents.map((agent, index) => (
              <PublicAgentProfileItemMemo
                agent={agent}
                key={index.toString()}
              />
            ))}

          {!processing && agents.length === 0 && search && (
            <p style={{ textAlign: "center" }}>No Search Results Found</p>
          )}
        </div>
        <div className={cx("ftr")}>
          {pagination.links.prev && (
            <button
              className={cx(["btn", "prev"])}
              onClick={() => moveBackForth(false)}
            >
              {/* <i className="icon-chevron-left" /> */}
              <FontAwesomeIcon icon={faArrowAltCircleLeft} />
            </button>
          )}
          <div className={cx("pages")}>
            {bullets.length > 1 &&
              bullets.map((item, index) => (
                <div
                  key={index.toString()}
                  className={cx([
                    "number",
                    item === pagination.current_page ? "acitve-page" : "",
                  ])}
                  onClick={(event) => doPaginateItems(item)}
                >
                  {item + 1}
                </div>
              ))}
          </div>
          {pagination.links.next && (
            <button
              className={cx(["btn", "prev"])}
              onClick={() => moveBackForth(true)}
            >
              <FontAwesomeIcon
                icon={faArrowAltCircleRight}
                size={"1x"}
                color={"#605e5c"}
              />
            </button>
          )}
        </div>
        {pagination && pagination.total > 0 && (
          <div className={cx("pagination-total-count")}>
            ({agents.length}/{pagination.total})
          </div>
        )}
      </div>
    </div>
  );
};

export default PublicAgentProfiles;
