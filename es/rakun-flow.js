import { context, mono, Void } from 'rakun';

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _typeof(obj) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof(obj);
}

function _toPrimitive(input, hint) {
  if (_typeof(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (_typeof(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}

function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return _typeof(key) === "symbol" ? key : String(key);
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}

function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

var rakunFlowPathParentProvider = context.create(null);
var rakunFlowSnapshotProvider = context.create(null);

var emitEvents = function emitEvents(snapshot) {
  var events = snapshot.getEvents();
  events.forEach(function (e) {
    return snapshot.eventEmitter.emit(e[0], e[1]);
  });
  snapshot.setEvents([]);
  return mono.then();
};

var getCacheState = function getCacheState(path, type, snapshot) {
  return mono.just(snapshot.getState(path, type)).flatPipe(function (state) {
    if (state.state != 'hasValue' && snapshot.parent) {
      return getCacheState(path, type, snapshot.parent);
    }
    return mono.just(snapshot.getState(path, type));
  });
};

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
  if (null != _i) {
    var _s,
      _e,
      _x,
      _r,
      _arr = [],
      _n = !0,
      _d = !1;
    try {
      if (_x = (_i = _i.call(arr)).next, 0 === i) {
        if (Object(_i) !== _i) return;
        _n = !1;
      } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0);
    } catch (err) {
      _d = !0, _e = err;
    } finally {
      try {
        if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return;
      } finally {
        if (_d) throw _e;
      }
    }
    return _arr;
  }
}

function _arrayLikeToArray$1(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}

function _unsupportedIterableToArray$1(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray$1(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$1(o, minLen);
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray$1(arr, i) || _nonIterableRest();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray$1(arr);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray$1(arr) || _nonIterableSpread();
}

function createCommonjsModule(fn) {
  var module = { exports: {} };
	return fn(module, module.exports), module.exports;
}

var eventemitter3 = createCommonjsModule(function (module) {

var has = Object.prototype.hasOwnProperty
  , prefix = '~';

/**
 * Constructor to create a storage for our `EE` objects.
 * An `Events` instance is a plain object whose properties are event names.
 *
 * @constructor
 * @private
 */
function Events() {}

//
// We try to not inherit from `Object.prototype`. In some engines creating an
// instance in this way is faster than calling `Object.create(null)` directly.
// If `Object.create(null)` is not supported we prefix the event names with a
// character to make sure that the built-in object properties are not
// overridden or used as an attack vector.
//
if (Object.create) {
  Events.prototype = Object.create(null);

  //
  // This hack is needed because the `__proto__` property is still inherited in
  // some old browsers like Android 4, iPhone 5.1, Opera 11 and Safari 5.
  //
  if (!new Events().__proto__) prefix = false;
}

/**
 * Representation of a single event listener.
 *
 * @param {Function} fn The listener function.
 * @param {*} context The context to invoke the listener with.
 * @param {Boolean} [once=false] Specify if the listener is a one-time listener.
 * @constructor
 * @private
 */
function EE(fn, context, once) {
  this.fn = fn;
  this.context = context;
  this.once = once || false;
}

/**
 * Add a listener for a given event.
 *
 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} context The context to invoke the listener with.
 * @param {Boolean} once Specify if the listener is a one-time listener.
 * @returns {EventEmitter}
 * @private
 */
function addListener(emitter, event, fn, context, once) {
  if (typeof fn !== 'function') {
    throw new TypeError('The listener must be a function');
  }

  var listener = new EE(fn, context || emitter, once)
    , evt = prefix ? prefix + event : event;

  if (!emitter._events[evt]) emitter._events[evt] = listener, emitter._eventsCount++;
  else if (!emitter._events[evt].fn) emitter._events[evt].push(listener);
  else emitter._events[evt] = [emitter._events[evt], listener];

  return emitter;
}

/**
 * Clear event by name.
 *
 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
 * @param {(String|Symbol)} evt The Event name.
 * @private
 */
function clearEvent(emitter, evt) {
  if (--emitter._eventsCount === 0) emitter._events = new Events();
  else delete emitter._events[evt];
}

/**
 * Minimal `EventEmitter` interface that is molded against the Node.js
 * `EventEmitter` interface.
 *
 * @constructor
 * @public
 */
function EventEmitter() {
  this._events = new Events();
  this._eventsCount = 0;
}

/**
 * Return an array listing the events for which the emitter has registered
 * listeners.
 *
 * @returns {Array}
 * @public
 */
EventEmitter.prototype.eventNames = function eventNames() {
  var names = []
    , events
    , name;

  if (this._eventsCount === 0) return names;

  for (name in (events = this._events)) {
    if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);
  }

  if (Object.getOwnPropertySymbols) {
    return names.concat(Object.getOwnPropertySymbols(events));
  }

  return names;
};

/**
 * Return the listeners registered for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Array} The registered listeners.
 * @public
 */
EventEmitter.prototype.listeners = function listeners(event) {
  var evt = prefix ? prefix + event : event
    , handlers = this._events[evt];

  if (!handlers) return [];
  if (handlers.fn) return [handlers.fn];

  for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) {
    ee[i] = handlers[i].fn;
  }

  return ee;
};

/**
 * Return the number of listeners listening to a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Number} The number of listeners.
 * @public
 */
EventEmitter.prototype.listenerCount = function listenerCount(event) {
  var evt = prefix ? prefix + event : event
    , listeners = this._events[evt];

  if (!listeners) return 0;
  if (listeners.fn) return 1;
  return listeners.length;
};

/**
 * Calls each of the listeners registered for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Boolean} `true` if the event had listeners, else `false`.
 * @public
 */
EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
  var evt = prefix ? prefix + event : event;

  if (!this._events[evt]) return false;

  var listeners = this._events[evt]
    , len = arguments.length
    , args
    , i;

  if (listeners.fn) {
    if (listeners.once) this.removeListener(event, listeners.fn, undefined, true);

    switch (len) {
      case 1: return listeners.fn.call(listeners.context), true;
      case 2: return listeners.fn.call(listeners.context, a1), true;
      case 3: return listeners.fn.call(listeners.context, a1, a2), true;
      case 4: return listeners.fn.call(listeners.context, a1, a2, a3), true;
      case 5: return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
      case 6: return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
    }

    for (i = 1, args = new Array(len -1); i < len; i++) {
      args[i - 1] = arguments[i];
    }

    listeners.fn.apply(listeners.context, args);
  } else {
    var length = listeners.length
      , j;

    for (i = 0; i < length; i++) {
      if (listeners[i].once) this.removeListener(event, listeners[i].fn, undefined, true);

      switch (len) {
        case 1: listeners[i].fn.call(listeners[i].context); break;
        case 2: listeners[i].fn.call(listeners[i].context, a1); break;
        case 3: listeners[i].fn.call(listeners[i].context, a1, a2); break;
        case 4: listeners[i].fn.call(listeners[i].context, a1, a2, a3); break;
        default:
          if (!args) for (j = 1, args = new Array(len -1); j < len; j++) {
            args[j - 1] = arguments[j];
          }

          listeners[i].fn.apply(listeners[i].context, args);
      }
    }
  }

  return true;
};

/**
 * Add a listener for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.on = function on(event, fn, context) {
  return addListener(this, event, fn, context, false);
};

/**
 * Add a one-time listener for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.once = function once(event, fn, context) {
  return addListener(this, event, fn, context, true);
};

/**
 * Remove the listeners of a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn Only remove the listeners that match this function.
 * @param {*} context Only remove the listeners that have this context.
 * @param {Boolean} once Only remove one-time listeners.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
  var evt = prefix ? prefix + event : event;

  if (!this._events[evt]) return this;
  if (!fn) {
    clearEvent(this, evt);
    return this;
  }

  var listeners = this._events[evt];

  if (listeners.fn) {
    if (
      listeners.fn === fn &&
      (!once || listeners.once) &&
      (!context || listeners.context === context)
    ) {
      clearEvent(this, evt);
    }
  } else {
    for (var i = 0, events = [], length = listeners.length; i < length; i++) {
      if (
        listeners[i].fn !== fn ||
        (once && !listeners[i].once) ||
        (context && listeners[i].context !== context)
      ) {
        events.push(listeners[i]);
      }
    }

    //
    // Reset the array, or remove it completely if we have no more listeners.
    //
    if (events.length) this._events[evt] = events.length === 1 ? events[0] : events;
    else clearEvent(this, evt);
  }

  return this;
};

/**
 * Remove all listeners, or those of the specified event.
 *
 * @param {(String|Symbol)} [event] The event name.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
  var evt;

  if (event) {
    evt = prefix ? prefix + event : event;
    if (this._events[evt]) clearEvent(this, evt);
  } else {
    this._events = new Events();
    this._eventsCount = 0;
  }

  return this;
};

//
// Alias methods names because people roll like that.
//
EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
EventEmitter.prototype.addListener = EventEmitter.prototype.on;

//
// Expose the prefix.
//
EventEmitter.prefixed = prefix;

//
// Allow `EventEmitter` to be imported as module namespace.
//
EventEmitter.EventEmitter = EventEmitter;

//
// Expose the module.
//
{
  module.exports = EventEmitter;
}
});

function n(n){for(var r=arguments.length,t=Array(r>1?r-1:0),e=1;e<r;e++)t[e-1]=arguments[e];if("production"!==process.env.NODE_ENV){var i=Y[n],o=i?"function"==typeof i?i.apply(null,t):i:"unknown error nr: "+n;throw Error("[Immer] "+o)}throw Error("[Immer] minified error nr: "+n+(t.length?" "+t.map((function(n){return "'"+n+"'"})).join(","):"")+". Find the full error at: https://bit.ly/3cXEKWf")}function r(n){return !!n&&!!n[Q]}function t(n){var r;return !!n&&(function(n){if(!n||"object"!=typeof n)return !1;var r=Object.getPrototypeOf(n);if(null===r)return !0;var t=Object.hasOwnProperty.call(r,"constructor")&&r.constructor;return t===Object||"function"==typeof t&&Function.toString.call(t)===Z}(n)||Array.isArray(n)||!!n[L]||!!(null===(r=n.constructor)||void 0===r?void 0:r[L])||s(n)||v(n))}function i(n,r,t){void 0===t&&(t=!1),0===o(n)?(t?Object.keys:nn)(n).forEach((function(e){t&&"symbol"==typeof e||r(e,n[e],n);})):n.forEach((function(t,e){return r(e,t,n)}));}function o(n){var r=n[Q];return r?r.i>3?r.i-4:r.i:Array.isArray(n)?1:s(n)?2:v(n)?3:0}function u(n,r){return 2===o(n)?n.has(r):Object.prototype.hasOwnProperty.call(n,r)}function a(n,r){return 2===o(n)?n.get(r):n[r]}function f(n,r,t){var e=o(n);2===e?n.set(r,t):3===e?n.add(t):n[r]=t;}function c(n,r){return n===r?0!==n||1/n==1/r:n!=n&&r!=r}function s(n){return X&&n instanceof Map}function v(n){return q&&n instanceof Set}function p(n){return n.o||n.t}function l(n){if(Array.isArray(n))return Array.prototype.slice.call(n);var r=rn(n);delete r[Q];for(var t=nn(r),e=0;e<t.length;e++){var i=t[e],o=r[i];!1===o.writable&&(o.writable=!0,o.configurable=!0),(o.get||o.set)&&(r[i]={configurable:!0,writable:!0,enumerable:o.enumerable,value:n[i]});}return Object.create(Object.getPrototypeOf(n),r)}function d(n,e){return void 0===e&&(e=!1),y(n)||r(n)||!t(n)||(o(n)>1&&(n.set=n.add=n.clear=n.delete=h),Object.freeze(n),e&&i(n,(function(n,r){return d(r,!0)}),!0)),n}function h(){n(2);}function y(n){return null==n||"object"!=typeof n||Object.isFrozen(n)}function b(r){var t=tn[r];return t||n(18,r),t}function _(){return "production"===process.env.NODE_ENV||U||n(0),U}function j(n,r){r&&(b("Patches"),n.u=[],n.s=[],n.v=r);}function O(n){g(n),n.p.forEach(S),n.p=null;}function g(n){n===U&&(U=n.l);}function w(n){return U={p:[],l:U,h:n,m:!0,_:0}}function S(n){var r=n[Q];0===r.i||1===r.i?r.j():r.O=!0;}function P(r,e){e._=e.p.length;var i=e.p[0],o=void 0!==r&&r!==i;return e.h.g||b("ES5").S(e,r,o),o?(i[Q].P&&(O(e),n(4)),t(r)&&(r=M(e,r),e.l||x(e,r)),e.u&&b("Patches").M(i[Q].t,r,e.u,e.s)):r=M(e,i,[]),O(e),e.u&&e.v(e.u,e.s),r!==H?r:void 0}function M(n,r,t){if(y(r))return r;var e=r[Q];if(!e)return i(r,(function(i,o){return A(n,e,r,i,o,t)}),!0),r;if(e.A!==n)return r;if(!e.P)return x(n,e.t,!0),e.t;if(!e.I){e.I=!0,e.A._--;var o=4===e.i||5===e.i?e.o=l(e.k):e.o,u=o,a=!1;3===e.i&&(u=new Set(o),o.clear(),a=!0),i(u,(function(r,i){return A(n,e,o,r,i,t,a)})),x(n,o,!1),t&&n.u&&b("Patches").N(e,t,n.u,n.s);}return e.o}function A(e,i,o,a,c,s,v){if("production"!==process.env.NODE_ENV&&c===o&&n(5),r(c)){var p=M(e,c,s&&i&&3!==i.i&&!u(i.R,a)?s.concat(a):void 0);if(f(o,a,p),!r(p))return;e.m=!1;}else v&&o.add(c);if(t(c)&&!y(c)){if(!e.h.D&&e._<1)return;M(e,c),i&&i.A.l||x(e,c);}}function x(n,r,t){void 0===t&&(t=!1),!n.l&&n.h.D&&n.m&&d(r,t);}function z(n,r){var t=n[Q];return (t?p(t):n)[r]}function I(n,r){if(r in n)for(var t=Object.getPrototypeOf(n);t;){var e=Object.getOwnPropertyDescriptor(t,r);if(e)return e;t=Object.getPrototypeOf(t);}}function k(n){n.P||(n.P=!0,n.l&&k(n.l));}function E(n){n.o||(n.o=l(n.t));}function N(n,r,t){var e=s(r)?b("MapSet").F(r,t):v(r)?b("MapSet").T(r,t):n.g?function(n,r){var t=Array.isArray(n),e={i:t?1:0,A:r?r.A:_(),P:!1,I:!1,R:{},l:r,t:n,k:null,o:null,j:null,C:!1},i=e,o=en;t&&(i=[e],o=on);var u=Proxy.revocable(i,o),a=u.revoke,f=u.proxy;return e.k=f,e.j=a,f}(r,t):b("ES5").J(r,t);return (t?t.A:_()).p.push(e),e}function R(e){return r(e)||n(22,e),function n(r){if(!t(r))return r;var e,u=r[Q],c=o(r);if(u){if(!u.P&&(u.i<4||!b("ES5").K(u)))return u.t;u.I=!0,e=D(r,c),u.I=!1;}else e=D(r,c);return i(e,(function(r,t){u&&a(u.t,r)===t||f(e,r,n(t));})),3===c?new Set(e):e}(e)}function D(n,r){switch(r){case 2:return new Map(n);case 3:return Array.from(n)}return l(n)}var G,U,W="undefined"!=typeof Symbol&&"symbol"==typeof Symbol("x"),X="undefined"!=typeof Map,q="undefined"!=typeof Set,B="undefined"!=typeof Proxy&&void 0!==Proxy.revocable&&"undefined"!=typeof Reflect,H=W?Symbol.for("immer-nothing"):((G={})["immer-nothing"]=!0,G),L=W?Symbol.for("immer-draftable"):"__$immer_draftable",Q=W?Symbol.for("immer-state"):"__$immer_state",Y={0:"Illegal state",1:"Immer drafts cannot have computed properties",2:"This object has been frozen and should not be mutated",3:function(n){return "Cannot use a proxy that has been revoked. Did you pass an object from inside an immer function to an async process? "+n},4:"An immer producer returned a new value *and* modified its draft. Either return a new value *or* modify the draft.",5:"Immer forbids circular references",6:"The first or second argument to `produce` must be a function",7:"The third argument to `produce` must be a function or undefined",8:"First argument to `createDraft` must be a plain object, an array, or an immerable object",9:"First argument to `finishDraft` must be a draft returned by `createDraft`",10:"The given draft is already finalized",11:"Object.defineProperty() cannot be used on an Immer draft",12:"Object.setPrototypeOf() cannot be used on an Immer draft",13:"Immer only supports deleting array indices",14:"Immer only supports setting array indices and the 'length' property",15:function(n){return "Cannot apply patch, path doesn't resolve: "+n},16:'Sets cannot have "replace" patches.',17:function(n){return "Unsupported patch operation: "+n},18:function(n){return "The plugin for '"+n+"' has not been loaded into Immer. To enable the plugin, import and call `enable"+n+"()` when initializing your application."},20:"Cannot use proxies if Proxy, Proxy.revocable or Reflect are not available",21:function(n){return "produce can only be called on things that are draftable: plain objects, arrays, Map, Set or classes that are marked with '[immerable]: true'. Got '"+n+"'"},22:function(n){return "'current' expects a draft, got: "+n},23:function(n){return "'original' expects a draft, got: "+n},24:"Patching reserved attributes like __proto__, prototype and constructor is not allowed"},Z=""+Object.prototype.constructor,nn="undefined"!=typeof Reflect&&Reflect.ownKeys?Reflect.ownKeys:void 0!==Object.getOwnPropertySymbols?function(n){return Object.getOwnPropertyNames(n).concat(Object.getOwnPropertySymbols(n))}:Object.getOwnPropertyNames,rn=Object.getOwnPropertyDescriptors||function(n){var r={};return nn(n).forEach((function(t){r[t]=Object.getOwnPropertyDescriptor(n,t);})),r},tn={},en={get:function(n,r){if(r===Q)return n;var e=p(n);if(!u(e,r))return function(n,r,t){var e,i=I(r,t);return i?"value"in i?i.value:null===(e=i.get)||void 0===e?void 0:e.call(n.k):void 0}(n,e,r);var i=e[r];return n.I||!t(i)?i:i===z(n.t,r)?(E(n),n.o[r]=N(n.A.h,i,n)):i},has:function(n,r){return r in p(n)},ownKeys:function(n){return Reflect.ownKeys(p(n))},set:function(n,r,t){var e=I(p(n),r);if(null==e?void 0:e.set)return e.set.call(n.k,t),!0;if(!n.P){var i=z(p(n),r),o=null==i?void 0:i[Q];if(o&&o.t===t)return n.o[r]=t,n.R[r]=!1,!0;if(c(t,i)&&(void 0!==t||u(n.t,r)))return !0;E(n),k(n);}return n.o[r]===t&&(void 0!==t||r in n.o)||Number.isNaN(t)&&Number.isNaN(n.o[r])||(n.o[r]=t,n.R[r]=!0),!0},deleteProperty:function(n,r){return void 0!==z(n.t,r)||r in n.t?(n.R[r]=!1,E(n),k(n)):delete n.R[r],n.o&&delete n.o[r],!0},getOwnPropertyDescriptor:function(n,r){var t=p(n),e=Reflect.getOwnPropertyDescriptor(t,r);return e?{writable:!0,configurable:1!==n.i||"length"!==r,enumerable:e.enumerable,value:t[r]}:e},defineProperty:function(){n(11);},getPrototypeOf:function(n){return Object.getPrototypeOf(n.t)},setPrototypeOf:function(){n(12);}},on={};i(en,(function(n,r){on[n]=function(){return arguments[0]=arguments[0][0],r.apply(this,arguments)};})),on.deleteProperty=function(r,t){return "production"!==process.env.NODE_ENV&&isNaN(parseInt(t))&&n(13),on.set.call(this,r,t,void 0)},on.set=function(r,t,e){return "production"!==process.env.NODE_ENV&&"length"!==t&&isNaN(parseInt(t))&&n(14),en.set.call(this,r[0],t,e,r[0])};var un=function(){function e(r){var e=this;this.g=B,this.D=!0,this.produce=function(r,i,o){if("function"==typeof r&&"function"!=typeof i){var u=i;i=r;var a=e;return function(n){var r=this;void 0===n&&(n=u);for(var t=arguments.length,e=Array(t>1?t-1:0),o=1;o<t;o++)e[o-1]=arguments[o];return a.produce(n,(function(n){var t;return (t=i).call.apply(t,[r,n].concat(e))}))}}var f;if("function"!=typeof i&&n(6),void 0!==o&&"function"!=typeof o&&n(7),t(r)){var c=w(e),s=N(e,r,void 0),v=!0;try{f=i(s),v=!1;}finally{v?O(c):g(c);}return "undefined"!=typeof Promise&&f instanceof Promise?f.then((function(n){return j(c,o),P(n,c)}),(function(n){throw O(c),n})):(j(c,o),P(f,c))}if(!r||"object"!=typeof r){if(void 0===(f=i(r))&&(f=r),f===H&&(f=void 0),e.D&&d(f,!0),o){var p=[],l=[];b("Patches").M(r,f,p,l),o(p,l);}return f}n(21,r);},this.produceWithPatches=function(n,r){if("function"==typeof n)return function(r){for(var t=arguments.length,i=Array(t>1?t-1:0),o=1;o<t;o++)i[o-1]=arguments[o];return e.produceWithPatches(r,(function(r){return n.apply(void 0,[r].concat(i))}))};var t,i,o=e.produce(n,r,(function(n,r){t=n,i=r;}));return "undefined"!=typeof Promise&&o instanceof Promise?o.then((function(n){return [n,t,i]})):[o,t,i]},"boolean"==typeof(null==r?void 0:r.useProxies)&&this.setUseProxies(r.useProxies),"boolean"==typeof(null==r?void 0:r.autoFreeze)&&this.setAutoFreeze(r.autoFreeze);}var i=e.prototype;return i.createDraft=function(e){t(e)||n(8),r(e)&&(e=R(e));var i=w(this),o=N(this,e,void 0);return o[Q].C=!0,g(i),o},i.finishDraft=function(r,t){var e=r&&r[Q];"production"!==process.env.NODE_ENV&&(e&&e.C||n(9),e.I&&n(10));var i=e.A;return j(i,t),P(void 0,i)},i.setAutoFreeze=function(n){this.D=n;},i.setUseProxies=function(r){r&&!B&&n(20),this.g=r;},i.applyPatches=function(n,t){var e;for(e=t.length-1;e>=0;e--){var i=t[e];if(0===i.path.length&&"replace"===i.op){n=i.value;break}}e>-1&&(t=t.slice(e+1));var o=b("Patches").$;return r(n)?o(n,t):this.produce(n,(function(n){return o(n,t)}))},e}(),an=new un,fn=an.produce;an.produceWithPatches.bind(an);an.setAutoFreeze.bind(an);an.setUseProxies.bind(an);an.applyPatches.bind(an);an.createDraft.bind(an);an.finishDraft.bind(an);var produce = fn;

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var getInitialValue = function getInitialValue(type) {
  return {
    type: type,
    dependencies: [],
    state: "loading",
    value: null
  };
};
var RakunFlowSnapshotImpl = /*#__PURE__*/function () {
  function RakunFlowSnapshotImpl(parent) {
    var _this = this;
    _classCallCheck(this, RakunFlowSnapshotImpl);
    this.parent = parent;
    _defineProperty(this, "eventEmitter", void 0);
    _defineProperty(this, "states", {});
    _defineProperty(this, "events", []);
    _defineProperty(this, "inProcess", false);
    _defineProperty(this, "getState", function (path, type) {
      var _this$states$path;
      return (_this$states$path = _this.states[path]) !== null && _this$states$path !== void 0 ? _this$states$path : getInitialValue(type);
    });
    this.eventEmitter = new eventemitter3();
  }
  _createClass(RakunFlowSnapshotImpl, [{
    key: "getEvents",
    value: function getEvents() {
      return this.events;
    }
  }, {
    key: "setEvents",
    value: function setEvents(events) {
      this.events = events;
    }
  }, {
    key: "getValue",
    value: function getValue(path) {
      var _this$states$path2;
      return (_this$states$path2 = this.states[path]) === null || _this$states$path2 === void 0 ? void 0 : _this$states$path2.value;
    }
  }, {
    key: "addDependency",
    value: function addDependency(path, dependency, type) {
      this.states = produce(this.states, function (draft) {
        var _draft$path;
        draft[path] = produce((_draft$path = draft[path]) !== null && _draft$path !== void 0 ? _draft$path : getInitialValue(type), function (d) {
          if (!d.dependencies.includes(dependency)) {
            d.dependencies = [].concat(_toConsumableArray(d.dependencies), [dependency]);
          }
        });
      });
    }
  }, {
    key: "hasDependency",
    value: function hasDependency(path, dependency) {
      var _this$states$path$dep, _this$states$path3;
      var dependencies = (_this$states$path$dep = (_this$states$path3 = this.states[path]) === null || _this$states$path3 === void 0 ? void 0 : _this$states$path3.dependencies) !== null && _this$states$path$dep !== void 0 ? _this$states$path$dep : [];
      return dependencies.includes(dependency);
    }
  }, {
    key: "set",
    value: function set(path, value, type) {
      var _this2 = this;
      var _produce = produce([this.states, this.events], function (draft) {
          _this2._recipeSet(path, value, draft, type);
        }),
        _produce2 = _slicedToArray(_produce, 2),
        data = _produce2[0],
        events = _produce2[1];
      this.states = data;
      this.events = events;
    }
  }, {
    key: "getDependencies",
    value: function getDependencies(path) {
      var _this$states$path$dep2, _this$states$path4;
      return (_this$states$path$dep2 = (_this$states$path4 = this.states[path]) === null || _this$states$path4 === void 0 ? void 0 : _this$states$path4.dependencies) !== null && _this$states$path$dep2 !== void 0 ? _this$states$path$dep2 : [];
    }
  }, {
    key: "_recipeReset",
    value: function _recipeReset(path, _ref) {
      var _states$path$dependen, _states$path;
      var _ref2 = _slicedToArray(_ref, 2),
        states = _ref2[0],
        events = _ref2[1];
      if (path in states) {
        states[path] = produce(states[path], function (d) {
          d.state = "loading";
          d.value = null;
        });
      }
      var _iterator = _createForOfIteratorHelper((_states$path$dependen = (_states$path = states[path]) === null || _states$path === void 0 ? void 0 : _states$path.dependencies) !== null && _states$path$dependen !== void 0 ? _states$path$dependen : []),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var _states$p;
          var p = _step.value;
          if (((_states$p = states[p]) === null || _states$p === void 0 ? void 0 : _states$p.type) == 'selector') {
            this._recipeReset(p, [states, events]);
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      events.push([path, states[path]]);
    }
  }, {
    key: "_recipeSet",
    value: function _recipeSet(path, value, _ref3, type) {
      var _states$path2, _states$path$dependen2, _states$path3;
      var _ref4 = _slicedToArray(_ref3, 2),
        states = _ref4[0],
        events = _ref4[1];
      states[path] = produce((_states$path2 = states[path]) !== null && _states$path2 !== void 0 ? _states$path2 : getInitialValue(type), function (d) {
        d.state = "hasValue";
        d.value = value;
      });
      var dependencies = (_states$path$dependen2 = (_states$path3 = states[path]) === null || _states$path3 === void 0 ? void 0 : _states$path3.dependencies) !== null && _states$path$dependen2 !== void 0 ? _states$path$dependen2 : [];
      var _iterator2 = _createForOfIteratorHelper(dependencies),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var _states$p2;
          var p = _step2.value;
          if (((_states$p2 = states[p]) === null || _states$p2 === void 0 ? void 0 : _states$p2.type) == 'selector') {
            this._recipeReset(p, [states, events]);
          }
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
      events.push([path, states[path]]);
    }
  }, {
    key: "reset",
    value: function reset(path) {
      var _this3 = this;
      var _produce3 = produce([this.states, this.events], function (draft) {
          _this3._recipeReset(path, draft);
        }),
        _produce4 = _slicedToArray(_produce3, 2),
        states = _produce4[0],
        events = _produce4[1];
      this.states = states;
      this.events = events;
    }
  }]);
  return RakunFlowSnapshotImpl;
}();

var getSnapshotOrThrow = function getSnapshotOrThrow(RakunFlowSnapshot) {
  return RakunFlowSnapshot != null ? mono.just(RakunFlowSnapshot) : mono.error(new Error("NotFound RakunFlowSnapshot"));
};
var createSnapshot = function createSnapshot(parent) {
  return new RakunFlowSnapshotImpl(parent);
};

var getSnapshot = function getSnapshot() {
  return rakunFlowSnapshotProvider.get().flatPipe(getSnapshotOrThrow);
};

var setCacheValue = function setCacheValue(path, type, snapshot, value) {
  return mono.fromCallback(function () {
    snapshot.set(path, value, type);
    return Void;
  });
};

var addDependency = function addDependency(snapshot, path, dependency, type) {
  return mono.fromCallback(function () {
    snapshot.addDependency(path, dependency, type);
    return Void;
  });
};
var get = function get(snapshot, path, _get2, type) {
  return rakunFlowPathParentProvider.get().flatPipe(function (value) {
    if (value) {
      return addDependency(snapshot, path, value, type).thenReturn(value);
    }
    return mono.just(value);
  }).flatPipe(function (oldPathParent) {
    return rakunFlowPathParentProvider.define(path).then(_get2().flatPipe(function (v) {
      return setCacheValue(path, type, snapshot, v).then(rakunFlowPathParentProvider.define(oldPathParent));
    }));
  }).flatPipe(function () {
    return emitEvents(snapshot);
  });
};
var getState = function getState(path, type) {
  return function (_get) {
    return getSnapshot().flatPipe(function (snapshot) {
      return getCacheState(path, type, snapshot).flatPipe(function (state) {
        if (state.state == "hasValue") {
          return mono.just(state);
        } else {
          return get(snapshot, path, _get, type).then(getCacheState(path, type, snapshot));
        }
      });
    });
  };
};

var recursive = function recursive(snapshot, path, type) {
  return getCacheState(path, type, snapshot).flatPipe(function () {
    snapshot.reset(path);
    if (snapshot.parent) {
      return recursive(snapshot.parent, path, type);
    } else {
      return mono.then();
    }
  }).flatPipe(function () {
    return emitEvents(snapshot);
  });
};
var reset = function reset(path, type) {
  return function () {
    return getSnapshot().flatPipe(function (RakunFlowSnapshot) {
      return recursive(RakunFlowSnapshot, path, type);
    });
  };
};

var set = function set(path, type) {
  return function (value) {
    return getSnapshot().flatPipe(function (snapshot) {
      return setCacheValue(path, type, snapshot, value).then().flatPipe(function () {
        return emitEvents(snapshot);
      });
    });
  };
};

var subscribe = function subscribe(path) {
  return function (callback) {
    return getSnapshot().flatPipe(function (snapshot) {
      return mono.fromCallback(function () {
        snapshot.eventEmitter.on(path, callback);
        return callback;
      }).flatPipe(function (cb) {
        return mono.just(function () {
          snapshot.eventEmitter.removeListener(path, cb);
          return mono.then();
        });
      });
    });
  };
};

var RakunFlowSnapshotManagerImpl = /*#__PURE__*/_createClass(function RakunFlowSnapshotManagerImpl(path, type) {
  _classCallCheck(this, RakunFlowSnapshotManagerImpl);
  this.path = path;
  this.type = type;
  _defineProperty(this, "set", set(this.path, this.type));
  _defineProperty(this, "reset", reset(this.path, this.type));
  _defineProperty(this, "subscribe", subscribe(this.path));
  _defineProperty(this, "getState", getState(this.path, this.type));
});
var createSnapshotManager = function createSnapshotManager(path, type) {
  return new RakunFlowSnapshotManagerImpl(path, type);
};

var RakunFlowAtomImpl = /*#__PURE__*/function () {
  function RakunFlowAtomImpl(config) {
    var _this = this;
    _classCallCheck(this, RakunFlowAtomImpl);
    _defineProperty(this, "_default", void 0);
    _defineProperty(this, "path", void 0);
    _defineProperty(this, "manager", void 0);
    _defineProperty(this, "getState", function () {
      return _this.manager.getState(_this._default);
    });
    _defineProperty(this, "subscribe", function (callback) {
      return _this.manager.subscribe(callback);
    });
    _defineProperty(this, "reset", function () {
      return _this.manager.reset();
    });
    _defineProperty(this, "set", function (value) {
      return _this.manager.set(value);
    });
    this.path = config['path'];
    this._default = config['default'];
    this.manager = createSnapshotManager(this.path, 'atom');
  }
  _createClass(RakunFlowAtomImpl, [{
    key: "get",
    value: function get() {
      return this.getState().pipe(function (s) {
        return s.value;
      });
    }
  }]);
  return RakunFlowAtomImpl;
}();
var createAtom = function createAtom(config) {
  return new RakunFlowAtomImpl({
    "default": function _default() {
      return config["default"];
    },
    path: config.path
  });
};

var atom$1 = createAtom;

function _toArray(arr) {
  return _arrayWithHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray$1(arr) || _nonIterableRest();
}

var encode = function encode(fields, fieldNameArray, defualtValue) {
  var _fieldNameArray = _toArray(fieldNameArray),
    fieldName = _fieldNameArray[0],
    fieldNameArrayRest = _fieldNameArray.slice(1);
  if (fieldName) {
    if ('encode' in fields) {
      return fields.encode;
    } else {
      var field = Object.keys(fields).filter(function (_fieldName) {
        return _fieldName == fieldName;
      })[0];
      return encode(fields[field], fieldNameArrayRest, defualtValue);
    }
  }
  return function () {
    return defualtValue;
  };
};

var RakunFlowParamsImpl = /*#__PURE__*/function () {
  function RakunFlowParamsImpl(path, fields) {
    _classCallCheck(this, RakunFlowParamsImpl);
    this.path = path;
    this.fields = fields;
  }
  _createClass(RakunFlowParamsImpl, [{
    key: "encode",
    value: function encode$1(params) {
      var _this = this;
      return this.path.replace(/(:\w+)/g, function (param) {
        var fieldNameArray = param.substring(1).split(".");
        return encode(_this.fields, fieldNameArray, param)(params);
      });
    }
  }]);
  return RakunFlowParamsImpl;
}();

var atomfamily = function atomfamily(config) {
  return function (params) {
    var paramsBuild = new RakunFlowParamsImpl(config.path, config.params);
    return atom$1({
      "default": config["default"](params),
      path: paramsBuild.encode(params)
    });
  };
};

var RakunFlowSelectorStateImpl = /*#__PURE__*/function () {
  function RakunFlowSelectorStateImpl(config, rakunFlowValue) {
    _classCallCheck(this, RakunFlowSelectorStateImpl);
    this.rakunFlowValue = rakunFlowValue;
    _defineProperty(this, "_set", void 0);
    this._set = config.set;
  }
  _createClass(RakunFlowSelectorStateImpl, [{
    key: "path",
    get: function get() {
      return this.rakunFlowValue.path;
    }
  }, {
    key: "getState",
    value: function getState() {
      return this.rakunFlowValue.getState();
    }
  }, {
    key: "subscribe",
    value: function subscribe(callback) {
      return this.rakunFlowValue.subscribe(callback);
    }
  }, {
    key: "get",
    value: function get() {
      return this.rakunFlowValue.get();
    }
  }, {
    key: "set",
    value: function set(value) {
      return this._set(value);
    }
  }, {
    key: "reset",
    value: function reset() {
      return this.rakunFlowValue.reset();
    }
  }]);
  return RakunFlowSelectorStateImpl;
}();

var RakunFlowSelectorValueImpl = /*#__PURE__*/function () {
  function RakunFlowSelectorValueImpl(config) {
    var _this = this;
    _classCallCheck(this, RakunFlowSelectorValueImpl);
    _defineProperty(this, "_get", void 0);
    _defineProperty(this, "path", void 0);
    _defineProperty(this, "manager", void 0);
    _defineProperty(this, "getState", function () {
      return _this.manager.getState(function () {
        return _this._get;
      });
    });
    _defineProperty(this, "subscribe", function (callback) {
      return _this.manager.subscribe(callback);
    });
    _defineProperty(this, "reset", function () {
      return _this.manager.reset();
    });
    this.path = config['path'];
    this._get = config['get'];
    this.manager = createSnapshotManager(this.path, 'selector');
  }
  _createClass(RakunFlowSelectorValueImpl, [{
    key: "get",
    value: function get() {
      return this.getState().pipe(function (s) {
        return s.value;
      });
    }
  }]);
  return RakunFlowSelectorValueImpl;
}();

var createSelector = function createSelector(config) {
  if ("set" in config) {
    return new RakunFlowSelectorStateImpl(config, new RakunFlowSelectorValueImpl(config));
  } else {
    return new RakunFlowSelectorValueImpl(config);
  }
};

var selectorFamily$1 = function selectorFamily(config) {
  return function (params) {
    var paramsBuild = new RakunFlowParamsImpl(config.path, config.params);
    if ("set" in config) {
      return createSelector({
        get: config.get(params),
        path: paramsBuild.encode(params),
        set: function set(v) {
          return config.set(params, v);
        }
      });
    } else {
      return createSelector({
        get: config.get(params),
        path: paramsBuild.encode(params)
      });
    }
  };
};

var paramString = {
  encode: function encode(v) {
    return v;
  },
  decode: function decode(v) {
    return v;
  }
};
var param$1 = {
  string: paramString
};

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };
  return _setPrototypeOf(o, p);
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  Object.defineProperty(subClass, "prototype", {
    writable: false
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }
  return _assertThisInitialized(self);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var RakunFlowValue = /*#__PURE__*/_createClass(function RakunFlowValue() {
  _classCallCheck(this, RakunFlowValue);
  _defineProperty(this, "path", void 0);
});
var RakunFlowState = /*#__PURE__*/function (_RakunFlowValue) {
  _inherits(RakunFlowState, _RakunFlowValue);
  var _super = _createSuper(RakunFlowState);
  function RakunFlowState() {
    _classCallCheck(this, RakunFlowState);
    return _super.apply(this, arguments);
  }
  return _createClass(RakunFlowState);
}(RakunFlowValue);

var index = {
  atomFamily: atomfamily,
  atom: atom$1,
  selector: createSelector
};
var atomFamily = atomfamily;
var atom = atom$1;
var param = param$1;
var selector = createSelector;
var selectorFamily = selectorFamily$1;

export { RakunFlowState, RakunFlowValue, atom, atomFamily, createSnapshot, index as default, getSnapshotOrThrow, param, rakunFlowPathParentProvider, rakunFlowSnapshotProvider, selector, selectorFamily };
