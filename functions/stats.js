// GET /stats?key=STATS_KEY&days=30
// Private dashboard: unique visitors and clicks per source.
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

export async function onRequestGet({ request, env }) {
  const url = new URL(request.url);
  if (!env.STATS_KEY || url.searchParams.get('key') !== env.STATS_KEY) {
    return new Response('Not found', { status: 404 });
  }
  if (!env.DB) return new Response('D1 binding "DB" is missing', { status: 500 });
  const days = Math.min(Math.max(parseInt(url.searchParams.get('days') || '30', 10) || 30, 1), 3650);
  const since = `-${days} days`;

  const bySource = await env.DB.prepare(`
    SELECT src,
      COUNT(DISTINCT CASE WHEN type='view'  THEN vid END) AS uniq_visitors,
      SUM(type='view')                                    AS views,
      COUNT(DISTINCT CASE WHEN type='click' THEN vid END) AS uniq_clickers,
      SUM(type='click')                                   AS clicks
    FROM events WHERE ts >= datetime('now', ?)
    GROUP BY src ORDER BY uniq_visitors DESC`).bind(since).all();

  const byTarget = await env.DB.prepare(`
    SELECT src, target, COUNT(DISTINCT vid) AS uniq, COUNT(*) AS clicks
    FROM events WHERE type='click' AND ts >= datetime('now', ?)
    GROUP BY src, target ORDER BY uniq DESC LIMIT 100`).bind(since).all();

  const byDay = await env.DB.prepare(`
    SELECT day, src, COUNT(DISTINCT vid) AS uniq
    FROM events WHERE type='view' AND ts >= datetime('now', ?)
    GROUP BY day, src ORDER BY day DESC, uniq DESC LIMIT 300`).bind(since).all();

  const table = (rows, cols) => `<table><tr>${cols.map(c => `<th>${c[1]}</th>`).join('')}</tr>${
    rows.map(r => `<tr>${cols.map(c => `<td>${esc(r[c[0]] ?? 0)}</td>`).join('')}</tr>`).join('') ||
    `<tr><td colspan="${cols.length}">ยังไม่มีข้อมูล</td></tr>`}</table>`;

  const key = encodeURIComponent(url.searchParams.get('key'));
  const html = `<!doctype html><html lang="th"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex">
<title>apst.cc stats</title><style>
body{font:15px/1.5 system-ui,"IBM Plex Sans Thai",sans-serif;color:#111;background:#fff;max-width:760px;margin:0 auto;padding:24px 16px}
h1{font-size:20px}h2{font-size:15px;margin-top:28px;color:#555;text-transform:uppercase;letter-spacing:1px}
.wrap{overflow-x:auto}table{border-collapse:collapse;width:100%;font-variant-numeric:tabular-nums}
th,td{text-align:left;padding:8px 10px;border-bottom:1px solid #e6e6e6;white-space:nowrap}th{color:#6b6b6b;font-weight:500}
nav a{margin-right:12px;color:#111}</style></head><body>
<h1>apst.cc · ${days} วันล่าสุด</h1>
<nav>${[1, 7, 30, 90, 365].map(d => `<a href="?key=${key}&days=${d}">${d} วัน</a>`).join('')}</nav>
<h2>คนเข้าแยกตามที่มา</h2><div class="wrap">${table(bySource.results, [['src', 'ที่มา'], ['uniq_visitors', 'คน (unique)'], ['views', 'ครั้งที่เปิด'], ['uniq_clickers', 'คนที่กดลิงก์'], ['clicks', 'กดทั้งหมด']])}</div>
<h2>กดอะไร มาจากไหน</h2><div class="wrap">${table(byTarget.results, [['src', 'ที่มา'], ['target', 'กด'], ['uniq', 'คน (unique)'], ['clicks', 'ครั้ง']])}</div>
<h2>รายวัน</h2><div class="wrap">${table(byDay.results, [['day', 'วัน'], ['src', 'ที่มา'], ['uniq', 'คน (unique)']])}</div>
</body></html>`;
  return new Response(html, { headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store' } });
}
