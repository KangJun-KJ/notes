"use strict";

webpackJsonp([1], [function (t, e, n) {
  "use strict";
  function a(t) {
    return t && t.__esModule ? t : { default: t };
  }Object.defineProperty(e, "__esModule", { value: !0 }), e.i18n = e.lan = e.getParam = e.eachLines = e.transform = e.maxPoint = e.lastRecord = e.StorageKey = e.clearPoints = e.blankMatrix = e.blankLine = e.fillLine = e.delays = e.speeds = e.blockType = e.origin = e.blockShape = void 0;var i = n(14),
      r = a(i),
      s = n(146),
      o = a(s),
      u = e.blockShape = { I: [[1, 1, 1, 1]], L: [[0, 0, 1], [1, 1, 1]], J: [[1, 0, 0], [1, 1, 1]], Z: [[1, 1, 0], [0, 1, 1]], S: [[0, 1, 1], [1, 1, 0]], O: [[1, 1], [1, 1]], T: [[0, 1, 0], [1, 1, 1]] },
      c = (e.origin = { I: [[-1, 1], [1, -1]], L: [[0, 0]], J: [[0, 0]], Z: [[0, 0]], S: [[0, 0]], O: [[0, 0]], T: [[0, 0], [1, 0], [-1, 1], [0, -1]] }, e.blockType = (0, r.default)(u), e.speeds = [800, 650, 500, 370, 250, 160], e.delays = [50, 60, 70, 80, 90, 100], e.fillLine = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1], e.blankLine = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
      l = (e.blankMatrix = function () {
    for (var t = [], e = 0; e < 20; e++) t.push(c);return t;
  }(), e.clearPoints = [100, 300, 700, 1500], e.StorageKey = "VUE_TETRIS"),
      f = (e.lastRecord = function () {
    var t = window.localStorage.getItem(l);if (!t) return !1;try {
      window.btoa && (t = atob(t)), t = decodeURIComponent(t), t = JSON.parse(t);
    } catch (t) {
      return (window.console || window.console.error) && window.console.error("读取记录错误:", t), !1;
    }return t;
  }(), e.maxPoint = 999999, e.transform = function () {
    var t = ["transform", "webkitTransform", "msTransform", "mozTransform", "oTransform"],
        e = document.body;return t.filter(function (t) {
      return void 0 !== e.style[t];
    })[0];
  }(), e.eachLines = 20, e.getParam = function (t) {
    var e = new RegExp("\\?(?:.+&)?" + t + "=(.*?)(?:&.*)?$"),
        n = window.location.toString().match(e);return n ? decodeURI(n[1]) : "";
  }),
      d = e.lan = function () {
    var t = f("lan").toLowerCase();return !t && navigator.languages && (t = navigator.languages.find(function (t) {
      return -1 !== o.default.lan.indexOf(t);
    })), t = -1 === o.default.lan.indexOf(t) ? o.default.default : t;
  }();document.title = o.default.data.title[d];e.i18n = o.default.data;
}, function (t, e, n) {
  "use strict";
  Object.defineProperty(e, "__esModule", { value: !0 }), e.isFocus = e.visibilityChangeEvent = e.subscribeRecord = e.isOver = e.isClear = e.want = e.isMobile = e.getNextType = void 0;var a = n(68),
      i = function (t) {
    return t && t.__esModule ? t : { default: t };
  }(a),
      r = n(0),
      s = n(6),
      o = function () {
    var t = ["hidden", "webkitHidden", "mozHidden", "msHidden"];return t = t.filter(function (t) {
      return t in document;
    }), t.length > 0 && t[0];
  }(),
      u = { getNextType: function () {
      var t = r.blockType.length;return r.blockType[Math.floor(Math.random() * t)];
    }, want: function (t, e) {
      e = (0, s.fromJS)(e);var n = t.xy,
          a = (0, s.fromJS)(t.shape),
          i = a.get(0).size;return a.every(function (t, a) {
        return t.every(function (t, r) {
          return !(n[1] < 0) && !(n[1] + i > 10) && (n[0] + a < 0 || !(n[0] + a >= 20) && (!t || !e.get(n[0] + a).get(n[1] + r)));
        });
      });
    }, isClear: function (t) {
      var e = [];return t.forEach(function (t, n) {
        t.every(function (t) {
          return !!t;
        }) && e.push(n);
      }), 0 !== e.length && e;
    }, isOver: function (t) {
      return s.List.isList(t) && (t = t.toJS()), t[0].some(function (t) {
        return !!t;
      });
    }, subscribeRecord: function (t) {
      t.subscribe(function () {
        var e = t.state;e.lock || (e = (0, i.default)(e), e = encodeURIComponent(e), window.btoa && (e = btoa(e)), window.localStorage.setItem(r.StorageKey, e));
      });
    }, isMobile: function () {
      var t = navigator.userAgent,
          e = /Android (\d+\.\d+)/.test(t),
          n = t.indexOf("iPhone") > -1,
          a = t.indexOf("iPod") > -1,
          i = t.indexOf("iPad") > -1,
          r = t.indexOf("NokiaN") > -1;return e || n || a || i || r;
    }, visibilityChangeEvent: function () {
      return !!o && o.replace(/hidden/i, "visibilitychange");
    }(), isFocus: function () {
      return !o || !document[o];
    } },
      c = u.getNextType,
      l = u.isMobile,
      f = u.want,
      d = u.isClear,
      v = u.isOver,
      m = u.subscribeRecord,
      p = u.visibilityChangeEvent,
      _ = u.isFocus;e.getNextType = c, e.isMobile = l, e.want = f, e.isClear = d, e.isOver = v, e.subscribeRecord = m, e.visibilityChangeEvent = p, e.isFocus = _;
},, function (t, e, n) {
  "use strict";
  Object.defineProperty(e, "__esModule", { value: !0 });var a = n(9),
      i = function (t) {
    return t && t.__esModule ? t : { default: t };
  }(a),
      r = n(1),
      s = n(0),
      o = n(7),
      u = n(6),
      c = u.fromJS,
      l = u.List,
      f = function (t) {
    for (var e = function (t, e) {
      for (var n = parseInt((e - t + 1) * Math.random() + t, 10), a = [], i = 0; i < n; i++) a.push(1);for (var r = 0, s = 10 - n; r < s; r++) {
        var o = parseInt((a.length + 1) * Math.random(), 10);a.splice(o, 0, 0);
      }return l(a);
    }, n = l([]), a = 0; a < t; a++) n = a <= 2 ? n.push(e(5, 8)) : a <= 6 ? n.push(e(4, 9)) : n.push(e(3, 9));for (var i = 0, r = 20 - t; i < r; i++) n = n.unshift(l(s.blankLine));return n.toJS();
  },
      d = { fallInterval: null, start: function () {
      o.music.start && o.music.start();var t = i.default.state;d.dispatchPoints(0), i.default.commit("speedRun", t.speedStart);var e = t.startLines,
          n = f(e);i.default.commit("matrix", n), i.default.commit("moveBlock", { type: t.next }), i.default.commit("nextBlock", ""), d.auto();
    }, auto: function (t) {
      var e = t < 0 ? 0 : t,
          n = i.default.state,
          a = n.cur,
          o = function t() {
        n = i.default.state, a = n.cur;var e = a.fall();if ((0, r.want)(e, n.matrix)) i.default.commit("moveBlock", e), d.fallInterval = setTimeout(t, s.speeds[n.speedRun - 1]);else {
          var o = c(n.matrix),
              u = a && a.shape,
              l = c(a && a.xy);u.forEach(function (t, e) {
            return t.forEach(function (t, n) {
              if (t && l.get(0) + e >= 0) {
                var a = o.get(l.get(0) + e);a = a.set(l.get(1) + n, 1), o = o.set(l.get(0) + e, a);
              }
            });
          }), d.nextAround(o);
        }
      };clearTimeout(d.fallInterval), d.fallInterval = setTimeout(o, void 0 === e ? s.speeds[n.speedRun - 1] : e);
    }, nextAround: function (t, e) {
      clearTimeout(d.fallInterval), i.default.commit("lock", !0), i.default.commit("matrix", t), "function" == typeof e && e();var n = i.default.state.points + 10 + 2 * (i.default.state.speedRun - 1);return d.dispatchPoints(n), (0, r.isClear)(t) ? void (o.music.clear && o.music.clear()) : (0, r.isOver)(t) ? (o.music.gameover && o.music.gameover(), void d.overStart()) : void setTimeout(function () {
        i.default.commit("lock", !1), i.default.commit("moveBlock", { type: i.default.state.next }), i.default.commit("nextBlock", ""), d.auto();
      }, 100);
    }, focus: function (t) {
      if (i.default.commit("focus", t), !t) return void clearTimeout(d.fallInterval);var e = i.default.state;!e.cur || e.reset || e.pause || d.auto();
    }, pause: function (t) {
      if (i.default.commit("pause", t), t) return void clearTimeout(d.fallInterval);d.auto();
    }, clearLines: function (t, e) {
      var n = i.default.state,
          a = c(t);e.forEach(function (t) {
        a = a.splice(t, 1), a = a.unshift(l(s.blankLine));
      }), i.default.commit("matrix", a.toJS()), i.default.commit("moveBlock", { type: n.next }), i.default.commit("nextBlock", ""), d.auto(), i.default.commit("lock", !1);var r = n.clearLines + e.length;i.default.commit("clearLines", r);var o = i.default.state.points + s.clearPoints[e.length - 1];d.dispatchPoints(o);var u = Math.floor(r / s.eachLines),
          f = n.speedStart + u;f = f > 6 ? 6 : f, i.default.commit("speedRun", f);
    }, overStart: function () {
      clearTimeout(d.fallInterval), i.default.commit("lock", !0), i.default.commit("reset", !0), i.default.commit("pause", !1);
    }, overEnd: function () {
      i.default.commit("matrix", s.blankMatrix), i.default.commit("moveBlock", { reset: !0 }), i.default.commit("reset", !1), i.default.commit("lock", !1), i.default.commit("clearLines", 0);
    }, dispatchPoints: function (t) {
      i.default.commit("points", t), t > 0 && t > i.default.state.max && i.default.commit("max", t);
    } };e.default = d;
}, function (t, e, n) {
  "use strict";
  Object.defineProperty(e, "__esModule", { value: !0 });var a = n(14),
      i = function (t) {
    return t && t.__esModule ? t : { default: t };
  }(a),
      r = {},
      s = function (t) {
    if ((0, i.default)(r).forEach(function (t) {
      clearTimeout(r[t]), r[t] = null;
    }), t.callback) {
      var e = function () {
        clearTimeout(r[t.key]);
      };if (t.callback(e), !0 !== t.once) {
        var n = t.begin || 100,
            a = t.interval || 50;!function i() {
          r[t.key] = setTimeout(function () {
            n = null, i(), t.callback(e);
          }, n || a);
        }();
      }
    }
  },
      o = function (t) {
    clearTimeout(r[t.key]), r[t.key] = null, t.callback && t.callback();
  },
      u = function () {
    (0, i.default)(r).forEach(function (t) {
      clearTimeout(r[t]), r[t] = null;
    });
  };e.default = { down: s, up: o, clearAll: u };
},,, function (t, e, n) {
  "use strict";
  Object.defineProperty(e, "__esModule", { value: !0 }), e.music = e.hasWebAudioAPI = void 0;var a = n(9),
      i = function (t) {
    return t && t.__esModule ? t : { default: t };
  }(a),
      r = window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.oAudioContext || window.msAudioContext,
      s = e.hasWebAudioAPI = { data: !!r && -1 !== location.protocol.indexOf("http") },
      o = e.music = {};!function () {
    if (s.data) {
      var t = "./static/music.mp3",
          e = new r(),
          n = new XMLHttpRequest();n.open("GET", t, !0), n.responseType = "arraybuffer", n.onload = function () {
        e.decodeAudioData(n.response, function (t) {
          var n = function () {
            var n = e.createBufferSource();return n.buffer = t, n.connect(e.destination), n;
          };o.killStart = function () {
            o.start = function () {};
          }, o.start = function () {
            o.killStart(), i.default.state.music && n().start(0, 3.7202, 3.6224);
          }, o.clear = function () {
            i.default.state.music && n().start(0, 0, .7675);
          }, o.fall = function () {
            i.default.state.music && n().start(0, 1.2558, .3546);
          }, o.gameover = function () {
            i.default.state.music && n().start(0, 8.1276, 1.1437);
          }, o.rotate = function () {
            i.default.state.music && n().start(0, 2.2471, .0807);
          }, o.move = function () {
            i.default.state.music && n().start(0, 2.9088, .1437);
          };
        }, function (e) {
          window.console && window.console.error && (window.console.error("音频: " + t + " 读取错误", e), s.data = !1);
        });
      }, n.send();
    }
  }();
},, function (t, e, n) {
  "use strict";
  function a(t) {
    return t && t.__esModule ? t : { default: t };
  }Object.defineProperty(e, "__esModule", { value: !0 });var i = n(28),
      r = a(i),
      s = n(42),
      o = a(s),
      u = n(1),
      c = n(66),
      l = a(c),
      f = n(1),
      d = n(0),
      v = n(30),
      m = a(v),
      p = n(7),
      _ = n(6);_.fromJS, _.List;r.default.use(o.default);var h = d.lastRecord && !isNaN(parseInt(d.lastRecord.clearLines, 10)) ? parseInt(d.lastRecord.clearLines, 10) : 0;h < 0 && (h = 0);var b = function () {
    if (!d.lastRecord || !d.lastRecord.cur) return null;var t = d.lastRecord.cur,
        e = { type: t.type, rotateIndex: t.rotateIndex, shape: t.shape, xy: t.xy };return new m.default(e);
  }(),
      y = !(!d.lastRecord || void 0 === d.lastRecord.drop) && !!d.lastRecord.drop,
      x = !(!d.lastRecord || void 0 === d.lastRecord.lock) && !!d.lastRecord.lock,
      g = d.lastRecord && Array.isArray(d.lastRecord.matrix) ? d.lastRecord.matrix : d.blankMatrix,
      k = d.lastRecord && !isNaN(parseInt(d.lastRecord.max, 10)) ? parseInt(d.lastRecord.max, 10) : 0;k < 0 ? k = 0 : k > d.maxPoint && (k = d.maxPoint);var C = !d.lastRecord || void 0 === d.lastRecord.music || !!d.lastRecord.music;p.hasWebAudioAPI.data || (C = !1);var w = d.lastRecord && -1 !== d.blockType.indexOf(d.lastRecord.next) ? d.lastRecord.next : (0, u.getNextType)(),
      R = !(!d.lastRecord || void 0 === d.lastRecord.pause) && !!d.lastRecord.pause,
      S = d.lastRecord && !isNaN(parseInt(d.lastRecord.points, 10)) ? parseInt(d.lastRecord.points, 10) : 0;S < 0 ? S = 0 : S > d.maxPoint && (S = d.maxPoint);var M = d.lastRecord && !isNaN(parseInt(d.lastRecord.speedRun, 10)) ? parseInt(d.lastRecord.speedRun, 10) : 1;(M < 1 || M > 6) && (M = 1);var L = d.lastRecord && !isNaN(parseInt(d.lastRecord.speedStart, 10)) ? parseInt(d.lastRecord.speedStart, 10) : 1;(L < 1 || L > 6) && (L = 1);var T = d.lastRecord && !isNaN(parseInt(d.lastRecord.startLines, 10)) ? parseInt(d.lastRecord.startLines, 10) : 0;(T < 0 || T > 10) && (T = 0);var I = !(!d.lastRecord || !d.lastRecord.reset) && !!d.lastRecord.reset,
      P = { music: C, pause: R, matrix: g, next: w, cur: b, speedStart: L, speedRun: M, startLines: T, clearLines: h, points: S, max: k, reset: I, drop: y, keyboard: { drop: !1, down: !1, left: !1, right: !1, rotate: !1, reset: !1, music: !1, pause: !1 }, lock: x, focus: (0, f.isFocus)() };e.default = new o.default.Store({ state: P, mutations: l.default });
},,,,,,,,,,,,,,,,,,,, function (t, e, n) {
  "use strict";
  function a(t) {
    return t && t.__esModule ? t : { default: t };
  }Object.defineProperty(e, "__esModule", { value: !0 });var i = n(58),
      r = a(i),
      s = n(61),
      o = a(s),
      u = n(57),
      c = a(u),
      l = n(62),
      f = a(l),
      d = n(64),
      v = a(d),
      m = n(63),
      p = a(m),
      _ = n(60),
      h = a(_),
      b = n(59),
      y = a(b);e.default = { left: r.default, down: c.default, rotate: f.default, right: o.default, space: v.default, r: h.default, p: y.default, s: p.default };
}, function (t, e, n) {
  "use strict";
  function a(t) {
    return t && t.__esModule ? t : { default: t };
  }Object.defineProperty(e, "__esModule", { value: !0 });var i = n(71),
      r = a(i),
      s = n(72),
      o = a(s),
      u = n(6),
      c = n(0),
      l = function () {
    function t(e) {
      if ((0, r.default)(this, t), this.type = e.type, e.rotateIndex ? this.rotateIndex = e.rotateIndex : this.rotateIndex = 0, e.timeStamp ? this.timeStamp = e.timeStamp : this.timeStamp = Date.now(), e.shape ? this.shape = e.shape : this.shape = c.blockShape[e.type], e.xy) this.xy = e.xy;else switch (e.type) {case "I":
          this.xy = [0, 3];break;case "L":case "J":case "Z":case "S":case "O":case "T":
          this.xy = [-1, 4];}
    }return (0, o.default)(t, [{ key: "rotate", value: function () {
        var t = (0, u.fromJS)(this.shape),
            e = (0, u.List)([]);t.forEach(function (t) {
          return t.forEach(function (n, a) {
            var i = t.size - a - 1;void 0 === e.get(i) && (e = e.set(i, (0, u.List)([])));var r = e.get(i).push(n);e = e.set(i, r);
          });
        });var n = [this.xy[0] + c.origin[this.type][this.rotateIndex][0], this.xy[1] + c.origin[this.type][this.rotateIndex][1]],
            a = this.rotateIndex + 1 >= c.origin[this.type].length ? 0 : this.rotateIndex + 1;return { shape: e.toJS(), type: this.type, xy: n, rotateIndex: a, timeStamp: this.timeStamp };
      } }, { key: "fall", value: function () {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1;return { shape: this.shape, type: this.type, xy: [this.xy[0] + t, this.xy[1]], rotateIndex: this.rotateIndex, timeStamp: Date.now() };
      } }, { key: "right", value: function () {
        return { shape: this.shape, type: this.type, xy: [this.xy[0], this.xy[1] + 1], rotateIndex: this.rotateIndex, timeStamp: this.timeStamp };
      } }, { key: "left", value: function () {
        return { shape: this.shape, type: this.type, xy: [this.xy[0], this.xy[1] - 1], rotateIndex: this.rotateIndex, timeStamp: this.timeStamp };
      } }]), t;
  }();e.default = l;
},,,,,,,,,,, function (t, e, n) {
  function a(t) {
    n(119);
  }var i = n(2)(n(54), n(143), a, null, null);t.exports = i.exports;
},, function (t, e, n) {
  "use strict";
  function a(t) {
    return t && t.__esModule ? t : { default: t };
  }var i = n(14),
      r = a(i),
      s = n(9),
      o = a(s),
      u = n(29),
      c = a(u),
      l = { 37: "left", 38: "rotate", 39: "right", 40: "down", 32: "space", 83: "s", 82: "r", 80: "p" },
      f = void 0,
      d = (0, r.default)(l).map(function (t) {
    return parseInt(t, 10);
  }),
      v = function (t) {
    if (!0 !== t.metaKey && -1 !== d.indexOf(t.keyCode)) {
      var e = l[t.keyCode];e !== f && (f = e, c.default[e].down(o.default));
    }
  },
      m = function (t) {
    if (!0 !== t.metaKey && -1 !== d.indexOf(t.keyCode)) {
      var e = l[t.keyCode];e === f && (f = ""), c.default[e].up(o.default);
    }
  };document.addEventListener("keydown", v, !0), document.addEventListener("keyup", m, !0);
}, function (t, e, n) {
  function a(t) {
    n(113);
  }var i = n(2)(n(45), n(137), a, null, null);t.exports = i.exports;
}, function (t, e, n) {
  "use strict";
  function a(t) {
    return t && t.__esModule ? t : { default: t };
  }Object.defineProperty(e, "__esModule", { value: !0 });var i = n(73),
      r = a(i),
      s = n(124),
      o = a(s),
      u = n(125),
      c = a(u),
      l = n(131),
      f = a(l),
      d = n(130),
      v = a(d),
      m = n(132),
      p = a(m),
      _ = n(41),
      h = a(_),
      b = n(133),
      y = a(b),
      x = n(127),
      g = a(x),
      k = n(128),
      C = a(k),
      w = (n(6), n(129)),
      R = a(w),
      S = n(42),
      M = n(0),
      L = n(1),
      T = n(3),
      I = a(T);e.default = { mounted: function () {
      this.render(), window.addEventListener("resize", this.resize.bind(this), !0);
    }, data: function () {
      return { size: {}, w: document.documentElement.clientWidth, h: document.documentElement.clientHeight, filling: "" };
    }, components: { Decorate: o.default, Guide: c.default, Next: f.default, Music: v.default, Pause: p.default, Number: h.default, Point: y.default, Logo: C.default, Keyboard: g.default, Matrix: R.default }, computed: (0, r.default)({ pContent: function () {
        return this.cur ? M.i18n.cleans[M.lan] : M.i18n.startLine[M.lan];
      }, level: function () {
        return M.i18n.level[M.lan];
      }, nextText: function () {
        return M.i18n.next[M.lan];
      } }, (0, S.mapState)(["matrix", "keyboard", "music", "pause", "next", "cur", "speedStart", "speedRun", "startLines", "clearLines", "points", "max", "reset", "drop"])), methods: { render: function () {
        var t = this,
            e = 0,
            n = function () {
          var n = t.w,
              a = t.h,
              i = a / n,
              r = void 0,
              s = {};return i < 1.5 ? r = a / 960 : (r = n / 640, e = (a - 960 * r) / r / 3, s = { "padding-top": Math.floor(e) + 42 + "px", "padding-bottom": Math.floor(e) + "px", "margin-top": Math.floor(-480 - 1.5 * e) + "px" }), s[M.transform] = "scale(" + r + ")", s;
        }();this.size = n, this.start(), this.filling = e;
      }, resize: function () {
        this.w = document.documentElement.clientWidth, this.h = document.documentElement.clientHeight, this.render();
      }, start: function () {
        if (L.visibilityChangeEvent && document.addEventListener(L.visibilityChangeEvent, function () {
          I.default.focus((0, L.isFocus)());
        }, !1), M.lastRecord) {
          if (M.lastRecord.cur && !M.lastRecord.pause) {
            var t = this.$store.state.speedRun,
                e = M.speeds[t - 1] / 2;e = t < M.speeds[M.speeds.length - 1] ? M.speeds[M.speeds.length - 1] : t, I.default.auto(e);
          }M.lastRecord.cur || I.default.overStart();
        } else I.default.overStart();
      } } };
}, function (t, e, n) {
  "use strict";
  Object.defineProperty(e, "__esModule", { value: !0 });var a = n(0);e.default = { name: "Decorate", computed: { title: function () {
        return a.i18n.title[a.lan];
      }, github: function () {
        return a.i18n.github[a.lan];
      }, QRTitle: function () {
        return a.i18n.QRNotice[a.lan];
      }, QRCode: function () {
        return a.i18n.QRCode[a.lan];
      } } };
}, function (t, e, n) {
  "use strict";
  Object.defineProperty(e, "__esModule", { value: !0 });var a = n(0),
      i = n(1);e.default = { name: "Guide", data: function () {
      return { isMobile: (0, i.isMobile)() };
    }, computed: { linkTitle: function () {
        return a.i18n.linkTitle[a.lan];
      }, github: function () {
        return a.i18n.github[a.lan];
      }, QRCode: function () {
        return a.i18n.QRCode[a.lan];
      }, QRTitle: function () {
        return a.i18n.QRNotice[a.lan];
      }, QRSrc: function () {
        return window.location.protocol + "//binaryify.github.io/vue-tetris/static/qr.jpeg";
      } }, mounted: function () {
      window.addEventListener("resize", this.resize.bind(this), !0);
    }, methods: { resize: function () {
        this.isMobile = (0, i.isMobile)();
      } } };
}, function (t, e, n) {
  "use strict";
  Object.defineProperty(e, "__esModule", { value: !0 });n(0);e.default = { props: ["active", "color", "size", "top", "left", "label", "position", "arrow"] };
}, function (t, e, n) {
  "use strict";
  function a(t) {
    return t && t.__esModule ? t : { default: t };
  }Object.defineProperty(e, "__esModule", { value: !0 });var i = n(14),
      r = a(i),
      s = n(126),
      o = a(s),
      u = n(0),
      c = n(9),
      l = a(c),
      f = n(29),
      d = a(f);e.default = { props: ["filling"], data: function () {
      return { fillingNum: 0 };
    }, watch: { $props: { deep: !0, handler: function (t) {
          this.fillingNum = t.filling + 20;
        } } }, computed: { keyboard: function () {
        return this.$store.state.keyboard;
      }, rotation: function () {
        return u.i18n.rotation[u.lan];
      }, labelLeft: function () {
        return u.i18n.left[u.lan];
      }, labelRight: function () {
        return u.i18n.right[u.lan];
      }, labelDown: function () {
        return u.i18n.down[u.lan];
      }, labelDropSpace: function () {
        return u.i18n.drop[u.lan] + " (SPACE)";
      }, labelResetR: function () {
        return u.i18n.reset[u.lan] + "(R)";
      }, labelSoundS: function () {
        return u.i18n.sound[u.lan] + "(S)";
      }, labelPauseP: function () {
        return u.i18n.pause[u.lan] + "(P)";
      } }, mounted: function () {
      var t = this,
          e = {},
          n = {};document.addEventListener("touchstart", function (t) {
        t.preventDefault && t.preventDefault();
      }, !0), document.addEventListener("mousedown", function (t) {
        t.preventDefault && t.preventDefault();
      }, !0), (0, r.default)(d.default).forEach(function (a) {
        t.$refs["dom_" + a].$el.addEventListener("mousedown", function () {
          !0 !== e[a] && (d.default[a].down(l.default), n[a] = !0);
        }, !0), t.$refs["dom_" + a].$el.addEventListener("mouseup", function () {
          if (!0 === e[a]) return void (e[a] = !1);d.default[a].up(l.default), n[a] = !1;
        }, !0), t.$refs["dom_" + a].$el.addEventListener("mouseout", function () {
          !0 === n[a] && d.default[a].up(l.default);
        }, !0), t.$refs["dom_" + a].$el.addEventListener("touchstart", function () {
          e[a] = !0, d.default[a].down(l.default);
        }, !0), t.$refs["dom_" + a].$el.addEventListener("touchend", function () {
          d.default[a].up(l.default);
        }, !0);
      });
    }, components: { Vbutton: o.default } };
}, function (t, e, n) {
  "use strict";
  Object.defineProperty(e, "__esModule", { value: !0 });var a = n(0),
      i = { timeout: null };e.default = { props: ["cur", "reset"], data: function () {
      return { style: "r1", display: "none" };
    }, watch: { $props: { deep: !0, handler: function (t, e) {
          this.animate(t), (-1 !== [e.cur, t.cur].indexOf(!1) && e.cur !== t.cur || e.reset !== t.reset) && this.animate(t);
        } } }, computed: { titleCenter: function () {
        return a.i18n.titleCenter[a.lan];
      } }, beforeMount: function () {
      this.animate(this.$props);
    }, methods: { animate: function (t) {
        var e = this,
            n = t.cur,
            a = t.reset;if (clearTimeout(i.timeout), this.style = "r1", this.display = "none", n || a) return void (this.display = "none");var r = "r",
            s = 0,
            o = function (t, e) {
          t && (i.timeout = setTimeout(t, e));
        },
            u = function (t) {
          o(function () {
            e.display = "block", t && t();
          }, 150);
        },
            c = function (t) {
          o(function () {
            e.display = "none", t && t();
          }, 150);
        },
            l = function (t, n, a) {
          o(function () {
            e.style = r + 2, o(function () {
              e.style = r + 1, t && t();
            }, a);
          }, n);
        },
            f = function t(n) {
          o(function () {
            e.style = r + 4, o(function () {
              if (e.style = r + 3, s++, 10 !== s && 20 !== s && 30 !== s || (r = "r" === r ? "l" : "r"), s < 40) return void t(n);e.style = r + 1, n && o(n, 4e3);
            }, 100);
          }, 100);
        },
            d = function t() {
          s = 0, l(function () {
            l(function () {
              l(function () {
                e.style = r + 2, f(t);
              }, 150, 150);
            }, 150, 150);
          }, 1e3, 1500);
        };u(function () {
          c(function () {
            u(function () {
              c(function () {
                u(function () {
                  d();
                });
              });
            });
          });
        });
      } } };
}, function (t, e, n) {
  "use strict";
  Object.defineProperty(e, "__esModule", { value: !0 });var a = n(6),
      i = n(1),
      r = n(0),
      s = n(3),
      o = function (t) {
    return t && t.__esModule ? t : { default: t };
  }(s),
      u = setTimeout;e.default = { props: ["cur", "reset", "propMatrix"], watch: { $props: { handler: function () {
          var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};arguments[1];this.propsChange(t);
        }, deep: !0 } }, render: function () {
      var t = arguments[0],
          e = void 0;return e = this.isOver ? this.overState : this.getResult(), e = e.toJS(), t("div", { class: "matrix" }, [e.map(function (e, n) {
        return t("p", null, [e.map(function (e, n) {
          return t("b", { class: (1 === e ? "c" : "") + (2 === e ? "d" : "") });
        })]);
      })]);
    }, data: function () {
      return { clearLines: !1, animateColor: 2, isOver: !1, overState: null };
    }, methods: { propsChange: function (t) {
        var e = this,
            n = (0, i.isClear)(t.propMatrix),
            a = t.reset;setTimeout(function () {
          e.clearLines = n, e.isOver = a;
        }, 0), n && !this.clearLines && this.clearAnimate(n), n || !a || this.isOver || this.over(t);
      }, getResult: function (t) {
        t || (t = this.$props);var e = t.cur,
            n = e && e.shape,
            i = (0, a.fromJS)(e && e.xy),
            r = (0, a.fromJS)(t.propMatrix),
            s = this.clearLines;if (s) {
          var o = this.animateColor;s.forEach(function (t) {
            r = r.set(t, (0, a.List)([o, o, o, o, o, o, o, o, o, o]));
          });
        } else n && n.forEach(function (t, e) {
          return t.forEach(function (t, n) {
            if (t && i.get(0) + e >= 0) {
              var a = r.get(i.get(0) + e),
                  o = void 0;o = 1 !== a.get(i.get(1) + n) || s ? 1 : 2, a = a.set(i.get(1) + n, o), r = r.set(i.get(0) + e, a);
            }
          });
        });return r;
      }, clearAnimate: function () {
        var t = this,
            e = function (e) {
          u(function () {
            t.animateColor = 0, u(function () {
              t.animateColor = 2, "function" == typeof e && e();
            }, 100);
          }, 100);
        };e(function () {
          e(function () {
            e(function () {
              u(function () {
                o.default.clearLines(t.propMatrix, t.clearLines);
              }, 100);
            });
          });
        });
      }, over: function (t) {
        var e = this,
            n = this.getResult(t);this.overState = n;for (var i = function (t) {
          if (t <= 19) n = n.set(19 - t, (0, a.List)(r.fillLine));else {
            if (!(t >= 20 && t <= 39)) return void o.default.overEnd();n = n.set(t - 20, (0, a.List)(r.blankLine));
          }e.overState = n;
        }, s = 0; s <= 40; s++) u(i.bind(null, s), 40 * (s + 1));
      } } };
}, function (t, e, n) {
  "use strict";
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = { props: ["data"] };
}, function (t, e, n) {
  "use strict";
  Object.defineProperty(e, "__esModule", { value: !0 });var a = n(74),
      i = function (t) {
    return t && t.__esModule ? t : { default: t };
  }(a),
      r = n(0),
      s = { I: [1, 0], L: [0, 0], J: [0, 0], Z: [0, 0], S: [0, 0], O: [0, 1], T: [0, 0] },
      o = [[0, 0, 0, 0], [0, 0, 0, 0]];e.default = { props: ["data"], mounted: function () {
      this.build(this.data);
    }, data: function () {
      return { block: o };
    }, watch: { $props: { deep: !0, handler: function (t) {
          this.build(t.data);
        } } }, methods: { build: function (t) {
        var e = r.blockShape[t],
            n = o.map(function (t) {
          return [].concat((0, i.default)(t));
        });e.forEach(function (e, a) {
          e.forEach(function (e, i) {
            e && (n[a + s[t][0]][i + s[t][1]] = 1);
          });
        }), this.block = n;
      } } };
}, function (t, e, n) {
  "use strict";
  Object.defineProperty(e, "__esModule", { value: !0 });var a = function (t) {
    return t < 10 ? ("0" + t).split("") : ("" + t).split("");
  },
      i = { timeInterval: null, time_count: null };e.default = { watch: { $props: { deep: !0, handler: function (t) {
          this.render();
        } } }, props: { propTime: { type: Boolean }, number: { type: Number }, length: { type: Number, default: 6 } }, data: function () {
      return { time_count: "", time: new Date(), data: [] };
    }, destroyed: function () {
      this.propTime && clearTimeout(i.timeInterval);
    }, methods: { render: function () {
        if (this.propTime) {
          var t = this.time,
              e = a(t.getHours()),
              n = a(t.getMinutes()),
              i = t.getSeconds() % 2,
              r = e.concat(i ? "d" : "d_c", n);return void (this.data = r);
        }for (var s = ("" + this.number).split(""), o = 0, u = this.length - s.length; o < u; o++) s.unshift("n");this.data = s;
      } }, beforeMount: function () {
      var t = this;if (this.length || (this.length = 6), this.propTime) {
        !function e() {
          var n = +i.timeInterval;i.timeInterval = setTimeout(function () {
            t.time = new Date(), t.time_count = n, t.render(), e();
          }, 1e3);
        }();
      }
    }, mounted: function () {
      this.render();
    } };
}, function (t, e, n) {
  "use strict";
  Object.defineProperty(e, "__esModule", { value: !0 });var a = { timeout: null };e.default = { props: ["data"], mounted: function () {
      this.setShake(this.data);
    }, data: function () {
      return { showPause: !1 };
    }, watch: { $props: { deep: !0, handler: function (t) {
          this.setShake(t.data);
        } } }, methods: { setShake: function (t) {
        var e = this;t && !a.timeout && (a.timeout = setInterval(function () {
          e.showPause = !e.showPause;
        }, 250)), !t && a.timeout && (clearInterval(a.timeout), this.showPause = !1, a.timeout = null);
      } } };
}, function (t, e, n) {
  "use strict";
  Object.defineProperty(e, "__esModule", { value: !0 });var a = n(0),
      i = n(41),
      r = function (t) {
    return t && t.__esModule ? t : { default: t };
  }(i),
      s = a.i18n.point[a.lan],
      o = a.i18n.highestScore[a.lan],
      u = a.i18n.lastRound[a.lan],
      c = { timeout: null };e.default = { props: ["cur", "point", "max"], mounted: function () {
      this.onChange(this.$props);
    }, components: { Number: r.default }, data: function () {
      return { label: "", number: 0 };
    }, watch: { $props: { deep: !0, handler: function (t) {
          this.onChange(t);
        } } }, methods: { onChange: function (t) {
        var e = this,
            n = t.cur,
            a = t.point,
            i = t.max;if (clearInterval(c.timeout), n) this.label = a >= i ? o : s, this.number = a;else {
          0 !== a ? function t() {
            e.label = u, e.number = a, c.timeout = setTimeout(function () {
              e.label = o, e.number = i, c.timeout = setTimeout(t, 3e3);
            }, 3e3);
          }() : (this.label = o, this.number = i);
        }
      } } };
}, function (t, e, n) {
  "use strict";
  function a(t) {
    return t && t.__esModule ? t : { default: t };
  }Object.defineProperty(e, "__esModule", { value: !0 });var i = n(1),
      r = n(4),
      s = a(r),
      o = n(3),
      u = a(o),
      c = n(7),
      l = n(6),
      f = function (t) {
    t.commit("key_down", !0), null !== t.state.cur ? s.default.down({ key: "down", begin: 40, interval: 40, callback: function (e) {
        var n = t.state;if (!n.lock) {
          c.music.move && c.music.move();var a = n.cur;if (null !== a) {
            if (n.pause) return void u.default.pause(!1);var r = a.fall();if ((0, i.want)(r, n.matrix)) t.commit("moveBlock", r), u.default.auto();else {
              var s = (0, l.fromJS)(n.matrix),
                  o = a.shape,
                  f = (0, l.fromJS)(a.xy);o.forEach(function (t, e) {
                return t.forEach(function (t, n) {
                  if (t && f.get(0) + e >= 0) {
                    var a = s.get(f.get(0) + e);a = a.set(f.get(1) + n, 1), s = s.set(f.get(0) + e, a);
                  }
                });
              }), u.default.nextAround(s, e);
            }
          }
        }
      } }) : s.default.down({ key: "down", begin: 200, interval: 100, callback: function () {
        if (!t.state.lock) {
          var e = t.state;if (!e.cur) {
            c.music.move && c.music.move();var n = e.startLines;n = n - 1 < 0 ? 10 : n - 1, t.commit("startLines", n);
          }
        }
      } });
  },
      d = function (t) {
    t.commit("key_down", !1), s.default.up({ key: "down" });
  };e.default = { down: f, up: d };
}, function (t, e, n) {
  "use strict";
  function a(t) {
    return t && t.__esModule ? t : { default: t };
  }Object.defineProperty(e, "__esModule", { value: !0 });var i = n(1),
      r = n(4),
      s = a(r),
      o = n(3),
      u = a(o),
      c = n(0),
      l = n(7),
      f = function (t) {
    t.commit("key_left", !0), s.default.down({ key: "left", begin: 200, interval: 100, callback: function () {
        var e = t.state;if (!e.lock) {
          l.music.move && l.music.move();var n = e.cur;if (null !== n) {
            if (e.pause) return void u.default.pause(!1);var a = n.left(),
                r = c.delays[e.speedRun - 1],
                s = void 0;(0, i.want)(a, e.matrix) ? (a.timeStamp += parseInt(r, 10), t.commit("moveBlock", a), s = a.timeStamp) : (n.timeStamp += parseInt(parseInt(r, 10) / 1.5, 10), t.commit("moveBlock", n), s = n.timeStamp);var o = c.speeds[e.speedRun - 1] - (Date.now() - s);u.default.auto(o);
          } else {
            var f = e.speedStart;f = f - 1 < 1 ? 6 : f - 1, t.commit("speedStart", f);
          }
        }
      } });
  },
      d = function (t) {
    t.commit("key_left", !1), s.default.up({ key: "left" });
  };e.default = { down: f, up: d };
}, function (t, e, n) {
  "use strict";
  function a(t) {
    return t && t.__esModule ? t : { default: t };
  }Object.defineProperty(e, "__esModule", { value: !0 });var i = n(4),
      r = a(i),
      s = n(3),
      o = a(s),
      u = function (t) {
    t.commit("key_pause", !0), r.default.down({ key: "p", once: !0, callback: function () {
        var e = t.state;if (!e.lock) {
          var n = e.cur,
              a = e.pause;null !== n ? o.default.pause(!a) : o.default.start();
        }
      } });
  },
      c = function (t) {
    t.commit("key_pause", !1), r.default.up({ key: "p" });
  };e.default = { down: u, up: c };
}, function (t, e, n) {
  "use strict";
  function a(t) {
    return t && t.__esModule ? t : { default: t };
  }Object.defineProperty(e, "__esModule", { value: !0 });var i = n(4),
      r = a(i),
      s = n(3),
      o = a(s),
      u = function (t) {
    t.commit("key_reset", !0), t.state.lock || (null !== t.state.cur ? r.default.down({ key: "r", once: !0, callback: function () {
        o.default.overStart();
      } }) : r.default.down({ key: "r", once: !0, callback: function () {
        t.state.lock || o.default.start();
      } }));
  },
      c = function (t) {
    t.commit("key_reset", !1), r.default.up({ key: "r" });
  };e.default = { down: u, up: c };
}, function (t, e, n) {
  "use strict";
  function a(t) {
    return t && t.__esModule ? t : { default: t };
  }Object.defineProperty(e, "__esModule", { value: !0 });var i = n(1),
      r = n(4),
      s = a(r),
      o = n(3),
      u = a(o),
      c = n(0),
      l = n(7),
      f = function (t) {
    t.commit("key_right", !0), s.default.down({ key: "right", begin: 200, interval: 100, callback: function () {
        var e = t.state;if (!e.lock) {
          l.music.move && l.music.move();var n = e.cur;if (null !== n) {
            if (e.pause) return void u.default.pause(!1);var a = n.right(),
                r = c.delays[e.speedRun - 1],
                s = void 0;(0, i.want)(a, e.matrix) ? (a.timeStamp += parseInt(r, 10), t.commit("moveBlock", a), s = a.timeStamp) : (n.timeStamp += parseInt(parseInt(r, 10) / 1.5, 10), t.commit("moveBlock", n), s = n.timeStamp);var o = c.speeds[e.speedRun - 1] - (Date.now() - s);u.default.auto(o);
          } else {
            var f = e.speedStart;f = f + 1 > 6 ? 1 : f + 1, t.commit("speedStart", f);
          }
        }
      } });
  },
      d = function (t) {
    t.commit("key_right", !1), s.default.up({ key: "right" });
  };e.default = { down: f, up: d };
}, function (t, e, n) {
  "use strict";
  function a(t) {
    return t && t.__esModule ? t : { default: t };
  }Object.defineProperty(e, "__esModule", { value: !0 });var i = n(1),
      r = n(4),
      s = a(r),
      o = n(3),
      u = a(o),
      c = n(7),
      l = function (t) {
    t.commit("key_rotate", !0), null !== t.state.cur ? s.default.down({ key: "rotate", once: !0, callback: function () {
        var e = t.state;if (!e.lock) {
          e.pause && u.default.pause(!1);var n = e.cur;if (null !== n) {
            c.music.rotate && c.music.rotate();var a = n.rotate();(0, i.want)(a, e.matrix) && t.commit("moveBlock", a);
          }
        }
      } }) : s.default.down({ key: "rotate", begin: 200, interval: 100, callback: function () {
        if (!t.state.lock) {
          c.music.move && c.music.move();var e = t.state;if (!e.cur) {
            var n = e.startLines;n = n + 1 > 10 ? 0 : n + 1, t.commit("startLines", n);
          }
        }
      } });
  },
      f = function (t) {
    t.commit("key_rotate", !1), s.default.up({ key: "rotate" });
  };e.default = { down: l, up: f };
}, function (t, e, n) {
  "use strict";
  Object.defineProperty(e, "__esModule", { value: !0 });var a = n(4),
      i = function (t) {
    return t && t.__esModule ? t : { default: t };
  }(a),
      r = function (t) {
    t.commit("key_music", !0), t.state.lock || i.default.down({ key: "s", once: !0, callback: function () {
        t.state.lock || t.commit("music", !t.state.music);
      } });
  },
      s = function (t) {
    t.commit("key_music", !1), i.default.up({ key: "s" });
  };e.default = { down: r, up: s };
}, function (t, e, n) {
  "use strict";
  function a(t) {
    return t && t.__esModule ? t : { default: t };
  }Object.defineProperty(e, "__esModule", { value: !0 });var i = n(1),
      r = n(4),
      s = a(r),
      o = n(3),
      u = a(o),
      c = n(7),
      l = n(6),
      f = function (t) {
    t.commit("key_drop", !0), s.default.down({ key: "space", once: !0, callback: function () {
        var e = t.state;if (!e.lock) {
          var n = e.cur;if (null !== n) {
            if (e.pause) return void u.default.pause(!1);c.music.fall && c.music.fall();for (var a = 0, r = n.fall(a); (0, i.want)(r, e.matrix);) r = n.fall(a), a++;var s = (0, l.fromJS)(e.matrix);r = n.fall(a - 2), t.commit("moveBlock", r);var o = r.shape,
                f = r.xy;o.forEach(function (t, e) {
              return t.forEach(function (t, n) {
                if (t && f[0] + e >= 0) {
                  var a = s.get(f[0] + e);a = a.set(f[1] + n, 1), s = s.set(f[0] + e, a);
                }
              });
            }), t.commit("drop", !0), setTimeout(function () {
              t.commit("drop", !1);
            }, 100), u.default.nextAround(s);
          } else u.default.start();
        }
      } });
  },
      d = function (t) {
    t.commit("key_drop", !1), s.default.up({ key: "space" });
  };e.default = { down: f, up: d };
}, function (t, e, n) {
  "use strict";
  function a(t) {
    return t && t.__esModule ? t : { default: t };
  }var i = n(28),
      r = a(i),
      s = n(44),
      o = a(s),
      u = n(9),
      c = a(u);n(0), n(43), (0, n(1).subscribeRecord)(c.default), r.default.config.productionTip = !1, new r.default({ el: "#root", render: function (t) {
      return t(o.default);
    }, store: c.default });
}, function (t, e, n) {
  "use strict";
  Object.defineProperty(e, "__esModule", { value: !0 });var a = n(1),
      i = n(30),
      r = function (t) {
    return t && t.__esModule ? t : { default: t };
  }(i),
      s = { nextBlock: function (t, e) {
      e || (e = (0, a.getNextType)()), t.next = e;
    }, moveBlock: function (t, e) {
      t.cur = !0 === e.reset ? null : new r.default(e);
    }, speedStart: function (t, e) {
      t.speedStart = e;
    }, speedRun: function (t, e) {
      t.speedRun = e;
    }, startLines: function (t, e) {
      t.startLines = e;
    }, matrix: function (t, e) {
      t.matrix = e;
    }, lock: function (t, e) {
      t.lock = e;
    }, clearLines: function (t, e) {
      t.clearLines = e;
    }, points: function (t, e) {
      t.points = e;
    }, max: function (t, e) {
      t.max = e;
    }, reset: function (t, e) {
      t.reset = e;
    }, drop: function (t, e) {
      t.drop = e;
    }, pause: function (t, e) {
      t.pause = e;
    }, music: function (t, e) {
      t.music = e;
    }, focus: function (t, e) {
      t.focus = e;
    }, key_drop: function (t, e) {
      t.keyboard.drop = e;
    }, key_down: function (t, e) {
      t.keyboard.down = e;
    }, key_left: function (t, e) {
      t.keyboard.left = e;
    }, key_right: function (t, e) {
      t.keyboard.right = e;
    }, key_rotate: function (t, e) {
      t.keyboard.rotate = e;
    }, key_reset: function (t, e) {
      t.keyboard.reset = e;
    }, key_music: function (t, e) {
      t.keyboard.music = e;
    }, key_pause: function (t, e) {
      t.keyboard.pause = e;
    } };e.default = s;
},,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,, function (t, e) {}, function (t, e) {}, function (t, e) {}, function (t, e) {}, function (t, e) {}, function (t, e) {}, function (t, e) {}, function (t, e) {}, function (t, e) {}, function (t, e) {}, function (t, e) {},,,, function (t, e, n) {
  function a(t) {
    n(117);
  }var i = n(2)(n(46), n(141), a, null, null);t.exports = i.exports;
}, function (t, e, n) {
  function a(t) {
    n(112);
  }var i = n(2)(n(47), n(136), a, null, null);t.exports = i.exports;
}, function (t, e, n) {
  function a(t) {
    n(116);
  }var i = n(2)(n(48), n(139), a, null, null);t.exports = i.exports;
}, function (t, e, n) {
  function a(t) {
    n(120);
  }var i = n(2)(n(49), n(144), a, null, null);t.exports = i.exports;
}, function (t, e, n) {
  function a(t) {
    n(115);
  }var i = n(2)(n(50), n(138), a, null, null);t.exports = i.exports;
}, function (t, e, n) {
  function a(t) {
    n(114);
  }var i = n(2)(n(51), null, a, null, null);t.exports = i.exports;
}, function (t, e, n) {
  function a(t) {
    n(111);
  }var i = n(2)(n(52), n(135), a, null, null);t.exports = i.exports;
}, function (t, e, n) {
  function a(t) {
    n(118);
  }var i = n(2)(n(53), n(142), a, null, null);t.exports = i.exports;
}, function (t, e, n) {
  function a(t) {
    n(110);
  }var i = n(2)(n(55), n(134), a, null, null);t.exports = i.exports;
}, function (t, e, n) {
  var a = n(2)(n(56), n(140), null, null, null);t.exports = a.exports;
}, function (t, e) {
  t.exports = { render: function () {
      var t = this,
          e = t.$createElement;return (t._self._c || e)("div", { staticClass: "bg pause", class: { c: t.showPause } });
    }, staticRenderFns: [] };
}, function (t, e) {
  t.exports = { render: function () {
      var t = this,
          e = t.$createElement;return (t._self._c || e)("div", { staticClass: "bg music", class: t.data ? "" : "c" });
    }, staticRenderFns: [] };
}, function (t, e) {
  t.exports = { render: function () {
      var t = this,
          e = t.$createElement,
          n = t._self._c || e;return n("div", { directives: [{ name: "show", rawName: "v-show", value: !t.isMobile, expression: "!isMobile" }] }, [t._m(0), t._v(" "), n("div", { staticClass: "guide left" }, [n("p", [n("a", t._b({ attrs: { href: "https://github.com/Binaryify/vue-tetris", rel: "noopener noreferrer", target: "_blank" } }, "a", { title: t.linkTitle }, !1), [t._v(t._s(t.github) + ":")]), t._v(" "), n("br"), t._v(" "), n("iframe", { staticStyle: { transform: "scale(1.68)", "transform-origin": "center left" }, attrs: { src: "https://ghbtns.com/github-btn.html?user=Binaryify&repo=vue-tetris&type=star&count=true", frameBorder: "0", scrolling: "0", width: "170px", height: "20px" } }), t._v(" "), n("br"), t._v(" "), n("iframe", { staticStyle: { transform: "scale(1.68)", "transform-origin": "center left" }, attrs: { src: "https://ghbtns.com/github-btn.html?user=Binaryify&repo=vue-tetris&type=fork&count=true", frameBorder: "0", scrolling: "0", width: "170px", height: "20px" } })]), t._v(" "), n("div", { staticClass: "space" }, [t._v("SPACE")])]), t._v(" "), n("div", { staticClass: "guide qr" }, [n("img", t._b({ attrs: { src: t.QRSrc } }, "img", { title: t.QRTitle, alt: t.QRCode }, !1))])]);
    }, staticRenderFns: [function () {
      var t = this,
          e = t.$createElement,
          n = t._self._c || e;return n("div", { staticClass: "guide right" }, [n("div", { staticClass: "up" }, [n("em", { staticStyle: { transform: "translate(0,-3px) scale(1,2)" } })]), t._v(" "), n("div", { staticClass: "left" }, [n("em", { staticStyle: { transform: "translate(-7px,3px) rotate(-90deg) scale(1,2)" } })]), t._v(" "), n("div", { staticClass: "down" }, [n("em", { staticStyle: { transform: "translate(0,9px) rotate(180deg) scale(1,2)" } })]), t._v(" "), n("div", { staticClass: "right" }, [n("em", { staticStyle: { transform: "translate(7px,3px)rotate(90deg) scale(1,2)" } })])]);
    }] };
}, function (t, e) {
  t.exports = { render: function () {
      var t = this,
          e = t.$createElement,
          n = t._self._c || e;return n("div", { staticClass: "app", style: t.size }, [n("div", { staticClass: "rect", class: t.drop ? "drop" : "" }, [n("Decorate"), t._v(" "), n("div", { staticClass: "screen" }, [n("div", { staticClass: "panel" }, [n("Matrix", { attrs: { propMatrix: t.matrix, cur: t.cur, reset: t.reset } }), t._v(" "), n("Logo", { attrs: { cur: !!t.cur, reset: t.reset } }), t._v(" "), n("div", { staticClass: "state" }, [n("Point", { attrs: { cur: !!t.cur, max: t.max, point: t.points } }), t._v(" "), n("p", [t._v(t._s(t.pContent))]), t._v(" "), n("Number", { attrs: { number: t.cur ? t.clearLines : t.startLines } }), t._v(" "), n("p", [t._v(t._s(t.level))]), t._v(" "), n("Number", { attrs: { number: t.cur ? t.speedRun : t.speedStart, length: 1 } }), t._v(" "), n("p", [t._v(t._s(t.nextText))]), t._v(" "), n("Next", { attrs: { data: t.next } }), t._v(" "), n("div", { staticClass: "bottom" }, [n("Music", { attrs: { data: t.music } }), t._v(" "), n("Pause", { attrs: { data: t.pause } }), t._v(" "), n("Number", { attrs: { propTime: !0 } })], 1)], 1)], 1)])], 1), t._v(" "), n("Keyboard", { attrs: { filling: t.filling } }), t._v(" "), n("Guide")], 1);
    }, staticRenderFns: [] };
}, function (t, e) {
  t.exports = { render: function () {
      var t = this,
          e = t.$createElement,
          n = t._self._c || e;return n("div", { staticClass: "logo", style: "display:" + t.display }, [n("div", { staticClass: "bg dragon", class: t.style }), t._v(" "), n("p", { domProps: { innerHTML: t._s(t.titleCenter) } })]);
    }, staticRenderFns: [] };
}, function (t, e) {
  t.exports = { render: function () {
      var t = this,
          e = t.$createElement,
          n = t._self._c || e;return n("div", { staticClass: "button", class: t.color + " " + t.size, style: "top:" + t.top + "px;left:" + t.left + "px" }, [n("i", { class: { active: t.active } }), t._v(" "), n("em", { directives: [{ name: "show", rawName: "v-show", value: "s1" === t.size, expression: "size==='s1'" }], style: "transform:" + t.arrow + " scale(1,2)" }), t._v(" "), n("span", { class: t.position ? "position" : "" }, [t._v("\n    " + t._s(t.label) + "\n  ")])]);
    }, staticRenderFns: [] };
}, function (t, e) {
  t.exports = { render: function () {
      var t = this,
          e = t.$createElement,
          n = t._self._c || e;return n("div", [n("p", [t._v(t._s(t.label))]), t._v(" "), n("Number", { attrs: { number: t.number } })], 1);
    }, staticRenderFns: [] };
}, function (t, e) {
  t.exports = { render: function () {
      var t = this,
          e = t.$createElement,
          n = t._self._c || e;return n("div", { staticClass: "decorate" }, [t._m(0), t._v(" "), n("h1", [t._v(t._s(t.title))]), t._v(" "), t._m(1), t._v(" "), t._m(2)]);
    }, staticRenderFns: [function () {
      var t = this,
          e = t.$createElement,
          n = t._self._c || e;return n("div", { staticClass: "topBorder" }, [n("span", { staticClass: "l mr", staticStyle: { width: "40px" } }), t._v(" "), n("span", { staticClass: "l mr" }), t._v(" "), n("span", { staticClass: "l mr" }), t._v(" "), n("span", { staticClass: "l mr" }), t._v(" "), n("span", { staticClass: "l mr" }), t._v(" "), n("span", { staticClass: "r ml", staticStyle: { width: "40px" } }), t._v(" "), n("span", { staticClass: "r ml" }), t._v(" "), n("span", { staticClass: "r ml" }), t._v(" "), n("span", { staticClass: "r ml" }), t._v(" "), n("span", { staticClass: "r ml" })]);
    }, function () {
      var t = this,
          e = t.$createElement,
          n = t._self._c || e;return n("div", { staticClass: "view" }, [n("b", { staticClass: "c" }), t._v(" "), n("div", { staticClass: "clear" }), t._v(" "), n("b", { staticClass: "c" }), t._v(" "), n("b", { staticClass: "c" }), t._v(" "), n("div", { staticClass: "clear" }), t._v(" "), n("em"), t._v(" "), n("b", { staticClass: "c" }), t._v(" "), n("p"), t._v(" "), n("em"), t._v(" "), n("b", { staticClass: "c" }), t._v(" "), n("div", { staticClass: "clear" }), t._v(" "), n("b", { staticClass: "c" }), t._v(" "), n("b", { staticClass: "c" }), t._v(" "), n("div", { staticClass: "clear" }), t._v(" "), n("em"), t._v(" "), n("b", { staticClass: "c" }), t._v(" "), n("p"), t._v(" "), n("b", { staticClass: "c" }), t._v(" "), n("b", { staticClass: "c" }), t._v(" "), n("b", { staticClass: "c" }), t._v(" "), n("b", { staticClass: "c" }), t._v(" "), n("p"), t._v(" "), n("b", { staticClass: "c" }), t._v(" "), n("div", { staticClass: "clear" }), t._v(" "), n("b", { staticClass: "c" }), t._v(" "), n("b", { staticClass: "c" }), t._v(" "), n("div", { staticClass: "clear" }), t._v(" "), n("b", { staticClass: "c" }), t._v(" "), n("p"), t._v(" "), n("b", { staticClass: "c" }), t._v(" "), n("b", { staticClass: "c" }), t._v(" "), n("div", { staticClass: "clear" }), t._v(" "), n("b", { staticClass: "c" }), t._v(" "), n("div", { staticClass: "clear" }), t._v(" "), n("b", { staticClass: "c" }), t._v(" "), n("p"), t._v(" "), n("em"), t._v(" "), n("b", { staticClass: "c" }), t._v(" "), n("div", { staticClass: "clear" }), t._v(" "), n("em"), t._v(" "), n("b", { staticClass: "c" }), t._v(" "), n("div", { staticClass: "clear" }), t._v(" "), n("em"), t._v(" "), n("b", { staticClass: "c" }), t._v(" "), n("div", { staticClass: "clear" }), t._v(" "), n("em"), t._v(" "), n("b", { staticClass: "c" })]);
    }, function () {
      var t = this,
          e = t.$createElement,
          n = t._self._c || e;return n("div", { staticClass: "view l" }, [n("em"), t._v(" "), n("b", { staticClass: "c" }), t._v(" "), n("div", { staticClass: "clear" }), t._v(" "), n("b", { staticClass: "c" }), t._v(" "), n("b", { staticClass: "c" }), t._v(" "), n("div", { staticClass: "clear" }), t._v(" "), n("b", { staticClass: "c" }), t._v(" "), n("p"), t._v(" "), n("b", { staticClass: "c" }), t._v(" "), n("div", { staticClass: "clear" }), t._v(" "), n("b", { staticClass: "c" }), t._v(" "), n("b", { staticClass: "c" }), t._v(" "), n("div", { staticClass: "clear" }), t._v(" "), n("b", { staticClass: "c" }), t._v(" "), n("p"), t._v(" "), n("b", { staticClass: "c" }), t._v(" "), n("b", { staticClass: "c" }), t._v(" "), n("b", { staticClass: "c" }), t._v(" "), n("b", { staticClass: "c" }), t._v(" "), n("p"), t._v(" "), n("em"), t._v(" "), n("b", { staticClass: "c" }), t._v(" "), n("div", { staticClass: "clear" }), t._v(" "), n("b", { staticClass: "c" }), t._v(" "), n("b", { staticClass: "c" }), t._v(" "), n("div", { staticClass: "clear" }), t._v(" "), n("em"), t._v(" "), n("b", { staticClass: "c" }), t._v(" "), n("p"), t._v(" "), n("b", { staticClass: "c" }), t._v(" "), n("b", { staticClass: "c" }), t._v(" "), n("div", { staticClass: "clear" }), t._v(" "), n("em"), t._v(" "), n("b", { staticClass: "c" }), t._v(" "), n("div", { staticClass: "clear" }), t._v(" "), n("em"), t._v(" "), n("b", { staticClass: "c" }), t._v(" "), n("p"), t._v(" "), n("b", { staticClass: "c" }), t._v(" "), n("div", { staticClass: "clear" }), t._v(" "), n("b", { staticClass: "c" }), t._v(" "), n("div", { staticClass: "clear" }), t._v(" "), n("b", { staticClass: "c" }), t._v(" "), n("div", { staticClass: "clear" }), t._v(" "), n("b", { staticClass: "c" })]);
    }] };
}, function (t, e) {
  t.exports = { render: function () {
      var t = this,
          e = t.$createElement,
          n = t._self._c || e;return n("div", { staticClass: "next" }, t._l(t.block, function (e, a) {
        return n("div", t._l(e, function (t, e) {
          return n("b", { class: t ? "c" : "" });
        }));
      }));
    }, staticRenderFns: [] };
}, function (t, e) {
  t.exports = { render: function () {
      var t = this,
          e = t.$createElement,
          n = t._self._c || e;return n("div", { staticClass: "number" }, t._l(t.data, function (t, e) {
        return n("span", { class: "bg s_" + t });
      }));
    }, staticRenderFns: [] };
}, function (t, e) {
  t.exports = { render: function () {
      var t = this,
          e = t.$createElement,
          n = t._self._c || e;return n("div", { staticClass: "keyboard", style: "margin-top:" + t.fillingNum + "px" }, [n("vbutton", { ref: "dom_rotate", attrs: { color: "blue", size: "s1", top: 0, left: 374, label: t.rotation, arrow: "translate(0, 63px)", position: !0, active: t.keyboard.rotate } }), t._v(" "), n("vbutton", { ref: "dom_down", attrs: { color: "blue", size: "s1", top: 180, left: 374, label: t.labelDown, arrow: "translate(0,-71px) rotate(180deg)", active: t.keyboard.down } }), t._v(" "), n("vbutton", { ref: "dom_left", attrs: { color: "blue", size: "s1", top: 90, left: 284, label: t.labelLeft, arrow: "translate(60px, -12px) rotate(270deg)", active: t.keyboard.left } }), t._v(" "), n("vbutton", { ref: "dom_right", attrs: { color: "blue", size: "s1", top: 90, left: 464, label: t.labelRight, arrow: "translate(-60px, -12px) rotate(90deg)", active: t.keyboard.right } }), t._v(" "), n("vbutton", { ref: "dom_space", attrs: { color: "blue", size: "s0", top: 100, left: 52, label: t.labelDropSpace, active: t.keyboard.drop } }), t._v(" "), n("vbutton", { ref: "dom_r", attrs: { color: "red", size: "s2", top: 0, left: 196, label: t.labelResetR, active: t.keyboard.reset } }), t._v(" "), n("vbutton", { ref: "dom_s", attrs: { color: "green", size: "s2", top: 0, left: 106, label: t.labelSoundS, active: t.keyboard.music } }), t._v(" "), n("vbutton", { ref: "dom_p", attrs: { color: "green", size: "s2", top: 0, left: 16, label: t.labelPauseP, active: t.keyboard.pause } })], 1);
    }, staticRenderFns: [] };
},, function (t, e) {
  t.exports = { lan: ["cn", "en", "fr", "fa"], default: "cn", data: { title: { cn: "俄罗斯方块", en: "T E T R I S", fr: "T E T R I S", fa: "خانه سازی" }, github: { cn: "GitHub", en: "GitHub", fr: "GitHub", fa: "گیت‌هاب" }, linkTitle: { cn: "查看源代码", en: "View data source", fr: "Afficher la source des données", fa: "مشاهده سورس پروژه" }, QRCode: { cn: "二维码", en: "QR code", fr: "QR code", fa: "کیوآر کد" }, QRNotice: { cn: "扫一扫用手机玩", en: "Scan QR code to play with a mobile phone", fr: "Numérisez le code QR pour jouer avec un téléphone mobile", fa: "اسکن کیوآر کد برای بازی در تلفن همراه" }, titleCenter: { cn: "俄罗斯方块<br />TETRIS", en: "TETRIS", fr: "TETRIS", fa: "خانه سازی" }, point: { cn: "得分", en: "Point", fr: "Score", fa: "امتیاز" }, highestScore: { cn: "最高分", en: "Max", fr: "Max", fa: "حداکثر" }, lastRound: { cn: "上轮得分", en: "Last Round", fr: "Dernier Tour", fa: "آخرین دور" }, cleans: { cn: "消除行", en: "Cleans", fr: "Lignes", fa: "پاک کرد" }, level: { cn: "级别", en: "Level", fr: "Difficulté", fa: "سطح" }, startLine: { cn: "起始行", en: "Start Line", fr: "Ligne Départ", fa: "خط شروع" }, next: { cn: "下一个", en: "Next", fr: "Prochain", fa: "بعدی" }, pause: { cn: "暂停", en: "Pause", fr: "Pause", fa: "مکث" }, sound: { cn: "音效", en: "Sound", fr: "Sonore", fa: "صدا" }, reset: { cn: "重玩", en: "Reset", fr: "Réinitialiser", fa: "ریست" }, rotation: { cn: "旋转", en: "Rotation", fr: "Rotation", fa: "چرخش" }, left: { cn: "左移", en: "Left", fr: "Gauche", fa: "چپ" }, right: { cn: "右移", en: "Right", fr: "Droite", fa: "راست" }, down: { cn: "下移", en: "Down", fr: "Bas", fa: "پایین" }, drop: { cn: "掉落", en: "Drop", fr: "Tomber", fa: "سقوط" } } };
}], [65]);
//# sourceMappingURL=app.db852a56b925844618f4.js.map