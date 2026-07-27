const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'

let activeEl = null
let listener = null
let triggerEl = null

export function activateTrap(container, trigger) {
  triggerEl = trigger || document.activeElement
  activeEl = container

  const focusables = [...container.querySelectorAll(FOCUSABLE)]
  if (focusables.length === 0) return

  focusables[0].focus()

  listener = (e) => {
    if (e.key !== 'Tab') return
    const items = [...container.querySelectorAll(FOCUSABLE)]
    if (items.length === 0) return

    const first = items[0]
    const last = items[items.length - 1]

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault()
      last.focus()
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault()
      first.focus()
    }
  }

  container.addEventListener('keydown', listener)
}

export function deactivateTrap() {
  if (activeEl && listener) {
    activeEl.removeEventListener('keydown', listener)
  }
  if (triggerEl && triggerEl.focus) {
    triggerEl.focus()
  }
  activeEl = null
  listener = null
  triggerEl = null
}
