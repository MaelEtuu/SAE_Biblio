import { j as We, _, k as Mc, c as ce, S as Sr, e as S, l as ip, f, m as mr, n as _d, i as ot, q as qc, a as Oi } from "./indexhtml-Crv9HnRQ.js";
import { a } from "./state-aTUQA9pO-CJ-X0rSy.js";
import { r } from "./icons-CJYK-fIm-3aTajcIb.js";
import { y } from "./lit-renderer-CWzNMnPU-DZemISB-.js";
import { V } from "./base-panel-Djw-d72n-Bp8ldhFY.js";
import "./commonjsHelpers-CUmg6egw.js";
import "./directive-helpers-BuSA7Eqp-iDDDRuBB.js";
/**
 * @license
 * Copyright (c) 2017 - 2025 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
class A extends y {
  /**
   * Adds the renderer callback to the select.
   */
  addRenderer() {
    this.element.renderer = (i, d) => {
      this.renderRenderer(i, d);
    };
  }
  /**
   * Runs the renderer callback on the select.
   */
  runRenderer() {
    this.element.requestContentUpdate();
  }
  /**
   * Removes the renderer callback from the select.
   */
  removeRenderer() {
    this.element.renderer = null;
  }
}
const g = qc(A), m = window.Vaadin.copilot.tree;
if (!m)
  throw new Error("Tried to access copilot tree before it was initialized.");
