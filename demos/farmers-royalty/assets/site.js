/* Farmers Royalty Company — shared behaviour + chart data
   Every figure below is carried over verbatim from the current FRC site
   (frc.xojocloud.net), which renders these with Chart.js. */

/* ---------- mobile nav ---------- */
(function () {
  var t = document.querySelector('.navtoggle');
  var m = document.querySelector('.menu');
  if (!t || !m) return;
  t.addEventListener('click', function () {
    var open = m.classList.toggle('open');
    t.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
})();

/* ---------- tab panels ---------- */
(function () {
  var bar = document.querySelector('.tabbar');
  if (!bar) return;
  var btns = [].slice.call(bar.querySelectorAll('button'));
  btns.forEach(function (b) {
    b.addEventListener('click', function () {
      btns.forEach(function (o) { o.setAttribute('aria-selected', 'false'); });
      b.setAttribute('aria-selected', 'true');
      document.querySelectorAll('.panel').forEach(function (p) { p.classList.remove('on'); });
      var target = document.getElementById(b.dataset.panel);
      if (target) target.classList.add('on');
      // charts sized while hidden come out 0-height; nudge them once shown
      if (window.Chart) {
        Object.values(Chart.instances || {}).forEach(function (c) { c.resize(); });
      }
    });
  });
})();

/* ---------- chart helpers ---------- */
var FRC = (function () {
  var GREEN = '#2e7d46', GREEN_F = 'rgba(46,125,70,.16)';
  var BLUE = '#2f5d9e', BLUE_F = 'rgba(47,93,158,.16)';
  var WHEAT = '#b8862c', WHEAT_F = 'rgba(184,134,44,.16)';
  var GRID = 'rgba(22,32,26,.09)', TICK = '#6b7570';

  function money(v) {
    if (Math.abs(v) >= 1e6) return '$' + (v / 1e6).toFixed(1) + 'M';
    if (Math.abs(v) >= 1e3) return '$' + Math.round(v / 1e3) + 'K';
    return '$' + v;
  }
  function plain(v) {
    if (Math.abs(v) >= 1e6) return (v / 1e6).toFixed(1) + 'M';
    if (Math.abs(v) >= 1e3) return (v / 1e3).toFixed(0) + 'K';
    return v;
  }

  function base(fmt) {
    return {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: '#16201a', padding: 10, cornerRadius: 6,
          titleFont: { size: 12 }, bodyFont: { size: 13 },
          callbacks: {
            label: function (c) {
              var v = c.parsed.y !== undefined && c.parsed.y !== null ? c.parsed.y : c.parsed;
              return ' ' + (fmt === 'money' ? '$' + v.toLocaleString()
                   : fmt === 'dec' ? v.toFixed(2) : v.toLocaleString());
            }
          }
        }
      },
      scales: {
        x: { grid: { display: false }, ticks: { color: TICK, font: { size: 11 } } },
        y: {
          beginAtZero: true, grid: { color: GRID, drawBorder: false },
          ticks: {
            color: TICK, font: { size: 11 },
            callback: function (v) { return fmt === 'money' ? money(v) : plain(v); }
          }
        }
      }
    };
  }

  function bar(id, labels, data, label, color, fmt) {
    var el = document.getElementById(id); if (!el) return;
    var c = color === 'green' ? GREEN : color === 'wheat' ? WHEAT : BLUE;
    var f = color === 'green' ? 'rgba(46,125,70,.72)' : color === 'wheat' ? 'rgba(184,134,44,.72)' : 'rgba(47,93,158,.72)';
    new Chart(el, {
      type: 'bar',
      data: { labels: labels, datasets: [{ label: label, data: data, backgroundColor: f, borderColor: c, borderWidth: 1, borderRadius: 3, maxBarThickness: 54 }] },
      options: base(fmt)
    });
  }

  function line(id, labels, series, fmt) {
    var el = document.getElementById(id); if (!el) return;
    var palette = [
      { b: WHEAT, f: WHEAT_F },
      { b: GREEN, f: GREEN_F },
      { b: BLUE, f: BLUE_F }
    ];
    var opts = base(fmt);
    if (series.length > 1) opts.plugins.legend = { display: true, position: 'top', labels: { boxWidth: 12, boxHeight: 12, font: { size: 12 }, color: TICK, usePointStyle: true, pointStyle: 'line' } };
    new Chart(el, {
      type: 'line',
      data: {
        labels: labels,
        datasets: series.map(function (s, i) {
          var p = palette[i % palette.length];
          return {
            label: s.label, data: s.data, borderColor: p.b, backgroundColor: p.f,
            borderWidth: 2.4, tension: .35, fill: series.length === 1,
            pointBackgroundColor: '#fff', pointBorderColor: p.b, pointBorderWidth: 2,
            pointRadius: 3.5, pointHoverRadius: 5
          };
        })
      },
      options: opts
    });
  }

  function pie(id, labels, data) {
    var el = document.getElementById(id); if (!el) return;
    new Chart(el, {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [{
          data: data,
          backgroundColor: ['rgba(46,125,70,.85)', 'rgba(178,58,48,.85)', 'rgba(184,134,44,.85)'],
          borderColor: '#fff', borderWidth: 2, hoverOffset: 6
        }]
      },
      options: {
        responsive: true, maintainAspectRatio: false, cutout: '52%',
        plugins: {
          legend: { position: 'bottom', labels: { boxWidth: 12, boxHeight: 12, padding: 14, font: { size: 12.5 }, color: TICK, usePointStyle: true } },
          tooltip: {
            backgroundColor: '#16201a', padding: 10, cornerRadius: 6,
            callbacks: { label: function (c) { return ' ' + c.label + ': ' + c.parsed + '%'; } }
          }
        }
      }
    });
  }

  return { bar: bar, line: line, pie: pie };
})();

/* ---------- the data, straight from the current site ---------- */
var FRC_DATA = {
  yrs10:  ['2016','2017','2018','2019','2020','2021','2022','2023','2024','2025'],
  yrs3:   ['2023','2024','2025'],
  yrsQ:   ['2023','2024','2025','2nd Qtr 2026'],

  acresByState:   { labels:['OK','TX','AR','CO','NM','Other'], data:[85583,6189,5700,2276,1422,4279] },
  revenueMix:     { labels:['Gas','Oil','Liquids'], data:[67,22,11] },

  leaseBonus10:   [824486,1454214,481023,185103,75916,191820,585027,1084489,1337243,1075492],
  purchasedRev:   [6056488,8766442,10121407,8166742,5796227,9110616,13407682,6545087,5676619,5096080],
  originalRev:    [3183802,4255859,4461739,3776779,2302272,4631140,5536127,2838329,2095395,1819495],
  dividends10:    [5700500,5686458,5695583,5687546.1,3538498.5,3490294,10610945,10134425,5618925,5609212],

  oilPrice:       [76.05,74.76,65.56],
  oilVolume:      [46259,50852,45873],
  gasPrice:       [3.13,2.25,3.31],
  gasVolume:      [2511219,2411179,1820835],
  grossRevenue:   [10246442,8221402,8925445],
  leaseBonus3:    [1523349,1825693,1460036],

  sharesSold:     [549,443,286,361],
  sharesXfer:     [6312,8588,5582,1801],
  sharePrice:     [900,977,923,732],
  divPctNet:      [176.87,120.73,104.03]
};
