import type { APIRoute } from "astro";
import { getSettings, updateSetting } from "../../lib/db";

export const prerender = false;

export const GET: APIRoute = async ({ locals }) => {
  const db = (locals as any)?.runtime?.env?.DB;
  const settings = await getSettings(db);
  return new Response(JSON.stringify(settings), {
    status: 200,
    headers: { "Content-Type": "application/json" }
  });
};

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    const body = await request.json();
    const db = (locals as any)?.runtime?.env?.DB;

    for (const [key, value] of Object.entries(body)) {
      await updateSetting(key, String(value), db);
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
};
