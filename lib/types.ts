// API Types for FlavorAI

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface User {
  id: string;
  email: string;
  roles: "ADMIN" | "USER";
  createdAt: string;
  updatedAt: string;
}

export interface Ingredient {
  name: string;
  unit: string;
  quantity: number;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface ApiError {
  message: string;
  statusCode?: number;
}

export interface Recipe {
  id: string;
  title: string;
  description?: string;
  cookTime: number;
  ingredients: Ingredient[];
  imageUrl?: string;
  cuisine?: string;
  authorId: string;
  author?: User;
  isPublic: boolean;
  averageRating: number;
  totalRatings: number;
  createdAt: string;
  updatedAt: string;
}

export interface Rating {
  id: string;
  value: number; // 1-5
  comment?: string;
  recipeId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateRecipeRequest {
  title: string;
  description?: string;
  cookTime: number;
  ingredients: Ingredient[];
  cuisine?: string;
  imageUrl?: string;
  isPublic?: boolean;
}

export interface RateRecipeRequest {
  value: number;
  comment?: string;
}
