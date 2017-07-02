/* global document */
/**
 * @file presets/data-wrapper.js
 * @module  presets
 * @author Gregor Adams <greg@pixelass.com>
 */
import Glider from '../glider'
import {PLUGIN_DEFAULTS} from '../config'
import {
  findAll as $,
  findFirst as $$,
  parseObject,
  preventDefault
} from '../helpers'

const classNames = {
  pager: 'pager',
  dot: 'dot',
  active: 'active',
  previousButton: 'previousButton',
  nextButton: 'nextButton',
  disabled: 'disabled',
  dragging: 'dragging',
  draggable: 'draggable',
  caption: 'caption',
  headline: 'headline',
  subline: 'subline',
  description: 'description'
}

/**
 * Defaults for the data wrapper
 * @private
 * @type {object}
 */
const DATA_DEFAULTS = {
  PLUGIN_DEFAULTS,
  classNames: {
    ...PLUGIN_DEFAULTS.classNames,
    ...classNames
  }
}

const {documentElement} = document

/**
 * Autorunner. Continiously loops play. Disables when interacting or hovering
 * @param {Element} el
 * @param {contructor} instance
 * @param {number} duration
 * @param {number} rewind
 */
const autoRunner = (el, instance, duration, rewind) => {
  let running = true
  let down
  let inside
  let timer
  let runHandler
  let slideCount
  const autoplay = run => {
    global.requestAnimationFrame(run)
    return run
  }
  const runner = wait => {
    if (running) {
      timer = setTimeout(runner, duration)
      if (!wait) {
        if (slideCount === rewind) {
          slideCount = instance.goTo(0)
        } else {
          slideCount = instance.nextSlide()
        }
      }
    } else {
      timer = clearTimeout(timer)
    }
  }
  // Defines a waiting runner.
  // Does not trigger but calls the timeout
  const waitingRunner = () => runner(true)

  el.addEventListener('mouseenter', () => {
    running = false
    inside = true
    global.cancelAnimationFrame(runHandler)
    timer = clearTimeout(timer)
  })

  el.addEventListener('mousedown', () => {
    running = false
    down = true
    inside = true
    global.cancelAnimationFrame(runHandler)
    timer = clearTimeout(timer)
  })

  el.addEventListener('mousemove', () => {
    running = false
    inside = true
    global.cancelAnimationFrame(runHandler)
    timer = clearTimeout(timer)
  })

  el.addEventListener('mouseleave', () => {
    inside = false
    if (!down) {
      running = true
      runHandler = autoplay(waitingRunner)
    }
  })

  document.addEventListener('mouseup', () => {
    if (down && !inside) {
      running = true
      runHandler = autoplay(waitingRunner)
    }
    down = false
  })

  document.addEventListener('visibilitychange', e => {
    const {hidden} = e.target
    if (hidden) {
      running = false
      global.cancelAnimationFrame(runHandler)
      timer = clearTimeout(timer)
    } else {
      running = true
      runHandler = autoplay(waitingRunner)
    }
  })
  // The first handler waits
  runHandler = autoplay(waitingRunner)
}

/**
 * Wraps Paraglider to apply pagers and navigation buttons and autoplay.
 * This wrapper simplifies the usage of Paraglider by offering some basic
 * functionality.
 * Data attributes are used to configure the plugin.
 * @param {Element} glider
 * @param {DATA_DEFAULTS} opts
 * @returns {function} returns the destroy method
 */
