import ae, { forwardRef as re, useRef as F, useImperativeHandle as oe, useEffect as j } from "react";
var P = { exports: {} }, L = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var X;
function ce() {
  if (X) return L;
  X = 1;
  var p = Symbol.for("react.transitional.element"), e = Symbol.for("react.fragment");
  function t(s, i, l) {
    var a = null;
    if (l !== void 0 && (a = "" + l), i.key !== void 0 && (a = "" + i.key), "key" in i) {
      l = {};
      for (var r in i)
        r !== "key" && (l[r] = i[r]);
    } else l = i;
    return i = l.ref, {
      $$typeof: p,
      type: s,
      key: a,
      ref: i !== void 0 ? i : null,
      props: l
    };
  }
  return L.Fragment = e, L.jsx = t, L.jsxs = t, L;
}
var A = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var K;
function he() {
  return K || (K = 1, process.env.NODE_ENV !== "production" && function() {
    function p(n) {
      if (n == null) return null;
      if (typeof n == "function")
        return n.$$typeof === ie ? null : n.displayName || n.name || null;
      if (typeof n == "string") return n;
      switch (n) {
        case S:
          return "Fragment";
        case T:
          return "Profiler";
        case y:
          return "StrictMode";
        case Q:
          return "Suspense";
        case ee:
          return "SuspenseList";
        case se:
          return "Activity";
      }
      if (typeof n == "object")
        switch (typeof n.tag == "number" && console.error(
          "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
        ), n.$$typeof) {
          case C:
            return "Portal";
          case R:
            return n.displayName || "Context";
          case k:
            return (n._context.displayName || "Context") + ".Consumer";
          case M:
            var u = n.render;
            return n = n.displayName, n || (n = u.displayName || u.name || "", n = n !== "" ? "ForwardRef(" + n + ")" : "ForwardRef"), n;
          case te:
            return u = n.displayName || null, u !== null ? u : p(n.type) || "Memo";
          case _:
            u = n._payload, n = n._init;
            try {
              return p(n(u));
            } catch {
            }
        }
      return null;
    }
    function e(n) {
      return "" + n;
    }
    function t(n) {
      try {
        e(n);
        var u = !1;
      } catch {
        u = !0;
      }
      if (u) {
        u = console;
        var g = u.error, b = typeof Symbol == "function" && Symbol.toStringTag && n[Symbol.toStringTag] || n.constructor.name || "Object";
        return g.call(
          u,
          "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
          b
        ), e(n);
      }
    }
    function s(n) {
      if (n === S) return "<>";
      if (typeof n == "object" && n !== null && n.$$typeof === _)
        return "<...>";
      try {
        var u = p(n);
        return u ? "<" + u + ">" : "<...>";
      } catch {
        return "<...>";
      }
    }
    function i() {
      var n = I.A;
      return n === null ? null : n.getOwner();
    }
    function l() {
      return Error("react-stack-top-frame");
    }
    function a(n) {
      if (q.call(n, "key")) {
        var u = Object.getOwnPropertyDescriptor(n, "key").get;
        if (u && u.isReactWarning) return !1;
      }
      return n.key !== void 0;
    }
    function r(n, u) {
      function g() {
        $ || ($ = !0, console.error(
          "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
          u
        ));
      }
      g.isReactWarning = !0, Object.defineProperty(n, "key", {
        get: g,
        configurable: !0
      });
    }
    function c() {
      var n = p(this.type);
      return z[n] || (z[n] = !0, console.error(
        "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
      )), n = this.props.ref, n !== void 0 ? n : null;
    }
    function h(n, u, g, b, D, B) {
      var v = g.ref;
      return n = {
        $$typeof: O,
        type: n,
        key: u,
        props: g,
        _owner: b
      }, (v !== void 0 ? v : null) !== null ? Object.defineProperty(n, "ref", {
        enumerable: !1,
        get: c
      }) : Object.defineProperty(n, "ref", { enumerable: !1, value: null }), n._store = {}, Object.defineProperty(n._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: 0
      }), Object.defineProperty(n, "_debugInfo", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: null
      }), Object.defineProperty(n, "_debugStack", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: D
      }), Object.defineProperty(n, "_debugTask", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: B
      }), Object.freeze && (Object.freeze(n.props), Object.freeze(n)), n;
    }
    function o(n, u, g, b, D, B) {
      var v = u.children;
      if (v !== void 0)
        if (b)
          if (le(v)) {
            for (b = 0; b < v.length; b++)
              d(v[b]);
            Object.freeze && Object.freeze(v);
          } else
            console.error(
              "React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead."
            );
        else d(v);
      if (q.call(u, "key")) {
        v = p(n);
        var x = Object.keys(u).filter(function(ne) {
          return ne !== "key";
        });
        b = 0 < x.length ? "{key: someKey, " + x.join(": ..., ") + ": ...}" : "{key: someKey}", J[v + b] || (x = 0 < x.length ? "{" + x.join(": ..., ") + ": ...}" : "{}", console.error(
          `A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`,
          b,
          v,
          x,
          v
        ), J[v + b] = !0);
      }
      if (v = null, g !== void 0 && (t(g), v = "" + g), a(u) && (t(u.key), v = "" + u.key), "key" in u) {
        g = {};
        for (var H in u)
          H !== "key" && (g[H] = u[H]);
      } else g = u;
      return v && r(
        g,
        typeof n == "function" ? n.displayName || n.name || "Unknown" : n
      ), h(
        n,
        v,
        g,
        i(),
        D,
        B
      );
    }
    function d(n) {
      m(n) ? n._store && (n._store.validated = 1) : typeof n == "object" && n !== null && n.$$typeof === _ && (n._payload.status === "fulfilled" ? m(n._payload.value) && n._payload.value._store && (n._payload.value._store.validated = 1) : n._store && (n._store.validated = 1));
    }
    function m(n) {
      return typeof n == "object" && n !== null && n.$$typeof === O;
    }
    var f = ae, O = Symbol.for("react.transitional.element"), C = Symbol.for("react.portal"), S = Symbol.for("react.fragment"), y = Symbol.for("react.strict_mode"), T = Symbol.for("react.profiler"), k = Symbol.for("react.consumer"), R = Symbol.for("react.context"), M = Symbol.for("react.forward_ref"), Q = Symbol.for("react.suspense"), ee = Symbol.for("react.suspense_list"), te = Symbol.for("react.memo"), _ = Symbol.for("react.lazy"), se = Symbol.for("react.activity"), ie = Symbol.for("react.client.reference"), I = f.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, q = Object.prototype.hasOwnProperty, le = Array.isArray, V = console.createTask ? console.createTask : function() {
      return null;
    };
    f = {
      react_stack_bottom_frame: function(n) {
        return n();
      }
    };
    var $, z = {}, W = f.react_stack_bottom_frame.bind(
      f,
      l
    )(), G = V(s(l)), J = {};
    A.Fragment = S, A.jsx = function(n, u, g) {
      var b = 1e4 > I.recentlyCreatedOwnerStacks++;
      return o(
        n,
        u,
        g,
        !1,
        b ? Error("react-stack-top-frame") : W,
        b ? V(s(n)) : G
      );
    }, A.jsxs = function(n, u, g) {
      var b = 1e4 > I.recentlyCreatedOwnerStacks++;
      return o(
        n,
        u,
        g,
        !0,
        b ? Error("react-stack-top-frame") : W,
        b ? V(s(n)) : G
      );
    };
  }()), A;
}
var Z;
function de() {
  return Z || (Z = 1, process.env.NODE_ENV === "production" ? P.exports = ce() : P.exports = he()), P.exports;
}
var ue = de();
class fe {
  main;
  // Placeholder
  placeholder;
  // Values
  values;
  single;
  max;
  value;
  valueText;
  valueDelete;
  valueOut;
  // Deselect
  deselect;
  deselectPath;
  // Not a class but whatever
  // Arrow
  arrow;
  arrowClose;
  // Not a class but whatever
  arrowOpen;
  // Not a class but whatever
  // Content
  content;
  contentOpen;
  dirAbove;
  dirBelow;
  // Search
  search;
  searchHighlighter;
  searching;
  addable;
  addablePath;
  // Not a class but whatever
  // List optgroups/options
  list;
  // Optgroup
  optgroup;
  optgroupLabel;
  optgroupLabelText;
  optgroupActions;
  optgroupSelectAll;
  // optgroup select all
  optgroupSelectAllBox;
  // Not a class but whatever
  optgroupSelectAllCheck;
  // Not a class but whatever
  optgroupClosable;
  // Option
  option;
  optionDelete;
  // Not a class but whatever
  highlighted;
  // Misc
  mainOpen;
  close;
  selected;
  error;
  disabled;
  hide;
  constructor(e) {
    e || (e = {}), this.main = e.main || "ss-main", this.placeholder = e.placeholder || "ss-placeholder", this.values = e.values || "ss-values", this.single = e.single || "ss-single", this.max = e.max || "ss-max", this.value = e.value || "ss-value", this.valueText = e.valueText || "ss-value-text", this.valueDelete = e.valueDelete || "ss-value-delete", this.valueOut = e.valueOut || "ss-value-out", this.deselect = e.deselect || "ss-deselect", this.deselectPath = e.deselectPath || "M10,10 L90,90 M10,90 L90,10", this.arrow = e.arrow || "ss-arrow", this.arrowClose = e.arrowClose || "M10,30 L50,70 L90,30", this.arrowOpen = e.arrowOpen || "M10,70 L50,30 L90,70", this.content = e.content || "ss-content", this.contentOpen = e.contentOpen || "ss-open", this.dirAbove = e.dirAbove || "ss-dir-above", this.dirBelow = e.dirBelow || "ss-dir-below", this.search = e.search || "ss-search", this.searchHighlighter = e.searchHighlighter || "ss-search-highlight", this.searching = e.searching || "ss-searching", this.addable = e.addable || "ss-addable", this.addablePath = e.addablePath || "M50,10 L50,90 M10,50 L90,50", this.list = e.list || "ss-list", this.optgroup = e.optgroup || "ss-optgroup", this.optgroupLabel = e.optgroupLabel || "ss-optgroup-label", this.optgroupLabelText = e.optgroupLabelText || "ss-optgroup-label-text", this.optgroupActions = e.optgroupActions || "ss-optgroup-actions", this.optgroupSelectAll = e.optgroupSelectAll || "ss-selectall", this.optgroupSelectAllBox = e.optgroupSelectAllBox || "M60,10 L10,10 L10,90 L90,90 L90,50", this.optgroupSelectAllCheck = e.optgroupSelectAllCheck || "M30,45 L50,70 L90,10", this.optgroupClosable = e.optgroupClosable || "ss-closable", this.option = e.option || "ss-option", this.optionDelete = e.optionDelete || "M10,10 L90,90 M10,90 L90,10", this.highlighted = e.highlighted || "ss-highlighted", this.mainOpen = e.mainOpen || "ss-open", this.close = e.close || "ss-close", this.selected = e.selected || "ss-selected", this.error = e.error || "ss-error", this.disabled = e.disabled || "ss-disabled", this.hide = e.hide || "ss-hide";
  }
}
function Y() {
  return Math.random().toString(36).substring(2, 10);
}
function pe(p, e) {
  function t(i, l) {
    return l && i && i.classList && i.classList.contains(l) || l && i && i.dataset && i.dataset.id && i.dataset.id === e ? i : null;
  }
  function s(i, l) {
    return !i || i === document ? null : t(i, l) ? i : s(i.parentNode, l);
  }
  return t(p, e) || s(p, e);
}
function N(p, e = 50, t = !1) {
  let s;
  return function(...i) {
    const l = self, a = () => {
      s = null, t || p.apply(l, i);
    }, r = t && !s;
    clearTimeout(s), s = setTimeout(a, e), r && p.apply(l, i);
  };
}
function U(p, e) {
  return JSON.stringify(p) === JSON.stringify(e);
}
function me(p) {
  const e = p.replace(/[A-Z\u00C0-\u00D6\u00D8-\u00DE]/g, (t) => "-" + t.toLowerCase());
  return p[0] === p[0].toUpperCase() ? e.substring(1) : e;
}
class E {
  id;
  label;
  selectAll;
  selectAllText;
  closable;
  options;
  constructor(e) {
    if (this.id = !e.id || e.id === "" ? Y() : e.id, this.label = e.label || "", this.selectAll = e.selectAll === void 0 ? !1 : e.selectAll, this.selectAllText = e.selectAllText || "Select All", this.closable = e.closable || "off", this.options = [], e.options)
      for (const t of e.options)
        this.options.push(new w(t));
  }
}
class w {
  id;
  value;
  text;
  html;
  defaultSelected;
  selected;
  display;
  disabled;
  placeholder;
  class;
  style;
  data;
  mandatory;
  constructor(e) {
    this.id = !e.id || e.id === "" ? Y() : e.id, this.value = e.value === void 0 ? e.text || "" : e.value || "", this.text = e.text || "", this.html = e.html || "", this.defaultSelected = e.defaultSelected !== void 0 ? e.defaultSelected : !1, this.selected = e.selected !== void 0 ? e.selected : !1, this.display = e.display !== void 0 ? e.display : !0, this.disabled = e.disabled !== void 0 ? e.disabled : !1, this.mandatory = e.mandatory !== void 0 ? e.mandatory : !1, this.placeholder = e.placeholder !== void 0 ? e.placeholder : !1, this.class = e.class || "", this.style = e.style || "", this.data = e.data || {};
  }
}
class ge {
  selectType = "single";
  // Main data set, never null
  data = [];
  selectedOrder = [];
  constructor(e, t) {
    this.selectType = e, this.setData(t);
  }
  // Validate DataArrayPartial
  validateDataArray(e) {
    if (!Array.isArray(e))
      return new Error("Data must be an array");
    for (let t of e)
      if (t)
        if (t instanceof E || "label" in t) {
          if (!("label" in t))
            return new Error("Optgroup must have a label");
          if ("options" in t && t.options)
            for (let s of t.options) {
              const i = this.validateOption(s);
              if (i)
                return i;
            }
        } else if (t instanceof w || "text" in t) {
          const s = this.validateOption(t);
          if (s)
            return s;
        } else
          return new Error("Data object must be a valid optgroup or option");
    return null;
  }
  // Validate Option
  validateOption(e) {
    return "text" in e ? null : new Error("Option must have a text");
  }
  partialToFullData(e) {
    let t = [];
    return e.forEach((s) => {
      if (s) {
        if (s instanceof E || "label" in s) {
          let i = [];
          "options" in s && s.options && s.options.forEach((l) => {
            i.push(new w(l));
          }), i.length > 0 && t.push(new E(s));
        }
        (s instanceof w || "text" in s) && t.push(new w(s));
      }
    }), t;
  }
  setData(e, t = !1) {
    const s = this.partialToFullData(e);
    if (t) {
      const i = this.getSelectedOptions(), l = [];
      i.forEach((a) => {
        let r = !1;
        for (const c of s) {
          if (c instanceof w && c.id === a.id) {
            r = !0;
            break;
          }
          if (c instanceof E) {
            for (const h of c.options)
              if (h.id === a.id) {
                r = !0;
                break;
              }
          }
        }
        r || l.push(a);
      }), this.data = [...l, ...s];
    } else
      this.data = s;
    this.selectType === "single" && this.setSelectedBy("id", this.getSelected());
  }
  // Get data will return all the data
  getData() {
    return this.filter(null, !0);
  }
  // Get data options will return the data as a
  // flat array of just options
  getDataOptions() {
    return this.filter(null, !1);
  }
  addOption(e, t = !1) {
    if (t) {
      let s = [new w(e)];
      this.setData(s.concat(this.getData()));
    } else
      this.setData(this.getData().concat(new w(e)));
  }
  // Pass in an array of id that will loop through
  // each option and set the selected property to true
  // but also clean selected by determining selectType
  setSelectedBy(e, t) {
    let s = null, i = !1;
    const l = [];
    for (let r of this.data) {
      if (r instanceof E)
        for (let c of r.options)
          s || (s = c), c.selected = i ? !1 : t.includes(c[e]), c.selected && (l.push(c), this.selectType === "single" && (i = !0));
      r instanceof w && (s || (s = r), r.selected = i ? !1 : t.includes(r[e]), r.selected && (l.push(r), this.selectType === "single" && (i = !0)));
    }
    this.selectType === "single" && s && !i && (s.selected = !0, l.push(s));
    const a = t.map((r) => l.find((c) => c[e] === r)?.id || "");
    this.selectedOrder = a;
  }
  getSelected() {
    return this.getSelectedOptions().map((e) => e.id);
  }
  getSelectedValues() {
    return this.getSelectedOptions().map((e) => e.value);
  }
  getSelectedOptions() {
    return this.filter((e) => e.selected, !1);
  }
  getOptgroupByID(e) {
    for (let t of this.data)
      if (t instanceof E && t.id === e)
        return t;
    return null;
  }
  getOptionByID(e) {
    let t = this.filter((s) => s.id === e, !1);
    return t.length ? t[0] : null;
  }
  getSelectType() {
    return this.selectType;
  }
  getFirstOption() {
    let e = null;
    for (let t of this.data)
      if (t instanceof E ? e = t.options[0] : t instanceof w && (e = t), e)
        break;
    return e;
  }
  // Take in search string and return filtered list of values
  search(e, t) {
    return e = e.trim(), e === "" ? this.getData() : this.filter((s) => t(s, e), !0);
  }
  // Filter takes in a function that will be used to filter the data
  // This will also keep optgroups of sub options meet the filter requirements
  filter(e, t) {
    const s = [];
    return this.data.forEach((i) => {
      if (i instanceof E) {
        let l = [];
        if (i.options.forEach((a) => {
          (!e || e(a)) && (t ? l.push(new w(a)) : s.push(new w(a)));
        }), l.length > 0) {
          let a = new E(i);
          a.options = l, s.push(a);
        }
      }
      i instanceof w && (!e || e(i)) && s.push(new w(i));
    }), s;
  }
  // Take in an array of options and reoder them based upon the selected order
  selectedOrderOptions(e) {
    const t = [];
    return this.selectedOrder.forEach((s) => {
      const i = e.find((l) => l.id === s);
      i && t.push(i);
    }), e.forEach((s) => {
      let i = !1;
      t.forEach((l) => {
        if (s.id === l.id) {
          i = !0;
          return;
        }
      }), i || t.push(s);
    }), t;
  }
}
class be {
  settings;
  store;
  callbacks;
  // Used to compute the range selection
  lastSelectedOption;
  // Elements
  main;
  content;
  // Classes
  classes;
  constructor(e, t, s, i) {
    this.store = s, this.settings = e, this.classes = t, this.callbacks = i, this.lastSelectedOption = null, this.main = this.mainDiv(), this.content = this.contentDiv(), this.updateClassStyles(), this.updateAriaAttributes(), this.settings.contentLocation && this.settings.contentLocation.appendChild(this.content.main);
  }
  // Remove disabled classes
  enable() {
    this.main.main.classList.remove(this.classes.disabled), this.main.main.setAttribute("aria-disabled", "false"), this.content.search.input.disabled = !1;
  }
  // Set disabled classes
  disable() {
    this.main.main.classList.add(this.classes.disabled), this.main.main.setAttribute("aria-disabled", "true"), this.content.search.input.disabled = !0;
  }
  open() {
    this.main.arrow.path.setAttribute("d", this.classes.arrowOpen), this.main.main.setAttribute("aria-expanded", "true");
    const t = this.settings.openPosition === "up" ? this.classes.dirAbove : this.classes.dirBelow;
    this.main.main.classList.add(t), this.content.main.classList.add(t), this.content.main.classList.add(this.classes.contentOpen), this.content.search.input.removeAttribute("aria-hidden"), this.moveContent();
    const s = this.store.getSelectedOptions();
    if (s.length) {
      const i = s[s.length - 1].id, l = this.content.list.querySelector('[data-id="' + i + '"]');
      l && this.ensureElementInView(this.content.list, l);
    }
  }
  close() {
    this.main.main.setAttribute("aria-expanded", "false"), this.main.arrow.path.setAttribute("d", this.classes.arrowClose), this.content.main.classList.remove(this.classes.contentOpen), this.content.search.input.setAttribute("aria-hidden", "true"), this.main.main.removeAttribute("aria-activedescendant");
  }
  updateClassStyles() {
    if (this.main.main.className = "", this.main.main.removeAttribute("style"), this.content.main.className = "", this.content.main.removeAttribute("style"), this.main.main.classList.add(this.classes.main), this.content.main.classList.add(this.classes.content), this.settings.style !== "" && (this.main.main.style.cssText = this.settings.style, this.content.main.style.cssText = this.settings.style), this.settings.class.length)
      for (const e of this.settings.class)
        e.trim() !== "" && (this.main.main.classList.add(e.trim()), this.content.main.classList.add(e.trim()));
    (this.settings.contentPosition === "relative" || this.settings.contentPosition === "fixed") && this.content.main.classList.add("ss-" + this.settings.contentPosition);
  }
  updateAriaAttributes() {
    const e = this.content.list.id;
    this.main.main.role = "combobox", this.main.main.setAttribute("aria-haspopup", "listbox"), this.main.main.setAttribute("aria-controls", e), this.main.main.setAttribute("aria-expanded", "false"), this.content.list.setAttribute("role", "listbox"), this.content.list.setAttribute("aria-label", this.settings.ariaLabel + " listbox"), this.settings.isMultiple && this.content.list.setAttribute("aria-multiselectable", "true"), this.content.search.input.setAttribute("aria-controls", e);
  }
  mainDiv() {
    const e = document.createElement("div");
    e.dataset.id = this.settings.id, e.setAttribute("aria-label", this.settings.ariaLabel), e.tabIndex = 0, e.onkeydown = (h) => {
      switch (h.key) {
        case "ArrowUp":
        case "ArrowDown":
          return this.callbacks.open(), h.key === "ArrowDown" ? this.highlight("down") : this.highlight("up"), !1;
        case "Tab":
          return this.callbacks.close(), !0;
        // Continue doing normal tabbing
        case "Enter":
        case " ":
          this.callbacks.open();
          const o = this.content.list.querySelector("." + this.classes.highlighted);
          return o && o.click(), !1;
        case "Escape":
          return this.callbacks.close(), !1;
      }
      return h.key.length === 1 && this.callbacks.open(), !0;
    }, e.onclick = (h) => {
      this.settings.disabled || (this.settings.isOpen ? this.callbacks.close() : this.callbacks.open());
    };
    const t = document.createElement("div");
    t.classList.add(this.classes.values), e.appendChild(t);
    const s = document.createElement("div");
    s.classList.add(this.classes.deselect);
    const i = this.store?.getSelectedOptions();
    !this.settings.allowDeselect || this.settings.isMultiple && i && i.length <= 0 ? s.classList.add(this.classes.hide) : s.classList.remove(this.classes.hide), s.onclick = (h) => {
      if (h.stopPropagation(), this.settings.disabled)
        return;
      let o = !0;
      const d = this.store.getSelectedOptions(), m = [];
      if (this.callbacks.beforeChange && (o = this.callbacks.beforeChange(m, d) === !0), o) {
        if (this.settings.isMultiple)
          this.callbacks.setSelected([], !1), this.updateDeselectAll();
        else {
          const f = this.store.getFirstOption(), O = f ? f.id : "";
          this.callbacks.setSelected(O, !1);
        }
        this.settings.closeOnSelect && this.callbacks.close(), this.callbacks.afterChange && this.callbacks.afterChange(this.store.getSelectedOptions());
      }
    };
    const l = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    l.setAttribute("viewBox", "0 0 100 100");
    const a = document.createElementNS("http://www.w3.org/2000/svg", "path");
    a.setAttribute("d", this.classes.deselectPath), l.appendChild(a), s.appendChild(l), e.appendChild(s);
    const r = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    r.classList.add(this.classes.arrow), r.setAttribute("viewBox", "0 0 100 100");
    const c = document.createElementNS("http://www.w3.org/2000/svg", "path");
    return c.setAttribute("d", this.classes.arrowClose), this.settings.alwaysOpen && r.classList.add(this.classes.hide), r.appendChild(c), e.appendChild(r), {
      main: e,
      values: t,
      deselect: {
        main: s,
        svg: l,
        path: a
      },
      arrow: {
        main: r,
        path: c
      }
    };
  }
  mainFocus(e) {
    e !== "click" && this.main.main.focus({ preventScroll: !0 });
  }
  placeholder() {
    const e = this.store.filter((i) => i.placeholder, !1);
    let t = this.settings.placeholderText;
    e.length && (e[0].html !== "" ? t = e[0].html : e[0].text !== "" && (t = e[0].text));
    const s = document.createElement("div");
    return s.classList.add(this.classes.placeholder), s.innerHTML = t, s;
  }
  // Get selected values and append to multiSelected values container
  // and remove those who shouldnt exist
  renderValues() {
    if (!this.settings.isMultiple) {
      this.renderSingleValue();
      return;
    }
    this.renderMultipleValues(), this.updateDeselectAll();
  }
  renderSingleValue() {
    const e = this.store.filter((s) => s.selected && !s.placeholder, !1), t = e.length > 0 ? e[0] : null;
    if (!t)
      this.main.values.innerHTML = this.placeholder().outerHTML;
    else {
      const s = document.createElement("div");
      s.classList.add(this.classes.single), t.html ? s.innerHTML = t.html : s.innerText = t.text, this.main.values.innerHTML = s.outerHTML;
    }
    !this.settings.allowDeselect || !e.length ? this.main.deselect.main.classList.add(this.classes.hide) : this.main.deselect.main.classList.remove(this.classes.hide);
  }
  renderMultipleValues() {
    let e = this.main.values.childNodes, t = this.store.filter((i) => i.selected && i.display, !1);
    if (t.length === 0) {
      this.main.values.innerHTML = this.placeholder().outerHTML;
      return;
    } else {
      const i = this.main.values.querySelector("." + this.classes.placeholder);
      i && i.remove();
    }
    if (t.length > this.settings.maxValuesShown) {
      const i = document.createElement("div");
      i.classList.add(this.classes.max), i.textContent = this.settings.maxValuesMessage.replace("{number}", t.length.toString()), this.main.values.innerHTML = i.outerHTML;
      return;
    } else {
      const i = this.main.values.querySelector("." + this.classes.max);
      i && i.remove();
    }
    this.settings.keepOrder && (t = this.store.selectedOrderOptions(t));
    let s = [];
    for (let i = 0; i < e.length; i++) {
      const l = e[i], a = l.getAttribute("data-id");
      a && (t.filter((c) => c.id === a, !1).length || s.push(l));
    }
    for (const i of s)
      i.classList.add(this.classes.valueOut), setTimeout(() => {
        this.main.values.hasChildNodes() && this.main.values.contains(i) && this.main.values.removeChild(i);
      }, 100);
    e = this.main.values.childNodes;
    for (let i = 0; i < t.length; i++) {
      let l = !0;
      for (let a = 0; a < e.length; a++)
        t[i].id === String(e[a].dataset.id) && (l = !1);
      l && (this.settings.keepOrder ? this.main.values.appendChild(this.multipleValue(t[i])) : e.length === 0 ? this.main.values.appendChild(this.multipleValue(t[i])) : i === 0 ? this.main.values.insertBefore(this.multipleValue(t[i]), e[i]) : e[i - 1].insertAdjacentElement("afterend", this.multipleValue(t[i])));
    }
  }
  multipleValue(e) {
    const t = document.createElement("div");
    t.classList.add(this.classes.value), t.dataset.id = e.id;
    const s = document.createElement("div");
    if (s.classList.add(this.classes.valueText), s.textContent = e.text, t.appendChild(s), !e.mandatory) {
      const i = document.createElement("div");
      i.classList.add(this.classes.valueDelete), i.setAttribute("tabindex", "0"), i.onclick = (r) => {
        if (r.preventDefault(), r.stopPropagation(), this.settings.disabled)
          return;
        let c = !0;
        const h = this.store.getSelectedOptions(), o = h.filter((d) => d.selected && d.id !== e.id, !0);
        if (!(this.settings.minSelected && o.length < this.settings.minSelected) && (this.callbacks.beforeChange && (c = this.callbacks.beforeChange(o, h) === !0), c)) {
          let d = [];
          for (const m of o) {
            if (m instanceof E)
              for (const f of m.options)
                d.push(f.id);
            m instanceof w && d.push(m.id);
          }
          this.callbacks.setSelected(d, !1), this.settings.closeOnSelect && this.callbacks.close(), this.callbacks.afterChange && this.callbacks.afterChange(o), this.updateDeselectAll();
        }
      };
      const l = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      l.setAttribute("viewBox", "0 0 100 100");
      const a = document.createElementNS("http://www.w3.org/2000/svg", "path");
      a.setAttribute("d", this.classes.optionDelete), l.appendChild(a), i.appendChild(l), t.appendChild(i), i.onkeydown = (r) => {
        r.key === "Enter" && i.click();
      };
    }
    return t;
  }
  contentDiv() {
    const e = document.createElement("div");
    e.dataset.id = this.settings.id;
    const t = this.searchDiv();
    e.appendChild(t.main);
    const s = this.listDiv();
    return e.appendChild(s), {
      main: e,
      search: t,
      list: s
    };
  }
  moveContent() {
    if (this.settings.contentPosition === "relative") {
      this.moveContentBelow();
      return;
    }
    if (this.settings.openPosition === "down") {
      this.moveContentBelow();
      return;
    } else if (this.settings.openPosition === "up") {
      this.moveContentAbove();
      return;
    }
    this.putContent() === "up" ? this.moveContentAbove() : this.moveContentBelow();
  }
  searchDiv() {
    const e = document.createElement("div"), t = document.createElement("input"), s = document.createElement("div");
    e.classList.add(this.classes.search);
    const i = {
      main: e,
      input: t
    };
    if (this.settings.showSearch || (e.classList.add(this.classes.hide), t.readOnly = !0), t.type = "search", t.placeholder = this.settings.searchPlaceholder, t.tabIndex = -1, t.setAttribute("aria-label", this.settings.searchPlaceholder), t.setAttribute("aria-autocomplete", "list"), t.setAttribute("autocapitalize", "off"), t.setAttribute("autocomplete", "off"), t.setAttribute("autocorrect", "off"), t.setAttribute("aria-hidden", "true"), t.oninput = N((l) => {
      this.callbacks.search(l.target.value);
    }, 100), t.onkeydown = (l) => {
      switch (l.key) {
        case "ArrowUp":
        case "ArrowDown":
          return l.key === "ArrowDown" ? this.highlight("down") : this.highlight("up"), !1;
        case "Tab":
          return this.callbacks.close(), !0;
        // Continue doing normal tabbing
        case "Escape":
          return this.callbacks.close(), !1;
        case " ":
          const a = this.content.list.querySelector("." + this.classes.highlighted);
          return a ? (a.click(), !1) : !0;
        case "Enter":
          const r = this.content.list.querySelector("." + this.classes.highlighted);
          return r ? (r.click(), !1) : this.callbacks.addable ? (s.click(), !1) : !0;
      }
      return !0;
    }, e.appendChild(t), this.callbacks.addable) {
      s.classList.add(this.classes.addable);
      const l = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      l.setAttribute("viewBox", "0 0 100 100");
      const a = document.createElementNS("http://www.w3.org/2000/svg", "path");
      a.setAttribute("d", this.classes.addablePath), l.appendChild(a), s.appendChild(l), s.onclick = (r) => {
        if (r.preventDefault(), r.stopPropagation(), !this.callbacks.addable)
          return;
        const c = this.content.search.input.value.trim();
        if (c === "") {
          this.content.search.input.focus();
          return;
        }
        const h = (d) => {
          let m = new w(d);
          if (this.callbacks.addOption(m), this.settings.isMultiple) {
            let f = this.store.getSelected();
            f.push(m.id), this.callbacks.setSelected(f, !0);
          } else
            this.callbacks.setSelected([m.id], !0);
          this.callbacks.search(""), this.settings.closeOnSelect && setTimeout(() => {
            this.callbacks.close();
          }, 100);
        }, o = this.callbacks.addable(c);
        o === !1 || o === void 0 || o === null || (o instanceof Promise ? o.then((d) => {
          typeof d == "string" ? h({
            text: d,
            value: d
          }) : o instanceof Error ? this.renderError(o.message) : h(d);
        }) : typeof o == "string" ? h({
          text: o,
          value: o
        }) : o instanceof Error ? this.renderError(o.message) : h(o));
      }, e.appendChild(s), i.addable = {
        main: s,
        svg: l,
        path: a
      };
    }
    return i;
  }
  searchFocus() {
    this.content.search.input.focus();
  }
  clearSearch() {
    this.content.search.input.value = "";
  }
  getOptions(e = !1, t = !1, s = !1) {
    let i = "." + this.classes.option;
    return e && (i += ":not(." + this.classes.placeholder + ")"), t && (i += ":not(." + this.classes.disabled + ")"), s && (i += ":not(." + this.classes.hide + ")"), Array.from(this.content.list.querySelectorAll(i));
  }
  // highlightUp is used to highlight the previous option in the list
  highlight(e) {
    const t = this.getOptions(!0, !0, !0);
    if (t.length === 0)
      return;
    if (t.length === 1 && !t[0].classList.contains(this.classes.highlighted)) {
      t[0].classList.add(this.classes.highlighted);
      return;
    }
    let s = !1;
    for (const l of t)
      l.classList.contains(this.classes.highlighted) && (s = !0);
    if (!s) {
      for (const l of t)
        if (l.classList.contains(this.classes.selected)) {
          l.classList.add(this.classes.highlighted);
          break;
        }
    }
    for (let l = 0; l < t.length; l++)
      if (t[l].classList.contains(this.classes.highlighted)) {
        const a = t[l];
        a.classList.remove(this.classes.highlighted);
        const r = a.parentElement;
        if (r && r.classList.contains(this.classes.mainOpen)) {
          const o = r.querySelector("." + this.classes.optgroupLabel);
          o && o.click();
        }
        let c = t[e === "down" ? l + 1 < t.length ? l + 1 : 0 : l - 1 >= 0 ? l - 1 : t.length - 1];
        c.classList.add(this.classes.highlighted), this.ensureElementInView(this.content.list, c), c.id && this.main.main.setAttribute("aria-activedescendant", c.id);
        const h = c.parentElement;
        if (h && h.classList.contains(this.classes.close)) {
          const o = h.querySelector("." + this.classes.optgroupLabel);
          o && o.click();
        }
        return;
      }
    const i = t[e === "down" ? 0 : t.length - 1];
    i.classList.add(this.classes.highlighted), i.id && this.main.main.setAttribute("aria-activedescendant", i.id), this.ensureElementInView(this.content.list, i);
  }
  // Create main container that options will reside
  listDiv() {
    const e = document.createElement("div");
    e.classList.add(this.classes.list);
    const t = this.settings.id + "-list";
    return e.id = t, e.dataset.id = t, e;
  }
  renderError(e) {
    this.content.list.innerHTML = "";
    const t = document.createElement("div");
    t.classList.add(this.classes.error), t.textContent = e, this.content.list.appendChild(t);
  }
  renderSearching() {
    this.content.list.innerHTML = "";
    const e = document.createElement("div");
    e.classList.add(this.classes.searching), e.textContent = this.settings.searchingText, this.content.list.appendChild(e);
  }
  // Take in data and add options to
  renderOptions(e) {
    if (this.content.list.innerHTML = "", e.length === 0) {
      const s = document.createElement("div");
      s.classList.add(this.classes.search), this.callbacks.addable ? s.innerHTML = this.settings.addableText.replace("{value}", this.content.search.input.value) : s.innerHTML = this.settings.searchText, this.content.list.appendChild(s);
      return;
    }
    this.settings.allowDeselect && !this.settings.isMultiple && (this.store.filter((i) => i.placeholder, !1).length || this.store.addOption(
      new w({
        text: "",
        value: "",
        selected: !1,
        placeholder: !0
      }),
      !0
    ));
    const t = document.createDocumentFragment();
    for (const s of e) {
      if (s instanceof E) {
        const i = document.createElement("div");
        i.classList.add(this.classes.optgroup);
        const l = document.createElement("div");
        l.classList.add(this.classes.optgroupLabel), i.appendChild(l);
        const a = document.createElement("div");
        a.classList.add(this.classes.optgroupLabelText), a.textContent = s.label, l.appendChild(a);
        const r = document.createElement("div");
        if (r.classList.add(this.classes.optgroupActions), l.appendChild(r), this.settings.isMultiple && s.selectAll) {
          const c = document.createElement("div");
          c.classList.add(this.classes.optgroupSelectAll);
          let h = !0;
          for (const O of s.options)
            if (!O.selected) {
              h = !1;
              break;
            }
          h && c.classList.add(this.classes.selected);
          const o = document.createElement("span");
          o.textContent = s.selectAllText, c.appendChild(o);
          const d = document.createElementNS("http://www.w3.org/2000/svg", "svg");
          d.setAttribute("viewBox", "0 0 100 100"), c.appendChild(d);
          const m = document.createElementNS("http://www.w3.org/2000/svg", "path");
          m.setAttribute("d", this.classes.optgroupSelectAllBox), d.appendChild(m);
          const f = document.createElementNS("http://www.w3.org/2000/svg", "path");
          f.setAttribute("d", this.classes.optgroupSelectAllCheck), d.appendChild(f), c.addEventListener("click", (O) => {
            O.preventDefault(), O.stopPropagation();
            const C = this.store.getSelected();
            if (h) {
              const S = C.filter((y) => {
                for (const T of s.options)
                  if (y === T.id)
                    return !1;
                return !0;
              });
              this.callbacks.setSelected(S, !0);
              return;
            } else {
              const S = C.concat(s.options.map((y) => y.id));
              for (const y of s.options)
                this.store.getOptionByID(y.id) || this.callbacks.addOption(y);
              this.callbacks.setSelected(S, !0);
              return;
            }
          }), r.appendChild(c);
        }
        if (s.closable !== "off") {
          const c = document.createElement("div");
          c.classList.add(this.classes.optgroupClosable);
          const h = document.createElementNS("http://www.w3.org/2000/svg", "svg");
          h.setAttribute("viewBox", "0 0 100 100"), h.classList.add(this.classes.arrow), c.appendChild(h);
          const o = document.createElementNS("http://www.w3.org/2000/svg", "path");
          h.appendChild(o), s.options.some((d) => d.selected) || this.content.search.input.value.trim() !== "" ? (c.classList.add(this.classes.mainOpen), o.setAttribute("d", this.classes.arrowOpen)) : s.closable === "open" ? (i.classList.add(this.classes.mainOpen), o.setAttribute("d", this.classes.arrowOpen)) : s.closable === "close" && (i.classList.add(this.classes.close), o.setAttribute("d", this.classes.arrowClose)), l.addEventListener("click", (d) => {
            d.preventDefault(), d.stopPropagation(), i.classList.contains(this.classes.close) ? (i.classList.remove(this.classes.close), i.classList.add(this.classes.mainOpen), o.setAttribute("d", this.classes.arrowOpen)) : (i.classList.remove(this.classes.mainOpen), i.classList.add(this.classes.close), o.setAttribute("d", this.classes.arrowClose));
          }), r.appendChild(c);
        }
        i.appendChild(l);
        for (const c of s.options)
          i.appendChild(this.option(c)), t.appendChild(i);
      }
      s instanceof w && t.appendChild(this.option(s));
    }
    this.content.list.appendChild(t);
  }
  // Create option div element
  option(e) {
    if (e.placeholder) {
      const s = document.createElement("div");
      return s.classList.add(this.classes.option), s.classList.add(this.classes.hide), s;
    }
    const t = document.createElement("div");
    return t.dataset.id = e.id, t.id = this.settings.id + "-" + e.id, t.classList.add(this.classes.option), t.setAttribute("role", "option"), e.class && e.class.split(" ").forEach((s) => {
      t.classList.add(s);
    }), e.style && (t.style.cssText = e.style), this.settings.searchHighlight && this.content.search.input.value.trim() !== "" ? t.innerHTML = this.highlightText(
      e.html !== "" ? e.html : e.text,
      this.content.search.input.value,
      this.classes.searchHighlighter
    ) : e.html !== "" ? t.innerHTML = e.html : t.textContent = e.text, this.settings.showOptionTooltips && t.textContent && t.setAttribute("title", t.textContent), e.display || t.classList.add(this.classes.hide), e.disabled && t.classList.add(this.classes.disabled), e.selected && this.settings.hideSelected && t.classList.add(this.classes.hide), e.selected ? (t.classList.add(this.classes.selected), t.setAttribute("aria-selected", "true"), this.main.main.setAttribute("aria-activedescendant", t.id)) : (t.classList.remove(this.classes.selected), t.setAttribute("aria-selected", "false")), t.addEventListener("click", (s) => {
      s.preventDefault(), s.stopPropagation();
      const i = this.store.getSelected(), l = s.currentTarget, a = String(l.dataset.id), r = s.ctrlKey || s.metaKey;
      if (e.disabled || !this.settings.isMultiple && e.selected && !this.settings.allowDeselect || this.settings.isMultiple && this.settings.maxSelected <= i.length && !e.selected || this.settings.isMultiple && this.settings.minSelected >= i.length && e.selected && !r)
        return;
      let c = !1;
      const h = this.store.getSelectedOptions();
      let o = [];
      if (this.settings.isMultiple) {
        const d = h.some((f) => f.id === a);
        if (s.shiftKey && this.lastSelectedOption) {
          const f = this.store.getDataOptions(), O = f.findIndex((S) => S.id === this.lastSelectedOption.id), C = f.findIndex((S) => S.id === e.id);
          if (O >= 0 && C >= 0) {
            const S = Math.min(O, C), y = Math.max(O, C), k = f.slice(S, y + 1).filter((R) => !h.find((M) => M.id === R.id));
            h.length + k.length <= this.settings.maxSelected ? o = h.concat(k) : o = h;
          } else
            o = h;
        } else r ? (d ? o = h.filter((f) => f.id !== a) : o = h.concat(e), this.lastSelectedOption = e) : (d ? o = h.filter((f) => f.id !== a) : o = h.concat(e), this.lastSelectedOption = e);
      }
      if (this.settings.isMultiple || (e.selected ? o = [] : o = [e]), this.callbacks.beforeChange || (c = !0), this.callbacks.beforeChange && (this.callbacks.beforeChange(o, h) === !1 ? c = !1 : c = !0), c) {
        this.store.getOptionByID(a) || this.callbacks.addOption(e), this.callbacks.setSelected(
          o.map((f) => f.id),
          !1
        );
        const d = s.ctrlKey || s.metaKey || s.shiftKey;
        this.settings.closeOnSelect && !(this.settings.isMultiple && d) && this.callbacks.close(), this.callbacks.afterChange && this.callbacks.afterChange(o);
      }
    }), t;
  }
  destroy() {
    this.main.main.remove(), this.content.main.remove();
  }
  highlightText(e, t, s) {
    const i = t.trim();
    if (i === "")
      return e;
    const l = i.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), a = document.createElement("div");
    a.innerHTML = e;
    const r = (c) => {
      if (c.nodeType === Node.TEXT_NODE) {
        const h = c.textContent || "", o = new RegExp("(" + l + ")", "i");
        if (o.test(h)) {
          const d = document.createElement("span");
          h.split(o).forEach((f, O) => {
            if (f && o.test(f)) {
              const C = document.createElement("mark");
              C.className = s, C.textContent = f, d.appendChild(C);
            } else f && d.appendChild(document.createTextNode(f));
          }), c.parentNode?.replaceChild(d, c);
        }
      } else c.nodeType === Node.ELEMENT_NODE && Array.from(c.childNodes).forEach((h) => r(h));
    };
    return Array.from(a.childNodes).forEach((c) => r(c)), a.innerHTML;
  }
  moveContentAbove() {
    const e = this.main.main.offsetHeight, t = this.content.main.offsetHeight;
    this.main.main.classList.remove(this.classes.dirBelow), this.main.main.classList.add(this.classes.dirAbove), this.content.main.classList.remove(this.classes.dirBelow), this.content.main.classList.add(this.classes.dirAbove);
    const s = this.main.main.getBoundingClientRect();
    this.content.main.style.margin = "-" + (e + t - 1) + "px 0px 0px 0px", this.content.main.style.top = s.top + s.height + (this.settings.contentPosition === "fixed" ? 0 : window.scrollY) + "px", this.content.main.style.left = s.left + (this.settings.contentPosition === "fixed" ? 0 : window.scrollX) + "px", this.content.main.style.width = s.width + "px";
  }
  moveContentBelow() {
    this.main.main.classList.remove(this.classes.dirAbove), this.main.main.classList.add(this.classes.dirBelow), this.content.main.classList.remove(this.classes.dirAbove), this.content.main.classList.add(this.classes.dirBelow);
    const e = this.main.main.getBoundingClientRect();
    this.content.main.style.margin = "-1px 0px 0px 0px", this.settings.contentPosition !== "relative" && (this.content.main.style.top = e.top + e.height + (this.settings.contentPosition === "fixed" ? 0 : window.scrollY) + "px", this.content.main.style.left = e.left + (this.settings.contentPosition === "fixed" ? 0 : window.scrollX) + "px", this.content.main.style.width = e.width + "px");
  }
  ensureElementInView(e, t) {
    const s = e.scrollTop + e.offsetTop, i = s + e.clientHeight, l = t.offsetTop, a = l + t.clientHeight;
    l < s ? e.scrollTop -= s - l : a > i && (e.scrollTop += a - i);
  }
  putContent() {
    const e = this.main.main.offsetHeight, t = this.main.main.getBoundingClientRect(), s = this.content.main.offsetHeight;
    return window.innerHeight - (t.top + e) <= s && t.top > s ? "up" : "down";
  }
  // Updates deselect based on item count and allowDeselect setting
  updateDeselectAll() {
    if (!this.store || !this.settings)
      return;
    const e = this.store.getSelectedOptions(), t = e && e.length > 0, s = this.settings.isMultiple, i = this.settings.allowDeselect, l = this.main.deselect.main, a = this.classes.hide;
    i && !(s && !t) ? l.classList.remove(a) : l.classList.add(a);
  }
}
class ve {
  select;
  // Mutation observer fields
  onValueChange;
  onClassChange;
  onDisabledChange;
  onOptionsChange;
  // Change observers
  listen = !1;
  observer = null;
  constructor(e) {
    this.select = e, this.valueChange = this.valueChange.bind(this), this.select.addEventListener("change", this.valueChange, {
      // allow bubbling of event
      passive: !0
    }), this.observer = new MutationObserver(this.observeCall.bind(this)), this.changeListen(!0);
  }
  enable() {
    this.select.disabled = !1;
  }
  disable() {
    this.select.disabled = !0;
  }
  hideUI() {
    this.select.tabIndex = -1, this.select.style.position = "absolute", this.select.style.width = "1px", this.select.style.height = "1px", this.select.style.opacity = "0", this.select.style.overflow = "hidden", this.select.style.pointerEvents = "none", this.select.style.margin = "0", this.select.style.padding = "0", this.select.style.borderWidth = "0", this.select.style.clip = "rect(0 0 0 0)", this.select.setAttribute("aria-hidden", "true");
  }
  showUI() {
    this.select.removeAttribute("tabindex"), this.select.style.position = "", this.select.style.width = "", this.select.style.height = "", this.select.style.opacity = "", this.select.style.overflow = "", this.select.style.pointerEvents = "", this.select.style.margin = "", this.select.style.padding = "", this.select.style.borderWidth = "", this.select.style.clip = "", this.select.removeAttribute("aria-hidden");
  }
  changeListen(e) {
    this.listen = e, e && this.observer && this.observer.observe(this.select, {
      subtree: !0,
      // subtree for optgroups options
      childList: !0,
      // children changes
      attributes: !0
      // attributes changes
    }), e || this.observer && this.observer.disconnect();
  }
  // This function get triggers when the select value changes
  // and will call the onValueChange function if it exists
  valueChange(e) {
    return this.listen && this.onValueChange && this.onValueChange(this.getSelectedOptions()), !0;
  }
  observeCall(e) {
    if (!this.listen)
      return;
    let t = !1, s = !1, i = !1;
    for (const l of e) {
      if (l.target === this.select && (l.attributeName === "disabled" && (s = !0), l.attributeName === "class" && (t = !0), l.type === "childList")) {
        for (const a of Array.from(l.addedNodes))
          if (a.nodeName === "OPTION" && a.value === this.select.value) {
            this.select.dispatchEvent(new Event("change"));
            break;
          }
        i = !0;
      }
      (l.target.nodeName === "OPTGROUP" || l.target.nodeName === "OPTION") && (i = !0);
    }
    t && this.onClassChange && this.onClassChange(this.select.className.split(" ")), s && this.onDisabledChange && (this.changeListen(!1), this.onDisabledChange(this.select.disabled), this.changeListen(!0)), i && this.onOptionsChange && (this.changeListen(!1), this.onOptionsChange(this.getData()), this.changeListen(!0));
  }
  // From the select element pull optgroup and options into data
  getData() {
    let e = [];
    const t = this.select.childNodes;
    for (const s of t)
      s.nodeName === "OPTGROUP" && e.push(this.getDataFromOptgroup(s)), s.nodeName === "OPTION" && e.push(this.getDataFromOption(s));
    return e;
  }
  getDataFromOptgroup(e) {
    let t = {
      id: e.id,
      label: e.label,
      selectAll: e.dataset ? e.dataset.selectall === "true" : !1,
      selectAllText: e.dataset ? e.dataset.selectalltext : "Select all",
      closable: e.dataset ? e.dataset.closable : "off",
      options: []
    };
    const s = e.childNodes;
    for (const i of s)
      i.nodeName === "OPTION" && t.options.push(this.getDataFromOption(i));
    return t;
  }
  // From passed in option pull pieces of usable information
  getDataFromOption(e) {
    return {
      id: e.id,
      value: e.value,
      text: e.text,
      html: e.dataset && e.dataset.html ? e.dataset.html : "",
      defaultSelected: e.defaultSelected,
      selected: e.selected,
      display: e.style.display !== "none",
      disabled: e.disabled,
      mandatory: e.dataset ? e.dataset.mandatory === "true" : !1,
      placeholder: e.dataset.placeholder === "true",
      class: e.className,
      style: e.style.cssText,
      data: e.dataset
    };
  }
  getSelectedOptions() {
    let e = [];
    const t = this.select.childNodes;
    for (const s of t) {
      if (s.nodeName === "OPTGROUP") {
        const i = s.childNodes;
        for (const l of i)
          if (l.nodeName === "OPTION") {
            const a = l;
            a.selected && e.push(this.getDataFromOption(a));
          }
      }
      if (s.nodeName === "OPTION") {
        const i = s;
        i.selected && e.push(this.getDataFromOption(i));
      }
    }
    return e;
  }
  getSelectedValues() {
    return this.getSelectedOptions().map((e) => e.value);
  }
  setSelected(e) {
    this.changeListen(!1);
    const t = this.select.childNodes;
    for (const s of t) {
      if (s.nodeName === "OPTGROUP") {
        const l = s.childNodes;
        for (const a of l)
          if (a.nodeName === "OPTION") {
            const r = a;
            r.selected = e.includes(r.id);
          }
      }
      if (s.nodeName === "OPTION") {
        const i = s;
        i.selected = e.includes(i.id);
      }
    }
    this.changeListen(!0);
  }
  // Set selected options by value instead of id
  // This is useful when the id is not known
  // and only the value is known
  // but the value is not unique and can be duplicated
  setSelectedByValue(e) {
    this.changeListen(!1);
    const t = this.select.childNodes;
    for (const s of t) {
      if (s.nodeName === "OPTGROUP") {
        const l = s.childNodes;
        for (const a of l)
          if (a.nodeName === "OPTION") {
            const r = a;
            r.selected = e.includes(r.value);
          }
      }
      if (s.nodeName === "OPTION") {
        const i = s;
        i.selected = e.includes(i.value);
      }
    }
    this.changeListen(!0);
  }
  updateSelect(e, t, s) {
    this.changeListen(!1), e && (this.select.dataset.id = e), t && (this.select.style.cssText = t), s && (this.select.className = "", s.forEach((i) => {
      i.trim() !== "" && this.select.classList.add(i.trim());
    })), this.changeListen(!0);
  }
  updateOptions(e) {
    this.changeListen(!1), this.select.innerHTML = "";
    for (const t of e)
      t instanceof E && this.select.appendChild(this.createOptgroup(t)), t instanceof w && this.select.appendChild(this.createOption(t));
    this.select.dispatchEvent(new Event("change", { bubbles: !0 })), this.changeListen(!0);
  }
  createOptgroup(e) {
    const t = document.createElement("optgroup");
    if (t.id = e.id, t.label = e.label, e.selectAll && (t.dataset.selectAll = "true"), e.closable !== "off" && (t.dataset.closable = e.closable), e.options)
      for (const s of e.options)
        t.appendChild(this.createOption(s));
    return t;
  }
  createOption(e) {
    const t = document.createElement("option");
    return t.id = e.id, t.value = e.value, t.textContent = e.text, e.html !== "" && t.setAttribute("data-html", e.html), t.defaultSelected = e.defaultSelected, t.selected = e.selected, e.disabled && (t.disabled = !0), e.display || (t.style.display = "none"), e.placeholder && t.setAttribute("data-placeholder", "true"), e.mandatory && t.setAttribute("data-mandatory", "true"), e.class && e.class.split(" ").forEach((s) => {
      t.classList.add(s);
    }), e.data && typeof e.data == "object" && Object.keys(e.data).forEach((s) => {
      t.setAttribute("data-" + me(s), e.data[s]);
    }), t;
  }
  destroy() {
    this.changeListen(!1), this.select.removeEventListener("change", this.valueChange), this.observer && (this.observer.disconnect(), this.observer = null), delete this.select.dataset.id, this.showUI();
  }
}
class we {
  id = "";
  // Primary ID for the select
  style = "";
  // Style attribute from the select element
  class = [];
  // Class attribute from the select element
  // Dynamic settings
  isMultiple = !1;
  isOpen = !1;
  isFullOpen = !1;
  intervalMove = null;
  // Fields set from constructor
  disabled;
  alwaysOpen;
  showSearch;
  focusSearch;
  ariaLabel;
  searchPlaceholder;
  searchText;
  searchingText;
  searchHighlight;
  closeOnSelect;
  contentLocation;
  contentPosition;
  openPosition;
  placeholderText;
  allowDeselect;
  hideSelected;
  keepOrder;
  showOptionTooltips;
  minSelected;
  maxSelected;
  timeoutDelay;
  maxValuesShown;
  maxValuesMessage;
  addableText;
  constructor(e) {
    e || (e = {}), this.id = "ss-" + Y(), this.style = e.style || "", this.class = e.class || [], this.disabled = e.disabled !== void 0 ? e.disabled : !1, this.alwaysOpen = e.alwaysOpen !== void 0 ? e.alwaysOpen : !1, this.showSearch = e.showSearch !== void 0 ? e.showSearch : !0, this.focusSearch = e.focusSearch !== void 0 ? e.focusSearch : !0, this.ariaLabel = e.ariaLabel || "Combobox", this.searchPlaceholder = e.searchPlaceholder || "Search", this.searchText = e.searchText || "No Results", this.searchingText = e.searchingText || "Searching...", this.searchHighlight = e.searchHighlight !== void 0 ? e.searchHighlight : !1, this.closeOnSelect = e.closeOnSelect !== void 0 ? e.closeOnSelect : !0, this.contentLocation = e.contentLocation || document.body, this.contentPosition = e.contentPosition || "absolute", this.openPosition = e.openPosition || "auto", this.placeholderText = e.placeholderText !== void 0 ? e.placeholderText : "Select Value", this.allowDeselect = e.allowDeselect !== void 0 ? e.allowDeselect : !1, this.hideSelected = e.hideSelected !== void 0 ? e.hideSelected : !1, this.keepOrder = e.keepOrder !== void 0 ? e.keepOrder : !1, this.showOptionTooltips = e.showOptionTooltips !== void 0 ? e.showOptionTooltips : !1, this.minSelected = e.minSelected || 0, this.maxSelected = e.maxSelected || 1e3, this.timeoutDelay = e.timeoutDelay || 200, this.maxValuesShown = e.maxValuesShown || 20, this.maxValuesMessage = e.maxValuesMessage || "{number} selected", this.addableText = e.addableText || 'Press "Enter" to add {value}';
  }
}
let Oe = class {
  selectEl;
  // Classes
  settings;
  cssClasses;
  select;
  store;
  render;
  // Events
  events = {
    search: void 0,
    searchFilter: (e, t) => e.text.toLowerCase().indexOf(t.toLowerCase()) !== -1,
    addable: void 0,
    beforeChange: void 0,
    afterChange: void 0,
    beforeOpen: void 0,
    afterOpen: void 0,
    beforeClose: void 0,
    afterClose: void 0
  };
  constructor(e) {
    if (this.selectEl = typeof e.select == "string" ? document.querySelector(e.select) : e.select, !this.selectEl) {
      e.events && e.events.error && e.events.error(new Error("Could not find select element"));
      return;
    }
    if (this.selectEl.tagName !== "SELECT") {
      e.events && e.events.error && e.events.error(new Error("Element isnt of type select"));
      return;
    }
    this.selectEl.dataset.ssid && this.destroy(), this.settings = new we(e.settings), this.cssClasses = new fe(e.cssClasses);
    const t = ["beforeOpen", "afterOpen", "beforeClose", "afterClose"];
    for (const a in e.events)
      e.events.hasOwnProperty(a) && (t.indexOf(a) !== -1 ? this.events[a] = N(e.events[a], 100) : this.events[a] = e.events[a]);
    this.settings.disabled = e.settings?.disabled ? e.settings.disabled : this.selectEl.disabled, this.settings.isMultiple = this.selectEl.multiple, this.settings.style = this.selectEl.style.cssText, this.settings.class = this.selectEl.className.split(" "), this.select = new ve(this.selectEl), this.select.updateSelect(this.settings.id, this.settings.style, this.settings.class), this.select.hideUI(), this.select.onValueChange = (a) => {
      this.setSelected(a.map((r) => r.id));
    }, this.select.onClassChange = (a) => {
      this.settings.class = a, this.render.updateClassStyles();
    }, this.select.onDisabledChange = (a) => {
      a ? this.disable() : this.enable();
    }, this.select.onOptionsChange = (a) => {
      this.setData(a);
    }, this.store = new ge(
      this.settings.isMultiple ? "multiple" : "single",
      e.data ? e.data : this.select.getData()
    ), e.data && this.select.updateOptions(this.store.getData());
    const s = {
      open: this.open.bind(this),
      close: this.close.bind(this),
      addable: this.events.addable ? this.events.addable : void 0,
      setSelected: this.setSelected.bind(this),
      addOption: this.addOption.bind(this),
      search: this.search.bind(this),
      beforeChange: this.events.beforeChange,
      afterChange: this.events.afterChange
    };
    this.render = new be(this.settings, this.cssClasses, this.store, s), this.render.renderValues(), this.render.renderOptions(this.store.getData());
    const i = this.selectEl.getAttribute("aria-label"), l = this.selectEl.getAttribute("aria-labelledby");
    i ? this.render.main.main.setAttribute("aria-label", i) : l && this.render.main.main.setAttribute("aria-labelledby", l), this.selectEl.parentNode && this.selectEl.parentNode.insertBefore(this.render.main.main, this.selectEl.nextSibling), window.addEventListener("resize", this.windowResize, !1), this.settings.openPosition === "auto" && window.addEventListener("scroll", this.windowScroll, !1), document.addEventListener("visibilitychange", this.windowVisibilityChange), this.settings.disabled && this.disable(), this.settings.alwaysOpen && this.open(), this.selectEl.slim = this;
  }
  // Set to enabled and remove disabled classes
  enable() {
    this.settings.disabled = !1, this.select.enable(), this.render.enable();
  }
  // Set to disabled and add disabled classes
  disable() {
    this.settings.disabled = !0, this.select.disable(), this.render.disable();
  }
  getData() {
    return this.store.getData();
  }
  setData(e) {
    const t = this.store.getSelected(), s = this.store.validateDataArray(e);
    if (s) {
      this.events.error && this.events.error(s);
      return;
    }
    this.store.setData(e);
    const i = this.store.getData();
    this.select.updateOptions(i), this.render.renderValues(), this.render.renderOptions(i), this.events.afterChange && !U(t, this.store.getSelected()) && this.events.afterChange(this.store.getSelectedOptions());
  }
  getSelected() {
    let e = this.store.getSelectedOptions();
    return this.settings.keepOrder && (e = this.store.selectedOrderOptions(e)), e.map((t) => t.value);
  }
  // Will take in a string or array of strings and set the selected by either the id or value
  setSelected(e, t = !0) {
    const s = this.store.getSelected(), i = this.store.getDataOptions();
    e = Array.isArray(e) ? e : [e];
    const l = [];
    for (const r of e) {
      if (i.find((c) => c.id == r)) {
        l.push(r);
        continue;
      }
      for (const c of i.filter((h) => h.value == r))
        l.push(c.id);
    }
    this.store.setSelectedBy("id", l);
    const a = this.store.getData();
    this.select.updateOptions(a), this.render.renderValues(), this.render.content.search.input.value !== "" ? this.search(this.render.content.search.input.value) : this.render.renderOptions(a), t && this.events.afterChange && !U(s, this.store.getSelected()) && this.events.afterChange(this.store.getSelectedOptions());
  }
  addOption(e) {
    const t = this.store.getSelected();
    this.store.getDataOptions().some((i) => i.value === (e.value ?? e.text)) || this.store.addOption(e);
    const s = this.store.getData();
    this.select.updateOptions(s), this.render.renderValues(), this.render.renderOptions(s), this.events.afterChange && !U(t, this.store.getSelected()) && this.events.afterChange(this.store.getSelectedOptions());
  }
  open() {
    this.settings.disabled || this.settings.isOpen || (this.events.beforeOpen && this.events.beforeOpen(), this.render.open(), this.settings.showSearch && this.settings.focusSearch && this.render.searchFocus(), this.settings.isOpen = !0, setTimeout(() => {
      this.events.afterOpen && this.events.afterOpen(), this.settings.isOpen && (this.settings.isFullOpen = !0), document.addEventListener("click", this.documentClick);
    }, this.settings.timeoutDelay), this.settings.contentPosition === "absolute" && (this.settings.intervalMove && clearInterval(this.settings.intervalMove), this.settings.intervalMove = setInterval(this.render.moveContent.bind(this.render), 500)));
  }
  close(e = null) {
    !this.settings.isOpen || this.settings.alwaysOpen || (this.events.beforeClose && this.events.beforeClose(), this.render.close(), this.render.clearSearch(), this.render.mainFocus(e), this.settings.isOpen = !1, this.settings.isFullOpen = !1, setTimeout(() => {
      this.events.afterClose && this.events.afterClose(), document.removeEventListener("click", this.documentClick);
    }, this.settings.timeoutDelay), this.settings.intervalMove && clearInterval(this.settings.intervalMove));
  }
  // Take in string value and search current options
  search(e) {
    if (this.render.content.search.input.value !== e && (this.render.content.search.input.value = e), !this.events.search) {
      const s = e === "" ? this.store.getData() : this.store.search(e, this.events.searchFilter);
      this.render.renderOptions(s);
      return;
    }
    this.render.renderSearching();
    const t = this.events.search(e, this.store.getSelectedOptions());
    if (t instanceof Promise) {
      t.then((s) => {
        this.store.setData(s, !0), this.select.updateOptions(this.store.getData()), this.render.renderOptions(this.store.getData());
      }).catch((s) => {
        this.render.renderError(typeof s == "string" ? s : s.message);
      });
      return;
    } else Array.isArray(t) ? (this.store.setData(t, !0), this.select.updateOptions(this.store.getData()), this.render.renderOptions(this.store.getData())) : this.render.renderError("Search event must return a promise or an array of data");
  }
  destroy() {
    document.removeEventListener("click", this.documentClick), window.removeEventListener("resize", this.windowResize, !1), this.settings.openPosition === "auto" && window.removeEventListener("scroll", this.windowScroll, !1), document.removeEventListener("visibilitychange", this.windowVisibilityChange), this.store.setData([]), this.render.destroy(), this.select.destroy();
  }
  windowResize = N(() => {
    !this.settings.isOpen && !this.settings.isFullOpen || this.render.moveContent();
  });
  // Event listener for window scrolling
  windowScroll = N(() => {
    !this.settings.isOpen && !this.settings.isFullOpen || this.render.moveContent();
  });
  // Event listener for document click
  documentClick = (e) => {
    this.settings.isOpen && e.target && !pe(e.target, this.settings.id) && this.close(e.type);
  };
  // Event Listener for window visibility change
  windowVisibilityChange = () => {
    document.hidden && this.close();
  };
};
const Se = re(
  ({ data: p, settings: e, events: t, cssClasses: s, value: i, onChange: l, children: a, multiple: r }, c) => {
    const h = F(null), o = F(null), d = F(!0);
    return oe(c, () => ({
      slimSelect: o.current
    })), j(() => {
      if (!h.current) return;
      const m = {
        select: h.current
      };
      p && (m.data = p), e && (m.settings = e), s && (m.cssClasses = s);
      const f = t?.afterChange;
      return m.events = {
        ...t,
        afterChange: (O) => {
          const C = r ? O.map((S) => S.value) : O[0]?.value ?? "";
          l && l(C), f && f(O);
        }
      }, o.current = new Oe(m), i !== void 0 && o.current.setSelected(i, !1), () => {
        o.current && (o.current.destroy(), o.current = null);
      };
    }, []), j(() => {
      if (d.current) {
        d.current = !1;
        return;
      }
      o.current && i !== void 0 && o.current.setSelected(i, !1);
    }, [i]), j(() => {
      o.current && p && !d.current && o.current.setData(p);
    }, [p]), /* @__PURE__ */ ue.jsx("select", { ref: h, multiple: r, children: a });
  }
);
Se.displayName = "SlimSelect";
export {
  E as Optgroup,
  w as Option,
  we as Settings,
  Se as default
};
