import { Recipe } from "@/lib/types";
import { ChefHat, Clock, Star, User } from "lucide-react";
import { ComponentPropsWithRef, FC } from "react";
import { Ingregients } from "./Ingregients";

export interface MyRecipesListProps extends ComponentPropsWithRef<"div"> {
  recipes: Recipe[];
}

export const MyRecipesList: FC<MyRecipesListProps> = ({ recipes }) => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating)
            ? "fill-yellow-400 text-yellow-400"
            : "text-gray-300"
        }`}
      />
    ));
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {recipes.map((recipe) => (
        <div
          key={recipe.id}
          className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
        >
          <div className="h-48 bg-gradient-to-br from-orange-200 to-amber-200 flex items-center justify-center">
            <ChefHat className="w-16 h-16 text-orange-500" />
          </div>

          <div className="p-6">
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-xl font-bold text-gray-800">
                {recipe.title}
              </h3>
              <div className="flex items-center gap-2">
                {recipe.cuisine && (
                  <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-lg text-xs font-medium">
                    {recipe.cuisine}
                  </span>
                )}
                <span
                  className={`px-2 py-1 rounded-lg text-xs font-medium ${
                    recipe.isPublic
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {recipe.isPublic ? "Публічний" : "Приватний"}
                </span>
              </div>
            </div>

            <p className="text-gray-600 text-sm mb-4">{recipe.description}</p>

            <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {recipe.cookTime} хв
              </div>
              <div className="flex items-center">
                {renderStars(recipe.averageRating)}
                <span className="ml-2">
                  {recipe.averageRating.toFixed(1)} ({recipe.totalRatings})
                </span>
              </div>
            </div>

            <Ingregients recipe={recipe} />

            <div className="flex gap-2">
              <button className="flex-1 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm transition-colors">
                Редагувати
              </button>
              <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm transition-colors">
                Переглянути
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
