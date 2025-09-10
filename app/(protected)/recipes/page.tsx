"use client";

import { Recipe } from "@/lib/types";
import { useState, useEffect } from "react";
import { ChefHat } from "lucide-react";
import { RecipesList } from "@/components/RecipesList";
import { RecipesFilter } from "@/components/RecipesFilter";

export default function RecipesPage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCuisine, setSelectedCuisine] = useState("");
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/recipes");
        if (response.ok) {
          const data = await response.json();
          setRecipes(data);
        }
      } catch (error) {
        console.error("Failed to fetch recipes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  const cuisines = Array.from(
    new Set(recipes.map((recipe) => recipe.cuisine).filter(Boolean))
  ) as string[];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <ChefHat className="w-12 h-12 text-orange-500 animate-bounce mx-auto mb-4" />
          <p className="text-gray-600">Завантаження рецептів...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Рецепти</h1>
        </div>

        <RecipesFilter
          cuisines={cuisines}
          searchQuery={searchQuery}
          selectedCuisine={selectedCuisine}
          handleCuisineChange={(value: string) => setSelectedCuisine(value)}
          handleSearchChange={(value: string) => setSearchQuery(value)}
        />

        <RecipesList
          recipes={recipes}
          searchQuery={searchQuery}
          selectedCuisine={selectedCuisine}
        />

        {recipes.length === 0 && (
          <div className="text-center py-12">
            <ChefHat className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-600 mb-2">
              Рецептів не знайдено
            </h3>
            <p className="text-gray-500">Спробуйте змінити критерії пошуку</p>
          </div>
        )}
      </div>
    </div>
  );
}
