# apst.cc · ALL MY LINK

เว็บ link-in-bio หน้าเดียวบน Cloudflare Pages ใช้ Umami สำหรับสถิติคนเข้าและการคลิกลิงก์

```
public/            ไฟล์หน้าเว็บ (index.html, รูป, sitemap, robots)
```

## ขึ้นเว็บบน Cloudflare Pages

1. Workers & Pages → Create → Pages → Connect to Git → เลือก `apst-links`
2. Framework preset: **None** · Build command: **เว้นว่าง** · Build output directory: **`public`** → Save and Deploy
3. โปรเจกต์ → Custom domains → เพิ่ม `apst.cc` (และ `www.apst.cc`)

## สถิติผ่าน Umami

ใช้ Umami Cloud ที่ตั้งค่าไว้ใน `public/index.html` สำหรับโดเมน `apst.cc` และ `www.apst.cc`
ไม่ต้องตั้งค่า D1, binding `DB` หรือ `STATS_KEY` และไม่มีหน้า `/stats` แล้ว
ดูสถิติใน dashboard ของ Umami

## ลิงก์ที่ต้องใส่ใน bio แต่ละช่อง

| ที่ใส่ | ลิงก์ |
|---|---|
| Instagram bio | `https://apst.cc/?src=ig` |
| Facebook | `https://apst.cc/?src=fb` |
| TikTok bio | `https://apst.cc/?src=tt` |
| LINE | `https://apst.cc/?src=line` |

ถึงไม่ใส่ `?src=` ระบบก็พยายามเดาจาก in-app browser ของ IG/FB/TikTok ให้ แต่ใส่ไว้แม่นกว่า

## เก็บสถิติอะไรบ้าง

- การเปิดหน้าเว็บ และ ID สุ่มต่อเบราว์เซอร์ที่เก็บใน localStorage เพื่อระบุผู้เข้าชมเดิม
- แหล่งที่มาจาก `src` / `utm_source`, in-app browser หรือ referrer
- event แยกตามปลายทาง เช่น `click-instagram`, `click-facebook`, `click-tiktok`, `click-line`, `click-whatsapp`, `click-email` และ `click-email-copy` พร้อม `target` และ `src` (ดูใน Events ของ Umami ส่วน `/` ใน Pages คือ pageview)
- ทุกลิงก์และปุ่มส่ง event โดยแยกตำแหน่ง `placement` เป็น `cta`, `row`, `copy` หรือ `other`
- เปลี่ยนภาษา: `change-language` พร้อม `language`
- เลื่อนหน้า: `scroll-25`, `scroll-50`, `scroll-75`, `scroll-100` ครั้งเดียวต่อระดับต่อการเปิดหน้า (เฉพาะหน้าที่เลื่อนได้)
- ปุ่มคัดลอกอีเมลนับการกด ไม่ได้ยืนยันว่าคัดลอกสำเร็จ
- ปิด auto-track แล้วเรียก pageview เอง เพื่อหลีกเลี่ยงการนับซ้ำ
- ส่งข้อมูลสถิติผ่าน Umami เท่านั้น ไม่มี API เก็บสถิติหรือฐานข้อมูลของเว็บเอง

## SEO ที่มีแล้ว

title/description ภาษาไทย, canonical `https://apst.cc/`, Open Graph + รูปแชร์ `og-image.png`, Schema.org Person/ProfilePage ผูก IG/FB/TikTok, sitemap.xml, robots.txt, favicon
หลังขึ้นเว็บ: Google Search Console → เพิ่ม `apst.cc` → ส่ง `sitemap.xml`
