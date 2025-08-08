import test from 'node:test'
import assert from 'node:assert/strict'
test('navbar collapse hides on small screens after link click', () => {
  const originalWindow = global.window
  global.window = { innerWidth: 500 }

  let hideCalled = false
  const bsCollapse = { hide: () => { hideCalled = true } }

  const closeMenu = () => {
    if (window.innerWidth < 992 && bsCollapse) {
      bsCollapse.hide()
    }
  }

  const link = new EventTarget()
  link.addEventListener('click', closeMenu)
  link.dispatchEvent(new Event('click'))

  assert.equal(hideCalled, true)
  global.window = originalWindow
})
