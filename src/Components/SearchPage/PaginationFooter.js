import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { getSearchData } from "./services/SearchPage.reducer";
import "./styles/SearchPage.css";

export const PaginationFooter = () => {
  const dispatch = useDispatch();
  const searchResult = useSelector((state) => state.searchResult);
  const [paginateState, setPaginateState] = useState({
    offset: 0,
    perPage: 9,
    currentPage: 0,
    total: 0,
  });

  useEffect(() => {
    if (!searchResult?.total) {
      return;
    }

    const tempObj = { ...paginateState };
    tempObj.total = searchResult?.total;
    setPaginateState(tempObj);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchResult.total]);

  const handlePageChange = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * paginateState.perPage;
    const tempObj = { ...paginateState };
    tempObj.currentPage = selectedPage;
    tempObj.offset = offset;

    dispatch(
      getSearchData(searchResult?.query, selectedPage, searchResult?.typeSearch)
    );
    setPaginateState(tempObj);
  };

  if (!searchResult?.total) {
    return <div />;
  }

  return (
    <ReactPaginate
      previousLabel={"Previous"}
      nextLabel={"Next"}
      breakLabel="..."
      breakClassName={"break-me"}
      pageCount={paginateState.total}
      marginPagesDisplayed={1}
      forcePage={searchResult.page}
      pageRangeDisplayed={5}
      onPageChange={handlePageChange}
      containerClassName={"pagination"}
      subContainerClassName={"pages pagination"}
      activeClassName={"active"}
    />
  );
};
