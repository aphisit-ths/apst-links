# apst.local · เว็บ ALL MY LINK

เว็บหน้าเดียว ไม่มี build ไม่ต้องลงอะไร อัปโหลดทั้งโฟลเดอร์นี้ขึ้นโฮสต์ได้เลย

## ก่อนขึ้นเว็บ: เปลี่ยนโดเมน 1 จุด

ในไฟล์ `index.html`, `robots.txt`, `sitemap.xml` มีคำว่า `https://apst.cc` (ตั้งไว้แล้ว)
ให้ค้นหาแล้วแทนที่ด้วยโดเมนจริง (เช่น `https://apst.vercel.app` หรือโดเมนที่ซื้อเอง)

## วิธีขึ้นเว็บฟรี (เลือกอันเดียว)

**Vercel (ง่ายสุด)**
1. เข้า vercel.com ล็อกอินด้วย GitHub
2. Add New → Project → ลากโฟลเดอร์ `site` ไปวาง หรือเชื่อม GitHub repo
3. ได้ลิงก์ `xxx.vercel.app` เอาไปแทน `your-domain.com` แล้ว deploy ซ้ำ

**Netlify** — app.netlify.com/drop ลากโฟลเดอร์ `site` ไปวาง จบ

**GitHub Pages** — สร้าง repo `aphisit-ths.github.io` อัปไฟล์ทั้งหมดในโฟลเดอร์นี้ ได้เว็บที่ `https://aphisit-ths.github.io`

## หลังขึ้นเว็บ (ให้ Google เจอเร็วขึ้น)

1. Google Search Console → เพิ่มโดเมน → ส่ง `sitemap.xml`
2. ทดสอบภาพตอนแชร์ลิงก์: developers.facebook.com/tools/debug
3. ทดสอบ schema: search.google.com/test/rich-results
4. เอาลิงก์ไปใส่ bio ทุกช่อง (TikTok, IG, FB) ยิ่งมีลิงก์ชี้เข้ามา Google ยิ่งเชื่อถือ

## มีอะไรใน SEO แล้วบ้าง

- title / description ภาษาไทย มีคำว่า apst.local, Aphisit, โปรแกรมเมอร์, ทำแอป
- canonical, robots, sitemap.xml
- Open Graph + Twitter card พร้อมรูปแชร์ `og-image.png` (1200×630) ลิงก์ที่แชร์ใน LINE/FB จะขึ้นรูปนี้
- Schema.org `ProfilePage` + `Person` ผูกกับ TikTok, IG, FB ผ่าน `sameAs` ช่วยให้ Google รู้ว่าทุกช่องเป็นคนเดียวกัน
- favicon, apple-touch-icon, web manifest
- รูปโปรไฟล์แยกไฟล์ มี width/height และ alt, เนื้อหาอยู่ใน HTML ตรงๆ (Google อ่านได้ไม่ต้องรัน JS)
