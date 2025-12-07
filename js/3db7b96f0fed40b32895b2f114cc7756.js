/* Minit: /wp-includes/js/jquery/jquery.min.js */
/*! jQuery v3.6.0 | (c) OpenJS Foundation and other contributors | jquery.org/license */
! function(e, t) {
	"use strict";
	"object" == typeof module && "object" == typeof module.exports ? module.exports = e.document ? t(e, !0) : function(e) {
		if (!e.document) throw new Error("jQuery requires a window with a document");
		return t(e)
	} : t(e)
}("undefined" != typeof window ? window : this, function(C, e) {
	"use strict";
	var t = [],
		r = Object.getPrototypeOf,
		s = t.slice,
		g = t.flat ? function(e) {
			return t.flat.call(e)
		} : function(e) {
			return t.concat.apply([], e)
		},
		u = t.push,
		i = t.indexOf,
		n = {},
		o = n.toString,
		v = n.hasOwnProperty,
		a = v.toString,
		l = a.call(Object),
		y = {},
		m = function(e) {
			return "function" == typeof e && "number" != typeof e.nodeType && "function" != typeof e.item
		},
		x = function(e) {
			return null != e && e === e.window
		},
		E = C.document,
		c = {
			type: !0,
			src: !0,
			nonce: !0,
			noModule: !0
		};

	function b(e, t, n) {
		var r, i, o = (n = n || E).createElement("script");
		if (o.text = e, t)
			for (r in c)(i = t[r] || t.getAttribute && t.getAttribute(r)) && o.setAttribute(r, i);
		n.head.appendChild(o).parentNode.removeChild(o)
	}

	function w(e) {
		return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? n[o.call(e)] || "object" : typeof e
	}
	var f = "3.6.0",
		S = function(e, t) {
			return new S.fn.init(e, t)
		};

	function p(e) {
		var t = !!e && "length" in e && e.length,
			n = w(e);
		return !m(e) && !x(e) && ("array" === n || 0 === t || "number" == typeof t && 0 < t && t - 1 in e)
	}
	S.fn = S.prototype = {
		jquery: f,
		constructor: S,
		length: 0,
		toArray: function() {
			return s.call(this)
		},
		get: function(e) {
			return null == e ? s.call(this) : e < 0 ? this[e + this.length] : this[e]
		},
		pushStack: function(e) {
			var t = S.merge(this.constructor(), e);
			return t.prevObject = this, t
		},
		each: function(e) {
			return S.each(this, e)
		},
		map: function(n) {
			return this.pushStack(S.map(this, function(e, t) {
				return n.call(e, t, e)
			}))
		},
		slice: function() {
			return this.pushStack(s.apply(this, arguments))
		},
		first: function() {
			return this.eq(0)
		},
		last: function() {
			return this.eq(-1)
		},
		even: function() {
			return this.pushStack(S.grep(this, function(e, t) {
				return (t + 1) % 2
			}))
		},
		odd: function() {
			return this.pushStack(S.grep(this, function(e, t) {
				return t % 2
			}))
		},
		eq: function(e) {
			var t = this.length,
				n = +e + (e < 0 ? t : 0);
			return this.pushStack(0 <= n && n < t ? [this[n]] : [])
		},
		end: function() {
			return this.prevObject || this.constructor()
		},
		push: u,
		sort: t.sort,
		splice: t.splice
	}, S.extend = S.fn.extend = function() {
		var e, t, n, r, i, o, a = arguments[0] || {},
			s = 1,
			u = arguments.length,
			l = !1;
		for ("boolean" == typeof a && (l = a, a = arguments[s] || {}, s++), "object" == typeof a || m(a) || (a = {}), s === u && (a = this, s--); s < u; s++)
			if (null != (e = arguments[s]))
				for (t in e) r = e[t], "__proto__" !== t && a !== r && (l && r && (S.isPlainObject(r) || (i = Array.isArray(r))) ? (n = a[t], o = i && !Array.isArray(n) ? [] : i || S.isPlainObject(n) ? n : {}, i = !1, a[t] = S.extend(l, o, r)) : void 0 !== r && (a[t] = r));
		return a
	}, S.extend({
		expando: "jQuery" + (f + Math.random()).replace(/\D/g, ""),
		isReady: !0,
		error: function(e) {
			throw new Error(e)
		},
		noop: function() {},
		isPlainObject: function(e) {
			var t, n;
			return !(!e || "[object Object]" !== o.call(e)) && (!(t = r(e)) || "function" == typeof(n = v.call(t, "constructor") && t.constructor) && a.call(n) === l)
		},
		isEmptyObject: function(e) {
			var t;
			for (t in e) return !1;
			return !0
		},
		globalEval: function(e, t, n) {
			b(e, {
				nonce: t && t.nonce
			}, n)
		},
		each: function(e, t) {
			var n, r = 0;
			if (p(e)) {
				for (n = e.length; r < n; r++)
					if (!1 === t.call(e[r], r, e[r])) break
			} else
				for (r in e)
					if (!1 === t.call(e[r], r, e[r])) break;
			return e
		},
		makeArray: function(e, t) {
			var n = t || [];
			return null != e && (p(Object(e)) ? S.merge(n, "string" == typeof e ? [e] : e) : u.call(n, e)), n
		},
		inArray: function(e, t, n) {
			return null == t ? -1 : i.call(t, e, n)
		},
		merge: function(e, t) {
			for (var n = +t.length, r = 0, i = e.length; r < n; r++) e[i++] = t[r];
			return e.length = i, e
		},
		grep: function(e, t, n) {
			for (var r = [], i = 0, o = e.length, a = !n; i < o; i++) !t(e[i], i) !== a && r.push(e[i]);
			return r
		},
		map: function(e, t, n) {
			var r, i, o = 0,
				a = [];
			if (p(e))
				for (r = e.length; o < r; o++) null != (i = t(e[o], o, n)) && a.push(i);
			else
				for (o in e) null != (i = t(e[o], o, n)) && a.push(i);
			return g(a)
		},
		guid: 1,
		support: y
	}), "function" == typeof Symbol && (S.fn[Symbol.iterator] = t[Symbol.iterator]), S.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function(e, t) {
		n["[object " + t + "]"] = t.toLowerCase()
	});
	var d = function(n) {
		var e, d, b, o, i, h, f, g, w, u, l, T, C, a, E, v, s, c, y, S = "sizzle" + 1 * new Date,
			p = n.document,
			k = 0,
			r = 0,
			m = ue(),
			x = ue(),
			A = ue(),
			N = ue(),
			j = function(e, t) {
				return e === t && (l = !0), 0
			},
			D = {}.hasOwnProperty,
			t = [],
			q = t.pop,
			L = t.push,
			H = t.push,
			O = t.slice,
			P = function(e, t) {
				for (var n = 0, r = e.length; n < r; n++)
					if (e[n] === t) return n;
				return -1
			},
			R = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
			M = "[\\x20\\t\\r\\n\\f]",
			I = "(?:\\\\[\\da-fA-F]{1,6}" + M + "?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+",
			W = "\\[" + M + "*(" + I + ")(?:" + M + "*([*^$|!~]?=)" + M + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + I + "))|)" + M + "*\\]",
			F = ":(" + I + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + W + ")*)|.*)\\)|)",
			B = new RegExp(M + "+", "g"),
			$ = new RegExp("^" + M + "+|((?:^|[^\\\\])(?:\\\\.)*)" + M + "+$", "g"),
			_ = new RegExp("^" + M + "*," + M + "*"),
			z = new RegExp("^" + M + "*([>+~]|" + M + ")" + M + "*"),
			U = new RegExp(M + "|>"),
			X = new RegExp(F),
			V = new RegExp("^" + I + "$"),
			G = {
				ID: new RegExp("^#(" + I + ")"),
				CLASS: new RegExp("^\\.(" + I + ")"),
				TAG: new RegExp("^(" + I + "|[*])"),
				ATTR: new RegExp("^" + W),
				PSEUDO: new RegExp("^" + F),
				CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + M + "*(even|odd|(([+-]|)(\\d*)n|)" + M + "*(?:([+-]|)" + M + "*(\\d+)|))" + M + "*\\)|)", "i"),
				bool: new RegExp("^(?:" + R + ")$", "i"),
				needsContext: new RegExp("^" + M + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + M + "*((?:-\\d)?\\d*)" + M + "*\\)|)(?=[^-]|$)", "i")
			},
			Y = /HTML$/i,
			Q = /^(?:input|select|textarea|button)$/i,
			J = /^h\d$/i,
			K = /^[^{]+\{\s*\[native \w/,
			Z = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
			ee = /[+~]/,
			te = new RegExp("\\\\[\\da-fA-F]{1,6}" + M + "?|\\\\([^\\r\\n\\f])", "g"),
			ne = function(e, t) {
				var n = "0x" + e.slice(1) - 65536;
				return t || (n < 0 ? String.fromCharCode(n + 65536) : String.fromCharCode(n >> 10 | 55296, 1023 & n | 56320))
			},
			re = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
			ie = function(e, t) {
				return t ? "\0" === e ? "\ufffd" : e.slice(0, -1) + "\\" + e.charCodeAt(e.length - 1).toString(16) + " " : "\\" + e
			},
			oe = function() {
				T()
			},
			ae = be(function(e) {
				return !0 === e.disabled && "fieldset" === e.nodeName.toLowerCase()
			}, {
				dir: "parentNode",
				next: "legend"
			});
		try {
			H.apply(t = O.call(p.childNodes), p.childNodes), t[p.childNodes.length].nodeType
		} catch (e) {
			H = {
				apply: t.length ? function(e, t) {
					L.apply(e, O.call(t))
				} : function(e, t) {
					var n = e.length,
						r = 0;
					while (e[n++] = t[r++]);
					e.length = n - 1
				}
			}
		}

		function se(t, e, n, r) {
			var i, o, a, s, u, l, c, f = e && e.ownerDocument,
				p = e ? e.nodeType : 9;
			if (n = n || [], "string" != typeof t || !t || 1 !== p && 9 !== p && 11 !== p) return n;
			if (!r && (T(e), e = e || C, E)) {
				if (11 !== p && (u = Z.exec(t)))
					if (i = u[1]) {
						if (9 === p) {
							if (!(a = e.getElementById(i))) return n;
							if (a.id === i) return n.push(a), n
						} else if (f && (a = f.getElementById(i)) && y(e, a) && a.id === i) return n.push(a), n
					} else {
						if (u[2]) return H.apply(n, e.getElementsByTagName(t)), n;
						if ((i = u[3]) && d.getElementsByClassName && e.getElementsByClassName) return H.apply(n, e.getElementsByClassName(i)), n
					} if (d.qsa && !N[t + " "] && (!v || !v.test(t)) && (1 !== p || "object" !== e.nodeName.toLowerCase())) {
					if (c = t, f = e, 1 === p && (U.test(t) || z.test(t))) {
						(f = ee.test(t) && ye(e.parentNode) || e) === e && d.scope || ((s = e.getAttribute("id")) ? s = s.replace(re, ie) : e.setAttribute("id", s = S)), o = (l = h(t)).length;
						while (o--) l[o] = (s ? "#" + s : ":scope") + " " + xe(l[o]);
						c = l.join(",")
					}
					try {
						return H.apply(n, f.querySelectorAll(c)), n
					} catch (e) {
						N(t, !0)
					} finally {
						s === S && e.removeAttribute("id")
					}
				}
			}
			return g(t.replace($, "$1"), e, n, r)
		}

		function ue() {
			var r = [];
			return function e(t, n) {
				return r.push(t + " ") > b.cacheLength && delete e[r.shift()], e[t + " "] = n
			}
		}

		function le(e) {
			return e[S] = !0, e
		}

		function ce(e) {
			var t = C.createElement("fieldset");
			try {
				return !!e(t)
			} catch (e) {
				return !1
			} finally {
				t.parentNode && t.parentNode.removeChild(t), t = null
			}
		}

		function fe(e, t) {
			var n = e.split("|"),
				r = n.length;
			while (r--) b.attrHandle[n[r]] = t
		}

		function pe(e, t) {
			var n = t && e,
				r = n && 1 === e.nodeType && 1 === t.nodeType && e.sourceIndex - t.sourceIndex;
			if (r) return r;
			if (n)
				while (n = n.nextSibling)
					if (n === t) return -1;
			return e ? 1 : -1
		}

		function de(t) {
			return function(e) {
				return "input" === e.nodeName.toLowerCase() && e.type === t
			}
		}

		function he(n) {
			return function(e) {
				var t = e.nodeName.toLowerCase();
				return ("input" === t || "button" === t) && e.type === n
			}
		}

		function ge(t) {
			return function(e) {
				return "form" in e ? e.parentNode && !1 === e.disabled ? "label" in e ? "label" in e.parentNode ? e.parentNode.disabled === t : e.disabled === t : e.isDisabled === t || e.isDisabled !== !t && ae(e) === t : e.disabled === t : "label" in e && e.disabled === t
			}
		}

		function ve(a) {
			return le(function(o) {
				return o = +o, le(function(e, t) {
					var n, r = a([], e.length, o),
						i = r.length;
					while (i--) e[n = r[i]] && (e[n] = !(t[n] = e[n]))
				})
			})
		}

		function ye(e) {
			return e && "undefined" != typeof e.getElementsByTagName && e
		}
		for (e in d = se.support = {}, i = se.isXML = function(e) {
				var t = e && e.namespaceURI,
					n = e && (e.ownerDocument || e).documentElement;
				return !Y.test(t || n && n.nodeName || "HTML")
			}, T = se.setDocument = function(e) {
				var t, n, r = e ? e.ownerDocument || e : p;
				return r != C && 9 === r.nodeType && r.documentElement && (a = (C = r).documentElement, E = !i(C), p != C && (n = C.defaultView) && n.top !== n && (n.addEventListener ? n.addEventListener("unload", oe, !1) : n.attachEvent && n.attachEvent("onunload", oe)), d.scope = ce(function(e) {
					return a.appendChild(e).appendChild(C.createElement("div")), "undefined" != typeof e.querySelectorAll && !e.querySelectorAll(":scope fieldset div").length
				}), d.attributes = ce(function(e) {
					return e.className = "i", !e.getAttribute("className")
				}), d.getElementsByTagName = ce(function(e) {
					return e.appendChild(C.createComment("")), !e.getElementsByTagName("*").length
				}), d.getElementsByClassName = K.test(C.getElementsByClassName), d.getById = ce(function(e) {
					return a.appendChild(e).id = S, !C.getElementsByName || !C.getElementsByName(S).length
				}), d.getById ? (b.filter.ID = function(e) {
					var t = e.replace(te, ne);
					return function(e) {
						return e.getAttribute("id") === t
					}
				}, b.find.ID = function(e, t) {
					if ("undefined" != typeof t.getElementById && E) {
						var n = t.getElementById(e);
						return n ? [n] : []
					}
				}) : (b.filter.ID = function(e) {
					var n = e.replace(te, ne);
					return function(e) {
						var t = "undefined" != typeof e.getAttributeNode && e.getAttributeNode("id");
						return t && t.value === n
					}
				}, b.find.ID = function(e, t) {
					if ("undefined" != typeof t.getElementById && E) {
						var n, r, i, o = t.getElementById(e);
						if (o) {
							if ((n = o.getAttributeNode("id")) && n.value === e) return [o];
							i = t.getElementsByName(e), r = 0;
							while (o = i[r++])
								if ((n = o.getAttributeNode("id")) && n.value === e) return [o]
						}
						return []
					}
				}), b.find.TAG = d.getElementsByTagName ? function(e, t) {
					return "undefined" != typeof t.getElementsByTagName ? t.getElementsByTagName(e) : d.qsa ? t.querySelectorAll(e) : void 0
				} : function(e, t) {
					var n, r = [],
						i = 0,
						o = t.getElementsByTagName(e);
					if ("*" === e) {
						while (n = o[i++]) 1 === n.nodeType && r.push(n);
						return r
					}
					return o
				}, b.find.CLASS = d.getElementsByClassName && function(e, t) {
					if ("undefined" != typeof t.getElementsByClassName && E) return t.getElementsByClassName(e)
				}, s = [], v = [], (d.qsa = K.test(C.querySelectorAll)) && (ce(function(e) {
					var t;
					a.appendChild(e).innerHTML = "<a id='" + S + "'></a><select id='" + S + "-\r\\' msallowcapture=''><option selected=''></option></select>", e.querySelectorAll("[msallowcapture^='']").length && v.push("[*^$]=" + M + "*(?:''|\"\")"), e.querySelectorAll("[selected]").length || v.push("\\[" + M + "*(?:value|" + R + ")"), e.querySelectorAll("[id~=" + S + "-]").length || v.push("~="), (t = C.createElement("input")).setAttribute("name", ""), e.appendChild(t), e.querySelectorAll("[name='']").length || v.push("\\[" + M + "*name" + M + "*=" + M + "*(?:''|\"\")"), e.querySelectorAll(":checked").length || v.push(":checked"), e.querySelectorAll("a#" + S + "+*").length || v.push(".#.+[+~]"), e.querySelectorAll("\\\f"), v.push("[\\r\\n\\f]")
				}), ce(function(e) {
					e.innerHTML = "<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";
					var t = C.createElement("input");
					t.setAttribute("type", "hidden"), e.appendChild(t).setAttribute("name", "D"), e.querySelectorAll("[name=d]").length && v.push("name" + M + "*[*^$|!~]?="), 2 !== e.querySelectorAll(":enabled").length && v.push(":enabled", ":disabled"), a.appendChild(e).disabled = !0, 2 !== e.querySelectorAll(":disabled").length && v.push(":enabled", ":disabled"), e.querySelectorAll("*,:x"), v.push(",.*:")
				})), (d.matchesSelector = K.test(c = a.matches || a.webkitMatchesSelector || a.mozMatchesSelector || a.oMatchesSelector || a.msMatchesSelector)) && ce(function(e) {
					d.disconnectedMatch = c.call(e, "*"), c.call(e, "[s!='']:x"), s.push("!=", F)
				}), v = v.length && new RegExp(v.join("|")), s = s.length && new RegExp(s.join("|")), t = K.test(a.compareDocumentPosition), y = t || K.test(a.contains) ? function(e, t) {
					var n = 9 === e.nodeType ? e.documentElement : e,
						r = t && t.parentNode;
					return e === r || !(!r || 1 !== r.nodeType || !(n.contains ? n.contains(r) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(r)))
				} : function(e, t) {
					if (t)
						while (t = t.parentNode)
							if (t === e) return !0;
					return !1
				}, j = t ? function(e, t) {
					if (e === t) return l = !0, 0;
					var n = !e.compareDocumentPosition - !t.compareDocumentPosition;
					return n || (1 & (n = (e.ownerDocument || e) == (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1) || !d.sortDetached && t.compareDocumentPosition(e) === n ? e == C || e.ownerDocument == p && y(p, e) ? -1 : t == C || t.ownerDocument == p && y(p, t) ? 1 : u ? P(u, e) - P(u, t) : 0 : 4 & n ? -1 : 1)
				} : function(e, t) {
					if (e === t) return l = !0, 0;
					var n, r = 0,
						i = e.parentNode,
						o = t.parentNode,
						a = [e],
						s = [t];
					if (!i || !o) return e == C ? -1 : t == C ? 1 : i ? -1 : o ? 1 : u ? P(u, e) - P(u, t) : 0;
					if (i === o) return pe(e, t);
					n = e;
					while (n = n.parentNode) a.unshift(n);
					n = t;
					while (n = n.parentNode) s.unshift(n);
					while (a[r] === s[r]) r++;
					return r ? pe(a[r], s[r]) : a[r] == p ? -1 : s[r] == p ? 1 : 0
				}), C
			}, se.matches = function(e, t) {
				return se(e, null, null, t)
			}, se.matchesSelector = function(e, t) {
				if (T(e), d.matchesSelector && E && !N[t + " "] && (!s || !s.test(t)) && (!v || !v.test(t))) try {
					var n = c.call(e, t);
					if (n || d.disconnectedMatch || e.document && 11 !== e.document.nodeType) return n
				} catch (e) {
					N(t, !0)
				}
				return 0 < se(t, C, null, [e]).length
			}, se.contains = function(e, t) {
				return (e.ownerDocument || e) != C && T(e), y(e, t)
			}, se.attr = function(e, t) {
				(e.ownerDocument || e) != C && T(e);
				var n = b.attrHandle[t.toLowerCase()],
					r = n && D.call(b.attrHandle, t.toLowerCase()) ? n(e, t, !E) : void 0;
				return void 0 !== r ? r : d.attributes || !E ? e.getAttribute(t) : (r = e.getAttributeNode(t)) && r.specified ? r.value : null
			}, se.escape = function(e) {
				return (e + "").replace(re, ie)
			}, se.error = function(e) {
				throw new Error("Syntax error, unrecognized expression: " + e)
			}, se.uniqueSort = function(e) {
				var t, n = [],
					r = 0,
					i = 0;
				if (l = !d.detectDuplicates, u = !d.sortStable && e.slice(0), e.sort(j), l) {
					while (t = e[i++]) t === e[i] && (r = n.push(i));
					while (r--) e.splice(n[r], 1)
				}
				return u = null, e
			}, o = se.getText = function(e) {
				var t, n = "",
					r = 0,
					i = e.nodeType;
				if (i) {
					if (1 === i || 9 === i || 11 === i) {
						if ("string" == typeof e.textContent) return e.textContent;
						for (e = e.firstChild; e; e = e.nextSibling) n += o(e)
					} else if (3 === i || 4 === i) return e.nodeValue
				} else
					while (t = e[r++]) n += o(t);
				return n
			}, (b = se.selectors = {
				cacheLength: 50,
				createPseudo: le,
				match: G,
				attrHandle: {},
				find: {},
				relative: {
					">": {
						dir: "parentNode",
						first: !0
					},
					" ": {
						dir: "parentNode"
					},
					"+": {
						dir: "previousSibling",
						first: !0
					},
					"~": {
						dir: "previousSibling"
					}
				},
				preFilter: {
					ATTR: function(e) {
						return e[1] = e[1].replace(te, ne), e[3] = (e[3] || e[4] || e[5] || "").replace(te, ne), "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4)
					},
					CHILD: function(e) {
						return e[1] = e[1].toLowerCase(), "nth" === e[1].slice(0, 3) ? (e[3] || se.error(e[0]), e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])), e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && se.error(e[0]), e
					},
					PSEUDO: function(e) {
						var t, n = !e[6] && e[2];
						return G.CHILD.test(e[0]) ? null : (e[3] ? e[2] = e[4] || e[5] || "" : n && X.test(n) && (t = h(n, !0)) && (t = n.indexOf(")", n.length - t) - n.length) && (e[0] = e[0].slice(0, t), e[2] = n.slice(0, t)), e.slice(0, 3))
					}
				},
				filter: {
					TAG: function(e) {
						var t = e.replace(te, ne).toLowerCase();
						return "*" === e ? function() {
							return !0
						} : function(e) {
							return e.nodeName && e.nodeName.toLowerCase() === t
						}
					},
					CLASS: function(e) {
						var t = m[e + " "];
						return t || (t = new RegExp("(^|" + M + ")" + e + "(" + M + "|$)")) && m(e, function(e) {
							return t.test("string" == typeof e.className && e.className || "undefined" != typeof e.getAttribute && e.getAttribute("class") || "")
						})
					},
					ATTR: function(n, r, i) {
						return function(e) {
							var t = se.attr(e, n);
							return null == t ? "!=" === r : !r || (t += "", "=" === r ? t === i : "!=" === r ? t !== i : "^=" === r ? i && 0 === t.indexOf(i) : "*=" === r ? i && -1 < t.indexOf(i) : "$=" === r ? i && t.slice(-i.length) === i : "~=" === r ? -1 < (" " + t.replace(B, " ") + " ").indexOf(i) : "|=" === r && (t === i || t.slice(0, i.length + 1) === i + "-"))
						}
					},
					CHILD: function(h, e, t, g, v) {
						var y = "nth" !== h.slice(0, 3),
							m = "last" !== h.slice(-4),
							x = "of-type" === e;
						return 1 === g && 0 === v ? function(e) {
							return !!e.parentNode
						} : function(e, t, n) {
							var r, i, o, a, s, u, l = y !== m ? "nextSibling" : "previousSibling",
								c = e.parentNode,
								f = x && e.nodeName.toLowerCase(),
								p = !n && !x,
								d = !1;
							if (c) {
								if (y) {
									while (l) {
										a = e;
										while (a = a[l])
											if (x ? a.nodeName.toLowerCase() === f : 1 === a.nodeType) return !1;
										u = l = "only" === h && !u && "nextSibling"
									}
									return !0
								}
								if (u = [m ? c.firstChild : c.lastChild], m && p) {
									d = (s = (r = (i = (o = (a = c)[S] || (a[S] = {}))[a.uniqueID] || (o[a.uniqueID] = {}))[h] || [])[0] === k && r[1]) && r[2], a = s && c.childNodes[s];
									while (a = ++s && a && a[l] || (d = s = 0) || u.pop())
										if (1 === a.nodeType && ++d && a === e) {
											i[h] = [k, s, d];
											break
										}
								} else if (p && (d = s = (r = (i = (o = (a = e)[S] || (a[S] = {}))[a.uniqueID] || (o[a.uniqueID] = {}))[h] || [])[0] === k && r[1]), !1 === d)
									while (a = ++s && a && a[l] || (d = s = 0) || u.pop())
										if ((x ? a.nodeName.toLowerCase() === f : 1 === a.nodeType) && ++d && (p && ((i = (o = a[S] || (a[S] = {}))[a.uniqueID] || (o[a.uniqueID] = {}))[h] = [k, d]), a === e)) break;
								return (d -= v) === g || d % g == 0 && 0 <= d / g
							}
						}
					},
					PSEUDO: function(e, o) {
						var t, a = b.pseudos[e] || b.setFilters[e.toLowerCase()] || se.error("unsupported pseudo: " + e);
						return a[S] ? a(o) : 1 < a.length ? (t = [e, e, "", o], b.setFilters.hasOwnProperty(e.toLowerCase()) ? le(function(e, t) {
							var n, r = a(e, o),
								i = r.length;
							while (i--) e[n = P(e, r[i])] = !(t[n] = r[i])
						}) : function(e) {
							return a(e, 0, t)
						}) : a
					}
				},
				pseudos: {
					not: le(function(e) {
						var r = [],
							i = [],
							s = f(e.replace($, "$1"));
						return s[S] ? le(function(e, t, n, r) {
							var i, o = s(e, null, r, []),
								a = e.length;
							while (a--)(i = o[a]) && (e[a] = !(t[a] = i))
						}) : function(e, t, n) {
							return r[0] = e, s(r, null, n, i), r[0] = null, !i.pop()
						}
					}),
					has: le(function(t) {
						return function(e) {
							return 0 < se(t, e).length
						}
					}),
					contains: le(function(t) {
						return t = t.replace(te, ne),
							function(e) {
								return -1 < (e.textContent || o(e)).indexOf(t)
							}
					}),
					lang: le(function(n) {
						return V.test(n || "") || se.error("unsupported lang: " + n), n = n.replace(te, ne).toLowerCase(),
							function(e) {
								var t;
								do {
									if (t = E ? e.lang : e.getAttribute("xml:lang") || e.getAttribute("lang")) return (t = t.toLowerCase()) === n || 0 === t.indexOf(n + "-")
								} while ((e = e.parentNode) && 1 === e.nodeType);
								return !1
							}
					}),
					target: function(e) {
						var t = n.location && n.location.hash;
						return t && t.slice(1) === e.id
					},
					root: function(e) {
						return e === a
					},
					focus: function(e) {
						return e === C.activeElement && (!C.hasFocus || C.hasFocus()) && !!(e.type || e.href || ~e.tabIndex)
					},
					enabled: ge(!1),
					disabled: ge(!0),
					checked: function(e) {
						var t = e.nodeName.toLowerCase();
						return "input" === t && !!e.checked || "option" === t && !!e.selected
					},
					selected: function(e) {
						return e.parentNode && e.parentNode.selectedIndex, !0 === e.selected
					},
					empty: function(e) {
						for (e = e.firstChild; e; e = e.nextSibling)
							if (e.nodeType < 6) return !1;
						return !0
					},
					parent: function(e) {
						return !b.pseudos.empty(e)
					},
					header: function(e) {
						return J.test(e.nodeName)
					},
					input: function(e) {
						return Q.test(e.nodeName)
					},
					button: function(e) {
						var t = e.nodeName.toLowerCase();
						return "input" === t && "button" === e.type || "button" === t
					},
					text: function(e) {
						var t;
						return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || "text" === t.toLowerCase())
					},
					first: ve(function() {
						return [0]
					}),
					last: ve(function(e, t) {
						return [t - 1]
					}),
					eq: ve(function(e, t, n) {
						return [n < 0 ? n + t : n]
					}),
					even: ve(function(e, t) {
						for (var n = 0; n < t; n += 2) e.push(n);
						return e
					}),
					odd: ve(function(e, t) {
						for (var n = 1; n < t; n += 2) e.push(n);
						return e
					}),
					lt: ve(function(e, t, n) {
						for (var r = n < 0 ? n + t : t < n ? t : n; 0 <= --r;) e.push(r);
						return e
					}),
					gt: ve(function(e, t, n) {
						for (var r = n < 0 ? n + t : n; ++r < t;) e.push(r);
						return e
					})
				}
			}).pseudos.nth = b.pseudos.eq, {
				radio: !0,
				checkbox: !0,
				file: !0,
				password: !0,
				image: !0
			}) b.pseudos[e] = de(e);
		for (e in {
				submit: !0,
				reset: !0
			}) b.pseudos[e] = he(e);

		function me() {}

		function xe(e) {
			for (var t = 0, n = e.length, r = ""; t < n; t++) r += e[t].value;
			return r
		}

		function be(s, e, t) {
			var u = e.dir,
				l = e.next,
				c = l || u,
				f = t && "parentNode" === c,
				p = r++;
			return e.first ? function(e, t, n) {
				while (e = e[u])
					if (1 === e.nodeType || f) return s(e, t, n);
				return !1
			} : function(e, t, n) {
				var r, i, o, a = [k, p];
				if (n) {
					while (e = e[u])
						if ((1 === e.nodeType || f) && s(e, t, n)) return !0
				} else
					while (e = e[u])
						if (1 === e.nodeType || f)
							if (i = (o = e[S] || (e[S] = {}))[e.uniqueID] || (o[e.uniqueID] = {}), l && l === e.nodeName.toLowerCase()) e = e[u] || e;
							else {
								if ((r = i[c]) && r[0] === k && r[1] === p) return a[2] = r[2];
								if ((i[c] = a)[2] = s(e, t, n)) return !0
							} return !1
			}
		}

		function we(i) {
			return 1 < i.length ? function(e, t, n) {
				var r = i.length;
				while (r--)
					if (!i[r](e, t, n)) return !1;
				return !0
			} : i[0]
		}

		function Te(e, t, n, r, i) {
			for (var o, a = [], s = 0, u = e.length, l = null != t; s < u; s++)(o = e[s]) && (n && !n(o, r, i) || (a.push(o), l && t.push(s)));
			return a
		}

		function Ce(d, h, g, v, y, e) {
			return v && !v[S] && (v = Ce(v)), y && !y[S] && (y = Ce(y, e)), le(function(e, t, n, r) {
				var i, o, a, s = [],
					u = [],
					l = t.length,
					c = e || function(e, t, n) {
						for (var r = 0, i = t.length; r < i; r++) se(e, t[r], n);
						return n
					}(h || "*", n.nodeType ? [n] : n, []),
					f = !d || !e && h ? c : Te(c, s, d, n, r),
					p = g ? y || (e ? d : l || v) ? [] : t : f;
				if (g && g(f, p, n, r), v) {
					i = Te(p, u), v(i, [], n, r), o = i.length;
					while (o--)(a = i[o]) && (p[u[o]] = !(f[u[o]] = a))
				}
				if (e) {
					if (y || d) {
						if (y) {
							i = [], o = p.length;
							while (o--)(a = p[o]) && i.push(f[o] = a);
							y(null, p = [], i, r)
						}
						o = p.length;
						while (o--)(a = p[o]) && -1 < (i = y ? P(e, a) : s[o]) && (e[i] = !(t[i] = a))
					}
				} else p = Te(p === t ? p.splice(l, p.length) : p), y ? y(null, t, p, r) : H.apply(t, p)
			})
		}

		function Ee(e) {
			for (var i, t, n, r = e.length, o = b.relative[e[0].type], a = o || b.relative[" "], s = o ? 1 : 0, u = be(function(e) {
					return e === i
				}, a, !0), l = be(function(e) {
					return -1 < P(i, e)
				}, a, !0), c = [function(e, t, n) {
					var r = !o && (n || t !== w) || ((i = t).nodeType ? u(e, t, n) : l(e, t, n));
					return i = null, r
				}]; s < r; s++)
				if (t = b.relative[e[s].type]) c = [be(we(c), t)];
				else {
					if ((t = b.filter[e[s].type].apply(null, e[s].matches))[S]) {
						for (n = ++s; n < r; n++)
							if (b.relative[e[n].type]) break;
						return Ce(1 < s && we(c), 1 < s && xe(e.slice(0, s - 1).concat({
							value: " " === e[s - 2].type ? "*" : ""
						})).replace($, "$1"), t, s < n && Ee(e.slice(s, n)), n < r && Ee(e = e.slice(n)), n < r && xe(e))
					}
					c.push(t)
				} return we(c)
		}
		return me.prototype = b.filters = b.pseudos, b.setFilters = new me, h = se.tokenize = function(e, t) {
			var n, r, i, o, a, s, u, l = x[e + " "];
			if (l) return t ? 0 : l.slice(0);
			a = e, s = [], u = b.preFilter;
			while (a) {
				for (o in n && !(r = _.exec(a)) || (r && (a = a.slice(r[0].length) || a), s.push(i = [])), n = !1, (r = z.exec(a)) && (n = r.shift(), i.push({
						value: n,
						type: r[0].replace($, " ")
					}), a = a.slice(n.length)), b.filter) !(r = G[o].exec(a)) || u[o] && !(r = u[o](r)) || (n = r.shift(), i.push({
					value: n,
					type: o,
					matches: r
				}), a = a.slice(n.length));
				if (!n) break
			}
			return t ? a.length : a ? se.error(e) : x(e, s).slice(0)
		}, f = se.compile = function(e, t) {
			var n, v, y, m, x, r, i = [],
				o = [],
				a = A[e + " "];
			if (!a) {
				t || (t = h(e)), n = t.length;
				while (n--)(a = Ee(t[n]))[S] ? i.push(a) : o.push(a);
				(a = A(e, (v = o, m = 0 < (y = i).length, x = 0 < v.length, r = function(e, t, n, r, i) {
					var o, a, s, u = 0,
						l = "0",
						c = e && [],
						f = [],
						p = w,
						d = e || x && b.find.TAG("*", i),
						h = k += null == p ? 1 : Math.random() || .1,
						g = d.length;
					for (i && (w = t == C || t || i); l !== g && null != (o = d[l]); l++) {
						if (x && o) {
							a = 0, t || o.ownerDocument == C || (T(o), n = !E);
							while (s = v[a++])
								if (s(o, t || C, n)) {
									r.push(o);
									break
								} i && (k = h)
						}
						m && ((o = !s && o) && u--, e && c.push(o))
					}
					if (u += l, m && l !== u) {
						a = 0;
						while (s = y[a++]) s(c, f, t, n);
						if (e) {
							if (0 < u)
								while (l--) c[l] || f[l] || (f[l] = q.call(r));
							f = Te(f)
						}
						H.apply(r, f), i && !e && 0 < f.length && 1 < u + y.length && se.uniqueSort(r)
					}
					return i && (k = h, w = p), c
				}, m ? le(r) : r))).selector = e
			}
			return a
		}, g = se.select = function(e, t, n, r) {
			var i, o, a, s, u, l = "function" == typeof e && e,
				c = !r && h(e = l.selector || e);
			if (n = n || [], 1 === c.length) {
				if (2 < (o = c[0] = c[0].slice(0)).length && "ID" === (a = o[0]).type && 9 === t.nodeType && E && b.relative[o[1].type]) {
					if (!(t = (b.find.ID(a.matches[0].replace(te, ne), t) || [])[0])) return n;
					l && (t = t.parentNode), e = e.slice(o.shift().value.length)
				}
				i = G.needsContext.test(e) ? 0 : o.length;
				while (i--) {
					if (a = o[i], b.relative[s = a.type]) break;
					if ((u = b.find[s]) && (r = u(a.matches[0].replace(te, ne), ee.test(o[0].type) && ye(t.parentNode) || t))) {
						if (o.splice(i, 1), !(e = r.length && xe(o))) return H.apply(n, r), n;
						break
					}
				}
			}
			return (l || f(e, c))(r, t, !E, n, !t || ee.test(e) && ye(t.parentNode) || t), n
		}, d.sortStable = S.split("").sort(j).join("") === S, d.detectDuplicates = !!l, T(), d.sortDetached = ce(function(e) {
			return 1 & e.compareDocumentPosition(C.createElement("fieldset"))
		}), ce(function(e) {
			return e.innerHTML = "<a href='#'></a>", "#" === e.firstChild.getAttribute("href")
		}) || fe("type|href|height|width", function(e, t, n) {
			if (!n) return e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2)
		}), d.attributes && ce(function(e) {
			return e.innerHTML = "<input/>", e.firstChild.setAttribute("value", ""), "" === e.firstChild.getAttribute("value")
		}) || fe("value", function(e, t, n) {
			if (!n && "input" === e.nodeName.toLowerCase()) return e.defaultValue
		}), ce(function(e) {
			return null == e.getAttribute("disabled")
		}) || fe(R, function(e, t, n) {
			var r;
			if (!n) return !0 === e[t] ? t.toLowerCase() : (r = e.getAttributeNode(t)) && r.specified ? r.value : null
		}), se
	}(C);
	S.find = d, S.expr = d.selectors, S.expr[":"] = S.expr.pseudos, S.uniqueSort = S.unique = d.uniqueSort, S.text = d.getText, S.isXMLDoc = d.isXML, S.contains = d.contains, S.escapeSelector = d.escape;
	var h = function(e, t, n) {
			var r = [],
				i = void 0 !== n;
			while ((e = e[t]) && 9 !== e.nodeType)
				if (1 === e.nodeType) {
					if (i && S(e).is(n)) break;
					r.push(e)
				} return r
		},
		T = function(e, t) {
			for (var n = []; e; e = e.nextSibling) 1 === e.nodeType && e !== t && n.push(e);
			return n
		},
		k = S.expr.match.needsContext;

	function A(e, t) {
		return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
	}
	var N = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;

	function j(e, n, r) {
		return m(n) ? S.grep(e, function(e, t) {
			return !!n.call(e, t, e) !== r
		}) : n.nodeType ? S.grep(e, function(e) {
			return e === n !== r
		}) : "string" != typeof n ? S.grep(e, function(e) {
			return -1 < i.call(n, e) !== r
		}) : S.filter(n, e, r)
	}
	S.filter = function(e, t, n) {
		var r = t[0];
		return n && (e = ":not(" + e + ")"), 1 === t.length && 1 === r.nodeType ? S.find.matchesSelector(r, e) ? [r] : [] : S.find.matches(e, S.grep(t, function(e) {
			return 1 === e.nodeType
		}))
	}, S.fn.extend({
		find: function(e) {
			var t, n, r = this.length,
				i = this;
			if ("string" != typeof e) return this.pushStack(S(e).filter(function() {
				for (t = 0; t < r; t++)
					if (S.contains(i[t], this)) return !0
			}));
			for (n = this.pushStack([]), t = 0; t < r; t++) S.find(e, i[t], n);
			return 1 < r ? S.uniqueSort(n) : n
		},
		filter: function(e) {
			return this.pushStack(j(this, e || [], !1))
		},
		not: function(e) {
			return this.pushStack(j(this, e || [], !0))
		},
		is: function(e) {
			return !!j(this, "string" == typeof e && k.test(e) ? S(e) : e || [], !1).length
		}
	});
	var D, q = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;
	(S.fn.init = function(e, t, n) {
		var r, i;
		if (!e) return this;
		if (n = n || D, "string" == typeof e) {
			if (!(r = "<" === e[0] && ">" === e[e.length - 1] && 3 <= e.length ? [null, e, null] : q.exec(e)) || !r[1] && t) return !t || t.jquery ? (t || n).find(e) : this.constructor(t).find(e);
			if (r[1]) {
				if (t = t instanceof S ? t[0] : t, S.merge(this, S.parseHTML(r[1], t && t.nodeType ? t.ownerDocument || t : E, !0)), N.test(r[1]) && S.isPlainObject(t))
					for (r in t) m(this[r]) ? this[r](t[r]) : this.attr(r, t[r]);
				return this
			}
			return (i = E.getElementById(r[2])) && (this[0] = i, this.length = 1), this
		}
		return e.nodeType ? (this[0] = e, this.length = 1, this) : m(e) ? void 0 !== n.ready ? n.ready(e) : e(S) : S.makeArray(e, this)
	}).prototype = S.fn, D = S(E);
	var L = /^(?:parents|prev(?:Until|All))/,
		H = {
			children: !0,
			contents: !0,
			next: !0,
			prev: !0
		};

	function O(e, t) {
		while ((e = e[t]) && 1 !== e.nodeType);
		return e
	}
	S.fn.extend({
		has: function(e) {
			var t = S(e, this),
				n = t.length;
			return this.filter(function() {
				for (var e = 0; e < n; e++)
					if (S.contains(this, t[e])) return !0
			})
		},
		closest: function(e, t) {
			var n, r = 0,
				i = this.length,
				o = [],
				a = "string" != typeof e && S(e);
			if (!k.test(e))
				for (; r < i; r++)
					for (n = this[r]; n && n !== t; n = n.parentNode)
						if (n.nodeType < 11 && (a ? -1 < a.index(n) : 1 === n.nodeType && S.find.matchesSelector(n, e))) {
							o.push(n);
							break
						} return this.pushStack(1 < o.length ? S.uniqueSort(o) : o)
		},
		index: function(e) {
			return e ? "string" == typeof e ? i.call(S(e), this[0]) : i.call(this, e.jquery ? e[0] : e) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
		},
		add: function(e, t) {
			return this.pushStack(S.uniqueSort(S.merge(this.get(), S(e, t))))
		},
		addBack: function(e) {
			return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
		}
	}), S.each({
		parent: function(e) {
			var t = e.parentNode;
			return t && 11 !== t.nodeType ? t : null
		},
		parents: function(e) {
			return h(e, "parentNode")
		},
		parentsUntil: function(e, t, n) {
			return h(e, "parentNode", n)
		},
		next: function(e) {
			return O(e, "nextSibling")
		},
		prev: function(e) {
			return O(e, "previousSibling")
		},
		nextAll: function(e) {
			return h(e, "nextSibling")
		},
		prevAll: function(e) {
			return h(e, "previousSibling")
		},
		nextUntil: function(e, t, n) {
			return h(e, "nextSibling", n)
		},
		prevUntil: function(e, t, n) {
			return h(e, "previousSibling", n)
		},
		siblings: function(e) {
			return T((e.parentNode || {}).firstChild, e)
		},
		children: function(e) {
			return T(e.firstChild)
		},
		contents: function(e) {
			return null != e.contentDocument && r(e.contentDocument) ? e.contentDocument : (A(e, "template") && (e = e.content || e), S.merge([], e.childNodes))
		}
	}, function(r, i) {
		S.fn[r] = function(e, t) {
			var n = S.map(this, i, e);
			return "Until" !== r.slice(-5) && (t = e), t && "string" == typeof t && (n = S.filter(t, n)), 1 < this.length && (H[r] || S.uniqueSort(n), L.test(r) && n.reverse()), this.pushStack(n)
		}
	});
	var P = /[^\x20\t\r\n\f]+/g;

	function R(e) {
		return e
	}

	function M(e) {
		throw e
	}

	function I(e, t, n, r) {
		var i;
		try {
			e && m(i = e.promise) ? i.call(e).done(t).fail(n) : e && m(i = e.then) ? i.call(e, t, n) : t.apply(void 0, [e].slice(r))
		} catch (e) {
			n.apply(void 0, [e])
		}
	}
	S.Callbacks = function(r) {
		var e, n;
		r = "string" == typeof r ? (e = r, n = {}, S.each(e.match(P) || [], function(e, t) {
			n[t] = !0
		}), n) : S.extend({}, r);
		var i, t, o, a, s = [],
			u = [],
			l = -1,
			c = function() {
				for (a = a || r.once, o = i = !0; u.length; l = -1) {
					t = u.shift();
					while (++l < s.length) !1 === s[l].apply(t[0], t[1]) && r.stopOnFalse && (l = s.length, t = !1)
				}
				r.memory || (t = !1), i = !1, a && (s = t ? [] : "")
			},
			f = {
				add: function() {
					return s && (t && !i && (l = s.length - 1, u.push(t)), function n(e) {
						S.each(e, function(e, t) {
							m(t) ? r.unique && f.has(t) || s.push(t) : t && t.length && "string" !== w(t) && n(t)
						})
					}(arguments), t && !i && c()), this
				},
				remove: function() {
					return S.each(arguments, function(e, t) {
						var n;
						while (-1 < (n = S.inArray(t, s, n))) s.splice(n, 1), n <= l && l--
					}), this
				},
				has: function(e) {
					return e ? -1 < S.inArray(e, s) : 0 < s.length
				},
				empty: function() {
					return s && (s = []), this
				},
				disable: function() {
					return a = u = [], s = t = "", this
				},
				disabled: function() {
					return !s
				},
				lock: function() {
					return a = u = [], t || i || (s = t = ""), this
				},
				locked: function() {
					return !!a
				},
				fireWith: function(e, t) {
					return a || (t = [e, (t = t || []).slice ? t.slice() : t], u.push(t), i || c()), this
				},
				fire: function() {
					return f.fireWith(this, arguments), this
				},
				fired: function() {
					return !!o
				}
			};
		return f
	}, S.extend({
		Deferred: function(e) {
			var o = [
					["notify", "progress", S.Callbacks("memory"), S.Callbacks("memory"), 2],
					["resolve", "done", S.Callbacks("once memory"), S.Callbacks("once memory"), 0, "resolved"],
					["reject", "fail", S.Callbacks("once memory"), S.Callbacks("once memory"), 1, "rejected"]
				],
				i = "pending",
				a = {
					state: function() {
						return i
					},
					always: function() {
						return s.done(arguments).fail(arguments), this
					},
					"catch": function(e) {
						return a.then(null, e)
					},
					pipe: function() {
						var i = arguments;
						return S.Deferred(function(r) {
							S.each(o, function(e, t) {
								var n = m(i[t[4]]) && i[t[4]];
								s[t[1]](function() {
									var e = n && n.apply(this, arguments);
									e && m(e.promise) ? e.promise().progress(r.notify).done(r.resolve).fail(r.reject) : r[t[0] + "With"](this, n ? [e] : arguments)
								})
							}), i = null
						}).promise()
					},
					then: function(t, n, r) {
						var u = 0;

						function l(i, o, a, s) {
							return function() {
								var n = this,
									r = arguments,
									e = function() {
										var e, t;
										if (!(i < u)) {
											if ((e = a.apply(n, r)) === o.promise()) throw new TypeError("Thenable self-resolution");
											t = e && ("object" == typeof e || "function" == typeof e) && e.then, m(t) ? s ? t.call(e, l(u, o, R, s), l(u, o, M, s)) : (u++, t.call(e, l(u, o, R, s), l(u, o, M, s), l(u, o, R, o.notifyWith))) : (a !== R && (n = void 0, r = [e]), (s || o.resolveWith)(n, r))
										}
									},
									t = s ? e : function() {
										try {
											e()
										} catch (e) {
											S.Deferred.exceptionHook && S.Deferred.exceptionHook(e, t.stackTrace), u <= i + 1 && (a !== M && (n = void 0, r = [e]), o.rejectWith(n, r))
										}
									};
								i ? t() : (S.Deferred.getStackHook && (t.stackTrace = S.Deferred.getStackHook()), C.setTimeout(t))
							}
						}
						return S.Deferred(function(e) {
							o[0][3].add(l(0, e, m(r) ? r : R, e.notifyWith)), o[1][3].add(l(0, e, m(t) ? t : R)), o[2][3].add(l(0, e, m(n) ? n : M))
						}).promise()
					},
					promise: function(e) {
						return null != e ? S.extend(e, a) : a
					}
				},
				s = {};
			return S.each(o, function(e, t) {
				var n = t[2],
					r = t[5];
				a[t[1]] = n.add, r && n.add(function() {
					i = r
				}, o[3 - e][2].disable, o[3 - e][3].disable, o[0][2].lock, o[0][3].lock), n.add(t[3].fire), s[t[0]] = function() {
					return s[t[0] + "With"](this === s ? void 0 : this, arguments), this
				}, s[t[0] + "With"] = n.fireWith
			}), a.promise(s), e && e.call(s, s), s
		},
		when: function(e) {
			var n = arguments.length,
				t = n,
				r = Array(t),
				i = s.call(arguments),
				o = S.Deferred(),
				a = function(t) {
					return function(e) {
						r[t] = this, i[t] = 1 < arguments.length ? s.call(arguments) : e, --n || o.resolveWith(r, i)
					}
				};
			if (n <= 1 && (I(e, o.done(a(t)).resolve, o.reject, !n), "pending" === o.state() || m(i[t] && i[t].then))) return o.then();
			while (t--) I(i[t], a(t), o.reject);
			return o.promise()
		}
	});
	var W = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
	S.Deferred.exceptionHook = function(e, t) {
		C.console && C.console.warn && e && W.test(e.name) && C.console.warn("jQuery.Deferred exception: " + e.message, e.stack, t)
	}, S.readyException = function(e) {
		C.setTimeout(function() {
			throw e
		})
	};
	var F = S.Deferred();

	function B() {
		E.removeEventListener("DOMContentLoaded", B), C.removeEventListener("load", B), S.ready()
	}
	S.fn.ready = function(e) {
		return F.then(e)["catch"](function(e) {
			S.readyException(e)
		}), this
	}, S.extend({
		isReady: !1,
		readyWait: 1,
		ready: function(e) {
			(!0 === e ? --S.readyWait : S.isReady) || (S.isReady = !0) !== e && 0 < --S.readyWait || F.resolveWith(E, [S])
		}
	}), S.ready.then = F.then, "complete" === E.readyState || "loading" !== E.readyState && !E.documentElement.doScroll ? C.setTimeout(S.ready) : (E.addEventListener("DOMContentLoaded", B), C.addEventListener("load", B));
	var $ = function(e, t, n, r, i, o, a) {
			var s = 0,
				u = e.length,
				l = null == n;
			if ("object" === w(n))
				for (s in i = !0, n) $(e, t, s, n[s], !0, o, a);
			else if (void 0 !== r && (i = !0, m(r) || (a = !0), l && (a ? (t.call(e, r), t = null) : (l = t, t = function(e, t, n) {
					return l.call(S(e), n)
				})), t))
				for (; s < u; s++) t(e[s], n, a ? r : r.call(e[s], s, t(e[s], n)));
			return i ? e : l ? t.call(e) : u ? t(e[0], n) : o
		},
		_ = /^-ms-/,
		z = /-([a-z])/g;

	function U(e, t) {
		return t.toUpperCase()
	}

	function X(e) {
		return e.replace(_, "ms-").replace(z, U)
	}
	var V = function(e) {
		return 1 === e.nodeType || 9 === e.nodeType || !+e.nodeType
	};

	function G() {
		this.expando = S.expando + G.uid++
	}
	G.uid = 1, G.prototype = {
		cache: function(e) {
			var t = e[this.expando];
			return t || (t = {}, V(e) && (e.nodeType ? e[this.expando] = t : Object.defineProperty(e, this.expando, {
				value: t,
				configurable: !0
			}))), t
		},
		set: function(e, t, n) {
			var r, i = this.cache(e);
			if ("string" == typeof t) i[X(t)] = n;
			else
				for (r in t) i[X(r)] = t[r];
			return i
		},
		get: function(e, t) {
			return void 0 === t ? this.cache(e) : e[this.expando] && e[this.expando][X(t)]
		},
		access: function(e, t, n) {
			return void 0 === t || t && "string" == typeof t && void 0 === n ? this.get(e, t) : (this.set(e, t, n), void 0 !== n ? n : t)
		},
		remove: function(e, t) {
			var n, r = e[this.expando];
			if (void 0 !== r) {
				if (void 0 !== t) {
					n = (t = Array.isArray(t) ? t.map(X) : (t = X(t)) in r ? [t] : t.match(P) || []).length;
					while (n--) delete r[t[n]]
				}(void 0 === t || S.isEmptyObject(r)) && (e.nodeType ? e[this.expando] = void 0 : delete e[this.expando])
			}
		},
		hasData: function(e) {
			var t = e[this.expando];
			return void 0 !== t && !S.isEmptyObject(t)
		}
	};
	var Y = new G,
		Q = new G,
		J = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
		K = /[A-Z]/g;

	function Z(e, t, n) {
		var r, i;
		if (void 0 === n && 1 === e.nodeType)
			if (r = "data-" + t.replace(K, "-$&").toLowerCase(), "string" == typeof(n = e.getAttribute(r))) {
				try {
					n = "true" === (i = n) || "false" !== i && ("null" === i ? null : i === +i + "" ? +i : J.test(i) ? JSON.parse(i) : i)
				} catch (e) {}
				Q.set(e, t, n)
			} else n = void 0;
		return n
	}
	S.extend({
		hasData: function(e) {
			return Q.hasData(e) || Y.hasData(e)
		},
		data: function(e, t, n) {
			return Q.access(e, t, n)
		},
		removeData: function(e, t) {
			Q.remove(e, t)
		},
		_data: function(e, t, n) {
			return Y.access(e, t, n)
		},
		_removeData: function(e, t) {
			Y.remove(e, t)
		}
	}), S.fn.extend({
		data: function(n, e) {
			var t, r, i, o = this[0],
				a = o && o.attributes;
			if (void 0 === n) {
				if (this.length && (i = Q.get(o), 1 === o.nodeType && !Y.get(o, "hasDataAttrs"))) {
					t = a.length;
					while (t--) a[t] && 0 === (r = a[t].name).indexOf("data-") && (r = X(r.slice(5)), Z(o, r, i[r]));
					Y.set(o, "hasDataAttrs", !0)
				}
				return i
			}
			return "object" == typeof n ? this.each(function() {
				Q.set(this, n)
			}) : $(this, function(e) {
				var t;
				if (o && void 0 === e) return void 0 !== (t = Q.get(o, n)) ? t : void 0 !== (t = Z(o, n)) ? t : void 0;
				this.each(function() {
					Q.set(this, n, e)
				})
			}, null, e, 1 < arguments.length, null, !0)
		},
		removeData: function(e) {
			return this.each(function() {
				Q.remove(this, e)
			})
		}
	}), S.extend({
		queue: function(e, t, n) {
			var r;
			if (e) return t = (t || "fx") + "queue", r = Y.get(e, t), n && (!r || Array.isArray(n) ? r = Y.access(e, t, S.makeArray(n)) : r.push(n)), r || []
		},
		dequeue: function(e, t) {
			t = t || "fx";
			var n = S.queue(e, t),
				r = n.length,
				i = n.shift(),
				o = S._queueHooks(e, t);
			"inprogress" === i && (i = n.shift(), r--), i && ("fx" === t && n.unshift("inprogress"), delete o.stop, i.call(e, function() {
				S.dequeue(e, t)
			}, o)), !r && o && o.empty.fire()
		},
		_queueHooks: function(e, t) {
			var n = t + "queueHooks";
			return Y.get(e, n) || Y.access(e, n, {
				empty: S.Callbacks("once memory").add(function() {
					Y.remove(e, [t + "queue", n])
				})
			})
		}
	}), S.fn.extend({
		queue: function(t, n) {
			var e = 2;
			return "string" != typeof t && (n = t, t = "fx", e--), arguments.length < e ? S.queue(this[0], t) : void 0 === n ? this : this.each(function() {
				var e = S.queue(this, t, n);
				S._queueHooks(this, t), "fx" === t && "inprogress" !== e[0] && S.dequeue(this, t)
			})
		},
		dequeue: function(e) {
			return this.each(function() {
				S.dequeue(this, e)
			})
		},
		clearQueue: function(e) {
			return this.queue(e || "fx", [])
		},
		promise: function(e, t) {
			var n, r = 1,
				i = S.Deferred(),
				o = this,
				a = this.length,
				s = function() {
					--r || i.resolveWith(o, [o])
				};
			"string" != typeof e && (t = e, e = void 0), e = e || "fx";
			while (a--)(n = Y.get(o[a], e + "queueHooks")) && n.empty && (r++, n.empty.add(s));
			return s(), i.promise(t)
		}
	});
	var ee = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
		te = new RegExp("^(?:([+-])=|)(" + ee + ")([a-z%]*)$", "i"),
		ne = ["Top", "Right", "Bottom", "Left"],
		re = E.documentElement,
		ie = function(e) {
			return S.contains(e.ownerDocument, e)
		},
		oe = {
			composed: !0
		};
	re.getRootNode && (ie = function(e) {
		return S.contains(e.ownerDocument, e) || e.getRootNode(oe) === e.ownerDocument
	});
	var ae = function(e, t) {
		return "none" === (e = t || e).style.display || "" === e.style.display && ie(e) && "none" === S.css(e, "display")
	};

	function se(e, t, n, r) {
		var i, o, a = 20,
			s = r ? function() {
				return r.cur()
			} : function() {
				return S.css(e, t, "")
			},
			u = s(),
			l = n && n[3] || (S.cssNumber[t] ? "" : "px"),
			c = e.nodeType && (S.cssNumber[t] || "px" !== l && +u) && te.exec(S.css(e, t));
		if (c && c[3] !== l) {
			u /= 2, l = l || c[3], c = +u || 1;
			while (a--) S.style(e, t, c + l), (1 - o) * (1 - (o = s() / u || .5)) <= 0 && (a = 0), c /= o;
			c *= 2, S.style(e, t, c + l), n = n || []
		}
		return n && (c = +c || +u || 0, i = n[1] ? c + (n[1] + 1) * n[2] : +n[2], r && (r.unit = l, r.start = c, r.end = i)), i
	}
	var ue = {};

	function le(e, t) {
		for (var n, r, i, o, a, s, u, l = [], c = 0, f = e.length; c < f; c++)(r = e[c]).style && (n = r.style.display, t ? ("none" === n && (l[c] = Y.get(r, "display") || null, l[c] || (r.style.display = "")), "" === r.style.display && ae(r) && (l[c] = (u = a = o = void 0, a = (i = r).ownerDocument, s = i.nodeName, (u = ue[s]) || (o = a.body.appendChild(a.createElement(s)), u = S.css(o, "display"), o.parentNode.removeChild(o), "none" === u && (u = "block"), ue[s] = u)))) : "none" !== n && (l[c] = "none", Y.set(r, "display", n)));
		for (c = 0; c < f; c++) null != l[c] && (e[c].style.display = l[c]);
		return e
	}
	S.fn.extend({
		show: function() {
			return le(this, !0)
		},
		hide: function() {
			return le(this)
		},
		toggle: function(e) {
			return "boolean" == typeof e ? e ? this.show() : this.hide() : this.each(function() {
				ae(this) ? S(this).show() : S(this).hide()
			})
		}
	});
	var ce, fe, pe = /^(?:checkbox|radio)$/i,
		de = /<([a-z][^\/\0>\x20\t\r\n\f]*)/i,
		he = /^$|^module$|\/(?:java|ecma)script/i;
	ce = E.createDocumentFragment().appendChild(E.createElement("div")), (fe = E.createElement("input")).setAttribute("type", "radio"), fe.setAttribute("checked", "checked"), fe.setAttribute("name", "t"), ce.appendChild(fe), y.checkClone = ce.cloneNode(!0).cloneNode(!0).lastChild.checked, ce.innerHTML = "<textarea>x</textarea>", y.noCloneChecked = !!ce.cloneNode(!0).lastChild.defaultValue, ce.innerHTML = "<option></option>", y.option = !!ce.lastChild;
	var ge = {
		thead: [1, "<table>", "</table>"],
		col: [2, "<table><colgroup>", "</colgroup></table>"],
		tr: [2, "<table><tbody>", "</tbody></table>"],
		td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
		_default: [0, "", ""]
	};

	function ve(e, t) {
		var n;
		return n = "undefined" != typeof e.getElementsByTagName ? e.getElementsByTagName(t || "*") : "undefined" != typeof e.querySelectorAll ? e.querySelectorAll(t || "*") : [], void 0 === t || t && A(e, t) ? S.merge([e], n) : n
	}

	function ye(e, t) {
		for (var n = 0, r = e.length; n < r; n++) Y.set(e[n], "globalEval", !t || Y.get(t[n], "globalEval"))
	}
	ge.tbody = ge.tfoot = ge.colgroup = ge.caption = ge.thead, ge.th = ge.td, y.option || (ge.optgroup = ge.option = [1, "<select multiple='multiple'>", "</select>"]);
	var me = /<|&#?\w+;/;

	function xe(e, t, n, r, i) {
		for (var o, a, s, u, l, c, f = t.createDocumentFragment(), p = [], d = 0, h = e.length; d < h; d++)
			if ((o = e[d]) || 0 === o)
				if ("object" === w(o)) S.merge(p, o.nodeType ? [o] : o);
				else if (me.test(o)) {
			a = a || f.appendChild(t.createElement("div")), s = (de.exec(o) || ["", ""])[1].toLowerCase(), u = ge[s] || ge._default, a.innerHTML = u[1] + S.htmlPrefilter(o) + u[2], c = u[0];
			while (c--) a = a.lastChild;
			S.merge(p, a.childNodes), (a = f.firstChild).textContent = ""
		} else p.push(t.createTextNode(o));
		f.textContent = "", d = 0;
		while (o = p[d++])
			if (r && -1 < S.inArray(o, r)) i && i.push(o);
			else if (l = ie(o), a = ve(f.appendChild(o), "script"), l && ye(a), n) {
			c = 0;
			while (o = a[c++]) he.test(o.type || "") && n.push(o)
		}
		return f
	}
	var be = /^([^.]*)(?:\.(.+)|)/;

	function we() {
		return !0
	}

	function Te() {
		return !1
	}

	function Ce(e, t) {
		return e === function() {
			try {
				return E.activeElement
			} catch (e) {}
		}() == ("focus" === t)
	}

	function Ee(e, t, n, r, i, o) {
		var a, s;
		if ("object" == typeof t) {
			for (s in "string" != typeof n && (r = r || n, n = void 0), t) Ee(e, s, n, r, t[s], o);
			return e
		}
		if (null == r && null == i ? (i = n, r = n = void 0) : null == i && ("string" == typeof n ? (i = r, r = void 0) : (i = r, r = n, n = void 0)), !1 === i) i = Te;
		else if (!i) return e;
		return 1 === o && (a = i, (i = function(e) {
			return S().off(e), a.apply(this, arguments)
		}).guid = a.guid || (a.guid = S.guid++)), e.each(function() {
			S.event.add(this, t, i, r, n)
		})
	}

	function Se(e, i, o) {
		o ? (Y.set(e, i, !1), S.event.add(e, i, {
			namespace: !1,
			handler: function(e) {
				var t, n, r = Y.get(this, i);
				if (1 & e.isTrigger && this[i]) {
					if (r.length)(S.event.special[i] || {}).delegateType && e.stopPropagation();
					else if (r = s.call(arguments), Y.set(this, i, r), t = o(this, i), this[i](), r !== (n = Y.get(this, i)) || t ? Y.set(this, i, !1) : n = {}, r !== n) return e.stopImmediatePropagation(), e.preventDefault(), n && n.value
				} else r.length && (Y.set(this, i, {
					value: S.event.trigger(S.extend(r[0], S.Event.prototype), r.slice(1), this)
				}), e.stopImmediatePropagation())
			}
		})) : void 0 === Y.get(e, i) && S.event.add(e, i, we)
	}
	S.event = {
		global: {},
		add: function(t, e, n, r, i) {
			var o, a, s, u, l, c, f, p, d, h, g, v = Y.get(t);
			if (V(t)) {
				n.handler && (n = (o = n).handler, i = o.selector), i && S.find.matchesSelector(re, i), n.guid || (n.guid = S.guid++), (u = v.events) || (u = v.events = Object.create(null)), (a = v.handle) || (a = v.handle = function(e) {
					return "undefined" != typeof S && S.event.triggered !== e.type ? S.event.dispatch.apply(t, arguments) : void 0
				}), l = (e = (e || "").match(P) || [""]).length;
				while (l--) d = g = (s = be.exec(e[l]) || [])[1], h = (s[2] || "").split(".").sort(), d && (f = S.event.special[d] || {}, d = (i ? f.delegateType : f.bindType) || d, f = S.event.special[d] || {}, c = S.extend({
					type: d,
					origType: g,
					data: r,
					handler: n,
					guid: n.guid,
					selector: i,
					needsContext: i && S.expr.match.needsContext.test(i),
					namespace: h.join(".")
				}, o), (p = u[d]) || ((p = u[d] = []).delegateCount = 0, f.setup && !1 !== f.setup.call(t, r, h, a) || t.addEventListener && t.addEventListener(d, a)), f.add && (f.add.call(t, c), c.handler.guid || (c.handler.guid = n.guid)), i ? p.splice(p.delegateCount++, 0, c) : p.push(c), S.event.global[d] = !0)
			}
		},
		remove: function(e, t, n, r, i) {
			var o, a, s, u, l, c, f, p, d, h, g, v = Y.hasData(e) && Y.get(e);
			if (v && (u = v.events)) {
				l = (t = (t || "").match(P) || [""]).length;
				while (l--)
					if (d = g = (s = be.exec(t[l]) || [])[1], h = (s[2] || "").split(".").sort(), d) {
						f = S.event.special[d] || {}, p = u[d = (r ? f.delegateType : f.bindType) || d] || [], s = s[2] && new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)"), a = o = p.length;
						while (o--) c = p[o], !i && g !== c.origType || n && n.guid !== c.guid || s && !s.test(c.namespace) || r && r !== c.selector && ("**" !== r || !c.selector) || (p.splice(o, 1), c.selector && p.delegateCount--, f.remove && f.remove.call(e, c));
						a && !p.length && (f.teardown && !1 !== f.teardown.call(e, h, v.handle) || S.removeEvent(e, d, v.handle), delete u[d])
					} else
						for (d in u) S.event.remove(e, d + t[l], n, r, !0);
				S.isEmptyObject(u) && Y.remove(e, "handle events")
			}
		},
		dispatch: function(e) {
			var t, n, r, i, o, a, s = new Array(arguments.length),
				u = S.event.fix(e),
				l = (Y.get(this, "events") || Object.create(null))[u.type] || [],
				c = S.event.special[u.type] || {};
			for (s[0] = u, t = 1; t < arguments.length; t++) s[t] = arguments[t];
			if (u.delegateTarget = this, !c.preDispatch || !1 !== c.preDispatch.call(this, u)) {
				a = S.event.handlers.call(this, u, l), t = 0;
				while ((i = a[t++]) && !u.isPropagationStopped()) {
					u.currentTarget = i.elem, n = 0;
					while ((o = i.handlers[n++]) && !u.isImmediatePropagationStopped()) u.rnamespace && !1 !== o.namespace && !u.rnamespace.test(o.namespace) || (u.handleObj = o, u.data = o.data, void 0 !== (r = ((S.event.special[o.origType] || {}).handle || o.handler).apply(i.elem, s)) && !1 === (u.result = r) && (u.preventDefault(), u.stopPropagation()))
				}
				return c.postDispatch && c.postDispatch.call(this, u), u.result
			}
		},
		handlers: function(e, t) {
			var n, r, i, o, a, s = [],
				u = t.delegateCount,
				l = e.target;
			if (u && l.nodeType && !("click" === e.type && 1 <= e.button))
				for (; l !== this; l = l.parentNode || this)
					if (1 === l.nodeType && ("click" !== e.type || !0 !== l.disabled)) {
						for (o = [], a = {}, n = 0; n < u; n++) void 0 === a[i = (r = t[n]).selector + " "] && (a[i] = r.needsContext ? -1 < S(i, this).index(l) : S.find(i, this, null, [l]).length), a[i] && o.push(r);
						o.length && s.push({
							elem: l,
							handlers: o
						})
					} return l = this, u < t.length && s.push({
				elem: l,
				handlers: t.slice(u)
			}), s
		},
		addProp: function(t, e) {
			Object.defineProperty(S.Event.prototype, t, {
				enumerable: !0,
				configurable: !0,
				get: m(e) ? function() {
					if (this.originalEvent) return e(this.originalEvent)
				} : function() {
					if (this.originalEvent) return this.originalEvent[t]
				},
				set: function(e) {
					Object.defineProperty(this, t, {
						enumerable: !0,
						configurable: !0,
						writable: !0,
						value: e
					})
				}
			})
		},
		fix: function(e) {
			return e[S.expando] ? e : new S.Event(e)
		},
		special: {
			load: {
				noBubble: !0
			},
			click: {
				setup: function(e) {
					var t = this || e;
					return pe.test(t.type) && t.click && A(t, "input") && Se(t, "click", we), !1
				},
				trigger: function(e) {
					var t = this || e;
					return pe.test(t.type) && t.click && A(t, "input") && Se(t, "click"), !0
				},
				_default: function(e) {
					var t = e.target;
					return pe.test(t.type) && t.click && A(t, "input") && Y.get(t, "click") || A(t, "a")
				}
			},
			beforeunload: {
				postDispatch: function(e) {
					void 0 !== e.result && e.originalEvent && (e.originalEvent.returnValue = e.result)
				}
			}
		}
	}, S.removeEvent = function(e, t, n) {
		e.removeEventListener && e.removeEventListener(t, n)
	}, S.Event = function(e, t) {
		if (!(this instanceof S.Event)) return new S.Event(e, t);
		e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || void 0 === e.defaultPrevented && !1 === e.returnValue ? we : Te, this.target = e.target && 3 === e.target.nodeType ? e.target.parentNode : e.target, this.currentTarget = e.currentTarget, this.relatedTarget = e.relatedTarget) : this.type = e, t && S.extend(this, t), this.timeStamp = e && e.timeStamp || Date.now(), this[S.expando] = !0
	}, S.Event.prototype = {
		constructor: S.Event,
		isDefaultPrevented: Te,
		isPropagationStopped: Te,
		isImmediatePropagationStopped: Te,
		isSimulated: !1,
		preventDefault: function() {
			var e = this.originalEvent;
			this.isDefaultPrevented = we, e && !this.isSimulated && e.preventDefault()
		},
		stopPropagation: function() {
			var e = this.originalEvent;
			this.isPropagationStopped = we, e && !this.isSimulated && e.stopPropagation()
		},
		stopImmediatePropagation: function() {
			var e = this.originalEvent;
			this.isImmediatePropagationStopped = we, e && !this.isSimulated && e.stopImmediatePropagation(), this.stopPropagation()
		}
	}, S.each({
		altKey: !0,
		bubbles: !0,
		cancelable: !0,
		changedTouches: !0,
		ctrlKey: !0,
		detail: !0,
		eventPhase: !0,
		metaKey: !0,
		pageX: !0,
		pageY: !0,
		shiftKey: !0,
		view: !0,
		"char": !0,
		code: !0,
		charCode: !0,
		key: !0,
		keyCode: !0,
		button: !0,
		buttons: !0,
		clientX: !0,
		clientY: !0,
		offsetX: !0,
		offsetY: !0,
		pointerId: !0,
		pointerType: !0,
		screenX: !0,
		screenY: !0,
		targetTouches: !0,
		toElement: !0,
		touches: !0,
		which: !0
	}, S.event.addProp), S.each({
		focus: "focusin",
		blur: "focusout"
	}, function(e, t) {
		S.event.special[e] = {
			setup: function() {
				return Se(this, e, Ce), !1
			},
			trigger: function() {
				return Se(this, e), !0
			},
			_default: function() {
				return !0
			},
			delegateType: t
		}
	}), S.each({
		mouseenter: "mouseover",
		mouseleave: "mouseout",
		pointerenter: "pointerover",
		pointerleave: "pointerout"
	}, function(e, i) {
		S.event.special[e] = {
			delegateType: i,
			bindType: i,
			handle: function(e) {
				var t, n = e.relatedTarget,
					r = e.handleObj;
				return n && (n === this || S.contains(this, n)) || (e.type = r.origType, t = r.handler.apply(this, arguments), e.type = i), t
			}
		}
	}), S.fn.extend({
		on: function(e, t, n, r) {
			return Ee(this, e, t, n, r)
		},
		one: function(e, t, n, r) {
			return Ee(this, e, t, n, r, 1)
		},
		off: function(e, t, n) {
			var r, i;
			if (e && e.preventDefault && e.handleObj) return r = e.handleObj, S(e.delegateTarget).off(r.namespace ? r.origType + "." + r.namespace : r.origType, r.selector, r.handler), this;
			if ("object" == typeof e) {
				for (i in e) this.off(i, t, e[i]);
				return this
			}
			return !1 !== t && "function" != typeof t || (n = t, t = void 0), !1 === n && (n = Te), this.each(function() {
				S.event.remove(this, e, n, t)
			})
		}
	});
	var ke = /<script|<style|<link/i,
		Ae = /checked\s*(?:[^=]|=\s*.checked.)/i,
		Ne = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

	function je(e, t) {
		return A(e, "table") && A(11 !== t.nodeType ? t : t.firstChild, "tr") && S(e).children("tbody")[0] || e
	}

	function De(e) {
		return e.type = (null !== e.getAttribute("type")) + "/" + e.type, e
	}

	function qe(e) {
		return "true/" === (e.type || "").slice(0, 5) ? e.type = e.type.slice(5) : e.removeAttribute("type"), e
	}

	function Le(e, t) {
		var n, r, i, o, a, s;
		if (1 === t.nodeType) {
			if (Y.hasData(e) && (s = Y.get(e).events))
				for (i in Y.remove(t, "handle events"), s)
					for (n = 0, r = s[i].length; n < r; n++) S.event.add(t, i, s[i][n]);
			Q.hasData(e) && (o = Q.access(e), a = S.extend({}, o), Q.set(t, a))
		}
	}

	function He(n, r, i, o) {
		r = g(r);
		var e, t, a, s, u, l, c = 0,
			f = n.length,
			p = f - 1,
			d = r[0],
			h = m(d);
		if (h || 1 < f && "string" == typeof d && !y.checkClone && Ae.test(d)) return n.each(function(e) {
			var t = n.eq(e);
			h && (r[0] = d.call(this, e, t.html())), He(t, r, i, o)
		});
		if (f && (t = (e = xe(r, n[0].ownerDocument, !1, n, o)).firstChild, 1 === e.childNodes.length && (e = t), t || o)) {
			for (s = (a = S.map(ve(e, "script"), De)).length; c < f; c++) u = e, c !== p && (u = S.clone(u, !0, !0), s && S.merge(a, ve(u, "script"))), i.call(n[c], u, c);
			if (s)
				for (l = a[a.length - 1].ownerDocument, S.map(a, qe), c = 0; c < s; c++) u = a[c], he.test(u.type || "") && !Y.access(u, "globalEval") && S.contains(l, u) && (u.src && "module" !== (u.type || "").toLowerCase() ? S._evalUrl && !u.noModule && S._evalUrl(u.src, {
					nonce: u.nonce || u.getAttribute("nonce")
				}, l) : b(u.textContent.replace(Ne, ""), u, l))
		}
		return n
	}

	function Oe(e, t, n) {
		for (var r, i = t ? S.filter(t, e) : e, o = 0; null != (r = i[o]); o++) n || 1 !== r.nodeType || S.cleanData(ve(r)), r.parentNode && (n && ie(r) && ye(ve(r, "script")), r.parentNode.removeChild(r));
		return e
	}
	S.extend({
		htmlPrefilter: function(e) {
			return e
		},
		clone: function(e, t, n) {
			var r, i, o, a, s, u, l, c = e.cloneNode(!0),
				f = ie(e);
			if (!(y.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || S.isXMLDoc(e)))
				for (a = ve(c), r = 0, i = (o = ve(e)).length; r < i; r++) s = o[r], u = a[r], void 0, "input" === (l = u.nodeName.toLowerCase()) && pe.test(s.type) ? u.checked = s.checked : "input" !== l && "textarea" !== l || (u.defaultValue = s.defaultValue);
			if (t)
				if (n)
					for (o = o || ve(e), a = a || ve(c), r = 0, i = o.length; r < i; r++) Le(o[r], a[r]);
				else Le(e, c);
			return 0 < (a = ve(c, "script")).length && ye(a, !f && ve(e, "script")), c
		},
		cleanData: function(e) {
			for (var t, n, r, i = S.event.special, o = 0; void 0 !== (n = e[o]); o++)
				if (V(n)) {
					if (t = n[Y.expando]) {
						if (t.events)
							for (r in t.events) i[r] ? S.event.remove(n, r) : S.removeEvent(n, r, t.handle);
						n[Y.expando] = void 0
					}
					n[Q.expando] && (n[Q.expando] = void 0)
				}
		}
	}), S.fn.extend({
		detach: function(e) {
			return Oe(this, e, !0)
		},
		remove: function(e) {
			return Oe(this, e)
		},
		text: function(e) {
			return $(this, function(e) {
				return void 0 === e ? S.text(this) : this.empty().each(function() {
					1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || (this.textContent = e)
				})
			}, null, e, arguments.length)
		},
		append: function() {
			return He(this, arguments, function(e) {
				1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || je(this, e).appendChild(e)
			})
		},
		prepend: function() {
			return He(this, arguments, function(e) {
				if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
					var t = je(this, e);
					t.insertBefore(e, t.firstChild)
				}
			})
		},
		before: function() {
			return He(this, arguments, function(e) {
				this.parentNode && this.parentNode.insertBefore(e, this)
			})
		},
		after: function() {
			return He(this, arguments, function(e) {
				this.parentNode && this.parentNode.insertBefore(e, this.nextSibling)
			})
		},
		empty: function() {
			for (var e, t = 0; null != (e = this[t]); t++) 1 === e.nodeType && (S.cleanData(ve(e, !1)), e.textContent = "");
			return this
		},
		clone: function(e, t) {
			return e = null != e && e, t = null == t ? e : t, this.map(function() {
				return S.clone(this, e, t)
			})
		},
		html: function(e) {
			return $(this, function(e) {
				var t = this[0] || {},
					n = 0,
					r = this.length;
				if (void 0 === e && 1 === t.nodeType) return t.innerHTML;
				if ("string" == typeof e && !ke.test(e) && !ge[(de.exec(e) || ["", ""])[1].toLowerCase()]) {
					e = S.htmlPrefilter(e);
					try {
						for (; n < r; n++) 1 === (t = this[n] || {}).nodeType && (S.cleanData(ve(t, !1)), t.innerHTML = e);
						t = 0
					} catch (e) {}
				}
				t && this.empty().append(e)
			}, null, e, arguments.length)
		},
		replaceWith: function() {
			var n = [];
			return He(this, arguments, function(e) {
				var t = this.parentNode;
				S.inArray(this, n) < 0 && (S.cleanData(ve(this)), t && t.replaceChild(e, this))
			}, n)
		}
	}), S.each({
		appendTo: "append",
		prependTo: "prepend",
		insertBefore: "before",
		insertAfter: "after",
		replaceAll: "replaceWith"
	}, function(e, a) {
		S.fn[e] = function(e) {
			for (var t, n = [], r = S(e), i = r.length - 1, o = 0; o <= i; o++) t = o === i ? this : this.clone(!0), S(r[o])[a](t), u.apply(n, t.get());
			return this.pushStack(n)
		}
	});
	var Pe = new RegExp("^(" + ee + ")(?!px)[a-z%]+$", "i"),
		Re = function(e) {
			var t = e.ownerDocument.defaultView;
			return t && t.opener || (t = C), t.getComputedStyle(e)
		},
		Me = function(e, t, n) {
			var r, i, o = {};
			for (i in t) o[i] = e.style[i], e.style[i] = t[i];
			for (i in r = n.call(e), t) e.style[i] = o[i];
			return r
		},
		Ie = new RegExp(ne.join("|"), "i");

	function We(e, t, n) {
		var r, i, o, a, s = e.style;
		return (n = n || Re(e)) && ("" !== (a = n.getPropertyValue(t) || n[t]) || ie(e) || (a = S.style(e, t)), !y.pixelBoxStyles() && Pe.test(a) && Ie.test(t) && (r = s.width, i = s.minWidth, o = s.maxWidth, s.minWidth = s.maxWidth = s.width = a, a = n.width, s.width = r, s.minWidth = i, s.maxWidth = o)), void 0 !== a ? a + "" : a
	}

	function Fe(e, t) {
		return {
			get: function() {
				if (!e()) return (this.get = t).apply(this, arguments);
				delete this.get
			}
		}
	}! function() {
		function e() {
			if (l) {
				u.style.cssText = "position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0", l.style.cssText = "position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%", re.appendChild(u).appendChild(l);
				var e = C.getComputedStyle(l);
				n = "1%" !== e.top, s = 12 === t(e.marginLeft), l.style.right = "60%", o = 36 === t(e.right), r = 36 === t(e.width), l.style.position = "absolute", i = 12 === t(l.offsetWidth / 3), re.removeChild(u), l = null
			}
		}

		function t(e) {
			return Math.round(parseFloat(e))
		}
		var n, r, i, o, a, s, u = E.createElement("div"),
			l = E.createElement("div");
		l.style && (l.style.backgroundClip = "content-box", l.cloneNode(!0).style.backgroundClip = "", y.clearCloneStyle = "content-box" === l.style.backgroundClip, S.extend(y, {
			boxSizingReliable: function() {
				return e(), r
			},
			pixelBoxStyles: function() {
				return e(), o
			},
			pixelPosition: function() {
				return e(), n
			},
			reliableMarginLeft: function() {
				return e(), s
			},
			scrollboxSize: function() {
				return e(), i
			},
			reliableTrDimensions: function() {
				var e, t, n, r;
				return null == a && (e = E.createElement("table"), t = E.createElement("tr"), n = E.createElement("div"), e.style.cssText = "position:absolute;left:-11111px;border-collapse:separate", t.style.cssText = "border:1px solid", t.style.height = "1px", n.style.height = "9px", n.style.display = "block", re.appendChild(e).appendChild(t).appendChild(n), r = C.getComputedStyle(t), a = parseInt(r.height, 10) + parseInt(r.borderTopWidth, 10) + parseInt(r.borderBottomWidth, 10) === t.offsetHeight, re.removeChild(e)), a
			}
		}))
	}();
	var Be = ["Webkit", "Moz", "ms"],
		$e = E.createElement("div").style,
		_e = {};

	function ze(e) {
		var t = S.cssProps[e] || _e[e];
		return t || (e in $e ? e : _e[e] = function(e) {
			var t = e[0].toUpperCase() + e.slice(1),
				n = Be.length;
			while (n--)
				if ((e = Be[n] + t) in $e) return e
		}(e) || e)
	}
	var Ue = /^(none|table(?!-c[ea]).+)/,
		Xe = /^--/,
		Ve = {
			position: "absolute",
			visibility: "hidden",
			display: "block"
		},
		Ge = {
			letterSpacing: "0",
			fontWeight: "400"
		};

	function Ye(e, t, n) {
		var r = te.exec(t);
		return r ? Math.max(0, r[2] - (n || 0)) + (r[3] || "px") : t
	}

	function Qe(e, t, n, r, i, o) {
		var a = "width" === t ? 1 : 0,
			s = 0,
			u = 0;
		if (n === (r ? "border" : "content")) return 0;
		for (; a < 4; a += 2) "margin" === n && (u += S.css(e, n + ne[a], !0, i)), r ? ("content" === n && (u -= S.css(e, "padding" + ne[a], !0, i)), "margin" !== n && (u -= S.css(e, "border" + ne[a] + "Width", !0, i))) : (u += S.css(e, "padding" + ne[a], !0, i), "padding" !== n ? u += S.css(e, "border" + ne[a] + "Width", !0, i) : s += S.css(e, "border" + ne[a] + "Width", !0, i));
		return !r && 0 <= o && (u += Math.max(0, Math.ceil(e["offset" + t[0].toUpperCase() + t.slice(1)] - o - u - s - .5)) || 0), u
	}

	function Je(e, t, n) {
		var r = Re(e),
			i = (!y.boxSizingReliable() || n) && "border-box" === S.css(e, "boxSizing", !1, r),
			o = i,
			a = We(e, t, r),
			s = "offset" + t[0].toUpperCase() + t.slice(1);
		if (Pe.test(a)) {
			if (!n) return a;
			a = "auto"
		}
		return (!y.boxSizingReliable() && i || !y.reliableTrDimensions() && A(e, "tr") || "auto" === a || !parseFloat(a) && "inline" === S.css(e, "display", !1, r)) && e.getClientRects().length && (i = "border-box" === S.css(e, "boxSizing", !1, r), (o = s in e) && (a = e[s])), (a = parseFloat(a) || 0) + Qe(e, t, n || (i ? "border" : "content"), o, r, a) + "px"
	}

	function Ke(e, t, n, r, i) {
		return new Ke.prototype.init(e, t, n, r, i)
	}
	S.extend({
		cssHooks: {
			opacity: {
				get: function(e, t) {
					if (t) {
						var n = We(e, "opacity");
						return "" === n ? "1" : n
					}
				}
			}
		},
		cssNumber: {
			animationIterationCount: !0,
			columnCount: !0,
			fillOpacity: !0,
			flexGrow: !0,
			flexShrink: !0,
			fontWeight: !0,
			gridArea: !0,
			gridColumn: !0,
			gridColumnEnd: !0,
			gridColumnStart: !0,
			gridRow: !0,
			gridRowEnd: !0,
			gridRowStart: !0,
			lineHeight: !0,
			opacity: !0,
			order: !0,
			orphans: !0,
			widows: !0,
			zIndex: !0,
			zoom: !0
		},
		cssProps: {},
		style: function(e, t, n, r) {
			if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
				var i, o, a, s = X(t),
					u = Xe.test(t),
					l = e.style;
				if (u || (t = ze(s)), a = S.cssHooks[t] || S.cssHooks[s], void 0 === n) return a && "get" in a && void 0 !== (i = a.get(e, !1, r)) ? i : l[t];
				"string" === (o = typeof n) && (i = te.exec(n)) && i[1] && (n = se(e, t, i), o = "number"), null != n && n == n && ("number" !== o || u || (n += i && i[3] || (S.cssNumber[s] ? "" : "px")), y.clearCloneStyle || "" !== n || 0 !== t.indexOf("background") || (l[t] = "inherit"), a && "set" in a && void 0 === (n = a.set(e, n, r)) || (u ? l.setProperty(t, n) : l[t] = n))
			}
		},
		css: function(e, t, n, r) {
			var i, o, a, s = X(t);
			return Xe.test(t) || (t = ze(s)), (a = S.cssHooks[t] || S.cssHooks[s]) && "get" in a && (i = a.get(e, !0, n)), void 0 === i && (i = We(e, t, r)), "normal" === i && t in Ge && (i = Ge[t]), "" === n || n ? (o = parseFloat(i), !0 === n || isFinite(o) ? o || 0 : i) : i
		}
	}), S.each(["height", "width"], function(e, u) {
		S.cssHooks[u] = {
			get: function(e, t, n) {
				if (t) return !Ue.test(S.css(e, "display")) || e.getClientRects().length && e.getBoundingClientRect().width ? Je(e, u, n) : Me(e, Ve, function() {
					return Je(e, u, n)
				})
			},
			set: function(e, t, n) {
				var r, i = Re(e),
					o = !y.scrollboxSize() && "absolute" === i.position,
					a = (o || n) && "border-box" === S.css(e, "boxSizing", !1, i),
					s = n ? Qe(e, u, n, a, i) : 0;
				return a && o && (s -= Math.ceil(e["offset" + u[0].toUpperCase() + u.slice(1)] - parseFloat(i[u]) - Qe(e, u, "border", !1, i) - .5)), s && (r = te.exec(t)) && "px" !== (r[3] || "px") && (e.style[u] = t, t = S.css(e, u)), Ye(0, t, s)
			}
		}
	}), S.cssHooks.marginLeft = Fe(y.reliableMarginLeft, function(e, t) {
		if (t) return (parseFloat(We(e, "marginLeft")) || e.getBoundingClientRect().left - Me(e, {
			marginLeft: 0
		}, function() {
			return e.getBoundingClientRect().left
		})) + "px"
	}), S.each({
		margin: "",
		padding: "",
		border: "Width"
	}, function(i, o) {
		S.cssHooks[i + o] = {
			expand: function(e) {
				for (var t = 0, n = {}, r = "string" == typeof e ? e.split(" ") : [e]; t < 4; t++) n[i + ne[t] + o] = r[t] || r[t - 2] || r[0];
				return n
			}
		}, "margin" !== i && (S.cssHooks[i + o].set = Ye)
	}), S.fn.extend({
		css: function(e, t) {
			return $(this, function(e, t, n) {
				var r, i, o = {},
					a = 0;
				if (Array.isArray(t)) {
					for (r = Re(e), i = t.length; a < i; a++) o[t[a]] = S.css(e, t[a], !1, r);
					return o
				}
				return void 0 !== n ? S.style(e, t, n) : S.css(e, t)
			}, e, t, 1 < arguments.length)
		}
	}), ((S.Tween = Ke).prototype = {
		constructor: Ke,
		init: function(e, t, n, r, i, o) {
			this.elem = e, this.prop = n, this.easing = i || S.easing._default, this.options = t, this.start = this.now = this.cur(), this.end = r, this.unit = o || (S.cssNumber[n] ? "" : "px")
		},
		cur: function() {
			var e = Ke.propHooks[this.prop];
			return e && e.get ? e.get(this) : Ke.propHooks._default.get(this)
		},
		run: function(e) {
			var t, n = Ke.propHooks[this.prop];
			return this.options.duration ? this.pos = t = S.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : this.pos = t = e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : Ke.propHooks._default.set(this), this
		}
	}).init.prototype = Ke.prototype, (Ke.propHooks = {
		_default: {
			get: function(e) {
				var t;
				return 1 !== e.elem.nodeType || null != e.elem[e.prop] && null == e.elem.style[e.prop] ? e.elem[e.prop] : (t = S.css(e.elem, e.prop, "")) && "auto" !== t ? t : 0
			},
			set: function(e) {
				S.fx.step[e.prop] ? S.fx.step[e.prop](e) : 1 !== e.elem.nodeType || !S.cssHooks[e.prop] && null == e.elem.style[ze(e.prop)] ? e.elem[e.prop] = e.now : S.style(e.elem, e.prop, e.now + e.unit)
			}
		}
	}).scrollTop = Ke.propHooks.scrollLeft = {
		set: function(e) {
			e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
		}
	}, S.easing = {
		linear: function(e) {
			return e
		},
		swing: function(e) {
			return .5 - Math.cos(e * Math.PI) / 2
		},
		_default: "swing"
	}, S.fx = Ke.prototype.init, S.fx.step = {};
	var Ze, et, tt, nt, rt = /^(?:toggle|show|hide)$/,
		it = /queueHooks$/;

	function ot() {
		et && (!1 === E.hidden && C.requestAnimationFrame ? C.requestAnimationFrame(ot) : C.setTimeout(ot, S.fx.interval), S.fx.tick())
	}

	function at() {
		return C.setTimeout(function() {
			Ze = void 0
		}), Ze = Date.now()
	}

	function st(e, t) {
		var n, r = 0,
			i = {
				height: e
			};
		for (t = t ? 1 : 0; r < 4; r += 2 - t) i["margin" + (n = ne[r])] = i["padding" + n] = e;
		return t && (i.opacity = i.width = e), i
	}

	function ut(e, t, n) {
		for (var r, i = (lt.tweeners[t] || []).concat(lt.tweeners["*"]), o = 0, a = i.length; o < a; o++)
			if (r = i[o].call(n, t, e)) return r
	}

	function lt(o, e, t) {
		var n, a, r = 0,
			i = lt.prefilters.length,
			s = S.Deferred().always(function() {
				delete u.elem
			}),
			u = function() {
				if (a) return !1;
				for (var e = Ze || at(), t = Math.max(0, l.startTime + l.duration - e), n = 1 - (t / l.duration || 0), r = 0, i = l.tweens.length; r < i; r++) l.tweens[r].run(n);
				return s.notifyWith(o, [l, n, t]), n < 1 && i ? t : (i || s.notifyWith(o, [l, 1, 0]), s.resolveWith(o, [l]), !1)
			},
			l = s.promise({
				elem: o,
				props: S.extend({}, e),
				opts: S.extend(!0, {
					specialEasing: {},
					easing: S.easing._default
				}, t),
				originalProperties: e,
				originalOptions: t,
				startTime: Ze || at(),
				duration: t.duration,
				tweens: [],
				createTween: function(e, t) {
					var n = S.Tween(o, l.opts, e, t, l.opts.specialEasing[e] || l.opts.easing);
					return l.tweens.push(n), n
				},
				stop: function(e) {
					var t = 0,
						n = e ? l.tweens.length : 0;
					if (a) return this;
					for (a = !0; t < n; t++) l.tweens[t].run(1);
					return e ? (s.notifyWith(o, [l, 1, 0]), s.resolveWith(o, [l, e])) : s.rejectWith(o, [l, e]), this
				}
			}),
			c = l.props;
		for (! function(e, t) {
				var n, r, i, o, a;
				for (n in e)
					if (i = t[r = X(n)], o = e[n], Array.isArray(o) && (i = o[1], o = e[n] = o[0]), n !== r && (e[r] = o, delete e[n]), (a = S.cssHooks[r]) && "expand" in a)
						for (n in o = a.expand(o), delete e[r], o) n in e || (e[n] = o[n], t[n] = i);
					else t[r] = i
			}(c, l.opts.specialEasing); r < i; r++)
			if (n = lt.prefilters[r].call(l, o, c, l.opts)) return m(n.stop) && (S._queueHooks(l.elem, l.opts.queue).stop = n.stop.bind(n)), n;
		return S.map(c, ut, l), m(l.opts.start) && l.opts.start.call(o, l), l.progress(l.opts.progress).done(l.opts.done, l.opts.complete).fail(l.opts.fail).always(l.opts.always), S.fx.timer(S.extend(u, {
			elem: o,
			anim: l,
			queue: l.opts.queue
		})), l
	}
	S.Animation = S.extend(lt, {
		tweeners: {
			"*": [function(e, t) {
				var n = this.createTween(e, t);
				return se(n.elem, e, te.exec(t), n), n
			}]
		},
		tweener: function(e, t) {
			m(e) ? (t = e, e = ["*"]) : e = e.match(P);
			for (var n, r = 0, i = e.length; r < i; r++) n = e[r], lt.tweeners[n] = lt.tweeners[n] || [], lt.tweeners[n].unshift(t)
		},
		prefilters: [function(e, t, n) {
			var r, i, o, a, s, u, l, c, f = "width" in t || "height" in t,
				p = this,
				d = {},
				h = e.style,
				g = e.nodeType && ae(e),
				v = Y.get(e, "fxshow");
			for (r in n.queue || (null == (a = S._queueHooks(e, "fx")).unqueued && (a.unqueued = 0, s = a.empty.fire, a.empty.fire = function() {
					a.unqueued || s()
				}), a.unqueued++, p.always(function() {
					p.always(function() {
						a.unqueued--, S.queue(e, "fx").length || a.empty.fire()
					})
				})), t)
				if (i = t[r], rt.test(i)) {
					if (delete t[r], o = o || "toggle" === i, i === (g ? "hide" : "show")) {
						if ("show" !== i || !v || void 0 === v[r]) continue;
						g = !0
					}
					d[r] = v && v[r] || S.style(e, r)
				} if ((u = !S.isEmptyObject(t)) || !S.isEmptyObject(d))
				for (r in f && 1 === e.nodeType && (n.overflow = [h.overflow, h.overflowX, h.overflowY], null == (l = v && v.display) && (l = Y.get(e, "display")), "none" === (c = S.css(e, "display")) && (l ? c = l : (le([e], !0), l = e.style.display || l, c = S.css(e, "display"), le([e]))), ("inline" === c || "inline-block" === c && null != l) && "none" === S.css(e, "float") && (u || (p.done(function() {
						h.display = l
					}), null == l && (c = h.display, l = "none" === c ? "" : c)), h.display = "inline-block")), n.overflow && (h.overflow = "hidden", p.always(function() {
						h.overflow = n.overflow[0], h.overflowX = n.overflow[1], h.overflowY = n.overflow[2]
					})), u = !1, d) u || (v ? "hidden" in v && (g = v.hidden) : v = Y.access(e, "fxshow", {
					display: l
				}), o && (v.hidden = !g), g && le([e], !0), p.done(function() {
					for (r in g || le([e]), Y.remove(e, "fxshow"), d) S.style(e, r, d[r])
				})), u = ut(g ? v[r] : 0, r, p), r in v || (v[r] = u.start, g && (u.end = u.start, u.start = 0))
		}],
		prefilter: function(e, t) {
			t ? lt.prefilters.unshift(e) : lt.prefilters.push(e)
		}
	}), S.speed = function(e, t, n) {
		var r = e && "object" == typeof e ? S.extend({}, e) : {
			complete: n || !n && t || m(e) && e,
			duration: e,
			easing: n && t || t && !m(t) && t
		};
		return S.fx.off ? r.duration = 0 : "number" != typeof r.duration && (r.duration in S.fx.speeds ? r.duration = S.fx.speeds[r.duration] : r.duration = S.fx.speeds._default), null != r.queue && !0 !== r.queue || (r.queue = "fx"), r.old = r.complete, r.complete = function() {
			m(r.old) && r.old.call(this), r.queue && S.dequeue(this, r.queue)
		}, r
	}, S.fn.extend({
		fadeTo: function(e, t, n, r) {
			return this.filter(ae).css("opacity", 0).show().end().animate({
				opacity: t
			}, e, n, r)
		},
		animate: function(t, e, n, r) {
			var i = S.isEmptyObject(t),
				o = S.speed(e, n, r),
				a = function() {
					var e = lt(this, S.extend({}, t), o);
					(i || Y.get(this, "finish")) && e.stop(!0)
				};
			return a.finish = a, i || !1 === o.queue ? this.each(a) : this.queue(o.queue, a)
		},
		stop: function(i, e, o) {
			var a = function(e) {
				var t = e.stop;
				delete e.stop, t(o)
			};
			return "string" != typeof i && (o = e, e = i, i = void 0), e && this.queue(i || "fx", []), this.each(function() {
				var e = !0,
					t = null != i && i + "queueHooks",
					n = S.timers,
					r = Y.get(this);
				if (t) r[t] && r[t].stop && a(r[t]);
				else
					for (t in r) r[t] && r[t].stop && it.test(t) && a(r[t]);
				for (t = n.length; t--;) n[t].elem !== this || null != i && n[t].queue !== i || (n[t].anim.stop(o), e = !1, n.splice(t, 1));
				!e && o || S.dequeue(this, i)
			})
		},
		finish: function(a) {
			return !1 !== a && (a = a || "fx"), this.each(function() {
				var e, t = Y.get(this),
					n = t[a + "queue"],
					r = t[a + "queueHooks"],
					i = S.timers,
					o = n ? n.length : 0;
				for (t.finish = !0, S.queue(this, a, []), r && r.stop && r.stop.call(this, !0), e = i.length; e--;) i[e].elem === this && i[e].queue === a && (i[e].anim.stop(!0), i.splice(e, 1));
				for (e = 0; e < o; e++) n[e] && n[e].finish && n[e].finish.call(this);
				delete t.finish
			})
		}
	}), S.each(["toggle", "show", "hide"], function(e, r) {
		var i = S.fn[r];
		S.fn[r] = function(e, t, n) {
			return null == e || "boolean" == typeof e ? i.apply(this, arguments) : this.animate(st(r, !0), e, t, n)
		}
	}), S.each({
		slideDown: st("show"),
		slideUp: st("hide"),
		slideToggle: st("toggle"),
		fadeIn: {
			opacity: "show"
		},
		fadeOut: {
			opacity: "hide"
		},
		fadeToggle: {
			opacity: "toggle"
		}
	}, function(e, r) {
		S.fn[e] = function(e, t, n) {
			return this.animate(r, e, t, n)
		}
	}), S.timers = [], S.fx.tick = function() {
		var e, t = 0,
			n = S.timers;
		for (Ze = Date.now(); t < n.length; t++)(e = n[t])() || n[t] !== e || n.splice(t--, 1);
		n.length || S.fx.stop(), Ze = void 0
	}, S.fx.timer = function(e) {
		S.timers.push(e), S.fx.start()
	}, S.fx.interval = 13, S.fx.start = function() {
		et || (et = !0, ot())
	}, S.fx.stop = function() {
		et = null
	}, S.fx.speeds = {
		slow: 600,
		fast: 200,
		_default: 400
	}, S.fn.delay = function(r, e) {
		return r = S.fx && S.fx.speeds[r] || r, e = e || "fx", this.queue(e, function(e, t) {
			var n = C.setTimeout(e, r);
			t.stop = function() {
				C.clearTimeout(n)
			}
		})
	}, tt = E.createElement("input"), nt = E.createElement("select").appendChild(E.createElement("option")), tt.type = "checkbox", y.checkOn = "" !== tt.value, y.optSelected = nt.selected, (tt = E.createElement("input")).value = "t", tt.type = "radio", y.radioValue = "t" === tt.value;
	var ct, ft = S.expr.attrHandle;
	S.fn.extend({
		attr: function(e, t) {
			return $(this, S.attr, e, t, 1 < arguments.length)
		},
		removeAttr: function(e) {
			return this.each(function() {
				S.removeAttr(this, e)
			})
		}
	}), S.extend({
		attr: function(e, t, n) {
			var r, i, o = e.nodeType;
			if (3 !== o && 8 !== o && 2 !== o) return "undefined" == typeof e.getAttribute ? S.prop(e, t, n) : (1 === o && S.isXMLDoc(e) || (i = S.attrHooks[t.toLowerCase()] || (S.expr.match.bool.test(t) ? ct : void 0)), void 0 !== n ? null === n ? void S.removeAttr(e, t) : i && "set" in i && void 0 !== (r = i.set(e, n, t)) ? r : (e.setAttribute(t, n + ""), n) : i && "get" in i && null !== (r = i.get(e, t)) ? r : null == (r = S.find.attr(e, t)) ? void 0 : r)
		},
		attrHooks: {
			type: {
				set: function(e, t) {
					if (!y.radioValue && "radio" === t && A(e, "input")) {
						var n = e.value;
						return e.setAttribute("type", t), n && (e.value = n), t
					}
				}
			}
		},
		removeAttr: function(e, t) {
			var n, r = 0,
				i = t && t.match(P);
			if (i && 1 === e.nodeType)
				while (n = i[r++]) e.removeAttribute(n)
		}
	}), ct = {
		set: function(e, t, n) {
			return !1 === t ? S.removeAttr(e, n) : e.setAttribute(n, n), n
		}
	}, S.each(S.expr.match.bool.source.match(/\w+/g), function(e, t) {
		var a = ft[t] || S.find.attr;
		ft[t] = function(e, t, n) {
			var r, i, o = t.toLowerCase();
			return n || (i = ft[o], ft[o] = r, r = null != a(e, t, n) ? o : null, ft[o] = i), r
		}
	});
	var pt = /^(?:input|select|textarea|button)$/i,
		dt = /^(?:a|area)$/i;

	function ht(e) {
		return (e.match(P) || []).join(" ")
	}

	function gt(e) {
		return e.getAttribute && e.getAttribute("class") || ""
	}

	function vt(e) {
		return Array.isArray(e) ? e : "string" == typeof e && e.match(P) || []
	}
	S.fn.extend({
		prop: function(e, t) {
			return $(this, S.prop, e, t, 1 < arguments.length)
		},
		removeProp: function(e) {
			return this.each(function() {
				delete this[S.propFix[e] || e]
			})
		}
	}), S.extend({
		prop: function(e, t, n) {
			var r, i, o = e.nodeType;
			if (3 !== o && 8 !== o && 2 !== o) return 1 === o && S.isXMLDoc(e) || (t = S.propFix[t] || t, i = S.propHooks[t]), void 0 !== n ? i && "set" in i && void 0 !== (r = i.set(e, n, t)) ? r : e[t] = n : i && "get" in i && null !== (r = i.get(e, t)) ? r : e[t]
		},
		propHooks: {
			tabIndex: {
				get: function(e) {
					var t = S.find.attr(e, "tabindex");
					return t ? parseInt(t, 10) : pt.test(e.nodeName) || dt.test(e.nodeName) && e.href ? 0 : -1
				}
			}
		},
		propFix: {
			"for": "htmlFor",
			"class": "className"
		}
	}), y.optSelected || (S.propHooks.selected = {
		get: function(e) {
			var t = e.parentNode;
			return t && t.parentNode && t.parentNode.selectedIndex, null
		},
		set: function(e) {
			var t = e.parentNode;
			t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex)
		}
	}), S.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
		S.propFix[this.toLowerCase()] = this
	}), S.fn.extend({
		addClass: function(t) {
			var e, n, r, i, o, a, s, u = 0;
			if (m(t)) return this.each(function(e) {
				S(this).addClass(t.call(this, e, gt(this)))
			});
			if ((e = vt(t)).length)
				while (n = this[u++])
					if (i = gt(n), r = 1 === n.nodeType && " " + ht(i) + " ") {
						a = 0;
						while (o = e[a++]) r.indexOf(" " + o + " ") < 0 && (r += o + " ");
						i !== (s = ht(r)) && n.setAttribute("class", s)
					} return this
		},
		removeClass: function(t) {
			var e, n, r, i, o, a, s, u = 0;
			if (m(t)) return this.each(function(e) {
				S(this).removeClass(t.call(this, e, gt(this)))
			});
			if (!arguments.length) return this.attr("class", "");
			if ((e = vt(t)).length)
				while (n = this[u++])
					if (i = gt(n), r = 1 === n.nodeType && " " + ht(i) + " ") {
						a = 0;
						while (o = e[a++])
							while (-1 < r.indexOf(" " + o + " ")) r = r.replace(" " + o + " ", " ");
						i !== (s = ht(r)) && n.setAttribute("class", s)
					} return this
		},
		toggleClass: function(i, t) {
			var o = typeof i,
				a = "string" === o || Array.isArray(i);
			return "boolean" == typeof t && a ? t ? this.addClass(i) : this.removeClass(i) : m(i) ? this.each(function(e) {
				S(this).toggleClass(i.call(this, e, gt(this), t), t)
			}) : this.each(function() {
				var e, t, n, r;
				if (a) {
					t = 0, n = S(this), r = vt(i);
					while (e = r[t++]) n.hasClass(e) ? n.removeClass(e) : n.addClass(e)
				} else void 0 !== i && "boolean" !== o || ((e = gt(this)) && Y.set(this, "__className__", e), this.setAttribute && this.setAttribute("class", e || !1 === i ? "" : Y.get(this, "__className__") || ""))
			})
		},
		hasClass: function(e) {
			var t, n, r = 0;
			t = " " + e + " ";
			while (n = this[r++])
				if (1 === n.nodeType && -1 < (" " + ht(gt(n)) + " ").indexOf(t)) return !0;
			return !1
		}
	});
	var yt = /\r/g;
	S.fn.extend({
		val: function(n) {
			var r, e, i, t = this[0];
			return arguments.length ? (i = m(n), this.each(function(e) {
				var t;
				1 === this.nodeType && (null == (t = i ? n.call(this, e, S(this).val()) : n) ? t = "" : "number" == typeof t ? t += "" : Array.isArray(t) && (t = S.map(t, function(e) {
					return null == e ? "" : e + ""
				})), (r = S.valHooks[this.type] || S.valHooks[this.nodeName.toLowerCase()]) && "set" in r && void 0 !== r.set(this, t, "value") || (this.value = t))
			})) : t ? (r = S.valHooks[t.type] || S.valHooks[t.nodeName.toLowerCase()]) && "get" in r && void 0 !== (e = r.get(t, "value")) ? e : "string" == typeof(e = t.value) ? e.replace(yt, "") : null == e ? "" : e : void 0
		}
	}), S.extend({
		valHooks: {
			option: {
				get: function(e) {
					var t = S.find.attr(e, "value");
					return null != t ? t : ht(S.text(e))
				}
			},
			select: {
				get: function(e) {
					var t, n, r, i = e.options,
						o = e.selectedIndex,
						a = "select-one" === e.type,
						s = a ? null : [],
						u = a ? o + 1 : i.length;
					for (r = o < 0 ? u : a ? o : 0; r < u; r++)
						if (((n = i[r]).selected || r === o) && !n.disabled && (!n.parentNode.disabled || !A(n.parentNode, "optgroup"))) {
							if (t = S(n).val(), a) return t;
							s.push(t)
						} return s
				},
				set: function(e, t) {
					var n, r, i = e.options,
						o = S.makeArray(t),
						a = i.length;
					while (a--)((r = i[a]).selected = -1 < S.inArray(S.valHooks.option.get(r), o)) && (n = !0);
					return n || (e.selectedIndex = -1), o
				}
			}
		}
	}), S.each(["radio", "checkbox"], function() {
		S.valHooks[this] = {
			set: function(e, t) {
				if (Array.isArray(t)) return e.checked = -1 < S.inArray(S(e).val(), t)
			}
		}, y.checkOn || (S.valHooks[this].get = function(e) {
			return null === e.getAttribute("value") ? "on" : e.value
		})
	}), y.focusin = "onfocusin" in C;
	var mt = /^(?:focusinfocus|focusoutblur)$/,
		xt = function(e) {
			e.stopPropagation()
		};
	S.extend(S.event, {
		trigger: function(e, t, n, r) {
			var i, o, a, s, u, l, c, f, p = [n || E],
				d = v.call(e, "type") ? e.type : e,
				h = v.call(e, "namespace") ? e.namespace.split(".") : [];
			if (o = f = a = n = n || E, 3 !== n.nodeType && 8 !== n.nodeType && !mt.test(d + S.event.triggered) && (-1 < d.indexOf(".") && (d = (h = d.split(".")).shift(), h.sort()), u = d.indexOf(":") < 0 && "on" + d, (e = e[S.expando] ? e : new S.Event(d, "object" == typeof e && e)).isTrigger = r ? 2 : 3, e.namespace = h.join("."), e.rnamespace = e.namespace ? new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, e.result = void 0, e.target || (e.target = n), t = null == t ? [e] : S.makeArray(t, [e]), c = S.event.special[d] || {}, r || !c.trigger || !1 !== c.trigger.apply(n, t))) {
				if (!r && !c.noBubble && !x(n)) {
					for (s = c.delegateType || d, mt.test(s + d) || (o = o.parentNode); o; o = o.parentNode) p.push(o), a = o;
					a === (n.ownerDocument || E) && p.push(a.defaultView || a.parentWindow || C)
				}
				i = 0;
				while ((o = p[i++]) && !e.isPropagationStopped()) f = o, e.type = 1 < i ? s : c.bindType || d, (l = (Y.get(o, "events") || Object.create(null))[e.type] && Y.get(o, "handle")) && l.apply(o, t), (l = u && o[u]) && l.apply && V(o) && (e.result = l.apply(o, t), !1 === e.result && e.preventDefault());
				return e.type = d, r || e.isDefaultPrevented() || c._default && !1 !== c._default.apply(p.pop(), t) || !V(n) || u && m(n[d]) && !x(n) && ((a = n[u]) && (n[u] = null), S.event.triggered = d, e.isPropagationStopped() && f.addEventListener(d, xt), n[d](), e.isPropagationStopped() && f.removeEventListener(d, xt), S.event.triggered = void 0, a && (n[u] = a)), e.result
			}
		},
		simulate: function(e, t, n) {
			var r = S.extend(new S.Event, n, {
				type: e,
				isSimulated: !0
			});
			S.event.trigger(r, null, t)
		}
	}), S.fn.extend({
		trigger: function(e, t) {
			return this.each(function() {
				S.event.trigger(e, t, this)
			})
		},
		triggerHandler: function(e, t) {
			var n = this[0];
			if (n) return S.event.trigger(e, t, n, !0)
		}
	}), y.focusin || S.each({
		focus: "focusin",
		blur: "focusout"
	}, function(n, r) {
		var i = function(e) {
			S.event.simulate(r, e.target, S.event.fix(e))
		};
		S.event.special[r] = {
			setup: function() {
				var e = this.ownerDocument || this.document || this,
					t = Y.access(e, r);
				t || e.addEventListener(n, i, !0), Y.access(e, r, (t || 0) + 1)
			},
			teardown: function() {
				var e = this.ownerDocument || this.document || this,
					t = Y.access(e, r) - 1;
				t ? Y.access(e, r, t) : (e.removeEventListener(n, i, !0), Y.remove(e, r))
			}
		}
	});
	var bt = C.location,
		wt = {
			guid: Date.now()
		},
		Tt = /\?/;
	S.parseXML = function(e) {
		var t, n;
		if (!e || "string" != typeof e) return null;
		try {
			t = (new C.DOMParser).parseFromString(e, "text/xml")
		} catch (e) {}
		return n = t && t.getElementsByTagName("parsererror")[0], t && !n || S.error("Invalid XML: " + (n ? S.map(n.childNodes, function(e) {
			return e.textContent
		}).join("\n") : e)), t
	};
	var Ct = /\[\]$/,
		Et = /\r?\n/g,
		St = /^(?:submit|button|image|reset|file)$/i,
		kt = /^(?:input|select|textarea|keygen)/i;

	function At(n, e, r, i) {
		var t;
		if (Array.isArray(e)) S.each(e, function(e, t) {
			r || Ct.test(n) ? i(n, t) : At(n + "[" + ("object" == typeof t && null != t ? e : "") + "]", t, r, i)
		});
		else if (r || "object" !== w(e)) i(n, e);
		else
			for (t in e) At(n + "[" + t + "]", e[t], r, i)
	}
	S.param = function(e, t) {
		var n, r = [],
			i = function(e, t) {
				var n = m(t) ? t() : t;
				r[r.length] = encodeURIComponent(e) + "=" + encodeURIComponent(null == n ? "" : n)
			};
		if (null == e) return "";
		if (Array.isArray(e) || e.jquery && !S.isPlainObject(e)) S.each(e, function() {
			i(this.name, this.value)
		});
		else
			for (n in e) At(n, e[n], t, i);
		return r.join("&")
	}, S.fn.extend({
		serialize: function() {
			return S.param(this.serializeArray())
		},
		serializeArray: function() {
			return this.map(function() {
				var e = S.prop(this, "elements");
				return e ? S.makeArray(e) : this
			}).filter(function() {
				var e = this.type;
				return this.name && !S(this).is(":disabled") && kt.test(this.nodeName) && !St.test(e) && (this.checked || !pe.test(e))
			}).map(function(e, t) {
				var n = S(this).val();
				return null == n ? null : Array.isArray(n) ? S.map(n, function(e) {
					return {
						name: t.name,
						value: e.replace(Et, "\r\n")
					}
				}) : {
					name: t.name,
					value: n.replace(Et, "\r\n")
				}
			}).get()
		}
	});
	var Nt = /%20/g,
		jt = /#.*$/,
		Dt = /([?&])_=[^&]*/,
		qt = /^(.*?):[ \t]*([^\r\n]*)$/gm,
		Lt = /^(?:GET|HEAD)$/,
		Ht = /^\/\//,
		Ot = {},
		Pt = {},
		Rt = "*/".concat("*"),
		Mt = E.createElement("a");

	function It(o) {
		return function(e, t) {
			"string" != typeof e && (t = e, e = "*");
			var n, r = 0,
				i = e.toLowerCase().match(P) || [];
			if (m(t))
				while (n = i[r++]) "+" === n[0] ? (n = n.slice(1) || "*", (o[n] = o[n] || []).unshift(t)) : (o[n] = o[n] || []).push(t)
		}
	}

	function Wt(t, i, o, a) {
		var s = {},
			u = t === Pt;

		function l(e) {
			var r;
			return s[e] = !0, S.each(t[e] || [], function(e, t) {
				var n = t(i, o, a);
				return "string" != typeof n || u || s[n] ? u ? !(r = n) : void 0 : (i.dataTypes.unshift(n), l(n), !1)
			}), r
		}
		return l(i.dataTypes[0]) || !s["*"] && l("*")
	}

	function Ft(e, t) {
		var n, r, i = S.ajaxSettings.flatOptions || {};
		for (n in t) void 0 !== t[n] && ((i[n] ? e : r || (r = {}))[n] = t[n]);
		return r && S.extend(!0, e, r), e
	}
	Mt.href = bt.href, S.extend({
		active: 0,
		lastModified: {},
		etag: {},
		ajaxSettings: {
			url: bt.href,
			type: "GET",
			isLocal: /^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(bt.protocol),
			global: !0,
			processData: !0,
			async: !0,
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			accepts: {
				"*": Rt,
				text: "text/plain",
				html: "text/html",
				xml: "application/xml, text/xml",
				json: "application/json, text/javascript"
			},
			contents: {
				xml: /\bxml\b/,
				html: /\bhtml/,
				json: /\bjson\b/
			},
			responseFields: {
				xml: "responseXML",
				text: "responseText",
				json: "responseJSON"
			},
			converters: {
				"* text": String,
				"text html": !0,
				"text json": JSON.parse,
				"text xml": S.parseXML
			},
			flatOptions: {
				url: !0,
				context: !0
			}
		},
		ajaxSetup: function(e, t) {
			return t ? Ft(Ft(e, S.ajaxSettings), t) : Ft(S.ajaxSettings, e)
		},
		ajaxPrefilter: It(Ot),
		ajaxTransport: It(Pt),
		ajax: function(e, t) {
			"object" == typeof e && (t = e, e = void 0), t = t || {};
			var c, f, p, n, d, r, h, g, i, o, v = S.ajaxSetup({}, t),
				y = v.context || v,
				m = v.context && (y.nodeType || y.jquery) ? S(y) : S.event,
				x = S.Deferred(),
				b = S.Callbacks("once memory"),
				w = v.statusCode || {},
				a = {},
				s = {},
				u = "canceled",
				T = {
					readyState: 0,
					getResponseHeader: function(e) {
						var t;
						if (h) {
							if (!n) {
								n = {};
								while (t = qt.exec(p)) n[t[1].toLowerCase() + " "] = (n[t[1].toLowerCase() + " "] || []).concat(t[2])
							}
							t = n[e.toLowerCase() + " "]
						}
						return null == t ? null : t.join(", ")
					},
					getAllResponseHeaders: function() {
						return h ? p : null
					},
					setRequestHeader: function(e, t) {
						return null == h && (e = s[e.toLowerCase()] = s[e.toLowerCase()] || e, a[e] = t), this
					},
					overrideMimeType: function(e) {
						return null == h && (v.mimeType = e), this
					},
					statusCode: function(e) {
						var t;
						if (e)
							if (h) T.always(e[T.status]);
							else
								for (t in e) w[t] = [w[t], e[t]];
						return this
					},
					abort: function(e) {
						var t = e || u;
						return c && c.abort(t), l(0, t), this
					}
				};
			if (x.promise(T), v.url = ((e || v.url || bt.href) + "").replace(Ht, bt.protocol + "//"), v.type = t.method || t.type || v.method || v.type, v.dataTypes = (v.dataType || "*").toLowerCase().match(P) || [""], null == v.crossDomain) {
				r = E.createElement("a");
				try {
					r.href = v.url, r.href = r.href, v.crossDomain = Mt.protocol + "//" + Mt.host != r.protocol + "//" + r.host
				} catch (e) {
					v.crossDomain = !0
				}
			}
			if (v.data && v.processData && "string" != typeof v.data && (v.data = S.param(v.data, v.traditional)), Wt(Ot, v, t, T), h) return T;
			for (i in (g = S.event && v.global) && 0 == S.active++ && S.event.trigger("ajaxStart"), v.type = v.type.toUpperCase(), v.hasContent = !Lt.test(v.type), f = v.url.replace(jt, ""), v.hasContent ? v.data && v.processData && 0 === (v.contentType || "").indexOf("application/x-www-form-urlencoded") && (v.data = v.data.replace(Nt, "+")) : (o = v.url.slice(f.length), v.data && (v.processData || "string" == typeof v.data) && (f += (Tt.test(f) ? "&" : "?") + v.data, delete v.data), !1 === v.cache && (f = f.replace(Dt, "$1"), o = (Tt.test(f) ? "&" : "?") + "_=" + wt.guid++ + o), v.url = f + o), v.ifModified && (S.lastModified[f] && T.setRequestHeader("If-Modified-Since", S.lastModified[f]), S.etag[f] && T.setRequestHeader("If-None-Match", S.etag[f])), (v.data && v.hasContent && !1 !== v.contentType || t.contentType) && T.setRequestHeader("Content-Type", v.contentType), T.setRequestHeader("Accept", v.dataTypes[0] && v.accepts[v.dataTypes[0]] ? v.accepts[v.dataTypes[0]] + ("*" !== v.dataTypes[0] ? ", " + Rt + "; q=0.01" : "") : v.accepts["*"]), v.headers) T.setRequestHeader(i, v.headers[i]);
			if (v.beforeSend && (!1 === v.beforeSend.call(y, T, v) || h)) return T.abort();
			if (u = "abort", b.add(v.complete), T.done(v.success), T.fail(v.error), c = Wt(Pt, v, t, T)) {
				if (T.readyState = 1, g && m.trigger("ajaxSend", [T, v]), h) return T;
				v.async && 0 < v.timeout && (d = C.setTimeout(function() {
					T.abort("timeout")
				}, v.timeout));
				try {
					h = !1, c.send(a, l)
				} catch (e) {
					if (h) throw e;
					l(-1, e)
				}
			} else l(-1, "No Transport");

			function l(e, t, n, r) {
				var i, o, a, s, u, l = t;
				h || (h = !0, d && C.clearTimeout(d), c = void 0, p = r || "", T.readyState = 0 < e ? 4 : 0, i = 200 <= e && e < 300 || 304 === e, n && (s = function(e, t, n) {
					var r, i, o, a, s = e.contents,
						u = e.dataTypes;
					while ("*" === u[0]) u.shift(), void 0 === r && (r = e.mimeType || t.getResponseHeader("Content-Type"));
					if (r)
						for (i in s)
							if (s[i] && s[i].test(r)) {
								u.unshift(i);
								break
							} if (u[0] in n) o = u[0];
					else {
						for (i in n) {
							if (!u[0] || e.converters[i + " " + u[0]]) {
								o = i;
								break
							}
							a || (a = i)
						}
						o = o || a
					}
					if (o) return o !== u[0] && u.unshift(o), n[o]
				}(v, T, n)), !i && -1 < S.inArray("script", v.dataTypes) && S.inArray("json", v.dataTypes) < 0 && (v.converters["text script"] = function() {}), s = function(e, t, n, r) {
					var i, o, a, s, u, l = {},
						c = e.dataTypes.slice();
					if (c[1])
						for (a in e.converters) l[a.toLowerCase()] = e.converters[a];
					o = c.shift();
					while (o)
						if (e.responseFields[o] && (n[e.responseFields[o]] = t), !u && r && e.dataFilter && (t = e.dataFilter(t, e.dataType)), u = o, o = c.shift())
							if ("*" === o) o = u;
							else if ("*" !== u && u !== o) {
						if (!(a = l[u + " " + o] || l["* " + o]))
							for (i in l)
								if ((s = i.split(" "))[1] === o && (a = l[u + " " + s[0]] || l["* " + s[0]])) {
									!0 === a ? a = l[i] : !0 !== l[i] && (o = s[0], c.unshift(s[1]));
									break
								} if (!0 !== a)
							if (a && e["throws"]) t = a(t);
							else try {
								t = a(t)
							} catch (e) {
								return {
									state: "parsererror",
									error: a ? e : "No conversion from " + u + " to " + o
								}
							}
					}
					return {
						state: "success",
						data: t
					}
				}(v, s, T, i), i ? (v.ifModified && ((u = T.getResponseHeader("Last-Modified")) && (S.lastModified[f] = u), (u = T.getResponseHeader("etag")) && (S.etag[f] = u)), 204 === e || "HEAD" === v.type ? l = "nocontent" : 304 === e ? l = "notmodified" : (l = s.state, o = s.data, i = !(a = s.error))) : (a = l, !e && l || (l = "error", e < 0 && (e = 0))), T.status = e, T.statusText = (t || l) + "", i ? x.resolveWith(y, [o, l, T]) : x.rejectWith(y, [T, l, a]), T.statusCode(w), w = void 0, g && m.trigger(i ? "ajaxSuccess" : "ajaxError", [T, v, i ? o : a]), b.fireWith(y, [T, l]), g && (m.trigger("ajaxComplete", [T, v]), --S.active || S.event.trigger("ajaxStop")))
			}
			return T
		},
		getJSON: function(e, t, n) {
			return S.get(e, t, n, "json")
		},
		getScript: function(e, t) {
			return S.get(e, void 0, t, "script")
		}
	}), S.each(["get", "post"], function(e, i) {
		S[i] = function(e, t, n, r) {
			return m(t) && (r = r || n, n = t, t = void 0), S.ajax(S.extend({
				url: e,
				type: i,
				dataType: r,
				data: t,
				success: n
			}, S.isPlainObject(e) && e))
		}
	}), S.ajaxPrefilter(function(e) {
		var t;
		for (t in e.headers) "content-type" === t.toLowerCase() && (e.contentType = e.headers[t] || "")
	}), S._evalUrl = function(e, t, n) {
		return S.ajax({
			url: e,
			type: "GET",
			dataType: "script",
			cache: !0,
			async: !1,
			global: !1,
			converters: {
				"text script": function() {}
			},
			dataFilter: function(e) {
				S.globalEval(e, t, n)
			}
		})
	}, S.fn.extend({
		wrapAll: function(e) {
			var t;
			return this[0] && (m(e) && (e = e.call(this[0])), t = S(e, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && t.insertBefore(this[0]), t.map(function() {
				var e = this;
				while (e.firstElementChild) e = e.firstElementChild;
				return e
			}).append(this)), this
		},
		wrapInner: function(n) {
			return m(n) ? this.each(function(e) {
				S(this).wrapInner(n.call(this, e))
			}) : this.each(function() {
				var e = S(this),
					t = e.contents();
				t.length ? t.wrapAll(n) : e.append(n)
			})
		},
		wrap: function(t) {
			var n = m(t);
			return this.each(function(e) {
				S(this).wrapAll(n ? t.call(this, e) : t)
			})
		},
		unwrap: function(e) {
			return this.parent(e).not("body").each(function() {
				S(this).replaceWith(this.childNodes)
			}), this
		}
	}), S.expr.pseudos.hidden = function(e) {
		return !S.expr.pseudos.visible(e)
	}, S.expr.pseudos.visible = function(e) {
		return !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length)
	}, S.ajaxSettings.xhr = function() {
		try {
			return new C.XMLHttpRequest
		} catch (e) {}
	};
	var Bt = {
			0: 200,
			1223: 204
		},
		$t = S.ajaxSettings.xhr();
	y.cors = !!$t && "withCredentials" in $t, y.ajax = $t = !!$t, S.ajaxTransport(function(i) {
		var o, a;
		if (y.cors || $t && !i.crossDomain) return {
			send: function(e, t) {
				var n, r = i.xhr();
				if (r.open(i.type, i.url, i.async, i.username, i.password), i.xhrFields)
					for (n in i.xhrFields) r[n] = i.xhrFields[n];
				for (n in i.mimeType && r.overrideMimeType && r.overrideMimeType(i.mimeType), i.crossDomain || e["X-Requested-With"] || (e["X-Requested-With"] = "XMLHttpRequest"), e) r.setRequestHeader(n, e[n]);
				o = function(e) {
					return function() {
						o && (o = a = r.onload = r.onerror = r.onabort = r.ontimeout = r.onreadystatechange = null, "abort" === e ? r.abort() : "error" === e ? "number" != typeof r.status ? t(0, "error") : t(r.status, r.statusText) : t(Bt[r.status] || r.status, r.statusText, "text" !== (r.responseType || "text") || "string" != typeof r.responseText ? {
							binary: r.response
						} : {
							text: r.responseText
						}, r.getAllResponseHeaders()))
					}
				}, r.onload = o(), a = r.onerror = r.ontimeout = o("error"), void 0 !== r.onabort ? r.onabort = a : r.onreadystatechange = function() {
					4 === r.readyState && C.setTimeout(function() {
						o && a()
					})
				}, o = o("abort");
				try {
					r.send(i.hasContent && i.data || null)
				} catch (e) {
					if (o) throw e
				}
			},
			abort: function() {
				o && o()
			}
		}
	}), S.ajaxPrefilter(function(e) {
		e.crossDomain && (e.contents.script = !1)
	}), S.ajaxSetup({
		accepts: {
			script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
		},
		contents: {
			script: /\b(?:java|ecma)script\b/
		},
		converters: {
			"text script": function(e) {
				return S.globalEval(e), e
			}
		}
	}), S.ajaxPrefilter("script", function(e) {
		void 0 === e.cache && (e.cache = !1), e.crossDomain && (e.type = "GET")
	}), S.ajaxTransport("script", function(n) {
		var r, i;
		if (n.crossDomain || n.scriptAttrs) return {
			send: function(e, t) {
				r = S("<script>").attr(n.scriptAttrs || {}).prop({
					charset: n.scriptCharset,
					src: n.url
				}).on("load error", i = function(e) {
					r.remove(), i = null, e && t("error" === e.type ? 404 : 200, e.type)
				}), E.head.appendChild(r[0])
			},
			abort: function() {
				i && i()
			}
		}
	});
	var _t, zt = [],
		Ut = /(=)\?(?=&|$)|\?\?/;
	S.ajaxSetup({
		jsonp: "callback",
		jsonpCallback: function() {
			var e = zt.pop() || S.expando + "_" + wt.guid++;
			return this[e] = !0, e
		}
	}), S.ajaxPrefilter("json jsonp", function(e, t, n) {
		var r, i, o, a = !1 !== e.jsonp && (Ut.test(e.url) ? "url" : "string" == typeof e.data && 0 === (e.contentType || "").indexOf("application/x-www-form-urlencoded") && Ut.test(e.data) && "data");
		if (a || "jsonp" === e.dataTypes[0]) return r = e.jsonpCallback = m(e.jsonpCallback) ? e.jsonpCallback() : e.jsonpCallback, a ? e[a] = e[a].replace(Ut, "$1" + r) : !1 !== e.jsonp && (e.url += (Tt.test(e.url) ? "&" : "?") + e.jsonp + "=" + r), e.converters["script json"] = function() {
			return o || S.error(r + " was not called"), o[0]
		}, e.dataTypes[0] = "json", i = C[r], C[r] = function() {
			o = arguments
		}, n.always(function() {
			void 0 === i ? S(C).removeProp(r) : C[r] = i, e[r] && (e.jsonpCallback = t.jsonpCallback, zt.push(r)), o && m(i) && i(o[0]), o = i = void 0
		}), "script"
	}), y.createHTMLDocument = ((_t = E.implementation.createHTMLDocument("").body).innerHTML = "<form></form><form></form>", 2 === _t.childNodes.length), S.parseHTML = function(e, t, n) {
		return "string" != typeof e ? [] : ("boolean" == typeof t && (n = t, t = !1), t || (y.createHTMLDocument ? ((r = (t = E.implementation.createHTMLDocument("")).createElement("base")).href = E.location.href, t.head.appendChild(r)) : t = E), o = !n && [], (i = N.exec(e)) ? [t.createElement(i[1])] : (i = xe([e], t, o), o && o.length && S(o).remove(), S.merge([], i.childNodes)));
		var r, i, o
	}, S.fn.load = function(e, t, n) {
		var r, i, o, a = this,
			s = e.indexOf(" ");
		return -1 < s && (r = ht(e.slice(s)), e = e.slice(0, s)), m(t) ? (n = t, t = void 0) : t && "object" == typeof t && (i = "POST"), 0 < a.length && S.ajax({
			url: e,
			type: i || "GET",
			dataType: "html",
			data: t
		}).done(function(e) {
			o = arguments, a.html(r ? S("<div>").append(S.parseHTML(e)).find(r) : e)
		}).always(n && function(e, t) {
			a.each(function() {
				n.apply(this, o || [e.responseText, t, e])
			})
		}), this
	}, S.expr.pseudos.animated = function(t) {
		return S.grep(S.timers, function(e) {
			return t === e.elem
		}).length
	}, S.offset = {
		setOffset: function(e, t, n) {
			var r, i, o, a, s, u, l = S.css(e, "position"),
				c = S(e),
				f = {};
			"static" === l && (e.style.position = "relative"), s = c.offset(), o = S.css(e, "top"), u = S.css(e, "left"), ("absolute" === l || "fixed" === l) && -1 < (o + u).indexOf("auto") ? (a = (r = c.position()).top, i = r.left) : (a = parseFloat(o) || 0, i = parseFloat(u) || 0), m(t) && (t = t.call(e, n, S.extend({}, s))), null != t.top && (f.top = t.top - s.top + a), null != t.left && (f.left = t.left - s.left + i), "using" in t ? t.using.call(e, f) : c.css(f)
		}
	}, S.fn.extend({
		offset: function(t) {
			if (arguments.length) return void 0 === t ? this : this.each(function(e) {
				S.offset.setOffset(this, t, e)
			});
			var e, n, r = this[0];
			return r ? r.getClientRects().length ? (e = r.getBoundingClientRect(), n = r.ownerDocument.defaultView, {
				top: e.top + n.pageYOffset,
				left: e.left + n.pageXOffset
			}) : {
				top: 0,
				left: 0
			} : void 0
		},
		position: function() {
			if (this[0]) {
				var e, t, n, r = this[0],
					i = {
						top: 0,
						left: 0
					};
				if ("fixed" === S.css(r, "position")) t = r.getBoundingClientRect();
				else {
					t = this.offset(), n = r.ownerDocument, e = r.offsetParent || n.documentElement;
					while (e && (e === n.body || e === n.documentElement) && "static" === S.css(e, "position")) e = e.parentNode;
					e && e !== r && 1 === e.nodeType && ((i = S(e).offset()).top += S.css(e, "borderTopWidth", !0), i.left += S.css(e, "borderLeftWidth", !0))
				}
				return {
					top: t.top - i.top - S.css(r, "marginTop", !0),
					left: t.left - i.left - S.css(r, "marginLeft", !0)
				}
			}
		},
		offsetParent: function() {
			return this.map(function() {
				var e = this.offsetParent;
				while (e && "static" === S.css(e, "position")) e = e.offsetParent;
				return e || re
			})
		}
	}), S.each({
		scrollLeft: "pageXOffset",
		scrollTop: "pageYOffset"
	}, function(t, i) {
		var o = "pageYOffset" === i;
		S.fn[t] = function(e) {
			return $(this, function(e, t, n) {
				var r;
				if (x(e) ? r = e : 9 === e.nodeType && (r = e.defaultView), void 0 === n) return r ? r[i] : e[t];
				r ? r.scrollTo(o ? r.pageXOffset : n, o ? n : r.pageYOffset) : e[t] = n
			}, t, e, arguments.length)
		}
	}), S.each(["top", "left"], function(e, n) {
		S.cssHooks[n] = Fe(y.pixelPosition, function(e, t) {
			if (t) return t = We(e, n), Pe.test(t) ? S(e).position()[n] + "px" : t
		})
	}), S.each({
		Height: "height",
		Width: "width"
	}, function(a, s) {
		S.each({
			padding: "inner" + a,
			content: s,
			"": "outer" + a
		}, function(r, o) {
			S.fn[o] = function(e, t) {
				var n = arguments.length && (r || "boolean" != typeof e),
					i = r || (!0 === e || !0 === t ? "margin" : "border");
				return $(this, function(e, t, n) {
					var r;
					return x(e) ? 0 === o.indexOf("outer") ? e["inner" + a] : e.document.documentElement["client" + a] : 9 === e.nodeType ? (r = e.documentElement, Math.max(e.body["scroll" + a], r["scroll" + a], e.body["offset" + a], r["offset" + a], r["client" + a])) : void 0 === n ? S.css(e, t, i) : S.style(e, t, n, i)
				}, s, n ? e : void 0, n)
			}
		})
	}), S.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(e, t) {
		S.fn[t] = function(e) {
			return this.on(t, e)
		}
	}), S.fn.extend({
		bind: function(e, t, n) {
			return this.on(e, null, t, n)
		},
		unbind: function(e, t) {
			return this.off(e, null, t)
		},
		delegate: function(e, t, n, r) {
			return this.on(t, e, n, r)
		},
		undelegate: function(e, t, n) {
			return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n)
		},
		hover: function(e, t) {
			return this.mouseenter(e).mouseleave(t || e)
		}
	}), S.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "), function(e, n) {
		S.fn[n] = function(e, t) {
			return 0 < arguments.length ? this.on(n, null, e, t) : this.trigger(n)
		}
	});
	var Xt = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
	S.proxy = function(e, t) {
		var n, r, i;
		if ("string" == typeof t && (n = e[t], t = e, e = n), m(e)) return r = s.call(arguments, 2), (i = function() {
			return e.apply(t || this, r.concat(s.call(arguments)))
		}).guid = e.guid = e.guid || S.guid++, i
	}, S.holdReady = function(e) {
		e ? S.readyWait++ : S.ready(!0)
	}, S.isArray = Array.isArray, S.parseJSON = JSON.parse, S.nodeName = A, S.isFunction = m, S.isWindow = x, S.camelCase = X, S.type = w, S.now = Date.now, S.isNumeric = function(e) {
		var t = S.type(e);
		return ("number" === t || "string" === t) && !isNaN(e - parseFloat(e))
	}, S.trim = function(e) {
		return null == e ? "" : (e + "").replace(Xt, "")
	}, "function" == typeof define && define.amd && define("jquery", [], function() {
		return S
	});
	var Vt = C.jQuery,
		Gt = C.$;
	return S.noConflict = function(e) {
		return C.$ === S && (C.$ = Gt), e && C.jQuery === S && (C.jQuery = Vt), S
	}, "undefined" == typeof e && (C.jQuery = C.$ = S), S
});
jQuery.noConflict();



/* Minit: /wp-includes/js/jquery/jquery-migrate.min.js */
/*! jQuery Migrate v3.3.2 | (c) OpenJS Foundation and other contributors | jquery.org/license */
"undefined" == typeof jQuery.migrateMute && (jQuery.migrateMute = !0),
	function(t) {
		"use strict";
		"function" == typeof define && define.amd ? define(["jquery"], function(e) {
			return t(e, window)
		}) : "object" == typeof module && module.exports ? module.exports = t(require("jquery"), window) : t(jQuery, window)
	}(function(s, n) {
		"use strict";

		function e(e) {
			return 0 <= function(e, t) {
				for (var r = /^(\d+)\.(\d+)\.(\d+)/, n = r.exec(e) || [], o = r.exec(t) || [], i = 1; i <= 3; i++) {
					if (+o[i] < +n[i]) return 1;
					if (+n[i] < +o[i]) return -1
				}
				return 0
			}(s.fn.jquery, e)
		}
		s.migrateVersion = "3.3.2", n.console && n.console.log && (s && e("3.0.0") || n.console.log("JQMIGRATE: jQuery 3.0.0+ REQUIRED"), s.migrateWarnings && n.console.log("JQMIGRATE: Migrate plugin loaded multiple times"), n.console.log("JQMIGRATE: Migrate is installed" + (s.migrateMute ? "" : " with logging active") + ", version " + s.migrateVersion));
		var r = {};

		function u(e) {
			var t = n.console;
			s.migrateDeduplicateWarnings && r[e] || (r[e] = !0, s.migrateWarnings.push(e), t && t.warn && !s.migrateMute && (t.warn("JQMIGRATE: " + e), s.migrateTrace && t.trace && t.trace()))
		}

		function t(e, t, r, n) {
			Object.defineProperty(e, t, {
				configurable: !0,
				enumerable: !0,
				get: function() {
					return u(n), r
				},
				set: function(e) {
					u(n), r = e
				}
			})
		}

		function o(e, t, r, n) {
			e[t] = function() {
				return u(n), r.apply(this, arguments)
			}
		}
		s.migrateDeduplicateWarnings = !0, s.migrateWarnings = [], void 0 === s.migrateTrace && (s.migrateTrace = !0), s.migrateReset = function() {
			r = {}, s.migrateWarnings.length = 0
		}, "BackCompat" === n.document.compatMode && u("jQuery is not compatible with Quirks Mode");
		var i, a, c, d = {},
			l = s.fn.init,
			p = s.find,
			f = /\[(\s*[-\w]+\s*)([~|^$*]?=)\s*([-\w#]*?#[-\w#]*)\s*\]/,
			y = /\[(\s*[-\w]+\s*)([~|^$*]?=)\s*([-\w#]*?#[-\w#]*)\s*\]/g,
			m = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
		for (i in s.fn.init = function(e) {
				var t = Array.prototype.slice.call(arguments);
				return "string" == typeof e && "#" === e && (u("jQuery( '#' ) is not a valid selector"), t[0] = []), l.apply(this, t)
			}, s.fn.init.prototype = s.fn, s.find = function(t) {
				var r = Array.prototype.slice.call(arguments);
				if ("string" == typeof t && f.test(t)) try {
					n.document.querySelector(t)
				} catch (e) {
					t = t.replace(y, function(e, t, r, n) {
						return "[" + t + r + '"' + n + '"]'
					});
					try {
						n.document.querySelector(t), u("Attribute selector with '#' must be quoted: " + r[0]), r[0] = t
					} catch (e) {
						u("Attribute selector with '#' was not fixed: " + r[0])
					}
				}
				return p.apply(this, r)
			}, p) Object.prototype.hasOwnProperty.call(p, i) && (s.find[i] = p[i]);
		o(s.fn, "size", function() {
			return this.length
		}, "jQuery.fn.size() is deprecated and removed; use the .length property"), o(s, "parseJSON", function() {
			return JSON.parse.apply(null, arguments)
		}, "jQuery.parseJSON is deprecated; use JSON.parse"), o(s, "holdReady", s.holdReady, "jQuery.holdReady is deprecated"), o(s, "unique", s.uniqueSort, "jQuery.unique is deprecated; use jQuery.uniqueSort"), t(s.expr, "filters", s.expr.pseudos, "jQuery.expr.filters is deprecated; use jQuery.expr.pseudos"), t(s.expr, ":", s.expr.pseudos, "jQuery.expr[':'] is deprecated; use jQuery.expr.pseudos"), e("3.1.1") && o(s, "trim", function(e) {
			return null == e ? "" : (e + "").replace(m, "")
		}, "jQuery.trim is deprecated; use String.prototype.trim"), e("3.2.0") && (o(s, "nodeName", function(e, t) {
			return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
		}, "jQuery.nodeName is deprecated"), o(s, "isArray", Array.isArray, "jQuery.isArray is deprecated; use Array.isArray")), e("3.3.0") && (o(s, "isNumeric", function(e) {
			var t = typeof e;
			return ("number" == t || "string" == t) && !isNaN(e - parseFloat(e))
		}, "jQuery.isNumeric() is deprecated"), s.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function(e, t) {
			d["[object " + t + "]"] = t.toLowerCase()
		}), o(s, "type", function(e) {
			return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? d[Object.prototype.toString.call(e)] || "object" : typeof e
		}, "jQuery.type is deprecated"), o(s, "isFunction", function(e) {
			return "function" == typeof e
		}, "jQuery.isFunction() is deprecated"), o(s, "isWindow", function(e) {
			return null != e && e === e.window
		}, "jQuery.isWindow() is deprecated")), s.ajax && (a = s.ajax, c = /(=)\?(?=&|$)|\?\?/, s.ajax = function() {
			var e = a.apply(this, arguments);
			return e.promise && (o(e, "success", e.done, "jQXHR.success is deprecated and removed"), o(e, "error", e.fail, "jQXHR.error is deprecated and removed"), o(e, "complete", e.always, "jQXHR.complete is deprecated and removed")), e
		}, e("4.0.0") || s.ajaxPrefilter("+json", function(e) {
			!1 !== e.jsonp && (c.test(e.url) || "string" == typeof e.data && 0 === (e.contentType || "").indexOf("application/x-www-form-urlencoded") && c.test(e.data)) && u("JSON-to-JSONP auto-promotion is deprecated")
		}));
		var g = s.fn.removeAttr,
			h = s.fn.toggleClass,
			v = /\S+/g;

		function j(e) {
			return e.replace(/-([a-z])/g, function(e, t) {
				return t.toUpperCase()
			})
		}
		s.fn.removeAttr = function(e) {
			var r = this;
			return s.each(e.match(v), function(e, t) {
				s.expr.match.bool.test(t) && (u("jQuery.fn.removeAttr no longer sets boolean properties: " + t), r.prop(t, !1))
			}), g.apply(this, arguments)
		};
		var Q, b = !(s.fn.toggleClass = function(t) {
				return void 0 !== t && "boolean" != typeof t ? h.apply(this, arguments) : (u("jQuery.fn.toggleClass( boolean ) is deprecated"), this.each(function() {
					var e = this.getAttribute && this.getAttribute("class") || "";
					e && s.data(this, "__className__", e), this.setAttribute && this.setAttribute("class", !e && !1 !== t && s.data(this, "__className__") || "")
				}))
			}),
			w = /^[a-z]/,
			x = /^(?:Border(?:Top|Right|Bottom|Left)?(?:Width|)|(?:Margin|Padding)?(?:Top|Right|Bottom|Left)?|(?:Min|Max)?(?:Width|Height))$/;
		s.swap && s.each(["height", "width", "reliableMarginRight"], function(e, t) {
			var r = s.cssHooks[t] && s.cssHooks[t].get;
			r && (s.cssHooks[t].get = function() {
				var e;
				return b = !0, e = r.apply(this, arguments), b = !1, e
			})
		}), s.swap = function(e, t, r, n) {
			var o, i, a = {};
			for (i in b || u("jQuery.swap() is undocumented and deprecated"), t) a[i] = e.style[i], e.style[i] = t[i];
			for (i in o = r.apply(e, n || []), t) e.style[i] = a[i];
			return o
		}, e("3.4.0") && "undefined" != typeof Proxy && (s.cssProps = new Proxy(s.cssProps || {}, {
			set: function() {
				return u("JQMIGRATE: jQuery.cssProps is deprecated"), Reflect.set.apply(this, arguments)
			}
		})), s.cssNumber || (s.cssNumber = {}), Q = s.fn.css, s.fn.css = function(e, t) {
			var r, n, o = this;
			return e && "object" == typeof e && !Array.isArray(e) ? (s.each(e, function(e, t) {
				s.fn.css.call(o, e, t)
			}), this) : ("number" == typeof t && (r = j(e), n = r, w.test(n) && x.test(n[0].toUpperCase() + n.slice(1)) || s.cssNumber[r] || u('Number-typed values are deprecated for jQuery.fn.css( "' + e + '", value )')), Q.apply(this, arguments))
		};
		var A, k, S, M, N = s.data;
		s.data = function(e, t, r) {
			var n, o, i;
			if (t && "object" == typeof t && 2 === arguments.length) {
				for (i in n = s.hasData(e) && N.call(this, e), o = {}, t) i !== j(i) ? (u("jQuery.data() always sets/gets camelCased names: " + i), n[i] = t[i]) : o[i] = t[i];
				return N.call(this, e, o), t
			}
			return t && "string" == typeof t && t !== j(t) && (n = s.hasData(e) && N.call(this, e)) && t in n ? (u("jQuery.data() always sets/gets camelCased names: " + t), 2 < arguments.length && (n[t] = r), n[t]) : N.apply(this, arguments)
		}, s.fx && (S = s.Tween.prototype.run, M = function(e) {
			return e
		}, s.Tween.prototype.run = function() {
			1 < s.easing[this.easing].length && (u("'jQuery.easing." + this.easing.toString() + "' should use only one argument"), s.easing[this.easing] = M), S.apply(this, arguments)
		}, A = s.fx.interval || 13, k = "jQuery.fx.interval is deprecated", n.requestAnimationFrame && Object.defineProperty(s.fx, "interval", {
			configurable: !0,
			enumerable: !0,
			get: function() {
				return n.document.hidden || u(k), A
			},
			set: function(e) {
				u(k), A = e
			}
		}));
		var R = s.fn.load,
			H = s.event.add,
			C = s.event.fix;
		s.event.props = [], s.event.fixHooks = {}, t(s.event.props, "concat", s.event.props.concat, "jQuery.event.props.concat() is deprecated and removed"), s.event.fix = function(e) {
			var t, r = e.type,
				n = this.fixHooks[r],
				o = s.event.props;
			if (o.length) {
				u("jQuery.event.props are deprecated and removed: " + o.join());
				while (o.length) s.event.addProp(o.pop())
			}
			if (n && !n._migrated_ && (n._migrated_ = !0, u("jQuery.event.fixHooks are deprecated and removed: " + r), (o = n.props) && o.length))
				while (o.length) s.event.addProp(o.pop());
			return t = C.call(this, e), n && n.filter ? n.filter(t, e) : t
		}, s.event.add = function(e, t) {
			return e === n && "load" === t && "complete" === n.document.readyState && u("jQuery(window).on('load'...) called after load event occurred"), H.apply(this, arguments)
		}, s.each(["load", "unload", "error"], function(e, t) {
			s.fn[t] = function() {
				var e = Array.prototype.slice.call(arguments, 0);
				return "load" === t && "string" == typeof e[0] ? R.apply(this, e) : (u("jQuery.fn." + t + "() is deprecated"), e.splice(0, 0, t), arguments.length ? this.on.apply(this, e) : (this.triggerHandler.apply(this, e), this))
			}
		}), s.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "), function(e, r) {
			s.fn[r] = function(e, t) {
				return u("jQuery.fn." + r + "() event shorthand is deprecated"), 0 < arguments.length ? this.on(r, null, e, t) : this.trigger(r)
			}
		}), s(function() {
			s(n.document).triggerHandler("ready")
		}), s.event.special.ready = {
			setup: function() {
				this === n.document && u("'ready' event is deprecated")
			}
		}, s.fn.extend({
			bind: function(e, t, r) {
				return u("jQuery.fn.bind() is deprecated"), this.on(e, null, t, r)
			},
			unbind: function(e, t) {
				return u("jQuery.fn.unbind() is deprecated"), this.off(e, null, t)
			},
			delegate: function(e, t, r, n) {
				return u("jQuery.fn.delegate() is deprecated"), this.on(t, e, r, n)
			},
			undelegate: function(e, t, r) {
				return u("jQuery.fn.undelegate() is deprecated"), 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", r)
			},
			hover: function(e, t) {
				return u("jQuery.fn.hover() is deprecated"), this.on("mouseenter", e).on("mouseleave", t || e)
			}
		});

		function T(e) {
			var t = n.document.implementation.createHTMLDocument("");
			return t.body.innerHTML = e, t.body && t.body.innerHTML
		}

		function P(e) {
			var t = e.replace(O, "<$1></$2>");
			t !== e && T(e) !== T(t) && u("HTML tags must be properly nested and closed: " + e)
		}
		var O = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,
			q = s.htmlPrefilter;
		s.UNSAFE_restoreLegacyHtmlPrefilter = function() {
			s.htmlPrefilter = function(e) {
				return P(e), e.replace(O, "<$1></$2>")
			}
		}, s.htmlPrefilter = function(e) {
			return P(e), q(e)
		};
		var D, _ = s.fn.offset;
		s.fn.offset = function() {
			var e = this[0];
			return !e || e.nodeType && e.getBoundingClientRect ? _.apply(this, arguments) : (u("jQuery.fn.offset() requires a valid DOM element"), arguments.length ? this : void 0)
		}, s.ajax && (D = s.param, s.param = function(e, t) {
			var r = s.ajaxSettings && s.ajaxSettings.traditional;
			return void 0 === t && r && (u("jQuery.param() no longer uses jQuery.ajaxSettings.traditional"), t = r), D.call(this, e, t)
		});
		var E, F, J = s.fn.andSelf || s.fn.addBack;
		return s.fn.andSelf = function() {
			return u("jQuery.fn.andSelf() is deprecated and removed, use jQuery.fn.addBack()"), J.apply(this, arguments)
		}, s.Deferred && (E = s.Deferred, F = [
			["resolve", "done", s.Callbacks("once memory"), s.Callbacks("once memory"), "resolved"],
			["reject", "fail", s.Callbacks("once memory"), s.Callbacks("once memory"), "rejected"],
			["notify", "progress", s.Callbacks("memory"), s.Callbacks("memory")]
		], s.Deferred = function(e) {
			var i = E(),
				a = i.promise();
			return i.pipe = a.pipe = function() {
				var o = arguments;
				return u("deferred.pipe() is deprecated"), s.Deferred(function(n) {
					s.each(F, function(e, t) {
						var r = "function" == typeof o[e] && o[e];
						i[t[1]](function() {
							var e = r && r.apply(this, arguments);
							e && "function" == typeof e.promise ? e.promise().done(n.resolve).fail(n.reject).progress(n.notify) : n[t[0] + "With"](this === a ? n.promise() : this, r ? [e] : arguments)
						})
					}), o = null
				}).promise()
			}, e && e.call(i, i), i
		}, s.Deferred.exceptionHook = E.exceptionHook), s
	});

(function($) {

	$(document).ready(function() {
		var mks_ep_modal_displayed = false;
		/* Modal open manually helper */
		$('body').on('click', '.mks-ep-trigger-open', function(e) {
			e.preventDefault();
			mks_ep_open_modal($('.mks-ep-modal'), 'click-customizer');
			mks_ep_modal_displayed = true;
		});

		if (mks_ep_can_display_modal()) {

			/* Exit trigger */
			$(document).on('mouseleave', function(e) {
				if (!mks_ep_modal_displayed && (e.pageY - $(window).scrollTop()) < 0) {
					mks_ep_open_modal($('.mks-ep-modal'), 'exit-demo');
					mks_ep_modal_displayed = true;
				}
			});
		}

		/* Modal close */
		$('.mks-ep-modal').on('click', 'a.mks-ep-close-modal', function(e) {
			e.preventDefault();
			mks_ep_close_modal($(this).closest('.mks-ep-modal'));
		});

		/* Test drive submit */
		$('.mks-ep-modal').on('submit', '.mks-ep-modal-test-drive-form', function(e) {
			e.preventDefault();
			var form = $(this);
			var email = form.find('.mks-ep-test-drive-email').val();
			var theme = form.find('.mks-ep-test-drive-theme').val();
			var ref = form.find('.mks-ep-test-drive-ref').val();

			if (!mks_ep_is_valid_email(email)) {
				return false;
			}

			// $.ajax({

			//     url: mks_ep_settings.ajax_url,
			//     method: 'POST',
			//     data: {
			//         action: 'mks_ep_test_drive_submit',
			//         email: email,
			//         theme: theme
			//     }

			// });

			// form.fadeOut(300, function() {
			//     $('.mks-ep-modal-test-drive-response').fadeIn(300);
			// });

			$('.mks-ep-modal-test-drive-request').fadeOut(300, function() {
				$('.mks-ep-modal-test-drive-loader').show();
				$.ajax({
					url: mks_ep_settings.ajax_url,
					type: "POST",
					data: {
						action: 'mks_ep_test_drive_submit',
						email: email,
						theme: theme,
						ref: ref
					},
					timeout: 8000,
					success: function(response) {

						$('.mks-ep-modal-test-drive-loader').hide();
						var res = JSON.parse(response);
						if (res.success) {
							$('.mks-ep-modal-test-drive-response-success').html(res.data);
							$('.mks-ep-modal-test-drive-response').fadeIn(300);

						} else {
							$('.mks-ep-modal-test-drive-response-error').html(res.data);
							$('.mks-ep-modal-test-drive-request').fadeIn(300);
						}

						// setTimeout(function() {
						//     mks_clear_blur($('#modal-try .content-wrapper'));
						// }, 500);

					},

					error: function(xmlhttprequest, textstatus, message) {

						$('.mks-ep-modal-test-drive-loader').hide();

						if (textstatus === 'timeout') {
							$('.mks-ep-modal-test-drive-response-success').html('All set, thanks! We will send you an email when your website is ready, in a couple of minutes.');

							$('.mks-ep-modal-test-drive-response').show().animate({
								opacity: 1
							}, 300);

						} else {
							$('.mks-ep-modal-test-drive-response-error').html(message);
							$('.mks-ep-modal-test-drive-request').fadeIn(300);
						}

						// setTimeout(function() {
						//     mks_clear_blur($('#modal-try .content-wrapper'));
						// }, 500);
					}
				});
			});
		});

	});

	/* Check if we modal should be displayed */
	function mks_ep_can_display_modal() {
		if (!mks_ep_is_desktop() || mks_ep_in_iframe() || !$('.mks-ep-modal').length || mks_ep_read_cookie('mks_exit_' + $('.mks-ep-test-drive-theme').val())) {
			return false;
		}

		// if (!mks_ep_is_desktop() || mks_ep_in_iframe() || !$('.mks-ep-modal').length) {
		//   return false;
		// }
		return true;
	}

	/* Close modal */
	function mks_ep_close_modal(obj) {
		obj.removeClass('active');
		$('body, html').removeClass('mks-ep-modal-open');
	}

	/* Open modal */
	function mks_ep_open_modal(obj, ref) {
		var window_height = $(window).height();
		obj.css('height', window_height + 'px').css('top', $(window).scrollTop() + 'px').addClass('active');
		$('body, html').addClass('mks-ep-modal-open');
		$('.mks-ep-modal-test-drive-response').hide();
		$('.mks-ep-modal-test-drive-request').show();
		//mks_ep_center(obj.find('.mks-ep-section'));
		$('.mks-ep-test-drive-ref').val(ref);
		var cookie_name = 'mks_exit_' + obj.find('.mks-ep-test-drive-theme').val();
		if (!mks_ep_read_cookie(cookie_name)) {
			mks_ep_create_cookie(cookie_name, true, 30);
		}

	}

	/* Is in iFrame */
	function mks_ep_in_iframe() {
		try {
			return window.self !== window.top;
		} catch (e) {
			return true;
		}
	}

	/* Check if is desktop */
	function mks_ep_is_desktop() {
		if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
			return false;
		}

		return true;
	}

	/* Create cookie */
	function mks_ep_create_cookie(name, value, days) {
		var expires;

		if (days) {
			var date = new Date();
			date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
			expires = "; expires=" + date.toGMTString();
		} else {
			expires = "";
		}
		document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value) + expires + "; path=/";
	}

	/* Read/check cookie */
	function mks_ep_read_cookie(name) {
		var nameEQ = encodeURIComponent(name) + "=";
		var ca = document.cookie.split(';');
		for (var i = 0; i < ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) === ' ') c = c.substring(1, c.length);
			if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length, c.length));
		}
		return null;
	}

	/* Delete cookie */
	function mks_ep_erase_cookie(name) {
		createCookie(name, "", -1);
	}

	/* Validate email */
	function mks_ep_is_valid_email(email) {

		if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,5})+$/.test(email)) {
			return true;

		}

		return false;
	}

	/* Function to center elements */
	function mks_ep_center(obj) {

		var parent_height = obj.parent().height();
		var obj_height = obj.height();

		if (parent_height > obj_height + 80) {
			obj.css("position", "absolute");
			obj.css("top", ((parent_height - obj_height) / 2) + "px");
		} else {
			obj.css("padding-top", '40px').css("padding-bottom", '40px');
		}
	}
})(jQuery);

(function($) {
	$(document).ready(function($) {

		if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {

			$("body").on("touchstart", ".mks_accordion_heading", function(e) {
				mks_accordion_handle($(this));
			});

			$("body").on("touchstart", ".mks_toggle_heading", function(e) {
				mks_toggle_handle($(this));
			});


			$("body").on("touchstart", ".mks_tabs_nav .mks_tab_nav_item", function(e) {
				mks_tab_handle($(this));
			});

		} else {

			$("body").on("click", ".mks_accordion_heading", function(e) {
				mks_accordion_handle($(this));
			});


			$("body").on("click", ".mks_toggle_heading", function(e) {
				mks_toggle_handle($(this));
			});


			$("body").on("click", ".mks_tabs_nav .mks_tab_nav_item", function(e) {
				mks_tab_handle($(this));
			});
		}
	}); // end $(document).ready()

	/* Initialize tabs */

	$(window).on('load', function() {
		$('.mks_tabs').each(function() {
			mks_init_tabs($(this));
		});

		mks_tabs_check_switch($('.mks_tabs'));
	});

	$(window).resize(function() {
		mks_tabs_check_switch($('.mks_tabs'));
	});

	function mks_tabs_check_switch(obj) {
		if (!obj.length) return;

		obj.each(function() {

			var tabs_holder = $(this);
			var tabs_nav_wrapper = tabs_holder.find('.mks_tabs_nav');

			if (!tabs_holder.hasClass('mks-accordion-switched')) {

				var tabs_width = mks_check_tabs_width(tabs_holder);
				if (tabs_width && !tabs_holder.hasClass('vertical')) {
					mks_tabs_to_accordion(tabs_holder, tabs_width);
				}

				var vertical_tabs_width = tabs_holder.hasClass('vertical') && tabs_nav_wrapper.width() < 80 ? tabs_holder.width() : false;
				if (vertical_tabs_width) {
					mks_tabs_to_accordion(tabs_holder, vertical_tabs_width);
				}

			} else {

				if (tabs_holder.hasClass('mks-accordion-switched')) {
					var resized_on = tabs_holder.attr('data-resized-on');
					if (resized_on && resized_on < tabs_holder.width()) {
						mks_init_tabs(tabs_holder);
					}
				}
			}

		});

	}

	function mks_init_tabs(obj) {

		var tabs_holder = obj;
		var tabs_nav_wrapper = tabs_holder.find('.mks_tabs_nav');
		var tabs_content = tabs_holder.find('.mks_tab_item, .mks_accordion_item');

		tabs_holder.removeClass('mks_accordion mks-accordion-switched');
		tabs_holder.find('.mks_accordion_item, .mks_tab_item').remove();
		tabs_nav_wrapper.show();

		if (tabs_holder.hasClass('vertical')) {
			tabs_holder.css('padding', '0 0 0 19.9%');
		} else {
			tabs_holder.css('padding', '40px 0 0 0');
		}

		tabs_content.each(function() {
			tabs_nav_wrapper.append('<div class="mks_tab_nav_item">' + $(this).find('.nav').html() + '</div>');

			if ($(this).hasClass('mks_accordion_item')) {
				tabs_holder.append('<div class="mks_tab_item" style="display:none;">' + $(this).find('.mks_accordion_content').html() + '</div>').hide();
			} else {
				tabs_holder.append('<div class="mks_tab_item" style="display:none;">' + $(this).html() + '</div>').hide();
			}

		});

		tabs_nav_wrapper.find('.mks_tab_nav_item:first').addClass('active');
		tabs_holder.find('.nav').hide();
		tabs_holder.find('.mks_tab_item:first').show();
		tabs_holder.show();


	}

	function mks_check_tabs_width(obj) {

		var tabs_nav_wrapper = obj.find('.mks_tabs_nav');
		var tabs_width = tabs_nav_wrapper.width();
		var tab = tabs_nav_wrapper.find('.mks_tab_nav_item');
		var tab_width = 0;

		tab.each(function() {
			tab_width += $(this).outerWidth();
		});

		if (tabs_width <= tab_width + 24) {
			return tabs_width;
		}
		return false;
	}


	function mks_tabs_to_accordion(obj, resized_on) {

		var tabs_holder = obj;
		var tabs_nav_wrapper = tabs_holder.find('.mks_tabs_nav');
		var tabs_content = tabs_holder.find('.mks_tab_item');

		tabs_holder.addClass('mks_accordion mks-accordion-switched').attr('data-resized-on', resized_on);
		tabs_holder.find('.mks_tab_item').remove();
		tabs_nav_wrapper.children().remove();
		tabs_nav_wrapper.hide();
		tabs_holder.css({
			'display': 'block',
			'padding': 0
		});

		tabs_content.each(function() {
			tabs_holder.append('<div class="mks_accordion_item"><div class="mks_accordion_heading">' + $(this).find('.nav').html() +
				'<i class="fa fa-plus"></i><i class="fa fa-minus"></i></div><div class="mks_accordion_content">' + $(this).html() + '</div></div>');
		});

		tabs_holder.find('.nav').hide();

	}

	function mks_accordion_handle($obj) {
		var toggle = $obj.parent('.mks_accordion_item');
		if (!toggle.hasClass('mks_accordion_active')) {
			toggle.parent('div').find('.mks_accordion_item').find('.mks_accordion_content:visible').slideUp("fast");
			toggle.parent('div').find('.mks_accordion_active').removeClass('mks_accordion_active');
			toggle.find('.mks_accordion_content').slideToggle("fast", function() {
				toggle.addClass('mks_accordion_active');
				if ((toggle.offset().top + 100) < $(window).scrollTop()) {
					$('html, body').stop().animate({
						scrollTop: (toggle.offset().top - 100)
					}, '300');
				}
			});
		} else {
			toggle.parent('div').find('.mks_accordion_item').find('.mks_accordion_content:visible').slideUp("fast");
			toggle.parent('div').find('.mks_accordion_active').removeClass('mks_accordion_active');
		}
	}

	function mks_toggle_handle($obj) {
		var toggle = $obj.parent('.mks_toggle');
		toggle.find('.mks_toggle_content').slideToggle("fast", function() {
			toggle.toggleClass('mks_toggle_active');
		});
	}

	function mks_tab_handle($obj) {
		if ($obj.hasClass('active') === false) {

			tab_to_show = $obj.parent('.mks_tabs_nav').find('.mks_tab_nav_item').index($obj);

			$obj.parent('.mks_tabs_nav').parent('.mks_tabs').find('.mks_tab_item').hide();
			$obj.parent('.mks_tabs_nav').parent('.mks_tabs').find('.mks_tab_item').eq(tab_to_show).show();

			$obj.parent('.mks_tabs_nav').find('.mks_tab_nav_item').removeClass('active');
			$obj.addClass('active');

		}
	}

})(jQuery);

jQuery(document).ready(function() {});

! function(e, t) {
	"function" == typeof define && define.amd ? define("ev-emitter/ev-emitter", t) : "object" == typeof module && module.exports ? module.exports = t() : e.EvEmitter = t()
}("undefined" != typeof window ? window : this, function() {
	function e() {}
	var t = e.prototype;
	return t.on = function(e, t) {
		if (e && t) {
			var i = this._events = this._events || {},
				n = i[e] = i[e] || [];
			return n.indexOf(t) == -1 && n.push(t), this
		}
	}, t.once = function(e, t) {
		if (e && t) {
			this.on(e, t);
			var i = this._onceEvents = this._onceEvents || {},
				n = i[e] = i[e] || {};
			return n[t] = !0, this
		}
	}, t.off = function(e, t) {
		var i = this._events && this._events[e];
		if (i && i.length) {
			var n = i.indexOf(t);
			return n != -1 && i.splice(n, 1), this
		}
	}, t.emitEvent = function(e, t) {
		var i = this._events && this._events[e];
		if (i && i.length) {
			i = i.slice(0), t = t || [];
			for (var n = this._onceEvents && this._onceEvents[e], o = 0; o < i.length; o++) {
				var r = i[o],
					s = n && n[r];
				s && (this.off(e, r), delete n[r]), r.apply(this, t)
			}
			return this
		}
	}, t.allOff = function() {
		delete this._events, delete this._onceEvents
	}, e
}),
function(e, t) {
	"use strict";
	"function" == typeof define && define.amd ? define(["ev-emitter/ev-emitter"], function(i) {
		return t(e, i)
	}) : "object" == typeof module && module.exports ? module.exports = t(e, require("ev-emitter")) : e.imagesLoaded = t(e, e.EvEmitter)
}("undefined" != typeof window ? window : this, function(e, t) {
	function i(e, t) {
		for (var i in t) e[i] = t[i];
		return e
	}

	function n(e) {
		if (Array.isArray(e)) return e;
		var t = "object" == typeof e && "number" == typeof e.length;
		return t ? d.call(e) : [e]
	}

	function o(e, t, r) {
		if (!(this instanceof o)) return new o(e, t, r);
		var s = e;
		return "string" == typeof e && (s = document.querySelectorAll(e)), s ? (this.elements = n(s), this.options = i({}, this.options), "function" == typeof t ? r = t : i(this.options, t), r && this.on("always", r), this.getImages(), h && (this.jqDeferred = new h.Deferred), void setTimeout(this.check.bind(this))) : void a.error("Bad element for imagesLoaded " + (s || e))
	}

	function r(e) {
		this.img = e
	}

	function s(e, t) {
		this.url = e, this.element = t, this.img = new Image
	}
	var h = e.jQuery,
		a = e.console,
		d = Array.prototype.slice;
	o.prototype = Object.create(t.prototype), o.prototype.options = {}, o.prototype.getImages = function() {
		this.images = [], this.elements.forEach(this.addElementImages, this)
	}, o.prototype.addElementImages = function(e) {
		"IMG" == e.nodeName && this.addImage(e), this.options.background === !0 && this.addElementBackgroundImages(e);
		var t = e.nodeType;
		if (t && u[t]) {
			for (var i = e.querySelectorAll("img"), n = 0; n < i.length; n++) {
				var o = i[n];
				this.addImage(o)
			}
			if ("string" == typeof this.options.background) {
				var r = e.querySelectorAll(this.options.background);
				for (n = 0; n < r.length; n++) {
					var s = r[n];
					this.addElementBackgroundImages(s)
				}
			}
		}
	};
	var u = {
		1: !0,
		9: !0,
		11: !0
	};
	return o.prototype.addElementBackgroundImages = function(e) {
		var t = getComputedStyle(e);
		if (t)
			for (var i = /url\((['"])?(.*?)\1\)/gi, n = i.exec(t.backgroundImage); null !== n;) {
				var o = n && n[2];
				o && this.addBackground(o, e), n = i.exec(t.backgroundImage)
			}
	}, o.prototype.addImage = function(e) {
		var t = new r(e);
		this.images.push(t)
	}, o.prototype.addBackground = function(e, t) {
		var i = new s(e, t);
		this.images.push(i)
	}, o.prototype.check = function() {
		function e(e, i, n) {
			setTimeout(function() {
				t.progress(e, i, n)
			})
		}
		var t = this;
		return this.progressedCount = 0, this.hasAnyBroken = !1, this.images.length ? void this.images.forEach(function(t) {
			t.once("progress", e), t.check()
		}) : void this.complete()
	}, o.prototype.progress = function(e, t, i) {
		this.progressedCount++, this.hasAnyBroken = this.hasAnyBroken || !e.isLoaded, this.emitEvent("progress", [this, e, t]), this.jqDeferred && this.jqDeferred.notify && this.jqDeferred.notify(this, e), this.progressedCount == this.images.length && this.complete(), this.options.debug && a && a.log("progress: " + i, e, t)
	}, o.prototype.complete = function() {
		var e = this.hasAnyBroken ? "fail" : "done";
		if (this.isComplete = !0, this.emitEvent(e, [this]), this.emitEvent("always", [this]), this.jqDeferred) {
			var t = this.hasAnyBroken ? "reject" : "resolve";
			this.jqDeferred[t](this)
		}
	}, r.prototype = Object.create(t.prototype), r.prototype.check = function() {
		var e = this.getIsImageComplete();
		return e ? void this.confirm(0 !== this.img.naturalWidth, "naturalWidth") : (this.proxyImage = new Image, this.proxyImage.addEventListener("load", this), this.proxyImage.addEventListener("error", this), this.img.addEventListener("load", this), this.img.addEventListener("error", this), void(this.proxyImage.src = this.img.src))
	}, r.prototype.getIsImageComplete = function() {
		return this.img.complete && this.img.naturalWidth
	}, r.prototype.confirm = function(e, t) {
		this.isLoaded = e, this.emitEvent("progress", [this, this.img, t])
	}, r.prototype.handleEvent = function(e) {
		var t = "on" + e.type;
		this[t] && this[t](e)
	}, r.prototype.onload = function() {
		this.confirm(!0, "onload"), this.unbindEvents()
	}, r.prototype.onerror = function() {
		this.confirm(!1, "onerror"), this.unbindEvents()
	}, r.prototype.unbindEvents = function() {
		this.proxyImage.removeEventListener("load", this), this.proxyImage.removeEventListener("error", this), this.img.removeEventListener("load", this), this.img.removeEventListener("error", this)
	}, s.prototype = Object.create(r.prototype), s.prototype.check = function() {
		this.img.addEventListener("load", this), this.img.addEventListener("error", this), this.img.src = this.url;
		var e = this.getIsImageComplete();
		e && (this.confirm(0 !== this.img.naturalWidth, "naturalWidth"), this.unbindEvents())
	}, s.prototype.unbindEvents = function() {
		this.img.removeEventListener("load", this), this.img.removeEventListener("error", this)
	}, s.prototype.confirm = function(e, t) {
		this.isLoaded = e, this.emitEvent("progress", [this, this.element, t])
	}, o.makeJQueryPlugin = function(t) {
		t = t || e.jQuery, t && (h = t, h.fn.imagesLoaded = function(e, t) {
			var i = new o(this, e, t);
			return i.jqDeferred.promise(h(this))
		})
	}, o.makeJQueryPlugin(), o
});

/* Minit: /wp-includes/js/masonry.min.js */
/*! This file is auto-generated */
/*!
 * Masonry PACKAGED v4.2.2
 * Cascading grid layout library
 * https://masonry.desandro.com
 * MIT License
 * by David DeSandro
 */

! function(t, e) {
	"function" == typeof define && define.amd ? define("jquery-bridget/jquery-bridget", ["jquery"], function(i) {
		return e(t, i)
	}) : "object" == typeof module && module.exports ? module.exports = e(t, require("jquery")) : t.jQueryBridget = e(t, t.jQuery)
}(window, function(t, e) {
	"use strict";

	function i(i, r, a) {
		function h(t, e, n) {
			var o, r = "$()." + i + '("' + e + '")';
			return t.each(function(t, h) {
				var u = a.data(h, i);
				if (!u) return void s(i + " not initialized. Cannot call methods, i.e. " + r);
				var d = u[e];
				if (!d || "_" == e.charAt(0)) return void s(r + " is not a valid method");
				var l = d.apply(u, n);
				o = void 0 === o ? l : o
			}), void 0 !== o ? o : t
		}

		function u(t, e) {
			t.each(function(t, n) {
				var o = a.data(n, i);
				o ? (o.option(e), o._init()) : (o = new r(n, e), a.data(n, i, o))
			})
		}
		a = a || e || t.jQuery, a && (r.prototype.option || (r.prototype.option = function(t) {
			a.isPlainObject(t) && (this.options = a.extend(!0, this.options, t))
		}), a.fn[i] = function(t) {
			if ("string" == typeof t) {
				var e = o.call(arguments, 1);
				return h(this, t, e)
			}
			return u(this, t), this
		}, n(a))
	}

	function n(t) {
		!t || t && t.bridget || (t.bridget = i)
	}
	var o = Array.prototype.slice,
		r = t.console,
		s = "undefined" == typeof r ? function() {} : function(t) {
			r.error(t)
		};
	return n(e || t.jQuery), i
}),
function(t, e) {
	"function" == typeof define && define.amd ? define("ev-emitter/ev-emitter", e) : "object" == typeof module && module.exports ? module.exports = e() : t.EvEmitter = e()
}("undefined" != typeof window ? window : this, function() {
	function t() {}
	var e = t.prototype;
	return e.on = function(t, e) {
		if (t && e) {
			var i = this._events = this._events || {},
				n = i[t] = i[t] || [];
			return -1 == n.indexOf(e) && n.push(e), this
		}
	}, e.once = function(t, e) {
		if (t && e) {
			this.on(t, e);
			var i = this._onceEvents = this._onceEvents || {},
				n = i[t] = i[t] || {};
			return n[e] = !0, this
		}
	}, e.off = function(t, e) {
		var i = this._events && this._events[t];
		if (i && i.length) {
			var n = i.indexOf(e);
			return -1 != n && i.splice(n, 1), this
		}
	}, e.emitEvent = function(t, e) {
		var i = this._events && this._events[t];
		if (i && i.length) {
			i = i.slice(0), e = e || [];
			for (var n = this._onceEvents && this._onceEvents[t], o = 0; o < i.length; o++) {
				var r = i[o],
					s = n && n[r];
				s && (this.off(t, r), delete n[r]), r.apply(this, e)
			}
			return this
		}
	}, e.allOff = function() {
		delete this._events, delete this._onceEvents
	}, t
}),
function(t, e) {
	"function" == typeof define && define.amd ? define("get-size/get-size", e) : "object" == typeof module && module.exports ? module.exports = e() : t.getSize = e()
}(window, function() {
	"use strict";

	function t(t) {
		var e = parseFloat(t),
			i = -1 == t.indexOf("%") && !isNaN(e);
		return i && e
	}

	function e() {}

	function i() {
		for (var t = {
				width: 0,
				height: 0,
				innerWidth: 0,
				innerHeight: 0,
				outerWidth: 0,
				outerHeight: 0
			}, e = 0; u > e; e++) {
			var i = h[e];
			t[i] = 0
		}
		return t
	}

	function n(t) {
		var e = getComputedStyle(t);
		return e || a("Style returned " + e + ". Are you running this code in a hidden iframe on Firefox? See https://bit.ly/getsizebug1"), e
	}

	function o() {
		if (!d) {
			d = !0;
			var e = document.createElement("div");
			e.style.width = "200px", e.style.padding = "1px 2px 3px 4px", e.style.borderStyle = "solid", e.style.borderWidth = "1px 2px 3px 4px", e.style.boxSizing = "border-box";
			var i = document.body || document.documentElement;
			i.appendChild(e);
			var o = n(e);
			s = 200 == Math.round(t(o.width)), r.isBoxSizeOuter = s, i.removeChild(e)
		}
	}

	function r(e) {
		if (o(), "string" == typeof e && (e = document.querySelector(e)), e && "object" == typeof e && e.nodeType) {
			var r = n(e);
			if ("none" == r.display) return i();
			var a = {};
			a.width = e.offsetWidth, a.height = e.offsetHeight;
			for (var d = a.isBorderBox = "border-box" == r.boxSizing, l = 0; u > l; l++) {
				var c = h[l],
					f = r[c],
					m = parseFloat(f);
				a[c] = isNaN(m) ? 0 : m
			}
			var p = a.paddingLeft + a.paddingRight,
				g = a.paddingTop + a.paddingBottom,
				y = a.marginLeft + a.marginRight,
				v = a.marginTop + a.marginBottom,
				_ = a.borderLeftWidth + a.borderRightWidth,
				z = a.borderTopWidth + a.borderBottomWidth,
				E = d && s,
				b = t(r.width);
			b !== !1 && (a.width = b + (E ? 0 : p + _));
			var x = t(r.height);
			return x !== !1 && (a.height = x + (E ? 0 : g + z)), a.innerWidth = a.width - (p + _), a.innerHeight = a.height - (g + z), a.outerWidth = a.width + y, a.outerHeight = a.height + v, a
		}
	}
	var s, a = "undefined" == typeof console ? e : function(t) {
			console.error(t)
		},
		h = ["paddingLeft", "paddingRight", "paddingTop", "paddingBottom", "marginLeft", "marginRight", "marginTop", "marginBottom", "borderLeftWidth", "borderRightWidth", "borderTopWidth", "borderBottomWidth"],
		u = h.length,
		d = !1;
	return r
}),
function(t, e) {
	"use strict";
	"function" == typeof define && define.amd ? define("desandro-matches-selector/matches-selector", e) : "object" == typeof module && module.exports ? module.exports = e() : t.matchesSelector = e()
}(window, function() {
	"use strict";
	var t = function() {
		var t = window.Element.prototype;
		if (t.matches) return "matches";
		if (t.matchesSelector) return "matchesSelector";
		for (var e = ["webkit", "moz", "ms", "o"], i = 0; i < e.length; i++) {
			var n = e[i],
				o = n + "MatchesSelector";
			if (t[o]) return o
		}
	}();
	return function(e, i) {
		return e[t](i)
	}
}),
function(t, e) {
	"function" == typeof define && define.amd ? define("fizzy-ui-utils/utils", ["desandro-matches-selector/matches-selector"], function(i) {
		return e(t, i)
	}) : "object" == typeof module && module.exports ? module.exports = e(t, require("desandro-matches-selector")) : t.fizzyUIUtils = e(t, t.matchesSelector)
}(window, function(t, e) {
	var i = {};
	i.extend = function(t, e) {
		for (var i in e) t[i] = e[i];
		return t
	}, i.modulo = function(t, e) {
		return (t % e + e) % e
	};
	var n = Array.prototype.slice;
	i.makeArray = function(t) {
		if (Array.isArray(t)) return t;
		if (null === t || void 0 === t) return [];
		var e = "object" == typeof t && "number" == typeof t.length;
		return e ? n.call(t) : [t]
	}, i.removeFrom = function(t, e) {
		var i = t.indexOf(e); - 1 != i && t.splice(i, 1)
	}, i.getParent = function(t, i) {
		for (; t.parentNode && t != document.body;)
			if (t = t.parentNode, e(t, i)) return t
	}, i.getQueryElement = function(t) {
		return "string" == typeof t ? document.querySelector(t) : t
	}, i.handleEvent = function(t) {
		var e = "on" + t.type;
		this[e] && this[e](t)
	}, i.filterFindElements = function(t, n) {
		t = i.makeArray(t);
		var o = [];
		return t.forEach(function(t) {
			if (t instanceof HTMLElement) {
				if (!n) return void o.push(t);
				e(t, n) && o.push(t);
				for (var i = t.querySelectorAll(n), r = 0; r < i.length; r++) o.push(i[r])
			}
		}), o
	}, i.debounceMethod = function(t, e, i) {
		i = i || 100;
		var n = t.prototype[e],
			o = e + "Timeout";
		t.prototype[e] = function() {
			var t = this[o];
			clearTimeout(t);
			var e = arguments,
				r = this;
			this[o] = setTimeout(function() {
				n.apply(r, e), delete r[o]
			}, i)
		}
	}, i.docReady = function(t) {
		var e = document.readyState;
		"complete" == e || "interactive" == e ? setTimeout(t) : document.addEventListener("DOMContentLoaded", t)
	}, i.toDashed = function(t) {
		return t.replace(/(.)([A-Z])/g, function(t, e, i) {
			return e + "-" + i
		}).toLowerCase()
	};
	var o = t.console;
	return i.htmlInit = function(e, n) {
		i.docReady(function() {
			var r = i.toDashed(n),
				s = "data-" + r,
				a = document.querySelectorAll("[" + s + "]"),
				h = document.querySelectorAll(".js-" + r),
				u = i.makeArray(a).concat(i.makeArray(h)),
				d = s + "-options",
				l = t.jQuery;
			u.forEach(function(t) {
				var i, r = t.getAttribute(s) || t.getAttribute(d);
				try {
					i = r && JSON.parse(r)
				} catch (a) {
					return void(o && o.error("Error parsing " + s + " on " + t.className + ": " + a))
				}
				var h = new e(t, i);
				l && l.data(t, n, h)
			})
		})
	}, i
}),
function(t, e) {
	"function" == typeof define && define.amd ? define("outlayer/item", ["ev-emitter/ev-emitter", "get-size/get-size"], e) : "object" == typeof module && module.exports ? module.exports = e(require("ev-emitter"), require("get-size")) : (t.Outlayer = {}, t.Outlayer.Item = e(t.EvEmitter, t.getSize))
}(window, function(t, e) {
	"use strict";

	function i(t) {
		for (var e in t) return !1;
		return e = null, !0
	}

	function n(t, e) {
		t && (this.element = t, this.layout = e, this.position = {
			x: 0,
			y: 0
		}, this._create())
	}

	function o(t) {
		return t.replace(/([A-Z])/g, function(t) {
			return "-" + t.toLowerCase()
		})
	}
	var r = document.documentElement.style,
		s = "string" == typeof r.transition ? "transition" : "WebkitTransition",
		a = "string" == typeof r.transform ? "transform" : "WebkitTransform",
		h = {
			WebkitTransition: "webkitTransitionEnd",
			transition: "transitionend"
		} [s],
		u = {
			transform: a,
			transition: s,
			transitionDuration: s + "Duration",
			transitionProperty: s + "Property",
			transitionDelay: s + "Delay"
		},
		d = n.prototype = Object.create(t.prototype);
	d.constructor = n, d._create = function() {
		this._transn = {
			ingProperties: {},
			clean: {},
			onEnd: {}
		}, this.css({
			position: "absolute"
		})
	}, d.handleEvent = function(t) {
		var e = "on" + t.type;
		this[e] && this[e](t)
	}, d.getSize = function() {
		this.size = e(this.element)
	}, d.css = function(t) {
		var e = this.element.style;
		for (var i in t) {
			var n = u[i] || i;
			e[n] = t[i]
		}
	}, d.getPosition = function() {
		var t = getComputedStyle(this.element),
			e = this.layout._getOption("originLeft"),
			i = this.layout._getOption("originTop"),
			n = t[e ? "left" : "right"],
			o = t[i ? "top" : "bottom"],
			r = parseFloat(n),
			s = parseFloat(o),
			a = this.layout.size; - 1 != n.indexOf("%") && (r = r / 100 * a.width), -1 != o.indexOf("%") && (s = s / 100 * a.height), r = isNaN(r) ? 0 : r, s = isNaN(s) ? 0 : s, r -= e ? a.paddingLeft : a.paddingRight, s -= i ? a.paddingTop : a.paddingBottom, this.position.x = r, this.position.y = s
	}, d.layoutPosition = function() {
		var t = this.layout.size,
			e = {},
			i = this.layout._getOption("originLeft"),
			n = this.layout._getOption("originTop"),
			o = i ? "paddingLeft" : "paddingRight",
			r = i ? "left" : "right",
			s = i ? "right" : "left",
			a = this.position.x + t[o];
		e[r] = this.getXValue(a), e[s] = "";
		var h = n ? "paddingTop" : "paddingBottom",
			u = n ? "top" : "bottom",
			d = n ? "bottom" : "top",
			l = this.position.y + t[h];
		e[u] = this.getYValue(l), e[d] = "", this.css(e), this.emitEvent("layout", [this])
	}, d.getXValue = function(t) {
		var e = this.layout._getOption("horizontal");
		return this.layout.options.percentPosition && !e ? t / this.layout.size.width * 100 + "%" : t + "px"
	}, d.getYValue = function(t) {
		var e = this.layout._getOption("horizontal");
		return this.layout.options.percentPosition && e ? t / this.layout.size.height * 100 + "%" : t + "px"
	}, d._transitionTo = function(t, e) {
		this.getPosition();
		var i = this.position.x,
			n = this.position.y,
			o = t == this.position.x && e == this.position.y;
		if (this.setPosition(t, e), o && !this.isTransitioning) return void this.layoutPosition();
		var r = t - i,
			s = e - n,
			a = {};
		a.transform = this.getTranslate(r, s), this.transition({
			to: a,
			onTransitionEnd: {
				transform: this.layoutPosition
			},
			isCleaning: !0
		})
	}, d.getTranslate = function(t, e) {
		var i = this.layout._getOption("originLeft"),
			n = this.layout._getOption("originTop");
		return t = i ? t : -t, e = n ? e : -e, "translate3d(" + t + "px, " + e + "px, 0)"
	}, d.goTo = function(t, e) {
		this.setPosition(t, e), this.layoutPosition()
	}, d.moveTo = d._transitionTo, d.setPosition = function(t, e) {
		this.position.x = parseFloat(t), this.position.y = parseFloat(e)
	}, d._nonTransition = function(t) {
		this.css(t.to), t.isCleaning && this._removeStyles(t.to);
		for (var e in t.onTransitionEnd) t.onTransitionEnd[e].call(this)
	}, d.transition = function(t) {
		if (!parseFloat(this.layout.options.transitionDuration)) return void this._nonTransition(t);
		var e = this._transn;
		for (var i in t.onTransitionEnd) e.onEnd[i] = t.onTransitionEnd[i];
		for (i in t.to) e.ingProperties[i] = !0, t.isCleaning && (e.clean[i] = !0);
		if (t.from) {
			this.css(t.from);
			var n = this.element.offsetHeight;
			n = null
		}
		this.enableTransition(t.to), this.css(t.to), this.isTransitioning = !0
	};
	var l = "opacity," + o(a);
	d.enableTransition = function() {
		if (!this.isTransitioning) {
			var t = this.layout.options.transitionDuration;
			t = "number" == typeof t ? t + "ms" : t, this.css({
				transitionProperty: l,
				transitionDuration: t,
				transitionDelay: this.staggerDelay || 0
			}), this.element.addEventListener(h, this, !1)
		}
	}, d.onwebkitTransitionEnd = function(t) {
		this.ontransitionend(t)
	}, d.onotransitionend = function(t) {
		this.ontransitionend(t)
	};
	var c = {
		"-webkit-transform": "transform"
	};
	d.ontransitionend = function(t) {
		if (t.target === this.element) {
			var e = this._transn,
				n = c[t.propertyName] || t.propertyName;
			if (delete e.ingProperties[n], i(e.ingProperties) && this.disableTransition(), n in e.clean && (this.element.style[t.propertyName] = "", delete e.clean[n]), n in e.onEnd) {
				var o = e.onEnd[n];
				o.call(this), delete e.onEnd[n]
			}
			this.emitEvent("transitionEnd", [this])
		}
	}, d.disableTransition = function() {
		this.removeTransitionStyles(), this.element.removeEventListener(h, this, !1), this.isTransitioning = !1
	}, d._removeStyles = function(t) {
		var e = {};
		for (var i in t) e[i] = "";
		this.css(e)
	};
	var f = {
		transitionProperty: "",
		transitionDuration: "",
		transitionDelay: ""
	};
	return d.removeTransitionStyles = function() {
		this.css(f)
	}, d.stagger = function(t) {
		t = isNaN(t) ? 0 : t, this.staggerDelay = t + "ms"
	}, d.removeElem = function() {
		this.element.parentNode.removeChild(this.element), this.css({
			display: ""
		}), this.emitEvent("remove", [this])
	}, d.remove = function() {
		return s && parseFloat(this.layout.options.transitionDuration) ? (this.once("transitionEnd", function() {
			this.removeElem()
		}), void this.hide()) : void this.removeElem()
	}, d.reveal = function() {
		delete this.isHidden, this.css({
			display: ""
		});
		var t = this.layout.options,
			e = {},
			i = this.getHideRevealTransitionEndProperty("visibleStyle");
		e[i] = this.onRevealTransitionEnd, this.transition({
			from: t.hiddenStyle,
			to: t.visibleStyle,
			isCleaning: !0,
			onTransitionEnd: e
		})
	}, d.onRevealTransitionEnd = function() {
		this.isHidden || this.emitEvent("reveal")
	}, d.getHideRevealTransitionEndProperty = function(t) {
		var e = this.layout.options[t];
		if (e.opacity) return "opacity";
		for (var i in e) return i
	}, d.hide = function() {
		this.isHidden = !0, this.css({
			display: ""
		});
		var t = this.layout.options,
			e = {},
			i = this.getHideRevealTransitionEndProperty("hiddenStyle");
		e[i] = this.onHideTransitionEnd, this.transition({
			from: t.visibleStyle,
			to: t.hiddenStyle,
			isCleaning: !0,
			onTransitionEnd: e
		})
	}, d.onHideTransitionEnd = function() {
		this.isHidden && (this.css({
			display: "none"
		}), this.emitEvent("hide"))
	}, d.destroy = function() {
		this.css({
			position: "",
			left: "",
			right: "",
			top: "",
			bottom: "",
			transition: "",
			transform: ""
		})
	}, n
}),
function(t, e) {
	"use strict";
	"function" == typeof define && define.amd ? define("outlayer/outlayer", ["ev-emitter/ev-emitter", "get-size/get-size", "fizzy-ui-utils/utils", "./item"], function(i, n, o, r) {
		return e(t, i, n, o, r)
	}) : "object" == typeof module && module.exports ? module.exports = e(t, require("ev-emitter"), require("get-size"), require("fizzy-ui-utils"), require("./item")) : t.Outlayer = e(t, t.EvEmitter, t.getSize, t.fizzyUIUtils, t.Outlayer.Item)
}(window, function(t, e, i, n, o) {
	"use strict";

	function r(t, e) {
		var i = n.getQueryElement(t);
		if (!i) return void(h && h.error("Bad element for " + this.constructor.namespace + ": " + (i || t)));
		this.element = i, u && (this.$element = u(this.element)), this.options = n.extend({}, this.constructor.defaults), this.option(e);
		var o = ++l;
		this.element.outlayerGUID = o, c[o] = this, this._create();
		var r = this._getOption("initLayout");
		r && this.layout()
	}

	function s(t) {
		function e() {
			t.apply(this, arguments)
		}
		return e.prototype = Object.create(t.prototype), e.prototype.constructor = e, e
	}

	function a(t) {
		if ("number" == typeof t) return t;
		var e = t.match(/(^\d*\.?\d*)(\w*)/),
			i = e && e[1],
			n = e && e[2];
		if (!i.length) return 0;
		i = parseFloat(i);
		var o = m[n] || 1;
		return i * o
	}
	var h = t.console,
		u = t.jQuery,
		d = function() {},
		l = 0,
		c = {};
	r.namespace = "outlayer", r.Item = o, r.defaults = {
		containerStyle: {
			position: "relative"
		},
		initLayout: !0,
		originLeft: !0,
		originTop: !0,
		resize: !0,
		resizeContainer: !0,
		transitionDuration: "0.4s",
		hiddenStyle: {
			opacity: 0,
			transform: "scale(0.001)"
		},
		visibleStyle: {
			opacity: 1,
			transform: "scale(1)"
		}
	};
	var f = r.prototype;
	n.extend(f, e.prototype), f.option = function(t) {
		n.extend(this.options, t)
	}, f._getOption = function(t) {
		var e = this.constructor.compatOptions[t];
		return e && void 0 !== this.options[e] ? this.options[e] : this.options[t]
	}, r.compatOptions = {
		initLayout: "isInitLayout",
		horizontal: "isHorizontal",
		layoutInstant: "isLayoutInstant",
		originLeft: "isOriginLeft",
		originTop: "isOriginTop",
		resize: "isResizeBound",
		resizeContainer: "isResizingContainer"
	}, f._create = function() {
		this.reloadItems(), this.stamps = [], this.stamp(this.options.stamp), n.extend(this.element.style, this.options.containerStyle);
		var t = this._getOption("resize");
		t && this.bindResize()
	}, f.reloadItems = function() {
		this.items = this._itemize(this.element.children)
	}, f._itemize = function(t) {
		for (var e = this._filterFindItemElements(t), i = this.constructor.Item, n = [], o = 0; o < e.length; o++) {
			var r = e[o],
				s = new i(r, this);
			n.push(s)
		}
		return n
	}, f._filterFindItemElements = function(t) {
		return n.filterFindElements(t, this.options.itemSelector)
	}, f.getItemElements = function() {
		return this.items.map(function(t) {
			return t.element
		})
	}, f.layout = function() {
		this._resetLayout(), this._manageStamps();
		var t = this._getOption("layoutInstant"),
			e = void 0 !== t ? t : !this._isLayoutInited;
		this.layoutItems(this.items, e), this._isLayoutInited = !0
	}, f._init = f.layout, f._resetLayout = function() {
		this.getSize()
	}, f.getSize = function() {
		this.size = i(this.element)
	}, f._getMeasurement = function(t, e) {
		var n, o = this.options[t];
		o ? ("string" == typeof o ? n = this.element.querySelector(o) : o instanceof HTMLElement && (n = o), this[t] = n ? i(n)[e] : o) : this[t] = 0
	}, f.layoutItems = function(t, e) {
		t = this._getItemsForLayout(t), this._layoutItems(t, e), this._postLayout()
	}, f._getItemsForLayout = function(t) {
		return t.filter(function(t) {
			return !t.isIgnored
		})
	}, f._layoutItems = function(t, e) {
		if (this._emitCompleteOnItems("layout", t), t && t.length) {
			var i = [];
			t.forEach(function(t) {
				var n = this._getItemLayoutPosition(t);
				n.item = t, n.isInstant = e || t.isLayoutInstant, i.push(n)
			}, this), this._processLayoutQueue(i)
		}
	}, f._getItemLayoutPosition = function() {
		return {
			x: 0,
			y: 0
		}
	}, f._processLayoutQueue = function(t) {
		this.updateStagger(), t.forEach(function(t, e) {
			this._positionItem(t.item, t.x, t.y, t.isInstant, e)
		}, this)
	}, f.updateStagger = function() {
		var t = this.options.stagger;
		return null === t || void 0 === t ? void(this.stagger = 0) : (this.stagger = a(t), this.stagger)
	}, f._positionItem = function(t, e, i, n, o) {
		n ? t.goTo(e, i) : (t.stagger(o * this.stagger), t.moveTo(e, i))
	}, f._postLayout = function() {
		this.resizeContainer()
	}, f.resizeContainer = function() {
		var t = this._getOption("resizeContainer");
		if (t) {
			var e = this._getContainerSize();
			e && (this._setContainerMeasure(e.width, !0), this._setContainerMeasure(e.height, !1))
		}
	}, f._getContainerSize = d, f._setContainerMeasure = function(t, e) {
		if (void 0 !== t) {
			var i = this.size;
			i.isBorderBox && (t += e ? i.paddingLeft + i.paddingRight + i.borderLeftWidth + i.borderRightWidth : i.paddingBottom + i.paddingTop + i.borderTopWidth + i.borderBottomWidth), t = Math.max(t, 0), this.element.style[e ? "width" : "height"] = t + "px"
		}
	}, f._emitCompleteOnItems = function(t, e) {
		function i() {
			o.dispatchEvent(t + "Complete", null, [e])
		}

		function n() {
			s++, s == r && i()
		}
		var o = this,
			r = e.length;
		if (!e || !r) return void i();
		var s = 0;
		e.forEach(function(e) {
			e.once(t, n)
		})
	}, f.dispatchEvent = function(t, e, i) {
		var n = e ? [e].concat(i) : i;
		if (this.emitEvent(t, n), u)
			if (this.$element = this.$element || u(this.element), e) {
				var o = u.Event(e);
				o.type = t, this.$element.trigger(o, i)
			} else this.$element.trigger(t, i)
	}, f.ignore = function(t) {
		var e = this.getItem(t);
		e && (e.isIgnored = !0)
	}, f.unignore = function(t) {
		var e = this.getItem(t);
		e && delete e.isIgnored
	}, f.stamp = function(t) {
		t = this._find(t), t && (this.stamps = this.stamps.concat(t), t.forEach(this.ignore, this))
	}, f.unstamp = function(t) {
		t = this._find(t), t && t.forEach(function(t) {
			n.removeFrom(this.stamps, t), this.unignore(t)
		}, this)
	}, f._find = function(t) {
		return t ? ("string" == typeof t && (t = this.element.querySelectorAll(t)), t = n.makeArray(t)) : void 0
	}, f._manageStamps = function() {
		this.stamps && this.stamps.length && (this._getBoundingRect(), this.stamps.forEach(this._manageStamp, this))
	}, f._getBoundingRect = function() {
		var t = this.element.getBoundingClientRect(),
			e = this.size;
		this._boundingRect = {
			left: t.left + e.paddingLeft + e.borderLeftWidth,
			top: t.top + e.paddingTop + e.borderTopWidth,
			right: t.right - (e.paddingRight + e.borderRightWidth),
			bottom: t.bottom - (e.paddingBottom + e.borderBottomWidth)
		}
	}, f._manageStamp = d, f._getElementOffset = function(t) {
		var e = t.getBoundingClientRect(),
			n = this._boundingRect,
			o = i(t),
			r = {
				left: e.left - n.left - o.marginLeft,
				top: e.top - n.top - o.marginTop,
				right: n.right - e.right - o.marginRight,
				bottom: n.bottom - e.bottom - o.marginBottom
			};
		return r
	}, f.handleEvent = n.handleEvent, f.bindResize = function() {
		t.addEventListener("resize", this), this.isResizeBound = !0
	}, f.unbindResize = function() {
		t.removeEventListener("resize", this), this.isResizeBound = !1
	}, f.onresize = function() {
		this.resize()
	}, n.debounceMethod(r, "onresize", 100), f.resize = function() {
		this.isResizeBound && this.needsResizeLayout() && this.layout()
	}, f.needsResizeLayout = function() {
		var t = i(this.element),
			e = this.size && t;
		return e && t.innerWidth !== this.size.innerWidth
	}, f.addItems = function(t) {
		var e = this._itemize(t);
		return e.length && (this.items = this.items.concat(e)), e
	}, f.appended = function(t) {
		var e = this.addItems(t);
		e.length && (this.layoutItems(e, !0), this.reveal(e))
	}, f.prepended = function(t) {
		var e = this._itemize(t);
		if (e.length) {
			var i = this.items.slice(0);
			this.items = e.concat(i), this._resetLayout(), this._manageStamps(), this.layoutItems(e, !0), this.reveal(e), this.layoutItems(i)
		}
	}, f.reveal = function(t) {
		if (this._emitCompleteOnItems("reveal", t), t && t.length) {
			var e = this.updateStagger();
			t.forEach(function(t, i) {
				t.stagger(i * e), t.reveal()
			})
		}
	}, f.hide = function(t) {
		if (this._emitCompleteOnItems("hide", t), t && t.length) {
			var e = this.updateStagger();
			t.forEach(function(t, i) {
				t.stagger(i * e), t.hide()
			})
		}
	}, f.revealItemElements = function(t) {
		var e = this.getItems(t);
		this.reveal(e)
	}, f.hideItemElements = function(t) {
		var e = this.getItems(t);
		this.hide(e)
	}, f.getItem = function(t) {
		for (var e = 0; e < this.items.length; e++) {
			var i = this.items[e];
			if (i.element == t) return i
		}
	}, f.getItems = function(t) {
		t = n.makeArray(t);
		var e = [];
		return t.forEach(function(t) {
			var i = this.getItem(t);
			i && e.push(i)
		}, this), e
	}, f.remove = function(t) {
		var e = this.getItems(t);
		this._emitCompleteOnItems("remove", e), e && e.length && e.forEach(function(t) {
			t.remove(), n.removeFrom(this.items, t)
		}, this)
	}, f.destroy = function() {
		var t = this.element.style;
		t.height = "", t.position = "", t.width = "", this.items.forEach(function(t) {
			t.destroy()
		}), this.unbindResize();
		var e = this.element.outlayerGUID;
		delete c[e], delete this.element.outlayerGUID, u && u.removeData(this.element, this.constructor.namespace)
	}, r.data = function(t) {
		t = n.getQueryElement(t);
		var e = t && t.outlayerGUID;
		return e && c[e]
	}, r.create = function(t, e) {
		var i = s(r);
		return i.defaults = n.extend({}, r.defaults), n.extend(i.defaults, e), i.compatOptions = n.extend({}, r.compatOptions), i.namespace = t, i.data = r.data, i.Item = s(o), n.htmlInit(i, t), u && u.bridget && u.bridget(t, i), i
	};
	var m = {
		ms: 1,
		s: 1e3
	};
	return r.Item = o, r
}),
function(t, e) {
	"function" == typeof define && define.amd ? define(["outlayer/outlayer", "get-size/get-size"], e) : "object" == typeof module && module.exports ? module.exports = e(require("outlayer"), require("get-size")) : t.Masonry = e(t.Outlayer, t.getSize)
}(window, function(t, e) {
	var i = t.create("masonry");
	i.compatOptions.fitWidth = "isFitWidth";
	var n = i.prototype;
	return n._resetLayout = function() {
		this.getSize(), this._getMeasurement("columnWidth", "outerWidth"), this._getMeasurement("gutter", "outerWidth"), this.measureColumns(), this.colYs = [];
		for (var t = 0; t < this.cols; t++) this.colYs.push(0);
		this.maxY = 0, this.horizontalColIndex = 0
	}, n.measureColumns = function() {
		if (this.getContainerWidth(), !this.columnWidth) {
			var t = this.items[0],
				i = t && t.element;
			this.columnWidth = i && e(i).outerWidth || this.containerWidth
		}
		var n = this.columnWidth += this.gutter,
			o = this.containerWidth + this.gutter,
			r = o / n,
			s = n - o % n,
			a = s && 1 > s ? "round" : "floor";
		r = Math[a](r), this.cols = Math.max(r, 1)
	}, n.getContainerWidth = function() {
		var t = this._getOption("fitWidth"),
			i = t ? this.element.parentNode : this.element,
			n = e(i);
		this.containerWidth = n && n.innerWidth
	}, n._getItemLayoutPosition = function(t) {
		t.getSize();
		var e = t.size.outerWidth % this.columnWidth,
			i = e && 1 > e ? "round" : "ceil",
			n = Math[i](t.size.outerWidth / this.columnWidth);
		n = Math.min(n, this.cols);
		for (var o = this.options.horizontalOrder ? "_getHorizontalColPosition" : "_getTopColPosition", r = this[o](n, t), s = {
				x: this.columnWidth * r.col,
				y: r.y
			}, a = r.y + t.size.outerHeight, h = n + r.col, u = r.col; h > u; u++) this.colYs[u] = a;
		return s
	}, n._getTopColPosition = function(t) {
		var e = this._getTopColGroup(t),
			i = Math.min.apply(Math, e);
		return {
			col: e.indexOf(i),
			y: i
		}
	}, n._getTopColGroup = function(t) {
		if (2 > t) return this.colYs;
		for (var e = [], i = this.cols + 1 - t, n = 0; i > n; n++) e[n] = this._getColGroupY(n, t);
		return e
	}, n._getColGroupY = function(t, e) {
		if (2 > e) return this.colYs[t];
		var i = this.colYs.slice(t, t + e);
		return Math.max.apply(Math, i)
	}, n._getHorizontalColPosition = function(t, e) {
		var i = this.horizontalColIndex % this.cols,
			n = t > 1 && i + t > this.cols;
		i = n ? 0 : i;
		var o = e.size.outerWidth && e.size.outerHeight;
		return this.horizontalColIndex = o ? i + t : this.horizontalColIndex, {
			col: i,
			y: this._getColGroupY(i, t)
		}
	}, n._manageStamp = function(t) {
		var i = e(t),
			n = this._getElementOffset(t),
			o = this._getOption("originLeft"),
			r = o ? n.left : n.right,
			s = r + i.outerWidth,
			a = Math.floor(r / this.columnWidth);
		a = Math.max(0, a);
		var h = Math.floor(s / this.columnWidth);
		h -= s % this.columnWidth ? 0 : 1, h = Math.min(this.cols - 1, h);
		for (var u = this._getOption("originTop"), d = (u ? n.top : n.bottom) + i.outerHeight, l = a; h >= l; l++) this.colYs[l] = Math.max(d, this.colYs[l])
	}, n._getContainerSize = function() {
		this.maxY = Math.max.apply(Math, this.colYs);
		var t = {
			height: this.maxY
		};
		return this._getOption("fitWidth") && (t.width = this._getContainerFitWidth()), t
	}, n._getContainerFitWidth = function() {
		for (var t = 0, e = this.cols; --e && 0 === this.colYs[e];) t++;
		return (this.cols - t) * this.columnWidth - this.gutter
	}, n.needsResizeLayout = function() {
		var t = this.containerWidth;
		return this.getContainerWidth(), t != this.containerWidth
	}, i
});

/* Minit: /wp-includes/js/jquery/jquery.masonry.min.js */
/*!
 * Masonry v2 shim
 * to maintain backwards compatibility
 * as of Masonry v3.1.2
 *
 * Cascading grid layout library
 * http://masonry.desandro.com
 * MIT License
 * by David DeSandro
 */
! function(a) {
	"use strict";
	var b = a.Masonry;
	b.prototype._remapV2Options = function() {
		this._remapOption("gutterWidth", "gutter"), this._remapOption("isResizable", "isResizeBound"), this._remapOption("isRTL", "isOriginLeft", function(a) {
			return !a
		});
		var a = this.options.isAnimated;
		if (void 0 !== a && (this.options.transitionDuration = a ? this.options.transitionDuration : 0), void 0 === a || a) {
			var b = this.options.animationOptions,
				c = b && b.duration;
			c && (this.options.transitionDuration = "string" == typeof c ? c : c + "ms")
		}
	}, b.prototype._remapOption = function(a, b, c) {
		var d = this.options[a];
		void 0 !== d && (this.options[b] = c ? c(d) : d)
	};
	var c = b.prototype._create;
	b.prototype._create = function() {
		var a = this;
		this._remapV2Options(), c.apply(this, arguments), setTimeout(function() {
			jQuery(a.element).addClass("masonry")
		}, 0)
	};
	var d = b.prototype.layout;
	b.prototype.layout = function() {
		this._remapV2Options(), d.apply(this, arguments)
	};
	var e = b.prototype.option;
	b.prototype.option = function() {
		e.apply(this, arguments), this._remapV2Options()
	};
	var f = b.prototype._itemize;
	b.prototype._itemize = function(a) {
		var b = f.apply(this, arguments);
		return jQuery(a).addClass("masonry-brick"), b
	};
	var g = b.prototype.measureColumns;
	b.prototype.measureColumns = function() {
		var a = this.options.columnWidth;
		a && "function" == typeof a && (this.getContainerWidth(), this.columnWidth = a(this.containerWidth)), g.apply(this, arguments)
	}, b.prototype.reload = function() {
		this.reloadItems.apply(this, arguments), this.layout.apply(this)
	};
	var h = b.prototype.destroy;
	b.prototype.destroy = function() {
		var a = this.getItemElements();
		jQuery(this.element).removeClass("masonry"), jQuery(a).removeClass("masonry-brick"), h.apply(this, arguments)
	}
}(window);

! function(s) {
	"use strict";
	s.fn.fitVids = function(t) {
		var i = {
			customSelector: null,
			ignore: null
		};
		if (!document.getElementById("fit-vids-style")) {
			var e = document.head || document.getElementsByTagName("head")[0],
				n = document.createElement("div");
			n.innerHTML = '<p>x</p><style id="fit-vids-style">.fluid-width-video-wrapper{width:100%;position:relative;padding:0;}.fluid-width-video-wrapper iframe,.fluid-width-video-wrapper object,.fluid-width-video-wrapper embed {position:absolute;top:0;left:0;width:100%;height:100%;}</style>', e.appendChild(n.childNodes[1])
		}
		return t && s.extend(i, t), this.each(function() {
			var t = ['iframe[src*="player.vimeo.com"]', 'iframe[src*="youtube.com"]', 'iframe[src*="youtube-nocookie.com"]', 'iframe[src*="kickstarter.com"][src*="video.html"]', "object", "embed"];
			i.customSelector && t.push(i.customSelector);
			var n = ".fitvidsignore";
			i.ignore && (n = n + ", " + i.ignore);
			var e = s(this).find(t.join(","));
			(e = (e = e.not("object object")).not(n)).each(function() {
				var t = s(this);
				if (!(0 < t.parents(n).length || "embed" === this.tagName.toLowerCase() && t.parent("object").length || t.parent(".fluid-width-video-wrapper").length)) {
					t.css("height") || t.css("width") || !isNaN(t.attr("height")) && !isNaN(t.attr("width")) || (t.attr("height", 9), t.attr("width", 16));
					var e = ("object" === this.tagName.toLowerCase() || t.attr("height") && !isNaN(parseInt(t.attr("height"), 10)) ? parseInt(t.attr("height"), 10) : t.height()) / (isNaN(parseInt(t.attr("width"), 10)) ? t.width() : parseInt(t.attr("width"), 10));
					if (!t.attr("name")) {
						var i = "fitvid" + s.fn.fitVids._count;
						t.attr("name", i), s.fn.fitVids._count++
					}
					t.wrap('<div class="fluid-width-video-wrapper"></div>').parent(".fluid-width-video-wrapper").css("padding-top", 100 * e + "%"), t.removeAttr("height").removeAttr("width")
				}
			})
		})
	}, s.fn.fitVids._count = 0
}(window.jQuery || window.Zepto),
function(c) {
	function e() {
		return c("body").height() > c(window).height()
	}
	var o = function(t, e) {
		this.settings = e, this.checkSettings(), this.imgAnalyzerTimeout = null, this.entries = null, this.buildingRow = {
			entriesBuff: [],
			width: 0,
			height: 0,
			aspectRatio: 0
		}, this.lastFetchedEntry = null, this.lastAnalyzedIndex = -1, this.yield = {
			every: 2,
			flushed: 0
		}, this.border = 0 <= e.border ? e.border : e.margins, this.maxRowHeight = this.retrieveMaxRowHeight(), this.suffixRanges = this.retrieveSuffixRanges(), this.offY = this.border, this.rows = 0, this.spinner = {
			phase: 0,
			timeSlot: 150,
			$el: c('<div class="spinner"><span></span><span></span><span></span></div>'),
			intervalId: null
		}, this.checkWidthIntervalId = null, this.galleryWidth = t.width(), this.$gallery = t
	};
	o.prototype.getSuffix = function(t, e) {
		var i, n;
		for (i = e < t ? t : e, n = 0; n < this.suffixRanges.length; n++)
			if (i <= this.suffixRanges[n]) return this.settings.sizeRangeSuffixes[this.suffixRanges[n]];
		return this.settings.sizeRangeSuffixes[this.suffixRanges[n - 1]]
	}, o.prototype.removeSuffix = function(t, e) {
		return t.substring(0, t.length - e.length)
	}, o.prototype.endsWith = function(t, e) {
		return -1 !== t.indexOf(e, t.length - e.length)
	}, o.prototype.getUsedSuffix = function(t) {
		for (var e in this.settings.sizeRangeSuffixes)
			if (this.settings.sizeRangeSuffixes.hasOwnProperty(e)) {
				if (0 === this.settings.sizeRangeSuffixes[e].length) continue;
				if (this.endsWith(t, this.settings.sizeRangeSuffixes[e])) return this.settings.sizeRangeSuffixes[e]
			} return ""
	}, o.prototype.newSrc = function(t, e, i, n) {
		var s;
		if (this.settings.thumbnailPath) s = this.settings.thumbnailPath(t, e, i, n);
		else {
			var o = t.match(this.settings.extension),
				r = null !== o ? o[0] : "";
			s = t.replace(this.settings.extension, ""), s = this.removeSuffix(s, this.getUsedSuffix(s)), s += this.getSuffix(e, i) + r
		}
		return s
	}, o.prototype.showImg = function(t, e) {
		this.settings.cssAnimation ? (t.addClass("entry-visible"), e && e()) : (t.stop().fadeTo(this.settings.imagesAnimationDuration, 1, e), t.find("> img, > a > img").stop().fadeTo(this.settings.imagesAnimationDuration, 1, e))
	}, o.prototype.extractImgSrcFromImage = function(t) {
		var e = void 0 !== t.data("safe-src") ? t.data("safe-src") : t.attr("src");
		return t.data("jg.originalSrc", e), e
	}, o.prototype.imgFromEntry = function(t) {
		var e = t.find("> img");
		return 0 === e.length && (e = t.find("> a > img")), 0 === e.length ? null : e
	}, o.prototype.captionFromEntry = function(t) {
		var e = t.find("> .caption");
		return 0 === e.length ? null : e
	}, o.prototype.displayEntry = function(t, e, i, n, s, o) {
		t.width(n), t.height(o), t.css("top", i), t.css("left", e);
		var r = this.imgFromEntry(t);
		if (null !== r) {
			var a = r.attr("src"),
				l = this.newSrc(a, n, s, r[0]);
			r.one("error", function() {
				r.attr("src", r.data("jg.originalSrc"))
			});
			var h = function() {
				a !== l && r.attr("src", l)
			};
			"skipped" === t.data("jg.loaded") ? this.onImageEvent(a, c.proxy(function() {
				this.showImg(t, h), t.data("jg.loaded", !0)
			}, this)) : this.showImg(t, h)
		} else this.showImg(t);
		this.displayEntryCaption(t)
	}, o.prototype.displayEntryCaption = function(t) {
		var e = this.imgFromEntry(t);
		if (null !== e && this.settings.captions) {
			var i = this.captionFromEntry(t);
			if (null === i) {
				var n = e.attr("alt");
				this.isValidCaption(n) || (n = t.attr("title")), this.isValidCaption(n) && (i = c('<div class="caption">' + n + "</div>"), t.append(i), t.data("jg.createdCaption", !0))
			}
			null !== i && (this.settings.cssAnimation || i.stop().fadeTo(0, this.settings.captionSettings.nonVisibleOpacity), this.addCaptionEventsHandlers(t))
		} else this.removeCaptionEventsHandlers(t)
	}, o.prototype.isValidCaption = function(t) {
		return void 0 !== t && 0 < t.length
	}, o.prototype.onEntryMouseEnterForCaption = function(t) {
		var e = this.captionFromEntry(c(t.currentTarget));
		this.settings.cssAnimation ? e.addClass("caption-visible").removeClass("caption-hidden") : e.stop().fadeTo(this.settings.captionSettings.animationDuration, this.settings.captionSettings.visibleOpacity)
	}, o.prototype.onEntryMouseLeaveForCaption = function(t) {
		var e = this.captionFromEntry(c(t.currentTarget));
		this.settings.cssAnimation ? e.removeClass("caption-visible").removeClass("caption-hidden") : e.stop().fadeTo(this.settings.captionSettings.animationDuration, this.settings.captionSettings.nonVisibleOpacity)
	}, o.prototype.addCaptionEventsHandlers = function(t) {
		var e = t.data("jg.captionMouseEvents");
		void 0 === e && (e = {
			mouseenter: c.proxy(this.onEntryMouseEnterForCaption, this),
			mouseleave: c.proxy(this.onEntryMouseLeaveForCaption, this)
		}, t.on("mouseenter", void 0, void 0, e.mouseenter), t.on("mouseleave", void 0, void 0, e.mouseleave), t.data("jg.captionMouseEvents", e))
	}, o.prototype.removeCaptionEventsHandlers = function(t) {
		var e = t.data("jg.captionMouseEvents");
		void 0 !== e && (t.off("mouseenter", void 0, e.mouseenter), t.off("mouseleave", void 0, e.mouseleave), t.removeData("jg.captionMouseEvents"))
	}, o.prototype.prepareBuildingRow = function(t) {
		var e, i, n, s, o, r = !0,
			a = 0,
			l = this.galleryWidth - 2 * this.border - (this.buildingRow.entriesBuff.length - 1) * this.settings.margins,
			h = l / this.buildingRow.aspectRatio,
			c = this.settings.rowHeight,
			u = this.buildingRow.width / l > this.settings.justifyThreshold;
		if (t && "hide" === this.settings.lastRow && !u) {
			for (e = 0; e < this.buildingRow.entriesBuff.length; e++) i = this.buildingRow.entriesBuff[e], this.settings.cssAnimation ? i.removeClass("entry-visible") : (i.stop().fadeTo(0, .1), i.find("> img, > a > img").fadeTo(0, 0));
			return -1
		}
		for (t && !u && "justify" !== this.settings.lastRow && "hide" !== this.settings.lastRow && (r = !1, 0 < this.rows && (r = (c = (this.offY - this.border - this.settings.margins * this.rows) / this.rows) * this.buildingRow.aspectRatio / l > this.settings.justifyThreshold)), e = 0; e < this.buildingRow.entriesBuff.length; e++) n = (i = this.buildingRow.entriesBuff[e]).data("jg.width") / i.data("jg.height"), o = r ? (e === this.buildingRow.entriesBuff.length - 1 ? s = l : (s = h * n) < this.settings.minWidth && (s = this.settings.minWidth), h) : (s = c * n, c), l -= Math.round(s), i.data("jg.jwidth", Math.round(s)), i.data("jg.jheight", Math.ceil(o)), (0 === e || o < a) && (a = o);
		return this.buildingRow.height = a, r
	}, o.prototype.clearBuildingRow = function() {
		this.buildingRow.entriesBuff = [], this.buildingRow.aspectRatio = 0, this.buildingRow.width = 0
	};
	var i = !(o.prototype.flushRow = function(t) {
		var e, i, n, s = this.settings,
			o = this.border;
		if (i = this.prepareBuildingRow(t), t && "hide" === s.lastRow && -1 === i) this.clearBuildingRow();
		else {
			if (this.maxRowHeight && (this.maxRowHeight.isPercentage && this.maxRowHeight.value * s.rowHeight < this.buildingRow.height ? this.buildingRow.height = this.maxRowHeight.value * s.rowHeight : this.maxRowHeight.value >= s.rowHeight && this.maxRowHeight.value < this.buildingRow.height && (this.buildingRow.height = this.maxRowHeight.value)), this.buildingRow.height = s.rowHeight, this.buildingRow.height += s.addHeight, "center" === s.lastRow || "right" === s.lastRow) {
				var r = this.galleryWidth - 2 * this.border - (this.buildingRow.entriesBuff.length - 1) * s.margins;
				for (n = 0; n < this.buildingRow.entriesBuff.length; n++) r -= (e = this.buildingRow.entriesBuff[n]).data("jg.jwidth");
				"center" === s.lastRow ? o += r / 2 : "right" === s.lastRow && (o += r)
			}
			for (n = 0; n < this.buildingRow.entriesBuff.length; n++) e = this.buildingRow.entriesBuff[n], this.displayEntry(e, o, this.offY, e.data("jg.jwidth"), e.data("jg.jheight"), this.buildingRow.height), o += e.data("jg.jwidth") + s.margins;
			this.galleryHeightToSet = this.offY + this.buildingRow.height + this.border, this.$gallery.height(this.galleryHeightToSet + this.getSpinnerHeight()), (!t || this.buildingRow.height <= s.rowHeight && i) && (this.offY += this.buildingRow.height + s.margins, this.rows += 1, this.clearBuildingRow(), this.$gallery.trigger("jg.rowflush"))
		}
	});
	o.prototype.checkWidth = function() {
		this.checkWidthIntervalId = setInterval(c.proxy(function() {
			var t = parseFloat(this.$gallery.width());
			e() === i ? Math.abs(t - this.galleryWidth) > this.settings.refreshSensitivity && (this.galleryWidth = t, this.rewind(), this.startImgAnalyzer(!0)) : (i = e(), this.galleryWidth = t)
		}, this), this.settings.refreshTime)
	}, o.prototype.isSpinnerActive = function() {
		return null !== this.spinner.intervalId
	}, o.prototype.getSpinnerHeight = function() {
		return this.spinner.$el.innerHeight()
	}, o.prototype.stopLoadingSpinnerAnimation = function() {
		clearInterval(this.spinner.intervalId), this.spinner.intervalId = null, this.$gallery.height(this.$gallery.height() - this.getSpinnerHeight()), this.spinner.$el.detach()
	}, o.prototype.startLoadingSpinnerAnimation = function() {
		var t = this.spinner,
			e = t.$el.find("span");
		clearInterval(t.intervalId), this.$gallery.append(t.$el), this.$gallery.height(this.offY + this.buildingRow.height + this.getSpinnerHeight()), t.intervalId = setInterval(function() {
			t.phase < e.length ? e.eq(t.phase).fadeTo(t.timeSlot, 1) : e.eq(t.phase - e.length).fadeTo(t.timeSlot, 0), t.phase = (t.phase + 1) % (2 * e.length)
		}, t.timeSlot)
	}, o.prototype.rewind = function() {
		this.lastFetchedEntry = null, this.lastAnalyzedIndex = -1, this.offY = this.border, this.rows = 0, this.clearBuildingRow()
	}, o.prototype.updateEntries = function(t) {
		var e;
		return 0 < (e = t && null != this.lastFetchedEntry ? c(this.lastFetchedEntry).nextAll(this.settings.selector).toArray() : (this.entries = [], this.$gallery.children(this.settings.selector).toArray())).length && (c.isFunction(this.settings.sort) ? e = this.sortArray(e) : this.settings.randomize && (e = this.shuffleArray(e)), this.lastFetchedEntry = e[e.length - 1], this.settings.filter ? e = this.filterArray(e) : this.resetFilters(e)), this.entries = this.entries.concat(e), !0
	}, o.prototype.insertToGallery = function(t) {
		var e = this;
		c.each(t, function() {
			c(this).appendTo(e.$gallery)
		})
	}, o.prototype.shuffleArray = function(t) {
		var e, i, n;
		for (e = t.length - 1; 0 < e; e--) i = Math.floor(Math.random() * (e + 1)), n = t[e], t[e] = t[i], t[i] = n;
		return this.insertToGallery(t), t
	}, o.prototype.sortArray = function(t) {
		return t.sort(this.settings.sort), this.insertToGallery(t), t
	}, o.prototype.resetFilters = function(t) {
		for (var e = 0; e < t.length; e++) c(t[e]).removeClass("jg-filtered")
	}, o.prototype.filterArray = function(t) {
		var i = this.settings;
		if ("string" === c.type(i.filter)) return t.filter(function(t) {
			var e = c(t);
			return e.is(i.filter) ? (e.removeClass("jg-filtered"), !0) : (e.addClass("jg-filtered").removeClass("jg-visible"), !1)
		});
		if (c.isFunction(i.filter)) {
			for (var e = t.filter(i.filter), n = 0; n < t.length; n++) - 1 == e.indexOf(t[n]) ? c(t[n]).addClass("jg-filtered").removeClass("jg-visible") : c(t[n]).removeClass("jg-filtered");
			return e
		}
	}, o.prototype.destroy = function() {
		clearInterval(this.checkWidthIntervalId), c.each(this.entries, c.proxy(function(t, e) {
			var i = c(e);
			i.css("width", ""), i.css("height", ""), i.css("top", ""), i.css("left", ""), i.data("jg.loaded", void 0), i.removeClass("jg-entry");
			var n = this.imgFromEntry(i);
			n.css("width", ""), n.css("height", ""), n.css("margin-left", ""), n.css("margin-top", ""), n.attr("src", n.data("jg.originalSrc")), n.data("jg.originalSrc", void 0), this.removeCaptionEventsHandlers(i);
			var s = this.captionFromEntry(i);
			i.data("jg.createdCaption") ? (i.data("jg.createdCaption", void 0), null !== s && s.remove()) : null !== s && s.fadeTo(0, 1)
		}, this)), this.$gallery.css("height", ""), this.$gallery.removeClass("justified-gallery"), this.$gallery.data("jg.controller", void 0)
	}, o.prototype.analyzeImages = function(t) {
		for (var e = this.lastAnalyzedIndex + 1; e < this.entries.length; e++) {
			var i = c(this.entries[e]);
			if (!0 === i.data("jg.loaded") || "skipped" === i.data("jg.loaded")) {
				var n = this.galleryWidth - 2 * this.border - (this.buildingRow.entriesBuff.length - 1) * this.settings.margins,
					s = i.data("jg.width") / i.data("jg.height");
				n / (this.buildingRow.aspectRatio + s) < this.settings.rowHeight && this.flushRow(!1), this.buildingRow.entriesBuff.push(i), this.buildingRow.aspectRatio += s, this.buildingRow.width += s * this.settings.rowHeight, this.lastAnalyzedIndex = e
			} else if ("error" !== i.data("jg.loaded")) return
		}
		0 < this.buildingRow.entriesBuff.length && this.flushRow(!0), this.isSpinnerActive() && this.stopLoadingSpinnerAnimation(), this.stopImgAnalyzerStarter(), this.$gallery.trigger(t ? "jg.resize" : "jg.complete"), this.$gallery.height(this.galleryHeightToSet)
	}, o.prototype.stopImgAnalyzerStarter = function() {
		this.yield.flushed = 0, null !== this.imgAnalyzerTimeout && clearTimeout(this.imgAnalyzerTimeout)
	}, o.prototype.startImgAnalyzer = function(t) {
		var e = this;
		this.stopImgAnalyzerStarter(), this.imgAnalyzerTimeout = setTimeout(function() {
			e.analyzeImages(t)
		}, .001)
	}, o.prototype.onImageEvent = function(t, e, i) {
		if (e || i) {
			var n = new Image,
				s = c(n);
			e && s.one("load", function() {
				s.off("load error"), e(n)
			}), i && s.one("error", function() {
				s.off("load error"), i(n)
			}), n.src = t
		}
	}, o.prototype.init = function() {
		var a = !1,
			l = !1,
			h = this;
		c.each(this.entries, function(t, e) {
			var i = c(e),
				n = h.imgFromEntry(i);
			if (i.addClass("jg-entry"), !0 !== i.data("jg.loaded") && "skipped" !== i.data("jg.loaded"))
				if (null !== h.settings.rel && i.attr("rel", h.settings.rel), null !== h.settings.target && i.attr("target", h.settings.target), null !== n) {
					var s = h.extractImgSrcFromImage(n);
					if (n.attr("src", s), !1 === h.settings.waitThumbnailsLoad) {
						var o = parseFloat(n.attr("width")),
							r = parseFloat(n.attr("height"));
						if (!isNaN(o) && !isNaN(r)) return i.data("jg.width", o), i.data("jg.height", r), i.data("jg.loaded", "skipped"), l = !0, h.startImgAnalyzer(!1), !0
					}
					i.data("jg.loaded", !1), a = !0, h.isSpinnerActive() || h.startLoadingSpinnerAnimation(), h.onImageEvent(s, function(t) {
						i.data("jg.width", t.width), i.data("jg.height", t.height), i.data("jg.loaded", !0), h.startImgAnalyzer(!1)
					}, function() {
						i.data("jg.loaded", "error"), h.startImgAnalyzer(!1)
					})
				} else i.data("jg.loaded", !0), i.data("jg.width", i.width() | parseFloat(i.css("width")) | 1), i.data("jg.height", i.height() | parseFloat(i.css("height")) | 1)
		}), a || l || this.startImgAnalyzer(!1), this.checkWidth()
	}, o.prototype.checkOrConvertNumber = function(t, e) {
		if ("string" === c.type(t[e]) && (t[e] = parseFloat(t[e])), "number" !== c.type(t[e])) throw e + " must be a number";
		if (isNaN(t[e])) throw "invalid number for " + e
	}, o.prototype.checkSizeRangesSuffixes = function() {
		if ("object" !== c.type(this.settings.sizeRangeSuffixes)) throw "sizeRangeSuffixes must be defined and must be an object";
		var t = [];
		for (var e in this.settings.sizeRangeSuffixes) this.settings.sizeRangeSuffixes.hasOwnProperty(e) && t.push(e);
		for (var i = {
				0: ""
			}, n = 0; n < t.length; n++)
			if ("string" === c.type(t[n])) try {
				i[parseInt(t[n].replace(/^[a-z]+/, ""), 10)] = this.settings.sizeRangeSuffixes[t[n]]
			} catch (t) {
				throw "sizeRangeSuffixes keys must contains correct numbers (" + t + ")"
			} else i[t[n]] = this.settings.sizeRangeSuffixes[t[n]];
		this.settings.sizeRangeSuffixes = i
	}, o.prototype.retrieveMaxRowHeight = function() {
		var t = {};
		if ("string" === c.type(this.settings.maxRowHeight)) this.settings.maxRowHeight.match(/^[0-9]+%$/) ? (t.value = parseFloat(this.settings.maxRowHeight.match(/^([0-9]+)%$/)[1]) / 100, t.isPercentage = !1) : (t.value = parseFloat(this.settings.maxRowHeight), t.isPercentage = !0);
		else {
			if ("number" !== c.type(this.settings.maxRowHeight)) {
				if (!1 === this.settings.maxRowHeight || null === this.settings.maxRowHeight || void 0 === this.settings.maxRowHeight) return null;
				throw "maxRowHeight must be a number or a percentage"
			}
			t.value = this.settings.maxRowHeight, t.isPercentage = !1
		}
		if (isNaN(t.value)) throw "invalid number for maxRowHeight";
		return t.isPercentage && t.value < 100 && (t.value = 100), t
	}, o.prototype.checkSettings = function() {
		this.checkSizeRangesSuffixes(), this.checkOrConvertNumber(this.settings, "rowHeight"), this.checkOrConvertNumber(this.settings, "margins"), this.checkOrConvertNumber(this.settings, "border");
		var t = ["justify", "nojustify", "left", "center", "right", "hide"];
		if (-1 === t.indexOf(this.settings.lastRow)) throw "lastRow must be one of: " + t.join(", ");
		if (this.checkOrConvertNumber(this.settings, "justifyThreshold"), this.settings.justifyThreshold < 0 || 1 < this.settings.justifyThreshold) throw "justifyThreshold must be in the interval [0,1]";
		if ("boolean" !== c.type(this.settings.cssAnimation)) throw "cssAnimation must be a boolean";
		if ("boolean" !== c.type(this.settings.captions)) throw "captions must be a boolean";
		if (this.checkOrConvertNumber(this.settings.captionSettings, "animationDuration"), this.checkOrConvertNumber(this.settings.captionSettings, "visibleOpacity"), this.settings.captionSettings.visibleOpacity < 0 || 1 < this.settings.captionSettings.visibleOpacity) throw "captionSettings.visibleOpacity must be in the interval [0, 1]";
		if (this.checkOrConvertNumber(this.settings.captionSettings, "nonVisibleOpacity"), this.settings.captionSettings.nonVisibleOpacity < 0 || 1 < this.settings.captionSettings.nonVisibleOpacity) throw "captionSettings.nonVisibleOpacity must be in the interval [0, 1]";
		if (this.checkOrConvertNumber(this.settings, "imagesAnimationDuration"), this.checkOrConvertNumber(this.settings, "refreshTime"), this.checkOrConvertNumber(this.settings, "refreshSensitivity"), "boolean" !== c.type(this.settings.randomize)) throw "randomize must be a boolean";
		if ("string" !== c.type(this.settings.selector)) throw "selector must be a string";
		if (!1 !== this.settings.sort && !c.isFunction(this.settings.sort)) throw "sort must be false or a comparison function";
		if (!1 !== this.settings.filter && !c.isFunction(this.settings.filter) && "string" !== c.type(this.settings.filter)) throw "filter must be false, a string or a filter function"
	}, o.prototype.retrieveSuffixRanges = function() {
		var t = [];
		for (var e in this.settings.sizeRangeSuffixes) this.settings.sizeRangeSuffixes.hasOwnProperty(e) && t.push(parseInt(e, 10));
		return t.sort(function(t, e) {
			return e < t ? 1 : t < e ? -1 : 0
		}), t
	}, o.prototype.updateSettings = function(t) {
		this.settings = c.extend({}, this.settings, t), this.checkSettings(), this.border = 0 <= this.settings.border ? this.settings.border : this.settings.margins, this.maxRowHeight = this.retrieveMaxRowHeight(), this.suffixRanges = this.retrieveSuffixRanges()
	}, c.fn.justifiedGallery = function(s) {
		return this.each(function(t, e) {
			var i = c(e);
			i.addClass("justified-gallery");
			var n = i.data("jg.controller");
			if (void 0 === n) {
				if (null != s && "object" !== c.type(s)) {
					if ("destroy" === s) return;
					throw "The argument must be an object"
				}
				n = new o(i, c.extend({}, c.fn.justifiedGallery.defaults, s)), i.data("jg.controller", n)
			} else if ("norewind" === s);
			else {
				if ("destroy" === s) return void n.destroy();
				n.updateSettings(s), n.rewind()
			}
			n.updateEntries("norewind" === s) && n.init()
		})
	}, c.fn.justifiedGallery.defaults = {
		sizeRangeSuffixes: {},
		thumbnailPath: void 0,
		rowHeight: 120,
		addHeight: 0,
		minWidth: 0,
		maxRowHeight: !1,
		margins: 1,
		border: -1,
		lastRow: "nojustify",
		justifyThreshold: .9,
		waitThumbnailsLoad: !0,
		captions: !1,
		cssAnimation: !0,
		imagesAnimationDuration: 500,
		captionSettings: {
			animationDuration: 500,
			visibleOpacity: .7,
			nonVisibleOpacity: 0
		},
		rel: null,
		target: null,
		extension: /\.[^.\\/]+$/,
		refreshTime: 200,
		refreshSensitivity: 0,
		randomize: !1,
		sort: !1,
		filter: !1,
		selector: "a, div:not(.spinner)"
	}
}(jQuery);
var objectFitImages = function() {
	"use strict";
	var s = "bfred-it:object-fit-images",
		o = /(object-fit|object-position)\s*:\s*([-\w\s%]+)/g,
		t = new Image,
		n = "object-fit" in t.style,
		r = "object-position" in t.style,
		a = "background-size" in t.style,
		l = "string" == typeof t.currentSrc,
		h = t.getAttribute,
		c = t.setAttribute,
		u = !1;

	function d(t, e, i) {
		var n = function(t, e) {
			return "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='" + t + "' height='" + e + "'%3E%3C/svg%3E"
		}(e || 1, i || 0);
		h.call(t, "src") !== n && c.call(t, "src", n)
	}

	function p(t, e) {
		t.naturalWidth ? e(t) : setTimeout(p, 100, t, e)
	}

	function g(e) {
		var t = function(t) {
				for (var e, i = getComputedStyle(t).fontFamily, n = {}; null !== (e = o.exec(i));) n[e[1]] = e[2];
				return n
			}(e),
			i = e[s];
		if (t["object-fit"] = t["object-fit"] || "fill", !i.img) {
			if ("fill" === t["object-fit"]) return;
			if (!i.skipTest && n && !t["object-position"]) return
		}
		if (!i.img) {
			i.img = new Image(e.width, e.height), i.img.srcset = h.call(e, "data-ofi-srcset") || e.srcset, i.img.src = h.call(e, "data-ofi-src") || e.src, c.call(e, "data-ofi-src", e.src), e.srcset && c.call(e, "data-ofi-srcset", e.srcset), d(e, e.naturalWidth || e.width, e.naturalHeight || e.height), e.srcset && (e.srcset = "");
			try {
				! function(i) {
					var e = {
						get: function(t) {
							return i[s].img[t || "src"]
						},
						set: function(t, e) {
							return i[s].img[e || "src"] = t, c.call(i, "data-ofi-" + e, t), g(i), t
						}
					};
					Object.defineProperty(i, "src", e), Object.defineProperty(i, "currentSrc", {
						get: function() {
							return e.get("currentSrc")
						}
					}), Object.defineProperty(i, "srcset", {
						get: function() {
							return e.get("srcset")
						},
						set: function(t) {
							return e.set(t, "srcset")
						}
					})
				}(e)
			} catch (t) {
				window.console && console.log("http://bit.ly/ofi-old-browser")
			}
		}! function(t) {
			if (t.srcset && !l && window.picturefill) {
				var e = window.picturefill._;
				t[e.ns] && t[e.ns].evaled || e.fillImg(t, {
					reselect: !0
				}), t[e.ns].curSrc || (t[e.ns].supported = !1, e.fillImg(t, {
					reselect: !0
				})), t.currentSrc = t[e.ns].curSrc || t.src
			}
		}(i.img), e.style.backgroundImage = "url(" + (i.img.currentSrc || i.img.src).replace("(", "%28").replace(")", "%29") + ")", e.style.backgroundPosition = t["object-position"] || "center", e.style.backgroundRepeat = "no-repeat", /scale-down/.test(t["object-fit"]) ? p(i.img, function() {
			i.img.naturalWidth > e.width || i.img.naturalHeight > e.height ? e.style.backgroundSize = "contain" : e.style.backgroundSize = "auto"
		}) : e.style.backgroundSize = t["object-fit"].replace("none", "auto").replace("fill", "100% 100%"), p(i.img, function(t) {
			d(e, t.naturalWidth, t.naturalHeight)
		})
	}

	function m(t, e) {
		var i = !u && !t;
		if (e = e || {}, t = t || "img", r && !e.skipTest || !a) return !1;
		"string" == typeof t ? t = document.querySelectorAll(t) : "length" in t || (t = [t]);
		for (var n = 0; n < t.length; n++) t[n][s] = t[n][s] || {
			skipTest: e.skipTest
		}, g(t[n]);
		i && (document.body.addEventListener("load", function(t) {
			"IMG" === t.target.tagName && m(t.target, {
				skipTest: e.skipTest
			})
		}, !0), u = !0, t = "img"), e.watchMQ && window.addEventListener("resize", m.bind(null, t, {
			skipTest: e.skipTest
		}))
	}
	return m.supportsObjectFit = n, m.supportsObjectPosition = r,
		function() {
			function i(t, e) {
				return t[s] && t[s].img && ("src" === e || "srcset" === e) ? t[s].img : t
			}
			r || (HTMLImageElement.prototype.getAttribute = function(t) {
				return h.call(i(this, t), t)
			}, HTMLImageElement.prototype.setAttribute = function(t, e) {
				return c.call(i(this, t), t, String(e))
			})
		}(), m
}();
! function(l, i, s, o) {
	function h(t, e) {
		this.settings = null, this.options = l.extend({}, h.Defaults, e), this.$element = l(t), this._handlers = {}, this._plugins = {}, this._supress = {}, this._current = null, this._speed = null, this._coordinates = [], this._breakpoint = null, this._width = null, this._items = [], this._clones = [], this._mergers = [], this._widths = [], this._invalidated = {}, this._pipe = [], this._drag = {
			time: null,
			target: null,
			pointer: null,
			stage: {
				start: null,
				current: null
			},
			direction: null
		}, this._states = {
			current: {},
			tags: {
				initializing: ["busy"],
				animating: ["busy"],
				dragging: ["interacting"]
			}
		}, l.each(["onResize", "onThrottledResize"], l.proxy(function(t, e) {
			this._handlers[e] = l.proxy(this[e], this)
		}, this)), l.each(h.Plugins, l.proxy(function(t, e) {
			this._plugins[t.charAt(0).toLowerCase() + t.slice(1)] = new e(this)
		}, this)), l.each(h.Workers, l.proxy(function(t, e) {
			this._pipe.push({
				filter: e.filter,
				run: l.proxy(e.run, this)
			})
		}, this)), this.setup(), this.initialize()
	}
	h.Defaults = {
		items: 3,
		loop: !1,
		center: !1,
		rewind: !1,
		mouseDrag: !0,
		touchDrag: !0,
		pullDrag: !0,
		freeDrag: !1,
		margin: 0,
		stagePadding: 0,
		merge: !1,
		mergeFit: !0,
		autoWidth: !1,
		startPosition: 0,
		rtl: !1,
		smartSpeed: 250,
		fluidSpeed: !1,
		dragEndSpeed: !1,
		responsive: {},
		responsiveRefreshRate: 200,
		responsiveBaseElement: i,
		fallbackEasing: "swing",
		info: !1,
		nestedItemSelector: !1,
		itemElement: "div",
		stageElement: "div",
		refreshClass: "owl-refresh",
		loadedClass: "owl-loaded",
		loadingClass: "owl-loading",
		rtlClass: "owl-rtl",
		responsiveClass: "owl-responsive",
		dragClass: "owl-drag",
		itemClass: "owl-item",
		stageClass: "owl-stage",
		stageOuterClass: "owl-stage-outer",
		grabClass: "owl-grab"
	}, h.Width = {
		Default: "default",
		Inner: "inner",
		Outer: "outer"
	}, h.Type = {
		Event: "event",
		State: "state"
	}, h.Plugins = {}, h.Workers = [{
		filter: ["width", "settings"],
		run: function() {
			this._width = this.$element.width()
		}
	}, {
		filter: ["width", "items", "settings"],
		run: function(t) {
			t.current = this._items && this._items[this.relative(this._current)]
		}
	}, {
		filter: ["items", "settings"],
		run: function() {
			this.$stage.children(".cloned").remove()
		}
	}, {
		filter: ["width", "items", "settings"],
		run: function(t) {
			var e = this.settings.margin || "",
				i = !this.settings.autoWidth,
				n = this.settings.rtl,
				s = {
					width: "auto",
					"margin-left": n ? e : "",
					"margin-right": n ? "" : e
				};
			!i && this.$stage.children().css(s), t.css = s
		}
	}, {
		filter: ["width", "items", "settings"],
		run: function(t) {
			var e = (this.width() / this.settings.items).toFixed(3) - this.settings.margin,
				i = null,
				n = this._items.length,
				s = !this.settings.autoWidth,
				o = [];
			for (t.items = {
					merge: !1,
					width: e
				}; n--;) i = this._mergers[n], i = this.settings.mergeFit && Math.min(i, this.settings.items) || i, t.items.merge = 1 < i || t.items.merge, o[n] = s ? e * i : this._items[n].width();
			this._widths = o
		}
	}, {
		filter: ["items", "settings"],
		run: function() {
			var t = [],
				e = this._items,
				i = this.settings,
				n = Math.max(2 * i.items, 4),
				s = 2 * Math.ceil(e.length / 2),
				o = i.loop && e.length ? i.rewind ? n : Math.max(n, s) : 0,
				r = "",
				a = "";
			for (o /= 2; o--;) t.push(this.normalize(t.length / 2, !0)), r += e[t[t.length - 1]][0].outerHTML, t.push(this.normalize(e.length - 1 - (t.length - 1) / 2, !0)), a = e[t[t.length - 1]][0].outerHTML + a;
			this._clones = t, l(r).addClass("cloned").appendTo(this.$stage), l(a).addClass("cloned").prependTo(this.$stage)
		}
	}, {
		filter: ["width", "items", "settings"],
		run: function() {
			for (var t = this.settings.rtl ? 1 : -1, e = this._clones.length + this._items.length, i = -1, n = 0, s = 0, o = []; ++i < e;) n = o[i - 1] || 0, s = this._widths[this.relative(i)] + this.settings.margin, o.push(n + s * t);
			this._coordinates = o
		}
	}, {
		filter: ["width", "items", "settings"],
		run: function() {
			var t = this.settings.stagePadding,
				e = this._coordinates,
				i = {
					width: Math.ceil(Math.abs(e[e.length - 1])) + 2 * t,
					"padding-left": t || "",
					"padding-right": t || ""
				};
			this.$stage.css(i)
		}
	}, {
		filter: ["width", "items", "settings"],
		run: function(t) {
			var e = this._coordinates.length,
				i = !this.settings.autoWidth,
				n = this.$stage.children();
			if (i && t.items.merge)
				for (; e--;) t.css.width = this._widths[this.relative(e)], n.eq(e).css(t.css);
			else i && (t.css.width = t.items.width, n.css(t.css))
		}
	}, {
		filter: ["items"],
		run: function() {
			this._coordinates.length < 1 && this.$stage.removeAttr("style")
		}
	}, {
		filter: ["width", "items", "settings"],
		run: function(t) {
			t.current = t.current ? this.$stage.children().index(t.current) : 0, t.current = Math.max(this.minimum(), Math.min(this.maximum(), t.current)), this.reset(t.current)
		}
	}, {
		filter: ["position"],
		run: function() {
			this.animate(this.coordinates(this._current))
		}
	}, {
		filter: ["width", "position", "items", "settings"],
		run: function() {
			var t, e, i, n, s = this.settings.rtl ? 1 : -1,
				o = 2 * this.settings.stagePadding,
				r = this.coordinates(this.current()) + o,
				a = r + this.width() * s,
				l = [];
			for (i = 0, n = this._coordinates.length; i < n; i++) t = this._coordinates[i - 1] || 0, e = Math.abs(this._coordinates[i]) + o * s, (this.op(t, "<=", r) && this.op(t, ">", a) || this.op(e, "<", r) && this.op(e, ">", a)) && l.push(i);
			this.$stage.children(".active").removeClass("active"), this.$stage.children(":eq(" + l.join("), :eq(") + ")").addClass("active"), this.settings.center && (this.$stage.children(".center").removeClass("center"), this.$stage.children().eq(this.current()).addClass("center"))
		}
	}], h.prototype.initialize = function() {
		var t, e, i;
		(this.enter("initializing"), this.trigger("initialize"), this.$element.toggleClass(this.settings.rtlClass, this.settings.rtl), this.settings.autoWidth && !this.is("pre-loading")) && (t = this.$element.find("img"), e = this.settings.nestedItemSelector ? "." + this.settings.nestedItemSelector : o, i = this.$element.children(e).width(), t.length && i <= 0 && this.preloadAutoWidthImages(t));
		this.$element.addClass(this.options.loadingClass), this.$stage = l("<" + this.settings.stageElement + ' class="' + this.settings.stageClass + '"/>').wrap('<div class="' + this.settings.stageOuterClass + '"/>'), this.$element.append(this.$stage.parent()), this.replace(this.$element.children().not(this.$stage.parent())), this.$element.is(":visible") ? this.refresh() : this.invalidate("width"), this.$element.removeClass(this.options.loadingClass).addClass(this.options.loadedClass), this.registerEventHandlers(), this.leave("initializing"), this.trigger("initialized")
	}, h.prototype.setup = function() {
		var e = this.viewport(),
			t = this.options.responsive,
			i = -1,
			n = null;
		t ? (l.each(t, function(t) {
			t <= e && i < t && (i = Number(t))
		}), "function" == typeof(n = l.extend({}, this.options, t[i])).stagePadding && (n.stagePadding = n.stagePadding()), delete n.responsive, n.responsiveClass && this.$element.attr("class", this.$element.attr("class").replace(new RegExp("(" + this.options.responsiveClass + "-)\\S+\\s", "g"), "$1" + i))) : n = l.extend({}, this.options), this.trigger("change", {
			property: {
				name: "settings",
				value: n
			}
		}), this._breakpoint = i, this.settings = n, this.invalidate("settings"), this.trigger("changed", {
			property: {
				name: "settings",
				value: this.settings
			}
		})
	}, h.prototype.optionsLogic = function() {
		this.settings.autoWidth && (this.settings.stagePadding = !1, this.settings.merge = !1)
	}, h.prototype.prepare = function(t) {
		var e = this.trigger("prepare", {
			content: t
		});
		return e.data || (e.data = l("<" + this.settings.itemElement + "/>").addClass(this.options.itemClass).append(t)), this.trigger("prepared", {
			content: e.data
		}), e.data
	}, h.prototype.update = function() {
		for (var t = 0, e = this._pipe.length, i = l.proxy(function(t) {
				return this[t]
			}, this._invalidated), n = {}; t < e;)(this._invalidated.all || 0 < l.grep(this._pipe[t].filter, i).length) && this._pipe[t].run(n), t++;
		this._invalidated = {}, !this.is("valid") && this.enter("valid")
	}, h.prototype.width = function(t) {
		switch (t = t || h.Width.Default) {
			case h.Width.Inner:
			case h.Width.Outer:
				return this._width;
			default:
				return this._width - 2 * this.settings.stagePadding + this.settings.margin
		}
	}, h.prototype.refresh = function() {
		this.enter("refreshing"), this.trigger("refresh"), this.setup(), this.optionsLogic(), this.$element.addClass(this.options.refreshClass), this.update(), this.$element.removeClass(this.options.refreshClass), this.leave("refreshing"), this.trigger("refreshed")
	}, h.prototype.onThrottledResize = function() {
		i.clearTimeout(this.resizeTimer), this.resizeTimer = i.setTimeout(this._handlers.onResize, this.settings.responsiveRefreshRate)
	}, h.prototype.onResize = function() {
		return !!this._items.length && (this._width !== this.$element.width() && (!!this.$element.is(":visible") && (this.enter("resizing"), this.trigger("resize").isDefaultPrevented() ? (this.leave("resizing"), !1) : (this.invalidate("width"), this.refresh(), this.leave("resizing"), void this.trigger("resized")))))
	}, h.prototype.registerEventHandlers = function() {
		l.support.transition && this.$stage.on(l.support.transition.end + ".owl.core", l.proxy(this.onTransitionEnd, this)), !1 !== this.settings.responsive && this.on(i, "resize", this._handlers.onThrottledResize), this.settings.mouseDrag && (this.$element.addClass(this.options.dragClass), this.$stage.on("mousedown.owl.core", l.proxy(this.onDragStart, this)), this.$stage.on("dragstart.owl.core selectstart.owl.core", function() {
			return !1
		})), this.settings.touchDrag && (this.$stage.on("touchstart.owl.core", l.proxy(this.onDragStart, this)), this.$stage.on("touchcancel.owl.core", l.proxy(this.onDragEnd, this)))
	}, h.prototype.onDragStart = function(t) {
		var e = null;
		3 !== t.which && (e = l.support.transform ? {
			x: (e = this.$stage.css("transform").replace(/.*\(|\)| /g, "").split(","))[16 === e.length ? 12 : 4],
			y: e[16 === e.length ? 13 : 5]
		} : (e = this.$stage.position(), {
			x: this.settings.rtl ? e.left + this.$stage.width() - this.width() + this.settings.margin : e.left,
			y: e.top
		}), this.is("animating") && (l.support.transform ? this.animate(e.x) : this.$stage.stop(), this.invalidate("position")), this.$element.toggleClass(this.options.grabClass, "mousedown" === t.type), this.speed(0), this._drag.time = (new Date).getTime(), this._drag.target = l(t.target), this._drag.stage.start = e, this._drag.stage.current = e, this._drag.pointer = this.pointer(t), l(s).on("mouseup.owl.core touchend.owl.core", l.proxy(this.onDragEnd, this)), l(s).one("mousemove.owl.core touchmove.owl.core", l.proxy(function(t) {
			var e = this.difference(this._drag.pointer, this.pointer(t));
			l(s).on("mousemove.owl.core touchmove.owl.core", l.proxy(this.onDragMove, this)), Math.abs(e.x) < Math.abs(e.y) && this.is("valid") || (t.preventDefault(), this.enter("dragging"), this.trigger("drag"))
		}, this)))
	}, h.prototype.onDragMove = function(t) {
		var e = null,
			i = null,
			n = null,
			s = this.difference(this._drag.pointer, this.pointer(t)),
			o = this.difference(this._drag.stage.start, s);
		this.is("dragging") && (t.preventDefault(), this.settings.loop ? (e = this.coordinates(this.minimum()), i = this.coordinates(this.maximum() + 1) - e, o.x = ((o.x - e) % i + i) % i + e) : (e = this.settings.rtl ? this.coordinates(this.maximum()) : this.coordinates(this.minimum()), i = this.settings.rtl ? this.coordinates(this.minimum()) : this.coordinates(this.maximum()), n = this.settings.pullDrag ? -1 * s.x / 5 : 0, o.x = Math.max(Math.min(o.x, e + n), i + n)), this._drag.stage.current = o, this.animate(o.x))
	}, h.prototype.onDragEnd = function(t) {
		var e = this.difference(this._drag.pointer, this.pointer(t)),
			i = this._drag.stage.current,
			n = 0 < e.x ^ this.settings.rtl ? "left" : "right";
		l(s).off(".owl.core"), this.$element.removeClass(this.options.grabClass), (0 !== e.x && this.is("dragging") || !this.is("valid")) && (this.speed(this.settings.dragEndSpeed || this.settings.smartSpeed), this.current(this.closest(i.x, 0 !== e.x ? n : this._drag.direction)), this.invalidate("position"), this.update(), this._drag.direction = n, (3 < Math.abs(e.x) || 300 < (new Date).getTime() - this._drag.time) && this._drag.target.one("click.owl.core", function() {
			return !1
		})), this.is("dragging") && (this.leave("dragging"), this.trigger("dragged"))
	}, h.prototype.closest = function(i, n) {
		var s = -1,
			o = this.width(),
			r = this.coordinates();
		return this.settings.freeDrag || l.each(r, l.proxy(function(t, e) {
			return "left" === n && e - 30 < i && i < e + 30 ? s = t : "right" === n && e - o - 30 < i && i < e - o + 30 ? s = t + 1 : this.op(i, "<", e) && this.op(i, ">", r[t + 1] || e - o) && (s = "left" === n ? t + 1 : t), -1 === s
		}, this)), this.settings.loop || (this.op(i, ">", r[this.minimum()]) ? s = i = this.minimum() : this.op(i, "<", r[this.maximum()]) && (s = i = this.maximum())), s
	}, h.prototype.animate = function(t) {
		var e = 0 < this.speed();
		this.is("animating") && this.onTransitionEnd(), e && (this.enter("animating"), this.trigger("translate")), l.support.transform3d && l.support.transition ? this.$stage.css({
			transform: "translate3d(" + t + "px,0px,0px)",
			transition: this.speed() / 1e3 + "s"
		}) : e ? this.$stage.animate({
			left: t + "px"
		}, this.speed(), this.settings.fallbackEasing, l.proxy(this.onTransitionEnd, this)) : this.$stage.css({
			left: t + "px"
		})
	}, h.prototype.is = function(t) {
		return this._states.current[t] && 0 < this._states.current[t]
	}, h.prototype.current = function(t) {
		if (t === o) return this._current;
		if (0 === this._items.length) return o;
		if (t = this.normalize(t), this._current !== t) {
			var e = this.trigger("change", {
				property: {
					name: "position",
					value: t
				}
			});
			e.data !== o && (t = this.normalize(e.data)), this._current = t, this.invalidate("position"), this.trigger("changed", {
				property: {
					name: "position",
					value: this._current
				}
			})
		}
		return this._current
	}, h.prototype.invalidate = function(t) {
		return "string" === l.type(t) && (this._invalidated[t] = !0, this.is("valid") && this.leave("valid")), l.map(this._invalidated, function(t, e) {
			return e
		})
	}, h.prototype.reset = function(t) {
		(t = this.normalize(t)) !== o && (this._speed = 0, this._current = t, this.suppress(["translate", "translated"]), this.animate(this.coordinates(t)), this.release(["translate", "translated"]))
	}, h.prototype.normalize = function(t, e) {
		var i = this._items.length,
			n = e ? 0 : this._clones.length;
		return !this.isNumeric(t) || i < 1 ? t = o : (t < 0 || i + n <= t) && (t = ((t - n / 2) % i + i) % i + n / 2), t
	}, h.prototype.relative = function(t) {
		return t -= this._clones.length / 2, this.normalize(t, !0)
	}, h.prototype.maximum = function(t) {
		var e, i, n, s = this.settings,
			o = this._coordinates.length;
		if (s.loop) o = this._clones.length / 2 + this._items.length - 1;
		else if (s.autoWidth || s.merge) {
			for (e = this._items.length, i = this._items[--e].width(), n = this.$element.width(); e-- && !(n < (i += this._items[e].width() + this.settings.margin)););
			o = e + 1
		} else o = s.center ? this._items.length - 1 : this._items.length - s.items;
		return t && (o -= this._clones.length / 2), Math.max(o, 0)
	}, h.prototype.minimum = function(t) {
		return t ? 0 : this._clones.length / 2
	}, h.prototype.items = function(t) {
		return t === o ? this._items.slice() : (t = this.normalize(t, !0), this._items[t])
	}, h.prototype.mergers = function(t) {
		return t === o ? this._mergers.slice() : (t = this.normalize(t, !0), this._mergers[t])
	}, h.prototype.clones = function(i) {
		var e = this._clones.length / 2,
			n = e + this._items.length,
			s = function(t) {
				return t % 2 == 0 ? n + t / 2 : e - (t + 1) / 2
			};
		return i === o ? l.map(this._clones, function(t, e) {
			return s(e)
		}) : l.map(this._clones, function(t, e) {
			return t === i ? s(e) : null
		})
	}, h.prototype.speed = function(t) {
		return t !== o && (this._speed = t), this._speed
	}, h.prototype.coordinates = function(t) {
		var e, i = 1,
			n = t - 1;
		return t === o ? l.map(this._coordinates, l.proxy(function(t, e) {
			return this.coordinates(e)
		}, this)) : (this.settings.center ? (this.settings.rtl && (i = -1, n = t + 1), e = this._coordinates[t], e += (this.width() - e + (this._coordinates[n] || 0)) / 2 * i) : e = this._coordinates[n] || 0, e = Math.ceil(e))
	}, h.prototype.duration = function(t, e, i) {
		return 0 === i ? 0 : Math.min(Math.max(Math.abs(e - t), 1), 6) * Math.abs(i || this.settings.smartSpeed)
	}, h.prototype.to = function(t, e) {
		var i = this.current(),
			n = null,
			s = t - this.relative(i),
			o = (0 < s) - (s < 0),
			r = this._items.length,
			a = this.minimum(),
			l = this.maximum();
		this.settings.loop ? (!this.settings.rewind && Math.abs(s) > r / 2 && (s += -1 * o * r), (n = (((t = i + s) - a) % r + r) % r + a) !== t && n - s <= l && 0 < n - s && (i = n - s, t = n, this.reset(i))) : t = this.settings.rewind ? (t % (l += 1) + l) % l : Math.max(a, Math.min(l, t)), this.speed(this.duration(i, t, e)), this.current(t), this.$element.is(":visible") && this.update()
	}, h.prototype.next = function(t) {
		t = t || !1, this.to(this.relative(this.current()) + 1, t)
	}, h.prototype.prev = function(t) {
		t = t || !1, this.to(this.relative(this.current()) - 1, t)
	}, h.prototype.onTransitionEnd = function(t) {
		if (t !== o && (t.stopPropagation(), (t.target || t.srcElement || t.originalTarget) !== this.$stage.get(0))) return !1;
		this.leave("animating"), this.trigger("translated")
	}, h.prototype.viewport = function() {
		var t;
		return this.options.responsiveBaseElement !== i ? t = l(this.options.responsiveBaseElement).width() : i.innerWidth ? t = i.innerWidth : s.documentElement && s.documentElement.clientWidth ? t = s.documentElement.clientWidth : console.warn("Can not detect viewport width."), t
	}, h.prototype.replace = function(t) {
		this.$stage.empty(), this._items = [], t && (t = t instanceof jQuery ? t : l(t)), this.settings.nestedItemSelector && (t = t.find("." + this.settings.nestedItemSelector)), t.filter(function() {
			return 1 === this.nodeType
		}).each(l.proxy(function(t, e) {
			e = this.prepare(e), this.$stage.append(e), this._items.push(e), this._mergers.push(1 * e.find("[data-merge]").addBack("[data-merge]").attr("data-merge") || 1)
		}, this)), this.reset(this.isNumeric(this.settings.startPosition) ? this.settings.startPosition : 0), this.invalidate("items")
	}, h.prototype.add = function(t, e) {
		var i = this.relative(this._current);
		e = e === o ? this._items.length : this.normalize(e, !0), t = t instanceof jQuery ? t : l(t), this.trigger("add", {
			content: t,
			position: e
		}), t = this.prepare(t), 0 === this._items.length || e === this._items.length ? (0 === this._items.length && this.$stage.append(t), 0 !== this._items.length && this._items[e - 1].after(t), this._items.push(t), this._mergers.push(1 * t.find("[data-merge]").addBack("[data-merge]").attr("data-merge") || 1)) : (this._items[e].before(t), this._items.splice(e, 0, t), this._mergers.splice(e, 0, 1 * t.find("[data-merge]").addBack("[data-merge]").attr("data-merge") || 1)), this._items[i] && this.reset(this._items[i].index()), this.invalidate("items"), this.trigger("added", {
			content: t,
			position: e
		})
	}, h.prototype.remove = function(t) {
		(t = this.normalize(t, !0)) !== o && (this.trigger("remove", {
			content: this._items[t],
			position: t
		}), this._items[t].remove(), this._items.splice(t, 1), this._mergers.splice(t, 1), this.invalidate("items"), this.trigger("removed", {
			content: null,
			position: t
		}))
	}, h.prototype.preloadAutoWidthImages = function(t) {
		t.each(l.proxy(function(t, e) {
			this.enter("pre-loading"), e = l(e), l(new Image).one("load", l.proxy(function(t) {
				e.attr("src", t.target.src), e.css("opacity", 1), this.leave("pre-loading"), !this.is("pre-loading") && !this.is("initializing") && this.refresh()
			}, this)).attr("src", e.attr("src") || e.attr("data-src") || e.attr("data-src-retina"))
		}, this))
	}, h.prototype.destroy = function() {
		for (var t in this.$element.off(".owl.core"), this.$stage.off(".owl.core"), l(s).off(".owl.core"), !1 !== this.settings.responsive && (i.clearTimeout(this.resizeTimer), this.off(i, "resize", this._handlers.onThrottledResize)), this._plugins) this._plugins[t].destroy();
		this.$stage.children(".cloned").remove(), this.$stage.unwrap(), this.$stage.children().contents().unwrap(), this.$stage.children().unwrap(), this.$element.removeClass(this.options.refreshClass).removeClass(this.options.loadingClass).removeClass(this.options.loadedClass).removeClass(this.options.rtlClass).removeClass(this.options.dragClass).removeClass(this.options.grabClass).attr("class", this.$element.attr("class").replace(new RegExp(this.options.responsiveClass + "-\\S+\\s", "g"), "")).removeData("owl.carousel")
	}, h.prototype.op = function(t, e, i) {
		var n = this.settings.rtl;
		switch (e) {
			case "<":
				return n ? i < t : t < i;
			case ">":
				return n ? t < i : i < t;
			case ">=":
				return n ? t <= i : i <= t;
			case "<=":
				return n ? i <= t : t <= i
		}
	}, h.prototype.on = function(t, e, i, n) {
		t.addEventListener ? t.addEventListener(e, i, n) : t.attachEvent && t.attachEvent("on" + e, i)
	}, h.prototype.off = function(t, e, i, n) {
		t.removeEventListener ? t.removeEventListener(e, i, n) : t.detachEvent && t.detachEvent("on" + e, i)
	}, h.prototype.trigger = function(t, e, i, n, s) {
		var o = {
				item: {
					count: this._items.length,
					index: this.current()
				}
			},
			r = l.camelCase(l.grep(["on", t, i], function(t) {
				return t
			}).join("-").toLowerCase()),
			a = l.Event([t, "owl", i || "carousel"].join(".").toLowerCase(), l.extend({
				relatedTarget: this
			}, o, e));
		return this._supress[t] || (l.each(this._plugins, function(t, e) {
			e.onTrigger && e.onTrigger(a)
		}), this.register({
			type: h.Type.Event,
			name: t
		}), this.$element.trigger(a), this.settings && "function" == typeof this.settings[r] && this.settings[r].call(this, a)), a
	}, h.prototype.enter = function(t) {
		l.each([t].concat(this._states.tags[t] || []), l.proxy(function(t, e) {
			this._states.current[e] === o && (this._states.current[e] = 0), this._states.current[e]++
		}, this))
	}, h.prototype.leave = function(t) {
		l.each([t].concat(this._states.tags[t] || []), l.proxy(function(t, e) {
			this._states.current[e]--
		}, this))
	}, h.prototype.register = function(i) {
		if (i.type === h.Type.Event) {
			if (l.event.special[i.name] || (l.event.special[i.name] = {}), !l.event.special[i.name].owl) {
				var e = l.event.special[i.name]._default;
				l.event.special[i.name]._default = function(t) {
					return !e || !e.apply || t.namespace && -1 !== t.namespace.indexOf("owl") ? t.namespace && -1 < t.namespace.indexOf("owl") : e.apply(this, arguments)
				}, l.event.special[i.name].owl = !0
			}
		} else i.type === h.Type.State && (this._states.tags[i.name] ? this._states.tags[i.name] = this._states.tags[i.name].concat(i.tags) : this._states.tags[i.name] = i.tags, this._states.tags[i.name] = l.grep(this._states.tags[i.name], l.proxy(function(t, e) {
			return l.inArray(t, this._states.tags[i.name]) === e
		}, this)))
	}, h.prototype.suppress = function(t) {
		l.each(t, l.proxy(function(t, e) {
			this._supress[e] = !0
		}, this))
	}, h.prototype.release = function(t) {
		l.each(t, l.proxy(function(t, e) {
			delete this._supress[e]
		}, this))
	}, h.prototype.pointer = function(t) {
		var e = {
			x: null,
			y: null
		};
		return (t = (t = t.originalEvent || t || i.event).touches && t.touches.length ? t.touches[0] : t.changedTouches && t.changedTouches.length ? t.changedTouches[0] : t).pageX ? (e.x = t.pageX, e.y = t.pageY) : (e.x = t.clientX, e.y = t.clientY), e
	}, h.prototype.isNumeric = function(t) {
		return !isNaN(parseFloat(t))
	}, h.prototype.difference = function(t, e) {
		return {
			x: t.x - e.x,
			y: t.y - e.y
		}
	}, l.fn.owlCarousel = function(e) {
		var n = Array.prototype.slice.call(arguments, 1);
		return this.each(function() {
			var t = l(this),
				i = t.data("owl.carousel");
			i || (i = new h(this, "object" == typeof e && e), t.data("owl.carousel", i), l.each(["next", "prev", "to", "destroy", "refresh", "replace", "add", "remove"], function(t, e) {
				i.register({
					type: h.Type.Event,
					name: e
				}), i.$element.on(e + ".owl.carousel.core", l.proxy(function(t) {
					t.namespace && t.relatedTarget !== this && (this.suppress([e]), i[e].apply(this, [].slice.call(arguments, 1)), this.release([e]))
				}, i))
			})), "string" == typeof e && "_" !== e.charAt(0) && i[e].apply(i, n)
		})
	}, l.fn.owlCarousel.Constructor = h
}(window.Zepto || window.jQuery, window, document),
function(e, i, t, n) {
	var s = function(t) {
		this._core = t, this._interval = null, this._visible = null, this._handlers = {
			"initialized.owl.carousel": e.proxy(function(t) {
				t.namespace && this._core.settings.autoRefresh && this.watch()
			}, this)
		}, this._core.options = e.extend({}, s.Defaults, this._core.options), this._core.$element.on(this._handlers)
	};
	s.Defaults = {
		autoRefresh: !0,
		autoRefreshInterval: 500
	}, s.prototype.watch = function() {
		this._interval || (this._visible = this._core.$element.is(":visible"), this._interval = i.setInterval(e.proxy(this.refresh, this), this._core.settings.autoRefreshInterval))
	}, s.prototype.refresh = function() {
		this._core.$element.is(":visible") !== this._visible && (this._visible = !this._visible, this._core.$element.toggleClass("owl-hidden", !this._visible), this._visible && this._core.invalidate("width") && this._core.refresh())
	}, s.prototype.destroy = function() {
		var t, e;
		for (t in i.clearInterval(this._interval), this._handlers) this._core.$element.off(t, this._handlers[t]);
		for (e in Object.getOwnPropertyNames(this)) "function" != typeof this[e] && (this[e] = null)
	}, e.fn.owlCarousel.Constructor.Plugins.AutoRefresh = s
}(window.Zepto || window.jQuery, window, document),
function(a, o, t, e) {
	var i = function(t) {
		this._core = t, this._loaded = [], this._handlers = {
			"initialized.owl.carousel change.owl.carousel resized.owl.carousel": a.proxy(function(t) {
				if (t.namespace && this._core.settings && this._core.settings.lazyLoad && (t.property && "position" == t.property.name || "initialized" == t.type))
					for (var e = this._core.settings, i = e.center && Math.ceil(e.items / 2) || e.items, n = e.center && -1 * i || 0, s = (t.property && void 0 !== t.property.value ? t.property.value : this._core.current()) + n, o = this._core.clones().length, r = a.proxy(function(t, e) {
							this.load(e)
						}, this); n++ < i;) this.load(o / 2 + this._core.relative(s)), o && a.each(this._core.clones(this._core.relative(s)), r), s++
			}, this)
		}, this._core.options = a.extend({}, i.Defaults, this._core.options), this._core.$element.on(this._handlers)
	};
	i.Defaults = {
		lazyLoad: !1
	}, i.prototype.load = function(t) {
		var e = this._core.$stage.children().eq(t),
			i = e && e.find(".owl-lazy");
		!i || -1 < a.inArray(e.get(0), this._loaded) || (i.each(a.proxy(function(t, e) {
			var i, n = a(e),
				s = 1 < o.devicePixelRatio && n.attr("data-src-retina") || n.attr("data-src");
			this._core.trigger("load", {
				element: n,
				url: s
			}, "lazy"), n.is("img") ? n.one("load.owl.lazy", a.proxy(function() {
				n.css("opacity", 1), this._core.trigger("loaded", {
					element: n,
					url: s
				}, "lazy")
			}, this)).attr("src", s) : ((i = new Image).onload = a.proxy(function() {
				n.css({
					"background-image": 'url("' + s + '")',
					opacity: "1"
				}), this._core.trigger("loaded", {
					element: n,
					url: s
				}, "lazy")
			}, this), i.src = s)
		}, this)), this._loaded.push(e.get(0)))
	}, i.prototype.destroy = function() {
		var t, e;
		for (t in this.handlers) this._core.$element.off(t, this.handlers[t]);
		for (e in Object.getOwnPropertyNames(this)) "function" != typeof this[e] && (this[e] = null)
	}, a.fn.owlCarousel.Constructor.Plugins.Lazy = i
}(window.Zepto || window.jQuery, window, document),
function(o, t, e, i) {
	var n = function(t) {
		this._core = t, this._handlers = {
			"initialized.owl.carousel refreshed.owl.carousel": o.proxy(function(t) {
				t.namespace && this._core.settings.autoHeight && this.update()
			}, this),
			"changed.owl.carousel": o.proxy(function(t) {
				t.namespace && this._core.settings.autoHeight && "position" == t.property.name && this.update()
			}, this),
			"loaded.owl.lazy": o.proxy(function(t) {
				t.namespace && this._core.settings.autoHeight && t.element.closest("." + this._core.settings.itemClass).index() === this._core.current() && this.update()
			}, this)
		}, this._core.options = o.extend({}, n.Defaults, this._core.options), this._core.$element.on(this._handlers)
	};
	n.Defaults = {
		autoHeight: !1,
		autoHeightClass: "owl-height"
	}, n.prototype.update = function() {
		var t, e = this._core._current,
			i = e + this._core.settings.items,
			n = this._core.$stage.children().toArray().slice(e, i),
			s = [];
		o.each(n, function(t, e) {
			s.push(o(e).height())
		}), t = Math.max.apply(null, s), this._core.$stage.parent().height(t).addClass(this._core.settings.autoHeightClass)
	}, n.prototype.destroy = function() {
		var t, e;
		for (t in this._handlers) this._core.$element.off(t, this._handlers[t]);
		for (e in Object.getOwnPropertyNames(this)) "function" != typeof this[e] && (this[e] = null)
	}, o.fn.owlCarousel.Constructor.Plugins.AutoHeight = n
}(window.Zepto || window.jQuery, window, document),
function(c, t, e, i) {
	var n = function(t) {
		this._core = t, this._videos = {}, this._playing = null, this._handlers = {
			"initialized.owl.carousel": c.proxy(function(t) {
				t.namespace && this._core.register({
					type: "state",
					name: "playing",
					tags: ["interacting"]
				})
			}, this),
			"resize.owl.carousel": c.proxy(function(t) {
				t.namespace && this._core.settings.video && this.isInFullScreen() && t.preventDefault()
			}, this),
			"refreshed.owl.carousel": c.proxy(function(t) {
				t.namespace && this._core.is("resizing") && this._core.$stage.find(".cloned .owl-video-frame").remove()
			}, this),
			"changed.owl.carousel": c.proxy(function(t) {
				t.namespace && "position" === t.property.name && this._playing && this.stop()
			}, this),
			"prepared.owl.carousel": c.proxy(function(t) {
				if (t.namespace) {
					var e = c(t.content).find(".owl-video");
					e.length && (e.css("display", "none"), this.fetch(e, c(t.content)))
				}
			}, this)
		}, this._core.options = c.extend({}, n.Defaults, this._core.options), this._core.$element.on(this._handlers), this._core.$element.on("click.owl.video", ".owl-video-play-icon", c.proxy(function(t) {
			this.play(t)
		}, this))
	};
	n.Defaults = {
		video: !1,
		videoHeight: !1,
		videoWidth: !1
	}, n.prototype.fetch = function(t, e) {
		var i = t.attr("data-vimeo-id") ? "vimeo" : t.attr("data-vzaar-id") ? "vzaar" : "youtube",
			n = t.attr("data-vimeo-id") || t.attr("data-youtube-id") || t.attr("data-vzaar-id"),
			s = t.attr("data-width") || this._core.settings.videoWidth,
			o = t.attr("data-height") || this._core.settings.videoHeight,
			r = t.attr("href");
		if (!r) throw new Error("Missing video URL.");
		if (-1 < (n = r.match(/(http:|https:|)\/\/(player.|www.|app.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com)|vzaar\.com)\/(video\/|videos\/|embed\/|channels\/.+\/|groups\/.+\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/))[3].indexOf("youtu")) i = "youtube";
		else if (-1 < n[3].indexOf("vimeo")) i = "vimeo";
		else {
			if (!(-1 < n[3].indexOf("vzaar"))) throw new Error("Video URL not supported.");
			i = "vzaar"
		}
		n = n[6], this._videos[r] = {
			type: i,
			id: n,
			width: s,
			height: o
		}, e.attr("data-video", r), this.thumbnail(t, this._videos[r])
	}, n.prototype.thumbnail = function(e, t) {
		var i, n, s = t.width && t.height ? 'style="width:' + t.width + "px;height:" + t.height + 'px;"' : "",
			o = e.find("img"),
			r = "src",
			a = "",
			l = this._core.settings,
			h = function(t) {
				'<div class="owl-video-play-icon"></div>',
				i = l.lazyLoad ? '<div class="owl-video-tn ' + a + '" ' + r + '="' + t + '"></div>' : '<div class="owl-video-tn" style="opacity:1;background-image:url(' + t + ')"></div>',
				e.after(i),
				e.after('<div class="owl-video-play-icon"></div>')
			};
		if (e.wrap('<div class="owl-video-wrapper"' + s + "></div>"), this._core.settings.lazyLoad && (r = "data-src", a = "owl-lazy"), o.length) return h(o.attr(r)), o.remove(), !1;
		"youtube" === t.type ? (n = "//img.youtube.com/vi/" + t.id + "/hqdefault.jpg", h(n)) : "vimeo" === t.type ? c.ajax({
			type: "GET",
			url: "//vimeo.com/api/v2/video/" + t.id + ".json",
			jsonp: "callback",
			dataType: "jsonp",
			success: function(t) {
				n = t[0].thumbnail_large, h(n)
			}
		}) : "vzaar" === t.type && c.ajax({
			type: "GET",
			url: "//vzaar.com/api/videos/" + t.id + ".json",
			jsonp: "callback",
			dataType: "jsonp",
			success: function(t) {
				n = t.framegrab_url, h(n)
			}
		})
	}, n.prototype.stop = function() {
		this._core.trigger("stop", null, "video"), this._playing.find(".owl-video-frame").remove(), this._playing.removeClass("owl-video-playing"), this._playing = null, this._core.leave("playing"), this._core.trigger("stopped", null, "video")
	}, n.prototype.play = function(t) {
		var e, i = c(t.target).closest("." + this._core.settings.itemClass),
			n = this._videos[i.attr("data-video")],
			s = n.width || "100%",
			o = n.height || this._core.$stage.height();
		this._playing || (this._core.enter("playing"), this._core.trigger("play", null, "video"), i = this._core.items(this._core.relative(i.index())), this._core.reset(i.index()), "youtube" === n.type ? e = '<iframe width="' + s + '" height="' + o + '" src="//www.youtube.com/embed/' + n.id + "?autoplay=1&rel=0&v=" + n.id + '" frameborder="0" allowfullscreen></iframe>' : "vimeo" === n.type ? e = '<iframe src="//player.vimeo.com/video/' + n.id + '?autoplay=1" width="' + s + '" height="' + o + '" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>' : "vzaar" === n.type && (e = '<iframe frameborder="0"height="' + o + '"width="' + s + '" allowfullscreen mozallowfullscreen webkitAllowFullScreen src="//view.vzaar.com/' + n.id + '/player?autoplay=true"></iframe>'), c('<div class="owl-video-frame">' + e + "</div>").insertAfter(i.find(".owl-video")), this._playing = i.addClass("owl-video-playing"))
	}, n.prototype.isInFullScreen = function() {
		var t = e.fullscreenElement || e.mozFullScreenElement || e.webkitFullscreenElement;
		return t && c(t).parent().hasClass("owl-video-frame")
	}, n.prototype.destroy = function() {
		var t, e;
		for (t in this._core.$element.off("click.owl.video"), this._handlers) this._core.$element.off(t, this._handlers[t]);
		for (e in Object.getOwnPropertyNames(this)) "function" != typeof this[e] && (this[e] = null)
	}, c.fn.owlCarousel.Constructor.Plugins.Video = n
}(window.Zepto || window.jQuery, window, document),
function(r, t, e, i) {
	var n = function(t) {
		this.core = t, this.core.options = r.extend({}, n.Defaults, this.core.options), this.swapping = !0, this.previous = void 0, this.next = void 0, this.handlers = {
			"change.owl.carousel": r.proxy(function(t) {
				t.namespace && "position" == t.property.name && (this.previous = this.core.current(), this.next = t.property.value)
			}, this),
			"drag.owl.carousel dragged.owl.carousel translated.owl.carousel": r.proxy(function(t) {
				t.namespace && (this.swapping = "translated" == t.type)
			}, this),
			"translate.owl.carousel": r.proxy(function(t) {
				t.namespace && this.swapping && (this.core.options.animateOut || this.core.options.animateIn) && this.swap()
			}, this)
		}, this.core.$element.on(this.handlers)
	};
	n.Defaults = {
		animateOut: !1,
		animateIn: !1
	}, n.prototype.swap = function() {
		if (1 === this.core.settings.items && r.support.animation && r.support.transition) {
			this.core.speed(0);
			var t, e = r.proxy(this.clear, this),
				i = this.core.$stage.children().eq(this.previous),
				n = this.core.$stage.children().eq(this.next),
				s = this.core.settings.animateIn,
				o = this.core.settings.animateOut;
			this.core.current() !== this.previous && (o && (t = this.core.coordinates(this.previous) - this.core.coordinates(this.next), i.one(r.support.animation.end, e).css({
				left: t + "px"
			}).addClass("animated owl-animated-out").addClass(o)), s && n.one(r.support.animation.end, e).addClass("animated owl-animated-in").addClass(s))
		}
	}, n.prototype.clear = function(t) {
		r(t.target).css({
			left: ""
		}).removeClass("animated owl-animated-out owl-animated-in").removeClass(this.core.settings.animateIn).removeClass(this.core.settings.animateOut), this.core.onTransitionEnd()
	}, n.prototype.destroy = function() {
		var t, e;
		for (t in this.handlers) this.core.$element.off(t, this.handlers[t]);
		for (e in Object.getOwnPropertyNames(this)) "function" != typeof this[e] && (this[e] = null)
	}, r.fn.owlCarousel.Constructor.Plugins.Animate = n
}(window.Zepto || window.jQuery, window, document),
function(i, n, s, t) {
	var e = function(t) {
		this._core = t, this._timeout = null, this._paused = !1, this._handlers = {
			"changed.owl.carousel": i.proxy(function(t) {
				t.namespace && "settings" === t.property.name ? this._core.settings.autoplay ? this.play() : this.stop() : t.namespace && "position" === t.property.name && this._core.settings.autoplay && this._setAutoPlayInterval()
			}, this),
			"initialized.owl.carousel": i.proxy(function(t) {
				t.namespace && this._core.settings.autoplay && this.play()
			}, this),
			"play.owl.autoplay": i.proxy(function(t, e, i) {
				t.namespace && this.play(e, i)
			}, this),
			"stop.owl.autoplay": i.proxy(function(t) {
				t.namespace && this.stop()
			}, this),
			"mouseover.owl.autoplay": i.proxy(function() {
				this._core.settings.autoplayHoverPause && this._core.is("rotating") && this.pause()
			}, this),
			"mouseleave.owl.autoplay": i.proxy(function() {
				this._core.settings.autoplayHoverPause && this._core.is("rotating") && this.play()
			}, this),
			"touchstart.owl.core": i.proxy(function() {
				this._core.settings.autoplayHoverPause && this._core.is("rotating") && this.pause()
			}, this),
			"touchend.owl.core": i.proxy(function() {
				this._core.settings.autoplayHoverPause && this.play()
			}, this)
		}, this._core.$element.on(this._handlers), this._core.options = i.extend({}, e.Defaults, this._core.options)
	};
	e.Defaults = {
		autoplay: !1,
		autoplayTimeout: 5e3,
		autoplayHoverPause: !1,
		autoplaySpeed: !1
	}, e.prototype.play = function(t, e) {
		this._paused = !1, this._core.is("rotating") || (this._core.enter("rotating"), this._setAutoPlayInterval())
	}, e.prototype._getNextTimeout = function(t, e) {
		return this._timeout && n.clearTimeout(this._timeout), n.setTimeout(i.proxy(function() {
			this._paused || this._core.is("busy") || this._core.is("interacting") || s.hidden || this._core.next(e || this._core.settings.autoplaySpeed)
		}, this), t || this._core.settings.autoplayTimeout)
	}, e.prototype._setAutoPlayInterval = function() {
		this._timeout = this._getNextTimeout()
	}, e.prototype.stop = function() {
		this._core.is("rotating") && (n.clearTimeout(this._timeout), this._core.leave("rotating"))
	}, e.prototype.pause = function() {
		this._core.is("rotating") && (this._paused = !0)
	}, e.prototype.destroy = function() {
		var t, e;
		for (t in this.stop(), this._handlers) this._core.$element.off(t, this._handlers[t]);
		for (e in Object.getOwnPropertyNames(this)) "function" != typeof this[e] && (this[e] = null)
	}, i.fn.owlCarousel.Constructor.Plugins.autoplay = e
}(window.Zepto || window.jQuery, window, document),
function(o, t, e, i) {
	"use strict";
	var n = function(t) {
		this._core = t, this._initialized = !1, this._pages = [], this._controls = {}, this._templates = [], this.$element = this._core.$element, this._overrides = {
			next: this._core.next,
			prev: this._core.prev,
			to: this._core.to
		}, this._handlers = {
			"prepared.owl.carousel": o.proxy(function(t) {
				t.namespace && this._core.settings.dotsData && this._templates.push('<div class="' + this._core.settings.dotClass + '">' + o(t.content).find("[data-dot]").addBack("[data-dot]").attr("data-dot") + "</div>")
			}, this),
			"added.owl.carousel": o.proxy(function(t) {
				t.namespace && this._core.settings.dotsData && this._templates.splice(t.position, 0, this._templates.pop())
			}, this),
			"remove.owl.carousel": o.proxy(function(t) {
				t.namespace && this._core.settings.dotsData && this._templates.splice(t.position, 1)
			}, this),
			"changed.owl.carousel": o.proxy(function(t) {
				t.namespace && "position" == t.property.name && this.draw()
			}, this),
			"initialized.owl.carousel": o.proxy(function(t) {
				t.namespace && !this._initialized && (this._core.trigger("initialize", null, "navigation"), this.initialize(), this.update(), this.draw(), this._initialized = !0, this._core.trigger("initialized", null, "navigation"))
			}, this),
			"refreshed.owl.carousel": o.proxy(function(t) {
				t.namespace && this._initialized && (this._core.trigger("refresh", null, "navigation"), this.update(), this.draw(), this._core.trigger("refreshed", null, "navigation"))
			}, this)
		}, this._core.options = o.extend({}, n.Defaults, this._core.options), this.$element.on(this._handlers)
	};
	n.Defaults = {
		nav: !1,
		navText: ["prev", "next"],
		navSpeed: !1,
		navElement: "div",
		navContainer: !1,
		navContainerClass: "owl-nav",
		navClass: ["owl-prev", "owl-next"],
		slideBy: 1,
		dotClass: "owl-dot",
		dotsClass: "owl-dots",
		dots: !0,
		dotsEach: !1,
		dotsData: !1,
		dotsSpeed: !1,
		dotsContainer: !1
	}, n.prototype.initialize = function() {
		var t, i = this._core.settings;
		for (t in this._controls.$relative = (i.navContainer ? o(i.navContainer) : o("<div>").addClass(i.navContainerClass).appendTo(this.$element)).addClass("disabled"), this._controls.$previous = o("<" + i.navElement + ">").addClass(i.navClass[0]).html(i.navText[0]).prependTo(this._controls.$relative).on("click", o.proxy(function(t) {
				this.prev(i.navSpeed)
			}, this)), this._controls.$next = o("<" + i.navElement + ">").addClass(i.navClass[1]).html(i.navText[1]).appendTo(this._controls.$relative).on("click", o.proxy(function(t) {
				this.next(i.navSpeed)
			}, this)), i.dotsData || (this._templates = [o("<div>").addClass(i.dotClass).append(o("<span>")).prop("outerHTML")]), this._controls.$absolute = (i.dotsContainer ? o(i.dotsContainer) : o("<div>").addClass(i.dotsClass).appendTo(this.$element)).addClass("disabled"), this._controls.$absolute.on("click", "div", o.proxy(function(t) {
				var e = o(t.target).parent().is(this._controls.$absolute) ? o(t.target).index() : o(t.target).parent().index();
				t.preventDefault(), this.to(e, i.dotsSpeed)
			}, this)), this._overrides) this._core[t] = o.proxy(this[t], this)
	}, n.prototype.destroy = function() {
		var t, e, i, n;
		for (t in this._handlers) this.$element.off(t, this._handlers[t]);
		for (e in this._controls) this._controls[e].remove();
		for (n in this.overides) this._core[n] = this._overrides[n];
		for (i in Object.getOwnPropertyNames(this)) "function" != typeof this[i] && (this[i] = null)
	}, n.prototype.update = function() {
		var t, e, i = this._core.clones().length / 2,
			n = i + this._core.items().length,
			s = this._core.maximum(!0),
			o = this._core.settings,
			r = o.center || o.autoWidth || o.dotsData ? 1 : o.dotsEach || o.items;
		if ("page" !== o.slideBy && (o.slideBy = Math.min(o.slideBy, o.items)), o.dots || "page" == o.slideBy)
			for (this._pages = [], t = i, e = 0; t < n; t++) {
				if (r <= e || 0 === e) {
					if (this._pages.push({
							start: Math.min(s, t - i),
							end: t - i + r - 1
						}), Math.min(s, t - i) === s) break;
					e = 0, 0
				}
				e += this._core.mergers(this._core.relative(t))
			}
	}, n.prototype.draw = function() {
		var t, e = this._core.settings,
			i = this._core.items().length <= e.items,
			n = this._core.relative(this._core.current()),
			s = e.loop || e.rewind;
		this._controls.$relative.toggleClass("disabled", !e.nav || i), e.nav && (this._controls.$previous.toggleClass("disabled", !s && n <= this._core.minimum(!0)), this._controls.$next.toggleClass("disabled", !s && n >= this._core.maximum(!0))), this._controls.$absolute.toggleClass("disabled", !e.dots || i), e.dots && (t = this._pages.length - this._controls.$absolute.children().length, e.dotsData && 0 != t ? this._controls.$absolute.html(this._templates.join("")) : 0 < t ? this._controls.$absolute.append(new Array(1 + t).join(this._templates[0])) : t < 0 && this._controls.$absolute.children().slice(t).remove(), this._controls.$absolute.find(".active").removeClass("active"), this._controls.$absolute.children().eq(o.inArray(this.current(), this._pages)).addClass("active"))
	}, n.prototype.onTrigger = function(t) {
		var e = this._core.settings;
		t.page = {
			index: o.inArray(this.current(), this._pages),
			count: this._pages.length,
			size: e && (e.center || e.autoWidth || e.dotsData ? 1 : e.dotsEach || e.items)
		}
	}, n.prototype.current = function() {
		var i = this._core.relative(this._core.current());
		return o.grep(this._pages, o.proxy(function(t, e) {
			return t.start <= i && t.end >= i
		}, this)).pop()
	}, n.prototype.getPosition = function(t) {
		var e, i, n = this._core.settings;
		return "page" == n.slideBy ? (e = o.inArray(this.current(), this._pages), i = this._pages.length, t ? ++e : --e, e = this._pages[(e % i + i) % i].start) : (e = this._core.relative(this._core.current()), i = this._core.items().length, t ? e += n.slideBy : e -= n.slideBy), e
	}, n.prototype.next = function(t) {
		o.proxy(this._overrides.to, this._core)(this.getPosition(!0), t)
	}, n.prototype.prev = function(t) {
		o.proxy(this._overrides.to, this._core)(this.getPosition(!1), t)
	}, n.prototype.to = function(t, e, i) {
		var n;
		!i && this._pages.length ? (n = this._pages.length, o.proxy(this._overrides.to, this._core)(this._pages[(t % n + n) % n].start, e)) : o.proxy(this._overrides.to, this._core)(t, e)
	}, o.fn.owlCarousel.Constructor.Plugins.Navigation = n
}(window.Zepto || window.jQuery, window, document),
function(n, s, t, e) {
	"use strict";
	var i = function(t) {
		this._core = t, this._hashes = {}, this.$element = this._core.$element, this._handlers = {
			"initialized.owl.carousel": n.proxy(function(t) {
				t.namespace && "URLHash" === this._core.settings.startPosition && n(s).trigger("hashchange.owl.navigation")
			}, this),
			"prepared.owl.carousel": n.proxy(function(t) {
				if (t.namespace) {
					var e = n(t.content).find("[data-hash]").addBack("[data-hash]").attr("data-hash");
					if (!e) return;
					this._hashes[e] = t.content
				}
			}, this),
			"changed.owl.carousel": n.proxy(function(t) {
				if (t.namespace && "position" === t.property.name) {
					var i = this._core.items(this._core.relative(this._core.current())),
						e = n.map(this._hashes, function(t, e) {
							return t === i ? e : null
						}).join();
					if (!e || s.location.hash.slice(1) === e) return;
					s.location.hash = e
				}
			}, this)
		}, this._core.options = n.extend({}, i.Defaults, this._core.options), this.$element.on(this._handlers), n(s).on("hashchange.owl.navigation", n.proxy(function(t) {
			var e = s.location.hash.substring(1),
				i = this._core.$stage.children(),
				n = this._hashes[e] && i.index(this._hashes[e]);
			void 0 !== n && n !== this._core.current() && this._core.to(this._core.relative(n), !1, !0)
		}, this))
	};
	i.Defaults = {
		URLhashListener: !1
	}, i.prototype.destroy = function() {
		var t, e;
		for (t in n(s).off("hashchange.owl.navigation"), this._handlers) this._core.$element.off(t, this._handlers[t]);
		for (e in Object.getOwnPropertyNames(this)) "function" != typeof this[e] && (this[e] = null)
	}, n.fn.owlCarousel.Constructor.Plugins.Hash = i
}(window.Zepto || window.jQuery, window, document),
function(s, t, e, o) {
	var r = s("<support>").get(0).style,
		a = "Webkit Moz O ms".split(" "),
		i = {
			transition: {
				end: {
					WebkitTransition: "webkitTransitionEnd",
					MozTransition: "transitionend",
					OTransition: "oTransitionEnd",
					transition: "transitionend"
				}
			},
			animation: {
				end: {
					WebkitAnimation: "webkitAnimationEnd",
					MozAnimation: "animationend",
					OAnimation: "oAnimationEnd",
					animation: "animationend"
				}
			}
		},
		n = function() {
			return !!c("transform")
		},
		l = function() {
			return !!c("perspective")
		},
		h = function() {
			return !!c("animation")
		};

	function c(t, i) {
		var n = !1,
			e = t.charAt(0).toUpperCase() + t.slice(1);
		return s.each((t + " " + a.join(e + " ") + e).split(" "), function(t, e) {
			if (r[e] !== o) return n = !i || e, !1
		}), n
	}

	function u(t) {
		return c(t, !0)
	}(function() {
		return !!c("transition")
	})() && (s.support.transition = new String(u("transition")), s.support.transition.end = i.transition.end[s.support.transition]), h() && (s.support.animation = new String(u("animation")), s.support.animation.end = i.animation.end[s.support.animation]), n() && (s.support.transform = new String(u("transform")), s.support.transform3d = l())
}(window.Zepto || window.jQuery, window, document),
function(t, e) {
	"function" == typeof define && define.amd ? define(e) : "object" == typeof exports ? module.exports = e() : t.PhotoSwipeUI_Default = e()
}(this, function() {
	"use strict";
	return function(s, a) {
		var e, l, o, r, i, n, h, c, u, t, d, p, g, m, f, v, y, w, _ = this,
			x = !1,
			b = !0,
			C = !0,
			T = {
				barsSize: {
					top: 44,
					bottom: "auto"
				},
				closeElClasses: ["item", "caption", "zoom-wrap", "ui", "top-bar"],
				timeToIdle: 4e3,
				timeToIdleOutside: 1e3,
				loadingIndicatorDelay: 1e3,
				addCaptionHTMLFn: function(t, e) {
					return t.title ? (e.children[0].innerHTML = t.title, !0) : (e.children[0].innerHTML = "", !1)
				},
				closeEl: !0,
				captionEl: !0,
				fullscreenEl: !0,
				zoomEl: !0,
				shareEl: !0,
				counterEl: !0,
				arrowEl: !0,
				preloaderEl: !0,
				tapToClose: !1,
				tapToToggleControls: !0,
				clickToCloseNonZoomable: !0,
				shareButtons: [{
					id: "facebook",
					label: "Share on Facebook",
					url: "https://www.facebook.com/sharer/sharer.php?u={{url}}"
				}, {
					id: "twitter",
					label: "Tweet",
					url: "https://twitter.com/intent/tweet?text={{text}}&url={{url}}"
				}, {
					id: "pinterest",
					label: "Pin it",
					url: "http://www.pinterest.com/pin/create/button/?url={{url}}&media={{image_url}}&description={{text}}"
				}, {
					id: "download",
					label: "Download image",
					url: "{{raw_image_url}}",
					download: !0
				}],
				getImageURLForShare: function() {
					return s.currItem.src || ""
				},
				getPageURLForShare: function() {
					return window.location.href
				},
				getTextForShare: function() {
					return s.currItem.title || ""
				},
				indexIndicatorSep: " / ",
				fitControlsWidth: 1200
			},
			S = function(t) {
				if (v) return !0;
				t = t || window.event, f.timeToIdle && f.mouseUsed && !u && O();
				for (var e, i, n = (t.target || t.srcElement).getAttribute("class") || "", s = 0; s < P.length; s++)(e = P[s]).onTap && -1 < n.indexOf("pswp__" + e.name) && (e.onTap(), i = !0);
				if (i) {
					t.stopPropagation && t.stopPropagation(), v = !0;
					var o = a.features.isOldAndroid ? 600 : 30;
					setTimeout(function() {
						v = !1
					}, o)
				}
			},
			I = function(t, e, i) {
				a[(i ? "add" : "remove") + "Class"](t, "pswp__" + e)
			},
			E = function() {
				var t = 1 === f.getNumItemsFn();
				t !== m && (I(l, "ui--one-slide", t), m = t)
			},
			k = function() {
				I(h, "share-modal--hidden", C)
			},
			R = function() {
				return (C = !C) ? (a.removeClass(h, "pswp__share-modal--fade-in"), setTimeout(function() {
					C && k()
				}, 300)) : (k(), setTimeout(function() {
					C || a.addClass(h, "pswp__share-modal--fade-in")
				}, 30)), C || j(), !1
			},
			z = function(t) {
				var e = (t = t || window.event).target || t.srcElement;
				return s.shout("shareLinkClick", t, e), !(!e.href || !e.hasAttribute("download") && (window.open(e.href, "pswp_share", "scrollbars=yes,resizable=yes,toolbar=no,location=yes,width=550,height=420,top=100,left=" + (window.screen ? Math.round(screen.width / 2 - 275) : 100)), C || R(), 1))
			},
			j = function() {
				for (var t, e, i, n, s = "", o = 0; o < f.shareButtons.length; o++) t = f.shareButtons[o], e = f.getImageURLForShare(t), i = f.getPageURLForShare(t), n = f.getTextForShare(t), s += '<a href="' + t.url.replace("{{url}}", encodeURIComponent(i)).replace("{{image_url}}", encodeURIComponent(e)).replace("{{raw_image_url}}", e).replace("{{text}}", encodeURIComponent(n)) + '" target="_blank" class="pswp__share--' + t.id + '"' + (t.download ? "download" : "") + ">" + t.label + "</a>", f.parseShareButtonOut && (s = f.parseShareButtonOut(t, s));
				h.children[0].innerHTML = s, h.children[0].onclick = z
			},
			D = function(t) {
				for (var e = 0; e < f.closeElClasses.length; e++)
					if (a.hasClass(t, "pswp__" + f.closeElClasses[e])) return !0
			},
			A = 0,
			O = function() {
				clearTimeout(w), A = 0, u && _.setIdle(!1)
			},
			M = function(t) {
				var e = (t = t || window.event).relatedTarget || t.toElement;
				e && "HTML" !== e.nodeName || (clearTimeout(w), w = setTimeout(function() {
					_.setIdle(!0)
				}, f.timeToIdleOutside))
			},
			$ = function(t) {
				p !== t && (I(d, "preloader--active", !t), p = t)
			},
			F = function(t) {
				var e = t.vGap;
				if (!s.likelyTouchDevice || f.mouseUsed || screen.width > f.fitControlsWidth) {
					var i = f.barsSize;
					if (f.captionEl && "auto" === i.bottom)
						if (r || ((r = a.createEl("pswp__caption pswp__caption--fake")).appendChild(a.createEl("pswp__caption__center")), l.insertBefore(r, o), a.addClass(l, "pswp__ui--fit")), f.addCaptionHTMLFn(t, r, !0)) {
							var n = r.clientHeight;
							e.bottom = parseInt(n, 10) || 44
						} else e.bottom = i.top;
					else e.bottom = "auto" === i.bottom ? 0 : i.bottom;
					e.top = i.top
				} else e.top = e.bottom = 0
			},
			P = [{
				name: "caption",
				option: "captionEl",
				onInit: function(t) {
					o = t
				}
			}, {
				name: "share-modal",
				option: "shareEl",
				onInit: function(t) {
					h = t
				},
				onTap: function() {
					R()
				}
			}, {
				name: "button--share",
				option: "shareEl",
				onInit: function(t) {
					n = t
				},
				onTap: function() {
					R()
				}
			}, {
				name: "button--zoom",
				option: "zoomEl",
				onTap: s.toggleDesktopZoom
			}, {
				name: "counter",
				option: "counterEl",
				onInit: function(t) {
					i = t
				}
			}, {
				name: "button--close",
				option: "closeEl",
				onTap: s.close
			}, {
				name: "button--arrow--left",
				option: "arrowEl",
				onTap: s.prev
			}, {
				name: "button--arrow--right",
				option: "arrowEl",
				onTap: s.next
			}, {
				name: "button--fs",
				option: "fullscreenEl",
				onTap: function() {
					e.isFullscreen() ? e.exit() : e.enter()
				}
			}, {
				name: "preloader",
				option: "preloaderEl",
				onInit: function(t) {
					d = t
				}
			}];
		_.init = function() {
			a.extend(s.options, T, !0), f = s.options, l = a.getChildByClass(s.scrollWrap, "pswp__ui"), t = s.listen,
				function() {
					var e;
					t("onVerticalDrag", function(t) {
						b && t < .95 ? _.hideControls() : !b && .95 <= t && _.showControls()
					}), t("onPinchClose", function(t) {
						b && t < .9 ? (_.hideControls(), e = !0) : e && !b && .9 < t && _.showControls()
					}), t("zoomGestureEnded", function() {
						(e = !1) && !b && _.showControls()
					})
				}(), t("beforeChange", _.update), t("doubleTap", function(t) {
					var e = s.currItem.initialZoomLevel;
					s.getZoomLevel() !== e ? s.zoomTo(e, t, 333) : s.zoomTo(f.getDoubleTapZoom(!1, s.currItem), t, 333)
				}), t("preventDragEvent", function(t, e, i) {
					var n = t.target || t.srcElement;
					n && n.getAttribute("class") && -1 < t.type.indexOf("mouse") && (0 < n.getAttribute("class").indexOf("__caption") || /(SMALL|STRONG|EM)/i.test(n.tagName)) && (i.prevent = !1)
				}), t("bindEvents", function() {
					a.bind(l, "pswpTap click", S), a.bind(s.scrollWrap, "pswpTap", _.onGlobalTap), s.likelyTouchDevice || a.bind(s.scrollWrap, "mouseover", _.onMouseOver)
				}), t("unbindEvents", function() {
					C || R(), y && clearInterval(y), a.unbind(document, "mouseout", M), a.unbind(document, "mousemove", O), a.unbind(l, "pswpTap click", S), a.unbind(s.scrollWrap, "pswpTap", _.onGlobalTap), a.unbind(s.scrollWrap, "mouseover", _.onMouseOver), e && (a.unbind(document, e.eventK, _.updateFullscreen), e.isFullscreen() && (f.hideAnimationDuration = 0, e.exit()), e = null)
				}), t("destroy", function() {
					f.captionEl && (r && l.removeChild(r), a.removeClass(o, "pswp__caption--empty")), h && (h.children[0].onclick = null), a.removeClass(l, "pswp__ui--over-close"), a.addClass(l, "pswp__ui--hidden"), _.setIdle(!1)
				}), f.showAnimationDuration || a.removeClass(l, "pswp__ui--hidden"), t("initialZoomIn", function() {
					f.showAnimationDuration && a.removeClass(l, "pswp__ui--hidden")
				}), t("initialZoomOut", function() {
					a.addClass(l, "pswp__ui--hidden")
				}), t("parseVerticalMargin", F),
				function() {
					var s, o, r, t = function(t) {
						if (t)
							for (var e = t.length, i = 0; i < e; i++) {
								s = t[i], o = s.className;
								for (var n = 0; n < P.length; n++) r = P[n], -1 < o.indexOf("pswp__" + r.name) && (f[r.option] ? (a.removeClass(s, "pswp__element--disabled"), r.onInit && r.onInit(s)) : a.addClass(s, "pswp__element--disabled"))
							}
					};
					t(l.children);
					var e = a.getChildByClass(l, "pswp__top-bar");
					e && t(e.children)
				}(), f.shareEl && n && h && (C = !0), E(), f.timeToIdle && t("mouseUsed", function() {
					a.bind(document, "mousemove", O), a.bind(document, "mouseout", M), y = setInterval(function() {
						2 == ++A && _.setIdle(!0)
					}, f.timeToIdle / 2)
				}), f.fullscreenEl && !a.features.isOldAndroid && (e || (e = _.getFullscreenAPI()), e ? (a.bind(document, e.eventK, _.updateFullscreen), _.updateFullscreen(), a.addClass(s.template, "pswp--supports-fs")) : a.removeClass(s.template, "pswp--supports-fs")), f.preloaderEl && ($(!0), t("beforeChange", function() {
					clearTimeout(g), g = setTimeout(function() {
						s.currItem && s.currItem.loading ? (!s.allowProgressiveImg() || s.currItem.img && !s.currItem.img.naturalWidth) && $(!1) : $(!0)
					}, f.loadingIndicatorDelay)
				}), t("imageLoadComplete", function(t, e) {
					s.currItem === e && $(!0)
				}))
		}, _.setIdle = function(t) {
			I(l, "ui--idle", u = t)
		}, _.update = function() {
			x = !(!b || !s.currItem || (_.updateIndexIndicator(), f.captionEl && (f.addCaptionHTMLFn(s.currItem, o), I(o, "caption--empty", !s.currItem.title)), 0)), C || R(), E()
		}, _.updateFullscreen = function(t) {
			t && setTimeout(function() {
				s.setScrollOffset(0, a.getScrollY())
			}, 50), a[(e.isFullscreen() ? "add" : "remove") + "Class"](s.template, "pswp--fs")
		}, _.updateIndexIndicator = function() {
			f.counterEl && (i.innerHTML = s.getCurrentIndex() + 1 + f.indexIndicatorSep + f.getNumItemsFn())
		}, _.onGlobalTap = function(t) {
			var e = (t = t || window.event).target || t.srcElement;
			if (!v)
				if (t.detail && "mouse" === t.detail.pointerType) {
					if (D(e)) return void s.close();
					a.hasClass(e, "pswp__img") && (1 === s.getZoomLevel() && s.getZoomLevel() <= s.currItem.fitRatio ? f.clickToCloseNonZoomable && s.close() : s.toggleDesktopZoom(t.detail.releasePoint))
				} else if (f.tapToToggleControls && (b ? _.hideControls() : _.showControls()), f.tapToClose && (a.hasClass(e, "pswp__img") || D(e))) return void s.close()
		}, _.onMouseOver = function(t) {
			var e = (t = t || window.event).target || t.srcElement;
			I(l, "ui--over-close", D(e))
		}, _.hideControls = function() {
			a.addClass(l, "pswp__ui--hidden"), b = !1
		}, _.showControls = function() {
			b = !0, x || _.update(), a.removeClass(l, "pswp__ui--hidden")
		}, _.supportsFullscreen = function() {
			var t = document;
			return !!(t.exitFullscreen || t.mozCancelFullScreen || t.webkitExitFullscreen || t.msExitFullscreen)
		}, _.getFullscreenAPI = function() {
			var t, e = document.documentElement,
				i = "fullscreenchange";
			return e.requestFullscreen ? t = {
				enterK: "requestFullscreen",
				exitK: "exitFullscreen",
				elementK: "fullscreenElement",
				eventK: i
			} : e.mozRequestFullScreen ? t = {
				enterK: "mozRequestFullScreen",
				exitK: "mozCancelFullScreen",
				elementK: "mozFullScreenElement",
				eventK: "moz" + i
			} : e.webkitRequestFullscreen ? t = {
				enterK: "webkitRequestFullscreen",
				exitK: "webkitExitFullscreen",
				elementK: "webkitFullscreenElement",
				eventK: "webkit" + i
			} : e.msRequestFullscreen && (t = {
				enterK: "msRequestFullscreen",
				exitK: "msExitFullscreen",
				elementK: "msFullscreenElement",
				eventK: "MSFullscreenChange"
			}), t && (t.enter = function() {
				if (c = f.closeOnScroll, f.closeOnScroll = !1, "webkitRequestFullscreen" !== this.enterK) return s.template[this.enterK]();
				s.template[this.enterK](Element.ALLOW_KEYBOARD_INPUT)
			}, t.exit = function() {
				return f.closeOnScroll = c, document[this.exitK]()
			}, t.isFullscreen = function() {
				return document[this.elementK]
			}), t
		}
	}
}),
function(t, e) {
	"function" == typeof define && define.amd ? define(e) : "object" == typeof exports ? module.exports = e() : t.PhotoSwipe = e()
}(this, function() {
	"use strict";
	return function(p, n, t, e) {
		var g = {
			features: null,
			bind: function(t, e, i, n) {
				var s = (n ? "remove" : "add") + "EventListener";
				e = e.split(" ");
				for (var o = 0; o < e.length; o++) e[o] && t[s](e[o], i, !1)
			},
			isArray: function(t) {
				return t instanceof Array
			},
			createEl: function(t, e) {
				var i = document.createElement(e || "div");
				return t && (i.className = t), i
			},
			getScrollY: function() {
				var t = window.pageYOffset;
				return void 0 !== t ? t : document.documentElement.scrollTop
			},
			unbind: function(t, e, i) {
				g.bind(t, e, i, !0)
			},
			removeClass: function(t, e) {
				var i = new RegExp("(\\s|^)" + e + "(\\s|$)");
				t.className = t.className.replace(i, " ").replace(/^\s\s*/, "").replace(/\s\s*$/, "")
			},
			addClass: function(t, e) {
				g.hasClass(t, e) || (t.className += (t.className ? " " : "") + e)
			},
			hasClass: function(t, e) {
				return t.className && new RegExp("(^|\\s)" + e + "(\\s|$)").test(t.className)
			},
			getChildByClass: function(t, e) {
				for (var i = t.firstChild; i;) {
					if (g.hasClass(i, e)) return i;
					i = i.nextSibling
				}
			},
			arraySearch: function(t, e, i) {
				for (var n = t.length; n--;)
					if (t[n][i] === e) return n;
				return -1
			},
			extend: function(t, e, i) {
				for (var n in e)
					if (e.hasOwnProperty(n)) {
						if (i && t.hasOwnProperty(n)) continue;
						t[n] = e[n]
					}
			},
			easing: {
				sine: {
					out: function(t) {
						return Math.sin(t * (Math.PI / 2))
					},
					inOut: function(t) {
						return -(Math.cos(Math.PI * t) - 1) / 2
					}
				},
				cubic: {
					out: function(t) {
						return --t * t * t + 1
					}
				}
			},
			detectFeatures: function() {
				if (g.features) return g.features;
				var t = g.createEl().style,
					e = "",
					i = {};
				if (i.oldIE = document.all && !document.addEventListener, i.touch = "ontouchstart" in window, window.requestAnimationFrame && (i.raf = window.requestAnimationFrame, i.caf = window.cancelAnimationFrame), i.pointerEvent = navigator.pointerEnabled || navigator.msPointerEnabled, !i.pointerEvent) {
					var n = navigator.userAgent;
					if (/iP(hone|od)/.test(navigator.platform)) {
						var s = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);
						s && 0 < s.length && 1 <= (s = parseInt(s[1], 10)) && s < 8 && (i.isOldIOSPhone = !0)
					}
					var o = n.match(/Android\s([0-9\.]*)/),
						r = o ? o[1] : 0;
					1 <= (r = parseFloat(r)) && (r < 4.4 && (i.isOldAndroid = !0), i.androidVersion = r), i.isMobileOpera = /opera mini|opera mobi/i.test(n)
				}
				for (var a, l, h = ["transform", "perspective", "animationName"], c = ["", "webkit", "Moz", "ms", "O"], u = 0; u < 4; u++) {
					e = c[u];
					for (var d = 0; d < 3; d++) a = h[d], l = e + (e ? a.charAt(0).toUpperCase() + a.slice(1) : a), !i[a] && l in t && (i[a] = l);
					e && !i.raf && (e = e.toLowerCase(), i.raf = window[e + "RequestAnimationFrame"], i.raf && (i.caf = window[e + "CancelAnimationFrame"] || window[e + "CancelRequestAnimationFrame"]))
				}
				if (!i.raf) {
					var p = 0;
					i.raf = function(t) {
						var e = (new Date).getTime(),
							i = Math.max(0, 16 - (e - p)),
							n = window.setTimeout(function() {
								t(e + i)
							}, i);
						return p = e + i, n
					}, i.caf = function(t) {
						clearTimeout(t)
					}
				}
				return i.svg = !!document.createElementNS && !!document.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect, g.features = i
			}
		};
		g.detectFeatures(), g.features.oldIE && (g.bind = function(t, e, i, n) {
			e = e.split(" ");
			for (var s, o = (n ? "detach" : "attach") + "Event", r = function() {
					i.handleEvent.call(i)
				}, a = 0; a < e.length; a++)
				if (s = e[a])
					if ("object" == typeof i && i.handleEvent) {
						if (n) {
							if (!i["oldIE" + s]) return !1
						} else i["oldIE" + s] = r;
						t[o]("on" + s, i["oldIE" + s])
					} else t[o]("on" + s, i)
		});
		var m = this,
			f = {
				allowPanToNext: !0,
				spacing: .12,
				bgOpacity: 1,
				mouseUsed: !1,
				loop: !0,
				pinchToClose: !0,
				closeOnScroll: !0,
				closeOnVerticalDrag: !0,
				verticalDragRange: .75,
				hideAnimationDuration: 333,
				showAnimationDuration: 333,
				showHideOpacity: !1,
				focus: !0,
				escKey: !0,
				arrowKeys: !0,
				mainScrollEndFriction: .35,
				panEndFriction: .35,
				isClickableElement: function(t) {
					return "A" === t.tagName
				},
				getDoubleTapZoom: function(t, e) {
					return t ? 1 : e.initialZoomLevel < .7 ? 1 : 1.33
				},
				maxSpreadZoom: 1.33,
				modal: !0,
				scaleMode: "fit"
			};
		g.extend(f, e);
		var l, s, o, v, r, a, h, c, u, y, d, w, _, x, b, C, T, S, I, E, k, R, z, j, D, A, O, M, $, F, P, L, H, N, W, Z, B, U, K, G, V, q, i, Y, Q, X, J, tt, et, it, nt, st, ot, rt, at, lt, ht = {
				x: 0,
				y: 0
			},
			ct = {
				x: 0,
				y: 0
			},
			ut = {
				x: 0,
				y: 0
			},
			dt = {},
			pt = 0,
			gt = {},
			mt = {
				x: 0,
				y: 0
			},
			ft = 0,
			vt = !0,
			yt = [],
			wt = {},
			_t = !1,
			xt = function(t, e) {
				g.extend(m, e.publicMethods), yt.push(t)
			},
			bt = function(t) {
				var e = Ne();
				return e - 1 < t ? t - e : t < 0 ? e + t : t
			},
			Ct = {},
			Tt = function(t, e) {
				return Ct[t] || (Ct[t] = []), Ct[t].push(e)
			},
			St = function(t) {
				var e = Ct[t];
				if (e) {
					var i = Array.prototype.slice.call(arguments);
					i.shift();
					for (var n = 0; n < e.length; n++) e[n].apply(m, i)
				}
			},
			It = function() {
				return (new Date).getTime()
			},
			Et = function(t) {
				rt = t, m.bg.style.opacity = t * f.bgOpacity
			},
			kt = function(t, e, i, n, s) {
				(!_t || s && s !== m.currItem) && (n /= s ? s.fitRatio : m.currItem.fitRatio), t[R] = w + e + "px, " + i + "px" + _ + " scale(" + n + ")"
			},
			Rt = function(t) {
				et && (t && (y > m.currItem.fitRatio ? _t || (Ye(m.currItem, !1, !0), _t = !0) : _t && (Ye(m.currItem), _t = !1)), kt(et, ut.x, ut.y, y))
			},
			zt = function(t) {
				t.container && kt(t.container.style, t.initialPosition.x, t.initialPosition.y, t.initialZoomLevel, t)
			},
			jt = function(t, e) {
				e[R] = w + t + "px, 0px" + _
			},
			Dt = function(t, e) {
				if (!f.loop && e) {
					var i = v + (mt.x * pt - t) / mt.x,
						n = Math.round(t - ce.x);
					(i < 0 && 0 < n || i >= Ne() - 1 && n < 0) && (t = ce.x + n * f.mainScrollEndFriction)
				}
				ce.x = t, jt(t, r)
			},
			At = function(t, e) {
				var i = ue[t] - gt[t];
				return ct[t] + ht[t] + i - e / d * i
			},
			Ot = function(t, e) {
				t.x = e.x, t.y = e.y, e.id && (t.id = e.id)
			},
			Mt = function(t) {
				t.x = Math.round(t.x), t.y = Math.round(t.y)
			},
			$t = null,
			Ft = function() {
				$t && (g.unbind(document, "mousemove", Ft), g.addClass(p, "pswp--has_mouse"), f.mouseUsed = !0, St("mouseUsed")), $t = setTimeout(function() {
					$t = null
				}, 100)
			},
			Pt = function(t, e) {
				var i = Ke(m.currItem, dt, t);
				return e && (tt = i), i
			},
			Lt = function(t) {
				return t || (t = m.currItem), t.initialZoomLevel
			},
			Ht = function(t) {
				return t || (t = m.currItem), 0 < t.w ? f.maxSpreadZoom : 1
			},
			Nt = function(t, e, i, n) {
				return n === m.currItem.initialZoomLevel ? (i[t] = m.currItem.initialPosition[t], !0) : (i[t] = At(t, n), i[t] > e.min[t] ? (i[t] = e.min[t], !0) : i[t] < e.max[t] && (i[t] = e.max[t], !0))
			},
			Wt = function(t) {
				var e = "";
				f.escKey && 27 === t.keyCode ? e = "close" : f.arrowKeys && (37 === t.keyCode ? e = "prev" : 39 === t.keyCode && (e = "next")), e && (t.ctrlKey || t.altKey || t.shiftKey || t.metaKey || (t.preventDefault ? t.preventDefault() : t.returnValue = !1, m[e]()))
			},
			Zt = function(t) {
				t && (q || V || it || B) && (t.preventDefault(), t.stopPropagation())
			},
			Bt = function() {
				m.setScrollOffset(0, g.getScrollY())
			},
			Ut = {},
			Kt = 0,
			Gt = function(t) {
				Ut[t] && (Ut[t].raf && A(Ut[t].raf), Kt--, delete Ut[t])
			},
			Vt = function(t) {
				Ut[t] && Gt(t), Ut[t] || (Kt++, Ut[t] = {})
			},
			qt = function() {
				for (var t in Ut) Ut.hasOwnProperty(t) && Gt(t)
			},
			Yt = function(t, e, i, n, s, o, r) {
				var a, l = It();
				Vt(t);
				var h = function() {
					if (Ut[t]) {
						if (a = It() - l, n <= a) return Gt(t), o(i), void(r && r());
						o((i - e) * s(a / n) + e), Ut[t].raf = D(h)
					}
				};
				h()
			},
			Qt = {
				shout: St,
				listen: Tt,
				viewportSize: dt,
				options: f,
				isMainScrollAnimating: function() {
					return it
				},
				getZoomLevel: function() {
					return y
				},
				getCurrentIndex: function() {
					return v
				},
				isDragging: function() {
					return K
				},
				isZooming: function() {
					return X
				},
				setScrollOffset: function(t, e) {
					gt.x = t, F = gt.y = e, St("updateScrollOffset", gt)
				},
				applyZoomPan: function(t, e, i, n) {
					ut.x = e, ut.y = i, y = t, Rt(n)
				},
				init: function() {
					if (!l && !s) {
						var t;
						m.framework = g, m.template = p, m.bg = g.getChildByClass(p, "pswp__bg"), O = p.className, l = !0, P = g.detectFeatures(), D = P.raf, A = P.caf, R = P.transform, $ = P.oldIE, m.scrollWrap = g.getChildByClass(p, "pswp__scroll-wrap"), m.container = g.getChildByClass(m.scrollWrap, "pswp__container"), r = m.container.style, m.itemHolders = C = [{
								el: m.container.children[0],
								wrap: 0,
								index: -1
							}, {
								el: m.container.children[1],
								wrap: 0,
								index: -1
							}, {
								el: m.container.children[2],
								wrap: 0,
								index: -1
							}], C[0].el.style.display = C[2].el.style.display = "none",
							function() {
								if (R) {
									var t = P.perspective && !j;
									return w = "translate" + (t ? "3d(" : "("), _ = P.perspective ? ", 0px)" : ")"
								}
								R = "left", g.addClass(p, "pswp--ie"), jt = function(t, e) {
									e.left = t + "px"
								}, zt = function(t) {
									var e = 1 < t.fitRatio ? 1 : t.fitRatio,
										i = t.container.style,
										n = e * t.w,
										s = e * t.h;
									i.width = n + "px", i.height = s + "px", i.left = t.initialPosition.x + "px", i.top = t.initialPosition.y + "px"
								}, Rt = function() {
									if (et) {
										var t = et,
											e = m.currItem,
											i = 1 < e.fitRatio ? 1 : e.fitRatio,
											n = i * e.w,
											s = i * e.h;
										t.width = n + "px", t.height = s + "px", t.left = ut.x + "px", t.top = ut.y + "px"
									}
								}
							}(), u = {
								resize: m.updateSize,
								orientationchange: function() {
									clearTimeout(L), L = setTimeout(function() {
										dt.x !== m.scrollWrap.clientWidth && m.updateSize()
									}, 500)
								},
								scroll: Bt,
								keydown: Wt,
								click: Zt
							};
						var e = P.isOldIOSPhone || P.isOldAndroid || P.isMobileOpera;
						for (P.animationName && P.transform && !e || (f.showAnimationDuration = f.hideAnimationDuration = 0), t = 0; t < yt.length; t++) m["init" + yt[t]]();
						n && (m.ui = new n(m, g)).init(), St("firstUpdate"), v = v || f.index || 0, (isNaN(v) || v < 0 || v >= Ne()) && (v = 0), m.currItem = He(v), (P.isOldIOSPhone || P.isOldAndroid) && (vt = !1), p.setAttribute("aria-hidden", "false"), f.modal && (vt ? p.style.position = "fixed" : (p.style.position = "absolute", p.style.top = g.getScrollY() + "px")), void 0 === F && (St("initialLayout"), F = M = g.getScrollY());
						var i = "pswp--open ";
						for (f.mainClass && (i += f.mainClass + " "), f.showHideOpacity && (i += "pswp--animate_opacity "), i += j ? "pswp--touch" : "pswp--notouch", i += P.animationName ? " pswp--css_animation" : "", i += P.svg ? " pswp--svg" : "", g.addClass(p, i), m.updateSize(), a = -1, ft = null, t = 0; t < 3; t++) jt((t + a) * mt.x, C[t].el.style);
						$ || g.bind(m.scrollWrap, c, m), Tt("initialZoomInEnd", function() {
							m.setContent(C[0], v - 1), m.setContent(C[2], v + 1), C[0].el.style.display = C[2].el.style.display = "block", f.focus && p.focus(), g.bind(document, "keydown", m), P.transform && g.bind(m.scrollWrap, "click", m), f.mouseUsed || g.bind(document, "mousemove", Ft), g.bind(window, "resize scroll orientationchange", m), St("bindEvents")
						}), m.setContent(C[1], v), m.updateCurrItem(), St("afterInit"), vt || (x = setInterval(function() {
							Kt || K || X || y !== m.currItem.initialZoomLevel || m.updateSize()
						}, 1e3)), g.addClass(p, "pswp--visible")
					}
				},
				close: function() {
					l && (s = !(l = !1), St("close"), g.unbind(window, "resize scroll orientationchange", m), g.unbind(window, "scroll", u.scroll), g.unbind(document, "keydown", m), g.unbind(document, "mousemove", Ft), P.transform && g.unbind(m.scrollWrap, "click", m), K && g.unbind(window, h, m), clearTimeout(L), St("unbindEvents"), We(m.currItem, null, !0, m.destroy))
				},
				destroy: function() {
					St("destroy"), $e && clearTimeout($e), p.setAttribute("aria-hidden", "true"), p.className = O, x && clearInterval(x), g.unbind(m.scrollWrap, c, m), g.unbind(window, "scroll", m), ge(), qt(), Ct = null
				},
				panTo: function(t, e, i) {
					i || (t > tt.min.x ? t = tt.min.x : t < tt.max.x && (t = tt.max.x), e > tt.min.y ? e = tt.min.y : e < tt.max.y && (e = tt.max.y)), ut.x = t, ut.y = e, Rt()
				},
				handleEvent: function(t) {
					t = t || window.event, u[t.type] && u[t.type](t)
				},
				goTo: function(t) {
					var e = (t = bt(t)) - v;
					ft = e, v = t, m.currItem = He(v), pt -= e, Dt(mt.x * pt), qt(), it = !1, m.updateCurrItem()
				},
				next: function() {
					m.goTo(v + 1)
				},
				prev: function() {
					m.goTo(v - 1)
				},
				updateCurrZoomItem: function(t) {
					if (t && St("beforeChange", 0), C[1].el.children.length) {
						var e = C[1].el.children[0];
						et = g.hasClass(e, "pswp__zoom-wrap") ? e.style : null
					} else et = null;
					tt = m.currItem.bounds, d = y = m.currItem.initialZoomLevel, ut.x = tt.center.x, ut.y = tt.center.y, t && St("afterChange")
				},
				invalidateCurrItems: function() {
					b = !0;
					for (var t = 0; t < 3; t++) C[t].item && (C[t].item.needsUpdate = !0)
				},
				updateCurrItem: function(t) {
					if (0 !== ft) {
						var e, i = Math.abs(ft);
						if (!(t && i < 2)) {
							m.currItem = He(v), _t = !1, St("beforeChange", ft), 3 <= i && (a += ft + (0 < ft ? -3 : 3), i = 3);
							for (var n = 0; n < i; n++) 0 < ft ? (e = C.shift(), C[2] = e, jt((++a + 2) * mt.x, e.el.style), m.setContent(e, v - i + n + 1 + 1)) : (e = C.pop(), C.unshift(e), jt(--a * mt.x, e.el.style), m.setContent(e, v + i - n - 1 - 1));
							if (et && 1 === Math.abs(ft)) {
								var s = He(T);
								s.initialZoomLevel !== y && (Ke(s, dt), Ye(s), zt(s))
							}
							ft = 0, m.updateCurrZoomItem(), T = v, St("afterChange")
						}
					}
				},
				updateSize: function(t) {
					if (!vt && f.modal) {
						var e = g.getScrollY();
						if (F !== e && (p.style.top = e + "px", F = e), !t && wt.x === window.innerWidth && wt.y === window.innerHeight) return;
						wt.x = window.innerWidth, wt.y = window.innerHeight, p.style.height = wt.y + "px"
					}
					if (dt.x = m.scrollWrap.clientWidth, dt.y = m.scrollWrap.clientHeight, Bt(), mt.x = dt.x + Math.round(dt.x * f.spacing), mt.y = dt.y, Dt(mt.x * pt), St("beforeResize"), void 0 !== a) {
						for (var i, n, s, o = 0; o < 3; o++) i = C[o], jt((o + a) * mt.x, i.el.style), s = v + o - 1, f.loop && 2 < Ne() && (s = bt(s)), (n = He(s)) && (b || n.needsUpdate || !n.bounds) ? (m.cleanSlide(n), m.setContent(i, s), 1 === o && (m.currItem = n, m.updateCurrZoomItem(!0)), n.needsUpdate = !1) : -1 === i.index && 0 <= s && m.setContent(i, s), n && n.container && (Ke(n, dt), Ye(n), zt(n));
						b = !1
					}
					d = y = m.currItem.initialZoomLevel, (tt = m.currItem.bounds) && (ut.x = tt.center.x, ut.y = tt.center.y, Rt(!0)), St("resize")
				},
				zoomTo: function(e, t, i, n, s) {
					t && (d = y, ue.x = Math.abs(t.x) - ut.x, ue.y = Math.abs(t.y) - ut.y, Ot(ct, ut));
					var o = Pt(e, !1),
						r = {};
					Nt("x", o, r, e), Nt("y", o, r, e);
					var a = y,
						l = ut.x,
						h = ut.y;
					Mt(r);
					var c = function(t) {
						1 === t ? (y = e, ut.x = r.x, ut.y = r.y) : (y = (e - a) * t + a, ut.x = (r.x - l) * t + l, ut.y = (r.y - h) * t + h), s && s(t), Rt(1 === t)
					};
					i ? Yt("customZoomTo", 0, 1, i, n || g.easing.sine.inOut, c) : c(1)
				}
			},
			Xt = {},
			Jt = {},
			te = {},
			ee = {},
			ie = {},
			ne = [],
			se = {},
			oe = [],
			re = {},
			ae = 0,
			le = {
				x: 0,
				y: 0
			},
			he = 0,
			ce = {
				x: 0,
				y: 0
			},
			ue = {
				x: 0,
				y: 0
			},
			de = {
				x: 0,
				y: 0
			},
			pe = function(t, e) {
				return re.x = Math.abs(t.x - e.x), re.y = Math.abs(t.y - e.y), Math.sqrt(re.x * re.x + re.y * re.y)
			},
			ge = function() {
				i && (A(i), i = null)
			},
			me = function() {
				K && (i = D(me), Re())
			},
			fe = function(t, e) {
				return !(!t || t === document) && !(t.getAttribute("class") && -1 < t.getAttribute("class").indexOf("pswp__scroll-wrap")) && (e(t) ? t : fe(t.parentNode, e))
			},
			ve = {},
			ye = function(t, e) {
				return ve.prevent = !fe(t.target, f.isClickableElement), St("preventDragEvent", t, e, ve), ve.prevent
			},
			we = function(t, e) {
				return e.x = t.pageX, e.y = t.pageY, e.id = t.identifier, e
			},
			_e = function(t, e, i) {
				i.x = .5 * (t.x + e.x), i.y = .5 * (t.y + e.y)
			},
			xe = function() {
				var t = ut.y - m.currItem.initialPosition.y;
				return 1 - Math.abs(t / (dt.y / 2))
			},
			be = {},
			Ce = {},
			Te = [],
			Se = function(t) {
				for (; 0 < Te.length;) Te.pop();
				return z ? (lt = 0, ne.forEach(function(t) {
					0 === lt ? Te[0] = t : 1 === lt && (Te[1] = t), lt++
				})) : -1 < t.type.indexOf("touch") ? t.touches && 0 < t.touches.length && (Te[0] = we(t.touches[0], be), 1 < t.touches.length && (Te[1] = we(t.touches[1], Ce))) : (be.x = t.pageX, be.y = t.pageY, be.id = "", Te[0] = be), Te
			},
			Ie = function(t, e) {
				var i, n, s, o, r = ut[t] + e[t],
					a = 0 < e[t],
					l = ce.x + e.x,
					h = ce.x - se.x;
				if (i = r > tt.min[t] || r < tt.max[t] ? f.panEndFriction : 1, r = ut[t] + e[t] * i, (f.allowPanToNext || y === m.currItem.initialZoomLevel) && (et ? "h" !== nt || "x" !== t || V || (a ? (r > tt.min[t] && (i = f.panEndFriction, tt.min[t], n = tt.min[t] - ct[t]), (n <= 0 || h < 0) && 1 < Ne() ? (o = l, h < 0 && l > se.x && (o = se.x)) : tt.min.x !== tt.max.x && (s = r)) : (r < tt.max[t] && (i = f.panEndFriction, tt.max[t], n = ct[t] - tt.max[t]), (n <= 0 || 0 < h) && 1 < Ne() ? (o = l, 0 < h && l < se.x && (o = se.x)) : tt.min.x !== tt.max.x && (s = r))) : o = l, "x" === t)) return void 0 !== o && (Dt(o, !0), Y = o !== se.x), tt.min.x !== tt.max.x && (void 0 !== s ? ut.x = s : Y || (ut.x += e.x * i)), void 0 !== o;
				it || Y || y > m.currItem.fitRatio && (ut[t] += e[t] * i)
			},
			Ee = function(t) {
				if (!("mousedown" === t.type && 0 < t.button))
					if (Le) t.preventDefault();
					else if (!U || "mousedown" !== t.type) {
					if (ye(t, !0) && t.preventDefault(), St("pointerDown"), z) {
						var e = g.arraySearch(ne, t.pointerId, "id");
						e < 0 && (e = ne.length), ne[e] = {
							x: t.pageX,
							y: t.pageY,
							id: t.pointerId
						}
					}
					var i = Se(t),
						n = i.length;
					Q = null, qt(), K && 1 !== n || (K = st = !0, g.bind(window, h, m), Z = at = ot = B = Y = q = G = V = !1, nt = null, St("firstTouchStart", i), Ot(ct, ut), ht.x = ht.y = 0, Ot(ee, i[0]), Ot(ie, ee), se.x = mt.x * pt, oe = [{
						x: ee.x,
						y: ee.y
					}], N = H = It(), Pt(y, !0), ge(), me()), !X && 1 < n && !it && !Y && (d = y, X = G = !(V = !1), ht.y = ht.x = 0, Ot(ct, ut), Ot(Xt, i[0]), Ot(Jt, i[1]), _e(Xt, Jt, de), ue.x = Math.abs(de.x) - ut.x, ue.y = Math.abs(de.y) - ut.y, J = pe(Xt, Jt))
				}
			},
			ke = function(t) {
				if (t.preventDefault(), z) {
					var e = g.arraySearch(ne, t.pointerId, "id");
					if (-1 < e) {
						var i = ne[e];
						i.x = t.pageX, i.y = t.pageY
					}
				}
				if (K) {
					var n = Se(t);
					if (nt || q || X) Q = n;
					else if (ce.x !== mt.x * pt) nt = "h";
					else {
						var s = Math.abs(n[0].x - ee.x) - Math.abs(n[0].y - ee.y);
						10 <= Math.abs(s) && (nt = 0 < s ? "h" : "v", Q = n)
					}
				}
			},
			Re = function() {
				if (Q) {
					var t = Q.length;
					if (0 !== t)
						if (Ot(Xt, Q[0]), te.x = Xt.x - ee.x, te.y = Xt.y - ee.y, X && 1 < t) {
							if (ee.x = Xt.x, ee.y = Xt.y, !te.x && !te.y && function(t, e) {
									return t.x === e.x && t.y === e.y
								}(Q[1], Jt)) return;
							Ot(Jt, Q[1]), V || (V = !0, St("zoomGestureStarted"));
							var e = pe(Xt, Jt),
								i = Oe(e);
							i > m.currItem.initialZoomLevel + m.currItem.initialZoomLevel / 15 && (at = !0);
							var n = 1,
								s = Lt(),
								o = Ht();
							if (i < s)
								if (f.pinchToClose && !at && d <= m.currItem.initialZoomLevel) {
									var r = 1 - (s - i) / (s / 1.2);
									Et(r), St("onPinchClose", r), ot = !0
								} else 1 < (n = (s - i) / s) && (n = 1), i = s - n * (s / 3);
							else o < i && (1 < (n = (i - o) / (6 * s)) && (n = 1), i = o + n * s);
							n < 0 && (n = 0), _e(Xt, Jt, le), ht.x += le.x - de.x, ht.y += le.y - de.y, Ot(de, le), ut.x = At("x", i), ut.y = At("y", i), Z = y < i, y = i, Rt()
						} else {
							if (!nt) return;
							if (st && (st = !1, 10 <= Math.abs(te.x) && (te.x -= Q[0].x - ie.x), 10 <= Math.abs(te.y) && (te.y -= Q[0].y - ie.y)), ee.x = Xt.x, ee.y = Xt.y, 0 === te.x && 0 === te.y) return;
							if ("v" === nt && f.closeOnVerticalDrag && "fit" === f.scaleMode && y === m.currItem.initialZoomLevel) {
								ht.y += te.y, ut.y += te.y;
								var a = xe();
								return B = !0, St("onVerticalDrag", a), Et(a), void Rt()
							}! function(t, e, i) {
								if (50 < t - N) {
									var n = 2 < oe.length ? oe.shift() : {};
									n.x = e, n.y = i, oe.push(n), N = t
								}
							}(It(), Xt.x, Xt.y), q = !0, tt = m.currItem.bounds, Ie("x", te) || (Ie("y", te), Mt(ut), Rt())
						}
				}
			},
			ze = function(t) {
				if (P.isOldAndroid) {
					if (U && "mouseup" === t.type) return; - 1 < t.type.indexOf("touch") && (clearTimeout(U), U = setTimeout(function() {
						U = 0
					}, 600))
				}
				var e;
				if (St("pointerUp"), ye(t, !1) && t.preventDefault(), z) {
					var i = g.arraySearch(ne, t.pointerId, "id"); - 1 < i && (e = ne.splice(i, 1)[0], navigator.pointerEnabled ? e.type = t.pointerType || "mouse" : (e.type = {
						4: "mouse",
						2: "touch",
						3: "pen"
					} [t.pointerType], e.type || (e.type = t.pointerType || "mouse")))
				}
				var n, s = Se(t),
					o = s.length;
				if ("mouseup" === t.type && (o = 0), 2 === o) return !(Q = null);
				1 === o && Ot(ie, s[0]), 0 !== o || nt || it || (e || ("mouseup" === t.type ? e = {
					x: t.pageX,
					y: t.pageY,
					type: "mouse"
				} : t.changedTouches && t.changedTouches[0] && (e = {
					x: t.changedTouches[0].pageX,
					y: t.changedTouches[0].pageY,
					type: "touch"
				})), St("touchRelease", t, e));
				var r = -1;
				if (0 === o && (K = !1, g.unbind(window, h, m), ge(), X ? r = 0 : -1 !== he && (r = It() - he)), he = 1 === o ? It() : -1, n = -1 !== r && r < 150 ? "zoom" : "swipe", X && o < 2 && (X = !1, 1 === o && (n = "zoomPointerUp"), St("zoomGestureEnded")), Q = null, q || V || it || B)
					if (qt(), W || (W = je()), W.calculateSwipeSpeed("x"), B)
						if (xe() < f.verticalDragRange) m.close();
						else {
							var a = ut.y,
								l = rt;
							Yt("verticalDrag", 0, 1, 300, g.easing.cubic.out, function(t) {
								ut.y = (m.currItem.initialPosition.y - a) * t + a, Et((1 - l) * t + l), Rt()
							}), St("onVerticalDrag", 1)
						}
				else {
					if ((Y || it) && 0 === o) {
						if (Ae(n, W)) return;
						n = "zoomPointerUp"
					}
					it || ("swipe" === n ? !Y && y > m.currItem.fitRatio && De(W) : Me())
				}
			},
			je = function() {
				var e, i, n = {
					lastFlickOffset: {},
					lastFlickDist: {},
					lastFlickSpeed: {},
					slowDownRatio: {},
					slowDownRatioReverse: {},
					speedDecelerationRatio: {},
					speedDecelerationRatioAbs: {},
					distanceOffset: {},
					backAnimDestination: {},
					backAnimStarted: {},
					calculateSwipeSpeed: function(t) {
						i = 1 < oe.length ? (e = It() - N + 50, oe[oe.length - 2][t]) : (e = It() - H, ie[t]), n.lastFlickOffset[t] = ee[t] - i, n.lastFlickDist[t] = Math.abs(n.lastFlickOffset[t]), 20 < n.lastFlickDist[t] ? n.lastFlickSpeed[t] = n.lastFlickOffset[t] / e : n.lastFlickSpeed[t] = 0, Math.abs(n.lastFlickSpeed[t]) < .1 && (n.lastFlickSpeed[t] = 0), n.slowDownRatio[t] = .95, n.slowDownRatioReverse[t] = 1 - n.slowDownRatio[t], n.speedDecelerationRatio[t] = 1
					},
					calculateOverBoundsAnimOffset: function(e, t) {
						n.backAnimStarted[e] || (ut[e] > tt.min[e] ? n.backAnimDestination[e] = tt.min[e] : ut[e] < tt.max[e] && (n.backAnimDestination[e] = tt.max[e]), void 0 !== n.backAnimDestination[e] && (n.slowDownRatio[e] = .7, n.slowDownRatioReverse[e] = 1 - n.slowDownRatio[e], n.speedDecelerationRatioAbs[e] < .05 && (n.lastFlickSpeed[e] = 0, n.backAnimStarted[e] = !0, Yt("bounceZoomPan" + e, ut[e], n.backAnimDestination[e], t || 300, g.easing.sine.out, function(t) {
							ut[e] = t, Rt()
						}))))
					},
					calculateAnimOffset: function(t) {
						n.backAnimStarted[t] || (n.speedDecelerationRatio[t] = n.speedDecelerationRatio[t] * (n.slowDownRatio[t] + n.slowDownRatioReverse[t] - n.slowDownRatioReverse[t] * n.timeDiff / 10), n.speedDecelerationRatioAbs[t] = Math.abs(n.lastFlickSpeed[t] * n.speedDecelerationRatio[t]), n.distanceOffset[t] = n.lastFlickSpeed[t] * n.speedDecelerationRatio[t] * n.timeDiff, ut[t] += n.distanceOffset[t])
					},
					panAnimLoop: function() {
						if (Ut.zoomPan && (Ut.zoomPan.raf = D(n.panAnimLoop), n.now = It(), n.timeDiff = n.now - n.lastNow, n.lastNow = n.now, n.calculateAnimOffset("x"), n.calculateAnimOffset("y"), Rt(), n.calculateOverBoundsAnimOffset("x"), n.calculateOverBoundsAnimOffset("y"), n.speedDecelerationRatioAbs.x < .05 && n.speedDecelerationRatioAbs.y < .05)) return ut.x = Math.round(ut.x), ut.y = Math.round(ut.y), Rt(), void Gt("zoomPan")
					}
				};
				return n
			},
			De = function(t) {
				if (t.calculateSwipeSpeed("y"), tt = m.currItem.bounds, t.backAnimDestination = {}, t.backAnimStarted = {}, Math.abs(t.lastFlickSpeed.x) <= .05 && Math.abs(t.lastFlickSpeed.y) <= .05) return t.speedDecelerationRatioAbs.x = t.speedDecelerationRatioAbs.y = 0, t.calculateOverBoundsAnimOffset("x"), t.calculateOverBoundsAnimOffset("y"), !0;
				Vt("zoomPan"), t.lastNow = It(), t.panAnimLoop()
			},
			Ae = function(t, e) {
				var i, n, s;
				if (it || (ae = v), "swipe" === t) {
					var o = ee.x - ie.x,
						r = e.lastFlickDist.x < 10;
					30 < o && (r || 20 < e.lastFlickOffset.x) ? n = -1 : o < -30 && (r || e.lastFlickOffset.x < -20) && (n = 1)
				}
				n && ((v += n) < 0 ? (v = f.loop ? Ne() - 1 : 0, s = !0) : v >= Ne() && (v = f.loop ? 0 : Ne() - 1, s = !0), s && !f.loop || (ft += n, pt -= n, i = !0));
				var a, l = mt.x * pt,
					h = Math.abs(l - ce.x);
				return a = i || l > ce.x == 0 < e.lastFlickSpeed.x ? (a = 0 < Math.abs(e.lastFlickSpeed.x) ? h / Math.abs(e.lastFlickSpeed.x) : 333, a = Math.min(a, 400), Math.max(a, 250)) : 333, ae === v && (i = !1), it = !0, St("mainScrollAnimStart"), Yt("mainScroll", ce.x, l, a, g.easing.cubic.out, Dt, function() {
					qt(), it = !1, ae = -1, (i || ae !== v) && m.updateCurrItem(), St("mainScrollAnimComplete")
				}), i && m.updateCurrItem(!0), i
			},
			Oe = function(t) {
				return 1 / J * t * d
			},
			Me = function() {
				var t = y,
					e = Lt(),
					i = Ht();
				y < e ? t = e : i < y && (t = i);
				var n, s = rt;
				return ot && !Z && !at && y < e ? m.close() : (ot && (n = function(t) {
					Et((1 - s) * t + s)
				}), m.zoomTo(t, 0, 200, g.easing.cubic.out, n)), !0
			};
		xt("Gestures", {
			publicMethods: {
				initGestures: function() {
					var t = function(t, e, i, n, s) {
						S = t + e, I = t + i, E = t + n, k = s ? t + s : ""
					};
					(z = P.pointerEvent) && P.touch && (P.touch = !1), z ? navigator.pointerEnabled ? t("pointer", "down", "move", "up", "cancel") : t("MSPointer", "Down", "Move", "Up", "Cancel") : P.touch ? (t("touch", "start", "move", "end", "cancel"), j = !0) : t("mouse", "down", "move", "up"), h = I + " " + E + " " + k, c = S, z && !j && (j = 1 < navigator.maxTouchPoints || 1 < navigator.msMaxTouchPoints), m.likelyTouchDevice = j, u[S] = Ee, u[I] = ke, u[E] = ze, k && (u[k] = u[E]), P.touch && (c += " mousedown", h += " mousemove mouseup", u.mousedown = u[S], u.mousemove = u[I], u.mouseup = u[E]), j || (f.allowPanToNext = !1)
				}
			}
		});
		var $e, Fe, Pe, Le, He, Ne, We = function(r, t, a, e) {
				var l;
				$e && clearTimeout($e), Pe = Le = !0, r.initialLayout ? (l = r.initialLayout, r.initialLayout = null) : l = f.getThumbBoundsFn && f.getThumbBoundsFn(v);
				var h, c, u = a ? f.hideAnimationDuration : f.showAnimationDuration,
					d = function() {
						Gt("initialZoom"), a ? (m.template.removeAttribute("style"), m.bg.removeAttribute("style")) : (Et(1), t && (t.style.display = "block"), g.addClass(p, "pswp--animated-in"), St("initialZoom" + (a ? "OutEnd" : "InEnd"))), e && e(), Le = !1
					};
				if (!u || !l || void 0 === l.x) return St("initialZoom" + (a ? "Out" : "In")), y = r.initialZoomLevel, Ot(ut, r.initialPosition), Rt(), p.style.opacity = a ? 0 : 1, Et(1), void(u ? setTimeout(function() {
					d()
				}, u) : d());
				h = o, c = !m.currItem.src || m.currItem.loadError || f.showHideOpacity, r.miniImg && (r.miniImg.style.webkitBackfaceVisibility = "hidden"), a || (y = l.w / r.w, ut.x = l.x, ut.y = l.y - M, m[c ? "template" : "bg"].style.opacity = .001, Rt()), Vt("initialZoom"), a && !h && g.removeClass(p, "pswp--animated-in"), c && (a ? g[(h ? "remove" : "add") + "Class"](p, "pswp--animate_opacity") : setTimeout(function() {
					g.addClass(p, "pswp--animate_opacity")
				}, 30)), $e = setTimeout(function() {
					if (St("initialZoom" + (a ? "Out" : "In")), a) {
						var e = l.w / r.w,
							i = ut.x,
							n = ut.y,
							s = y,
							o = rt,
							t = function(t) {
								1 === t ? (y = e, ut.x = l.x, ut.y = l.y - F) : (y = (e - s) * t + s, ut.x = (l.x - i) * t + i, ut.y = (l.y - F - n) * t + n), Rt(), c ? p.style.opacity = 1 - t : Et(o - t * o)
							};
						h ? Yt("initialZoom", 0, 1, u, g.easing.cubic.out, t, d) : (t(1), $e = setTimeout(d, u + 20))
					} else y = r.initialZoomLevel, Ot(ut, r.initialPosition), Rt(), Et(1), c ? p.style.opacity = 1 : Et(1), $e = setTimeout(d, u + 20)
				}, a ? 25 : 90)
			},
			Ze = {},
			Be = [],
			Ue = {
				index: 0,
				errorMsg: '<div class="pswp__error-msg"><a href="%url%" target="_blank">The image</a> could not be loaded.</div>',
				forceProgressiveLoading: !1,
				preload: [1, 1],
				getNumItemsFn: function() {
					return Fe.length
				}
			},
			Ke = function(t, e, i) {
				if (!t.src || t.loadError) return t.w = t.h = 0, t.initialZoomLevel = t.fitRatio = 1, t.bounds = {
					center: {
						x: 0,
						y: 0
					},
					max: {
						x: 0,
						y: 0
					},
					min: {
						x: 0,
						y: 0
					}
				}, t.initialPosition = t.bounds.center, t.bounds;
				var n = !i;
				if (n && (t.vGap || (t.vGap = {
						top: 0,
						bottom: 0
					}), St("parseVerticalMargin", t)), Ze.x = e.x, Ze.y = e.y - t.vGap.top - t.vGap.bottom, n) {
					var s = Ze.x / t.w,
						o = Ze.y / t.h;
					t.fitRatio = s < o ? s : o;
					var r = f.scaleMode;
					"orig" === r ? i = 1 : "fit" === r && (i = t.fitRatio), 1 < i && (i = 1), t.initialZoomLevel = i, t.bounds || (t.bounds = {
						center: {
							x: 0,
							y: 0
						},
						max: {
							x: 0,
							y: 0
						},
						min: {
							x: 0,
							y: 0
						}
					})
				}
				return i ? (function(t, e, i) {
					var n = t.bounds;
					n.center.x = Math.round((Ze.x - e) / 2), n.center.y = Math.round((Ze.y - i) / 2) + t.vGap.top, n.max.x = e > Ze.x ? Math.round(Ze.x - e) : n.center.x, n.max.y = i > Ze.y ? Math.round(Ze.y - i) + t.vGap.top : n.center.y, n.min.x = e > Ze.x ? 0 : n.center.x, n.min.y = i > Ze.y ? t.vGap.top : n.center.y
				}(t, t.w * i, t.h * i), n && i === t.initialZoomLevel && (t.initialPosition = t.bounds.center), t.bounds) : void 0
			},
			Ge = function(t, e, i, n, s, o) {
				e.loadError || n && (e.imageAppended = !0, Ye(e, n, e === m.currItem && _t), i.appendChild(n), o && setTimeout(function() {
					e && e.loaded && e.placeholder && (e.placeholder.style.display = "none", e.placeholder = null)
				}, 500))
			},
			Ve = function(t) {
				t.loading = !0, t.loaded = !1;
				var e = t.img = g.createEl("pswp__img", "img"),
					i = function() {
						t.loading = !1, t.loaded = !0, t.loadComplete ? t.loadComplete(t) : t.img = null, e.onload = e.onerror = null, e = null
					};
				return e.onload = i, e.onerror = function() {
					t.loadError = !0, i()
				}, e.src = t.src, e
			},
			qe = function(t, e) {
				if (t.src && t.loadError && t.container) return e && (t.container.innerHTML = ""), t.container.innerHTML = f.errorMsg.replace("%url%", t.src), !0
			},
			Ye = function(t, e, i) {
				if (t.src) {
					e || (e = t.container.lastChild);
					var n = i ? t.w : Math.round(t.w * t.fitRatio),
						s = i ? t.h : Math.round(t.h * t.fitRatio);
					t.placeholder && !t.loaded && (t.placeholder.style.width = n + "px", t.placeholder.style.height = s + "px"), e.style.width = n + "px", e.style.height = s + "px"
				}
			},
			Qe = function() {
				if (Be.length) {
					for (var t, e = 0; e < Be.length; e++)(t = Be[e]).holder.index === t.index && Ge(t.index, t.item, t.baseDiv, t.img, 0, t.clearPlaceholder);
					Be = []
				}
			};
		xt("Controller", {
			publicMethods: {
				lazyLoadItem: function(t) {
					t = bt(t);
					var e = He(t);
					e && (!e.loaded && !e.loading || b) && (St("gettingData", t, e), e.src && Ve(e))
				},
				initController: function() {
					g.extend(f, Ue, !0), m.items = Fe = t, He = m.getItemAt, Ne = f.getNumItemsFn, f.loop, Ne() < 3 && (f.loop = !1), Tt("beforeChange", function(t) {
						var e, i = f.preload,
							n = null === t || 0 <= t,
							s = Math.min(i[0], Ne()),
							o = Math.min(i[1], Ne());
						for (e = 1; e <= (n ? o : s); e++) m.lazyLoadItem(v + e);
						for (e = 1; e <= (n ? s : o); e++) m.lazyLoadItem(v - e)
					}), Tt("initialLayout", function() {
						m.currItem.initialLayout = f.getThumbBoundsFn && f.getThumbBoundsFn(v)
					}), Tt("mainScrollAnimComplete", Qe), Tt("initialZoomInEnd", Qe), Tt("destroy", function() {
						for (var t, e = 0; e < Fe.length; e++)(t = Fe[e]).container && (t.container = null), t.placeholder && (t.placeholder = null), t.img && (t.img = null), t.preloader && (t.preloader = null), t.loadError && (t.loaded = t.loadError = !1);
						Be = null
					})
				},
				getItemAt: function(t) {
					return 0 <= t && void 0 !== Fe[t] && Fe[t]
				},
				allowProgressiveImg: function() {
					return f.forceProgressiveLoading || !j || f.mouseUsed || 1200 < screen.width
				},
				setContent: function(e, i) {
					f.loop && (i = bt(i));
					var t = m.getItemAt(e.index);
					t && (t.container = null);
					var n, s = m.getItemAt(i);
					if (St("gettingData", i, s), s) {
						e.index = i;
						var o = (e.item = s).container = g.createEl("pswp__zoom-wrap");
						if (!s.src && s.html && (s.html.tagName ? o.appendChild(s.html) : o.innerHTML = s.html), qe(s), Ke(s, dt), !s.src || s.loadError || s.loaded) s.src && !s.loadError && ((n = g.createEl("pswp__img", "img")).style.opacity = 1, n.src = s.src, Ye(s, n), Ge(0, s, o, n));
						else {
							if (s.loadComplete = function(t) {
									if (l) {
										if (e && e.index === i) {
											if (qe(t, !0)) return t.loadComplete = t.img = null, Ke(t, dt), zt(t), void(e.index === v && m.updateCurrZoomItem());
											t.imageAppended ? !Le && t.placeholder && (t.placeholder.style.display = "none", t.placeholder = null) : P.transform && (it || Le) ? Be.push({
												item: t,
												baseDiv: o,
												img: t.img,
												index: i,
												holder: e,
												clearPlaceholder: !0
											}) : Ge(0, t, o, t.img, 0, !0)
										}
										t.loadComplete = null, t.img = null, St("imageLoadComplete", i, t)
									}
								}, g.features.transform) {
								var r = "pswp__img pswp__img--placeholder";
								r += s.msrc ? "" : " pswp__img--placeholder--blank";
								var a = g.createEl(r, s.msrc ? "img" : "");
								s.msrc && (a.src = s.msrc), Ye(s, a), o.appendChild(a), s.placeholder = a
							}
							s.loading || Ve(s), m.allowProgressiveImg() && (!Pe && P.transform ? Be.push({
								item: s,
								baseDiv: o,
								img: s.img,
								index: i,
								holder: e
							}) : Ge(0, s, o, s.img, 0, !0))
						}
						Pe || i !== v ? zt(s) : (et = o.style, We(s, n || s.img)), e.el.innerHTML = "", e.el.appendChild(o)
					} else e.el.innerHTML = ""
				},
				cleanSlide: function(t) {
					t.img && (t.img.onload = t.img.onerror = null), t.loaded = t.loading = t.img = t.imageAppended = !1
				}
			}
		});
		var Xe, Je, ti = {},
			ei = function(t, e, i) {
				var n = document.createEvent("CustomEvent"),
					s = {
						origEvent: t,
						target: t.target,
						releasePoint: e,
						pointerType: i || "touch"
					};
				n.initCustomEvent("pswpTap", !0, !0, s), t.target.dispatchEvent(n)
			};
		xt("Tap", {
			publicMethods: {
				initTap: function() {
					Tt("firstTouchStart", m.onTapStart), Tt("touchRelease", m.onTapRelease), Tt("destroy", function() {
						ti = {}, Xe = null
					})
				},
				onTapStart: function(t) {
					1 < t.length && (clearTimeout(Xe), Xe = null)
				},
				onTapRelease: function(t, e) {
					if (e && !q && !G && !Kt) {
						var i = e;
						if (Xe && (clearTimeout(Xe), Xe = null, function(t, e) {
								return Math.abs(t.x - e.x) < 25 && Math.abs(t.y - e.y) < 25
							}(i, ti))) return void St("doubleTap", i);
						if ("mouse" === e.type) return void ei(t, e, "mouse");
						if ("BUTTON" === t.target.tagName.toUpperCase() || g.hasClass(t.target, "pswp__single-tap")) return void ei(t, e);
						Ot(ti, i), Xe = setTimeout(function() {
							ei(t, e), Xe = null
						}, 300)
					}
				}
			}
		}), xt("DesktopZoom", {
			publicMethods: {
				initDesktopZoom: function() {
					$ || (j ? Tt("mouseUsed", function() {
						m.setupDesktopZoom()
					}) : m.setupDesktopZoom(!0))
				},
				setupDesktopZoom: function(t) {
					Je = {};
					var e = "wheel mousewheel DOMMouseScroll";
					Tt("bindEvents", function() {
						g.bind(p, e, m.handleMouseWheel)
					}), Tt("unbindEvents", function() {
						Je && g.unbind(p, e, m.handleMouseWheel)
					}), m.mouseZoomedIn = !1;
					var i, n = function() {
							m.mouseZoomedIn && (g.removeClass(p, "pswp--zoomed-in"), m.mouseZoomedIn = !1), y < 1 ? g.addClass(p, "pswp--zoom-allowed") : g.removeClass(p, "pswp--zoom-allowed"), s()
						},
						s = function() {
							i && (g.removeClass(p, "pswp--dragging"), i = !1)
						};
					Tt("resize", n), Tt("afterChange", n), Tt("pointerDown", function() {
						m.mouseZoomedIn && (i = !0, g.addClass(p, "pswp--dragging"))
					}), Tt("pointerUp", s), t || n()
				},
				handleMouseWheel: function(t) {
					if (y <= m.currItem.fitRatio) return f.modal && (!f.closeOnScroll || Kt || K ? t.preventDefault() : R && 2 < Math.abs(t.deltaY) && (o = !0, m.close())), !0;
					if (t.stopPropagation(), Je.x = 0, "deltaX" in t) 1 === t.deltaMode ? (Je.x = 18 * t.deltaX, Je.y = 18 * t.deltaY) : (Je.x = t.deltaX, Je.y = t.deltaY);
					else if ("wheelDelta" in t) t.wheelDeltaX && (Je.x = -.16 * t.wheelDeltaX), t.wheelDeltaY ? Je.y = -.16 * t.wheelDeltaY : Je.y = -.16 * t.wheelDelta;
					else {
						if (!("detail" in t)) return;
						Je.y = t.detail
					}
					Pt(y, !0);
					var e = ut.x - Je.x,
						i = ut.y - Je.y;
					(f.modal || e <= tt.min.x && e >= tt.max.x && i <= tt.min.y && i >= tt.max.y) && t.preventDefault(), m.panTo(e, i)
				},
				toggleDesktopZoom: function(t) {
					t = t || {
						x: dt.x / 2 + gt.x,
						y: dt.y / 2 + gt.y
					};
					var e = f.getDoubleTapZoom(!0, m.currItem),
						i = y === e;
					m.mouseZoomedIn = !i, m.zoomTo(i ? m.currItem.initialZoomLevel : e, t, 333), g[(i ? "remove" : "add") + "Class"](p, "pswp--zoomed-in")
				}
			}
		});
		var ii, ni, si, oi, ri, ai, li, hi, ci, ui, di, pi, gi = {
				history: !0,
				galleryUID: 1
			},
			mi = function() {
				return di.hash.substring(1)
			},
			fi = function() {
				ii && clearTimeout(ii), si && clearTimeout(si)
			},
			vi = function() {
				var t = mi(),
					e = {};
				if (t.length < 5) return e;
				var i, n = t.split("&");
				for (i = 0; i < n.length; i++)
					if (n[i]) {
						var s = n[i].split("=");
						s.length < 2 || (e[s[0]] = s[1])
					} if (f.galleryPIDs) {
					var o = e.pid;
					for (i = e.pid = 0; i < Fe.length; i++)
						if (Fe[i].pid === o) {
							e.pid = i;
							break
						}
				} else e.pid = parseInt(e.pid, 10) - 1;
				return e.pid < 0 && (e.pid = 0), e
			},
			yi = function() {
				if (si && clearTimeout(si), Kt || K) si = setTimeout(yi, 500);
				else {
					oi ? clearTimeout(ni) : oi = !0;
					var t = v + 1,
						e = He(v);
					e.hasOwnProperty("pid") && (t = e.pid);
					var i = li + "&gid=" + f.galleryUID + "&pid=" + t;
					hi || -1 === di.hash.indexOf(i) && (ui = !0);
					var n = di.href.split("#")[0] + "#" + i;
					pi ? "#" + i !== window.location.hash && history[hi ? "replaceState" : "pushState"]("", document.title, n) : hi ? di.replace(n) : di.hash = i, hi = !0, ni = setTimeout(function() {
						oi = !1
					}, 60)
				}
			};
		xt("History", {
			publicMethods: {
				initHistory: function() {
					if (g.extend(f, gi, !0), f.history) {
						di = window.location, hi = ci = ui = !1, li = mi(), pi = "pushState" in history, -1 < li.indexOf("gid=") && (li = (li = li.split("&gid=")[0]).split("?gid=")[0]), Tt("afterChange", m.updateURL), Tt("unbindEvents", function() {
							g.unbind(window, "hashchange", m.onHashChange)
						});
						var t = function() {
							ai = !0, ci || (ui ? history.back() : li ? di.hash = li : pi ? history.pushState("", document.title, di.pathname + di.search) : di.hash = ""), fi()
						};
						Tt("unbindEvents", function() {
							o && t()
						}), Tt("destroy", function() {
							ai || t()
						}), Tt("firstUpdate", function() {
							v = vi().pid
						});
						var e = li.indexOf("pid="); - 1 < e && "&" === (li = li.substring(0, e)).slice(-1) && (li = li.slice(0, -1)), setTimeout(function() {
							l && g.bind(window, "hashchange", m.onHashChange)
						}, 40)
					}
				},
				onHashChange: function() {
					if (mi() === li) return ci = !0, void m.close();
					oi || (ri = !0, m.goTo(vi().pid), ri = !1)
				},
				updateURL: function() {
					fi(), ri || (hi ? ii = setTimeout(yi, 800) : yi())
				}
			}
		}), g.extend(m, Qt)
	}
}),
function(e) {
	"use strict";
	e(document).ready(function() {
		e("#switcher_link, .switcher_close").click(function(t) {
			t.preventDefault(), e("#switcher_wrap").toggleClass("switcher_moved")
		}), e("#switcher_wrap").hasClass("lazy_open") && setTimeout(function() {
			e("#switcher_wrap").hasClass("switcher_moved") && e("#switcher_link").click()
		}, 7e3), e("body").on("click", ".switcher_items a", function() {
			var t = e(this).attr("data-type");
			e(".pinhole-switcher-" + t).remove(), "default" != e(this).attr("data-id") && e("head").append('<link media="all" type="text/css" href="' + e(this).attr("data-url") + '" class="pinhole-switcher-' + t + '" rel="stylesheet">'), "color" == t && ("default" != e(this).attr("data-id") ? e(".pinhole-site-branding img").attr("src", "http://mekshq.com/static/pinhole/pinhole_logo_white.png") : e(".pinhole-site-branding img").attr("src", pinhole_js_settings.logo)), e(this).closest(".switcher_items").find("a").removeClass("active"), e(this).addClass("active")
		}), e("#show-rtl").change(function() {
			e(".pinhole-sidebar").hide(), e(this).is(":checked") ? e("head").append('<link media="all" type="text/css" href="' + e(this).attr("data-url") + '" id="pinhole-rtl-css-custom" rel="stylesheet">') : e("#pinhole-rtl-css-custom").remove(), setTimeout(function() {
				e(".pinhole-sidebar").show()
			}, 500)
		})
	})
}(jQuery),
function(d) {
	"use strict";
	var c = {
		settings: {
			admin_bar: {
				height: 0,
				position: ""
			},
			logo: {
				default: "",
				mobile: "",
				width: "",
				checked: !1
			},
			last_width: d(window).width()
		},
		pushes: {
			url: [],
			up: 0,
			down: 0
		},
		init: function() {
			this.admin_bar_check(), this.sidebar(), this.layouts(), this.filtering(), this.popup([{
				gallery_wrapper: ".pinhole-popup",
				images_selector: "a.item-link"
			}, {
				gallery_wrapper: ".entry-content",
				images_selector: "a.pinhole-popup-img"
			}]), this.accordion_widget(), this.responsive_videos(), this.sticky_header(), this.sticky_bottom(), this.logo_setup(), this.scroll_to_comments(), this.page_loading(), this.push_state(), this.load_more(), this.infinite_scroll(), this.disable_right_click(), this.object_fit_IE_Edge(), this.protected_gallery_style(), this.search_button(), this.align_full_fix()
		},
		resize: function() {
			d(window).width() != this.settings.last_width && (this.settings.last_width = d(window).width(), this.layouts(), this.admin_bar_check(), this.sticky_header(), this.logo_setup(), this.align_full_fix())
		},
		scroll: function() {},
		page_loading: function() {
			d("body").animate({
				opacity: 1
			}, 500)
		},
		admin_bar_check: function() {
			d("#wpadminbar").length && d("#wpadminbar").is(":visible") && (this.settings.admin_bar.height = d("#wpadminbar").height(), this.settings.admin_bar.position = d("#wpadminbar").css("position"))
		},
		sticky_header: function() {
			if (pinhole_js_settings.header_sticky) {
				var e, t = "fixed" == this.settings.admin_bar.position ? this.settings.admin_bar.height : 0;
				d(".pinhole-header-sticky").css("top", t), d(window).scroll(function() {
					var t = d(window).scrollTop();
					pinhole_js_settings.header_sticky_up ? t < e && t >= pinhole_js_settings.header_sticky_offset ? d("body").hasClass("pinhole-header-sticky-on") || d("body").addClass("pinhole-header-sticky-on") : d("body").hasClass("pinhole-header-sticky-on") && d("body").removeClass("pinhole-header-sticky-on") : t >= pinhole_js_settings.header_sticky_offset ? d("body").hasClass("pinhole-header-sticky-on") || d("body").addClass("pinhole-header-sticky-on") : d("body").hasClass("pinhole-header-sticky-on") && d("body").removeClass("pinhole-header-sticky-on"), e = t
				})
			}
		},
		logo_setup: function() {
			return !!d(".pinhole-logo").length && (this.settings.logo.checked ? (c.replace_logo(c.settings.logo.default, c.settings.logo.mobile, c.settings.logo.width), !1) : (c.settings.logo.default = pinhole_js_settings.logo, c.settings.logo.mobile = pinhole_js_settings.logo_mobile ? pinhole_js_settings.logo_mobile : pinhole_js_settings.logo, c.settings.logo.width = "auto", 1 < window.devicePixelRatio ? d(".pinhole-logo").imagesLoaded(function() {
				pinhole_js_settings.logo_retina && (c.settings.logo.width = d(".pinhole-logo").width(), c.settings.logo.default = pinhole_js_settings.logo_retina), pinhole_js_settings.logo_mobile_retina && (c.settings.logo.mobile = pinhole_js_settings.logo_mobile_retina), c.replace_logo(c.settings.logo.default, c.settings.logo.mobile, c.settings.logo.width)
			}) : c.replace_logo(c.settings.logo.default, c.settings.logo.mobile, c.settings.logo.width), d(".pinhole-logo").imagesLoaded(function() {
				d(".pinhole-logo").animate({
					opacity: 1
				}, 300)
			}), void(c.settings.logo.checked = !0)))
		},
		replace_logo: function(t, e, i) {
			d(window).width() <= 733 ? d(".pinhole-header .pinhole-logo").attr("src", e).css("width", "auto") : d(".pinhole-header .pinhole-logo").attr("src", t).css("width", i)
		},
		layouts: function() {
			var e = d(".pinhole-justify");
			e.justifiedGallery().on("jg.complete", function(t) {
				setTimeout(function() {
					e.addClass("pinhole-gallery-loaded")
				}, 500)
			}), e.imagesLoaded(function() {
				e.each(function() {
					c.do_layout(d(this), "justify")
				})
			});
			var i = d(".pinhole-masonry, .pinhole-grid");
			i.on("layoutComplete", function(t, e) {
				i.addClass("pinhole-gallery-loaded")
			}), d("body").imagesLoaded(function() {
				setTimeout(function() {
					i.each(function() {
						c.do_layout(d(this), "masonry")
					})
				}, 500)
			})
		},
		filtering: function() {
			d("body").on("click", ".section-filter li a", function(t) {
				if (t.preventDefault(), !d(this).hasClass("filter-active")) {
					var e = d(this).closest(".pinhole-section").find(".pinhole-gallery"),
						i = d(this).closest("ul"),
						n = d(this).attr("data-filter");
					i.find("li a").removeClass("filter-active"), d(this).addClass("filter-active"), 0 != n ? (e.find(".pinhole-item:not(." + n + ")").addClass("pinhole-hidden"), e.find(".pinhole-item." + n).removeClass("pinhole-hidden")) : e.find(".pinhole-item").removeClass("pinhole-hidden"), c.reload_gallery_layout(e)
				}
			})
		},
		reload_gallery_layout: function(t) {
			t.hasClass("pinhole-masonry") || t.hasClass("pinhole-grid") ? (t.removeClass("pinhole-gallery-loaded"), setTimeout(function() {
				t.masonry("destroy"), c.do_layout(t, "masonry")
			}, 200)) : t.hasClass("pinhole-justify") && c.do_layout(t, "justify")
		},
		add_to_layout: function(t, e) {
			t.hasClass("pinhole-masonry") || t.hasClass("pinhole-grid") || t.hasClass("pinhole-classic") ? (e.css("opacity", 0), t.append(e).masonry("appended", e), setTimeout(function() {
				e.animate({
					opacity: 1
				}, 300)
			}, 300)) : t.hasClass("pinhole-justify") && (e.css("opacity", 0), t.append(e), t.justifiedGallery("norewind"), setTimeout(function() {
				e.animate({
					opacity: 1
				}, 300)
			}, 300))
		},
		do_layout: function(t, e) {
			if ("masonry" == e && (d(t).hasClass("pinhole-grid") && d(t).find("img").each(function() {
					d(this).parent().css("height", d(this).parent().width())
				}), d(t).masonry({
					itemSelector: ".pinhole-item:not(.pinhole-hidden)",
					transitionDuration: 0
				})), "justify" == e) {
				var i = 0,
					n = 330,
					s = 270,
					o = 30;
				if (t.hasClass("items-below")) switch (t.find(".pinhole-info:first").children().length) {
					case 1:
						i = 32;
						break;
					case 2:
						i = 53;
						break;
					case 3:
						i = 75
				}
				t.hasClass("small") ? (n = 200, s = 140) : t.hasClass("medium") && (n = 250, s = 200), d(window).width() <= 809 && (n = 200, o = 15, s = 140), t.justifiedGallery({
					rowHeight: n,
					addHeight: i,
					minWidth: s,
					maxRowHeight: n,
					margins: o,
					captions: !1,
					refreshTime: 1e3,
					filter: ':not(".pinhole-hidden")',
					lastRow: "justify"
				})
			}
		},
		popup: function(r) {
			var a = "";
			r.forEach(function(o, t) {
				d(o.gallery_wrapper + " " + o.images_selector).length < 1 || d("body").on("click", o.gallery_wrapper + " " + o.images_selector, function(t) {
					t.preventDefault();
					var e = document.querySelectorAll(".pswp")[0],
						c = [],
						u = "";
					d.each(d(this).closest(o.gallery_wrapper).find(o.images_selector), function(t, e) {
						var i = {
								src: d(this).attr("href")
							},
							n = "";
						if (void 0 !== d(this).attr("data-meta")) {
							var s = JSON.parse(d(this).attr("data-meta"));
							d.each(s, function(t, e) {
								n += '<div class="meta-item">' + e + "</div>"
							})
						}
						i.meta = n;
						var o = "";
						if (void 0 !== d(this).attr("data-caption")) {
							s = JSON.parse(d(this).attr("data-caption"));
							d.each(s, function(t, e) {
								o += e
							})
						}
						i.caption = o;
						var r = "";
						void 0 !== d(this).attr("data-download") && (void 0 !== (s = JSON.parse(d(this).attr("data-download"))).url && void 0 !== s.name && (r += '<a href="' + s.url + '" download="' + s.name + '" class="pinhole-button pinhole-download"><i class="fa fa-download" aria-hidden="true"></i></a>'));
						i.download = r;
						var a = "";
						if (void 0 !== d(this).attr("data-filename")) {
							var l = JSON.parse(d(this).attr("data-filename"));
							l.name && (a += '<span class="meta-item">' + l.name + "</span>")
						}
						if (i.filename = a, void 0 !== d(this).attr("data-size")) {
							s = JSON.parse(d(this).attr("data-size"));
							d.each(s, function(t, e) {
								"width" == t ? i.w = e : "height" == t && (i.h = e)
							})
						}
						c.push(i);
						var h = d(this);
						h.find("img").attr("data-ind", t).removeAttr("srcset data-srcset").addClass("owl-lazy"), u += h.html()
					});
					var i = d(this).closest(o.gallery_wrapper).find(o.images_selector).index(d(this));
					if ((a = new PhotoSwipe(e, PhotoSwipeUI_Default, c, {
							history: !1,
							index: i,
							preload: [2, 2],
							captionEl: !1,
							fullscreenEl: !1,
							zoomEl: !1,
							shareEl: !1,
							closeOnScroll: !1,
							barsSize: {
								top: 40,
								bottom: 40
							}
						})).init(), pinhole_js_settings.gallery_popup_autoplay) {
						var n = !1,
							s = function() {
								n = setInterval(function() {
									a.next()
								}, 3e3)
							};
						d("body").on("mouseover", " .pswp__img", function() {
							clearInterval(n)
						}), d("body").on("mouseleave", " .pswp__img", function() {
							s()
						}), d("body").on("click", " .pswp__button", function() {
							clearInterval(n), s()
						})
					}
					1 < d(r[0].gallery_wrapper + " " + r[0].images_selector).length && 1 < d(r[1].gallery_wrapper + " " + r[1].images_selector).length && (d(".owl-carousel").trigger("destroy.owl.carousel").removeClass("owl-carousel owl-loaded"), d(".pswp-carousel").children().remove()), d(".pswp-carousel").hasClass("owl-carousel") ? d(".owl-carousel").trigger("to.owl.carousel", [parseInt(i)]) : (d(".pswp-carousel").append(u), d(".pswp-carousel").addClass("owl-carousel").owlCarousel({
						loop: !0,
						margin: 17,
						nav: !1,
						lazyLoad: !0,
						startPosition: i,
						center: !0,
						autoWidth: !1,
						mouseDrag: !1,
						touchDrag: !1,
						stageClass: "owl-stage",
						responsive: {
							0: {
								items: 5
							},
							1050: {
								items: 7
							}
						}
					})), a.listen("beforeChange", function() {
						d(".owl-carousel").trigger("to.owl.carousel", [parseInt(this.getCurrentIndex())])
					}), a.listen("gettingData", function(t, e) {
						d(".pswp-bottom-container .pswp-caption").html(this.currItem.caption), d(".pswp-bottom-container .pswp-meta-items").html(this.currItem.meta), d(".pswp__zoom-wrap .pinhole-download").remove(), d(".pswp__item .pswp__zoom-wrap").prepend(this.currItem.download), d(".pswp__counter").wrapInner('<div class="meta-item"></div>'), d(".pswp__counter span").remove(), d(".pswp__counter").append(this.currItem.filename)
					})
				})
			}), d("body").on("click", ".pswp-bottom-container-action", function(t) {
				t.preventDefault(), d(this).parent().toggleClass("pswp-bottom-open"), d(".pswp__scroll-wrap").toggleClass("pswp-bottom-wrap-open")
			}), d("body").on("click", ".pswp-carousel img", function(t) {
				t.preventDefault();
				var e = d(this).attr("data-ind");
				a.goTo(parseInt(e))
			}), d("body").on("click", ".pswp-arrow", function(t) {
				t.preventDefault(), d(this).hasClass("pswp-arrow-left") ? a.prev() : a.next()
			})
		},
		sidebar: function() {
			var e = "pinhole-sidebar-open pinhole-lock";
			d("body").on("click", ".pinhole-action-sidebar", function() {
				var t = "fixed" == c.settings.admin_bar.position || d(window).scrollTop() < c.settings.admin_bar.height ? c.settings.admin_bar.height : 0;
				d(".pinhole-sidebar").css("top", t), d("body").addClass(e)
			}), d("body").on("click", ".pinhole-sidebar-close, .pinhole-sidebar-overlay", function() {
				d("body").removeClass(e)
			}), d(document).keyup(function(t) {
				27 == t.keyCode && d("body").hasClass(e) && d("body").removeClass(e)
			})
		},
		accordion_widget: function() {
			d(".pinhole-responsive-menu .pinhole-nav-responsive").each(function() {
				d(this).find(".menu-item-has-children > a").after('<span class="pinhole-nav-widget-acordion"><i class="fa fa-angle-down"></i></span>')
			}), d("body").on("click", ".pinhole-responsive-menu .pinhole-nav-widget-acordion", function() {
				d(this).next("ul.sub-menu:first, ul.children:first").slideToggle("fast").parent().toggleClass("active")
			})
		},
		responsive_videos: function() {
			d(".entry-content").fitVids({
				customSelector: ["iframe[src*='youtube.com/embed']", "iframe[src*='player.vimeo.com/video']", "iframe[src*='kickstarter.com/projects']", "iframe[src*='players.brightcove.net']", "iframe[src*='hulu.com/embed']", "iframe[src*='vine.co/v']", "iframe[src*='videopress.com/embed']", "iframe[src*='dailymotion.com/embed']", "iframe[src*='vid.me/e']", "iframe[src*='player.twitch.tv']", "iframe[src*='facebook.com/plugins/video.php']", "iframe[src*='gfycat.com/ifr/']", "iframe[src*='liveleak.com/ll_embed']", "iframe[src*='media.myspace.com']", "iframe[src*='archive.org/embed']", "iframe[src*='channel9.msdn.com']", "iframe[src*='content.jwplatform.com']", "iframe[src*='wistia.com']", "iframe[src*='vooplayer.com']", "iframe[src*='content.zetatv.com.uy']", "iframe[src*='embed.wirewax.com']", "iframe[src*='eventopedia.navstream.com']", "iframe[src*='cdn.playwire.com']", "iframe[src*='drive.google.com']", "iframe[src*='videos.sproutvideo.com']"].join(","),
				ignore: '[class^="wp-block"]'
			})
		},
		sticky_bottom: function() {
			d(".pinhole-sticky-bottom").length && d(window).load(function() {
				setTimeout(function() {
					var e = d("#pinhole-footer").offset().top - d(window).height() + 100;
					d(window).scroll(function() {
						var t = d(window).scrollTop();
						100 < t && t < e ? d("body").addClass("pinhole-sticky-bottom-on") : d("body").removeClass("pinhole-sticky-bottom-on")
					})
				}, 500)
			})
		},
		scroll_to_comments: function() {
			d("body").on("click", ".section-header .meta-comments a", function(t) {
				t.preventDefault();
				var e = this.hash,
					i = d(e),
					n = pinhole_js_settings.header_sticky ? 70 : 0;
				d("html, body").stop().animate({
					scrollTop: i.offset().top - n
				}, 900, "swing", function() {
					window.location.hash = e
				})
			})
		},
		push_state: function() {
			if (d(".pinhole-pagination .load-more a").length || d(".pinhole-pagination .infinite-scroll").length) {
				var t = {
					prev: window.location.href,
					next: "",
					offset: d(window).scrollTop(),
					prev_title: window.document.title,
					next_title: window.document.title
				};
				c.pushes.url.push(t), window.history.pushState(t, "", window.location.href);
				var e, i = 0;
				d(window).scroll(function() {
					c.pushes.url[c.pushes.up].offset != e && d(window).scrollTop() < c.pushes.url[c.pushes.up].offset && (e = c.pushes.url[c.pushes.up].offset, i = 0, window.document.title = c.pushes.url[c.pushes.up].prev_title, window.history.replaceState(c.pushes.url, "", c.pushes.url[c.pushes.up].prev), c.pushes.down = c.pushes.up, 0 != c.pushes.up && c.pushes.up--), c.pushes.url[c.pushes.down].offset != i && d(window).scrollTop() > c.pushes.url[c.pushes.down].offset && (i = c.pushes.url[c.pushes.down].offset, e = 0, window.document.title = c.pushes.url[c.pushes.down].next_title, window.history.replaceState(c.pushes.url, "", c.pushes.url[c.pushes.down].next), c.pushes.up = c.pushes.down, c.pushes.down < c.pushes.url.length - 1 && c.pushes.down++)
				})
			}
		},
		load_more: function() {
			var l = 0;
			d("body").on("click", ".pinhole-pagination .load-more a", function(t) {
				t.preventDefault();
				var o = window.location.href,
					r = window.document.title,
					e = d(this),
					a = e.attr("href");
				e.parent().addClass("pinhole-loader-active"), d("<div>").load(a, function() {
					var t = l.toString(),
						i = d(".pinhole-posts").last(),
						n = d(this),
						s = n.find(".pinhole-posts").last().children().addClass("pinhole-new-" + t);
					s.imagesLoaded(function() {
						if (c.add_to_layout(i, s), n.find(".pinhole-pagination").length ? d(".pinhole-pagination").html(n.find(".pinhole-pagination").html()) : d(".pinhole-pagination").fadeOut("fast").remove(), a != window.location) {
							c.pushes.up++, c.pushes.down++;
							var t = n.find("title").text(),
								e = {
									prev: o,
									next: a,
									offset: d(window).scrollTop(),
									prev_title: r,
									next_title: t
								};
							c.pushes.url.push(e), window.document.title = t, window.history.pushState(e, "", a)
						}
						return l++, !1
					})
				})
			})
		},
		infinite_scroll: function() {
			if (d(".pinhole-pagination .infinite-scroll").length) {
				var l = !0,
					h = 0;
				d(window).scroll(function() {
					if (l && d(this).scrollTop() > d(".pinhole-pagination").offset().top - d(this).height() - 200) {
						l = !1;
						var o = window.location.href,
							r = window.document.title,
							t = d(".pinhole-pagination .infinite-scroll a"),
							a = t.attr("href");
						t.parent().addClass("pinhole-loader-active"), void 0 !== a && d("<div>").load(a, function() {
							var t = h.toString(),
								i = d(".pinhole-posts").last(),
								n = d(this),
								s = n.find(".pinhole-posts").last().children().addClass("pinhole-new-" + t);
							s.imagesLoaded(function() {
								if (c.add_to_layout(i, s), n.find(".pinhole-pagination").length ? (d(".pinhole-pagination").html(n.find(".pinhole-pagination").html()), l = !0) : d(".pinhole-pagination").fadeOut("fast").remove(), a != window.location) {
									c.pushes.up++, c.pushes.down++;
									var t = n.find("title").text(),
										e = {
											prev: o,
											next: a,
											offset: d(window).scrollTop(),
											prev_title: r,
											next_title: t
										};
									c.pushes.url.push(e), window.document.title = t, window.history.pushState(e, "", a)
								}
								return h++, !1
							})
						})
					}
				})
			}
		},
		disable_right_click: function() {
			pinhole_js_settings.disable_right_click && (d("html").on("contextmenu", "body", function(t) {
				return !1
			}), d("body").on("dragstart", ".pinhole-item", function(t) {
				return !1
			}))
		},
		object_fit_IE_Edge: function() {
			d("body").imagesLoaded(function() {
				objectFitImages(".pinhole-item img")
			})
		},
		protected_gallery_style: function() {
			if (pinhole_js_settings.gallery_image_counter && pinhole_js_settings.gallery_image_filename) {
				var t = d(".pinhole-image-counter").outerWidth();
				d(".pinhole-image-name").css("left", t + 40)
			}
		},
		search_button: function() {
			d("body").on("click", ".pinhole-action-search span", function() {
				d(this).closest(".pinhole-action-search").find(".fa").toggleClass("fa-search", ""), d(this).closest(".pinhole-action-search").toggleClass("active"), setTimeout(function() {
					d('.active input[type="text"]').focus()
				}, 150)
			})
		},
		align_full_fix: function() {
			var t = ".alignfull { width: " + d(window).width() + "px; margin-left: -" + d(window).width() / 2 + "px; margin-right: -" + d(window).width() / 2 + "px; left:50%; right:50%; position: relative; max-width: initial; }";
			d("#pinholle-align-fix").length ? d("#pinholle-align-fix").html(t) : d("head").append('<style id="pinholle-align-fix" type="text/css">' + t + "</style>")
		}
	};
	d(document).ready(function() {
		c.init()
	}), d(window).resize(function() {
		c.resize()
	}), d(window).scroll(function() {
		c.scroll()
	})
}(jQuery);

(function($) {
	"use strict";

	$(document).ready(function() {
		$('body').on('click', '.meks_ess-item:not(".prevent-share-popup")', function(e) {
			e.preventDefault();
			meks_ess_popup($(this).attr('data-url'));
		});

	});

	function meks_ess_popup(data) {
		window.open(data, "Share", 'height=500,width=760,top=' + ($(window).height() / 2 - 250) + ', left=' + ($(window).width() / 2 - 380) + 'resizable=0,toolbar=0,menubar=0,status=0,location=0,scrollbars=0');
	}

})(jQuery);