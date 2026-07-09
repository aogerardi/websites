/* ===================================================================
   Piedmondo i18n — reusable language toggle
   -------------------------------------------------------------------
   Drop-in bilingual toggle for a static site. The ENGINE never changes;
   each site just provides a dictionary of hand-written translations.

   USAGE (add to any page, before </body>):
     <script>
       window.I18N = {
         lang: "es",                 // the second language code (default "es")
         label: "Español",       // button label when in English (offer the switch)
         labelBack: "English",        // button label when in the second language
         flag: "🇲🇽",  // flag/emoji shown on the button (optional)
         flagBack: "🇺🇸",
         dict: {                      // English text  ->  translated text
           "View the Menu": "Ver el Menú",
           "Order Now": "Ordenar Ahora"
           // ...one entry per visible string you want translated
         }
       };
     </script>
     <script src="i18n.js"></script>

   NOTES
   - Any string not in the dict simply stays in English (safe fallback).
   - Translates visible text plus these attributes: placeholder, aria-label,
     title, alt, and <meta name="description">.
   - Remembers the visitor's choice in localStorage.
   - The toggle button is injected automatically (bottom-right); no markup
     needed. Style it via the .i18n-toggle class if you want.
   =================================================================== */
(function () {
  "use strict";
  var CFG = window.I18N || {};
  var DICT = CFG.dict || {};
  var LANG = CFG.lang || "es";
  var KEY = "piedmondo-lang";
  var ATTRS = ["placeholder", "aria-label", "title", "alt"];

  // Collapse whitespace so " Hello \n world " matches "Hello world".
  function norm(s) { return s.replace(/\s+/g, " ").trim(); }

  // Snapshot every translatable text node + attribute with its English value,
  // so we can flip back and forth losslessly.
  var items = [];

  function collect() {
    // Text nodes
    var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode: function (n) {
        if (!n.nodeValue || !norm(n.nodeValue)) return NodeFilter.FILTER_REJECT;
        var p = n.parentNode;
        while (p && p !== document.body) {
          var tag = p.nodeName;
          if (tag === "SCRIPT" || tag === "STYLE" || tag === "NOSCRIPT") return NodeFilter.FILTER_REJECT;
          if (p.classList && p.classList.contains("i18n-toggle")) return NodeFilter.FILTER_REJECT;
          if (p.getAttribute && p.getAttribute("data-i18n-skip") !== null) return NodeFilter.FILTER_REJECT;
          p = p.parentNode;
        }
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    var n;
    while ((n = walker.nextNode())) {
      var raw = n.nodeValue;
      var key = norm(raw);
      if (DICT[key]) {
        // Preserve leading/trailing whitespace so text keeps spacing around inline tags.
        var lead = (raw.match(/^\s*/) || [""])[0];
        var trail = (raw.match(/\s*$/) || [""])[0];
        items.push({ node: n, en: raw, es: lead + DICT[key] + trail });
      }
    }
    // Attributes
    var all = document.body.querySelectorAll("*");
    for (var i = 0; i < all.length; i++) {
      var el = all[i];
      if (el.closest && el.closest(".i18n-toggle")) continue;
      for (var a = 0; a < ATTRS.length; a++) {
        var v = el.getAttribute(ATTRS[a]);
        if (v && DICT[norm(v)]) items.push({ el: el, attr: ATTRS[a], en: v, es: DICT[norm(v)] });
      }
    }
    // <meta name="description">
    var md = document.querySelector('meta[name="description"]');
    if (md && DICT[norm(md.content)]) items.push({ el: md, attr: "content", en: md.content, es: DICT[norm(md.content)] });
  }

  function apply(toSecond) {
    for (var i = 0; i < items.length; i++) {
      var it = items[i];
      var val = toSecond ? it.es : it.en;
      if (it.node) it.node.nodeValue = val;
      else it.el.setAttribute(it.attr, val);
    }
    document.documentElement.setAttribute("lang", toSecond ? LANG : "en");
    if (btn) {
      btn.innerHTML = toSecond
        ? (CFG.flagBack ? CFG.flagBack + " " : "") + (CFG.labelBack || "English")
        : (CFG.flag ? CFG.flag + " " : "") + (CFG.label || "Español");
      btn.setAttribute("aria-pressed", String(toSecond));
    }
    try { localStorage.setItem(KEY, toSecond ? LANG : "en"); } catch (e) {}
  }

  var btn;
  function makeButton() {
    btn = document.createElement("button");
    btn.className = "i18n-toggle";
    btn.type = "button";
    btn.setAttribute("aria-label", "Switch language");
    var css = document.createElement("style");
    css.textContent =
      ".i18n-toggle{position:fixed;right:16px;bottom:16px;z-index:9999;" +
      "font:600 14px/1 Inter,system-ui,-apple-system,sans-serif;" +
      "padding:10px 14px;border-radius:999px;border:1px solid rgba(0,0,0,.15);" +
      "background:#111;color:#fff;cursor:pointer;box-shadow:0 6px 20px rgba(0,0,0,.25);" +
      "display:inline-flex;align-items:center;gap:6px;transition:transform .15s ease}" +
      ".i18n-toggle:hover{transform:translateY(-2px)}" +
      "@media(prefers-reduced-motion:reduce){.i18n-toggle{transition:none}}";
    document.head.appendChild(css);
    btn.addEventListener("click", function () {
      apply(document.documentElement.getAttribute("lang") !== LANG);
    });
    document.body.appendChild(btn);
  }

  function init() {
    collect();
    makeButton();
    var saved;
    try { saved = localStorage.getItem(KEY); } catch (e) {}
    apply(saved === LANG);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
