import { INITIAL_RECIPES, INITIAL_COMMENTS, type Recipe, type Comment } from "./recipes-data";

// In-memory store fallback for dev or preview without active D1 binding
let inMemoryRecipes: Recipe[] = [...INITIAL_RECIPES];
let inMemoryComments: Comment[] = [...INITIAL_COMMENTS];
let inMemorySettings: Record<string, string> = {
  site_title: "Sabor y Sazón | Recetas Españolas Tradicionales",
  site_description: "Descubre las mejores recetas de la cocina española tradicional: paella, tortilla de patatas, tapas, postres y secretos culinarios.",
  adsense_pub_id: "ca-pub-1234567890123456",
  adsense_enabled: "true"
};

export async function getRecipes(db?: any, category?: string, query?: string): Promise<Recipe[]> {
  let list: Recipe[] = [];

  if (db && typeof db.prepare === "function") {
    try {
      let sql = "SELECT * FROM recipes ORDER BY id DESC";
      const { results } = await db.prepare(sql).all();
      if (results && results.length > 0) {
        list = results.map((r: any) => ({
          ...r,
          servings: Number(r.servings),
          featured: Boolean(r.featured),
          ingredients: JSON.parse(r.ingredients || "[]"),
          instructions: JSON.parse(r.instructions || "[]")
        }));
      }
    } catch (e) {
      console.warn("D1 query error, falling back to memory store:", e);
    }
  }

  if (list.length === 0) {
    list = [...inMemoryRecipes];
  }

  if (category && category !== "all") {
    list = list.filter((r) => r.category === category);
  }

  if (query && query.trim() !== "") {
    const q = query.toLowerCase().trim();
    list = list.filter((r) => r.title.toLowerCase().includes(q) || r.description.toLowerCase().includes(q));
  }

  return list;
}

export async function getRecipeBySlug(slug: string, db?: any): Promise<Recipe | null> {
  if (db && typeof db.prepare === "function") {
    try {
      const row = await db.prepare("SELECT * FROM recipes WHERE slug = ?").bind(slug).first();
      if (row) {
        return {
          ...row,
          servings: Number(row.servings),
          featured: Boolean(row.featured),
          ingredients: JSON.parse(row.ingredients || "[]"),
          instructions: JSON.parse(row.instructions || "[]")
        };
      }
    } catch (e) {
      console.warn("D1 query error by slug:", e);
    }
  }

  const found = inMemoryRecipes.find((r) => r.slug === slug);
  return found || null;
}

