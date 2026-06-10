const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./copilot-devtools-Cpd_CV50-Cd_k_uBx.js","./indexhtml-Crv9HnRQ.js","./commonjsHelpers-CUmg6egw.js","./state-aTUQA9pO-CJ-X0rSy.js","./icons-CJYK-fIm-3aTajcIb.js"])))=>i.map(i=>d[i]);
import { y, a4 as qd, S as Sr$1, m as mr$1, h as Mi$1, Z as Ze$1, a5 as Nd, a6 as rd, a7 as sd, v as ft$1, a8 as gl, f, s as kr$1, U as Ui$1, x as rp, c as ce, e as S$1, a9 as rr$1, aa as qi$1, ab as at$1, a as Oi$1, p as po, ac as oo, _, i as ot$1, ad as ap, ae as Be$1, af as V, ag as Ac, ah as Ic, ai as Ud, d as dc, a2 as O, O as Oe$1, aj as ji$1, ak as __vitePreload, al as pc, am as uc, an as Wi$1, ao as ud, $ as $c, ap as Qd, aq as Td, ar as Cd, k as Mc, as as jd, M as Md, q as qc } from "./indexhtml-Crv9HnRQ.js";
import { a } from "./state-aTUQA9pO-CJ-X0rSy.js";
import { H as H$1, F } from "./repeat-B6aSW1iL-xculwdAK.js";
import { y as y$1 } from "./lit-renderer-CWzNMnPU-DZemISB-.js";
import { r } from "./icons-CJYK-fIm-3aTajcIb.js";
import "./commonjsHelpers-CUmg6egw.js";
import "./directive-helpers-BuSA7Eqp-iDDDRuBB.js";
var define_process_env_default = {};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */
let Sn = 0, Li = 0;
const Ue = [];
let zr = false;
function xo() {
  zr = false;
  const t = Ue.length;
  for (let e = 0; e < t; e++) {
    const r2 = Ue[e];
    if (r2)
      try {
        r2();
      } catch (n) {
        setTimeout(() => {
          throw n;
        });
      }
  }
  Ue.splice(0, t), Li += t;
}
const Co = {
  /**
   * Enqueues a function called at microtask timing.
   *
   * @memberof microTask
   * @param {!Function=} callback Callback to run
   * @return {number} Handle used for canceling task
   */
  run(t) {
    zr || (zr = true, queueMicrotask(() => xo())), Ue.push(t);
    const e = Sn;
    return Sn += 1, e;
  },
  /**
   * Cancels a previously enqueued `microTask` callback.
   *
   * @memberof microTask
   * @param {number} handle Handle returned from `run` of callback to cancel
   * @return {void}
   */
  cancel(t) {
    const e = t - Li;
    if (e >= 0) {
      if (!Ue[e])
        throw new Error(`invalid async handle: ${t}`);
      Ue[e] = null;
    }
  }
};
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
const $n = /* @__PURE__ */ new Set();
class Tt {
  /**
   * Creates a debouncer if no debouncer is passed as a parameter
   * or it cancels an active debouncer otherwise. The following
   * example shows how a debouncer can be called multiple times within a
   * microtask and "debounced" such that the provided callback function is
   * called once. Add this method to a custom element:
   *
   * ```js
   * import {microTask} from '@vaadin/component-base/src/async.js';
   * import {Debouncer} from '@vaadin/component-base/src/debounce.js';
   * // ...
   *
   * _debounceWork() {
   *   this._debounceJob = Debouncer.debounce(this._debounceJob,
   *       microTask, () => this._doWork());
   * }
   * ```
   *
   * If the `_debounceWork` method is called multiple times within the same
   * microtask, the `_doWork` function will be called only once at the next
   * microtask checkpoint.
   *
   * Note: In testing it is often convenient to avoid asynchrony. To accomplish
   * this with a debouncer, you can use `enqueueDebouncer` and
   * `flush`. For example, extend the above example by adding
   * `enqueueDebouncer(this._debounceJob)` at the end of the
   * `_debounceWork` method. Then in a test, call `flush` to ensure
   * the debouncer has completed.
   *
   * @param {Debouncer?} debouncer Debouncer object.
   * @param {!AsyncInterface} asyncModule Object with Async interface
   * @param {function()} callback Callback to run.
   * @return {!Debouncer} Returns a debouncer object.
   */
  static debounce(e, r2, n) {
    return e instanceof Tt ? e._cancelAsync() : e = new Tt(), e.setConfig(r2, n), e;
  }
  constructor() {
    this._asyncModule = null, this._callback = null, this._timer = null;
  }
  /**
   * Sets the scheduler; that is, a module with the Async interface,
   * a callback and optional arguments to be passed to the run function
   * from the async module.
   *
   * @param {!AsyncInterface} asyncModule Object with Async interface.
   * @param {function()} callback Callback to run.
   * @return {void}
   */
  setConfig(e, r2) {
    this._asyncModule = e, this._callback = r2, this._timer = this._asyncModule.run(() => {
      this._timer = null, $n.delete(this), this._callback();
    });
  }
  /**
   * Cancels an active debouncer and returns a reference to itself.
   *
   * @return {void}
   */
  cancel() {
    this.isActive() && (this._cancelAsync(), $n.delete(this));
  }
  /**
   * Cancels a debouncer's async callback.
   *
   * @return {void}
   */
  _cancelAsync() {
    this.isActive() && (this._asyncModule.cancel(
      /** @type {number} */
      this._timer
    ), this._timer = null);
  }
  /**
   * Flushes an active debouncer and returns a reference to itself.
   *
   * @return {void}
   */
  flush() {
    this.isActive() && (this.cancel(), this._callback());
  }
  /**
   * Returns true if the debouncer is active.
   *
   * @return {boolean} True if active.
   */
  isActive() {
    return this._timer != null;
  }
}
/**
 * @license
 * Copyright (c) 2017 - 2025 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const zt = /* @__PURE__ */ Symbol("contentUpdateDebouncer");
class un extends y$1 {
  /**
   * A property to that the renderer callback will be assigned.
   *
   * @abstract
   */
  get rendererProperty() {
    throw new Error("The `rendererProperty` getter must be implemented.");
  }
  /**
   * Adds the renderer callback to the dialog.
   */
  addRenderer() {
    this.element[this.rendererProperty] = (e, r2) => {
      this.renderRenderer(e, r2);
    };
  }
  /**
   * Runs the renderer callback on the dialog.
   */
  runRenderer() {
    this.element[zt] = Tt.debounce(
      this.element[zt],
      Co,
      () => {
        this.element.requestContentUpdate();
      }
    );
  }
  /**
   * Removes the renderer callback from the dialog.
   */
  removeRenderer() {
    this.element[this.rendererProperty] = null, delete this.element[zt];
  }
}
class Oo extends un {
  get rendererProperty() {
    return "renderer";
  }
}
class Do extends un {
  get rendererProperty() {
    return "headerRenderer";
  }
}
class Ao extends un {
  get rendererProperty() {
    return "footerRenderer";
  }
}
const kt = qc(Oo), Ft = qc(Do), Vt = qc(Ao);
var Po = Object.defineProperty, _o = Object.getOwnPropertyDescriptor, hn = (t, e, r2, n) => {
  for (var i = n > 1 ? void 0 : n ? _o(e, r2) : e, o = t.length - 1, a2; o >= 0; o--)
    (a2 = t[o]) && (i = (n ? a2(e, r2, i) : a2(i)) || i);
  return n && i && Po(e, r2, i), i;
};
let xt = class extends dc {
  constructor() {
    super(...arguments), this.panelHeaderUpdated = 0, this.openedPanelConfigurationsSorted = [], this.windowResizeListener = async () => {
      await Promise.all(
        this.getOpenPanelContainerDialogs().map(async (t) => {
          const e = t.getAttribute("data-panel-tag");
          if (!e)
            return;
          await t.querySelector(e)?.requestLayoutUpdate();
          const n = Oe$1.getPanelByTag(e);
          if (!n?.position)
            return;
          const i = t.getBoundingClientRect(), o = this.getViewportAdjustedPosition({
            ...n.position,
            width: n.position.width ?? i.width,
            height: n.position.height ?? i.height
          });
          t.setAttribute("top", `${o.top}`), t.setAttribute("left", `${o.left}`), t.setAttribute("width", `${o.width}`), t.setAttribute("height", `${o.height}`), Oe$1.updatePanel(
            n.tag,
            {
              position: o
            },
            false
          );
        })
      );
    };
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("resize", this.windowResizeListener), this.reaction(
      () => f.operationInProgress,
      () => {
        Array.from(this.querySelectorAll("vaadin-dialog[panel-container]")).forEach((t) => {
          const e = t.hasAttribute("showWhileDragging");
          requestAnimationFrame(() => {
            t.toggleAttribute(
              "hiding-while-drag-and-drop",
              f.operationInProgress === Qd.DragAndDrop && !e && !this.hasDropTarget(t)
            );
          });
        });
      }
    ), this.reaction(
      () => Oe$1.getAttentionRequiredPanelConfiguration(),
      () => {
        const t = Oe$1.getAttentionRequiredPanelConfiguration(), e = this.getDialogByPanelTag(t?.tag);
        e && e.toggleAttribute(Td, true);
      }
    ), this.observeDisposer = Cd(Oe$1.getCustomPanelHeaderMap(), () => {
      this.panelHeaderUpdated += 1;
    }), this.reaction(
      () => [
        Oe$1.panels,
        Oe$1.panelStackingOrder,
        Oe$1.getOpenPanelTags().size
      ],
      () => {
        const t = Oe$1.panels.filter((r2) => Oe$1.isOpenedPanel(r2.tag)), e = Oe$1.panelStackingOrder;
        this.openedPanelConfigurationsSorted = t.sort((r2, n) => {
          const i = e.indexOf(r2.tag), o = e.indexOf(n.tag);
          return i - o;
        });
      },
      { fireImmediately: true }
    );
  }
  disconnectedCallback() {
    super.disconnectedCallback(), window.removeEventListener("resize", this.windowResizeListener), this.observeDisposer && this.observeDisposer();
  }
  createRenderRoot() {
    return this;
  }
  render() {
    return ce`
      ${H$1(
      this.openedPanelConfigurationsSorted,
      (t) => t.tag,
      (t) => ce`<vaadin-dialog
            draggable
            modeless
            id="${t.tag}-dialog"
            waits-positioning
            ?individual="${t.individual}"
            .opened="${Oe$1.isOpenedPanel(t.tag)}"
            panel-container
            resizable
            @mousedown="${(e) => {
        Oe$1.moveStackingOrderToTop(t.tag);
      }}"
            @touchstart="${(e) => {
        Oe$1.moveStackingOrderToTop(t.tag);
      }}"
            data-panel-tag="${t.tag}"
            ?showWhileDragging="${t.showWhileDragging}"
            theme="no-padding"
            left="${t.position?.left}"
            top="${t.position?.top}"
            height=${t.position?.height}
            width=${t.position?.width}
            @resize="${(e) => {
        const { top: r2, left: n, width: i, height: o } = e.detail, a2 = e.currentTarget, d = Number.parseFloat(i), c = Number.parseFloat(o), s = this.getViewportAdjustedPosition({
          top: Number.parseFloat(r2),
          left: Number.parseFloat(n),
          width: Number.isFinite(d) ? d : a2.getBoundingClientRect().width,
          height: Number.isFinite(c) ? c : a2.getBoundingClientRect().height
        });
        a2.setAttribute("top", `${s.top}`), a2.setAttribute("left", `${s.left}`), a2.setAttribute("width", `${s.width}`), a2.setAttribute("height", `${s.height}`), Oe$1.updatePanel(t.tag, {
          position: s
        });
      }}"
            @dragged="${(e) => {
        const r2 = Oe$1.getPanelByTag(t.tag);
        if (!r2)
          return;
        const n = e.currentTarget, i = n.getBoundingClientRect(), o = {
          top: Number.parseFloat(e.detail.top),
          left: Number.parseFloat(e.detail.left)
        }, a2 = this.getViewportAdjustedPosition({
          width: i.width,
          height: i.height,
          ...r2.position,
          ...o
        });
        n.setAttribute("top", `${a2.top}`), n.setAttribute("left", `${a2.left}`), Oe$1.updatePanel(r2.tag, {
          position: a2
        });
      }}"
            @mouseenter="${(e) => {
        const r2 = e.target;
        r2.hasAttribute(Td) && Oe$1.clearAttention(), r2.toggleAttribute(Td, false);
      }}"
            @opened-changed="${(e) => {
        const r2 = e.detail.value, n = e.currentTarget;
        r2 && (Oe$1.moveStackingOrderToTop(t.tag), (n.querySelector(t.tag)?.requestLayoutUpdate() ?? Promise.resolve()).finally(() => {
          setTimeout(() => {
            n.removeAttribute("waits-positioning");
          }, 50);
        }));
        const i = this.getToolbar();
        if (!i)
          return;
        const o = i.getButtonId(t), a2 = i.querySelector(`vaadin-button#${o}`);
        a2 && (r2 ? a2.classList.add("selected") : a2.classList.remove("selected"));
      }}"
            ${Ft(
        () => ce`
                <h2 class="font-bold me-auto my-0 text-xs truncate uppercase draggable" id="${t.tag}-title">
                  ${Oe$1.getPanelHeader(t)}
                  ${t.experimental ? ce`<vaadin-icon slot="suffix" .svg="${r.experiment}"></vaadin-icon>
                        <vaadin-tooltip slot="tooltip" text="Experimental feature"></vaadin-tooltip>` : S$1}
                </h2>
                ${t.actionsTag ? Mc(`<${t.actionsTag}></${t.actionsTag}>`) : S$1}
                ${t.helpUrl ? ce`<vaadin-button
                      aria-label="More info about ${t.header}"
                      @click="${() => window.open(t.helpUrl, "_blank")}"
                      @mousedown="${(e) => e.stopPropagation()}"
                      theme="icon tertiary">
                      <vaadin-icon .svg="${r.help}"></vaadin-icon>
                      <vaadin-tooltip slot="tooltip" text="More info about ${t.header}"></vaadin-tooltip>
                    </vaadin-button>` : S$1}
                <vaadin-button
                  aria-label="Close"
                  @click="${() => {
          const r2 = this.getDialogByPanelTag(t.tag)?.querySelector(t.tag);
          r2?.requestClose ? r2.requestClose(() => Oe$1.closePanel(t.tag)) : Oe$1.closePanel(t.tag);
        }}"
                  @mousedown="${(e) => e.stopPropagation()}"
                  theme="icon tertiary">
                  <vaadin-icon .svg="${r.close}"></vaadin-icon>
                  <vaadin-tooltip slot="tooltip" text="Close"></vaadin-tooltip>
                </vaadin-button>
              `,
        [this.panelHeaderUpdated]
      )}
            ${kt(
        () => ce`<div class="h-full w-full">${Mc(`<${t.tag}></${t.tag}>`)}</div>`,
        []
      )}
            ${t.footerActionsTag ? Vt(
        () => ce`<div>
                      ${Mc(`<${t.footerActionsTag}></${t.footerActionsTag}>`)}
                    </div>`,
        []
      ) : S$1}></vaadin-dialog>`
    )}
    `;
  }
  hasDropTarget(t) {
    const e = t.children;
    for (const r2 of e) {
      const n = jd(r2.shadowRoot ?? r2, "copilot-image-upload");
      if (n && getComputedStyle(n).display !== "none")
        return true;
    }
    return false;
  }
  /**
   * Queries open panel dialogs. This method returns sorted list of dialogs based on their stack orders
   */
  getOpenPanelContainerDialogs() {
    const t = Array.from(this.querySelectorAll("vaadin-dialog[panel-container][opened]")), e = Oe$1.panelStackingOrder;
    return t.sort((r2, n) => {
      const i = r2.dataset.panelTag, o = n.dataset.panelTag;
      return i === null ? o === null ? 0 : 1 : o === null ? -1 : e.indexOf(i) - e.indexOf(o);
    }), t;
  }
  getDialogByPanelTag(t) {
    return t ? this.querySelector(`vaadin-dialog#${t}-dialog`) : null;
  }
  getToolbar() {
    const t = document.querySelector("copilot-main");
    return t ? t.shadowRoot.querySelector("copilot-toolbar") : null;
  }
  /**
   * Adjusts panel position to keep it within the viewport by applying edge offsets.
   *
   * The method preserves the given width and height and only shifts `top`/`left`:
   * - If left/top are negative, it moves the panel back to 0 on that axis.
   * - If right/bottom exceed viewport bounds minus padding, it moves the panel inward by the overflow amount with additional padding
   *
   * No left/top custom padding, min-size, or max-size constraints are applied.
   */
  getViewportAdjustedPosition(t) {
    const e = this.getViewportPaddingPx(), r2 = Number.isFinite(t.width) ? t.width : 0, n = Number.isFinite(t.height) ? t.height : 0;
    let i = Number.isFinite(t.top) ? t.top : 0, o = Number.isFinite(t.left) ? t.left : 0;
    const a2 = o + r2, d = i + n;
    let c = 0, s = 0;
    return o < 0 ? c = -o : a2 > window.innerWidth - e && (c = window.innerWidth - e - a2), i < 0 ? s = -i : d > window.innerHeight - e && (s = window.innerHeight - e - d), o += c, i += s, { top: i, left: o, width: r2, height: n };
  }
  getViewportPaddingPx() {
    const t = Number.parseFloat(getComputedStyle(this).fontSize);
    return Number.isFinite(t) ? t : 16;
  }
};
hn([
  a()
], xt.prototype, "panelHeaderUpdated", 2);
hn([
  a()
], xt.prototype, "openedPanelConfigurationsSorted", 2);
xt = hn([
  Oi$1("copilot-panel-manager")
], xt);
const Jr = window.Vaadin.copilot.customComponentHandler;
if (!Jr)
  throw new Error("Tried to access custom component handler before it was initialized.");
