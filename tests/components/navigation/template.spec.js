import test from 'node:test'
import assert from 'node:assert/strict'
test('navbar collapse hides on small screens after link click', () => {
  const originalWindow = global.window
  global.window = { innerWidth: 500 }

  let hideFunctionCalled = false
  const bootstrapCollapse = { hide: () => { hideFunctionCalled = true } }

  const closeMenu = () => {
    if (window.innerWidth < 992 && bootstrapCollapse) {
      bootstrapCollapse.hide()
    }
  }

  const navigationLinkElement = new EventTarget()
  navigationLinkElement.addEventListener('click', closeMenu)
  navigationLinkElement.dispatchEvent(new Event('click'))

  assert.equal(hideFunctionCalled, true)
  global.window = originalWindow
})