export async function addRecipe(recipeData: Omit<Recipe, "id">, db?: any): Promise<Recipe> {
  const newId = Date.now();
  const recipe: Recipe = { id: newId, ...recipeData };

  if (db && typeof db.prepare === "function") {
    try {
      await db.prepare(
        `INSERT INTO recipes (slug, title, description, prep_time, cook_time, servings, difficulty, category, hero_image, ingredients, instructions, featured)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
      ).bind(
        recipe.slug,
        recipe.title,
        recipe.description,
        recipe.prepTime,
        recipe.cookTime,
        recipe.servings,
        recipe.difficulty,
        recipe.category,
        recipe.heroImage,
        JSON.stringify(recipe.ingredients),
        JSON.stringify(recipe.instructions),
        recipe.featured ? 1 : 0
      ).run();
    } catch (e) {
      console.warn("D1 insert recipe error:", e);
    }
  }

  inMemoryRecipes.unshift(recipe);
  return recipe;
}

export async function deleteRecipe(id: number, db?: any): Promise<boolean> {
  if (db && typeof db.prepare === "function") {
    try {
      await db.prepare("DELETE FROM recipes WHERE id = ?").bind(id).run();
    } catch (e) {
      console.warn("D1 delete recipe error:", e);
    }
  }
  inMemoryRecipes = inMemoryRecipes.filter((r) => r.id !== id);
  return true;
}

// Comments Helper
export async function getComments(recipeSlug?: string, db?: any, includePending = false): Promise<Comment[]> {
  let list: Comment[] = [];

  if (db && typeof db.prepare === "function") {
    try {
      let sql = "SELECT * FROM comments";
      const conditions: string[] = [];
      const params: any[] = [];

      if (!includePending) {
        conditions.push("status = 'approved'");
      }
      if (recipeSlug) {
        conditions.push("recipe_slug = ?");
        params.push(recipeSlug);
      }

      if (conditions.length > 0) {
        sql += " WHERE " + conditions.join(" AND ");
      }
      sql += " ORDER BY id DESC";

      const { results } = await db.prepare(sql).bind(...params).all();
      if (results) {
        list = results.map((c: any) => ({
          id: c.id,
          recipeSlug: c.recipe_slug,
          authorName: c.author_name,
          authorEmail: c.author_email,
          rating: Number(c.rating),
          content: c.content,
          status: c.status,
          createdAt: c.created_at
        }));
      }
    } catch (e) {
      console.warn("D1 get comments error:", e);
    }
  }

  if (list.length === 0) {
    list = [...inMemoryComments];
    if (!includePending) {
      list = list.filter((c) => c.status === "approved");
    }
    if (recipeSlug) {
      list = list.filter((c) => c.recipeSlug === recipeSlug);
    }
  }

  return list;
}

export async function addComment(comment: Omit<Comment, "id" | "status" | "createdAt">, db?: any): Promise<Comment> {
  const newId = Date.now();
  const dateStr = new Date().toISOString().replace("T", " ").substring(0, 16);
  const newComment: Comment = {
    id: newId,
    ...comment,
    status: "approved", // auto approved for seamless user experience
    createdAt: dateStr
  };

  if (db && typeof db.prepare === "function") {
    try {
      await db.prepare(
        `INSERT INTO comments (recipe_slug, author_name, author_email, rating, content, status)
         VALUES (?, ?, ?, ?, ?, 'approved')`
      ).bind(
        newComment.recipeSlug,
        newComment.authorName,
        newComment.authorEmail,
        newComment.rating,
        newComment.content
      ).run();
    } catch (e) {
      console.warn("D1 add comment error:", e);
    }
  }

  inMemoryComments.unshift(newComment);
  return newComment;
}

export async function updateCommentStatus(id: number, status: "approved" | "pending", db?: any): Promise<boolean> {
  if (db && typeof db.prepare === "function") {
    try {
      await db.prepare("UPDATE comments SET status = ? WHERE id = ?").bind(status, id).run();
    } catch (e) {
      console.warn("D1 update comment status error:", e);
    }
  }
  const item = inMemoryComments.find((c) => c.id === id);
  if (item) item.status = status;
  return true;
}

export async function deleteComment(id: number, db?: any): Promise<boolean> {
  if (db && typeof db.prepare === "function") {
    try {
      await db.prepare("DELETE FROM comments WHERE id = ?").bind(id).run();
    } catch (e) {
      console.warn("D1 delete comment error:", e);
    }
  }
  inMemoryComments = inMemoryComments.filter((c) => c.id !== id);
  return true;
}

// Site Settings
export async function getSettings(db?: any): Promise<Record<string, string>> {
  if (db && typeof db.prepare === "function") {
    try {
      const { results } = await db.prepare("SELECT * FROM site_settings").all();
      if (results && results.length > 0) {
        const obj: Record<string, string> = {};
        results.forEach((row: any) => {
          obj[row.key] = row.value;
        });
        return { ...inMemorySettings, ...obj };
      }
    } catch (e) {
      console.warn("D1 get settings error:", e);
    }
  }
  return { ...inMemorySettings };
}

export async function updateSetting(key: string, value: string, db?: any): Promise<boolean> {
  if (db && typeof db.prepare === "function") {
    try {
      await db.prepare("INSERT OR REPLACE INTO site_settings (key, value) VALUES (?, ?)").bind(key, value).run();
    } catch (e) {
      console.warn("D1 update setting error:", e);
    }
  }
  inMemorySettings[key] = value;
  return true;
}
