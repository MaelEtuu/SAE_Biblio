import { au as Rc, e as S, a3 as sc, at as Lc } from "./indexhtml-Crv9HnRQ.js";
import { d } from "./directive-helpers-BuSA7Eqp-iDDDRuBB.js";
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const i = (r, e) => {
  const t = r._$AN;
  if (t === void 0) return false;
  for (const s of t) s._$AO?.(e, false), i(s, e);
  return true;
}, o = (r) => {
  let e, t;
  do {
    if ((e = r._$AM) === void 0) break;
    t = e._$AN, t.delete(r), r = e;
  } while (t?.size === 0);
}, l = (r) => {
  for (let e; e = r._$AM; r = e) {
    let t = e._$AN;
    if (t === void 0) e._$AN = t = /* @__PURE__ */ new Set();
    else if (t.has(r)) break;
    t.add(r), m(e);
  }
};
function _(r) {
  this._$AN !== void 0 ? (o(this), this._$AM = r, l(this)) : this._$AM = r;
}
function $(r, e = false, t = 0) {
  const s = this._$AH, h = this._$AN;
  if (h !== void 0 && h.size !== 0) if (e) if (Array.isArray(s)) for (let n = t; n < s.length; n++) i(s[n], false), o(s[n]);
  else s != null && (i(s, false), o(s));
  else i(this, r);
}
const m = (r) => {
  r.type == Rc.CHILD && (r._$AP ??= $, r._$AQ ??= _);
};
class p extends Lc {
  constructor() {
    super(...arguments), this._$AN = void 0;
  }
  _$AT(e, t, s) {
    super._$AT(e, t, s), l(this), this.isConnected = e._$AU;
  }
  _$AO(e, t = true) {
    e !== this.isConnected && (this.isConnected = e, e ? this.reconnected?.() : this.disconnected?.()), t && (i(this, e), o(this));
  }
  setValue(e) {
    if (d(this._$Ct)) this._$Ct._$AI(e, this);
    else {
      const t = [...this._$Ct._$AH];
      t[this._$Ci] = e, this._$Ct._$AI(t, this, 0);
    }
  }
  disconnected() {
  }
  reconnected() {
  }
}
/**
 * @license
 * Copyright (c) 2016 - 2025 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const u = /* @__PURE__ */ Symbol("valueNotInitialized");
class y extends p {
  constructor(e) {
    if (super(e), e.type !== Rc.ELEMENT)
      throw new Error(`\`${this.constructor.name}\` must be bound to an element.`);
    this.previousValue = u;
  }
  /** @override */
  render(e, t) {
    return S;
  }
  /** @override */
  update(e, [t, s]) {
    return this.hasChanged(s) ? (this.host = e.options && e.options.host, this.element = e.element, this.renderer = t, this.previousValue === u ? this.addRenderer() : this.runRenderer(), this.previousValue = Array.isArray(s) ? [...s] : s, S) : S;
  }
  /** @override */
  reconnected() {
    this.addRenderer();
  }
  /** @override */
  disconnected() {
    this.removeRenderer();
  }
  /** @abstract */
  addRenderer() {
    throw new Error("The `addRenderer` method must be implemented.");
  }
  /** @abstract */
  runRenderer() {
    throw new Error("The `runRenderer` method must be implemented.");
  }
  /** @abstract */
  removeRenderer() {
    throw new Error("The `removeRenderer` method must be implemented.");
  }
  /** @protected */
  renderRenderer(e, ...t) {
    const s = this.renderer.call(this.host, ...t);
    sc(s, e, { host: this.host });
  }
  /** @protected */
  hasChanged(e) {
    return Array.isArray(e) ? !Array.isArray(this.previousValue) || this.previousValue.length !== e.length ? true : e.some((t, s) => t !== this.previousValue[s]) : this.previousValue !== e;
  }
}
export {
  y
};
