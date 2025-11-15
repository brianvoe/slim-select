import ae, { forwardRef as re, useRef as V, useImperativeHandle as oe, useEffect as $ } from "react";
var B = { exports: {} }, R = {};
var ee;
function ce() {
  if (ee) return R;
  ee = 1;
  var p = Symbol.for("react.transitional.element"), e = Symbol.for("react.fragment");
  function t(s, i, n) {
    var r = null;
    if (n !== void 0 && (r = "" + n), i.key !== void 0 && (r = "" + i.key), "key" in i) {
      n = {};
      for (var a in i)
        a !== "key" && (n[a] = i[a]);
    } else n = i;
    return i = n.ref, {
      $$typeof: p,
      type: s,
      key: r,
      ref: i !== void 0 ? i : null,
      props: n
    };
  }
  return R.Fragment = e, R.jsx = t, R.jsxs = t, R;
}
var _ = {};
var te;
function he() {
  return te || (te = 1, process.env.NODE_ENV !== "production" && function() {
    function p(l) {
      if (l == null) return null;
      if (typeof l == "function")
        return l.$$typeof === ie ? null : l.displayName || l.name || null;
      if (typeof l == "string") return l;
      switch (l) {
        case L:
          return "Fragment";
        case v:
          return "Profiler";
        case O:
          return "StrictMode";
        case D:
          return "Suspense";
        case P:
          return "SuspenseList";
        case M:
          return "Activity";
      }
      if (typeof l == "object")
        switch (typeof l.tag == "number" && console.error(
          "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
        ), l.$$typeof) {
          case m:
            return "Portal";
          case k:
            return l.displayName || "Context";
          case T:
            return (l._context.displayName || "Context") + ".Consumer";
          case b:
            var u = l.render;
            return l = l.displayName, l || (l = u.displayName || u.name || "", l = l !== "" ? "ForwardRef(" + l + ")" : "ForwardRef"), l;
          case F:
            return u = l.displayName || null, u !== null ? u : p(l.type) || "Memo";
          case A:
            u = l._payload, l = l._init;
            try {
              return p(l(u));
            } catch {
            }
        }
      return null;
    }
    function e(l) {
      return "" + l;
    }
    function t(l) {
      try {
        e(l);
        var u = !1;
      } catch {
        u = !0;
      }
      if (u) {
        u = console;
        var w = u.error, y = typeof Symbol == "function" && Symbol.toStringTag && l[Symbol.toStringTag] || l.constructor.name || "Object";
        return w.call(
          u,
          "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
          y
        ), e(l);
      }
    }
    function s(l) {
      if (l === L) return "<>";
      if (typeof l == "object" && l !== null && l.$$typeof === A)
        return "<...>";
      try {
        var u = p(l);
        return u ? "<" + u + ">" : "<...>";
      } catch {
        return "<...>";
      }
    }
    function i() {
      var l = j.A;
      return l === null ? null : l.getOwner();
    }
    function n() {
      return Error("react-stack-top-frame");
    }
    function r(l) {
      if (J.call(l, "key")) {
        var u = Object.getOwnPropertyDescriptor(l, "key").get;
        if (u && u.isReactWarning) return !1;
      }
      return l.key !== void 0;
    }
    function a(l, u) {
      function w() {
        G || (G = !0, console.error(
          "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
          u
        ));
      }
      w.isReactWarning = !0, Object.defineProperty(l, "key", {
        get: w,
        configurable: !0
      });
    }
    function c() {
      var l = p(this.type);
      return X[l] || (X[l] = !0, console.error(
        "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
      )), l = this.props.ref, l !== void 0 ? l : null;
    }
    function h(l, u, w, y, I, q) {
      var E = w.ref;
      return l = {
        $$typeof: C,
        type: l,
        key: u,
        props: w,
        _owner: y
      }, (E !== void 0 ? E : null) !== null ? Object.defineProperty(l, "ref", {
        enumerable: !1,
        get: c
      }) : Object.defineProperty(l, "ref", { enumerable: !1, value: null }), l._store = {}, Object.defineProperty(l._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: 0
      }), Object.defineProperty(l, "_debugInfo", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: null
      }), Object.defineProperty(l, "_debugStack", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: I
      }), Object.defineProperty(l, "_debugTask", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: q
      }), Object.freeze && (Object.freeze(l.props), Object.freeze(l)), l;
    }
    function o(l, u, w, y, I, q) {
      var E = u.children;
      if (E !== void 0)
        if (y)
          if (ne(E)) {
            for (y = 0; y < E.length; y++)
              d(E[y]);
            Object.freeze && Object.freeze(E);
          } else
            console.error(
              "React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead."
            );
        else d(E);
      if (J.call(u, "key")) {
        E = p(l);
        var N = Object.keys(u).filter(function(le) {
          return le !== "key";
        });
        y = 0 < N.length ? "{key: someKey, " + N.join(": ..., ") + ": ...}" : "{key: someKey}", Q[E + y] || (N = 0 < N.length ? "{" + N.join(": ..., ") + ": ...}" : "{}", console.error(
          `A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`,
          y,
          E,
          N,
          E
        ), Q[E + y] = !0);
      }
      if (E = null, w !== void 0 && (t(w), E = "" + w), r(u) && (t(u.key), E = "" + u.key), "key" in u) {
        w = {};
        for (var Y in u)
          Y !== "key" && (w[Y] = u[Y]);
      } else w = u;
      return E && a(
        w,
        typeof l == "function" ? l.displayName || l.name || "Unknown" : l
      ), h(
        l,
        E,
        w,
        i(),
        I,
        q
      );
    }
    function d(l) {
      g(l) ? l._store && (l._store.validated = 1) : typeof l == "object" && l !== null && l.$$typeof === A && (l._payload.status === "fulfilled" ? g(l._payload.value) && l._payload.value._store && (l._payload.value._store.validated = 1) : l._store && (l._store.validated = 1));
    }
    function g(l) {
      return typeof l == "object" && l !== null && l.$$typeof === C;
    }
    var f = ae, C = Symbol.for("react.transitional.element"), m = Symbol.for("react.portal"), L = Symbol.for("react.fragment"), O = Symbol.for("react.strict_mode"), v = Symbol.for("react.profiler"), T = Symbol.for("react.consumer"), k = Symbol.for("react.context"), b = Symbol.for("react.forward_ref"), D = Symbol.for("react.suspense"), P = Symbol.for("react.suspense_list"), F = Symbol.for("react.memo"), A = Symbol.for("react.lazy"), M = Symbol.for("react.activity"), ie = Symbol.for("react.client.reference"), j = f.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, J = Object.prototype.hasOwnProperty, ne = Array.isArray, U = console.createTask ? console.createTask : function() {
      return null;
    };
    f = {
      react_stack_bottom_frame: function(l) {
        return l();
      }
    };
    var G, X = {}, K = f.react_stack_bottom_frame.bind(
      f,
      n
    )(), Z = U(s(n)), Q = {};
    _.Fragment = L, _.jsx = function(l, u, w) {
      var y = 1e4 > j.recentlyCreatedOwnerStacks++;
      return o(
        l,
        u,
        w,
        !1,
        y ? Error("react-stack-top-frame") : K,
        y ? U(s(l)) : Z
      );
    }, _.jsxs = function(l, u, w) {
      var y = 1e4 > j.recentlyCreatedOwnerStacks++;
      return o(
        l,
        u,
        w,
        !0,
        y ? Error("react-stack-top-frame") : K,
        y ? U(s(l)) : Z
      );
    };
  }()), _;
}
var se;
function de() {
  return se || (se = 1, process.env.NODE_ENV === "production" ? B.exports = ce() : B.exports = he()), B.exports;
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
function W() {
  return Math.random().toString(36).substring(2, 10);
}
function pe(p, e) {
  function t(i, n) {
    return n && i && i.classList && i.classList.contains(n) || n && i && i.dataset && i.dataset.id && i.dataset.id === e ? i : null;
  }
  function s(i, n) {
    return !i || i === document ? null : t(i, n) ? i : s(i.parentNode, n);
  }
  return t(p, e) || s(p, e);
}
function H(p, e = 50, t = !1) {
  let s;
  return function(...i) {
    const n = self, r = () => {
      s = null, t || p.apply(n, i);
    }, a = t && !s;
    clearTimeout(s), s = setTimeout(r, e), a && p.apply(n, i);
  };
}
function z(p, e) {
  return JSON.stringify(p) === JSON.stringify(e);
}
function me(p) {
  const e = p.replace(/[A-Z\u00C0-\u00D6\u00D8-\u00DE]/g, (t) => "-" + t.toLowerCase());
  return p[0] === p[0].toUpperCase() ? e.substring(1) : e;
}
class S {
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
    this.id = !e.id || e.id === "" ? W() : e.id, this.value = e.value === void 0 ? e.text || "" : e.value || "", this.text = e.text || "", this.html = e.html || "", this.defaultSelected = e.defaultSelected !== void 0 ? e.defaultSelected : !1, this.selected = e.selected !== void 0 ? e.selected : !1, this.display = e.display !== void 0 ? e.display : !0, this.disabled = e.disabled !== void 0 ? e.disabled : !1, this.mandatory = e.mandatory !== void 0 ? e.mandatory : !1, this.placeholder = e.placeholder !== void 0 ? e.placeholder : !1, this.class = e.class || "", this.style = e.style || "", this.data = e.data || {};
  }
}
class x {
  id;
  label;
  selectAll;
  selectAllText;
  closable;
  options;
  constructor(e) {
    if (this.id = !e.id || e.id === "" ? W() : e.id, this.label = e.label || "", this.selectAll = e.selectAll === void 0 ? !1 : e.selectAll, this.selectAllText = e.selectAllText || "Select All", this.closable = e.closable || "off", this.options = [], e.options)
      for (const t of e.options)
        this.options.push(new S(t));
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
        if (t instanceof x || "label" in t) {
          if (!("label" in t))
            return new Error("Optgroup must have a label");
          if ("options" in t && t.options)
            for (let s of t.options) {
              const i = this.validateOption(s);
              if (i)
                return i;
            }
        } else if (t instanceof S || "text" in t) {
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
        if (s instanceof x || "label" in s) {
          let i = [];
          "options" in s && s.options && s.options.forEach((n) => {
            i.push(new S(n));
          }), i.length > 0 && t.push(new x(s));
        }
        (s instanceof S || "text" in s) && t.push(new S(s));
      }
    }), t;
  }
  setData(e, t = !1) {
    const s = this.partialToFullData(e);
    if (t) {
      const i = this.getSelectedOptions(), n = [];
      i.forEach((r) => {
        let a = !1;
        for (const c of s) {
          if (c instanceof S && c.id === r.id) {
            a = !0;
            break;
          }
          if (c instanceof x) {
            for (const h of c.options)
              if (h.id === r.id) {
                a = !0;
                break;
              }
          }
        }
        a || n.push(r);
      }), this.data = [...n, ...s];
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
      let s = [new S(e)];
      this.setData(s.concat(this.getData()));
    } else
      this.setData(this.getData().concat(new S(e)));
  }
  // Pass in an array of id that will loop through
  // each option and set the selected property to true
  // but also clean selected by determining selectType
  setSelectedBy(e, t) {
    let s = null, i = !1;
    const n = [];
    for (let a of this.data) {
      if (a instanceof x)
        for (let c of a.options) {
          s || (s = c);
          let h = c[e] || "";
          c.selected = i ? !1 : t.includes(h), c.selected && (n.push(c), this.selectType === "single" && (i = !0));
        }
      a instanceof S && (s || (s = a), a.selected = i ? !1 : t.includes(a[e]), a.selected && (n.push(a), this.selectType === "single" && (i = !0)));
    }
    this.selectType === "single" && s && !i && (s.selected = !0, n.push(s));
    const r = t.map((a) => n.find((c) => c[e] === a)?.id || "");
    this.selectedOrder = r;
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
      if (t instanceof x && t.id === e)
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
      if (t instanceof x ? e = t.options[0] : t instanceof S && (e = t), e)
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
      if (i instanceof x) {
        let n = [];
        if (i.options.forEach((a) => {
          (!e || e(a)) && (t ? n.push(new S(a)) : s.push(new S(a)));
        }), n.length > 0) {
          let a = new x(i);
          a.options = n, s.push(a);
        }
      }
      i instanceof S && (!e || e(i)) && s.push(new S(i));
    }), s;
  }
  // Take in an array of options and reoder them based upon the selected order
  selectedOrderOptions(e) {
    const t = [];
    return this.selectedOrder.forEach((s) => {
      const i = e.find((n) => n.id === s);
      i && t.push(i);
    }), e.forEach((s) => {
      let i = !1;
      t.forEach((n) => {
        if (s.id === n.id) {
          i = !0;
          return;
        }
      }), i || t.push(s);
    }), t;
  }
}
class ve {
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
      const i = s[s.length - 1].id, n = this.content.list.querySelector('[data-id="' + i + '"]');
      n && this.ensureElementInView(this.content.list, n);
    }
  }
  close() {
    this.main.main.setAttribute("aria-expanded", "false"), this.main.arrow.path.setAttribute("d", this.classes.arrowClose), this.content.main.classList.remove(this.classes.contentOpen), this.content.search.input.setAttribute("aria-hidden", "true"), this.main.main.removeAttribute("aria-activedescendant"), setTimeout(() => {
      this.main.main.classList.remove(this.classes.dirAbove, this.classes.dirBelow), this.content.main.classList.remove(this.classes.dirAbove, this.classes.dirBelow);
    }, 100);
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
      const d = this.store.getSelectedOptions(), g = [];
      if (this.callbacks.beforeChange && (o = this.callbacks.beforeChange(g, d) === !0), o) {
        if (this.settings.isMultiple)
          this.callbacks.setSelected([], !1), this.updateDeselectAll();
        else {
          const f = this.store.getFirstOption(), C = f ? f.id : "";
          this.callbacks.setSelected(C, !1);
        }
        this.settings.closeOnSelect && this.callbacks.close(), this.callbacks.afterChange && this.callbacks.afterChange(this.store.getSelectedOptions());
      }
    };
    const n = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    n.setAttribute("viewBox", "0 0 100 100");
    const r = document.createElementNS("http://www.w3.org/2000/svg", "path");
    r.setAttribute("d", this.classes.deselectPath), n.appendChild(r), s.appendChild(n), e.appendChild(s);
    const a = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    a.classList.add(this.classes.arrow), a.setAttribute("viewBox", "0 0 100 100");
    const c = document.createElementNS("http://www.w3.org/2000/svg", "path");
    return c.setAttribute("d", this.classes.arrowClose), this.settings.alwaysOpen && a.classList.add(this.classes.hide), a.appendChild(c), e.appendChild(a), {
      main: e,
      values: t,
      deselect: {
        main: s,
        svg: n,
        path: r
      },
      arrow: {
        main: a,
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
      const n = e[i], r = n.getAttribute("data-id");
      r && (t.filter((c) => c.id === r, !1).length || s.push(n));
    }
    for (const i of s)
      i.classList.add(this.classes.valueOut), setTimeout(() => {
        this.main.values.hasChildNodes() && this.main.values.contains(i) && this.main.values.removeChild(i);
      }, 100);
    e = this.main.values.childNodes;
    for (let i = 0; i < t.length; i++) {
      let n = !0;
      for (let r = 0; r < e.length; r++)
        t[i].id === String(e[r].dataset.id) && (n = !1);
      n && (this.settings.keepOrder ? this.main.values.appendChild(this.multipleValue(t[i])) : e.length === 0 ? this.main.values.appendChild(this.multipleValue(t[i])) : i === 0 ? this.main.values.insertBefore(this.multipleValue(t[i]), e[i]) : e[i - 1].insertAdjacentElement("afterend", this.multipleValue(t[i])));
    }
  }
  multipleValue(e) {
    const t = document.createElement("div");
    t.classList.add(this.classes.value), t.dataset.id = e.id;
    const s = document.createElement("div");
    if (s.classList.add(this.classes.valueText), s.textContent = e.text, t.appendChild(s), !e.mandatory) {
      const i = document.createElement("div");
      i.classList.add(this.classes.valueDelete), i.setAttribute("tabindex", "0"), i.onclick = (a) => {
        if (a.preventDefault(), a.stopPropagation(), this.settings.disabled)
          return;
        let c = !0;
        const h = this.store.getSelectedOptions(), o = h.filter((d) => d.selected && d.id !== e.id, !0);
        if (!(this.settings.minSelected && o.length < this.settings.minSelected) && (this.callbacks.beforeChange && (c = this.callbacks.beforeChange(o, h) === !0), c)) {
          let d = [];
          for (const g of o) {
            if (g instanceof x)
              for (const f of g.options)
                f.id && d.push(f.id);
            g instanceof S && d.push(g.id);
          }
          this.callbacks.setSelected(d, !1), this.settings.closeOnSelect && this.callbacks.close(), this.callbacks.afterChange && this.callbacks.afterChange(o), this.updateDeselectAll();
        }
      };
      const n = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      n.setAttribute("viewBox", "0 0 100 100");
      const r = document.createElementNS("http://www.w3.org/2000/svg", "path");
      r.setAttribute("d", this.classes.optionDelete), n.appendChild(r), i.appendChild(n), t.appendChild(i), i.onkeydown = (a) => {
        a.key === "Enter" && i.click();
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
    if (this.settings.showSearch || (e.classList.add(this.classes.hide), t.readOnly = !0), t.type = "search", t.placeholder = this.settings.searchPlaceholder, t.tabIndex = -1, t.setAttribute("aria-label", this.settings.searchPlaceholder), t.setAttribute("aria-autocomplete", "list"), t.setAttribute("autocapitalize", "off"), t.setAttribute("autocomplete", "off"), t.setAttribute("autocorrect", "off"), t.setAttribute("aria-hidden", "true"), t.oninput = H((n) => {
      this.callbacks.search(n.target.value);
    }, 100), t.onkeydown = (n) => {
      switch (n.key) {
        case "ArrowUp":
        case "ArrowDown":
          return n.key === "ArrowDown" ? this.highlight("down") : this.highlight("up"), !1;
        case "Tab":
          return this.callbacks.close(), !0;
        // Continue doing normal tabbing
        case "Escape":
          return this.callbacks.close(), !1;
        case " ":
          const r = this.content.list.querySelector("." + this.classes.highlighted);
          return r ? (r.click(), !1) : !0;
        case "Enter":
          const a = this.content.list.querySelector("." + this.classes.highlighted);
          return a ? (a.click(), !1) : this.callbacks.addable ? (s.click(), !1) : !0;
      }
      return !0;
    }, e.appendChild(t), this.callbacks.addable) {
      s.classList.add(this.classes.addable);
      const n = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      n.setAttribute("viewBox", "0 0 100 100");
      const r = document.createElementNS("http://www.w3.org/2000/svg", "path");
      r.setAttribute("d", this.classes.addablePath), n.appendChild(r), s.appendChild(n), s.onclick = (a) => {
        if (a.preventDefault(), a.stopPropagation(), !this.callbacks.addable)
          return;
        const c = this.content.search.input.value.trim();
        if (c === "") {
          this.content.search.input.focus();
          return;
        }
        const h = (d) => {
          let g = new S(d);
          if (this.callbacks.addOption(g), this.settings.isMultiple) {
            let f = this.store.getSelected();
            f.push(g.id), this.callbacks.setSelected(f, !0);
          } else
            this.callbacks.setSelected([g.id], !0);
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
        svg: n,
        path: r
      };
    }
    return i;
  }
  searchFocus() {
    this.content.search.input.focus();
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
    for (const n of t)
      n.classList.contains(this.classes.highlighted) && (s = !0);
    if (!s) {
      for (const n of t)
        if (n.classList.contains(this.classes.selected)) {
          n.classList.add(this.classes.highlighted);
          break;
        }
    }
    for (let n = 0; n < t.length; n++)
      if (t[n].classList.contains(this.classes.highlighted)) {
        const r = t[n];
        r.classList.remove(this.classes.highlighted);
        const a = r.parentElement;
        if (a && a.classList.contains(this.classes.mainOpen)) {
          const o = a.querySelector("." + this.classes.optgroupLabel);
          o && o.click();
        }
        let c = t[e === "down" ? n + 1 < t.length ? n + 1 : 0 : n - 1 >= 0 ? n - 1 : t.length - 1];
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
      new S({
        text: "",
        value: "",
        selected: !1,
        placeholder: !0
      }),
      !0
    ));
    const t = document.createDocumentFragment();
    for (const s of e) {
      if (s instanceof x) {
        const i = document.createElement("div");
        i.classList.add(this.classes.optgroup);
        const n = document.createElement("div");
        n.classList.add(this.classes.optgroupLabel), i.appendChild(n);
        const r = document.createElement("div");
        r.classList.add(this.classes.optgroupLabelText), r.textContent = s.label, n.appendChild(r);
        const a = document.createElement("div");
        if (a.classList.add(this.classes.optgroupActions), n.appendChild(a), this.settings.isMultiple && s.selectAll) {
          const c = document.createElement("div");
          c.classList.add(this.classes.optgroupSelectAll);
          let h = !0;
          for (const C of s.options)
            if (!C.selected) {
              h = !1;
              break;
            }
          h && c.classList.add(this.classes.selected);
          const o = document.createElement("span");
          o.textContent = s.selectAllText, c.appendChild(o);
          const d = document.createElementNS("http://www.w3.org/2000/svg", "svg");
          d.setAttribute("viewBox", "0 0 100 100"), c.appendChild(d);
          const g = document.createElementNS("http://www.w3.org/2000/svg", "path");
          g.setAttribute("d", this.classes.optgroupSelectAllBox), d.appendChild(g);
          const f = document.createElementNS("http://www.w3.org/2000/svg", "path");
          f.setAttribute("d", this.classes.optgroupSelectAllCheck), d.appendChild(f), c.addEventListener("click", (C) => {
            C.preventDefault(), C.stopPropagation();
            const m = this.store.getSelected();
            if (h) {
              const L = m.filter((O) => {
                for (const v of s.options)
                  if (O === v.id)
                    return !1;
                return !0;
              });
              this.callbacks.setSelected(L, !0);
              return;
            } else {
              let L = s.options.map((v) => v.id).filter((v) => v !== void 0);
              const O = m.concat(L);
              for (const v of s.options)
                v.id && !this.store.getOptionByID(v.id) && this.callbacks.addOption(new S(v));
              this.callbacks.setSelected(O, !0);
              return;
            }
          }), a.appendChild(c);
        }
        if (s.closable !== "off") {
          const c = document.createElement("div");
          c.classList.add(this.classes.optgroupClosable);
          const h = document.createElementNS("http://www.w3.org/2000/svg", "svg");
          h.setAttribute("viewBox", "0 0 100 100"), h.classList.add(this.classes.arrow), c.appendChild(h);
          const o = document.createElementNS("http://www.w3.org/2000/svg", "path");
          h.appendChild(o), s.options.some((d) => d.selected) || this.content.search.input.value.trim() !== "" ? (c.classList.add(this.classes.mainOpen), o.setAttribute("d", this.classes.arrowOpen)) : s.closable === "open" ? (i.classList.add(this.classes.mainOpen), o.setAttribute("d", this.classes.arrowOpen)) : s.closable === "close" && (i.classList.add(this.classes.close), o.setAttribute("d", this.classes.arrowClose)), n.addEventListener("click", (d) => {
            d.preventDefault(), d.stopPropagation(), i.classList.contains(this.classes.close) ? (i.classList.remove(this.classes.close), i.classList.add(this.classes.mainOpen), o.setAttribute("d", this.classes.arrowOpen)) : (i.classList.remove(this.classes.mainOpen), i.classList.add(this.classes.close), o.setAttribute("d", this.classes.arrowClose));
          }), a.appendChild(c);
        }
        i.appendChild(n);
        for (const c of s.options)
          i.appendChild(this.option(new S(c))), t.appendChild(i);
      }
      s instanceof S && t.appendChild(this.option(s));
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
      const i = this.store.getSelected(), n = s.currentTarget, r = String(n.dataset.id), a = s.ctrlKey || s.metaKey;
      if (e.disabled || !this.settings.isMultiple && e.selected && !this.settings.allowDeselect || e.selected && e.mandatory || this.settings.isMultiple && this.settings.maxSelected <= i.length && !e.selected || this.settings.isMultiple && this.settings.minSelected >= i.length && e.selected && !a)
        return;
      let c = !1;
      const h = this.store.getSelectedOptions();
      let o = [];
      if (this.settings.isMultiple) {
        const d = h.some((f) => f.id === r);
        if (s.shiftKey && this.lastSelectedOption) {
          const f = this.store.getDataOptions(), C = f.findIndex((L) => L.id === this.lastSelectedOption.id), m = f.findIndex((L) => L.id === e.id);
          if (C >= 0 && m >= 0) {
            const L = Math.min(C, m), O = Math.max(C, m), T = f.slice(L, O + 1).filter((k) => !h.find((b) => b.id === k.id));
            h.length + T.length <= this.settings.maxSelected ? o = h.concat(T) : o = h;
          } else
            o = h;
        } else a ? (d ? o = h.filter((f) => f.id !== r) : o = h.concat(e), this.lastSelectedOption = e) : (d ? o = h.filter((f) => f.id !== r) : o = h.concat(e), this.lastSelectedOption = e);
      }
      if (this.settings.isMultiple || (e.selected ? o = [] : o = [e]), this.callbacks.beforeChange || (c = !0), this.callbacks.beforeChange && (this.callbacks.beforeChange(o, h) === !1 ? c = !1 : c = !0), c) {
        this.store.getOptionByID(r) || this.callbacks.addOption(e), this.callbacks.setSelected(
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
    const n = i.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), r = document.createElement("div");
    r.innerHTML = e;
    const a = (c) => {
      if (c.nodeType === Node.TEXT_NODE) {
        const h = c.textContent || "", o = new RegExp("(" + n + ")", "i");
        if (o.test(h)) {
          const d = document.createElement("span");
          h.split(o).forEach((f, C) => {
            if (f && o.test(f)) {
              const m = document.createElement("mark");
              m.className = s, m.textContent = f, d.appendChild(m);
            } else f && d.appendChild(document.createTextNode(f));
          }), c.parentNode?.replaceChild(d, c);
        }
      } else c.nodeType === Node.ELEMENT_NODE && Array.from(c.childNodes).forEach((h) => a(h));
    };
    return Array.from(r.childNodes).forEach((c) => a(c)), r.innerHTML;
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
    const s = e.scrollTop + e.offsetTop, i = s + e.clientHeight, n = t.offsetTop, r = n + t.clientHeight;
    n < s ? e.scrollTop -= s - n : r > i && (e.scrollTop += r - i);
  }
  putContent() {
    const e = this.main.main.offsetHeight, t = this.main.main.getBoundingClientRect(), s = this.content.main.offsetHeight;
    return window.innerHeight - (t.top + e) <= s && t.top > s ? "up" : "down";
  }
  // Updates deselect based on item count and allowDeselect setting
  updateDeselectAll() {
    if (!this.store || !this.settings)
      return;
    const e = this.store.getSelectedOptions(), t = e && e.length > 0, s = this.settings.isMultiple, i = this.settings.allowDeselect, n = this.main.deselect.main, r = this.classes.hide;
    i && !(s && !t) ? n.classList.remove(r) : n.classList.add(r);
  }
}
class be {
  select;
  // Mutation observer fields
  onValueChange;
  onClassChange;
  onDisabledChange;
  onOptionsChange;
  onLabelClick;
  // Change observers
  listen = !1;
  observer = null;
  isUpdating = !1;
  pendingOptionsChange = null;
  // Event handlers for preventing native select behavior (especially on iOS Safari)
  preventNativeSelect = null;
  preventNativeSelectMousedown = null;
  preventNativeSelectFocus = null;
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
    this.select.tabIndex = -1, this.select.style.position = "absolute", this.select.style.width = "1px", this.select.style.height = "1px", this.select.style.opacity = "0", this.select.style.overflow = "hidden", this.select.style.pointerEvents = "none", this.select.style.margin = "0", this.select.style.padding = "0", this.select.style.borderWidth = "0", this.select.style.clip = "rect(0 0 0 0)", this.select.setAttribute("aria-hidden", "true"), this.preventNativeSelect || (this.preventNativeSelect = (e) => {
      e.preventDefault(), e.stopPropagation(), e.stopImmediatePropagation();
    }, this.preventNativeSelectMousedown = (e) => {
      e.preventDefault(), e.stopPropagation(), e.stopImmediatePropagation();
    }, this.preventNativeSelectFocus = (e) => {
      e.preventDefault(), e.stopPropagation(), e.stopImmediatePropagation();
    }, this.select.addEventListener("click", this.preventNativeSelect, { capture: !0, passive: !1 }), this.select.addEventListener("mousedown", this.preventNativeSelectMousedown, { capture: !0, passive: !1 }), this.select.addEventListener("focus", this.preventNativeSelectFocus, { capture: !0, passive: !1 }));
  }
  showUI() {
    this.select.removeAttribute("tabindex"), this.select.style.position = "", this.select.style.width = "", this.select.style.height = "", this.select.style.opacity = "", this.select.style.overflow = "", this.select.style.pointerEvents = "", this.select.style.margin = "", this.select.style.padding = "", this.select.style.borderWidth = "", this.select.style.clip = "", this.select.removeAttribute("aria-hidden"), this.preventNativeSelect && (this.select.removeEventListener("click", this.preventNativeSelect, { capture: !0 }), this.preventNativeSelect = null), this.preventNativeSelectMousedown && (this.select.removeEventListener("mousedown", this.preventNativeSelectMousedown, { capture: !0 }), this.preventNativeSelectMousedown = null), this.preventNativeSelectFocus && (this.select.removeEventListener("focus", this.preventNativeSelectFocus, { capture: !0 }), this.preventNativeSelectFocus = null);
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
    for (const n of e) {
      if (n.target === this.select && (n.attributeName === "disabled" && (s = !0), n.attributeName === "class" && (t = !0), n.type === "childList")) {
        for (const r of Array.from(n.addedNodes))
          if (r.nodeName === "OPTION" && r.value === this.select.value) {
            this.select.dispatchEvent(new Event("change"));
            break;
          }
        i = !0;
      }
      (n.target.nodeName === "OPTGROUP" || n.target.nodeName === "OPTION") && (i = !0);
    }
    if (t && this.onClassChange && this.onClassChange(this.select.className.split(" ")), s && this.onDisabledChange && (this.changeListen(!1), this.onDisabledChange(this.select.disabled), this.changeListen(!0)), i && this.onOptionsChange) {
      if (this.isUpdating) {
        if (this.select.options.length > 0) {
          const n = this.getData();
          n.length > 0 && (this.pendingOptionsChange = n);
        }
        return;
      }
      this.changeListen(!1), this.onOptionsChange(this.getData()), this.changeListen(!0);
    }
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
        for (const n of i)
          if (n.nodeName === "OPTION") {
            const r = n;
            r.selected && e.push(this.getDataFromOption(r));
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
        const n = s.childNodes;
        for (const r of n)
          if (r.nodeName === "OPTION") {
            const a = r;
            a.selected = e.includes(a.id);
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
        const n = s.childNodes;
        for (const r of n)
          if (r.nodeName === "OPTION") {
            const a = r;
            a.selected = e.includes(a.value);
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
    if (!(!e || e.length === 0)) {
      this.isUpdating = !0, this.pendingOptionsChange = null, this.changeListen(!1), this.select.innerHTML = "";
      for (const t of e)
        t instanceof x && this.select.appendChild(this.createOptgroup(t)), t instanceof S && this.select.appendChild(this.createOption(t));
      if (this.select.dispatchEvent(new Event("change", { bubbles: !0 })), this.changeListen(!0), this.isUpdating = !1, this.pendingOptionsChange !== null) {
        const t = this.pendingOptionsChange;
        t.length > 0 && this.onOptionsChange ? (this.pendingOptionsChange = null, this.changeListen(!1), this.onOptionsChange(t), this.changeListen(!0)) : this.pendingOptionsChange = null;
      }
    }
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
  // Find and handle labels associated with this select
  setupLabelHandlers() {
    const e = [], t = this.select.id;
    t && document.querySelectorAll(`label[for="${t}"]`).forEach((r) => e.push(r));
    let s = this.select.parentElement;
    for (; s && s !== document.body; ) {
      if (s.tagName === "LABEL") {
        e.push(s);
        break;
      }
      s = s.parentElement;
    }
    Array.from(new Set(e)).forEach((n) => {
      if (n.__slimSelectLabelHandler)
        return;
      const r = (a) => {
        a.preventDefault(), a.stopPropagation(), this.onLabelClick && setTimeout(() => {
          this.onLabelClick();
        }, 0);
      };
      n.__slimSelectLabelHandler = r, n.addEventListener("click", r, { capture: !0, passive: !1 });
    });
  }
  // Remove label handlers
  removeLabelHandlers() {
    const e = [], t = this.select.id;
    t && document.querySelectorAll(`label[for="${t}"]`).forEach((r) => e.push(r));
    let s = this.select.parentElement;
    for (; s && s !== document.body; ) {
      if (s.tagName === "LABEL") {
        e.push(s);
        break;
      }
      s = s.parentElement;
    }
    Array.from(new Set(e)).forEach((n) => {
      const r = n.__slimSelectLabelHandler;
      r && (n.removeEventListener("click", r, { capture: !0 }), delete n.__slimSelectLabelHandler);
    });
  }
  destroy() {
    this.changeListen(!1), this.select.removeEventListener("change", this.valueChange), this.preventNativeSelect && (this.select.removeEventListener("click", this.preventNativeSelect, { capture: !0 }), this.preventNativeSelect = null), this.preventNativeSelectMousedown && (this.select.removeEventListener("mousedown", this.preventNativeSelectMousedown, { capture: !0 }), this.preventNativeSelectMousedown = null), this.preventNativeSelectFocus && (this.select.removeEventListener("focus", this.preventNativeSelectFocus, { capture: !0 }), this.preventNativeSelectFocus = null), this.observer && (this.observer.disconnect(), this.observer = null), this.removeLabelHandlers(), delete this.select.dataset.id, this.showUI();
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
    e || (e = {}), this.id = "ss-" + W(), this.style = e.style || "", this.class = e.class || [], this.disabled = e.disabled !== void 0 ? e.disabled : !1, this.alwaysOpen = e.alwaysOpen !== void 0 ? e.alwaysOpen : !1, this.showSearch = e.showSearch !== void 0 ? e.showSearch : !0, this.focusSearch = e.focusSearch !== void 0 ? e.focusSearch : !0, this.ariaLabel = e.ariaLabel || "Combobox", this.searchPlaceholder = e.searchPlaceholder || "Search...", this.searchText = e.searchText || "No Results", this.searchingText = e.searchingText || "Searching...", this.searchHighlight = e.searchHighlight !== void 0 ? e.searchHighlight : !1, this.closeOnSelect = e.closeOnSelect !== void 0 ? e.closeOnSelect : !0, this.contentLocation = e.contentLocation || document.body, this.contentPosition = e.contentPosition || "absolute", this.openPosition = e.openPosition || "auto", this.placeholderText = e.placeholderText !== void 0 ? e.placeholderText : "Select Value", this.allowDeselect = e.allowDeselect !== void 0 ? e.allowDeselect : !1, this.hideSelected = e.hideSelected !== void 0 ? e.hideSelected : !1, this.keepOrder = e.keepOrder !== void 0 ? e.keepOrder : !1, this.showOptionTooltips = e.showOptionTooltips !== void 0 ? e.showOptionTooltips : !1, this.minSelected = e.minSelected || 0, this.maxSelected = e.maxSelected || 1e3, this.timeoutDelay = e.timeoutDelay || 200, this.maxValuesShown = e.maxValuesShown || 20, this.maxValuesMessage = e.maxValuesMessage || "{number} selected", this.addableText = e.addableText || 'Press "Enter" to add {value}';
  }
}
let Se = class {
  selectEl;
  // Classes
  settings;
  cssClasses;
  select;
  store;
  render;
  // Timeout tracking for cleanup
  openTimeout = null;
  closeTimeout = null;
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
      e.events.hasOwnProperty(a) && (t.indexOf(a) !== -1 ? this.events[a] = H(e.events[a], 100) : this.events[a] = e.events[a]);
    this.settings.disabled = e.settings?.disabled ? e.settings.disabled : this.selectEl.disabled, this.settings.isMultiple = this.selectEl.multiple, this.settings.style = this.selectEl.style.cssText, this.settings.class = this.selectEl.className.split(" "), this.select = new be(this.selectEl), this.selectEl.id || (this.selectEl.id = this.settings.id), this.select.updateSelect(this.settings.id, this.settings.style, this.settings.class), this.select.hideUI(), this.select.onValueChange = (a) => {
      this.setSelected(a.map((c) => c.id));
    }, this.select.onClassChange = (a) => {
      this.settings.class = a, this.render.updateClassStyles();
    }, this.select.onDisabledChange = (a) => {
      a ? this.disable() : this.enable();
    }, this.select.onOptionsChange = (a) => {
      this.setData(a || []);
    }, this.select.onLabelClick = () => {
      this.settings.disabled || this.open();
    };
    const s = e.data ? e.data : this.select.getData();
    this.store = new ge(this.settings.isMultiple ? "multiple" : "single", s), e.data && this.select.updateOptions(this.store.getData());
    const i = {
      open: this.open.bind(this),
      close: this.close.bind(this),
      addable: this.events.addable ? this.events.addable : void 0,
      setSelected: this.setSelected.bind(this),
      addOption: this.addOption.bind(this),
      search: this.search.bind(this),
      beforeChange: this.events.beforeChange,
      afterChange: this.events.afterChange
    };
    this.render = new ve(this.settings, this.cssClasses, this.store, i), this.render.renderValues(), this.render.renderOptions(this.store.getData());
    const n = this.selectEl.getAttribute("aria-label"), r = this.selectEl.getAttribute("aria-labelledby");
    n ? this.render.main.main.setAttribute("aria-label", n) : r && this.render.main.main.setAttribute("aria-labelledby", r), this.selectEl.parentNode && this.selectEl.parentNode.insertBefore(this.render.main.main, this.selectEl.nextSibling), window.addEventListener("resize", this.windowResize, !1), this.settings.openPosition === "auto" && window.addEventListener("scroll", this.windowScroll, !1), document.addEventListener("visibilitychange", this.windowVisibilityChange), this.settings.disabled && this.disable(), this.settings.alwaysOpen && this.open(), this.select.setupLabelHandlers(), this.selectEl.slim = this;
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
    this.select.updateOptions(i), this.render.renderValues(), this.render.renderOptions(i), this.events.afterChange && !z(t, this.store.getSelected()) && this.events.afterChange(this.store.getSelectedOptions());
  }
  getSelected() {
    let e = this.store.getSelectedOptions();
    return this.settings.keepOrder && (e = this.store.selectedOrderOptions(e)), e.map((t) => t.value);
  }
  // Will take in a string or array of strings and set the selected by either the id or value
  setSelected(e, t = !0) {
    const s = this.store.getSelected(), i = this.store.getDataOptions();
    e = Array.isArray(e) ? e : [e];
    const n = [];
    for (const a of e) {
      if (i.find((c) => c.id == a)) {
        n.push(a);
        continue;
      }
      for (const c of i.filter((h) => h.value == a))
        n.push(c.id);
    }
    this.store.setSelectedBy("id", n);
    const r = this.store.getData();
    this.select.updateOptions(r), this.render.renderValues(), this.render.content.search.input.value !== "" ? this.search(this.render.content.search.input.value) : this.render.renderOptions(r), t && this.events.afterChange && !z(s, this.store.getSelected()) && this.events.afterChange(this.store.getSelectedOptions());
  }
  addOption(e) {
    const t = this.store.getSelected();
    this.store.getDataOptions().some((i) => i.value === (e.value ?? e.text)) || this.store.addOption(e);
    const s = this.store.getData();
    this.select.updateOptions(s), this.render.renderValues(), this.render.renderOptions(s), this.events.afterChange && !z(t, this.store.getSelected()) && this.events.afterChange(this.store.getSelectedOptions());
  }
  open() {
    this.settings.disabled || this.settings.isOpen || (this.events.beforeOpen && this.events.beforeOpen(), this.render.open(), this.settings.showSearch && this.settings.focusSearch && this.render.searchFocus(), this.settings.isOpen = !0, this.openTimeout = setTimeout(() => {
      this.events.afterOpen && this.events.afterOpen(), this.settings.isOpen && (this.settings.isFullOpen = !0), document.addEventListener("click", this.documentClick);
    }, this.settings.timeoutDelay), this.settings.contentPosition === "absolute" && (this.settings.intervalMove && clearInterval(this.settings.intervalMove), this.settings.intervalMove = setInterval(this.render.moveContent.bind(this.render), 500)));
  }
  close(e = null) {
    !this.settings.isOpen || this.settings.alwaysOpen || (this.events.beforeClose && this.events.beforeClose(), this.render.close(), this.render.content.search.input.value !== "" && this.search(""), this.render.mainFocus(e), this.settings.isOpen = !1, this.settings.isFullOpen = !1, this.closeTimeout = setTimeout(() => {
      this.events.afterClose && this.events.afterClose(), document.removeEventListener("click", this.documentClick);
    }, this.settings.timeoutDelay), this.settings.intervalMove && clearInterval(this.settings.intervalMove));
  }
  // Take in string value and search current options
  search(e) {
    if (this.render.content.search.input.value !== e && (this.render.content.search.input.value = e), e === "") {
      this.render.renderOptions(this.store.getData());
      return;
    }
    if (!this.events.search) {
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
    this.openTimeout && (clearTimeout(this.openTimeout), this.openTimeout = null), this.closeTimeout && (clearTimeout(this.closeTimeout), this.closeTimeout = null), this.settings.intervalMove && (clearInterval(this.settings.intervalMove), this.settings.intervalMove = null), document.removeEventListener("click", this.documentClick), window.removeEventListener("resize", this.windowResize, !1), this.settings.openPosition === "auto" && window.removeEventListener("scroll", this.windowScroll, !1), document.removeEventListener("visibilitychange", this.windowVisibilityChange), this.store.setData([]), this.render.destroy(), this.select.destroy();
  }
  windowResize = H(() => {
    !this.settings.isOpen && !this.settings.isFullOpen || this.render.moveContent();
  });
  // Event listener for window scrolling
  windowScroll = H(() => {
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
const Oe = re(
  ({ data: p, settings: e, events: t, cssClasses: s, value: i, onChange: n, children: r, multiple: a }, c) => {
    const h = V(null), o = V(null), d = V(!0), g = V(i);
    oe(c, () => ({
      slimSelect: o.current
    }));
    const f = (m) => typeof m == "string" ? a ? [m] : m : Array.isArray(m) ? a ? m : m[0] : a ? [] : "", C = (m, L = !1) => {
      if (!o.current || m === void 0)
        return;
      const O = f(m), T = o.current.getData().flatMap((b) => "label" in b ? b.options : [b]);
      if (!(Array.isArray(O) ? O.length > 0 && O.every((b) => T.some((D) => D.value === b)) : O !== "" && T.some((b) => b.value === O)) && !Array.isArray(O) && !T.some((D) => D.placeholder)) {
        const D = o.current.getData(), P = {
          value: "",
          text: "",
          placeholder: !0
        };
        o.current.setData([P].concat(D));
      }
      o.current.setSelected(O, L);
    };
    return $(() => {
      if (!h.current) return;
      const m = {
        select: h.current
      };
      p && (m.data = p), e && (m.settings = e), s && (m.cssClasses = s);
      const L = t?.afterChange;
      return m.events = {
        ...t,
        afterChange: (O) => {
          if (!o.current) return;
          const v = a ? O.map((A) => A.value) : O[0]?.value ?? "", k = o.current.getData().flatMap(
            (A) => "label" in A ? A.options : [A]
          ), b = g.current, D = b === void 0 ? !1 : Array.isArray(b) ? b.length > 0 && b.every((A) => k.some((M) => M.value === A)) : b !== "" && k.some((A) => A.value === b), P = Array.isArray(v) ? v.length > 0 && v.every((A) => k.some((M) => M.value === A)) : v !== "" && k.some((A) => A.value === v), F = Array.isArray(v) && Array.isArray(b) ? JSON.stringify(v.sort()) !== JSON.stringify(b.sort()) : b !== v;
          n && F && (D || P) && (n(v), g.current = v), L && L(O);
        }
      }, o.current = new Se(m), i !== void 0 && C(i, !1), () => {
        o.current && (o.current.destroy(), o.current = null);
      };
    }, []), $(() => {
      if (d.current) {
        d.current = !1, g.current = i;
        return;
      }
      o.current && i !== void 0 && (g.current = i, C(i, !1));
    }, [i]), $(() => {
      o.current && p && !d.current && (o.current.setData(p), i !== void 0 && C(i, !1));
    }, [p]), /* @__PURE__ */ ue.jsx("select", { ref: h, multiple: a, children: r });
  }
);
Oe.displayName = "SlimSelect";
export {
  x as Optgroup,
  S as Option,
  we as Settings,
  Oe as default
};
