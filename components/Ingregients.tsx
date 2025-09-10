import { Recipe } from "@/lib/types";
import { ComponentPropsWithRef, FC } from "react";

export interface IngregientsProps extends ComponentPropsWithRef<"div"> {
  recipe: Recipe;
}

export const Ingregients: FC<IngregientsProps> = ({ recipe }) => {
  return (
    <div className="mt-4 pt-4 border-t border-gray-100 mb-2">
      <p className="text-xs text-gray-500 mb-2 ">Інгредієнти:</p>
      <div className="flex flex-wrap gap-1 ">
        {recipe.ingredients.slice(0, 3).map((ingredient, index) => (
          <span
            key={index}
            className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
          >
            {ingredient.quantity} {ingredient.unit} {ingredient.name}
          </span>
        ))}
        {recipe.ingredients.length > 3 && (
          <span className="text-xs text-gray-500 self-center">
            +{recipe.ingredients.length - 3} ще
          </span>
        )}
      </div>
    </div>
  );
};
