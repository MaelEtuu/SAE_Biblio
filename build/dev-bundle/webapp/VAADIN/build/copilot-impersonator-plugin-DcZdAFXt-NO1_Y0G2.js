import { _, s as kr, c as ce, m as mr, O as Oe, j as We, a as Oi } from "./indexhtml-Crv9HnRQ.js";
import { a as a$1 } from "./state-aTUQA9pO-CJ-X0rSy.js";
import { V } from "./base-panel-Djw-d72n-Bp8ldhFY.js";
import { r } from "./icons-CJYK-fIm-3aTajcIb.js";
import "./commonjsHelpers-CUmg6egw.js";
function b(e) {
  return mr("copilot-switch-user", { username: e }, (t) => t.data.error ? { success: false, errorMessage: t.data.error.message } : { success: true });
}
const u = "copilot-impersonator{display:flex;flex-direction:column;height:100%;overflow:auto}.impersonator-container{display:flex;flex-direction:column;gap:var(--lumo-space-l);padding:var(--lumo-space-m)}.impersonator-section{display:flex;flex-direction:column;gap:var(--lumo-space-s)}.section-title{margin:0;font-size:var(--lumo-font-size-m);font-weight:600;color:var(--lumo-body-text-color)}.section-description{margin:0;font-size:var(--lumo-font-size-s);color:var(--lumo-secondary-text-color)}.username-field{width:100%}.recent-users-list{display:flex;flex-direction:column;gap:var(--lumo-space-xs)}.recent-user-item{display:flex;align-items:center;gap:var(--lumo-space-xs);border-radius:var(--lumo-border-radius-m);background-color:var(--lumo-contrast-5pct);padding:var(--lumo-space-xs)}.recent-user-button{flex:1;justify-content:flex-start;margin:0}.empty-state{display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:var(--lumo-space-xl);gap:var(--lumo-space-m);min-height:300px}.empty-icon{width:64px;height:64px;color:var(--lumo-contrast-30pct)}.empty-state h3{margin:0;font-size:var(--lumo-font-size-l);font-weight:600;color:var(--lumo-body-text-color)}.empty-state p{margin:0;font-size:var(--lumo-font-size-s);color:var(--lumo-secondary-text-color);max-width:400px}";
var U = Object.defineProperty, $ = Object.getOwnPropertyDescriptor, l = (e, t, i, r2) => {
  for (var s = r2 > 1 ? void 0 : r2 ? $(t, i) : t, d = e.length - 1, p; d >= 0; d--)
    (p = e[d]) && (s = (r2 ? p(t, i, s) : p(s)) || s);
  return r2 && s && U(t, i, s), s;
};
let a = class extends V {
  constructor() {
    super(...arguments), this.username = "", this.errorMessage = "", this.isLoading = false, this.handleKeyDown = async (e) => {
      e.key === "Enter" && this.username && !this.isLoading && await this.handleSwitchUser();
    }, this.handleSwitchUser = async () => {
      if (!(!this.username || this.isLoading)) {
        this.isLoading = true, this.errorMessage = "";
        try {
          const e = await b(this.username);
          e.success ? (_.addRecentSwitchedUsername(this.username), window.location.reload()) : (this.errorMessage = e.errorMessage, this.isLoading = false);
        } catch {
          this.errorMessage = "An unexpected error occurred", this.isLoading = false;
        }
      }
    }, this.switchToRecentUser = async (e) => {
      this.username = e, await this.handleSwitchUser();
    }, this.removeRecentUser = (e, t) => {
      t.stopPropagation(), _.removeRecentSwitchedUsername(e), this.requestUpdate();
    };
  }
  connectedCallback() {
    super.connectedCallback(), this.reaction(
      () => _.getRecentSwitchedUsernames(),
      () => {
        this.requestUpdate();
      }
    );
  }
  render() {
    if (!kr.springSecurityEnabled)
      return ce`
        <style>
          ${u}
        </style>
        <div class="impersonator-container">
          <div class="empty-state">
            <vaadin-icon class="empty-icon" .svg="${r.accountCircle}"></vaadin-icon>
            <h3>Spring Security Not Enabled</h3>
            <p>User impersonation requires Spring Security to be configured in your application.</p>
          </div>
        </div>
      `;
    const e = _.getRecentSwitchedUsernames();
    return ce`
      <style>
        ${u}
      </style>
      <div class="impersonator-container">
        <div class="impersonator-section">
          <h3 class="section-title">Switch to User</h3>
          <p class="section-description">Enter a username to impersonate in your application.</p>

          <vaadin-text-field
            class="username-field"
            label="Username"
            placeholder="Enter username"
            .value="${this.username}"
            .errorMessage="${this.errorMessage}"
            .invalid="${this.errorMessage !== ""}"
            ?disabled="${this.isLoading}"
            @value-changed="${(t) => {
      this.username = t.detail.value, this.errorMessage = "";
    }}"
            @keydown="${this.handleKeyDown}">
            <vaadin-icon slot="prefix" .svg="${r.accountCircle}"></vaadin-icon>
          </vaadin-text-field>

          <vaadin-button
            theme="primary"
            ?disabled="${!this.username || this.isLoading}"
            @click="${this.handleSwitchUser}">
            ${this.isLoading ? "Switching..." : "Switch User"}
          </vaadin-button>
        </div>

        ${e.length > 0 ? ce`
              <div class="impersonator-section">
                <h3 class="section-title">Recently Used Usernames</h3>
                <div class="recent-users-list">
                  ${e.map(
      (t) => ce`
                      <div class="recent-user-item">
                        <vaadin-button
                          class="recent-user-button"
                          theme="tertiary"
                          @click="${() => this.switchToRecentUser(t)}">
                          <vaadin-icon slot="prefix" .svg="${r.accountCircle}"></vaadin-icon>
                          ${t}
                        </vaadin-button>
                        <vaadin-button
                          theme="icon tertiary"
                          aria-label="Remove ${t}"
                          @click="${(i) => this.removeRecentUser(t, i)}">
                          <vaadin-icon .svg="${r.delete}"></vaadin-icon>
                          <vaadin-tooltip slot="tooltip" text="Remove from recent"></vaadin-tooltip>
                        </vaadin-button>
                      </div>
                    `
    )}
                </div>
              </div>
            ` : ""}
      </div>
    `;
  }
};
l([
  a$1()
], a.prototype, "username", 2);
l([
  a$1()
], a.prototype, "errorMessage", 2);
l([
  a$1()
], a.prototype, "isLoading", 2);
a = l([
  Oi("copilot-impersonator")
], a);
const h = {
  header: "Impersonate User",
  tag: We.IMPERSONATOR,
  individual: true,
  toolbarOptions: {
    allowedModesWithOrder: {
      common: 0
    },
    iconKey: "accountCircle"
  }
}, S = {
  init(e) {
    e.addPanel(h);
  }
};
window.Vaadin.copilot.plugins.push(S);
Oe.addPanel(h);
export {
  a as CopilotImpersonatorPanel
};
