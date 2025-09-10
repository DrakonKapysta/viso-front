"use client";

import { Recipe } from "@/lib/types";
import { useState, useEffect } from "react";
import { Clock, Star, Plus, ChefHat } from "lucide-react";
import { useAuth } from "@/context/AuthProvider";
import { MyRecipesList } from "@/components/MyRecipesList";

export default function MyRecipesPage() {
  const { session } = useAuth();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!session) return;
    const fetchRecipes = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/recipes/${session.id}`);
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
  }, [session]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <ChefHat className="w-12 h-12 text-orange-500 animate-bounce mx-auto mb-4" />
          <p className="text-gray-600">Завантаження ваших рецептів...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Мої рецепти
            </h1>
            <p className="text-gray-600">
              Ваші створені рецепти ({recipes.length})
            </p>
          </div>
        </div>

        {recipes.length > 0 ? (
          <MyRecipesList recipes={recipes} />
        ) : (
          <div className="text-center py-16">
            <ChefHat className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h3 className="text-2xl font-medium text-gray-600 mb-4">
              У вас поки немає рецептів
            </h3>
          </div>
        )}
      </div>
    </div>
  );
}
