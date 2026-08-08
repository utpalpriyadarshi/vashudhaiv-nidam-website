(function () {
  window.startCountdown = function (targetIso, elId) {
    const el = document.getElementById(elId);
    if (!el) return;
    const target = new Date(targetIso);

    function render() {
      const diff = target - new Date();
      if (diff <= 0) {
        el.innerHTML = 'अभी शुरू हो रही है<span class="en-mini">Starting now</span>';
        return;
      }
      const days = Math.floor(diff / 86400000);
      const hours = Math.floor((diff % 86400000) / 3600000);
      const mins = Math.floor((diff % 3600000) / 60000);
      el.innerHTML =
        `अगली कक्षा ${days} दिन ${hours} घंटे ${mins} मिनट में शुरू` +
        `<span class="en-mini">Next class starts in ${days}d ${hours}h ${mins}m</span>`;
    }

    render();
    setInterval(render, 60000);
  };
})();
