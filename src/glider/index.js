/**
 * Paraglider is an API driven slider.
 *
 * Per default it simply adds class names to the previous, current and next slide.
 * With the help of callbacks however, you can add any imaginable behavior
 *
 * @file glider/index.js
 * @author Gregor Adams <greg@pixelass.com>
 */

import {PLUGIN_DEFAULTS} from '../config'
import {
  animate,
  eitherOr,
  modLoop,
  findAll as $,
  findFirst as $$
} from '../helpers'

class Glider {
  /**
   * A simple slider API. This class simply applies classnames
   * to the current and surrounding slides.
   *
   * It offers an API that allows you to implement any behaviour imaginable. 😂
   * @param {object} options Custom options for the Plugin call
   * @returns {this}
   */
  constructor(options = {}) {
    this.options = {
      ...PLUGIN_DEFAULTS,
      ...options
    }
    /**
     * State store for interaction flags
     * @private
     * @type {object}
     */
    this._state = {
      currentSlide: this.options.initialSlide
    }

    this.nextSlide = this.nextSlide.bind(this)
    this.prevSlide = this.prevSlide.bind(this)
    this.goTo = this.goTo.bind(this)
    this.handleDown = this.handleDown.bind(this)
    this.handleMove = this.handleMove.bind(this)
    this.handleUp = this.handleUp.bind(this)
    this.getClientX = this.getClientX.bind(this)
  }

  /**
   * Handles internal storage
   * @private
   * @param {object} newState The new state porperties to merge into the old state
   */
  setState(newState) {
    this._state = {
      ...this.state,
      ...newState
    }
  }

  /**
   * Getter for the state
   * @private
   * @returns {object}
   */
  get state() {
    return this._state
  }

  /**
   * Init call for the plugin.
   *
   * This method assigns the element to the plugin scope, adds the required
   * eventListeners and class names.
   * @param {HTMLElement} el An element containing the required markup with and
   * selectors
   */
  init(el) {
    const {classNames} = this.options
    this.el = el
    this.slidesWrapper = $$(`.${classNames.slides}`, el)
    this.slides = $(`.${classNames.slide}`, this.slidesWrapper)

    this.addListeners()
    this.addSides()
    this.addInitClassNames()
  }

  /**
   * Destroys the plugin by removing eventlisteners and class names
   */
  destroy() {
    this.removeListeners()
    this.removeClassNames()
    this.el = null
    this.slidesWrapper = null
    this.slides = null
  }

  /**
   * Adds eventlisteners needed for this plugin to work.
   * Movement and release should be tracked on window or document.
   * @private
   */
  addListeners() {
    global.addEventListener('mousemove', this.handleMove, {passive: false})
    global.addEventListener('mouseup', this.handleUp)
    global.addEventListener('touchmove', this.handleMove, {passive: false})
    global.addEventListener('touchend', this.handleUp)
    this.slidesWrapper.addEventListener('mousedown', this.handleDown)
    this.slidesWrapper.addEventListener('touchstart', this.handleDown)
  }

  /**
   * Removes all eventlisteners. (Helpful when destroying the plugin instance)
   * @private
   */
  removeListeners() {
    global.removeEventListener('mousemove', this.handleMove)
    global.removeEventListener('mouseup', this.handleUp)
    global.removeEventListener('touchmove', this.handleMove)
    global.removeEventListener('touchend', this.handleUp)
    this.slidesWrapper.removeEventListener('mousedown', this.handleDown)
    this.slidesWrapper.removeEventListener('touchstart', this.handleDown)
  }

  /**
   * Adds class names to slides
   * @private
   */
  addClassNames() {
    const {currentSlide, previousSlide, nextSlide} = this.state
    const {current, next, previous} = this.options.classNames
    this.slides.forEach((slide, index) => {
      slide.classList.toggle(current, index === currentSlide)
      slide.classList.toggle(next, index === nextSlide)
      slide.classList.toggle(previous, index === previousSlide)
    })
  }

