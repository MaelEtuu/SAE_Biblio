import { d as dc, e as S$1, s as kr, c as ce, f, _ as _$1, U as Ui, cd as ad, S as Sr, O as Oe, u as od, j as We, a as Oi } from "./indexhtml-Crv9HnRQ.js";
import { a } from "./state-aTUQA9pO-CJ-X0rSy.js";
import { r } from "./icons-CJYK-fIm-3aTajcIb.js";
import "./commonjsHelpers-CUmg6egw.js";
var E = Object.defineProperty, S = Object.getOwnPropertyDescriptor, b = (e, n, a2, s) => {
  for (var o = s > 1 ? void 0 : s ? S(n, a2) : n, p = e.length - 1, u; p >= 0; p--)
    (u = e[p]) && (o = (s ? u(n, a2, o) : u(o)) || o);
  return s && o && E(n, a2, o), o;
};
const _ = "bg-[linear-gradient(to_right,var(--amber-3),var(--amber-5),var(--amber-3),var(--amber-6))] dark:bg-[linear-gradient(to_right,var(--amber-5),var(--amber-7),var(--amber-5),var(--amber-8))]", P = "bg-[linear-gradient(to_right,var(--blue-3),var(--blue-5),var(--blue-3),var(--blue-6))] dark:bg-[linear-gradient(to_right,var(--blue-4),var(--blue-6),var(--blue-4),var(--blue-7))]", A = "bg-[linear-gradient(to_right,var(--ruby-3),var(--ruby-5),var(--ruby-3),var(--ruby-6))] dark:bg-[linear-gradient(to_right,var(--ruby-4),var(--ruby-6),var(--ruby-4),var(--ruby-7))]", L = "bg-[linear-gradient(to_right,var(--teal-3),var(--teal-5),var(--teal-3),var(--teal-6))] dark:bg-[linear-gradient(to_right,var(--teal-4),var(--teal-6),var(--teal-4),var(--teal-7))]";
let v = class extends dc {
  constructor() {
    super(...arguments), this._helpExpanded = false;
  }
  createRenderRoot() {
    return this;
  }
  connectedCallback() {
    super.connectedCallback(), this.classList.add("flex", "flex-col");
  }
  render() {
    return ce`
      <header class="flex items-center pe-2 ps-4 py-2">
        <h2 class="font-bold gap-1 me-auto my-0 text-xs uppercase">Vaadin Copilot</h2>
        <vaadin-button
          aria-label="Close"
          theme="icon tertiary"
          @click=${() => {
      this.closePopover();
    }}>
          <vaadin-icon .svg="${r.close}"></vaadin-icon>
          <vaadin-tooltip slot="tooltip" text="Close"></vaadin-tooltip>
        </vaadin-button>
      </header>
      <div class="flex flex-col gap-4 pb-4 px-4">
        ${this.renderUserButton()} ${this.renderDevelopmentWorkflow()} ${this.renderWelcomeToVersion()}
        <div class="bg-gray-3 dark:bg-gray-6 flex flex-col rounded-md">
          <vaadin-button
            @click="${this.handleAppInfoClick}"
            class="border-0 h-auto justify-start py-2"
            theme="tertiary">
            <vaadin-icon slot="prefix" .svg="${r.info}"></vaadin-icon>
            App Info
          </vaadin-button>
          <vaadin-button @click="${this.handleAppLogClick}" class="border-0 h-auto justify-start py-2" theme="tertiary">
            <vaadin-icon slot="prefix" .svg="${r.terminal}"></vaadin-icon>
            App Log
          </vaadin-button>
          <vaadin-button
            @click="${this.handleFeaturesClick}"
            class="border-0 h-auto justify-start py-2"
            theme="tertiary">
            <vaadin-icon slot="prefix" .svg="${r.listAlt}"></vaadin-icon>
            Features
          </vaadin-button>
          ${kr.springSecurityEnabled ? ce`
                <vaadin-button
                  @click="${this.handleImpersonateAppUserClick}"
                  class="border-0 h-auto justify-start py-2"
                  theme="tertiary">
                  <vaadin-icon slot="prefix" .svg="${r.accountCircle}"></vaadin-icon>
                  Impersonate App User
                </vaadin-button>
              ` : S$1}
        </div>
        <div class="bg-gray-3 dark:bg-gray-6 flex flex-col rounded-md">
          <vaadin-button
            @click="${this.handleFeedbackClick}"
            class="border-0 h-auto justify-start py-2"
            theme="tertiary">
            <vaadin-icon slot="prefix" .svg="${r.feedback}"></vaadin-icon>
            Feedback
          </vaadin-button>
          <vaadin-button
            @click="${this.toggleHelpAndSupport}"
            class="border-0 h-auto justify-start py-2"
            theme="tertiary">
            <vaadin-icon slot="prefix" .svg="${r.help}"></vaadin-icon>
            Help & Support
            <vaadin-icon
              slot="suffix"
              .svg="${this._helpExpanded ? r.keyboardArrowUp : r.keyboardArrowDown}"></vaadin-icon>
          </vaadin-button>
          ${this._helpExpanded ? this.renderHelpLinks() : S$1}
          <vaadin-button
            @click="${this.handleSettingsClick}"
            class="border-0 h-auto justify-start py-2"
            theme="tertiary">
            <vaadin-icon slot="prefix" .svg="${r.settings}"></vaadin-icon>
            Settings
          </vaadin-button>
        </div>
      </div>
    `;
  }
  renderUserButton() {
    const e = f.userInfo?.validLicense, n = e ? _ : P, a2 = e ? "text-amber-12 dark:text-amber-11" : "text-blue-12 dark:text-blue-11", s = this.getUserName() !== "Log in";
    return ce`
      <vaadin-button
        @click=${this.handleUserLoginClick}
        class="animate-gradient ${n} border-0 h-auto justify-start py-2 text-start ${s ? "gap-3 px-3" : "items-start"}">
        ${s ? this.renderUserImage() : ce`<vaadin-icon
              class="text-blue-12 dark:text-blue-11"
              slot="prefix"
              .svg="${r.login}"></vaadin-icon>`}
        <span class="flex flex-col">
          <span>${this.getUserName()}</span>
          <span class="${a2} text-xs">${this.getLicenseType()}</span>
        </span>
      </vaadin-button>
    `;
  }
  renderWelcomeToVersion() {
    const e = f.projectVersionReleaseNoteInfo;
    return e === null ? S$1 : _$1.getMostRecentReleaseNoteDismissed() ? S$1 : e.mostRecentVersion ? e.url ? ce`
      <div class="flex relative">
      <vaadin-button
        id="release-note-btn"
        data-test-id="release-note-btn"
        class="border-0 h-auto items-start justify-start px-3 py-2 text-start w-full"
        @click="${(n) => {
      window.open(e.url, "_blank");
    }}">
        <vaadin-icon class="text-blue-11" slot="prefix" .svg="${r.info}"></vaadin-icon>
        <span class="flex flex-col">
          <span>Welcome to Vaadin ${e.vaadinVersion}</span>
          <span class="text-blue-11 text-xs">Click for release notes</span>
        </span>
      </vaadin-button>
      <vaadin-button
        class="absolute end-0 top-0"
        id="dismiss-release-note-item"
        theme="icon tertiary"
        @click="${(n) => {
      n.stopPropagation(), _$1.setMostRecentReleaseNoteDismissed(true);
    }}"
        ><vaadin-icon .svg="${r.close}"></vaadin-icon
        <vaadin-tooltip slot="tooltip" text="Dismiss"></vaadin-tooltip>
      </vaadin-button>
      </div>
    ` : S$1 : S$1;
  }
  renderUserImage() {
    return f.userInfo?.portraitUrl ? ce`<img
        alt="${this.getUserName()}"
        class="rounded-full size-8 object-cover"
        slot="prefix"
        src="https://vaadin.com${f.userInfo.portraitUrl}" />` : S$1;
  }
  renderDevelopmentWorkflow() {
    const e = Ui(), n = ad(), a2 = this.getDevelopmentWorkflowConfig(e, n), s = a2?.bgClass ?? "", o = a2?.colorClass ?? "", p = this.resolveIcon(a2), u = a2?.rotateIcon ? `rotate-180 ${o}` : o, h = this.resolveTitle(a2), f2 = a2?.displayMessage ?? "";
    return ce`
      <vaadin-button
        data-test-id="development-workflow-btn"
        @click="${this.handleDevelopmentWorkflowClick}"
        class="animation-delay-4000 animate-gradient ${s} border-0 h-auto items-start justify-start py-2 text-start">
        <vaadin-icon class="${u}" slot="prefix" .svg="${p}"></vaadin-icon>
        <span class="flex flex-col">
          <span>${h}</span>
          <span class="text-xs ${o}">${f2}</span>
        </span>
      </vaadin-button>
    `;
  }
  getDevelopmentWorkflowConfig(e, n) {
    const a2 = {
      bgClass: L,
      colorClass: "text-teal-11"
    };
    if (e === "warning" && n === "warning")
      return {
        ...a2,
        icon: r.wbIncandescent,
        rotateIcon: true,
        title: "IDE plugin & Hotswap recommended",
        combinedTitle: true,
        displayMessage: "Enable both for optimal development workflow"
      };
    if (e === "warning")
      return {
        ...a2,
        icon: r.wbIncandescent,
        rotateIcon: true,
        title: "Hotswap recommended",
        displayMessage: "Applies changes without restarting"
      };
    if (n === "warning")
      return {
        ...a2,
        icon: r.code,
        getIcon: true,
        title: "IDE plugin recommended",
        getTitle: true,
        displayMessage: "Simplifies Hotswap setup & config"
      };
    if (e === "error")
      return {
        bgClass: A,
        colorClass: "text-ruby-11",
        icon: r.error,
        title: "Hotswap partially enabled",
        displayMessage: "View details"
      };
  }
  resolveIcon(e) {
    return e ? e.getIcon ? this.getIdeIcon() : e.icon : r.bolt;
  }
  resolveTitle(e) {
    return e ? e.combinedTitle ? this.getCombinedTitle() : e.getTitle ? this.getIdePluginName() : e.title : "Development Workflow";
  }
  getUserName() {
    return [f.userInfo?.firstName, f.userInfo?.lastName].filter(Boolean).join(" ") || "Log in";
  }
  getLicenseType() {
    return f.userInfo?.validLicense ? "" : "Unlock all Copilot features, including AI";
  }
  getIdeIcon() {
    switch (f.idePluginState?.ide) {
      case "intellij":
        return r.intelliJ;
      case "vscode":
        return r.vsCode;
      case "eclipse":
        return r.eclipse;
      default:
        return r.code;
    }
  }
  getIdePluginName() {
    switch (f.idePluginState?.ide) {
      case "intellij":
        return "Vaadin plugin for IntelliJ";
      case "vscode":
        return "Vaadin extension for VS Code";
      case "eclipse":
        return "Vaadin plugin for Eclipse";
      default:
        return "IDE plugin";
    }
  }
  getCombinedTitle() {
    switch (f.idePluginState?.ide) {
      case "intellij":
        return "IntelliJ plugin & Hotswap recommended";
      case "vscode":
        return "VS Code extension & Hotswap recommended";
      case "eclipse":
        return "Eclipse plugin & Hotswap recommended";
      default:
        return "IDE plugin & Hotswap recommended";
    }
  }
  closePopover() {
    const e = this.closest("vaadin-popover");
    e && (e.opened = false);
  }
  handleUserLoginClick() {
    if (f.userInfo?.validLicense) {
      window.open("https://vaadin.com/myaccount", "_blank", "noopener");
      return;
    }
    f.setLoginCheckActive(true);
  }
  handleDevelopmentWorkflowClick() {
    Sr("use-dev-workflow-guide"), Oe.openPanel(od), this.closePopover();
  }
  handleAppInfoClick() {
    Oe.openPanel(We.INFO), this.closePopover();
  }
  handleAppLogClick() {
    Oe.openPanel(We.LOG), this.closePopover();
  }
  handleFeaturesClick() {
    Oe.openPanel(We.FEATURES), this.closePopover();
  }
  handleImpersonateAppUserClick() {
    Oe.openPanel(We.IMPERSONATOR), this.closePopover();
  }
  handleSettingsClick() {
    Oe.openPanel(We.SETTINGS), this.closePopover();
  }
  handleFeedbackClick() {
    Oe.openPanel(We.FEEDBACK), this.closePopover();
  }
  toggleHelpAndSupport() {
    this._helpExpanded = !this._helpExpanded;
  }
  renderHelpLinks() {
    return ce`
      <div class="flex flex-col ps-4">
        ${[
      { label: "Forum", icon: "forum", url: "https://vaadin.com/forum" },
      { label: "Docs", icon: "article", url: "https://vaadin.com/docs/latest/tools/copilot" },
      { label: "GitHub Issues", icon: "github", url: "https://github.com/vaadin/copilot/issues" }
    ].map(
      ({ label: n, icon: a2, url: s }) => ce`
            <vaadin-button
              @click="${() => window.open(s, "_blank", "noopener")}"
              class="border-0 h-auto justify-start py-2"
              theme="tertiary">
              <vaadin-icon slot="prefix" .svg="${r[a2]}"></vaadin-icon>
              ${n}
            </vaadin-button>
          `
    )}
      </div>
    `;
  }
};
b([
  a()
], v.prototype, "_helpExpanded", 2);
v = b([
  Oi("copilot-devtools")
], v);
export {
  v as CopilotDevTools
};
