"use client";

import { useAuth } from "@/context/AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { ChefHat, Users, Star, Utensils } from "lucide-react";

export default function HomePage() {
  const { session } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/recipes");
    }
  }, [session, router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <div className="flex justify-center mb-8">
            <ChefHat className="w-24 h-24 text-orange-500" />
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
            Food Recipes
          </h1>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link
              href="/register"
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-8 rounded-xl transition-colors text-lg"
            >
              Розпочати подорож
            </Link>
            <Link
              href="/login"
              className="bg-white hover:bg-gray-50 text-orange-500 font-bold py-4 px-8 rounded-xl border-2 border-orange-500 transition-colors text-lg"
            >
              Увійти
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-orange-500 mb-2">
                1000+
              </div>
              <div className="text-gray-600">Рецептів</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-500 mb-2">
                500+
              </div>
              <div className="text-gray-600">Кулінарів</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-500 mb-2">50+</div>
              <div className="text-gray-600">Кухонь світу</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-500 mb-2">4.8</div>
              <div className="text-gray-600">Середній рейтинг</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
