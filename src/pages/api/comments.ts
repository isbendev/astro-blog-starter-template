import type { APIRoute } from "astro";
import { getComments, addComment, updateCommentStatus, deleteComment } from "../../lib/db";

export const prerender = false;

export const GET: APIRoute = async ({ request, locals }) => {
  const url = new URL(request.url);
  const slug = url.searchParams.get("slug") || undefined;
  const includePending = url.searchParams.get("includePending") === "true";
  const db = (locals as any)?.runtime?.env?.DB;

  const comments = await getComments(slug, db, includePending);
  return new Response(JSON.stringify(comments), {
    status: 200,
    headers: { "Content-Type": "application/json" }
  });
};

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    const body = await request.json();
    const { recipeSlug, authorName, authorEmail, rating, content } = body;

    if (!recipeSlug || !authorName || !content) {
      return new Response(JSON.stringify({ error: "Faltan campos obligatorios" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    const db = (locals as any)?.runtime?.env?.DB;
    const newComment = await addComment(
      {
        recipeSlug,
        authorName,
        authorEmail: authorEmail || "anónimo@recetas.com",
        rating: Number(rating) || 5,
        content
      },
      db
    );

    return new Response(JSON.stringify({ success: true, comment: newComment }), {
      status: 201,
      headers: { "Content-Type": "application/json" }
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message || "Error al guardar comentario" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};

export const PATCH: APIRoute = async ({ request, locals }) => {
  try {
    const body = await request.json();
    const { id, status } = body;
    const db = (locals as any)?.runtime?.env?.DB;

    await updateCommentStatus(Number(id), status, db);
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
};

export const DELETE: APIRoute = async ({ request, locals }) => {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get("id");
    if (!id) return new Response(JSON.stringify({ error: "ID requerido" }), { status: 400 });

    const db = (locals as any)?.runtime?.env?.DB;
    await deleteComment(Number(id), db);
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
};