  /**
   * Initially set class names
   *
   * `init` will be removed after the first interaction. It allows a 'silent' start
   * when working with CSS animations or transitions.
   * @private
   */
  addInitClassNames() {
    const {classNames} = this.options
    this.el.classList.add(classNames.pluginLoaded)
    this.slides.forEach(slide => {
      slide.classList.add(classNames.init)
    })
    this.addClassNames()
  }

  /**
   * Batch removal of class names.
   * This is dirty but simply removes anything the plugin could have set.
   * @private
   */
  removeClassNames() {
    const {classNames} = this.options
    const classList = (Object.keys(classNames).map(key => classNames[key]))

    this.el.classList.remove(...classList)
    this.slides.forEach(slide => {
      slide.classList.remove(...classList)
    })
  }

  /**
   * Add `previous` and `next` classes around the `current` slide.
   * This function respects pager clicks, which modify the next or previous element.
   * @private
   */
  addSides() {
    const {currentSlide, requestedNext, requestedPrevious} = this.state
    const {length} = this.slides
    // Respect requested slides.
    // {goTo} could set these values.
    const nextSlide = eitherOr(requestedNext, modLoop(currentSlide, 1, length))
    const previousSlide = eitherOr(requestedPrevious, modLoop(currentSlide, -1, length))

    this.setState({nextSlide, previousSlide})
  }

  /**
   * Moves to the next slide via trigger.
   */
  nextSlide(e) {
    /* istanbul ignore next */
    if (e && 'preventDefault' in e) {
      e.preventDefault()
    }
    this.addSides()
    this.addClassNames()
    this.spring(0, 1, this.options.speed)
  }

  /**
   * Moves to the previous slide via trigger.
   */
  prevSlide(e) {
    /* istanbul ignore next */
    if (e && 'preventDefault' in e) {
      e.preventDefault()
    }
    this.addSides()
    this.addClassNames()
    this.spring(0, -1, this.options.speed)
  }

  /**
   * Moves to the nth slide via trigger. Respects left/right movement
   */
  goTo(n) {
    if (n > this.state.currentSlide) {
      this.setState({requestedNext: n})
      this.nextSlide()
    /* istanbul ignore next */
    } else /* istanbul ignore next */ if (n < this.state.currentSlide) {
      this.setState({requestedPrevious: n})
      this.prevSlide()
    }
  }

  /**
   * Handles the snap animation
   * @private
   * @param {number} progress Current value
   * @param {number} end Final value
   * @param {number} duration Time to pass the until animation is done.
   */
  spring(progress, end, duration) {
    animate(duration, progress, end,
      p => {
        this.setState({
          x: p * this.el.offsetWidth
        })
        if (p === end) {
          this.handleEnd(end)
        } else {
          this.handleProgress()
        }
      }
    )
  }

  /* istanbul ignore next */
  /**
   * Find clientX from the event.
   * This helper will return the correct value for touch or mouse.
   * @private
   * @param {event} e Mouse or touch event
   * @returns {number} THe clientX of the event
   */
  getClientX(e) {
    const {touches = []} = e
    const {clientX} = touches[0] || e
    return clientX
  }

  /**
   * Prepares return values
   * @private
   * @param {boolean} direction
   * @returns {object}
   */
  getReturnValues(direction = true) {
    const progress = this.state.x / this.el.offsetWidth
    const {currentSlide, nextSlide, previousSlide} = this.state
    const right = progress * -1
    const current = currentSlide
    // We only need the lower value
    /* istanbul ignore next */
    const next = progress < right && direction ? null : nextSlide
    /* istanbul ignore next */
    const previous = progress > right && direction ? null : previousSlide

    const rest = this.slides.map((el, index) => index)
      .filter(originalIndex =>
        [previous, current, next].indexOf(originalIndex) === -1)

    return {
      next,
      previous,
      current,
      rest,
      progress: Math.abs(progress)
    }
  }

