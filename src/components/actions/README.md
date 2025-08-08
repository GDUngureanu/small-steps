# Actions

Task management components built around the `useActions` composable.

## Components
- `ActionList.vue` – top-level list UI, expects a `state` object from `useActions`.
- `ActionItem.vue` – renders a single action with controls for edit, delete and priority.

## Props & Events
Both components receive an `ActionsState` object that contains reactive data and
mutation methods. No events are emitted; mutations are delegated to the state.
