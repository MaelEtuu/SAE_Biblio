import { $ as $c, q as qc, at as Lc, au as Rc, av as Re } from "./indexhtml-Crv9HnRQ.js";
import { p, B, v, x as x$1, g } from "./directive-helpers-BuSA7Eqp-iDDDRuBB.js";
var h, x;
function M() {
  return x || (x = 1, h = function() {
    var a = document.getSelection();
    if (!a.rangeCount)
      return function() {
      };
    for (var c = document.activeElement, f = [], d = 0; d < a.rangeCount; d++)
      f.push(a.getRangeAt(d));
    switch (c.tagName.toUpperCase()) {
      // .toUpperCase handles XHTML
      case "INPUT":
      case "TEXTAREA":
        c.blur();
        break;
      default:
        c = null;
        break;
    }
    return a.removeAllRanges(), function() {
      a.type === "Caret" && a.removeAllRanges(), a.rangeCount || f.forEach(function(r) {
        a.addRange(r);
      }), c && c.focus();
    };
  }), h;
}
var w, E;
function N() {
  if (E) return w;
  E = 1;
  var a = M(), c = {
    "text/plain": "Text",
    "text/html": "Url",
    default: "Text"
  }, f = "Copy to clipboard: #{key}, Enter";
  function d(l) {
    var t = (/mac os x/i.test(navigator.userAgent) ? "⌘" : "Ctrl") + "+C";
    return l.replace(/#{\s*key\s*}/g, t);
  }
  function r(l, t) {
    var i, p2, y, m, o, e, n = false;
    t || (t = {}), i = t.debug || false;
    try {
      y = a(), m = document.createRange(), o = document.getSelection(), e = document.createElement("span"), e.textContent = l, e.ariaHidden = "true", e.style.all = "unset", e.style.position = "fixed", e.style.top = 0, e.style.clip = "rect(0, 0, 0, 0)", e.style.whiteSpace = "pre", e.style.webkitUserSelect = "text", e.style.MozUserSelect = "text", e.style.msUserSelect = "text", e.style.userSelect = "text", e.addEventListener("copy", function(s) {
        if (s.stopPropagation(), t.format)
          if (s.preventDefault(), typeof s.clipboardData > "u") {
            i && console.warn("unable to use e.clipboardData"), i && console.warn("trying IE specific stuff"), window.clipboardData.clearData();
            var g2 = c[t.format] || c.default;
            window.clipboardData.setData(g2, l);
          } else
            s.clipboardData.clearData(), s.clipboardData.setData(t.format, l);
        t.onCopy && (s.preventDefault(), t.onCopy(s.clipboardData));
      }), document.body.appendChild(e), m.selectNodeContents(e), o.addRange(m);
      var u = document.execCommand("copy");
      if (!u)
        throw new Error("copy command was unsuccessful");
      n = true;
    } catch (s) {
      i && console.error("unable to copy using execCommand: ", s), i && console.warn("trying IE specific stuff");
      try {
        window.clipboardData.setData(t.format || "text", l), t.onCopy && t.onCopy(window.clipboardData), n = true;
      } catch (g2) {
        i && console.error("unable to copy using clipboardData: ", g2), i && console.error("falling back to prompt"), p2 = d("message" in t ? t.message : f), window.prompt(p2, l);
      }
    } finally {
      o && (typeof o.removeRange == "function" ? o.removeRange(m) : o.removeAllRanges()), e && document.body.removeChild(e), y();
    }
    return n;
  }
  return w = r, w;
}
var P = N();
const F = /* @__PURE__ */ $c(P);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const T = (a, c, f) => {
  const d = /* @__PURE__ */ new Map();
  for (let r = c; r <= f; r++) d.set(a[r], r);
  return d;
}, H = qc(class extends Lc {
  constructor(a) {
    if (super(a), a.type !== Rc.CHILD) throw Error("repeat() can only be used in text expressions");
  }
  dt(a, c, f) {
    let d;
    f === void 0 ? f = c : c !== void 0 && (d = c);
    const r = [], l = [];
    let t = 0;
    for (const i of a) r[t] = d ? d(i, t) : t, l[t] = f(i, t), t++;
    return { values: l, keys: r };
  }
  render(a, c, f) {
    return this.dt(a, c, f).values;
  }
  update(a, [c, f, d]) {
    const r = p(a), { values: l, keys: t } = this.dt(c, f, d);
    if (!Array.isArray(r)) return this.ut = t, l;
    const i = this.ut ??= [], p$1 = [];
    let y, m, o = 0, e = r.length - 1, n = 0, u = l.length - 1;
    for (; o <= e && n <= u; ) if (r[o] === null) o++;
    else if (r[e] === null) e--;
    else if (i[o] === t[n]) p$1[n] = B(r[o], l[n]), o++, n++;
    else if (i[e] === t[u]) p$1[u] = B(r[e], l[u]), e--, u--;
    else if (i[o] === t[u]) p$1[u] = B(r[o], l[u]), v(a, p$1[u + 1], r[o]), o++, u--;
    else if (i[e] === t[n]) p$1[n] = B(r[e], l[n]), v(a, r[o], r[e]), e--, n++;
    else if (y === void 0 && (y = T(t, n, u), m = T(i, o, e)), y.has(i[o])) if (y.has(i[e])) {
      const s = m.get(t[n]), g2 = s !== void 0 ? r[s] : null;
      if (g2 === null) {
        const D = v(a, r[o]);
        B(D, l[n]), p$1[n] = D;
      } else p$1[n] = B(g2, l[n]), v(a, r[o], g2), r[s] = null;
      n++;
    } else x$1(r[e]), e--;
    else x$1(r[o]), o++;
    for (; n <= u; ) {
      const s = v(a, p$1[u + 1]);
      B(s, l[n]), p$1[n++] = s;
    }
    for (; o <= e; ) {
      const s = r[o++];
      s !== null && x$1(s);
    }
    return this.ut = t, g(a, p$1), Re;
  }
});
export {
  F,
  H
};
