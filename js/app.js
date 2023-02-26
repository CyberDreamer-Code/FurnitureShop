/*! For license information please see app.min.js.LICENSE.txt */
(() => {
  "use strict";
  function e(e) {
    this.type = e;
  }
  (e.prototype.init = function () {
    const e = this;
    (this.оbjects = []),
      (this.daClassname = "_dynamic_adapt_"),
      (this.nodes = document.querySelectorAll("[data-da]"));
    for (let e = 0; e < this.nodes.length; e++) {
      const t = this.nodes[e],
        i = t.dataset.da.trim().split(","),
        s = {};
      (s.element = t),
        (s.parent = t.parentNode),
        (s.destination = document.querySelector(i[0].trim())),
        (s.breakpoint = i[1] ? i[1].trim() : "767"),
        (s.place = i[2] ? i[2].trim() : "last"),
        (s.index = this.indexInParent(s.parent, s.element)),
        this.оbjects.push(s);
    }
    this.arraySort(this.оbjects),
      (this.mediaQueries = Array.prototype.map.call(
        this.оbjects,
        function (e) {
          return (
            "(" + this.type + "-width: " + e.breakpoint + "px)," + e.breakpoint
          );
        },
        this
      )),
      (this.mediaQueries = Array.prototype.filter.call(
        this.mediaQueries,
        function (e, t, i) {
          return Array.prototype.indexOf.call(i, e) === t;
        }
      ));
    for (let t = 0; t < this.mediaQueries.length; t++) {
      const i = this.mediaQueries[t],
        s = String.prototype.split.call(i, ","),
        n = window.matchMedia(s[0]),
        r = s[1],
        a = Array.prototype.filter.call(this.оbjects, function (e) {
          return e.breakpoint === r;
        });
      n.addListener(function () {
        e.mediaHandler(n, a);
      }),
        this.mediaHandler(n, a);
    }
  }),
    (e.prototype.mediaHandler = function (e, t) {
      if (e.matches)
        for (let e = 0; e < t.length; e++) {
          const i = t[e];
          (i.index = this.indexInParent(i.parent, i.element)),
            this.moveTo(i.place, i.element, i.destination);
        }
      else
        for (let e = t.length - 1; e >= 0; e--) {
          const i = t[e];
          i.element.classList.contains(this.daClassname) &&
            this.moveBack(i.parent, i.element, i.index);
        }
    }),
    (e.prototype.moveTo = function (e, t, i) {
      t.classList.add(this.daClassname),
        "last" === e || e >= i.children.length
          ? i.insertAdjacentElement("beforeend", t)
          : "first" !== e
          ? i.children[e].insertAdjacentElement("beforebegin", t)
          : i.insertAdjacentElement("afterbegin", t);
    }),
    (e.prototype.moveBack = function (e, t, i) {
      t.classList.remove(this.daClassname),
        void 0 !== e.children[i]
          ? e.children[i].insertAdjacentElement("beforebegin", t)
          : e.insertAdjacentElement("beforeend", t);
    }),
    (e.prototype.indexInParent = function (e, t) {
      const i = Array.prototype.slice.call(e.children);
      return Array.prototype.indexOf.call(i, t);
    }),
    (e.prototype.arraySort = function (e) {
      "min" === this.type
        ? Array.prototype.sort.call(e, function (e, t) {
            return e.breakpoint === t.breakpoint
              ? e.place === t.place
                ? 0
                : "first" === e.place || "last" === t.place
                ? -1
                : "last" === e.place || "first" === t.place
                ? 1
                : e.place - t.place
              : e.breakpoint - t.breakpoint;
          })
        : Array.prototype.sort.call(e, function (e, t) {
            return e.breakpoint === t.breakpoint
              ? e.place === t.place
                ? 0
                : "first" === e.place || "last" === t.place
                ? 1
                : "last" === e.place || "first" === t.place
                ? -1
                : t.place - e.place
              : t.breakpoint - e.breakpoint;
          });
    });
  new e("max").init();
  class t {
    constructor(e) {
      let t = {
        logging: !0,
        init: !0,
        attributeOpenButton: "data-popup",
        attributeCloseButton: "data-close",
        fixElementSelector: "[data-lp]",
        youtubeAttribute: "data-youtube",
        youtubePlaceAttribute: "data-youtube-place",
        setAutoplayYoutube: !0,
        classes: {
          popup: "popup",
          popupContent: "popup__content",
          popupActive: "popup_show",
          bodyActive: "popup-show",
        },
        focusCatch: !0,
        closeEsc: !0,
        bodyLock: !0,
        bodyLockDelay: 500,
        hashSettings: { location: !0, goHash: !0 },
        on: {
          beforeOpen: function () {},
          afterOpen: function () {},
          beforeClose: function () {},
          afterClose: function () {},
        },
      };
      (this.isOpen = !1),
        (this.targetOpen = { selector: !1, element: !1 }),
        (this.previousOpen = { selector: !1, element: !1 }),
        (this.lastClosed = { selector: !1, element: !1 }),
        (this._dataValue = !1),
        (this.hash = !1),
        (this._reopen = !1),
        (this._selectorOpen = !1),
        (this.lastFocusEl = !1),
        (this._focusEl = [
          "a[href]",
          'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',
          "button:not([disabled]):not([aria-hidden])",
          "select:not([disabled]):not([aria-hidden])",
          "textarea:not([disabled]):not([aria-hidden])",
          "area[href]",
          "iframe",
          "object",
          "embed",
          "[contenteditable]",
          '[tabindex]:not([tabindex^="-"])',
        ]),
        (this.options = {
          ...t,
          ...e,
          classes: { ...t.classes, ...e?.classes },
          hashSettings: { ...t.hashSettings, ...e?.hashSettings },
          on: { ...t.on, ...e?.on },
        }),
        this.options.init && this.initPopups();
    }
    initPopups() {
      this.popupLogging("Проснулся"), this.eventsPopup();
    }
    eventsPopup() {
      document.addEventListener(
        "click",
        function (e) {
          const t = e.target.closest(`[${this.options.attributeOpenButton}]`);
          if (t)
            return (
              e.preventDefault(),
              (this._dataValue = t.getAttribute(
                this.options.attributeOpenButton
              )
                ? t.getAttribute(this.options.attributeOpenButton)
                : "error"),
              "error" !== this._dataValue
                ? (this.isOpen || (this.lastFocusEl = t),
                  (this.targetOpen.selector = `${this._dataValue}`),
                  (this._selectorOpen = !0),
                  void this.open())
                : void this.popupLogging(
                    `Ой ой, не заполнен атрибут у ${t.classList}`
                  )
            );
          return e.target.closest(`[${this.options.attributeCloseButton}]`) ||
            (!e.target.closest(`.${this.options.classes.popupContent}`) &&
              this.isOpen)
            ? (e.preventDefault(), void this.close())
            : void 0;
        }.bind(this)
      ),
        document.addEventListener(
          "keydown",
          function (e) {
            if (
              this.options.closeEsc &&
              27 == e.which &&
              "Escape" === e.code &&
              this.isOpen
            )
              return e.preventDefault(), void this.close();
            this.options.focusCatch &&
              9 == e.which &&
              this.isOpen &&
              this._focusCatch(e);
          }.bind(this)
        ),
        document.querySelector("form[data-ajax],form[data-dev]") &&
          document.addEventListener(
            "formSent",
            function (e) {
              const t = e.detail.form.dataset.popupMessage;
              t && this.open(t);
            }.bind(this)
          ),
        this.options.hashSettings.goHash &&
          (window.addEventListener(
            "hashchange",
            function () {
              window.location.hash
                ? this._openToHash()
                : this.close(this.targetOpen.selector);
            }.bind(this)
          ),
          window.addEventListener(
            "load",
            function () {
              window.location.hash && this._openToHash();
            }.bind(this)
          ));
    }
    open(e) {
      if (
        (e &&
          "string" == typeof e &&
          "" !== e.trim() &&
          ((this.targetOpen.selector = e), (this._selectorOpen = !0)),
        this.isOpen && ((this._reopen = !0), this.close()),
        this._selectorOpen ||
          (this.targetOpen.selector = this.lastClosed.selector),
        this._reopen || (this.previousActiveElement = document.activeElement),
        (this.targetOpen.element = document.querySelector(
          this.targetOpen.selector
        )),
        this.targetOpen.element)
      ) {
        if (
          this.targetOpen.element.hasAttribute(this.options.youtubeAttribute)
        ) {
          const e = `https://www.youtube.com/embed/${this.targetOpen.element.getAttribute(
              this.options.youtubeAttribute
            )}?rel=0&showinfo=0&autoplay=1`,
            t = document.createElement("iframe");
          t.setAttribute("allowfullscreen", "");
          const i = this.options.setAutoplayYoutube ? "autoplay;" : "";
          t.setAttribute("allow", `${i}; encrypted-media`),
            t.setAttribute("src", e),
            this.targetOpen.element.querySelector(
              `[${this.options.youtubePlaceAttribute}]`
            ) &&
              this.targetOpen.element
                .querySelector(`[${this.options.youtubePlaceAttribute}]`)
                .appendChild(t);
        }
        this.options.hashSettings.location &&
          (this._getHash(), this._setHash()),
          this.options.on.beforeOpen(this),
          this.targetOpen.element.classList.add(
            this.options.classes.popupActive
          ),
          document.body.classList.add(this.options.classes.bodyActive),
          this._reopen ? (this._reopen = !1) : o(),
          this.targetOpen.element.setAttribute("aria-hidden", "false"),
          (this.previousOpen.selector = this.targetOpen.selector),
          (this.previousOpen.element = this.targetOpen.element),
          (this._selectorOpen = !1),
          (this.isOpen = !0),
          setTimeout(() => {
            this._focusTrap();
          }, 50),
          document.dispatchEvent(
            new CustomEvent("afterPopupOpen", { detail: { popup: this } })
          ),
          this.popupLogging("Открыл попап");
      } else
        this.popupLogging(
          "Ой ой, такого попапа нет. Проверьте корректность ввода. "
        );
    }
    close(e) {
      e &&
        "string" == typeof e &&
        "" !== e.trim() &&
        (this.previousOpen.selector = e),
        this.isOpen &&
          a &&
          (this.options.on.beforeClose(this),
          this.targetOpen.element.hasAttribute(this.options.youtubeAttribute) &&
            this.targetOpen.element.querySelector(
              `[${this.options.youtubePlaceAttribute}]`
            ) &&
            (this.targetOpen.element.querySelector(
              `[${this.options.youtubePlaceAttribute}]`
            ).innerHTML = ""),
          this.previousOpen.element.classList.remove(
            this.options.classes.popupActive
          ),
          this.previousOpen.element.setAttribute("aria-hidden", "true"),
          this._reopen ||
            (document.body.classList.remove(this.options.classes.bodyActive),
            o(),
            (this.isOpen = !1)),
          this._removeHash(),
          this._selectorOpen &&
            ((this.lastClosed.selector = this.previousOpen.selector),
            (this.lastClosed.element = this.previousOpen.element)),
          this.options.on.afterClose(this),
          setTimeout(() => {
            this._focusTrap();
          }, 50),
          this.popupLogging("Закрыл попап"));
    }
    _getHash() {
      this.options.hashSettings.location &&
        (this.hash = this.targetOpen.selector.includes("#")
          ? this.targetOpen.selector
          : this.targetOpen.selector.replace(".", "#"));
    }
    _openToHash() {
      let e = document.querySelector(
        `.${window.location.hash.replace("#", "")}`
      )
        ? `.${window.location.hash.replace("#", "")}`
        : document.querySelector(`${window.location.hash}`)
        ? `${window.location.hash}`
        : null;
      document.querySelector(`[${this.options.attributeOpenButton}="${e}"]`) &&
        e &&
        this.open(e);
    }
    _setHash() {
      history.pushState("", "", this.hash);
    }
    _removeHash() {
      history.pushState("", "", window.location.href.split("#")[0]);
    }
    _focusCatch(e) {
      const t = this.targetOpen.element.querySelectorAll(this._focusEl),
        i = Array.prototype.slice.call(t),
        s = i.indexOf(document.activeElement);
      e.shiftKey && 0 === s && (i[i.length - 1].focus(), e.preventDefault()),
        e.shiftKey || s !== i.length - 1 || (i[0].focus(), e.preventDefault());
    }
    _focusTrap() {
      const e = this.previousOpen.element.querySelectorAll(this._focusEl);
      !this.isOpen && this.lastFocusEl
        ? this.lastFocusEl.focus()
        : e[0].focus();
    }
    popupLogging(e) {
      this.options.logging && c(`[Попапос]: ${e}`);
    }
  }
  let i = {
    Android: function () {
      return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
      return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
      return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
      return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
      return (
        i.Android() || i.BlackBerry() || i.iOS() || i.Opera() || i.Windows()
      );
    },
  };
  let s = (e, t = 500, i = 0) => {
      e.classList.contains("_slide") ||
        (e.classList.add("_slide"),
        (e.style.transitionProperty = "height, margin, padding"),
        (e.style.transitionDuration = t + "ms"),
        (e.style.height = `${e.offsetHeight}px`),
        e.offsetHeight,
        (e.style.overflow = "hidden"),
        (e.style.height = i ? `${i}px` : "0px"),
        (e.style.paddingTop = 0),
        (e.style.paddingBottom = 0),
        (e.style.marginTop = 0),
        (e.style.marginBottom = 0),
        window.setTimeout(() => {
          (e.hidden = !i),
            !i && e.style.removeProperty("height"),
            e.style.removeProperty("padding-top"),
            e.style.removeProperty("padding-bottom"),
            e.style.removeProperty("margin-top"),
            e.style.removeProperty("margin-bottom"),
            !i && e.style.removeProperty("overflow"),
            e.style.removeProperty("transition-duration"),
            e.style.removeProperty("transition-property"),
            e.classList.remove("_slide");
        }, t));
    },
    n = (e, t = 500, i = 0) => {
      if (!e.classList.contains("_slide")) {
        e.classList.add("_slide"),
          (e.hidden = !e.hidden && null),
          i && e.style.removeProperty("height");
        let s = e.offsetHeight;
        (e.style.overflow = "hidden"),
          (e.style.height = i ? `${i}px` : "0px"),
          (e.style.paddingTop = 0),
          (e.style.paddingBottom = 0),
          (e.style.marginTop = 0),
          (e.style.marginBottom = 0),
          e.offsetHeight,
          (e.style.transitionProperty = "height, margin, padding"),
          (e.style.transitionDuration = t + "ms"),
          (e.style.height = s + "px"),
          e.style.removeProperty("padding-top"),
          e.style.removeProperty("padding-bottom"),
          e.style.removeProperty("margin-top"),
          e.style.removeProperty("margin-bottom"),
          window.setTimeout(() => {
            e.style.removeProperty("height"),
              e.style.removeProperty("overflow"),
              e.style.removeProperty("transition-duration"),
              e.style.removeProperty("transition-property"),
              e.classList.remove("_slide");
          }, t);
      }
    },
    r = (e, t = 500) => (e.hidden ? n(e, t) : s(e, t)),
    a = !0,
    o = (e = 500) => {
      document.documentElement.classList.contains("lock") ? l(e) : d(e);
    },
    l = (e = 500) => {
      let t = document.querySelector("body");
      if (a) {
        let i = document.querySelectorAll("[data-lp]");
        setTimeout(() => {
          for (let e = 0; e < i.length; e++) {
            i[e].style.paddingRight = "0px";
          }
          (t.style.paddingRight = "0px"),
            document.documentElement.classList.remove("lock");
        }, e),
          (a = !1),
          setTimeout(function () {
            a = !0;
          }, e);
      }
    },
    d = (e = 500) => {
      let t = document.querySelector("body");
      if (a) {
        let i = document.querySelectorAll("[data-lp]");
        for (let e = 0; e < i.length; e++) {
          i[e].style.paddingRight =
            window.innerWidth -
            document.querySelector(".wrapper").offsetWidth +
            "px";
        }
        (t.style.paddingRight =
          window.innerWidth -
          document.querySelector(".wrapper").offsetWidth +
          "px"),
          document.documentElement.classList.add("lock"),
          (a = !1),
          setTimeout(function () {
            a = !0;
          }, e);
      }
    };
  function c(e) {
    setTimeout(() => {
      window.FLS && console.log(e);
    }, 0);
  }
  function p(e, t) {
    const i = Array.from(e).filter(function (e, i, s) {
      if (e.dataset[t]) return e.dataset[t].split(",")[0];
    });
    if (i.length) {
      const e = [];
      i.forEach((i) => {
        const s = {},
          n = i.dataset[t].split(",");
        (s.value = n[0]),
          (s.type = n[1] ? n[1].trim() : "max"),
          (s.item = i),
          e.push(s);
      });
      let s = e.map(function (e) {
        return (
          "(" + e.type + "-width: " + e.value + "px)," + e.value + "," + e.type
        );
      });
      s = (function (e) {
        return e.filter(function (e, t, i) {
          return i.indexOf(e) === t;
        });
      })(s);
      const n = [];
      if (s.length)
        return (
          s.forEach((t) => {
            const i = t.split(","),
              s = i[1],
              r = i[2],
              a = window.matchMedia(i[0]),
              o = e.filter(function (e) {
                if (e.value === s && e.type === r) return !0;
              });
            n.push({ itemsArray: o, matchMedia: a });
          }),
          n
        );
    }
  }
  let u = (e, t = !1, i = 500, s = 0) => {
    const n = document.querySelector(e);
    if (n) {
      let r = "",
        a = 0;
      t &&
        ((r = "header.header"), (a = document.querySelector(r).offsetHeight));
      let o = {
        speedAsDuration: !0,
        speed: i,
        header: r,
        offset: s,
        easing: "easeOutQuad",
      };
      if (
        (document.documentElement.classList.contains("menu-open") &&
          (l(), document.documentElement.classList.remove("menu-open")),
        "undefined" != typeof SmoothScroll)
      )
        new SmoothScroll().animateScroll(n, "", o);
      else {
        let e = n.getBoundingClientRect().top + scrollY;
        window.scrollTo({ top: a ? e - a : e, behavior: "smooth" });
      }
      c(`[gotoBlock]: Юхуу...едем к ${e}`);
    } else c(`[gotoBlock]: Ой ой..Такого блока нет на странице: ${e}`);
  };
  const h = { inputMaskModule: null, selectModule: null };
  let g = {
    getErrors(e) {
      let t = 0,
        i = e.querySelectorAll("*[data-required]");
      return (
        i.length &&
          i.forEach((e) => {
            (null === e.offsetParent && "SELECT" !== e.tagName) ||
              e.disabled ||
              (t += this.validateInput(e));
          }),
        t
      );
    },
    validateInput(e) {
      let t = 0;
      return (
        "email" === e.dataset.required
          ? ((e.value = e.value.replace(" ", "")),
            this.emailTest(e) ? (this.addError(e), t++) : this.removeError(e))
          : ("checkbox" !== e.type || e.checked) && e.value
          ? this.removeError(e)
          : (this.addError(e), t++),
        t
      );
    },
    addError(e) {
      e.classList.add("_form-error"),
        e.parentElement.classList.add("_form-error");
      let t = e.parentElement.querySelector(".form__error");
      t && e.parentElement.removeChild(t),
        e.dataset.error &&
          e.parentElement.insertAdjacentHTML(
            "beforeend",
            `<div class="form__error">${e.dataset.error}</div>`
          );
    },
    removeError(e) {
      e.classList.remove("_form-error"),
        e.parentElement.classList.remove("_form-error"),
        e.parentElement.querySelector(".form__error") &&
          e.parentElement.removeChild(
            e.parentElement.querySelector(".form__error")
          );
    },
    formClean(e) {
      e.reset(),
        setTimeout(() => {
          let t = e.querySelectorAll("input,textarea");
          for (let e = 0; e < t.length; e++) {
            const i = t[e];
            i.parentElement.classList.remove("_form-focus"),
              i.classList.remove("_form-focus"),
              g.removeError(i),
              (i.value = i.dataset.placeholder);
          }
          let i = e.querySelectorAll(".checkbox__input");
          if (i.length > 0)
            for (let e = 0; e < i.length; e++) {
              i[e].checked = !1;
            }
          if (h.selectModule) {
            let t = e.querySelectorAll(".select");
            if (t.length)
              for (let e = 0; e < t.length; e++) {
                const i = t[e].querySelector("select");
                h.selectModule.selectBuild(i);
              }
          }
        }, 0);
    },
    emailTest: (e) =>
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(e.value),
  };
  function m(e) {
    return (
      null !== e &&
      "object" == typeof e &&
      "constructor" in e &&
      e.constructor === Object
    );
  }
  function f(e = {}, t = {}) {
    Object.keys(t).forEach((i) => {
      void 0 === e[i]
        ? (e[i] = t[i])
        : m(t[i]) && m(e[i]) && Object.keys(t[i]).length > 0 && f(e[i], t[i]);
    });
  }
  const v = {
    body: {},
    addEventListener() {},
    removeEventListener() {},
    activeElement: { blur() {}, nodeName: "" },
    querySelector: () => null,
    querySelectorAll: () => [],
    getElementById: () => null,
    createEvent: () => ({ initEvent() {} }),
    createElement: () => ({
      children: [],
      childNodes: [],
      style: {},
      setAttribute() {},
      getElementsByTagName: () => [],
    }),
    createElementNS: () => ({}),
    importNode: () => null,
    location: {
      hash: "",
      host: "",
      hostname: "",
      href: "",
      origin: "",
      pathname: "",
      protocol: "",
      search: "",
    },
  };
  function y() {
    const e = "undefined" != typeof document ? document : {};
    return f(e, v), e;
  }
  const b = {
    document: v,
    navigator: { userAgent: "" },
    location: {
      hash: "",
      host: "",
      hostname: "",
      href: "",
      origin: "",
      pathname: "",
      protocol: "",
      search: "",
    },
    history: { replaceState() {}, pushState() {}, go() {}, back() {} },
    CustomEvent: function () {
      return this;
    },
    addEventListener() {},
    removeEventListener() {},
    getComputedStyle: () => ({ getPropertyValue: () => "" }),
    Image() {},
    Date() {},
    screen: {},
    setTimeout() {},
    clearTimeout() {},
    matchMedia: () => ({}),
    requestAnimationFrame: (e) =>
      "undefined" == typeof setTimeout ? (e(), null) : setTimeout(e, 0),
    cancelAnimationFrame(e) {
      "undefined" != typeof setTimeout && clearTimeout(e);
    },
  };
  function w() {
    const e = "undefined" != typeof window ? window : {};
    return f(e, b), e;
  }
  function S(e, t = 0) {
    return setTimeout(e, t);
  }
  function x() {
    return Date.now();
  }
  function T(e, t = "x") {
    const i = w();
    let s, n, r;
    const a = (function (e) {
      const t = w();
      let i;
      return (
        t.getComputedStyle && (i = t.getComputedStyle(e, null)),
        !i && e.currentStyle && (i = e.currentStyle),
        i || (i = e.style),
        i
      );
    })(e);
    return (
      i.WebKitCSSMatrix
        ? ((n = a.transform || a.webkitTransform),
          n.split(",").length > 6 &&
            (n = n
              .split(", ")
              .map((e) => e.replace(",", "."))
              .join(", ")),
          (r = new i.WebKitCSSMatrix("none" === n ? "" : n)))
        : ((r =
            a.MozTransform ||
            a.OTransform ||
            a.MsTransform ||
            a.msTransform ||
            a.transform ||
            a
              .getPropertyValue("transform")
              .replace("translate(", "matrix(1, 0, 0, 1,")),
          (s = r.toString().split(","))),
      "x" === t &&
        (n = i.WebKitCSSMatrix
          ? r.m41
          : 16 === s.length
          ? parseFloat(s[12])
          : parseFloat(s[4])),
      "y" === t &&
        (n = i.WebKitCSSMatrix
          ? r.m42
          : 16 === s.length
          ? parseFloat(s[13])
          : parseFloat(s[5])),
      n || 0
    );
  }
  function E(e) {
    return (
      "object" == typeof e &&
      null !== e &&
      e.constructor &&
      "Object" === Object.prototype.toString.call(e).slice(8, -1)
    );
  }
  function C(...e) {
    const t = Object(e[0]),
      i = ["__proto__", "constructor", "prototype"];
    for (let n = 1; n < e.length; n += 1) {
      const r = e[n];
      if (
        null != r &&
        ((s = r),
        !("undefined" != typeof window && void 0 !== window.HTMLElement
          ? s instanceof HTMLElement
          : s && (1 === s.nodeType || 11 === s.nodeType)))
      ) {
        const e = Object.keys(Object(r)).filter((e) => i.indexOf(e) < 0);
        for (let i = 0, s = e.length; i < s; i += 1) {
          const s = e[i],
            n = Object.getOwnPropertyDescriptor(r, s);
          void 0 !== n &&
            n.enumerable &&
            (E(t[s]) && E(r[s])
              ? r[s].__swiper__
                ? (t[s] = r[s])
                : C(t[s], r[s])
              : !E(t[s]) && E(r[s])
              ? ((t[s] = {}), r[s].__swiper__ ? (t[s] = r[s]) : C(t[s], r[s]))
              : (t[s] = r[s]));
        }
      }
    }
    var s;
    return t;
  }
  function L(e, t, i) {
    e.style.setProperty(t, i);
  }
  function I({ swiper: e, targetPosition: t, side: i }) {
    const s = w(),
      n = -e.translate;
    let r,
      a = null;
    const o = e.params.speed;
    (e.wrapperEl.style.scrollSnapType = "none"),
      s.cancelAnimationFrame(e.cssModeFrameID);
    const l = t > n ? "next" : "prev",
      d = (e, t) => ("next" === l && e >= t) || ("prev" === l && e <= t),
      c = () => {
        (r = new Date().getTime()), null === a && (a = r);
        const l = Math.max(Math.min((r - a) / o, 1), 0),
          p = 0.5 - Math.cos(l * Math.PI) / 2;
        let u = n + p * (t - n);
        if ((d(u, t) && (u = t), e.wrapperEl.scrollTo({ [i]: u }), d(u, t)))
          return (
            (e.wrapperEl.style.overflow = "hidden"),
            (e.wrapperEl.style.scrollSnapType = ""),
            setTimeout(() => {
              (e.wrapperEl.style.overflow = ""),
                e.wrapperEl.scrollTo({ [i]: u });
            }),
            void s.cancelAnimationFrame(e.cssModeFrameID)
          );
        e.cssModeFrameID = s.requestAnimationFrame(c);
      };
    c();
  }
  function M(e, t = "") {
    return [...e.children].filter((e) => e.matches(t));
  }
  function A(e, t = []) {
    const i = document.createElement(e);
    return i.classList.add(...(Array.isArray(t) ? t : [t])), i;
  }
  function _(e, t) {
    return w().getComputedStyle(e, null).getPropertyValue(t);
  }
  function O(e) {
    let t,
      i = e;
    if (i) {
      for (t = 0; null !== (i = i.previousSibling); )
        1 === i.nodeType && (t += 1);
      return t;
    }
  }
  function P(e, t) {
    const i = [];
    let s = e.parentElement;
    for (; s; )
      t ? s.matches(t) && i.push(s) : i.push(s), (s = s.parentElement);
    return i;
  }
  function k(e, t, i) {
    const s = w();
    return i
      ? e["width" === t ? "offsetWidth" : "offsetHeight"] +
          parseFloat(
            s
              .getComputedStyle(e, null)
              .getPropertyValue("width" === t ? "margin-right" : "margin-top")
          ) +
          parseFloat(
            s
              .getComputedStyle(e, null)
              .getPropertyValue("width" === t ? "margin-left" : "margin-bottom")
          )
      : e.offsetWidth;
  }
  let z, D, B;
  function G() {
    return (
      z ||
        (z = (function () {
          const e = w(),
            t = y();
          return {
            smoothScroll:
              t.documentElement && "scrollBehavior" in t.documentElement.style,
            touch: !!(
              "ontouchstart" in e ||
              (e.DocumentTouch && t instanceof e.DocumentTouch)
            ),
          };
        })()),
      z
    );
  }
  function $(e = {}) {
    return (
      D ||
        (D = (function ({ userAgent: e } = {}) {
          const t = G(),
            i = w(),
            s = i.navigator.platform,
            n = e || i.navigator.userAgent,
            r = { ios: !1, android: !1 },
            a = i.screen.width,
            o = i.screen.height,
            l = n.match(/(Android);?[\s\/]+([\d.]+)?/);
          let d = n.match(/(iPad).*OS\s([\d_]+)/);
          const c = n.match(/(iPod)(.*OS\s([\d_]+))?/),
            p = !d && n.match(/(iPhone\sOS|iOS)\s([\d_]+)/),
            u = "Win32" === s;
          let h = "MacIntel" === s;
          return (
            !d &&
              h &&
              t.touch &&
              [
                "1024x1366",
                "1366x1024",
                "834x1194",
                "1194x834",
                "834x1112",
                "1112x834",
                "768x1024",
                "1024x768",
                "820x1180",
                "1180x820",
                "810x1080",
                "1080x810",
              ].indexOf(`${a}x${o}`) >= 0 &&
              ((d = n.match(/(Version)\/([\d.]+)/)),
              d || (d = [0, 1, "13_0_0"]),
              (h = !1)),
            l && !u && ((r.os = "android"), (r.android = !0)),
            (d || p || c) && ((r.os = "ios"), (r.ios = !0)),
            r
          );
        })(e)),
      D
    );
  }
  function H() {
    return (
      B ||
        (B = (function () {
          const e = w();
          let t = !1;
          function i() {
            const t = e.navigator.userAgent.toLowerCase();
            return (
              t.indexOf("safari") >= 0 &&
              t.indexOf("chrome") < 0 &&
              t.indexOf("android") < 0
            );
          }
          if (i()) {
            const i = String(e.navigator.userAgent);
            if (i.includes("Version/")) {
              const [e, s] = i
                .split("Version/")[1]
                .split(" ")[0]
                .split(".")
                .map((e) => Number(e));
              t = e < 16 || (16 === e && s < 2);
            }
          }
          return {
            isSafari: t || i(),
            needPerspectiveFix: t,
            isWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(
              e.navigator.userAgent
            ),
          };
        })()),
      B
    );
  }
  const F = {
    on(e, t, i) {
      const s = this;
      if (!s.eventsListeners || s.destroyed) return s;
      if ("function" != typeof t) return s;
      const n = i ? "unshift" : "push";
      return (
        e.split(" ").forEach((e) => {
          s.eventsListeners[e] || (s.eventsListeners[e] = []),
            s.eventsListeners[e][n](t);
        }),
        s
      );
    },
    once(e, t, i) {
      const s = this;
      if (!s.eventsListeners || s.destroyed) return s;
      if ("function" != typeof t) return s;
      function n(...i) {
        s.off(e, n), n.__emitterProxy && delete n.__emitterProxy, t.apply(s, i);
      }
      return (n.__emitterProxy = t), s.on(e, n, i);
    },
    onAny(e, t) {
      const i = this;
      if (!i.eventsListeners || i.destroyed) return i;
      if ("function" != typeof e) return i;
      const s = t ? "unshift" : "push";
      return (
        i.eventsAnyListeners.indexOf(e) < 0 && i.eventsAnyListeners[s](e), i
      );
    },
    offAny(e) {
      const t = this;
      if (!t.eventsListeners || t.destroyed) return t;
      if (!t.eventsAnyListeners) return t;
      const i = t.eventsAnyListeners.indexOf(e);
      return i >= 0 && t.eventsAnyListeners.splice(i, 1), t;
    },
    off(e, t) {
      const i = this;
      return !i.eventsListeners || i.destroyed
        ? i
        : i.eventsListeners
        ? (e.split(" ").forEach((e) => {
            void 0 === t
              ? (i.eventsListeners[e] = [])
              : i.eventsListeners[e] &&
                i.eventsListeners[e].forEach((s, n) => {
                  (s === t || (s.__emitterProxy && s.__emitterProxy === t)) &&
                    i.eventsListeners[e].splice(n, 1);
                });
          }),
          i)
        : i;
    },
    emit(...e) {
      const t = this;
      if (!t.eventsListeners || t.destroyed) return t;
      if (!t.eventsListeners) return t;
      let i, s, n;
      "string" == typeof e[0] || Array.isArray(e[0])
        ? ((i = e[0]), (s = e.slice(1, e.length)), (n = t))
        : ((i = e[0].events), (s = e[0].data), (n = e[0].context || t)),
        s.unshift(n);
      return (
        (Array.isArray(i) ? i : i.split(" ")).forEach((e) => {
          t.eventsAnyListeners &&
            t.eventsAnyListeners.length &&
            t.eventsAnyListeners.forEach((t) => {
              t.apply(n, [e, ...s]);
            }),
            t.eventsListeners &&
              t.eventsListeners[e] &&
              t.eventsListeners[e].forEach((e) => {
                e.apply(n, s);
              });
        }),
        t
      );
    },
  };
  const q = {
    updateSize: function () {
      const e = this;
      let t, i;
      const s = e.el;
      (t =
        void 0 !== e.params.width && null !== e.params.width
          ? e.params.width
          : s.clientWidth),
        (i =
          void 0 !== e.params.height && null !== e.params.height
            ? e.params.height
            : s.clientHeight),
        (0 === t && e.isHorizontal()) ||
          (0 === i && e.isVertical()) ||
          ((t =
            t -
            parseInt(_(s, "padding-left") || 0, 10) -
            parseInt(_(s, "padding-right") || 0, 10)),
          (i =
            i -
            parseInt(_(s, "padding-top") || 0, 10) -
            parseInt(_(s, "padding-bottom") || 0, 10)),
          Number.isNaN(t) && (t = 0),
          Number.isNaN(i) && (i = 0),
          Object.assign(e, {
            width: t,
            height: i,
            size: e.isHorizontal() ? t : i,
          }));
    },
    updateSlides: function () {
      const e = this;
      function t(t) {
        return e.isHorizontal()
          ? t
          : {
              width: "height",
              "margin-top": "margin-left",
              "margin-bottom ": "margin-right",
              "margin-left": "margin-top",
              "margin-right": "margin-bottom",
              "padding-left": "padding-top",
              "padding-right": "padding-bottom",
              marginRight: "marginBottom",
            }[t];
      }
      function i(e, i) {
        return parseFloat(e.getPropertyValue(t(i)) || 0);
      }
      const s = e.params,
        {
          wrapperEl: n,
          slidesEl: r,
          size: a,
          rtlTranslate: o,
          wrongRTL: l,
        } = e,
        d = e.virtual && s.virtual.enabled,
        c = d ? e.virtual.slides.length : e.slides.length,
        p = M(r, `.${e.params.slideClass}, swiper-slide`),
        u = d ? e.virtual.slides.length : p.length;
      let h = [];
      const g = [],
        m = [];
      let f = s.slidesOffsetBefore;
      "function" == typeof f && (f = s.slidesOffsetBefore.call(e));
      let v = s.slidesOffsetAfter;
      "function" == typeof v && (v = s.slidesOffsetAfter.call(e));
      const y = e.snapGrid.length,
        b = e.slidesGrid.length;
      let w = s.spaceBetween,
        S = -f,
        x = 0,
        T = 0;
      if (void 0 === a) return;
      "string" == typeof w &&
        w.indexOf("%") >= 0 &&
        (w = (parseFloat(w.replace("%", "")) / 100) * a),
        (e.virtualSize = -w),
        p.forEach((e) => {
          o ? (e.style.marginLeft = "") : (e.style.marginRight = ""),
            (e.style.marginBottom = ""),
            (e.style.marginTop = "");
        }),
        s.centeredSlides &&
          s.cssMode &&
          (L(n, "--swiper-centered-offset-before", ""),
          L(n, "--swiper-centered-offset-after", ""));
      const E = s.grid && s.grid.rows > 1 && e.grid;
      let C;
      E && e.grid.initSlides(u);
      const I =
        "auto" === s.slidesPerView &&
        s.breakpoints &&
        Object.keys(s.breakpoints).filter(
          (e) => void 0 !== s.breakpoints[e].slidesPerView
        ).length > 0;
      for (let n = 0; n < u; n += 1) {
        let r;
        if (
          ((C = 0),
          p[n] && (r = p[n]),
          E && e.grid.updateSlide(n, r, u, t),
          !p[n] || "none" !== _(r, "display"))
        ) {
          if ("auto" === s.slidesPerView) {
            I && (p[n].style[t("width")] = "");
            const a = getComputedStyle(r),
              o = r.style.transform,
              l = r.style.webkitTransform;
            if (
              (o && (r.style.transform = "none"),
              l && (r.style.webkitTransform = "none"),
              s.roundLengths)
            )
              C = e.isHorizontal() ? k(r, "width", !0) : k(r, "height", !0);
            else {
              const e = i(a, "width"),
                t = i(a, "padding-left"),
                s = i(a, "padding-right"),
                n = i(a, "margin-left"),
                o = i(a, "margin-right"),
                l = a.getPropertyValue("box-sizing");
              if (l && "border-box" === l) C = e + n + o;
              else {
                const { clientWidth: i, offsetWidth: a } = r;
                C = e + t + s + n + o + (a - i);
              }
            }
            o && (r.style.transform = o),
              l && (r.style.webkitTransform = l),
              s.roundLengths && (C = Math.floor(C));
          } else
            (C = (a - (s.slidesPerView - 1) * w) / s.slidesPerView),
              s.roundLengths && (C = Math.floor(C)),
              p[n] && (p[n].style[t("width")] = `${C}px`);
          p[n] && (p[n].swiperSlideSize = C),
            m.push(C),
            s.centeredSlides
              ? ((S = S + C / 2 + x / 2 + w),
                0 === x && 0 !== n && (S = S - a / 2 - w),
                0 === n && (S = S - a / 2 - w),
                Math.abs(S) < 0.001 && (S = 0),
                s.roundLengths && (S = Math.floor(S)),
                T % s.slidesPerGroup == 0 && h.push(S),
                g.push(S))
              : (s.roundLengths && (S = Math.floor(S)),
                (T - Math.min(e.params.slidesPerGroupSkip, T)) %
                  e.params.slidesPerGroup ==
                  0 && h.push(S),
                g.push(S),
                (S = S + C + w)),
            (e.virtualSize += C + w),
            (x = C),
            (T += 1);
        }
      }
      if (
        ((e.virtualSize = Math.max(e.virtualSize, a) + v),
        o &&
          l &&
          ("slide" === s.effect || "coverflow" === s.effect) &&
          (n.style.width = `${e.virtualSize + s.spaceBetween}px`),
        s.setWrapperSize &&
          (n.style[t("width")] = `${e.virtualSize + s.spaceBetween}px`),
        E && e.grid.updateWrapperSize(C, h, t),
        !s.centeredSlides)
      ) {
        const t = [];
        for (let i = 0; i < h.length; i += 1) {
          let n = h[i];
          s.roundLengths && (n = Math.floor(n)),
            h[i] <= e.virtualSize - a && t.push(n);
        }
        (h = t),
          Math.floor(e.virtualSize - a) - Math.floor(h[h.length - 1]) > 1 &&
            h.push(e.virtualSize - a);
      }
      if (d && s.loop) {
        const t = m[0] + w;
        if (s.slidesPerGroup > 1) {
          const i = Math.ceil(
              (e.virtual.slidesBefore + e.virtual.slidesAfter) /
                s.slidesPerGroup
            ),
            n = t * s.slidesPerGroup;
          for (let e = 0; e < i; e += 1) h.push(h[h.length - 1] + n);
        }
        for (
          let i = 0;
          i < e.virtual.slidesBefore + e.virtual.slidesAfter;
          i += 1
        )
          1 === s.slidesPerGroup && h.push(h[h.length - 1] + t),
            g.push(g[g.length - 1] + t),
            (e.virtualSize += t);
      }
      if ((0 === h.length && (h = [0]), 0 !== s.spaceBetween)) {
        const i = e.isHorizontal() && o ? "marginLeft" : t("marginRight");
        p.filter(
          (e, t) => !(s.cssMode && !s.loop) || t !== p.length - 1
        ).forEach((e) => {
          e.style[i] = `${w}px`;
        });
      }
      if (s.centeredSlides && s.centeredSlidesBounds) {
        let e = 0;
        m.forEach((t) => {
          e += t + (s.spaceBetween ? s.spaceBetween : 0);
        }),
          (e -= s.spaceBetween);
        const t = e - a;
        h = h.map((e) => (e < 0 ? -f : e > t ? t + v : e));
      }
      if (s.centerInsufficientSlides) {
        let e = 0;
        if (
          (m.forEach((t) => {
            e += t + (s.spaceBetween ? s.spaceBetween : 0);
          }),
          (e -= s.spaceBetween),
          e < a)
        ) {
          const t = (a - e) / 2;
          h.forEach((e, i) => {
            h[i] = e - t;
          }),
            g.forEach((e, i) => {
              g[i] = e + t;
            });
        }
      }
      if (
        (Object.assign(e, {
          slides: p,
          snapGrid: h,
          slidesGrid: g,
          slidesSizesGrid: m,
        }),
        s.centeredSlides && s.cssMode && !s.centeredSlidesBounds)
      ) {
        L(n, "--swiper-centered-offset-before", -h[0] + "px"),
          L(
            n,
            "--swiper-centered-offset-after",
            e.size / 2 - m[m.length - 1] / 2 + "px"
          );
        const t = -e.snapGrid[0],
          i = -e.slidesGrid[0];
        (e.snapGrid = e.snapGrid.map((e) => e + t)),
          (e.slidesGrid = e.slidesGrid.map((e) => e + i));
      }
      if (
        (u !== c && e.emit("slidesLengthChange"),
        h.length !== y &&
          (e.params.watchOverflow && e.checkOverflow(),
          e.emit("snapGridLengthChange")),
        g.length !== b && e.emit("slidesGridLengthChange"),
        s.watchSlidesProgress && e.updateSlidesOffset(),
        !(d || s.cssMode || ("slide" !== s.effect && "fade" !== s.effect)))
      ) {
        const t = `${s.containerModifierClass}backface-hidden`,
          i = e.el.classList.contains(t);
        u <= s.maxBackfaceHiddenSlides
          ? i || e.el.classList.add(t)
          : i && e.el.classList.remove(t);
      }
    },
    updateAutoHeight: function (e) {
      const t = this,
        i = [],
        s = t.virtual && t.params.virtual.enabled;
      let n,
        r = 0;
      "number" == typeof e
        ? t.setTransition(e)
        : !0 === e && t.setTransition(t.params.speed);
      const a = (e) =>
        s
          ? t.slides.filter(
              (t) =>
                parseInt(t.getAttribute("data-swiper-slide-index"), 10) === e
            )[0]
          : t.slides[e];
      if ("auto" !== t.params.slidesPerView && t.params.slidesPerView > 1)
        if (t.params.centeredSlides)
          (t.visibleSlides || []).forEach((e) => {
            i.push(e);
          });
        else
          for (n = 0; n < Math.ceil(t.params.slidesPerView); n += 1) {
            const e = t.activeIndex + n;
            if (e > t.slides.length && !s) break;
            i.push(a(e));
          }
      else i.push(a(t.activeIndex));
      for (n = 0; n < i.length; n += 1)
        if (void 0 !== i[n]) {
          const e = i[n].offsetHeight;
          r = e > r ? e : r;
        }
      (r || 0 === r) && (t.wrapperEl.style.height = `${r}px`);
    },
    updateSlidesOffset: function () {
      const e = this,
        t = e.slides,
        i = e.isElement
          ? e.isHorizontal()
            ? e.wrapperEl.offsetLeft
            : e.wrapperEl.offsetTop
          : 0;
      for (let s = 0; s < t.length; s += 1)
        t[s].swiperSlideOffset =
          (e.isHorizontal() ? t[s].offsetLeft : t[s].offsetTop) - i;
    },
    updateSlidesProgress: function (e = (this && this.translate) || 0) {
      const t = this,
        i = t.params,
        { slides: s, rtlTranslate: n, snapGrid: r } = t;
      if (0 === s.length) return;
      void 0 === s[0].swiperSlideOffset && t.updateSlidesOffset();
      let a = -e;
      n && (a = e),
        s.forEach((e) => {
          e.classList.remove(i.slideVisibleClass);
        }),
        (t.visibleSlidesIndexes = []),
        (t.visibleSlides = []);
      for (let e = 0; e < s.length; e += 1) {
        const o = s[e];
        let l = o.swiperSlideOffset;
        i.cssMode && i.centeredSlides && (l -= s[0].swiperSlideOffset);
        const d =
            (a + (i.centeredSlides ? t.minTranslate() : 0) - l) /
            (o.swiperSlideSize + i.spaceBetween),
          c =
            (a - r[0] + (i.centeredSlides ? t.minTranslate() : 0) - l) /
            (o.swiperSlideSize + i.spaceBetween),
          p = -(a - l),
          u = p + t.slidesSizesGrid[e];
        ((p >= 0 && p < t.size - 1) ||
          (u > 1 && u <= t.size) ||
          (p <= 0 && u >= t.size)) &&
          (t.visibleSlides.push(o),
          t.visibleSlidesIndexes.push(e),
          s[e].classList.add(i.slideVisibleClass)),
          (o.progress = n ? -d : d),
          (o.originalProgress = n ? -c : c);
      }
    },
    updateProgress: function (e) {
      const t = this;
      if (void 0 === e) {
        const i = t.rtlTranslate ? -1 : 1;
        e = (t && t.translate && t.translate * i) || 0;
      }
      const i = t.params,
        s = t.maxTranslate() - t.minTranslate();
      let { progress: n, isBeginning: r, isEnd: a, progressLoop: o } = t;
      const l = r,
        d = a;
      if (0 === s) (n = 0), (r = !0), (a = !0);
      else {
        n = (e - t.minTranslate()) / s;
        const i = Math.abs(e - t.minTranslate()) < 1,
          o = Math.abs(e - t.maxTranslate()) < 1;
        (r = i || n <= 0), (a = o || n >= 1), i && (n = 0), o && (n = 1);
      }
      if (i.loop) {
        const i = O(
            t.slides.filter(
              (e) => "0" === e.getAttribute("data-swiper-slide-index")
            )[0]
          ),
          s = O(
            t.slides.filter(
              (e) =>
                1 * e.getAttribute("data-swiper-slide-index") ==
                t.slides.length - 1
            )[0]
          ),
          n = t.slidesGrid[i],
          r = t.slidesGrid[s],
          a = t.slidesGrid[t.slidesGrid.length - 1],
          l = Math.abs(e);
        (o = l >= n ? (l - n) / a : (l + a - r) / a), o > 1 && (o -= 1);
      }
      Object.assign(t, {
        progress: n,
        progressLoop: o,
        isBeginning: r,
        isEnd: a,
      }),
        (i.watchSlidesProgress || (i.centeredSlides && i.autoHeight)) &&
          t.updateSlidesProgress(e),
        r && !l && t.emit("reachBeginning toEdge"),
        a && !d && t.emit("reachEnd toEdge"),
        ((l && !r) || (d && !a)) && t.emit("fromEdge"),
        t.emit("progress", n);
    },
    updateSlidesClasses: function () {
      const e = this,
        { slides: t, params: i, slidesEl: s, activeIndex: n } = e,
        r = e.virtual && i.virtual.enabled,
        a = (e) => M(s, `.${i.slideClass}${e}, swiper-slide${e}`)[0];
      let o;
      if (
        (t.forEach((e) => {
          e.classList.remove(
            i.slideActiveClass,
            i.slideNextClass,
            i.slidePrevClass
          );
        }),
        r)
      )
        if (i.loop) {
          let t = n - e.virtual.slidesBefore;
          t < 0 && (t = e.virtual.slides.length + t),
            t >= e.virtual.slides.length && (t -= e.virtual.slides.length),
            (o = a(`[data-swiper-slide-index="${t}"]`));
        } else o = a(`[data-swiper-slide-index="${n}"]`);
      else o = t[n];
      if (o) {
        o.classList.add(i.slideActiveClass);
        let e = (function (e, t) {
          const i = [];
          for (; e.nextElementSibling; ) {
            const s = e.nextElementSibling;
            t ? s.matches(t) && i.push(s) : i.push(s), (e = s);
          }
          return i;
        })(o, `.${i.slideClass}, swiper-slide`)[0];
        i.loop && !e && (e = t[0]), e && e.classList.add(i.slideNextClass);
        let s = (function (e, t) {
          const i = [];
          for (; e.previousElementSibling; ) {
            const s = e.previousElementSibling;
            t ? s.matches(t) && i.push(s) : i.push(s), (e = s);
          }
          return i;
        })(o, `.${i.slideClass}, swiper-slide`)[0];
        i.loop && 0 === !s && (s = t[t.length - 1]),
          s && s.classList.add(i.slidePrevClass);
      }
      e.emitSlidesClasses();
    },
    updateActiveIndex: function (e) {
      const t = this,
        i = t.rtlTranslate ? t.translate : -t.translate,
        {
          snapGrid: s,
          params: n,
          activeIndex: r,
          realIndex: a,
          snapIndex: o,
        } = t;
      let l,
        d = e;
      const c = (e) => {
        let i = e - t.virtual.slidesBefore;
        return (
          i < 0 && (i = t.virtual.slides.length + i),
          i >= t.virtual.slides.length && (i -= t.virtual.slides.length),
          i
        );
      };
      if (
        (void 0 === d &&
          (d = (function (e) {
            const { slidesGrid: t, params: i } = e,
              s = e.rtlTranslate ? e.translate : -e.translate;
            let n;
            for (let e = 0; e < t.length; e += 1)
              void 0 !== t[e + 1]
                ? s >= t[e] && s < t[e + 1] - (t[e + 1] - t[e]) / 2
                  ? (n = e)
                  : s >= t[e] && s < t[e + 1] && (n = e + 1)
                : s >= t[e] && (n = e);
            return (
              i.normalizeSlideIndex && (n < 0 || void 0 === n) && (n = 0), n
            );
          })(t)),
        s.indexOf(i) >= 0)
      )
        l = s.indexOf(i);
      else {
        const e = Math.min(n.slidesPerGroupSkip, d);
        l = e + Math.floor((d - e) / n.slidesPerGroup);
      }
      if ((l >= s.length && (l = s.length - 1), d === r))
        return (
          l !== o && ((t.snapIndex = l), t.emit("snapIndexChange")),
          void (
            t.params.loop &&
            t.virtual &&
            t.params.virtual.enabled &&
            (t.realIndex = c(d))
          )
        );
      let p;
      (p =
        t.virtual && n.virtual.enabled && n.loop
          ? c(d)
          : t.slides[d]
          ? parseInt(
              t.slides[d].getAttribute("data-swiper-slide-index") || d,
              10
            )
          : d),
        Object.assign(t, {
          snapIndex: l,
          realIndex: p,
          previousIndex: r,
          activeIndex: d,
        }),
        t.emit("activeIndexChange"),
        t.emit("snapIndexChange"),
        a !== p && t.emit("realIndexChange"),
        (t.initialized || t.params.runCallbacksOnInit) && t.emit("slideChange");
    },
    updateClickedSlide: function (e) {
      const t = this,
        i = t.params,
        s = e.closest(`.${i.slideClass}, swiper-slide`);
      let n,
        r = !1;
      if (s)
        for (let e = 0; e < t.slides.length; e += 1)
          if (t.slides[e] === s) {
            (r = !0), (n = e);
            break;
          }
      if (!s || !r)
        return (t.clickedSlide = void 0), void (t.clickedIndex = void 0);
      (t.clickedSlide = s),
        t.virtual && t.params.virtual.enabled
          ? (t.clickedIndex = parseInt(
              s.getAttribute("data-swiper-slide-index"),
              10
            ))
          : (t.clickedIndex = n),
        i.slideToClickedSlide &&
          void 0 !== t.clickedIndex &&
          t.clickedIndex !== t.activeIndex &&
          t.slideToClickedSlide();
    },
  };
  const N = {
    getTranslate: function (e = this.isHorizontal() ? "x" : "y") {
      const { params: t, rtlTranslate: i, translate: s, wrapperEl: n } = this;
      if (t.virtualTranslate) return i ? -s : s;
      if (t.cssMode) return s;
      let r = T(n, e);
      return i && (r = -r), r || 0;
    },
    setTranslate: function (e, t) {
      const i = this,
        { rtlTranslate: s, params: n, wrapperEl: r, progress: a } = i;
      let o,
        l = 0,
        d = 0;
      i.isHorizontal() ? (l = s ? -e : e) : (d = e),
        n.roundLengths && ((l = Math.floor(l)), (d = Math.floor(d))),
        n.cssMode
          ? (r[i.isHorizontal() ? "scrollLeft" : "scrollTop"] = i.isHorizontal()
              ? -l
              : -d)
          : n.virtualTranslate ||
            (r.style.transform = `translate3d(${l}px, ${d}px, 0px)`),
        (i.previousTranslate = i.translate),
        (i.translate = i.isHorizontal() ? l : d);
      const c = i.maxTranslate() - i.minTranslate();
      (o = 0 === c ? 0 : (e - i.minTranslate()) / c),
        o !== a && i.updateProgress(e),
        i.emit("setTranslate", i.translate, t);
    },
    minTranslate: function () {
      return -this.snapGrid[0];
    },
    maxTranslate: function () {
      return -this.snapGrid[this.snapGrid.length - 1];
    },
    translateTo: function (e = 0, t = this.params.speed, i = !0, s = !0, n) {
      const r = this,
        { params: a, wrapperEl: o } = r;
      if (r.animating && a.preventInteractionOnTransition) return !1;
      const l = r.minTranslate(),
        d = r.maxTranslate();
      let c;
      if (
        ((c = s && e > l ? l : s && e < d ? d : e),
        r.updateProgress(c),
        a.cssMode)
      ) {
        const e = r.isHorizontal();
        if (0 === t) o[e ? "scrollLeft" : "scrollTop"] = -c;
        else {
          if (!r.support.smoothScroll)
            return (
              I({ swiper: r, targetPosition: -c, side: e ? "left" : "top" }), !0
            );
          o.scrollTo({ [e ? "left" : "top"]: -c, behavior: "smooth" });
        }
        return !0;
      }
      return (
        0 === t
          ? (r.setTransition(0),
            r.setTranslate(c),
            i &&
              (r.emit("beforeTransitionStart", t, n), r.emit("transitionEnd")))
          : (r.setTransition(t),
            r.setTranslate(c),
            i &&
              (r.emit("beforeTransitionStart", t, n),
              r.emit("transitionStart")),
            r.animating ||
              ((r.animating = !0),
              r.onTranslateToWrapperTransitionEnd ||
                (r.onTranslateToWrapperTransitionEnd = function (e) {
                  r &&
                    !r.destroyed &&
                    e.target === this &&
                    (r.wrapperEl.removeEventListener(
                      "transitionend",
                      r.onTranslateToWrapperTransitionEnd
                    ),
                    (r.onTranslateToWrapperTransitionEnd = null),
                    delete r.onTranslateToWrapperTransitionEnd,
                    i && r.emit("transitionEnd"));
                }),
              r.wrapperEl.addEventListener(
                "transitionend",
                r.onTranslateToWrapperTransitionEnd
              ))),
        !0
      );
    },
  };
  function V({ swiper: e, runCallbacks: t, direction: i, step: s }) {
    const { activeIndex: n, previousIndex: r } = e;
    let a = i;
    if (
      (a || (a = n > r ? "next" : n < r ? "prev" : "reset"),
      e.emit(`transition${s}`),
      t && n !== r)
    ) {
      if ("reset" === a) return void e.emit(`slideResetTransition${s}`);
      e.emit(`slideChangeTransition${s}`),
        "next" === a
          ? e.emit(`slideNextTransition${s}`)
          : e.emit(`slidePrevTransition${s}`);
    }
  }
  const j = {
    slideTo: function (e = 0, t = this.params.speed, i = !0, s, n) {
      "string" == typeof e && (e = parseInt(e, 10));
      const r = this;
      let a = e;
      a < 0 && (a = 0);
      const {
        params: o,
        snapGrid: l,
        slidesGrid: d,
        previousIndex: c,
        activeIndex: p,
        rtlTranslate: u,
        wrapperEl: h,
        enabled: g,
      } = r;
      if ((r.animating && o.preventInteractionOnTransition) || (!g && !s && !n))
        return !1;
      const m = Math.min(r.params.slidesPerGroupSkip, a);
      let f = m + Math.floor((a - m) / r.params.slidesPerGroup);
      f >= l.length && (f = l.length - 1);
      const v = -l[f];
      if (o.normalizeSlideIndex)
        for (let e = 0; e < d.length; e += 1) {
          const t = -Math.floor(100 * v),
            i = Math.floor(100 * d[e]),
            s = Math.floor(100 * d[e + 1]);
          void 0 !== d[e + 1]
            ? t >= i && t < s - (s - i) / 2
              ? (a = e)
              : t >= i && t < s && (a = e + 1)
            : t >= i && (a = e);
        }
      if (r.initialized && a !== p) {
        if (!r.allowSlideNext && v < r.translate && v < r.minTranslate())
          return !1;
        if (
          !r.allowSlidePrev &&
          v > r.translate &&
          v > r.maxTranslate() &&
          (p || 0) !== a
        )
          return !1;
      }
      let y;
      if (
        (a !== (c || 0) && i && r.emit("beforeSlideChangeStart"),
        r.updateProgress(v),
        (y = a > p ? "next" : a < p ? "prev" : "reset"),
        (u && -v === r.translate) || (!u && v === r.translate))
      )
        return (
          r.updateActiveIndex(a),
          o.autoHeight && r.updateAutoHeight(),
          r.updateSlidesClasses(),
          "slide" !== o.effect && r.setTranslate(v),
          "reset" !== y && (r.transitionStart(i, y), r.transitionEnd(i, y)),
          !1
        );
      if (o.cssMode) {
        const e = r.isHorizontal(),
          i = u ? v : -v;
        if (0 === t) {
          const t = r.virtual && r.params.virtual.enabled;
          t &&
            ((r.wrapperEl.style.scrollSnapType = "none"),
            (r._immediateVirtual = !0)),
            t && !r._cssModeVirtualInitialSet && r.params.initialSlide > 0
              ? ((r._cssModeVirtualInitialSet = !0),
                requestAnimationFrame(() => {
                  h[e ? "scrollLeft" : "scrollTop"] = i;
                }))
              : (h[e ? "scrollLeft" : "scrollTop"] = i),
            t &&
              requestAnimationFrame(() => {
                (r.wrapperEl.style.scrollSnapType = ""),
                  (r._immediateVirtual = !1);
              });
        } else {
          if (!r.support.smoothScroll)
            return (
              I({ swiper: r, targetPosition: i, side: e ? "left" : "top" }), !0
            );
          h.scrollTo({ [e ? "left" : "top"]: i, behavior: "smooth" });
        }
        return !0;
      }
      return (
        r.setTransition(t),
        r.setTranslate(v),
        r.updateActiveIndex(a),
        r.updateSlidesClasses(),
        r.emit("beforeTransitionStart", t, s),
        r.transitionStart(i, y),
        0 === t
          ? r.transitionEnd(i, y)
          : r.animating ||
            ((r.animating = !0),
            r.onSlideToWrapperTransitionEnd ||
              (r.onSlideToWrapperTransitionEnd = function (e) {
                r &&
                  !r.destroyed &&
                  e.target === this &&
                  (r.wrapperEl.removeEventListener(
                    "transitionend",
                    r.onSlideToWrapperTransitionEnd
                  ),
                  (r.onSlideToWrapperTransitionEnd = null),
                  delete r.onSlideToWrapperTransitionEnd,
                  r.transitionEnd(i, y));
              }),
            r.wrapperEl.addEventListener(
              "transitionend",
              r.onSlideToWrapperTransitionEnd
            )),
        !0
      );
    },
    slideToLoop: function (e = 0, t = this.params.speed, i = !0, s) {
      if ("string" == typeof e) {
        e = parseInt(e, 10);
      }
      const n = this;
      let r = e;
      return (
        n.params.loop &&
          (n.virtual && n.params.virtual.enabled
            ? (r += n.virtual.slidesBefore)
            : (r = O(
                n.slides.filter(
                  (e) => 1 * e.getAttribute("data-swiper-slide-index") === r
                )[0]
              ))),
        n.slideTo(r, t, i, s)
      );
    },
    slideNext: function (e = this.params.speed, t = !0, i) {
      const s = this,
        { enabled: n, params: r, animating: a } = s;
      if (!n) return s;
      let o = r.slidesPerGroup;
      "auto" === r.slidesPerView &&
        1 === r.slidesPerGroup &&
        r.slidesPerGroupAuto &&
        (o = Math.max(s.slidesPerViewDynamic("current", !0), 1));
      const l = s.activeIndex < r.slidesPerGroupSkip ? 1 : o,
        d = s.virtual && r.virtual.enabled;
      if (r.loop) {
        if (a && !d && r.loopPreventsSliding) return !1;
        s.loopFix({ direction: "next" }),
          (s._clientLeft = s.wrapperEl.clientLeft);
      }
      return r.rewind && s.isEnd
        ? s.slideTo(0, e, t, i)
        : s.slideTo(s.activeIndex + l, e, t, i);
    },
    slidePrev: function (e = this.params.speed, t = !0, i) {
      const s = this,
        {
          params: n,
          snapGrid: r,
          slidesGrid: a,
          rtlTranslate: o,
          enabled: l,
          animating: d,
        } = s;
      if (!l) return s;
      const c = s.virtual && n.virtual.enabled;
      if (n.loop) {
        if (d && !c && n.loopPreventsSliding) return !1;
        s.loopFix({ direction: "prev" }),
          (s._clientLeft = s.wrapperEl.clientLeft);
      }
      function p(e) {
        return e < 0 ? -Math.floor(Math.abs(e)) : Math.floor(e);
      }
      const u = p(o ? s.translate : -s.translate),
        h = r.map((e) => p(e));
      let g = r[h.indexOf(u) - 1];
      if (void 0 === g && n.cssMode) {
        let e;
        r.forEach((t, i) => {
          u >= t && (e = i);
        }),
          void 0 !== e && (g = r[e > 0 ? e - 1 : e]);
      }
      let m = 0;
      if (
        (void 0 !== g &&
          ((m = a.indexOf(g)),
          m < 0 && (m = s.activeIndex - 1),
          "auto" === n.slidesPerView &&
            1 === n.slidesPerGroup &&
            n.slidesPerGroupAuto &&
            ((m = m - s.slidesPerViewDynamic("previous", !0) + 1),
            (m = Math.max(m, 0)))),
        n.rewind && s.isBeginning)
      ) {
        const n =
          s.params.virtual && s.params.virtual.enabled && s.virtual
            ? s.virtual.slides.length - 1
            : s.slides.length - 1;
        return s.slideTo(n, e, t, i);
      }
      return s.slideTo(m, e, t, i);
    },
    slideReset: function (e = this.params.speed, t = !0, i) {
      return this.slideTo(this.activeIndex, e, t, i);
    },
    slideToClosest: function (e = this.params.speed, t = !0, i, s = 0.5) {
      const n = this;
      let r = n.activeIndex;
      const a = Math.min(n.params.slidesPerGroupSkip, r),
        o = a + Math.floor((r - a) / n.params.slidesPerGroup),
        l = n.rtlTranslate ? n.translate : -n.translate;
      if (l >= n.snapGrid[o]) {
        const e = n.snapGrid[o];
        l - e > (n.snapGrid[o + 1] - e) * s && (r += n.params.slidesPerGroup);
      } else {
        const e = n.snapGrid[o - 1];
        l - e <= (n.snapGrid[o] - e) * s && (r -= n.params.slidesPerGroup);
      }
      return (
        (r = Math.max(r, 0)),
        (r = Math.min(r, n.slidesGrid.length - 1)),
        n.slideTo(r, e, t, i)
      );
    },
    slideToClickedSlide: function () {
      const e = this,
        { params: t, slidesEl: i } = e,
        s =
          "auto" === t.slidesPerView
            ? e.slidesPerViewDynamic()
            : t.slidesPerView;
      let n,
        r = e.clickedIndex;
      const a = e.isElement ? "swiper-slide" : `.${t.slideClass}`;
      if (t.loop) {
        if (e.animating) return;
        (n = parseInt(
          e.clickedSlide.getAttribute("data-swiper-slide-index"),
          10
        )),
          t.centeredSlides
            ? r < e.loopedSlides - s / 2 ||
              r > e.slides.length - e.loopedSlides + s / 2
              ? (e.loopFix(),
                (r = O(M(i, `${a}[data-swiper-slide-index="${n}"]`)[0])),
                S(() => {
                  e.slideTo(r);
                }))
              : e.slideTo(r)
            : r > e.slides.length - s
            ? (e.loopFix(),
              (r = O(M(i, `${a}[data-swiper-slide-index="${n}"]`)[0])),
              S(() => {
                e.slideTo(r);
              }))
            : e.slideTo(r);
      } else e.slideTo(r);
    },
  };
  const W = {
    loopCreate: function (e) {
      const t = this,
        { params: i, slidesEl: s } = t;
      if (!i.loop || (t.virtual && t.params.virtual.enabled)) return;
      M(s, `.${i.slideClass}, swiper-slide`).forEach((e, t) => {
        e.setAttribute("data-swiper-slide-index", t);
      }),
        t.loopFix({
          slideRealIndex: e,
          direction: i.centeredSlides ? void 0 : "next",
        });
    },
    loopFix: function ({
      slideRealIndex: e,
      slideTo: t = !0,
      direction: i,
      setTranslate: s,
      activeSlideIndex: n,
      byController: r,
      byMousewheel: a,
    } = {}) {
      const o = this;
      if (!o.params.loop) return;
      o.emit("beforeLoopFix");
      const {
        slides: l,
        allowSlidePrev: d,
        allowSlideNext: c,
        slidesEl: p,
        params: u,
      } = o;
      if (
        ((o.allowSlidePrev = !0),
        (o.allowSlideNext = !0),
        o.virtual && u.virtual.enabled)
      )
        return (
          t &&
            (u.centeredSlides || 0 !== o.snapIndex
              ? u.centeredSlides && o.snapIndex < u.slidesPerView
                ? o.slideTo(o.virtual.slides.length + o.snapIndex, 0, !1, !0)
                : o.snapIndex === o.snapGrid.length - 1 &&
                  o.slideTo(o.virtual.slidesBefore, 0, !1, !0)
              : o.slideTo(o.virtual.slides.length, 0, !1, !0)),
          (o.allowSlidePrev = d),
          (o.allowSlideNext = c),
          void o.emit("loopFix")
        );
      const h =
        "auto" === u.slidesPerView
          ? o.slidesPerViewDynamic()
          : Math.ceil(parseFloat(u.slidesPerView, 10));
      let g = u.loopedSlides || h;
      g % u.slidesPerGroup != 0 &&
        (g += u.slidesPerGroup - (g % u.slidesPerGroup)),
        (o.loopedSlides = g);
      const m = [],
        f = [];
      let v = o.activeIndex;
      void 0 === n
        ? (n = O(
            o.slides.filter((e) =>
              e.classList.contains("swiper-slide-active")
            )[0]
          ))
        : (v = n);
      const y = "next" === i || !i,
        b = "prev" === i || !i;
      let w = 0,
        S = 0;
      if (n < g) {
        w = g - n;
        for (let e = 0; e < g - n; e += 1) {
          const t = e - Math.floor(e / l.length) * l.length;
          m.push(l.length - t - 1);
        }
      } else if (n > o.slides.length - 2 * g) {
        S = n - (o.slides.length - 2 * g);
        for (let e = 0; e < S; e += 1) {
          const t = e - Math.floor(e / l.length) * l.length;
          f.push(t);
        }
      }
      if (
        (b &&
          m.forEach((e) => {
            p.prepend(o.slides[e]);
          }),
        y &&
          f.forEach((e) => {
            p.append(o.slides[e]);
          }),
        o.recalcSlides(),
        u.watchSlidesProgress && o.updateSlidesOffset(),
        t)
      )
        if (m.length > 0 && b)
          if (void 0 === e) {
            const e = o.slidesGrid[v],
              t = o.slidesGrid[v + w] - e;
            a
              ? o.setTranslate(o.translate - t)
              : (o.slideTo(v + w, 0, !1, !0),
                s && (o.touches[o.isHorizontal() ? "startX" : "startY"] += t));
          } else s && o.slideToLoop(e, 0, !1, !0);
        else if (f.length > 0 && y)
          if (void 0 === e) {
            const e = o.slidesGrid[v],
              t = o.slidesGrid[v - S] - e;
            a
              ? o.setTranslate(o.translate - t)
              : (o.slideTo(v - S, 0, !1, !0),
                s && (o.touches[o.isHorizontal() ? "startX" : "startY"] += t));
          } else o.slideToLoop(e, 0, !1, !0);
      if (
        ((o.allowSlidePrev = d),
        (o.allowSlideNext = c),
        o.controller && o.controller.control && !r)
      ) {
        const t = {
          slideRealIndex: e,
          slideTo: !1,
          direction: i,
          setTranslate: s,
          activeSlideIndex: n,
          byController: !0,
        };
        Array.isArray(o.controller.control)
          ? o.controller.control.forEach((e) => {
              e.params.loop && e.loopFix(t);
            })
          : o.controller.control instanceof o.constructor &&
            o.controller.control.params.loop &&
            o.controller.control.loopFix(t);
      }
      o.emit("loopFix");
    },
    loopDestroy: function () {
      const e = this,
        { slides: t, params: i, slidesEl: s } = e;
      if (!i.loop || (e.virtual && e.params.virtual.enabled)) return;
      e.recalcSlides();
      const n = [];
      t.forEach((e) => {
        const t =
          void 0 === e.swiperSlideIndex
            ? 1 * e.getAttribute("data-swiper-slide-index")
            : e.swiperSlideIndex;
        n[t] = e;
      }),
        t.forEach((e) => {
          e.removeAttribute("data-swiper-slide-index");
        }),
        n.forEach((e) => {
          s.append(e);
        }),
        e.recalcSlides(),
        e.slideTo(e.realIndex, 0);
    },
  };
  function R(e) {
    const t = this,
      i = y(),
      s = w(),
      n = t.touchEventsData;
    n.evCache.push(e);
    const { params: r, touches: a, enabled: o } = t;
    if (!o) return;
    if (!r.simulateTouch && "mouse" === e.pointerType) return;
    if (t.animating && r.preventInteractionOnTransition) return;
    !t.animating && r.cssMode && r.loop && t.loopFix();
    let l = e;
    l.originalEvent && (l = l.originalEvent);
    let d = l.target;
    if ("wrapper" === r.touchEventsTarget && !t.wrapperEl.contains(d)) return;
    if ("which" in l && 3 === l.which) return;
    if ("button" in l && l.button > 0) return;
    if (n.isTouched && n.isMoved) return;
    const c = !!r.noSwipingClass && "" !== r.noSwipingClass,
      p = e.composedPath ? e.composedPath() : e.path;
    c && l.target && l.target.shadowRoot && p && (d = p[0]);
    const u = r.noSwipingSelector
        ? r.noSwipingSelector
        : `.${r.noSwipingClass}`,
      h = !(!l.target || !l.target.shadowRoot);
    if (
      r.noSwiping &&
      (h
        ? (function (e, t = this) {
            return (function t(i) {
              if (!i || i === y() || i === w()) return null;
              i.assignedSlot && (i = i.assignedSlot);
              const s = i.closest(e);
              return s || i.getRootNode ? s || t(i.getRootNode().host) : null;
            })(t);
          })(u, d)
        : d.closest(u))
    )
      return void (t.allowClick = !0);
    if (r.swipeHandler && !d.closest(r.swipeHandler)) return;
    (a.currentX = l.pageX), (a.currentY = l.pageY);
    const g = a.currentX,
      m = a.currentY,
      f = r.edgeSwipeDetection || r.iOSEdgeSwipeDetection,
      v = r.edgeSwipeThreshold || r.iOSEdgeSwipeThreshold;
    if (f && (g <= v || g >= s.innerWidth - v)) {
      if ("prevent" !== f) return;
      e.preventDefault();
    }
    Object.assign(n, {
      isTouched: !0,
      isMoved: !1,
      allowTouchCallbacks: !0,
      isScrolling: void 0,
      startMoving: void 0,
    }),
      (a.startX = g),
      (a.startY = m),
      (n.touchStartTime = x()),
      (t.allowClick = !0),
      t.updateSize(),
      (t.swipeDirection = void 0),
      r.threshold > 0 && (n.allowThresholdMove = !1);
    let b = !0;
    d.matches(n.focusableElements) &&
      ((b = !1), "SELECT" === d.nodeName && (n.isTouched = !1)),
      i.activeElement &&
        i.activeElement.matches(n.focusableElements) &&
        i.activeElement !== d &&
        i.activeElement.blur();
    const S = b && t.allowTouchMove && r.touchStartPreventDefault;
    (!r.touchStartForcePreventDefault && !S) ||
      d.isContentEditable ||
      l.preventDefault(),
      t.params.freeMode &&
        t.params.freeMode.enabled &&
        t.freeMode &&
        t.animating &&
        !r.cssMode &&
        t.freeMode.onTouchStart(),
      t.emit("touchStart", l);
  }
  function Y(e) {
    const t = y(),
      i = this,
      s = i.touchEventsData,
      { params: n, touches: r, rtlTranslate: a, enabled: o } = i;
    if (!o) return;
    if (!n.simulateTouch && "mouse" === e.pointerType) return;
    let l = e;
    if ((l.originalEvent && (l = l.originalEvent), !s.isTouched))
      return void (
        s.startMoving &&
        s.isScrolling &&
        i.emit("touchMoveOpposite", l)
      );
    const d = s.evCache.findIndex((e) => e.pointerId === l.pointerId);
    d >= 0 && (s.evCache[d] = l);
    const c = s.evCache.length > 1 ? s.evCache[0] : l,
      p = c.pageX,
      u = c.pageY;
    if (l.preventedByNestedSwiper) return (r.startX = p), void (r.startY = u);
    if (!i.allowTouchMove)
      return (
        l.target.matches(s.focusableElements) || (i.allowClick = !1),
        void (
          s.isTouched &&
          (Object.assign(r, {
            startX: p,
            startY: u,
            prevX: i.touches.currentX,
            prevY: i.touches.currentY,
            currentX: p,
            currentY: u,
          }),
          (s.touchStartTime = x()))
        )
      );
    if (n.touchReleaseOnEdges && !n.loop)
      if (i.isVertical()) {
        if (
          (u < r.startY && i.translate <= i.maxTranslate()) ||
          (u > r.startY && i.translate >= i.minTranslate())
        )
          return (s.isTouched = !1), void (s.isMoved = !1);
      } else if (
        (p < r.startX && i.translate <= i.maxTranslate()) ||
        (p > r.startX && i.translate >= i.minTranslate())
      )
        return;
    if (
      t.activeElement &&
      l.target === t.activeElement &&
      l.target.matches(s.focusableElements)
    )
      return (s.isMoved = !0), void (i.allowClick = !1);
    if (
      (s.allowTouchCallbacks && i.emit("touchMove", l),
      l.targetTouches && l.targetTouches.length > 1)
    )
      return;
    (r.currentX = p), (r.currentY = u);
    const h = r.currentX - r.startX,
      g = r.currentY - r.startY;
    if (i.params.threshold && Math.sqrt(h ** 2 + g ** 2) < i.params.threshold)
      return;
    if (void 0 === s.isScrolling) {
      let e;
      (i.isHorizontal() && r.currentY === r.startY) ||
      (i.isVertical() && r.currentX === r.startX)
        ? (s.isScrolling = !1)
        : h * h + g * g >= 25 &&
          ((e = (180 * Math.atan2(Math.abs(g), Math.abs(h))) / Math.PI),
          (s.isScrolling = i.isHorizontal()
            ? e > n.touchAngle
            : 90 - e > n.touchAngle));
    }
    if (
      (s.isScrolling && i.emit("touchMoveOpposite", l),
      void 0 === s.startMoving &&
        ((r.currentX === r.startX && r.currentY === r.startY) ||
          (s.startMoving = !0)),
      s.isScrolling ||
        (i.zoom &&
          i.params.zoom &&
          i.params.zoom.enabled &&
          s.evCache.length > 1))
    )
      return void (s.isTouched = !1);
    if (!s.startMoving) return;
    (i.allowClick = !1),
      !n.cssMode && l.cancelable && l.preventDefault(),
      n.touchMoveStopPropagation && !n.nested && l.stopPropagation();
    let m = i.isHorizontal() ? h : g,
      f = i.isHorizontal()
        ? r.currentX - r.previousX
        : r.currentY - r.previousY;
    n.oneWayMovement &&
      ((m = Math.abs(m) * (a ? 1 : -1)), (f = Math.abs(f) * (a ? 1 : -1))),
      (r.diff = m),
      (m *= n.touchRatio),
      a && ((m = -m), (f = -f));
    const v = i.touchesDirection;
    (i.swipeDirection = m > 0 ? "prev" : "next"),
      (i.touchesDirection = f > 0 ? "prev" : "next");
    const b = i.params.loop && !n.cssMode;
    if (!s.isMoved) {
      if (
        (b && i.loopFix({ direction: i.swipeDirection }),
        (s.startTranslate = i.getTranslate()),
        i.setTransition(0),
        i.animating)
      ) {
        const e = new window.CustomEvent("transitionend", {
          bubbles: !0,
          cancelable: !0,
        });
        i.wrapperEl.dispatchEvent(e);
      }
      (s.allowMomentumBounce = !1),
        !n.grabCursor ||
          (!0 !== i.allowSlideNext && !0 !== i.allowSlidePrev) ||
          i.setGrabCursor(!0),
        i.emit("sliderFirstMove", l);
    }
    let w;
    s.isMoved &&
      v !== i.touchesDirection &&
      b &&
      Math.abs(m) >= 1 &&
      (i.loopFix({ direction: i.swipeDirection, setTranslate: !0 }), (w = !0)),
      i.emit("sliderMove", l),
      (s.isMoved = !0),
      (s.currentTranslate = m + s.startTranslate);
    let S = !0,
      T = n.resistanceRatio;
    if (
      (n.touchReleaseOnEdges && (T = 0),
      m > 0
        ? (b &&
            !w &&
            s.currentTranslate >
              (n.centeredSlides
                ? i.minTranslate() - i.size / 2
                : i.minTranslate()) &&
            i.loopFix({
              direction: "prev",
              setTranslate: !0,
              activeSlideIndex: 0,
            }),
          s.currentTranslate > i.minTranslate() &&
            ((S = !1),
            n.resistance &&
              (s.currentTranslate =
                i.minTranslate() -
                1 +
                (-i.minTranslate() + s.startTranslate + m) ** T)))
        : m < 0 &&
          (b &&
            !w &&
            s.currentTranslate <
              (n.centeredSlides
                ? i.maxTranslate() + i.size / 2
                : i.maxTranslate()) &&
            i.loopFix({
              direction: "next",
              setTranslate: !0,
              activeSlideIndex:
                i.slides.length -
                ("auto" === n.slidesPerView
                  ? i.slidesPerViewDynamic()
                  : Math.ceil(parseFloat(n.slidesPerView, 10))),
            }),
          s.currentTranslate < i.maxTranslate() &&
            ((S = !1),
            n.resistance &&
              (s.currentTranslate =
                i.maxTranslate() +
                1 -
                (i.maxTranslate() - s.startTranslate - m) ** T))),
      S && (l.preventedByNestedSwiper = !0),
      !i.allowSlideNext &&
        "next" === i.swipeDirection &&
        s.currentTranslate < s.startTranslate &&
        (s.currentTranslate = s.startTranslate),
      !i.allowSlidePrev &&
        "prev" === i.swipeDirection &&
        s.currentTranslate > s.startTranslate &&
        (s.currentTranslate = s.startTranslate),
      i.allowSlidePrev ||
        i.allowSlideNext ||
        (s.currentTranslate = s.startTranslate),
      n.threshold > 0)
    ) {
      if (!(Math.abs(m) > n.threshold || s.allowThresholdMove))
        return void (s.currentTranslate = s.startTranslate);
      if (!s.allowThresholdMove)
        return (
          (s.allowThresholdMove = !0),
          (r.startX = r.currentX),
          (r.startY = r.currentY),
          (s.currentTranslate = s.startTranslate),
          void (r.diff = i.isHorizontal()
            ? r.currentX - r.startX
            : r.currentY - r.startY)
        );
    }
    n.followFinger &&
      !n.cssMode &&
      (((n.freeMode && n.freeMode.enabled && i.freeMode) ||
        n.watchSlidesProgress) &&
        (i.updateActiveIndex(), i.updateSlidesClasses()),
      i.params.freeMode &&
        n.freeMode.enabled &&
        i.freeMode &&
        i.freeMode.onTouchMove(),
      i.updateProgress(s.currentTranslate),
      i.setTranslate(s.currentTranslate));
  }
  function X(e) {
    const t = this,
      i = t.touchEventsData,
      s = i.evCache.findIndex((t) => t.pointerId === e.pointerId);
    if (
      (s >= 0 && i.evCache.splice(s, 1),
      ["pointercancel", "pointerout", "pointerleave"].includes(e.type))
    )
      return;
    const {
      params: n,
      touches: r,
      rtlTranslate: a,
      slidesGrid: o,
      enabled: l,
    } = t;
    if (!l) return;
    if (!n.simulateTouch && "mouse" === e.pointerType) return;
    let d = e;
    if (
      (d.originalEvent && (d = d.originalEvent),
      i.allowTouchCallbacks && t.emit("touchEnd", d),
      (i.allowTouchCallbacks = !1),
      !i.isTouched)
    )
      return (
        i.isMoved && n.grabCursor && t.setGrabCursor(!1),
        (i.isMoved = !1),
        void (i.startMoving = !1)
      );
    n.grabCursor &&
      i.isMoved &&
      i.isTouched &&
      (!0 === t.allowSlideNext || !0 === t.allowSlidePrev) &&
      t.setGrabCursor(!1);
    const c = x(),
      p = c - i.touchStartTime;
    if (t.allowClick) {
      const e = d.path || (d.composedPath && d.composedPath());
      t.updateClickedSlide((e && e[0]) || d.target),
        t.emit("tap click", d),
        p < 300 &&
          c - i.lastClickTime < 300 &&
          t.emit("doubleTap doubleClick", d);
    }
    if (
      ((i.lastClickTime = x()),
      S(() => {
        t.destroyed || (t.allowClick = !0);
      }),
      !i.isTouched ||
        !i.isMoved ||
        !t.swipeDirection ||
        0 === r.diff ||
        i.currentTranslate === i.startTranslate)
    )
      return (i.isTouched = !1), (i.isMoved = !1), void (i.startMoving = !1);
    let u;
    if (
      ((i.isTouched = !1),
      (i.isMoved = !1),
      (i.startMoving = !1),
      (u = n.followFinger
        ? a
          ? t.translate
          : -t.translate
        : -i.currentTranslate),
      n.cssMode)
    )
      return;
    if (t.params.freeMode && n.freeMode.enabled)
      return void t.freeMode.onTouchEnd({ currentPos: u });
    let h = 0,
      g = t.slidesSizesGrid[0];
    for (
      let e = 0;
      e < o.length;
      e += e < n.slidesPerGroupSkip ? 1 : n.slidesPerGroup
    ) {
      const t = e < n.slidesPerGroupSkip - 1 ? 1 : n.slidesPerGroup;
      void 0 !== o[e + t]
        ? u >= o[e] && u < o[e + t] && ((h = e), (g = o[e + t] - o[e]))
        : u >= o[e] && ((h = e), (g = o[o.length - 1] - o[o.length - 2]));
    }
    let m = null,
      f = null;
    n.rewind &&
      (t.isBeginning
        ? (f =
            t.params.virtual && t.params.virtual.enabled && t.virtual
              ? t.virtual.slides.length - 1
              : t.slides.length - 1)
        : t.isEnd && (m = 0));
    const v = (u - o[h]) / g,
      y = h < n.slidesPerGroupSkip - 1 ? 1 : n.slidesPerGroup;
    if (p > n.longSwipesMs) {
      if (!n.longSwipes) return void t.slideTo(t.activeIndex);
      "next" === t.swipeDirection &&
        (v >= n.longSwipesRatio
          ? t.slideTo(n.rewind && t.isEnd ? m : h + y)
          : t.slideTo(h)),
        "prev" === t.swipeDirection &&
          (v > 1 - n.longSwipesRatio
            ? t.slideTo(h + y)
            : null !== f && v < 0 && Math.abs(v) > n.longSwipesRatio
            ? t.slideTo(f)
            : t.slideTo(h));
    } else {
      if (!n.shortSwipes) return void t.slideTo(t.activeIndex);
      t.navigation &&
      (d.target === t.navigation.nextEl || d.target === t.navigation.prevEl)
        ? d.target === t.navigation.nextEl
          ? t.slideTo(h + y)
          : t.slideTo(h)
        : ("next" === t.swipeDirection && t.slideTo(null !== m ? m : h + y),
          "prev" === t.swipeDirection && t.slideTo(null !== f ? f : h));
    }
  }
  let U;
  function K() {
    const e = this,
      { params: t, el: i } = e;
    if (i && 0 === i.offsetWidth) return;
    t.breakpoints && e.setBreakpoint();
    const { allowSlideNext: s, allowSlidePrev: n, snapGrid: r } = e,
      a = e.virtual && e.params.virtual.enabled;
    (e.allowSlideNext = !0),
      (e.allowSlidePrev = !0),
      e.updateSize(),
      e.updateSlides(),
      e.updateSlidesClasses();
    const o = a && t.loop;
    !("auto" === t.slidesPerView || t.slidesPerView > 1) ||
    !e.isEnd ||
    e.isBeginning ||
    e.params.centeredSlides ||
    o
      ? e.params.loop && !a
        ? e.slideToLoop(e.realIndex, 0, !1, !0)
        : e.slideTo(e.activeIndex, 0, !1, !0)
      : e.slideTo(e.slides.length - 1, 0, !1, !0),
      e.autoplay &&
        e.autoplay.running &&
        e.autoplay.paused &&
        (clearTimeout(U),
        (U = setTimeout(() => {
          e.autoplay.resume();
        }, 500))),
      (e.allowSlidePrev = n),
      (e.allowSlideNext = s),
      e.params.watchOverflow && r !== e.snapGrid && e.checkOverflow();
  }
  function Q(e) {
    const t = this;
    t.enabled &&
      (t.allowClick ||
        (t.params.preventClicks && e.preventDefault(),
        t.params.preventClicksPropagation &&
          t.animating &&
          (e.stopPropagation(), e.stopImmediatePropagation())));
  }
  function Z() {
    const e = this,
      { wrapperEl: t, rtlTranslate: i, enabled: s } = e;
    if (!s) return;
    let n;
    (e.previousTranslate = e.translate),
      e.isHorizontal()
        ? (e.translate = -t.scrollLeft)
        : (e.translate = -t.scrollTop),
      0 === e.translate && (e.translate = 0),
      e.updateActiveIndex(),
      e.updateSlidesClasses();
    const r = e.maxTranslate() - e.minTranslate();
    (n = 0 === r ? 0 : (e.translate - e.minTranslate()) / r),
      n !== e.progress && e.updateProgress(i ? -e.translate : e.translate),
      e.emit("setTranslate", e.translate, !1);
  }
  const J = (e, t) => {
    if (!e || e.destroyed || !e.params) return;
    const i = t.closest(
      e.isElement ? "swiper-slide" : `.${e.params.slideClass}`
    );
    if (i) {
      const t = i.querySelector(`.${e.params.lazyPreloaderClass}`);
      t && t.remove();
    }
  };
  function ee(e) {
    J(this, e.target), this.update();
  }
  let te = !1;
  function ie() {}
  const se = (e, t) => {
    const i = y(),
      { params: s, el: n, wrapperEl: r, device: a } = e,
      o = !!s.nested,
      l = "on" === t ? "addEventListener" : "removeEventListener",
      d = t;
    n[l]("pointerdown", e.onTouchStart, { passive: !1 }),
      i[l]("pointermove", e.onTouchMove, { passive: !1, capture: o }),
      i[l]("pointerup", e.onTouchEnd, { passive: !0 }),
      i[l]("pointercancel", e.onTouchEnd, { passive: !0 }),
      i[l]("pointerout", e.onTouchEnd, { passive: !0 }),
      i[l]("pointerleave", e.onTouchEnd, { passive: !0 }),
      (s.preventClicks || s.preventClicksPropagation) &&
        n[l]("click", e.onClick, !0),
      s.cssMode && r[l]("scroll", e.onScroll),
      s.updateOnWindowResize
        ? e[d](
            a.ios || a.android
              ? "resize orientationchange observerUpdate"
              : "resize observerUpdate",
            K,
            !0
          )
        : e[d]("observerUpdate", K, !0),
      n[l]("load", e.onLoad, { capture: !0 });
  };
  const ne = (e, t) => e.grid && t.grid && t.grid.rows > 1;
  const re = {
    init: !0,
    direction: "horizontal",
    oneWayMovement: !1,
    touchEventsTarget: "wrapper",
    initialSlide: 0,
    speed: 300,
    cssMode: !1,
    updateOnWindowResize: !0,
    resizeObserver: !0,
    nested: !1,
    createElements: !1,
    enabled: !0,
    focusableElements: "input, select, option, textarea, button, video, label",
    width: null,
    height: null,
    preventInteractionOnTransition: !1,
    userAgent: null,
    url: null,
    edgeSwipeDetection: !1,
    edgeSwipeThreshold: 20,
    autoHeight: !1,
    setWrapperSize: !1,
    virtualTranslate: !1,
    effect: "slide",
    breakpoints: void 0,
    breakpointsBase: "window",
    spaceBetween: 0,
    slidesPerView: 1,
    slidesPerGroup: 1,
    slidesPerGroupSkip: 0,
    slidesPerGroupAuto: !1,
    centeredSlides: !1,
    centeredSlidesBounds: !1,
    slidesOffsetBefore: 0,
    slidesOffsetAfter: 0,
    normalizeSlideIndex: !0,
    centerInsufficientSlides: !1,
    watchOverflow: !0,
    roundLengths: !1,
    touchRatio: 1,
    touchAngle: 45,
    simulateTouch: !0,
    shortSwipes: !0,
    longSwipes: !0,
    longSwipesRatio: 0.5,
    longSwipesMs: 300,
    followFinger: !0,
    allowTouchMove: !0,
    threshold: 5,
    touchMoveStopPropagation: !1,
    touchStartPreventDefault: !0,
    touchStartForcePreventDefault: !1,
    touchReleaseOnEdges: !1,
    uniqueNavElements: !0,
    resistance: !0,
    resistanceRatio: 0.85,
    watchSlidesProgress: !1,
    grabCursor: !1,
    preventClicks: !0,
    preventClicksPropagation: !0,
    slideToClickedSlide: !1,
    loop: !1,
    loopedSlides: null,
    loopPreventsSliding: !0,
    rewind: !1,
    allowSlidePrev: !0,
    allowSlideNext: !0,
    swipeHandler: null,
    noSwiping: !0,
    noSwipingClass: "swiper-no-swiping",
    noSwipingSelector: null,
    passiveListeners: !0,
    maxBackfaceHiddenSlides: 10,
    containerModifierClass: "swiper-",
    slideClass: "swiper-slide",
    slideActiveClass: "swiper-slide-active",
    slideVisibleClass: "swiper-slide-visible",
    slideNextClass: "swiper-slide-next",
    slidePrevClass: "swiper-slide-prev",
    wrapperClass: "swiper-wrapper",
    lazyPreloaderClass: "swiper-lazy-preloader",
    runCallbacksOnInit: !0,
    _emitClasses: !1,
  };
  function ae(e, t) {
    return function (i = {}) {
      const s = Object.keys(i)[0],
        n = i[s];
      "object" == typeof n && null !== n
        ? (["navigation", "pagination", "scrollbar"].indexOf(s) >= 0 &&
            !0 === e[s] &&
            (e[s] = { auto: !0 }),
          s in e && "enabled" in n
            ? (!0 === e[s] && (e[s] = { enabled: !0 }),
              "object" != typeof e[s] ||
                "enabled" in e[s] ||
                (e[s].enabled = !0),
              e[s] || (e[s] = { enabled: !1 }),
              C(t, i))
            : C(t, i))
        : C(t, i);
    };
  }
  const oe = {
      eventsEmitter: F,
      update: q,
      translate: N,
      transition: {
        setTransition: function (e, t) {
          const i = this;
          i.params.cssMode || (i.wrapperEl.style.transitionDuration = `${e}ms`),
            i.emit("setTransition", e, t);
        },
        transitionStart: function (e = !0, t) {
          const i = this,
            { params: s } = i;
          s.cssMode ||
            (s.autoHeight && i.updateAutoHeight(),
            V({ swiper: i, runCallbacks: e, direction: t, step: "Start" }));
        },
        transitionEnd: function (e = !0, t) {
          const i = this,
            { params: s } = i;
          (i.animating = !1),
            s.cssMode ||
              (i.setTransition(0),
              V({ swiper: i, runCallbacks: e, direction: t, step: "End" }));
        },
      },
      slide: j,
      loop: W,
      grabCursor: {
        setGrabCursor: function (e) {
          const t = this;
          if (
            !t.params.simulateTouch ||
            (t.params.watchOverflow && t.isLocked) ||
            t.params.cssMode
          )
            return;
          const i =
            "container" === t.params.touchEventsTarget ? t.el : t.wrapperEl;
          (i.style.cursor = "move"), (i.style.cursor = e ? "grabbing" : "grab");
        },
        unsetGrabCursor: function () {
          const e = this;
          (e.params.watchOverflow && e.isLocked) ||
            e.params.cssMode ||
            (e[
              "container" === e.params.touchEventsTarget ? "el" : "wrapperEl"
            ].style.cursor = "");
        },
      },
      events: {
        attachEvents: function () {
          const e = this,
            t = y(),
            { params: i } = e;
          (e.onTouchStart = R.bind(e)),
            (e.onTouchMove = Y.bind(e)),
            (e.onTouchEnd = X.bind(e)),
            i.cssMode && (e.onScroll = Z.bind(e)),
            (e.onClick = Q.bind(e)),
            (e.onLoad = ee.bind(e)),
            te || (t.addEventListener("touchstart", ie), (te = !0)),
            se(e, "on");
        },
        detachEvents: function () {
          se(this, "off");
        },
      },
      breakpoints: {
        setBreakpoint: function () {
          const e = this,
            { realIndex: t, initialized: i, params: s, el: n } = e,
            r = s.breakpoints;
          if (!r || (r && 0 === Object.keys(r).length)) return;
          const a = e.getBreakpoint(r, e.params.breakpointsBase, e.el);
          if (!a || e.currentBreakpoint === a) return;
          const o = (a in r ? r[a] : void 0) || e.originalParams,
            l = ne(e, s),
            d = ne(e, o),
            c = s.enabled;
          l && !d
            ? (n.classList.remove(
                `${s.containerModifierClass}grid`,
                `${s.containerModifierClass}grid-column`
              ),
              e.emitContainerClasses())
            : !l &&
              d &&
              (n.classList.add(`${s.containerModifierClass}grid`),
              ((o.grid.fill && "column" === o.grid.fill) ||
                (!o.grid.fill && "column" === s.grid.fill)) &&
                n.classList.add(`${s.containerModifierClass}grid-column`),
              e.emitContainerClasses()),
            ["navigation", "pagination", "scrollbar"].forEach((t) => {
              const i = s[t] && s[t].enabled,
                n = o[t] && o[t].enabled;
              i && !n && e[t].disable(), !i && n && e[t].enable();
            });
          const p = o.direction && o.direction !== s.direction,
            u = s.loop && (o.slidesPerView !== s.slidesPerView || p);
          p && i && e.changeDirection(), C(e.params, o);
          const h = e.params.enabled;
          Object.assign(e, {
            allowTouchMove: e.params.allowTouchMove,
            allowSlideNext: e.params.allowSlideNext,
            allowSlidePrev: e.params.allowSlidePrev,
          }),
            c && !h ? e.disable() : !c && h && e.enable(),
            (e.currentBreakpoint = a),
            e.emit("_beforeBreakpoint", o),
            u && i && (e.loopDestroy(), e.loopCreate(t), e.updateSlides()),
            e.emit("breakpoint", o);
        },
        getBreakpoint: function (e, t = "window", i) {
          if (!e || ("container" === t && !i)) return;
          let s = !1;
          const n = w(),
            r = "window" === t ? n.innerHeight : i.clientHeight,
            a = Object.keys(e).map((e) => {
              if ("string" == typeof e && 0 === e.indexOf("@")) {
                const t = parseFloat(e.substr(1));
                return { value: r * t, point: e };
              }
              return { value: e, point: e };
            });
          a.sort((e, t) => parseInt(e.value, 10) - parseInt(t.value, 10));
          for (let e = 0; e < a.length; e += 1) {
            const { point: r, value: o } = a[e];
            "window" === t
              ? n.matchMedia(`(min-width: ${o}px)`).matches && (s = r)
              : o <= i.clientWidth && (s = r);
          }
          return s || "max";
        },
      },
      checkOverflow: {
        checkOverflow: function () {
          const e = this,
            { isLocked: t, params: i } = e,
            { slidesOffsetBefore: s } = i;
          if (s) {
            const t = e.slides.length - 1,
              i = e.slidesGrid[t] + e.slidesSizesGrid[t] + 2 * s;
            e.isLocked = e.size > i;
          } else e.isLocked = 1 === e.snapGrid.length;
          !0 === i.allowSlideNext && (e.allowSlideNext = !e.isLocked),
            !0 === i.allowSlidePrev && (e.allowSlidePrev = !e.isLocked),
            t && t !== e.isLocked && (e.isEnd = !1),
            t !== e.isLocked && e.emit(e.isLocked ? "lock" : "unlock");
        },
      },
      classes: {
        addClasses: function () {
          const e = this,
            { classNames: t, params: i, rtl: s, el: n, device: r } = e,
            a = (function (e, t) {
              const i = [];
              return (
                e.forEach((e) => {
                  "object" == typeof e
                    ? Object.keys(e).forEach((s) => {
                        e[s] && i.push(t + s);
                      })
                    : "string" == typeof e && i.push(t + e);
                }),
                i
              );
            })(
              [
                "initialized",
                i.direction,
                { "free-mode": e.params.freeMode && i.freeMode.enabled },
                { autoheight: i.autoHeight },
                { rtl: s },
                { grid: i.grid && i.grid.rows > 1 },
                {
                  "grid-column":
                    i.grid && i.grid.rows > 1 && "column" === i.grid.fill,
                },
                { android: r.android },
                { ios: r.ios },
                { "css-mode": i.cssMode },
                { centered: i.cssMode && i.centeredSlides },
                { "watch-progress": i.watchSlidesProgress },
              ],
              i.containerModifierClass
            );
          t.push(...a), n.classList.add(...t), e.emitContainerClasses();
        },
        removeClasses: function () {
          const { el: e, classNames: t } = this;
          e.classList.remove(...t), this.emitContainerClasses();
        },
      },
    },
    le = {};
  class de {
    constructor(...e) {
      let t, i;
      1 === e.length &&
      e[0].constructor &&
      "Object" === Object.prototype.toString.call(e[0]).slice(8, -1)
        ? (i = e[0])
        : ([t, i] = e),
        i || (i = {}),
        (i = C({}, i)),
        t && !i.el && (i.el = t);
      const s = y();
      if (
        i.el &&
        "string" == typeof i.el &&
        s.querySelectorAll(i.el).length > 1
      ) {
        const e = [];
        return (
          s.querySelectorAll(i.el).forEach((t) => {
            const s = C({}, i, { el: t });
            e.push(new de(s));
          }),
          e
        );
      }
      const n = this;
      (n.__swiper__ = !0),
        (n.support = G()),
        (n.device = $({ userAgent: i.userAgent })),
        (n.browser = H()),
        (n.eventsListeners = {}),
        (n.eventsAnyListeners = []),
        (n.modules = [...n.__modules__]),
        i.modules && Array.isArray(i.modules) && n.modules.push(...i.modules);
      const r = {};
      n.modules.forEach((e) => {
        e({
          params: i,
          swiper: n,
          extendParams: ae(i, r),
          on: n.on.bind(n),
          once: n.once.bind(n),
          off: n.off.bind(n),
          emit: n.emit.bind(n),
        });
      });
      const a = C({}, re, r);
      return (
        (n.params = C({}, a, le, i)),
        (n.originalParams = C({}, n.params)),
        (n.passedParams = C({}, i)),
        n.params &&
          n.params.on &&
          Object.keys(n.params.on).forEach((e) => {
            n.on(e, n.params.on[e]);
          }),
        n.params && n.params.onAny && n.onAny(n.params.onAny),
        Object.assign(n, {
          enabled: n.params.enabled,
          el: t,
          classNames: [],
          slides: [],
          slidesGrid: [],
          snapGrid: [],
          slidesSizesGrid: [],
          isHorizontal: () => "horizontal" === n.params.direction,
          isVertical: () => "vertical" === n.params.direction,
          activeIndex: 0,
          realIndex: 0,
          isBeginning: !0,
          isEnd: !1,
          translate: 0,
          previousTranslate: 0,
          progress: 0,
          velocity: 0,
          animating: !1,
          allowSlideNext: n.params.allowSlideNext,
          allowSlidePrev: n.params.allowSlidePrev,
          touchEventsData: {
            isTouched: void 0,
            isMoved: void 0,
            allowTouchCallbacks: void 0,
            touchStartTime: void 0,
            isScrolling: void 0,
            currentTranslate: void 0,
            startTranslate: void 0,
            allowThresholdMove: void 0,
            focusableElements: n.params.focusableElements,
            lastClickTime: x(),
            clickTimeout: void 0,
            velocities: [],
            allowMomentumBounce: void 0,
            startMoving: void 0,
            evCache: [],
          },
          allowClick: !0,
          allowTouchMove: n.params.allowTouchMove,
          touches: { startX: 0, startY: 0, currentX: 0, currentY: 0, diff: 0 },
          imagesToLoad: [],
          imagesLoaded: 0,
        }),
        n.emit("_swiper"),
        n.params.init && n.init(),
        n
      );
    }
    recalcSlides() {
      const { slidesEl: e, params: t } = this;
      this.slides = M(e, `.${t.slideClass}, swiper-slide`);
    }
    enable() {
      const e = this;
      e.enabled ||
        ((e.enabled = !0),
        e.params.grabCursor && e.setGrabCursor(),
        e.emit("enable"));
    }
    disable() {
      const e = this;
      e.enabled &&
        ((e.enabled = !1),
        e.params.grabCursor && e.unsetGrabCursor(),
        e.emit("disable"));
    }
    setProgress(e, t) {
      const i = this;
      e = Math.min(Math.max(e, 0), 1);
      const s = i.minTranslate(),
        n = (i.maxTranslate() - s) * e + s;
      i.translateTo(n, void 0 === t ? 0 : t),
        i.updateActiveIndex(),
        i.updateSlidesClasses();
    }
    emitContainerClasses() {
      const e = this;
      if (!e.params._emitClasses || !e.el) return;
      const t = e.el.className
        .split(" ")
        .filter(
          (t) =>
            0 === t.indexOf("swiper") ||
            0 === t.indexOf(e.params.containerModifierClass)
        );
      e.emit("_containerClasses", t.join(" "));
    }
    getSlideClasses(e) {
      const t = this;
      return t.destroyed
        ? ""
        : e.className
            .split(" ")
            .filter(
              (e) =>
                0 === e.indexOf("swiper-slide") ||
                0 === e.indexOf(t.params.slideClass)
            )
            .join(" ");
    }
    emitSlidesClasses() {
      const e = this;
      if (!e.params._emitClasses || !e.el) return;
      const t = [];
      e.slides.forEach((i) => {
        const s = e.getSlideClasses(i);
        t.push({ slideEl: i, classNames: s }), e.emit("_slideClass", i, s);
      }),
        e.emit("_slideClasses", t);
    }
    slidesPerViewDynamic(e = "current", t = !1) {
      const {
        params: i,
        slides: s,
        slidesGrid: n,
        slidesSizesGrid: r,
        size: a,
        activeIndex: o,
      } = this;
      let l = 1;
      if (i.centeredSlides) {
        let e,
          t = s[o].swiperSlideSize;
        for (let i = o + 1; i < s.length; i += 1)
          s[i] &&
            !e &&
            ((t += s[i].swiperSlideSize), (l += 1), t > a && (e = !0));
        for (let i = o - 1; i >= 0; i -= 1)
          s[i] &&
            !e &&
            ((t += s[i].swiperSlideSize), (l += 1), t > a && (e = !0));
      } else if ("current" === e)
        for (let e = o + 1; e < s.length; e += 1) {
          (t ? n[e] + r[e] - n[o] < a : n[e] - n[o] < a) && (l += 1);
        }
      else
        for (let e = o - 1; e >= 0; e -= 1) {
          n[o] - n[e] < a && (l += 1);
        }
      return l;
    }
    update() {
      const e = this;
      if (!e || e.destroyed) return;
      const { snapGrid: t, params: i } = e;
      function s() {
        const t = e.rtlTranslate ? -1 * e.translate : e.translate,
          i = Math.min(Math.max(t, e.maxTranslate()), e.minTranslate());
        e.setTranslate(i), e.updateActiveIndex(), e.updateSlidesClasses();
      }
      let n;
      i.breakpoints && e.setBreakpoint(),
        [...e.el.querySelectorAll('[loading="lazy"]')].forEach((t) => {
          t.complete && J(e, t);
        }),
        e.updateSize(),
        e.updateSlides(),
        e.updateProgress(),
        e.updateSlidesClasses(),
        e.params.freeMode && e.params.freeMode.enabled
          ? (s(), e.params.autoHeight && e.updateAutoHeight())
          : ((n =
              ("auto" === e.params.slidesPerView ||
                e.params.slidesPerView > 1) &&
              e.isEnd &&
              !e.params.centeredSlides
                ? e.slideTo(e.slides.length - 1, 0, !1, !0)
                : e.slideTo(e.activeIndex, 0, !1, !0)),
            n || s()),
        i.watchOverflow && t !== e.snapGrid && e.checkOverflow(),
        e.emit("update");
    }
    changeDirection(e, t = !0) {
      const i = this,
        s = i.params.direction;
      return (
        e || (e = "horizontal" === s ? "vertical" : "horizontal"),
        e === s ||
          ("horizontal" !== e && "vertical" !== e) ||
          (i.el.classList.remove(`${i.params.containerModifierClass}${s}`),
          i.el.classList.add(`${i.params.containerModifierClass}${e}`),
          i.emitContainerClasses(),
          (i.params.direction = e),
          i.slides.forEach((t) => {
            "vertical" === e ? (t.style.width = "") : (t.style.height = "");
          }),
          i.emit("changeDirection"),
          t && i.update()),
        i
      );
    }
    changeLanguageDirection(e) {
      const t = this;
      (t.rtl && "rtl" === e) ||
        (!t.rtl && "ltr" === e) ||
        ((t.rtl = "rtl" === e),
        (t.rtlTranslate = "horizontal" === t.params.direction && t.rtl),
        t.rtl
          ? (t.el.classList.add(`${t.params.containerModifierClass}rtl`),
            (t.el.dir = "rtl"))
          : (t.el.classList.remove(`${t.params.containerModifierClass}rtl`),
            (t.el.dir = "ltr")),
        t.update());
    }
    mount(e) {
      const t = this;
      if (t.mounted) return !0;
      let i = e || t.params.el;
      if (("string" == typeof i && (i = document.querySelector(i)), !i))
        return !1;
      (i.swiper = t), i.shadowEl && (t.isElement = !0);
      const s = () =>
        `.${(t.params.wrapperClass || "").trim().split(" ").join(".")}`;
      let n = (() => {
        if (i && i.shadowRoot && i.shadowRoot.querySelector) {
          return i.shadowRoot.querySelector(s());
        }
        return M(i, s())[0];
      })();
      return (
        !n &&
          t.params.createElements &&
          ((n = A("div", t.params.wrapperClass)),
          i.append(n),
          M(i, `.${t.params.slideClass}`).forEach((e) => {
            n.append(e);
          })),
        Object.assign(t, {
          el: i,
          wrapperEl: n,
          slidesEl: t.isElement ? i : n,
          mounted: !0,
          rtl: "rtl" === i.dir.toLowerCase() || "rtl" === _(i, "direction"),
          rtlTranslate:
            "horizontal" === t.params.direction &&
            ("rtl" === i.dir.toLowerCase() || "rtl" === _(i, "direction")),
          wrongRTL: "-webkit-box" === _(n, "display"),
        }),
        !0
      );
    }
    init(e) {
      const t = this;
      if (t.initialized) return t;
      return (
        !1 === t.mount(e) ||
          (t.emit("beforeInit"),
          t.params.breakpoints && t.setBreakpoint(),
          t.addClasses(),
          t.updateSize(),
          t.updateSlides(),
          t.params.watchOverflow && t.checkOverflow(),
          t.params.grabCursor && t.enabled && t.setGrabCursor(),
          t.params.loop && t.virtual && t.params.virtual.enabled
            ? t.slideTo(
                t.params.initialSlide + t.virtual.slidesBefore,
                0,
                t.params.runCallbacksOnInit,
                !1,
                !0
              )
            : t.slideTo(
                t.params.initialSlide,
                0,
                t.params.runCallbacksOnInit,
                !1,
                !0
              ),
          t.params.loop && t.loopCreate(),
          t.attachEvents(),
          [...t.el.querySelectorAll('[loading="lazy"]')].forEach((e) => {
            e.complete
              ? J(t, e)
              : e.addEventListener("load", (e) => {
                  J(t, e.target);
                });
          }),
          (t.initialized = !0),
          t.emit("init"),
          t.emit("afterInit")),
        t
      );
    }
    destroy(e = !0, t = !0) {
      const i = this,
        { params: s, el: n, wrapperEl: r, slides: a } = i;
      return (
        void 0 === i.params ||
          i.destroyed ||
          (i.emit("beforeDestroy"),
          (i.initialized = !1),
          i.detachEvents(),
          s.loop && i.loopDestroy(),
          t &&
            (i.removeClasses(),
            n.removeAttribute("style"),
            r.removeAttribute("style"),
            a &&
              a.length &&
              a.forEach((e) => {
                e.classList.remove(
                  s.slideVisibleClass,
                  s.slideActiveClass,
                  s.slideNextClass,
                  s.slidePrevClass
                ),
                  e.removeAttribute("style"),
                  e.removeAttribute("data-swiper-slide-index");
              })),
          i.emit("destroy"),
          Object.keys(i.eventsListeners).forEach((e) => {
            i.off(e);
          }),
          !1 !== e &&
            ((i.el.swiper = null),
            (function (e) {
              const t = e;
              Object.keys(t).forEach((e) => {
                try {
                  t[e] = null;
                } catch (e) {}
                try {
                  delete t[e];
                } catch (e) {}
              });
            })(i)),
          (i.destroyed = !0)),
        null
      );
    }
    static extendDefaults(e) {
      C(le, e);
    }
    static get extendedDefaults() {
      return le;
    }
    static get defaults() {
      return re;
    }
    static installModule(e) {
      de.prototype.__modules__ || (de.prototype.__modules__ = []);
      const t = de.prototype.__modules__;
      "function" == typeof e && t.indexOf(e) < 0 && t.push(e);
    }
    static use(e) {
      return Array.isArray(e)
        ? (e.forEach((e) => de.installModule(e)), de)
        : (de.installModule(e), de);
    }
  }
  Object.keys(oe).forEach((e) => {
    Object.keys(oe[e]).forEach((t) => {
      de.prototype[t] = oe[e][t];
    });
  }),
    de.use([
      function ({ swiper: e, on: t, emit: i }) {
        const s = w();
        let n = null,
          r = null;
        const a = () => {
            e &&
              !e.destroyed &&
              e.initialized &&
              (i("beforeResize"), i("resize"));
          },
          o = () => {
            e && !e.destroyed && e.initialized && i("orientationchange");
          };
        t("init", () => {
          e.params.resizeObserver && void 0 !== s.ResizeObserver
            ? e &&
              !e.destroyed &&
              e.initialized &&
              ((n = new ResizeObserver((t) => {
                r = s.requestAnimationFrame(() => {
                  const { width: i, height: s } = e;
                  let n = i,
                    r = s;
                  t.forEach(
                    ({ contentBoxSize: t, contentRect: i, target: s }) => {
                      (s && s !== e.el) ||
                        ((n = i ? i.width : (t[0] || t).inlineSize),
                        (r = i ? i.height : (t[0] || t).blockSize));
                    }
                  ),
                    (n === i && r === s) || a();
                });
              })),
              n.observe(e.el))
            : (s.addEventListener("resize", a),
              s.addEventListener("orientationchange", o));
        }),
          t("destroy", () => {
            r && s.cancelAnimationFrame(r),
              n && n.unobserve && e.el && (n.unobserve(e.el), (n = null)),
              s.removeEventListener("resize", a),
              s.removeEventListener("orientationchange", o);
          });
      },
      function ({ swiper: e, extendParams: t, on: i, emit: s }) {
        const n = [],
          r = w(),
          a = (e, t = {}) => {
            const i = new (r.MutationObserver || r.WebkitMutationObserver)(
              (e) => {
                if (1 === e.length) return void s("observerUpdate", e[0]);
                const t = function () {
                  s("observerUpdate", e[0]);
                };
                r.requestAnimationFrame
                  ? r.requestAnimationFrame(t)
                  : r.setTimeout(t, 0);
              }
            );
            i.observe(e, {
              attributes: void 0 === t.attributes || t.attributes,
              childList: void 0 === t.childList || t.childList,
              characterData: void 0 === t.characterData || t.characterData,
            }),
              n.push(i);
          };
        t({ observer: !1, observeParents: !1, observeSlideChildren: !1 }),
          i("init", () => {
            if (e.params.observer) {
              if (e.params.observeParents) {
                const t = P(e.el);
                for (let e = 0; e < t.length; e += 1) a(t[e]);
              }
              a(e.el, { childList: e.params.observeSlideChildren }),
                a(e.wrapperEl, { attributes: !1 });
            }
          }),
          i("destroy", () => {
            n.forEach((e) => {
              e.disconnect();
            }),
              n.splice(0, n.length);
          });
      },
    ]);
  const ce = de;
  function pe(e, t, i, s) {
    return (
      e.params.createElements &&
        Object.keys(s).forEach((n) => {
          if (!i[n] && !0 === i.auto) {
            let r = M(e.el, `.${s[n]}`)[0];
            r || ((r = A("div", s[n])), (r.className = s[n]), e.el.append(r)),
              (i[n] = r),
              (t[n] = r);
          }
        }),
      i
    );
  }
  function ue({ swiper: e, extendParams: t, on: i, emit: s }) {
    t({
      navigation: {
        nextEl: null,
        prevEl: null,
        hideOnClick: !1,
        disabledClass: "swiper-button-disabled",
        hiddenClass: "swiper-button-hidden",
        lockClass: "swiper-button-lock",
        navigationDisabledClass: "swiper-navigation-disabled",
      },
    }),
      (e.navigation = { nextEl: null, prevEl: null });
    const n = (e) => (Array.isArray(e) || (e = [e].filter((e) => !!e)), e);
    function r(t) {
      let i;
      return t &&
        "string" == typeof t &&
        e.isElement &&
        ((i = e.el.shadowRoot.querySelector(t)), i)
        ? i
        : (t &&
            ("string" == typeof t && (i = [...document.querySelectorAll(t)]),
            e.params.uniqueNavElements &&
              "string" == typeof t &&
              i.length > 1 &&
              1 === e.el.querySelectorAll(t).length &&
              (i = e.el.querySelector(t))),
          t && !i ? t : i);
    }
    function a(t, i) {
      const s = e.params.navigation;
      (t = n(t)).forEach((t) => {
        t &&
          (t.classList[i ? "add" : "remove"](...s.disabledClass.split(" ")),
          "BUTTON" === t.tagName && (t.disabled = i),
          e.params.watchOverflow &&
            e.enabled &&
            t.classList[e.isLocked ? "add" : "remove"](s.lockClass));
      });
    }
    function o() {
      const { nextEl: t, prevEl: i } = e.navigation;
      if (e.params.loop) return a(i, !1), void a(t, !1);
      a(i, e.isBeginning && !e.params.rewind),
        a(t, e.isEnd && !e.params.rewind);
    }
    function l(t) {
      t.preventDefault(),
        (!e.isBeginning || e.params.loop || e.params.rewind) &&
          (e.slidePrev(), s("navigationPrev"));
    }
    function d(t) {
      t.preventDefault(),
        (!e.isEnd || e.params.loop || e.params.rewind) &&
          (e.slideNext(), s("navigationNext"));
    }
    function c() {
      const t = e.params.navigation;
      if (
        ((e.params.navigation = pe(
          e,
          e.originalParams.navigation,
          e.params.navigation,
          { nextEl: "swiper-button-next", prevEl: "swiper-button-prev" }
        )),
        !t.nextEl && !t.prevEl)
      )
        return;
      let i = r(t.nextEl),
        s = r(t.prevEl);
      Object.assign(e.navigation, { nextEl: i, prevEl: s }),
        (i = n(i)),
        (s = n(s));
      const a = (i, s) => {
        i && i.addEventListener("click", "next" === s ? d : l),
          !e.enabled && i && i.classList.add(...t.lockClass.split(" "));
      };
      i.forEach((e) => a(e, "next")), s.forEach((e) => a(e, "prev"));
    }
    function p() {
      let { nextEl: t, prevEl: i } = e.navigation;
      (t = n(t)), (i = n(i));
      const s = (t, i) => {
        t.removeEventListener("click", "next" === i ? d : l),
          t.classList.remove(...e.params.navigation.disabledClass.split(" "));
      };
      t.forEach((e) => s(e, "next")), i.forEach((e) => s(e, "prev"));
    }
    i("init", () => {
      !1 === e.params.navigation.enabled ? u() : (c(), o());
    }),
      i("toEdge fromEdge lock unlock", () => {
        o();
      }),
      i("destroy", () => {
        p();
      }),
      i("enable disable", () => {
        let { nextEl: t, prevEl: i } = e.navigation;
        (t = n(t)),
          (i = n(i)),
          [...t, ...i]
            .filter((e) => !!e)
            .forEach((t) =>
              t.classList[e.enabled ? "remove" : "add"](
                e.params.navigation.lockClass
              )
            );
      }),
      i("click", (t, i) => {
        let { nextEl: r, prevEl: a } = e.navigation;
        (r = n(r)), (a = n(a));
        const o = i.target;
        if (
          e.params.navigation.hideOnClick &&
          !a.includes(o) &&
          !r.includes(o)
        ) {
          if (
            e.pagination &&
            e.params.pagination &&
            e.params.pagination.clickable &&
            (e.pagination.el === o || e.pagination.el.contains(o))
          )
            return;
          let t;
          r.length
            ? (t = r[0].classList.contains(e.params.navigation.hiddenClass))
            : a.length &&
              (t = a[0].classList.contains(e.params.navigation.hiddenClass)),
            s(!0 === t ? "navigationShow" : "navigationHide"),
            [...r, ...a]
              .filter((e) => !!e)
              .forEach((t) =>
                t.classList.toggle(e.params.navigation.hiddenClass)
              );
        }
      });
    const u = () => {
      e.el.classList.add(
        ...e.params.navigation.navigationDisabledClass.split(" ")
      ),
        p();
    };
    Object.assign(e.navigation, {
      enable: () => {
        e.el.classList.remove(
          ...e.params.navigation.navigationDisabledClass.split(" ")
        ),
          c(),
          o();
      },
      disable: u,
      update: o,
      init: c,
      destroy: p,
    });
  }
  function he(e = "") {
    return `.${e
      .trim()
      .replace(/([\.:!\/])/g, "\\$1")
      .replace(/ /g, ".")}`;
  }
  function ge({ swiper: e, extendParams: t, on: i, emit: s }) {
    const n = "swiper-pagination";
    let r;
    t({
      pagination: {
        el: null,
        bulletElement: "span",
        clickable: !1,
        hideOnClick: !1,
        renderBullet: null,
        renderProgressbar: null,
        renderFraction: null,
        renderCustom: null,
        progressbarOpposite: !1,
        type: "bullets",
        dynamicBullets: !1,
        dynamicMainBullets: 1,
        formatFractionCurrent: (e) => e,
        formatFractionTotal: (e) => e,
        bulletClass: `${n}-bullet`,
        bulletActiveClass: `${n}-bullet-active`,
        modifierClass: `${n}-`,
        currentClass: `${n}-current`,
        totalClass: `${n}-total`,
        hiddenClass: `${n}-hidden`,
        progressbarFillClass: `${n}-progressbar-fill`,
        progressbarOppositeClass: `${n}-progressbar-opposite`,
        clickableClass: `${n}-clickable`,
        lockClass: `${n}-lock`,
        horizontalClass: `${n}-horizontal`,
        verticalClass: `${n}-vertical`,
        paginationDisabledClass: `${n}-disabled`,
      },
    }),
      (e.pagination = { el: null, bullets: [] });
    let a = 0;
    const o = (e) => (Array.isArray(e) || (e = [e].filter((e) => !!e)), e);
    function l() {
      return (
        !e.params.pagination.el ||
        !e.pagination.el ||
        (Array.isArray(e.pagination.el) && 0 === e.pagination.el.length)
      );
    }
    function d(t, i) {
      const { bulletActiveClass: s } = e.params.pagination;
      t &&
        (t = t[("prev" === i ? "previous" : "next") + "ElementSibling"]) &&
        (t.classList.add(`${s}-${i}`),
        (t = t[("prev" === i ? "previous" : "next") + "ElementSibling"]) &&
          t.classList.add(`${s}-${i}-${i}`));
    }
    function c(t) {
      if (!t.target.matches(he(e.params.pagination.bulletClass))) return;
      t.preventDefault();
      const i = O(t.target) * e.params.slidesPerGroup;
      e.params.loop ? e.slideToLoop(i) : e.slideTo(i);
    }
    function p() {
      const t = e.rtl,
        i = e.params.pagination;
      if (l()) return;
      let n,
        c = e.pagination.el;
      c = o(c);
      const p =
          e.virtual && e.params.virtual.enabled
            ? e.virtual.slides.length
            : e.slides.length,
        u = e.params.loop
          ? Math.ceil(p / e.params.slidesPerGroup)
          : e.snapGrid.length;
      if (
        ((n = e.params.loop
          ? e.params.slidesPerGroup > 1
            ? Math.floor(e.realIndex / e.params.slidesPerGroup)
            : e.realIndex
          : void 0 !== e.snapIndex
          ? e.snapIndex
          : e.activeIndex || 0),
        "bullets" === i.type &&
          e.pagination.bullets &&
          e.pagination.bullets.length > 0)
      ) {
        const s = e.pagination.bullets;
        let o, l, p;
        if (
          (i.dynamicBullets &&
            ((r = k(s[0], e.isHorizontal() ? "width" : "height", !0)),
            c.forEach((t) => {
              t.style[e.isHorizontal() ? "width" : "height"] =
                r * (i.dynamicMainBullets + 4) + "px";
            }),
            i.dynamicMainBullets > 1 &&
              void 0 !== e.previousIndex &&
              ((a += n - (e.previousIndex || 0)),
              a > i.dynamicMainBullets - 1
                ? (a = i.dynamicMainBullets - 1)
                : a < 0 && (a = 0)),
            (o = Math.max(n - a, 0)),
            (l = o + (Math.min(s.length, i.dynamicMainBullets) - 1)),
            (p = (l + o) / 2)),
          s.forEach((e) => {
            e.classList.remove(
              ...[
                "",
                "-next",
                "-next-next",
                "-prev",
                "-prev-prev",
                "-main",
              ].map((e) => `${i.bulletActiveClass}${e}`)
            );
          }),
          c.length > 1)
        )
          s.forEach((e) => {
            const t = O(e);
            t === n && e.classList.add(i.bulletActiveClass),
              i.dynamicBullets &&
                (t >= o &&
                  t <= l &&
                  e.classList.add(`${i.bulletActiveClass}-main`),
                t === o && d(e, "prev"),
                t === l && d(e, "next"));
          });
        else {
          const e = s[n];
          if ((e && e.classList.add(i.bulletActiveClass), i.dynamicBullets)) {
            const e = s[o],
              t = s[l];
            for (let e = o; e <= l; e += 1)
              s[e].classList.add(`${i.bulletActiveClass}-main`);
            d(e, "prev"), d(t, "next");
          }
        }
        if (i.dynamicBullets) {
          const n = Math.min(s.length, i.dynamicMainBullets + 4),
            a = (r * n - r) / 2 - p * r,
            o = t ? "right" : "left";
          s.forEach((t) => {
            t.style[e.isHorizontal() ? o : "top"] = `${a}px`;
          });
        }
      }
      c.forEach((t, r) => {
        if (
          ("fraction" === i.type &&
            (t.querySelectorAll(he(i.currentClass)).forEach((e) => {
              e.textContent = i.formatFractionCurrent(n + 1);
            }),
            t.querySelectorAll(he(i.totalClass)).forEach((e) => {
              e.textContent = i.formatFractionTotal(u);
            })),
          "progressbar" === i.type)
        ) {
          let s;
          s = i.progressbarOpposite
            ? e.isHorizontal()
              ? "vertical"
              : "horizontal"
            : e.isHorizontal()
            ? "horizontal"
            : "vertical";
          const r = (n + 1) / u;
          let a = 1,
            o = 1;
          "horizontal" === s ? (a = r) : (o = r),
            t.querySelectorAll(he(i.progressbarFillClass)).forEach((t) => {
              (t.style.transform = `translate3d(0,0,0) scaleX(${a}) scaleY(${o})`),
                (t.style.transitionDuration = `${e.params.speed}ms`);
            });
        }
        "custom" === i.type && i.renderCustom
          ? ((t.innerHTML = i.renderCustom(e, n + 1, u)),
            0 === r && s("paginationRender", t))
          : (0 === r && s("paginationRender", t), s("paginationUpdate", t)),
          e.params.watchOverflow &&
            e.enabled &&
            t.classList[e.isLocked ? "add" : "remove"](i.lockClass);
      });
    }
    function u() {
      const t = e.params.pagination;
      if (l()) return;
      const i =
        e.virtual && e.params.virtual.enabled
          ? e.virtual.slides.length
          : e.slides.length;
      let n = e.pagination.el;
      n = o(n);
      let r = "";
      if ("bullets" === t.type) {
        let s = e.params.loop
          ? Math.ceil(i / e.params.slidesPerGroup)
          : e.snapGrid.length;
        e.params.freeMode && e.params.freeMode.enabled && s > i && (s = i);
        for (let i = 0; i < s; i += 1)
          t.renderBullet
            ? (r += t.renderBullet.call(e, i, t.bulletClass))
            : (r += `<${t.bulletElement} class="${t.bulletClass}"></${t.bulletElement}>`);
      }
      "fraction" === t.type &&
        (r = t.renderFraction
          ? t.renderFraction.call(e, t.currentClass, t.totalClass)
          : `<span class="${t.currentClass}"></span> / <span class="${t.totalClass}"></span>`),
        "progressbar" === t.type &&
          (r = t.renderProgressbar
            ? t.renderProgressbar.call(e, t.progressbarFillClass)
            : `<span class="${t.progressbarFillClass}"></span>`),
        n.forEach((i) => {
          "custom" !== t.type && (i.innerHTML = r || ""),
            "bullets" === t.type &&
              (e.pagination.bullets = [
                ...i.querySelectorAll(he(t.bulletClass)),
              ]);
        }),
        "custom" !== t.type && s("paginationRender", n[0]);
    }
    function h() {
      e.params.pagination = pe(
        e,
        e.originalParams.pagination,
        e.params.pagination,
        { el: "swiper-pagination" }
      );
      const t = e.params.pagination;
      if (!t.el) return;
      let i;
      "string" == typeof t.el &&
        e.isElement &&
        (i = e.el.shadowRoot.querySelector(t.el)),
        i ||
          "string" != typeof t.el ||
          (i = [...document.querySelectorAll(t.el)]),
        i || (i = t.el),
        i &&
          0 !== i.length &&
          (e.params.uniqueNavElements &&
            "string" == typeof t.el &&
            Array.isArray(i) &&
            i.length > 1 &&
            ((i = [...e.el.querySelectorAll(t.el)]),
            i.length > 1 &&
              (i = i.filter((t) => P(t, ".swiper")[0] === e.el)[0])),
          Array.isArray(i) && 1 === i.length && (i = i[0]),
          Object.assign(e.pagination, { el: i }),
          (i = o(i)),
          i.forEach((i) => {
            "bullets" === t.type &&
              t.clickable &&
              i.classList.add(t.clickableClass),
              i.classList.add(t.modifierClass + t.type),
              i.classList.add(
                e.isHorizontal() ? t.horizontalClass : t.verticalClass
              ),
              "bullets" === t.type &&
                t.dynamicBullets &&
                (i.classList.add(`${t.modifierClass}${t.type}-dynamic`),
                (a = 0),
                t.dynamicMainBullets < 1 && (t.dynamicMainBullets = 1)),
              "progressbar" === t.type &&
                t.progressbarOpposite &&
                i.classList.add(t.progressbarOppositeClass),
              t.clickable && i.addEventListener("click", c),
              e.enabled || i.classList.add(t.lockClass);
          }));
    }
    function g() {
      const t = e.params.pagination;
      if (l()) return;
      let i = e.pagination.el;
      i &&
        ((i = o(i)),
        i.forEach((i) => {
          i.classList.remove(t.hiddenClass),
            i.classList.remove(t.modifierClass + t.type),
            i.classList.remove(
              e.isHorizontal() ? t.horizontalClass : t.verticalClass
            ),
            t.clickable && i.removeEventListener("click", c);
        })),
        e.pagination.bullets &&
          e.pagination.bullets.forEach((e) =>
            e.classList.remove(t.bulletActiveClass)
          );
    }
    i("init", () => {
      !1 === e.params.pagination.enabled ? m() : (h(), u(), p());
    }),
      i("activeIndexChange", () => {
        void 0 === e.snapIndex && p();
      }),
      i("snapIndexChange", () => {
        p();
      }),
      i("snapGridLengthChange", () => {
        u(), p();
      }),
      i("destroy", () => {
        g();
      }),
      i("enable disable", () => {
        let { el: t } = e.pagination;
        t &&
          ((t = o(t)),
          t.forEach((t) =>
            t.classList[e.enabled ? "remove" : "add"](
              e.params.pagination.lockClass
            )
          ));
      }),
      i("lock unlock", () => {
        p();
      }),
      i("click", (t, i) => {
        const n = i.target;
        let { el: r } = e.pagination;
        if (
          (Array.isArray(r) || (r = [r].filter((e) => !!e)),
          e.params.pagination.el &&
            e.params.pagination.hideOnClick &&
            r &&
            r.length > 0 &&
            !n.classList.contains(e.params.pagination.bulletClass))
        ) {
          if (
            e.navigation &&
            ((e.navigation.nextEl && n === e.navigation.nextEl) ||
              (e.navigation.prevEl && n === e.navigation.prevEl))
          )
            return;
          const t = r[0].classList.contains(e.params.pagination.hiddenClass);
          s(!0 === t ? "paginationShow" : "paginationHide"),
            r.forEach((t) =>
              t.classList.toggle(e.params.pagination.hiddenClass)
            );
        }
      });
    const m = () => {
      e.el.classList.add(e.params.pagination.paginationDisabledClass);
      let { el: t } = e.pagination;
      t &&
        ((t = o(t)),
        t.forEach((t) =>
          t.classList.add(e.params.pagination.paginationDisabledClass)
        )),
        g();
    };
    Object.assign(e.pagination, {
      enable: () => {
        e.el.classList.remove(e.params.pagination.paginationDisabledClass);
        let { el: t } = e.pagination;
        t &&
          ((t = o(t)),
          t.forEach((t) =>
            t.classList.remove(e.params.pagination.paginationDisabledClass)
          )),
          h(),
          u(),
          p();
      },
      disable: m,
      render: u,
      update: p,
      init: h,
      destroy: g,
    });
  }
  function me({ swiper: e, extendParams: t, on: i }) {
    t({ parallax: { enabled: !1 } });
    const s = (t, i) => {
        const { rtl: s } = e,
          n = s ? -1 : 1,
          r = t.getAttribute("data-swiper-parallax") || "0";
        let a = t.getAttribute("data-swiper-parallax-x"),
          o = t.getAttribute("data-swiper-parallax-y");
        const l = t.getAttribute("data-swiper-parallax-scale"),
          d = t.getAttribute("data-swiper-parallax-opacity"),
          c = t.getAttribute("data-swiper-parallax-rotate");
        if (
          (a || o
            ? ((a = a || "0"), (o = o || "0"))
            : e.isHorizontal()
            ? ((a = r), (o = "0"))
            : ((o = r), (a = "0")),
          (a =
            a.indexOf("%") >= 0
              ? parseInt(a, 10) * i * n + "%"
              : a * i * n + "px"),
          (o = o.indexOf("%") >= 0 ? parseInt(o, 10) * i + "%" : o * i + "px"),
          null != d)
        ) {
          const e = d - (d - 1) * (1 - Math.abs(i));
          t.style.opacity = e;
        }
        let p = `translate3d(${a}, ${o}, 0px)`;
        if (null != l) {
          p += ` scale(${l - (l - 1) * (1 - Math.abs(i))})`;
        }
        if (c && null != c) {
          p += ` rotate(${c * i * -1}deg)`;
        }
        t.style.transform = p;
      },
      n = () => {
        const { el: t, slides: i, progress: n, snapGrid: r } = e;
        M(
          t,
          "[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]"
        ).forEach((e) => {
          s(e, n);
        }),
          i.forEach((t, i) => {
            let a = t.progress;
            e.params.slidesPerGroup > 1 &&
              "auto" !== e.params.slidesPerView &&
              (a += Math.ceil(i / 2) - n * (r.length - 1)),
              (a = Math.min(Math.max(a, -1), 1)),
              t
                .querySelectorAll(
                  "[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale], [data-swiper-parallax-rotate]"
                )
                .forEach((e) => {
                  s(e, a);
                });
          });
      };
    i("beforeInit", () => {
      e.params.parallax.enabled &&
        ((e.params.watchSlidesProgress = !0),
        (e.originalParams.watchSlidesProgress = !0));
    }),
      i("init", () => {
        e.params.parallax.enabled && n();
      }),
      i("setTranslate", () => {
        e.params.parallax.enabled && n();
      }),
      i("setTransition", (t, i) => {
        e.params.parallax.enabled &&
          ((t = e.params.speed) => {
            const { el: i } = e;
            i.querySelectorAll(
              "[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]"
            ).forEach((e) => {
              let i =
                parseInt(e.getAttribute("data-swiper-parallax-duration"), 10) ||
                t;
              0 === t && (i = 0), (e.style.transitionDuration = `${i}ms`);
            });
          })(i);
      });
  }
  function fe({ swiper: e, extendParams: t, on: i, emit: s, params: n }) {
    let r, a;
    (e.autoplay = { running: !1, paused: !1, timeLeft: 0 }),
      t({
        autoplay: {
          enabled: !1,
          delay: 3e3,
          waitForTransition: !0,
          disableOnInteraction: !0,
          stopOnLastSlide: !1,
          reverseDirection: !1,
          pauseOnMouseEnter: !1,
        },
      });
    let o,
      l,
      d,
      c,
      p,
      u,
      h,
      g = n && n.autoplay ? n.autoplay.delay : 3e3,
      m = n && n.autoplay ? n.autoplay.delay : 3e3,
      f = new Date().getTime;
    function v(t) {
      e &&
        !e.destroyed &&
        e.wrapperEl &&
        t.target === e.wrapperEl &&
        (e.wrapperEl.removeEventListener("transitionend", v), E());
    }
    const b = () => {
        if (e.destroyed || !e.autoplay.running) return;
        e.autoplay.paused ? (l = !0) : l && ((m = o), (l = !1));
        const t = e.autoplay.paused ? o : f + m - new Date().getTime();
        (e.autoplay.timeLeft = t),
          s("autoplayTimeLeft", t, t / g),
          (a = requestAnimationFrame(() => {
            b();
          }));
      },
      w = (t) => {
        if (e.destroyed || !e.autoplay.running) return;
        cancelAnimationFrame(a), b();
        let i = void 0 === t ? e.params.autoplay.delay : t;
        (g = e.params.autoplay.delay), (m = e.params.autoplay.delay);
        const n = (() => {
          let t;
          if (
            ((t =
              e.virtual && e.params.virtual.enabled
                ? e.slides.filter((e) =>
                    e.classList.contains("swiper-slide-active")
                  )[0]
                : e.slides[e.activeIndex]),
            !t)
          )
            return;
          return parseInt(t.getAttribute("data-swiper-autoplay"), 10);
        })();
        !Number.isNaN(n) &&
          n > 0 &&
          void 0 === t &&
          ((i = n), (g = n), (m = n)),
          (o = i);
        const l = e.params.speed,
          d = () => {
            e.params.autoplay.reverseDirection
              ? !e.isBeginning || e.params.loop || e.params.rewind
                ? (e.slidePrev(l, !0, !0), s("autoplay"))
                : e.params.autoplay.stopOnLastSlide ||
                  (e.slideTo(e.slides.length - 1, l, !0, !0), s("autoplay"))
              : !e.isEnd || e.params.loop || e.params.rewind
              ? (e.slideNext(l, !0, !0), s("autoplay"))
              : e.params.autoplay.stopOnLastSlide ||
                (e.slideTo(0, l, !0, !0), s("autoplay")),
              e.params.cssMode &&
                ((f = new Date().getTime()),
                requestAnimationFrame(() => {
                  w();
                }));
          };
        return (
          i > 0
            ? (clearTimeout(r),
              (r = setTimeout(() => {
                d();
              }, i)))
            : requestAnimationFrame(() => {
                d();
              }),
          i
        );
      },
      S = () => {
        (e.autoplay.running = !0), w(), s("autoplayStart");
      },
      x = () => {
        (e.autoplay.running = !1),
          clearTimeout(r),
          cancelAnimationFrame(a),
          s("autoplayStop");
      },
      T = (t, i) => {
        if (e.destroyed || !e.autoplay.running) return;
        clearTimeout(r), t || (h = !0);
        const n = () => {
          s("autoplayPause"),
            e.params.autoplay.waitForTransition
              ? e.wrapperEl.addEventListener("transitionend", v)
              : E();
        };
        if (((e.autoplay.paused = !0), i))
          return u && (o = e.params.autoplay.delay), (u = !1), void n();
        const a = o || e.params.autoplay.delay;
        (o = a - (new Date().getTime() - f)),
          (e.isEnd && o < 0 && !e.params.loop) || (o < 0 && (o = 0), n());
      },
      E = () => {
        (e.isEnd && o < 0 && !e.params.loop) ||
          e.destroyed ||
          !e.autoplay.running ||
          ((f = new Date().getTime()),
          h ? ((h = !1), w(o)) : w(),
          (e.autoplay.paused = !1),
          s("autoplayResume"));
      },
      C = () => {
        if (e.destroyed || !e.autoplay.running) return;
        const t = y();
        "hidden" === t.visibilityState && ((h = !0), T(!0)),
          "visible" === t.visibilityState && E();
      },
      L = (e) => {
        "mouse" === e.pointerType && ((h = !0), T(!0));
      },
      I = (t) => {
        "mouse" === t.pointerType && e.autoplay.paused && E();
      };
    i("init", () => {
      e.params.autoplay.enabled &&
        (e.params.autoplay.pauseOnMouseEnter &&
          (e.el.addEventListener("pointerenter", L),
          e.el.addEventListener("pointerleave", I)),
        y().addEventListener("visibilitychange", C),
        (f = new Date().getTime()),
        S());
    }),
      i("destroy", () => {
        e.el.removeEventListener("pointerenter", L),
          e.el.removeEventListener("pointerleave", I),
          y().removeEventListener("visibilitychange", C),
          e.autoplay.running && x();
      }),
      i("beforeTransitionStart", (t, i, s) => {
        !e.destroyed &&
          e.autoplay.running &&
          (s || !e.params.autoplay.disableOnInteraction ? T(!0, !0) : x());
      }),
      i("sliderFirstMove", () => {
        !e.destroyed &&
          e.autoplay.running &&
          (e.params.autoplay.disableOnInteraction
            ? x()
            : ((d = !0),
              (c = !1),
              (h = !1),
              (p = setTimeout(() => {
                (h = !0), (c = !0), T(!0);
              }, 200))));
      }),
      i("touchEnd", () => {
        if (!e.destroyed && e.autoplay.running && d) {
          if (
            (clearTimeout(p),
            clearTimeout(r),
            e.params.autoplay.disableOnInteraction)
          )
            return (c = !1), void (d = !1);
          c && e.params.cssMode && E(), (c = !1), (d = !1);
        }
      }),
      i("slideChange", () => {
        !e.destroyed && e.autoplay.running && (u = !0);
      }),
      Object.assign(e.autoplay, { start: S, stop: x, pause: T, resume: E });
  }
  function ve() {
    let e = document.querySelectorAll(
      '[class*="__swiper"]:not(.swiper-wrapper)'
    );
    e &&
      e.forEach((e) => {
        e.parentElement.classList.add("swiper"),
          e.classList.add("swiper-wrapper");
        for (const t of e.children) t.classList.add("swiper-slide");
      });
  }
  window.addEventListener("load", function (e) {
    ve(),
      document.querySelector(".slider-main__slider") &&
        new ce(".slider-main__slider", {
          modules: [ue, ge, me, fe],
          autoplay: { delay: 4e3, disableOnInteraction: !1 },
          observer: !0,
          observeParents: !0,
          slidesPerView: 1,
          spaceBetween: 32,
          autoHeight: !0,
          watchOverflow: !0,
          speed: 1500,
          loop: !0,
          loopAdditionalSlides: 5,
          preloadImages: !1,
          parallax: !0,
          pagination: { el: ".controls-slider-main__dotts", clickable: !0 },
          navigation: {
            nextEl: ".slider-main .slider-arrow_next",
            prevEl: ".slider-main .slider-arrow_prew",
          },
        }),
      document.querySelector(".slider-rooms__slider") &&
        new ce(".slider-rooms__slider", {
          modules: [ue, ge, me, fe],
          autoplay: { delay: 3e3, disableOnInteraction: !1 },
          observer: !0,
          observeParents: !0,
          slidesPerView: "auto",
          spaceBetween: 24,
          speed: 1500,
          loop: !0,
          watchOverflow: !0,
          preloadImages: !1,
          parallax: !0,
          pagination: { el: ".slider-rooms__dotts", clickable: !0 },
          navigation: {
            nextEl: ".slider-rooms .slider-arrow_next",
            prevEl: ".slider-rooms .slider-arrow_prew",
          },
        }),
      document.querySelector(".slider-tips__slider") &&
        new ce(".slider-tips__slider", {
          modules: [ue, ge, fe],
          autoplay: { delay: 3e3, disableOnInteraction: !1 },
          observer: !0,
          observeParents: !0,
          slidesPerView: 3,
          spaceBetween: 32,
          speed: 800,
          loop: !0,
          pagination: { el: ".slider-tips__dotts", clickable: !0 },
          navigation: {
            nextEl: ".slider-tips .slider-arrow_next",
            prevEl: ".slider-tips .slider-arrow_prew",
          },
          breakpoints: {
            320: { slidesPerView: 1.1, spaceBetween: 15 },
            768: { slidesPerView: 2, spaceBetween: 20 },
            992: { slidesPerView: 3, spaceBetween: 32 },
          },
        });
  });
  let ye = !1;
  setTimeout(() => {
    if (ye) {
      let e = new Event("windowScroll");
      window.addEventListener("scroll", function (t) {
        document.dispatchEvent(e);
      });
    }
  }, 0);
  var be = function () {
    return (
      (be =
        Object.assign ||
        function (e) {
          for (var t, i = 1, s = arguments.length; i < s; i++)
            for (var n in (t = arguments[i]))
              Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
          return e;
        }),
      be.apply(this, arguments)
    );
  };
  var we = "lgAfterAppendSlide",
    Se = "lgInit",
    xe = "lgHasVideo",
    Te = "lgContainerResize",
    Ee = "lgUpdateSlides",
    Ce = "lgAfterAppendSubHtml",
    Le = "lgBeforeOpen",
    Ie = "lgAfterOpen",
    Me = "lgSlideItemLoad",
    Ae = "lgBeforeSlide",
    _e = "lgAfterSlide",
    Oe = "lgPosterClick",
    Pe = "lgDragStart",
    ke = "lgDragMove",
    ze = "lgDragEnd",
    De = "lgBeforeNextSlide",
    Be = "lgBeforePrevSlide",
    Ge = "lgBeforeClose",
    $e = "lgAfterClose",
    He = {
      mode: "lg-slide",
      easing: "ease",
      speed: 400,
      licenseKey: "0000-0000-000-0000",
      height: "100%",
      width: "100%",
      addClass: "",
      startClass: "lg-start-zoom",
      backdropDuration: 300,
      container: "",
      startAnimationDuration: 400,
      zoomFromOrigin: !0,
      hideBarsDelay: 0,
      showBarsAfter: 1e4,
      slideDelay: 0,
      supportLegacyBrowser: !0,
      allowMediaOverlap: !1,
      videoMaxSize: "1280-720",
      loadYouTubePoster: !0,
      defaultCaptionHeight: 0,
      ariaLabelledby: "",
      ariaDescribedby: "",
      resetScrollPosition: !0,
      hideScrollbar: !1,
      closable: !0,
      swipeToClose: !0,
      closeOnTap: !0,
      showCloseIcon: !0,
      showMaximizeIcon: !1,
      loop: !0,
      escKey: !0,
      keyPress: !0,
      trapFocus: !0,
      controls: !0,
      slideEndAnimation: !0,
      hideControlOnEnd: !1,
      mousewheel: !1,
      getCaptionFromTitleOrAlt: !0,
      appendSubHtmlTo: ".lg-sub-html",
      subHtmlSelectorRelative: !1,
      preload: 2,
      numberOfSlideItemsInDom: 10,
      selector: "",
      selectWithin: "",
      nextHtml: "",
      prevHtml: "",
      index: 0,
      iframeWidth: "100%",
      iframeHeight: "100%",
      iframeMaxWidth: "100%",
      iframeMaxHeight: "100%",
      download: !0,
      counter: !0,
      appendCounterTo: ".lg-toolbar",
      swipeThreshold: 50,
      enableSwipe: !0,
      enableDrag: !0,
      dynamic: !1,
      dynamicEl: [],
      extraProps: [],
      exThumbImage: "",
      isMobile: void 0,
      mobileSettings: { controls: !1, showCloseIcon: !1, download: !1 },
      plugins: [],
      strings: {
        closeGallery: "Close gallery",
        toggleMaximize: "Toggle maximize",
        previousSlide: "Previous slide",
        nextSlide: "Next slide",
        download: "Download",
        playVideo: "Play video",
      },
    };
  var Fe = (function () {
    function e(e) {
      return (
        (this.cssVenderPrefixes = [
          "TransitionDuration",
          "TransitionTimingFunction",
          "Transform",
          "Transition",
        ]),
        (this.selector = this._getSelector(e)),
        (this.firstElement = this._getFirstEl()),
        this
      );
    }
    return (
      (e.generateUUID = function () {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
          /[xy]/g,
          function (e) {
            var t = (16 * Math.random()) | 0;
            return ("x" == e ? t : (3 & t) | 8).toString(16);
          }
        );
      }),
      (e.prototype._getSelector = function (e, t) {
        return (
          void 0 === t && (t = document),
          "string" != typeof e
            ? e
            : ((t = t || document),
              "#" === e.substring(0, 1)
                ? t.querySelector(e)
                : t.querySelectorAll(e))
        );
      }),
      (e.prototype._each = function (e) {
        return this.selector
          ? (void 0 !== this.selector.length
              ? [].forEach.call(this.selector, e)
              : e(this.selector, 0),
            this)
          : this;
      }),
      (e.prototype._setCssVendorPrefix = function (e, t, i) {
        var s = t.replace(/-([a-z])/gi, function (e, t) {
          return t.toUpperCase();
        });
        -1 !== this.cssVenderPrefixes.indexOf(s)
          ? ((e.style[s.charAt(0).toLowerCase() + s.slice(1)] = i),
            (e.style["webkit" + s] = i),
            (e.style["moz" + s] = i),
            (e.style["ms" + s] = i),
            (e.style["o" + s] = i))
          : (e.style[s] = i);
      }),
      (e.prototype._getFirstEl = function () {
        return this.selector && void 0 !== this.selector.length
          ? this.selector[0]
          : this.selector;
      }),
      (e.prototype.isEventMatched = function (e, t) {
        var i = t.split(".");
        return e
          .split(".")
          .filter(function (e) {
            return e;
          })
          .every(function (e) {
            return -1 !== i.indexOf(e);
          });
      }),
      (e.prototype.attr = function (e, t) {
        return void 0 === t
          ? this.firstElement
            ? this.firstElement.getAttribute(e)
            : ""
          : (this._each(function (i) {
              i.setAttribute(e, t);
            }),
            this);
      }),
      (e.prototype.find = function (e) {
        return qe(this._getSelector(e, this.selector));
      }),
      (e.prototype.first = function () {
        return this.selector && void 0 !== this.selector.length
          ? qe(this.selector[0])
          : qe(this.selector);
      }),
      (e.prototype.eq = function (e) {
        return qe(this.selector[e]);
      }),
      (e.prototype.parent = function () {
        return qe(this.selector.parentElement);
      }),
      (e.prototype.get = function () {
        return this._getFirstEl();
      }),
      (e.prototype.removeAttr = function (e) {
        var t = e.split(" ");
        return (
          this._each(function (e) {
            t.forEach(function (t) {
              return e.removeAttribute(t);
            });
          }),
          this
        );
      }),
      (e.prototype.wrap = function (e) {
        if (!this.firstElement) return this;
        var t = document.createElement("div");
        return (
          (t.className = e),
          this.firstElement.parentNode.insertBefore(t, this.firstElement),
          this.firstElement.parentNode.removeChild(this.firstElement),
          t.appendChild(this.firstElement),
          this
        );
      }),
      (e.prototype.addClass = function (e) {
        return (
          void 0 === e && (e = ""),
          this._each(function (t) {
            e.split(" ").forEach(function (e) {
              e && t.classList.add(e);
            });
          }),
          this
        );
      }),
      (e.prototype.removeClass = function (e) {
        return (
          this._each(function (t) {
            e.split(" ").forEach(function (e) {
              e && t.classList.remove(e);
            });
          }),
          this
        );
      }),
      (e.prototype.hasClass = function (e) {
        return !!this.firstElement && this.firstElement.classList.contains(e);
      }),
      (e.prototype.hasAttribute = function (e) {
        return !!this.firstElement && this.firstElement.hasAttribute(e);
      }),
      (e.prototype.toggleClass = function (e) {
        return this.firstElement
          ? (this.hasClass(e) ? this.removeClass(e) : this.addClass(e), this)
          : this;
      }),
      (e.prototype.css = function (e, t) {
        var i = this;
        return (
          this._each(function (s) {
            i._setCssVendorPrefix(s, e, t);
          }),
          this
        );
      }),
      (e.prototype.on = function (t, i) {
        var s = this;
        return this.selector
          ? (t.split(" ").forEach(function (t) {
              Array.isArray(e.eventListeners[t]) || (e.eventListeners[t] = []),
                e.eventListeners[t].push(i),
                s.selector.addEventListener(t.split(".")[0], i);
            }),
            this)
          : this;
      }),
      (e.prototype.once = function (e, t) {
        var i = this;
        return (
          this.on(e, function () {
            i.off(e), t(e);
          }),
          this
        );
      }),
      (e.prototype.off = function (t) {
        var i = this;
        return this.selector
          ? (Object.keys(e.eventListeners).forEach(function (s) {
              i.isEventMatched(t, s) &&
                (e.eventListeners[s].forEach(function (e) {
                  i.selector.removeEventListener(s.split(".")[0], e);
                }),
                (e.eventListeners[s] = []));
            }),
            this)
          : this;
      }),
      (e.prototype.trigger = function (e, t) {
        if (!this.firstElement) return this;
        var i = new CustomEvent(e.split(".")[0], { detail: t || null });
        return this.firstElement.dispatchEvent(i), this;
      }),
      (e.prototype.load = function (e) {
        var t = this;
        return (
          fetch(e)
            .then(function (e) {
              return e.text();
            })
            .then(function (e) {
              t.selector.innerHTML = e;
            }),
          this
        );
      }),
      (e.prototype.html = function (e) {
        return void 0 === e
          ? this.firstElement
            ? this.firstElement.innerHTML
            : ""
          : (this._each(function (t) {
              t.innerHTML = e;
            }),
            this);
      }),
      (e.prototype.append = function (e) {
        return (
          this._each(function (t) {
            "string" == typeof e
              ? t.insertAdjacentHTML("beforeend", e)
              : t.appendChild(e);
          }),
          this
        );
      }),
      (e.prototype.prepend = function (e) {
        return (
          this._each(function (t) {
            t.insertAdjacentHTML("afterbegin", e);
          }),
          this
        );
      }),
      (e.prototype.remove = function () {
        return (
          this._each(function (e) {
            e.parentNode.removeChild(e);
          }),
          this
        );
      }),
      (e.prototype.empty = function () {
        return (
          this._each(function (e) {
            e.innerHTML = "";
          }),
          this
        );
      }),
      (e.prototype.scrollTop = function (e) {
        return void 0 !== e
          ? ((document.body.scrollTop = e),
            (document.documentElement.scrollTop = e),
            this)
          : window.pageYOffset ||
              document.documentElement.scrollTop ||
              document.body.scrollTop ||
              0;
      }),
      (e.prototype.scrollLeft = function (e) {
        return void 0 !== e
          ? ((document.body.scrollLeft = e),
            (document.documentElement.scrollLeft = e),
            this)
          : window.pageXOffset ||
              document.documentElement.scrollLeft ||
              document.body.scrollLeft ||
              0;
      }),
      (e.prototype.offset = function () {
        if (!this.firstElement) return { left: 0, top: 0 };
        var e = this.firstElement.getBoundingClientRect(),
          t = qe("body").style().marginLeft;
        return {
          left: e.left - parseFloat(t) + this.scrollLeft(),
          top: e.top + this.scrollTop(),
        };
      }),
      (e.prototype.style = function () {
        return this.firstElement
          ? this.firstElement.currentStyle ||
              window.getComputedStyle(this.firstElement)
          : {};
      }),
      (e.prototype.width = function () {
        var e = this.style();
        return (
          this.firstElement.clientWidth -
          parseFloat(e.paddingLeft) -
          parseFloat(e.paddingRight)
        );
      }),
      (e.prototype.height = function () {
        var e = this.style();
        return (
          this.firstElement.clientHeight -
          parseFloat(e.paddingTop) -
          parseFloat(e.paddingBottom)
        );
      }),
      (e.eventListeners = {}),
      e
    );
  })();
  function qe(e) {
    return (
      (function () {
        if ("function" == typeof window.CustomEvent) return !1;
        window.CustomEvent = function (e, t) {
          t = t || { bubbles: !1, cancelable: !1, detail: null };
          var i = document.createEvent("CustomEvent");
          return i.initCustomEvent(e, t.bubbles, t.cancelable, t.detail), i;
        };
      })(),
      Element.prototype.matches ||
        (Element.prototype.matches =
          Element.prototype.msMatchesSelector ||
          Element.prototype.webkitMatchesSelector),
      new Fe(e)
    );
  }
  var Ne = [
    "src",
    "sources",
    "subHtml",
    "subHtmlUrl",
    "html",
    "video",
    "poster",
    "slideName",
    "responsive",
    "srcset",
    "sizes",
    "iframe",
    "downloadUrl",
    "download",
    "width",
    "facebookShareUrl",
    "tweetText",
    "iframeTitle",
    "twitterShareUrl",
    "pinterestShareUrl",
    "pinterestText",
    "fbHtml",
    "disqusIdentifier",
    "disqusUrl",
  ];
  function Ve(e) {
    return "href" === e
      ? "src"
      : (e = (e =
          (e = e.replace("data-", "")).charAt(0).toLowerCase() +
          e.slice(1)).replace(/-([a-z])/g, function (e) {
          return e[1].toUpperCase();
        }));
  }
  var je = function (e, t, i, s) {
      void 0 === i && (i = 0);
      var n = qe(e).attr("data-lg-size") || s;
      if (n) {
        var r = n.split(",");
        if (r[1])
          for (var a = window.innerWidth, o = 0; o < r.length; o++) {
            var l = r[o];
            if (parseInt(l.split("-")[2], 10) > a) {
              n = l;
              break;
            }
            o === r.length - 1 && (n = l);
          }
        var d = n.split("-"),
          c = parseInt(d[0], 10),
          p = parseInt(d[1], 10),
          u = t.width(),
          h = t.height() - i,
          g = Math.min(u, c),
          m = Math.min(h, p),
          f = Math.min(g / c, m / p);
        return { width: c * f, height: p * f };
      }
    },
    We = function (e, t, i, s, n) {
      if (n) {
        var r = qe(e).find("img").first();
        if (r.get()) {
          var a = t.get().getBoundingClientRect(),
            o = a.width,
            l = t.height() - (i + s),
            d = r.width(),
            c = r.height(),
            p = r.style(),
            u =
              (o - d) / 2 -
              r.offset().left +
              (parseFloat(p.paddingLeft) || 0) +
              (parseFloat(p.borderLeft) || 0) +
              qe(window).scrollLeft() +
              a.left,
            h =
              (l - c) / 2 -
              r.offset().top +
              (parseFloat(p.paddingTop) || 0) +
              (parseFloat(p.borderTop) || 0) +
              qe(window).scrollTop() +
              i;
          return (
            "translate3d(" +
            (u *= -1) +
            "px, " +
            (h *= -1) +
            "px, 0) scale3d(" +
            d / n.width +
            ", " +
            c / n.height +
            ", 1)"
          );
        }
      }
    },
    Re = function (e, t, i, s, n, r) {
      return (
        '<div class="lg-video-cont lg-has-iframe" style="width:' +
        e +
        "; max-width:" +
        i +
        "; height: " +
        t +
        "; max-height:" +
        s +
        '">\n                    <iframe class="lg-object" frameborder="0" ' +
        (r ? 'title="' + r + '"' : "") +
        ' src="' +
        n +
        '"  allowfullscreen="true"></iframe>\n                </div>'
      );
    },
    Ye = function (e, t, i, s, n, r) {
      var a =
          "<img " +
          i +
          " " +
          (s ? 'srcset="' + s + '"' : "") +
          "  " +
          (n ? 'sizes="' + n + '"' : "") +
          ' class="lg-object lg-image" data-index="' +
          e +
          '" src="' +
          t +
          '" />',
        o = "";
      r &&
        (o = ("string" == typeof r ? JSON.parse(r) : r).map(function (e) {
          var t = "";
          return (
            Object.keys(e).forEach(function (i) {
              t += " " + i + '="' + e[i] + '"';
            }),
            "<source " + t + "></source>"
          );
        }));
      return "" + o + a;
    },
    Xe = function (e) {
      for (var t = [], i = [], s = "", n = 0; n < e.length; n++) {
        var r = e[n].split(" ");
        "" === r[0] && r.splice(0, 1), i.push(r[0]), t.push(r[1]);
      }
      for (var a = window.innerWidth, o = 0; o < t.length; o++)
        if (parseInt(t[o], 10) > a) {
          s = i[o];
          break;
        }
      return s;
    },
    Ue = function (e) {
      return !!e && !!e.complete && 0 !== e.naturalWidth;
    },
    Ke = function (e, t, i, s, n) {
      return (
        '<div class="lg-video-cont ' +
        (n && n.youtube
          ? "lg-has-youtube"
          : n && n.vimeo
          ? "lg-has-vimeo"
          : "lg-has-html5") +
        '" style="' +
        i +
        '">\n                <div class="lg-video-play-button">\n                <svg\n                    viewBox="0 0 20 20"\n                    preserveAspectRatio="xMidYMid"\n                    focusable="false"\n                    aria-labelledby="' +
        s +
        '"\n                    role="img"\n                    class="lg-video-play-icon"\n                >\n                    <title>' +
        s +
        '</title>\n                    <polygon class="lg-video-play-icon-inner" points="1,0 20,10 1,20"></polygon>\n                </svg>\n                <svg class="lg-video-play-icon-bg" viewBox="0 0 50 50" focusable="false">\n                    <circle cx="50%" cy="50%" r="20"></circle></svg>\n                <svg class="lg-video-play-icon-circle" viewBox="0 0 50 50" focusable="false">\n                    <circle cx="50%" cy="50%" r="20"></circle>\n                </svg>\n            </div>\n            ' +
        (t || "") +
        '\n            <img class="lg-object lg-video-poster" src="' +
        e +
        '" />\n        </div>'
      );
    },
    Qe = function (e) {
      var t = e.querySelectorAll(
        'a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])'
      );
      return [].filter.call(t, function (e) {
        var t = window.getComputedStyle(e);
        return "none" !== t.display && "hidden" !== t.visibility;
      });
    },
    Ze = function (e, t, i, s) {
      var n = [],
        r = (function () {
          for (var e = 0, t = 0, i = arguments.length; t < i; t++)
            e += arguments[t].length;
          var s = Array(e),
            n = 0;
          for (t = 0; t < i; t++)
            for (var r = arguments[t], a = 0, o = r.length; a < o; a++, n++)
              s[n] = r[a];
          return s;
        })(Ne, t);
      return (
        [].forEach.call(e, function (e) {
          for (var t = {}, a = 0; a < e.attributes.length; a++) {
            var o = e.attributes[a];
            if (o.specified) {
              var l = Ve(o.name),
                d = "";
              r.indexOf(l) > -1 && (d = l), d && (t[d] = o.value);
            }
          }
          var c = qe(e),
            p = c.find("img").first().attr("alt"),
            u = c.attr("title"),
            h = s ? c.attr(s) : c.find("img").first().attr("src");
          (t.thumb = h),
            i && !t.subHtml && (t.subHtml = u || p || ""),
            (t.alt = p || u || ""),
            n.push(t);
        }),
        n
      );
    },
    Je = function () {
      return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    },
    et = function (e, t, i) {
      if (!e)
        return t
          ? { html5: !0 }
          : void console.error(
              "lightGallery :- data-src is not provided on slide item " +
                (i + 1) +
                ". Please make sure the selector property is properly configured. More info - https://www.lightgalleryjs.com/demos/html-markup/"
            );
      var s = e.match(
          /\/\/(?:www\.)?youtu(?:\.be|be\.com|be-nocookie\.com)\/(?:watch\?v=|embed\/)?([a-z0-9\-\_\%]+)([\&|?][\S]*)*/i
        ),
        n = e.match(
          /\/\/(?:www\.)?(?:player\.)?vimeo.com\/(?:video\/)?([0-9a-z\-_]+)(.*)?/i
        ),
        r = e.match(
          /https?:\/\/(.+)?(wistia\.com|wi\.st)\/(medias|embed)\/([0-9a-z\-_]+)(.*)/
        );
      return s ? { youtube: s } : n ? { vimeo: n } : r ? { wistia: r } : void 0;
    },
    tt = 0,
    it = (function () {
      function e(e, t) {
        if (
          ((this.lgOpened = !1),
          (this.index = 0),
          (this.plugins = []),
          (this.lGalleryOn = !1),
          (this.lgBusy = !1),
          (this.currentItemsInDom = []),
          (this.prevScrollTop = 0),
          (this.bodyPaddingRight = 0),
          (this.isDummyImageRemoved = !1),
          (this.dragOrSwipeEnabled = !1),
          (this.mediaContainerPosition = { top: 0, bottom: 0 }),
          !e)
        )
          return this;
        if (
          (tt++,
          (this.lgId = tt),
          (this.el = e),
          (this.LGel = qe(e)),
          this.generateSettings(t),
          this.buildModules(),
          this.settings.dynamic &&
            void 0 !== this.settings.dynamicEl &&
            !Array.isArray(this.settings.dynamicEl))
        )
          throw "When using dynamic mode, you must also define dynamicEl as an Array.";
        return (
          (this.galleryItems = this.getItems()),
          this.normalizeSettings(),
          this.init(),
          this.validateLicense(),
          this
        );
      }
      return (
        (e.prototype.generateSettings = function (e) {
          if (
            ((this.settings = be(be({}, He), e)),
            this.settings.isMobile &&
            "function" == typeof this.settings.isMobile
              ? this.settings.isMobile()
              : Je())
          ) {
            var t = be(
              be({}, this.settings.mobileSettings),
              this.settings.mobileSettings
            );
            this.settings = be(be({}, this.settings), t);
          }
        }),
        (e.prototype.normalizeSettings = function () {
          this.settings.slideEndAnimation &&
            (this.settings.hideControlOnEnd = !1),
            this.settings.closable || (this.settings.swipeToClose = !1),
            (this.zoomFromOrigin = this.settings.zoomFromOrigin),
            this.settings.dynamic && (this.zoomFromOrigin = !1),
            this.settings.container ||
              (this.settings.container = document.body),
            (this.settings.preload = Math.min(
              this.settings.preload,
              this.galleryItems.length
            ));
        }),
        (e.prototype.init = function () {
          var e = this;
          this.addSlideVideoInfo(this.galleryItems),
            this.buildStructure(),
            this.LGel.trigger(Se, { instance: this }),
            this.settings.keyPress && this.keyPress(),
            setTimeout(function () {
              e.enableDrag(), e.enableSwipe(), e.triggerPosterClick();
            }, 50),
            this.arrow(),
            this.settings.mousewheel && this.mousewheel(),
            this.settings.dynamic || this.openGalleryOnItemClick();
        }),
        (e.prototype.openGalleryOnItemClick = function () {
          for (
            var e = this,
              t = function (t) {
                var s = i.items[t],
                  n = qe(s),
                  r = Fe.generateUUID();
                n.attr("data-lg-id", r).on(
                  "click.lgcustom-item-" + r,
                  function (i) {
                    i.preventDefault();
                    var n = e.settings.index || t;
                    e.openGallery(n, s);
                  }
                );
              },
              i = this,
              s = 0;
            s < this.items.length;
            s++
          )
            t(s);
        }),
        (e.prototype.buildModules = function () {
          var e = this;
          this.settings.plugins.forEach(function (t) {
            e.plugins.push(new t(e, qe));
          });
        }),
        (e.prototype.validateLicense = function () {
          this.settings.licenseKey
            ? "0000-0000-000-0000" === this.settings.licenseKey &&
              console.warn(
                "lightGallery: " +
                  this.settings.licenseKey +
                  " license key is not valid for production use"
              )
            : console.error("Please provide a valid license key");
        }),
        (e.prototype.getSlideItem = function (e) {
          return qe(this.getSlideItemId(e));
        }),
        (e.prototype.getSlideItemId = function (e) {
          return "#lg-item-" + this.lgId + "-" + e;
        }),
        (e.prototype.getIdName = function (e) {
          return e + "-" + this.lgId;
        }),
        (e.prototype.getElementById = function (e) {
          return qe("#" + this.getIdName(e));
        }),
        (e.prototype.manageSingleSlideClassName = function () {
          this.galleryItems.length < 2
            ? this.outer.addClass("lg-single-item")
            : this.outer.removeClass("lg-single-item");
        }),
        (e.prototype.buildStructure = function () {
          var e = this;
          if (!(this.$container && this.$container.get())) {
            var t = "",
              i = "";
            this.settings.controls &&
              (t =
                '<button type="button" id="' +
                this.getIdName("lg-prev") +
                '" aria-label="' +
                this.settings.strings.previousSlide +
                '" class="lg-prev lg-icon"> ' +
                this.settings.prevHtml +
                ' </button>\n                <button type="button" id="' +
                this.getIdName("lg-next") +
                '" aria-label="' +
                this.settings.strings.nextSlide +
                '" class="lg-next lg-icon"> ' +
                this.settings.nextHtml +
                " </button>"),
              ".lg-item" !== this.settings.appendSubHtmlTo &&
                (i =
                  '<div class="lg-sub-html" role="status" aria-live="polite"></div>');
            var s = "";
            this.settings.allowMediaOverlap && (s += "lg-media-overlap ");
            var n = this.settings.ariaLabelledby
                ? 'aria-labelledby="' + this.settings.ariaLabelledby + '"'
                : "",
              r = this.settings.ariaDescribedby
                ? 'aria-describedby="' + this.settings.ariaDescribedby + '"'
                : "",
              a =
                "lg-container " +
                this.settings.addClass +
                " " +
                (document.body !== this.settings.container ? "lg-inline" : ""),
              o =
                this.settings.closable && this.settings.showCloseIcon
                  ? '<button type="button" aria-label="' +
                    this.settings.strings.closeGallery +
                    '" id="' +
                    this.getIdName("lg-close") +
                    '" class="lg-close lg-icon"></button>'
                  : "",
              l = this.settings.showMaximizeIcon
                ? '<button type="button" aria-label="' +
                  this.settings.strings.toggleMaximize +
                  '" id="' +
                  this.getIdName("lg-maximize") +
                  '" class="lg-maximize lg-icon"></button>'
                : "",
              d =
                '\n        <div class="' +
                a +
                '" id="' +
                this.getIdName("lg-container") +
                '" tabindex="-1" aria-modal="true" ' +
                n +
                " " +
                r +
                ' role="dialog"\n        >\n            <div id="' +
                this.getIdName("lg-backdrop") +
                '" class="lg-backdrop"></div>\n\n            <div id="' +
                this.getIdName("lg-outer") +
                '" class="lg-outer lg-use-css3 lg-css3 lg-hide-items ' +
                s +
                ' ">\n\n              <div id="' +
                this.getIdName("lg-content") +
                '" class="lg-content">\n                <div id="' +
                this.getIdName("lg-inner") +
                '" class="lg-inner">\n                </div>\n                ' +
                t +
                '\n              </div>\n                <div id="' +
                this.getIdName("lg-toolbar") +
                '" class="lg-toolbar lg-group">\n                    ' +
                l +
                "\n                    " +
                o +
                "\n                    </div>\n                    " +
                (".lg-outer" === this.settings.appendSubHtmlTo ? i : "") +
                '\n                <div id="' +
                this.getIdName("lg-components") +
                '" class="lg-components">\n                    ' +
                (".lg-sub-html" === this.settings.appendSubHtmlTo ? i : "") +
                "\n                </div>\n            </div>\n        </div>\n        ";
            qe(this.settings.container).append(d),
              document.body !== this.settings.container &&
                qe(this.settings.container).css("position", "relative"),
              (this.outer = this.getElementById("lg-outer")),
              (this.$lgComponents = this.getElementById("lg-components")),
              (this.$backdrop = this.getElementById("lg-backdrop")),
              (this.$container = this.getElementById("lg-container")),
              (this.$inner = this.getElementById("lg-inner")),
              (this.$content = this.getElementById("lg-content")),
              (this.$toolbar = this.getElementById("lg-toolbar")),
              this.$backdrop.css(
                "transition-duration",
                this.settings.backdropDuration + "ms"
              );
            var c = this.settings.mode + " ";
            this.manageSingleSlideClassName(),
              this.settings.enableDrag && (c += "lg-grab "),
              this.outer.addClass(c),
              this.$inner.css(
                "transition-timing-function",
                this.settings.easing
              ),
              this.$inner.css(
                "transition-duration",
                this.settings.speed + "ms"
              ),
              this.settings.download &&
                this.$toolbar.append(
                  '<a id="' +
                    this.getIdName("lg-download") +
                    '" target="_blank" rel="noopener" aria-label="' +
                    this.settings.strings.download +
                    '" download class="lg-download lg-icon"></a>'
                ),
              this.counter(),
              qe(window).on(
                "resize.lg.global" +
                  this.lgId +
                  " orientationchange.lg.global" +
                  this.lgId,
                function () {
                  e.refreshOnResize();
                }
              ),
              this.hideBars(),
              this.manageCloseGallery(),
              this.toggleMaximize(),
              this.initModules();
          }
        }),
        (e.prototype.refreshOnResize = function () {
          if (this.lgOpened) {
            var e = this.galleryItems[this.index].__slideVideoInfo;
            this.mediaContainerPosition = this.getMediaContainerPosition();
            var t = this.mediaContainerPosition,
              i = t.top,
              s = t.bottom;
            if (
              ((this.currentImageSize = je(
                this.items[this.index],
                this.outer,
                i + s,
                e && this.settings.videoMaxSize
              )),
              e && this.resizeVideoSlide(this.index, this.currentImageSize),
              this.zoomFromOrigin && !this.isDummyImageRemoved)
            ) {
              var n = this.getDummyImgStyles(this.currentImageSize);
              this.outer
                .find(".lg-current .lg-dummy-img")
                .first()
                .attr("style", n);
            }
            this.LGel.trigger(Te);
          }
        }),
        (e.prototype.resizeVideoSlide = function (e, t) {
          var i = this.getVideoContStyle(t);
          this.getSlideItem(e).find(".lg-video-cont").attr("style", i);
        }),
        (e.prototype.updateSlides = function (e, t) {
          if (
            (this.index > e.length - 1 && (this.index = e.length - 1),
            1 === e.length && (this.index = 0),
            e.length)
          ) {
            var i = this.galleryItems[t].src;
            (this.galleryItems = e),
              this.updateControls(),
              this.$inner.empty(),
              (this.currentItemsInDom = []);
            var s = 0;
            this.galleryItems.some(function (e, t) {
              return e.src === i && ((s = t), !0);
            }),
              (this.currentItemsInDom = this.organizeSlideItems(s, -1)),
              this.loadContent(s, !0),
              this.getSlideItem(s).addClass("lg-current"),
              (this.index = s),
              this.updateCurrentCounter(s),
              this.LGel.trigger(Ee);
          } else this.closeGallery();
        }),
        (e.prototype.getItems = function () {
          if (((this.items = []), this.settings.dynamic))
            return this.settings.dynamicEl || [];
          if ("this" === this.settings.selector) this.items.push(this.el);
          else if (this.settings.selector)
            if ("string" == typeof this.settings.selector)
              if (this.settings.selectWithin) {
                var e = qe(this.settings.selectWithin);
                this.items = e.find(this.settings.selector).get();
              } else
                this.items = this.el.querySelectorAll(this.settings.selector);
            else this.items = this.settings.selector;
          else this.items = this.el.children;
          return Ze(
            this.items,
            this.settings.extraProps,
            this.settings.getCaptionFromTitleOrAlt,
            this.settings.exThumbImage
          );
        }),
        (e.prototype.shouldHideScrollbar = function () {
          return (
            this.settings.hideScrollbar &&
            document.body === this.settings.container
          );
        }),
        (e.prototype.hideScrollbar = function () {
          if (this.shouldHideScrollbar()) {
            this.bodyPaddingRight = parseFloat(qe("body").style().paddingRight);
            var e = document.documentElement.getBoundingClientRect(),
              t = window.innerWidth - e.width;
            qe(document.body).css(
              "padding-right",
              t + this.bodyPaddingRight + "px"
            ),
              qe(document.body).addClass("lg-overlay-open");
          }
        }),
        (e.prototype.resetScrollBar = function () {
          this.shouldHideScrollbar() &&
            (qe(document.body).css(
              "padding-right",
              this.bodyPaddingRight + "px"
            ),
            qe(document.body).removeClass("lg-overlay-open"));
        }),
        (e.prototype.openGallery = function (e, t) {
          var i = this;
          if ((void 0 === e && (e = this.settings.index), !this.lgOpened)) {
            (this.lgOpened = !0),
              this.outer.removeClass("lg-hide-items"),
              this.hideScrollbar(),
              this.$container.addClass("lg-show");
            var s = this.getItemsToBeInsertedToDom(e, e);
            this.currentItemsInDom = s;
            var n = "";
            s.forEach(function (e) {
              n = n + '<div id="' + e + '" class="lg-item"></div>';
            }),
              this.$inner.append(n),
              this.addHtml(e);
            var r = "";
            this.mediaContainerPosition = this.getMediaContainerPosition();
            var a = this.mediaContainerPosition,
              o = a.top,
              l = a.bottom;
            this.settings.allowMediaOverlap ||
              this.setMediaContainerPosition(o, l);
            var d = this.galleryItems[e].__slideVideoInfo;
            this.zoomFromOrigin &&
              t &&
              ((this.currentImageSize = je(
                t,
                this.outer,
                o + l,
                d && this.settings.videoMaxSize
              )),
              (r = We(t, this.outer, o, l, this.currentImageSize))),
              (this.zoomFromOrigin && r) ||
                (this.outer.addClass(this.settings.startClass),
                this.getSlideItem(e).removeClass("lg-complete"));
            var c = this.settings.zoomFromOrigin
              ? 100
              : this.settings.backdropDuration;
            setTimeout(function () {
              i.outer.addClass("lg-components-open");
            }, c),
              (this.index = e),
              this.LGel.trigger(Le),
              this.getSlideItem(e).addClass("lg-current"),
              (this.lGalleryOn = !1),
              (this.prevScrollTop = qe(window).scrollTop()),
              setTimeout(function () {
                if (i.zoomFromOrigin && r) {
                  var t = i.getSlideItem(e);
                  t.css("transform", r),
                    setTimeout(function () {
                      t
                        .addClass("lg-start-progress lg-start-end-progress")
                        .css(
                          "transition-duration",
                          i.settings.startAnimationDuration + "ms"
                        ),
                        i.outer.addClass("lg-zoom-from-image");
                    }),
                    setTimeout(function () {
                      t.css("transform", "translate3d(0, 0, 0)");
                    }, 100);
                }
                setTimeout(function () {
                  i.$backdrop.addClass("in"),
                    i.$container.addClass("lg-show-in");
                }, 10),
                  setTimeout(function () {
                    i.settings.trapFocus &&
                      document.body === i.settings.container &&
                      i.trapFocus();
                  }, i.settings.backdropDuration + 50),
                  (i.zoomFromOrigin && r) ||
                    setTimeout(function () {
                      i.outer.addClass("lg-visible");
                    }, i.settings.backdropDuration),
                  i.slide(e, !1, !1, !1),
                  i.LGel.trigger(Ie);
              }),
              document.body === this.settings.container &&
                qe("html").addClass("lg-on");
          }
        }),
        (e.prototype.getMediaContainerPosition = function () {
          if (this.settings.allowMediaOverlap) return { top: 0, bottom: 0 };
          var e = this.$toolbar.get().clientHeight || 0,
            t = this.outer.find(".lg-components .lg-sub-html").get(),
            i =
              this.settings.defaultCaptionHeight || (t && t.clientHeight) || 0,
            s = this.outer.find(".lg-thumb-outer").get();
          return { top: e, bottom: (s ? s.clientHeight : 0) + i };
        }),
        (e.prototype.setMediaContainerPosition = function (e, t) {
          void 0 === e && (e = 0),
            void 0 === t && (t = 0),
            this.$content.css("top", e + "px").css("bottom", t + "px");
        }),
        (e.prototype.hideBars = function () {
          var e = this;
          setTimeout(function () {
            e.outer.removeClass("lg-hide-items"),
              e.settings.hideBarsDelay > 0 &&
                (e.outer.on("mousemove.lg click.lg touchstart.lg", function () {
                  e.outer.removeClass("lg-hide-items"),
                    clearTimeout(e.hideBarTimeout),
                    (e.hideBarTimeout = setTimeout(function () {
                      e.outer.addClass("lg-hide-items");
                    }, e.settings.hideBarsDelay));
                }),
                e.outer.trigger("mousemove.lg"));
          }, this.settings.showBarsAfter);
        }),
        (e.prototype.initPictureFill = function (e) {
          if (this.settings.supportLegacyBrowser)
            try {
              picturefill({ elements: [e.get()] });
            } catch (e) {
              console.warn(
                "lightGallery :- If you want srcset or picture tag to be supported for older browser please include picturefil javascript library in your document."
              );
            }
        }),
        (e.prototype.counter = function () {
          if (this.settings.counter) {
            var e =
              '<div class="lg-counter" role="status" aria-live="polite">\n                <span id="' +
              this.getIdName("lg-counter-current") +
              '" class="lg-counter-current">' +
              (this.index + 1) +
              ' </span> /\n                <span id="' +
              this.getIdName("lg-counter-all") +
              '" class="lg-counter-all">' +
              this.galleryItems.length +
              " </span></div>";
            this.outer.find(this.settings.appendCounterTo).append(e);
          }
        }),
        (e.prototype.addHtml = function (e) {
          var t, i;
          if (
            (this.galleryItems[e].subHtmlUrl
              ? (i = this.galleryItems[e].subHtmlUrl)
              : (t = this.galleryItems[e].subHtml),
            !i)
          )
            if (t) {
              var s = t.substring(0, 1);
              ("." !== s && "#" !== s) ||
                (t =
                  this.settings.subHtmlSelectorRelative &&
                  !this.settings.dynamic
                    ? qe(this.items).eq(e).find(t).first().html()
                    : qe(t).first().html());
            } else t = "";
          if (".lg-item" !== this.settings.appendSubHtmlTo)
            i
              ? this.outer.find(".lg-sub-html").load(i)
              : this.outer.find(".lg-sub-html").html(t);
          else {
            var n = qe(this.getSlideItemId(e));
            i
              ? n.load(i)
              : n.append('<div class="lg-sub-html">' + t + "</div>");
          }
          null != t &&
            ("" === t
              ? this.outer
                  .find(this.settings.appendSubHtmlTo)
                  .addClass("lg-empty-html")
              : this.outer
                  .find(this.settings.appendSubHtmlTo)
                  .removeClass("lg-empty-html")),
            this.LGel.trigger(Ce, { index: e });
        }),
        (e.prototype.preload = function (e) {
          for (
            var t = 1;
            t <= this.settings.preload && !(t >= this.galleryItems.length - e);
            t++
          )
            this.loadContent(e + t, !1);
          for (var i = 1; i <= this.settings.preload && !(e - i < 0); i++)
            this.loadContent(e - i, !1);
        }),
        (e.prototype.getDummyImgStyles = function (e) {
          return e
            ? "width:" +
                e.width +
                "px;\n                margin-left: -" +
                e.width / 2 +
                "px;\n                margin-top: -" +
                e.height / 2 +
                "px;\n                height:" +
                e.height +
                "px"
            : "";
        }),
        (e.prototype.getVideoContStyle = function (e) {
          return e
            ? "width:" +
                e.width +
                "px;\n                height:" +
                e.height +
                "px"
            : "";
        }),
        (e.prototype.getDummyImageContent = function (e, t, i) {
          var s;
          if ((this.settings.dynamic || (s = qe(this.items).eq(t)), s)) {
            var n = void 0;
            if (
              !(n = this.settings.exThumbImage
                ? s.attr(this.settings.exThumbImage)
                : s.find("img").first().attr("src"))
            )
              return "";
            var r =
              "<img " +
              i +
              ' style="' +
              this.getDummyImgStyles(this.currentImageSize) +
              '" class="lg-dummy-img" src="' +
              n +
              '" />';
            return (
              e.addClass("lg-first-slide"),
              this.outer.addClass("lg-first-slide-loading"),
              r
            );
          }
          return "";
        }),
        (e.prototype.setImgMarkup = function (e, t, i) {
          var s = this.galleryItems[i],
            n = s.alt,
            r = s.srcset,
            a = s.sizes,
            o = s.sources,
            l = n ? 'alt="' + n + '"' : "",
            d =
              '<picture class="lg-img-wrap"> ' +
              (this.isFirstSlideWithZoomAnimation()
                ? this.getDummyImageContent(t, i, l)
                : Ye(i, e, l, r, a, o)) +
              "</picture>";
          t.prepend(d);
        }),
        (e.prototype.onSlideObjectLoad = function (e, t, i, s) {
          var n = e.find(".lg-object").first();
          Ue(n.get()) || t
            ? i()
            : (n.on("load.lg error.lg", function () {
                i && i();
              }),
              n.on("error.lg", function () {
                s && s();
              }));
        }),
        (e.prototype.onLgObjectLoad = function (e, t, i, s, n, r) {
          var a = this;
          this.onSlideObjectLoad(
            e,
            r,
            function () {
              a.triggerSlideItemLoad(e, t, i, s, n);
            },
            function () {
              e.addClass("lg-complete lg-complete_"),
                e.html(
                  '<span class="lg-error-msg">Oops... Failed to load content...</span>'
                );
            }
          );
        }),
        (e.prototype.triggerSlideItemLoad = function (e, t, i, s, n) {
          var r = this,
            a = this.galleryItems[t],
            o = n && "video" === this.getSlideType(a) && !a.poster ? s : 0;
          setTimeout(function () {
            e.addClass("lg-complete lg-complete_"),
              r.LGel.trigger(Me, { index: t, delay: i || 0, isFirstSlide: n });
          }, o);
        }),
        (e.prototype.isFirstSlideWithZoomAnimation = function () {
          return !(
            this.lGalleryOn ||
            !this.zoomFromOrigin ||
            !this.currentImageSize
          );
        }),
        (e.prototype.addSlideVideoInfo = function (e) {
          var t = this;
          e.forEach(function (e, i) {
            (e.__slideVideoInfo = et(e.src, !!e.video, i)),
              e.__slideVideoInfo &&
                t.settings.loadYouTubePoster &&
                !e.poster &&
                e.__slideVideoInfo.youtube &&
                (e.poster =
                  "//img.youtube.com/vi/" +
                  e.__slideVideoInfo.youtube[1] +
                  "/maxresdefault.jpg");
          });
        }),
        (e.prototype.loadContent = function (e, t) {
          var i = this,
            s = this.galleryItems[e],
            n = qe(this.getSlideItemId(e)),
            r = s.poster,
            a = s.srcset,
            o = s.sizes,
            l = s.sources,
            d = s.src,
            c = s.video,
            p = c && "string" == typeof c ? JSON.parse(c) : c;
          if (s.responsive) {
            var u = s.responsive.split(",");
            d = Xe(u) || d;
          }
          var h = s.__slideVideoInfo,
            g = "",
            m = !!s.iframe,
            f = !this.lGalleryOn,
            v = 0;
          if (
            (f &&
              (v =
                this.zoomFromOrigin && this.currentImageSize
                  ? this.settings.startAnimationDuration + 10
                  : this.settings.backdropDuration + 10),
            !n.hasClass("lg-loaded"))
          ) {
            if (h) {
              var y = this.mediaContainerPosition,
                b = y.top,
                w = y.bottom,
                S = je(
                  this.items[e],
                  this.outer,
                  b + w,
                  h && this.settings.videoMaxSize
                );
              g = this.getVideoContStyle(S);
            }
            if (m) {
              var x = Re(
                this.settings.iframeWidth,
                this.settings.iframeHeight,
                this.settings.iframeMaxWidth,
                this.settings.iframeMaxHeight,
                d,
                s.iframeTitle
              );
              n.prepend(x);
            } else if (r) {
              var T = "";
              f &&
                this.zoomFromOrigin &&
                this.currentImageSize &&
                (T = this.getDummyImageContent(n, e, ""));
              x = Ke(r, T || "", g, this.settings.strings.playVideo, h);
              n.prepend(x);
            } else if (h) {
              x = '<div class="lg-video-cont " style="' + g + '"></div>';
              n.prepend(x);
            } else if ((this.setImgMarkup(d, n, e), a || l)) {
              var E = n.find(".lg-object");
              this.initPictureFill(E);
            }
            (r || h) &&
              this.LGel.trigger(xe, {
                index: e,
                src: d,
                html5Video: p,
                hasPoster: !!r,
              }),
              this.LGel.trigger(we, { index: e }),
              this.lGalleryOn &&
                ".lg-item" === this.settings.appendSubHtmlTo &&
                this.addHtml(e);
          }
          var C = 0;
          v && !qe(document.body).hasClass("lg-from-hash") && (C = v),
            this.isFirstSlideWithZoomAnimation() &&
              (setTimeout(function () {
                n.removeClass(
                  "lg-start-end-progress lg-start-progress"
                ).removeAttr("style");
              }, this.settings.startAnimationDuration + 100),
              n.hasClass("lg-loaded") ||
                setTimeout(function () {
                  if ("image" === i.getSlideType(s)) {
                    var t = s.alt,
                      c = t ? 'alt="' + t + '"' : "";
                    if (
                      (n
                        .find(".lg-img-wrap")
                        .append(Ye(e, d, c, a, o, s.sources)),
                      a || l)
                    ) {
                      var p = n.find(".lg-object");
                      i.initPictureFill(p);
                    }
                  }
                  ("image" === i.getSlideType(s) ||
                    ("video" === i.getSlideType(s) && r)) &&
                    (i.onLgObjectLoad(n, e, v, C, !0, !1),
                    i.onSlideObjectLoad(
                      n,
                      !(!h || !h.html5 || r),
                      function () {
                        i.loadContentOnFirstSlideLoad(e, n, C);
                      },
                      function () {
                        i.loadContentOnFirstSlideLoad(e, n, C);
                      }
                    ));
                }, this.settings.startAnimationDuration + 100)),
            n.addClass("lg-loaded"),
            (this.isFirstSlideWithZoomAnimation() &&
              ("video" !== this.getSlideType(s) || r)) ||
              this.onLgObjectLoad(n, e, v, C, f, !(!h || !h.html5 || r)),
            (this.zoomFromOrigin && this.currentImageSize) ||
              !n.hasClass("lg-complete_") ||
              this.lGalleryOn ||
              setTimeout(function () {
                n.addClass("lg-complete");
              }, this.settings.backdropDuration),
            (this.lGalleryOn = !0),
            !0 === t &&
              (n.hasClass("lg-complete_")
                ? this.preload(e)
                : n
                    .find(".lg-object")
                    .first()
                    .on("load.lg error.lg", function () {
                      i.preload(e);
                    }));
        }),
        (e.prototype.loadContentOnFirstSlideLoad = function (e, t, i) {
          var s = this;
          setTimeout(function () {
            t.find(".lg-dummy-img").remove(),
              t.removeClass("lg-first-slide"),
              s.outer.removeClass("lg-first-slide-loading"),
              (s.isDummyImageRemoved = !0),
              s.preload(e);
          }, i + 300);
        }),
        (e.prototype.getItemsToBeInsertedToDom = function (e, t, i) {
          var s = this;
          void 0 === i && (i = 0);
          var n = [],
            r = Math.max(i, 3);
          r = Math.min(r, this.galleryItems.length);
          var a = "lg-item-" + this.lgId + "-" + t;
          if (this.galleryItems.length <= 3)
            return (
              this.galleryItems.forEach(function (e, t) {
                n.push("lg-item-" + s.lgId + "-" + t);
              }),
              n
            );
          if (e < (this.galleryItems.length - 1) / 2) {
            for (var o = e; o > e - r / 2 && o >= 0; o--)
              n.push("lg-item-" + this.lgId + "-" + o);
            var l = n.length;
            for (o = 0; o < r - l; o++)
              n.push("lg-item-" + this.lgId + "-" + (e + o + 1));
          } else {
            for (o = e; o <= this.galleryItems.length - 1 && o < e + r / 2; o++)
              n.push("lg-item-" + this.lgId + "-" + o);
            for (l = n.length, o = 0; o < r - l; o++)
              n.push("lg-item-" + this.lgId + "-" + (e - o - 1));
          }
          return (
            this.settings.loop &&
              (e === this.galleryItems.length - 1
                ? n.push("lg-item-" + this.lgId + "-0")
                : 0 === e &&
                  n.push(
                    "lg-item-" +
                      this.lgId +
                      "-" +
                      (this.galleryItems.length - 1)
                  )),
            -1 === n.indexOf(a) && n.push("lg-item-" + this.lgId + "-" + t),
            n
          );
        }),
        (e.prototype.organizeSlideItems = function (e, t) {
          var i = this,
            s = this.getItemsToBeInsertedToDom(
              e,
              t,
              this.settings.numberOfSlideItemsInDom
            );
          return (
            s.forEach(function (e) {
              -1 === i.currentItemsInDom.indexOf(e) &&
                i.$inner.append('<div id="' + e + '" class="lg-item"></div>');
            }),
            this.currentItemsInDom.forEach(function (e) {
              -1 === s.indexOf(e) && qe("#" + e).remove();
            }),
            s
          );
        }),
        (e.prototype.getPreviousSlideIndex = function () {
          var e = 0;
          try {
            var t = this.outer.find(".lg-current").first().attr("id");
            e = parseInt(t.split("-")[3]) || 0;
          } catch (t) {
            e = 0;
          }
          return e;
        }),
        (e.prototype.setDownloadValue = function (e) {
          if (this.settings.download) {
            var t = this.galleryItems[e];
            if (!1 === t.downloadUrl || "false" === t.downloadUrl)
              this.outer.addClass("lg-hide-download");
            else {
              var i = this.getElementById("lg-download");
              this.outer.removeClass("lg-hide-download"),
                i.attr("href", t.downloadUrl || t.src),
                t.download && i.attr("download", t.download);
            }
          }
        }),
        (e.prototype.makeSlideAnimation = function (e, t, i) {
          var s = this;
          this.lGalleryOn && i.addClass("lg-slide-progress"),
            setTimeout(
              function () {
                s.outer.addClass("lg-no-trans"),
                  s.outer
                    .find(".lg-item")
                    .removeClass("lg-prev-slide lg-next-slide"),
                  "prev" === e
                    ? (t.addClass("lg-prev-slide"), i.addClass("lg-next-slide"))
                    : (t.addClass("lg-next-slide"),
                      i.addClass("lg-prev-slide")),
                  setTimeout(function () {
                    s.outer.find(".lg-item").removeClass("lg-current"),
                      t.addClass("lg-current"),
                      s.outer.removeClass("lg-no-trans");
                  }, 50);
              },
              this.lGalleryOn ? this.settings.slideDelay : 0
            );
        }),
        (e.prototype.slide = function (e, t, i, s) {
          var n = this,
            r = this.getPreviousSlideIndex();
          if (
            ((this.currentItemsInDom = this.organizeSlideItems(e, r)),
            !this.lGalleryOn || r !== e)
          ) {
            var a = this.galleryItems.length;
            if (!this.lgBusy) {
              this.settings.counter && this.updateCurrentCounter(e);
              var o = this.getSlideItem(e),
                l = this.getSlideItem(r),
                d = this.galleryItems[e],
                c = d.__slideVideoInfo;
              if (
                (this.outer.attr("data-lg-slide-type", this.getSlideType(d)),
                this.setDownloadValue(e),
                c)
              ) {
                var p = this.mediaContainerPosition,
                  u = p.top,
                  h = p.bottom,
                  g = je(
                    this.items[e],
                    this.outer,
                    u + h,
                    c && this.settings.videoMaxSize
                  );
                this.resizeVideoSlide(e, g);
              }
              if (
                (this.LGel.trigger(Ae, {
                  prevIndex: r,
                  index: e,
                  fromTouch: !!t,
                  fromThumb: !!i,
                }),
                (this.lgBusy = !0),
                clearTimeout(this.hideBarTimeout),
                this.arrowDisable(e),
                s || (e < r ? (s = "prev") : e > r && (s = "next")),
                t)
              ) {
                this.outer
                  .find(".lg-item")
                  .removeClass("lg-prev-slide lg-current lg-next-slide");
                var m = void 0,
                  f = void 0;
                a > 2
                  ? ((m = e - 1),
                    (f = e + 1),
                    ((0 === e && r === a - 1) || (e === a - 1 && 0 === r)) &&
                      ((f = 0), (m = a - 1)))
                  : ((m = 0), (f = 1)),
                  "prev" === s
                    ? this.getSlideItem(f).addClass("lg-next-slide")
                    : this.getSlideItem(m).addClass("lg-prev-slide"),
                  o.addClass("lg-current");
              } else this.makeSlideAnimation(s, o, l);
              this.lGalleryOn
                ? setTimeout(function () {
                    n.loadContent(e, !0),
                      ".lg-item" !== n.settings.appendSubHtmlTo && n.addHtml(e);
                  }, this.settings.speed +
                    50 +
                    (t ? 0 : this.settings.slideDelay))
                : this.loadContent(e, !0),
                setTimeout(function () {
                  (n.lgBusy = !1),
                    l.removeClass("lg-slide-progress"),
                    n.LGel.trigger(_e, {
                      prevIndex: r,
                      index: e,
                      fromTouch: t,
                      fromThumb: i,
                    });
                }, (this.lGalleryOn ? this.settings.speed + 100 : 100) +
                  (t ? 0 : this.settings.slideDelay));
            }
            this.index = e;
          }
        }),
        (e.prototype.updateCurrentCounter = function (e) {
          this.getElementById("lg-counter-current").html(e + 1 + "");
        }),
        (e.prototype.updateCounterTotal = function () {
          this.getElementById("lg-counter-all").html(
            this.galleryItems.length + ""
          );
        }),
        (e.prototype.getSlideType = function (e) {
          return e.__slideVideoInfo ? "video" : e.iframe ? "iframe" : "image";
        }),
        (e.prototype.touchMove = function (e, t, i) {
          var s = t.pageX - e.pageX,
            n = t.pageY - e.pageY,
            r = !1;
          if (
            (this.swipeDirection
              ? (r = !0)
              : Math.abs(s) > 15
              ? ((this.swipeDirection = "horizontal"), (r = !0))
              : Math.abs(n) > 15 &&
                ((this.swipeDirection = "vertical"), (r = !0)),
            r)
          ) {
            var a = this.getSlideItem(this.index);
            if ("horizontal" === this.swipeDirection) {
              null == i || i.preventDefault(),
                this.outer.addClass("lg-dragging"),
                this.setTranslate(a, s, 0);
              var o = a.get().offsetWidth,
                l = (15 * o) / 100 - Math.abs((10 * s) / 100);
              this.setTranslate(
                this.outer.find(".lg-prev-slide").first(),
                -o + s - l,
                0
              ),
                this.setTranslate(
                  this.outer.find(".lg-next-slide").first(),
                  o + s + l,
                  0
                );
            } else if (
              "vertical" === this.swipeDirection &&
              this.settings.swipeToClose
            ) {
              null == i || i.preventDefault(),
                this.$container.addClass("lg-dragging-vertical");
              var d = 1 - Math.abs(n) / window.innerHeight;
              this.$backdrop.css("opacity", d);
              var c = 1 - Math.abs(n) / (2 * window.innerWidth);
              this.setTranslate(a, 0, n, c, c),
                Math.abs(n) > 100 &&
                  this.outer
                    .addClass("lg-hide-items")
                    .removeClass("lg-components-open");
            }
          }
        }),
        (e.prototype.touchEnd = function (e, t, i) {
          var s,
            n = this;
          "lg-slide" !== this.settings.mode && this.outer.addClass("lg-slide"),
            setTimeout(function () {
              n.$container.removeClass("lg-dragging-vertical"),
                n.outer
                  .removeClass("lg-dragging lg-hide-items")
                  .addClass("lg-components-open");
              var r = !0;
              if ("horizontal" === n.swipeDirection) {
                s = e.pageX - t.pageX;
                var a = Math.abs(e.pageX - t.pageX);
                s < 0 && a > n.settings.swipeThreshold
                  ? (n.goToNextSlide(!0), (r = !1))
                  : s > 0 &&
                    a > n.settings.swipeThreshold &&
                    (n.goToPrevSlide(!0), (r = !1));
              } else if ("vertical" === n.swipeDirection) {
                if (
                  ((s = Math.abs(e.pageY - t.pageY)),
                  n.settings.closable && n.settings.swipeToClose && s > 100)
                )
                  return void n.closeGallery();
                n.$backdrop.css("opacity", 1);
              }
              if (
                (n.outer.find(".lg-item").removeAttr("style"),
                r && Math.abs(e.pageX - t.pageX) < 5)
              ) {
                var o = qe(i.target);
                n.isPosterElement(o) && n.LGel.trigger(Oe);
              }
              n.swipeDirection = void 0;
            }),
            setTimeout(function () {
              n.outer.hasClass("lg-dragging") ||
                "lg-slide" === n.settings.mode ||
                n.outer.removeClass("lg-slide");
            }, this.settings.speed + 100);
        }),
        (e.prototype.enableSwipe = function () {
          var e = this,
            t = {},
            i = {},
            s = !1,
            n = !1;
          this.settings.enableSwipe &&
            (this.$inner.on("touchstart.lg", function (i) {
              e.dragOrSwipeEnabled = !0;
              var s = e.getSlideItem(e.index);
              (!qe(i.target).hasClass("lg-item") &&
                !s.get().contains(i.target)) ||
                e.outer.hasClass("lg-zoomed") ||
                e.lgBusy ||
                1 !== i.touches.length ||
                ((n = !0),
                (e.touchAction = "swipe"),
                e.manageSwipeClass(),
                (t = { pageX: i.touches[0].pageX, pageY: i.touches[0].pageY }));
            }),
            this.$inner.on("touchmove.lg", function (r) {
              n &&
                "swipe" === e.touchAction &&
                1 === r.touches.length &&
                ((i = { pageX: r.touches[0].pageX, pageY: r.touches[0].pageY }),
                e.touchMove(t, i, r),
                (s = !0));
            }),
            this.$inner.on("touchend.lg", function (r) {
              if ("swipe" === e.touchAction) {
                if (s) (s = !1), e.touchEnd(i, t, r);
                else if (n) {
                  var a = qe(r.target);
                  e.isPosterElement(a) && e.LGel.trigger(Oe);
                }
                (e.touchAction = void 0), (n = !1);
              }
            }));
        }),
        (e.prototype.enableDrag = function () {
          var e = this,
            t = {},
            i = {},
            s = !1,
            n = !1;
          this.settings.enableDrag &&
            (this.outer.on("mousedown.lg", function (i) {
              e.dragOrSwipeEnabled = !0;
              var n = e.getSlideItem(e.index);
              (qe(i.target).hasClass("lg-item") ||
                n.get().contains(i.target)) &&
                (e.outer.hasClass("lg-zoomed") ||
                  e.lgBusy ||
                  (i.preventDefault(),
                  e.lgBusy ||
                    (e.manageSwipeClass(),
                    (t = { pageX: i.pageX, pageY: i.pageY }),
                    (s = !0),
                    (e.outer.get().scrollLeft += 1),
                    (e.outer.get().scrollLeft -= 1),
                    e.outer.removeClass("lg-grab").addClass("lg-grabbing"),
                    e.LGel.trigger(Pe))));
            }),
            qe(window).on("mousemove.lg.global" + this.lgId, function (r) {
              s &&
                e.lgOpened &&
                ((n = !0),
                (i = { pageX: r.pageX, pageY: r.pageY }),
                e.touchMove(t, i),
                e.LGel.trigger(ke));
            }),
            qe(window).on("mouseup.lg.global" + this.lgId, function (r) {
              if (e.lgOpened) {
                var a = qe(r.target);
                n
                  ? ((n = !1), e.touchEnd(i, t, r), e.LGel.trigger(ze))
                  : e.isPosterElement(a) && e.LGel.trigger(Oe),
                  s &&
                    ((s = !1),
                    e.outer.removeClass("lg-grabbing").addClass("lg-grab"));
              }
            }));
        }),
        (e.prototype.triggerPosterClick = function () {
          var e = this;
          this.$inner.on("click.lg", function (t) {
            !e.dragOrSwipeEnabled &&
              e.isPosterElement(qe(t.target)) &&
              e.LGel.trigger(Oe);
          });
        }),
        (e.prototype.manageSwipeClass = function () {
          var e = this.index + 1,
            t = this.index - 1;
          this.settings.loop &&
            this.galleryItems.length > 2 &&
            (0 === this.index
              ? (t = this.galleryItems.length - 1)
              : this.index === this.galleryItems.length - 1 && (e = 0)),
            this.outer
              .find(".lg-item")
              .removeClass("lg-next-slide lg-prev-slide"),
            t > -1 && this.getSlideItem(t).addClass("lg-prev-slide"),
            this.getSlideItem(e).addClass("lg-next-slide");
        }),
        (e.prototype.goToNextSlide = function (e) {
          var t = this,
            i = this.settings.loop;
          e && this.galleryItems.length < 3 && (i = !1),
            this.lgBusy ||
              (this.index + 1 < this.galleryItems.length
                ? (this.index++,
                  this.LGel.trigger(De, { index: this.index }),
                  this.slide(this.index, !!e, !1, "next"))
                : i
                ? ((this.index = 0),
                  this.LGel.trigger(De, { index: this.index }),
                  this.slide(this.index, !!e, !1, "next"))
                : this.settings.slideEndAnimation &&
                  !e &&
                  (this.outer.addClass("lg-right-end"),
                  setTimeout(function () {
                    t.outer.removeClass("lg-right-end");
                  }, 400)));
        }),
        (e.prototype.goToPrevSlide = function (e) {
          var t = this,
            i = this.settings.loop;
          e && this.galleryItems.length < 3 && (i = !1),
            this.lgBusy ||
              (this.index > 0
                ? (this.index--,
                  this.LGel.trigger(Be, { index: this.index, fromTouch: e }),
                  this.slide(this.index, !!e, !1, "prev"))
                : i
                ? ((this.index = this.galleryItems.length - 1),
                  this.LGel.trigger(Be, { index: this.index, fromTouch: e }),
                  this.slide(this.index, !!e, !1, "prev"))
                : this.settings.slideEndAnimation &&
                  !e &&
                  (this.outer.addClass("lg-left-end"),
                  setTimeout(function () {
                    t.outer.removeClass("lg-left-end");
                  }, 400)));
        }),
        (e.prototype.keyPress = function () {
          var e = this;
          qe(window).on("keydown.lg.global" + this.lgId, function (t) {
            e.lgOpened &&
              !0 === e.settings.escKey &&
              27 === t.keyCode &&
              (t.preventDefault(),
              e.settings.allowMediaOverlap &&
              e.outer.hasClass("lg-can-toggle") &&
              e.outer.hasClass("lg-components-open")
                ? e.outer.removeClass("lg-components-open")
                : e.closeGallery()),
              e.lgOpened &&
                e.galleryItems.length > 1 &&
                (37 === t.keyCode && (t.preventDefault(), e.goToPrevSlide()),
                39 === t.keyCode && (t.preventDefault(), e.goToNextSlide()));
          });
        }),
        (e.prototype.arrow = function () {
          var e = this;
          this.getElementById("lg-prev").on("click.lg", function () {
            e.goToPrevSlide();
          }),
            this.getElementById("lg-next").on("click.lg", function () {
              e.goToNextSlide();
            });
        }),
        (e.prototype.arrowDisable = function (e) {
          if (!this.settings.loop && this.settings.hideControlOnEnd) {
            var t = this.getElementById("lg-prev"),
              i = this.getElementById("lg-next");
            e + 1 === this.galleryItems.length
              ? i.attr("disabled", "disabled").addClass("disabled")
              : i.removeAttr("disabled").removeClass("disabled"),
              0 === e
                ? t.attr("disabled", "disabled").addClass("disabled")
                : t.removeAttr("disabled").removeClass("disabled");
          }
        }),
        (e.prototype.setTranslate = function (e, t, i, s, n) {
          void 0 === s && (s = 1),
            void 0 === n && (n = 1),
            e.css(
              "transform",
              "translate3d(" +
                t +
                "px, " +
                i +
                "px, 0px) scale3d(" +
                s +
                ", " +
                n +
                ", 1)"
            );
        }),
        (e.prototype.mousewheel = function () {
          var e = this,
            t = 0;
          this.outer.on("wheel.lg", function (i) {
            if (i.deltaY && !(e.galleryItems.length < 2)) {
              i.preventDefault();
              var s = new Date().getTime();
              s - t < 1e3 ||
                ((t = s),
                i.deltaY > 0
                  ? e.goToNextSlide()
                  : i.deltaY < 0 && e.goToPrevSlide());
            }
          });
        }),
        (e.prototype.isSlideElement = function (e) {
          return (
            e.hasClass("lg-outer") ||
            e.hasClass("lg-item") ||
            e.hasClass("lg-img-wrap")
          );
        }),
        (e.prototype.isPosterElement = function (e) {
          var t = this.getSlideItem(this.index)
            .find(".lg-video-play-button")
            .get();
          return (
            e.hasClass("lg-video-poster") ||
            e.hasClass("lg-video-play-button") ||
            (t && t.contains(e.get()))
          );
        }),
        (e.prototype.toggleMaximize = function () {
          var e = this;
          this.getElementById("lg-maximize").on("click.lg", function () {
            e.$container.toggleClass("lg-inline"), e.refreshOnResize();
          });
        }),
        (e.prototype.invalidateItems = function () {
          for (var e = 0; e < this.items.length; e++) {
            var t = qe(this.items[e]);
            t.off("click.lgcustom-item-" + t.attr("data-lg-id"));
          }
        }),
        (e.prototype.trapFocus = function () {
          var e = this;
          this.$container.get().focus({ preventScroll: !0 }),
            qe(window).on("keydown.lg.global" + this.lgId, function (t) {
              if (e.lgOpened && ("Tab" === t.key || 9 === t.keyCode)) {
                var i = Qe(e.$container.get()),
                  s = i[0],
                  n = i[i.length - 1];
                t.shiftKey
                  ? document.activeElement === s &&
                    (n.focus(), t.preventDefault())
                  : document.activeElement === n &&
                    (s.focus(), t.preventDefault());
              }
            });
        }),
        (e.prototype.manageCloseGallery = function () {
          var e = this;
          if (this.settings.closable) {
            var t = !1;
            this.getElementById("lg-close").on("click.lg", function () {
              e.closeGallery();
            }),
              this.settings.closeOnTap &&
                (this.outer.on("mousedown.lg", function (i) {
                  var s = qe(i.target);
                  t = !!e.isSlideElement(s);
                }),
                this.outer.on("mousemove.lg", function () {
                  t = !1;
                }),
                this.outer.on("mouseup.lg", function (i) {
                  var s = qe(i.target);
                  e.isSlideElement(s) &&
                    t &&
                    (e.outer.hasClass("lg-dragging") || e.closeGallery());
                }));
          }
        }),
        (e.prototype.closeGallery = function (e) {
          var t = this;
          if (!this.lgOpened || (!this.settings.closable && !e)) return 0;
          this.LGel.trigger(Ge),
            this.settings.resetScrollPosition &&
              !this.settings.hideScrollbar &&
              qe(window).scrollTop(this.prevScrollTop);
          var i,
            s = this.items[this.index];
          if (this.zoomFromOrigin && s) {
            var n = this.mediaContainerPosition,
              r = n.top,
              a = n.bottom,
              o = this.galleryItems[this.index],
              l = o.__slideVideoInfo,
              d = o.poster,
              c = je(
                s,
                this.outer,
                r + a,
                l && d && this.settings.videoMaxSize
              );
            i = We(s, this.outer, r, a, c);
          }
          this.zoomFromOrigin && i
            ? (this.outer.addClass("lg-closing lg-zoom-from-image"),
              this.getSlideItem(this.index)
                .addClass("lg-start-end-progress")
                .css(
                  "transition-duration",
                  this.settings.startAnimationDuration + "ms"
                )
                .css("transform", i))
            : (this.outer.addClass("lg-hide-items"),
              this.outer.removeClass("lg-zoom-from-image")),
            this.destroyModules(),
            (this.lGalleryOn = !1),
            (this.isDummyImageRemoved = !1),
            (this.zoomFromOrigin = this.settings.zoomFromOrigin),
            clearTimeout(this.hideBarTimeout),
            (this.hideBarTimeout = !1),
            qe("html").removeClass("lg-on"),
            this.outer.removeClass("lg-visible lg-components-open"),
            this.$backdrop.removeClass("in").css("opacity", 0);
          var p =
            this.zoomFromOrigin && i
              ? Math.max(
                  this.settings.startAnimationDuration,
                  this.settings.backdropDuration
                )
              : this.settings.backdropDuration;
          return (
            this.$container.removeClass("lg-show-in"),
            setTimeout(function () {
              t.zoomFromOrigin &&
                i &&
                t.outer.removeClass("lg-zoom-from-image"),
                t.$container.removeClass("lg-show"),
                t.resetScrollBar(),
                t.$backdrop
                  .removeAttr("style")
                  .css(
                    "transition-duration",
                    t.settings.backdropDuration + "ms"
                  ),
                t.outer.removeClass("lg-closing " + t.settings.startClass),
                t.getSlideItem(t.index).removeClass("lg-start-end-progress"),
                t.$inner.empty(),
                t.lgOpened && t.LGel.trigger($e, { instance: t }),
                t.$container.get() && t.$container.get().blur(),
                (t.lgOpened = !1);
            }, p + 100),
            p + 100
          );
        }),
        (e.prototype.initModules = function () {
          this.plugins.forEach(function (e) {
            try {
              e.init();
            } catch (e) {
              console.warn(
                "lightGallery:- make sure lightGallery module is properly initiated"
              );
            }
          });
        }),
        (e.prototype.destroyModules = function (e) {
          this.plugins.forEach(function (t) {
            try {
              e ? t.destroy() : t.closeGallery && t.closeGallery();
            } catch (e) {
              console.warn(
                "lightGallery:- make sure lightGallery module is properly destroyed"
              );
            }
          });
        }),
        (e.prototype.refresh = function (e) {
          this.settings.dynamic || this.invalidateItems(),
            (this.galleryItems = e || this.getItems()),
            this.updateControls(),
            this.openGalleryOnItemClick(),
            this.LGel.trigger(Ee);
        }),
        (e.prototype.updateControls = function () {
          this.addSlideVideoInfo(this.galleryItems),
            this.updateCounterTotal(),
            this.manageSingleSlideClassName();
        }),
        (e.prototype.destroyGallery = function () {
          this.destroyModules(!0),
            this.settings.dynamic || this.invalidateItems(),
            qe(window).off(".lg.global" + this.lgId),
            this.LGel.off(".lg"),
            this.$container.remove();
        }),
        (e.prototype.destroy = function () {
          var e = this.closeGallery(!0);
          return (
            e
              ? setTimeout(this.destroyGallery.bind(this), e)
              : this.destroyGallery(),
            e
          );
        }),
        e
      );
    })();
  const st = function (e, t) {
      return new it(e, t);
    },
    nt = document.querySelectorAll("[data-gallery]");
  nt.length &&
    nt.forEach((e) => {
      st(e, { licenseKey: "7EC452A9-0CFD441C-BD984C7C-17C8456E", speed: 500 });
    }),
    (window.onload = function () {
      function e(e, t, i = !0) {
        const s = document.querySelector(".cart-header"),
          n = s.querySelector(".cart-header__icon"),
          r = n.querySelector("span"),
          a = document.querySelector(`[data-cart-pid="${t}"]`),
          o = document.querySelector(".cart-list");
        if (i) {
          if (
            (r
              ? (r.innerHTML = ++r.innerHTML)
              : n.insertAdjacentHTML("beforeend", "<span>1</span>"),
            a)
          ) {
            const e = a.querySelector(".cart-list__quantity span");
            e.innerHTML = ++e.innerHTML;
          } else {
            const e = document.querySelector(`[data-pid="${t}"]`),
              i = `\n            <a href="" class="cart-list__image-ibg">${
                e.querySelector(".item-product__image-ibg").innerHTML
              }</a>\n            <div class="cart-list__body">\n                <a href="" class="cart-list__title">${
                e.querySelector(".item-product__title").innerHTML
              }</a>\n                <div class="cart-list__quantity">Quantity: <span>1</span></div>\n                <button type="button" class="cart-list__delete">Delete</button>\n            </div>`;
            o.insertAdjacentHTML(
              "beforeend",
              `<li data-cart-pid="${t}" class="cart-list__item">${i}</li>`
            );
          }
          e.classList.remove("_hold");
        } else {
          const e = a.querySelector(".cart-list__quantity span");
          (e.innerHTML = --e.innerHTML), parseInt(e.innerHTML) || a.remove();
          const t = --r.innerHTML;
          t ? (r.innerHTML = t) : (r.remove(), s.classList.remove("_active"));
        }
      }
      document.addEventListener("click", function (t) {
        const s = t.target;
        if (
          window.innerWidth > 768 &&
          i.any() &&
          (s.classList.contains("menu__arrow") &&
            s.closest(".menu__item").classList.toggle("_hover"),
          !s.closest(".menu__item") &&
            document.querySelectorAll(".menu__item._hover").length > 0)
        )
          for (
            var n = 0;
            n < document.querySelectorAll(".menu__item._hover").length;
            n++
          )
            document
              .querySelectorAll(".menu__item._hover")
              [n].classList.remove("_hover");
        s.classList.contains("search-form__icon")
          ? document.querySelector(".search-form").classList.toggle("_active")
          : !s.closest(".search-form") &&
            document.querySelector(".search-form._active") &&
            document.querySelector(".search-form").classList.remove("_active");
        if (s.classList.contains("actions-product__btn")) {
          const t = s.closest(".item-product").dataset.pid;
          !(function (t, i) {
            if (!t.classList.contains("_hold")) {
              t.classList.add("_hold"), t.classList.add("_fly");
              const s = document.querySelector(".cart-header__icon"),
                n = document
                  .querySelector(`[data-pid="${i}"]`)
                  .querySelector(".item-product__image-ibg"),
                r = n.cloneNode(!0),
                a = n.offsetWidth,
                o = n.offsetHeight,
                l = n.getBoundingClientRect().top,
                d = n.getBoundingClientRect().left;
              r.setAttribute("class", "_flyimage"),
                (r.style.cssText = `\n            left: ${d}px;\n            top: ${l}px;\n            width: ${a}px;\n            height: ${o}px;\n        `),
                document.body.append(r);
              const c = s.getBoundingClientRect().left,
                p = s.getBoundingClientRect().top;
              (r.style.cssText = `\n            left: ${c}px;\n            top: ${p}px;\n            width: 0px;\n            height: 0px;\n            opacity:0; \n        `),
                r.addEventListener("transitionend", function () {
                  t.classList.contains("_fly") &&
                    (r.remove(), e(t, i), t.classList.remove("_fly"));
                });
            }
          })(s, t);
        }
        s.classList.contains("cart-header__icon") ||
        s.closest(".cart-header__icon")
          ? document.querySelector(".cart-list").children.length > 0 &&
            document.querySelector(".cart-header").classList.toggle("_active")
          : s.closest(".cart-header") ||
            s.classList.contains("actions-product__btn") ||
            document.querySelector(".cart-header").classList.remove("_active");
        if (s.classList.contains("cart-list__delete")) {
          const t = s.closest(".cart-list__item").dataset.cartPid;
          e(s, t, !1);
        }
      });
      const t = document.querySelector(".products__more"),
        s = Array.from(document.querySelectorAll(".item-product"));
      function n() {
        t.addEventListener("click", () => {
          s.forEach((e) => e.classList.remove("hidden")),
            t.classList.add("hidden");
        });
      }
      function r() {
        window.innerWidth > 1282 &&
          (t.classList.add("hidden"),
          s.forEach((e, i) => {
            e.classList.add("hidden"),
              i <= 3
                ? e.classList.remove("hidden")
                : i > 3 && t.classList.remove("hidden"),
              n();
          }));
      }
      function a() {
        window.innerWidth <= 1282 &&
          window.innerWidth > 948 &&
          (t.classList.add("hidden"),
          s.forEach((e, i) => {
            e.classList.add("hidden"),
              i <= 2
                ? e.classList.remove("hidden")
                : i > 2 && t.classList.remove("hidden"),
              n();
          }));
      }
      function o() {
        window.innerWidth <= 948 &&
          window.innerWidth > 631 &&
          (t.classList.add("hidden"),
          s.forEach((e, i) => {
            e.classList.add("hidden"),
              i <= 3
                ? e.classList.remove("hidden")
                : i > 3 && t.classList.remove("hidden"),
              n();
          }));
      }
      function l() {
        window.innerWidth <= 631 &&
          (t.classList.add("hidden"),
          s.forEach((e, i) => {
            e.classList.add("hidden"),
              i <= 2
                ? e.classList.remove("hidden")
                : i > 2 && t.classList.remove("hidden"),
              n();
          }));
      }
      window.addEventListener("resize", (e) => {
        e.target.window.innerWidth > 1282 && r(),
          e.target.window.innerWidth <= 1282 &&
            e.target.window.innerWidth > 948 &&
            a(),
          e.target.window.innerWidth <= 948 &&
            e.target.window.innerWidth > 631 &&
            o(),
          e.target.window.innerWidth <= 631 && l();
      }),
        r(),
        a(),
        o(),
        l();
      const d = document.querySelector(".furniture__body");
      if (d && !i.any()) {
        const c = document.querySelector(".furniture__items"),
          p = document.querySelectorAll(".furniture__column"),
          u = d.dataset.speed;
        let h = 0,
          g = 0;
        function m() {
          let e = 0;
          p.forEach((t) => {
            e += t.offsetWidth;
          });
          const t = e - d.offsetWidth,
            i = Math.floor(g - h);
          h += i * u;
          let s = (t / 200) * h;
          (c.style.cssText = `transform: translate3d(${-s}px,0,0);`),
            Math.abs(i) > 0
              ? requestAnimationFrame(m)
              : d.classList.remove("_init");
        }
        d.addEventListener("mousemove", function (e) {
          const t = d.offsetWidth,
            i = e.pageX - t / 2;
          (g = (i / t) * 200),
            d.classList.contains("_init") ||
              (requestAnimationFrame(m), d.classList.add("_init"));
        });
      }
    }),
    (window.FLS = !0),
    (function (e) {
      let t = new Image();
      (t.onload = t.onerror =
        function () {
          e(2 == t.height);
        }),
        (t.src =
          "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA");
    })(function (e) {
      let t = !0 === e ? "webp" : "no-webp";
      document.documentElement.classList.add(t);
    }),
    i.any() && document.documentElement.classList.add("touch"),
    (function () {
      let e = document.querySelector(".icon-menu");
      e &&
        e.addEventListener("click", function (e) {
          a && (o(), document.documentElement.classList.toggle("menu-open"));
        });
    })(),
    (function () {
      const e = document.querySelectorAll("[data-spollers]");
      if (e.length > 0) {
        const t = Array.from(e).filter(function (e, t, i) {
          return !e.dataset.spollers.split(",")[0];
        });
        t.length && n(t);
        let i = p(e, "spollers");
        function n(e, t = !1) {
          e.forEach((e) => {
            (e = t ? e.item : e),
              t.matches || !t
                ? (e.classList.add("_spoller-init"),
                  a(e),
                  e.addEventListener("click", o))
                : (e.classList.remove("_spoller-init"),
                  a(e, !1),
                  e.removeEventListener("click", o));
          });
        }
        function a(e, t = !0) {
          const i = e.querySelectorAll("[data-spoller]");
          i.length > 0 &&
            i.forEach((e) => {
              t
                ? (e.removeAttribute("tabindex"),
                  e.classList.contains("_spoller-active") ||
                    (e.nextElementSibling.hidden = !0))
                : (e.setAttribute("tabindex", "-1"),
                  (e.nextElementSibling.hidden = !1));
            });
        }
        function o(e) {
          const t = e.target;
          if (t.closest("[data-spoller]")) {
            const i = t.closest("[data-spoller]"),
              s = i.closest("[data-spollers]"),
              n = !!s.hasAttribute("data-one-spoller");
            s.querySelectorAll("._slide").length ||
              (n && !i.classList.contains("_spoller-active") && l(s),
              i.classList.toggle("_spoller-active"),
              r(i.nextElementSibling, 500)),
              e.preventDefault();
          }
        }
        function l(e) {
          const t = e.querySelector("[data-spoller]._spoller-active");
          t &&
            (t.classList.remove("_spoller-active"),
            s(t.nextElementSibling, 500));
        }
        i &&
          i.length &&
          i.forEach((e) => {
            e.matchMedia.addEventListener("change", function () {
              n(e.itemsArray, e.matchMedia);
            }),
              n(e.itemsArray, e.matchMedia);
          });
      }
    })(),
    new t({}),
    (function () {
      const e = document.querySelectorAll(
        "input[placeholder],textarea[placeholder]"
      );
      e.length &&
        e.forEach((e) => {
          e.dataset.placeholder = e.placeholder;
        }),
        document.body.addEventListener("focusin", function (e) {
          const t = e.target;
          ("INPUT" !== t.tagName && "TEXTAREA" !== t.tagName) ||
            (t.dataset.placeholder && (t.placeholder = ""),
            t.classList.add("_form-focus"),
            t.parentElement.classList.add("_form-focus"),
            g.removeError(t));
        }),
        document.body.addEventListener("focusout", function (e) {
          const t = e.target;
          ("INPUT" !== t.tagName && "TEXTAREA" !== t.tagName) ||
            (t.dataset.placeholder && (t.placeholder = t.dataset.placeholder),
            t.classList.remove("_form-focus"),
            t.parentElement.classList.remove("_form-focus"),
            t.hasAttribute("data-validate") && g.validateInput(t));
        });
    })(),
    (function (e) {
      const t = document.forms;
      if (t.length)
        for (const e of t)
          e.addEventListener("submit", function (e) {
            i(e.target, e);
          }),
            e.addEventListener("reset", function (e) {
              const t = e.target;
              g.formClean(t);
            });
      async function i(t, i) {
        if (0 === (e ? g.getErrors(t) : 0)) {
          if (t.hasAttribute("data-ajax")) {
            i.preventDefault();
            const e = t.getAttribute("action")
                ? t.getAttribute("action").trim()
                : "#",
              n = t.getAttribute("method")
                ? t.getAttribute("method").trim()
                : "GET",
              r = new FormData(t);
            t.classList.add("_sending");
            const a = await fetch(e, { method: n, body: r });
            if (a.ok) {
              await a.json();
              t.classList.remove("_sending"), s(t);
            } else alert("Ошибка"), t.classList.remove("_sending");
          } else t.hasAttribute("data-dev") && (i.preventDefault(), s(t));
        } else {
          i.preventDefault();
          const e = t.querySelector("._form-error");
          e && t.hasAttribute("data-goto-error") && u(e, !0, 1e3);
        }
      }
      function s(e) {
        document.dispatchEvent(
          new CustomEvent("formSent", { detail: { form: e } })
        ),
          g.formClean(e),
          c(`[Формы]: ${"Форма отправлена!"}`);
      }
    })(!0),
    (function () {
      ye = !0;
      const e = document.querySelector("header.header"),
        t = e.hasAttribute("data-scroll-show"),
        i = e.dataset.scrollShow ? e.dataset.scrollShow : 500,
        s = e.dataset.scroll ? e.dataset.scroll : 1;
      let n,
        r = 0;
      document.addEventListener("windowScroll", function (a) {
        const o = window.scrollY;
        clearTimeout(n),
          o >= s
            ? (!e.classList.contains("_header-scroll") &&
                e.classList.add("_header-scroll"),
              t &&
                (o > r
                  ? e.classList.contains("_header-show") &&
                    e.classList.remove("_header-show")
                  : !e.classList.contains("_header-show") &&
                    e.classList.add("_header-show"),
                (n = setTimeout(() => {
                  !e.classList.contains("_header-show") &&
                    e.classList.add("_header-show");
                }, i))))
            : (e.classList.contains("_header-scroll") &&
                e.classList.remove("_header-scroll"),
              t &&
                e.classList.contains("_header-show") &&
                e.classList.remove("_header-show")),
          (r = o <= 0 ? 0 : o);
      });
    })();
})();
