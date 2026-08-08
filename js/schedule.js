(function () {
  const PLATFORM_LABELS = {
    youtube: { hi: 'यूट्यूब', en: 'YouTube' },
    facebook: { hi: 'फेसबुक', en: 'Facebook' },
    meet: { hi: 'गूगल मीट', en: 'Google Meet' },
    instagram: { hi: 'इंस्टाग्राम', en: 'Instagram' }
  };

  function formatIST(dt) {
    return dt.toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata', weekday: 'short', day: 'numeric', month: 'short',
      hour: '2-digit', minute: '2-digit', hour12: true
    });
  }

  function formatLocal(dt) {
    return dt.toLocaleString(undefined, {
      weekday: 'short', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit', hour12: true
    });
  }

  fetch('data/schedule.json')
    .then((r) => r.json())
    .then((data) => {
      const tbody = document.getElementById('scheduleBody');
      if (!tbody) return;

      const sorted = data.slice().sort((a, b) => new Date(a.datetime) - new Date(b.datetime));

      tbody.innerHTML = '';
      sorted.forEach((item) => {
        const dt = new Date(item.datetime);
        const plat = PLATFORM_LABELS[item.platform] || { hi: item.platform, en: item.platform };
        const isPlaceholder = !item.link || item.link === '#';
        const actionHtml = isPlaceholder
          ? '<span class="schedule-status hi">जल्द उपलब्ध<span class="en-mini" style="margin-top:0;">Coming Soon</span></span>'
          : `<a href="${item.link}" target="_blank" rel="noopener" class="btn btn-primary hi" style="padding:8px 16px;font-size:0.78rem;">जॉइन करें<span class="en-mini">Join</span></a>`;

        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td><p class="hi">${item.topic_hi}<span class="en-mini">${item.topic_en}</span></p></td>
          <td>${item.teacher}</td>
          <td><p class="hi">${formatIST(dt)} IST<span class="en-mini">${formatLocal(dt)} (आपका समय / your time)</span></p></td>
          <td class="hi">${plat.hi}<span class="en-mini" style="margin-top:0;">${plat.en}</span></td>
          <td>${actionHtml}</td>`;
        tbody.appendChild(tr);
      });

      const next = sorted.find((item) => new Date(item.datetime) > new Date());
      if (next && window.startCountdown) {
        window.startCountdown(next.datetime, 'scheduleCountdown');
      }
    })
    .catch(() => {
      // fetch fails under file:// preview; the hardcoded fallback rows in the HTML stay as-is
    });
})();
