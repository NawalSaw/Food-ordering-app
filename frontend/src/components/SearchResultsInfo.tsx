import { Link } from "react-router-dom";

type Props = {
  total: number;
  city: string;
};

const SearchResultsInfo = ({ total, city }: Props) => {
  return (
    <div className="text-xl justify-items-center font-bold flex flex-col gap-3 justify-between lg:items-center lg:flex-row">
      <span>
        {total} restaurants in {city}
        <Link
          to={"/"}
          className="ml-2 text-sm font-semibold underline cursor-pointer text-blue-500 hover:text-blue-400"
        >
          Changes Location
        </Link>
      </span>
    </div>
  );
};

export default SearchResultsInfo;
