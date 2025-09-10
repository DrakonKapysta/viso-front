"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthProvider";
import { ChefHat, LogOut } from "lucide-react";

export default function Navigation() {
  const { session, logout } = useAuth();

  if (!session) return null;

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/recipes" className="flex items-center space-x-2">
            <ChefHat className="w-8 h-8 text-orange-500" />
            <span className="text-xl font-bold text-gray-800">
              Food Recipes
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            <Link
              href="/recipes"
              className="text-gray-700 hover:text-orange-600 font-medium transition-colors"
            >
              Рецепти
            </Link>
            <Link
              href="/my-recipes"
              className="text-gray-700 hover:text-orange-600 font-medium transition-colors"
            >
              Мої рецепти
            </Link>
            <Link
              href="/create-recipe"
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Створити рецепт
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-gray-700">{session.email}</span>
            <button
              onClick={logout}
              className="flex items-center space-x-2 text-gray-700 hover:text-red-600 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Вийти</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