const dataWrapper = (glider, opts) => {
  // Get options from data attributes
  const data = parseObject(glider.dataset)
  // Find draggable elements to disable dragstart
  // This prevents images and anchors from affecting swiping
  const draggables = [
    ...$('img', glider),
    ...$('a', glider)
  ]
  const {
    pager,
    dot,
    nextButton,
    previousButton,
    caption,
    headline,
    subline,
    description
  } = opts.classNames
  // Elements potentially used by the wrapper
  const pagers = $(`.${pager}`, glider)
  const nextTrigger = $$(`.${nextButton}`, glider)
  const prevTrigger = $$(`.${previousButton}`, glider)
  // Get elements from context
  const dots = pagers.map(el => $$(`.${dot}`, el))
  const captions = $(`.${caption}`, glider)
  const headlines = captions.map(l => $$(`.${headline}`, l))
  const sublines = captions.map(l => $$(`.${subline}`, l))
  const descriptions = captions.map(l => $$(`.${description}`, l))
  // Flag do determine in clicks are allowed or blocked
  let block
  // Ensure instance identifier
  let instance = null
  // Collect handlers.
  // Allows removing them when destroying
  const pagerHandlers = []
  /**
   * Handle the previous button
   * @param {Event} e
   */
  const handlePrev = e => {
    if (block) {
      preventDefault(e)
    } else {
      block = true
      if (instance) {
        instance.prevSlide(e)
      }
    }
  }
  /**
   * Handle the next button
   * @param {Event} e
   */
  const handleNext = e => {
    if (block) {
      preventDefault(e)
    } else {
      block = true
      if (instance) {
        instance.nextSlide(e)
      }
    }
  }
  /**
   * Handle mousedown
   * Adds dragging class name
   */
  const handleMouseDown = () => documentElement.classList.add(opts.classNames.dragging)
  /**
   * Handle mouseup
   * Removes dragging class name
   */
  const handleMouseUp = () => documentElement.classList.remove(opts.classNames.dragging)
  /**
   * Paraglider instance
   *
   * A paraglider with several options.
   */
  instance = new Glider({
    ...DATA_DEFAULTS,
    ...opts,
    ...data,
    classNames: {...DATA_DEFAULTS.classNames, ...opts.classNames},
    onInit({previous, next, current, rest}, slides, options) {
      draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', preventDefault)
      })
      if (options.autoplay) {
        autoRunner(glider, instance, options.autoplay, options.loop ? false : slides.length - 1)
      }
      pagers.forEach((pager, index) => {
        const handler = e => {
          preventDefault(e)
          if (!block) {
            block = true
            if (instance) {
              instance.goTo(index)
            }
          }
        }
        pager.addEventListener('click', handler)
        pagerHandlers.push(handler)
      })
      if (nextTrigger) {
        nextTrigger.addEventListener('click', handleNext)
      }
      if (prevTrigger) {
        prevTrigger.addEventListener('click', handlePrev)
      }
      if (options.enableSwipe !== 0) {
        slides.forEach(el => {
          el.classList.add(options.classNames.draggable)
          el.addEventListener('mousedown', handleMouseDown)
        })
      }
      document.addEventListener('mouseup', handleMouseUp)
      if (pagers[current]) {
        pagers[current].classList.add(options.classNames.active)
      }
      if (!options.loop && prevTrigger && nextTrigger) {
        if ((current === 0) && prevTrigger && nextTrigger) {
          prevTrigger.classList.add(options.classNames.disabled)
        } else if (current === (slides.length - 1)) {
          nextTrigger.classList.add(options.classNames.disabled)
        }
      }
      if (typeof opts.onInit === 'function') {
        opts.onInit({previous, next, current, rest}, {
          slides,
          captions,
          headlines,
          sublines,
          descriptions,
          pagers,
          dots,
          nextTrigger,
          prevTrigger
        }, options)
      }
    },
    onEnd({previous, next, current, rest}, slides, options) {
      const notCurrent = [previous, next, ...rest]
      notCurrent.forEach(id => {
        if (pagers[id]) {
          pagers[id].classList.remove(options.classNames.active)
        }
      })
      if (pagers[current]) {
        pagers[current].classList.remove(options.classNames.active)
      }
      if (!options.loop && prevTrigger && nextTrigger) {
        if (current === 0) {
          prevTrigger.classList.add(options.classNames.disabled)
          nextTrigger.classList.remove(options.classNames.disabled)
        } else if (current === (slides.length - 1)) {
          nextTrigger.classList.add(options.classNames.disabled)
          prevTrigger.classList.remove(options.classNames.disabled)
        } else {
          prevTrigger.classList.remove(options.classNames.disabled)
          nextTrigger.classList.remove(options.classNames.disabled)
        }
      }
      block = false
      if (typeof opts.onEnd === 'function') {
        opts.onEnd({previous, next, current, rest}, {
          slides,
          captions,
          headlines,
          sublines,
          descriptions,
          pagers,
          dots,
          nextTrigger,
          prevTrigger
        }, options)
      }
    },
    onSlide(progress, {previous, next, current, rest}, slides, options) {
      if (typeof opts.onSlide === 'function') {
        opts.onSlide(progress, {previous, next, current, rest}, {
          slides,
          captions,
          headlines,
          sublines,
          descriptions,
          pagers,
          dots,
          nextTrigger,
          prevTrigger
        }, options)
      }
    },
    onDestroy(options) {
      draggables.forEach(draggable => {
        draggable.removeEventListener('dragstart', preventDefault)
      })
      pagers.forEach((pager, index) => {
        pager.removeEventListener('click', pagerHandlers[index])
      })
      document.removeEventListener('mouseup', handleMouseUp)
      if (nextTrigger) {
        nextTrigger.removeEventListener('click', handleNext)
      }
      if (prevTrigger) {
        prevTrigger.removeEventListener('click', handlePrev)
      }
      if (options.enableSwipe !== 0) {
        $(`.${options.classNames.slide}`, glider).forEach(el => {
          el.classList.remove(options.classNames.draggable)
          el.removeEventListener('mousedown', handleMouseDown)
        })
      }
      if (typeof opts.onDestroy === 'function') {
        opts.onDestroy(options)
      }
    }
  })
  if (instance) {
    instance.init(glider)
    return instance.destroy
  }
}

export default dataWrapper
