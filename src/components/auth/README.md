# Auth

Password-based authentication UI.

## Components

- `PasswordModal.vue` – asks for the site password before navigating to a restricted route.

## Props & Events

- `show` (`Boolean`) – controls visibility.
- `targetRoute` (`String`) – optional redirect path after successful auth.
- Emits `authenticated` with the route and `hide` when closed.
