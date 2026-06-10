import { d as dc, y, c as ce, f as f$1, e as S$1, O as Oe, o as op, t as tp, a as Oi } from "./indexhtml-Crv9HnRQ.js";
import { a } from "./state-aTUQA9pO-CJ-X0rSy.js";
import { V as V$1 } from "./base-panel-Djw-d72n-Bp8ldhFY.js";
import { r } from "./icons-CJYK-fIm-3aTajcIb.js";
import { F, H } from "./repeat-B6aSW1iL-xculwdAK.js";
import "./commonjsHelpers-CUmg6egw.js";
import "./directive-helpers-BuSA7Eqp-iDDDRuBB.js";
var I = Object.defineProperty, V = Object.getOwnPropertyDescriptor, u = (e, a2, n, o) => {
  for (var s = o > 1 ? void 0 : o ? V(a2, n) : a2, c = e.length - 1, d; c >= 0; c--)
    (d = e[c]) && (s = (o ? d(a2, n, s) : d(s)) || s);
  return o && s && I(a2, n, s), s;
};
let p = class extends V$1 {
  constructor() {
    super(...arguments), this.sortedEntries = [];
  }
  connectedCallback() {
    super.connectedCallback(), this.classList.add("contents"), this.reaction(
      () => f$1.projectInfoEntries,
      () => {
        if (!f$1.projectInfoEntries)
          return;
        let e = [
          ...f$1.projectInfoEntries,
          { name: "Development Workflow", value: "" }
        ];
        e = e.filter((a2) => a2.name !== "Java Hotswap"), this.sortedEntries = e.sort((a2, n) => a2.name.localeCompare(n.name));
      },
      { fireImmediately: true }
    );
  }
  render() {
    return ce` <div class="flex flex-col py-2 px-4">
      <dl class="border-dashed divide-y m-0">
        ${H(
      this.sortedEntries.filter((e) => e.name !== "Java Hotswap"),
      (e) => e.name,
      (e) => this.renderRow(e)
    )}
      </dl>
    </div>`;
  }
  renderRow(e) {
    if (e.name === "Development Workflow")
      return this.renderDevelopmentWorkflowButton();
    const a2 = e.name === "IDE Plugin" && e.value === true && f$1.idePluginState?.ide ? f$1.idePluginState.ide : e.value, n = this.getIcon(e.name, a2), o = this.getIconColor(e.name), s = this.getTextColor(e);
    return ce`
      <div class="flex gap-2 py-2">
        <dt class="flex gap-2">
          ${n ? ce`<vaadin-icon class="${o}" .svg="${n}"></vaadin-icon>` : S$1} ${e.name}
        </dt>
        <dd class="flex gap-2 m-0 ${s}">${this.renderRowValue(e)}</dd>
      </div>
    `;
  }
  renderRowValue(e) {
    return e.name === "Vaadin Employee" && e.value === true ? ce`
        <vaadin-icon id="vaadin-employee" class="text-teal-11" .svg="${r.check}"></vaadin-icon>
        <vaadin-tooltip for="vaadin-employee" text="Yes"></vaadin-tooltip>
      ` : ce` ${!e.booleanInfo && typeof e.value == "string" ? e.value : S$1}
    ${e.booleanInfo && typeof e.value == "boolean" ? S(e.value, e.booleanInfo.ariaLabel) : S$1}
    ${e.booleanInfo?.text ? e.booleanInfo.text : S$1}
    ${e.name === "Vaadin" ? this.renderVaadinRowMore() : S$1}`;
  }
  renderVaadinRowMore() {
    const e = f$1.newVaadinVersionState?.versions !== void 0 && f$1.newVaadinVersionState.versions.length > 0;
    return ce`
      ${f$1.projectVersionReleaseNoteInfo && f$1.projectVersionReleaseNoteInfo.url ? ce`<a
            class="flex gap-0.5 items-center"
            href="${f$1.projectVersionReleaseNoteInfo.url}"
            id="release-notes-link"
            target="_blank"
            >Release notes <vaadin-icon class="icon-sm" .svg="${r.arrowOutward}"></vaadin-icon
          ></a>` : S$1}
      <vaadin-button
        aria-label="Edit Vaadin version"
        class="-my-1.5 relative"
        @click="${(a2) => {
      a2.stopPropagation(), Oe.openPanel("copilot-vaadin-versions");
    }}"
        id="new-vaadin-version-btn"
        theme="icon tertiary">
        <vaadin-icon .svg="${r.editSquare}"></vaadin-icon>
        <vaadin-tooltip slot="tooltip" text="Edit Vaadin version"></vaadin-tooltip>
        ${e ? ce`<span aria-hidden="true" class="absolute bg-amber-11 end-0.5 rounded-full size-1 top-0.5"></span>` : ""}
      </vaadin-button>
    `;
  }
  renderDevelopmentWorkflowButton() {
    const e = op();
    let a2 = "", n = r.doneAll, o = "";
    return e.status === "success" ? (a2 = "text-teal-11", o = "IDE Plugin & Java Hotswap") : e.status === "warning" ? (a2 = "text-amber-11", n = r.arrowUploadReady, o = "Improve") : e.status === "error" && (a2 = "text-ruby-11", n = r.handyman, o = "Fix"), ce`
      <div class="flex gap-2 py-2">
        <dt class="flex gap-2">
          <vaadin-icon class="text-amber-11" .svg="${r.bolt}"></vaadin-icon>
          Development Workflow
        </dt>
        <dd class="m-0">
          <vaadin-button
            class="-my-1.5 ${a2}"
            id="development-workflow-status-detail"
            theme="tertiary"
            @click=${() => {
      tp();
    }}>
            <vaadin-icon slot="prefix" .svg="${n}"></vaadin-icon>
            ${o}
          </vaadin-button>
        </dd>
      </div>
    `;
  }
  getIconColor(e) {
    return e.includes("Vaadin") || e === "Copilot" ? "text-vaadin-blue" : "";
  }
  getTextColor(e) {
    if (typeof e.value == "string") {
      if (e.value.startsWith("Enabled"))
        return "text-teal-11";
      if (e.value.startsWith("Disabled"))
        return "text-ruby-11";
    }
    return "text-secondary";
  }
  getIcon(e, a2) {
    switch (e) {
      case "Browser": {
        const n = typeof a2 == "string" ? a2.toLowerCase() : "";
        return n.includes("chrome") && !n.includes("edg") ? r.chrome : n.includes("firefox") ? r.firefox : n.includes("safari") && !n.includes("chrome") ? r.safari : n.includes("edg") ? r.edge : r.webAsset;
      }
      case "Copilot":
        return r.vaadin;
      case "Flow":
        return r.flow;
      case "Frontend Hotswap":
        return r.swapHoriz;
      case "Java":
        return r.java;
      case "OS": {
        const n = typeof a2 == "string" ? a2.toLowerCase() : "";
        return n.includes("mac") ? r.apple : n.includes("win") ? r.windows : r.computer;
      }
      case "Spring":
        return r.spring;
      case "Spring Boot":
        return r.springBoot;
      case "Spring Data JPA":
        return r.springData;
      case "Spring Security":
        return r.springSecurity;
      case "Vaadin":
      case "Vaadin Employee":
        return r.vaadin;
      case "Java Hotswap":
        return r.swapHoriz;
      case "IDE Plugin":
        return typeof a2 != "string" ? r.developerModeTv : a2.toLowerCase() === "intellij" ? r.intelliJ : a2.toLowerCase() === "vscode" ? r.vsCode : a2.toLowerCase() === "eclipse" ? r.eclipse : r.developerModeTv;
      default:
        return null;
    }
  }
};
u([
  a()
], p.prototype, "sortedEntries", 2);
p = u([
  Oi("copilot-info-panel")
], p);
let f = class extends dc {
  createRenderRoot() {
    return this;
  }
  connectedCallback() {
    super.connectedCallback(), this.style.display = "flex";
  }
  render() {
    return ce` <vaadin-button
      aria-label="Copy to clipboard"
      @click=${() => {
      y.emit("system-info-with-callback", {
        callback: F,
        notify: true
      });
    }}
      theme="icon tertiary">
      <vaadin-icon .svg="${r.fileCopy}"></vaadin-icon>
      <vaadin-tooltip slot="tooltip" text="Copy to clipboard"></vaadin-tooltip>
    </vaadin-button>`;
  }
};
f = u([
  Oi("copilot-info-actions")
], f);
const E = {
  header: "Info",
  tag: "copilot-info-panel",
  actionsTag: "copilot-info-actions",
  eager: true,
  // Render even when collapsed as error handling depends on this
  toolbarOptions: {
    iconKey: "info",
    allowedModesWithOrder: {
      common: 0
    }
  }
}, P = {
  init(e) {
    e.addPanel(E);
  }
};
window.Vaadin.copilot.plugins.push(P);
function S(e, a2) {
  let n;
  return e === true ? n = "text-teal-11" : e === "partial" ? n = "text-amber-11" : n = "text-ruby-11", ce`<span class="${n}">${a2}</span>`;
}
export {
  f as Actions,
  p as CopilotInfoPanel
};
