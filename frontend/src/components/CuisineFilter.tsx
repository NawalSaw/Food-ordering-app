import { cuisineList } from "@/config/restaurant-options-config";
import { Label } from "./ui/label";
import { Check } from "lucide-react";
import { Button } from "./ui/button";

type Props = {
  onChange: (cuisine: string[]) => void;
  selectedCuisine: string[];
  isExpanded: boolean;
  onExpandClick: () => void;
};

const CuisineFilter = ({
  onChange,
  selectedCuisine,
  isExpanded,
  onExpandClick,
}: Props) => {
  const handleCuisinesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const clickedCuisine = event.target.value;
    const isChecked = event.target.checked;

    const newCuisinesList = isChecked
      ? [...selectedCuisine, clickedCuisine]
      : selectedCuisine.filter((cuisine) => cuisine !== clickedCuisine);

    onChange(newCuisinesList);
  };
  const handleCuisinesReset = () => onChange([]);

  return (
    <>
      <div className="flex justify-between items-center px-2">
        <div className="text-md font-semibold mb-2">Filter By Cuisines</div>
        <div
          onClick={handleCuisinesReset}
          className="text-sm font-semibold mb-2 underline cursor-pointer text-blue-500"
        >
          Reset Filters
        </div>
      </div>
      <div className="space-y-2 flex flex-col">
        {cuisineList
          .slice(0, isExpanded ? cuisineList.length : 5)
          .map((cuisine, index) => {
            const isSelected = selectedCuisine.includes(cuisine);
            return (
              <div className="flex" key={index}>
                <input
                  id={`cuisine_${cuisine}`}
                  type="checkbox"
                  className="hidden"
                  value={cuisine}
                  checked={isSelected}
                  onChange={handleCuisinesChange}
                />
                <Label
                  htmlFor={`cuisine_${cuisine}`}
                  className={`flex flex-1 items-center cursor-pointer text-sm rounded-full px-4 py-2 font-semibold ${
                    isSelected
                      ? "border border-green-500 text-green-600"
                      : "border-gray-700 border"
                  }`}
                >
                  {isSelected && <Check size={20} strokeWidth={3}></Check>}
                  {cuisine}
                </Label>
              </div>
            );
          })}
        <Button
          variant={"link"}
          onClick={onExpandClick}
          className="mt-4 flex-1"
        >
          {isExpanded ? "Show Less" : "Show More"}
        </Button>
      </div>{" "}
    </>
  );
};

export default CuisineFilter;
