export const marked = {
  // Minimal parser behavior for tests
  parse: (text) => `<p>${text}</p>`,
  // No-op options setter used by component setup
  setOptions: () => {},
  // Provide a Renderer constructor to satisfy `new marked.Renderer()`
  Renderer: class Renderer {
    table(header, body) {
      return `<table><thead>${header}</thead><tbody>${body}</tbody></table>`
    }
  },
}
