import { d as dc, y, c as ce, f, G as Gc, I as Ir, M as Md, Z as Ze, b as bl, S as Sr, C as Ct, V as Vd, O as Oe, a as Oi } from "./indexhtml-Crv9HnRQ.js";
import { a } from "./state-aTUQA9pO-CJ-X0rSy.js";
import { V } from "./base-panel-Djw-d72n-Bp8ldhFY.js";
import { r } from "./icons-CJYK-fIm-3aTajcIb.js";
import "./commonjsHelpers-CUmg6egw.js";
const C = 'copilot-log-panel ul{list-style-type:none;margin:0;padding:0}copilot-log-panel ul li{align-items:start;display:flex;gap:var(--space-50);padding:var(--space-100) var(--space-50);position:relative}copilot-log-panel ul li:before{border-bottom:1px dashed var(--divider-primary-color);content:"";inset:auto 0 0 calc(var(--copilot-size-md) + var(--space-100));position:absolute}copilot-log-panel ul li span.icon{display:flex;flex-shrink:0;justify-content:center;width:var(--copilot-size-md)}copilot-log-panel ul li.information span.icon{color:var(--blue-color)}copilot-log-panel ul li.warning span.icon{color:var(--warning-color)}copilot-log-panel ul li.error span.icon{color:var(--error-color)}copilot-log-panel ul li .message{display:flex;flex-direction:column;flex-grow:1;overflow:hidden}copilot-log-panel ul li:not(.expanded) span{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}copilot-log-panel ul li button svg{transition:transform .15s cubic-bezier(.2,0,0,1)}copilot-log-panel ul li button[aria-expanded=true] svg{transform:rotate(90deg)}copilot-log-panel ul li code{margin-top:var(--space-50)}copilot-log-panel ul li.expanded .secondary{margin-top:var(--space-100)}copilot-log-panel .secondary a{display:block;margin-bottom:var(--space-50)}', P = () => {
  const e = { hour: "numeric", minute: "numeric", second: "numeric", fractionalSecondDigits: 3 };
  let t;
  const a2 = navigator.language ?? "", i = a2.indexOf("@"), o = i === -1 ? a2 : a2.slice(0, i);
  try {
    t = new Intl.DateTimeFormat(Intl.getCanonicalLocales(o), e);
  } catch (l) {
    console.error("Failed to create date time formatter for ", o, l), t = new Intl.DateTimeFormat("en-US", e);
  }
  return t;
}, A = P();
var _ = Object.defineProperty, B = Object.getOwnPropertyDescriptor, u = (e, t, a2, i) => {
  for (var o = i > 1 ? void 0 : i ? B(t, a2) : t, l = e.length - 1, r2; l >= 0; l--)
    (r2 = e[l]) && (o = (i ? r2(t, a2, o) : r2(o)) || o);
  return i && o && _(t, a2, o), o;
};
class F {
  constructor() {
    this.showTimestamps = false, Ct(this);
  }
  toggleShowTimestamps() {
    this.showTimestamps = !this.showTimestamps;
  }
}
const h = new F();
let d = class extends V {
  constructor() {
    super(...arguments), this.unreadErrors = false, this.messages = [], this.nextMessageId = 1, this.transitionDuration = 0, this.errorHandlersAdded = false;
  }
  connectedCallback() {
    if (super.connectedCallback(), this.onCommand("log", (e) => {
      this.handleLogEventData({ type: e.data.type, message: e.data.message });
    }), this.onEventBus("log", (e) => this.handleLogEvent(e)), this.onEventBus("update-log", (e) => this.updateLog(e.detail)), this.onEventBus("notification-shown", (e) => this.handleNotification(e)), this.onEventBus("clear-log", () => this.clear()), this.reaction(
      () => f.sectionPanelResizing,
      () => {
        this.requestUpdate();
      }
    ), this.transitionDuration = parseInt(
      window.getComputedStyle(this).getPropertyValue("--dev-tools-transition-duration"),
      10
    ), !this.errorHandlersAdded) {
      const e = (t) => {
        Vd(() => {
          Oe.attentionRequiredPanelTag = "copilot-log-panel";
        }), this.log(Ze.ERROR, t.message, !!t.internal, t.details, t.link);
      };
      Gc((t) => {
        e(t);
      }), Ir.forEach((t) => {
        e(t);
      }), Ir.length = 0, this.errorHandlersAdded = true;
    }
  }
  clear() {
    this.messages = [];
  }
  handleNotification(e) {
    this.log(e.detail.type, e.detail.message, true, e.detail.details, e.detail.link);
  }
  handleLogEvent(e) {
    this.handleLogEventData(e.detail);
  }
  handleLogEventData(e) {
    this.log(
      e.type,
      e.message,
      !!e.internal,
      e.details,
      e.link,
      Md(e.expandedMessage),
      Md(e.expandedDetails),
      e.id
    );
  }
  activate() {
    this.unreadErrors = false, this.updateComplete.then(() => {
      const e = this.renderRoot.querySelector(".message:last-child");
      e && e.scrollIntoView();
    });
  }
  render() {
    return ce`
      <style>
        ${C}
      </style>
      ${this.messages.length === 0 ? ce`<div
            class="bg-blue-3 dark:bg-blue-5 gap-2 flex mb-3 mt-0 mx-3 pe-3 ps-2 py-2 rounded-md text-blue-11 dark:text-blue-12 text-sm">
            <vaadin-icon .svg="${r.info}"></vaadin-icon>
            <span
              >Communication between application and backend services, errors, and all notifications will appear
              here.</span
            >
          </div>` : ce`<ul>
            ${this.messages.map((e) => this.renderMessage(e))}
          </ul>`}
    `;
  }
  renderMessage(e) {
    let t, a2;
    return e.type === Ze.ERROR ? (a2 = r.warning, t = "Error") : e.type === Ze.WARNING ? (a2 = r.warning, t = "Warning") : (a2 = r.info, t = "Info"), ce`
      <li
        class="${e.type} ${e.expanded ? "expanded" : ""} ${e.details || e.link ? "has-details" : ""}"
        data-id="${e.id}">
        <span aria-label="${t}" class="icon" title="${t}">${a2}</span>
        <span class="message" @click=${() => this.toggleExpanded(e)}>
          <span class="timestamp" ?hidden=${!h.showTimestamps}>${W(e.timestamp)}</span>
          <span class="primary">
            ${e.expanded && e.expandedMessage ? e.expandedMessage : e.message}
          </span>
          ${e.expanded ? ce` <span class="secondary"> ${e.expandedDetails ?? e.details} </span>` : ce` <span class="secondary" ?hidden="${!e.details && !e.link}">
                ${Md(e.details)}
                ${e.link ? ce` <a href="${e.link}" target="_blank">Learn more</a>` : ""}
              </span>`}
        </span>
        <!-- TODO: a11y, button needs aria-controls with unique ids -->
        <button
          aria-controls="content"
          aria-expanded="${e.expanded}"
          aria-label="Expand details"
          class="icon"
          @click=${() => this.toggleExpanded(e)}
          ?hidden=${!this.canBeExpanded(e)}>
          <span>${r.chevronRight}</span>
        </button>
      </li>
    `;
  }
  log(e, t, a2, i, o, l, r2, E) {
    const T = this.nextMessageId;
    this.nextMessageId += 1, r2 || (r2 = t);
    const g = {
      id: T,
      type: e,
      message: t,
      details: i,
      link: o,
      dontShowAgain: false,
      deleted: false,
      expanded: false,
      expandedMessage: l,
      expandedDetails: r2,
      timestamp: /* @__PURE__ */ new Date(),
      internal: a2,
      userId: E
    };
    for (this.messages.push(g); this.messages.length > d.MAX_LOG_ROWS; )
      this.messages.shift();
    return this.requestUpdate(), this.updateComplete.then(() => {
      const m = this.renderRoot.querySelector(".message:last-child");
      m ? (setTimeout(() => m.scrollIntoView({ behavior: "smooth" }), this.transitionDuration), this.unreadErrors = false) : e === Ze.ERROR && (this.unreadErrors = true);
    }), g;
  }
  updateLog(e) {
    let t = this.messages.find((a2) => a2.userId === e.id);
    t || (t = this.log(Ze.INFORMATION, "<Log message to update was not found>", false)), Object.assign(t, e), bl(t.expandedDetails) && (t.expandedDetails = Md(t.expandedDetails)), this.requestUpdate();
  }
  updated() {
    const e = this.querySelector(".row:last-child");
    e && this.isTooLong(e.querySelector(".firstrowmessage")) && e.querySelector("button.expand")?.removeAttribute("hidden");
  }
  toggleExpanded(e) {
    this.canBeExpanded(e) && (e.expanded = !e.expanded, this.requestUpdate()), Sr("use-log", { source: "toggleExpanded" });
  }
  canBeExpanded(e) {
    if (e.expandedMessage || e.expanded)
      return true;
    const t = this.querySelector(`[data\\-id="${e.id}"]`)?.querySelector(
      ".firstrowmessage"
    );
    return this.isTooLong(t);
  }
  isTooLong(e) {
    return e && e.offsetWidth < e.scrollWidth;
  }
};
d.MAX_LOG_ROWS = 1e3;
u([
  a()
], d.prototype, "unreadErrors", 2);
u([
  a()
], d.prototype, "messages", 2);
d = u([
  Oi("copilot-log-panel")
], d);
let x = class extends dc {
  createRenderRoot() {
    return this;
  }
  render() {
    return ce`
      <style>
        copilot-log-panel-actions {
          display: contents;
        }
      </style>
      <vaadin-button
        aria-label="Clear log"
        @click=${() => {
      y.emit("clear-log", {});
    }}
        theme="icon tertiary">
        <vaadin-icon .svg="${r.delete}"></vaadin-icon>
        <vaadin-tooltip slot="tooltip" text="Clear log"></vaadin-tooltip>
      </vaadin-button>
      <vaadin-button
        aria-label="Toggle timestamps"
        @click=${() => {
      h.toggleShowTimestamps();
    }}
        theme="icon tertiary">
        <vaadin-icon .svg="${h.showTimestamps ? r.schedule : r.historyToggleOff}"></vaadin-icon>
        <vaadin-tooltip slot="tooltip" text="Toggle timestamps"></vaadin-tooltip>
      </vaadin-button>
    `;
  }
};
x = u([
  Oi("copilot-log-panel-actions")
], x);
const $ = {
  header: "Log",
  tag: "copilot-log-panel",
  actionsTag: "copilot-log-panel-actions",
  individual: true,
  toolbarOptions: {
    allowedModesWithOrder: {
      common: 0
    },
    iconKey: "terminal"
  }
}, U = {
  init(e) {
    e.addPanel($);
  }
};
window.Vaadin.copilot.plugins.push(U);
Oe.addPanel($);
function W(e) {
  return A.format(e);
}
export {
  x as Actions,
  d as CopilotLogPanel
};
