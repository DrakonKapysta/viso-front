"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChefHat, Plus, Minus } from "lucide-react";
import { useAuth } from "@/context/AuthProvider";

interface Ingredient {
  name: string;
  quantity: number;
  unit: string;
}

export default function CreateRecipePage() {
  const router = useRouter();
  const { session } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    cookTime: "",
    imageUrl: "https://example.com/chili-con-carne.jpg",
    cuisine: "",
  });

  const [ingredients, setIngredients] = useState<Ingredient[]>([
    { name: "", quantity: 0, unit: "г" },
  ]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleIngredientChange = (
    index: number,
    field: keyof Ingredient,
    value: string | number
  ) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = {
      ...newIngredients[index],
      [field]: value,
    };
    setIngredients(newIngredients);
  };

  const addIngredient = () => {
    setIngredients([...ingredients, { name: "", quantity: 0, unit: "г" }]);
  };

  const removeIngredient = (index: number) => {
    if (ingredients.length > 1) {
      setIngredients(ingredients.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (!session) return;

    try {
      const validIngredients = ingredients.filter(
        (ing) => ing.name.trim() !== "" && ing.quantity > 0
      );
      console.log(ingredients, validIngredients);

      const recipeData = {
        title: formData.title,
        description: formData.description,
        ingredients: validIngredients,
        cookTime: parseInt(formData.cookTime) || 0,
        imageUrl: formData.imageUrl,
        cuisine: formData.cuisine.toLowerCase(),
        authorId: session.id,
        isPublic: true,
      };

      const response = await fetch("/api/recipes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          credentials: "include",
        },
        body: JSON.stringify(recipeData),
      });

      if (response.ok) {
        router.push("/my-recipes");
      } else {
        const error = await response.json();
        console.error("Failed to create recipe:", error);
      }
    } catch (error) {
      console.error("Error creating recipe:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-4 mx-auto container">
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Назва рецепту
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors"
              placeholder="Наприклад: Український борщ"
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Опис
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors"
              placeholder="Короткий опис вашого рецепту..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="cookTime"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Час приготування (хв)
              </label>
              <input
                type="number"
                id="cookTime"
                name="cookTime"
                value={formData.cookTime}
                onChange={handleChange}
                required
                min="1"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors"
              />
            </div>

            <div>
              <label
                htmlFor="cuisine"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Кухня
              </label>
              <select
                id="cuisine"
                name="cuisine"
                value={formData.cuisine}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors"
              >
                <option value="">Оберіть кухню</option>
                <option value="Українська">Українська</option>
                <option value="Італійська">Італійська</option>
                <option value="Французька">Французька</option>
                <option value="Японська">Японська</option>
                <option value="Американська">Американська</option>
                <option value="Мексиканська">Мексиканська</option>
                <option value="Китайська">Китайська</option>
                <option value="Індійська">Індійська</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-4">
              Інгредієнти
            </label>
            <div className="space-y-3">
              {ingredients.map((ingredient, index) => (
                <div key={index} className="grid grid-cols-12 gap-2 items-end">
                  <div className="col-span-2">
                    <label className="block text-xs text-gray-500 mb-1">
                      Кількість
                    </label>
                    <input
                      type="number"
                      value={ingredient.quantity}
                      onChange={(e) =>
                        handleIngredientChange(
                          index,
                          "quantity",
                          parseInt(e.target.value) || 0
                        )
                      }
                      min="0"
                      step="0.1"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors text-sm"
                      placeholder="500"
                    />
                  </div>
                  <div className="col-span-2">
                    <label
                      htmlFor="unit"
                      className="block text-xs text-gray-500 mb-1"
                    >
                      Одиниця
                    </label>
                    <input
                      onChange={(e) =>
                        handleIngredientChange(
                          index,
                          "unit",
                          e.target.value || "u"
                        )
                      }
                      id="unit"
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors text-sm"
                    />
                  </div>
                  <div className="col-span-7">
                    <label className="block text-xs text-gray-500 mb-1">
                      Назва інгредієнта
                    </label>
                    <input
                      type="text"
                      value={ingredient.name}
                      onChange={(e) =>
                        handleIngredientChange(index, "name", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors text-sm"
                      placeholder="Яловичий фарш"
                      required={index === 0}
                    />
                  </div>
                  <div className="col-span-1">
                    {ingredients.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeIngredient(index)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={addIngredient}
                className="flex items-center gap-2 text-orange-600 hover:text-orange-700 font-medium transition-colors"
              >
                <Plus className="w-4 h-4" />
                Додати інгредієнт
              </button>
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-4 rounded-lg transition-colors"
            >
              Скасувати
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white font-medium py-3 px-4 rounded-lg transition-colors"
            >
              {loading ? "Створюємо..." : "Створити рецепт"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
