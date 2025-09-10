import { Recipe } from "@/lib/types";
import { ComponentPropsWithRef, FC } from "react";

export interface RecipesFilterProps extends ComponentPropsWithRef<"div"> {
  cuisines: string[];
  selectedCuisine: string;
  searchQuery: string;
  handleSearchChange: (value: string) => void;
  handleCuisineChange: (value: string) => void;
}

export const RecipesFilter: FC<RecipesFilterProps> = ({
  cuisines,
  searchQuery,
  selectedCuisine,
  handleCuisineChange,
  handleSearchChange,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Шукати рецепти..."
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
          />
        </div>
        <div className="md:w-48">
          <select
            value={selectedCuisine}
            onChange={(e) => handleCuisineChange(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
          >
            <option value="">Всі кухні</option>
            {cuisines.map((cuisine) => (
              <option key={cuisine} value={cuisine}>
                {cuisine}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};
