// Renders data/events.json (edited by the Media Cell through /admin) into:
//   - #upcomingList    : events dated today or later, soonest first (.event-card)
//   - #eventPhotoGrid  : past or undated events that have a photo, newest first (.event-photo)
// "Today" is the calendar date in India (IST), so an event stays "upcoming"
// through its own day and moves to Functions & Events the next morning.
(function () {
  const MONTHS_HI = ['जनवरी', 'फ़रवरी', 'मार्च', 'अप्रैल', 'मई', 'जून', 'जुलाई', 'अगस्त', 'सितंबर', 'अक्टूबर', 'नवंबर', 'दिसंबर'];
  const MONTHS_EN = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  function esc(value) {
    return String(value == null ? '' : value).trim()
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  // "YYYY-MM-DD" (anything after the date part is ignored); '' if missing or malformed
  function dateKey(value) {
    const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(String(value || '').trim());
    return m && +m[2] >= 1 && +m[2] <= 12 ? m[0] : '';
  }

  function todayInIndia() {
    const p = {};
    new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Kolkata', year: 'numeric', month: '2-digit', day: '2-digit' })
      .formatToParts(new Date()).forEach((part) => { p[part.type] = part.value; });
    return `${p.year}-${p.month}-${p.day}`;
  }

  function formatDate(key, months) {
    const [y, m, d] = key.split('-').map(Number);
    return `${d} ${months[m - 1]} ${y}`;
  }

  // The CMS stores photos as "/assets/events/x.webp"; make the path relative so
  // it also works in a local preview that is not served from the site root.
  function photoSrc(path) {
    return esc(String(path || '').trim().replace(/^\/+/, ''));
  }

  // Hindi text with its English line; either side may be empty.
  function bilingual(hi, en, enClass, enStyle) {
    const en_ = esc(en);
    const span = en_ ? `<span class="${enClass}"${enStyle ? ` style="${enStyle}"` : ''}>${en_}</span>` : '';
    return esc(hi) + span;
  }

  function altText(ev) {
    return esc(ev.caption_en || ev.title_en || ev.title_hi);
  }

  function upcomingCard(ev) {
    const hasPhoto = !!photoSrc(ev.photo);
    const img = hasPhoto ? `<img src="${photoSrc(ev.photo)}" alt="${altText(ev)}" loading="lazy">` : '';
    const caption = (esc(ev.caption_hi) || esc(ev.caption_en))
      ? `<p class="hi">${bilingual(ev.caption_hi, ev.caption_en, 'en-line')}</p>` : '';
    const location = (esc(ev.location_hi) || esc(ev.location_en))
      ? `<span><strong>स्थान / Location:</strong> ${bilingual(ev.location_hi, ev.location_en, 'en-mini', 'margin-top:0;')}</span>` : '';
    return `
      <div class="event-card reveal"${hasPhoto ? '' : ' style="grid-template-columns:1fr;"'}>
        ${img}
        <div>
          <h3 class="hi">${bilingual(ev.title_hi, ev.title_en, 'en-line', 'color:#4a4a42;')}</h3>
          ${caption}
          <div class="event-meta hi">
            <span><strong>तिथि / Date:</strong> ${formatDate(ev._date, MONTHS_HI)}<span class="en-mini" style="margin-top:0;">${formatDate(ev._date, MONTHS_EN)}</span></span>
            ${location}
          </div>
        </div>
      </div>`;
  }

  // Every 4th tile (1st, 5th, ...) is a tall one in the desktop grid. Those load
  // eagerly so markWide() can settle their height before the visitor scrolls there.
  function photoTile(ev, index) {
    const lazy = index % 4 === 0 ? '' : ' loading="lazy"';
    return `<figure class="event-photo reveal"><img src="${photoSrc(ev.photo)}" alt="${altText(ev)}"${lazy}>` +
      `<figcaption class="hi">${bilingual(ev.title_hi, ev.title_en, 'en-mini')}</figcaption></figure>`;
  }

  // Same fade-in as the inline script's .reveal observer, for elements added after page load.
  function reveal(container) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
    }, { threshold: 0.15 });
    container.querySelectorAll('.reveal').forEach((el) => io.observe(el));
  }

  // Very wide photos are kept out of the tall (2-row) tiles, where the sides
  // would be cropped away.
  function markWide(img) {
    const mark = () => {
      if (img.naturalHeight && img.naturalWidth / img.naturalHeight > 1.45) img.closest('.event-photo').classList.add('wide');
    };
    if (img.complete) mark(); else img.addEventListener('load', mark);
  }

  fetch('data/events.json', { cache: 'no-cache' })
    .then((r) => { if (!r.ok) throw new Error(r.status); return r.json(); })
    .then((data) => {
      const list = Array.isArray(data) ? data : (data && data.events);
      if (!Array.isArray(list)) return;

      const today = todayInIndia();
      const events = list
        .filter((ev) => ev && (esc(ev.title_hi) || esc(ev.title_en)))
        .map((ev, i) => Object.assign({}, ev, { _date: dateKey(ev.date), _i: i }));

      const upcoming = events
        .filter((ev) => ev._date && ev._date >= today)
        .sort((a, b) => a._date.localeCompare(b._date) || a._i - b._i);

      // Dated events newest first; undated (older) photos after them, in file order.
      const past = events
        .filter((ev) => !(ev._date && ev._date >= today) && photoSrc(ev.photo))
        .sort((a, b) => (b._date || '').localeCompare(a._date || '') || a._i - b._i);

      const upcomingBlock = document.getElementById('upcomingBlock');
      const upcomingList = document.getElementById('upcomingList');
      if (upcomingBlock && upcomingList) {
        upcomingList.innerHTML = upcoming.map(upcomingCard).join('');
        upcomingBlock.hidden = upcoming.length === 0;
        reveal(upcomingList);
      }

      const grid = document.getElementById('eventPhotoGrid');
      if (grid && past.length) {
        grid.innerHTML = past.map(photoTile).join('');
        grid.querySelectorAll('img').forEach(markWide);
        reveal(grid);
      }
    })
    .catch(() => {
      // fetch fails under file:// preview (or if the data file is broken);
      // the hardcoded fallback photos in the HTML stay as-is
    });
})();