function Lo(t) {
  f.setOperationWaitsHmrUpdate(t, 3e4);
}
y.on("undoRedo", (t) => {
  const r2 = { files: Mo(t), uiId: qd() }, n = t.detail.undo ? "copilot-plugin-undo" : "copilot-plugin-redo", i = t.detail.undo ? "undo" : "redo";
  Sr$1(i), Lo(Qd.RedoUndo), mr$1(n, r2, (o) => {
    if (!o.data.performed) {
      if (o.data.error && o.data.error.message) {
        Mi$1({
          type: Ze$1.ERROR,
          message: o.data.error.message
        }), y.emit("vite-after-update", {});
        return;
      }
      Mi$1({
        type: Ze$1.INFORMATION,
        message: `Nothing to ${i}`
      }), y.emit("vite-after-update", {});
    }
  });
});
function Mo(t) {
  if (t.detail.files)
    return t.detail.files;
  const e = Jr.getActiveDrillDownContext();
  if (e) {
    const r2 = Jr.getCustomComponentInfo(e);
    if (r2)
      return new Array(r2.customComponentFilePath);
  }
  return Nd();
}
var Ho = (t, e, r2, n) => {
  for (var i = e, o = t.length - 1, a2; o >= 0; o--)
    (a2 = t[o]) && (i = a2(i) || i);
  return i;
};
let Tn = class extends dc {
  createRenderRoot() {
    return this;
  }
  connectedCallback() {
    super.connectedCallback(), this.classList.add("end-2", "fixed", "top-2", "z-100"), y.on("show-notification", (t) => {
      const e = t.detail.notification;
      Mi$1(e);
    });
  }
  /**
   * Notifications with interactive elements are problematic; we should consider alternatives (i.e. alertdialog).
   */
  render() {
    return ce`<section
      aria-label="Notifications"
      aria-live="polite"
      class="flex flex-col-reverse items-end list-none m-0 p-0">
      ${H$1(
      f.notifications,
      (t) => t.id,
      (t) => this.renderNotification(t)
    )}
    </section>`;
  }
  renderNotification(t) {
    return ce`
      <div
        class="duration-300 origin-top transition-all ${t.animatingIn ? "delay-300 max-h-0 opacity-0 scale-99 -translate-y-2" : t.animatingOut ? "delay-0 max-h-0 opacity-0 scale-99 -translate-y-2" : "max-h-screen"}"
        data-testid="message"
        ?data-error="${t.type === Ze$1.ERROR}">
        <div
          class="bg-gray-1 dark:bg-gray-5 border flex gap-2 mb-2 p-3 relative rounded-md shadow-xl ${t.autoWidth ? "" : "w-sm"}">
          <vaadin-icon
            class="${t.type === Ze$1.ERROR ? "text-ruby-11" : t.type === Ze$1.WARNING ? "text-amber-11" : "text-blue-11"}"
            .svg="${t.type === Ze$1.WARNING || t.type === Ze$1.ERROR ? r.warning : r.info}"></vaadin-icon>
          <div class="flex flex-col flex-1">
            <h2 class="m-0 pe-8 text-sm">${t.message}</h2>
            <div
              class="break-word flex flex-col items-start text-secondary text-xs"
              ?hidden="${!t.details && !t.link}">
              ${Md(t.details)}
              ${t.link ? ce`<a class="ahreflike" href="${t.link}" target="_blank">Learn more</a>` : ""}
            </div>
            ${t.dismissId ? ce` <hr class="border-b border-e-0 border-s-0 border-t-0 mx-0 my-3 w-full" />
                  <vaadin-checkbox
                    ?checked=${t.dontShowAgain}
                    @change=${() => this.toggleDontShowAgain(t)}
                    label="${ko(t)}">
                  </vaadin-checkbox>` : ""}
          </div>
          <vaadin-button
            aria-label="Close"
            class="absolute end-1.5 top-1.5"
            @click=${(e) => {
      qi$1(t), e.stopPropagation();
    }}
            id="dismiss"
            theme="icon tertiary">
            <vaadin-icon .svg="${r.close}"></vaadin-icon>
            <vaadin-tooltip slot="tooltip" text="Close"></vaadin-tooltip>
          </vaadin-button>
        </div>
      </div>
    `;
  }
  toggleDontShowAgain(t) {
    t.dontShowAgain = !t.dontShowAgain, this.requestUpdate();
  }
};
Tn = Ho([
  Oi$1("copilot-notifications-container")
], Tn);
function ko(t) {
  return t.dontShowAgainMessage ? t.dontShowAgainMessage : "Don't show again";
}
Mi$1({
  type: Ze$1.INFORMATION,
  autoWidth: true,
  message: "App is running in development mode"
});
const We = rd(async () => {
  await sd();
}, 100);
y.on("location-changed", () => {
  We();
});
window.addEventListener("vaadin-navigated", () => {
  ft$1().default || We();
});
window.addEventListener("popstate", () => {
  ft$1().default || We();
});
y.on("vite-after-update", () => {
  ft$1().default || We();
});
function Mi() {
  ft$1().default || (We.clear(), We(), ap());
}
if (window.__REACT_DEVTOOLS_GLOBAL_HOOK__) {
  const t = window.__REACT_DEVTOOLS_GLOBAL_HOOK__, e = t.onCommitFiberRoot;
  t.onCommitFiberRoot = (r2, n, i, o) => (Mi(), e(r2, n, i, o));
}
gl(() => {
  const t = window?.Vaadin?.connectionState;
  if (t)
    return t;
}).then((t) => {
  t.addStateChangeListener && typeof t.addStateChangeListener == "function" ? t.addStateChangeListener((e, r2) => {
    e === "loading" && r2 === "connected" && !ft$1().default && Mi();
  }) : console.error("Unable to add listener for connection state changes");
});
y.on("copilot-plugin-state", (t) => {
  f.setIdePluginState(t.detail), t.preventDefault();
});
y.on("copilot-early-project-state", (t) => {
  kr$1.setSpringSecurityEnabled(t.detail.springSecurityEnabled), kr$1.setSpringJpaDataEnabled(t.detail.springJpaDataEnabled), kr$1.setSpringJpaDatasourceInitialization(t.detail.springJpaDatasourceInitialization), kr$1.setSupportsHilla(t.detail.supportsHilla), kr$1.setSpringApplication(t.detail.springApplication), kr$1.setUrlPrefix(t.detail.urlPrefix), kr$1.setServerVersions(t.detail.serverVersions), kr$1.setJdkInfo(t.detail.jdkInfo), Ui$1() === "success" && Sr$1("hotswap-active", { value: rp() }), t.preventDefault();
});
y.on("copilot-ide-notification", (t) => {
  Mi$1({
    type: Ze$1[t.detail.type],
    message: t.detail.message,
    dismissId: t.detail.dismissId
  }), t.preventDefault();
});
var Fo = Object.defineProperty, Vo = Object.getOwnPropertyDescriptor, Ni = (t, e, r2, n) => {
  for (var i = n > 1 ? void 0 : n ? Vo(e, r2) : e, o = t.length - 1, a2; o >= 0; o--)
    (a2 = t[o]) && (i = (n ? a2(e, r2, i) : a2(i)) || i);
  return n && i && Fo(e, r2, i), i;
};
let Kr = class extends Be$1 {
  constructor() {
    super(...arguments), this.rememberChoice = false, this.opened = false, this.handleESC = (t) => {
      ft$1().appInteractable || !this.opened || (t.key === "Escape" && this.sendEvent("cancel"), t.preventDefault(), t.stopPropagation());
    };
  }
  createRenderRoot() {
    return this;
  }
  connectedCallback() {
    super.connectedCallback(), this.addESCListener();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.removeESCListener();
  }
  render() {
    return ce` <vaadin-dialog
      id="ai-dialog"
      no-close-on-outside-click
      class="ai-dialog"
      ?opened=${this.opened}
      ${Ft(
      () => ce`
          <h2>This Operation Uses AI</h2>
          <vaadin-icon .svg="${r.sparkles}"></vaadin-icon>
        `
    )}
      ${kt(
      () => ce`
          <p>AI is a third-party service that will receive some of your project code as context for the operation.</p>
          <label>
            <input
              id="ai-dialog-checkbox"
              type="checkbox"
              @change=${(t) => {
        this.rememberChoice = t.target.checked;
      }} />Don’t ask again
          </label>
        `
    )}
      ${Vt(
      () => ce`
          <button @click=${() => this.sendEvent("cancel")}>Cancel</button>
          <button class="primary" @click=${() => this.sendEvent("ok")}>OK</button>
        `
    )}></vaadin-dialog>`;
  }
  sendEvent(t) {
    this.dispatchEvent(
      new CustomEvent("ai-usage-response", {
        detail: { response: t, rememberChoice: this.rememberChoice }
      })
    );
  }
  addESCListener() {
    document.addEventListener("keydown", this.handleESC, { capture: true });
  }
  removeESCListener() {
    document.removeEventListener("keydown", this.handleESC, { capture: true });
  }
};
Ni([
  at$1()
], Kr.prototype, "opened", 2);
Kr = Ni([
  Oi$1("copilot-ai-usage-confirmation-dialog")
], Kr);
var qo = Object.defineProperty, Bo = Object.getOwnPropertyDescriptor, Ve = (t, e, r2, n) => {
  for (var i = n > 1 ? void 0 : n ? Bo(e, r2) : e, o = t.length - 1, a2; o >= 0; o--)
    (a2 = t[o]) && (i = (n ? a2(e, r2, i) : a2(i)) || i);
  return n && i && qo(e, r2, i), i;
};
const xn = {
  info: "UI state info",
  stacktrace: "Exception details",
  versions: "Vaadin, Java, OS, etc.."
};
let _e = class extends Be$1 {
  constructor() {
    super(...arguments), this.exceptionReport = void 0, this.dialogOpened = false, this.visibleItemIndex = 0, this.versions = void 0, this.selectedItems = [], this.eventListener = (t) => {
      this.exceptionReport = t.detail, this.selectedItems = this.exceptionReport.items.map((e, r2) => r2), this.visibleItemIndex = 0, this.searchInputValue = void 0, this.dialogOpened = this.exceptionReport !== void 0;
    };
  }
  connectedCallback() {
    super.connectedCallback(), y.on("submit-exception-report-clicked", this.eventListener);
  }
  createRenderRoot() {
    return this;
  }
  disconnectedCallback() {
    super.disconnectedCallback(), y.off("submit-exception-report-clicked", this.eventListener);
  }
  close() {
    this.dialogOpened = false;
  }
  clear() {
    this.exceptionReport = void 0;
  }
  render() {
    let t = "";
    return this.exceptionReport && this.exceptionReport.items.length > 0 && (t = this.exceptionReport.items[this.visibleItemIndex].content), ce` <vaadin-dialog
      id="report-exception-dialog"
      no-close-on-outside-click
      draggable
      ?opened=${this.dialogOpened}
      @closed="${() => {
      this.clear();
    }}"
      @opened-changed="${(e) => {
      e.detail.value || this.close();
    }}"
      ${Ft(
      () => ce`
          <div
            class="draggable"
            style="display: flex; justify-content: space-between; align-items: center; width: 100%">
            <h2>Send report</h2>
            <vaadin-button theme="tertiary" @click="${this.close}">
              <vaadin-icon icon="lumo:cross"></vaadin-icon>
            </vaadin-button>
          </div>
        `
    )}
      ${kt(
      () => ce`
          <div class="description-container">
            <vaadin-text-area
              @input=${(e) => {
        this.searchInputValue = e.target.value;
      }}
              label="Description of the Bug"
              placeholder="A short, concise description of the bug and why you consider it a bug."></vaadin-text-area>
          </div>
          <div class="list-preview-container">
            <div class="left-menu">
              <div class="section-title">Include in Report</div>
              <vaadin-list-box
                single
                selected="${this.visibleItemIndex}"
                @selected-changed="${(e) => {
        this.visibleItemIndex = e.detail.value;
      }}">
                ${this.exceptionReport?.items.map(
        (e, r2) => ce` <vaadin-item>
                      <input
                        type="checkbox"
                        .checked="${this.selectedItems.indexOf(r2) !== -1}"
                        @change="${(n) => {
          const i = n.target, o = [...this.selectedItems];
          if (i.checked)
            o.push(r2), this.selectedItems = [...this.selectedItems];
          else {
            const a2 = this.selectedItems.indexOf(r2);
            o.splice(a2, 1);
          }
          this.selectedItems = o;
        }}" />
                      <div class="item-content">
                        <span class="item-name"> ${e.name} </span>
                        <span class="item-description">${this.renderItemDescription(e)}</span>
                      </div>
                    </vaadin-item>`
      )}
              </vaadin-list-box>
            </div>
            <div class="right-menu">
              <div class="section-title">Preview: ${this.exceptionReport?.items[this.visibleItemIndex].name}</div>
              <code class="codeblock">${t}</code>
            </div>
          </div>
        `,
      [this.exceptionReport, this.visibleItemIndex, this.selectedItems]
    )}
      ${Vt(
      () => ce`
          <button
            id="cancel"
            @click=${() => {
        this.close();
      }}>
            Cancel
          </button>

          <button
            id="submit"
            class="primary"
            @click=${() => {
        this.submitErrorToGithub(), this.close();
      }}>
            Submit in GitHub
            <vaadin-tooltip
              for="submit"
              text="${this.bodyLengthExceeds() ? "The error report will be copied to clipboard and blank new issue page will be opened" : "New issue page will be opened with data loaded"}"
              position="top-start"></vaadin-tooltip>
          </button>
        `,
      [this.exceptionReport, this.selectedItems, this.searchInputValue]
    )}></vaadin-dialog>`;
  }
  renderItemDescription(t) {
    return Object.keys(xn).indexOf(t.name.toLowerCase()) !== -1 ? xn[t.name.toLowerCase()] : null;
  }
  bodyLengthExceeds() {
    const t = this.getIssueBodyNotEncoded();
    return t !== void 0 && encodeURIComponent(t).length > 7500;
  }
  getIssueBodyNotEncoded() {
    if (!this.exceptionReport)
      return;
    const t = this.exceptionReport.items.filter((e, r2) => this.selectedItems.indexOf(r2) !== -1).map((e) => {
      let r2 = "```";
      return e.name.includes(".java") && (r2 = `${r2}java`), `## ${e.name} 
 
 ${r2}
${e.content}
\`\`\``;
    });
    return this.searchInputValue ? `## Description of the bug 
 ${this.searchInputValue} 
 ${t.join(`
`)}` : `## Description of the bug 
 Please enter bug description here 
 ${t.join(`
`)}`;
  }
  submitErrorToGithub() {
    const t = this.exceptionReport;
    if (!t)
      return;
    const e = encodeURIComponent(t.title ?? "Bug report "), r2 = this.getIssueBodyNotEncoded();
    if (!r2)
      return;
    let n = encodeURIComponent(r2);
    n.length >= 7500 && (F(r2), n = encodeURIComponent("Please paste report here. It was automatically added to your clipboard."));
    const i = `https://github.com/vaadin/copilot/issues/new?title=${e}&body=${n}`;
    window.open(i, "_blank");
  }
};
Ve([
  a()
], _e.prototype, "exceptionReport", 2);
Ve([
  a()
], _e.prototype, "dialogOpened", 2);
Ve([
  a()
], _e.prototype, "visibleItemIndex", 2);
Ve([
  a()
], _e.prototype, "versions", 2);
Ve([
  a()
], _e.prototype, "selectedItems", 2);
Ve([
  a()
], _e.prototype, "searchInputValue", 2);
_e = Ve([
  Oi$1("copilot-report-exception-dialog")
], _e);
let pt;
y.on("copilot-project-compilation-error", (t) => {
  if (t.detail.error) {
    let e;
    if (t.detail.files && t.detail.files.length > 0) {
      const r$1 = f.idePluginState?.supportedActions?.includes("undo") ? ce`
            <vaadin-button
              @click="${(n) => {
        n.preventDefault(), y.emit("undoRedo", { undo: true, files: t.detail.files?.map((i) => i.path) });
      }}"
              theme="primary">
              <vaadin-icon slot="prefix" .svg="${r.undo}"></vaadin-icon>
              Undo Last Change
            </vaadin-button>
          ` : S$1;
      e = rr$1(ce`
        <span> Following files have compilation errors: </span>
        <ul class="list-none mb-0 mt-2 p-0">
          ${t.detail.files.map(
        (n) => ce` <li>
                <vaadin-button
                  @click="${() => {
          y.emit("show-in-ide", { javaSource: { absoluteFilePath: n.path } });
        }}"
                  theme="tertiary">
                  <vaadin-icon slot="prefix" .svg="${r.code}"></vaadin-icon>
                  ${n.name}
                </vaadin-button>
              </li>`
      )}
        </ul>
        <hr class="border-b border-e-0 border-s-0 border-t-0 mb-3 mt-2 mx-0 w-full" />
        ${r$1}
      `);
    } else
      e = "Project contains one or more compilation errors.";
    pt = Mi$1({
      message: "Compilation error",
      details: e,
      type: Ze$1.WARNING,
      delay: 3e4
    });
  } else
    pt && qi$1(pt), pt = void 0;
});
var jo = Object.defineProperty, Zo = Object.getOwnPropertyDescriptor, Hi = (t, e, r2, n) => {
  for (var i = n > 1 ? void 0 : n ? Zo(e, r2) : e, o = t.length - 1, a2; o >= 0; o--)
    (a2 = t[o]) && (i = (n ? a2(e, r2, i) : a2(i)) || i);
  return n && i && jo(e, r2, i), i;
};
let Qr = class extends Be$1 {
  constructor() {
    super(...arguments), this.text = () => (this.parentElement.textContent ?? "").trim();
  }
  createRenderRoot() {
    return this;
  }
  render() {
    return ce`<vaadin-button
      aria-label="Copy to clipboard"
      @click=${(t) => {
      t.stopPropagation(), t.preventDefault();
      const e = this.text();
      F(e);
    }}
      theme="icon tertiary">
      <vaadin-icon .svg="${r.fileCopy}"></vaadin-icon>
      <vaadin-tooltip slot="tooltip" text="Copy to clipboard"></vaadin-tooltip>
    </vaadin-button> `;
  }
};
Hi([
  at$1({ type: Function })
], Qr.prototype, "text", 2);
Qr = Hi([
  Oi$1("copilot-copy")
], Qr);
var Go = {
  202: "Accepted",
  502: "Bad Gateway",
  400: "Bad Request",
  409: "Conflict",
  100: "Continue",
  201: "Created",
  417: "Expectation Failed",
  424: "Failed Dependency",
  403: "Forbidden",
  504: "Gateway Timeout",
  410: "Gone",
  505: "HTTP Version Not Supported",
  418: "I'm a teapot",
  419: "Insufficient Space on Resource",
  507: "Insufficient Storage",
  500: "Internal Server Error",
  411: "Length Required",
  423: "Locked",
  420: "Method Failure",
  405: "Method Not Allowed",
  301: "Moved Permanently",
  302: "Moved Temporarily",
  207: "Multi-Status",
  300: "Multiple Choices",
  511: "Network Authentication Required",
  204: "No Content",
  203: "Non Authoritative Information",
  406: "Not Acceptable",
  404: "Not Found",
  501: "Not Implemented",
  304: "Not Modified",
  200: "OK",
  206: "Partial Content",
  402: "Payment Required",
  308: "Permanent Redirect",
  412: "Precondition Failed",
  428: "Precondition Required",
  102: "Processing",
  103: "Early Hints",
  426: "Upgrade Required",
  407: "Proxy Authentication Required",
  431: "Request Header Fields Too Large",
  408: "Request Timeout",
  413: "Request Entity Too Large",
  414: "Request-URI Too Long",
  416: "Requested Range Not Satisfiable",
  205: "Reset Content",
  303: "See Other",
  503: "Service Unavailable",
  101: "Switching Protocols",
  307: "Temporary Redirect",
  429: "Too Many Requests",
  401: "Unauthorized",
  451: "Unavailable For Legal Reasons",
  422: "Unprocessable Entity",
  415: "Unsupported Media Type",
  305: "Use Proxy",
  421: "Misdirected Request"
};
function Uo(t) {
  var e = Go[t.toString()];
  if (!e)
    throw new Error("Status code does not exist: " + t);
  return e;
}
function ki(t) {
  return `endpoint-request-${t.id}`;
}
y.on("endpoint-request", (t) => {
  const e = t.detail, r2 = ki(e);
  delete e.id;
  const n = Object.values(e.params), i = n.map(Ct).join(", ");
  y.emit("log", {
    id: r2,
    type: Ze$1.INFORMATION,
    message: `Called endpoint ${e.endpoint}.${e.method}(${i})`,
    expandedMessage: rr$1(
      ce`Called endpoint ${e.endpoint}.${e.method} with parameters
        <code class="codeblock"><copilot-copy></copilot-copy>${Ct(n)}</code>`
    ),
    details: "Response: <pending>"
  });
});
y.on("endpoint-response", (t) => {
  let e;
  try {
    e = JSON.parse(t.detail.text);
  } catch {
    e = t.detail.text;
  }
  const r2 = {}, n = t.detail.status ?? 200;
  n === 200 ? (r2.details = `Response: ${Ct(e)}`, r2.expandedDetails = rr$1(
    ce`Response: <code class="codeblock"><copilot-copy></copilot-copy>${Ct(e)}</code>`
  )) : (r2.details = `Error: ${n} ${Uo(n)}`, r2.type = Ze$1.ERROR), y.emit("update-log", {
    id: ki(t.detail),
    ...r2
  });
});
function Ct(t) {
  return typeof t == "string" ? `${t}` : JSON.stringify(t, void 0, 2);
}
var Xo = Object.defineProperty, Wo = Object.getOwnPropertyDescriptor, Me = (t, e, r2, n) => {
  for (var i = n > 1 ? void 0 : n ? Wo(e, r2) : e, o = t.length - 1, a2; o >= 0; o--)
    (a2 = t[o]) && (i = (n ? a2(e, r2, i) : a2(i)) || i);
  return n && i && Xo(e, r2, i), i;
};
class Yo extends CustomEvent {
  constructor(e) {
    super("show-in-ide-clicked", {
      detail: e,
      bubbles: true,
      composed: true
    });
  }
}
let ge = class extends Be$1 {
  constructor() {
    super(...arguments), this.iconHidden = false, this.linkHidden = false, this.tooltipText = void 0, this.linkText = void 0, this.source = void 0, this.javaSource = void 0, this.node = void 0;
  }
  static get styles() {
    return [V(Ac), V(Ic)];
  }
  render() {
    if (this.iconHidden) {
      if (!this.linkHidden)
        return this.renderContent(this.renderAnchor());
    } else return this.linkHidden ? this.renderContent(this.renderIcon()) : this.renderContent([this.renderIcon(), this.renderAnchor()]);
    return S$1;
  }
  renderContent(t) {
    return ce` <div class="contents">${t}</div> `;
  }
  renderIcon() {
    const t = this.tooltipText ?? `Open ${this.getFileName()} in IDE`;
    return ce`
      <vaadin-button
        aria-label="${t}"
        id="show-in-ide"
        theme="icon tertiary"
        @click=${(e) => {
      e.stopPropagation(), e.preventDefault(), this._showInIde();
    }}>
        <vaadin-icon .svg="${r.code}"></vaadin-icon>
        <vaadin-tooltip slot="tooltip" text="${t}"></vaadin-tooltip>
      </vaadin-button>
    `;
  }
  renderAnchor() {
    return ce`
      <a
        class="text-blue-11"
        href="#"
        id="link"
        @click=${(t) => {
      t.preventDefault(), this._showInIde();
    }}
        >${this.linkText ?? this.getFileName() ?? ""}</a
      >
      ${this.renderTooltip("link")}
    `;
  }
  dispatchClickedEvent() {
    this.dispatchEvent(
      new Yo({
        source: this.source,
        javaSource: this.javaSource,
        node: this.node
      })
    );
  }
  renderTooltip(t) {
    const e = this.tooltipText ?? `Open ${this.getFileName()} in IDE`;
    return ce`<vaadin-tooltip for="${t}" text="${e}" position="top-start"></vaadin-tooltip>`;
  }
  getFileName() {
    if (this.tooltipText)
      return this.tooltipText;
    if (this.source && this.source.fileName)
      return Ud(this.source.fileName);
    if (this.javaSource)
      return this.javaSource.className;
  }
  _showInIde() {
    y.emit("show-in-ide", {
      source: this.source,
      javaSource: this.javaSource,
      node: this.node
    }), this.dispatchClickedEvent();
  }
};
ge.TAG = "copilot-go-to-source";
Me([
  at$1({ type: Boolean })
], ge.prototype, "iconHidden", 2);
Me([
  at$1({ type: Boolean })
], ge.prototype, "linkHidden", 2);
Me([
  at$1()
], ge.prototype, "tooltipText", 2);
Me([
  at$1()
], ge.prototype, "linkText", 2);
Me([
  at$1()
], ge.prototype, "source", 2);
Me([
  at$1()
], ge.prototype, "javaSource", 2);
Me([
  at$1()
], ge.prototype, "node", 2);
ge = Me([
  Oi$1(ge.TAG)
], ge);
/**!
 * Sortable 1.15.6
 * @author	RubaXa   <trash@rubaxa.org>
 * @author	owenm    <owen23355@gmail.com>
 * @license MIT
 */
