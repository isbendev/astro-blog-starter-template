import type { APIRoute } from "astro";
import { getRecipes, addRecipe, deleteRecipe } from "../../lib/db";

export const prerender = false;

export const GET: APIRoute = async ({ request, locals }) => {
  const url = new URL(request.url);
  const category = url.searchParams.get("category") || undefined;
  const q = url.searchParams.get("q") || undefined;
  const db = (locals as any)?.runtime?.env?.DB;

  const recipes = await getRecipes(db, category, q);
  return new Response(JSON.stringify(recipes), {
    status: 200,
    headers: { "Content-Type": "application/json" }
  });
};

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    const body = await request.json();
    const { title, slug, description, prepTime, cookTime, servings, difficulty, category, heroImage, ingredients, instructions, featured } = body;

    if (!title || !description || !category) {
      return new Response(JSON.stringify({ error: "Título, descripción y categoría son requeridos" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    const recipeSlug = slug || title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    const db = (locals as any)?.runtime?.env?.DB;

    const recipe = await addRecipe(
      {
        title,
        slug: recipeSlug,
        description,
        prepTime: prepTime || "20 min",
        cookTime: cookTime || "30 min",
        servings: Number(servings) || 4,
        difficulty: difficulty || "Media",
        category: category || "principales",
        categoryLabel: category === "tapas" ? "Tapas y Entrantes" : category === "sopas" ? "Sopas y Cremas" : category === "postres" ? "Postres Tradicionales" : "Platos Principales",
        heroImage: heroImage || "https://images.unsplash.com/photo-1534080564583-6be75777b70a?auto=format&fit=crop&w=1200&q=80",
        ingredients: Array.isArray(ingredients) ? ingredients : String(ingredients).split("\n").filter(Boolean),
        instructions: Array.isArray(instructions) ? instructions : String(instructions).split("\n").filter(Boolean),
        featured: Boolean(featured)
      },
      db
    );

    return new Response(JSON.stringify({ success: true, recipe }), {
      status: 201,
      headers: { "Content-Type": "application/json" }
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message || "Error al añadir receta" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};

export const DELETE: APIRoute = async ({ request, locals }) => {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get("id");
    if (!id) return new Response(JSON.stringify({ error: "ID requerido" }), { status: 400 });

    const db = (locals as any)?.runtime?.env?.DB;
    await deleteRecipe(Number(id), db);
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
};
