import { Recipe } from "@/lib/types";
import { ChefHat, Clock, User } from "lucide-react";
import { ComponentPropsWithRef, FC } from "react";
import { Ingregients } from "./Ingregients";

export interface RecipesListProps extends ComponentPropsWithRef<"div"> {
  recipes: Recipe[];
  searchQuery: string;
  selectedCuisine: string;
}

export const RecipesList: FC<RecipesListProps> = ({
  recipes,
  searchQuery,
  selectedCuisine,
}) => {
  const filteredRecipes = recipes.filter((recipe) => {
    const matchesSearch =
      recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recipe.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCuisine =
      selectedCuisine === "" || recipe.cuisine === selectedCuisine;
    return matchesSearch && matchesCuisine;
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredRecipes.map((recipe) => (
        <div
          key={recipe.id}
          className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
        >
          <div className="h-48 bg-gradient-to-br from-orange-200 to-amber-200 flex items-center justify-center">
            <ChefHat className="w-16 h-16 text-orange-500" />
          </div>

          <div className="p-6">
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-xl font-bold text-gray-800 line-clamp-2">
                {recipe.title}
              </h3>
              {recipe.cuisine && (
                <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-lg text-xs font-medium">
                  {recipe.cuisine}
                </span>
              )}
            </div>

            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
              {recipe.description}
            </p>

            <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {recipe.cookTime} хв
              </div>
              <div className="flex items-center">
                <User className="w-4 h-4 mr-1" />
                {recipe.author?.email.split("@")[0]}
              </div>
            </div>
            <Ingregients recipe={recipe} />
          </div>
        </div>
      ))}
    </div>
  );
};