  /* istanbul ignore next */
  /**
   * First interaction with the mouse or per touch will be used to set flags and
   * define initial values.
   * @private
   * @param {event} e Mouse or touch event
   */
  handleDown(e) {
    const {classNames} = this.options
    const clientX = this.getClientX(e)
    this.slides.forEach(slide => {
      slide.classList.remove(classNames.init)
    })
    // Flag down
    // set start coordinate,
    // set current progress
    this.setState({
      down: true,
      xStart: clientX,
      x: 0
    })
  }

  /* istanbul ignore next */
  /**
   * Last interaction with the mouse or per touch will be used to set flags
   * and define initial values.
   * Only fires if down is active. Prevents unintended behaviour when the first
   * touch or mousedown was outside the element.
   * @private
   */
  handleUp() {
    // Only proceed if the plugin signals a previous down event.
    const {down, blocked} = this.state
    if (down && blocked) {
      const {snapBackAt} = this.options
      const progress = this.state.x / this.el.offsetWidth
      let end = 0
      if (progress <= (-1 * snapBackAt)) {
        end = -1
      } else if (progress >= snapBackAt) {
        end = 1
      }
      this.spring(progress, end, this.options.spring)
    }
    this.setState({down: false, blocked: false})
  }

  /* istanbul ignore next */
  /**
   * Handler vor mouse or touch movement.
   * Waits for a threshold and then records the movement on the `x` axis
   * @private
   * @param {event} e Mouse or touch move event
   */
  handleMove(e) {
    if (this.state.down) {
      const {xStart, x, blocked} = this.state
      const {threshold} = this.options
      if ((Math.abs(x) > threshold) || blocked) {
        this.setState({blocked: true})
        e.preventDefault()
        this.handleProgress()
      }
      const clientX = this.getClientX(e)
      this.setState({
        x: xStart - clientX
      })
    }
  }

  /**
   * Handles the progress. Calculates the progress from the
   * internal state and element dimension.
   * A callback is fired if set
   * @private
   */
  handleProgress() {
    const {onSlide} = this.options

    if (typeof onSlide === 'function') {
      const {
        progress,
        next,
        previous,
        current,
        rest
      } = this.getReturnValues()
      /**
       * Callback for progression
       * @type {onSlide}
       */
      onSlide(
        progress,
        {next, previous, current, rest},
        this.slides
      )
    }
  }

  /**
   * Handle the end of the slide animation.
   * If there is a callback called `onEnd` call it.
   * @private
   * @param {number} end Final value
   */
  handleEnd(end) {
    const {onEnd} = this.options
    if (end === -1) {
      this.setState({
        currentSlide: this.state.previousSlide
      })
    /* istanbul ignore next */
    } else /* istanbul ignore next */ if (end === 1) {
      this.setState({
        currentSlide: this.state.nextSlide
      })
    }
    this.setState({
      requestedNext: null,
      requestedPrevious: null
    })
    this.addSides()
    this.addClassNames()

    if (typeof onEnd === 'function') {
      const {
        next,
        previous,
        current,
        rest
      } = this.getReturnValues(false)
      /**
       * Callback for the end
       * @public
       * @type {onEnd}
       */
      onEnd({next, previous, current, rest}, this.slides)
    }
  }

}

/**
 * @typedef onSlide
 * @memberof Glider
 * @type {function}
 * @param {object} offset Offset of the element to either side.
 * @param {number} offset.left A value between [0, 1]
 * @param {number} offset.right A value between [0, 1]
 * @param {object} data Data about the slider activity
 * @param {number} data.previous Index of previous slide
 * @param {number} data.current Index of current slide
 * @param {number} data.next Index of next slide
 * @param {array.<string>} data.rest Array of all remaining slide indexes
 * @param {array.<HTMLElement>} slides Array of all slides
 */

/**
 * @typedef onEnd
 * @memberof Glider
 * @type {function}
 * @param {object} data Data about the slider activity
 * @param {number} data.previous Index of previous slide
 * @param {number} data.current Index of current slide
 * @param {number} data.next Index of next slide
 * @param {array.<string>} data.rest Array of all remaining slide indexes
 * @param {array.<HTMLElement>} slides Array of all slides
 */

export default Glider

