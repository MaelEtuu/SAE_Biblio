import { ay as isIOS, az as css, aA as I18nMixin, aB as FocusTrapController, aC as isKeyboardActive, aD as Debouncer, aE as animationFrame, aF as ElementMixin, aG as ThemableMixin, aH as PolylitMixin, aI as LumoInjectionMixin, aJ as LitElement, aK as html, aL as defineCustomElement, aM as addGlobalStyles, aN as DirMixin, aO as overlayStyles, aP as PositionMixin, aQ as OverlayMixin, aR as timeOut, aS as announce, aT as detailsSummary, aU as ActiveMixin, aV as CollapsibleMixin, aW as DelegateFocusMixin, aX as DelegateStateMixin, aY as SummaryController, aZ as TooltipController, a_ as KeyboardDirectionMixin, a$ as isElementFocused, b0 as SlotObserver, b1 as ButtonMixin, b2 as buttonStyles, b3 as isEmptyTextNode, b4 as FocusMixin, b5 as ifDefined, b6 as ListMixin, b7 as itemStyles, b8 as ItemMixin, b9 as ResizeMixin, ba as SlotController, bb as render, bc as generateUniqueId, bd as field, be as group, bf as FieldMixin, bg as DisabledMixin, bh as Directive, bi as isSingleExpression, bj as PartType, bk as directive, bl as noChange, bm as ComboBoxPlaceholder, bn as gestures, bo as removeListener, bp as addListener, bq as KeyboardMixin, br as getFlattenedElements, bs as isElementFocusable, bt as MediaQueryController, bu as InputConstraintsMixin, bv as VirtualKeyboardController, bw as InputControlMixin, bx as inputFieldShared, by as InputController, bz as LabelledInputController, bA as ComboBoxItemMixin, bB as comboBoxItemStyles, bC as ComboBoxOverlayMixin, bD as ComboBoxScrollerMixin, bE as comboBoxScrollerStyles, bF as PatternMixin, bG as ComboBoxBaseMixin, bH as isElementHidden, bI as SlotStylesMixin, bJ as addValueToAttribute, bK as removeValueFromAttribute, bL as issueWarning, bM as ColumnBaseMixin, bN as updateColumnOrders, bO as ColumnObserver, bP as setTouchAction, bQ as GridColumn, bR as isFocusable, bS as InputMixin, bT as TextField, bU as SlotChildObserveController, ak as __vitePreload, bV as ThemePropertyMixin, bW as isTemplateResult, bX as Popover, bY as reactExports, bZ as clientExports, b_ as jsxDEV, b$ as Outlet, c0 as Tooltip, c1 as screenReaderOnly, c2 as InputFieldMixin, c3 as getDeepActiveElement, c4 as nothing, c5 as setCommittedValue, c6 as loaderStyles, c7 as isTouch, c8 as Virtualizer, c9 as OverflowController, ca as isChrome, cb as isSafari, cc as Iconset } from "./indexhtml-Crv9HnRQ.js";
import { renderMarkdownToElement } from "./markdown-helpers-31I0A-hg.js";
import "./commonjsHelpers-CUmg6egw.js";
/**
 * @license
 * Copyright (c) 2018 - 2026 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
function _detectIosNavbar() {
  if (isIOS) {
    const innerHeight = window.innerHeight;
    const innerWidth = window.innerWidth;
    const landscape = innerWidth > innerHeight;
    const clientHeight = document.documentElement.clientHeight;
    if (landscape && clientHeight > innerHeight) {
      document.documentElement.style.setProperty("--vaadin-viewport-offset-bottom", `${clientHeight - innerHeight}px`);
    } else {
      document.documentElement.style.setProperty("--vaadin-viewport-offset-bottom", "");
    }
  }
}
_detectIosNavbar();
window.addEventListener("resize", _detectIosNavbar);
/**
 * @license
 * Copyright (c) 2018 - 2026 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const appLayoutStyles = css`
  :host {
    display: block;
    box-sizing: border-box;
    height: 100%;
    --vaadin-app-layout-transition-duration: 0s;
    transition: padding var(--vaadin-app-layout-transition-duration);
    --_vaadin-app-layout-drawer-width: var(--vaadin-app-layout-drawer-width, auto);
    --vaadin-app-layout-touch-optimized: false;
    --vaadin-app-layout-navbar-offset-top: var(--_vaadin-app-layout-navbar-offset-size);
    --vaadin-app-layout-navbar-offset-bottom: var(--_vaadin-app-layout-navbar-offset-size-bottom);
    padding-top: max(var(--vaadin-app-layout-navbar-offset-top), var(--safe-area-inset-top));
    padding-bottom: max(var(--vaadin-app-layout-navbar-offset-bottom), var(--safe-area-inset-bottom));
  }

  :host(:dir(ltr)) [content] {
    padding-left: max(var(--vaadin-app-layout-drawer-offset-left), var(--safe-area-inset-left));
    padding-right: var(--safe-area-inset-right);
  }

  :host(:dir(rtl)) [content] {
    padding-left: var(--safe-area-inset-left);
    padding-right: max(var(--vaadin-app-layout-drawer-offset-left), var(--safe-area-inset-right));
  }

  :host([hidden]),
  [hidden] {
    display: none !important;
  }

  @media (prefers-reduced-motion: no-preference) {
    :host(:not([no-anim])) {
      --vaadin-app-layout-transition-duration: 200ms;
    }
  }

  :host([drawer-opened]) {
    --vaadin-app-layout-drawer-offset-left: var(--_vaadin-app-layout-drawer-offset-size);
  }

  :host([overlay]) {
    --vaadin-app-layout-drawer-offset-left: 0px;
  }

  :host(:not([no-scroll])) [content] {
    overflow: auto;
  }

  [content] {
    height: 100%;
    transition: inherit;
  }

  @media (pointer: coarse) and (max-width: 800px) and (min-height: 500px) {
    :host {
      --vaadin-app-layout-touch-optimized: true;
    }
  }

  [part~='navbar'] {
    position: fixed;
    display: flex;
    align-items: center;
    top: 0;
    inset-inline: 0;
    transition: inset-inline-start var(--vaadin-app-layout-transition-duration);
    padding-top: max(var(--vaadin-app-layout-navbar-padding-top, var(--vaadin-padding-s)), var(--safe-area-inset-top));
    padding-bottom: var(--vaadin-app-layout-navbar-padding-bottom, var(--vaadin-padding-s));
    padding-inline-start: max(
      var(--vaadin-app-layout-navbar-padding-inline-start, var(--vaadin-padding-s)),
      var(--safe-area-inset-left)
    );
    /* stylelint-disable-next-line declaration-block-no-redundant-longhand-properties */
    padding-inline-end: max(
      var(--vaadin-app-layout-navbar-padding-inline-end, var(--vaadin-padding-s)),
      var(--safe-area-inset-right)
    );
    z-index: 1;
    gap: var(--vaadin-app-layout-navbar-gap, var(--vaadin-gap-s));
    background: var(--vaadin-app-layout-navbar-background, var(--vaadin-background-container));
  }

  :host([primary-section='drawer'][drawer-opened]:not([overlay])) [part~='navbar'] {
    inset-inline-start: var(--vaadin-app-layout-drawer-offset-left, 0);
  }

  :host([primary-section='drawer']) [part='drawer'] {
    top: 0;
  }

  [part~='navbar-bottom'] {
    top: auto;
    bottom: 0;
    padding-top: var(--vaadin-app-layout-navbar-padding-top, var(--vaadin-padding-s));
    padding-bottom: max(
      var(--vaadin-app-layout-navbar-padding-bottom, var(--vaadin-padding-s)),
      var(--safe-area-inset-bottom)
    );
  }

  [part='drawer'] {
    overflow: auto;
    overscroll-behavior: contain;
    position: fixed;
    top: var(--vaadin-app-layout-navbar-offset-top, 0);
    bottom: var(--vaadin-app-layout-navbar-offset-bottom, var(--vaadin-viewport-offset-bottom, 0));
    inset-inline: var(--vaadin-app-layout-navbar-offset-left, 0) auto;
    transition:
      transform var(--vaadin-app-layout-transition-duration),
      visibility var(--vaadin-app-layout-transition-duration);
    transform: translateX(-100%);
    max-width: 90%;
    width: var(--_vaadin-app-layout-drawer-width);
    box-sizing: border-box;
    padding-block: var(--safe-area-inset-top) var(--safe-area-inset-bottom);
    outline: none;
    /* The drawer should be inaccessible by the tabbing navigation when it is closed. */
    visibility: hidden;
    display: flex;
    flex-direction: column;
    background: var(--vaadin-app-layout-drawer-background, transparent);
  }

  [part='drawer']:dir(ltr) {
    padding-left: var(--safe-area-inset-left);
  }

  [part='drawer']:dir(rtl) {
    padding-right: var(--safe-area-inset-right);
  }

  :host([has-navbar]:not([overlay])) [part='drawer'],
  :host([has-navbar]) [content] {
    --safe-area-inset-top: 0px;
  }

  :host([has-drawer]:not([overlay])[drawer-opened]) [content] {
    &:dir(ltr) {
      --safe-area-inset-left: 0px;
    }

    &:dir(rtl) {
      --safe-area-inset-right: 0px;
    }
  }

  :host([drawer-opened]) [part='drawer'] {
    /* The drawer should be accessible by the tabbing navigation when it is opened. */
    visibility: visible;
    transform: translateX(0%);
    touch-action: manipulation;
  }

  [part='backdrop'] {
    background: var(--vaadin-overlay-backdrop-background, rgba(0, 0, 0, 0.2));
    forced-color-adjust: none;
  }

  :host(:not([drawer-opened])) [part='backdrop'] {
    opacity: 0 !important;
  }

  :host([overlay]) [part='backdrop'] {
    position: fixed;
    inset: 0;
    pointer-events: none;
    transition: opacity var(--vaadin-app-layout-transition-duration);
    -webkit-tap-highlight-color: transparent;
  }

  :host([overlay]) [part='drawer'] {
    top: 0;
    bottom: 0;
    box-shadow: var(--vaadin-overlay-shadow, 0 8px 24px -4px rgba(0, 0, 0, 0.3));
    background: var(--vaadin-app-layout-drawer-background, var(--vaadin-background-color));
  }

  :host([overlay]) [part='drawer'],
  :host([overlay]) [part='backdrop'] {
    z-index: 2;
  }

  :host([drawer-opened][overlay]) [part='backdrop'] {
    pointer-events: auto;
    touch-action: manipulation;
  }

  :host([dir='rtl']) [part='drawer'] {
    transform: translateX(100%);
  }

  :host([dir='rtl'][drawer-opened]) [part='drawer'] {
    transform: translateX(0%);
  }

  @media (max-width: 800px), (max-height: 600px) {
    :host {
      --vaadin-app-layout-drawer-overlay: true;
      --_vaadin-app-layout-drawer-width: var(--vaadin-app-layout-drawer-width, 320px);
    }
  }

  /* If a vaadin-scroller is used in the drawer, allow it to take all remaining space and contain scrolling */
  [part='drawer'] ::slotted(vaadin-scroller) {
    flex: 1;
    overscroll-behavior: contain;
  }

  @media (forced-colors: active) {
    :host([overlay]) [part='drawer'] {
      border: 3px solid;
    }
  }
`;
/**
 * @license
 * Copyright (c) 2017 Anton Korzunov
 * SPDX-License-Identifier: MIT
 */
let counterMap = /* @__PURE__ */ new WeakMap();
let uncontrolledNodes = /* @__PURE__ */ new WeakMap();
let markerMap = {};
let lockCount = 0;
const isElement = (node) => node && node.nodeType === Node.ELEMENT_NODE;
const logError = (...args) => {
  console.error(`Error: ${args.join(" ")}. Skip setting aria-hidden.`);
};
const correctTargets = (parent, targets) => {
  if (!isElement(parent)) {
    logError(parent, "is not a valid element");
    return [];
  }
  return targets.map((target) => {
    if (!isElement(target)) {
      logError(target, "is not a valid element");
      return null;
    }
    let node = target;
    while (node && node !== parent) {
      if (parent.contains(node)) {
        return target;
      }
      node = node.getRootNode().host;
    }
    logError(target, "is not contained inside", parent);
    return null;
  }).filter((x) => Boolean(x));
};
const applyAttributeToOthers = (originalTarget, parentNode, markerName, controlAttribute) => {
  const targets = correctTargets(parentNode, Array.isArray(originalTarget) ? originalTarget : [originalTarget]);
  if (!markerMap[markerName]) {
    markerMap[markerName] = /* @__PURE__ */ new WeakMap();
  }
  const markerCounter = markerMap[markerName];
  const hiddenNodes = [];
  const elementsToKeep = /* @__PURE__ */ new Set();
  const elementsToStop = new Set(targets);
  const keep = (el) => {
    if (!el || elementsToKeep.has(el)) {
      return;
    }
    elementsToKeep.add(el);
    const slot = el.assignedSlot;
    if (slot) {
      keep(slot);
    }
    keep(el.parentNode || el.host);
  };
  targets.forEach(keep);
  const deep = (parent) => {
    if (!parent || elementsToStop.has(parent)) {
      return;
    }
    const root = parent.shadowRoot;
    const children = root ? [...parent.children, ...root.children] : [...parent.children];
    children.forEach((node) => {
      if (["template", "script", "style"].includes(node.localName)) {
        return;
      }
      if (elementsToKeep.has(node)) {
        deep(node);
      } else {
        const attr = node.getAttribute(controlAttribute);
        const alreadyHidden = attr !== null && attr !== "false";
        const counterValue = (counterMap.get(node) || 0) + 1;
        const markerValue = (markerCounter.get(node) || 0) + 1;
        counterMap.set(node, counterValue);
        markerCounter.set(node, markerValue);
        hiddenNodes.push(node);
        if (counterValue === 1 && alreadyHidden) {
          uncontrolledNodes.set(node, true);
        }
        if (markerValue === 1) {
          node.setAttribute(markerName, "true");
        }
        if (!alreadyHidden) {
          node.setAttribute(controlAttribute, "true");
        }
      }
    });
  };
  deep(parentNode);
  elementsToKeep.clear();
  lockCount += 1;
  return () => {
    hiddenNodes.forEach((node) => {
      const counterValue = counterMap.get(node) - 1;
      const markerValue = markerCounter.get(node) - 1;
      counterMap.set(node, counterValue);
      markerCounter.set(node, markerValue);
      if (!counterValue) {
        if (uncontrolledNodes.has(node)) {
          uncontrolledNodes.delete(node);
        } else {
          node.removeAttribute(controlAttribute);
        }
      }
      if (!markerValue) {
        node.removeAttribute(markerName);
      }
    });
    lockCount -= 1;
    if (!lockCount) {
      counterMap = /* @__PURE__ */ new WeakMap();
      counterMap = /* @__PURE__ */ new WeakMap();
      uncontrolledNodes = /* @__PURE__ */ new WeakMap();
      markerMap = {};
    }
  };
};
const hideOthers = (originalTarget, parentNode = document.body, markerName = "data-aria-hidden") => {
  const targets = Array.from(Array.isArray(originalTarget) ? originalTarget : [originalTarget]);
  if (parentNode) {
    targets.push(...Array.from(parentNode.querySelectorAll("[aria-live]")));
  }
  return applyAttributeToOthers(targets, parentNode, markerName, "aria-hidden");
};
/**
 * @license
 * Copyright (c) 2021 - 2026 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
class AriaModalController {
  /**
   * @param {HTMLElement} host
   */
  constructor(host, callback) {
    this.host = host;
    this.callback = typeof callback === "function" ? callback : () => host;
  }
  /**
   * Make the controller host modal by hiding other elements from screen readers
   * using `aria-hidden` attribute (can be replaced with `inert` in the future).
   *
   * The method name is chosen to align with the one provided by native `<dialog>`:
   * https://developer.mozilla.org/en-US/docs/Web/API/HTMLDialogElement/showModal
   */
  showModal() {
    const targets = this.callback();
    this.__showOthers = hideOthers(targets);
  }
  /**
   * Remove `aria-hidden` from other elements unless there are any other
   * controller hosts on the page activated by using `showModal()` call.
   */
  close() {
    if (this.__showOthers) {
      this.__showOthers();
      this.__showOthers = null;
    }
  }
}
/**
 * @license
 * Copyright (c) 2018 - 2026 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const DEFAULT_I18N$8 = {
  drawer: "Drawer"
};
const AppLayoutMixin = (superclass) => class AppLayoutMixinClass extends I18nMixin(DEFAULT_I18N$8, superclass) {
  static get properties() {
    return {
      /**
       * Defines whether navbar or drawer will come first visually.
       * - By default (`primary-section="navbar"`), the navbar takes the full available width and moves the drawer down.
       * - If `primary-section="drawer"` is set, then the drawer will move the navbar, taking the full available height.
       * @attr {navbar|drawer} primary-section
       */
      primarySection: {
        type: String,
        value: "navbar",
        notify: true,
        reflectToAttribute: true,
        observer: "__primarySectionChanged",
        sync: true
      },
      /**
       * Controls whether the drawer is opened (visible) or not.
       * Its default value depends on the viewport:
       * - `true`, for desktop size views
       * - `false`, for mobile size views
       * @attr {boolean} drawer-opened
       */
      drawerOpened: {
        type: Boolean,
        notify: true,
        value: true,
        reflectToAttribute: true,
        observer: "__drawerOpenedChanged",
        sync: true
      },
      /**
       * Drawer is an overlay on top of the content
       * Controlled via CSS using `--vaadin-app-layout-drawer-overlay: true|false`;
       */
      overlay: {
        type: Boolean,
        notify: true,
        readOnly: true,
        value: false,
        reflectToAttribute: true,
        observer: "__overlayChanged",
        sync: true
      },
      /**
       * A global event that causes the drawer to close (be hidden) when it is in overlay mode.
       * - The default is `vaadin-router-location-changed` dispatched by Vaadin Router
       *
       * @attr {string} close-drawer-on
       */
      closeDrawerOn: {
        type: String,
        value: "vaadin-router-location-changed",
        observer: "_closeDrawerOnChanged"
      }
    };
  }
  static get observers() {
    return ["__i18nChanged(__effectiveI18n)"];
  }
  /**
   * Helper static method that dispatches a `close-overlay-drawer` event
   */
  static dispatchCloseOverlayDrawerEvent() {
    window.dispatchEvent(new CustomEvent("close-overlay-drawer"));
  }
  /**
   * The object used to localize this component. To change the default
   * localization, replace this with an object that provides all properties, or
   * just the individual properties you want to change.
   *
   * The object has the following structure and default values:
   * ```js
   * {
   *   drawer: 'Drawer'
   * }
   * ```
   * @type {!AppLayoutI18n}
   */
  get i18n() {
    return super.i18n;
  }
  set i18n(value) {
    super.i18n = value;
  }
  constructor() {
    super();
    this.__boundResizeListener = this._resize.bind(this);
    this.__drawerToggleClickListener = this._drawerToggleClick.bind(this);
    this.__onDrawerKeyDown = this.__onDrawerKeyDown.bind(this);
    this.__closeOverlayDrawerListener = this.__closeOverlayDrawer.bind(this);
    this.__trapFocusInDrawer = this.__trapFocusInDrawer.bind(this);
    this.__releaseFocusFromDrawer = this.__releaseFocusFromDrawer.bind(this);
    this.__ariaModalController = new AriaModalController(this, () => [
      ...this.querySelectorAll('vaadin-drawer-toggle, [slot="drawer"]')
    ]);
    this.__focusTrapController = new FocusTrapController(this);
  }
  /** @protected */
  connectedCallback() {
    super.connectedCallback();
    this._blockAnimationUntilAfterNextRender();
    window.addEventListener("resize", this.__boundResizeListener);
    this.addEventListener("drawer-toggle-click", this.__drawerToggleClickListener);
    requestAnimationFrame(() => {
      this._updateOffsetSize();
    });
    this._updateTouchOptimizedMode();
    this._updateDrawerSize();
    this._updateOverlayMode();
    this._navbarSizeObserver = new ResizeObserver(() => {
      requestAnimationFrame(() => {
        if (this.__isDrawerAnimating) {
          this.__updateOffsetSizePending = true;
        } else {
          this._updateOffsetSize();
        }
      });
    });
    this._navbarSizeObserver.observe(this.$.navbarTop);
    this._navbarSizeObserver.observe(this.$.navbarBottom);
    this._navbarSizeObserver.observe(this.$.drawer);
    window.addEventListener("close-overlay-drawer", this.__closeOverlayDrawerListener);
    window.addEventListener("keydown", this.__onDrawerKeyDown);
  }
  /** @protected */
  ready() {
    super.ready();
    this.addController(this.__focusTrapController);
    this.__setAriaExpanded();
    this.$.drawer.addEventListener("transitionstart", () => {
      this.__isDrawerAnimating = true;
    });
    this.$.drawer.addEventListener("transitionend", () => {
      if (this.__updateOffsetSizePending) {
        this.__updateOffsetSizePending = false;
        this._updateOffsetSize();
      }
      requestAnimationFrame(() => {
        this.__isDrawerAnimating = false;
      });
    });
  }
  /** @protected */
  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener("resize", this.__boundResizeListener);
    this.removeEventListener("drawer-toggle-click", this.__drawerToggleClickListener);
    window.removeEventListener("close-overlay-drawer", this.__drawerToggleClickListener);
    window.removeEventListener("keydown", this.__onDrawerKeyDown);
  }
  /** @private */
  __onNavbarSlotChange() {
    this._updateTouchOptimizedMode();
    this.toggleAttribute("has-navbar", !!this.querySelector('[slot="navbar"]'));
  }
  /** @private */
  __onDrawerSlotChange() {
    this._updateDrawerSize();
    this.toggleAttribute("has-drawer", !!this.querySelector('[slot="drawer"]'));
  }
  /**
   * A callback for the `primarySection` property observer.
   *
   * Ensures the property is set to its default value `navbar`
   * whenever the new value is not one of the valid values: `navbar`, `drawer`.
   *
   * @param {string} value
   * @private
   */
  __primarySectionChanged(value) {
    const isValid2 = ["navbar", "drawer"].includes(value);
    if (!isValid2) {
      this.primarySection = "navbar";
    }
  }
  /**
   * A callback for the `drawerOpened` property observer.
   *
   * When the drawer opens, the method ensures the drawer has a proper height and sets focus on it.
   * As long as the drawer is open, the focus is trapped within the drawer.
   *
   * When the drawer closes, the method releases focus from the drawer, setting focus on the drawer toggle.
   *
   * @param {boolean} drawerOpened
   * @param {boolean} oldDrawerOpened
   * @private
   */
  __drawerOpenedChanged(drawerOpened, oldDrawerOpened) {
    if (this.overlay) {
      if (drawerOpened) {
        this.__trapFocusInDrawer();
      } else if (oldDrawerOpened) {
        this.__releaseFocusFromDrawer();
      }
    }
    this.__setAriaExpanded();
  }
  /**
   * A callback for the `overlay` property observer.
   *
   * When layout resizes while in the overlay mode, drawer opened state
   * is not changed, but focus trap needs to be removed.
   *
   * @param {boolean} overlay
   * @param {boolean} oldOverlay
   * @private
   */
  __overlayChanged(_overlay, oldOverlay) {
    if (oldOverlay) {
      this.__restoreFocus();
    }
  }
  /**
   * A callback for the `i18n` property observer.
   *
   * The method ensures the drawer has ARIA attributes updated
   * once the `i18n` property changes.
   *
   * @private
   */
  __i18nChanged() {
    this.__updateDrawerAriaAttributes();
  }
  /** @private */
  _drawerToggleClick(e) {
    e.stopPropagation();
    this.drawerOpened = !this.drawerOpened;
  }
  /** @private */
  __closeOverlayDrawer() {
    if (this.overlay) {
      this.drawerOpened = false;
    }
  }
  /** @private */
  __setAriaExpanded() {
    const toggle = this.querySelector("vaadin-drawer-toggle");
    if (toggle) {
      toggle.setAttribute("aria-expanded", this.drawerOpened);
    }
  }
  /** @protected */
  _updateDrawerSize() {
    const childCount = this.querySelectorAll("[slot=drawer]").length;
    const drawer = this.$.drawer;
    if (childCount === 0) {
      drawer.setAttribute("hidden", "");
      this.style.setProperty("--_vaadin-app-layout-drawer-width", 0);
    } else {
      drawer.removeAttribute("hidden");
      this.style.removeProperty("--_vaadin-app-layout-drawer-width");
    }
    this._updateOffsetSize();
  }
  /** @private */
  _resize() {
    this._blockAnimationUntilAfterNextRender();
    this._updateTouchOptimizedMode();
    this._updateOverlayMode();
  }
  /** @protected */
  _updateOffsetSize() {
    const navbar = this.$.navbarTop;
    const navbarRect = navbar.getBoundingClientRect();
    const navbarBottom = this.$.navbarBottom;
    const navbarBottomRect = navbarBottom.getBoundingClientRect();
    const drawer = this.$.drawer;
    const drawerRect = drawer.getBoundingClientRect();
    this.style.setProperty("--_vaadin-app-layout-navbar-offset-size", `${navbarRect.height}px`);
    this.style.setProperty("--_vaadin-app-layout-navbar-offset-size-bottom", `${navbarBottomRect.height}px`);
    this.style.setProperty("--_vaadin-app-layout-drawer-offset-size", `${drawerRect.width}px`);
  }
  /** @protected */
  _updateOverlayMode() {
    const overlay = this._getCustomPropertyValue("--vaadin-app-layout-drawer-overlay") === "true";
    if (!this.overlay && overlay) {
      this._drawerStateSaved = this.drawerOpened;
      this.drawerOpened = false;
    }
    this._setOverlay(overlay);
    if (!this.overlay && this._drawerStateSaved) {
      this.drawerOpened = this._drawerStateSaved;
      this._drawerStateSaved = null;
    }
    this.__updateDrawerAriaAttributes();
  }
  /**
   * Updates ARIA attributes on the drawer depending on the drawer mode.
   *
   * - In the overlay mode, the method marks the drawer with ARIA attributes as a dialog
   * labelled with the `i18n.drawer` property.
   * - In the normal mode, the method removes the ARIA attributes that has been set for the overlay mode.
   *
   * @private
   */
  __updateDrawerAriaAttributes() {
    const drawer = this.$.drawer;
    if (this.overlay) {
      drawer.setAttribute("role", "dialog");
      drawer.setAttribute("aria-modal", "true");
      drawer.setAttribute("aria-label", this.__effectiveI18n.drawer);
    } else {
      drawer.removeAttribute("role");
      drawer.removeAttribute("aria-modal");
      drawer.removeAttribute("aria-label");
    }
  }
  /**
   * Returns a promise that resolves when the drawer opening/closing CSS transition ends.
   *
   * @return {Promise}
   * @private
   */
  __drawerTransitionComplete() {
    return Promise.all(this.$.drawer.getAnimations().map((animation) => animation.finished));
  }
  /** @private */
  async __trapFocusInDrawer() {
    await this.__drawerTransitionComplete();
    if (!this.drawerOpened) {
      return;
    }
    this.$.drawer.setAttribute("tabindex", "0");
    this.__ariaModalController.showModal();
    this.__focusTrapController.trapFocus(this.$.drawer);
  }
  /** @private */
  async __releaseFocusFromDrawer() {
    await this.__drawerTransitionComplete();
    if (this.drawerOpened) {
      return;
    }
    this.__restoreFocus();
    const toggle = this.querySelector("vaadin-drawer-toggle");
    if (toggle) {
      toggle.focus({ focusVisible: isKeyboardActive() });
    }
  }
  /** @private */
  __restoreFocus() {
    this.__ariaModalController.close();
    this.__focusTrapController.releaseFocus();
    this.$.drawer.removeAttribute("tabindex");
  }
  /**
   * Closes the drawer on Escape press if it has been opened in the overlay mode.
   *
   * @param {KeyboardEvent} event
   * @private
   */
  __onDrawerKeyDown(event) {
    if (event.key === "Escape" && this.overlay) {
      this.drawerOpened = false;
    }
  }
  /** @private */
  _closeDrawerOnChanged(closeDrawerOn, oldCloseDrawerOn) {
    if (oldCloseDrawerOn) {
      window.removeEventListener(oldCloseDrawerOn, this.__closeOverlayDrawerListener);
    }
    if (closeDrawerOn) {
      window.addEventListener(closeDrawerOn, this.__closeOverlayDrawerListener);
    }
  }
  /** @private */
  _onBackdropClick() {
    this._close();
  }
  /** @private */
  _onBackdropTouchend(event) {
    event.preventDefault();
    this._close();
  }
  /** @protected */
  _close() {
    this.drawerOpened = false;
  }
  /** @private */
  _getCustomPropertyValue(customProperty) {
    const customPropertyValue = getComputedStyle(this).getPropertyValue(customProperty);
    return (customPropertyValue || "").trim().toLowerCase();
  }
  /** @protected */
  _updateTouchOptimizedMode() {
    const touchOptimized = this._getCustomPropertyValue("--vaadin-app-layout-touch-optimized") === "true";
    const navbarItems = this.querySelectorAll('[slot*="navbar"]');
    if (navbarItems.length > 0) {
      Array.from(navbarItems).forEach((navbar) => {
        if (navbar.getAttribute("slot").indexOf("touch-optimized") > -1) {
          navbar.__touchOptimized = true;
        }
        if (touchOptimized && navbar.__touchOptimized) {
          navbar.setAttribute("slot", "navbar-bottom");
        } else {
          navbar.setAttribute("slot", "navbar");
        }
      });
    }
    if (this.$.navbarTop.querySelector("[name=navbar]").assignedNodes().length === 0) {
      this.$.navbarTop.setAttribute("hidden", "");
    } else {
      this.$.navbarTop.removeAttribute("hidden");
    }
    if (this.$.navbarBottom.querySelector("[name=navbar-bottom]").assignedNodes().length === 0) {
      this.$.navbarBottom.setAttribute("hidden", "");
    } else {
      this.$.navbarBottom.removeAttribute("hidden");
    }
    this._updateOffsetSize();
  }
  /** @protected */
  _blockAnimationUntilAfterNextRender() {
    this.setAttribute("no-anim", "");
    this.__debounceAnimation = Debouncer.debounce(this.__debounceAnimation, animationFrame, () => {
      setTimeout(() => {
        this.removeAttribute("no-anim");
      });
    });
  }
  /**
   * App Layout listens to `close-overlay-drawer` on the window level.
   * A custom event can be dispatched and the App Layout will close the drawer in overlay.
   *
   * That can be used, for instance, when a navigation occurs when user clicks in a menu item inside the drawer.
   *
   * See `dispatchCloseOverlayDrawerEvent()` helper method.
   *
   * @event close-overlay-drawer
   */
};
/**
 * @license
 * Copyright (c) 2018 - 2026 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
class AppLayout extends AppLayoutMixin(ElementMixin(ThemableMixin(PolylitMixin(LumoInjectionMixin(LitElement))))) {
  static get is() {
    return "vaadin-app-layout";
  }
  static get styles() {
    return appLayoutStyles;
  }
  /** @protected */
  render() {
    return html`
      <div part="navbar navbar-top" id="navbarTop">
        <slot name="navbar" @slotchange="${this.__onNavbarSlotChange}"></slot>
      </div>
      <div part="backdrop" @click="${this._onBackdropClick}" @touchend="${this._onBackdropTouchend}"></div>
      <div part="drawer" id="drawer">
        <slot name="drawer" id="drawerSlot" @slotchange="${this.__onDrawerSlotChange}"></slot>
      </div>
      <div content>
        <slot></slot>
      </div>
      <div part="navbar navbar-bottom" id="navbarBottom" hidden>
        <slot name="navbar-bottom"></slot>
      </div>
      <div hidden>
        <slot id="touchSlot" name="navbar touch-optimized" @slotchange="${this.__onNavbarSlotChange}"></slot>
      </div>
    `;
  }
}
defineCustomElement(AppLayout);
/**
 * @license
 * Copyright (c) 2017 - 2026 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
addGlobalStyles(
  "vaadin-base-user-colors",
  css`
    @layer vaadin.base {
      html {
        --_color-count: 10;
        --_hue-step: round(360 / var(--_color-count), 1);
        --vaadin-user-color-0: var(--vaadin-user-color, oklch(0.52 0.2 240));
        --vaadin-user-color-1: oklch(
          from var(--vaadin-user-color-0) calc(0.62 + clamp(-0.15, (0.6201 - l) * 10000, 0.15)) c
            calc(h - var(--_hue-step) * 2 * var(--_vaadin-safari-17-deg, 1))
        );
        --vaadin-user-color-2: oklch(
          from var(--vaadin-user-color-0) l c calc(h - var(--_hue-step) * -2 * var(--_vaadin-safari-17-deg, 1))
        );
        --vaadin-user-color-3: oklch(
          from var(--vaadin-user-color-0) calc(0.62 + clamp(-0.15, (0.6201 - l) * 10000, 0.15)) c
            calc(h - var(--_hue-step) * 0 * var(--_vaadin-safari-17-deg, 1))
        );
        --vaadin-user-color-4: oklch(
          from var(--vaadin-user-color-0) l c calc(h - var(--_hue-step) * 2 * var(--_vaadin-safari-17-deg, 1))
        );
        --vaadin-user-color-5: oklch(
          from var(--vaadin-user-color-0) calc(0.62 + clamp(-0.15, (0.6201 - l) * 10000, 0.15)) c
            calc(h - var(--_hue-step) * -2 * var(--_vaadin-safari-17-deg, 1))
        );
        --vaadin-user-color-6: oklch(
          from var(--vaadin-user-color-0) l c calc(h - var(--_hue-step) * -4 * var(--_vaadin-safari-17-deg, 1))
        );
        --vaadin-user-color-7: oklch(
          from var(--vaadin-user-color-0) calc(0.62 + clamp(-0.15, (0.6201 - l) * 10000, 0.15)) c
            calc(h - var(--_hue-step) * 4 * var(--_vaadin-safari-17-deg, 1))
        );
        --vaadin-user-color-8: oklch(
          from var(--vaadin-user-color-0) l c calc(h - var(--_hue-step) * 4 * var(--_vaadin-safari-17-deg, 1))
        );
        --vaadin-user-color-9: oklch(
          from var(--vaadin-user-color-0) calc(0.62 + clamp(-0.15, (0.6201 - l) * 10000, 0.15)) c
            calc(h - var(--_hue-step) * 6 * var(--_vaadin-safari-17-deg, 1))
        );
      }
    }
  `
);
/**
 * @license
 * Copyright (c) 2021 - 2026 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const fieldOutlineStyles = css`
  :host {
    display: block;
    position: absolute;
    inset: 0;
    pointer-events: none;
    opacity: 0;
    --_active-user-color: transparent;
    outline: 3px solid var(--_active-user-color);
    outline-offset: -1px;
    /* TODO doesn't inherit correctly from vaadin-input-container for some reason, so we use the internal _radius property */
    border-radius: var(--_radius, inherit);
  }

  :host([has-active-user]) {
    opacity: 1;
  }

  :host([context$='item']) {
    inset: 2px;
  }
`;
/**
 * @license
 * Copyright (c) 2021 - 2026 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
class FieldOutline extends ThemableMixin(DirMixin(PolylitMixin(LumoInjectionMixin(LitElement)))) {
  static get is() {
    return "vaadin-field-outline";
  }
  static get styles() {
    return fieldOutlineStyles;
  }
  static get properties() {
    return {
      /**
       * A user who last interacted with the field.
       */
      user: {
        type: Object,
        value: null,
        observer: "_userChanged",
        sync: true
      }
    };
  }
  /** @protected */
  render() {
    return html``;
  }
  /** @protected */
  ready() {
    super.ready();
    this.setAttribute("part", "outline");
    this._field = this.getRootNode().host;
  }
  /** @private */
  _userChanged(user) {
    this.toggleAttribute("has-active-user", Boolean(user));
    const value = user ? `var(--vaadin-user-color-${user.colorIndex})` : "transparent";
    const prop = "--_active-user-color";
    this.style.setProperty(prop, value);
    if (this._field) {
      this._field.style.setProperty(prop, value);
    }
  }
}
defineCustomElement(FieldOutline);
/**
 * @license
 * Copyright (c) 2021 - 2026 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const userTagStyles = css`
  :host {
    display: inline-block;
    box-sizing: border-box;
    opacity: 0;
    padding: var(--vaadin-user-tag-padding, 0.3em);
    background-color: var(--vaadin-user-tag-color);
    color: oklch(from var(--vaadin-user-tag-color) clamp(0, (0.62 - l) * 1000, 1) 0 0);
    font-size: var(--vaadin-user-tag-font-size, 0.75em);
    font-weight: var(--vaadin-user-tag-font-weight, 500);
    line-height: var(--vaadin-user-tag-line-height, 1);
    border: var(--vaadin-user-tag-border-width, 0) solid
      var(--vaadin-user-tag-border-color, var(--vaadin-border-color-secondary));
    border-radius: var(--vaadin-user-tag-border-radius, var(--vaadin-radius-m));
    cursor: default;
  }

  :host(.show) {
    opacity: 1;
  }

  [part='name'] {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;
/**
 * @license
 * Copyright (c) 2021 - 2026 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
class UserTag extends ThemableMixin(DirMixin(PolylitMixin(LumoInjectionMixin(LitElement)))) {
  static get is() {
    return "vaadin-user-tag";
  }
  static get styles() {
    return userTagStyles;
  }
  /** @protected */
  render() {
    return html`<div part="name">${this.name}</div>`;
  }
  static get properties() {
    return {
      /**
       * Name of the user.
       */
      name: {
        type: String
      },
      /**
       * Id of the user.
       */
      uid: {
        type: String
      },
      /**
       * Color index of the user.
       */
      colorIndex: {
        type: Number,
        observer: "_colorIndexChanged"
      }
    };
  }
  /** @protected */
  ready() {
    super.ready();
    this.addEventListener("mousedown", this._onClick.bind(this), true);
  }
  /** @private */
  _colorIndexChanged(index) {
    if (index != null) {
      this.style.setProperty("--vaadin-user-tag-color", `var(--vaadin-user-color-${index})`);
    }
  }
  /**
   * @param {Event} e
   * @private
   */
  _onClick(e) {
    e.preventDefault();
    this.dispatchEvent(
      new CustomEvent("user-tag-click", {
        bubbles: true,
        composed: true,
        detail: {
          name: this.name
        }
      })
    );
  }
}
defineCustomElement(UserTag);
/**
 * @license
 * Copyright (c) 2021 - 2026 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const userTagsOverlay = css`
  [part='overlay'] {
    all: initial;
    display: block;
    font: inherit;
    color: inherit;
  }

  [part='content'] {
    display: flex;
    flex-wrap: wrap;
    gap: var(--vaadin-user-tag-overlay-gap, 0.2em);
    padding: 0.5em 0;
  }

  :host([opening]),
  :host([closing]) {
    animation: 0.14s user-tags-overlay-dummy-animation;
  }

  @keyframes user-tags-overlay-dummy-animation {
    0% {
      opacity: 1;
    }

    100% {
      opacity: 1;
    }
  }
`;
const userTagsOverlayStyles = [overlayStyles, userTagsOverlay];
/**
 * @license
 * Copyright (c) 2021 - 2026 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
class UserTagsOverlay extends PositionMixin(
  OverlayMixin(DirMixin(ThemableMixin(PolylitMixin(LumoInjectionMixin(LitElement)))))
) {
  static get is() {
    return "vaadin-user-tags-overlay";
  }
  static get styles() {
    return userTagsOverlayStyles;
  }
  /** @protected */
  render() {
    return html`
      <div part="overlay" id="overlay">
        <div part="content" id="content">
          <slot></slot>
        </div>
      </div>
    `;
  }
}
defineCustomElement(UserTagsOverlay);
/**
 * @license
 * Copyright (c) 2021 - 2026 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const listenOnce = (elem, type) => {
  return new Promise((resolve) => {
    const listener = () => {
      elem.removeEventListener(type, listener);
      resolve();
    };
    elem.addEventListener(type, listener);
  });
};
class UserTags extends PolylitMixin(LitElement) {
  static get is() {
    return "vaadin-user-tags";
  }
  static get styles() {
    return css`
      :host {
        position: absolute;
      }
    `;
  }
  /** @protected */
  render() {
    return html`
      <vaadin-user-tags-overlay
        id="overlay"
        exportparts="overlay:user-tags-overlay, content:user-tags-content"
        modeless
        .opened="${this.opened}"
        no-vertical-overlap
        @vaadin-overlay-open="${this._onOverlayOpen}"
      >
        <slot></slot>
      </vaadin-user-tags-overlay>
    `;
  }
  static get properties() {
    return {
      /**
       * True when the field has focus. In this case, the overlay
       * with a list of the user tags needs to be always visible.
       */
      hasFocus: {
        type: Boolean,
        value: false,
        observer: "_hasFocusChanged"
      },
      /**
       * True when the overlay is opened.
       */
      opened: {
        type: Boolean,
        value: false,
        sync: true
      },
      /**
       * True when the overlay is flashing: quickly shown and then hidden
       * once a different user starts to interact with the field.
       */
      flashing: {
        type: Boolean,
        value: false
      },
      /**
       * A target element that the overlay is positioned to.
       */
      target: {
        type: Object,
        observer: "__targetChanged"
      },
      /**
       * A list of users who focused the field.
       */
      users: {
        type: Array,
        value: () => []
      },
      duration: {
        type: Number,
        value: 200
      },
      delay: {
        type: Number,
        value: 2e3
      },
      /** @private */
      __flashQueue: {
        type: Array,
        value: () => []
      },
      /** @private */
      __isTargetVisible: {
        type: Boolean,
        value: false
      }
    };
  }
  constructor() {
    super();
    this.__targetVisibilityObserver = new IntersectionObserver(
      ([entry]) => {
        this.__onTargetVisibilityChange(entry.isIntersecting);
      },
      { threshold: 1 }
    );
  }
  /** @protected */
  get wrapper() {
    return this;
  }
  /** @protected */
  connectedCallback() {
    super.connectedCallback();
    if (this.target) {
      this.__targetVisibilityObserver.observe(this.target);
    }
  }
  /** @protected */
  disconnectedCallback() {
    super.disconnectedCallback();
    this.opened = false;
    if (this.target) {
      this.__targetVisibilityObserver.unobserve(this.target);
    }
  }
  /** @protected */
  ready() {
    super.ready();
    this.setAttribute("exportparts", "user-tags-overlay, user-tags-content");
  }
  /** @private */
  __onTargetVisibilityChange(isVisible) {
    this.__isTargetVisible = isVisible;
    if (isVisible && this.__flashQueue.length > 0 && !this.flashing) {
      this.flashTags(this.__flashQueue.shift());
      return;
    }
    if (isVisible && this.hasFocus) {
      this.opened = true;
      return;
    }
    if (!isVisible && this.opened) {
      this.opened = false;
    }
  }
  /** @private */
  __targetChanged(newTarget, oldTarget) {
    this.$.overlay.positionTarget = newTarget;
    if (oldTarget) {
      this.__targetVisibilityObserver.unobserve(oldTarget);
    }
    if (newTarget) {
      this.__targetVisibilityObserver.observe(newTarget);
    }
  }
  /** @private */
  _hasFocusChanged(hasFocus) {
    if (hasFocus && this.flashing) {
      this.stopFlash();
    }
  }
  createUserTag(user) {
    const tag = document.createElement("vaadin-user-tag");
    tag.setAttribute("part", "user-tag");
    tag.name = user.name;
    tag.uid = user.id;
    tag.colorIndex = user.colorIndex;
    return tag;
  }
  getTagForUser(user) {
    return Array.from(this.children).find((tag) => tag.uid === user.id);
  }
  getChangedTags(addedUsers, removedUsers) {
    const removed = removedUsers.map((user) => this.getTagForUser(user));
    const added = addedUsers.map((user) => this.getTagForUser(user) || this.createUserTag(user));
    return { added, removed };
  }
  applyTagsStart({ added, removed }) {
    removed.forEach((tag) => {
      if (tag) {
        tag.classList.add("removing");
        tag.classList.remove("show");
      }
    });
    added.forEach((tag) => this.insertBefore(tag, this.firstChild));
  }
  applyTagsEnd({ added, removed }) {
    removed.forEach((tag) => {
      if (tag && tag.parentNode === this) {
        this.removeChild(tag);
      }
    });
    added.forEach((tag) => tag && tag.classList.add("show"));
  }
  setUsers(users) {
    this.requestContentUpdate();
    let addedUsers = [];
    let removedUsers = [];
    const hasNewUsers = Array.isArray(users);
    const hasOldUsers = Array.isArray(this.users);
    if (hasOldUsers) {
      const newUserIds = (users || []).map((user) => user.id);
      removedUsers = this.users.filter((item) => !newUserIds.includes(item.id));
    }
    if (hasNewUsers) {
      const oldUserIds = (this.users || []).map((user) => user.id);
      addedUsers = users.filter((item) => !oldUserIds.includes(item.id)).reverse();
    }
    if (addedUsers.length === 0 && removedUsers.length === 0) {
      return;
    }
    const changedTags = this.getChangedTags(addedUsers, removedUsers);
    if (this.__flashQueue.length > 0) {
      removedUsers.forEach((user, i) => {
        if (changedTags.removed[i] === null) {
          return;
        }
        this.__flashQueue.forEach((tags) => {
          if (tags.some((tag) => tag.uid === user.id)) {
            this.__flashQueue = this.__flashQueue.filter((_, index) => index !== i);
          }
        });
      });
    }
    if (this.opened && this.hasFocus) {
      this.updateTags(users, changedTags);
    } else if (addedUsers.length > 0 && document.visibilityState !== "hidden") {
      const addedTags = changedTags.added;
      const removedTags = changedTags.removed;
      this.updateTagsSync(users, {
        added: [],
        removed: removedTags
      });
      if (this.flashing || !this.__isTargetVisible) {
        this.__flashQueue = [...this.__flashQueue, addedTags];
      } else {
        this.flashTags(addedTags);
      }
    } else {
      this.updateTagsSync(users, changedTags);
    }
  }
  /** @private */
  _onOverlayOpen() {
    Array.from(this.children).forEach((tag) => {
      if (!tag.classList.contains("removing")) {
        tag.classList.add("show");
      }
    });
  }
  flashTags(added) {
    this.flashing = true;
    const hidden = Array.from(this.children);
    hidden.forEach((tag) => {
      tag.style.display = "none";
    });
    added.forEach((tag) => {
      this.insertBefore(tag, this.firstChild);
    });
    this.flashPromise = new Promise((resolve) => {
      listenOnce(this.$.overlay, "vaadin-overlay-open").then(() => {
        this._debounceFlashStart = Debouncer.debounce(
          this._debounceFlashStart,
          timeOut.after(this.duration + this.delay),
          () => {
            if (!this.hasFocus) {
              added.forEach((tag) => tag.classList.remove("show"));
            }
            this._debounceFlashEnd = Debouncer.debounce(this._debounceFlashEnd, timeOut.after(this.duration), () => {
              const finishFlash = () => {
                hidden.forEach((tag) => {
                  tag.style.display = "block";
                });
                this.flashing = false;
                resolve();
              };
              if (this.hasFocus) {
                finishFlash();
              } else {
                listenOnce(this.$.overlay, "animationend").then(() => {
                  finishFlash();
                });
                this.opened = false;
              }
            });
          }
        );
      });
    }).then(() => {
      if (this.__flashQueue.length > 0) {
        const tags = this.__flashQueue[0];
        this.__flashQueue = [...this.__flashQueue].slice(1);
        this.flashTags(tags);
      }
    });
    this.opened = true;
  }
  stopFlash() {
    if (this._debounceFlashStart) {
      this._debounceFlashStart.flush();
    }
    if (this._debounceFlashEnd) {
      this._debounceFlashEnd.flush();
    }
    this.$.overlay._flushAnimation("closing");
  }
  updateTags(users, changed) {
    this.applyTagsStart(changed);
    this._debounceRender = Debouncer.debounce(this._debounceRender, timeOut.after(this.duration), () => {
      this.users = users;
      this.applyTagsEnd(changed);
      if (users.length === 0 && this.opened) {
        this.opened = false;
      }
    });
  }
  updateTagsSync(users, changed) {
    this.applyTagsStart(changed);
    this.users = users;
    this.applyTagsEnd(changed);
  }
  show() {
    this.hasFocus = true;
    if (this.__isTargetVisible) {
      this.opened = true;
    }
  }
  hide() {
    this.hasFocus = false;
    this.opened = false;
  }
  requestContentUpdate() {
    if (this._debounceRender && this._debounceRender.isActive()) {
      this._debounceRender.flush();
    }
  }
}
defineCustomElement(UserTags);
/**
 * @license
 * Copyright (c) 2021 - 2026 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const getOutlineTarget = (element, tagName) => {
  switch (tagName) {
    /* c8 ignore next */
    case "vaadin-big-decimal-field":
    case "vaadin-combo-box":
    case "vaadin-date-picker":
    case "vaadin-email-field":
    case "vaadin-integer-field":
    case "vaadin-number-field":
    case "vaadin-password-field":
    case "vaadin-select":
    case "vaadin-text-area":
    case "vaadin-text-field":
    case "vaadin-time-picker":
      return element.shadowRoot.querySelector('[part="input-field"]');
    /* c8 ignore next */
    case "vaadin-checkbox":
      return element.shadowRoot.querySelector('[part="checkbox"]');
    /* c8 ignore next */
    case "vaadin-radio-button":
      return element.shadowRoot.querySelector('[part="radio"]');
    /* c8 ignore next */
    default:
      return element;
  }
};
const fields = /* @__PURE__ */ new WeakMap();
const initOutline = (field2) => {
  if (!fields.has(field2)) {
    const tagName = field2.tagName.toLowerCase();
    const target = getOutlineTarget(field2, tagName);
    target.style.position = "relative";
    if (tagName.endsWith("text-area")) {
      target.style.overflow = "visible";
    }
    const style = document.createElement("style");
    style.textContent = `
      :host(:is([active], [focused])) [part="outline"] {
        display: none;
      }
    `;
    field2.shadowRoot.appendChild(style);
    const outline = document.createElement("vaadin-field-outline");
    (target === field2 ? field2.shadowRoot : target).appendChild(outline);
    outline.setAttribute("context", tagName);
    fields.set(field2, { root: field2, target, outline });
  }
  return fields.get(field2);
};
/**
 * @license
 * Copyright (c) 2021 - 2026 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
class ComponentObserver {
  constructor(component) {
    this.component = component;
    this.initTags(component);
  }
  getFields() {
    return [this.component];
  }
  getFieldIndex(field2) {
    return this.getFields().indexOf(field2);
  }
  getFocusTarget(_event) {
    return this.component;
  }
  initTags(component) {
    const tags = document.createElement("vaadin-user-tags");
    component.shadowRoot.appendChild(tags);
    tags.target = component;
    this._tags = tags;
    component.addEventListener("mouseenter", (event) => {
      if (event.relatedTarget === this._tags.$.overlay) {
        return;
      }
      this._mouse = true;
      this._mouseDebouncer = Debouncer.debounce(this._mouseDebouncer, timeOut.after(200), () => {
        if (this._mouse) {
          this._tags.show();
        }
      });
    });
    component.addEventListener("mouseleave", (event) => {
      if (event.relatedTarget === this._tags.$.overlay) {
        return;
      }
      this._mouse = false;
      if (!this._hasFocus) {
        this._tags.hide();
      }
    });
    component.addEventListener("vaadin-highlight-show", (_event) => {
      this._hasFocus = true;
      if (this._debouncer && this._debouncer.isActive()) {
        this._debouncer.cancel();
      } else {
        this._tags.show();
      }
    });
    component.addEventListener("vaadin-highlight-hide", (_event) => {
      this._hasFocus = false;
      if (!this._mouse) {
        this._debouncer = Debouncer.debounce(this._debouncer, timeOut.after(1), () => {
          this._tags.hide();
        });
      }
    });
    this._tags.$.overlay.addEventListener("mouseleave", (event) => {
      if (event.relatedTarget === component) {
        return;
      }
      this._mouse = false;
      if (!component.hasAttribute("focused")) {
        this._tags.hide();
      }
    });
  }
  setOutlines(users) {
    const fields2 = this.getFields();
    fields2.forEach((field2, idx) => {
      const { outline } = initOutline(field2);
      const index = fields2.length === 1 ? 0 : users.map((user) => user.fieldIndex).indexOf(idx);
      outline.user = users[index];
    });
  }
  showOutline(field2) {
    this.fire("show", field2);
  }
  hideOutline(field2) {
    this.fire("hide", field2);
  }
  fire(action, field2) {
    this.component.dispatchEvent(
      new CustomEvent(`vaadin-highlight-${action}`, {
        bubbles: true,
        composed: true,
        detail: { fieldIndex: this.getFieldIndex(field2) }
      })
    );
  }
  redraw(users) {
    this._tags.setUsers(users);
    this.setOutlines(users);
  }
}
/**
 * @license
 * Copyright (c) 2021 - 2026 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
class FieldObserver extends ComponentObserver {
  constructor(field2) {
    super(field2);
    this.addListeners(field2);
  }
  addListeners(field2) {
    field2.addEventListener("focusin", (event) => this.onFocusIn(event));
    field2.addEventListener("focusout", (event) => this.onFocusOut(event));
  }
  onFocusIn(event) {
    const target = this.getFocusTarget(event);
    this.showOutline(target);
  }
  onFocusOut(event) {
    const target = this.getFocusTarget(event);
    this.hideOutline(target);
  }
}
/**
 * @license
 * Copyright (c) 2021 - 2026 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
class CheckboxGroupObserver extends FieldObserver {
  getFields() {
    return this.component.__checkboxes;
  }
  getFocusTarget(event) {
    const fields2 = this.getFields();
    return Array.from(event.composedPath()).find((node) => fields2.includes(node));
  }
}
/**
 * @license
 * Copyright (c) 2021 - 2026 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
class DatePickerObserver extends ComponentObserver {
  constructor(datePicker) {
    super(datePicker);
    this.datePicker = datePicker;
    this.blurWhileOpened = false;
    this.addListeners(datePicker);
  }
  addListeners(datePicker) {
    this.overlay = datePicker.$.overlay;
    datePicker.addEventListener("opened-changed", (event) => this.onOpenedChanged(event));
    this.overlay.addEventListener("focusout", (event) => this.onOverlayFocusOut(event));
    datePicker.addEventListener("focusin", (event) => this.onFocusIn(event));
    datePicker.addEventListener("focusout", (event) => this.onFocusOut(event));
  }
  isEventInOverlay(node) {
    return this.datePicker._overlayContent && this.datePicker._overlayContent.contains(node);
  }
  isFullscreen() {
    const datePicker = this.datePicker;
    return datePicker._noInput && !isKeyboardActive();
  }
  onFocusIn(event) {
    if (this.isEventInOverlay(event.target)) {
      return;
    }
    if (this.isEventInOverlay(event.relatedTarget)) {
      return;
    }
    if (this.blurWhileOpened) {
      this.blurWhileOpened = false;
      return;
    }
    this.showOutline(this.datePicker);
  }
  onFocusOut(event) {
    if (this.isEventInOverlay(event.target) && this.component.contains(event.relatedTarget)) {
      return;
    }
    if (this.isEventInOverlay(event.relatedTarget)) {
      return;
    }
    if (!this.datePicker.opened) {
      this.hideOutline(this.datePicker);
    } else {
      this.blurWhileOpened = true;
    }
  }
  onOverlayFocusOut(event) {
    if (!this.datePicker.contains(event.relatedTarget)) {
      this.blurWhileOpened = true;
    }
  }
  onOpenedChanged(event) {
    if (event.detail.value === true && this.isFullscreen()) {
      this.showOutline(this.datePicker);
    }
    if (event.detail.value === false && this.blurWhileOpened) {
      this.blurWhileOpened = false;
      this.hideOutline(this.datePicker);
    }
  }
}
/**
 * @license
 * Copyright (c) 2021 - 2026 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
class DateObserver extends DatePickerObserver {
  constructor(datePicker, host) {
    super(datePicker);
    this.component = host;
  }
  getFieldIndex() {
    return 0;
  }
}
class TimeObserver extends FieldObserver {
  constructor(timePicker, host) {
    super(timePicker);
    this.component = host;
    this.timePicker = timePicker;
  }
  getFocusTarget(_event) {
    return this.timePicker;
  }
  getFieldIndex() {
    return 1;
  }
}
class DateTimePickerObserver extends ComponentObserver {
  constructor(picker) {
    super(picker);
    const [datePicker, timePicker] = this.getFields();
    this.dateObserver = new DateObserver(datePicker, picker);
    this.timeObserver = new TimeObserver(timePicker, picker);
  }
  getFields() {
    return [this.component.querySelector("[slot=date-picker]"), this.component.querySelector("[slot=time-picker]")];
  }
}
/**
 * @license
 * Copyright (c) 2021 - 2026 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
class ListBoxObserver extends FieldObserver {
  getFields() {
    return this.component.items || [];
  }
  getFocusTarget(event) {
    const fields2 = this.getFields();
    return Array.from(event.composedPath()).find((node) => fields2.includes(node));
  }
}
/**
 * @license
 * Copyright (c) 2021 - 2026 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
class RadioGroupObserver extends FieldObserver {
  getFields() {
    return this.component.__radioButtons;
  }
  getFocusTarget(event) {
    const fields2 = this.getFields();
    return Array.from(event.composedPath()).find((node) => fields2.includes(node));
  }
}
/**
 * @license
 * Copyright (c) 2021 - 2026 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
class SelectObserver extends FieldObserver {
  constructor(select) {
    super(select);
    this.overlay = select._overlayElement;
  }
  onFocusIn(event) {
    if (this.overlay._contentRoot.contains(event.target)) {
      return;
    }
    if (this.overlay._contentRoot.contains(event.relatedTarget)) {
      return;
    }
    super.onFocusIn(event);
  }
  onFocusOut(event) {
    if (this.overlay._contentRoot.contains(event.relatedTarget)) {
      return;
    }
    if (this.overlay._contentRoot.contains(event.target) && this.component.contains(event.relatedTarget)) {
      return;
    }
    super.onFocusOut(event);
  }
}
/**
 * @license
 * Copyright (c) 2021 - 2026 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const initFieldObserver = (field2) => {
  let result;
  switch (field2.tagName.toLowerCase()) {
    /* c8 ignore next */
    case "vaadin-date-picker":
      result = new DatePickerObserver(field2);
      break;
    /* c8 ignore next */
    case "vaadin-date-time-picker":
      result = new DateTimePickerObserver(field2);
      break;
    /* c8 ignore next */
    case "vaadin-select":
      result = new SelectObserver(field2);
      break;
    /* c8 ignore next 2 */
    case "vaadin-checkbox-group":
      result = new CheckboxGroupObserver(field2);
      break;
    case "vaadin-radio-group":
      result = new RadioGroupObserver(field2);
      break;
    case "vaadin-list-box":
      result = new ListBoxObserver(field2);
      break;
    default:
      result = new FieldObserver(field2);
  }
  return result;
};
class FieldHighlighterController {
  constructor(host) {
    this.host = host;
    this.user = null;
    this.users = [];
  }
  get user() {
    return this._user;
  }
  set user(user) {
    this._user = user;
    if (user) {
      const msg = `${user.name} started editing`;
      const { label } = this.host;
      announce(label ? `${msg} ${label}` : msg);
    }
  }
  hostConnected() {
    this.redraw();
  }
  addUser(user) {
    if (user) {
      this.users.push(user);
      this.redraw();
      this.user = user;
    }
  }
  setUsers(users) {
    if (Array.isArray(users)) {
      this.users = users;
      this.redraw();
      this.user = users[users.length - 1] || null;
    }
  }
  removeUser(user) {
    if (user && user.id !== void 0) {
      let index;
      for (let i = 0; i < this.users.length; i++) {
        if (this.users[i].id === user.id) {
          index = i;
          break;
        }
      }
      if (index !== void 0) {
        this.users.splice(index, 1);
        this.redraw();
        if (this.users.length > 0) {
          this.user = this.users[this.users.length - 1];
        } else {
          this.user = null;
        }
      }
    }
  }
  redraw() {
    this.observer.redraw([...this.users].reverse());
  }
}
class FieldHighlighter extends HTMLElement {
  static get is() {
    return "vaadin-field-highlighter";
  }
  static init(field2) {
    if (!field2._highlighterController) {
      const instance = new FieldHighlighterController(field2);
      field2.setAttribute("has-highlighter", "");
      instance.observer = initFieldObserver(field2);
      field2.addController(instance);
      field2._highlighterController = instance;
    }
    return field2._highlighterController;
  }
  static addUser(field2, user) {
    this.init(field2).addUser(user);
  }
  static removeUser(field2, user) {
    this.init(field2).removeUser(user);
  }
  static setUsers(field2, users) {
    this.init(field2).setUsers(users);
  }
}
defineCustomElement(FieldHighlighter);
/**
 * @license
 * Copyright (c) 2019 - 2026 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const accordionHeading = [
  detailsSummary("vaadin-accordion-heading"),
  css`
    button {
      align-items: center;
      appearance: none;
      background: transparent;
      border: 0;
      color: inherit;
      cursor: inherit;
      display: flex;
      font: inherit;
      gap: inherit;
      outline: none;
      padding: 0;
      touch-action: manipulation;
    }
  `
];
/**
 * @license
 * Copyright (c) 2019 - 2026 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
class AccordionHeading extends ActiveMixin(DirMixin(ThemableMixin(PolylitMixin(LumoInjectionMixin(LitElement))))) {
  static get is() {
    return "vaadin-accordion-heading";
  }
  static get shadowRootOptions() {
    return { ...LitElement.shadowRootOptions, delegatesFocus: true };
  }
  static get styles() {
    return accordionHeading;
  }
  static get properties() {
    return {
      /**
       * When true, the element is opened.
       */
      opened: {
        type: Boolean,
        reflectToAttribute: true,
        sync: true,
        value: false
      }
    };
  }
  /** @protected */
  render() {
    return html`
      <button id="button" part="content" ?disabled="${this.disabled}" aria-expanded="${this.opened ? "true" : "false"}">
        <span part="toggle" aria-hidden="true"></span>
        <slot></slot>
      </button>
    `;
  }
  /** @protected */
  ready() {
    super.ready();
    if (!this.hasAttribute("role")) {
      this.setAttribute("role", "heading");
    }
  }
}
defineCustomElement(AccordionHeading);
/**
 * @license
 * Copyright (c) 2019 - 2026 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const accordionPanel = css`
  :host {
    display: block;
  }

  :host([hidden]) {
    display: none !important;
  }

  [part='content'] {
    box-sizing: border-box;
  }

  :host(:not([opened])) [part='content'] {
    display: none !important;
  }

  :host([focus-ring]) {
    --_focus-ring: 1;
  }
`;
/**
 * @license
 * Copyright (c) 2019 - 2026 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const AccordionPanelMixin = (superClass) => class AccordionPanelMixinClass extends CollapsibleMixin(DelegateFocusMixin(DelegateStateMixin(superClass))) {
  static get properties() {
    return {
      /**
       * A text that is displayed in the heading, if no
       * element is assigned to the `summary` slot.
       */
      summary: {
        type: String,
        observer: "_summaryChanged"
      }
    };
  }
  static get observers() {
    return ["__updateAriaAttributes(focusElement, _contentElements)"];
  }
  static get delegateProps() {
    return ["disabled", "opened", "_theme"];
  }
  constructor() {
    super();
    this._summaryController = new SummaryController(this, "vaadin-accordion-heading");
    this._summaryController.addEventListener("slot-content-changed", (event) => {
      const { node } = event.target;
      this._setFocusElement(node);
      this.stateTarget = node;
      this._tooltipController.setTarget(node);
    });
    this._tooltipController = new TooltipController(this);
    this._tooltipController.setPosition("bottom-start");
  }
  /**
   * @protected
   * @override
   */
  __forwardTabIndex(tabindex) {
    super.__forwardTabIndex(tabindex);
    if (tabindex !== void 0 && this.focusElement) {
      this.focusElement.$.button.tabIndex = tabindex;
      this.focusElement.tabIndex = -1;
    }
  }
  /** @protected */
  ready() {
    super.ready();
    this.addController(this._summaryController);
    this.addController(this._tooltipController);
  }
  /**
   * Override method from `DelegateStateMixin` to set delegate `theme`
   * using attribute instead of property (needed for the Lit version).
   * @protected
   * @override
   */
  _delegateProperty(name, value) {
    if (!this.stateTarget) {
      return;
    }
    if (name === "_theme") {
      this._delegateAttribute("theme", value);
      return;
    }
    super._delegateProperty(name, value);
  }
  /**
   * Override method inherited from `DisabledMixin`
   * to not set `aria-disabled` on the host element.
   *
   * @protected
   * @override
   */
  _setAriaDisabled() {
  }
  /** @private */
  _summaryChanged(summary) {
    this._summaryController.setSummary(summary);
  }
  /** @private */
  __updateAriaAttributes(focusElement, contentElements) {
    if (focusElement && contentElements) {
      const node = contentElements[0];
      if (node) {
        node.setAttribute("role", "region");
        node.setAttribute("aria-labelledby", focusElement.id);
      }
      if (node && node.id) {
        focusElement.setAttribute("aria-controls", node.id);
      } else {
        focusElement.removeAttribute("aria-controls");
      }
    }
  }
};
/**
 * @license
 * Copyright (c) 2019 - 2026 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
class AccordionPanel extends AccordionPanelMixin(ThemableMixin(PolylitMixin(LumoInjectionMixin(LitElement)))) {
  static get is() {
    return "vaadin-accordion-panel";
  }
  static get styles() {
    return accordionPanel;
  }
  /** @protected */
  render() {
    return html`
      <slot name="summary"></slot>

      <div part="content">
        <slot></slot>
      </div>

      <slot name="tooltip"></slot>
    `;
  }
}
defineCustomElement(AccordionPanel);
/**
 * @license
 * Copyright (c) 2019 - 2026 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const AccordionMixin = (superClass) => class AccordionMixinClass extends KeyboardDirectionMixin(superClass) {
  static get properties() {
    return {
      /**
       * The index of currently opened panel. First panel is opened by
       * default. Only one panel can be opened at the same time.
       * Setting null or undefined closes all the accordion panels.
       */
      opened: {
        type: Number,
        value: 0,
        notify: true,
        reflectToAttribute: true
      },
      /**
       * The list of `<vaadin-accordion-panel>` child elements.
       * It is populated from the elements passed to the light DOM,
       * and updated dynamically when adding or removing panels.
       * @type {!Array<!AccordionPanel>}
       */
      items: {
        type: Array,
        readOnly: true,
        notify: true
      }
    };
  }
  static get observers() {
    return ["_updateItems(items, opened)"];
  }
  constructor() {
    super();
    this._boundUpdateOpened = this._updateOpened.bind(this);
  }
  /**
   * Override getter from `KeyboardDirectionMixin`
   * to check if the heading element has focus.
   *
   * @return {Element | null}
   * @protected
   * @override
   */
  get focused() {
    return (this._getItems() || []).find((item) => isElementFocused(item.focusElement));
  }
  /**
   * @param {FocusOptions=} options
   * @protected
   * @override
   */
  focus(options) {
    if (this._observer) {
      this._observer.flush();
    }
    super.focus(options);
  }
  /** @protected */
  ready() {
    super.ready();
    const slot = this.shadowRoot.querySelector("slot");
    this._observer = new SlotObserver(slot, (info) => {
      this._setItems(this._filterItems(Array.from(this.children)));
      this._filterItems(info.addedNodes).forEach((el) => {
        el.addEventListener("opened-changed", this._boundUpdateOpened);
      });
    });
  }
  /**
   * Override method inherited from `KeyboardDirectionMixin`
   * to use the stored list of accordion panels as items.
   *
   * @return {Element[]}
   * @protected
   * @override
   */
  _getItems() {
    return this.items;
  }
  /**
   * @param {!Array<!Element>} array
   * @return {!Array<!AccordionPanel>}
   * @protected
   */
  _filterItems(array) {
    return array.filter((el) => el instanceof customElements.get("vaadin-accordion-panel"));
  }
  /** @private */
  _updateItems(items, opened) {
    if (items) {
      this.__itemsSync = true;
      const itemToOpen = items[opened];
      items.forEach((item) => {
        item.opened = item === itemToOpen;
      });
      this.__itemsSync = false;
    }
  }
  /**
   * Override an event listener from `KeyboardMixin`
   * to only handle details toggle buttons events.
   *
   * @param {!KeyboardEvent} event
   * @protected
   * @override
   */
  _onKeyDown(event) {
    if (!this.items.some((item) => item.focusElement === event.target)) {
      return;
    }
    super._onKeyDown(event);
  }
  /** @private */
  _updateOpened(e) {
    if (this.__itemsSync) {
      return;
    }
    const target = this._filterItems(e.composedPath())[0];
    const idx = this.items.indexOf(target);
    if (e.detail.value) {
      if (target.disabled || idx === -1) {
        return;
      }
      this.opened = idx;
    } else if (!this.items.some((item) => item.opened)) {
      this.opened = null;
    }
  }
};
/**
 * @license
 * Copyright (c) 2019 - 2026 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
class Accordion extends AccordionMixin(ThemableMixin(ElementMixin(PolylitMixin(LitElement)))) {
  static get is() {
    return "vaadin-accordion";
  }
  static get styles() {
    return css`
      :host {
        display: block;
      }

      :host([hidden]) {
        display: none !important;
      }
    `;
  }
  /** @protected */
  render() {
    return html`<slot></slot>`;
  }
}
defineCustomElement(Accordion);
/**
 * @license
 * Copyright (c) 2018 - 2026 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const drawerToggle = css`
  [part='icon'] {
    background: currentColor;
    display: block;
    height: var(--vaadin-icon-size, 1lh);
    mask: var(--_vaadin-icon-menu) 50% / var(--vaadin-icon-visual-size, 100%) no-repeat;
    width: var(--vaadin-icon-size, 1lh);
  }

  [hidden] {
    display: none !important;
  }

  @media (forced-colors: active) {
    [part='icon'] {
      background: CanvasText;
    }
  }
`;
/**
 * @license
 * Copyright (c) 2018 - 2026 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
class DrawerToggle extends ButtonMixin(DirMixin(ThemableMixin(PolylitMixin(LumoInjectionMixin(LitElement))))) {
  static get is() {
    return "vaadin-drawer-toggle";
  }
  static get styles() {
    return [buttonStyles, drawerToggle];
  }
  static get properties() {
    return {
      ariaLabel: {
        type: String,
        value: "Toggle navigation panel",
        reflectToAttribute: true,
        sync: true
      },
      /** @private */
      _showFallbackIcon: {
        type: Boolean,
        value: false
      }
    };
  }
  constructor() {
    super();
    this.addEventListener("click", () => {
      this.dispatchEvent(new CustomEvent("drawer-toggle-click", { bubbles: true, composed: true }));
    });
  }
  /** @protected */
  render() {
    return html`
      <slot id="slot" @slotchange="${this._toggleFallbackIcon}">
        <div part="icon"></div>
      </slot>
      <div part="icon" ?hidden="${!this._showFallbackIcon}"></div>
    `;
  }
  /** @protected */
  ready() {
    super.ready();
    this._toggleFallbackIcon();
  }
  /** @private */
  _toggleFallbackIcon() {
    const nodes = this.$.slot.assignedNodes();
    this._showFallbackIcon = nodes.length > 0 && nodes.every((node) => isEmptyTextNode(node));
  }
}
defineCustomElement(DrawerToggle);
/**
 * @license
 * Copyright (c) 2017 - 2026 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const avatarStyles = css`
  :host {
    display: inline-block;
    flex: none;
    border-radius: 50%;
    cursor: default;
    color: var(--vaadin-avatar-text-color, var(--vaadin-text-color-secondary));
    overflow: hidden;
    --_size: var(--vaadin-avatar-size, calc(1lh + var(--vaadin-padding-block-container) * 2));
    height: var(--_size);
    width: var(--_size);
    border: var(--vaadin-focus-ring-width) solid transparent;
    margin: calc(var(--vaadin-focus-ring-width) * -1);
    background: var(--vaadin-avatar-background, var(--vaadin-background-container-strong));
    background-clip: content-box;
    vertical-align: middle;
    -webkit-user-select: none;
    user-select: none;
    -webkit-tap-highlight-color: transparent;
    position: relative;
    font-weight: var(--vaadin-avatar-font-weight, 400);
    font-size: var(--vaadin-avatar-font-size, inherit);
    contain: strict;
  }

  /* Overlay border on top of image and icon as well */
  :host::before {
    position: absolute;
    content: '';
    inset: calc(var(--vaadin-focus-ring-width) * -1);
    border-radius: inherit;
    outline: var(--vaadin-avatar-border-width, 1px) solid var(--vaadin-avatar-border-color, transparent);
    outline-offset: calc((var(--vaadin-focus-ring-width) + var(--vaadin-avatar-border-width, 1px)) * -1);
  }

  :host([role='button']) {
    cursor: var(--vaadin-clickable-cursor);
  }

  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }

  [part='icon'] {
    height: 100%;
    mask: var(--_vaadin-icon-user) no-repeat center / 74%;
    background: currentColor;
  }

  [part='abbr'] {
    font-size: 2.75em;
    fill: currentColor;
  }

  :host([hidden]),
  [hidden] {
    display: none !important;
  }

  :host([has-color-index]) {
    background-color: var(--vaadin-avatar-user-color);
    color: oklch(
      from var(--vaadin-avatar-user-color) clamp(0, (0.62 - l) * 1000, 1) 0 0 / clamp(0.8, (0.62 - l) * 1000, 1)
    );
    --vaadin-avatar-border-width: 2px;
    --vaadin-avatar-border-color: var(--vaadin-avatar-user-color);
  }

  :host([focus-ring]) {
    outline: var(--vaadin-focus-ring-width) solid var(--vaadin-focus-ring-color);
    outline-offset: calc((var(--vaadin-focus-ring-width)) * -1);
  }

  @media (forced-colors: active) {
    :host {
      border-color: Canvas !important;
    }

    [part='icon'] {
      background: CanvasText !important;
    }
  }
`;
/**
 * @license
 * Copyright (c) 2017 - 2026 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const DEFAULT_I18N$7 = {
  anonymous: "anonymous"
};
const AvatarMixin = (superClass) => class AvatarMixinClass extends I18nMixin(DEFAULT_I18N$7, FocusMixin(superClass)) {
  static get properties() {
    return {
      /**
       * The path to the image
       */
      img: {
        type: String,
        reflectToAttribute: true,
        observer: "__imgChanged"
      },
      /**
       * A shortened form of name that is displayed
       * in the avatar when `img` is not provided.
       */
      abbr: {
        type: String,
        reflectToAttribute: true
      },
      /**
       * Full name of the user
       * used for the tooltip of the avatar.
       */
      name: {
        type: String,
        reflectToAttribute: true
      },
      /**
       * Color index used for avatar background.
       * @attr {number} color-index
       */
      colorIndex: {
        type: Number,
        observer: "__colorIndexChanged"
      },
      /**
       * When true, the avatar has tooltip shown on hover and focus.
       * The tooltip text is based on the `name` and `abbr` properties.
       * When neither is provided, `i18n.anonymous` is used instead.
       * @attr {boolean} with-tooltip
       */
      withTooltip: {
        type: Boolean,
        value: false,
        observer: "__withTooltipChanged"
      },
      /** @protected */
      __imgVisible: Boolean,
      /** @protected */
      __iconVisible: Boolean,
      /** @protected */
      __abbrVisible: Boolean,
      /** @private */
      __tooltipNode: Object
    };
  }
  static get observers() {
    return [
      "__imgOrAbbrOrNameChanged(img, abbr, name)",
      "__i18nChanged(__effectiveI18n)",
      "__tooltipChanged(__tooltipNode, name, abbr)"
    ];
  }
  /**
   * The object used to localize this component. To change the default
   * localization, replace this with an object that provides all properties, or
   * just the individual properties you want to change.
   *
   * The object has the following JSON structure and default values:
   * ```js
   * {
   *   // Translation of the anonymous user avatar tooltip.
   *   anonymous: 'anonymous'
   * }
   * ```
   * @type {!AvatarI18n}
   */
  get i18n() {
    return super.i18n;
  }
  set i18n(value) {
    super.i18n = value;
  }
  /** @protected */
  ready() {
    super.ready();
    this.__updateVisibility();
    if (!this.hasAttribute("role")) {
      this.setAttribute("role", "img");
    }
    if (!this.name && !this.abbr) {
      this.__setTooltip();
    }
  }
  /** @private */
  __colorIndexChanged(index) {
    if (index != null) {
      this.setAttribute("has-color-index", "");
      this.style.setProperty("--vaadin-avatar-user-color", `var(--vaadin-user-color-${index})`);
    } else {
      this.removeAttribute("has-color-index");
      this.style.removeProperty("--vaadin-avatar-user-color");
    }
  }
  /** @private */
  __imgChanged() {
    this.__imgFailedToLoad = false;
  }
  /** @private */
  __imgOrAbbrOrNameChanged(_img, abbr, name) {
    this.__updateVisibility();
    if (abbr && abbr !== this.__generatedAbbr) {
      return;
    }
    if (name) {
      this.abbr = this.__generatedAbbr = name.split(" ").map((word) => word.charAt(0)).join("");
    } else {
      this.abbr = void 0;
    }
  }
  /** @private */
  __tooltipChanged(tooltipNode, name, abbr) {
    if (tooltipNode) {
      if (abbr && abbr !== this.__generatedAbbr) {
        this.__setTooltip(name ? `${name} (${abbr})` : abbr);
      } else {
        this.__setTooltip(name);
      }
    }
    if (abbr) {
      this.setAttribute("aria-label", !tooltipNode && name ? `${name} (${abbr})` : abbr);
    } else {
      this.removeAttribute("aria-label");
    }
  }
  /** @private */
  __withTooltipChanged(withTooltip, oldWithTooltip) {
    this.toggleAttribute("has-tooltip", withTooltip);
    if (withTooltip) {
      const tooltipNode = document.createElement("vaadin-tooltip");
      tooltipNode.setAttribute("slot", "tooltip");
      this.appendChild(tooltipNode);
      this.__tooltipNode = tooltipNode;
    } else if (oldWithTooltip) {
      this.__tooltipNode.target = null;
      this.__tooltipNode.remove();
      this.__tooltipNode = null;
    }
  }
  /** @private */
  __i18nChanged(effectiveI18n) {
    if (effectiveI18n && effectiveI18n.anonymous) {
      if (this.__oldAnonymous && this.__tooltipNode && this.__tooltipNode.text === this.__oldAnonymous) {
        this.__setTooltip();
      }
      this.__oldAnonymous = effectiveI18n.anonymous;
    }
  }
  /** @private */
  __updateVisibility() {
    this.__imgVisible = !!this.img && !this.__imgFailedToLoad;
    this.__abbrVisible = !this.__imgVisible && !!this.abbr;
    this.__iconVisible = !this.__imgVisible && !this.abbr;
  }
  /** @private */
  __setTooltip(tooltip) {
    const tooltipNode = this.__tooltipNode;
    if (tooltipNode) {
      tooltipNode.text = tooltip || this.__effectiveI18n.anonymous;
    }
  }
  /** @protected */
  __onImageLoadError() {
    if (this.img) {
      console.warn(`<vaadin-avatar> The specified image could not be loaded: ${this.img}`);
      this.__imgFailedToLoad = true;
      this.__updateVisibility();
    }
  }
};
/**
 * @license
 * Copyright (c) 2020 - 2026 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
class Avatar extends AvatarMixin(ElementMixin(ThemableMixin(PolylitMixin(LumoInjectionMixin(LitElement))))) {
  static get is() {
    return "vaadin-avatar";
  }
  static get styles() {
    return avatarStyles;
  }
  static get lumoInjector() {
    return { ...super.lumoInjector, includeBaseStyles: true };
  }
  /** @protected */
  render() {
    return html`
      <img
        ?hidden="${!this.__imgVisible}"
        src="${ifDefined(this.img)}"
        aria-hidden="true"
        @error="${this.__onImageLoadError}"
        draggable="false"
      />
      <div part="icon" ?hidden="${!this.__iconVisible}" aria-hidden="true"></div>
      <svg
        part="abbr"
        ?hidden="${!this.__abbrVisible}"
        viewBox="-50 -50 100 100"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
      >
        <text dy=".35em" text-anchor="middle">${this.abbr}</text>
      </svg>

      <slot name="tooltip"></slot>
    `;
  }
  /** @protected */
  ready() {
    super.ready();
    this._tooltipController = new TooltipController(this);
    this.addController(this._tooltipController);
  }
}
defineCustomElement(Avatar);
/**
 * @license
 * Copyright (c) 2020 - 2026 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const avatarGroupMenuStyles = css`
  :host {
    display: block;
    padding: var(--vaadin-item-overlay-padding, 4px);
  }

  :host([hidden]) {
    display: none !important;
  }

  [part='items'] {
    display: contents;
  }
`;
/**
 * @license
 * Copyright (c) 2020 - 2026 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
class AvatarGroupMenu extends ListMixin(ThemableMixin(DirMixin(PolylitMixin(LumoInjectionMixin(LitElement))))) {
  static get is() {
    return "vaadin-avatar-group-menu";
  }
  static get styles() {
    return avatarGroupMenuStyles;
  }
  static get properties() {
    return {
      // We don't need to define this property since super default is vertical,
      // but we don't want it to be modified, or be shown in the API docs.
      /** @private */
      orientation: {
        readOnly: true
      }
    };
  }
  /**
   * @return {!HTMLElement}
   * @protected
   * @override
   */
  get _scrollerElement() {
    return this.shadowRoot.querySelector('[part="items"]');
  }
  /** @protected */
  render() {
    return html`
      <div part="items">
        <slot></slot>
      </div>
    `;
  }
  /** @protected */
  ready() {
    super.ready();
    this.setAttribute("role", "menu");
  }
}
defineCustomElement(AvatarGroupMenu);
/**
 * @license
 * Copyright (c) 2020 - 2026 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const menuItemStyles = css`
  [part='content'] {
    display: flex;
    align-items: center;
    gap: inherit;
  }
`;
const avatarGroupMenuItemStyles = [itemStyles, menuItemStyles];
/**
 * @license
 * Copyright (c) 2020 - 2026 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
class AvatarGroupMenuItem extends ItemMixin(ThemableMixin(DirMixin(PolylitMixin(LumoInjectionMixin(LitElement))))) {
  static get is() {
    return "vaadin-avatar-group-menu-item";
  }
  static get styles() {
    return avatarGroupMenuItemStyles;
  }
  /** @protected */
  render() {
    return html`
      <span part="checkmark" aria-hidden="true"></span>
      <div part="content">
        <slot></slot>
      </div>
    `;
  }
  /** @protected */
  ready() {
    super.ready();
    this.setAttribute("role", "menuitem");
  }
}
defineCustomElement(AvatarGroupMenuItem);
/**
 * @license
 * Copyright (c) 2020 - 2026 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
class AvatarGroupOverlay extends PositionMixin(
  OverlayMixin(DirMixin(ThemableMixin(PolylitMixin(LumoInjectionMixin(LitElement)))))
) {
  static get is() {
    return "vaadin-avatar-group-overlay";
  }
  static get styles() {
    return overlayStyles;
  }
  /** @protected */
  render() {
    return html`
      <div part="overlay" id="overlay">
        <div part="content" id="content">
          <slot></slot>
        </div>
      </div>
    `;
  }
}
defineCustomElement(AvatarGroupOverlay);
/**
 * @license
 * Copyright (c) 2020 - 2026 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const avatarGroupStyles = css`
  :host {
    display: block;
    width: 100%; /* prevent collapsing inside non-stretching column flex */
    /* 1: last on top */
    /* -1: first on top */
    --_dir: 1;
  }

  :host([theme~='reverse']) {
    --_dir: -1;
  }

  :host([hidden]) {
    display: none !important;
  }

  [part='container'] {
    display: flex;
    position: relative;
    width: 100%;
    flex-wrap: nowrap;
  }

  ::slotted(vaadin-avatar) {
    --_overlap: max(0px, var(--vaadin-avatar-group-overlap, 8px));
    --_gap: max(0px, var(--vaadin-avatar-group-gap, 2px));
    --_outline-width: var(--vaadin-focus-ring-width);
    --_d: var(--_dir);
    mask-image: url('data:image/svg+xml;utf8,<svg viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M300 0H0V300H300V0ZM150 200C177.614 200 200 177.614 200 150C200 122.386 177.614 100 150 100C122.386 100 100 122.386 100 150C100 177.614 122.386 200 150 200Z" fill="black"/></svg>');
    mask-size: calc((100% - var(--_outline-width) * 2) * 3);
    mask-position: calc(50% + (100% - var(--_outline-width) * 2 - var(--_overlap)) * var(--_d));
  }

  :host(:dir(rtl)) ::slotted(vaadin-avatar) {
    --_d: calc(var(--_dir) * -1);
  }

  ::slotted(vaadin-avatar:not(:first-of-type)) {
    margin-inline-start: calc((var(--_outline-width) + var(--_overlap) - var(--_gap)) * -1);
  }

  :host(:not([theme~='reverse'])) ::slotted(vaadin-avatar:last-child),
  :host(:not([theme~='reverse']):not([has-overflow])) ::slotted(vaadin-avatar:nth-last-child(2)),
  :host([theme~='reverse']) ::slotted(vaadin-avatar:first-of-type) {
    mask-image: none;
  }
`;
/**
 * @license
 * Copyright (c) 2020 - 2026 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const MINIMUM_DISPLAYED_AVATARS = 2;
const DEFAULT_I18N$6 = {
  anonymous: "anonymous",
  activeUsers: {
    one: "Currently one active user",
    many: "Currently {count} active users"
  },
  joined: "{user} joined",
  left: "{user} left"
};
const AvatarGroupMixin = (superClass) => class AvatarGroupMixinClass extends I18nMixin(DEFAULT_I18N$6, ResizeMixin(superClass)) {
  static get properties() {
    return {
      /**
       * An array containing the items which will be stamped as avatars.
       *
       * The items objects allow to configure [`name`](#/elements/vaadin-avatar#property-name),
       * [`abbr`](#/elements/vaadin-avatar#property-abbr), [`img`](#/elements/vaadin-avatar#property-img)
       * and [`colorIndex`](#/elements/vaadin-avatar#property-colorIndex) properties on the
       * stamped avatars, and set `className` to provide CSS class names.
       *
       * #### Example
       *
       * ```js
       * group.items = [
       *   {
       *     name: 'User name',
       *     img: 'url-to-image.png',
       *     className: 'even'
       *   },
       *   {
       *     abbr: 'JD',
       *     colorIndex: 1,
       *     className: 'odd'
       *   },
       * ];
       * ```
       *
       * @type {!Array<!AvatarGroupItem> | undefined}
       */
      items: {
        type: Array,
        sync: true
      },
      /**
       * The maximum number of avatars to display. By default, all the avatars are displayed.
       * When _maxItemsVisible_ is set, the overflowing avatars are grouped into one avatar with
       * a dropdown. Setting 0 or 1 has no effect so there are always at least two avatars visible.
       * @attr {number} max-items-visible
       */
      maxItemsVisible: {
        type: Number,
        sync: true
      },
      /** @private */
      __itemsInView: {
        type: Number,
        value: null,
        sync: true
      },
      /** @private */
      _overflowItems: {
        type: Array
      },
      /** @private */
      _overflowLimit: {
        type: Number
      },
      /** @private */
      _opened: {
        type: Boolean,
        sync: true
      }
    };
  }
  /**
   * The object used to localize this component. To change the default
   * localization, replace this with an object that provides all properties, or
   * just the individual properties you want to change.
   *
   * The object has the following JSON structure and default values:
   * ```js
   * {
   *   // Translation of the anonymous user avatar tooltip.
   *   anonymous: 'anonymous',
   *   // Translation of the avatar group accessible label.
   *   // {count} is replaced with the actual count of users.
   *   activeUsers: {
   *     one: 'Currently one active user',
   *     many: 'Currently {count} active users'
   *   },
   *   // Screen reader announcement when user joins group.
   *   // {user} is replaced with the name or abbreviation.
   *   // When neither is set, "anonymous" is used instead.
   *   joined: '{user} joined',
   *   // Screen reader announcement when user leaves group.
   *   // {user} is replaced with the name or abbreviation.
   *   // When neither is set, "anonymous" is used instead.
   *   left: '{user} left'
   * }
   * ```
   * @type {!AvatarGroupI18n}
   */
  get i18n() {
    return super.i18n;
  }
  set i18n(value) {
    super.i18n = value;
  }
  /** @protected */
  get _avatars() {
    return [...this.children].filter((node) => node.localName === "vaadin-avatar");
  }
  /** @protected */
  ready() {
    super.ready();
    this._menuController = new SlotController(this, "overlay", "vaadin-avatar-group-menu", {
      initializer: (menu) => {
        menu.addEventListener("keydown", this._onListKeyDown.bind(this));
        this._menuElement = menu;
      }
    });
    this._overflowController = new SlotController(this, "overflow", "vaadin-avatar", {
      initializer: (overflow) => {
        overflow.setAttribute("role", "button");
        overflow.setAttribute("tabindex", "0");
        overflow.setAttribute("aria-haspopup", "menu");
        overflow.setAttribute("aria-expanded", "false");
        overflow.addEventListener("click", (e) => this._onOverflowClick(e));
        overflow.addEventListener("keydown", (e) => this._onOverflowKeyDown(e));
        const tooltip = document.createElement("vaadin-tooltip");
        tooltip.setAttribute("slot", "tooltip");
        overflow.appendChild(tooltip);
        this._overflow = overflow;
        this._overflowTooltip = tooltip;
      }
    });
    this.addController(this._menuController);
    this.addController(this._overflowController);
    this._overlayElement = this.$.overlay;
  }
  /** @protected */
  disconnectedCallback() {
    super.disconnectedCallback();
    this._opened = false;
  }
  /** @protected */
  willUpdate(props) {
    super.willUpdate(props);
    if (props.has("items") || props.has("__itemsInView") || props.has("maxItemsVisible")) {
      const count = Array.isArray(this.items) ? this.items.length : 0;
      const limit = this.__getLimit(count, this.__itemsInView, this.maxItemsVisible);
      this._overflowLimit = limit;
      this._overflowItems = limit ? this.items.slice(limit) : [];
    }
  }
  /** @protected */
  updated(props) {
    super.updated(props);
    if (props.has("items")) {
      this.__itemsChanged(this.items, props.get("items"));
    }
    if (props.has("items") || props.has("_overflowLimit") || props.has("__effectiveI18n") || props.has("_theme")) {
      const limit = this._overflowLimit;
      this.__renderAvatars(limit ? this.items.slice(0, limit) : this.items || []);
    }
    if (props.has("items") || props.has("_overflowLimit")) {
      this.__updateOverflowTooltip(this.items, this._overflowLimit);
      this.__updateOverflowAvatar(this.items, this._overflowLimit, this.__itemsInView);
    }
    if (props.has("__effectiveI18n") || props.has("items")) {
      this.__i18nItemsChanged(this.__effectiveI18n, this.items);
    }
    if (props.has("_opened")) {
      this.__openedChanged(this._opened, props.get("_opened"));
    }
    if (props.has("_theme")) {
      if (this._theme) {
        this._overflow.setAttribute("theme", this._theme);
      } else {
        this._overflow.removeAttribute("theme");
      }
    }
    if (props.has("_overflowItems") || props.has("__effectiveI18n") || props.has("_theme")) {
      this.__renderMenu();
    }
  }
  /** @private */
  __getMessage(user, action) {
    return action.replace("{user}", user.name || user.abbr || this.__effectiveI18n.anonymous);
  }
  /**
   * Renders items when they are provided by the `items` property and clears the content otherwise.
   * @private
   */
  __renderMenu() {
    render(
      html`
          ${(this._overflowItems || []).map(
        (item) => html`
              <vaadin-avatar-group-menu-item>
                <vaadin-avatar
                  .name="${item.name}"
                  .abbr="${item.abbr}"
                  .img="${item.img}"
                  .colorIndex="${item.colorIndex}"
                  .i18n="${this.__effectiveI18n}"
                  class="${ifDefined(item.className)}"
                  theme="${ifDefined(this._theme)}"
                  aria-hidden="true"
                ></vaadin-avatar>
                ${item.name || ""}
              </vaadin-avatar-group-menu-item>
            `
      )}
        `,
      this._menuElement,
      { host: this }
    );
  }
  /** @private */
  _onOverflowClick(e) {
    e.stopPropagation();
    if (this._opened) {
      this.$.overlay.close();
    } else if (!e.defaultPrevented) {
      this._opened = true;
    }
  }
  /** @private */
  _onOverflowKeyDown(e) {
    if (!this._opened) {
      if (/^(Enter|SpaceBar|\s)$/u.test(e.key)) {
        e.preventDefault();
        this._opened = true;
      }
    }
  }
  /** @private */
  _onListKeyDown(event) {
    if (event.key === "Escape" || event.key === "Tab") {
      this._opened = false;
    }
  }
  /**
   * @protected
   * @override
   */
  _onResize() {
    this.__setItemsInView();
  }
  /** @private */
  _onVaadinOverlayClose(e) {
    if (e.detail.sourceEvent && e.detail.sourceEvent.composedPath().includes(this)) {
      e.preventDefault();
    }
  }
  /** @private */
  _onVaadinOverlayOpen() {
    if (this._menuElement) {
      this._menuElement.focus();
    }
  }
  /** @private */
  __renderAvatars(items) {
    render(
      html`
          ${items.map(
        (item) => html`
              <vaadin-avatar
                .name="${item.name}"
                .abbr="${item.abbr}"
                .img="${item.img}"
                .colorIndex="${item.colorIndex}"
                .i18n="${this.__effectiveI18n}"
                theme="${ifDefined(this._theme)}"
                class="${ifDefined(item.className)}"
                tabindex="0"
                with-tooltip
              ></vaadin-avatar>
            `
      )}
        `,
      this,
      { renderBefore: this._overflow }
    );
  }
  /** @private */
  __updateOverflowAvatar(items, limit, itemsInView) {
    const overflow = this._overflow;
    if (overflow) {
      const count = Array.isArray(items) ? items.length : 0;
      const maxReached = this.maxItemsVisible != null && count > this.__getMax(this.maxItemsVisible);
      overflow.abbr = `+${count - limit}`;
      const hasOverflow = maxReached || itemsInView && itemsInView < count;
      overflow.toggleAttribute("hidden", !hasOverflow);
      this.toggleAttribute("has-overflow", hasOverflow);
    }
  }
  /** @private */
  __updateOverflowTooltip(items, limit) {
    if (!Array.isArray(items)) {
      return;
    }
    if (limit == null) {
      return;
    }
    const result = [];
    for (let i = limit; i < items.length; i++) {
      const item = items[i];
      if (item) {
        result.push(item.name || item.abbr || "anonymous");
      }
    }
    this._overflowTooltip.text = result.join("\n");
  }
  /** @private */
  __getLimit(items, itemsInView, maxItemsVisible) {
    let limit = null;
    const adjustedMax = this.__getMax(maxItemsVisible);
    if (maxItemsVisible != null && adjustedMax < items) {
      limit = adjustedMax - 1;
    } else if (itemsInView && itemsInView < items) {
      limit = itemsInView;
    }
    return Math.min(limit, this.__calculateAvatarsFitWidth());
  }
  /** @private */
  __getMax(maxItemsVisible) {
    return Math.max(maxItemsVisible, MINIMUM_DISPLAYED_AVATARS);
  }
  /** @private */
  __itemsChanged(items, oldItems) {
    this.__setItemsInView();
    let added = [];
    let removed = [];
    const hasNewItems = Array.isArray(items);
    const hasOldItems = Array.isArray(oldItems);
    if (hasOldItems) {
      removed = oldItems.filter((item) => hasNewItems && !items.includes(item));
    }
    if (hasNewItems) {
      added = items.filter((item) => hasOldItems && !oldItems.includes(item));
    }
    this.__announceItemsChange(added, removed);
  }
  /** @private */
  __announceItemsChange(added, removed) {
    let addedMsg = [];
    let removedMsg = [];
    if (added) {
      addedMsg = added.map((user) => this.__getMessage(user, this.__effectiveI18n.joined || "{user} joined"));
    }
    if (removed) {
      removedMsg = removed.map((user) => this.__getMessage(user, this.__effectiveI18n.left || "{user} left"));
    }
    const messages = removedMsg.concat(addedMsg);
    if (messages.length > 0) {
      announce(messages.join(", "));
    }
  }
  /** @private */
  __i18nItemsChanged(effectiveI18n, items) {
    if (effectiveI18n && effectiveI18n.activeUsers) {
      const count = Array.isArray(items) ? items.length : 0;
      const field2 = count === 1 ? "one" : "many";
      if (effectiveI18n.activeUsers[field2]) {
        this.setAttribute("aria-label", effectiveI18n.activeUsers[field2].replace("{count}", count || 0));
      }
    }
  }
  /** @private */
  __openedChanged(opened, oldOpened) {
    if (opened) {
      this._openedWithFocusRing = this._overflow.hasAttribute("focus-ring");
    } else if (oldOpened) {
      this._overflow.focus({ focusVisible: this._openedWithFocusRing });
    }
    this._overflow.setAttribute("aria-expanded", opened === true);
  }
  /** @private */
  __setItemsInView() {
    const avatars = this._avatars;
    const items = this.items;
    if (!items || !avatars || avatars.length < 3) {
      return;
    }
    let result = this.__calculateAvatarsFitWidth();
    if (result === items.length - 1) {
      result = items.length;
    }
    if (result >= items.length && this._opened) {
      this.$.overlay.close();
      this.$.overlay._flushAnimation("closing");
    }
    this.__itemsInView = result;
  }
  /** @private */
  __calculateAvatarsFitWidth() {
    if (!this.shadowRoot || this._avatars.length < MINIMUM_DISPLAYED_AVATARS) {
      return MINIMUM_DISPLAYED_AVATARS;
    }
    const avatars = this._avatars;
    const avatarWidth = avatars[0].clientWidth;
    const { marginLeft, marginRight } = getComputedStyle(avatars[1]);
    const offset = this.__isRTL ? parseInt(marginRight, 0) - parseInt(marginLeft, 0) : parseInt(marginLeft, 0) - parseInt(marginRight, 0);
    return Math.floor((this.$.container.offsetWidth - avatarWidth) / (avatarWidth + offset));
  }
};
/**
 * @license
 * Copyright (c) 2020 - 2026 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
class AvatarGroup extends AvatarGroupMixin(ElementMixin(ThemableMixin(PolylitMixin(LumoInjectionMixin(LitElement))))) {
  static get is() {
    return "vaadin-avatar-group";
  }
  static get styles() {
    return avatarGroupStyles;
  }
  static get lumoInjector() {
    return { ...super.lumoInjector, includeBaseStyles: true };
  }
  /** @protected */
  render() {
    return html`
      <div id="container" part="container">
        <slot></slot>
        <slot name="overflow"></slot>
      </div>
      <vaadin-avatar-group-overlay
        id="overlay"
        .owner="${this}"
        .opened="${this._opened}"
        .positionTarget="${this._overflow}"
        no-vertical-overlap
        exportparts="overlay, content"
        @vaadin-overlay-close="${this._onVaadinOverlayClose}"
        @vaadin-overlay-open="${this._onVaadinOverlayOpen}"
        @opened-changed="${this._onOpenedChanged}"
      >
        <slot name="overlay"></slot>
      </vaadin-avatar-group-overlay>
    `;
  }
  /** @private */
  _onOpenedChanged(event) {
    this._opened = event.detail.value;
  }
}
defineCustomElement(AvatarGroup);
/**
 * @license
 * Copyright (c) 2024 - 2026 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const cardStyles = css`
  :host {
    --_content: 0;
    --_footer: 0;
    --_gap: var(--vaadin-card-gap, var(--vaadin-gap-m));
    --_header: max(var(--_header-prefix), var(--_title), var(--_subtitle), var(--_header-suffix));
    --_header-prefix: 0;
    --_header-suffix: 0;
    --_media: 0;
    --_padding: var(--vaadin-card-padding, var(--vaadin-padding-m));
    --_subtitle: 0;
    --_title: 0;
    background: var(--vaadin-card-background, var(--vaadin-background-container));
    border-radius: var(--vaadin-card-border-radius, var(--vaadin-radius-m));
    box-shadow: var(--vaadin-card-shadow, none);
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: var(--_gap);
    padding: var(--_padding);
    position: relative;
  }

  /* Could be an inset outline on the host as well, but let's reserve that for a potential focus outline */
  :host::before {
    border: var(--vaadin-card-border-width, 0) solid
      var(--vaadin-card-border-color, var(--vaadin-border-color-secondary));
    border-radius: inherit;
    content: '';
    inset: 0;
    pointer-events: none;
    position: absolute;
  }

  :host([hidden]) {
    display: none !important;
  }

  :host(:not([theme~='horizontal'])) {
    justify-content: space-between;
  }

  :host([_m]) {
    --_media: 1;
  }

  :host([_t]) {
    --_title: 1;
  }

  :host([_st]) {
    --_subtitle: 1;
  }

  :host([_h]) {
    --_header: 1;
    --_title: 0;
    --_subtitle: 0;
  }

  :host([_hp]) {
    --_header-prefix: 1;
  }

  :host([_hs]) {
    --_header-suffix: 1;
  }

  :host([_c]) {
    --_content: 1;
  }

  :host([_f]) {
    --_footer: 1;
  }

  [part='media'],
  [part='header'],
  [part='content'],
  [part='footer'] {
    display: none;
  }

  :host([_m]) [part='media'] {
    display: block;
  }

  :host(:is([_h], [_t], [_st], [_hp], [_hs])) [part='header'] {
    align-items: center;
    display: grid;
    gap: var(--_gap);
    row-gap: 0;
  }

  :host([_hs]) [part='header'] {
    grid-template-columns: 1fr auto;
  }

  :host([_hp]) [part='header'] {
    grid-template-columns: repeat(var(--_header-prefix), auto) 1fr;
  }

  :host([_c]) [part='content'] {
    display: block;
  }

  :host([_f]) [part='footer'] {
    display: flex;
    flex-wrap: wrap;
    gap: var(--_gap);
  }

  slot {
    border-radius: inherit;
  }

  ::slotted([slot='header-prefix']) {
    grid-column: 1;
    grid-row: 1 / span calc(var(--_title) + var(--_subtitle));
  }

  ::slotted([slot='header']),
  ::slotted([slot='title']) {
    grid-column: calc(1 + var(--_header-prefix));
    grid-row: 1;
  }

  ::slotted([slot='title']) {
    color: var(--vaadin-card-title-color, var(--vaadin-text-color)) !important;
    font-size: var(--vaadin-card-title-font-size, inherit) !important;
    font-weight: var(--vaadin-card-title-font-weight, 500) !important;
    line-height: var(--vaadin-card-title-line-height, inherit) !important;
    margin: 0 !important;
  }

  ::slotted([slot='subtitle']) {
    color: var(--vaadin-card-subtitle-color, var(--vaadin-text-color-secondary)) !important;
    font-size: var(--vaadin-card-subtitle-font-size, inherit) !important;
    font-weight: var(--vaadin-card-subtitle-font-weight, 400) !important;
    line-height: var(--vaadin-card-subtitle-line-height, inherit) !important;
    margin: 0 !important;
    grid-column: calc(1 + var(--_header-prefix));
    grid-row: calc(1 + var(--_title));
  }

  ::slotted([slot='header-suffix']) {
    grid-column: calc(2 + var(--_header-prefix));
    grid-row: 1 / span calc(var(--_title) + var(--_subtitle));
  }

  /* Horizontal */
  :host([theme~='horizontal']) {
    align-items: start;
    display: grid;
    grid-template-columns: repeat(var(--_media), minmax(auto, max-content)) 1fr;
  }

  :host([theme~='horizontal'][_f]) {
    grid-template-rows: 1fr auto;
  }

  :host([theme~='horizontal'][_c]) {
    grid-template-rows: repeat(var(--_header), auto) 1fr;
  }

  [part='media'] {
    align-self: stretch;
    border-radius: inherit;
    grid-column: 1;
    grid-row: 1 / span calc(var(--_header) + var(--_content) + var(--_footer));
  }

  [part='header'] {
    margin-bottom: auto;
    grid-column: calc(1 + var(--_media));
    grid-row: 1;
  }

  [part='content'] {
    grid-column: calc(1 + var(--_media));
    grid-row: calc(1 + var(--_header));
    flex: auto;
    min-height: 0;
  }

  [part='footer'] {
    border-radius: inherit;
    grid-column: calc(1 + var(--_media));
    grid-row: calc(1 + var(--_header) + var(--_content));
  }

  :host([theme~='horizontal']) [part='footer'] {
    align-self: end;
  }

  :host(:not([theme~='horizontal'])) ::slotted([slot='media']:is(img, video, svg)) {
    max-width: 100%;
  }

  ::slotted([slot='media']) {
    vertical-align: middle;
  }

  :host(:is([theme~='cover-media'], [theme~='stretch-media']))
    ::slotted([slot='media']:is(img, video, svg, vaadin-icon)) {
    aspect-ratio: var(--vaadin-card-media-aspect-ratio, 16/9);
    height: auto;
    object-fit: cover;
    /* Fixes an issue where an icon overflows the card boundaries on Firefox: https://github.com/vaadin/web-components/issues/8641 */
    overflow: hidden;
    width: 100%;
  }

  :host([theme~='horizontal']:is([theme~='cover-media'], [theme~='stretch-media'])) {
    grid-template-columns: repeat(var(--_media), minmax(auto, 0.5fr)) 1fr;
  }

  :host([theme~='horizontal']:is([theme~='cover-media'], [theme~='stretch-media']))
    ::slotted([slot='media']:is(img, video, svg, vaadin-icon)) {
    aspect-ratio: auto;
    height: 100%;
  }

  :host([theme~='cover-media']) {
    --_media-width: calc(100% + var(--_padding) * 2);
  }

  :host([theme~='horizontal'][theme~='cover-media']) {
    --_media-width: calc(100% + var(--_padding));
  }

  :host([theme~='cover-media']) ::slotted([slot='media']:is(img, video, svg, vaadin-icon)) {
    border-radius: inherit;
    border-end-end-radius: 0;
    border-end-start-radius: 0;
    margin-inline: calc(var(--_padding) * -1);
    margin-top: calc(var(--_padding) * -1);
    max-width: none;
    width: var(--_media-width);
  }

  :host([theme~='horizontal'][theme~='cover-media']) ::slotted([slot='media']:is(img, video, svg, vaadin-icon)) {
    border-radius: inherit;
    border-end-end-radius: 0;
    border-start-end-radius: 0;
    height: calc(100% + var(--_padding) * 2);
    margin-inline-end: 0;
  }

  /* Scroller in content */
  [part='content'] ::slotted(vaadin-scroller) {
    margin-inline: calc(var(--_padding) * -1);
    padding-inline: var(--_padding);
  }

  [part='content'] ::slotted(vaadin-scroller)::before,
  [part='content'] ::slotted(vaadin-scroller)::after {
    margin-inline: calc(var(--_padding) * -1);
  }

  /* Outlined */
  :host([theme~='outlined']) {
    --vaadin-card-border-width: 1px;
  }

  /* Elevated */
  :host([theme~='elevated']) {
    --vaadin-card-background: var(--vaadin-background-color);
    box-shadow: var(--vaadin-card-shadow, 0 1px 4px -1px rgba(0, 0, 0, 0.3));
  }
`;
/**
 * @license
 * Copyright (c) 2024 - 2026 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
class Card extends ElementMixin(ThemableMixin(PolylitMixin(LumoInjectionMixin(LitElement)))) {
  static get is() {
    return "vaadin-card";
  }
  static get styles() {
    return cardStyles;
  }
  static get lumoInjector() {
    return { ...super.lumoInjector, includeBaseStyles: true };
  }
  static get properties() {
    return {
      /**
       * The title of the card. When set, any custom slotted title is removed and this string-based title is used instead. If this title is used, an `aria-labelledby` attribute that points to the generated title element is set.
       *
       * @attr {string} card-title
       */
      cardTitle: {
        type: String,
        observer: "__cardTitleChanged"
      },
      /**
       * Sets the heading level (`aria-level`) for the string-based title. If not set, the level defaults to 2. Setting values outside the range [1, 6] can cause accessibility issues.
       *
       * @attr {number} title-heading-level
       */
      titleHeadingLevel: {
        type: Number,
        reflectToAttribute: true,
        observer: "__titleHeadingLevelChanged"
      }
    };
  }
  /** @protected */
  ready() {
    super.ready();
    if (!this.hasAttribute("role")) {
      this.setAttribute("role", "region");
    }
  }
  /** @protected */
  render() {
    return html`
      <div part="media">
        <slot name="media"></slot>
      </div>
      <div part="header">
        <slot name="header-prefix"></slot>
        <slot name="header">
          <slot name="title"></slot>
          <slot name="subtitle"></slot>
        </slot>
        <slot name="header-suffix"></slot>
      </div>
      <div part="content">
        <slot></slot>
      </div>
      <div part="footer">
        <slot name="footer"></slot>
      </div>
    `;
  }
  /** @protected */
  firstUpdated() {
    super.firstUpdated();
    this._onSlotChange();
  }
  /** @private */
  _onSlotChange() {
    this.toggleAttribute("_m", this.querySelector(':scope > [slot="media"]'));
    this.toggleAttribute("_h", this.querySelector(':scope > [slot="header"]'));
    this.toggleAttribute(
      "_t",
      this.querySelector(':scope > [slot="title"]') && !this.querySelector(':scope > [slot="header"]')
    );
    this.toggleAttribute(
      "_st",
      this.querySelector(':scope > [slot="subtitle"]') && !this.querySelector(':scope > [slot="header"]')
    );
    this.toggleAttribute("_hp", this.querySelector(':scope > [slot="header-prefix"]'));
    this.toggleAttribute("_hs", this.querySelector(':scope > [slot="header-suffix"]'));
    this.toggleAttribute("_c", this.__hasContent());
    this.toggleAttribute("_f", this.querySelector(':scope > [slot="footer"]'));
    if (this.__getCustomTitleElement()) {
      this.__clearStringTitle();
    }
  }
  /** @private */
  __hasContent() {
    const slot = this.shadowRoot.querySelector("slot:not([name])");
    return slot.assignedNodes({ flatten: true }).filter((node) => !isEmptyTextNode(node)).length > 0;
  }
  /** @private */
  __clearStringTitle() {
    const stringTitleElement = this.__getStringTitleElement();
    if (stringTitleElement) {
      this.removeChild(stringTitleElement);
    }
    const ariaLabelledby = this.getAttribute("aria-labelledby");
    if (ariaLabelledby && ariaLabelledby.startsWith("card-title-")) {
      this.removeAttribute("aria-labelledby");
    }
    if (this.cardTitle) {
      this.cardTitle = "";
    }
  }
  /** @private */
  __getCustomTitleElement() {
    return Array.from(this.querySelectorAll('[slot="title"]')).find((el) => {
      return !el.hasAttribute("card-string-title");
    });
  }
  /** @private */
  __cardTitleChanged(title) {
    if (!title) {
      this.__clearStringTitle();
      return;
    }
    const customTitleElement = this.__getCustomTitleElement();
    if (customTitleElement) {
      this.removeChild(customTitleElement);
    }
    let stringTitleElement = this.__getStringTitleElement();
    if (!stringTitleElement) {
      stringTitleElement = this.__createStringTitleElement();
      this.appendChild(stringTitleElement);
      this.setAttribute("aria-labelledby", stringTitleElement.id);
    }
    stringTitleElement.textContent = title;
  }
  /** @private */
  __createStringTitleElement() {
    const stringTitleElement = document.createElement("div");
    stringTitleElement.setAttribute("slot", "title");
    stringTitleElement.setAttribute("role", "heading");
    this.__setTitleHeadingLevel(stringTitleElement, this.titleHeadingLevel);
    stringTitleElement.setAttribute("card-string-title", "");
    stringTitleElement.id = `card-title-${generateUniqueId()}`;
    return stringTitleElement;
  }
  /** @private */
  __titleHeadingLevelChanged(titleHeadingLevel) {
    const stringTitleElement = this.__getStringTitleElement();
    if (stringTitleElement) {
      this.__setTitleHeadingLevel(stringTitleElement, titleHeadingLevel);
    }
  }
  /** @private */
  __setTitleHeadingLevel(stringTitleElement, titleHeadingLevel) {
    stringTitleElement.setAttribute("aria-level", titleHeadingLevel || 2);
  }
  /** @private */
  __getStringTitleElement() {
    return this.querySelector('[slot="title"][card-string-title]');
  }
  /**
   * @protected
   * @override
   */
  createRenderRoot() {
    const root = super.createRenderRoot();
    root.addEventListener("slotchange", () => this._onSlotChange());
    return root;
  }
}
defineCustomElement(Card);
/**
 * @license
 * Copyright (c) 2018 - 2026 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const checkboxGroupStyles = [field, group];
/**
 * @license
 * Copyright (c) 2018 - 2026 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const CheckboxGroupMixin = (superclass) => class CheckboxGroupMixinClass extends FieldMixin(FocusMixin(DisabledMixin(superclass))) {
  static get properties() {
    return {
      /**
       * An array containing values of the currently checked checkboxes.
       *
       * The array is immutable so toggling checkboxes always results in
       * creating a new array.
       */
      value: {
        type: Array,
        value: () => [],
        notify: true,
        sync: true,
        observer: "__valueChanged"
      },
      /**
       * When true, the user cannot modify the value of the checkbox group.
       * The difference between `disabled` and `readonly` is that in the
       * read-only checkbox group, all the checkboxes are also read-only,
       * and therefore remain focusable and announced by screen readers.
       */
      readonly: {
        type: Boolean,
        value: false,
        reflectToAttribute: true,
        observer: "__readonlyChanged"
      }
    };
  }
  constructor() {
    super();
    this.__registerCheckbox = this.__registerCheckbox.bind(this);
    this.__unregisterCheckbox = this.__unregisterCheckbox.bind(this);
    this.__onCheckboxCheckedChanged = this.__onCheckboxCheckedChanged.bind(this);
    this._tooltipController = new TooltipController(this);
    this._tooltipController.addEventListener("tooltip-changed", (event) => {
      const tooltip = event.detail.node;
      if (tooltip && tooltip.isConnected) {
        const inputs = this.__checkboxes.map((checkbox) => checkbox.inputElement);
        this._tooltipController.setAriaTarget(inputs);
      } else {
        this._tooltipController.setAriaTarget([]);
      }
    });
  }
  /**
   * A collection of the checkboxes.
   *
   * @return {!Array<!Checkbox>}
   * @private
   */
  get __checkboxes() {
    return this.__filterCheckboxes([...this.children]);
  }
  /** @protected */
  ready() {
    super.ready();
    this.ariaTarget = this;
    this.setAttribute("role", "group");
    const slot = this.shadowRoot.querySelector("slot:not([name])");
    this._observer = new SlotObserver(slot, ({ addedNodes, removedNodes }) => {
      const addedCheckboxes = this.__filterCheckboxes(addedNodes);
      const removedCheckboxes = this.__filterCheckboxes(removedNodes);
      addedCheckboxes.forEach(this.__registerCheckbox);
      removedCheckboxes.forEach(this.__unregisterCheckbox);
      const inputs = this.__checkboxes.map((checkbox) => checkbox.inputElement);
      this._tooltipController.setAriaTarget(inputs);
      this.__warnOfCheckboxesWithoutValue(addedCheckboxes);
    });
    this.addController(this._tooltipController);
  }
  /**
   * Override method inherited from `ValidateMixin`
   * to validate the value array.
   *
   * @override
   * @return {boolean}
   */
  checkValidity() {
    return !this.required || Boolean(this.value && this.value.length > 0);
  }
  /**
   * @param {!Array<!Node>} nodes
   * @return {!Array<!Checkbox>}
   * @private
   */
  __filterCheckboxes(nodes) {
    return nodes.filter((node) => node.nodeType === Node.ELEMENT_NODE && node.localName === "vaadin-checkbox");
  }
  /**
   * @param {!Array<!Checkbox>} checkboxes
   * @private
   */
  __warnOfCheckboxesWithoutValue(checkboxes) {
    const hasCheckboxesWithoutValue = checkboxes.some((checkbox) => {
      const { value } = checkbox;
      return !checkbox.hasAttribute("value") && (!value || value === "on");
    });
    if (hasCheckboxesWithoutValue) {
      console.warn("Please provide the value attribute to all the checkboxes inside the checkbox group.");
    }
  }
  /**
   * Registers the checkbox after adding it to the group.
   *
   * @param {!Checkbox} checkbox
   * @private
   */
  __registerCheckbox(checkbox) {
    checkbox.addEventListener("checked-changed", this.__onCheckboxCheckedChanged);
    if (this.disabled) {
      checkbox.disabled = true;
    }
    if (this.readonly) {
      checkbox.readonly = true;
    }
    if (checkbox.checked) {
      this.__addCheckboxToValue(checkbox.value);
    } else if (this.value && this.value.includes(checkbox.value)) {
      checkbox.checked = true;
    }
  }
  /**
   * Unregisters the checkbox before removing it from the group.
   *
   * @param {!Checkbox} checkbox
   * @private
   */
  __unregisterCheckbox(checkbox) {
    checkbox.removeEventListener("checked-changed", this.__onCheckboxCheckedChanged);
    if (checkbox.checked) {
      this.__removeCheckboxFromValue(checkbox.value);
    }
  }
  /**
   * Override method inherited from `DisabledMixin`
   * to propagate the `disabled` property to the checkboxes.
   *
   * @param {boolean} newValue
   * @param {boolean} oldValue
   * @override
   * @protected
   */
  _disabledChanged(newValue, oldValue) {
    super._disabledChanged(newValue, oldValue);
    if (!newValue && oldValue === void 0) {
      return;
    }
    if (oldValue !== newValue) {
      this.__checkboxes.forEach((checkbox) => {
        checkbox.disabled = newValue;
      });
    }
  }
  /**
   * @param {string} value
   * @private
   */
  __addCheckboxToValue(value) {
    if (!this.value) {
      this.value = [value];
    } else if (!this.value.includes(value)) {
      this.value = [...this.value, value];
    }
  }
  /**
   * @param {string} value
   * @private
   */
  __removeCheckboxFromValue(value) {
    if (this.value && this.value.includes(value)) {
      this.value = this.value.filter((v) => v !== value);
    }
  }
  /**
   * @param {!CustomEvent} event
   * @private
   */
  __onCheckboxCheckedChanged(event) {
    const checkbox = event.target;
    if (checkbox.checked) {
      this.__addCheckboxToValue(checkbox.value);
    } else {
      this.__removeCheckboxFromValue(checkbox.value);
    }
  }
  /**
   * @param {string[] | null | undefined} value
   * @param {string[] | null | undefined} oldValue
   * @private
   */
  __valueChanged(value, oldValue) {
    if (value && value.length === 0 && oldValue === void 0) {
      return;
    }
    this.toggleAttribute("has-value", value && value.length > 0);
    this.__checkboxes.forEach((checkbox) => {
      checkbox.checked = value && value.includes(checkbox.value);
    });
    if (oldValue !== void 0) {
      this._requestValidation();
    }
  }
  /** @private */
  __readonlyChanged(readonly, oldReadonly) {
    if (readonly || oldReadonly) {
      this.__checkboxes.forEach((checkbox) => {
        checkbox.readonly = readonly;
      });
    }
  }
  /**
   * Override method inherited from `FocusMixin`
   * to prevent removing the `focused` attribute
   * when focus moves between checkboxes inside the group.
   *
   * @param {!FocusEvent} event
   * @return {boolean}
   * @protected
   */
  _shouldRemoveFocus(event) {
    return !this.contains(event.relatedTarget);
  }
  /**
   * Override method inherited from `FocusMixin`
   * to run validation when the group loses focus.
   *
   * @param {boolean} focused
   * @override
   * @protected
   */
  _setFocused(focused) {
    super._setFocused(focused);
    if (!focused && document.hasFocus()) {
      this._requestValidation();
    }
  }
};
/**
 * @license
 * Copyright (c) 2018 - 2026 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
class CheckboxGroup extends CheckboxGroupMixin(
  ElementMixin(ThemableMixin(PolylitMixin(LumoInjectionMixin(LitElement))))
) {
  static get is() {
    return "vaadin-checkbox-group";
  }
  static get styles() {
    return checkboxGroupStyles;
  }
  /** @protected */
  render() {
    return html`
      <div class="vaadin-group-field-container">
        <div part="label">
          <slot name="label"></slot>
          <span part="required-indicator" aria-hidden="true"></span>
        </div>

        <div part="group-field">
          <slot></slot>
        </div>

        <div part="helper-text">
          <slot name="helper"></slot>
        </div>

        <div part="error-message">
          <slot name="error-message"></slot>
        </div>
      </div>

      <slot name="tooltip"></slot>
    `;
  }
}
defineCustomElement(CheckboxGroup);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const notifyChildrenConnectedChanged = (parent, isConnected) => {
  const children = parent._$disconnectableChildren;
  if (children === void 0) {
    return false;
  }
  for (const obj of children) {
    obj["_$notifyDirectiveConnectionChanged"]?.(isConnected, false);
    notifyChildrenConnectedChanged(obj, isConnected);
  }
  return true;
};
const removeDisconnectableFromParent = (obj) => {
  let parent, children;
  do {
    if ((parent = obj._$parent) === void 0) {
      break;
    }
    children = parent._$disconnectableChildren;
    children.delete(obj);
    obj = parent;
  } while (children?.size === 0);
};
const addDisconnectableToParent = (obj) => {
  for (let parent; parent = obj._$parent; obj = parent) {
    let children = parent._$disconnectableChildren;
    if (children === void 0) {
      parent._$disconnectableChildren = children = /* @__PURE__ */ new Set();
    } else if (children.has(obj)) {
      break;
    }
    children.add(obj);
    installDisconnectAPI(parent);
  }
};
function reparentDisconnectables(newParent) {
  if (this._$disconnectableChildren !== void 0) {
    removeDisconnectableFromParent(this);
    this._$parent = newParent;
    addDisconnectableToParent(this);
  } else {
    this._$parent = newParent;
  }
}
function notifyChildPartConnectedChanged(isConnected, isClearingValue = false, fromPartIndex = 0) {
  const value = this._$committedValue;
  const children = this._$disconnectableChildren;
  if (children === void 0 || children.size === 0) {
    return;
  }
  if (isClearingValue) {
    if (Array.isArray(value)) {
      for (let i = fromPartIndex; i < value.length; i++) {
        notifyChildrenConnectedChanged(value[i], false);
        removeDisconnectableFromParent(value[i]);
      }
    } else if (value != null) {
      notifyChildrenConnectedChanged(value, false);
      removeDisconnectableFromParent(value);
    }
  } else {
    notifyChildrenConnectedChanged(this, isConnected);
  }
}
const installDisconnectAPI = (obj) => {
  if (obj.type == PartType.CHILD) {
    obj._$notifyConnectionChanged ??= notifyChildPartConnectedChanged;
    obj._$reparentDisconnectables ??= reparentDisconnectables;
  }
};
class AsyncDirective extends Directive {
  constructor() {
    super(...arguments);
    this._$disconnectableChildren = void 0;
  }
  /**
   * Initialize the part with internal fields
   * @param part
   * @param parent
   * @param attributeIndex
   */
  _$initialize(part, parent, attributeIndex) {
    super._$initialize(part, parent, attributeIndex);
    addDisconnectableToParent(this);
    this.isConnected = part._$isConnected;
  }
  // This property needs to remain unminified.
  /**
   * Called from the core code when a directive is going away from a part (in
   * which case `shouldRemoveFromParent` should be true), and from the
   * `setChildrenConnected` helper function when recursively changing the
   * connection state of a tree (in which case `shouldRemoveFromParent` should
   * be false).
   *
   * @param isConnected
   * @param isClearingDirective - True when the directive itself is being
   *     removed; false when the tree is being disconnected
   * @internal
   */
  ["_$notifyDirectiveConnectionChanged"](isConnected, isClearingDirective = true) {
    if (isConnected !== this.isConnected) {
      this.isConnected = isConnected;
      if (isConnected) {
        this.reconnected?.();
      } else {
        this.disconnected?.();
      }
    }
    if (isClearingDirective) {
      notifyChildrenConnectedChanged(this, isConnected);
      removeDisconnectableFromParent(this);
    }
  }
  /**
   * Sets the value of the directive's Part outside the normal `update`/`render`
   * lifecycle of a directive.
   *
   * This method should not be called synchronously from a directive's `update`
   * or `render`.
   *
   * @param directive The directive to update
   * @param value The value to set
   */
  setValue(value) {
    if (isSingleExpression(this.__part)) {
      this.__part._$setValue(value, this);
    } else {
      if (this.__attributeIndex === void 0) {
        throw new Error(`Expected this.__attributeIndex to be a number`);
      }
      const newValues = [...this.__part._$committedValue];
      newValues[this.__attributeIndex] = value;
      this.__part._$setValue(newValues, this, 0);
    }
  }
  /**
   * User callbacks for implementing logic to release any resources/subscriptions
   * that may have been retained by this directive. Since directives may also be
   * re-connected, `reconnected` should also be implemented to restore the
   * working state of the directive prior to the next render.
   */
  disconnected() {
  }
  reconnected() {
  }
}
class FlowComponentDirective extends AsyncDirective {
  constructor(partInfo) {
    super(partInfo);
    if (partInfo.type !== PartType.CHILD) {
      throw new Error(`${this.constructor.directiveName}() can only be used in child bindings`);
    }
  }
  update(part, [appid, nodeid]) {
    this.updateContent(part, appid, nodeid);
    return noChange;
  }
  updateContent(part, appid, nodeid) {
    const { parentNode, startNode } = part;
    this.__parentNode = parentNode;
    const hasNewNodeId = nodeid !== void 0 && nodeid !== null;
    const newNode = hasNewNodeId ? this.getNewNode(appid, nodeid) : null;
    const oldNode = this.getOldNode(part);
    clearTimeout(this.__parentNode.__nodeRetryTimeout);
    if (hasNewNodeId && !newNode) {
      this.__parentNode.__nodeRetryTimeout = setTimeout(() => this.updateContent(part, appid, nodeid));
    } else if (oldNode === newNode) {
      return;
    } else if (oldNode && newNode) {
      parentNode.replaceChild(newNode, oldNode);
    } else if (oldNode) {
      parentNode.removeChild(oldNode);
    } else if (newNode) {
      startNode.after(newNode);
    }
  }
  getNewNode(appid, nodeid) {
    return window.Vaadin.Flow.clients[appid].getByNodeId(nodeid);
  }
  getOldNode(part) {
    const { startNode, endNode } = part;
    if (startNode.nextSibling === endNode) {
      return;
    }
    return startNode.nextSibling;
  }
  disconnected() {
    clearTimeout(this.__parentNode.__nodeRetryTimeout);
  }
}
const flowComponentDirective = directive(FlowComponentDirective);
function getNode(appid, nodeid) {
  return flowComponentDirective(appid, nodeid);
}
function setChildNodes(appid, nodeIds, root) {
  render(html`${nodeIds.map((id) => flowComponentDirective(appid, id))}`, root);
}
function patchVirtualContainer(container) {
  const originalInsertBefore = container.insertBefore;
  container.insertBefore = function(newNode, referenceNode) {
    if (referenceNode && referenceNode.parentNode === this) {
      return originalInsertBefore.call(this, newNode, referenceNode);
    } else {
      return originalInsertBefore.call(this, newNode, null);
    }
  };
}
window.Vaadin ||= {};
window.Vaadin.FlowComponentHost ||= { patchVirtualContainer, getNode, setChildNodes };
window.Vaadin.Flow.comboBoxConnector = {};
window.Vaadin.Flow.comboBoxConnector.initLazy = (comboBox) => {
  if (comboBox.$connector) {
    return;
  }
  comboBox.$connector = {};
  const pageCallbacks = {};
  let cache = {};
  let lastFilter = "";
  const placeHolder = new window.Vaadin.ComboBoxPlaceholder();
  const serverFacade = /* @__PURE__ */ (() => {
    let lastFilterSentToServer = "";
    let dataCommunicatorResetNeeded = false;
    const needsDataCommunicatorReset = () => dataCommunicatorResetNeeded = true;
    const getLastFilterSentToServer = () => lastFilterSentToServer;
    const requestData = (startIndex, endIndex, params) => {
      const count = endIndex - startIndex;
      const filter = params.filter;
      comboBox.$server.setViewportRange(startIndex, count, filter);
      lastFilterSentToServer = filter;
      if (dataCommunicatorResetNeeded) {
        comboBox.$server.resetDataCommunicator();
        dataCommunicatorResetNeeded = false;
      }
    };
    return {
      needsDataCommunicatorReset,
      getLastFilterSentToServer,
      requestData
    };
  })();
  const clearPageCallbacks = (pages = Object.keys(pageCallbacks)) => {
    pages.forEach((page) => {
      pageCallbacks[page]([], comboBox.size);
      delete pageCallbacks[page];
      const pageStart = parseInt(page) * comboBox.pageSize;
      const pageEnd = pageStart + comboBox.pageSize;
      const end = Math.min(pageEnd, comboBox.filteredItems.length);
      for (let i = pageStart; i < end; i++) {
        comboBox.filteredItems[i] = placeHolder;
      }
    });
  };
  comboBox.dataProvider = function(params, callback) {
    if (params.pageSize != comboBox.pageSize) {
      throw "Invalid pageSize";
    }
    if (comboBox._clientSideFilter) {
      if (cache[0]) {
        performClientSideFilter(cache[0], params.filter, callback);
        return;
      } else {
        params.filter = "";
      }
    }
    const filterChanged = params.filter !== lastFilter;
    if (filterChanged) {
      cache = {};
      lastFilter = params.filter;
      comboBox._filterDebouncer = Debouncer.debounce(
        comboBox._filterDebouncer,
        timeOut.after(comboBox._filterTimeout ?? 500),
        () => {
          if (serverFacade.getLastFilterSentToServer() === params.filter) {
            serverFacade.needsDataCommunicatorReset();
          }
          if (params.filter !== lastFilter) {
            throw new Error("Expected params.filter to be '" + lastFilter + "' but was '" + params.filter + "'");
          }
          comboBox._filterDebouncer = void 0;
          clearPageCallbacks();
          comboBox.dataProvider(params, callback);
        }
      );
      return;
    }
    if (comboBox._filterDebouncer) {
      pageCallbacks[params.page] = callback;
      return;
    }
    if (cache[params.page]) {
      commitPage(params.page, callback);
    } else {
      pageCallbacks[params.page] = callback;
      const maxRangeCount = Math.max(params.pageSize * 2, 500);
      const activePages = Object.keys(pageCallbacks).map((page) => parseInt(page));
      const rangeMin = Math.min(...activePages);
      const rangeMax = Math.max(...activePages);
      if (activePages.length * params.pageSize > maxRangeCount) {
        if (params.page === rangeMin) {
          clearPageCallbacks([String(rangeMax)]);
        } else {
          clearPageCallbacks([String(rangeMin)]);
        }
        comboBox.dataProvider(params, callback);
      } else if (rangeMax - rangeMin + 1 !== activePages.length) {
        clearPageCallbacks();
      } else {
        const startIndex = params.pageSize * rangeMin;
        const endIndex = params.pageSize * (rangeMax + 1);
        serverFacade.requestData(startIndex, endIndex, params);
      }
    }
  };
  comboBox.$connector.clear = (start, length) => {
    const firstPageToClear = Math.floor(start / comboBox.pageSize);
    const numberOfPagesToClear = Math.ceil(length / comboBox.pageSize);
    for (let i = firstPageToClear; i < firstPageToClear + numberOfPagesToClear; i++) {
      delete cache[i];
    }
  };
  comboBox.$connector.filter = (item, filter) => {
    filter = filter ? filter.toString().toLowerCase() : "";
    return comboBox._getItemLabel(item, comboBox.itemLabelPath).toString().toLowerCase().indexOf(filter) > -1;
  };
  comboBox.$connector.set = (index, items, filter) => {
    if (filter != serverFacade.getLastFilterSentToServer()) {
      return;
    }
    if (index % comboBox.pageSize != 0) {
      throw "Got new data to index " + index + " which is not aligned with the page size of " + comboBox.pageSize;
    }
    if (index === 0 && items.length === 0 && pageCallbacks[0]) {
      cache[0] = [];
      return;
    }
    const firstPageToSet = index / comboBox.pageSize;
    const updatedPageCount = Math.ceil(items.length / comboBox.pageSize);
    for (let i = 0; i < updatedPageCount; i++) {
      let page = firstPageToSet + i;
      let slice = items.slice(i * comboBox.pageSize, (i + 1) * comboBox.pageSize);
      cache[page] = slice;
    }
  };
  comboBox.$connector.updateData = (items) => {
    const itemsMap = new Map(items.map((item) => [item.key, item]));
    comboBox.filteredItems = comboBox.filteredItems.map((item) => {
      return itemsMap.get(item.key) || item;
    });
  };
  comboBox.$connector.updateSize = function(newSize) {
    if (!comboBox._clientSideFilter) {
      comboBox.size = newSize;
    }
  };
  comboBox.$connector.reset = function() {
    if (comboBox._filterDebouncer) {
      comboBox._filterDebouncer.cancel();
      comboBox._filterDebouncer = void 0;
    }
    clearPageCallbacks();
    cache = {};
    comboBox.clearCache();
  };
  comboBox.$connector.confirm = function(id, filter) {
    if (filter != serverFacade.getLastFilterSentToServer()) {
      return;
    }
    let activePages = Object.getOwnPropertyNames(pageCallbacks);
    for (let i = 0; i < activePages.length; i++) {
      let page = activePages[i];
      if (cache[page]) {
        commitPage(page, pageCallbacks[page]);
      }
    }
    comboBox.$server.confirmUpdate(id);
  };
  const commitPage = function(page, callback) {
    let data = cache[page];
    if (comboBox._clientSideFilter) {
      performClientSideFilter(data, comboBox.filter, callback);
    } else {
      delete cache[page];
      callback(data, comboBox.size);
    }
  };
  const performClientSideFilter = function(page, filter, callback) {
    let filteredItems = page;
    if (filter) {
      filteredItems = page.filter((item) => comboBox.$connector.filter(item, filter));
    }
    callback(filteredItems, filteredItems.length);
  };
  comboBox.addEventListener("custom-value-set", (e) => e.preventDefault());
  comboBox.itemClassNameGenerator = function(item) {
    return item.className || "";
  };
};
window.Vaadin.ComboBoxPlaceholder = ComboBoxPlaceholder;
function getContainer(appId, nodeId) {
  try {
    return window.Vaadin.Flow.clients[appId].getByNodeId(nodeId);
  } catch (error) {
    console.error("Could not get node %s from app %s", nodeId, appId);
    console.error(error);
  }
}
function initLazy$1(contextMenu, appId) {
  if (contextMenu.$connector) {
    return;
  }
  contextMenu.$connector = {
    /**
     * Generates and assigns the items to the context menu.
     *
     * @param {number} nodeId
     */
    generateItems(nodeId) {
      const items = generateItemsTree(appId, nodeId);
      contextMenu.items = items;
    }
  };
}
function generateItemsTree(appId, nodeId) {
  const container = getContainer(appId, nodeId);
  if (!container) {
    return;
  }
  return Array.from(container.children).map((child) => {
    const item = {
      component: child,
      checked: child._checked,
      keepOpen: child._keepOpen,
      className: child.className,
      theme: child.__theme
    };
    if (child._hasVaadinItemMixin && child._containerNodeId) {
      item.children = generateItemsTree(appId, child._containerNodeId);
    }
    child._item = item;
    return item;
  });
}
function setChecked(component, checked) {
  if (component._item) {
    component._item.checked = checked;
    if (component._item.keepOpen) {
      component.toggleAttribute("menu-item-checked", checked);
    }
  }
}
function setKeepOpen(component, keepOpen) {
  if (component._item) {
    component._item.keepOpen = keepOpen;
  }
}
function setTheme(component, theme) {
  if (component._item) {
    component._item.theme = theme;
  }
}
window.Vaadin.Flow.contextMenuConnector = {
  initLazy: initLazy$1,
  generateItemsTree,
  setChecked,
  setKeepOpen,
  setTheme
};
function init(target) {
  if (target.$contextMenuTargetConnector) {
    return;
  }
  target.$contextMenuTargetConnector = {
    openOnHandler(e) {
      if (target.preventContextMenu && target.preventContextMenu(e)) {
        return;
      }
      e.preventDefault();
      e.stopPropagation();
      this.$contextMenuTargetConnector.openEvent = e;
      let detail = {};
      if (target.getContextMenuBeforeOpenDetail) {
        detail = target.getContextMenuBeforeOpenDetail(e);
      }
      target.dispatchEvent(
        new CustomEvent("vaadin-context-menu-before-open", {
          detail
        })
      );
    },
    updateOpenOn(eventType) {
      this.removeListener();
      this.openOnEventType = eventType;
      customElements.whenDefined("vaadin-context-menu").then(() => {
        if (gestures[eventType]) {
          addListener(target, eventType, this.openOnHandler);
        } else {
          target.addEventListener(eventType, this.openOnHandler);
        }
      });
    },
    removeListener() {
      if (this.openOnEventType) {
        if (gestures[this.openOnEventType]) {
          removeListener(target, this.openOnEventType, this.openOnHandler);
        } else {
          target.removeEventListener(this.openOnEventType, this.openOnHandler);
        }
      }
    },
    openMenu(contextMenu) {
      contextMenu.open(this.openEvent);
    },
    removeConnector() {
      this.removeListener();
      target.$contextMenuTargetConnector = void 0;
    }
  };
}
window.Vaadin.Flow.contextMenuTargetConnector = { init };
/**
 * @license
 * Copyright (c) 2019 - 2026 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const defaultParseValue = (value) => {
  return value.split("	");
};
const defaultFormatValue = (inputValues) => {
  return inputValues.join("	");
};
const CustomFieldMixin = (superClass) => class CustomFieldMixin extends FieldMixin(FocusMixin(KeyboardMixin(superClass))) {
  static get properties() {
    return {
      /**
       * The name of the control, which is submitted with the form data.
       */
      name: {
        type: String
      },
      /**
       * The value of the field. When wrapping several inputs, it will contain `\t`
       * (Tab character) as a delimiter indicating parts intended to be used as the
       * corresponding inputs values.
       * Use the [`formatValue`](#/elements/vaadin-custom-field#property-formatValue)
       * and [`parseValue`](#/elements/vaadin-custom-field#property-parseValue)
       * properties to customize this behavior.
       */
      value: {
        type: String,
        observer: "__valueChanged",
        notify: true,
        sync: true
      },
      /**
       * Array of available input nodes
       * @type {!Array<!HTMLElement> | undefined}
       */
      inputs: {
        type: Array,
        readOnly: true,
        observer: "__inputsChanged"
      },
      /**
       * A function to format the values of the individual fields contained by
       * the custom field into a single component value. The function receives
       * an array of all values of the individual fields in the order of their
       * presence in the DOM, and must return a single component value.
       * This function is called each time a value of an internal field is
       * changed.
       *
       * Example:
       * ```js
       * customField.formatValue = (fieldValues) => {
       *   return fieldValues.join("-");
       * }
       * ```
       * @type {!CustomFieldFormatValueFn | undefined}
       */
      formatValue: {
        type: Function
      },
      /**
       * A function to parse the component value into values for the individual
       * fields contained by the custom field. The function receives the
       * component value, and must return an array of values for the individual
       * fields in the order of their presence in the DOM.
       * The function is called each time the value of the component changes.
       *
       * Example:
       * ```js
       * customField.parseValue = (componentValue) => {
       *   return componentValue.split("-");
       * }
       * ```
       * @type {!CustomFieldParseValueFn | undefined}
       */
      parseValue: {
        type: Function
      }
    };
  }
  /** @protected */
  ready() {
    super.ready();
    this.setAttribute("role", "group");
    this.ariaTarget = this;
    this.__childrenObserver = new MutationObserver(() => {
      this.__setInputsFromSlot();
    });
    this.__setInputsFromSlot();
    this.$.slot.addEventListener("slotchange", () => {
      this.__setInputsFromSlot();
      getFlattenedElements(this.$.slot).filter((el) => !this.__isInput(el)).forEach((el) => {
        this.__childrenObserver.observe(el, { childList: true });
      });
    });
    this._tooltipController = new TooltipController(this);
    this.addController(this._tooltipController);
    this._tooltipController.setShouldShow((target) => {
      const inputs = target.inputs || [];
      return !inputs.some((el) => el.opened);
    });
  }
  /**
   * @param {FocusOptions=} options
   * @protected
   * @override
   */
  focus(options) {
    if (this.inputs && this.inputs[0]) {
      this.inputs[0].focus(options);
    }
  }
  /**
   * Override method inherited from `FocusMixin` to validate on blur.
   * @param {boolean} focused
   * @protected
   */
  _setFocused(focused) {
    super._setFocused(focused);
    if (!focused) {
      this._requestValidation();
    }
  }
  /**
   * Override method inherited from `FocusMixin` to not remove focused
   * state when focus moves to another input in the custom field.
   * @param {FocusEvent} event
   * @return {boolean}
   * @protected
   */
  _shouldRemoveFocus(event) {
    const { relatedTarget } = event;
    return !this.inputs || !this.inputs.some((el) => relatedTarget === (el.focusElement || el));
  }
  /**
   * Returns true if the current inputs values satisfy all constraints (if any).
   *
   * @return {boolean}
   */
  checkValidity() {
    const hasInvalidFields = this.inputs && this.inputs.some((input) => !(input.validate || input.checkValidity).call(input));
    if (hasInvalidFields || this.required && !(this.value && this.value.trim())) {
      return false;
    }
    return true;
  }
  /**
   * Override an observer from `FieldMixin`
   * to validate when required is removed.
   *
   * @protected
   * @override
   */
  _requiredChanged(required) {
    super._requiredChanged(required);
    if (required === false) {
      this._requestValidation();
    }
  }
  /**
   * @param {KeyboardEvent} e
   * @protected
   * @override
   */
  _onKeyDown(e) {
    if (e.key === "Tab") {
      const inputs = this.inputs || [];
      if (inputs.indexOf(e.target) < inputs.length - 1 && !e.shiftKey || inputs.indexOf(e.target) > 0 && e.shiftKey) {
        return;
      }
      this.__setValue();
    }
  }
  /** @protected */
  _onInputChange(event) {
    event.stopPropagation();
    this.__setValue();
    this._requestValidation();
    this.dispatchEvent(
      new CustomEvent("change", {
        bubbles: true,
        cancelable: false,
        detail: {
          value: this.value
        }
      })
    );
  }
  /** @private */
  __setValue() {
    this.__settingValue = true;
    const formatFn = this.formatValue || defaultFormatValue;
    this.value = formatFn.apply(this, [this.inputs.map((input) => input.value)]);
    this.__settingValue = false;
  }
  /** @private */
  __isInput(node) {
    const isSlottedInput = node.getAttribute("slot") === "input" || node.getAttribute("slot") === "textarea";
    return !isSlottedInput && (node.validate || node.checkValidity);
  }
  /** @private */
  __getInputsFromSlot() {
    return getFlattenedElements(this.$.slot).filter((node) => this.__isInput(node));
  }
  /** @private */
  __setInputsFromSlot() {
    this._setInputs(this.__getInputsFromSlot());
  }
  /** @private */
  __inputsChanged(inputs, oldInputs) {
    if (inputs.length === 0) {
      if (oldInputs && oldInputs.length > 0) {
        this.__setValue();
      }
      return;
    }
    if (this.value && this.value !== "	" && (!oldInputs || oldInputs.length === 0)) {
      this.__applyInputsValue(this.value);
    } else {
      this.__setValue();
    }
  }
  /** @private */
  __toggleHasValue(value) {
    this.toggleAttribute("has-value", value !== null && value.trim() !== "");
  }
  /** @private */
  __valueChanged(value, oldValue) {
    this.__toggleHasValue(value);
    if (this.__settingValue || !this.inputs) {
      return;
    }
    this.__applyInputsValue(value || "	");
    if (oldValue !== void 0) {
      this._requestValidation();
    }
  }
  /** @private */
  __applyInputsValue(value) {
    const parseFn = this.parseValue || defaultParseValue;
    const valuesArray = parseFn.apply(this, [value]);
    if (!valuesArray || valuesArray.length === 0) {
      console.warn("Value parser has not provided values array");
      return;
    }
    this.inputs.forEach((input, idx) => {
      input.value = valuesArray[idx];
    });
  }
};
/**
 * @license
 * Copyright (c) 2019 - 2026 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
class CustomField extends CustomFieldMixin(ThemableMixin(ElementMixin(PolylitMixin(LumoInjectionMixin(LitElement))))) {
  static get is() {
    return "vaadin-custom-field";
  }
  static get styles() {
    return field;
  }
  /** @protected */
  render() {
    return html`
      <div class="vaadin-custom-field-container">
        <div part="label" @click="${this.focus}">
          <slot name="label"></slot>
          <span part="required-indicator" aria-hidden="true"></span>
        </div>

        <div class="inputs-wrapper" part="input-fields" @change="${this._onInputChange}">
          <slot id="slot"></slot>
        </div>

        <div part="helper-text">
          <slot name="helper"></slot>
        </div>

        <div part="error-message">
          <slot name="error-message"></slot>
        </div>
      </div>

      <slot name="tooltip"></slot>
    `;
  }
  /**
   * Fired when the user commits a value change for any of the internal inputs.
   *
   * @event change
   */
}
defineCustomElement(CustomField);
/**
 * @license
 * Copyright (c) 2016 - 2026 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const datePickerOverlayStyles = css`
  [part='overlay'] {
    display: flex;
    flex: auto;
    max-height: var(--vaadin-date-picker-overlay-max-height, 30rem);
    box-sizing: content-box;
    width: var(
      --vaadin-date-picker-overlay-width,
      calc(
        var(--vaadin-date-picker-date-width, 2rem) * 7 +
          var(--vaadin-date-picker-month-padding, var(--vaadin-padding-s)) * 2 +
          var(--vaadin-date-picker-year-scroller-width, 3rem)
      )
    );
    cursor: default;
  }

  :host([fullscreen]) {
    --vaadin-date-picker-date-width: calc(100% / 7);
  }

  :host([fullscreen]) [part='backdrop'] {
    display: block;
  }

  :host([fullscreen]) [part='overlay'] {
    border: none;
    border-radius: 0;
    max-height: 75vh;
    width: 100%;
  }

  [part~='content'] {
    flex: auto;
  }

  @media (max-width: 450px), (max-height: 450px) {
    :host {
      inset: auto 0 0 !important;
    }
  }
`;
/**
 * @license
 * Copyright (c) 2015 - 2026 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const DatePickerOverlayMixin = (superClass) => class DatePickerOverlayMixin extends PositionMixin(OverlayMixin(superClass)) {
  /**
   * Override method inherited from `OverlayMixin` to not close on input click.
   * Needed to ignore date-picker's own input in the mousedown listener below.
   *
   * @param {Event} event
   * @return {boolean}
   * @protected
   */
  _shouldCloseOnOutsideClick(event) {
    const eventPath = event.composedPath();
    return !eventPath.includes(this.positionTarget);
  }
  /**
   * @protected
   * @override
   */
  _mouseDownListener(event) {
    super._mouseDownListener(event);
    if (this._shouldCloseOnOutsideClick(event) && !isElementFocusable(event.composedPath()[0])) {
      event.preventDefault();
    }
  }
};
/**
 * @license
 * Copyright (c) 2016 - 2026 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
class DatePickerOverlay extends DatePickerOverlayMixin(
  DirMixin(ThemableMixin(PolylitMixin(LumoInjectionMixin(LitElement))))
) {
  static get is() {
    return "vaadin-date-picker-overlay";
  }
  static get styles() {
    return [overlayStyles, datePickerOverlayStyles];
  }
  /** @protected */
  render() {
    return html`
      <div id="backdrop" part="backdrop" ?hidden="${!this.withBackdrop}"></div>
      <div part="overlay" id="overlay">
        <div part="content" id="content">
          <slot></slot>
        </div>
      </div>
    `;
  }
  /**
   * Override method from `OverlayFocusMixin` to specify content root
   * used to detect whether focus should be restored on overlay close.
   *
   * @protected
   * @override
   */
  get _contentRoot() {
    return this.owner._overlayContent;
  }
}
defineCustomElement(DatePickerOverlay);
/**
 * @license
 * Copyright (c) 2016 - 2026 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
function getISOWeekNumber(date) {
  let dayOfWeek = date.getDay();
  if (dayOfWeek === 0) {
    dayOfWeek = 7;
  }
  const nearestThursdayDiff = 4 - dayOfWeek;
  const nearestThursday = new Date(date.getTime() + nearestThursdayDiff * 24 * 3600 * 1e3);
  const firstOfJanuary = new Date(0, 0);
  firstOfJanuary.setFullYear(nearestThursday.getFullYear());
  const timeDiff = nearestThursday.getTime() - firstOfJanuary.getTime();
  const daysSinceFirstOfJanuary = Math.round(timeDiff / (24 * 3600 * 1e3));
  return Math.floor(daysSinceFirstOfJanuary / 7 + 1);
}
function normalizeDate(date) {
  const normalizedDate = new Date(date);
  normalizedDate.setHours(0, 0, 0, 0);
  return normalizedDate;
}
function normalizeUTCDate(date) {
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), 0, 0, 0, 0));
}
function dateEquals(date1, date2, normalizer = normalizeDate) {
  return date1 instanceof Date && date2 instanceof Date && normalizer(date1).getTime() === normalizer(date2).getTime();
}
function extractDateParts(date) {
  return {
    day: date.getDate(),
    month: date.getMonth(),
    year: date.getFullYear()
  };
}
function dateAllowed(date, min, max, isDateDisabled) {
  let dateIsDisabled = false;
  if (typeof isDateDisabled === "function" && !!date) {
    const dateToCheck = extractDateParts(date);
    dateIsDisabled = isDateDisabled(dateToCheck);
  }
  return (!min || date >= min) && (!max || date <= max) && !dateIsDisabled;
}
function getClosestDate(date, dates) {
  return dates.filter((date2) => date2 !== void 0).reduce((closestDate, candidate) => {
    if (!candidate) {
      return closestDate;
    }
    if (!closestDate) {
      return candidate;
    }
    const candidateDiff = Math.abs(date.getTime() - candidate.getTime());
    const closestDateDiff = Math.abs(closestDate.getTime() - date.getTime());
    return candidateDiff < closestDateDiff ? candidate : closestDate;
  });
}
function dateAfterXMonths(months) {
  const today = /* @__PURE__ */ new Date();
  const result = new Date(today);
  result.setDate(1);
  result.setMonth(parseInt(months) + today.getMonth());
  return result;
}
function getAdjustedYear(referenceDate, year, month = 0, day = 1) {
  if (year > 99) {
    throw new Error("The provided year cannot have more than 2 digits.");
  }
  if (year < 0) {
    throw new Error("The provided year cannot be negative.");
  }
  let adjustedYear = year + Math.floor(referenceDate.getFullYear() / 100) * 100;
  if (referenceDate < new Date(adjustedYear - 50, month, day)) {
    adjustedYear -= 100;
  } else if (referenceDate > new Date(adjustedYear + 50, month, day)) {
    adjustedYear += 100;
  }
  return adjustedYear;
}
function parseDate(str) {
  const parts = /^([-+]\d{1}|\d{2,4}|[-+]\d{6})-(\d{1,2})-(\d{1,2})$/u.exec(str);
  if (!parts) {
    return void 0;
  }
  const date = new Date(0, 0);
  date.setFullYear(parseInt(parts[1], 10));
  date.setMonth(parseInt(parts[2], 10) - 1);
  date.setDate(parseInt(parts[3], 10));
  return date;
}
function parseUTCDate(str) {
  const parts = /^([-+]\d{1}|\d{2,4}|[-+]\d{6})-(\d{1,2})-(\d{1,2})$/u.exec(str);
  if (!parts) {
    return void 0;
  }
  const date = new Date(Date.UTC(0, 0));
  date.setUTCFullYear(parseInt(parts[1], 10));
  date.setUTCMonth(parseInt(parts[2], 10) - 1);
  date.setUTCDate(parseInt(parts[3], 10));
  return date;
}
function formatISODateBase(dateParts) {
  const pad = (num, fmt = "00") => (fmt + num).substr((fmt + num).length - fmt.length);
  let yearSign = "";
  let yearFmt = "0000";
  let yearAbs = dateParts.year;
  if (yearAbs < 0) {
    yearAbs = -yearAbs;
    yearSign = "-";
    yearFmt = "000000";
  } else if (dateParts.year >= 1e4) {
    yearSign = "+";
    yearFmt = "000000";
  }
  const year = yearSign + pad(yearAbs, yearFmt);
  const month = pad(dateParts.month + 1);
  const day = pad(dateParts.day);
  return [year, month, day].join("-");
}
function formatISODate(date) {
  if (!(date instanceof Date)) {
    return "";
  }
  return formatISODateBase({
    year: date.getFullYear(),
    month: date.getMonth(),
    day: date.getDate()
  });
}
function formatUTCISODate(date) {
  if (!(date instanceof Date)) {
    return "";
  }
  return formatISODateBase({
    year: date.getUTCFullYear(),
    month: date.getUTCMonth(),
    day: date.getUTCDate()
  });
}
/**
 * @license
 * Copyright (c) 2016 - 2026 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const template$2 = document.createElement("template");
template$2.innerHTML = `
  <style>
    :host {
      display: block;
      overflow: hidden;
      height: 500px;
    }

    #scroller {
      position: relative;
      height: 100%;
      overflow: auto;
      outline: none;
      overflow-x: hidden;
      scrollbar-width: none;
    }

    #scroller::-webkit-scrollbar {
      display: none;
    }

    .buffer {
      position: absolute;
      width: var(--vaadin-infinite-scroller-buffer-width, 100%);
      box-sizing: border-box;
      top: var(--vaadin-infinite-scroller-buffer-offset, 0);
    }
  </style>

  <div id="scroller" tabindex="-1">
    <div class="buffer"></div>
    <div class="buffer"></div>
    <div id="fullHeight"></div>
  </div>
`;
class InfiniteScroller extends HTMLElement {
  constructor() {
    super();
    const root = this.attachShadow({ mode: "open" });
    root.appendChild(template$2.content.cloneNode(true));
    this.bufferSize = 20;
    this._initialScroll = 5e5;
    this._initialIndex = 0;
    this._activated = false;
  }
  /**
   * @return {boolean}
   */
  get active() {
    return this._activated;
  }
  set active(active) {
    if (active && !this._activated) {
      this._createPool();
      this._activated = true;
    }
  }
  /**
   * @return {number}
   */
  get bufferOffset() {
    return this._buffers[0].offsetTop;
  }
  /**
   * @return {number}
   */
  get itemHeight() {
    if (!this._itemHeightVal) {
      const itemHeight = getComputedStyle(this).getPropertyValue("--vaadin-infinite-scroller-item-height");
      const tmpStyleProp = "background-position";
      this.$.fullHeight.style.setProperty(tmpStyleProp, itemHeight);
      const itemHeightPx = getComputedStyle(this.$.fullHeight).getPropertyValue(tmpStyleProp);
      this.$.fullHeight.style.removeProperty(tmpStyleProp);
      this._itemHeightVal = parseFloat(itemHeightPx);
    }
    return this._itemHeightVal;
  }
  /** @private */
  get _bufferHeight() {
    return this.itemHeight * this.bufferSize;
  }
  /**
   * @return {number}
   */
  get position() {
    return (this.$.scroller.scrollTop - this._buffers[0].translateY) / this.itemHeight + this._firstIndex;
  }
  /**
   * Current scroller position as index. Can be a fractional number.
   *
   * @type {number}
   */
  set position(index) {
    this._preventScrollEvent = true;
    if (index > this._firstIndex && index < this._firstIndex + this.bufferSize * 2) {
      this.$.scroller.scrollTop = this.itemHeight * (index - this._firstIndex) + this._buffers[0].translateY;
    } else {
      this._initialIndex = ~~index;
      this._reset();
      this._scrollDisabled = true;
      this.$.scroller.scrollTop += index % 1 * this.itemHeight;
      this._scrollDisabled = false;
    }
  }
  /** @protected */
  connectedCallback() {
    if (!this._ready) {
      this._ready = true;
      this.$ = {};
      this.shadowRoot.querySelectorAll("[id]").forEach((node) => {
        this.$[node.id] = node;
      });
      this.$.scroller.addEventListener("scroll", () => this._scroll());
      this._buffers = [...this.shadowRoot.querySelectorAll(".buffer")];
      this.$.fullHeight.style.height = `${this._initialScroll * 2}px`;
    }
  }
  /** @protected */
  disconnectedCallback() {
    if (this._debouncerScrollFinish) {
      this._debouncerScrollFinish.cancel();
    }
    if (this._debouncerUpdateClones) {
      this._debouncerUpdateClones.cancel();
    }
    if (this.__pendingFinishInit) {
      cancelAnimationFrame(this.__pendingFinishInit);
    }
  }
  /**
   * Force the scroller to update clones after a reset, without
   * waiting for the debouncer to resolve.
   */
  forceUpdate() {
    if (this._debouncerScrollFinish) {
      this._debouncerScrollFinish.flush();
    }
    if (this._debouncerUpdateClones) {
      this._buffers[0].updated = this._buffers[1].updated = false;
      this._updateClones();
      this._debouncerUpdateClones.cancel();
    }
  }
  /**
   * @protected
   * @override
   */
  _createElement() {
  }
  /**
   * @param {HTMLElement} _element
   * @param {number} _index
   * @protected
   * @override
   */
  _updateElement(_element, _index) {
  }
  /** @private */
  _finishInit() {
    if (!this._initDone) {
      this._buffers.forEach((buffer) => {
        [...buffer.children].forEach((slot) => {
          this._ensureStampedInstance(slot._itemWrapper);
        });
      });
      if (!this._buffers[0].translateY) {
        this._reset();
      }
      this._initDone = true;
      this.dispatchEvent(new CustomEvent("init-done"));
    }
  }
  /** @private */
  _translateBuffer(up) {
    const index = up ? 1 : 0;
    this._buffers[index].translateY = this._buffers[index ? 0 : 1].translateY + this._bufferHeight * (index ? -1 : 1);
    this._buffers[index].style.transform = `translate3d(0, ${this._buffers[index].translateY}px, 0)`;
    this._buffers[index].updated = false;
    this._buffers.reverse();
  }
  /** @private */
  _scroll() {
    if (this._scrollDisabled) {
      return;
    }
    const scrollTop = this.$.scroller.scrollTop;
    if (scrollTop < this._bufferHeight || scrollTop > this._initialScroll * 2 - this._bufferHeight) {
      this._initialIndex = ~~this.position;
      this._reset();
    }
    const offset = this.itemHeight + this.bufferOffset;
    const upperThresholdReached = scrollTop > this._buffers[1].translateY + offset;
    const lowerThresholdReached = scrollTop < this._buffers[0].translateY + offset;
    if (upperThresholdReached || lowerThresholdReached) {
      this._translateBuffer(lowerThresholdReached);
      this._updateClones();
    }
    if (!this._preventScrollEvent) {
      this.dispatchEvent(new CustomEvent("custom-scroll", { bubbles: false, composed: true }));
    }
    this._preventScrollEvent = false;
    this._debouncerScrollFinish = Debouncer.debounce(this._debouncerScrollFinish, timeOut.after(200), () => {
      const scrollerRect = this.$.scroller.getBoundingClientRect();
      if (!this._isVisible(this._buffers[0], scrollerRect) && !this._isVisible(this._buffers[1], scrollerRect)) {
        this.position = this.position;
      }
    });
  }
  /** @private */
  _reset() {
    this._scrollDisabled = true;
    this.$.scroller.scrollTop = this._initialScroll;
    this._buffers[0].translateY = this._initialScroll - this._bufferHeight;
    this._buffers[1].translateY = this._initialScroll;
    this._buffers.forEach((buffer) => {
      buffer.style.transform = `translate3d(0, ${buffer.translateY}px, 0)`;
    });
    this._buffers[0].updated = this._buffers[1].updated = false;
    this._updateClones(true);
    this._debouncerUpdateClones = Debouncer.debounce(this._debouncerUpdateClones, timeOut.after(200), () => {
      this._buffers[0].updated = this._buffers[1].updated = false;
      this._updateClones();
    });
    this._scrollDisabled = false;
  }
  /** @private */
  _createPool() {
    const viewportHeight = this.innerHeight;
    this._buffers.forEach((buffer) => {
      for (let i = 0; i < this.bufferSize; i++) {
        const itemWrapper = document.createElement("div");
        itemWrapper.style.height = `${this.itemHeight}px`;
        itemWrapper.instance = {};
        const slotName = `vaadin-infinite-scroller-item-content-${generateUniqueId()}`;
        const slot = document.createElement("slot");
        slot.setAttribute("name", slotName);
        slot._itemWrapper = itemWrapper;
        buffer.appendChild(slot);
        itemWrapper.setAttribute("slot", slotName);
        this.appendChild(itemWrapper);
        if (this.itemHeight * i <= viewportHeight) {
          this._ensureStampedInstance(itemWrapper);
        }
      }
    });
    this.__pendingFinishInit = requestAnimationFrame(() => {
      this._finishInit();
      this.__pendingFinishInit = null;
    });
  }
  /** @private */
  _ensureStampedInstance(itemWrapper) {
    if (itemWrapper.firstElementChild) {
      return;
    }
    const tmpInstance = itemWrapper.instance;
    itemWrapper.instance = this._createElement();
    itemWrapper.appendChild(itemWrapper.instance);
    Object.keys(tmpInstance).forEach((prop) => {
      itemWrapper.instance[prop] = tmpInstance[prop];
    });
  }
  /** @private */
  _updateClones(viewPortOnly) {
    this._firstIndex = Math.round((this._buffers[0].translateY - this._initialScroll) / this.itemHeight) + this._initialIndex;
    const scrollerRect = viewPortOnly ? this.$.scroller.getBoundingClientRect() : void 0;
    this._buffers.forEach((buffer, bufferIndex) => {
      if (!buffer.updated) {
        const firstIndex = this._firstIndex + this.bufferSize * bufferIndex;
        [...buffer.children].forEach((slot, index) => {
          const itemWrapper = slot._itemWrapper;
          if (!viewPortOnly || this._isVisible(itemWrapper, scrollerRect)) {
            this._updateElement(itemWrapper.instance, firstIndex + index);
          }
        });
        buffer.updated = true;
      }
    });
  }
  /** @private */
  _isVisible(element, container) {
    const rect = element.getBoundingClientRect();
    return rect.bottom > container.top && rect.top < container.bottom;
  }
}
/**
 * @license
 * Copyright (c) 2016 - 2026 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const stylesTemplate$1 = document.createElement("template");
stylesTemplate$1.innerHTML = `
  <style>
    :host {
      --vaadin-infinite-scroller-item-height: 270px;
      grid-area: months;
      height: auto;
    }
  </style>
`;
class DatePickerMonthScroller extends InfiniteScroller {
  static get is() {
    return "vaadin-date-picker-month-scroller";
  }
  constructor() {
    super();
    this.bufferSize = 3;
    this.shadowRoot.appendChild(stylesTemplate$1.content.cloneNode(true));
  }
  /**
   * @protected
   * @override
   */
  _createElement() {
    return document.createElement("vaadin-month-calendar");
  }
  /**
   * @param {HTMLElement} element
   * @param {number} index
   * @protected
   * @override
   */
  _updateElement(element, index) {
    element.month = dateAfterXMonths(index);
  }
}
defineCustomElement(DatePickerMonthScroller);
/**
 * @license
 * Copyright (c) 2016 - 2026 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const stylesTemplate = document.createElement("template");
stylesTemplate.innerHTML = `
  <style>
    :host {
      --vaadin-infinite-scroller-item-height: 80px;
      width: 50px;
      display: block;
      position: relative;
      grid-area: years;
      height: auto;
      -webkit-tap-highlight-color: transparent;
      -webkit-user-select: none;
      user-select: none;
      /* Center the year scroller position. */
      --vaadin-infinite-scroller-buffer-offset: 50%;
    }

    :host::before {
      content: '';
      display: block;
      background: transparent;
      width: 0;
      height: 0;
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      border-width: 6px;
      border-style: solid;
      border-color: transparent;
      border-left-color: #000;
    }
  </style>
`;
class DatePickerYearScroller extends InfiniteScroller {
  static get is() {
    return "vaadin-date-picker-year-scroller";
  }
  constructor() {
    super();
    this.bufferSize = 12;
    this.shadowRoot.appendChild(stylesTemplate.content.cloneNode(true));
  }
  /**
   * @protected
   * @override
   */
  _createElement() {
    return document.createElement("vaadin-date-picker-year");
  }
  /**
   * @param {HTMLElement} element
   * @param {number} index
   * @protected
   * @override
   */
  _updateElement(element, index) {
    element.year = this._yearAfterXYears(index);
  }
  /** @private */
  _yearAfterXYears(index) {
    const today = /* @__PURE__ */ new Date();
    const result = new Date(today);
    result.setFullYear(parseInt(index) + today.getFullYear());
    return result.getFullYear();
  }
}
defineCustomElement(DatePickerYearScroller);
/**
 * @license
 * Copyright (c) 2016 - 2026 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const datePickerYearStyles = css`
  :host {
    display: block;
    height: 100%;
  }

  [part='year-number'] {
    align-items: center;
    display: flex;
    height: 50%;
    justify-content: center;
    transform: translateY(-50%);
    color: var(--vaadin-text-color-secondary);
  }

  :host([current]) [part='year-number'] {
    color: var(--vaadin-date-picker-year-scroller-current-year-color, var(--vaadin-text-color));
  }
`;
/**
 * @license
 * Copyright (c) 2016 - 2026 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
class DatePickerYear extends ThemableMixin(PolylitMixin(LumoInjectionMixin(LitElement))) {
  static get is() {
    return "vaadin-date-picker-year";
  }
  static get styles() {
    return datePickerYearStyles;
  }
  static get properties() {
    return {
      year: {
        type: String,
        sync: true
      },
      selectedDate: {
        type: Object,
        sync: true
      }
    };
  }
  /** @protected */
  render() {
    return html`
      <div part="year-number">${this.year}</div>
      <div part="year-separator" aria-hidden="true"></div>
    `;
  }
  /** @protected */
  updated(props) {
    super.updated(props);
    if (props.has("year")) {
      this.toggleAttribute("current", this.year === (/* @__PURE__ */ new Date()).getFullYear());
    }
    if (props.has("year") || props.has("selectedDate")) {
      this.toggleAttribute("selected", this.selectedDate && this.selectedDate.getFullYear() === this.year);
    }
  }
}
defineCustomElement(DatePickerYear);
/**
 * @license
 * Copyright (c) 2016 - 2026 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const monthCalendarStyles = css`
  :host {
    display: block;
    padding: var(--vaadin-date-picker-month-padding, var(--vaadin-padding-s));
  }

  [part='month-header'] {
    color: var(--vaadin-date-picker-month-header-color, var(--vaadin-text-color));
    font-size: var(--vaadin-date-picker-month-header-font-size, 0.9375rem);
    font-weight: var(--vaadin-date-picker-month-header-font-weight, 500);
    line-height: inherit;
    margin-bottom: 0.75rem;
    text-align: center;
  }

  table {
    border-collapse: collapse;
    display: flex;
    flex-direction: column;
  }

  tr {
    display: flex;
    flex-wrap: wrap;
  }

  [part~='weekday'] {
    color: var(--vaadin-date-picker-weekday-color, var(--vaadin-text-color-secondary));
    font-size: var(--vaadin-date-picker-weekday-font-size, 0.75rem);
    font-weight: var(--vaadin-date-picker-weekday-font-weight, 500);
    margin-bottom: 0.375rem;
    width: var(--vaadin-date-picker-date-width, 2rem);
  }

  /* Week numbers are on a separate row, don't reserve space on weekday row. */
  [part~='weekday']:empty {
    display: none;
  }

  [part~='week-number'] {
    color: var(--vaadin-date-picker-week-number-color, var(--vaadin-text-color-secondary));
    font-size: var(--vaadin-date-picker-week-number-font-size, 0.7rem);
    line-height: 1;
    width: 100%;
    margin-top: 0.125em;
    margin-bottom: 0.125em;
    gap: 0.25em;
  }

  [part~='week-number']::after {
    content: '';
    height: 1px;
    flex: 1;
    background: var(
      --vaadin-date-picker-week-divider-color,
      var(--vaadin-divider-color, var(--vaadin-border-color-secondary))
    );
  }

  [part~='weekday'],
  [part~='week-number'],
  [part~='date'] {
    align-items: center;
    display: flex;
    justify-content: center;
    padding: 0;
  }

  [part~='date'] {
    border-radius: var(--vaadin-date-picker-date-border-radius, var(--vaadin-radius-m));
    position: relative;
    width: var(--vaadin-date-picker-date-width, 2rem);
    height: var(--vaadin-date-picker-date-height, 2rem);
    cursor: var(--vaadin-clickable-cursor);
    outline: none;
  }

  [part~='date']::after {
    border-radius: inherit;
    content: '';
    position: absolute;
    z-index: -1;
    height: inherit;
    aspect-ratio: 1;
  }

  :where([part~='date']:focus)::after {
    outline: var(--vaadin-focus-ring-width) solid var(--vaadin-focus-ring-color);
    outline-offset: calc(var(--vaadin-focus-ring-width) * -1);
  }

  [part~='today'] {
    color: var(--vaadin-date-picker-date-today-color, var(--vaadin-text-color));
  }

  [part~='selected'] {
    color: var(--vaadin-date-picker-date-selected-color, var(--vaadin-background-color));
  }

  [part~='selected']::after {
    background: var(--vaadin-date-picker-date-selected-background, var(--vaadin-text-color));
    outline-offset: 1px;
  }

  [disabled] {
    cursor: var(--vaadin-disabled-cursor);
    color: var(--vaadin-date-picker-date-disabled-color, var(--vaadin-text-color-disabled));
    opacity: 0.7;
  }

  [hidden] {
    display: none;
  }

  @media (forced-colors: active) {
    [part~='week-number']::after {
      background: CanvasText;
    }

    [part~='today'] {
      font-weight: 600;
    }

    [part~='selected'] {
      forced-color-adjust: none;
      --vaadin-date-picker-date-selected-color: SelectedItemText;
      color: SelectedItemText !important;
      --vaadin-date-picker-date-selected-background: SelectedItem;
    }

    [disabled] {
      color: GrayText !important;
    }
  }
`;
/**
 * @license
 * Copyright (c) 2016 - 2026 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const MonthCalendarMixin = (superClass) => class MonthCalendarMixinClass extends FocusMixin(superClass) {
  static get properties() {
    return {
      /**
       * A `Date` object defining the month to be displayed. Only year and
       * month properties are actually used.
       */
      month: {
        type: Object,
        value: /* @__PURE__ */ new Date(),
        sync: true
      },
      /**
       * A `Date` object for the currently selected date.
       */
      selectedDate: {
        type: Object,
        notify: true,
        sync: true
      },
      /**
       * A `Date` object for the currently focused date.
       */
      focusedDate: {
        type: Object
      },
      /**
       * Set true to display ISO-8601 week numbers in the calendar. Notice that
       * displaying week numbers is only supported when `i18n.firstDayOfWeek`
       * is 1 (Monday).
       */
      showWeekNumbers: {
        type: Boolean,
        value: false
      },
      i18n: {
        type: Object
      },
      /**
       * Flag stating whether taps on the component should be ignored.
       */
      ignoreTaps: {
        type: Boolean
      },
      /**
       * The earliest date that can be selected. All earlier dates will be disabled.
       */
      minDate: {
        type: Date,
        value: null,
        sync: true
      },
      /**
       * The latest date that can be selected. All later dates will be disabled.
       */
      maxDate: {
        type: Date,
        value: null,
        sync: true
      },
      /**
       * A function to be used to determine whether the user can select a given date.
       * Receives a `DatePickerDate` object of the date to be selected and should return a
       * boolean.
       * @type {Function | undefined}
       */
      isDateDisabled: {
        type: Function,
        value: () => false
      },
      enteredDate: {
        type: Date
      },
      disabled: {
        type: Boolean,
        reflectToAttribute: true,
        computed: "__computeDisabled(month, minDate, maxDate)"
      },
      /** @protected */
      _days: {
        type: Array,
        computed: "__computeDays(month, i18n, minDate, maxDate, isDateDisabled)"
      },
      /** @protected */
      _weeks: {
        type: Array,
        computed: "__computeWeeks(_days)"
      },
      /** @private */
      _notTapping: {
        type: Boolean
      },
      /** @private */
      __hasFocus: {
        type: Boolean
      }
    };
  }
  static get observers() {
    return ["__focusedDateChanged(focusedDate, _days)", "_showWeekNumbersChanged(showWeekNumbers, i18n)"];
  }
  get focusableDateElement() {
    return [...this.shadowRoot.querySelectorAll("[part~=date]")].find((datePart) => {
      return dateEquals(datePart.date, this.focusedDate);
    });
  }
  /** @protected */
  ready() {
    super.ready();
    addListener(this.$.monthGrid, "tap", this._handleTap.bind(this));
  }
  /** @override */
  _setFocused(focused) {
    super._setFocused(focused);
    this.__hasFocus = focused;
  }
  /**
   * Returns true if all the dates in the month are out of the allowed range
   * @protected
   */
  __computeDisabled(month, minDate, maxDate) {
    const firstDate = new Date(0, 0);
    firstDate.setFullYear(month.getFullYear());
    firstDate.setMonth(month.getMonth());
    firstDate.setDate(1);
    const lastDate = new Date(0, 0);
    lastDate.setFullYear(month.getFullYear());
    lastDate.setMonth(month.getMonth() + 1);
    lastDate.setDate(0);
    if (minDate && maxDate && minDate.getMonth() === maxDate.getMonth() && minDate.getMonth() === month.getMonth() && maxDate.getDate() - minDate.getDate() >= 0) {
      return false;
    }
    return !dateAllowed(firstDate, minDate, maxDate) && !dateAllowed(lastDate, minDate, maxDate);
  }
  /** @protected */
  _getTitle(month, i18n) {
    if (month === void 0 || i18n === void 0) {
      return;
    }
    return i18n.formatTitle(i18n.monthNames[month.getMonth()], month.getFullYear());
  }
  /** @protected */
  _onMonthGridTouchStart() {
    this._notTapping = false;
    setTimeout(() => {
      this._notTapping = true;
    }, 300);
  }
  /** @private */
  _dateAdd(date, delta) {
    date.setDate(date.getDate() + delta);
  }
  /** @private */
  _applyFirstDayOfWeek(weekDayNames, firstDayOfWeek) {
    if (weekDayNames === void 0 || firstDayOfWeek === void 0) {
      return;
    }
    return weekDayNames.slice(firstDayOfWeek).concat(weekDayNames.slice(0, firstDayOfWeek));
  }
  /** @protected */
  __computeWeekDayNames(i18n, showWeekNumbers) {
    if (i18n === void 0 || showWeekNumbers === void 0) {
      return [];
    }
    const { weekdays, weekdaysShort, firstDayOfWeek } = i18n;
    const weekDayNamesShort = this._applyFirstDayOfWeek(weekdaysShort, firstDayOfWeek);
    const weekDayNames = this._applyFirstDayOfWeek(weekdays, firstDayOfWeek);
    return weekDayNames.map((day, index) => {
      return {
        weekDay: day,
        weekDayShort: weekDayNamesShort[index]
      };
    }).slice(0, 7);
  }
  /** @private */
  __focusedDateChanged(focusedDate, days) {
    if (Array.isArray(days) && days.some((date) => dateEquals(date, focusedDate))) {
      this.removeAttribute("aria-hidden");
    } else {
      this.setAttribute("aria-hidden", "true");
    }
  }
  /** @protected */
  _getDate(date) {
    return date ? date.getDate() : "";
  }
  /** @protected */
  __computeShowWeekSeparator(showWeekNumbers, i18n) {
    return showWeekNumbers && i18n && i18n.firstDayOfWeek === 1;
  }
  /** @protected */
  _isToday(date) {
    return dateEquals(/* @__PURE__ */ new Date(), date);
  }
  /** @protected */
  __computeDays(month, i18n) {
    if (month === void 0 || i18n === void 0) {
      return [];
    }
    const date = new Date(0, 0);
    date.setFullYear(month.getFullYear());
    date.setMonth(month.getMonth());
    date.setDate(1);
    while (date.getDay() !== i18n.firstDayOfWeek) {
      this._dateAdd(date, -1);
    }
    const days = [];
    const startMonth = date.getMonth();
    const targetMonth = month.getMonth();
    while (date.getMonth() === targetMonth || date.getMonth() === startMonth) {
      days.push(date.getMonth() === targetMonth ? new Date(date.getTime()) : null);
      this._dateAdd(date, 1);
    }
    return days;
  }
  /** @protected */
  __computeWeeks(days) {
    return days.reduce((acc, day, i) => {
      if (i % 7 === 0) {
        acc.push([]);
      }
      acc[acc.length - 1].push(day);
      return acc;
    }, []);
  }
  /** @protected */
  _handleTap(e) {
    if (!this.ignoreTaps && !this._notTapping && e.target.date && !e.target.hasAttribute("disabled")) {
      this.selectedDate = e.target.date;
      this.dispatchEvent(
        new CustomEvent("date-tap", { detail: { date: e.target.date }, bubbles: true, composed: true })
      );
    }
  }
  /** @protected */
  _preventDefault(e) {
    e.preventDefault();
  }
  /** @protected */
  __computeWeekNumber(days) {
    const date = days.reduce((acc, d) => {
      return !acc && d ? d : acc;
    });
    return getISOWeekNumber(date);
  }
  /** @protected */
  __computeDayAriaLabel(date) {
    if (!date) {
      return "";
    }
    let ariaLabel = `${this._getDate(date)} ${this.i18n.monthNames[date.getMonth()]} ${date.getFullYear()}, ${this.i18n.weekdays[date.getDay()]}`;
    if (this._isToday(date)) {
      ariaLabel += `, ${this.i18n.today}`;
    }
    return ariaLabel;
  }
  /** @private */
  _showWeekNumbersChanged(showWeekNumbers, i18n) {
    if (this.__computeShowWeekSeparator(showWeekNumbers, i18n)) {
      this.setAttribute("week-numbers", "");
    } else {
      this.removeAttribute("week-numbers");
    }
  }
  // eslint-disable-next-line @typescript-eslint/max-params
  __computeDatePart(date, focusedDate, selectedDate, minDate, maxDate, isDateDisabled, enteredDate, hasFocus) {
    const result = ["date"];
    if (this.__isDayDisabled(date, minDate, maxDate, isDateDisabled)) {
      result.push("disabled");
    }
    if (dateEquals(date, focusedDate) && (hasFocus || dateEquals(date, enteredDate))) {
      result.push("focused");
    }
    if (this.__isDaySelected(date, selectedDate)) {
      result.push("selected");
    }
    if (this._isToday(date)) {
      result.push("today");
    }
    if (date < normalizeDate(/* @__PURE__ */ new Date())) {
      result.push("past");
    }
    if (date > normalizeDate(/* @__PURE__ */ new Date())) {
      result.push("future");
    }
    return result.join(" ");
  }
  /** @private */
  __isDaySelected(date, selectedDate) {
    return dateEquals(date, selectedDate);
  }
  /** @private */
  __computeDayAriaSelected(date, selectedDate) {
    return String(this.__isDaySelected(date, selectedDate));
  }
  /** @private */
  __isDayDisabled(date, minDate, maxDate, isDateDisabled) {
    return !dateAllowed(date, minDate, maxDate, isDateDisabled);
  }
  /** @private */
  __computeDayAriaDisabled(date, min, max, isDateDisabled) {
    if (date === void 0 || min === void 0 && max === void 0 && isDateDisabled === void 0) {
      return "false";
    }
    return String(this.__isDayDisabled(date, min, max, isDateDisabled));
  }
  /** @private */
  __computeDayTabIndex(date, focusedDate) {
    return dateEquals(date, focusedDate) ? "0" : "-1";
  }
};
/**
 * @license
 * Copyright (c) 2016 - 2026 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
class MonthCalendar extends MonthCalendarMixin(ThemableMixin(PolylitMixin(LumoInjectionMixin(LitElement)))) {
  static get is() {
    return "vaadin-month-calendar";
  }
  static get styles() {
    return monthCalendarStyles;
  }
  /** @protected */
  render() {
    const weekDayNames = this.__computeWeekDayNames(this.i18n, this.showWeekNumbers);
    const weeks = this._weeks;
    const hideWeekSeparator = !this.__computeShowWeekSeparator(this.showWeekNumbers, this.i18n);
    return html`
      <div part="month-header" id="month-header" aria-hidden="true">${this._getTitle(this.month, this.i18n)}</div>
      <table
        id="monthGrid"
        role="grid"
        aria-labelledby="month-header"
        @touchend="${this._preventDefault}"
        @touchstart="${this._onMonthGridTouchStart}"
      >
        <thead id="weekdays-container">
          <tr role="row" part="weekdays">
            <th part="weekday" aria-hidden="true" ?hidden="${hideWeekSeparator}"></th>
            ${weekDayNames.map(
      (item) => html`
                <th role="columnheader" part="weekday" scope="col" abbr="${item.weekDay}" aria-hidden="true">
                  ${item.weekDayShort}
                </th>
              `
    )}
          </tr>
        </thead>
        <tbody id="days-container">
          ${weeks.map(
      (week) => html`
              <tr role="row">
                <td part="week-number" aria-hidden="true" ?hidden="${hideWeekSeparator}">
                  ${this.__computeWeekNumber(week)}
                </td>
                ${week.map((date) => {
        return html`
                    <td
                      role="gridcell"
                      part="${this.__computeDatePart(
          date,
          this.focusedDate,
          this.selectedDate,
          this.minDate,
          this.maxDate,
          this.isDateDisabled,
          this.enteredDate,
          this.__hasFocus
        )}"
                      .date="${date}"
                      ?disabled="${this.__isDayDisabled(date, this.minDate, this.maxDate, this.isDateDisabled)}"
                      tabindex="${this.__computeDayTabIndex(date, this.focusedDate)}"
                      aria-selected="${this.__computeDayAriaSelected(date, this.selectedDate)}"
                      aria-disabled="${this.__computeDayAriaDisabled(
          date,
          this.minDate,
          this.maxDate,
          this.isDateDisabled
        )}"
                      aria-label="${this.__computeDayAriaLabel(date)}"
                      >${this._getDate(date)}</td
                    >
                  `;
      })}
              </tr>
            `
    )}
        </tbody>
      </table>
    `;
  }
}
defineCustomElement(MonthCalendar);
/**
 * @license
 * Copyright (c) 2016 - 2026 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const overlayContentStyles = css`
  :host {
    display: grid;
    grid-template-areas:
      'header header'
      'months years'
      'toolbar years';
    grid-template-columns: minmax(0, 1fr) 0;
    height: 100%;
    outline: none;
    overflow: hidden;
  }

  :host([desktop]) {
    grid-template-columns: minmax(0, 1fr) auto;
  }

  :host([fullscreen][years-visible]) {
    grid-template-columns: minmax(0, 1fr) auto;
  }

  [part='years-toggle-button'] {
    display: inline-flex;
    align-items: center;
    border-radius: var(--vaadin-button-border-radius, var(--vaadin-radius-m));
    color: var(--vaadin-text-color);
    font-size: var(--vaadin-button-font-size, inherit);
    font-weight: var(--vaadin-button-font-weight, 500);
    height: var(--vaadin-button-height, auto);
    line-height: var(--vaadin-button-line-height, inherit);
    padding: var(--vaadin-button-padding, var(--vaadin-padding-block-container) var(--vaadin-padding-inline-container));
    cursor: var(--vaadin-clickable-cursor);
  }

  :host([years-visible]) [part='years-toggle-button'] {
    background: var(--vaadin-text-color);
    color: var(--vaadin-background-color);
  }

  [hidden] {
    display: none !important;
  }

  ::slotted([slot='months']) {
    --vaadin-infinite-scroller-item-height: calc(
      16.5rem + var(--_vaadin-date-picker-week-numbers-visible, 0) *
        (var(--vaadin-date-picker-week-number-font-size, 0.7rem) * 1.25 * 6)
    );
  }

  :host([desktop]) ::slotted([slot='months']) {
    border-bottom: 1px solid var(--vaadin-border-color-secondary);
  }

  ::slotted([slot='years']) {
    visibility: hidden;
    background: var(--vaadin-date-picker-year-scroller-background, var(--vaadin-background-container));
    width: var(--vaadin-date-picker-year-scroller-width, 3rem);
    box-sizing: border-box;
    border-inline-start: 1px solid
      var(--vaadin-date-picker-year-scroller-border-color, var(--vaadin-border-color-secondary));
    overflow: visible;
    min-height: 0;
    clip-path: inset(0);
  }

  ::slotted([slot='years'])::before {
    background: var(--vaadin-overlay-background, var(--vaadin-background-color));
    border: 1px solid var(--vaadin-date-picker-year-scroller-border-color, var(--vaadin-border-color-secondary));
    width: 16px;
    height: 16px;
    position: absolute;
    left: auto;
    z-index: 1;
    rotate: 45deg;
    translate: calc(-50% - 1px) -50%;
    transform: none;
  }

  :host([dir='rtl']) ::slotted([slot='years'])::before {
    translate: calc(50% + 1px) -50%;
  }

  :host([desktop]) ::slotted([slot='years']),
  :host([years-visible]) ::slotted([slot='years']) {
    visibility: visible;
  }

  [part='toolbar'] {
    display: flex;
    grid-area: toolbar;
    justify-content: space-between;
    padding: var(--vaadin-date-picker-toolbar-padding, var(--vaadin-padding-s));
  }

  :host([fullscreen]) [part='toolbar'] {
    grid-area: header;
    border-bottom: 1px solid var(--vaadin-border-color-secondary);
  }
`;
/**
 * @license
 * Copyright (c) 2016 - 2026 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const DatePickerOverlayContentMixin = (superClass) => class DatePickerOverlayContentMixin extends superClass {
  static get properties() {
    return {
      scrollDuration: {
        type: Number,
        value: 300
      },
      /**
       * The value for this element.
       */
      selectedDate: {
        type: Object,
        value: null,
        sync: true
      },
      /**
       * Date value which is focused using keyboard.
       */
      focusedDate: {
        type: Object,
        notify: true,
        observer: "_focusedDateChanged",
        sync: true
      },
      _focusedMonthDate: Number,
      /**
       * Date which should be visible when there is no value selected.
       */
      initialPosition: {
        type: Object,
        observer: "_initialPositionChanged",
        sync: true
      },
      _originDate: {
        type: Object,
        value: /* @__PURE__ */ new Date()
      },
      _visibleMonthIndex: Number,
      _desktopMode: {
        type: Boolean,
        observer: "_desktopModeChanged"
      },
      _desktopMediaQuery: {
        type: String,
        value: "(min-width: 375px)"
      },
      i18n: {
        type: Object
      },
      showWeekNumbers: {
        type: Boolean,
        value: false
      },
      _ignoreTaps: Boolean,
      _notTapping: Boolean,
      /**
       * The earliest date that can be selected. All earlier dates will be disabled.
       */
      minDate: {
        type: Object,
        sync: true
      },
      /**
       * The latest date that can be selected. All later dates will be disabled.
       */
      maxDate: {
        type: Object,
        sync: true
      },
      /**
       * A function to be used to determine whether the user can select a given date.
       * Receives a `DatePickerDate` object of the date to be selected and should return a
       * boolean.
       *
       * @type {function(DatePickerDate): boolean | undefined}
       */
      isDateDisabled: {
        type: Function
      },
      enteredDate: {
        type: Date,
        sync: true
      },
      /**
       * Input label
       */
      label: String,
      _cancelButton: {
        type: Object
      },
      _todayButton: {
        type: Object
      },
      calendars: {
        type: Array,
        value: () => []
      },
      years: {
        type: Array,
        value: () => []
      }
    };
  }
  static get observers() {
    return [
      "__updateCalendars(calendars, i18n, minDate, maxDate, selectedDate, focusedDate, showWeekNumbers, _ignoreTaps, _theme, isDateDisabled, enteredDate)",
      "__updateCancelButton(_cancelButton, i18n)",
      "__updateTodayButton(_todayButton, i18n, minDate, maxDate, isDateDisabled)",
      "__updateYears(years, selectedDate, _theme)"
    ];
  }
  /**
   * Whether to scroll to a sub-month position when scrolling to a date.
   * This is active if the month scroller is not large enough to fit a
   * full month. In that case we want to scroll to a position between
   * two months in order to have the focused date in the visible area.
   * @returns {boolean} whether to use sub-month scrolling
   * @private
   */
  get __useSubMonthScrolling() {
    return this._monthScroller.clientHeight < this._monthScroller.itemHeight + this._monthScroller.bufferOffset;
  }
  get focusableDateElement() {
    return this.calendars.map((calendar) => calendar.focusableDateElement).find(Boolean);
  }
  /** @protected */
  _initControllers() {
    this.addController(
      new MediaQueryController(this._desktopMediaQuery, (matches) => {
        this._desktopMode = matches;
      })
    );
    this.addController(
      new SlotController(this, "today-button", "vaadin-button", {
        observe: false,
        initializer: (btn) => {
          btn.setAttribute("theme", "tertiary");
          btn.addEventListener("keydown", (e) => this.__onTodayButtonKeyDown(e));
          btn.addEventListener("click", this._onTodayTap.bind(this));
          this._todayButton = btn;
        }
      })
    );
    this.addController(
      new SlotController(this, "cancel-button", "vaadin-button", {
        observe: false,
        initializer: (btn) => {
          btn.setAttribute("theme", "tertiary");
          btn.addEventListener("keydown", (e) => this.__onCancelButtonKeyDown(e));
          btn.addEventListener("click", this._cancel.bind(this));
          this._cancelButton = btn;
        }
      })
    );
    this.__initMonthScroller();
    this.__initYearScroller();
  }
  reset() {
    this._closeYearScroller();
  }
  /**
   * Focuses the cancel button
   */
  focusCancel() {
    this._cancelButton.focus();
  }
  /**
   * Scrolls the list to the given Date.
   */
  scrollToDate(date, animate) {
    const offset = this.__useSubMonthScrolling ? this._calculateWeekScrollOffset(date) : 0;
    this._scrollToPosition(this._differenceInMonths(date, this._originDate) + offset, animate);
    this._monthScroller.forceUpdate();
  }
  /** @private */
  __initMonthScroller() {
    this.addController(
      new SlotController(this, "months", "vaadin-date-picker-month-scroller", {
        observe: false,
        initializer: (scroller) => {
          scroller.addEventListener("custom-scroll", () => {
            this._onMonthScroll();
          });
          scroller.addEventListener("touchstart", () => {
            this._onMonthScrollTouchStart();
          });
          scroller.addEventListener("keydown", (e) => {
            this.__onMonthCalendarKeyDown(e);
          });
          scroller.addEventListener("init-done", () => {
            const calendars = [...this.querySelectorAll("vaadin-month-calendar")];
            calendars.forEach((calendar) => {
              calendar.addEventListener("selected-date-changed", (e) => {
                this.selectedDate = e.detail.value;
              });
            });
            this.calendars = calendars;
          });
          this._monthScroller = scroller;
        }
      })
    );
  }
  /** @private */
  __initYearScroller() {
    this.addController(
      new SlotController(this, "years", "vaadin-date-picker-year-scroller", {
        observe: false,
        initializer: (scroller) => {
          scroller.setAttribute("aria-hidden", "true");
          addListener(scroller, "tap", (e) => {
            this._onYearTap(e);
          });
          scroller.addEventListener("custom-scroll", () => {
            this._onYearScroll();
          });
          scroller.addEventListener("touchstart", () => {
            this._onYearScrollTouchStart();
          });
          scroller.addEventListener("init-done", () => {
            this.years = [...this.querySelectorAll("vaadin-date-picker-year")];
          });
          this._yearScroller = scroller;
        }
      })
    );
  }
  /** @private */
  __updateCancelButton(cancelButton, i18n) {
    if (cancelButton) {
      cancelButton.textContent = i18n && i18n.cancel;
    }
  }
  /** @private */
  __updateTodayButton(todayButton, i18n, minDate, maxDate, isDateDisabled) {
    if (todayButton) {
      todayButton.textContent = i18n && i18n.today;
      todayButton.disabled = !this._isTodayAllowed(minDate, maxDate, isDateDisabled);
    }
  }
  // eslint-disable-next-line @typescript-eslint/max-params
  __updateCalendars(calendars, i18n, minDate, maxDate, selectedDate, focusedDate, showWeekNumbers, ignoreTaps, theme, isDateDisabled, enteredDate) {
    if (calendars && calendars.length) {
      calendars.forEach((calendar) => {
        calendar.i18n = i18n;
        calendar.minDate = minDate;
        calendar.maxDate = maxDate;
        calendar.isDateDisabled = isDateDisabled;
        calendar.focusedDate = focusedDate;
        calendar.selectedDate = selectedDate;
        calendar.showWeekNumbers = showWeekNumbers;
        calendar.ignoreTaps = ignoreTaps;
        calendar.enteredDate = enteredDate;
        if (theme) {
          calendar.setAttribute("theme", theme);
        } else {
          calendar.removeAttribute("theme");
        }
      });
    }
  }
  /** @private */
  __updateYears(years, selectedDate, theme) {
    if (years && years.length) {
      years.forEach((year) => {
        year.selectedDate = selectedDate;
        if (theme) {
          year.setAttribute("theme", theme);
        } else {
          year.removeAttribute("theme");
        }
      });
    }
  }
  /**
   * Select a date and fire event indicating user interaction.
   * @protected
   */
  _selectDate(dateToSelect) {
    if (!this._dateAllowed(dateToSelect)) {
      return false;
    }
    this.selectedDate = dateToSelect;
    this.dispatchEvent(
      new CustomEvent("date-selected", { detail: { date: dateToSelect }, bubbles: true, composed: true })
    );
    return true;
  }
  /** @private */
  _desktopModeChanged(desktopMode) {
    this.toggleAttribute("desktop", desktopMode);
  }
  /** @private */
  _focusedDateChanged(focusedDate) {
    this.revealDate(focusedDate);
  }
  /**
   * Scrolls the month and year scrollers enough to reveal the given date.
   */
  revealDate(date, animate = true) {
    if (!date) {
      return;
    }
    const diff = this._differenceInMonths(date, this._originDate);
    if (this.__useSubMonthScrolling) {
      const offset = this._calculateWeekScrollOffset(date);
      this._scrollToPosition(diff + offset, animate);
      return;
    }
    const scrolledAboveViewport = this._monthScroller.position > diff;
    const visibleArea = Math.max(
      this._monthScroller.itemHeight,
      this._monthScroller.clientHeight - this._monthScroller.bufferOffset * 2
    );
    const visibleItems = visibleArea / this._monthScroller.itemHeight;
    const scrolledBelowViewport = this._monthScroller.position + visibleItems - 1 < diff;
    if (scrolledAboveViewport) {
      this._scrollToPosition(diff, animate);
    } else if (scrolledBelowViewport) {
      this._scrollToPosition(diff - visibleItems + 1, animate);
    }
  }
  /**
   * Calculates an offset to be added to the month scroll position
   * when using sub-month scrolling, in order ensure that the week
   * that the date is in is visible even for small scroll areas.
   * As the month scroller uses a month as minimal scroll unit
   * (a value of `1` equals one month), we can not exactly identify
   * the position of a specific week. This is a best effort
   * implementation based on manual testing.
   * @param date the date for which to calculate the offset
   * @returns {number} the offset
   * @private
   */
  _calculateWeekScrollOffset(date) {
    const temp = new Date(0, 0);
    temp.setFullYear(date.getFullYear());
    temp.setMonth(date.getMonth());
    temp.setDate(1);
    let week = 0;
    while (temp.getDate() < date.getDate()) {
      temp.setDate(temp.getDate() + 1);
      if (temp.getDay() === this.i18n.firstDayOfWeek) {
        week += 1;
      }
    }
    return week / 6;
  }
  /** @private */
  _initialPositionChanged(initialPosition) {
    if (this._monthScroller && this._yearScroller) {
      this._monthScroller.active = true;
      this._yearScroller.active = true;
    }
    this.scrollToDate(initialPosition);
  }
  /** @private */
  _repositionYearScroller() {
    const monthPosition = this._monthScroller.position;
    this._visibleMonthIndex = Math.floor(monthPosition);
    this._yearScroller.position = (monthPosition + this._originDate.getMonth()) / 12;
  }
  /** @private */
  _repositionMonthScroller() {
    this._monthScroller.position = this._yearScroller.position * 12 - this._originDate.getMonth();
    this._visibleMonthIndex = Math.floor(this._monthScroller.position);
  }
  /** @private */
  _onMonthScroll() {
    this._repositionYearScroller();
    this._doIgnoreTaps();
  }
  /** @private */
  _onYearScroll() {
    this._repositionMonthScroller();
    this._doIgnoreTaps();
  }
  /** @private */
  _onYearScrollTouchStart() {
    this._notTapping = false;
    setTimeout(() => {
      this._notTapping = true;
    }, 300);
    this._repositionMonthScroller();
  }
  /** @private */
  _onMonthScrollTouchStart() {
    this._repositionYearScroller();
  }
  /** @private */
  _doIgnoreTaps() {
    this._ignoreTaps = true;
    this._debouncer = Debouncer.debounce(this._debouncer, timeOut.after(300), () => {
      this._ignoreTaps = false;
    });
  }
  /** @private */
  _onTodayTap() {
    const today = this._getTodayMidnight();
    if (Math.abs(this._monthScroller.position - this._differenceInMonths(today, this._originDate)) < 1e-3) {
      this._selectDate(today);
      this._close();
    } else {
      this._scrollToCurrentMonth();
    }
  }
  /** @private */
  _scrollToCurrentMonth() {
    if (this.focusedDate) {
      this.focusedDate = /* @__PURE__ */ new Date();
    }
    this.scrollToDate(/* @__PURE__ */ new Date(), true);
  }
  /** @private */
  _onYearTap(e) {
    if (!this._ignoreTaps && !this._notTapping) {
      const scrollDelta = e.detail.y - (this._yearScroller.getBoundingClientRect().top + this._yearScroller.clientHeight / 2);
      const yearDelta = scrollDelta / this._yearScroller.itemHeight;
      this._scrollToPosition(this._monthScroller.position + yearDelta * 12, true);
    }
  }
  /** @private */
  _scrollToPosition(targetPosition, animate) {
    if (this._targetPosition !== void 0) {
      this._targetPosition = targetPosition;
      return;
    }
    if (!animate) {
      this._monthScroller.position = targetPosition;
      this._monthScroller.forceUpdate();
      this._targetPosition = void 0;
      this._repositionYearScroller();
      this.__tryFocusDate();
      return;
    }
    this._targetPosition = targetPosition;
    let revealResolve;
    this._revealPromise = new Promise((resolve) => {
      revealResolve = resolve;
    });
    const easingFunction = (t, b, c, d) => {
      t /= d / 2;
      if (t < 1) {
        return c / 2 * t * t + b;
      }
      t -= 1;
      return -c / 2 * (t * (t - 2) - 1) + b;
    };
    let start = 0;
    const initialPosition = this._monthScroller.position;
    const smoothScroll = (timestamp) => {
      if (!start) {
        start = timestamp;
      }
      const currentTime = timestamp - start;
      if (currentTime < this.scrollDuration) {
        const currentPos = easingFunction(
          currentTime,
          initialPosition,
          this._targetPosition - initialPosition,
          this.scrollDuration
        );
        this._monthScroller.position = currentPos;
        window.requestAnimationFrame(smoothScroll);
      } else {
        this.dispatchEvent(
          new CustomEvent("scroll-animation-finished", {
            bubbles: true,
            composed: true,
            detail: {
              position: this._targetPosition,
              oldPosition: initialPosition
            }
          })
        );
        this._monthScroller.position = this._targetPosition;
        this._monthScroller.forceUpdate();
        this._targetPosition = void 0;
        revealResolve();
        this._revealPromise = void 0;
      }
      setTimeout(this._repositionYearScroller.bind(this), 1);
    };
    window.requestAnimationFrame(smoothScroll);
  }
  /** @private */
  _toggleYearScroller() {
    this.toggleAttribute("years-visible");
  }
  /** @private */
  _closeYearScroller() {
    this.removeAttribute("years-visible");
  }
  /** @private */
  _yearAfterXMonths(months) {
    return dateAfterXMonths(months).getFullYear();
  }
  /** @private */
  _differenceInMonths(date1, date2) {
    const months = (date1.getFullYear() - date2.getFullYear()) * 12;
    return months - date2.getMonth() + date1.getMonth();
  }
  /** @private */
  _clear() {
    this._selectDate("");
  }
  /** @private */
  _close() {
    this.dispatchEvent(new CustomEvent("close", { bubbles: true, composed: true }));
  }
  /** @private */
  _cancel() {
    this.focusedDate = this.selectedDate;
    this._close();
  }
  /** @private */
  __toggleDate(date) {
    if (dateEquals(date, this.selectedDate)) {
      this._clear();
      this.focusedDate = date;
    } else {
      this._selectDate(date);
    }
  }
  /** @private */
  __onMonthCalendarKeyDown(event) {
    let handled = false;
    switch (event.key) {
      case "ArrowDown":
        this._moveFocusByDays(7);
        handled = true;
        break;
      case "ArrowUp":
        this._moveFocusByDays(-7);
        handled = true;
        break;
      case "ArrowRight":
        this._moveFocusByDays(this.__isRTL ? -1 : 1);
        handled = true;
        break;
      case "ArrowLeft":
        this._moveFocusByDays(this.__isRTL ? 1 : -1);
        handled = true;
        break;
      case "Enter":
        if (this._selectDate(this.focusedDate)) {
          this._close();
          handled = true;
        }
        break;
      case " ":
        this.__toggleDate(this.focusedDate);
        handled = true;
        break;
      case "Home":
        this._moveFocusInsideMonth(this.focusedDate, "minDate");
        handled = true;
        break;
      case "End":
        this._moveFocusInsideMonth(this.focusedDate, "maxDate");
        handled = true;
        break;
      case "PageDown":
        this._moveFocusByMonths(event.shiftKey ? 12 : 1);
        handled = true;
        break;
      case "PageUp":
        this._moveFocusByMonths(event.shiftKey ? -12 : -1);
        handled = true;
        break;
      case "Tab":
        this._onTabKeyDown(event, "calendar");
        break;
    }
    if (handled) {
      event.preventDefault();
      event.stopPropagation();
    }
  }
  /** @private */
  _onTabKeyDown(event, section) {
    event.stopPropagation();
    switch (section) {
      case "calendar":
        if (event.shiftKey) {
          event.preventDefault();
          if (this.hasAttribute("fullscreen")) {
            this.focusCancel();
          } else {
            this.__focusInput();
          }
        }
        break;
      case "today":
        if (event.shiftKey) {
          event.preventDefault();
          this.focusDateElement();
        }
        break;
      case "cancel":
        if (!event.shiftKey) {
          event.preventDefault();
          if (this.hasAttribute("fullscreen")) {
            this.focusDateElement();
          } else {
            this.__focusInput();
          }
        }
        break;
    }
  }
  /** @private */
  __onTodayButtonKeyDown(event) {
    if (event.key === "Tab") {
      this._onTabKeyDown(event, "today");
    }
  }
  /** @private */
  __onCancelButtonKeyDown(event) {
    if (event.key === "Tab") {
      this._onTabKeyDown(event, "cancel");
    }
  }
  /** @private */
  __focusInput() {
    this.dispatchEvent(new CustomEvent("focus-input", { bubbles: true, composed: true }));
  }
  /** @private */
  __tryFocusDate() {
    const dateToFocus = this.__pendingDateFocus;
    if (dateToFocus) {
      const dateElement = this.focusableDateElement;
      if (dateElement && dateEquals(dateElement.date, this.__pendingDateFocus)) {
        delete this.__pendingDateFocus;
        dateElement.focus();
      }
    }
  }
  async focusDate(date, keepMonth) {
    const dateToFocus = date || this.selectedDate || this.initialPosition || /* @__PURE__ */ new Date();
    this.focusedDate = dateToFocus;
    if (!keepMonth) {
      this._focusedMonthDate = dateToFocus.getDate();
    }
    await this.focusDateElement(false);
  }
  async focusDateElement(reveal = true) {
    this.__pendingDateFocus = this.focusedDate;
    if (!this.calendars.length) {
      await new Promise((resolve) => {
        requestAnimationFrame(() => {
          setTimeout(() => {
            resolve();
          });
        });
      });
    }
    if (reveal) {
      this.revealDate(this.focusedDate);
    }
    if (this._revealPromise) {
      await this._revealPromise;
    }
    this.__tryFocusDate();
  }
  /** @private */
  _focusClosestDate(focus) {
    this.focusDate(getClosestDate(focus, [this.minDate, this.maxDate]));
  }
  /** @private */
  _focusAllowedDate(dateToFocus, diff, keepMonth) {
    if (this._dateAllowed(dateToFocus, void 0, void 0, () => false)) {
      this.focusDate(dateToFocus, keepMonth);
    } else if (this._dateAllowed(this.focusedDate)) {
      if (diff > 0) {
        this.focusDate(this.maxDate);
      } else {
        this.focusDate(this.minDate);
      }
    } else {
      this._focusClosestDate(this.focusedDate);
    }
  }
  /** @private */
  _getDateDiff(months, days) {
    const date = new Date(0, 0);
    date.setFullYear(this.focusedDate.getFullYear());
    date.setMonth(this.focusedDate.getMonth() + months);
    if (days) {
      date.setDate(this.focusedDate.getDate() + days);
    }
    return date;
  }
  /** @private */
  _moveFocusByDays(days) {
    const dateToFocus = this._getDateDiff(0, days);
    this._focusAllowedDate(dateToFocus, days, false);
  }
  /** @private */
  _moveFocusByMonths(months) {
    const dateToFocus = this._getDateDiff(months);
    const targetMonth = dateToFocus.getMonth();
    if (!this._focusedMonthDate) {
      this._focusedMonthDate = this.focusedDate.getDate();
    }
    dateToFocus.setDate(this._focusedMonthDate);
    if (dateToFocus.getMonth() !== targetMonth) {
      dateToFocus.setDate(0);
    }
    this._focusAllowedDate(dateToFocus, months, true);
  }
  /** @private */
  _moveFocusInsideMonth(focusedDate, property) {
    const dateToFocus = new Date(0, 0);
    dateToFocus.setFullYear(focusedDate.getFullYear());
    if (property === "minDate") {
      dateToFocus.setMonth(focusedDate.getMonth());
      dateToFocus.setDate(1);
    } else {
      dateToFocus.setMonth(focusedDate.getMonth() + 1);
      dateToFocus.setDate(0);
    }
    if (this._dateAllowed(dateToFocus)) {
      this.focusDate(dateToFocus);
    } else if (this._dateAllowed(focusedDate)) {
      this.focusDate(this[property]);
    } else {
      this._focusClosestDate(focusedDate);
    }
  }
  /** @private */
  _dateAllowed(date, min = this.minDate, max = this.maxDate, isDateDisabled = this.isDateDisabled) {
    return dateAllowed(date, min, max, isDateDisabled);
  }
  /** @private */
  _isTodayAllowed(min, max, isDateDisabled) {
    return this._dateAllowed(this._getTodayMidnight(), min, max, isDateDisabled);
  }
  /** @private */
  _getTodayMidnight() {
    const today = /* @__PURE__ */ new Date();
    const todayMidnight = new Date(0, 0);
    todayMidnight.setFullYear(today.getFullYear());
    todayMidnight.setMonth(today.getMonth());
    todayMidnight.setDate(today.getDate());
    return todayMidnight;
  }
  /**
   * Fired when the scroller reaches the target scrolling position.
   * @event scroll-animation-finished
   * @param {Number} detail.position new position
   * @param {Number} detail.oldPosition old position
   */
};
/**
 * @license
 * Copyright (c) 2016 - 2026 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
class DatePickerOverlayContent extends DatePickerOverlayContentMixin(
  ThemableMixin(DirMixin(PolylitMixin(LumoInjectionMixin(LitElement))))
) {
  static get is() {
    return "vaadin-date-picker-overlay-content";
  }
  static get styles() {
    return overlayContentStyles;
  }
  static get lumoInjector() {
    return { ...super.lumoInjector, includeBaseStyles: true };
  }
  /** @protected */
  render() {
    return html`
      <slot name="months"></slot>
      <slot name="years"></slot>

      <div role="toolbar" part="toolbar">
        <slot name="today-button"></slot>
        <div
          part="years-toggle-button"
          ?hidden="${this._desktopMode}"
          aria-hidden="true"
          @click="${this._toggleYearScroller}"
        >
          ${this._yearAfterXMonths(this._visibleMonthIndex)}
        </div>
        <slot name="cancel-button"></slot>
      </div>
    `;
  }
  /** @protected */
  firstUpdated() {
    super.firstUpdated();
    this.setAttribute("role", "dialog");
    this._initControllers();
  }
}
defineCustomElement(DatePickerOverlayContent);
/**
 * @license
 * Copyright (c) 2016 - 2026 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const datePickerStyles = css`
  :host([opened]) {
    pointer-events: auto;
  }

  :host([week-numbers]) {
    --_vaadin-date-picker-week-numbers-visible: 1;
  }

  :host([dir='rtl']) [part='input-field'] {
    direction: ltr;
  }

  :host([dir='rtl']) [part='input-field'] ::slotted(input)::placeholder {
    direction: rtl;
    text-align: left;
  }

  [part~='toggle-button']::before {
    mask-image: var(--_vaadin-icon-calendar);
  }

  :host([readonly]) [part~='toggle-button'] {
    display: none;
  }
`;
/**
 * @license
 * Copyright (c) 2016 - 2026 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const datePickerI18nDefaults = Object.freeze({
  monthNames: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ],
  weekdays: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  weekdaysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  firstDayOfWeek: 0,
  today: "Today",
  cancel: "Cancel",
  referenceDate: "",
  formatDate(d) {
    const yearStr = String(d.year).replace(/\d+/u, (y) => "0000".substr(y.length) + y);
    return [d.month + 1, d.day, yearStr].join("/");
  },
  parseDate(text) {
    const parts = text.split("/");
    const today = /* @__PURE__ */ new Date();
    let date, month = today.getMonth(), year = today.getFullYear();
    if (parts.length === 3) {
      month = parseInt(parts[0]) - 1;
      date = parseInt(parts[1]);
      year = parseInt(parts[2]);
      if (parts[2].length < 3 && year >= 0) {
        const usedReferenceDate = this.referenceDate ? parseDate(this.referenceDate) : /* @__PURE__ */ new Date();
        year = getAdjustedYear(usedReferenceDate, year, month, date);
      }
    } else if (parts.length === 2) {
      month = parseInt(parts[0]) - 1;
      date = parseInt(parts[1]);
    } else if (parts.length === 1) {
      date = parseInt(parts[0]);
    }
    if (date !== void 0) {
      return { day: date, month, year };
    }
  },
  formatTitle: (monthName, fullYear) => {
    return `${monthName} ${fullYear}`;
  }
});
const DatePickerMixin = (subclass) => class DatePickerMixinClass extends I18nMixin(
  datePickerI18nDefaults,
  DelegateFocusMixin(InputConstraintsMixin(KeyboardMixin(subclass)))
) {
  static get properties() {
    return {
      /**
       * The current selected date.
       * @type {Date | undefined}
       * @protected
       */
      _selectedDate: {
        type: Object,
        sync: true
      },
      /**
       * @type {Date | undefined}
       * @protected
       */
      _focusedDate: {
        type: Object,
        sync: true
      },
      /**
       * Selected date.
       *
       * Supported date formats:
       * - ISO 8601 `"YYYY-MM-DD"` (default)
       * - 6-digit extended ISO 8601 `"+YYYYYY-MM-DD"`, `"-YYYYYY-MM-DD"`
       */
      value: {
        type: String,
        notify: true,
        value: "",
        sync: true
      },
      /**
       * Date which should be visible when there is no value selected.
       *
       * The same date formats as for the `value` property are supported.
       * @attr {string} initial-position
       */
      initialPosition: {
        type: String
      },
      /**
       * Set true to open the date selector overlay.
       */
      opened: {
        type: Boolean,
        reflectToAttribute: true,
        notify: true,
        observer: "_openedChanged",
        sync: true
      },
      /**
       * Set true to prevent the overlay from opening automatically.
       * @attr {boolean} auto-open-disabled
       */
      autoOpenDisabled: {
        type: Boolean,
        sync: true
      },
      /**
       * Set true to display ISO-8601 week numbers in the calendar. Notice that
       * displaying week numbers is only supported when `i18n.firstDayOfWeek`
       * is 1 (Monday).
       * @attr {boolean} show-week-numbers
       */
      showWeekNumbers: {
        type: Boolean,
        value: false,
        sync: true
      },
      /**
       * @protected
       */
      _fullscreen: {
        type: Boolean,
        value: false,
        sync: true
      },
      /**
       * @protected
       */
      _fullscreenMediaQuery: {
        value: "(max-width: 450px), (max-height: 450px)"
      },
      /**
       * The earliest date that can be selected. All earlier dates will be disabled.
       *
       * Supported date formats:
       * - ISO 8601 `"YYYY-MM-DD"` (default)
       * - 6-digit extended ISO 8601 `"+YYYYYY-MM-DD"`, `"-YYYYYY-MM-DD"`
       */
      min: {
        type: String,
        sync: true
      },
      /**
       * The latest date that can be selected. All later dates will be disabled.
       *
       * Supported date formats:
       * - ISO 8601 `"YYYY-MM-DD"` (default)
       * - 6-digit extended ISO 8601 `"+YYYYYY-MM-DD"`, `"-YYYYYY-MM-DD"`
       */
      max: {
        type: String,
        sync: true
      },
      /**
       * A function to be used to determine whether the user can select a given date.
       * Receives a `DatePickerDate` object of the date to be selected and should return a
       * boolean.
       *
       * @type {function(DatePickerDate): boolean | undefined}
       */
      isDateDisabled: {
        type: Function
      },
      /**
       * The earliest date that can be selected. All earlier dates will be disabled.
       * @type {Date | undefined}
       * @protected
       */
      _minDate: {
        type: Date,
        computed: "__computeMinOrMaxDate(min)"
      },
      /**
       * The latest date that can be selected. All later dates will be disabled.
       * @type {Date | undefined}
       * @protected
       */
      _maxDate: {
        type: Date,
        computed: "__computeMinOrMaxDate(max)"
      },
      /** @private */
      _noInput: {
        type: Boolean,
        computed: "_isNoInput(inputElement, _fullscreen, _ios, __effectiveI18n, opened, autoOpenDisabled)"
      },
      /** @private */
      _ios: {
        type: Boolean,
        value: isIOS
      },
      /** @private */
      _focusOverlayOnOpen: Boolean,
      /** @private */
      _overlayContent: {
        type: Object,
        sync: true
      },
      /** @private */
      __enteredDate: {
        type: Date,
        sync: true
      }
    };
  }
  static get observers() {
    return [
      "_selectedDateChanged(_selectedDate, __effectiveI18n)",
      "_focusedDateChanged(_focusedDate, __effectiveI18n)",
      "__updateOverlayContent(_overlayContent, __effectiveI18n, label, _minDate, _maxDate, _focusedDate, _selectedDate, showWeekNumbers, isDateDisabled, __enteredDate)",
      "__updateOverlayContentTheme(_overlayContent, _theme)",
      "__updateOverlayContentFullScreen(_overlayContent, _fullscreen)"
    ];
  }
  static get constraints() {
    return [...super.constraints, "min", "max"];
  }
  constructor() {
    super();
    this._boundOnClick = this._onClick.bind(this);
    this._boundOnScroll = this._onScroll.bind(this);
  }
  /**
   * The object used to localize this component. To change the default
   * localization, replace this with an object that provides all properties, or
   * just the individual properties you want to change.
   *
   * The object has the following JSON structure and default values:
   *
   * ```js
   * {
   *   // An array with the full names of months starting
   *   // with January.
   *   monthNames: [
   *     'January', 'February', 'March', 'April', 'May',
   *     'June', 'July', 'August', 'September',
   *     'October', 'November', 'December'
   *   ],
   *
   *   // An array of weekday names starting with Sunday. Used
   *   // in screen reader announcements.
   *   weekdays: [
   *     'Sunday', 'Monday', 'Tuesday', 'Wednesday',
   *     'Thursday', 'Friday', 'Saturday'
   *   ],
   *
   *   // An array of short weekday names starting with Sunday.
   *   // Displayed in the calendar.
   *   weekdaysShort: [
   *     'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'
   *   ],
   *
   *   // An integer indicating the first day of the week
   *   // (0 = Sunday, 1 = Monday, etc.).
   *   firstDayOfWeek: 0,
   *
   *   // Translation of the Today shortcut button text.
   *   today: 'Today',
   *
   *   // Translation of the Cancel button text.
   *   cancel: 'Cancel',
   *
   *   // Used for adjusting the year value when parsing dates with short years.
   *   // The year values between 0 and 99 are evaluated and adjusted.
   *   // Example: for a referenceDate of 1970-10-30;
   *   //   dateToBeParsed: 40-10-30, result: 1940-10-30
   *   //   dateToBeParsed: 80-10-30, result: 1980-10-30
   *   //   dateToBeParsed: 10-10-30, result: 2010-10-30
   *   // Supported date format: ISO 8601 `"YYYY-MM-DD"` (default)
   *   // The default value is the current date.
   *   referenceDate: '',
   *
   *   // A function to format given `Object` as
   *   // date string. Object is in the format `{ day: ..., month: ..., year: ... }`
   *   // Note: The argument month is 0-based. This means that January = 0 and December = 11.
   *   formatDate: d => {
   *     // returns a string representation of the given
   *     // object in 'MM/DD/YYYY' -format
   *   },
   *
   *   // A function to parse the given text to an `Object` in the format `{ day: ..., month: ..., year: ... }`.
   *   // Must properly parse (at least) text formatted by `formatDate`.
   *   // Setting the property to null will disable keyboard input feature.
   *   // Note: The argument month is 0-based. This means that January = 0 and December = 11.
   *   parseDate: text => {
   *     // Parses a string in 'MM/DD/YY', 'MM/DD' or 'DD' -format to
   *     // an `Object` in the format `{ day: ..., month: ..., year: ... }`.
   *   }
   *
   *   // A function to format given `monthName` and
   *   // `fullYear` integer as calendar title string.
   *   formatTitle: (monthName, fullYear) => {
   *     return monthName + ' ' + fullYear;
   *   }
   * }
   * ```
   * @type {!DatePickerI18n}
   */
  get i18n() {
    return super.i18n;
  }
  set i18n(value) {
    super.i18n = value;
  }
  /** @override */
  get _inputElementValue() {
    return super._inputElementValue;
  }
  /** @override */
  set _inputElementValue(value) {
    super._inputElementValue = value;
    const parsedDate = this.__parseDate(value);
    this.__setEnteredDate(parsedDate);
  }
  /**
   * The input element's value when it cannot be parsed as a date, and an empty string otherwise.
   *
   * @return {string}
   * @private
   */
  get __unparsableValue() {
    if (!this._inputElementValue || this.__parseDate(this._inputElementValue)) {
      return "";
    }
    return this._inputElementValue;
  }
  /**
   * Override an event listener from `DelegateFocusMixin`
   * @protected
   */
  _onFocus(event) {
    super._onFocus(event);
    if (this._noInput && !isKeyboardActive()) {
      event.target.blur();
    }
  }
  /**
   * Override an event listener from `DelegateFocusMixin`
   * @protected
   */
  _onBlur(event) {
    super._onBlur(event);
    if (!this.opened) {
      this.__commitParsedOrFocusedDate();
      if (document.hasFocus()) {
        this._requestValidation();
      }
    }
  }
  /** @protected */
  ready() {
    super.ready();
    this.addEventListener("click", this._boundOnClick);
    this.addController(
      new MediaQueryController(this._fullscreenMediaQuery, (matches) => {
        this._fullscreen = matches;
      })
    );
    this.addController(new VirtualKeyboardController(this));
    this._overlayElement = this.$.overlay;
  }
  /** @protected */
  updated(props) {
    super.updated(props);
    if (props.has("showWeekNumbers") || props.has("__effectiveI18n")) {
      this.toggleAttribute("week-numbers", this.showWeekNumbers && this.__effectiveI18n.firstDayOfWeek === 1);
    }
  }
  /** @protected */
  disconnectedCallback() {
    super.disconnectedCallback();
    this.opened = false;
  }
  /**
   * @param {FocusOptions=} options
   * @protected
   * @override
   */
  focus(options) {
    if (this._noInput && !isKeyboardActive()) {
      this.open();
    } else {
      super.focus(options);
    }
  }
  /**
   * Opens the dropdown.
   */
  open() {
    if (!this.disabled && !this.readonly) {
      this.opened = true;
    }
  }
  /**
   * Closes the dropdown.
   */
  close() {
    this.$.overlay.close();
  }
  /** @private */
  __ensureContent() {
    if (this._overlayContent) {
      return;
    }
    const content = document.createElement("vaadin-date-picker-overlay-content");
    content.setAttribute("slot", "overlay");
    this.appendChild(content);
    this._overlayContent = content;
    content.addEventListener("close", () => {
      this._close();
    });
    content.addEventListener("focus-input", this._focusAndSelect.bind(this));
    content.addEventListener("date-tap", (e) => {
      this.__commitDate(e.detail.date);
      this._close();
    });
    content.addEventListener("date-selected", (e) => {
      this.__commitDate(e.detail.date);
    });
    content.addEventListener("focusin", () => {
      if (this._keyboardActive) {
        this._setFocused(true);
      }
    });
    content.addEventListener("focusout", (event) => {
      if (this._shouldRemoveFocus(event)) {
        this._setFocused(false);
      }
    });
    content.addEventListener("focused-date-changed", (e) => {
      this._focusedDate = e.detail.value;
    });
    content.addEventListener("click", (e) => e.stopPropagation());
  }
  /**
   * @param {string} dateString
   * @private
   */
  __parseDate(dateString) {
    if (!this.__effectiveI18n.parseDate) {
      return;
    }
    let dateObject = this.__effectiveI18n.parseDate(dateString);
    if (dateObject) {
      dateObject = parseDate(`${dateObject.year}-${dateObject.month + 1}-${dateObject.day}`);
    }
    if (dateObject && !isNaN(dateObject.getTime())) {
      return dateObject;
    }
  }
  /**
   * @param {Date} dateObject
   * @private
   */
  __formatDate(dateObject) {
    if (this.__effectiveI18n.formatDate) {
      return this.__effectiveI18n.formatDate(extractDateParts(dateObject));
    }
  }
  /**
   * Returns true if the current input value satisfies all constraints (if any)
   *
   * Override the `checkValidity` method for custom validations.
   *
   * @return {boolean} True if the value is valid
   */
  checkValidity() {
    const inputValue = this._inputElementValue;
    const inputValid = !inputValue || !!this._selectedDate && inputValue === this.__formatDate(this._selectedDate);
    const isDateValid = !this._selectedDate || dateAllowed(this._selectedDate, this._minDate, this._maxDate, this.isDateDisabled);
    let inputValidity = true;
    if (this.inputElement && this.inputElement.checkValidity) {
      inputValidity = this.inputElement.checkValidity();
    }
    return inputValid && isDateValid && inputValidity;
  }
  /**
   * Override method inherited from `FocusMixin`
   * to not call `_setFocused(true)` when focus
   * is restored after closing overlay on click,
   * and to avoid removing `focus-ring` attribute.
   *
   * @param {!FocusEvent} _event
   * @return {boolean}
   * @protected
   * @override
   */
  _shouldSetFocus(_event) {
    return !this._shouldKeepFocusRing;
  }
  /**
   * Override method inherited from `ClearButtonMixin`
   * to not blur on clear button mousedown when opened
   * so that focus remains in the input field.
   *
   * @return {boolean}
   * @protected
   * @override
   */
  _shouldKeepFocusOnClearMousedown() {
    if (this.opened) {
      return true;
    }
    return super._shouldKeepFocusOnClearMousedown();
  }
  /**
   * Override method inherited from `FocusMixin`
   * to prevent removing the `focused` attribute:
   * - when moving focus to the overlay content,
   * - when closing on date click / outside click.
   *
   * @param {FocusEvent} event
   * @return {boolean}
   * @protected
   * @override
   */
  _shouldRemoveFocus(event) {
    const { relatedTarget } = event;
    if (this.opened && relatedTarget !== null && relatedTarget !== document.body && !this.contains(relatedTarget) && !this._overlayContent.contains(relatedTarget)) {
      return true;
    }
    return !this.opened;
  }
  /**
   * Override method inherited from `FocusMixin`
   * to store the `focus-ring` state to restore
   * it later when closing on outside click.
   *
   * @param {boolean} focused
   * @protected
   * @override
   */
  _setFocused(focused) {
    super._setFocused(focused);
    this._shouldKeepFocusRing = focused && this._keyboardActive;
  }
  /**
   * Depending on the nature of the value change that has occurred since
   * the last commit attempt, triggers validation and fires an event:
   *
   * Value change             | Event
   * :------------------------|:------------------
   * empty => parsable        | change
   * empty => unparsable      | unparsable-change
   * parsable => empty        | change
   * parsable => parsable     | change
   * parsable => unparsable   | change
   * unparsable => empty      | unparsable-change
   * unparsable => parsable   | change
   * unparsable => unparsable | unparsable-change
   *
   * @private
   */
  __commitValueChange() {
    const unparsableValue = this.__unparsableValue;
    if (this.__committedValue !== this.value) {
      this._requestValidation();
      this.dispatchEvent(new CustomEvent("change", { bubbles: true }));
    } else if (this.__committedUnparsableValue !== unparsableValue) {
      this._requestValidation();
      this.dispatchEvent(new CustomEvent("unparsable-change"));
    }
    this.__committedValue = this.value;
    this.__committedUnparsableValue = unparsableValue;
  }
  /**
   * Sets the given date as the value and commits it.
   *
   * @param {Date} date
   * @private
   */
  __commitDate(date) {
    this.__keepCommittedValue = true;
    this._selectedDate = date;
    this.__keepCommittedValue = false;
    this.__commitValueChange();
  }
  /** @private */
  _close() {
    this._focus();
    this.close();
  }
  /** @private */
  // eslint-disable-next-line @typescript-eslint/max-params
  _isNoInput(inputElement, fullscreen, ios, effectiveI18n, opened, autoOpenDisabled) {
    const noInputOnFullscreenMode = fullscreen && (!autoOpenDisabled || opened);
    const noInputOnIos = ios && opened;
    return !inputElement || noInputOnFullscreenMode || noInputOnIos || !effectiveI18n.parseDate;
  }
  /** @private */
  _formatISO(date) {
    return formatISODate(date);
  }
  /** @protected */
  _inputElementChanged(input) {
    super._inputElementChanged(input);
    if (input) {
      input.autocomplete = "off";
      input.setAttribute("role", "combobox");
      input.setAttribute("aria-haspopup", "dialog");
      input.setAttribute("aria-expanded", !!this.opened);
      this._applyInputValue(this._selectedDate);
    }
  }
  /** @protected */
  _openedChanged(opened) {
    if (opened) {
      this.__ensureContent();
    }
    if (this.inputElement) {
      this.inputElement.setAttribute("aria-expanded", opened);
    }
  }
  /** @private */
  _selectedDateChanged(selectedDate, effectiveI18n) {
    if (selectedDate === void 0 || effectiveI18n === void 0) {
      return;
    }
    if (!this.__keepInputValue) {
      this._applyInputValue(selectedDate);
    }
    this.value = this._formatISO(selectedDate);
    this._ignoreFocusedDateChange = true;
    this._focusedDate = selectedDate;
    this._ignoreFocusedDateChange = false;
  }
  /** @private */
  _focusedDateChanged(focusedDate, effectiveI18n) {
    if (focusedDate === void 0 || effectiveI18n === void 0) {
      return;
    }
    if (!this._ignoreFocusedDateChange && !this._noInput) {
      this._applyInputValue(focusedDate);
    }
  }
  /**
   * Override the value observer from `InputMixin` to implement custom
   * handling of the `value` property. The date-picker doesn't forward
   * the value directly to the input like the default implementation of `InputMixin`.
   * Instead, it parses the value into a date, puts it in `_selectedDate` which
   * is then displayed in the input with respect to the specified date format.
   *
   * @param {string | undefined} value
   * @param {string | undefined} oldValue
   * @protected
   * @override
   */
  _valueChanged(value, oldValue) {
    const newDate = parseDate(value);
    if (value && !newDate) {
      this.value = oldValue;
      return;
    }
    if (value) {
      if (!dateEquals(this._selectedDate, newDate)) {
        this._selectedDate = newDate;
        if (oldValue !== void 0) {
          this._requestValidation();
        }
      }
    } else {
      this._selectedDate = null;
    }
    if (!this.__keepCommittedValue) {
      this.__committedValue = this.value;
      this.__committedUnparsableValue = "";
    }
    this._toggleHasValue(this._hasValue);
  }
  /** @private */
  // eslint-disable-next-line @typescript-eslint/max-params
  __updateOverlayContent(overlayContent, effectiveI18n, label, minDate, maxDate, focusedDate, selectedDate, showWeekNumbers, isDateDisabled, enteredDate) {
    if (overlayContent) {
      overlayContent.i18n = effectiveI18n;
      overlayContent.label = label;
      overlayContent.minDate = minDate;
      overlayContent.maxDate = maxDate;
      overlayContent.focusedDate = focusedDate;
      overlayContent.selectedDate = selectedDate;
      overlayContent.showWeekNumbers = showWeekNumbers;
      overlayContent.isDateDisabled = isDateDisabled;
      overlayContent.enteredDate = enteredDate;
    }
  }
  /** @private */
  __updateOverlayContentTheme(overlayContent, theme) {
    if (overlayContent) {
      if (theme) {
        overlayContent.setAttribute("theme", theme);
      } else {
        overlayContent.removeAttribute("theme");
      }
    }
  }
  /** @private */
  __updateOverlayContentFullScreen(overlayContent, fullscreen) {
    if (overlayContent) {
      overlayContent.toggleAttribute("fullscreen", fullscreen);
    }
  }
  /** @protected */
  _onOverlayEscapePress(event) {
    event.stopPropagation();
    this._focusedDate = this._selectedDate;
    this._applyInputValue(this._selectedDate);
    this._close();
  }
  /** @protected */
  _onOverlayOpened() {
    const content = this._overlayContent;
    content.reset();
    const initialPosition = this._getInitialPosition();
    content.initialPosition = initialPosition;
    const scrollFocusDate = content.focusedDate || initialPosition;
    content.scrollToDate(scrollFocusDate);
    this._ignoreFocusedDateChange = true;
    content.focusedDate = scrollFocusDate;
    this._ignoreFocusedDateChange = false;
    window.addEventListener("scroll", this._boundOnScroll, true);
    if (this._focusOverlayOnOpen) {
      content.focusDateElement();
      this._focusOverlayOnOpen = false;
    } else {
      this._focus();
    }
    const input = this.inputElement;
    if (this._noInput && input) {
      input.blur();
      this._overlayContent.focusDateElement();
    }
    const focusables = this._noInput ? content : this;
    this.__showOthers = hideOthers(focusables);
  }
  /** @private */
  _getInitialPosition() {
    const parsedInitialPosition = parseDate(this.initialPosition);
    const initialPosition = this._selectedDate || this._overlayContent.initialPosition || parsedInitialPosition || /* @__PURE__ */ new Date();
    return parsedInitialPosition || dateAllowed(initialPosition, this._minDate, this._maxDate, this.isDateDisabled) ? initialPosition : this._minDate || this._maxDate ? getClosestDate(initialPosition, [this._minDate, this._maxDate]) : /* @__PURE__ */ new Date();
  }
  /**
   * Tries to parse the input element's value as a date. If the input value
   * is parsable, commits the resulting date as the value. Otherwise, commits
   * an empty string as the value. If no i18n parser is provided, commits
   * the focused date as the value.
   *
   * @private
   */
  __commitParsedOrFocusedDate() {
    this._ignoreFocusedDateChange = true;
    if (this.__effectiveI18n.parseDate) {
      const inputValue = this._inputElementValue || "";
      const parsedDate = this.__parseDate(inputValue);
      if (parsedDate) {
        this.__commitDate(parsedDate);
      } else {
        this.__keepInputValue = true;
        this.__commitDate(null);
        this.__keepInputValue = false;
      }
    } else if (this._focusedDate) {
      this.__commitDate(this._focusedDate);
    }
    this._ignoreFocusedDateChange = false;
  }
  /** @protected */
  _onOverlayClosed() {
    if (this.__showOthers) {
      this.__showOthers();
      this.__showOthers = null;
    }
    window.removeEventListener("scroll", this._boundOnScroll, true);
    this.__commitParsedOrFocusedDate();
    if (this.inputElement && this.inputElement.selectionStart) {
      this.inputElement.selectionStart = this.inputElement.selectionEnd;
    }
    if (!this.value && !this._keyboardActive) {
      this._requestValidation();
    }
  }
  /** @private */
  _onScroll(e) {
    if (e.target === window || !this._overlayContent.contains(e.target)) {
      this._overlayContent._repositionYearScroller();
    }
  }
  /** @protected */
  _focus() {
    if (!this._noInput) {
      this.inputElement.focus();
    }
  }
  /** @private */
  _focusAndSelect() {
    this._focus();
    this._setSelectionRange(0, this._inputElementValue.length);
  }
  /** @private */
  _applyInputValue(date) {
    this._inputElementValue = date ? this.__formatDate(date) : "";
  }
  /** @private */
  _setSelectionRange(a, b) {
    if (this.inputElement) {
      this.inputElement.setSelectionRange(a, b);
    }
  }
  /**
   * Override an event listener from `InputConstraintsMixin`
   * to have date-picker fully control when to fire a change event
   * and trigger validation.
   *
   * @protected
   */
  _onChange(event) {
    event.stopPropagation();
  }
  /**
   * @param {Event} event
   * @private
   */
  _onClick(event) {
    if (event.composedPath().includes(this._overlayElement)) {
      return;
    }
    if (!this._isClearButton(event)) {
      this._onHostClick(event);
    }
  }
  /**
   * @param {Event} event
   * @private
   */
  _onHostClick(event) {
    if (!this.autoOpenDisabled || this._noInput) {
      event.preventDefault();
      this.open();
    }
  }
  /**
   * Override an event listener from `InputControlMixin`
   * to validate and dispatch change on clear.
   * @protected
   */
  _onClearButtonClick(event) {
    event.preventDefault();
    this.__commitDate(null);
  }
  /**
   * Override an event listener from `KeyboardMixin`.
   * @param {KeyboardEvent} e
   * @protected
   * @override
   */
  _onKeyDown(e) {
    super._onKeyDown(e);
    if (this._noInput) {
      const allowedKeys = ["Tab", "Escape"];
      if (allowedKeys.indexOf(e.key) === -1) {
        e.preventDefault();
      }
    }
    switch (e.key) {
      case "ArrowDown":
      case "ArrowUp":
        e.preventDefault();
        if (this.opened) {
          this._overlayContent.focusDateElement();
        } else {
          this._focusOverlayOnOpen = true;
          this.open();
        }
        break;
      case "Tab":
        if (this.opened) {
          e.preventDefault();
          e.stopPropagation();
          this._setSelectionRange(0, 0);
          if (e.shiftKey) {
            this._overlayContent.focusCancel();
          } else {
            this._overlayContent.focusDateElement();
          }
        }
        break;
    }
  }
  /**
   * Override an event listener from `KeyboardMixin`.
   *
   * @param {!KeyboardEvent} event
   * @protected
   * @override
   */
  _onEnter(event) {
    if (event.composedPath().includes(this._overlayContent)) {
      return;
    }
    if (this.opened) {
      this.close();
    } else {
      this.__commitParsedOrFocusedDate();
    }
  }
  /**
   * Override an event listener from `KeyboardMixin`.
   * Do not call `super` in order to override clear
   * button logic defined in `InputControlMixin`.
   *
   * @param {!KeyboardEvent} event
   * @protected
   * @override
   */
  _onEscape(event) {
    if (this.opened) {
      this._onOverlayEscapePress(event);
      return;
    }
    if (this.clearButtonVisible && !!this.value && !this.readonly) {
      event.stopPropagation();
      this._onClearButtonClick(event);
      return;
    }
    if (this.inputElement.value === "") {
      this.__commitDate(null);
    } else {
      this._applyInputValue(this._selectedDate);
    }
  }
  /** @protected */
  _isClearButton(event) {
    return event.composedPath()[0] === this.clearElement;
  }
  /**
   * Override an event listener from `InputMixin`
   * @protected
   */
  _onInput() {
    if (!this.opened && this._inputElementValue && !this.autoOpenDisabled) {
      this.open();
    }
    const parsedDate = this.__parseDate(this._inputElementValue || "");
    if (parsedDate) {
      this._ignoreFocusedDateChange = true;
      if (!dateEquals(parsedDate, this._focusedDate)) {
        this._focusedDate = parsedDate;
      }
      this._ignoreFocusedDateChange = false;
    }
    this.__setEnteredDate(parsedDate);
  }
  /**
   * @param {Date} date
   * @private
   */
  __setEnteredDate(date) {
    if (date) {
      if (!dateEquals(this.__enteredDate, date)) {
        this.__enteredDate = date;
      }
    } else {
      this.__enteredDate = null;
    }
  }
  /** @private */
  __computeMinOrMaxDate(dateString) {
    return parseDate(dateString);
  }
  /**
   * Fired when the user commits a value change.
   *
   * @event change
   */
  /**
   * Fired when `value` property value changes.
   *
   * @event value-changed
   */
  /**
   * Fired when `opened` property value changes.
   *
   * @event opened-changed
   */
};
/**
 * @license
 * Copyright (c) 2016 - 2026 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
class DatePicker extends DatePickerMixin(
  InputControlMixin(ThemableMixin(ElementMixin(PolylitMixin(LumoInjectionMixin(LitElement)))))
) {
  static get is() {
    return "vaadin-date-picker";
  }
  static get styles() {
    return [inputFieldShared, datePickerStyles];
  }
  static get properties() {
    return {
      /** @private */
      _positionTarget: {
        type: Object,
        sync: true
      }
    };
  }
  /**
   * Used by `InputControlMixin` as a reference to the clear button element.
   * @protected
   * @return {!HTMLElement}
   */
  get clearElement() {
    return this.$.clearButton;
  }
  /** @protected */
  render() {
    return html`
      <div class="vaadin-date-picker-container">
        <div part="label">
          <slot name="label"></slot>
          <span part="required-indicator" aria-hidden="true" @click="${this.focus}"></span>
        </div>

        <vaadin-input-container
          part="input-field"
          .readonly="${this.readonly}"
          .disabled="${this.disabled}"
          .invalid="${this.invalid}"
          theme="${ifDefined(this._theme)}"
        >
          <slot name="prefix" slot="prefix"></slot>
          <slot name="input"></slot>
          <div id="clearButton" part="field-button clear-button" slot="suffix" aria-hidden="true"></div>
          <div part="field-button toggle-button" slot="suffix" aria-hidden="true" @click="${this._toggle}"></div>
        </vaadin-input-container>

        <div part="helper-text">
          <slot name="helper"></slot>
        </div>

        <div part="error-message">
          <slot name="error-message"></slot>
        </div>

        <slot name="tooltip"></slot>
      </div>

      <vaadin-date-picker-overlay
        id="overlay"
        .owner="${this}"
        ?fullscreen="${this._fullscreen}"
        theme="${ifDefined(this._theme)}"
        .opened="${this.opened}"
        @opened-changed="${this._onOpenedChanged}"
        @vaadin-overlay-open="${this._onOverlayOpened}"
        @vaadin-overlay-close="${this._onVaadinOverlayClose}"
        @vaadin-overlay-closing="${this._onOverlayClosed}"
        restore-focus-on-close
        no-vertical-overlap
        exportparts="backdrop, overlay, content"
        .restoreFocusNode="${this.inputElement}"
        .positionTarget="${this._positionTarget}"
      >
        <slot name="overlay"></slot>
      </vaadin-date-picker-overlay>
    `;
  }
  /** @protected */
  ready() {
    super.ready();
    this.addController(
      new InputController(
        this,
        (input) => {
          this._setInputElement(input);
          this._setFocusElement(input);
          this.stateTarget = input;
          this.ariaTarget = input;
        },
        {
          // The "search" word is a trick to prevent Safari from enabling AutoFill,
          // which is causing click issues:
          // https://github.com/vaadin/web-components/issues/6817#issuecomment-2268229567
          uniqueIdPrefix: "search-input"
        }
      )
    );
    this.addController(new LabelledInputController(this.inputElement, this._labelController));
    this._tooltipController = new TooltipController(this);
    this.addController(this._tooltipController);
    this._tooltipController.setPosition("top");
    this._tooltipController.setAriaTarget(this.inputElement);
    this._tooltipController.setShouldShow((target) => !target.opened);
    this._positionTarget = this.shadowRoot.querySelector('[part="input-field"]');
    const toggleButton = this.shadowRoot.querySelector('[part="field-button toggle-button"]');
    toggleButton.addEventListener("mousedown", (e) => e.preventDefault());
  }
  /** @private */
  _onOpenedChanged(event) {
    this.opened = event.detail.value;
  }
  /** @private */
  _onVaadinOverlayClose(e) {
    const event = e.detail.sourceEvent;
    if (event && event.composedPath().includes(this) && !event.composedPath().includes(this._overlayElement)) {
      e.preventDefault();
    }
  }
  /** @private */
  _toggle(e) {
    e.stopPropagation();
    if (this.$.overlay.opened) {
      this.close();
    } else {
      this.open();
    }
  }
}
defineCustomElement(DatePicker);
const formatDistanceLocale = {
  lessThanXSeconds: {
    one: "less than a second",
    other: "less than {{count}} seconds"
  },
  xSeconds: {
    one: "1 second",
    other: "{{count}} seconds"
  },
  halfAMinute: "half a minute",
  lessThanXMinutes: {
    one: "less than a minute",
    other: "less than {{count}} minutes"
  },
  xMinutes: {
    one: "1 minute",
    other: "{{count}} minutes"
  },
  aboutXHours: {
    one: "about 1 hour",
    other: "about {{count}} hours"
  },
  xHours: {
    one: "1 hour",
    other: "{{count}} hours"
  },
  xDays: {
    one: "1 day",
    other: "{{count}} days"
  },
  aboutXWeeks: {
    one: "about 1 week",
    other: "about {{count}} weeks"
  },
  xWeeks: {
    one: "1 week",
    other: "{{count}} weeks"
  },
  aboutXMonths: {
    one: "about 1 month",
    other: "about {{count}} months"
  },
  xMonths: {
    one: "1 month",
    other: "{{count}} months"
  },
  aboutXYears: {
    one: "about 1 year",
    other: "about {{count}} years"
  },
  xYears: {
    one: "1 year",
    other: "{{count}} years"
  },
  overXYears: {
    one: "over 1 year",
    other: "over {{count}} years"
  },
  almostXYears: {
    one: "almost 1 year",
    other: "almost {{count}} years"
  }
};
const formatDistance = (token, count, options) => {
  let result;
  const tokenValue = formatDistanceLocale[token];
  if (typeof tokenValue === "string") {
    result = tokenValue;
  } else if (count === 1) {
    result = tokenValue.one;
  } else {
    result = tokenValue.other.replace("{{count}}", count.toString());
  }
  if (options?.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      return "in " + result;
    } else {
      return result + " ago";
    }
  }
  return result;
};
function buildFormatLongFn(args) {
  return (options = {}) => {
    const width = options.width ? String(options.width) : args.defaultWidth;
    const format2 = args.formats[width] || args.formats[args.defaultWidth];
    return format2;
  };
}
const dateFormats = {
  full: "EEEE, MMMM do, y",
  long: "MMMM do, y",
  medium: "MMM d, y",
  short: "MM/dd/yyyy"
};
const timeFormats = {
  full: "h:mm:ss a zzzz",
  long: "h:mm:ss a z",
  medium: "h:mm:ss a",
  short: "h:mm a"
};
const dateTimeFormats = {
  full: "{{date}} 'at' {{time}}",
  long: "{{date}} 'at' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
};
const formatLong = {
  date: buildFormatLongFn({
    formats: dateFormats,
    defaultWidth: "full"
  }),
  time: buildFormatLongFn({
    formats: timeFormats,
    defaultWidth: "full"
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats,
    defaultWidth: "full"
  })
};
const formatRelativeLocale = {
  lastWeek: "'last' eeee 'at' p",
  yesterday: "'yesterday at' p",
  today: "'today at' p",
  tomorrow: "'tomorrow at' p",
  nextWeek: "eeee 'at' p",
  other: "P"
};
const formatRelative = (token, _date, _baseDate, _options) => formatRelativeLocale[token];
function buildLocalizeFn(args) {
  return (value, options) => {
    const context = options?.context ? String(options.context) : "standalone";
    let valuesArray;
    if (context === "formatting" && args.formattingValues) {
      const defaultWidth = args.defaultFormattingWidth || args.defaultWidth;
      const width = options?.width ? String(options.width) : defaultWidth;
      valuesArray = args.formattingValues[width] || args.formattingValues[defaultWidth];
    } else {
      const defaultWidth = args.defaultWidth;
      const width = options?.width ? String(options.width) : args.defaultWidth;
      valuesArray = args.values[width] || args.values[defaultWidth];
    }
    const index = args.argumentCallback ? args.argumentCallback(value) : value;
    return valuesArray[index];
  };
}
const eraValues = {
  narrow: ["B", "A"],
  abbreviated: ["BC", "AD"],
  wide: ["Before Christ", "Anno Domini"]
};
const quarterValues = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Q1", "Q2", "Q3", "Q4"],
  wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"]
};
const monthValues = {
  narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
  abbreviated: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ],
  wide: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ]
};
const dayValues = {
  narrow: ["S", "M", "T", "W", "T", "F", "S"],
  short: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
  abbreviated: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  wide: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ]
};
const dayPeriodValues = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "mi",
    noon: "n",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "midnight",
    noon: "noon",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "midnight",
    noon: "noon",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  }
};
const formattingDayPeriodValues = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "mi",
    noon: "n",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "midnight",
    noon: "noon",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "midnight",
    noon: "noon",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  }
};
const ordinalNumber = (dirtyNumber, _options) => {
  const number = Number(dirtyNumber);
  const rem100 = number % 100;
  if (rem100 > 20 || rem100 < 10) {
    switch (rem100 % 10) {
      case 1:
        return number + "st";
      case 2:
        return number + "nd";
      case 3:
        return number + "rd";
    }
  }
  return number + "th";
};
const localize = {
  ordinalNumber,
  era: buildLocalizeFn({
    values: eraValues,
    defaultWidth: "wide"
  }),
  quarter: buildLocalizeFn({
    values: quarterValues,
    defaultWidth: "wide",
    argumentCallback: (quarter) => quarter - 1
  }),
  month: buildLocalizeFn({
    values: monthValues,
    defaultWidth: "wide"
  }),
  day: buildLocalizeFn({
    values: dayValues,
    defaultWidth: "wide"
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues,
    defaultWidth: "wide",
    formattingValues: formattingDayPeriodValues,
    defaultFormattingWidth: "wide"
  })
};
function buildMatchFn(args) {
  return (string, options = {}) => {
    const width = options.width;
    const matchPattern = width && args.matchPatterns[width] || args.matchPatterns[args.defaultMatchWidth];
    const matchResult = string.match(matchPattern);
    if (!matchResult) {
      return null;
    }
    const matchedString = matchResult[0];
    const parsePatterns = width && args.parsePatterns[width] || args.parsePatterns[args.defaultParseWidth];
    const key = Array.isArray(parsePatterns) ? findIndex(parsePatterns, (pattern) => pattern.test(matchedString)) : (
      // [TODO] -- I challenge you to fix the type
      findKey(parsePatterns, (pattern) => pattern.test(matchedString))
    );
    let value;
    value = args.valueCallback ? args.valueCallback(key) : key;
    value = options.valueCallback ? (
      // [TODO] -- I challenge you to fix the type
      options.valueCallback(value)
    ) : value;
    const rest = string.slice(matchedString.length);
    return { value, rest };
  };
}
function findKey(object, predicate) {
  for (const key in object) {
    if (Object.prototype.hasOwnProperty.call(object, key) && predicate(object[key])) {
      return key;
    }
  }
  return void 0;
}
function findIndex(array, predicate) {
  for (let key = 0; key < array.length; key++) {
    if (predicate(array[key])) {
      return key;
    }
  }
  return void 0;
}
function buildMatchPatternFn(args) {
  return (string, options = {}) => {
    const matchResult = string.match(args.matchPattern);
    if (!matchResult) return null;
    const matchedString = matchResult[0];
    const parseResult = string.match(args.parsePattern);
    if (!parseResult) return null;
    let value = args.valueCallback ? args.valueCallback(parseResult[0]) : parseResult[0];
    value = options.valueCallback ? options.valueCallback(value) : value;
    const rest = string.slice(matchedString.length);
    return { value, rest };
  };
}
const matchOrdinalNumberPattern = /^(\d+)(th|st|nd|rd)?/i;
const parseOrdinalNumberPattern = /\d+/i;
const matchEraPatterns = {
  narrow: /^(b|a)/i,
  abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  wide: /^(before christ|before common era|anno domini|common era)/i
};
const parseEraPatterns = {
  any: [/^b/i, /^(a|c)/i]
};
const matchQuarterPatterns = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234](th|st|nd|rd)? quarter/i
};
const parseQuarterPatterns = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
const matchMonthPatterns = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
  wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
};
const parseMonthPatterns = {
  narrow: [
    /^j/i,
    /^f/i,
    /^m/i,
    /^a/i,
    /^m/i,
    /^j/i,
    /^j/i,
    /^a/i,
    /^s/i,
    /^o/i,
    /^n/i,
    /^d/i
  ],
  any: [
    /^ja/i,
    /^f/i,
    /^mar/i,
    /^ap/i,
    /^may/i,
    /^jun/i,
    /^jul/i,
    /^au/i,
    /^s/i,
    /^o/i,
    /^n/i,
    /^d/i
  ]
};
const matchDayPatterns = {
  narrow: /^[smtwf]/i,
  short: /^(su|mo|tu|we|th|fr|sa)/i,
  abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
  wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
};
const parseDayPatterns = {
  narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
  any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
};
const matchDayPeriodPatterns = {
  narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
  any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
};
const parseDayPeriodPatterns = {
  any: {
    am: /^a/i,
    pm: /^p/i,
    midnight: /^mi/i,
    noon: /^no/i,
    morning: /morning/i,
    afternoon: /afternoon/i,
    evening: /evening/i,
    night: /night/i
  }
};
const match = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern,
    parsePattern: parseOrdinalNumberPattern,
    valueCallback: (value) => parseInt(value, 10)
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns,
    defaultMatchWidth: "wide",
    parsePatterns: parseEraPatterns,
    defaultParseWidth: "any"
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns,
    defaultMatchWidth: "wide",
    parsePatterns: parseQuarterPatterns,
    defaultParseWidth: "any",
    valueCallback: (index) => index + 1
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns,
    defaultMatchWidth: "wide",
    parsePatterns: parseMonthPatterns,
    defaultParseWidth: "any"
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns,
    defaultMatchWidth: "wide",
    parsePatterns: parseDayPatterns,
    defaultParseWidth: "any"
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns,
    defaultMatchWidth: "any",
    parsePatterns: parseDayPeriodPatterns,
    defaultParseWidth: "any"
  })
};
const enUS = {
  code: "en-US",
  formatDistance,
  formatLong,
  formatRelative,
  localize,
  match,
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
};
let defaultOptions = {};
function getDefaultOptions$1() {
  return defaultOptions;
}
const millisecondsInWeek = 6048e5;
const millisecondsInDay = 864e5;
const millisecondsInMinute = 6e4;
const millisecondsInHour = 36e5;
const millisecondsInSecond = 1e3;
const constructFromSymbol = /* @__PURE__ */ Symbol.for("constructDateFrom");
function constructFrom(date, value) {
  if (typeof date === "function") return date(value);
  if (date && typeof date === "object" && constructFromSymbol in date)
    return date[constructFromSymbol](value);
  if (date instanceof Date) return new date.constructor(value);
  return new Date(value);
}
function toDate(argument, context) {
  return constructFrom(context || argument, argument);
}
function getTimezoneOffsetInMilliseconds(date) {
  const _date = toDate(date);
  const utcDate = new Date(
    Date.UTC(
      _date.getFullYear(),
      _date.getMonth(),
      _date.getDate(),
      _date.getHours(),
      _date.getMinutes(),
      _date.getSeconds(),
      _date.getMilliseconds()
    )
  );
  utcDate.setUTCFullYear(_date.getFullYear());
  return +date - +utcDate;
}
function normalizeDates(context, ...dates) {
  const normalize = constructFrom.bind(
    null,
    dates.find((date) => typeof date === "object")
  );
  return dates.map(normalize);
}
function startOfDay(date, options) {
  const _date = toDate(date, options?.in);
  _date.setHours(0, 0, 0, 0);
  return _date;
}
function differenceInCalendarDays(laterDate, earlierDate, options) {
  const [laterDate_, earlierDate_] = normalizeDates(
    options?.in,
    laterDate,
    earlierDate
  );
  const laterStartOfDay = startOfDay(laterDate_);
  const earlierStartOfDay = startOfDay(earlierDate_);
  const laterTimestamp = +laterStartOfDay - getTimezoneOffsetInMilliseconds(laterStartOfDay);
  const earlierTimestamp = +earlierStartOfDay - getTimezoneOffsetInMilliseconds(earlierStartOfDay);
  return Math.round((laterTimestamp - earlierTimestamp) / millisecondsInDay);
}
function startOfYear(date, options) {
  const date_ = toDate(date, options?.in);
  date_.setFullYear(date_.getFullYear(), 0, 1);
  date_.setHours(0, 0, 0, 0);
  return date_;
}
function getDayOfYear(date, options) {
  const _date = toDate(date, options?.in);
  const diff = differenceInCalendarDays(_date, startOfYear(_date));
  const dayOfYear = diff + 1;
  return dayOfYear;
}
function startOfWeek(date, options) {
  const defaultOptions2 = getDefaultOptions$1();
  const weekStartsOn = options?.weekStartsOn ?? options?.locale?.options?.weekStartsOn ?? defaultOptions2.weekStartsOn ?? defaultOptions2.locale?.options?.weekStartsOn ?? 0;
  const _date = toDate(date, options?.in);
  const day = _date.getDay();
  const diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;
  _date.setDate(_date.getDate() - diff);
  _date.setHours(0, 0, 0, 0);
  return _date;
}
function startOfISOWeek(date, options) {
  return startOfWeek(date, { ...options, weekStartsOn: 1 });
}
function getISOWeekYear(date, options) {
  const _date = toDate(date, options?.in);
  const year = _date.getFullYear();
  const fourthOfJanuaryOfNextYear = constructFrom(_date, 0);
  fourthOfJanuaryOfNextYear.setFullYear(year + 1, 0, 4);
  fourthOfJanuaryOfNextYear.setHours(0, 0, 0, 0);
  const startOfNextYear = startOfISOWeek(fourthOfJanuaryOfNextYear);
  const fourthOfJanuaryOfThisYear = constructFrom(_date, 0);
  fourthOfJanuaryOfThisYear.setFullYear(year, 0, 4);
  fourthOfJanuaryOfThisYear.setHours(0, 0, 0, 0);
  const startOfThisYear = startOfISOWeek(fourthOfJanuaryOfThisYear);
  if (_date.getTime() >= startOfNextYear.getTime()) {
    return year + 1;
  } else if (_date.getTime() >= startOfThisYear.getTime()) {
    return year;
  } else {
    return year - 1;
  }
}
function startOfISOWeekYear(date, options) {
  const year = getISOWeekYear(date, options);
  const fourthOfJanuary = constructFrom(date, 0);
  fourthOfJanuary.setFullYear(year, 0, 4);
  fourthOfJanuary.setHours(0, 0, 0, 0);
  return startOfISOWeek(fourthOfJanuary);
}
function getISOWeek(date, options) {
  const _date = toDate(date, options?.in);
  const diff = +startOfISOWeek(_date) - +startOfISOWeekYear(_date);
  return Math.round(diff / millisecondsInWeek) + 1;
}
function getWeekYear(date, options) {
  const _date = toDate(date, options?.in);
  const year = _date.getFullYear();
  const defaultOptions2 = getDefaultOptions$1();
  const firstWeekContainsDate = options?.firstWeekContainsDate ?? options?.locale?.options?.firstWeekContainsDate ?? defaultOptions2.firstWeekContainsDate ?? defaultOptions2.locale?.options?.firstWeekContainsDate ?? 1;
  const firstWeekOfNextYear = constructFrom(options?.in || date, 0);
  firstWeekOfNextYear.setFullYear(year + 1, 0, firstWeekContainsDate);
  firstWeekOfNextYear.setHours(0, 0, 0, 0);
  const startOfNextYear = startOfWeek(firstWeekOfNextYear, options);
  const firstWeekOfThisYear = constructFrom(options?.in || date, 0);
  firstWeekOfThisYear.setFullYear(year, 0, firstWeekContainsDate);
  firstWeekOfThisYear.setHours(0, 0, 0, 0);
  const startOfThisYear = startOfWeek(firstWeekOfThisYear, options);
  if (+_date >= +startOfNextYear) {
    return year + 1;
  } else if (+_date >= +startOfThisYear) {
    return year;
  } else {
    return year - 1;
  }
}
function startOfWeekYear(date, options) {
  const defaultOptions2 = getDefaultOptions$1();
  const firstWeekContainsDate = options?.firstWeekContainsDate ?? options?.locale?.options?.firstWeekContainsDate ?? defaultOptions2.firstWeekContainsDate ?? defaultOptions2.locale?.options?.firstWeekContainsDate ?? 1;
  const year = getWeekYear(date, options);
  const firstWeek = constructFrom(options?.in || date, 0);
  firstWeek.setFullYear(year, 0, firstWeekContainsDate);
  firstWeek.setHours(0, 0, 0, 0);
  const _date = startOfWeek(firstWeek, options);
  return _date;
}
function getWeek(date, options) {
  const _date = toDate(date, options?.in);
  const diff = +startOfWeek(_date, options) - +startOfWeekYear(_date, options);
  return Math.round(diff / millisecondsInWeek) + 1;
}
function addLeadingZeros(number, targetLength) {
  const sign = number < 0 ? "-" : "";
  const output = Math.abs(number).toString().padStart(targetLength, "0");
  return sign + output;
}
const lightFormatters = {
  // Year
  y(date, token) {
    const signedYear = date.getFullYear();
    const year = signedYear > 0 ? signedYear : 1 - signedYear;
    return addLeadingZeros(token === "yy" ? year % 100 : year, token.length);
  },
  // Month
  M(date, token) {
    const month = date.getMonth();
    return token === "M" ? String(month + 1) : addLeadingZeros(month + 1, 2);
  },
  // Day of the month
  d(date, token) {
    return addLeadingZeros(date.getDate(), token.length);
  },
  // AM or PM
  a(date, token) {
    const dayPeriodEnumValue = date.getHours() / 12 >= 1 ? "pm" : "am";
    switch (token) {
      case "a":
      case "aa":
        return dayPeriodEnumValue.toUpperCase();
      case "aaa":
        return dayPeriodEnumValue;
      case "aaaaa":
        return dayPeriodEnumValue[0];
      case "aaaa":
      default:
        return dayPeriodEnumValue === "am" ? "a.m." : "p.m.";
    }
  },
  // Hour [1-12]
  h(date, token) {
    return addLeadingZeros(date.getHours() % 12 || 12, token.length);
  },
  // Hour [0-23]
  H(date, token) {
    return addLeadingZeros(date.getHours(), token.length);
  },
  // Minute
  m(date, token) {
    return addLeadingZeros(date.getMinutes(), token.length);
  },
  // Second
  s(date, token) {
    return addLeadingZeros(date.getSeconds(), token.length);
  },
  // Fraction of second
  S(date, token) {
    const numberOfDigits = token.length;
    const milliseconds = date.getMilliseconds();
    const fractionalSeconds = Math.trunc(
      milliseconds * Math.pow(10, numberOfDigits - 3)
    );
    return addLeadingZeros(fractionalSeconds, token.length);
  }
};
const dayPeriodEnum = {
  midnight: "midnight",
  noon: "noon",
  morning: "morning",
  afternoon: "afternoon",
  evening: "evening",
  night: "night"
};
const formatters = {
  // Era
  G: function(date, token, localize2) {
    const era = date.getFullYear() > 0 ? 1 : 0;
    switch (token) {
      // AD, BC
      case "G":
      case "GG":
      case "GGG":
        return localize2.era(era, { width: "abbreviated" });
      // A, B
      case "GGGGG":
        return localize2.era(era, { width: "narrow" });
      // Anno Domini, Before Christ
      case "GGGG":
      default:
        return localize2.era(era, { width: "wide" });
    }
  },
  // Year
  y: function(date, token, localize2) {
    if (token === "yo") {
      const signedYear = date.getFullYear();
      const year = signedYear > 0 ? signedYear : 1 - signedYear;
      return localize2.ordinalNumber(year, { unit: "year" });
    }
    return lightFormatters.y(date, token);
  },
  // Local week-numbering year
  Y: function(date, token, localize2, options) {
    const signedWeekYear = getWeekYear(date, options);
    const weekYear = signedWeekYear > 0 ? signedWeekYear : 1 - signedWeekYear;
    if (token === "YY") {
      const twoDigitYear = weekYear % 100;
      return addLeadingZeros(twoDigitYear, 2);
    }
    if (token === "Yo") {
      return localize2.ordinalNumber(weekYear, { unit: "year" });
    }
    return addLeadingZeros(weekYear, token.length);
  },
  // ISO week-numbering year
  R: function(date, token) {
    const isoWeekYear = getISOWeekYear(date);
    return addLeadingZeros(isoWeekYear, token.length);
  },
  // Extended year. This is a single number designating the year of this calendar system.
  // The main difference between `y` and `u` localizers are B.C. years:
  // | Year | `y` | `u` |
  // |------|-----|-----|
  // | AC 1 |   1 |   1 |
  // | BC 1 |   1 |   0 |
  // | BC 2 |   2 |  -1 |
  // Also `yy` always returns the last two digits of a year,
  // while `uu` pads single digit years to 2 characters and returns other years unchanged.
  u: function(date, token) {
    const year = date.getFullYear();
    return addLeadingZeros(year, token.length);
  },
  // Quarter
  Q: function(date, token, localize2) {
    const quarter = Math.ceil((date.getMonth() + 1) / 3);
    switch (token) {
      // 1, 2, 3, 4
      case "Q":
        return String(quarter);
      // 01, 02, 03, 04
      case "QQ":
        return addLeadingZeros(quarter, 2);
      // 1st, 2nd, 3rd, 4th
      case "Qo":
        return localize2.ordinalNumber(quarter, { unit: "quarter" });
      // Q1, Q2, Q3, Q4
      case "QQQ":
        return localize2.quarter(quarter, {
          width: "abbreviated",
          context: "formatting"
        });
      // 1, 2, 3, 4 (narrow quarter; could be not numerical)
      case "QQQQQ":
        return localize2.quarter(quarter, {
          width: "narrow",
          context: "formatting"
        });
      // 1st quarter, 2nd quarter, ...
      case "QQQQ":
      default:
        return localize2.quarter(quarter, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Stand-alone quarter
  q: function(date, token, localize2) {
    const quarter = Math.ceil((date.getMonth() + 1) / 3);
    switch (token) {
      // 1, 2, 3, 4
      case "q":
        return String(quarter);
      // 01, 02, 03, 04
      case "qq":
        return addLeadingZeros(quarter, 2);
      // 1st, 2nd, 3rd, 4th
      case "qo":
        return localize2.ordinalNumber(quarter, { unit: "quarter" });
      // Q1, Q2, Q3, Q4
      case "qqq":
        return localize2.quarter(quarter, {
          width: "abbreviated",
          context: "standalone"
        });
      // 1, 2, 3, 4 (narrow quarter; could be not numerical)
      case "qqqqq":
        return localize2.quarter(quarter, {
          width: "narrow",
          context: "standalone"
        });
      // 1st quarter, 2nd quarter, ...
      case "qqqq":
      default:
        return localize2.quarter(quarter, {
          width: "wide",
          context: "standalone"
        });
    }
  },
  // Month
  M: function(date, token, localize2) {
    const month = date.getMonth();
    switch (token) {
      case "M":
      case "MM":
        return lightFormatters.M(date, token);
      // 1st, 2nd, ..., 12th
      case "Mo":
        return localize2.ordinalNumber(month + 1, { unit: "month" });
      // Jan, Feb, ..., Dec
      case "MMM":
        return localize2.month(month, {
          width: "abbreviated",
          context: "formatting"
        });
      // J, F, ..., D
      case "MMMMM":
        return localize2.month(month, {
          width: "narrow",
          context: "formatting"
        });
      // January, February, ..., December
      case "MMMM":
      default:
        return localize2.month(month, { width: "wide", context: "formatting" });
    }
  },
  // Stand-alone month
  L: function(date, token, localize2) {
    const month = date.getMonth();
    switch (token) {
      // 1, 2, ..., 12
      case "L":
        return String(month + 1);
      // 01, 02, ..., 12
      case "LL":
        return addLeadingZeros(month + 1, 2);
      // 1st, 2nd, ..., 12th
      case "Lo":
        return localize2.ordinalNumber(month + 1, { unit: "month" });
      // Jan, Feb, ..., Dec
      case "LLL":
        return localize2.month(month, {
          width: "abbreviated",
          context: "standalone"
        });
      // J, F, ..., D
      case "LLLLL":
        return localize2.month(month, {
          width: "narrow",
          context: "standalone"
        });
      // January, February, ..., December
      case "LLLL":
      default:
        return localize2.month(month, { width: "wide", context: "standalone" });
    }
  },
  // Local week of year
  w: function(date, token, localize2, options) {
    const week = getWeek(date, options);
    if (token === "wo") {
      return localize2.ordinalNumber(week, { unit: "week" });
    }
    return addLeadingZeros(week, token.length);
  },
  // ISO week of year
  I: function(date, token, localize2) {
    const isoWeek = getISOWeek(date);
    if (token === "Io") {
      return localize2.ordinalNumber(isoWeek, { unit: "week" });
    }
    return addLeadingZeros(isoWeek, token.length);
  },
  // Day of the month
  d: function(date, token, localize2) {
    if (token === "do") {
      return localize2.ordinalNumber(date.getDate(), { unit: "date" });
    }
    return lightFormatters.d(date, token);
  },
  // Day of year
  D: function(date, token, localize2) {
    const dayOfYear = getDayOfYear(date);
    if (token === "Do") {
      return localize2.ordinalNumber(dayOfYear, { unit: "dayOfYear" });
    }
    return addLeadingZeros(dayOfYear, token.length);
  },
  // Day of week
  E: function(date, token, localize2) {
    const dayOfWeek = date.getDay();
    switch (token) {
      // Tue
      case "E":
      case "EE":
      case "EEE":
        return localize2.day(dayOfWeek, {
          width: "abbreviated",
          context: "formatting"
        });
      // T
      case "EEEEE":
        return localize2.day(dayOfWeek, {
          width: "narrow",
          context: "formatting"
        });
      // Tu
      case "EEEEEE":
        return localize2.day(dayOfWeek, {
          width: "short",
          context: "formatting"
        });
      // Tuesday
      case "EEEE":
      default:
        return localize2.day(dayOfWeek, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Local day of week
  e: function(date, token, localize2, options) {
    const dayOfWeek = date.getDay();
    const localDayOfWeek = (dayOfWeek - options.weekStartsOn + 8) % 7 || 7;
    switch (token) {
      // Numerical value (Nth day of week with current locale or weekStartsOn)
      case "e":
        return String(localDayOfWeek);
      // Padded numerical value
      case "ee":
        return addLeadingZeros(localDayOfWeek, 2);
      // 1st, 2nd, ..., 7th
      case "eo":
        return localize2.ordinalNumber(localDayOfWeek, { unit: "day" });
      case "eee":
        return localize2.day(dayOfWeek, {
          width: "abbreviated",
          context: "formatting"
        });
      // T
      case "eeeee":
        return localize2.day(dayOfWeek, {
          width: "narrow",
          context: "formatting"
        });
      // Tu
      case "eeeeee":
        return localize2.day(dayOfWeek, {
          width: "short",
          context: "formatting"
        });
      // Tuesday
      case "eeee":
      default:
        return localize2.day(dayOfWeek, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Stand-alone local day of week
  c: function(date, token, localize2, options) {
    const dayOfWeek = date.getDay();
    const localDayOfWeek = (dayOfWeek - options.weekStartsOn + 8) % 7 || 7;
    switch (token) {
      // Numerical value (same as in `e`)
      case "c":
        return String(localDayOfWeek);
      // Padded numerical value
      case "cc":
        return addLeadingZeros(localDayOfWeek, token.length);
      // 1st, 2nd, ..., 7th
      case "co":
        return localize2.ordinalNumber(localDayOfWeek, { unit: "day" });
      case "ccc":
        return localize2.day(dayOfWeek, {
          width: "abbreviated",
          context: "standalone"
        });
      // T
      case "ccccc":
        return localize2.day(dayOfWeek, {
          width: "narrow",
          context: "standalone"
        });
      // Tu
      case "cccccc":
        return localize2.day(dayOfWeek, {
          width: "short",
          context: "standalone"
        });
      // Tuesday
      case "cccc":
      default:
        return localize2.day(dayOfWeek, {
          width: "wide",
          context: "standalone"
        });
    }
  },
  // ISO day of week
  i: function(date, token, localize2) {
    const dayOfWeek = date.getDay();
    const isoDayOfWeek = dayOfWeek === 0 ? 7 : dayOfWeek;
    switch (token) {
      // 2
      case "i":
        return String(isoDayOfWeek);
      // 02
      case "ii":
        return addLeadingZeros(isoDayOfWeek, token.length);
      // 2nd
      case "io":
        return localize2.ordinalNumber(isoDayOfWeek, { unit: "day" });
      // Tue
      case "iii":
        return localize2.day(dayOfWeek, {
          width: "abbreviated",
          context: "formatting"
        });
      // T
      case "iiiii":
        return localize2.day(dayOfWeek, {
          width: "narrow",
          context: "formatting"
        });
      // Tu
      case "iiiiii":
        return localize2.day(dayOfWeek, {
          width: "short",
          context: "formatting"
        });
      // Tuesday
      case "iiii":
      default:
        return localize2.day(dayOfWeek, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // AM or PM
  a: function(date, token, localize2) {
    const hours = date.getHours();
    const dayPeriodEnumValue = hours / 12 >= 1 ? "pm" : "am";
    switch (token) {
      case "a":
      case "aa":
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "abbreviated",
          context: "formatting"
        });
      case "aaa":
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "abbreviated",
          context: "formatting"
        }).toLowerCase();
      case "aaaaa":
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "narrow",
          context: "formatting"
        });
      case "aaaa":
      default:
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // AM, PM, midnight, noon
  b: function(date, token, localize2) {
    const hours = date.getHours();
    let dayPeriodEnumValue;
    if (hours === 12) {
      dayPeriodEnumValue = dayPeriodEnum.noon;
    } else if (hours === 0) {
      dayPeriodEnumValue = dayPeriodEnum.midnight;
    } else {
      dayPeriodEnumValue = hours / 12 >= 1 ? "pm" : "am";
    }
    switch (token) {
      case "b":
      case "bb":
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "abbreviated",
          context: "formatting"
        });
      case "bbb":
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "abbreviated",
          context: "formatting"
        }).toLowerCase();
      case "bbbbb":
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "narrow",
          context: "formatting"
        });
      case "bbbb":
      default:
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // in the morning, in the afternoon, in the evening, at night
  B: function(date, token, localize2) {
    const hours = date.getHours();
    let dayPeriodEnumValue;
    if (hours >= 17) {
      dayPeriodEnumValue = dayPeriodEnum.evening;
    } else if (hours >= 12) {
      dayPeriodEnumValue = dayPeriodEnum.afternoon;
    } else if (hours >= 4) {
      dayPeriodEnumValue = dayPeriodEnum.morning;
    } else {
      dayPeriodEnumValue = dayPeriodEnum.night;
    }
    switch (token) {
      case "B":
      case "BB":
      case "BBB":
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "abbreviated",
          context: "formatting"
        });
      case "BBBBB":
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "narrow",
          context: "formatting"
        });
      case "BBBB":
      default:
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Hour [1-12]
  h: function(date, token, localize2) {
    if (token === "ho") {
      let hours = date.getHours() % 12;
      if (hours === 0) hours = 12;
      return localize2.ordinalNumber(hours, { unit: "hour" });
    }
    return lightFormatters.h(date, token);
  },
  // Hour [0-23]
  H: function(date, token, localize2) {
    if (token === "Ho") {
      return localize2.ordinalNumber(date.getHours(), { unit: "hour" });
    }
    return lightFormatters.H(date, token);
  },
  // Hour [0-11]
  K: function(date, token, localize2) {
    const hours = date.getHours() % 12;
    if (token === "Ko") {
      return localize2.ordinalNumber(hours, { unit: "hour" });
    }
    return addLeadingZeros(hours, token.length);
  },
  // Hour [1-24]
  k: function(date, token, localize2) {
    let hours = date.getHours();
    if (hours === 0) hours = 24;
    if (token === "ko") {
      return localize2.ordinalNumber(hours, { unit: "hour" });
    }
    return addLeadingZeros(hours, token.length);
  },
  // Minute
  m: function(date, token, localize2) {
    if (token === "mo") {
      return localize2.ordinalNumber(date.getMinutes(), { unit: "minute" });
    }
    return lightFormatters.m(date, token);
  },
  // Second
  s: function(date, token, localize2) {
    if (token === "so") {
      return localize2.ordinalNumber(date.getSeconds(), { unit: "second" });
    }
    return lightFormatters.s(date, token);
  },
  // Fraction of second
  S: function(date, token) {
    return lightFormatters.S(date, token);
  },
  // Timezone (ISO-8601. If offset is 0, output is always `'Z'`)
  X: function(date, token, _localize) {
    const timezoneOffset = date.getTimezoneOffset();
    if (timezoneOffset === 0) {
      return "Z";
    }
    switch (token) {
      // Hours and optional minutes
      case "X":
        return formatTimezoneWithOptionalMinutes(timezoneOffset);
      // Hours, minutes and optional seconds without `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `XX`
      case "XXXX":
      case "XX":
        return formatTimezone(timezoneOffset);
      // Hours, minutes and optional seconds with `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `XXX`
      case "XXXXX":
      case "XXX":
      // Hours and minutes with `:` delimiter
      default:
        return formatTimezone(timezoneOffset, ":");
    }
  },
  // Timezone (ISO-8601. If offset is 0, output is `'+00:00'` or equivalent)
  x: function(date, token, _localize) {
    const timezoneOffset = date.getTimezoneOffset();
    switch (token) {
      // Hours and optional minutes
      case "x":
        return formatTimezoneWithOptionalMinutes(timezoneOffset);
      // Hours, minutes and optional seconds without `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `xx`
      case "xxxx":
      case "xx":
        return formatTimezone(timezoneOffset);
      // Hours, minutes and optional seconds with `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `xxx`
      case "xxxxx":
      case "xxx":
      // Hours and minutes with `:` delimiter
      default:
        return formatTimezone(timezoneOffset, ":");
    }
  },
  // Timezone (GMT)
  O: function(date, token, _localize) {
    const timezoneOffset = date.getTimezoneOffset();
    switch (token) {
      // Short
      case "O":
      case "OO":
      case "OOO":
        return "GMT" + formatTimezoneShort(timezoneOffset, ":");
      // Long
      case "OOOO":
      default:
        return "GMT" + formatTimezone(timezoneOffset, ":");
    }
  },
  // Timezone (specific non-location)
  z: function(date, token, _localize) {
    const timezoneOffset = date.getTimezoneOffset();
    switch (token) {
      // Short
      case "z":
      case "zz":
      case "zzz":
        return "GMT" + formatTimezoneShort(timezoneOffset, ":");
      // Long
      case "zzzz":
      default:
        return "GMT" + formatTimezone(timezoneOffset, ":");
    }
  },
  // Seconds timestamp
  t: function(date, token, _localize) {
    const timestamp = Math.trunc(+date / 1e3);
    return addLeadingZeros(timestamp, token.length);
  },
  // Milliseconds timestamp
  T: function(date, token, _localize) {
    return addLeadingZeros(+date, token.length);
  }
};
function formatTimezoneShort(offset, delimiter = "") {
  const sign = offset > 0 ? "-" : "+";
  const absOffset = Math.abs(offset);
  const hours = Math.trunc(absOffset / 60);
  const minutes = absOffset % 60;
  if (minutes === 0) {
    return sign + String(hours);
  }
  return sign + String(hours) + delimiter + addLeadingZeros(minutes, 2);
}
function formatTimezoneWithOptionalMinutes(offset, delimiter) {
  if (offset % 60 === 0) {
    const sign = offset > 0 ? "-" : "+";
    return sign + addLeadingZeros(Math.abs(offset) / 60, 2);
  }
  return formatTimezone(offset, delimiter);
}
function formatTimezone(offset, delimiter = "") {
  const sign = offset > 0 ? "-" : "+";
  const absOffset = Math.abs(offset);
  const hours = addLeadingZeros(Math.trunc(absOffset / 60), 2);
  const minutes = addLeadingZeros(absOffset % 60, 2);
  return sign + hours + delimiter + minutes;
}
const dateLongFormatter = (pattern, formatLong2) => {
  switch (pattern) {
    case "P":
      return formatLong2.date({ width: "short" });
    case "PP":
      return formatLong2.date({ width: "medium" });
    case "PPP":
      return formatLong2.date({ width: "long" });
    case "PPPP":
    default:
      return formatLong2.date({ width: "full" });
  }
};
const timeLongFormatter = (pattern, formatLong2) => {
  switch (pattern) {
    case "p":
      return formatLong2.time({ width: "short" });
    case "pp":
      return formatLong2.time({ width: "medium" });
    case "ppp":
      return formatLong2.time({ width: "long" });
    case "pppp":
    default:
      return formatLong2.time({ width: "full" });
  }
};
const dateTimeLongFormatter = (pattern, formatLong2) => {
  const matchResult = pattern.match(/(P+)(p+)?/) || [];
  const datePattern = matchResult[1];
  const timePattern = matchResult[2];
  if (!timePattern) {
    return dateLongFormatter(pattern, formatLong2);
  }
  let dateTimeFormat;
  switch (datePattern) {
    case "P":
      dateTimeFormat = formatLong2.dateTime({ width: "short" });
      break;
    case "PP":
      dateTimeFormat = formatLong2.dateTime({ width: "medium" });
      break;
    case "PPP":
      dateTimeFormat = formatLong2.dateTime({ width: "long" });
      break;
    case "PPPP":
    default:
      dateTimeFormat = formatLong2.dateTime({ width: "full" });
      break;
  }
  return dateTimeFormat.replace("{{date}}", dateLongFormatter(datePattern, formatLong2)).replace("{{time}}", timeLongFormatter(timePattern, formatLong2));
};
const longFormatters = {
  p: timeLongFormatter,
  P: dateTimeLongFormatter
};
const dayOfYearTokenRE = /^D+$/;
const weekYearTokenRE = /^Y+$/;
const throwTokens = ["D", "DD", "YY", "YYYY"];
function isProtectedDayOfYearToken(token) {
  return dayOfYearTokenRE.test(token);
}
function isProtectedWeekYearToken(token) {
  return weekYearTokenRE.test(token);
}
function warnOrThrowProtectedError(token, format2, input) {
  const _message = message(token, format2, input);
  console.warn(_message);
  if (throwTokens.includes(token)) throw new RangeError(_message);
}
function message(token, format2, input) {
  const subject = token[0] === "Y" ? "years" : "days of the month";
  return `Use \`${token.toLowerCase()}\` instead of \`${token}\` (in \`${format2}\`) for formatting ${subject} to the input \`${input}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`;
}
function isDate(value) {
  return value instanceof Date || typeof value === "object" && Object.prototype.toString.call(value) === "[object Date]";
}
function isValid(date) {
  return !(!isDate(date) && typeof date !== "number" || isNaN(+toDate(date)));
}
const formattingTokensRegExp$1 = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g;
const longFormattingTokensRegExp$1 = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g;
const escapedStringRegExp$1 = /^'([^]*?)'?$/;
const doubleQuoteRegExp$1 = /''/g;
const unescapedLatinCharacterRegExp$1 = /[a-zA-Z]/;
function format(date, formatStr, options) {
  const defaultOptions2 = getDefaultOptions$1();
  const locale = defaultOptions2.locale ?? enUS;
  const firstWeekContainsDate = defaultOptions2.firstWeekContainsDate ?? defaultOptions2.locale?.options?.firstWeekContainsDate ?? 1;
  const weekStartsOn = defaultOptions2.weekStartsOn ?? defaultOptions2.locale?.options?.weekStartsOn ?? 0;
  const originalDate = toDate(date, options?.in);
  if (!isValid(originalDate)) {
    throw new RangeError("Invalid time value");
  }
  let parts = formatStr.match(longFormattingTokensRegExp$1).map((substring) => {
    const firstCharacter = substring[0];
    if (firstCharacter === "p" || firstCharacter === "P") {
      const longFormatter = longFormatters[firstCharacter];
      return longFormatter(substring, locale.formatLong);
    }
    return substring;
  }).join("").match(formattingTokensRegExp$1).map((substring) => {
    if (substring === "''") {
      return { isToken: false, value: "'" };
    }
    const firstCharacter = substring[0];
    if (firstCharacter === "'") {
      return { isToken: false, value: cleanEscapedString$1(substring) };
    }
    if (formatters[firstCharacter]) {
      return { isToken: true, value: substring };
    }
    if (firstCharacter.match(unescapedLatinCharacterRegExp$1)) {
      throw new RangeError(
        "Format string contains an unescaped latin alphabet character `" + firstCharacter + "`"
      );
    }
    return { isToken: false, value: substring };
  });
  if (locale.localize.preprocessor) {
    parts = locale.localize.preprocessor(originalDate, parts);
  }
  const formatterOptions = {
    firstWeekContainsDate,
    weekStartsOn,
    locale
  };
  return parts.map((part) => {
    if (!part.isToken) return part.value;
    const token = part.value;
    if (isProtectedWeekYearToken(token) || isProtectedDayOfYearToken(token)) {
      warnOrThrowProtectedError(token, formatStr, String(date));
    }
    const formatter = formatters[token[0]];
    return formatter(originalDate, token, locale.localize, formatterOptions);
  }).join("");
}
function cleanEscapedString$1(input) {
  const matched = input.match(escapedStringRegExp$1);
  if (!matched) {
    return input;
  }
  return matched[1].replace(doubleQuoteRegExp$1, "'");
}
function getDefaultOptions() {
  return Object.assign({}, getDefaultOptions$1());
}
function transpose(date, constructor) {
  const date_ = isConstructor(constructor) ? new constructor(0) : constructFrom(constructor, 0);
  date_.setFullYear(date.getFullYear(), date.getMonth(), date.getDate());
  date_.setHours(
    date.getHours(),
    date.getMinutes(),
    date.getSeconds(),
    date.getMilliseconds()
  );
  return date_;
}
function isConstructor(constructor) {
  return typeof constructor === "function" && constructor.prototype?.constructor === constructor;
}
const TIMEZONE_UNIT_PRIORITY = 10;
class Setter {
  subPriority = 0;
  validate(_utcDate, _options) {
    return true;
  }
}
class ValueSetter extends Setter {
  constructor(value, validateValue, setValue, priority, subPriority) {
    super();
    this.value = value;
    this.validateValue = validateValue;
    this.setValue = setValue;
    this.priority = priority;
    if (subPriority) {
      this.subPriority = subPriority;
    }
  }
  validate(date, options) {
    return this.validateValue(date, this.value, options);
  }
  set(date, flags, options) {
    return this.setValue(date, flags, this.value, options);
  }
}
class DateTimezoneSetter extends Setter {
  priority = TIMEZONE_UNIT_PRIORITY;
  subPriority = -1;
  constructor(context, reference) {
    super();
    this.context = context || ((date) => constructFrom(reference, date));
  }
  set(date, flags) {
    if (flags.timestampIsSet) return date;
    return constructFrom(date, transpose(date, this.context));
  }
}
class Parser {
  run(dateString, token, match2, options) {
    const result = this.parse(dateString, token, match2, options);
    if (!result) {
      return null;
    }
    return {
      setter: new ValueSetter(
        result.value,
        this.validate,
        this.set,
        this.priority,
        this.subPriority
      ),
      rest: result.rest
    };
  }
  validate(_utcDate, _value, _options) {
    return true;
  }
}
class EraParser extends Parser {
  priority = 140;
  parse(dateString, token, match2) {
    switch (token) {
      // AD, BC
      case "G":
      case "GG":
      case "GGG":
        return match2.era(dateString, { width: "abbreviated" }) || match2.era(dateString, { width: "narrow" });
      // A, B
      case "GGGGG":
        return match2.era(dateString, { width: "narrow" });
      // Anno Domini, Before Christ
      case "GGGG":
      default:
        return match2.era(dateString, { width: "wide" }) || match2.era(dateString, { width: "abbreviated" }) || match2.era(dateString, { width: "narrow" });
    }
  }
  set(date, flags, value) {
    flags.era = value;
    date.setFullYear(value, 0, 1);
    date.setHours(0, 0, 0, 0);
    return date;
  }
  incompatibleTokens = ["R", "u", "t", "T"];
}
const numericPatterns = {
  month: /^(1[0-2]|0?\d)/,
  // 0 to 12
  date: /^(3[0-1]|[0-2]?\d)/,
  // 0 to 31
  dayOfYear: /^(36[0-6]|3[0-5]\d|[0-2]?\d?\d)/,
  // 0 to 366
  week: /^(5[0-3]|[0-4]?\d)/,
  // 0 to 53
  hour23h: /^(2[0-3]|[0-1]?\d)/,
  // 0 to 23
  hour24h: /^(2[0-4]|[0-1]?\d)/,
  // 0 to 24
  hour11h: /^(1[0-1]|0?\d)/,
  // 0 to 11
  hour12h: /^(1[0-2]|0?\d)/,
  // 0 to 12
  minute: /^[0-5]?\d/,
  // 0 to 59
  second: /^[0-5]?\d/,
  // 0 to 59
  singleDigit: /^\d/,
  // 0 to 9
  twoDigits: /^\d{1,2}/,
  // 0 to 99
  threeDigits: /^\d{1,3}/,
  // 0 to 999
  fourDigits: /^\d{1,4}/,
  // 0 to 9999
  anyDigitsSigned: /^-?\d+/,
  singleDigitSigned: /^-?\d/,
  // 0 to 9, -0 to -9
  twoDigitsSigned: /^-?\d{1,2}/,
  // 0 to 99, -0 to -99
  threeDigitsSigned: /^-?\d{1,3}/,
  // 0 to 999, -0 to -999
  fourDigitsSigned: /^-?\d{1,4}/
  // 0 to 9999, -0 to -9999
};
const timezonePatterns = {
  basicOptionalMinutes: /^([+-])(\d{2})(\d{2})?|Z/,
  basic: /^([+-])(\d{2})(\d{2})|Z/,
  basicOptionalSeconds: /^([+-])(\d{2})(\d{2})((\d{2}))?|Z/,
  extended: /^([+-])(\d{2}):(\d{2})|Z/,
  extendedOptionalSeconds: /^([+-])(\d{2}):(\d{2})(:(\d{2}))?|Z/
};
function mapValue(parseFnResult, mapFn) {
  if (!parseFnResult) {
    return parseFnResult;
  }
  return {
    value: mapFn(parseFnResult.value),
    rest: parseFnResult.rest
  };
}
function parseNumericPattern(pattern, dateString) {
  const matchResult = dateString.match(pattern);
  if (!matchResult) {
    return null;
  }
  return {
    value: parseInt(matchResult[0], 10),
    rest: dateString.slice(matchResult[0].length)
  };
}
function parseTimezonePattern(pattern, dateString) {
  const matchResult = dateString.match(pattern);
  if (!matchResult) {
    return null;
  }
  if (matchResult[0] === "Z") {
    return {
      value: 0,
      rest: dateString.slice(1)
    };
  }
  const sign = matchResult[1] === "+" ? 1 : -1;
  const hours = matchResult[2] ? parseInt(matchResult[2], 10) : 0;
  const minutes = matchResult[3] ? parseInt(matchResult[3], 10) : 0;
  const seconds = matchResult[5] ? parseInt(matchResult[5], 10) : 0;
  return {
    value: sign * (hours * millisecondsInHour + minutes * millisecondsInMinute + seconds * millisecondsInSecond),
    rest: dateString.slice(matchResult[0].length)
  };
}
function parseAnyDigitsSigned(dateString) {
  return parseNumericPattern(numericPatterns.anyDigitsSigned, dateString);
}
function parseNDigits(n, dateString) {
  switch (n) {
    case 1:
      return parseNumericPattern(numericPatterns.singleDigit, dateString);
    case 2:
      return parseNumericPattern(numericPatterns.twoDigits, dateString);
    case 3:
      return parseNumericPattern(numericPatterns.threeDigits, dateString);
    case 4:
      return parseNumericPattern(numericPatterns.fourDigits, dateString);
    default:
      return parseNumericPattern(new RegExp("^\\d{1," + n + "}"), dateString);
  }
}
function parseNDigitsSigned(n, dateString) {
  switch (n) {
    case 1:
      return parseNumericPattern(numericPatterns.singleDigitSigned, dateString);
    case 2:
      return parseNumericPattern(numericPatterns.twoDigitsSigned, dateString);
    case 3:
      return parseNumericPattern(numericPatterns.threeDigitsSigned, dateString);
    case 4:
      return parseNumericPattern(numericPatterns.fourDigitsSigned, dateString);
    default:
      return parseNumericPattern(new RegExp("^-?\\d{1," + n + "}"), dateString);
  }
}
function dayPeriodEnumToHours(dayPeriod) {
  switch (dayPeriod) {
    case "morning":
      return 4;
    case "evening":
      return 17;
    case "pm":
    case "noon":
    case "afternoon":
      return 12;
    case "am":
    case "midnight":
    case "night":
    default:
      return 0;
  }
}
function normalizeTwoDigitYear(twoDigitYear, currentYear) {
  const isCommonEra = currentYear > 0;
  const absCurrentYear = isCommonEra ? currentYear : 1 - currentYear;
  let result;
  if (absCurrentYear <= 50) {
    result = twoDigitYear || 100;
  } else {
    const rangeEnd = absCurrentYear + 50;
    const rangeEndCentury = Math.trunc(rangeEnd / 100) * 100;
    const isPreviousCentury = twoDigitYear >= rangeEnd % 100;
    result = twoDigitYear + rangeEndCentury - (isPreviousCentury ? 100 : 0);
  }
  return isCommonEra ? result : 1 - result;
}
function isLeapYearIndex(year) {
  return year % 400 === 0 || year % 4 === 0 && year % 100 !== 0;
}
class YearParser extends Parser {
  priority = 130;
  incompatibleTokens = ["Y", "R", "u", "w", "I", "i", "e", "c", "t", "T"];
  parse(dateString, token, match2) {
    const valueCallback = (year) => ({
      year,
      isTwoDigitYear: token === "yy"
    });
    switch (token) {
      case "y":
        return mapValue(parseNDigits(4, dateString), valueCallback);
      case "yo":
        return mapValue(
          match2.ordinalNumber(dateString, {
            unit: "year"
          }),
          valueCallback
        );
      default:
        return mapValue(parseNDigits(token.length, dateString), valueCallback);
    }
  }
  validate(_date, value) {
    return value.isTwoDigitYear || value.year > 0;
  }
  set(date, flags, value) {
    const currentYear = date.getFullYear();
    if (value.isTwoDigitYear) {
      const normalizedTwoDigitYear = normalizeTwoDigitYear(
        value.year,
        currentYear
      );
      date.setFullYear(normalizedTwoDigitYear, 0, 1);
      date.setHours(0, 0, 0, 0);
      return date;
    }
    const year = !("era" in flags) || flags.era === 1 ? value.year : 1 - value.year;
    date.setFullYear(year, 0, 1);
    date.setHours(0, 0, 0, 0);
    return date;
  }
}
class LocalWeekYearParser extends Parser {
  priority = 130;
  parse(dateString, token, match2) {
    const valueCallback = (year) => ({
      year,
      isTwoDigitYear: token === "YY"
    });
    switch (token) {
      case "Y":
        return mapValue(parseNDigits(4, dateString), valueCallback);
      case "Yo":
        return mapValue(
          match2.ordinalNumber(dateString, {
            unit: "year"
          }),
          valueCallback
        );
      default:
        return mapValue(parseNDigits(token.length, dateString), valueCallback);
    }
  }
  validate(_date, value) {
    return value.isTwoDigitYear || value.year > 0;
  }
  set(date, flags, value, options) {
    const currentYear = getWeekYear(date, options);
    if (value.isTwoDigitYear) {
      const normalizedTwoDigitYear = normalizeTwoDigitYear(
        value.year,
        currentYear
      );
      date.setFullYear(
        normalizedTwoDigitYear,
        0,
        options.firstWeekContainsDate
      );
      date.setHours(0, 0, 0, 0);
      return startOfWeek(date, options);
    }
    const year = !("era" in flags) || flags.era === 1 ? value.year : 1 - value.year;
    date.setFullYear(year, 0, options.firstWeekContainsDate);
    date.setHours(0, 0, 0, 0);
    return startOfWeek(date, options);
  }
  incompatibleTokens = [
    "y",
    "R",
    "u",
    "Q",
    "q",
    "M",
    "L",
    "I",
    "d",
    "D",
    "i",
    "t",
    "T"
  ];
}
class ISOWeekYearParser extends Parser {
  priority = 130;
  parse(dateString, token) {
    if (token === "R") {
      return parseNDigitsSigned(4, dateString);
    }
    return parseNDigitsSigned(token.length, dateString);
  }
  set(date, _flags, value) {
    const firstWeekOfYear = constructFrom(date, 0);
    firstWeekOfYear.setFullYear(value, 0, 4);
    firstWeekOfYear.setHours(0, 0, 0, 0);
    return startOfISOWeek(firstWeekOfYear);
  }
  incompatibleTokens = [
    "G",
    "y",
    "Y",
    "u",
    "Q",
    "q",
    "M",
    "L",
    "w",
    "d",
    "D",
    "e",
    "c",
    "t",
    "T"
  ];
}
class ExtendedYearParser extends Parser {
  priority = 130;
  parse(dateString, token) {
    if (token === "u") {
      return parseNDigitsSigned(4, dateString);
    }
    return parseNDigitsSigned(token.length, dateString);
  }
  set(date, _flags, value) {
    date.setFullYear(value, 0, 1);
    date.setHours(0, 0, 0, 0);
    return date;
  }
  incompatibleTokens = ["G", "y", "Y", "R", "w", "I", "i", "e", "c", "t", "T"];
}
class QuarterParser extends Parser {
  priority = 120;
  parse(dateString, token, match2) {
    switch (token) {
      // 1, 2, 3, 4
      case "Q":
      case "QQ":
        return parseNDigits(token.length, dateString);
      // 1st, 2nd, 3rd, 4th
      case "Qo":
        return match2.ordinalNumber(dateString, { unit: "quarter" });
      // Q1, Q2, Q3, Q4
      case "QQQ":
        return match2.quarter(dateString, {
          width: "abbreviated",
          context: "formatting"
        }) || match2.quarter(dateString, {
          width: "narrow",
          context: "formatting"
        });
      // 1, 2, 3, 4 (narrow quarter; could be not numerical)
      case "QQQQQ":
        return match2.quarter(dateString, {
          width: "narrow",
          context: "formatting"
        });
      // 1st quarter, 2nd quarter, ...
      case "QQQQ":
      default:
        return match2.quarter(dateString, {
          width: "wide",
          context: "formatting"
        }) || match2.quarter(dateString, {
          width: "abbreviated",
          context: "formatting"
        }) || match2.quarter(dateString, {
          width: "narrow",
          context: "formatting"
        });
    }
  }
  validate(_date, value) {
    return value >= 1 && value <= 4;
  }
  set(date, _flags, value) {
    date.setMonth((value - 1) * 3, 1);
    date.setHours(0, 0, 0, 0);
    return date;
  }
  incompatibleTokens = [
    "Y",
    "R",
    "q",
    "M",
    "L",
    "w",
    "I",
    "d",
    "D",
    "i",
    "e",
    "c",
    "t",
    "T"
  ];
}
class StandAloneQuarterParser extends Parser {
  priority = 120;
  parse(dateString, token, match2) {
    switch (token) {
      // 1, 2, 3, 4
      case "q":
      case "qq":
        return parseNDigits(token.length, dateString);
      // 1st, 2nd, 3rd, 4th
      case "qo":
        return match2.ordinalNumber(dateString, { unit: "quarter" });
      // Q1, Q2, Q3, Q4
      case "qqq":
        return match2.quarter(dateString, {
          width: "abbreviated",
          context: "standalone"
        }) || match2.quarter(dateString, {
          width: "narrow",
          context: "standalone"
        });
      // 1, 2, 3, 4 (narrow quarter; could be not numerical)
      case "qqqqq":
        return match2.quarter(dateString, {
          width: "narrow",
          context: "standalone"
        });
      // 1st quarter, 2nd quarter, ...
      case "qqqq":
      default:
        return match2.quarter(dateString, {
          width: "wide",
          context: "standalone"
        }) || match2.quarter(dateString, {
          width: "abbreviated",
          context: "standalone"
        }) || match2.quarter(dateString, {
          width: "narrow",
          context: "standalone"
        });
    }
  }
  validate(_date, value) {
    return value >= 1 && value <= 4;
  }
  set(date, _flags, value) {
    date.setMonth((value - 1) * 3, 1);
    date.setHours(0, 0, 0, 0);
    return date;
  }
  incompatibleTokens = [
    "Y",
    "R",
    "Q",
    "M",
    "L",
    "w",
    "I",
    "d",
    "D",
    "i",
    "e",
    "c",
    "t",
    "T"
  ];
}
class MonthParser extends Parser {
  incompatibleTokens = [
    "Y",
    "R",
    "q",
    "Q",
    "L",
    "w",
    "I",
    "D",
    "i",
    "e",
    "c",
    "t",
    "T"
  ];
  priority = 110;
  parse(dateString, token, match2) {
    const valueCallback = (value) => value - 1;
    switch (token) {
      // 1, 2, ..., 12
      case "M":
        return mapValue(
          parseNumericPattern(numericPatterns.month, dateString),
          valueCallback
        );
      // 01, 02, ..., 12
      case "MM":
        return mapValue(parseNDigits(2, dateString), valueCallback);
      // 1st, 2nd, ..., 12th
      case "Mo":
        return mapValue(
          match2.ordinalNumber(dateString, {
            unit: "month"
          }),
          valueCallback
        );
      // Jan, Feb, ..., Dec
      case "MMM":
        return match2.month(dateString, {
          width: "abbreviated",
          context: "formatting"
        }) || match2.month(dateString, { width: "narrow", context: "formatting" });
      // J, F, ..., D
      case "MMMMM":
        return match2.month(dateString, {
          width: "narrow",
          context: "formatting"
        });
      // January, February, ..., December
      case "MMMM":
      default:
        return match2.month(dateString, { width: "wide", context: "formatting" }) || match2.month(dateString, {
          width: "abbreviated",
          context: "formatting"
        }) || match2.month(dateString, { width: "narrow", context: "formatting" });
    }
  }
  validate(_date, value) {
    return value >= 0 && value <= 11;
  }
  set(date, _flags, value) {
    date.setMonth(value, 1);
    date.setHours(0, 0, 0, 0);
    return date;
  }
}
class StandAloneMonthParser extends Parser {
  priority = 110;
  parse(dateString, token, match2) {
    const valueCallback = (value) => value - 1;
    switch (token) {
      // 1, 2, ..., 12
      case "L":
        return mapValue(
          parseNumericPattern(numericPatterns.month, dateString),
          valueCallback
        );
      // 01, 02, ..., 12
      case "LL":
        return mapValue(parseNDigits(2, dateString), valueCallback);
      // 1st, 2nd, ..., 12th
      case "Lo":
        return mapValue(
          match2.ordinalNumber(dateString, {
            unit: "month"
          }),
          valueCallback
        );
      // Jan, Feb, ..., Dec
      case "LLL":
        return match2.month(dateString, {
          width: "abbreviated",
          context: "standalone"
        }) || match2.month(dateString, { width: "narrow", context: "standalone" });
      // J, F, ..., D
      case "LLLLL":
        return match2.month(dateString, {
          width: "narrow",
          context: "standalone"
        });
      // January, February, ..., December
      case "LLLL":
      default:
        return match2.month(dateString, { width: "wide", context: "standalone" }) || match2.month(dateString, {
          width: "abbreviated",
          context: "standalone"
        }) || match2.month(dateString, { width: "narrow", context: "standalone" });
    }
  }
  validate(_date, value) {
    return value >= 0 && value <= 11;
  }
  set(date, _flags, value) {
    date.setMonth(value, 1);
    date.setHours(0, 0, 0, 0);
    return date;
  }
  incompatibleTokens = [
    "Y",
    "R",
    "q",
    "Q",
    "M",
    "w",
    "I",
    "D",
    "i",
    "e",
    "c",
    "t",
    "T"
  ];
}
function setWeek(date, week, options) {
  const date_ = toDate(date, options?.in);
  const diff = getWeek(date_, options) - week;
  date_.setDate(date_.getDate() - diff * 7);
  return toDate(date_, options?.in);
}
class LocalWeekParser extends Parser {
  priority = 100;
  parse(dateString, token, match2) {
    switch (token) {
      case "w":
        return parseNumericPattern(numericPatterns.week, dateString);
      case "wo":
        return match2.ordinalNumber(dateString, { unit: "week" });
      default:
        return parseNDigits(token.length, dateString);
    }
  }
  validate(_date, value) {
    return value >= 1 && value <= 53;
  }
  set(date, _flags, value, options) {
    return startOfWeek(setWeek(date, value, options), options);
  }
  incompatibleTokens = [
    "y",
    "R",
    "u",
    "q",
    "Q",
    "M",
    "L",
    "I",
    "d",
    "D",
    "i",
    "t",
    "T"
  ];
}
function setISOWeek(date, week, options) {
  const _date = toDate(date, options?.in);
  const diff = getISOWeek(_date, options) - week;
  _date.setDate(_date.getDate() - diff * 7);
  return _date;
}
class ISOWeekParser extends Parser {
  priority = 100;
  parse(dateString, token, match2) {
    switch (token) {
      case "I":
        return parseNumericPattern(numericPatterns.week, dateString);
      case "Io":
        return match2.ordinalNumber(dateString, { unit: "week" });
      default:
        return parseNDigits(token.length, dateString);
    }
  }
  validate(_date, value) {
    return value >= 1 && value <= 53;
  }
  set(date, _flags, value) {
    return startOfISOWeek(setISOWeek(date, value));
  }
  incompatibleTokens = [
    "y",
    "Y",
    "u",
    "q",
    "Q",
    "M",
    "L",
    "w",
    "d",
    "D",
    "e",
    "c",
    "t",
    "T"
  ];
}
const DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const DAYS_IN_MONTH_LEAP_YEAR = [
  31,
  29,
  31,
  30,
  31,
  30,
  31,
  31,
  30,
  31,
  30,
  31
];
class DateParser extends Parser {
  priority = 90;
  subPriority = 1;
  parse(dateString, token, match2) {
    switch (token) {
      case "d":
        return parseNumericPattern(numericPatterns.date, dateString);
      case "do":
        return match2.ordinalNumber(dateString, { unit: "date" });
      default:
        return parseNDigits(token.length, dateString);
    }
  }
  validate(date, value) {
    const year = date.getFullYear();
    const isLeapYear = isLeapYearIndex(year);
    const month = date.getMonth();
    if (isLeapYear) {
      return value >= 1 && value <= DAYS_IN_MONTH_LEAP_YEAR[month];
    } else {
      return value >= 1 && value <= DAYS_IN_MONTH[month];
    }
  }
  set(date, _flags, value) {
    date.setDate(value);
    date.setHours(0, 0, 0, 0);
    return date;
  }
  incompatibleTokens = [
    "Y",
    "R",
    "q",
    "Q",
    "w",
    "I",
    "D",
    "i",
    "e",
    "c",
    "t",
    "T"
  ];
}
class DayOfYearParser extends Parser {
  priority = 90;
  subpriority = 1;
  parse(dateString, token, match2) {
    switch (token) {
      case "D":
      case "DD":
        return parseNumericPattern(numericPatterns.dayOfYear, dateString);
      case "Do":
        return match2.ordinalNumber(dateString, { unit: "date" });
      default:
        return parseNDigits(token.length, dateString);
    }
  }
  validate(date, value) {
    const year = date.getFullYear();
    const isLeapYear = isLeapYearIndex(year);
    if (isLeapYear) {
      return value >= 1 && value <= 366;
    } else {
      return value >= 1 && value <= 365;
    }
  }
  set(date, _flags, value) {
    date.setMonth(0, value);
    date.setHours(0, 0, 0, 0);
    return date;
  }
  incompatibleTokens = [
    "Y",
    "R",
    "q",
    "Q",
    "M",
    "L",
    "w",
    "I",
    "d",
    "E",
    "i",
    "e",
    "c",
    "t",
    "T"
  ];
}
function addDays(date, amount, options) {
  const _date = toDate(date, options?.in);
  if (isNaN(amount)) return constructFrom(options?.in || date, NaN);
  if (!amount) return _date;
  _date.setDate(_date.getDate() + amount);
  return _date;
}
function setDay(date, day, options) {
  const defaultOptions2 = getDefaultOptions$1();
  const weekStartsOn = options?.weekStartsOn ?? options?.locale?.options?.weekStartsOn ?? defaultOptions2.weekStartsOn ?? defaultOptions2.locale?.options?.weekStartsOn ?? 0;
  const date_ = toDate(date, options?.in);
  const currentDay = date_.getDay();
  const remainder = day % 7;
  const dayIndex = (remainder + 7) % 7;
  const delta = 7 - weekStartsOn;
  const diff = day < 0 || day > 6 ? day - (currentDay + delta) % 7 : (dayIndex + delta) % 7 - (currentDay + delta) % 7;
  return addDays(date_, diff, options);
}
class DayParser extends Parser {
  priority = 90;
  parse(dateString, token, match2) {
    switch (token) {
      // Tue
      case "E":
      case "EE":
      case "EEE":
        return match2.day(dateString, {
          width: "abbreviated",
          context: "formatting"
        }) || match2.day(dateString, { width: "short", context: "formatting" }) || match2.day(dateString, { width: "narrow", context: "formatting" });
      // T
      case "EEEEE":
        return match2.day(dateString, {
          width: "narrow",
          context: "formatting"
        });
      // Tu
      case "EEEEEE":
        return match2.day(dateString, { width: "short", context: "formatting" }) || match2.day(dateString, { width: "narrow", context: "formatting" });
      // Tuesday
      case "EEEE":
      default:
        return match2.day(dateString, { width: "wide", context: "formatting" }) || match2.day(dateString, {
          width: "abbreviated",
          context: "formatting"
        }) || match2.day(dateString, { width: "short", context: "formatting" }) || match2.day(dateString, { width: "narrow", context: "formatting" });
    }
  }
  validate(_date, value) {
    return value >= 0 && value <= 6;
  }
  set(date, _flags, value, options) {
    date = setDay(date, value, options);
    date.setHours(0, 0, 0, 0);
    return date;
  }
  incompatibleTokens = ["D", "i", "e", "c", "t", "T"];
}
class LocalDayParser extends Parser {
  priority = 90;
  parse(dateString, token, match2, options) {
    const valueCallback = (value) => {
      const wholeWeekDays = Math.floor((value - 1) / 7) * 7;
      return (value + options.weekStartsOn + 6) % 7 + wholeWeekDays;
    };
    switch (token) {
      // 3
      case "e":
      case "ee":
        return mapValue(parseNDigits(token.length, dateString), valueCallback);
      // 3rd
      case "eo":
        return mapValue(
          match2.ordinalNumber(dateString, {
            unit: "day"
          }),
          valueCallback
        );
      // Tue
      case "eee":
        return match2.day(dateString, {
          width: "abbreviated",
          context: "formatting"
        }) || match2.day(dateString, { width: "short", context: "formatting" }) || match2.day(dateString, { width: "narrow", context: "formatting" });
      // T
      case "eeeee":
        return match2.day(dateString, {
          width: "narrow",
          context: "formatting"
        });
      // Tu
      case "eeeeee":
        return match2.day(dateString, { width: "short", context: "formatting" }) || match2.day(dateString, { width: "narrow", context: "formatting" });
      // Tuesday
      case "eeee":
      default:
        return match2.day(dateString, { width: "wide", context: "formatting" }) || match2.day(dateString, {
          width: "abbreviated",
          context: "formatting"
        }) || match2.day(dateString, { width: "short", context: "formatting" }) || match2.day(dateString, { width: "narrow", context: "formatting" });
    }
  }
  validate(_date, value) {
    return value >= 0 && value <= 6;
  }
  set(date, _flags, value, options) {
    date = setDay(date, value, options);
    date.setHours(0, 0, 0, 0);
    return date;
  }
  incompatibleTokens = [
    "y",
    "R",
    "u",
    "q",
    "Q",
    "M",
    "L",
    "I",
    "d",
    "D",
    "E",
    "i",
    "c",
    "t",
    "T"
  ];
}
class StandAloneLocalDayParser extends Parser {
  priority = 90;
  parse(dateString, token, match2, options) {
    const valueCallback = (value) => {
      const wholeWeekDays = Math.floor((value - 1) / 7) * 7;
      return (value + options.weekStartsOn + 6) % 7 + wholeWeekDays;
    };
    switch (token) {
      // 3
      case "c":
      case "cc":
        return mapValue(parseNDigits(token.length, dateString), valueCallback);
      // 3rd
      case "co":
        return mapValue(
          match2.ordinalNumber(dateString, {
            unit: "day"
          }),
          valueCallback
        );
      // Tue
      case "ccc":
        return match2.day(dateString, {
          width: "abbreviated",
          context: "standalone"
        }) || match2.day(dateString, { width: "short", context: "standalone" }) || match2.day(dateString, { width: "narrow", context: "standalone" });
      // T
      case "ccccc":
        return match2.day(dateString, {
          width: "narrow",
          context: "standalone"
        });
      // Tu
      case "cccccc":
        return match2.day(dateString, { width: "short", context: "standalone" }) || match2.day(dateString, { width: "narrow", context: "standalone" });
      // Tuesday
      case "cccc":
      default:
        return match2.day(dateString, { width: "wide", context: "standalone" }) || match2.day(dateString, {
          width: "abbreviated",
          context: "standalone"
        }) || match2.day(dateString, { width: "short", context: "standalone" }) || match2.day(dateString, { width: "narrow", context: "standalone" });
    }
  }
  validate(_date, value) {
    return value >= 0 && value <= 6;
  }
  set(date, _flags, value, options) {
    date = setDay(date, value, options);
    date.setHours(0, 0, 0, 0);
    return date;
  }
  incompatibleTokens = [
    "y",
    "R",
    "u",
    "q",
    "Q",
    "M",
    "L",
    "I",
    "d",
    "D",
    "E",
    "i",
    "e",
    "t",
    "T"
  ];
}
function getISODay(date, options) {
  const day = toDate(date, options?.in).getDay();
  return day === 0 ? 7 : day;
}
function setISODay(date, day, options) {
  const date_ = toDate(date, options?.in);
  const currentDay = getISODay(date_, options);
  const diff = day - currentDay;
  return addDays(date_, diff, options);
}
class ISODayParser extends Parser {
  priority = 90;
  parse(dateString, token, match2) {
    const valueCallback = (value) => {
      if (value === 0) {
        return 7;
      }
      return value;
    };
    switch (token) {
      // 2
      case "i":
      case "ii":
        return parseNDigits(token.length, dateString);
      // 2nd
      case "io":
        return match2.ordinalNumber(dateString, { unit: "day" });
      // Tue
      case "iii":
        return mapValue(
          match2.day(dateString, {
            width: "abbreviated",
            context: "formatting"
          }) || match2.day(dateString, {
            width: "short",
            context: "formatting"
          }) || match2.day(dateString, {
            width: "narrow",
            context: "formatting"
          }),
          valueCallback
        );
      // T
      case "iiiii":
        return mapValue(
          match2.day(dateString, {
            width: "narrow",
            context: "formatting"
          }),
          valueCallback
        );
      // Tu
      case "iiiiii":
        return mapValue(
          match2.day(dateString, {
            width: "short",
            context: "formatting"
          }) || match2.day(dateString, {
            width: "narrow",
            context: "formatting"
          }),
          valueCallback
        );
      // Tuesday
      case "iiii":
      default:
        return mapValue(
          match2.day(dateString, {
            width: "wide",
            context: "formatting"
          }) || match2.day(dateString, {
            width: "abbreviated",
            context: "formatting"
          }) || match2.day(dateString, {
            width: "short",
            context: "formatting"
          }) || match2.day(dateString, {
            width: "narrow",
            context: "formatting"
          }),
          valueCallback
        );
    }
  }
  validate(_date, value) {
    return value >= 1 && value <= 7;
  }
  set(date, _flags, value) {
    date = setISODay(date, value);
    date.setHours(0, 0, 0, 0);
    return date;
  }
  incompatibleTokens = [
    "y",
    "Y",
    "u",
    "q",
    "Q",
    "M",
    "L",
    "w",
    "d",
    "D",
    "E",
    "e",
    "c",
    "t",
    "T"
  ];
}
class AMPMParser extends Parser {
  priority = 80;
  parse(dateString, token, match2) {
    switch (token) {
      case "a":
      case "aa":
      case "aaa":
        return match2.dayPeriod(dateString, {
          width: "abbreviated",
          context: "formatting"
        }) || match2.dayPeriod(dateString, {
          width: "narrow",
          context: "formatting"
        });
      case "aaaaa":
        return match2.dayPeriod(dateString, {
          width: "narrow",
          context: "formatting"
        });
      case "aaaa":
      default:
        return match2.dayPeriod(dateString, {
          width: "wide",
          context: "formatting"
        }) || match2.dayPeriod(dateString, {
          width: "abbreviated",
          context: "formatting"
        }) || match2.dayPeriod(dateString, {
          width: "narrow",
          context: "formatting"
        });
    }
  }
  set(date, _flags, value) {
    date.setHours(dayPeriodEnumToHours(value), 0, 0, 0);
    return date;
  }
  incompatibleTokens = ["b", "B", "H", "k", "t", "T"];
}
class AMPMMidnightParser extends Parser {
  priority = 80;
  parse(dateString, token, match2) {
    switch (token) {
      case "b":
      case "bb":
      case "bbb":
        return match2.dayPeriod(dateString, {
          width: "abbreviated",
          context: "formatting"
        }) || match2.dayPeriod(dateString, {
          width: "narrow",
          context: "formatting"
        });
      case "bbbbb":
        return match2.dayPeriod(dateString, {
          width: "narrow",
          context: "formatting"
        });
      case "bbbb":
      default:
        return match2.dayPeriod(dateString, {
          width: "wide",
          context: "formatting"
        }) || match2.dayPeriod(dateString, {
          width: "abbreviated",
          context: "formatting"
        }) || match2.dayPeriod(dateString, {
          width: "narrow",
          context: "formatting"
        });
    }
  }
  set(date, _flags, value) {
    date.setHours(dayPeriodEnumToHours(value), 0, 0, 0);
    return date;
  }
  incompatibleTokens = ["a", "B", "H", "k", "t", "T"];
}
class DayPeriodParser extends Parser {
  priority = 80;
  parse(dateString, token, match2) {
    switch (token) {
      case "B":
      case "BB":
      case "BBB":
        return match2.dayPeriod(dateString, {
          width: "abbreviated",
          context: "formatting"
        }) || match2.dayPeriod(dateString, {
          width: "narrow",
          context: "formatting"
        });
      case "BBBBB":
        return match2.dayPeriod(dateString, {
          width: "narrow",
          context: "formatting"
        });
      case "BBBB":
      default:
        return match2.dayPeriod(dateString, {
          width: "wide",
          context: "formatting"
        }) || match2.dayPeriod(dateString, {
          width: "abbreviated",
          context: "formatting"
        }) || match2.dayPeriod(dateString, {
          width: "narrow",
          context: "formatting"
        });
    }
  }
  set(date, _flags, value) {
    date.setHours(dayPeriodEnumToHours(value), 0, 0, 0);
    return date;
  }
  incompatibleTokens = ["a", "b", "t", "T"];
}
class Hour1to12Parser extends Parser {
  priority = 70;
  parse(dateString, token, match2) {
    switch (token) {
      case "h":
        return parseNumericPattern(numericPatterns.hour12h, dateString);
      case "ho":
        return match2.ordinalNumber(dateString, { unit: "hour" });
      default:
        return parseNDigits(token.length, dateString);
    }
  }
  validate(_date, value) {
    return value >= 1 && value <= 12;
  }
  set(date, _flags, value) {
    const isPM = date.getHours() >= 12;
    if (isPM && value < 12) {
      date.setHours(value + 12, 0, 0, 0);
    } else if (!isPM && value === 12) {
      date.setHours(0, 0, 0, 0);
    } else {
      date.setHours(value, 0, 0, 0);
    }
    return date;
  }
  incompatibleTokens = ["H", "K", "k", "t", "T"];
}
class Hour0to23Parser extends Parser {
  priority = 70;
  parse(dateString, token, match2) {
    switch (token) {
      case "H":
        return parseNumericPattern(numericPatterns.hour23h, dateString);
      case "Ho":
        return match2.ordinalNumber(dateString, { unit: "hour" });
      default:
        return parseNDigits(token.length, dateString);
    }
  }
  validate(_date, value) {
    return value >= 0 && value <= 23;
  }
  set(date, _flags, value) {
    date.setHours(value, 0, 0, 0);
    return date;
  }
  incompatibleTokens = ["a", "b", "h", "K", "k", "t", "T"];
}
class Hour0To11Parser extends Parser {
  priority = 70;
  parse(dateString, token, match2) {
    switch (token) {
      case "K":
        return parseNumericPattern(numericPatterns.hour11h, dateString);
      case "Ko":
        return match2.ordinalNumber(dateString, { unit: "hour" });
      default:
        return parseNDigits(token.length, dateString);
    }
  }
  validate(_date, value) {
    return value >= 0 && value <= 11;
  }
  set(date, _flags, value) {
    const isPM = date.getHours() >= 12;
    if (isPM && value < 12) {
      date.setHours(value + 12, 0, 0, 0);
    } else {
      date.setHours(value, 0, 0, 0);
    }
    return date;
  }
  incompatibleTokens = ["h", "H", "k", "t", "T"];
}
class Hour1To24Parser extends Parser {
  priority = 70;
  parse(dateString, token, match2) {
    switch (token) {
      case "k":
        return parseNumericPattern(numericPatterns.hour24h, dateString);
      case "ko":
        return match2.ordinalNumber(dateString, { unit: "hour" });
      default:
        return parseNDigits(token.length, dateString);
    }
  }
  validate(_date, value) {
    return value >= 1 && value <= 24;
  }
  set(date, _flags, value) {
    const hours = value <= 24 ? value % 24 : value;
    date.setHours(hours, 0, 0, 0);
    return date;
  }
  incompatibleTokens = ["a", "b", "h", "H", "K", "t", "T"];
}
class MinuteParser extends Parser {
  priority = 60;
  parse(dateString, token, match2) {
    switch (token) {
      case "m":
        return parseNumericPattern(numericPatterns.minute, dateString);
      case "mo":
        return match2.ordinalNumber(dateString, { unit: "minute" });
      default:
        return parseNDigits(token.length, dateString);
    }
  }
  validate(_date, value) {
    return value >= 0 && value <= 59;
  }
  set(date, _flags, value) {
    date.setMinutes(value, 0, 0);
    return date;
  }
  incompatibleTokens = ["t", "T"];
}
class SecondParser extends Parser {
  priority = 50;
  parse(dateString, token, match2) {
    switch (token) {
      case "s":
        return parseNumericPattern(numericPatterns.second, dateString);
      case "so":
        return match2.ordinalNumber(dateString, { unit: "second" });
      default:
        return parseNDigits(token.length, dateString);
    }
  }
  validate(_date, value) {
    return value >= 0 && value <= 59;
  }
  set(date, _flags, value) {
    date.setSeconds(value, 0);
    return date;
  }
  incompatibleTokens = ["t", "T"];
}
class FractionOfSecondParser extends Parser {
  priority = 30;
  parse(dateString, token) {
    const valueCallback = (value) => Math.trunc(value * Math.pow(10, -token.length + 3));
    return mapValue(parseNDigits(token.length, dateString), valueCallback);
  }
  set(date, _flags, value) {
    date.setMilliseconds(value);
    return date;
  }
  incompatibleTokens = ["t", "T"];
}
class ISOTimezoneWithZParser extends Parser {
  priority = 10;
  parse(dateString, token) {
    switch (token) {
      case "X":
        return parseTimezonePattern(
          timezonePatterns.basicOptionalMinutes,
          dateString
        );
      case "XX":
        return parseTimezonePattern(timezonePatterns.basic, dateString);
      case "XXXX":
        return parseTimezonePattern(
          timezonePatterns.basicOptionalSeconds,
          dateString
        );
      case "XXXXX":
        return parseTimezonePattern(
          timezonePatterns.extendedOptionalSeconds,
          dateString
        );
      case "XXX":
      default:
        return parseTimezonePattern(timezonePatterns.extended, dateString);
    }
  }
  set(date, flags, value) {
    if (flags.timestampIsSet) return date;
    return constructFrom(
      date,
      date.getTime() - getTimezoneOffsetInMilliseconds(date) - value
    );
  }
  incompatibleTokens = ["t", "T", "x"];
}
class ISOTimezoneParser extends Parser {
  priority = 10;
  parse(dateString, token) {
    switch (token) {
      case "x":
        return parseTimezonePattern(
          timezonePatterns.basicOptionalMinutes,
          dateString
        );
      case "xx":
        return parseTimezonePattern(timezonePatterns.basic, dateString);
      case "xxxx":
        return parseTimezonePattern(
          timezonePatterns.basicOptionalSeconds,
          dateString
        );
      case "xxxxx":
        return parseTimezonePattern(
          timezonePatterns.extendedOptionalSeconds,
          dateString
        );
      case "xxx":
      default:
        return parseTimezonePattern(timezonePatterns.extended, dateString);
    }
  }
  set(date, flags, value) {
    if (flags.timestampIsSet) return date;
    return constructFrom(
      date,
      date.getTime() - getTimezoneOffsetInMilliseconds(date) - value
    );
  }
  incompatibleTokens = ["t", "T", "X"];
}
class TimestampSecondsParser extends Parser {
  priority = 40;
  parse(dateString) {
    return parseAnyDigitsSigned(dateString);
  }
  set(date, _flags, value) {
    return [constructFrom(date, value * 1e3), { timestampIsSet: true }];
  }
  incompatibleTokens = "*";
}
class TimestampMillisecondsParser extends Parser {
  priority = 20;
  parse(dateString) {
    return parseAnyDigitsSigned(dateString);
  }
  set(date, _flags, value) {
    return [constructFrom(date, value), { timestampIsSet: true }];
  }
  incompatibleTokens = "*";
}
const parsers = {
  G: new EraParser(),
  y: new YearParser(),
  Y: new LocalWeekYearParser(),
  R: new ISOWeekYearParser(),
  u: new ExtendedYearParser(),
  Q: new QuarterParser(),
  q: new StandAloneQuarterParser(),
  M: new MonthParser(),
  L: new StandAloneMonthParser(),
  w: new LocalWeekParser(),
  I: new ISOWeekParser(),
  d: new DateParser(),
  D: new DayOfYearParser(),
  E: new DayParser(),
  e: new LocalDayParser(),
  c: new StandAloneLocalDayParser(),
  i: new ISODayParser(),
  a: new AMPMParser(),
  b: new AMPMMidnightParser(),
  B: new DayPeriodParser(),
  h: new Hour1to12Parser(),
  H: new Hour0to23Parser(),
  K: new Hour0To11Parser(),
  k: new Hour1To24Parser(),
  m: new MinuteParser(),
  s: new SecondParser(),
  S: new FractionOfSecondParser(),
  X: new ISOTimezoneWithZParser(),
  x: new ISOTimezoneParser(),
  t: new TimestampSecondsParser(),
  T: new TimestampMillisecondsParser()
};
const formattingTokensRegExp = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g;
const longFormattingTokensRegExp = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g;
const escapedStringRegExp = /^'([^]*?)'?$/;
const doubleQuoteRegExp = /''/g;
const notWhitespaceRegExp = /\S/;
const unescapedLatinCharacterRegExp = /[a-zA-Z]/;
function parse(dateStr, formatStr, referenceDate, options) {
  const invalidDate = () => constructFrom(referenceDate, NaN);
  const defaultOptions2 = getDefaultOptions();
  const locale = defaultOptions2.locale ?? enUS;
  const firstWeekContainsDate = defaultOptions2.firstWeekContainsDate ?? defaultOptions2.locale?.options?.firstWeekContainsDate ?? 1;
  const weekStartsOn = defaultOptions2.weekStartsOn ?? defaultOptions2.locale?.options?.weekStartsOn ?? 0;
  if (!formatStr)
    return dateStr ? invalidDate() : toDate(referenceDate, options?.in);
  const subFnOptions = {
    firstWeekContainsDate,
    weekStartsOn,
    locale
  };
  const setters = [new DateTimezoneSetter(options?.in, referenceDate)];
  const tokens = formatStr.match(longFormattingTokensRegExp).map((substring) => {
    const firstCharacter = substring[0];
    if (firstCharacter in longFormatters) {
      const longFormatter = longFormatters[firstCharacter];
      return longFormatter(substring, locale.formatLong);
    }
    return substring;
  }).join("").match(formattingTokensRegExp);
  const usedTokens = [];
  for (let token of tokens) {
    if (isProtectedWeekYearToken(token)) {
      warnOrThrowProtectedError(token, formatStr, dateStr);
    }
    if (isProtectedDayOfYearToken(token)) {
      warnOrThrowProtectedError(token, formatStr, dateStr);
    }
    const firstCharacter = token[0];
    const parser = parsers[firstCharacter];
    if (parser) {
      const { incompatibleTokens } = parser;
      if (Array.isArray(incompatibleTokens)) {
        const incompatibleToken = usedTokens.find(
          (usedToken) => incompatibleTokens.includes(usedToken.token) || usedToken.token === firstCharacter
        );
        if (incompatibleToken) {
          throw new RangeError(
            `The format string mustn't contain \`${incompatibleToken.fullToken}\` and \`${token}\` at the same time`
          );
        }
      } else if (parser.incompatibleTokens === "*" && usedTokens.length > 0) {
        throw new RangeError(
          `The format string mustn't contain \`${token}\` and any other token at the same time`
        );
      }
      usedTokens.push({ token: firstCharacter, fullToken: token });
      const parseResult = parser.run(
        dateStr,
        token,
        locale.match,
        subFnOptions
      );
      if (!parseResult) {
        return invalidDate();
      }
      setters.push(parseResult.setter);
      dateStr = parseResult.rest;
    } else {
      if (firstCharacter.match(unescapedLatinCharacterRegExp)) {
        throw new RangeError(
          "Format string contains an unescaped latin alphabet character `" + firstCharacter + "`"
        );
      }
      if (token === "''") {
        token = "'";
      } else if (firstCharacter === "'") {
        token = cleanEscapedString(token);
      }
      if (dateStr.indexOf(token) === 0) {
        dateStr = dateStr.slice(token.length);
      } else {
        return invalidDate();
      }
    }
  }
  if (dateStr.length > 0 && notWhitespaceRegExp.test(dateStr)) {
    return invalidDate();
  }
  const uniquePrioritySetters = setters.map((setter) => setter.priority).sort((a, b) => b - a).filter((priority, index, array) => array.indexOf(priority) === index).map(
    (priority) => setters.filter((setter) => setter.priority === priority).sort((a, b) => b.subPriority - a.subPriority)
  ).map((setterArray) => setterArray[0]);
  let date = toDate(referenceDate, options?.in);
  if (isNaN(+date)) return invalidDate();
  const flags = {};
  for (const setter of uniquePrioritySetters) {
    if (!setter.validate(date, subFnOptions)) {
      return invalidDate();
    }
    const result = setter.set(date, flags, subFnOptions);
    if (Array.isArray(result)) {
      date = result[0];
      Object.assign(flags, result[1]);
    } else {
      date = result;
    }
  }
  return date;
}
function cleanEscapedString(input) {
  return input.match(escapedStringRegExp)[1].replace(doubleQuoteRegExp, "'");
}
window.Vaadin.Flow.datepickerConnector = {};
window.Vaadin.Flow.datepickerConnector.initLazy = (datepicker) => {
  if (datepicker.$connector) {
    return;
  }
  datepicker.$connector = {};
  const createLocaleBasedDateFormat = function(locale) {
    try {
      (/* @__PURE__ */ new Date()).toLocaleDateString(locale);
    } catch (e) {
      console.warn("The locale is not supported, using default format setting (ISO 8601).");
      return "yyyy-MM-dd";
    }
    const testDate = new Date(Date.UTC(1234, 4, 6));
    let pattern = testDate.toLocaleDateString(locale, { timeZone: "UTC" });
    pattern = pattern.replace(/([a-zA-Z]+)/g, "'$1'").replace("06", "dd").replace("6", "d").replace("05", "MM").replace("5", "M").replace("1234", "yyyy");
    const isValidPattern = pattern.includes("d") && pattern.includes("M") && pattern.includes("y");
    if (!isValidPattern) {
      console.warn("The locale is not supported, using default format setting (ISO 8601).");
      return "yyyy-MM-dd";
    }
    return pattern;
  };
  function createFormatterAndParser(formats) {
    if (!formats || formats.length === 0) {
      throw new Error("Array of custom date formats is null or empty");
    }
    function getShortYearFormat(format2) {
      if (format2.includes("yyyy") && !format2.includes("yyyyy")) {
        return format2.replace("yyyy", "yy");
      }
      if (format2.includes("YYYY") && !format2.includes("YYYYY")) {
        return format2.replace("YYYY", "YY");
      }
      return void 0;
    }
    function isFormatWithYear(format2) {
      return format2.includes("y") || format2.includes("Y");
    }
    function isShortYearFormat(format2) {
      return !format2.includes("yyyy") && !format2.includes("YYYY");
    }
    function getExtendedFormats(formats2) {
      return formats2.reduce((acc, format2) => {
        if (isFormatWithYear(format2) && !isShortYearFormat(format2)) {
          acc.push(getShortYearFormat(format2));
        }
        acc.push(format2);
        return acc;
      }, []);
    }
    function correctFullYear(date) {
      if (datepicker.$connector._lastParseStatus === "error") {
        return;
      }
      if (datepicker.$connector._lastParseStatus === "successful") {
        if (datepicker.$connector._lastParsedDate.day === date.getDate() && datepicker.$connector._lastParsedDate.month === date.getMonth() && datepicker.$connector._lastParsedDate.year % 100 === date.getFullYear() % 100) {
          date.setFullYear(datepicker.$connector._lastParsedDate.year);
        }
        return;
      }
      const currentValue = parseDate(datepicker.value);
      if (isValid(currentValue) && currentValue.getDate() === date.getDate() && currentValue.getMonth() === date.getMonth() && currentValue.getFullYear() % 100 === date.getFullYear() % 100) {
        date.setFullYear(currentValue.getFullYear());
      }
    }
    function formatDate(dateParts) {
      const format$1 = formats[0];
      const date = parseDate(`${dateParts.year}-${dateParts.month + 1}-${dateParts.day}`);
      return format(date, format$1);
    }
    function doParseDate(dateString, format2, referenceDate) {
      const refDate = isFormatWithYear(format2) ? referenceDate : /* @__PURE__ */ new Date();
      const date = parse(dateString, format2, refDate);
      if (isValid(date)) {
        if (isFormatWithYear(format2) && isShortYearFormat(format2)) {
          correctFullYear(date);
        }
        return {
          day: date.getDate(),
          month: date.getMonth(),
          year: date.getFullYear()
        };
      }
    }
    function parseDate$1(dateString) {
      const referenceDate = _getReferenceDate();
      for (let format2 of getExtendedFormats(formats)) {
        const parsedDate = doParseDate(dateString, format2, referenceDate);
        if (parsedDate) {
          datepicker.$connector._lastParseStatus = "successful";
          datepicker.$connector._lastParsedDate = parsedDate;
          return parsedDate;
        }
      }
      datepicker.$connector._lastParseStatus = "error";
      return false;
    }
    return {
      formatDate,
      parseDate: parseDate$1
    };
  }
  function _getReferenceDate() {
    const { referenceDate } = datepicker.i18n;
    return referenceDate ? new Date(referenceDate.year, referenceDate.month, referenceDate.day) : /* @__PURE__ */ new Date();
  }
  datepicker.$connector.updateI18n = (locale, i18n) => {
    const hasCustomFormats = i18n && i18n.dateFormats && i18n.dateFormats.length > 0;
    if (i18n && i18n.referenceDate) {
      i18n.referenceDate = extractDateParts(new Date(i18n.referenceDate));
    }
    const usedFormats = hasCustomFormats ? i18n.dateFormats : [createLocaleBasedDateFormat(locale)];
    const formatterAndParser = createFormatterAndParser(usedFormats);
    datepicker.i18n = Object.assign({}, i18n, formatterAndParser);
  };
  datepicker.addEventListener("opened-changed", () => datepicker.$connector._lastParseStatus = void 0);
};
/**
 * @license
 * Copyright (c) 2018 - 2026 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
class TimePickerItem extends ComboBoxItemMixin(
  ThemableMixin(DirMixin(PolylitMixin(LumoInjectionMixin(LitElement))))
) {
  static get is() {
    return "vaadin-time-picker-item";
  }
  static get styles() {
    return [itemStyles, comboBoxItemStyles];
  }
  /** @protected */
  render() {
    return html`
      <span part="checkmark" aria-hidden="true"></span>
      <div part="content">
        <slot></slot>
      </div>
    `;
  }
}
defineCustomElement(TimePickerItem);
/**
 * @license
 * Copyright (c) 2018 - 2026 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const timePickerOverlayStyles = css`
  :host {
    --vaadin-item-checkmark-display: block;
  }

  #overlay {
    width: var(--vaadin-time-picker-overlay-width, var(--_vaadin-time-picker-overlay-default-width, auto));
  }

  [part='content'] {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
`;
/**
 * @license
 * Copyright (c) 2018 - 2026 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
class TimePickerOverlay extends ComboBoxOverlayMixin(
  OverlayMixin(DirMixin(ThemableMixin(PolylitMixin(LumoInjectionMixin(LitElement)))))
) {
  static get is() {
    return "vaadin-time-picker-overlay";
  }
  static get styles() {
    return [overlayStyles, timePickerOverlayStyles];
  }
  /** @protected */
  render() {
    return html`
      <div part="overlay" id="overlay">
        <div part="content" id="content">
          <slot></slot>
        </div>
      </div>
    `;
  }
}
defineCustomElement(TimePickerOverlay);
/**
 * @license
 * Copyright (c) 2018 - 2026 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
class TimePickerScroller extends ComboBoxScrollerMixin(PolylitMixin(LitElement)) {
  static get is() {
    return "vaadin-time-picker-scroller";
  }
  static get styles() {
    return comboBoxScrollerStyles;
  }
  /** @protected */
  render() {
    return html`
      <div id="selector">
        <slot></slot>
      </div>
    `;
  }
}
defineCustomElement(TimePickerScroller);
/**
 * @license
 * Copyright (c) 2018 - 2026 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const timePickerStyles = css`
  :host([opened]) {
    pointer-events: auto;
  }

  [part~='toggle-button']::before {
    mask-image: var(--_vaadin-icon-clock);
  }

  :host([readonly]) [part~='toggle-button'] {
    display: none;
  }

  /* See https://github.com/vaadin/vaadin-time-picker/issues/145 */
  :host([dir='rtl']) [part='input-field'] {
    direction: ltr;
  }

  :host([dir='rtl']) [part='input-field'] ::slotted(input)::placeholder {
    direction: rtl;
    text-align: left;
  }
`;
/**
 * @license
 * Copyright (c) 2018 - 2026 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
function formatISOTime(time) {
  if (!time) {
    return "";
  }
  const pad = (num = 0, fmt = "00") => (fmt + num).substr((fmt + num).length - fmt.length);
  let timeString = `${pad(time.hours)}:${pad(time.minutes)}`;
  if (time.seconds !== void 0) {
    timeString += `:${pad(time.seconds)}`;
  }
  if (time.milliseconds !== void 0) {
    timeString += `.${pad(time.milliseconds, "000")}`;
  }
  return timeString;
}
const MATCH_HOURS = "(\\d|[0-1]\\d|2[0-3])";
const MATCH_MINUTES = "(\\d|[0-5]\\d)";
const MATCH_SECONDS = MATCH_MINUTES;
const MATCH_MILLISECONDS = "(\\d{1,3})";
const re = new RegExp(`^${MATCH_HOURS}(?::${MATCH_MINUTES}(?::${MATCH_SECONDS}(?:\\.${MATCH_MILLISECONDS})?)?)?$`, "u");
function parseISOTime(timeString) {
  const parts = re.exec(timeString);
  if (parts) {
    if (parts[4]) {
      while (parts[4].length < 3) {
        parts[4] += "0";
      }
    }
    return { hours: parts[1], minutes: parts[2], seconds: parts[3], milliseconds: parts[4] };
  }
}
function getStepSegment(stepValue) {
  const step = stepValue == null ? 60 : parseFloat(stepValue);
  if (step % 3600 === 0) {
    return 1;
  } else if (step % 60 === 0 || !step) {
    return 2;
  } else if (step % 1 === 0) {
    return 3;
  } else if (step < 1) {
    return 4;
  }
}
function validateTime(timeObject, step) {
  if (timeObject) {
    const stepSegment = getStepSegment(step);
    timeObject.hours = parseInt(timeObject.hours);
    timeObject.minutes = parseInt(timeObject.minutes || 0);
    timeObject.seconds = stepSegment < 3 ? void 0 : parseInt(timeObject.seconds || 0);
    timeObject.milliseconds = stepSegment < 4 ? void 0 : parseInt(timeObject.milliseconds || 0);
  }
  return timeObject;
}
/**
 * @license
 * Copyright (c) 2018 - 2026 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const timePickerI18nDefaults = Object.freeze({
  formatTime: formatISOTime,
  parseTime: parseISOTime
});
const MIN_ALLOWED_TIME = "00:00:00.000";
const MAX_ALLOWED_TIME = "23:59:59.999";
const TimePickerMixin = (superClass) => class TimePickerMixinClass extends I18nMixin(
  timePickerI18nDefaults,
  PatternMixin(ComboBoxBaseMixin(InputControlMixin(superClass)))
) {
  static get properties() {
    return {
      /**
       * The time value for this element.
       *
       * Supported time formats are in ISO 8601:
       * - `hh:mm` (default)
       * - `hh:mm:ss`
       * - `hh:mm:ss.fff`
       */
      value: {
        type: String,
        notify: true,
        value: "",
        sync: true
      },
      /**
       * Minimum time allowed.
       *
       * Supported time formats are in ISO 8601:
       * - `hh:mm`
       * - `hh:mm:ss`
       * - `hh:mm:ss.fff`
       */
      min: {
        type: String,
        value: "",
        sync: true
      },
      /**
       * Maximum time allowed.
       *
       * Supported time formats are in ISO 8601:
       * - `hh:mm`
       * - `hh:mm:ss`
       * - `hh:mm:ss.fff`
       */
      max: {
        type: String,
        value: "",
        sync: true
      },
      /**
       * Defines the time interval (in seconds) between the items displayed
       * in the time selection box. The default is 1 hour (i.e. `3600`).
       *
       * It also configures the precision of the value string. By default
       * the component formats values as `hh:mm` but setting a step value
       * lower than one minute or one second, format resolution changes to
       * `hh:mm:ss` and `hh:mm:ss.fff` respectively.
       *
       * Unit must be set in seconds, and for correctly configuring intervals
       * in the dropdown, it need to evenly divide a day.
       *
       * Note: it is possible to define step that is dividing an hour in inexact
       * fragments (i.e. 5760 seconds which equals 1 hour 36 minutes), but it is
       * not recommended to use it for better UX experience.
       */
      step: {
        type: Number,
        sync: true
      },
      /** @private */
      _comboBoxValue: {
        type: String,
        sync: true,
        observer: "__comboBoxValueChanged"
      },
      /** @private */
      _inputContainer: {
        type: Object
      }
    };
  }
  static get observers() {
    return [
      "_openedOrItemsChanged(opened, _dropdownItems)",
      "_updateScroller(opened, _dropdownItems, _focusedIndex, _theme)",
      "__updateAriaAttributes(_dropdownItems, opened, inputElement)",
      "__updateDropdownItems(__effectiveI18n, min, max, step)"
    ];
  }
  static get constraints() {
    return [...super.constraints, "min", "max"];
  }
  /**
   * Tag name prefix used by `ComboBoxBaseMixin` for scroller and items.
   * @protected
   * @return {string}
   */
  get _tagNamePrefix() {
    return "vaadin-time-picker";
  }
  /**
   * Used by `ClearButtonMixin` as a reference to the clear button element.
   * @protected
   * @return {!HTMLElement}
   */
  get clearElement() {
    return this.$.clearButton;
  }
  /**
   * The object used to localize this component. To change the default
   * localization, replace this with an object that provides both the
   * time parsing and formatting functions.
   *
   * The object has the following JSON structure:
   *
   * ```js
   * {
   *   // A function to format given `Object` as
   *   // time string. Object is in the format `{ hours: ..., minutes: ..., seconds: ..., milliseconds: ... }`
   *   formatTime: (time) => {
   *     // returns a string representation of the given
   *     // object in `hh` / 'hh:mm' / 'hh:mm:ss' / 'hh:mm:ss.fff' - formats
   *   },
   *
   *   // A function to parse the given text to an `Object` in the format
   *   // `{ hours: ..., minutes: ..., seconds: ..., milliseconds: ... }`.
   *   // Must properly parse (at least) text
   *   // formatted by `formatTime`.
   *   parseTime: text => {
   *     // Parses a string in object/string that can be formatted by`formatTime`.
   *   }
   * }
   * ```
   *
   * NOTE: `formatTime` and `parseTime` must be implemented in a
   * compatible manner to ensure the component works properly.
   *
   * @type {!TimePickerI18n}
   */
  get i18n() {
    return super.i18n;
  }
  set i18n(value) {
    super.i18n = value;
  }
  /**
   * The input element's value when it cannot be parsed as a time, and an empty string otherwise.
   *
   * @private
   * @return {string}
   */
  get __unparsableValue() {
    if (this._inputElementValue && !this.__effectiveI18n.parseTime(this._inputElementValue)) {
      return this._inputElementValue;
    }
    return "";
  }
  /** @protected */
  ready() {
    super.ready();
    this.addController(
      new InputController(
        this,
        (input) => {
          this._setInputElement(input);
          this._setFocusElement(input);
          this.stateTarget = input;
          this.ariaTarget = input;
        },
        {
          // The "search" word is a trick to prevent Safari from enabling AutoFill,
          // which is causing click issues:
          // https://github.com/vaadin/web-components/issues/6817#issuecomment-2268229567
          uniqueIdPrefix: "search-input"
        }
      )
    );
    this.addController(new LabelledInputController(this.inputElement, this._labelController));
    this._inputContainer = this.shadowRoot.querySelector('[part~="input-field"]');
    this._toggleElement = this.$.toggleButton;
    this._tooltipController = new TooltipController(this);
    this._tooltipController.setShouldShow((timePicker) => !timePicker.opened);
    this._tooltipController.setPosition("top");
    this._tooltipController.setAriaTarget(this.inputElement);
    this.addController(this._tooltipController);
  }
  /** @protected */
  updated(props) {
    super.updated(props);
    if (props.has("_comboBoxValue") && this._dropdownItems) {
      this._scroller.selectedItem = this._dropdownItems.find((item) => item.value === this._comboBoxValue);
    }
  }
  /**
   * Returns true if the current input value satisfies all constraints (if any).
   * You can override this method for custom validations.
   *
   * @return {boolean} True if the value is valid
   */
  checkValidity() {
    return !!(this.inputElement.checkValidity() && (!this.value || this._timeAllowed(this.__effectiveI18n.parseTime(this.value))) && (!this._comboBoxValue || this.__effectiveI18n.parseTime(this._comboBoxValue)));
  }
  /**
   * Override method from `ComboBoxBaseMixin` to handle item label path.
   * @protected
   * @override
   */
  _getItemLabel(item) {
    return item ? item.label : "";
  }
  /** @private */
  _updateScroller(opened, items, focusedIndex, theme) {
    if (opened) {
      this._scroller.style.maxHeight = getComputedStyle(this).getPropertyValue(`--${this._tagNamePrefix}-overlay-max-height`) || "65vh";
    }
    this._scroller.setProperties({
      items: opened ? items : [],
      opened,
      focusedIndex,
      theme
    });
  }
  /** @private */
  _openedOrItemsChanged(opened, items) {
    this._overlayOpened = opened && !!(items && items.length);
  }
  /**
   * Override method from `ComboBoxBaseMixin` to commit value on overlay closing.
   * @protected
   * @override
   */
  _onClosed() {
    this._commitValue();
  }
  /**
   * Override method from `ComboBoxBaseMixin` to handle Escape pres..
   * @protected
   * @override
   */
  _onEscapeCancel() {
    this._inputElementValue = this._comboBoxValue;
    this._closeOrCommit();
  }
  /**
   * Override method from `ComboBoxBaseMixin` to implement clearing logic.
   * @protected
   * @override
   */
  _onClearAction() {
    this._comboBoxValue = "";
    this._inputElementValue = "";
    this.__commitValueChange();
  }
  /**
   * Override method from `ComboBoxBaseMixin` to implement value commit logic.
   * @protected
   * @override
   */
  _commitValue() {
    if (this._focusedIndex > -1) {
      const focusedItem = this._dropdownItems[this._focusedIndex];
      const itemValue = this._getItemLabel(focusedItem);
      this._inputElementValue = itemValue;
      this._comboBoxValue = itemValue;
      this._focusedIndex = -1;
    } else if (this._inputElementValue === "" || this._inputElementValue === void 0) {
      this._comboBoxValue = "";
    } else {
      this._comboBoxValue = this._inputElementValue;
    }
    this.__commitValueChange();
    this._clearSelectionRange();
  }
  /**
   * Override method from `ComboBoxBaseMixin` to handle loading.
   * @protected
   * @override
   */
  _closeOrCommit() {
    if (!this.opened) {
      this._commitValue();
    } else {
      this.close();
    }
  }
  /**
   * Override method from `ComboBoxBaseMixin` to handle reverting value.
   * @protected
   * @override
   */
  _revertInputValue() {
    this._inputElementValue = this._comboBoxValue;
    this._clearSelectionRange();
  }
  /**
   * @param {boolean} focused
   * @override
   * @protected
   */
  _setFocused(focused) {
    super._setFocused(focused);
    if (!focused) {
      if (document.hasFocus()) {
        this._requestValidation();
      }
    }
  }
  /** @private */
  __validDayDivisor(step) {
    return !step || 24 * 3600 % step === 0 || step < 1 && step % 1 * 1e3 % 1 === 0;
  }
  /**
   * Override an event listener from `KeyboardMixin`.
   * @param {!KeyboardEvent} e
   * @protected
   */
  _onKeyDown(e) {
    super._onKeyDown(e);
    if (this.readonly || this.disabled || this._dropdownItems.length) {
      return;
    }
    const stepResolution = this.__validDayDivisor(this.step) && this.step || 60;
    if (e.keyCode === 40) {
      this.__onArrowPressWithStep(-stepResolution);
    } else if (e.keyCode === 38) {
      this.__onArrowPressWithStep(stepResolution);
    }
  }
  /** @private */
  __onArrowPressWithStep(step) {
    const objWithStep = this.__addStep(this.__getMsec(this.__memoValue), step, true);
    this.__memoValue = objWithStep;
    this.__useMemo = true;
    this._comboBoxValue = this.__effectiveI18n.formatTime(objWithStep);
    this.__useMemo = false;
    this.__commitValueChange();
  }
  /**
   * Depending on the nature of the value change that has occurred since
   * the last commit attempt, triggers validation and fires an event:
   *
   * Value change             | Event
   * -------------------------|-------------------
   * empty => parsable        | change
   * empty => unparsable      | unparsable-change
   * parsable => empty        | change
   * parsable => parsable     | change
   * parsable => unparsable   | change
   * unparsable => empty      | unparsable-change
   * unparsable => parsable   | change
   * unparsable => unparsable | unparsable-change
   *
   * @private
   */
  __commitValueChange() {
    const unparsableValue = this.__unparsableValue;
    if (this.__committedValue !== this.value) {
      this._requestValidation();
      this.dispatchEvent(new CustomEvent("change", { bubbles: true }));
    } else if (this.__committedUnparsableValue !== unparsableValue) {
      this._requestValidation();
      this.dispatchEvent(new CustomEvent("unparsable-change"));
    }
    this.__committedValue = this.value;
    this.__committedUnparsableValue = unparsableValue;
  }
  /**
   * Returning milliseconds from Object in the format `{ hours: ..., minutes: ..., seconds: ..., milliseconds: ... }`
   * @private
   */
  __getMsec(obj) {
    let result = (obj && obj.hours || 0) * 60 * 60 * 1e3;
    result += (obj && obj.minutes || 0) * 60 * 1e3;
    result += (obj && obj.seconds || 0) * 1e3;
    result += obj && parseInt(obj.milliseconds) || 0;
    return result;
  }
  /**
   * Returning seconds from Object in the format `{ hours: ..., minutes: ..., seconds: ..., milliseconds: ... }`
   * @private
   */
  __getSec(obj) {
    let result = (obj && obj.hours || 0) * 60 * 60;
    result += (obj && obj.minutes || 0) * 60;
    result += obj && obj.seconds || 0;
    result += obj && obj.milliseconds / 1e3 || 0;
    return result;
  }
  /**
   * Returning Object in the format `{ hours: ..., minutes: ..., seconds: ..., milliseconds: ... }`
   * from the result of adding step value in milliseconds to the milliseconds amount.
   * With `precision` parameter rounding the value to the closest step valid interval.
   * @private
   */
  __addStep(msec, step, precision) {
    if (msec === 0 && step < 0) {
      msec = 24 * 60 * 60 * 1e3;
    }
    const stepMsec = step * 1e3;
    const diffToNext = msec % stepMsec;
    if (stepMsec < 0 && diffToNext && precision) {
      msec -= diffToNext;
    } else if (stepMsec > 0 && diffToNext && precision) {
      msec -= diffToNext - stepMsec;
    } else {
      msec += stepMsec;
    }
    const hh = Math.floor(msec / 1e3 / 60 / 60);
    msec -= hh * 1e3 * 60 * 60;
    const mm = Math.floor(msec / 1e3 / 60);
    msec -= mm * 1e3 * 60;
    const ss = Math.floor(msec / 1e3);
    msec -= ss * 1e3;
    return { hours: hh < 24 ? hh : 0, minutes: mm, seconds: ss, milliseconds: msec };
  }
  /** @private */
  __updateDropdownItems(effectiveI18n, min, max, step) {
    const minTimeObj = validateTime(parseISOTime(min || MIN_ALLOWED_TIME), step);
    const minSec = this.__getSec(minTimeObj);
    const maxTimeObj = validateTime(parseISOTime(max || MAX_ALLOWED_TIME), step);
    const maxSec = this.__getSec(maxTimeObj);
    this._dropdownItems = this.__generateDropdownList(minSec, maxSec, step);
    if (step !== this.__oldStep) {
      this.__oldStep = step;
      const parsedObj = validateTime(parseISOTime(this.value), step);
      this.__updateValue(parsedObj);
    }
    if (this.value) {
      this._comboBoxValue = effectiveI18n.formatTime(effectiveI18n.parseTime(this.value));
    }
  }
  /** @private */
  __updateAriaAttributes(items, opened, input) {
    if (items === void 0 || input === void 0) {
      return;
    }
    if (items.length === 0) {
      input.removeAttribute("role");
      input.removeAttribute("aria-expanded");
    } else {
      input.setAttribute("role", "combobox");
      input.setAttribute("aria-expanded", !!opened);
    }
  }
  /** @private */
  __generateDropdownList(minSec, maxSec, step) {
    if (step < 15 * 60 || !this.__validDayDivisor(step)) {
      return [];
    }
    const generatedList = [];
    if (!step) {
      step = 3600;
    }
    let time = -step + minSec;
    while (time + step >= minSec && time + step <= maxSec) {
      const timeObj = validateTime(this.__addStep(time * 1e3, step), step);
      time += step;
      const formatted = this.__effectiveI18n.formatTime(timeObj);
      generatedList.push({ label: formatted, value: formatted });
    }
    return generatedList;
  }
  /**
   * Override an observer from `InputMixin`.
   * @protected
   * @override
   */
  _valueChanged(value, oldValue) {
    const parsedObj = this.__memoValue = parseISOTime(value);
    const newValue = formatISOTime(parsedObj) || "";
    if (!this.__keepCommittedValue) {
      this.__committedValue = value;
      this.__committedUnparsableValue = "";
    }
    if (value !== "" && value !== null && !parsedObj) {
      this.value = oldValue === void 0 ? "" : oldValue;
    } else if (value !== newValue) {
      this.value = newValue;
    } else if (this.__keepInvalidInput) {
      delete this.__keepInvalidInput;
    } else {
      this.__updateInputValue(parsedObj);
    }
    this._toggleHasValue(this._hasValue);
  }
  /** @private */
  __comboBoxValueChanged(value, oldValue) {
    if (value === "" && oldValue === void 0) {
      return;
    }
    const parsedObj = this.__useMemo ? this.__memoValue : this.__effectiveI18n.parseTime(value);
    const newValue = this.__effectiveI18n.formatTime(parsedObj) || "";
    if (parsedObj) {
      if (value !== newValue) {
        this._comboBoxValue = newValue;
      } else {
        this.__keepCommittedValue = true;
        this.__updateValue(parsedObj);
        this.__keepCommittedValue = false;
      }
    } else {
      if (this.value !== "" && value !== "") {
        this.__keepInvalidInput = true;
      }
      this.__keepCommittedValue = true;
      this.value = "";
      this.__keepCommittedValue = false;
    }
  }
  /** @private */
  __updateValue(obj) {
    const timeString = formatISOTime(validateTime(obj, this.step)) || "";
    this.value = timeString;
    this.__updateInputValue(obj);
  }
  /** @private */
  __updateInputValue(obj) {
    const timeString = this.__effectiveI18n.formatTime(validateTime(obj, this.step)) || "";
    this._inputElementValue = timeString;
    this._comboBoxValue = timeString;
  }
  /**
   * Returns true if `time` satisfies the `min` and `max` constraints (if any).
   *
   * @param {!TimePickerTime} time Value to check against constraints
   * @return {boolean} True if `time` satisfies the constraints
   * @protected
   */
  _timeAllowed(time) {
    const parsedMin = this.__effectiveI18n.parseTime(this.min || MIN_ALLOWED_TIME);
    const parsedMax = this.__effectiveI18n.parseTime(this.max || MAX_ALLOWED_TIME);
    return (!this.__getMsec(parsedMin) || this.__getMsec(time) >= this.__getMsec(parsedMin)) && (!this.__getMsec(parsedMax) || this.__getMsec(time) <= this.__getMsec(parsedMax));
  }
  /**
   * Override method from `ComboBoxBaseMixin` to deselect
   * dropdown item by requesting content update on clear.
   * @param {Event} event
   * @protected
   */
  _onClearButtonClick(event) {
    event.stopPropagation();
    super._onClearButtonClick(event);
    if (this.opened) {
      this._scroller.requestContentUpdate();
    }
  }
  /**
   * @param {Event} event
   * @protected
   */
  _onHostClick(event) {
    const path = event.composedPath();
    if (path.includes(this._labelNode) || path.includes(this._inputContainer)) {
      super._onHostClick(event);
    }
  }
  /**
   * Override an event listener from `InputMixin`.
   * @param {!Event} event
   * @protected
   * @override
   */
  _onChange(event) {
    event.stopPropagation();
  }
  /**
   * Fired when the user commits a value change.
   *
   * @event change
   */
};
/**
 * @license
 * Copyright (c) 2018 - 2026 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
class TimePicker extends TimePickerMixin(ThemableMixin(ElementMixin(PolylitMixin(LumoInjectionMixin(LitElement))))) {
  static get is() {
    return "vaadin-time-picker";
  }
  static get styles() {
    return [inputFieldShared, timePickerStyles];
  }
  /** @protected */
  render() {
    return html`
      <div class="vaadin-time-picker-container">
        <div part="label">
          <slot name="label"></slot>
          <span part="required-indicator" aria-hidden="true" @click="${this.focus}"></span>
        </div>

        <vaadin-input-container
          part="input-field"
          .readonly="${this.readonly}"
          .disabled="${this.disabled}"
          .invalid="${this.invalid}"
          theme="${ifDefined(this._theme)}"
        >
          <slot name="prefix" slot="prefix"></slot>
          <slot name="input"></slot>
          <div id="clearButton" part="field-button clear-button" slot="suffix" aria-hidden="true"></div>
          <div id="toggleButton" part="field-button toggle-button" slot="suffix" aria-hidden="true"></div>
        </vaadin-input-container>

        <div part="helper-text">
          <slot name="helper"></slot>
        </div>

        <div part="error-message">
          <slot name="error-message"></slot>
        </div>

        <slot name="tooltip"></slot>
      </div>

      <vaadin-time-picker-overlay
        id="overlay"
        dir="ltr"
        .owner="${this}"
        .opened="${this._overlayOpened}"
        theme="${ifDefined(this._theme)}"
        .positionTarget="${this._inputContainer}"
        no-vertical-overlap
        exportparts="overlay, content"
      >
        <slot name="overlay"></slot>
      </vaadin-time-picker-overlay>
    `;
  }
}
defineCustomElement(TimePicker);
/**
 * @license
 * Copyright (c) 2019 - 2026 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const dateTimePickerStyles = css`
  .vaadin-date-time-picker-container {
    width: calc(var(--vaadin-field-default-width, 12em) * 2 + var(--vaadin-date-time-picker-gap, var(--vaadin-gap-s)));
  }

  [part='input-fields'] {
    display: flex;
    gap: var(--vaadin-date-time-picker-gap, var(--vaadin-gap-s));
  }

  [part='input-fields'] ::slotted([slot='date-picker']) {
    min-width: 0;
    flex: 1 1 auto;
  }

  [part='input-fields'] ::slotted([slot='time-picker']) {
    min-width: 0;
    flex: 1 1.65 auto;
  }
`;
/**
 * @license
 * Copyright (c) 2019 - 2026 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const datePickerI18nProps = Object.keys(datePickerI18nDefaults);
const timePickerI18nProps = Object.keys(timePickerI18nDefaults);
const DEFAULT_I18N$5 = { ...datePickerI18nDefaults, ...timePickerI18nDefaults };
class PickerSlotController extends SlotController {
  constructor(host, type) {
    super(host, `${type}-picker`, `vaadin-${type}-picker`, {
      initializer: (picker, host2) => {
        const prop = `__${type}Picker`;
        host2[prop] = picker;
      }
    });
  }
}
const DateTimePickerMixin = (superClass) => class DateTimePickerMixinClass extends I18nMixin(DEFAULT_I18N$5, FieldMixin(FocusMixin(DisabledMixin(superClass)))) {
  static get properties() {
    return {
      /**
       * The name of the control, which is submitted with the form data.
       */
      name: {
        type: String
      },
      /**
       * The value for this element.
       *
       * Supported date time format is based on ISO 8601 (without a time zone designator):
       * - Minute precision `"YYYY-MM-DDThh:mm"` (default)
       * - Second precision `"YYYY-MM-DDThh:mm:ss"`
       * - Millisecond precision `"YYYY-MM-DDThh:mm:ss.fff"`
       */
      value: {
        type: String,
        notify: true,
        value: "",
        observer: "__valueChanged",
        sync: true
      },
      /**
       * The earliest allowed value (date and time) that can be selected. All earlier values will be disabled.
       *
       * Supported date time format is based on ISO 8601 (without a time zone designator):
       * - Minute precision `"YYYY-MM-DDThh:mm"`
       * - Second precision `"YYYY-MM-DDThh:mm:ss"`
       * - Millisecond precision `"YYYY-MM-DDThh:mm:ss.fff"`
       */
      min: {
        type: String,
        observer: "__minChanged",
        sync: true
      },
      /**
       * The latest value (date and time) that can be selected. All later values will be disabled.
       *
       * Supported date time format is based on ISO 8601 (without a time zone designator):
       * - Minute precision `"YYYY-MM-DDThh:mm"`
       * - Second precision `"YYYY-MM-DDThh:mm:ss"`
       * - Millisecond precision `"YYYY-MM-DDThh:mm:ss.fff"`
       */
      max: {
        type: String,
        observer: "__maxChanged",
        sync: true
      },
      /**
       * The earliest value that can be selected. All earlier values will be disabled.
       * @private
       */
      __minDateTime: {
        type: Date,
        value: "",
        sync: true
      },
      /**
       * The latest value that can be selected. All later values will be disabled.
       * @private
       */
      __maxDateTime: {
        type: Date,
        value: "",
        sync: true
      },
      /**
       * A placeholder string for the date field.
       * @attr {string} date-placeholder
       */
      datePlaceholder: {
        type: String,
        sync: true
      },
      /**
       * A placeholder string for the time field.
       * @attr {string} time-placeholder
       */
      timePlaceholder: {
        type: String,
        sync: true
      },
      /**
       * Defines the time interval (in seconds) between the items displayed
       * in the time selection box. The default is 1 hour (i.e. `3600`).
       *
       * It also configures the precision of the time part of the value string. By default
       * the component formats time values as `hh:mm` but setting a step value
       * lower than one minute or one second, format resolution changes to
       * `hh:mm:ss` and `hh:mm:ss.fff` respectively.
       *
       * Unit must be set in seconds, and for correctly configuring intervals
       * in the dropdown, it need to evenly divide a day.
       *
       * Note: it is possible to define step that is dividing an hour in inexact
       * fragments (i.e. 5760 seconds which equals 1 hour 36 minutes), but it is
       * not recommended to use it for better UX.
       */
      step: {
        type: Number,
        sync: true
      },
      /**
       * Date which should be visible in the date picker overlay when there is no value selected.
       *
       * The same date formats as for the `value` property are supported but without the time part.
       * @attr {string} initial-position
       */
      initialPosition: {
        type: String,
        sync: true
      },
      /**
       * Set true to display ISO-8601 week numbers in the calendar. Notice that
       * displaying week numbers is only supported when `i18n.firstDayOfWeek`
       * is 1 (Monday).
       * @attr {boolean} show-week-numbers
       */
      showWeekNumbers: {
        type: Boolean,
        value: false,
        sync: true
      },
      /**
       * Set to true to prevent the overlays from opening automatically.
       * @attr {boolean} auto-open-disabled
       */
      autoOpenDisabled: {
        type: Boolean,
        sync: true
      },
      /**
       * Set to true to make this element read-only.
       */
      readonly: {
        type: Boolean,
        value: false,
        reflectToAttribute: true,
        sync: true
      },
      /**
       * Specify that this control should have input focus when the page loads.
       */
      autofocus: {
        type: Boolean
      },
      /**
       * The current selected date time.
       * @private
       */
      __selectedDateTime: {
        type: Date,
        sync: true
      },
      /**
       * The current slotted date picker.
       * @private
       */
      __datePicker: {
        type: Object,
        sync: true,
        observer: "__datePickerChanged"
      },
      /**
       * The current slotted time picker.
       * @private
       */
      __timePicker: {
        type: Object,
        sync: true,
        observer: "__timePickerChanged"
      }
    };
  }
  static get observers() {
    return [
      "__selectedDateTimeChanged(__selectedDateTime)",
      "__datePlaceholderChanged(datePlaceholder, __datePicker)",
      "__timePlaceholderChanged(timePlaceholder, __timePicker)",
      "__stepChanged(step, __timePicker)",
      "__initialPositionChanged(initialPosition, __datePicker)",
      "__showWeekNumbersChanged(showWeekNumbers, __datePicker)",
      "__requiredChanged(required, __datePicker, __timePicker)",
      "__invalidChanged(invalid, __datePicker, __timePicker)",
      "__disabledChanged(disabled, __datePicker, __timePicker)",
      "__readonlyChanged(readonly, __datePicker, __timePicker)",
      "__i18nChanged(__effectiveI18n, __datePicker, __timePicker)",
      "__autoOpenDisabledChanged(autoOpenDisabled, __datePicker, __timePicker)",
      "__themeChanged(_theme, __datePicker, __timePicker)",
      "__pickersChanged(__datePicker, __timePicker)",
      "__labelOrAccessibleNameChanged(label, accessibleName, __effectiveI18n, __datePicker, __timePicker)"
    ];
  }
  constructor() {
    super();
    this.__defaultDateMinMaxValue = void 0;
    this.__defaultTimeMinValue = "00:00:00.000";
    this.__defaultTimeMaxValue = "23:59:59.999";
    this.__onGlobalClick = this.__onGlobalClick.bind(this);
    this.__changeEventHandler = this.__changeEventHandler.bind(this);
    this.__valueChangedEventHandler = this.__valueChangedEventHandler.bind(this);
    this.__openedChangedEventHandler = this.__openedChangedEventHandler.bind(this);
  }
  /**
   * The object used to localize this component. To change the default
   * localization, replace this with an object that provides all properties, or
   * just the individual properties you want to change.
   *
   * The object has the following structure and default values:
   *
   * ```js
   * {
   *   // Accessible label to the date picker.
   *   // The property works in conjunction with label and accessibleName defined on the field.
   *   // If both properties are defined, then accessibleName takes precedence.
   *   // Then, the dateLabel value is concatenated with it.
   *   dateLabel: undefined;
   *
   *   // Accessible label to the time picker.
   *   // The property works in conjunction with label and accessibleName defined on the field.
   *   // If both properties are defined, then accessibleName takes precedence.
   *   // Then, the dateLabel value is concatenated with it.
   *   timeLabel: undefined;
   * }
   * ```
   *
   * Additionally, all i18n properties from
   * [`<vaadin-date-picker>`](#/elements/vaadin-date-picker) and
   * [`<vaadin-time-picker>`](#/elements/vaadin-time-picker) are supported.
   *
   * @type {!DateTimePickerI18n}
   */
  get i18n() {
    return super.i18n;
  }
  set i18n(value) {
    super.i18n = value;
  }
  /** @private */
  get __pickers() {
    return [this.__datePicker, this.__timePicker];
  }
  /** @private */
  get __filledPickers() {
    return this.__pickers.filter((picker) => picker.value || picker.__unparsableValue);
  }
  /** @private */
  get __formattedValue() {
    const values = this.__pickers.map((picker) => picker.value);
    return values.every(Boolean) ? values.join("T") : "";
  }
  /**
   * Values:
   * - ""
   * - "fooT"
   * - "Tbar"
   * - "fooTbar"
   * - "T12:00"
   * - "fooT12:00"
   * - "2024-01-01T"
   * - "2024-01-01Tbar"
   *
   * @private
   */
  get __unparsableValue() {
    if (this.__filledPickers.length > 0 && !this.__pickers.every((picker) => picker.value)) {
      return this.__pickers.map((picker) => picker.value || picker.__unparsableValue).join("T");
    }
    return "";
  }
  /** @protected */
  ready() {
    super.ready();
    this._datePickerController = new PickerSlotController(this, "date");
    this.addController(this._datePickerController);
    this._timePickerController = new PickerSlotController(this, "time");
    this.addController(this._timePickerController);
    if (this.autofocus && !this.disabled) {
      window.requestAnimationFrame(() => this.focus());
    }
    this.setAttribute("role", "group");
    this._tooltipController = new TooltipController(this);
    this.addController(this._tooltipController);
    this._tooltipController.setPosition("top");
    this._tooltipController.setShouldShow((target) => {
      return target.__datePicker && !target.__datePicker.opened && target.__timePicker && !target.__timePicker.opened;
    });
    this.ariaTarget = this;
  }
  /** @protected */
  connectedCallback() {
    super.connectedCallback();
    document.addEventListener("click", this.__onGlobalClick, true);
  }
  /** @protected */
  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener("click", this.__onGlobalClick, true);
  }
  /**
   * @param {FocusOptions=} options
   * @protected
   * @override
   */
  focus(options) {
    if (this.__datePicker) {
      this.__datePicker.focus(options);
    }
  }
  /** @private */
  __onGlobalClick(event) {
    const isOpened = this.__datePicker.opened || this.__timePicker.opened;
    if (!isOpened) {
      return;
    }
    const isOutsideClick = event.composedPath().every((node) => {
      return ![
        this.__datePicker,
        this.__datePicker.$.overlay,
        this.__timePicker,
        this.__timePicker.$.overlay
      ].includes(node);
    });
    if (isOutsideClick) {
      this.__outsideClickInProgress = true;
      setTimeout(() => {
        this.__outsideClickInProgress = false;
      });
    }
  }
  /**
   * Override method inherited from `FocusMixin` to validate on blur.
   * @param {boolean} focused
   * @protected
   * @override
   */
  _setFocused(focused) {
    super._setFocused(focused);
    if (!focused && document.hasFocus()) {
      this.__commitPendingValueChange();
    }
  }
  /**
   * Override method inherited from `FocusMixin` to not remove focused
   * state when focus moves between pickers or to the overlay.
   * @param {FocusEvent} event
   * @return {boolean}
   * @protected
   * @override
   */
  _shouldRemoveFocus(event) {
    const target = event.relatedTarget;
    if (this.__datePicker.opened || this.__timePicker.opened || this.__datePicker.contains(target) || this.__timePicker.contains(target)) {
      return false;
    }
    return true;
  }
  /** @private */
  __syncI18n(target, i18n, props) {
    const targetI18n = {};
    props.forEach((prop) => {
      if (i18n && i18n.hasOwnProperty(prop)) {
        targetI18n[prop] = i18n[prop];
      }
    });
    target.i18n = targetI18n;
  }
  /** @private */
  __changeEventHandler(event) {
    event.stopPropagation();
    const isAlreadyInvalid = this.invalid;
    const filledPickers = this.__filledPickers;
    if (filledPickers.length === 1 && filledPickers[0].checkValidity() && !isAlreadyInvalid) {
      return;
    }
    if (this.__hasPendingValueChange) {
      this.__commitPendingValueChange();
    }
  }
  /** @private */
  __openedChangedEventHandler() {
    const opened = this.__datePicker.opened || this.__timePicker.opened;
    this.style.pointerEvents = opened ? "auto" : "";
    if (!opened && this.__outsideClickInProgress) {
      this.__commitPendingValueChange();
    }
  }
  /** @private */
  __addInputListeners(node) {
    node.addEventListener("change", this.__changeEventHandler);
    node.addEventListener("unparsable-change", this.__changeEventHandler);
    node.addEventListener("value-changed", this.__valueChangedEventHandler);
    node.addEventListener("opened-changed", this.__openedChangedEventHandler);
  }
  /** @private */
  __removeInputListeners(node) {
    node.removeEventListener("change", this.__changeEventHandler);
    node.removeEventListener("unparsable-change", this.__changeEventHandler);
    node.removeEventListener("value-changed", this.__valueChangedEventHandler);
    node.removeEventListener("opened-changed", this.__openedChangedEventHandler);
  }
  /** @private */
  __isDefaultPicker(picker, type) {
    const controller = this[`_${type}PickerController`];
    return controller && picker === controller.defaultNode;
  }
  /** @private */
  __datePickerChanged(newDatePicker, existingDatePicker) {
    if (!newDatePicker) {
      return;
    }
    if (existingDatePicker) {
      this.__removeInputListeners(existingDatePicker);
      existingDatePicker.remove();
    }
    this.__addInputListeners(newDatePicker);
    if (!this.__isDefaultPicker(newDatePicker, "date")) {
      this.datePlaceholder = newDatePicker.placeholder;
      this.initialPosition = newDatePicker.initialPosition;
      this.showWeekNumbers = newDatePicker.showWeekNumbers;
    }
    newDatePicker.min = this.__formatDateISO(this.__minDateTime, this.__defaultDateMinMaxValue);
    newDatePicker.max = this.__formatDateISO(this.__maxDateTime, this.__defaultDateMinMaxValue);
    newDatePicker.manualValidation = true;
  }
  /** @private */
  __timePickerChanged(newTimePicker, existingTimePicker) {
    if (!newTimePicker) {
      return;
    }
    if (existingTimePicker) {
      this.__removeInputListeners(existingTimePicker);
      existingTimePicker.remove();
    }
    this.__addInputListeners(newTimePicker);
    if (!this.__isDefaultPicker(newTimePicker, "time")) {
      this.timePlaceholder = newTimePicker.placeholder;
      this.step = newTimePicker.step;
    }
    this.__updateTimePickerMinMax();
    newTimePicker.manualValidation = true;
  }
  /** @private */
  __updateTimePickerMinMax() {
    if (this.__timePicker && this.__datePicker) {
      const selectedDate = this.__parseDate(this.__datePicker.value);
      const isMinMaxSameDay = dateEquals(this.__minDateTime, this.__maxDateTime, normalizeUTCDate);
      if (this.__minDateTime && dateEquals(selectedDate, this.__minDateTime, normalizeUTCDate) || isMinMaxSameDay) {
        this.__timePicker.min = this.__dateToIsoTimeString(this.__minDateTime);
      } else {
        this.__timePicker.min = this.__defaultTimeMinValue;
      }
      if (this.__maxDateTime && dateEquals(selectedDate, this.__maxDateTime, normalizeUTCDate) || isMinMaxSameDay) {
        this.__timePicker.max = this.__dateToIsoTimeString(this.__maxDateTime);
      } else {
        this.__timePicker.max = this.__defaultTimeMaxValue;
      }
    }
  }
  /** @private */
  __i18nChanged(effectiveI18n, datePicker, timePicker) {
    if (datePicker && this.__isDefaultPicker(datePicker, "date")) {
      this.__syncI18n(datePicker, effectiveI18n, datePickerI18nProps);
    }
    if (timePicker && this.__isDefaultPicker(timePicker, "time")) {
      this.__syncI18n(timePicker, effectiveI18n, timePickerI18nProps);
    }
  }
  /** @private */
  __labelOrAccessibleNameChanged(label, accessibleName, effectiveI18n, datePicker, timePicker) {
    const name = accessibleName || label || "";
    if (datePicker) {
      datePicker.accessibleName = `${name} ${effectiveI18n.dateLabel || ""}`.trim();
    }
    if (timePicker) {
      timePicker.accessibleName = `${name} ${effectiveI18n.timeLabel || ""}`.trim();
    }
  }
  /** @private */
  __datePlaceholderChanged(datePlaceholder, datePicker) {
    if (datePicker) {
      datePicker.placeholder = datePlaceholder;
    }
  }
  /** @private */
  __timePlaceholderChanged(timePlaceholder, timePicker) {
    if (timePicker) {
      timePicker.placeholder = timePlaceholder;
    }
  }
  /** @private */
  __stepChanged(step, timePicker) {
    if (timePicker && timePicker.step !== step) {
      timePicker.step = step;
    }
  }
  /** @private */
  __initialPositionChanged(initialPosition, datePicker) {
    if (datePicker) {
      datePicker.initialPosition = initialPosition;
    }
  }
  /** @private */
  __showWeekNumbersChanged(showWeekNumbers, datePicker) {
    if (datePicker) {
      datePicker.showWeekNumbers = showWeekNumbers;
    }
  }
  /** @private */
  __invalidChanged(invalid, datePicker, timePicker) {
    if (datePicker) {
      datePicker.invalid = invalid;
    }
    if (timePicker) {
      timePicker.invalid = invalid;
    }
  }
  /** @private */
  __requiredChanged(required, datePicker, timePicker) {
    if (datePicker) {
      datePicker.required = required;
    }
    if (timePicker) {
      timePicker.required = required;
    }
    if (this.__oldRequired && !required) {
      this._requestValidation();
    }
    this.__oldRequired = required;
  }
  /** @private */
  __disabledChanged(disabled, datePicker, timePicker) {
    if (datePicker) {
      datePicker.disabled = disabled;
    }
    if (timePicker) {
      timePicker.disabled = disabled;
    }
  }
  /** @private */
  __readonlyChanged(readonly, datePicker, timePicker) {
    if (datePicker) {
      datePicker.readonly = readonly;
    }
    if (timePicker) {
      timePicker.readonly = readonly;
    }
  }
  /**
   * String (ISO date) to Date object
   * @param {string} str e.g. 'yyyy-mm-dd'
   * @return {Date | undefined}
   * @private
   */
  __parseDate(str) {
    return parseUTCDate(str);
  }
  /**
   * Date object to string (ISO date)
   * @param {Date} date
   * @param {string} defaultValue
   * @return {string} e.g. 'yyyy-mm-dd' (or defaultValue when date is falsy)
   * @private
   */
  __formatDateISO(date, defaultValue) {
    if (!date) {
      return defaultValue;
    }
    return formatUTCISODate(date);
  }
  /**
   * String (ISO date time) to Date object
   * @param {string} str e.g. 'yyyy-mm-ddThh:mm', 'yyyy-mm-ddThh:mm:ss', 'yyyy-mm-ddThh:mm:ss.fff'
   * @return {Date | undefined}
   * @private
   */
  __parseDateTime(str) {
    const [dateValue, timeValue] = str.split("T");
    if (!(dateValue && timeValue)) {
      return;
    }
    const date = this.__parseDate(dateValue);
    if (!date) {
      return;
    }
    const time = parseISOTime(timeValue);
    if (!time) {
      return;
    }
    date.setUTCHours(parseInt(time.hours));
    date.setUTCMinutes(parseInt(time.minutes || 0));
    date.setUTCSeconds(parseInt(time.seconds || 0));
    date.setUTCMilliseconds(parseInt(time.milliseconds || 0));
    return date;
  }
  /**
   * Date object to string (ISO date time)
   * @param {Date} date
   * @return {string} e.g. 'yyyy-mm-ddThh:mm', 'yyyy-mm-ddThh:mm:ss', 'yyyy-mm-ddThh:mm:ss.fff'
   *                  (depending on precision defined by "step" property)
   * @private
   */
  __formatDateTime(date) {
    if (!date) {
      return "";
    }
    const dateValue = this.__formatDateISO(date, "");
    const timeValue = this.__dateToIsoTimeString(date);
    return `${dateValue}T${timeValue}`;
  }
  /**
   * Date object to string (ISO time)
   * @param {Date} date
   * @return {string} e.g. 'hh:mm', 'hh:mm:ss', 'hh:mm:ss.fff' (depending on precision defined by "step" property)
   * @private
   */
  __dateToIsoTimeString(date) {
    return formatISOTime(
      validateTime(
        {
          hours: date.getUTCHours(),
          minutes: date.getUTCMinutes(),
          seconds: date.getUTCSeconds(),
          milliseconds: date.getUTCMilliseconds()
        },
        this.step
      )
    );
  }
  /**
   * Returns true if the current input value satisfies all constraints (if any)
   *
   * You can override the `checkValidity` method for custom validations.
   * @return {boolean}
   */
  checkValidity() {
    const hasInvalidPickers = this.__pickers.some((picker) => !picker.checkValidity());
    const hasOnlyOneFilledPicker = this.__filledPickers.length === 1;
    const hasEmptyRequiredPickers = this.required && this.__pickers.some((picker) => !picker.value);
    return !hasInvalidPickers && !hasEmptyRequiredPickers && !hasOnlyOneFilledPicker;
  }
  /** @private */
  __commitPendingValueChange() {
    this._requestValidation();
    if (this.__committedValue !== this.value) {
      this.dispatchEvent(new CustomEvent("change", { bubbles: true }));
    } else if (this.__committedUnparsableValue !== this.__unparsableValue) {
      this.dispatchEvent(new CustomEvent("unparsable-change"));
    }
    this.__committedValue = this.value;
    this.__committedUnparsableValue = this.__unparsableValue;
  }
  /** @private */
  get __hasPendingValueChange() {
    return this.__committedValue !== this.value || this.__committedUnparsableValue !== this.__unparsableValue;
  }
  /**
   * @param {Date} date1
   * @param {Date} date2
   * @return {boolean}
   * @private
   */
  __dateTimeEquals(date1, date2) {
    if (!dateEquals(date1, date2, normalizeUTCDate)) {
      return false;
    }
    return date1.getUTCHours() === date2.getUTCHours() && date1.getUTCMinutes() === date2.getUTCMinutes() && date1.getUTCSeconds() === date2.getUTCSeconds() && date1.getUTCMilliseconds() === date2.getUTCMilliseconds();
  }
  /** @private */
  __handleDateTimeChange(property, parsedProperty, value, oldValue) {
    if (!value) {
      this[property] = "";
      this[parsedProperty] = "";
      return;
    }
    const dateTime = this.__parseDateTime(value);
    if (!dateTime) {
      this[property] = oldValue;
      return;
    }
    if (!this.__dateTimeEquals(this[parsedProperty], dateTime)) {
      this[parsedProperty] = dateTime;
    }
  }
  /** @private */
  __valueChanged(value, oldValue) {
    this.__handleDateTimeChange("value", "__selectedDateTime", value, oldValue);
    if (!this.__keepCommittedValue) {
      this.__committedValue = value;
      this.__committedUnparsableValue = "";
    }
    this.toggleAttribute("has-value", !!value);
    this.__updateTimePickerMinMax();
  }
  /** @private */
  __dispatchChange() {
    this.dispatchEvent(new CustomEvent("change", { bubbles: true }));
  }
  /** @private */
  __minChanged(value, oldValue) {
    this.__handleDateTimeChange("min", "__minDateTime", value, oldValue);
    if (this.__datePicker) {
      this.__datePicker.min = this.__formatDateISO(this.__minDateTime, this.__defaultDateMinMaxValue);
    }
    this.__updateTimePickerMinMax();
    if (this.__datePicker && this.__timePicker && this.value) {
      this._requestValidation();
    }
  }
  /** @private */
  __maxChanged(value, oldValue) {
    this.__handleDateTimeChange("max", "__maxDateTime", value, oldValue);
    if (this.__datePicker) {
      this.__datePicker.max = this.__formatDateISO(this.__maxDateTime, this.__defaultDateMinMaxValue);
    }
    this.__updateTimePickerMinMax();
    if (this.__datePicker && this.__timePicker && this.value) {
      this._requestValidation();
    }
  }
  /** @private */
  __selectedDateTimeChanged(selectedDateTime) {
    const formattedValue = this.__formatDateTime(selectedDateTime);
    if (this.value !== formattedValue) {
      this.value = formattedValue;
    }
    const isDatePickerReady = Boolean(this.__datePicker && this.__datePicker.$);
    if (isDatePickerReady && !this.__ignoreInputValueChange) {
      this.__ignoreInputValueChange = true;
      const [dateValue, timeValue] = this.value.split("T");
      this.__datePicker.value = dateValue || "";
      this.__timePicker.value = timeValue || "";
      this.__ignoreInputValueChange = false;
    }
  }
  /** @private */
  __valueChangedEventHandler() {
    if (this.__ignoreInputValueChange) {
      return;
    }
    this.__ignoreInputValueChange = true;
    this.__keepCommittedValue = true;
    this.__updateTimePickerMinMax();
    this.value = this.__formattedValue;
    this.__keepCommittedValue = false;
    this.__ignoreInputValueChange = false;
  }
  /** @private */
  __autoOpenDisabledChanged(autoOpenDisabled, datePicker, timePicker) {
    if (datePicker) {
      datePicker.autoOpenDisabled = autoOpenDisabled;
    }
    if (timePicker) {
      timePicker.autoOpenDisabled = autoOpenDisabled;
    }
  }
  /** @private */
  __themeChanged(theme, datePicker, timePicker) {
    if (!datePicker || !timePicker) {
      return;
    }
    [datePicker, timePicker].forEach((picker) => {
      if (theme) {
        picker.setAttribute("theme", theme);
      } else {
        picker.removeAttribute("theme");
      }
    });
  }
  /** @private */
  __pickersChanged(datePicker, timePicker) {
    if (!datePicker || !timePicker) {
      return;
    }
    if (this.__isDefaultPicker(datePicker, "date") !== this.__isDefaultPicker(timePicker, "time")) {
      return;
    }
    if (datePicker.value) {
      this.__valueChangedEventHandler();
    } else if (this.value) {
      this.__selectedDateTimeChanged(this.__selectedDateTime);
      if (this.min && this.__minDateTime || this.max && this.__maxDateTime) {
        this._requestValidation();
      }
    }
  }
  /**
   * Fired when the user commits a value change.
   *
   * @event change
   */
};
/**
 * @license
 * Copyright (c) 2019 - 2026 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
class DateTimePicker extends DateTimePickerMixin(
  ThemableMixin(ElementMixin(PolylitMixin(LumoInjectionMixin(LitElement))))
) {
  static get is() {
    return "vaadin-date-time-picker";
  }
  static get styles() {
    return [inputFieldShared, dateTimePickerStyles];
  }
  /** @protected */
  render() {
    return html`
      <div class="vaadin-date-time-picker-container">
        <div part="label" @click="${this.focus}">
          <slot name="label"></slot>
          <span part="required-indicator" aria-hidden="true"></span>
        </div>

        <div part="input-fields">
          <slot name="date-picker" id="dateSlot"></slot>
          <slot name="time-picker" id="timeSlot"></slot>
        </div>

        <div part="helper-text">
          <slot name="helper"></slot>
        </div>

        <div part="error-message">
          <slot name="error-message"></slot>
        </div>
      </div>

      <slot name="tooltip"></slot>
    `;
  }
}
defineCustomElement(DateTimePicker);
const EASTERN_ARABIC_DIGIT_MAP = {
  "\\u0660": "0",
  "\\u0661": "1",
  "\\u0662": "2",
  "\\u0663": "3",
  "\\u0664": "4",
  "\\u0665": "5",
  "\\u0666": "6",
  "\\u0667": "7",
  "\\u0668": "8",
  "\\u0669": "9"
};
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function parseEasternArabicDigits(digits) {
  return digits.replace(/[\u0660-\u0669]/g, function(char) {
    const unicode = "\\u0" + char.charCodeAt(0).toString(16);
    return EASTERN_ARABIC_DIGIT_MAP[unicode];
  });
}
function getAmOrPmString(locale, testTime) {
  const testTimeString = testTime.toLocaleTimeString(locale);
  const amOrPmRegExp = /[^\d\u0660-\u0669]/;
  const matches = (
    // In most locales, the time ends with AM/PM:
    testTimeString.match(new RegExp(`${amOrPmRegExp.source}+$`, "g")) || // In some locales, the time starts with AM/PM e.g in Chinese:
    testTimeString.match(new RegExp(`^${amOrPmRegExp.source}+`, "g"))
  );
  return matches && matches[0].trim();
}
function getSeparator(locale) {
  let timeString = TEST_PM_TIME.toLocaleTimeString(locale);
  const pmString = getPmString(locale);
  if (pmString && timeString.startsWith(pmString)) {
    timeString = timeString.replace(pmString, "");
  }
  const matches = timeString.match(/[^\u0660-\u0669\s\d]/);
  return matches && matches[0];
}
function searchAmOrPmToken(timeString, amOrPmString) {
  if (!amOrPmString) return null;
  const tokenRegExpString = amOrPmString.split(/\s*/).map(escapeRegExp).join("\\s*");
  const tokenRegExp = new RegExp(tokenRegExpString, "i");
  const tokenMatches = timeString.match(tokenRegExp);
  if (tokenMatches) {
    return tokenMatches[0];
  }
}
const TEST_PM_TIME = /* @__PURE__ */ new Date("August 19, 1975 23:15:30");
const TEST_AM_TIME = /* @__PURE__ */ new Date("August 19, 1975 05:15:30");
function getPmString(locale) {
  return getAmOrPmString(locale, TEST_PM_TIME);
}
function getAmString(locale) {
  return getAmOrPmString(locale, TEST_AM_TIME);
}
function parseDigitsIntoInteger(digits) {
  return parseInt(parseEasternArabicDigits(digits));
}
function parseMillisecondsIntoInteger(milliseconds) {
  milliseconds = parseEasternArabicDigits(milliseconds);
  if (milliseconds.length === 1) {
    milliseconds += "00";
  } else if (milliseconds.length === 2) {
    milliseconds += "0";
  }
  return parseInt(milliseconds);
}
function formatMilliseconds(timeString, milliseconds, amString, pmString) {
  let cleanedTimeString = timeString;
  if (timeString.endsWith(amString)) {
    cleanedTimeString = timeString.replace(" " + amString, "");
  } else if (timeString.endsWith(pmString)) {
    cleanedTimeString = timeString.replace(" " + pmString, "");
  }
  if (milliseconds) {
    let millisecondsString = milliseconds < 10 ? "0" : "";
    millisecondsString += milliseconds < 100 ? "0" : "";
    millisecondsString += milliseconds;
    cleanedTimeString += "." + millisecondsString;
  } else {
    cleanedTimeString += ".000";
  }
  if (timeString.endsWith(amString)) {
    cleanedTimeString = cleanedTimeString + " " + amString;
  } else if (timeString.endsWith(pmString)) {
    cleanedTimeString = cleanedTimeString + " " + pmString;
  }
  return cleanedTimeString;
}
function when(predicate, callback, timeout = 0) {
  if (predicate()) {
    callback();
  } else {
    setTimeout(() => when(predicate, callback, 200), timeout);
  }
}
function parseISO(text) {
  const timeObject = parseISOTime(text);
  return {
    hours: parseInt(timeObject.hours || 0),
    minutes: parseInt(timeObject.minutes || 0),
    seconds: parseInt(timeObject.seconds || 0),
    milliseconds: parseInt(timeObject.milliseconds || 0)
  };
}
window.Vaadin.Flow.timepickerConnector = {};
window.Vaadin.Flow.timepickerConnector.initLazy = (timepicker) => {
  if (timepicker.$connector) {
    return;
  }
  timepicker.$connector = {};
  timepicker.$connector.setLocale = (locale) => {
    let previousValueObject;
    if (timepicker.value && timepicker.value !== "") {
      previousValueObject = parseISO(timepicker.value);
    }
    try {
      TEST_PM_TIME.toLocaleTimeString(locale);
    } catch (e) {
      locale = "en-US";
      throw new Error(
        "vaadin-time-picker: The locale " + locale + " is not supported, falling back to default locale setting(en-US)."
      );
    }
    const pmString = getPmString(locale);
    const amString = getAmString(locale);
    const separator = getSeparator(locale);
    const includeSeconds = function() {
      return timepicker.step && timepicker.step < 60;
    };
    const includeMilliSeconds = function() {
      return timepicker.step && timepicker.step < 1;
    };
    let cachedTimeString;
    let cachedTimeObject;
    timepicker.i18n = {
      formatTime(timeObject) {
        if (!timeObject) return;
        const timeToBeFormatted = /* @__PURE__ */ new Date();
        timeToBeFormatted.setHours(timeObject.hours);
        timeToBeFormatted.setMinutes(timeObject.minutes);
        timeToBeFormatted.setSeconds(timeObject.seconds !== void 0 ? timeObject.seconds : 0);
        let localeTimeString = timeToBeFormatted.toLocaleTimeString(locale, {
          hour: "numeric",
          minute: "numeric",
          second: includeSeconds() ? "numeric" : void 0
        });
        if (includeMilliSeconds()) {
          localeTimeString = formatMilliseconds(localeTimeString, timeObject.milliseconds, amString, pmString);
        }
        return localeTimeString;
      },
      parseTime(timeString) {
        if (timeString && timeString === cachedTimeString && cachedTimeObject) {
          return cachedTimeObject;
        }
        if (!timeString) {
          return;
        }
        const amToken = searchAmOrPmToken(timeString, amString);
        const pmToken = searchAmOrPmToken(timeString, pmString);
        const numbersOnlyTimeString = timeString.replace(amToken || "", "").replace(pmToken || "", "").trim();
        const numbersRegExp = new RegExp("([\\d\\u0660-\\u0669]){1,2}(?:" + separator + ")?", "g");
        let hours = numbersRegExp.exec(numbersOnlyTimeString);
        if (hours) {
          hours = parseDigitsIntoInteger(hours[0].replace(separator, ""));
          if (amToken !== pmToken) {
            if (hours === 12 && amToken) {
              hours = 0;
            }
            if (hours !== 12 && pmToken) {
              hours += 12;
            }
          }
          const minutes = numbersRegExp.exec(numbersOnlyTimeString);
          const seconds = minutes && numbersRegExp.exec(numbersOnlyTimeString);
          const millisecondRegExp = /[[\.][\d\u0660-\u0669]{1,3}$/;
          let milliseconds = seconds && includeMilliSeconds() && millisecondRegExp.exec(numbersOnlyTimeString);
          if (milliseconds && milliseconds["index"] <= seconds["index"]) {
            milliseconds = void 0;
          }
          cachedTimeObject = hours !== void 0 && {
            hours,
            minutes: minutes ? parseDigitsIntoInteger(minutes[0].replace(separator, "")) : 0,
            seconds: seconds ? parseDigitsIntoInteger(seconds[0].replace(separator, "")) : 0,
            milliseconds: minutes && seconds && milliseconds ? parseMillisecondsIntoInteger(milliseconds[0].replace(".", "")) : 0
          };
          cachedTimeString = timeString;
          return cachedTimeObject;
        }
      }
    };
    if (previousValueObject) {
      when(
        () => timepicker.$,
        () => {
          const newValue = timepicker.i18n.formatTime(previousValueObject);
          if (timepicker.inputElement.value !== newValue) {
            timepicker.inputElement.value = newValue;
            timepicker.value = newValue;
          }
        }
      );
    }
  };
};
window.Vaadin = window.Vaadin || {};
window.Vaadin.Flow = window.Vaadin.Flow || {};
window.Vaadin.Flow.dndConnector = {
  __ondragenterListener: function(event) {
    const effect = event.currentTarget["__dropEffect"];
    if (!event.currentTarget.hasAttribute("disabled")) {
      if (effect) {
        event.dataTransfer.dropEffect = effect;
      }
      if (effect !== "none") {
        if (event.currentTarget.classList.contains("v-drag-over-target")) {
          event.currentTarget["__skip-leave"] = true;
        } else {
          event.currentTarget.classList.add("v-drag-over-target");
        }
        event.preventDefault();
        event.stopPropagation();
      }
    }
  },
  __ondragoverListener: function(event) {
    if (!event.currentTarget.hasAttribute("disabled")) {
      const effect = event.currentTarget["__dropEffect"];
      if (effect) {
        event.dataTransfer.dropEffect = effect;
      }
      event.preventDefault();
      event.stopPropagation();
    }
  },
  __ondragleaveListener: function(event) {
    if (event.currentTarget["__skip-leave"]) {
      event.currentTarget["__skip-leave"] = false;
    } else {
      event.currentTarget.classList.remove("v-drag-over-target");
    }
    event.stopPropagation();
  },
  __ondropListener: function(event) {
    const effect = event.currentTarget["__dropEffect"];
    if (effect) {
      event.dataTransfer.dropEffect = effect;
    }
    event.currentTarget.classList.remove("v-drag-over-target");
    event.preventDefault();
    event.stopPropagation();
  },
  updateDropTarget: function(element) {
    if (element["__active"]) {
      element.addEventListener("dragenter", this.__ondragenterListener, false);
      element.addEventListener("dragover", this.__ondragoverListener, false);
      element.addEventListener("dragleave", this.__ondragleaveListener, false);
      element.addEventListener("drop", this.__ondropListener, false);
    } else {
      element.removeEventListener("dragenter", this.__ondragenterListener, false);
      element.removeEventListener("dragover", this.__ondragoverListener, false);
      element.removeEventListener("dragleave", this.__ondragleaveListener, false);
      element.removeEventListener("drop", this.__ondropListener, false);
      element.classList.remove("v-drag-over-target");
    }
  },
  /** DRAG SOURCE METHODS: */
  __dragstartListener: function(event) {
    event.stopPropagation();
    event.dataTransfer.setData("text/plain", "");
    if (event.currentTarget.hasAttribute("disabled")) {
      event.preventDefault();
    } else {
      if (event.currentTarget["__effectAllowed"]) {
        event.dataTransfer.effectAllowed = event.currentTarget["__effectAllowed"];
      }
      event.currentTarget.classList.add("v-dragged");
    }
    if (event.currentTarget.__dragImage) {
      if (event.currentTarget.__dragImage.style.display === "none") {
        event.currentTarget.__dragImage.style.display = "block";
        event.currentTarget.classList.add("shown");
      }
      event.dataTransfer.setDragImage(
        event.currentTarget.__dragImage,
        event.currentTarget.__dragImageOffsetX,
        event.currentTarget.__dragImageOffsetY
      );
    }
  },
  __dragendListener: function(event) {
    event.currentTarget.classList.remove("v-dragged");
    if (event.currentTarget.classList.contains("shown")) {
      event.currentTarget.classList.remove("shown");
      event.currentTarget.__dragImage.style.display = "none";
    }
  },
  updateDragSource: function(element) {
    if (element["draggable"]) {
      element.addEventListener("dragstart", this.__dragstartListener, false);
      element.addEventListener("dragend", this.__dragendListener, false);
    } else {
      element.removeEventListener("dragstart", this.__dragstartListener, false);
      element.removeEventListener("dragend", this.__dragendListener, false);
    }
  },
  setDragImage: function(dragImage, offsetX, offsetY, dragSource) {
    dragSource.__dragImage = dragImage;
    dragSource.__dragImageOffsetX = offsetX;
    dragSource.__dragImageOffsetY = offsetY;
  }
};
/**
 * @license
 * Copyright (c) 2018 - 2026 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
CSS.registerProperty({
  name: "--_min-width-labels-aside",
  syntax: "<length>",
  inherits: false,
  initialValue: "0px"
});
addGlobalStyles(
  "vaadin-form-layout-base",
  css`
    @layer vaadin.base {
      html {
        --vaadin-form-layout-label-spacing: var(--vaadin-gap-s);
        --vaadin-form-layout-label-width: 8em;
        --vaadin-form-layout-column-spacing: var(--vaadin-gap-l);
        --vaadin-form-layout-row-spacing: var(--vaadin-gap-l);
      }
    }
  `
);
const formLayoutStyles = css`
  :host {
    /* Default values */
    --_label-spacing: var(--vaadin-form-layout-label-spacing);
    --_label-width: var(--vaadin-form-layout-label-width);
    --_column-spacing: var(--vaadin-form-layout-column-spacing);
    --_row-spacing: var(--vaadin-form-layout-row-spacing);

    align-self: stretch;
    display: block;
    max-width: 100%;
  }

  :host([hidden]) {
    display: none !important;
  }

  :host(:not([auto-responsive])) {
    contain: layout;
  }

  :host(:not([auto-responsive])) #layout {
    align-items: baseline; /* default \`stretch\` is not appropriate */
    display: flex;
    flex-wrap: wrap; /* the items should wrap */
    /* Compensate for row spacing */
    margin-block: calc(-0.5 * var(--_row-spacing));
  }

  :host(:not([auto-responsive])) #layout ::slotted(*) {
    /* Items should neither grow nor shrink. */
    flex-grow: 0;
    flex-shrink: 0;

    /* Margins make spacing between the columns and rows */
    margin-inline: calc(0.5 * var(--_column-spacing));
    margin-block: calc(0.5 * var(--_row-spacing));
  }

  #layout ::slotted(br) {
    display: none;
  }

  :host([auto-responsive]) {
    /* Column width */
    --_column-width: var(--vaadin-field-default-width, 12em);
    --_column-width-labels-above: var(--_column-width);
    --_column-width-labels-aside: calc(var(--_column-width) + var(--_label-width) + var(--_label-spacing));

    /* Column gap */
    --_min-total-gap: calc((var(--_min-columns) - 1) * var(--_column-spacing));
    --_max-total-gap: calc((var(--_max-columns) - 1) * var(--_column-spacing));

    /* Minimum form layout width */
    --_min-width-labels-above: calc(var(--_min-columns) * var(--_column-width-labels-above) + var(--_min-total-gap));
    --_min-width-labels-aside: calc(var(--_min-columns) * var(--_column-width-labels-aside) + var(--_min-total-gap));
    --_min-width: var(--_min-width-labels-above);

    /* Maximum form layout width */
    --_max-width-labels-above: calc(var(--_max-columns) * var(--_column-width-labels-above) + var(--_max-total-gap));
    --_max-width-labels-aside: calc(var(--_max-columns) * var(--_column-width-labels-aside) + var(--_max-total-gap));
    --_max-width: var(--_max-width-labels-above);

    display: flex;
    min-width: var(--_min-width);
  }

  :host([auto-responsive]) #layout {
    /* By default, labels should be displayed above the fields */
    --_form-item-labels-above: initial; /* true */
    --_form-item-labels-aside: ' '; /* false */

    /* CSS grid related properties */
    --_grid-column-width: var(--_column-width-labels-above);
    --_grid-repeat: var(--_grid-column-width);

    display: grid;
    gap: var(--_row-spacing) var(--_column-spacing);

    /*
      Auto-columns can be created when an item's colspan exceeds the rendered column count.
      By setting auto-columns to 0, we exclude these columns from --_grid-rendered-column-count,
      which is then used to cap the colspan.
    */
    grid-auto-columns: 0;

    align-self: start;
    grid-template-columns: repeat(auto-fill, var(--_grid-repeat));
    place-items: baseline start;

    /*
      Firefox requires min-width on both :host and #layout to allow the layout
      to shrink below the value specified in the CSS width property above.
    */
    min-width: var(--_min-width);

    /*
      To prevent the layout from exceeding the column limit defined by --_max-columns,
      its width needs to be constrained:

      1. "width" is used instead of "max-width" because, together with the default "flex: 0 1 auto",
      it allows the layout to shrink to its minimum width inside <vaadin-horizontal-layout>, which
      wouldn't work otherwise.

      2. "width" is used instead of "flex-basis" to make the layout expand to the maximum
      number of columns inside <vaadin-overlay>, which creates a new stacking context
      without a predefined width.
    */
    width: var(--_max-width);
  }

  :host([auto-responsive]) #layout ::slotted(*) {
    /* Make form items inherit label position from the layout */
    --_form-item-labels-above: inherit;
    --_form-item-labels-aside: inherit;

    /* By default, place each child on a new row */
    grid-column: 1 / span min(var(--_grid-colspan, 1), var(--_grid-rendered-column-count));

    /* Form items do not need margins in auto-responsive mode */
    margin: 0;
  }

  :host([auto-responsive][auto-rows]) #layout ::slotted(*) {
    grid-column-start: var(--_grid-colstart, auto);
  }

  :host([auto-responsive][labels-aside]) {
    --_max-width: var(--_max-width-labels-aside);
  }

  :host([auto-responsive][labels-aside]) #layout[fits-labels-aside] {
    --_form-item-labels-above: ' '; /* false */
    --_form-item-labels-aside: initial; /* true */
    --_grid-column-width: var(--_column-width-labels-aside);
  }

  :host([auto-responsive][expand-columns]) #layout {
    /*
      The "min" value in minmax ensures that once "maxColumns" is reached, the grid stops adding
      new columns and instead expands the existing ones evenly to fill the available space.

      The "max" value in minmax allows CSS grid columns to grow and evenly distribute any space
      that remains when there isn't room for an additional column and "maxColumns" hasn't been
      reached yet.
    */
    --_grid-repeat: minmax(
      max(var(--_grid-column-width), calc((100% - var(--_max-total-gap)) / var(--_max-columns))),
      1fr
    );

    /* Allow the layout to take up full available width of the parent element. */
    flex-grow: 1;
  }
`;
const formLayoutSlotStyles = css`
  /* Using :where to ensure user styles always take precedence */
  :where(
    vaadin-form-layout[auto-responsive] > *,
    vaadin-form-layout[auto-responsive] vaadin-form-row > *,
    vaadin-form-layout[auto-responsive] vaadin-form-item > *
  ) {
    box-sizing: border-box;
    max-width: 100%;
  }

  :where(
    vaadin-form-layout[auto-responsive][expand-fields] > *,
    vaadin-form-layout[auto-responsive][expand-fields] vaadin-form-row > *,
    vaadin-form-layout[auto-responsive][expand-fields] vaadin-form-item > *
  ) {
    min-width: 100%;
  }
`;
/**
 * @license
 * Copyright (c) 2021 - 2026 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
class AbstractLayout {
  /**
   * @param {HTMLElement} host
   * @param {{ mutationObserverOptions: MutationObserverInit }} config
   */
  constructor(host, config) {
    this.host = host;
    this.props = {};
    this.config = config;
    this.isConnected = false;
    this.__resizeObserver = new ResizeObserver((entries) => setTimeout(() => this._onResize(entries)));
    this.__mutationObserver = new MutationObserver((records) => this._onMutation(records));
  }
  /**
   * Connects the layout to the host element.
   */
  connect() {
    if (this.isConnected) {
      return;
    }
    this.isConnected = true;
    this.__resizeObserver.observe(this.host);
    this.__mutationObserver.observe(this.host, this.config.mutationObserverOptions);
  }
  /**
   * Disconnects the layout from the host element.
   */
  disconnect() {
    if (!this.isConnected) {
      return;
    }
    this.isConnected = false;
    this.__resizeObserver.disconnect();
    this.__mutationObserver.disconnect();
  }
  /**
   * Sets the properties of the layout controller.
   */
  setProps(props) {
    this.props = props;
  }
  /**
   * Updates the layout based on the current properties.
   */
  updateLayout() {
  }
  /**
   * @param {ResizeObserverEntry[]} _entries
   * @protected
   */
  _onResize(_entries) {
  }
  /**
   * @param {MutationRecord[]} _records
   * @protected
   */
  _onMutation(_records) {
  }
}
/**
 * @license
 * Copyright (c) 2021 - 2026 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
function isBreakLine(el) {
  return el.localName === "br";
}
class AutoResponsiveLayout extends AbstractLayout {
  constructor(host) {
    super(host, {
      mutationObserverOptions: {
        subtree: true,
        childList: true,
        attributes: true,
        attributeFilter: ["colspan", "data-colspan", "hidden"]
      }
    });
  }
  /** @override */
  connect() {
    if (this.isConnected) {
      return;
    }
    super.connect();
    this.updateLayout();
  }
  /** @override */
  disconnect() {
    if (!this.isConnected) {
      return;
    }
    super.disconnect();
    const { host } = this;
    host.style.removeProperty("--_column-width");
    host.style.removeProperty("--_max-columns");
    host.$.layout.removeAttribute("fits-labels-aside");
    host.$.layout.style.removeProperty("--_grid-rendered-column-count");
    this.__children.forEach((child) => {
      child.style.removeProperty("--_grid-colstart");
      child.style.removeProperty("--_grid-colspan");
    });
  }
  /** @override */
  setProps(props) {
    super.setProps(props);
    if (this.isConnected) {
      this.updateLayout();
    }
  }
  /** @override */
  updateLayout() {
    const { host, props } = this;
    if (!this.isConnected || isElementHidden(host)) {
      return;
    }
    let columnCount = 0;
    let maxColumns = 0;
    const children = this.__children;
    children.filter((child) => isBreakLine(child) || !isElementHidden(child)).forEach((child, index, children2) => {
      const prevChild = children2[index - 1];
      if (isBreakLine(child)) {
        columnCount = 0;
        return;
      }
      if (prevChild && prevChild.parentElement !== child.parentElement || !props.autoRows && child.parentElement === host) {
        columnCount = 0;
      }
      if (props.autoRows && columnCount === 0) {
        child.style.setProperty("--_grid-colstart", 1);
      } else {
        child.style.removeProperty("--_grid-colstart");
      }
      const colspan = child.getAttribute("colspan") || child.getAttribute("data-colspan");
      if (colspan) {
        columnCount += parseInt(colspan);
        child.style.setProperty("--_grid-colspan", colspan);
      } else {
        columnCount += 1;
        child.style.removeProperty("--_grid-colspan");
      }
      maxColumns = Math.max(maxColumns, columnCount);
    });
    children.filter(isElementHidden).forEach((child) => {
      child.style.removeProperty("--_grid-colstart");
    });
    if (props.columnWidth) {
      host.style.setProperty("--_column-width", props.columnWidth);
    } else {
      host.style.removeProperty("--_column-width");
    }
    host.style.setProperty("--_min-columns", props.minColumns);
    host.style.setProperty("--_max-columns", Math.min(Math.max(props.minColumns, props.maxColumns), maxColumns));
    host.$.layout.toggleAttribute("fits-labels-aside", this.props.labelsAside && this.__fitsLabelsAside);
    host.$.layout.style.setProperty("--_grid-rendered-column-count", this.__renderedColumnCount);
  }
  /** @override */
  _onResize() {
    this.updateLayout();
  }
  /** @override */
  _onMutation(records) {
    const shouldUpdateLayout = records.some(({ target }) => {
      return target === this.host || target.parentElement === this.host || target.parentElement.localName === "vaadin-form-row";
    });
    if (shouldUpdateLayout) {
      this.updateLayout();
    }
  }
  /** @private */
  get __children() {
    return [...this.host.children].flatMap((child) => {
      return child.localName === "vaadin-form-row" ? [...child.children] : child;
    });
  }
  /** @private */
  get __renderedColumnCount() {
    const { gridTemplateColumns } = getComputedStyle(this.host.$.layout);
    return gridTemplateColumns.split(" ").filter((width) => width !== "0px").length;
  }
  /** @private */
  get __minWidthLabelsAside() {
    return parseFloat(getComputedStyle(this.host).getPropertyValue("--_min-width-labels-aside"));
  }
  /** @private */
  get __fitsLabelsAside() {
    return this.host.offsetWidth >= this.__minWidthLabelsAside;
  }
}
/**
 * @license
 * Copyright (c) 2021 - 2026 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
function isValidCSSLength(value) {
  return CSS.supports("word-spacing", value) && !["inherit", "normal"].includes(value);
}
function naturalNumberOrOne(n) {
  if (typeof n === "number" && n >= 1 && n < Infinity) {
    return Math.floor(n);
  }
  return 1;
}
class ResponsiveStepsLayout extends AbstractLayout {
  constructor(host) {
    super(host, {
      mutationObserverOptions: {
        subtree: true,
        childList: true,
        attributes: true,
        attributeFilter: ["colspan", "data-colspan", "hidden"]
      }
    });
  }
  /** @override */
  connect() {
    if (this.isConnected) {
      return;
    }
    super.connect();
    this.__selectResponsiveStep();
    this.updateLayout();
    requestAnimationFrame(() => this.__selectResponsiveStep());
    requestAnimationFrame(() => this.updateLayout());
  }
  /** @override */
  disconnect() {
    if (!this.isConnected) {
      return;
    }
    super.disconnect();
    const { host } = this;
    host.$.layout.style.removeProperty("opacity");
    [...host.children].forEach((child) => {
      child.style.removeProperty("width");
      child.style.removeProperty("margin-left");
      child.style.removeProperty("margin-right");
      child.removeAttribute("label-position");
    });
  }
  /** @override */
  setProps(props) {
    const { responsiveSteps } = props;
    if (!Array.isArray(responsiveSteps)) {
      throw new Error('Invalid "responsiveSteps" type, an Array is required.');
    }
    if (responsiveSteps.length < 1) {
      throw new Error('Invalid empty "responsiveSteps" array, at least one item is required.');
    }
    responsiveSteps.forEach((step) => {
      if (naturalNumberOrOne(step.columns) !== step.columns) {
        throw new Error(`Invalid 'columns' value of ${step.columns}, a natural number is required.`);
      }
      if (step.minWidth !== void 0 && !isValidCSSLength(step.minWidth)) {
        throw new Error(`Invalid 'minWidth' value of ${step.minWidth}, a valid CSS length required.`);
      }
      if (step.labelsPosition !== void 0 && ["aside", "top"].indexOf(step.labelsPosition) === -1) {
        throw new Error(
          `Invalid 'labelsPosition' value of ${step.labelsPosition}, 'aside' or 'top' string is required.`
        );
      }
    });
    super.setProps(props);
    if (this.isConnected) {
      this.__selectResponsiveStep();
      this.updateLayout();
    }
  }
  /** @override */
  updateLayout() {
    const { host } = this;
    if (!this.isConnected || isElementHidden(host)) {
      return;
    }
    const style = getComputedStyle(host);
    const columnSpacing = style.getPropertyValue("--_column-spacing");
    const direction = style.direction;
    const marginStartProp = `margin-${direction === "ltr" ? "left" : "right"}`;
    const marginEndProp = `margin-${direction === "ltr" ? "right" : "left"}`;
    const containerWidth = host.offsetWidth;
    let col = 0;
    Array.from(host.children).filter((child) => child.localName === "br" || getComputedStyle(child).display !== "none").forEach((child, index, children) => {
      if (child.localName === "br") {
        col = 0;
        return;
      }
      const attrColspan = child.getAttribute("colspan") || child.getAttribute("data-colspan");
      let colspan;
      colspan = naturalNumberOrOne(parseFloat(attrColspan));
      colspan = Math.min(colspan, this.__columnCount);
      const childRatio = colspan / this.__columnCount;
      child.style.width = `calc(${childRatio * 100}% - ${1 - childRatio} * ${columnSpacing})`;
      if (col + colspan > this.__columnCount) {
        col = 0;
      }
      if (col === 0) {
        child.style.setProperty(marginStartProp, "0px");
      } else {
        child.style.removeProperty(marginStartProp);
      }
      const nextIndex = index + 1;
      const nextLineBreak = nextIndex < children.length && children[nextIndex].localName === "br";
      if (col + colspan === this.__columnCount) {
        child.style.setProperty(marginEndProp, "0px");
      } else if (nextLineBreak) {
        const colspanRatio = (this.__columnCount - col - colspan) / this.__columnCount;
        child.style.setProperty(
          marginEndProp,
          `calc(${colspanRatio * containerWidth}px + ${colspanRatio} * ${columnSpacing})`
        );
      } else {
        child.style.removeProperty(marginEndProp);
      }
      col = (col + colspan) % this.__columnCount;
      if (child.localName === "vaadin-form-item") {
        if (this.__labelsOnTop) {
          if (child.getAttribute("label-position") !== "top") {
            child.__useLayoutLabelPosition = true;
            child.setAttribute("label-position", "top");
          }
        } else if (child.__useLayoutLabelPosition) {
          delete child.__useLayoutLabelPosition;
          child.removeAttribute("label-position");
        }
      }
    });
  }
  /** @override */
  _onResize() {
    const { host } = this;
    if (isElementHidden(host)) {
      host.$.layout.style.opacity = "0";
      return;
    }
    this.__selectResponsiveStep();
    this.updateLayout();
    host.$.layout.style.opacity = "";
  }
  /** @override */
  _onMutation(records) {
    const shouldUpdateLayout = records.some(({ target }) => {
      return target === this.host || target.parentElement === this.host;
    });
    if (shouldUpdateLayout) {
      this.updateLayout();
    }
  }
  /** @private */
  __selectResponsiveStep() {
    if (!this.isConnected) {
      return;
    }
    const { host, props } = this;
    let selectedStep;
    const tmpStyleProp = "background-position";
    props.responsiveSteps.forEach((step) => {
      host.$.layout.style.setProperty(tmpStyleProp, step.minWidth);
      const stepMinWidthPx = parseFloat(getComputedStyle(host.$.layout).getPropertyValue(tmpStyleProp));
      if (stepMinWidthPx <= host.offsetWidth) {
        selectedStep = step;
      }
    });
    host.$.layout.style.removeProperty(tmpStyleProp);
    if (selectedStep) {
      this.__columnCount = selectedStep.columns;
      this.__labelsOnTop = selectedStep.labelsPosition === "top";
    }
  }
}
/**
 * @license
 * Copyright (c) 2017 - 2026 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const FormLayoutMixin = (superClass) => class extends SlotStylesMixin(superClass) {
  static get properties() {
    return {
      /**
       * @typedef FormLayoutResponsiveStep
       * @type {object}
       * @property {string} minWidth - The threshold value for this step in CSS length units.
       * @property {number} columns - Number of columns. Only natural numbers are valid.
       * @property {string} labelsPosition - Labels position option, valid values: `"aside"` (default), `"top"`.
       */
      /**
       * Allows specifying a responsive behavior with the number of columns
       * and the label position depending on the layout width.
       *
       * Format: array of objects, each object defines one responsive step
       * with `minWidth` CSS length, `columns` number, and optional
       * `labelsPosition` string of `"aside"` or `"top"`. At least one item is required.
       *
       * NOTE: Responsive steps are ignored in auto-responsive mode, which may be
       * enabled explicitly via the `autoResponsive` property or implicitly
       * if the following feature flag is set:
       *
       * ```js
       * window.Vaadin.featureFlags.defaultAutoResponsiveFormLayout = true
       * ```
       *
       * #### Examples
       *
       * ```javascript
       * formLayout.responsiveSteps = [{columns: 1}];
       * // The layout is always a single column, labels aside.
       * ```
       *
       * ```javascript
       * formLayout.responsiveSteps = [
       *   {minWidth: 0, columns: 1},
       *   {minWidth: '40em', columns: 2}
       * ];
       * // Sets two responsive steps:
       * // 1. When the layout width is < 40em, one column, labels aside.
       * // 2. Width >= 40em, two columns, labels aside.
       * ```
       *
       * ```javascript
       * formLayout.responsiveSteps = [
       *   {minWidth: 0, columns: 1, labelsPosition: 'top'},
       *   {minWidth: '20em', columns: 1},
       *   {minWidth: '40em', columns: 2}
       * ];
       * // Default value. Three responsive steps:
       * // 1. Width < 20em, one column, labels on top.
       * // 2. 20em <= width < 40em, one column, labels aside.
       * // 3. Width >= 40em, two columns, labels aside.
       * ```
       *
       * @type {!Array<!FormLayoutResponsiveStep>}
       */
      responsiveSteps: {
        type: Array,
        value() {
          return [
            { minWidth: 0, columns: 1, labelsPosition: "top" },
            { minWidth: "20em", columns: 1 },
            { minWidth: "40em", columns: 2 }
          ];
        },
        observer: "__responsiveStepsChanged",
        sync: true
      },
      /**
       * When set to `true`, the component automatically creates and adjusts columns based on
       * the container's width. Columns have a fixed width defined by `columnWidth` and their
       * number increases up to the limit set by `maxColumns`. The component dynamically adjusts
       * the number of columns as the container size changes. When this mode is enabled,
       * `responsiveSteps` are ignored.
       *
       * By default, each field is placed on a new row. To organize fields into rows, there are
       * two options:
       *
       * 1. Use `<vaadin-form-row>` to explicitly group fields into rows.
       *
       * 2. Enable the `autoRows` property to automatically arrange fields in available columns,
       *    wrapping to a new row when necessary. `<br>` elements can be used to force a new row.
       *
       * The auto-responsive mode is disabled by default. To enable it for an individual instance,
       * use this property. Alternatively, if you want it to be enabled for all instances by default,
       * enable the `defaultAutoResponsiveFormLayout` feature flag before `<vaadin-form-layout>`
       * elements are added to the DOM:
       *
       * ```js
       * window.Vaadin.featureFlags.defaultAutoResponsiveFormLayout = true;
       * ```
       *
       * @attr {boolean} auto-responsive
       */
      autoResponsive: {
        type: Boolean,
        sync: true,
        value: () => {
          if (window.Vaadin && window.Vaadin.featureFlags && window.Vaadin.featureFlags.defaultAutoResponsiveFormLayout) {
            return true;
          }
          return false;
        },
        reflectToAttribute: true
      },
      /**
       * When `autoResponsive` is enabled, defines the width of each column.
       * The value must be defined in CSS length units, e.g. `100px`.
       *
       * If the column width isn't explicitly set, it defaults to `12em`
       * or `--vaadin-field-default-width` if that CSS property is defined.
       *
       * @attr {string} column-width
       */
      columnWidth: {
        type: String,
        sync: true
      },
      /**
       * When `autoResponsive` is enabled, defines the maximum number of columns
       * that the layout can create. The layout will create columns up to this
       * limit based on the available container width.
       *
       * The default value is `10`.
       *
       * @attr {number} max-columns
       */
      maxColumns: {
        type: Number,
        sync: true,
        value: 10
      },
      /**
       * When `autoResponsive` is enabled, defines the minimum number of columns
       * that the layout can create. The layout will create columns at least up
       * to this limit.
       *
       * The default value is `1`.
       *
       * @attr {number} min-columns
       */
      minColumns: {
        type: Number,
        sync: true,
        value: 1
      },
      /**
       * When enabled with `autoResponsive`, distributes fields across columns
       * by placing each field in the next available column and wrapping to
       * the next row when the current row is full. `<br>` elements can be
       * used to force a new row.
       *
       * The default value is `false`.
       *
       * @attr {boolean} auto-rows
       */
      autoRows: {
        type: Boolean,
        sync: true,
        value: false,
        reflectToAttribute: true
      },
      /**
       * When enabled with `autoResponsive`, `<vaadin-form-item>` prefers positioning
       * labels beside the fields. If the layout is too narrow to fit a single column
       * with a side label, the component will automatically switch labels to their
       * default position above the fields.
       *
       * The default value is `false`.
       *
       * To customize the label width and the gap between the label and the field,
       * use the following CSS properties:
       *
       * - `--vaadin-form-layout-label-width`
       * - `--vaadin-form-layout-label-spacing`
       *
       * @attr {boolean} labels-aside
       */
      labelsAside: {
        type: Boolean,
        sync: true,
        value: false,
        reflectToAttribute: true
      },
      /**
       * When `autoResponsive` is enabled, specifies whether the columns should expand
       * in width to evenly fill any remaining space after all columns have been created.
       *
       * The default value is `false`.
       *
       * @attr {boolean} expand-columns
       */
      expandColumns: {
        type: Boolean,
        sync: true,
        value: false,
        reflectToAttribute: true
      },
      /**
       * When `autoResponsive` is enabled, specifies whether fields should stretch
       * to take up all available space within columns. This setting also applies
       * to fields inside `<vaadin-form-item>` elements.
       *
       * The default value is `false`.
       *
       * @attr {boolean} expand-fields
       */
      expandFields: {
        type: Boolean,
        sync: true,
        value: false,
        reflectToAttribute: true
      }
    };
  }
  static get observers() {
    return [
      "__autoResponsiveLayoutPropsChanged(columnWidth, maxColumns, minColumns, autoRows, labelsAside, expandColumns, expandFields)",
      "__autoResponsiveChanged(autoResponsive)"
    ];
  }
  constructor() {
    super();
    this.__currentLayout;
    this.__autoResponsiveLayout = new AutoResponsiveLayout(this);
    this.__responsiveStepsLayout = new ResponsiveStepsLayout(this);
  }
  /** @protected */
  connectedCallback() {
    super.connectedCallback();
    this.__currentLayout.connect();
  }
  /** @protected */
  disconnectedCallback() {
    super.disconnectedCallback();
    this.__currentLayout.disconnect();
  }
  /** @protected */
  get slotStyles() {
    return [`${formLayoutSlotStyles}`.replace("vaadin-form-layout", this.localName)];
  }
  /** @protected */
  _updateLayout() {
    this.__currentLayout.updateLayout();
  }
  /** @private */
  __responsiveStepsChanged(responsiveSteps, oldResponsiveSteps) {
    try {
      this.__responsiveStepsLayout.setProps({ responsiveSteps });
    } catch (e) {
      if (oldResponsiveSteps && oldResponsiveSteps !== responsiveSteps) {
        console.warn(`${e.message} Using previously set 'responsiveSteps' instead.`);
        this.responsiveSteps = oldResponsiveSteps;
      } else {
        console.warn(`${e.message} Using default 'responsiveSteps' instead.`);
        this.responsiveSteps = [
          { minWidth: 0, columns: 1, labelsPosition: "top" },
          { minWidth: "20em", columns: 1 },
          { minWidth: "40em", columns: 2 }
        ];
      }
    }
  }
  /** @private */
  // eslint-disable-next-line @typescript-eslint/max-params
  __autoResponsiveLayoutPropsChanged(columnWidth, maxColumns, minColumns, autoRows, labelsAside, expandColumns, expandFields) {
    this.__autoResponsiveLayout.setProps({
      columnWidth,
      maxColumns,
      minColumns,
      autoRows,
      labelsAside,
      expandColumns,
      expandFields
    });
  }
  /** @private */
  __autoResponsiveChanged(autoResponsive) {
    if (this.__currentLayout) {
      this.__currentLayout.disconnect();
    }
    if (autoResponsive) {
      this.__currentLayout = this.__autoResponsiveLayout;
    } else {
      this.__currentLayout = this.__responsiveStepsLayout;
    }
    this.__currentLayout.connect();
  }
};
/**
 * @license
 * Copyright (c) 2017 - 2026 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
class FormLayout extends FormLayoutMixin(ThemableMixin(ElementMixin(PolylitMixin(LitElement)))) {
  static get is() {
    return "vaadin-form-layout";
  }
  static get styles() {
    return formLayoutStyles;
  }
  /** @protected */
  render() {
    return html`
      <div id="layout">
        <slot id="slot"></slot>
      </div>
    `;
  }
}
defineCustomElement(FormLayout);
/**
 * @license
 * Copyright (c) 2018 - 2026 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const formItemStyles = css`
  :host {
    /* By default, when auto-responsive mode is disabled, labels should be displayed beside the fields. */
    --_form-item-labels-above: ' '; /* false */
    --_form-item-labels-aside: initial; /* true */

    align-items: var(--_form-item-labels-aside, baseline);
    display: inline-flex;
    flex-flow: var(--_form-item-labels-above, column) nowrap;
    justify-self: stretch;
  }

  :host([label-position='top']) {
    --_form-item-labels-above: initial; /* true */
    --_form-item-labels-aside: ' '; /* false */
  }

  :host([hidden]) {
    display: none !important;
  }

  [part='label'] {
    color: var(--vaadin-form-item-label-color, var(--vaadin-text-color));
    flex: 0 0 auto;
    font-size: var(--vaadin-form-item-label-font-size, inherit);
    font-weight: var(--vaadin-form-item-label-font-weight, 500);
    line-height: var(--vaadin-form-item-label-line-height, inherit);
    width: var(--_form-item-labels-aside, var(--_label-width, 8em));
    word-break: break-word;
  }

  #spacing {
    flex: 0 0 auto;
    width: var(--_label-spacing, 1em);
  }

  #content {
    flex: 1 1 auto;
    min-width: 0;
  }

  #content ::slotted(.full-width) {
    box-sizing: border-box;
    min-width: 0;
    width: 100%;
  }
`;
/**
 * @license
 * Copyright (c) 2017 - 2026 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const FormItemMixin = (superClass) => class extends superClass {
  constructor() {
    super();
    this.__onFieldInteraction = this.__onFieldInteraction.bind(this);
    this.__fieldNodeObserver = new MutationObserver(() => this.__synchronizeAttributes());
    this.__labelNode = null;
    this.__fieldNode = null;
    this.__isFieldDirty = false;
  }
  /** @protected */
  ready() {
    super.ready();
  }
  /**
   * Returns a target element to add ARIA attributes to for a field.
   *
   * - For Vaadin field components, the method returns an element
   * obtained through the `ariaTarget` property defined in `FieldMixin`.
   * - In other cases, the method returns the field element itself.
   *
   * @param {HTMLElement} field
   * @protected
   */
  _getFieldAriaTarget(field2) {
    return field2.ariaTarget || field2;
  }
  /**
   * Links the label to a field by adding the label id to
   * the `aria-labelledby` attribute of the field's ARIA target element.
   *
   * @param {HTMLElement} field
   * @private
   */
  __linkLabelToField(field2) {
    addValueToAttribute(this._getFieldAriaTarget(field2), "aria-labelledby", this.__labelId);
  }
  /**
   * Unlinks the label from a field by removing the label id from
   * the `aria-labelledby` attribute of the field's ARIA target element.
   *
   * @param {HTMLElement} field
   * @private
   */
  __unlinkLabelFromField(field2) {
    removeValueFromAttribute(this._getFieldAriaTarget(field2), "aria-labelledby", this.__labelId);
  }
  /** @private */
  __onLabelClick() {
    const fieldNode = this.__fieldNode;
    if (fieldNode) {
      fieldNode.focus({ focusVisible: false });
      fieldNode.click();
    }
  }
  /**
   * A `slotchange` event handler for the label slot.
   *
   * - Ensures the label id is only assigned to the first label node.
   * - Ensures the label node is linked to the first field node via the `aria-labelledby` attribute
   * if both nodes are provided, and unlinked otherwise.
   *
   * @private
   */
  __onLabelSlotChange() {
    if (this.__labelNode) {
      this.__labelNode = null;
      if (this.__fieldNode) {
        this.__unlinkLabelFromField(this.__fieldNode);
      }
    }
    const newLabelNode = this.$.labelSlot.assignedElements()[0];
    if (newLabelNode) {
      this.__labelNode = newLabelNode;
      if (this.__labelNode.id) {
        this.__labelId = this.__labelNode.id;
      } else {
        this.__labelId = `label-${this.localName}-${generateUniqueId()}`;
        this.__labelNode.id = this.__labelId;
      }
      if (this.__fieldNode) {
        this.__linkLabelToField(this.__fieldNode);
      }
    }
  }
  /**
   * A `slotchange` event handler for the content slot.
   *
   * - Ensures the label node is only linked to the first field node via the `aria-labelledby` attribute.
   * - Sets up an observer for the `required` attribute changes on the first field
   * to reflect the attribute on the component. Ensures the observer is disconnected from the field
   * as soon as it is removed or replaced by another one.
   *
   * @private
   */
  __onContentSlotChange() {
    if (this.__fieldNode) {
      this.__unlinkLabelFromField(this.__fieldNode);
      this.__fieldNodeObserver.disconnect();
      this.__fieldNode.removeEventListener("blur", this.__onFieldInteraction);
      this.__fieldNode.removeEventListener("change", this.__onFieldInteraction);
      this.__fieldNode = null;
      this.__isFieldDirty = false;
    }
    const fieldNodes = this.$.contentSlot.assignedElements();
    if (fieldNodes.length > 1) {
      issueWarning(
        `WARNING: Since Vaadin 23, placing multiple fields directly to a <vaadin-form-item> is deprecated.
Please wrap fields with a <vaadin-custom-field> instead.`
      );
    }
    const newFieldNode = fieldNodes.find((field2) => field2.validate || field2.checkValidity);
    if (newFieldNode) {
      this.__fieldNode = newFieldNode;
      this.__fieldNode.addEventListener("blur", this.__onFieldInteraction);
      this.__fieldNode.addEventListener("change", this.__onFieldInteraction);
      this.__fieldNodeObserver.observe(this.__fieldNode, {
        attributes: true,
        attributeFilter: ["required", "invalid"]
      });
      if (this.__labelNode) {
        this.__linkLabelToField(this.__fieldNode);
      }
    }
    this.__synchronizeAttributes();
  }
  /** @private */
  __onFieldInteraction() {
    this.__isFieldDirty = true;
    this.__synchronizeAttributes();
  }
  /** @private */
  __synchronizeAttributes() {
    const field2 = this.__fieldNode;
    if (!field2) {
      this.removeAttribute("required");
      this.removeAttribute("invalid");
      return;
    }
    this.toggleAttribute("required", field2.hasAttribute("required"));
    this.toggleAttribute(
      "invalid",
      field2.hasAttribute("invalid") || field2.matches(":invalid") && this.__isFieldDirty
    );
  }
};
/**
 * @license
 * Copyright (c) 2017 - 2026 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
class FormItem extends FormItemMixin(ThemableMixin(PolylitMixin(LumoInjectionMixin(LitElement)))) {
  static get is() {
    return "vaadin-form-item";
  }
  static get styles() {
    return formItemStyles;
  }
  static get lumoInjector() {
    return { ...super.lumoInjector, includeBaseStyles: true };
  }
  /** @protected */
  render() {
    return html`
      <div id="label" part="label" @click="${this.__onLabelClick}">
        <slot name="label" id="labelSlot" @slotchange="${this.__onLabelSlotChange}"></slot>
        <span part="required-indicator" aria-hidden="true"></span>
      </div>
      <div id="spacing"></div>
      <div id="content">
        <slot id="contentSlot" @slotchange="${this.__onContentSlotChange}"></slot>
      </div>
    `;
  }
}
defineCustomElement(FormItem);
/**
 * @license
 * Copyright (c) 2018 - 2026 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const formRowStyles = css`
  :host {
    display: contents;
  }

  :host([hidden]) {
    display: none !important;
  }

  ::slotted(*) {
    /* Make form items inherit label position from the layout */
    --_form-item-labels-above: inherit;
    --_form-item-labels-aside: inherit;

    grid-column: auto / span min(var(--_grid-colspan, 1), var(--_grid-rendered-column-count));
  }

  ::slotted(:first-child) {
    grid-column-start: 1;
  }
`;
/**
 * @license
 * Copyright (c) 2017 - 2026 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
class FormRow extends ThemableMixin(PolylitMixin(LitElement)) {
  static get is() {
    return "vaadin-form-row";
  }
  static get styles() {
    return formRowStyles;
  }
  static get lumoInjector() {
    return { ...super.lumoInjector, includeBaseStyles: true };
  }
  /** @protected */
  render() {
    return html`<slot></slot>`;
  }
}
defineCustomElement(FormRow);
/**
 * @license
 * Copyright (c) 2016 - 2026 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const GridColumnGroupMixin = (superClass) => class extends ColumnBaseMixin(superClass) {
  static get properties() {
    return {
      /** @private */
      _childColumns: {
        value() {
          return this._getChildColumns(this);
        }
      },
      /**
       * Flex grow ratio for the column group as the sum of the ratios of its child columns.
       * @attr {number} flex-grow
       */
      flexGrow: {
        type: Number,
        readOnly: true,
        sync: true
      },
      /**
       * Width of the column group as the sum of the widths of its child columns.
       */
      width: {
        type: String,
        readOnly: true,
        sync: true
      },
      /** @private */
      _visibleChildColumns: Array,
      /** @private */
      _colSpan: Number,
      /** @private */
      _rootColumns: Array
    };
  }
  static get observers() {
    return [
      "_groupFrozenChanged(frozen, _rootColumns)",
      "_groupFrozenToEndChanged(frozenToEnd, _rootColumns)",
      "_groupHiddenChanged(hidden)",
      "_colSpanChanged(_colSpan, _headerCell, _footerCell)",
      "_groupOrderChanged(_order, _rootColumns)",
      "_groupReorderStatusChanged(_reorderStatus, _rootColumns)",
      "_groupResizableChanged(resizable, _rootColumns)"
    ];
  }
  /** @protected */
  connectedCallback() {
    super.connectedCallback();
    this._addNodeObserver();
    this._updateFlexAndWidth();
  }
  /** @protected */
  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._observer) {
      this._observer.disconnect();
    }
  }
  /**
   * @param {string} path
   * @param {unknown=} value
   * @protected
   */
  _columnPropChanged(path, value) {
    if (path === "hidden") {
      this._preventHiddenSynchronization = true;
      this._updateVisibleChildColumns(this._childColumns);
      this._preventHiddenSynchronization = false;
    }
    if (/flexGrow|width|hidden|_childColumns/u.test(path)) {
      this._updateFlexAndWidth();
    }
    if (path === "frozen" && !this.frozen) {
      this.frozen = value;
    }
    if (path === "lastFrozen" && !this._lastFrozen) {
      this._lastFrozen = value;
    }
    if (path === "frozenToEnd" && !this.frozenToEnd) {
      this.frozenToEnd = value;
    }
    if (path === "firstFrozenToEnd" && !this._firstFrozenToEnd) {
      this._firstFrozenToEnd = value;
    }
  }
  /** @private */
  _groupOrderChanged(order, rootColumns) {
    if (rootColumns) {
      const _rootColumns = rootColumns.slice(0);
      if (!order) {
        _rootColumns.forEach((column) => {
          column._order = 0;
        });
        return;
      }
      const trailingZeros = /(0+)$/u.exec(order).pop().length;
      const childCountDigits = ~~(Math.log(rootColumns.length) / Math.LN10) + 1;
      const scope = 10 ** (trailingZeros - childCountDigits);
      if (_rootColumns[0] && _rootColumns[0]._order) {
        _rootColumns.sort((a, b) => a._order - b._order);
      }
      updateColumnOrders(_rootColumns, scope, order);
    }
  }
  /** @private */
  _groupReorderStatusChanged(reorderStatus, rootColumns) {
    if (reorderStatus === void 0 || rootColumns === void 0) {
      return;
    }
    rootColumns.forEach((column) => {
      column._reorderStatus = reorderStatus;
    });
  }
  /** @private */
  _groupResizableChanged(resizable, rootColumns) {
    if (resizable === void 0 || rootColumns === void 0) {
      return;
    }
    rootColumns.forEach((column) => {
      column.resizable = resizable;
    });
  }
  /** @private */
  _updateVisibleChildColumns(childColumns) {
    this._visibleChildColumns = Array.prototype.filter.call(childColumns, (col) => !col.hidden);
    this._colSpan = this._visibleChildColumns.length;
    this._updateAutoHidden();
  }
  /** @protected */
  _updateFlexAndWidth() {
    if (!this._visibleChildColumns) {
      return;
    }
    if (this._visibleChildColumns.length > 0) {
      const width = this._visibleChildColumns.reduce((prev, curr) => {
        prev += ` + ${(curr.width || "0px").replace("calc", "")}`;
        return prev;
      }, "").substring(3);
      this._setWidth(`calc(${width})`);
    } else {
      this._setWidth("0px");
    }
    this._setFlexGrow(
      Array.prototype.reduce.call(this._visibleChildColumns, (prev, curr) => prev + curr.flexGrow, 0)
    );
  }
  /**
   * This method is called before the group's frozen value is being propagated to the child columns.
   * In case some of the child columns are frozen, while others are not, the non-frozen ones
   * will get automatically frozen as well. As this may sometimes be unintended, this method
   * shows a warning in the console in such cases.
   * @private
   */
  __scheduleAutoFreezeWarning(columns, frozenProp) {
    if (this._grid) {
      const frozenAttr = frozenProp.replace(/([A-Z])/gu, "-$1").toLowerCase();
      const firstColumnFrozen = columns[0][frozenProp] || columns[0].hasAttribute(frozenAttr);
      const allSameFrozen = columns.every((column) => {
        return (column[frozenProp] || column.hasAttribute(frozenAttr)) === firstColumnFrozen;
      });
      if (!allSameFrozen) {
        this._grid.__autoFreezeWarningDebouncer = Debouncer.debounce(
          this._grid.__autoFreezeWarningDebouncer,
          animationFrame,
          () => {
            console.warn(
              `WARNING: Joining ${frozenProp} and non-${frozenProp} Grid columns inside the same column group! This will automatically freeze all the joined columns to avoid rendering issues. If this was intentional, consider marking each joined column explicitly as ${frozenProp}. Otherwise, exclude the ${frozenProp} columns from the joined group.`
            );
          }
        );
      }
    }
  }
  /** @private */
  _groupFrozenChanged(frozen, rootColumns) {
    if (rootColumns === void 0 || frozen === void 0) {
      return;
    }
    if (frozen !== false) {
      this.__scheduleAutoFreezeWarning(rootColumns, "frozen");
      Array.from(rootColumns).forEach((col) => {
        col.frozen = frozen;
      });
    }
  }
  /** @private */
  _groupFrozenToEndChanged(frozenToEnd, rootColumns) {
    if (rootColumns === void 0 || frozenToEnd === void 0) {
      return;
    }
    if (frozenToEnd !== false) {
      this.__scheduleAutoFreezeWarning(rootColumns, "frozenToEnd");
      Array.from(rootColumns).forEach((col) => {
        col.frozenToEnd = frozenToEnd;
      });
    }
  }
  /** @private */
  _groupHiddenChanged(hidden) {
    if (hidden || this.__groupHiddenInitialized) {
      this._synchronizeHidden();
    }
    this.__groupHiddenInitialized = true;
  }
  /** @private */
  _updateAutoHidden() {
    const wasAutoHidden = this._autoHidden;
    this._autoHidden = (this._visibleChildColumns || []).length === 0;
    if (wasAutoHidden || this._autoHidden) {
      this.hidden = this._autoHidden;
    }
  }
  /** @private */
  _synchronizeHidden() {
    if (this._childColumns && !this._preventHiddenSynchronization) {
      this._childColumns.forEach((column) => {
        column.hidden = this.hidden;
      });
    }
  }
  /** @private */
  _colSpanChanged(colSpan, headerCell, footerCell) {
    if (headerCell) {
      headerCell.setAttribute("colspan", colSpan);
      if (this._grid) {
        this._grid.__a11yUpdateCellColspan(headerCell, colSpan);
      }
    }
    if (footerCell) {
      footerCell.setAttribute("colspan", colSpan);
      if (this._grid) {
        this._grid.__a11yUpdateCellColspan(footerCell, colSpan);
      }
    }
  }
  /**
   * @param {!GridColumnGroup} el
   * @return {!Array<!GridColumn>}
   * @protected
   */
  _getChildColumns(el) {
    return ColumnObserver.getColumns(el);
  }
  /** @private */
  _addNodeObserver() {
    this._observer = new ColumnObserver(this, () => {
      this._preventHiddenSynchronization = true;
      this._rootColumns = this._getChildColumns(this);
      this._childColumns = this._rootColumns;
      this._updateVisibleChildColumns(this._childColumns);
      this._preventHiddenSynchronization = false;
      if (this._grid && this._grid._debounceUpdateColumnTree) {
        this._grid._debounceUpdateColumnTree();
      }
    });
    this._observer.flush();
  }
  /**
   * @param {!Node} node
   * @return {boolean}
   * @protected
   */
  _isColumnElement(node) {
    return node.nodeType === Node.ELEMENT_NODE && /\bcolumn\b/u.test(node.localName);
  }
};
/**
 * @license
 * Copyright (c) 2016 - 2026 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
class GridColumnGroup extends GridColumnGroupMixin(PolylitMixin(LitElement)) {
  static get is() {
    return "vaadin-grid-column-group";
  }
}
defineCustomElement(GridColumnGroup);
/**
 * @license
 * Copyright (c) 2016 - 2026 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const gridSorterStyles = css`
  :host {
    display: inline-flex;
    align-items: center;
    cursor: pointer;
    max-width: 100%;
    gap: var(--vaadin-gap-s);
    -webkit-user-select: none;
    user-select: none;
    -webkit-tap-highlight-color: transparent;
  }

  [part='content'] {
    flex: 1 1 auto;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  [part='indicators'] {
    position: relative;
    flex: none;
    height: 1lh;
    color: var(--vaadin-text-color-disabled);
  }

  [part='order'] {
    display: inline;
    vertical-align: super;
    font-size: 0.75em;
    line-height: 1;
    color: var(--vaadin-text-color-secondary);
  }

  [part='indicators']::before {
    content: '';
    display: inline-block;
    height: 12px;
    width: 8px;
    mask-image: var(--_vaadin-icon-sort);
    background: currentColor;
  }

  :host([direction]) [part='indicators']::before {
    padding-bottom: 6px;
    height: 6px;
    mask-clip: content-box;
  }

  :host([direction='desc']) [part='indicators']::before {
    padding-block: 6px 0;
  }

  :host([direction]) [part='indicators'] {
    color: var(--vaadin-text-color-secondary);
  }

  @media (any-hover: hover) {
    :host(:hover) [part='indicators'] {
      color: var(--vaadin-text-color);
    }
  }

  @media (forced-colors: active) {
    [part='indicators']::before {
      background: CanvasText;
    }
  }
`;
/**
 * @license
 * Copyright (c) 2016 - 2026 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const GridSorterMixin = (superClass) => class GridSorterMixinClass extends superClass {
  static get properties() {
    return {
      /**
       * JS Path of the property in the item used for sorting the data.
       */
      path: {
        type: String
      },
      /**
       * How to sort the data.
       * Possible values are `asc` to use an ascending algorithm, `desc` to sort the data in
       * descending direction, or `null` for not sorting the data.
       */
      direction: {
        type: String,
        reflectToAttribute: true,
        notify: true,
        value: null,
        sync: true
      },
      /**
       * @type {number | null}
       * @protected
       */
      _order: {
        type: Number,
        value: null,
        sync: true
      }
    };
  }
  static get observers() {
    return ["_pathOrDirectionChanged(path, direction)"];
  }
  /** @protected */
  ready() {
    super.ready();
    this.addEventListener("click", this._onClick.bind(this));
  }
  /** @protected */
  connectedCallback() {
    super.connectedCallback();
    if (this._grid) {
      this._grid.__applySorters();
    } else {
      this.__dispatchSorterChangedEvenIfPossible();
    }
  }
  /** @protected */
  disconnectedCallback() {
    super.disconnectedCallback();
    if (!this.parentNode && this._grid) {
      this._grid.__removeSorters([this]);
    } else if (this._grid) {
      this._grid.__applySorters();
    }
  }
  /** @private */
  _pathOrDirectionChanged() {
    this.__dispatchSorterChangedEvenIfPossible();
  }
  /** @private */
  __dispatchSorterChangedEvenIfPossible() {
    if (this.path === void 0 || this.direction === void 0 || !this.isConnected) {
      return;
    }
    this.dispatchEvent(
      new CustomEvent("sorter-changed", {
        detail: { shiftClick: Boolean(this._shiftClick), fromSorterClick: Boolean(this._fromSorterClick) },
        bubbles: true,
        composed: true
      })
    );
    this._fromSorterClick = false;
    this._shiftClick = false;
  }
  /** @private */
  _getDisplayOrder(order) {
    return order === null ? "" : order + 1;
  }
  /** @private */
  _onClick(e) {
    if (e.defaultPrevented) {
      return;
    }
    const activeElement = this.getRootNode().activeElement;
    if (this !== activeElement && this.contains(activeElement)) {
      return;
    }
    e.preventDefault();
    this._shiftClick = e.shiftKey;
    this._fromSorterClick = true;
    if (this.direction === "asc") {
      this.direction = "desc";
    } else if (this.direction === "desc") {
      this.direction = null;
    } else {
      this.direction = "asc";
    }
  }
};
/**
 * @license
 * Copyright (c) 2016 - 2026 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
class GridSorter extends GridSorterMixin(ThemableMixin(DirMixin(PolylitMixin(LumoInjectionMixin(LitElement))))) {
  static get is() {
    return "vaadin-grid-sorter";
  }
  static get styles() {
    return gridSorterStyles;
  }
  /** @protected */
  render() {
    return html`
      <div part="content">
        <slot></slot>
      </div>
      <div part="indicators">
        <span part="order">${this._getDisplayOrder(this._order)}</span>
      </div>
    `;
  }
}
defineCustomElement(GridSorter);
/**
 * @license
 * Copyright (c) 2016 - 2026 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const GridSelectionColumnBaseMixin = (superClass) => class GridSelectionColumnBaseMixin extends superClass {
  static get properties() {
    return {
      /**
       * Width of the cells for this column.
       */
      width: {
        type: String,
        value: "58px",
        sync: true
      },
      /**
       * Override `autoWidth` to enable auto-width
       */
      autoWidth: {
        type: Boolean,
        value: true
      },
      /**
       * Flex grow ratio for the cell widths. When set to 0, cell width is fixed.
       * @attr {number} flex-grow
       */
      flexGrow: {
        type: Number,
        value: 0,
        sync: true
      },
      /**
       * When true, all the items are selected.
       * @attr {boolean} select-all
       */
      selectAll: {
        type: Boolean,
        value: false,
        notify: true,
        sync: true
      },
      /**
       * When true, the active item gets automatically selected.
       * @attr {boolean} auto-select
       */
      autoSelect: {
        type: Boolean,
        value: false,
        sync: true
      },
      /**
       * When true, rows can be selected by dragging over the selection column.
       * @attr {boolean} drag-select
       */
      dragSelect: {
        type: Boolean,
        value: false,
        sync: true
      },
      /** @protected */
      _indeterminate: {
        type: Boolean,
        sync: true
      },
      /** @protected */
      _selectAllHidden: Boolean,
      /**
       * Indicates whether the shift key is currently pressed.
       *
       * @protected
       */
      _shiftKeyDown: {
        type: Boolean,
        value: false
      }
    };
  }
  static get observers() {
    return [
      "_onHeaderRendererOrBindingChanged(_headerRenderer, _headerCell, path, header, selectAll, _indeterminate, _selectAllHidden)"
    ];
  }
  constructor() {
    super();
    this.__onCellTrack = this.__onCellTrack.bind(this);
    this.__onCellClick = this.__onCellClick.bind(this);
    this.__onCellMouseDown = this.__onCellMouseDown.bind(this);
    this.__onGridInteraction = this.__onGridInteraction.bind(this);
    this.__onActiveItemChanged = this.__onActiveItemChanged.bind(this);
    this.__onTouchStart = this.__onTouchStart.bind(this);
    this.__onSelectRowCheckboxChange = this.__onSelectRowCheckboxChange.bind(this);
    this.__onSelectAllCheckboxChange = this.__onSelectAllCheckboxChange.bind(this);
  }
  /** @protected */
  connectedCallback() {
    super.connectedCallback();
    if (this._grid) {
      this._grid.addEventListener("keyup", this.__onGridInteraction);
      this._grid.addEventListener("keydown", this.__onGridInteraction, { capture: true });
      this._grid.addEventListener("mousedown", this.__onGridInteraction);
      this._grid.addEventListener("active-item-changed", this.__onActiveItemChanged);
      this._grid.addEventListener("touchstart", this.__onTouchStart);
    }
  }
  /** @protected */
  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._grid) {
      this._grid.removeEventListener("keyup", this.__onGridInteraction);
      this._grid.removeEventListener("keydown", this.__onGridInteraction, { capture: true });
      this._grid.removeEventListener("mousedown", this.__onGridInteraction);
      this._grid.removeEventListener("active-item-changed", this.__onActiveItemChanged);
      this._grid.removeEventListener("touchstart", this.__onTouchStart);
    }
  }
  /**
   * Renders the Select All checkbox to the header cell.
   *
   * @override
   */
  _defaultHeaderRenderer(root, _column) {
    let checkbox = root.firstElementChild;
    if (!checkbox) {
      checkbox = document.createElement("vaadin-checkbox");
      checkbox.accessibleName = "Select All";
      checkbox.classList.add("vaadin-grid-select-all-checkbox");
      checkbox.addEventListener("change", this.__onSelectAllCheckboxChange);
      root.appendChild(checkbox);
    }
    const checked = this.__isChecked(this.selectAll, this._indeterminate);
    checkbox.checked = checked;
    checkbox.indeterminate = this._indeterminate;
    checkbox.style.visibility = this._selectAllHidden ? "hidden" : "";
  }
  /**
   * Renders the Select Row checkbox to the body cell.
   *
   * @override
   */
  _defaultRenderer(root, _column, { item, selected }) {
    let checkbox = root.firstElementChild;
    if (!checkbox) {
      checkbox = document.createElement("vaadin-checkbox");
      checkbox.accessibleName = "Select Row";
      checkbox.addEventListener("change", this.__onSelectRowCheckboxChange);
      root.appendChild(checkbox);
      addListener(root, "track", this.__onCellTrack);
      setTouchAction(root, "pinch-zoom");
      root.addEventListener("mousedown", this.__onCellMouseDown);
      root.addEventListener("click", this.__onCellClick);
    }
    checkbox.__item = item;
    checkbox.checked = selected;
    const isSelectable = this._grid.__isItemSelectable(item);
    checkbox.readonly = !isSelectable;
    const isHidden = !isSelectable && !selected;
    checkbox.style.visibility = isHidden ? "hidden" : "";
  }
  /**
   * Updates the select all state when the Select All checkbox is switched.
   * The listener handles only user-fired events.
   *
   * @private
   */
  __onSelectAllCheckboxChange(e) {
    if (this._indeterminate || e.currentTarget.checked) {
      this._selectAll();
    } else {
      this._deselectAll();
    }
  }
  /** @private */
  __onGridInteraction(e) {
    this._shiftKeyDown = e.shiftKey;
    if (this.autoSelect) {
      this._grid.$.scroller.toggleAttribute("range-selecting", this._shiftKeyDown);
    }
  }
  /**
   * Selects or deselects the row when the Select Row checkbox is switched.
   * The listener handles only user-fired events.
   *
   * @private
   */
  __onSelectRowCheckboxChange(e) {
    this.__toggleItem(e.currentTarget.__item, e.currentTarget.checked);
  }
  /** @private */
  __onCellTrack(event) {
    if (!this.dragSelect) {
      return;
    }
    this.__dragCurrentY = event.detail.y;
    this.__dragDy = event.detail.dy;
    if (event.detail.state === "start") {
      if (this.__multiTouchActive) {
        return;
      }
      const renderedRows = this._grid._getRenderedRows();
      const dragStartRow = renderedRows.find((row) => row.contains(event.currentTarget.assignedSlot));
      this.__selectOnDrag = !this._grid._isSelected(dragStartRow._item);
      this.__dragStartIndex = dragStartRow.index;
      this.__dragStartItem = dragStartRow._item;
      this.__dragAutoScroller();
    } else if (event.detail.state === "end") {
      if (this.__dragStartItem) {
        this.__toggleItem(this.__dragStartItem, this.__selectOnDrag);
      }
      setTimeout(() => {
        this.__dragStartIndex = void 0;
      });
    }
  }
  /** @private */
  __onCellMouseDown(e) {
    if (this.dragSelect) {
      e.preventDefault();
    }
  }
  /** @private */
  __onTouchStart(e) {
    if (e.touches.length > 1) {
      this.__multiTouchActive = true;
      this.__dragStartIndex = void 0;
      this.__dragStartItem = void 0;
    } else {
      this.__multiTouchActive = false;
    }
  }
  /** @private */
  __onCellClick(e) {
    if (this.__dragStartIndex !== void 0) {
      e.preventDefault();
    }
  }
  /** @private */
  _onCellKeyDown(e) {
    const target = e.composedPath()[0];
    if (e.keyCode !== 32) {
      return;
    }
    if (target === this._headerCell) {
      if (this.selectAll) {
        this._deselectAll();
      } else {
        this._selectAll();
      }
    } else if (this._cells.includes(target) && !this.autoSelect) {
      const checkbox = target._content.firstElementChild;
      this.__toggleItem(checkbox.__item);
    }
  }
  /** @private */
  __onActiveItemChanged(e) {
    const activeItem = e.detail.value;
    if (this.autoSelect) {
      const item = activeItem || this.__previousActiveItem;
      if (item) {
        this.__toggleItem(item);
      }
    }
    this.__previousActiveItem = activeItem;
  }
  /** @private */
  __dragAutoScroller() {
    if (this.__dragStartIndex === void 0) {
      return;
    }
    const renderedRows = this._grid._getRenderedRows();
    const hoveredRow = renderedRows.find((row) => {
      const rowRect = row.getBoundingClientRect();
      return this.__dragCurrentY >= rowRect.top && this.__dragCurrentY <= rowRect.bottom;
    });
    let hoveredIndex = hoveredRow ? hoveredRow.index : void 0;
    const scrollableArea = this.__getScrollableArea();
    if (this.__dragCurrentY < scrollableArea.top) {
      hoveredIndex = this._grid._firstVisibleIndex;
    } else if (this.__dragCurrentY > scrollableArea.bottom) {
      hoveredIndex = this._grid._lastVisibleIndex;
    }
    if (hoveredIndex !== void 0) {
      renderedRows.forEach((row) => {
        if (hoveredIndex > this.__dragStartIndex && row.index >= this.__dragStartIndex && row.index <= hoveredIndex || hoveredIndex < this.__dragStartIndex && row.index <= this.__dragStartIndex && row.index >= hoveredIndex) {
          this.__toggleItem(row._item, this.__selectOnDrag);
          this.__dragStartItem = void 0;
        }
      });
    }
    const scrollTriggerArea = scrollableArea.height * 0.15;
    const maxScrollAmount = 10;
    if (this.__dragDy < 0 && this.__dragCurrentY < scrollableArea.top + scrollTriggerArea) {
      const dy = scrollableArea.top + scrollTriggerArea - this.__dragCurrentY;
      const percentage = Math.min(1, dy / scrollTriggerArea);
      this._grid.$.table.scrollTop -= percentage * maxScrollAmount;
    }
    if (this.__dragDy > 0 && this.__dragCurrentY > scrollableArea.bottom - scrollTriggerArea) {
      const dy = this.__dragCurrentY - (scrollableArea.bottom - scrollTriggerArea);
      const percentage = Math.min(1, dy / scrollTriggerArea);
      this._grid.$.table.scrollTop += percentage * maxScrollAmount;
    }
    setTimeout(() => this.__dragAutoScroller(), 10);
  }
  /**
   * Gets the scrollable area of the grid as a bounding client rect. The
   * scrollable area is the bounding rect of the grid minus the header and
   * footer.
   *
   * @private
   */
  __getScrollableArea() {
    const gridRect = this._grid.$.table.getBoundingClientRect();
    const headerRect = this._grid.$.header.getBoundingClientRect();
    const footerRect = this._grid.$.footer.getBoundingClientRect();
    return {
      top: gridRect.top + headerRect.height,
      bottom: gridRect.bottom - footerRect.height,
      left: gridRect.left,
      right: gridRect.right,
      height: gridRect.height - headerRect.height - footerRect.height,
      width: gridRect.width
    };
  }
  /**
   * Override to handle the user selecting all items.
   * @protected
   */
  _selectAll() {
  }
  /**
   * Override to handle the user deselecting all items.
   * @protected
   */
  _deselectAll() {
  }
  /**
   * Override to handle the user selecting an item.
   * @param {Object} item the item to select
   * @protected
   */
  _selectItem(_item) {
  }
  /**
   * Override to handle the user deselecting an item.
   * @param {Object} item the item to deselect
   * @protected
   */
  _deselectItem(_item) {
  }
  /**
   * Toggles the selected state of the given item.
   *
   * @param item the item to toggle
   * @param {boolean} [selected] whether to select or deselect the item
   * @private
   */
  __toggleItem(item, selected = !this._grid._isSelected(item)) {
    if (selected === this._grid._isSelected(item)) {
      return;
    }
    if (selected) {
      this._selectItem(item);
    } else {
      this._deselectItem(item);
    }
  }
  /**
   * IOS needs indeterminate + checked at the same time
   * @private
   */
  __isChecked(selectAll, indeterminate) {
    return indeterminate || selectAll;
  }
};
class GridFlowSelectionColumn extends GridSelectionColumnBaseMixin(GridColumn) {
  static get is() {
    return "vaadin-grid-flow-selection-column";
  }
  static get properties() {
    return {
      /**
       * Override property to enable auto-width
       */
      autoWidth: {
        type: Boolean,
        value: true
      },
      /**
       * Override property to set custom width
       */
      width: {
        type: String,
        value: "56px"
      }
    };
  }
  /**
   * Override method from `GridSelectionColumnBaseMixin` to add ID to select all
   * checkbox
   *
   * @override
   */
  _defaultHeaderRenderer(root, _column) {
    super._defaultHeaderRenderer(root, _column);
    const checkbox = root.firstElementChild;
    if (checkbox) {
      checkbox.id = "selectAllCheckbox";
    }
  }
  /**
   * Override a method from `GridSelectionColumnBaseMixin` to handle the user
   * selecting all items.
   *
   * @protected
   * @override
   */
  _selectAll() {
    this.selectAll = true;
    this.$server.selectAll();
  }
  /**
   * Override a method from `GridSelectionColumnBaseMixin` to handle the user
   * deselecting all items.
   *
   * @protected
   * @override
   */
  _deselectAll() {
    this.selectAll = false;
    this.$server.deselectAll();
  }
  /**
   * Override a method from `GridSelectionColumnBaseMixin` to handle the user
   * selecting an item.
   *
   * @param {Object} item the item to select
   * @protected
   * @override
   */
  _selectItem(item) {
    this.$server.setShiftKeyDown(this._shiftKeyDown);
    this._grid.$connector.doSelection([item], true);
  }
  /**
   * Override a method from `GridSelectionColumnBaseMixin` to handle the user
   * deselecting an item.
   *
   * @param {Object} item the item to deselect
   * @protected
   * @override
   */
  _deselectItem(item) {
    this.$server.setShiftKeyDown(this._shiftKeyDown);
    this._grid.$connector.doDeselection([item], true);
    this.selectAll = false;
  }
}
customElements.define(GridFlowSelectionColumn.is, GridFlowSelectionColumn);
window.Vaadin.Flow.gridConnector = {};
window.Vaadin.Flow.gridConnector.initLazy = (grid) => {
  if (grid.$connector) {
    return;
  }
  const dataProviderController = grid._dataProviderController;
  let cache = {};
  const rootRequestDelay = 150;
  let rootRequestDebouncer;
  let lastRequestedRange = [0, 0];
  const validSelectionModes = ["SINGLE", "NONE", "MULTI"];
  let selectedKeys = {};
  let selectionMode = "SINGLE";
  let sorterDirectionsSetFromServer = false;
  grid.size = 0;
  grid.itemIdPath = "key";
  grid.$connector = {};
  grid.$connector.hasRootRequestQueue = () => {
    const { pendingRequests } = dataProviderController.rootCache;
    return Object.keys(pendingRequests).length > 0 || !!rootRequestDebouncer?.isActive();
  };
  grid.$connector.doSelection = function(items, userOriginated) {
    if (selectionMode === "NONE" || !items.length || userOriginated && grid.hasAttribute("disabled")) {
      return;
    }
    if (selectionMode === "SINGLE") {
      selectedKeys = {};
    }
    let selectedItemsChanged = false;
    items.forEach((item) => {
      const selectable = !userOriginated || grid.isItemSelectable(item);
      selectedItemsChanged = selectedItemsChanged || selectable;
      if (item && selectable) {
        selectedKeys[item.key] = item;
        item.selected = true;
        if (userOriginated) {
          grid.$server.select(item.key);
        }
      }
      const isSelectedItemDifferentOrNull = !grid.activeItem || !item || item.key != grid.activeItem.key;
      if (!userOriginated && selectionMode === "SINGLE" && isSelectedItemDifferentOrNull) {
        grid.activeItem = item;
      }
    });
    if (selectedItemsChanged) {
      grid.selectedItems = Object.values(selectedKeys);
    }
  };
  grid.$connector.doDeselection = function(items, userOriginated) {
    if (selectionMode === "NONE" || !items.length || userOriginated && grid.hasAttribute("disabled")) {
      return;
    }
    const updatedSelectedItems = grid.selectedItems.slice();
    while (items.length) {
      const itemToDeselect = items.shift();
      const selectable = !userOriginated || grid.isItemSelectable(itemToDeselect);
      if (!selectable) {
        continue;
      }
      for (let i = 0; i < updatedSelectedItems.length; i++) {
        const selectedItem = updatedSelectedItems[i];
        if (itemToDeselect?.key === selectedItem.key) {
          updatedSelectedItems.splice(i, 1);
          break;
        }
      }
      if (itemToDeselect) {
        delete selectedKeys[itemToDeselect.key];
        delete itemToDeselect.selected;
        if (userOriginated) {
          grid.$server.deselect(itemToDeselect.key);
        }
      }
    }
    grid.selectedItems = updatedSelectedItems;
  };
  grid.__activeItemChanged = function(newVal, oldVal) {
    if (selectionMode != "SINGLE") {
      return;
    }
    if (!newVal) {
      if (oldVal && selectedKeys[oldVal.key]) {
        if (grid.__deselectDisallowed) {
          grid.activeItem = oldVal;
        } else {
          oldVal = dataProviderController.getItemContext(oldVal).item;
          grid.$connector.doDeselection([oldVal], true);
        }
      }
    } else if (!selectedKeys[newVal.key]) {
      grid.$connector.doSelection([newVal], true);
    }
  };
  grid._createPropertyObserver("activeItem", "__activeItemChanged", true);
  grid.__activeItemChangedDetails = function(newVal, oldVal) {
    if (grid.__disallowDetailsOnClick) {
      return;
    }
    if (newVal == null && oldVal === void 0) {
      return;
    }
    if (newVal && !newVal.detailsOpened) {
      grid.$server.setDetailsVisible(newVal.key);
    } else {
      grid.$server.setDetailsVisible(null);
    }
  };
  grid._createPropertyObserver("activeItem", "__activeItemChangedDetails", true);
  grid.$connector.debounceRootRequest = function(page) {
    const delay = grid._hasData ? rootRequestDelay : 0;
    rootRequestDebouncer = Debouncer.debounce(rootRequestDebouncer, timeOut.after(delay), () => {
      grid.$connector.fetchPage((firstIndex, size) => grid.$server.setViewportRange(firstIndex, size), page);
    });
  };
  grid.$connector.fetchPage = function(fetch, page) {
    page = Math.min(page, Math.floor((grid.size - 1) / grid.pageSize));
    const visibleRows = grid._getRenderedRows();
    let start = visibleRows.length > 0 ? visibleRows[0].index : 0;
    let end = visibleRows.length > 0 ? visibleRows[visibleRows.length - 1].index : 0;
    let buffer = end - start;
    start = Math.max(0, start - buffer);
    end = Math.min(end + buffer, grid.size);
    let pageRange = [Math.floor(start / grid.pageSize), Math.floor(end / grid.pageSize)];
    if (page < pageRange[0] || page > pageRange[1]) {
      pageRange = [page, page];
    }
    if (lastRequestedRange[0] != pageRange[0] || lastRequestedRange[1] != pageRange[1]) {
      lastRequestedRange = pageRange;
      let pageCount = pageRange[1] - pageRange[0] + 1;
      fetch(pageRange[0] * grid.pageSize, pageCount * grid.pageSize);
    }
  };
  grid.dataProvider = function(params, callback) {
    if (params.pageSize != grid.pageSize) {
      throw "Invalid pageSize";
    }
    let page = params.page;
    if (grid.size === 0) {
      callback([], 0);
      return;
    }
    if (cache[page]) {
      callback(cache[page]);
    } else {
      grid.$connector.debounceRootRequest(page);
    }
  };
  grid.$connector.setSorterDirections = function(directions) {
    sorterDirectionsSetFromServer = true;
    setTimeout(() => {
      try {
        const sorters = Array.from(grid.querySelectorAll("vaadin-grid-sorter"));
        grid._sorters.forEach((sorter) => {
          if (!sorters.includes(sorter)) {
            sorters.push(sorter);
          }
        });
        sorters.forEach((sorter) => {
          sorter.direction = null;
        });
        if (grid.multiSortPriority !== "append") {
          directions = directions.reverse();
        }
        directions.forEach(({ column, direction }) => {
          sorters.forEach((sorter) => {
            if (sorter.getAttribute("path") === column) {
              sorter.direction = direction;
            }
          });
        });
        grid.__applySorters();
      } finally {
        sorterDirectionsSetFromServer = false;
      }
    });
  };
  let preventUpdateVisibleRowsActive = 0;
  function preventUpdateVisibleRows(callback) {
    try {
      preventUpdateVisibleRowsActive++;
      callback();
    } finally {
      preventUpdateVisibleRowsActive--;
    }
  }
  grid.__updateVisibleRows = function(...args) {
    if (preventUpdateVisibleRowsActive === 0) {
      Object.getPrototypeOf(this).__updateVisibleRows.call(this, ...args);
    }
  };
  grid.__updateRow = function(row, ...args) {
    Object.getPrototypeOf(this).__updateRow.call(this, row, ...args);
    if (selectionMode === validSelectionModes[1]) {
      row.removeAttribute("aria-selected");
      Array.from(row.children).forEach((cell) => cell.removeAttribute("aria-selected"));
    }
  };
  const itemsUpdated = function(items) {
    if (!items || !Array.isArray(items)) {
      throw "Attempted to call itemsUpdated with an invalid value: " + JSON.stringify(items);
    }
    let detailsOpenedItems = Array.from(grid.detailsOpenedItems);
    for (let i = 0; i < items.length; ++i) {
      const item = items[i];
      if (!item) {
        continue;
      }
      if (item.detailsOpened) {
        if (grid._getItemIndexInArray(item, detailsOpenedItems) < 0) {
          detailsOpenedItems.push(item);
        }
      } else if (grid._getItemIndexInArray(item, detailsOpenedItems) >= 0) {
        detailsOpenedItems.splice(grid._getItemIndexInArray(item, detailsOpenedItems), 1);
      }
    }
    grid.detailsOpenedItems = detailsOpenedItems;
  };
  const updateGridCache = function(page) {
    const { rootCache } = dataProviderController;
    if (cache[page] && rootCache.pendingRequests[page]) {
      return;
    }
    for (let i = 0; i < grid.pageSize; i++) {
      const index = page * grid.pageSize + i;
      const item = cache[page]?.[i];
      rootCache.items[index] = item;
    }
  };
  grid.$connector.set = function(startIndex, items) {
    items.forEach((item, i) => {
      const index = startIndex + i;
      const page = Math.floor(index / grid.pageSize);
      cache[page] ??= [];
      cache[page][index % grid.pageSize] = item;
    });
    const firstPage = Math.floor(startIndex / grid.pageSize);
    const updatedPageCount = Math.ceil(items.length / grid.pageSize);
    for (let i = 0; i < updatedPageCount; i++) {
      updateGridCache(firstPage + i);
    }
    preventUpdateVisibleRows(() => {
      grid.$connector.doSelection(items.filter((item) => item.selected));
      grid.$connector.doDeselection(items.filter((item) => !item.selected && selectedKeys[item.key]));
      itemsUpdated(items);
    });
    grid.__updateVisibleRows(startIndex, startIndex + items.length - 1);
  };
  const itemToCacheLocation = function(item) {
    for (let page in cache) {
      for (let index in cache[page]) {
        if (grid.getItemId(cache[page][index]) === grid.getItemId(item)) {
          return { page, index };
        }
      }
    }
    return null;
  };
  grid.$connector.updateFlatData = function(updatedItems) {
    const updatedIndexes = [];
    for (let i = 0; i < updatedItems.length; i++) {
      let cacheLocation = itemToCacheLocation(updatedItems[i]);
      if (cacheLocation) {
        cache[cacheLocation.page][cacheLocation.index] = updatedItems[i];
        const index = parseInt(cacheLocation.page) * grid.pageSize + parseInt(cacheLocation.index);
        const { rootCache } = dataProviderController;
        if (rootCache.items[index]) {
          rootCache.items[index] = updatedItems[i];
        }
        updatedIndexes.push(index);
      }
    }
    preventUpdateVisibleRows(() => {
      itemsUpdated(updatedItems);
    });
    updatedIndexes.forEach((index) => grid.__updateVisibleRows(index, index));
  };
  grid.$connector.clear = function(index, length) {
    if (!cache || Object.keys(cache).length === 0) {
      return;
    }
    if (index % grid.pageSize != 0) {
      throw "Got cleared data for index " + index + " which is not aligned with the page size of " + grid.pageSize;
    }
    let firstPage = Math.floor(index / grid.pageSize);
    let updatedPageCount = Math.ceil(length / grid.pageSize);
    for (let i = 0; i < updatedPageCount; i++) {
      let page = firstPage + i;
      let items = cache[page];
      if (items) {
        preventUpdateVisibleRows(() => {
          grid.$connector.doDeselection(items.filter((item) => selectedKeys[item.key]));
          items.forEach((item) => grid.closeItemDetails(item));
        });
        delete cache[page];
        updateGridCache(page);
      }
    }
    grid.__updateVisibleRows(index, index + length - 1);
  };
  grid.$connector.reset = function() {
    cache = {};
    dataProviderController.clearCache();
    lastRequestedRange = [-1, -1];
    rootRequestDebouncer?.cancel();
    grid.__updateVisibleRows();
  };
  grid.$connector.updateSize = (newSize) => grid.size = newSize;
  grid.$connector.updateUniqueItemIdPath = (path) => grid.itemIdPath = path;
  grid.$connector.confirm = function(id) {
    const { pendingRequests } = dataProviderController.rootCache;
    Object.entries(pendingRequests).forEach(([page, callback]) => {
      const lastAvailablePage = grid.size ? Math.ceil(grid.size / grid.pageSize) - 1 : 0;
      const lastRequestedRangeEnd = Math.min(lastRequestedRange[1], lastAvailablePage);
      if (cache[page]) {
        callback(cache[page]);
      } else if (page < lastRequestedRange[0] || +page > lastRequestedRangeEnd) {
        callback(new Array(grid.pageSize));
        grid.requestContentUpdate();
      } else if (callback && grid.size === 0) {
        callback([]);
      }
    });
    if (Object.keys(pendingRequests).length === 0) {
      rootRequestDebouncer?.cancel();
      lastRequestedRange = [-1, -1];
    }
    grid.$server.confirmUpdate(id);
  };
  grid.$connector.setSelectionMode = function(mode) {
    if ((typeof mode === "string" || mode instanceof String) && validSelectionModes.indexOf(mode) >= 0) {
      selectionMode = mode;
      selectedKeys = {};
      grid.selectedItems = [];
      grid.$connector.updateMultiSelectable();
    } else {
      throw "Attempted to set an invalid selection mode";
    }
  };
  grid.$connector.updateMultiSelectable = function() {
    if (!grid.$) {
      return;
    }
    if (selectionMode === validSelectionModes[0]) {
      grid.$.table.setAttribute("aria-multiselectable", false);
    } else if (selectionMode === validSelectionModes[1]) {
      grid.$.table.removeAttribute("aria-multiselectable");
    } else {
      grid.$.table.setAttribute("aria-multiselectable", true);
    }
  };
  grid._createPropertyObserver("isAttached", () => grid.$connector.updateMultiSelectable());
  const singleTimeRenderer = (renderer) => {
    return (root) => {
      if (renderer) {
        renderer(root);
        renderer = null;
      }
    };
  };
  grid.$connector.setHeaderRenderer = function(column, options) {
    const { content, showSorter, sorterPath } = options;
    if (content === null) {
      column.headerRenderer = null;
      return;
    }
    column.headerRenderer = singleTimeRenderer((root) => {
      root.innerHTML = "";
      let contentRoot = root;
      if (showSorter) {
        const sorter = document.createElement("vaadin-grid-sorter");
        sorter.setAttribute("path", sorterPath);
        const ariaLabel = content instanceof Node ? content.textContent : content;
        if (ariaLabel) {
          sorter.setAttribute("aria-label", `Sort by ${ariaLabel}`);
        }
        root.appendChild(sorter);
        contentRoot = sorter;
      }
      if (content instanceof Node) {
        contentRoot.appendChild(content);
      } else {
        contentRoot.textContent = content;
      }
    });
  };
  grid._getActiveSorters = function() {
    return this._sorters.filter((sorter) => sorter.direction);
  };
  grid.__applySorters = function(...args) {
    const sorters = grid._mapSorters();
    const sortersChanged = JSON.stringify(grid._previousSorters) !== JSON.stringify(sorters);
    grid._previousSorters = sorters;
    Object.getPrototypeOf(this).__applySorters.call(this, ...args);
    if (sortersChanged && !sorterDirectionsSetFromServer) {
      grid.$server.sortersChanged(sorters);
    }
  };
  grid.$connector.setFooterRenderer = function(column, options) {
    const { content } = options;
    if (content === null) {
      column.footerRenderer = null;
      return;
    }
    column.footerRenderer = singleTimeRenderer((root) => {
      root.innerHTML = "";
      if (content instanceof Node) {
        root.appendChild(content);
      } else {
        root.textContent = content;
      }
    });
  };
  grid.addEventListener("vaadin-context-menu-before-open", function(e) {
    const { key, columnId } = e.detail;
    grid.$server.updateContextMenuTargetItem(key, columnId);
  });
  grid.getContextMenuBeforeOpenDetail = function(event) {
    const sourceEvent = event.detail.sourceEvent || event;
    const eventContext = grid.getEventContext(sourceEvent);
    const key = eventContext.item?.key || "";
    const columnId = eventContext.column?.id || "";
    return { key, columnId };
  };
  grid.preventContextMenu = function(event) {
    const isLeftClick = event.type === "click";
    const { column } = grid.getEventContext(event);
    return isLeftClick && column instanceof GridFlowSelectionColumn;
  };
  grid.addEventListener("click", (e) => _fireClickEvent(e, "item-click"));
  grid.addEventListener("dblclick", (e) => _fireClickEvent(e, "item-double-click"));
  grid.addEventListener("column-resize", (e) => {
    const cols = grid._getColumnsInOrder().filter((col) => !col.hidden);
    cols.forEach((col) => {
      col.dispatchEvent(new CustomEvent("column-drag-resize"));
    });
    grid.dispatchEvent(
      new CustomEvent("column-drag-resize", {
        detail: {
          resizedColumnKey: e.detail.resizedColumn._flowId
        }
      })
    );
  });
  grid.addEventListener("column-reorder", (e) => {
    const columns = grid._columnTree.slice(0).pop().filter((c) => c._flowId).sort((b, a) => b._order - a._order).map((c) => c._flowId);
    grid.dispatchEvent(
      new CustomEvent("column-reorder-all-columns", {
        detail: { columns }
      })
    );
  });
  grid.addEventListener("cell-focus", (e) => {
    const eventContext = grid.getEventContext(e);
    const expectedSectionValues = ["header", "body", "footer"];
    if (expectedSectionValues.indexOf(eventContext.section) === -1) {
      return;
    }
    grid.dispatchEvent(
      new CustomEvent("grid-cell-focus", {
        detail: {
          itemKey: eventContext.item ? eventContext.item.key : null,
          internalColumnId: eventContext.column ? eventContext.column._flowId : null,
          section: eventContext.section
        }
      })
    );
  });
  function _fireClickEvent(event, eventName) {
    if (event.defaultPrevented) {
      return;
    }
    const path = event.composedPath();
    const idx = path.findIndex((node) => node.localName === "td" || node.localName === "th");
    const cell = path[idx];
    const content = path.slice(0, idx);
    if (content.some((node) => {
      const focusable = cell?._focusButton !== node && isFocusable(node);
      return focusable || node instanceof HTMLLabelElement;
    })) {
      return;
    }
    const eventContext = grid.getEventContext(event);
    const section = eventContext.section;
    if (eventContext.item && section !== "details") {
      event.itemKey = eventContext.item.key;
      if (eventContext.column) {
        event.internalColumnId = eventContext.column._flowId;
      }
      grid.dispatchEvent(new CustomEvent(eventName, { detail: event }));
    }
  }
  grid.cellPartNameGenerator = function(column, rowData) {
    const part = rowData.item.part;
    if (!part) {
      return;
    }
    return (part.row || "") + " " + (column && part[column._flowId] || "");
  };
  grid.dropFilter = (rowData) => rowData.item && !rowData.item.dropDisabled;
  grid.dragFilter = (rowData) => rowData.item && !rowData.item.dragDisabled;
  grid.addEventListener("grid-dragstart", (e) => {
    if (grid._isSelected(e.detail.draggedItems[0])) {
      if (grid.__selectionDragData) {
        Object.keys(grid.__selectionDragData).forEach((type) => {
          e.detail.setDragData(type, grid.__selectionDragData[type]);
        });
      } else {
        (grid.__dragDataTypes || []).forEach((type) => {
          e.detail.setDragData(type, e.detail.draggedItems.map((item) => item.dragData[type]).join("\n"));
        });
      }
      if (grid.__selectionDraggedItemsCount > 1) {
        e.detail.setDraggedItemsCount(grid.__selectionDraggedItemsCount);
      }
    } else {
      (grid.__dragDataTypes || []).forEach((type) => {
        e.detail.setDragData(type, e.detail.draggedItems[0].dragData[type]);
      });
    }
  });
  grid.isItemSelectable = (item) => {
    return item?.selectable === void 0 || item.selectable;
  };
  function isRowFullyInViewport(row) {
    const rowRect = row.getBoundingClientRect();
    const tableRect = grid.$.table.getBoundingClientRect();
    const headerRect = grid.$.header.getBoundingClientRect();
    const footerRect = grid.$.footer.getBoundingClientRect();
    return rowRect.top >= tableRect.top + headerRect.height && rowRect.bottom <= tableRect.bottom - footerRect.height;
  }
  grid.$connector.scrollToItem = function(itemKey, ...args) {
    const targetRow = grid._getRenderedRows().find((row) => {
      const { item } = grid.__getRowModel(row);
      return grid.getItemId(item) === itemKey;
    });
    if (targetRow && isRowFullyInViewport(targetRow)) {
      return;
    }
    grid.scrollToIndex(...args);
  };
};
/**
 * @license
 * Copyright (c) 2021 - 2026 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const passwordFieldBase = css`
  :host {
    --vaadin-button-background: transparent;
    --vaadin-button-padding: 0;
    color: var(--vaadin-input-field-button-text-color, inherit);
    display: block;
    border: none;
    cursor: var(--vaadin-clickable-cursor);
  }

  :host::before {
    background: currentColor;
    content: '';
    display: block;
    height: var(--vaadin-icon-size, 1lh);
    mask: var(--_vaadin-icon-eye) 50% / var(--vaadin-icon-visual-size, 100%) no-repeat;
    width: var(--vaadin-icon-size, 1lh);
  }

  :host([aria-pressed='true'])::before {
    mask-image: var(--_vaadin-icon-eye-slash);
  }

  @media (forced-colors: active) {
    :host::before {
      background: CanvasText;
    }

    :host([disabled])::before {
      background: GrayText;
    }
  }
`;
const passwordFieldButton = [buttonStyles, passwordFieldBase];
/**
 * @license
 * Copyright (c) 2021 - 2026 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
class PasswordFieldButton extends ButtonMixin(DirMixin(ThemableMixin(PolylitMixin(LumoInjectionMixin(LitElement))))) {
  static get is() {
    return "vaadin-password-field-button";
  }
  static get styles() {
    return passwordFieldButton;
  }
  /** @protected */
  render() {
    return html``;
  }
}
defineCustomElement(PasswordFieldButton);
/**
 * @license
 * Copyright (c) 2021 - 2026 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const passwordFieldStyles = css`
  [part~='reveal-button']::before {
    display: none;
  }

  [part='input-field']:has([part~='reveal-button']:focus-within) {
    outline: none;
    --vaadin-input-field-border-color: inherit;
  }

  :host([readonly]) [part~='reveal-button'] {
    color: var(--vaadin-input-field-button-text-color, var(--vaadin-text-color-secondary));
  }
`;
/**
 * @license
 * Copyright (c) 2021 - 2026 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const PasswordFieldMixin = (superClass) => class PasswordFieldMixinClass extends SlotStylesMixin(DisabledMixin(FocusMixin(InputMixin(superClass)))) {
  static get properties() {
    return {
      /**
       * Set to true to hide the eye icon which toggles the password visibility.
       * @attr {boolean} reveal-button-hidden
       */
      revealButtonHidden: {
        type: Boolean,
        value: false
      },
      /**
       * True if the password is visible ([type=text]).
       * @attr {boolean} password-visible
       */
      passwordVisible: {
        type: Boolean,
        value: false,
        reflectToAttribute: true,
        readOnly: true
      },
      /**
       * An object with translated strings used for localization.
       * It has the following structure and default values:
       *
       * ```js
       * {
       *   // Translation of the reveal icon button accessible label
       *   reveal: 'Show password'
       * }
       * ```
       */
      i18n: {
        type: Object,
        value: () => {
          return {
            reveal: "Show password"
          };
        }
      }
    };
  }
  /** @override */
  static get delegateAttrs() {
    return super.delegateAttrs.filter((attr) => attr !== "autocapitalize");
  }
  constructor() {
    super();
    this._setType("password");
    this.__boundRevealButtonClick = this._onRevealButtonClick.bind(this);
    this.__boundRevealButtonMouseDown = this._onRevealButtonMouseDown.bind(this);
    this.__lastChange = "";
  }
  /** @protected */
  get slotStyles() {
    const tag = this.localName;
    return [
      ...super.slotStyles,
      `
          ${tag} [slot="input"]::-ms-reveal {
            display: none;
          }
        `
    ];
  }
  /** @protected */
  ready() {
    super.ready();
    this._revealPart = this.shadowRoot.querySelector('[part~="reveal-button"]');
    this._revealButtonController = new SlotController(this, "reveal", "vaadin-password-field-button", {
      initializer: (btn) => {
        this._revealNode = btn;
        btn.addEventListener("click", this.__boundRevealButtonClick);
        btn.addEventListener("mousedown", this.__boundRevealButtonMouseDown);
      }
    });
    this.addController(this._revealButtonController);
    if (this.inputElement) {
      this.inputElement.autocapitalize = "off";
    }
  }
  /** @protected */
  updated(props) {
    super.updated(props);
    if (props.has("disabled")) {
      this._revealNode.disabled = this.disabled;
    }
    if (props.has("revealButtonHidden")) {
      this._toggleRevealHidden(this.revealButtonHidden);
    }
    if (props.has("passwordVisible")) {
      this._setType(this.passwordVisible ? "text" : "password");
      this._revealNode.setAttribute("aria-pressed", this.passwordVisible ? "true" : "false");
    }
    if (props.has("i18n") && this.i18n && this.i18n.reveal) {
      this._revealNode.setAttribute("aria-label", this.i18n.reveal);
    }
  }
  /**
   * Override an event listener inherited from `InputControlMixin`
   * to store the value at the moment of the native `change` event.
   * @param {Event} event
   * @protected
   * @override
   */
  _onChange(event) {
    super._onChange(event);
    this.__lastChange = this.inputElement.value;
  }
  /**
   * Override method inherited from `FocusMixin` to mark field as focused
   * when focus moves to the reveal button using Shift Tab.
   * @param {Event} event
   * @return {boolean}
   * @protected
   */
  _shouldSetFocus(event) {
    return event.target === this.inputElement || event.target === this._revealNode;
  }
  /**
   * Override method inherited from `FocusMixin` to not hide password
   * when focus moves to the reveal button or back to the input.
   * @param {Event} event
   * @return {boolean}
   * @protected
   */
  _shouldRemoveFocus(event) {
    return !(event.relatedTarget === this._revealNode || event.relatedTarget === this.inputElement && event.target === this._revealNode);
  }
  /**
   * Override method inherited from `FocusMixin` to toggle password visibility.
   * @param {boolean} focused
   * @protected
   * @override
   */
  _setFocused(focused) {
    super._setFocused(focused);
    if (!focused) {
      this._setPasswordVisible(false);
      if (this.__lastChange !== this.inputElement.value) {
        this.__lastChange = this.inputElement.value;
        this.dispatchEvent(new CustomEvent("change", { bubbles: true }));
      }
    } else {
      const isButtonFocused = this.getRootNode().activeElement === this._revealNode;
      this.toggleAttribute("focus-ring", this._keyboardActive && !isButtonFocused);
    }
  }
  /** @private */
  _onRevealButtonClick() {
    this._setPasswordVisible(!this.passwordVisible);
  }
  /** @private */
  _onRevealButtonMouseDown(e) {
    e.preventDefault();
    this.inputElement.focus();
  }
  /** @private */
  _toggleRevealHidden(hidden) {
    if (this._revealNode) {
      if (hidden) {
        this._revealPart.setAttribute("hidden", "");
        this._revealNode.setAttribute("tabindex", "-1");
        this._revealNode.setAttribute("aria-hidden", "true");
      } else {
        this._revealPart.removeAttribute("hidden");
        this._revealNode.setAttribute("tabindex", "0");
        this._revealNode.removeAttribute("aria-hidden");
      }
    }
  }
};
/**
 * @license
 * Copyright (c) 2021 - 2026 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
class PasswordField extends PasswordFieldMixin(TextField) {
  static get is() {
    return "vaadin-password-field";
  }
  static get styles() {
    return [...super.styles, passwordFieldStyles];
  }
  /**
   * @protected
   * @override
   */
  _renderSuffix() {
    return html`
      ${super._renderSuffix()}
      <div part="field-button reveal-button" slot="suffix">
        <slot name="reveal"></slot>
      </div>
    `;
  }
}
defineCustomElement(PasswordField);
/**
 * @license
 * Copyright (c) 2018 - 2026 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const loginFormWrapperStyles = css`
  :host {
    background: var(--vaadin-login-form-background, transparent);
    border-radius: var(--vaadin-login-form-border-radius, 0);
    display: flex;
    box-sizing: border-box;
    flex-direction: column;
    gap: var(--vaadin-login-form-gap, var(--vaadin-gap-l));
    padding: var(--vaadin-login-form-padding, var(--vaadin-padding-l));
    max-width: 100%;
    width: var(--vaadin-login-form-width, 360px);
  }

  :host([hidden]) {
    display: none !important;
  }

  ::slotted(form) {
    display: flex;
    flex-direction: column;
    gap: var(--vaadin-login-form-gap, var(--vaadin-gap-m));
  }

  ::slotted([slot='form-title']) {
    color: var(--vaadin-login-form-title-color, var(--vaadin-text-color));
    font-size: var(--vaadin-login-form-title-font-size, 1.25rem);
    font-weight: var(--vaadin-login-form-title-font-weight, 600);
    line-height: var(--vaadin-login-form-title-line-height, inherit);
  }

  :host([error]) [part='error-message'] {
    display: grid;
  }

  [part='error-message'] {
    color: var(--vaadin-login-form-error-color, var(--vaadin-text-color));
    font-size: var(--vaadin-login-form-error-font-size, inherit);
    font-weight: var(--vaadin-login-form-error-font-weight, 400);
    gap: var(--vaadin-login-form-error-gap, 0 var(--vaadin-gap-s));
    grid-template-columns: auto 1fr;
    line-height: var(--vaadin-login-form-error-line-height, inherit);
  }

  [part='error-message']::before {
    background: currentColor;
    content: '';
    display: inline-block;
    flex: none;
    height: var(--vaadin-icon-size, 1lh);
    mask: var(--_vaadin-icon-warn) 50% / var(--vaadin-icon-visual-size, 100%) no-repeat;
    width: var(--vaadin-icon-size, 1lh);
  }

  [part='error-message-description'] {
    grid-column: 2;
  }
`;
/**
 * @license
 * Copyright (c) 2018 - 2026 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
class LoginFormWrapper extends ThemableMixin(PolylitMixin(LumoInjectionMixin(LitElement))) {
  static get is() {
    return "vaadin-login-form-wrapper";
  }
  static get styles() {
    return loginFormWrapperStyles;
  }
  static get properties() {
    return {
      /**
       * If set, the error message is shown. The message is hidden by default.
       * When set, it changes the disabled state of the submit button.
       */
      error: {
        type: Boolean,
        value: false,
        reflectToAttribute: true
      },
      /**
       * The object used to localize this component.
       */
      i18n: {
        type: Object
      }
    };
  }
  /** @protected */
  render() {
    return html`
      <slot name="form-title"></slot>
      <div part="error-message" ?hidden="${!this.error}">
        <strong part="error-message-title">${this.i18n.errorMessage.title}</strong>
        <div part="error-message-description">${this.i18n.errorMessage.message}</div>
      </div>

      <slot name="form"></slot>

      <slot name="custom-form-area"></slot>

      <slot name="submit"></slot>

      <slot name="forgot-password"></slot>

      <div part="footer">
        <slot name="footer"></slot>
        <div>${this.i18n.additionalInformation}</div>
      </div>
    `;
  }
}
defineCustomElement(LoginFormWrapper);
/**
 * @license
 * Copyright (c) 2018 - 2026 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const DEFAULT_I18N$4 = {
  form: {
    title: "Log in",
    username: "Username",
    password: "Password",
    submit: "Log in",
    forgotPassword: "Forgot password"
  },
  errorMessage: {
    title: "Incorrect username or password",
    message: "Check that you have entered the correct username and password and try again.",
    username: "Username is required",
    password: "Password is required"
  }
};
const LoginMixin = (superClass) => class LoginMixin extends I18nMixin(DEFAULT_I18N$4, superClass) {
  /**
   * Fired when user clicks on the "Forgot password" button.
   *
   * @event forgot-password
   */
  /**
   * Fired when an user submits the login.
   * The event contains `username` and `password` values in the `detail` property.
   *
   * @event login
   */
  static get properties() {
    return {
      /**
       * If set, a synchronous POST call will be fired to the path defined.
       * The `login` event is also dispatched, so `event.preventDefault()` can be called to prevent the POST call.
       */
      action: {
        type: String,
        value: null
      },
      /**
       * If set, disable the "Log in" button and prevent user from submitting login form.
       * It is re-enabled automatically, when error is set to true, allowing form resubmission
       * after user makes changes.
       */
      disabled: {
        type: Boolean,
        value: false,
        notify: true
      },
      /**
       * If set, the error message is shown. The message is hidden by default.
       * When set, it changes the disabled state of the submit button.
       */
      error: {
        type: Boolean,
        value: false,
        reflectToAttribute: true,
        notify: true
      },
      /**
       * Whether to hide the forgot password button. The button is visible by default.
       * @attr {boolean} no-forgot-password
       */
      noForgotPassword: {
        type: Boolean,
        value: false
      },
      /**
       * If set, the user name field automatically receives focus when the component is attached to the document.
       * @attr {boolean} no-autofocus
       */
      noAutofocus: {
        type: Boolean,
        value: false
      },
      /**
       * Sets the root heading level (`aria-level`) for the heading hierarchy. Default value: 1.
       * Child headings automatically increment from this base level i.e. standalone login form
       * renders its title as `<h1>`, whereas the form in the overlay uses `<h2>`, as the `<h1>`
       * element is used by the overlay's own title.
       *
       * @attr {number} heading-level
       */
      headingLevel: {
        type: Number,
        value: 1
      },
      /**
       * If set, prevents auto enabling the component when error property is set to true.
       * @private
       */
      _preventAutoEnable: {
        type: Boolean,
        value: false
      }
    };
  }
  /**
   * The object used to localize this component. To change the default
   * localization, replace this with an object that provides all properties, or
   * just the individual properties you want to change.
   *
   * The object has the following JSON structure (by default it doesn't include `additionalInformation`
   * and `header` sections, `header` can be added to override `title` and `description` properties
   * in `vaadin-login-overlay`):
   *
   * ```js
   * {
   *   header: {
   *     title: 'App name',
   *     description: 'Inspiring application description'
   *   },
   *   form: {
   *     title: 'Log in',
   *     username: 'Username',
   *     password: 'Password',
   *     submit: 'Log in',
   *     forgotPassword: 'Forgot password'
   *   },
   *   errorMessage: {
   *     title: 'Incorrect username or password',
   *     message: 'Check that you have entered the correct username and password and try again.',
   *     username: 'Username is required',
   *     password: 'Password is required'
   *   },
   *   additionalInformation: 'In case you need to provide some additional info for the user.'
   * }
   * ```
   * @type {!LoginI18n}
   */
  get i18n() {
    return super.i18n;
  }
  set i18n(value) {
    super.i18n = value;
  }
};
/**
 * @license
 * Copyright (c) 2018 - 2026 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
function isCheckbox(field2) {
  return (field2.inputElement || field2).type === "checkbox";
}
const LoginFormMixin = (superClass) => class LoginFormMixin extends LoginMixin(superClass) {
  /** @protected */
  get _customFields() {
    return [...this.children].filter((node) => {
      return node.getAttribute("slot") === "custom-form-area" && node.hasAttribute("name");
    });
  }
  /** @protected */
  get _userNameField() {
    return this.querySelector("#vaadinLoginUsername");
  }
  /** @protected */
  get _passwordField() {
    return this.querySelector("#vaadinLoginPassword");
  }
  /**
   * Override update to render slotted form and buttons
   * into light DOM after rendering shadow DOM.
   * @protected
   */
  update(props) {
    super.update(props);
    this.__renderSlottedForm();
  }
  /** @protected */
  updated(props) {
    super.updated(props);
    if (props.has("error") && this.error && !this._preventAutoEnable) {
      this.disabled = false;
    }
  }
  /** @protected */
  async connectedCallback() {
    super.connectedCallback();
    if (!this.noAutofocus) {
      await new Promise(requestAnimationFrame);
      this._userNameField.focus();
    }
  }
  __renderSlottedForm() {
    render(
      html`
          <form method="POST" action="${ifDefined(this.action)}" @formdata="${this._onFormData}" slot="form">
            <input id="csrf" type="hidden" />
            <vaadin-text-field
              name="username"
              .label="${this.__effectiveI18n.form.username}"
              .errorMessage="${this.__effectiveI18n.errorMessage.username}"
              id="vaadinLoginUsername"
              required
              @keydown="${this._handleInputKeydown}"
              autocapitalize="none"
              autocorrect="off"
              spellcheck="false"
              autocomplete="username"
              manual-validation
            >
              <input type="text" slot="input" @keyup="${this._handleInputKeyup}" />
            </vaadin-text-field>

            <vaadin-password-field
              name="password"
              .label="${this.__effectiveI18n.form.password}"
              .errorMessage="${this.__effectiveI18n.errorMessage.password}"
              id="vaadinLoginPassword"
              required
              @keydown="${this._handleInputKeydown}"
              spellcheck="false"
              autocomplete="current-password"
              manual-validation
            >
              <input type="password" slot="input" @keyup="${this._handleInputKeyup}" />
            </vaadin-password-field>
          </form>

          <vaadin-button slot="submit" theme="primary submit" @click="${this.submit}" .disabled="${this.disabled}">
            ${this.__effectiveI18n.form.submit}
          </vaadin-button>

          <vaadin-button
            slot="forgot-password"
            theme="tertiary small"
            @click="${this._onForgotPasswordClick}"
            ?hidden="${this.noForgotPassword}"
          >
            ${this.__effectiveI18n.form.forgotPassword}
          </vaadin-button>
        `,
      this,
      { host: this }
    );
  }
  /**
   * Submits the form.
   */
  submit() {
    const userName = this._userNameField;
    const password = this._passwordField;
    userName.validate();
    password.validate();
    if (this.disabled || userName.invalid || password.invalid) {
      return;
    }
    this.error = false;
    this.disabled = true;
    const detail = {
      username: userName.value,
      password: password.value
    };
    const fields2 = this._customFields;
    if (fields2.length) {
      detail.custom = {};
      fields2.forEach((field2) => {
        if (isCheckbox(field2) && !field2.checked) {
          return;
        }
        detail.custom[field2.name] = field2.value;
      });
    }
    const loginEventDetails = {
      bubbles: true,
      cancelable: true,
      detail
    };
    const firedEvent = this.dispatchEvent(new CustomEvent("login", loginEventDetails));
    if (this.action && firedEvent) {
      const csrfMetaName = document.querySelector("meta[name=_csrf_parameter]");
      const csrfMetaValue = document.querySelector("meta[name=_csrf]");
      if (csrfMetaName && csrfMetaValue) {
        const csrf = this.querySelector("#csrf");
        csrf.name = csrfMetaName.content;
        csrf.value = csrfMetaValue.content;
      }
      this.querySelector("form").submit();
    }
  }
  /** @protected */
  _onFormData(event) {
    const { formData } = event;
    if (this._customFields.length) {
      this._customFields.forEach((field2) => {
        if (isCheckbox(field2) && !field2.checked) {
          return;
        }
        formData.append(field2.name, field2.value);
      });
    }
  }
  /** @protected */
  _handleInputKeydown(e) {
    if (e.key === "Enter") {
      const { currentTarget: inputActive } = e;
      const nextInput = inputActive.id === "vaadinLoginUsername" ? this._passwordField : this._userNameField;
      if (inputActive.validate()) {
        if (nextInput.checkValidity()) {
          this.submit();
        } else {
          nextInput.focus();
        }
      }
    }
  }
  /** @protected */
  _handleInputKeyup(e) {
    const input = e.currentTarget;
    if (e.key === "Tab" && input instanceof HTMLInputElement) {
      input.select();
    }
  }
  /** @protected */
  _onForgotPasswordClick() {
    this.dispatchEvent(new CustomEvent("forgot-password"));
  }
};
/**
 * @license
 * Copyright (c) 2018 - 2026 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
class LoginForm extends LoginFormMixin(ElementMixin(ThemableMixin(PolylitMixin(LitElement)))) {
  static get is() {
    return "vaadin-login-form";
  }
  static get styles() {
    return css`
      :host {
        display: block;
        max-width: 100%;
      }

      :host([hidden]) {
        display: none !important;
      }
    `;
  }
  /** @protected */
  render() {
    return html`
      <vaadin-login-form-wrapper
        id="form"
        theme="${ifDefined(this._theme)}"
        .error="${this.error}"
        .i18n="${this.__effectiveI18n}"
        part="form"
        role="region"
        aria-labelledby="title"
        exportparts="error-message, error-message-title, error-message-description, footer"
      >
        <div id="title" slot="form-title" part="form-title" role="heading" aria-level="${this.headingLevel}">
          ${this.__effectiveI18n.form.title}
        </div>
        <slot name="form" slot="form"></slot>
        <slot name="custom-form-area" slot="custom-form-area"></slot>
        <slot name="submit" slot="submit"></slot>
        <slot name="forgot-password" slot="forgot-password"></slot>
        <slot name="footer" slot="footer"></slot>
      </vaadin-login-form-wrapper>
    `;
  }
}
defineCustomElement(LoginForm);
/**
 * @license
 * Copyright (c) 2018 - 2026 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const loginOverlayWrapper = css`
  [part='overlay'] {
    color: var(--vaadin-login-overlay-text-color, var(--vaadin-overlay-text-color, var(--vaadin-text-color)));
    background: var(
      --vaadin-login-overlay-background,
      var(--vaadin-overlay-background, var(--vaadin-background-color))
    );
    border: var(--vaadin-login-overlay-border-width, var(--vaadin-overlay-border-width, 1px)) solid
      var(--vaadin-login-overlay-border-color, var(--vaadin-overlay-border-color, var(--vaadin-border-color-secondary)));
    border-radius: var(--vaadin-login-overlay-border-radius, var(--vaadin-radius-l));
    box-shadow: var(--vaadin-login-overlay-shadow, var(--vaadin-overlay-shadow, 0 8px 24px -4px rgba(0, 0, 0, 0.3)));
  }

  [part='card'] {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    max-width: 100%;
    overflow: hidden;
  }

  [part='brand'] {
    background: var(--vaadin-login-overlay-brand-background, var(--vaadin-background-container));
    display: flex;
    flex-direction: column;
    padding: var(--vaadin-login-overlay-brand-padding, var(--vaadin-padding-l));
  }

  ::slotted([slot='title']) {
    color: var(--vaadin-login-overlay-title-color, var(--vaadin-text-color));
    font-size: var(--vaadin-login-overlay-title-font-size, inherit);
    font-weight: var(--vaadin-login-overlay-title-font-weight, 600);
    line-height: var(--vaadin-login-overlay-title-line-height, inherit);
  }

  [part='description'] {
    color: var(--vaadin-login-overlay-description-color, var(--vaadin-text-color-secondary));
    font-size: var(--vaadin-login-overlay-description-font-size, inherit);
    font-weight: var(--vaadin-login-overlay-description-font-weight, inherit);
    line-height: var(--vaadin-login-overlay-description-line-height, inherit);
  }
`;
const loginOverlayWrapperStyles = [overlayStyles, loginOverlayWrapper];
/**
 * @license
 * Copyright (c) 2018 - 2026 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
class LoginOverlayWrapper extends OverlayMixin(DirMixin(ThemableMixin(PolylitMixin(LumoInjectionMixin(LitElement))))) {
  static get is() {
    return "vaadin-login-overlay-wrapper";
  }
  static get styles() {
    return loginOverlayWrapperStyles;
  }
  static get properties() {
    return {
      /**
       * Application description. Displayed under the title.
       */
      description: {
        type: String
      }
    };
  }
  /**
   * Override method from OverlayFocusMixin to use owner as focus trap root
   * @protected
   * @override
   */
  get _focusTrapRoot() {
    return this.owner;
  }
  /** @protected */
  render() {
    return html`
      <div id="backdrop" part="backdrop" ?hidden="${!this.withBackdrop}"></div>
      <div part="overlay" id="overlay">
        <div part="content" id="content">
          <section part="card">
            <div part="brand">
              <slot name="title"></slot>
              <div part="description">${this.description}</div>
            </div>
            <div part="form-wrapper">
              <slot></slot>
            </div>
          </section>
        </div>
      </div>
    `;
  }
}
defineCustomElement(LoginOverlayWrapper);
/**
 * @license
 * Copyright (c) 2018 - 2026 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
class TitleController extends SlotChildObserveController {
  constructor(host) {
    super(host, "title", "div");
  }
  /**
   * Set title based on corresponding host property.
   *
   * @param {string} title
   */
  setTitle(title) {
    this.title = title;
    const titleNode = this.getSlotChild();
    if (!titleNode) {
      this.restoreDefaultNode();
    }
    if (this.node === this.defaultNode) {
      this.updateDefaultNode(this.node);
    }
  }
  /**
   * Set level based on corresponding host property.
   *
   * @param {string} level
   */
  setLevel(level) {
    this.level = level;
    if (this.node === this.defaultNode) {
      this.updateDefaultNode(this.node);
    }
  }
  /**
   * Override method inherited from `SlotController`
   * to customize heading on the default title node.
   *
   * @param {Node} node
   * @protected
   * @override
   */
  initNode(node) {
    if (node === this.defaultNode) {
      node.setAttribute("role", "heading");
    }
    this.host.setAttribute("aria-labelledby", node.id);
  }
  /**
   * Override method inherited from `SlotChildObserveController`
   * to restore the default title element.
   *
   * @protected
   * @override
   */
  restoreDefaultNode() {
    const { title } = this;
    if (title && title.trim() !== "") {
      const node = this.attachDefaultNode();
      this.initNode(node);
    }
  }
  /**
   * Override method inherited from `SlotChildObserveController`
   * to update the default title element.
   *
   * @param {Node | undefined} node
   * @protected
   * @override
   */
  updateDefaultNode(node) {
    if (node) {
      node.textContent = this.title;
      node.setAttribute("aria-level", this.level);
    }
    super.updateDefaultNode(node);
  }
}
/**
 * @license
 * Copyright (c) 2018 - 2026 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const LoginOverlayMixin = (superClass) => class LoginOverlayMixin extends superClass {
  static get properties() {
    return {
      /**
       * Defines the application description
       */
      description: {
        type: String,
        value: "Application description",
        notify: true
      },
      /**
       * True if the overlay is currently displayed.
       */
      opened: {
        type: Boolean,
        value: false,
        reflectToAttribute: true,
        sync: true
      },
      /**
       * Defines the application title
       */
      title: {
        type: String,
        value: "App name"
      },
      /** @private */
      __effectiveTitle: {
        type: String
      },
      /** @private */
      __effectiveDescription: {
        type: String
      }
    };
  }
  /** @protected */
  firstUpdated() {
    super.firstUpdated();
    this.setAttribute("role", "dialog");
    this.setAttribute("aria-modal", "true");
    this.setAttribute("tabindex", "0");
    this.__titleController = new TitleController(this);
    this.addController(this.__titleController);
    this._overlayElement = this.$.overlay;
  }
  /** @protected */
  willUpdate(props) {
    super.willUpdate(props);
    if (props.has("__effectiveI18n") || props.has("title") || props.has("description")) {
      const header = this.__effectiveI18n && this.__effectiveI18n.header;
      this.__effectiveTitle = header && header.title != null ? header.title : this.title;
      this.__effectiveDescription = header && header.description != null ? header.description : this.description;
    }
  }
  /** @protected */
  updated(props) {
    super.updated(props);
    if (props.has("__effectiveTitle")) {
      this.__titleController.setTitle(this.__effectiveTitle);
    }
    if (props.has("headingLevel")) {
      this.__titleController.setLevel(this.headingLevel);
    }
    if (props.has("opened")) {
      this._openedChanged(this.opened);
    }
  }
  /** @protected */
  connectedCallback() {
    super.connectedCallback();
    if (this.__restoreOpened) {
      this.opened = true;
    }
  }
  /** @protected */
  disconnectedCallback() {
    super.disconnectedCallback();
    setTimeout(() => {
      if (!this.isConnected) {
        this.__restoreOpened = this.opened;
        this.opened = false;
      }
    });
  }
  /** @protected */
  _preventClosingLogin(e) {
    e.preventDefault();
  }
  /** @private */
  __handleOverlayClosed() {
    this.dispatchEvent(new CustomEvent("closed"));
  }
  /** @private */
  _openedChanged(opened, oldOpened) {
    if (oldOpened) {
      this._userNameField.value = "";
      this._passwordField.value = "";
      this.disabled = false;
    } else if (opened) {
      document.body.style.pointerEvents = this.$.overlay._previousDocumentPointerEvents;
    }
  }
  /**
   * Fired when the overlay is closed.
   *
   * @event closed
   */
};
/**
 * @license
 * Copyright (c) 2018 - 2026 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
class LoginOverlay extends LoginFormMixin(LoginOverlayMixin(ElementMixin(ThemableMixin(PolylitMixin(LitElement))))) {
  static get is() {
    return "vaadin-login-overlay";
  }
  static get styles() {
    return css`
      :host([opened]),
      :host([opening]),
      :host([closing]) {
        display: block !important;
        position: fixed;
        outline: none;
      }

      :host,
      :host([hidden]) {
        display: none !important;
      }

      :host(:focus-visible) ::part(overlay) {
        outline: var(--vaadin-focus-ring-width) solid var(--vaadin-focus-ring-color);
      }
    `;
  }
  /** @protected */
  render() {
    return html`
      <vaadin-login-overlay-wrapper
        id="overlay"
        .owner="${this}"
        .opened="${this.opened}"
        .description="${this.__effectiveDescription}"
        focus-trap
        with-backdrop
        theme="${ifDefined(this._theme)}"
        @vaadin-overlay-escape-press="${this._preventClosingLogin}"
        @vaadin-overlay-outside-click="${this._preventClosingLogin}"
        @vaadin-overlay-closed="${this.__handleOverlayClosed}"
        @opened-changed="${this._onOpenedChanged}"
        exportparts="backdrop, overlay, content, card, brand, description, form-wrapper"
      >
        <slot name="title" slot="title"></slot>
        <vaadin-login-form-wrapper
          id="form"
          .error="${this.error}"
          .i18n="${this.__effectiveI18n}"
          part="form"
          role="region"
          aria-labelledby="title"
          exportparts="error-message, error-message-title, error-message-description, footer"
        >
          <div id="title" slot="form-title" part="form-title" role="heading" aria-level="${this.headingLevel + 1}">
            ${this.__effectiveI18n.form.title}
          </div>
          <slot name="form" slot="form"></slot>
          <slot name="custom-form-area" slot="custom-form-area"></slot>
          <slot name="submit" slot="submit"></slot>
          <slot name="forgot-password" slot="forgot-password"></slot>
          <slot name="footer" slot="footer"></slot>
        </vaadin-login-form-wrapper>
      </vaadin-login-overlay-wrapper>
    `;
  }
  /** @private */
  _onOpenedChanged(event) {
    this.opened = event.detail.value;
  }
}
defineCustomElement(LoginOverlay);
/**
 * @license
 * Copyright (c) 2025 - 2026 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const markdownSlotStyles = css`
  @layer vaadin.base {
    vaadin-markdown {
      line-height: 1.6;

      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        font-weight: 600;
        line-height: 1.25;
        text-wrap: balance;
      }

      h1 {
        font-size: 1.75em;
        margin-top: 1.8em;
        margin-bottom: 0.9em;
      }

      h2 {
        font-size: 1.5em;
        margin-top: 1.6em;
        margin-bottom: 0.8em;
      }

      h3 {
        font-size: 1.25em;
        margin-top: 1.4em;
        margin-bottom: 0.7em;
      }

      h4 {
        font-size: 1.125em;
        margin-top: 1.2em;
        margin-bottom: 0.6em;
      }

      h5 {
        font-size: 1em;
        margin-top: 1em;
        margin-bottom: 0.5em;
      }

      h6 {
        font-size: 0.875em;
        margin-top: 1em;
        margin-bottom: 0.5em;
      }

      p,
      ul,
      ol,
      blockquote,
      table,
      figure {
        margin-inline: 0;
        margin-block: 1.25em;
      }

      code {
        font-family: ui-monospace, monospace;
        font-size: 0.9em;
        line-height: 1.25;
        font-weight: 500;

        &::before,
        &::after {
          content: '\`';
          color: var(--vaadin-text-color-secondary);
        }
      }

      pre {
        background-color: light-dark(var(--vaadin-text-color), var(--vaadin-background-container));
        border-radius: var(--vaadin-radius-m);
        color: light-dark(var(--vaadin-background-color), var(--vaadin-text-color));
        padding: var(--vaadin-padding-m);

        code {
          font-weight: 500;

          &::before,
          &::after {
            content: '';
          }
        }
      }

      hr {
        height: 0;
        border: 0;
        border-top: 1px solid var(--vaadin-border-color-secondary);
        margin-block: 3em;
      }

      b,
      strong {
        font-weight: 600;
      }

      blockquote {
        font-weight: 500;
        font-style: italic;
        border-left: 0.25rem solid var(--vaadin-border-color);
        quotes: '\\201C' '\\201D' '\\2018' '\\2019';
        margin-inline: 0;
        padding-inline-start: 1em;
      }

      ul {
        list-style-type: disc;
      }

      ul,
      ol {
        padding-inline-start: 1.625em;
      }

      li {
        margin-block: 0.5em;
        padding-inline-start: 0.375em;

        &::marker {
          color: var(--vaadin-text-color-disabled);
        }
      }

      ol li::marker {
        font-weight: 400;
        color: var(--vaadin-text-color-secondary);
      }

      ul:has(> li > input[type='checkbox']:first-child) {
        list-style: none;
        padding-inline-start: 0;
      }

      img,
      video,
      svg,
      canvas,
      audio,
      iframe,
      embed,
      object {
        display: block;
      }

      img,
      video {
        max-width: 100%;
        height: auto;
        border-radius: var(--vaadin-radius-m);
      }

      figcaption {
        font-size: 0.875em;
        line-height: 1.125;
        color: var(--vaadin-text-color-secondary);
        margin-top: 0.75em;
      }

      table {
        min-width: 100%;
        border-spacing: 0;
      }

      th {
        text-align: start;
        font-weight: 500;
        background: var(--vaadin-background-container);
      }

      th,
      td {
        padding: var(--vaadin-padding-block-container) var(--vaadin-padding-inline-container);
      }

      tr:not(:last-child) {
        th,
        td {
          border-bottom: 1px solid var(--vaadin-border-color-secondary);
        }
      }
    }
  }
`;
/**
 * @license
 * Copyright (c) 2000 - 2026 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
class Markdown extends SlotStylesMixin(ElementMixin(ThemableMixin(PolylitMixin(LitElement)))) {
  static get is() {
    return "vaadin-markdown";
  }
  static get styles() {
    return css`
      :host {
        display: block;
      }

      :host([hidden]) {
        display: none !important;
      }
    `;
  }
  /** @protected */
  get slotStyles() {
    return [markdownSlotStyles];
  }
  static get properties() {
    return {
      /**
       * The Markdown content.
       *
       */
      content: {
        type: String,
        sync: true
      }
    };
  }
  /** @protected */
  render() {
    return html`<slot></slot>`;
  }
  /**
   * @protected
   * @override
   */
  updated(props) {
    super.updated(props);
    if (props.has("content")) {
      renderMarkdownToElement(this, this.content);
    }
  }
}
defineCustomElement(Markdown);
const vaadinMarkdown = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Markdown
}, Symbol.toStringTag, { value: "Module" }));
function initLazy(menubar, appId) {
  if (menubar.$connector) {
    return;
  }
  const observer = new MutationObserver((records) => {
    const hasChangedAttributes = records.some((entry) => {
      const oldValue = entry.oldValue;
      const newValue = entry.target.getAttribute(entry.attributeName);
      return oldValue !== newValue;
    });
    if (hasChangedAttributes) {
      menubar.$connector.generateItems();
    }
  });
  menubar.$connector = {
    /**
     * Generates and assigns the items to the menu bar.
     *
     * When the method is called without providing a node id,
     * the previously generated items tree will be used.
     * That can be useful if you only want to sync the disabled and hidden properties of root items.
     *
     * @param {number | undefined} nodeId
     */
    generateItems(nodeId) {
      if (!menubar.shadowRoot) {
        setTimeout(() => menubar.$connector.generateItems(nodeId));
        return;
      }
      if (!menubar._container) {
        queueMicrotask(() => menubar.$connector.generateItems(nodeId));
        return;
      }
      if (nodeId) {
        menubar.__generatedItems = window.Vaadin.Flow.contextMenuConnector.generateItemsTree(appId, nodeId);
      }
      let items = menubar.__generatedItems || [];
      items.forEach((item) => {
        item.disabled = item.component.disabled;
        item.component._rootItem = item;
      });
      items.forEach((item) => {
        observer.observe(item.component, {
          attributeFilter: ["hidden", "disabled"],
          attributeOldValue: true
        });
      });
      items = items.filter((item) => !item.component.hidden);
      menubar.items = items;
    }
  };
}
function setClassName(component) {
  const item = component._rootItem || component._item;
  if (item) {
    item.className = component.className;
  }
}
window.Vaadin.Flow.menubarConnector = { initLazy, setClassName };
/**
 * @license
 * Copyright (c) 2021 - 2026 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const messageInputButtonStyles = css`
  :host {
    flex: none;
    align-self: end;
    margin: var(
      --vaadin-input-field-padding,
      var(--vaadin-padding-block-container) var(--vaadin-padding-inline-container)
    );
    --vaadin-button-border-width: 0;
    --vaadin-button-background: transparent;
    --vaadin-button-text-color: var(--vaadin-text-color);
    --vaadin-button-padding: 0;
  }
`;
/**
 * @license
 * Copyright (c) 2021 - 2026 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
class MessageInputButton extends ButtonMixin(DirMixin(ThemableMixin(PolylitMixin(LumoInjectionMixin(LitElement))))) {
  static get is() {
    return "vaadin-message-input-button";
  }
  static get styles() {
    return [buttonStyles, messageInputButtonStyles];
  }
  /** @protected */
  render() {
    return html`
      <div class="vaadin-button-container">
        <span part="label">
          <slot></slot>
        </span>
      </div>
    `;
  }
}
defineCustomElement(MessageInputButton);
/**
 * @license
 * Copyright (c) 2021 - 2026 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const messageInputStyles = css`
  :host {
    box-sizing: border-box;
    display: flex;
    max-height: 50vh;
    flex-shrink: 0;
    border: var(--vaadin-input-field-border-width, 1px) solid
      var(--vaadin-input-field-border-color, var(--vaadin-border-color));
    border-radius: var(--vaadin-input-field-border-radius, var(--vaadin-radius-m));
    background: var(--vaadin-input-field-background, var(--vaadin-background-color));
  }

  :host([hidden]) {
    display: none !important;
  }

  :host(:focus-within) {
    outline: var(--vaadin-focus-ring-width) solid var(--vaadin-focus-ring-color);
    outline-offset: calc(var(--vaadin-input-field-border-width, 1px) * -1);
  }

  :host([disabled]) {
    --vaadin-input-field-value-color: var(--vaadin-input-field-disabled-text-color, var(--vaadin-text-color-disabled));
    --vaadin-input-field-background: var(
      --vaadin-input-field-disabled-background,
      var(--vaadin-background-container-strong)
    );
    --vaadin-input-field-border-color: transparent;
  }

  ::slotted([slot='textarea']) {
    flex: 1;
    --vaadin-input-field-border-width: 0 !important;
    --vaadin-focus-ring-width: 0;
    --vaadin-input-field-background: transparent !important;
  }
`;
/**
 * @license
 * Copyright (c) 2021 - 2026 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const DEFAULT_I18N$3 = {
  send: "Send",
  message: "Message"
};
const MessageInputMixin = (superClass) => class MessageInputMixinClass extends I18nMixin(DEFAULT_I18N$3, superClass) {
  static get properties() {
    return {
      /**
       * Current content of the text input field
       */
      value: {
        type: String,
        value: "",
        sync: true
      },
      /**
       * Set to true to disable this element.
       */
      disabled: {
        type: Boolean,
        value: false,
        reflectToAttribute: true,
        sync: true
      },
      /** @private */
      _button: {
        type: Object,
        sync: true
      },
      /** @private */
      _textArea: {
        type: Object,
        sync: true
      }
    };
  }
  static get observers() {
    return [
      "__buttonPropsChanged(_button, disabled, __effectiveI18n)",
      "__textAreaPropsChanged(_textArea, disabled, __effectiveI18n, value)"
    ];
  }
  /**
   * The object used to localize this component. To change the default
   * localization, replace this with an object that provides all properties, or
   * just the individual properties you want to change.
   *
   * The object has the following JSON structure and default values:
   * ```js
   * {
   *   // Used as the button label
   *   send: 'Send',
   *
   *   // Used as the input field's placeholder and aria-label
   *   message: 'Message'
   * }
   * ```
   * @type {!MessageInputI18n}
   */
  get i18n() {
    return super.i18n;
  }
  set i18n(value) {
    super.i18n = value;
  }
  /** @protected */
  ready() {
    super.ready();
    this._buttonController = new SlotController(this, "button", "vaadin-message-input-button", {
      initializer: (btn) => {
        btn.addEventListener("click", () => {
          this.__submit();
        });
        this._button = btn;
      }
    });
    this.addController(this._buttonController);
    this._textAreaController = new SlotController(this, "textarea", "vaadin-text-area", {
      initializer: (textarea) => {
        textarea.addEventListener("value-changed", (event) => {
          this.value = event.detail.value;
        });
        textarea.addEventListener("keydown", (event) => {
          if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            event.stopImmediatePropagation();
            this.__submit();
          }
        });
        textarea.minRows = 1;
        (textarea.inputElement || textarea).setAttribute("enterkeyhint", "send");
        this._textArea = textarea;
      }
    });
    this.addController(this._textAreaController);
    this._tooltipController = new TooltipController(this);
    this.addController(this._tooltipController);
  }
  focus(options) {
    if (this._textArea) {
      this._textArea.focus(options);
    }
  }
  /** @private */
  __buttonPropsChanged(button, disabled, effectiveI18n) {
    if (button) {
      button.disabled = disabled;
      button.textContent = effectiveI18n.send;
    }
  }
  /** @private */
  __textAreaPropsChanged(textArea, disabled, effectiveI18n, value) {
    if (textArea) {
      textArea.disabled = disabled;
      textArea.value = value;
      const message2 = effectiveI18n.message;
      textArea.placeholder = message2;
      textArea.accessibleName = message2;
    }
  }
  /**
   * Submits the current value as an custom event named 'submit'.
   * It also clears the text input and refocuses it for sending another message.
   * In UI, can be triggered by pressing the submit button or pressing enter key when field is focused.
   * It does not submit anything if text is empty.
   */
  __submit() {
    if (this.value !== "") {
      this.dispatchEvent(new CustomEvent("submit", { detail: { value: this.value } }));
      this.value = "";
    }
    this._textArea.focus();
  }
  /**
   * Fired when a new message is submitted with `<vaadin-message-input>`, either
   * by clicking the "send" button, or pressing the Enter key.
   * @event submit
   */
};
/**
 * @license
 * Copyright (c) 2021 - 2026 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
class MessageInput extends MessageInputMixin(
  ElementMixin(ThemableMixin(PolylitMixin(LumoInjectionMixin(LitElement))))
) {
  static get is() {
    return "vaadin-message-input";
  }
  static get styles() {
    return messageInputStyles;
  }
  /** @protected */
  render() {
    return html`
      <slot name="textarea"></slot>

      <slot name="button"></slot>

      <slot name="tooltip"></slot>
    `;
  }
}
defineCustomElement(MessageInput);
function createDateTimeFormatter(locale) {
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric"
  });
}
function getFormatter(locale) {
  const localeParts = locale?.split("-");
  const fallbackLocales = [
    locale,
    // Full locale (e.g., "de-DE-hw")
    localeParts?.slice(0, 2).join("-"),
    // Base locale without variant (e.g., "de-DE")
    localeParts?.[0]
    // Language only (e.g., "de")
  ];
  for (const fallbackLocale of fallbackLocales) {
    try {
      return createDateTimeFormatter(fallbackLocale);
    } catch (e) {
    }
  }
  return createDateTimeFormatter(void 0);
}
function formatItems(items, locale) {
  const formatter = getFormatter(locale);
  return items.map(
    (item) => item.time ? Object.assign(item, {
      time: formatter.format(new Date(item.time))
    }) : item
  );
}
window.Vaadin.Flow.messageListConnector = {
  /**
   * Initializes the connector for the given message list element.
   * Sets up event listeners for attachment clicks.
   */
  initLazy(list) {
    if (list._flowConnectorInitialized) {
      return;
    }
    list._flowConnectorInitialized = true;
    list.addEventListener("attachment-click", (e) => {
      const { item, attachment } = e.detail;
      const itemIndex = list.items.indexOf(item);
      const attachmentIndex = item?.attachments?.indexOf(attachment) ?? -1;
      if (itemIndex < 0 || attachmentIndex < 0) {
        return;
      }
      list.dispatchEvent(
        new CustomEvent("attachment-click-flow", {
          detail: { itemIndex, attachmentIndex }
        })
      );
    });
  },
  /**
   * Fully replaces the items in the list with the given items.
   */
  setItems(list, items, locale) {
    this.initLazy(list);
    list.items = formatItems(items, locale);
  },
  /**
   * Sets the text of the item at the given index to the given text.
   */
  setItemText(list, text, index) {
    list.items[index].text = text;
    list.items = [...list.items];
  },
  /**
   * Appends the given text to the text of the item at the given index.
   */
  appendItemText(list, appendedText, index) {
    const currentText = list.items[index].text || "";
    this.setItemText(list, currentText + appendedText, index);
  },
  /**
   * Adds the given items to the end of the list.
   */
  addItems(list, newItems, locale) {
    this.initLazy(list);
    list.items = [...list.items || [], ...formatItems(newItems, locale)];
  }
};
/**
 * @license
 * Copyright (c) 2021 - 2026 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const messageStyles = css`
  :host {
    display: flex;
    flex-direction: row;
    padding: var(--vaadin-message-padding, var(--vaadin-padding-s) var(--vaadin-padding-m));
    gap: var(--vaadin-message-gap, var(--vaadin-gap-xs) var(--vaadin-gap-s));
    outline-offset: calc(var(--vaadin-focus-ring-width) * -1);
  }

  :host([hidden]) {
    display: none !important;
  }

  :host(:focus-visible),
  :is(:focus-visible, [focus-ring]) {
    outline: var(--vaadin-focus-ring-width) solid var(--vaadin-focus-ring-color);
  }

  [part='content'] {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    gap: inherit;
  }

  [part='header'] {
    align-items: baseline;
    display: flex;
    flex-flow: row wrap;
    gap: inherit;
    row-gap: 0;
    line-height: var(--vaadin-message-header-line-height, inherit);
  }

  [part='name'] {
    font-size: var(--vaadin-message-name-font-size, inherit);
    font-weight: var(--vaadin-message-name-font-weight, 500);
    color: var(--vaadin-message-name-color, var(--vaadin-text-color));
  }

  [part='time'] {
    font-size: var(--vaadin-message-time-font-size, max(11px, 0.75em));
    font-weight: var(--vaadin-message-time-font-weight, inherit);
    color: var(--vaadin-message-time-color, var(--vaadin-text-color-secondary));
  }

  [part='message'] {
    white-space: pre-wrap;
    font-size: var(--vaadin-message-font-size, inherit);
    font-weight: var(--vaadin-message-font-weight, inherit);
    line-height: var(--vaadin-message-line-height, inherit);
    color: var(--vaadin-message-text-color, var(--vaadin-text-color));
  }

  ::slotted([slot='avatar']) {
    flex: none;
  }

  ::slotted(vaadin-markdown) {
    white-space: normal;
  }

  [part='attachments'] {
    display: flex;
    flex-wrap: wrap;
    gap: var(--vaadin-gap-s);
    padding-bottom: var(--vaadin-gap-xs);
  }

  [part~='attachment'] {
    display: inline-grid;
    grid-template-columns: max-content 1fr;
    gap: var(--vaadin-message-attachment-gap, var(--vaadin-gap-s));
    align-items: center;
    background: var(--vaadin-message-attachment-background, var(--vaadin-background-container));
    color: var(--vaadin-message-attachment-text-color, var(--vaadin-text-color));
    cursor: var(--vaadin-clickable-cursor);
    border: var(--vaadin-message-attachment-border-width, 0) solid
      var(--vaadin-message-attachment-border-color, var(--vaadin-border-color));
    border-radius: var(--vaadin-message-attachment-border-radius, var(--vaadin-radius-m));
    padding: 0;
    margin: 0;
    font: inherit;
    font-size: var(--vaadin-message-attachment-font-size, inherit);
    line-height: var(--vaadin-message-attachment-line-height, inherit);
    font-weight: var(--vaadin-message-attachment-font-weight, inherit);
    text-align: start;
    contain: content;
  }

  [part='attachment-icon'] {
    grid-column: 1;
    align-self: stretch;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--vaadin-background-container-strong);
    padding: var(--vaadin-message-attachment-padding, var(--vaadin-padding-s));
    contain: content;

    &::before {
      content: '\\2003' / '';
      display: inline-flex;
      align-items: center;
      flex: none;
      height: var(--vaadin-icon-size, 1lh);
      width: var(--vaadin-icon-size, 1lh);
      mask-image: var(--_vaadin-icon-file);
      mask-size: var(--vaadin-icon-visual-size, 100%);
      mask-position: 50%;
      mask-repeat: no-repeat;
      background: currentColor;
    }
  }

  [part='attachment-preview'] {
    grid-column: 1 / -1;
    max-width: 100px;
    max-height: 100px;
  }

  [part='attachment-name'] {
    grid-column: 2;
    padding: var(--vaadin-message-attachment-padding, var(--vaadin-padding-s));
    padding-inline-start: 0;
  }
`;
/**
 * @license
 * Copyright (c) 2021 - 2026 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const MessageMixin = (superClass) => class MessageMixinClass extends FocusMixin(superClass) {
  static get properties() {
    return {
      /**
       * Time of sending the message. It is rendered as-is to the part='time' slot,
       * so the formatting is up to you.
       */
      time: {
        type: String
      },
      /**
       * The name of the user posting the message.
       * It will be placed in the name part to indicate who has sent the message.
       * It is also used as a tooltip for the avatar.
       * Example: `message.userName = "Jessica Jacobs";`
       * @attr {string} user-name
       */
      userName: {
        type: String
      },
      /**
       * The abbreviation of the user.
       * The abbreviation will be passed on to avatar of the message.
       * If the user does not have an avatar picture set with `userImg`, `userAbbr` will be shown in the avatar.
       * Example: `message.userAbbr = "JJ";`
       * @attr {string} user-abbr
       */
      userAbbr: {
        type: String
      },
      /**
       * An URL for a user image.
       * The image will be used in the avatar component to show who has sent the message.
       * Example: `message.userImg = "/static/img/avatar.jpg";`
       * @attr {string} user-img
       */
      userImg: {
        type: String
      },
      /**
       * A color index to be used to render the color of the avatar.
       *
       * @attr {number} user-color-index
       */
      userColorIndex: {
        type: Number
      },
      /**
       * An array of attachment objects to display with the message.
       * Each attachment object can have the following properties:
       * - `name`: The name of the attachment file
       * - `url`: The URL of the attachment
       * - `type`: The MIME type of the attachment (e.g., 'image/png', 'application/pdf')
       *
       * Image attachments (type starting with "image/") show a thumbnail preview,
       * while other attachments show a document icon with the file name.
       *
       * @type {Array<{name?: string, url?: string, type?: string}>}
       */
      attachments: {
        type: Array
      },
      /** @private */
      _avatar: {
        type: Object
      }
    };
  }
  static get observers() {
    return ["__avatarChanged(_avatar, userName, userAbbr, userImg, userColorIndex)"];
  }
  /** @protected */
  ready() {
    super.ready();
    this._avatarController = new SlotController(this, "avatar", "vaadin-avatar", {
      initializer: (avatar) => {
        avatar.setAttribute("aria-hidden", "true");
        this._avatar = avatar;
      }
    });
    this.addController(this._avatarController);
  }
  /** @private */
  __avatarChanged(avatar, userName, userAbbr, userImg, userColorIndex) {
    if (avatar) {
      avatar.setProperties({
        name: userName,
        abbr: userAbbr,
        img: userImg,
        colorIndex: userColorIndex
      });
    }
  }
  /**
   * Renders attachments for the message.
   * @private
   */
  __renderAttachments() {
    if (!(window.Vaadin && window.Vaadin.featureFlags && (window.Vaadin.featureFlags.messageListAttachments || window.Vaadin.featureFlags.aiComponents))) {
      return "";
    }
    const attachments = this.attachments;
    if (!attachments || attachments.length === 0) {
      return "";
    }
    return html`
        <div part="attachments">${attachments.map((attachment) => this.__renderAttachment(attachment))}</div>
      `;
  }
  /**
   * Renders a single attachment.
   * @param {Object} attachment - The attachment object with name, url, and type properties
   * @private
   */
  __renderAttachment(attachment) {
    const isImage = attachment.type && attachment.type.startsWith("image/");
    if (isImage) {
      return html`
          <button
            type="button"
            part="attachment attachment-image"
            aria-label="${attachment.name || ""}"
            @click="${() => this.__onAttachmentClick(attachment)}"
          >
            <img part="attachment-preview" src="${ifDefined(attachment.url)}" alt="" />
          </button>
        `;
    }
    return html`
        <button type="button" part="attachment attachment-file" @click="${() => this.__onAttachmentClick(attachment)}">
          <span part="attachment-icon" aria-hidden="true"></span>
          <span part="attachment-name">${attachment.name || ""}</span>
        </button>
      `;
  }
  /**
   * Dispatches an event when an attachment is clicked.
   * @param {Object} attachment - The attachment that was clicked
   * @private
   */
  __onAttachmentClick(attachment) {
    this.dispatchEvent(
      new CustomEvent("attachment-click", {
        detail: { attachment }
      })
    );
  }
  /**
   * Fired when an attachment is clicked.
   * @event attachment-click
   */
};
/**
 * @license
 * Copyright (c) 2021 - 2026 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
class Message extends MessageMixin(ElementMixin(ThemableMixin(PolylitMixin(LumoInjectionMixin(LitElement))))) {
  static get is() {
    return "vaadin-message";
  }
  static get styles() {
    return messageStyles;
  }
  static get lumoInjector() {
    return { ...super.lumoInjector, includeBaseStyles: true };
  }
  /** @protected */
  render() {
    return html`
      <slot name="avatar"></slot>
      <div part="content">
        <div part="header">
          <span part="name">${this.userName}</span>
          <span part="time">${this.time}</span>
        </div>
        ${this.__renderAttachments()}
        <div part="message"><slot></slot></div>
      </div>
    `;
  }
}
defineCustomElement(Message);
const MessageListMixin = (superClass) => class MessageListMixinClass extends KeyboardDirectionMixin(superClass) {
  static get properties() {
    return {
      /**
       * An array of objects which will be rendered as messages.
       * The message objects can have the following properties:
       * ```js
       * Array<{
       *   text: string,
       *   time: string,
       *   userName: string,
       *   userAbbr: string,
       *   userImg: string,
       *   userColorIndex: number,
       *   className: string,
       *   theme: string,
       *   attachments: Array<{
       *     name: string,
       *     url: string,
       *     type: string
       *   }>
       * }>
       * ```
       *
       * When a message has attachments, they are rendered in the message's shadow DOM.
       * Image attachments (type starting with "image/") show a thumbnail preview,
       * while other attachments show a document icon with the file name.
       * Clicking an attachment dispatches an `attachment-click` event.
       */
      items: {
        type: Array,
        value: () => [],
        observer: "_itemsChanged",
        sync: true
      },
      /**
       * When set to `true`, the message text is parsed as Markdown.
       */
      markdown: {
        type: Boolean,
        observer: "__markdownChanged",
        reflectToAttribute: true
      },
      /**
       * When set to `true`, new messages are announced to assistive technologies using ARIA live regions.
       * @attr {boolean} announce-messages
       */
      announceMessages: {
        type: Boolean,
        value: false,
        observer: "__announceChanged",
        sync: true
      }
    };
  }
  /** @protected */
  get _messages() {
    return [...this.querySelectorAll("vaadin-message")];
  }
  /** @protected */
  ready() {
    super.ready();
    this.setAttribute("aria-relevant", "additions");
    this.setAttribute("role", "region");
  }
  /**
   * Handles attachment-click events from child messages and dispatches
   * a new event enriched with the item.
   * @param {CustomEvent} e
   * @param {Object} item
   * @private
   */
  __onAttachmentClick(e, item) {
    this.dispatchEvent(
      new CustomEvent("attachment-click", {
        detail: {
          ...e.detail,
          item
        }
      })
    );
  }
  /**
   * Override method inherited from `KeyboardDirectionMixin`
   * to use the list of message elements as items.
   *
   * @return {Element[]}
   * @protected
   * @override
   */
  _getItems() {
    return this._messages;
  }
  /** @private */
  _itemsChanged(newVal, oldVal) {
    const items = newVal || [];
    const oldItems = oldVal || [];
    if (items.length || oldItems.length) {
      const focusedIndex = this._getIndexOfFocusableElement();
      const closeToBottom = this.scrollHeight < this.clientHeight + this.scrollTop + 50;
      this._renderMessages(items);
      this._setTabIndexesByIndex(focusedIndex);
      if (oldItems.length) {
        this.__enableScrollSnapping();
      }
      requestAnimationFrame(() => {
        if (items.length > oldItems.length && closeToBottom) {
          this._scrollToLastMessage();
        }
      });
    }
  }
  /** @private */
  __markdownChanged(markdown) {
    if (markdown && !customElements.get("vaadin-markdown")) {
      __vitePreload(() => Promise.resolve().then(() => vaadinMarkdown), true ? void 0 : void 0, import.meta.url).then(() => customElements.whenDefined("vaadin-markdown")).then(() => this._renderMessages(this.items));
    }
    this._renderMessages(this.items);
  }
  /** @private */
  _renderMessages(items) {
    const loadingMarkdown = this.markdown && !customElements.get("vaadin-markdown");
    render(
      html`
          ${items.map(
        (item) => html`
              <vaadin-message
                role="listitem"
                .time="${item.time}"
                .userAbbr="${item.userAbbr}"
                .userName="${item.userName}"
                .userImg="${item.userImg}"
                .userColorIndex="${item.userColorIndex}"
                .attachments="${item.attachments}"
                theme="${ifDefined(item.theme)}"
                class="${ifDefined(item.className)}"
                @focusin="${this._onMessageFocusIn}"
                @attachment-click="${(e) => this.__onAttachmentClick(e, item)}"
                style="${ifDefined(loadingMarkdown ? "visibility: hidden" : void 0)}"
                >${this.markdown ? html`<vaadin-markdown .content=${item.text}></vaadin-markdown>` : item.text}<vaadin-avatar slot="avatar"></vaadin-avatar
              ></vaadin-message>
            `
      )}
        `,
      this,
      { host: this }
    );
  }
  /** @private */
  _scrollToLastMessage() {
    if (this.items.length > 0) {
      this.scrollTop = this.scrollHeight - this.clientHeight;
    }
  }
  /** @private */
  __enableScrollSnapping() {
    this.$.list.style.setProperty("--_vaadin-message-list-scroll-snap-align", "end");
    this.__debounceScrollSnapping = Debouncer.debounce(this.__debounceScrollSnapping, timeOut.after(500), () => {
      this.$.list.style.removeProperty("--_vaadin-message-list-scroll-snap-align");
    });
  }
  /** @private */
  _onMessageFocusIn(e) {
    const target = e.composedPath().find((node) => node instanceof customElements.get("vaadin-message"));
    this._setTabIndexesByMessage(target);
  }
  /**
   * @param {number} index
   * @protected
   */
  _setTabIndexesByIndex(index) {
    const message2 = this._messages[index] || this._messages[0];
    this._setTabIndexesByMessage(message2);
  }
  /** @private */
  _setTabIndexesByMessage(message2) {
    this._messages.forEach((e) => {
      e.tabIndex = e === message2 ? 0 : -1;
    });
  }
  /** @private */
  _getIndexOfFocusableElement() {
    const index = this._messages.findIndex((e) => e.tabIndex === 0);
    return index !== -1 ? index : 0;
  }
  /** @private */
  __announceChanged(announceMessages) {
    this.ariaLive = announceMessages ? "polite" : null;
  }
  /**
   * Fired when an attachment is clicked.
   * @event attachment-click
   */
};
/**
 * @license
 * Copyright (c) 2021 - 2026 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
class MessageList extends SlotStylesMixin(MessageListMixin(ElementMixin(ThemableMixin(PolylitMixin(LitElement))))) {
  static get is() {
    return "vaadin-message-list";
  }
  static get styles() {
    return css`
      :host {
        display: block;
        overflow: auto;
        padding: var(--vaadin-message-list-padding, var(--vaadin-padding-xs) 0);
        scroll-padding: var(--vaadin-message-list-padding, var(--vaadin-padding-xs) 0);
        scroll-snap-type: y proximity;
      }

      :host([hidden]) {
        display: none !important;
      }

      [part='list']::after {
        content: '';
        display: block;
        scroll-snap-align: var(--_vaadin-message-list-scroll-snap-align, none);
      }
    `;
  }
  /** @protected */
  render() {
    return html`
      <div part="list" role="list" id="list">
        <slot></slot>
      </div>
    `;
  }
  /** @protected */
  get slotStyles() {
    const tag = this.localName;
    return [
      `
      ${tag} :where(vaadin-markdown > :is(h1, h2, h3, h4, h5, h6, p, ul, ol):first-child) {
        margin-top: 0;
      }

      ${tag} :where(vaadin-markdown > :is(h1, h2, h3, h4, h5, h6, p, ul, ol):last-child) {
        margin-bottom: 0;
      }
      `
    ];
  }
}
defineCustomElement(MessageList);
/**
 * @license
 * Copyright (c) 2017 - 2026 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const notificationCardStyles = css`
  :host {
    display: block;
  }

  [part='overlay'] {
    pointer-events: auto;
    box-sizing: border-box;
    width: var(--vaadin-notification-width, 40ch);
    max-width: 100%;
    padding: var(--vaadin-notification-padding, var(--vaadin-padding-s));
    background: var(--vaadin-notification-background, var(--vaadin-background-container));
    border: var(--vaadin-notification-border-width, 1px) solid
      var(--vaadin-notification-border-color, var(--vaadin-border-color-secondary));
    box-shadow: var(--vaadin-notification-shadow, 0 8px 24px -4px rgba(0, 0, 0, 0.3));
    border-radius: var(--vaadin-notification-border-radius, var(--vaadin-radius-l));
    cursor: default;
  }

  @media (forced-colors: active) {
    [part='overlay'] {
      border: 3px solid !important;
    }
  }
`;
/**
 * @license
 * Copyright (c) 2017 - 2026 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const notificationContainerStyles = css`
  :host {
    /* How much space to reserve for overlay box shadow, to prevent clipping it with overflow:auto */
    --_paint-area: 2em;
    /* Space between notifications and the viewport */
    --_padding: var(--vaadin-notification-viewport-inset, var(--vaadin-padding-s));
    /* Space between notifications */
    --_gap: var(--vaadin-notification-container-gap, var(--vaadin-gap-s));
    display: grid;
    /* top-stretch, top and bottom regions, bottom-stretch */
    grid-template-rows: auto 1fr auto;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    overflow: hidden;
    padding: max(env(safe-area-inset-top, 0px), var(--_padding)) max(env(safe-area-inset-right, 0px), var(--_padding))
      max(env(safe-area-inset-bottom, 0px), var(--_padding)) max(env(safe-area-inset-left, 0px), var(--_padding));
    border: 0;
    background: transparent;
    pointer-events: none;
    interpolate-size: allow-keywords;
  }

  :host > * {
    grid-column: 1;
  }

  [region-group] {
    position: relative;
    grid-row: 2 / 3;
  }

  [region] {
    max-width: 100%;
    max-height: 100%;
    pointer-events: auto;
    scrollbar-width: none;
  }

  /* scrollbar-width is supported since Safari 18.2, use the following for earlier */
  [region]::-webkit-scrollbar {
    display: none;
  }

  [region='top-stretch'] {
    grid-row: 1;
    z-index: 2;
    --vaadin-notification-width: 100%;
  }

  [region='bottom-stretch'] {
    grid-row: 3;
    z-index: 2;
    --vaadin-notification-width: 100%;
  }

  [region='middle'],
  [region-group] > [region] {
    position: absolute;
  }

  [region='middle'] {
    position: fixed;
    top: 50%;
    left: 50%;
    translate: round(-50%, 1px) round(-50%, 1px);
    max-width: calc(100% - var(--_padding) * 2);
  }

  [region]:where(:hover, :focus-within) {
    z-index: 1;
    overflow: auto;
    overscroll-behavior: contain;
    padding: var(--_paint-area);
  }

  [region]:not([region='middle'], [region$='center']):where(:hover, :focus-within) {
    margin-inline: calc(var(--_paint-area) * -1);
  }

  [region]:not([region='middle']):where(:hover, :focus-within) {
    margin-block: calc(var(--_paint-area) * -1);
  }

  [region-group='top'] > [region] {
    top: 0;
  }

  [region-group='bottom'] > [region] {
    bottom: 0;
  }

  [region-group] > [region$='start'] {
    inset-inline-start: 0;
  }

  [region-group] > [region$='center'] {
    left: 50%;
    translate: -50%;
  }

  [region-group] > [region$='end'] {
    inset-inline-end: 0;
  }

  ::slotted(*) {
    margin-bottom: var(--_gap);
  }

  :is([region^='bottom'], [region='middle']) ::slotted(*) {
    margin-top: var(--_gap);
    margin-bottom: 0;
  }
`;
/**
 * @license
 * Copyright (c) 2023 - 2026 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const OverlayClassMixin = (superclass) => class OverlayClassMixinClass extends superclass {
  static get properties() {
    return {
      /**
       * A space-delimited list of CSS class names to set on the overlay element.
       * This property does not affect other CSS class names set manually via JS.
       *
       * Note, if the CSS class name was set with this property, clearing it will
       * remove it from the overlay, even if the same class name was also added
       * manually, e.g. by using `classList.add()` in the `renderer` function.
       *
       * @attr {string} overlay-class
       */
      overlayClass: {
        type: String
      },
      /**
       * An overlay element on which CSS class names are set.
       *
       * @protected
       */
      _overlayElement: {
        type: Object
      }
    };
  }
  static get observers() {
    return ["__updateOverlayClassNames(overlayClass, _overlayElement)"];
  }
  /** @private */
  __updateOverlayClassNames(overlayClass, overlayElement) {
    if (!overlayElement) {
      return;
    }
    if (overlayClass === void 0) {
      return;
    }
    const { classList } = overlayElement;
    if (!this.__initialClasses) {
      this.__initialClasses = new Set(classList);
    }
    if (Array.isArray(this.__previousClasses)) {
      const classesToRemove = this.__previousClasses.filter((name) => !this.__initialClasses.has(name));
      if (classesToRemove.length > 0) {
        classList.remove(...classesToRemove);
      }
    }
    const classesToAdd = typeof overlayClass === "string" ? overlayClass.split(" ").filter(Boolean) : [];
    if (classesToAdd.length > 0) {
      classList.add(...classesToAdd);
    }
    this.__previousClasses = classesToAdd;
  }
};
/**
 * @license
 * Copyright (c) 2017 - 2026 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const NotificationContainerMixin = (superClass) => class extends superClass {
  static get properties() {
    return {
      /**
       * True when the container is opened
       */
      opened: {
        type: Boolean,
        value: false,
        sync: true,
        observer: "_openedChanged"
      }
    };
  }
  constructor() {
    super();
    this._boundVaadinOverlayClose = this._onVaadinOverlayClose.bind(this);
    if (isIOS) {
      this._boundIosResizeListener = () => this._detectIosNavbar();
    }
  }
  /** @protected */
  firstUpdated(props) {
    super.firstUpdated(props);
    this.popover = "manual";
  }
  /**
   * Move the notification container to the top of the stack.
   */
  bringToFront() {
    if (this.matches(":popover-open")) {
      this.hidePopover();
      this.showPopover();
    }
  }
  /** @private */
  _openedChanged(opened) {
    if (opened) {
      document.body.appendChild(this);
      this.showPopover();
      document.addEventListener("vaadin-overlay-close", this._boundVaadinOverlayClose);
      if (this._boundIosResizeListener) {
        this._detectIosNavbar();
        window.addEventListener("resize", this._boundIosResizeListener);
      }
    } else {
      document.body.removeChild(this);
      this.hidePopover();
      document.removeEventListener("vaadin-overlay-close", this._boundVaadinOverlayClose);
      if (this._boundIosResizeListener) {
        window.removeEventListener("resize", this._boundIosResizeListener);
      }
    }
  }
  /** @private */
  _detectIosNavbar() {
    const innerHeight = window.innerHeight;
    const innerWidth = window.innerWidth;
    const landscape = innerWidth > innerHeight;
    const clientHeight = document.documentElement.clientHeight;
    if (landscape && clientHeight > innerHeight) {
      this.style.bottom = `${clientHeight - innerHeight}px`;
    } else {
      this.style.bottom = "0";
    }
  }
  /** @private */
  _onVaadinOverlayClose(event) {
    const sourceEvent = event.detail.sourceEvent;
    const isFromNotification = sourceEvent && sourceEvent.composedPath().indexOf(this) >= 0;
    if (isFromNotification) {
      event.preventDefault();
    }
  }
};
const NotificationMixin = (superClass) => class extends ThemePropertyMixin(OverlayClassMixin(superClass)) {
  static get properties() {
    return {
      /**
       * When true, the notification card has `aria-live` attribute set to
       * `assertive` instead of `polite`. This makes screen readers announce
       * the notification content immediately when it appears.
       */
      assertive: {
        type: Boolean,
        value: false,
        sync: true
      },
      /**
       * The duration in milliseconds to show the notification.
       * Set to `0` or a negative number to disable the notification auto-closing.
       */
      duration: {
        type: Number,
        value: 5e3,
        sync: true
      },
      /**
       * True if the notification is currently displayed.
       */
      opened: {
        type: Boolean,
        value: false,
        notify: true,
        sync: true,
        observer: "_openedChanged"
      },
      /**
       * Alignment of the notification in the viewport
       * Valid values are `top-stretch|top-start|top-center|top-end|middle|bottom-start|bottom-center|bottom-end|bottom-stretch`
       */
      position: {
        type: String,
        value: "bottom-start",
        observer: "_positionChanged",
        sync: true
      },
      /**
       * Custom function for rendering the content of the notification.
       * Receives two arguments:
       *
       * - `root` The `<vaadin-notification-card>` DOM element. Append
       *   your content to it.
       * - `notification` The reference to the `<vaadin-notification>` element.
       * @type {!NotificationRenderer | undefined}
       */
      renderer: {
        type: Function,
        sync: true
      }
    };
  }
  static get observers() {
    return ["_durationChanged(duration, opened)", "_rendererChanged(renderer, opened, _overlayElement)"];
  }
  /**
   * Shows a notification with the given content.
   * By default, positions the notification at `bottom-start` and uses a 5 second duration.
   * An options object can be passed to configure the notification.
   * The options object has the following structure:
   *
   * ```ts
   * {
   *   assertive?: boolean
   *   position?: string
   *   duration?: number
   *   theme?: string
   * }
   * ```
   *
   * See the individual documentation for:
   * - [`assertive`](#/elements/vaadin-notification#property-assertive)
   * - [`position`](#/elements/vaadin-notification#property-position)
   * - [`duration`](#/elements/vaadin-notification#property-duration)
   *
   * @param contents the contents to show, either as a string or a Lit template.
   * @param options optional options for customizing the notification.
   */
  static show(contents, options) {
    const Notification2 = customElements.get("vaadin-notification");
    if (isTemplateResult(contents)) {
      return Notification2._createAndShowNotification((root) => {
        render(contents, root);
      }, options);
    }
    return Notification2._createAndShowNotification((root) => {
      root.innerText = contents;
    }, options);
  }
  /** @private */
  static _createAndShowNotification(renderer, options) {
    const notification = document.createElement("vaadin-notification");
    if (options && Number.isFinite(options.duration)) {
      notification.duration = options.duration;
    }
    if (options && options.position) {
      notification.position = options.position;
    }
    if (options && options.assertive) {
      notification.assertive = options.assertive;
    }
    if (options && options.theme) {
      notification.setAttribute("theme", options.theme);
    }
    if (options && options.className) {
      notification.overlayClass = options.className;
    }
    notification.renderer = renderer;
    document.body.appendChild(notification);
    notification.opened = true;
    notification.addEventListener("opened-changed", (e) => {
      if (!e.detail.value) {
        notification.remove();
      }
    });
    return notification;
  }
  /** @private */
  get _container() {
    const Notification2 = customElements.get("vaadin-notification");
    if (!Notification2._container) {
      Notification2._container = document.createElement("vaadin-notification-container");
      document.body.appendChild(Notification2._container);
    }
    return Notification2._container;
  }
  /** @protected */
  get _card() {
    return this._overlayElement;
  }
  /** @protected */
  ready() {
    super.ready();
    this._overlayElement = this.shadowRoot.querySelector("vaadin-notification-card");
  }
  /** @protected */
  disconnectedCallback() {
    super.disconnectedCallback();
    queueMicrotask(() => {
      if (!this.isConnected) {
        this.opened = false;
      }
    });
  }
  /**
   * Requests an update for the content of the notification.
   * While performing the update, it invokes the renderer passed in the `renderer` property.
   *
   * It is not guaranteed that the update happens immediately (synchronously) after it is requested.
   */
  requestContentUpdate() {
    if (!this.renderer || !this._card) {
      return;
    }
    this.renderer(this._card, this);
  }
  /** @private */
  __computeAriaLive(assertive) {
    return assertive ? "assertive" : "polite";
  }
  /** @private */
  _rendererChanged(renderer, opened, card) {
    if (!card) {
      return;
    }
    const rendererChanged = this._oldRenderer !== renderer;
    this._oldRenderer = renderer;
    if (rendererChanged) {
      card.innerHTML = "";
      delete card._$litPart$;
    }
    if (opened) {
      if (!this._didAnimateNotificationAppend) {
        this._animatedAppendNotificationCard();
      }
      this.requestContentUpdate();
    }
  }
  /**
   * Opens the notification.
   */
  open() {
    this.opened = true;
  }
  /**
   * Closes the notification.
   */
  close() {
    this.opened = false;
  }
  /** @private */
  _openedChanged(opened) {
    if (opened) {
      this._container.opened = true;
      this._animatedAppendNotificationCard();
    } else if (this._card) {
      this._closeNotificationCard();
    }
  }
  /** @private */
  __cleanUpOpeningClosingState() {
    this._card.removeAttribute("opening");
    this._card.removeAttribute("closing");
    this._card.removeEventListener("animationend", this.__animationEndListener);
  }
  /** @private */
  _animatedAppendNotificationCard() {
    if (this._card) {
      this.__cleanUpOpeningClosingState();
      this._card.setAttribute("opening", "");
      this._appendNotificationCard();
      this.__animationEndListener = () => this.__cleanUpOpeningClosingState();
      this._card.addEventListener("animationend", this.__animationEndListener);
      this._didAnimateNotificationAppend = true;
    } else {
      this._didAnimateNotificationAppend = false;
    }
  }
  /** @private */
  _appendNotificationCard() {
    if (!this._card) {
      return;
    }
    if (!this._container.shadowRoot.querySelector(`slot[name="${this.position}"]`)) {
      console.warn(`Invalid alignment parameter provided: position=${this.position}`);
      return;
    }
    if (this._container.firstElementChild) {
      this._container.bringToFront();
    }
    this._card.slot = this.position;
    if (this._container.firstElementChild && /top/u.test(this.position)) {
      this._container.insertBefore(this._card, this._container.firstElementChild);
    } else {
      this._container.appendChild(this._card);
    }
  }
  /** @private */
  _removeNotificationCard() {
    if (!this._card) {
      return;
    }
    if (this._card.parentNode) {
      this._card.parentNode.removeChild(this._card);
    }
    this._card.removeAttribute("closing");
    this._container.opened = Boolean(this._container.firstElementChild);
    this.dispatchEvent(new CustomEvent("closed"));
  }
  /** @private */
  _closeNotificationCard() {
    if (this._durationTimeoutId) {
      clearTimeout(this._durationTimeoutId);
    }
    this._animatedRemoveNotificationCard();
  }
  /** @private */
  _animatedRemoveNotificationCard() {
    this.__cleanUpOpeningClosingState();
    this._card.setAttribute("closing", "");
    const name = getComputedStyle(this._card).getPropertyValue("animation-name");
    if (name && name !== "none") {
      this.__animationEndListener = () => {
        this._removeNotificationCard();
        this.__cleanUpOpeningClosingState();
      };
      this._card.addEventListener("animationend", this.__animationEndListener);
    } else {
      this._removeNotificationCard();
    }
  }
  /** @private */
  _positionChanged() {
    if (this.opened) {
      this._animatedAppendNotificationCard();
    }
  }
  /** @private */
  _durationChanged(duration, opened) {
    if (opened) {
      clearTimeout(this._durationTimeoutId);
      if (duration > 0) {
        this._durationTimeoutId = setTimeout(() => this.close(), duration);
      }
    }
  }
  /**
   * Fired when the notification is closed.
   *
   * @event closed
   */
};
/**
 * @license
 * Copyright (c) 2017 - 2026 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
class NotificationContainer extends NotificationContainerMixin(
  ThemableMixin(ElementMixin(PolylitMixin(LumoInjectionMixin(LitElement))))
) {
  static get is() {
    return "vaadin-notification-container";
  }
  static get styles() {
    return notificationContainerStyles;
  }
  /** @protected */
  render() {
    return html`
      <div region="top-stretch"><slot name="top-stretch"></slot></div>
      <div region-group="top">
        <div region="top-start"><slot name="top-start"></slot></div>
        <div region="top-center"><slot name="top-center"></slot></div>
        <div region="top-end"><slot name="top-end"></slot></div>
      </div>
      <div region="middle"><slot name="middle"></slot></div>
      <div region-group="bottom">
        <div region="bottom-start"><slot name="bottom-start"></slot></div>
        <div region="bottom-center"><slot name="bottom-center"></slot></div>
        <div region="bottom-end"><slot name="bottom-end"></slot></div>
      </div>
      <div region="bottom-stretch"><slot name="bottom-stretch"></slot></div>
    `;
  }
}
class NotificationCard extends ThemableMixin(PolylitMixin(LumoInjectionMixin(LitElement))) {
  static get is() {
    return "vaadin-notification-card";
  }
  static get styles() {
    return notificationCardStyles;
  }
  /** @protected */
  render() {
    return html`
      <div part="overlay">
        <div part="content">
          <slot></slot>
        </div>
      </div>
    `;
  }
  /** @protected */
  ready() {
    super.ready();
    this.setAttribute("role", "alert");
  }
}
class Notification extends NotificationMixin(ElementMixin(ThemableMixin(PolylitMixin(LitElement)))) {
  static get is() {
    return "vaadin-notification";
  }
  static get styles() {
    return css`
      :host {
        display: none !important;
      }
    `;
  }
  /** @protected */
  render() {
    return html`
      <vaadin-notification-card
        theme="${ifDefined(this._theme)}"
        aria-live="${this.__computeAriaLive(this.assertive)}"
      ></vaadin-notification-card>
    `;
  }
  /**
   * Fired when the notification is closed.
   *
   * @event closed
   */
}
defineCustomElement(NotificationContainer);
defineCustomElement(NotificationCard);
defineCustomElement(Notification);
const _window$2 = window;
_window$2.Vaadin ||= {};
_window$2.Vaadin.Flow ||= {};
_window$2.Vaadin.Flow.popover ||= {};
Object.assign(_window$2.Vaadin.Flow.popover, {
  setDefaultHideDelay: (hideDelay) => Popover.setDefaultHideDelay(hideDelay),
  setDefaultFocusDelay: (focusDelay) => Popover.setDefaultFocusDelay(focusDelay),
  setDefaultHoverDelay: (hoverDelay) => Popover.setDefaultHoverDelay(hoverDelay)
});
const { defaultHideDelay: defaultHideDelay$1, defaultFocusDelay: defaultFocusDelay$1, defaultHoverDelay: defaultHoverDelay$1 } = _window$2.Vaadin.Flow.popover;
if (defaultHideDelay$1) {
  Popover.setDefaultHideDelay(defaultHideDelay$1);
}
if (defaultFocusDelay$1) {
  Popover.setDefaultFocusDelay(defaultFocusDelay$1);
}
if (defaultHoverDelay$1) {
  Popover.setDefaultHoverDelay(defaultHoverDelay$1);
}
/**
 * @license
 * Copyright (c) 2017 - 2026 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const progressBarStyles = css`
  :host {
    display: block;
    width: 100%; /* prevent collapsing inside non-stretching column flex */
    height: var(--vaadin-progress-bar-height, 0.5lh);
    contain: layout size;
  }

  :host([hidden]) {
    display: none !important;
  }

  [part='bar'] {
    box-sizing: border-box;
    height: 100%;
    --_padding: var(--vaadin-progress-bar-padding, 0px);
    padding: var(--_padding);
    background: var(--vaadin-progress-bar-background, var(--vaadin-background-container));
    border-radius: var(--vaadin-progress-bar-border-radius, var(--vaadin-radius-m));
    border: var(--vaadin-progress-bar-border-width, 1px) solid
      var(--vaadin-progress-bar-border-color, var(--vaadin-border-color-secondary));
  }

  [part='value'] {
    box-sizing: border-box;
    height: 100%;
    width: calc(var(--vaadin-progress-value) * 100%);
    background: var(--vaadin-progress-bar-value-background, var(--vaadin-border-color));
    border-radius: calc(
      var(--vaadin-progress-bar-border-radius, var(--vaadin-radius-m)) - var(
          --vaadin-progress-bar-border-width,
          1px
        ) - var(--_padding)
    );
    transition: width 150ms;
  }

  /* Indeterminate progress */
  :host([indeterminate]) [part='value'] {
    --_w-min: clamp(8px, 5%, 16px);
    --_w-max: clamp(16px, 20%, 128px);
    animation: indeterminate var(--vaadin-progress-bar-animation-duration, 1s) linear infinite alternate;
    width: var(--_w-min);
  }

  :host([indeterminate][aria-valuenow]) [part='value'] {
    animation-delay: 150ms;
  }

  @keyframes indeterminate {
    0% {
      animation-timing-function: ease-in;
    }

    20% {
      margin-inline-start: 0%;
      width: var(--_w-max);
    }

    50% {
      margin-inline-start: calc(50% - var(--_w-max) / 2);
    }

    80% {
      width: var(--_w-max);
      margin-inline-start: calc(100% - var(--_w-max));
      animation-timing-function: ease-out;
    }

    100% {
      width: var(--_w-min);
      margin-inline-start: calc(100% - var(--_w-min));
    }
  }

  @keyframes indeterminate-reduced {
    100% {
      opacity: 0.2;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    [part='value'] {
      transition: none;
    }

    :host([indeterminate]) [part='value'] {
      width: 25%;
      animation: indeterminate-reduced 2s linear infinite alternate;
    }
  }

  @media (forced-colors: active) {
    [part='bar'] {
      border-width: max(1px, var(--vaadin-progress-bar-border-width));
    }

    [part='value'] {
      background: CanvasText !important;
    }
  }
`;
/**
 * @license
 * Copyright (c) 2017 - 2026 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const ProgressMixin = (superClass) => class VaadinProgressMixin extends superClass {
  static get properties() {
    return {
      /**
       * Current progress value.
       */
      value: {
        type: Number,
        observer: "_valueChanged"
      },
      /**
       * Minimum bound of the progress bar.
       */
      min: {
        type: Number,
        value: 0,
        observer: "_minChanged"
      },
      /**
       * Maximum bound of the progress bar.
       */
      max: {
        type: Number,
        value: 1,
        observer: "_maxChanged"
      },
      /**
       * Indeterminate state of the progress bar.
       * This property takes precedence over other state properties (min, max, value).
       */
      indeterminate: {
        type: Boolean,
        value: false,
        reflectToAttribute: true
      }
    };
  }
  static get observers() {
    return ["_normalizedValueChanged(value, min, max)"];
  }
  /** @protected */
  ready() {
    super.ready();
    this.setAttribute("role", "progressbar");
  }
  /** @private */
  _normalizedValueChanged(value, min, max) {
    const newNormalizedValue = this._normalizeValue(value, min, max);
    this.style.setProperty("--vaadin-progress-value", newNormalizedValue);
  }
  /** @private */
  _valueChanged(newV) {
    this.setAttribute("aria-valuenow", newV);
  }
  /** @private */
  _minChanged(newV) {
    this.setAttribute("aria-valuemin", newV);
  }
  /** @private */
  _maxChanged(newV) {
    this.setAttribute("aria-valuemax", newV);
  }
  /**
   * Percent of current progress relative to whole progress bar (max - min)
   * @private
   */
  _normalizeValue(value, min, max) {
    let nV;
    if (!value && value !== 0) {
      nV = 0;
    } else if (min >= max) {
      nV = 1;
    } else {
      nV = (value - min) / (max - min);
      nV = Math.min(Math.max(nV, 0), 1);
    }
    return nV;
  }
};
/**
 * @license
 * Copyright (c) 2017 - 2026 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
class ProgressBar extends ProgressMixin(ElementMixin(ThemableMixin(PolylitMixin(LumoInjectionMixin(LitElement))))) {
  static get is() {
    return "vaadin-progress-bar";
  }
  static get styles() {
    return progressBarStyles;
  }
  /** @protected */
  render() {
    return html`
      <div part="bar">
        <div part="value"></div>
      </div>
    `;
  }
}
defineCustomElement(ProgressBar);
function stateReducer(state, action) {
  switch (action.type) {
    case "stateKeyChanged":
      const { value } = action;
      return {
        ...state,
        key: value
      };
    default:
      return state;
  }
}
const emptyAction = () => {
};
class ReactAdapterElement extends HTMLElement {
  #root = void 0;
  #rootRendered = false;
  #rendering = void 0;
  #state = /* @__PURE__ */ Object.create(null);
  #stateSetters = /* @__PURE__ */ new Map();
  #customEvents = /* @__PURE__ */ new Map();
  #dispatchFlowState = emptyAction;
  #readyCallback = /* @__PURE__ */ new Map();
  #renderHooks;
  #Wrapper;
  #unmounting;
  constructor() {
    super();
    this.#renderHooks = {
      useState: this.useState.bind(this),
      useCustomEvent: this.useCustomEvent.bind(this),
      useContent: this.useContent.bind(this)
    };
    this.#Wrapper = this.#renderWrapper.bind(this);
    this.#markAsUsed();
  }
  async connectedCallback() {
    this.#rendering = /* @__PURE__ */ reactExports.createElement(this.#Wrapper);
    const createNewRoot = this.dispatchEvent(
      new CustomEvent("flow-portal-add", {
        bubbles: true,
        cancelable: true,
        composed: true,
        detail: {
          children: this.#rendering,
          domNode: this
        }
      })
    );
    if (!createNewRoot || this.#root) {
      return;
    }
    await this.#unmounting;
    this.#root = clientExports.createRoot(this);
    this.#maybeRenderRoot();
    this.#root.render(this.#rendering);
  }
  /**
   * Add a callback for specified element identifier to be called when
   * react element is ready.
   * <p>
   * For internal use only. May be renamed or removed in a future release.
   *
   * @param id element identifier that callback is for
   * @param readyCallback callback method to be informed on element ready state
   * @internal
   */
  addReadyCallback(id, readyCallback) {
    this.#readyCallback.set(id, readyCallback);
  }
  async disconnectedCallback() {
    if (!this.#root) {
      this.dispatchEvent(
        new CustomEvent("flow-portal-remove", {
          bubbles: true,
          cancelable: true,
          composed: true,
          detail: {
            children: this.#rendering,
            domNode: this
          }
        })
      );
    } else {
      this.#unmounting = Promise.resolve();
      await this.#unmounting;
      this.#root.unmount();
      this.#root = void 0;
    }
    this.#rootRendered = false;
    this.#rendering = void 0;
  }
  /**
   * A hook API for using stateful JS properties of the Web Component from
   * the React `render()`.
   *
   * @typeParam T - Type of the state value
   *
   * @param key - Web Component property name, which is used for two-way
   * value propagation from the server and back.
   * @param initialValue - Fallback initial value (optional). Only applies if
   * the Java component constructor does not invoke `setState`.
   * @returns A tuple with two values:
   * 1. The current state.
   * 2. The `set` function for changing the state and triggering render
   * @protected
   */
  useState(key, initialValue) {
    if (this.#stateSetters.has(key)) {
      return [this.#state[key], this.#stateSetters.get(key)];
    }
    const value = this[key] ?? initialValue;
    this.#state[key] = value;
    Object.defineProperty(this, key, {
      enumerable: true,
      get() {
        return this.#state[key];
      },
      set(nextValue) {
        this.#state[key] = nextValue;
        this.#dispatchFlowState({ type: "stateKeyChanged", key, value });
      }
    });
    const dispatchChangedEvent = this.useCustomEvent(`${key}-changed`, { detail: { value } });
    const setValue = (value2) => {
      this.#state[key] = value2;
      dispatchChangedEvent({ value: value2 });
      this.#dispatchFlowState({ type: "stateKeyChanged", key, value: value2 });
    };
    this.#stateSetters.set(key, setValue);
    return [value, setValue];
  }
  /**
   * A hook helper to simplify dispatching a `CustomEvent` on the Web
   * Component from React.
   *
   * @typeParam T - The type for `event.detail` value (optional).
   *
   * @param type - The `CustomEvent` type string.
   * @param options - The settings for the `CustomEvent`.
   * @returns The `dispatch` function. The function parameters change
   * depending on the `T` generic type:
   * - For `undefined` type (default), has no parameters.
   * - For other types, has one parameter for the `event.detail` value of that type.
   * @protected
   */
  useCustomEvent(type, options = {}) {
    if (!this.#customEvents.has(type)) {
      const dispatch = ((detail) => {
        const eventInitDict = detail === void 0 ? options : {
          ...options,
          detail
        };
        const event = new CustomEvent(type, eventInitDict);
        return this.dispatchEvent(event);
      });
      this.#customEvents.set(type, dispatch);
      return dispatch;
    }
    return this.#customEvents.get(type);
  }
  /**
   * Prepare content container for Flow to bind server Element to.
   *
   * @param name container name attribute matching server name attribute
   * @protected
   */
  useContent(name) {
    reactExports.useEffect(() => {
      this.#readyCallback.get(name)?.();
    }, []);
    return /* @__PURE__ */ reactExports.createElement("flow-content-container", { name, style: { display: "contents" } });
  }
  #maybeRenderRoot() {
    if (this.#rootRendered || !this.#root) {
      return;
    }
    this.#root.render(/* @__PURE__ */ reactExports.createElement(this.#Wrapper));
    this.#rootRendered = true;
  }
  #renderWrapper() {
    const [state, dispatchFlowState] = reactExports.useReducer(stateReducer, this.#state);
    this.#state = state;
    this.#dispatchFlowState = dispatchFlowState;
    return this.render(this.#renderHooks);
  }
  #markAsUsed() {
    let vaadinObject = window.Vaadin || {};
    if (vaadinObject.developmentMode) {
      vaadinObject.registrations = vaadinObject.registrations || [];
      vaadinObject.registrations.push({
        is: "ReactAdapterElement",
        version: "25.1.5"
      });
    }
  }
}
var _jsxFileName = "C:\\Users\\Victor\\Documents\\sae\\SAE_Biblio\\src\\main\\frontend\\generated\\jar-resources\\ReactRouterOutletElement.tsx";
class ReactRouterOutletElement extends ReactAdapterElement {
  async connectedCallback() {
    await super.connectedCallback();
    this.style.display = "contents";
  }
  render() {
    return jsxDEV(Outlet, {}, void 0, false, { fileName: _jsxFileName, lineNumber: 12, columnNumber: 12 }, this);
  }
}
customElements.define("react-router-outlet", ReactRouterOutletElement);
window.Vaadin.Flow.selectConnector = {};
window.Vaadin.Flow.selectConnector.initLazy = (select) => {
  if (select.$connector) {
    return;
  }
  select.$connector = {};
  select.renderer = (root) => {
    const listBox = select.querySelector("vaadin-select-list-box");
    if (listBox) {
      if (root.firstChild) {
        root.removeChild(root.firstChild);
      }
      root.appendChild(listBox);
    }
  };
};
const _window$1 = window;
_window$1.Vaadin ||= {};
_window$1.Vaadin.Flow ||= {};
_window$1.Vaadin.Flow.tooltip ||= {};
Object.assign(_window$1.Vaadin.Flow.tooltip, {
  setDefaultHideDelay: (hideDelay) => Tooltip.setDefaultHideDelay(hideDelay),
  setDefaultFocusDelay: (focusDelay) => Tooltip.setDefaultFocusDelay(focusDelay),
  setDefaultHoverDelay: (hoverDelay) => Tooltip.setDefaultHoverDelay(hoverDelay)
});
const { defaultHideDelay, defaultFocusDelay, defaultHoverDelay } = _window$1.Vaadin.Flow.tooltip;
if (defaultHideDelay) {
  Tooltip.setDefaultHideDelay(defaultHideDelay);
}
if (defaultFocusDelay) {
  Tooltip.setDefaultFocusDelay(defaultFocusDelay);
}
if (defaultHoverDelay) {
  Tooltip.setDefaultHoverDelay(defaultHoverDelay);
}
document.addEventListener("click", (event) => {
  const target = event.composedPath().find((node) => node.hasAttribute && node.hasAttribute("disableonclick"));
  if (target) {
    target.disabled = true;
  }
});
/**
 * @license
 * Copyright (c) 2023 - 2026 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
function containsQueryParams(actual, expected) {
  return [...expected.entries()].every(([key, value]) => {
    return actual.getAll(key).includes(value);
  });
}
function matchPaths(actual, expected, matchOptions = { matchNested: false }) {
  const base = document.baseURI;
  const actualUrl = new URL(actual, base);
  const expectedUrl = new URL(expected, base);
  const matchesOrigin = actualUrl.origin === expectedUrl.origin;
  const matchesPath = matchOptions.matchNested ? actualUrl.pathname === expectedUrl.pathname || actualUrl.pathname.startsWith(`${expectedUrl.pathname}/`) : actualUrl.pathname === expectedUrl.pathname;
  return matchesOrigin && matchesPath && containsQueryParams(actualUrl.searchParams, expectedUrl.searchParams);
}
/**
 * @license
 * Copyright (c) 2023 - 2026 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const location$1 = {
  get pathname() {
    return document.location.pathname;
  },
  get search() {
    return document.location.search;
  }
};
/**
 * @license
 * Copyright (c) 2023 - 2026 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const sharedStyles = css`
  :host {
    display: flex;
    flex-direction: column;
    min-width: 0;
    max-width: 100%;
    gap: var(--vaadin-side-nav-items-gap, var(--vaadin-gap-s));
    cursor: default;
    -webkit-tap-highlight-color: transparent;
  }

  :host([hidden]),
  [hidden] {
    display: none !important;
  }

  button {
    appearance: none;
    margin: 0;
    padding: 0;
    border: 0;
    background: transparent;
    color: inherit;
    font: inherit;
    text-align: inherit;
    cursor: var(--vaadin-clickable-cursor);
    flex: none;
  }

  [part='toggle-button'] {
    border-radius: var(--vaadin-side-nav-item-border-radius, var(--vaadin-radius-s));
    color: var(--vaadin-text-color-secondary);
  }

  [part='toggle-button']::before {
    content: '';
    display: block;
    background: currentColor;
    mask: var(--_vaadin-icon-chevron-down) 50% / var(--vaadin-icon-visual-size, 100%) no-repeat;
    width: var(--vaadin-icon-size, 1lh);
    height: var(--vaadin-icon-size, 1lh);
    rotate: -90deg;
  }

  :host([dir='rtl']) [part='toggle-button']::before {
    scale: -1;
  }

  :host(:is(vaadin-side-nav-item[expanded], vaadin-side-nav:not([collapsed]))) [part='toggle-button'] {
    rotate: 90deg;
  }

  :host([dir='rtl']:is(vaadin-side-nav-item[expanded], vaadin-side-nav:not([collapsed]))) [part='toggle-button'] {
    rotate: -90deg;
  }

  @media (prefers-reduced-motion: no-preference) {
    [part='toggle-button'] {
      transition: rotate 150ms;
    }
  }

  :host([disabled]) [part='toggle-button'] {
    opacity: 0.5;
  }

  [part='children'] {
    padding: 0;
    margin: 0;
    list-style-type: none;
    display: flex;
    flex-direction: column;
    gap: var(--vaadin-side-nav-items-gap, var(--vaadin-gap-s));
  }

  [part='children'] slot {
    --_icon-indent-2: var(--_icon-indent);
  }

  :focus-visible {
    outline: var(--vaadin-focus-ring-width) solid var(--vaadin-focus-ring-color);
  }

  @media (forced-colors: active) {
    [part='toggle-button']::before {
      background: CanvasText;
    }
  }
`;
/**
 * @license
 * Copyright (c) 2023 - 2026 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const sideNavItem = css`
  [part='content'] {
    display: flex;
    align-items: center;
    min-width: 0;
    max-width: 100%;
    padding: var(
      --vaadin-side-nav-item-padding,
      var(--vaadin-padding-block-container) var(--vaadin-padding-inline-container)
    );
    --_gap: var(--vaadin-side-nav-item-gap, var(--vaadin-gap-s));
    gap: var(--_gap);
    font-size: var(--vaadin-side-nav-item-font-size, 1em);
    font-weight: var(--vaadin-side-nav-item-font-weight, 500);
    line-height: var(--vaadin-side-nav-item-line-height, inherit);
    color: var(--vaadin-side-nav-item-text-color, var(--vaadin-text-color-secondary));
    background: var(--vaadin-side-nav-item-background, transparent);
    background-origin: border-box;
    border: var(--vaadin-side-nav-item-border-width, 0) solid var(--vaadin-side-nav-item-border-color, transparent);
    border-radius: var(--vaadin-side-nav-item-border-radius, var(--vaadin-radius-m));
    cursor: var(--vaadin-clickable-cursor);
    touch-action: manipulation;
    contain: layout;
  }

  :host([current]) [part='content'] {
    --vaadin-side-nav-item-background: var(--vaadin-background-container);
    --vaadin-side-nav-item-text-color: var(--vaadin-text-color);
  }

  :host([disabled]) {
    --vaadin-clickable-cursor: var(--vaadin-disabled-cursor);
  }

  :host([disabled]) [part='content'] {
    --vaadin-side-nav-item-text-color: var(--vaadin-text-color-disabled);
  }

  :host(:not([has-children])) {
    gap: 0;
  }

  [part='link'] {
    flex: auto;
    min-width: 0;
    display: flex;
    align-items: center;
    gap: inherit;
    text-decoration: none;
    color: inherit;
    outline: 0;
  }

  :host(:not([has-children])) [part='toggle-button'] {
    display: none !important;
  }

  slot:not([name]) {
    display: block;
    flex: auto;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    /* Don't clip ascenders or descenders */
    padding-block: 0.25em;
    margin-block: -0.25em;
  }

  slot:is([name='prefix'], [name='suffix'])::slotted(*) {
    flex: none;
  }

  [part='content']:not(:has([href])):has([part='toggle-button']:focus-visible),
  [part='content']:has(:not([part='toggle-button']):focus-visible),
  [part='content']:has([href]) [part='toggle-button']:focus-visible {
    outline: var(--vaadin-focus-ring-width) solid var(--vaadin-focus-ring-color);
  }

  [part='content']:not(:has([href])) [part='toggle-button']:focus-visible {
    outline: 0;
  }

  /* Hierarchy indentation */
  [part='content']::before {
    content: '';
    width: calc(
      var(--vaadin-side-nav-child-indent, 1em) * var(--_level, 0) + var(--_icon-indent, 0) *
        (var(--vaadin-icon-size, 1lh) + var(--_gap))
    );
    flex: none;
    margin-inline-start: calc(var(--_gap) * -1);
  }

  [part='children'] {
    --_level: calc(var(--_level-2, 0) + 1);
  }

  [part='children'] ::slotted(*) {
    --_level-2: var(--_level);
  }

  @media (forced-colors: active) {
    [part='content'] {
      border: 1px solid Canvas !important;
    }

    :host([current]) [part='content'] {
      color: Highlight !important;
      border-color: Highlight !important;
    }

    :host([disabled]) [part='content'] {
      --vaadin-side-nav-item-text-color: GrayText !important;
    }

    :host([disabled]) [part='toggle-button']::before {
      background: GrayText !important;
    }
  }
`;
const sideNavItemStyles = [sharedStyles, screenReaderOnly, sideNavItem];
/**
 * @license
 * Copyright (c) 2023 - 2026 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const DEFAULT_I18N$2 = {
  toggle: "Toggle child items"
};
class ChildrenController extends SlotController {
  constructor(host, slotName) {
    super(host, slotName, null, { observe: true, multiple: true });
  }
  /**
   * @protected
   * @override
   */
  initAddedNode() {
    this.host.requestUpdate();
  }
  /**
   * @protected
   * @override
   */
  teardownNode() {
    this.host.requestUpdate();
  }
}
const SideNavChildrenMixin = (superClass) => class SideNavChildrenMixin extends I18nMixin(DEFAULT_I18N$2, superClass) {
  static get properties() {
    return {
      /**
       * Count of child items.
       * @protected
       */
      _itemsCount: {
        type: Number,
        value: 0
      }
    };
  }
  constructor() {
    super();
    this._childrenController = new ChildrenController(this, this._itemsSlotName);
  }
  /**
   * The object used to localize this component. To change the default
   * localization, replace this with an object that provides all properties, or
   * just the individual properties you want to change.
   *
   * The object has the following structure and default values:
   * ```js
   * {
   *   toggle: 'Toggle child items'
   * }
   * ```
   * @type {!SideNavI18n}
   */
  get i18n() {
    return super.i18n;
  }
  set i18n(value) {
    super.i18n = value;
  }
  /**
   * List of child items of this component.
   * @protected
   */
  get _items() {
    return this._childrenController.nodes;
  }
  /**
   * Name of the slot to be used for children.
   * @protected
   */
  get _itemsSlotName() {
    return "children";
  }
  /** @protected */
  firstUpdated() {
    super.firstUpdated();
    this.addController(this._childrenController);
  }
  /**
   * @protected
   * @override
   */
  willUpdate(props) {
    super.willUpdate(props);
    this._itemsCount = this._items.length;
  }
  /**
   * @protected
   * @override
   */
  updated(props) {
    super.updated(props);
    if (props.has("_itemsCount")) {
      this.toggleAttribute("has-children", this._itemsCount > 0);
    }
    if (props.has("_itemsCount") || props.has("__effectiveI18n")) {
      this._items.forEach((item) => {
        item.i18n = this.__effectiveI18n;
      });
    }
  }
};
/**
 * @license
 * Copyright (c) 2023 - 2026 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
class SideNavItem extends SideNavChildrenMixin(
  DisabledMixin(ElementMixin(ThemableMixin(PolylitMixin(LumoInjectionMixin(LitElement)))))
) {
  static get is() {
    return "vaadin-side-nav-item";
  }
  static get properties() {
    return {
      /**
       * The path to navigate to
       */
      path: {
        type: String
      },
      /**
       * The list of alternative paths matching this item
       *
       * @type {!Array<string>}
       */
      pathAliases: {
        type: Array,
        value: () => []
      },
      /**
       * Whether to show the child items or not
       *
       */
      expanded: {
        type: Boolean,
        value: false,
        notify: true,
        reflectToAttribute: true
      },
      /**
       * Whether to also match nested paths / routes. `false` by default.
       *
       * When enabled, an item with the path `/path` is considered current when
       * the browser URL is `/path`, `/path/child`, `/path/child/grandchild`,
       * etc.
       *
       * Note that this only affects matching of the URLs path, not the base
       * origin or query parameters.
       *
       * @attr {boolean} match-nested
       */
      matchNested: {
        type: Boolean,
        value: false
      },
      /**
       * Whether the item's path matches the current browser URL.
       *
       * A match occurs when both share the same base origin (like https://example.com),
       * the same path (like /path/to/page), and the browser URL contains at least
       * all the query parameters with the same values from the item's path.
       *
       * See [`matchNested`](#/elements/vaadin-side-nav-item#property-matchNested) for how to change the path matching behavior.
       *
       * The state is updated when the item is added to the DOM or when the browser
       * navigates to a new page.
       *
       */
      current: {
        type: Boolean,
        value: false,
        readOnly: true,
        reflectToAttribute: true
      },
      /**
       * The target of the link. Works only when `path` is set.
       */
      target: {
        type: String
      },
      /**
       * Whether to exclude the item from client-side routing. When enabled,
       * this causes the item to behave like a regular anchor, causing a full
       * page reload. This only works with supported routers, such as the one
       * provided in Vaadin apps, or when using the side nav `onNavigate` hook.
       *
       * @attr {boolean} router-ignore
       */
      routerIgnore: {
        type: Boolean,
        value: false
      },
      /** @private */
      __tooltipText: {
        type: String
      }
    };
  }
  static get styles() {
    return sideNavItemStyles;
  }
  constructor() {
    super();
    this.__boundUpdateCurrent = this.__updateCurrent.bind(this);
  }
  /** @protected */
  get _button() {
    return this.shadowRoot.querySelector("button");
  }
  /**
   * @protected
   * @override
   */
  firstUpdated() {
    super.firstUpdated();
    if (!this.hasAttribute("role")) {
      this.setAttribute("role", "listitem");
    }
  }
  /**
   * @protected
   * @override
   */
  updated(props) {
    super.updated(props);
    if (props.has("path") || props.has("pathAliases") || props.has("matchNested")) {
      this.__updateCurrent();
    }
    if (props.has("disabled") || props.has("_itemsCount")) {
      this._items.forEach((item) => {
        item.disabled = this.disabled;
      });
    }
  }
  /** @protected */
  connectedCallback() {
    super.connectedCallback();
    this.__updateCurrent();
    window.addEventListener("popstate", this.__boundUpdateCurrent);
    window.addEventListener("vaadin-navigated", this.__boundUpdateCurrent);
    window.addEventListener("side-nav-location-changed", this.__boundUpdateCurrent);
  }
  /** @protected */
  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener("popstate", this.__boundUpdateCurrent);
    window.removeEventListener("vaadin-navigated", this.__boundUpdateCurrent);
    window.removeEventListener("side-nav-location-changed", this.__boundUpdateCurrent);
  }
  /** @protected */
  render() {
    return html`
      <div id="content" part="content" @click="${this._onContentClick}">
        <a
          id="link"
          ?disabled="${this.disabled}"
          tabindex="${this.disabled || this.path == null ? "-1" : "0"}"
          href="${ifDefined(this.disabled ? null : this.path)}"
          target="${ifDefined(this.target)}"
          ?router-ignore="${this.routerIgnore}"
          part="link"
          aria-current="${this.current ? "page" : "false"}"
        >
          <slot name="prefix"></slot>
          <slot></slot>
          <div class="sr-only">${this.__tooltipText}</div>
          <slot name="suffix"></slot>
        </a>
        <button
          part="toggle-button"
          ?disabled="${this.disabled}"
          @click="${this._onButtonClick}"
          aria-controls="children"
          aria-expanded="${this.expanded}"
          aria-labelledby="link i18n"
        ></button>
      </div>
      <ul part="children" role="list" ?hidden="${!this.expanded}" aria-hidden="${this.expanded ? "false" : "true"}">
        <slot name="children"></slot>
      </ul>
      <div hidden id="i18n">${this.__effectiveI18n.toggle}</div>
      <slot name="tooltip"></slot>
    `;
  }
  /** @protected */
  ready() {
    super.ready();
    this._tooltipController = new TooltipController(this);
    this._tooltipController.setTarget(this.$.content);
    this._tooltipController.setAriaTarget(null);
    this._tooltipController.addEventListener("tooltip-changed", (event) => {
      const { node } = event.detail;
      if (node) {
        this.__tooltipText = node.textContent.trim();
        node.setAttribute("aria-hidden", "true");
      } else {
        this.__tooltipText = "";
      }
    });
    this.addController(this._tooltipController);
  }
  /** @private */
  _onButtonClick(event) {
    event.stopPropagation();
    this.__toggleExpanded();
  }
  /** @private */
  _onContentClick(e) {
    if (this.path && !e.composedPath().find((el) => el === this.$.link)) {
      this.$.link.click();
    } else if (this.path == null && this.hasAttribute("has-children") && !this.disabled) {
      this.__toggleExpanded();
    }
  }
  /** @private */
  __toggleExpanded() {
    this.expanded = !this.expanded;
  }
  /** @private */
  __updateCurrent() {
    this._setCurrent(this.__isCurrent());
    if (this.current) {
      this.__expandParentItems();
      this.expanded = this._items.length > 0;
    }
  }
  /** @private */
  __expandParentItems() {
    const sideNav2 = this.closest("vaadin-side-nav");
    if (sideNav2 && sideNav2.noAutoExpand) {
      return;
    }
    const parentItem = this.__getParentItem();
    if (parentItem) {
      parentItem.__expandParentItems();
    }
    this.expanded = true;
  }
  /** @private */
  __getParentItem() {
    return this.parentElement instanceof SideNavItem ? this.parentElement : null;
  }
  /** @private */
  __isCurrent() {
    if (this.path == null) {
      return false;
    }
    const browserPath = `${location$1.pathname}${location$1.search}`;
    const matchOptions = { matchNested: this.matchNested };
    return matchPaths(browserPath, this.path, matchOptions) || this.pathAliases.some((alias) => matchPaths(browserPath, alias, matchOptions));
  }
}
defineCustomElement(SideNavItem);
/**
 * @license
 * Copyright (c) 2023 - 2026 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const sideNav = css`
  :host {
    white-space: nowrap;
    touch-action: manipulation;
  }

  [part='label'] {
    align-self: start;
    display: flex;
    align-items: center;
    justify-content: start;
    gap: var(--vaadin-side-nav-item-gap, var(--vaadin-gap-s));
    padding: var(
      --vaadin-side-nav-item-padding,
      var(--vaadin-padding-block-container) var(--vaadin-padding-inline-container)
    );
    font-size: var(--vaadin-side-nav-label-font-size, max(11px, 0.875em));
    font-weight: var(--vaadin-side-nav-label-font-weight, 500);
    color: var(--vaadin-side-nav-label-color, var(--vaadin-text-color-secondary));
    line-height: var(--vaadin-side-nav-label-line-height, inherit);
    border-radius: var(--vaadin-side-nav-item-border-radius, var(--vaadin-radius-m));
    touch-action: manipulation;
    min-width: 0;
    max-width: 100%;
  }

  ::slotted([slot='label']) {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    margin: 0;
  }
`;
const sideNavStyles = [sharedStyles, sideNav];
const sideNavSlotStyles = css`
  :where(vaadin-side-nav:has(> vaadin-side-nav-item > vaadin-icon[slot='prefix']))::part(children),
  :where(vaadin-side-nav-item:has(> vaadin-side-nav-item[slot='children'] > vaadin-icon[slot='prefix']))::part(
    children
  ) {
    --_icon-indent: calc(var(--_icon-indent-2, 0) + 1);
  }

  :where(vaadin-side-nav-item:has(> vaadin-icon[slot='prefix']))::part(content) {
    --_icon-indent: calc(var(--_icon-indent-2) - 1);
  }

  :where(
    vaadin-side-nav-item:has(> vaadin-icon[slot='prefix']):has(> vaadin-side-nav-item > vaadin-icon[slot='prefix'])
  )::part(children) {
    --_level: var(--_level-2, 0);
  }

  vaadin-side-nav:not(:has([slot='label']))::part(label) {
    display: none;
  }
`;
/**
 * @license
 * Copyright (c) 2023 - 2026 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
class SideNav extends SideNavChildrenMixin(
  SlotStylesMixin(FocusMixin(ElementMixin(ThemableMixin(PolylitMixin(LumoInjectionMixin(LitElement))))))
) {
  static get is() {
    return "vaadin-side-nav";
  }
  static get shadowRootOptions() {
    return { ...LitElement.shadowRootOptions, delegatesFocus: true };
  }
  static get properties() {
    return {
      /**
       * Whether the side nav is collapsible. When enabled, the toggle icon is shown.
       *
       */
      collapsible: {
        type: Boolean,
        value: false,
        reflectToAttribute: true
      },
      /**
       * Whether the side nav is collapsed. When collapsed, the items are hidden.
       *
       */
      collapsed: {
        type: Boolean,
        value: false,
        notify: true,
        reflectToAttribute: true
      },
      /**
       * Callback function for router integration.
       *
       * When a side nav item link is clicked, this function is called and the default click action is cancelled.
       * This delegates the responsibility of navigation to the function's logic.
       *
       * The click event action is not cancelled in the following cases:
       * - The click event has a modifier (e.g. `metaKey`, `shiftKey`)
       * - The click event is on an external link
       * - The click event is on a link with `target="_blank"`
       * - The function explicitly returns `false`
       *
       * The function receives an object with the properties of the clicked side-nav item:
       * - `path`: The path of the navigation item.
       * - `target`: The target of the navigation item.
       * - `current`: A boolean indicating whether the navigation item is currently selected.
       * - `expanded`: A boolean indicating whether the navigation item is expanded.
       * - `pathAliases`: An array of path aliases for the navigation item.
       * - `originalEvent`: The original DOM event that triggered the navigation.
       *
       * Also see the `location` property for updating the highlighted navigation item on route change.
       *
       * @type {function(Object): boolean | undefined}
       */
      onNavigate: {
        attribute: false
      },
      /**
       * A change to this property triggers an update of the highlighted item in the side navigation. While it typically
       * corresponds to the browser's URL, the specific value assigned to the property is irrelevant. The component has
       * its own internal logic for determining which item is highlighted.
       *
       * The main use case for this property is when the side navigation is used with a client-side router. In this case,
       * the component needs to be informed about route changes so it can update the highlighted item.
       *
       * @type {any}
       */
      location: {
        observer: "__locationChanged"
      },
      /**
       * Whether to expand parent items of the nested matching item after initial
       * rendering or navigation. By default, all the parent items are expanded.
       * Set to true to disable this behavior.
       *
       * @attr {boolean} no-auto-expand
       */
      noAutoExpand: {
        type: Boolean,
        reflectToAttribute: true,
        value: false
      }
    };
  }
  static get styles() {
    return sideNavStyles;
  }
  /** @protected */
  get slotStyles() {
    return [sideNavSlotStyles];
  }
  constructor() {
    super();
    this._labelId = `side-nav-label-${generateUniqueId()}`;
    this.addEventListener("click", this.__onClick);
  }
  /**
   * Name of the slot to be used for children.
   * @protected
   * @override
   */
  get _itemsSlotName() {
    return "";
  }
  /** @protected */
  get focusElement() {
    return this.shadowRoot.querySelector("button");
  }
  /** @protected */
  firstUpdated() {
    super.firstUpdated();
    if (!this.hasAttribute("role")) {
      this.setAttribute("role", "navigation");
    }
  }
  /** @protected */
  render() {
    return html`
      ${this.collapsible ? html`
            <button
              part="label"
              @click="${this._onLabelClick}"
              aria-expanded="${!this.collapsed}"
              aria-controls="children"
            >
              <slot name="label" @slotchange="${this._onLabelSlotChange}"></slot>
              <span part="toggle-button" aria-hidden="true"></span>
            </button>
          ` : html`
            <div part="label">
              <slot name="label" @slotchange="${this._onLabelSlotChange}"></slot>
            </div>
          `}
      <ul
        id="children"
        role="list"
        part="children"
        ?hidden="${this.collapsed}"
        aria-hidden="${this.collapsed ? "true" : "false"}"
      >
        <slot></slot>
      </ul>
    `;
  }
  /**
   * @param {Event} event
   * @return {boolean}
   * @protected
   * @override
   */
  _shouldSetFocus(event) {
    return event.composedPath()[0] === this.focusElement;
  }
  /** @private */
  _onLabelClick() {
    if (this.collapsible) {
      this.__toggleCollapsed();
    }
  }
  /** @private */
  _onLabelSlotChange() {
    const label = this.querySelector('[slot="label"]');
    if (label) {
      if (!label.id) {
        label.id = this._labelId;
      }
      this.setAttribute("aria-labelledby", label.id);
    } else {
      this.removeAttribute("aria-labelledby");
    }
  }
  /** @private */
  __locationChanged() {
    window.dispatchEvent(new CustomEvent("side-nav-location-changed"));
  }
  /** @private */
  __toggleCollapsed() {
    this.collapsed = !this.collapsed;
  }
  /** @private */
  __onClick(e) {
    if (!this.onNavigate) {
      return;
    }
    const hasModifier = e.metaKey || e.shiftKey;
    if (hasModifier) {
      return;
    }
    const composedPath = e.composedPath();
    const item = composedPath.find((el) => el.localName && el.localName.includes("side-nav-item"));
    const anchor = composedPath.find((el) => el instanceof HTMLAnchorElement);
    if (!item || !item.shadowRoot.contains(anchor)) {
      return;
    }
    const isRelative = anchor.href && anchor.href.startsWith(location.origin);
    if (!isRelative) {
      return;
    }
    if (item.target === "_blank") {
      return;
    }
    if (item.routerIgnore) {
      return;
    }
    const result = this.onNavigate({
      path: item.path,
      target: item.target,
      current: item.current,
      expanded: item.expanded,
      pathAliases: item.pathAliases,
      originalEvent: e
    });
    if (result !== false) {
      e.preventDefault();
    }
  }
}
defineCustomElement(SideNav);
/**
 * @license
 * Copyright (c) 2026 - 2026 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const sliderBubbleOverlay = css`
  :host {
    --_arrow-size: var(--vaadin-slider-bubble-arrow-size, 8px);
    --_border-width: var(
      --vaadin-slider-bubble-border-width,
      var(--vaadin-tooltip-border-width, var(--vaadin-overlay-border-width, 1px))
    );
    --_default-offset: var(--vaadin-slider-bubble-offset, 2px);
    --_rtl-multiplier: 1;
  }

  :host([dir='rtl']) {
    --_rtl-multiplier: -1;
  }

  [part='overlay'] {
    position: relative;
    overflow: visible;
    max-width: var(--vaadin-tooltip-max-width, 40ch);
    padding: var(
      --vaadin-slider-bubble-padding,
      var(--vaadin-tooltip-padding, var(--vaadin-padding-block-container) var(--vaadin-padding-inline-container))
    );
    border: var(
        --vaadin-slider-bubble-border-width,
        var(--vaadin-tooltip-border-width, var(--vaadin-overlay-border-width, 1px))
      )
      solid
      var(
        --vaadin-slider-bubble-border-color,
        var(--vaadin-tooltip-border-color, var(--vaadin-overlay-border-color, var(--vaadin-border-color-secondary)))
      );
    border-radius: var(
      --vaadin-slider-bubble-border-radius,
      var(--vaadin-tooltip-border-radius, var(--vaadin-radius-m))
    );
    background: var(
      --vaadin-slider-bubble-background,
      var(--vaadin-tooltip-background, var(--vaadin-background-color))
    );
    color: var(--vaadin-slider-bubble-text-color, var(--vaadin-tooltip-text-color, inherit));
    font-size: var(--vaadin-slider-bubble-font-size, var(--vaadin-tooltip-font-size, 0.9em));
    font-weight: var(--vaadin-slider-bubble-font-weight, var(--vaadin-tooltip-font-weight, inherit));
    line-height: var(--vaadin-slider-bubble-line-height, var(--vaadin-tooltip-line-height, inherit));
    box-shadow: var(--vaadin-slider-bubble-shadow, var(--vaadin-tooltip-shadow, 0 3px 8px -1px rgba(0, 0, 0, 0.2)));
  }

  :host([top-aligned]) [part='overlay'] {
    margin-top: var(--vaadin-slider-bubble-offset, calc(var(--_arrow-size) + var(--_default-offset)));
  }

  :host([bottom-aligned]) [part='overlay'] {
    margin-bottom: var(--vaadin-slider-bubble-offset, calc(var(--_arrow-size) + var(--_default-offset)));
  }

  [part='arrow'] {
    display: block;
    position: absolute;
    background: inherit;
    border: inherit;
    border-start-start-radius: var(--vaadin-slider-bubble-arrow-border-radius, 0);
    inset-inline-start: 50%;
    outline: inherit;
    box-shadow: inherit;
    width: var(--_arrow-size);
    height: var(--_arrow-size);
    rotate: 45deg;
    --o: 20px; /* clip-path outset, how far outward it extends to reveal the outline and box shadow */
    --b: var(--_border-width);
    /* We need this elaborate clip-path to allow the arrow bg and border to cover
      the overlay border but prevent the outline and box-shadow from covering it */
    clip-path: polygon(
      calc(var(--o) * -1) calc(var(--o) * -1),
      calc(100% + var(--o) - var(--b)) calc(var(--o) * -1),
      calc(100% - var(--b) * 1.4) 0,
      100% 0,
      calc(100% - var(--b)) var(--b),
      calc(100% - var(--b)) calc(var(--b) + var(--ff, 0px)),
      calc(var(--b) + var(--ff, 0px)) calc(100% - var(--b)),
      calc(var(--b)) calc(100% - var(--b)),
      0 100%,
      0 calc(100% - var(--b) * 1.4),
      calc(var(--o) * -1) calc(100% + var(--o) - var(--b))
    );
  }

  /* Firefox renders a blurry edge for a diagonal clip-path + rotation,
    so we need to extend the clip-path slightly further on the diagonal */
  @supports (-moz-appearance: none) {
    [part='arrow'] {
      --ff: 1px;
    }
  }

  :host([top-aligned]) [part='arrow'] {
    top: 0;
    translate: calc(-50% * var(--_rtl-multiplier)) -50%;
  }

  :host([end-aligned][top-aligned]) [part='arrow'] {
    translate: calc(50% * var(--_rtl-multiplier)) -50%;
  }

  :host([bottom-aligned]) [part='arrow'] {
    bottom: 0;
    rotate: 225deg;
    translate: calc(-50% * var(--_rtl-multiplier)) 50%;
  }

  :host([end-aligned][bottom-aligned]) [part='arrow'] {
    translate: calc(50% * var(--_rtl-multiplier)) 50%;
  }
`;
const sliderBubbleOverlayStyles = [overlayStyles, sliderBubbleOverlay];
/**
 * @license
 * Copyright (c) 2026 - 2026 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
class SliderBubbleOverlay extends PositionMixin(
  OverlayMixin(DirMixin(ThemableMixin(PolylitMixin(LumoInjectionMixin(LitElement)))))
) {
  static get is() {
    return "vaadin-slider-bubble-overlay";
  }
  static get styles() {
    return sliderBubbleOverlayStyles;
  }
  static get lumoInjector() {
    return { ...super.lumoInjector, includeBaseStyles: true };
  }
  /** @protected */
  render() {
    return html`
      <div part="overlay" id="overlay">
        <div part="arrow"></div>
        <div part="content" id="content"><slot></slot></div>
      </div>
    `;
  }
  /**
   * Override method from `OverlayMixin` to not close on outside click.
   * The bubble overlay `opened` is fully controlled by the slider.
   * @return {boolean}
   * @protected
   * @override
   */
  _shouldCloseOnOutsideClick() {
    return false;
  }
  /**
   * @protected
   * @override
   */
  _updatePosition() {
    super._updatePosition();
    if (!this.positionTarget || !this.opened) {
      return;
    }
    const targetRect = this.positionTarget.getBoundingClientRect();
    const overlayRect = this.$.overlay.getBoundingClientRect();
    const offset = targetRect.width / 2 - overlayRect.width / 2;
    if (this.style.left) {
      const left = overlayRect.left + offset;
      if (left > 0) {
        this.style.left = `${left}px`;
      }
    }
    if (this.style.right) {
      const right = parseFloat(this.style.right) + offset;
      if (right > 0) {
        this.style.right = `${right}px`;
      }
    }
  }
}
defineCustomElement(SliderBubbleOverlay);
/**
 * @license
 * Copyright (c) 2026 - 2026 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
class SliderBubble extends ThemePropertyMixin(PolylitMixin(LitElement)) {
  static get is() {
    return "vaadin-slider-bubble";
  }
  static get styles() {
    return css`
      :host {
        display: contents;
      }
    `;
  }
  static get properties() {
    return {
      /**
       * The thumb element next to which the overlay should be aligned.
       */
      positionTarget: {
        type: Object
      },
      /**
       * Whether the overlay is opened.
       */
      opened: {
        type: Boolean,
        value: false,
        reflectToAttribute: true
      }
    };
  }
  /** @protected */
  render() {
    return html`
      <vaadin-slider-bubble-overlay
        id="overlay"
        .owner="${this}"
        .opened="${this.opened}"
        .positionTarget="${this.positionTarget}"
        theme="${ifDefined(this._theme)}"
        vertical-align="bottom"
        no-vertical-overlap
        modeless
        exportparts="overlay, content, arrow"
      >
        <slot></slot>
      </vaadin-slider-bubble-overlay>
    `;
  }
}
defineCustomElement(SliderBubble);
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const important = "important";
const importantFlag = " !" + important;
const flagTrim = 0 - importantFlag.length;
class StyleMapDirective extends Directive {
  constructor(partInfo) {
    super(partInfo);
    if (partInfo.type !== PartType.ATTRIBUTE || partInfo.name !== "style" || partInfo.strings?.length > 2) {
      throw new Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.");
    }
  }
  render(styleInfo) {
    return Object.keys(styleInfo).reduce((style, prop) => {
      const value = styleInfo[prop];
      if (value == null) {
        return style;
      }
      prop = prop.includes("-") ? prop : prop.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g, "-$&").toLowerCase();
      return style + `${prop}:${value};`;
    }, "");
  }
  update(part, [styleInfo]) {
    const { style } = part.element;
    if (this._previousStyleProperties === void 0) {
      this._previousStyleProperties = new Set(Object.keys(styleInfo));
      return this.render(styleInfo);
    }
    for (const name of this._previousStyleProperties) {
      if (styleInfo[name] == null) {
        this._previousStyleProperties.delete(name);
        if (name.includes("-")) {
          style.removeProperty(name);
        } else {
          style[name] = null;
        }
      }
    }
    for (const name in styleInfo) {
      const value = styleInfo[name];
      if (value != null) {
        this._previousStyleProperties.add(name);
        const isImportant = typeof value === "string" && value.endsWith(importantFlag);
        if (name.includes("-") || isImportant) {
          style.setProperty(name, isImportant ? value.slice(0, flagTrim) : value, isImportant ? important : "");
        } else {
          style[name] = value;
        }
      }
    }
    return noChange;
  }
}
const styleMap = directive(StyleMapDirective);
/**
 * @license
 * Copyright (c) 2026 - 2026 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const sliderStyles = css`
  :host {
    box-sizing: border-box;
    user-select: none;
    -webkit-user-select: none;
    --_thumb-width: var(--vaadin-slider-thumb-width, 1lh);
    --_thumb-height: var(--vaadin-slider-thumb-height, 1lh);
  }

  :host([hidden]) {
    display: none !important;
  }

  :host([disabled]) {
    cursor: var(--vaadin-disabled-cursor);
    --vaadin-slider-fill-background: linear-gradient(
        var(--vaadin-border-color-secondary),
        var(--vaadin-border-color-secondary)
      )
      var(--vaadin-background-color);
    --vaadin-slider-thumb-background: var(--vaadin-slider-fill-background);
    --vaadin-slider-thumb-border-color: transparent;
  }

  :host([readonly]) {
    --vaadin-slider-fill-background: var(--vaadin-border-color);
    --vaadin-slider-thumb-background: var(--vaadin-background-color);
    --vaadin-slider-thumb-border-color: var(--vaadin-border-color);
    --_outline-style: dashed;
  }

  :host([min-max-visible]) {
    grid-template:
      'label' auto var(--_helper-above-field, 'helper' auto) 'baseline' 0 'input' 1fr 'marks' auto var(
        --_helper-below-field,
        'helper' auto
      )
      'error' auto / 100%;
  }

  #controls {
    grid-area: input;
    display: inline-grid;
    align-items: center;
    width: var(--vaadin-field-default-width, 12em);
    max-width: 100%;
    min-width: 100%;
    --_track-width: calc(100% - var(--_thumb-width));
  }

  :host([has-label]) #controls {
    border-block: var(--vaadin-input-field-border-width, 1px) solid transparent;
    padding-block: var(--vaadin-padding-block-container);
  }

  [part='track'] {
    box-sizing: border-box;
    grid-row: 1;
    grid-column: track-start / track-end;
    display: grid;
    grid-template-columns: subgrid;
    align-items: center;
    width: 100%;
    height: var(--vaadin-slider-track-height, 0.25lh);
    background: var(--vaadin-slider-track-background, var(--vaadin-background-container));
    border-radius: var(--vaadin-slider-track-border-radius, var(--vaadin-radius-m));
    border: var(--vaadin-slider-track-border-width, 0) solid
      var(--vaadin-slider-track-border-color, var(--vaadin-border-color-secondary));
  }

  [part='track-fill'] {
    box-sizing: border-box;
    grid-column: fill-start / fill-end;
    height: 100%;
    background: var(--vaadin-slider-fill-background, var(--vaadin-text-color));
    box-shadow: inset 0 0 0 var(--vaadin-slider-fill-border-width, 1px)
      var(--vaadin-slider-fill-border-color, transparent);
  }

  [part~='thumb'] {
    box-sizing: border-box;
    grid-row: 1;
    grid-column: thumb1;
    width: var(--_thumb-width);
    height: var(--_thumb-height);
    background: var(--vaadin-slider-thumb-background, var(--vaadin-background-color));
    border: var(--vaadin-slider-thumb-border-width, 1px) solid
      var(--vaadin-slider-thumb-border-color, var(--vaadin-text-color));
    border-radius: var(--vaadin-slider-thumb-border-radius, var(--vaadin-radius-l));
  }

  :host([readonly]) [part='track-fill'] {
    border-inline-end: none;
  }

  ::slotted(input) {
    grid-row: 1;
    grid-column: track-start / track-end;
    appearance: none;
    width: 100%;
    height: 100%;
    font: inherit;
    margin: 0;
    background: transparent;
    outline: 0;
    -webkit-tap-highlight-color: transparent;
    cursor: inherit;
    touch-action: none;
    z-index: 999;
  }

  [part='marks'] {
    display: none;
    font-size: var(--vaadin-slider-marks-font-size, 0.75em);
    font-weight: var(--vaadin-slider-marks-font-weight, inherit);
    color: var(--vaadin-slider-marks-color, var(--vaadin-text-color-secondary));
  }

  :host([min-max-visible]) [part='marks'] {
    grid-area: marks;
    display: flex;
    justify-content: space-between;
  }
`;
/**
 * @license
 * Copyright (c) 2026 - 2026 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const SliderMixin = (superClass) => class SliderMixinClass extends SlotStylesMixin(DisabledMixin(superClass)) {
  static get properties() {
    return {
      /**
       * The minimum allowed value.
       */
      min: {
        type: Number,
        sync: true
      },
      /**
       * The maximum allowed value.
       */
      max: {
        type: Number,
        sync: true
      },
      /**
       * The stepping interval of the slider.
       */
      step: {
        type: Number,
        sync: true
      },
      /**
       * When true, the user cannot modify the value of the slider.
       * The difference between `disabled` and `readonly` is that the
       * read-only slider remains focusable and is announced by screen
       * readers.
       */
      readonly: {
        type: Boolean,
        reflectToAttribute: true
      },
      /**
       * When true, the value bubble is always visible,
       * regardless of focus or hover state.
       * @attr {boolean} value-always-visible
       */
      valueAlwaysVisible: {
        type: Boolean,
        value: false,
        sync: true
      },
      /**
       * When true, displays the min and max values below the slider track.
       * @attr {boolean} min-max-visible
       */
      minMaxVisible: {
        type: Boolean,
        reflectToAttribute: true
      },
      /** @private */
      __value: {
        type: Array,
        sync: true
      }
    };
  }
  /** @protected */
  get slotStyles() {
    const tag = this.localName;
    return [
      `
          ${tag} > input::-webkit-slider-runnable-track {
            height: 100%;
          }

          ${tag} > input::-webkit-slider-thumb {
            appearance: none;
            width: var(--_thumb-width);
            height: 100%;
            /* iOS needs these */
            background: transparent;
            box-shadow: none;
          }

          ${tag} > input::-moz-range-thumb {
            border: 0;
            background: transparent;
            width: var(--_thumb-width);
            height: 100%;
          }

          ${tag}:not([readonly]) > input::-webkit-slider-thumb {
            cursor: var(--vaadin-slider-thumb-cursor, grab);
          }

          ${tag}:not([readonly]) > input::-moz-range-thumb {
            cursor: var(--vaadin-slider-thumb-cursor, grab);
          }

          ${tag}:is([active], [start-active], [end-active]) > input::-webkit-slider-thumb {
            cursor: var(--vaadin-slider-thumb-cursor-active, grabbing);
          }

          ${tag}:is([active], [start-active], [end-active]) > input::-moz-range-thumb {
            cursor: var(--vaadin-slider-thumb-cursor-active, grabbing);
          }

          ${tag}[disabled] > input::-webkit-slider-thumb {
            cursor: var(--vaadin-disabled-cursor, not-allowed);
          }

          ${tag}[disabled] > input::-moz-range-thumb {
            cursor: var(--vaadin-disabled-cursor, not-allowed);
          }
        `
    ];
  }
  constructor() {
    super();
    this.addEventListener("pointerdown", (e) => this.__onPointerDown(e));
  }
  /** @protected */
  firstUpdated() {
    super.firstUpdated();
    this.__lastCommittedValue = this.value;
  }
  /**
   * @param {number} value
   * @param {number} index
   * @param {number[]} fullValue
   * @private
   */
  __updateValue(value, index, fullValue = this.__value) {
    const { min, max, step } = this.__getConstraints();
    const minValue = fullValue[index - 1] !== void 0 ? fullValue[index - 1] : min;
    const maxValue = fullValue[index + 1] !== void 0 ? fullValue[index + 1] : max;
    const safeValue = Math.min(Math.max(value, minValue), maxValue);
    const precision = this.__getStepPrecision(step);
    const offset = safeValue - minValue;
    const nearestOffset = Math.round(offset / step) * step;
    const nearestValue = parseFloat((minValue + nearestOffset).toFixed(precision));
    const newValue = nearestValue <= maxValue ? nearestValue : parseFloat((nearestValue - step).toFixed(precision));
    this.__value = fullValue.with(index, newValue);
  }
  /** @private */
  __getStepPrecision(step) {
    const afterDecimal = String(step).split(".")[1];
    return afterDecimal ? afterDecimal.length : 0;
  }
  /**
   * @return {{ min: number, max: number, step: number}}
   * @private
   */
  __getConstraints() {
    return {
      min: this.min !== void 0 ? this.min : 0,
      max: this.max !== void 0 ? this.max : 100,
      step: this.step !== void 0 ? this.step : 1
    };
  }
  /**
   * @param {number} value
   * @return {number}
   * @private
   */
  __getPercentFromValue(value) {
    const { min, max } = this.__getConstraints();
    if (max <= min) {
      return 0;
    }
    const safeValue = Math.min(Math.max(value, min), max);
    return (safeValue - min) / (max - min);
  }
  /**
   * Updates bubble visibility for a thumb based on trigger state changes.
   * @param {Map} props - Changed properties from willUpdate
   * @param {object} config
   * @param {string} config.active - Active state property name
   * @param {string} config.focused - Focused state property name
   * @param {string} config.hover - Hover state property name
   * @param {string} config.opened - Bubble opened property name
   * @param {string} [config.otherOpened] - Other thumb's opened property (range slider)
   * @private
   */
  __updateBubbleState(props, { active, focused, hover, opened, otherOpened }) {
    if (props.has(active)) {
      if (this[active]) {
        this[hover] = true;
      } else if (props.get(active)) {
        this[opened] = this[hover];
      }
    }
    if (props.has(focused)) {
      if (this[focused]) {
        this[opened] = true;
        if (otherOpened) {
          this[otherOpened] = false;
        }
      } else if (props.get(focused)) {
        this[opened] = this[hover];
      }
    }
    if (props.has(hover)) {
      if (this[hover]) {
        this[opened] = true;
        if (otherOpened) {
          this[otherOpened] = false;
        }
      } else if (props.get(hover)) {
        this[opened] = this[active];
      }
    }
  }
  /**
   * @param {PointerEvent} event
   * @private
   */
  __onPointerDown(event) {
    if (!event.composedPath().includes(this.$.controls)) {
      return;
    }
    if (this.readonly) {
      event.preventDefault();
    }
  }
  /** @private */
  __dispatchInputEvent() {
    this.dispatchEvent(new Event("input", { bubbles: true, composed: true }));
  }
  /** @private */
  __detectAndDispatchChange() {
    if (JSON.stringify(this.__lastCommittedValue) !== JSON.stringify(this.value)) {
      this.__lastCommittedValue = this.value;
      this.dispatchEvent(new Event("change", { bubbles: true }));
    }
  }
  /**
   * @param {Event} event
   * @private
   */
  __onChange(event) {
    event.stopPropagation();
    this.__detectAndDispatchChange();
  }
  /**
   * Fired when the slider value changes during user interaction.
   *
   * @event input
   */
  /**
   * Fired when the user commits a value change.
   *
   * @event change
   */
};
/**
 * @license
 * Copyright (c) 2026 - 2026 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
class RangeSlider extends FieldMixin(
  SliderMixin(FocusMixin(ElementMixin(ThemableMixin(PolylitMixin(LumoInjectionMixin(LitElement))))))
) {
  static get is() {
    return "vaadin-range-slider";
  }
  static get styles() {
    return [
      field,
      sliderStyles,
      css`
        :host([focus-ring][start-focused]) [part~='thumb-start'],
        :host([focus-ring][end-focused]) [part~='thumb-end'] {
          outline: var(--vaadin-focus-ring-width) var(--_outline-style, solid) var(--vaadin-focus-ring-color);
          outline-offset: 1px;
        }

        #controls {
          grid-template-columns:
            [track-start]
            calc(var(--start-value) * var(--_track-width))
            [thumb1]
            0
            [fill-start]
            calc((var(--end-value) - var(--start-value)) * var(--_track-width))
            [fill-end thumb2]
            0
            calc((1 - var(--end-value)) * var(--_track-width))
            var(--_thumb-width)
            [track-end];
        }

        [part='track-fill'] {
          margin-inline-start: var(--_thumb-width);
        }

        [part~='thumb-end'] {
          grid-column: thumb2;
        }

        :host([readonly]) [part='track-fill'] {
          border-inline-start: none;
        }

        ::slotted(input:last-of-type) {
          clip-path: inset(
            0 0 0
              clamp(
                0%,
                var(--_thumb-width) / 2 + var(--start-value) * var(--_track-width) +
                  (var(--end-value) - var(--start-value)) * var(--_track-width) / 2,
                100%
              )
          );
        }

        :host([dir='rtl']) ::slotted(input:last-of-type) {
          clip-path: inset(
            0
              clamp(
                0%,
                var(--_thumb-width) / 2 + var(--start-value) * var(--_track-width) +
                  (var(--end-value) - var(--start-value)) * var(--_track-width) / 2,
                100%
              )
              0 0
          );
        }
      `
    ];
  }
  static get experimental() {
    return "sliderComponent";
  }
  static get lumoInjector() {
    return { ...super.lumoInjector, includeBaseStyles: true };
  }
  static get properties() {
    return {
      /**
       * The value of the slider.
       */
      value: {
        type: Array,
        value: () => [0, 100],
        notify: true,
        sync: true
      },
      /**
       * Custom accessible name for the start (minimum) input.
       * When not set, defaults to "${label} min" or "min" if no label.
       * @attr {string} accessible-name-start
       */
      accessibleNameStart: {
        type: String
      },
      /**
       * Custom accessible name for the end (maximum) input.
       * When not set, defaults to "${label} max" or "max" if no label.
       * @attr {string} accessible-name-end
       */
      accessibleNameEnd: {
        type: String
      },
      /** @private */
      __startActive: {
        type: Boolean,
        value: false,
        reflectToAttribute: true,
        attribute: "start-active",
        sync: true
      },
      /** @private */
      __endActive: {
        type: Boolean,
        value: false,
        reflectToAttribute: true,
        attribute: "end-active",
        sync: true
      },
      /** @private */
      __startFocused: {
        type: Boolean,
        value: false,
        reflectToAttribute: true,
        attribute: "start-focused",
        sync: true
      },
      /** @private */
      __endFocused: {
        type: Boolean,
        value: false,
        reflectToAttribute: true,
        attribute: "end-focused",
        sync: true
      },
      /** @private */
      __startHover: {
        type: Boolean,
        value: false,
        sync: true
      },
      /** @private */
      __endHover: {
        type: Boolean,
        value: false,
        sync: true
      },
      /** @private */
      __startBubbleOpened: {
        type: Boolean,
        value: false,
        sync: true
      },
      /** @private */
      __endBubbleOpened: {
        type: Boolean,
        value: false,
        sync: true
      }
    };
  }
  /** @protected */
  render() {
    const [startValue, endValue] = this.__value;
    const startPercent = this.__getPercentFromValue(startValue);
    const endPercent = this.__getPercentFromValue(endValue);
    const { min, max } = this.__getConstraints();
    return html`
      <div class="vaadin-slider-container">
        <div part="label" @click="${this.focus}">
          <slot name="label"></slot>
          <span part="required-indicator" aria-hidden="true"></span>
        </div>

        <div id="controls" style="${styleMap({ "--start-value": startPercent, "--end-value": endPercent })}">
          <div part="track">
            <div part="track-fill"></div>
          </div>
          <div part="thumb thumb-start"></div>
          <div part="thumb thumb-end"></div>
          <slot name="input"></slot>
          <slot name="bubble"></slot>
        </div>

        <div part="marks" aria-hidden="true">
          <span part="min">${min}</span>
          <span part="max">${max}</span>
        </div>

        <div part="helper-text">
          <slot name="helper"></slot>
        </div>

        <div part="error-message">
          <slot name="error-message"></slot>
        </div>
      </div>
    `;
  }
  constructor() {
    super();
    this.__value = [...this.value];
    this.__inputId0 = `slider-${generateUniqueId()}`;
    this.__inputId1 = `slider-${generateUniqueId()}`;
    this.__onPointerUp = this.__onPointerUp.bind(this);
  }
  /** @protected */
  firstUpdated() {
    super.firstUpdated();
    const inputs = this.querySelectorAll('[slot="input"]');
    this._inputElements = [...inputs];
    this.ariaTarget = this;
    this.__thumbStartElement = this.shadowRoot.querySelector('[part~="thumb-start"]');
    this.__thumbEndElement = this.shadowRoot.querySelector('[part~="thumb-end"]');
    this.__bubbleElements = [...this.querySelectorAll("vaadin-slider-bubble")];
  }
  /** @private */
  __onPointerDown(event) {
    super.__onPointerDown(event);
    const index = this._inputElements.indexOf(event.composedPath()[0]);
    if (!this.readonly && index !== -1) {
      this.toggleAttribute("start-active", index === 0);
      this.toggleAttribute("end-active", index === 1);
      window.addEventListener("pointerup", this.__onPointerUp);
      window.addEventListener("pointercancel", this.__onPointerUp);
    }
  }
  /** @private */
  __onPointerUp() {
    window.removeEventListener("pointerup", this.__onPointerUp);
    window.removeEventListener("pointercancel", this.__onPointerUp);
    this.removeAttribute("start-active");
    this.removeAttribute("end-active");
  }
  /**
   * Override update to render slotted `<input type="range" />`
   * into light DOM after rendering shadow DOM.
   * @protected
   */
  update(props) {
    super.update(props);
    const [startValue, endValue] = this.__value;
    const { min, max, step } = this.__getConstraints();
    render(
      html`
        <input
          type="range"
          id="${this.__inputId0}"
          slot="input"
          aria-label="${this.accessibleNameStart || this.__getAriaLabel("min")}"
          .min="${min}"
          .max="${max}"
          .step="${step}"
          .value="${startValue}"
          .disabled="${this.disabled}"
          tabindex="${this.disabled ? -1 : 0}"
          @pointerenter="${this.__onStartPointerEnter}"
          @pointermove="${this.__onStartPointerMove}"
          @pointerleave="${this.__onStartPointerLeave}"
          @keydown="${this.__onKeyDown}"
          @input="${this.__onStartInput}"
          @change="${this.__onChange}"
        />
        <input
          type="range"
          id="${this.__inputId1}"
          slot="input"
          aria-label="${this.accessibleNameEnd || this.__getAriaLabel("max")}"
          .min="${min}"
          .max="${max}"
          .step="${step}"
          .value="${endValue}"
          .disabled="${this.disabled}"
          tabindex="${this.disabled ? -1 : 0}"
          @pointerenter="${this.__onEndPointerEnter}"
          @pointermove="${this.__onEndPointerMove}"
          @pointerleave="${this.__onEndPointerLeave}"
          @keydown="${this.__onKeyDown}"
          @input="${this.__onEndInput}"
          @change="${this.__onChange}"
        />
        <vaadin-slider-bubble
          slot="bubble"
          .positionTarget="${this.__thumbStartElement}"
          .opened="${this.valueAlwaysVisible || this.__startBubbleOpened}"
          theme="${ifDefined(this._theme)}"
        >
          ${startValue}
        </vaadin-slider-bubble>
        <vaadin-slider-bubble
          slot="bubble"
          .positionTarget="${this.__thumbEndElement}"
          .opened="${this.valueAlwaysVisible || this.__endBubbleOpened}"
          theme="${ifDefined(this._theme)}"
        >
          ${endValue}
        </vaadin-slider-bubble>
      `,
      this,
      { host: this }
    );
  }
  /** @protected */
  willUpdate(props) {
    super.willUpdate(props);
    this.__updateBubbleState(props, {
      active: "__startActive",
      focused: "__startFocused",
      hover: "__startHover",
      opened: "__startBubbleOpened",
      otherOpened: "__endBubbleOpened"
    });
    this.__updateBubbleState(props, {
      active: "__endActive",
      focused: "__endFocused",
      hover: "__endHover",
      opened: "__endBubbleOpened",
      otherOpened: "__startBubbleOpened"
    });
  }
  /** @protected */
  updated(props) {
    super.updated(props);
    if (props.has("value") || props.has("min") || props.has("max") || props.has("step")) {
      const value = [...this.value];
      value.forEach((v, idx) => {
        this.__updateValue(v, idx, value);
      });
    }
  }
  /**
   * @param {FocusOptions=} options
   * @protected
   * @override
   */
  focus(options) {
    if (this.disabled) {
      return;
    }
    if (this._inputElements) {
      this._inputElements[0].focus();
    }
    super.focus(options);
  }
  /**
   * @protected
   * @override
   */
  blur() {
    if (this._inputElements) {
      const focusedInput = this._inputElements.find((input) => isElementFocused(input));
      if (focusedInput) {
        focusedInput.blur();
      }
    }
  }
  /**
   * Override method inherited from `FocusMixin` to set
   * state attributes indicating which thumb has focus.
   *
   * @param {boolean} focused
   * @protected
   * @override
   */
  _setFocused(focused) {
    super._setFocused(focused);
    this.__startFocused = isElementFocused(this._inputElements[0]);
    this.__endFocused = isElementFocused(this._inputElements[1]);
  }
  /** @private */
  __getAriaLabel(suffix) {
    return this.label ? `${this.label} ${suffix}` : suffix;
  }
  /** @private */
  __commitValue() {
    this.value = [...this.__value];
  }
  /** @private */
  __onStartInput(event) {
    event.stopPropagation();
    if (parseFloat(event.target.value) > this.__value[1]) {
      event.target.value = this.__value[1];
    }
    const value = event.target.value;
    this.__updateValue(value, 0);
    this.__updateBubble(0);
    this.__dispatchInputEvent();
    this.__commitValue();
  }
  /** @private */
  __onEndInput(event) {
    event.stopPropagation();
    if (parseFloat(event.target.value) < this.__value[0]) {
      event.target.value = this.__value[0];
    }
    const value = event.target.value;
    this.__updateValue(value, 1);
    this.__updateBubble(1);
    this.__dispatchInputEvent();
    this.__commitValue();
  }
  /** @private */
  __isThumbEvent(event, thumb) {
    const rect = thumb.getBoundingClientRect();
    return event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom;
  }
  /** @private */
  __onStartPointerEnter(event) {
    if (this.__isThumbEvent(event, this.__thumbStartElement)) {
      this.__startHover = true;
    }
  }
  /** @private */
  __onStartPointerMove(event) {
    this.__startHover = this.__isThumbEvent(event, this.__thumbStartElement);
  }
  /** @private */
  __onStartPointerLeave() {
    this.__startHover = false;
  }
  /** @private */
  __onEndPointerEnter(event) {
    if (this.__isThumbEvent(event, this.__thumbEndElement)) {
      this.__endHover = true;
    }
  }
  /** @private */
  __onEndPointerMove(event) {
    this.__endHover = this.__isThumbEvent(event, this.__thumbEndElement);
  }
  /** @private */
  __onEndPointerLeave() {
    this.__endHover = false;
  }
  /** @private */
  __onKeyDown(event) {
    const prevKeys = ["ArrowLeft", "ArrowDown", "PageDown", "Home"];
    const nextKeys = ["ArrowRight", "ArrowUp", "PageUp", "End"];
    const isNextKey = nextKeys.includes(event.key);
    const isPrevKey = prevKeys.includes(event.key);
    if (!isNextKey && !isPrevKey) {
      return;
    }
    const index = this._inputElements.indexOf(event.target);
    if (this.readonly || this.__value[0] === this.__value[1] && (index === 0 && isNextKey || index === 1 && isPrevKey)) {
      event.preventDefault();
    }
  }
  /** @private */
  __updateBubble(idx) {
    this.__bubbleElements[idx].$.overlay._updatePosition();
  }
}
defineCustomElement(RangeSlider);
/**
 * @license
 * Copyright (c) 2016 - 2026 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const splitLayoutStyles = css`
  :host {
    display: flex;
    contain: layout;
    min-height: 0;
  }

  :host([hidden]) {
    display: none !important;
  }

  :host([orientation='vertical']) {
    flex-direction: column;
  }

  ::slotted(*) {
    flex: 1 1 auto;
    min-width: 0;
    min-height: 0;
  }

  ::slotted(:not(vaadin-split-layout)) {
    overflow: clip;
  }

  [part='splitter'] {
    --_splitter-size: var(--vaadin-split-layout-splitter-size, 8px);
    --_splitter-target-size: var(--vaadin-split-layout-splitter-target-size, 8px);
    --_handle-size: var(--vaadin-split-layout-handle-size, 4px);
    --_handle-target-size: var(--vaadin-split-layout-handle-target-size, 32px);
    background: var(--vaadin-split-layout-splitter-background, var(--vaadin-background-container-strong));
    flex: none;
    position: relative;
    z-index: 1;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  [part='splitter']::after {
    content: '';
    inset: 0 calc((var(--_splitter-target-size) - var(--_splitter-size)) / -2);
    position: absolute;
  }

  :host([orientation='vertical']) [part='splitter']::after {
    inset: calc((var(--_splitter-target-size) - var(--_splitter-size)) / -2) 0;
  }

  :host(:not([orientation='vertical'])) > [part='splitter'] {
    cursor: ew-resize;
    width: var(--_splitter-size);
  }

  :host([orientation='vertical']) > [part='splitter'] {
    cursor: ns-resize;
    height: var(--_splitter-size);
  }

  [part='handle'] {
    background: var(--vaadin-split-layout-handle-background, var(--vaadin-text-color-secondary));
    border-radius: var(--vaadin-radius-m);
    flex: none;
    width: var(--_handle-size);
    height: var(--_handle-target-size);
    max-height: 50%;
    position: absolute;
  }

  :host([orientation='vertical']) [part='handle'] {
    width: var(--_handle-target-size);
    max-width: 50%;
    height: var(--_handle-size);
    max-height: none;
  }

  [part='handle']::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    height: var(--_handle-target-size);
    width: var(--_handle-target-size);
    transform: translate3d(-50%, -50%, 0);
    border-radius: 50%;
  }

  :host([theme~='small']) > [part='splitter'] {
    --vaadin-split-layout-splitter-size: 1px;
    --vaadin-split-layout-splitter-target-size: 5px;
    --vaadin-split-layout-handle-size: 3px;
  }

  :host([theme~='small']) [part='splitter'] [part='handle'] {
    opacity: 0;
  }

  :host([theme~='small']) [part='splitter']:active [part='handle'] {
    opacity: 1;
  }

  @media (any-hover: hover) {
    :host([theme~='small']) [part='splitter']:hover [part='handle'] {
      opacity: 1;
    }
  }

  @media (forced-colors: active) {
    [part~='splitter'] {
      border: 1px solid;
    }
  }
`;
/**
 * @license
 * Copyright (c) 2016 - 2026 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const SplitLayoutMixin = (superClass) => class SplitLayoutMixin extends superClass {
  static get properties() {
    return {
      /**
       * The split layout's orientation. Possible values are: `horizontal|vertical`.
       */
      orientation: {
        type: String,
        reflectToAttribute: true,
        value: "horizontal"
      },
      /** @private */
      _previousPrimaryPointerEvents: String,
      /** @private */
      _previousSecondaryPointerEvents: String
    };
  }
  /** @protected */
  ready() {
    super.ready();
    this._processChildren();
    this.__observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        this._cleanupNodes(mutation.removedNodes);
      });
      this._processChildren();
    });
    this.__observer.observe(this, { childList: true });
    const splitter = this.$.splitter;
    addListener(splitter, "track", this._onHandleTrack.bind(this));
    addListener(splitter, "down", this._setPointerEventsNone.bind(this));
    addListener(splitter, "up", this._restorePointerEvents.bind(this));
  }
  /** @private */
  _cleanupNodes(nodes) {
    nodes.forEach((node) => {
      if (node.nodeType === Node.ELEMENT_NODE && !(node.parentElement instanceof this.constructor)) {
        const slot = node.getAttribute("slot");
        if (slot) {
          this[`_${slot}Child`] = null;
          node.removeAttribute("slot");
        }
      }
    });
  }
  /** @private */
  _processChildren() {
    const children = [...this.children];
    children.filter((child) => child.hasAttribute("slot")).forEach((child) => this._processChildWithSlot(child));
    children.filter((child) => !child.hasAttribute("slot")).forEach((child, i) => this._processChildWithoutSlot(child, i));
  }
  /** @private */
  _processChildWithSlot(child) {
    const slot = child.getAttribute("slot");
    if (child.__autoSlotted) {
      this[`_${slot}Child`] = null;
      child.removeAttribute("slot");
    } else {
      this[`_${slot}Child`] = child;
    }
  }
  /** @private */
  _processChildWithoutSlot(child, idx) {
    let slotName;
    if (this._primaryChild || this._secondaryChild) {
      slotName = this._primaryChild ? "secondary" : "primary";
    } else {
      slotName = idx === 0 ? "primary" : "secondary";
    }
    this[`_${slotName}Child`] = child;
    child.setAttribute("slot", slotName);
    child.__autoSlotted = true;
  }
  /** @private */
  _setFlexBasis(element, flexBasis, containerSize) {
    flexBasis = Math.max(0, Math.min(flexBasis, containerSize));
    if (flexBasis === 0) {
      flexBasis = 1e-6;
    }
    element.style.flex = `1 1 ${flexBasis}px`;
  }
  /** @private */
  _setPointerEventsNone(event) {
    if (!this._primaryChild || !this._secondaryChild) {
      return;
    }
    this._previousPrimaryPointerEvents = this._primaryChild.style.pointerEvents;
    this._previousSecondaryPointerEvents = this._secondaryChild.style.pointerEvents;
    this._primaryChild.style.pointerEvents = "none";
    this._secondaryChild.style.pointerEvents = "none";
    event.preventDefault();
  }
  /** @private */
  _restorePointerEvents() {
    if (!this._primaryChild || !this._secondaryChild) {
      return;
    }
    this._primaryChild.style.pointerEvents = this._previousPrimaryPointerEvents;
    this._secondaryChild.style.pointerEvents = this._previousSecondaryPointerEvents;
  }
  /** @private */
  _onHandleTrack(event) {
    if (!this._primaryChild || !this._secondaryChild) {
      return;
    }
    const size = this.orientation === "vertical" ? "height" : "width";
    if (event.detail.state === "start") {
      this._startSize = {
        container: this.getBoundingClientRect()[size] - this.$.splitter.getBoundingClientRect()[size],
        primary: this._primaryChild.getBoundingClientRect()[size],
        secondary: this._secondaryChild.getBoundingClientRect()[size]
      };
      return;
    }
    const distance = this.orientation === "vertical" ? event.detail.dy : event.detail.dx;
    const isRtl = this.orientation !== "vertical" && this.__isRTL;
    const dirDistance = isRtl ? -distance : distance;
    this._setFlexBasis(this._primaryChild, this._startSize.primary + dirDistance, this._startSize.container);
    this._setFlexBasis(this._secondaryChild, this._startSize.secondary - dirDistance, this._startSize.container);
    if (event.detail.state === "end") {
      this.dispatchEvent(new CustomEvent("splitter-dragend"));
      delete this._startSize;
    }
  }
};
/**
 * @license
 * Copyright (c) 2016 - 2026 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
class SplitLayout extends SplitLayoutMixin(ElementMixin(ThemableMixin(PolylitMixin(LumoInjectionMixin(LitElement))))) {
  static get is() {
    return "vaadin-split-layout";
  }
  static get styles() {
    return splitLayoutStyles;
  }
  static get lumoInjector() {
    return { ...super.lumoInjector, includeBaseStyles: true };
  }
  /** @protected */
  render() {
    return html`
      <slot id="primary" name="primary"></slot>
      <div part="splitter" id="splitter">
        <div part="handle"></div>
      </div>
      <slot id="secondary" name="secondary"></slot>
    `;
  }
  /**
   * Fired after dragging the splitter have ended.
   *
   * @event splitter-dragend
   */
}
defineCustomElement(SplitLayout);
class BigDecimalField extends TextField {
  static get is() {
    return "vaadin-big-decimal-field";
  }
  static get lumoInjector() {
    return { ...super.lumoInjector, is: "vaadin-text-field" };
  }
  static get styles() {
    return [
      ...super.styles,
      css`
        :host([dir='rtl']) [part='input-field'] {
          direction: ltr;
        }

        :host([dir='rtl']) [part='input-field'] ::slotted(input) {
          --_lumo-text-field-overflow-mask-image: linear-gradient(to left, transparent, #000 1.25em) !important;
        }
      `
    ];
  }
  static get properties() {
    return {
      _decimalSeparator: {
        type: String,
        value: ".",
        sync: true,
        observer: "__decimalSeparatorChanged"
      }
    };
  }
  ready() {
    super.ready();
    this.inputElement.setAttribute("inputmode", "decimal");
  }
  __decimalSeparatorChanged(separator, oldSeparator) {
    this.allowedCharPattern = "[-+\\d" + separator + "]";
    if (this.value && oldSeparator) {
      this.value = this.value.split(oldSeparator).join(separator);
    }
  }
}
defineCustomElement(BigDecimalField);
/**
 * @license
 * Copyright (c) 2021 - 2026 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const emailFieldStyles = css`
  :host([dir='rtl']) [part='input-field'] {
    direction: ltr;
  }

  :host([dir='rtl']) [part='input-field'] ::slotted(input)::placeholder {
    direction: rtl;
    text-align: left;
  }
`;
/**
 * @license
 * Copyright (c) 2021 - 2026 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
class EmailField extends TextField {
  static get is() {
    return "vaadin-email-field";
  }
  static get styles() {
    return [...super.styles, emailFieldStyles];
  }
  /** @override */
  static get delegateAttrs() {
    return super.delegateAttrs.filter((attr) => attr !== "autocapitalize");
  }
  constructor() {
    super();
    this._setType("email");
    this.pattern = "^[a-zA-Z0-9_\\-+]+(?:\\.[a-zA-Z0-9_\\-+]+)*@[a-zA-Z0-9\\-.]+\\.[a-zA-Z0-9\\-]{2,}$";
  }
  /** @protected */
  ready() {
    super.ready();
    if (this.inputElement) {
      this.inputElement.autocapitalize = "off";
    }
  }
}
defineCustomElement(EmailField);
/**
 * @license
 * Copyright (c) 2021 - 2026 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const numberFieldStyles = css`
  :host([step-buttons-visible]) ::slotted(input) {
    text-align: center;
  }

  [part~='decrease-button']::before {
    mask-image: var(--_vaadin-icon-minus);
  }

  [part~='increase-button']::before {
    mask-image: var(--_vaadin-icon-plus);
  }

  :host([dir='rtl']) [part='input-field'] {
    direction: ltr;
  }

  :host([readonly]) [part$='button'] {
    pointer-events: none;
  }
`;
/**
 * @license
 * Copyright (c) 2021 - 2026 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const BAD_INPUT_STRING = "NaN";
const NumberFieldMixin = (superClass) => class NumberFieldMixinClass extends InputFieldMixin(superClass) {
  static get properties() {
    return {
      /**
       * The minimum value of the field.
       */
      min: {
        type: Number
      },
      /**
       * The maximum value of the field.
       */
      max: {
        type: Number
      },
      /**
       * Specifies the allowed number intervals of the field.
       */
      step: {
        type: Number
      },
      /**
       * Set to true to show increase/decrease buttons.
       * @attr {boolean} step-buttons-visible
       */
      stepButtonsVisible: {
        type: Boolean,
        value: false,
        reflectToAttribute: true
      }
    };
  }
  static get observers() {
    return ["_stepChanged(step, inputElement)"];
  }
  static get delegateProps() {
    return [...super.delegateProps, "min", "max"];
  }
  static get constraints() {
    return [...super.constraints, "min", "max", "step"];
  }
  constructor() {
    super();
    this._setType("number");
    this.__onWheel = this.__onWheel.bind(this);
  }
  /** @protected */
  get slotStyles() {
    const tag = this.localName;
    return [
      `
          ${tag} input[type="number"]::-webkit-outer-spin-button,
          ${tag} input[type="number"]::-webkit-inner-spin-button {
            appearance: none;
            margin: 0;
          }

          ${tag} input[type="number"] {
            appearance: textfield;
          }

          ${tag}[dir='rtl'] input[type="number"]::placeholder {
            direction: rtl;
          }

          ${tag}[dir='rtl']:not([step-buttons-visible]) input[type="number"]::placeholder {
            text-align: left;
          }
        `
    ];
  }
  /**
   * Used by `InputControlMixin` as a reference to the clear button element.
   * @protected
   */
  get clearElement() {
    return this.$.clearButton;
  }
  /**
   * Whether the input element's value is unparsable.
   *
   * @private
   */
  get __hasUnparsableValue() {
    return this._inputElementValue === BAD_INPUT_STRING;
  }
  /** @protected */
  ready() {
    super.ready();
    this.addController(
      new InputController(this, (input) => {
        this._setInputElement(input);
        this._setFocusElement(input);
        this.stateTarget = input;
        this.ariaTarget = input;
      })
    );
    this.addController(new LabelledInputController(this.inputElement, this._labelController));
    this._tooltipController = new TooltipController(this);
    this.addController(this._tooltipController);
    this._tooltipController.setPosition("top");
    this._tooltipController.setAriaTarget(this.inputElement);
  }
  /**
   * Override the method from `InputConstraintsMixin`
   * to enforce HTML constraint validation even if
   * the user didn't add any constraints explicitly:
   * the field has to be regardless checked for bad input.
   *
   * @override
   */
  checkValidity() {
    if (this.inputElement) {
      return this.inputElement.checkValidity();
    }
    return !this.invalid;
  }
  /**
   * Override the method from `InputMixin` to add
   * a wheel event listener to the input element.
   *
   * @param {HTMLElement} input
   * @override
   * @protected
   */
  _addInputListeners(input) {
    super._addInputListeners(input);
    input.addEventListener("wheel", this.__onWheel);
  }
  /**
   * Override the method from `InputMixin` to remove
   * the wheel event listener from the input element.
   *
   * @param {HTMLElement} input
   * @override
   * @protected
   */
  _removeInputListeners(input) {
    super._removeInputListeners(input);
    input.removeEventListener("wheel", this.__onWheel);
  }
  /**
   * Prevents default browser behavior for wheel events on the input element
   * when it's focused. More precisely, this prevents the browser from attempting
   * to increment or decrement the value when the mouse wheel is used within
   * the input element.
   *
   * CAVEAT: As a side-effect, this also prevents page scrolling when
   * the pointer is positioned over the field and the field is focused.
   *
   * @param {WheelEvent} event
   * @private
   */
  __onWheel(event) {
    if (this.hasAttribute("focused")) {
      event.preventDefault();
    }
  }
  /** @protected */
  _onDecreaseButtonTouchend(e) {
    if (e.cancelable) {
      e.preventDefault();
      this.__blurActiveElement();
      this._decreaseValue();
    }
  }
  /** @protected */
  _onIncreaseButtonTouchend(e) {
    if (e.cancelable) {
      e.preventDefault();
      this.__blurActiveElement();
      this._increaseValue();
    }
  }
  /** @private */
  __blurActiveElement() {
    const activeElement = getDeepActiveElement();
    if (activeElement && activeElement !== this.inputElement) {
      activeElement.blur();
    }
  }
  /** @protected */
  _onDecreaseButtonClick() {
    this._decreaseValue();
  }
  /** @protected */
  _onIncreaseButtonClick() {
    this._increaseValue();
  }
  /** @private */
  _decreaseValue() {
    this._incrementValue(-1);
  }
  /** @private */
  _increaseValue() {
    this._incrementValue(1);
  }
  /** @private */
  _incrementValue(incr) {
    if (this.disabled || this.readonly) {
      return;
    }
    const step = this.step || 1;
    let value = parseFloat(this.value);
    if (!this.value) {
      if (this.min === 0 && incr < 0 || this.max === 0 && incr > 0 || this.max === 0 && this.min === 0) {
        incr = 0;
        value = 0;
      } else if ((this.max == null || this.max >= 0) && (this.min == null || this.min <= 0)) {
        value = 0;
      } else if (this.min > 0) {
        value = this.min;
        if (this.max < 0 && incr < 0) {
          value = this.max;
        }
        incr = 0;
      } else if (this.max < 0) {
        value = this.max;
        if (incr < 0) {
          incr = 0;
        } else if (this._getIncrement(1, value - step) > this.max) {
          value -= 2 * step;
        } else {
          value -= step;
        }
      }
    } else if (value < this.min) {
      incr = 0;
      value = this.min;
    } else if (value > this.max) {
      incr = 0;
      value = this.max;
    }
    const newValue = this._getIncrement(incr, value);
    if (!this.value || incr === 0 || this._incrementIsInsideTheLimits(incr, value)) {
      this.inputElement.value = String(parseFloat(newValue));
      this.inputElement.dispatchEvent(new Event("input", { bubbles: true, composed: true }));
      this.__commitValueChange();
    }
  }
  /** @private */
  _getIncrement(incr, currentValue) {
    let step = this.step || 1, min = this.min || 0;
    const multiplier = Math.max(
      this._getMultiplier(currentValue),
      this._getMultiplier(step),
      this._getMultiplier(min)
    );
    step *= multiplier;
    currentValue = Math.round(currentValue * multiplier);
    min *= multiplier;
    const margin = (currentValue - min) % step;
    if (incr > 0) {
      return (currentValue - margin + step) / multiplier;
    } else if (incr < 0) {
      return (currentValue - (margin || step)) / multiplier;
    }
    return currentValue / multiplier;
  }
  /** @private */
  _getDecimalCount(number) {
    const s = String(number);
    const i = s.indexOf(".");
    return i === -1 ? 1 : s.length - i - 1;
  }
  /** @private */
  _getMultiplier(number) {
    if (!isNaN(number)) {
      return 10 ** this._getDecimalCount(number);
    }
  }
  /** @private */
  _incrementIsInsideTheLimits(incr, value) {
    if (incr < 0) {
      return this.min == null || this._getIncrement(incr, value) >= this.min;
    } else if (incr > 0) {
      return this.max == null || this._getIncrement(incr, value) <= this.max;
    }
    return this._getIncrement(incr, value) <= this.max && this._getIncrement(incr, value) >= this.min;
  }
  /** @protected */
  _isButtonEnabled(sign) {
    const incr = sign * (this.step || 1);
    const value = parseFloat(this.value);
    return !this.value || !this.disabled && this._incrementIsInsideTheLimits(incr, value);
  }
  /**
   * @param {number} step
   * @param {HTMLElement | undefined} inputElement
   * @protected
   */
  _stepChanged(step, inputElement) {
    if (inputElement) {
      inputElement.step = step || "any";
    }
  }
  /**
   * @param {unknown} newVal
   * @param {unknown} oldVal
   * @protected
   * @override
   */
  _valueChanged(newVal, oldVal) {
    if (newVal && isNaN(parseFloat(newVal))) {
      this.value = "";
    } else if (typeof this.value !== "string") {
      this.value = String(this.value);
    }
    super._valueChanged(this.value, oldVal);
    if (!this.__keepCommittedValue) {
      this.__committedValue = this.value;
      this.__committedUnparsableValueStatus = false;
    }
  }
  /**
   * Override an event listener from `InputControlMixin`
   * to avoid adding a separate listener.
   * @param {!KeyboardEvent} event
   * @protected
   * @override
   */
  _onKeyDown(event) {
    if (event.key === "ArrowUp") {
      event.preventDefault();
      this._increaseValue();
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      this._decreaseValue();
    }
    super._onKeyDown(event);
  }
  /**
   * Override this method from `InputMixin` to prevent
   * the value change caused by user input from being treated
   * as initiated programmatically by the developer and therefore
   * from getting silently committed by the value observer without
   * any change event. The value change will be committed later
   * on blur or Enter.
   *
   * @param {InputEvent} event
   * @override
   * @protected
   */
  _onInput(event) {
    this.__keepCommittedValue = true;
    super._onInput(event);
    this.__keepCommittedValue = false;
  }
  /**
   * Override this method from `InputControlMixin`
   * to stop propagation of the native change event.
   *
   * @param {Event} event
   * @override
   * @protected
   */
  _onChange(event) {
    event.stopPropagation();
  }
  /**
   * Override this method from `ClearButtonMixin`
   * to properly commit the empty value since
   * the change handler doesn't do that anymore.
   *
   * @param {MouseEvent} event
   * @override
   * @protected
   */
  _onClearAction(event) {
    super._onClearAction(event);
    this.__commitValueChange();
  }
  /**
   * Override this method from `FocusMixin`
   * to commit a possible pending value change on blur.
   *
   * @param {boolean} focused
   * @override
   * @protected
   */
  _setFocused(focused) {
    super._setFocused(focused);
    if (!focused) {
      this.__commitValueChange();
    }
  }
  /**
   * Override this method from `KeyboardMixin`
   * to commit a possible pending value change on Enter.
   *
   * @param {KeyboardEvent} event
   * @override
   * @protected
   */
  _onEnter(event) {
    super._onEnter(event);
    this.__commitValueChange();
  }
  /**
   * Depending on the nature of the value change that has occurred since
   * the last commit attempt, triggers validation and fires an event:
   *
   * Value change             | Event
   * :------------------------|:------------------
   * empty => parsable        | change
   * empty => unparsable      | unparsable-change
   * parsable => empty        | change
   * parsable => parsable     | change
   * parsable => unparsable   | change
   * unparsable => empty      | unparsable-change
   * unparsable => parsable   | change
   * unparsable => unparsable | -
   *
   * Note, there is currently no way to detect unparsable => unparsable changes
   * because the browser doesn't provide access to unparsable values of native
   * [type=number] inputs.
   *
   * @private
   */
  __commitValueChange() {
    if (this.__committedValue !== this.value) {
      this._requestValidation();
      this.dispatchEvent(new CustomEvent("change", { bubbles: true }));
    } else if (this.__committedUnparsableValueStatus !== this.__hasUnparsableValue) {
      this._requestValidation();
      this.dispatchEvent(new CustomEvent("unparsable-change"));
    }
    this.__committedValue = this.value;
    this.__committedUnparsableValueStatus = this.__hasUnparsableValue;
  }
  /** @override */
  get _inputElementValue() {
    if (this.inputElement && this.inputElement.validity.badInput) {
      return BAD_INPUT_STRING;
    }
    return super._inputElementValue;
  }
  /** @override */
  set _inputElementValue(value) {
    super._inputElementValue = value;
  }
};
/**
 * @license
 * Copyright (c) 2021 - 2026 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
class NumberField extends NumberFieldMixin(ThemableMixin(ElementMixin(PolylitMixin(LumoInjectionMixin(LitElement))))) {
  static get is() {
    return "vaadin-number-field";
  }
  static get styles() {
    return [inputFieldShared, numberFieldStyles];
  }
  /** @protected */
  render() {
    return html`
      <div class="vaadin-field-container">
        <div part="label">
          <slot name="label"></slot>
          <span part="required-indicator" aria-hidden="true" @click="${this.focus}"></span>
        </div>

        <vaadin-input-container
          part="input-field"
          .readonly="${this.readonly}"
          .disabled="${this.disabled}"
          .invalid="${this.invalid}"
          theme="${ifDefined(this._theme)}"
        >
          <div
            part="field-button decrease-button"
            ?disabled="${!this._isButtonEnabled(-1, this.value, this.min, this.max, this.step)}"
            ?hidden="${!this.stepButtonsVisible}"
            @click="${this._onDecreaseButtonClick}"
            @touchend="${this._onDecreaseButtonTouchend}"
            aria-hidden="true"
            slot="prefix"
          ></div>
          <slot name="prefix" slot="prefix"></slot>
          <slot name="input"></slot>
          <slot name="suffix" slot="suffix"></slot>
          <div id="clearButton" part="field-button clear-button" slot="suffix" aria-hidden="true"></div>
          <div
            part="field-button increase-button"
            ?disabled="${!this._isButtonEnabled(1, this.value, this.min, this.max, this.step)}"
            ?hidden="${!this.stepButtonsVisible}"
            @click="${this._onIncreaseButtonClick}"
            @touchend="${this._onIncreaseButtonTouchend}"
            aria-hidden="true"
            slot="suffix"
          ></div>
        </vaadin-input-container>

        <div part="helper-text">
          <slot name="helper"></slot>
        </div>

        <div part="error-message">
          <slot name="error-message"></slot>
        </div>

        <slot name="tooltip"></slot>
      </div>
    `;
  }
}
defineCustomElement(NumberField);
/**
 * @license
 * Copyright (c) 2021 - 2026 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
class IntegerField extends NumberField {
  static get is() {
    return "vaadin-integer-field";
  }
  constructor() {
    super();
    this.allowedCharPattern = "[-+\\d]";
  }
  /**
   * Override an observer from `InputMixin` to clear the value
   * when trying to type invalid characters.
   * @param {string | undefined} newVal
   * @param {string | undefined} oldVal
   * @protected
   * @override
   */
  _valueChanged(newVal, oldVal) {
    if (newVal !== "" && !this.__isInteger(newVal)) {
      console.warn(`Trying to set non-integer value "${newVal}" to <vaadin-integer-field>. Clearing the value.`);
      this.value = "";
      return;
    }
    super._valueChanged(newVal, oldVal);
  }
  /**
   * Override an observer from `NumberField` to reset the step
   * property when an invalid step is set.
   * @param {number} step
   * @param {HTMLElement | undefined} inputElement
   * @protected
   * @override
   */
  _stepChanged(step, inputElement) {
    if (step != null && !this.__hasOnlyDigits(step)) {
      console.warn(
        `<vaadin-integer-field> The \`step\` property must be a positive integer but \`${step}\` was provided, so the property was reset to \`null\`.`
      );
      this.step = null;
      return;
    }
    super._stepChanged(step, inputElement);
  }
  /** @private */
  __isInteger(value) {
    return /^(-\d)?\d*$/u.test(String(value));
  }
  /** @private */
  __hasOnlyDigits(value) {
    return /^\d+$/u.test(String(value));
  }
}
defineCustomElement(IntegerField);
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class LiveDirective extends Directive {
  constructor(partInfo) {
    super(partInfo);
    if (!(partInfo.type === PartType.PROPERTY || partInfo.type === PartType.ATTRIBUTE || partInfo.type === PartType.BOOLEAN_ATTRIBUTE)) {
      throw new Error("The `live` directive is not allowed on child or event bindings");
    }
    if (!isSingleExpression(partInfo)) {
      throw new Error("`live` bindings can only contain a single expression");
    }
  }
  render(value) {
    return value;
  }
  update(part, [value]) {
    if (value === noChange || value === nothing) {
      return value;
    }
    const element = part.element;
    const name = part.name;
    if (part.type === PartType.PROPERTY) {
      if (value === element[name]) {
        return noChange;
      }
    } else if (part.type === PartType.BOOLEAN_ATTRIBUTE) {
      if (!!value === element.hasAttribute(name)) {
        return noChange;
      }
    } else if (part.type === PartType.ATTRIBUTE) {
      if (element.getAttribute(name) === String(value)) {
        return noChange;
      }
    }
    setCommittedValue(part);
    return value;
  }
}
const live = directive(LiveDirective);
const _window = window;
_window.Vaadin = _window.Vaadin || {};
_window.Vaadin.setLitRenderer = (component, rendererName, templateExpression, returnChannel, clientCallables, propertyNamespace, appId) => {
  const callablesCreator = (itemKey) => {
    return clientCallables.map((clientCallable) => (...args) => {
      if (itemKey !== void 0) {
        returnChannel(clientCallable, itemKey, args[0] instanceof Event ? [] : [...args]);
      }
    });
  };
  const fnArgs = [
    "html",
    "root",
    "live",
    "appId",
    "itemKey",
    "model",
    "item",
    "index",
    ...clientCallables,
    `return html\`${templateExpression}\``
  ];
  const htmlGenerator = new Function(...fnArgs);
  const renderFunction = (root, model, itemKey) => {
    const { item, index } = model;
    render(htmlGenerator(html, root, live, appId, itemKey, model, item, index, ...callablesCreator(itemKey)), root);
  };
  const renderer = (root, _, model) => {
    const { item } = model;
    if (root.__litRenderer !== renderer) {
      root.innerHTML = "";
      delete root._$litPart$;
      root.__litRenderer = renderer;
    }
    const mappedItem = {};
    for (const key in item) {
      if (key.startsWith(propertyNamespace)) {
        mappedItem[key.replace(propertyNamespace, "")] = item[key];
      }
    }
    renderFunction(root, { ...model, item: mappedItem }, item.key);
  };
  renderer.__rendererId = propertyNamespace;
  component[rendererName] = renderer;
};
_window.Vaadin.unsetLitRenderer = (component, rendererName, rendererId) => {
  if (component[rendererName]?.__rendererId === rendererId) {
    component[rendererName] = void 0;
  }
};
window.Vaadin.Flow.treeGridConnector = {};
window.Vaadin.Flow.treeGridConnector.initLazy = function(grid) {
  if (grid.$connector) {
    return;
  }
  window.Vaadin.Flow.gridConnector.initLazy(grid);
  function getViewportRange() {
    const renderedRows = grid._getRenderedRows();
    return [renderedRows[0]?.index ?? 0, renderedRows[renderedRows.length - 1]?.index ?? 0];
  }
  grid._dataProviderController._shouldLoadCachePage = function(cache, page) {
    return !grid.__pendingScrollToIndexes;
  };
  grid.scrollToIndex = async function(...indexes) {
    grid.__pendingScrollToIndexes = indexes;
    if (!grid.clientHeight || !grid._columnTree || grid._dataProviderController.isLoading()) {
      return;
    }
    const [start, end] = getViewportRange();
    const padding = Math.floor((end - start) * 1.5);
    const flatIndex = await grid.$server.setViewportRangeByIndexPath(indexes, padding);
    grid._scrollToFlatIndex(flatIndex);
    delete grid.__pendingScrollToIndexes;
    return flatIndex;
  };
  grid.__getRowLevel = function(row) {
    return row._item?.level ?? 0;
  };
  grid._isExpanded = function(item) {
    return !!item?.expanded;
  };
  grid.expandItem = function(item) {
    if (item !== void 0) {
      grid.$server.updateExpandedState(grid.getItemId(item), true);
    }
  };
  grid.collapseItem = function(item) {
    if (item !== void 0) {
      grid.$server.updateExpandedState(grid.getItemId(item), false);
    }
  };
};
/**
 * @license
 * Copyright (c) 2016 - 2026 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const uploadIconStyles = css`
  :host {
    display: inline-flex;
  }

  :host::before {
    background: var(--vaadin-upload-icon-color, currentColor);
    content: '';
    display: inline-block;
    flex: none;
    height: var(--vaadin-icon-size, 1lh);
    mask: var(--_vaadin-icon-upload) 50% / var(--vaadin-icon-visual-size, 100%) no-repeat;
    width: var(--vaadin-icon-size, 1lh);
  }

  :host([hidden]) {
    display: none !important;
  }

  @media (forced-colors: active) {
    :host::before {
      background: CanvasText;
    }
  }
`;
/**
 * @license
 * Copyright (c) 2016 - 2026 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
class UploadIcon extends ThemableMixin(LumoInjectionMixin(LitElement)) {
  static get is() {
    return "vaadin-upload-icon";
  }
  static get styles() {
    return uploadIconStyles;
  }
  static get lumoInjector() {
    return { ...super.lumoInjector, includeBaseStyles: true };
  }
  /** @protected */
  render() {
    return html``;
  }
}
defineCustomElement(UploadIcon);
/**
 * @license
 * Copyright (c) 2016 - 2026 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const template$1 = document.createElement("template");
template$1.innerHTML = `
  <style>
    @font-face {
      font-family: 'vaadin-upload-icons';
      src: url(data:application/font-woff;charset=utf-8;base64,d09GRgABAAAAAAasAAsAAAAABmAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABPUy8yAAABCAAAAGAAAABgDxIF5mNtYXAAAAFoAAAAVAAAAFQXVtKMZ2FzcAAAAbwAAAAIAAAACAAAABBnbHlmAAABxAAAAfQAAAH0bBJxYWhlYWQAAAO4AAAANgAAADYPD267aGhlYQAAA/AAAAAkAAAAJAfCA8tobXR4AAAEFAAAACgAAAAoHgAAx2xvY2EAAAQ8AAAAFgAAABYCSgHsbWF4cAAABFQAAAAgAAAAIAAOADVuYW1lAAAEdAAAAhYAAAIWmmcHf3Bvc3QAAAaMAAAAIAAAACAAAwAAAAMDtwGQAAUAAAKZAswAAACPApkCzAAAAesAMwEJAAAAAAAAAAAAAAAAAAAAARAAAAAAAAAAAAAAAAAAAAAAQAAA6QUDwP/AAEADwABAAAAAAQAAAAAAAAAAAAAAIAAAAAAAAwAAAAMAAAAcAAEAAwAAABwAAwABAAAAHAAEADgAAAAKAAgAAgACAAEAIOkF//3//wAAAAAAIOkA//3//wAB/+MXBAADAAEAAAAAAAAAAAAAAAEAAf//AA8AAQAAAAAAAAAAAAIAADc5AQAAAAABAAAAAAAAAAAAAgAANzkBAAAAAAEAAAAAAAAAAAACAAA3OQEAAAAAAgAA/8AEAAPAABkAMgAAEz4DMzIeAhczLgMjIg4CBycRIScFIRcOAyMiLgInIx4DMzI+AjcXphZGWmo6SH9kQwyADFiGrmJIhXJbIEYBAFoDWv76YBZGXGw8Rn5lRQyADFmIrWBIhHReIkYCWjJVPSIyVnVDXqN5RiVEYTxG/wBa2loyVT0iMlZ1Q16jeUYnRWE5RgAAAAABAIAAAAOAA4AAAgAAExEBgAMAA4D8gAHAAAAAAwAAAAAEAAOAAAIADgASAAAJASElIiY1NDYzMhYVFAYnETMRAgD+AAQA/gAdIyMdHSMjXYADgPyAgCMdHSMjHR0jwAEA/wAAAQANADMD5gNaAAUAACUBNwUBFwHT/jptATMBppMzAU2a4AIgdAAAAAEAOv/6A8YDhgALAAABJwkBBwkBFwkBNwEDxoz+xv7GjAFA/sCMAToBOoz+wAL6jP7AAUCM/sb+xowBQP7AjAE6AAAAAwAA/8AEAAPAAAcACwASAAABFSE1IREhEQEjNTMJAjMRIRECwP6A/sAEAP0AgIACQP7A/sDAAQABQICA/oABgP8AgAHAAUD+wP6AAYAAAAABAAAAAQAAdhiEdV8PPPUACwQAAAAAANX4FR8AAAAA1fgVHwAA/8AEAAPAAAAACAACAAAAAAAAAAEAAAPA/8AAAAQAAAAAAAQAAAEAAAAAAAAAAAAAAAAAAAAKBAAAAAAAAAAAAAAAAgAAAAQAAAAEAACABAAAAAQAAA0EAAA6BAAAAAAAAAAACgAUAB4AagB4AJwAsADSAPoAAAABAAAACgAzAAMAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAADgCuAAEAAAAAAAEAEwAAAAEAAAAAAAIABwDMAAEAAAAAAAMAEwBaAAEAAAAAAAQAEwDhAAEAAAAAAAUACwA5AAEAAAAAAAYAEwCTAAEAAAAAAAoAGgEaAAMAAQQJAAEAJgATAAMAAQQJAAIADgDTAAMAAQQJAAMAJgBtAAMAAQQJAAQAJgD0AAMAAQQJAAUAFgBEAAMAAQQJAAYAJgCmAAMAAQQJAAoANAE0dmFhZGluLXVwbG9hZC1pY29ucwB2AGEAYQBkAGkAbgAtAHUAcABsAG8AYQBkAC0AaQBjAG8AbgBzVmVyc2lvbiAxLjAAVgBlAHIAcwBpAG8AbgAgADEALgAwdmFhZGluLXVwbG9hZC1pY29ucwB2AGEAYQBkAGkAbgAtAHUAcABsAG8AYQBkAC0AaQBjAG8AbgBzdmFhZGluLXVwbG9hZC1pY29ucwB2AGEAYQBkAGkAbgAtAHUAcABsAG8AYQBkAC0AaQBjAG8AbgBzUmVndWxhcgBSAGUAZwB1AGwAYQBydmFhZGluLXVwbG9hZC1pY29ucwB2AGEAYQBkAGkAbgAtAHUAcABsAG8AYQBkAC0AaQBjAG8AbgBzRm9udCBnZW5lcmF0ZWQgYnkgSWNvTW9vbi4ARgBvAG4AdAAgAGcAZQBuAGUAcgBhAHQAZQBkACAAYgB5ACAASQBjAG8ATQBvAG8AbgAuAAAAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==) format('woff');
      font-weight: normal;
      font-style: normal;
    }
  </style>
`;
document.head.appendChild(template$1.content);
/**
 * @license
 * Copyright (c) 2016 - 2026 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const uploadFileStyles = [
  loaderStyles,
  css`
    :host {
      align-items: baseline;
      display: grid;
      gap: var(--vaadin-upload-file-gap, var(--vaadin-gap-s));
      grid-template-columns: var(--vaadin-icon-size, 1lh) minmax(0, 1fr) auto;
      padding: var(--vaadin-upload-file-padding, var(--vaadin-padding-s));
      border-radius: var(--vaadin-upload-file-border-radius, var(--vaadin-radius-m));
    }

    :host(:focus-visible) {
      outline: var(--vaadin-focus-ring-width) solid var(--vaadin-focus-ring-color);
      outline-offset: calc(var(--vaadin-focus-ring-width) * -1);
    }

    [hidden] {
      display: none;
    }

    [part='thumbnail'],
    [part='loader'] {
      display: none;
      grid-column: 1;
    }

    :host([uploading]) [part='loader'],
    [part='done-icon']:not([hidden]),
    [part='warning-icon']:not([hidden]) {
      display: flex;
      grid-column: 1;
    }

    [part='loader']::before,
    [part='done-icon']::before,
    [part='warning-icon']::before {
      content: '\\2003' / '';
      display: inline-flex;
      align-items: center;
      flex: none;
      height: var(--vaadin-icon-size, 1lh);
      width: var(--vaadin-icon-size, 1lh);
    }

    [part='loader']::before {
      margin: calc(var(--vaadin-spinner-width, 2px) * -1);
    }

    :is([part$='icon'], [part$='button'])::before {
      mask-size: var(--vaadin-icon-visual-size, 100%);
      mask-position: 50%;
      mask-repeat: no-repeat;
    }

    [part='done-icon']::before {
      background: var(--vaadin-upload-file-done-color, currentColor);
      mask-image: var(--_vaadin-icon-checkmark);
    }

    [part='warning-icon']::before {
      background: var(--vaadin-upload-file-warning-color, currentColor);
      mask-image: var(--_vaadin-icon-warn);
    }

    [part='meta'] {
      grid-column: 2;

      & > div {
        cursor: inherit;
      }
    }

    [part='name'] {
      color: var(--vaadin-upload-file-name-color, var(--vaadin-text-color));
      font-size: var(--vaadin-upload-file-name-font-size, inherit);
      font-weight: var(--vaadin-upload-file-name-font-weight, inherit);
      line-height: var(--vaadin-upload-file-name-line-height, inherit);
      overflow: hidden;
      text-overflow: ellipsis;
    }

    [part='status'] {
      color: var(--vaadin-upload-file-status-color, var(--vaadin-text-color-secondary));
      font-size: var(--vaadin-upload-file-status-font-size, inherit);
      font-weight: var(--vaadin-upload-file-status-font-weight, inherit);
      line-height: var(--vaadin-upload-file-status-line-height, inherit);
    }

    [part='error'] {
      color: var(--vaadin-upload-file-error-color, var(--vaadin-text-color));
      font-size: var(--vaadin-upload-file-error-font-size, inherit);
      font-weight: var(--vaadin-upload-file-error-font-weight, inherit);
      line-height: var(--vaadin-upload-file-error-line-height, inherit);
    }

    [part='commands'] {
      display: flex;
      align-items: center;
      gap: var(--vaadin-gap-xs);
      height: var(--vaadin-icon-size, 1lh);
      align-self: center;
    }

    button {
      background: var(--vaadin-upload-file-button-background, transparent);
      border: var(--vaadin-upload-file-button-border-width, 0) solid
        var(--vaadin-upload-file-button-border-color, var(--vaadin-border-color-secondary));
      border-radius: var(--vaadin-upload-file-button-border-radius, var(--vaadin-radius-m));
      color: var(--vaadin-upload-file-button-text-color, var(--vaadin-text-color));
      cursor: var(--vaadin-clickable-cursor);
      flex-shrink: 0;
      font: inherit;
      /* Ensure minimum click target (WCAG) */
      padding: var(--vaadin-upload-file-button-padding, max(0px, (24px - var(--vaadin-icon-size, 1lh)) / 2));
    }

    button:focus-visible {
      outline: var(--vaadin-focus-ring-width) solid var(--vaadin-focus-ring-color);
    }

    [part='start-button']::before,
    [part='retry-button']::before,
    [part='remove-button']::before {
      background: currentColor;
      content: '\\2003' / '';
      display: flex;
      align-items: center;
      height: var(--vaadin-icon-size, 1lh);
      width: var(--vaadin-icon-size, 1lh);
    }

    [part='start-button']::before {
      mask-image: var(--_vaadin-icon-play);
    }

    [part='retry-button']::before {
      mask-image: var(--_vaadin-icon-refresh);
    }

    [part='remove-button']::before {
      mask-image: var(--_vaadin-icon-cross);
    }

    ::slotted([slot='progress']) {
      grid-column: 2 / -1;
      width: auto;
    }

    :host([complete]) ::slotted([slot='progress']),
    :host([error]) ::slotted([slot='progress']) {
      display: none;
    }

    /* THUMBNAILS VARIANT */

    :host([theme~='thumbnails']) {
      grid-template-columns: max-content 1fr max-content;
      align-items: center;
      background: var(--vaadin-background-container);
      padding: 0;
      contain: content;

      & [part] {
        grid-row: 1;
      }

      & [part='thumbnail'],
      & [part$='icon'] {
        grid-column: 1;
        align-self: stretch;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: 0.2s opacity linear;
        background: var(--vaadin-background-container-strong);
        padding: var(--vaadin-upload-file-padding, var(--vaadin-padding-s));
        contain: content;

        &[hidden] {
          opacity: 0;
        }
      }

      & [part='thumbnail'] > img {
        object-fit: cover;
        position: absolute;
        width: 100%;
        height: 100%;
      }

      & [part='loader']:not([hidden]) {
        place-self: center;
        display: flex;
      }

      & [part='done-icon']::before {
        background: var(--vaadin-upload-file-done-color, currentColor);
        mask-image: var(--_vaadin-icon-file);
      }

      & [part='meta'] {
        padding: var(--vaadin-upload-file-padding, var(--vaadin-padding-s));
        padding-inline: 0;
      }

      & [part='name'] {
        word-break: break-all;
      }

      & [part='commands'] {
        padding: var(--vaadin-upload-padding, var(--vaadin-padding-s));
        padding-inline-start: 0;
      }

      & [part='status'] {
        clip-path: inset(50%);
        width: 1px;
        height: 1px;
        margin: 0;
        overflow: hidden;
        position: absolute;
        white-space: nowrap;
      }

      & [part='error'] {
        font-size: 0.875em;
        line-height: 1.25;
      }

      & ::slotted([slot='progress']) {
        grid-row: auto;
        grid-column: auto;
        position: absolute;
        inset: 0;
        opacity: 0.3;
        pointer-events: none;
        --vaadin-progress-bar-height: auto;
        --vaadin-progress-bar-border-width: 0px;
        --vaadin-progress-bar-border-radius: 0px;
        --vaadin-progress-bar-background: transparent;
      }

      & ::slotted([slot='progress'][indeterminate]) {
        opacity: 0;
      }
    }

    :host([theme~='thumbnails']:not([complete])) [part='thumbnail'],
    :host([theme~='thumbnails'][complete]) [part='thumbnail']:not([hidden]) + [part='done-icon'] {
      display: none;
    }

    /* TODO: queued state styles (no attribute makes this difficult to target) */

    @media (forced-colors: active) {
      :is([part$='icon'], [part$='button'])::before {
        background: CanvasText;
      }
    }
  `
];
/**
 * @license
 * Copyright (c) 2016 - 2026 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const UploadFileMixin = (superClass) => class UploadFileMixin extends FocusMixin(superClass) {
  static get properties() {
    return {
      /**
       * If true, the user cannot interact with this element.
       */
      disabled: {
        type: Boolean,
        value: false,
        reflectToAttribute: true
      },
      /**
       * True if uploading is completed, false otherwise.
       */
      complete: {
        type: Boolean,
        value: false,
        reflectToAttribute: true
      },
      /**
       * Error message returned by the server, if any.
       */
      errorMessage: {
        type: String,
        value: "",
        observer: "_errorMessageChanged"
      },
      /**
       * The object representing a file.
       */
      file: {
        type: Object
      },
      /**
       * Name of the uploading file.
       */
      fileName: {
        type: String
      },
      /**
       * True if uploading is not started, false otherwise.
       */
      held: {
        type: Boolean,
        value: false
      },
      /**
       * True if remaining time is unknown, false otherwise.
       */
      indeterminate: {
        type: Boolean,
        value: false,
        reflectToAttribute: true
      },
      /**
       * The object used to localize this component.
       */
      i18n: {
        type: Object
      },
      /**
       * Number representing the uploading progress.
       */
      progress: {
        type: Number
      },
      /**
       * Uploading status.
       */
      status: {
        type: String
      },
      /**
       * Indicates whether the element can be focused and where it participates in sequential keyboard navigation.
       * @protected
       */
      tabindex: {
        type: Number,
        value: 0
      },
      /**
       * True if uploading is in progress, false otherwise.
       */
      uploading: {
        type: Boolean,
        value: false,
        reflectToAttribute: true
      },
      /** @private */
      _progress: {
        type: Object
      },
      /** @private */
      __thumbnail: {
        type: String
      }
    };
  }
  static get observers() {
    return [
      "__updateTabindex(tabindex, disabled)",
      "__updateProgress(_progress, progress, indeterminate)",
      "__updateThumbnail(file)"
    ];
  }
  /** @protected */
  ready() {
    super.ready();
    this.addController(
      new SlotController(this, "progress", "vaadin-progress-bar", {
        initializer: (progress) => {
          this._progress = progress;
        }
      })
    );
    this.shadowRoot.addEventListener("focusin", (e) => {
      const target = e.composedPath()[0];
      if (target.getAttribute("part").endsWith("button")) {
        this._setFocused(false);
      }
    });
    this.shadowRoot.addEventListener("focusout", (e) => {
      if (e.relatedTarget === this) {
        this._setFocused(true);
      }
    });
  }
  /**
   * Override method inherited from `FocusMixin` to mark the file as focused
   * only when the host is focused.
   * @param {Event} event
   * @return {boolean}
   * @protected
   */
  _shouldSetFocus(event) {
    return event.composedPath()[0] === this;
  }
  /** @private */
  __disabledChanged(disabled) {
    if (disabled) {
      this.removeAttribute("tabindex");
    } else {
      this.setAttribute("tabindex", this.tabindex);
    }
  }
  /** @private */
  _errorMessageChanged(errorMessage) {
    this.toggleAttribute("error", Boolean(errorMessage));
  }
  /** @private */
  __updateTabindex(tabindex, disabled) {
    if (disabled) {
      this.removeAttribute("tabindex");
    } else {
      this.setAttribute("tabindex", tabindex);
    }
  }
  /** @private */
  __updateProgress(progress, value, indeterminate) {
    if (progress) {
      progress.value = isNaN(value) ? 0 : value / 100;
      progress.indeterminate = indeterminate;
    }
  }
  /** @private */
  _fireFileEvent(e) {
    e.preventDefault();
    return this.dispatchEvent(
      new CustomEvent(e.target.getAttribute("file-event"), {
        detail: { file: this.file },
        bubbles: true,
        composed: true
      })
    );
  }
  /** @private */
  __updateThumbnail(file) {
    if (this.__thumbnailReader) {
      this.__thumbnailReader.abort();
      this.__thumbnailReader = null;
    }
    if (!file) {
      this.__thumbnail = "";
      return;
    }
    if (file.type && file.type.startsWith("image/") && file instanceof Blob) {
      const reader = new FileReader();
      this.__thumbnailReader = reader;
      reader.onload = (e) => {
        this.__thumbnail = e.target.result;
        this.__thumbnailReader = null;
      };
      reader.readAsDataURL(file);
    } else {
      this.__thumbnail = "";
    }
  }
};
/**
 * @license
 * Copyright (c) 2016 - 2026 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
class UploadFile extends UploadFileMixin(ThemableMixin(PolylitMixin(LumoInjectionMixin(LitElement)))) {
  static get is() {
    return "vaadin-upload-file";
  }
  static get styles() {
    return uploadFileStyles;
  }
  static get lumoInjector() {
    return { ...super.lumoInjector, includeBaseStyles: true };
  }
  /** @protected */
  render() {
    const isFileStartVisible = this.held && !this.uploading && !this.complete;
    const isFileRetryVisible = this.errorMessage;
    return html`
      <div part="loader" ?hidden="${!this.uploading}" aria-hidden="true"></div>

      ${this.__thumbnail ? html`<div part="thumbnail">
            <img src="${this.__thumbnail}" alt="${this.fileName}" />
          </div>` : nothing}

      <div part="done-icon" ?hidden="${!this.complete}" aria-hidden="true"></div>
      <div part="warning-icon" ?hidden="${!this.errorMessage}" aria-hidden="true"></div>

      <div part="meta">
        <div part="name" id="name">${this.fileName}</div>
        <div part="status" ?hidden="${!this.status}" id="status">${this.status}</div>
        <div part="error" id="error" ?hidden="${!this.errorMessage}">${this.errorMessage}</div>
      </div>

      <div part="commands">
        <button
          type="button"
          part="start-button"
          file-event="file-start"
          @click="${this._fireFileEvent}"
          ?hidden="${!isFileStartVisible}"
          ?disabled="${this.disabled}"
          aria-label="${this.i18n ? this.i18n.file.start : nothing}"
          aria-describedby="name"
        ></button>
        <button
          type="button"
          part="retry-button"
          file-event="file-retry"
          @click="${this._fireFileEvent}"
          ?hidden="${!isFileRetryVisible}"
          ?disabled="${this.disabled}"
          aria-label="${this.i18n ? this.i18n.file.retry : nothing}"
          aria-describedby="name"
        ></button>
        <button
          type="button"
          part="remove-button"
          file-event="file-abort"
          @click="${this._fireFileEvent}"
          ?disabled="${this.disabled}"
          aria-label="${this.i18n ? this.i18n.file.remove : nothing}"
          aria-describedby="name"
        ></button>
      </div>

      <slot name="progress"></slot>
    `;
  }
  /**
   * Fired when the retry button is pressed. It is listened by `vaadin-upload`
   * which will start a new upload process of this file.
   *
   * @event file-retry
   * @param {Object} detail
   * @param {Object} detail.file file to retry upload of
   */
  /**
   * Fired when the start button is pressed. It is listened by `vaadin-upload`
   * which will start a new upload process of this file.
   *
   * @event file-start
   * @param {Object} detail
   * @param {Object} detail.file file to start upload of
   */
  /**
   * Fired when abort button is pressed. It is listened by `vaadin-upload` which
   * will abort the upload in progress, and then remove the file from the list.
   *
   * @event file-abort
   * @param {Object} detail
   * @param {Object} detail.file file to abort upload of
   */
}
defineCustomElement(UploadFile);
/**
 * @license
 * Copyright (c) 2016 - 2026 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const uploadFileListStyles = css`
  :host {
    display: block;
    overflow: auto;
  }

  :host([hidden]) {
    display: none !important;
  }

  [part='list'] {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }

  ::slotted(:first-child) {
    margin-top: var(--vaadin-upload-gap, var(--vaadin-gap-s));
  }

  ::slotted(li:not(:last-of-type)) {
    border-bottom: var(--vaadin-upload-file-list-divider-width, 1px) solid
      var(--vaadin-upload-file-list-divider-color, var(--vaadin-border-color-secondary));
  }

  /* Thumbnails theme variant */
  :host([theme~='thumbnails']) [part='list'] {
    display: flex;
    flex-wrap: wrap;
    gap: var(--vaadin-gap-s);
  }

  :host([theme~='thumbnails']) ::slotted(:first-child) {
    margin-top: 0;
  }

  :host([theme~='thumbnails']) ::slotted(li) {
    border-bottom: none;
  }
`;
/**
 * @license
 * Copyright (c) 2000 - 2026 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
window.Vaadin = window.Vaadin || {};
window.Vaadin.featureFlags = window.Vaadin.featureFlags || {};
class UploadManager extends EventTarget {
  /** @type {Array<UploadFile>} */
  #files = [];
  /** @type {boolean} */
  #maxFilesReached = false;
  /** @type {boolean} */
  #disabled = false;
  /** @type {Array<UploadFile>} */
  #uploadQueue = [];
  /** @type {number} */
  #activeUploads = 0;
  /** @type {string} */
  #method = "POST";
  /** @type {number} */
  #maxFiles = Infinity;
  /** @type {number} */
  #maxConcurrentUploads = 3;
  /** @type {Record<string, string>} */
  #headers = {};
  /**
   * Create an UploadManager instance.
   * @param {Object} options - Configuration options
   * @param {string} [options.target=''] - The server URL. The default value is an empty string, which means that _window.location_ will be used.
   * @param {string} [options.method='POST'] - HTTP Method used to send the files. Only POST and PUT are allowed.
   * @param {Object} [options.headers={}] - Key-Value map to send to the server.
   * @param {number} [options.timeout=0] - Max time in milliseconds for the entire upload process, if exceeded the request will be aborted. Zero means that there is no timeout.
   * @param {number} [options.maxFiles=Infinity] - Limit of files to upload, by default it is unlimited. If the value is set to one, native file browser will prevent selecting multiple files.
   * @param {number} [options.maxFileSize=Infinity] - Specifies the maximum file size in bytes allowed to upload. Notice that it is a client-side constraint, which will be checked before sending the request. Obviously you need to do the same validation in the server-side and be sure that they are aligned.
   * @param {string} [options.accept=''] - Specifies the types of files that the server accepts. Syntax: a comma-separated list of MIME type patterns (wildcards are allowed) or file extensions. Notice that MIME types are widely supported, while file extensions are only implemented in certain browsers, so avoid using it. Example: accept="video/*,image/tiff" or accept=".pdf,audio/mp3"
   * @param {boolean} [options.noAuto=false] - Prevents upload(s) from immediately uploading upon adding file(s). When set, you must manually trigger uploads using the `uploadFiles` method.
   * @param {boolean} [options.withCredentials=false] - Set the withCredentials flag on the request.
   * @param {string} [options.uploadFormat='raw'] - Specifies the upload format to use when sending files to the server. 'raw': Send file as raw binary data with the file's MIME type as Content-Type (default). 'multipart': Send file using multipart/form-data encoding.
   * @param {number} [options.maxConcurrentUploads=3] - Specifies the maximum number of files that can be uploaded simultaneously. This helps prevent browser performance degradation and XHR limitations when uploading large numbers of files. Files exceeding this limit will be queued and uploaded as active uploads complete.
   * @param {string} [options.formDataName='file'] - Specifies the 'name' property at Content-Disposition for multipart uploads. This property is ignored when uploadFormat is 'raw'.
   * @param {boolean} [options.disabled=false] - Whether the upload manager is disabled. When true, connected components (upload-button, upload-drop-zone) will be automatically disabled.
   */
  constructor(options = {}) {
    super();
    if (!window.Vaadin.featureFlags.modularUpload && !window.Vaadin.featureFlags.aiComponents) {
      throw new Error(
        "UploadManager requires the modularUpload feature flag. Enable it with: window.Vaadin.featureFlags.modularUpload = true"
      );
    }
    this.target = options.target || "";
    this.method = options.method || "POST";
    this.headers = options.headers || {};
    this.timeout = options.timeout || 0;
    this.maxFiles = options.maxFiles === void 0 ? Infinity : options.maxFiles;
    this.maxFileSize = options.maxFileSize === void 0 ? Infinity : options.maxFileSize;
    this.accept = options.accept || "";
    this.noAuto = options.noAuto === void 0 ? false : options.noAuto;
    this.withCredentials = options.withCredentials === void 0 ? false : options.withCredentials;
    this.uploadFormat = options.uploadFormat || "raw";
    this.maxConcurrentUploads = options.maxConcurrentUploads === void 0 ? 3 : options.maxConcurrentUploads;
    this.formDataName = options.formDataName || "file";
    this.disabled = options.disabled === void 0 ? false : options.disabled;
  }
  /**
   * HTTP Method used to send the files. Only POST and PUT are allowed.
   * @type {string}
   */
  get method() {
    return this.#method;
  }
  set method(value) {
    if (value !== "POST" && value !== "PUT") {
      throw new Error(`Invalid method "${value}". Only POST and PUT are allowed.`);
    }
    this.#method = value;
  }
  /**
   * Limit of files to upload, by default it is unlimited.
   * @type {number}
   */
  get maxFiles() {
    return this.#maxFiles;
  }
  set maxFiles(value) {
    if (value < 0) {
      throw new Error(`Invalid maxFiles "${value}". Value must be non-negative.`);
    }
    this.#maxFiles = value;
    this.#updateMaxFilesReached();
  }
  /**
   * Maximum number of files that can be uploaded simultaneously.
   * @type {number}
   */
  get maxConcurrentUploads() {
    return this.#maxConcurrentUploads;
  }
  set maxConcurrentUploads(value) {
    if (value <= 0) {
      throw new Error(`Invalid maxConcurrentUploads "${value}". Value must be positive.`);
    }
    this.#maxConcurrentUploads = value;
  }
  /**
   * Key-Value map to send to the server.
   * @type {Record<string, string>}
   */
  get headers() {
    return this.#headers;
  }
  set headers(value) {
    this.#headers = { ...value };
  }
  /**
   * The array of files being processed, or already uploaded.
   *
   * Each element is a [`File`](https://developer.mozilla.org/en-US/docs/Web/API/File)
   * object with a number of extra properties to track the upload process:
   * - `uploadTarget`: The target URL used to upload this file.
   * - `elapsed`: Elapsed time since the upload started.
   * - `remaining`: Number of seconds remaining for the upload to finish.
   * - `progress`: Percentage of the file already uploaded.
   * - `speed`: Upload speed in kB/s.
   * - `size`: File size in bytes.
   * - `total`: The total size of the data being transmitted or processed
   * - `loaded`: Bytes transferred so far.
   * - `status`: Status of the upload process.
   * - `errorKey`: Error key in case the upload failed.
   * - `abort`: True if the file was canceled by the user.
   * - `complete`: True when the file was transferred to the server.
   * - `uploading`: True while transferring data to the server.
   *
   * **Note:** The getter returns a shallow copy of the internal array to prevent
   * external mutation. Modifying the returned array will not affect the manager's state.
   *
   * **Note:** The setter validates files against maxFiles, maxFileSize, and accept constraints.
   * Files that fail validation will be rejected with a 'file-reject' event.
   * @type {Array<UploadFile>}
   */
  get files() {
    return [...this.#files];
  }
  set files(value) {
    const validFiles = [];
    for (const file of value) {
      if (this.#files.includes(file)) {
        validFiles.push(file);
        continue;
      }
      const error = this.#validateFile(file, validFiles.length);
      if (error) {
        this.dispatchEvent(
          new CustomEvent("file-reject", {
            detail: { file, error }
          })
        );
        continue;
      }
      validFiles.push(file);
    }
    this.#setFiles(validFiles);
  }
  // Internal setter - bypasses validation for internal use only
  #setFiles(value) {
    this.#files = value;
    this.#updateMaxFilesReached();
    this.#notifyFilesChanged();
  }
  /**
   * Specifies if the maximum number of files have been uploaded.
   * @type {boolean}
   * @readonly
   */
  get maxFilesReached() {
    return this.#maxFilesReached;
  }
  /**
   * Whether the upload manager is disabled.
   * When true, connected components (upload-button, upload-drop-zone) will be automatically disabled.
   * @type {boolean}
   */
  get disabled() {
    return this.#disabled;
  }
  set disabled(value) {
    const disabled = Boolean(value);
    if (disabled !== this.#disabled) {
      this.#disabled = disabled;
      this.dispatchEvent(
        new CustomEvent("disabled-changed", {
          detail: { value: disabled }
        })
      );
    }
  }
  /**
   * Add files to the upload list.
   * @param {FileList|File[]} files - Files to add
   */
  addFiles(files) {
    Array.from(files).forEach((file) => this.#addFile(file));
  }
  /**
   * Triggers the upload of any files that are not completed.
   *
   * @param {UploadFile|UploadFile[]} [files] - Files being uploaded. Defaults to all outstanding files.
   */
  uploadFiles(files = this.#files) {
    if (files && !Array.isArray(files)) {
      files = [files];
    }
    files.filter((file) => this.#files.includes(file) && !file.complete).forEach((file) => this.#queueFileUpload(file));
  }
  /**
   * Retry a failed upload.
   * @param {UploadFile} file - The file to retry
   */
  retryUpload(file) {
    this.#retryFileUpload(file);
  }
  /**
   * Abort an upload.
   * @param {UploadFile} file - The file to abort
   */
  abortUpload(file) {
    this.#abortFileUpload(file);
  }
  /**
   * Remove a file from the list.
   * @param {UploadFile} file - The file to remove
   */
  removeFile(file) {
    this.#removeFile(file);
  }
  // ============ Private methods ============
  get #acceptRegexp() {
    if (!this.accept) {
      return null;
    }
    const processedTokens = this.accept.split(",").map((token) => {
      let processedToken = token.trim();
      processedToken = processedToken.replaceAll(/[+.]/gu, String.raw`\$&`);
      if (processedToken.startsWith(String.raw`\.`)) {
        processedToken = `.*${processedToken}$`;
      }
      return processedToken.replaceAll("/*", "/.*");
    });
    return new RegExp(`^(${processedTokens.join("|")})$`, "iu");
  }
  #updateMaxFilesReached() {
    const reached = this.maxFiles >= 0 && this.#files.length >= this.maxFiles;
    if (reached !== this.#maxFilesReached) {
      this.#maxFilesReached = reached;
      this.dispatchEvent(
        new CustomEvent("max-files-reached-changed", {
          detail: { value: reached }
        })
      );
    }
  }
  /**
   * Validates a file against constraints.
   * @param {File} file - The file to validate
   * @param {number} currentCount - Current number of files (for maxFiles check)
   * @returns {string|null} Error code if invalid, null if valid
   */
  #validateFile(file, currentCount) {
    if (currentCount >= this.maxFiles) {
      return "tooManyFiles";
    }
    if (this.maxFileSize >= 0 && file.size > this.maxFileSize) {
      return "fileIsTooBig";
    }
    const re2 = this.#acceptRegexp;
    if (re2 && !(re2.test(file.type) || re2.test(file.name))) {
      return "incorrectFileType";
    }
    return null;
  }
  #addFile(file) {
    const error = this.#validateFile(file, this.#files.length);
    if (error) {
      this.dispatchEvent(
        new CustomEvent("file-reject", {
          detail: { file, error }
        })
      );
      return;
    }
    file.loaded = 0;
    file.held = true;
    file.formDataName = this.formDataName;
    this.#setFiles([file, ...this.#files]);
    if (!this.noAuto) {
      this.#queueFileUpload(file);
    }
  }
  #removeFile(file) {
    this.#uploadQueue = this.#uploadQueue.filter((f) => f !== file);
    if (file.uploading && !file.held && !file.abort && file.xhr) {
      file.abort = true;
      file.xhr.abort();
    }
    const fileIndex = this.#files.indexOf(file);
    if (fileIndex >= 0) {
      this.#setFiles(this.#files.filter((f) => f !== file));
      this.dispatchEvent(
        new CustomEvent("file-remove", {
          detail: { file, fileIndex }
        })
      );
    }
  }
  #queueFileUpload(file) {
    if (file.uploading) {
      return;
    }
    if (this.#uploadQueue.includes(file)) {
      return;
    }
    file.loaded = 0;
    file.progress = 0;
    file.held = true;
    file.uploading = file.indeterminate = true;
    file.complete = file.abort = file.errorKey = false;
    file.stalled = false;
    this.#notifyFilesChanged();
    this.#uploadQueue.push(file);
    this.#processUploadQueue();
  }
  #processUploadQueue() {
    while (this.#uploadQueue.length > 0 && this.#activeUploads < this.maxConcurrentUploads) {
      const nextFile = this.#uploadQueue.shift();
      if (nextFile) {
        this.#uploadFile(nextFile);
      }
    }
  }
  #uploadFile(file) {
    this.#activeUploads += 1;
    const ini = Date.now();
    const xhr = file.xhr = this._createXhr();
    let stalledId;
    xhr.upload.onprogress = (e) => {
      clearTimeout(stalledId);
      const elapsed = (Date.now() - ini) / 1e3;
      const loaded = e.loaded;
      const total = e.total;
      const rawProgress = total > 0 ? Math.trunc(loaded / total * 100) : 100;
      const progress = Math.max(0, Math.min(100, rawProgress));
      file.loaded = loaded;
      file.progress = progress;
      file.indeterminate = total > 0 ? loaded <= 0 || loaded >= total : false;
      if (file.stalled) {
        file.stalled = false;
      }
      if (file.errorKey) {
        file.indeterminate = file.status = void 0;
      } else if (!file.abort) {
        if (progress < 100) {
          this.#setStatus(file, total, loaded, elapsed);
          stalledId = setTimeout(() => {
            if (file.uploading && !file.abort) {
              file.stalled = true;
              this.#notifyFilesChanged();
            }
          }, 2e3);
        }
      }
      this.#notifyFilesChanged();
      this.dispatchEvent(new CustomEvent("upload-progress", { detail: { file, xhr } }));
    };
    xhr.onabort = () => {
      clearTimeout(stalledId);
      this.#activeUploads -= 1;
      this.#cleanupXhr(xhr);
      this.#processUploadQueue();
    };
    xhr.ontimeout = () => {
      clearTimeout(stalledId);
      file.indeterminate = file.uploading = false;
      file.errorKey = "timeout";
      file.status = "";
      this.#activeUploads -= 1;
      this.#processUploadQueue();
      this.#cleanupXhr(xhr);
      this.dispatchEvent(new CustomEvent("upload-error", { detail: { file, xhr } }));
      this.#notifyFilesChanged();
    };
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        clearTimeout(stalledId);
        file.indeterminate = file.uploading = false;
        this.#activeUploads -= 1;
        this.#processUploadQueue();
        this.#cleanupXhr(xhr);
        if (file.abort || file.errorKey) {
          return;
        }
        file.status = "";
        const evt2 = this.dispatchEvent(
          new CustomEvent("upload-response", {
            detail: { file, xhr },
            cancelable: true
          })
        );
        if (!evt2) {
          return;
        }
        if (xhr.status === 0) {
          file.errorKey = "serverUnavailable";
        } else if (xhr.status >= 500) {
          file.errorKey = "unexpectedServerError";
        } else if (xhr.status === 413) {
          file.errorKey = "fileTooLarge";
        } else if (xhr.status >= 400) {
          file.errorKey = "forbidden";
        }
        file.complete = !file.errorKey;
        const eventName = file.errorKey ? "upload-error" : "upload-success";
        this.dispatchEvent(new CustomEvent(eventName, { detail: { file, xhr } }));
        file.xhr = null;
        this.#notifyFilesChanged();
      }
    };
    const isRawUpload = this.uploadFormat === "raw";
    if (!file.uploadTarget) {
      file.uploadTarget = this.target;
    }
    const evt = this.dispatchEvent(
      new CustomEvent("upload-before", {
        detail: { file, xhr },
        cancelable: true
      })
    );
    if (!evt) {
      this.#holdFile(file);
      return;
    }
    if (!this.#files.includes(file)) {
      if (!file.abort) {
        this.#activeUploads -= 1;
      }
      this.#cleanupXhr(xhr);
      this.#processUploadQueue();
      return;
    }
    let requestBody;
    if (isRawUpload) {
      requestBody = file;
    } else {
      const formData = new FormData();
      formData.append(file.formDataName || this.formDataName, file, file.name);
      requestBody = formData;
    }
    xhr.open(this.method, file.uploadTarget, true);
    this.#configureXhr(xhr, file, isRawUpload);
    file.held = false;
    xhr.upload.onloadstart = () => {
      this.dispatchEvent(
        new CustomEvent("upload-start", {
          detail: { file, xhr }
        })
      );
      this.#notifyFilesChanged();
    };
    const eventDetail = {
      file,
      xhr,
      uploadFormat: this.uploadFormat,
      requestBody
    };
    if (!isRawUpload) {
      eventDetail.formData = requestBody;
    }
    const uploadEvt = this.dispatchEvent(
      new CustomEvent("upload-request", {
        detail: eventDetail,
        cancelable: true
      })
    );
    if (!uploadEvt) {
      this.#holdFile(file);
      return;
    }
    if (!this.#files.includes(file)) {
      if (!file.abort) {
        this.#activeUploads -= 1;
      }
      this.#cleanupXhr(xhr);
      this.#processUploadQueue();
      return;
    }
    try {
      xhr.send(requestBody);
    } catch (e) {
      this.#activeUploads -= 1;
      file.uploading = false;
      file.indeterminate = false;
      file.errorKey = e.message || "sendFailed";
      this.#cleanupXhr(xhr);
      this.#notifyFilesChanged();
      this.#processUploadQueue();
    }
  }
  /**
   * Creates an XMLHttpRequest instance. Override in tests to mock XHR behavior.
   * @private
   */
  _createXhr() {
    return new XMLHttpRequest();
  }
  /**
   * Reset file state when upload is prevented.
   */
  #holdFile(file) {
    this.#activeUploads -= 1;
    file.uploading = false;
    file.indeterminate = false;
    file.held = true;
    this.#notifyFilesChanged();
    this.#processUploadQueue();
  }
  /**
   * Clean up XHR handlers to prevent memory leaks
   */
  #cleanupXhr(xhr) {
    if (xhr) {
      xhr.upload.onprogress = null;
      xhr.upload.onloadstart = null;
      xhr.onreadystatechange = null;
      xhr.onabort = null;
      xhr.ontimeout = null;
    }
  }
  #configureXhr(xhr, file, isRawUpload) {
    Object.entries(this.headers).forEach(([key, value]) => {
      xhr.setRequestHeader(key, value);
    });
    if (isRawUpload) {
      xhr.setRequestHeader("Content-Type", file.type || "application/octet-stream");
      xhr.setRequestHeader("X-Filename", encodeURIComponent(file.name));
    }
    if (this.timeout) {
      xhr.timeout = this.timeout;
    }
    xhr.withCredentials = this.withCredentials;
  }
  #retryFileUpload(file) {
    const evt = this.dispatchEvent(
      new CustomEvent("upload-retry", {
        detail: { file, xhr: file.xhr },
        cancelable: true
      })
    );
    if (evt) {
      file.uploading = false;
      this.#uploadQueue = this.#uploadQueue.filter((f) => f !== file);
      this.#queueFileUpload(file);
    }
  }
  #abortFileUpload(file) {
    const evt = this.dispatchEvent(
      new CustomEvent("upload-abort", {
        detail: { file, xhr: file.xhr },
        cancelable: true
      })
    );
    if (evt) {
      file.abort = true;
      if (file.xhr) {
        file.xhr.abort();
      }
      this.#removeFile(file);
    }
  }
  #setStatus(file, total, loaded, elapsed) {
    file.elapsed = elapsed;
    file.remaining = loaded > 0 ? Math.ceil(elapsed * (total / loaded - 1)) : 0;
    file.speed = elapsed > 0 ? Math.trunc(loaded / elapsed / 1024) : 0;
    file.total = total;
  }
  #notifyFilesChanged() {
    this.dispatchEvent(
      new CustomEvent("files-changed", {
        detail: { value: this.#files }
      })
    );
  }
}
/**
 * @license
 * Copyright (c) 2016 - 2026 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const DEFAULT_I18N$1 = {
  file: {
    retry: "Retry",
    start: "Start",
    remove: "Remove"
  },
  error: {
    tooManyFiles: "Too Many Files.",
    fileIsTooBig: "File is Too Big.",
    incorrectFileType: "Incorrect File Type."
  },
  uploading: {
    status: {
      connecting: "Connecting...",
      stalled: "Stalled",
      processing: "Processing File...",
      held: "Queued"
    },
    remainingTime: {
      prefix: "remaining time: ",
      unknown: "unknown remaining time"
    },
    error: {
      serverUnavailable: "Upload failed, please try again later",
      unexpectedServerError: "Upload failed due to server error",
      forbidden: "Upload forbidden",
      fileTooLarge: "File is too large"
    }
  },
  units: {
    size: ["B", "kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]
  }
};
const UploadFileListMixin = (superClass) => class UploadFileListMixin extends I18nMixin(DEFAULT_I18N$1, superClass) {
  static get properties() {
    return {
      /**
       * The array of files being processed, or already uploaded.
       * @readonly
       */
      items: {
        type: Array
      },
      /**
       * If true, the user cannot interact with this element.
       */
      disabled: {
        type: Boolean,
        value: false,
        reflectToAttribute: true
      },
      /**
       * Reference to an UploadManager to link this file list to.
       * When set, the file list automatically:
       * - Syncs files from the manager
       * - Forwards retry/abort/start/remove events back to the manager
       * @type {Object | null}
       */
      manager: {
        type: Object,
        value: null,
        observer: "__managerChanged"
      }
    };
  }
  static get observers() {
    return ["__updateItems(items, __effectiveI18n, disabled, _theme)"];
  }
  constructor() {
    super();
    this.__onManagerFilesChanged = this.__onManagerFilesChanged.bind(this);
    this.__onManagerDisabledChanged = this.__onManagerDisabledChanged.bind(this);
    this.__onFileRetry = this.__onFileRetry.bind(this);
    this.__onFileAbort = this.__onFileAbort.bind(this);
    this.__onFileStart = this.__onFileStart.bind(this);
    this.__onFileRemove = this.__onFileRemove.bind(this);
  }
  /** @protected */
  ready() {
    super.ready();
    this.addEventListener("file-retry", this.__onFileRetry);
    this.addEventListener("file-abort", this.__onFileAbort);
    this.addEventListener("file-start", this.__onFileStart);
    this.addEventListener("file-remove", this.__onFileRemove);
  }
  /** @protected */
  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.manager instanceof UploadManager) {
      this.manager.removeEventListener("files-changed", this.__onManagerFilesChanged);
      this.manager.removeEventListener("disabled-changed", this.__onManagerDisabledChanged);
    }
  }
  /** @protected */
  connectedCallback() {
    super.connectedCallback();
    if (this.manager instanceof UploadManager) {
      this.manager.addEventListener("files-changed", this.__onManagerFilesChanged);
      this.manager.addEventListener("disabled-changed", this.__onManagerDisabledChanged);
      this.__syncFromManager();
    }
  }
  /** @private */
  __managerChanged(manager, oldManager) {
    if (oldManager instanceof UploadManager) {
      oldManager.removeEventListener("files-changed", this.__onManagerFilesChanged);
      oldManager.removeEventListener("disabled-changed", this.__onManagerDisabledChanged);
    }
    if (this.isConnected && manager instanceof UploadManager) {
      manager.addEventListener("files-changed", this.__onManagerFilesChanged);
      manager.addEventListener("disabled-changed", this.__onManagerDisabledChanged);
      this.__syncFromManager();
    } else {
      this.items = [];
    }
  }
  /** @private */
  __onManagerFilesChanged() {
    this.__syncFromManager();
  }
  /** @private */
  __onManagerDisabledChanged() {
    this.requestContentUpdate();
  }
  /** @private */
  __syncFromManager() {
    if (this.manager instanceof UploadManager) {
      this.items = [...this.manager.files];
    }
  }
  /** @private */
  __onFileRetry(event) {
    if (this.manager instanceof UploadManager) {
      event.stopPropagation();
      this.manager.retryUpload(event.detail.file);
    }
  }
  /** @private */
  __onFileAbort(event) {
    if (this.manager instanceof UploadManager) {
      event.stopPropagation();
      this.manager.abortUpload(event.detail.file);
    }
  }
  /** @private */
  __onFileStart(event) {
    if (this.manager instanceof UploadManager) {
      event.stopPropagation();
      this.manager.uploadFiles(event.detail.file);
    }
  }
  /** @private */
  __onFileRemove(event) {
    if (this.manager instanceof UploadManager) {
      event.stopPropagation();
      this.manager.removeFile(event.detail.file);
    }
  }
  /** @private */
  __updateItems(items, i18n, _disabled, _theme) {
    if (items && i18n) {
      items.forEach((file) => this.__applyI18nToFile(file));
      this.requestContentUpdate();
    }
  }
  /** @private */
  __applyI18nToFile(file) {
    const i18n = this.__effectiveI18n;
    if (file.total) {
      this.__applyFileSizeStrings(file);
    }
    file.status = this.__getFileStatus(file, i18n);
    this.__applyFileError(file, i18n);
  }
  /** @private */
  __applyFileSizeStrings(file) {
    file.totalStr = this.__formatSize(file.total);
    file.loadedStr = this.__formatSize(file.loaded || 0);
    if (file.elapsed != null) {
      file.elapsedStr = this.__formatTime(file.elapsed, this.__splitTimeByUnits(file.elapsed));
    }
    if (file.remaining != null) {
      file.remainingStr = this.__formatTime(file.remaining, this.__splitTimeByUnits(file.remaining));
    }
  }
  /** @private */
  __getFileStatus(file, i18n) {
    if (file.held && !file.error) {
      return i18n.uploading.status.held;
    }
    if (file.stalled) {
      return i18n.uploading.status.stalled;
    }
    if (file.uploading && file.indeterminate && !file.held) {
      return file.progress === 100 ? i18n.uploading.status.processing : i18n.uploading.status.connecting;
    }
    if (file.uploading && file.progress < 100 && file.total) {
      return this.__formatFileProgress(file);
    }
    return file.status;
  }
  /** @private */
  __applyFileError(file, i18n) {
    if (file.errorKey && i18n.uploading.error[file.errorKey]) {
      file.error = i18n.uploading.error[file.errorKey];
    } else if (!file.errorKey && this.manager instanceof UploadManager) {
      file.error = "";
    }
  }
  /** @private */
  __formatSize(bytes) {
    const i18n = this.__effectiveI18n;
    if (typeof i18n.formatSize === "function") {
      return i18n.formatSize(bytes);
    }
    const base = i18n.units.sizeBase || 1e3;
    const unit = Math.trunc(Math.log(bytes) / Math.log(base));
    const dec = Math.max(0, Math.min(3, unit - 1));
    const size = Number.parseFloat((bytes / base ** unit).toFixed(dec));
    return `${size} ${i18n.units.size[unit]}`;
  }
  /** @private */
  __splitTimeByUnits(time) {
    const unitSizes = [60, 60, 24, Infinity];
    const timeValues = [0];
    for (let i = 0; i < unitSizes.length && time > 0; i++) {
      timeValues[i] = time % unitSizes[i];
      time = Math.floor(time / unitSizes[i]);
    }
    return timeValues;
  }
  /** @private */
  __formatTime(seconds, split) {
    const i18n = this.__effectiveI18n;
    if (typeof i18n.formatTime === "function") {
      return i18n.formatTime(seconds, split);
    }
    while (split.length < 3) {
      split.push(0);
    }
    return split.reverse().map((number) => {
      return (number < 10 ? "0" : "") + number;
    }).join(":");
  }
  /** @private */
  __formatFileProgress(file) {
    const i18n = this.__effectiveI18n;
    const remainingTime = file.loaded > 0 ? i18n.uploading.remainingTime.prefix + file.remainingStr : i18n.uploading.remainingTime.unknown;
    return `${file.totalStr}: ${file.progress}% (${remainingTime})`;
  }
  /** @private */
  requestContentUpdate() {
    const { items, __effectiveI18n: i18n, disabled } = this;
    const managerDisabled = this.manager instanceof UploadManager && this.manager.disabled;
    const effectiveDisabled = disabled || managerDisabled;
    render(
      html`
          ${items.map(
        (file) => html`
              <li>
                <vaadin-upload-file
                  .disabled="${effectiveDisabled}"
                  .file="${file}"
                  .complete="${file.complete}"
                  .errorMessage="${file.error}"
                  .fileName="${file.name}"
                  .held="${file.held}"
                  .indeterminate="${file.indeterminate}"
                  .progress="${file.progress}"
                  .status="${file.status}"
                  .uploading="${file.uploading}"
                  .i18n="${i18n}"
                  theme="${ifDefined(
          window.Vaadin.featureFlags.modularUpload || window.Vaadin.featureFlags.aiComponents ? this._theme : void 0
        )}"
                ></vaadin-upload-file>
              </li>
            `
      )}
        `,
      this
    );
  }
};
/**
 * @license
 * Copyright (c) 2016 - 2026 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
class UploadFileList extends UploadFileListMixin(ThemableMixin(PolylitMixin(LitElement))) {
  static get is() {
    return "vaadin-upload-file-list";
  }
  static get styles() {
    return uploadFileListStyles;
  }
  /** @protected */
  render() {
    return html`
      <ul part="list">
        <slot></slot>
      </ul>
    `;
  }
}
defineCustomElement(UploadFileList);
/**
 * @license
 * Copyright (c) 2016 - 2026 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const uploadStyles = css`
  :host {
    background: var(--vaadin-upload-background, transparent);
    border: var(--vaadin-upload-border-width, 1px) solid
      var(--vaadin-upload-border-color, var(--vaadin-border-color-secondary));
    border-radius: var(--vaadin-upload-border-radius, var(--vaadin-radius-m));
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    padding: var(--vaadin-upload-padding, var(--vaadin-padding-s));
    position: relative;
  }

  :host([dragover-valid]) {
    --vaadin-upload-background: var(--vaadin-background-container);
    --vaadin-upload-border-color: var(--vaadin-text-color);
    border-style: dashed;
  }

  :host([hidden]) {
    display: none !important;
  }

  [hidden] {
    display: none !important;
  }

  [part='primary-buttons'] {
    align-items: center;
    display: flex;
    gap: var(--vaadin-gap-s);
  }

  [part='drop-label'] {
    align-items: center;
    color: var(--vaadin-upload-drop-label-color, var(--vaadin-text-color));
    display: flex;
    font-size: var(--vaadin-upload-drop-label-font-size, inherit);
    font-weight: var(--vaadin-upload-drop-label-font-weight, inherit);
    gap: var(--vaadin-upload-drop-label-gap, var(--vaadin-gap-s));
    line-height: var(--vaadin-upload-drop-label-line-height, inherit);
  }
`;
/**
 * @license
 * Copyright (c) 2000 - 2026 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
function getFilesFromDropEvent(dropEvent) {
  async function getFilesFromEntry(entry) {
    if (entry.isFile) {
      return new Promise((resolve) => {
        entry.file(resolve, () => resolve([]));
      });
    } else if (entry.isDirectory) {
      const reader = entry.createReader();
      const entries = await new Promise((resolve) => {
        reader.readEntries(resolve, () => resolve([]));
      });
      const files = await Promise.all(entries.map(getFilesFromEntry));
      return files.flat();
    }
  }
  const containsFolders = Array.from(dropEvent.dataTransfer.items).filter((item) => !!item).filter((item) => typeof item.webkitGetAsEntry === "function").map((item) => item.webkitGetAsEntry()).some((entry) => !!entry && entry.isDirectory);
  if (!containsFolders) {
    return Promise.resolve(dropEvent.dataTransfer.files ? Array.from(dropEvent.dataTransfer.files) : []);
  }
  const filePromises = Array.from(dropEvent.dataTransfer.items).map((item) => item.webkitGetAsEntry()).filter((entry) => !!entry).map(getFilesFromEntry);
  return Promise.all(filePromises).then((files) => files.flat());
}
/**
 * @license
 * Copyright (c) 2016 - 2026 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const DEFAULT_I18N = {
  dropFiles: {
    one: "Drop file here",
    many: "Drop files here"
  },
  addFiles: {
    one: "Upload File...",
    many: "Upload Files..."
  },
  error: {
    tooManyFiles: "Too Many Files.",
    fileIsTooBig: "File is Too Big.",
    incorrectFileType: "Incorrect File Type."
  },
  uploading: {
    status: {
      connecting: "Connecting...",
      stalled: "Stalled",
      processing: "Processing File...",
      held: "Queued"
    },
    remainingTime: {
      prefix: "remaining time: ",
      unknown: "unknown remaining time"
    },
    error: {
      serverUnavailable: "Upload failed, please try again later",
      unexpectedServerError: "Upload failed due to server error",
      forbidden: "Upload forbidden",
      fileTooLarge: "File is too large"
    }
  },
  file: {
    retry: "Retry",
    start: "Start",
    remove: "Remove"
  },
  units: {
    size: ["B", "kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]
  }
};
class AddButtonController extends SlotController {
  constructor(host) {
    super(host, "add-button", "vaadin-button");
  }
  /**
   * Override method inherited from `SlotController`
   * to add listeners to default and custom node.
   *
   * @param {Node} node
   * @protected
   * @override
   */
  initNode(node) {
    if (node._isDefault) {
      this.defaultNode = node;
    }
    node.addEventListener("touchend", (e) => {
      this.host._onAddFilesTouchEnd(e);
    });
    node.addEventListener("click", (e) => {
      this.host._onAddFilesClick(e);
    });
    this.host._addButton = node;
  }
}
class DropLabelController extends SlotController {
  constructor(host) {
    super(host, "drop-label", "span");
  }
  /**
   * Override method inherited from `SlotController`
   * to add listeners to default and custom node.
   *
   * @param {Node} node
   * @protected
   * @override
   */
  initNode(node) {
    if (node._isDefault) {
      this.defaultNode = node;
    }
    this.host._dropLabel = node;
  }
}
const UploadMixin = (superClass) => class UploadMixin extends I18nMixin(DEFAULT_I18N, superClass) {
  static get properties() {
    return {
      /**
       * If true, the user cannot interact with this element.
       */
      disabled: {
        type: Boolean,
        value: false,
        reflectToAttribute: true
      },
      /**
       * Define whether the element supports dropping files on it for uploading.
       * By default it's enabled in desktop and disabled in touch devices
       * because mobile devices do not support drag events in general. Setting
       * it false means that drop is enabled even in touch-devices, and true
       * disables drop in all devices.
       *
       * @default true in touch-devices, false otherwise.
       */
      nodrop: {
        type: Boolean,
        reflectToAttribute: true,
        value: isTouch
      },
      /**
       * The server URL. The default value is an empty string, which means that
       * _window.location_ will be used.
       */
      target: {
        type: String,
        value: ""
      },
      /**
       * HTTP Method used to send the files. Only POST and PUT are allowed.
       */
      method: {
        type: String,
        value: "POST"
      },
      /**
       * Key-Value map to send to the server. If you set this property as an
       * attribute, use a valid JSON string, for example:
       * ```html
       * <vaadin-upload headers='{"X-Foo": "Bar"}'></vaadin-upload>
       * ```
       * @type {object | string}
       */
      headers: {
        type: Object,
        value: {}
      },
      /**
       * Max time in milliseconds for the entire upload process, if exceeded the
       * request will be aborted. Zero means that there is no timeout.
       */
      timeout: {
        type: Number,
        value: 0
      },
      /** @private */
      _dragover: {
        type: Boolean,
        value: false,
        observer: "_dragoverChanged"
      },
      /**
       * The array of files being processed, or already uploaded.
       *
       * Each element is a [`File`](https://developer.mozilla.org/en-US/docs/Web/API/File)
       * object with a number of extra properties  to track the upload process:
       * - `uploadTarget`: The target URL used to upload this file.
       * - `elapsed`: Elapsed time since the upload started.
       * - `elapsedStr`: Human-readable elapsed time.
       * - `remaining`: Number of seconds remaining for the upload to finish.
       * - `remainingStr`: Human-readable remaining time for the upload to finish.
       * - `progress`: Percentage of the file already uploaded.
       * - `speed`: Upload speed in kB/s.
       * - `size`: File size in bytes.
       * - `totalStr`: Human-readable total size of the file.
       * - `loaded`: Bytes transferred so far.
       * - `loadedStr`: Human-readable uploaded size at the moment.
       * - `status`: Status of the upload process.
       * - `error`: Error message in case the upload failed.
       * - `abort`: True if the file was canceled by the user.
       * - `complete`: True when the file was transferred to the server.
       * - `uploading`: True while transferring data to the server.
       * @type {!Array<!UploadFile>}
       */
      files: {
        type: Array,
        notify: true,
        value: () => [],
        sync: true
      },
      /**
       * Limit of files to upload, by default it is unlimited. If the value is
       * set to one, native file browser will prevent selecting multiple files.
       * @attr {number} max-files
       */
      maxFiles: {
        type: Number,
        value: Infinity,
        sync: true
      },
      /**
       * Specifies if the maximum number of files have been uploaded
       * @attr {boolean} max-files-reached
       */
      maxFilesReached: {
        type: Boolean,
        value: false,
        notify: true,
        readOnly: true,
        reflectToAttribute: true
      },
      /**
       * Specifies the types of files that the server accepts.
       * Syntax: a comma-separated list of MIME type patterns (wildcards are
       * allowed) or file extensions.
       * Notice that MIME types are widely supported, while file extensions
       * are only implemented in certain browsers, so avoid using it.
       * Example: accept="video/*,image/tiff" or accept=".pdf,audio/mp3"
       */
      accept: {
        type: String,
        value: ""
      },
      /**
       * Specifies the maximum file size in bytes allowed to upload.
       * Notice that it is a client-side constraint, which will be checked before
       * sending the request. Obviously you need to do the same validation in
       * the server-side and be sure that they are aligned.
       * @attr {number} max-file-size
       */
      maxFileSize: {
        type: Number,
        value: Infinity
      },
      /**
       * Specifies if the dragover is validated with maxFiles and
       * accept properties.
       * @private
       */
      _dragoverValid: {
        type: Boolean,
        value: false,
        observer: "_dragoverValidChanged"
      },
      /**
       * Specifies the 'name' property at Content-Disposition for multipart uploads.
       * This property is ignored when uploadFormat is 'raw'.
       * @attr {string} form-data-name
       */
      formDataName: {
        type: String,
        value: "file"
      },
      /**
       * Prevents upload(s) from immediately uploading upon adding file(s).
       * When set, you must manually trigger uploads using the `uploadFiles` method
       * @attr {boolean} no-auto
       */
      noAuto: {
        type: Boolean,
        value: false
      },
      /**
       * Set the withCredentials flag on the request.
       * @attr {boolean} with-credentials
       */
      withCredentials: {
        type: Boolean,
        value: false
      },
      /**
       * Specifies the upload format to use when sending files to the server.
       * - 'raw': Send file as raw binary data with the file's MIME type as Content-Type (default)
       * - 'multipart': Send file using multipart/form-data encoding
       * @attr {string} upload-format
       */
      uploadFormat: {
        type: String,
        value: "raw"
      },
      /**
       * Specifies the maximum number of files that can be uploaded simultaneously.
       * This helps prevent browser performance degradation and XHR limitations when
       * uploading large numbers of files. Files exceeding this limit will be queued
       * and uploaded as active uploads complete.
       * @attr {number} max-concurrent-uploads
       */
      maxConcurrentUploads: {
        type: Number,
        value: 3,
        sync: true
      },
      /**
       * Pass-through to input's capture attribute. Allows user to trigger device inputs
       * such as camera or microphone immediately.
       */
      capture: {
        type: String
      },
      /** @private */
      _addButton: {
        type: Object
      },
      /** @private */
      _dropLabel: {
        type: Object
      },
      /** @private */
      _fileList: {
        type: Object
      },
      /** @private */
      _files: {
        type: Array
      },
      /** @private */
      _uploadQueue: {
        type: Array,
        value: () => []
      },
      /** @private */
      _activeUploads: {
        type: Number,
        value: 0
      }
    };
  }
  static get observers() {
    return [
      "__updateAddButton(_addButton, maxFiles, __effectiveI18n, maxFilesReached, disabled)",
      "__updateDropLabel(_dropLabel, maxFiles, __effectiveI18n)",
      "__updateFileList(_fileList, files, __effectiveI18n, disabled, _theme)",
      "__updateMaxFilesReached(maxFiles, files)"
    ];
  }
  /**
   * The object used to localize this component. To change the default
   * localization, replace this with an object that provides all properties, or
   * just the individual properties you want to change.
   *
   * The object has the following JSON structure and default values:
   *
   * ```js
   * {
   *   dropFiles: {
   *     one: 'Drop file here',
   *     many: 'Drop files here'
   *   },
   *   addFiles: {
   *     one: 'Upload File...',
   *     many: 'Upload Files...'
   *   },
   *   error: {
   *     tooManyFiles: 'Too Many Files.',
   *     fileIsTooBig: 'File is Too Big.',
   *     incorrectFileType: 'Incorrect File Type.'
   *   },
   *   uploading: {
   *     status: {
   *       connecting: 'Connecting...',
   *       stalled: 'Stalled',
   *       processing: 'Processing File...',
   *       held: 'Queued'
   *     },
   *     remainingTime: {
   *       prefix: 'remaining time: ',
   *       unknown: 'unknown remaining time'
   *     },
   *     error: {
   *       serverUnavailable: 'Upload failed, please try again later',
   *       unexpectedServerError: 'Upload failed due to server error',
   *       forbidden: 'Upload forbidden'
   *     }
   *   },
   *   file: {
   *     retry: 'Retry',
   *     start: 'Start',
   *     remove: 'Remove'
   *   },
   *   units: {
   *     size: ['B', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
   *     sizeBase: 1000
   *   },
   *   formatSize: function(bytes) {
   *     // returns the size followed by the best suitable unit
   *   },
   *   formatTime: function(seconds, [secs, mins, hours]) {
   *     // returns a 'HH:MM:SS' string
   *   }
   * }
   * ```
   * @type {!UploadI18n}
   */
  get i18n() {
    return super.i18n;
  }
  set i18n(value) {
    super.i18n = value;
  }
  /** @private */
  get __acceptRegexp() {
    if (!this.accept) {
      return null;
    }
    const processedTokens = this.accept.split(",").map((token) => {
      let processedToken = token.trim();
      processedToken = processedToken.replace(/[+.]/gu, "\\$&");
      if (processedToken.startsWith("\\.")) {
        processedToken = `.*${processedToken}$`;
      }
      return processedToken.replace(/\/\*/gu, "/.*");
    });
    return new RegExp(`^(${processedTokens.join("|")})$`, "iu");
  }
  /** @protected */
  ready() {
    super.ready();
    this.addEventListener("dragover", this._onDragover.bind(this));
    this.addEventListener("dragleave", this._onDragleave.bind(this));
    this.addEventListener("drop", this._onDrop.bind(this));
    this.addEventListener("file-retry", this._onFileRetry.bind(this));
    this.addEventListener("file-abort", this._onFileAbort.bind(this));
    this.addEventListener("file-start", this._onFileStart.bind(this));
    this.addEventListener("file-reject", this._onFileReject.bind(this));
    this.addEventListener("upload-start", this._onUploadStart.bind(this));
    this.addEventListener("upload-success", this._onUploadSuccess.bind(this));
    this.addEventListener("upload-error", this._onUploadError.bind(this));
    this._addButtonController = new AddButtonController(this);
    this.addController(this._addButtonController);
    this._dropLabelController = new DropLabelController(this);
    this.addController(this._dropLabelController);
    this.addController(
      new SlotController(this, "file-list", "vaadin-upload-file-list", {
        initializer: (list) => {
          this._fileList = list;
        }
      })
    );
    this.addController(new SlotController(this, "drop-label-icon", "vaadin-upload-icon"));
  }
  /** @private */
  _formatSize(bytes) {
    if (typeof this.__effectiveI18n.formatSize === "function") {
      return this.__effectiveI18n.formatSize(bytes);
    }
    const base = this.__effectiveI18n.units.sizeBase || 1e3;
    const unit = ~~(Math.log(bytes) / Math.log(base));
    const dec = Math.max(0, Math.min(3, unit - 1));
    const size = parseFloat((bytes / base ** unit).toFixed(dec));
    return `${size} ${this.__effectiveI18n.units.size[unit]}`;
  }
  /** @private */
  _splitTimeByUnits(time) {
    const unitSizes = [60, 60, 24, Infinity];
    const timeValues = [0];
    for (let i = 0; i < unitSizes.length && time > 0; i++) {
      timeValues[i] = time % unitSizes[i];
      time = Math.floor(time / unitSizes[i]);
    }
    return timeValues;
  }
  /** @private */
  _formatTime(seconds, split) {
    if (typeof this.__effectiveI18n.formatTime === "function") {
      return this.__effectiveI18n.formatTime(seconds, split);
    }
    while (split.length < 3) {
      split.push(0);
    }
    return split.reverse().map((number) => {
      return (number < 10 ? "0" : "") + number;
    }).join(":");
  }
  /** @private */
  _formatFileProgress(file) {
    const remainingTime = file.loaded > 0 ? this.__effectiveI18n.uploading.remainingTime.prefix + file.remainingStr : this.__effectiveI18n.uploading.remainingTime.unknown;
    return `${file.totalStr}: ${file.progress}% (${remainingTime})`;
  }
  /** @private */
  __updateMaxFilesReached(maxFiles, files) {
    this._setMaxFilesReached(maxFiles >= 0 && files.length >= maxFiles);
  }
  /** @private */
  __updateAddButton(addButton, maxFiles, effectiveI18n, maxFilesReached, disabled) {
    if (addButton) {
      addButton.disabled = disabled || maxFilesReached;
      if (addButton === this._addButtonController.defaultNode) {
        addButton.textContent = this._i18nPlural(maxFiles, effectiveI18n.addFiles);
      }
    }
  }
  /** @private */
  __updateDropLabel(dropLabel, maxFiles, effectiveI18n) {
    if (dropLabel && dropLabel === this._dropLabelController.defaultNode) {
      dropLabel.textContent = this._i18nPlural(maxFiles, effectiveI18n.dropFiles);
    }
  }
  /** @private */
  __updateFileList(list, files, effectiveI18n, disabled) {
    if (list) {
      list.items = [...files];
      list.i18n = effectiveI18n;
      list.disabled = disabled;
      if (window.Vaadin && window.Vaadin.featureFlags && (window.Vaadin.featureFlags.modularUpload || window.Vaadin.featureFlags.aiComponents) && this._theme) {
        list.setAttribute("theme", this._theme);
      } else {
        list.removeAttribute("theme");
      }
    }
  }
  /** @private */
  _onDragover(event) {
    event.preventDefault();
    if (!this.nodrop && !this._dragover) {
      this._dragoverValid = !this.maxFilesReached && !this.disabled;
      this._dragover = true;
    }
    event.dataTransfer.dropEffect = !this._dragoverValid || this.nodrop ? "none" : "copy";
  }
  /** @private */
  _onDragleave(event) {
    event.preventDefault();
    if (this._dragover && !this.nodrop) {
      this._dragover = this._dragoverValid = false;
    }
  }
  /** @private */
  async _onDrop(event) {
    if (!this.nodrop && !this.disabled) {
      event.preventDefault();
      this._dragover = this._dragoverValid = false;
      const files = await getFilesFromDropEvent(event);
      this._addFiles(files);
    }
  }
  /** @private */
  _createXhr() {
    return new XMLHttpRequest();
  }
  /** @private */
  _configureXhr(xhr, file = null, isRawUpload = false) {
    if (typeof this.headers === "string") {
      try {
        this.headers = JSON.parse(this.headers);
      } catch (_) {
        this.headers = void 0;
      }
    }
    Object.entries(this.headers).forEach(([key, value]) => {
      xhr.setRequestHeader(key, value);
    });
    if (isRawUpload && file) {
      xhr.setRequestHeader("Content-Type", file.type || "application/octet-stream");
      xhr.setRequestHeader("X-Filename", encodeURIComponent(file.name));
    }
    if (this.timeout) {
      xhr.timeout = this.timeout;
    }
    xhr.withCredentials = this.withCredentials;
  }
  /** @private */
  _setStatus(file, total, loaded, elapsed) {
    file.elapsed = elapsed;
    file.elapsedStr = this._formatTime(file.elapsed, this._splitTimeByUnits(file.elapsed));
    file.remaining = Math.ceil(elapsed * (total / loaded - 1));
    file.remainingStr = this._formatTime(file.remaining, this._splitTimeByUnits(file.remaining));
    file.speed = ~~(total / elapsed / 1024);
    file.totalStr = this._formatSize(total);
    file.loadedStr = this._formatSize(loaded);
    file.status = this._formatFileProgress(file);
  }
  /**
   * Triggers the upload of any files that are not completed
   *
   * @param {!UploadFile | !Array<!UploadFile>=} files - Files being uploaded. Defaults to all outstanding files
   */
  uploadFiles(files = this.files) {
    if (files && !Array.isArray(files)) {
      files = [files];
    }
    files.filter((file) => !file.complete).forEach((file) => this._queueFileUpload(file));
  }
  /** @private */
  _queueFileUpload(file) {
    if (file.uploading) {
      return;
    }
    file.held = true;
    file.uploading = file.indeterminate = true;
    file.complete = file.abort = file.error = false;
    file.status = this.__effectiveI18n.uploading.status.held;
    this._renderFileList();
    this._uploadQueue.push(file);
    this._processUploadQueue();
  }
  /**
   * Process the upload queue by starting uploads for queued files
   * if there is available capacity.
   *
   * @private
   */
  _processUploadQueue() {
    while (this._uploadQueue.length > 0 && this._activeUploads < this.maxConcurrentUploads) {
      const nextFile = this._uploadQueue.shift();
      if (nextFile) {
        this._uploadFile(nextFile);
      }
    }
  }
  /** @private */
  _uploadFile(file) {
    this._activeUploads += 1;
    const ini = Date.now();
    const xhr = file.xhr = this._createXhr();
    let stalledId, last;
    xhr.upload.onprogress = (e) => {
      clearTimeout(stalledId);
      last = Date.now();
      const elapsed = (last - ini) / 1e3;
      const loaded = e.loaded, total = e.total, progress = ~~(loaded / total * 100);
      file.loaded = loaded;
      file.progress = progress;
      file.indeterminate = loaded <= 0 || loaded >= total;
      if (file.error) {
        file.indeterminate = file.status = void 0;
      } else if (!file.abort) {
        if (progress < 100) {
          this._setStatus(file, total, loaded, elapsed);
          stalledId = setTimeout(() => {
            file.status = this.__effectiveI18n.uploading.status.stalled;
            this._renderFileList();
          }, 2e3);
        } else {
          file.loadedStr = file.totalStr;
          file.status = this.__effectiveI18n.uploading.status.processing;
        }
      }
      this._renderFileList();
      this.dispatchEvent(new CustomEvent("upload-progress", { detail: { file, xhr } }));
    };
    xhr.onabort = () => {
      this._activeUploads -= 1;
      this._processUploadQueue();
    };
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        clearTimeout(stalledId);
        file.indeterminate = file.uploading = false;
        this._activeUploads -= 1;
        this._processUploadQueue();
        if (file.abort) {
          return;
        }
        file.status = "";
        const evt2 = this.dispatchEvent(
          new CustomEvent("upload-response", {
            detail: { file, xhr },
            cancelable: true
          })
        );
        if (!evt2) {
          return;
        }
        if (xhr.status === 0) {
          file.error = this.__effectiveI18n.uploading.error.serverUnavailable;
        } else if (xhr.status >= 500) {
          file.error = this.__effectiveI18n.uploading.error.unexpectedServerError;
        } else if (xhr.status === 413) {
          file.error = this.__effectiveI18n.uploading.error.fileTooLarge;
        } else if (xhr.status >= 400) {
          file.error = this.__effectiveI18n.uploading.error.forbidden;
        }
        file.complete = !file.error;
        this.dispatchEvent(
          new CustomEvent(`upload-${file.error ? "error" : "success"}`, {
            detail: { file, xhr }
          })
        );
        this._renderFileList();
      }
    };
    const isRawUpload = this.uploadFormat === "raw";
    if (!file.uploadTarget) {
      file.uploadTarget = this.target || "";
    }
    if (!isRawUpload) {
      file.formDataName = this.formDataName;
    }
    const evt = this.dispatchEvent(
      new CustomEvent("upload-before", {
        detail: { file, xhr },
        cancelable: true
      })
    );
    if (!evt) {
      return;
    }
    let requestBody;
    if (isRawUpload) {
      requestBody = file;
    } else {
      const formData = new FormData();
      formData.append(file.formDataName, file, file.name);
      requestBody = formData;
    }
    xhr.open(this.method, file.uploadTarget, true);
    this._configureXhr(xhr, file, isRawUpload);
    file.held = false;
    file.status = this.__effectiveI18n.uploading.status.connecting;
    xhr.upload.onloadstart = () => {
      this.dispatchEvent(
        new CustomEvent("upload-start", {
          detail: { file, xhr }
        })
      );
      this._renderFileList();
    };
    const eventDetail = {
      file,
      xhr,
      uploadFormat: this.uploadFormat,
      requestBody
    };
    if (!isRawUpload) {
      eventDetail.formData = requestBody;
    }
    const uploadEvt = this.dispatchEvent(
      new CustomEvent("upload-request", {
        detail: eventDetail,
        cancelable: true
      })
    );
    if (uploadEvt) {
      xhr.send(requestBody);
    }
  }
  /** @private */
  _retryFileUpload(file) {
    const evt = this.dispatchEvent(
      new CustomEvent("upload-retry", {
        detail: { file, xhr: file.xhr },
        cancelable: true
      })
    );
    if (evt) {
      this._queueFileUpload(file);
      this._updateFocus(this.files.indexOf(file));
    }
  }
  /** @private */
  _abortFileUpload(file) {
    const evt = this.dispatchEvent(
      new CustomEvent("upload-abort", {
        detail: { file, xhr: file.xhr },
        cancelable: true
      })
    );
    if (evt) {
      file.abort = true;
      if (file.xhr) {
        file.xhr.abort();
      }
      this._removeFile(file);
    }
  }
  /** @private */
  _renderFileList() {
    if (this._fileList && typeof this._fileList.requestContentUpdate === "function") {
      this._fileList.requestContentUpdate();
    }
  }
  /** @private */
  _addFiles(files) {
    Array.prototype.forEach.call(files, this._addFile.bind(this));
  }
  /**
   * Add the file for uploading. Called internally for each file after picking files from dialog or dropping files.
   *
   * @param {!UploadFile} file File being added
   * @protected
   */
  _addFile(file) {
    if (this.maxFilesReached) {
      this.dispatchEvent(
        new CustomEvent("file-reject", {
          detail: { file, error: this.__effectiveI18n.error.tooManyFiles }
        })
      );
      return;
    }
    if (this.maxFileSize >= 0 && file.size > this.maxFileSize) {
      this.dispatchEvent(
        new CustomEvent("file-reject", {
          detail: { file, error: this.__effectiveI18n.error.fileIsTooBig }
        })
      );
      return;
    }
    const re2 = this.__acceptRegexp;
    if (re2 && !(re2.test(file.type) || re2.test(file.name))) {
      this.dispatchEvent(
        new CustomEvent("file-reject", {
          detail: { file, error: this.__effectiveI18n.error.incorrectFileType }
        })
      );
      return;
    }
    file.loaded = 0;
    file.held = true;
    file.status = this.__effectiveI18n.uploading.status.held;
    this.files = [file, ...this.files];
    if (!this.noAuto) {
      this._queueFileUpload(file);
    }
  }
  /** @private */
  _updateFocus(fileIndex) {
    if (this.files.length === 0) {
      this._addButton.focus({ focusVisible: isKeyboardActive() });
      return;
    }
    const lastFileRemoved = fileIndex === this.files.length;
    if (lastFileRemoved) {
      fileIndex -= 1;
    }
    this._fileList.children[fileIndex].firstElementChild.focus({ focusVisible: isKeyboardActive() });
  }
  /**
   * Remove file from upload list. Called internally if file upload was canceled.
   * @param {!UploadFile} file File to remove
   * @protected
   */
  _removeFile(file) {
    this._uploadQueue = this._uploadQueue.filter((f) => f !== file);
    this._processUploadQueue();
    const fileIndex = this.files.indexOf(file);
    if (fileIndex >= 0) {
      this.files = this.files.filter((i) => i !== file);
      this.dispatchEvent(
        new CustomEvent("file-remove", {
          detail: { file },
          bubbles: true,
          composed: true
        })
      );
      this._updateFocus(fileIndex);
    }
  }
  /** @private */
  _onAddFilesTouchEnd(e) {
    e.preventDefault();
    this._onAddFilesClick(e);
  }
  /** @private */
  _onAddFilesClick(e) {
    if (this.maxFilesReached) {
      return;
    }
    e.stopPropagation();
    this.$.fileInput.value = "";
    this.$.fileInput.click();
  }
  /** @private */
  _onFileInputChange(event) {
    this._addFiles(event.target.files);
  }
  /** @private */
  _onFileStart(event) {
    this._queueFileUpload(event.detail.file);
  }
  /** @private */
  _onFileRetry(event) {
    this._retryFileUpload(event.detail.file);
  }
  /** @private */
  _onFileAbort(event) {
    this._abortFileUpload(event.detail.file);
  }
  /** @private */
  _onFileReject(event) {
    announce(`${event.detail.file.name}: ${event.detail.error}`, { mode: "alert" });
  }
  /** @private */
  _onUploadStart(event) {
    announce(`${event.detail.file.name}: 0%`, { mode: "alert" });
  }
  /** @private */
  _onUploadSuccess(event) {
    announce(`${event.detail.file.name}: 100%`, { mode: "alert" });
  }
  /** @private */
  _onUploadError(event) {
    announce(`${event.detail.file.name}: ${event.detail.file.error}`, { mode: "alert" });
  }
  /** @private */
  _dragoverChanged(dragover) {
    if (dragover) {
      this.setAttribute("dragover", dragover);
    } else {
      this.removeAttribute("dragover");
    }
  }
  /** @private */
  _dragoverValidChanged(dragoverValid) {
    if (dragoverValid) {
      this.setAttribute("dragover-valid", dragoverValid);
    } else {
      this.removeAttribute("dragover-valid");
    }
  }
  /** @private */
  _i18nPlural(value, plural) {
    return value === 1 ? plural.one : plural.many;
  }
  /** @protected */
  _isMultiple(maxFiles) {
    return maxFiles !== 1;
  }
};
/**
 * @license
 * Copyright (c) 2016 - 2026 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
class Upload extends UploadMixin(ElementMixin(ThemableMixin(PolylitMixin(LumoInjectionMixin(LitElement))))) {
  static get is() {
    return "vaadin-upload";
  }
  static get styles() {
    return uploadStyles;
  }
  static get lumoInjector() {
    return { ...super.lumoInjector, includeBaseStyles: true };
  }
  /** @protected */
  render() {
    return html`
      <div part="primary-buttons">
        <slot name="add-button"></slot>
        <div part="drop-label" ?hidden="${this.nodrop}" id="dropLabelContainer" aria-hidden="true">
          <slot name="drop-label-icon"></slot>
          <slot name="drop-label"></slot>
        </div>
      </div>
      <slot name="file-list"></slot>
      <slot></slot>
      <input
        type="file"
        id="fileInput"
        hidden
        @change="${this._onFileInputChange}"
        accept="${this.accept}"
        ?multiple="${this._isMultiple(this.maxFiles)}"
        capture="${ifDefined(this.capture)}"
      />
    `;
  }
  /**
   * Fired when a file cannot be added to the queue due to a constrain:
   *  file-size, file-type or maxFiles
   *
   * @event file-reject
   * @param {Object} detail
   * @param {Object} detail.file the file added
   * @param {string} detail.error the cause
   */
  /**
   * Fired before the XHR is opened. Could be used for changing the request
   * URL. If the default is prevented, then XHR would not be opened.
   *
   * @event upload-before
   * @param {Object} detail
   * @param {Object} detail.xhr the xhr
   * @param {Object} detail.file the file being uploaded
   * @param {Object} detail.file.uploadTarget the upload request URL, initialized with the value of vaadin-upload `target` property
   */
  /**
   * Fired when the XHR has been opened but not sent yet. Useful for appending
   * data keys to the FormData object, for changing some parameters like
   * headers, etc. If the event is defaultPrevented, `vaadin-upload` will not
   * send the request allowing the user to do something on his own.
   *
   * @event upload-request
   * @param {Object} detail
   * @param {Object} detail.xhr the xhr
   * @param {Object} detail.file the file being uploaded
   * @param {Object} detail.formData the FormData object
   */
  /**
   * Fired when the XHR is sent.
   *
   * @event upload-start
   * @param {Object} detail
   * @param {Object} detail.xhr the xhr
   * @param {Object} detail.file the file being uploaded
   */
  /**
   * Fired as many times as the progress is updated.
   *
   * @event upload-progress
   * @param {Object} detail
   * @param {Object} detail.xhr the xhr
   * @param {Object} detail.file the file being uploaded with loaded info
   */
  /**
   * Fired when we have the actual server response, and before the component
   * analyses it. It's useful for developers to make the upload fail depending
   * on the server response. If the event is defaultPrevented the vaadin-upload
   * will return allowing the user to do something on his own like retry the
   * upload, etc. since he has full access to the `xhr` and `file` objects.
   * Otherwise, if the event is not prevented default `vaadin-upload` continues
   * with the normal workflow checking the `xhr.status` and `file.error`
   * which also might be modified by the user to force a customized response.
   *
   * @event upload-response
   * @param {Object} detail
   * @param {Object} detail.xhr the xhr
   * @param {Object} detail.file the file being uploaded
   */
  /**
   * Fired in case the upload process succeed.
   *
   * @event upload-success
   * @param {Object} detail
   * @param {Object} detail.xhr the xhr
   * @param {Object} detail.file the file being uploaded with loaded info
   */
  /**
   * Fired in case the upload process failed.
   *
   * @event upload-error
   * @param {Object} detail
   * @param {Object} detail.xhr the xhr
   * @param {Object} detail.file the file being uploaded
   */
  /**
   * Fired when retry upload is requested. If the default is prevented, then
   * retry would not be performed.
   *
   * @event upload-retry
   * @param {Object} detail
   * @param {Object} detail.xhr the previous upload xhr
   * @param {Object} detail.file the file being uploaded
   */
  /**
   * Fired when retry abort is requested. If the default is prevented, then the
   * file upload would not be aborted.
   *
   * @event upload-abort
   * @param {Object} detail
   * @param {Object} detail.xhr the xhr
   * @param {Object} detail.file the file being uploaded
   */
}
defineCustomElement(Upload);
/**
 * @license
 * Copyright (c) 2000 - 2026 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const uploadButton = css``;
const uploadButtonStyles = [buttonStyles, uploadButton];
/**
 * @license
 * Copyright (c) 2000 - 2026 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
class UploadButton extends ButtonMixin(ElementMixin(ThemableMixin(PolylitMixin(LumoInjectionMixin(LitElement))))) {
  static get is() {
    return "vaadin-upload-button";
  }
  static get styles() {
    return uploadButtonStyles;
  }
  static get properties() {
    return {
      /**
       * Reference to an UploadManager.
       * When set, the button will automatically disable when maxFilesReached
       * becomes true on the manager.
       * @type {Object | null}
       */
      manager: {
        type: Object,
        value: null,
        observer: "__managerChanged"
      },
      /**
       * Capture attribute for mobile file input.
       */
      capture: {
        type: String
      },
      /**
       * True when max files has been reached on the manager.
       */
      maxFilesReached: {
        type: Boolean,
        value: false,
        reflect: true,
        attribute: "max-files-reached"
      }
    };
  }
  constructor() {
    super();
    this.__syncFromManager = this.__syncFromManager.bind(this);
    this.__explicitDisabled = false;
  }
  /**
   * Whether the button is disabled.
   * Returns true if either explicitly disabled, manager is disabled, or maxFilesReached is true.
   * @type {boolean}
   * @override
   */
  get disabled() {
    return super.disabled;
  }
  set disabled(value) {
    this.__explicitDisabled = Boolean(value);
    super.disabled = this.__effectiveDisabled;
  }
  /** @protected */
  render() {
    return html`
      <div class="vaadin-button-container">
        <span part="prefix" aria-hidden="true">
          <slot name="prefix"></slot>
        </span>
        <span part="label">
          <slot></slot>
        </span>
        <span part="suffix" aria-hidden="true">
          <slot name="suffix"></slot>
        </span>
      </div>
      <slot name="tooltip"></slot>
      <input id="fileInput" type="file" hidden @change=${this.__onFileInputChange} />
    `;
  }
  /** @protected */
  ready() {
    super.ready();
    this._tooltipController = new TooltipController(this);
    this.addController(this._tooltipController);
    this.addEventListener("click", () => {
      this.openFilePicker();
    });
  }
  /** @protected */
  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.manager instanceof UploadManager) {
      this.manager.removeEventListener("max-files-reached-changed", this.__syncFromManager);
      this.manager.removeEventListener("disabled-changed", this.__syncFromManager);
    }
  }
  /** @protected */
  connectedCallback() {
    super.connectedCallback();
    if (this.manager instanceof UploadManager) {
      this.manager.addEventListener("max-files-reached-changed", this.__syncFromManager);
      this.manager.addEventListener("disabled-changed", this.__syncFromManager);
    }
    this.__syncFromManager();
  }
  /**
   * Opens the file picker dialog.
   */
  openFilePicker() {
    if (this.disabled) {
      return;
    }
    this.__updateFileInputAttributes();
    this.$.fileInput.value = "";
    this.$.fileInput.click();
  }
  /** @private */
  __updateFileInputAttributes() {
    const { fileInput } = this.$;
    const accept = this.manager && this.manager.accept;
    if (accept) {
      fileInput.setAttribute("accept", accept);
    } else {
      fileInput.removeAttribute("accept");
    }
    const maxFiles = this.manager && this.manager.maxFiles != null ? this.manager.maxFiles : Infinity;
    fileInput.multiple = maxFiles !== 1;
    if (this.capture) {
      fileInput.setAttribute("capture", this.capture);
    } else {
      fileInput.removeAttribute("capture");
    }
  }
  /** @private */
  __onFileInputChange(event) {
    const files = event.target.files;
    if (this.manager instanceof UploadManager) {
      this.manager.addFiles(files);
    }
  }
  /** @private */
  __managerChanged(manager, oldManager) {
    if (oldManager instanceof UploadManager) {
      oldManager.removeEventListener("max-files-reached-changed", this.__syncFromManager);
      oldManager.removeEventListener("disabled-changed", this.__syncFromManager);
    }
    if (this.isConnected && manager instanceof UploadManager) {
      manager.addEventListener("max-files-reached-changed", this.__syncFromManager);
      manager.addEventListener("disabled-changed", this.__syncFromManager);
      this.__syncFromManager();
    } else if (this.isConnected) {
      this.__syncFromManager();
    }
  }
  /** @private */
  get __effectiveDisabled() {
    const noManager = !(this.manager instanceof UploadManager);
    const managerDisabled = !noManager && this.manager.disabled;
    return this.__explicitDisabled || noManager || managerDisabled || this.maxFilesReached;
  }
  /** @private */
  __syncFromManager() {
    if (this.manager instanceof UploadManager) {
      this.maxFilesReached = this.manager.maxFilesReached;
    } else {
      this.maxFilesReached = false;
    }
    super.disabled = this.__effectiveDisabled;
  }
  /** @override */
  __shouldAllowFocusWhenDisabled() {
    return window.Vaadin.featureFlags.accessibleDisabledButtons;
  }
}
defineCustomElement(UploadButton);
/**
 * @license
 * Copyright (c) 2000 - 2026 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const uploadDropZoneStyles = css`
  :host {
    display: block;
    position: relative;
  }

  :host([dragover])::after {
    content: '';
    position: absolute;
    inset: 0;
    background: var(--vaadin-background-container);
    opacity: 0.7;
  }

  :host([hidden]) {
    display: none !important;
  }
`;
/**
 * @license
 * Copyright (c) 2000 - 2026 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
class UploadDropZone extends ElementMixin(ThemableMixin(PolylitMixin(LumoInjectionMixin(LitElement)))) {
  static get is() {
    return "vaadin-upload-drop-zone";
  }
  static get styles() {
    return uploadDropZoneStyles;
  }
  static get lumoInjector() {
    return { ...super.lumoInjector, includeBaseStyles: true };
  }
  static get properties() {
    return {
      /**
       * Reference to an UploadManager.
       * When set, dropped files will be automatically added to the manager.
       * @type {Object | null}
       */
      manager: {
        type: Object,
        value: null,
        observer: "__managerChanged"
      },
      /**
       * Whether the drop zone is disabled.
       * Returns true if either explicitly disabled, manager is disabled, or no manager is set.
       */
      disabled: {
        type: Boolean,
        value: false
      },
      /**
       * True when max files has been reached on the manager.
       * @readonly
       */
      maxFilesReached: {
        type: Boolean,
        value: false,
        reflect: true,
        attribute: "max-files-reached"
      },
      /** @private */
      __dragover: {
        type: Boolean,
        value: false,
        reflect: true,
        attribute: "dragover"
      }
    };
  }
  /**
   * Whether the drop zone is disabled.
   * Returns true if either explicitly disabled, manager is disabled, or no manager is set.
   * @type {boolean}
   * @override
   */
  get disabled() {
    return this.__effectiveDisabled;
  }
  set disabled(value) {
    if (this.__syncingDisabled) return;
    this.__explicitDisabled = Boolean(value);
    this.__syncDisabledState();
  }
  constructor() {
    super();
    this.__explicitDisabled = false;
    this.__onMaxFilesReachedChanged = this.__onMaxFilesReachedChanged.bind(this);
    this.__syncDisabledState = this.__syncDisabledState.bind(this);
  }
  /** @protected */
  ready() {
    super.ready();
    this.addEventListener("dragover", this.__onDragover.bind(this));
    this.addEventListener("dragleave", this.__onDragleave.bind(this));
    this.addEventListener("drop", this.__onDrop.bind(this));
  }
  /** @protected */
  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.manager instanceof UploadManager) {
      this.manager.removeEventListener("max-files-reached-changed", this.__onMaxFilesReachedChanged);
      this.manager.removeEventListener("disabled-changed", this.__syncDisabledState);
    }
  }
  /** @protected */
  connectedCallback() {
    super.connectedCallback();
    if (this.manager instanceof UploadManager) {
      this.manager.addEventListener("max-files-reached-changed", this.__onMaxFilesReachedChanged);
      this.manager.addEventListener("disabled-changed", this.__syncDisabledState);
      this.maxFilesReached = !!this.manager.maxFilesReached;
    }
    this.__syncDisabledState();
  }
  /** @protected */
  render() {
    return html`<slot></slot>`;
  }
  /** @private */
  get __effectiveDisabled() {
    const noManager = !(this.manager instanceof UploadManager);
    return this.__explicitDisabled || noManager || this.manager.disabled || this.maxFilesReached;
  }
  /** @private */
  __onDragover(event) {
    event.preventDefault();
    if (!this.__effectiveDisabled) {
      this.__dragover = true;
    }
    event.dataTransfer.dropEffect = this.__effectiveDisabled ? "none" : "copy";
  }
  /** @private */
  __onDragleave(event) {
    event.preventDefault();
    if (event.target !== this) {
      return;
    }
    this.__dragover = false;
  }
  /** @private */
  async __onDrop(event) {
    event.preventDefault();
    this.__dragover = false;
    if (!this.__effectiveDisabled) {
      const files = await getFilesFromDropEvent(event);
      this.manager.addFiles(files);
    }
  }
  /** @private */
  __managerChanged(manager, oldManager) {
    if (oldManager instanceof UploadManager) {
      oldManager.removeEventListener("max-files-reached-changed", this.__onMaxFilesReachedChanged);
      oldManager.removeEventListener("disabled-changed", this.__syncDisabledState);
    }
    if (this.isConnected && manager instanceof UploadManager) {
      manager.addEventListener("max-files-reached-changed", this.__onMaxFilesReachedChanged);
      manager.addEventListener("disabled-changed", this.__syncDisabledState);
      this.maxFilesReached = !!manager.maxFilesReached;
    } else {
      this.maxFilesReached = false;
    }
    if (this.isConnected) {
      this.__syncDisabledState();
    }
  }
  /** @private */
  __onMaxFilesReachedChanged(event) {
    this.maxFilesReached = event.detail.value;
    this.__syncDisabledState();
  }
  /** @private */
  __syncDisabledState() {
    if (!this.isConnected) return;
    this.__syncingDisabled = true;
    this.toggleAttribute("disabled", this.__effectiveDisabled);
    this.__syncingDisabled = false;
  }
}
defineCustomElement(UploadDropZone);
class UploadManagerConnector extends HTMLElement {
  constructor() {
    super();
    this.manager = new UploadManager();
    this.uploading = false;
    this.manager.addEventListener("file-remove", (e) => {
      this.dispatchEvent(
        new CustomEvent("file-remove", {
          detail: { fileName: e.detail.file?.name },
          bubbles: false
        })
      );
    });
    this.manager.addEventListener("file-reject", (e) => {
      this.dispatchEvent(
        new CustomEvent("file-reject", {
          detail: {
            fileName: e.detail.file?.name,
            errorMessage: e.detail.error
          },
          bubbles: false
        })
      );
    });
    this.manager.addEventListener("upload-start", () => {
      this.uploading = true;
    });
    const checkAllFinished = () => {
      const isUploading = this.manager.files.some((file) => file.uploading);
      if (this.uploading && !isUploading) {
        this.dispatchEvent(new CustomEvent("all-finished", { bubbles: false }));
      }
      this.uploading = isUploading;
    };
    this.manager.addEventListener("upload-success", checkAllFinished);
    this.manager.addEventListener("upload-error", checkAllFinished);
    this.manager.addEventListener("upload-abort", checkAllFinished);
  }
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "target" && oldValue !== newValue) {
      this.manager.target = newValue;
    } else if (name === "disabled" && oldValue !== newValue) {
      this.manager.disabled = newValue !== null;
    }
  }
  static get observedAttributes() {
    return ["target", "disabled"];
  }
  set maxFiles(value) {
    this.manager.maxFiles = value;
  }
  set maxFileSize(value) {
    this.manager.maxFileSize = value;
  }
  set accept(value) {
    this.manager.accept = value;
  }
  set noAuto(value) {
    this.manager.noAuto = value;
  }
  set uploadFormat(value) {
    this.manager.uploadFormat = value;
  }
  clearFileList() {
    this.manager.files = [];
  }
}
customElements.define("vaadin-upload-manager-connector", UploadManagerConnector);
/**
 * @license
 * Copyright (c) 2021 - 2026 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const virtualListStyles = css`
  :host {
    /* Don't let these properties inherit */
    --vaadin-virtual-list-padding-block: 0px;
    --vaadin-virtual-list-padding-inline: 0px;
    --vaadin-virtual-list-overflow-indicator-top-opacity: 0;
    --vaadin-virtual-list-overflow-indicator-bottom-opacity: 0;
    display: block;
    height: 400px;
    overflow: auto;
    flex: 1;
    align-self: stretch;
    box-sizing: border-box;
    padding: 0;
    --_indicator-height: var(--vaadin-virtual-list-overflow-indicator-height, 1px);
  }

  :host([hidden]) {
    display: none !important;
  }

  :host(:not([grid])) #items > ::slotted(*) {
    inset-inline: var(--vaadin-virtual-list-padding-inline);
  }

  #items {
    position: relative;
  }

  :host::before,
  :host::after {
    content: '';
    display: block;
    opacity: 0;
    position: sticky;
    inset: 0;
    z-index: 9999;
    pointer-events: none;
    box-sizing: border-box;
    height: var(--_indicator-height);
    background: var(--vaadin-border-color-secondary);
  }

  :host::before {
    margin-bottom: calc(var(--vaadin-virtual-list-padding-block) - var(--_indicator-height));
  }

  :host::after {
    margin-top: calc(var(--vaadin-virtual-list-padding-block) - var(--_indicator-height));
  }

  :host([overflow~='top'])::before {
    opacity: var(--vaadin-virtual-list-overflow-indicator-top-opacity);
  }

  :host([overflow~='bottom'])::after {
    opacity: var(--vaadin-virtual-list-overflow-indicator-bottom-opacity);
  }

  :host([theme~='overflow-indicator-top'][overflow~='top']),
  :host([theme~='overflow-indicators'][overflow~='top']) {
    --vaadin-virtual-list-overflow-indicator-top-opacity: 1;
  }

  :host([theme~='overflow-indicators'][overflow~='bottom']),
  :host([theme~='overflow-indicator-bottom'][overflow~='bottom']) {
    --vaadin-virtual-list-overflow-indicator-bottom-opacity: 1;
  }
`;
/**
 * @license
 * Copyright (c) 2021 - 2026 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const VirtualListMixin = (superClass) => class VirtualListMixinClass extends superClass {
  static get properties() {
    return {
      /**
       * An array containing items determining how many instances to render.
       * @type {Array<!VirtualListItem> | undefined}
       */
      items: { type: Array, sync: true },
      /**
       * Custom function for rendering the content of every item.
       * Receives three arguments:
       *
       * - `root` The render target element representing one item at a time.
       * - `virtualList` The reference to the `<vaadin-virtual-list>` element.
       * - `model` The object with the properties related with the rendered
       *   item, contains:
       *   - `model.index` The index of the rendered item.
       *   - `model.item` The item.
       * @type {VirtualListRenderer | undefined}
       */
      renderer: { type: Function, sync: true },
      /**
       * A function that generates accessible names for virtual list items.
       * The function gets the item as an argument and the
       * return value should be a string representing that item. The
       * result gets applied to the corresponding virtual list child element
       * as an `aria-label` attribute.
       */
      itemAccessibleNameGenerator: {
        type: Function,
        sync: true
      },
      /** @private */
      __virtualizer: Object
    };
  }
  static get observers() {
    return ["__itemsOrRendererChanged(items, renderer, __virtualizer, itemAccessibleNameGenerator)"];
  }
  /**
   * Gets the index of the first visible item in the viewport.
   *
   * @return {number}
   */
  get firstVisibleIndex() {
    return this.__virtualizer.firstVisibleIndex;
  }
  /**
   * Gets the index of the last visible item in the viewport.
   *
   * @return {number}
   */
  get lastVisibleIndex() {
    return this.__virtualizer.lastVisibleIndex;
  }
  constructor() {
    super();
    this.__onDocumentDragStart = this.__onDocumentDragStart.bind(this);
  }
  /** @protected */
  ready() {
    super.ready();
    this.__virtualizer = new Virtualizer({
      createElements: this.__createElements,
      updateElement: this.__updateElement.bind(this),
      elementsContainer: this,
      scrollTarget: this,
      scrollContainer: this.shadowRoot.querySelector("#items"),
      reorderElements: true
    });
    this.__overflowController = new OverflowController(this);
    this.addController(this.__overflowController);
    this.__updateAria();
  }
  /** @protected */
  connectedCallback() {
    super.connectedCallback();
    document.addEventListener("dragstart", this.__onDocumentDragStart, { capture: true });
    this.__virtualizer.hostConnected();
  }
  /** @protected */
  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener("dragstart", this.__onDocumentDragStart, { capture: true });
  }
  /**
   * Scroll to a specific index in the virtual list.
   *
   * @param {number} index Index to scroll to
   */
  scrollToIndex(index) {
    this.__virtualizer.scrollToIndex(index);
  }
  /** @private */
  __createElements(count) {
    return [...Array(count)].map(() => document.createElement("div"));
  }
  /** @private */
  __updateAria() {
    this.role = "list";
  }
  /** @private */
  __updateElement(el, index) {
    const item = this.items[index];
    el.ariaSetSize = String(this.items.length);
    el.ariaPosInSet = String(index + 1);
    el.ariaLabel = this.itemAccessibleNameGenerator ? this.itemAccessibleNameGenerator(item) : null;
    this.__updateElementRole(el);
    if (el.__renderer !== this.renderer) {
      el.__renderer = this.renderer;
      this.__clearRenderTargetContent(el);
    }
    if (this.renderer) {
      this.renderer(el, this, { item, index });
    }
  }
  /** @private */
  __updateElementRole(el) {
    el.role = "listitem";
  }
  /**
   * Clears the content of a render target.
   * @private
   */
  __clearRenderTargetContent(element) {
    element.innerHTML = "";
    delete element._$litPart$;
  }
  /** @private */
  __itemsOrRendererChanged(items, renderer, virtualizer) {
    const hasRenderedItems = this.childElementCount > 0;
    if ((renderer || hasRenderedItems) && virtualizer) {
      virtualizer.size = (items || []).length;
      virtualizer.update();
    }
  }
  /**
   * Webkit-based browsers have issues with generating drag images
   * for elements that have children with massive heights. Chromium
   * browsers crash, while Safari experiences significant performance
   * issues. To mitigate these issues, we hide the items container
   * when drag starts to remove it from the drag image.
   *
   * Virtual lists with fewer rows also have issues on Chromium and Safari
   * where the drag image is not properly clipped and may include
   * content outside the virtual list. Temporary inline styles are applied
   * to mitigate this issue.
   *
   * Related issues:
   * - https://github.com/vaadin/web-components/issues/7985
   * - https://issues.chromium.org/issues/383356871
   * - https://github.com/vaadin/web-components/issues/8386
   *
   * @private
   */
  __onDocumentDragStart(e) {
    if (e.target.contains(this)) {
      const elements = [e.target, this.$.items];
      const originalInlineStyles = elements.map((element) => element.style.cssText);
      if (this.scrollHeight > 2e4) {
        this.$.items.style.display = "none";
      }
      if (isChrome) {
        e.target.style.willChange = "transform";
      }
      if (isSafari) {
        this.$.items.style.maxHeight = "100%";
      }
      requestAnimationFrame(() => {
        elements.forEach((element, index) => {
          element.style.cssText = originalInlineStyles[index];
        });
      });
    }
  }
  /**
   * Requests an update for the content of the rows.
   * While performing the update, it invokes the renderer passed in the `renderer` property for each visible row.
   *
   * It is not guaranteed that the update happens immediately (synchronously) after it is requested.
   */
  requestContentUpdate() {
    if (this.__virtualizer) {
      this.__virtualizer.update();
    }
  }
};
/**
 * @license
 * Copyright (c) 2021 - 2026 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
class VirtualList extends VirtualListMixin(ThemableMixin(ElementMixin(PolylitMixin(LitElement)))) {
  static get is() {
    return "vaadin-virtual-list";
  }
  static get styles() {
    return virtualListStyles;
  }
  /** @protected */
  render() {
    return html`
      <div id="items">
        <slot></slot>
      </div>
    `;
  }
}
defineCustomElement(VirtualList);
window.Vaadin.Flow.virtualListConnector = {
  initLazy: function(list) {
    if (list.$connector) {
      return;
    }
    const extraItemsBuffer = 20;
    let lastRequestedRange = [0, 0];
    list.$connector = {};
    list.$connector.placeholderItem = { __placeholder: true };
    list.itemAccessibleNameGenerator = (item) => item && item.accessibleName;
    const updateRequestedItem = function() {
      const visibleIndexes = [...list.children].filter((el) => "__virtualListIndex" in el).map((el) => el.__virtualListIndex);
      const firstNeededItem = Math.min(...visibleIndexes);
      const lastNeededItem = Math.max(...visibleIndexes);
      let first = Math.max(0, firstNeededItem - extraItemsBuffer);
      let last = Math.min(lastNeededItem + extraItemsBuffer, list.items.length);
      if (lastRequestedRange[0] != first || lastRequestedRange[1] != last) {
        lastRequestedRange = [first, last];
        const count = 1 + last - first;
        list.$server.setViewportRange(first, count);
      }
    };
    const scheduleUpdateRequest = function() {
      list.__requestDebounce = Debouncer.debounce(list.__requestDebounce, timeOut.after(50), updateRequestedItem);
    };
    requestAnimationFrame(() => updateRequestedItem);
    list.patchVirtualListRenderer = function() {
      if (!list.renderer || list.renderer.__virtualListConnectorPatched) {
        return;
      }
      const originalRenderer = list.renderer;
      const renderer = (root, list2, model) => {
        root.__virtualListIndex = model.index;
        if (model.item === void 0) {
          if (list2.$connector.placeholderElement) {
            if (!root.__hasComponentRendererPlaceholder) {
              root.innerHTML = "";
              delete root._$litPart$;
              root.appendChild(list2.$connector.placeholderElement.cloneNode(true));
              root.__hasComponentRendererPlaceholder = true;
            }
          } else {
            originalRenderer.call(list2, root, list2, {
              ...model,
              item: list2.$connector.placeholderItem
            });
          }
        } else {
          if (root.__hasComponentRendererPlaceholder) {
            root.innerHTML = "";
            root.__hasComponentRendererPlaceholder = false;
          }
          originalRenderer.call(list2, root, list2, model);
        }
        scheduleUpdateRequest();
      };
      renderer.__virtualListConnectorPatched = true;
      renderer.__rendererId = originalRenderer.__rendererId;
      list.renderer = renderer;
    };
    list._createPropertyObserver("renderer", "patchVirtualListRenderer", true);
    list.patchVirtualListRenderer();
    list.items = [];
    list.$connector.set = function(index, items) {
      list.items.splice(index, items.length, ...items);
      list.items = [...list.items];
    };
    list.$connector.clear = function(index, length) {
      const clearCount = Math.min(length, list.items.length - index);
      list.$connector.set(index, [...Array(clearCount)]);
    };
    list.$connector.updateData = function(items) {
      const updatedItemsMap = items.reduce((map, item) => {
        map[item.key] = item;
        return map;
      }, {});
      list.items = list.items.map((item) => {
        if (!item) {
          return item;
        }
        return updatedItemsMap[item.key] || item;
      });
    };
    list.$connector.updateSize = function(newSize) {
      const delta = newSize - list.items.length;
      if (delta > 0) {
        list.items = [...list.items, ...Array(delta)];
      } else if (delta < 0) {
        list.items = list.items.slice(0, newSize);
      }
    };
    list.$connector.setPlaceholderItem = function(placeholderItem = {}, appId) {
      placeholderItem.__placeholder = true;
      list.$connector.placeholderItem = placeholderItem;
      const nodeId = Object.entries(placeholderItem).find(([key]) => key.endsWith("_nodeid"));
      list.$connector.placeholderElement = nodeId ? Vaadin.Flow.clients[appId].getByNodeId(nodeId[1]) : null;
    };
  }
};
/**
 * @license
 * Copyright (c) 2017 - 2026 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
class Lumo extends HTMLElement {
  static get is() {
    return "vaadin-lumo-styles";
  }
}
defineCustomElement(Lumo);
/**
 * @license
 * Copyright (c) 2017 - 2026 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const template = document.createElement("template");
template.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg"><defs>
<g id="lumo:align-center"><path d="M167 217c0-18 17-33 38-34H795c21 0 38 15 38 34 0 18-17 33-38 33H205C184 250 167 235 167 217z m83 191c0-18 13-33 29-33H721c16 0 29 15 29 33 0 18-13 33-29 34H279C263 442 250 427 250 408zM250 792c0-18 13-33 29-34H721c16 0 29 15 29 34s-13 33-29 33H279C263 825 250 810 250 792z m-83-192c0-18 17-33 38-33H795c21 0 38 15 38 33s-17 33-38 33H205C184 633 167 618 167 600z" fill-rule="evenodd" clip-rule="evenodd"></path></g>
<g id="lumo:align-left"><path d="M167 217c0-18 17-33 38-34H795c21 0 38 15 38 34 0 18-17 33-38 33H205C184 250 167 235 167 217z m0 191c0-18 13-33 28-33H638c16 0 29 15 29 33 0 18-13 33-29 34H195C179 442 167 427 167 408zM167 792c0-18 13-33 28-34H638c16 0 29 15 29 34s-13 33-29 33H195C179 825 167 810 167 792z m0-192c0-18 17-33 38-33H795c21 0 38 15 38 33s-17 33-38 33H205C184 633 167 618 167 600z" fill-rule="evenodd" clip-rule="evenodd"></path></g>
<g id="lumo:align-right"><path d="M167 217c0-18 17-33 38-34H795c21 0 38 15 38 34 0 18-17 33-38 33H205C184 250 167 235 167 217z m166 191c0-18 13-33 29-33H805c16 0 29 15 28 33 0 18-13 33-28 34H362C346 442 333 427 333 408zM333 792c0-18 13-33 29-34H805c16 0 29 15 28 34s-13 33-28 33H362C346 825 333 810 333 792z m-166-192c0-18 17-33 38-33H795c21 0 38 15 38 33s-17 33-38 33H205C184 633 167 618 167 600z" fill-rule="evenodd" clip-rule="evenodd"></path></g>
<g id="lumo:angle-down"><path d="M283 391c-18-16-46-15-63 4-16 18-15 46 3 63l244 224c17 15 43 15 60 0l250-229c18-16 20-45 3-63-16-18-45-20-63-4l-220 203-214-198z"></path></g>
<g id="lumo:angle-left"><path d="M601 710c16 18 15 46-3 63-18 16-46 15-63-4l-224-244c-15-17-15-43 0-59l229-250c16-18 45-20 63-4 18 16 20 45 3 63l-203 220 198 215z"></path></g>
<g id="lumo:angle-right"><path d="M399 275c-16-18-15-46 3-63 18-16 46-15 63 4l224 244c15 17 15 43 0 59l-229 250c-16 18-45 20-63 4-18-16-20-45-3-63l203-220-198-215z"></path></g>
<g id="lumo:angle-up"><path d="M283 635c-18 16-46 15-63-3-16-18-15-46 3-63l244-224c17-15 43-15 60 0l250 229c18 16 20 45 3 63-16 18-45 20-63 3l-220-202L283 635z"></path></g>
<g id="lumo:arrow-down"><path d="M538 646l125-112c15-14 39-12 53 4 14 15 12 39-4 53l-187 166c0 0 0 0 0 0-14 13-36 12-50 0l-187-166c-15-14-17-37-4-53 14-15 37-17 53-4L462 646V312c0-21 17-38 38-37s38 17 37 37v334z"></path></g>
<g id="lumo:arrow-left"><path d="M375 538l111 125c14 15 12 39-3 53-15 14-39 12-53-4l-166-187c0 0 0 0 0 0-13-14-12-36 0-50l166-187c14-15 37-17 53-4 15 14 17 37 3 53L375 463h333c21 0 38 17 38 37 0 21-17 38-38 38h-333z"></path></g>
<g id="lumo:arrow-right"><path d="M625 538h-333c-21 0-38-17-38-38 0-21 17-38 38-37h333l-111-126c-14-15-12-39 3-53 15-14 39-12 53 4l166 187c13 14 13 36 0 50 0 0 0 0 0 0l-166 187c-14 15-37 17-53 4-15-14-17-37-3-53l111-125z"></path></g>
<g id="lumo:arrow-up"><path d="M538 354V688c0 21-17 38-38 37s-38-17-38-38V354l-125 112c-15 14-39 12-53-4-14-15-12-39 4-53l187-166c14-13 36-13 50 0 0 0 0 0 0 0l187 166c15 14 17 37 4 53-14 15-37 17-53 4L538 354z"></path></g>
<g id="lumo:bar-chart"><path d="M175 500h108c28 0 50 22 50 50v233c0 28-22 50-50 50H175c-28 0-50-22-50-50v-233c0-28 22-50 50-50z m33 67c-9 0-17 7-16 16v167c0 9 7 17 16 17h42c9 0 17-7 17-17v-167c0-9-7-17-17-16H208zM446 167h108c28 0 50 22 50 50v566c0 28-22 50-50 50h-108c-28 0-50-22-50-50V217c0-28 22-50 50-50z m33 66c-9 0-17 7-17 17v500c0 9 7 17 17 17h42c9 0 17-7 16-17V250c0-9-7-17-16-17h-42zM717 333h108c28 0 50 22 50 50v400c0 28-22 50-50 50h-108c-28 0-50-22-50-50V383c0-28 22-50 50-50z m33 67c-9 0-17 7-17 17v333c0 9 7 17 17 17h42c9 0 17-7 16-17v-333c0-9-7-17-16-17h-42z"></path></g>
<g id="lumo:bell"><path d="M367 675H292v-258C292 325 366 250 459 250H458V208c0-23 18-42 42-41 23 0 42 18 42 41v42h-1C634 250 708 325 708 417V675h-75v-258c0-51-41-92-91-92h-84C408 325 367 366 367 417V675z m-159 37c0-21 17-38 38-37h508c21 0 37 17 38 37 0 21-17 38-38 38H246C225 750 208 733 208 713z m230 71h125v32c0 17-14 31-32 31h-62c-17 0-32-14-31-31v-32z"></path></g>
<g id="lumo:calendar"><path d="M375 208h250v-20C625 176 634 167 646 167h41C699 167 708 176 708 188V208h74c23 0 41 19 41 42v42C823 315 804 333 782 333H218C196 333 177 315 177 292V250C177 227 196 208 218 208H292v-20C292 176 301 167 313 167h41C366 167 375 176 375 188V208zM229 375h42C283 375 292 384 292 396v41C292 449 282 458 271 458h-42C217 458 208 449 208 437v-41C208 384 218 375 229 375z m125 0h42C408 375 417 384 417 396v41C417 449 407 458 396 458h-42C342 458 333 449 333 437v-41C333 384 343 375 354 375z m125 0h42C533 375 542 384 542 396v41C542 449 532 458 521 458h-42C467 458 458 449 458 437v-41C458 384 468 375 479 375z m-250 125h42C283 500 292 509 292 521v41C292 574 282 583 271 583h-42C217 583 208 574 208 562v-41C208 509 218 500 229 500z m125 0h42C408 500 417 509 417 521v41C417 574 407 583 396 583h-42C342 583 333 574 333 562v-41C333 509 343 500 354 500z m125 0h42c12 0 21 9 21 21v41C542 574 532 583 521 583h-42C467 583 458 574 458 562v-41C458 509 468 500 479 500z m-250 125h42C283 625 292 634 292 646v41C292 699 282 708 271 708h-42C217 708 208 699 208 687v-41C208 634 218 625 229 625z m125 0h42C408 625 417 634 417 646v41C417 699 407 708 396 708h-42C342 708 333 699 333 687v-41C333 634 343 625 354 625z m125 0h42c12 0 21 9 21 21v41C542 699 532 708 521 708h-42C467 708 458 699 458 687v-41C458 634 468 625 479 625z m125-250h42C658 375 667 384 667 396v41C667 449 657 458 646 458h-42C592 458 583 449 583 437v-41C583 384 593 375 604 375z m0 125h42c12 0 21 9 21 21v41C667 574 657 583 646 583h-42C592 583 583 574 583 562v-41C583 509 593 500 604 500z m0 125h42c12 0 21 9 21 21v41C667 699 657 708 646 708h-42C592 708 583 699 583 687v-41C583 634 593 625 604 625z m125 0h42c12 0 21 9 21 21v41C792 699 782 708 771 708h-42C717 708 708 699 708 687v-41C708 634 718 625 729 625z m-500 125h42C283 750 292 759 292 771v41C292 824 282 833 271 833h-42C217 833 208 824 208 812v-41C208 759 218 750 229 750z m125 0h42C408 750 417 759 417 771v41C417 824 407 833 396 833h-42C342 833 333 824 333 812v-41C333 759 343 750 354 750z m125 0h42c12 0 21 9 21 21v41C542 824 532 833 521 833h-42C467 833 458 824 458 812v-41C458 759 468 750 479 750z m125 0h42c12 0 21 9 21 21v41C667 824 657 833 646 833h-42C592 833 583 824 583 812v-41C583 759 593 750 604 750z m125 0h42c12 0 21 9 21 21v41C792 824 782 833 771 833h-42C717 833 708 824 708 812v-41C708 759 718 750 729 750z m0-250h42c12 0 21 9 21 21v41C792 574 782 583 771 583h-42C717 583 708 574 708 562v-41C708 509 718 500 729 500z m0-125h42C783 375 792 384 792 396v41C792 449 782 458 771 458h-42C717 458 708 449 708 437v-41C708 384 718 375 729 375z"></path></g>
<g id="lumo:checkmark"><path d="M318 493c-15-15-38-15-53 0-15 15-15 38 0 53l136 136c15 15 38 15 53 0l323-322c15-15 15-38 0-53-15-15-38-15-54 0l-295 296-110-110z"></path></g>
<g id="lumo:chevron-down"><path d="M533 654l210-199c9-9 9-23 0-32C739 419 733 417 726 417H274C261 417 250 427 250 439c0 6 2 12 7 16l210 199c18 17 48 17 66 0z"></path></g>
<g id="lumo:chevron-left"><path d="M346 533l199 210c9 9 23 9 32 0 4-4 7-10 6-17V274C583 261 573 250 561 250c-6 0-12 2-16 7l-199 210c-17 18-17 48 0 66z"></path></g>
<g id="lumo:chevron-right"><path d="M654 533L455 743c-9 9-23 9-32 0C419 739 417 733 417 726V274C417 261 427 250 439 250c6 0 12 2 16 7l199 210c17 18 17 48 0 66z"></path></g>
<g id="lumo:chevron-up"><path d="M533 346l210 199c9 9 9 23 0 32-4 4-10 7-17 6H274C261 583 250 573 250 561c0-6 2-12 7-16l210-199c18-17 48-17 66 0z"></path></g>
<g id="lumo:clean"><path d="M250 208v8L368 333h99l-30 70 88 88L592 333H833V208H250M136 208L83 261l291 291L271 792h125l65-153L697 875 750 822 148 220 136 208Z"></path></g>
<g id="lumo:clock"><path d="M538 489l85 85c15 15 15 38 0 53-15 15-38 15-53 0l-93-93a38 38 0 0 1-2-2C467 525 462 515 462 504V308c0-21 17-38 38-37 21 0 38 17 37 37v181zM500 833c-184 0-333-149-333-333s149-333 333-333 333 149 333 333-149 333-333 333z m0-68c146 0 265-118 265-265 0-146-118-265-265-265-146 0-265 118-265 265 0 146 118 265 265 265z"></path></g>
<g id="lumo:cog"><path d="M833 458l-81-18c-8-25-17-50-29-75L767 292 708 233l-72 49c-21-12-46-25-75-30L542 167h-84l-19 79c-25 8-50 17-71 30L296 233 233 296l47 69c-12 21-21 46-29 71L167 458v84l84 25c8 25 17 50 29 75L233 708 292 767l76-44c21 12 46 25 75 29L458 833h84l19-81c25-8 50-17 75-29L708 767l59-59-44-66c12-21 25-46 29-75L833 542v-84z m-333 217c-96 0-175-79-175-175 0-96 79-175 175-175 96 0 175 79 175 175 0 96-79 175-175 175z"></path></g>
<g id="lumo:cross"><path d="M445 500l-142-141c-15-15-15-40 0-56 15-15 40-15 56 0L500 445l141-142c15-15 40-15 56 0 15 15 15 40 0 56L555 500l142 141c15 15 15 40 0 56-15 15-40 15-56 0L500 555l-141 142c-15 15-40 15-56 0-15-15-15-40 0-56L445 500z"></path></g>
<g id="lumo:download"><path d="M538 521l125-112c15-14 39-12 53 4 14 15 12 39-4 53l-187 166a38 38 0 0 1 0 0c-14 13-36 12-50 0l-187-166c-15-14-17-37-4-53 14-15 37-17 53-4L462 521V188c0-21 17-38 38-38s38 17 37 38v333zM758 704c0-21 17-38 38-37 21 0 38 17 37 37v92c0 21-17 38-37 37H204c-21 0-38-17-37-37v-92c0-21 17-38 37-37s38 17 38 37v54h516v-54z"></path></g>
<g id="lumo:drag-handle"><path d="M458 292c0 35-28 63-62 62C361 354 333 326 333 292s28-63 63-63c35 0 63 28 62 63Zm0 208c0 35-28 63-62 62-35 0-63-28-63-62s28-63 63-63c35 0 63 28 62 63Zm0 208c0 35-28 63-62 63-35 0-63-28-63-63s28-63 63-62c35 0 63 28 62 62Zm209-416c0 35-28 63-63 62S542 326 542 292s28-63 62-63S667 257 667 292Zm0 208c0 35-28 63-63 62S542 535 542 500s28-63 62-63 63 28 63 63Zm0 208c0 35-28 63-63 63S542 743 542 708s28-63 62-62 63 28 63 62Z"></path></g>
<g id="lumo:dropdown"><path d="M317 393c-15-14-39-13-53 3-14 15-13 39 3 53l206 189c14 13 36 13 50 0l210-193c15-14 17-38 3-53-14-15-38-17-53-3l-185 171L317 393z"></path></g>
<g id="lumo:edit"><path d="M673 281l62 56-205 233c-9 10-38 24-85 39a8 8 0 0 1-5 0c-4-1-7-6-6-10l0 0c14-47 25-76 35-86l204-232z m37-42l52-59c15-17 41-18 58-2 17 16 18 42 3 59L772 295l-62-56zM626 208l-67 75h-226C305 283 283 306 283 333v334C283 695 306 717 333 717h334c28 0 50-22 50-50v-185L792 398v269C792 736 736 792 667 792H333C264 792 208 736 208 667V333C208 264 264 208 333 208h293z"></path></g>
<g id="lumo:error"><path d="M500 833c-184 0-333-149-333-333s149-333 333-333 333 149 333 333-149 333-333 333z m0-68c146 0 265-118 265-265 0-146-118-265-265-265-146 0-265 118-265 265 0 146 118 265 265 265zM479 292h42c12 0 21 9 20 20l-11 217c0 8-6 13-13 13h-34c-7 0-13-6-13-13l-11-217C459 301 468 292 479 292zM483 608h34c12 0 21 9 20 21v33c0 12-9 21-20 21h-34c-12 0-21-9-21-21v-33c0-12 9-21 21-21z"></path></g>
<g id="lumo:eye"><path d="M500 750c-187 0-417-163-417-250s230-250 417-250 417 163 417 250-230 250-417 250z m-336-231c20 22 47 46 78 69C322 644 411 678 500 678s178-34 258-90c31-22 59-46 78-69 6-7 12-14 16-19-4-6-9-12-16-19-20-22-47-46-78-69C678 356 589 322 500 322s-178 34-258 90c-31 22-59 46-78 69-6 7-12 14-16 19 4 6 9 12 16 19zM500 646c-81 0-146-65-146-146s65-146 146-146 146 65 146 146-65 146-146 146z m0-75c39 0 71-32 71-71 0-39-32-71-71-71-39 0-71 32-71 71 0 39 32 71 71 71z"></path></g>
<g id="lumo:eye-disabled"><path d="M396 735l60-60c15 2 30 3 44 3 89 0 178-34 258-90 31-22 59-46 78-69 6-7 12-14 16-19-4-6-9-12-16-19-20-22-47-46-78-69-8-5-15-11-23-15l50-51C862 397 917 458 917 500c0 87-230 250-417 250-34 0-69-5-104-15zM215 654C138 603 83 542 83 500c0-87 230-250 417-250 34 0 69 5 104 15l-59 60c-15-2-30-3-45-3-89 0-178 34-258 90-31 22-59 46-78 69-6 7-12 14-16 19 4 6 9 12 16 19 20 22 47 46 78 69 8 5 16 11 24 16L215 654z m271-9l159-159c0 5 1 9 1 14 0 81-65 146-146 146-5 0-9 0-14-1z m-131-131C354 510 354 505 354 500c0-81 65-146 146-146 5 0 10 0 14 1l-159 159z m-167 257L780 179c12-12 32-12 44 0 12 12 12 32 0 44L232 815c-12 12-32 12-44 0s-12-32 0-44z"></path></g>
<g id="lumo:indent"><path d="M125 219a31 31 0 0 1 31-32h688a31 31 0 0 1 0 63H156A31 31 0 0 1 125 219z m40 134a31 31 0 0 1 45 0l125 125a31 31 0 0 1 0 44l-125 125A31 31 0 0 1 165 603L268 500 165 397a31 31 0 0 1 0-44zM438 406a31 31 0 0 1 31-31h375a31 31 0 0 1 0 63h-375a31 31 0 0 1-32-32z m-1 188a31 31 0 0 1 32-32h375a31 31 0 0 1 0 63h-375a31 31 0 0 1-32-31zM125 781a31 31 0 0 1 31-31h688a31 31 0 0 1 0 63H156a31 31 0 0 1-31-32z m0 0"></path></g>
<g id="lumo:link"><path d="M667 250h-125v79h125c94 0 171 76 170 171a171 171 0 0 1-170 171h-125V750h125a250 250 0 0 0 250-250c0-138-112-250-250-250M163 500c0-95 77-171 170-171h125V250H333a250 250 0 0 0-250 250 250 250 0 0 0 250 250h125v-79H333c-94 0-171-77-171-171M333 542h334v-84H333v84Z"></path></g>
<g id="lumo:menu"><path d="M167 292c0-23 19-42 41-42h584C815 250 833 268 833 292c0 23-19 42-41 41H208C185 333 167 315 167 292z m0 208c0-23 19-42 41-42h584C815 458 833 477 833 500c0 23-19 42-41 42H208C185 542 167 523 167 500z m0 208c0-23 19-42 41-41h584C815 667 833 685 833 708c0 23-19 42-41 42H208C185 750 167 732 167 708z"></path></g>
<g id="lumo:minus"><path d="M261 461c-22 0-39 18-39 39 0 22 18 39 39 39h478c22 0 39-18 39-39 0-22-18-39-39-39H261z"></path></g>
<g id="lumo:ordered-list"><path d="M138 333V198H136l-43 28v-38l45-31h45V333H138z m-61 128c0-35 27-59 68-59 39 0 66 21 66 53 0 20-11 37-43 64l-29 27v2h74V583H80v-30l55-52c26-24 32-33 33-43 0-13-10-22-24-22-15 0-26 10-26 25v1h-41v-1zM123 759v-31h21c15 0 25-8 25-21 0-13-10-21-25-21-15 0-26 9-26 23h-41c1-34 27-56 68-57 39 0 66 20 66 49 0 20-14 36-33 39v3c24 3 40 19 39 41 0 32-30 54-73 54-41 0-69-22-70-57h43c1 13 11 22 28 22 16 0 27-9 27-22 0-14-10-22-28-22h-21zM333 258c0-18 15-33 34-33h516c18 0 33 15 34 33 0 18-15 33-34 34H367c-18 0-33-15-34-34z m0 250c0-18 15-33 34-33h516c18 0 33 15 34 33s-15 33-34 34H367c-18 0-33-15-34-34z m0 250c0-18 15-33 34-33h516c18 0 33 15 34 33s-15 33-34 34H367c-18 0-33-15-34-34z"></path></g>
<g id="lumo:outdent"><path d="M125 219a31 31 0 0 1 31-32h688a31 31 0 0 1 0 63H156A31 31 0 0 1 125 219z m665 134A31 31 0 0 1 835 397L732 500l103 103a31 31 0 0 1-45 44l-125-125a31 31 0 0 1 0-44l125-125zM125 406A31 31 0 0 1 156 375h375a31 31 0 0 1 0 63h-375A31 31 0 0 1 125 406z m0 188a31 31 0 0 1 31-32h375a31 31 0 0 1 0 63h-375a31 31 0 0 1-31-31z m0 187a31 31 0 0 1 31-31h688a31 31 0 0 1 0 63H156a31 31 0 0 1-31-32z m0 0"></path></g>
<g id="lumo:phone"><path d="M296 208l42-37c17-15 44-13 58 4a42 42 0 0 1 5 7L459 282c12 20 5 45-15 57l-7 4c-17 10-25 30-19 48l20 66a420 420 0 0 0 93 157l41 45c13 14 35 17 51 8l7-5c20-12 45-5 57 16L745 777c12 20 5 45-15 57a42 42 0 0 1-8 4l-52 17c-61 21-129 4-174-43l-50-52c-81-85-141-189-175-302l-24-78c-19-62 0-129 49-172z"></path></g>
<g id="lumo:photo"><path d="M208 167h584c69 0 125 56 125 125v416c0 69-56 125-125 125H208c-69 0-125-56-125-125V292c0-69 56-125 125-125z m584 75H208c-28 0-50 22-50 50v416c0 28 22 50 50 50h584c28 0 50-22 50-50V292c0-28-22-50-50-50zM239 740l167-167c12-12 31-14 45-6l73 43 172-201c13-15 34-18 50-7l95 67v92l-111-78-169 199c-12 14-32 17-47 8l-76-43-111 111H229c2-7 5-13 10-18zM458 427C458 490 407 542 344 542S229 490 229 427c0-63 51-115 115-115S458 364 458 427z m-62 0C396 398 373 375 344 375S292 398 292 427c0 29 23 52 52 52s52-23 52-52z"></path></g>
<g id="lumo:play"><path d="M689 528l-298 175c-13 8-34 8-48 0-6-4-10-9-10-14V311C333 300 348 292 367 292c9 0 17 2 24 5l298 175c26 15 26 40 0 56z"></path></g>
<g id="lumo:plus"><path d="M461 461H261c-22 0-39 18-39 39 0 22 18 39 39 39h200v200c0 22 18 39 39 39 22 0 39-18 39-39v-200h200c22 0 39-18 39-39 0-22-18-39-39-39h-200V261c0-22-18-39-39-39-22 0-39 18-39 39v200z"></path></g>
<g id="lumo:redo"><path d="M290 614C312 523 393 458 491 458c55 0 106 22 144 57l-88 88c-3 3-5 7-5 11 0 8 6 15 15 15l193-5c17 0 31-15 31-32l5-192c0-4-1-8-4-11-6-6-16-6-22 0l-66 67C641 406 570 375 491 375c-136 0-248 90-281 215-1 2-1 5-1 8-8 44 45 68 73 32 4-5 7-11 8-16z"></path></g>
<g id="lumo:reload"><path d="M500 233V137c0-9 7-16 15-16 4 0 8 2 10 4l133 140c12 12 12 32 0 45l-133 140c-6 6-15 6-21 0C502 447 500 443 500 438V308c-117 0-212 95-212 213 0 117 95 212 212 212 117 0 212-95 212-212 0-21 17-38 38-38s38 17 37 38c0 159-129 288-287 287-159 0-288-129-288-287 0-159 129-288 288-288z"></path></g>
<g id="lumo:resize-handle"><path d="M772 311c12 12 12 32 0 44L355 772c-12 12-32 12-44 0s-12-32 0-44L728 311c12-12 32-12 44 0Zm0 188c12 12 12 32 0 44l-229 229c-12 12-32 12-44 0-12-12-12-32 0-44l229-229c12-12 32-12 44 0Zm0 187c12 12 12 32 0 44l-42 42c-12 12-32 12-44 0-12-12-12-32 0-44l42-42c12-12 32-12 44 0Z" fill-rule="evenodd" clip-rule="evenodd"></path></g>
<g id="lumo:search"><path d="M662 603l131 131c16 16 16 42 0 59-16 16-43 16-59 0l-131-131C562 691 512 708 458 708c-138 0-250-112-250-250 0-138 112-250 250-250 138 0 250 112 250 250 0 54-17 104-46 145zM458 646c104 0 188-84 188-188S562 271 458 271 271 355 271 458s84 188 187 188z"></path></g>
<g id="lumo:undo"><path d="M710 614C688 523 607 458 509 458c-55 0-106 22-144 57l88 88c3 3 5 7 5 11 0 8-6 15-15 15l-193-5c-17 0-31-15-31-32L214 400c0-4 1-8 4-11 6-6 16-6 22 0l66 67C359 406 430 375 509 375c136 0 248 90 281 215 1 2 1 5 1 8 8 44-45 68-73 32-4-5-7-11-8-16z"></path></g>
<g id="lumo:unordered-list"><path d="M146 325c-42 0-67-26-67-63 0-37 25-63 67-63 42 0 67 26 67 63 0 37-25 63-67 63z m0 250c-42 0-67-26-67-63 0-37 25-63 67-63 42 0 67 26 67 63 0 37-25 63-67 63z m0 250c-42 0-67-26-67-63 0-37 25-63 67-63 42 0 67 26 67 63 0 37-25 63-67 63zM333 258c0-18 15-33 34-33h516c18 0 33 15 34 33 0 18-15 33-34 34H367c-18 0-33-15-34-34z m0 250c0-18 15-33 34-33h516c18 0 33 15 34 33s-15 33-34 34H367c-18 0-33-15-34-34z m0 250c0-18 15-33 34-33h516c18 0 33 15 34 33s-15 33-34 34H367c-18 0-33-15-34-34z"></path></g>
<g id="lumo:upload"><path d="M538 279V612a38 38 0 0 1-76 0V279L337 391a38 38 0 1 1-49-57l187-166a38 38 0 0 1 50 0l187 166a38 38 0 1 1-49 57L538 279zM758 713a38 38 0 1 1 75-1v92a38 38 0 0 1-37 38H204a38 38 0 0 1-37-38v-92a38 38 0 1 1 75 1v54h516v-55z"></path></g>
<g id="lumo:user"><path d="M500 500c-69 0-125-56-125-125s56-125 125-125 125 56 125 125-56 125-125 125z m-292 292c0-115 131-208 292-209s292 93 292 209H208z"></path></g>
</defs></svg>`;
Iconset.register("lumo", 1e3, template);
const loadOnDemand = (key) => {
  return Promise.resolve(0);
};
window.Vaadin = window.Vaadin || {};
window.Vaadin.Flow = window.Vaadin.Flow || {};
window.Vaadin.Flow.loadOnDemand = loadOnDemand;
window.Vaadin.Flow.resetFocus = () => {
  let ae = document.activeElement;
  while (ae && ae.shadowRoot) ae = ae.shadowRoot.activeElement;
  return !ae || ae.blur() || ae.focus() || true;
};
