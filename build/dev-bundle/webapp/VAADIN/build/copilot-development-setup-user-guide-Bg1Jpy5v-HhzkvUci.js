import { r } from "./icons-CJYK-fIm-3aTajcIb.js";
import { u as od, d as dc, O as Oe, c as ce, v as ft, s as kr, f, U as Ui, y, V as Vd, w as Id, e as S$1, x as rp, m as mr, z as qe, i as ot, D as Dd, A as zd, a as Oi } from "./indexhtml-Crv9HnRQ.js";
import { a } from "./state-aTUQA9pO-CJ-X0rSy.js";
import { V } from "./base-panel-Djw-d72n-Bp8ldhFY.js";
import "./commonjsHelpers-CUmg6egw.js";
var O = Object.defineProperty, U = Object.getOwnPropertyDescriptor, g = (e, t, a2, s) => {
  for (var o = s > 1 ? void 0 : s ? U(t, a2) : t, i = e.length - 1, d; i >= 0; i--)
    (d = e[i]) && (o = (s ? d(t, a2, o) : d(o)) || o);
  return s && o && O(t, a2, o), o;
};
const S = "https://github.com/JetBrains/JetBrainsRuntime/releases";
function _(e, t) {
  if (!t)
    return true;
  const [a2, s, o] = t.split(".").map((v) => parseInt(v)), [i, d, h] = e.split(".").map((v) => parseInt(v));
  if (a2 < i)
    return true;
  if (a2 === i) {
    if (s < d)
      return true;
    if (s === d)
      return o < h;
  }
  return false;
}
const P = "Download complete";
let u = class extends V {
  constructor() {
    super(), this.javaPluginSectionOpened = false, this.hotswapSectionOpened = false, this.hotswapTab = "hotswapagent", this.downloadStatusMessages = [], this.downloadProgress = 0, this.onDownloadStatusUpdate = this.downloadStatusUpdate.bind(this), this.handleESC = (e) => {
      ft().appInteractable || e.key === "Escape" && Oe.openPanel(w.tag);
    }, this.reaction(
      () => [kr.jdkInfo, f.idePluginState],
      () => {
        f.idePluginState && (!f.idePluginState.ide || !f.idePluginState.active ? this.javaPluginSectionOpened = true : (!(/* @__PURE__ */ new Set(["vscode", "intellij"])).has(f.idePluginState.ide) || !f.idePluginState.active) && (this.javaPluginSectionOpened = false)), kr.jdkInfo && Ui() !== "success" && (this.hotswapSectionOpened = true);
      },
      { fireImmediately: true }
    );
  }
  createRenderRoot() {
    return this;
  }
  connectedCallback() {
    super.connectedCallback(), this.classList.add("contents"), y.on("set-up-vs-code-hotswap-status", this.onDownloadStatusUpdate);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), y.off("set-up-vs-code-hotswap-status", this.onDownloadStatusUpdate);
  }
  render() {
    const e = {
      intellij: f.idePluginState?.ide === "intellij",
      vscode: f.idePluginState?.ide === "vscode",
      eclipse: f.idePluginState?.ide === "eclipse",
      idePluginInstalled: !!f.idePluginState?.active
    };
    return ce`
      ${this.renderPluginSection(e)}
      <hr class="border-b border-e-0 border-s-0 border-t-0 mx-4 my-0" />
      ${this.renderHotswapSection(e)}
    `;
  }
  renderPluginSection(e) {
    let t = "";
    e.intellij ? t = "IntelliJ" : e.vscode ? t = "VS Code" : e.eclipse && (t = "Eclipse");
    let a2, s;
    e.vscode || e.intellij ? e.idePluginInstalled ? (a2 = `Plugin for ${t} installed`, s = this.renderPluginInstalledContent()) : (a2 = `Plugin for ${t} not installed`, s = this.renderPluginIsNotInstalledContent(e)) : e.eclipse ? (a2 = e.idePluginInstalled ? "Eclipse plugin installed" : "Eclipse plugin not installed", s = e.idePluginInstalled ? this.renderPluginInstalledContent() : this.renderEclipsePluginContent()) : (a2 = "No IDE found", s = this.renderNoIdePluginContent());
    const o = e.idePluginInstalled ? r.checkCircle : r.warning;
    return ce`
      <vaadin-details
        theme="reverse"
        .opened=${this.javaPluginSectionOpened}
        @opened-changed=${(i) => {
      Vd(() => {
        this.javaPluginSectionOpened = i.detail.value;
      }), this.requestLayoutUpdate();
    }}>
        <vaadin-details-summary class="px-4 py-3.5" slot="summary">
          <div class="flex gap-1.5">
            <vaadin-icon
              class="${e.idePluginInstalled ? "text-teal-11" : "text-ruby-11"}"
              .svg=${o}></vaadin-icon>
            <span>${a2}</span>
          </div>
        </vaadin-details-summary>
        <div>${s}</div>
      </vaadin-details>
    `;
  }
  renderNoIdePluginContent() {
    return ce`
      <div class="flex flex-col gap-2 pb-4 px-4">
        <p class="m-0 text-secondary">
          For the best development experience, use
          <a class="gap-1 inline-flex items-center" href="https://code.visualstudio.com"
            ><vaadin-icon class="icon-sm" .svg=${r.vsCode}></vaadin-icon>Visual Studio Code</a
          >
          or
          <a class="gap-1 inline-flex items-center" href="https://www.jetbrains.com/idea"
            ><vaadin-icon class="icon-sm" .svg=${r.intelliJ}></vaadin-icon>IntelliJ IDEA</a
          >.
        </p>
      </div>
    `;
  }
  renderEclipsePluginContent() {
    return ce`
      <div class="flex flex-col gap-2 items-start pb-4 px-4">
        <p class="m-0 text-secondary">Install the Vaadin Eclipse Plugin to ensure a smooth development workflow</p>
        <p class="m-0 text-secondary">
          Installing the plugin is not required, but strongly recommended. Some Vaadin Copilot functionality, such as
          undo, will not function optimally without the plugin.
        </p>
        <vaadin-button
          class="mt-2"
          @click="${() => {
      window.open(Id, "_blank");
    }}"
          >Install from Eclipse Marketplace
          <vaadin-icon slot="suffix" .svg="${r.arrowOutward}"></vaadin-icon>
        </vaadin-button>
      </div>
    `;
  }
  renderPluginInstalledContent() {
    return ce`
      <p class="m-0 pb-4 px-4 text-secondary">You have a running plugin. Enjoy your awesome development workflow!</p>
    `;
  }
  renderPluginIsNotInstalledContent(e) {
    let t = null, a2 = "Install from Marketplace";
    return e.intellij ? (t = Dd, a2 = "Install from JetBrains Marketplace") : e.vscode ? (t = zd, a2 = "Install from VSCode Marketplace") : e.eclipse && (t = Id, a2 = "Install from Eclipse Marketplace"), ce`
      <div class="flex flex-col gap-2 items-start pb-4 px-4">
        <p class="m-0 text-secondary">Install the Vaadin IDE Plugin to ensure a smooth development workflow</p>
        <p class="m-0 text-secondary">
          Installing the plugin is not required, but strongly recommended. Some Vaadin Copilot functionality, such as
          undo, will not function optimally without the plugin.
        </p>
        ${t ? ce` <vaadin-button
              class="mt-2"
              @click="${() => {
      window.open(t, "_blank");
    }}"
              >${a2}
              <vaadin-icon slot="suffix" .svg="${r.arrowOutward}"></vaadin-icon>
            </vaadin-button>` : S$1}
      </div>
    `;
  }
  renderHotswapSection(e) {
    const { jdkInfo: t } = kr;
    if (!t)
      return S$1;
    const a2 = Ui(), s = rp();
    let o, i, d;
    return a2 === "success" ? (o = r.checkCircle, d = "Java Hotswap is enabled") : a2 === "warning" ? (o = r.warning, d = "Java Hotswap is not enabled") : a2 === "error" && (o = r.warning, d = "Java Hotswap is partially enabled"), this.hotswapTab === "jrebel" ? t.jrebel ? i = this.renderJRebelInstalledContent() : i = this.renderJRebelNotInstalledContent() : e.intellij ? i = this.renderIntelliJHotswapHint() : e.vscode ? i = this.renderVSCodeHotswapHint() : i = this.renderHotswapAgentNotInstalledContent(e), ce` <vaadin-details
      theme="reverse"
      .opened=${this.hotswapSectionOpened}
      @opened-changed=${(h) => {
      Vd(() => {
        this.hotswapSectionOpened = h.detail.value;
      }), this.requestLayoutUpdate();
    }}>
      <vaadin-details-summary class="px-4 py-3.5" slot="summary">
        <div class="flex gap-1.5">
          <vaadin-icon
            class="${a2 === "success" ? "text-teal-11" : "text-ruby-11"}"
            .svg=${o}></vaadin-icon>
          <span>${d}</span>
        </div>
      </vaadin-details-summary>
      <div>
        ${s !== "none" ? ce`${s === "jrebel" ? this.renderJRebelInstalledContent() : this.renderHotswapAgentInstalledContent()}` : ce`
              <vaadin-tabs
                .selected=${this.hotswapTab === "hotswapagent" ? 0 : 1}
                @selected-changed=${(h) => {
      this.hotswapTab = h.detail.value === 0 ? "hotswapagent" : "jrebel";
    }}>
                <vaadin-tab>Hotswap Agent</vaadin-tab>
                <vaadin-tab>JRebel</vaadin-tab>
              </vaadin-tabs>
              ${i}
            `}
      </div>
    </vaadin-details>`;
  }
  renderJRebelNotInstalledContent() {
    return ce`
      <div class="flex flex-col gap-2 p-4">
        <p class="m-0 text-secondary">
          <a class="inline-flex items-center" href="https://www.jrebel.com"
            >JRebel <vaadin-icon class="icon-sm" .svg=${r.arrowOutward}></vaadin-icon
          ></a>
          is a commercial hotswap solution. Vaadin detects the JRebel Agent and automatically reloads the application in
          the browser after the Java changes have been hotpatched.
        </p>
        <p class="m-0 text-secondary">
          Go to
          <a
            class="inline-flex items-center"
            href="https://www.jrebel.com/products/jrebel/learn"
            target="_blank"
            rel="noopener noreferrer">
            https://www.jrebel.com/products/jrebel/learn
            <vaadin-icon class="icon-sm" .svg=${r.arrowOutward}></vaadin-icon
          ></a>
          to get started.
        </p>
      </div>
    `;
  }
  renderHotswapAgentNotInstalledContent(e) {
    const t = [
      this.renderJavaRunningInDebugModeSection(),
      this.renderHotswapAgentJdkSection(e),
      this.renderInstallHotswapAgentJdkSection(e),
      this.renderHotswapAgentVersionSection(),
      this.renderHotswapAgentMissingArgParam(e)
    ];
    return ce` <div class="p-2">${t}</div> `;
  }
  renderIntelliJHotswapHint() {
    return ce` <div class="flex flex-col gap-2 p-4">
      <h3 class="font-semibold my-0 text-sm">Use 'Debug using Hotswap Agent' launch configuration</h3>
      <p class="m-0 text-secondary">
        Vaadin IntelliJ plugin offers launch mode that does not require any manual configuration!
      </p>
      <p class="m-0 text-secondary">
        In order to run recommended launch configuration, you should click three dots right next to Debug button and
        select
        <code class="bg-gray-7 font-mono px-1 py-0.5 rounded-sm text-body text-xs">Debug using Hotswap Agent</code>
        option.
      </p>
    </div>`;
  }
  renderVSCodeHotswapHint() {
    return ce` <div>
      <h3 class="font-semibold my-0 text-sm">Use 'Debug (hotswap)'</h3>
      With Vaadin Visual Studio Code extension you can run Hotswap Agent without any manual configuration required!
      <p class="m-0">
        Click <code class="bg-gray-7 font-mono px-1 py-0.5 rounded-sm text-body text-xs">Debug (hotswap)</code> within
        your main class to debug application using Hotswap Agent.
      </p>
    </div>`;
  }
  renderJavaRunningInDebugModeSection() {
    const e = kr.jdkInfo?.runningInJavaDebugMode;
    return ce`
      <vaadin-details theme="reverse" .opened="${!e}">
        <vaadin-details-summary class="p-2" slot="summary">Run Java in debug mode</vaadin-details-summary>
        <p class="m-0 pb-2 px-2 text-secondary">Start the application in debug mode in the IDE.</p>
      </vaadin-details>
    `;
  }
  renderHotswapAgentMissingArgParam(e) {
    const t = kr.jdkInfo?.runningWitHotswap && kr.jdkInfo?.runningWithExtendClassDef;
    return ce`
      <vaadin-details theme="reverse" .opened="${!t}">
        <vaadin-details-summary class="p-2" slot="summary">Enable HotswapAgent</vaadin-details-summary>
        <div class="flex flex-col gap-2 pb-2 px-2 text-secondary">
          <ul class="m-0 ps-4">
            ${e.intellij ? ce`<li>Launch as mentioned in the previous step</li>` : S$1}
            ${e.intellij ? ce`<li>
                  To manually configure IntelliJ, add the
                  <code class="bg-gray-7 font-mono px-1 py-0.5 rounded-sm text-body text-xs"
                    >-XX:HotswapAgent=fatjar -XX:+AllowEnhancedClassRedefinition -XX:+UpdateClasses</code
                  >
                  JVM arguments when launching the application.
                </li>` : ce`<li>
                  Add the
                  <code class="bg-gray-7 font-mono px-1 py-0.5 rounded-sm text-body text-xs"
                    >-XX:HotswapAgent=fatjar -XX:+AllowEnhancedClassRedefinition -XX:+UpdateClasses</code
                  >
                  JVM arguments when launching the application.
                </li>`}
          </ul>
        </div>
      </vaadin-details>
    `;
  }
  renderHotswapAgentJdkSection(e) {
    const t = kr.jdkInfo?.extendedClassDefCapable, a2 = this.downloadStatusMessages?.[this.downloadStatusMessages.length - 1] === P;
    return ce`
      <vaadin-details theme="reverse" .opened="${!t}">
        <vaadin-details-summary class="p-2" slot="summary">Run using JetBrains Runtime JDK</vaadin-details-summary>
        <div class="flex flex-col gap-2 pb-2 px-2 text-secondary">
          <p class="m-0">JetBrains Runtime provides much better hotswapping compared to other JDKs.</p>
          <ul class="m-0 ps-4">
            ${e.intellij && _("1.3.0", f.idePluginState?.version) ? ce` <li>Upgrade to the latest IntelliJ plugin</li>` : S$1}
            ${e.intellij ? ce` <li>Launch the application in IntelliJ using "Debug using Hotswap Agent"</li>` : S$1}
            ${e.vscode ? ce` <li>
                  <a href @click="${(s) => this.downloadJetbrainsRuntime(s)}"
                    >Let Copilot download and set up JetBrains Runtime for VS Code</a
                  >
                  ${this.downloadProgress > 0 ? ce`<vaadin-progress-bar
                        .value="${this.downloadProgress}"
                        min="0"
                        max="1"></vaadin-progress-bar>` : S$1}
                  <ul>
                    ${this.downloadStatusMessages.map((s) => ce`<li>${s}</li>`)}
                    ${a2 ? ce`<h3 class="font-semibold my-0 text-sm">
                          Go to VS Code and launch the 'Debug using Hotswap Agent' configuration
                        </h3>` : S$1}
                  </ul>
                </li>` : S$1}
            <li>
              ${e.intellij || e.vscode ? ce`If there is a problem, you can manually
                    <a target="_blank" href="${S}">download JetBrains Runtime JDK</a> and set up your
                    debug configuration to use it.` : ce`<a target="_blank" href="${S}">Download JetBrains Runtime JDK</a> and set up
                    your debug configuration to use it.`}
            </li>
          </ul>
        </div>
      </vaadin-details>
    `;
  }
  renderInstallHotswapAgentJdkSection(e) {
    const t = kr.jdkInfo?.hotswapAgentFound, a2 = kr.jdkInfo?.extendedClassDefCapable;
    return ce`
      <vaadin-details theme="reverse" .opened="${!t}">
        <vaadin-details-summary class="p-2" slot="summary"> Install HotswapAgent </vaadin-details-summary>
        <div class="flex flex-col gap-2 pb-2 px-2 text-secondary">
          <p class="m-0">
            Hotswap Agent provides application level support for hot reloading, such as reinitalizing Vaadin @Route or
            @BrowserCallable classes when they are updated.
          </p>
          <ul class="m-0 ps-4">
            ${e.intellij ? ce`<li>Launch as mentioned in the previous step</li>` : S$1}
            ${!e.intellij && !a2 ? ce`<li>First install JetBrains Runtime as mentioned in the step above.</li>` : S$1}
            ${e.intellij ? ce`<li>
                  To manually configure IntelliJ, download HotswapAgent and install the jar file as
                  <code class="bg-gray-7 font-mono px-1 py-0.5 rounded-sm text-body text-xs"
                    >[JAVA_HOME]/lib/hotswap/hotswap-agent.jar</code
                  >
                  in the JetBrains Runtime JDK. Note that the file must be renamed to exactly match this path.
                </li>` : ce`<li>
                  Download HotswapAgent and install the jar file as
                  <code class="bg-gray-7 font-mono px-1 py-0.5 rounded-sm text-body text-xs"
                    >[JAVA_HOME]/lib/hotswap/hotswap-agent.jar</code
                  >
                  in the JetBrains Runtime JDK. Note that the file must be renamed to exactly match this path.
                </li>`}
          </ul>
        </div>
      </vaadin-details>
    `;
  }
  renderHotswapAgentVersionSection() {
    if (!kr.jdkInfo?.hotswapAgentFound)
      return S$1;
    const e = kr.jdkInfo?.hotswapVersionOk, t = kr.jdkInfo?.hotswapVersion, a2 = kr.jdkInfo?.hotswapAgentLocation;
    return ce`
      <vaadin-details theme="reverse" .opened="${!e}">
        <vaadin-details-summary class="p-2" slot="summary">Hotswap version requires update</vaadin-details-summary>
        <div>
          HotswapAgent version ${t} is in use
          <a target="_blank" href="https://github.com/HotswapProjects/HotswapAgent/releases"
            >Download the latest HotswapAgent</a
          >
          and place it in
          <code class="bg-gray-7 font-mono px-1 py-0.5 rounded-sm text-body text-xs">${a2}</code>
        </div>
      </vaadin-details>
    `;
  }
  renderJRebelInstalledContent() {
    return ce` <p class="m-0 pb-2 px-2">JRebel is in use. Enjoy your awesome development workflow!</p> `;
  }
  renderHotswapAgentInstalledContent() {
    return ce`
      <p class="m-0 pb-4 px-4 text-secondary">Hotswap agent is in use. Enjoy your awesome development workflow!</p>
    `;
  }
  async downloadJetbrainsRuntime(e) {
    return e.target.disabled = true, e.preventDefault(), this.downloadStatusMessages = [], mr(`${ot}set-up-vs-code-hotswap`, {}, (t) => {
      t.data.error ? (qe("Error downloading JetBrains runtime", t.data.error), this.downloadStatusMessages = [...this.downloadStatusMessages, "Download failed"]) : this.downloadStatusMessages = [...this.downloadStatusMessages, P];
    });
  }
  downloadStatusUpdate(e) {
    const t = e.detail.progress;
    t ? this.downloadProgress = t : this.downloadStatusMessages = [...this.downloadStatusMessages, e.detail.message];
  }
};
u.NAME = "copilot-development-setup-user-guide";
g([
  a()
], u.prototype, "javaPluginSectionOpened", 2);
g([
  a()
], u.prototype, "hotswapSectionOpened", 2);
g([
  a()
], u.prototype, "hotswapTab", 2);
g([
  a()
], u.prototype, "downloadStatusMessages", 2);
g([
  a()
], u.prototype, "downloadProgress", 2);
u = g([
  Oi(u.NAME)
], u);
let C = class extends dc {
  createRenderRoot() {
    return this;
  }
  render() {
    return ce`<vaadin-button
      id="close"
      @click="${() => Oe.closePanel(w.tag)}"
      >Close
    </vaadin-button>`;
  }
};
C = g([
  Oi("copilot-development-setup-footer-actions")
], C);
const w = {
  header: "Development Workflow",
  tag: od,
  footerActionsTag: "copilot-development-setup-footer-actions",
  individual: true
}, N = {
  init(e) {
    e.addPanel(w);
  }
};
window.Vaadin.copilot.plugins.push(N);
Oe.addPanel(w);
export {
  C as CopilotDevelopmentSetupFooterActions,
  u as CopilotDevelopmentSetupUserGuide,
  w as copilotDevelopmentSetupPanelConfig
};