function Cn(t, e) {
  var r2 = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t);
    e && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(t, i).enumerable;
    })), r2.push.apply(r2, n);
  }
  return r2;
}
function we(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r2 = arguments[e] != null ? arguments[e] : {};
    e % 2 ? Cn(Object(r2), true).forEach(function(n) {
      zo(t, n, r2[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r2)) : Cn(Object(r2)).forEach(function(n) {
      Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(r2, n));
    });
  }
  return t;
}
function yt(t) {
  "@babel/helpers - typeof";
  return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? yt = function(e) {
    return typeof e;
  } : yt = function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, yt(t);
}
function zo(t, e, r2) {
  return e in t ? Object.defineProperty(t, e, {
    value: r2,
    enumerable: true,
    configurable: true,
    writable: true
  }) : t[e] = r2, t;
}
function $e() {
  return $e = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var r2 = arguments[e];
      for (var n in r2)
        Object.prototype.hasOwnProperty.call(r2, n) && (t[n] = r2[n]);
    }
    return t;
  }, $e.apply(this, arguments);
}
function Jo(t, e) {
  if (t == null) return {};
  var r2 = {}, n = Object.keys(t), i, o;
  for (o = 0; o < n.length; o++)
    i = n[o], !(e.indexOf(i) >= 0) && (r2[i] = t[i]);
  return r2;
}
function Ko(t, e) {
  if (t == null) return {};
  var r2 = Jo(t, e), n, i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(t);
    for (i = 0; i < o.length; i++)
      n = o[i], !(e.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(t, n) && (r2[n] = t[n]);
  }
  return r2;
}
var Qo = "1.15.6";
function Se(t) {
  if (typeof window < "u" && window.navigator)
    return !!/* @__PURE__ */ navigator.userAgent.match(t);
}
var xe = Se(/(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i), dt = Se(/Edge/i), On = Se(/firefox/i), nt = Se(/safari/i) && !Se(/chrome/i) && !Se(/android/i), fn = Se(/iP(ad|od|hone)/i), Fi = Se(/chrome/i) && Se(/android/i), Vi = {
  capture: false,
  passive: false
};
function H(t, e, r2) {
  t.addEventListener(e, r2, !xe && Vi);
}
function L(t, e, r2) {
  t.removeEventListener(e, r2, !xe && Vi);
}
function Ot(t, e) {
  if (e) {
    if (e[0] === ">" && (e = e.substring(1)), t)
      try {
        if (t.matches)
          return t.matches(e);
        if (t.msMatchesSelector)
          return t.msMatchesSelector(e);
        if (t.webkitMatchesSelector)
          return t.webkitMatchesSelector(e);
      } catch {
        return false;
      }
    return false;
  }
}
function qi(t) {
  return t.host && t !== document && t.host.nodeType ? t.host : t.parentNode;
}
function me(t, e, r2, n) {
  if (t) {
    r2 = r2 || document;
    do {
      if (e != null && (e[0] === ">" ? t.parentNode === r2 && Ot(t, e) : Ot(t, e)) || n && t === r2)
        return t;
      if (t === r2) break;
    } while (t = qi(t));
  }
  return null;
}
var Dn = /\s+/g;
function de(t, e, r2) {
  if (t && e)
    if (t.classList)
      t.classList[r2 ? "add" : "remove"](e);
    else {
      var n = (" " + t.className + " ").replace(Dn, " ").replace(" " + e + " ", " ");
      t.className = (n + (r2 ? " " + e : "")).replace(Dn, " ");
    }
}
function S(t, e, r2) {
  var n = t && t.style;
  if (n) {
    if (r2 === void 0)
      return document.defaultView && document.defaultView.getComputedStyle ? r2 = document.defaultView.getComputedStyle(t, "") : t.currentStyle && (r2 = t.currentStyle), e === void 0 ? r2 : r2[e];
    !(e in n) && e.indexOf("webkit") === -1 && (e = "-webkit-" + e), n[e] = r2 + (typeof r2 == "string" ? "" : "px");
  }
}
function Xe(t, e) {
  var r2 = "";
  if (typeof t == "string")
    r2 = t;
  else
    do {
      var n = S(t, "transform");
      n && n !== "none" && (r2 = n + " " + r2);
    } while (!e && (t = t.parentNode));
  var i = window.DOMMatrix || window.WebKitCSSMatrix || window.CSSMatrix || window.MSCSSMatrix;
  return i && new i(r2);
}
function Bi(t, e, r2) {
  if (t) {
    var n = t.getElementsByTagName(e), i = 0, o = n.length;
    if (r2)
      for (; i < o; i++)
        r2(n[i], i);
    return n;
  }
  return [];
}
function ye() {
  var t = document.scrollingElement;
  return t || document.documentElement;
}
function z(t, e, r2, n, i) {
  if (!(!t.getBoundingClientRect && t !== window)) {
    var o, a2, d, c, s, l, u;
    if (t !== window && t.parentNode && t !== ye() ? (o = t.getBoundingClientRect(), a2 = o.top, d = o.left, c = o.bottom, s = o.right, l = o.height, u = o.width) : (a2 = 0, d = 0, c = window.innerHeight, s = window.innerWidth, l = window.innerHeight, u = window.innerWidth), (e || r2) && t !== window && (i = i || t.parentNode, !xe))
      do
        if (i && i.getBoundingClientRect && (S(i, "transform") !== "none" || r2 && S(i, "position") !== "static")) {
          var h = i.getBoundingClientRect();
          a2 -= h.top + parseInt(S(i, "border-top-width")), d -= h.left + parseInt(S(i, "border-left-width")), c = a2 + o.height, s = d + o.width;
          break;
        }
      while (i = i.parentNode);
    if (n && t !== window) {
      var p = Xe(i || t), b = p && p.a, f2 = p && p.d;
      p && (a2 /= f2, d /= b, u /= b, l /= f2, c = a2 + l, s = d + u);
    }
    return {
      top: a2,
      left: d,
      bottom: c,
      right: s,
      width: u,
      height: l
    };
  }
}
function An(t, e, r2) {
  for (var n = Ae(t, true), i = z(t)[e]; n; ) {
    var o = z(n)[r2], a2 = void 0;
    if (a2 = i >= o, !a2) return n;
    if (n === ye()) break;
    n = Ae(n, false);
  }
  return false;
}
function Ye(t, e, r2, n) {
  for (var i = 0, o = 0, a2 = t.children; o < a2.length; ) {
    if (a2[o].style.display !== "none" && a2[o] !== $.ghost && (n || a2[o] !== $.dragged) && me(a2[o], r2.draggable, t, false)) {
      if (i === e)
        return a2[o];
      i++;
    }
    o++;
  }
  return null;
}
function pn(t, e) {
  for (var r2 = t.lastElementChild; r2 && (r2 === $.ghost || S(r2, "display") === "none" || e && !Ot(r2, e)); )
    r2 = r2.previousElementSibling;
  return r2 || null;
}
function fe(t, e) {
  var r2 = 0;
  if (!t || !t.parentNode)
    return -1;
  for (; t = t.previousElementSibling; )
    t.nodeName.toUpperCase() !== "TEMPLATE" && t !== $.clone && (!e || Ot(t, e)) && r2++;
  return r2;
}
function Pn(t) {
  var e = 0, r2 = 0, n = ye();
  if (t)
    do {
      var i = Xe(t), o = i.a, a2 = i.d;
      e += t.scrollLeft * o, r2 += t.scrollTop * a2;
    } while (t !== n && (t = t.parentNode));
  return [e, r2];
}
function ea(t, e) {
  for (var r2 in t)
    if (t.hasOwnProperty(r2)) {
      for (var n in e)
        if (e.hasOwnProperty(n) && e[n] === t[r2][n]) return Number(r2);
    }
  return -1;
}
function Ae(t, e) {
  if (!t || !t.getBoundingClientRect) return ye();
  var r2 = t, n = false;
  do
    if (r2.clientWidth < r2.scrollWidth || r2.clientHeight < r2.scrollHeight) {
      var i = S(r2);
      if (r2.clientWidth < r2.scrollWidth && (i.overflowX == "auto" || i.overflowX == "scroll") || r2.clientHeight < r2.scrollHeight && (i.overflowY == "auto" || i.overflowY == "scroll")) {
        if (!r2.getBoundingClientRect || r2 === document.body) return ye();
        if (n || e) return r2;
        n = true;
      }
    }
  while (r2 = r2.parentNode);
  return ye();
}
function ta(t, e) {
  if (t && e)
    for (var r2 in e)
      e.hasOwnProperty(r2) && (t[r2] = e[r2]);
  return t;
}
function Jt(t, e) {
  return Math.round(t.top) === Math.round(e.top) && Math.round(t.left) === Math.round(e.left) && Math.round(t.height) === Math.round(e.height) && Math.round(t.width) === Math.round(e.width);
}
var it;
function ji(t, e) {
  return function() {
    if (!it) {
      var r2 = arguments, n = this;
      r2.length === 1 ? t.call(n, r2[0]) : t.apply(n, r2), it = setTimeout(function() {
        it = void 0;
      }, e);
    }
  };
}
function ra() {
  clearTimeout(it), it = void 0;
}
function Zi(t, e, r2) {
  t.scrollLeft += e, t.scrollTop += r2;
}
function Gi(t) {
  var e = window.Polymer, r2 = window.jQuery || window.Zepto;
  return e && e.dom ? e.dom(t).cloneNode(true) : r2 ? r2(t).clone(true)[0] : t.cloneNode(true);
}
function Ui(t, e, r2) {
  var n = {};
  return Array.from(t.children).forEach(function(i) {
    var o, a2, d, c;
    if (!(!me(i, e.draggable, t, false) || i.animated || i === r2)) {
      var s = z(i);
      n.left = Math.min((o = n.left) !== null && o !== void 0 ? o : 1 / 0, s.left), n.top = Math.min((a2 = n.top) !== null && a2 !== void 0 ? a2 : 1 / 0, s.top), n.right = Math.max((d = n.right) !== null && d !== void 0 ? d : -1 / 0, s.right), n.bottom = Math.max((c = n.bottom) !== null && c !== void 0 ? c : -1 / 0, s.bottom);
    }
  }), n.width = n.right - n.left, n.height = n.bottom - n.top, n.x = n.left, n.y = n.top, n;
}
var le = "Sortable" + (/* @__PURE__ */ new Date()).getTime();
function na() {
  var t = [], e;
  return {
    captureAnimationState: function() {
      if (t = [], !!this.options.animation) {
        var n = [].slice.call(this.el.children);
        n.forEach(function(i) {
          if (!(S(i, "display") === "none" || i === $.ghost)) {
            t.push({
              target: i,
              rect: z(i)
            });
            var o = we({}, t[t.length - 1].rect);
            if (i.thisAnimationDuration) {
              var a2 = Xe(i, true);
              a2 && (o.top -= a2.f, o.left -= a2.e);
            }
            i.fromRect = o;
          }
        });
      }
    },
    addAnimationState: function(n) {
      t.push(n);
    },
    removeAnimationState: function(n) {
      t.splice(ea(t, {
        target: n
      }), 1);
    },
    animateAll: function(n) {
      var i = this;
      if (!this.options.animation) {
        clearTimeout(e), typeof n == "function" && n();
        return;
      }
      var o = false, a2 = 0;
      t.forEach(function(d) {
        var c = 0, s = d.target, l = s.fromRect, u = z(s), h = s.prevFromRect, p = s.prevToRect, b = d.rect, f2 = Xe(s, true);
        f2 && (u.top -= f2.f, u.left -= f2.e), s.toRect = u, s.thisAnimationDuration && Jt(h, u) && !Jt(l, u) && // Make sure animatingRect is on line between toRect & fromRect
        (b.top - u.top) / (b.left - u.left) === (l.top - u.top) / (l.left - u.left) && (c = oa(b, h, p, i.options)), Jt(u, l) || (s.prevFromRect = l, s.prevToRect = u, c || (c = i.options.animation), i.animate(s, b, u, c)), c && (o = true, a2 = Math.max(a2, c), clearTimeout(s.animationResetTimer), s.animationResetTimer = setTimeout(function() {
          s.animationTime = 0, s.prevFromRect = null, s.fromRect = null, s.prevToRect = null, s.thisAnimationDuration = null;
        }, c), s.thisAnimationDuration = c);
      }), clearTimeout(e), o ? e = setTimeout(function() {
        typeof n == "function" && n();
      }, a2) : typeof n == "function" && n(), t = [];
    },
    animate: function(n, i, o, a2) {
      if (a2) {
        S(n, "transition", ""), S(n, "transform", "");
        var d = Xe(this.el), c = d && d.a, s = d && d.d, l = (i.left - o.left) / (c || 1), u = (i.top - o.top) / (s || 1);
        n.animatingX = !!l, n.animatingY = !!u, S(n, "transform", "translate3d(" + l + "px," + u + "px,0)"), this.forRepaintDummy = ia(n), S(n, "transition", "transform " + a2 + "ms" + (this.options.easing ? " " + this.options.easing : "")), S(n, "transform", "translate3d(0,0,0)"), typeof n.animated == "number" && clearTimeout(n.animated), n.animated = setTimeout(function() {
          S(n, "transition", ""), S(n, "transform", ""), n.animated = false, n.animatingX = false, n.animatingY = false;
        }, a2);
      }
    }
  };
}
function ia(t) {
  return t.offsetWidth;
}
function oa(t, e, r2, n) {
  return Math.sqrt(Math.pow(e.top - t.top, 2) + Math.pow(e.left - t.left, 2)) / Math.sqrt(Math.pow(e.top - r2.top, 2) + Math.pow(e.left - r2.left, 2)) * n.animation;
}
var Be = [], Kt = {
  initializeByDefault: true
}, ut = {
  mount: function(e) {
    for (var r2 in Kt)
      Kt.hasOwnProperty(r2) && !(r2 in e) && (e[r2] = Kt[r2]);
    Be.forEach(function(n) {
      if (n.pluginName === e.pluginName)
        throw "Sortable: Cannot mount plugin ".concat(e.pluginName, " more than once");
    }), Be.push(e);
  },
  pluginEvent: function(e, r2, n) {
    var i = this;
    this.eventCanceled = false, n.cancel = function() {
      i.eventCanceled = true;
    };
    var o = e + "Global";
    Be.forEach(function(a2) {
      r2[a2.pluginName] && (r2[a2.pluginName][o] && r2[a2.pluginName][o](we({
        sortable: r2
      }, n)), r2.options[a2.pluginName] && r2[a2.pluginName][e] && r2[a2.pluginName][e](we({
        sortable: r2
      }, n)));
    });
  },
  initializePlugins: function(e, r2, n, i) {
    Be.forEach(function(d) {
      var c = d.pluginName;
      if (!(!e.options[c] && !d.initializeByDefault)) {
        var s = new d(e, r2, e.options);
        s.sortable = e, s.options = e.options, e[c] = s, $e(n, s.defaults);
      }
    });
    for (var o in e.options)
      if (e.options.hasOwnProperty(o)) {
        var a2 = this.modifyOption(e, o, e.options[o]);
        typeof a2 < "u" && (e.options[o] = a2);
      }
  },
  getEventProperties: function(e, r2) {
    var n = {};
    return Be.forEach(function(i) {
      typeof i.eventProperties == "function" && $e(n, i.eventProperties.call(r2[i.pluginName], e));
    }), n;
  },
  modifyOption: function(e, r2, n) {
    var i;
    return Be.forEach(function(o) {
      e[o.pluginName] && o.optionListeners && typeof o.optionListeners[r2] == "function" && (i = o.optionListeners[r2].call(e[o.pluginName], n));
    }), i;
  }
};
function aa(t) {
  var e = t.sortable, r2 = t.rootEl, n = t.name, i = t.targetEl, o = t.cloneEl, a2 = t.toEl, d = t.fromEl, c = t.oldIndex, s = t.newIndex, l = t.oldDraggableIndex, u = t.newDraggableIndex, h = t.originalEvent, p = t.putSortable, b = t.extraEventProperties;
  if (e = e || r2 && r2[le], !!e) {
    var f2, I = e.options, _2 = "on" + n.charAt(0).toUpperCase() + n.substr(1);
    window.CustomEvent && !xe && !dt ? f2 = new CustomEvent(n, {
      bubbles: true,
      cancelable: true
    }) : (f2 = document.createEvent("Event"), f2.initEvent(n, true, true)), f2.to = a2 || r2, f2.from = d || r2, f2.item = i || r2, f2.clone = o, f2.oldIndex = c, f2.newIndex = s, f2.oldDraggableIndex = l, f2.newDraggableIndex = u, f2.originalEvent = h, f2.pullMode = p ? p.lastPutMode : void 0;
    var k = we(we({}, b), ut.getEventProperties(n, e));
    for (var A in k)
      f2[A] = k[A];
    r2 && r2.dispatchEvent(f2), I[_2] && I[_2].call(e, f2);
  }
}
var sa = ["evt"], ae = function(e, r2) {
  var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, i = n.evt, o = Ko(n, sa);
  ut.pluginEvent.bind($)(e, r2, we({
    dragEl: g,
    parentEl: U,
    ghostEl: x,
    rootEl: j,
    nextEl: ke,
    lastDownEl: wt,
    cloneEl: Z,
    cloneHidden: Oe,
    dragStarted: Qe,
    putSortable: Q,
    activeSortable: $.active,
    originalEvent: i,
    oldIndex: Ge,
    oldDraggableIndex: ot,
    newIndex: ue,
    newDraggableIndex: Ce,
    hideGhostForTarget: zi,
    unhideGhostForTarget: Ji,
    cloneNowHidden: function() {
      Oe = true;
    },
    cloneNowShown: function() {
      Oe = false;
    },
    dispatchSortableEvent: function(d) {
      ne({
        sortable: r2,
        name: d,
        originalEvent: i
      });
    }
  }, o));
};
function ne(t) {
  aa(we({
    putSortable: Q,
    cloneEl: Z,
    targetEl: g,
    rootEl: j,
    oldIndex: Ge,
    oldDraggableIndex: ot,
    newIndex: ue,
    newDraggableIndex: Ce
  }, t));
}
var g, U, x, j, ke, wt, Z, Oe, Ge, ue, ot, Ce, mt, Q, Ze = false, Dt = false, At = [], Ne, pe, Qt, er, _n, Ln, Qe, je, at, st = false, gt = false, Rt, te, tr = [], en = false, Pt = [], qt = typeof document < "u", vt = fn, Mn = dt || xe ? "cssFloat" : "float", la = qt && !Fi && !fn && "draggable" in document.createElement("div"), Xi = (function() {
  if (qt) {
    if (xe)
      return false;
    var t = document.createElement("x");
    return t.style.cssText = "pointer-events:auto", t.style.pointerEvents === "auto";
  }
})(), Wi = function(e, r2) {
  var n = S(e), i = parseInt(n.width) - parseInt(n.paddingLeft) - parseInt(n.paddingRight) - parseInt(n.borderLeftWidth) - parseInt(n.borderRightWidth), o = Ye(e, 0, r2), a2 = Ye(e, 1, r2), d = o && S(o), c = a2 && S(a2), s = d && parseInt(d.marginLeft) + parseInt(d.marginRight) + z(o).width, l = c && parseInt(c.marginLeft) + parseInt(c.marginRight) + z(a2).width;
  if (n.display === "flex")
    return n.flexDirection === "column" || n.flexDirection === "column-reverse" ? "vertical" : "horizontal";
  if (n.display === "grid")
    return n.gridTemplateColumns.split(" ").length <= 1 ? "vertical" : "horizontal";
  if (o && d.float && d.float !== "none") {
    var u = d.float === "left" ? "left" : "right";
    return a2 && (c.clear === "both" || c.clear === u) ? "vertical" : "horizontal";
  }
  return o && (d.display === "block" || d.display === "flex" || d.display === "table" || d.display === "grid" || s >= i && n[Mn] === "none" || a2 && n[Mn] === "none" && s + l > i) ? "vertical" : "horizontal";
}, ca = function(e, r2, n) {
  var i = n ? e.left : e.top, o = n ? e.right : e.bottom, a2 = n ? e.width : e.height, d = n ? r2.left : r2.top, c = n ? r2.right : r2.bottom, s = n ? r2.width : r2.height;
  return i === d || o === c || i + a2 / 2 === d + s / 2;
}, da = function(e, r2) {
  var n;
  return At.some(function(i) {
    var o = i[le].options.emptyInsertThreshold;
    if (!(!o || pn(i))) {
      var a2 = z(i), d = e >= a2.left - o && e <= a2.right + o, c = r2 >= a2.top - o && r2 <= a2.bottom + o;
      if (d && c)
        return n = i;
    }
  }), n;
}, Yi = function(e) {
  function r2(o, a2) {
    return function(d, c, s, l) {
      var u = d.options.group.name && c.options.group.name && d.options.group.name === c.options.group.name;
      if (o == null && (a2 || u))
        return true;
      if (o == null || o === false)
        return false;
      if (a2 && o === "clone")
        return o;
      if (typeof o == "function")
        return r2(o(d, c, s, l), a2)(d, c, s, l);
      var h = (a2 ? d : c).options.group.name;
      return o === true || typeof o == "string" && o === h || o.join && o.indexOf(h) > -1;
    };
  }
  var n = {}, i = e.group;
  (!i || yt(i) != "object") && (i = {
    name: i
  }), n.name = i.name, n.checkPull = r2(i.pull, true), n.checkPut = r2(i.put), n.revertClone = i.revertClone, e.group = n;
}, zi = function() {
  !Xi && x && S(x, "display", "none");
}, Ji = function() {
  !Xi && x && S(x, "display", "");
};
qt && !Fi && document.addEventListener("click", function(t) {
  if (Dt)
    return t.preventDefault(), t.stopPropagation && t.stopPropagation(), t.stopImmediatePropagation && t.stopImmediatePropagation(), Dt = false, false;
}, true);
var He = function(e) {
  if (g) {
    e = e.touches ? e.touches[0] : e;
    var r2 = da(e.clientX, e.clientY);
    if (r2) {
      var n = {};
      for (var i in e)
        e.hasOwnProperty(i) && (n[i] = e[i]);
      n.target = n.rootEl = r2, n.preventDefault = void 0, n.stopPropagation = void 0, r2[le]._onDragOver(n);
    }
  }
}, ua = function(e) {
  g && g.parentNode[le]._isOutsideThisEl(e.target);
};
function $(t, e) {
  if (!(t && t.nodeType && t.nodeType === 1))
    throw "Sortable: `el` must be an HTMLElement, not ".concat({}.toString.call(t));
  this.el = t, this.options = e = $e({}, e), t[le] = this;
  var r2 = {
    group: null,
    sort: true,
    disabled: false,
    store: null,
    handle: null,
    draggable: /^[uo]l$/i.test(t.nodeName) ? ">li" : ">*",
    swapThreshold: 1,
    // percentage; 0 <= x <= 1
    invertSwap: false,
    // invert always
    invertedSwapThreshold: null,
    // will be set to same as swapThreshold if default
    removeCloneOnHide: true,
    direction: function() {
      return Wi(t, this.options);
    },
    ghostClass: "sortable-ghost",
    chosenClass: "sortable-chosen",
    dragClass: "sortable-drag",
    ignore: "a, img",
    filter: null,
    preventOnFilter: true,
    animation: 0,
    easing: null,
    setData: function(a2, d) {
      a2.setData("Text", d.textContent);
    },
    dropBubble: false,
    dragoverBubble: false,
    dataIdAttr: "data-id",
    delay: 0,
    delayOnTouchOnly: false,
    touchStartThreshold: (Number.parseInt ? Number : window).parseInt(window.devicePixelRatio, 10) || 1,
    forceFallback: false,
    fallbackClass: "sortable-fallback",
    fallbackOnBody: false,
    fallbackTolerance: 0,
    fallbackOffset: {
      x: 0,
      y: 0
    },
    // Disabled on Safari: #1571; Enabled on Safari IOS: #2244
    supportPointer: $.supportPointer !== false && "PointerEvent" in window && (!nt || fn),
    emptyInsertThreshold: 5
  };
  ut.initializePlugins(this, t, r2);
  for (var n in r2)
    !(n in e) && (e[n] = r2[n]);
  Yi(e);
  for (var i in this)
    i.charAt(0) === "_" && typeof this[i] == "function" && (this[i] = this[i].bind(this));
  this.nativeDraggable = e.forceFallback ? false : la, this.nativeDraggable && (this.options.touchStartThreshold = 1), e.supportPointer ? H(t, "pointerdown", this._onTapStart) : (H(t, "mousedown", this._onTapStart), H(t, "touchstart", this._onTapStart)), this.nativeDraggable && (H(t, "dragover", this), H(t, "dragenter", this)), At.push(this.el), e.store && e.store.get && this.sort(e.store.get(this) || []), $e(this, na());
}
$.prototype = /** @lends Sortable.prototype */
{
  constructor: $,
  _isOutsideThisEl: function(e) {
    !this.el.contains(e) && e !== this.el && (je = null);
  },
  _getDirection: function(e, r2) {
    return typeof this.options.direction == "function" ? this.options.direction.call(this, e, r2, g) : this.options.direction;
  },
  _onTapStart: function(e) {
    if (e.cancelable) {
      var r2 = this, n = this.el, i = this.options, o = i.preventOnFilter, a2 = e.type, d = e.touches && e.touches[0] || e.pointerType && e.pointerType === "touch" && e, c = (d || e).target, s = e.target.shadowRoot && (e.path && e.path[0] || e.composedPath && e.composedPath()[0]) || c, l = i.filter;
      if (Ea(n), !g && !(/mousedown|pointerdown/.test(a2) && e.button !== 0 || i.disabled) && !s.isContentEditable && !(!this.nativeDraggable && nt && c && c.tagName.toUpperCase() === "SELECT") && (c = me(c, i.draggable, n, false), !(c && c.animated) && wt !== c)) {
        if (Ge = fe(c), ot = fe(c, i.draggable), typeof l == "function") {
          if (l.call(this, e, c, this)) {
            ne({
              sortable: r2,
              rootEl: s,
              name: "filter",
              targetEl: c,
              toEl: n,
              fromEl: n
            }), ae("filter", r2, {
              evt: e
            }), o && e.preventDefault();
            return;
          }
        } else if (l && (l = l.split(",").some(function(u) {
          if (u = me(s, u.trim(), n, false), u)
            return ne({
              sortable: r2,
              rootEl: u,
              name: "filter",
              targetEl: c,
              fromEl: n,
              toEl: n
            }), ae("filter", r2, {
              evt: e
            }), true;
        }), l)) {
          o && e.preventDefault();
          return;
        }
        i.handle && !me(s, i.handle, n, false) || this._prepareDragStart(e, d, c);
      }
    }
  },
  _prepareDragStart: function(e, r2, n) {
    var i = this, o = i.el, a2 = i.options, d = o.ownerDocument, c;
    if (n && !g && n.parentNode === o) {
      var s = z(n);
      if (j = o, g = n, U = g.parentNode, ke = g.nextSibling, wt = n, mt = a2.group, $.dragged = g, Ne = {
        target: g,
        clientX: (r2 || e).clientX,
        clientY: (r2 || e).clientY
      }, _n = Ne.clientX - s.left, Ln = Ne.clientY - s.top, this._lastX = (r2 || e).clientX, this._lastY = (r2 || e).clientY, g.style["will-change"] = "all", c = function() {
        if (ae("delayEnded", i, {
          evt: e
        }), $.eventCanceled) {
          i._onDrop();
          return;
        }
        i._disableDelayedDragEvents(), !On && i.nativeDraggable && (g.draggable = true), i._triggerDragStart(e, r2), ne({
          sortable: i,
          name: "choose",
          originalEvent: e
        }), de(g, a2.chosenClass, true);
      }, a2.ignore.split(",").forEach(function(l) {
        Bi(g, l.trim(), rr);
      }), H(d, "dragover", He), H(d, "mousemove", He), H(d, "touchmove", He), a2.supportPointer ? (H(d, "pointerup", i._onDrop), !this.nativeDraggable && H(d, "pointercancel", i._onDrop)) : (H(d, "mouseup", i._onDrop), H(d, "touchend", i._onDrop), H(d, "touchcancel", i._onDrop)), On && this.nativeDraggable && (this.options.touchStartThreshold = 4, g.draggable = true), ae("delayStart", this, {
        evt: e
      }), a2.delay && (!a2.delayOnTouchOnly || r2) && (!this.nativeDraggable || !(dt || xe))) {
        if ($.eventCanceled) {
          this._onDrop();
          return;
        }
        a2.supportPointer ? (H(d, "pointerup", i._disableDelayedDrag), H(d, "pointercancel", i._disableDelayedDrag)) : (H(d, "mouseup", i._disableDelayedDrag), H(d, "touchend", i._disableDelayedDrag), H(d, "touchcancel", i._disableDelayedDrag)), H(d, "mousemove", i._delayedDragTouchMoveHandler), H(d, "touchmove", i._delayedDragTouchMoveHandler), a2.supportPointer && H(d, "pointermove", i._delayedDragTouchMoveHandler), i._dragStartTimer = setTimeout(c, a2.delay);
      } else
        c();
    }
  },
  _delayedDragTouchMoveHandler: function(e) {
    var r2 = e.touches ? e.touches[0] : e;
    Math.max(Math.abs(r2.clientX - this._lastX), Math.abs(r2.clientY - this._lastY)) >= Math.floor(this.options.touchStartThreshold / (this.nativeDraggable && window.devicePixelRatio || 1)) && this._disableDelayedDrag();
  },
  _disableDelayedDrag: function() {
    g && rr(g), clearTimeout(this._dragStartTimer), this._disableDelayedDragEvents();
  },
  _disableDelayedDragEvents: function() {
    var e = this.el.ownerDocument;
    L(e, "mouseup", this._disableDelayedDrag), L(e, "touchend", this._disableDelayedDrag), L(e, "touchcancel", this._disableDelayedDrag), L(e, "pointerup", this._disableDelayedDrag), L(e, "pointercancel", this._disableDelayedDrag), L(e, "mousemove", this._delayedDragTouchMoveHandler), L(e, "touchmove", this._delayedDragTouchMoveHandler), L(e, "pointermove", this._delayedDragTouchMoveHandler);
  },
  _triggerDragStart: function(e, r2) {
    r2 = r2 || e.pointerType == "touch" && e, !this.nativeDraggable || r2 ? this.options.supportPointer ? H(document, "pointermove", this._onTouchMove) : r2 ? H(document, "touchmove", this._onTouchMove) : H(document, "mousemove", this._onTouchMove) : (H(g, "dragend", this), H(j, "dragstart", this._onDragStart));
    try {
      document.selection ? It(function() {
        document.selection.empty();
      }) : window.getSelection().removeAllRanges();
    } catch {
    }
  },
  _dragStarted: function(e, r2) {
    if (Ze = false, j && g) {
      ae("dragStarted", this, {
        evt: r2
      }), this.nativeDraggable && H(document, "dragover", ua);
      var n = this.options;
      !e && de(g, n.dragClass, false), de(g, n.ghostClass, true), $.active = this, e && this._appendGhost(), ne({
        sortable: this,
        name: "start",
        originalEvent: r2
      });
    } else
      this._nulling();
  },
  _emulateDragOver: function() {
    if (pe) {
      this._lastX = pe.clientX, this._lastY = pe.clientY, zi();
      for (var e = document.elementFromPoint(pe.clientX, pe.clientY), r2 = e; e && e.shadowRoot && (e = e.shadowRoot.elementFromPoint(pe.clientX, pe.clientY), e !== r2); )
        r2 = e;
      if (g.parentNode[le]._isOutsideThisEl(e), r2)
        do {
          if (r2[le]) {
            var n = void 0;
            if (n = r2[le]._onDragOver({
              clientX: pe.clientX,
              clientY: pe.clientY,
              target: e,
              rootEl: r2
            }), n && !this.options.dragoverBubble)
              break;
          }
          e = r2;
        } while (r2 = qi(r2));
      Ji();
    }
  },
  _onTouchMove: function(e) {
    if (Ne) {
      var r2 = this.options, n = r2.fallbackTolerance, i = r2.fallbackOffset, o = e.touches ? e.touches[0] : e, a2 = x && Xe(x, true), d = x && a2 && a2.a, c = x && a2 && a2.d, s = vt && te && Pn(te), l = (o.clientX - Ne.clientX + i.x) / (d || 1) + (s ? s[0] - tr[0] : 0) / (d || 1), u = (o.clientY - Ne.clientY + i.y) / (c || 1) + (s ? s[1] - tr[1] : 0) / (c || 1);
      if (!$.active && !Ze) {
        if (n && Math.max(Math.abs(o.clientX - this._lastX), Math.abs(o.clientY - this._lastY)) < n)
          return;
        this._onDragStart(e, true);
      }
      if (x) {
        a2 ? (a2.e += l - (Qt || 0), a2.f += u - (er || 0)) : a2 = {
          a: 1,
          b: 0,
          c: 0,
          d: 1,
          e: l,
          f: u
        };
        var h = "matrix(".concat(a2.a, ",").concat(a2.b, ",").concat(a2.c, ",").concat(a2.d, ",").concat(a2.e, ",").concat(a2.f, ")");
        S(x, "webkitTransform", h), S(x, "mozTransform", h), S(x, "msTransform", h), S(x, "transform", h), Qt = l, er = u, pe = o;
      }
      e.cancelable && e.preventDefault();
    }
  },
  _appendGhost: function() {
    if (!x) {
      var e = this.options.fallbackOnBody ? document.body : j, r2 = z(g, true, vt, true, e), n = this.options;
      if (vt) {
        for (te = e; S(te, "position") === "static" && S(te, "transform") === "none" && te !== document; )
          te = te.parentNode;
        te !== document.body && te !== document.documentElement ? (te === document && (te = ye()), r2.top += te.scrollTop, r2.left += te.scrollLeft) : te = ye(), tr = Pn(te);
      }
      x = g.cloneNode(true), de(x, n.ghostClass, false), de(x, n.fallbackClass, true), de(x, n.dragClass, true), S(x, "transition", ""), S(x, "transform", ""), S(x, "box-sizing", "border-box"), S(x, "margin", 0), S(x, "top", r2.top), S(x, "left", r2.left), S(x, "width", r2.width), S(x, "height", r2.height), S(x, "opacity", "0.8"), S(x, "position", vt ? "absolute" : "fixed"), S(x, "zIndex", "100000"), S(x, "pointerEvents", "none"), $.ghost = x, e.appendChild(x), S(x, "transform-origin", _n / parseInt(x.style.width) * 100 + "% " + Ln / parseInt(x.style.height) * 100 + "%");
    }
  },
  _onDragStart: function(e, r2) {
    var n = this, i = e.dataTransfer, o = n.options;
    if (ae("dragStart", this, {
      evt: e
    }), $.eventCanceled) {
      this._onDrop();
      return;
    }
    ae("setupClone", this), $.eventCanceled || (Z = Gi(g), Z.removeAttribute("id"), Z.draggable = false, Z.style["will-change"] = "", this._hideClone(), de(Z, this.options.chosenClass, false), $.clone = Z), n.cloneId = It(function() {
      ae("clone", n), !$.eventCanceled && (n.options.removeCloneOnHide || j.insertBefore(Z, g), n._hideClone(), ne({
        sortable: n,
        name: "clone"
      }));
    }), !r2 && de(g, o.dragClass, true), r2 ? (Dt = true, n._loopId = setInterval(n._emulateDragOver, 50)) : (L(document, "mouseup", n._onDrop), L(document, "touchend", n._onDrop), L(document, "touchcancel", n._onDrop), i && (i.effectAllowed = "move", o.setData && o.setData.call(n, i, g)), H(document, "drop", n), S(g, "transform", "translateZ(0)")), Ze = true, n._dragStartId = It(n._dragStarted.bind(n, r2, e)), H(document, "selectstart", n), Qe = true, window.getSelection().removeAllRanges(), nt && S(document.body, "user-select", "none");
  },
  // Returns true - if no further action is needed (either inserted or another condition)
  _onDragOver: function(e) {
    var r2 = this.el, n = e.target, i, o, a2, d = this.options, c = d.group, s = $.active, l = mt === c, u = d.sort, h = Q || s, p, b = this, f2 = false;
    if (en) return;
    function I(R, w) {
      ae(R, b, we({
        evt: e,
        isOwner: l,
        axis: p ? "vertical" : "horizontal",
        revert: a2,
        dragRect: i,
        targetRect: o,
        canSort: u,
        fromSortable: h,
        target: n,
        completed: k,
        onMove: function(F2, P) {
          return bt(j, r2, g, i, F2, z(F2), e, P);
        },
        changed: A
      }, w));
    }
    function _2() {
      I("dragOverAnimationCapture"), b.captureAnimationState(), b !== h && h.captureAnimationState();
    }
    function k(R) {
      return I("dragOverCompleted", {
        insertion: R
      }), R && (l ? s._hideClone() : s._showClone(b), b !== h && (de(g, Q ? Q.options.ghostClass : s.options.ghostClass, false), de(g, d.ghostClass, true)), Q !== b && b !== $.active ? Q = b : b === $.active && Q && (Q = null), h === b && (b._ignoreWhileAnimating = n), b.animateAll(function() {
        I("dragOverAnimationComplete"), b._ignoreWhileAnimating = null;
      }), b !== h && (h.animateAll(), h._ignoreWhileAnimating = null)), (n === g && !g.animated || n === r2 && !n.animated) && (je = null), !d.dragoverBubble && !e.rootEl && n !== document && (g.parentNode[le]._isOutsideThisEl(e.target), !R && He(e)), !d.dragoverBubble && e.stopPropagation && e.stopPropagation(), f2 = true;
    }
    function A() {
      ue = fe(g), Ce = fe(g, d.draggable), ne({
        sortable: b,
        name: "change",
        toEl: r2,
        newIndex: ue,
        newDraggableIndex: Ce,
        originalEvent: e
      });
    }
    if (e.preventDefault !== void 0 && e.cancelable && e.preventDefault(), n = me(n, d.draggable, r2, true), I("dragOver"), $.eventCanceled) return f2;
    if (g.contains(e.target) || n.animated && n.animatingX && n.animatingY || b._ignoreWhileAnimating === n)
      return k(false);
    if (Dt = false, s && !d.disabled && (l ? u || (a2 = U !== j) : Q === this || (this.lastPutMode = mt.checkPull(this, s, g, e)) && c.checkPut(this, s, g, e))) {
      if (p = this._getDirection(e, n) === "vertical", i = z(g), I("dragOverValid"), $.eventCanceled) return f2;
      if (a2)
        return U = j, _2(), this._hideClone(), I("revert"), $.eventCanceled || (ke ? j.insertBefore(g, ke) : j.appendChild(g)), k(true);
      var V2 = pn(r2, d.draggable);
      if (!V2 || ma(e, p, this) && !V2.animated) {
        if (V2 === g)
          return k(false);
        if (V2 && r2 === e.target && (n = V2), n && (o = z(n)), bt(j, r2, g, i, n, o, e, !!n) !== false)
          return _2(), V2 && V2.nextSibling ? r2.insertBefore(g, V2.nextSibling) : r2.appendChild(g), U = r2, A(), k(true);
      } else if (V2 && pa(e, p, this)) {
        var G = Ye(r2, 0, d, true);
        if (G === g)
          return k(false);
        if (n = G, o = z(n), bt(j, r2, g, i, n, o, e, false) !== false)
          return _2(), r2.insertBefore(g, G), U = r2, A(), k(true);
      } else if (n.parentNode === r2) {
        o = z(n);
        var N = 0, q, T = g.parentNode !== r2, J = !ca(g.animated && g.toRect || i, n.animated && n.toRect || o, p), Re = p ? "top" : "left", he = An(n, "top", "top") || An(g, "top", "top"), Ie = he ? he.scrollTop : void 0;
        je !== n && (q = o[Re], st = false, gt = !J && d.invertSwap || T), N = ga(e, n, o, p, J ? 1 : d.swapThreshold, d.invertedSwapThreshold == null ? d.swapThreshold : d.invertedSwapThreshold, gt, je === n);
        var ce2;
        if (N !== 0) {
          var v = fe(g);
          do
            v -= N, ce2 = U.children[v];
          while (ce2 && (S(ce2, "display") === "none" || ce2 === x));
        }
        if (N === 0 || ce2 === n)
          return k(false);
        je = n, at = N;
        var m = n.nextElementSibling, y2 = false;
        y2 = N === 1;
        var E = bt(j, r2, g, i, n, o, e, y2);
        if (E !== false)
          return (E === 1 || E === -1) && (y2 = E === 1), en = true, setTimeout(fa, 30), _2(), y2 && !m ? r2.appendChild(g) : n.parentNode.insertBefore(g, y2 ? m : n), he && Zi(he, 0, Ie - he.scrollTop), U = g.parentNode, q !== void 0 && !gt && (Rt = Math.abs(q - z(n)[Re])), A(), k(true);
      }
      if (r2.contains(g))
        return k(false);
    }
    return false;
  },
  _ignoreWhileAnimating: null,
  _offMoveEvents: function() {
    L(document, "mousemove", this._onTouchMove), L(document, "touchmove", this._onTouchMove), L(document, "pointermove", this._onTouchMove), L(document, "dragover", He), L(document, "mousemove", He), L(document, "touchmove", He);
  },
  _offUpEvents: function() {
    var e = this.el.ownerDocument;
    L(e, "mouseup", this._onDrop), L(e, "touchend", this._onDrop), L(e, "pointerup", this._onDrop), L(e, "pointercancel", this._onDrop), L(e, "touchcancel", this._onDrop), L(document, "selectstart", this);
  },
  _onDrop: function(e) {
    var r2 = this.el, n = this.options;
    if (ue = fe(g), Ce = fe(g, n.draggable), ae("drop", this, {
      evt: e
    }), U = g && g.parentNode, ue = fe(g), Ce = fe(g, n.draggable), $.eventCanceled) {
      this._nulling();
      return;
    }
    Ze = false, gt = false, st = false, clearInterval(this._loopId), clearTimeout(this._dragStartTimer), tn(this.cloneId), tn(this._dragStartId), this.nativeDraggable && (L(document, "drop", this), L(r2, "dragstart", this._onDragStart)), this._offMoveEvents(), this._offUpEvents(), nt && S(document.body, "user-select", ""), S(g, "transform", ""), e && (Qe && (e.cancelable && e.preventDefault(), !n.dropBubble && e.stopPropagation()), x && x.parentNode && x.parentNode.removeChild(x), (j === U || Q && Q.lastPutMode !== "clone") && Z && Z.parentNode && Z.parentNode.removeChild(Z), g && (this.nativeDraggable && L(g, "dragend", this), rr(g), g.style["will-change"] = "", Qe && !Ze && de(g, Q ? Q.options.ghostClass : this.options.ghostClass, false), de(g, this.options.chosenClass, false), ne({
      sortable: this,
      name: "unchoose",
      toEl: U,
      newIndex: null,
      newDraggableIndex: null,
      originalEvent: e
    }), j !== U ? (ue >= 0 && (ne({
      rootEl: U,
      name: "add",
      toEl: U,
      fromEl: j,
      originalEvent: e
    }), ne({
      sortable: this,
      name: "remove",
      toEl: U,
      originalEvent: e
    }), ne({
      rootEl: U,
      name: "sort",
      toEl: U,
      fromEl: j,
      originalEvent: e
    }), ne({
      sortable: this,
      name: "sort",
      toEl: U,
      originalEvent: e
    })), Q && Q.save()) : ue !== Ge && ue >= 0 && (ne({
      sortable: this,
      name: "update",
      toEl: U,
      originalEvent: e
    }), ne({
      sortable: this,
      name: "sort",
      toEl: U,
      originalEvent: e
    })), $.active && ((ue == null || ue === -1) && (ue = Ge, Ce = ot), ne({
      sortable: this,
      name: "end",
      toEl: U,
      originalEvent: e
    }), this.save()))), this._nulling();
  },
  _nulling: function() {
    ae("nulling", this), j = g = U = x = ke = Z = wt = Oe = Ne = pe = Qe = ue = Ce = Ge = ot = je = at = Q = mt = $.dragged = $.ghost = $.clone = $.active = null, Pt.forEach(function(e) {
      e.checked = true;
    }), Pt.length = Qt = er = 0;
  },
  handleEvent: function(e) {
    switch (e.type) {
      case "drop":
      case "dragend":
        this._onDrop(e);
        break;
      case "dragenter":
      case "dragover":
        g && (this._onDragOver(e), ha(e));
        break;
      case "selectstart":
        e.preventDefault();
        break;
    }
  },
  /**
   * Serializes the item into an array of string.
   * @returns {String[]}
   */
  toArray: function() {
    for (var e = [], r2, n = this.el.children, i = 0, o = n.length, a2 = this.options; i < o; i++)
      r2 = n[i], me(r2, a2.draggable, this.el, false) && e.push(r2.getAttribute(a2.dataIdAttr) || ba(r2));
    return e;
  },
  /**
   * Sorts the elements according to the array.
   * @param  {String[]}  order  order of the items
   */
  sort: function(e, r2) {
    var n = {}, i = this.el;
    this.toArray().forEach(function(o, a2) {
      var d = i.children[a2];
      me(d, this.options.draggable, i, false) && (n[o] = d);
    }, this), r2 && this.captureAnimationState(), e.forEach(function(o) {
      n[o] && (i.removeChild(n[o]), i.appendChild(n[o]));
    }), r2 && this.animateAll();
  },
  /**
   * Save the current sorting
   */
  save: function() {
    var e = this.options.store;
    e && e.set && e.set(this);
  },
  /**
   * For each element in the set, get the first element that matches the selector by testing the element itself and traversing up through its ancestors in the DOM tree.
   * @param   {HTMLElement}  el
   * @param   {String}       [selector]  default: `options.draggable`
   * @returns {HTMLElement|null}
   */
  closest: function(e, r2) {
    return me(e, r2 || this.options.draggable, this.el, false);
  },
  /**
   * Set/get option
   * @param   {string} name
   * @param   {*}      [value]
   * @returns {*}
   */
  option: function(e, r2) {
    var n = this.options;
    if (r2 === void 0)
      return n[e];
    var i = ut.modifyOption(this, e, r2);
    typeof i < "u" ? n[e] = i : n[e] = r2, e === "group" && Yi(n);
  },
  /**
   * Destroy
   */
  destroy: function() {
    ae("destroy", this);
    var e = this.el;
    e[le] = null, L(e, "mousedown", this._onTapStart), L(e, "touchstart", this._onTapStart), L(e, "pointerdown", this._onTapStart), this.nativeDraggable && (L(e, "dragover", this), L(e, "dragenter", this)), Array.prototype.forEach.call(e.querySelectorAll("[draggable]"), function(r2) {
      r2.removeAttribute("draggable");
    }), this._onDrop(), this._disableDelayedDragEvents(), At.splice(At.indexOf(this.el), 1), this.el = e = null;
  },
  _hideClone: function() {
    if (!Oe) {
      if (ae("hideClone", this), $.eventCanceled) return;
      S(Z, "display", "none"), this.options.removeCloneOnHide && Z.parentNode && Z.parentNode.removeChild(Z), Oe = true;
    }
  },
  _showClone: function(e) {
    if (e.lastPutMode !== "clone") {
      this._hideClone();
      return;
    }
    if (Oe) {
      if (ae("showClone", this), $.eventCanceled) return;
      g.parentNode == j && !this.options.group.revertClone ? j.insertBefore(Z, g) : ke ? j.insertBefore(Z, ke) : j.appendChild(Z), this.options.group.revertClone && this.animate(g, Z), S(Z, "display", ""), Oe = false;
    }
  }
};
function ha(t) {
  t.dataTransfer && (t.dataTransfer.dropEffect = "move"), t.cancelable && t.preventDefault();
}
function bt(t, e, r2, n, i, o, a2, d) {
  var c, s = t[le], l = s.options.onMove, u;
  return window.CustomEvent && !xe && !dt ? c = new CustomEvent("move", {
    bubbles: true,
    cancelable: true
  }) : (c = document.createEvent("Event"), c.initEvent("move", true, true)), c.to = e, c.from = t, c.dragged = r2, c.draggedRect = n, c.related = i || e, c.relatedRect = o || z(e), c.willInsertAfter = d, c.originalEvent = a2, t.dispatchEvent(c), l && (u = l.call(s, c, a2)), u;
}
function rr(t) {
  t.draggable = false;
}
function fa() {
  en = false;
}
function pa(t, e, r2) {
  var n = z(Ye(r2.el, 0, r2.options, true)), i = Ui(r2.el, r2.options, x), o = 10;
  return e ? t.clientX < i.left - o || t.clientY < n.top && t.clientX < n.right : t.clientY < i.top - o || t.clientY < n.bottom && t.clientX < n.left;
}
function ma(t, e, r2) {
  var n = z(pn(r2.el, r2.options.draggable)), i = Ui(r2.el, r2.options, x), o = 10;
  return e ? t.clientX > i.right + o || t.clientY > n.bottom && t.clientX > n.left : t.clientY > i.bottom + o || t.clientX > n.right && t.clientY > n.top;
}
function ga(t, e, r2, n, i, o, a2, d) {
  var c = n ? t.clientY : t.clientX, s = n ? r2.height : r2.width, l = n ? r2.top : r2.left, u = n ? r2.bottom : r2.right, h = false;
  if (!a2) {
    if (d && Rt < s * i) {
      if (!st && (at === 1 ? c > l + s * o / 2 : c < u - s * o / 2) && (st = true), st)
        h = true;
      else if (at === 1 ? c < l + Rt : c > u - Rt)
        return -at;
    } else if (c > l + s * (1 - i) / 2 && c < u - s * (1 - i) / 2)
      return va(e);
  }
  return h = h || a2, h && (c < l + s * o / 2 || c > u - s * o / 2) ? c > l + s / 2 ? 1 : -1 : 0;
}
function va(t) {
  return fe(g) < fe(t) ? 1 : -1;
}
function ba(t) {
  for (var e = t.tagName + t.className + t.src + t.href + t.textContent, r2 = e.length, n = 0; r2--; )
    n += e.charCodeAt(r2);
  return n.toString(36);
}
function Ea(t) {
  Pt.length = 0;
  for (var e = t.getElementsByTagName("input"), r2 = e.length; r2--; ) {
    var n = e[r2];
    n.checked && Pt.push(n);
  }
}
function It(t) {
  return setTimeout(t, 0);
}
function tn(t) {
  return clearTimeout(t);
}
qt && H(document, "touchmove", function(t) {
  ($.active || Ze) && t.cancelable && t.preventDefault();
});
$.utils = {
  on: H,
  off: L,
  css: S,
  find: Bi,
  is: function(e, r2) {
    return !!me(e, r2, e, false);
  },
  extend: ta,
  throttle: ji,
  closest: me,
  toggleClass: de,
  clone: Gi,
  index: fe,
  nextTick: It,
  cancelNextTick: tn,
  detectDirection: Wi,
  getChild: Ye,
  expando: le
};
$.get = function(t) {
  return t[le];
};
$.mount = function() {
  for (var t = arguments.length, e = new Array(t), r2 = 0; r2 < t; r2++)
    e[r2] = arguments[r2];
  e[0].constructor === Array && (e = e[0]), e.forEach(function(n) {
    if (!n.prototype || !n.prototype.constructor)
      throw "Sortable: Mounted plugin must be a constructor function, not ".concat({}.toString.call(n));
    n.utils && ($.utils = we(we({}, $.utils), n.utils)), ut.mount(n);
  });
};
$.create = function(t, e) {
  return new $(t, e);
};
$.version = Qo;
var Y = [], et, rn, nn = false, nr, ir, _t, tt;
function ya() {
  function t() {
    this.defaults = {
      scroll: true,
      forceAutoScrollFallback: false,
      scrollSensitivity: 30,
      scrollSpeed: 10,
      bubbleScroll: true
    };
    for (var e in this)
      e.charAt(0) === "_" && typeof this[e] == "function" && (this[e] = this[e].bind(this));
  }
  return t.prototype = {
    dragStarted: function(r2) {
      var n = r2.originalEvent;
      this.sortable.nativeDraggable ? H(document, "dragover", this._handleAutoScroll) : this.options.supportPointer ? H(document, "pointermove", this._handleFallbackAutoScroll) : n.touches ? H(document, "touchmove", this._handleFallbackAutoScroll) : H(document, "mousemove", this._handleFallbackAutoScroll);
    },
    dragOverCompleted: function(r2) {
      var n = r2.originalEvent;
      !this.options.dragOverBubble && !n.rootEl && this._handleAutoScroll(n);
    },
    drop: function() {
      this.sortable.nativeDraggable ? L(document, "dragover", this._handleAutoScroll) : (L(document, "pointermove", this._handleFallbackAutoScroll), L(document, "touchmove", this._handleFallbackAutoScroll), L(document, "mousemove", this._handleFallbackAutoScroll)), Nn(), St(), ra();
    },
    nulling: function() {
      _t = rn = et = nn = tt = nr = ir = null, Y.length = 0;
    },
    _handleFallbackAutoScroll: function(r2) {
      this._handleAutoScroll(r2, true);
    },
    _handleAutoScroll: function(r2, n) {
      var i = this, o = (r2.touches ? r2.touches[0] : r2).clientX, a2 = (r2.touches ? r2.touches[0] : r2).clientY, d = document.elementFromPoint(o, a2);
      if (_t = r2, n || this.options.forceAutoScrollFallback || dt || xe || nt) {
        or(r2, this.options, d, n);
        var c = Ae(d, true);
        nn && (!tt || o !== nr || a2 !== ir) && (tt && Nn(), tt = setInterval(function() {
          var s = Ae(document.elementFromPoint(o, a2), true);
          s !== c && (c = s, St()), or(r2, i.options, s, n);
        }, 10), nr = o, ir = a2);
      } else {
        if (!this.options.bubbleScroll || Ae(d, true) === ye()) {
          St();
          return;
        }
        or(r2, this.options, Ae(d, false), false);
      }
    }
  }, $e(t, {
    pluginName: "scroll",
    initializeByDefault: true
  });
}
function St() {
  Y.forEach(function(t) {
    clearInterval(t.pid);
  }), Y = [];
}
function Nn() {
  clearInterval(tt);
}
var or = ji(function(t, e, r2, n) {
  if (e.scroll) {
    var i = (t.touches ? t.touches[0] : t).clientX, o = (t.touches ? t.touches[0] : t).clientY, a2 = e.scrollSensitivity, d = e.scrollSpeed, c = ye(), s = false, l;
    rn !== r2 && (rn = r2, St(), et = e.scroll, l = e.scrollFn, et === true && (et = Ae(r2, true)));
    var u = 0, h = et;
    do {
      var p = h, b = z(p), f2 = b.top, I = b.bottom, _2 = b.left, k = b.right, A = b.width, V2 = b.height, G = void 0, N = void 0, q = p.scrollWidth, T = p.scrollHeight, J = S(p), Re = p.scrollLeft, he = p.scrollTop;
      p === c ? (G = A < q && (J.overflowX === "auto" || J.overflowX === "scroll" || J.overflowX === "visible"), N = V2 < T && (J.overflowY === "auto" || J.overflowY === "scroll" || J.overflowY === "visible")) : (G = A < q && (J.overflowX === "auto" || J.overflowX === "scroll"), N = V2 < T && (J.overflowY === "auto" || J.overflowY === "scroll"));
      var Ie = G && (Math.abs(k - i) <= a2 && Re + A < q) - (Math.abs(_2 - i) <= a2 && !!Re), ce2 = N && (Math.abs(I - o) <= a2 && he + V2 < T) - (Math.abs(f2 - o) <= a2 && !!he);
      if (!Y[u])
        for (var v = 0; v <= u; v++)
          Y[v] || (Y[v] = {});
      (Y[u].vx != Ie || Y[u].vy != ce2 || Y[u].el !== p) && (Y[u].el = p, Y[u].vx = Ie, Y[u].vy = ce2, clearInterval(Y[u].pid), (Ie != 0 || ce2 != 0) && (s = true, Y[u].pid = setInterval((function() {
        n && this.layer === 0 && $.active._onTouchMove(_t);
        var m = Y[this.layer].vy ? Y[this.layer].vy * d : 0, y2 = Y[this.layer].vx ? Y[this.layer].vx * d : 0;
        typeof l == "function" && l.call($.dragged.parentNode[le], y2, m, t, _t, Y[this.layer].el) !== "continue" || Zi(Y[this.layer].el, y2, m);
      }).bind({
        layer: u
      }), 24))), u++;
    } while (e.bubbleScroll && h !== c && (h = Ae(h, false)));
    nn = s;
  }
}, 30), Ki = function(e) {
  var r2 = e.originalEvent, n = e.putSortable, i = e.dragEl, o = e.activeSortable, a2 = e.dispatchSortableEvent, d = e.hideGhostForTarget, c = e.unhideGhostForTarget;
  if (r2) {
    var s = n || o;
    d();
    var l = r2.changedTouches && r2.changedTouches.length ? r2.changedTouches[0] : r2, u = document.elementFromPoint(l.clientX, l.clientY);
    c(), s && !s.el.contains(u) && (a2("spill"), this.onSpill({
      dragEl: i,
      putSortable: n
    }));
  }
};
function mn() {
}
mn.prototype = {
  startIndex: null,
  dragStart: function(e) {
    var r2 = e.oldDraggableIndex;
    this.startIndex = r2;
  },
  onSpill: function(e) {
    var r2 = e.dragEl, n = e.putSortable;
    this.sortable.captureAnimationState(), n && n.captureAnimationState();
    var i = Ye(this.sortable.el, this.startIndex, this.options);
    i ? this.sortable.el.insertBefore(r2, i) : this.sortable.el.appendChild(r2), this.sortable.animateAll(), n && n.animateAll();
  },
  drop: Ki
};
$e(mn, {
  pluginName: "revertOnSpill"
});
function gn() {
}
gn.prototype = {
  onSpill: function(e) {
    var r2 = e.dragEl, n = e.putSortable, i = n || this.sortable;
    i.captureAnimationState(), r2.parentNode && r2.parentNode.removeChild(r2), i.animateAll();
  },
  drop: Ki
};
$e(gn, {
  pluginName: "removeOnSpill"
});
$.mount(new ya());
$.mount(gn, mn);
const on = 0.4;
class wa {
  constructor() {
    this.handlers = [], this.toolbarConnected = (e) => {
      this.toolbar = e, this.reactionDisposer = oo(
        () => _.getToolbarExpandMode(),
        (r2, n) => {
          if (!this.toolbar)
            return;
          if (n) {
            const o = this.handlers.find((a2) => a2.getMode() === n);
            o && o.onDeactivate(this.toolbar);
          }
          const i = this.handlers.find((o) => o.getMode() === r2);
          i && (this.activeExpandModeHandler = i, this.activeExpandModeHandler.onActivate(this.toolbar));
        },
        { fireImmediately: true }
      );
    }, this.toolbarDisconnected = () => {
      this.activeExpandModeHandler && this.toolbar && this.activeExpandModeHandler.onDeactivate(this.toolbar), this.reactionDisposer && this.reactionDisposer(), this.toolbar = void 0;
    }, this.devToolsPopoverOpenClosedChanged = (e) => {
      this.activeExpandModeHandler && this.activeExpandModeHandler.devToolsPopoverOpenClosedChanged(e);
    }, this.handlers.push(new an()), this.handlers.push(new Ra()), this.handlers.push(new Ia()), this.handlers.push(new Sa()), this.handlers.push(new $a());
  }
}
class ht {
  constructor() {
    this.isDevToolsPopoverOpen = false;
  }
  devToolsPopoverOpenClosedChanged(e) {
    this.isDevToolsPopoverOpen = e;
  }
  getIdleWidth(e) {
    const r2 = e.radioGroup, n = Number.parseFloat(getComputedStyle(document.documentElement).fontSize), i = Number.parseFloat(getComputedStyle(r2).getPropertyValue("--copilot-size-md")) * n;
    return n * 0.125 * 2 + i;
  }
  shrink() {
    this.toolbar && (this.isDevToolsPopoverOpen || (this.updateToolbarOpacity(true), this.toolbar.setPlayModeIconProgress(0), this.toolbar.radioGroup.style.width = `${this.getIdleWidth(this.toolbar)}px`, this.toolbar.updateToolbarTotalWidth(), this.toolbar.removeAttribute("modes-expanded")));
  }
  updateToolbarOpacity(e) {
    this.toolbar && (e ? this.toolbar.style.opacity = `${on}` : this.toolbar.style.opacity = "1");
  }
}
const Lt = class Lt2 extends ht {
  constructor() {
    super(...arguments), this.lastDocumentMouseClientX = 0, this.lastDocumentMouseClientY = 0, this.ticking = false, this.handlePointerProximity = (e) => {
      this.toolbar && (this.lastDocumentMouseClientX = e.clientX, this.lastDocumentMouseClientY = e.clientY, this.ticking || (requestAnimationFrame(() => {
        const r2 = this.toolbar;
        if (r2) {
          if (r2.isDragging || r2.matches(":hover") || r2.matches(":focus-within") || this.isDevToolsPopoverOpen) {
            r2.expandRadioButtons(), this.ticking = false;
            return;
          }
          if (f.activeMode !== "play") {
            r2.expandRadioButtons(), this.ticking = false;
            return;
          }
          this.updateRadioButtonExpandAndStylingByPointerLocation(e.clientX, e.clientY), this.ticking = false;
        }
      }), this.ticking = true));
    }, this.updateRadioButtonExpandAndStylingByPointerLocation = (e, r2) => {
      if (!this.toolbar)
        return;
      if (f.activeMode !== "play" && !this.toolbar.hasAttribute("modes-expanded")) {
        this.toolbar.expandRadioButtons();
        return;
      }
      const n = this.toolbar.radioGroup, i = n.style.width, o = this.toolbar.getBoundingClientRect(), a2 = Math.max(o.left - e, 0, e - o.right), d = Math.max(o.top - r2, 0, r2 - o.bottom), c = Math.hypot(a2, d), s = Math.max(0, 1 - c / Lt2.PROXIMITY_RADIUS), l = Number.parseFloat(getComputedStyle(n).getPropertyValue("--copilot-toolbar-mode-width")), u = this.getIdleWidth(this.toolbar), h = on + (1 - on) * s;
      this.toolbar.style.opacity = h.toFixed(2), this.toolbar.setPlayModeIconProgress(s);
      const p = u + (l - u) * s;
      n.style.width = `${p.toFixed(2)}px`, i !== n.style.width && this.toolbar.updateToolbarTotalWidth(), this.toolbar.toggleAttribute("modes-expanded", p === l);
    };
  }
  onActivate(e) {
    this.toolbar = e, this.activeModeReactionDisposer = oo(
      () => f.activeMode,
      () => {
        f.activeMode !== "play" && this.toolbar ? (this.updateToolbarOpacity(false), this.toolbar.expandRadioButtons()) : this.updateRadioButtonExpandAndStylingByPointerLocation(
          this.lastDocumentMouseClientX,
          this.lastDocumentMouseClientY
        );
      },
      { fireImmediately: true }
    ), document.addEventListener("mousemove", this.handlePointerProximity);
  }
  getMode() {
    return "proximity";
  }
  onDeactivate(e) {
    document.removeEventListener("mousemove", this.handlePointerProximity), this.activeModeReactionDisposer && this.activeModeReactionDisposer();
  }
  devToolsPopoverOpenClosedChanged(e) {
    super.devToolsPopoverOpenClosedChanged(e), this.isDevToolsPopoverOpen || this.updateRadioButtonExpandAndStylingByPointerLocation(
      this.lastDocumentMouseClientX,
      this.lastDocumentMouseClientY
    );
  }
};
Lt.PROXIMITY_RADIUS = 180;
let an = Lt;
class Ra extends ht {
  constructor() {
    super(...arguments), this.mouseLeft = false, this.handleMouseOverEvent = (e) => {
      this.toolbar && (this.mouseLeft = false, this.toolbar.expandRadioButtons(), this.toolbar.updateToolbarTotalWidth());
    }, this.handleMouseLeaveEvent = (e) => {
      this.mouseLeft = true, f.activeMode === "play" && this.shrink();
    };
  }
  getMode() {
    return "hover";
  }
  onActivate(e) {
    this.toolbar = e, e.addEventListener("mouseover", this.handleMouseOverEvent), e.addEventListener("mouseleave", this.handleMouseLeaveEvent), this.activeModeReactionDisposer = oo(
      () => f.activeMode,
      () => {
        this.updateByCopilotActiveMode();
      },
      { fireImmediately: true }
    );
  }
  updateByCopilotActiveMode() {
    f.activeMode === "play" ? this.shrink() : this.toolbar?.expandRadioButtons();
  }
  onDeactivate(e) {
    this.toolbar = e, e.removeEventListener("mouseover", this.handleMouseOverEvent), e.removeEventListener("mouseleave", this.handleMouseLeaveEvent);
  }
  devToolsPopoverOpenClosedChanged(e) {
    super.devToolsPopoverOpenClosedChanged(e), this.mouseLeft && this.shrink();
  }
}
class Ia extends ht {
  constructor() {
    super(...arguments), this.onPlayClickAction = "expand", this.handleClick = (e) => {
      if (f.activeMode === "play" && e.target && e.target instanceof HTMLElement) {
        const n = e.target.closest("vaadin-radio-button");
        n?.dataset.mode && (n.dataset.mode === "play" ? this.onPlayClickAction === "expand" ? (this.toolbar?.expandRadioButtons(), this.onPlayClickAction = "collapse") : (this.shrink(), this.onPlayClickAction = "expand") : (this.toolbar?.expandRadioButtons(), this.onPlayClickAction = "collapse"));
      }
    };
  }
  getMode() {
    return "click";
  }
  onActivate(e) {
    this.toolbar = e, e.addEventListener("click", this.handleClick), requestAnimationFrame(() => {
      this.updateByCopilotActiveMode();
    }), this.activeModeReactionDisposer = oo(
      () => f.activeMode,
      () => {
        this.updateByCopilotActiveMode();
      },
      { fireImmediately: true }
    );
  }
  onDeactivate(e) {
    e.removeEventListener("click", this.handleClick), this.toolbar = void 0, this.activeModeReactionDisposer && this.activeModeReactionDisposer();
  }
  updateByCopilotActiveMode() {
    f.activeMode === "play" ? (this.shrink(), this.onPlayClickAction = "expand") : this.toolbar?.expandRadioButtons();
  }
  devToolsPopoverOpenClosedChanged(e) {
    super.devToolsPopoverOpenClosedChanged(e), this.updateToolbarOpacity(!e);
  }
}
class Sa extends ht {
  getMode() {
    return "always";
  }
  onActivate(e) {
    this.toolbar = e, e.expandRadioButtons();
  }
  onDeactivate(e) {
  }
}
class $a extends ht {
  constructor() {
    super(...arguments), this.handleMouseOverListener = (e) => {
      this.toolbar && this.updateToolbarOpacity(false);
    }, this.handleMouseLeaveListener = (e) => {
      this.toolbar && this.updateToolbarOpacity(true);
    };
  }
  getMode() {
    return "never";
  }
  onActivate(e) {
    this.toolbar = e, f.setActiveMode("play", true), e.addEventListener("mouseover", this.handleMouseOverListener), e.addEventListener("mouseleave", this.handleMouseLeaveListener), this.shrink();
  }
  onDeactivate(e) {
    this.toolbar && (e.removeEventListener("mouseover", this.handleMouseOverListener), e.removeEventListener("mouseleave", this.handleMouseLeaveListener));
  }
}
var Ta = Object.defineProperty, xa = Object.getOwnPropertyDescriptor, qe = (t, e, r2, n) => {
  for (var i = n > 1 ? void 0 : n ? xa(e, r2) : e, o = t.length - 1, a2; o >= 0; o--)
    (a2 = t[o]) && (i = (n ? a2(e, r2, i) : a2(i)) || i);
  return n && i && Ta(e, r2, i), i;
};
let ie = class extends dc {
  constructor() {
    super(...arguments), this.sortableInitialized = false, this.modeRadioButtonItems = [], this.devToolsDataLoading = false, this.devToolsDataLoaded = false, this.isDragging = false, this.dragPreparing = false, this.dragStartX = 0, this.dragStartY = 0, this.toolbarStartRight = 0, this.toolbarStartTop = 0, this.wasDraggedInLastInteraction = false, this.dragThreshold = 5, this.expandModeHandler = new wa(), this.transitionStart = (t) => {
      t.propertyName === "width" && this.setAttribute(ie.TRANSITION_STATUS_ATTR_KEY, "started");
    }, this.transitionEnd = (t) => {
      t.propertyName === "width" && (this.setAttribute(ie.TRANSITION_STATUS_ATTR_KEY, "ended"), this.constrainToViewport());
    }, this.handleMouseDown = (t) => {
      if (t.button !== 0)
        return;
      const e = this.querySelector("#devtools-button");
      if (!e || !(t.target instanceof Node) || !e.contains(t.target))
        return;
      this.dragPreparing = true, this.dragStartX = t.clientX, this.dragStartY = t.clientY;
      const r2 = this.getBoundingClientRect();
      this.toolbarStartRight = window.innerWidth - r2.right, this.toolbarStartTop = r2.top, document.addEventListener("mousemove", this.handleMouseMove), document.addEventListener("mouseup", this.handleMouseUp);
    }, this.handleMouseMove = (t) => {
      if (!this.dragPreparing && !this.isDragging)
        return;
      const e = t.clientX - this.dragStartX, r2 = t.clientY - this.dragStartY, n = Math.sqrt(e * e + r2 * r2);
      if (this.dragPreparing && n > this.dragThreshold && (this.isDragging = true, this.dragPreparing = false, this.style.transition = "none"), this.isDragging) {
        let i = this.toolbarStartRight - e, o = this.toolbarStartTop + r2;
        const a2 = this.getBoundingClientRect(), d = a2.width, c = a2.height;
        i = Math.max(0, i), window.innerWidth - i - d < 0 && (i = window.innerWidth - d), o = Math.max(0, o);
        const l = window.innerHeight - c;
        o = Math.min(o, l), this.style.right = `${i}px`, this.style.top = `${o}px`, this.style.bottom = "auto", this.style.left = "auto";
      }
    }, this.handleMouseUp = () => {
      const t = this.isDragging;
      if (this.isDragging = false, this.dragPreparing = false, this.wasDraggedInLastInteraction = t, t) {
        this.style.transition = "";
        const e = this.getBoundingClientRect(), r2 = window.innerWidth - e.right, n = e.top;
        O.saveToolbarPosition(r2, n);
      }
      document.removeEventListener("mousemove", this.handleMouseMove), document.removeEventListener("mouseup", this.handleMouseUp), setTimeout(() => {
        this.wasDraggedInLastInteraction = false;
      }, 10);
    }, this.handleClick = (t) => {
      this.wasDraggedInLastInteraction && (t.stopPropagation(), t.preventDefault());
    }, this.handleWindowResize = () => {
      this.constrainToViewport(true);
    }, this.expandRadioButtons = () => {
      if (this.hasAttribute("modes-expanded"))
        return;
      const t = this.radioGroup.style.width;
      this.style.opacity = "1", this.setPlayModeIconProgress(1);
      const e = Number.parseFloat(
        getComputedStyle(this.radioGroup).getPropertyValue("--copilot-toolbar-mode-width")
      );
      this.radioGroup.style.width = `${e.toFixed(2)}px`, t !== this.radioGroup.style.width && this.updateToolbarTotalWidth(), this.toggleAttribute("modes-expanded", true);
    }, this.onSortEndEvent = (t, e, r2) => {
      if (!(t.item instanceof HTMLElement))
        return;
      const n = t.item.dataset.panelTag;
      if (!n || !Oe$1.getPanelByTag(n))
        return;
      const o = this.getOrderByTag(e);
      Oe$1.reOrderPanels(o, r2);
    };
  }
  connectedCallback() {
    super.connectedCallback(), this.popover = "manual", this.setPlayModeIconProgress(1), this.modeRadioButtonItems = Object.entries(ji$1).map(([e, r2]) => ({
      value: e,
      label: r2.label,
      order: r2.toolbarOrder,
      icon: r2.toolbarIcon
    })), this.modeRadioButtonItems.sort((e, r2) => e.order - r2.order), this.classList.add(
      "backdrop-blur-sm",
      "bg-gray-1",
      "dark:bg-gray-5",
      "border-0",
      "bottom-4",
      "duration-300",
      "end-4",
      "fixed",
      "flex",
      "justify-end",
      "m-0",
      "overflow-hidden",
      "p-1",
      "pointer-events-auto",
      "rounded-toolbar",
      "shadow-xl",
      "start-auto",
      "top-auto",
      "transition-all",
      "z-100"
    );
    const t = O.getToolbarPosition();
    if (t) {
      const e = t.right, r2 = t.top;
      this.style.right = `${e}px`, this.style.top = `${r2}px`, this.style.bottom = "auto", this.style.left = "auto";
    }
    this.addEventListener("transitionstart", this.transitionStart), this.addEventListener("transitionend", this.transitionEnd), this.addEventListener("mousedown", this.handleMouseDown), this.addEventListener("click", this.handleClick, true), window.addEventListener("resize", this.handleWindowResize), this.reaction(
      () => f.userInfo,
      () => {
        f.userInfo && this.devToolsPopover.requestContentUpdate();
      }
    ), this.reaction(
      () => _.getSelectedSize(),
      () => {
        requestAnimationFrame(() => {
          const e = this.radioGroup;
          if (this.hasAttribute("modes-expanded")) {
            const r2 = Number.parseFloat(
              getComputedStyle(e).getPropertyValue("--copilot-toolbar-mode-width")
            );
            e.style.width = `${r2.toFixed(2)}px`;
          } else {
            const r2 = Number.parseFloat(getComputedStyle(document.documentElement).fontSize), n = Number.parseFloat(getComputedStyle(e).getPropertyValue("--copilot-size-md")) * r2;
            e.style.width = `${(r2 * 0.125 * 2 + n).toFixed(2)}px`;
          }
          this.updateToolbarTotalWidth();
        });
      },
      { fireImmediately: true }
    ), this.reaction(
      () => f.activeMode,
      () => {
        this.queryModeRadioButtons().forEach((r2) => {
          const n = r2;
          n._setFocused && n._setFocused(false);
        });
        const e = this.queryRadioButtonForMode(f.activeMode);
        e?._setFocused && e._setFocused(true);
      }
    );
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.removeEventListener("transitionstart", this.transitionStart), this.removeEventListener("transitionend", this.transitionEnd), this.removeEventListener("mousedown", this.handleMouseDown), this.removeEventListener("click", this.handleClick, true), document.removeEventListener("mousemove", this.handleMouseMove), document.removeEventListener("mouseup", this.handleMouseUp), window.removeEventListener("resize", this.handleWindowResize), this.expandModeHandler.toolbarDisconnected();
  }
  constrainToViewport(t = false) {
    if (!this.style.right || this.style.right === "")
      return;
    const e = this.getBoundingClientRect(), r2 = e.width, n = e.height;
    if (r2 === 0 || n === 0)
      return;
    let i = parseFloat(this.style.right), o = parseFloat(this.style.top || "0");
    const a2 = i, d = o;
    i = Math.max(0, i), window.innerWidth - i - r2 < 0 && (i = window.innerWidth - r2), o = Math.max(0, o);
    const s = window.innerHeight - n;
    o = Math.min(o, s), this.style.right = `${i}px`, this.style.top = `${o}px`, t && (i !== a2 || o !== d) && O.saveToolbarPosition(i, o);
  }
  createRenderRoot() {
    return this;
  }
  firstUpdated(t) {
    super.firstUpdated(t), this.expandModeHandler.toolbarConnected(this);
  }
  updated(t) {
    super.updated(t), this.updateToolbarTotalWidth(), this.modePanelIconContainer !== null && !this.sortableInitialized && (new $(this.modePanelIconContainer, {
      animation: 150,
      draggable: ".panel-icon-button",
      onEnd: (e) => this.onSortEndEvent(e, this.modePanelIconContainer, f.activeMode)
    }), this.sortableInitialized = true);
  }
  updateToolbarTotalWidth() {
    this.classList.add("transition-none");
    const e = [...this.querySelectorAll(
      "#mode-panel-icon-container, #mode-icon-container, #common-mode-panel-icon-container"
    )].reduce((r2, n) => r2 + n.offsetWidth, 0);
    this.style.width = `${e}px`, this.classList.remove("transition-none");
  }
  setPlayModeIconProgress(t) {
    const e = Math.min(1, Math.max(0, t));
    this.style.setProperty(ie.PLAY_MODE_ICON_PROGRESS_CSS_VAR, e.toFixed(2));
  }
  render() {
    const t = Oe$1.panels;
    return ce`
      <style>
        .toolbar-play-mode-icon-stack {
          display: grid;
          place-items: center;
        }

        .toolbar-play-mode-icon-stack > vaadin-icon {
          grid-area: 1 / 1;
          transition: opacity 300ms ease;
        }

        .toolbar-play-mode-icon--play {
          opacity: var(${ie.PLAY_MODE_ICON_PROGRESS_CSS_VAR}, 1);
        }

        .toolbar-play-mode-icon--vaadin {
          opacity: calc(1 - var(${ie.PLAY_MODE_ICON_PROGRESS_CSS_VAR}, 1));
        }
      </style>
      <div class="flex pe-1" id="mode-panel-icon-container" ?hidden="${f.activeMode === "play"}">
        ${f.activeMode ? this.renderPanelList(t, f.activeMode) : S$1}
      </div>
      <div class="flex pe-1" id="mode-icon-container">${this.renderCopilotModeButtons()}</div>
      <div class="flex" id="common-mode-panel-icon-container">
        <vaadin-button
          aria-label="DevTools"
          class="max-w-6 min-w-0 relative"
          id="devtools-button"
          theme="icon tertiary toolbar">
          <vaadin-icon .svg="${r.moreVert}"></vaadin-icon>
          <vaadin-tooltip slot="tooltip" text="Open menu"></vaadin-tooltip>
        </vaadin-button>
        <vaadin-popover
          @opened-changed="${(e) => {
      this.expandModeHandler.devToolsPopoverOpenClosedChanged(e.detail.value), e.detail.value && !this.devToolsDataLoaded && (this.devToolsDataLoading = true, __vitePreload(() => import("./copilot-devtools-Cpd_CV50-Cd_k_uBx.js"), true ? __vite__mapDeps([0,1,2,3,4]) : void 0, import.meta.url).then(() => {
        pc(), Oe$1.restorePanelsFromStorage(), uc(), Wi$1(), this.devToolsDataLoading = false, this.devToolsDataLoaded = true;
      }));
    }}"
          position="top"
          for="devtools-button"
          id="devtools-popover"
          modal
          theme="arrow no-padding"
          width="360">
          <!--          TODO move loader here so it should not wait for devtools to be imported -->
          <copilot-devtools .loading="${this.devToolsDataLoading}"></copilot-devtools>
        </vaadin-popover>
      </div>
    `;
  }
  renderPanelList(t, e) {
    return ce`
      ${H$1(
      t.filter((r2) => r2.experimental?.enabled() !== false).filter((r2) => r2.toolbarOptions?.allowedModesWithOrder?.[e] !== void 0).sort((r2, n) => r2.toolbarOptions.allowedModesWithOrder[e] - n.toolbarOptions.allowedModesWithOrder[e]),
      (r2) => r2.tag,
      (r2) => this.renderPanelIcon(r2)
    )}
    `;
  }
  renderCopilotModeButtons() {
    return ce`
      <vaadin-radio-group
        accessible-name="Mode"
        theme="toolbar"
        .value="${f.activeMode}"
        @change="${(t) => {
      const e = t.target.value;
      f.setActiveMode(e, true), ud();
    }}">
        ${H$1(
      this.modeRadioButtonItems,
      (t) => t.value,
      (t) => ce`
            <vaadin-radio-button data-mode="${t.value}" .value="${t.value}" .id="${t.value}-mode-radio-btn">
              <label slot="label">${this.renderModeButtonIcon(t)}</label>
            </vaadin-radio-button>
          `
    )}
      </vaadin-radio-group>
      ${H$1(
      this.modeRadioButtonItems,
      (t) => t.value,
      (t) => ce`
          <vaadin-tooltip for="${t.value}-mode-radio-btn" text="${t.label} Mode"></vaadin-tooltip>
        `
    )}
    `;
  }
  renderModeButtonIcon(t) {
    return t.value !== "play" ? ce`<vaadin-icon .svg="${r[t.icon]}"></vaadin-icon>` : ce`
      <span aria-hidden="true" class="toolbar-play-mode-icon-stack">
        <vaadin-icon class="toolbar-play-mode-icon--play" .svg="${r[t.icon]}"></vaadin-icon>
        <vaadin-icon class="toolbar-play-mode-icon--vaadin" .svg="${r.vaadin}"></vaadin-icon>
      </span>
    `;
  }
  renderPanelIcon(t) {
    const e = this.getButtonId(t);
    return ce`
      <vaadin-button
        aria-expanded="${Oe$1.isOpenedPanel(t.tag)}"
        aria-label="${t.header}"
        class="panel-icon-button relative"
        data-panel-tag="${t.tag}"
        id="${e}"
        theme="icon tertiary toolbar"
        @click=${(r2) => {
      if (Oe$1.isOpenedPanel(t.tag)) {
        const a2 = this.getRootNode().querySelector("copilot-panel-manager")?.getDialogByPanelTag(t.tag)?.querySelector(t.tag);
        a2?.requestClose ? a2.requestClose(() => Oe$1.closePanel(t.tag)) : Oe$1.closePanel(t.tag);
      } else
        Oe$1.attentionRequiredPanelTag === t.tag && Oe$1.clearAttention(), Oe$1.openPanel(t.tag);
    }}>
        <vaadin-icon .svg="${r[t.toolbarOptions.iconKey]}"></vaadin-icon>
        <vaadin-tooltip
          slot="tooltip"
          text="${t.header}${Oe$1.attentionRequiredPanelTag === t.tag ? " – Attention Required" : ""}"></vaadin-tooltip>
        ${Oe$1.attentionRequiredPanelTag === t.tag ? ce`<span
                aria-hidden="true"
                class="absolute animate-ping bg-amber-11 end-0.5 rounded-full size-2 top-0.5"></span>
              <span
                aria-hidden="true"
                class="absolute bg-amber-11 border border-gray-1 dark:border-gray-5 box-border end-0.5 rounded-full size-2 top-0.5"></span>` : S$1}
      </vaadin-button>
    `;
  }
  getButtonId(t) {
    return `${t.tag}-toolbar-btn`;
  }
  getOrderByTag(t) {
    const e = /* @__PURE__ */ new Map();
    return [...t.querySelectorAll("[data-panel-tag]")].forEach((r2, n) => {
      e.set(r2.dataset.panelTag, n);
    }), e;
  }
  queryModeRadioButtons() {
    return Array.from(this.querySelectorAll("vaadin-radio-button"));
  }
  queryRadioButtonForMode(t) {
    return this.querySelector(`vaadin-radio-button#${t}-mode-radio-btn`);
  }
};
ie.TRANSITION_STATUS_ATTR_KEY = "transition-status";
ie.PLAY_MODE_ICON_PROGRESS_CSS_VAR = "--play-mode-icon-progress";
qe([
  po("#mode-panel-icon-container")
], ie.prototype, "modePanelIconContainer", 2);
qe([
  po("#devtools-popover")
], ie.prototype, "devToolsPopover", 2);
qe([
  po("vaadin-radio-group")
], ie.prototype, "radioGroup", 2);
qe([
  a()
], ie.prototype, "modeRadioButtonItems", 2);
qe([
  a()
], ie.prototype, "devToolsDataLoading", 2);
qe([
  a()
], ie.prototype, "devToolsDataLoaded", 2);
ie = qe([
  Oi$1("copilot-toolbar")
], ie);
function Ca() {
  const t = [];
  f.userInfo?.vaadiner && t.push({
    name: "Vaadin Employee",
    value: "true",
    booleanInfo: { ariaLabel: "Yes" }
  });
  const e = [
    ...kr$1.serverVersions.map((r2) => ({ name: r2.name, value: r2.version })),
    ...t,
    ...kr$1.clientVersions.map((r2) => ({ name: r2.name, value: r2.version }))
  ];
  return e.forEach((r2) => {
    r2.name === "Frontend Hotswap" && (r2.value === "true" ? r2.booleanInfo = { ariaLabel: "Enabled", text: "Vite" } : r2.value === "false" && (r2.booleanInfo = { ariaLabel: "Disabled", text: "Pre-Built Bundle" }));
  }), kr$1.springSecurityEnabled && e.push({ name: "Spring Security", value: "true", booleanInfo: { ariaLabel: "Enabled" } }), kr$1.springJpaDataEnabled && e.push({ name: "Spring Data JPA", value: "true", booleanInfo: { ariaLabel: "Enabled" } }), e.push(...Da()), Oa(e), e;
}
function Oa(t) {
  for (const e of t)
    e.value === "true" ? (e.value = true, e.booleanInfo ? e.booleanInfo.ariaLabel || (e.booleanInfo.ariaLabel = "Enabled") : e.booleanInfo = { ariaLabel: "Enabled" }) : e.value === "false" && (e.value = false, e.booleanInfo ? e.booleanInfo.ariaLabel || (e.booleanInfo.ariaLabel = "Disabled") : e.booleanInfo = { ariaLabel: "Disabled" });
}
function Da() {
  const t = [], e = Ui$1(), r2 = Qi(f.idePluginState), n = eo(e);
  return t.push({
    name: "Java Hotswap",
    value: e === "success",
    booleanInfo: {
      ariaLabel: e === "success" ? "Enabled" : "Disabled",
      text: n
    }
  }), $t() !== "unsupported" && t.push({
    name: "IDE Plugin",
    value: $t() === "success",
    booleanInfo: {
      ariaLabel: $t() === "success" ? "Installed" : "Not Installed",
      text: r2
    }
  }), t;
}
function Aa(t) {
  const e = f.projectInfoEntries;
  if (!e)
    throw new Error("Unable to load project info entries");
  const i = e.map((o) => ({ key: o.name, value: o.value })).filter((o) => o.key !== "Live reload").filter((o) => !o.key.startsWith("Vaadin Emplo")).filter((o) => o.key !== "Development Workflow").map((o) => {
    const { key: a2 } = o;
    let { value: d } = o;
    if (a2 === "IDE Plugin")
      d = Qi(f.idePluginState) ?? "false";
    else if (a2 === "Java Hotswap") {
      const c = kr$1.jdkInfo?.jrebel, s = Ui$1();
      c && s === "success" ? d = "JRebel is in use" : d = eo(s);
    }
    return a2 === "Frontend Hotswap" && (d === "true" || d === true ? d = "Vite" : (d === "false" || d === false) && (d = "Pre-Built Bundle")), `${a2}: ${d}`;
  }).join(`
`);
  return t && Mi$1({
    type: Ze$1.INFORMATION,
    message: "Environment information copied to clipboard"
  }), i.trim();
}
function $t() {
  return f.idePluginState !== void 0 && !f.idePluginState.active ? "warning" : "success";
}
function Qi(t) {
  if ($t() !== "success")
    return "Not installed";
  if (t?.version) {
    let e = null;
    return t?.ide && (t?.ide === "intellij" ? e = "IntelliJ" : t?.ide === "vscode" ? e = "VS Code" : t?.ide === "eclipse" && (e = "Eclipse")), e ? `${t?.version} ${e}` : t?.version;
  }
  return "Not installed";
}
function eo(t) {
  return t === "success" ? "Java Hotswap is enabled" : t === "error" ? "Hotswap is partially enabled" : "Hotswap is disabled";
}
oo(
  () => [
    kr$1.serverVersions,
    kr$1.clientVersions,
    f.userInfo,
    kr$1.springSecurityEnabled,
    kr$1.springJpaDataEnabled,
    kr$1.jdkInfo,
    f.idePluginState
  ],
  () => {
    const t = Ca();
    f.setProjectInfoEntries(t);
  },
  { fireImmediately: true }
);
y.on("system-info-with-callback", (t) => {
  t.detail.callback(Aa(t.detail.notify));
});
var _a = (t, e, r2, n) => {
  for (var i = e, o = t.length - 1, a2; o >= 0; o--)
    (a2 = t[o]) && (i = a2(i) || i);
  return i;
};
let Hn = class extends dc {
  constructor() {
    super(...arguments), this.renderDialog = () => ce`
    <p class="text-xs text-secondary mb-3 mt-0">
      Sign in with your Vaadin account to access all Copilot features, including:
    </p>
    <ul class="gap-3 grid grid-cols-3 list-none m-0 pb-3 ps-0 w-4xl">
      <li class="bg-violet-3 dark:bg-violet-5 flex flex-col gap-6 pb-4 pt-6 px-5 rounded-md">
        <svg
          class="max-h-10"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 960 641.453"
          role="img"
          artist="Katerina Limpitsouni"
          source="https://undraw.co/">
          <g transform="translate(-841.956 -428.663)">
            <rect width="596" height="596" transform="translate(1205.956 474.116)" fill="#fff" />
            <path
              d="M53.661,0H89.435V1.491H53.661Zm53.661,0H143.1V1.491H107.322Zm53.661,0h35.774V1.491H160.983Zm53.661,0h35.774V1.491H214.644ZM268.3,0h35.774V1.491H268.3Zm53.661,0H357.74V1.491H321.966Zm53.661,0H411.4V1.491H375.627Zm53.661,0h35.774V1.491H429.287Zm53.661,0h35.774V1.491H482.948Zm53.661,0h35.774V1.491H536.609ZM590.27,0h5.962V29.812h-1.491V1.491H590.27Zm4.472,47.7h1.491V83.473h-1.491Zm0,53.661h1.491v35.774h-1.491Zm0,53.661h1.491v35.774h-1.491Zm0,53.661h1.491v35.774h-1.491Zm0,53.661h1.491v35.774h-1.491Zm0,53.661h1.491v35.774h-1.491Zm0,53.661h1.491v35.774h-1.491Zm0,53.661h1.491V459.1h-1.491Zm0,53.661h1.491V512.76h-1.491Zm0,53.661h1.491v35.774h-1.491Zm0,53.661h1.491v11.925H572.383v-1.491h22.359Zm-76.02,10.434H554.5v1.491H518.722Zm-53.661,0h35.774v1.491H465.061Zm-53.661,0h35.774v1.491H411.4Zm-53.661,0h35.774v1.491H357.74Zm-53.661,0h35.774v1.491H304.079Zm-53.661,0h35.774v1.491H250.418Zm-53.661,0h35.774v1.491H196.757Zm-53.661,0H178.87v1.491H143.1Zm-53.661,0h35.774v1.491H89.435Zm-53.661,0H71.548v1.491H35.774ZM0,578.346H1.491v16.4h16.4v1.491H0Zm0-53.661H1.491v35.774H0Zm0-53.661H1.491V506.8H0Zm0-53.661H1.491v35.774H0ZM0,363.7H1.491v35.774H0Zm0-53.661H1.491v35.774H0ZM0,256.38H1.491v35.774H0Zm0-53.661H1.491v35.774H0Zm0-53.661H1.491v35.774H0ZM0,95.4H1.491v35.774H0ZM0,41.736H1.491V77.51H0ZM0,0H35.774V1.491H1.491V23.849H0Z"
              transform="translate(1205.724 473.883)"
              fill="#707070" />
            <path
              d="M39.774,4a4.472,4.472,0,0,1,4.472,4.472V35.3h26.83a4.472,4.472,0,0,1,0,8.943H44.246v26.83a4.472,4.472,0,0,1-8.943,0V44.246H8.472a4.472,4.472,0,1,1,0-8.943H35.3V8.472A4.472,4.472,0,0,1,39.774,4"
              transform="translate(1464.066 732.225)"
              fill="var(--violet-9)" />
            <path
              d="M63.7,546.533l24.915,3.661,26.98-74.678-29.37-15.885Z"
              transform="translate(784.499 495.814)"
              fill="#9f616a" />
            <path
              d="M151.118,536.837h0a21.623,21.623,0,0,1,.149,7.217h0a8.547,8.547,0,0,1-9.7,7.213L64.407,539.922a5.831,5.831,0,0,1-4.919-6.617l.473-3.212s-2.4-10.216,7.211-20.962c0,0,10.807,12.45,27.547,0l5.554-7.366,25.3,25.874,16.955,4.664c3.71,1.021,7.138.976,8.6,4.534Z"
              transform="translate(782.531 517.496)"
              fill="#090814" />
            <path
              d="M94.086,556.285H119.4l12.039-97.633H94.08Z"
              transform="translate(949.701 497.399)"
              fill="#9f616a" />
            <path
              d="M182.668,533.89h0a21.729,21.729,0,0,1,1.2,7.155h0a8.59,8.59,0,0,1-8.59,8.59H96.9a5.861,5.861,0,0,1-5.861-5.861v-3.263s-3.876-9.808,4.105-21.9c0,0,9.921,9.465,24.744-5.366l4.372-7.921L155.9,528.473l17.541,2.158c3.838.473,7.24-.073,9.215,3.251Z"
              transform="translate(947.837 519.221)"
              fill="#090814" />
            <path
              d="M16.9,90.494V65.107a35.093,35.093,0,1,1,35.245.667c1.589,14.833.341,33.245.341,33.245Z"
              transform="translate(965.657 439.744)"
              fill="#9f616a" />
            <path
              d="M409.292,442.046s-7.784,93.583-9.455,113.637a142.614,142.614,0,0,1-8.355,36.764,34.568,34.568,0,0,0-3.342,13.369s-21.4,35.947-34.86,62.255a188.838,188.838,0,0,0-17.3,50.948s33.139,6.112,38.159,4.442,11.477-38.08,67.485-129.342l40.107-83.556s23.4,75.2,28.409,83.556c0,0,8.748,123.462,12.09,131.818s45.378-2.476,45.378-2.476l-7.335-126-15.04-142.045-76.871-23.4Z"
              transform="translate(516.199 287.857)"
              fill="#090814" />
            <path
              d="M24.592,220.713s3.344-11.7,0-13.371,8.357-5.009,5.015-13.367S36.291,140.5,36.291,140.5L33.733,97.013l-2.814,4.221L0,98.73S8.358,61.97,10.028,50.269c1.339-9.382,14.488-18.759,19.655-22.113l-.076-1.293,44.1-11.7c1.626.1,2.921-3.739,4.166-7.583S80.308-.092,81.73,0c13.459.867,22.424,1.435,28.4,1.808,11.9.741,13.061,16.457,13.061,16.457l41.778,25.31-.124.534A81.393,81.393,0,0,1,186.69,85.357c5.012,26.74,0,25.085,0,25.085l-33.423,16.692-5.5-10.571-4.529,10.568c10.028,30.081,13.546,74.442,11.7,80.213l6.683,21.724a169.721,169.721,0,0,1-56.113,9.322C59.069,238.39,24.592,220.713,24.592,220.713Z"
              transform="translate(899.799 514.203)"
              fill="#e6e6e6" />
            <path
              d="M524.97,341.55s-15.04,63.5,3.342,63.5,61.831-71.858,61.831-71.858l-15.034-18.377-26.994,37.479-1.413-19.1Z"
              transform="translate(539.191 273.15)"
              fill="#9f616a" />
            <circle cx="14.632" cy="14.632" r="14.632" transform="translate(1110.694 579.842)" fill="#9f616a" />
            <path
              d="M382.97,332.549s-15.04,63.5,3.342,63.5,61.831-71.858,61.831-71.858l-15.034-18.377-14.5,20.123-12.5,17.352-1.413-19.1Z"
              transform="translate(521.368 272.02)"
              fill="#9f616a" />
            <circle cx="14.632" cy="14.632" r="14.632" transform="translate(950.873 569.712)" fill="#9f616a" />
            <path
              d="M23.849,0H350.985a23.849,23.849,0,0,1,23.849,23.849V186.995a23.849,23.849,0,0,1-23.849,23.849H23.849A23.849,23.849,0,0,1,0,186.995V23.849A23.849,23.849,0,0,1,23.849,0Z"
              transform="matrix(0.998, 0.07, -0.07, 0.998, 865.395, 576.763)"
              fill="var(--violet-9)" />
            <path
              d="M216.737,47.078l4.435,5.377,8.022-14.037s10.239.527,10.239-7.072,14.123-7.39,14.123-7.39,11.673-8.73,6.929-13.109S248.731,3.3,234.58,6.44c0,0-15.848-10.856-25.989-4.245a12.435,12.435,0,0,0-2.611,2.347s-29.128,14.662-20.786,40.2l13.847,26.323,3.142-5.954s-1.9-25.011,14.563-18.043Z"
              transform="translate(774.225 428.603)"
              fill="#090814" />
          </g>
        </svg>
        <div class="flex flex-col gap-0.5">
          <span class="font-bold">Drag and drop components</span>
          <span class="text-secondary text-xs"
            >Build layouts faster by dragging components directly onto the canvas</span
          >
        </div>
      </li>
      <li class="bg-blue-3 dark:bg-blue-5 flex flex-col gap-6 pb-4 pt-6 px-5 rounded-md">
        <svg
          class="max-h-10"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 710.40985 647.95797"
          role="img"
          artist="Katerina Limpitsouni"
          source="https://undraw.co/">
          <path
            d="M166.1564,117.90546c8.3487-46.78787,53.04582-77.94905,99.83369-69.60035,46.78787,8.3487,77.94937,53.04588,69.60067,99.83375-6.77085,37.94529-37.45011,65.60766-73.76176,70.25683l-35.69028,105.31194-71.07457-84.47181s22.13556-19.75542,36.43036-43.93366c-20.15394-19.25054-30.60088-47.90307-25.33811-77.3967Z"
            fill="#ed9da0" />
          <path
            d="M173.09718,214.78809s-113.68733,19.16988-128.68733,42.16988-31,56-31,56c0,0-43,214,25,244l274.68733-39.16988-33.68733-100.83012,34,101,79.53386-12.73159s-47.53386-235.26841-74.53386-251.26841c-27-16-60.75109-11.70056-60.75109-11.70056,0,0-53.74763,53.40351-83.99827-27.44796l-.5633-.02135Z"
            fill="var(--blue-9)" />
          <path
            d="M234.35198,83.56597s24.05787,7.39199,34.05787-4.60801c0,0,24,1,29,14s35,19,45,8c10-11,25-31,6-49,0,0-3-19-19-23l-9,8s-118.87599-55.90628-132.93799,1.04686c0,0-21.52687-4.05801-11.29444,8.94756,0,0-11.52977,13.36898-18.84417,38.72114-11.47969,39.78928,1.95017,82.60309,33.7639,109.11453l.00004.00003s-25.56332-67.10233-3.62533-47.46622,20.93799-25.3639,20.93799-25.3639c0,0,32.88426-19.78398,25.94213-38.39199Z"
            fill="#090814" />
          <path
            d="M695.55497,121.21685l-327.01201,27.71288c-6.91943.58639-12.30538,6.25775-12.53403,13.19822l-9.64485,292.76846c-.23689,7.19081,5.12962,13.33942,12.28642,14.07702l336.65687,34.69645c8.07792.83252,15.10249-5.50529,15.10249-13.62599V134.8661c0-8.02162-6.86192-14.32661-14.85488-13.64924Z"
            fill="#d6d6e3" />
          <polygon
            points="383.74945 177.01197 375.40985 437.24241 669.40985 463.95797 676.40985 156.95797 383.74945 177.01197"
            fill="#fff" />
          <path
            d="M398.944,210.64706l255.27397-14.34123c3.36201-.18888,6.19188,2.48647,6.19188,5.85378v50.364c0,3.15452-2.49595,5.74359-5.64835,5.85908l-255.27397,9.35261c-3.32.12164-6.07768-2.53686-6.07768-5.85908v-45.37537c0-3.11029,2.42876-5.67932,5.53415-5.85378Z"
            fill="#d6d6e3" />
          <path
            d="M578.40822,226.95801c-1.05908,0-1.94238-.83105-1.99609-1.90039-.05518-1.10254.79443-2.04199,1.89746-2.09668l60-3c1.11523-.05957,2.04248.79395,2.09766,1.89746.05518,1.10254-.79443,2.04199-1.89746,2.09668l-60,3c-.03418.00195-.06787.00293-.10156.00293Z"
            fill="#090814" />
          <path
            d="M548.40822,239.95801c-1.07373,0-1.96143-.85254-1.99756-1.93359-.03662-1.10352.82861-2.02832,1.93262-2.06543l90-2.99512c1.10303-.02344,2.02881.8291,2.06543,1.93262s-.82861,2.02832-1.93262,2.06543l-90,2.99512c-.02246.00098-.04492.00098-.06787.00098Z"
            fill="#090814" />
          <path
            d="M406.55761,241.5352l-7.5306,84.49779c-.33438,3.75189,2.56743,7.00734,6.33293,7.10472l102.89288,2.66102c3.45674.0894,6.38342-2.53245,6.67325-5.97817l7.57153-90.01708c.48254-5.73687-4.20762-10.5811-9.95709-10.28418l-98.8071,5.1028c-3.78001.19522-6.83981,3.14299-7.17581,6.9131Z"
            fill="#fff" />
          <path
            d="M513.04262,233.50635c1.54932,0,2.98352.63184,4.03845,1.7793,1.0531,1.14551,1.56104,2.63086,1.43054,4.18262l-7.57153,90.01709c-.10913,1.29883-1.21423,2.31592-2.51587,2.31592l-.06799-.00098-102.89307-2.66113c-.95117-.0249-1.54932-.54004-1.82104-.84473-.27197-.30518-.71533-.9585-.63086-1.90625l7.53064-84.49805c.15808-1.77441,1.6189-3.18164,3.39783-3.27344l98.80713-5.10254c.09924-.00488.19763-.00781.29578-.00781M513.04262,229.50635c-.1665,0-.33362.00439-.50208.01318l-98.80713,5.10254c-3.78003.19531-6.83984,3.14307-7.17578,6.91309l-7.53064,84.49805c-.33435,3.75146,2.5675,7.00732,6.33301,7.10449l102.89282,2.66113c.05713.00146.1145.00244.17139.00244,3.38184,0,6.2168-2.59229,6.50183-5.98047l7.57153-90.01709c.46838-5.56934-3.93774-10.29736-9.45496-10.29736h0Z"
            fill="#090814" />
          <polygon
            points="403.40985 313.95797 436.40985 272.95797 456.40985 297.95797 481.40985 277.95797 513.40985 317.95797 511.40985 332.95797 402.09718 328.78809 403.40985 313.95797"
            fill="#090814" />
          <path
            d="M554.40985,290.94489v60.53594c0,6.73742,5.46176,12.19917,12.19917,12.19917h77.75183c6.73742,0,12.19917-5.46176,12.19917-12.19917v-61.90072c0-6.82119-5.59314-12.31701-12.41327-12.19729l-77.75183,1.36478c-6.65293.11678-11.98507,5.54334-11.98507,12.19729Z"
            fill="#d6d6e3" />
          <path
            d="M615.41115,388.95801c-.02783,0-.05566-.00098-.08398-.00195l-104-4.28711c-1.10352-.04492-1.96143-.97656-1.91602-2.08008.0459-1.10449.97705-1.9541,2.08105-1.91602l104,4.28711c1.10352.04492,1.96143.97656,1.91602,2.08008-.04443,1.07617-.93066,1.91797-1.99707,1.91797Z"
            fill="#090814" />
          <path
            d="M638.41115,411.25879c-.0332,0-.06689-.00098-.10107-.00293l-127-6.33008c-1.10303-.05469-1.95312-.99316-1.89795-2.09668.05469-1.10352.97705-1.96191,2.09717-1.89746l127,6.33008c1.10303.05469,1.95312.99316,1.89795,2.09668-.05322,1.06934-.93701,1.90039-1.99609,1.90039Z"
            fill="#090814" />
          <path
            d="M621.41164,439.95801c-.04346,0-.08691-.00098-.13086-.00391l-124-8c-1.10205-.07129-1.93799-1.02246-1.86719-2.125.07129-1.10254,1.02686-1.92969,2.125-1.86719l124,8c1.10205.07129,1.93799,1.02246,1.86719,2.125-.06836,1.05859-.94824,1.87109-1.99414,1.87109Z"
            fill="#090814" />
          <circle cx="465.90985" cy="264.45797" r="8.5" fill="#090814" />
          <ellipse cx="396.40985" cy="187.95797" rx="3" ry="4" fill="#d6d6e3" />
          <ellipse cx="410.40985" cy="186.95797" rx="3" ry="4" fill="#d6d6e3" />
          <ellipse cx="422.40985" cy="185.95797" rx="3" ry="4" fill="#d6d6e3" />
          <path
            d="M678.81251,27c1.98352,0,3.59729,1.62109,3.59729,3.61377v63.37988c0,1.88428-1.41528,3.43115-3.29199,3.59814l-85.99927,7.66309c-.11133.01025-.22168.01514-.33118.01514-1.93237,0-3.54761-1.57666-3.60071-3.51416l-1.59314-58.15137c-.05005-1.82812,1.27612-3.40674,3.08521-3.67285l87.59277-12.8916c.1803-.02686.3623-.04004.54102-.04004M678.81251,23c-.37024,0-.74512.02686-1.12378.08252l-87.59241,12.8916c-3.81445.56104-6.60693,3.88574-6.50134,7.73975l1.59314,58.15137c.11389,4.15527,3.5249,7.40479,7.59924,7.40479.22705,0,.45557-.01025.68628-.03076l85.99915-7.66309c3.927-.3501,6.93701-3.64014,6.93701-7.58252V30.61377c0-4.2627-3.474-7.61377-7.59729-7.61377h0Z"
            fill="#d6d6e3" />
          <path
            d="M606.40724,61.95801c-.99756,0-1.86084-.74512-1.98291-1.76074-.13281-1.09668.64893-2.09277,1.74561-2.22461l58-7c1.09326-.13477,2.09326.64844,2.2251,1.74609.13281,1.09668-.64893,2.09277-1.74561,2.22461l-58,7c-.08154.00977-.16211.01465-.24219.01465Z"
            fill="#d6d6e3" />
          <path
            d="M606.40724,78.90039c-1.01904,0-1.89014-.77539-1.98877-1.81055-.10449-1.09961.70215-2.07617,1.80176-2.18066l52-4.94238c1.09717-.09863,2.07617.70215,2.18066,1.80176s-.70215,2.07617-1.80176,2.18066l-52,4.94238c-.06445.00586-.12842.00879-.19189.00879Z"
            fill="#d6d6e3" />
          <path
            d="M524.49989,4c1.98352,0,3.59729,1.62109,3.59729,3.61377v63.37988c0,1.88428-1.41528,3.43115-3.29199,3.59814l-85.99927,7.66309c-.11133.01025-.22168.01514-.33118.01514-1.93237,0-3.54761-1.57666-3.60071-3.51416l-1.59314-58.15137c-.05005-1.82812,1.27612-3.40674,3.08521-3.67285l87.59277-12.8916c.1803-.02686.3623-.04004.54102-.04004M524.49989,0c-.37024,0-.74512.02686-1.12378.08252l-87.59241,12.8916c-3.81445.56104-6.60693,3.88574-6.50134,7.73975l1.59314,58.15137c.11389,4.15527,3.5249,7.40479,7.59924,7.40479.22705,0,.45557-.01025.68628-.03076l85.99915-7.66309c3.927-.3501,6.93701-3.64014,6.93701-7.58252V7.61377c0-4.2627-3.474-7.61377-7.59729-7.61377h0Z"
            fill="#d6d6e3" />
          <path
            d="M452.09462,38.95801c-.99756,0-1.86084-.74512-1.98291-1.76074-.13281-1.09668.64893-2.09277,1.74561-2.22461l58-7c1.09326-.13477,2.09326.64844,2.2251,1.74609.13281,1.09668-.64893,2.09277-1.74561,2.22461l-58,7c-.08154.00977-.16211.01465-.24219.01465Z"
            fill="#d6d6e3" />
          <path
            d="M452.09462,55.90039c-1.01904,0-1.89014-.77539-1.98877-1.81055-.10449-1.09961.70215-2.07617,1.80176-2.18066l52-4.94238c1.09717-.09863,2.07617.70215,2.18066,1.80176s-.70215,2.07617-1.80176,2.18066l-52,4.94238c-.06445.00586-.12842.00879-.19189.00879Z"
            fill="#d6d6e3" />
          <polygon
            points="164.06416 583.34819 372.40985 647.95797 554.40985 585.84979 348.40985 544.95797 164.06416 583.34819"
            fill="#d6d6e3" />
          <polygon
            points="315.40985 561.95797 352.40985 552.95797 436.57461 571.46559 398.40985 583.34819 315.40985 561.95797"
            fill="#fff" />
          <polygon
            points="402.40985 590.85298 323.40985 614.95797 378.40985 632.95797 453.40985 604.95797 402.40985 590.85298"
            fill="#fff" />
          <path
            d="M342.82368,436.24076l-167.32222,89.15785-32.17034-47.43578,174.86391-87.70758c3.64657-12.7663,13.25103-24.84968,27.28203-32.36433,24.55064-13.14867,53.27389-7.33701,64.1556,12.98075,10.88163,20.3178-.19906,47.44737-24.74977,60.59608-14.03108,7.51469-29.41198,8.81231-42.05921,4.77302Z"
            fill="#ed9da0" />
          <path
            d="M108.40985,396.95797l-8,24s19,20.28725,0,31.64363l67-8.64363s27.12401-20.00542,29.06201-3.50271c0,0,33.93799-22.49729,40.93799-8.49729,0,0-20.07249,43.40586,11.46376,65.70293l-41.96376,18.86878-29.89001,20.22884-138.60999,20.19945"
            fill="var(--blue-9)" />
          <path
            d="M464.7671,425.68457c-.35059,0-.70361-.0166-1.05908-.05078l-57.14062-5.48438c-5.97754-.57324-10.46094-5.91113-9.99463-11.89844l3.68311-47.25195c.47168-6.04199,5.78662-10.5957,11.81836-10.19922l58.62061,4.0498c3.03174.20996,5.77734,1.60742,7.72998,3.93555,1.95312,2.32812,2.85205,5.27344,2.53125,8.29492l-5.16357,48.68652c-.60059,5.66406-5.43652,9.91797-11.02539,9.91797ZM402.74855,361.19336l2.49268.19434-3.68311,47.25195c-.25635,3.28711,2.20508,6.21777,5.48682,6.5332l57.14062,5.48438c3.31152.31934,6.28467-2.11133,6.63525-5.41797l5.16357-48.68652c.17578-1.65918-.31787-3.27637-1.39014-4.55371-1.07227-1.27832-2.57959-2.0459-4.24414-2.16113l-58.62061-4.0498c-3.31592-.21973-6.22949,2.28125-6.48828,5.59961l-2.49268-.19434Z"
            fill="var(--blue-9)" />
          <polygon
            points="402.40985 412.95797 424.40985 390.95797 431.40985 400.95797 448.40985 381.95797 470.73937 412.95797 469.40985 423.95797 403.40985 418.80504 402.40985 412.95797"
            fill="var(--blue-9)" />
        </svg>
        <div class="flex flex-col gap-0.5">
          <span class="font-bold">Duplicate and copy components</span>
          <span class="text-secondary text-xs"
            >Quickly reuse elements by duplicating or copying them across your project</span
          >
        </div>
      </li>
      <li class="bg-teal-3 dark:bg-teal-5 flex flex-col gap-6 pb-4 pt-6 px-5 rounded-md">
        <svg
          class="max-h-10"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 799.031 618.112"
          role="img"
          artist="Katerina Limpitsouni"
          source="https://undraw.co/">
          <g transform="translate(-560.484 -230.944)">
            <path
              d="M15.18,488.763c0,.872.478,1.573,1.073,1.573h535.1c.6,0,1.073-.7,1.073-1.573s-.478-1.573-1.073-1.573H16.253C15.658,487.191,15.18,487.891,15.18,488.763Z"
              transform="translate(675.195 358.72)"
              fill="#ccc" />
            <rect width="19.105" height="3.371" transform="translate(865.646 842.298)" fill="#b6b3c5" />
            <rect width="19.105" height="3.371" transform="translate(1034.779 842.861)" fill="#b6b3c5" />
            <path
              d="M352.955,370.945a27.529,27.529,0,0,1-54.321,0H229.146V521.536h193.3V370.945Z"
              transform="translate(634.205 321.322)"
              fill="#d6d6e3" />
            <rect width="193.296" height="5.242" transform="translate(863.914 830.927)" fill="#090814" />
            <path
              d="M788.255,487.17H10.776A10.788,10.788,0,0,1,0,476.394V32.688A10.788,10.788,0,0,1,10.776,21.911H788.255a10.789,10.789,0,0,1,10.776,10.776V476.394a10.789,10.789,0,0,1-10.776,10.776Z"
              transform="translate(560.484 209.033)"
              fill="#090814" />
            <rect width="760.822" height="429.297" transform="translate(578.588 248)" fill="#fff" />
            <g transform="translate(0 -41.857)">
              <g transform="translate(-588.477 33.946)">
                <path
                  d="M35.524,67.628A24.524,24.524,0,0,1,11,43.1V36.524A24.524,24.524,0,0,1,35.524,12a1.492,1.492,0,1,1,0,2.983,21.54,21.54,0,0,0-21.54,21.54V43.1a21.54,21.54,0,1,0,43.081,0V31.259a1.492,1.492,0,1,1,2.983,0V43.1A24.524,24.524,0,0,1,35.524,67.628Z"
                  transform="translate(1535.985 422.718)" />
                <path
                  d="M28.524,67.628A24.524,24.524,0,0,1,4,43.1V31.259a1.492,1.492,0,1,1,2.983,0V43.1a21.54,21.54,0,1,0,43.081,0V36.524a21.54,21.54,0,0,0-21.54-21.54,1.492,1.492,0,0,1,0-2.983A24.524,24.524,0,0,1,53.047,36.524V43.1A24.524,24.524,0,0,1,28.524,67.628Z"
                  transform="translate(1496.922 422.718)" />
                <path
                  d="M58.556,46.441a1.492,1.492,0,0,1-1.492-1.492V26.524a21.54,21.54,0,1,0-43.081,0,1.492,1.492,0,1,1-2.983,0,24.524,24.524,0,1,1,49.047,0V44.949A1.492,1.492,0,0,1,58.556,46.441Z"
                  transform="translate(1535.985 366.911)" />
                <path
                  d="M51.556,93.821a1.492,1.492,0,0,1-1.492-1.492V26.524a21.54,21.54,0,1,0-43.081,0V44.949a1.492,1.492,0,0,1-2.983,0V26.524A24.524,24.524,0,0,1,45.864,9.183a24.363,24.363,0,0,1,7.183,17.341V92.329A1.492,1.492,0,0,1,51.556,93.821Z"
                  transform="translate(1496.922 366.911)" />
                <g transform="translate(1570.017 382.073)">
                  <path
                    d="M20.782,57.047a1.492,1.492,0,1,1,0-2.983,21.54,21.54,0,1,0,0-43.081h-3.29a1.492,1.492,0,0,1,0-2.983h3.29a24.524,24.524,0,1,1,0,49.047Z"
                    transform="translate(-10.602 18.322)" />
                  <path
                    d="M19.372,37.305a1.492,1.492,0,1,1,0-2.983,11.67,11.67,0,1,0,0-23.339h-1.88a1.492,1.492,0,0,1,0-2.983h1.88a14.653,14.653,0,1,1,0,29.305Z"
                    transform="translate(-16 -8)" />
                  <path
                    d="M19.372,37.305h-1.88a1.492,1.492,0,1,1,0-2.983h1.88a11.67,11.67,0,0,0,0-23.339,1.492,1.492,0,0,1,0-2.983,14.653,14.653,0,0,1,0,29.305Z"
                    transform="translate(-16 62.894)" />
                </g>
                <g transform="translate(1492.234 382.073)">
                  <path
                    d="M40.523,57.047A24.524,24.524,0,0,1,40.523,8h3.29a1.492,1.492,0,1,1,0,2.983h-3.29a21.54,21.54,0,0,0,0,43.081,1.492,1.492,0,0,1,0,2.983Z"
                    transform="translate(-16 18.322)" />
                  <path
                    d="M30.652,37.305A14.653,14.653,0,0,1,30.652,8h1.88a1.492,1.492,0,1,1,0,2.983h-1.88a11.67,11.67,0,0,0,0,23.339,1.492,1.492,0,0,1,0,2.983Z"
                    transform="translate(0.678 -8)" />
                  <path
                    d="M32.532,37.305h-1.88A14.653,14.653,0,0,1,30.652,8a1.492,1.492,0,0,1,0,2.983,11.67,11.67,0,0,0,0,23.339h1.88a1.492,1.492,0,1,1,0,2.983Z"
                    transform="translate(0.679 62.894)" />
                </g>
              </g>
              <g transform="translate(864.012 553.398)">
                <rect width="29.619" height="7.13" rx="3.565" transform="translate(37.298)" fill="var(--teal-9)" />
                <rect width="10.421" height="7.13" rx="3.565" transform="translate(159.064)" fill="var(--teal-9)" />
                <rect width="10.421" height="7.13" rx="3.565" transform="translate(179.908)" fill="var(--teal-9)" />
                <rect width="70.756" height="7.13" rx="3.565" transform="translate(77.338)" fill="var(--teal-9)" />
                <rect
                  width="29.619"
                  height="7.13"
                  rx="3.565"
                  transform="translate(0.001 46.074)"
                  fill="var(--teal-9)" />
                <rect
                  width="10.421"
                  height="7.13"
                  rx="3.565"
                  transform="translate(121.767 46.074)"
                  fill="var(--teal-9)" />
                <rect
                  width="10.421"
                  height="7.13"
                  rx="3.565"
                  transform="translate(142.61 46.074)"
                  fill="var(--teal-9)" />
                <rect
                  width="70.756"
                  height="7.13"
                  rx="3.565"
                  transform="translate(40.041 46.074)"
                  fill="var(--teal-9)" />
                <rect
                  width="29.619"
                  height="7.13"
                  rx="3.565"
                  transform="translate(122.316 15.906)"
                  fill="var(--teal-9)" />
                <rect
                  width="29.619"
                  height="7.13"
                  rx="3.565"
                  transform="translate(0.001 15.906)"
                  fill="var(--teal-9)" />
                <rect width="10.421" height="7.13" rx="3.565" transform="translate(0.001)" fill="var(--teal-9)" />
                <rect width="10.421" height="7.13" rx="3.565" transform="translate(0 31.264)" fill="var(--teal-9)" />
                <rect
                  width="70.756"
                  height="7.13"
                  rx="3.565"
                  transform="translate(41.686 15.906)"
                  fill="var(--teal-9)" />
                <rect
                  width="29.619"
                  height="7.13"
                  rx="3.565"
                  transform="translate(60.884 31.264)"
                  fill="var(--teal-9)" />
                <rect
                  width="29.619"
                  height="7.13"
                  rx="3.565"
                  transform="translate(20.843 31.264)"
                  fill="var(--teal-9)" />
                <rect width="10.421" height="7.13" rx="3.565" transform="translate(18.675)" fill="var(--teal-9)" />
                <rect
                  width="10.421"
                  height="7.13"
                  rx="3.565"
                  transform="translate(181.553 31.264)"
                  fill="var(--teal-9)" />
                <rect
                  width="70.756"
                  height="7.13"
                  rx="3.565"
                  transform="translate(100.375 31.264)"
                  fill="var(--teal-9)" />
              </g>
            </g>
            <g transform="translate(626.555 602.469)">
              <path
                d="M805.134,330.7H727.95a1.546,1.546,0,0,1-1.544-1.544V314.612h.618V329.16a.928.928,0,0,0,.927.927h77.184a.928.928,0,0,0,.927-.927V314.51h.618V329.16A1.546,1.546,0,0,1,805.134,330.7Z"
                transform="translate(-646.44 -292.702)"
                fill="#3f3d56" />
              <rect width="181.374" height="0.618" transform="translate(5.3 21.601)" fill="#3f3d56" />
              <ellipse
                cx="5.313"
                cy="5.313"
                rx="5.313"
                ry="5.313"
                transform="translate(0.001 16.549)"
                fill="var(--teal-9)" />
              <ellipse
                cx="5.313"
                cy="5.313"
                rx="5.313"
                ry="5.313"
                transform="translate(53.991 16.549)"
                fill="var(--teal-9)" />
              <ellipse
                cx="5.313"
                cy="5.313"
                rx="5.313"
                ry="5.313"
                transform="translate(90.634 32.165)"
                fill="#3f3d56" />
              <ellipse cx="5.313" cy="5.313" rx="5.313" ry="5.313" transform="translate(118.489 32.165)" fill="#ccc" />
              <ellipse
                cx="5.313"
                cy="5.313"
                rx="5.313"
                ry="5.313"
                transform="translate(104.991 16.549)"
                fill="var(--teal-9)" />
              <ellipse
                cx="5.313"
                cy="5.313"
                rx="5.313"
                ry="5.313"
                transform="translate(180.632 16.549)"
                fill="var(--teal-9)" />
              <ellipse
                cx="5.313"
                cy="5.313"
                rx="5.313"
                ry="5.313"
                transform="translate(154.616 16.549)"
                fill="var(--teal-9)" />
              <path
                d="M537.36,277.577a.309.309,0,0,1-.309-.309V262.022a1.546,1.546,0,0,1,1.544-1.544H553.63a.309.309,0,1,1,0,.618H538.6a.928.928,0,0,0-.927.927v15.246a.309.309,0,0,1-.309.309Z"
                transform="translate(-515.571 -255.358)"
                fill="#3f3d56" />
              <ellipse cx="5.313" cy="5.313" rx="5.313" ry="5.313" transform="translate(33.452 0)" fill="#e6e6e6" />
              <path
                d="M921.669,277.268h-.618V262.022a1.546,1.546,0,0,1,1.544-1.544H937.63v.618H922.6a.928.928,0,0,0-.927.927Z"
                transform="translate(-780.967 -255.358)"
                fill="#3f3d56" />
              <ellipse cx="5.313" cy="5.313" rx="5.313" ry="5.313" transform="translate(152.058 0)" fill="#e6e6e6" />
            </g>
            <path
              d="M496.375,205.477c-2.221,0-4.027.792-4.027,1.764v1.411c0,.973,1.806,1.764,4.027,1.764h93.434c2.221,0,4.027-.792,4.027-1.764v-1.411c0-.973-1.806-1.764-4.027-1.764Z"
              transform="translate(635.637 363.33)"
              fill="#f2f2f2" />
            <path
              d="M670.026,309.282c4,0,7.249,1.75,7.249,3.9v30.351c0,2.152-3.252,3.9-7.249,3.9H497.656c-4,0-7.249-1.75-7.249-3.9V313.184c0-2.152,3.252-3.9,7.249-3.9"
              transform="translate(637.578 297.505)"
              fill="#f2f2f2" />
            <path
              d="M496.375,234.581c-2.221,0-4.027.973-4.027,2.168s1.806,2.168,4.027,2.168H639.748c2.221,0,4.027-.973,4.027-2.168s-1.806-2.168-4.027-2.168Z"
              transform="translate(635.637 343.828)"
              fill="#f2f2f2" />
            <path
              d="M496.375,234.581c-2.221,0-4.027.973-4.027,2.168s1.806,2.168,4.027,2.168H639.748c2.221,0,4.027-.973,4.027-2.168s-1.806-2.168-4.027-2.168Z"
              transform="translate(635.637 352.828)"
              fill="#f2f2f2" />
            <path
              d="M891.9,191.277H840.311a1.683,1.683,0,1,1,0-3.367H891.9a1.683,1.683,0,1,1,0,3.367Z"
              transform="translate(-212.074 93.872)"
              fill="var(--teal-9)" />
            <path
              d="M862.672,210.649H840.311a1.683,1.683,0,1,1,0-3.367h22.361a1.683,1.683,0,1,1,0,3.367Z"
              transform="translate(-212.074 81.146)"
              fill="var(--teal-9)" />
            <g transform="translate(690.275 280.103)">
              <ellipse cx="6.686" cy="6.686" rx="6.686" ry="6.686" transform="translate(0 0)" fill="var(--teal-9)" />
              <path
                d="M847.243,585.331H847.2a.874.874,0,0,1-.646-.336l-1.118-1.434a.875.875,0,0,1,.154-1.228l.04-.032a.874.874,0,0,1,1.228.154.638.638,0,0,0,.966.047l2.267-2.4a.876.876,0,0,1,1.237-.034l.037.035a.874.874,0,0,1,.034,1.237l-3.521,3.716a.874.874,0,0,1-.635.273Z"
                transform="translate(-841.667 -576.242)"
                fill="#fff" />
            </g>
            <path
              d="M891.9,191.277H840.311a1.683,1.683,0,1,1,0-3.367H891.9a1.683,1.683,0,1,1,0,3.367Z"
              transform="translate(-212.074 129.452)"
              fill="var(--teal-9)" />
            <path
              d="M862.672,210.649H840.311a1.683,1.683,0,1,1,0-3.367h22.361a1.683,1.683,0,1,1,0,3.367Z"
              transform="translate(-212.074 116.727)"
              fill="var(--teal-9)" />
            <g transform="translate(690.275 315.683)">
              <ellipse cx="6.686" cy="6.686" rx="6.686" ry="6.686" transform="translate(0 0)" fill="#e6e6e6" />
              <path
                d="M847.243,585.331H847.2a.874.874,0,0,1-.646-.336l-1.118-1.434a.875.875,0,0,1,.154-1.228l.04-.032a.874.874,0,0,1,1.228.154.638.638,0,0,0,.966.047l2.267-2.4a.876.876,0,0,1,1.237-.034l.037.035a.874.874,0,0,1,.034,1.237l-3.521,3.716a.874.874,0,0,1-.635.273Z"
                transform="translate(-841.667 -576.242)"
                fill="#fff" />
            </g>
            <path
              d="M891.9,191.277H840.311a1.683,1.683,0,1,1,0-3.367H891.9a1.683,1.683,0,1,1,0,3.367Z"
              transform="translate(-212.074 165.032)"
              fill="var(--teal-9)" />
            <path
              d="M862.672,210.649H840.311a1.683,1.683,0,1,1,0-3.367h22.361a1.683,1.683,0,1,1,0,3.367Z"
              transform="translate(-212.074 152.307)"
              fill="var(--teal-9)" />
            <g transform="translate(690.275 351.262)">
              <ellipse cx="6.686" cy="6.686" rx="6.686" ry="6.686" transform="translate(0 0)" fill="#e6e6e6" />
              <path
                d="M847.243,585.331H847.2a.874.874,0,0,1-.646-.336l-1.118-1.434a.875.875,0,0,1,.154-1.228l.04-.032a.874.874,0,0,1,1.228.154.638.638,0,0,0,.966.047l2.267-2.4a.876.876,0,0,1,1.237-.034l.037.035a.874.874,0,0,1,.034,1.237l-3.521,3.716a.874.874,0,0,1-.635.273Z"
                transform="translate(-841.667 -576.242)"
                fill="#fff" />
            </g>
            <path
              d="M891.9,191.277H840.311a1.683,1.683,0,1,1,0-3.367H891.9a1.683,1.683,0,1,1,0,3.367Z"
              transform="translate(-212.074 200.611)"
              fill="#e6e6e6" />
            <path
              d="M862.672,210.649H840.311a1.683,1.683,0,1,1,0-3.367h22.361a1.683,1.683,0,1,1,0,3.367Z"
              transform="translate(-212.074 187.886)"
              fill="#e6e6e6" />
            <g transform="translate(690.275 386.842)">
              <ellipse cx="6.686" cy="6.686" rx="6.686" ry="6.686" transform="translate(0 0)" fill="#e6e6e6" />
              <path
                d="M847.243,585.331H847.2a.874.874,0,0,1-.646-.336l-1.118-1.434a.875.875,0,0,1,.154-1.228l.04-.032a.874.874,0,0,1,1.228.154.638.638,0,0,0,.966.047l2.267-2.4a.876.876,0,0,1,1.237-.034l.037.035a.874.874,0,0,1,.034,1.237l-3.521,3.716a.874.874,0,0,1-.635.273Z"
                transform="translate(-841.667 -576.242)"
                fill="#fff" />
            </g>
            <path
              d="M891.9,191.277H840.311a1.683,1.683,0,1,1,0-3.367H891.9a1.683,1.683,0,1,1,0,3.367Z"
              transform="translate(-212.074 236.191)"
              fill="#e6e6e6" />
            <path
              d="M862.672,210.649H840.311a1.683,1.683,0,1,1,0-3.367h22.361a1.683,1.683,0,1,1,0,3.367Z"
              transform="translate(-212.074 223.466)"
              fill="#e6e6e6" />
            <g transform="translate(690.275 422.422)">
              <ellipse cx="6.686" cy="6.686" rx="6.686" ry="6.686" transform="translate(0 0)" fill="#e6e6e6" />
              <path
                d="M847.243,585.331H847.2a.874.874,0,0,1-.646-.336l-1.118-1.434a.875.875,0,0,1,.154-1.228l.04-.032a.874.874,0,0,1,1.228.154.638.638,0,0,0,.966.047l2.267-2.4a.876.876,0,0,1,1.237-.034l.037.035a.874.874,0,0,1,.034,1.237l-3.521,3.716a.874.874,0,0,1-.635.273Z"
                transform="translate(-841.667 -576.242)"
                fill="#fff" />
            </g>
            <g transform="translate(587.66 -327.248)">
              <path
                d="M345.8,318H248.438a.3.3,0,0,1-.3-.3c0-2.109,97.967-.168,97.967,0A.3.3,0,0,1,345.8,318Z"
                transform="translate(381.092 338.302)"
                fill="#090814" />
              <path
                d="M290.014,369.407h-8.855a.905.905,0,0,1-.9-.9V356.3a.905.905,0,0,1,.9-.9h8.855a.905.905,0,0,1,.9.9V368.5A.905.905,0,0,1,290.014,369.407Z"
                transform="translate(360.316 283.544)"
                fill="var(--teal-9)" />
              <path
                d="M335.73,348.208h-8.855a.905.905,0,0,1-.9-.9V323.518a.905.905,0,0,1,.9-.9h8.855a.905.905,0,0,1,.9.9V347.3A.905.905,0,0,1,335.73,348.208Z"
                transform="translate(330.75 304.743)"
                fill="var(--teal-9)" />
              <path
                d="M381.445,369.407H372.59a.905.905,0,0,1-.9-.9V356.3a.905.905,0,0,1,.9-.9h8.855a.905.905,0,0,1,.9.9V368.5A.905.905,0,0,1,381.445,369.407Z"
                transform="translate(301.181 283.544)"
                fill="var(--teal-9)" />
              <path
                d="M427.161,339.839h-8.855a.886.886,0,0,1-.9-.863V310.539a.886.886,0,0,1,.9-.863h8.855a.886.886,0,0,1,.9.863v28.437A.886.886,0,0,1,427.161,339.839Z"
                transform="translate(271.615 313.112)"
                fill="var(--teal-9)" />
              <path
                d="M472.877,324.777h-8.855a.905.905,0,0,1-.9-.9V287.291a.905.905,0,0,1,.9-.9h8.855a.905.905,0,0,1,.9.9v36.581A.905.905,0,0,1,472.877,324.777Z"
                transform="translate(242.049 328.175)"
                fill="var(--teal-9)" />
            </g>
          </g>
        </svg>
        <div class="flex flex-col gap-0.5">
          <span class="font-bold">Built-in AI tools</span>
          <span class="text-secondary text-xs">Generate views from images, use the docs assistant, and more</span>
        </div>
      </li>
    </ul>
  `, this.renderFooter = () => ce`
    <vaadin-button @click=${this.cancelClickListener}>Cancel</vaadin-button>
    <vaadin-button theme="primary" @click=${this.loginClickListener}>Login</vaadin-button>
  `, this.tryAcquireLicense = () => {
      const t = "vaadin-copilot", e = kr$1.serverVersions.find(
        (r2) => r2.name === "Vaadin"
      )?.version;
      window.Vaadin.devTools.downloadLicense({ name: t, version: e });
    };
  }
  createRenderRoot() {
    return this;
  }
  render() {
    return ce` <vaadin-dialog
      @opened-changed="${(t) => {
      const e = t.detail.value;
      f.setLoginCheckActive(e);
    }}"
      .opened="${f.loginCheckActive}"
      ${Ft(
      () => ce`
          <h2 class="font-bold me-auto my-0 text-xs truncate uppercase">Unlock all AI features</h2>
          <vaadin-button aria-label="Close" @click="${() => {
      }}" theme="icon tertiary">
            <vaadin-icon .svg="${r.close}"></vaadin-icon>
            <vaadin-tooltip slot="tooltip" text="Close"></vaadin-tooltip>
          </vaadin-button>
        `
    )}
      ${kt(this.renderDialog, [])}
      ${Vt(this.renderFooter, [])}>
    </vaadin-dialog>`;
  }
  cancelClickListener(t) {
    f.setLoginCheckActive(false);
  }
  loginClickListener() {
    Sr$1("license-acquired"), this.tryAcquireLicense();
  }
};
Hn = _a([
  Oi$1("copilot-login-check")
], Hn);
var Et = { exports: {} }, ar, kn;
function Bt() {
  if (kn) return ar;
  kn = 1;
  const t = "2.0.0", e = 256, r2 = Number.MAX_SAFE_INTEGER || /* istanbul ignore next */
  9007199254740991, n = 16, i = e - 6;
  return ar = {
    MAX_LENGTH: e,
    MAX_SAFE_COMPONENT_LENGTH: n,
    MAX_SAFE_BUILD_LENGTH: i,
    MAX_SAFE_INTEGER: r2,
    RELEASE_TYPES: [
      "major",
      "premajor",
      "minor",
      "preminor",
      "patch",
      "prepatch",
      "prerelease"
    ],
    SEMVER_SPEC_VERSION: t,
    FLAG_INCLUDE_PRERELEASE: 1,
    FLAG_LOOSE: 2
  }, ar;
}
var sr, Fn;
function jt() {
  return Fn || (Fn = 1, sr = typeof process == "object" && define_process_env_default && define_process_env_default.NODE_DEBUG && /\bsemver\b/i.test(define_process_env_default.NODE_DEBUG) ? (...e) => console.error("SEMVER", ...e) : () => {
  }), sr;
}
var Vn;
function ft() {
  return Vn || (Vn = 1, (function(t, e) {
    const {
      MAX_SAFE_COMPONENT_LENGTH: r2,
      MAX_SAFE_BUILD_LENGTH: n,
      MAX_LENGTH: i
    } = Bt(), o = jt();
    e = t.exports = {};
    const a2 = e.re = [], d = e.safeRe = [], c = e.src = [], s = e.safeSrc = [], l = e.t = {};
    let u = 0;
    const h = "[a-zA-Z0-9-]", p = [
      ["\\s", 1],
      ["\\d", i],
      [h, n]
    ], b = (I) => {
      for (const [_2, k] of p)
        I = I.split(`${_2}*`).join(`${_2}{0,${k}}`).split(`${_2}+`).join(`${_2}{1,${k}}`);
      return I;
    }, f2 = (I, _2, k) => {
      const A = b(_2), V2 = u++;
      o(I, V2, _2), l[I] = V2, c[V2] = _2, s[V2] = A, a2[V2] = new RegExp(_2, k ? "g" : void 0), d[V2] = new RegExp(A, k ? "g" : void 0);
    };
    f2("NUMERICIDENTIFIER", "0|[1-9]\\d*"), f2("NUMERICIDENTIFIERLOOSE", "\\d+"), f2("NONNUMERICIDENTIFIER", `\\d*[a-zA-Z-]${h}*`), f2("MAINVERSION", `(${c[l.NUMERICIDENTIFIER]})\\.(${c[l.NUMERICIDENTIFIER]})\\.(${c[l.NUMERICIDENTIFIER]})`), f2("MAINVERSIONLOOSE", `(${c[l.NUMERICIDENTIFIERLOOSE]})\\.(${c[l.NUMERICIDENTIFIERLOOSE]})\\.(${c[l.NUMERICIDENTIFIERLOOSE]})`), f2("PRERELEASEIDENTIFIER", `(?:${c[l.NONNUMERICIDENTIFIER]}|${c[l.NUMERICIDENTIFIER]})`), f2("PRERELEASEIDENTIFIERLOOSE", `(?:${c[l.NONNUMERICIDENTIFIER]}|${c[l.NUMERICIDENTIFIERLOOSE]})`), f2("PRERELEASE", `(?:-(${c[l.PRERELEASEIDENTIFIER]}(?:\\.${c[l.PRERELEASEIDENTIFIER]})*))`), f2("PRERELEASELOOSE", `(?:-?(${c[l.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${c[l.PRERELEASEIDENTIFIERLOOSE]})*))`), f2("BUILDIDENTIFIER", `${h}+`), f2("BUILD", `(?:\\+(${c[l.BUILDIDENTIFIER]}(?:\\.${c[l.BUILDIDENTIFIER]})*))`), f2("FULLPLAIN", `v?${c[l.MAINVERSION]}${c[l.PRERELEASE]}?${c[l.BUILD]}?`), f2("FULL", `^${c[l.FULLPLAIN]}$`), f2("LOOSEPLAIN", `[v=\\s]*${c[l.MAINVERSIONLOOSE]}${c[l.PRERELEASELOOSE]}?${c[l.BUILD]}?`), f2("LOOSE", `^${c[l.LOOSEPLAIN]}$`), f2("GTLT", "((?:<|>)?=?)"), f2("XRANGEIDENTIFIERLOOSE", `${c[l.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`), f2("XRANGEIDENTIFIER", `${c[l.NUMERICIDENTIFIER]}|x|X|\\*`), f2("XRANGEPLAIN", `[v=\\s]*(${c[l.XRANGEIDENTIFIER]})(?:\\.(${c[l.XRANGEIDENTIFIER]})(?:\\.(${c[l.XRANGEIDENTIFIER]})(?:${c[l.PRERELEASE]})?${c[l.BUILD]}?)?)?`), f2("XRANGEPLAINLOOSE", `[v=\\s]*(${c[l.XRANGEIDENTIFIERLOOSE]})(?:\\.(${c[l.XRANGEIDENTIFIERLOOSE]})(?:\\.(${c[l.XRANGEIDENTIFIERLOOSE]})(?:${c[l.PRERELEASELOOSE]})?${c[l.BUILD]}?)?)?`), f2("XRANGE", `^${c[l.GTLT]}\\s*${c[l.XRANGEPLAIN]}$`), f2("XRANGELOOSE", `^${c[l.GTLT]}\\s*${c[l.XRANGEPLAINLOOSE]}$`), f2("COERCEPLAIN", `(^|[^\\d])(\\d{1,${r2}})(?:\\.(\\d{1,${r2}}))?(?:\\.(\\d{1,${r2}}))?`), f2("COERCE", `${c[l.COERCEPLAIN]}(?:$|[^\\d])`), f2("COERCEFULL", c[l.COERCEPLAIN] + `(?:${c[l.PRERELEASE]})?(?:${c[l.BUILD]})?(?:$|[^\\d])`), f2("COERCERTL", c[l.COERCE], true), f2("COERCERTLFULL", c[l.COERCEFULL], true), f2("LONETILDE", "(?:~>?)"), f2("TILDETRIM", `(\\s*)${c[l.LONETILDE]}\\s+`, true), e.tildeTrimReplace = "$1~", f2("TILDE", `^${c[l.LONETILDE]}${c[l.XRANGEPLAIN]}$`), f2("TILDELOOSE", `^${c[l.LONETILDE]}${c[l.XRANGEPLAINLOOSE]}$`), f2("LONECARET", "(?:\\^)"), f2("CARETTRIM", `(\\s*)${c[l.LONECARET]}\\s+`, true), e.caretTrimReplace = "$1^", f2("CARET", `^${c[l.LONECARET]}${c[l.XRANGEPLAIN]}$`), f2("CARETLOOSE", `^${c[l.LONECARET]}${c[l.XRANGEPLAINLOOSE]}$`), f2("COMPARATORLOOSE", `^${c[l.GTLT]}\\s*(${c[l.LOOSEPLAIN]})$|^$`), f2("COMPARATOR", `^${c[l.GTLT]}\\s*(${c[l.FULLPLAIN]})$|^$`), f2("COMPARATORTRIM", `(\\s*)${c[l.GTLT]}\\s*(${c[l.LOOSEPLAIN]}|${c[l.XRANGEPLAIN]})`, true), e.comparatorTrimReplace = "$1$2$3", f2("HYPHENRANGE", `^\\s*(${c[l.XRANGEPLAIN]})\\s+-\\s+(${c[l.XRANGEPLAIN]})\\s*$`), f2("HYPHENRANGELOOSE", `^\\s*(${c[l.XRANGEPLAINLOOSE]})\\s+-\\s+(${c[l.XRANGEPLAINLOOSE]})\\s*$`), f2("STAR", "(<|>)?=?\\s*\\*"), f2("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$"), f2("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
  })(Et, Et.exports)), Et.exports;
}
var lr, qn;
function vn() {
  if (qn) return lr;
  qn = 1;
  const t = Object.freeze({ loose: true }), e = Object.freeze({});
  return lr = (n) => n ? typeof n != "object" ? t : n : e, lr;
}
var cr, Bn;
function to() {
  if (Bn) return cr;
  Bn = 1;
  const t = /^[0-9]+$/, e = (n, i) => {
    if (typeof n == "number" && typeof i == "number")
      return n === i ? 0 : n < i ? -1 : 1;
    const o = t.test(n), a2 = t.test(i);
    return o && a2 && (n = +n, i = +i), n === i ? 0 : o && !a2 ? -1 : a2 && !o ? 1 : n < i ? -1 : 1;
  };
  return cr = {
    compareIdentifiers: e,
    rcompareIdentifiers: (n, i) => e(i, n)
  }, cr;
}
var dr, jn;
function oe() {
  if (jn) return dr;
  jn = 1;
  const t = jt(), { MAX_LENGTH: e, MAX_SAFE_INTEGER: r2 } = Bt(), { safeRe: n, t: i } = ft(), o = vn(), { compareIdentifiers: a2 } = to();
  class d {
    constructor(s, l) {
      if (l = o(l), s instanceof d) {
        if (s.loose === !!l.loose && s.includePrerelease === !!l.includePrerelease)
          return s;
        s = s.version;
      } else if (typeof s != "string")
        throw new TypeError(`Invalid version. Must be a string. Got type "${typeof s}".`);
      if (s.length > e)
        throw new TypeError(
          `version is longer than ${e} characters`
        );
      t("SemVer", s, l), this.options = l, this.loose = !!l.loose, this.includePrerelease = !!l.includePrerelease;
      const u = s.trim().match(l.loose ? n[i.LOOSE] : n[i.FULL]);
      if (!u)
        throw new TypeError(`Invalid Version: ${s}`);
      if (this.raw = s, this.major = +u[1], this.minor = +u[2], this.patch = +u[3], this.major > r2 || this.major < 0)
        throw new TypeError("Invalid major version");
      if (this.minor > r2 || this.minor < 0)
        throw new TypeError("Invalid minor version");
      if (this.patch > r2 || this.patch < 0)
        throw new TypeError("Invalid patch version");
      u[4] ? this.prerelease = u[4].split(".").map((h) => {
        if (/^[0-9]+$/.test(h)) {
          const p = +h;
          if (p >= 0 && p < r2)
            return p;
        }
        return h;
      }) : this.prerelease = [], this.build = u[5] ? u[5].split(".") : [], this.format();
    }
    format() {
      return this.version = `${this.major}.${this.minor}.${this.patch}`, this.prerelease.length && (this.version += `-${this.prerelease.join(".")}`), this.version;
    }
    toString() {
      return this.version;
    }
    compare(s) {
      if (t("SemVer.compare", this.version, this.options, s), !(s instanceof d)) {
        if (typeof s == "string" && s === this.version)
          return 0;
        s = new d(s, this.options);
      }
      return s.version === this.version ? 0 : this.compareMain(s) || this.comparePre(s);
    }
    compareMain(s) {
      return s instanceof d || (s = new d(s, this.options)), this.major < s.major ? -1 : this.major > s.major ? 1 : this.minor < s.minor ? -1 : this.minor > s.minor ? 1 : this.patch < s.patch ? -1 : this.patch > s.patch ? 1 : 0;
    }
    comparePre(s) {
      if (s instanceof d || (s = new d(s, this.options)), this.prerelease.length && !s.prerelease.length)
        return -1;
      if (!this.prerelease.length && s.prerelease.length)
        return 1;
      if (!this.prerelease.length && !s.prerelease.length)
        return 0;
      let l = 0;
      do {
        const u = this.prerelease[l], h = s.prerelease[l];
        if (t("prerelease compare", l, u, h), u === void 0 && h === void 0)
          return 0;
        if (h === void 0)
          return 1;
        if (u === void 0)
          return -1;
        if (u === h)
          continue;
        return a2(u, h);
      } while (++l);
    }
    compareBuild(s) {
      s instanceof d || (s = new d(s, this.options));
      let l = 0;
      do {
        const u = this.build[l], h = s.build[l];
        if (t("build compare", l, u, h), u === void 0 && h === void 0)
          return 0;
        if (h === void 0)
          return 1;
        if (u === void 0)
          return -1;
        if (u === h)
          continue;
        return a2(u, h);
      } while (++l);
    }
    // preminor will bump the version up to the next minor release, and immediately
    // down to pre-release. premajor and prepatch work the same way.
    inc(s, l, u) {
      if (s.startsWith("pre")) {
        if (!l && u === false)
          throw new Error("invalid increment argument: identifier is empty");
        if (l) {
          const h = `-${l}`.match(this.options.loose ? n[i.PRERELEASELOOSE] : n[i.PRERELEASE]);
          if (!h || h[1] !== l)
            throw new Error(`invalid identifier: ${l}`);
        }
      }
      switch (s) {
        case "premajor":
          this.prerelease.length = 0, this.patch = 0, this.minor = 0, this.major++, this.inc("pre", l, u);
          break;
        case "preminor":
          this.prerelease.length = 0, this.patch = 0, this.minor++, this.inc("pre", l, u);
          break;
        case "prepatch":
          this.prerelease.length = 0, this.inc("patch", l, u), this.inc("pre", l, u);
          break;
        // If the input is a non-prerelease version, this acts the same as
        // prepatch.
        case "prerelease":
          this.prerelease.length === 0 && this.inc("patch", l, u), this.inc("pre", l, u);
          break;
        case "release":
          if (this.prerelease.length === 0)
            throw new Error(`version ${this.raw} is not a prerelease`);
          this.prerelease.length = 0;
          break;
        case "major":
          (this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0) && this.major++, this.minor = 0, this.patch = 0, this.prerelease = [];
          break;
        case "minor":
          (this.patch !== 0 || this.prerelease.length === 0) && this.minor++, this.patch = 0, this.prerelease = [];
          break;
        case "patch":
          this.prerelease.length === 0 && this.patch++, this.prerelease = [];
          break;
        // This probably shouldn't be used publicly.
        // 1.0.0 'pre' would become 1.0.0-0 which is the wrong direction.
        case "pre": {
          const h = Number(u) ? 1 : 0;
          if (this.prerelease.length === 0)
            this.prerelease = [h];
          else {
            let p = this.prerelease.length;
            for (; --p >= 0; )
              typeof this.prerelease[p] == "number" && (this.prerelease[p]++, p = -2);
            if (p === -1) {
              if (l === this.prerelease.join(".") && u === false)
                throw new Error("invalid increment argument: identifier already exists");
              this.prerelease.push(h);
            }
          }
          if (l) {
            let p = [l, h];
            u === false && (p = [l]), a2(this.prerelease[0], l) === 0 ? isNaN(this.prerelease[1]) && (this.prerelease = p) : this.prerelease = p;
          }
          break;
        }
        default:
          throw new Error(`invalid increment argument: ${s}`);
      }
      return this.raw = this.format(), this.build.length && (this.raw += `+${this.build.join(".")}`), this;
    }
  }
  return dr = d, dr;
}
var ur, Zn;
function Je() {
  if (Zn) return ur;
  Zn = 1;
  const t = oe();
  return ur = (r2, n, i = false) => {
    if (r2 instanceof t)
      return r2;
    try {
      return new t(r2, n);
    } catch (o) {
      if (!i)
        return null;
      throw o;
    }
  }, ur;
}
var hr, Gn;
function La() {
  if (Gn) return hr;
  Gn = 1;
  const t = Je();
  return hr = (r2, n) => {
    const i = t(r2, n);
    return i ? i.version : null;
  }, hr;
}
var fr, Un;
function Ma() {
  if (Un) return fr;
  Un = 1;
  const t = Je();
  return fr = (r2, n) => {
    const i = t(r2.trim().replace(/^[=v]+/, ""), n);
    return i ? i.version : null;
  }, fr;
}
var pr, Xn;
function Na() {
  if (Xn) return pr;
  Xn = 1;
  const t = oe();
  return pr = (r2, n, i, o, a2) => {
    typeof i == "string" && (a2 = o, o = i, i = void 0);
    try {
      return new t(
        r2 instanceof t ? r2.version : r2,
        i
      ).inc(n, o, a2).version;
    } catch {
      return null;
    }
  }, pr;
}
var mr, Wn;
function Ha() {
  if (Wn) return mr;
  Wn = 1;
  const t = Je();
  return mr = (r2, n) => {
    const i = t(r2, null, true), o = t(n, null, true), a2 = i.compare(o);
    if (a2 === 0)
      return null;
    const d = a2 > 0, c = d ? i : o, s = d ? o : i, l = !!c.prerelease.length;
    if (!!s.prerelease.length && !l) {
      if (!s.patch && !s.minor)
        return "major";
      if (s.compareMain(c) === 0)
        return s.minor && !s.patch ? "minor" : "patch";
    }
    const h = l ? "pre" : "";
    return i.major !== o.major ? h + "major" : i.minor !== o.minor ? h + "minor" : i.patch !== o.patch ? h + "patch" : "prerelease";
  }, mr;
}
var gr, Yn;
function ka() {
  if (Yn) return gr;
  Yn = 1;
  const t = oe();
  return gr = (r2, n) => new t(r2, n).major, gr;
}
var vr, zn;
function Fa() {
  if (zn) return vr;
  zn = 1;
  const t = oe();
  return vr = (r2, n) => new t(r2, n).minor, vr;
}
var br, Jn;
function Va() {
  if (Jn) return br;
  Jn = 1;
  const t = oe();
  return br = (r2, n) => new t(r2, n).patch, br;
}
var Er, Kn;
function qa() {
  if (Kn) return Er;
  Kn = 1;
  const t = Je();
  return Er = (r2, n) => {
    const i = t(r2, n);
    return i && i.prerelease.length ? i.prerelease : null;
  }, Er;
}
var yr, Qn;
function be() {
  if (Qn) return yr;
  Qn = 1;
  const t = oe();
  return yr = (r2, n, i) => new t(r2, i).compare(new t(n, i)), yr;
}
var wr, ei;
function Ba() {
  if (ei) return wr;
  ei = 1;
  const t = be();
  return wr = (r2, n, i) => t(n, r2, i), wr;
}
var Rr, ti;
function ja() {
  if (ti) return Rr;
  ti = 1;
  const t = be();
  return Rr = (r2, n) => t(r2, n, true), Rr;
}
var Ir, ri;
function bn() {
  if (ri) return Ir;
  ri = 1;
  const t = oe();
  return Ir = (r2, n, i) => {
    const o = new t(r2, i), a2 = new t(n, i);
    return o.compare(a2) || o.compareBuild(a2);
  }, Ir;
}
var Sr, ni;
function Za() {
  if (ni) return Sr;
  ni = 1;
  const t = bn();
  return Sr = (r2, n) => r2.sort((i, o) => t(i, o, n)), Sr;
}
var $r, ii;
function Ga() {
  if (ii) return $r;
  ii = 1;
  const t = bn();
  return $r = (r2, n) => r2.sort((i, o) => t(o, i, n)), $r;
}
var Tr, oi;
function Zt() {
  if (oi) return Tr;
  oi = 1;
  const t = be();
  return Tr = (r2, n, i) => t(r2, n, i) > 0, Tr;
}
var xr, ai;
function En() {
  if (ai) return xr;
  ai = 1;
  const t = be();
  return xr = (r2, n, i) => t(r2, n, i) < 0, xr;
}
var Cr, si;
function ro() {
  if (si) return Cr;
  si = 1;
  const t = be();
  return Cr = (r2, n, i) => t(r2, n, i) === 0, Cr;
}
var Or, li;
function no() {
  if (li) return Or;
  li = 1;
  const t = be();
  return Or = (r2, n, i) => t(r2, n, i) !== 0, Or;
}
var Dr, ci;
function yn() {
  if (ci) return Dr;
  ci = 1;
  const t = be();
  return Dr = (r2, n, i) => t(r2, n, i) >= 0, Dr;
}
var Ar, di;
function wn() {
  if (di) return Ar;
  di = 1;
  const t = be();
  return Ar = (r2, n, i) => t(r2, n, i) <= 0, Ar;
}
var Pr, ui;
function io() {
  if (ui) return Pr;
  ui = 1;
  const t = ro(), e = no(), r2 = Zt(), n = yn(), i = En(), o = wn();
  return Pr = (d, c, s, l) => {
    switch (c) {
      case "===":
        return typeof d == "object" && (d = d.version), typeof s == "object" && (s = s.version), d === s;
      case "!==":
        return typeof d == "object" && (d = d.version), typeof s == "object" && (s = s.version), d !== s;
      case "":
      case "=":
      case "==":
        return t(d, s, l);
      case "!=":
        return e(d, s, l);
      case ">":
        return r2(d, s, l);
      case ">=":
        return n(d, s, l);
      case "<":
        return i(d, s, l);
      case "<=":
        return o(d, s, l);
      default:
        throw new TypeError(`Invalid operator: ${c}`);
    }
  }, Pr;
}
var _r, hi;
function Ua() {
  if (hi) return _r;
  hi = 1;
  const t = oe(), e = Je(), { safeRe: r2, t: n } = ft();
  return _r = (o, a2) => {
    if (o instanceof t)
      return o;
    if (typeof o == "number" && (o = String(o)), typeof o != "string")
      return null;
    a2 = a2 || {};
    let d = null;
    if (!a2.rtl)
      d = o.match(a2.includePrerelease ? r2[n.COERCEFULL] : r2[n.COERCE]);
    else {
      const p = a2.includePrerelease ? r2[n.COERCERTLFULL] : r2[n.COERCERTL];
      let b;
      for (; (b = p.exec(o)) && (!d || d.index + d[0].length !== o.length); )
        (!d || b.index + b[0].length !== d.index + d[0].length) && (d = b), p.lastIndex = b.index + b[1].length + b[2].length;
      p.lastIndex = -1;
    }
    if (d === null)
      return null;
    const c = d[2], s = d[3] || "0", l = d[4] || "0", u = a2.includePrerelease && d[5] ? `-${d[5]}` : "", h = a2.includePrerelease && d[6] ? `+${d[6]}` : "";
    return e(`${c}.${s}.${l}${u}${h}`, a2);
  }, _r;
}
var Lr, fi;
function Xa() {
  if (fi) return Lr;
  fi = 1;
  class t {
    constructor() {
      this.max = 1e3, this.map = /* @__PURE__ */ new Map();
    }
    get(r2) {
      const n = this.map.get(r2);
      if (n !== void 0)
        return this.map.delete(r2), this.map.set(r2, n), n;
    }
    delete(r2) {
      return this.map.delete(r2);
    }
    set(r2, n) {
      if (!this.delete(r2) && n !== void 0) {
        if (this.map.size >= this.max) {
          const o = this.map.keys().next().value;
          this.delete(o);
        }
        this.map.set(r2, n);
      }
      return this;
    }
  }
  return Lr = t, Lr;
}
var Mr, pi;
function Ee() {
  if (pi) return Mr;
  pi = 1;
  const t = /\s+/g;
  class e {
    constructor(m, y2) {
      if (y2 = i(y2), m instanceof e)
        return m.loose === !!y2.loose && m.includePrerelease === !!y2.includePrerelease ? m : new e(m.raw, y2);
      if (m instanceof o)
        return this.raw = m.value, this.set = [[m]], this.formatted = void 0, this;
      if (this.options = y2, this.loose = !!y2.loose, this.includePrerelease = !!y2.includePrerelease, this.raw = m.trim().replace(t, " "), this.set = this.raw.split("||").map((E) => this.parseRange(E.trim())).filter((E) => E.length), !this.set.length)
        throw new TypeError(`Invalid SemVer Range: ${this.raw}`);
      if (this.set.length > 1) {
        const E = this.set[0];
        if (this.set = this.set.filter((R) => !f2(R[0])), this.set.length === 0)
          this.set = [E];
        else if (this.set.length > 1) {
          for (const R of this.set)
            if (R.length === 1 && I(R[0])) {
              this.set = [R];
              break;
            }
        }
      }
      this.formatted = void 0;
    }
    get range() {
      if (this.formatted === void 0) {
        this.formatted = "";
        for (let m = 0; m < this.set.length; m++) {
          m > 0 && (this.formatted += "||");
          const y2 = this.set[m];
          for (let E = 0; E < y2.length; E++)
            E > 0 && (this.formatted += " "), this.formatted += y2[E].toString().trim();
        }
      }
      return this.formatted;
    }
    format() {
      return this.range;
    }
    toString() {
      return this.range;
    }
    parseRange(m) {
      const E = ((this.options.includePrerelease && p) | (this.options.loose && b)) + ":" + m, R = n.get(E);
      if (R)
        return R;
      const w = this.options.loose, O2 = w ? c[s.HYPHENRANGELOOSE] : c[s.HYPHENRANGE];
      m = m.replace(O2, Ie(this.options.includePrerelease)), a2("hyphen replace", m), m = m.replace(c[s.COMPARATORTRIM], l), a2("comparator trim", m), m = m.replace(c[s.TILDETRIM], u), a2("tilde trim", m), m = m.replace(c[s.CARETTRIM], h), a2("caret trim", m);
      let F2 = m.split(" ").map((W) => k(W, this.options)).join(" ").split(/\s+/).map((W) => he(W, this.options));
      w && (F2 = F2.filter((W) => (a2("loose invalid filter", W, this.options), !!W.match(c[s.COMPARATORLOOSE])))), a2("range list", F2);
      const P = /* @__PURE__ */ new Map(), B = F2.map((W) => new o(W, this.options));
      for (const W of B) {
        if (f2(W))
          return [W];
        P.set(W.value, W);
      }
      P.size > 1 && P.has("") && P.delete("");
      const re = [...P.values()];
      return n.set(E, re), re;
    }
    intersects(m, y2) {
      if (!(m instanceof e))
        throw new TypeError("a Range is required");
      return this.set.some((E) => _2(E, y2) && m.set.some((R) => _2(R, y2) && E.every((w) => R.every((O2) => w.intersects(O2, y2)))));
    }
    // if ANY of the sets match ALL of its comparators, then pass
    test(m) {
      if (!m)
        return false;
      if (typeof m == "string")
        try {
          m = new d(m, this.options);
        } catch {
          return false;
        }
      for (let y2 = 0; y2 < this.set.length; y2++)
        if (ce2(this.set[y2], m, this.options))
          return true;
      return false;
    }
  }
  Mr = e;
  const r2 = Xa(), n = new r2(), i = vn(), o = Gt(), a2 = jt(), d = oe(), {
    safeRe: c,
    t: s,
    comparatorTrimReplace: l,
    tildeTrimReplace: u,
    caretTrimReplace: h
  } = ft(), { FLAG_INCLUDE_PRERELEASE: p, FLAG_LOOSE: b } = Bt(), f2 = (v) => v.value === "<0.0.0-0", I = (v) => v.value === "", _2 = (v, m) => {
    let y2 = true;
    const E = v.slice();
    let R = E.pop();
    for (; y2 && E.length; )
      y2 = E.every((w) => R.intersects(w, m)), R = E.pop();
    return y2;
  }, k = (v, m) => (v = v.replace(c[s.BUILD], ""), a2("comp", v, m), v = N(v, m), a2("caret", v), v = V2(v, m), a2("tildes", v), v = T(v, m), a2("xrange", v), v = Re(v, m), a2("stars", v), v), A = (v) => !v || v.toLowerCase() === "x" || v === "*", V2 = (v, m) => v.trim().split(/\s+/).map((y2) => G(y2, m)).join(" "), G = (v, m) => {
    const y2 = m.loose ? c[s.TILDELOOSE] : c[s.TILDE];
    return v.replace(y2, (E, R, w, O2, F2) => {
      a2("tilde", v, E, R, w, O2, F2);
      let P;
      return A(R) ? P = "" : A(w) ? P = `>=${R}.0.0 <${+R + 1}.0.0-0` : A(O2) ? P = `>=${R}.${w}.0 <${R}.${+w + 1}.0-0` : F2 ? (a2("replaceTilde pr", F2), P = `>=${R}.${w}.${O2}-${F2} <${R}.${+w + 1}.0-0`) : P = `>=${R}.${w}.${O2} <${R}.${+w + 1}.0-0`, a2("tilde return", P), P;
    });
  }, N = (v, m) => v.trim().split(/\s+/).map((y2) => q(y2, m)).join(" "), q = (v, m) => {
    a2("caret", v, m);
    const y2 = m.loose ? c[s.CARETLOOSE] : c[s.CARET], E = m.includePrerelease ? "-0" : "";
    return v.replace(y2, (R, w, O2, F2, P) => {
      a2("caret", v, R, w, O2, F2, P);
      let B;
      return A(w) ? B = "" : A(O2) ? B = `>=${w}.0.0${E} <${+w + 1}.0.0-0` : A(F2) ? w === "0" ? B = `>=${w}.${O2}.0${E} <${w}.${+O2 + 1}.0-0` : B = `>=${w}.${O2}.0${E} <${+w + 1}.0.0-0` : P ? (a2("replaceCaret pr", P), w === "0" ? O2 === "0" ? B = `>=${w}.${O2}.${F2}-${P} <${w}.${O2}.${+F2 + 1}-0` : B = `>=${w}.${O2}.${F2}-${P} <${w}.${+O2 + 1}.0-0` : B = `>=${w}.${O2}.${F2}-${P} <${+w + 1}.0.0-0`) : (a2("no pr"), w === "0" ? O2 === "0" ? B = `>=${w}.${O2}.${F2}${E} <${w}.${O2}.${+F2 + 1}-0` : B = `>=${w}.${O2}.${F2}${E} <${w}.${+O2 + 1}.0-0` : B = `>=${w}.${O2}.${F2} <${+w + 1}.0.0-0`), a2("caret return", B), B;
    });
  }, T = (v, m) => (a2("replaceXRanges", v, m), v.split(/\s+/).map((y2) => J(y2, m)).join(" ")), J = (v, m) => {
    v = v.trim();
    const y2 = m.loose ? c[s.XRANGELOOSE] : c[s.XRANGE];
    return v.replace(y2, (E, R, w, O2, F2, P) => {
      a2("xRange", v, E, R, w, O2, F2, P);
      const B = A(w), re = B || A(O2), W = re || A(F2), Ke = W;
      return R === "=" && Ke && (R = ""), P = m.includePrerelease ? "-0" : "", B ? R === ">" || R === "<" ? E = "<0.0.0-0" : E = "*" : R && Ke ? (re && (O2 = 0), F2 = 0, R === ">" ? (R = ">=", re ? (w = +w + 1, O2 = 0, F2 = 0) : (O2 = +O2 + 1, F2 = 0)) : R === "<=" && (R = "<", re ? w = +w + 1 : O2 = +O2 + 1), R === "<" && (P = "-0"), E = `${R + w}.${O2}.${F2}${P}`) : re ? E = `>=${w}.0.0${P} <${+w + 1}.0.0-0` : W && (E = `>=${w}.${O2}.0${P} <${w}.${+O2 + 1}.0-0`), a2("xRange return", E), E;
    });
  }, Re = (v, m) => (a2("replaceStars", v, m), v.trim().replace(c[s.STAR], "")), he = (v, m) => (a2("replaceGTE0", v, m), v.trim().replace(c[m.includePrerelease ? s.GTE0PRE : s.GTE0], "")), Ie = (v) => (m, y2, E, R, w, O2, F2, P, B, re, W, Ke) => (A(E) ? y2 = "" : A(R) ? y2 = `>=${E}.0.0${v ? "-0" : ""}` : A(w) ? y2 = `>=${E}.${R}.0${v ? "-0" : ""}` : O2 ? y2 = `>=${y2}` : y2 = `>=${y2}${v ? "-0" : ""}`, A(B) ? P = "" : A(re) ? P = `<${+B + 1}.0.0-0` : A(W) ? P = `<${B}.${+re + 1}.0-0` : Ke ? P = `<=${B}.${re}.${W}-${Ke}` : v ? P = `<${B}.${re}.${+W + 1}-0` : P = `<=${P}`, `${y2} ${P}`.trim()), ce2 = (v, m, y2) => {
    for (let E = 0; E < v.length; E++)
      if (!v[E].test(m))
        return false;
    if (m.prerelease.length && !y2.includePrerelease) {
      for (let E = 0; E < v.length; E++)
        if (a2(v[E].semver), v[E].semver !== o.ANY && v[E].semver.prerelease.length > 0) {
          const R = v[E].semver;
          if (R.major === m.major && R.minor === m.minor && R.patch === m.patch)
            return true;
        }
      return false;
    }
    return true;
  };
  return Mr;
}
var Nr, mi;
function Gt() {
  if (mi) return Nr;
  mi = 1;
  const t = /* @__PURE__ */ Symbol("SemVer ANY");
  class e {
    static get ANY() {
      return t;
    }
    constructor(l, u) {
      if (u = r2(u), l instanceof e) {
        if (l.loose === !!u.loose)
          return l;
        l = l.value;
      }
      l = l.trim().split(/\s+/).join(" "), a2("comparator", l, u), this.options = u, this.loose = !!u.loose, this.parse(l), this.semver === t ? this.value = "" : this.value = this.operator + this.semver.version, a2("comp", this);
    }
    parse(l) {
      const u = this.options.loose ? n[i.COMPARATORLOOSE] : n[i.COMPARATOR], h = l.match(u);
      if (!h)
        throw new TypeError(`Invalid comparator: ${l}`);
      this.operator = h[1] !== void 0 ? h[1] : "", this.operator === "=" && (this.operator = ""), h[2] ? this.semver = new d(h[2], this.options.loose) : this.semver = t;
    }
    toString() {
      return this.value;
    }
    test(l) {
      if (a2("Comparator.test", l, this.options.loose), this.semver === t || l === t)
        return true;
      if (typeof l == "string")
        try {
          l = new d(l, this.options);
        } catch {
          return false;
        }
      return o(l, this.operator, this.semver, this.options);
    }
    intersects(l, u) {
      if (!(l instanceof e))
        throw new TypeError("a Comparator is required");
      return this.operator === "" ? this.value === "" ? true : new c(l.value, u).test(this.value) : l.operator === "" ? l.value === "" ? true : new c(this.value, u).test(l.semver) : (u = r2(u), u.includePrerelease && (this.value === "<0.0.0-0" || l.value === "<0.0.0-0") || !u.includePrerelease && (this.value.startsWith("<0.0.0") || l.value.startsWith("<0.0.0")) ? false : !!(this.operator.startsWith(">") && l.operator.startsWith(">") || this.operator.startsWith("<") && l.operator.startsWith("<") || this.semver.version === l.semver.version && this.operator.includes("=") && l.operator.includes("=") || o(this.semver, "<", l.semver, u) && this.operator.startsWith(">") && l.operator.startsWith("<") || o(this.semver, ">", l.semver, u) && this.operator.startsWith("<") && l.operator.startsWith(">")));
    }
  }
  Nr = e;
  const r2 = vn(), { safeRe: n, t: i } = ft(), o = io(), a2 = jt(), d = oe(), c = Ee();
  return Nr;
}
var Hr, gi;
function Ut() {
  if (gi) return Hr;
  gi = 1;
  const t = Ee();
  return Hr = (r2, n, i) => {
    try {
      n = new t(n, i);
    } catch {
      return false;
    }
    return n.test(r2);
  }, Hr;
}
var kr, vi;
function Wa() {
  if (vi) return kr;
  vi = 1;
  const t = Ee();
  return kr = (r2, n) => new t(r2, n).set.map((i) => i.map((o) => o.value).join(" ").trim().split(" ")), kr;
}
var Fr, bi;
function Ya() {
  if (bi) return Fr;
  bi = 1;
  const t = oe(), e = Ee();
  return Fr = (n, i, o) => {
    let a2 = null, d = null, c = null;
    try {
      c = new e(i, o);
    } catch {
      return null;
    }
    return n.forEach((s) => {
      c.test(s) && (!a2 || d.compare(s) === -1) && (a2 = s, d = new t(a2, o));
    }), a2;
  }, Fr;
}
var Vr, Ei;
function za() {
  if (Ei) return Vr;
  Ei = 1;
  const t = oe(), e = Ee();
  return Vr = (n, i, o) => {
    let a2 = null, d = null, c = null;
    try {
      c = new e(i, o);
    } catch {
      return null;
    }
    return n.forEach((s) => {
      c.test(s) && (!a2 || d.compare(s) === 1) && (a2 = s, d = new t(a2, o));
    }), a2;
  }, Vr;
}
var qr, yi;
function Ja() {
  if (yi) return qr;
  yi = 1;
  const t = oe(), e = Ee(), r2 = Zt();
  return qr = (i, o) => {
    i = new e(i, o);
    let a2 = new t("0.0.0");
    if (i.test(a2) || (a2 = new t("0.0.0-0"), i.test(a2)))
      return a2;
    a2 = null;
    for (let d = 0; d < i.set.length; ++d) {
      const c = i.set[d];
      let s = null;
      c.forEach((l) => {
        const u = new t(l.semver.version);
        switch (l.operator) {
          case ">":
            u.prerelease.length === 0 ? u.patch++ : u.prerelease.push(0), u.raw = u.format();
          /* fallthrough */
          case "":
          case ">=":
            (!s || r2(u, s)) && (s = u);
            break;
          case "<":
          case "<=":
            break;
          /* istanbul ignore next */
          default:
            throw new Error(`Unexpected operation: ${l.operator}`);
        }
      }), s && (!a2 || r2(a2, s)) && (a2 = s);
    }
    return a2 && i.test(a2) ? a2 : null;
  }, qr;
}
var Br, wi;
function Ka() {
  if (wi) return Br;
  wi = 1;
  const t = Ee();
  return Br = (r2, n) => {
    try {
      return new t(r2, n).range || "*";
    } catch {
      return null;
    }
  }, Br;
}
var jr, Ri;
function Rn() {
  if (Ri) return jr;
  Ri = 1;
  const t = oe(), e = Gt(), { ANY: r2 } = e, n = Ee(), i = Ut(), o = Zt(), a2 = En(), d = wn(), c = yn();
  return jr = (l, u, h, p) => {
    l = new t(l, p), u = new n(u, p);
    let b, f2, I, _2, k;
    switch (h) {
      case ">":
        b = o, f2 = d, I = a2, _2 = ">", k = ">=";
        break;
      case "<":
        b = a2, f2 = c, I = o, _2 = "<", k = "<=";
        break;
      default:
        throw new TypeError('Must provide a hilo val of "<" or ">"');
    }
    if (i(l, u, p))
      return false;
    for (let A = 0; A < u.set.length; ++A) {
      const V2 = u.set[A];
      let G = null, N = null;
      if (V2.forEach((q) => {
        q.semver === r2 && (q = new e(">=0.0.0")), G = G || q, N = N || q, b(q.semver, G.semver, p) ? G = q : I(q.semver, N.semver, p) && (N = q);
      }), G.operator === _2 || G.operator === k || (!N.operator || N.operator === _2) && f2(l, N.semver))
        return false;
      if (N.operator === k && I(l, N.semver))
        return false;
    }
    return true;
  }, jr;
}
var Zr, Ii;
function Qa() {
  if (Ii) return Zr;
  Ii = 1;
  const t = Rn();
  return Zr = (r2, n, i) => t(r2, n, ">", i), Zr;
}
var Gr, Si;
function es() {
  if (Si) return Gr;
  Si = 1;
  const t = Rn();
  return Gr = (r2, n, i) => t(r2, n, "<", i), Gr;
}
var Ur, $i;
function ts() {
  if ($i) return Ur;
  $i = 1;
  const t = Ee();
  return Ur = (r2, n, i) => (r2 = new t(r2, i), n = new t(n, i), r2.intersects(n, i)), Ur;
}
var Xr, Ti;
function rs() {
  if (Ti) return Xr;
  Ti = 1;
  const t = Ut(), e = be();
  return Xr = (r2, n, i) => {
    const o = [];
    let a2 = null, d = null;
    const c = r2.sort((h, p) => e(h, p, i));
    for (const h of c)
      t(h, n, i) ? (d = h, a2 || (a2 = h)) : (d && o.push([a2, d]), d = null, a2 = null);
    a2 && o.push([a2, null]);
    const s = [];
    for (const [h, p] of o)
      h === p ? s.push(h) : !p && h === c[0] ? s.push("*") : p ? h === c[0] ? s.push(`<=${p}`) : s.push(`${h} - ${p}`) : s.push(`>=${h}`);
    const l = s.join(" || "), u = typeof n.raw == "string" ? n.raw : String(n);
    return l.length < u.length ? l : n;
  }, Xr;
}
var Wr, xi;
function ns() {
  if (xi) return Wr;
  xi = 1;
  const t = Ee(), e = Gt(), { ANY: r2 } = e, n = Ut(), i = be(), o = (u, h, p = {}) => {
    if (u === h)
      return true;
    u = new t(u, p), h = new t(h, p);
    let b = false;
    e: for (const f2 of u.set) {
      for (const I of h.set) {
        const _2 = c(f2, I, p);
        if (b = b || _2 !== null, _2)
          continue e;
      }
      if (b)
        return false;
    }
    return true;
  }, a2 = [new e(">=0.0.0-0")], d = [new e(">=0.0.0")], c = (u, h, p) => {
    if (u === h)
      return true;
    if (u.length === 1 && u[0].semver === r2) {
      if (h.length === 1 && h[0].semver === r2)
        return true;
      p.includePrerelease ? u = a2 : u = d;
    }
    if (h.length === 1 && h[0].semver === r2) {
      if (p.includePrerelease)
        return true;
      h = d;
    }
    const b = /* @__PURE__ */ new Set();
    let f2, I;
    for (const T of u)
      T.operator === ">" || T.operator === ">=" ? f2 = s(f2, T, p) : T.operator === "<" || T.operator === "<=" ? I = l(I, T, p) : b.add(T.semver);
    if (b.size > 1)
      return null;
    let _2;
    if (f2 && I) {
      if (_2 = i(f2.semver, I.semver, p), _2 > 0)
        return null;
      if (_2 === 0 && (f2.operator !== ">=" || I.operator !== "<="))
        return null;
    }
    for (const T of b) {
      if (f2 && !n(T, String(f2), p) || I && !n(T, String(I), p))
        return null;
      for (const J of h)
        if (!n(T, String(J), p))
          return false;
      return true;
    }
    let k, A, V2, G, N = I && !p.includePrerelease && I.semver.prerelease.length ? I.semver : false, q = f2 && !p.includePrerelease && f2.semver.prerelease.length ? f2.semver : false;
    N && N.prerelease.length === 1 && I.operator === "<" && N.prerelease[0] === 0 && (N = false);
    for (const T of h) {
      if (G = G || T.operator === ">" || T.operator === ">=", V2 = V2 || T.operator === "<" || T.operator === "<=", f2) {
        if (q && T.semver.prerelease && T.semver.prerelease.length && T.semver.major === q.major && T.semver.minor === q.minor && T.semver.patch === q.patch && (q = false), T.operator === ">" || T.operator === ">=") {
          if (k = s(f2, T, p), k === T && k !== f2)
            return false;
        } else if (f2.operator === ">=" && !n(f2.semver, String(T), p))
          return false;
      }
      if (I) {
        if (N && T.semver.prerelease && T.semver.prerelease.length && T.semver.major === N.major && T.semver.minor === N.minor && T.semver.patch === N.patch && (N = false), T.operator === "<" || T.operator === "<=") {
          if (A = l(I, T, p), A === T && A !== I)
            return false;
        } else if (I.operator === "<=" && !n(I.semver, String(T), p))
          return false;
      }
      if (!T.operator && (I || f2) && _2 !== 0)
        return false;
    }
    return !(f2 && V2 && !I && _2 !== 0 || I && G && !f2 && _2 !== 0 || q || N);
  }, s = (u, h, p) => {
    if (!u)
      return h;
    const b = i(u.semver, h.semver, p);
    return b > 0 ? u : b < 0 || h.operator === ">" && u.operator === ">=" ? h : u;
  }, l = (u, h, p) => {
    if (!u)
      return h;
    const b = i(u.semver, h.semver, p);
    return b < 0 ? u : b > 0 || h.operator === "<" && u.operator === "<=" ? h : u;
  };
  return Wr = o, Wr;
}
var Yr, Ci;
function is() {
  if (Ci) return Yr;
  Ci = 1;
  const t = ft(), e = Bt(), r2 = oe(), n = to(), i = Je(), o = La(), a2 = Ma(), d = Na(), c = Ha(), s = ka(), l = Fa(), u = Va(), h = qa(), p = be(), b = Ba(), f2 = ja(), I = bn(), _2 = Za(), k = Ga(), A = Zt(), V2 = En(), G = ro(), N = no(), q = yn(), T = wn(), J = io(), Re = Ua(), he = Gt(), Ie = Ee(), ce2 = Ut(), v = Wa(), m = Ya(), y2 = za(), E = Ja(), R = Ka(), w = Rn(), O2 = Qa(), F2 = es(), P = ts(), B = rs(), re = ns();
  return Yr = {
    parse: i,
    valid: o,
    clean: a2,
    inc: d,
    diff: c,
    major: s,
    minor: l,
    patch: u,
    prerelease: h,
    compare: p,
    rcompare: b,
    compareLoose: f2,
    compareBuild: I,
    sort: _2,
    rsort: k,
    gt: A,
    lt: V2,
    eq: G,
    neq: N,
    gte: q,
    lte: T,
    cmp: J,
    coerce: Re,
    Comparator: he,
    Range: Ie,
    satisfies: ce2,
    toComparators: v,
    maxSatisfying: m,
    minSatisfying: y2,
    minVersion: E,
    validRange: R,
    outside: w,
    gtr: O2,
    ltr: F2,
    intersects: P,
    simplifyRange: B,
    subset: re,
    SemVer: r2,
    re: t.re,
    src: t.src,
    tokens: t.t,
    SEMVER_SPEC_VERSION: e.SEMVER_SPEC_VERSION,
    RELEASE_TYPES: e.RELEASE_TYPES,
    compareIdentifiers: n.compareIdentifiers,
    rcompareIdentifiers: n.rcompareIdentifiers
  }, Yr;
}
var os = is();
const lt = /* @__PURE__ */ $c(os), Oi = (t) => lt.valid(t) ?? lt.valid(lt.coerce(t)), as = window.Vaadin.copilot.eventbus;
as.on("serverInfo", (t) => {
  const r2 = t.detail.versions.find((o) => o.name === "Vaadin");
  if (!r2)
    return;
  const n = _.getMostRecentVaadinVersion(), i = r2.version;
  mr$1(`${ot$1}get-release-note-url`, { version: i }, (o) => {
    const a2 = o.data;
    if (!a2.error && a2.url)
      if (n) {
        const d = Oi(i), c = Oi(n), s = d !== null && c !== null ? lt.gte(d, c) : i === n;
        f.setProjectVersionReleaseNoteInfo({
          mostRecentVersion: s,
          vaadinVersion: i,
          url: a2.url
        }), d !== null && c !== null && lt.gt(d, c) && (Mi$1({
          type: Ze$1.INFORMATION,
          message: `You're now on version ${i}!`,
          details: rr$1(
            ce`<a class="ahreflike" href="${a2.url}" target="_blank">Click here to open release notes!</a>`
          )
        }), _.setMostRecentReleaseNoteDismissed(false), _.setMostRecentVaadinVersion(i));
      } else
        _.setMostRecentReleaseNoteDismissed(false), _.setMostRecentVaadinVersion(i), f.setProjectVersionReleaseNoteInfo({
          mostRecentVersion: true,
          vaadinVersion: i,
          url: a2.url
        });
  });
});
y.on("copilot-java-after-update", (t) => {
  t.detail.classes.find((e) => e.routePath !== void 0) && y.emit("update-routes", {});
});