var I = Object.defineProperty, E = Object.getOwnPropertyDescriptor, c = (s, i, d, p) => {
  for (var e = p > 1 ? void 0 : p ? E(i, d) : i, r2 = s.length - 1, v; r2 >= 0; r2--)
    (v = s[r2]) && (e = (p ? v(i, d, e) : v(e)) || e);
  return p && e && I(i, d, e), e;
};
let n = class extends V {
  constructor() {
    super(...arguments), this.selectedTab = 0, this.activationShortcutEnabled = _.isActivationShortcut(), this.aiUsage = _.isAIUsageAllowed(), this.aiProvider = _.getAIProvider(), this.hideCopilotRequestOngoing = false, this.hideCopilotDialogVisible = false, this.sizeItems = [
      { label: "Default", value: "default" },
      { label: "Compact", value: "compact" }
    ], this.themeItems = [
      { label: "System", value: "system" },
      { label: "Light", value: "light" },
      { label: "Dark", value: "dark" }
    ], this.toolbarExpandModeItems = [
      {
        label: "Proximity",
        value: "proximity",
        description: "The toolbar expands and becomes fully visible as the mouse pointer approaches it."
      },
      {
        label: "Click",
        value: "click",
        description: "The toolbar expands and becomes fully visible when Play mode is clicked."
      },
      {
        label: "Hover",
        value: "hover",
        description: "The toolbar expands and becomes fully visible when the mouse hovers over it."
      },
      {
        label: "Always expanded",
        value: "always",
        description: "The toolbar remains fully visible at all times and never collapses or becomes translucent."
      },
      {
        label: "Disabled",
        value: "never",
        description: "Only Play mode is visible. Changing Copilot mode is not available, and keyboard shortcuts are disabled."
      }
    ], this.badgePositionItems = [
      {
        label: "Smart",
        value: "smart",
        description: "Automatically finds the best position by avoiding overlaps with nearby elements."
      },
      {
        label: "Static",
        value: "static",
        description: "Keeps the badge in a predefined position regardless of surrounding elements."
      }
    ], this.aiUsageItems = [
      { label: "Ask each time", value: "ask" },
      { label: "Allow", value: "yes" },
      { label: "Deny", value: "no" }
    ], this.aiProviderItems = [
      { label: "Any region", value: "ANY" },
      { label: "EU only", value: "EU_ONLY" }
    ], this.toggleActivationShortcut = () => {
      this.activationShortcutEnabled = !this.activationShortcutEnabled, _.setActivationShortcut(this.activationShortcutEnabled);
    };
  }
  connectedCallback() {
    super.connectedCallback(), this.classList.add("flex", "flex-col", "h-full");
  }
  updated(s) {
    super.updated(s);
  }
  renderKbd(s) {
    const i = s.replace(/<kbd([^>]*)class="([^"]*)"/, '<kbd$1class="$2 font-sans ms-auto"').replace(/<kbd(?![^>]*class=)/, '<kbd class="font-sans ms-auto"');
    return Mc(i);
  }
  render() {
    return ce`
      <vaadin-tabs>
        <vaadin-tab ?selected=${this.selectedTab === 0} @click=${() => this.selectedTab = 0}>General</vaadin-tab>
        <vaadin-tab ?selected=${this.selectedTab === 1} @click=${() => this.selectedTab = 1}>Shortcuts</vaadin-tab>
        <vaadin-tab ?selected=${this.selectedTab === 2} @click=${() => this.selectedTab = 2}>AI</vaadin-tab>
      </vaadin-tabs>
      ${this.selectedTab === 0 ? this.renderGeneralTab() : null}
      ${this.selectedTab === 1 ? this.renderShortcutsTab() : null} ${this.selectedTab === 2 ? this.renderAiTab() : null}
    `;
  }
  renderGeneralTab() {
    const s = _.getSelectedSize(), i = _.getSelectedTheme(), d = _.getToolbarExpandMode(), p = _.getBadgePositionMode();
    return ce`
      <div class="border-dashed flex flex-col flex-grow divide-y pb-4 pt-0.5 px-4" part="general-tab-container">
        <div class="flex gap-2 items-start justify-between py-2">
          <label class="py-1.5" id="size">Size</label>
          <vaadin-select
            accessible-name-ref="size"
            class="flex-shrink-0"
            theme="auto-width no-border"
            .items="${this.sizeItems}"
            .value="${s}"
            @change="${(e) => {
      _.setSelectedSize(e.target.value);
    }}"></vaadin-select>
        </div>
        <div class="flex gap-2 items-start justify-between py-2">
          <label class="py-1.5" id="theme">Theme</label>
          <vaadin-select
            accessible-name-ref="theme"
            class="flex-shrink-0"
            theme="auto-width no-border"
            .items="${this.themeItems}"
            .value="${i}"
            @change="${(e) => {
      _.setSelectedTheme(
        e.target.value
      );
    }}"></vaadin-select>
        </div>
        <div class="flex gap-2 items-start justify-between py-2">
          <div class="flex flex-col py-1.5">
            <label id="toolbar-button-expand-mode">Toolbar behavior</label>
            <span class="text-secondary text-xs">How it appears & expands</span>
          </div>
          <vaadin-select
            accessible-name-ref="toolbar-expand-mode"
            class="flex-shrink-0"
            theme="auto-width no-border"
            .value="${d}"
            ${g(
      () => ce`
                <vaadin-list-box class="max-w-xs">
                  ${this.toolbarExpandModeItems.map(
        (e) => ce`
                      <vaadin-item class="items-start" label="${e.label}" value="${e.value}">
                        <span class="flex flex-col gap-0.5">
                          <span>${e.label}</span>
                          <span class="text-secondary text-xs">${e.description}</span>
                        </span>
                      </vaadin-item>
                    `
      )}
                </vaadin-list-box>
              `
    )}
            @change="${(e) => {
      const r2 = _.getToolbarExpandMode();
      _.setToolbarExpandMode(
        e.target.value
      ), Sr("toolbar-expand-mode-change", {
        selected: _.getToolbarExpandMode(),
        previous: r2
      });
    }}"></vaadin-select>
        </div>
        <div class="flex gap-2 items-start justify-between py-2">
          <div class="flex flex-col py-1.5">
            <label id="toolbar-button-expand-mode">Badge positioning</label>
            <span class="text-secondary text-xs">How it is placed</span>
          </div>
          <vaadin-select
            accessible-name-ref="badge-position-mode"
            class="flex-shrink-0"
            theme="auto-width no-border"
            .value="${p}"
            ${g(
      () => ce`
                <vaadin-list-box class="max-w-xs">
                  ${this.badgePositionItems.map(
        (e) => ce`
                      <vaadin-item class="items-start" label="${e.label}" value="${e.value}">
                        <span class="flex flex-col gap-0.5">
                          <span>${e.label}</span>
                          <span class="text-secondary text-xs">${e.description}</span>
                        </span>
                      </vaadin-item>
                    `
      )}
                </vaadin-list-box>
              `
    )}
            @change="${(e) => {
      const r2 = _.getBadgePositionMode();
      _.setBadgePositionMode(
        e.target.value
      ), Sr("badge-position-mode-changed", {
        selected: _.getBadgePositionMode(),
        previous: r2
      });
    }}"></vaadin-select>
        </div>
        <div class="flex gap-2 justify-between py-3.5">
          <div class="flex flex-col">
            <label id="reduce-motion-label">Reduce motion</label>
            <span id="reduce-motion-desc" class="text-secondary text-xs">Disables animations</span>
          </div>
          <button
            aria-checked="true"
            aria-labelledby="reduce-motion-label"
            aria-describedby="reduce-motion-desc"
            class="my-px"
            role="switch"
            type="button">
            <span></span>
          </button>
        </div>
        <div class="flex gap-2 justify-between mb-4 py-3.5">
          <div class="flex flex-col">
            <label id="error-reports-label">Send error reports</label>
            <span id="error-reports-desc" class="text-secondary text-xs">Helps us improve the user experience</span>
          </div>
          <button
            aria-checked="true"
            aria-labelledby="error-reports-label"
            aria-describedby="error-reports-desc"
            class="my-px"
            role="switch"
            type="button">
            <span></span>
          </button>
        </div>
        <vaadin-button
          data-test-id="hide-copilot-btn"
          @click="${this.handleHideCopilotButtonClick}"
          class="justify-start mt-auto self-start">
          <vaadin-icon slot="prefix" .svg="${r.close}"></vaadin-icon>
          Hide Copilot until server restart
        </vaadin-button>
      </div>

      <vaadin-confirm-dialog
        id="hideCopilotDialog"
        header="Temporarily Hide Copilot"
        .confirmText=${this.hideCopilotRequestOngoing ? "Hiding…" : "Continue"}
        cancel-text="Cancel"
        cancel-button-visible
        confirm-theme="primary"
        .confirmDisabled=${this.hideCopilotRequestOngoing}
        .cancelDisabled=${this.hideCopilotRequestOngoing}
        .noCloseOnEsc=${this.hideCopilotRequestOngoing}
        .opened="${this.hideCopilotDialogVisible}"
        .noCloseOnOutsideClick=${this.hideCopilotRequestOngoing}
        @cancel=${() => {
      this.hideCopilotDialogVisible = false;
    }}
        @confirm=${this.onDisableConfirm}>
        This will hide the Copilot until the server restarts. The page will reload to apply the change. Do you want to
        continue?
        ${this.hideCopilotRequestOngoing ? ce`
              <div style="display:flex; align-items:center; gap:var(--lumo-space-s); margin-top:var(--lumo-space-m);">
                <vaadin-progress-indicator indeterminate></vaadin-progress-indicator>
                <span>Hiding…</span>
              </div>
            ` : null}
      </vaadin-confirm-dialog>
    `;
  }
  renderShortcutsTab() {
    const s = m.hasFlowComponents();
    return ce`<div class="flex flex-col gap-4 pb-2 pt-4 px-4 ">
      <div class="flex justify-between">
        <div class="flex flex-col">
          <label id="enable-shortcuts-label">Enable keyboard shortcut</label>
          <span id="enable-shortcuts-desc" class="text-secondary text-xs"
            >Switch anytime to Play mode with ${this.renderKbd(ip.toggleCopilot)}</span
          >
        </div>
        <button
          aria-checked="${this.activationShortcutEnabled}"
          aria-labelledby="enable-shortcuts-label"
          aria-describedby="enable-shortcuts-desc"
          class="my-px"
          role="switch"
          type="button"
          @click=${() => this.toggleActivationShortcut()}>
          <span></span>
        </button>
      </div>
      <div class="flex flex-col gap-1">
        <h3 class="font-semibold my-0 text-sm">Global</h3>
        <ul class="border-dashed divide-y flex flex-col list-none m-0 p-0">
          <li class="flex gap-2 py-2">
            <vaadin-icon .svg="${r.vaadin}"></vaadin-icon>
            <span>Switch Play Mode / Last Mode</span>
            ${this.renderKbd(ip.toggleCopilot)}
          </li>
          <li class="flex gap-2 py-2">
            <vaadin-icon .svg="${r.undo}"></vaadin-icon>
            <span>Undo</span>
            ${this.renderKbd(ip.undo)}
          </li>
          <li class="flex gap-2 py-2">
            <vaadin-icon .svg="${r.redo}"></vaadin-icon>
            <span>Redo</span>
            ${this.renderKbd(ip.redo)}
          </li>
        </ul>
      </div>
      <div class="flex flex-col gap-1">
        <h3 class="font-semibold my-0 text-sm">Component Selection</h3>
        <ul class="border-dashed divide-y flex flex-col list-none m-0 p-0">
          <li class="flex gap-2 py-2">
            <vaadin-icon .svg="${r.sparkles}"></vaadin-icon>
            <span>Open AI prompt</span>
            ${this.renderKbd(ip.openAiPopover)}
          </li>
          <li class="flex gap-2 py-2">
            <vaadin-icon .svg="${r.code}"></vaadin-icon>
            <span>Go to source</span>
            ${this.renderKbd(ip.goToSource)}
          </li>
          ${s ? ce`<li class="flex gap-2 py-2">
                <vaadin-icon .svg="${r.code}"></vaadin-icon>
                <span>Go to attach source</span>
                ${this.renderKbd(ip.goToAttachSource)}
              </li>` : S}
          <li class="flex gap-2 py-2">
            <vaadin-icon .svg="${r.contentCopy}"></vaadin-icon>
            <span>Copy</span>
            ${this.renderKbd(ip.copy)}
          </li>
          <li class="flex gap-2 py-2">
            <vaadin-icon .svg="${r.contentPaste}"></vaadin-icon>
            <span>Paste</span>
            ${this.renderKbd(ip.paste)}
          </li>
          <li class="flex gap-2 py-2">
            <vaadin-icon .svg="${r.fileCopy}"></vaadin-icon>
            <span>Duplicate</span>
            ${this.renderKbd(ip.duplicate)}
          </li>
          <li class="flex gap-2 py-2">
            <vaadin-icon .svg="${r.turnLeft}"></vaadin-icon>
            <span>Select parent</span>
            ${this.renderKbd(ip.selectParent)}
          </li>
          <li class="flex gap-2 py-2">
            <vaadin-icon .svg="${r.north}"></vaadin-icon>
            <span>Select previous sibling</span>
            ${this.renderKbd(ip.selectPreviousSibling)}
          </li>
          <li class="flex gap-2 py-2">
            <vaadin-icon .svg="${r.south}"></vaadin-icon>
            <span>Select first child / next sibling</span>
            ${this.renderKbd(ip.selectNextSibling)}
          </li>
          <li class="flex gap-2 py-2">
            <vaadin-icon .svg="${r.delete}"></vaadin-icon>
            <span>Delete</span>
            ${this.renderKbd(ip.delete)}
          </li>
          <li class="flex gap-2 py-2">
            <vaadin-icon .svg="${r.dashboardCustomize}"></vaadin-icon>
            <span>Add component</span>
            <kbd class="font-sans ms-auto">A – Z</kbd>
          </li>
        </ul>
      </div>
    </div>`;
  }
  renderAiTab() {
    const s = f.userInfo?.vaadiner;
    return ce`<div class="border-dashed flex flex-col divide-y px-4 py-0.5">
      <div class="flex gap-2 items-start justify-between py-2">
        <div class="flex flex-col py-1.5">
          <label id="ai-usage">AI usage</label>
          <span class="text-secondary text-xs">All AI features are clearly labelled </span>
        </div>
        <vaadin-select
          accessible-name-ref="ai-usage"
          class="flex-shrink-0"
          theme="auto-width no-border"
          .items="${this.aiUsageItems}"
          .value="${this.aiUsage}"
          @value-changed="${(i) => {
      this.aiUsage = i.detail.value, _.setAIUsageAllowed(i.detail.value);
    }}"></vaadin-select>
      </div>
      ${s ? ce`<div class="flex gap-2 items-start justify-between py-2">
            <label class="py-1.5" id="ai-provider">AI provider</label>
            <vaadin-select
              accessible-name-ref="ai-provider"
              class="flex-shrink-0"
              theme="auto-width no-border"
              .items="${this.aiProviderItems}"
              .value="${this.aiProvider}"
              @value-changed="${(i) => {
      this.aiProvider = i.detail.value, _.setAIProvider(i.detail.value);
    }}"></vaadin-select>
          </div>` : S}
    </div>`;
  }
  handleHideCopilotButtonClick() {
    this.hideCopilotDialogVisible = true;
  }
  onDisableConfirm() {
    this.hideCopilotRequestOngoing = true, mr(`${ot}hide-copilot`, {}, (s) => {
      _d(s.data, {}) || (this.hideCopilotRequestOngoing = false, window.location.reload());
    });
  }
};
c([
  a()
], n.prototype, "selectedTab", 2);
c([
  a()
], n.prototype, "activationShortcutEnabled", 2);
c([
  a()
], n.prototype, "aiUsage", 2);
c([
  a()
], n.prototype, "aiProvider", 2);
c([
  a()
], n.prototype, "hideCopilotRequestOngoing", 2);
c([
  a()
], n.prototype, "hideCopilotDialogVisible", 2);
n = c([
  Oi("copilot-settings-panel")
], n);
const D = {
  header: "Settings",
  tag: We.SETTINGS
}, O = {
  init(s) {
    s.addPanel(D);
  }
};
window.Vaadin.copilot.plugins.push(O);
export {
  n as CopilotSettingsPanel,
  D as panelConfig
};
