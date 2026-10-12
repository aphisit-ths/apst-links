// POST /api/hit  {vid, src, type: "view"|"click", target}
// Stores one anonymous event. No IP address is stored.
const clean = (v, n) => String(v || '').replace(/[^\w.:\-@ ]/g, '').slice(0, n);

export async function onRequestPost({ request, env }) {
  if (!env.DB) return new Response(null, { status: 204 });
  let data;
  try { data = await request.json(); } catch { return new Response('bad json', { status: 400 }); }
  const type = data.type === 'click' ? 'click' : 'view';
  const vid = clean(data.vid, 64);
  if (!vid) return new Response('missing vid', { status: 400 });
  // Skip bots so crawlers do not inflate counts
  if (/bot|crawl|spider|preview|facebookexternalhit/i.test(request.headers.get('user-agent') || '')) {
    return new Response(null, { status: 204 });
  }
  await env.DB.prepare(
    'INSERT INTO events (vid, src, type, target, country) VALUES (?, ?, ?, ?, ?)'
  ).bind(vid, clean(data.src, 32) || 'direct', type, clean(data.target, 48), request.cf?.country || '').run();
  return new Response(null, { status: 204 });
}
