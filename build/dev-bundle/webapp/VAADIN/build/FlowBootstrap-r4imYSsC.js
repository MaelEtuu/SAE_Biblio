const init = function(appInitResponse) {
  window.Vaadin = window.Vaadin || {};
  window.Vaadin.Flow = window.Vaadin.Flow || {};
  var apps = {};
  var widgetsets = {};
  var log;
  if (typeof window.console === void 0 || !window.location.search.match(/[&?]debug(&|$)/)) {
    log = function() {
    };
  } else if (typeof window.console.log === "function") {
    log = function() {
      window.console.log.apply(window.console, arguments);
    };
  } else {
    log = window.console.log;
  }
  var isInitializedInDom = function(appId) {
    var appDiv = document.getElementById(appId);
    if (!appDiv) {
      return false;
    }
    for (var i = 0; i < appDiv.childElementCount; i++) {
      var className = appDiv.childNodes[i].className;
      if (className && className.indexOf("v-app-loading") != -1) {
        return false;
      }
    }
    return true;
  };
  window.Vaadin = window.Vaadin || {};
  window.Vaadin.Flow = window.Vaadin.Flow || {};
  window.Vaadin.Flow.flashClass = function(element, className) {
    element.classList.remove(className);
    void element.offsetWidth;
    element.classList.add(className);
    function onAnimationEnd(e) {
      if (e.target === element) {
        element.classList.remove(className);
        element.removeEventListener("animationend", onAnimationEnd);
      }
    }
    element.addEventListener("animationend", onAnimationEnd);
    requestAnimationFrame(function() {
      var style = getComputedStyle(element);
      var animName = style.animationName;
      if (!animName || animName === "none") {
        element.classList.remove(className);
        element.removeEventListener("animationend", onAnimationEnd);
      }
    });
  };
  window.Vaadin.Flow.tryCatchWrapper = function(originalFunction, component) {
    return function() {
      try {
        const result = originalFunction.apply(this, arguments);
        return result;
      } catch (error) {
        console.error(
          `There seems to be an error in ${component}:
${error.message}
Please submit an issue to https://github.com/vaadin/flow-components/issues/new/choose`
        );
      }
    };
  };
  if (!window.Vaadin.Flow.initApplication) {
    window.Vaadin.Flow.clients = window.Vaadin.Flow.clients || {};
    window.Vaadin.Flow.initApplication = function(appId, config2) {
      var testbenchId = appId.replace(/-\d+$/, "");
      if (apps[appId]) {
        if (window.Vaadin && window.Vaadin.Flow && window.Vaadin.Flow.clients && window.Vaadin.Flow.clients[testbenchId] && window.Vaadin.Flow.clients[testbenchId].initializing) {
          throw new Error("Application " + appId + " is already being initialized");
        }
        if (isInitializedInDom(appId)) {
          if (appInitResponse.appConfig.productionMode) {
            throw new Error("Application " + appId + " already initialized");
          }
          var appDiv = document.getElementById(appId);
          for (var i = 0; i < appDiv.childElementCount; i++) {
            appDiv.childNodes[i].remove();
          }
          const getConfig2 = function(name) {
            return config2[name];
          };
          const app2 = {
            getConfig: getConfig2
          };
          apps[appId] = app2;
          if (widgetsets["client"].callback) {
            log("Starting from bootstrap", appId);
            widgetsets["client"].callback(appId);
          } else {
            log("Setting pending startup", appId);
            widgetsets["client"].pendingApps.push(appId);
          }
          return apps[appId];
        }
      }
      log("init application", appId, config2);
      window.Vaadin.Flow.clients[testbenchId] = {
        isActive: function() {
          return true;
        },
        initializing: true,
        productionMode: mode
      };
      var getConfig = function(name) {
        var value = config2[name];
        return value;
      };
      var app = {
        getConfig
      };
      apps[appId] = app;
      var widgetset = "client";
      widgetsets[widgetset] = {
        pendingApps: []
      };
      if (widgetsets[widgetset].callback) {
        log("Starting from bootstrap", appId);
        widgetsets[widgetset].callback(appId);
      } else {
        log("Setting pending startup", appId);
        widgetsets[widgetset].pendingApps.push(appId);
      }
      return app;
    };
    window.Vaadin.Flow.getAppIds = function() {
      var ids = [];
      for (var id in apps) {
        if (Object.prototype.hasOwnProperty.call(apps, id)) {
          ids.push(id);
        }
      }
      return ids;
    };
    window.Vaadin.Flow.getApp = function(appId) {
      return apps[appId];
    };
    window.Vaadin.Flow.registerWidgetset = function(widgetset, callback) {
      log("Widgetset registered", widgetset);
      var ws = widgetsets[widgetset];
      if (ws && ws.pendingApps) {
        ws.callback = callback;
        for (var i = 0; i < ws.pendingApps.length; i++) {
          var appId = ws.pendingApps[i];
          log("Starting from register widgetset", appId);
          callback(appId);
        }
        ws.pendingApps = null;
      }
    };
  }
  log("Flow bootstrap loaded");
  if (appInitResponse.appConfig.productionMode && typeof window.__gwtStatsEvent != "function") {
    window.Vaadin.Flow.gwtStatsEvents = [];
    window.__gwtStatsEvent = function(event) {
      window.Vaadin.Flow.gwtStatsEvents.push(event);
      return true;
    };
  }
  var config = appInitResponse.appConfig;
  var mode = appInitResponse.appConfig.productionMode;
  window.Vaadin.Flow.initApplication(config.appId, config);
};
export {
  init
};
