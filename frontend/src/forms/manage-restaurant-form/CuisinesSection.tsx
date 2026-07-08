import {
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { cuisineList } from "@/config/restaurant-options-config";
import { useFormContext } from "react-hook-form";
import CuisineCheckBox from "./CuisineCheckBox";

function CuisinesSection() {
  const { control } = useFormContext();
  return (
    <div className="space-y-2">
      <div className="text-center font-bold text-2xl">
        <h2>Cuisines</h2>
        <FormDescription>
          Select your cuisines that your Restaurant serves
        </FormDescription>
      </div>
      <FormField
        control={control}
        name="cuisines"
        render={({ field }) => (
          <FormItem>
            <div className="grid md:grid-cols-5 gap-1 sm:grid-cols-4 grid-cols-3">
              {cuisineList.map((cuisineItem) => (
                <CuisineCheckBox
                  cuisine={cuisineItem}
                  key={cuisineItem}
                  field={field}
                />
              ))}
            </div>
            <FormMessage />
          </FormItem>
        )}
      ></FormField>
    </div>
  );
}

export default CuisinesSection;
