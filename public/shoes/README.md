Taruh gambar sepatu di folder ini.

Pola paling simpel (tanpa ubah kode):
- public/shoes/{id}.jpg
- public/shoes/{id}.jpeg
- public/shoes/{id}.png
- public/shoes/{id}.webp
- public/shoes/{id}.jfif
- public/shoes/{id}.svg

Contoh:
- public/shoes/12.jpg

Catatan:
- `{id}` harus sama dengan ID sepatu yang kamu klik (lihat di URL, mis. `/shoes/12` atau `/recommend?id=12`).

Kalau mau pakai nama file khusus atau URL path berbeda, edit mapping di:
- lib/shoeImage.ts (shoeImageMap)
