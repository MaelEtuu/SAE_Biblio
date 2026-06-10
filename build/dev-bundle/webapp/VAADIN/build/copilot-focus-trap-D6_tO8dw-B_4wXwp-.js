import { E as ke } from "./indexhtml-Crv9HnRQ.js";
import "./commonjsHelpers-CUmg6egw.js";
function e() {
  return document.body.querySelector("copilot-main");
}
class i {
  constructor() {
    this.active = false, this.activate = () => {
      this.active = true;
      const t = this.getApplicationRootElement();
      t && t instanceof HTMLElement && t.addEventListener("focusin", this.focusInEventListener), e()?.focus(), e()?.addEventListener("focusout", this.keepFocusInCopilot);
    }, this.deactivate = () => {
      this.active = false;
      const t = this.getApplicationRootElement();
      t && t instanceof HTMLElement && t.removeEventListener("focusin", this.focusInEventListener), e()?.removeEventListener("focusout", this.keepFocusInCopilot);
    }, this.focusInEventListener = (t) => {
      this.active && (t.preventDefault(), t.stopPropagation(), ke(t.target) || requestAnimationFrame(() => {
        t.target.blur && t.target.blur(), e()?.focus();
      }));
    };
  }
  getApplicationRootElement() {
    return document.body.firstElementChild;
  }
  keepFocusInCopilot(t) {
    t.preventDefault(), t.stopPropagation(), e()?.focus();
  }
}
const c = new i();
export {
  c as copilotFocusTrap
};
