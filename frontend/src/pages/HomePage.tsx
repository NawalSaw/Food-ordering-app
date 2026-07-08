import landingImage from "../assets/landing.png";
import appDownload from "../assets/appDownload.png";
import SearchBar, { SearchForm } from "@/components/SearchBar";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const handleFormSumbit = (searchFormValues: SearchForm) => {
    navigate({
      pathname: `/search/${searchFormValues.searchQuery}`,
    })
  }


  return (
    <div className="flex flex-col gap-12">
      <div className="md:px-32 bg-white rounded-lg shadow-md py-8 flex flex-col gap-5 text-center -mt-16">
        <h1 className="md:text-5xl text-3xl font-bold tracking-tight text-orange-600">
          Tuck into your favorite recipes
        </h1>
        <span className="text-xl">food is just a click away</span>
        <SearchBar
          placeholder="Search by city or country"
          onSubmit={handleFormSumbit}
        />
      </div>
      <div className="grid md:grid-cols-2 gap-5">
        <img loading="lazy" src={landingImage} alt="landing image" />
        <div className="flex flex-col items-center justify-center gap-4 text-center ">
          <span className="font-bold text-3xl tracking-tighter">
            Order takeaway even faster!
          </span>
          <span>Download the Mobile app</span>
          <img loading="lazy" src={appDownload} alt="download image" />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
