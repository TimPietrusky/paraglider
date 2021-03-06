(function(g, f) { var r = (typeof require === 'function' ? require : function(name) { return {}[name]; }); if (typeof exports === 'object' && typeof module !== 'undefined') { module.exports = f(r) } else if (typeof define === 'function' && define.amd) { define([], f.bind(g,r)) } else { g.Paraglider = f(r) } })(this, function(require,define, module,exports) { return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/**
 * Config data for Paraglider.
 *
 * @file config.js
 * @module config
 * @author Gregor Adams <greg@pixelass.com>
 */

/**
 * Default classList for the plugin.
 * This object can be replaced but not merged
 * @private
 * @type {object}
 * @property {string} pluginLoaded Applied when the plugin has been loaded
 * @property {string} init Applied when the plugin has been initialized. Removed on first interaction.
 * @property {string} slides This element will be used to track touches. This is the wrapper around the slides.
 * @property {string} slide Selector for each single slide.
 * @property {string} current Applied to the currently visible slide
 * @property {string} previous Applied to the previous slide in the queue
 * @property {string} next Applied to the next slide in the queue
 */
var classNames = {
  pluginLoaded: 'pluginLoaded',
  slide: 'slide',
  slides: 'slides',
  init: 'init',
  current: 'current',
  previous: 'previous',
  next: 'next'

  /**
   * Defaults for the presets.
   * @type {object}
   * @property {object} [classNames]
   *   Mapping of class names to be used by the plugin.
   * @property {string} [classNames.pluginLoaded='pluginLoaded']
   *   Applied when the plugin has been loaded
   * @property {string} [classNames.init='init']
   *   Applied when the plugin has been initialized. Removed on first interaction.
   * @property {string} [classNames.slides='slides']
   *   This element will be used to track touches. This is the wrapper around the slides.
   * @property {string} [classNames.slide='slide']
   *   Selector for each single slide.
   * @property {string} [classNames.current='current']
   *   Applied to the currently visible slide
   * @property {string} [classNames.previous='previous']
   *   Applied to the previous slide in the queue
   * @property {string} [classNames.next='next']
   *   Applied to the next slide in the queue
   * @property {object} [addClasses]
   *   Map of class names to be added to slides.
   * @property {object} [addClasses.previous=true]
   *   Sets previous class name to slides.
   * @property {object} [addClasses.current=true]
   *   Sets current class name to slides.
   * @property {object} [addClasses.next=true]
   *   Sets next class name to slides.
   * @property {object} [addMultiClasses]
   *   Map of class names to be added to slides using a counter.
   * @property {object} [addMultiClasses.previous=undefined]
   *   Sets previous class name to slides using a counter.
   * @property {object} [addMultiClasses.current]
   *   Sets current class name to slides using a counter.
   * @property {object} [addMultiClasses.next=undefined]
   *   Sets next class name to slides using a counter.
   * @property {boolean} [enableTouch=true]
   *   Enable touch interaction.
   * @property {boolean} [enableSwipe=true]
   *   Enable mouse/drag/swipe interaction.
   * @property {boolean} [loop=false]
   *   Enable looping slides.
   * @property {?onInit} [onInit=null]
   *   Callback when the slider has been created.
   * @property {?onDestroy} [onDestroy=null]
   *   Callback when the slider has been destroyed.
   * @property {?onSlide} [onSlide=null]
   *   Callback while the slider is moving.
   * @property {?onEnd} [onEnd=null]
   *   Callback while the slider stopped moving.
   * @property {number} [speed=250]
   *   Animation duration when using paging.
   * @property {number} [spring=100]
   *   Animation duration when snapping.
   * @property {number} [snapBackAt=0.25]
   *   Amount of distance needed to snap. [0, 1]
   * @property {number} [threshold=10]
   *   Threshold of pixels until the sliding mechanisms is triggered.
   * @property {number} [initialSlide=0]
   *   Initially visible slide
   * @property {number} [visibleSlides=1]
   *   Amount of visible slides
   * @property {number} [slideBy=1]
   *   Amount of slides to slide on interaction
   */
};var PLUGIN_DEFAULTS = {
  classNames: classNames,
  addClasses: { previous: true, current: true, next: true },
  addMultiClasses: { current: true },
  enableTouch: true,
  enableSwipe: true,
  loop: true,
  onInit: null,
  onDestroy: null,
  onSlide: null,
  onEnd: null,
  speed: 250,
  spring: 100,
  snapBackAt: 0.25,
  threshold: 10,
  initialSlide: 0,
  visibleSlides: 1,
  slideBy: 1

  /**
   * Defaults for the presets.
   * @type {object}
   * @property {object} [classNames]
   *   Mapping of class names to be used by the plugin.
   * @property {string} [classNames.pluginLoaded='pluginLoaded']
   *   Applied when the plugin has been loaded
   * @property {string} [classNames.init='init']
   *   Applied when the plugin has been initialized. Removed on first interaction.
   * @property {string} [classNames.slides='slides']
   *   This element will be used to track touches. This is the wrapper around the slides.
   * @property {string} [classNames.slide='slide']
   *   Selector for each single slide.
   * @property {string} [classNames.current='current']
   *   Applied to the currently visible slide
   * @property {string} [classNames.previous='previous']
   *   Applied to the previous slide in the queue
   * @property {string} [classNames.next='next']
   *   Applied to the next slide in the queue
   * @property {string} [classNames.dot='dot']
   *   Selector for pager dots.
   * @property {string} [classNames.active='active']
   *   Active class for pager dots.
   * @property {string} [classNames.nextButton='nextButton']
   *   Selector for the navigation to the next slide.
   * @property {string} [classNames.prevButton='prevButton']
   *   Selector for the navigation to the previous slide.
   * @property {object} [addClasses]
   *   Map of class names to be added to slides.
   * @property {object} [addClasses.previous=true]
   *   Sets previous class name to slides.
   * @property {object} [addClasses.current=true]
   *   Sets current class name to slides.
   * @property {object} [addClasses.next=true]
   *   Sets next class name to slides.
   * @property {object} [addMultiClasses]
   *   Map of class names to be added to slides using a counter.
   * @property {object} [addMultiClasses.previous=undefined]
   *   Sets previous class name to slides using a counter.
   * @property {object} [addMultiClasses.current]
   *   Sets current class name to slides using a counter.
   * @property {object} [addMultiClasses.next=undefined]
   *   Sets next class name to slides using a counter.
   * @property {boolean} [enableTouch=true]
   *   Enable touch interaction.
   * @property {boolean} [enableSwipe=true]
   *   Enable mouse/drag/swipe interaction.
   * @property {boolean} [loop=false]
   *   Enable looping slides.
   * @property {?onInit} [onInit=null]
   *   Callback when the slider has been created.
   * @property {?onDestroy} [onDestroy=null]
   *   Callback when the slider has been destroyed.
   * @property {?onSlide} [onSlide=null]
   *   Callback while the slider is moving.
   * @property {?onEnd} [onEnd=null]
   *   Callback while the slider stopped moving.
   * @property {number} [speed=250]
   *   Animation duration when using paging.
   * @property {number} [spring=100]
   *   Animation duration when snapping.
   * @property {number} [snapBackAt=0.25]
   *   Amount of distance needed to snap. [0, 1]
   * @property {number} [threshold=10]
   *   Threshold of pixels until the sliding mechanisms is triggered.
   * @property {number} [initialSlide=0]
   *   Initially visible slide
   * @property {number} [visibleSlides=1]
   *   Amount of visible slides
   * @property {number} [slideBy=1]
   *   Amount of slides to slide on interaction
   */
};var PRESET_DEFAULTS = _extends({}, PLUGIN_DEFAULTS, {
  classNames: _extends({}, classNames, {
    dot: 'dot',
    active: 'active',
    nextButton: 'nextButton',
    prevButton: 'prevButton'
  })
});

exports.classNames = classNames;
exports.PLUGIN_DEFAULTS = PLUGIN_DEFAULTS;
exports.PRESET_DEFAULTS = PRESET_DEFAULTS;

},{}],2:[function(require,module,exports){
(function (global){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @file glider/index.js
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @author Gregor Adams <greg@pixelass.com>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _config = require(1);

var _helpers = require(3);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Paraglider plugin.
 * @type {class}
 */
var Glider = function () {
  /**
   * Paraglider is an API driven slider.
   * It exposes a timeline and offers some options.
   *
   * This gives developers a lot of freedom when implementing a slider.
   * The main purpose for this plugin is to create slideshows with a parallax effect.
   * Due to the simplicity you can feed the timeline to other plugins and create amazing
   * effects like animating SVGs or drawing on a canvas.
   *
   * @param {PLUGIN_DEFAULTS} options Custom options for the Plugin call
   * @returns {this}
   */
  function Glider() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Glider);

    /**
     * Plugin options merged from defaults and custom configuration
     * @private
     * @type {object}
     */
    this.options = _extends({}, _config.PLUGIN_DEFAULTS, options);
    /**
     * State store for interaction flags
     * @private
     * @type {object}
     */
    this._state = {
      currentSlide: this.options.initialSlide,
      init: true
    };

    this.nextSlide = this.nextSlide.bind(this);
    this.prevSlide = this.prevSlide.bind(this);
    this.goTo = this.goTo.bind(this);
    this.handleDown = this.handleDown.bind(this);
    this.handleMove = this.handleMove.bind(this);
    this.handleUp = this.handleUp.bind(this);
    this.getClientX = this.getClientX.bind(this);
  }

  /**
   * Handles internal storage
   * @private
   * @param {object} newState The new state properties to merge into the old state
   */


  Glider.prototype.setState = function setState(newState) {
    this._state = _extends({}, this.state, newState);
  };

  /**
   * Getter for the state
   * @private
   * @returns {object}
   */


  /**
   * Init call for the plugin.
   *
   * This method assigns the element to the plugin scope, adds the required
   * event listeners and class names.
   * @param {Element} el An element containing the required markup with and
   * selectors
   */
  Glider.prototype.init = function init(el) {
    var _options = this.options,
        classNames = _options.classNames,
        onInit = _options.onInit;
    /**
     * Outer element
     * @private
     * @type {Element}
     */

    this.el = el;
    /**
     * This element is used to track mouse or touch interaction
     * @private
     * @type {Element}
     */
    this.slidesWrapper = (0, _helpers.findFirst)('.' + classNames.slides, el);
    /**
     * A list of all slides.
     * @private
     * @type {array.<Element>}
     */
    this.slides = (0, _helpers.findAll)('.' + classNames.slide, this.slidesWrapper);

    this.addListeners();
    this.addSides();
    this.addInitClassNames();
    if (typeof onInit === 'function') {
      var _getReturnValues = this.getReturnValues(false),
          next = _getReturnValues.next,
          previous = _getReturnValues.previous,
          current = _getReturnValues.current,
          rest = _getReturnValues.rest;
      /**
       * Callback for the end
       * @public
       * @type {onInit}
       */


      onInit({ next: next, previous: previous, current: current, rest: rest }, this.slides, this.options);
    }
  };

  /**
   * Destroys the plugin by removing event listeners and class names
   */


  Glider.prototype.destroy = function destroy() {
    var onDestroy = this.options.onDestroy;

    this.removeListeners();
    this.removeClassNames();
    this.el = null;
    this.slidesWrapper = null;
    this.slides = null;
    if (typeof onDestroy === 'function') {
      /**
       * Callback for the end
       * @public
       * @type {onDestroy}
       */
      onDestroy(this.options);
    }
  };

  /**
   * Adds event listeners needed for this plugin to work.
   * Movement and release should be tracked on window or document.
   * @private
   * @listens {touchmove}
   *   Listens to touchmove if `enableTouch === true`
   *   global listener to allow out of bounds movement.
   * @listens {touchend}
   *   Listens to touchend if `enableTouch === true`
   *   global listener to allow out of bounds movement.
   * @listens {touchstart}
   *   Listens to touchstart if `enableTouch === true`
   *   scoped listener to determine activity
   * @listens {mousemove}
   *   Listens to mousemove if `enableSwipe === true`
   *   global listener to allow out of bounds movement.
   * @listens {mouseup}
   *   Listens to mouseup if `enableSwipe === true`
   *   global listener to allow out of bounds movement.
   * @listens {mousedown}
   *   Listens to mousedown if `enableSwipe === true`
   *   scoped listener to determine activity
   */


  Glider.prototype.addListeners = function addListeners() {
    /* istanbul ignore next */
    if (this.options.enableTouch) {
      global.addEventListener('touchmove', this.handleMove, { passive: false });
      global.addEventListener('touchend', this.handleUp);
      this.slidesWrapper.addEventListener('touchstart', this.handleDown);
    }
    /* istanbul ignore next */
    if (this.options.enableSwipe) {
      global.addEventListener('mousemove', this.handleMove, { passive: false });
      global.addEventListener('mouseup', this.handleUp);
      this.slidesWrapper.addEventListener('mousedown', this.handleDown);
    }
  };

  /**
   * Removes all event listeners. (Helpful when destroying the plugin instance)
   * @private
   */


  Glider.prototype.removeListeners = function removeListeners() {
    /* istanbul ignore next */
    if (this.options.enableTouch) {
      global.removeEventListener('touchmove', this.handleMove);
      global.removeEventListener('touchend', this.handleUp);
      this.slidesWrapper.removeEventListener('touchstart', this.handleDown);
    }
    /* istanbul ignore next */
    if (this.options.enableSwipe) {
      global.removeEventListener('mousemove', this.handleMove);
      global.removeEventListener('mouseup', this.handleUp);
      this.slidesWrapper.removeEventListener('mousedown', this.handleDown);
    }
  };

  /**
   * Adds class names to slides
   * @private
   */


  Glider.prototype.addClassNames = function addClassNames() {
    var _options2 = this.options,
        addClasses = _options2.addClasses,
        addMultiClasses = _options2.addMultiClasses;

    var keys = Object.keys(addClasses);
    if (keys.length > 0) {
      var _state = this.state,
          currentSlide = _state.currentSlide,
          previousSlide = _state.previousSlide,
          nextSlide = _state.nextSlide;
      var _options3 = this.options,
          visibleSlides = _options3.visibleSlides,
          slideBy = _options3.slideBy,
          classNames = _options3.classNames;
      var current = classNames.current,
          next = classNames.next,
          previous = classNames.previous;
      var length = this.slides.length;

      var diff = visibleSlides - slideBy;
      this.slides.forEach(function (slide, index) {
        var isCurrent = index === currentSlide && addClasses.current === true;
        var isNext = index === (0, _helpers.modLoop)(nextSlide, diff, length) && addClasses.next === true;
        var isPrevious = index === previousSlide && addClasses.previous === true;
        (0, _helpers.toggleClass)(slide, current, isCurrent);
        (0, _helpers.toggleClass)(slide, next, isNext);
        (0, _helpers.toggleClass)(slide, previous, isPrevious);
        if (addMultiClasses.current === true) {
          for (var i = 0; i < visibleSlides; i++) {
            var _isCurrent = index === (0, _helpers.modLoop)(currentSlide, i, length);
            (0, _helpers.toggleClass)(slide, current + '__' + i, _isCurrent);
          }
        }
        if (addMultiClasses.previous === true || addMultiClasses.next === true) {
          for (var _i = 0; _i < slideBy; _i++) {
            var _isNext = index === (0, _helpers.modLoop)(nextSlide, _i + diff, length) && addMultiClasses.next === true;
            var _isPrevious = index === (0, _helpers.modLoop)(previousSlide, _i, length) && addMultiClasses.previous === true;
            (0, _helpers.toggleClass)(slide, next + '__' + _i, _isNext);
            (0, _helpers.toggleClass)(slide, previous + '__' + _i, _isPrevious);
          }
        }
      });
    }
  };

  /**
   * Initially set class names
   *
   * `init` will be removed after the first interaction. It allows a 'silent' start
   * when working with CSS animations or transitions.
   * @private
   */


  Glider.prototype.addInitClassNames = function addInitClassNames() {
    var classNames = this.options.classNames;

    this.el.classList.add(classNames.pluginLoaded);
    this.slides.forEach(function (slide) {
      slide.classList.add(classNames.init);
    });
    this.addClassNames();
  };

  /**
   * Batch removal of class names.
   * This is dirty but simply removes anything the plugin could have set.
   * @todo Find a better way to do this.
   * @private
   */


  Glider.prototype.removeClassNames = function removeClassNames() {
    var _el$classList;

    var classNames = this.options.classNames;

    var classList = Object.keys(classNames).map(function (key) {
      return classNames[key];
    });

    (_el$classList = this.el.classList).remove.apply(_el$classList, classList);
    this.slides.forEach(function (slide) {
      var _slide$classList;

      (_slide$classList = slide.classList).remove.apply(_slide$classList, classList);
    });
  };

  /**
   * Add `previous` and `next` classes around the `current` slide.
   * This function respects pager clicks, which modify the next or previous element.
   * @private
   */


  Glider.prototype.addSides = function addSides() {
    var slideBy = this.options.slideBy;
    var _state2 = this.state,
        currentSlide = _state2.currentSlide,
        requestedNext = _state2.requestedNext,
        requestedPrevious = _state2.requestedPrevious;
    var length = this.slides.length;
    // Respect requested slides.
    // {goTo} could set these values.

    var originalNext = (0, _helpers.modLoop)(currentSlide, slideBy, length);
    var originalPrevious = (0, _helpers.modLoop)(currentSlide, -1 * slideBy, length);
    var nextSlide = (0, _helpers.eitherOr)(requestedNext, originalNext);
    var previousSlide = (0, _helpers.eitherOr)(requestedPrevious, originalPrevious);
    this.setState({ nextSlide: nextSlide, previousSlide: previousSlide });
  };

  /**
   * Moves to the next slide via trigger.
   * @param {?Event} [e=null] optionally pass the event to prevent it
   */


  Glider.prototype.nextSlide = function nextSlide() {
    var _this = this;

    var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    /* istanbul ignore next */
    if (e && 'preventDefault' in e) {
      e.preventDefault();
    }
    /* istanbul ignore next */
    if (this.state.init) {
      this.setState({ init: false });
      this.slides.forEach(function (slide) {
        slide.classList.remove(_this.options.classNames.init);
      });
    }
    this.addSides();
    this.addClassNames();
    this.spring(0, 1, this.options.speed);
    return this.state.nextSlide;
  };

  /**
   * Moves to the previous slide via trigger.
   * @param {?Event} [e=null] optionally pass the event to prevent it
   */


  Glider.prototype.prevSlide = function prevSlide() {
    var _this2 = this;

    var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    /* istanbul ignore next */
    if (e && 'preventDefault' in e) {
      e.preventDefault();
    }
    /* istanbul ignore next */
    if (this.state.init) {
      this.setState({ init: false });
      this.slides.forEach(function (slide) {
        slide.classList.remove(_this2.options.classNames.init);
      });
    }
    this.addSides();
    this.addClassNames();
    this.spring(0, -1, this.options.speed);
    return this.state.previousSlide;
  };

  /**
   * Moves to the nth slide via trigger. Respects left/right movement
   * @param {number} n index of requested slide
   */


  Glider.prototype.goTo = function goTo(n) {
    if (n > this.state.currentSlide) {
      this.setState({ requestedNext: n });
      return this.nextSlide();
      /* istanbul ignore next */
    } else /* istanbul ignore next */if (n < this.state.currentSlide) {
        this.setState({ requestedPrevious: n });
        return this.prevSlide();
      }
  };

  /**
   * Handles the snap animation
   * @private
   * @param {number} progress Current value
   * @param {number} end Final value
   * @param {number} duration Time to pass the until animation is done.
   */


  Glider.prototype.spring = function spring(progress, end, duration) {
    var _this3 = this;

    // Cancel previous animations
    global.cancelAnimationFrame(this.animation);
    /**
     * Animation cache to allow canceling
     */
    var _state3 = this.state,
        currentSlide = _state3.currentSlide,
        nextSlide = _state3.nextSlide,
        previousSlide = _state3.previousSlide;
    var _options4 = this.options,
        loop = _options4.loop,
        visibleSlides = _options4.visibleSlides,
        slideBy = _options4.slideBy;
    var length = this.slides.length;

    var theEnd = end;
    if (!loop) {
      theEnd = end < 0 && previousSlide > currentSlide ? 0 : theEnd;
      theEnd = end > 0 && (0, _helpers.modLoop)(nextSlide, visibleSlides - slideBy, length) < currentSlide ? 0 : theEnd;
    }
    /**
     * Animation flag. Calls the animation and stores the function to allow `cancelAnimationFrame`
     * @private
     * @type {loop}
     */
    this.animation = (0, _helpers.animate)(duration, progress, theEnd, function (p) {
      _this3.setState({
        x: p * _this3.el.offsetWidth
      });
      if (p === theEnd) {
        _this3.handleEnd(theEnd);
      } else {
        _this3.handleProgress();
      }
    });
  };

  /* istanbul ignore next */
  /**
   * Find clientX from the event.
   * This helper will return the correct value for touch or mouse.
   * @private
   * @param {Event} e Mouse or touch event
   * @returns {number} THe clientX of the event
   */


  Glider.prototype.getClientX = function getClientX(e) {
    var _e$touches = e.touches,
        touches = _e$touches === undefined ? [] : _e$touches;

    var _ref = touches[0] || e,
        clientX = _ref.clientX;

    return clientX;
  };

  /**
   * Prepares return values
   * @private
   * @param {boolean} direction
   * @returns {object}
   */


  Glider.prototype.getReturnValues = function getReturnValues() {
    var direction = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    var length = this.slides.length;
    var _options5 = this.options,
        visibleSlides = _options5.visibleSlides,
        slideBy = _options5.slideBy,
        loop = _options5.loop;
    var _state4 = this.state,
        currentSlide = _state4.currentSlide,
        nextSlide = _state4.nextSlide,
        previousSlide = _state4.previousSlide;

    var progress = this.state.x / this.el.offsetWidth;
    var right = progress * -1;
    var currentItems = [];
    for (var i = 0; i < visibleSlides; i++) {
      currentItems.push((0, _helpers.modLoop)(currentSlide, i, length));
    }
    // We only need the lower value
    var nextItems = [null];
    var useNext = currentSlide < (0, _helpers.modLoop)(nextSlide, visibleSlides - slideBy, length) || loop;
    /* istanbul ignore next */
    var returnNext = progress > right && direction;
    /* istanbul ignore next */
    if (useNext && returnNext || !direction) {
      nextItems.pop();
      for (var _i2 = 0; _i2 < visibleSlides; _i2++) {
        nextItems.push((0, _helpers.modLoop)(nextSlide, _i2, length));
      }
    }
    var previousItems = [null];
    var usePrevious = currentSlide > previousSlide || loop;
    /* istanbul ignore next */
    var returnPrevious = progress < right && direction;
    /* istanbul ignore next */
    if (usePrevious && returnPrevious || !direction) {
      previousItems.pop();
      for (var _i3 = 0; _i3 < slideBy; _i3++) {
        previousItems.push((0, _helpers.modLoop)(previousSlide, _i3, length));
      }
    }

    var rest = this.slides.map(function (el, index) {
      return index;
    }).filter(function (originalIndex) {
      return [].concat(previousItems, currentItems, nextItems).filter(function (x) {
        return x !== 0;
      }).indexOf(originalIndex) === -1;
    });

    return {
      rest: rest,
      previous: (0, _helpers.arrayOrValue)(previousItems),
      next: (0, _helpers.arrayOrValue)(nextItems),
      current: (0, _helpers.arrayOrValue)(currentItems),
      progress: Math.abs(progress)
    };
  };

  /* istanbul ignore next */
  /**
   * First interaction with the mouse or per touch will be used to set flags and
   * define initial values.
   * @private
   * @param {Event} e Mouse or touch event
   */


  Glider.prototype.handleDown = function handleDown(e) {
    var _this4 = this;

    var clientX = this.getClientX(e);
    /* istanbul ignore next */
    if (this.state.init) {
      this.slides.forEach(function (slide) {
        slide.classList.remove(_this4.options.classNames.init);
      });
    }
    // Flag down
    // set start coordinate,
    // set current progress
    this.setState({
      down: true,
      xStart: clientX,
      x: 0,
      init: false
    });
  };

  /* istanbul ignore next */
  /**
   * Last interaction with the mouse or per touch will be used to set flags
   * and define initial values.
   * Only fires if down is active. Prevents unintended behavior when the first
   * touch or mousedown was outside the element.
   * @private
   */


  Glider.prototype.handleUp = function handleUp() {
    // Only proceed if the plugin signals a previous down event.
    var _state5 = this.state,
        down = _state5.down,
        blocked = _state5.blocked;

    if (down && blocked) {
      var snapBackAt = this.options.snapBackAt;

      var progress = this.state.x / this.el.offsetWidth;
      var end = 0;
      if (progress <= -1 * snapBackAt) {
        end = -1;
      } else if (progress >= snapBackAt) {
        end = 1;
      }
      this.spring(progress, end, this.options.spring);
    }
    this.setState({ down: false, blocked: false });
  };

  /* istanbul ignore next */
  /**
   * Handler for mouse or touch movement.
   * Waits for a threshold and then records the movement on the `x` axis
   * @private
   * @param {Event} e Mouse or touch move event
   */


  Glider.prototype.handleMove = function handleMove(e) {
    if (this.state.down) {
      var _state6 = this.state,
          xStart = _state6.xStart,
          x = _state6.x,
          blocked = _state6.blocked;
      var threshold = this.options.threshold;

      if (Math.abs(x) > threshold || blocked) {
        this.setState({ blocked: true });
        e.preventDefault();
        this.handleProgress();
      }
      var clientX = this.getClientX(e);
      this.setState({
        x: xStart - clientX
      });
    }
  };

  /**
   * Handles the progress. Calculates the progress from the
   * internal state and element dimension.
   * A callback is fired if set
   * @private
   */


  Glider.prototype.handleProgress = function handleProgress() {
    var _options6 = this.options,
        onSlide = _options6.onSlide,
        slideBy = _options6.slideBy;


    if (typeof onSlide === 'function') {
      var _getReturnValues2 = this.getReturnValues(),
          progress = _getReturnValues2.progress,
          next = _getReturnValues2.next,
          previous = _getReturnValues2.previous,
          current = _getReturnValues2.current,
          rest = _getReturnValues2.rest;
      /**
       * Callback for progression
       * @type {onSlide}
       */


      onSlide(progress * slideBy, { next: next, previous: previous, current: current, rest: rest }, this.slides, this.options);
    }
  };

  /**
   * Handle the end of the slide animation.
   * If there is a callback called `onEnd` call it.
   * @private
   * @param {number} end Final value
   */


  Glider.prototype.handleEnd = function handleEnd(end) {
    var onEnd = this.options.onEnd;

    if (end === -1) {
      this.setState({
        currentSlide: this.state.previousSlide
      });
      /* istanbul ignore next */
    } else /* istanbul ignore next */if (end === 1) {
        this.setState({
          currentSlide: this.state.nextSlide
        });
      }
    this.setState({
      requestedNext: null,
      requestedPrevious: null
    });
    this.addSides();
    this.addClassNames();
    global.cancelAnimationFrame(this.animation);

    if (typeof onEnd === 'function') {
      var _getReturnValues3 = this.getReturnValues(false),
          next = _getReturnValues3.next,
          previous = _getReturnValues3.previous,
          current = _getReturnValues3.current,
          rest = _getReturnValues3.rest;
      /**
       * Callback for the end
       * @public
       * @type {onEnd}
       */


      onEnd({ next: next, previous: previous, current: current, rest: rest }, this.slides, this.options);
    }
  };

  _createClass(Glider, [{
    key: 'state',
    get: function get() {
      return this._state;
    }
  }]);

  return Glider;
}();

exports.default = Glider;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"1":1,"3":3}],3:[function(require,module,exports){
(function (global){
'use strict';

exports.__esModule = true;
/* global document */
/**
 * A collection of helper functions.
 *
 * @file helpers.js
 * @module helpers
 * @author Gregor Adams <greg@pixelass.com>
 */

/* istanbul ignore next */
/**
 * Animates from one value to the other over a given time.
 * This function uses requestAnimationFrame and Date to return a reliable result.
 * @private
 * @param {integer} speed Duration of animation
 * @param {number} from Starting point
 * @param {number} to End point
 * @param {animationCallback} callback Callback to be run on every step.
 * @returns {function} A looping function.
 */
var animate = function animate(speed, from, to, callback) {
  var now = Date.now();
  var step = (to - from) / speed;

  /**
   * Loop function
   * Runs until end is reached
   */
  var loop = function loop() {
    var then = Date.now();
    var diff = then - now;
    var timeLeft = speed - diff;

    if (timeLeft > 0) {
      global.requestAnimationFrame(loop);
      callback(from + step * diff);
    } else {
      global.cancelAnimationFrame(loop);
      callback(to);
    }
  };
  loop();
  return loop;
};
/**
 * @typedef animationCallback
 * @private
 * @type {function}
 * @param {number} progress Current value between `from` and `to`
 * @example
 * animate(1000, 0, 1,
 *   p => {
 *     console.log(p)
 *   }
 * )
 */

/* istanbul ignore next */
/**
 * Helper to get elements. Similar to jQuery's `$(selector, context)`
 * @private
 * @param {string} selector selector to find
 * @param {Element} [context=document] Context to search in
 * @returns {array} A list of matching elements
 * @example
 * findAll('.foo') // => [...]
 */
var findAll = function findAll(selector) {
  var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
  return Array.from(context.querySelectorAll(selector));
};

/* istanbul ignore next */
/**
 * Helper to get elements. Similar to jQuery's `$(selector, context)[0]`
 * @private
 * @param {string} selector selector to find
 * @param {Element} [context=document] Context to search in
 * @returns {Element} The first matching element
 * @example
 * findFirst('.foo') // => <div .../>
 */
var findFirst = function findFirst(selector) {
  var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
  return context.querySelector(selector);
};

/* istanbul ignore next */

/**
 * Toggle class ponyFill to support IE11 and other awkward browsers.
 * IE11 can't use a second argument in `element.classList.toggle`
 * @see https://connect.microsoft.com/IE/Feedback/details/878564/
 * @private
 * @param {Element} el
 * @param {string} className
 * @param {boolean} bool
 * @author Gregor Adams <greg@pixelass.com>
 * @version [version]
 * @example
 * const element = document.querySelector('a')
 * const isActive = true
 * toggle(element, active, isActive) // add active
 * toggle(element, active, 1) // add active
 * toggle(element, active, !0) // add active
 * toggle(element, active, !!1) // add active
 * toggle(element, active, 'yes') // add active
 * toggle(element, active, 'no') // add active
 * toggle(element, active, null) // toggle active
 * toggle(element, active) // toggle active
 * toggle(element, active, false) // remove active
 * toggle(element, active, 0) // remove active
 * toggle(element, active, !!0) // remove active
 * toggle(element, active, '') // remove active
 */
var toggleClass = function toggleClass(el, className) {
  var bool = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

  if (bool === null) {
    el.classList.toggle(className);
  } else if (bool) {
    el.classList.add(className);
  } else {
    el.classList.remove(className);
  }
};

/**
 * Returns either the first or second value depending on truthness.
 * Any number is considered true.
 * @private
 * @param {any} either
 * @param {any} or
 * @returns {any} One of the two input values
 * @example
 * eiterOr(0, 4) // => 0
 * eiterOr('0', 4) // => '0'
 * eiterOr('foo', 4) // => 'foo'
 * eiterOr('', 4) // => 4
 * eiterOr(false, 4) // => 4
 * eiterOr(undefined, 4) // => 4
 * eiterOr(null, 4) // => 4
 * eiterOr({}, 4) // => {}
 * eiterOr([], 4) // => []
 * eiterOr(() => {}, 4) // => () => {}
 */
var eitherOr = function eitherOr(either, or) {
  return typeof either === 'number' ? either : either || or;
};

/**
 * A loop using modulo
 * @private
 * @param {number} current Current value
 * @param {number} addition Addition to the current value
 * @param {number} length Maximum value.
 * @returns {number} Resulting number
 * @example
 * modLoop(1, 2, 3) // => 0
 * modLoop(2, 3, 4) // => 1
 * modLoop(2, -3, 4) // => 3
 * modLoop(20, -3, 20) // => 17
 * modLoop(20, -30, 20) // => 10
 */
var modLoop = function modLoop(current, addition, length) {
  return (current + addition + length) % length;
};

/**
 * Takes an array and returns a single value if it is the only item.
 * Otherwise it returns the original array.
 * @private
 * @param {array} arr Array to check
 * @returns {?any}
 * @example
 * arrayOrValue([null, 1, 2]) // => [null, 1, 2]
 * arrayOrValue([1]) // => 1
 * arrayOrValue(['a']) // => 'a'
 * arrayOrValue([1,'1']) // => [1,'1']
 * arrayOrValue([null]) // => null
 */
var arrayOrValue = function arrayOrValue(arr) {
  return arr.length > 1 ? arr : arr[0];
};

/* istanbul ignore next */
/**
 * Parse dataset with nested object strings to a true object
 * @private
 * @param {dataset} dataset
 * @returns {object} valid JSON
 * @example
 * const data = parseObject(document.querySelector('.foo').dataset)
 */
var parseObject = function parseObject(dataset) {
  var obj = {};
  Object.keys(dataset).forEach(function (key) {
    var value = dataset[key];
    try {
      value = isNaN(value) ? JSON.parse(value) : Number(value);
    } catch (err) {
      // Ignore error
    }
    obj[key] = value;
  });
  return obj;
};

/* istanbul ignore next */
/**
 * Prevents default event
 * @private
 * @param {Event} e
 * @example
 * el.addEventListener('mousemove', preventDefault)
 * el.addEventListener('dragstart', e => {
 *   preventDefault(e)
 *   // ...
 * })
 */
var preventDefault = function preventDefault(e) {
  return e.preventDefault();
};

exports.findAll = findAll;
exports.findFirst = findFirst;
exports.toggleClass = toggleClass;
exports.animate = animate;
exports.modLoop = modLoop;
exports.eitherOr = eitherOr;
exports.arrayOrValue = arrayOrValue;
exports.parseObject = parseObject;
exports.preventDefault = preventDefault;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],4:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _glider = require(2);

var _glider2 = _interopRequireDefault(_glider);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _glider2.default; /**
                                     * Main export file of Paraglider
                                     *
                                     * @file index.js
                                     * @module Paraglider
                                     * @author Gregor Adams <greg@pixelass.com>
                                     */

},{"2":2}]},{},[4]);
(4); });