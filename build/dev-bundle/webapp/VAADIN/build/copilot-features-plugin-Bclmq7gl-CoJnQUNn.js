import { d as dc, f, e as S$1, g as go, H as Hc, c as ce, _, S as Sr, h as Mi, Z as Ze, W as Wc, a as Oi } from "./indexhtml-Crv9HnRQ.js";
import { a } from "./state-aTUQA9pO-CJ-X0rSy.js";
import { V } from "./base-panel-Djw-d72n-Bp8ldhFY.js";
import { r } from "./icons-CJYK-fIm-3aTajcIb.js";
import "./commonjsHelpers-CUmg6egw.js";
const n = (a2) => f.userInfo?.copilotExperimentalFeatureFlag === true && _.isExperimentalFeatureEnabled(a2), F = {
  id: "theme-from-image",
  name: "Theme from Image",
  description: "Generate a custom theme based on an image you provide.",
  enabled: () => n(F),
  available: () => f.appTheme === "lumo",
  requiresReload: false
}, R = {
  id: "ai-docs-assistant",
  name: "AI Docs Assistant",
  description: "AI-powered Vaadin documentation assistant.",
  enabled: () => n(R),
  available: () => true,
  requiresReload: false
}, $ = {
  id: "testbench-test-recorder",
  name: "TestBench Test Recorder",
  description: "Record user interactions to generate end-to-end Vaadin TestBench tests automatically.",
  enabled: () => n($),
  available: () => true,
  requiresReload: true
}, E = {
  id: "i18n",
  name: "Internationalization",
  description: "Edit and manage translations for your application.",
  enabled: () => n(E),
  available: () => true,
  requiresReload: true
}, O = [
  F,
  R,
  $,
  E
];
var M = Object.defineProperty, S = Object.getOwnPropertyDescriptor, d = (a2, e, t, i) => {
  for (var r2 = i > 1 ? void 0 : i ? S(e, t) : e, c = a2.length - 1, p; c >= 0; c--)
    (p = a2[c]) && (r2 = (i ? p(e, t, r2) : p(r2)) || r2);
  return i && r2 && M(e, t, r2), r2;
};
const g = window.Vaadin.devTools;
let m = class extends V {
  constructor() {
    super(...arguments), this.toggledFeaturesThatAreRequiresServerRestart = [];
  }
  connectedCallback() {
    super.connectedCallback(), this.classList.add("contents");
  }
  render() {
    const a2 = f.userInfo?.copilotExperimentalFeatureFlag;
    return ce`
      <div class="flex flex-col gap-6 px-4 py-0.5">
        <div class="border-dashed flex flex-col divide-y">
          ${f.featureFlags.slice().sort((e, t) => e.title.localeCompare(t.title)).map(
      (e) => ce`
                <div class="flex gap-2 justify-between py-3.5">
                  <div class="flex flex-col">
                    <label id="${e.id}-label">${e.title}</label>
                    <a
                      class="flex gap-0.5 text-xs"
                      href="${e.moreInfoLink}"
                      id="${e.id}-desc"
                      target="_blank"
                      rel="noopener noreferrer"
                      >More info<vaadin-icon class="icon-sm" .svg="${r.arrowOutward}"></vaadin-icon
                    ></a>
                  </div>
                  <copilot-toggle-button
                    .ariaLabelledby="${e.id}-label"
                    .ariaDescribedby="${e.id}-desc"
                    ?checked=${e.enabled}
                    @on-change=${(t) => this.toggleFeatureFlag(t, e)}>
                  </copilot-toggle-button>
                </div>
              `
    )}
        </div>
        <div class="flex flex-col gap-1">
          ${a2 ? ce`<h3 class="font-semibold my-0 text-sm">Copilot Experimental Features</h3>
                <div class="border-dashed flex flex-col divide-y">
                  ${O.filter((e) => e.available()).slice().sort((e, t) => e.name.localeCompare(t.name)).map(
      (e) => ce`
                        <div class="flex gap-2 justify-between py-3.5">
                          <div class="flex flex-col">
                            <label id="${e.id}-label">${e.description}</label>
                          </div>
                          <copilot-toggle-button
                            .ariaLabelledby="${e.id}-label"
                            ?checked=${_.isExperimentalFeatureEnabled(e)}
                            @on-change=${(t) => this.toggleExperimentalFeatureFlag(t, e)}>
                          </copilot-toggle-button>
                        </div>
                      `
    )}
                </div>` : S$1}
        </div>
      </div>
    `;
  }
  toggleFeatureFlag(a2, e) {
    const t = a2.target.checked;
    Sr("use-feature", { source: "toggle", enabled: t, id: e.id }), g.frontendConnection ? (g.frontendConnection.send("setFeature", { featureId: e.id, enabled: t }), e.requiresServerRestart && f.toggleServerRequiringFeatureFlag(e), Mi({
      type: Ze.INFORMATION,
      message: `“${e.title}” ${t ? "enabled" : "disabled"}`,
      details: e.requiresServerRestart ? Wc() : void 0,
      dismissId: `feature${e.id}${t ? "Enabled" : "Disabled"}`
    }), e.id === "copilotExperimentalFeatures" && f.userInfo && f.setUserInfo({ ...f.userInfo, copilotExperimentalFeatureFlag: t })) : g.log("error", `Unable to toggle feature ${e.title}: No server connection available`);
  }
  toggleExperimentalFeatureFlag(a2, e) {
    const t = a2.target.checked;
    Sr("use-experimental-feature", { source: "toggle", enabled: t, id: e.id });
    const i = _.isExperimentalFeatureEnabled(e);
    _.setExperimentalFeatureEnabled(e, t), e.requiresReload && t && !i && window.location.reload();
  }
};
d([
  a()
], m.prototype, "toggledFeaturesThatAreRequiresServerRestart", 2);
m = d([
  Oi("copilot-features-panel")
], m);
let b = class extends dc {
  constructor() {
    super(...arguments), this.serverRestarting = false;
  }
  createRenderRoot() {
    return this;
  }
  render() {
    if (f.serverRestartRequiringToggledFeatureFlags.length === 0)
      return S$1;
    if (!go())
      return S$1;
    const a2 = this.serverRestarting ? "Restarting..." : "Click to restart server";
    return ce`
      <button
        ?disabled="${this.serverRestarting}"
        id="restart-server-btn"
        class="icon ${this.serverRestarting ? "" : "fade-in-out"}"
        @click=${() => {
      this.serverRestarting = true, Hc();
    }}>
        <span>${r.refresh}</span>
      </button>
      <vaadin-tooltip for="restart-server-btn" text=${a2}></vaadin-tooltip>
    `;
  }
};
d([
  a()
], b.prototype, "serverRestarting", 2);
b = d([
  Oi("copilot-features-actions")
], b);
const D = {
  header: "Features",
  tag: "copilot-features-panel",
  helpUrl: "https://vaadin.com/docs/latest/flow/configuration/feature-flags",
  actionsTag: "copilot-features-actions",
  toolbarOptions: {
    allowedModesWithOrder: {
      common: 0
    },
    iconKey: "listAlt"
  }
}, P = {
  init(a2) {
    a2.addPanel(D);
  }
};
window.Vaadin.copilot.plugins.push(P);
export {
  b as CopilotFeaturesActions,
  m as CopilotFeaturesPanel
};
