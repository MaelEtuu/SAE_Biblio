import { y, K as $t, L as rl, N as Gd, P as nd, Y as Yd, r as re, i as ot, R as Rd, Q as Ld, T as Bd, C as Ct, a0 as k, e as S, a1 as Zd, a2 as O$1, c as ce, m as mr, z as qe, a3 as sc } from "./indexhtml-Crv9HnRQ.js";
import { r } from "./icons-CJYK-fIm-3aTajcIb.js";
import "./commonjsHelpers-CUmg6egw.js";
function l(o, t) {
  B(o) ? (Yd("show-in-ide", { attach: t ?? false, goToCustomComponentFile: true }), re(`${ot}show-in-ide`, {
    javaClassName: o.className,
    fileName: o.absoluteFilePath
  })) : Rd(o) ? (Yd("show-in-ide", { attach: t ?? false }), re(`${ot}show-in-ide`, { ...Ld(o), attach: t ?? false })) : (Bd("show-in-ide"), re(`${ot}show-in-ide`, o));
}
y.on("show-in-ide", (o) => {
  const t = o.detail.node;
  if (o.detail.source) {
    l(o.detail.source);
    return;
  }
  if (o.detail.javaSource) {
    l(o.detail.javaSource);
    return;
  }
  if (!t)
    return;
  if (t.isFlowComponent) {
    l(t.node, o.detail.attach);
    return;
  }
  const e = I(t);
  e && l(e);
});
function B(o) {
  return o === void 0 ? false : o.className !== void 0 ? true : o.absoluteFilePath !== void 0;
}
function I(o) {
  if (!o.isReactComponent)
    return;
  const t = $t(o.node);
  if (t)
    return t;
  const e = rl(o.node);
  if (e)
    return e;
  const n = o.children.sort((i, r2) => i.siblingIndex - r2.siblingIndex).find((i) => i.isReactComponent && I(i) !== void 0);
  if (!n)
    throw new Error(`Could not find the source of ${o.nameAndIdentifier}`);
  return $t(n.node);
}
const f = "vaadin.copilot.viewCreated";
function p(o) {
  const t = document.createElement("div");
  document.body.innerHTML = "", document.body.appendChild(t), sc(o, t);
}
function T() {
  p(
    ce`<div class="flex flex-col gap-4 h-screen items-center justify-center">
      <vaadin-icon .svg=${r.rotatingSpinner}></vaadin-icon>
      <h3 class="m-0">The files have been created</h3>
      <p class="m-0">Restart the server to load the new view</p>
      <p class="m-0"><small>The page will refresh automatically when the server is ready.</small></p>
    </div>`
  );
}
async function N() {
  const e = Date.now(), n = async () => {
    try {
      return (await fetch(window.location.href, { method: "HEAD" })).ok;
    } catch {
      return false;
    }
  };
  let i = false;
  for (; Date.now() - e < 12e4; ) {
    if (!await n()) {
      i = true;
      break;
    }
    await new Promise((a) => {
      setTimeout(a, 1e3);
    });
  }
  for (; Date.now() - e < 12e4; ) {
    if (await n() && i) {
      sessionStorage.removeItem(f), window.location.reload();
      return;
    }
    await new Promise((a) => {
      setTimeout(a, 1e3);
    });
  }
}
function x(o) {
  p(
    ce`<div class="flex flex-col gap-4 h-screen items-center justify-center">
      <vaadin-icon .svg=${r.rotatingSpinner}></vaadin-icon>
      <h3 class="m-0">Creating your ${o === "flow" ? "Flow" : "Hilla"} view...</h3>
    </div>`
  ), mr("copilot-init-app", { framework: o }, async (t) => {
    if (t.data.success)
      sessionStorage.setItem(f, "true"), T(), N();
    else {
      const e = t.data.reason;
      qe(e);
    }
  });
}
function j() {
  p(
    ce`<div class="m-8">
      <h3>No views found</h3>
      <p>To get started, you can</p>
      <ul>
        <li>
          <a
            href="#"
            @click=${(o) => {
      o.preventDefault(), x("flow");
    }}
            >Create a Flow view using Copilot</a
          >
        </li>
        <li>
          Create a view manually in your IDE, see
          <a target="_blank" href="https://vaadin.com/docs/latest/tutorial">the tutorial</a>
        </li>
      </ul>
      <p>Learn more at <a target="_blank" href="https://vaadin.com/docs">https://vaadin.com/docs</a>.</p>
    </div>`
  );
}
function $() {
  sessionStorage.getItem(f) ? (T(), N()) : j();
}
class W {
  constructor(t) {
    this._currentTree = t;
  }
  get root() {
    return this.currentTree.root;
  }
  get allNodesFlat() {
    return this.currentTree.allNodesFlat;
  }
  getNodeOfElement(t) {
    return this.currentTree.getNodeOfElement(t);
  }
  getChildren(t) {
    return this.currentTree.getChildren(t);
  }
  hasFlowComponents() {
    return this.currentTree.hasFlowComponents();
  }
  findNodeByUuid(t) {
    return this.currentTree.findNodeByUuid(t);
  }
  getElementByNodeUuid(t) {
    return this.currentTree.getElementByNodeUuid(t);
  }
  findByTreePath(t) {
    return this.currentTree.findByTreePath(t);
  }
  get currentTree() {
    return this._currentTree;
  }
  set currentTree(t) {
    this._currentTree = t, y.emit("copilot-tree-created", {});
  }
  get customComponentDataLoaded() {
    return this._currentTree.customComponentDataLoaded;
  }
}
y.on("navigate", (o) => {
  const t = window.history.state?.idx, e = {};
  t !== void 0 && (e.idx = t + 1), window.history.pushState(e, "", o.detail.path), window.dispatchEvent(new PopStateEvent("popstate"));
});
function O(o) {
  const t = window.Vaadin.copilot.tree;
  return o.map((e) => {
    let n = null;
    const { nodeUuid: i, treePath: r2, childIndex: a } = e;
    if (i) {
      const C = t.findNodeByUuid(i);
      C && (n = C);
    }
    return n || (n = t.findByTreePath(r2) ?? null), n && a !== void 0 && n.children.length > a ? n.children[a] : n;
  }).filter((e) => e !== null);
}
class s {
  constructor() {
    this.drillDownComponentStack = [], Ct(this, {
      drillDownComponentStack: k.shallow
    });
  }
  getCustomComponentIcon(t) {
    const e = this.getIconTag(t);
    return e === void 0 ? S : r[e];
  }
  getIconTag(t) {
    const n = this.getCustomComponentInfo(t)?.type;
    if (n === "IN_PROJECT")
      return "thermostatCarbon";
    if (n === "EXTERNAL")
      return "deployedCube";
  }
  getCustomComponentInfo(t) {
    if (t.customComponentData && s.isCustomComponentInstanceInfo(t.customComponentData))
      return t.customComponentData;
  }
  isCustomComponent(t) {
    return this.getCustomComponentInfo(t) !== void 0;
  }
  isVisibleAndSelectable(t) {
    if (!this.getTree().customComponentDataLoaded)
      return true;
    const e = this.getActiveDrillDownContext();
    if (!t.customComponentData)
      return t.isReactComponent && !t.parent && t.name === "App" && !e;
    if (t.uuid === e?.uuid)
      return true;
    const n = this.getActiveDrillDownData(), i = t.customComponentData;
    return n?.filePath ? t.customComponentData ? this.checkNodeIsInDrillDownContext(i, n) : false : i ? !i.childOfCustomComponent : true;
  }
  pushDrillDownContext(t) {
    this.drillDownComponentStack.push(t), this.persistIntoStorage(), Zd(t);
  }
  isDrillDownContext(t) {
    return this.getActiveDrillDownContext()?.uuid === t.uuid;
  }
  getActiveDrillDownContext() {
    if (this.drillDownComponentStack.length !== 0)
      return this.drillDownComponentStack[this.drillDownComponentStack.length - 1];
  }
  clearDrillDownContext() {
    this.drillDownComponentStack = [], this.persistIntoStorage();
  }
  popDrillDownContext() {
    this.drillDownComponentStack.pop(), this.persistIntoStorage();
  }
  isChildInDrillContext(t) {
    const e = t.customComponentData;
    if (!e)
      return true;
    const n = this.getActiveDrillDownData();
    return n ? this.checkNodeIsInDrillDownContext(e, n) : false;
  }
  getActiveDrillDownData() {
    const t = this.getActiveDrillDownContext();
    if (t === void 0)
      return;
    const e = this.getCustomComponentInfo(t);
    if (!e?.javaClassName && !e?.reactMethodName)
      return;
    const n = t.node;
    return {
      className: e.javaClassName,
      methodName: e.reactMethodName,
      nodeId: n.nodeId,
      uiId: n.uiId,
      filePath: e.customComponentFilePath ?? void 0
    };
  }
  checkNodeIsInDrillDownContext(t, e) {
    return t.createLocationMethodName && e.methodName ? t.createLocationMethodName === e.methodName && e.filePath === t.createLocationPath : e.filePath === t.createLocationPath && e.className === t.createdClassName;
  }
  persistIntoStorage() {
    const t = this.drillDownComponentStack.map((e) => ({
      treePath: e.path,
      nodeUuid: e.uuid
    }));
    O$1.saveDrillDownContextReference(t);
  }
  restoreDrillDownFromStorage() {
    const t = O$1.getDrillDownContextReference();
    let e = [];
    if (t === void 0) {
      const i = this.getTree().allNodesFlat.find((r2) => r2.customComponentData?.routeView);
      i?.customComponentData && s.isCustomComponentInstanceInfo(i.customComponentData) && (e = [i]);
    } else
      e = O(t);
    e.forEach((i) => {
      const r2 = this.drillDownComponentStack.findIndex((a) => a.uuid === i.uuid);
      r2 !== -1 && this.drillDownComponentStack.splice(r2, 1), this.drillDownComponentStack.push(i);
    });
    const n = this.getActiveDrillDownContext();
    n && Zd(n);
  }
  areInternalsVisible(t) {
    if (!this.getCustomComponentInfo(t))
      return true;
    const n = this.getActiveDrillDownData();
    let i;
    return n && n.filePath && (i = n.filePath), i ? this.checkChildrenCreateLocationToDisplayInternals(t.children, i) : false;
  }
  checkChildrenCreateLocationToDisplayInternals(t, e) {
    for (const n of t) {
      const i = n.customComponentData;
      if (i && i.createLocationPath === e || this.checkChildrenCreateLocationToDisplayInternals(n.children, e))
        return true;
    }
    return false;
  }
  getDescendantsCreatedInActiveDrillDownContextFlatten(t) {
    if (t.customComponentData && s.isCustomComponentInstanceInfo(t.customComponentData)) {
      const e = this.getActiveDrillDownData();
      let n;
      if (e && e.filePath ? n = e.filePath : this.getRouteViewPath() && (n = this.getRouteViewPath()), n)
        return this.getChildrenInPathFlattenRecursively(t, n);
    }
    return [];
  }
  getChildrenInPathFlattenRecursively(t, e) {
    const n = t.children, i = [];
    for (const r2 of n) {
      const a = r2.customComponentData;
      a && a.createLocationPath === e && i.push(r2), i.push(...this.getChildrenInPathFlattenRecursively(r2, e));
    }
    return i;
  }
  /**
   * Accessed to copilot tree through window object to avoid circular dependency or initialization issues.
   * @private
   */
  getTree() {
    return window.Vaadin.copilot.tree;
  }
  getRouteViewPath() {
    const t = this.getTree().allNodesFlat.find((e) => e.customComponentData?.routeView === true);
    if (t)
      return t.customComponentData?.createLocationPath ?? void 0;
  }
  static isCustomComponentInstanceInfo(t) {
    return "type" in t && "activeLevel" in t;
  }
}
window.Vaadin.copilot.comm = Gd;
const _ = new nd();
window.Vaadin.copilot.tree = new W(_);
window.Vaadin.copilot.customComponentHandler = new s();
window.Vaadin.copilot.initEmptyApp = x;
window.Vaadin.copilot.noRoutesInProject = $;
