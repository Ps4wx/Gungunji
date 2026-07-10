HOW TO USE THIS WEBSITE

WHAT WAS FIXED
- Content was getting cut off on shorter screens/laptops (body had
  overflow:hidden with no scroll) — each page now scrolls properly if needed.
- Mobile "100vh" bug fixed (address bar no longer eats part of the page).
- Floating hearts on page 1 were just 2 fixed emojis — now generates a
  full animated heart shower.
- Broken/missing photos used to show an ugly broken-image icon — now they
  gracefully fall back so the page never looks broken.
- Added swipe left/right support for mobile.
- Included ready-made placeholder photos so the site looks complete
  immediately, even before you add your real ones.

1) Replace photos:
Go to assets/images/ and replace these files with your real photos:
- photo1.jpg
- photo2.jpg
- photo3.jpg
- photo4.jpg
- photo5.jpg

Keep the same names, otherwise edit the image paths inside index.html.
(Placeholder photos are already in this folder — replace them whenever
you're ready, the site works fine either way.)

2) Add song:
Go to assets/music/ and add your song as:
- song.mp3

IMPORTANT: No song file is included because you need to add your own audio.
The music starts after clicking "Click to begin". If you skip this step,
the site still works — the music button just won't play anything.

3) Open website:
Open index.html in Chrome.

4) Upload online:
Upload the full folder to Netlify or GitHub Pages.
