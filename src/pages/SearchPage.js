import { PaginationFooter } from "../Components/SearchPage/PaginationFooter";
import { Search } from "../Components/SearchPage/Search";
import { SearchHeader } from "../Components/SearchPage/SearchHeader";
import { GridCards } from "../Components/SearchPage/GridCards";

const SearchPage = () => {
  return (
    <>
      <div className="container">
        <SearchHeader />
        <Search />
      </div>
      <GridCards />
      <div className="container">
        <PaginationFooter />
      </div>
    </>
  );
};

export default SearchPage;
