import { useSearchRestaurants } from "@/api/RestaurantApi";
import BackButton from "@/components/Button";
import CuisineFilter from "@/components/CuisineFilter";
import NotFound from "@/components/NotFound";
import RestaurantNotFound from "@/components/RestaurantNotFound";
import SearchBar, { SearchForm } from "@/components/SearchBar";
import SearchResultCard from "@/components/SearchResultCard";
import SearchResultsInfo from "@/components/SearchResultsInfo";
import SortOptionDropdown from "@/components/SortOptionDropdown";
import PaginationSelector from "@/components/paginationSelector";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import error from "../assets/error.jpg";

export type SearchState = {
  searchQuery: string;
  page: number;
  selectedCuisine: string[];
  sortOption: string;
};

const SearchPage = () => {
  const { city } = useParams();
  const [showNotFound, setShowNotFound] = useState<boolean>(false);

  const [searchState, setSearchState] = useState<SearchState>({
    searchQuery: "",
    page: 1,
    selectedCuisine: [],
    sortOption: "bestMatch",
  });

  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const { results, isLoading } = useSearchRestaurants(searchState, city);

  const setSortOption = (sortOption: string) => {
    setSearchState((prevState) => ({
      ...prevState,
      sortOption,
      page: 1,
    }));
  };

  const setSelectedCuisine = (selectedCuisine: string[]) => {
    setSearchState((prevState) => ({
      ...prevState,
      selectedCuisine,
      page: 1,
    }));
  };

  const setPage = (page: number) => {
    setSearchState((prevState) => ({ ...prevState, page }));
  };
  const setSearchQuery = (searchFormData: SearchForm) => {
    setSearchState((prevState) => ({
      ...prevState,
      searchQuery: searchFormData.searchQuery,
      page: 1,
    }));
  };
  const resetSearch = () => {
    setSearchState((prevState) => ({ ...prevState, searchQuery: "", page: 1 }));
  };

  const handleBackClick = () => {
    setShowNotFound(true);
    searchState.selectedCuisine.pop();
    searchState.searchQuery = "";
  };

  useEffect(() => {
    setShowNotFound(false);
  }, [searchState.selectedCuisine, searchState.searchQuery]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center my-[40%]">
        <Loader2 className="animate-spin h-6 w-6" />
      </div>
    );
  }

  if (!results?.data || !city) {
    return (
      <NotFound
        statusCode={404}
        message="Restaurant Not Found"
        description={`Sorry, the restaurant you're looking for doesn't exist in ${city} . You'll find lots to explore on the home page or try to search something else.`}
      />
    );
  }

  if (results.pagination.total === 0 && !showNotFound) {
    console.log(showNotFound);
    return (
      <>
        <NotFound
          statusCode={404}
          message="Restaurant Not Found"
          button={
            <BackButton
              onClick={handleBackClick}
              className="bg-orange-500 w-40"
            >
              Back
            </BackButton>
          }
          description={`Sorry, the restaurant you're looking for doesn't exist with this configuration. You'll find lots to explore on the home page or try to search something else.`}
        />
      </>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      <div id="cuisines-list">
        <CuisineFilter
          isExpanded={isExpanded}
          onExpandClick={() =>
            setIsExpanded((prevIsExpanded) => !prevIsExpanded)
          }
          selectedCuisine={searchState.selectedCuisine}
          onChange={setSelectedCuisine}
        />
      </div>
      <div id="main-content" className="flex flex-col gap-5">
        <div className="">
          <SearchBar
            searchQuery={searchState.searchQuery}
            placeholder="Search by cuisines or restaurant name"
            onSubmit={setSearchQuery}
            onReset={resetSearch}
          />
        </div>

        <div className={`flex justify-between" flex-col gap-3 ${results.pagination.total > 0 ? "lg:flex-row" : "my=[50%]"}`}>
          {results.pagination.total > 0 ? (
            <SearchResultsInfo total={results.pagination.total} city={city} />
          ) : (
            <RestaurantNotFound imageUrl={error} />
          )}
          {results.pagination.total > 0 && (
            <SortOptionDropdown
              onChange={(value) => setSortOption(value)}
              sortOption={searchState.sortOption}
            />
          )}
        </div>
        {results.data.map(
          (restaurant) =>
            results.pagination.total > 0 && (
              <SearchResultCard key={restaurant._id} restaurant={restaurant} />
            )
        )}

        {results.pagination.total > 0 && (
          <PaginationSelector
            page={results.pagination.page}
            pages={results.pagination.pages}
            onPageChange={setPage}
          />
        )}
      </div>
    </div>
  );
};

export default SearchPage;
