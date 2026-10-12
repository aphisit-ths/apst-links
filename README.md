# apst.cc · ALL MY LINK

เว็บ link-in-bio หน้าเดียว + ระบบนับคนเข้าว่ามาจาก IG / Facebook / TikTok บน Cloudflare Pages

```
public/            ไฟล์หน้าเว็บ (index.html, รูป, sitemap, robots)
functions/api/hit.js   รับข้อมูลคนเข้า/คนกด แล้วเก็บลง D1
functions/stats.js     หน้าสรุปตัวเลข (ใส่รหัสก่อนดู)
schema.sql             ตารางใน D1 (รันครั้งเดียว)
```

## ขึ้นเว็บบน Cloudflare Pages

1. Workers & Pages → Create → Pages → Connect to Git → เลือก `apst-links`
2. Framework preset: **None** · Build command: **เว้นว่าง** · Build output directory: **`public`** → Save and Deploy
3. โปรเจกต์ → Custom domains → เพิ่ม `apst.cc` (และ `www.apst.cc`)

## เปิดระบบนับ lead (ทำครั้งเดียว)

1. Workers & Pages → **D1 SQL Database** → Create → ตั้งชื่อ `apst-links`
2. เปิด database → แท็บ Console → วางเนื้อหาไฟล์ `schema.sql` → Execute
3. กลับไปโปรเจกต์ Pages → Settings → **Bindings** → Add → D1 database → Variable name `DB` → เลือก `apst-links`
4. Settings → **Variables and Secrets** → Add → ชื่อ `STATS_KEY` แบบ Secret ใส่รหัสยาวๆ ที่เดายาก
5. Deployments → Retry deployment (ให้ค่าใหม่มีผล)

ดูตัวเลขที่ `https://apst.cc/stats?key=รหัสที่ตั้ง`  (เปลี่ยนช่วงได้ 1 / 7 / 30 / 90 / 365 วัน)

## ลิงก์ที่ต้องใส่ใน bio แต่ละช่อง

| ที่ใส่ | ลิงก์ |
|---|---|
| Instagram bio | `https://apst.cc/?src=ig` |
| Facebook | `https://apst.cc/?src=fb` |
| TikTok bio | `https://apst.cc/?src=tt` |
| LINE | `https://apst.cc/?src=line` |

ถึงไม่ใส่ `?src=` ระบบก็พยายามเดาจาก in-app browser ของ IG/FB/TikTok ให้ แต่ใส่ไว้แม่นกว่า

## นับยังไง

- **คน (unique)** = เบราว์เซอร์ที่ไม่ซ้ำกัน (เก็บ id สุ่มไว้ในเครื่องคนเข้า) ถ้าคนเดียวเปิดจาก IG แอปกับ Safari จะนับเป็น 2
- **คนที่กดลิงก์** = lead จริง เช่นกด "ทักคุยงานทาง LINE", WhatsApp, อีเมล
- ไม่เก็บ IP ไม่ใช้ cookie ของบุคคลที่สาม ตัด bot/link preview ออก
- ฟรีใน Cloudflare free plan (D1 ฟรี 5 ล้านแถวอ่าน/วัน 100,000 แถวเขียน/วัน)

## SEO ที่มีแล้ว

title/description ภาษาไทย, canonical `https://apst.cc/`, Open Graph + รูปแชร์ `og-image.png`, Schema.org Person/ProfilePage ผูก IG/FB/TikTok, sitemap.xml, robots.txt, favicon
หลังขึ้นเว็บ: Google Search Console → เพิ่ม `apst.cc` → ส่ง `sitemap.xml`
