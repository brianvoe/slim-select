import { defineComponent as E, createElementBlock as T, openBlock as D, renderSlot as k } from "vue";
class N {
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
function C() {
  return Math.random().toString(36).substring(2, 10);
}
function M(h, e) {
  function t(i, l) {
    return l && i && i.classList && i.classList.contains(l) || l && i && i.dataset && i.dataset.id && i.dataset.id === e ? i : null;
  }
  function s(i, l) {
    return !i || i === document ? null : t(i, l) ? i : s(i.parentNode, l);
  }
  return t(h, e) || s(h, e);
}
function O(h, e = 50, t = !1) {
  let s;
  return function(...i) {
    const l = self, n = () => {
      s = null, t || h.apply(l, i);
    }, a = t && !s;
    clearTimeout(s), s = setTimeout(n, e), a && h.apply(l, i);
  };
}
function y(h, e) {
  return JSON.stringify(h) === JSON.stringify(e);
}
function P(h) {
  const e = h.replace(/[A-Z\u00C0-\u00D6\u00D8-\u00DE]/g, (t) => "-" + t.toLowerCase());
  return h[0] === h[0].toUpperCase() ? e.substring(1) : e;
}
class p {
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
    this.id = !e.id || e.id === "" ? C() : e.id, this.value = e.value === void 0 ? e.text || "" : e.value || "", this.text = e.text || "", this.html = e.html || "", this.defaultSelected = e.defaultSelected !== void 0 ? e.defaultSelected : !1, this.selected = e.selected !== void 0 ? e.selected : !1, this.display = e.display !== void 0 ? e.display : !0, this.disabled = e.disabled !== void 0 ? e.disabled : !1, this.mandatory = e.mandatory !== void 0 ? e.mandatory : !1, this.placeholder = e.placeholder !== void 0 ? e.placeholder : !1, this.class = e.class || "", this.style = e.style || "", this.data = e.data || {};
  }
}
class m {
  id;
  label;
  selectAll;
  selectAllText;
  closable;
  options;
  constructor(e) {
    if (this.id = !e.id || e.id === "" ? C() : e.id, this.label = e.label || "", this.selectAll = e.selectAll === void 0 ? !1 : e.selectAll, this.selectAllText = e.selectAllText || "Select All", this.closable = e.closable || "off", this.options = [], e.options)
      for (const t of e.options)
        this.options.push(new p(t));
  }
}
class V {
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
        if (t instanceof m || "label" in t) {
          if (!("label" in t))
            return new Error("Optgroup must have a label");
          if ("options" in t && t.options)
            for (let s of t.options) {
              const i = this.validateOption(s);
              if (i)
                return i;
            }
        } else if (t instanceof p || "text" in t) {
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
        if (s instanceof m || "label" in s) {
          let i = [];
          "options" in s && s.options && s.options.forEach((l) => {
            i.push(new p(l));
          }), i.length > 0 && t.push(new m(s));
        }
        (s instanceof p || "text" in s) && t.push(new p(s));
      }
    }), t;
  }
  setData(e, t = !1) {
    const s = this.partialToFullData(e);
    if (t) {
      const i = this.getSelectedOptions(), l = [];
      i.forEach((n) => {
        let a = !1;
        for (const o of s) {
          if (o instanceof p && o.id === n.id) {
            a = !0;
            break;
          }
          if (o instanceof m) {
            for (const c of o.options)
              if (c.id === n.id) {
                a = !0;
                break;
              }
          }
        }
        a || l.push(n);
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
      let s = [new p(e)];
      this.setData(s.concat(this.getData()));
    } else
      this.setData(this.getData().concat(new p(e)));
  }
  // Pass in an array of id that will loop through
  // each option and set the selected property to true
  // but also clean selected by determining selectType
  setSelectedBy(e, t) {
    let s = null, i = !1;
    const l = [];
    for (let a of this.data) {
      if (a instanceof m)
        for (let o of a.options) {
          s || (s = o);
          let c = o[e] || "";
          o.selected = i ? !1 : t.includes(c), o.selected && (l.push(o), this.selectType === "single" && (i = !0));
        }
      a instanceof p && (s || (s = a), a.selected = i ? !1 : t.includes(a[e]), a.selected && (l.push(a), this.selectType === "single" && (i = !0)));
    }
    this.selectType === "single" && s && !i && (s.selected = !0, l.push(s));
    const n = t.map((a) => l.find((o) => o[e] === a)?.id || "");
    this.selectedOrder = n;
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
      if (t instanceof m && t.id === e)
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
      if (t instanceof m ? e = t.options[0] : t instanceof p && (e = t), e)
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
      if (i instanceof m) {
        let l = [];
        if (i.options.forEach((a) => {
          (!e || e(a)) && (t ? l.push(new p(a)) : s.push(new p(a)));
        }), l.length > 0) {
          let a = new m(i);
          a.options = l, s.push(a);
        }
      }
      i instanceof p && (!e || e(i)) && s.push(new p(i));
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
class B {
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
    this.store = s, this.settings = e, this.classes = t, this.callbacks = i, this.lastSelectedOption = null, this.main = this.mainDiv(), this.content = this.contentDiv(), this.updateClassStyles(), this.updateAriaAttributes(), this.settings.contentPosition !== "relative" && (this.content.main.style.top = "-9999px", this.content.main.style.left = "-9999px", this.content.main.style.margin = "0", this.content.main.style.width = "auto"), this.settings.contentLocation && this.settings.contentLocation.appendChild(this.content.main);
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
    const e = this.getAnimationTiming();
    setTimeout(() => {
      this.main.main.classList.remove(this.classes.dirAbove, this.classes.dirBelow), this.content.main.classList.remove(this.classes.dirAbove, this.classes.dirBelow);
    }, e);
  }
  getAnimationTiming() {
    const t = getComputedStyle(this.content.main).getPropertyValue("--ss-animation-timing").trim();
    if (t) {
      if (t.endsWith("ms"))
        return parseFloat(t);
      if (t.endsWith("s"))
        return parseFloat(t) * 1e3;
    }
    return 200;
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
    e.dataset.id = this.settings.id, e.setAttribute("aria-label", this.settings.ariaLabel), e.tabIndex = 0, e.onkeydown = (c) => {
      switch (c.key) {
        case "ArrowUp":
        case "ArrowDown":
          return this.callbacks.open(), c.key === "ArrowDown" ? this.highlight("down") : this.highlight("up"), !1;
        case "Tab":
          return this.callbacks.close(), !0;
        // Continue doing normal tabbing
        case "Enter":
        case " ":
          this.callbacks.open();
          const r = this.content.list.querySelector("." + this.classes.highlighted);
          return r && r.click(), !1;
        case "Escape":
          return this.callbacks.close(), !1;
      }
      return c.key.length === 1 && this.callbacks.open(), !0;
    }, e.onclick = (c) => {
      this.settings.disabled || (this.settings.isOpen ? this.callbacks.close() : this.callbacks.open());
    };
    const t = document.createElement("div");
    t.classList.add(this.classes.values), e.appendChild(t);
    const s = document.createElement("div");
    s.classList.add(this.classes.deselect);
    const i = this.store?.getSelectedOptions();
    !this.settings.allowDeselect || this.settings.isMultiple && i && i.length <= 0 ? s.classList.add(this.classes.hide) : s.classList.remove(this.classes.hide), s.onclick = (c) => {
      if (c.stopPropagation(), this.settings.disabled)
        return;
      let r = !0;
      const d = this.store.getSelectedOptions(), f = [];
      if (this.callbacks.beforeChange && (r = this.callbacks.beforeChange(f, d) === !0), r) {
        if (this.settings.isMultiple)
          this.callbacks.setSelected([], !1), this.updateDeselectAll();
        else {
          const u = this.store.getFirstOption(), g = u ? u.id : "";
          this.callbacks.setSelected(g, !1);
        }
        this.settings.closeOnSelect && this.callbacks.close(), this.callbacks.afterChange && this.callbacks.afterChange(this.store.getSelectedOptions());
      }
    };
    const l = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    l.setAttribute("viewBox", "0 0 100 100");
    const n = document.createElementNS("http://www.w3.org/2000/svg", "path");
    n.setAttribute("d", this.classes.deselectPath), l.appendChild(n), s.appendChild(l), e.appendChild(s);
    const a = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    a.classList.add(this.classes.arrow), a.setAttribute("viewBox", "0 0 100 100");
    const o = document.createElementNS("http://www.w3.org/2000/svg", "path");
    return o.setAttribute("d", this.classes.arrowClose), this.settings.alwaysOpen && a.classList.add(this.classes.hide), a.appendChild(o), e.appendChild(a), {
      main: e,
      values: t,
      deselect: {
        main: s,
        svg: l,
        path: n
      },
      arrow: {
        main: a,
        path: o
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
      const l = e[i], n = l.getAttribute("data-id");
      n && (t.filter((o) => o.id === n, !1).length || s.push(l));
    }
    for (const i of s)
      i.classList.add(this.classes.valueOut), setTimeout(() => {
        this.main.values.hasChildNodes() && this.main.values.contains(i) && this.main.values.removeChild(i);
      }, 100);
    e = this.main.values.childNodes;
    for (let i = 0; i < t.length; i++) {
      let l = !0;
      for (let n = 0; n < e.length; n++)
        t[i].id === String(e[n].dataset.id) && (l = !1);
      l && (this.settings.keepOrder ? this.main.values.appendChild(this.multipleValue(t[i])) : e.length === 0 ? this.main.values.appendChild(this.multipleValue(t[i])) : i === 0 ? this.main.values.insertBefore(this.multipleValue(t[i]), e[i]) : e[i - 1].insertAdjacentElement("afterend", this.multipleValue(t[i])));
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
        let o = !0;
        const c = this.store.getSelectedOptions(), r = c.filter((d) => d.selected && d.id !== e.id, !0);
        if (!(this.settings.minSelected && r.length < this.settings.minSelected) && (this.callbacks.beforeChange && (o = this.callbacks.beforeChange(r, c) === !0), o)) {
          let d = [];
          for (const f of r) {
            if (f instanceof m)
              for (const u of f.options)
                u.id && d.push(u.id);
            f instanceof p && d.push(f.id);
          }
          this.callbacks.setSelected(d, !1), this.settings.closeOnSelect && this.callbacks.close(), this.callbacks.afterChange && this.callbacks.afterChange(r), this.updateDeselectAll();
        }
      };
      const l = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      l.setAttribute("viewBox", "0 0 100 100");
      const n = document.createElementNS("http://www.w3.org/2000/svg", "path");
      n.setAttribute("d", this.classes.optionDelete), l.appendChild(n), i.appendChild(l), t.appendChild(i), i.onkeydown = (a) => {
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
    if (this.settings.showSearch || (e.classList.add(this.classes.hide), t.readOnly = !0), t.type = "search", t.placeholder = this.settings.searchPlaceholder, t.tabIndex = -1, t.setAttribute("aria-label", this.settings.searchPlaceholder), t.setAttribute("aria-autocomplete", "list"), t.setAttribute("autocapitalize", "off"), t.setAttribute("autocomplete", "off"), t.setAttribute("autocorrect", "off"), t.setAttribute("aria-hidden", "true"), t.oninput = O((l) => {
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
          const n = this.content.list.querySelector("." + this.classes.highlighted);
          return n ? (n.click(), !1) : !0;
        case "Enter":
          const a = this.content.list.querySelector("." + this.classes.highlighted);
          return a ? (a.click(), !1) : this.callbacks.addable ? (s.click(), !1) : !0;
      }
      return !0;
    }, e.appendChild(t), this.callbacks.addable) {
      s.classList.add(this.classes.addable);
      const l = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      l.setAttribute("viewBox", "0 0 100 100");
      const n = document.createElementNS("http://www.w3.org/2000/svg", "path");
      n.setAttribute("d", this.classes.addablePath), l.appendChild(n), s.appendChild(l), s.onclick = (a) => {
        if (a.preventDefault(), a.stopPropagation(), !this.callbacks.addable)
          return;
        const o = this.content.search.input.value.trim();
        if (o === "") {
          this.content.search.input.focus();
          return;
        }
        const c = (d) => {
          let f = new p(d);
          if (this.callbacks.addOption(f), this.settings.isMultiple) {
            let u = this.store.getSelected();
            u.push(f.id), this.callbacks.setSelected(u, !0);
          } else
            this.callbacks.setSelected([f.id], !0);
          this.callbacks.search(""), this.settings.closeOnSelect && setTimeout(() => {
            this.callbacks.close();
          }, 100);
        }, r = this.callbacks.addable(o);
        r === !1 || r === void 0 || r === null || (r instanceof Promise ? r.then((d) => {
          typeof d == "string" ? c({
            text: d,
            value: d
          }) : r instanceof Error ? this.renderError(r.message) : c(d);
        }) : typeof r == "string" ? c({
          text: r,
          value: r
        }) : r instanceof Error ? this.renderError(r.message) : c(r));
      }, e.appendChild(s), i.addable = {
        main: s,
        svg: l,
        path: n
      };
    }
    return i;
  }
  searchFocus() {
    this.content.search.input.focus({ preventScroll: !0 });
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
        const n = t[l];
        n.classList.remove(this.classes.highlighted);
        const a = n.parentElement;
        if (a && a.classList.contains(this.classes.mainOpen)) {
          const r = a.querySelector("." + this.classes.optgroupLabel);
          r && r.click();
        }
        let o = t[e === "down" ? l + 1 < t.length ? l + 1 : 0 : l - 1 >= 0 ? l - 1 : t.length - 1];
        o.classList.add(this.classes.highlighted), this.ensureElementInView(this.content.list, o), o.id && this.main.main.setAttribute("aria-activedescendant", o.id);
        const c = o.parentElement;
        if (c && c.classList.contains(this.classes.close)) {
          const r = c.querySelector("." + this.classes.optgroupLabel);
          r && r.click();
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
      new p({
        text: "",
        value: "",
        selected: !1,
        placeholder: !0
      }),
      !0
    ));
    const t = document.createDocumentFragment();
    for (const s of e) {
      if (s instanceof m) {
        const i = document.createElement("div");
        i.classList.add(this.classes.optgroup);
        const l = document.createElement("div");
        l.classList.add(this.classes.optgroupLabel), i.appendChild(l);
        const n = document.createElement("div");
        n.classList.add(this.classes.optgroupLabelText), n.textContent = s.label, l.appendChild(n);
        const a = document.createElement("div");
        if (a.classList.add(this.classes.optgroupActions), l.appendChild(a), this.settings.isMultiple && s.selectAll) {
          const o = document.createElement("div");
          o.classList.add(this.classes.optgroupSelectAll);
          let c = !0;
          for (const g of s.options)
            if (!g.selected) {
              c = !1;
              break;
            }
          c && o.classList.add(this.classes.selected);
          const r = document.createElement("span");
          r.textContent = s.selectAllText, o.appendChild(r);
          const d = document.createElementNS("http://www.w3.org/2000/svg", "svg");
          d.setAttribute("viewBox", "0 0 100 100"), o.appendChild(d);
          const f = document.createElementNS("http://www.w3.org/2000/svg", "path");
          f.setAttribute("d", this.classes.optgroupSelectAllBox), d.appendChild(f);
          const u = document.createElementNS("http://www.w3.org/2000/svg", "path");
          u.setAttribute("d", this.classes.optgroupSelectAllCheck), d.appendChild(u), o.addEventListener("click", (g) => {
            g.preventDefault(), g.stopPropagation();
            const v = this.store.getSelected();
            if (c) {
              const w = v.filter((S) => {
                for (const b of s.options)
                  if (S === b.id)
                    return !1;
                return !0;
              });
              this.callbacks.setSelected(w, !0);
              return;
            } else {
              let w = s.options.map((b) => b.id).filter((b) => b !== void 0);
              const S = v.concat(w);
              for (const b of s.options)
                b.id && !this.store.getOptionByID(b.id) && this.callbacks.addOption(new p(b));
              this.callbacks.setSelected(S, !0);
              return;
            }
          }), a.appendChild(o);
        }
        if (s.closable !== "off") {
          const o = document.createElement("div");
          o.classList.add(this.classes.optgroupClosable);
          const c = document.createElementNS("http://www.w3.org/2000/svg", "svg");
          c.setAttribute("viewBox", "0 0 100 100"), c.classList.add(this.classes.arrow), o.appendChild(c);
          const r = document.createElementNS("http://www.w3.org/2000/svg", "path");
          c.appendChild(r), s.options.some((d) => d.selected) || this.content.search.input.value.trim() !== "" ? (o.classList.add(this.classes.mainOpen), r.setAttribute("d", this.classes.arrowOpen)) : s.closable === "open" ? (i.classList.add(this.classes.mainOpen), r.setAttribute("d", this.classes.arrowOpen)) : s.closable === "close" && (i.classList.add(this.classes.close), r.setAttribute("d", this.classes.arrowClose)), l.addEventListener("click", (d) => {
            d.preventDefault(), d.stopPropagation(), i.classList.contains(this.classes.close) ? (i.classList.remove(this.classes.close), i.classList.add(this.classes.mainOpen), r.setAttribute("d", this.classes.arrowOpen)) : (i.classList.remove(this.classes.mainOpen), i.classList.add(this.classes.close), r.setAttribute("d", this.classes.arrowClose));
          }), a.appendChild(o);
        }
        i.appendChild(l);
        for (const o of s.options)
          i.appendChild(this.option(new p(o))), t.appendChild(i);
      }
      s instanceof p && t.appendChild(this.option(s));
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
      const i = this.store.getSelected(), l = s.currentTarget, n = String(l.dataset.id), a = s.ctrlKey || s.metaKey;
      if (e.disabled || !this.settings.isMultiple && e.selected && !this.settings.allowDeselect || e.selected && e.mandatory || this.settings.isMultiple && this.settings.maxSelected <= i.length && !e.selected || this.settings.isMultiple && this.settings.minSelected >= i.length && e.selected && !a)
        return;
      let o = !1;
      const c = this.store.getSelectedOptions();
      let r = [];
      if (this.settings.isMultiple) {
        const d = c.some((u) => u.id === n);
        if (s.shiftKey && this.lastSelectedOption) {
          const u = this.store.getDataOptions(), g = u.findIndex((w) => w.id === this.lastSelectedOption.id), v = u.findIndex((w) => w.id === e.id);
          if (g >= 0 && v >= 0) {
            const w = Math.min(g, v), S = Math.max(g, v), L = u.slice(w, S + 1).filter((A) => !c.find((x) => x.id === A.id));
            c.length + L.length <= this.settings.maxSelected ? r = c.concat(L) : r = c;
          } else
            r = c;
        } else a ? (d ? r = c.filter((u) => u.id !== n) : r = c.concat(e), this.lastSelectedOption = e) : (d ? r = c.filter((u) => u.id !== n) : r = c.concat(e), this.lastSelectedOption = e);
      }
      if (this.settings.isMultiple || (e.selected ? r = [] : r = [e]), this.callbacks.beforeChange || (o = !0), this.callbacks.beforeChange && (this.callbacks.beforeChange(r, c) === !1 ? o = !1 : o = !0), o) {
        this.store.getOptionByID(n) || this.callbacks.addOption(e), this.callbacks.setSelected(
          r.map((u) => u.id),
          !1
        );
        const d = s.ctrlKey || s.metaKey || s.shiftKey;
        this.settings.closeOnSelect && !(this.settings.isMultiple && d) && this.callbacks.close(), this.callbacks.afterChange && this.callbacks.afterChange(r);
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
    const l = i.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), n = document.createElement("div");
    n.innerHTML = e;
    const a = (o) => {
      if (o.nodeType === Node.TEXT_NODE) {
        const c = o.textContent || "", r = new RegExp("(" + l + ")", "i");
        if (r.test(c)) {
          const d = document.createElement("span");
          c.split(r).forEach((u, g) => {
            if (u && r.test(u)) {
              const v = document.createElement("mark");
              v.className = s, v.textContent = u, d.appendChild(v);
            } else u && d.appendChild(document.createTextNode(u));
          }), o.parentNode?.replaceChild(d, o);
        }
      } else o.nodeType === Node.ELEMENT_NODE && Array.from(o.childNodes).forEach((c) => a(c));
    };
    return Array.from(n.childNodes).forEach((o) => a(o)), n.innerHTML;
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
    const s = e.scrollTop + e.offsetTop, i = s + e.clientHeight, l = t.offsetTop, n = l + t.clientHeight;
    l < s ? e.scrollTop -= s - l : n > i && (e.scrollTop += n - i);
  }
  putContent() {
    const e = this.main.main.offsetHeight, t = this.main.main.getBoundingClientRect(), s = this.content.main.offsetHeight;
    return window.innerHeight - (t.top + e) <= s && t.top > s ? "up" : "down";
  }
  // Updates deselect based on item count and allowDeselect setting
  updateDeselectAll() {
    if (!this.store || !this.settings)
      return;
    const e = this.store.getSelectedOptions(), t = e && e.length > 0, s = this.settings.isMultiple, i = this.settings.allowDeselect, l = this.main.deselect.main, n = this.classes.hide;
    i && !(s && !t) ? l.classList.remove(n) : l.classList.add(n);
  }
}
class I {
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
    let t = !1, s = !1, i = !1, l = !1;
    for (const n of e) {
      if (n.target === this.select && (n.attributeName === "disabled" && (s = !0), n.attributeName === "class" && (t = !0), n.type === "childList")) {
        for (const a of Array.from(n.addedNodes))
          if (a.nodeName === "OPTION" && a.value === this.select.value) {
            l = !0;
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
        l && this.select.dispatchEvent(new Event("change"));
        return;
      }
      this.changeListen(!1), this.onOptionsChange(this.getData()), this.changeListen(!0);
    }
    l && this.select.dispatchEvent(new Event("change"));
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
            const n = l;
            n.selected && e.push(this.getDataFromOption(n));
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
        for (const n of l)
          if (n.nodeName === "OPTION") {
            const a = n;
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
        const l = s.childNodes;
        for (const n of l)
          if (n.nodeName === "OPTION") {
            const a = n;
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
        t instanceof m && this.select.appendChild(this.createOptgroup(t)), t instanceof p && this.select.appendChild(this.createOption(t));
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
      t.setAttribute("data-" + P(s), e.data[s]);
    }), t;
  }
  // Find and handle labels associated with this select
  setupLabelHandlers() {
    const e = [], t = this.select.id;
    t && document.querySelectorAll(`label[for="${t}"]`).forEach((n) => e.push(n));
    let s = this.select.parentElement;
    for (; s && s !== document.body; ) {
      if (s.tagName === "LABEL") {
        e.push(s);
        break;
      }
      s = s.parentElement;
    }
    Array.from(new Set(e)).forEach((l) => {
      if (l.__slimSelectLabelHandler)
        return;
      const n = (a) => {
        const o = a.target;
        a.preventDefault(), o === l && this.onLabelClick && this.onLabelClick();
      };
      l.__slimSelectLabelHandler = n, l.addEventListener("click", n, { capture: !0, passive: !1 });
    });
  }
  // Remove label handlers
  removeLabelHandlers() {
    const e = [], t = this.select.id;
    t && document.querySelectorAll(`label[for="${t}"]`).forEach((n) => e.push(n));
    let s = this.select.parentElement;
    for (; s && s !== document.body; ) {
      if (s.tagName === "LABEL") {
        e.push(s);
        break;
      }
      s = s.parentElement;
    }
    Array.from(new Set(e)).forEach((l) => {
      const n = l.__slimSelectLabelHandler;
      n && (l.removeEventListener("click", n, { capture: !0 }), delete l.__slimSelectLabelHandler);
    });
  }
  destroy() {
    this.changeListen(!1), this.select.removeEventListener("change", this.valueChange), this.preventNativeSelect && (this.select.removeEventListener("click", this.preventNativeSelect, { capture: !0 }), this.preventNativeSelect = null), this.preventNativeSelectMousedown && (this.select.removeEventListener("mousedown", this.preventNativeSelectMousedown, { capture: !0 }), this.preventNativeSelectMousedown = null), this.preventNativeSelectFocus && (this.select.removeEventListener("focus", this.preventNativeSelectFocus, { capture: !0 }), this.preventNativeSelectFocus = null), this.observer && (this.observer.disconnect(), this.observer = null), this.removeLabelHandlers(), delete this.select.dataset.id, this.showUI();
  }
}
class H {
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
  keepSearch;
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
    e || (e = {}), this.id = "ss-" + C(), this.style = e.style || "", this.class = e.class || [], this.disabled = e.disabled !== void 0 ? e.disabled : !1, this.alwaysOpen = e.alwaysOpen !== void 0 ? e.alwaysOpen : !1, this.showSearch = e.showSearch !== void 0 ? e.showSearch : !0, this.focusSearch = e.focusSearch !== void 0 ? e.focusSearch : !0, this.keepSearch = e.keepSearch !== void 0 ? e.keepSearch : !1, this.ariaLabel = e.ariaLabel || "Combobox", this.searchPlaceholder = e.searchPlaceholder || "Search...", this.searchText = e.searchText || "No Results", this.searchingText = e.searchingText || "Searching...", this.searchHighlight = e.searchHighlight !== void 0 ? e.searchHighlight : !1, this.closeOnSelect = e.closeOnSelect !== void 0 ? e.closeOnSelect : !0, this.contentLocation = e.contentLocation || document.body, this.contentPosition = e.contentPosition || "absolute", this.openPosition = e.openPosition || "auto", this.placeholderText = e.placeholderText !== void 0 ? e.placeholderText : "Select Value", this.allowDeselect = e.allowDeselect !== void 0 ? e.allowDeselect : !1, this.hideSelected = e.hideSelected !== void 0 ? e.hideSelected : !1, this.keepOrder = e.keepOrder !== void 0 ? e.keepOrder : !1, this.showOptionTooltips = e.showOptionTooltips !== void 0 ? e.showOptionTooltips : !1, this.minSelected = e.minSelected || 0, this.maxSelected = e.maxSelected || 1e3, this.timeoutDelay = e.timeoutDelay || 200, this.maxValuesShown = e.maxValuesShown || 20, this.maxValuesMessage = e.maxValuesMessage || "{number} selected", this.addableText = e.addableText || 'Press "Enter" to add {value}';
  }
}
let F = class {
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
    this.selectEl.dataset.ssid && this.destroy(), this.settings = new H(e.settings), this.cssClasses = new N(e.cssClasses);
    const t = ["beforeOpen", "afterOpen", "beforeClose", "afterClose"];
    for (const a in e.events)
      e.events.hasOwnProperty(a) && (t.indexOf(a) !== -1 ? this.events[a] = O(e.events[a], 100) : this.events[a] = e.events[a]);
    this.settings.disabled = e.settings?.disabled ? e.settings.disabled : this.selectEl.disabled, this.settings.isMultiple = this.selectEl.multiple, this.settings.style = this.selectEl.style.cssText, this.settings.class = this.selectEl.className.split(" "), this.select = new I(this.selectEl), this.selectEl.id || (this.selectEl.id = this.settings.id), this.select.updateSelect(this.settings.id, this.settings.style, this.settings.class), this.select.hideUI(), this.select.onValueChange = (a) => {
      this.setSelected(a.map((o) => o.id));
    }, this.select.onClassChange = (a) => {
      this.settings.class = a, this.render.updateClassStyles();
    }, this.select.onDisabledChange = (a) => {
      a ? this.disable() : this.enable();
    }, this.select.onOptionsChange = (a) => {
      this.setData(a || []);
    }, this.select.onLabelClick = () => {
      this.settings.disabled || (this.settings.isOpen ? this.close() : this.open());
    };
    const s = e.data ? e.data : this.select.getData();
    this.store = new V(this.settings.isMultiple ? "multiple" : "single", s), e.data && this.select.updateOptions(this.store.getData());
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
    this.render = new B(this.settings, this.cssClasses, this.store, i), this.render.renderValues(), this.render.renderOptions(this.store.getData());
    const l = this.selectEl.getAttribute("aria-label"), n = this.selectEl.getAttribute("aria-labelledby");
    l ? this.render.main.main.setAttribute("aria-label", l) : n && this.render.main.main.setAttribute("aria-labelledby", n), this.selectEl.parentNode && this.selectEl.parentNode.insertBefore(this.render.main.main, this.selectEl.nextSibling), window.addEventListener("resize", this.windowResize, !1), this.settings.openPosition === "auto" && window.addEventListener("scroll", this.windowScroll, !1), document.addEventListener("visibilitychange", this.windowVisibilityChange), this.settings.disabled && this.disable(), this.settings.alwaysOpen && this.open(), this.select.setupLabelHandlers(), this.selectEl.slim = this;
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
    this.select.updateOptions(i), this.render.renderValues(), this.render.renderOptions(i), this.events.afterChange && !y(t, this.store.getSelected()) && this.events.afterChange(this.store.getSelectedOptions());
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
    for (const a of e) {
      if (i.find((o) => o.id == a)) {
        l.push(a);
        continue;
      }
      for (const o of i.filter((c) => c.value == a))
        l.push(o.id);
    }
    this.store.setSelectedBy("id", l);
    const n = this.store.getData();
    this.select.updateOptions(n), this.render.renderValues(), this.render.content.search.input.value !== "" ? this.search(this.render.content.search.input.value) : this.render.renderOptions(n), t && this.events.afterChange && !y(s, this.store.getSelected()) && this.events.afterChange(this.store.getSelectedOptions());
  }
  addOption(e) {
    const t = this.store.getSelected();
    this.store.getDataOptions().some((i) => i.value === (e.value ?? e.text)) || this.store.addOption(e);
    const s = this.store.getData();
    this.select.updateOptions(s), this.render.renderValues(), this.render.renderOptions(s), this.events.afterChange && !y(t, this.store.getSelected()) && this.events.afterChange(this.store.getSelectedOptions());
  }
  open() {
    this.settings.disabled || this.settings.isOpen || (this.events.beforeOpen && this.events.beforeOpen(), this.render.open(), this.settings.showSearch && this.settings.focusSearch && this.render.searchFocus(), this.settings.isOpen = !0, this.openTimeout = setTimeout(() => {
      this.events.afterOpen && this.events.afterOpen(), this.settings.isOpen && (this.settings.isFullOpen = !0), document.addEventListener("click", this.documentClick);
    }, this.settings.timeoutDelay), this.settings.contentPosition === "absolute" && (this.settings.intervalMove && clearInterval(this.settings.intervalMove), this.settings.intervalMove = setInterval(this.render.moveContent.bind(this.render), 500)));
  }
  close(e = null) {
    !this.settings.isOpen || this.settings.alwaysOpen || (this.events.beforeClose && this.events.beforeClose(), this.render.close(), !this.settings.keepSearch && this.render.content.search.input.value !== "" && this.search(""), this.render.mainFocus(e), this.settings.isOpen = !1, this.settings.isFullOpen = !1, this.closeTimeout = setTimeout(() => {
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
  windowResize = O(() => {
    !this.settings.isOpen && !this.settings.isFullOpen || this.render.moveContent();
  });
  // Event listener for window scrolling
  windowScroll = O(() => {
    !this.settings.isOpen && !this.settings.isFullOpen || this.render.moveContent();
  });
  // Event listener for document click
  documentClick = (e) => {
    this.settings.isOpen && e.target && !M(e.target, this.settings.id) && this.close(e.type);
  };
  // Event Listener for window visibility change
  windowVisibilityChange = () => {
    document.hidden && this.close();
  };
};
const R = E({
  name: "SlimSelect",
  props: {
    modelValue: {
      type: [String, Array, void 0]
    },
    multiple: {
      type: Boolean,
      default: !1
    },
    data: {
      type: Array
    },
    settings: {
      type: Object
    },
    events: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ["update:modelValue"],
  data() {
    return {
      slim: null
    };
  },
  mounted() {
    this.$slots.default && this.$slots.default().length > 0 && this.data && console.warn(
      "[SlimSelect Vue] Both slot content and data prop are provided. Data prop will take precedence and slot content will be ignored."
    );
    let e = {
      select: this.$refs.slim
    };
    this.data && (e.data = this.data), this.settings && (e.settings = this.settings);
    const t = this.events?.afterChange;
    e.events = {
      ...this.events,
      afterChange: (s) => {
        this.handleAfterChange(s, t);
      }
    }, this.slim = new F(e), this.syncModelValueToSlimSelect(!1);
  },
  updated() {
    if (this.slim && !this.data) {
      const h = this.slim.getSelected(), e = Array.isArray(this.value) ? this.value : [this.value];
      JSON.stringify(h.sort()) !== JSON.stringify(e.sort()) && this.syncModelValueToSlimSelect(!1);
    }
  },
  beforeUnmount() {
    this.slim && this.slim.destroy();
  },
  watch: {
    modelValue: {
      handler: function(h) {
        this.slim && this.syncModelValueToSlimSelect(!1);
      }
    },
    data: {
      handler: function(h) {
        this.slim && this.slim.setData(h);
      },
      deep: !0
    }
  },
  computed: {
    value: {
      get() {
        return this.getCleanValue(this.$props.modelValue);
      },
      set(h) {
        this.$emit("update:modelValue", h);
      }
    }
  },
  methods: {
    // This allows via a ref to call the SlimSelect methods
    getSlimSelect() {
      return this.slim;
    },
    handleAfterChange(h, e) {
      if (!this.slim) return;
      const t = this.multiple ? h.map((o) => o.value) : h.length > 0 ? h[0].value : "", s = this.getCleanValue(this.$props.modelValue), i = this.slim.store.getDataOptions(), l = Array.isArray(s) ? s.length > 0 && s.every((o) => i.some((c) => c.value === o)) : s !== "" && i.some((o) => o.value === s), n = Array.isArray(t) ? t.length > 0 && t.every((o) => i.some((c) => c.value === o)) : t !== "" && i.some((o) => o.value === t);
      (Array.isArray(t) && Array.isArray(this.value) ? JSON.stringify(t.sort()) !== JSON.stringify(this.value.sort()) : this.value !== t) && (l || n) && (this.value = t), e && e(h);
    },
    getCleanValue(h) {
      const e = this.$props.multiple;
      return typeof h == "string" ? e ? [h] : h : Array.isArray(h) ? e ? h : h[0] : e ? [] : "";
    },
    syncModelValueToSlimSelect(h = !1) {
      if (!this.slim || this.$props.modelValue === void 0)
        return;
      const e = this.getCleanValue(this.$props.modelValue), s = this.slim.getData().flatMap((l) => "label" in l ? l.options : [l]);
      if (!(Array.isArray(e) ? e.length > 0 && e.every((l) => s.some((n) => n.value === l)) : e !== "" && s.some((l) => l.value === e)) && !Array.isArray(e) && !s.some((n) => n.placeholder)) {
        const n = this.slim.getData(), a = {
          value: "",
          text: "",
          placeholder: !0
        };
        this.slim.setData([a].concat(n));
      }
      this.slim.setSelected(e, h);
    }
  }
}), _ = (h, e) => {
  const t = h.__vccOpts || h;
  for (const [s, i] of e)
    t[s] = i;
  return t;
}, $ = ["multiple"];
function q(h, e, t, s, i, l) {
  return D(), T("select", {
    multiple: h.multiple,
    ref: "slim"
  }, [
    k(h.$slots, "default")
  ], 8, $);
}
const z = /* @__PURE__ */ _(R, [["render", q]]);
export {
  m as Optgroup,
  p as Option,
  H as Settings,
  z as default
};
