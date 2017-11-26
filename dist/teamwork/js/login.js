/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _fastclick = __webpack_require__(1);

	var _fastclick2 = _interopRequireDefault(_fastclick);

	var _weui = __webpack_require__(2);

	var _weui2 = _interopRequireDefault(_weui);

	var _api = __webpack_require__(35);

	var _api2 = _interopRequireDefault(_api);

	var _vue = __webpack_require__(64);

	var _vue2 = _interopRequireDefault(_vue);

	var _restUrl = __webpack_require__(67);

	var _restUrl2 = _interopRequireDefault(_restUrl);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	_fastclick2.default.attach(document.body);

	/* form */
	// 约定正则
	var regexp = {
	    regexp: {
	        // IDNUM: /(?:^\d{15}$)|(?:^\d{18}$)|^\d{17}[\dXx]$/,
	        // VCODE: /^.{4}$/
	        IDNUM: /^\w+$/,
	        VCODE: /^.{4}$/
	    }
	};
	// 失去焦点时检测
	_weui2.default.form.checkIfBlur('#form', regexp);
	module.exports = new _vue2.default({
	    el: '#tab',
	    data: {
	        employId: null,
	        pwd: null
	    },
	    methods: {
	        submitClick: function submitClick() {
	            var __this = this;
	            _weui2.default.form.validate('#form', function (error) {
	                console.log(error);
	                if (!error) {
	                    var loading = _weui2.default.loading('登录中...');
	                    _api2.default.getCall(_restUrl2.default.userLoginUrl, {
	                        employId: __this.employId,
	                        pwd: __this.pwd
	                    }, function (data, errMsg) {
	                        loading.hide();
	                        if (errMsg) {
	                            _weui2.default.topTips(errMsg);
	                        } else if (data) {
	                            // weui.alert(response.data.errorMsg);
	                            _weui2.default.toast('登录成功', 3000);
	                        }
	                    });
	                }
	            }, regexp);
	        }
	    }
	});

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;;(function () {
		'use strict';

		/**
		 * @preserve FastClick: polyfill to remove click delays on browsers with touch UIs.
		 *
		 * @codingstandard ftlabs-jsv2
		 * @copyright The Financial Times Limited [All Rights Reserved]
		 * @license MIT License (see LICENSE.txt)
		 */

		/*jslint browser:true, node:true*/
		/*global define, Event, Node*/


		/**
		 * Instantiate fast-clicking listeners on the specified layer.
		 *
		 * @constructor
		 * @param {Element} layer The layer to listen on
		 * @param {Object} [options={}] The options to override the defaults
		 */
		function FastClick(layer, options) {
			var oldOnClick;

			options = options || {};

			/**
			 * Whether a click is currently being tracked.
			 *
			 * @type boolean
			 */
			this.trackingClick = false;


			/**
			 * Timestamp for when click tracking started.
			 *
			 * @type number
			 */
			this.trackingClickStart = 0;


			/**
			 * The element being tracked for a click.
			 *
			 * @type EventTarget
			 */
			this.targetElement = null;


			/**
			 * X-coordinate of touch start event.
			 *
			 * @type number
			 */
			this.touchStartX = 0;


			/**
			 * Y-coordinate of touch start event.
			 *
			 * @type number
			 */
			this.touchStartY = 0;


			/**
			 * ID of the last touch, retrieved from Touch.identifier.
			 *
			 * @type number
			 */
			this.lastTouchIdentifier = 0;


			/**
			 * Touchmove boundary, beyond which a click will be cancelled.
			 *
			 * @type number
			 */
			this.touchBoundary = options.touchBoundary || 10;


			/**
			 * The FastClick layer.
			 *
			 * @type Element
			 */
			this.layer = layer;

			/**
			 * The minimum time between tap(touchstart and touchend) events
			 *
			 * @type number
			 */
			this.tapDelay = options.tapDelay || 200;

			/**
			 * The maximum time for a tap
			 *
			 * @type number
			 */
			this.tapTimeout = options.tapTimeout || 700;

			if (FastClick.notNeeded(layer)) {
				return;
			}

			// Some old versions of Android don't have Function.prototype.bind
			function bind(method, context) {
				return function() { return method.apply(context, arguments); };
			}


			var methods = ['onMouse', 'onClick', 'onTouchStart', 'onTouchMove', 'onTouchEnd', 'onTouchCancel'];
			var context = this;
			for (var i = 0, l = methods.length; i < l; i++) {
				context[methods[i]] = bind(context[methods[i]], context);
			}

			// Set up event handlers as required
			if (deviceIsAndroid) {
				layer.addEventListener('mouseover', this.onMouse, true);
				layer.addEventListener('mousedown', this.onMouse, true);
				layer.addEventListener('mouseup', this.onMouse, true);
			}

			layer.addEventListener('click', this.onClick, true);
			layer.addEventListener('touchstart', this.onTouchStart, false);
			layer.addEventListener('touchmove', this.onTouchMove, false);
			layer.addEventListener('touchend', this.onTouchEnd, false);
			layer.addEventListener('touchcancel', this.onTouchCancel, false);

			// Hack is required for browsers that don't support Event#stopImmediatePropagation (e.g. Android 2)
			// which is how FastClick normally stops click events bubbling to callbacks registered on the FastClick
			// layer when they are cancelled.
			if (!Event.prototype.stopImmediatePropagation) {
				layer.removeEventListener = function(type, callback, capture) {
					var rmv = Node.prototype.removeEventListener;
					if (type === 'click') {
						rmv.call(layer, type, callback.hijacked || callback, capture);
					} else {
						rmv.call(layer, type, callback, capture);
					}
				};

				layer.addEventListener = function(type, callback, capture) {
					var adv = Node.prototype.addEventListener;
					if (type === 'click') {
						adv.call(layer, type, callback.hijacked || (callback.hijacked = function(event) {
							if (!event.propagationStopped) {
								callback(event);
							}
						}), capture);
					} else {
						adv.call(layer, type, callback, capture);
					}
				};
			}

			// If a handler is already declared in the element's onclick attribute, it will be fired before
			// FastClick's onClick handler. Fix this by pulling out the user-defined handler function and
			// adding it as listener.
			if (typeof layer.onclick === 'function') {

				// Android browser on at least 3.2 requires a new reference to the function in layer.onclick
				// - the old one won't work if passed to addEventListener directly.
				oldOnClick = layer.onclick;
				layer.addEventListener('click', function(event) {
					oldOnClick(event);
				}, false);
				layer.onclick = null;
			}
		}

		/**
		* Windows Phone 8.1 fakes user agent string to look like Android and iPhone.
		*
		* @type boolean
		*/
		var deviceIsWindowsPhone = navigator.userAgent.indexOf("Windows Phone") >= 0;

		/**
		 * Android requires exceptions.
		 *
		 * @type boolean
		 */
		var deviceIsAndroid = navigator.userAgent.indexOf('Android') > 0 && !deviceIsWindowsPhone;


		/**
		 * iOS requires exceptions.
		 *
		 * @type boolean
		 */
		var deviceIsIOS = /iP(ad|hone|od)/.test(navigator.userAgent) && !deviceIsWindowsPhone;


		/**
		 * iOS 4 requires an exception for select elements.
		 *
		 * @type boolean
		 */
		var deviceIsIOS4 = deviceIsIOS && (/OS 4_\d(_\d)?/).test(navigator.userAgent);


		/**
		 * iOS 6.0-7.* requires the target element to be manually derived
		 *
		 * @type boolean
		 */
		var deviceIsIOSWithBadTarget = deviceIsIOS && (/OS [6-7]_\d/).test(navigator.userAgent);

		/**
		 * BlackBerry requires exceptions.
		 *
		 * @type boolean
		 */
		var deviceIsBlackBerry10 = navigator.userAgent.indexOf('BB10') > 0;

		/**
		 * Determine whether a given element requires a native click.
		 *
		 * @param {EventTarget|Element} target Target DOM element
		 * @returns {boolean} Returns true if the element needs a native click
		 */
		FastClick.prototype.needsClick = function(target) {
			switch (target.nodeName.toLowerCase()) {

			// Don't send a synthetic click to disabled inputs (issue #62)
			case 'button':
			case 'select':
			case 'textarea':
				if (target.disabled) {
					return true;
				}

				break;
			case 'input':

				// File inputs need real clicks on iOS 6 due to a browser bug (issue #68)
				if ((deviceIsIOS && target.type === 'file') || target.disabled) {
					return true;
				}

				break;
			case 'label':
			case 'iframe': // iOS8 homescreen apps can prevent events bubbling into frames
			case 'video':
				return true;
			}

			return (/\bneedsclick\b/).test(target.className);
		};


		/**
		 * Determine whether a given element requires a call to focus to simulate click into element.
		 *
		 * @param {EventTarget|Element} target Target DOM element
		 * @returns {boolean} Returns true if the element requires a call to focus to simulate native click.
		 */
		FastClick.prototype.needsFocus = function(target) {
			switch (target.nodeName.toLowerCase()) {
			case 'textarea':
				return true;
			case 'select':
				return !deviceIsAndroid;
			case 'input':
				switch (target.type) {
				case 'button':
				case 'checkbox':
				case 'file':
				case 'image':
				case 'radio':
				case 'submit':
					return false;
				}

				// No point in attempting to focus disabled inputs
				return !target.disabled && !target.readOnly;
			default:
				return (/\bneedsfocus\b/).test(target.className);
			}
		};


		/**
		 * Send a click event to the specified element.
		 *
		 * @param {EventTarget|Element} targetElement
		 * @param {Event} event
		 */
		FastClick.prototype.sendClick = function(targetElement, event) {
			var clickEvent, touch;

			// On some Android devices activeElement needs to be blurred otherwise the synthetic click will have no effect (#24)
			if (document.activeElement && document.activeElement !== targetElement) {
				document.activeElement.blur();
			}

			touch = event.changedTouches[0];

			// Synthesise a click event, with an extra attribute so it can be tracked
			clickEvent = document.createEvent('MouseEvents');
			clickEvent.initMouseEvent(this.determineEventType(targetElement), true, true, window, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY, false, false, false, false, 0, null);
			clickEvent.forwardedTouchEvent = true;
			targetElement.dispatchEvent(clickEvent);
		};

		FastClick.prototype.determineEventType = function(targetElement) {

			//Issue #159: Android Chrome Select Box does not open with a synthetic click event
			if (deviceIsAndroid && targetElement.tagName.toLowerCase() === 'select') {
				return 'mousedown';
			}

			return 'click';
		};


		/**
		 * @param {EventTarget|Element} targetElement
		 */
		FastClick.prototype.focus = function(targetElement) {
			var length;

			// Issue #160: on iOS 7, some input elements (e.g. date datetime month) throw a vague TypeError on setSelectionRange. These elements don't have an integer value for the selectionStart and selectionEnd properties, but unfortunately that can't be used for detection because accessing the properties also throws a TypeError. Just check the type instead. Filed as Apple bug #15122724.
			if (deviceIsIOS && targetElement.setSelectionRange && targetElement.type.indexOf('date') !== 0 && targetElement.type !== 'time' && targetElement.type !== 'month') {
				length = targetElement.value.length;
				targetElement.setSelectionRange(length, length);
			} else {
				targetElement.focus();
			}
		};


		/**
		 * Check whether the given target element is a child of a scrollable layer and if so, set a flag on it.
		 *
		 * @param {EventTarget|Element} targetElement
		 */
		FastClick.prototype.updateScrollParent = function(targetElement) {
			var scrollParent, parentElement;

			scrollParent = targetElement.fastClickScrollParent;

			// Attempt to discover whether the target element is contained within a scrollable layer. Re-check if the
			// target element was moved to another parent.
			if (!scrollParent || !scrollParent.contains(targetElement)) {
				parentElement = targetElement;
				do {
					if (parentElement.scrollHeight > parentElement.offsetHeight) {
						scrollParent = parentElement;
						targetElement.fastClickScrollParent = parentElement;
						break;
					}

					parentElement = parentElement.parentElement;
				} while (parentElement);
			}

			// Always update the scroll top tracker if possible.
			if (scrollParent) {
				scrollParent.fastClickLastScrollTop = scrollParent.scrollTop;
			}
		};


		/**
		 * @param {EventTarget} targetElement
		 * @returns {Element|EventTarget}
		 */
		FastClick.prototype.getTargetElementFromEventTarget = function(eventTarget) {

			// On some older browsers (notably Safari on iOS 4.1 - see issue #56) the event target may be a text node.
			if (eventTarget.nodeType === Node.TEXT_NODE) {
				return eventTarget.parentNode;
			}

			return eventTarget;
		};


		/**
		 * On touch start, record the position and scroll offset.
		 *
		 * @param {Event} event
		 * @returns {boolean}
		 */
		FastClick.prototype.onTouchStart = function(event) {
			var targetElement, touch, selection;

			// Ignore multiple touches, otherwise pinch-to-zoom is prevented if both fingers are on the FastClick element (issue #111).
			if (event.targetTouches.length > 1) {
				return true;
			}

			targetElement = this.getTargetElementFromEventTarget(event.target);
			touch = event.targetTouches[0];

			if (deviceIsIOS) {

				// Only trusted events will deselect text on iOS (issue #49)
				selection = window.getSelection();
				if (selection.rangeCount && !selection.isCollapsed) {
					return true;
				}

				if (!deviceIsIOS4) {

					// Weird things happen on iOS when an alert or confirm dialog is opened from a click event callback (issue #23):
					// when the user next taps anywhere else on the page, new touchstart and touchend events are dispatched
					// with the same identifier as the touch event that previously triggered the click that triggered the alert.
					// Sadly, there is an issue on iOS 4 that causes some normal touch events to have the same identifier as an
					// immediately preceeding touch event (issue #52), so this fix is unavailable on that platform.
					// Issue 120: touch.identifier is 0 when Chrome dev tools 'Emulate touch events' is set with an iOS device UA string,
					// which causes all touch events to be ignored. As this block only applies to iOS, and iOS identifiers are always long,
					// random integers, it's safe to to continue if the identifier is 0 here.
					if (touch.identifier && touch.identifier === this.lastTouchIdentifier) {
						event.preventDefault();
						return false;
					}

					this.lastTouchIdentifier = touch.identifier;

					// If the target element is a child of a scrollable layer (using -webkit-overflow-scrolling: touch) and:
					// 1) the user does a fling scroll on the scrollable layer
					// 2) the user stops the fling scroll with another tap
					// then the event.target of the last 'touchend' event will be the element that was under the user's finger
					// when the fling scroll was started, causing FastClick to send a click event to that layer - unless a check
					// is made to ensure that a parent layer was not scrolled before sending a synthetic click (issue #42).
					this.updateScrollParent(targetElement);
				}
			}

			this.trackingClick = true;
			this.trackingClickStart = event.timeStamp;
			this.targetElement = targetElement;

			this.touchStartX = touch.pageX;
			this.touchStartY = touch.pageY;

			// Prevent phantom clicks on fast double-tap (issue #36)
			if ((event.timeStamp - this.lastClickTime) < this.tapDelay) {
				event.preventDefault();
			}

			return true;
		};


		/**
		 * Based on a touchmove event object, check whether the touch has moved past a boundary since it started.
		 *
		 * @param {Event} event
		 * @returns {boolean}
		 */
		FastClick.prototype.touchHasMoved = function(event) {
			var touch = event.changedTouches[0], boundary = this.touchBoundary;

			if (Math.abs(touch.pageX - this.touchStartX) > boundary || Math.abs(touch.pageY - this.touchStartY) > boundary) {
				return true;
			}

			return false;
		};


		/**
		 * Update the last position.
		 *
		 * @param {Event} event
		 * @returns {boolean}
		 */
		FastClick.prototype.onTouchMove = function(event) {
			if (!this.trackingClick) {
				return true;
			}

			// If the touch has moved, cancel the click tracking
			if (this.targetElement !== this.getTargetElementFromEventTarget(event.target) || this.touchHasMoved(event)) {
				this.trackingClick = false;
				this.targetElement = null;
			}

			return true;
		};


		/**
		 * Attempt to find the labelled control for the given label element.
		 *
		 * @param {EventTarget|HTMLLabelElement} labelElement
		 * @returns {Element|null}
		 */
		FastClick.prototype.findControl = function(labelElement) {

			// Fast path for newer browsers supporting the HTML5 control attribute
			if (labelElement.control !== undefined) {
				return labelElement.control;
			}

			// All browsers under test that support touch events also support the HTML5 htmlFor attribute
			if (labelElement.htmlFor) {
				return document.getElementById(labelElement.htmlFor);
			}

			// If no for attribute exists, attempt to retrieve the first labellable descendant element
			// the list of which is defined here: http://www.w3.org/TR/html5/forms.html#category-label
			return labelElement.querySelector('button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea');
		};


		/**
		 * On touch end, determine whether to send a click event at once.
		 *
		 * @param {Event} event
		 * @returns {boolean}
		 */
		FastClick.prototype.onTouchEnd = function(event) {
			var forElement, trackingClickStart, targetTagName, scrollParent, touch, targetElement = this.targetElement;

			if (!this.trackingClick) {
				return true;
			}

			// Prevent phantom clicks on fast double-tap (issue #36)
			if ((event.timeStamp - this.lastClickTime) < this.tapDelay) {
				this.cancelNextClick = true;
				return true;
			}

			if ((event.timeStamp - this.trackingClickStart) > this.tapTimeout) {
				return true;
			}

			// Reset to prevent wrong click cancel on input (issue #156).
			this.cancelNextClick = false;

			this.lastClickTime = event.timeStamp;

			trackingClickStart = this.trackingClickStart;
			this.trackingClick = false;
			this.trackingClickStart = 0;

			// On some iOS devices, the targetElement supplied with the event is invalid if the layer
			// is performing a transition or scroll, and has to be re-detected manually. Note that
			// for this to function correctly, it must be called *after* the event target is checked!
			// See issue #57; also filed as rdar://13048589 .
			if (deviceIsIOSWithBadTarget) {
				touch = event.changedTouches[0];

				// In certain cases arguments of elementFromPoint can be negative, so prevent setting targetElement to null
				targetElement = document.elementFromPoint(touch.pageX - window.pageXOffset, touch.pageY - window.pageYOffset) || targetElement;
				targetElement.fastClickScrollParent = this.targetElement.fastClickScrollParent;
			}

			targetTagName = targetElement.tagName.toLowerCase();
			if (targetTagName === 'label') {
				forElement = this.findControl(targetElement);
				if (forElement) {
					this.focus(targetElement);
					if (deviceIsAndroid) {
						return false;
					}

					targetElement = forElement;
				}
			} else if (this.needsFocus(targetElement)) {

				// Case 1: If the touch started a while ago (best guess is 100ms based on tests for issue #36) then focus will be triggered anyway. Return early and unset the target element reference so that the subsequent click will be allowed through.
				// Case 2: Without this exception for input elements tapped when the document is contained in an iframe, then any inputted text won't be visible even though the value attribute is updated as the user types (issue #37).
				if ((event.timeStamp - trackingClickStart) > 100 || (deviceIsIOS && window.top !== window && targetTagName === 'input')) {
					this.targetElement = null;
					return false;
				}

				this.focus(targetElement);
				this.sendClick(targetElement, event);

				// Select elements need the event to go through on iOS 4, otherwise the selector menu won't open.
				// Also this breaks opening selects when VoiceOver is active on iOS6, iOS7 (and possibly others)
				if (!deviceIsIOS || targetTagName !== 'select') {
					this.targetElement = null;
					event.preventDefault();
				}

				return false;
			}

			if (deviceIsIOS && !deviceIsIOS4) {

				// Don't send a synthetic click event if the target element is contained within a parent layer that was scrolled
				// and this tap is being used to stop the scrolling (usually initiated by a fling - issue #42).
				scrollParent = targetElement.fastClickScrollParent;
				if (scrollParent && scrollParent.fastClickLastScrollTop !== scrollParent.scrollTop) {
					return true;
				}
			}

			// Prevent the actual click from going though - unless the target node is marked as requiring
			// real clicks or if it is in the whitelist in which case only non-programmatic clicks are permitted.
			if (!this.needsClick(targetElement)) {
				event.preventDefault();
				this.sendClick(targetElement, event);
			}

			return false;
		};


		/**
		 * On touch cancel, stop tracking the click.
		 *
		 * @returns {void}
		 */
		FastClick.prototype.onTouchCancel = function() {
			this.trackingClick = false;
			this.targetElement = null;
		};


		/**
		 * Determine mouse events which should be permitted.
		 *
		 * @param {Event} event
		 * @returns {boolean}
		 */
		FastClick.prototype.onMouse = function(event) {

			// If a target element was never set (because a touch event was never fired) allow the event
			if (!this.targetElement) {
				return true;
			}

			if (event.forwardedTouchEvent) {
				return true;
			}

			// Programmatically generated events targeting a specific element should be permitted
			if (!event.cancelable) {
				return true;
			}

			// Derive and check the target element to see whether the mouse event needs to be permitted;
			// unless explicitly enabled, prevent non-touch click events from triggering actions,
			// to prevent ghost/doubleclicks.
			if (!this.needsClick(this.targetElement) || this.cancelNextClick) {

				// Prevent any user-added listeners declared on FastClick element from being fired.
				if (event.stopImmediatePropagation) {
					event.stopImmediatePropagation();
				} else {

					// Part of the hack for browsers that don't support Event#stopImmediatePropagation (e.g. Android 2)
					event.propagationStopped = true;
				}

				// Cancel the event
				event.stopPropagation();
				event.preventDefault();

				return false;
			}

			// If the mouse event is permitted, return true for the action to go through.
			return true;
		};


		/**
		 * On actual clicks, determine whether this is a touch-generated click, a click action occurring
		 * naturally after a delay after a touch (which needs to be cancelled to avoid duplication), or
		 * an actual click which should be permitted.
		 *
		 * @param {Event} event
		 * @returns {boolean}
		 */
		FastClick.prototype.onClick = function(event) {
			var permitted;

			// It's possible for another FastClick-like library delivered with third-party code to fire a click event before FastClick does (issue #44). In that case, set the click-tracking flag back to false and return early. This will cause onTouchEnd to return early.
			if (this.trackingClick) {
				this.targetElement = null;
				this.trackingClick = false;
				return true;
			}

			// Very odd behaviour on iOS (issue #18): if a submit element is present inside a form and the user hits enter in the iOS simulator or clicks the Go button on the pop-up OS keyboard the a kind of 'fake' click event will be triggered with the submit-type input element as the target.
			if (event.target.type === 'submit' && event.detail === 0) {
				return true;
			}

			permitted = this.onMouse(event);

			// Only unset targetElement if the click is not permitted. This will ensure that the check for !targetElement in onMouse fails and the browser's click doesn't go through.
			if (!permitted) {
				this.targetElement = null;
			}

			// If clicks are permitted, return true for the action to go through.
			return permitted;
		};


		/**
		 * Remove all FastClick's event listeners.
		 *
		 * @returns {void}
		 */
		FastClick.prototype.destroy = function() {
			var layer = this.layer;

			if (deviceIsAndroid) {
				layer.removeEventListener('mouseover', this.onMouse, true);
				layer.removeEventListener('mousedown', this.onMouse, true);
				layer.removeEventListener('mouseup', this.onMouse, true);
			}

			layer.removeEventListener('click', this.onClick, true);
			layer.removeEventListener('touchstart', this.onTouchStart, false);
			layer.removeEventListener('touchmove', this.onTouchMove, false);
			layer.removeEventListener('touchend', this.onTouchEnd, false);
			layer.removeEventListener('touchcancel', this.onTouchCancel, false);
		};


		/**
		 * Check whether FastClick is needed.
		 *
		 * @param {Element} layer The layer to listen on
		 */
		FastClick.notNeeded = function(layer) {
			var metaViewport;
			var chromeVersion;
			var blackberryVersion;
			var firefoxVersion;

			// Devices that don't support touch don't need FastClick
			if (typeof window.ontouchstart === 'undefined') {
				return true;
			}

			// Chrome version - zero for other browsers
			chromeVersion = +(/Chrome\/([0-9]+)/.exec(navigator.userAgent) || [,0])[1];

			if (chromeVersion) {

				if (deviceIsAndroid) {
					metaViewport = document.querySelector('meta[name=viewport]');

					if (metaViewport) {
						// Chrome on Android with user-scalable="no" doesn't need FastClick (issue #89)
						if (metaViewport.content.indexOf('user-scalable=no') !== -1) {
							return true;
						}
						// Chrome 32 and above with width=device-width or less don't need FastClick
						if (chromeVersion > 31 && document.documentElement.scrollWidth <= window.outerWidth) {
							return true;
						}
					}

				// Chrome desktop doesn't need FastClick (issue #15)
				} else {
					return true;
				}
			}

			if (deviceIsBlackBerry10) {
				blackberryVersion = navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/);

				// BlackBerry 10.3+ does not require Fastclick library.
				// https://github.com/ftlabs/fastclick/issues/251
				if (blackberryVersion[1] >= 10 && blackberryVersion[2] >= 3) {
					metaViewport = document.querySelector('meta[name=viewport]');

					if (metaViewport) {
						// user-scalable=no eliminates click delay.
						if (metaViewport.content.indexOf('user-scalable=no') !== -1) {
							return true;
						}
						// width=device-width (or less than device-width) eliminates click delay.
						if (document.documentElement.scrollWidth <= window.outerWidth) {
							return true;
						}
					}
				}
			}

			// IE10 with -ms-touch-action: none or manipulation, which disables double-tap-to-zoom (issue #97)
			if (layer.style.msTouchAction === 'none' || layer.style.touchAction === 'manipulation') {
				return true;
			}

			// Firefox version - zero for other browsers
			firefoxVersion = +(/Firefox\/([0-9]+)/.exec(navigator.userAgent) || [,0])[1];

			if (firefoxVersion >= 27) {
				// Firefox 27+ does not have tap delay if the content is not zoomable - https://bugzilla.mozilla.org/show_bug.cgi?id=922896

				metaViewport = document.querySelector('meta[name=viewport]');
				if (metaViewport && (metaViewport.content.indexOf('user-scalable=no') !== -1 || document.documentElement.scrollWidth <= window.outerWidth)) {
					return true;
				}
			}

			// IE11: prefixed -ms-touch-action is no longer supported and it's recomended to use non-prefixed version
			// http://msdn.microsoft.com/en-us/library/windows/apps/Hh767313.aspx
			if (layer.style.touchAction === 'none' || layer.style.touchAction === 'manipulation') {
				return true;
			}

			return false;
		};


		/**
		 * Factory method for creating a FastClick object
		 *
		 * @param {Element} layer The layer to listen on
		 * @param {Object} [options={}] The options to override the defaults
		 */
		FastClick.attach = function(layer, options) {
			return new FastClick(layer, options);
		};


		if (true) {

			// AMD. Register as an anonymous module.
			!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
				return FastClick;
			}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else if (typeof module !== 'undefined' && module.exports) {
			module.exports = FastClick.attach;
			module.exports.FastClick = FastClick;
		} else {
			window.FastClick = FastClick;
		}
	}());


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _dialog = __webpack_require__(3);

	var _dialog2 = _interopRequireDefault(_dialog);

	var _alert = __webpack_require__(9);

	var _alert2 = _interopRequireDefault(_alert);

	var _confirm = __webpack_require__(10);

	var _confirm2 = _interopRequireDefault(_confirm);

	var _toast = __webpack_require__(11);

	var _toast2 = _interopRequireDefault(_toast);

	var _loading = __webpack_require__(13);

	var _loading2 = _interopRequireDefault(_loading);

	var _actionSheet = __webpack_require__(15);

	var _actionSheet2 = _interopRequireDefault(_actionSheet);

	var _topTips = __webpack_require__(17);

	var _topTips2 = _interopRequireDefault(_topTips);

	var _searchBar = __webpack_require__(19);

	var _searchBar2 = _interopRequireDefault(_searchBar);

	var _tab = __webpack_require__(20);

	var _tab2 = _interopRequireDefault(_tab);

	var _form = __webpack_require__(21);

	var _form2 = _interopRequireDefault(_form);

	var _uploader = __webpack_require__(22);

	var _uploader2 = _interopRequireDefault(_uploader);

	var _picker = __webpack_require__(26);

	var _gallery = __webpack_require__(32);

	var _gallery2 = _interopRequireDefault(_gallery);

	var _slider = __webpack_require__(34);

	var _slider2 = _interopRequireDefault(_slider);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/*
	* Tencent is pleased to support the open source community by making WeUI.js available.
	* 
	* Copyright (C) 2017 THL A29 Limited, a Tencent company. All rights reserved.
	* 
	* Licensed under the MIT License (the "License"); you may not use this file except in compliance
	* with the License. You may obtain a copy of the License at
	* 
	*       http://opensource.org/licenses/MIT
	* 
	* Unless required by applicable law or agreed to in writing, software distributed under the License is
	* distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND,
	* either express or implied. See the License for the specific language governing permissions and
	* limitations under the License.
	*/

	exports.default = {
	    dialog: _dialog2.default,
	    alert: _alert2.default,
	    confirm: _confirm2.default,
	    toast: _toast2.default,
	    loading: _loading2.default,
	    actionSheet: _actionSheet2.default,
	    topTips: _topTips2.default,
	    searchBar: _searchBar2.default,
	    tab: _tab2.default,
	    form: _form2.default,
	    uploader: _uploader2.default,
	    picker: _picker.picker,
	    datePicker: _picker.datePicker,
	    gallery: _gallery2.default,
	    slider: _slider2.default
	};
	module.exports = exports['default'];

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _util = __webpack_require__(4);

	var _util2 = _interopRequireDefault(_util);

	var _dialog = __webpack_require__(8);

	var _dialog2 = _interopRequireDefault(_dialog);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/*
	* Tencent is pleased to support the open source community by making WeUI.js available.
	* 
	* Copyright (C) 2017 THL A29 Limited, a Tencent company. All rights reserved.
	* 
	* Licensed under the MIT License (the "License"); you may not use this file except in compliance
	* with the License. You may obtain a copy of the License at
	* 
	*       http://opensource.org/licenses/MIT
	* 
	* Unless required by applicable law or agreed to in writing, software distributed under the License is
	* distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND,
	* either express or implied. See the License for the specific language governing permissions and
	* limitations under the License.
	*/

	var _sington = void 0;

	/**
	 * dialog，弹窗，alert和confirm的父类
	 *
	 * @param {object=} options 配置项
	 * @param {string=} options.title 弹窗的标题
	 * @param {string=} options.content 弹窗的内容
	 * @param {string=} options.className 弹窗的自定义类名
	 * @param {array=} options.buttons 按钮配置项
	 *
	 * @param {string} [options.buttons[].label=确定] 按钮的文字
	 * @param {string} [options.buttons[].type=primary] 按钮的类型 [primary, default]
	 * @param {function} [options.buttons[].onClick=$.noop] 按钮的回调
	 *
	 * @example
	 * weui.dialog({
	 *     title: 'dialog标题',
	 *     content: 'dialog内容',
	 *     className: 'custom-classname',
	 *     buttons: [{
	 *         label: '取消',
	 *         type: 'default',
	 *         onClick: function () { alert('取消') }
	 *     }, {
	 *         label: '确定',
	 *         type: 'primary',
	 *         onClick: function () { alert('确定') }
	 *     }]
	 * });
	 * 
	 * // 主动关闭
	 * var $dialog = weui.dialog({...});
	 * $dialog.hide(function(){
	 *      console.log('`dialog` has been hidden');
	 * });
	 */
	function dialog() {
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	    if (_sington) return _sington;

	    var isAndroid = _util2.default.os.android;
	    options = _util2.default.extend({
	        title: null,
	        content: '',
	        className: '',
	        buttons: [{
	            label: '确定',
	            type: 'primary',
	            onClick: _util2.default.noop
	        }],
	        isAndroid: isAndroid
	    }, options);

	    var $dialogWrap = (0, _util2.default)(_util2.default.render(_dialog2.default, options));
	    var $dialog = $dialogWrap.find('.weui-dialog');
	    var $mask = $dialogWrap.find('.weui-mask');

	    function _hide(callback) {
	        _hide = _util2.default.noop; // 防止二次调用导致报错

	        $mask.addClass('weui-animate-fade-out');
	        $dialog.addClass('weui-animate-fade-out').on('animationend webkitAnimationEnd', function () {
	            $dialogWrap.remove();
	            _sington = false;
	            callback && callback();
	        });
	    }
	    function hide(callback) {
	        _hide(callback);
	    }

	    (0, _util2.default)('body').append($dialogWrap);
	    // 不能直接把.weui-animate-fade-in加到$dialog，会导致mask的z-index有问题
	    $mask.addClass('weui-animate-fade-in');
	    $dialog.addClass('weui-animate-fade-in');

	    $dialogWrap.on('click', '.weui-dialog__btn', function (evt) {
	        var index = (0, _util2.default)(this).index();
	        if (options.buttons[index].onClick) {
	            if (options.buttons[index].onClick.call(this, evt) !== false) hide();
	        } else {
	            hide();
	        }
	    });

	    _sington = $dialogWrap[0];
	    _sington.hide = hide;
	    return _sington;
	}
	exports.default = dialog;
	module.exports = exports['default'];

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /*
	                                                                                                                                                                                                                                                                              * Tencent is pleased to support the open source community by making WeUI.js available.
	                                                                                                                                                                                                                                                                              * 
	                                                                                                                                                                                                                                                                              * Copyright (C) 2017 THL A29 Limited, a Tencent company. All rights reserved.
	                                                                                                                                                                                                                                                                              * 
	                                                                                                                                                                                                                                                                              * Licensed under the MIT License (the "License"); you may not use this file except in compliance
	                                                                                                                                                                                                                                                                              * with the License. You may obtain a copy of the License at
	                                                                                                                                                                                                                                                                              * 
	                                                                                                                                                                                                                                                                              *       http://opensource.org/licenses/MIT
	                                                                                                                                                                                                                                                                              * 
	                                                                                                                                                                                                                                                                              * Unless required by applicable law or agreed to in writing, software distributed under the License is
	                                                                                                                                                                                                                                                                              * distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND,
	                                                                                                                                                                                                                                                                              * either express or implied. See the License for the specific language governing permissions and
	                                                                                                                                                                                                                                                                              * limitations under the License.
	                                                                                                                                                                                                                                                                              */

	__webpack_require__(5);

	var _objectAssign = __webpack_require__(6);

	var _objectAssign2 = _interopRequireDefault(_objectAssign);

	var _balajs = __webpack_require__(7);

	var _balajs2 = _interopRequireDefault(_balajs);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// 其实，$ 的原型就是一个数组，拥有数组的各种方法
	// 这里只是库内部使用，所以通过文档约束，不做容错校验，达到代码最小化

	/* 判断系统 */
	function _detect(ua) {
	    var os = this.os = {},
	        android = ua.match(/(Android);?[\s\/]+([\d.]+)?/);
	    if (android) {
	        os.android = true;
	        os.version = android[2];
	    }
	}
	_detect.call(_balajs2.default, navigator.userAgent);

	(0, _objectAssign2.default)(_balajs2.default.fn, {
	    /**
	     * 只能是一个 HTMLElement 元素或者 HTMLElement 数组，不支持字符串
	     * @param {Element|Element[]} $child
	     * @returns {append}
	     */
	    append: function append($child) {
	        if (!($child instanceof HTMLElement)) {
	            $child = $child[0];
	        }
	        this.forEach(function ($element) {
	            $element.appendChild($child);
	        });
	        return this;
	    },
	    /**
	     *
	     * @returns {remove}
	     */
	    remove: function remove() {
	        this.forEach(function ($element) {
	            $element.parentNode.removeChild($element);
	        });
	        return this;
	    },
	    /**
	     *
	     * @param selector
	     * @returns {HTMLElement}
	     */
	    find: function find(selector) {
	        return (0, _balajs2.default)(selector, this);
	    },
	    /**
	     *
	     * @param {String} className
	     * @returns {addClass}
	     */
	    addClass: function addClass(className) {
	        this.forEach(function ($element) {
	            // http://caniuse.com/#search=classList
	            $element.classList.add(className);
	        });
	        return this;
	    },
	    /**
	     *
	     * @param {String} className
	     * @returns {removeClass}
	     */
	    removeClass: function removeClass(className) {
	        this.forEach(function ($element) {
	            // http://caniuse.com/#search=classList
	            $element.classList.remove(className);
	        });
	        return this;
	    },
	    /**
	     *
	     * @param index
	     * @returns {*|jQuery|HTMLElement}
	     */
	    eq: function eq(index) {
	        return (0, _balajs2.default)(this[index]);
	    },
	    /**
	     *
	     * @returns {show}
	     */
	    show: function show() {
	        this.forEach(function ($element) {
	            $element.style.display = 'block';
	        });
	        return this;
	    },
	    /**
	     *
	     * @returns {hide}
	     */
	    hide: function hide() {
	        this.forEach(function ($element) {
	            $element.style.display = 'none';
	        });
	        return this;
	    },
	    /**
	     *
	     * @param html 目前只能接受字符串
	     * @returns {html}
	     */
	    html: function html(_html) {
	        this.forEach(function ($element) {
	            $element.innerHTML = _html;
	        });
	        return this;
	    },
	    /**
	     *
	     * @param {Object} obj 目前只能接受object
	     * @returns {css}
	     */
	    css: function css(obj) {
	        var _this = this;

	        Object.keys(obj).forEach(function (key) {
	            _this.forEach(function ($element) {
	                $element.style[key] = obj[key];
	            });
	        });
	        return this;
	    },
	    /**
	     *
	     * @param eventType
	     * @param selector
	     * @param handler
	     */
	    on: function on(eventType, selector, handler) {
	        var isDelegate = typeof selector === 'string' && typeof handler === 'function';
	        if (!isDelegate) {
	            handler = selector;
	        }
	        this.forEach(function ($element) {
	            eventType.split(' ').forEach(function (event) {
	                $element.addEventListener(event, function (evt) {
	                    if (isDelegate) {
	                        // http://caniuse.com/#search=closest
	                        if (this.contains(evt.target.closest(selector))) {
	                            handler.call(evt.target, evt);
	                        }
	                    } else {
	                        handler.call(this, evt);
	                    }
	                });
	            });
	        });
	        return this;
	    },
	    /**
	     *
	     * @param {String} eventType
	     * @param {String|Function} selector
	     * @param {Function=} handler
	     * @returns {off}
	     */
	    off: function off(eventType, selector, handler) {
	        if (typeof selector === 'function') {
	            handler = selector;
	            selector = null;
	        }

	        this.forEach(function ($element) {
	            eventType.split(' ').forEach(function (event) {
	                if (typeof selector === 'string') {
	                    $element.querySelectorAll(selector).forEach(function ($element) {
	                        $element.removeEventListener(event, handler);
	                    });
	                } else {
	                    $element.removeEventListener(event, handler);
	                }
	            });
	        });
	        return this;
	    },
	    /**
	     *
	     * @returns {Number}
	     */
	    index: function index() {
	        var $element = this[0];
	        var $parent = $element.parentNode;
	        return Array.prototype.indexOf.call($parent.children, $element);
	    },
	    /**
	     * @desc 因为off方法目前不可以移除绑定的匿名函数，现在直接暴力移除所有listener
	     * @returns {offAll}
	     */
	    offAll: function offAll() {
	        var _this2 = this;

	        this.forEach(function ($element, index) {
	            var clone = $element.cloneNode(true);
	            $element.parentNode.replaceChild(clone, $element);

	            _this2[index] = clone;
	        });
	        return this;
	    },
	    /**
	     *
	     * @returns {*}
	     */
	    val: function val() {
	        var _arguments = arguments;

	        if (arguments.length) {
	            this.forEach(function ($element) {
	                $element.value = _arguments[0];
	            });
	            return this;
	        }
	        return this[0].value;
	    },
	    /**
	     *
	     * @returns {*}
	     */
	    attr: function attr() {
	        var _arguments2 = arguments;

	        if (_typeof(arguments[0]) == 'object') {
	            var attrsObj = arguments[0];
	            var that = this;
	            Object.keys(attrsObj).forEach(function (attr) {
	                that.forEach(function ($element) {
	                    $element.setAttribute(attr, attrsObj[attr]);
	                });
	            });
	            return this;
	        }

	        if (typeof arguments[0] == 'string' && arguments.length < 2) {
	            return this[0].getAttribute(arguments[0]);
	        }

	        this.forEach(function ($element) {
	            $element.setAttribute(_arguments2[0], _arguments2[1]);
	        });
	        return this;
	    }
	});

	(0, _objectAssign2.default)(_balajs2.default, {
	    extend: _objectAssign2.default,
	    /**
	     * noop
	     */
	    noop: function noop() {},
	    /**
	     * render
	     * 取值：<%= variable %>
	     * 表达式：<% if {} %>
	     * 例子：
	     *  <div>
	     *    <div class="weui-mask"></div>
	     *    <div class="weui-dialog">
	     *    <% if(typeof title === 'string'){ %>
	     *           <div class="weui-dialog__hd"><strong class="weui-dialog__title"><%=title%></strong></div>
	     *    <% } %>
	     *    <div class="weui-dialog__bd"><%=content%></div>
	     *    <div class="weui-dialog__ft">
	     *    <% for(var i = 0; i < buttons.length; i++){ %>
	     *        <a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_<%=buttons[i]['type']%>"><%=buttons[i]['label']%></a>
	     *    <% } %>
	     *    </div>
	     *    </div>
	     *  </div>
	     * A very simple template engine
	     * @param {String} tpl
	     * @param {Object=} data
	     * @returns {String}
	     */
	    render: function render(tpl, data) {
	        var code = 'var p=[];with(this){p.push(\'' + tpl.replace(/[\r\t\n]/g, ' ').split('<%').join('\t').replace(/((^|%>)[^\t]*)'/g, '$1\r').replace(/\t=(.*?)%>/g, '\',$1,\'').split('\t').join('\');').split('%>').join('p.push(\'').split('\r').join('\\\'') + '\');}return p.join(\'\');';
	        return new Function(code).apply(data);
	    },
	    /**
	     * getStyle 获得元素计算后的样式值
	     * (from http://stackoverflow.com/questions/2664045/how-to-get-an-html-elements-style-values-in-javascript)
	     */
	    getStyle: function getStyle(el, styleProp) {
	        var value,
	            defaultView = (el.ownerDocument || document).defaultView;
	        // W3C standard way:
	        if (defaultView && defaultView.getComputedStyle) {
	            // sanitize property name to css notation
	            // (hypen separated words eg. font-Size)
	            styleProp = styleProp.replace(/([A-Z])/g, '-$1').toLowerCase();
	            return defaultView.getComputedStyle(el, null).getPropertyValue(styleProp);
	        } else if (el.currentStyle) {
	            // IE
	            // sanitize property name to camelCase
	            styleProp = styleProp.replace(/\-(\w)/g, function (str, letter) {
	                return letter.toUpperCase();
	            });
	            value = el.currentStyle[styleProp];
	            // convert other units to pixels on IE
	            if (/^\d+(em|pt|%|ex)?$/i.test(value)) {
	                return function (value) {
	                    var oldLeft = el.style.left,
	                        oldRsLeft = el.runtimeStyle.left;
	                    el.runtimeStyle.left = el.currentStyle.left;
	                    el.style.left = value || 0;
	                    value = el.style.pixelLeft + 'px';
	                    el.style.left = oldLeft;
	                    el.runtimeStyle.left = oldRsLeft;
	                    return value;
	                }(value);
	            }
	            return value;
	        }
	    }
	});

	exports.default = _balajs2.default;
	module.exports = exports['default'];

/***/ }),
/* 5 */
/***/ (function(module, exports) {

	// element-closest | CC0-1.0 | github.com/jonathantneal/closest

	(function (ElementProto) {
		if (typeof ElementProto.matches !== 'function') {
			ElementProto.matches = ElementProto.msMatchesSelector || ElementProto.mozMatchesSelector || ElementProto.webkitMatchesSelector || function matches(selector) {
				var element = this;
				var elements = (element.document || element.ownerDocument).querySelectorAll(selector);
				var index = 0;

				while (elements[index] && elements[index] !== element) {
					++index;
				}

				return Boolean(elements[index]);
			};
		}

		if (typeof ElementProto.closest !== 'function') {
			ElementProto.closest = function closest(selector) {
				var element = this;

				while (element && element.nodeType === 1) {
					if (element.matches(selector)) {
						return element;
					}

					element = element.parentNode;
				}

				return null;
			};
		}
	})(window.Element.prototype);


/***/ }),
/* 6 */
/***/ (function(module, exports) {

	/*
	object-assign
	(c) Sindre Sorhus
	@license MIT
	*/

	'use strict';
	/* eslint-disable no-unused-vars */
	var getOwnPropertySymbols = Object.getOwnPropertySymbols;
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	var propIsEnumerable = Object.prototype.propertyIsEnumerable;

	function toObject(val) {
		if (val === null || val === undefined) {
			throw new TypeError('Object.assign cannot be called with null or undefined');
		}

		return Object(val);
	}

	function shouldUseNative() {
		try {
			if (!Object.assign) {
				return false;
			}

			// Detect buggy property enumeration order in older V8 versions.

			// https://bugs.chromium.org/p/v8/issues/detail?id=4118
			var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
			test1[5] = 'de';
			if (Object.getOwnPropertyNames(test1)[0] === '5') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test2 = {};
			for (var i = 0; i < 10; i++) {
				test2['_' + String.fromCharCode(i)] = i;
			}
			var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
				return test2[n];
			});
			if (order2.join('') !== '0123456789') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test3 = {};
			'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
				test3[letter] = letter;
			});
			if (Object.keys(Object.assign({}, test3)).join('') !==
					'abcdefghijklmnopqrst') {
				return false;
			}

			return true;
		} catch (err) {
			// We don't expect any of the above to throw, but better to be safe.
			return false;
		}
	}

	module.exports = shouldUseNative() ? Object.assign : function (target, source) {
		var from;
		var to = toObject(target);
		var symbols;

		for (var s = 1; s < arguments.length; s++) {
			from = Object(arguments[s]);

			for (var key in from) {
				if (hasOwnProperty.call(from, key)) {
					to[key] = from[key];
				}
			}

			if (getOwnPropertySymbols) {
				symbols = getOwnPropertySymbols(from);
				for (var i = 0; i < symbols.length; i++) {
					if (propIsEnumerable.call(from, symbols[i])) {
						to[symbols[i]] = from[symbols[i]];
					}
				}
			}
		}

		return to;
	};


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function(root, $) {
		$ = (function(document, s_addEventListener, s_querySelectorAll) {
			function $(s, context, bala) {
				bala = Object.create($.fn);

				s && bala.push.apply(bala, // if s is truly then push the following
					s[s_addEventListener] // if arg is node or window,
						? [s] // then pass [s]
						: "" + s === s // else if arg is a string
							? /</.test(s) // if the string contains "<" (if HTML code is passed)
								// then parse it and return node.children
								// use 'addEventListener' (HTMLUnknownElement) if content is not presented
								? ((context = document.createElement(context || s_addEventListener)).innerHTML = s
									, context.children)
								: context // else if context is truly
									? ((context = $(context)[0]) // if context element is found
										? context[s_querySelectorAll](s) // then select element from context
										: bala) // else pass [] (context isn't found)
									: document[s_querySelectorAll](s) // else select elements globally
							: typeof s == 'function' // else if function is passed
								// if DOM is ready
								// readyState[7] means readyState value is "interactive" or "complete" (not "loading")
								? document.readyState[7]
									? s() // then run given function
									: document[s_addEventListener]('DOMContentLoaded', s) // else wait for DOM ready
								: s); // else guessing that s variable is array-like Object

				return bala;
			}

			$.fn = [];

			$.one = function(s, context) {
				return $(s, context)[0] || null;
			};

			return $;
		})(document, 'addEventListener', 'querySelectorAll');


		if (true) {
			!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
				return $;
			}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else if (typeof module == 'object' && module.exports) {
			module.exports = $;
		} else {
			root.$ = $;
		}
	})(this);


/***/ }),
/* 8 */
/***/ (function(module, exports) {

	module.exports = "<div class=\"<%=className%>\"> <div class=weui-mask></div> <div class=\"weui-dialog <% if(isAndroid){ %> weui-skin_android <% } %>\"> <% if(title){ %> <div class=weui-dialog__hd><strong class=weui-dialog__title><%=title%></strong></div> <% } %> <div class=weui-dialog__bd><%=content%></div> <div class=weui-dialog__ft> <% for(var i = 0; i < buttons.length; i++){ %> <a href=javascript:; class=\"weui-dialog__btn weui-dialog__btn_<%=buttons[i]['type']%>\"><%=buttons[i]['label']%></a> <% } %> </div> </div> </div> ";

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /*
	                                                                                                                                                                                                                                                                              * Tencent is pleased to support the open source community by making WeUI.js available.
	                                                                                                                                                                                                                                                                              * 
	                                                                                                                                                                                                                                                                              * Copyright (C) 2017 THL A29 Limited, a Tencent company. All rights reserved.
	                                                                                                                                                                                                                                                                              * 
	                                                                                                                                                                                                                                                                              * Licensed under the MIT License (the "License"); you may not use this file except in compliance
	                                                                                                                                                                                                                                                                              * with the License. You may obtain a copy of the License at
	                                                                                                                                                                                                                                                                              * 
	                                                                                                                                                                                                                                                                              *       http://opensource.org/licenses/MIT
	                                                                                                                                                                                                                                                                              * 
	                                                                                                                                                                                                                                                                              * Unless required by applicable law or agreed to in writing, software distributed under the License is
	                                                                                                                                                                                                                                                                              * distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND,
	                                                                                                                                                                                                                                                                              * either express or implied. See the License for the specific language governing permissions and
	                                                                                                                                                                                                                                                                              * limitations under the License.
	                                                                                                                                                                                                                                                                              */

	var _util = __webpack_require__(4);

	var _util2 = _interopRequireDefault(_util);

	var _dialog = __webpack_require__(3);

	var _dialog2 = _interopRequireDefault(_dialog);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * alert 警告弹框，功能类似于浏览器自带的 alert 弹框，用于提醒、警告用户简单扼要的信息，只有一个“确认”按钮，点击“确认”按钮后关闭弹框。
	 * @param {string} content 弹窗内容
	 * @param {function=} yes 点击确定按钮的回调
	 * @param {object=} options 配置项
	 * @param {string=} options.title 弹窗的标题
	 * @param {string=} options.className 自定义类名
	 * @param {array=} options.buttons 按钮配置项，详情参考dialog
	 *
	 * @example
	 * weui.alert('普通的alert');
	 * weui.alert('带回调的alert', function(){ console.log('ok') });
	 * var alertDom = weui.alert('手动关闭的alert', function(){
	 *     return false; // 不关闭弹窗，可用alertDom.hide()来手动关闭
	 * });
	 * weui.alert('自定义标题的alert', { title: '自定义标题' });
	 * weui.alert('带回调的自定义标题的alert', function(){
	 *    console.log('ok')
	 * }, {
	 *    title: '自定义标题'
	 * });
	 * weui.alert('自定义按钮的alert', {
	 *     title: '自定义按钮的alert',
	 *     buttons: [{
	 *         label: 'OK',
	 *         type: 'primary',
	 *         onClick: function(){ console.log('ok') }
	 *     }]
	 * });
	 *
	 * // 多次使用
	 * var alert = weui.alert('hello');
	 * alert.hide(function(){
	 *     weui.alert('world');
	 * });
	 */
	function alert() {
	    var content = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	    var yes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _util2.default.noop;
	    var options = arguments[2];

	    if ((typeof yes === 'undefined' ? 'undefined' : _typeof(yes)) === 'object') {
	        options = yes;
	        yes = _util2.default.noop;
	    }

	    options = _util2.default.extend({
	        content: content,
	        buttons: [{
	            label: '确定',
	            type: 'primary',
	            onClick: yes
	        }]
	    }, options);

	    return (0, _dialog2.default)(options);
	}
	exports.default = alert;
	module.exports = exports['default'];

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /*
	                                                                                                                                                                                                                                                                              * Tencent is pleased to support the open source community by making WeUI.js available.
	                                                                                                                                                                                                                                                                              * 
	                                                                                                                                                                                                                                                                              * Copyright (C) 2017 THL A29 Limited, a Tencent company. All rights reserved.
	                                                                                                                                                                                                                                                                              * 
	                                                                                                                                                                                                                                                                              * Licensed under the MIT License (the "License"); you may not use this file except in compliance
	                                                                                                                                                                                                                                                                              * with the License. You may obtain a copy of the License at
	                                                                                                                                                                                                                                                                              * 
	                                                                                                                                                                                                                                                                              *       http://opensource.org/licenses/MIT
	                                                                                                                                                                                                                                                                              * 
	                                                                                                                                                                                                                                                                              * Unless required by applicable law or agreed to in writing, software distributed under the License is
	                                                                                                                                                                                                                                                                              * distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND,
	                                                                                                                                                                                                                                                                              * either express or implied. See the License for the specific language governing permissions and
	                                                                                                                                                                                                                                                                              * limitations under the License.
	                                                                                                                                                                                                                                                                              */

	var _util = __webpack_require__(4);

	var _util2 = _interopRequireDefault(_util);

	var _dialog = __webpack_require__(3);

	var _dialog2 = _interopRequireDefault(_dialog);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * 确认弹窗
	 * @param {string} content 弹窗内容
	 * @param {function=} yes 点击确定按钮的回调
	 * @param {function=} no  点击取消按钮的回调
	 * @param {object=} options 配置项
	 * @param {string=} options.title 弹窗的标题
	 * @param {string=} options.className 自定义类名
	 * @param {array=} options.buttons 按钮配置项，详情参考dialog
	 *
	 * @example
	 * weui.confirm('普通的confirm');
	 * weui.confirm('自定义标题的confirm', { title: '自定义标题' });
	 * weui.confirm('带回调的confirm', function(){ console.log('yes') }, function(){ console.log('no') });
	 * var confirmDom = weui.confirm('手动关闭的confirm', function(){
	 *     return false; // 不关闭弹窗，可用confirmDom.hide()来手动关闭
	 * });
	 * weui.confirm('带回调的自定义标题的confirm', function(){ console.log('yes') }, function(){ console.log('no') }, {
	 *     title: '自定义标题'
	 * });
	 * weui.confirm('自定义按钮的confirm', {
	 *     title: '自定义按钮的confirm',
	 *     buttons: [{
	 *         label: 'NO',
	 *         type: 'default',
	 *         onClick: function(){ console.log('no') }
	 *     }, {
	 *         label: 'YES',
	 *         type: 'primary',
	 *         onClick: function(){ console.log('yes') }
	 *     }]
	 * });
	 */
	function confirm() {
	    var content = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	    var yes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _util2.default.noop;
	    var no = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _util2.default.noop;
	    var options = arguments[3];

	    if ((typeof yes === 'undefined' ? 'undefined' : _typeof(yes)) === 'object') {
	        options = yes;
	        yes = _util2.default.noop;
	    } else if ((typeof no === 'undefined' ? 'undefined' : _typeof(no)) === 'object') {
	        options = no;
	        no = _util2.default.noop;
	    }

	    options = _util2.default.extend({
	        content: content,
	        buttons: [{
	            label: '取消',
	            type: 'default',
	            onClick: no
	        }, {
	            label: '确定',
	            type: 'primary',
	            onClick: yes
	        }]
	    }, options);

	    return (0, _dialog2.default)(options);
	}
	exports.default = confirm;
	module.exports = exports['default'];

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _util = __webpack_require__(4);

	var _util2 = _interopRequireDefault(_util);

	var _toast = __webpack_require__(12);

	var _toast2 = _interopRequireDefault(_toast);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/*
	* Tencent is pleased to support the open source community by making WeUI.js available.
	* 
	* Copyright (C) 2017 THL A29 Limited, a Tencent company. All rights reserved.
	* 
	* Licensed under the MIT License (the "License"); you may not use this file except in compliance
	* with the License. You may obtain a copy of the License at
	* 
	*       http://opensource.org/licenses/MIT
	* 
	* Unless required by applicable law or agreed to in writing, software distributed under the License is
	* distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND,
	* either express or implied. See the License for the specific language governing permissions and
	* limitations under the License.
	*/

	var _sington = void 0;

	/**
	 * toast 一般用于操作成功时的提示场景
	 * @param {string} content toast的文字
	 * @param {Object|function=} options 配置项或回调
	 * @param {number=} [options.duration=3000] 多少毫秒后关闭toast
	 * @param {function=} options.callback 关闭后的回调
	 * @param {string=} options.className 自定义类名
	 *
	 * @example
	 * weui.toast('操作成功', 3000);
	 * weui.toast('操作成功', {
	 *     duration: 3000,
	 *     className: 'custom-classname',
	 *     callback: function(){ console.log('close') }
	 * });
	 */
	function toast() {
	    var content = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	    if (_sington) return _sington;

	    if (typeof options === 'number') {
	        options = {
	            duration: options
	        };
	    }
	    if (typeof options === 'function') {
	        options = {
	            callback: options
	        };
	    }

	    options = _util2.default.extend({
	        content: content,
	        duration: 3000,
	        callback: _util2.default.noop,
	        className: ''
	    }, options);

	    var $toastWrap = (0, _util2.default)(_util2.default.render(_toast2.default, options));
	    var $toast = $toastWrap.find('.weui-toast');
	    var $mask = $toastWrap.find('.weui-mask');

	    (0, _util2.default)('body').append($toastWrap);
	    $toast.addClass('weui-animate-fade-in');
	    $mask.addClass('weui-animate-fade-in');

	    setTimeout(function () {
	        $mask.addClass('weui-animate-fade-out');
	        $toast.addClass('weui-animate-fade-out').on('animationend webkitAnimationEnd', function () {
	            $toastWrap.remove();
	            _sington = false;
	            options.callback();
	        });
	    }, options.duration);

	    _sington = $toastWrap[0];
	    return $toastWrap[0];
	}
	exports.default = toast;
	module.exports = exports['default'];

/***/ }),
/* 12 */
/***/ (function(module, exports) {

	module.exports = "<div class=\"<%= className %>\"> <div class=weui-mask_transparent></div> <div class=weui-toast> <i class=\"weui-icon_toast weui-icon-success-no-circle\"></i> <p class=weui-toast__content><%=content%></p> </div> </div> ";

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _util = __webpack_require__(4);

	var _util2 = _interopRequireDefault(_util);

	var _loading = __webpack_require__(14);

	var _loading2 = _interopRequireDefault(_loading);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/*
	* Tencent is pleased to support the open source community by making WeUI.js available.
	* 
	* Copyright (C) 2017 THL A29 Limited, a Tencent company. All rights reserved.
	* 
	* Licensed under the MIT License (the "License"); you may not use this file except in compliance
	* with the License. You may obtain a copy of the License at
	* 
	*       http://opensource.org/licenses/MIT
	* 
	* Unless required by applicable law or agreed to in writing, software distributed under the License is
	* distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND,
	* either express or implied. See the License for the specific language governing permissions and
	* limitations under the License.
	*/

	var _sington = void 0;

	/**
	 * loading
	 * @param {string} content loading的文字
	 * @param {object=} options 配置项
	 * @param {string=} options.className 自定义类名
	 *
	 * @example
	 * var loading = weui.loading('loading', {
	 *     className: 'custom-classname'
	 * });
	 * setTimeout(function () {
	 *     loading.hide(function() {
	 *          console.log('`loading` has been hidden');
	 *      });
	 * }, 3000);
	 */
	function loading() {
	    var content = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	    if (_sington) return _sington;

	    options = _util2.default.extend({
	        content: content,
	        className: ''
	    }, options);

	    var $loadingWrap = (0, _util2.default)(_util2.default.render(_loading2.default, options));
	    var $loading = $loadingWrap.find('.weui-toast');
	    var $mask = $loadingWrap.find('.weui-mask');

	    function _hide(callback) {
	        _hide = _util2.default.noop; // 防止二次调用导致报错

	        $mask.addClass('weui-animate-fade-out');
	        $loading.addClass('weui-animate-fade-out').on('animationend webkitAnimationEnd', function () {
	            $loadingWrap.remove();
	            _sington = false;
	            callback && callback();
	        });
	    }
	    function hide(callback) {
	        _hide(callback);
	    }

	    (0, _util2.default)('body').append($loadingWrap);
	    $loading.addClass('weui-animate-fade-in');
	    $mask.addClass('weui-animate-fade-in');

	    _sington = $loadingWrap[0];
	    _sington.hide = hide;
	    return _sington;
	}
	exports.default = loading;
	module.exports = exports['default'];

/***/ }),
/* 14 */
/***/ (function(module, exports) {

	module.exports = "<div class=\"weui-loading_toast <%= className %>\"> <div class=weui-mask_transparent></div> <div class=weui-toast> <i class=\"weui-loading weui-icon_toast\"></i> <p class=weui-toast__content><%=content%></p> </div> </div> ";

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _util = __webpack_require__(4);

	var _util2 = _interopRequireDefault(_util);

	var _actionSheet = __webpack_require__(16);

	var _actionSheet2 = _interopRequireDefault(_actionSheet);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/*
	* Tencent is pleased to support the open source community by making WeUI.js available.
	* 
	* Copyright (C) 2017 THL A29 Limited, a Tencent company. All rights reserved.
	* 
	* Licensed under the MIT License (the "License"); you may not use this file except in compliance
	* with the License. You may obtain a copy of the License at
	* 
	*       http://opensource.org/licenses/MIT
	* 
	* Unless required by applicable law or agreed to in writing, software distributed under the License is
	* distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND,
	* either express or implied. See the License for the specific language governing permissions and
	* limitations under the License.
	*/

	var _sington = void 0;

	/**
	 * actionsheet 弹出式菜单
	 * @param {array} menus 上层的选项
	 * @param {string} menus[].label 选项的文字
	 * @param {function} menus[].onClick 选项点击时的回调
	 *
	 * @param {array} actions 下层的选项
	 * @param {string} actions[].label 选项的文字
	 * @param {function} actions[].onClick 选项点击时的回调
	 *
	 * @param {object=} options 配置项
	 * @param {string=} options.className 自定义类名
	 * @param {function=} [options.onClose] actionSheet关闭后的回调
	 *
	 * @example
	 * weui.actionSheet([
	 *     {
	 *         label: '拍照',
	 *         onClick: function () {
	 *             console.log('拍照');
	 *         }
	 *     }, {
	 *         label: '从相册选择',
	 *         onClick: function () {
	 *             console.log('从相册选择');
	 *         }
	 *     }, {
	 *         label: '其他',
	 *         onClick: function () {
	 *             console.log('其他');
	 *         }
	 *     }
	 * ], [
	 *     {
	 *         label: '取消',
	 *         onClick: function () {
	 *             console.log('取消');
	 *         }
	 *     }
	 * ], {
	 *     className: 'custom-classname',
	 *     onClose: function(){
	 *         console.log('关闭');
	 *     }
	 * });
	 */
	function actionSheet() {
	    var menus = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
	    var actions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
	    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

	    if (_sington) return _sington;

	    var isAndroid = _util2.default.os.android;
	    options = _util2.default.extend({
	        menus: menus,
	        actions: actions,
	        className: '',
	        isAndroid: isAndroid,
	        onClose: _util2.default.noop
	    }, options);
	    var $actionSheetWrap = (0, _util2.default)(_util2.default.render(_actionSheet2.default, options));
	    var $actionSheet = $actionSheetWrap.find('.weui-actionsheet');
	    var $actionSheetMask = $actionSheetWrap.find('.weui-mask');

	    function _hide(callback) {
	        _hide = _util2.default.noop; // 防止二次调用导致报错

	        $actionSheet.addClass(options.isAndroid ? 'weui-animate-fade-out' : 'weui-animate-slide-down');
	        $actionSheetMask.addClass('weui-animate-fade-out').on('animationend webkitAnimationEnd', function () {
	            $actionSheetWrap.remove();
	            _sington = false;
	            options.onClose();
	            callback && callback();
	        });
	    }
	    function hide(callback) {
	        _hide(callback);
	    }

	    (0, _util2.default)('body').append($actionSheetWrap);

	    // 这里获取一下计算后的样式，强制触发渲染. fix IOS10下闪现的问题
	    _util2.default.getStyle($actionSheet[0], 'transform');

	    $actionSheet.addClass(options.isAndroid ? 'weui-animate-fade-in' : 'weui-animate-slide-up');
	    $actionSheetMask.addClass('weui-animate-fade-in').on('click', function () {
	        hide();
	    });
	    $actionSheetWrap.find('.weui-actionsheet__menu').on('click', '.weui-actionsheet__cell', function (evt) {
	        var index = (0, _util2.default)(this).index();
	        menus[index].onClick.call(this, evt);
	        hide();
	    });
	    $actionSheetWrap.find('.weui-actionsheet__action').on('click', '.weui-actionsheet__cell', function (evt) {
	        var index = (0, _util2.default)(this).index();
	        actions[index].onClick.call(this, evt);
	        hide();
	    });

	    _sington = $actionSheetWrap[0];
	    _sington.hide = hide;
	    return _sington;
	}
	exports.default = actionSheet;
	module.exports = exports['default'];

/***/ }),
/* 16 */
/***/ (function(module, exports) {

	module.exports = "<div class=\"<% if(isAndroid){ %>weui-skin_android <% } %><%= className %>\"> <div class=weui-mask></div> <div class=weui-actionsheet> <div class=weui-actionsheet__menu> <% for(var i = 0; i < menus.length; i++){ %> <div class=weui-actionsheet__cell><%= menus[i].label %></div> <% } %> </div> <div class=weui-actionsheet__action> <% for(var j = 0; j < actions.length; j++){ %> <div class=weui-actionsheet__cell><%= actions[j].label %></div> <% } %> </div> </div> </div> ";

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _util = __webpack_require__(4);

	var _util2 = _interopRequireDefault(_util);

	var _topTips = __webpack_require__(18);

	var _topTips2 = _interopRequireDefault(_topTips);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/*
	* Tencent is pleased to support the open source community by making WeUI.js available.
	* 
	* Copyright (C) 2017 THL A29 Limited, a Tencent company. All rights reserved.
	* 
	* Licensed under the MIT License (the "License"); you may not use this file except in compliance
	* with the License. You may obtain a copy of the License at
	* 
	*       http://opensource.org/licenses/MIT
	* 
	* Unless required by applicable law or agreed to in writing, software distributed under the License is
	* distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND,
	* either express or implied. See the License for the specific language governing permissions and
	* limitations under the License.
	*/

	var _toptips = null;

	/**
	 * toptips 顶部报错提示
	 * @param {string} content 报错的文字
	 * @param {number|function|object=} options 多少毫秒后消失|消失后的回调|配置项
	 * @param {number=} [options.duration=3000] 多少毫秒后消失
	 * @param {string=} options.className 自定义类名
	 * @param {function=} options.callback 消失后的回调
	 *
	 * @example
	 * weui.topTips('请填写正确的字段');
	 * weui.topTips('请填写正确的字段', 3000);
	 * weui.topTips('请填写正确的字段', function(){ console.log('close') });
	 * weui.topTips('请填写正确的字段', {
	 *     duration: 3000,
	 *     className: 'custom-classname',
	 *     callback: function(){ console.log('close') }
	 * });
	 * 
	 * // 主动关闭
	 * var $topTips = weui.topTips('请填写正确的字段');
	 * $topTips.hide(function() {
	 *      console.log('`topTips` has been hidden');
	 * });
	 */
	function topTips(content) {
	    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	    if (typeof options === 'number') {
	        options = {
	            duration: options
	        };
	    }

	    if (typeof options === 'function') {
	        options = {
	            callback: options
	        };
	    }

	    options = _util2.default.extend({
	        content: content,
	        duration: 3000,
	        callback: _util2.default.noop,
	        className: ''
	    }, options);

	    var $topTips = (0, _util2.default)(_util2.default.render(_topTips2.default, options));
	    function _hide(callback) {
	        _hide = _util2.default.noop; // 防止二次调用导致报错

	        $topTips.remove();
	        callback && callback();
	        options.callback();
	        _toptips = null;
	    }
	    function hide(callback) {
	        _hide(callback);
	    }

	    (0, _util2.default)('body').append($topTips);
	    if (_toptips) {
	        clearTimeout(_toptips.timeout);
	        _toptips.hide();
	    }

	    _toptips = {
	        hide: hide
	    };
	    _toptips.timeout = setTimeout(hide, options.duration);

	    $topTips[0].hide = hide;
	    return $topTips[0];
	}
	exports.default = topTips;
	module.exports = exports['default'];

/***/ }),
/* 18 */
/***/ (function(module, exports) {

	module.exports = "<div class=\"weui-toptips weui-toptips_warn <%= className %>\" style=display:block><%= content %></div> ";

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _util = __webpack_require__(4);

	var _util2 = _interopRequireDefault(_util);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * searchbar 搜索框，主要实现搜索框组件一些显隐逻辑
	 * @param {string} selector searchbar的selector
	 *
	 * @example
	 * #### html
	 * ```html
	 * <div class="weui-search-bar" id="searchBar">
	 *     <form class="weui-search-bar__form">
	 *         <div class="weui-search-bar__box">
	 *             <i class="weui-icon-search"></i>
	 *             <input type="search" class="weui-search-bar__input" placeholder="搜索" required="">
	 *             <a href="javascript:" class="weui-icon-clear"></a>
	 *         </div>
	 *         <label class="weui-search-bar__label">
	 *             <i class="weui-icon-search"></i>
	 *             <span>搜索</span>
	 *         </label>
	 *     </form>
	 *     <a href="javascript:" class="weui-search-bar__cancel-btn">取消</a>
	 * </div>
	 * ```
	 *
	 * #### js
	 * ```javascript
	 * weui.searchBar('#searchBar');
	 * ```
	 */
	function searchBar(selector) {
	    var $eles = (0, _util2.default)(selector);

	    $eles.forEach(function (ele) {
	        var $searchBar = (0, _util2.default)(ele);
	        var $searchLabel = $searchBar.find('.weui-search-bar__label');
	        var $searchInput = $searchBar.find('.weui-search-bar__input');
	        var $searchClear = $searchBar.find('.weui-icon-clear');
	        var $searchCancel = $searchBar.find('.weui-search-bar__cancel-btn');

	        function cancelSearch() {
	            $searchInput.val('');
	            $searchBar.removeClass('weui-search-bar_focusing');
	        }

	        $searchLabel.on('click', function () {
	            $searchBar.addClass('weui-search-bar_focusing');
	            $searchInput[0].focus();
	        });
	        $searchInput.on('blur', function () {
	            if (!this.value.length) cancelSearch();
	        });
	        $searchClear.on('click', function () {
	            $searchInput.val('');
	            $searchInput[0].focus();
	        });
	        $searchCancel.on('click', function () {
	            cancelSearch();
	            $searchInput[0].blur();
	        });
	    });

	    return $eles;
	} /*
	  * Tencent is pleased to support the open source community by making WeUI.js available.
	  * 
	  * Copyright (C) 2017 THL A29 Limited, a Tencent company. All rights reserved.
	  * 
	  * Licensed under the MIT License (the "License"); you may not use this file except in compliance
	  * with the License. You may obtain a copy of the License at
	  * 
	  *       http://opensource.org/licenses/MIT
	  * 
	  * Unless required by applicable law or agreed to in writing, software distributed under the License is
	  * distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND,
	  * either express or implied. See the License for the specific language governing permissions and
	  * limitations under the License.
	  */

	exports.default = searchBar;
	module.exports = exports['default'];

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _util = __webpack_require__(4);

	var _util2 = _interopRequireDefault(_util);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * tab tab导航栏
	 * @param {string} selector tab的selector
	 * @param {object=} options 配置项
	 * @param {number=} [options.defaultIndex=0] 初始展示的index
	 * @param {function=} options.onChange 点击tab时，返回对应的index
	 *
	 * @example
	 * #### html
	 * ```html
	 * <div class="weui-tab" id="tab">
	 *     <div class="weui-navbar">
	 *         <div class="weui-navbar__item">反馈</div>
	 *         <div class="weui-navbar__item">表单</div>
	 *         <div class="weui-navbar__item">上传</div>
	 *         <div class="weui-navbar__item">其它</div>
	 *     </div>
	 *     <div class="weui-tab__panel">
	 *         <div class="weui-tab__content">反馈页</div>
	 *         <div class="weui-tab__content">表单页</div>
	 *         <div class="weui-tab__content">上传页</div>
	 *         <div class="weui-tab__content">其它页</div>
	 *     </div>
	 * </div>
	 * ```
	 *
	 * #### js
	 * ```javascript
	 * weui.tab('#tab',{
	 *     defaultIndex: 0,
	 *     onChange: function(index){
	 *         console.log(index);
	 *     }
	 * });
	 * ```
	 */
	function tab(selector) {
	    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	    var $eles = (0, _util2.default)(selector);
	    options = _util2.default.extend({
	        defaultIndex: 0,
	        onChange: _util2.default.noop
	    }, options);

	    $eles.forEach(function (ele) {
	        var $tab = (0, _util2.default)(ele);
	        var $tabItems = $tab.find('.weui-navbar__item, .weui-tabbar__item');
	        var $tabContents = $tab.find('.weui-tab__content');

	        $tabItems.eq(options.defaultIndex).addClass('weui-bar__item_on');
	        $tabContents.eq(options.defaultIndex).show();

	        $tabItems.on('click', function () {
	            var $this = (0, _util2.default)(this),
	                index = $this.index();

	            $tabItems.removeClass('weui-bar__item_on');
	            $this.addClass('weui-bar__item_on');

	            $tabContents.hide();
	            $tabContents.eq(index).show();

	            options.onChange.call(this, index);
	        });
	    });

	    return this;
	} /*
	  * Tencent is pleased to support the open source community by making WeUI.js available.
	  * 
	  * Copyright (C) 2017 THL A29 Limited, a Tencent company. All rights reserved.
	  * 
	  * Licensed under the MIT License (the "License"); you may not use this file except in compliance
	  * with the License. You may obtain a copy of the License at
	  * 
	  *       http://opensource.org/licenses/MIT
	  * 
	  * Unless required by applicable law or agreed to in writing, software distributed under the License is
	  * distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND,
	  * either express or implied. See the License for the specific language governing permissions and
	  * limitations under the License.
	  */

	exports.default = tab;
	module.exports = exports['default'];

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _util = __webpack_require__(4);

	var _util2 = _interopRequireDefault(_util);

	var _topTips = __webpack_require__(17);

	var _topTips2 = _interopRequireDefault(_topTips);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/*
	* Tencent is pleased to support the open source community by making WeUI.js available.
	*
	* Copyright (C) 2017 THL A29 Limited, a Tencent company. All rights reserved.
	*
	* Licensed under the MIT License (the "License"); you may not use this file except in compliance
	* with the License. You may obtain a copy of the License at
	*
	*       http://opensource.org/licenses/MIT
	*
	* Unless required by applicable law or agreed to in writing, software distributed under the License is
	* distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND,
	* either express or implied. See the License for the specific language governing permissions and
	* limitations under the License.
	*/

	function _findCellParent(ele) {
	    if (!ele || !ele.classList) return null;
	    if (ele.classList.contains('weui-cell')) return ele;
	    return _findCellParent(ele.parentNode);
	}
	function _validate($input, $form, regexp) {
	    var input = $input[0],
	        val = $input.val();

	    if (input.tagName == 'INPUT' || input.tagName == 'TEXTAREA') {
	        var reg = input.getAttribute('pattern') || '';

	        if (input.type == 'radio') {
	            var radioInputs = $form.find('input[type="radio"][name="' + input.name + '"]');
	            for (var i = 0, len = radioInputs.length; i < len; ++i) {
	                if (radioInputs[i].checked) return null;
	            }
	            return 'empty';
	        } else if (input.type == 'checkbox') {
	            if (reg) {
	                var checkboxInputs = $form.find('input[type="checkbox"][name="' + input.name + '"]');
	                var regs = reg.replace(/[{\s}]/g, '').split(',');
	                var count = 0;

	                if (regs.length != 2) {
	                    throw input.outerHTML + ' regexp is wrong.';
	                }

	                checkboxInputs.forEach(function (checkboxInput) {
	                    if (checkboxInput.checked) ++count;
	                });

	                if (regs[1] === '') {
	                    // {0,}
	                    if (count >= parseInt(regs[0])) {
	                        return null;
	                    } else {
	                        return count == 0 ? 'empty' : 'notMatch';
	                    }
	                } else {
	                    // {0,2}
	                    if (parseInt(regs[0]) <= count && count <= parseInt(regs[1])) {
	                        return null;
	                    } else {
	                        return count == 0 ? 'empty' : 'notMatch';
	                    }
	                }
	            } else {
	                return input.checked ? null : 'empty';
	            }
	        } else if (reg) {
	            if (/^REG_/.test(reg)) {
	                if (!regexp) throw 'RegExp ' + reg + ' is empty.';

	                reg = reg.replace(/^REG_/, '');
	                if (!regexp[reg]) throw 'RegExp ' + reg + ' has not found.';

	                reg = regexp[reg];
	            }
	            return new RegExp(reg).test(val) ? null : !$input.val().length ? 'empty' : 'notMatch';
	        } else if (!$input.val().length) {
	            return 'empty';
	        } else {
	            return null;
	        }
	    } else if (val.length) {
	        // 有输入值
	        return null;
	    }

	    return 'empty';
	}

	/**
	 * 表单校验
	 * @param {string} selector 表单的selector
	 * @param {function} callback 校验后的回调
	 * @param {Object=} options 配置项
	 * @param {object=} options.regexp 表单所需的正则表达式
	 *
	 * @example
	 * ##### 普通input的HTML
	 * ```html
	 * <input type="tel" required pattern="[0-9]{11}" placeholder="输入你现在的手机号" emptyTips="请输入手机号" notMatchTips="请输入正确的手机号">
	 * <input type="text" required pattern="REG_IDNUM" placeholder="输入你的身份证号码" emptyTips="请输入身份证号码" notMatchTips="请输入正确的身份证号码">
	 * ```
	 * - required 表示需要校验
	 * - pattern 表示校验的正则，不填则进行为空校验。当以REG_开头时，则获取校验时传入的正则。如`pattern="REG_IDNUM"`，则需要在调用相应方法时传入`{regexp:{IDNUM: /(?:^\d{15}$)|(?:^\d{18}$)|^\d{17}[\dXx]$/}}`，详情请看下面`checkIfBlur`和`validate`
	 * - 报错的wording会从 emptyTips | notMatchTips | tips | placeholder 里获得
	 * <br>
	 *
	 * ##### radio
	 * radio需要检验，只需把参数写在同一表单下，同name的第一个元素即可。
	 * ```html
	 * <input type="radio" value="male" name="sex" required tips="请选择性别" />
	 * <input type="radio" value="female" name="sex" />
	 * ```
	 * <br>
	 *
	 * ##### checkbox
	 * checkbox需要校验，只需把参数写在同一表单下，同name的第一个元素即可。
	 * pattern 规定选择个数，用法与正则一致，例如：
	 * ```html
	 * <input type="checkbox" name="assistance" value="黄药师" required pattern="{1,2}" tips="请勾选1-2个敲码助手" />
	 * <input type="checkbox" name="assistance" value="欧阳锋" />
	 * <input type="checkbox" name="assistance" value="段智兴" />
	 * <input type="checkbox" name="assistance" value="洪七公" />
	 * ```
	 * - {1,}   至少选择1个
	 * - {1,2}  选择1-2个
	 * - 这里不会出现{0,}这种情况，因为有required就表示必选。否则直接去掉required即可。
	 * <br>
	 *
	 * ``` js
	 * // weui.form.validate('#form', function(error){ console.log(error);}); // error: {dom:[Object], msg:[String]}
	 * weui.form.validate('#form', function (error) {
	 *     if (!error) {
	 *         var loading = weui.loading('提交中...');
	 *         setTimeout(function () {
	 *             loading.hide();
	 *             weui.toast('提交成功', 3000);
	 *         }, 1500);
	 *     }
	 *     // return true; // 当return true时，不会显示错误
	 * }, {
	 *     regexp: {
	 *         IDNUM: /(?:^\d{15}$)|(?:^\d{18}$)|^\d{17}[\dXx]$/,
	 *         VCODE: /^.{4}$/
	 *     }
	 * });
	 * ```
	 */
	function validate(selector) {
	    var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _util2.default.noop;
	    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

	    var $eles = (0, _util2.default)(selector);

	    $eles.forEach(function (ele) {
	        var $form = (0, _util2.default)(ele);
	        var $requireds = $form.find('[required]');
	        if (typeof callback != 'function') callback = showErrorTips;

	        for (var i = 0, len = $requireds.length; i < len; ++i) {
	            var $required = $requireds.eq(i),
	                errorMsg = _validate($required, $form, options.regexp),
	                error = { ele: $required[0], msg: errorMsg };
	            if (errorMsg) {
	                if (!callback(error)) showErrorTips(error);
	                return;
	            }
	        }
	        callback(null);
	    });

	    return this;
	}

	/**
	 * checkIfBlur 当表单的input失去焦点时校验
	 * @param {string} selector 表单的selector
	 * @param {Object=} options 配置项
	 * @param {object=} options.regexp 表单所需的正则表达式
	 *
	 * @example
	 * weui.form.checkIfBlur('#form', {
	 *     regexp: {
	 *         IDNUM: /(?:^\d{15}$)|(?:^\d{18}$)|^\d{17}[\dXx]$/,
	 *         VCODE: /^.{4}$/
	 *     }
	 * });
	 */
	function checkIfBlur(selector) {
	    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	    var $eles = (0, _util2.default)(selector);

	    $eles.forEach(function (ele) {
	        var $form = (0, _util2.default)(ele);
	        $form.find('[required]').on('blur', function () {
	            // checkbox 和 radio 不做blur检测，以免误触发
	            if (this.type == 'checkbox' || this.type == 'radio') return;

	            var $this = (0, _util2.default)(this);
	            if ($this.val().length < 1) return; // 当空的时候不校验，以防不断弹出toptips

	            var errorMsg = _validate($this, $form, options.regexp);
	            if (errorMsg) {
	                showErrorTips({
	                    ele: $this[0],
	                    msg: errorMsg
	                });
	            }
	        }).on('focus', function () {
	            hideErrorTips(this);
	        });
	    });

	    return this;
	}

	/**
	 * showErrorTips 显示错误提示
	 * @param {Object} error 错误数据
	 * @param {string} error.ele 出错了的dom元素
	 * @param {string} error.msg 出错了的msg。会根据此`msg`找到对应的`Tips`（比如`msg`是`empty`），那么`ele`上的`emptyTips`就会以`topTips`显示
	 *
	 * @example
	 * weui.form.showErrorTips({
	 *     ele: document.getElementById("xxxInput")
	 *     msg: 'empty'
	 * });
	 */
	function showErrorTips(error) {
	    if (error) {
	        var $ele = (0, _util2.default)(error.ele),
	            msg = error.msg,
	            tips = $ele.attr(msg + 'Tips') || $ele.attr('tips') || $ele.attr('placeholder');
	        if (tips) (0, _topTips2.default)(tips);

	        if (error.ele.type == 'checkbox' || error.ele.type == 'radio') return;

	        var cellParent = _findCellParent(error.ele);
	        if (cellParent) cellParent.classList.add('weui-cell_warn');
	    }
	}

	/**
	 * hideErrorTips 隐藏错误提示
	 * @param {Object} ele dom元素
	 *
	 * @example
	 * weui.form.hideErrorTips(document.getElementById("xxxInput"));
	 */
	function hideErrorTips(ele) {
	    var cellParent = _findCellParent(ele);
	    if (cellParent) cellParent.classList.remove('weui-cell_warn');
	}

	exports.default = {
	    showErrorTips: showErrorTips,
	    hideErrorTips: hideErrorTips,
	    validate: validate,
	    checkIfBlur: checkIfBlur
	};
	module.exports = exports['default'];

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _util = __webpack_require__(4);

	var _util2 = _interopRequireDefault(_util);

	var _item = __webpack_require__(23);

	var _item2 = _interopRequireDefault(_item);

	var _image = __webpack_require__(24);

	var _upload = __webpack_require__(25);

	var _upload2 = _interopRequireDefault(_upload);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/*
	* Tencent is pleased to support the open source community by making WeUI.js available.
	* 
	* Copyright (C) 2017 THL A29 Limited, a Tencent company. All rights reserved.
	* 
	* Licensed under the MIT License (the "License"); you may not use this file except in compliance
	* with the License. You may obtain a copy of the License at
	* 
	*       http://opensource.org/licenses/MIT
	* 
	* Unless required by applicable law or agreed to in writing, software distributed under the License is
	* distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND,
	* either express or implied. See the License for the specific language governing permissions and
	* limitations under the License.
	*/

	var _id = 0;

	/**
	 * uploader 上传组件
	 * @param {string} selector 上传组件的selector
	 * @param {object} options 配置项
	 * @param {string} [options.url] 上传的url，返回值需要使用json格式
	 * @param {boolean} [options.auto=true] 设置为`true`后，不需要手动调用上传，有文件选择即开始上传。用this.upload()来上传，详情请看example
	 * @param {string} [options.type=file] 上传类型, `file`为文件上传; `base64`为以base64上传
	 * @param {string=} [options.fileVal=file] 文件上传域的name
	 * @param {object=} [options.compress] 压缩配置, `false`则不压缩
	 * @param {number=} [options.compress.width=1600] 图片的最大宽度
	 * @param {number=} [options.compress.height=1600] 图片的最大高度
	 * @param {number=} [options.compress.quality=.8] 压缩质量, 取值范围 0 ~ 1
	 * @param {function=} [options.onBeforeQueued] 文件添加前的回调，return false则不添加
	 * @param {function=} [options.onQueued] 文件添加成功的回调
	 * @param {function=} [options.onBeforeSend] 文件上传前调用，具体参数看example
	 * @param {function=} [options.onSuccess] 上传成功的回调
	 * @param {function=} [options.onProgress] 上传进度的回调
	 * @param {function=} [options.onError] 上传失败的回调
	 *
	 * @example
	 * #### html
	 * ```html
	 <div class="weui-cells weui-cells_form" id="uploader">
	     <div class="weui-cell">
	         <div class="weui-cell__bd">
	             <div class="weui-uploader">
	                 <div class="weui-uploader__hd">
	                     <p class="weui-uploader__title">图片上传</p>
	                     <div class="weui-uploader__info"><span id="uploadCount">0</span>/5</div>
	                 </div>
	                 <div class="weui-uploader__bd">
	                     <ul class="weui-uploader__files" id="uploaderFiles"></ul>
	                     <div class="weui-uploader__input-box">
	                         <input id="uploaderInput" class="weui-uploader__input" type="file" accept="image/*" capture="camera" multiple="" />
	                     </div>
	                 </div>
	             </div>
	         </div>
	     </div>
	 </div>
	 * ```
	 *
	 * #### js
	 * ```javascript
	 * var uploadCount = 0;
	 * weui.uploader('#uploader', {
	 *    url: 'http://localhost:8081',
	 *    auto: true,
	 *    type: 'file',
	 *    fileVal: 'fileVal',
	 *    compress: {
	 *        width: 1600,
	 *        height: 1600,
	 *        quality: .8
	 *    },
	 *    onBeforeQueued: function(files) {
	 *        // `this` 是轮询到的文件, `files` 是所有文件
	 *
	 *        if(["image/jpg", "image/jpeg", "image/png", "image/gif"].indexOf(this.type) < 0){
	 *            weui.alert('请上传图片');
	 *            return false; // 阻止文件添加
	 *        }
	 *        if(this.size > 10 * 1024 * 1024){
	 *            weui.alert('请上传不超过10M的图片');
	 *            return false;
	 *        }
	 *        if (files.length > 5) { // 防止一下子选择过多文件
	 *            weui.alert('最多只能上传5张图片，请重新选择');
	 *            return false;
	 *        }
	 *        if (uploadCount + 1 > 5) {
	 *            weui.alert('最多只能上传5张图片');
	 *            return false;
	 *        }
	 *
	 *        ++uploadCount;
	 *
	 *        // return true; // 阻止默认行为，不插入预览图的框架
	 *    },
	 *    onQueued: function(){
	 *        console.log(this);
	 *
	 *        // console.log(this.status); // 文件的状态：'ready', 'progress', 'success', 'fail'
	 *        // console.log(this.base64); // 如果是base64上传，file.base64可以获得文件的base64
	 *
	 *        // this.upload(); // 如果是手动上传，这里可以通过调用upload来实现；也可以用它来实现重传。
	 *        // this.stop(); // 中断上传
	 *
	 *        // return true; // 阻止默认行为，不显示预览图的图像
	 *    },
	 *    onBeforeSend: function(data, headers){
	 *        console.log(this, data, headers);
	 *        // $.extend(data, { test: 1 }); // 可以扩展此对象来控制上传参数
	 *        // $.extend(headers, { Origin: 'http://127.0.0.1' }); // 可以扩展此对象来控制上传头部
	 *
	 *        // return false; // 阻止文件上传
	 *    },
	 *    onProgress: function(procent){
	 *        console.log(this, procent);
	 *        // return true; // 阻止默认行为，不使用默认的进度显示
	 *    },
	 *    onSuccess: function (ret) {
	 *        console.log(this, ret);
	 *        // return true; // 阻止默认行为，不使用默认的成功态
	 *    },
	 *    onError: function(err){
	 *        console.log(this, err);
	 *        // return true; // 阻止默认行为，不使用默认的失败态
	 *    }
	 * });
	 * ```
	 */
	function uploader(selector, options) {
	    var $uploader = (0, _util2.default)(selector);
	    var URL = window.URL || window.webkitURL || window.mozURL;

	    // 找到DOM里file-content，若无，则插入一个。
	    function findFileCtn($uploader, id) {
	        var $file = $uploader.find('[data-id="' + id + '"]');
	        var $fileCtn = $file.find('.weui-uploader__file-content');

	        if (!$fileCtn.length) {
	            $fileCtn = (0, _util2.default)('<div class="weui-uploader__file-content"></div>');
	            $file.append($fileCtn);
	        }
	        $file.addClass('weui-uploader__file_status');
	        return $fileCtn;
	    }

	    // 清除DOM里的上传状态
	    function clearFileStatus($uploader, id) {
	        var $file = $uploader.find('[data-id="' + id + '"]').removeClass('weui-uploader__file_status');
	        $file.find('.weui-uploader__file-content').remove();
	    }

	    // 设置上传
	    function setUploadFile(file) {
	        file.url = URL.createObjectURL(file);
	        file.status = 'ready';
	        file.upload = function () {
	            (0, _upload2.default)(_util2.default.extend({
	                $uploader: $uploader,
	                file: file
	            }, options));
	        };
	        file.stop = function () {
	            this.xhr.abort();
	        };

	        options.onQueued(file);
	        if (options.auto) file.upload();
	    }

	    options = _util2.default.extend({
	        url: '',
	        auto: true,
	        type: 'file',
	        fileVal: 'file',
	        xhrFields: {},
	        onBeforeQueued: _util2.default.noop,
	        onQueued: _util2.default.noop,
	        onBeforeSend: _util2.default.noop,
	        onSuccess: _util2.default.noop,
	        onProgress: _util2.default.noop,
	        onError: _util2.default.noop
	    }, options);

	    if (options.compress !== false) {
	        options.compress = _util2.default.extend({
	            width: 1600,
	            height: 1600,
	            quality: .8
	        }, options.compress);
	    }

	    if (options.onBeforeQueued) {
	        var onBeforeQueued = options.onBeforeQueued;
	        options.onBeforeQueued = function (file, files) {
	            var ret = onBeforeQueued.call(file, files);
	            if (ret === false) {
	                return false;
	            }
	            if (ret === true) {
	                return;
	            }

	            var $item = (0, _util2.default)(_util2.default.render(_item2.default, {
	                id: file.id
	            }));
	            $uploader.find('.weui-uploader__files').append($item);
	        };
	    }
	    if (options.onQueued) {
	        var onQueued = options.onQueued;
	        options.onQueued = function (file) {
	            if (!onQueued.call(file)) {
	                var $file = $uploader.find('[data-id="' + file.id + '"]');
	                $file.css({
	                    backgroundImage: 'url("' + (file.base64 || file.url) + '")'
	                });
	                if (!options.auto) {
	                    clearFileStatus($uploader, file.id);
	                }
	            }
	        };
	    }
	    if (options.onBeforeSend) {
	        var onBeforeSend = options.onBeforeSend;
	        options.onBeforeSend = function (file, data, headers) {
	            var ret = onBeforeSend.call(file, data, headers);
	            if (ret === false) {
	                return false;
	            }
	        };
	    }
	    if (options.onSuccess) {
	        var onSuccess = options.onSuccess;
	        options.onSuccess = function (file, ret) {
	            file.status = 'success';
	            if (!onSuccess.call(file, ret)) {
	                clearFileStatus($uploader, file.id);
	            }
	        };
	    }
	    if (options.onProgress) {
	        var onProgress = options.onProgress;
	        options.onProgress = function (file, percent) {
	            if (!onProgress.call(file, percent)) {
	                findFileCtn($uploader, file.id).html(percent + '%');
	            }
	        };
	    }
	    if (options.onError) {
	        var onError = options.onError;
	        options.onError = function (file, err) {
	            file.status = 'fail';
	            if (!onError.call(file, err)) {
	                findFileCtn($uploader, file.id).html('<i class="weui-icon-warn"></i>');
	            }
	        };
	    }

	    $uploader.find('input[type="file"]').on('change', function (evt) {
	        var files = evt.target.files;

	        if (files.length === 0) {
	            return;
	        }

	        if (options.compress === false && options.type == 'file') {
	            // 以原文件方式上传
	            Array.prototype.forEach.call(files, function (file) {
	                file.id = ++_id;

	                if (options.onBeforeQueued(file, files) === false) return;

	                setUploadFile(file);
	            });
	        } else {
	            // base64上传 和 压缩上传
	            Array.prototype.forEach.call(files, function (file) {
	                file.id = ++_id;

	                if (options.onBeforeQueued(file, files) === false) return;

	                (0, _image.compress)(file, options, function (blob) {
	                    if (blob) setUploadFile(blob);
	                });
	            });
	        }

	        this.value = '';
	    });
	}
	exports.default = uploader;
	module.exports = exports['default'];

/***/ }),
/* 23 */
/***/ (function(module, exports) {

	module.exports = "<li class=\"weui-uploader__file weui-uploader__file_status\" data-id=\"<%= id %>\"> <div class=weui-uploader__file-content> <i class=weui-loading style=width:30px;height:30px></i> </div> </li> ";

/***/ }),
/* 24 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	/*
	* Tencent is pleased to support the open source community by making WeUI.js available.
	* 
	* Copyright (C) 2017 THL A29 Limited, a Tencent company. All rights reserved.
	* 
	* Licensed under the MIT License (the "License"); you may not use this file except in compliance
	* with the License. You may obtain a copy of the License at
	* 
	*       http://opensource.org/licenses/MIT
	* 
	* Unless required by applicable law or agreed to in writing, software distributed under the License is
	* distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND,
	* either express or implied. See the License for the specific language governing permissions and
	* limitations under the License.
	*/

	/**
	 * 检查图片是否有被压扁，如果有，返回比率
	 * ref to http://stackoverflow.com/questions/11929099/html5-canvas-drawimage-ratio-bug-ios
	 */
	function detectVerticalSquash(img) {
	    // 拍照在IOS7或以下的机型会出现照片被压扁的bug
	    var data;
	    var ih = img.naturalHeight;
	    var canvas = document.createElement('canvas');
	    canvas.width = 1;
	    canvas.height = ih;
	    var ctx = canvas.getContext('2d');
	    ctx.drawImage(img, 0, 0);
	    try {
	        data = ctx.getImageData(0, 0, 1, ih).data;
	    } catch (err) {
	        console.log('Cannot check verticalSquash: CORS?');
	        return 1;
	    }
	    var sy = 0;
	    var ey = ih;
	    var py = ih;
	    while (py > sy) {
	        var alpha = data[(py - 1) * 4 + 3];
	        if (alpha === 0) {
	            ey = py;
	        } else {
	            sy = py;
	        }
	        py = ey + sy >> 1; // py = parseInt((ey + sy) / 2)
	    }
	    var ratio = py / ih;
	    return ratio === 0 ? 1 : ratio;
	}

	/**
	 * dataURI to blob, ref to https://gist.github.com/fupslot/5015897
	 * @param dataURI
	 */
	function dataURItoBuffer(dataURI) {
	    var byteString = atob(dataURI.split(',')[1]);
	    var buffer = new ArrayBuffer(byteString.length);
	    var view = new Uint8Array(buffer);
	    for (var i = 0; i < byteString.length; i++) {
	        view[i] = byteString.charCodeAt(i);
	    }
	    return buffer;
	}
	function dataURItoBlob(dataURI) {
	    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
	    var buffer = dataURItoBuffer(dataURI);
	    return new Blob([buffer], { type: mimeString });
	}

	/**
	 * 获取图片的orientation
	 * ref to http://stackoverflow.com/questions/7584794/accessing-jpeg-exif-rotation-data-in-javascript-on-the-client-side
	 */
	function getOrientation(buffer) {
	    var view = new DataView(buffer);
	    if (view.getUint16(0, false) != 0xFFD8) return -2;
	    var length = view.byteLength,
	        offset = 2;
	    while (offset < length) {
	        var marker = view.getUint16(offset, false);
	        offset += 2;
	        if (marker == 0xFFE1) {
	            if (view.getUint32(offset += 2, false) != 0x45786966) return -1;
	            var little = view.getUint16(offset += 6, false) == 0x4949;
	            offset += view.getUint32(offset + 4, little);
	            var tags = view.getUint16(offset, little);
	            offset += 2;
	            for (var i = 0; i < tags; i++) {
	                if (view.getUint16(offset + i * 12, little) == 0x0112) return view.getUint16(offset + i * 12 + 8, little);
	            }
	        } else if ((marker & 0xFF00) != 0xFF00) break;else offset += view.getUint16(offset, false);
	    }
	    return -1;
	}

	/**
	 * 修正拍照时图片的方向
	 * ref to http://stackoverflow.com/questions/19463126/how-to-draw-photo-with-correct-orientation-in-canvas-after-capture-photo-by-usin
	 */
	function orientationHelper(canvas, ctx, orientation) {
	    var w = canvas.width,
	        h = canvas.height;
	    if (orientation > 4) {
	        canvas.width = h;
	        canvas.height = w;
	    }
	    switch (orientation) {
	        case 2:
	            ctx.translate(w, 0);
	            ctx.scale(-1, 1);
	            break;
	        case 3:
	            ctx.translate(w, h);
	            ctx.rotate(Math.PI);
	            break;
	        case 4:
	            ctx.translate(0, h);
	            ctx.scale(1, -1);
	            break;
	        case 5:
	            ctx.rotate(0.5 * Math.PI);
	            ctx.scale(1, -1);
	            break;
	        case 6:
	            ctx.rotate(0.5 * Math.PI);
	            ctx.translate(0, -h);
	            break;
	        case 7:
	            ctx.rotate(0.5 * Math.PI);
	            ctx.translate(w, -h);
	            ctx.scale(-1, 1);
	            break;
	        case 8:
	            ctx.rotate(-0.5 * Math.PI);
	            ctx.translate(-w, 0);
	            break;
	    }
	}

	/**
	 * 压缩图片
	 */
	function compress(file, options, callback) {
	    var reader = new FileReader();
	    reader.onload = function (evt) {
	        if (options.compress === false) {
	            // 不启用压缩 & base64上传 的分支，不做任何处理，直接返回文件的base64编码
	            file.base64 = evt.target.result;
	            callback(file);
	            return;
	        }

	        // 启用压缩的分支
	        var img = new Image();
	        img.onload = function () {
	            var ratio = detectVerticalSquash(img);
	            var orientation = getOrientation(dataURItoBuffer(img.src));
	            var canvas = document.createElement('canvas');
	            var ctx = canvas.getContext('2d');

	            var maxW = options.compress.width;
	            var maxH = options.compress.height;
	            var w = img.width;
	            var h = img.height;
	            var dataURL = void 0;

	            if (w < h && h > maxH) {
	                w = parseInt(maxH * img.width / img.height);
	                h = maxH;
	            } else if (w >= h && w > maxW) {
	                h = parseInt(maxW * img.height / img.width);
	                w = maxW;
	            }

	            canvas.width = w;
	            canvas.height = h;

	            if (orientation > 0) {
	                orientationHelper(canvas, ctx, orientation);
	            }
	            ctx.drawImage(img, 0, 0, w, h / ratio);

	            if (/image\/jpeg/.test(file.type) || /image\/jpg/.test(file.type)) {
	                dataURL = canvas.toDataURL('image/jpeg', options.compress.quality);
	            } else {
	                dataURL = canvas.toDataURL(file.type);
	            }

	            if (options.type == 'file') {
	                if (/;base64,null/.test(dataURL) || /;base64,$/.test(dataURL)) {
	                    // 压缩出错，以文件方式上传的，采用原文件上传
	                    console.warn('Compress fail, dataURL is ' + dataURL + '. Next will use origin file to upload.');
	                    callback(file);
	                } else {
	                    var blob = dataURItoBlob(dataURL);
	                    blob.id = file.id;
	                    blob.name = file.name;
	                    blob.lastModified = file.lastModified;
	                    blob.lastModifiedDate = file.lastModifiedDate;
	                    callback(blob);
	                }
	            } else {
	                if (/;base64,null/.test(dataURL) || /;base64,$/.test(dataURL)) {
	                    // 压缩失败，以base64上传的，直接报错不上传
	                    options.onError(file, new Error('Compress fail, dataURL is ' + dataURL + '.'));
	                    callback();
	                } else {
	                    file.base64 = dataURL;
	                    callback(file);
	                }
	            }
	        };
	        img.src = evt.target.result;
	    };
	    reader.readAsDataURL(file);
	}

	exports.default = {
	    compress: compress
	};
	module.exports = exports['default'];

/***/ }),
/* 25 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = upload;
	/*
	* Tencent is pleased to support the open source community by making WeUI.js available.
	* 
	* Copyright (C) 2017 THL A29 Limited, a Tencent company. All rights reserved.
	* 
	* Licensed under the MIT License (the "License"); you may not use this file except in compliance
	* with the License. You may obtain a copy of the License at
	* 
	*       http://opensource.org/licenses/MIT
	* 
	* Unless required by applicable law or agreed to in writing, software distributed under the License is
	* distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND,
	* either express or implied. See the License for the specific language governing permissions and
	* limitations under the License.
	*/

	function upload(options) {
	    var url = options.url,
	        file = options.file,
	        fileVal = options.fileVal,
	        onBeforeSend = options.onBeforeSend,
	        onProgress = options.onProgress,
	        onError = options.onError,
	        onSuccess = options.onSuccess,
	        xhrFields = options.xhrFields;
	    var name = file.name,
	        type = file.type,
	        lastModifiedDate = file.lastModifiedDate;

	    var data = {
	        name: name,
	        type: type,
	        size: options.type == 'file' ? file.size : file.base64.length,
	        lastModifiedDate: lastModifiedDate
	    };
	    var headers = {};

	    if (onBeforeSend(file, data, headers) === false) return;

	    file.status = 'progress';

	    onProgress(file, 0);

	    var formData = new FormData();
	    var xhr = new XMLHttpRequest();

	    file.xhr = xhr;

	    // 设置参数
	    Object.keys(data).forEach(function (key) {
	        formData.append(key, data[key]);
	    });
	    if (options.type == 'file') {
	        formData.append(fileVal, file, name);
	    } else {
	        formData.append(fileVal, file.base64);
	    }

	    xhr.onreadystatechange = function () {
	        if (xhr.readyState == 4) {
	            if (xhr.status == 200) {
	                try {
	                    // 只支持json
	                    var ret = JSON.parse(xhr.responseText);
	                    onSuccess(file, ret);
	                } catch (err) {
	                    onError(file, err);
	                }
	            } else {
	                onError(file, new Error('XMLHttpRequest response status is ' + xhr.status));
	            }
	        }
	    };
	    xhr.upload.addEventListener('progress', function (evt) {
	        if (evt.total == 0) return;

	        var percent = Math.ceil(evt.loaded / evt.total) * 100;

	        onProgress(file, percent);
	    }, false);

	    xhr.open('POST', url);

	    Object.keys(xhrFields).forEach(function (key) {
	        xhr[key] = xhrFields[key];
	    });
	    // 设置头部信息
	    Object.keys(headers).forEach(function (key) {
	        xhr.setRequestHeader(key, headers[key]);
	    });

	    xhr.send(formData);
	}
	module.exports = exports['default'];

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /*
	                                                                                                                                                                                                                                                                              * Tencent is pleased to support the open source community by making WeUI.js available.
	                                                                                                                                                                                                                                                                              * 
	                                                                                                                                                                                                                                                                              * Copyright (C) 2017 THL A29 Limited, a Tencent company. All rights reserved.
	                                                                                                                                                                                                                                                                              * 
	                                                                                                                                                                                                                                                                              * Licensed under the MIT License (the "License"); you may not use this file except in compliance
	                                                                                                                                                                                                                                                                              * with the License. You may obtain a copy of the License at
	                                                                                                                                                                                                                                                                              * 
	                                                                                                                                                                                                                                                                              *       http://opensource.org/licenses/MIT
	                                                                                                                                                                                                                                                                              * 
	                                                                                                                                                                                                                                                                              * Unless required by applicable law or agreed to in writing, software distributed under the License is
	                                                                                                                                                                                                                                                                              * distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND,
	                                                                                                                                                                                                                                                                              * either express or implied. See the License for the specific language governing permissions and
	                                                                                                                                                                                                                                                                              * limitations under the License.
	                                                                                                                                                                                                                                                                              */

	var _util = __webpack_require__(4);

	var _util2 = _interopRequireDefault(_util);

	var _cron = __webpack_require__(27);

	var _cron2 = _interopRequireDefault(_cron);

	__webpack_require__(28);

	var _util3 = __webpack_require__(29);

	var util = _interopRequireWildcard(_util3);

	var _picker = __webpack_require__(30);

	var _picker2 = _interopRequireDefault(_picker);

	var _group = __webpack_require__(31);

	var _group2 = _interopRequireDefault(_group);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function Result(item) {
	    if ((typeof item === 'undefined' ? 'undefined' : _typeof(item)) != 'object') {
	        item = {
	            label: item,
	            value: item
	        };
	    }
	    _util2.default.extend(this, item);
	}
	Result.prototype.toString = function () {
	    return this.value;
	};
	Result.prototype.valueOf = function () {
	    return this.value;
	};

	var _sington = void 0;
	var temp = {}; // temp 存在上一次滑动的位置

	/**
	 * picker 多列选择器。
	 * @param {array} items picker的数据，即用于生成picker的数据，picker的层级可以自己定义，但建议最多三层。数据格式参考example。
	 * @param {Object} options 配置项
	 * @param {number=} [options.depth] picker深度(也就是picker有多少列) 取值为1-3。如果为空，则取items第一项的深度。
	 * @param {string=} [options.id=default] 作为picker的唯一标识，作用是以id缓存当时的选择。（当你想每次传入的defaultValue都是不一样时，可以使用不同的id区分）
	 * @param {string=} [options.className] 自定义类名
	 * @param {string=} [options.container] 指定容器
	 * @param {array=} [options.defaultValue] 默认选项的value数组
	 * @param {function=} [options.onChange] 在picker选中的值发生变化的时候回调
	 * @param {function=} [options.onConfirm] 在点击"确定"之后的回调。回调返回选中的结果(Array)，数组长度依赖于picker的层级。
	 * @param {function=} [options.onClose] picker关闭后的回调
	 *
	 * @example
	 * // 单列picker
	 * weui.picker([
	 * {
	 *     label: '飞机票',
	 *     value: 0,
	 *     disabled: true // 不可用
	 * },
	 * {
	 *     label: '火车票',
	 *     value: 1
	 * },
	 * {
	 *     label: '汽车票',
	 *     value: 3
	 * },
	 * {
	 *     label: '公车票',
	 *     value: 4,
	 * }
	 * ], {
	 *    className: 'custom-classname',
	 *    container: 'body',
	 *    defaultValue: [3],
	 *    onChange: function (result) {
	 *        console.log(result)
	 *    },
	 *    onConfirm: function (result) {
	 *        console.log(result)
	 *    },
	 *    id: 'singleLinePicker'
	 * });
	 *
	 * @example
	 * // 多列picker
	 * weui.picker([
	 *     {
	 *         label: '1',
	 *         value: '1'
	 *     }, {
	 *         label: '2',
	 *         value: '2'
	 *     }, {
	 *         label: '3',
	 *         value: '3'
	 *     }
	 * ], [
	 *     {
	 *         label: 'A',
	 *         value: 'A'
	 *     }, {
	 *         label: 'B',
	 *         value: 'B'
	 *     }, {
	 *         label: 'C',
	 *         value: 'C'
	 *     }
	 * ], {
	 *     defaultValue: ['3', 'A'],
	 *     onChange: function (result) {
	 *         console.log(result);
	 *     },
	 *     onConfirm: function (result) {
	 *         console.log(result);
	 *     },
	 *     id: 'multiPickerBtn'
	 * });
	 *
	 * @example
	 * // 级联picker
	 * weui.picker([
	 * {
	 *     label: '飞机票',
	 *     value: 0,
	 *     children: [
	 *         {
	 *             label: '经济舱',
	 *             value: 1
	 *         },
	 *         {
	 *             label: '商务舱',
	 *             value: 2
	 *         }
	 *     ]
	 * },
	 * {
	 *     label: '火车票',
	 *     value: 1,
	 *     children: [
	 *         {
	 *             label: '卧铺',
	 *             value: 1,
	 *             disabled: true // 不可用
	 *         },
	 *         {
	 *             label: '坐票',
	 *             value: 2
	 *         },
	 *         {
	 *             label: '站票',
	 *             value: 3
	 *         }
	 *     ]
	 * },
	 * {
	 *     label: '汽车票',
	 *     value: 3,
	 *     children: [
	 *         {
	 *             label: '快班',
	 *             value: 1
	 *         },
	 *         {
	 *             label: '普通',
	 *             value: 2
	 *         }
	 *     ]
	 * }
	 * ], {
	 *    className: 'custom-classname',
	 *    container: 'body',
	 *    defaultValue: [1, 3],
	 *    onChange: function (result) {
	 *        console.log(result)
	 *    },
	 *    onConfirm: function (result) {
	 *        console.log(result)
	 *    },
	 *    id: 'doubleLinePicker'
	 * });
	 */
	function picker() {
	    if (_sington) return _sington;

	    // 配置项
	    var options = arguments[arguments.length - 1];
	    var defaults = _util2.default.extend({
	        id: 'default',
	        className: '',
	        container: 'body',
	        onChange: _util2.default.noop,
	        onConfirm: _util2.default.noop,
	        onClose: _util2.default.noop
	    }, options);

	    // 数据处理
	    var items = void 0;
	    var isMulti = false; // 是否多列的类型
	    if (arguments.length > 2) {
	        var i = 0;
	        items = [];
	        while (i < arguments.length - 1) {
	            items.push(arguments[i++]);
	        }
	        isMulti = true;
	    } else {
	        items = arguments[0];
	    }

	    // 获取缓存
	    temp[defaults.id] = temp[defaults.id] || [];
	    var result = [];
	    var lineTemp = temp[defaults.id];
	    var $picker = (0, _util2.default)(_util2.default.render(_picker2.default, defaults));
	    var depth = options.depth || (isMulti ? items.length : util.depthOf(items[0])),
	        groups = '';

	    // 显示与隐藏的方法
	    function show() {
	        (0, _util2.default)(defaults.container).append($picker);

	        // 这里获取一下计算后的样式，强制触发渲染. fix IOS10下闪现的问题
	        _util2.default.getStyle($picker[0], 'transform');

	        $picker.find('.weui-mask').addClass('weui-animate-fade-in');
	        $picker.find('.weui-picker').addClass('weui-animate-slide-up');
	    }
	    function _hide(callback) {
	        _hide = _util2.default.noop; // 防止二次调用导致报错

	        $picker.find('.weui-mask').addClass('weui-animate-fade-out');
	        $picker.find('.weui-picker').addClass('weui-animate-slide-down').on('animationend webkitAnimationEnd', function () {
	            $picker.remove();
	            _sington = false;
	            defaults.onClose();
	            callback && callback();
	        });
	    }
	    function hide(callback) {
	        _hide(callback);
	    }

	    // 初始化滚动的方法
	    function scroll(items, level) {
	        if (lineTemp[level] === undefined && defaults.defaultValue && defaults.defaultValue[level] !== undefined) {
	            // 没有缓存选项，而且存在defaultValue
	            var defaultVal = defaults.defaultValue[level];
	            var index = 0,
	                len = items.length;

	            if (_typeof(items[index]) == 'object') {
	                for (; index < len; ++index) {
	                    if (defaultVal == items[index].value) break;
	                }
	            } else {
	                for (; index < len; ++index) {
	                    if (defaultVal == items[index]) break;
	                }
	            }
	            if (index < len) {
	                lineTemp[level] = index;
	            } else {
	                console.warn('Picker has not match defaultValue: ' + defaultVal);
	            }
	        }
	        $picker.find('.weui-picker__group').eq(level).scroll({
	            items: items,
	            temp: lineTemp[level],
	            onChange: function onChange(item, index) {
	                //为当前的result赋值。
	                if (item) {
	                    result[level] = new Result(item);
	                } else {
	                    result[level] = null;
	                }
	                lineTemp[level] = index;

	                if (isMulti) {
	                    if (result.length == depth) {
	                        defaults.onChange(result);
	                    }
	                } else {
	                    /**
	                     * @子列表处理
	                     * 1. 在没有子列表，或者值列表的数组长度为0时，隐藏掉子列表。
	                     * 2. 滑动之后发现重新有子列表时，再次显示子列表。
	                     *
	                     * @回调处理
	                     * 1. 因为滑动实际上是一层一层传递的：父列表滚动完成之后，会call子列表的onChange，从而带动子列表的滑动。
	                     * 2. 所以，使用者的传进来onChange回调应该在最后一个子列表滑动时再call
	                     */
	                    if (item.children && item.children.length > 0) {
	                        $picker.find('.weui-picker__group').eq(level + 1).show();
	                        !isMulti && scroll(item.children, level + 1); // 不是多列的情况下才继续处理children
	                    } else {
	                        //如果子列表test不通过，子孙列表都隐藏。
	                        var $items = $picker.find('.weui-picker__group');
	                        $items.forEach(function (ele, index) {
	                            if (index > level) {
	                                (0, _util2.default)(ele).hide();
	                            }
	                        });

	                        result.splice(level + 1);

	                        defaults.onChange(result);
	                    }
	                }
	            },
	            onConfirm: defaults.onConfirm
	        });
	    }

	    var _depth = depth;
	    while (_depth--) {
	        groups += _group2.default;
	    }

	    $picker.find('.weui-picker__bd').html(groups);
	    show();

	    if (isMulti) {
	        items.forEach(function (item, index) {
	            scroll(item, index);
	        });
	    } else {
	        scroll(items, 0);
	    }

	    $picker.on('click', '.weui-mask', function () {
	        hide();
	    }).on('click', '.weui-picker__action', function () {
	        hide();
	    }).on('click', '#weui-picker-confirm', function () {
	        defaults.onConfirm(result);
	    });

	    _sington = $picker[0];
	    _sington.hide = hide;
	    return _sington;
	}

	/**
	 * datePicker 时间选择器，由picker拓展而来，提供年、月、日的选择。
	 * @param options 配置项
	 * @param {string=} [options.id=datePicker] 作为picker的唯一标识
	 * @param {number=|string|Date} [options.start=2000] 起始年份，如果是 `Number` 类型，表示起始年份；如果是 `String` 类型，格式为 'YYYY-MM-DD'；如果是 `Date` 类型，就传一个 Date
	 * @param {number=|string|Date} [options.end=2030] 结束年份，同上
	 * @param {string=} [options.cron=* * *] cron 表达式，三位，分别是 dayOfMonth[1-31]，month[1-12] 和 dayOfWeek[0-6]（周日-周六）
	 * @param {string=} [options.className] 自定义类名
	 * @param {array=} [options.defaultValue] 默认选项的value数组, 如 [1991, 6, 9]
	 * @param {function=} [options.onChange] 在picker选中的值发生变化的时候回调
	 * @param {function=} [options.onConfirm] 在点击"确定"之后的回调。回调返回选中的结果(Array)，数组长度依赖于picker的层级。
	 *
	 *@example
	 * // 示例1：
	 * weui.datePicker({
	 *     start: 1990,
	 *     end: 2000,
	 *     defaultValue: [1991, 6, 9],
	 *     onChange: function(result){
	 *         console.log(result);
	 *     },
	 *     onConfirm: function(result){
	 *         console.log(result);
	 *     },
	 *     id: 'datePicker'
	 * });
	 *
	 * // 示例2：
	 * weui.datePicker({
	 *      start: new Date(), // 从今天开始
	 *      end: 2030,
	 *      defaultValue: [2020, 6, 9],
	 *      onChange: function(result){
	 *          console.log(result);
	 *      },
	 *      onConfirm: function(result){
	 *          console.log(result);
	 *      },
	 *      id: 'datePicker'
	 *  });
	 *
	 *  // 示例3：
	 * weui.datePicker({
	 *      start: new Date(), // 从今天开始
	 *      end: 2030,
	 *      cron: '* * 0,6',  // 每逢周日、周六
	 *      onChange: function(result){
	 *          console.log(result);
	 *      },
	 *      onConfirm: function(result){
	 *          console.log(result);
	 *      },
	 *      id: 'datePicker'
	 *  });
	 *
	 *  // 示例4：
	 * weui.datePicker({
	 *      start: new Date(), // 从今天开始
	 *      end: 2030,
	 *      cron: '1-10 * *',  // 每月1日-10日
	 *      onChange: function(result){
	 *          console.log(result);
	 *      },
	 *      onConfirm: function(result){
	 *          console.log(result);
	 *      },
	 *      id: 'datePicker'
	 *  });
	 */
	function datePicker(options) {
	    var defaults = _util2.default.extend({
	        id: 'datePicker',
	        onChange: _util2.default.noop,
	        onConfirm: _util2.default.noop,
	        start: 2000,
	        end: 2030,
	        cron: '* * *'
	    }, options);

	    // 兼容原来的 start、end 传 Number 的用法
	    if (typeof defaults.start === 'number') {
	        defaults.start = new Date(defaults.start + '/01/01');
	    } else if (typeof defaults.start === 'string') {
	        defaults.start = new Date(defaults.start.replace(/-/g, '/'));
	    }
	    if (typeof defaults.end === 'number') {
	        defaults.end = new Date(defaults.end + '/12/31');
	    } else if (typeof defaults.end === 'string') {
	        defaults.end = new Date(defaults.end.replace(/-/g, '/'));
	    }

	    var findBy = function findBy(array, key, value) {
	        for (var i = 0, len = array.length; i < len; i++) {
	            var _obj = array[i];
	            if (_obj[key] == value) {
	                return _obj;
	            }
	        }
	    };

	    var date = [];
	    var interval = _cron2.default.parse(defaults.cron, defaults.start, defaults.end);
	    var obj = void 0;
	    do {
	        obj = interval.next();

	        var year = obj.value.getFullYear();
	        var month = obj.value.getMonth() + 1;
	        var day = obj.value.getDate();

	        var Y = findBy(date, 'value', year);
	        if (!Y) {
	            Y = {
	                label: year + '年',
	                value: year,
	                children: []
	            };
	            date.push(Y);
	        }
	        var M = findBy(Y.children, 'value', month);
	        if (!M) {
	            M = {
	                label: month + '月',
	                value: month,
	                children: []
	            };
	            Y.children.push(M);
	        }
	        M.children.push({
	            label: day + '日',
	            value: day
	        });
	    } while (!obj.done);

	    return picker(date, defaults);
	}

	exports.default = {
	    picker: picker,
	    datePicker: datePicker
	};
	module.exports = exports['default'];

/***/ }),
/* 27 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/*
	* Tencent is pleased to support the open source community by making WeUI.js available.
	* 
	* Copyright (C) 2017 THL A29 Limited, a Tencent company. All rights reserved.
	* 
	* Licensed under the MIT License (the "License"); you may not use this file except in compliance
	* with the License. You may obtain a copy of the License at
	* 
	*       http://opensource.org/licenses/MIT
	* 
	* Unless required by applicable law or agreed to in writing, software distributed under the License is
	* distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND,
	* either express or implied. See the License for the specific language governing permissions and
	* limitations under the License.
	*/

	var regex = /^(\d+)(?:-(\d+))?(?:\/(\d+))?$/g;
	var constraints = [[1, 31], [1, 12], [0, 6]];

	/**
	 * Schedule
	 */

	var Schedule = function () {
	    function Schedule(fields, start, end) {
	        _classCallCheck(this, Schedule);

	        /**
	         * dayOfMonth
	         * @type {Array}
	         */
	        this._dates = fields[0];

	        /**
	         * month
	         * @type {Array}
	         */
	        this._months = fields[1];

	        /**
	         * dayOfWeek
	         * @type {Array}
	         */
	        this._days = fields[2];

	        /**
	         * start
	         * @type {Date}
	         */
	        this._start = start;

	        /**
	         * end
	         * @type {Date}
	         */
	        this._end = end;

	        /**
	         * cursor
	         * @type {Date}
	         * @private
	         */
	        this._pointer = start;
	    }

	    _createClass(Schedule, [{
	        key: '_findNext',
	        value: function _findNext() {
	            var next = void 0;
	            while (true) {
	                if (this._end.getTime() - this._pointer.getTime() < 0) {
	                    throw new Error('out of range, end is ' + this._end + ', current is ' + this._pointer);
	                }

	                var month = this._pointer.getMonth();
	                var date = this._pointer.getDate();
	                var day = this._pointer.getDay();

	                if (this._months.indexOf(month + 1) === -1) {
	                    this._pointer.setMonth(month + 1);
	                    this._pointer.setDate(1);
	                    continue;
	                }

	                if (this._dates.indexOf(date) === -1) {
	                    this._pointer.setDate(date + 1);
	                    continue;
	                }

	                if (this._days.indexOf(day) === -1) {
	                    this._pointer.setDate(date + 1);
	                    continue;
	                }

	                next = new Date(this._pointer);

	                break;
	            }
	            return next;
	        }

	        /**
	         * fetch next data
	         */

	    }, {
	        key: 'next',
	        value: function next() {
	            var value = this._findNext();
	            // move next date
	            this._pointer.setDate(this._pointer.getDate() + 1);
	            return {
	                value: value,
	                done: !this.hasNext()
	            };
	        }

	        /**
	         * has next
	         * @returns {boolean}
	         */

	    }, {
	        key: 'hasNext',
	        value: function hasNext() {
	            try {
	                this._findNext();
	                return true;
	            } catch (e) {
	                return false;
	            }
	        }
	    }]);

	    return Schedule;
	}();

	function parseField(field, constraints) {
	    var low = constraints[0];
	    var high = constraints[1];
	    var result = [];
	    var pointer = void 0;

	    // * 号等于最低到最高
	    field = field.replace(/\*/g, low + '-' + high);

	    // 处理 1,2,5-9 这种情况
	    var fields = field.split(',');
	    for (var i = 0, len = fields.length; i < len; i++) {
	        var f = fields[i];
	        if (f.match(regex)) {
	            f.replace(regex, function ($0, lower, upper, step) {
	                // ref to `cron-parser`
	                step = parseInt(step) || 1;
	                // Positive integer higher than constraints[0]
	                lower = Math.min(Math.max(low, ~~Math.abs(lower)), high);

	                // Positive integer lower than constraints[1]
	                upper = upper ? Math.min(high, ~~Math.abs(upper)) : lower;

	                // Count from the lower barrier to the upper
	                pointer = lower;

	                do {
	                    result.push(pointer);
	                    pointer += step;
	                } while (pointer <= upper);
	            });
	        }
	    }
	    return result;
	}

	/**
	 *
	 * @param expr
	 * @param start
	 * @param end
	 * @returns {*}
	 */
	function parse(expr, start, end) {
	    var atoms = expr.replace(/^\s\s*|\s\s*$/g, '').split(/\s+/);
	    var fields = [];
	    atoms.forEach(function (atom, index) {
	        var constraint = constraints[index];
	        fields.push(parseField(atom, constraint));
	    });
	    return new Schedule(fields, start, end);
	}

	exports.default = {
	    parse: parse
	};
	module.exports = exports['default'];

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /*
	                                                                                                                                                                                                                                                                              * Tencent is pleased to support the open source community by making WeUI.js available.
	                                                                                                                                                                                                                                                                              * 
	                                                                                                                                                                                                                                                                              * Copyright (C) 2017 THL A29 Limited, a Tencent company. All rights reserved.
	                                                                                                                                                                                                                                                                              * 
	                                                                                                                                                                                                                                                                              * Licensed under the MIT License (the "License"); you may not use this file except in compliance
	                                                                                                                                                                                                                                                                              * with the License. You may obtain a copy of the License at
	                                                                                                                                                                                                                                                                              * 
	                                                                                                                                                                                                                                                                              *       http://opensource.org/licenses/MIT
	                                                                                                                                                                                                                                                                              * 
	                                                                                                                                                                                                                                                                              * Unless required by applicable law or agreed to in writing, software distributed under the License is
	                                                                                                                                                                                                                                                                              * distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND,
	                                                                                                                                                                                                                                                                              * either express or implied. See the License for the specific language governing permissions and
	                                                                                                                                                                                                                                                                              * limitations under the License.
	                                                                                                                                                                                                                                                                              */

	var _util = __webpack_require__(4);

	var _util2 = _interopRequireDefault(_util);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * set transition
	 * @param $target
	 * @param time
	 */
	var setTransition = function setTransition($target, time) {
	    return $target.css({
	        '-webkit-transition': 'all ' + time + 's',
	        'transition': 'all ' + time + 's'
	    });
	};

	/**
	 * set translate
	 */
	var setTranslate = function setTranslate($target, diff) {
	    return $target.css({
	        '-webkit-transform': 'translate3d(0, ' + diff + 'px, 0)',
	        'transform': 'translate3d(0, ' + diff + 'px, 0)'
	    });
	};

	/**
	 * @desc get index of middle item
	 * @param items
	 * @returns {number}
	 */
	var getDefaultIndex = function getDefaultIndex(items) {
	    var current = Math.floor(items.length / 2);
	    var count = 0;
	    while (!!items[current] && items[current].disabled) {
	        current = ++current % items.length;
	        count++;

	        if (count > items.length) {
	            throw new Error('No selectable item.');
	        }
	    }

	    return current;
	};

	var getDefaultTranslate = function getDefaultTranslate(offset, rowHeight, items) {
	    var currentIndex = getDefaultIndex(items);

	    return (offset - currentIndex) * rowHeight;
	};

	/**
	 * get max translate
	 * @param offset
	 * @param rowHeight
	 * @returns {number}
	 */
	var getMax = function getMax(offset, rowHeight) {
	    return offset * rowHeight;
	};

	/**
	 * get min translate
	 * @param offset
	 * @param rowHeight
	 * @param length
	 * @returns {number}
	 */
	var getMin = function getMin(offset, rowHeight, length) {
	    return -(rowHeight * (length - offset - 1));
	};

	_util2.default.fn.scroll = function (options) {
	    var _this = this;

	    var defaults = _util2.default.extend({
	        items: [], // 数据
	        scrollable: '.weui-picker__content', // 滚动的元素
	        offset: 3, // 列表初始化时的偏移量（列表初始化时，选项是聚焦在中间的，通过offset强制往上挪3项，以达到初始选项是为顶部的那项）
	        rowHeight: 34, // 列表每一行的高度
	        onChange: _util2.default.noop, // onChange回调
	        temp: null, // translate的缓存
	        bodyHeight: 7 * 34 // picker的高度，用于辅助点击滚动的计算
	    }, options);
	    var items = defaults.items.map(function (item) {
	        return '<div class="weui-picker__item' + (item.disabled ? ' weui-picker__item_disabled' : '') + '">' + ((typeof item === 'undefined' ? 'undefined' : _typeof(item)) == 'object' ? item.label : item) + '</div>';
	    }).join('');
	    var $this = (0, _util2.default)(this);

	    $this.find('.weui-picker__content').html(items);

	    var $scrollable = $this.find(defaults.scrollable); // 可滚动的元素
	    var start = void 0; // 保存开始按下的位置
	    var end = void 0; // 保存结束时的位置
	    var startTime = void 0; // 开始触摸的时间
	    var translate = void 0; // 缓存 translate
	    var points = []; // 记录移动点
	    var windowHeight = window.innerHeight; // 屏幕的高度

	    // 首次触发选中事件
	    // 如果有缓存的选项，则用缓存的选项，否则使用中间值。
	    if (defaults.temp !== null && defaults.temp < defaults.items.length) {
	        var index = defaults.temp;
	        defaults.onChange.call(this, defaults.items[index], index);
	        translate = (defaults.offset - index) * defaults.rowHeight;
	    } else {
	        var _index = getDefaultIndex(defaults.items);
	        defaults.onChange.call(this, defaults.items[_index], _index);
	        translate = getDefaultTranslate(defaults.offset, defaults.rowHeight, defaults.items);
	    }
	    setTranslate($scrollable, translate);

	    var stop = function stop(diff) {
	        translate += diff;

	        // 移动到最接近的那一行
	        translate = Math.round(translate / defaults.rowHeight) * defaults.rowHeight;
	        var max = getMax(defaults.offset, defaults.rowHeight);
	        var min = getMin(defaults.offset, defaults.rowHeight, defaults.items.length);
	        // 不要超过最大值或者最小值
	        if (translate > max) {
	            translate = max;
	        }
	        if (translate < min) {
	            translate = min;
	        }

	        // 如果是 disabled 的就跳过
	        var index = defaults.offset - translate / defaults.rowHeight;
	        while (!!defaults.items[index] && defaults.items[index].disabled) {
	            diff > 0 ? ++index : --index;
	        }
	        translate = (defaults.offset - index) * defaults.rowHeight;
	        setTransition($scrollable, .3);
	        setTranslate($scrollable, translate);

	        // 触发选择事件
	        defaults.onChange.call(_this, defaults.items[index], index);
	    };

	    function _start(pageY) {
	        start = pageY;
	        startTime = +new Date();
	    }
	    function _move(pageY) {
	        end = pageY;
	        var diff = end - start;

	        setTransition($scrollable, 0);
	        setTranslate($scrollable, translate + diff);
	        startTime = +new Date();
	        points.push({ time: startTime, y: end });
	        if (points.length > 40) {
	            points.shift();
	        }
	    }
	    function _end(pageY) {
	        if (!start) return;

	        /**
	         * 思路:
	         * 0. touchstart 记录按下的点和时间
	         * 1. touchmove 移动时记录前 40个经过的点和时间
	         * 2. touchend 松开手时, 记录该点和时间. 如果松开手时的时间, 距离上一次 move时的时间超过 100ms, 那么认为停止了, 不执行惯性滑动
	         *    如果间隔时间在 100ms 内, 查找 100ms 内最近的那个点, 和松开手时的那个点, 计算距离和时间差, 算出速度
	         *    速度乘以惯性滑动的时间, 例如 300ms, 计算出应该滑动的距离
	         */
	        var endTime = new Date().getTime();
	        var relativeY = windowHeight - defaults.bodyHeight / 2;
	        end = pageY;

	        // 如果上次时间距离松开手的时间超过 100ms, 则停止了, 没有惯性滑动
	        if (endTime - startTime > 100) {
	            //如果end和start相差小于10，则视为
	            if (Math.abs(end - start) > 10) {
	                stop(end - start);
	            } else {
	                stop(relativeY - end);
	            }
	        } else {
	            if (Math.abs(end - start) > 10) {
	                var endPos = points.length - 1;
	                var startPos = endPos;
	                for (var i = endPos; i > 0 && startTime - points[i].time < 100; i--) {
	                    startPos = i;
	                }

	                if (startPos !== endPos) {
	                    var ep = points[endPos];
	                    var sp = points[startPos];
	                    var t = ep.time - sp.time;
	                    var s = ep.y - sp.y;
	                    var v = s / t; // 出手时的速度
	                    var diff = v * 150 + (end - start); // 滑行 150ms,这里直接影响“灵敏度”
	                    stop(diff);
	                } else {
	                    stop(0);
	                }
	            } else {
	                stop(relativeY - end);
	            }
	        }

	        start = null;
	    }

	    /**
	     * 因为现在没有移除匿名函数的方法，所以先暴力移除（offAll），并且改变$scrollable。
	     */
	    $scrollable = $this.offAll().on('touchstart', function (evt) {
	        _start(evt.changedTouches[0].pageY);
	    }).on('touchmove', function (evt) {
	        _move(evt.changedTouches[0].pageY);
	        evt.preventDefault();
	    }).on('touchend', function (evt) {
	        _end(evt.changedTouches[0].pageY);
	    }).find(defaults.scrollable);

	    // 判断是否支持touch事件 https://github.com/Modernizr/Modernizr/blob/master/feature-detects/touchevents.js
	    var isSupportTouch = 'ontouchstart' in window || window.DocumentTouch && document instanceof window.DocumentTouch;
	    if (!isSupportTouch) {
	        $this.on('mousedown', function (evt) {
	            _start(evt.pageY);
	            evt.stopPropagation();
	            evt.preventDefault();
	        }).on('mousemove', function (evt) {
	            if (!start) return;

	            _move(evt.pageY);
	            evt.stopPropagation();
	            evt.preventDefault();
	        }).on('mouseup mouseleave', function (evt) {
	            _end(evt.pageY);
	            evt.stopPropagation();
	            evt.preventDefault();
	        });
	    }
	};

/***/ }),
/* 29 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	/*
	* Tencent is pleased to support the open source community by making WeUI.js available.
	* 
	* Copyright (C) 2017 THL A29 Limited, a Tencent company. All rights reserved.
	* 
	* Licensed under the MIT License (the "License"); you may not use this file except in compliance
	* with the License. You may obtain a copy of the License at
	* 
	*       http://opensource.org/licenses/MIT
	* 
	* Unless required by applicable law or agreed to in writing, software distributed under the License is
	* distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND,
	* either express or implied. See the License for the specific language governing permissions and
	* limitations under the License.
	*/

	var depthOf = exports.depthOf = function depthOf(object) {
	    var depth = 1;
	    if (object.children && object.children[0]) {
	        depth = depthOf(object.children[0]) + 1;
	    }
	    return depth;
	};

/***/ }),
/* 30 */
/***/ (function(module, exports) {

	module.exports = "<div class=\"<%= className %>\"> <div class=weui-mask></div> <div class=weui-picker> <div class=weui-picker__hd> <a href=javascript:; data-action=cancel class=weui-picker__action>取消</a> <a href=javascript:; data-action=select class=weui-picker__action id=weui-picker-confirm>确定</a> </div> <div class=weui-picker__bd></div> </div> </div> ";

/***/ }),
/* 31 */
/***/ (function(module, exports) {

	module.exports = "<div class=weui-picker__group> <div class=weui-picker__mask></div> <div class=weui-picker__indicator></div> <div class=weui-picker__content></div> </div>";

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _util = __webpack_require__(4);

	var _util2 = _interopRequireDefault(_util);

	var _gallery = __webpack_require__(33);

	var _gallery2 = _interopRequireDefault(_gallery);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/*
	* Tencent is pleased to support the open source community by making WeUI.js available.
	* 
	* Copyright (C) 2017 THL A29 Limited, a Tencent company. All rights reserved.
	* 
	* Licensed under the MIT License (the "License"); you may not use this file except in compliance
	* with the License. You may obtain a copy of the License at
	* 
	*       http://opensource.org/licenses/MIT
	* 
	* Unless required by applicable law or agreed to in writing, software distributed under the License is
	* distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND,
	* either express or implied. See the License for the specific language governing permissions and
	* limitations under the License.
	*/

	var _sington = void 0;

	/**
	 * gallery 带删除按钮的图片预览，主要是配合图片上传使用
	 * @param {string} url gallery显示的图片的url
	 * @param {object=} options 配置项
	 * @param {string=} options.className 自定义类名
	 * @param {function=} options.onDelete 点击删除图片时的回调
	 *
	 * @example
	 * var gallery = weui.gallery(url, {
	 *     className: 'custom-classname',
	 *     onDelete: function(){
	 *         if(confirm('确定删除该图片？')){ console.log('删除'); }
	 *         gallery.hide(function() {
	 *              console.log('`gallery` has been hidden');
	 *          });
	 *     }
	 * });
	 */
	function gallery(url) {
	    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	    if (_sington) return _sington;

	    options = _util2.default.extend({
	        className: '',
	        onDelete: _util2.default.noop
	    }, options);

	    var $gallery = (0, _util2.default)(_util2.default.render(_gallery2.default, _util2.default.extend({
	        url: url
	    }, options)));

	    function _hide(callback) {
	        _hide = _util2.default.noop; // 防止二次调用导致报错

	        $gallery.addClass('weui-animate-fade-out').on('animationend webkitAnimationEnd', function () {
	            $gallery.remove();
	            _sington = false;
	            callback && callback();
	        });
	    }
	    function hide(callback) {
	        _hide(callback);
	    }

	    (0, _util2.default)('body').append($gallery);
	    $gallery.find('.weui-gallery__img').on('click', function () {
	        hide();
	    });
	    $gallery.find('.weui-gallery__del').on('click', function () {
	        options.onDelete.call(this, url);
	    });

	    $gallery.show().addClass('weui-animate-fade-in');

	    _sington = $gallery[0];
	    _sington.hide = hide;
	    return _sington;
	}
	exports.default = gallery;
	module.exports = exports['default'];

/***/ }),
/* 33 */
/***/ (function(module, exports) {

	module.exports = "<div class=\"weui-gallery <%= className %>\"> <span class=weui-gallery__img style=\"background-image:url(<%= url %>)\"></span> <div class=weui-gallery__opr> <a href=javascript: class=weui-gallery__del> <i class=\"weui-icon-delete weui-icon_gallery-delete\"></i> </a> </div> </div> ";

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _util = __webpack_require__(4);

	var _util2 = _interopRequireDefault(_util);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * slider slider滑块，单位是百分比。注意，因为需要获取slider的长度，所以必须要在slider可见的情况下来调用。
	 * @param {string} selector slider的selector
	 * @param {object=} options 配置项
	 * @param {number=} options.step slider的step，每次移动的百分比，取值范围 [0-100]
	 * @param {number=} [options.defaultValue=0] slider的默认百分比值，取值范围 [0-100]
	 * @param {function=} options.onChange slider发生改变时返回对应的百分比，取值范围 [0-100]
	 *
	 * @example
	 * #### html
	 * ```html
	 * <div class="weui-slider-box">
	 *     <div id="slider" class="weui-slider">
	 *         <div class="weui-slider__inner">
	 *             <div class="weui-slider__track"></div>
	 *             <div class="weui-slider__handler"></div>
	 *         </div>
	 *     </div>
	 *     <div id="sliderValue" class="weui-slider-box__value"></div>
	 * </div>
	 * ```
	 *
	 * #### js
	 * ```javascript
	 * weui.slider('#slider', {
	 *     step: 10,
	 *     defaultValue: 40,
	 *     onChange: function(percent){
	 *         console.log(percent);
	 *     }
	 * });
	 * ```
	 */
	function slider(selector) {
	    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	    var $eles = (0, _util2.default)(selector);
	    options = _util2.default.extend({
	        step: undefined,
	        defaultValue: 0,
	        onChange: _util2.default.noop
	    }, options);

	    if (options.step !== undefined) {
	        options.step = parseFloat(options.step);
	        if (!options.step || options.step < 0) {
	            throw new Error('Slider step must be a positive number.');
	        }
	    }
	    if (options.defaultValue !== undefined && options.defaultValue < 0 || options.defaultValue > 100) {
	        throw new Error('Slider defaultValue must be >= 0 and <= 100.');
	    }

	    $eles.forEach(function (ele) {
	        var $slider = (0, _util2.default)(ele);
	        var $sliderInner = $slider.find('.weui-slider__inner');
	        var $sliderTrack = $slider.find('.weui-slider__track');
	        var $sliderHandler = $slider.find('.weui-slider__handler');

	        var sliderLength = parseInt(_util2.default.getStyle($sliderInner[0], 'width')); // slider的长度
	        var sliderLeft = $sliderInner[0].offsetLeft; // slider相对于页面的offset
	        var handlerStartPos = 0; // handler起始位置
	        var handlerStartX = 0; // handler touchstart的X
	        var stepWidth = void 0; // 每个step的宽度

	        function getHandlerPos() {
	            var pos = _util2.default.getStyle($sliderHandler[0], 'left');

	            if (/%/.test(pos)) {
	                pos = sliderLength * parseFloat(pos) / 100;
	            } else {
	                pos = parseFloat(pos);
	            }
	            return pos;
	        }
	        function setHandler(distance) {
	            var dist = void 0,
	                // handler的目标位置
	            percent = void 0; // 所在位置的百分比

	            if (options.step) {
	                distance = Math.round(distance / stepWidth) * stepWidth;
	            }

	            dist = handlerStartPos + distance;
	            dist = dist < 0 ? 0 : dist > sliderLength ? sliderLength : dist;

	            percent = 100 * dist / sliderLength;

	            $sliderTrack.css({ width: percent + '%' });
	            $sliderHandler.css({ left: percent + '%' });
	            options.onChange.call(ele, percent);
	        }

	        if (options.step) {
	            stepWidth = sliderLength * options.step / 100;
	        }
	        if (options.defaultValue) {
	            setHandler(sliderLength * options.defaultValue / 100);
	        }

	        $slider.on('click', function (evt) {
	            evt.preventDefault();

	            handlerStartPos = getHandlerPos();
	            setHandler(evt.pageX - sliderLeft - handlerStartPos);
	        });
	        $sliderHandler.on('touchstart', function (evt) {
	            handlerStartPos = getHandlerPos();
	            handlerStartX = evt.changedTouches[0].clientX;
	        }).on('touchmove', function (evt) {
	            evt.preventDefault();

	            setHandler(evt.changedTouches[0].clientX - handlerStartX);
	        });
	    });

	    return this;
	} /*
	  * Tencent is pleased to support the open source community by making WeUI.js available.
	  * 
	  * Copyright (C) 2017 THL A29 Limited, a Tencent company. All rights reserved.
	  * 
	  * Licensed under the MIT License (the "License"); you may not use this file except in compliance
	  * with the License. You may obtain a copy of the License at
	  * 
	  *       http://opensource.org/licenses/MIT
	  * 
	  * Unless required by applicable law or agreed to in writing, software distributed under the License is
	  * distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND,
	  * either express or implied. See the License for the specific language governing permissions and
	  * limitations under the License.
	  */

	exports.default = slider;
	module.exports = exports['default'];

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _axios = __webpack_require__(36);

	var _axios2 = _interopRequireDefault(_axios);

	var _utils = __webpack_require__(63);

	var _utils2 = _interopRequireDefault(_utils);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	module.exports = {
	    responseOK: 200,
	    responseMsg: function responseMsg(data) {
	        if (!data) return '';
	        return data.errorMsg;
	    },
	    getCall: function getCall(url, params, callback) {
	        _axios2.default.get(url, {
	            params: params
	        }).then(function (response) {
	            _utils2.default.l('response : ' + response);
	            if (!response || 200 !== response.status) {
	                callback(null, '服务异常');
	                _utils2.default.l(url + ' 服务异常');
	            } else if (response.data.code !== 200) {
	                callback(null, response.data.errorMsg);
	                _utils2.default.l(url + response.data.errorMsg);
	            } else {
	                callback(response.data, null);
	                _utils2.default.l(response.data.payload);
	            }
	        }).catch(function (error) {
	            _utils2.default.e('error : ' + error);
	            callback(null, '服务不可用');
	        });
	    }

	};

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(37);

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(38);
	var bind = __webpack_require__(39);
	var Axios = __webpack_require__(41);
	var defaults = __webpack_require__(42);

	/**
	 * Create an instance of Axios
	 *
	 * @param {Object} defaultConfig The default config for the instance
	 * @return {Axios} A new instance of Axios
	 */
	function createInstance(defaultConfig) {
	  var context = new Axios(defaultConfig);
	  var instance = bind(Axios.prototype.request, context);

	  // Copy axios.prototype to instance
	  utils.extend(instance, Axios.prototype, context);

	  // Copy context to instance
	  utils.extend(instance, context);

	  return instance;
	}

	// Create the default instance to be exported
	var axios = createInstance(defaults);

	// Expose Axios class to allow class inheritance
	axios.Axios = Axios;

	// Factory for creating new instances
	axios.create = function create(instanceConfig) {
	  return createInstance(utils.merge(defaults, instanceConfig));
	};

	// Expose Cancel & CancelToken
	axios.Cancel = __webpack_require__(60);
	axios.CancelToken = __webpack_require__(61);
	axios.isCancel = __webpack_require__(57);

	// Expose all/spread
	axios.all = function all(promises) {
	  return Promise.all(promises);
	};
	axios.spread = __webpack_require__(62);

	module.exports = axios;

	// Allow use of default import syntax in TypeScript
	module.exports.default = axios;


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var bind = __webpack_require__(39);
	var isBuffer = __webpack_require__(40);

	/*global toString:true*/

	// utils is a library of generic helper functions non-specific to axios

	var toString = Object.prototype.toString;

	/**
	 * Determine if a value is an Array
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an Array, otherwise false
	 */
	function isArray(val) {
	  return toString.call(val) === '[object Array]';
	}

	/**
	 * Determine if a value is an ArrayBuffer
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
	 */
	function isArrayBuffer(val) {
	  return toString.call(val) === '[object ArrayBuffer]';
	}

	/**
	 * Determine if a value is a FormData
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an FormData, otherwise false
	 */
	function isFormData(val) {
	  return (typeof FormData !== 'undefined') && (val instanceof FormData);
	}

	/**
	 * Determine if a value is a view on an ArrayBuffer
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
	 */
	function isArrayBufferView(val) {
	  var result;
	  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
	    result = ArrayBuffer.isView(val);
	  } else {
	    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
	  }
	  return result;
	}

	/**
	 * Determine if a value is a String
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a String, otherwise false
	 */
	function isString(val) {
	  return typeof val === 'string';
	}

	/**
	 * Determine if a value is a Number
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Number, otherwise false
	 */
	function isNumber(val) {
	  return typeof val === 'number';
	}

	/**
	 * Determine if a value is undefined
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if the value is undefined, otherwise false
	 */
	function isUndefined(val) {
	  return typeof val === 'undefined';
	}

	/**
	 * Determine if a value is an Object
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an Object, otherwise false
	 */
	function isObject(val) {
	  return val !== null && typeof val === 'object';
	}

	/**
	 * Determine if a value is a Date
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Date, otherwise false
	 */
	function isDate(val) {
	  return toString.call(val) === '[object Date]';
	}

	/**
	 * Determine if a value is a File
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a File, otherwise false
	 */
	function isFile(val) {
	  return toString.call(val) === '[object File]';
	}

	/**
	 * Determine if a value is a Blob
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Blob, otherwise false
	 */
	function isBlob(val) {
	  return toString.call(val) === '[object Blob]';
	}

	/**
	 * Determine if a value is a Function
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Function, otherwise false
	 */
	function isFunction(val) {
	  return toString.call(val) === '[object Function]';
	}

	/**
	 * Determine if a value is a Stream
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Stream, otherwise false
	 */
	function isStream(val) {
	  return isObject(val) && isFunction(val.pipe);
	}

	/**
	 * Determine if a value is a URLSearchParams object
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
	 */
	function isURLSearchParams(val) {
	  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
	}

	/**
	 * Trim excess whitespace off the beginning and end of a string
	 *
	 * @param {String} str The String to trim
	 * @returns {String} The String freed of excess whitespace
	 */
	function trim(str) {
	  return str.replace(/^\s*/, '').replace(/\s*$/, '');
	}

	/**
	 * Determine if we're running in a standard browser environment
	 *
	 * This allows axios to run in a web worker, and react-native.
	 * Both environments support XMLHttpRequest, but not fully standard globals.
	 *
	 * web workers:
	 *  typeof window -> undefined
	 *  typeof document -> undefined
	 *
	 * react-native:
	 *  navigator.product -> 'ReactNative'
	 */
	function isStandardBrowserEnv() {
	  if (typeof navigator !== 'undefined' && navigator.product === 'ReactNative') {
	    return false;
	  }
	  return (
	    typeof window !== 'undefined' &&
	    typeof document !== 'undefined'
	  );
	}

	/**
	 * Iterate over an Array or an Object invoking a function for each item.
	 *
	 * If `obj` is an Array callback will be called passing
	 * the value, index, and complete array for each item.
	 *
	 * If 'obj' is an Object callback will be called passing
	 * the value, key, and complete object for each property.
	 *
	 * @param {Object|Array} obj The object to iterate
	 * @param {Function} fn The callback to invoke for each item
	 */
	function forEach(obj, fn) {
	  // Don't bother if no value provided
	  if (obj === null || typeof obj === 'undefined') {
	    return;
	  }

	  // Force an array if not already something iterable
	  if (typeof obj !== 'object') {
	    /*eslint no-param-reassign:0*/
	    obj = [obj];
	  }

	  if (isArray(obj)) {
	    // Iterate over array values
	    for (var i = 0, l = obj.length; i < l; i++) {
	      fn.call(null, obj[i], i, obj);
	    }
	  } else {
	    // Iterate over object keys
	    for (var key in obj) {
	      if (Object.prototype.hasOwnProperty.call(obj, key)) {
	        fn.call(null, obj[key], key, obj);
	      }
	    }
	  }
	}

	/**
	 * Accepts varargs expecting each argument to be an object, then
	 * immutably merges the properties of each object and returns result.
	 *
	 * When multiple objects contain the same key the later object in
	 * the arguments list will take precedence.
	 *
	 * Example:
	 *
	 * ```js
	 * var result = merge({foo: 123}, {foo: 456});
	 * console.log(result.foo); // outputs 456
	 * ```
	 *
	 * @param {Object} obj1 Object to merge
	 * @returns {Object} Result of all merge properties
	 */
	function merge(/* obj1, obj2, obj3, ... */) {
	  var result = {};
	  function assignValue(val, key) {
	    if (typeof result[key] === 'object' && typeof val === 'object') {
	      result[key] = merge(result[key], val);
	    } else {
	      result[key] = val;
	    }
	  }

	  for (var i = 0, l = arguments.length; i < l; i++) {
	    forEach(arguments[i], assignValue);
	  }
	  return result;
	}

	/**
	 * Extends object a by mutably adding to it the properties of object b.
	 *
	 * @param {Object} a The object to be extended
	 * @param {Object} b The object to copy properties from
	 * @param {Object} thisArg The object to bind function to
	 * @return {Object} The resulting value of object a
	 */
	function extend(a, b, thisArg) {
	  forEach(b, function assignValue(val, key) {
	    if (thisArg && typeof val === 'function') {
	      a[key] = bind(val, thisArg);
	    } else {
	      a[key] = val;
	    }
	  });
	  return a;
	}

	module.exports = {
	  isArray: isArray,
	  isArrayBuffer: isArrayBuffer,
	  isBuffer: isBuffer,
	  isFormData: isFormData,
	  isArrayBufferView: isArrayBufferView,
	  isString: isString,
	  isNumber: isNumber,
	  isObject: isObject,
	  isUndefined: isUndefined,
	  isDate: isDate,
	  isFile: isFile,
	  isBlob: isBlob,
	  isFunction: isFunction,
	  isStream: isStream,
	  isURLSearchParams: isURLSearchParams,
	  isStandardBrowserEnv: isStandardBrowserEnv,
	  forEach: forEach,
	  merge: merge,
	  extend: extend,
	  trim: trim
	};


/***/ }),
/* 39 */
/***/ (function(module, exports) {

	'use strict';

	module.exports = function bind(fn, thisArg) {
	  return function wrap() {
	    var args = new Array(arguments.length);
	    for (var i = 0; i < args.length; i++) {
	      args[i] = arguments[i];
	    }
	    return fn.apply(thisArg, args);
	  };
	};


/***/ }),
/* 40 */
/***/ (function(module, exports) {

	/*!
	 * Determine if an object is a Buffer
	 *
	 * @author   Feross Aboukhadijeh <https://feross.org>
	 * @license  MIT
	 */

	// The _isBuffer check is for Safari 5-7 support, because it's missing
	// Object.prototype.constructor. Remove this eventually
	module.exports = function (obj) {
	  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
	}

	function isBuffer (obj) {
	  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
	}

	// For Node v0.10 support. Remove this eventually.
	function isSlowBuffer (obj) {
	  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
	}


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var defaults = __webpack_require__(42);
	var utils = __webpack_require__(38);
	var InterceptorManager = __webpack_require__(54);
	var dispatchRequest = __webpack_require__(55);

	/**
	 * Create a new instance of Axios
	 *
	 * @param {Object} instanceConfig The default config for the instance
	 */
	function Axios(instanceConfig) {
	  this.defaults = instanceConfig;
	  this.interceptors = {
	    request: new InterceptorManager(),
	    response: new InterceptorManager()
	  };
	}

	/**
	 * Dispatch a request
	 *
	 * @param {Object} config The config specific for this request (merged with this.defaults)
	 */
	Axios.prototype.request = function request(config) {
	  /*eslint no-param-reassign:0*/
	  // Allow for axios('example/url'[, config]) a la fetch API
	  if (typeof config === 'string') {
	    config = utils.merge({
	      url: arguments[0]
	    }, arguments[1]);
	  }

	  config = utils.merge(defaults, this.defaults, { method: 'get' }, config);
	  config.method = config.method.toLowerCase();

	  // Hook up interceptors middleware
	  var chain = [dispatchRequest, undefined];
	  var promise = Promise.resolve(config);

	  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
	    chain.unshift(interceptor.fulfilled, interceptor.rejected);
	  });

	  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
	    chain.push(interceptor.fulfilled, interceptor.rejected);
	  });

	  while (chain.length) {
	    promise = promise.then(chain.shift(), chain.shift());
	  }

	  return promise;
	};

	// Provide aliases for supported request methods
	utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
	  /*eslint func-names:0*/
	  Axios.prototype[method] = function(url, config) {
	    return this.request(utils.merge(config || {}, {
	      method: method,
	      url: url
	    }));
	  };
	});

	utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
	  /*eslint func-names:0*/
	  Axios.prototype[method] = function(url, data, config) {
	    return this.request(utils.merge(config || {}, {
	      method: method,
	      url: url,
	      data: data
	    }));
	  };
	});

	module.exports = Axios;


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	var utils = __webpack_require__(38);
	var normalizeHeaderName = __webpack_require__(44);

	var DEFAULT_CONTENT_TYPE = {
	  'Content-Type': 'application/x-www-form-urlencoded'
	};

	function setContentTypeIfUnset(headers, value) {
	  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
	    headers['Content-Type'] = value;
	  }
	}

	function getDefaultAdapter() {
	  var adapter;
	  if (typeof XMLHttpRequest !== 'undefined') {
	    // For browsers use XHR adapter
	    adapter = __webpack_require__(45);
	  } else if (typeof process !== 'undefined') {
	    // For node use HTTP adapter
	    adapter = __webpack_require__(45);
	  }
	  return adapter;
	}

	var defaults = {
	  adapter: getDefaultAdapter(),

	  transformRequest: [function transformRequest(data, headers) {
	    normalizeHeaderName(headers, 'Content-Type');
	    if (utils.isFormData(data) ||
	      utils.isArrayBuffer(data) ||
	      utils.isBuffer(data) ||
	      utils.isStream(data) ||
	      utils.isFile(data) ||
	      utils.isBlob(data)
	    ) {
	      return data;
	    }
	    if (utils.isArrayBufferView(data)) {
	      return data.buffer;
	    }
	    if (utils.isURLSearchParams(data)) {
	      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
	      return data.toString();
	    }
	    if (utils.isObject(data)) {
	      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
	      return JSON.stringify(data);
	    }
	    return data;
	  }],

	  transformResponse: [function transformResponse(data) {
	    /*eslint no-param-reassign:0*/
	    if (typeof data === 'string') {
	      try {
	        data = JSON.parse(data);
	      } catch (e) { /* Ignore */ }
	    }
	    return data;
	  }],

	  timeout: 0,

	  xsrfCookieName: 'XSRF-TOKEN',
	  xsrfHeaderName: 'X-XSRF-TOKEN',

	  maxContentLength: -1,

	  validateStatus: function validateStatus(status) {
	    return status >= 200 && status < 300;
	  }
	};

	defaults.headers = {
	  common: {
	    'Accept': 'application/json, text/plain, */*'
	  }
	};

	utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
	  defaults.headers[method] = {};
	});

	utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
	  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
	});

	module.exports = defaults;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(43)))

/***/ }),
/* 43 */
/***/ (function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};

	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.

	var cachedSetTimeout;
	var cachedClearTimeout;

	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }


	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }



	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	process.prependListener = noop;
	process.prependOnceListener = noop;

	process.listeners = function (name) { return [] }

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(38);

	module.exports = function normalizeHeaderName(headers, normalizedName) {
	  utils.forEach(headers, function processHeader(value, name) {
	    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
	      headers[normalizedName] = value;
	      delete headers[name];
	    }
	  });
	};


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(38);
	var settle = __webpack_require__(46);
	var buildURL = __webpack_require__(49);
	var parseHeaders = __webpack_require__(50);
	var isURLSameOrigin = __webpack_require__(51);
	var createError = __webpack_require__(47);
	var btoa = (typeof window !== 'undefined' && window.btoa && window.btoa.bind(window)) || __webpack_require__(52);

	module.exports = function xhrAdapter(config) {
	  return new Promise(function dispatchXhrRequest(resolve, reject) {
	    var requestData = config.data;
	    var requestHeaders = config.headers;

	    if (utils.isFormData(requestData)) {
	      delete requestHeaders['Content-Type']; // Let the browser set it
	    }

	    var request = new XMLHttpRequest();
	    var loadEvent = 'onreadystatechange';
	    var xDomain = false;

	    // For IE 8/9 CORS support
	    // Only supports POST and GET calls and doesn't returns the response headers.
	    // DON'T do this for testing b/c XMLHttpRequest is mocked, not XDomainRequest.
	    if (("dev") !== 'test' &&
	        typeof window !== 'undefined' &&
	        window.XDomainRequest && !('withCredentials' in request) &&
	        !isURLSameOrigin(config.url)) {
	      request = new window.XDomainRequest();
	      loadEvent = 'onload';
	      xDomain = true;
	      request.onprogress = function handleProgress() {};
	      request.ontimeout = function handleTimeout() {};
	    }

	    // HTTP basic authentication
	    if (config.auth) {
	      var username = config.auth.username || '';
	      var password = config.auth.password || '';
	      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
	    }

	    request.open(config.method.toUpperCase(), buildURL(config.url, config.params, config.paramsSerializer), true);

	    // Set the request timeout in MS
	    request.timeout = config.timeout;

	    // Listen for ready state
	    request[loadEvent] = function handleLoad() {
	      if (!request || (request.readyState !== 4 && !xDomain)) {
	        return;
	      }

	      // The request errored out and we didn't get a response, this will be
	      // handled by onerror instead
	      // With one exception: request that using file: protocol, most browsers
	      // will return status as 0 even though it's a successful request
	      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
	        return;
	      }

	      // Prepare the response
	      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
	      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
	      var response = {
	        data: responseData,
	        // IE sends 1223 instead of 204 (https://github.com/axios/axios/issues/201)
	        status: request.status === 1223 ? 204 : request.status,
	        statusText: request.status === 1223 ? 'No Content' : request.statusText,
	        headers: responseHeaders,
	        config: config,
	        request: request
	      };

	      settle(resolve, reject, response);

	      // Clean up request
	      request = null;
	    };

	    // Handle low level network errors
	    request.onerror = function handleError() {
	      // Real errors are hidden from us by the browser
	      // onerror should only fire if it's a network error
	      reject(createError('Network Error', config, null, request));

	      // Clean up request
	      request = null;
	    };

	    // Handle timeout
	    request.ontimeout = function handleTimeout() {
	      reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED',
	        request));

	      // Clean up request
	      request = null;
	    };

	    // Add xsrf header
	    // This is only done if running in a standard browser environment.
	    // Specifically not if we're in a web worker, or react-native.
	    if (utils.isStandardBrowserEnv()) {
	      var cookies = __webpack_require__(53);

	      // Add xsrf header
	      var xsrfValue = (config.withCredentials || isURLSameOrigin(config.url)) && config.xsrfCookieName ?
	          cookies.read(config.xsrfCookieName) :
	          undefined;

	      if (xsrfValue) {
	        requestHeaders[config.xsrfHeaderName] = xsrfValue;
	      }
	    }

	    // Add headers to the request
	    if ('setRequestHeader' in request) {
	      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
	        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
	          // Remove Content-Type if data is undefined
	          delete requestHeaders[key];
	        } else {
	          // Otherwise add header to the request
	          request.setRequestHeader(key, val);
	        }
	      });
	    }

	    // Add withCredentials to request if needed
	    if (config.withCredentials) {
	      request.withCredentials = true;
	    }

	    // Add responseType to request if needed
	    if (config.responseType) {
	      try {
	        request.responseType = config.responseType;
	      } catch (e) {
	        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
	        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
	        if (config.responseType !== 'json') {
	          throw e;
	        }
	      }
	    }

	    // Handle progress if needed
	    if (typeof config.onDownloadProgress === 'function') {
	      request.addEventListener('progress', config.onDownloadProgress);
	    }

	    // Not all browsers support upload events
	    if (typeof config.onUploadProgress === 'function' && request.upload) {
	      request.upload.addEventListener('progress', config.onUploadProgress);
	    }

	    if (config.cancelToken) {
	      // Handle cancellation
	      config.cancelToken.promise.then(function onCanceled(cancel) {
	        if (!request) {
	          return;
	        }

	        request.abort();
	        reject(cancel);
	        // Clean up request
	        request = null;
	      });
	    }

	    if (requestData === undefined) {
	      requestData = null;
	    }

	    // Send the request
	    request.send(requestData);
	  });
	};


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var createError = __webpack_require__(47);

	/**
	 * Resolve or reject a Promise based on response status.
	 *
	 * @param {Function} resolve A function that resolves the promise.
	 * @param {Function} reject A function that rejects the promise.
	 * @param {object} response The response.
	 */
	module.exports = function settle(resolve, reject, response) {
	  var validateStatus = response.config.validateStatus;
	  // Note: status is not exposed by XDomainRequest
	  if (!response.status || !validateStatus || validateStatus(response.status)) {
	    resolve(response);
	  } else {
	    reject(createError(
	      'Request failed with status code ' + response.status,
	      response.config,
	      null,
	      response.request,
	      response
	    ));
	  }
	};


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var enhanceError = __webpack_require__(48);

	/**
	 * Create an Error with the specified message, config, error code, request and response.
	 *
	 * @param {string} message The error message.
	 * @param {Object} config The config.
	 * @param {string} [code] The error code (for example, 'ECONNABORTED').
	 * @param {Object} [request] The request.
	 * @param {Object} [response] The response.
	 * @returns {Error} The created error.
	 */
	module.exports = function createError(message, config, code, request, response) {
	  var error = new Error(message);
	  return enhanceError(error, config, code, request, response);
	};


/***/ }),
/* 48 */
/***/ (function(module, exports) {

	'use strict';

	/**
	 * Update an Error with the specified config, error code, and response.
	 *
	 * @param {Error} error The error to update.
	 * @param {Object} config The config.
	 * @param {string} [code] The error code (for example, 'ECONNABORTED').
	 * @param {Object} [request] The request.
	 * @param {Object} [response] The response.
	 * @returns {Error} The error.
	 */
	module.exports = function enhanceError(error, config, code, request, response) {
	  error.config = config;
	  if (code) {
	    error.code = code;
	  }
	  error.request = request;
	  error.response = response;
	  return error;
	};


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(38);

	function encode(val) {
	  return encodeURIComponent(val).
	    replace(/%40/gi, '@').
	    replace(/%3A/gi, ':').
	    replace(/%24/g, '$').
	    replace(/%2C/gi, ',').
	    replace(/%20/g, '+').
	    replace(/%5B/gi, '[').
	    replace(/%5D/gi, ']');
	}

	/**
	 * Build a URL by appending params to the end
	 *
	 * @param {string} url The base of the url (e.g., http://www.google.com)
	 * @param {object} [params] The params to be appended
	 * @returns {string} The formatted url
	 */
	module.exports = function buildURL(url, params, paramsSerializer) {
	  /*eslint no-param-reassign:0*/
	  if (!params) {
	    return url;
	  }

	  var serializedParams;
	  if (paramsSerializer) {
	    serializedParams = paramsSerializer(params);
	  } else if (utils.isURLSearchParams(params)) {
	    serializedParams = params.toString();
	  } else {
	    var parts = [];

	    utils.forEach(params, function serialize(val, key) {
	      if (val === null || typeof val === 'undefined') {
	        return;
	      }

	      if (utils.isArray(val)) {
	        key = key + '[]';
	      }

	      if (!utils.isArray(val)) {
	        val = [val];
	      }

	      utils.forEach(val, function parseValue(v) {
	        if (utils.isDate(v)) {
	          v = v.toISOString();
	        } else if (utils.isObject(v)) {
	          v = JSON.stringify(v);
	        }
	        parts.push(encode(key) + '=' + encode(v));
	      });
	    });

	    serializedParams = parts.join('&');
	  }

	  if (serializedParams) {
	    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
	  }

	  return url;
	};


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(38);

	// Headers whose duplicates are ignored by node
	// c.f. https://nodejs.org/api/http.html#http_message_headers
	var ignoreDuplicateOf = [
	  'age', 'authorization', 'content-length', 'content-type', 'etag',
	  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
	  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
	  'referer', 'retry-after', 'user-agent'
	];

	/**
	 * Parse headers into an object
	 *
	 * ```
	 * Date: Wed, 27 Aug 2014 08:58:49 GMT
	 * Content-Type: application/json
	 * Connection: keep-alive
	 * Transfer-Encoding: chunked
	 * ```
	 *
	 * @param {String} headers Headers needing to be parsed
	 * @returns {Object} Headers parsed into an object
	 */
	module.exports = function parseHeaders(headers) {
	  var parsed = {};
	  var key;
	  var val;
	  var i;

	  if (!headers) { return parsed; }

	  utils.forEach(headers.split('\n'), function parser(line) {
	    i = line.indexOf(':');
	    key = utils.trim(line.substr(0, i)).toLowerCase();
	    val = utils.trim(line.substr(i + 1));

	    if (key) {
	      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
	        return;
	      }
	      if (key === 'set-cookie') {
	        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
	      } else {
	        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
	      }
	    }
	  });

	  return parsed;
	};


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(38);

	module.exports = (
	  utils.isStandardBrowserEnv() ?

	  // Standard browser envs have full support of the APIs needed to test
	  // whether the request URL is of the same origin as current location.
	  (function standardBrowserEnv() {
	    var msie = /(msie|trident)/i.test(navigator.userAgent);
	    var urlParsingNode = document.createElement('a');
	    var originURL;

	    /**
	    * Parse a URL to discover it's components
	    *
	    * @param {String} url The URL to be parsed
	    * @returns {Object}
	    */
	    function resolveURL(url) {
	      var href = url;

	      if (msie) {
	        // IE needs attribute set twice to normalize properties
	        urlParsingNode.setAttribute('href', href);
	        href = urlParsingNode.href;
	      }

	      urlParsingNode.setAttribute('href', href);

	      // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
	      return {
	        href: urlParsingNode.href,
	        protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
	        host: urlParsingNode.host,
	        search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
	        hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
	        hostname: urlParsingNode.hostname,
	        port: urlParsingNode.port,
	        pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
	                  urlParsingNode.pathname :
	                  '/' + urlParsingNode.pathname
	      };
	    }

	    originURL = resolveURL(window.location.href);

	    /**
	    * Determine if a URL shares the same origin as the current location
	    *
	    * @param {String} requestURL The URL to test
	    * @returns {boolean} True if URL shares the same origin, otherwise false
	    */
	    return function isURLSameOrigin(requestURL) {
	      var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
	      return (parsed.protocol === originURL.protocol &&
	            parsed.host === originURL.host);
	    };
	  })() :

	  // Non standard browser envs (web workers, react-native) lack needed support.
	  (function nonStandardBrowserEnv() {
	    return function isURLSameOrigin() {
	      return true;
	    };
	  })()
	);


/***/ }),
/* 52 */
/***/ (function(module, exports) {

	'use strict';

	// btoa polyfill for IE<10 courtesy https://github.com/davidchambers/Base64.js

	var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

	function E() {
	  this.message = 'String contains an invalid character';
	}
	E.prototype = new Error;
	E.prototype.code = 5;
	E.prototype.name = 'InvalidCharacterError';

	function btoa(input) {
	  var str = String(input);
	  var output = '';
	  for (
	    // initialize result and counter
	    var block, charCode, idx = 0, map = chars;
	    // if the next str index does not exist:
	    //   change the mapping table to "="
	    //   check if d has no fractional digits
	    str.charAt(idx | 0) || (map = '=', idx % 1);
	    // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
	    output += map.charAt(63 & block >> 8 - idx % 1 * 8)
	  ) {
	    charCode = str.charCodeAt(idx += 3 / 4);
	    if (charCode > 0xFF) {
	      throw new E();
	    }
	    block = block << 8 | charCode;
	  }
	  return output;
	}

	module.exports = btoa;


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(38);

	module.exports = (
	  utils.isStandardBrowserEnv() ?

	  // Standard browser envs support document.cookie
	  (function standardBrowserEnv() {
	    return {
	      write: function write(name, value, expires, path, domain, secure) {
	        var cookie = [];
	        cookie.push(name + '=' + encodeURIComponent(value));

	        if (utils.isNumber(expires)) {
	          cookie.push('expires=' + new Date(expires).toGMTString());
	        }

	        if (utils.isString(path)) {
	          cookie.push('path=' + path);
	        }

	        if (utils.isString(domain)) {
	          cookie.push('domain=' + domain);
	        }

	        if (secure === true) {
	          cookie.push('secure');
	        }

	        document.cookie = cookie.join('; ');
	      },

	      read: function read(name) {
	        var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
	        return (match ? decodeURIComponent(match[3]) : null);
	      },

	      remove: function remove(name) {
	        this.write(name, '', Date.now() - 86400000);
	      }
	    };
	  })() :

	  // Non standard browser env (web workers, react-native) lack needed support.
	  (function nonStandardBrowserEnv() {
	    return {
	      write: function write() {},
	      read: function read() { return null; },
	      remove: function remove() {}
	    };
	  })()
	);


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(38);

	function InterceptorManager() {
	  this.handlers = [];
	}

	/**
	 * Add a new interceptor to the stack
	 *
	 * @param {Function} fulfilled The function to handle `then` for a `Promise`
	 * @param {Function} rejected The function to handle `reject` for a `Promise`
	 *
	 * @return {Number} An ID used to remove interceptor later
	 */
	InterceptorManager.prototype.use = function use(fulfilled, rejected) {
	  this.handlers.push({
	    fulfilled: fulfilled,
	    rejected: rejected
	  });
	  return this.handlers.length - 1;
	};

	/**
	 * Remove an interceptor from the stack
	 *
	 * @param {Number} id The ID that was returned by `use`
	 */
	InterceptorManager.prototype.eject = function eject(id) {
	  if (this.handlers[id]) {
	    this.handlers[id] = null;
	  }
	};

	/**
	 * Iterate over all the registered interceptors
	 *
	 * This method is particularly useful for skipping over any
	 * interceptors that may have become `null` calling `eject`.
	 *
	 * @param {Function} fn The function to call for each interceptor
	 */
	InterceptorManager.prototype.forEach = function forEach(fn) {
	  utils.forEach(this.handlers, function forEachHandler(h) {
	    if (h !== null) {
	      fn(h);
	    }
	  });
	};

	module.exports = InterceptorManager;


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(38);
	var transformData = __webpack_require__(56);
	var isCancel = __webpack_require__(57);
	var defaults = __webpack_require__(42);
	var isAbsoluteURL = __webpack_require__(58);
	var combineURLs = __webpack_require__(59);

	/**
	 * Throws a `Cancel` if cancellation has been requested.
	 */
	function throwIfCancellationRequested(config) {
	  if (config.cancelToken) {
	    config.cancelToken.throwIfRequested();
	  }
	}

	/**
	 * Dispatch a request to the server using the configured adapter.
	 *
	 * @param {object} config The config that is to be used for the request
	 * @returns {Promise} The Promise to be fulfilled
	 */
	module.exports = function dispatchRequest(config) {
	  throwIfCancellationRequested(config);

	  // Support baseURL config
	  if (config.baseURL && !isAbsoluteURL(config.url)) {
	    config.url = combineURLs(config.baseURL, config.url);
	  }

	  // Ensure headers exist
	  config.headers = config.headers || {};

	  // Transform request data
	  config.data = transformData(
	    config.data,
	    config.headers,
	    config.transformRequest
	  );

	  // Flatten headers
	  config.headers = utils.merge(
	    config.headers.common || {},
	    config.headers[config.method] || {},
	    config.headers || {}
	  );

	  utils.forEach(
	    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
	    function cleanHeaderConfig(method) {
	      delete config.headers[method];
	    }
	  );

	  var adapter = config.adapter || defaults.adapter;

	  return adapter(config).then(function onAdapterResolution(response) {
	    throwIfCancellationRequested(config);

	    // Transform response data
	    response.data = transformData(
	      response.data,
	      response.headers,
	      config.transformResponse
	    );

	    return response;
	  }, function onAdapterRejection(reason) {
	    if (!isCancel(reason)) {
	      throwIfCancellationRequested(config);

	      // Transform response data
	      if (reason && reason.response) {
	        reason.response.data = transformData(
	          reason.response.data,
	          reason.response.headers,
	          config.transformResponse
	        );
	      }
	    }

	    return Promise.reject(reason);
	  });
	};


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(38);

	/**
	 * Transform the data for a request or a response
	 *
	 * @param {Object|String} data The data to be transformed
	 * @param {Array} headers The headers for the request or response
	 * @param {Array|Function} fns A single function or Array of functions
	 * @returns {*} The resulting transformed data
	 */
	module.exports = function transformData(data, headers, fns) {
	  /*eslint no-param-reassign:0*/
	  utils.forEach(fns, function transform(fn) {
	    data = fn(data, headers);
	  });

	  return data;
	};


/***/ }),
/* 57 */
/***/ (function(module, exports) {

	'use strict';

	module.exports = function isCancel(value) {
	  return !!(value && value.__CANCEL__);
	};


/***/ }),
/* 58 */
/***/ (function(module, exports) {

	'use strict';

	/**
	 * Determines whether the specified URL is absolute
	 *
	 * @param {string} url The URL to test
	 * @returns {boolean} True if the specified URL is absolute, otherwise false
	 */
	module.exports = function isAbsoluteURL(url) {
	  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
	  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
	  // by any combination of letters, digits, plus, period, or hyphen.
	  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
	};


/***/ }),
/* 59 */
/***/ (function(module, exports) {

	'use strict';

	/**
	 * Creates a new URL by combining the specified URLs
	 *
	 * @param {string} baseURL The base URL
	 * @param {string} relativeURL The relative URL
	 * @returns {string} The combined URL
	 */
	module.exports = function combineURLs(baseURL, relativeURL) {
	  return relativeURL
	    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
	    : baseURL;
	};


/***/ }),
/* 60 */
/***/ (function(module, exports) {

	'use strict';

	/**
	 * A `Cancel` is an object that is thrown when an operation is canceled.
	 *
	 * @class
	 * @param {string=} message The message.
	 */
	function Cancel(message) {
	  this.message = message;
	}

	Cancel.prototype.toString = function toString() {
	  return 'Cancel' + (this.message ? ': ' + this.message : '');
	};

	Cancel.prototype.__CANCEL__ = true;

	module.exports = Cancel;


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var Cancel = __webpack_require__(60);

	/**
	 * A `CancelToken` is an object that can be used to request cancellation of an operation.
	 *
	 * @class
	 * @param {Function} executor The executor function.
	 */
	function CancelToken(executor) {
	  if (typeof executor !== 'function') {
	    throw new TypeError('executor must be a function.');
	  }

	  var resolvePromise;
	  this.promise = new Promise(function promiseExecutor(resolve) {
	    resolvePromise = resolve;
	  });

	  var token = this;
	  executor(function cancel(message) {
	    if (token.reason) {
	      // Cancellation has already been requested
	      return;
	    }

	    token.reason = new Cancel(message);
	    resolvePromise(token.reason);
	  });
	}

	/**
	 * Throws a `Cancel` if cancellation has been requested.
	 */
	CancelToken.prototype.throwIfRequested = function throwIfRequested() {
	  if (this.reason) {
	    throw this.reason;
	  }
	};

	/**
	 * Returns an object that contains a new `CancelToken` and a function that, when called,
	 * cancels the `CancelToken`.
	 */
	CancelToken.source = function source() {
	  var cancel;
	  var token = new CancelToken(function executor(c) {
	    cancel = c;
	  });
	  return {
	    token: token,
	    cancel: cancel
	  };
	};

	module.exports = CancelToken;


/***/ }),
/* 62 */
/***/ (function(module, exports) {

	'use strict';

	/**
	 * Syntactic sugar for invoking a function and expanding an array for arguments.
	 *
	 * Common use case would be to use `Function.prototype.apply`.
	 *
	 *  ```js
	 *  function f(x, y, z) {}
	 *  var args = [1, 2, 3];
	 *  f.apply(null, args);
	 *  ```
	 *
	 * With `spread` this example can be re-written.
	 *
	 *  ```js
	 *  spread(function(x, y, z) {})([1, 2, 3]);
	 *  ```
	 *
	 * @param {Function} callback
	 * @returns {Function}
	 */
	module.exports = function spread(callback) {
	  return function wrap(arr) {
	    return callback.apply(null, arr);
	  };
	};


/***/ }),
/* 63 */
/***/ (function(module, exports) {

	'use strict';

	var DEBUG = true;
	module.exports = {
	    genRqParam: function genRqParam(map) {
	        var params = '';
	        map.forEach(function (element) {
	            params += element + '=' + map[element] + '&';
	        });
	        return params.substr(0, params.length - 1);
	    },
	    l: function l(content) {
	        if (DEBUG) {
	            console.log(content);
	        }
	    },
	    e: function e(content) {
	        console.log(content);
	    }

	};

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(global, setImmediate) {"use strict";

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	/*!
	 * Vue.js v2.5.3
	 * (c) 2014-2017 Evan You
	 * Released under the MIT License.
	 */
	!function (e, t) {
	  "object" == ( false ? "undefined" : _typeof(exports)) && "undefined" != typeof module ? module.exports = t() :  true ? !(__WEBPACK_AMD_DEFINE_FACTORY__ = (t), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : e.Vue = t();
	}(undefined, function () {
	  "use strict";
	  function e(e) {
	    return void 0 === e || null === e;
	  }function t(e) {
	    return void 0 !== e && null !== e;
	  }function n(e) {
	    return !0 === e;
	  }function r(e) {
	    return !1 === e;
	  }function i(e) {
	    return "string" == typeof e || "number" == typeof e || "boolean" == typeof e;
	  }function o(e) {
	    return null !== e && "object" == (typeof e === "undefined" ? "undefined" : _typeof(e));
	  }function a(e) {
	    return "[object Object]" === Oi.call(e);
	  }function s(e) {
	    return "[object RegExp]" === Oi.call(e);
	  }function c(e) {
	    var t = parseFloat(String(e));return t >= 0 && Math.floor(t) === t && isFinite(e);
	  }function u(e) {
	    return null == e ? "" : "object" == (typeof e === "undefined" ? "undefined" : _typeof(e)) ? JSON.stringify(e, null, 2) : String(e);
	  }function l(e) {
	    var t = parseFloat(e);return isNaN(t) ? e : t;
	  }function f(e, t) {
	    for (var n = Object.create(null), r = e.split(","), i = 0; i < r.length; i++) {
	      n[r[i]] = !0;
	    }return t ? function (e) {
	      return n[e.toLowerCase()];
	    } : function (e) {
	      return n[e];
	    };
	  }function d(e, t) {
	    if (e.length) {
	      var n = e.indexOf(t);if (n > -1) return e.splice(n, 1);
	    }
	  }function p(e, t) {
	    return Ei.call(e, t);
	  }function v(e) {
	    var t = Object.create(null);return function (n) {
	      return t[n] || (t[n] = e(n));
	    };
	  }function h(e, t) {
	    function n(n) {
	      var r = arguments.length;return r ? r > 1 ? e.apply(t, arguments) : e.call(t, n) : e.call(t);
	    }return n._length = e.length, n;
	  }function m(e, t) {
	    t = t || 0;for (var n = e.length - t, r = new Array(n); n--;) {
	      r[n] = e[n + t];
	    }return r;
	  }function y(e, t) {
	    for (var n in t) {
	      e[n] = t[n];
	    }return e;
	  }function g(e) {
	    for (var t = {}, n = 0; n < e.length; n++) {
	      e[n] && y(t, e[n]);
	    }return t;
	  }function _(e, t, n) {}function b(e, t) {
	    if (e === t) return !0;var n = o(e),
	        r = o(t);if (!n || !r) return !n && !r && String(e) === String(t);try {
	      var i = Array.isArray(e),
	          a = Array.isArray(t);if (i && a) return e.length === t.length && e.every(function (e, n) {
	        return b(e, t[n]);
	      });if (i || a) return !1;var s = Object.keys(e),
	          c = Object.keys(t);return s.length === c.length && s.every(function (n) {
	        return b(e[n], t[n]);
	      });
	    } catch (e) {
	      return !1;
	    }
	  }function $(e, t) {
	    for (var n = 0; n < e.length; n++) {
	      if (b(e[n], t)) return n;
	    }return -1;
	  }function C(e) {
	    var t = !1;return function () {
	      t || (t = !0, e.apply(this, arguments));
	    };
	  }function w(e) {
	    var t = (e + "").charCodeAt(0);return 36 === t || 95 === t;
	  }function x(e, t, n, r) {
	    Object.defineProperty(e, t, { value: n, enumerable: !!r, writable: !0, configurable: !0 });
	  }function k(e) {
	    if (!Vi.test(e)) {
	      var t = e.split(".");return function (e) {
	        for (var n = 0; n < t.length; n++) {
	          if (!e) return;e = e[t[n]];
	        }return e;
	      };
	    }
	  }function A(e) {
	    return "function" == typeof e && /native code/.test(e.toString());
	  }function O(e) {
	    co.target && uo.push(co.target), co.target = e;
	  }function S() {
	    co.target = uo.pop();
	  }function T(e) {
	    return new lo(void 0, void 0, void 0, String(e));
	  }function E(e, t) {
	    var n = e.componentOptions,
	        r = new lo(e.tag, e.data, e.children, e.text, e.elm, e.context, n, e.asyncFactory);return r.ns = e.ns, r.isStatic = e.isStatic, r.key = e.key, r.isComment = e.isComment, r.isCloned = !0, t && (e.children && (r.children = j(e.children, !0)), n && n.children && (n.children = j(n.children, !0))), r;
	  }function j(e, t) {
	    for (var n = e.length, r = new Array(n), i = 0; i < n; i++) {
	      r[i] = E(e[i], t);
	    }return r;
	  }function N(e, t, n) {
	    e.__proto__ = t;
	  }function L(e, t, n) {
	    for (var r = 0, i = n.length; r < i; r++) {
	      var o = n[r];x(e, o, t[o]);
	    }
	  }function I(e, t) {
	    if (o(e) && !(e instanceof lo)) {
	      var n;return p(e, "__ob__") && e.__ob__ instanceof go ? n = e.__ob__ : yo.shouldConvert && !ro() && (Array.isArray(e) || a(e)) && Object.isExtensible(e) && !e._isVue && (n = new go(e)), t && n && n.vmCount++, n;
	    }
	  }function M(e, t, n, r, i) {
	    var o = new co(),
	        a = Object.getOwnPropertyDescriptor(e, t);if (!a || !1 !== a.configurable) {
	      var s = a && a.get,
	          c = a && a.set,
	          u = !i && I(n);Object.defineProperty(e, t, { enumerable: !0, configurable: !0, get: function get() {
	          var t = s ? s.call(e) : n;return co.target && (o.depend(), u && (u.dep.depend(), Array.isArray(t) && F(t))), t;
	        }, set: function set(t) {
	          var r = s ? s.call(e) : n;t === r || t !== t && r !== r || (c ? c.call(e, t) : n = t, u = !i && I(t), o.notify());
	        } });
	    }
	  }function D(e, t, n) {
	    if (Array.isArray(e) && c(t)) return e.length = Math.max(e.length, t), e.splice(t, 1, n), n;if (t in e && !(t in Object.prototype)) return e[t] = n, n;var r = e.__ob__;return e._isVue || r && r.vmCount ? n : r ? (M(r.value, t, n), r.dep.notify(), n) : (e[t] = n, n);
	  }function P(e, t) {
	    if (Array.isArray(e) && c(t)) e.splice(t, 1);else {
	      var n = e.__ob__;e._isVue || n && n.vmCount || p(e, t) && (delete e[t], n && n.dep.notify());
	    }
	  }function F(e) {
	    for (var t = void 0, n = 0, r = e.length; n < r; n++) {
	      (t = e[n]) && t.__ob__ && t.__ob__.dep.depend(), Array.isArray(t) && F(t);
	    }
	  }function R(e, t) {
	    if (!t) return e;for (var n, r, i, o = Object.keys(t), s = 0; s < o.length; s++) {
	      r = e[n = o[s]], i = t[n], p(e, n) ? a(r) && a(i) && R(r, i) : D(e, n, i);
	    }return e;
	  }function H(e, t, n) {
	    return n ? function () {
	      var r = "function" == typeof t ? t.call(n) : t,
	          i = "function" == typeof e ? e.call(n) : e;return r ? R(r, i) : i;
	    } : t ? e ? function () {
	      return R("function" == typeof t ? t.call(this) : t, "function" == typeof e ? e.call(this) : e);
	    } : t : e;
	  }function B(e, t) {
	    return t ? e ? e.concat(t) : Array.isArray(t) ? t : [t] : e;
	  }function U(e, t, n, r) {
	    var i = Object.create(e || null);return t ? y(i, t) : i;
	  }function V(e, t) {
	    var n = e.props;if (n) {
	      var r,
	          i,
	          o = {};if (Array.isArray(n)) for (r = n.length; r--;) {
	        "string" == typeof (i = n[r]) && (o[Ni(i)] = { type: null });
	      } else if (a(n)) for (var s in n) {
	        i = n[s], o[Ni(s)] = a(i) ? i : { type: i };
	      }e.props = o;
	    }
	  }function z(e, t) {
	    var n = e.inject,
	        r = e.inject = {};if (Array.isArray(n)) for (var i = 0; i < n.length; i++) {
	      r[n[i]] = { from: n[i] };
	    } else if (a(n)) for (var o in n) {
	      var s = n[o];r[o] = a(s) ? y({ from: o }, s) : { from: s };
	    }
	  }function K(e) {
	    var t = e.directives;if (t) for (var n in t) {
	      var r = t[n];"function" == typeof r && (t[n] = { bind: r, update: r });
	    }
	  }function J(e, t, n) {
	    function r(r) {
	      var i = _o[r] || Co;c[r] = i(e[r], t[r], n, r);
	    }"function" == typeof t && (t = t.options), V(t, n), z(t, n), K(t);var i = t.extends;if (i && (e = J(e, i, n)), t.mixins) for (var o = 0, a = t.mixins.length; o < a; o++) {
	      e = J(e, t.mixins[o], n);
	    }var s,
	        c = {};for (s in e) {
	      r(s);
	    }for (s in t) {
	      p(e, s) || r(s);
	    }return c;
	  }function q(e, t, n, r) {
	    if ("string" == typeof n) {
	      var i = e[t];if (p(i, n)) return i[n];var o = Ni(n);if (p(i, o)) return i[o];var a = Li(o);if (p(i, a)) return i[a];var s = i[n] || i[o] || i[a];return s;
	    }
	  }function W(e, t, n, r) {
	    var i = t[e],
	        o = !p(n, e),
	        a = n[e];if (Y(Boolean, i.type) && (o && !p(i, "default") ? a = !1 : Y(String, i.type) || "" !== a && a !== Mi(e) || (a = !0)), void 0 === a) {
	      a = G(r, i, e);var s = yo.shouldConvert;yo.shouldConvert = !0, I(a), yo.shouldConvert = s;
	    }return a;
	  }function G(e, t, n) {
	    if (p(t, "default")) {
	      var r = t.default;return e && e.$options.propsData && void 0 === e.$options.propsData[n] && void 0 !== e._props[n] ? e._props[n] : "function" == typeof r && "Function" !== Z(t.type) ? r.call(e) : r;
	    }
	  }function Z(e) {
	    var t = e && e.toString().match(/^\s*function (\w+)/);return t ? t[1] : "";
	  }function Y(e, t) {
	    if (!Array.isArray(t)) return Z(t) === Z(e);for (var n = 0, r = t.length; n < r; n++) {
	      if (Z(t[n]) === Z(e)) return !0;
	    }return !1;
	  }function Q(e, t, n) {
	    if (t) for (var r = t; r = r.$parent;) {
	      var i = r.$options.errorCaptured;if (i) for (var o = 0; o < i.length; o++) {
	        try {
	          if (!1 === i[o].call(r, e, t, n)) return;
	        } catch (e) {
	          X(e, r, "errorCaptured hook");
	        }
	      }
	    }X(e, t, n);
	  }function X(e, t, n) {
	    if (Bi.errorHandler) try {
	      return Bi.errorHandler.call(null, e, t, n);
	    } catch (e) {
	      ee(e, null, "config.errorHandler");
	    }ee(e, t, n);
	  }function ee(e, t, n) {
	    if (!Ki || "undefined" == typeof console) throw e;console.error(e);
	  }function te() {
	    xo = !1;var e = wo.slice(0);wo.length = 0;for (var t = 0; t < e.length; t++) {
	      e[t]();
	    }
	  }function ne(e) {
	    return e._withTask || (e._withTask = function () {
	      ko = !0;var t = e.apply(null, arguments);return ko = !1, t;
	    });
	  }function re(e, t) {
	    var n;if (wo.push(function () {
	      if (e) try {
	        e.call(t);
	      } catch (e) {
	        Q(e, t, "nextTick");
	      } else n && n(t);
	    }), xo || (xo = !0, ko ? $o() : bo()), !e && "undefined" != typeof Promise) return new Promise(function (e) {
	      n = e;
	    });
	  }function ie(e) {
	    function t() {
	      var e = arguments,
	          n = t.fns;if (!Array.isArray(n)) return n.apply(null, arguments);for (var r = n.slice(), i = 0; i < r.length; i++) {
	        r[i].apply(null, e);
	      }
	    }return t.fns = e, t;
	  }function oe(t, n, r, i, o) {
	    var a, s, c, u;for (a in t) {
	      s = t[a], c = n[a], u = Eo(a), e(s) || (e(c) ? (e(s.fns) && (s = t[a] = ie(s)), r(u.name, s, u.once, u.capture, u.passive)) : s !== c && (c.fns = s, t[a] = c));
	    }for (a in n) {
	      e(t[a]) && i((u = Eo(a)).name, n[a], u.capture);
	    }
	  }function ae(r, i, o) {
	    function a() {
	      o.apply(this, arguments), d(s.fns, a);
	    }r instanceof lo && (r = r.data.hook || (r.data.hook = {}));var s,
	        c = r[i];e(c) ? s = ie([a]) : t(c.fns) && n(c.merged) ? (s = c).fns.push(a) : s = ie([c, a]), s.merged = !0, r[i] = s;
	  }function se(n, r, i) {
	    var o = r.options.props;if (!e(o)) {
	      var a = {},
	          s = n.attrs,
	          c = n.props;if (t(s) || t(c)) for (var u in o) {
	        var l = Mi(u);ce(a, c, u, l, !0) || ce(a, s, u, l, !1);
	      }return a;
	    }
	  }function ce(e, n, r, i, o) {
	    if (t(n)) {
	      if (p(n, r)) return e[r] = n[r], o || delete n[r], !0;if (p(n, i)) return e[r] = n[i], o || delete n[i], !0;
	    }return !1;
	  }function ue(e) {
	    for (var t = 0; t < e.length; t++) {
	      if (Array.isArray(e[t])) return Array.prototype.concat.apply([], e);
	    }return e;
	  }function le(e) {
	    return i(e) ? [T(e)] : Array.isArray(e) ? de(e) : void 0;
	  }function fe(e) {
	    return t(e) && t(e.text) && r(e.isComment);
	  }function de(r, o) {
	    var a,
	        s,
	        c,
	        u,
	        l = [];for (a = 0; a < r.length; a++) {
	      e(s = r[a]) || "boolean" == typeof s || (u = l[c = l.length - 1], Array.isArray(s) ? s.length > 0 && (fe((s = de(s, (o || "") + "_" + a))[0]) && fe(u) && (l[c] = T(u.text + s[0].text), s.shift()), l.push.apply(l, s)) : i(s) ? fe(u) ? l[c] = T(u.text + s) : "" !== s && l.push(T(s)) : fe(s) && fe(u) ? l[c] = T(u.text + s.text) : (n(r._isVList) && t(s.tag) && e(s.key) && t(o) && (s.key = "__vlist" + o + "_" + a + "__"), l.push(s)));
	    }return l;
	  }function pe(e, t) {
	    return (e.__esModule || oo && "Module" === e[Symbol.toStringTag]) && (e = e.default), o(e) ? t.extend(e) : e;
	  }function ve(e, t, n, r, i) {
	    var o = po();return o.asyncFactory = e, o.asyncMeta = { data: t, context: n, children: r, tag: i }, o;
	  }function he(r, i, a) {
	    if (n(r.error) && t(r.errorComp)) return r.errorComp;if (t(r.resolved)) return r.resolved;if (n(r.loading) && t(r.loadingComp)) return r.loadingComp;if (!t(r.contexts)) {
	      var s = r.contexts = [a],
	          c = !0,
	          u = function u() {
	        for (var e = 0, t = s.length; e < t; e++) {
	          s[e].$forceUpdate();
	        }
	      },
	          l = C(function (e) {
	        r.resolved = pe(e, i), c || u();
	      }),
	          f = C(function (e) {
	        t(r.errorComp) && (r.error = !0, u());
	      }),
	          d = r(l, f);return o(d) && ("function" == typeof d.then ? e(r.resolved) && d.then(l, f) : t(d.component) && "function" == typeof d.component.then && (d.component.then(l, f), t(d.error) && (r.errorComp = pe(d.error, i)), t(d.loading) && (r.loadingComp = pe(d.loading, i), 0 === d.delay ? r.loading = !0 : setTimeout(function () {
	        e(r.resolved) && e(r.error) && (r.loading = !0, u());
	      }, d.delay || 200)), t(d.timeout) && setTimeout(function () {
	        e(r.resolved) && f(null);
	      }, d.timeout))), c = !1, r.loading ? r.loadingComp : r.resolved;
	    }r.contexts.push(a);
	  }function me(e) {
	    return e.isComment && e.asyncFactory;
	  }function ye(e) {
	    if (Array.isArray(e)) for (var n = 0; n < e.length; n++) {
	      var r = e[n];if (t(r) && (t(r.componentOptions) || me(r))) return r;
	    }
	  }function ge(e) {
	    e._events = Object.create(null), e._hasHookEvent = !1;var t = e.$options._parentListeners;t && $e(e, t);
	  }function _e(e, t, n) {
	    n ? To.$once(e, t) : To.$on(e, t);
	  }function be(e, t) {
	    To.$off(e, t);
	  }function $e(e, t, n) {
	    To = e, oe(t, n || {}, _e, be, e), To = void 0;
	  }function Ce(e, t) {
	    var n = {};if (!e) return n;for (var r = 0, i = e.length; r < i; r++) {
	      var o = e[r],
	          a = o.data;if (a && a.attrs && a.attrs.slot && delete a.attrs.slot, o.context !== t && o.functionalContext !== t || !a || null == a.slot) (n.default || (n.default = [])).push(o);else {
	        var s = o.data.slot,
	            c = n[s] || (n[s] = []);"template" === o.tag ? c.push.apply(c, o.children) : c.push(o);
	      }
	    }for (var u in n) {
	      n[u].every(we) && delete n[u];
	    }return n;
	  }function we(e) {
	    return e.isComment || " " === e.text;
	  }function xe(e, t) {
	    t = t || {};for (var n = 0; n < e.length; n++) {
	      Array.isArray(e[n]) ? xe(e[n], t) : t[e[n].key] = e[n].fn;
	    }return t;
	  }function ke(e) {
	    var t = e.$options,
	        n = t.parent;if (n && !t.abstract) {
	      for (; n.$options.abstract && n.$parent;) {
	        n = n.$parent;
	      }n.$children.push(e);
	    }e.$parent = n, e.$root = n ? n.$root : e, e.$children = [], e.$refs = {}, e._watcher = null, e._inactive = null, e._directInactive = !1, e._isMounted = !1, e._isDestroyed = !1, e._isBeingDestroyed = !1;
	  }function Ae(e, t, n) {
	    e.$el = t, e.$options.render || (e.$options.render = po), je(e, "beforeMount");var r;return r = function r() {
	      e._update(e._render(), n);
	    }, e._watcher = new Ro(e, r, _), n = !1, null == e.$vnode && (e._isMounted = !0, je(e, "mounted")), e;
	  }function Oe(e, t, n, r, i) {
	    var o = !!(i || e.$options._renderChildren || r.data.scopedSlots || e.$scopedSlots !== Ui);if (e.$options._parentVnode = r, e.$vnode = r, e._vnode && (e._vnode.parent = r), e.$options._renderChildren = i, e.$attrs = r.data && r.data.attrs || Ui, e.$listeners = n || Ui, t && e.$options.props) {
	      yo.shouldConvert = !1;for (var a = e._props, s = e.$options._propKeys || [], c = 0; c < s.length; c++) {
	        var u = s[c];a[u] = W(u, e.$options.props, t, e);
	      }yo.shouldConvert = !0, e.$options.propsData = t;
	    }if (n) {
	      var l = e.$options._parentListeners;e.$options._parentListeners = n, $e(e, n, l);
	    }o && (e.$slots = Ce(i, r.context), e.$forceUpdate());
	  }function Se(e) {
	    for (; e && (e = e.$parent);) {
	      if (e._inactive) return !0;
	    }return !1;
	  }function Te(e, t) {
	    if (t) {
	      if (e._directInactive = !1, Se(e)) return;
	    } else if (e._directInactive) return;if (e._inactive || null === e._inactive) {
	      e._inactive = !1;for (var n = 0; n < e.$children.length; n++) {
	        Te(e.$children[n]);
	      }je(e, "activated");
	    }
	  }function Ee(e, t) {
	    if (!(t && (e._directInactive = !0, Se(e)) || e._inactive)) {
	      e._inactive = !0;for (var n = 0; n < e.$children.length; n++) {
	        Ee(e.$children[n]);
	      }je(e, "deactivated");
	    }
	  }function je(e, t) {
	    var n = e.$options[t];if (n) for (var r = 0, i = n.length; r < i; r++) {
	      try {
	        n[r].call(e);
	      } catch (n) {
	        Q(n, e, t + " hook");
	      }
	    }e._hasHookEvent && e.$emit("hook:" + t);
	  }function Ne() {
	    Po = No.length = Lo.length = 0, Io = {}, Mo = Do = !1;
	  }function Le() {
	    Do = !0;var e, t;for (No.sort(function (e, t) {
	      return e.id - t.id;
	    }), Po = 0; Po < No.length; Po++) {
	      t = (e = No[Po]).id, Io[t] = null, e.run();
	    }var n = Lo.slice(),
	        r = No.slice();Ne(), De(n), Ie(r), io && Bi.devtools && io.emit("flush");
	  }function Ie(e) {
	    for (var t = e.length; t--;) {
	      var n = e[t],
	          r = n.vm;r._watcher === n && r._isMounted && je(r, "updated");
	    }
	  }function Me(e) {
	    e._inactive = !1, Lo.push(e);
	  }function De(e) {
	    for (var t = 0; t < e.length; t++) {
	      e[t]._inactive = !0, Te(e[t], !0);
	    }
	  }function Pe(e) {
	    var t = e.id;if (null == Io[t]) {
	      if (Io[t] = !0, Do) {
	        for (var n = No.length - 1; n > Po && No[n].id > e.id;) {
	          n--;
	        }No.splice(n + 1, 0, e);
	      } else No.push(e);Mo || (Mo = !0, re(Le));
	    }
	  }function Fe(e) {
	    Ho.clear(), Re(e, Ho);
	  }function Re(e, t) {
	    var n,
	        r,
	        i = Array.isArray(e);if ((i || o(e)) && Object.isExtensible(e)) {
	      if (e.__ob__) {
	        var a = e.__ob__.dep.id;if (t.has(a)) return;t.add(a);
	      }if (i) for (n = e.length; n--;) {
	        Re(e[n], t);
	      } else for (n = (r = Object.keys(e)).length; n--;) {
	        Re(e[r[n]], t);
	      }
	    }
	  }function He(e, t, n) {
	    Bo.get = function () {
	      return this[t][n];
	    }, Bo.set = function (e) {
	      this[t][n] = e;
	    }, Object.defineProperty(e, n, Bo);
	  }function Be(e) {
	    e._watchers = [];var t = e.$options;t.props && Ue(e, t.props), t.methods && We(e, t.methods), t.data ? Ve(e) : I(e._data = {}, !0), t.computed && Ke(e, t.computed), t.watch && t.watch !== Qi && Ge(e, t.watch);
	  }function Ue(e, t) {
	    var n = e.$options.propsData || {},
	        r = e._props = {},
	        i = e.$options._propKeys = [],
	        o = !e.$parent;yo.shouldConvert = o;for (var a in t) {
	      !function (o) {
	        i.push(o);var a = W(o, t, n, e);M(r, o, a), o in e || He(e, "_props", o);
	      }(a);
	    }yo.shouldConvert = !0;
	  }function Ve(e) {
	    var t = e.$options.data;a(t = e._data = "function" == typeof t ? ze(t, e) : t || {}) || (t = {});for (var n = Object.keys(t), r = e.$options.props, i = n.length; i--;) {
	      var o = n[i];r && p(r, o) || w(o) || He(e, "_data", o);
	    }I(t, !0);
	  }function ze(e, t) {
	    try {
	      return e.call(t, t);
	    } catch (e) {
	      return Q(e, t, "data()"), {};
	    }
	  }function Ke(e, t) {
	    var n = e._computedWatchers = Object.create(null),
	        r = ro();for (var i in t) {
	      var o = t[i],
	          a = "function" == typeof o ? o : o.get;r || (n[i] = new Ro(e, a || _, _, Uo)), i in e || Je(e, i, o);
	    }
	  }function Je(e, t, n) {
	    var r = !ro();"function" == typeof n ? (Bo.get = r ? qe(t) : n, Bo.set = _) : (Bo.get = n.get ? r && !1 !== n.cache ? qe(t) : n.get : _, Bo.set = n.set ? n.set : _), Object.defineProperty(e, t, Bo);
	  }function qe(e) {
	    return function () {
	      var t = this._computedWatchers && this._computedWatchers[e];if (t) return t.dirty && t.evaluate(), co.target && t.depend(), t.value;
	    };
	  }function We(e, t) {
	    for (var n in t) {
	      e[n] = null == t[n] ? _ : h(t[n], e);
	    }
	  }function Ge(e, t) {
	    for (var n in t) {
	      var r = t[n];if (Array.isArray(r)) for (var i = 0; i < r.length; i++) {
	        Ze(e, n, r[i]);
	      } else Ze(e, n, r);
	    }
	  }function Ze(e, t, n, r) {
	    return a(n) && (r = n, n = n.handler), "string" == typeof n && (n = e[n]), e.$watch(t, n, r);
	  }function Ye(e) {
	    var t = e.$options.provide;t && (e._provided = "function" == typeof t ? t.call(e) : t);
	  }function Qe(e) {
	    var t = Xe(e.$options.inject, e);t && (yo.shouldConvert = !1, Object.keys(t).forEach(function (n) {
	      M(e, n, t[n]);
	    }), yo.shouldConvert = !0);
	  }function Xe(e, t) {
	    if (e) {
	      for (var n = Object.create(null), r = oo ? Reflect.ownKeys(e).filter(function (t) {
	        return Object.getOwnPropertyDescriptor(e, t).enumerable;
	      }) : Object.keys(e), i = 0; i < r.length; i++) {
	        for (var o = r[i], a = e[o].from, s = t; s;) {
	          if (s._provided && a in s._provided) {
	            n[o] = s._provided[a];break;
	          }s = s.$parent;
	        }if (!s && "default" in e[o]) {
	          var c = e[o].default;n[o] = "function" == typeof c ? c.call(t) : c;
	        }
	      }return n;
	    }
	  }function et(e, n) {
	    var r, i, a, s, c;if (Array.isArray(e) || "string" == typeof e) for (r = new Array(e.length), i = 0, a = e.length; i < a; i++) {
	      r[i] = n(e[i], i);
	    } else if ("number" == typeof e) for (r = new Array(e), i = 0; i < e; i++) {
	      r[i] = n(i + 1, i);
	    } else if (o(e)) for (s = Object.keys(e), r = new Array(s.length), i = 0, a = s.length; i < a; i++) {
	      c = s[i], r[i] = n(e[c], c, i);
	    }return t(r) && (r._isVList = !0), r;
	  }function tt(e, t, n, r) {
	    var i,
	        o = this.$scopedSlots[e];if (o) n = n || {}, r && (n = y(y({}, r), n)), i = o(n) || t;else {
	      var a = this.$slots[e];a && (a._rendered = !0), i = a || t;
	    }var s = n && n.slot;return s ? this.$createElement("template", { slot: s }, i) : i;
	  }function nt(e) {
	    return q(this.$options, "filters", e, !0) || Pi;
	  }function rt(e, t, n, r) {
	    var i = Bi.keyCodes[t] || n;return i ? Array.isArray(i) ? -1 === i.indexOf(e) : i !== e : r ? Mi(r) !== t : void 0;
	  }function it(e, t, n, r, i) {
	    if (n) if (o(n)) {
	      Array.isArray(n) && (n = g(n));var a;for (var s in n) {
	        !function (o) {
	          if ("class" === o || "style" === o || Ti(o)) a = e;else {
	            var s = e.attrs && e.attrs.type;a = r || Bi.mustUseProp(t, s, o) ? e.domProps || (e.domProps = {}) : e.attrs || (e.attrs = {});
	          }o in a || (a[o] = n[o], i && ((e.on || (e.on = {}))["update:" + o] = function (e) {
	            n[o] = e;
	          }));
	        }(s);
	      }
	    } else ;return e;
	  }function ot(e, t) {
	    var n = this.$options,
	        r = n.cached || (n.cached = []),
	        i = r[e];return i && !t ? Array.isArray(i) ? j(i) : E(i) : (i = r[e] = n.staticRenderFns[e].call(this._renderProxy, null, this), st(i, "__static__" + e, !1), i);
	  }function at(e, t, n) {
	    return st(e, "__once__" + t + (n ? "_" + n : ""), !0), e;
	  }function st(e, t, n) {
	    if (Array.isArray(e)) for (var r = 0; r < e.length; r++) {
	      e[r] && "string" != typeof e[r] && ct(e[r], t + "_" + r, n);
	    } else ct(e, t, n);
	  }function ct(e, t, n) {
	    e.isStatic = !0, e.key = t, e.isOnce = n;
	  }function ut(e, t) {
	    if (t) if (a(t)) {
	      var n = e.on = e.on ? y({}, e.on) : {};for (var r in t) {
	        var i = n[r],
	            o = t[r];n[r] = i ? [].concat(i, o) : o;
	      }
	    } else ;return e;
	  }function lt(e) {
	    e._o = at, e._n = l, e._s = u, e._l = et, e._t = tt, e._q = b, e._i = $, e._m = ot, e._f = nt, e._k = rt, e._b = it, e._v = T, e._e = po, e._u = xe, e._g = ut;
	  }function ft(e, t, r, i, o) {
	    var a = o.options;this.data = e, this.props = t, this.children = r, this.parent = i, this.listeners = e.on || Ui, this.injections = Xe(a.inject, i), this.slots = function () {
	      return Ce(r, i);
	    };var s = Object.create(i),
	        c = n(a._compiled),
	        u = !c;c && (this.$options = a, this.$slots = this.slots(), this.$scopedSlots = e.scopedSlots || Ui), a._scopeId ? this._c = function (e, t, n, r) {
	      var o = _t(s, e, t, n, r, u);return o && (o.functionalScopeId = a._scopeId, o.functionalContext = i), o;
	    } : this._c = function (e, t, n, r) {
	      return _t(s, e, t, n, r, u);
	    };
	  }function dt(e, n, r, i, o) {
	    var a = e.options,
	        s = {},
	        c = a.props;if (t(c)) for (var u in c) {
	      s[u] = W(u, c, n || Ui);
	    } else t(r.attrs) && pt(s, r.attrs), t(r.props) && pt(s, r.props);var l = new ft(r, s, o, i, e),
	        f = a.render.call(null, l._c, l);return f instanceof lo && (f.functionalContext = i, f.functionalOptions = a, r.slot && ((f.data || (f.data = {})).slot = r.slot)), f;
	  }function pt(e, t) {
	    for (var n in t) {
	      e[Ni(n)] = t[n];
	    }
	  }function vt(r, i, a, s, c) {
	    if (!e(r)) {
	      var u = a.$options._base;if (o(r) && (r = u.extend(r)), "function" == typeof r) {
	        var l;if (e(r.cid) && (l = r, void 0 === (r = he(l, u, a)))) return ve(l, i, a, s, c);i = i || {}, xt(r), t(i.model) && gt(r.options, i);var f = se(i, r, c);if (n(r.options.functional)) return dt(r, f, i, a, s);var d = i.on;if (i.on = i.nativeOn, n(r.options.abstract)) {
	          var p = i.slot;i = {}, p && (i.slot = p);
	        }mt(i);var v = r.options.name || c;return new lo("vue-component-" + r.cid + (v ? "-" + v : ""), i, void 0, void 0, void 0, a, { Ctor: r, propsData: f, listeners: d, tag: c, children: s }, l);
	      }
	    }
	  }function ht(e, n, r, i) {
	    var o = e.componentOptions,
	        a = { _isComponent: !0, parent: n, propsData: o.propsData, _componentTag: o.tag, _parentVnode: e, _parentListeners: o.listeners, _renderChildren: o.children, _parentElm: r || null, _refElm: i || null },
	        s = e.data.inlineTemplate;return t(s) && (a.render = s.render, a.staticRenderFns = s.staticRenderFns), new o.Ctor(a);
	  }function mt(e) {
	    e.hook || (e.hook = {});for (var t = 0; t < zo.length; t++) {
	      var n = zo[t],
	          r = e.hook[n],
	          i = Vo[n];e.hook[n] = r ? yt(i, r) : i;
	    }
	  }function yt(e, t) {
	    return function (n, r, i, o) {
	      e(n, r, i, o), t(n, r, i, o);
	    };
	  }function gt(e, n) {
	    var r = e.model && e.model.prop || "value",
	        i = e.model && e.model.event || "input";(n.props || (n.props = {}))[r] = n.model.value;var o = n.on || (n.on = {});t(o[i]) ? o[i] = [n.model.callback].concat(o[i]) : o[i] = n.model.callback;
	  }function _t(e, t, r, o, a, s) {
	    return (Array.isArray(r) || i(r)) && (a = o, o = r, r = void 0), n(s) && (a = Jo), bt(e, t, r, o, a);
	  }function bt(e, n, r, i, o) {
	    if (t(r) && t(r.__ob__)) return po();if (t(r) && t(r.is) && (n = r.is), !n) return po();Array.isArray(i) && "function" == typeof i[0] && ((r = r || {}).scopedSlots = { default: i[0] }, i.length = 0), o === Jo ? i = le(i) : o === Ko && (i = ue(i));var a, s;if ("string" == typeof n) {
	      var c;s = e.$vnode && e.$vnode.ns || Bi.getTagNamespace(n), a = Bi.isReservedTag(n) ? new lo(Bi.parsePlatformTagName(n), r, i, void 0, void 0, e) : t(c = q(e.$options, "components", n)) ? vt(c, r, e, i, n) : new lo(n, r, i, void 0, void 0, e);
	    } else a = vt(n, r, e, i);return t(a) ? (s && $t(a, s), a) : po();
	  }function $t(r, i, o) {
	    if (r.ns = i, "foreignObject" === r.tag && (i = void 0, o = !0), t(r.children)) for (var a = 0, s = r.children.length; a < s; a++) {
	      var c = r.children[a];t(c.tag) && (e(c.ns) || n(o)) && $t(c, i, o);
	    }
	  }function Ct(e) {
	    e._vnode = null;var t = e.$options,
	        n = e.$vnode = t._parentVnode,
	        r = n && n.context;e.$slots = Ce(t._renderChildren, r), e.$scopedSlots = Ui, e._c = function (t, n, r, i) {
	      return _t(e, t, n, r, i, !1);
	    }, e.$createElement = function (t, n, r, i) {
	      return _t(e, t, n, r, i, !0);
	    };var i = n && n.data;M(e, "$attrs", i && i.attrs || Ui, null, !0), M(e, "$listeners", t._parentListeners || Ui, null, !0);
	  }function wt(e, t) {
	    var n = e.$options = Object.create(e.constructor.options);n.parent = t.parent, n.propsData = t.propsData, n._parentVnode = t._parentVnode, n._parentListeners = t._parentListeners, n._renderChildren = t._renderChildren, n._componentTag = t._componentTag, n._parentElm = t._parentElm, n._refElm = t._refElm, t.render && (n.render = t.render, n.staticRenderFns = t.staticRenderFns);
	  }function xt(e) {
	    var t = e.options;if (e.super) {
	      var n = xt(e.super);if (n !== e.superOptions) {
	        e.superOptions = n;var r = kt(e);r && y(e.extendOptions, r), (t = e.options = J(n, e.extendOptions)).name && (t.components[t.name] = e);
	      }
	    }return t;
	  }function kt(e) {
	    var t,
	        n = e.options,
	        r = e.extendOptions,
	        i = e.sealedOptions;for (var o in n) {
	      n[o] !== i[o] && (t || (t = {}), t[o] = At(n[o], r[o], i[o]));
	    }return t;
	  }function At(e, t, n) {
	    if (Array.isArray(e)) {
	      var r = [];n = Array.isArray(n) ? n : [n], t = Array.isArray(t) ? t : [t];for (var i = 0; i < e.length; i++) {
	        (t.indexOf(e[i]) >= 0 || n.indexOf(e[i]) < 0) && r.push(e[i]);
	      }return r;
	    }return e;
	  }function Ot(e) {
	    this._init(e);
	  }function St(e) {
	    e.use = function (e) {
	      var t = this._installedPlugins || (this._installedPlugins = []);if (t.indexOf(e) > -1) return this;var n = m(arguments, 1);return n.unshift(this), "function" == typeof e.install ? e.install.apply(e, n) : "function" == typeof e && e.apply(null, n), t.push(e), this;
	    };
	  }function Tt(e) {
	    e.mixin = function (e) {
	      return this.options = J(this.options, e), this;
	    };
	  }function Et(e) {
	    e.cid = 0;var t = 1;e.extend = function (e) {
	      e = e || {};var n = this,
	          r = n.cid,
	          i = e._Ctor || (e._Ctor = {});if (i[r]) return i[r];var o = e.name || n.options.name,
	          a = function a(e) {
	        this._init(e);
	      };return a.prototype = Object.create(n.prototype), a.prototype.constructor = a, a.cid = t++, a.options = J(n.options, e), a.super = n, a.options.props && jt(a), a.options.computed && Nt(a), a.extend = n.extend, a.mixin = n.mixin, a.use = n.use, Ri.forEach(function (e) {
	        a[e] = n[e];
	      }), o && (a.options.components[o] = a), a.superOptions = n.options, a.extendOptions = e, a.sealedOptions = y({}, a.options), i[r] = a, a;
	    };
	  }function jt(e) {
	    var t = e.options.props;for (var n in t) {
	      He(e.prototype, "_props", n);
	    }
	  }function Nt(e) {
	    var t = e.options.computed;for (var n in t) {
	      Je(e.prototype, n, t[n]);
	    }
	  }function Lt(e) {
	    Ri.forEach(function (t) {
	      e[t] = function (e, n) {
	        return n ? ("component" === t && a(n) && (n.name = n.name || e, n = this.options._base.extend(n)), "directive" === t && "function" == typeof n && (n = { bind: n, update: n }), this.options[t + "s"][e] = n, n) : this.options[t + "s"][e];
	      };
	    });
	  }function It(e) {
	    return e && (e.Ctor.options.name || e.tag);
	  }function Mt(e, t) {
	    return Array.isArray(e) ? e.indexOf(t) > -1 : "string" == typeof e ? e.split(",").indexOf(t) > -1 : !!s(e) && e.test(t);
	  }function Dt(e, t) {
	    var n = e.cache,
	        r = e.keys,
	        i = e._vnode;for (var o in n) {
	      var a = n[o];if (a) {
	        var s = It(a.componentOptions);s && !t(s) && Pt(n, o, r, i);
	      }
	    }
	  }function Pt(e, t, n, r) {
	    var i = e[t];i && i !== r && i.componentInstance.$destroy(), e[t] = null, d(n, t);
	  }function Ft(e) {
	    for (var n = e.data, r = e, i = e; t(i.componentInstance);) {
	      (i = i.componentInstance._vnode).data && (n = Rt(i.data, n));
	    }for (; t(r = r.parent);) {
	      r.data && (n = Rt(n, r.data));
	    }return Ht(n.staticClass, n.class);
	  }function Rt(e, n) {
	    return { staticClass: Bt(e.staticClass, n.staticClass), class: t(e.class) ? [e.class, n.class] : n.class };
	  }function Ht(e, n) {
	    return t(e) || t(n) ? Bt(e, Ut(n)) : "";
	  }function Bt(e, t) {
	    return e ? t ? e + " " + t : e : t || "";
	  }function Ut(e) {
	    return Array.isArray(e) ? Vt(e) : o(e) ? zt(e) : "string" == typeof e ? e : "";
	  }function Vt(e) {
	    for (var n, r = "", i = 0, o = e.length; i < o; i++) {
	      t(n = Ut(e[i])) && "" !== n && (r && (r += " "), r += n);
	    }return r;
	  }function zt(e) {
	    var t = "";for (var n in e) {
	      e[n] && (t && (t += " "), t += n);
	    }return t;
	  }function Kt(e) {
	    return ha(e) ? "svg" : "math" === e ? "math" : void 0;
	  }function Jt(e) {
	    if ("string" == typeof e) {
	      var t = document.querySelector(e);return t || document.createElement("div");
	    }return e;
	  }function qt(e, t) {
	    var n = e.data.ref;if (n) {
	      var r = e.context,
	          i = e.componentInstance || e.elm,
	          o = r.$refs;t ? Array.isArray(o[n]) ? d(o[n], i) : o[n] === i && (o[n] = void 0) : e.data.refInFor ? Array.isArray(o[n]) ? o[n].indexOf(i) < 0 && o[n].push(i) : o[n] = [i] : o[n] = i;
	    }
	  }function Wt(r, i) {
	    return r.key === i.key && (r.tag === i.tag && r.isComment === i.isComment && t(r.data) === t(i.data) && Gt(r, i) || n(r.isAsyncPlaceholder) && r.asyncFactory === i.asyncFactory && e(i.asyncFactory.error));
	  }function Gt(e, n) {
	    if ("input" !== e.tag) return !0;var r,
	        i = t(r = e.data) && t(r = r.attrs) && r.type,
	        o = t(r = n.data) && t(r = r.attrs) && r.type;return i === o || ga(i) && ga(o);
	  }function Zt(e, n, r) {
	    var i,
	        o,
	        a = {};for (i = n; i <= r; ++i) {
	      t(o = e[i].key) && (a[o] = i);
	    }return a;
	  }function Yt(e, t) {
	    (e.data.directives || t.data.directives) && Qt(e, t);
	  }function Qt(e, t) {
	    var n,
	        r,
	        i,
	        o = e === $a,
	        a = t === $a,
	        s = Xt(e.data.directives, e.context),
	        c = Xt(t.data.directives, t.context),
	        u = [],
	        l = [];for (n in c) {
	      r = s[n], i = c[n], r ? (i.oldValue = r.value, tn(i, "update", t, e), i.def && i.def.componentUpdated && l.push(i)) : (tn(i, "bind", t, e), i.def && i.def.inserted && u.push(i));
	    }if (u.length) {
	      var f = function f() {
	        for (var n = 0; n < u.length; n++) {
	          tn(u[n], "inserted", t, e);
	        }
	      };o ? ae(t, "insert", f) : f();
	    }if (l.length && ae(t, "postpatch", function () {
	      for (var n = 0; n < l.length; n++) {
	        tn(l[n], "componentUpdated", t, e);
	      }
	    }), !o) for (n in s) {
	      c[n] || tn(s[n], "unbind", e, e, a);
	    }
	  }function Xt(e, t) {
	    var n = Object.create(null);if (!e) return n;var r, i;for (r = 0; r < e.length; r++) {
	      (i = e[r]).modifiers || (i.modifiers = xa), n[en(i)] = i, i.def = q(t.$options, "directives", i.name, !0);
	    }return n;
	  }function en(e) {
	    return e.rawName || e.name + "." + Object.keys(e.modifiers || {}).join(".");
	  }function tn(e, t, n, r, i) {
	    var o = e.def && e.def[t];if (o) try {
	      o(n.elm, e, n, r, i);
	    } catch (r) {
	      Q(r, n.context, "directive " + e.name + " " + t + " hook");
	    }
	  }function nn(n, r) {
	    var i = r.componentOptions;if (!(t(i) && !1 === i.Ctor.options.inheritAttrs || e(n.data.attrs) && e(r.data.attrs))) {
	      var o,
	          a,
	          s = r.elm,
	          c = n.data.attrs || {},
	          u = r.data.attrs || {};t(u.__ob__) && (u = r.data.attrs = y({}, u));for (o in u) {
	        a = u[o], c[o] !== a && rn(s, o, a);
	      }(Wi || Gi) && u.value !== c.value && rn(s, "value", u.value);for (o in c) {
	        e(u[o]) && (la(o) ? s.removeAttributeNS(ua, fa(o)) : sa(o) || s.removeAttribute(o));
	      }
	    }
	  }function rn(e, t, n) {
	    ca(t) ? da(n) ? e.removeAttribute(t) : (n = "allowfullscreen" === t && "EMBED" === e.tagName ? "true" : t, e.setAttribute(t, n)) : sa(t) ? e.setAttribute(t, da(n) || "false" === n ? "false" : "true") : la(t) ? da(n) ? e.removeAttributeNS(ua, fa(t)) : e.setAttributeNS(ua, t, n) : da(n) ? e.removeAttribute(t) : e.setAttribute(t, n);
	  }function on(n, r) {
	    var i = r.elm,
	        o = r.data,
	        a = n.data;if (!(e(o.staticClass) && e(o.class) && (e(a) || e(a.staticClass) && e(a.class)))) {
	      var s = Ft(r),
	          c = i._transitionClasses;t(c) && (s = Bt(s, Ut(c))), s !== i._prevClass && (i.setAttribute("class", s), i._prevClass = s);
	    }
	  }function an(e) {
	    function t() {
	      (a || (a = [])).push(e.slice(v, i).trim()), v = i + 1;
	    }var n,
	        r,
	        i,
	        o,
	        a,
	        s = !1,
	        c = !1,
	        u = !1,
	        l = !1,
	        f = 0,
	        d = 0,
	        p = 0,
	        v = 0;for (i = 0; i < e.length; i++) {
	      if (r = n, n = e.charCodeAt(i), s) 39 === n && 92 !== r && (s = !1);else if (c) 34 === n && 92 !== r && (c = !1);else if (u) 96 === n && 92 !== r && (u = !1);else if (l) 47 === n && 92 !== r && (l = !1);else if (124 !== n || 124 === e.charCodeAt(i + 1) || 124 === e.charCodeAt(i - 1) || f || d || p) {
	        switch (n) {case 34:
	            c = !0;break;case 39:
	            s = !0;break;case 96:
	            u = !0;break;case 40:
	            p++;break;case 41:
	            p--;break;case 91:
	            d++;break;case 93:
	            d--;break;case 123:
	            f++;break;case 125:
	            f--;}if (47 === n) {
	          for (var h = i - 1, m = void 0; h >= 0 && " " === (m = e.charAt(h)); h--) {}m && Sa.test(m) || (l = !0);
	        }
	      } else void 0 === o ? (v = i + 1, o = e.slice(0, i).trim()) : t();
	    }if (void 0 === o ? o = e.slice(0, i).trim() : 0 !== v && t(), a) for (i = 0; i < a.length; i++) {
	      o = sn(o, a[i]);
	    }return o;
	  }function sn(e, t) {
	    var n = t.indexOf("(");return n < 0 ? '_f("' + t + '")(' + e + ")" : '_f("' + t.slice(0, n) + '")(' + e + "," + t.slice(n + 1);
	  }function cn(e) {
	    console.error("[Vue compiler]: " + e);
	  }function un(e, t) {
	    return e ? e.map(function (e) {
	      return e[t];
	    }).filter(function (e) {
	      return e;
	    }) : [];
	  }function ln(e, t, n) {
	    (e.props || (e.props = [])).push({ name: t, value: n });
	  }function fn(e, t, n) {
	    (e.attrs || (e.attrs = [])).push({ name: t, value: n });
	  }function dn(e, t, n, r, i, o) {
	    (e.directives || (e.directives = [])).push({ name: t, rawName: n, value: r, arg: i, modifiers: o });
	  }function pn(e, t, n, r, i, o) {
	    r && r.capture && (delete r.capture, t = "!" + t), r && r.once && (delete r.once, t = "~" + t), r && r.passive && (delete r.passive, t = "&" + t);var a;r && r.native ? (delete r.native, a = e.nativeEvents || (e.nativeEvents = {})) : a = e.events || (e.events = {});var s = { value: n, modifiers: r },
	        c = a[t];Array.isArray(c) ? i ? c.unshift(s) : c.push(s) : a[t] = c ? i ? [s, c] : [c, s] : s;
	  }function vn(e, t, n) {
	    var r = hn(e, ":" + t) || hn(e, "v-bind:" + t);if (null != r) return an(r);if (!1 !== n) {
	      var i = hn(e, t);if (null != i) return JSON.stringify(i);
	    }
	  }function hn(e, t, n) {
	    var r;if (null != (r = e.attrsMap[t])) for (var i = e.attrsList, o = 0, a = i.length; o < a; o++) {
	      if (i[o].name === t) {
	        i.splice(o, 1);break;
	      }
	    }return n && delete e.attrsMap[t], r;
	  }function mn(e, t, n) {
	    var r = n || {},
	        i = r.number,
	        o = "$$v";r.trim && (o = "(typeof $$v === 'string'? $$v.trim(): $$v)"), i && (o = "_n(" + o + ")");var a = yn(t, o);e.model = { value: "(" + t + ")", expression: '"' + t + '"', callback: "function ($$v) {" + a + "}" };
	  }function yn(e, t) {
	    var n = gn(e);return null === n.key ? e + "=" + t : "$set(" + n.exp + ", " + n.key + ", " + t + ")";
	  }function gn(e) {
	    if (Zo = e.length, e.indexOf("[") < 0 || e.lastIndexOf("]") < Zo - 1) return (Xo = e.lastIndexOf(".")) > -1 ? { exp: e.slice(0, Xo), key: '"' + e.slice(Xo + 1) + '"' } : { exp: e, key: null };for (Yo = e, Xo = ea = ta = 0; !bn();) {
	      $n(Qo = _n()) ? wn(Qo) : 91 === Qo && Cn(Qo);
	    }return { exp: e.slice(0, ea), key: e.slice(ea + 1, ta) };
	  }function _n() {
	    return Yo.charCodeAt(++Xo);
	  }function bn() {
	    return Xo >= Zo;
	  }function $n(e) {
	    return 34 === e || 39 === e;
	  }function Cn(e) {
	    var t = 1;for (ea = Xo; !bn();) {
	      if (e = _n(), $n(e)) wn(e);else if (91 === e && t++, 93 === e && t--, 0 === t) {
	        ta = Xo;break;
	      }
	    }
	  }function wn(e) {
	    for (var t = e; !bn() && (e = _n()) !== t;) {}
	  }function xn(e, t, n) {
	    var r = n && n.number,
	        i = vn(e, "value") || "null",
	        o = vn(e, "true-value") || "true",
	        a = vn(e, "false-value") || "false";ln(e, "checked", "Array.isArray(" + t + ")?_i(" + t + "," + i + ")>-1" + ("true" === o ? ":(" + t + ")" : ":_q(" + t + "," + o + ")")), pn(e, "change", "var $$a=" + t + ",$$el=$event.target,$$c=$$el.checked?(" + o + "):(" + a + ");if(Array.isArray($$a)){var $$v=" + (r ? "_n(" + i + ")" : i) + ",$$i=_i($$a,$$v);if($$el.checked){$$i<0&&(" + t + "=$$a.concat([$$v]))}else{$$i>-1&&(" + t + "=$$a.slice(0,$$i).concat($$a.slice($$i+1)))}}else{" + yn(t, "$$c") + "}", null, !0);
	  }function kn(e, t, n) {
	    var r = n && n.number,
	        i = vn(e, "value") || "null";ln(e, "checked", "_q(" + t + "," + (i = r ? "_n(" + i + ")" : i) + ")"), pn(e, "change", yn(t, i), null, !0);
	  }function An(e, t, n) {
	    var r = "var $$selectedVal = " + ('Array.prototype.filter.call($event.target.options,function(o){return o.selected}).map(function(o){var val = "_value" in o ? o._value : o.value;return ' + (n && n.number ? "_n(val)" : "val") + "})") + ";";pn(e, "change", r = r + " " + yn(t, "$event.target.multiple ? $$selectedVal : $$selectedVal[0]"), null, !0);
	  }function On(e, t, n) {
	    var r = e.attrsMap.type,
	        i = n || {},
	        o = i.lazy,
	        a = i.number,
	        s = i.trim,
	        c = !o && "range" !== r,
	        u = o ? "change" : "range" === r ? Ta : "input",
	        l = "$event.target.value";s && (l = "$event.target.value.trim()"), a && (l = "_n(" + l + ")");var f = yn(t, l);c && (f = "if($event.target.composing)return;" + f), ln(e, "value", "(" + t + ")"), pn(e, u, f, null, !0), (s || a) && pn(e, "blur", "$forceUpdate()");
	  }function Sn(e) {
	    if (t(e[Ta])) {
	      var n = qi ? "change" : "input";e[n] = [].concat(e[Ta], e[n] || []), delete e[Ta];
	    }t(e[Ea]) && (e.change = [].concat(e[Ea], e.change || []), delete e[Ea]);
	  }function Tn(e, t, n) {
	    var r = na;return function i() {
	      null !== e.apply(null, arguments) && jn(t, i, n, r);
	    };
	  }function En(e, t, n, r, i) {
	    t = ne(t), n && (t = Tn(t, e, r)), na.addEventListener(e, t, Xi ? { capture: r, passive: i } : r);
	  }function jn(e, t, n, r) {
	    (r || na).removeEventListener(e, t._withTask || t, n);
	  }function Nn(t, n) {
	    if (!e(t.data.on) || !e(n.data.on)) {
	      var r = n.data.on || {},
	          i = t.data.on || {};na = n.elm, Sn(r), oe(r, i, En, jn, n.context), na = void 0;
	    }
	  }function Ln(n, r) {
	    if (!e(n.data.domProps) || !e(r.data.domProps)) {
	      var i,
	          o,
	          a = r.elm,
	          s = n.data.domProps || {},
	          c = r.data.domProps || {};t(c.__ob__) && (c = r.data.domProps = y({}, c));for (i in s) {
	        e(c[i]) && (a[i] = "");
	      }for (i in c) {
	        if (o = c[i], "textContent" === i || "innerHTML" === i) {
	          if (r.children && (r.children.length = 0), o === s[i]) continue;1 === a.childNodes.length && a.removeChild(a.childNodes[0]);
	        }if ("value" === i) {
	          a._value = o;var u = e(o) ? "" : String(o);In(a, u) && (a.value = u);
	        } else a[i] = o;
	      }
	    }
	  }function In(e, t) {
	    return !e.composing && ("OPTION" === e.tagName || Mn(e, t) || Dn(e, t));
	  }function Mn(e, t) {
	    var n = !0;try {
	      n = document.activeElement !== e;
	    } catch (e) {}return n && e.value !== t;
	  }function Dn(e, n) {
	    var r = e.value,
	        i = e._vModifiers;return t(i) && i.number ? l(r) !== l(n) : t(i) && i.trim ? r.trim() !== n.trim() : r !== n;
	  }function Pn(e) {
	    var t = Fn(e.style);return e.staticStyle ? y(e.staticStyle, t) : t;
	  }function Fn(e) {
	    return Array.isArray(e) ? g(e) : "string" == typeof e ? La(e) : e;
	  }function Rn(e, t) {
	    var n,
	        r = {};if (t) for (var i = e; i.componentInstance;) {
	      (i = i.componentInstance._vnode).data && (n = Pn(i.data)) && y(r, n);
	    }(n = Pn(e.data)) && y(r, n);for (var o = e; o = o.parent;) {
	      o.data && (n = Pn(o.data)) && y(r, n);
	    }return r;
	  }function Hn(n, r) {
	    var i = r.data,
	        o = n.data;if (!(e(i.staticStyle) && e(i.style) && e(o.staticStyle) && e(o.style))) {
	      var a,
	          s,
	          c = r.elm,
	          u = o.staticStyle,
	          l = o.normalizedStyle || o.style || {},
	          f = u || l,
	          d = Fn(r.data.style) || {};r.data.normalizedStyle = t(d.__ob__) ? y({}, d) : d;var p = Rn(r, !0);for (s in f) {
	        e(p[s]) && Da(c, s, "");
	      }for (s in p) {
	        (a = p[s]) !== f[s] && Da(c, s, null == a ? "" : a);
	      }
	    }
	  }function Bn(e, t) {
	    if (t && (t = t.trim())) if (e.classList) t.indexOf(" ") > -1 ? t.split(/\s+/).forEach(function (t) {
	      return e.classList.add(t);
	    }) : e.classList.add(t);else {
	      var n = " " + (e.getAttribute("class") || "") + " ";n.indexOf(" " + t + " ") < 0 && e.setAttribute("class", (n + t).trim());
	    }
	  }function Un(e, t) {
	    if (t && (t = t.trim())) if (e.classList) t.indexOf(" ") > -1 ? t.split(/\s+/).forEach(function (t) {
	      return e.classList.remove(t);
	    }) : e.classList.remove(t), e.classList.length || e.removeAttribute("class");else {
	      for (var n = " " + (e.getAttribute("class") || "") + " ", r = " " + t + " "; n.indexOf(r) >= 0;) {
	        n = n.replace(r, " ");
	      }(n = n.trim()) ? e.setAttribute("class", n) : e.removeAttribute("class");
	    }
	  }function Vn(e) {
	    if (e) {
	      if ("object" == (typeof e === "undefined" ? "undefined" : _typeof(e))) {
	        var t = {};return !1 !== e.css && y(t, Ha(e.name || "v")), y(t, e), t;
	      }return "string" == typeof e ? Ha(e) : void 0;
	    }
	  }function zn(e) {
	    Wa(function () {
	      Wa(e);
	    });
	  }function Kn(e, t) {
	    var n = e._transitionClasses || (e._transitionClasses = []);n.indexOf(t) < 0 && (n.push(t), Bn(e, t));
	  }function Jn(e, t) {
	    e._transitionClasses && d(e._transitionClasses, t), Un(e, t);
	  }function qn(e, t, n) {
	    var r = Wn(e, t),
	        i = r.type,
	        o = r.timeout,
	        a = r.propCount;if (!i) return n();var s = i === Ua ? Ka : qa,
	        c = 0,
	        u = function u() {
	      e.removeEventListener(s, l), n();
	    },
	        l = function l(t) {
	      t.target === e && ++c >= a && u();
	    };setTimeout(function () {
	      c < a && u();
	    }, o + 1), e.addEventListener(s, l);
	  }function Wn(e, t) {
	    var n,
	        r = window.getComputedStyle(e),
	        i = r[za + "Delay"].split(", "),
	        o = r[za + "Duration"].split(", "),
	        a = Gn(i, o),
	        s = r[Ja + "Delay"].split(", "),
	        c = r[Ja + "Duration"].split(", "),
	        u = Gn(s, c),
	        l = 0,
	        f = 0;return t === Ua ? a > 0 && (n = Ua, l = a, f = o.length) : t === Va ? u > 0 && (n = Va, l = u, f = c.length) : f = (n = (l = Math.max(a, u)) > 0 ? a > u ? Ua : Va : null) ? n === Ua ? o.length : c.length : 0, { type: n, timeout: l, propCount: f, hasTransform: n === Ua && Ga.test(r[za + "Property"]) };
	  }function Gn(e, t) {
	    for (; e.length < t.length;) {
	      e = e.concat(e);
	    }return Math.max.apply(null, t.map(function (t, n) {
	      return Zn(t) + Zn(e[n]);
	    }));
	  }function Zn(e) {
	    return 1e3 * Number(e.slice(0, -1));
	  }function Yn(n, r) {
	    var i = n.elm;t(i._leaveCb) && (i._leaveCb.cancelled = !0, i._leaveCb());var a = Vn(n.data.transition);if (!e(a) && !t(i._enterCb) && 1 === i.nodeType) {
	      for (var s = a.css, c = a.type, u = a.enterClass, f = a.enterToClass, d = a.enterActiveClass, p = a.appearClass, v = a.appearToClass, h = a.appearActiveClass, m = a.beforeEnter, y = a.enter, g = a.afterEnter, _ = a.enterCancelled, b = a.beforeAppear, $ = a.appear, w = a.afterAppear, x = a.appearCancelled, k = a.duration, A = jo, O = jo.$vnode; O && O.parent;) {
	        A = (O = O.parent).context;
	      }var S = !A._isMounted || !n.isRootInsert;if (!S || $ || "" === $) {
	        var T = S && p ? p : u,
	            E = S && h ? h : d,
	            j = S && v ? v : f,
	            N = S ? b || m : m,
	            L = S && "function" == typeof $ ? $ : y,
	            I = S ? w || g : g,
	            M = S ? x || _ : _,
	            D = l(o(k) ? k.enter : k),
	            P = !1 !== s && !Wi,
	            F = er(L),
	            R = i._enterCb = C(function () {
	          P && (Jn(i, j), Jn(i, E)), R.cancelled ? (P && Jn(i, T), M && M(i)) : I && I(i), i._enterCb = null;
	        });n.data.show || ae(n, "insert", function () {
	          var e = i.parentNode,
	              t = e && e._pending && e._pending[n.key];t && t.tag === n.tag && t.elm._leaveCb && t.elm._leaveCb(), L && L(i, R);
	        }), N && N(i), P && (Kn(i, T), Kn(i, E), zn(function () {
	          Kn(i, j), Jn(i, T), R.cancelled || F || (Xn(D) ? setTimeout(R, D) : qn(i, c, R));
	        })), n.data.show && (r && r(), L && L(i, R)), P || F || R();
	      }
	    }
	  }function Qn(n, r) {
	    function i() {
	      x.cancelled || (n.data.show || ((a.parentNode._pending || (a.parentNode._pending = {}))[n.key] = n), v && v(a), b && (Kn(a, f), Kn(a, p), zn(function () {
	        Kn(a, d), Jn(a, f), x.cancelled || $ || (Xn(w) ? setTimeout(x, w) : qn(a, u, x));
	      })), h && h(a, x), b || $ || x());
	    }var a = n.elm;t(a._enterCb) && (a._enterCb.cancelled = !0, a._enterCb());var s = Vn(n.data.transition);if (e(s)) return r();if (!t(a._leaveCb) && 1 === a.nodeType) {
	      var c = s.css,
	          u = s.type,
	          f = s.leaveClass,
	          d = s.leaveToClass,
	          p = s.leaveActiveClass,
	          v = s.beforeLeave,
	          h = s.leave,
	          m = s.afterLeave,
	          y = s.leaveCancelled,
	          g = s.delayLeave,
	          _ = s.duration,
	          b = !1 !== c && !Wi,
	          $ = er(h),
	          w = l(o(_) ? _.leave : _),
	          x = a._leaveCb = C(function () {
	        a.parentNode && a.parentNode._pending && (a.parentNode._pending[n.key] = null), b && (Jn(a, d), Jn(a, p)), x.cancelled ? (b && Jn(a, f), y && y(a)) : (r(), m && m(a)), a._leaveCb = null;
	      });g ? g(i) : i();
	    }
	  }function Xn(e) {
	    return "number" == typeof e && !isNaN(e);
	  }function er(n) {
	    if (e(n)) return !1;var r = n.fns;return t(r) ? er(Array.isArray(r) ? r[0] : r) : (n._length || n.length) > 1;
	  }function tr(e, t) {
	    !0 !== t.data.show && Yn(t);
	  }function nr(e, t, n) {
	    rr(e, t, n), (qi || Gi) && setTimeout(function () {
	      rr(e, t, n);
	    }, 0);
	  }function rr(e, t, n) {
	    var r = t.value,
	        i = e.multiple;if (!i || Array.isArray(r)) {
	      for (var o, a, s = 0, c = e.options.length; s < c; s++) {
	        if (a = e.options[s], i) o = $(r, or(a)) > -1, a.selected !== o && (a.selected = o);else if (b(or(a), r)) return void (e.selectedIndex !== s && (e.selectedIndex = s));
	      }i || (e.selectedIndex = -1);
	    }
	  }function ir(e, t) {
	    return t.every(function (t) {
	      return !b(t, e);
	    });
	  }function or(e) {
	    return "_value" in e ? e._value : e.value;
	  }function ar(e) {
	    e.target.composing = !0;
	  }function sr(e) {
	    e.target.composing && (e.target.composing = !1, cr(e.target, "input"));
	  }function cr(e, t) {
	    var n = document.createEvent("HTMLEvents");n.initEvent(t, !0, !0), e.dispatchEvent(n);
	  }function ur(e) {
	    return !e.componentInstance || e.data && e.data.transition ? e : ur(e.componentInstance._vnode);
	  }function lr(e) {
	    var t = e && e.componentOptions;return t && t.Ctor.options.abstract ? lr(ye(t.children)) : e;
	  }function fr(e) {
	    var t = {},
	        n = e.$options;for (var r in n.propsData) {
	      t[r] = e[r];
	    }var i = n._parentListeners;for (var o in i) {
	      t[Ni(o)] = i[o];
	    }return t;
	  }function dr(e, t) {
	    if (/\d-keep-alive$/.test(t.tag)) return e("keep-alive", { props: t.componentOptions.propsData });
	  }function pr(e) {
	    for (; e = e.parent;) {
	      if (e.data.transition) return !0;
	    }
	  }function vr(e, t) {
	    return t.key === e.key && t.tag === e.tag;
	  }function hr(e) {
	    e.elm._moveCb && e.elm._moveCb(), e.elm._enterCb && e.elm._enterCb();
	  }function mr(e) {
	    e.data.newPos = e.elm.getBoundingClientRect();
	  }function yr(e) {
	    var t = e.data.pos,
	        n = e.data.newPos,
	        r = t.left - n.left,
	        i = t.top - n.top;if (r || i) {
	      e.data.moved = !0;var o = e.elm.style;o.transform = o.WebkitTransform = "translate(" + r + "px," + i + "px)", o.transitionDuration = "0s";
	    }
	  }function gr(e, t) {
	    var n = t ? as(t) : is;if (n.test(e)) {
	      for (var r, i, o = [], a = n.lastIndex = 0; r = n.exec(e);) {
	        (i = r.index) > a && o.push(JSON.stringify(e.slice(a, i)));var s = an(r[1].trim());o.push("_s(" + s + ")"), a = i + r[0].length;
	      }return a < e.length && o.push(JSON.stringify(e.slice(a))), o.join("+");
	    }
	  }function _r(e, t) {
	    var n = t ? Fs : Ps;return e.replace(n, function (e) {
	      return Ds[e];
	    });
	  }function br(e, t) {
	    function n(t) {
	      l += t, e = e.substring(t);
	    }function r(e, n, r) {
	      var i, s;if (null == n && (n = l), null == r && (r = l), e && (s = e.toLowerCase()), e) for (i = a.length - 1; i >= 0 && a[i].lowerCasedTag !== s; i--) {} else i = 0;if (i >= 0) {
	        for (var c = a.length - 1; c >= i; c--) {
	          t.end && t.end(a[c].tag, n, r);
	        }a.length = i, o = i && a[i - 1].tag;
	      } else "br" === s ? t.start && t.start(e, [], !0, n, r) : "p" === s && (t.start && t.start(e, [], !1, n, r), t.end && t.end(e, n, r));
	    }for (var i, o, a = [], s = t.expectHTML, c = t.isUnaryTag || Di, u = t.canBeLeftOpenTag || Di, l = 0; e;) {
	      if (i = e, o && Is(o)) {
	        var f = 0,
	            d = o.toLowerCase(),
	            p = Ms[d] || (Ms[d] = new RegExp("([\\s\\S]*?)(</" + d + "[^>]*>)", "i")),
	            v = e.replace(p, function (e, n, r) {
	          return f = r.length, Is(d) || "noscript" === d || (n = n.replace(/<!--([\s\S]*?)-->/g, "$1").replace(/<!\[CDATA\[([\s\S]*?)]]>/g, "$1")), Hs(d, n) && (n = n.slice(1)), t.chars && t.chars(n), "";
	        });l += e.length - v.length, e = v, r(d, l - f, l);
	      } else {
	        var h = e.indexOf("<");if (0 === h) {
	          if (bs.test(e)) {
	            var m = e.indexOf("--\x3e");if (m >= 0) {
	              t.shouldKeepComment && t.comment(e.substring(4, m)), n(m + 3);continue;
	            }
	          }if ($s.test(e)) {
	            var y = e.indexOf("]>");if (y >= 0) {
	              n(y + 2);continue;
	            }
	          }var g = e.match(_s);if (g) {
	            n(g[0].length);continue;
	          }var _ = e.match(gs);if (_) {
	            var b = l;n(_[0].length), r(_[1], b, l);continue;
	          }var $ = function () {
	            var t = e.match(ms);if (t) {
	              var r = { tagName: t[1], attrs: [], start: l };n(t[0].length);for (var i, o; !(i = e.match(ys)) && (o = e.match(ps));) {
	                n(o[0].length), r.attrs.push(o);
	              }if (i) return r.unarySlash = i[1], n(i[0].length), r.end = l, r;
	            }
	          }();if ($) {
	            !function (e) {
	              var n = e.tagName,
	                  i = e.unarySlash;s && ("p" === o && ds(n) && r(o), u(n) && o === n && r(n));for (var l = c(n) || !!i, f = e.attrs.length, d = new Array(f), p = 0; p < f; p++) {
	                var v = e.attrs[p];Cs && -1 === v[0].indexOf('""') && ("" === v[3] && delete v[3], "" === v[4] && delete v[4], "" === v[5] && delete v[5]);var h = v[3] || v[4] || v[5] || "",
	                    m = "a" === n && "href" === v[1] ? t.shouldDecodeNewlinesForHref : t.shouldDecodeNewlines;d[p] = { name: v[1], value: _r(h, m) };
	              }l || (a.push({ tag: n, lowerCasedTag: n.toLowerCase(), attrs: d }), o = n), t.start && t.start(n, d, l, e.start, e.end);
	            }($), Hs(o, e) && n(1);continue;
	          }
	        }var C = void 0,
	            w = void 0,
	            x = void 0;if (h >= 0) {
	          for (w = e.slice(h); !(gs.test(w) || ms.test(w) || bs.test(w) || $s.test(w) || (x = w.indexOf("<", 1)) < 0);) {
	            h += x, w = e.slice(h);
	          }C = e.substring(0, h), n(h);
	        }h < 0 && (C = e, e = ""), t.chars && C && t.chars(C);
	      }if (e === i) {
	        t.chars && t.chars(e);break;
	      }
	    }r();
	  }function $r(e, t, n) {
	    return { type: 1, tag: e, attrsList: t, attrsMap: Rr(t), parent: n, children: [] };
	  }function Cr(e, t) {
	    function n(e) {
	      e.pre && (s = !1), Ss(e.tag) && (c = !1);
	    }ws = t.warn || cn, Ss = t.isPreTag || Di, Ts = t.mustUseProp || Di, Es = t.getTagNamespace || Di, ks = un(t.modules, "transformNode"), As = un(t.modules, "preTransformNode"), Os = un(t.modules, "postTransformNode"), xs = t.delimiters;var r,
	        i,
	        o = [],
	        a = !1 !== t.preserveWhitespace,
	        s = !1,
	        c = !1;return br(e, { warn: ws, expectHTML: t.expectHTML, isUnaryTag: t.isUnaryTag, canBeLeftOpenTag: t.canBeLeftOpenTag, shouldDecodeNewlines: t.shouldDecodeNewlines, shouldDecodeNewlinesForHref: t.shouldDecodeNewlinesForHref, shouldKeepComment: t.comments, start: function start(e, a, u) {
	        var l = i && i.ns || Es(e);qi && "svg" === l && (a = Ur(a));var f = $r(e, a, i);l && (f.ns = l), Br(f) && !ro() && (f.forbidden = !0);for (var d = 0; d < As.length; d++) {
	          f = As[d](f, t) || f;
	        }if (s || (wr(f), f.pre && (s = !0)), Ss(f.tag) && (c = !0), s ? xr(f) : f.processed || (Sr(f), Tr(f), Lr(f), kr(f, t)), r ? o.length || r.if && (f.elseif || f.else) && Nr(r, { exp: f.elseif, block: f }) : r = f, i && !f.forbidden) if (f.elseif || f.else) Er(f, i);else if (f.slotScope) {
	          i.plain = !1;var p = f.slotTarget || '"default"';(i.scopedSlots || (i.scopedSlots = {}))[p] = f;
	        } else i.children.push(f), f.parent = i;u ? n(f) : (i = f, o.push(f));for (var v = 0; v < Os.length; v++) {
	          Os[v](f, t);
	        }
	      }, end: function end() {
	        var e = o[o.length - 1],
	            t = e.children[e.children.length - 1];t && 3 === t.type && " " === t.text && !c && e.children.pop(), o.length -= 1, i = o[o.length - 1], n(e);
	      }, chars: function chars(e) {
	        if (i && (!qi || "textarea" !== i.tag || i.attrsMap.placeholder !== e)) {
	          var t = i.children;if (e = c || e.trim() ? Hr(i) ? e : Ws(e) : a && t.length ? " " : "") {
	            var n;!s && " " !== e && (n = gr(e, xs)) ? t.push({ type: 2, expression: n, text: e }) : " " === e && t.length && " " === t[t.length - 1].text || t.push({ type: 3, text: e });
	          }
	        }
	      }, comment: function comment(e) {
	        i.children.push({ type: 3, text: e, isComment: !0 });
	      } }), r;
	  }function wr(e) {
	    null != hn(e, "v-pre") && (e.pre = !0);
	  }function xr(e) {
	    var t = e.attrsList.length;if (t) for (var n = e.attrs = new Array(t), r = 0; r < t; r++) {
	      n[r] = { name: e.attrsList[r].name, value: JSON.stringify(e.attrsList[r].value) };
	    } else e.pre || (e.plain = !0);
	  }function kr(e, t) {
	    Ar(e), e.plain = !e.key && !e.attrsList.length, Or(e), Ir(e), Mr(e);for (var n = 0; n < ks.length; n++) {
	      e = ks[n](e, t) || e;
	    }Dr(e);
	  }function Ar(e) {
	    var t = vn(e, "key");t && (e.key = t);
	  }function Or(e) {
	    var t = vn(e, "ref");t && (e.ref = t, e.refInFor = Pr(e));
	  }function Sr(e) {
	    var t;if (t = hn(e, "v-for")) {
	      var n = t.match(Vs);if (!n) return;e.for = n[2].trim();var r = n[1].trim(),
	          i = r.match(zs);i ? (e.alias = i[1].trim(), e.iterator1 = i[2].trim(), i[3] && (e.iterator2 = i[3].trim())) : e.alias = r;
	    }
	  }function Tr(e) {
	    var t = hn(e, "v-if");if (t) e.if = t, Nr(e, { exp: t, block: e });else {
	      null != hn(e, "v-else") && (e.else = !0);var n = hn(e, "v-else-if");n && (e.elseif = n);
	    }
	  }function Er(e, t) {
	    var n = jr(t.children);n && n.if && Nr(n, { exp: e.elseif, block: e });
	  }function jr(e) {
	    for (var t = e.length; t--;) {
	      if (1 === e[t].type) return e[t];e.pop();
	    }
	  }function Nr(e, t) {
	    e.ifConditions || (e.ifConditions = []), e.ifConditions.push(t);
	  }function Lr(e) {
	    null != hn(e, "v-once") && (e.once = !0);
	  }function Ir(e) {
	    if ("slot" === e.tag) e.slotName = vn(e, "name");else {
	      var t;"template" === e.tag ? (t = hn(e, "scope"), e.slotScope = t || hn(e, "slot-scope")) : (t = hn(e, "slot-scope")) && (e.slotScope = t);var n = vn(e, "slot");n && (e.slotTarget = '""' === n ? '"default"' : n, "template" === e.tag || e.slotScope || fn(e, "slot", n));
	    }
	  }function Mr(e) {
	    var t;(t = vn(e, "is")) && (e.component = t), null != hn(e, "inline-template") && (e.inlineTemplate = !0);
	  }function Dr(e) {
	    var t,
	        n,
	        r,
	        i,
	        o,
	        a,
	        s,
	        c = e.attrsList;for (t = 0, n = c.length; t < n; t++) {
	      if (r = i = c[t].name, o = c[t].value, Us.test(r)) {
	        if (e.hasBindings = !0, (a = Fr(r)) && (r = r.replace(qs, "")), Js.test(r)) r = r.replace(Js, ""), o = an(o), s = !1, a && (a.prop && (s = !0, "innerHtml" === (r = Ni(r)) && (r = "innerHTML")), a.camel && (r = Ni(r)), a.sync && pn(e, "update:" + Ni(r), yn(o, "$event"))), s || !e.component && Ts(e.tag, e.attrsMap.type, r) ? ln(e, r, o) : fn(e, r, o);else if (Bs.test(r)) pn(e, r = r.replace(Bs, ""), o, a, !1, ws);else {
	          var u = (r = r.replace(Us, "")).match(Ks),
	              l = u && u[1];l && (r = r.slice(0, -(l.length + 1))), dn(e, r, i, o, l, a);
	        }
	      } else fn(e, r, JSON.stringify(o)), !e.component && "muted" === r && Ts(e.tag, e.attrsMap.type, r) && ln(e, r, "true");
	    }
	  }function Pr(e) {
	    for (var t = e; t;) {
	      if (void 0 !== t.for) return !0;t = t.parent;
	    }return !1;
	  }function Fr(e) {
	    var t = e.match(qs);if (t) {
	      var n = {};return t.forEach(function (e) {
	        n[e.slice(1)] = !0;
	      }), n;
	    }
	  }function Rr(e) {
	    for (var t = {}, n = 0, r = e.length; n < r; n++) {
	      t[e[n].name] = e[n].value;
	    }return t;
	  }function Hr(e) {
	    return "script" === e.tag || "style" === e.tag;
	  }function Br(e) {
	    return "style" === e.tag || "script" === e.tag && (!e.attrsMap.type || "text/javascript" === e.attrsMap.type);
	  }function Ur(e) {
	    for (var t = [], n = 0; n < e.length; n++) {
	      var r = e[n];Gs.test(r.name) || (r.name = r.name.replace(Zs, ""), t.push(r));
	    }return t;
	  }function Vr(e) {
	    return $r(e.tag, e.attrsList.slice(), e.parent);
	  }function zr(e, t, n) {
	    e.attrsMap[t] = n, e.attrsList.push({ name: t, value: n });
	  }function Kr(e, t) {
	    e && (js = Xs(t.staticKeys || ""), Ns = t.isReservedTag || Di, Jr(e), qr(e, !1));
	  }function Jr(e) {
	    if (e.static = Wr(e), 1 === e.type) {
	      if (!Ns(e.tag) && "slot" !== e.tag && null == e.attrsMap["inline-template"]) return;for (var t = 0, n = e.children.length; t < n; t++) {
	        var r = e.children[t];Jr(r), r.static || (e.static = !1);
	      }if (e.ifConditions) for (var i = 1, o = e.ifConditions.length; i < o; i++) {
	        var a = e.ifConditions[i].block;Jr(a), a.static || (e.static = !1);
	      }
	    }
	  }function qr(e, t) {
	    if (1 === e.type) {
	      if ((e.static || e.once) && (e.staticInFor = t), e.static && e.children.length && (1 !== e.children.length || 3 !== e.children[0].type)) return void (e.staticRoot = !0);if (e.staticRoot = !1, e.children) for (var n = 0, r = e.children.length; n < r; n++) {
	        qr(e.children[n], t || !!e.for);
	      }if (e.ifConditions) for (var i = 1, o = e.ifConditions.length; i < o; i++) {
	        qr(e.ifConditions[i].block, t);
	      }
	    }
	  }function Wr(e) {
	    return 2 !== e.type && (3 === e.type || !(!e.pre && (e.hasBindings || e.if || e.for || Si(e.tag) || !Ns(e.tag) || Gr(e) || !Object.keys(e).every(js))));
	  }function Gr(e) {
	    for (; e.parent;) {
	      if ("template" !== (e = e.parent).tag) return !1;if (e.for) return !0;
	    }return !1;
	  }function Zr(e, t, n) {
	    var r = t ? "nativeOn:{" : "on:{";for (var i in e) {
	      var o = e[i];r += '"' + i + '":' + Yr(i, o) + ",";
	    }return r.slice(0, -1) + "}";
	  }function Yr(e, t) {
	    if (!t) return "function(){}";if (Array.isArray(t)) return "[" + t.map(function (t) {
	      return Yr(e, t);
	    }).join(",") + "]";var n = tc.test(t.value),
	        r = ec.test(t.value);if (t.modifiers) {
	      var i = "",
	          o = "",
	          a = [];for (var s in t.modifiers) {
	        if (ic[s]) o += ic[s], nc[s] && a.push(s);else if ("exact" === s) {
	          var c = t.modifiers;o += rc(["ctrl", "shift", "alt", "meta"].filter(function (e) {
	            return !c[e];
	          }).map(function (e) {
	            return "$event." + e + "Key";
	          }).join("||"));
	        } else a.push(s);
	      }return a.length && (i += Qr(a)), o && (i += o), "function($event){" + i + (n ? t.value + "($event)" : r ? "(" + t.value + ")($event)" : t.value) + "}";
	    }return n || r ? t.value : "function($event){" + t.value + "}";
	  }function Qr(e) {
	    return "if(!('button' in $event)&&" + e.map(Xr).join("&&") + ")return null;";
	  }function Xr(e) {
	    var t = parseInt(e, 10);if (t) return "$event.keyCode!==" + t;var n = nc[e];return "_k($event.keyCode," + JSON.stringify(e) + "," + JSON.stringify(n) + ",$event.key)";
	  }function ei(e, t) {
	    var n = new ac(t);return { render: "with(this){return " + (e ? ti(e, n) : '_c("div")') + "}", staticRenderFns: n.staticRenderFns };
	  }function ti(e, t) {
	    if (e.staticRoot && !e.staticProcessed) return ni(e, t);if (e.once && !e.onceProcessed) return ri(e, t);if (e.for && !e.forProcessed) return ai(e, t);if (e.if && !e.ifProcessed) return ii(e, t);if ("template" !== e.tag || e.slotTarget) {
	      if ("slot" === e.tag) return _i(e, t);var n;if (e.component) n = bi(e.component, e, t);else {
	        var r = e.plain ? void 0 : si(e, t),
	            i = e.inlineTemplate ? null : pi(e, t, !0);n = "_c('" + e.tag + "'" + (r ? "," + r : "") + (i ? "," + i : "") + ")";
	      }for (var o = 0; o < t.transforms.length; o++) {
	        n = t.transforms[o](e, n);
	      }return n;
	    }return pi(e, t) || "void 0";
	  }function ni(e, t) {
	    return e.staticProcessed = !0, t.staticRenderFns.push("with(this){return " + ti(e, t) + "}"), "_m(" + (t.staticRenderFns.length - 1) + (e.staticInFor ? ",true" : "") + ")";
	  }function ri(e, t) {
	    if (e.onceProcessed = !0, e.if && !e.ifProcessed) return ii(e, t);if (e.staticInFor) {
	      for (var n = "", r = e.parent; r;) {
	        if (r.for) {
	          n = r.key;break;
	        }r = r.parent;
	      }return n ? "_o(" + ti(e, t) + "," + t.onceId++ + "," + n + ")" : ti(e, t);
	    }return ni(e, t);
	  }function ii(e, t, n, r) {
	    return e.ifProcessed = !0, oi(e.ifConditions.slice(), t, n, r);
	  }function oi(e, t, n, r) {
	    function i(e) {
	      return n ? n(e, t) : e.once ? ri(e, t) : ti(e, t);
	    }if (!e.length) return r || "_e()";var o = e.shift();return o.exp ? "(" + o.exp + ")?" + i(o.block) + ":" + oi(e, t, n, r) : "" + i(o.block);
	  }function ai(e, t, n, r) {
	    var i = e.for,
	        o = e.alias,
	        a = e.iterator1 ? "," + e.iterator1 : "",
	        s = e.iterator2 ? "," + e.iterator2 : "";return e.forProcessed = !0, (r || "_l") + "((" + i + "),function(" + o + a + s + "){return " + (n || ti)(e, t) + "})";
	  }function si(e, t) {
	    var n = "{",
	        r = ci(e, t);r && (n += r + ","), e.key && (n += "key:" + e.key + ","), e.ref && (n += "ref:" + e.ref + ","), e.refInFor && (n += "refInFor:true,"), e.pre && (n += "pre:true,"), e.component && (n += 'tag:"' + e.tag + '",');for (var i = 0; i < t.dataGenFns.length; i++) {
	      n += t.dataGenFns[i](e);
	    }if (e.attrs && (n += "attrs:{" + $i(e.attrs) + "},"), e.props && (n += "domProps:{" + $i(e.props) + "},"), e.events && (n += Zr(e.events, !1, t.warn) + ","), e.nativeEvents && (n += Zr(e.nativeEvents, !0, t.warn) + ","), e.slotTarget && !e.slotScope && (n += "slot:" + e.slotTarget + ","), e.scopedSlots && (n += li(e.scopedSlots, t) + ","), e.model && (n += "model:{value:" + e.model.value + ",callback:" + e.model.callback + ",expression:" + e.model.expression + "},"), e.inlineTemplate) {
	      var o = ui(e, t);o && (n += o + ",");
	    }return n = n.replace(/,$/, "") + "}", e.wrapData && (n = e.wrapData(n)), e.wrapListeners && (n = e.wrapListeners(n)), n;
	  }function ci(e, t) {
	    var n = e.directives;if (n) {
	      var r,
	          i,
	          o,
	          a,
	          s = "directives:[",
	          c = !1;for (r = 0, i = n.length; r < i; r++) {
	        o = n[r], a = !0;var u = t.directives[o.name];u && (a = !!u(e, o, t.warn)), a && (c = !0, s += '{name:"' + o.name + '",rawName:"' + o.rawName + '"' + (o.value ? ",value:(" + o.value + "),expression:" + JSON.stringify(o.value) : "") + (o.arg ? ',arg:"' + o.arg + '"' : "") + (o.modifiers ? ",modifiers:" + JSON.stringify(o.modifiers) : "") + "},");
	      }return c ? s.slice(0, -1) + "]" : void 0;
	    }
	  }function ui(e, t) {
	    var n = e.children[0];if (1 === n.type) {
	      var r = ei(n, t.options);return "inlineTemplate:{render:function(){" + r.render + "},staticRenderFns:[" + r.staticRenderFns.map(function (e) {
	        return "function(){" + e + "}";
	      }).join(",") + "]}";
	    }
	  }function li(e, t) {
	    return "scopedSlots:_u([" + Object.keys(e).map(function (n) {
	      return fi(n, e[n], t);
	    }).join(",") + "])";
	  }function fi(e, t, n) {
	    return t.for && !t.forProcessed ? di(e, t, n) : "{key:" + e + ",fn:" + ("function(" + String(t.slotScope) + "){return " + ("template" === t.tag ? t.if ? t.if + "?" + (pi(t, n) || "undefined") + ":undefined" : pi(t, n) || "undefined" : ti(t, n)) + "}") + "}";
	  }function di(e, t, n) {
	    var r = t.for,
	        i = t.alias,
	        o = t.iterator1 ? "," + t.iterator1 : "",
	        a = t.iterator2 ? "," + t.iterator2 : "";return t.forProcessed = !0, "_l((" + r + "),function(" + i + o + a + "){return " + fi(e, t, n) + "})";
	  }function pi(e, t, n, r, i) {
	    var o = e.children;if (o.length) {
	      var a = o[0];if (1 === o.length && a.for && "template" !== a.tag && "slot" !== a.tag) return (r || ti)(a, t);var s = n ? vi(o, t.maybeComponent) : 0,
	          c = i || mi;return "[" + o.map(function (e) {
	        return c(e, t);
	      }).join(",") + "]" + (s ? "," + s : "");
	    }
	  }function vi(e, t) {
	    for (var n = 0, r = 0; r < e.length; r++) {
	      var i = e[r];if (1 === i.type) {
	        if (hi(i) || i.ifConditions && i.ifConditions.some(function (e) {
	          return hi(e.block);
	        })) {
	          n = 2;break;
	        }(t(i) || i.ifConditions && i.ifConditions.some(function (e) {
	          return t(e.block);
	        })) && (n = 1);
	      }
	    }return n;
	  }function hi(e) {
	    return void 0 !== e.for || "template" === e.tag || "slot" === e.tag;
	  }function mi(e, t) {
	    return 1 === e.type ? ti(e, t) : 3 === e.type && e.isComment ? gi(e) : yi(e);
	  }function yi(e) {
	    return "_v(" + (2 === e.type ? e.expression : Ci(JSON.stringify(e.text))) + ")";
	  }function gi(e) {
	    return "_e(" + JSON.stringify(e.text) + ")";
	  }function _i(e, t) {
	    var n = e.slotName || '"default"',
	        r = pi(e, t),
	        i = "_t(" + n + (r ? "," + r : ""),
	        o = e.attrs && "{" + e.attrs.map(function (e) {
	      return Ni(e.name) + ":" + e.value;
	    }).join(",") + "}",
	        a = e.attrsMap["v-bind"];return !o && !a || r || (i += ",null"), o && (i += "," + o), a && (i += (o ? "" : ",null") + "," + a), i + ")";
	  }function bi(e, t, n) {
	    var r = t.inlineTemplate ? null : pi(t, n, !0);return "_c(" + e + "," + si(t, n) + (r ? "," + r : "") + ")";
	  }function $i(e) {
	    for (var t = "", n = 0; n < e.length; n++) {
	      var r = e[n];t += '"' + r.name + '":' + Ci(r.value) + ",";
	    }return t.slice(0, -1);
	  }function Ci(e) {
	    return e.replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
	  }function wi(e, t) {
	    try {
	      return new Function(e);
	    } catch (n) {
	      return t.push({ err: n, code: e }), _;
	    }
	  }function xi(e) {
	    var t = Object.create(null);return function (n, r, i) {
	      delete (r = y({}, r)).warn;var o = r.delimiters ? String(r.delimiters) + n : n;if (t[o]) return t[o];var a = e(n, r),
	          s = {},
	          c = [];return s.render = wi(a.render, c), s.staticRenderFns = a.staticRenderFns.map(function (e) {
	        return wi(e, c);
	      }), t[o] = s;
	    };
	  }function ki(e) {
	    return Ls = Ls || document.createElement("div"), Ls.innerHTML = e ? '<a href="\n"/>' : '<div a="\n"/>', Ls.innerHTML.indexOf("&#10;") > 0;
	  }function Ai(e) {
	    if (e.outerHTML) return e.outerHTML;var t = document.createElement("div");return t.appendChild(e.cloneNode(!0)), t.innerHTML;
	  }var Oi = Object.prototype.toString,
	      Si = f("slot,component", !0),
	      Ti = f("key,ref,slot,slot-scope,is"),
	      Ei = Object.prototype.hasOwnProperty,
	      ji = /-(\w)/g,
	      Ni = v(function (e) {
	    return e.replace(ji, function (e, t) {
	      return t ? t.toUpperCase() : "";
	    });
	  }),
	      Li = v(function (e) {
	    return e.charAt(0).toUpperCase() + e.slice(1);
	  }),
	      Ii = /\B([A-Z])/g,
	      Mi = v(function (e) {
	    return e.replace(Ii, "-$1").toLowerCase();
	  }),
	      Di = function Di(e, t, n) {
	    return !1;
	  },
	      Pi = function Pi(e) {
	    return e;
	  },
	      Fi = "data-server-rendered",
	      Ri = ["component", "directive", "filter"],
	      Hi = ["beforeCreate", "created", "beforeMount", "mounted", "beforeUpdate", "updated", "beforeDestroy", "destroyed", "activated", "deactivated", "errorCaptured"],
	      Bi = { optionMergeStrategies: Object.create(null), silent: !1, productionTip: !1, devtools: !1, performance: !1, errorHandler: null, warnHandler: null, ignoredElements: [], keyCodes: Object.create(null), isReservedTag: Di, isReservedAttr: Di, isUnknownElement: Di, getTagNamespace: _, parsePlatformTagName: Pi, mustUseProp: Di, _lifecycleHooks: Hi },
	      Ui = Object.freeze({}),
	      Vi = /[^\w.$]/,
	      zi = "__proto__" in {},
	      Ki = "undefined" != typeof window,
	      Ji = Ki && window.navigator.userAgent.toLowerCase(),
	      qi = Ji && /msie|trident/.test(Ji),
	      Wi = Ji && Ji.indexOf("msie 9.0") > 0,
	      Gi = Ji && Ji.indexOf("edge/") > 0,
	      Zi = Ji && Ji.indexOf("android") > 0,
	      Yi = Ji && /iphone|ipad|ipod|ios/.test(Ji),
	      Qi = (Ji && /chrome\/\d+/.test(Ji), {}.watch),
	      Xi = !1;if (Ki) try {
	    var eo = {};Object.defineProperty(eo, "passive", { get: function get() {
	        Xi = !0;
	      } }), window.addEventListener("test-passive", null, eo);
	  } catch (e) {}var to,
	      no,
	      ro = function ro() {
	    return void 0 === to && (to = !Ki && "undefined" != typeof global && "server" === global.process.env.VUE_ENV), to;
	  },
	      io = Ki && window.__VUE_DEVTOOLS_GLOBAL_HOOK__,
	      oo = "undefined" != typeof Symbol && A(Symbol) && "undefined" != typeof Reflect && A(Reflect.ownKeys);no = "undefined" != typeof Set && A(Set) ? Set : function () {
	    function e() {
	      this.set = Object.create(null);
	    }return e.prototype.has = function (e) {
	      return !0 === this.set[e];
	    }, e.prototype.add = function (e) {
	      this.set[e] = !0;
	    }, e.prototype.clear = function () {
	      this.set = Object.create(null);
	    }, e;
	  }();var ao = _,
	      so = 0,
	      co = function co() {
	    this.id = so++, this.subs = [];
	  };co.prototype.addSub = function (e) {
	    this.subs.push(e);
	  }, co.prototype.removeSub = function (e) {
	    d(this.subs, e);
	  }, co.prototype.depend = function () {
	    co.target && co.target.addDep(this);
	  }, co.prototype.notify = function () {
	    for (var e = this.subs.slice(), t = 0, n = e.length; t < n; t++) {
	      e[t].update();
	    }
	  }, co.target = null;var uo = [],
	      lo = function lo(e, t, n, r, i, o, a, s) {
	    this.tag = e, this.data = t, this.children = n, this.text = r, this.elm = i, this.ns = void 0, this.context = o, this.functionalContext = void 0, this.functionalOptions = void 0, this.functionalScopeId = void 0, this.key = t && t.key, this.componentOptions = a, this.componentInstance = void 0, this.parent = void 0, this.raw = !1, this.isStatic = !1, this.isRootInsert = !0, this.isComment = !1, this.isCloned = !1, this.isOnce = !1, this.asyncFactory = s, this.asyncMeta = void 0, this.isAsyncPlaceholder = !1;
	  },
	      fo = { child: { configurable: !0 } };fo.child.get = function () {
	    return this.componentInstance;
	  }, Object.defineProperties(lo.prototype, fo);var po = function po(e) {
	    void 0 === e && (e = "");var t = new lo();return t.text = e, t.isComment = !0, t;
	  },
	      vo = Array.prototype,
	      ho = Object.create(vo);["push", "pop", "shift", "unshift", "splice", "sort", "reverse"].forEach(function (e) {
	    var t = vo[e];x(ho, e, function () {
	      for (var n = [], r = arguments.length; r--;) {
	        n[r] = arguments[r];
	      }var i,
	          o = t.apply(this, n),
	          a = this.__ob__;switch (e) {case "push":case "unshift":
	          i = n;break;case "splice":
	          i = n.slice(2);}return i && a.observeArray(i), a.dep.notify(), o;
	    });
	  });var mo = Object.getOwnPropertyNames(ho),
	      yo = { shouldConvert: !0 },
	      go = function go(e) {
	    this.value = e, this.dep = new co(), this.vmCount = 0, x(e, "__ob__", this), Array.isArray(e) ? ((zi ? N : L)(e, ho, mo), this.observeArray(e)) : this.walk(e);
	  };go.prototype.walk = function (e) {
	    for (var t = Object.keys(e), n = 0; n < t.length; n++) {
	      M(e, t[n], e[t[n]]);
	    }
	  }, go.prototype.observeArray = function (e) {
	    for (var t = 0, n = e.length; t < n; t++) {
	      I(e[t]);
	    }
	  };var _o = Bi.optionMergeStrategies;_o.data = function (e, t, n) {
	    return n ? H(e, t, n) : t && "function" != typeof t ? e : H(e, t);
	  }, Hi.forEach(function (e) {
	    _o[e] = B;
	  }), Ri.forEach(function (e) {
	    _o[e + "s"] = U;
	  }), _o.watch = function (e, t, n, r) {
	    if (e === Qi && (e = void 0), t === Qi && (t = void 0), !t) return Object.create(e || null);if (!e) return t;var i = {};y(i, e);for (var o in t) {
	      var a = i[o],
	          s = t[o];a && !Array.isArray(a) && (a = [a]), i[o] = a ? a.concat(s) : Array.isArray(s) ? s : [s];
	    }return i;
	  }, _o.props = _o.methods = _o.inject = _o.computed = function (e, t, n, r) {
	    if (!e) return t;var i = Object.create(null);return y(i, e), t && y(i, t), i;
	  }, _o.provide = H;var bo,
	      $o,
	      Co = function Co(e, t) {
	    return void 0 === t ? e : t;
	  },
	      wo = [],
	      xo = !1,
	      ko = !1;if ("undefined" != typeof setImmediate && A(setImmediate)) $o = function $o() {
	    setImmediate(te);
	  };else if ("undefined" == typeof MessageChannel || !A(MessageChannel) && "[object MessageChannelConstructor]" !== MessageChannel.toString()) $o = function $o() {
	    setTimeout(te, 0);
	  };else {
	    var Ao = new MessageChannel(),
	        Oo = Ao.port2;Ao.port1.onmessage = te, $o = function $o() {
	      Oo.postMessage(1);
	    };
	  }if ("undefined" != typeof Promise && A(Promise)) {
	    var So = Promise.resolve();bo = function bo() {
	      So.then(te), Yi && setTimeout(_);
	    };
	  } else bo = $o;var To,
	      Eo = v(function (e) {
	    var t = "&" === e.charAt(0),
	        n = "~" === (e = t ? e.slice(1) : e).charAt(0),
	        r = "!" === (e = n ? e.slice(1) : e).charAt(0);return e = r ? e.slice(1) : e, { name: e, once: n, capture: r, passive: t };
	  }),
	      jo = null,
	      No = [],
	      Lo = [],
	      Io = {},
	      Mo = !1,
	      Do = !1,
	      Po = 0,
	      Fo = 0,
	      Ro = function Ro(e, t, n, r) {
	    this.vm = e, e._watchers.push(this), r ? (this.deep = !!r.deep, this.user = !!r.user, this.lazy = !!r.lazy, this.sync = !!r.sync) : this.deep = this.user = this.lazy = this.sync = !1, this.cb = n, this.id = ++Fo, this.active = !0, this.dirty = this.lazy, this.deps = [], this.newDeps = [], this.depIds = new no(), this.newDepIds = new no(), this.expression = "", "function" == typeof t ? this.getter = t : (this.getter = k(t), this.getter || (this.getter = function () {})), this.value = this.lazy ? void 0 : this.get();
	  };Ro.prototype.get = function () {
	    O(this);var e,
	        t = this.vm;try {
	      e = this.getter.call(t, t);
	    } catch (e) {
	      if (!this.user) throw e;Q(e, t, 'getter for watcher "' + this.expression + '"');
	    } finally {
	      this.deep && Fe(e), S(), this.cleanupDeps();
	    }return e;
	  }, Ro.prototype.addDep = function (e) {
	    var t = e.id;this.newDepIds.has(t) || (this.newDepIds.add(t), this.newDeps.push(e), this.depIds.has(t) || e.addSub(this));
	  }, Ro.prototype.cleanupDeps = function () {
	    for (var e = this, t = this.deps.length; t--;) {
	      var n = e.deps[t];e.newDepIds.has(n.id) || n.removeSub(e);
	    }var r = this.depIds;this.depIds = this.newDepIds, this.newDepIds = r, this.newDepIds.clear(), r = this.deps, this.deps = this.newDeps, this.newDeps = r, this.newDeps.length = 0;
	  }, Ro.prototype.update = function () {
	    this.lazy ? this.dirty = !0 : this.sync ? this.run() : Pe(this);
	  }, Ro.prototype.run = function () {
	    if (this.active) {
	      var e = this.get();if (e !== this.value || o(e) || this.deep) {
	        var t = this.value;if (this.value = e, this.user) try {
	          this.cb.call(this.vm, e, t);
	        } catch (e) {
	          Q(e, this.vm, 'callback for watcher "' + this.expression + '"');
	        } else this.cb.call(this.vm, e, t);
	      }
	    }
	  }, Ro.prototype.evaluate = function () {
	    this.value = this.get(), this.dirty = !1;
	  }, Ro.prototype.depend = function () {
	    for (var e = this, t = this.deps.length; t--;) {
	      e.deps[t].depend();
	    }
	  }, Ro.prototype.teardown = function () {
	    var e = this;if (this.active) {
	      this.vm._isBeingDestroyed || d(this.vm._watchers, this);for (var t = this.deps.length; t--;) {
	        e.deps[t].removeSub(e);
	      }this.active = !1;
	    }
	  };var Ho = new no(),
	      Bo = { enumerable: !0, configurable: !0, get: _, set: _ },
	      Uo = { lazy: !0 };lt(ft.prototype);var Vo = { init: function init(e, t, n, r) {
	      if (!e.componentInstance || e.componentInstance._isDestroyed) (e.componentInstance = ht(e, jo, n, r)).$mount(t ? e.elm : void 0, t);else if (e.data.keepAlive) {
	        var i = e;Vo.prepatch(i, i);
	      }
	    }, prepatch: function prepatch(e, t) {
	      var n = t.componentOptions;Oe(t.componentInstance = e.componentInstance, n.propsData, n.listeners, t, n.children);
	    }, insert: function insert(e) {
	      var t = e.context,
	          n = e.componentInstance;n._isMounted || (n._isMounted = !0, je(n, "mounted")), e.data.keepAlive && (t._isMounted ? Me(n) : Te(n, !0));
	    }, destroy: function destroy(e) {
	      var t = e.componentInstance;t._isDestroyed || (e.data.keepAlive ? Ee(t, !0) : t.$destroy());
	    } },
	      zo = Object.keys(Vo),
	      Ko = 1,
	      Jo = 2,
	      qo = 0;!function (e) {
	    e.prototype._init = function (e) {
	      var t = this;t._uid = qo++, t._isVue = !0, e && e._isComponent ? wt(t, e) : t.$options = J(xt(t.constructor), e || {}, t), t._renderProxy = t, t._self = t, ke(t), ge(t), Ct(t), je(t, "beforeCreate"), Qe(t), Be(t), Ye(t), je(t, "created"), t.$options.el && t.$mount(t.$options.el);
	    };
	  }(Ot), function (e) {
	    var t = {};t.get = function () {
	      return this._data;
	    };var n = {};n.get = function () {
	      return this._props;
	    }, Object.defineProperty(e.prototype, "$data", t), Object.defineProperty(e.prototype, "$props", n), e.prototype.$set = D, e.prototype.$delete = P, e.prototype.$watch = function (e, t, n) {
	      var r = this;if (a(t)) return Ze(r, e, t, n);(n = n || {}).user = !0;var i = new Ro(r, e, t, n);return n.immediate && t.call(r, i.value), function () {
	        i.teardown();
	      };
	    };
	  }(Ot), function (e) {
	    var t = /^hook:/;e.prototype.$on = function (e, n) {
	      var r = this,
	          i = this;if (Array.isArray(e)) for (var o = 0, a = e.length; o < a; o++) {
	        r.$on(e[o], n);
	      } else (i._events[e] || (i._events[e] = [])).push(n), t.test(e) && (i._hasHookEvent = !0);return i;
	    }, e.prototype.$once = function (e, t) {
	      function n() {
	        r.$off(e, n), t.apply(r, arguments);
	      }var r = this;return n.fn = t, r.$on(e, n), r;
	    }, e.prototype.$off = function (e, t) {
	      var n = this,
	          r = this;if (!arguments.length) return r._events = Object.create(null), r;if (Array.isArray(e)) {
	        for (var i = 0, o = e.length; i < o; i++) {
	          n.$off(e[i], t);
	        }return r;
	      }var a = r._events[e];if (!a) return r;if (!t) return r._events[e] = null, r;if (t) for (var s, c = a.length; c--;) {
	        if ((s = a[c]) === t || s.fn === t) {
	          a.splice(c, 1);break;
	        }
	      }return r;
	    }, e.prototype.$emit = function (e) {
	      var t = this,
	          n = t._events[e];if (n) {
	        n = n.length > 1 ? m(n) : n;for (var r = m(arguments, 1), i = 0, o = n.length; i < o; i++) {
	          try {
	            n[i].apply(t, r);
	          } catch (n) {
	            Q(n, t, 'event handler for "' + e + '"');
	          }
	        }
	      }return t;
	    };
	  }(Ot), function (e) {
	    e.prototype._update = function (e, t) {
	      var n = this;n._isMounted && je(n, "beforeUpdate");var r = n.$el,
	          i = n._vnode,
	          o = jo;jo = n, n._vnode = e, i ? n.$el = n.__patch__(i, e) : (n.$el = n.__patch__(n.$el, e, t, !1, n.$options._parentElm, n.$options._refElm), n.$options._parentElm = n.$options._refElm = null), jo = o, r && (r.__vue__ = null), n.$el && (n.$el.__vue__ = n), n.$vnode && n.$parent && n.$vnode === n.$parent._vnode && (n.$parent.$el = n.$el);
	    }, e.prototype.$forceUpdate = function () {
	      var e = this;e._watcher && e._watcher.update();
	    }, e.prototype.$destroy = function () {
	      var e = this;if (!e._isBeingDestroyed) {
	        je(e, "beforeDestroy"), e._isBeingDestroyed = !0;var t = e.$parent;!t || t._isBeingDestroyed || e.$options.abstract || d(t.$children, e), e._watcher && e._watcher.teardown();for (var n = e._watchers.length; n--;) {
	          e._watchers[n].teardown();
	        }e._data.__ob__ && e._data.__ob__.vmCount--, e._isDestroyed = !0, e.__patch__(e._vnode, null), je(e, "destroyed"), e.$off(), e.$el && (e.$el.__vue__ = null), e.$vnode && (e.$vnode.parent = null);
	      }
	    };
	  }(Ot), function (e) {
	    lt(e.prototype), e.prototype.$nextTick = function (e) {
	      return re(e, this);
	    }, e.prototype._render = function () {
	      var e = this,
	          t = e.$options,
	          n = t.render,
	          r = t._parentVnode;if (e._isMounted) for (var i in e.$slots) {
	        var o = e.$slots[i];o._rendered && (e.$slots[i] = j(o, !0));
	      }e.$scopedSlots = r && r.data.scopedSlots || Ui, e.$vnode = r;var a;try {
	        a = n.call(e._renderProxy, e.$createElement);
	      } catch (t) {
	        Q(t, e, "render"), a = e._vnode;
	      }return a instanceof lo || (a = po()), a.parent = r, a;
	    };
	  }(Ot);var Wo = [String, RegExp, Array],
	      Go = { KeepAlive: { name: "keep-alive", abstract: !0, props: { include: Wo, exclude: Wo, max: [String, Number] }, created: function created() {
	        this.cache = Object.create(null), this.keys = [];
	      }, destroyed: function destroyed() {
	        var e = this;for (var t in e.cache) {
	          Pt(e.cache, t, e.keys);
	        }
	      }, watch: { include: function include(e) {
	          Dt(this, function (t) {
	            return Mt(e, t);
	          });
	        }, exclude: function exclude(e) {
	          Dt(this, function (t) {
	            return !Mt(e, t);
	          });
	        } }, render: function render() {
	        var e = ye(this.$slots.default),
	            t = e && e.componentOptions;if (t) {
	          var n = It(t);if (n && (this.exclude && Mt(this.exclude, n) || this.include && !Mt(this.include, n))) return e;var r = this,
	              i = r.cache,
	              o = r.keys,
	              a = null == e.key ? t.Ctor.cid + (t.tag ? "::" + t.tag : "") : e.key;i[a] ? (e.componentInstance = i[a].componentInstance, d(o, a), o.push(a)) : (i[a] = e, o.push(a), this.max && o.length > parseInt(this.max) && Pt(i, o[0], o, this._vnode)), e.data.keepAlive = !0;
	        }return e;
	      } } };!function (e) {
	    var t = {};t.get = function () {
	      return Bi;
	    }, Object.defineProperty(e, "config", t), e.util = { warn: ao, extend: y, mergeOptions: J, defineReactive: M }, e.set = D, e.delete = P, e.nextTick = re, e.options = Object.create(null), Ri.forEach(function (t) {
	      e.options[t + "s"] = Object.create(null);
	    }), e.options._base = e, y(e.options.components, Go), St(e), Tt(e), Et(e), Lt(e);
	  }(Ot), Object.defineProperty(Ot.prototype, "$isServer", { get: ro }), Object.defineProperty(Ot.prototype, "$ssrContext", { get: function get() {
	      return this.$vnode && this.$vnode.ssrContext;
	    } }), Ot.version = "2.5.3";var Zo,
	      Yo,
	      Qo,
	      Xo,
	      ea,
	      ta,
	      na,
	      ra,
	      ia = f("style,class"),
	      oa = f("input,textarea,option,select,progress"),
	      aa = function aa(e, t, n) {
	    return "value" === n && oa(e) && "button" !== t || "selected" === n && "option" === e || "checked" === n && "input" === e || "muted" === n && "video" === e;
	  },
	      sa = f("contenteditable,draggable,spellcheck"),
	      ca = f("allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,default,defaultchecked,defaultmuted,defaultselected,defer,disabled,enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,required,reversed,scoped,seamless,selected,sortable,translate,truespeed,typemustmatch,visible"),
	      ua = "http://www.w3.org/1999/xlink",
	      la = function la(e) {
	    return ":" === e.charAt(5) && "xlink" === e.slice(0, 5);
	  },
	      fa = function fa(e) {
	    return la(e) ? e.slice(6, e.length) : "";
	  },
	      da = function da(e) {
	    return null == e || !1 === e;
	  },
	      pa = { svg: "http://www.w3.org/2000/svg", math: "http://www.w3.org/1998/Math/MathML" },
	      va = f("html,body,base,head,link,meta,style,title,address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,menuitem,summary,content,element,shadow,template,blockquote,iframe,tfoot"),
	      ha = f("svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,foreignObject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view", !0),
	      ma = function ma(e) {
	    return va(e) || ha(e);
	  },
	      ya = Object.create(null),
	      ga = f("text,number,password,search,email,tel,url"),
	      _a = Object.freeze({ createElement: function createElement(e, t) {
	      var n = document.createElement(e);return "select" !== e ? n : (t.data && t.data.attrs && void 0 !== t.data.attrs.multiple && n.setAttribute("multiple", "multiple"), n);
	    }, createElementNS: function createElementNS(e, t) {
	      return document.createElementNS(pa[e], t);
	    }, createTextNode: function createTextNode(e) {
	      return document.createTextNode(e);
	    }, createComment: function createComment(e) {
	      return document.createComment(e);
	    }, insertBefore: function insertBefore(e, t, n) {
	      e.insertBefore(t, n);
	    }, removeChild: function removeChild(e, t) {
	      e.removeChild(t);
	    }, appendChild: function appendChild(e, t) {
	      e.appendChild(t);
	    }, parentNode: function parentNode(e) {
	      return e.parentNode;
	    }, nextSibling: function nextSibling(e) {
	      return e.nextSibling;
	    }, tagName: function tagName(e) {
	      return e.tagName;
	    }, setTextContent: function setTextContent(e, t) {
	      e.textContent = t;
	    }, setAttribute: function setAttribute(e, t, n) {
	      e.setAttribute(t, n);
	    } }),
	      ba = { create: function create(e, t) {
	      qt(t);
	    }, update: function update(e, t) {
	      e.data.ref !== t.data.ref && (qt(e, !0), qt(t));
	    }, destroy: function destroy(e) {
	      qt(e, !0);
	    } },
	      $a = new lo("", {}, []),
	      Ca = ["create", "activate", "update", "remove", "destroy"],
	      wa = { create: Yt, update: Yt, destroy: function destroy(e) {
	      Yt(e, $a);
	    } },
	      xa = Object.create(null),
	      ka = [ba, wa],
	      Aa = { create: nn, update: nn },
	      Oa = { create: on, update: on },
	      Sa = /[\w).+\-_$\]]/,
	      Ta = "__r",
	      Ea = "__c",
	      ja = { create: Nn, update: Nn },
	      Na = { create: Ln, update: Ln },
	      La = v(function (e) {
	    var t = {},
	        n = /;(?![^(]*\))/g,
	        r = /:(.+)/;return e.split(n).forEach(function (e) {
	      if (e) {
	        var n = e.split(r);n.length > 1 && (t[n[0].trim()] = n[1].trim());
	      }
	    }), t;
	  }),
	      Ia = /^--/,
	      Ma = /\s*!important$/,
	      Da = function Da(e, t, n) {
	    if (Ia.test(t)) e.style.setProperty(t, n);else if (Ma.test(n)) e.style.setProperty(t, n.replace(Ma, ""), "important");else {
	      var r = Fa(t);if (Array.isArray(n)) for (var i = 0, o = n.length; i < o; i++) {
	        e.style[r] = n[i];
	      } else e.style[r] = n;
	    }
	  },
	      Pa = ["Webkit", "Moz", "ms"],
	      Fa = v(function (e) {
	    if (ra = ra || document.createElement("div").style, "filter" !== (e = Ni(e)) && e in ra) return e;for (var t = e.charAt(0).toUpperCase() + e.slice(1), n = 0; n < Pa.length; n++) {
	      var r = Pa[n] + t;if (r in ra) return r;
	    }
	  }),
	      Ra = { create: Hn, update: Hn },
	      Ha = v(function (e) {
	    return { enterClass: e + "-enter", enterToClass: e + "-enter-to", enterActiveClass: e + "-enter-active", leaveClass: e + "-leave", leaveToClass: e + "-leave-to", leaveActiveClass: e + "-leave-active" };
	  }),
	      Ba = Ki && !Wi,
	      Ua = "transition",
	      Va = "animation",
	      za = "transition",
	      Ka = "transitionend",
	      Ja = "animation",
	      qa = "animationend";Ba && (void 0 === window.ontransitionend && void 0 !== window.onwebkittransitionend && (za = "WebkitTransition", Ka = "webkitTransitionEnd"), void 0 === window.onanimationend && void 0 !== window.onwebkitanimationend && (Ja = "WebkitAnimation", qa = "webkitAnimationEnd"));var Wa = Ki ? window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : setTimeout : function (e) {
	    return e();
	  },
	      Ga = /\b(transform|all)(,|$)/,
	      Za = function (r) {
	    function o(e) {
	      return new lo(j.tagName(e).toLowerCase(), {}, [], void 0, e);
	    }function a(e, t) {
	      function n() {
	        0 == --n.listeners && s(e);
	      }return n.listeners = t, n;
	    }function s(e) {
	      var n = j.parentNode(e);t(n) && j.removeChild(n, e);
	    }function c(e, r, i, o, a) {
	      if (e.isRootInsert = !a, !u(e, r, i, o)) {
	        var s = e.data,
	            c = e.children,
	            l = e.tag;t(l) ? (e.elm = e.ns ? j.createElementNS(e.ns, l) : j.createElement(l, e), y(e), v(e, c, r), t(s) && m(e, r), p(i, e.elm, o)) : n(e.isComment) ? (e.elm = j.createComment(e.text), p(i, e.elm, o)) : (e.elm = j.createTextNode(e.text), p(i, e.elm, o));
	      }
	    }function u(e, r, i, o) {
	      var a = e.data;if (t(a)) {
	        var s = t(e.componentInstance) && a.keepAlive;if (t(a = a.hook) && t(a = a.init) && a(e, !1, i, o), t(e.componentInstance)) return l(e, r), n(s) && d(e, r, i, o), !0;
	      }
	    }function l(e, n) {
	      t(e.data.pendingInsert) && (n.push.apply(n, e.data.pendingInsert), e.data.pendingInsert = null), e.elm = e.componentInstance.$el, h(e) ? (m(e, n), y(e)) : (qt(e), n.push(e));
	    }function d(e, n, r, i) {
	      for (var o, a = e; a.componentInstance;) {
	        if (a = a.componentInstance._vnode, t(o = a.data) && t(o = o.transition)) {
	          for (o = 0; o < T.activate.length; ++o) {
	            T.activate[o]($a, a);
	          }n.push(a);break;
	        }
	      }p(r, e.elm, i);
	    }function p(e, n, r) {
	      t(e) && (t(r) ? r.parentNode === e && j.insertBefore(e, n, r) : j.appendChild(e, n));
	    }function v(e, t, n) {
	      if (Array.isArray(t)) for (var r = 0; r < t.length; ++r) {
	        c(t[r], n, e.elm, null, !0);
	      } else i(e.text) && j.appendChild(e.elm, j.createTextNode(e.text));
	    }function h(e) {
	      for (; e.componentInstance;) {
	        e = e.componentInstance._vnode;
	      }return t(e.tag);
	    }function m(e, n) {
	      for (var r = 0; r < T.create.length; ++r) {
	        T.create[r]($a, e);
	      }t(O = e.data.hook) && (t(O.create) && O.create($a, e), t(O.insert) && n.push(e));
	    }function y(e) {
	      var n;if (t(n = e.functionalScopeId)) j.setAttribute(e.elm, n, "");else for (var r = e; r;) {
	        t(n = r.context) && t(n = n.$options._scopeId) && j.setAttribute(e.elm, n, ""), r = r.parent;
	      }t(n = jo) && n !== e.context && n !== e.functionalContext && t(n = n.$options._scopeId) && j.setAttribute(e.elm, n, "");
	    }function g(e, t, n, r, i, o) {
	      for (; r <= i; ++r) {
	        c(n[r], o, e, t);
	      }
	    }function _(e) {
	      var n,
	          r,
	          i = e.data;if (t(i)) for (t(n = i.hook) && t(n = n.destroy) && n(e), n = 0; n < T.destroy.length; ++n) {
	        T.destroy[n](e);
	      }if (t(n = e.children)) for (r = 0; r < e.children.length; ++r) {
	        _(e.children[r]);
	      }
	    }function b(e, n, r, i) {
	      for (; r <= i; ++r) {
	        var o = n[r];t(o) && (t(o.tag) ? ($(o), _(o)) : s(o.elm));
	      }
	    }function $(e, n) {
	      if (t(n) || t(e.data)) {
	        var r,
	            i = T.remove.length + 1;for (t(n) ? n.listeners += i : n = a(e.elm, i), t(r = e.componentInstance) && t(r = r._vnode) && t(r.data) && $(r, n), r = 0; r < T.remove.length; ++r) {
	          T.remove[r](e, n);
	        }t(r = e.data.hook) && t(r = r.remove) ? r(e, n) : n();
	      } else s(e.elm);
	    }function C(n, r, i, o, a) {
	      for (var s, u, l, f = 0, d = 0, p = r.length - 1, v = r[0], h = r[p], m = i.length - 1, y = i[0], _ = i[m], $ = !a; f <= p && d <= m;) {
	        e(v) ? v = r[++f] : e(h) ? h = r[--p] : Wt(v, y) ? (x(v, y, o), v = r[++f], y = i[++d]) : Wt(h, _) ? (x(h, _, o), h = r[--p], _ = i[--m]) : Wt(v, _) ? (x(v, _, o), $ && j.insertBefore(n, v.elm, j.nextSibling(h.elm)), v = r[++f], _ = i[--m]) : Wt(h, y) ? (x(h, y, o), $ && j.insertBefore(n, h.elm, v.elm), h = r[--p], y = i[++d]) : (e(s) && (s = Zt(r, f, p)), e(u = t(y.key) ? s[y.key] : w(y, r, f, p)) ? c(y, o, n, v.elm) : Wt(l = r[u], y) ? (x(l, y, o), r[u] = void 0, $ && j.insertBefore(n, l.elm, v.elm)) : c(y, o, n, v.elm), y = i[++d]);
	      }f > p ? g(n, e(i[m + 1]) ? null : i[m + 1].elm, i, d, m, o) : d > m && b(n, r, f, p);
	    }function w(e, n, r, i) {
	      for (var o = r; o < i; o++) {
	        var a = n[o];if (t(a) && Wt(e, a)) return o;
	      }
	    }function x(r, i, o, a) {
	      if (r !== i) {
	        var s = i.elm = r.elm;if (n(r.isAsyncPlaceholder)) t(i.asyncFactory.resolved) ? A(r.elm, i, o) : i.isAsyncPlaceholder = !0;else if (n(i.isStatic) && n(r.isStatic) && i.key === r.key && (n(i.isCloned) || n(i.isOnce))) i.componentInstance = r.componentInstance;else {
	          var c,
	              u = i.data;t(u) && t(c = u.hook) && t(c = c.prepatch) && c(r, i);var l = r.children,
	              f = i.children;if (t(u) && h(i)) {
	            for (c = 0; c < T.update.length; ++c) {
	              T.update[c](r, i);
	            }t(c = u.hook) && t(c = c.update) && c(r, i);
	          }e(i.text) ? t(l) && t(f) ? l !== f && C(s, l, f, o, a) : t(f) ? (t(r.text) && j.setTextContent(s, ""), g(s, null, f, 0, f.length - 1, o)) : t(l) ? b(s, l, 0, l.length - 1) : t(r.text) && j.setTextContent(s, "") : r.text !== i.text && j.setTextContent(s, i.text), t(u) && t(c = u.hook) && t(c = c.postpatch) && c(r, i);
	        }
	      }
	    }function k(e, r, i) {
	      if (n(i) && t(e.parent)) e.parent.data.pendingInsert = r;else for (var o = 0; o < r.length; ++o) {
	        r[o].data.hook.insert(r[o]);
	      }
	    }function A(e, r, i) {
	      if (n(r.isComment) && t(r.asyncFactory)) return r.elm = e, r.isAsyncPlaceholder = !0, !0;r.elm = e;var o = r.tag,
	          a = r.data,
	          s = r.children;if (t(a) && (t(O = a.hook) && t(O = O.init) && O(r, !0), t(O = r.componentInstance))) return l(r, i), !0;if (t(o)) {
	        if (t(s)) if (e.hasChildNodes()) {
	          if (t(O = a) && t(O = O.domProps) && t(O = O.innerHTML)) {
	            if (O !== e.innerHTML) return !1;
	          } else {
	            for (var c = !0, u = e.firstChild, f = 0; f < s.length; f++) {
	              if (!u || !A(u, s[f], i)) {
	                c = !1;break;
	              }u = u.nextSibling;
	            }if (!c || u) return !1;
	          }
	        } else v(r, s, i);if (t(a)) for (var d in a) {
	          if (!N(d)) {
	            m(r, i);break;
	          }
	        }
	      } else e.data !== r.text && (e.data = r.text);return !0;
	    }var O,
	        S,
	        T = {},
	        E = r.modules,
	        j = r.nodeOps;for (O = 0; O < Ca.length; ++O) {
	      for (T[Ca[O]] = [], S = 0; S < E.length; ++S) {
	        t(E[S][Ca[O]]) && T[Ca[O]].push(E[S][Ca[O]]);
	      }
	    }var N = f("attrs,style,class,staticClass,staticStyle,key");return function (r, i, a, s, u, l) {
	      if (!e(i)) {
	        var f = !1,
	            d = [];if (e(r)) f = !0, c(i, d, u, l);else {
	          var p = t(r.nodeType);if (!p && Wt(r, i)) x(r, i, d, s);else {
	            if (p) {
	              if (1 === r.nodeType && r.hasAttribute(Fi) && (r.removeAttribute(Fi), a = !0), n(a) && A(r, i, d)) return k(i, d, !0), r;r = o(r);
	            }var v = r.elm,
	                m = j.parentNode(v);if (c(i, d, v._leaveCb ? null : m, j.nextSibling(v)), t(i.parent)) for (var y = i.parent, g = h(i); y;) {
	              for (var $ = 0; $ < T.destroy.length; ++$) {
	                T.destroy[$](y);
	              }if (y.elm = i.elm, g) {
	                for (var C = 0; C < T.create.length; ++C) {
	                  T.create[C]($a, y);
	                }var w = y.data.hook.insert;if (w.merged) for (var O = 1; O < w.fns.length; O++) {
	                  w.fns[O]();
	                }
	              } else qt(y);y = y.parent;
	            }t(m) ? b(m, [r], 0, 0) : t(r.tag) && _(r);
	          }
	        }return k(i, d, f), i.elm;
	      }t(r) && _(r);
	    };
	  }({ nodeOps: _a, modules: [Aa, Oa, ja, Na, Ra, Ki ? { create: tr, activate: tr, remove: function remove(e, t) {
	        !0 !== e.data.show ? Qn(e, t) : t();
	      } } : {}].concat(ka) });Wi && document.addEventListener("selectionchange", function () {
	    var e = document.activeElement;e && e.vmodel && cr(e, "input");
	  });var Ya = { inserted: function inserted(e, t, n, r) {
	      "select" === n.tag ? (r.elm && !r.elm._vOptions ? ae(n, "postpatch", function () {
	        Ya.componentUpdated(e, t, n);
	      }) : nr(e, t, n.context), e._vOptions = [].map.call(e.options, or)) : ("textarea" === n.tag || ga(e.type)) && (e._vModifiers = t.modifiers, t.modifiers.lazy || (e.addEventListener("change", sr), Zi || (e.addEventListener("compositionstart", ar), e.addEventListener("compositionend", sr)), Wi && (e.vmodel = !0)));
	    }, componentUpdated: function componentUpdated(e, t, n) {
	      if ("select" === n.tag) {
	        nr(e, t, n.context);var r = e._vOptions,
	            i = e._vOptions = [].map.call(e.options, or);i.some(function (e, t) {
	          return !b(e, r[t]);
	        }) && (e.multiple ? t.value.some(function (e) {
	          return ir(e, i);
	        }) : t.value !== t.oldValue && ir(t.value, i)) && cr(e, "change");
	      }
	    } },
	      Qa = { model: Ya, show: { bind: function bind(e, t, n) {
	        var r = t.value,
	            i = (n = ur(n)).data && n.data.transition,
	            o = e.__vOriginalDisplay = "none" === e.style.display ? "" : e.style.display;r && i ? (n.data.show = !0, Yn(n, function () {
	          e.style.display = o;
	        })) : e.style.display = r ? o : "none";
	      }, update: function update(e, t, n) {
	        var r = t.value;r !== t.oldValue && ((n = ur(n)).data && n.data.transition ? (n.data.show = !0, r ? Yn(n, function () {
	          e.style.display = e.__vOriginalDisplay;
	        }) : Qn(n, function () {
	          e.style.display = "none";
	        })) : e.style.display = r ? e.__vOriginalDisplay : "none");
	      }, unbind: function unbind(e, t, n, r, i) {
	        i || (e.style.display = e.__vOriginalDisplay);
	      } } },
	      Xa = { name: String, appear: Boolean, css: Boolean, mode: String, type: String, enterClass: String, leaveClass: String, enterToClass: String, leaveToClass: String, enterActiveClass: String, leaveActiveClass: String, appearClass: String, appearActiveClass: String, appearToClass: String, duration: [Number, String, Object] },
	      es = { name: "transition", props: Xa, abstract: !0, render: function render(e) {
	      var t = this,
	          n = this.$options._renderChildren;if (n && (n = n.filter(function (e) {
	        return e.tag || me(e);
	      })).length) {
	        var r = this.mode,
	            o = n[0];if (pr(this.$vnode)) return o;var a = lr(o);if (!a) return o;if (this._leaving) return dr(e, o);var s = "__transition-" + this._uid + "-";a.key = null == a.key ? a.isComment ? s + "comment" : s + a.tag : i(a.key) ? 0 === String(a.key).indexOf(s) ? a.key : s + a.key : a.key;var c = (a.data || (a.data = {})).transition = fr(this),
	            u = this._vnode,
	            l = lr(u);if (a.data.directives && a.data.directives.some(function (e) {
	          return "show" === e.name;
	        }) && (a.data.show = !0), l && l.data && !vr(a, l) && !me(l)) {
	          var f = l.data.transition = y({}, c);if ("out-in" === r) return this._leaving = !0, ae(f, "afterLeave", function () {
	            t._leaving = !1, t.$forceUpdate();
	          }), dr(e, o);if ("in-out" === r) {
	            if (me(a)) return u;var d,
	                p = function p() {
	              d();
	            };ae(c, "afterEnter", p), ae(c, "enterCancelled", p), ae(f, "delayLeave", function (e) {
	              d = e;
	            });
	          }
	        }return o;
	      }
	    } },
	      ts = y({ tag: String, moveClass: String }, Xa);delete ts.mode;var ns = { Transition: es, TransitionGroup: { props: ts, render: function render(e) {
	        for (var t = this.tag || this.$vnode.data.tag || "span", n = Object.create(null), r = this.prevChildren = this.children, i = this.$slots.default || [], o = this.children = [], a = fr(this), s = 0; s < i.length; s++) {
	          var c = i[s];c.tag && null != c.key && 0 !== String(c.key).indexOf("__vlist") && (o.push(c), n[c.key] = c, (c.data || (c.data = {})).transition = a);
	        }if (r) {
	          for (var u = [], l = [], f = 0; f < r.length; f++) {
	            var d = r[f];d.data.transition = a, d.data.pos = d.elm.getBoundingClientRect(), n[d.key] ? u.push(d) : l.push(d);
	          }this.kept = e(t, null, u), this.removed = l;
	        }return e(t, null, o);
	      }, beforeUpdate: function beforeUpdate() {
	        this.__patch__(this._vnode, this.kept, !1, !0), this._vnode = this.kept;
	      }, updated: function updated() {
	        var e = this.prevChildren,
	            t = this.moveClass || (this.name || "v") + "-move";e.length && this.hasMove(e[0].elm, t) && (e.forEach(hr), e.forEach(mr), e.forEach(yr), this._reflow = document.body.offsetHeight, e.forEach(function (e) {
	          if (e.data.moved) {
	            var n = e.elm,
	                r = n.style;Kn(n, t), r.transform = r.WebkitTransform = r.transitionDuration = "", n.addEventListener(Ka, n._moveCb = function e(r) {
	              r && !/transform$/.test(r.propertyName) || (n.removeEventListener(Ka, e), n._moveCb = null, Jn(n, t));
	            });
	          }
	        }));
	      }, methods: { hasMove: function hasMove(e, t) {
	          if (!Ba) return !1;if (this._hasMove) return this._hasMove;var n = e.cloneNode();e._transitionClasses && e._transitionClasses.forEach(function (e) {
	            Un(n, e);
	          }), Bn(n, t), n.style.display = "none", this.$el.appendChild(n);var r = Wn(n);return this.$el.removeChild(n), this._hasMove = r.hasTransform;
	        } } } };Ot.config.mustUseProp = aa, Ot.config.isReservedTag = ma, Ot.config.isReservedAttr = ia, Ot.config.getTagNamespace = Kt, Ot.config.isUnknownElement = function (e) {
	    if (!Ki) return !0;if (ma(e)) return !1;if (e = e.toLowerCase(), null != ya[e]) return ya[e];var t = document.createElement(e);return e.indexOf("-") > -1 ? ya[e] = t.constructor === window.HTMLUnknownElement || t.constructor === window.HTMLElement : ya[e] = /HTMLUnknownElement/.test(t.toString());
	  }, y(Ot.options.directives, Qa), y(Ot.options.components, ns), Ot.prototype.__patch__ = Ki ? Za : _, Ot.prototype.$mount = function (e, t) {
	    return e = e && Ki ? Jt(e) : void 0, Ae(this, e, t);
	  }, Ot.nextTick(function () {
	    Bi.devtools && io && io.emit("init", Ot);
	  }, 0);var rs,
	      is = /\{\{((?:.|\n)+?)\}\}/g,
	      os = /[-.*+?^${}()|[\]\/\\]/g,
	      as = v(function (e) {
	    var t = e[0].replace(os, "\\$&"),
	        n = e[1].replace(os, "\\$&");return new RegExp(t + "((?:.|\\n)+?)" + n, "g");
	  }),
	      ss = { staticKeys: ["staticClass"], transformNode: function transformNode(e, t) {
	      t.warn;var n = hn(e, "class");n && (e.staticClass = JSON.stringify(n));var r = vn(e, "class", !1);r && (e.classBinding = r);
	    }, genData: function genData(e) {
	      var t = "";return e.staticClass && (t += "staticClass:" + e.staticClass + ","), e.classBinding && (t += "class:" + e.classBinding + ","), t;
	    } },
	      cs = { staticKeys: ["staticStyle"], transformNode: function transformNode(e, t) {
	      var n = hn(e, "style");n && (e.staticStyle = JSON.stringify(La(n)));var r = vn(e, "style", !1);r && (e.styleBinding = r);
	    }, genData: function genData(e) {
	      var t = "";return e.staticStyle && (t += "staticStyle:" + e.staticStyle + ","), e.styleBinding && (t += "style:(" + e.styleBinding + "),"), t;
	    } },
	      us = { decode: function decode(e) {
	      return rs = rs || document.createElement("div"), rs.innerHTML = e, rs.textContent;
	    } },
	      ls = f("area,base,br,col,embed,frame,hr,img,input,isindex,keygen,link,meta,param,source,track,wbr"),
	      fs = f("colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr,source"),
	      ds = f("address,article,aside,base,blockquote,body,caption,col,colgroup,dd,details,dialog,div,dl,dt,fieldset,figcaption,figure,footer,form,h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,legend,li,menuitem,meta,optgroup,option,param,rp,rt,source,style,summary,tbody,td,tfoot,th,thead,title,tr,track"),
	      ps = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/,
	      vs = "[a-zA-Z_][\\w\\-\\.]*",
	      hs = "((?:" + vs + "\\:)?" + vs + ")",
	      ms = new RegExp("^<" + hs),
	      ys = /^\s*(\/?)>/,
	      gs = new RegExp("^<\\/" + hs + "[^>]*>"),
	      _s = /^<!DOCTYPE [^>]+>/i,
	      bs = /^<!--/,
	      $s = /^<!\[/,
	      Cs = !1;"x".replace(/x(.)?/g, function (e, t) {
	    Cs = "" === t;
	  });var ws,
	      xs,
	      ks,
	      As,
	      Os,
	      Ss,
	      Ts,
	      Es,
	      js,
	      Ns,
	      Ls,
	      Is = f("script,style,textarea", !0),
	      Ms = {},
	      Ds = { "&lt;": "<", "&gt;": ">", "&quot;": '"', "&amp;": "&", "&#10;": "\n", "&#9;": "\t" },
	      Ps = /&(?:lt|gt|quot|amp);/g,
	      Fs = /&(?:lt|gt|quot|amp|#10|#9);/g,
	      Rs = f("pre,textarea", !0),
	      Hs = function Hs(e, t) {
	    return e && Rs(e) && "\n" === t[0];
	  },
	      Bs = /^@|^v-on:/,
	      Us = /^v-|^@|^:/,
	      Vs = /(.*?)\s+(?:in|of)\s+(.*)/,
	      zs = /\((\{[^}]*\}|[^,]*),([^,]*)(?:,([^,]*))?\)/,
	      Ks = /:(.*)$/,
	      Js = /^:|^v-bind:/,
	      qs = /\.[^.]+/g,
	      Ws = v(us.decode),
	      Gs = /^xmlns:NS\d+/,
	      Zs = /^NS\d+:/,
	      Ys = [ss, cs, { preTransformNode: function preTransformNode(e, t) {
	      if ("input" === e.tag) {
	        var n = e.attrsMap;if (n["v-model"] && (n["v-bind:type"] || n[":type"])) {
	          var r = vn(e, "type"),
	              i = hn(e, "v-if", !0),
	              o = i ? "&&(" + i + ")" : "",
	              a = null != hn(e, "v-else", !0),
	              s = hn(e, "v-else-if", !0),
	              c = Vr(e);Sr(c), zr(c, "type", "checkbox"), kr(c, t), c.processed = !0, c.if = "(" + r + ")==='checkbox'" + o, Nr(c, { exp: c.if, block: c });var u = Vr(e);hn(u, "v-for", !0), zr(u, "type", "radio"), kr(u, t), Nr(c, { exp: "(" + r + ")==='radio'" + o, block: u });var l = Vr(e);return hn(l, "v-for", !0), zr(l, ":type", r), kr(l, t), Nr(c, { exp: i, block: l }), a ? c.else = !0 : s && (c.elseif = s), c;
	        }
	      }
	    } }],
	      Qs = { expectHTML: !0, modules: Ys, directives: { model: function model(e, t, n) {
	        var r = t.value,
	            i = t.modifiers,
	            o = e.tag,
	            a = e.attrsMap.type;if (e.component) return mn(e, r, i), !1;if ("select" === o) An(e, r, i);else if ("input" === o && "checkbox" === a) xn(e, r, i);else if ("input" === o && "radio" === a) kn(e, r, i);else if ("input" === o || "textarea" === o) On(e, r, i);else if (!Bi.isReservedTag(o)) return mn(e, r, i), !1;return !0;
	      }, text: function text(e, t) {
	        t.value && ln(e, "textContent", "_s(" + t.value + ")");
	      }, html: function html(e, t) {
	        t.value && ln(e, "innerHTML", "_s(" + t.value + ")");
	      } }, isPreTag: function isPreTag(e) {
	      return "pre" === e;
	    }, isUnaryTag: ls, mustUseProp: aa, canBeLeftOpenTag: fs, isReservedTag: ma, getTagNamespace: Kt, staticKeys: function (e) {
	      return e.reduce(function (e, t) {
	        return e.concat(t.staticKeys || []);
	      }, []).join(",");
	    }(Ys) },
	      Xs = v(function (e) {
	    return f("type,tag,attrsList,attrsMap,plain,parent,children,attrs" + (e ? "," + e : ""));
	  }),
	      ec = /^\s*([\w$_]+|\([^)]*?\))\s*=>|^function\s*\(/,
	      tc = /^\s*[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['.*?']|\[".*?"]|\[\d+]|\[[A-Za-z_$][\w$]*])*\s*$/,
	      nc = { esc: 27, tab: 9, enter: 13, space: 32, up: 38, left: 37, right: 39, down: 40, delete: [8, 46] },
	      rc = function rc(e) {
	    return "if(" + e + ")return null;";
	  },
	      ic = { stop: "$event.stopPropagation();", prevent: "$event.preventDefault();", self: rc("$event.target !== $event.currentTarget"), ctrl: rc("!$event.ctrlKey"), shift: rc("!$event.shiftKey"), alt: rc("!$event.altKey"), meta: rc("!$event.metaKey"), left: rc("'button' in $event && $event.button !== 0"), middle: rc("'button' in $event && $event.button !== 1"), right: rc("'button' in $event && $event.button !== 2") },
	      oc = { on: function on(e, t) {
	      e.wrapListeners = function (e) {
	        return "_g(" + e + "," + t.value + ")";
	      };
	    }, bind: function bind(e, t) {
	      e.wrapData = function (n) {
	        return "_b(" + n + ",'" + e.tag + "'," + t.value + "," + (t.modifiers && t.modifiers.prop ? "true" : "false") + (t.modifiers && t.modifiers.sync ? ",true" : "") + ")";
	      };
	    }, cloak: _ },
	      ac = function ac(e) {
	    this.options = e, this.warn = e.warn || cn, this.transforms = un(e.modules, "transformCode"), this.dataGenFns = un(e.modules, "genData"), this.directives = y(y({}, oc), e.directives);var t = e.isReservedTag || Di;this.maybeComponent = function (e) {
	      return !t(e.tag);
	    }, this.onceId = 0, this.staticRenderFns = [];
	  },
	      sc = (new RegExp("\\b" + "do,if,for,let,new,try,var,case,else,with,await,break,catch,class,const,super,throw,while,yield,delete,export,import,return,switch,default,extends,finally,continue,debugger,function,arguments".split(",").join("\\b|\\b") + "\\b"), new RegExp("\\b" + "delete,typeof,void".split(",").join("\\s*\\([^\\)]*\\)|\\b") + "\\s*\\([^\\)]*\\)"), function (e) {
	    return function (t) {
	      function n(n, r) {
	        var i = Object.create(t),
	            o = [],
	            a = [];if (i.warn = function (e, t) {
	          (t ? a : o).push(e);
	        }, r) {
	          r.modules && (i.modules = (t.modules || []).concat(r.modules)), r.directives && (i.directives = y(Object.create(t.directives), r.directives));for (var s in r) {
	            "modules" !== s && "directives" !== s && (i[s] = r[s]);
	          }
	        }var c = e(n, i);return c.errors = o, c.tips = a, c;
	      }return { compile: n, compileToFunctions: xi(n) };
	    };
	  }(function (e, t) {
	    var n = Cr(e.trim(), t);Kr(n, t);var r = ei(n, t);return { ast: n, render: r.render, staticRenderFns: r.staticRenderFns };
	  })(Qs).compileToFunctions),
	      cc = !!Ki && ki(!1),
	      uc = !!Ki && ki(!0),
	      lc = v(function (e) {
	    var t = Jt(e);return t && t.innerHTML;
	  }),
	      fc = Ot.prototype.$mount;return Ot.prototype.$mount = function (e, t) {
	    if ((e = e && Jt(e)) === document.body || e === document.documentElement) return this;var n = this.$options;if (!n.render) {
	      var r = n.template;if (r) {
	        if ("string" == typeof r) "#" === r.charAt(0) && (r = lc(r));else {
	          if (!r.nodeType) return this;r = r.innerHTML;
	        }
	      } else e && (r = Ai(e));if (r) {
	        var i = sc(r, { shouldDecodeNewlines: cc, shouldDecodeNewlinesForHref: uc, delimiters: n.delimiters, comments: n.comments }, this),
	            o = i.render,
	            a = i.staticRenderFns;n.render = o, n.staticRenderFns = a;
	      }
	    }return fc.call(this, e, t);
	  }, Ot.compile = sc, Ot;
	});
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(65).setImmediate))

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

	var apply = Function.prototype.apply;

	// DOM APIs, for completeness

	exports.setTimeout = function() {
	  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
	};
	exports.setInterval = function() {
	  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
	};
	exports.clearTimeout =
	exports.clearInterval = function(timeout) {
	  if (timeout) {
	    timeout.close();
	  }
	};

	function Timeout(id, clearFn) {
	  this._id = id;
	  this._clearFn = clearFn;
	}
	Timeout.prototype.unref = Timeout.prototype.ref = function() {};
	Timeout.prototype.close = function() {
	  this._clearFn.call(window, this._id);
	};

	// Does not start the time, just sets up the members needed.
	exports.enroll = function(item, msecs) {
	  clearTimeout(item._idleTimeoutId);
	  item._idleTimeout = msecs;
	};

	exports.unenroll = function(item) {
	  clearTimeout(item._idleTimeoutId);
	  item._idleTimeout = -1;
	};

	exports._unrefActive = exports.active = function(item) {
	  clearTimeout(item._idleTimeoutId);

	  var msecs = item._idleTimeout;
	  if (msecs >= 0) {
	    item._idleTimeoutId = setTimeout(function onTimeout() {
	      if (item._onTimeout)
	        item._onTimeout();
	    }, msecs);
	  }
	};

	// setimmediate attaches itself to the global object
	__webpack_require__(66);
	exports.setImmediate = setImmediate;
	exports.clearImmediate = clearImmediate;


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
	    "use strict";

	    if (global.setImmediate) {
	        return;
	    }

	    var nextHandle = 1; // Spec says greater than zero
	    var tasksByHandle = {};
	    var currentlyRunningATask = false;
	    var doc = global.document;
	    var registerImmediate;

	    function setImmediate(callback) {
	      // Callback can either be a function or a string
	      if (typeof callback !== "function") {
	        callback = new Function("" + callback);
	      }
	      // Copy function arguments
	      var args = new Array(arguments.length - 1);
	      for (var i = 0; i < args.length; i++) {
	          args[i] = arguments[i + 1];
	      }
	      // Store and register the task
	      var task = { callback: callback, args: args };
	      tasksByHandle[nextHandle] = task;
	      registerImmediate(nextHandle);
	      return nextHandle++;
	    }

	    function clearImmediate(handle) {
	        delete tasksByHandle[handle];
	    }

	    function run(task) {
	        var callback = task.callback;
	        var args = task.args;
	        switch (args.length) {
	        case 0:
	            callback();
	            break;
	        case 1:
	            callback(args[0]);
	            break;
	        case 2:
	            callback(args[0], args[1]);
	            break;
	        case 3:
	            callback(args[0], args[1], args[2]);
	            break;
	        default:
	            callback.apply(undefined, args);
	            break;
	        }
	    }

	    function runIfPresent(handle) {
	        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
	        // So if we're currently running a task, we'll need to delay this invocation.
	        if (currentlyRunningATask) {
	            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
	            // "too much recursion" error.
	            setTimeout(runIfPresent, 0, handle);
	        } else {
	            var task = tasksByHandle[handle];
	            if (task) {
	                currentlyRunningATask = true;
	                try {
	                    run(task);
	                } finally {
	                    clearImmediate(handle);
	                    currentlyRunningATask = false;
	                }
	            }
	        }
	    }

	    function installNextTickImplementation() {
	        registerImmediate = function(handle) {
	            process.nextTick(function () { runIfPresent(handle); });
	        };
	    }

	    function canUsePostMessage() {
	        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
	        // where `global.postMessage` means something completely different and can't be used for this purpose.
	        if (global.postMessage && !global.importScripts) {
	            var postMessageIsAsynchronous = true;
	            var oldOnMessage = global.onmessage;
	            global.onmessage = function() {
	                postMessageIsAsynchronous = false;
	            };
	            global.postMessage("", "*");
	            global.onmessage = oldOnMessage;
	            return postMessageIsAsynchronous;
	        }
	    }

	    function installPostMessageImplementation() {
	        // Installs an event handler on `global` for the `message` event: see
	        // * https://developer.mozilla.org/en/DOM/window.postMessage
	        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

	        var messagePrefix = "setImmediate$" + Math.random() + "$";
	        var onGlobalMessage = function(event) {
	            if (event.source === global &&
	                typeof event.data === "string" &&
	                event.data.indexOf(messagePrefix) === 0) {
	                runIfPresent(+event.data.slice(messagePrefix.length));
	            }
	        };

	        if (global.addEventListener) {
	            global.addEventListener("message", onGlobalMessage, false);
	        } else {
	            global.attachEvent("onmessage", onGlobalMessage);
	        }

	        registerImmediate = function(handle) {
	            global.postMessage(messagePrefix + handle, "*");
	        };
	    }

	    function installMessageChannelImplementation() {
	        var channel = new MessageChannel();
	        channel.port1.onmessage = function(event) {
	            var handle = event.data;
	            runIfPresent(handle);
	        };

	        registerImmediate = function(handle) {
	            channel.port2.postMessage(handle);
	        };
	    }

	    function installReadyStateChangeImplementation() {
	        var html = doc.documentElement;
	        registerImmediate = function(handle) {
	            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
	            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
	            var script = doc.createElement("script");
	            script.onreadystatechange = function () {
	                runIfPresent(handle);
	                script.onreadystatechange = null;
	                html.removeChild(script);
	                script = null;
	            };
	            html.appendChild(script);
	        };
	    }

	    function installSetTimeoutImplementation() {
	        registerImmediate = function(handle) {
	            setTimeout(runIfPresent, 0, handle);
	        };
	    }

	    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
	    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
	    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

	    // Don't get fooled by e.g. browserify environments.
	    if ({}.toString.call(global.process) === "[object process]") {
	        // For Node.js before 0.9
	        installNextTickImplementation();

	    } else if (canUsePostMessage()) {
	        // For non-IE10 modern browsers
	        installPostMessageImplementation();

	    } else if (global.MessageChannel) {
	        // For web workers, where supported
	        installMessageChannelImplementation();

	    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
	        // For IE 6–8
	        installReadyStateChangeImplementation();

	    } else {
	        // For older browsers
	        installSetTimeoutImplementation();
	    }

	    attachTo.setImmediate = setImmediate;
	    attachTo.clearImmediate = clearImmediate;
	}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(43)))

/***/ }),
/* 67 */
/***/ (function(module, exports) {

	'use strict';

	var URL_BASE = '';
	module.exports = {
	    userLoginUrl: URL_BASE + '/user/login',
	    userLogoutUrl: URL_BASE + '/user/logout',
	    userRegisterUrl: URL_BASE + '/user/register'
	};

/***/ })
/******/ ]);